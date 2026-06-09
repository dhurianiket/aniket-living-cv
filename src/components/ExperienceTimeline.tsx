import { motion } from "motion/react";
import { experienceData } from "../data";
import { useAppState } from "../AppStateContext";
import { SiGooglecloud } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export function ExperienceTimeline() {
  const { reduceMotion } = useAppState();

  return (
    <section id="experience" className="relative py-32 px-6 sm:px-12 xl:px-24 z-10 border-t border-white/5 bg-black/40">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl font-bold mb-16 tracking-tight text-center">
          Experience <span className="text-gradient-violet">Timeline</span>
        </h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-cyan/20 before:via-brand-violet/20 before:to-transparent">
          {experienceData.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-brand-black shadow-[0_0_15px_rgba(138,43,226,0.3)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 group-hover:border-brand-cyan transition-colors duration-300">
                <div className="w-2 h-2 rounded-full bg-white group-hover:bg-brand-cyan group-hover:shadow-[0_0_10px_#00f0ff] transition-all duration-300" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl hover:border-white/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h3 className="font-bold text-xl text-white">{exp.role}</h3>
                  <span className="font-mono text-xs text-brand-cyan bg-brand-cyan/10 px-2 py-1 rounded w-fit">
                    {exp.duration}
                  </span>
                </div>
                <div className="text-sm font-mono text-gray-400 mb-4 flex items-center gap-2">
                  <span className="text-white">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </>
                  )}
                  {exp.icons && exp.icons.length > 0 && (
                    <div className="flex items-center gap-2 ml-auto">
                      {exp.icons.includes("google") && (
                        <div title="Google Cloud" className="p-1 rounded bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
                          {/* @ts-ignore - React 19 SVGAttributes typing issue */}
                          <SiGooglecloud className="w-4 h-4 fill-current text-white" />
                        </div>
                      )}
                      {exp.icons.includes("aws") && (
                        <div title="Amazon Web Services" className="p-1 rounded bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
                          {/* @ts-ignore - React 19 SVGAttributes typing issue */}
                          <FaAws className="w-4 h-4 fill-current text-white" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-gray-300 text-sm flex gap-3">
                      <span className="text-brand-violet mt-1.5 opacity-50 text-xs">▹</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
