import { motion } from "motion/react";
import { useAppState } from "../AppStateContext";
import { certificationsData } from "../data";
import { 
  Megaphone, 
  Code2, 
  Briefcase, 
  Globe, 
  ShieldAlert, 
  PenTool, 
  Film, 
  Award
} from "lucide-react";
import { cn } from "../utils";

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'marketing': return <Megaphone className="w-5 h-5" />;
    case 'code': return <Code2 className="w-5 h-5" />;
    case 'briefcase': return <Briefcase className="w-5 h-5" />;
    case 'web': return <Globe className="w-5 h-5" />;
    case 'shield': return <ShieldAlert className="w-5 h-5" />;
    case 'design': return <PenTool className="w-5 h-5" />;
    case 'video': return <Film className="w-5 h-5" />;
    default: return <Award className="w-5 h-5" />;
  }
};

export function Certifications() {
  const { reduceMotion } = useAppState();

  return (
    <section id="certifications" className="relative py-32 px-6 sm:px-12 xl:px-24 z-10 border-t border-white/5 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl font-bold mb-16 tracking-tight text-center">
          Licenses & <span className="text-gradient-cyan">Certifications</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={reduceMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
              className="relative p-[1px] group rounded-2xl overflow-hidden"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-brand-cyan/20 to-brand-violet/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full bg-brand-black/90 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center text-center border border-white/5 gap-4">
                
                {/* Icon Container with glowing effect */}
                <div className="relative group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-brand-cyan/30 blur-xl rounded-full" />
                  <div className="relative w-14 h-14 rounded-full border border-brand-cyan/30 bg-brand-black flex items-center justify-center text-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                    {getIcon(cert.icon)}
                  </div>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <h3 className="font-bold text-lg leading-tight text-white">{cert.name}</h3>
                  <div className="text-brand-cyan text-sm font-mono">{cert.issuer}</div>
                  
                  <div className="flex items-center justify-center gap-3 text-xs text-brand-gray font-mono">
                    <span className="bg-white/5 px-2 py-1 rounded">{cert.duration}</span>
                    {cert.score && (
                      <span className="bg-brand-violet/10 text-brand-violet px-2 py-1 rounded">Score: {cert.score}</span>
                    )}
                  </div>
                  
                  {cert.details && (
                    <p className="text-gray-400 text-sm mt-3 pt-3 border-t border-white/5 leading-relaxed">
                      {cert.details}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
