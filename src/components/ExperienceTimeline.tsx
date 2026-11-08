import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experienceData } from "../data";
import { useAppState } from "../AppStateContext";
import { SiGooglecloud } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const FAST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ExperienceTimeline() {
  const { reduceMotion } = useAppState();
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: spineScrollProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothSpineScaleY = useSpring(spineScrollProgress, {
    stiffness: 260,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative py-32 px-6 sm:px-12 xl:px-24 z-10 border-t border-white/5 bg-black/40 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: FAST_EASE }}
          className="text-center mb-16 space-y-3 will-change-[transform,opacity] transform-gpu"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight">
            Experience <span className="text-gradient-violet">Timeline</span>
          </h2>
          <p className="text-gray-400 font-mono text-xs sm:text-sm max-w-lg mx-auto">
            A progression across enterprise streaming systems, applied AI platforms, and cinematic post-production.
          </p>
        </motion.div>
        
        <div ref={timelineContainerRef} className="space-y-12 relative">
          {/* Static dim background track */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-5 -translate-x-px md:left-1/2 md:-translate-x-1/2 w-0.5 bg-white/10"
          />

          {/* Scroll-drawn illuminated vertical progress spine */}
          <motion.div
            aria-hidden="true"
            style={{
              scaleY: reduceMotion ? 1 : smoothSpineScaleY,
              transformOrigin: "top",
            }}
            className="origin-top absolute inset-y-0 left-5 -translate-x-px md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-brand-cyan via-brand-violet to-brand-cyan/30 will-change-transform transform-gpu"
          />

          {experienceData.map((exp, index) => {
            const isOdd = index % 2 === 0;
            const initialX = reduceMotion ? 0 : isOdd ? -20 : 20;

            return (
              <motion.div 
                key={exp.id}
                initial={
                  reduceMotion
                    ? { opacity: 1, y: 0, x: 0 }
                    : { opacity: 0, y: 18, x: initialX }
                }
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  ease: FAST_EASE,
                }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group will-change-[transform,opacity] transform-gpu"
              >
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-cyan/30 bg-brand-black shadow-[0_0_15px_rgba(138,43,226,0.35)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 group-hover:border-brand-cyan transition-colors duration-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan/80 group-hover:bg-brand-cyan group-hover:shadow-[0_0_10px_#00f0ff] transition-colors duration-200" />
                </div>
                
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl hover:border-brand-cyan/25 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-xl text-white group-hover:text-brand-cyan transition-colors duration-200">{exp.role}</h3>
                    <span className="font-mono text-xs text-brand-cyan bg-brand-cyan/10 px-2 py-1 rounded w-fit shrink-0">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
