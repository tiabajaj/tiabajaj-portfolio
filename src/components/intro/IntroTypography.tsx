"use client";

import type { RefObject } from "react";
import { site } from "@/data/site";

export function IntroTypography({
  roleRef,
  nameRef,
  taglineRef,
  scrollCueRef,
}: {
  roleRef: RefObject<HTMLParagraphElement | null>;
  nameRef: RefObject<HTMLHeadingElement | null>;
  taglineRef: RefObject<HTMLParagraphElement | null>;
  scrollCueRef: RefObject<HTMLParagraphElement | null>;
}) {
  return (
    <div className="absolute inset-x-0 bottom-[6%] flex flex-col items-center text-center px-6 pointer-events-none">
      <p
        ref={roleRef}
        className="font-mono text-xs sm:text-sm tracking-[0.35em] text-accent uppercase opacity-0 mb-4"
      >
        {site.role}
      </p>
      <h1
        ref={nameRef}
        className="font-display text-4xl sm:text-6xl tracking-[0.06em] text-foreground uppercase opacity-0"
      >
        {site.name}
      </h1>
      <p
        ref={taglineRef}
        className="mt-5 max-w-md text-sm sm:text-base text-muted leading-relaxed opacity-0"
      >
        {site.tagline}
      </p>
      <p
        ref={scrollCueRef}
        className="mt-12 font-mono text-[11px] tracking-[0.3em] text-muted-dim uppercase opacity-0"
      >
        Scroll to explore
      </p>
    </div>
  );
}
