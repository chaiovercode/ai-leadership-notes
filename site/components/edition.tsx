import type React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type Edition, type Stamp, type Story, longDate, paragraphs } from "@/lib/editions";
import { cn } from "@/lib/utils";

const STAMP: Record<Exclude<Stamp, null>, { label: string; variant: "default" | "outline" | "dashed" }> = {
  usable_today: { label: "Usable today", variant: "default" },
  waitlist: { label: "Waitlist", variant: "outline" },
  demo_only: { label: "Demo only", variant: "dashed" },
};

function Body({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("body-copy text-[1.0625rem] leading-[1.65]", className)}>
      {paragraphs(text).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function StoryMeta({ story }: { story: Story }) {
  const stamp = story.stamp ? STAMP[story.stamp] : null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.92rem]">
      {stamp && <Badge variant={stamp.variant}>{stamp.label}</Badge>}
      {!story.verified && <Badge variant="muted">Unverified</Badge>}
      <a href={story.url} target="_blank" rel="noopener" className="underline">
        {story.source}
      </a>
    </div>
  );
}

function Fits({ fits }: { fits: string | null }) {
  if (!fits) return null;
  return <p className="mt-2 text-[0.95rem] italic text-muted">Fits: {fits}</p>;
}

function StoryBlock({ story, size = "md" }: { story: Story; size?: "lg" | "md" | "sm" }) {
  return (
    <article>
      <h3
        className={cn(
          "font-bold tracking-[-0.01em] text-balance",
          size === "lg" && "text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] tracking-[-0.025em]",
          size === "md" && "text-[1.55rem] leading-[1.12]",
          size === "sm" && "text-[1.25rem] leading-[1.18]"
        )}
      >
        <a href={story.url} target="_blank" rel="noopener" className="no-underline hover:underline">
          {story.headline}
        </a>
      </h3>
      <p className={cn("mt-2 italic text-muted text-pretty", size === "lg" ? "text-[1.3rem] leading-snug" : "text-[1.05rem] leading-snug")}>
        {story.dek}
      </p>
      <StoryMeta story={story} />
      <Body text={story.body} className={cn("mt-4", size === "lg" && "lead-columns drop-cap")} />
      <Fits fits={story.fits} />
    </article>
  );
}

function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-6 border-t-2 border-ink pt-2">
      <h2 className="text-[1.15rem] font-bold">{title}</h2>
      {note && <p className="text-[0.95rem] italic text-muted">{note}</p>}
    </div>
  );
}

function StoryGrid({ stories }: { stories: Story[] }) {
  return (
    <div className="grid gap-y-10 md:grid-cols-2 lg:grid-cols-3 md:gap-x-0">
      {stories.map((s, i) => (
        <div
          key={i}
          className={cn(
            "border-hairline md:pr-6",
            i % 2 === 0 ? "md:border-l-0 md:pl-0" : "md:border-l md:pl-6",
            i % 3 === 0 ? "lg:border-l-0 lg:pl-0" : "lg:border-l lg:pl-6"
          )}
        >
          <StoryBlock story={s} size="sm" />
        </div>
      ))}
    </div>
  );
}

function PageHead({ id, title, note }: { id: string; title: string; note: string }) {
  return (
    <div id={id} className="mb-8 mt-12 scroll-mt-6">
      <div className="rule-double" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3">
        <h2 className="text-[clamp(2rem,4.5vw,2.9rem)] font-bold leading-none tracking-[-0.02em]">{title}</h2>
        <p className="text-[1rem] italic text-muted">{note}</p>
      </div>
    </div>
  );
}

function Ear({ children, align }: { children: React.ReactNode; align: "left" | "right" }) {
  return (
    <div className={cn("hidden w-44 shrink-0 border border-ink px-3 py-2 text-[0.88rem] leading-snug lg:block", align === "right" && "text-right")}>
      {children}
    </div>
  );
}

