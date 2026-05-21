import { motion } from "motion/react";
import { ChevronDown, Code, Sparkles, Zap, LayoutTemplate, Play } from "lucide-react";
import { cn } from "../utils";
import { useAppState } from "../AppStateContext";

export function Hero() {
  const { mode, setCaseStudyOpen, reduceMotion } = useAppState();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const getPrimaryButtonText = () => {
    if (mode === "founder") return "View Aegis Health AI";
    if (mode === "creative") return "View Visual Work";
    return "View Projects";
  };

  const getPrimaryButtonIcon = () => {
    if (mode === "founder") return <LayoutTemplate className="w-4 h-4"/>;
    if (mode === "creative") return <Play className="w-4 h-4"/>;
    return <Code className="w-4 h-4"/>;
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 xl:px-24 pt-20 z-10 overflow-hidden">
      
      {/* Hero Ambient Glow */}
      <motion.div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[200px] rounded-full pointer-events-none -z-10 transition-colors duration-1000",
          mode === "creative" || mode === "founder" ? "bg-brand-violet/20" : "bg-brand-cyan/20"
        )}
        animate={reduceMotion ? { opacity: 0.5, scale: 1 } : { 
          scale: [1, 1.05, 1], 
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={reduceMotion ? { duration: 1 } : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <motion.div 
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 mb-6 text-brand-cyan font-mono text-sm sm:text-base tracking-wider"
        >
          <Sparkles className="w-4 h-4" />
          <span>INITIALIZING PROFILE...</span>
        </motion.div>

        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.1] transition-all">
          I build <span className={cn("transition-colors", mode === "creative" ? "text-gradient-violet" : "text-gradient-cyan")}>Intelligent systems</span><br />
          and <span className={cn("transition-colors", mode === "creative" ? "text-gradient-cyan" : "text-gradient-violet")}>creative tech.</span>
        </h1>
        
        <p className="font-sans text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          I'm <span className="text-white font-medium">Aniket Dhuri</span> — a solo founder, full-stack AI builder, and digital strategist. 
          I architect platforms like Aegis Health AI and craft high-end interactive systems.
        </p>

        <div className="flex flex-wrap gap-4 font-mono text-sm">
          <button 
            onClick={() => {
              if (mode === "founder") setCaseStudyOpen(true);
              else scrollTo("projects");
            }}
            className="group relative px-6 py-3 bg-brand-black border border-brand-cyan text-brand-cyan overflow-hidden rounded-md transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-brand-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2 z-10">
              {getPrimaryButtonIcon()} {getPrimaryButtonText()}
            </span>
          </button>
          
          <button 
            onClick={() => scrollTo("hire")}
            className="px-6 py-3 bg-white text-black font-semibold rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <Zap className="w-4 h-4 hidden sm:block" /> Hire Me
          </button>
          
          <button 
            onClick={() => scrollTo("assistant")}
            className="px-6 py-3 glass-panel text-white rounded-md glass-panel-hover transition-all"
          >
            Talk to the Mini Brain
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className={cn("absolute bottom-10 left-6 sm:left-12 xl:left-24 flex items-center gap-2 text-gray-500 font-mono text-xs tracking-widest cursor-pointer hover:text-white transition-colors", !reduceMotion && "animate-pulse")}
        onClick={() => scrollTo("skills")}
      >
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>

    </section>
  );
}
