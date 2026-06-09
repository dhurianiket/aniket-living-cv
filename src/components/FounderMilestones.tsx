import React from 'react';
import { motion } from 'motion/react';
import { useAppState } from '../AppStateContext';
import { cn } from '../utils';
import { ShieldCheck } from 'lucide-react';
import { SiGooglecloud } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';

const CloudBadge = ({ children, glowColor }: { children: React.ReactNode, glowColor: string }) => (
  <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
    {/* Glowing background blob */}
    <div className={cn("absolute inset-0 blur-xl opacity-30 rounded-full", glowColor)} />
    
    <svg viewBox="0 0 56 44" className={cn("absolute inset-0 w-14 h-14 drop-shadow-[0_0_4px_currentColor]", glowColor.replace('bg-', 'text-'))} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 37C10.4772 37 6 32.5228 6 27C6 22.0624 9.57655 17.9622 14.2883 17.1517C15.8659 10.4716 21.849 5.5 29 5.5C36.4673 5.5 42.6644 10.7483 44.0203 17.6521C48.3371 18.667 51.5 22.5694 51.5 27.25C51.5 32.6348 47.1348 37 41.75 37H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M29 6C23 6 18 10 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
    <div className="z-10 flex items-center justify-center text-white pt-1">
      {children}
    </div>
  </div>
);

export function FounderMilestones() {
  const { reduceMotion, mode } = useAppState();

  const milestones = [
    {
      id: "google",
      title: "Google Cloud AI",
      desc: "Startup Support",
      glowColor: "bg-blue-400",
      icon: (
        // @ts-ignore - React 19 SVGAttributes typing issue
        <SiGooglecloud className="w-[1.35rem] h-[1.35rem] fill-current translate-y-[2px]" />
      )
    },
    {
      id: "aws",
      title: "AWS Activate",
      desc: "Approved Credits",
      glowColor: "bg-orange-400",
      icon: (
        // @ts-ignore - React 19 SVGAttributes typing issue
        <FaAws className="w-[1.65rem] h-[1.65rem] fill-current translate-y-[2px]" />
      )
    },
    {
      id: "azure",
      title: "Microsoft Azure",
      desc: "Startup Support",
      glowColor: "bg-cyan-400",
      icon: (
        // @ts-ignore - React 19 SVGAttributes typing issue
        <VscAzure className="w-[1.2rem] h-[1.2rem] fill-current translate-y-[2px]" />
      )
    }
  ];

  return (
    <section className="py-20 relative max-w-5xl mx-auto px-4 sm:px-6 w-full z-10" id="milestones">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
      
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-brand-cyan mb-2">
              <ShieldCheck className="w-5 h-5 opacity-80" />
              <span className="font-mono text-xs tracking-widest uppercase opacity-80">Founder Milestone</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Approved for Startup Infrastructure Support
            </h2>
            
            <p className="text-gray-400 leading-relaxed font-sans text-sm sm:text-base max-w-xl">
              Building Aegis Health AI and ArthaDesk with more runway, stronger infrastructure, and a better multi-cloud strategy through official startup support from AWS Activate, Microsoft Azure, and Google Cloud AI Builder.
            </p>
          </div>

          <div className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-col gap-4">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={milestone.id}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.1 * idx }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/5 bg-white/5",
                  mode === "recruiter" && "hover:border-brand-amber/30 transition-colors",
                  mode === "founder" && "border-brand-violet/20 hover:border-brand-violet/40 transition-colors bg-brand-violet/5",
                  "group overflow-hidden relative"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <CloudBadge glowColor={milestone.glowColor}>
                  {milestone.icon}
                </CloudBadge>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors">{milestone.title}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_5px_currentColor]", milestone.glowColor.replace('bg-', 'text-'), milestone.glowColor)} />
                    <p className="text-xs text-gray-400 font-mono">{milestone.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