export function Masthead({ edition }: { edition?: Edition }) {
  const m = edition?.meta;
  return (
    <header className="pt-6">
      <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2 text-[0.95rem]">
        <span>{m ? (m.preview ? "Preview edition" : `Edition No. ${m.number}`) : "Edition No. 1"}</span>
        <span className="hidden text-center sm:block">{m ? longDate(m.date) : ""}</span>
        <Link href="/archive/" className="underline">
          Archive
        </Link>
      </div>
      <div className="flex items-center justify-between gap-6 pt-4">
        {edition && (
          <Ear align="left">
            <span className="font-bold">Weather</span>
            <br />
            {edition.weather ? (
              <>
                {edition.weather.headline}. <span className="italic">{edition.weather.detail}</span>
              </>
            ) : (
              <span className="italic">No forecast today.</span>
            )}
          </Ear>
        )}
        <Link href="/" className="block min-w-0 flex-1 no-underline">
          <h1 className="text-center font-masthead text-[clamp(3.2rem,10vw,7.5rem)] font-normal leading-[0.95] lg:whitespace-nowrap lg:text-[clamp(4rem,6.8vw,6.5rem)]">The Chai Times</h1>
        </Link>
        {edition && (
          <Ear align="right">
            <span className="font-bold">Price of this paper</span>
            <br />
            {m?.preview ? <span className="italic">Free preview</span> : `$${m?.cost_usd?.toFixed(2)} to print`}
            <br />
            <span className="italic">Edited by Claude</span>
          </Ear>
        )}
      </div>
      <p className="mt-2 text-center text-[1.15rem] italic">AI, explained before your chai goes cold.</p>
      {m && <p className="mt-1 text-center text-[0.95rem] sm:hidden">{longDate(m.date)}</p>}
      <div className="rule-double mt-4" />
    </header>
  );
}

