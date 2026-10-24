import { EditionView, Masthead } from "@/components/edition";
import { allEditions } from "@/lib/editions";

export default function Home() {
  const latest = allEditions()[0];
  return (
    <>
      <Masthead edition={latest} />
      {latest ? (
        <EditionView edition={latest} />
      ) : (
        <p className="py-24 text-center text-[1.3rem] italic">The first edition prints tomorrow at 08:00 IST.</p>
      )}
    </>
  );
}
