"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full rounded-2xl border border-border bg-background-card p-6 card-glow transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs text-accent tracking-wider">{project.year}</span>
          <ArrowUpRight
            size={18}
            className="text-muted-dim transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        <h3 className="mt-4 font-display text-xl text-foreground leading-snug">{project.title}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wide text-muted-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
