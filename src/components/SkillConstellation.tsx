import { motion } from "motion/react";
import { useState } from "react";
import { skillsData } from "../data";
import { Skill } from "../types";
import { cn } from "../utils";
import { useAppState } from "../AppStateContext";
import { SkillVisual } from "./SkillVisuals";

function SkillCard({ skill, activeSkill, setActiveSkill, highlighted }: any) {
  const [hovered, setHovered] = useState(false);
  const { reduceMotion } = useAppState();
  const isActive = activeSkill?.id === skill.id;

  const isVioletCluster = skill.category === "AI / Development" || skill.category === "Healthcare Tech";
  const activeShadow = isVioletCluster ? "shadow-[0_0_20px_rgba(138,43,226,0.3)] border-brand-violet bg-brand-violet/5" : "shadow-[0_0_20px_rgba(0,240,255,0.3)] border-brand-cyan bg-brand-cyan/5";
  const inactiveShadow = highlighted ? "border-brand-violet/50 shadow-[0_0_10px_rgba(138,43,226,0.1)]" : "border-white/5 hover:border-white/20";
  const bgGlowClass = isVioletCluster ? "from-brand-violet/0 via-brand-violet/10 to-brand-violet/0" : "from-brand-cyan/0 via-brand-cyan/10 to-brand-cyan/0";

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      animate={isActive && !reduceMotion ? {
        boxShadow: isVioletCluster 
          ? ['0 0 15px rgba(138,43,226,0.2)', '0 0 25px rgba(138,43,226,0.4)', '0 0 15px rgba(138,43,226,0.2)']
          : ['0 0 15px rgba(0,240,255,0.2)', '0 0 25px rgba(0,240,255,0.4)', '0 0 15px rgba(0,240,255,0.2)'],
      } : isActive && reduceMotion ? {
        boxShadow: isVioletCluster ? '0 0 20px rgba(138,43,226,0.3)' : '0 0 20px rgba(0,240,255,0.3)'
      } : {}}
      transition={{
        default: { duration: 0.4 },
        boxShadow: !reduceMotion ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }
      }}
      viewport={{ once: true }}
      onMouseEnter={() => {
        setHovered(true);
        setActiveSkill(skill);
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setActiveSkill(skill)}
      className={cn(
        "cursor-pointer pr-4 pl-2 py-2 rounded-md glass-panel transition-all duration-300 border flex items-center justify-between gap-4 overflow-hidden relative",
        isActive ? activeShadow : inactiveShadow
      )}
    >
      {/* Background ambient animation when active */}
      {isActive && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={reduceMotion ? { opacity: 0.8 } : { opacity: [0.6, 1, 0.6] }}
          transition={reduceMotion ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={cn("absolute inset-0 bg-gradient-to-r -z-10", bgGlowClass)}
        />
      )}
      
      <div className="flex items-center gap-3">
        <SkillVisual id={skill.id} active={isActive} hovered={hovered} />
        <span className="font-medium text-sm sm:text-base">{skill.name}</span>
      </div>
      
      <span className={cn(
        "w-2 h-2 rounded-full opacity-50",
        highlighted ? "bg-brand-violet shadow-[0_0_8px_#8a2be2]" : "bg-brand-cyan shadow-[0_0_8px_#00f0ff]"
      )} />
    </motion.div>
  );
}

export function SkillConstellation() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const { mode, reduceMotion } = useAppState();

  const isHighlighted = (category: string) => {
    if (mode === "founder") return category === "AI / Development" || category === "Automation / Systems" || category === "Healthcare Tech";
    if (mode === "recruiter") return category === "AI / Development" || category === "Healthcare Tech";
    if (mode === "creative") return category === "Multimedia / Design" || category === "Marketing / Growth";
    return false;
  };

  const getGlowColor = () => {
    if (!activeSkill) return "transparent";
    const isViolet = activeSkill.category === "AI / Development" || activeSkill.category === "Healthcare Tech";
    return isViolet ? "rgba(138,43,226,0.1)" : "rgba(0,240,255,0.1)";
  };

  return (
    <section id="skills" className="relative py-32 px-6 sm:px-12 xl:px-24 z-10 border-t border-white/5 transition-colors duration-1000">
      
      {/* Global Background Ambient Glow */}
      {activeSkill && (
        <motion.div 
          className="absolute inset-0 pointer-events-none -z-10"
          initial={{ backgroundColor: "transparent" }}
          animate={reduceMotion ? { backgroundColor: getGlowColor(), opacity: 0.5 } : { backgroundColor: getGlowColor(), opacity: [0.3, 0.7, 0.3] }}
          transition={reduceMotion ? { duration: 0.7 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-display text-4xl font-bold mb-4 tracking-tight">
            Skill <span className="text-gradient-cyan">Constellation</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-xl">
            A map of my technical and creative capabilities. Hover or click to explore the neural pathways of my expertise.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Constellation Grid */}
          <div className="flex-1 flex flex-wrap gap-4 content-start">
            {skillsData.map((skill) => (
              <SkillCard 
                key={skill.id} 
                skill={skill} 
                activeSkill={activeSkill} 
                setActiveSkill={setActiveSkill} 
                highlighted={isHighlighted(skill.category)} 
              />
            ))}
          </div>

          {/* Details Panel - Shows first on mobile if a skill is active */}
          <div className="w-full lg:w-[400px] xl:w-[500px] relative order-first lg:order-last min-h-[300px]">
             {activeSkill ? (
              <motion.div
                key={activeSkill.id}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "glass-panel p-8 rounded-xl h-full bg-gradient-to-b overflow-hidden transition-colors duration-500",
                  activeSkill.category === "AI / Development" || activeSkill.category === "Healthcare Tech" ? "border-brand-violet/20 from-brand-violet/5 to-transparent shadow-[0_0_30px_rgba(138,43,226,0.05)]" : "border-brand-cyan/20 from-brand-cyan/5 to-transparent shadow-[0_0_30px_rgba(0,240,255,0.05)]"
                )}
              >
                <motion.div 
                   className={cn("absolute -top-32 -right-32 w-64 h-64 blur-[100px] rounded-full", 
                     activeSkill.category === "AI / Development" || activeSkill.category === "Healthcare Tech" ? "bg-brand-violet/20" : "bg-brand-cyan/20"
                   )}
                   animate={reduceMotion ? { scale: 1, opacity: 0.6 } : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                   transition={reduceMotion ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10">
                  <div className={cn(
                    "text-xs font-mono mb-2 tracking-widest uppercase transition-colors",
                    activeSkill.category === "AI / Development" || activeSkill.category === "Healthcare Tech" ? "text-brand-violet" : "text-brand-cyan"
                  )}>
                    {activeSkill.category}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4">{activeSkill.name}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {activeSkill.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Core Stack & Tools</div>
                    <div className="flex flex-wrap gap-2">
                      {activeSkill.tools.map(tool => (
                        <span key={tool} className="text-xs font-mono px-2 py-1 bg-white/5 rounded border border-white/10 text-gray-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
             ) : (
              <div className="glass-panel p-8 rounded-xl h-full border-white/5 flex items-center justify-center text-gray-400 font-mono text-sm text-center">
                Select a node to view its neural data.
              </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
