import type React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StoryImage } from "@/components/story-image";
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
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[0.75rem] uppercase tracking-[0.06em]">
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
  return <p className="mt-2 font-sans text-[0.8rem] text-muted">Fits: {fits}</p>;
}

function StoryBlock({ story, size = "md" }: { story: Story; size?: "lg" | "md" | "sm" }) {
  return (
    <article>
      {story.image && size === "sm" && <StoryImage src={story.image} credit={story.source} className="mt-0" />}
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
      {story.image && size !== "sm" && <StoryImage src={story.image} credit={story.source} className={size === "lg" ? "mt-5" : undefined} />}
      <Body text={story.body} className={cn("mt-4", size === "lg" && "lead-columns justify-print")} />
      <Fits fits={story.fits} />
    </article>
  );
}

function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-6 border-t border-ink pt-2">
      <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">{title}</h2>
      {note && <p className="font-sans text-[0.85rem] text-muted">{note}</p>}
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
      <div className="border-t-[3px] border-ink" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3">
        <h2 className="text-[clamp(2rem,4.5vw,2.9rem)] font-bold leading-none tracking-[-0.02em]">{title}</h2>
        <p className="font-sans text-[0.85rem] text-muted">{note}</p>
      </div>
    </div>
  );
}

function Ear({ children, align }: { children: React.ReactNode; align: "left" | "right" }) {
  return (
    <div className={cn("hidden w-48 shrink-0 border border-ink px-3 py-2 text-[0.82rem] leading-snug lg:block", align === "right" && "text-right")}>
      {children}
    </div>
  );
}

export function Masthead({ edition }: { edition?: Edition }) {
  const m = edition?.meta;
  const vol = m ? (m.preview ? "Preview edition" : `Vol. I . . . No. ${m.number}`) : "Vol. I";
  return (
    <header className="pt-4">
      <div className="flex justify-end pb-1">
        <Link href="/archive/" className="font-sans text-[0.78rem] underline">
          Archive
        </Link>
      </div>
      <div className="flex items-center justify-between gap-6">
        <Ear align="left">
          <span className="italic">“AI, explained before your chai goes cold.”</span>
        </Ear>
        <Link href="/" className="block min-w-0 flex-1 no-underline">
          <h1 className="text-center font-masthead text-ink text-[clamp(3rem,10vw,7.5rem)] font-normal leading-[0.95] lg:whitespace-nowrap lg:text-[clamp(4rem,6.8vw,6.75rem)]">
            The Chai Times
          </h1>
        </Link>
        <Ear align="right">
          {edition?.weather ? (
            <>
              <span className="font-bold">{edition.weather.headline}.</span> {edition.weather.detail}
            </>
          ) : (
            <span className="italic">Late edition</span>
          )}
        </Ear>
      </div>
      <p className="mt-2 text-center text-[1rem] italic lg:hidden">“AI, explained before your chai goes cold.”</p>
      <div className="mt-3 border-y border-ink py-[3px]">
        <div className="flex items-baseline justify-between gap-4 border-y border-ink py-1.5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em]">
          <span>{vol}</span>
          <span className="hidden text-center sm:block">{m ? longDate(m.date) : ""}</span>
          <span>{m ? (m.preview ? "Free" : `$${m.cost_usd?.toFixed(2)}`) : ""}</span>
        </div>
      </div>
      {m && <p className="mt-1 text-center font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] sm:hidden">{longDate(m.date)}</p>}
    </header>
  );
}

