import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDown, Code, Sparkles, Zap, LayoutTemplate, Play, Orbit, Cpu, ShieldCheck, Activity } from "lucide-react";
import { cn } from "../utils";
import { useAppState } from "../AppStateContext";

export function Hero() {
  const { mode, setCaseStudyOpen, setMiniBrainOpen, reduceMotion } = useAppState();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activeCycleTab, setActiveCycleTab] = useState<"inference" | "failover" | "mutex">("inference");

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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Map bounds to tilt max angles
    const rX = -(y / (box.height / 2)) * 14;
    const rY = (x / (box.width / 2)) * 14;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[100svh] flex flex-col justify-center px-6 sm:px-12 xl:px-24 pt-28 pb-24 z-10 overflow-hidden cursor-default"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* Hero Ambient Glow */}
      <motion.div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] blur-[100px] md:blur-[200px] rounded-full pointer-events-none -z-10 transition-colors duration-1000",
          mode === "creative" || mode === "founder" ? "bg-brand-violet/20" : "bg-brand-cyan/20"
        )}
        animate={reduceMotion ? { opacity: 0.5, scale: 1 } : { 
          scale: [1, 1.05, 1], 
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={reduceMotion ? { duration: 1 } : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Interactive 3D Cyber Net Grid */}
      {!reduceMotion && (
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-brand-black"
          style={{ perspective: "1000px" }}
        >
          {/* Grid Layer */}
          <div 
            className="absolute inset-[-60%] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:48px_48px] opacity-75"
            style={{
              transform: `rotateX(68deg) translateY(${rotateX * 1.8}px) translateX(${rotateY * 1.8}px) translateZ(-80px)`,
              transformOrigin: "center center",
              transition: "transform 0.25s ease-out"
            }}
          />

          {/* Deep Space Star / Particle Layer */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1.5px)] [background-size:32px_32px] opacity-80"
            style={{
              transform: `translateY(${rotateX * 0.4}px) translateX(${rotateY * 0.4}px)`,
              transition: "transform 0.3s ease-out"
            }}
          />

          {/* Horizon Neon Laser Line */}
          <div 
            className="absolute top-[45%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent blur-[1px]"
            style={{
              transform: `translateY(${rotateY * -0.2}px)`,
              transition: "transform 0.4s ease-out"
            }}
          />
          <div 
            className="absolute top-[45%] left-0 right-0 h-[10px] bg-gradient-to-r from-transparent via-brand-cyan/15 to-transparent blur-md"
            style={{
              transform: `translateY(${rotateY * -0.2}px)`,
              transition: "transform 0.4s ease-out"
            }}
          />

          {/* Secondary Horizon Laser Line (Violet) */}
          <div 
            className="absolute top-[45%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-violet/25 to-transparent blur-[2px] mt-4"
            style={{
              transform: `translateY(${rotateY * 0.25}px)`,
              transition: "transform 0.35s ease-out"
            }}
          />

          {/* Ambient Digital Pulse Points */}
          <div className="absolute top-[35%] left-[10%] w-[120px] h-[120px] bg-brand-cyan/5 rounded-full blur-[40px] animate-pulse" />
          <div className="absolute top-[55%] right-[15%] w-[180px] h-[180px] bg-brand-violet/5 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center relative">
        
        {/* Left main branding sequence */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-4 relative"
          style={{
            transform: reduceMotion 
              ? "none" 
              : `rotateX(${rotateX * 0.3}deg) rotateY(${rotateY * 0.3}deg) translateZ(0px)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.15s ease-out-back"
          }}
        >
          {/* Subtle Background 3D Holographic Space Frame */}
          {!reduceMotion && (
            <div 
              className="absolute -left-12 sm:-left-24 top-[-20%] w-[120%] h-[140%] pointer-events-none -z-10 overflow-hidden opacity-35"
              style={{ 
                transform: `translateZ(-40px) rotateX(${rotateX * -0.15}deg) rotateY(${rotateY * -0.15}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Radial subtle mesh grid representation */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px] rounded-full pointer-events-none" />
              
              {/* Moving orbits matching cybernet workspace schema */}
              <div className="absolute top-1/4 left-1/4 w-36 h-36 border border-dashed border-brand-cyan/10 rounded-full animate-pulse" />
              <div className="absolute top-1/2 right-1/4 w-52 h-52 border border-dashed border-brand-violet/10 rounded-full animate-spin" style={{ animationDuration: "16s" }} />

              {/* Floating particles at distinct depth layers */}
              <span className="absolute top-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#00f0ff]" style={{ transform: "translateZ(30px)" }} />
              <span className="absolute top-2/3 left-1/4 w-1 h-1 rounded-full bg-brand-violet shadow-[0_0_8px_#8a2be2]" style={{ transform: "translateZ(70px)" }} />
              <span className="absolute top-1/4 right-1/3 w-1.2 h-1.2 rounded-full bg-brand-green shadow-[0_0_8px_#00ff66]" style={{ transform: "translateZ(50px)" }} />
            </div>
          )}

          <motion.div 
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mb-4 text-brand-cyan font-mono text-xs sm:text-sm tracking-widest uppercase bg-brand-cyan/5 border border-brand-cyan/15 px-3 py-1 rounded w-fit relative"
            style={{ 
              transform: reduceMotion ? "none" : "translateZ(30px)",
              transformStyle: "preserve-3d"
            }}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>INITIALIZING PROFILE...</span>
            <span className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
          </motion.div>

          <h1 
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.05] transition-all relative select-text"
            style={{ 
              transform: reduceMotion ? "none" : "translateZ(55px)",
              textShadow: reduceMotion ? "none" : `${-rotateY * 0.35}px ${rotateX * 0.35}px 20px rgba(0, 240, 255, 0.15)`
            }}
          >
            I build <span className={cn("transition-colors", mode === "creative" ? "text-gradient-violet" : "text-gradient-cyan")}>Intelligent systems</span><br />
            and <span className={cn("transition-colors", mode === "creative" ? "text-gradient-cyan" : "text-gradient-violet")}>creative tech.</span>
          </h1>
          
          <p 
            className="font-sans text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mb-8 sm:mb-10 leading-relaxed font-normal"
            style={{ transform: reduceMotion ? "none" : "translateZ(20px)" }}
          >
            I'm <span className="text-white font-medium">Aniket Dhuri</span> — a <span className="text-brand-cyan font-semibold">Product Manager</span>, <span className="text-brand-violet font-semibold">GenAI Specialist</span>, and solo founder based in India. 
            I architect intelligent platforms like Aegis Health AI and craft high-end interactive systems.
          </p>

          <div 
            className="flex flex-wrap gap-4 font-mono text-xs"
            style={{ transform: reduceMotion ? "none" : "translateZ(40px)" }}
          >
            <button 
              onClick={() => {
                if (mode === "founder") setCaseStudyOpen(true);
                else scrollTo("projects");
              }}
              className="group relative px-6 py-3.5 bg-brand-black border border-brand-cyan text-brand-cyan overflow-hidden rounded-md transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2 cursor-pointer font-bold tracking-wider"
            >
              <div className="absolute inset-0 bg-brand-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2 z-10">
                {getPrimaryButtonIcon()} {getPrimaryButtonText()}
              </span>
            </button>
            
            <button 
              onClick={() => scrollTo("hire")}
              className="px-6 py-3.5 bg-white text-black font-semibold rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Zap className="w-4 h-4 hidden sm:block" /> Hire Me
            </button>
            
            <button 
              onClick={() => setMiniBrainOpen(true)}
              className="group relative px-6 py-3.5 rounded-md overflow-hidden glass-panel border-white/5 hover:border-brand-violet/30 hover:shadow-[0_0_20px_rgba(138,43,226,0.2)] hover:bg-brand-violet/5 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
               <motion.div
                 animate={reduceMotion ? {} : { y: [0, -3, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <div className="absolute inset-0 bg-brand-violet/30 blur-[8px] rounded-full group-hover:bg-brand-cyan/40 transition-colors duration-500" />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10 transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110">
                      <path d="M12 2L18 9L12 22L6 9L12 2Z" fill="rgba(138,43,226,0.3)" stroke="url(#obsidian-gradient-hero)" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M12 2L15 9L12 22M12 2L9 9L12 22M6 9H18" stroke="url(#obsidian-gradient-hero)" strokeWidth="1" strokeOpacity="0.7" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="obsidian-gradient-hero" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#00f0ff" />
                          <stop offset="0.5" stopColor="#8a2be2" />
                          <stop offset="1" stopColor="#00ff66" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
               </motion.div>
               <span className="font-mono tracking-widest text-gray-300 group-hover:text-white transition-colors duration-300 uppercase relative z-10">Mini Brain</span>
            </button>
          </div>

          {/* Quick Access Anchor Pills */}
          <div 
            className="flex flex-wrap items-center gap-2 pt-6 border-t border-white/5 font-mono text-xs"
            style={{ transform: reduceMotion ? "none" : "translateZ(25px)" }}
          >
            <span className="text-gray-500 uppercase tracking-wider mr-2 text-[10px]">Direct Entry Nodes:</span>
            <button
              onClick={() => {
                const el = document.getElementById("survival-guide");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-brand-cyan/5 hover:bg-brand-cyan/15 border border-brand-cyan/20 rounded-full font-mono text-brand-cyan transition-all cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              AI Survival Guide '26
            </button>
            
            <button
              onClick={() => setCaseStudyOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-brand-violet/5 hover:bg-brand-violet/15 border border-brand-violet/20 rounded-full font-mono text-brand-violet transition-all cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
              Aegis Multi-Agent Playbook
            </button>
          </div>
        </motion.div>

        {/* Right side interactive 3D Hologram column */}
        <div className="lg:col-span-5 hidden lg:flex justify-center items-center">
          <div 
            className="w-full max-w-[380px] aspect-square relative select-none rounded-2xl"
            style={{ perspective: "1000px" }}
          >
            {/* Main Interactive 3D Frame */}
            <div 
              className="w-full h-full glass-panel border-white/10 rounded-2xl relative transition-all duration-300 ease-out shadow-[0_0_50px_rgba(0,240,255,0.05)] cursor-pointer"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Back ambient matrix effect */}
              <div 
                className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] rounded-2xl pointer-events-none"
                style={{ transform: "translateZ(-30px)" }}
              />

              {/* Central glowing core node */}
              <div 
                className="absolute w-20 h-20 top-1/2 left-1/2 -mt-10 -ml-10 rounded-full flex items-center justify-center pointer-events-none"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="absolute inset-0 bg-brand-cyan/20 blur-xl rounded-full scale-125 animate-pulse" />
                <div className="absolute inset-1.5 bg-brand-black border border-brand-cyan/40 rounded-full flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-brand-cyan animation-spin" style={{ animationDuration: "12s" }} />
                </div>
              </div>

              {/* 3D Co-centric rotating vector paths */}
              <div 
                className="absolute inset-6 rounded-full border border-dashed border-brand-cyan/25 flex items-center justify-center animate-spin pointer-events-none"
                style={{ 
                  transform: "translateZ(10px) rotateX(45deg)", 
                  transformStyle: "preserve-3d",
                  animationDuration: "25s" 
                }}
              >
                <div className="w-4 h-4 rounded-full bg-brand-cyan absolute top-0 -mt-2 shadow-[0_0_10px_#00f0ff]" />
              </div>

              <div 
                className="absolute inset-16 rounded-full border border-dashed border-brand-violet/25 flex items-center justify-center animate-spin pointer-events-none"
                style={{ 
                  transform: "translateZ(20px) rotateY(-45deg)", 
                  transformStyle: "preserve-3d",
                  animationDuration: "18s",
                  animationDirection: "reverse"
                }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-brand-violet absolute bottom-0 -mb-2 shadow-[0_0_10px_#8a2be2]" />
              </div>

              {/* Floating Layer 3D Badge: PM Node */}
              <div 
                className="absolute left-6 top-8 px-2.5 py-1.5 bg-brand-black/95 border border-brand-cyan/35 rounded-lg flex items-center gap-1.5 text-[10px] font-mono text-white pointer-events-none"
                style={{ transform: "translateZ(65px)" }}
              >
                <Activity className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                <span>INFERENCE ENGINE</span>
              </div>

              {/* Floating Layer 3D Badge: System Node */}
              <div 
                className="absolute right-6 top-16 px-2.5 py-1.5 bg-brand-black/95 border border-brand-violet/35 rounded-lg flex items-center gap-1.5 text-[10px] font-mono text-white pointer-events-none"
                style={{ transform: "translateZ(95px)" }}
              >
                <Orbit className="w-3.5 h-3.5 text-brand-violet" />
                <span>MUTEX COEXIST_v4</span>
              </div>

              {/* Bottom live stats telemetry readout */}
              <div 
                className="absolute inset-x-6 bottom-6 p-4 bg-brand-black/90 border border-white/5 rounded-xl font-mono text-[10px] text-gray-400 space-y-1"
                style={{ transform: "translateZ(45px)" }}
              >
                <div className="flex justify-between items-center text-white border-b border-white/5 pb-1.5 mb-1.5">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
                    TELEMETRY ON
                  </span>
                  <span className="text-[9px] text-gray-500">Node: 2276.x</span>
                </div>
                <div className="flex justify-between">
                  <span>Throughput:</span>
                  <span className="text-brand-cyan">~1,500 t/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Mutex State:</span>
                  <span className="text-brand-green">OK_ACQUIRED</span>
                </div>
                <div className="flex justify-between">
                  <span>Context:</span>
                  <span className="text-brand-violet">ADAPTIVE_COMPRESSED</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className={cn("absolute bottom-6 sm:bottom-10 left-1/2 sm:left-12 xl:left-24 -translate-x-1/2 sm:translate-x-0 flex items-center gap-2 text-gray-500 font-mono text-xs tracking-widest cursor-pointer hover:text-white transition-colors whitespace-nowrap", !reduceMotion && "animate-pulse")}
        onClick={() => scrollTo("skills")}
      >
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>

    </section>
  );
}
