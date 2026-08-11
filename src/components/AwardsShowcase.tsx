import { useEffect, useRef, useState } from "react"
import type { Award } from "../data/projects"

function AwardCard({ award, index }: { award: Award; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
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
            { threshold: 0.3, rootMargin: "0px 0px -60px 0px" }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`award-card ${visible ? "award-card-visible" : ""}`}
            style={{ transitionDelay: visible ? `${index * 70}ms` : "0ms" }}
        >
            <svg className="award-mark" viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
            <p className="award-count">{award.count}</p>
            <p className="award-title">{award.title}</p>
        </div>
    )
}

export function AwardsShowcase({ awards }: { awards: Award[] }) {
    return (
        <div className="awards-grid">
            {awards.map((award, index) => (
                <AwardCard key={award.title} award={award} index={index} />
            ))}
        </div>
    )
}
