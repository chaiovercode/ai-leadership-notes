"""The Chai Times editor.

Reads READER.md, the raw feeds (news.json, categorized-news.json) and recent
editions, asks Claude to edit today's paper, and writes editions/YYYY-MM-DD.json.

v0 is a single Claude call with server-side web search. Swap it for your own
harness once that exists.
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

import anthropic

ROOT = Path(__file__).resolve().parent.parent
EDITIONS = ROOT / "editions"

MODEL = os.environ.get("EDITOR_MODEL", "claude-sonnet-5-5")
MAX_SEARCHES = int(os.environ.get("EDITOR_MAX_SEARCHES", "12"))
RECENT_DAYS = 14

# USD per million tokens, and per web search. Check current rates at
# https://platform.claude.com/docs/en/about-claude/pricing and update.
PRICE = {
    "input": float(os.environ.get("PRICE_INPUT", "2.00")),
    "output": float(os.environ.get("PRICE_OUTPUT", "10.00")),
    "cache_write": float(os.environ.get("PRICE_CACHE_WRITE", "2.50")),
    "cache_read": float(os.environ.get("PRICE_CACHE_READ", "0.20")),
    "search": float(os.environ.get("PRICE_SEARCH", "0.01")),
}


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


def add_usage(total, u):
    total["input"] += u.input_tokens or 0
    total["output"] += u.output_tokens or 0
    total["cache_write"] += getattr(u, "cache_creation_input_tokens", 0) or 0
    total["cache_read"] += getattr(u, "cache_read_input_tokens", 0) or 0
    stu = getattr(u, "server_tool_use", None)
    total["searches"] += (getattr(stu, "web_search_requests", 0) or 0) if stu else 0


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


def main():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        sys.exit("ANTHROPIC_API_KEY is not set.")

    now = datetime.now(timezone.utc)
    today = now.date()
    out_path = EDITIONS / f"{today.isoformat()}.json"
    if out_path.exists() and not os.environ.get("FORCE"):
        print(f"{out_path.name} already exists. Set FORCE=1 to rewrite it.")
        return

    client = anthropic.Anthropic()
    system = [
        {"type": "text", "text": (ROOT / "editor" / "prompt.md").read_text()},
        {"type": "text", "text": "# READER.md\n\n" + (ROOT / "READER.md").read_text(),
         "cache_control": {"type": "ephemeral"}},
    ]
    user = (
        f"Today is {today.strftime('%A, %d %B %Y')} (UTC).\n\n"
        f"## Candidate stories from the feeds\n{json.dumps(candidates(), ensure_ascii=False)}\n\n"
        f"## Headlines already published in the last {RECENT_DAYS} days\n"
        f"{json.dumps(recent_headlines(today), ensure_ascii=False)}\n\n"
        "Edit today's paper. Return only the JSON object."
    )
    tools = [{"type": "web_search_20250305", "name": "web_search", "max_uses": MAX_SEARCHES}]
    messages = [{"role": "user", "content": user}]
    usage = {"input": 0, "output": 0, "cache_write": 0, "cache_read": 0, "searches": 0}
    started = datetime.now(timezone.utc)

    # The server runs the search loop itself; pause_turn means "send it back to continue".
    for _ in range(6):
        resp = client.messages.create(model=MODEL, max_tokens=16000, system=system,
                                      tools=tools, messages=messages)
        add_usage(usage, resp.usage)
        if resp.stop_reason != "pause_turn":
            break
        messages = [messages[0], {"role": "assistant", "content": resp.content}]

    text = "".join(b.text for b in resp.content if b.type == "text")
    try:
        edition = extract_json(text)
    except (json.JSONDecodeError, ValueError):
        fix = client.messages.create(
            model=MODEL, max_tokens=16000,
            messages=[{"role": "user", "content": "Fix this into valid JSON. Return only the JSON.\n\n" + text}])
        add_usage(usage, fix.usage)
        edition = extract_json("".join(b.text for b in fix.content if b.type == "text"))

    found = add_images(edition)
    print(f"Found pictures for {found} stories")

    cost = (usage["input"] * PRICE["input"] + usage["output"] * PRICE["output"]
            + usage["cache_write"] * PRICE["cache_write"] + usage["cache_read"] * PRICE["cache_read"]) / 1e6 \
        + usage["searches"] * PRICE["search"]

    edition["meta"] = {
        "date": today.isoformat(),
        "number": next_edition_number(),
        "generated_at": now.isoformat(timespec="seconds"),
        "model": MODEL,
        "seconds": round((datetime.now(timezone.utc) - started).total_seconds()),
        "usage": usage,
        "cost_usd": round(cost, 3),
    }
    EDITIONS.mkdir(exist_ok=True)
    out_path.write_text(json.dumps(edition, indent=2, ensure_ascii=False))
    print(f"Wrote {out_path.name}: edition {edition['meta']['number']}, ${cost:.3f}, "
          f"{usage['searches']} searches, {edition['meta']['seconds']}s")


if __name__ == "__main__":
    main()
