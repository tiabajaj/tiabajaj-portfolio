import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-dim uppercase tracking-wider">
          © {new Date().getFullYear()} {site.name} — Built with Next.js &amp; Three.js
        </p>
        <div className="flex items-center gap-4">
          <Link href={site.social.github} target="_blank" aria-label="GitHub" className="text-muted hover:text-accent transition-colors">
            <GithubIcon size={18} />
          </Link>
          <Link href={site.social.linkedin} target="_blank" aria-label="LinkedIn" className="text-muted hover:text-accent transition-colors">
            <LinkedinIcon size={18} />
          </Link>
          <Link href={`mailto:${site.email}`} aria-label="Email" className="text-muted hover:text-accent transition-colors">
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
