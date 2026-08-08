import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioIntro } from "@/components/intro/PortfolioIntro";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ProjectCard } from "@/components/ProjectCard";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero / cinematic intro */}
      <section className="relative h-screen">
        <PortfolioIntro />
      </section>

      {/* Stats */}
      <section className="relative border-y border-border grid-backdrop">
        <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {site.stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="text-center sm:text-left">
                <div className="font-display text-3xl sm:text-4xl text-foreground">
                  <AnimatedCounter value={stat.value} suffix={stat.label.includes("Lines") ? "+" : ""} />
                </div>
                <p className="mt-1 text-xs sm:text-sm text-muted font-mono uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-3">Selected Work</p>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground">Featured Projects</h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors font-mono"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Skills marquee */}
      <section className="border-y border-border py-10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...site.skills, ...site.skills].map((skill, i) => (
            <span
              key={i}
              className="mx-6 font-display text-2xl sm:text-3xl text-muted-dim/70 flex items-center gap-6"
            >
              {skill}
              <span className="text-accent/50 text-xl">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-28 text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground max-w-2xl mx-auto">
            Interested in working together or want to talk shop on orbital mechanics?
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            Let&apos;s Connect
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
