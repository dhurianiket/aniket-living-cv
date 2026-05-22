import { motion, useScroll, useTransform } from "motion/react";

const achievements = [
  "🚀 Shipped MVP of Aegis Health AI in testing phase",
  "🧠 Integrated Google Gemini for Clinical Document Parsing",
  "🎥 Pre/post-production for Bhojpuri film 'Matru Devo Bhava'",
  "✉️ Special invite from BeerBiceps via Skillhouse",
  "⚡ Built Scalable React & Firebase Architectures",
  "🎸 Guitar Player & Enthusiastic Chess Player",
];

export function AchievementTicker() {
  const { scrollY } = useScroll();
  
  // Only show ticker after scrolling down 500px
  const opacity = useTransform(scrollY, [300, 500], [0, 1]);
  const y = useTransform(scrollY, [300, 500], [50, 0]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-brand-black/90 backdrop-blur-md border-t border-brand-cyan/20 overflow-hidden py-3 pointer-events-none shadow-[0_-10px_30px_rgba(0,240,255,0.05)]"
    >
      <div className="flex whitespace-nowrap overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-16 px-8 items-center"
        >
          {/* Double the array for seamless loop */}
          {[...achievements, ...achievements].map((text, i) => (
            <span key={i} className="text-sm font-mono text-gray-300 tracking-wide flex items-center gap-4">
              {text}
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_5px_#00f0ff] opacity-50 ml-16" />
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
