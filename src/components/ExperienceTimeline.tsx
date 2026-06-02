import { motion } from "motion/react";
import { experienceData } from "../data";
import { useAppState } from "../AppStateContext";

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
                        <div title="Google Cloud" className="p-1 rounded bg-white/5 border border-white/10 shrink-0">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-white" fill="currentColor">
                            <title>Google</title>
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                          </svg>
                        </div>
                      )}
                      {exp.icons.includes("aws") && (
                        <div title="Amazon Web Services" className="p-1 rounded bg-white/5 border border-white/10 shrink-0">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-white" fill="currentColor">
                            <title>Amazon Web Services</title>
                            <path d="M11.536 10.37h-.069c-.069-.033-.138-.07-.138-.138V7.994c0-.069.069-.138.138-.138h.069c1.927 0 3.097 1.032 3.097 2.443 0 1.341-.963 2.1-2.96 2.203h-.137v-.034V10.37zm-.172-3.888H9.3v8.815h2.167v-3.82c1.376-.068 2.615-.412 3.51-1.17.962-.756 1.444-1.787 1.444-3.025 0-2.407-1.548-3.404-4.885-3.404v-.033-1.34h-.172v3.978zm4.61 5.397c-.035.103-.069.24-.104.378-.068.172-.103.378-.172.585-.137.378-.276.791-.55 1.135-.654.895-1.548 1.48-2.65 1.825l-.206-.481c1.032-.344 1.788-.86 2.373-1.616.275-.378.448-.757.55-1.102.034-.137.069-.275.103-.412.035-.103.07-.241.103-.344l.826-6.196h2.236l-.378 1.548c.413-.654.929-1.204 1.583-1.548.653-.344 1.376-.516 2.167-.516h.103v2.099h-.103c-1.102 0-1.892.413-2.305 1.204l-1.342 5.402h-2.2zM24 21.055a15.82 15.82 0 0 1-5.16 1.273c-2.477 0-4.644-.55-6.398-1.548-1.754-.997-3.097-2.34-4.095-3.92-1.032-1.618-1.617-3.475-1.788-5.505H3.693c0 2.202.62 4.197 1.789 5.885.584.86 1.307 1.652 2.133 2.34-.138.138-.31.31-.482.447-1.204.996-2.614 1.788-4.162 2.27l-.172.068.723 1.996c2.098-.551 3.99-1.446 5.572-2.753.138-.138.31-.241.448-.378.895.482 1.858.86 2.855 1.102C13.564 22.604 14.837 22.81 16.145 22.81a17.9 17.9 0 0 0 5.813-1.066l2.042-1.996-.05-1.3h.05zM5.38 5.75H13.67V2.583h-8.29v3.167z"/>
                          </svg>
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
