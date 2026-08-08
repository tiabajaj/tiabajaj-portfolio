import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/data/site";
import { timeline } from "@/data/experience";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
};

export default function AboutPage() {
  const education = timeline.filter((t) => t.kind === "education");

  return (
    <section className="mx-auto max-w-4xl px-6 pt-36 pb-28">
      <ScrollReveal>
        <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-3">About</p>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground">Hi, I&apos;m {site.name.split(" ")[0]}.</h1>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mt-8 space-y-5 max-w-2xl">
        <p className="text-lg text-muted leading-relaxed">
          I&apos;m an {site.role.toLowerCase()} based in {site.location}, focused on the intersection of
          controls, propulsion, and flight software. I like taking ideas from a whiteboard to a working
          test article — whether that&apos;s a satellite attitude controller or a rocket motor test stand.
        </p>
        <p className="text-muted leading-relaxed">
          Outside of coursework, I lead the controls subteam for my university&apos;s rocketry club, and spend
          my free time reading up on orbital mechanics, tinkering with embedded flight computers, and finding
          excuses to write more simulation code than strictly necessary.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.14} className="mt-16">
        <h2 className="font-display text-2xl text-foreground mb-6">Skills &amp; Tools</h2>
        <div className="flex flex-wrap gap-3">
          {site.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-background-card px-4 py-2 text-sm text-foreground/85"
            >
              {skill}
            </span>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="mt-16">
        <h2 className="font-display text-2xl text-foreground mb-6">Education</h2>
        <div className="space-y-6">
          {education.map((e) => (
            <div key={e.id} className="rounded-2xl border border-border bg-background-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg text-foreground">{e.title}</h3>
                <span className="font-mono text-xs text-muted-dim uppercase tracking-wide">{e.period}</span>
              </div>
              <p className="text-sm text-accent/90 mt-0.5">
                {e.org}
                {e.location ? ` · ${e.location}` : ""}
              </p>
              <ul className="mt-3 space-y-1.5">
                {e.description.map((line, i) => (
                  <li key={i} className="text-sm text-muted leading-relaxed">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