export function EditionView({ edition }: { edition: Edition }) {
  const [lead, ...second] = edition.front_page;
  const m = edition.meta;
  const sp = edition.sports;
  const hasSports = !!(sp.match_report || sp.transfers.length);
  const hasDesk = !!(edition.paper_of_the_day || edition.try_this_today);
  const hasNews = edition.my_stack.length + edition.models_labs.length + edition.tools.length > 0;
  const fc = m.fact_check;
  const fixes = (fc?.report ?? []).filter((r) => r.verdict === "corrected" || r.verdict === "removed");
  const hasBack = edition.obituaries.length + edition.follow_ups.length + edition.briefs.length > 0 || !!fc;


  return (
    <main>
      {m.preview && (
        <p className="mt-4 border border-ink px-4 py-2 font-sans text-[0.85rem]">
          This preview was assembled by hand from the feeds this repo already collects. From tomorrow, the reporter and fact-checker print a new edition every morning at 08:00 IST.
        </p>
      )}

      {lead && (
        <section className="grid gap-10 py-8 lg:grid-cols-12" aria-label="Front page">
          <div className={cn(second.length ? "lg:col-span-8" : "lg:col-span-12")}>
            <p className="mb-2 font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Today’s lead</p>
            <StoryBlock story={lead} size="lg" />
          </div>
          {second.length > 0 && (
          <div className="space-y-10 lg:col-span-4 lg:border-l lg:border-ink lg:pl-8">
            {second.map((s, i) => (
              <div key={i} className={cn(i > 0 && "border-t border-hairline pt-8")}>
                <StoryBlock story={s} size="md" />
              </div>
            ))}
          </div>
          )}
        </section>
      )}

      {edition.quote_of_the_day && (
        <figure className="border-y border-ink py-8 text-center">
          <p className="mb-3 font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Quotation of the Day</p>
          <blockquote className="mx-auto max-w-[44rem] text-[clamp(1.5rem,3.2vw,2.25rem)] italic leading-tight text-balance">
            “{edition.quote_of_the_day.quote}”
          </blockquote>
          <figcaption className="mt-3 font-sans text-[0.85rem]">
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
                <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">The editorial</p>
                <h3 className="mt-1 text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-balance">
                  {edition.editorial.headline}
                </h3>
                <Body text={edition.editorial.body} className="lead-columns drop-cap mt-5" />
                <p className="mt-4 text-[1rem] italic">The Editor</p>
              </article>
            )}
            {edition.hype_check.length > 0 && (
              <div className={cn(edition.editorial && "lg:col-span-4 lg:border-l lg:border-ink lg:pl-8")}>
                <h3 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Hype check</h3>
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
                <h3 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Paper of the day</h3>
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
                  <h3 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Try this today</h3>
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
            {sp.match_report && (
              <article className={cn(sp.transfers.length ? "lg:col-span-8" : "lg:col-span-12")}>
                  <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Match report</p>
                  <h3 className="mt-1 text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-balance">
                    <a href={sp.match_report.url} target="_blank" rel="noopener" className="no-underline hover:underline">
                      {sp.match_report.headline}
                    </a>
                  </h3>
                  <p className="mt-2 text-[1.05rem] italic text-muted">{sp.match_report.dek}</p>
                  {sp.match_report.image && <StoryImage src={sp.match_report.image} credit={sp.match_report.source} />}
                  <Body text={sp.match_report.body} className={cn("mt-3", !sp.transfers.length && "lead-columns")} />
                  <a href={sp.match_report.url} target="_blank" rel="noopener" className="mt-2 inline-block text-[0.95rem] underline">
                    {sp.match_report.source}
                  </a>
              </article>
            )}
            {sp.transfers.length > 0 && (
                <div className={cn(sp.match_report ? "lg:col-span-4 lg:border-l lg:border-ink lg:pl-8" : "lg:col-span-12")}>
                  <h3 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Transfer window</h3>
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
        </section>
      )}

      {hasBack && (
        <section>
          <PageHead id="back" title="Back page" note="Farewells, updates, and everything else." />
          {fc && (
            <div className="mb-10 border-y border-ink py-4">
              <h3 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Corrections</h3>
              <div className="pt-2">
                <p className="text-[1.0625rem] leading-relaxed">
                  {m.preview
                    ? "This preview was checked by hand. From Edition No. 1, every story is written by one agent and checked by another before printing."
                    : "Every story in this paper was written by one agent and checked by another before printing."}{" "}
                  {fc.confirmed !== undefined && (
                    <>
                      Today the fact-checker confirmed <b>{fc.confirmed}</b>, corrected <b>{fc.corrected ?? 0}</b>, removed{" "}
                      <b>{fc.removed ?? 0}</b> and could not verify <b>{fc.unverified ?? 0}</b>
                      {m.agents?.fact_checker?.usage.fetches ? <>, after reading {m.agents.fact_checker.usage.fetches} source pages</> : null}.
                    </>
                  )}
                </p>
                {fixes.length > 0 && (
                  <ul className="mt-3 divide-y divide-hairline border-t border-hairline">
                    {fixes.map((r, i) => (
                      <li key={i} className="py-3 text-[1.0625rem] leading-relaxed">
                        <Badge variant={r.verdict === "removed" ? "default" : "outline"}>{r.verdict === "removed" ? "Removed" : "Corrected"}</Badge>{" "}
                        <span className="font-bold">{r.headline}.</span> {r.note}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          <div className="grid gap-10 lg:grid-cols-12">
            {(edition.obituaries.length > 0 || edition.follow_ups.length > 0) && (
              <div className="space-y-10 lg:col-span-4">
                {edition.obituaries.length > 0 && (
                  <div>
                    <h3 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Obituaries</h3>
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
                    <h3 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Follow-ups</h3>
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
                <h3 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.09em]">Briefs</h3>
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
      <footer className="py-6 font-sans text-[0.8rem] text-muted">
        {m.preview ? (
          <p>Preview edition. Real editions print the cost of making them here.</p>
        ) : (
          <p>
            This edition cost ${m.cost_usd?.toFixed(2)} to print: {fmt(m.usage?.input)} tokens read, {fmt(m.usage?.output)} written,{" "}
            {m.usage?.searches ?? 0} web searches, {m.seconds}s.
            {m.agents ? (
              <>
                {" "}
                Reporter ${m.agents.reporter.cost_usd.toFixed(2)}, fact-checker ${m.agents.fact_checker.cost_usd.toFixed(2)}. Both {m.model}, working from
                READER.md.
              </>
            ) : (
              <> Edited by {m.model} against READER.md.</>
            )}
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
