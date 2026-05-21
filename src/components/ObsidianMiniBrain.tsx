import { motion, AnimatePresence } from "motion/react";
import { Terminal, Send, Sparkles } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useAppState } from "../AppStateContext";
import { assistantPrompts, skillsData, projectsData, experienceData } from "../data";

interface Message {
  id: string;
  sender: "user" | "system";
  text: React.ReactNode;
}

export function ObsidianMiniBrain() {
  const { setCaseStudyOpen } = useAppState();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "system",
      text: "Connection established. I am the Obsidian Mini Brain, a localized knowledge map of Aniket's capabilities. Ask me anything, or type 'help' for terminal commands."
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInputVal("");

    // Simulate thinking delay
    setTimeout(() => {
      const lowerText = text.toLowerCase().trim();
      let response: React.ReactNode = "My neural pathways don't have a specific answer for that. Try asking about my healthcare work, AI capabilities, or type 'help' for commands.";
      
      // Terminal Commands Handling
      if (lowerText === "help") {
        response = (
          <div className="font-mono text-sm space-y-1">
            <div className="text-brand-cyan mb-2">AVAILABLE COMMANDS:</div>
            <div><span className="text-brand-violet mr-2">›</span>about</div>
            <div><span className="text-brand-violet mr-2">›</span>skills</div>
            <div><span className="text-brand-violet mr-2">›</span>projects</div>
            <div><span className="text-brand-violet mr-2">›</span>experience</div>
            <div><span className="text-brand-violet mr-2">›</span>contact</div>
            <div><span className="text-brand-violet mr-2">›</span>case-study aegis-health-ai</div>
          </div>
        );
      } else if (lowerText === "about") {
        response = "I am Aniket Dhuri. I operate at the intersection of complex software engineering and high-end creative storytelling. I build platforms, architectures, and automated systems.";
      } else if (lowerText === "skills") {
        response = (
          <div className="font-mono text-sm">
            <div className="text-brand-cyan mb-2">IDENTIFIED DOMAINS:</div>
            {Array.from(new Set(skillsData.map(s => s.category))).map(cat => (
              <div key={cat}><span className="text-brand-green mr-2">+</span>{cat}</div>
            ))}
          </div>
        );
      } else if (lowerText === "projects") {
        response = (
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
      } else if (lowerText === "experience") {
        response = (
          <div className="font-mono text-sm space-y-3">
            <div className="text-brand-cyan mb-1">TIMELINE DATA:</div>
            {experienceData.slice(0,3).map(e => (
              <div key={e.id}>
                <div className="text-brand-violet">{e.role} @ {e.company}</div>
                <div className="text-xs text-gray-500">{e.duration}</div>
              </div>
            ))}
            <div className="text-xs italic">...and more earlier roles.</div>
          </div>
        );
      } else if (lowerText === "contact") {
        response = "Initiate contact securely via dhurianiket@gmail.com";
      } else if (lowerText === "case-study aegis-health-ai") {
        response = "Opening secure case file...";
        setCaseStudyOpen(true);
      }
      // General NLP Matches
      else {
        const match = assistantPrompts.find(p => lowerText.includes(p.text.toLowerCase()) || p.text.toLowerCase().includes(lowerText));
        if (match) {
          response = match.response;
        } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
          response = "Greetings. How can I assist you in exploring Aniket's portfolio?";
        } else if (lowerText.includes("hire") || lowerText.includes("contact")) {
          response = "You can contact Aniket directly via dhurianiket@gmail.com, or scroll down to the Contact section for more options.";
        }
      }

      setMessages(prev => [...prev, { id: Date.now().toString() + "_sys", sender: "system", text: response }]);
    }, 600);
  };

  return (
    <section id="assistant" className="relative py-32 px-6 sm:px-12 xl:px-24 z-10 border-t border-white/5 bg-black/40">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Terminal className="w-8 h-8 text-brand-cyan" />
          <h2 className="font-display text-4xl font-bold tracking-tight">
            Obsidian <span className="text-gradient-cyan">Mini Brain</span>
          </h2>
        </div>

        <div className="glass-panel border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-brand-green/50 shadow-[0_0_8px_#00ff66]" />
              </div>
              <span className="ml-4 font-mono text-xs text-brand-cyan tracking-widest">SYSTEM.ONLINE</span>
            </div>
            <Sparkles className="w-4 h-4 text-brand-violet animate-pulse" />
          </div>

          {/* Chat Window */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-6 hide-scrollbar flex flex-col">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    msg.sender === "user" 
                      ? "bg-brand-cyan/10 border border-brand-cyan/20 text-white" 
                      : "bg-white/5 border border-white/10 text-gray-200"
                  }`}>
                    {msg.sender === "system" && (
                      <div className="flex items-center gap-2 mb-2 opacity-50">
                        <Terminal className="w-3 h-3" />
                        <span className="font-mono text-[10px] tracking-widest uppercase">Obsidian Logic</span>
                      </div>
                    )}
                    <span className="text-sm md:text-base leading-relaxed inline-block">
                      {msg.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={endOfMessagesRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex flex-wrap gap-2">
            {assistantPrompts.map(prompt => (
              <button
                key={prompt.id}
                onClick={() => handleSend(prompt.text)}
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all"
              >
                {prompt.text}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 pt-0 bg-black/20">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className="relative flex items-center"
            >
              <span className="absolute left-4 font-mono text-brand-cyan">~&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Query the system..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-12 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 text-white font-mono text-sm transition-all"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="absolute right-3 p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