export function EditionView({ edition }: { edition: Edition }) {
  const [lead, ...second] = edition.front_page;
  const m = edition.meta;
  const sp = edition.sports;
  const hasSports = !!(sp.scoreboard || sp.match_report || sp.transfers.length);
  const hasDesk = !!(edition.paper_of_the_day || edition.try_this_today);
  const hasNews = edition.my_stack.length + edition.models_labs.length + edition.tools.length > 0;
  const hasBack = edition.obituaries.length + edition.follow_ups.length + edition.briefs.length > 0;

  const inside = [
    hasNews && { id: "news", title: "News", note: "Your stack, models, tools" },
    edition.business.length > 0 && { id: "business", title: "Business", note: "Deals, money, adoption" },
    (edition.editorial || edition.hype_check.length > 0) && { id: "opinion", title: "Opinion", note: "The editorial, hype check" },
    hasDesk && { id: "desk", title: "The Desk", note: "Paper of the day, try this today" },
    hasSports && { id: "sports", title: "Sports", note: "Standings, match report, transfers" },
    hasBack && { id: "back", title: "Back page", note: "Obituaries, follow-ups, briefs" },
  ].filter(Boolean) as { id: string; title: string; note: string }[];

  return (
    <main>
      {m.preview && (
        <p className="mt-4 border border-ink px-4 py-2 text-[0.98rem]">
          This preview was assembled by hand from the feeds this repo already collects. The first real edition is written by the editor at 08:00 IST.
        </p>
      )}

      {lead && (
        <section className="grid gap-10 py-8 lg:grid-cols-12" aria-label="Front page">
          <div className="lg:col-span-8">
            <StoryBlock story={lead} size="lg" />
          </div>
          <div className="space-y-10 lg:col-span-4 lg:border-l lg:border-ink lg:pl-8">
            {second.map((s, i) => (
              <div key={i} className={cn(i > 0 && "border-t border-hairline pt-8")}>
                <StoryBlock story={s} size="md" />
              </div>
            ))}
            {inside.length > 0 && (
              <nav aria-label="Inside today" className="border-2 border-ink p-4">
                <h2 className="text-[1.15rem] font-bold">Inside today</h2>
                <ul className="mt-2">
                  {inside.map((x) => (
                    <li key={x.id} className="border-t border-hairline py-2 first:border-t-0">
                      <a href={`#${x.id}`} className="font-bold no-underline hover:underline">
                        {x.title}
                      </a>
                      <span className="block text-[0.95rem] italic text-muted">{x.note}</span>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </section>
      )}

      {edition.quote_of_the_day && (
        <figure className="border-y border-ink py-8 text-center">
          <blockquote className="mx-auto max-w-[44rem] text-[clamp(1.5rem,3.2vw,2.25rem)] italic leading-tight text-balance">
            “{edition.quote_of_the_day.quote}”
          </blockquote>
          <figcaption className="mt-3 text-[1rem]">
            <a href={edition.quote_of_the_day.url} target="_blank" rel="noopener" className="underline">
              {edition.quote_of_the_day.who}
            </a>
          </figcaption>
        </figure>
      )}

      {hasNews && (
        <div id="news" className="scroll-mt-6">
          {edition.my_stack.length > 0 && (
            <section className="py-6">
              <SectionHead title="Your stack" note="Changes to the tools you use." />
              <StoryGrid stories={edition.my_stack} />
            </section>
          )}
          {edition.models_labs.length > 0 && (
            <section className="py-6">
              <SectionHead title="Models and labs" />
              <StoryGrid stories={edition.models_labs} />
            </section>
          )}
          {edition.tools.length > 0 && (
            <section className="py-6">
              <SectionHead title="Tools and open source" />
              <StoryGrid stories={edition.tools} />
            </section>
          )}
        </div>
      )}

      {edition.business.length > 0 && (
        <section>
          <PageHead id="business" title="Business" note="Follow the money, then ask what it means for your code." />
          <StoryGrid stories={edition.business} />
        </section>
      )}

      {(edition.editorial || edition.hype_check.length > 0) && (
        <section>
          <PageHead id="opinion" title="Opinion" note="Where the paper says what it thinks." />
          <div className="grid gap-10 lg:grid-cols-12">
            {edition.editorial && (
              <article className={cn(edition.hype_check.length ? "lg:col-span-8" : "lg:col-span-12")}>
                <p className="text-[1rem] italic">The editorial</p>
                <h3 className="mt-1 text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-balance">
                  {edition.editorial.headline}
                </h3>
                <Body text={edition.editorial.body} className="lead-columns drop-cap mt-5" />
                <p className="mt-4 text-[1rem] italic">The Editor</p>
              </article>
            )}
            {edition.hype_check.length > 0 && (
              <div className={cn(edition.editorial && "lg:col-span-4 lg:border-l lg:border-ink lg:pl-8")}>
                <h3 className="text-[1.3rem] font-bold">Hype check</h3>
                <p className="text-[0.95rem] italic text-muted">Big claims, checked against what has been shown.</p>
                <div className="mt-5 space-y-6">
                  {edition.hype_check.map((h, i) => (
                    <div key={i} className={cn(i > 0 && "border-t border-hairline pt-6")}>
                      <p className="text-[1.1rem] font-bold leading-snug">{h.claim}</p>
                      <p className="mt-2">
                        <Badge variant="outline">{h.verdict}</Badge>
                      </p>
                      <p className="mt-2 text-[1.0625rem] leading-relaxed">
                        {h.explanation}{" "}
                        <a href={h.url} target="_blank" rel="noopener" className="underline">
                          Source
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {hasDesk && (
        <section>
          <PageHead id="desk" title="The Desk" note="One thing to read, one thing to build." />
          <div className="grid gap-8 lg:grid-cols-2">
            {edition.paper_of_the_day && (
              <div className="border border-ink p-6">
                <h3 className="text-[1.15rem] font-bold">Paper of the day</h3>
                <h4 className="mt-3 text-[1.45rem] font-bold leading-tight text-balance">
                  <a href={edition.paper_of_the_day.url} target="_blank" rel="noopener" className="no-underline hover:underline">
                    {edition.paper_of_the_day.title}
                  </a>
                </h4>
                <p className="mt-1 text-[0.95rem] italic text-muted">{edition.paper_of_the_day.authors}</p>
                <Body text={edition.paper_of_the_day.summary} className="mt-4" />
                <p className="mt-4 border-t border-hairline pt-3 text-[1.0625rem] leading-relaxed">
                  <span className="font-bold">Why it matters to you. </span>
                  {edition.paper_of_the_day.why_it_matters}
                </p>
              </div>
            )}
            {edition.try_this_today && (
              <div className="border-2 border-ink p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[1.15rem] font-bold">Try this today</h3>
                  <span className="text-[0.95rem]">{edition.try_this_today.minutes} minutes</span>
                </div>
                <h4 className="mt-3 text-[1.45rem] font-bold leading-tight text-balance">{edition.try_this_today.title}</h4>
                <p className="mt-2 text-[1.0625rem] italic">{edition.try_this_today.why}</p>
                <ol className="mt-4 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-relaxed marker:font-bold">
                  {edition.try_this_today.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      )}

      {hasSports && (
        <section>
          <PageHead id="sports" title="Sports" note="The model league, reported like it matters. Because it does." />
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="text-[1.3rem] font-bold">Standings</h3>
              {sp.scoreboard ? (
                <>
                  <p className="text-[0.95rem] italic text-muted">
                    {sp.scoreboard.title}. {sp.scoreboard.metric}. As of {sp.scoreboard.as_of}.
                  </p>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse text-[1rem]">
                      <thead>
                        <tr className="border-y-2 border-ink text-left">
                          <th className="py-2 pr-3">#</th>
                          <th className="py-2 pr-3">Model</th>
                          <th className="py-2 pr-3">Lab</th>
                          <th className="py-2 pr-3 text-right">Score</th>
                          <th className="py-2 text-right">Move</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sp.scoreboard.rows.map((r) => (
                          <tr key={r.rank + r.name} className="border-b border-hairline">
                            <td className="py-2 pr-3 tabular-nums">{r.rank}</td>
                            <td className="py-2 pr-3 font-bold">{r.name}</td>
                            <td className="py-2 pr-3">{r.lab}</td>
                            <td className="py-2 pr-3 text-right tabular-nums">{r.score}</td>
                            <td className="py-2 text-right tabular-nums">{r.change ?? ""}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <a href={sp.scoreboard.url} target="_blank" rel="noopener" className="mt-2 inline-block text-[0.95rem] underline">
                    {sp.scoreboard.source}
                  </a>
                </>
              ) : (
                <p className="mt-3 border border-dashed border-ink p-4 italic">
                  No standings today. The editor only prints a table it looked up the same morning.
                </p>
              )}
            </div>
            <div className="space-y-8 lg:col-span-5 lg:border-l lg:border-ink lg:pl-8">
              {sp.match_report && (
                <article>
                  <p className="text-[1rem] italic">Match report</p>
                  <h3 className="mt-1 text-[1.55rem] font-bold leading-[1.12] text-balance">
                    <a href={sp.match_report.url} target="_blank" rel="noopener" className="no-underline hover:underline">
                      {sp.match_report.headline}
                    </a>
                  </h3>
                  <p className="mt-2 text-[1.05rem] italic text-muted">{sp.match_report.dek}</p>
                  <Body text={sp.match_report.body} className="mt-3" />
                  <a href={sp.match_report.url} target="_blank" rel="noopener" className="mt-2 inline-block text-[0.95rem] underline">
                    {sp.match_report.source}
                  </a>
                </article>
              )}
              {sp.transfers.length > 0 && (
                <div className={cn(sp.match_report && "border-t border-hairline pt-6")}>
                  <h3 className="text-[1.3rem] font-bold">Transfer window</h3>
                  <ul className="mt-3 space-y-3">
                    {sp.transfers.map((t, i) => (
                      <li key={i} className="text-[1.0625rem] leading-relaxed">
                        <a href={t.url} target="_blank" rel="noopener" className="font-bold no-underline hover:underline">
                          {t.headline}.
                        </a>{" "}
                        {t.one_line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {hasBack && (
        <section>
          <PageHead id="back" title="Back page" note="Farewells, updates, and everything else." />
          <div className="grid gap-10 lg:grid-cols-12">
            {(edition.obituaries.length > 0 || edition.follow_ups.length > 0) && (
              <div className="space-y-10 lg:col-span-4">
                {edition.obituaries.length > 0 && (
                  <div>
                    <h3 className="text-[1.3rem] font-bold">Obituaries</h3>
                    <p className="text-[0.95rem] italic text-muted">Models and APIs leaving us.</p>
                    <div className="mt-4 space-y-5">
                      {edition.obituaries.map((o, i) => (
                        <div key={i} className="border-t border-ink pt-3 text-center">
                          <p className="text-[1.2rem] font-bold">{o.name}</p>
                          <p className="text-[0.95rem] italic">{o.lived}</p>
                          <p className="mt-2 text-left text-[1.0625rem] leading-relaxed">
                            {o.body}{" "}
                            <a href={o.url} target="_blank" rel="noopener" className="underline">
                              Notice
                            </a>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {edition.follow_ups.length > 0 && (
                  <div>
                    <h3 className="text-[1.3rem] font-bold">Follow-ups</h3>
                    <div className="mt-4 space-y-8">
                      {edition.follow_ups.map((s, i) => (
                        <div key={i} className={cn(i > 0 && "border-t border-hairline pt-8")}>
                          <StoryBlock story={s} size="sm" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {edition.briefs.length > 0 && (
              <div className={cn(edition.obituaries.length + edition.follow_ups.length > 0 ? "lg:col-span-8 lg:border-l lg:border-ink lg:pl-8" : "lg:col-span-12")}>
                <h3 className="text-[1.3rem] font-bold">Briefs</h3>
                <ul className="mt-4 gap-8 sm:columns-2 [column-rule:1px_solid_var(--color-hairline)]">
                  {edition.briefs.map((b, i) => (
                    <li key={i} className="mb-5 break-inside-avoid text-[1.0625rem] leading-relaxed">
                      <a href={b.url} target="_blank" rel="noopener" className="font-bold no-underline hover:underline">
                        {b.headline}.
                      </a>{" "}
                      {b.one_line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <Separator className="mt-10" />
      <footer className="py-6 text-[0.95rem] text-muted">
        {m.preview ? (
          <p>Preview edition. Real editions print the cost of making them here.</p>
        ) : (
          <p>
            This edition cost ${m.cost_usd?.toFixed(2)} to print: {fmt(m.usage?.input)} tokens read, {fmt(m.usage?.output)} written,{" "}
            {m.usage?.searches ?? 0} web searches, {m.seconds}s. Edited by {m.model} against READER.md.
          </p>
        )}
      </footer>
    </main>
  );
}

function fmt(n?: number) {
  if (!n) return "0";
  return n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n);
}
