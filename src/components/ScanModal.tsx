import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useAppState } from "../AppStateContext";
import { useScanLog } from "../hooks/useFirebase";
import { X, CheckCircle2, ScanFace, Target, Zap, Briefcase } from "lucide-react";

const scanData = {
  default: {
    summary: "Aniket is a solo founder, AI Generalist, and Chief Architect who builds intelligent systems, enterprise streaming architectures, and premium digital products.",
    strengths: ["Full-Stack Architecture", "AI Generalist & LLMs", "OTT Streaming & DRM", "Creative Direction"],
    roles: ["AI Generalist", "Chief OTT Architect", "Product Manager", "Founding Engineer"],
    projectTypes: ["Enterprise OTT Streaming", "AI-Integrated Platforms", "Healthcare IT Systems", "Interactive SaaS"]
  },
  recruiter: {
    summary: "Aniket is a versatile technical architect, AI Generalist, and digital strategist with a proven track record of shipping end-to-end commercial products.",
    strengths: ["Full-Stack & CDN Architecture", "AI Agent Pipelines", "Cross-Functional Leadership", "Rapid Prototyping"],
    roles: ["AI Generalist", "Chief Architect", "Full-Stack Engineer", "Product Manager"],
    projectTypes: ["Web & Mobile OTT Portals", "SaaS Platforms", "AI Microservices", "Internal Tooling"]
  },
  founder: {
    summary: "Aniket is a fellow builder and technical co-founder who balances architecture and velocity, leveraging AI to construct scalable, defensible products.",
    strengths: ["0-to-1 Architecture", "AI Generalist Execution", "Payment & DRM Workflows", "Product Strategy"],
    roles: ["Technical Co-Founder", "Chief Architect", "Founding Engineer", "Lead Developer"],
    projectTypes: ["0-to-1 Startups", "OTT Streaming & Monetization", "Healthcare IT Platforms", "LLM Systems"]
  },
  creative: {
    summary: "Aniket seamlessly bridges cinematic post-production and senior video editing with modern frontend engineering to craft hardened, high-retention experiences.",
    strengths: ["Cinematic Storytelling", "Senior Video Editing", "UI/UX Motion Design", "Growth & YouTube SEO"],
    roles: ["Creative Technologist", "Sr. Video Editor", "Post-Production Lead", "Design Engineer"],
    projectTypes: ["Theatrical OTT Platforms", "Cinematic Commercials", "Marketing Growth Engines", "Media Portfolios"]
  }
};

export function ScanModal() {
  const { mode, isScanModalOpen, setScanModalOpen, reduceMotion } = useAppState();
  const { recordScan } = useScanLog();
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    if (isScanModalOpen) {
      recordScan(mode, JSON.stringify(scanData[mode]));
      
      if (reduceMotion) {
        setScanning(false);
        return;
      }
      setScanning(true);
      const t = setTimeout(() => setScanning(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isScanModalOpen, mode, reduceMotion]);

  const data = scanData[mode];

  return (
    <AnimatePresence>
      {isScanModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setScanModalOpen(false)}
            className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={reduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] glass-panel border-white/10 rounded-t-3xl sm:rounded-2xl overflow-y-auto shadow-2xl bg-brand-black/95 flex flex-col"
          >
            <div className="px-5 sm:px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5 sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center gap-3 text-brand-cyan">
                <ScanFace className="w-5 h-5" />
                <span className="font-mono text-sm tracking-widest uppercase">Profile Analysis : {mode}</span>
              </div>
              <button 
                onClick={() => setScanModalOpen(false)}
                aria-label="Close Scan Modal"
                className="p-3 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8 relative min-h-[300px] flex-1 overflow-y-auto">
              {scanning ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-2 border-brand-cyan border-t-transparent rounded-full mb-6 shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                  />
                  <div className="font-mono text-brand-cyan text-sm tracking-widest animate-pulse">
                    ANALYZING DATA POINTS...
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-brand-violet" /> System Verdict
                    </h3>
                    <p className="text-xl md:text-2xl font-display text-white leading-relaxed font-light">
                      "{data.summary}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/10">
                    <div>
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-brand-amber" /> Top Strengths
                        </h3>
                        <ul className="space-y-3">
                          {data.strengths.map((str, i) => (
                            <motion.li 
                              initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: reduceMotion ? 0 : i * 0.1 }}
                              key={i} 
                              className="flex items-center gap-3 text-sm text-gray-300"
                            >
                              <CheckCircle2 className="w-4 h-4 text-brand-green" />
                              {str}
                            </motion.li>
                          ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                           <Briefcase className="w-4 h-4 text-brand-cyan" /> Best-Fit Roles
                        </h3>
                        <div className="flex flex-col gap-2">
                          {data.roles.map((role, i) => (
                            <motion.span 
                              initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: reduceMotion ? 0 : i * 0.1 + 0.3 }}
                              key={i} 
                              className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-sm text-gray-200"
                            >
                              {role}
                            </motion.span>
                          ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                           <Target className="w-4 h-4 text-brand-violet" /> Project Types
                        </h3>
                        <div className="flex flex-col gap-2">
                          {data.projectTypes.map((type, i) => (
                            <motion.span 
                              initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: reduceMotion ? 0 : i * 0.1 + 0.5 }}
                              key={i} 
                              className="px-3 py-1.5 rounded bg-brand-cyan/5 border border-brand-cyan/20 text-sm text-brand-cyan shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                            >
                              {type}
                            </motion.span>
                          ))}
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
