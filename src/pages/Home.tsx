import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { useNavigate } from "react-router-dom"
import { OrbitReveal } from "../components/OrbitReveal"
import { Reveal } from "../components/Reveal"
import { useReducedMotion } from "../hooks/useReducedMotion"
import { PROJECTS } from "../data/projects"
import { AnsysIcon, CppIcon, MatlabIcon, PythonIcon, SimulinkIcon, SolidWorksIcon } from "../components/ToolIcons"

const HERO_TRAITS = [
    { article: "a", label: "Bold Leader", color: "#f2c675" },
    { article: "a", label: "Curious Explorer", color: "#9dc7ff" },
    { article: "a", label: "Driven Thinker", color: "#c3b2ff" },
    { article: "a", label: "Precise Builder", color: "#8fe3c9" },
    { article: "an", label: "Aerospace Engineer", color: "#eaf3ff" },
] as const

const SOFTWARE_TOOLS = [
    { name: "MATLAB", Icon: MatlabIcon },
    { name: "SolidWorks", Icon: SolidWorksIcon },
    { name: "Simulink", Icon: SimulinkIcon },
    { name: "ANSYS", Icon: AnsysIcon },
    { name: "C++", Icon: CppIcon },
    { name: "Python", Icon: PythonIcon },
] as const

const INTRO_WORDS = [
    { text: "Hi,", style: "plain", pauseAfter: 520 },
    { text: "I’m", style: "plain", pauseAfter: 180 },
    { text: "Tia", style: "name", pauseAfter: 160 },
    { text: "Bajaj", style: "name", pauseAfter: 700 },
] as const

function IntroSplash({ reducedMotion, onReveal }: { reducedMotion: boolean; onReveal: () => void }) {
    const [wordCount, setWordCount] = useState(0)
    const [phase, setPhase] = useState<"read" | "split" | "done">(reducedMotion ? "done" : "read")
    const onRevealRef = useRef(onReveal)
    onRevealRef.current = onReveal

    useEffect(() => {
        if (reducedMotion) {
            onRevealRef.current()
            return
        }

        const timers: number[] = []
        let delay = 160

        INTRO_WORDS.forEach((word, index) => {
            timers.push(
                window.setTimeout(() => {
                    setWordCount(index + 1)
                }, delay)
            )
            delay += 280 + word.pauseAfter
        })

        timers.push(
            window.setTimeout(() => {
                setPhase("split")
                onRevealRef.current()
            }, delay)
        )

        timers.push(
            window.setTimeout(() => {
                setPhase("done")
            }, delay + 900)
        )

        return () => {
            timers.forEach((id) => window.clearTimeout(id))
        }
    }, [reducedMotion])

    useEffect(() => {
        if (phase === "done") return
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = prev
        }
    }, [phase])

    if (phase === "done") return null

    const line = (
        <p className="intro-line">
            {INTRO_WORDS.map((word, index) => (
                <span
                    key={word.text}
                    className={`intro-word intro-word-${word.style} ${index < wordCount ? "intro-word-visible" : ""}`}
                >
                    {word.text}
                </span>
            ))}
        </p>
    )

    return (
        <div className={`intro-splash intro-splash-${phase}`} aria-hidden="true">
            <div className="intro-shutter intro-shutter-top" />
            <div className="intro-shutter intro-shutter-bottom" />
            <div className="intro-text-split" aria-hidden="true">
                <div className="intro-text-pane intro-text-pane-top">{line}</div>
                <div className="intro-text-pane intro-text-pane-bottom">{line}</div>
            </div>
        </div>
    )
}

function coverflowOffset(index: number, active: number, length: number) {
    let offset = index - active
    const half = length / 2
    if (offset > half) offset -= length
    if (offset < -half) offset += length
    return offset
}

