"""The Chai Times newsroom: two agents on free models.

1. The reporter reads READER.md, the raw feeds (news.json, categorized-news.json)
   and recent headlines, searches the web, and writes a draft edition.
2. The script opens every story's page itself, and the fact-checker checks the
   draft against those pages, fixes what's wrong and removes what it can't support.

Models come from llm.py: Gemini first, Groq if Gemini fails. If both fail the
paper still prints, straight from the feeds. Swap these calls for your own
harness later.
"""

import json
import os
import re
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from html import unescape
from pathlib import Path
from urllib.parse import urljoin

from llm import ProviderError, complete

ROOT = Path(__file__).resolve().parent.parent
EDITIONS = ROOT / "editions"

RECENT_DAYS = 14

def load_json(path):
    try:
        return json.loads(path.read_text())
    except (FileNotFoundError, json.JSONDecodeError):
        return None


def candidates():
    """Flatten both feeds into one de-duplicated list."""
    seen, items = set(), []
    rss = load_json(ROOT / "categorized-news.json") or {}
    for cat in rss.get("categories", []):
        for a in cat.get("articles", []):
            if a.get("url") and a["url"] not in seen:
                seen.add(a["url"])
                items.append({"title": a.get("title"), "url": a["url"], "source": a.get("source"),
                              "date": a.get("date"), "summary": (a.get("description") or "")[:300]})
    hn = load_json(ROOT / "news.json") or {}
    for s in hn.get("stories", []):
        if s.get("url") and s["url"] not in seen:
            seen.add(s["url"])
            items.append({"title": s.get("title"), "url": s["url"], "source": "Hacker News",
                          "hn_points": s.get("score"), "hn_comments": s.get("comments")})
    return items


def recent_headlines(today):
    out = []
    for p in sorted(EDITIONS.glob("*.json")):
        e = load_json(p)
        if not e or e.get("meta", {}).get("preview"):
            continue
        if datetime.fromisoformat(e["meta"]["date"]).date() < today - timedelta(days=RECENT_DAYS):
            continue
        for sec in ("front_page", "my_stack", "models_labs", "tools", "follow_ups"):
            for s in e.get(sec, []):
                out.append({"date": e["meta"]["date"], "headline": s.get("headline"), "url": s.get("url")})
        for b in e.get("briefs", []):
            out.append({"date": e["meta"]["date"], "headline": b.get("headline"), "url": b.get("url")})
    return out


def next_edition_number():
    nums = [load_json(p).get("meta", {}).get("number", 0) for p in EDITIONS.glob("*.json") if load_json(p)]
    return max(nums, default=0) + 1


def extract_json(text):
    text = re.sub(r"^```(?:json)?|```$", "", text.strip(), flags=re.M).strip()
    start, end = text.find("{"), text.rfind("}")
    return json.loads(text[start:end + 1])


OG_IMAGE = [
    re.compile(r'<meta[^>]+(?:property|name)=["\'](?:og:image|twitter:image)(?::src)?["\'][^>]*content=["\']([^"\']+)', re.I),
    re.compile(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]*(?:property|name)=["\'](?:og:image|twitter:image)(?::src)?["\']', re.I),
]


