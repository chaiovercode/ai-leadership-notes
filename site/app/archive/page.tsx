import Link from "next/link";
import { Masthead } from "@/components/edition";
import { allEditions, longDate } from "@/lib/editions";

export const metadata = { title: "Archive | The Chai Times" };

export default function Archive() {
  const editions = allEditions();
  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-[720px] py-10">
        <h2 className="border-t-2 border-ink pt-2 text-[1.15rem] font-bold">Archive</h2>
        {editions.length === 0 && <p className="mt-6 italic">No editions yet.</p>}
        <ul className="mt-4">
          {editions.map((e) => (
            <li key={e.meta.date} className="border-b border-hairline py-4">
              <Link href={`/editions/${e.meta.date}/`} className="no-underline hover:underline">
                <span className="block text-[0.95rem] text-muted">
                  {e.meta.preview ? "Preview edition" : `Edition No. ${e.meta.number}`}, {longDate(e.meta.date)}
                </span>
                <span className="mt-1 block text-[1.35rem] font-bold leading-snug">{e.front_page[0]?.headline ?? "No front page"}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
