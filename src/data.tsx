import { Experience, Project, PromptChip, Skill, Certification } from "./types";

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
    name: "AI Generalist & Vibe Coding",
    category: "AI / Development",
    description: "Orchestrating multi-agent systems, multimodal generative models, and LLM production pipelines.",
    tools: ["Google Gemini", "Claude", "Multi-Agent Orchestration", "AI Video & Voice", "Generative AI", "Vibe Coding"],
    level: 95,
  },
  {
    id: "s9",
    name: "OTT Video & DRM Infrastructure",
    category: "Automation / Systems",
    description: "Enterprise video streaming CDN, Widevine/FairPlay DRM, ephemeral HMAC signed tokens, and TVOD payment pipelines.",
    tools: ["Bunny Stream CDN", "HLS / DASH", "MediaCage DRM", "Widevine & FairPlay", "Razorpay TVOD", "Capacitor Mobile"],
    level: 95,
  },
  {
    id: "s4",
    name: "Cybersecurity",
    category: "Automation / Systems",
    description: "Security assessment, token verification, and vulnerability testing.",
    tools: ["Ethical Hacking", "Web VAPT", "OWASP", "HMAC-SHA256 Auth"],
    level: 80,
  },
  {
    id: "s5",
    name: "Video Editing & Post-Production",
    category: "Multimedia / Design",
    description: "High-end cinematic video editing, color grading, motion graphics, and theatrical mastering.",
    tools: ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve", "Video Mastering"],
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
    name: "Growth & Digital Strategy",
    category: "Marketing / Growth",
    description: "Content distribution, search engine architecture, and multi-channel audience scaling.",
    tools: ["YouTube Studio", "Digital Marketing", "SEO", "Analytics"],
    level: 88,
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
    ],
    icons: ["google", "aws"]
  },
  {
    id: "e2",
    role: "Chief Architect, Lead OTT Systems Engineer & Sr. Video Editor",
    company: "Deoyani Movies Pvt Ltd",
    location: "Mumbai, India",
    duration: "Jun 2024 - Present",
    highlights: [
      "Architected, developed, and launched the official Deoyani Movies OTT streaming portal (deoyanimovies.com) powered by React 19, Firebase Firestore, and Bunny.net Stream CDN.",
      "Engineered TVOD pay-per-movie monetization (₹25 / 72-hour rental) and VIP cinema passes with live Razorpay gateway integration, cryptographic HMAC-SHA256 webhook verification, and idempotent ledgering.",
      "Constructed zero-trust anti-piracy defenses: ephemeral HMAC-SHA256 signed playback tokens (10m TTL), Shaka Multi-DRM (Widevine L3/L1 & Apple FairPlay cbcs CENC), 30s sliding session concurrency locks (2-device cap), and mobile app-switcher privacy blanking.",
      "Integrated Google Cloud Agent Platform / Gemini 3.6 Flash AI service for smart catalog search, studio trivia, and multilingual conversational concierge (Marathi, Hindi, English).",
      "Directed end-to-end post-production, digital mastering, color grading, and promotional trailer editing for landmark films (Matru Devo Bhavah, Bindhast, Chimani Pakhar), scaling digital reach via YouTube SEO."
    ],
    icons: ["google", "aws"]
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
    ],
    icons: ["aws"]
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
    id: "p0",
    title: "Deoyani Movies OTT Platform",
    shortDesc: "Enterprise Web & Mobile OTT Streaming Architecture.",
    problem: "Regional film production houses suffer from opaque 3rd-party aggregator rev-shares, video piracy, and lack of direct audience monetization.",
    solution: "Engineered a production-grade Web/Mobile OTT platform featuring Bunny Stream encrypted CDN delivery, live Razorpay TVOD (₹25/72hr) & VIP cinema passes, Zero-Trust expiring HMAC tokens, Multi-DRM (Widevine/FairPlay cbcs), 30s sliding concurrency locks, and an integrated multilingual Gemini 3.6 Flash AI concierge.",
    result: "Successfully launched live at deoyanimovies.com, monetizing premier banner catalog films (Bindhast, Matru Devo Bhavah, Chimani Pakhar) with sub-second time-to-first-frame and zero-piracy stream protection.",
    tools: ["React 19", "Bunny Stream CDN", "Multi-DRM", "Razorpay TVOD", "Firebase Firestore", "Google Gemini 3.6 Flash", "Capacitor Mobile"],
    category: "Full-Stack Media",
    link: "https://www.deoyanimovies.com"
  },
  {
    id: "p5",
    title: "ArthaDesk",
    shortDesc: "Offline-first distributor billing & management.",
    problem: "FMCG wholesalers face severe connectivity issues making cloud-dependent billing systems unreliable and slow.",
    solution: "Designed an offline-first billing & management software with fast desktop deployment and operational reliability.",
    result: "Enabled fast, resilient billing for wholesalers without depending on constant internet connectivity.",
    tools: ["Electron", "React", "Local DB", "Tailwind CSS"],
    category: "Full-Stack",
    link: "https://arthadesk-distributor-billing-management-software-896741049937.asia-southeast1.run.app/"
  },
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
    id: "a_deoyani",
    text: "What is Deoyani Movies OTT?",
    response: "Deoyani Movies OTT (deoyanimovies.com) is an enterprise-grade Web & Mobile OTT platform I architected and developed for Deoyani Movies Pvt Ltd. It features Bunny Stream CDN, Widevine/FairPlay cbcs DRM, live Razorpay TVOD monetization, 30s sliding concurrency heartbeats, and a multilingual Gemini 3.6 Flash AI concierge."
  },
  {
    id: "a_ai_generalist",
    text: "What is an AI Generalist?",
    response: "As an AI Generalist, I operate across the full spectrum of applied AI: from multi-agent orchestration (Aegis Health AI) and LLM prompting/fine-tuning (Gemini, Claude, Llama) to multimodal AI workflows (AI video, voice synthesis, generative vision) and full-stack integration into hardened production software."
  },
  {
    id: "a_drm",
    text: "How does the OTT DRM work?",
    response: "The Deoyani OTT video pipeline enforces Zero-Trust security: short-lived HMAC-SHA256 signed playback URLs (10-minute TTL), Shaka Multi-DRM with Widevine (Google) and FairPlay (Apple) AES-128 cbcs CENC encryption, 30-second sliding-window session heartbeats capping active devices to 2, and mobile app-switcher privacy blanking."
  },
  {
    id: "a_survival",
    text: "Survival Rate Guide",
    response: "" // Handled dynamically in NLP match
  },
  {
    id: "a_playbook",
    text: "Multi-Agent Playbook",
    response: "" // Handled dynamically in NLP match
  },
  {
    id: "a_milestones",
    text: "Startup Milestones",
    response: "" // Handled dynamically in NLP match
  },
  {
    id: "a_arthadesk",
    text: "What is ArthaDesk?",
    response: "ArthaDesk is an offline-first distributor billing & management software for FMCG wholesalers. Built with React and an embedded local DB, it solves severe connectivity issues in rural areas."
  },
  {
    id: "a1",
    text: "What can he build?",
    response: "I am a Product Manager, AI Generalist, and Chief Architect. I build full-stack web applications, AI-integrated platforms (like Aegis Health AI), enterprise OTT streaming systems (like Deoyani Movies OTT), and complex workflow automations. I handle frontend architecture (React/TS), backend setup (Firebase), and LLM integrations (Gemini)."
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
    response: "Absolutely. As an AI Generalist, I specialize in integrating LLMs into practical tools. Whether you need an intelligent assistant, complex data parser, or automated insights engine, I know how to prompt, orchestrate, and deploy AI models reliably into production."
  },
  {
    id: "a6",
    text: "Where is he based?",
    response: "I am based in India. I operate globally, building remote AI systems, robust full-stack applications, and scaling digital platforms for modern audiences."
  }
];

