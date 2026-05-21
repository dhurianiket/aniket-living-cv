import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAppState } from "../AppStateContext";

export function BackgroundParticles() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { reduceMotion } = useAppState();

  useEffect(() => {
    // Only run on client
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  // Generate deterministic but random-looking particles
  const particles = Array.from({ length: reduceMotion ? 10 : 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * windowSize.width,
    y: Math.random() * windowSize.height,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * -20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none opacity-30 mix-blend-screen z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-cyan shadow-[0_0_10px_#00f0ff]"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
          }}
          animate={reduceMotion ? { opacity: [0.1, 0.3, 0.1] } : {
            y: [p.y, p.y - 100, p.y + 100, p.y],
            x: [p.x, p.x + 50, p.x - 50, p.x],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-futuristic" />
    </div>
  );
}
