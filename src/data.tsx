import { Experience, Project, PromptChip, Skill } from "./types";

export const skillsData: Skill[] = [
  {
    id: "s1",
    name: "React & TypeScript",
    category: "AI / Development",
    description: "Building scalable, interactive, and responsive frontend architectures.",
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    level: 95,
  },
  {
    id: "s2",
    name: "Firebase & Backend",
    category: "AI / Development",
    description: "Designing real-time databases and secure backend systems.",
    tools: ["Firestore", "Firebase Auth", "Cloud Functions", "Node.js"],
    level: 85,
  },
  {
    id: "s3",
    name: "LLM Orchestration",
    category: "AI / Development",
    description: "Integrating LLMs to extract, structure, and synthesize complex unstructured data.",
    tools: ["Google Gemini", "OpenAI", "Prompt Engineering"],
    level: 90,
  },
  {
    id: "s4",
    name: "Medical Informatics",
    category: "Healthcare Tech",
    description: "Structuring medical lab reports into readable, actionable insights.",
    tools: ["HL7/FHIR Concepts", "Data Parsing", "Aegis Health AI"],
    level: 80,
  },
  {
    id: "s5",
    name: "Video Editing",
    category: "Multimedia / Design",
    description: "High-end cinematic video editing, motion graphics, and post-production.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    level: 95,
  },
  {
    id: "s6",
    name: "Creative Direction",
    category: "Multimedia / Design",
    description: "Crafting compelling visual narratives and brand stories.",
    tools: ["Figma", "Photoshop", "Storyboarding"],
    level: 90,
  },
  {
    id: "s7",
    name: "SEO & Digital Strategy",
    category: "Marketing / Growth",
    description: "Driving organic growth through keyword optimization and content architectures.",
    tools: ["Ahrefs", "Google Analytics", "YouTube SEO"],
    level: 85,
  },
  {
    id: "s8",
    name: "Workflow Automation",
    category: "Automation / Systems",
    description: "Connecting discrete tools to build highly efficient, hands-off business processes.",
    tools: ["Zapier", "Make", "Custom Scripts"],
    level: 80,
  },
];

export const experienceData: Experience[] = [
  {
    id: "e1",
    role: "Founder & Lead Developer",
    company: "Aegis Health AI",
    duration: "2023 - Present",
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
    duration: "2021 - 2023",
    highlights: [
      "Directed end-to-end video production, elevating brand visual identity across multiple campaigns.",
      "Implemented SEO and digital marketing strategies that increased organic engagement.",
      "Managed multimedia assets and optimized digital delivery pipelines."
    ]
  },
  {
    id: "e3",
    role: "Sr. Video Editor & Content Manager",
    company: "Shelax Worldwide FZE",
    location: "Dubai",
    duration: "2019 - 2021",
    highlights: [
      "Led video content creation for a global audience, editing high-impact promotional materials.",
      "Managed content strategy and distribution across international social platforms.",
      "Collaborated with cross-functional teams to align video creative with broader marketing KPIs."
    ]
  },
  {
    id: "e4",
    role: "Video Making/Editing Intern",
    company: "Anti Corona Task Force",
    location: "Delhi",
    duration: "2020 - 2021",
    highlights: [
      "Produced awareness campaigns and informational videos rapidly during a global crisis.",
      "Streamlined remote editing workflows under tight deadlines."
    ]
  },
  {
    id: "e5",
    role: "Travel & Tourism Manager",
    company: "Anamika Tours",
    location: "Mumbai",
    duration: "2017 - 2019",
    highlights: [
      "Designed and managed complex travel itineraries and logistical operations.",
      "Led customer experience resulting in high retention and referral rates."
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
  }
];
