import { motion } from "motion/react";
import { User, Cpu, Layers } from "lucide-react";
import { useAppState } from "../AppStateContext";
import { cn } from "../utils";
import { SiGooglecloud } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export function About() {
  const { mode, reduceMotion } = useAppState();

  return (
    <section id="about" className="relative py-32 px-6 sm:px-12 xl:px-24 z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:items-center">
        
        <motion.div 
          initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            The <span className="text-gradient-violet">Architecture</span> of<br/>a Builder.
          </h2>
          
          <div className="space-y-6 text-gray-300 font-sans leading-relaxed text-base sm:text-lg">
            <p>
              I am Aniket Dhuri, a Product Manager and GenAI Specialist based in India. I operate at the intersection of complex software engineering and high-end creative storytelling. 
              As a solo founder, I don't just write code—I build products that solve real, painful problems.
            </p>
            <p className={cn("transition-all duration-500", mode === "founder" && "text-brand-cyan")}>
              My most recent endeavor is <strong className="text-white">Aegis Health AI</strong>, 
              where I architected a full-stack platform transforming medical lab jargon into clear, structured insights using Google Gemini.
              I managed everything from the responsive React frontend to the secure Firebase backend.
            </p>
            <p className={cn("transition-all duration-500", mode === "creative" && "text-brand-violet")}>
              Before diving deep into AI and healthcare primitives, I spent years directing post-production 
              and digital strategy for global brands across Mumbai and Dubai. I know how to make things work flawlessly under the hood, 
              and I know how to make them visually compelling on the surface.
            </p>
            <p>
              My academic foundation includes a <strong className="text-white">Diploma in Electronics and Telecommunication Engineering</strong>, combined with diverse certifications across Digital Marketing, Ethical Hacking, Python, Full-Stack Development, and Advanced Video Editing, giving me a multidimensional approach to complex problem-solving.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className={cn("glass-panel p-6 rounded-2xl flex flex-col gap-4 transition-all duration-500", mode === "founder" && "border-brand-cyan/50 shadow-[0_0_20px_rgba(0,240,255,0.1)]")}>
            <User className="w-8 h-8 text-brand-cyan" />
            <h3 className="font-bold text-white text-xl">Founder Mentality</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              I understand velocity. I know how to ship MVPs fast without sacrificing architecture, focusing on user impact over theoretical perfection.
            </p>
          </div>
          
          <div className={cn("glass-panel p-6 rounded-2xl flex flex-col gap-4 transition-all duration-500", mode === "recruiter" && "border-brand-violet/50 shadow-[0_0_20px_rgba(138,43,226,0.15)]")}>
            <Cpu className="w-8 h-8 text-brand-violet" />
            <h3 className="font-bold text-white text-xl">Full-Stack AI</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Deep expertise in React, Firebase, and LLM orchestration. I bridge the gap between AI capabilities and actual product utility.
            </p>
          </div>

          <div className={cn("glass-panel p-6 rounded-2xl flex flex-col gap-4 transition-all duration-500", mode === "creative" && "border-brand-green/50 shadow-[0_0_20px_rgba(0,255,102,0.1)]")}>
            <Layers className="w-8 h-8 text-brand-green" />
            <h3 className="font-bold text-white text-xl">Creative Technologist</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              My background in cinematic video editing directly informs my UX/UI decisions. I build systems that are not only intelligent but also visually intuitive and engaging.
            </p>
          </div>

          <div className={cn("glass-panel p-6 rounded-2xl flex flex-col gap-4 transition-all duration-500", mode === "founder" && "border-brand-amber/50 shadow-[0_0_20px_rgba(255,191,0,0.15)]")}>
            <div className="flex items-center gap-3">
              <div title="Google Cloud" className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-inner">
                {/* @ts-ignore - React 19 SVGAttributes typing issue */}
                <SiGooglecloud className="w-5 h-5 fill-current text-white" />
              </div>
              <div title="Amazon Web Services" className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-inner">
                {/* @ts-ignore - React 19 SVGAttributes typing issue */}
                <FaAws className="w-5 h-5 fill-current text-white" />
              </div>
            </div>
            <h3 className="font-bold text-white text-xl">Cloud Resourcefulness</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Secured and leveraged Google Cloud and AWS Activate credits to bootstrap cloud infrastructure and ship production-ready systems with zero initial infrastructure overhead.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
