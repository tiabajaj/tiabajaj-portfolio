import { useEffect, useRef, useState, type ReactNode } from "react"
import * as THREE from "three"

type Project = {
    title: string
    org: string
    role: string
    focus: string
    image: string
}

const HERO_TRAITS = [
    { article: "a", label: "Bold Leader" },
    { article: "a", label: "Curious Explorer" },
    { article: "a", label: "Driven Thinker" },
    { article: "a", label: "Precise Builder" },
    { article: "an", label: "Aerospace Engineer" },
] as const

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
    {
        title: "Orbital Systems Lab",
        org: "Aerospace Research",
        role: "Systems & GNC Contributor",
        focus: "Guidance · Control · Mission analysis",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
    },
]

function makeSsoLabelTexture() {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 128
    const ctx = canvas.getContext("2d")
    if (!ctx) return new THREE.CanvasTexture(canvas)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "700 54px Inter, system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#ffffff"
    ctx.shadowColor = "rgba(0,0,0,0.65)"
    ctx.shadowBlur = 10
    ctx.fillText("SSO", canvas.width / 2, canvas.height / 2)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
}

function OrbitGlobe({ reducedMotion }: { reducedMotion: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setClearColor(0x000000, 0)
        renderer.outputColorSpace = THREE.SRGBColorSpace

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
        // Pulled back so the full inclined orbit stays in frame
        camera.position.set(0, 0.05, 5.4)

        const root = new THREE.Group()
        root.scale.setScalar(0.92)
        scene.add(root)

        const ambient = new THREE.AmbientLight(0x9eb6ff, 0.55)
        const key = new THREE.DirectionalLight(0xffffff, 1.35)
        key.position.set(4.5, 2.2, 3.5)
        const fill = new THREE.DirectionalLight(0x7eb7ff, 0.35)
        fill.position.set(-3, -1, -2)
        scene.add(ambient, key, fill)

        const earthGroup = new THREE.Group()
        root.add(earthGroup)

        const textureLoader = new THREE.TextureLoader()
        const earthTexture = textureLoader.load(
            "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg"
        )
        earthTexture.colorSpace = THREE.SRGBColorSpace
        earthTexture.anisotropy = 8

        const earth = new THREE.Mesh(
            new THREE.SphereGeometry(1, 64, 64),
            new THREE.MeshStandardMaterial({
                map: earthTexture,
                roughness: 0.92,
                metalness: 0.05,
            })
        )
        earthGroup.add(earth)

        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(1.045, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xb7d4ff,
                transparent: true,
                opacity: 0.14,
                side: THREE.BackSide,
            })
        )
        earthGroup.add(atmosphere)

        const rim = new THREE.Mesh(
            new THREE.SphereGeometry(1.02, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xddeaff,
                transparent: true,
                opacity: 0.08,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
        )
        earthGroup.add(rim)

        const orbitRadius = 1.34
        const orbitGroup = new THREE.Group()
        orbitGroup.rotation.x = THREE.MathUtils.degToRad(58)
        orbitGroup.rotation.z = THREE.MathUtils.degToRad(-24)
        root.add(orbitGroup)

        const orbitPoints: THREE.Vector3[] = []
        for (let i = 0; i <= 180; i++) {
            const a = (i / 180) * Math.PI * 2
            orbitPoints.push(new THREE.Vector3(Math.cos(a) * orbitRadius, 0, Math.sin(a) * orbitRadius))
        }
        const orbitGeom = new THREE.BufferGeometry().setFromPoints(orbitPoints)
        const orbitLine = new THREE.Line(
            orbitGeom,
            new THREE.LineBasicMaterial({
                color: 0xff2d2d,
                transparent: true,
                opacity: 0.95,
            })
        )
        orbitGroup.add(orbitLine)

        const satGroup = new THREE.Group()
        orbitGroup.add(satGroup)

        const satellite = new THREE.Mesh(
            new THREE.SphereGeometry(0.035, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0xc8cdd6, roughness: 0.35, metalness: 0.55 })
        )
        satGroup.add(satellite)

        const label = new THREE.Sprite(
            new THREE.SpriteMaterial({
                map: makeSsoLabelTexture(),
                transparent: true,
                depthTest: false,
            })
        )
        label.scale.set(0.42, 0.21, 1)
        label.position.set(0, 0.12, 0)
        satGroup.add(label)

        const setSize = () => {
            const size = canvas.clientWidth || 300
            renderer.setSize(size, size, false)
            camera.aspect = 1
            camera.updateProjectionMatrix()
        }
        setSize()
        window.addEventListener("resize", setSize)

        let yaw = 0.8
        let satAngle = 0.85
        let frame = 0
        const tick = () => {
            if (!reducedMotion) {
                yaw += 0.0028
                satAngle += 0.01
                earth.rotation.y += 0.0012
            }

            root.rotation.y = yaw
            satGroup.position.set(Math.cos(satAngle) * orbitRadius, 0, Math.sin(satAngle) * orbitRadius)
            renderer.render(scene, camera)
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("resize", setSize)
            earthTexture.dispose()
            earth.geometry.dispose()
            ;(earth.material as THREE.Material).dispose()
            atmosphere.geometry.dispose()
            ;(atmosphere.material as THREE.Material).dispose()
            rim.geometry.dispose()
            ;(rim.material as THREE.Material).dispose()
            orbitGeom.dispose()
            ;(orbitLine.material as THREE.Material).dispose()
            satellite.geometry.dispose()
            ;(satellite.material as THREE.Material).dispose()
            label.material.map?.dispose()
            label.material.dispose()
            renderer.dispose()
        }
    }, [reducedMotion])

    return (
        <div className="orbit-globe" aria-label="Earth globe with SSO orbit">
            <canvas ref={canvasRef} className="orbit-globe-canvas" />
        </div>
    )
}

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

