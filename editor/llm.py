"""One small adapter so the newsroom doesn't depend on any single provider.

complete() tries each provider in PROVIDERS order and returns the first answer.
Both providers below have free tiers with web search. Add or reorder providers
here; nothing else in the newsroom needs to change.
"""

import json
import os
import time
import urllib.error
import urllib.request

GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
GROQ_MODEL = os.environ.get("GROQ_MODEL", "groq/compound")


class ProviderError(Exception):
    pass


def _post(url, headers, body, timeout=600):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method="POST",
                                 headers={"Content-Type": "application/json", **headers})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            detail = e.read().decode("utf-8", "ignore")[:300]
            if e.code in (429, 500, 502, 503, 504) and attempt < 2:
                time.sleep(20 * (attempt + 1))  # free tiers rate-limit; wait and retry
                continue
            raise ProviderError(f"HTTP {e.code}: {detail}")
        except urllib.error.URLError as e:
            if attempt < 2:
                time.sleep(10)
                continue
            raise ProviderError(str(e))


def _gemini(system, user, search):
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        raise ProviderError("GEMINI_API_KEY is not set")
    body = {
        "systemInstruction": {"parts": [{"text": system}]},
        "contents": [{"role": "user", "parts": [{"text": user}]}],
        "generationConfig": {"temperature": 0.3, "maxOutputTokens": 32000},
    }
    if search:
        body["tools"] = [{"google_search": {}}]
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
    d = _post(url, {"x-goog-api-key": key}, body)
    cand = (d.get("candidates") or [{}])[0]
    text = "".join(p.get("text", "") for p in (cand.get("content") or {}).get("parts", []))
    if not text:
        raise ProviderError(f"empty answer ({cand.get('finishReason')})")
    u = d.get("usageMetadata") or {}
    searches = len((cand.get("groundingMetadata") or {}).get("webSearchQueries") or [])
    return text, {"provider": "Gemini", "model": GEMINI_MODEL, "input": u.get("promptTokenCount", 0),
                  "output": u.get("candidatesTokenCount", 0), "searches": searches}


def _groq(system, user, search):
    key = os.environ.get("GROQ_API_KEY")
    if not key:
        raise ProviderError("GROQ_API_KEY is not set")
    body = {"model": GROQ_MODEL, "temperature": 0.3, "max_completion_tokens": 8192,
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}]}
    d = _post("https://api.groq.com/openai/v1/chat/completions", {"Authorization": f"Bearer {key}"}, body)
    text = ((d.get("choices") or [{}])[0].get("message") or {}).get("content") or ""
    if not text:
        raise ProviderError("empty answer")
    u = d.get("usage") or {}
    return text, {"provider": "Groq", "model": GROQ_MODEL, "input": u.get("prompt_tokens", 0),
                  "output": u.get("completion_tokens", 0), "searches": None}


PROVIDERS = [_gemini, _groq]


def complete(system, user, search=True, parse=None):
    """Ask each provider in turn. If parse is given, an answer that fails to parse counts as a failure."""
    errors = []
    for provider in PROVIDERS:
        started = time.time()
        try:
            text, stats = provider(system, user, search)
            result = parse(text) if parse else text
        except Exception as e:  # any failure moves on to the next provider
            errors.append(f"{provider.__name__.strip('_')}: {e}")
            print(f"  {provider.__name__.strip('_')} failed: {e}")
            continue
        stats["seconds"] = round(time.time() - started)
        stats["cost_usd"] = 0.0
        return result, stats
    raise ProviderError("; ".join(errors))
