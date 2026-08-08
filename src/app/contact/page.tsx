import type { Metadata } from "next";
import { Mail, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
};

const cards = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "View my repositories",
    href: site.social.github,
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: site.social.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: site.resumeHref,
    icon: FileDown,
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-36 pb-28">
      <ScrollReveal>
        <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-3">Contact</p>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground max-w-xl">
          Let&apos;s build something that flies.
        </h1>
        <p className="mt-5 text-muted leading-relaxed max-w-xl">
          Open to internships, research collaborations, and just talking shop about aerospace. Reach out
          through any of the channels below.
        </p>
      </ScrollReveal>

      <div className="mt-14 grid sm:grid-cols-2 gap-5">
        {cards.map((card, i) => (
          <ScrollReveal key={card.label} delay={i * 0.06}>
            <a
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-background-card p-6 card-glow transition-all duration-300 hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-strong text-accent group-hover:bg-accent group-hover:text-background transition-colors">
                <card.icon size={18} />
              </span>
              <span>
                <span className="block text-sm font-mono uppercase tracking-wide text-muted-dim">
                  {card.label}
                </span>
                <span className="block text-foreground/90 mt-0.5">{card.value}</span>
              </span>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
