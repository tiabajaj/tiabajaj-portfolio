"use client";

export function SkipButton({ onSkip, visible }: { onSkip: () => void; visible: boolean }) {
  return (
    <button
      type="button"
      onClick={onSkip}
      aria-label="Skip intro animation"
      className={`absolute bottom-6 right-6 z-10 rounded-full border border-border-strong px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted transition-all hover:text-foreground hover:border-foreground/40 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      Skip intro
    </button>
  );
}
