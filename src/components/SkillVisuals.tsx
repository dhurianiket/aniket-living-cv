import { motion } from "motion/react";
import { useAppState } from "../AppStateContext";

interface VisualProps {
  active: boolean;
  hovered: boolean;
}

export function SkillVisual({ id, active, hovered }: VisualProps & { id: string }) {
  const { reduceMotion } = useAppState();
  const shouldAnimate = !reduceMotion && (active || hovered);

  switch (id) {
    case "s1": // React & TypeScript
      return (
        <div className="relative w-12 h-12 flex flex-col items-center justify-center bg-black/60 rounded border border-white/10 overflow-hidden shadow-inner">
          <div className="font-mono text-[10px] leading-tight text-brand-cyan/70 self-start ml-2 mt-1">
            <motion.div animate={shouldAnimate ? { opacity: [0.3, 1, 0.3] } : {}} transition={{ duration: 2, repeat: Infinity }}>
              <span className="text-brand-violet">const</span> init = () =&gt; {'{'}
            </motion.div>
          </div>
          <div className="font-mono text-lg font-bold text-brand-cyan flex items-center justify-center relative mt-1">
            <span className="text-brand-violet opacity-80">{'<'}</span>
            <motion.span
              animate={shouldAnimate ? { opacity: [0, 1, 1, 0] } : { opacity: 1 }}
              transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
              className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              /
            </motion.span>
            <span className="text-brand-violet opacity-80">{'>'}</span>
          </div>
          <div className="font-mono text-[10px] leading-tight text-brand-cyan/70 self-start ml-2 mt-1">
            {'}'}
          </div>
          {/* Syntax glow pulse */}
          <motion.div
            animate={shouldAnimate ? { opacity: [0, 0.2, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-brand-cyan/20 blur-md pointer-events-none"
          />
        </div>
      );

    case "s2": // Firebase & Backend
      return (
        <div className="relative w-12 h-12 flex flex-col items-center justify-center gap-[3px] bg-black/60 rounded border border-white/10 overflow-hidden shadow-inner p-2 pr-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-full h-2 rounded-sm border border-brand-violet/40 bg-gradient-to-r from-brand-violet/10 to-transparent relative overflow-hidden"
              animate={shouldAnimate ? { borderColor: ['rgba(138,43,226,0.3)', 'rgba(138,43,226,0.8)', 'rgba(138,43,226,0.3)'] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            >
              {/* Data flow pulse */}
              <motion.div
                animate={shouldAnimate ? { x: ['-100%', '200%'] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "circIn", delay: i * 0.2 }}
                className="absolute inset-y-0 w-3 bg-brand-violet/60 shadow-[0_0_8px_#8a2be2] skew-x-12"
              />
            </motion.div>
          ))}
          {/* Server status blip */}
          <motion.div 
            animate={shouldAnimate ? { opacity: [1, 0.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
            className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_5px_#00f0ff]" 
          />
        </div>
      );

    case "s3": // LLM Orchestration
      return (
        <div className="relative w-12 h-12 flex items-center justify-center bg-black/60 rounded border border-white/10 overflow-hidden shadow-inner">
          {/* Neural net background */}
          <motion.svg viewBox="0 0 40 40" className="w-full h-full absolute inset-0">
             {/* Lines */}
             <motion.path d="M10,20 L20,10 L30,20 L20,30 Z M20,10 L20,30 M10,20 L30,20" 
                fill="none" 
                stroke="rgba(0,240,255,0.2)" 
                strokeWidth="1"
             />
             {/* Glowing inference waves on lines */}
             {shouldAnimate && (
               <>
                 <motion.circle r="1" fill="#8a2be2" filter="drop-shadow(0 0 2px #8a2be2)"
                   animate={{ cx: [10, 20, 30], cy: [20, 10, 20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                 <motion.circle r="1" fill="#00f0ff" filter="drop-shadow(0 0 2px #00f0ff)"
                   animate={{ cx: [10, 20, 30], cy: [20, 30, 20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }} />
               </>
             )}
          </motion.svg>
          {/* Nodes */}
          {[
            { top: '10px', left: '18px', color: 'bg-brand-violet' },
            { top: '28px', left: '18px', color: 'bg-brand-violet' },
            { top: '19px', left: '8px', color: 'bg-brand-cyan' },
            { top: '19px', left: '28px', color: 'bg-brand-cyan' },
            { top: '19px', left: '18px', color: 'bg-white' },
          ].map((node, i) => (
            <motion.div 
              key={i}
              className={`absolute w-1.5 h-1.5 ${node.color} rounded-full z-10`}
              style={{ top: node.top, left: node.left }}
              animate={shouldAnimate ? { scale: [1, 1.5, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      );

    case "s4": // Medical Informatics
      return (
        <div className="relative w-12 h-12 flex items-center justify-center bg-black/60 rounded border border-white/10 overflow-hidden shadow-inner">
          <div className="w-7 h-8 border border-white/20 rounded-[3px] bg-black relative overflow-hidden flex flex-col gap-1 p-1.5">
            {/* Header block */}
            <div className="w-1/2 h-0.5 bg-brand-cyan/50 rounded-full mb-0.5" />
            <div className="w-full h-0.5 bg-white/30 rounded-full" />
            <div className="w-3/4 h-0.5 bg-white/20 rounded-full" />
            <div className="w-full h-0.5 bg-white/30 rounded-full" />
            
            {/* Vitals chart mini */}
            <motion.svg viewBox="0 0 20 10" className="absolute bottom-1 left-0 w-full h-3">
               <motion.path 
                 d="M0,5 L5,5 L7,1 L9,9 L11,5 L20,5" 
                 fill="none" stroke="#8a2be2" strokeWidth="0.8"
                 initial={{ pathLength: 0 }}
                 animate={shouldAnimate ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
                 transition={{ duration: 2, repeat: Infinity }}
               />
            </motion.svg>

            {/* Scan line effect */}
            <motion.div
              animate={shouldAnimate ? { top: ['-20%', '120%'], opacity: [0, 1, 0] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-2 bg-gradient-to-b from-transparent to-brand-cyan/40 border-b border-brand-cyan z-10"
            />
          </div>
        </div>
      );

    case "s5": // Video Editing
      return (
        <div className="relative w-12 h-12 flex flex-col items-center justify-center gap-[2px] bg-black/60 rounded border border-white/10 overflow-hidden shadow-inner p-1">
          {/* Timecode markers */}
          <div className="w-full h-1 flex justify-between px-1">
             {[...Array(5)].map((_, i) => <div key={i} className="w-[1px] h-[2px] bg-white/20" />)}
          </div>
          
          <div className="w-[90%] h-2 bg-white/5 rounded flex overflow-hidden relative">
             <motion.div 
               animate={shouldAnimate ? { x: [0, -10, 0] } : {}} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="flex w-[150%] h-full"
             >
               <div className="w-1/3 h-full bg-brand-violet/40 border-r border-black" />
               <div className="w-1/3 h-full bg-brand-cyan/40 border-r border-black" />
               <div className="w-1/3 h-full bg-brand-amber/40" />
             </motion.div>
          </div>
          <div className="w-[90%] h-2 bg-white/5 rounded flex overflow-hidden relative mt-[1px]">
             <motion.div 
               animate={shouldAnimate ? { x: [-10, 0, -10] } : {}} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="flex w-[150%] h-full"
             >
               <div className="w-1/2 h-full bg-white/30 border-r border-black" />
               <div className="w-1/2 h-full bg-white/10" />
             </motion.div>
          </div>

          {/* Red Playhead */}
          <motion.div 
            animate={shouldAnimate ? { x: ['-16px', '16px'] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
            className="absolute top-1 bottom-1 w-[1.5px] bg-red-500 shadow-[0_0_4px_#ef4444] z-10"
          >
            <div className="w-1.5 h-1.5 border-[1.5px] border-red-500 bg-black rounded-full -ml-[2px] -mt-[3px]" />
          </motion.div>
        </div>
      );

    case "s6": // Creative Direction
      return (
        <div className="relative w-12 h-12 flex items-center justify-center bg-black/60 rounded border border-white/10 overflow-hidden shadow-inner">
          <motion.div
             animate={shouldAnimate ? { 
               borderRadius: ["20% 80%", "80% 20%", "50% 50%", "20% 80%"],
               rotate: [0, 90, 180, 360],
               borderColor: ['rgba(0,240,255,0.8)', 'rgba(138,43,226,0.8)', 'rgba(255,255,255,0.8)', 'rgba(0,240,255,0.8)']
             } : { borderColor: 'rgba(0,240,255,0.5)' }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="w-6 h-6 border-2 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm"
          />
          {/* Inner pulsating core */}
          <motion.div
             animate={shouldAnimate ? { scale: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] } : {}}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="absolute w-2 h-2 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>
      );

    case "s7": // SEO & Digital Strategy
      return (
        <div className="relative w-12 h-12 flex items-end justify-center gap-[2px] bg-black/60 rounded border border-white/10 overflow-hidden shadow-inner p-2">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
          
          {/* Bars */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-t-[1px] relative z-10"
              style={{ backgroundColor: i === 4 ? '#00f0ff' : 'rgba(255,255,255,0.2)' }}
              initial={{ height: `${15 * i}%` }}
              animate={shouldAnimate ? { 
                height: [`${15 * i}%`, `${20 * i}%`, `${15 * i}%`],
                filter: i === 4 ? ['drop-shadow(0 0 2px #00f0ff)', 'drop-shadow(0 0 6px #00f0ff)', 'drop-shadow(0 0 2px #00f0ff)'] : 'none'
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
            />
          ))}
          
          {/* Sweeping growth line */}
          {shouldAnimate && (
            <motion.svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 40 40">
              <motion.path 
                d="M 5 35 Q 15 25, 20 20 T 35 5" 
                fill="none" 
                stroke="#8a2be2" 
                strokeWidth="1.5"
                filter="drop-shadow(0 0 3px #8a2be2)"
                strokeDasharray="50"
                initial={{ strokeDashoffset: 50, opacity: 0 }}
                animate={{ strokeDashoffset: [50, 0, -50], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.svg>
          )}
        </div>
      );

    case "s8": // Workflow Automation
      return (
        <div className="relative w-12 h-12 flex flex-col items-center justify-between bg-black/60 rounded border border-white/10 overflow-hidden shadow-inner p-1">
           {/* Connected Nodes Path */}
           <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full opacity-50 z-0">
             <path d="M 20 8 L 20 18 L 10 25 L 10 32 M 20 18 L 30 25 L 30 32" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
           </svg>
           
           {/* Trigger Node */}
           <motion.div 
             animate={shouldAnimate ? { scale: [1, 1.2, 1], backgroundColor: ['#00f0ff', '#ffffff', '#00f0ff'] } : {}}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-3 h-3 rounded bg-brand-cyan rotate-45 z-10 shadow-[0_0_5px_#00f0ff] mt-1"
           />
           
           {/* Signal drops */}
           {shouldAnimate && (
             <>
               <motion.div className="absolute w-1 h-1 bg-white rounded-full z-10"
                 animate={{ top: ['8px', '18px', '25px', '32px'], left: ['19px', '19px', '9px', '9px'], opacity: [1, 1, 1, 0] }}
                 transition={{ duration: 2, repeat: Infinity, times: [0, 0.4, 0.7, 1] }}
               />
               <motion.div className="absolute w-1 h-1 bg-brand-violet rounded-full z-10"
                 animate={{ top: ['8px', '18px', '25px', '32px'], left: ['19px', '19px', '29px', '29px'], opacity: [1, 1, 1, 0] }}
                 transition={{ duration: 2, repeat: Infinity, times: [0, 0.4, 0.7, 1], delay: 0.3 }}
               />
             </>
           )}

           {/* Action Nodes */}
           <div className="flex w-full justify-between px-1 mb-1">
              <motion.div 
                animate={shouldAnimate ? { borderColor: ['rgba(255,255,255,0.2)', 'rgba(0,240,255,0.8)', 'rgba(255,255,255,0.2)'] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-3 h-3 rounded-full border-[1.5px] border-white/20 z-10 bg-black"
              />
              <motion.div 
                animate={shouldAnimate ? { borderColor: ['rgba(255,255,255,0.2)', 'rgba(138,43,226,0.8)', 'rgba(255,255,255,0.2)'] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
                className="w-3 h-3 rounded-full border-[1.5px] border-white/20 z-10 bg-black"
              />
           </div>
        </div>
      );

    default:
      return null;
  }
}
