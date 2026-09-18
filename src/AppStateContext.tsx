import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type ViewMode = "default" | "recruiter" | "founder" | "creative";
export type CaseStudyTopic = "aegis" | "deoyani";

interface AppStateContextType {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  isScanModalOpen: boolean;
  setScanModalOpen: (open: boolean) => void;
  isCaseStudyOpen: boolean;
  setCaseStudyOpen: (open: boolean) => void;
  caseStudyTopic: CaseStudyTopic;
  setCaseStudyTopic: (topic: CaseStudyTopic) => void;
  isMiniBrainOpen: boolean;
  setMiniBrainOpen: (open: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (reduce: boolean) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("default");
  const [isScanModalOpen, setScanModalOpen] = useState(false);
  const [isCaseStudyOpen, setCaseStudyOpen] = useState(false);
  const [caseStudyTopic, setCaseStudyTopic] = useState<CaseStudyTopic>("deoyani");
  const [isMiniBrainOpen, setMiniBrainOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        mode,
        setMode,
        isScanModalOpen,
        setScanModalOpen,
        isCaseStudyOpen,
        setCaseStudyOpen,
        caseStudyTopic,
        setCaseStudyTopic,
        isMiniBrainOpen,
        setMiniBrainOpen,
        reduceMotion,
        setReduceMotion,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
}