const INTRO_WORDS = [
    { text: "Hi,", style: "plain", pauseAfter: 520 },
    { text: "I’m", style: "plain", pauseAfter: 180 },
    { text: "Tia", style: "name", pauseAfter: 160 },
    { text: "Bajaj", style: "name", pauseAfter: 700 },
] as const

function IntroSplash({
    reducedMotion,
    onReveal,
}: {
    reducedMotion: boolean
    onReveal: () => void
}) {
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
    projects,
    activeIndex,
    onSelect,
    reducedMotion,
}: {
    projects: Project[]
    activeIndex: number
    onSelect: (index: number) => void
    reducedMotion: boolean
}) {
    return (
        <div className="coverflow" aria-label="Project carousel">
            <div className="coverflow-stage">
                {projects.map((project, index) => {
                    const offset = coverflowOffset(index, activeIndex, projects.length)
                    const abs = Math.abs(offset)
                    // One shared tilt per side — outward, lighter angle.
                    // left → faces away left, right → faces away right, center flat.
                    const side = Math.sign(offset) // -1 left, 0 center, 1 right
                    const rotateY = side * 22
                    const x = offset * 18
                    const z = -abs * 55
                    const scale = abs === 0 ? 1 : 0.93
                    const transform = reducedMotion
                        ? `translate(-50%, -50%) translateX(${x}vw) scale(${abs === 0 ? 1 : 0.9})`
                        : `translate(-50%, -50%) translateX(${x}vw) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`

                    return (
                        <article
                            key={project.title}
                            className={`coverflow-card ${abs === 0 ? "is-active" : ""}`}
                            style={{
                                transform,
                                zIndex: 50 - abs,
                                opacity: abs > 2 ? 0 : 1,
                                pointerEvents: abs > 2 ? "none" : "auto",
                            }}
                            onClick={() => onSelect(index)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault()
                                    onSelect(index)
                                }
                            }}
                            aria-label={`${project.title}. ${project.role}. ${abs === 0 ? "Active" : "Show project"}`}
                        >
                            <img src={project.image} alt="" />
                            <div className="coverflow-overlay">
                                <h3>{project.title}</h3>
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

        // Keep this minimal — WhatsApp files often have bad duration metadata,
        // so any "restart near the end" logic can cut the clip short and look like glitching.
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

export default function App() {
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
            setCardIndex((v) => (v + 1) % MISSION_PROJECTS.length)
        }, 3800)
        return () => window.clearInterval(id)
    }, [introDone, reducedMotion])

    return (
        <>
            <IntroSplash reducedMotion={reducedMotion} onReveal={() => setIntroDone(true)} />
            <Navbar />
            <main className="page">
                <section className="hero" aria-label="Intro">
                    <div className="hero-video-wrap" aria-hidden="true">
                        <HeroBackgroundVideo play={!reducedMotion && introDone} />
                        <div className="hero-video-shade" />
                    </div>
                    <div className="starfield" aria-hidden="true" />

                    <div className="hero-inner">
                        <h1 className={`role-line ${reducedMotion ? "reduced" : ""}`}>
                            <span className="role-line-lead">I am {HERO_TRAITS[traitIndex].article} </span>
                            <span className="role-line-trait" key={HERO_TRAITS[traitIndex].label}>
                                {HERO_TRAITS[traitIndex].label}
                            </span>
                        </h1>
                    </div>

                    <div className="tools-marquee" aria-label="Software">
                        <div className="tools-marquee-track">
                            <div className="tools-marquee-group">
                                {SOFTWARE_TOOLS.map((tool) => (
                                    <span className="tools-marquee-item" key={`a-${tool}`}>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                            <div className="tools-marquee-group" aria-hidden="true">
                                {SOFTWARE_TOOLS.map((tool) => (
                                    <span className="tools-marquee-item" key={`b-${tool}`}>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="content-starfield" aria-hidden="true" />
                    <Reveal className="content-reveal">
                        <OrbitGlobe reducedMotion={reducedMotion} />
                        <p className="philosophy">
                            I engineer elegant, resilient systems for the boundary between atmosphere and orbit.
                        </p>
                        <div className="section-rule" aria-hidden="true" />
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
                        <h2 className="mission-heading">
                            Selected aerospace
                            <br />
                            missions, systems,
                            <br />
                            and prototypes
                        </h2>
                    </Reveal>
                    <Reveal delay={150}>
                        <CoverflowCarousel
                            projects={MISSION_PROJECTS}
                            activeIndex={cardIndex}
                            onSelect={setCardIndex}
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
