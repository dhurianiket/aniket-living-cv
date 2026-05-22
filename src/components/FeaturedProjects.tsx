import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "../data";
import { useAppState } from "../AppStateContext";
import { cn } from "../utils";

export function FeaturedProjects() {
  const { mode, reduceMotion } = useAppState();

  const sortedProjects = [...projectsData].sort((a, b) => {
    if (mode === "recruiter") {
      if (a.category === "Full-Stack AI") return -1;
      if (a.category === "Growth") return -1;
      return 1;
    }
    if (mode === "founder") {
      if (a.category === "Full-Stack AI") return -1;
      if (a.category === "Systems") return -1;
      return 1;
    }
    if (mode === "creative") {
      if (a.category === "Creative") return -1;
      if (a.category === "Growth") return -1;
      return 1;
    }
    return 0;
  });

  return (
    <section id="projects" className="relative py-32 px-6 sm:px-12 xl:px-24 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl font-bold mb-4 tracking-tight">
          Featured <span className="text-gradient-cyan">Systems</span>
        </h2>
        <p className="text-gray-400 font-mono text-sm max-w-xl mb-16">
          A selection of end-to-end products, growth engines, and multimedia systems I've built.
        </p>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout={!reduceMotion}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.95 }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "glass-panel p-8 rounded-2xl group hover:border-brand-cyan/30 transition-all duration-500 relative overflow-hidden",
                  // Add a subtle border glow if it matches the main mode priority
                  index === 0 && mode !== "default" ? "border-brand-cyan/50 shadow-[0_0_30px_rgba(0,240,255,0.1)]" : ""
                )}
              >
                {/* Subtle background glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 via-transparent to-brand-violet/0 group-hover:from-brand-cyan/5 group-hover:to-brand-violet/5 transition-all duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-mono text-xs tracking-widest text-brand-cyan uppercase bg-brand-cyan/5 px-2 py-1 rounded inline-block mb-3">
                        {project.category}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    {project.link && (
                      <a href={project.link} className="p-3 rounded-full bg-white/5 hover:bg-brand-cyan hover:text-black transition-colors shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    <div>
                      <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Problem</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Solution</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Impact</h4>
                      <p className="text-white text-sm font-medium">{project.result}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2 mt-auto">
                    {project.tools.map(tool => (
                      <span key={tool} className="text-xs font-mono px-2 py-1 bg-black/50 text-gray-400 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
