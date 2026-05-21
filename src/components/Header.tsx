import { useAppState, ViewMode } from "../AppStateContext";
import { Briefcase, Rocket, Palette, Sparkles, Activity, MinusCircle } from "lucide-react";
import { cn } from "../utils";

export function Header() {
  const { mode, setMode, setScanModalOpen, reduceMotion, setReduceMotion } = useAppState();

  const modes: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: "default", label: "Default", icon: null },
    { id: "recruiter", label: "Recruiter", icon: <Briefcase className="w-4 h-4" /> },
    { id: "founder", label: "Founder", icon: <Rocket className="w-4 h-4" /> },
    { id: "creative", label: "Creative", icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-brand-black/50 border-b border-white/5">
      <div className="font-display font-bold text-white tracking-widest text-sm uppercase flex items-center gap-2">
        <span className={cn("w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#00f0ff]", !reduceMotion && "animate-pulse")} />
        Aniket Dhuri
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div className="flex gap-1 p-1 glass-panel rounded-full">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300",
                mode === m.id
                  ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              )}
            >
              {m.icon}
              {m.id !== "default" && m.label}
              {m.id === "default" && "Default"}
            </button>
          ))}
        </div>
        
        <div className="w-px h-6 bg-white/10 mx-1" />

        <button
          onClick={() => setReduceMotion(!reduceMotion)}
          title={reduceMotion ? "Enable Motion" : "Reduce Motion"}
          className="flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all"
        >
          {reduceMotion ? <MinusCircle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setScanModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/20 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <Sparkles className="w-4 h-4" />
          Scan Profile
        </button>
      </div>

      {/* Mobile view buttons */}
      <div className="flex md:hidden items-center gap-2">
        <button
            onClick={() => setReduceMotion(!reduceMotion)}
            className="flex items-center justify-center p-2 rounded-full text-gray-500 hover:bg-white/5 transition-all"
        >
          {reduceMotion ? <MinusCircle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
        </button>
        <button
            onClick={() => setScanModalOpen(true)}
            className="flex items-center justify-center p-2 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/20 transition-all"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
