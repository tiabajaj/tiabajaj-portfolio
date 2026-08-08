"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award } from "lucide-react";
import type { TimelineEntry } from "@/data/experience";

const iconFor = {
  education: GraduationCap,
  experience: Briefcase,
  achievement: Award,
};

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative border-l border-border pl-8 sm:pl-10">
      {entries.map((entry, i) => {
        const Icon = iconFor[entry.kind];
        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative pb-12 last:pb-0"
          >
            <span className="absolute -left-[41px] sm:-left-[49px] flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-background-elevated text-accent">
              <Icon size={15} />
            </span>

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg text-foreground">{entry.title}</h3>
              <span className="font-mono text-xs text-muted-dim uppercase tracking-wide">{entry.period}</span>
            </div>
            <p className="text-sm text-accent/90 mt-0.5">
              {entry.org}
              {entry.location ? ` · ${entry.location}` : ""}
            </p>
            <ul className="mt-3 space-y-1.5">
              {entry.description.map((line, j) => (
                <li key={j} className="text-sm text-muted leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
