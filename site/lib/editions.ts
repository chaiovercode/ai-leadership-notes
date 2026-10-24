import fs from "node:fs";
import path from "node:path";

export type Stamp = "usable_today" | "waitlist" | "demo_only" | null;

export type Story = {
  headline: string;
  dek: string;
  body: string;
  url: string;
  source: string;
  stamp: Stamp;
  fits: string | null;
  verified: boolean;
  image?: string;
};

export type AgentStats = {
  provider: string;
  model: string;
  seconds: number;
  input: number;
  output: number;
  searches: number | null;
  fetches?: number;
  cost_usd: number;
};

export type Edition = {
  meta: {
    date: string;
    number: number;
    preview?: boolean;
    generated_at?: string;
    model?: string;
    seconds?: number;
    usage?: { input: number; output: number; searches: number };
    cost_usd?: number;
    status?: "checked" | "unchecked" | "feeds_only";
    agents?: Partial<Record<"reporter" | "fact_checker", AgentStats>>;
    fact_check?: null | {
      confirmed?: number;
      corrected?: number;
      removed?: number;
      unverified?: number;
      report: { section: string; headline: string; verdict: "confirmed" | "corrected" | "removed" | "unverified"; note: string }[];
    };
  };
  front_page: Story[];
  my_stack: Story[];
  models_labs: Story[];
  tools: Story[];
  paper_of_the_day: { title: string; url: string; authors: string; summary: string; why_it_matters: string } | null;
  try_this_today: { title: string; minutes: number; why: string; steps: string[] } | null;
  hype_check: { claim: string; verdict: string; explanation: string; url: string }[];
  follow_ups: Story[];
  briefs: { headline: string; one_line: string; url: string }[];
  weather: { headline: string; detail: string } | null;
  quote_of_the_day: { quote: string; who: string; url: string } | null;
  editorial: { headline: string; body: string } | null;
  business: Story[];
  sports: {
    match_report: { headline: string; dek: string; body: string; url: string; source: string; image?: string } | null;
    transfers: { headline: string; one_line: string; url: string }[];
  };
  obituaries: { name: string; lived: string; body: string; url: string }[];
  comic: {
    source: string;
    num: number;
    title: string;
    alt: string;
    img: string;
    url: string;
    date: string;
    credit: string;
    license: string;
    license_url: string;
  } | null;
};

const DIR = path.join(process.cwd(), "..", "editions");

export function allEditions(): Edition[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort()
    .reverse()
    .map((f) => normalize(JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"))));
}

export function getEdition(date: string): Edition | undefined {
  return allEditions().find((e) => e.meta.date === date);
}

function normalize(e: Partial<Edition> & { meta: Edition["meta"] }): Edition {
  return {
    front_page: [],
    my_stack: [],
    models_labs: [],
    tools: [],
    paper_of_the_day: null,
    try_this_today: null,
    hype_check: [],
    follow_ups: [],
    briefs: [],
    weather: null,
    quote_of_the_day: null,
    editorial: null,
    business: [],
    obituaries: [],
    comic: null,
    ...e,
    sports: { match_report: null, transfers: [], ...(e.sports ?? {}) },
  } as Edition;
}

export function longDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
}

export function paragraphs(text: string) {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
