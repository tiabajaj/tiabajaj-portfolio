"use client";

import type { RefObject } from "react";

const draw = {
  pathLength: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
} as const;

export function SatelliteSketch({ rootRef }: { rootRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={rootRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg width="300" height="175" viewBox="0 0 240 140" style={{ overflow: "visible" }}>
        <g fill="none" stroke="var(--foreground)" strokeWidth={1.1} strokeLinecap="round" strokeOpacity={0.9}>
          {/* body */}
          <rect data-draw="body" x={100} y={52} width={40} height={36} rx={3} {...draw} />

          {/* struts */}
          <line data-draw="strut" x1={90} y1={70} x2={100} y2={70} {...draw} />
          <line data-draw="strut" x1={140} y1={70} x2={150} y2={70} {...draw} />

          {/* left panel + cell lines */}
          <rect data-draw="panel" x={14} y={58} width={76} height={24} {...draw} />
          <line data-draw="panel" x1={33} y1={58} x2={33} y2={82} {...draw} />
          <line data-draw="panel" x1={52} y1={58} x2={52} y2={82} {...draw} />
          <line data-draw="panel" x1={71} y1={58} x2={71} y2={82} {...draw} />

          {/* right panel + cell lines */}
          <rect data-draw="panel" x={150} y={58} width={76} height={24} {...draw} />
          <line data-draw="panel" x1={169} y1={58} x2={169} y2={82} {...draw} />
          <line data-draw="panel" x1={188} y1={58} x2={188} y2={82} {...draw} />
          <line data-draw="panel" x1={207} y1={58} x2={207} y2={82} {...draw} />

          {/* antenna */}
          <line data-draw="antenna" x1={120} y1={52} x2={120} y2={28} {...draw} />
          <circle data-draw="antenna" cx={120} cy={22} r={6} {...draw} />
        </g>
      </svg>
    </div>
  );
}
