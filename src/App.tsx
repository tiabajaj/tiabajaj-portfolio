import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

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

// Placeholder — swap in your real software list.
const SOFTWARE_TOOLS = ["Python", "MATLAB", "SolidWorks", "Simulink", "ANSYS", "C++"]

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

function Reveal({
    children,
    className = "",
    delay = 0,
}: {
    children: ReactNode
    className?: string
    delay?: number
}) {
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
            { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
            style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
        >
            {children}
        </div>
    )
}

function Navbar() {
    return (
        <header className="nav">
            <span className="nav-name">Tia Bajaj</span>
            <button className="nav-menu" aria-label="Open menu" type="button">
                <span />
                <span />
            </button>
        </header>
    )
}

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
        <>
            <Navbar />
            <main className="page">
                <section className="hero" aria-label="Intro">
                    <div className="starfield" aria-hidden="true" />

                    <div className="hero-inner">
                        <span className="hero-marker" aria-hidden="true" />
                        <h1 className="hero-name">
                            <span className="hero-name-lead">I’m </span>
                            <span className="hero-name-emph">Tia Bajaj</span>
                        </h1>
                        <p className={`role-line ${reducedMotion ? "reduced" : ""}`}>{ROLE_PHRASES[roleIndex]}.</p>
                        <a href="mailto:tiabajaj@gmail.com" className="mission-button">
                            Mission contact
                        </a>
                    </div>

                    <div className="tools-marquee" aria-label="Software">
                        <div className="tools-marquee-track">
                            {[...SOFTWARE_TOOLS, ...SOFTWARE_TOOLS].map((tool, i) => (
                                <span className="tools-marquee-item" key={`${tool}-${i}`}>
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="content">
                    <Reveal>
                        <p className="philosophy">
                            I engineer elegant, resilient systems for the boundary between atmosphere and orbit.
                        </p>
                    </Reveal>
                </section>

                <section className="projects-intro" aria-label="Projects">
                    <Reveal>
                        <h2>Projects</h2>
                        <p className="section-subtitle">Rigorous engineering for missions that need to endure.</p>
                    </Reveal>
                </section>

                <section className="mission-work" aria-label="Mission work">
                    <Reveal>
                        <h2>Mission work</h2>
                        <p className="section-subtitle">Selected aerospace missions, systems, and prototypes.</p>
                    </Reveal>
                    <Reveal delay={150}>
                        <div className="carousel-window" tabIndex={0} aria-label="Project carousel">
                            <div className="carousel-track" style={{ transform: `translateX(${trackX}px)` }}>
                                {MISSION_PROJECTS.map((project) => (
                                    <article className="mission-card" key={project.title}>
                                        <img src={project.image} alt={project.title} />
                                        <div className="card-overlay">
                                            <p className="card-category">{project.org}</p>
                                            <h3>{project.title}</h3>
                                            <p className="card-role">{project.role}</p>
                                            <p className="card-focus">{project.focus}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                <section className="cta" aria-label="Contact">
                    <Reveal className="cta-reveal">
                        <span className="cta-sparkle" aria-hidden="true">
                            ✦
                        </span>
                        <h2>Let’s build what moves beyond Earth.</h2>
                        <a href="mailto:tiabajaj@gmail.com" className="mission-button">
                            Start a conversation
                        </a>
                    </Reveal>
                </section>
            </main>
        </>
    )
}