export const certificationsData: Certification[] = [
  {
    id: "c1",
    name: "Digital Marketing",
    issuer: "Internshala Trainings",
    duration: "Sep 2021 - Oct 2021",
    score: "63%",
    details: "Building Web Presence, SEO, Digital Advertising with Google Ads, Social Media Marketing, Email Marketing, Inbound Marketing.",
    icon: "marketing"
  },
  {
    id: "c2",
    name: "Programming With Python",
    issuer: "Internshala Trainings",
    duration: "May 2021 - Jun 2021",
    score: "78%",
    details: "Principles of Object-oriented Programming (OOP), Connecting to SQLite Database, Developing a GUI with PyQT.",
    icon: "code"
  },
  {
    id: "c3",
    name: "Internship & Job Preparation",
    issuer: "Internshala Trainings",
    duration: "Apr 2021 - May 2021",
    score: "90%",
    details: "Getting Started with the Job Hunt, Building up your Gears and Going at the Front.",
    icon: "briefcase"
  },
  {
    id: "c4",
    name: "Web Development",
    issuer: "Internshala Trainings",
    duration: "Mar 2021 - Apr 2021",
    score: "63%",
    details: "HTML & CSS, Bootstrap, SQL and PHP.",
    icon: "web"
  },
  {
    id: "c5",
    name: "Ethical Hacking",
    issuer: "Internshala Trainings",
    duration: "Mar 2021 - Apr 2021",
    score: "61%",
    details: "Basics of Information Security and Computer Networking, Information Gathering, Web VAPT, OWASP and SQL Injections.",
    icon: "shield"
  },
  {
    id: "c6",
    name: "Master Adobe Illustrator",
    issuer: "Udemy",
    duration: "Mar 2021 - May 2021",
    details: "Advanced Illustrator tools and techniques, custom typography, design graphics, drawing from images.",
    icon: "design"
  },
  {
    id: "c7",
    name: "Animation",
    issuer: "Internshala Trainings",
    duration: "Mar 2021 - Apr 2021",
    score: "82%",
    details: "Main Features of After Effects, Animation Foundations, Working in 3D, Integration with Other Applications.",
    icon: "video"
  },
  {
    id: "c8",
    name: "Advance Video Editing",
    issuer: "Editor Squad Media Ptv Ltd",
    duration: "Jan 2020 - Mar 2020",
    details: "Essentials of Video Shooting and Editing, Premiere Pro, Audio Editing, and Green Screen Editing & Exporting.",
    icon: "video"
  }
];
