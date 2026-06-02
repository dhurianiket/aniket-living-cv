import { motion } from "motion/react";
import { User, Cpu, Layers } from "lucide-react";
import { useAppState } from "../AppStateContext";
import { cn } from "../utils";

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
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </div>
              <div title="Amazon Web Services" className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-inner">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" fill="currentColor">
                  <path d="M11.536 10.37h-.069c-.069-.033-.138-.07-.138-.138V7.994c0-.069.069-.138.138-.138h.069c1.927 0 3.097 1.032 3.097 2.443 0 1.341-.963 2.1-2.96 2.203h-.137v-.034V10.37zm-.172-3.888H9.3v8.815h2.167v-3.82c1.376-.068 2.615-.412 3.51-1.17.962-.756 1.444-1.787 1.444-3.025 0-2.407-1.548-3.404-4.885-3.404v-.033-1.34h-.172v3.978zm4.61 5.397c-.035.103-.069.24-.104.378-.068.172-.103.378-.172.585-.137.378-.276.791-.55 1.135-.654.895-1.548 1.48-2.65 1.825l-.206-.481c1.032-.344 1.788-.86 2.373-1.616.275-.378.448-.757.55-1.102.034-.137.069-.275.103-.412.035-.103.07-.241.103-.344l.826-6.196h2.236l-.378 1.548c.413-.654.929-1.204 1.583-1.548.653-.344 1.376-.516 2.167-.516h.103v2.099h-.103c-1.102 0-1.892.413-2.305 1.204l-1.342 5.402h-2.2zM24 21.055a15.82 15.82 0 0 1-5.16 1.273c-2.477 0-4.644-.55-6.398-1.548-1.754-.997-3.097-2.34-4.095-3.92-1.032-1.618-1.617-3.475-1.788-5.505H3.693c0 2.202.62 4.197 1.789 5.885.584.86 1.307 1.652 2.133 2.34-.138.138-.31.31-.482.447-1.204.996-2.614 1.788-4.162 2.27l-.172.068.723 1.996c2.098-.551 3.99-1.446 5.572-2.753.138-.138.31-.241.448-.378.895.482 1.858.86 2.855 1.102C13.564 22.604 14.837 22.81 16.145 22.81a17.9 17.9 0 0 0 5.813-1.066l2.042-1.996-.05-1.3h.05zM5.38 5.75H13.67V2.583h-8.29v3.167z"/>
                </svg>
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
