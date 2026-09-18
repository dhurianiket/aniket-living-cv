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
  AlertCircle, 
  CheckCircle2, 
  BookOpen, 
  Play, 
  Pause, 
  SkipForward,
  Lock,
  Tv,
  Film
} from "lucide-react";

export function CaseStudyModal() {
  const { isCaseStudyOpen, setCaseStudyOpen, caseStudyTopic, setCaseStudyTopic, reduceMotion } = useAppState();
  const [activeTab, setActiveTab] = useState<"product" | "playbook">("product");
  const [selectedNode, setSelectedNode] = useState<string>("cdn");
  const [selectedAgent, setSelectedAgent] = useState<string>("ceo");
  
  // Interactive Simulator State
  const [simStep, setSimStep] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([
    "Ready. Click 'Initiate Auto Run' or 'Manual Tick' to simulate the pipeline."
  ]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Aegis Simulation steps data
  const aegisSimSteps = [
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

  // Deoyani OTT Simulation steps data
  const deoyaniSimSteps = [
    {
      log: "► POST /api/rentals/checkout { movieId: 'bindhast-1999', plan: 'tvod_25_72h' }",
      detail: "Initiating Razorpay UPI order creation. Minting transaction reference TKT_BDH_88219."
    },
    {
      log: "► WEBHOOK razorpay.payment.captured [HMAC-SHA256: 7f3a9e4b...verified]",
      detail: "Webhook received with raw body signature verification. Idempotent license written to Firestore."
    },
    {
      log: "► GET /api/video/token?videoId=bindhast-1999 (TTL: 600s, Library: 747391)",
      detail: "Minted ephemeral HMAC-SHA256 playback token. Locked to stream.deoyanimovies.com referrer."
    },
    {
      log: "📡 Shaka Player fetching HLS manifest from Bunny Stream CDN (Pull Zone 6505702)...",
      detail: "MediaCage cbcs DRM verified. Audio tracks initialized: Marathi (mr-IN 5.1), Subtitles: WebVTT."
    },
    {
      log: "► POST /api/session/heartbeat { session: 'sess_desk_01', device: 'macOS/Chrome', activeStreams: 1 }",
      detail: "Concurrency Slot 1/2 acquired in Redis/Firestore. Sliding heartbeat expiry set to +30s."
    },
    {
      log: "► [Device 2] POST /api/session/heartbeat { session: 'sess_mob_02', device: 'Android/Capacitor', activeStreams: 2 }",
      detail: "Concurrency Slot 2/2 acquired. Hardware FLAG_SECURE initialized against screen capture."
    },
    {
      log: "⚠ [Device 3 Attempt] POST /api/session/heartbeat -> HTTP 409 CONCURRENCY_CEILING_REACHED",
      detail: "Hard limit of 2 simultaneous devices enforced! Playback blocked on 3rd device with graceful prompt."
    },
    {
      log: "⏱ [Device 1 Backgrounded] VisibilityChange: hidden -> Heartbeat halted, slot 1 released",
      detail: "Concurrency slot freed cleanly. Device 3 receives instant push unblock notification. Stream resumed."
    }
  ];

  const currentSimSteps = caseStudyTopic === "deoyani" ? deoyaniSimSteps : aegisSimSteps;

  // Drive active simulation loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating && !isPaused) {
      if (simStep < currentSimSteps.length) {
        timer = setTimeout(() => {
          setSimLogs(prev => [...prev, currentSimSteps[simStep].log, `✔ ${currentSimSteps[simStep].detail}`]);
          setSimStep(prev => prev + 1);
        }, reduceMotion ? 150 : 1500);
      } else {
        setIsSimulating(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isSimulating, isPaused, simStep, reduceMotion, currentSimSteps]);

  // Reset simulator when topic changes
  useEffect(() => {
    setSimStep(0);
    setIsSimulating(false);
    setIsPaused(false);
    setSimLogs([
      caseStudyTopic === "deoyani"
        ? "Ready. Click 'Initiate Auto Run' to simulate the Bunny CDN & DRM concurrency loop."
        : "Ready. Click 'Initiate Auto Run' to simulate the autonomous agent execution loop."
    ]);
    setSelectedNode(caseStudyTopic === "deoyani" ? "cdn" : "user");
  }, [caseStudyTopic]);

  const handleRunSimulation = () => {
    setSimStep(0);
    setSimLogs([
      caseStudyTopic === "deoyani"
        ? "[STREAM SYSTEM INIT] Booting Bunny Stream CDN & DRM Concurrency Orchestrator..."
        : "[SYSTEM INIT - AUTO FLOW] Booting Paperclip Agent Orchestrator..."
    ]);
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
    if (simStep >= currentSimSteps.length) {
      setSimStep(0);
      setSimLogs([
        caseStudyTopic === "deoyani"
          ? "[STREAM SYSTEM INIT - MANUAL TICK] Booting DRM Concurrency Orchestrator..."
          : "[SYSTEM INIT - MANUAL STEP MODE] Booting Paperclip Agent Orchestrator..."
      ]);
      setIsSimulating(true);
      setIsPaused(true);
      return;
    }
    if (!isSimulating) {
      setSimStep(0);
      setSimLogs([
        caseStudyTopic === "deoyani"
          ? "[STREAM SYSTEM INIT - MANUAL TICK] Booting DRM Concurrency Orchestrator..."
          : "[SYSTEM INIT - MANUAL STEP MODE] Booting Paperclip Agent Orchestrator..."
      ]);
      setIsSimulating(true);
      setIsPaused(true);
    }
    setSimLogs(prev => [...prev, currentSimSteps[simStep].log, `✔ ${currentSimSteps[simStep].detail}`]);
    setSimStep(prev => prev + 1);
  };

  // Aegis Architecture Nodes
  const aegisNodes: Record<string, { title: string; subtitle: string; desc: string; role: string }> = {
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

  // Deoyani OTT Architecture Nodes
  const deoyaniNodes: Record<string, { title: string; subtitle: string; desc: string; role: string }> = {
    cdn: {
      title: "Bunny Stream CDN",
      subtitle: "Pull Zone 6505702 & Library 747391",
      desc: "Global high-throughput video delivery mapped to stream.deoyanimovies.com with fallback to vz-c7921f22-801.b-cdn.net.",
      role: "Video Delivery"
    },
    signer: {
      title: "Ephemeral HMAC Signer",
      subtitle: "Zero-Trust Tokens (10m TTL)",
      desc: "Dynamically mints short-lived HMAC-SHA256 playback URLs bound to user IP and referrer domains to eliminate video link scraping.",
      role: "Playback Auth"
    },
    drm: {
      title: "Shaka Multi-DRM Engine",
      subtitle: "Widevine L1/L3 & FairPlay (AES-128 cbcs)",
      desc: "Hardware-level content encryption with MediaCage ClearKey, protecting high-value banner films from rips and screen recorders.",
      role: "Anti-Piracy"
    },
    payments: {
      title: "Razorpay TVOD Gateway",
      subtitle: "₹25/72hr TVOD & VIP Passes",
      desc: "Processes instantaneous UPI & card rentals with HMAC-SHA256 raw webhook signature verification and Cloud Firestore idempotent reconciliation.",
      role: "Monetization"
    },
    heartbeat: {
      title: "Concurrency Mutex Engine",
      subtitle: "30s Sliding-Window Heartbeat",
      desc: "Tracks active stream heartbeats across sessions, enforcing a strict 2-device ceiling per ticket with app-switcher auto-blanking.",
      role: "Session Control"
    },
    ai: {
      title: "Gemini 3.6 Flash Concierge",
      subtitle: "Google Cloud Agent Platform",
      desc: "Multilingual AI conversational concierge (Marathi, Hindi, English) providing studio trivia, recommendations, and semantic search.",
      role: "AI Intelligence"
    }
  };

  const architectureNodes = caseStudyTopic === "deoyani" ? deoyaniNodes : aegisNodes;

  // Aegis Agent Network
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
            <div className="sticky top-0 z-20 px-5 sm:px-10 py-5 sm:py-6 border-b border-white/10 bg-brand-black/95 backdrop-blur-md flex flex-col sm:flex-row justify-between sm:items-center shrink-0 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-2 py-0.5 rounded inline-block">
                    SYSTEM ARCHITECTURE MANUAL
                  </span>
                  {/* System Topic Switcher */}
                  <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded border border-white/5 text-[10px] font-mono">
                    <button
                      onClick={() => setCaseStudyTopic("deoyani")}
                      className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${caseStudyTopic === "deoyani" ? "bg-brand-cyan text-black font-bold" : "text-gray-400 hover:text-white"}`}
                    >
                      Deoyani OTT
                    </button>
                    <button
                      onClick={() => setCaseStudyTopic("aegis")}
                      className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${caseStudyTopic === "aegis" ? "bg-brand-violet text-white font-bold" : "text-gray-400 hover:text-white"}`}
                    >
                      Aegis AI
                    </button>
                  </div>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  {caseStudyTopic === "deoyani" ? (
                    <>
                      Deoyani Movies OTT <span className="text-[#D4AF37] font-mono text-xs font-normal">v2.4 Live</span>
                    </>
                  ) : (
                    <>
                      Aegis Health AI <span className="text-gray-500 font-mono text-xs font-normal">v1.2</span>
                    </>
                  )}
                </h2>
              </div>

              <div className="flex bg-white/5 p-1 rounded-lg border border-white/5 text-xs font-mono">
                <button
                  onClick={() => setActiveTab("product")}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${activeTab === "product" ? "bg-brand-cyan text-black" : "text-gray-400 hover:text-white"}`}
                >
                  {caseStudyTopic === "deoyani" ? "Streaming Blueprint" : "Product Blueprint"}
                </button>
                <button
                  onClick={() => setActiveTab("playbook")}
                  className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-1.5 ${activeTab === "playbook" ? "bg-brand-violet text-white" : "text-gray-400 hover:text-white"}`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  {caseStudyTopic === "deoyani" ? "DRM & Concurrency Playbook" : "Agent Playbook"}
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
              
              {/* ============================================================ */}
              {/* DEOYANI MOVIES OTT: TAB 1 - STREAMING BLUEPRINT */}
              {/* ============================================================ */}
              {caseStudyTopic === "deoyani" && activeTab === "product" && (
                <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  {/* Hero Theatrical Showcase */}
                  <div className="w-full rounded-2xl bg-gradient-to-br from-[#130a10] via-brand-black to-[#08070b] border border-[#D4AF37]/20 p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-[0_0_50px_rgba(212,175,55,0.08)]">
                    <div className="space-y-4 max-w-2xl relative z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/25 font-bold">
                          PRODUCTION BANNER OTT
                        </span>
                        <span className="text-gray-400 font-mono text-xs">deoyanimovies.com</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                        Enterprise Web &amp; Mobile <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-rose-400">OTT Streaming Player</span>
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-sans">
                        Architected and deployed the official streaming portal for <strong>Deoyani Movies Pvt Ltd</strong> (Managing Director: Matchindra Chate). Designed to monetize legendary Marathi cinema classics (*Bindhast*, *Chimani Pakhar*) alongside 2025 releases (*Matru Devo Bhavah*) with zero-piracy DRM and direct-to-consumer TVOD billing.
                      </p>
                    </div>

                    <div className="p-6 bg-black/60 rounded-xl border border-[#D4AF37]/30 text-center shrink-0 min-w-[220px] relative z-10">
                      <span className="text-gray-400 block tracking-widest uppercase text-[10px] font-mono">TVOD TICKET RATE</span>
                      <div className="text-3xl font-display font-extrabold text-[#D4AF37] mt-1">₹25</div>
                      <span className="text-gray-400 block text-[10px] font-mono mt-0.5">72-Hour Cinema Access</span>
                      <a
                        href="https://deoyanimovies.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black font-semibold rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-all hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                      >
                        Launch Portal <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Problem / Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-panel p-8 rounded-xl border-t-2 border-t-red-500">
                      <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                        <AlertCircle className="text-red-400 w-5 h-5" /> The Aggregator Dilemma
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        Traditional film production houses lose 50–70% of box office revenues to third-party streaming aggregators. Unprotected MP4 embeds lead to rapid video piracy, and lack of direct payment infrastructure prevents independent filmmakers from capturing audience value.
                      </p>
                    </div>
                    <div className="glass-panel p-8 rounded-xl border-t-2 border-t-[#D4AF37]">
                      <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-[#D4AF37] w-5 h-5" /> Direct Theatrical TVOD
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        Engineered a direct-to-consumer OTT streaming platform with Bunny Stream encrypted CDN delivery, live Razorpay TVOD monetization, zero-trust expiring HMAC tokens, and Widevine/FairPlay cbcs CENC DRM—capturing 100% of ticket sales directly with sub-second video start times.
                      </p>
                    </div>
                  </div>

                  {/* Architecture & Stack */}
                  <div className="space-y-6">
                    <h3 className="font-display text-2xl font-bold flex items-center gap-3">
                      <Database className="text-[#D4AF37]" /> Core Technical Stack
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: "Frontend Web", value: "React 19 + Vite + CSS" },
                        { label: "Video Delivery", value: "Bunny Stream CDN (Pull 6505702)" },
                        { label: "DRM Security", value: "Widevine L1/L3 & FairPlay" },
                        { label: "Monetization", value: "Razorpay TVOD + Webhook HMAC" },
                        { label: "Database", value: "Cloud Firestore (Idempotent)" },
                        { label: "AI Concierge", value: "Google Gemini 3.6 Flash" },
                        { label: "Mobile Native", value: "Capacitor (FLAG_SECURE)" },
                        { label: "Hosting / SSL", value: "Firebase Hosting + Cloudflare" },
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5">
                          <div className="text-xs font-mono text-gray-500 mb-1">{item.label}</div>
                          <div className="text-sm font-medium text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Challenges Overcome */}
                  <div className="glass-panel p-8 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full" />
                    <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                      <ShieldCheck className="text-[#D4AF37]" /> Key Engineering Battles Won
                    </h3>
                    <ul className="space-y-4 relative z-10">
                      <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 shrink-0 shadow-[0_0_8px_#D4AF37]" />
                        <div>
                          <strong className="text-white block mb-1">Zero-Trust Ephemeral HMAC Playback (Anti-Piracy):</strong>
                          <span className="text-gray-400 text-sm">Direct HLS URLs are never exposed. Ephemeral HMAC-SHA256 playback tokens with 10-minute TTLs are minted on-demand, locking streams strictly to <code>stream.deoyanimovies.com</code> and invalidating rip scripts.</span>
                        </div>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 shrink-0 shadow-[0_0_8px_#D4AF37]" />
                        <div>
                          <strong className="text-white block mb-1">30s Sliding-Window Concurrency Heartbeat:</strong>
                          <span className="text-gray-400 text-sm">Hard-limited active sessions to 2 concurrent devices per ticket. Clients dispatch 30s heartbeats; any 3rd simultaneous stream is instantly blocked, and mobile app-switchers trigger automatic privacy blanking.</span>
                        </div>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 shrink-0 shadow-[0_0_8px_#D4AF37]" />
                        <div>
                          <strong className="text-white block mb-1">Mobile-First Cellular Data-Saver Engine:</strong>
                          <span className="text-gray-400 text-sm">Engineered Indian Cellular Data-Saver Mode capping streams at 480p (~220 MB/hr) with a 1.5s fast-startup buffer, double-tap seek (±10s) with haptic feedback, and pinch-to-fill 16:9/cover aspect ratio toggles.</span>
                        </div>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 shrink-0 shadow-[0_0_8px_#D4AF37]" />
                        <div>
                          <strong className="text-white block mb-1">Multilingual Studio AI Concierge (Gemini 3.6 Flash):</strong>
                          <span className="text-gray-400 text-sm">Integrated Google Cloud Agent Platform / Gemini 3.6 Flash conversational concierge responding in Marathi, Hindi, and English to answer studio trivia, film background, and deliver semantic catalog search.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div className="text-center py-8">
                    <h3 className="font-display text-3xl font-bold mb-4">Live Platform Status</h3>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-sm">
                      Production live at <strong>deoyanimovies.com</strong> with multi-film catalog streaming, active Razorpay payment webhooks, and multi-device playback authorization.
                    </p>
                    <a
                      href="https://deoyanimovies.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-md hover:bg-amber-400 transition-colors font-mono text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    >
                      Visit Deoyani Movies OTT <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}

              {/* ============================================================ */}
              {/* DEOYANI MOVIES OTT: TAB 2 - DRM & CONCURRENCY PLAYBOOK */}
              {/* ============================================================ */}
              {caseStudyTopic === "deoyani" && activeTab === "playbook" && (
                <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-brand-cyan/5 relative overflow-hidden">
                    <div className="absolute right-0 top-0 text-[10vw] font-bold text-white/5 font-mono select-none pointer-events-none translate-x-10 -translate-y-5">
                      DRM
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
                      <Lock className="text-[#D4AF37] w-6 h-6" /> Zero-Trust DRM &amp; Concurrency Engine
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      How Deoyani Movies OTT shields theatrical films against ripping and credential sharing. Using <strong>ephemeral HMAC token minting</strong>, <strong>Shaka Multi-DRM cbcs CENC</strong>, and <strong>30-second sliding-window session heartbeats</strong>, the platform ensures that only paid, authenticated viewers can stream content.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                          <Network className="text-[#D4AF37] w-5 h-5" /> Video Pipeline Topology
                        </h3>
                        <p className="text-xs font-mono text-gray-500">Click a node below to inspect its operational task in the streaming lifecycle</p>
                      </div>
                      <span className="font-mono text-[10px] text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded tracking-wider uppercase">
                        State: Protected
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2 relative">
                      {Object.entries(deoyaniNodes).map(([key, value]) => {
                        const isSelected = selectedNode === key;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedNode(key)}
                            className={`p-4 rounded-xl text-left border transition-all duration-300 relative ${
                              isSelected 
                                ? "bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-[1.03]" 
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
                          <span className="font-mono text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded inline-block uppercase tracking-wider">
                            Selected Node: {deoyaniNodes[selectedNode]?.role || selectedNode}
                          </span>
                          <h4 className="font-display text-xl font-bold text-white">
                            {deoyaniNodes[selectedNode]?.subtitle}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                            {deoyaniNodes[selectedNode]?.desc}
                          </p>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 shrink-0 max-w-[200px]">
                          <span className="font-mono text-xs text-amber-200/70 text-center leading-normal">
                            CDN Ingress: stream.deoyanimovies.com
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#D4AF37]">
                      <span className="text-[#D4AF37] font-mono text-xs font-bold block mb-1">01 / EPHEMERAL TOKENS</span>
                      <h4 className="font-display text-lg font-bold text-white mb-2">HMAC-SHA256 Signed URLs</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Every video session generates an expiring signature with a 10-minute TTL. Streams are strictly tied to customer IP and referrer domain, invalidating rip tools.
                      </p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-cyan">
                      <span className="text-brand-cyan font-mono text-xs font-bold block mb-1">02 / CONCURRENCY</span>
                      <h4 className="font-display text-lg font-bold text-white mb-2">30s Sliding Mutex Heartbeat</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Clients heartbeat every 30 seconds. A hard limit of 2 devices per ticket is strictly enforced in Cloud Firestore. If a 3rd device connects, it is instantly locked out.
                      </p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-400">
                      <span className="text-purple-400 font-mono text-xs font-bold block mb-1">03 / HARDWARE DRM</span>
                      <h4 className="font-display text-lg font-bold text-white mb-2">Widevine &amp; FLAG_SECURE</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        In web browsers, Shaka Player negotiates cbcs CENC ClearKey licenses. In native mobile apps (Capacitor), Android FLAG_SECURE prevents screen recording.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                        <Terminal className="text-[#D4AF37] w-5 h-5" /> DRM &amp; Concurrency Heartbeat Simulator
                      </h3>
                      <p className="text-sm font-mono text-gray-400">
                        Observe the live stream authentication, token minting, and 2-device concurrency locking flow.
                      </p>
                    </div>

                    <div className="glass-panel rounded-2xl border-white/10 overflow-hidden flex flex-col font-mono text-xs bg-[#030308]">
                      <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          <span className="text-gray-400 ml-2 font-mono text-[10px]">stream-auth-node: ~/deoyani-ott-gateway</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-[10px]">Zone: Bunny 6505702</span>
                          {isSimulating && (
                            <span className="flex items-center gap-1.5 text-[9px] uppercase px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                              <span className={`w-1 h-1 rounded-full bg-[#D4AF37] ${isPaused ? "" : "animate-ping"}`} />
                              {isPaused ? "Paused" : "Simulating"}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 h-[260px] overflow-y-auto space-y-2 select-text text-gray-300 scrollbar-thin scrollbar-thumb-white/5 text-[11px] leading-[1.5]">
                        {simLogs.map((log, index) => {
                          const isCommand = log.startsWith("►");
                          const isSystem = log.startsWith("[STREAM") || log.startsWith("[SYSTEM");
                          const isSuccess = log.startsWith("✓") || log.startsWith("✔");
                          const isWarning = log.startsWith("⚠");
                          return (
                            <p key={index} className={
                              isWarning ? "text-amber-400 font-bold" :
                              isCommand ? "text-brand-cyan font-bold" :
                              isSystem ? "text-[#D4AF37] font-bold" :
                              isSuccess ? "text-brand-green pl-4" :
                              "text-gray-400 pl-4"
                            }>
                              {log}
                            </p>
                          );
                        })}
                      </div>

                      <div className="p-4 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-2 text-[10px] text-gray-500">
                          <span>Progress: {simStep} / {currentSimSteps.length} Steps</span>
                          <span>|</span>
                          <span>Max Devices: 2</span>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => {
                              setSimStep(0);
                              setIsSimulating(false);
                              setIsPaused(false);
                              setSimLogs(["[LOGS FLUSHED] Waiting for activation. Initiate run or tick manual."]);
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
                              className="flex-1 sm:flex-initial px-4 py-1.5 bg-[#D4AF37] hover:bg-amber-400 text-black rounded-lg text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]"
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
                </motion.div>
              )}

              {/* ============================================================ */}
              {/* AEGIS HEALTH AI: TAB 1 - PRODUCT BLUEPRINT */}
              {/* ============================================================ */}
              {caseStudyTopic === "aegis" && activeTab === "product" && (
                <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-violet/20 border border-white/10 relative overflow-hidden flex items-center justify-center group z-10">
                    <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors pointer-events-none" />
                    <div className="relative z-10 text-center space-y-2 pointer-events-none">
                      <LayoutTemplate className="w-12 h-12 text-brand-cyan mx-auto opacity-80" />
                      <p className="font-mono text-sm text-brand-cyan tracking-widest px-4">DASHBOARD INTERFACE REVEAL</p>
                      <p className="font-mono text-xs text-gray-400 uppercase">Video will play inline on mobile</p>
                    </div>
                  </div>

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
              )}

              {/* ============================================================ */}
              {/* AEGIS HEALTH AI: TAB 2 - AGENT PLAYBOOK */}
              {/* ============================================================ */}
              {caseStudyTopic === "aegis" && activeTab === "playbook" && (
                <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
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

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2 relative">
                      {Object.entries(aegisNodes).map(([key, value]) => {
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
                            Highlighted Element: {aegisNodes[selectedNode]?.role || selectedNode}
                          </span>
                          <h4 className="font-display text-xl font-bold text-white">
                            {aegisNodes[selectedNode]?.subtitle}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                            {aegisNodes[selectedNode]?.desc}
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

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        Specialized Agent Network
                      </h3>
                      <p className="text-sm font-mono text-gray-400 max-w-xl">
                        To bypass API concurrency ceilings, agents operate on rate-isolated models explicitly tuned for their tasks.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                      <div className="p-4 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-2 text-[10px] text-gray-500">
                          <span>Progress: {simStep} / {currentSimSteps.length} Steps</span>
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
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
