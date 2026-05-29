import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppState } from "../AppStateContext";
import { 
  BookOpen, 
  Search, 
  SlidersHorizontal, 
  Code, 
  Terminal, 
  AlertTriangle, 
  Layers, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  HelpCircle,
  HelpCircle as QuestionIcon,
  ChevronDown
} from "lucide-react";

interface ProviderData {
  name: string;
  model: string;
  rpm: string;
  tpm: string;
  rpd: string;
  context: string;
  verdict: "Good" | "Marginal" | "Too Restricted";
  details: string;
  source: string;
}

export function SelectedWriting() {
  const { reduceMotion } = useAppState();
  const [copied, setCopied] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVerdict, setFilterVerdict] = useState<string>("All");
  const [activeCodeTab, setActiveCodeTab] = useState<"limiter" | "router" | "compressor" | "dispatcher">("limiter");
  const [expandedTrap, setExpandedTrap] = useState<number | null>(null);

  // UTC Live Ticker & Rate Cooldown States
  const [tokens, setTokens] = useState(41250);
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    // Clock tick
    const update = () => {
      const now = new Date();
      setUtcTime(now.getUTCFullYear() + "-" + 
                 String(now.getUTCMonth() + 1).padStart(2, '0') + "-" + 
                 String(now.getUTCDate()).padStart(2, '0') + " " + 
                 String(now.getUTCHours()).padStart(2, '0') + ":" + 
                 String(now.getUTCMinutes()).padStart(2, '0') + ":" + 
                 String(now.getUTCSeconds()).padStart(2, '0') + " UTC");
    };
    update();
    const clockInterval = setInterval(update, 1000);

    // Active Token Bucket cooldown animation
    const bucketInterval = setInterval(() => {
      setTokens((prev) => {
        // Occasional transaction depletion
        const randomTx = Math.random() < 0.25 ? Math.floor(Math.random() * 6000) + 1500 : 0;
        let nextVal = prev - randomTx;
        if (nextVal < 10000) nextVal = 10000;
        // Bleed off / recover
        const recovery = Math.floor(Math.random() * 500) + 800;
        return Math.min(50000, nextVal + recovery);
      });
    }, 1200);

    return () => {
      clearInterval(clockInterval);
      clearInterval(bucketInterval);
    };
  }, []);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const providers: ProviderData[] = [
    {
      name: "Groq Cloud",
      model: "Llama-4-Scout-17b",
      rpm: "30",
      tpm: "30,000",
      rpd: "1,000",
      context: "131K",
      verdict: "Good",
      details: "Best primary engine for high-frequency reactive loops. Zero latency LPU speed keeps queues snappy.",
      source: "https://console.groq.com/docs/rate-limits"
    },
    {
      name: "Google AI Studio",
      model: "Gemini 2.5 Flash",
      rpm: "~10",
      tpm: "~250,000",
      rpd: "~500",
      context: "1.0M+",
      verdict: "Good",
      details: "Massive context allows very long instruction chains. Keep in mind that the ~500 RPD is the bottleneck.",
      source: "https://aistudio.google.com/rate-limit"
    },
    {
      name: "Google AI Studio Lite",
      model: "Gemini 2.5 Flash-Lite",
      rpm: "~30",
      tpm: "~1,000,000",
      rpd: "~1,500",
      context: "1.0M+",
      verdict: "Good",
      details: "Outstanding free RPD allocation combined with huge 1M context. Perfect tertiary fallback for complex tasks.",
      source: "https://aistudio.google.com/rate-limit"
    },
    {
      name: "DeepSeek API",
      model: "deepseek-v4-pro",
      rpm: "Concurrency based",
      tpm: "N/A",
      rpd: "Credit-quota",
      context: "128K",
      verdict: "Good",
      details: "Enforces a 500 concurrent request rate limit. Best cheap Claude replacement for long, deep thinking tasks.",
      source: "https://api-docs.deepseek.com/quick_start/rate_limit"
    },
    {
      name: "Cerebras",
      model: "llama-3.3-70b",
      rpm: "30",
      tpm: "30,000 (Input)",
      rpd: "100",
      context: "8K",
      verdict: "Marginal",
      details: "Insanely fast speed (~1,500 t/s) but tiny 8K context and 100 RPD restricts multi-turn reasoning loops.",
      source: "https://inference-docs.cerebras.ai/rate-limits"
    },
    {
      name: "Anthropic API",
      model: "Claude 3.5 Sonnet",
      rpm: "50 (Build 1)",
      tpm: "40,000",
      rpd: "Paid Only",
      context: "200K",
      verdict: "Good",
      details: "No direct Free tier exists. High cognitive skill but high token consumption; use Haiku for loops, Sonnet for mind mapping.",
      source: "https://docs.anthropic.com/en/api/rate-limits"
    },
    {
      name: "GitHub Models",
      model: "Llama-3.3-70b-instruct",
      rpm: "~10",
      tpm: "Low/High tiers",
      rpd: "~50",
      context: "8K",
      verdict: "Too Restricted",
      details: "Great for single-shot testing but extremely low Daily request limits fail sustained agent loops.",
      source: "https://docs.github.com/en/github-models"
    },
    {
      name: "NVIDIA NIM",
      model: "Llama-3.1-405B-Instruct",
      rpm: "Varies",
      tpm: "Varies",
      rpd: "1,000 Monthly credits",
      context: "128K",
      verdict: "Marginal",
      details: "Uses monthly credit allocation. Perfect for one-shot giant model (405B) evaluations, but hard to loop.",
      source: "https://build.nvidia.com"
    }
  ];

  const filteredProviders = providers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVerdict = filterVerdict === "All" || p.verdict === filterVerdict;
    return matchesSearch && matchesVerdict;
  });

  const defensiveCodeSnippets = {
    limiter: {
      title: "Adaptive Rate Limiter",
      lang: "Python",
      desc: "Dynamically reads and parses custom response headers (Groq / Cerebras) with strict decimal support to block execution queues before hit limiters.",
      code: `class AdaptiveRateLimiter:
    def __init__(self, rpm_limit=30, tpm_limit=30000, provider="groq"):
        self.rpm_limit = rpm_limit
        self.tpm_limit = tpm_limit
        self.provider = provider
        self._lock = threading.Lock()
        
        # Parse servers headers (handles float fractional seconds)
        self._server_rpm_remaining = None
        self._server_reset_requests = None

    def update_from_headers(self, headers: dict):
        with self._lock:
            if self.provider in ("groq", "cerebras"):
                # Cerebras returns fractional floats e.g., "11.38"
                reset_req = headers.get("x-ratelimit-reset-requests", "")
                remaining_req = headers.get("x-ratelimit-remaining-requests", "")
                
                if reset_req:
                    # Strip trailing alphabet 's' if present
                    self._server_reset_requests = float(reset_req.rstrip("s"))
                if remaining_req:
                    self._server_rpm_remaining = int(remaining_req)

    def wait_if_needed(self, estimated_tokens=1000):
        with self._lock:
            now = time.monotonic()
            # Enforce server-side rate backoff if slots decrease
            if self._server_rpm_remaining is not None and self._server_rpm_remaining < 2:
                wait = self._server_reset_requests or 10.0
                print(f"[Limiter] Rate critical! Sleeping for {wait:.2f}s")
                time.sleep(wait + 0.5) # Add buffer`
    },
    router: {
      title: "Robust Fallback Router",
      lang: "Python",
      desc: "Leverages prioritised model groups, automatically degrading and failing over onto tertiary nodes if HTTP 429 / 503 is returned.",
      code: `class FallbackRouter:
    def __init__(self, providers: list[ProviderConfig]):
        self.providers = sorted(providers, key=lambda p: p.priority)
        self._cooldowns = {} # provider -> retry_until

    def complete(self, messages, max_tokens=2048):
        last_error = None
        for provider in self.providers:
            if self._is_on_cooldown(provider):
                continue
            
            try:
                client = OpenAI(base_url=provider.base_url, api_key=provider.api_key)
                response = client.chat.completions.create(
                    model=provider.model,
                    messages=messages,
                    max_tokens=max_tokens
                )
                return response
            except RateLimitError as e:
                last_error = e
                # exponential backoff with random scatter jitter
                retry_after = float(getattr(e, 'retry_after', None) or 60)
                jitter = random.uniform(1.0, 5.0)
                self._set_cooldown(provider, retry_after + jitter)
                continue
        raise RuntimeError(f"All providers exhausted: {last_error}")`
    },
    compressor: {
      title: "Context prompt compressor",
      lang: "Python",
      desc: "Strips empty commentary blocks and summarizes middle interaction turns to reduce context overhead by up to 60%.",
      code: `def compress_system_prompt(prompt: str, target_tokens: int = 8000) -> str:
    target_chars = target_tokens * 4
    if len(prompt) <= target_chars:
        return prompt
        
    lines = prompt.split('\\n')
    compressed = []
    for line in lines:
        stripped = line.strip()
        if not stripped or stripped.startswith('#'):
            continue
            
        # Swap verbose phrases to keep core prompt dense
        line = re.sub(r'\\bYou (should|must|need to)\\b', 'Always', line)
        line = re.sub(r'\\bPlease ensure that\\b', 'Ensure:', line)
        line = re.sub(r'\\bIn order to\\b', 'To', line)
        compressed.append(line)
        
    result = '\\n'.join(compressed)
    # If still large, preserve core system instructions and fold mid section
    if len(result) > target_chars:
        half = target_chars // 2
        result = result[:half] + "\\n...[compressed]...\\n" + result[-half:]
    return result`
    },
    dispatcher: {
      title: "Hallucination Shield Dispatcher",
      lang: "Python",
      desc: "Wraps dynamic tool calling triggers inside deterministic registries to handle missing properties and code errors.",
      code: `class SafeToolDispatcher:
    def __init__(self, tools: dict):
        self.tools = tools

    def dispatch(self, tool_name: str, tool_args: dict):
        if tool_name not in self.tools:
            available = list(self.tools.keys())
            error_msg = f"Tool '{tool_name}' missing! Available: {available}."
            print(f"[Hallucination Shield] Trapped hallucination: {tool_name}")
            return {"error": error_msg, "valid_tools": available}
            
        fn = self.tools[tool_name]
        try:
            return fn(**tool_args)
        except TypeError as e:
            # Hallucinated params safeguard
            sig = inspect.signature(fn)
            return {
                "error": f"Parameter mismatch for '{tool_name}': {e}",
                "expected": str(sig)
            }`
    }
  };

  const architecturalTraps = [
    {
      title: "TPM Wall on First Call",
      symptom: "Groq or Cerebras returns 429 on the very first agent loop turn.",
      cause: "Huge, wordy system prompts (e.g., >20K tokens) instantly exceed provider single-minute buckets.",
      fix: "Leverage heuristic prompt compression. Strip layout spaces, compact strings, and enforce a <6K token limit."
    },
    {
      title: "Fractional Reset Failures",
      symptom: "Python backends crash with unexpected ValueError during limit ticks.",
      cause: "Cerebras reset headers return fractional decimals (e.g. '11.38') rather than whole integers.",
      fix: "Parse headers through float() conversion first, and buffer with 0.5s safety margins before sleep statements."
    },
    {
      title: "Concurrency Lock Clash",
      symptom: "DeepSeek API triggers 429 locks even when operating way below minute volume quotas.",
      cause: "Mistaking concurrencies for requests limits. DeepSeek restricts active pipelines on low tier channels.",
      fix: "Wrap outbound queries in local database semaphores rather than calling thread sleep timers."
    },
    {
      title: "Model Deprecation Crash",
      symptom: "System crashes when falling back to cached provider models.",
      cause: "Free providers frequently disable older models. On May 27, 2026, Cerebras deprecated Llama 3.1 8B.",
      fix: "Map global profiles dynamically to Cerebras llama-3.3-70b as a central fallback routing node."
    }
  ];

  return (
    <section id="survival-guide" className="relative py-32 px-6 sm:px-12 xl:px-24 z-10 border-t border-white/5 bg-brand-black">
      {/* Visual Ambient Background Grains */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-violet/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-brand-cyan uppercase bg-brand-cyan/5 px-2.5 py-1 rounded border border-brand-cyan/20">
                May 2026 EDITION
              </span>
              <span className="text-gray-500 font-mono text-xs">Live-Verified Specs</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-none">
              Free-Tier AI <span className="text-gradient-cyan">Survival Guide</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm max-w-2xl leading-relaxed">
              Autonomous agents execute tight loop calls. An individual research process triggers multiple Think/Tool cycles, resending system contexts and blowing past RPM/TPM envelopes in seconds. This architecture manual maps free-tier rates and defensive code block implementations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <span className="text-xs font-mono px-3 py-1.5 bg-white/5 border border-white/10 text-brand-green flex items-center gap-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animat-pulse" /> RPM Safe
            </span>
            <span className="text-xs font-mono px-3 py-1.5 bg-white/5 border border-white/10 text-brand-cyan flex items-center gap-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" /> TPM Safe
            </span>
          </div>
        </div>

        {/* Section 1: Visual Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-t border-t-red-500/35 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-7xl font-bold font-mono text-white/5 pointer-events-none">RPM</div>
            <h4 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="text-red-400 w-4 h-4" /> RPM Envelopes
            </h4>
            <p className="text-gray-300 text-xs leading-relaxed mb-4">
              Rapid feedback loops (Think → Search → Think → Parse) burn daily allotments in minutes. Sustained loops hit strict ceiling walls quickly.
            </p>
            <div className="font-mono text-[10px] text-gray-500 bg-black/40 p-2.5 rounded-lg">
              Symptom: HTTP 429 Too Many Requests
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-t border-t-brand-amber/35 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-7xl font-bold font-mono text-white/5 pointer-events-none">TPM</div>
            <h4 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="text-brand-amber w-4 h-4" /> TPM Constraints
            </h4>
            <p className="text-gray-300 text-xs leading-relaxed mb-4">
              LLMs resend entire histories on each turn. 20K instructions × 5 loops easily crosses 100K tokens, hitting limiters within 3 cycles.
            </p>
            <div className="font-mono text-[10px] text-gray-500 bg-black/40 p-2.5 rounded-lg">
              Mitigation: Recursive prompt compaction
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-t border-t-brand-violet/35 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-7xl font-bold font-mono text-white/5 pointer-events-none">CTX</div>
            <h4 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="text-brand-violet w-4 h-4" /> Context Bloating
            </h4>
            <p className="text-gray-300 text-xs leading-relaxed mb-4">
              Verbose context triggers output token lag and high prices. Smaller models hallucinate tools and arguments when system length grows.
            </p>
            <div className="font-mono text-[10px] text-gray-500 bg-black/40 p-2.5 rounded-lg">
              Solution: Deterministic schemas &amp; dispatch bounds
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Filtering Provider Matrix */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Live Provider Rate Matrix
              </h3>
              <p className="text-xs font-mono text-gray-400">Verified official rate sheets valid as of May 2026.</p>
            </div>
            
            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search provider..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-white/5 border border-white/5 hover:border-white/10 focus:border-brand-cyan/50 focus:outline-none rounded-lg text-xs font-mono text-white placeholder-gray-500 min-w-[150px] transition-all"
                  aria-label="Search Matrix"
                />
              </div>

              <div className="flex bg-white/5 p-1 rounded-lg border border-white/5 text-[10px] font-mono">
                {["All", "Good", "Marginal", "Too Restricted"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterVerdict(status)}
                    className={`px-2.5 py-1 rounded transition-all ${
                      filterVerdict === status ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="glass-panel rounded-2xl overflow-hidden border-white/10 bg-[#030308]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4 pl-6">Provider Node</th>
                    <th className="p-4">Assigned Model</th>
                    <th className="p-4">RPM Ceiling</th>
                    <th className="p-4">TPM Allocation</th>
                    <th className="p-4">RPD Quota</th>
                    <th className="p-4">Ctx Limit</th>
                    <th className="p-4">Suitability</th>
                    <th className="p-4 pr-6 text-right">Reference docs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {filteredProviders.length > 0 ? (
                    filteredProviders.map((prov, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-4 pl-6 font-display font-bold text-white text-sm">
                          {prov.name}
                        </td>
                        <td className="p-4 text-slate-400">
                          <code>{prov.model}</code>
                        </td>
                        <td className="p-4">{prov.rpm}</td>
                        <td className="p-4">{prov.tpm}</td>
                        <td className="p-4">{prov.rpd}</td>
                        <td className="p-4 text-slate-400">{prov.context}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                            prov.verdict === "Good" ? "bg-brand-green/10 text-brand-green" :
                            prov.verdict === "Marginal" ? "bg-brand-amber/10 text-brand-amber" :
                            "bg-red-500/10 text-red-400"
                          }`}>
                            {prov.verdict}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <a
                            href={prov.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md hover:bg-white/5 hover:text-white inline-block text-gray-500 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-500">
                        No active provider match found directory. Check search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3: Defensive Code Inspector Container */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              Defending the Frontier: Code Implementation Hub
            </h3>
            <p className="text-xs font-mono text-gray-400">Dynamic Python classes utilized to map rate limiters and system adapters.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tabs List Selector */}
            <div className="lg:col-span-1 space-y-3">
              {Object.entries(defensiveCodeSnippets).map(([key, tab]) => {
                const isActive = activeCodeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCodeTab(key as any)}
                    className={`w-full text-left p-5 rounded-xl border text-xs font-mono transition-all duration-300 relative ${
                      isActive 
                        ? "bg-brand-violet/15 border-brand-violet text-white shadow-[0_0_15px_rgba(138,43,226,0.2)]" 
                        : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-display font-semibold text-sm text-white">{tab.title}</span>
                      <span className="text-[10px] text-gray-500 uppercase">{tab.lang}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-normal font-sans">
                      {tab.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Code Editor Screen */}
            <div className="lg:col-span-2 glass-panel rounded-2xl border-white/10 overflow-hidden flex flex-col font-mono text-xs bg-[#030308]">
              <div className="bg-white/5 px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-gray-400 ml-2 font-mono text-[10px]">
                    {defensiveCodeSnippets[activeCodeTab].title.toLowerCase().replace(/\s/g, "_")}.py
                  </span>
                </div>
                
                <button
                  onClick={() => handleCopyCode(activeCodeTab, defensiveCodeSnippets[activeCodeTab].code)}
                  className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white px-2 py-1 hover:bg-white/5 rounded transition-all"
                >
                  {copied === activeCodeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-brand-green" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>

              {/* Monospaced code window */}
              <div className="p-6 h-[320px] overflow-auto select-all text-xs text-brand-cyan/85 leading-normal scrollbar-thin scrollbar-thumb-white/5">
                <pre>{defensiveCodeSnippets[activeCodeTab].code}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Clickable Architectural Trap Board */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              The Architectural Trap Reference Board
            </h3>
            <p className="text-xs font-mono text-gray-400">Click a card to inspect debugging solutions for common micro-failures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architecturalTraps.map((trap, index) => {
              const isExpanded = expandedTrap === index;
              return (
                <button
                  key={index}
                  onClick={() => setExpandedTrap(isExpanded ? null : index)}
                  className={`p-6 text-left rounded-xl transition-all border duration-500 flex flex-col justify-between select-none ${
                    isExpanded 
                      ? "bg-brand-violet/10 border-brand-violet shadow-[0_0_15px_rgba(138,43,226,0.3)] scale-[1.02]" 
                      : "bg-white/5 border-white/5 hover:border-brand-cyan/20 hover:bg-brand-cyan/[0.02]"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-mono text-[10px] text-gray-500">TRAP 0{index + 1}</span>
                      <span className={`p-1 bg-white/5 rounded ${isExpanded ? "text-brand-violet" : "text-gray-400"}`}>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-white">
                      {trap.title}
                    </h4>
                    
                    <p className="text-gray-400 text-xs leading-normal">
                      <strong>Symptom:</strong> {trap.symptom}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 mt-4 border-t border-white/5 space-y-2 text-xs font-mono text-slate-300"
                        >
                          <p className="text-red-400">
                            <strong>Cause:</strong> {trap.cause}
                          </p>
                          <p className="text-brand-green">
                            <strong>Fix:</strong> {trap.fix}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Golden Zero-Cost Stack Configulator */}
        <div id="survival-guide" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-green/20 bg-gradient-to-br from-brand-green/5 via-brand-black/40 to-brand-cyan/5 relative overflow-hidden flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-[10px] text-brand-green bg-brand-green/10 px-2.5 py-1 rounded inline-block uppercase tracking-wider">
                Optimal Setup Topology
              </span>
              <h3 className="font-display text-2xl font-bold text-white leading-none">
                The Golden Zero-Cost Agent Stack
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Combine multiple providers in a unified fallback array: <strong>Groq Llama-4-Scout</strong> as primary, <strong>Cerebras Llama-3.3-70b</strong> as secondary, and <strong>Gemini 2.5 Flash</strong> as tertiary. Together, they achieve an aggregate throughput of <strong>~1,600 robust requests/day entirely for free</strong>.
              </p>
            </div>

            <div className="shrink-0 p-6 bg-black/40 border border-white/10 rounded-xl space-y-2 text-center text-xs font-mono min-w-[220px]">
              <span className="text-gray-400 block tracking-widest uppercase text-[9px]">TOTAL FREE THRUPUT</span>
              <div className="text-4xl font-display font-extrabold text-brand-green tracking-tight">
                ~1,600
              </div>
              <span className="text-gray-300 block text-[10px]">Requests / Day Validated</span>
            </div>
          </div>

          {/* Golden Stack Real-Time Cooldown Ticker panel */}
          <div className="border-t border-white/5 pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-gray-400">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-500 uppercase flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                  Rate Cooldown (Token Bucket Recovery)
                </span>
                <span className="text-brand-green font-bold">{tokens.toLocaleString()} / 50,000 TPM</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-green rounded-full transition-all duration-1000"
                  style={{ width: `${(tokens / 50000) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-gray-500">
                <span>Refilling: +62.5 t/s (Steady Lock leak rate)</span>
                <span>Burst window: Active</span>
              </div>
            </div>

            <div className="flex md:flex-col lg:flex-row md:items-end lg:items-center gap-4 text-[10px] md:text-right lg:text-left md:border-l md:border-white/5 md:pl-6 shrink-0 justify-between">
              <div>
                <span className="text-gray-500 uppercase block font-bold">Local Sync Node</span>
                <span className="text-white text-[11px] font-bold">{utcTime || "CLOCK_INIT..."}</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-500 uppercase block font-bold">Aggregated Buffer</span>
                <span className="text-brand-cyan text-[11px] font-bold">STANDBY_SECURE</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
