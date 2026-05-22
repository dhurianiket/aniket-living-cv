import React, { useState } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, ExternalLink, Send } from "lucide-react";
import { useContact } from "../hooks/useFirebase";

export function ProofContact() {
  const { submitContact, isSubmitting, success, error } = useContact();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submitContact(email, message)) {
      setEmail("");
      setMessage("");
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 sm:px-12 xl:px-24 z-10 border-t border-white/5 bg-brand-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Proof / Trust */}
        <div className="flex-1 space-y-8">
          <h2 className="font-display text-4xl font-bold tracking-tight">
            Proof of <span className="text-gradient-violet">Execution</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-lg mb-8 leading-relaxed">
            I believe in showing, not just telling. My work spans secure production deployments, active full-stack applications, and high-retention creative media.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="glass-panel p-4 sm:p-6 rounded-xl border-t-2 border-t-brand-cyan">
              <div className="text-xl sm:text-3xl font-display font-bold text-white mb-1">MVP</div>
              <div className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase tracking-wider">Aegis Health AI in testing</div>
            </div>
            <div className="glass-panel p-4 sm:p-6 rounded-xl border-t-2 border-t-brand-violet">
              <div className="text-xl sm:text-3xl font-display font-bold text-white mb-1">Full-Stack</div>
              <div className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase tracking-wider">Architecture & Design</div>
            </div>
            <div className="glass-panel p-4 sm:p-6 rounded-xl border-t-2 border-t-brand-green">
              <div className="text-xl sm:text-3xl font-display font-bold text-white mb-1">5+ Yrs</div>
              <div className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase tracking-wider">Creative Direction</div>
            </div>
            <div className="glass-panel p-4 sm:p-6 rounded-xl border-t-2 border-t-brand-amber">
              <div className="text-xl sm:text-3xl font-display font-bold text-white mb-1">Solo</div>
              <div className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase tracking-wider">System Builder</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex-1 lg:pl-16 lg:border-l border-white/5 flex flex-col justify-center">
          <h3 className="font-display text-2xl font-bold mb-2">Initiate Contact</h3>
          <p className="text-gray-400 text-sm mb-8">
            Whether it's a startup MVP, a complex dashboard, or a creative campaign—let's build something useful.
          </p>

          <div className="space-y-4">
            <a href="mailto:dhurianiket@gmail.com" className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:bg-brand-cyan/5 hover:border-brand-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 group">
              <div className="p-3 bg-brand-cyan/10 rounded-lg group-hover:bg-brand-cyan/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5 text-brand-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Email</div>
                <div className="text-[10px] sm:text-xs font-mono text-gray-400 break-all">dhurianiket@gmail.com</div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 ml-auto group-hover:text-brand-cyan transition-colors" />
            </a>

            <a href="https://www.linkedin.com/in/aniket-dhuri-273094225?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:bg-[#0a66c2]/5 hover:border-[#0a66c2]/30 hover:shadow-[0_0_20px_rgba(10,102,194,0.2)] transition-all duration-300 group cursor-pointer">
              <div className="p-3 bg-[#0a66c2]/10 rounded-lg group-hover:bg-[#0a66c2]/20 group-hover:scale-110 transition-all duration-300">
                <Linkedin className="w-5 h-5 text-[#0a66c2]" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">LinkedIn</div>
                <div className="text-xs font-mono text-gray-400">Connect professionally</div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#0a66c2] transition-colors" />
            </a>

            <a href="https://github.com/dhurianiket" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:bg-white/5 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group cursor-pointer">
              <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">GitHub</div>
                <div className="text-xs font-mono text-gray-400">View source code & contributions</div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 ml-auto group-hover:text-white transition-colors" />
            </a>

            <a href="https://aegishealthai.co.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:bg-brand-violet/5 hover:border-brand-violet/30 hover:shadow-[0_0_20px_rgba(138,43,226,0.2)] transition-all duration-300 group cursor-pointer">
              <div className="p-3 bg-brand-violet/10 rounded-lg group-hover:bg-brand-violet/20 group-hover:scale-110 transition-all duration-300">
                <div className="w-5 h-5 text-brand-violet flex items-center justify-center font-bold font-display text-lg">A</div>
              </div>
              <div>
                <div className="text-sm font-medium text-white">Aegis Health AI</div>
                <div className="text-xs font-mono text-gray-400">Medical Informatics Startup</div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 ml-auto group-hover:text-brand-violet transition-colors" />
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5">
            <h4 className="font-mono text-xs tracking-widest text-brand-cyan uppercase mb-4">Direct Secure Message</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                  required
                  disabled={isSubmitting || success}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 text-white font-sans text-sm transition-all"
                />
              </div>
              <div>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Initiate transmission..." 
                  required
                  disabled={isSubmitting || success}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 min-h-[100px] focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 text-white font-sans text-sm transition-all resize-y"
                />
              </div>
              {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
              <button 
                type="submit" 
                disabled={isSubmitting || success || !email || !message}
                className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 rounded-lg font-mono text-xs uppercase tracking-widest hover:bg-brand-cyan/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? 'Transmitting...' : success ? 'Received' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="text-xs font-mono tracking-widest text-gray-600 uppercase">
              STATUS: <span className="text-brand-green">AVAILABLE FOR OPPORTUNITIES</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
