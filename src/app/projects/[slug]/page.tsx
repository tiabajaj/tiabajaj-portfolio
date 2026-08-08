import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { projects, getProjectBySlug } from "@/data/projects";
import { site } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? `${project.title} — ${site.name}` : site.name };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pt-36 pb-28">
      <ScrollReveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} /> All Projects
        </Link>

        <div className="mt-8 flex items-center gap-3 font-mono text-xs text-accent tracking-wider uppercase">
          <span>{project.year}</span>
          <span className="text-muted-dim">·</span>
          <span>{project.role}</span>
        </div>

        <h1 className="mt-4 font-display text-4xl sm:text-5xl text-foreground leading-tight">
          {project.title}
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs font-mono uppercase tracking-wide text-muted-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-14 space-y-5">
        {project.description.map((para, i) => (
          <p key={i} className="text-foreground/85 leading-relaxed">
            {para}
          </p>
        ))}
      </ScrollReveal>

      <ScrollReveal delay={0.15} className="mt-14 rounded-2xl border border-border bg-background-card p-6 sm:p-8">
        <h2 className="font-display text-xl text-foreground mb-5">Highlights</h2>
        <ul className="space-y-3">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
              {h}
            </li>
          ))}
        </ul>
      </ScrollReveal>

      {project.links && project.links.length > 0 && (
        <ScrollReveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              {link.label} <ArrowUpRight size={14} />
            </a>
          ))}
        </ScrollReveal>
      )}
    </article>
  );
}
