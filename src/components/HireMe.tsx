import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Code2, Database, LayoutTemplate, Workflow, Video } from "lucide-react";
import { useAppState } from "../AppStateContext";
import { cn } from "../utils";

export function HireMe() {
  const { mode, reduceMotion } = useAppState();

  const offerings = [
    {
      id: "ai",
      title: "Full-Stack AI Product",
      desc: "End-to-end architecture (React, Node, Firebase) integrated with LLMs like Gemini or OpenAI. Perfect for startups needing a robust MVP.",
      icon: <Code2 className="w-6 h-6 text-brand-cyan" />
    },
    {
      id: "health",
      title: "Health Tech MVP",
      desc: "Secure, structured data pipelines and patient-facing dashboards. Leveraging experience from Aegis Health AI.",
      icon: <Database className="w-6 h-6 text-brand-violet" />
    },
    {
      id: "dashboards",
      title: "Internal Tools & Dashboards",
      desc: "High-performance operational dashboards to visualize data, manage users, and streamline internal processes.",
      icon: <LayoutTemplate className="w-6 h-6 text-brand-green" />
    },
    {
      id: "automation",
      title: "Workflow Automation",
      desc: "Connecting discrete APIs and platforms to remove manual labor. Zapier, Make, and custom node scripts.",
      icon: <Workflow className="w-6 h-6 text-brand-amber" />
    },
    {
      id: "creative",
      title: "Creative & Video Production",
      desc: "Cinematic post-production, motion graphics, and digital marketing strategy to elevate brand presence.",
      icon: <Video className="w-6 h-6 text-white" />
    }
  ];

  const sortedOfferings = [...offerings].sort((a, b) => {
    if (mode === "founder" && (a.id === "ai" || a.id === "health")) return -1;
    if (mode === "recruiter" && (a.id === "dashboards" || a.id === "ai")) return -1;
    if (mode === "creative" && (a.id === "creative" || a.id === "automation")) return -1;
    return 1;
  });

  return (
    <section id="hire" className="relative py-32 px-6 sm:px-12 xl:px-24 z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-brand-cyan/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold tracking-tight mb-4">
            Project <span className="text-gradient-cyan">Intake</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto">
            Ready to build something useful? Select an area where we can collaborate. I work as a technical partner, lead developer, or creative consultant.
          </p>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {sortedOfferings.map((offering, idx) => (
              <motion.div
                key={offering.id}
                layout={!reduceMotion}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: reduceMotion ? 0 : idx * 0.12,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={cn(
                  "glass-panel p-6 rounded-2xl group hover:bg-brand-cyan/5 hover:border-brand-cyan/30 transition-all cursor-pointer flex flex-col h-full",
                  idx === 0 && mode !== "default" ? "border-brand-cyan/50 shadow-[0_0_20px_rgba(0,240,255,0.1)]" : ""
                )}
              >
                <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform">
                  {offering.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white group-hover:text-brand-cyan transition-colors">
                  {offering.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                  {offering.desc}
                </p>
                <div className="flex items-center text-xs font-mono text-brand-cyan uppercase tracking-wider gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <span>Initiate Sequence</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <motion.div
            layout={!reduceMotion}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-center gap-4 hover:bg-white/5 transition-all cursor-pointer"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <h3 className="font-bold text-lg text-white">Something Else?</h3>
            <p className="text-sm text-gray-400">Let's discuss your unique requirements.</p>
            <span className="px-4 py-2 bg-white text-black text-sm font-bold rounded-md hover:bg-gray-200 transition-colors">
              Contact Me
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
