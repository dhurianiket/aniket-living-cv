import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppState } from "../AppStateContext";
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Database, 
  LayoutTemplate, 
  Cpu, 
  Terminal, 
  Network, 
  Sliders, 
  ChevronRight, 
  AlertCircle, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  ArrowUpRight, 
  BookOpen, 
  Fingerprint, 
  ListOrdered,
  Play,
  Pause,
  SkipForward
} from "lucide-react";

export function CaseStudyModal() {
  const { isCaseStudyOpen, setCaseStudyOpen, reduceMotion } = useAppState();
  const [activeTab, setActiveTab] = useState<"product" | "playbook">("product");
  const [selectedNode, setSelectedNode] = useState<string>("user");
  const [selectedAgent, setSelectedAgent] = useState<string>("ceo");
  
  // Interactive Simulator State for WSL Terminal Agent Logs
  const [simStep, setSimStep] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([
    "Ready. Click 'Initiate Heartbeat Run' to simulate the autonomous execution loop."
  ]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // PostgreSQL Interactive Lock State
  const [dbLockState, setDbLockState] = useState<"locked" | "cleared">("locked");

  // Simulation steps data
  const simSteps = [
    {
      log: "► curl -s -X POST http://127.0.0.1:3100/api/companies/AEGIS/issues (Content Writer Task)",
      detail: "Creating creative issue via REST API, registering workspace listeners on Paperclip AI Server."
    },
    {
      log: "► SQL UPDATE public.issues SET status = 'blocked' WHERE identifier IN ('AEG-21', 'AEG-22')",
      detail: "Serial Queue lock established! Only active task (AEG-20) remains 'todo', protecting API rate limits."
    },
    {
      log: "► wsl npx paperclipai heartbeat run --agent-id a449f515-f2e2-48b4-811b-ee0f0fd1d226",
      detail: "Hermes CLI boot triggered inside WSL2. Mounting path workspace wrappers and active system directives."
    },
    {
      log: "⚙ loading: context:engine:compressor config... summary mode active.",
      detail: "Evaluating history. Compressing middle conversation turns by 60% with context_compressor.py to prevent TPM hits."
    },
    {
      log: "📡 Connecting to Groq Llama-4-Scout-17b API (131K ctx / 30 RPM)... status: STREAMING_START",
      detail: "Executing task. Directing prompt to rate-isolated model to prevent concurrency clashes."
    },
    {
      log: "✓ File written successfully to ./workspace/drafts/linkedin_post_d1.md (982 tokens output)",
      detail: "Specialist feedback saved! Mark issue as 'done' and unblock local DB check locks."
    },
    {
      log: "⏱ cooldown: Entering 15-second active API rest window... [Remaining lock: done]",
      detail: "Sustaining cooldown timer to completely bleed off current provider token bucket limits."
    },
    {
      log: "► SQL UPDATE public.issues SET status = 'todo' WHERE identifier = 'AEG-21' ✔ Pipeline unblocked",
      detail: "Success! Next specialist in sequence (AEG-21, Video Editor) unlocked cleanly. Loop repeats autonomously."
    }
  ];

  // Drive active simulation loop in React effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating && !isPaused) {
      if (simStep < simSteps.length) {
        timer = setTimeout(() => {
          setSimLogs(prev => [...prev, simSteps[simStep].log, `✔ ${simSteps[simStep].detail}`]);
          setSimStep(prev => prev + 1);
        }, reduceMotion ? 150 : 1500);
      } else {
        setIsSimulating(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isSimulating, isPaused, simStep, reduceMotion]);

  const handleRunSimulation = () => {
    setSimStep(0);
    setSimLogs(["[SYSTEM INIT - AUTO FLOW] Booting Paperclip Agent Orchestrator..."]);
    setIsSimulating(true);
    setIsPaused(false);
  };

  const handlePauseSimulation = () => {
    setIsPaused(true);
  };

  const handleResumeSimulation = () => {
    setIsPaused(false);
  };

  const handleSingleStep = () => {
    if (simStep >= simSteps.length) {
      setSimStep(0);
      setSimLogs(["[SYSTEM INIT - MANUAL STEP MODE] Booting Paperclip Agent Orchestrator..."]);
      setIsSimulating(true);
      setIsPaused(true);
      return;
    }
    if (!isSimulating) {
      setSimStep(0);
      setSimLogs(["[SYSTEM INIT - MANUAL STEP MODE] Booting Paperclip Agent Orchestrator..."]);
      setIsSimulating(true);
      setIsPaused(true);
      // Let's defer current tick or logs
    }
    setSimLogs(prev => [...prev, simSteps[simStep].log, `✔ ${simSteps[simStep].detail}`]);
    setSimStep(prev => prev + 1);
  };

  const architectureNodes: Record<string, { title: string; subtitle: string; desc: string; role: string }> = {
    user: {
      title: "Human Overseer / Board",
      subtitle: "Founder & Human Board Input",
      desc: "Injects strategic company goals, reviews deliverables, and posts raw issues/backlogs via the REST interface.",
      role: "Input Gateway"
    },
    server: {
      title: "Core System (Paperclip AI)",
      subtitle: "Express/Node.js Server (Port 3100)",
      desc: "Manages centralized task queues, tracks registrations, schedules heartbeats, and hosts custom API endpoints.",
      role: "Central Orchestrator"
    },
    db: {
      title: "Postgres Database Layer",
      subtitle: "Transactional State Engine",
      desc: "Captures every run log, issue state, checkout lock and workspace status. Handles concurrency with strict relational locks.",
      role: "System Memory"
    },
    scheduler: {
      title: "Scheduler & WSL Host",
      subtitle: "Chron / Interval Heartbeat Monitor",
      desc: "Periodically ticks (heartbeats), checking database for queued specialist tasks and spawning background Hermes processes.",
      role: "Execution Broker"
    },
    hermes: {
      title: "Hermes CLI Launcher",
      subtitle: "WSL2 Local Agent Adapter Runtime",
      desc: "The container runtime. Spins up local agent sessions, loads contexts, handles workspace isolation, and executes tool calls.",
      role: "Agent Shell Runtime"
    },
    inference: {
      title: "Distributed Free Inference Layer",
      subtitle: "Groq / Cerebras / NIM API Cluster",
      desc: "Decentralized cluster of superfast LLMs (Llama 4, Cerebras, Gemini, DeepSeek). Isolation keeps execution rate safe.",
      role: "Intelligence Hub"
    }
  };

  const agentNetwork: Record<string, { role: string; id: string; model: string; provider: string; details: string; color: string }> = {
    ceo: {
      role: "Chief Executive Officer (CEO)",
      id: "2e0c2cdd-f420-4ff1-bc8f-2b4f4344fe12",
      model: "Llama-4-Scout-17b",
      provider: "Groq",
      details: "Translates high-level founder requests into discrete, modular developer issues. Performs final triage, review, and auto-delegation when specialist works complete.",
      color: "border-brand-cyan text-brand-cyan"
    },
    engineer: {
      role: "Founding Engineer",
      id: "f2a330bd-736f-4b02-a9af-c67e013f460f",
      model: "Llama 3.3 70B",
      provider: "NVIDIA NIM",
      details: "Writes and builds core tools, maintains index configurations, and triggers automated system testing and diagnostic code execution.",
      color: "border-brand-violet text-brand-violet"
    },
    creative: {
      role: "Creative Director",
      id: "540df3a8-2a5f-4c48-9470-004d0b43584f",
      model: "Llama 3.3 70B",
      provider: "NVIDIA NIM",
      details: "Governs systemic visual brand bibles and ensures perfect marketing alignment. Standardizes all messaging scripts and asset templates.",
      color: "border-brand-green text-brand-green"
    },
    writer: {
      role: "Content Writer",
      id: "a449f515-f2e2-48b4-811b-ee0f0fd1d226",
      model: "Llama-4-Scout-17b",
      provider: "Groq",
      details: "Storytelling and core copywriter block. Translates complex, medical lab findings and jargon into patient-facing human stories.",
      color: "border-brand-amber text-brand-amber"
    },
    video: {
      role: "Video Editor",
      id: "942441a9-563f-4b48-96f2-d9cb6fa9f33a",
      model: "Llama-3.3-70b",
      provider: "Cerebras",
      details: "Designs high-retention audio-visual flow concepts, script timings, visual asset prompts, and voiceover pacing instructions.",
      color: "border-purple-400 text-purple-400"
    },
    designer: {
      role: "Graphic Designer",
      id: "4f82fbcf-cb3a-410f-96b3-d607313cbb23",
      model: "Gemini 2.5 Flash",
      provider: "Google AI",
      details: "Develops typographic rules, layout briefs, and structural hierarchy templates. Designs high-fidelity marketing imagery prompts.",
      color: "border-orange-400 text-orange-400"
    }
  };

  return (
    <AnimatePresence>
      {isCaseStudyOpen && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center sm:p-8">
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
            className="relative w-full max-w-5xl h-[90vh] sm:max-h-[90vh] overflow-hidden glass-panel border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl bg-brand-black flex flex-col"
          >
            {/* Header Sticky */}
            <div className="sticky top-0 z-20 px-5 sm:px-10 py-5 sm:py-6 border-b border-white/10 bg-brand-black/90 backdrop-blur-md flex flex-col sm:flex-row justify-between sm:items-center shrink-0 gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-2 py-0.5 rounded inline-block mb-1.5">
                  SYSTEM MANUAL &amp; PLAYBOOK
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  Aegis Health AI <span className="text-gray-500 font-mono text-xs font-normal">v1.2</span>
                </h2>
              </div>
              <div className="flex bg-white/5 p-1 rounded-lg border border-white/5 text-xs font-mono">
                <button
                  onClick={() => setActiveTab("product")}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${activeTab === "product" ? "bg-brand-cyan text-black" : "text-gray-400 hover:text-white"}`}
                >
                  Product Blueprint
                </button>
                <button
                  onClick={() => setActiveTab("playbook")}
                  className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-1.5 ${activeTab === "playbook" ? "bg-brand-violet text-white" : "text-gray-400 hover:text-white"}`}
                >
                  <Cpu className="w-3.5 h-3.5" /> Agent Playbook
                </button>
              </div>
              <button 
                onClick={() => setCaseStudyOpen(false)}
                aria-label="Close Case Study"
                className="absolute right-4 top-4 sm:static p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto hide-scrollbar z-0 relative p-6 sm:p-10 space-y-12">
              
              {activeTab === "product" ? (
                /* PRODUCT OVERVIEW TAB (Original Content) */
                <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  {/* Image / Video Placeholder */}
                  <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-violet/20 border border-white/10 relative overflow-hidden flex items-center justify-center group z-10">
                    <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors pointer-events-none" />
                    <div className="relative z-10 text-center space-y-2 pointer-events-none">
                      <LayoutTemplate className="w-12 h-12 text-brand-cyan mx-auto opacity-80" />
                      <p className="font-mono text-sm text-brand-cyan tracking-widest px-4">DASHBOARD INTERFACE REVEAL</p>
                      <p className="font-mono text-xs text-gray-400 uppercase">Video will play inline on mobile</p>
                    </div>
                  </div>

                  {/* Grid 1: Problem / Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-panel p-8 rounded-xl border-t-2 border-t-brand-amber">
                      <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                        <AlertCircle className="text-brand-amber w-5 h-5" /> The Problem
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        Medical lab reports are dense, jargon-heavy, and difficult for non-experts to interpret. Patients often receive their blood work or pathology results through portals but have to wait days to speak to a doctor to understand if their results are alarming or normal.
                      </p>
                    </div>
                    <div className="glass-panel p-8 rounded-xl border-t-2 border-t-brand-green">
                      <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-brand-green w-5 h-5" /> The Solution
                      </h3>
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
                    <a
                      href="https://aegishealthai.co.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
                    >
                      View Live Project <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* AGENT PLAYBOOK & ARCHITECTURE TAB (New Content) */
                <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  {/* Executive Context */}
                  <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-violet/10 via-transparent to-brand-cyan/5 relative overflow-hidden">
                    <div className="absolute right-0 top-0 text-[10vw] font-bold text-white/5 font-mono select-none pointer-events-none translate-x-10 -translate-y-5">
                      AGENTS
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
                      <BookOpen className="text-brand-violet w-6 h-6" /> Executive System Playbook
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      Welcome to the developer manual mapping the autonomous digital agency cluster powering Aegis Health AI. 
                      Instead of relying on unstable single-prompt pipelines, this layout divides tasks among <strong>role-isolated specialized agents</strong> (managing strategy, coding, visual assets, writing, and editing) communicating sequentially over local db state entirely utilizing free-tier model budgets.
                    </p>
                  </div>

                  {/* Interactive Sequence Architecture Graph */}
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                          <Network className="text-brand-violet w-5 h-5" /> Orchestration Stack Routing
                        </h3>
                        <p className="text-xs font-mono text-gray-500">Click a functional module below to inspect its operational task</p>
                      </div>
                      <span className="font-mono text-[10px] text-brand-cyan border border-brand-cyan/20 px-2 py-0.5 rounded tracking-wider uppercase">
                        State: Synchronized
                      </span>
                    </div>

                    {/* Nodes Visual Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2 relative">
                      {Object.entries(architectureNodes).map(([key, value]) => {
                        const isSelected = selectedNode === key;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedNode(key)}
                            className={`p-4 rounded-xl text-left border transition-all duration-300 relative ${
                              isSelected 
                                ? "bg-brand-violet/10 border-brand-violet shadow-[0_0_15px_rgba(138,43,226,0.3)] scale-[1.03]" 
                                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                            }`}
                          >
                            <span className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-1">
                              {value.role}
                            </span>
                            <span className="font-display font-bold text-sm text-white block">
                              {value.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Node Description Details Card */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedNode}
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                      >
                        <div className="space-y-2">
                          <span className="font-mono text-[10px] text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded inline-block uppercase tracking-wider">
                            Highlighted Element: {architectureNodes[selectedNode].role}
                          </span>
                          <h4 className="font-display text-xl font-bold text-white">
                            {architectureNodes[selectedNode].subtitle}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                            {architectureNodes[selectedNode].desc}
                          </p>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 shrink-0 max-w-[200px]">
                          <span className="font-mono text-xs text-slate-400 text-center leading-normal">
                            WSL System Ingress: Active via Port 3100 Gateway
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Department Grid / Clicking Agent Grid */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        Specialized Agent Network Network
                      </h3>
                      <p className="text-sm font-mono text-gray-400 max-w-xl">
                        To bypass API concurrency ceilings, agents operate on rate-isolated models explicitly tuned for their tasks.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Left list selector */}
                      <div className="md:col-span-1 space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {Object.entries(agentNetwork).map(([key, agent]) => (
                          <button
                            key={key}
                            onClick={() => setSelectedAgent(key)}
                            className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                              selectedAgent === key 
                                ? "bg-white/10 border-white/20 text-white" 
                                : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                            }`}
                          >
                            <span>{agent.role}</span>
                            <span className="text-[10px] text-brand-cyan px-2 py-0.5 bg-brand-cyan/5 rounded uppercase">
                              {agent.provider}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Right Detail Card */}
                      <div className="md:col-span-2 p-6 glass-panel rounded-2xl flex flex-col justify-between border-brand-violet/20">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <span className="font-mono text-[10px] text-gray-500 uppercase">ACTIVE PERSONA</span>
                              <h4 className="font-display text-xl font-bold text-white leading-tight">
                                {agentNetwork[selectedAgent].role}
                              </h4>
                            </div>
                            <span className={`text-[10px] font-mono px-3 py-1 rounded bg-black/40 border shrink-0 ${agentNetwork[selectedAgent].color}`}>
                              Agent v1.1
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 py-1.5 font-mono text-xs">
                            <div className="p-3 bg-black/40 rounded-lg">
                              <span className="text-gray-500 block text-[9px] uppercase">RATED MODEL</span>
                              <span className="text-white font-medium">{agentNetwork[selectedAgent].model}</span>
                            </div>
                            <div className="p-3 bg-black/40 rounded-lg">
                              <span className="text-gray-500 block text-[9px] uppercase">PROVIDER NODE</span>
                              <span className="text-brand-cyan font-medium uppercase">{agentNetwork[selectedAgent].provider}</span>
                            </div>
                          </div>

                          <p className="text-gray-300 text-sm leading-relaxed">
                            {agentNetwork[selectedAgent].details}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                          <span>MOCK DESCRIPTOR ID: {agentNetwork[selectedAgent].id}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Defensive Battles Block */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        Defensive Engineering Architectures
                      </h3>
                      <p className="text-sm font-mono text-gray-400">
                        Bulletproof code patterns constructed to bypass concurrency barriers and token limits.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-cyan">
                        <span className="text-brand-cyan font-mono text-xs font-bold block mb-1">01 / QUEUING</span>
                        <h4 className="font-display text-lg font-bold text-white mb-2">Serial Queue Envelopes</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          Free endpoints break under simultaneous loads with 429s. We locked execution with <code>serialize_execution.js</code>, setting only one specialist task class to <code>todo</code> and remaining to <code>blocked</code> with an automatic 30s rate cool-down.
                        </p>
                      </div>

                      <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500">
                        <span className="text-purple-400 font-mono text-xs font-bold block mb-1">02 / MODEL ROUTING</span>
                        <h4 className="font-display text-lg font-bold text-white mb-2">Llama 3.3 Failover Router</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          Cerebras deprecated model configs on May 27, 2026. We patched active configs dynamically to fallback to high-capacity active <code>llama-3.3-70b</code>, mapping YAML variables directly.
                        </p>
                      </div>

                      <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-green">
                        <span className="text-brand-green font-mono text-xs font-bold block mb-1">03 / COMPRESSION</span>
                        <h4 className="font-display text-lg font-bold text-white mb-2">Context Window Compaction</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          Conversational loops bloat input payload files. We verified <code>context: engine: compressor</code> in code config, calling compression helpers to shrink middle-turn token size by up to 60%.
                        </p>
                      </div>
                    </div>

                    {/* PostgreSQL Database Lock Schema Visualizer */}
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-cyan/20 bg-brand-black/90 space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
                        <div>
                          <span className="font-mono text-[10px] text-brand-cyan uppercase bg-brand-cyan/15 px-2.5 py-0.5 rounded tracking-widest">
                            INTERACTIVE TRANSACTION CONTROL
                          </span>
                          <h4 className="font-display text-lg font-bold text-white mt-1">
                            PostgreSQL Advisory Lock Simulator (pg_try_advisory_lock)
                          </h4>
                          <p className="text-xs text-gray-400">
                            Observe record lock status fields transition in real-time to shield multi-agent pipelines.
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono text-gray-400">Active Register ID:</span>
                          <code className="text-xs font-mono text-brand-cyan bg-white/5 px-2 py-1 rounded">0x7f90ef78</code>
                        </div>
                      </div>

                      {/* Schema Fields and State Displays */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                        {[
                          { field: "task_identifier", val: "AEG-21", type: "varchar(10)", desc: "Selected work ID in progress" },
                          { field: "concurrency_token", val: "aegis_hb_active_88x", type: "varchar(64)", desc: "Central monitoring hash" },
                          { 
                            field: "execution_locked_at", 
                            val: dbLockState === "locked" ? "2026-05-29T18:43:54Z" : "NULL", 
                            type: "timestamp", 
                            desc: dbLockState === "locked" ? "Blocked from secondary updates" : "Free to acquire",
                            highlight: dbLockState === "locked"
                          },
                          { 
                            field: "lock_status", 
                            val: dbLockState === "locked" ? "DB_EXCLUSIVE_LOCK_ACTIVE" : "RELEASED_STANDBY", 
                            type: "enum_locking", 
                            desc: "Central lock state flag",
                            state: dbLockState
                          }
                        ].map((col, index) => (
                          <div key={index} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden">
                            {col.highlight && (
                              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-xl rounded-full" />
                            )}
                            <div>
                              <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                <span>{col.field}</span>
                                <span>{col.type}</span>
                              </div>
                              <div className={`text-xs sm:text-sm font-bold truncate ${
                                col.state === "locked" ? "text-red-400" :
                                col.state === "cleared" ? "text-brand-green" :
                                col.highlight ? "text-red-400" : "text-white"
                              }`}>
                                {col.val}
                              </div>
                            </div>
                            <span className="text-[10px] text-gray-400 leading-normal">{col.desc}</span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Visual Graph representation */}
                      <div className="p-5 bg-black/40 rounded-xl border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg shrink-0 ${
                            dbLockState === "locked" 
                              ? "bg-red-500/10 border-red-500/50 text-red-400 animate-pulse" 
                              : "bg-brand-green/10 border-brand-green/50 text-brand-green"
                          }`}>
                            <Database className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-mono text-gray-300 font-bold">
                              Current Transaction Mode: {dbLockState === "locked" ? "MUTEX LOCK ACTIVE" : "LOCK CLEARED - DISPATCH READY"}
                            </div>
                            <p className="text-[11px] text-gray-400 max-w-xl">
                              {dbLockState === "locked" 
                                ? "Advisory lockout is operational. If other specialists boot up simultaneously, they will find this lock active and idle voluntarily to completely safeguard daily credit quotas on Groq." 
                                : "No locking bounds. Specialist agent loops can safely secure the next workflow task and set locks before launching active inference."
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => setDbLockState("locked")}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                              dbLockState === "locked" 
                                ? "bg-red-500/15 border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]" 
                                : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                            }`}
                          >
                            Acquire Row Lock
                          </button>
                          <button
                            onClick={() => setDbLockState("cleared")}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                              dbLockState === "cleared" 
                                ? "bg-brand-green/15 border-brand-green/50 text-brand-green shadow-[0_0_10px_rgba(0,255,102,0.2)]" 
                                : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                            }`}
                          >
                            Release Row Lock
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Simulator Terminal */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                        <Terminal className="text-brand-violet w-5 h-5" /> Orchestrator Heartbeat Simulator
                      </h3>
                      <p className="text-sm font-mono text-gray-400">
                        Observe a live terminal run. Pause the execution flow or use manual discrete ticks to inspect agent states step-by-step.
                      </p>
                    </div>

                    <div className="glass-panel rounded-2xl border-white/10 overflow-hidden flex flex-col font-mono text-xs bg-[#030308]">
                      {/* Terminal Header */}
                      <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          <span className="text-gray-400 ml-2 font-mono text-[10px]">ubuntu_wsl2: ~/paperclip-platform</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-[10px]">Active Node: Cerebras+Groq cluster</span>
                          {isSimulating && (
                            <span className="flex items-center gap-1.5 text-[9px] uppercase px-2 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                              <span className={`w-1 h-1 rounded-full bg-brand-cyan ${isPaused ? "" : "animate-ping"}`} />
                              {isPaused ? "Paused" : "Simulating"}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Terminal View area */}
                      <div className="p-6 h-[260px] overflow-y-auto space-y-2 select-text text-gray-300 scrollbar-thin scrollbar-thumb-white/5 text-[11px] leading-[1.5]">
                        {simLogs.map((log, index) => {
                          const isCommand = log.startsWith("►");
                          const isSystem = log.startsWith("[SYSTEM");
                          const isSuccess = log.startsWith("✓") || log.startsWith("✔");
                          return (
                            <p key={index} className={
                              isCommand ? "text-brand-cyan font-bold" :
                              isSystem ? "text-brand-violet font-bold" :
                              isSuccess ? "text-brand-green pl-4" :
                              "text-gray-400 pl-4"
                            }>
                              {log}
                            </p>
                          );
                        })}
                      </div>

                      {/* Interactive Triggers */}
                      <div className="p-4 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-2 text-[10px] text-gray-500">
                          <span>Progress: {simStep} / {simSteps.length} Steps</span>
                          <span>|</span>
                          <span>Auto-locks: Enforced</span>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => {
                              setSimStep(0);
                              setIsSimulating(false);
                              setIsPaused(false);
                              setSimLogs(["[SYSTEM LOGS FLUSHED] Waiting for activation. Initiate run or tick manual."]);
                            }}
                            className="flex-1 sm:flex-initial px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors border border-white/5 text-xs font-mono cursor-pointer"
                          >
                            Reset
                          </button>

                          {isSimulating ? (
                            isPaused ? (
                              <button
                                onClick={handleResumeSimulation}
                                className="flex-1 sm:flex-initial px-4 py-1.5 bg-brand-green/25 text-brand-green border border-brand-green/30 hover:bg-brand-green/30 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5" /> Resume
                              </button>
                            ) : (
                              <button
                                onClick={handlePauseSimulation}
                                className="flex-1 sm:flex-initial px-4 py-1.5 bg-brand-amber/20 text-brand-amber border border-brand-amber/30 hover:bg-brand-amber/35 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <Pause className="w-3.5 h-3.5" /> Pause
                              </button>
                            )
                          ) : (
                            <button
                              onClick={handleRunSimulation}
                              className="flex-1 sm:flex-initial px-4 py-1.5 bg-brand-violet hover:bg-brand-violet/85 text-white rounded-lg text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(138,43,226,0.3)]"
                            >
                              <Play className="w-3.5 h-3.5" /> Initiate Auto Run
                            </button>
                          )}

                          <button
                            onClick={handleSingleStep}
                            className="flex-1 sm:flex-initial px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-brand-cyan rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <SkipForward className="w-3.5 h-3.5" /> Manual Tick ›
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Notes / Alert Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono text-[11px]">
                    <div className="p-4 rounded-xl bg-cyan-950/20 border border-brand-cyan/20 text-brand-cyan/80">
                      <strong className="block mb-1 text-brand-cyan">📋 PLATFORM INSTRUCTIONS LOCK:</strong>
                      Ensure coordinator scripts continually watch the assignee_agent_id column in Postgres. If an LLM run triggers an auto-escalation, rewrite blocks to immediately redirect specialist IDs.
                    </div>
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-brand-violet/20 text-purple-300">
                      <strong className="block mb-1 text-brand-violet">⚙ ACTIVE CONCURRENCY SEMAPHORE:</strong>
                      In developmental loops, we enforce persistSession: false. Disabling local recovery saves database overhead, allowing failed requests to boot fresh in under 1 second rather than trying to recover.
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

