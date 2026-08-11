export type TimelineStep = {
    title: string
    period: string
    description: string
}

export type Award = {
    count: string
    title: string
}

export type Project = {
    slug: string
    title: string
    org: string
    role: string
    period: string
    focus: string
    summary: string
    timeline?: TimelineStep[]
    skills: string[]
    awards?: Award[]
    image: string
}

// Sourced from Tia's resume — edit freely as projects evolve.
export const PROJECTS: Project[] = [
    {
        slug: "project-polaris",
        title: "Project Polaris",
        org: "NASA L’SPACE Mission Concept Academy",
        role: "Project Manager & Systems Engineer",
        period: "January 2026 – Present",
        focus: "Mission architecture · Systems integration",
        summary:
            "Selected for NASA’s highly competitive L’SPACE Mission Concept Academy to lead a multidisciplinary team architecting a full-scale robotic space mission concept.",
        timeline: [
            {
                title: "Selection",
                period: "January 2026",
                description:
                    "Selected for NASA’s highly competitive L’SPACE Mission Concept Academy as Project Manager and Systems Engineer to lead a multidisciplinary team.",
            },
            {
                title: "Mission Design",
                period: "Pre-Phase A",
                description:
                    "Directed mission design, systems integration, and trade studies in accordance with NASA Pre-Phase A lifecycle standards.",
            },
            {
                title: "Proposal & Design Review",
                period: "Ongoing",
                description:
                    "Managed requirements flow-down, technical documentation, and cross-functional collaboration through formal proposal and design review.",
            },
            {
                title: "NASA Evaluation",
                period: "Present",
                description: "Delivered and defended a comprehensive, NASA-evaluated mission design.",
            },
        ],
        skills: ["Systems Engineering", "Mission Design", "Trade Studies", "Technical Documentation"],
        image: "https://images.unsplash.com/photo-1677926405168-fa86268b7295?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
    },
    {
        slug: "tara",
        title: "TARA",
        org: "Cal Poly BEACoN Undergraduate Research Program",
        role: "Founder · Student Researcher & Developer",
        period: "June 2025 – Present",
        focus: "Trajectory analysis · Aerospace software",
        summary:
            "Founded and built an accessible, web-based aerospace mission design and trajectory analysis platform to democratize advanced astrodynamics tools.",
        timeline: [
            {
                title: "Research Foundation",
                period: "June 2025",
                description:
                    "Developed an inclusive framework for aerospace mission design tools by embedding usability heuristics and Universal Design for Learning (UDL) principles using NASA’s EMTG.",
            },
            {
                title: "Founding TARA",
                period: "Summer 2025",
                description:
                    "Founded TARA — Trajectory Analysis & Research Assistant — an accessible, web-based mission design platform designed in Figma.",
            },
            {
                title: "Development",
                period: "Ongoing",
                description:
                    "Directed cross-functional development from architecture through deployment, translating orbital mechanics algorithms in Python into intuitive UX while integrating AI tools (Claude, ChatGPT, Cursor) to accelerate the workflow.",
            },
            {
                title: "Publication",
                period: "AFHE 2025",
                description:
                    "Co-authored a whitepaper and presented at the AFHE 2025 Hawaii Conference: “From Capability to Accessibility: A Usability Heuristics Approach to Space Mission Planning Tools.”",
            },
        ],
        skills: ["Python", "Figma", "UX Research", "Astrodynamics", "NASA EMTG"],
        image: "https://images.unsplash.com/photo-1633465974823-5a43265d2126?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
    },
    {
        slug: "polysat-drag-sail",
        title: "PolySat Drag Sail",
        org: "Cal Poly CubeSat Laboratory (PolySat)",
        role: "Structures & Mechanisms Team Member · Dragsail Boom Design Lead",
        period: "September 2024 – Present",
        focus: "CubeSat mechanisms · Deorbit systems",
        summary:
            "Designing and machining structural components for Cal Poly’s CubeSat missions, from vibration testing to deployable boom systems.",
        timeline: [
            {
                title: "Vibration Plate for AMDHROP",
                period: "Fall 2024",
                description:
                    "Modeled the vibration plate to ensure structural integrity during launch and deployment, contributing to successful testing of CubeSat components under dynamic conditions.",
            },
            {
                title: "SALL-E Counterweights",
                period: "Winter 2025",
                description:
                    "Machined counterweights for CubeSat SALL-E and received mill and lathe certification through Cal Poly’s machine shops.",
            },
            {
                title: "Dragsail Boom Design Lead",
                period: "Present",
                description:
                    "Leading the drag sail trade study and boom design, balancing structural strength, material selection, and weight constraints to meet mission requirements.",
            },
        ],
        skills: ["SolidWorks", "Structural Analysis", "Manufacturing", "Mill & Lathe"],
        image: "https://images.unsplash.com/photo-1622036409086-5240d050d926?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
    },
    {
        slug: "frc-robotics-systems",
        title: "FRC Robotics Systems",
        org: "FIRST Robotics Competition Team 1807",
        role: "Design Captain · Drive Coach · Design Mentor",
        period: "September 2021 – Present",
        focus: "CAD · Manufacturing · Rapid prototyping",
        summary:
            "Captaining robot design and mechanisms for a 40+ member team, with two World Championship appearances.",
        timeline: [
            {
                title: "Design Captain",
                period: "Elected by 40+ members",
                description:
                    "Oversee and captain robot design and mechanisms, leading design members to innovate solutions to design challenges.",
            },
            {
                title: "World Championships",
                period: "2x Appearances",
                description: "Led 40+ team members to World Championships twice and hosted an FRC competition with 50+ local teams.",
            },
            {
                title: "Drive Coach",
                period: "In-season",
                description:
                    "Command competition drive teams as the sole communicator with 70+ global alliance partners, analyzing match data and making strategic, quick-witted decisions.",
            },
            {
                title: "Mentorship",
                period: "Year-round",
                description:
                    "Spearheaded workshops and in-person/online training to educate design members on CAD and design principles, streamlining project management from design to manufacturing.",
            },
        ],
        skills: ["CAD", "Team Leadership", "Manufacturing", "Strategy & Data Analysis"],
        awards: [
            { count: "3x", title: "District Event Winner" },
            { count: "3x", title: "Creativity Award" },
            { count: "4x", title: "Excellence in Engineering Award" },
            { count: "2x", title: "District Engineering Inspiration Award" },
            { count: "1x", title: "Entrepreneurship Award" },
            { count: "1x", title: "Quality Award" },
        ],
        image: "https://framerusercontent.com/images/xQAKKE4Lp79vYYacuWjQUbkzyuA.png?width=1370&height=1294&kb=1215",
    },
    {
        slug: "global-frc-initiative",
        title: "Global FRC Initiative",
        org: "Heritage Schools, Delhi, India",
        role: "Program Lead",
        period: "September 2025 – Present",
        focus: "International program building · STEM curriculum",
        summary:
            "Collaborating internationally to establish and launch a FIRST Robotics Competition team and sustainable robotics curriculum across a school district in India.",
        timeline: [
            {
                title: "Partnership",
                period: "September 2025",
                description:
                    "Collaborating internationally with Heritage Schools (India) to establish and launch a FIRST Robotics Competition team across the district.",
            },
            {
                title: "Infrastructure",
                period: "Ongoing",
                description:
                    "Partnering with Heritage’s Head of Makerspace, Board of Education, and Headmaster to develop team infrastructure.",
            },
            {
                title: "Curriculum",
                period: "Ongoing",
                description:
                    "Implementing a sustainable robotics curriculum aligned with VEX platforms and integrating hands-on STEM into the academic framework.",
            },
            {
                title: "Long-Term Growth",
                period: "Present",
                description:
                    "Coordinating with FIRST Robotics to support long-term program growth and explore district-level competition opportunities in India.",
            },
        ],
        skills: ["Program Management", "Curriculum Design", "Cross-Cultural Collaboration"],
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
    },
]

export function getProjectBySlug(slug: string | undefined) {
    return PROJECTS.find((p) => p.slug === slug)
}
