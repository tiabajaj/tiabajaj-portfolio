import { useEffect, useMemo, useState } from "react"

type Project = {
    title: string
    org: string
    role: string
    focus: string
    image: string
}

const ROLE_PHRASES = [
    "AEROSPACE ENGINEER",
    "MISSION SYSTEMS DESIGNER",
    "ORBITAL SYSTEMS THINKER",
    "GUIDANCE & CONTROL",
]

const MISSION_PROJECTS: Project[] = [
    {
        title: "Project Polaris",
        org: "NASA L’SPACE Mission Concept Academy",
        role: "Project Manager · Engineer",
        focus: "Mission architecture · Systems integration",
        image: "https://images.unsplash.com/photo-1677926405168-fa86268b7295?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
    },
    {
        title: "TARA",
        org: "Cal Poly BEACoN · Polyspace",
        role: "Lead UI/UX Designer",
        focus: "Trajectory analysis · Aerospace software",
        image: "https://images.unsplash.com/photo-1633465974823-5a43265d2126?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
    },
    {
        title: "PolySat Drag Sail",
        org: "PolySat",
        role: "Dragsail Project Team Member",
        focus: "CubeSat mechanisms · Deorbit systems",
        image: "https://images.unsplash.com/photo-1622036409086-5240d050d926?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
    },
    {
        title: "FRC Robotics Systems",
        org: "Competitive Robotics",
        role: "Design & Drive Team Lead",
        focus: "CAD · Manufacturing · Rapid prototyping",
        image: "https://framerusercontent.com/images/xQAKKE4Lp79vYYacuWjQUbkzyuA.png?width=1370&height=1294&kb=1215",
    },
]

function useReducedMotion() {
    const [reduced, setReduced] = useState(false)
    useEffect(() => {
        if (typeof window === "undefined") return
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        const onChange = () => setReduced(mq.matches)
        onChange()
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [])
    return reduced
}

export default function App() {
    const reducedMotion = useReducedMotion()
    const [roleIndex, setRoleIndex] = useState(0)
    const [cardIndex, setCardIndex] = useState(0)

    useEffect(() => {
        if (reducedMotion) return
        const id = window.setInterval(() => {
            setRoleIndex((v) => (v + 1) % ROLE_PHRASES.length)
        }, 2500)
        return () => window.clearInterval(id)
    }, [reducedMotion])

    useEffect(() => {
        if (reducedMotion) return
        const id = window.setInterval(() => {
            setCardIndex((v) => (v + 1) % MISSION_PROJECTS.length)
        }, 3200)
        return () => window.clearInterval(id)
    }, [reducedMotion])

    const cardWidth = 290
    const gap = 24
    const viewportPadding = 0.1
    const cardCenterOffset = useMemo(() => (typeof window !== "undefined" ? window.innerWidth * viewportPadding : 0), [])
    const trackX = useMemo(
        () => -(cardWidth + gap) * cardIndex + cardCenterOffset,
        [cardCenterOffset, cardIndex]
    )

    return (
        <main className="page">
            <section className="hero" aria-label="Intro">
                <div className="starfield" aria-hidden="true" />
                <div className={`drone-wrap ${reducedMotion ? "reduced" : ""}`} aria-hidden="true">
                    <svg className="drone" viewBox="0 0 72 40">
                        <ellipse cx="36" cy="20" rx="23" ry="9" className="drone-glow" />
                        <line x1="18" y1="14" x2="54" y2="14" className="drone-line" />
                        <line x1="18" y1="26" x2="54" y2="26" className="drone-line" />
                        <rect x="28" y="14" width="16" height="12" rx="3" className="drone-body" />
                        {[18, 54].map((x) => (
                            <g key={`a${x}`}>
                                <ellipse cx={x} cy="14" rx="6.5" ry="1.4" className="drone-prop" />
                                <circle cx={x} cy="14" r="1.5" className="drone-pulse" />
                            </g>
                        ))}
                        {[18, 54].map((x) => (
                            <g key={`b${x}`}>
                                <ellipse cx={x} cy="26" rx="6.5" ry="1.4" className="drone-prop" />
                                <circle cx={x} cy="26" r="1.5" className="drone-pulse" />
                            </g>
                        ))}
                    </svg>
                </div>

                <div className="hero-inner">
                    <h1 className="hero-name">I’m Tia Bajaj</h1>
                    <p className={`role-line ${reducedMotion ? "reduced" : ""}`}>{ROLE_PHRASES[roleIndex]}</p>
                    <a href="mailto:tiabajaj@gmail.com" className="mission-button">
                        Begin Mission Contact
                    </a>
                </div>
            </section>

            <section className="content">
                <p className="philosophy">
                    I build mission-ready systems where engineering precision meets human-centered design — from
                    orbital architecture to software interfaces that support high-consequence decisions.
                </p>

                <div className="capabilities">
                    <h2>Capabilities</h2>
                    <ul>
                        <li>Mission architecture and systems integration</li>
                        <li>Guidance, controls, and orbital analysis workflows</li>
                        <li>CAD-driven prototyping and aerospace software UI/UX</li>
                    </ul>
                </div>
            </section>

            <section className="mission-work" aria-label="Mission work">
                <h2>Mission Work</h2>
                <div className="carousel-window" tabIndex={0} aria-label="Project carousel">
                    <div className="carousel-track" style={{ transform: `translateX(${trackX}px)` }}>
                        {MISSION_PROJECTS.map((project) => (
                            <article className="mission-card" key={project.title}>
                                <img src={project.image} alt={project.title} />
                                <div className="card-overlay">
                                    <h3>{project.title}</h3>
                                    <p>{project.org}</p>
                                    <p>{project.role}</p>
                                    <p>{project.focus}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
