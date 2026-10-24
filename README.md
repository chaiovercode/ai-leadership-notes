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

Each edition records what each agent cost and how long it took.

## What to edit

- **`READER.md`** is the editor’s brief: who you are, what to prioritize, what to skip. Change it whenever your goals or stack change.
- **`editor/reporter.md`** holds the reporter’s rules, voice and the edition format.
- **`editor/fact_checker.md`** holds the fact-checker’s rules.
- **`site/`** is the newspaper itself (Next.js, Tailwind, shadcn/ui), exported as a static site.

## Setup

1. Add your Claude API key as a repository secret named `ANTHROPIC_API_KEY` (Settings, Secrets and variables, Actions).
2. Make sure Pages is set to deploy from GitHub Actions (Settings, Pages, Source).
3. Run **Morning Edition** once from the Actions tab to print the first edition.

## Run it locally

```bash
# write today's edition
pip install -r editor/requirements.txt
ANTHROPIC_API_KEY=... python editor/editor.py      # FORCE=1 to rewrite today's

# view the paper
cd site && npm install && npm run dev
```

Prices used for the cost line live at the top of `editor/editor.py`. Check them against Anthropic’s pricing page now and then.
