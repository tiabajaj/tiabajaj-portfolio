export type TimelineEntry = {
  id: string;
  kind: "education" | "experience" | "achievement";
  title: string;
  org: string;
  period: string;
  location?: string;
  description: string[];
};

// Sample/placeholder content — edit with your real history.
export const timeline: TimelineEntry[] = [
  {
    id: "edu-university",
    kind: "education",
    title: "B.S. Aerospace Engineering",
    org: "Your University",
    period: "2023 — 2027",
    location: "City, State",
    description: [
      "Concentration in astronautics and controls.",
      "Relevant coursework: Orbital Mechanics, Flight Dynamics & Control, Aerodynamics, Propulsion, Structures.",
    ],
  },
  {
    id: "exp-internship",
    kind: "experience",
    title: "Propulsion Test Engineering Intern",
    org: "Company Name",
    period: "Summer 2025",
    location: "City, State",
    description: [
      "Supported static fire test campaigns for a small liquid engine, assisting with instrumentation setup and data review.",
      "Wrote scripts to automate post-test data cleanup and plotting, cutting analyst turnaround time.",
    ],
  },
  {
    id: "exp-club",
    kind: "experience",
    title: "Lead, Controls Subteam — Rocketry Club",
    org: "University Rocketry Club",
    period: "2024 — Present",
    description: [
      "Lead a team of 6 students designing avionics and control systems for a student competition rocket.",
      "Mentor underclassmen on flight software fundamentals and testing practices.",
    ],
  },
  {
    id: "achv-scholarship",
    kind: "achievement",
    title: "Aerospace Merit Scholarship",
    org: "Your University",
    period: "2024",
    description: ["Awarded for academic performance and demonstrated leadership in student aerospace projects."],
  },
  {
    id: "achv-competition",
    kind: "achievement",
    title: "2nd Place, Student Rocketry Design Competition",
    org: "Regional Competition",
    period: "2024",
    description: ["Recognized for the team's controls and recovery system design."],
  },
];
