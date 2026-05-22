import { ReactNode } from "react";

export interface Skill {
  id: string;
  name: string;
  category: "AI / Development" | "Healthcare Tech" | "Multimedia / Design" | "Marketing / Growth" | "Automation / Systems";
  description: string;
  tools: string[];
  level: number; // 1-100 for visual scaling if needed
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  duration: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  problem: string;
  solution: string;
  result: string;
  tools: string[];
  link?: string;
  category: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  duration: string;
  details?: string;
  score?: string;
  icon?: string;
}

export interface PromptChip {
  id: string;
  text: string;
  response: ReactNode;
}
