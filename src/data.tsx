import { Experience, Project, PromptChip, Skill } from "./types";

export const skillsData: Skill[] = [
  {
    id: "s1",
    name: "Frontend UI/UX",
    category: "AI / Development",
    description: "Building responsive architectures with modern and standard web technologies.",
    tools: ["HTML", "CSS", "Bootstrap", "React", "Tailwind CSS"],
    level: 90,
  },
  {
    id: "s2",
    name: "Backend & CMS",
    category: "AI / Development",
    description: "Designing database structures and managing content platforms.",
    tools: ["PHP", "MySQL", "WordPress", "Firebase"],
    level: 80,
  },
  {
    id: "s3",
    name: "AI & Vibe Coding",
    category: "AI / Development",
    description: "Integrating Generative AI tools and orchestrating LLMs.",
    tools: ["Generative AI Tools", "AI Video Generation", "AI Image Generation", "Google Gemini", "Vibe Coding"],
    level: 90,
  },
  {
    id: "s4",
    name: "Cybersecurity",
    category: "Automation / Systems",
    description: "Security assessment and vulnerability testing.",
    tools: ["Ethical Hacking", "Web VAPT", "OWASP"],
    level: 75,
  },
  {
    id: "s5",
    name: "Video Editing",
    category: "Multimedia / Design",
    description: "High-end cinematic video editing, motion graphics, and post-production.",
    tools: ["Adobe Premiere Pro", "Adobe After Effects", "Video Editing"],
    level: 95,
  },
  {
    id: "s6",
    name: "Graphic Design & Animation",
    category: "Multimedia / Design",
    description: "Crafting compelling visual narratives, animations, and vector graphics.",
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Animation"],
    level: 90,
  },
  {
    id: "s7",
    name: "3D Modeling",
    category: "Multimedia / Design",
    description: "Creating 3D environments, assets, and visual effects.",
    tools: ["Blender 3D", "Cinema 4D"],
    level: 80,
  },
  {
    id: "s8",
    name: "Additional Skills",
    category: "Marketing / Growth",
    description: "Diverse set of technical and creative abilities.",
    tools: ["Music", "Digital Marketing", "SEO"],
    level: 85,
  },
];

