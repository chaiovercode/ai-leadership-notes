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

export function Masthead({ edition }: { edition?: Edition }) {
  return (
    <header className="pt-6">
      <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2 text-[0.95rem]">
        <span>{edition ? (edition.meta.preview ? "Preview edition" : `Edition No. ${edition.meta.number}`) : "Edition No. 1"}</span>
        <span className="hidden text-center sm:block">{edition ? longDate(edition.meta.date) : ""}</span>
        <Link href="/archive/" className="underline">
          Archive
        </Link>
      </div>
      <Link href="/" className="block no-underline">
        <h1 className="pt-4 text-center font-masthead text-[clamp(3.2rem,11vw,7.5rem)] font-normal leading-[0.95]">
          The Chai Times
        </h1>
      </Link>
      <p className="mt-2 text-center text-[1.15rem] italic">AI, explained before your chai goes cold.</p>
      {edition && <p className="mt-1 text-center text-[0.95rem] sm:hidden">{longDate(edition.meta.date)}</p>}
      <div className="rule-double mt-4" />
    </header>
  );
}

export function EditionView({ edition }: { edition: Edition }) {
  const [lead, ...second] = edition.front_page;
  const m = edition.meta;

  return (
    <main>
      {m.preview && (
        <p className="mt-4 border border-ink px-4 py-2 text-[0.98rem]">
          This preview was assembled by hand from the feeds this repo already collects. The first real edition is written by the editor at 08:00 IST.
        </p>
      )}

      {lead && (
        <section className="grid gap-10 py-8 lg:grid-cols-12" aria-label="Front page">
          <div className={cn(second.length ? "lg:col-span-8" : "lg:col-span-12")}>
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

      {(edition.paper_of_the_day || edition.try_this_today) && (
        <section className="grid gap-8 py-6 lg:grid-cols-2">
          {edition.paper_of_the_day && (
            <div className="border border-ink p-6">
              <h2 className="text-[1.15rem] font-bold">Paper of the day</h2>
              <h3 className="mt-3 text-[1.45rem] font-bold leading-tight text-balance">
                <a href={edition.paper_of_the_day.url} target="_blank" rel="noopener" className="no-underline hover:underline">
                  {edition.paper_of_the_day.title}
                </a>
              </h3>
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
                <h2 className="text-[1.15rem] font-bold">Try this today</h2>
                <span className="text-[0.95rem]">{edition.try_this_today.minutes} minutes</span>
              </div>
              <h3 className="mt-3 text-[1.45rem] font-bold leading-tight text-balance">{edition.try_this_today.title}</h3>
              <p className="mt-2 text-[1.0625rem] italic">{edition.try_this_today.why}</p>
              <ol className="mt-4 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-relaxed marker:font-bold">
                {edition.try_this_today.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          )}
        </section>
      )}

      {(edition.hype_check.length > 0 || edition.follow_ups.length > 0) && (
        <section className="grid gap-10 py-6 lg:grid-cols-2">
          {edition.hype_check.length > 0 && (
            <div>
              <SectionHead title="Hype check" note="Big claims, checked against what has actually been shown." />
              <div className="space-y-6">
                {edition.hype_check.map((h, i) => (
                  <div key={i} className={cn(i > 0 && "border-t border-hairline pt-6")}>
                    <p className="text-[1.15rem] font-bold leading-snug">{h.claim}</p>
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
          {edition.follow_ups.length > 0 && (
            <div>
              <SectionHead title="Follow-ups" note="Stories we covered before, with something new." />
              <div className="space-y-8">
                {edition.follow_ups.map((s, i) => (
                  <div key={i} className={cn(i > 0 && "border-t border-hairline pt-8")}>
                    <StoryBlock story={s} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {edition.briefs.length > 0 && (
        <section className="py-6">
          <SectionHead title="Briefs" />
          <ul className="gap-8 sm:columns-2 lg:columns-3 [column-rule:1px_solid_var(--color-hairline)]">
            {edition.briefs.map((b, i) => (
              <li key={i} className="mb-5 break-inside-avoid text-[1.0625rem] leading-relaxed">
                <a href={b.url} target="_blank" rel="noopener" className="font-bold no-underline hover:underline">
                  {b.headline}.
                </a>{" "}
                {b.one_line}
              </li>
            ))}
          </ul>
        </section>
      )}

      <Separator className="mt-6" />
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
