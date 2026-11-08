import { motion } from "motion/react";
import { useEffect, useState, useMemo } from "react";
import { useAppState } from "../AppStateContext";

export function BackgroundParticles() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { reduceMotion } = useAppState();

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const particles = useMemo(() => {
    if (windowSize.width === 0) return [];
    const count = reduceMotion ? 6 : 16;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: ((i * 137.5) % 100),
      y: ((i * 73.1) % 100),
      size: (i % 3) + 1.5,
      duration: 14 + (i % 8) * 2,
      delay: -(i * 1.3),
    }));
  }, [windowSize.width > 0, reduceMotion]);

  if (windowSize.width === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none opacity-25 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-cyan will-change-transform"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={
            reduceMotion
              ? { opacity: 0.2 }
              : {
                  y: [0, -40, 0],
                  opacity: [0.15, 0.45, 0.15],
                }
          }
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
