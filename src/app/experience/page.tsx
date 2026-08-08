import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Timeline } from "@/components/Timeline";
import { timeline } from "@/data/experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Experience — ${site.name}`,
};

export default function ExperiencePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-36 pb-28">
      <ScrollReveal>
        <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-3">Timeline</p>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground">Experience</h1>
        <p className="mt-4 text-muted leading-relaxed max-w-xl">
          Education, internships, team leadership, and recognitions along the way.
        </p>
      </ScrollReveal>

      <div className="mt-16">
        <Timeline entries={timeline} />
      </div>
    </section>
  );
}
