# The Chai Times

A daily AI newspaper, edited by Claude for one reader.

*AI, explained before your chai goes cold.*

## How a morning works

| UTC   | IST   | Workflow | What it does |
|-------|-------|----------|--------------|
| 01:00 | 06:30 | Update AI News | Pulls 6 RSS feeds into `categorized-news.json` |
| 02:00 | 07:30 | Fetch Trending AI & Tech News | Pulls Hacker News into `news.json` |
| 02:30 | 08:00 | Morning Edition | The reporter writes, the fact-checker checks, and the edition lands in `editions/YYYY-MM-DD.json` |
| after | after | Deploy The Chai Times to Pages | Builds the site in `site/` and publishes it |

The newsroom (`editor/editor.py`) has two agents:

1. **The reporter** reads `READER.md`, both feeds and the last 14 days of headlines, searches the web for anything the feeds missed, stamps every model or tool story *Usable today*, *Waitlist* or *Demo only*, and writes a draft.
2. **The fact-checker** opens every story’s source, checks names, dates, numbers, quotes and stamps, corrects what’s wrong, removes what it can’t support, and files a report. Its corrections are printed on the back page.

Both agents run on free models through `editor/llm.py`: **Gemini 2.5 Flash** first, **Groq compound** if Gemini fails. If both fail, the paper still prints, straight from the feeds. Each edition records which model wrote and checked it, and how long it took.

## What to edit

- **`READER.md`** is the editor’s brief: who you are, what to prioritize, what to skip. Change it whenever your goals or stack change.
- **`editor/reporter.md`** holds the reporter’s rules, voice and the edition format.
- **`editor/fact_checker.md`** holds the fact-checker’s rules.
- **`site/`** is the newspaper itself (Next.js, Tailwind, shadcn/ui), exported as a static site.

## Setup

1. Create two free keys and add them as repository secrets (Settings, Secrets and variables, Actions):
   - `GEMINI_API_KEY` from https://aistudio.google.com/apikey
   - `GROQ_API_KEY` from https://console.groq.com/keys
2. Make sure Pages is set to deploy from GitHub Actions (Settings, Pages, Source).
3. Run **Morning Edition** once from the Actions tab to print the first edition.

## Run it locally

```bash
# write today's edition
GEMINI_API_KEY=... GROQ_API_KEY=... python editor/editor.py      # FORCE=1 to rewrite today's

# view the paper
cd site && npm install && npm run dev
```

The editor needs no packages beyond Python itself. To change or reorder models, edit `PROVIDERS` in `editor/llm.py`. Free tiers can change, so check the Actions tab if a morning looks thin.
