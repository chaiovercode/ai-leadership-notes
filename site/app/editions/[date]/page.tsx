import { notFound } from "next/navigation";
import { EditionView, Masthead } from "@/components/edition";
import { allEditions, getEdition } from "@/lib/editions";

export function generateStaticParams() {
  const dates = allEditions().map((e) => ({ date: e.meta.date }));
  return dates.length ? dates : [{ date: "none" }];
}

export default async function EditionPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const edition = getEdition(date);
  if (!edition) notFound();
  return (
    <>
      <Masthead edition={edition} />
      <EditionView edition={edition} />
    </>
  );
}
