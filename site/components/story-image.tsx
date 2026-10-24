"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** A story's photo, credited to its source. Hides itself if the image fails to load. */
export function StoryImage({ src, credit, className }: { src: string; credit: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className={cn("my-4", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="aspect-[16/9] w-full border border-ink/20 object-cover"
      />
      <figcaption className="mt-1 text-right font-sans text-[0.7rem] text-muted">Image: {credit}</figcaption>
    </figure>
  );
}
