import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-36 pb-28">
      <ScrollReveal>
        <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-3">Portfolio</p>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground">Projects</h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          A collection of aerospace engineering work spanning controls, propulsion, aerodynamics, and software —
          from student team projects to independent research.
        </p>
      </ScrollReveal>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
