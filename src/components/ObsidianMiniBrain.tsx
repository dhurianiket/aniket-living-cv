import { motion, AnimatePresence } from "motion/react";
import { Terminal, Send, Sparkles, X, RotateCcw, Cpu } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useAppState } from "../AppStateContext";
import { useAnalytics } from "../hooks/useFirebase";
import { assistantPrompts, skillsData, projectsData, experienceData, certificationsData } from "../data";
import { queryMiniBrainGemini, ChatMessage } from "../services/geminiService";

interface Message {
  id: string;
  sender: "user" | "system";
  text: React.ReactNode;
  rawText?: string;
  isAi?: boolean;
}

/**
 * Formats AI text response into structured markdown elements (headings, lists, code, links, bold).
 */
function FormattedAiResponse({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let isNumbered = false;
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  const flushList = (key: number) => {
    if (currentList.length > 0) {
      if (isNumbered) {
        elements.push(
          <ol key={`ol-${key}`} className="list-decimal pl-5 space-y-1.5 my-2 text-xs sm:text-sm text-gray-300 font-sans">
            {currentList.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{renderInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc pl-5 space-y-1.5 my-2 text-xs sm:text-sm text-gray-300 font-sans">
            {currentList.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{renderInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
      }
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    // Code block detection
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${index}`} className="p-3 my-2 rounded-lg bg-black/70 border border-brand-cyan/20 font-mono text-xs text-brand-cyan overflow-x-auto">
            <code>{codeBlockLines.join("\n")}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        flushList(index);
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      flushList(index);
      return;
    }

    // Bullet list item (* or -)
    const bulletMatch = trimmed.match(/^[\*\-]\s+(.*)$/);
    if (bulletMatch) {
      if (isNumbered && currentList.length > 0) flushList(index);
      isNumbered = false;
      currentList.push(bulletMatch[1]);
      return;
    }

    // Numbered list item (1. or 1))
    const numberMatch = trimmed.match(/^\d+[\.\)]\s+(.*)$/);
    if (numberMatch) {
      if (!isNumbered && currentList.length > 0) flushList(index);
      isNumbered = true;
      currentList.push(numberMatch[1]);
      return;
    }

    // Heading (# or ## or ###)
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushList(index);
      elements.push(
        <div key={index} className="font-bold text-white text-sm sm:text-base mt-3 mb-1 text-brand-cyan flex items-center gap-1.5">
          <span className="text-brand-cyan text-xs">›</span>
          <span>{renderInlineMarkdown(headingMatch[2])}</span>
        </div>
      );
      return;
    }

    // Horizontal rule divider
    if (trimmed === '***' || trimmed === '---' || trimmed === '___') {
      flushList(index);
      elements.push(<hr key={index} className="border-white/10 my-2.5" />);
      return;
    }

    // Blockquote (> quote)
    const quoteMatch = trimmed.match(/^>\s*(.*)$/);
    if (quoteMatch) {
      flushList(index);
      elements.push(
        <div key={index} className="p-2.5 my-2 rounded-lg bg-white/5 border-l-2 border-brand-cyan text-xs sm:text-sm text-gray-300 italic font-sans">
          {renderInlineMarkdown(quoteMatch[1])}
        </div>
      );
      return;
    }

    // Normal paragraph
    flushList(index);
    elements.push(
      <p key={index} className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans my-1.5">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
  });

  if (inCodeBlock && codeBlockLines.length > 0) {
    elements.push(
      <pre key="code-end" className="p-3 my-2 rounded-lg bg-black/70 border border-brand-cyan/20 font-mono text-xs text-brand-cyan overflow-x-auto">
        <code>{codeBlockLines.join("\n")}</code>
      </pre>
    );
  }

  flushList(lines.length);

  return <div className="space-y-1">{elements}</div>;
}

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<)"]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="text-white font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[11px] sm:text-xs text-brand-cyan border border-white/5">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[") && token.includes("](")) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan hover:underline inline-flex items-center gap-0.5 font-medium"
          >
            {linkMatch[1]} ↗
          </a>
        );
      }
    } else if (token.startsWith("http://") || token.startsWith("https://")) {
      parts.push(
        <a
          key={match.index}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-cyan hover:underline inline-flex items-center gap-0.5 font-medium underline"
        >
          {token} ↗
        </a>
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export function ObsidianMiniBrain() {
  const { isMiniBrainOpen, setMiniBrainOpen, setCaseStudyOpen, setCaseStudyTopic, reduceMotion } = useAppState();
  const { recordEvent } = useAnalytics();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "system",
      text: "Connection established. I am the Obsidian Mini Brain, grounded in Aniket's complete portfolio via Google Gemini 3.6 Flash. Ask me anything, or type 'help' for terminal commands.",
      rawText: "Connection established. I am the Obsidian Mini Brain, grounded in Aniket's complete portfolio via Google Gemini 3.6 Flash."
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMiniBrainOpen) {
      recordEvent('open_minibrain');
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMiniBrainOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isMiniBrainOpen, setMiniBrainOpen]);

  useEffect(() => {
    if (isMiniBrainOpen) {
      setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isThinking, isMiniBrainOpen]);

  const handleResetTerminal = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "system",
        text: "Terminal reset. Obsidian Mini Brain online with Google Gemini 3.6 Flash neural grounding. Ask anything about Aniket's OTT architecture, DRM, video editing, or projects.",
        rawText: "Terminal reset. Obsidian Mini Brain online with Google Gemini 3.6 Flash neural grounding."
      }
    ]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isThinking) return;

    const trimmedText = text.trim();
    const lowerText = trimmedText.toLowerCase();

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmedText,
      rawText: trimmedText
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal("");

    // FAST LOCAL COMMANDS (instant response without network latency)
    if (lowerText === "clear" || lowerText === "cls") {
      handleResetTerminal();
      return;
    }

    if (lowerText === "help") {
      const response = (
        <div className="font-mono text-sm space-y-1">
          <div className="text-brand-cyan mb-2">AVAILABLE TERMINAL COMMANDS:</div>
          <div><span className="text-brand-violet mr-2">›</span>about</div>
          <div><span className="text-brand-violet mr-2">›</span>skills</div>
          <div><span className="text-brand-violet mr-2">›</span>projects</div>
          <div><span className="text-brand-gold mr-2">›</span>ott (or 'deoyani')</div>
          <div><span className="text-brand-gold mr-2">›</span>drm (or 'streaming')</div>
          <div><span className="text-brand-cyan mr-2">›</span>ai-generalist</div>
          <div><span className="text-brand-violet mr-2">›</span>milestones</div>
          <div><span className="text-brand-violet mr-2">›</span>experience</div>
          <div><span className="text-brand-violet mr-2">›</span>education</div>
          <div><span className="text-brand-violet mr-2">›</span>certifications</div>
          <div><span className="text-brand-violet mr-2">›</span>contact</div>
          <div><span className="text-brand-gold mr-2">›</span>resume (Download Official PDF)</div>
          <div><span className="text-brand-violet mr-2">›</span>survival-guide</div>
          <div><span className="text-brand-violet mr-2">›</span>playbook</div>
          <div><span className="text-brand-gold mr-2">›</span>case-study deoyani-movies</div>
          <div><span className="text-brand-violet mr-2">›</span>case-study aegis-health-ai</div>
          <div><span className="text-brand-cyan mr-2">›</span>clear (Reset Terminal)</div>
          <div className="text-xs text-gray-400 pt-2 border-t border-white/5 mt-2">
            💡 Or ask any open-ended question in English, Marathi, or Hindi! Gemini 3.6 Flash will answer with complete portfolio grounding.
          </div>
        </div>
      );
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "_sys", sender: "system", text: response, rawText: "Command: help" }
      ]);
      return;
    }

    if (lowerText === "resume" || lowerText === "cv" || lowerText === "download cv" || lowerText === "download resume") {
      const response = (
        <div className="space-y-3 font-sans">
          <span className="font-mono text-[10px] text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded tracking-widest uppercase border border-[#D4AF37]/30">
            OFFICIAL CURRICULUM VITAE (PDF)
          </span>
          <div className="font-display font-bold text-base text-white">
            Aniket Dhuri - Executive Resume (Top 1%)
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Pristine 2-page executive resume covering Product Management, AI Generalist architectures, Deoyani Movies OTT, Aegis Health AI, and 5+ years of cinematic post-production &amp; 4K theatrical color grading.
          </p>
          <div className="flex gap-2 pt-1">
            <a
              href="/Aniket_Dhuri_Executive_Resume.pdf"
              target="_blank"
              download="Aniket_Dhuri_Executive_Resume.pdf"
              className="px-4 py-2 bg-brand-cyan text-black font-semibold text-xs rounded-lg hover:bg-opacity-80 transition-all font-mono inline-flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              Download PDF
            </a>
            <a
              href="/Aniket_Dhuri_Executive_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 text-white font-semibold text-xs rounded-lg hover:bg-white/20 transition-all font-mono inline-flex items-center gap-2 cursor-pointer"
            >
              Open in New Tab ↗
            </a>
          </div>
        </div>
      );
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "_sys", sender: "system", text: response, rawText: "Official Resume PDF available at /Aniket_Dhuri_Executive_Resume.pdf" }
      ]);
      return;
    }

    if (lowerText === "case-study aegis-health-ai" || lowerText === "case-study aegis") {
      setCaseStudyTopic("aegis");
      setMiniBrainOpen(false);
      setCaseStudyOpen(true);
      return;
    }

    if (lowerText === "case-study deoyani-movies" || lowerText === "case-study deoyani") {
      setCaseStudyTopic("deoyani");
      setMiniBrainOpen(false);
      setCaseStudyOpen(true);
      return;
    }

    if (lowerText === "survival-guide") {
      const response = (
        <div className="space-y-3">
          <span className="font-mono text-[10px] text-brand-cyan bg-brand-cyan/15 px-2 py-0.5 rounded tracking-widest uppercase">
            TECHNICAL GUIDE
          </span>
          <div className="font-display font-bold text-base text-white">
            Free-Tier AI Survival Guide
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            A comprehensive technical guide detailing provider-specific rate ceilings (RPM, TPM, RPD), fallback routes, adaptive rate limiting, and system prompt compression metrics valid as of May 2026. This manual is embedded directly in my selected technical writing section.
          </p>
          <button
            onClick={() => {
              setMiniBrainOpen(false);
              setTimeout(() => {
                const el = document.getElementById("survival-guide");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="px-4 py-2 bg-brand-cyan text-black font-semibold text-xs rounded-lg hover:bg-opacity-80 transition-all font-mono inline-block cursor-pointer"
          >
            Scroll to Survival Guide Section
          </button>
        </div>
      );
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "_sys", sender: "system", text: response, rawText: "Free-Tier AI Survival Guide" }
      ]);
      return;
    }

    if (lowerText === "playbook") {
      const response = (
        <div className="space-y-3">
          <span className="font-mono text-[10px] text-brand-violet bg-brand-violet/10 px-2 py-0.5 rounded tracking-widest uppercase">
            ARCHITECTURAL MANUAL
          </span>
          <div className="font-display font-bold text-base text-white">
            Aegis Multi-Agent Playbook
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Our playbook covers serial database lock schemes, automatic failover model mappings, and prompt compression techniques which enable an autonomous team profile run on free APIs safely.
          </p>
          <button
            onClick={() => {
              setMiniBrainOpen(false);
              setCaseStudyOpen(true);
            }}
            className="px-4 py-2 bg-brand-violet text-white font-semibold text-xs rounded-lg hover:bg-opacity-80 border border-brand-violet/30 transition-all font-mono inline-block cursor-pointer shadow-[0_0_15px_rgba(138,43,226,0.3)]"
          >
            Launch Architecture Playbook
          </button>
        </div>
      );
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "_sys", sender: "system", text: response, rawText: "Aegis Multi-Agent Playbook" }
      ]);
      return;
    }

    if (lowerText === "ott" || lowerText === "deoyani" || lowerText === "deoyani-movies") {
      const response = (
        <div className="space-y-3">
          <span className="font-mono text-[10px] text-brand-gold bg-brand-gold/15 px-2 py-0.5 rounded tracking-widest uppercase border border-brand-gold/30">
            FLAGSHIP OTT ARCHITECTURE
          </span>
          <div className="font-display font-bold text-base text-white">
            Deoyani Movies OTT Platform
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            As Chief Architect, Lead OTT Systems Engineer &amp; Sr. Video Editor at Deoyani Movies Pvt Ltd (founded by Matchindra Chate), I engineered the direct-to-consumer theatrical OTT streaming ecosystem at <strong>deoyanimovies.com</strong>.
          </p>
          <ul className="text-xs text-gray-400 font-sans pl-4 list-disc space-y-1">
            <li><strong>Commercial TVOD:</strong> ₹25 for 72hr access &amp; VIP passes (₹199–₹799) with live Razorpay + HMAC-SHA256 webhooks.</li>
            <li><strong>Bunny Stream CDN:</strong> Master Library 747391, custom edge CDN, MediaCage ClearKey cbcs CENC DRM &amp; 10m expiring tokens.</li>
            <li><strong>Concurrency Hardening:</strong> Sliding-window 30s heartbeat with strict 2-device ceiling and mobile blanking.</li>
            <li><strong>Multilingual AI Concierge:</strong> Google Cloud Agent Platform / Gemini 3.6 Flash for Marathi, Hindi, English trivia &amp; discovery.</li>
          </ul>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => {
                setCaseStudyTopic("deoyani");
                setMiniBrainOpen(false);
                setCaseStudyOpen(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-brand-gold to-brand-crimson text-black font-bold text-xs rounded-lg hover:opacity-90 transition-all font-mono inline-block cursor-pointer"
            >
              Launch OTT Blueprint &amp; DRM Playbook
            </button>
            <a
              href="https://www.deoyanimovies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-mono text-xs rounded-lg border border-white/20 transition-all"
            >
              Visit www.deoyanimovies.com ↗
            </a>
          </div>
        </div>
      );
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "_sys", sender: "system", text: response, rawText: "Deoyani Movies OTT Platform details" }
      ]);
      return;
    }

    if (lowerText === "drm" || lowerText === "streaming") {
      const response = (
        <div className="space-y-3">
          <span className="font-mono text-[10px] text-brand-gold bg-brand-gold/15 px-2 py-0.5 rounded tracking-widest uppercase border border-brand-gold/30">
            ZERO-TRUST DRM &amp; CONCURRENCY
          </span>
          <div className="font-display font-bold text-base text-white">
            Anti-Piracy &amp; DRM Pipeline
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Our OTT infrastructure eliminates credential sharing and stream ripping using a 4-pillar defense:
          </p>
          <ol className="text-xs text-gray-400 font-sans pl-4 list-decimal space-y-1">
            <li><strong>Zero-Trust Ephemeral Tokens:</strong> HMAC-SHA256 signed playback tokens with 10-minute maximum TTL bound to user IP.</li>
            <li><strong>MediaCage ClearKey DRM:</strong> AES-128 cbcs CENC encryption with dynamic key rotation and strict referrer locking.</li>
            <li><strong>Sliding-Window Heartbeat:</strong> Firestore distributed session tracking locking concurrent streams to max 2 devices.</li>
            <li><strong>Native App &amp; Forensic Guard:</strong> Android FLAG_SECURE prevents screen recording; Capacitor container auto-pauses and blanks on backgrounding.</li>
          </ol>
          <button
            onClick={() => {
              setCaseStudyTopic("deoyani");
              setMiniBrainOpen(false);
              setCaseStudyOpen(true);
            }}
            className="px-4 py-2 bg-brand-gold text-black font-semibold text-xs rounded-lg hover:bg-opacity-80 transition-all font-mono inline-block cursor-pointer mt-1"
          >
            Open Interactive DRM Simulator
          </button>
        </div>
      );
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "_sys", sender: "system", text: response, rawText: "Anti-Piracy & DRM Pipeline details" }
      ]);
      return;
    }

    if (lowerText === "skills") {
      const response = (
        <div className="font-mono text-sm">
          <div className="text-brand-cyan mb-2">IDENTIFIED DOMAINS:</div>
          {Array.from(new Set(skillsData.map(s => s.category))).map(cat => (
            <div key={cat}><span className="text-brand-green mr-2">+</span>{cat}</div>
          ))}
        </div>
      );
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "_sys", sender: "system", text: response, rawText: "Skills domains" }
      ]);
      return;
    }

    if (lowerText === "projects") {
      const response = (
        <div className="font-mono text-sm space-y-2">
          <div className="text-brand-cyan mb-1">FEATURED SYSTEMS:</div>
          {projectsData.map(p => (
            <div key={p.id}>
              <div className="font-bold text-white">{p.title}</div>
              <div className="text-xs text-gray-400">{p.shortDesc}</div>
            </div>
          ))}
        </div>
      );
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "_sys", sender: "system", text: response, rawText: "Featured systems" }
      ]);
      return;
    }

    // ALL OTHER QUERIES GO THROUGH GOOGLE GEMINI 3.6 FLASH GROUNDED INFERENCE
    setIsThinking(true);

    try {
      // Build conversation history for multi-turn reasoning
      const historyForGemini: ChatMessage[] = messages
        .filter(m => typeof m.rawText === "string" && m.rawText.trim().length > 0)
        .slice(-10)
        .map(m => ({
          sender: m.sender,
          text: m.rawText!
        }));

      const aiText = await queryMiniBrainGemini(trimmedText, historyForGemini);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + "_ai",
          sender: "system",
          text: <FormattedAiResponse content={aiText} />,
          rawText: aiText,
          isAi: true
        }
      ]);
    } catch (err: any) {
      console.warn("Gemini query encountered an issue, checking fallback:", err);

      // Offline or error fallback
      let fallbackText = "My neural pathways don't have a specific answer for that right now. Try typing 'help', 'ott', 'ai-generalist', or 'resume'.";
      let fallbackNode: React.ReactNode = fallbackText;

      const match = assistantPrompts.find(p => lowerText.includes(p.text.toLowerCase()) || p.text.toLowerCase().includes(lowerText));
      if (match && match.response) {
        fallbackText = match.response;
        fallbackNode = match.response;
      } else if (lowerText.includes("deoyani") || lowerText.includes("ott") || lowerText.includes("bindhast")) {
        fallbackText = "At Deoyani Movies Pvt Ltd, Aniket serves as Chief Architect, Lead OTT Systems Engineer & Sr. Video Editor. Engineered the direct-to-consumer theatrical OTT streaming ecosystem at deoyanimovies.com.";
        fallbackNode = (
          <div className="space-y-2">
            <p className="text-xs text-gray-200">
              At <strong>Deoyani Movies Pvt Ltd</strong>, I serve as <strong>Chief Architect, Lead OTT Systems Engineer &amp; Sr. Video Editor</strong>.
            </p>
            <p className="text-xs text-gray-400">
              I engineered the direct-to-consumer theatrical OTT streaming ecosystem at <strong>deoyanimovies.com</strong> with Bunny Stream HLS + ClearKey DRM, live Razorpay TVOD, and 30s session locking.
            </p>
            <button
              onClick={() => {
                setCaseStudyTopic("deoyani");
                setMiniBrainOpen(false);
                setCaseStudyOpen(true);
              }}
              className="mt-1 text-xs font-mono text-brand-gold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Launch OTT Blueprint &amp; DRM Playbook →
            </button>
          </div>
        );
      } else if (lowerText.includes("contact") || lowerText.includes("hire") || lowerText.includes("email")) {
        fallbackText = "Contact Aniket directly at dhurianiket@gmail.com (Personal) or aniket@aegishealthai.co.in (Work).";
        fallbackNode = (
          <div className="space-y-1 text-xs text-gray-300 font-sans">
            <p>Initiate contact directly:</p>
            <p className="font-mono text-brand-cyan">dhurianiket@gmail.com (Personal)</p>
            <p className="font-mono text-brand-cyan">aniket@aegishealthai.co.in (Work)</p>
          </div>
        );
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + "_fallback",
          sender: "system",
          text: fallbackNode,
          rawText: fallbackText,
          isAi: false
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <AnimatePresence>
      {isMiniBrainOpen && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMiniBrainOpen(false)}
            className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full sm:max-w-4xl h-[90vh] sm:h-[80vh] sm:max-h-[80vh] flex flex-col glass-panel border-white/10 rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-brand-black"
          >
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02] shrink-0 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-brand-cyan" />
                <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  Obsidian <span className="text-gradient-cyan">Mini Brain</span>
                  <Sparkles className="w-3 h-3 text-brand-violet animate-pulse hidden sm:block" />
                </h2>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>GEMINI 3.6 FLASH ONLINE</span>
                </div>
                <button
                  onClick={handleResetTerminal}
                  title="Reset Terminal Session"
                  aria-label="Reset Terminal"
                  className="px-2.5 py-1.5 text-xs font-mono text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <button
                  onClick={() => setMiniBrainOpen(false)}
                  aria-label="Close Mini Brain"
                  className="p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors flex-shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 hide-scrollbar flex flex-col bg-black/40">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 ${
                      msg.sender === "user" 
                        ? "bg-brand-cyan/10 border border-brand-cyan/20 text-white" 
                        : "bg-white/5 border border-white/10 text-gray-200"
                    }`}>
                      {msg.sender === "system" && (
                        <div className="flex items-center gap-2 mb-2 opacity-60">
                          {msg.isAi ? (
                            <>
                              <Cpu className="w-3 h-3 text-brand-cyan" />
                              <span className="font-mono text-[10px] tracking-widest uppercase text-brand-cyan">Gemini 3.6 Flash Neural Engine</span>
                            </>
                          ) : (
                            <>
                              <Terminal className="w-3 h-3 text-gray-400" />
                              <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400">Obsidian Terminal</span>
                            </>
                          )}
                        </div>
                      )}
                      <div className="text-sm sm:text-base leading-relaxed break-words">
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Thinking indicator */}
                {isThinking && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 bg-white/5 border border-brand-cyan/30 text-gray-200">
                      <div className="flex items-center gap-2 mb-1.5 text-brand-cyan">
                        <Cpu className="w-3.5 h-3.5 animate-spin text-brand-cyan" />
                        <span className="font-mono text-[10px] tracking-widest uppercase font-semibold">
                          GEMINI 3.6 FLASH INFERENCE
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-gray-300">
                        <span className="inline-block w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
                        <span className="animate-pulse">Synthesizing neural knowledge map &amp; context...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={endOfMessagesRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-b sm:border-b-0 border-white/5 bg-brand-black flex overflow-x-auto gap-2 hide-scrollbar shrink-0">
              {assistantPrompts.map(prompt => (
                <button
                  key={prompt.id}
                  disabled={isThinking}
                  onClick={() => handleSend(prompt.text)}
                  className="text-xs font-mono px-4 py-2 sm:px-3 sm:py-1.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all whitespace-nowrap shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {prompt.text}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6 bg-brand-black shrink-0 sticky bottom-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputVal);
                }}
                className="relative flex items-center"
              >
                <span className="absolute left-4 font-mono text-brand-cyan hidden sm:block">~&gt;</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={isThinking ? "Awaiting Gemini inference..." : "Query the system in English, Marathi, or Hindi..."}
                  disabled={isThinking}
                  aria-label="Query input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 sm:py-4 pl-4 sm:pl-12 pr-12 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 text-white font-mono text-sm transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isThinking}
                  aria-label="Send message"
                  className="absolute right-2 p-3 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Send className="w-6 h-6" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