def find_image(url):
    """The preview image a page publishes for link cards (og:image), if any."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; ChaiTimesBot/1.0)"})
        with urllib.request.urlopen(req, timeout=8) as r:
            if "html" not in r.headers.get("Content-Type", ""):
                return None
            html = r.read(400_000).decode("utf-8", "ignore")
    except Exception:
        return None
    for rx in OG_IMAGE:
        m = rx.search(html)
        if m:
            img = urljoin(url, unescape(m.group(1).strip()))
            return img if img.startswith("https://") else None
    return None


def add_images(edition):
    stories = [s for sec in ("front_page", "my_stack", "models_labs", "tools", "business", "follow_ups")
               for s in edition.get(sec) or [] if s.get("url") and not s.get("image")]
    mr = (edition.get("sports") or {}).get("match_report")
    if mr and mr.get("url") and not mr.get("image"):
        stories.append(mr)
    with ThreadPoolExecutor(max_workers=8) as pool:
        for story, img in zip(stories, pool.map(lambda s: find_image(s["url"]), stories)):
            if img:
                story["image"] = img
    return sum(1 for s in stories if s.get("image"))


# xkcd is licensed CC BY-NC 2.5: free to share with credit, non-commercially.
# Fallbacks when the reporter has no pick and the latest strip ran recently.
XKCD_FAVOURITES = [1838, 2173, 1425, 927, 327, 2347, 1319, 1205, 974, 1613, 2048, 882, 552, 1132, 303, 1987, 1172, 2228, 1897, 2237, 2169]


def fetch_xkcd(num=None):
    url = f"https://xkcd.com/{num}/info.0.json" if num else "https://xkcd.com/info.0.json"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "ChaiTimesBot/1.0"})
        with urllib.request.urlopen(req, timeout=8) as r:
            d = json.loads(r.read())
    except Exception:
        return None
    return {"source": "xkcd", "num": d["num"], "title": d["safe_title"], "alt": d["alt"], "img": d["img"],
            "url": f"https://xkcd.com/{d['num']}/", "date": f"{d['year']}-{int(d['month']):02d}-{int(d['day']):02d}",
            "credit": "xkcd by Randall Munroe", "license": "CC BY-NC 2.5",
            "license_url": "https://creativecommons.org/licenses/by-nc/2.5/"}


def pick_comic(pick, today):
    """The reporter's pick if it fits, else the newest strip, else a favourite we haven't run lately."""
    recent = set()
    for p in EDITIONS.glob("*.json"):
        e = load_json(p) or {}
        if e.get("comic") and datetime.fromisoformat(e["meta"]["date"]).date() >= today - timedelta(days=60):
            recent.add(e["comic"].get("num"))
    if isinstance(pick, int) and pick not in recent and (c := fetch_xkcd(pick)):
        return c
    latest = fetch_xkcd()
    if latest and latest["num"] not in recent:
        return latest
    for n in sorted(XKCD_FAVOURITES, key=lambda n: hash((n, today.isoformat()))):
        if n not in recent and (c := fetch_xkcd(n)):
            return c
    return latest


def page_text(url, limit=4000):
    """Fetch a page and return its final URL and readable text, roughly."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; ChaiTimesBot/1.0)"})
        with urllib.request.urlopen(req, timeout=10) as r:
            final = r.geturl()
            html = r.read(600_000).decode("utf-8", "ignore") if "html" in r.headers.get("Content-Type", "") else ""
    except Exception as e:
        return url, f"[could not open page: {e}]"
    html = re.sub(r"(?is)<(script|style|nav|footer|header|noscript)[^>]*>.*?</\1>", " ", html)
    text = unescape(re.sub(r"\s+", " ", re.sub(r"(?s)<[^>]+>", " ", html))).strip()
    return final, text[:limit]


def all_items(edition):
    """Every story-like object that carries a url, wherever it sits in the edition."""
    items = [s for sec in ("front_page", "my_stack", "models_labs", "tools", "business", "follow_ups",
                           "briefs", "hype_check", "obituaries") for s in edition.get(sec) or []]
    sp = edition.get("sports") or {}
    items += ([sp["match_report"]] if sp.get("match_report") else []) + (sp.get("transfers") or [])
    for single in ("paper_of_the_day", "quote_of_the_day"):
        if edition.get(single):
            items.append(edition[single])
    return [i for i in items if isinstance(i, dict) and i.get("url")]


def gather_sources(edition):
    """Open every story's page once. Search-redirect links are swapped for the real address."""
    items = all_items(edition)
    urls = sorted({i["url"] for i in items})
    with ThreadPoolExecutor(max_workers=8) as pool:
        pages = dict(zip(urls, pool.map(page_text, urls)))
    for i in items:
        final, _ = pages[i["url"]]
        if "grounding-api-redirect" in i["url"] and final:
            i["url"] = final
    return {final: text for final, text in pages.values()}


