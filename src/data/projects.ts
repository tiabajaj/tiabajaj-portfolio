export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  role: string;
  year: string;
  tags: string[];
  highlights: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
};

// Sample/placeholder content — edit freely with your real projects.
// Each object becomes a card on /projects and a full page at /projects/[slug].
export const projects: Project[] = [
  {
    slug: "cubesat-attitude-control",
    title: "CubeSat Attitude Determination & Control",
    summary:
      "A 3-axis reaction wheel control system for a 2U CubeSat, tuned in simulation and validated on a low-friction air-bearing testbed.",
    description: [
      "Designed and simulated a reaction-wheel-based attitude control system for a 2U CubeSat platform, targeting sub-degree pointing accuracy for an Earth-imaging payload.",
      "Built a MATLAB/Simulink model of rigid-body spacecraft dynamics, sensor noise, and actuator saturation, then designed a PID and LQR controller and compared settling time, overshoot, and power draw.",
      "Validated the control law on a 3-axis air-bearing testbed with an IMU and reaction wheels, closing the loop from simulation to hardware.",
    ],
    role: "Lead Controls Engineer, student team",
    year: "2025",
    tags: ["Controls", "Simulink", "Attitude Dynamics", "Embedded"],
    highlights: [
      "Achieved 0.4° steady-state pointing error in hardware testing",
      "Reduced settling time 38% versus baseline PID via LQR redesign",
      "Presented results at a regional student aerospace symposium",
    ],
    links: [{ label: "Project write-up", href: "#" }],
    featured: true,
  },
  {
    slug: "hybrid-rocket-test-stand",
    title: "Hybrid Rocket Motor Static Test Stand",
    summary:
      "A load-cell instrumented static test stand for characterizing thrust curves of small hybrid rocket motors.",
    description: [
      "Led mechanical design of a static test stand for hybrid rocket motors, including load cell mounting, thermal isolation, and a remote ignition and propellant feed system.",
      "Instrumented the stand with a load cell, pressure transducers, and thermocouples logged through a DAQ, and wrote the data pipeline used to process thrust curves post-fire.",
      "Ran a test campaign across multiple oxidizer flow rates to characterize specific impulse and combustion efficiency trends.",
    ],
    role: "Propulsion Team Member",
    year: "2024",
    tags: ["Propulsion", "Testing", "DAQ", "CAD"],
    highlights: [
      "Completed 12 static fires with zero safety incidents",
      "Built automated thrust-curve post-processing pipeline in Python",
      "Design reused by the following year's propulsion subteam",
    ],
    links: [{ label: "Test data summary", href: "#" }],
    featured: true,
  },
  {
    slug: "cfd-wing-optimization",
    title: "CFD-Driven Winglet Shape Optimization",
    summary:
      "Parametric CFD study comparing winglet geometries for induced drag reduction on a small UAV wing.",
    description: [
      "Set up a parametric CFD workflow in OpenFOAM to evaluate induced drag reduction from several winglet geometries on a small fixed-wing UAV.",
      "Automated mesh generation and case setup across a geometry sweep, then post-processed lift and drag coefficients to identify the best-performing design.",
      "Cross-checked CFD trends against a lifting-line theory model to sanity-check results.",
    ],
    role: "Independent research project",
    year: "2024",
    tags: ["CFD", "Aerodynamics", "OpenFOAM", "Python"],
    highlights: [
      "Identified a winglet geometry with ~6% induced drag reduction",
      "Automated the mesh/case sweep, cutting iteration time from hours to minutes",
    ],
    featured: true,
  },
  {
    slug: "orbital-mechanics-visualizer",
    title: "Interactive Orbital Mechanics Visualizer",
    summary:
      "A browser-based tool for visualizing orbital elements, transfer maneuvers, and ground tracks in real time.",
    description: [
      "Built a web app that renders orbits from classical orbital elements and animates Hohmann and bi-elliptic transfers in real time.",
      "Implemented the two-body propagator and coordinate transforms from scratch to reinforce the orbital mechanics coursework it's built on.",
    ],
    role: "Personal project",
    year: "2023",
    tags: ["Orbital Mechanics", "Web Dev", "TypeScript"],
    highlights: [
      "Used as a study aid by classmates in the following semester's orbital mechanics course",
    ],
    links: [{ label: "Live demo", href: "#" }],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