export const experienceData: Experience[] = [
  {
    id: "e1",
    role: "Founder & Lead Developer",
    company: "Aegis Health AI",
    location: "India",
    duration: "May 2026 - Present",
    highlights: [
      "Architected and developed a full-stack platform transforming raw medical lab reports into structured, patient-friendly summaries using Gemini models.",
      "Built a secure, real-time backend with Firebase and designed a responsive, interactive React/Vite frontend.",
      "Led end-to-end product design, bridging technical implementation with healthcare informatics."
    ]
  },
  {
    id: "e2",
    role: "Sr. Video Editor & Digital Marketing Specialist",
    company: "Deoyani Movies",
    location: "Mumbai",
    duration: "Jun 2024 - Jan 2026",
    highlights: [
      "Managed post-production and delivery, spearheading end-to-end video editing workflows for films and promos.",
      "Developed and executed digital strategy and social media marketing campaigns, scaling YouTube growth through SEO.",
      "Partnered with production teams to align digital marketing initiatives with promotional goals."
    ]
  },
  {
    id: "e3",
    role: "Sr. Video Editor & Content Manager",
    company: "Shelax Worldwide FZE",
    location: "Dubai - UAE, Virtual",
    duration: "Dec 2021 - May 2024",
    highlights: [
      "Edited music videos and worked on audio quality improvements in existing videos.",
      "Managed content for the app and transcribed files for the platform.",
      "Uploaded and managed content on AWS servers for global distribution."
    ]
  },
  {
    id: "e4",
    role: "Video Making/Editing Intern",
    company: "Anti Corona Task Force",
    location: "Delhi, Virtual",
    duration: "May 2021 - Aug 2021",
    highlights: [
      "Took raw footage shot by a film crew and director and turned it into the final cohesive video or film.",
      "Followed outlines, scripts, or shot lists to assemble footage.",
      "Inputted graphics to enhance footage and final video quality."
    ]
  },
  {
    id: "e5",
    role: "Travel & Tourism Manager",
    company: "Anamika Tours",
    location: "Mumbai",
    duration: "Jan 2018 - Present",
    highlights: [
      "Planned and conducted long distance expeditions, travel, and tours for groups or individuals.",
      "Ensured travel ran smoothly from venue to venue without issues.",
      "Verified the quality and amount of equipment prior to expeditions."
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "p1",
    title: "Aegis Health AI",
    shortDesc: "LLM-powered healthcare platform.",
    problem: "Medical lab reports are confusing, jargon-heavy, and difficult for non-experts to interpret.",
    solution: "A secure web app that ingests raw lab data and uses Google Gemini to generate structured, easy-to-read health summaries.",
    result: "Developed MVP with full-stack architecture (React + Firebase), currently testing with early users.",
    tools: ["React", "Firebase", "Google Gemini", "Tailwind CSS"],
    category: "Full-Stack AI",
  },
  {
    id: "p2",
    title: "Cinematic Showreel",
    shortDesc: "High-end post-production portfolio.",
    problem: "Brands needed dynamic, high-retention video content to cut through social media noise.",
    solution: "Produced, edited, and sound-designed a series of high-impact narrative cuts and commercial edits.",
    result: "Increased client engagement metrics and secured retainer contracts.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    category: "Creative",
  },
  {
    id: "p3",
    title: "SEO Growth Engine",
    shortDesc: "Organic traffic acceleration.",
    problem: "A client was plateauing in competitive search rankings and YouTube discoverability.",
    solution: "Implemented a systemic content architecture, metadata optimization, and targeted link-building strategy.",
    result: "Achieved significant uplift in organic impressions and multi-channel subscriber growth.",
    tools: ["Ahrefs", "Google Analytics", "YouTube Studio"],
    category: "Growth",
  },
  {
    id: "p4",
    title: "Workflow Automation Hub",
    shortDesc: "Internal operations optimization.",
    problem: "Administrative and content distribution tasks were consuming 15+ hours a week.",
    solution: "Built a network of automated pipelines connecting CRM, email, and social publishing platforms.",
    result: "Reclaimed ~15 hours/week, allowing a shift to high-leverage creative work.",
    tools: ["Zapier", "Make", "REST APIs"],
    category: "Systems",
  }
];

export const assistantPrompts: PromptChip[] = [
  {
    id: "a1",
    text: "What can he build?",
    response: "I build full-stack web applications, AI-integrated platforms (like Aegis Health AI), intelligent dashboards, and complex workflow automations. I handle frontend architecture (React/TS), backend setup (Firebase), and LLM integrations (Gemini)."
  },
  {
    id: "a2",
    text: "Show healthcare work.",
    response: "My main product is Aegis Health AI—a platform that takes complex medical lab reports and uses Google Gemini to extract, structure, and summarize the data so it's easy for patients to understand. It's built securely with React and Firebase."
  },
  {
    id: "a3",
    text: "Is he good for startups?",
    response: "Yes. Being a solo founder myself, I understand how to go from 0 to 1 quickly without sacrificing architecture. I know how to balance shipping MVPs fast, maintaining clean codebases, and iterating based on user feedback."
  },
  {
    id: "a4",
    text: "What creative work has he done?",
    response: "I have years of experience as a Senior Video Editor and Creative Director across Mumbai and Dubai. I create cinematic commercials, high-retention social content, and motion graphics. My work bridges strong visual storytelling with digital marketing strategies."
  },
  {
    id: "a5",
    text: "Can he help with AI products?",
    response: "Absolutely. I specialize in integrating LLMs into practical tools. Whether you need an intelligent assistant, complex data parser, or automated insights engine, I know how to prompt, orchestrate, and deploy AI models reliably into production."
  },
  {
    id: "a6",
    text: "Where is he based?",
    response: "I am based in India. I operate globally, building remote AI systems, robust full-stack applications, and scaling digital platforms for modern audiences."
  }
];