function CoverflowCarousel({
    activeIndex,
    onSelect,
    onOpen,
    reducedMotion,
}: {
    activeIndex: number
    onSelect: (index: number) => void
    onOpen: (slug: string) => void
    reducedMotion: boolean
}) {
    const dragRef = useRef({ startX: 0, dragging: false, moved: false })
    const activeIndexRef = useRef(activeIndex)
    activeIndexRef.current = activeIndex
    const onSelectRef = useRef(onSelect)
    onSelectRef.current = onSelect

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.button !== undefined && event.button !== 0) return
        dragRef.current = { startX: event.clientX, dragging: true, moved: false }
    }

    useEffect(() => {
        const handleMove = (event: PointerEvent) => {
            if (!dragRef.current.dragging) return
            const dx = event.clientX - dragRef.current.startX
            if (Math.abs(dx) > 6) dragRef.current.moved = true
        }
        const handleUp = (event: PointerEvent) => {
            if (!dragRef.current.dragging) return
            const dx = event.clientX - dragRef.current.startX
            dragRef.current.dragging = false
            const threshold = 45
            if (dx > threshold) {
                onSelectRef.current((activeIndexRef.current - 1 + PROJECTS.length) % PROJECTS.length)
            } else if (dx < -threshold) {
                onSelectRef.current((activeIndexRef.current + 1) % PROJECTS.length)
            }
        }
        window.addEventListener("pointermove", handleMove)
        window.addEventListener("pointerup", handleUp)
        return () => {
            window.removeEventListener("pointermove", handleMove)
            window.removeEventListener("pointerup", handleUp)
        }
    }, [])

    return (
        <div className="coverflow" aria-label="Project carousel">
            <div className="coverflow-stage" onPointerDown={handlePointerDown}>
                {PROJECTS.map((project, index) => {
                    const offset = coverflowOffset(index, activeIndex, PROJECTS.length)
                    const abs = Math.abs(offset)
                    const side = Math.sign(offset)
                    const rotateY = side * Math.min(8 + (abs - 1) * 6, 22)
                    const x = offset * 15
                    const z = -abs * 52
                    const scale = Math.max(1 - abs * 0.1, 0.72)
                    const brightness = abs === 0 ? 1 : Math.max(1 - abs * 0.16, 0.55)
                    const transform = reducedMotion
                        ? `translate(-50%, -50%) translateX(${x}vw) scale(${abs === 0 ? 1 : 0.92})`
                        : `translate(-50%, -50%) translateX(${x}vw) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`
                    const isActive = abs === 0

                    return (
                        <article
                            key={project.slug}
                            className={`coverflow-card ${isActive ? "is-active" : ""}`}
                            style={{
                                transform,
                                filter: `brightness(${brightness})`,
                                zIndex: 50 - abs,
                                opacity: abs > 2 ? 0 : 1,
                                pointerEvents: abs > 2 ? "none" : "auto",
                            }}
                            onClick={() => {
                                if (dragRef.current.moved) return
                                isActive ? onOpen(project.slug) : onSelect(index)
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault()
                                    isActive ? onOpen(project.slug) : onSelect(index)
                                }
                            }}
                            aria-label={`${project.title}. ${project.role}. ${isActive ? "Open project" : "Show project"}`}
                        >
                            <img src={project.image} alt="" draggable={false} />
                            <div className="coverflow-overlay">
                                <h3>{project.title}</h3>
                                {isActive && <span className="coverflow-open-hint">View project →</span>}
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

function HeroBackgroundVideo({ play }: { play: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        video.muted = true
        video.defaultMuted = true
        video.loop = true
        video.playsInline = true

        const ensurePlay = () => {
            if (!play) {
                video.pause()
                return
            }
            const attempt = video.play()
            if (attempt) void attempt.catch(() => {})
        }

        const onVisibility = () => {
            if (document.visibilityState === "visible") ensurePlay()
        }

        video.addEventListener("loadeddata", ensurePlay)
        document.addEventListener("visibilitychange", onVisibility)
        ensurePlay()

        return () => {
            video.removeEventListener("loadeddata", ensurePlay)
            document.removeEventListener("visibilitychange", onVisibility)
        }
    }, [play])

    return (
        <video
            ref={videoRef}
            className="hero-video"
            src="/hero.mp4?v=2"
            autoPlay={play}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
        />
    )
}

export default function Home() {
    const navigate = useNavigate()
    const reducedMotion = useReducedMotion()
    const [introDone, setIntroDone] = useState(reducedMotion)
    const [traitIndex, setTraitIndex] = useState(0)
    const [cardIndex, setCardIndex] = useState(0)

    useEffect(() => {
        if (reducedMotion || !introDone) return
        const id = window.setInterval(() => {
            setTraitIndex((v) => (v + 1) % HERO_TRAITS.length)
        }, 3400)
        return () => window.clearInterval(id)
    }, [introDone, reducedMotion])

    useEffect(() => {
        if (reducedMotion || !introDone) return
        const id = window.setInterval(() => {
            setCardIndex((v) => (v + 1) % PROJECTS.length)
        }, 3800)
        return () => window.clearInterval(id)
    }, [introDone, reducedMotion])


    return (
        <>
            <IntroSplash reducedMotion={reducedMotion} onReveal={() => setIntroDone(true)} />
            <main className="page">
                <section className="hero" aria-label="Intro">
                    <div className="hero-video-wrap" aria-hidden="true">
                        <HeroBackgroundVideo play={!reducedMotion && introDone} />
                        <div className="hero-video-shade" />
                    </div>
                    <div className="starfield" aria-hidden="true" />

                    <div className="hero-inner">
                        <p className="hero-eyebrow">
                            <span className="hero-eyebrow-dot" aria-hidden="true" />
                            Bold. Curious. Driven.
                        </p>
                        <h1 className={`role-line ${reducedMotion ? "reduced" : ""}`}>
                            <span className="role-line-lead">I am {HERO_TRAITS[traitIndex].article} </span>
                            <span
                                className="role-line-trait"
                                key={HERO_TRAITS[traitIndex].label}
                                style={{
                                    color: HERO_TRAITS[traitIndex].color,
                                    textShadow: `0 0 18px ${HERO_TRAITS[traitIndex].color}66, 0 0 40px ${HERO_TRAITS[traitIndex].color}33`,
                                }}
                            >
                                {HERO_TRAITS[traitIndex].label}
                            </span>
                            <span className="role-line-period">.</span>
                        </h1>
                        <p className="hero-tagline">
                            I design intelligent systems, build resilient hardware, and lead teams that turn ambitious
                            ideas into flight-ready missions.
                        </p>
                        <button
                            type="button"
                            className="hero-cta"
                            onClick={() =>
                                document
                                    .getElementById("projects")
                                    ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
                            }
                        >
                            View my work
                            <span className="hero-cta-arrow" aria-hidden="true">
                                →
                            </span>
                        </button>
                    </div>

                    <div className="tools-marquee" aria-label="Software">
                        <div className="tools-marquee-track">
                            <div className="tools-marquee-group">
                                {SOFTWARE_TOOLS.map((tool) => (
                                    <span className="tools-marquee-item" key={`a-${tool.name}`}>
                                        <span className="tool-icon" aria-hidden="true">
                                            <tool.Icon className="tool-icon-svg" />
                                        </span>
                                        <span className="tool-name">{tool.name}</span>
                                    </span>
                                ))}
                            </div>
                            <div className="tools-marquee-group" aria-hidden="true">
                                {SOFTWARE_TOOLS.map((tool) => (
                                    <span className="tools-marquee-item" key={`b-${tool.name}`}>
                                        <span className="tool-icon" aria-hidden="true">
                                            <tool.Icon className="tool-icon-svg" />
                                        </span>
                                        <span className="tool-name">{tool.name}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <OrbitReveal reducedMotion={reducedMotion} />

                <section className="mission-work" id="projects" aria-label="Projects">
                    <Reveal>
                        <h2 className="mission-heading">Projects</h2>
                        <div className="mission-rule" aria-hidden="true" />
                        <p className="mission-tagline">Rigorous engineering for missions built to endure.</p>
                    </Reveal>
                    <Reveal delay={150}>
                        <CoverflowCarousel
                            activeIndex={cardIndex}
                            onSelect={setCardIndex}
                            onOpen={(slug) => navigate(`/projects/${slug}`)}
                            reducedMotion={reducedMotion}
                        />
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
