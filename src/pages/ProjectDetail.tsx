import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { AwardsShowcase } from "../components/AwardsShowcase"
import { OrbitGlobe } from "../components/OrbitGlobe"
import { Reveal } from "../components/Reveal"
import { Timeline } from "../components/Timeline"
import { useReducedMotion } from "../hooks/useReducedMotion"
import { getProjectBySlug, PROJECTS } from "../data/projects"

export default function ProjectDetail() {
    const { slug } = useParams()
    const project = getProjectBySlug(slug)
    const reducedMotion = useReducedMotion()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [slug])

    if (!project) {
        return <Navigate to="/" replace />
    }

    const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3)

    return (
        <main className="page project-page">
            <section className="project-header" aria-label={project.title}>
                <Reveal>
                    <Link to="/" className="project-back">
                        ← Back to mission work
                    </Link>
                    <p className="project-org">{project.org}</p>
                    <h1 className="project-title">{project.title}</h1>
                    <p className="project-meta">
                        {project.role} · {project.period}
                    </p>
                </Reveal>
            </section>

            <section className="project-body">
                <Reveal className="project-summary">
                    <p>{project.summary}</p>
                </Reveal>

                <Reveal delay={100} className="project-skills">
                    <div className="project-skills-list">
                        {project.skills.map((skill) => (
                            <span key={skill} className="project-skill-pill">
                                {skill}
                            </span>
                        ))}
                    </div>
                </Reveal>
            </section>

            {project.slug === "tara" && (
                <section className="content project-globe" aria-label="Orbit visualization">
                    <div className="content-starfield" aria-hidden="true" />
                    <Reveal className="content-reveal">
                        <OrbitGlobe reducedMotion={reducedMotion} />
                        <p className="philosophy">
                            I engineer elegant, resilient systems for the boundary between atmosphere and orbit.
                        </p>
                        <div className="section-rule" aria-hidden="true" />
                    </Reveal>
                </section>
            )}

            {project.awards && project.awards.length > 0 && (
                <section className="project-awards-section">
                    <Reveal>
                        <h2 className="project-section-heading">Recognition</h2>
                    </Reveal>
                    <AwardsShowcase awards={project.awards} />
                </section>
            )}

            {project.timeline && project.timeline.length > 0 && (
                <section className="project-timeline-section">
                    <Reveal>
                        <h2 className="project-section-heading">How it came together</h2>
                    </Reveal>
                    <Timeline steps={project.timeline} />
                </section>
            )}

            {otherProjects.length > 0 && (
                <section className="project-more" aria-label="More mission work">
                    <Reveal>
                        <h2>More mission work</h2>
                        <div className="project-more-grid">
                            {otherProjects.map((p) => (
                                <Link to={`/projects/${p.slug}`} key={p.slug} className="project-more-card">
                                    <img src={p.image} alt={p.title} />
                                    <div className="project-more-overlay">
                                        <p className="card-category">{p.org}</p>
                                        <h3>{p.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Reveal>
                </section>
            )}

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
    )
}
