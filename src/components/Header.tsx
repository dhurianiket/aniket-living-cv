import React, { useState } from "react";
import { useAppState, ViewMode } from "../AppStateContext";
import { Briefcase, Rocket, Palette, Sparkles, Activity, MinusCircle, AlertTriangle, X, ShieldAlert, Key } from "lucide-react";
import { cn } from "../utils";
import { getFirebaseConfigStatus } from "../lib/firebase";

export function Header() {
  const { mode, setMode, setScanModalOpen, reduceMotion, setReduceMotion, setCaseStudyOpen } = useAppState();
  const [showWarningDetails, setShowWarningDetails] = useState(false);
  const configStatus = getFirebaseConfigStatus();

  const modes: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: "default", label: "Default", icon: null },
    { id: "recruiter", label: "Recruiter", icon: <Briefcase className="w-4 h-4" /> },
    { id: "founder", label: "Founder", icon: <Rocket className="w-4 h-4" /> },
    { id: "creative", label: "Creative", icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col backdrop-blur-lg bg-brand-black/85 border-b border-white/5">
        {/* Top Warning Banner if missing config */}
        {!configStatus.isConfigured && (
          <div className="bg-gradient-to-r from-brand-amber/10 via-brand-amber/20 to-brand-amber/10 border-b border-brand-amber/15 px-4 sm:px-6 py-2 flex items-center justify-between text-xs font-mono text-brand-amber">
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <span className="relative flex h-2 w-2">
                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-amber opacity-75", reduceMotion && "hidden")}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-amber"></span>
              </span>
              <span className="font-display font-semibold select-none">API KEY WARNING:</span>
              <span className="hidden lg:inline text-gray-300">Firebase environment variables are not fully configured. Some database functions are paused.</span>
              <span className="inline lg:hidden text-gray-300">Keys not configured.</span>
            </div>
            <button 
              onClick={() => setShowWarningDetails(true)} 
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-brand-amber/15 hover:bg-brand-amber/25 text-white font-display text-[11px] font-medium transition-all cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>
        )}

        {/* Main Header Content */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5">
          <div className="font-display font-bold text-white tracking-widest text-xs sm:text-sm uppercase flex items-center gap-2">
            <span className={cn(
              "w-2 h-2 rounded-full shrink-0", 
              configStatus.isConfigured 
                ? "bg-brand-cyan shadow-[0_0_8px_#00f0ff]" 
                : "bg-brand-amber shadow-[0_0_8px_#ffbf00]",
              !reduceMotion && "animate-pulse"
            )} />
            <span>Aniket Dhuri</span>
            {!configStatus.isConfigured && (
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono bg-brand-amber/10 text-brand-amber uppercase tracking-wider border border-brand-amber/20">
                Offline Mode
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("survival-guide");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-mono text-gray-400 hover:text-brand-cyan transition-colors cursor-pointer"
            >
              Survival Guide
            </button>

            <button
              onClick={() => setCaseStudyOpen(true)}
              className="text-xs font-mono text-gray-400 hover:text-brand-violet transition-colors cursor-pointer"
            >
              Aegis Playbook
            </button>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <div className="flex gap-1 p-1 glass-panel rounded-full">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  aria-label={`Switch to ${m.label} mode`}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer",
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
              aria-label={reduceMotion ? "Enable Motion" : "Reduce Motion"}
              className="flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all cursor-pointer"
            >
              {reduceMotion ? <MinusCircle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
            </button>

            {/* Warning shortcut in desktop nav */}
            {!configStatus.isConfigured && (
              <button
                onClick={() => setShowWarningDetails(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-brand-amber/10 text-brand-amber border border-brand-amber/30 hover:bg-brand-amber/20 transition-all cursor-pointer animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Fix Config</span>
              </button>
            )}

            <button
              onClick={() => setScanModalOpen(true)}
              aria-label="Scan Profile"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/20 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Scan Profile
            </button>
          </div>

          {/* Mobile view buttons */}
          <div className="flex md:hidden items-center gap-1 sm:gap-2">
            {/* Warning shortcut on mobile nav if unconfigured */}
            {!configStatus.isConfigured && (
              <button
                onClick={() => setShowWarningDetails(true)}
                aria-label="Missing Keys Alert"
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-amber/10 text-brand-amber border border-brand-amber/30 hover:bg-brand-amber/20 transition-all cursor-pointer animate-pulse mr-1"
              >
                <AlertTriangle className="w-4 h-4 text-brand-amber" />
              </button>
            )}

            <div className="flex gap-1 p-1 glass-panel rounded-full mr-1 sm:mr-2">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  aria-label={`Switch to ${m.label} mode`}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs transition-all duration-300 cursor-pointer",
                    mode === m.id
                      ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                      : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                  )}
                >
                  {m.icon || <div className="w-4 h-4 rounded-full border-2 border-current" />}
                </button>
              ))}
            </div>

            <button
                onClick={() => setReduceMotion(!reduceMotion)}
                aria-label={reduceMotion ? "Enable Motion" : "Reduce Motion"}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-gray-500 hover:bg-white/5 transition-all cursor-pointer"
            >
              {reduceMotion ? <MinusCircle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
            </button>
            <button
                onClick={() => setScanModalOpen(true)}
                aria-label="Scan Profile"
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Developer Config HUD Overlay */}
      {showWarningDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/85 backdrop-blur-md p-4 transition-all">
          <div className="w-full max-w-md glass-panel border border-brand-amber/30 rounded-2xl shadow-[0_20px_50px_rgba(255,191,0,0.15)] bg-gradient-to-b from-[#0c0c1e] to-[#04040a] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-brand-amber/5">
              <div className="flex items-center gap-2 text-brand-amber">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
                <h3 className="font-display font-semibold text-xs sm:text-sm tracking-wider uppercase">System Config Guard</h3>
              </div>
              <button 
                onClick={() => setShowWarningDetails(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-xs text-gray-300 leading-relaxed font-sans mb-4">
                Your sandbox server is operational, but critical Google Firebase environment variable configurations are missing. These must be defined to persist active telemetry and verify contact scans.
              </p>

              <div className="space-y-3 mb-6">
                <div className="text-[10px] uppercase tracking-wider font-mono text-gray-400">Environment Status:</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-gray-400">Source:</span>
                    <span className="text-brand-amber font-semibold">{configStatus.configSource}</span>
                  </div>
                  
                  {configStatus.missingKeys.map((key) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs font-mono p-2.5 rounded-lg bg-brand-amber/5 border border-brand-amber/10 gap-1.5">
                      <span className="text-brand-amber font-medium break-all">{key}</span>
                      <span className="text-[9px] text-[#ff4d4d] bg-[#ff4d4d]/10 px-2 py-0.5 rounded select-none shrink-0 self-start sm:self-center">MISSING (NULL)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Solution Info */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans leading-relaxed text-gray-400 space-y-2">
                <div className="font-mono text-gray-300 text-[10px] uppercase font-semibold">How to resolve:</div>
                <p>
                  1. Fill out your Firebase credentials inside <code className="text-brand-cyan bg-white/5 px-1 rounded">firebase-applet-config.json</code> at the root.
                </p>
                <p>
                  2. Alternatively, declare environment variables in <code className="text-brand-cyan bg-white/5 px-1 rounded">.env.local</code> or set them directly via UI integrations settings.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/5 bg-white/[0.01]">
              <button
                onClick={() => setShowWarningDetails(false)}
                className="px-4 py-2 rounded-xl text-xs font-sans font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                Acknowledge & Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
