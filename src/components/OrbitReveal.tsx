import { useEffect, useRef, useState } from "react"
import { PROJECTS } from "../data/projects"

const REVEAL_PROJECTS = PROJECTS.filter((project) => project.slug !== "global-frc-initiative")

const ORBIT_POSITIONS = [
    { left: "10%", top: "16%" },
    { left: "90%", top: "18%" },
    { left: "8%", top: "84%" },
    { left: "92%", top: "82%" },
] as const

const RING_RADIUS = 19
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

const RINGS = [
    { cx: 50, cy: 37, start: 0, span: 0.11 },
    { cx: 33, cy: 59, start: 0.06, span: 0.11 },
    { cx: 67, cy: 59, start: 0.12, span: 0.11 },
] as const

const HEADING_START = 0.22
const HEADING_SPAN = 0.13

const CARD_START = 0.34
const CARD_STEP = 0.12
const CARD_SPAN = 0.3

function clamp01(value: number) {
    return Math.min(1, Math.max(0, value))
}

function cardMotion(local: number) {
    const clamped = clamp01(local)
    const z = -760 + clamped * 1180
    let opacity: number
    if (clamped < 0.22) opacity = clamped / 0.22
    else if (clamped > 0.78) opacity = (1 - clamped) / 0.22
    else opacity = 1
    return { z, opacity: clamp01(opacity) }
}

export function OrbitReveal({ reducedMotion }: { reducedMotion: boolean }) {
    const trackRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (reducedMotion) {
            setProgress(1)
            return
        }

        let frame = 0
        const onScroll = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                const el = trackRef.current
                if (!el) return
                const rect = el.getBoundingClientRect()
                const total = rect.height - window.innerHeight
                const raw = total > 0 ? -rect.top / total : 0
                setProgress(clamp01(raw))
            })
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        onScroll()
        return () => {
            window.removeEventListener("scroll", onScroll)
            cancelAnimationFrame(frame)
        }
    }, [reducedMotion])

    const headingProgress = reducedMotion ? 1 : clamp01((progress - HEADING_START) / HEADING_SPAN)

    return (
        <div className="orbit-reveal-track" ref={trackRef}>
            <div className="orbit-reveal-stage">
                <div className="orbit-reveal-venn">
                    <svg
                        className="orbit-reveal-svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden="true"
                    >
                        {RINGS.map((ring, index) => {
                            const local = reducedMotion ? 1 : clamp01((progress - ring.start) / ring.span)
                            const offset = RING_CIRCUMFERENCE * (1 - local)
                            const angleRad = ((-90 + local * 360) * Math.PI) / 180
                            const tipX = ring.cx + RING_RADIUS * Math.cos(angleRad)
                            const tipY = ring.cy + RING_RADIUS * Math.sin(angleRad)
                            const tipOpacity = reducedMotion || local <= 0 || local >= 1 ? 0 : 1

                            return (
                                <g key={index}>
                                    <circle
                                        cx={ring.cx}
                                        cy={ring.cy}
                                        r={RING_RADIUS}
                                        fill="none"
                                        stroke="rgba(255, 255, 255, 0.16)"
                                        strokeWidth="0.35"
                                        strokeLinecap="round"
                                        strokeDasharray={RING_CIRCUMFERENCE}
                                        strokeDashoffset={offset}
                                        transform={`rotate(-90 ${ring.cx} ${ring.cy})`}
                                    />
                                    <circle
                                        cx={tipX}
                                        cy={tipY}
                                        r="0.9"
                                        fill="rgba(158, 197, 255, 0.6)"
                                        opacity={tipOpacity}
                                        style={{ filter: "blur(1.2px)", transition: "opacity 0.2s linear" }}
                                    />
                                    <circle
                                        cx={tipX}
                                        cy={tipY}
                                        r="0.28"
                                        fill="rgba(255, 255, 255, 0.85)"
                                        opacity={tipOpacity}
                                        style={{ transition: "opacity 0.2s linear" }}
                                    />
                                </g>
                            )
                        })}
                    </svg>

                    <div className="orbit-reveal-dots" aria-hidden="true">
                        <span className="orbit-reveal-dot orbit-reveal-dot-a" style={{ opacity: headingProgress }} />
                        <span className="orbit-reveal-dot orbit-reveal-dot-b" style={{ opacity: headingProgress }} />
                        <span className="orbit-reveal-dot orbit-reveal-dot-c" style={{ opacity: headingProgress }} />
                    </div>

                    <p className="orbit-reveal-heading" style={{ opacity: headingProgress }}>
                        Curiosity. Friction. Iteration.
                        <br />
                        The Gears of My Design.
                    </p>
                </div>

                {REVEAL_PROJECTS.map((project, index) => {
                    const start = CARD_START + index * CARD_STEP
                    const local = reducedMotion ? 0.5 : (progress - start) / CARD_SPAN
                    const { z, opacity } = cardMotion(local)
                    const pos = ORBIT_POSITIONS[index % ORBIT_POSITIONS.length]

                    return (
                        <div
                            key={project.slug}
                            className="orbit-reveal-card"
                            style={{
                                left: pos.left,
                                top: pos.top,
                                opacity: reducedMotion ? 1 : opacity,
                                transform: `translate(-50%, -50%) translateZ(${reducedMotion ? 0 : z}px)`,
                            }}
                        >
                            <img src={project.image} alt="" />
                            <span>{project.title}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
