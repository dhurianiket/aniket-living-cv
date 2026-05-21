import { motion, AnimatePresence } from "motion/react";
import { useAppState } from "../AppStateContext";
import { X, ExternalLink, ShieldCheck, Database, LayoutTemplate } from "lucide-react";

export function CaseStudyModal() {
  const { isCaseStudyOpen, setCaseStudyOpen, reduceMotion } = useAppState();

  return (
    <AnimatePresence>
      {isCaseStudyOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCaseStudyOpen(false)}
            className="absolute inset-0 bg-brand-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={reduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto hide-scrollbar glass-panel border-white/10 rounded-2xl shadow-2xl bg-brand-black hide-scrollbar"
          >
            {/* Header Sticky */}
            <div className="sticky top-0 z-10 px-6 sm:px-10 py-6 border-b border-white/10 bg-brand-black/80 backdrop-blur-md flex justify-between items-center">
              <div>
                <span className="font-mono text-xs tracking-widest text-brand-green uppercase bg-brand-green/10 px-2 py-1 rounded inline-block mb-2">
                  CASE STUDY
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Aegis Health AI
                </h2>
              </div>
              <button 
                onClick={() => setCaseStudyOpen(false)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-12">
              
              {/* Image Placeholder */}
              <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-violet/20 border border-white/10 relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors" />
                <div className="relative z-10 text-center space-y-2">
                  <LayoutTemplate className="w-12 h-12 text-brand-cyan mx-auto opacity-80" />
                  <p className="font-mono text-sm text-brand-cyan tracking-widest">DASHBOARD INTERFACE REVEAL</p>
                </div>
              </div>

              {/* Grid 1: Problem / Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-8 rounded-xl border-t-2 border-t-brand-amber">
                  <h3 className="font-display text-xl font-bold mb-4">The Problem</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Medical lab reports are dense, jargon-heavy, and difficult for non-experts to interpret. Patients often receive their blood work or pathology results through portals but have to wait days to speak to a doctor to understand if their results are alarming or normal.
                  </p>
                </div>
                <div className="glass-panel p-8 rounded-xl border-t-2 border-t-brand-green">
                  <h3 className="font-display text-xl font-bold mb-4">The Solution</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    A secure web platform that ingests raw lab data, securely processes it through Google Gemini via structured prompts, and translates the data into an easy-to-read, color-coded health summary that highlights out-of-range metrics and explains them in plain English.
                  </p>
                </div>
              </div>

              {/* Architecture & Stack */}
              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold flex items-center gap-3">
                  <Database className="text-brand-violet" /> Architecture &amp; Stack
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Frontend", value: "React + Vite + Tailwind" },
                    { label: "Backend", value: "Firebase + Node.js" },
                    { label: "AI Brain", value: "Google Gemini API" },
                    { label: "Database", value: "Firestore (NoSQL)" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5">
                      <div className="text-xs font-mono text-gray-500 mb-1">{item.label}</div>
                      <div className="text-sm font-medium text-white">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Challenges */}
              <div className="glass-panel p-8 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 blur-[100px] rounded-full" />
                <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                  <ShieldCheck className="text-brand-cyan" /> Key Challenges Overcome
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex gap-4 items-start">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 shrink-0" />
                    <div>
                      <strong className="text-white block mb-1">Hallucination Mitigation:</strong>
                      <span className="text-gray-400 text-sm">Designed deterministic system prompts and validated outputs against structured JSON schemas to ensure Gemini only extracts data present in the report.</span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 shrink-0" />
                    <div>
                      <strong className="text-white block mb-1">Data Privacy & Security:</strong>
                      <span className="text-gray-400 text-sm">Implemented strict Firebase Security Rules, authenticated routing, and transient data processing where sensitive health data is not retained longer than necessary.</span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 shrink-0" />
                    <div>
                      <strong className="text-white block mb-1">Complex UI State:</strong>
                      <span className="text-gray-400 text-sm">Built a seamless drag-and-drop parsing interface with real-time progress indicators during the multi-step LLM inference process.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Outcome */}
              <div className="text-center py-8">
                <h3 className="font-display text-3xl font-bold mb-4">Outcome</h3>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                  Successfully synthesized MVP architecture and currently in user testing, proving the viability of using general-purpose LLMs within highly constrained, specialized medical formatting workflows.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors">
                  View Live Demo <ExternalLink className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