def write_draft(today):
    system = (ROOT / "editor" / "reporter.md").read_text() + "\n\n# READER.md\n\n" + (ROOT / "READER.md").read_text()
    user = (
        f"Today is {today.strftime('%A, %d %B %Y')} (UTC).\n\n"
        f"## Candidate stories from the feeds\n{json.dumps(candidates(), ensure_ascii=False)}\n\n"
        f"## Headlines already published in the last {RECENT_DAYS} days\n"
        f"{json.dumps(recent_headlines(today), ensure_ascii=False)}\n\n"
        "Write today's paper. Return only the JSON object."
    )
    return complete(system, user, search=True, parse=extract_json)


def fact_check(today, draft, sources):
    system = (ROOT / "editor" / "fact_checker.md").read_text()
    user = (
        f"Today is {today.strftime('%A, %d %B %Y')} (UTC).\n\n"
        f"## Draft edition from the reporter\n{json.dumps(draft, ensure_ascii=False)}\n\n"
        f"## Source pages, opened this morning (url, then the start of its text)\n"
        f"{json.dumps(sources, ensure_ascii=False)}\n\n"
        "Check it. Return only the JSON object with edition and report."
    )
    return complete(system, user, search=True, parse=extract_json)


def feeds_only(today):
    """The last resort: no model answered, so print the raw feeds as briefs."""
    items = sorted(candidates(), key=lambda c: -(c.get("hn_points") or 0))[:20]
    return {
        "front_page": [], "briefs": [{"headline": c["title"], "one_line": c.get("summary") or c.get("source", ""),
                                      "url": c["url"]} for c in items],
        "weather": {"headline": "Editors off today", "detail": "Both newsrooms were unreachable, so here are the wires."},
    }


def main():
    now = datetime.now(timezone.utc)
    today = now.date()
    out_path = EDITIONS / f"{today.isoformat()}.json"
    if out_path.exists() and not os.environ.get("FORCE"):
        print(f"{out_path.name} already exists. Set FORCE=1 to rewrite it.")
        return

    agents, report, status = {}, [], "checked"
    try:
        draft, agents["reporter"] = write_draft(today)
        print(f"Reporter: {agents['reporter']['provider']}, {agents['reporter']['seconds']}s")
    except ProviderError as e:
        print(f"Every reporter failed ({e}). Printing the feeds instead.")
        draft, status = feeds_only(today), "feeds_only"

    edition = draft
    if status == "checked":
        sources = gather_sources(draft)
        print(f"Opened {len(sources)} source pages")
        try:
            checked, agents["fact_checker"] = fact_check(today, draft, sources)
            agents["fact_checker"]["fetches"] = len(sources)
            edition, report = checked.get("edition") or draft, checked.get("report") or []
            print(f"Fact-checker: {agents['fact_checker']['provider']}, {agents['fact_checker']['seconds']}s")
        except ProviderError as e:
            print(f"Every fact-checker failed ({e}). Printing the draft marked unchecked.")
            status = "unchecked"
            for item in all_items(edition):
                if "verified" in item:
                    item["verified"] = False

    edition["comic"] = pick_comic(edition.pop("xkcd_pick", None) or draft.get("xkcd_pick"), today)
    found = add_images(edition)
    print(f"Found pictures for {found} stories")

    counts = {v: sum(1 for r in report if r.get("verdict") == v) for v in ("confirmed", "corrected", "removed", "unverified")}
    edition["meta"] = {
        "date": today.isoformat(),
        "number": (load_json(out_path) or {}).get("meta", {}).get("number") or next_edition_number(),
        "generated_at": now.isoformat(timespec="seconds"),
        "status": status,
        "model": " and ".join(sorted({f"{a['provider']} {a['model']}" for a in agents.values()})) or "no model",
        "seconds": sum(a["seconds"] for a in agents.values()),
        "usage": {"input": sum(a["input"] for a in agents.values()),
                  "output": sum(a["output"] for a in agents.values()),
                  "searches": sum(a["searches"] or 0 for a in agents.values())},
        "cost_usd": 0.0,
        "agents": agents,
        "fact_check": {**counts, "report": report} if status == "checked" else None,
    }
    EDITIONS.mkdir(exist_ok=True)
    out_path.write_text(json.dumps(edition, indent=2, ensure_ascii=False))
    print(f"Wrote {out_path.name}: edition {edition['meta']['number']}, {status}, fact-check {counts}")


if __name__ == "__main__":
    main()
