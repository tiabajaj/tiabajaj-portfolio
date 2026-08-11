import { useEffect, useRef, useState } from "react"
import type { TimelineStep } from "../data/projects"

function TimelineItem({ step, index }: { step: TimelineStep; index: number }) {
    const ref = useRef<HTMLLIElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.4, rootMargin: "0px 0px -80px 0px" }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <li
            ref={ref}
            className={`timeline-item ${visible ? "timeline-item-visible" : ""}`}
            style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
        >
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-content">
                <p className="timeline-period">{step.period}</p>
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-description">{step.description}</p>
            </div>
        </li>
    )
}

export function Timeline({ steps }: { steps: TimelineStep[] }) {
    return (
        <ol className="timeline">
            {steps.map((step, index) => (
                <TimelineItem key={step.title} step={step} index={index} />
            ))}
        </ol>
    )
}
