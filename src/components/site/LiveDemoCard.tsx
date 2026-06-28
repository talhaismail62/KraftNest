"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PhoneCall,
  MessageCircle,
  Workflow,
  CheckCircle2,
  FileText,
  Bot,
  Database,
  BellRing,
  Send,
} from "lucide-react";
import { faqs, industries, pricingPlans } from "@/lib/data";

const TABS = [
  { id: "voice", label: "Voice Call", icon: PhoneCall },
  { id: "chat", label: "Live Chat", icon: MessageCircle },
  { id: "ops", label: "Ops Sync", icon: Workflow },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_MS = 9000;

/** Looping, multi-channel "AI employees at work" showcase — proof, not a claim. */
export function LiveDemoCard() {
  const [active, setActive] = useState<TabId>("voice");
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActive((cur) => {
        const idx = TABS.findIndex((t) => t.id === cur);
        return TABS[(idx + 1) % TABS.length].id;
      });
    }, TAB_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card w-full max-w-[380px] p-5 text-left relative overflow-hidden">
      <div className="flex items-center gap-1 mb-4 pb-4 border-b border-white/[0.06]">
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10.5px] font-heading uppercase tracking-[0.06em] transition-colors ${
                isActive ? "bg-cyan-dim text-cyan" : "text-white/35 hover:text-white/60"
              }`}
            >
              <t.icon size={12} />
              {t.label}
            </button>
          );
        })}
        <div className="flex items-center gap-1 ml-auto shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan animate-blink" />
          </span>
          <span className="text-[9px] uppercase tracking-[0.15em] text-cyan/70">Live</span>
        </div>
      </div>

      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          {active === "voice" && <VoiceDemo key="voice" />}
          {active === "chat" && (
            <ChatDemo key="chat" onPauseChange={(paused) => (pausedRef.current = paused)} />
          )}
          {active === "ops" && <OpsDemo key="ops" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function Waveform({ talking }: { talking: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-3.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-cyan/70"
          style={{
            height: talking ? `${6 + (i % 3) * 4}px` : "3px",
            animation: talking ? `wave 0.6s ease-in-out ${i * 0.08}s infinite` : "none",
            transition: "height 0.2s",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            height: 4px;
          }
          50% {
            height: 14px;
          }
        }
      `}</style>
    </div>
  );
}

type Line = { from: "them" | "ai"; text: string };

const voiceScript: Line[] = [
  { from: "them", text: "Hi, do you have any openings this Thursday?" },
  { from: "ai", text: "Yes — I have 2:00pm or 4:30pm open. Which works better?" },
  { from: "them", text: "2pm works great." },
  { from: "ai", text: "You're booked for Thursday at 2:00pm. Confirmation sent ✓" },
];

const chatScript: Line[] = [
  { from: "them", text: "Do you guys build custom AI for clinics?" },
  { from: "ai", text: "Yes — we've built AI receptionists for healthcare clients before." },
  { from: "them", text: "Nice. Can we set up a call this week?" },
  { from: "ai", text: "Booked you for Wed 11am with our team. See you then ✓" },
];

// Every canned reply below is pulled straight from the real faqs/pricingPlans/industries data
// (the same content shown elsewhere on the site) — nothing here is invented, and anything that
// doesn't match a known topic gets an honest human handoff instead of a guess. That's deliberate:
// a wrong-sounding "AI" answer in a sales demo does more damage to conversion than no answer at all.
const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  hospitality: ["event", "wedding", "venue", "hospitality"],
  hotels: ["hotel", "resort", "lodge"],
  retail: ["retail", "shop", "store", "jewelry", "jewellery", "boutique"],
  ecommerce: ["ecommerce", "e-commerce", "online store", "shopify", "webstore"],
  healthcare: ["health", "clinic", "doctor", "patient", "medical", "dental"],
  education: ["school", "education", "university", "student", "college"],
  "real-estate": ["real estate", "realtor", "property", "listing", "housing"],
  legal: ["law firm", "lawyer", "attorney", "legal"],
  finance: ["insurance", "financial", "finance", "bank", "advisor", "accounting"],
  automotive: ["car", "auto", "dealership", "vehicle", "automotive"],
  "home-services": ["plumb", "hvac", "roofing", "contractor", "electrician", "home service"],
  restaurants: ["restaurant", "cafe", "café", "dining"],
  fitness: ["gym", "fitness", "wellness", "yoga", "spa"],
};

const REPLY_RULES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["price", "pricing", "cost", "how much", "$", "plan"],
    reply: `Plans start ${pricingPlans[0].price}${pricingPlans[0].unit ?? ""} — ${pricingPlans[0].desc} Growth and Enterprise scale up from there.`,
  },
  { keywords: ["how long", "how many weeks", "timeline", "turnaround"], reply: faqs[1].a },
  { keywords: ["technical knowledge", "need to code", "configure", "no-code"], reply: faqs[2].a },
  { keywords: ["doesn't work", "what if it fails", "guarantee", "refund", "money back"], reply: faqs[3].a },
  {
    keywords: ["crm", "integrate", "api", "zapier", "salesforce", "hubspot", "existing tools", "existing system"],
    reply: faqs[4].a,
  },
  { keywords: ["ai employee", "what's an ai", "what is kraftnest", "what do you guys do"], reply: faqs[0].a },
  ...industries.map((ind) => ({
    keywords: INDUSTRY_KEYWORDS[ind.id] ?? [ind.id],
    reply: `${ind.blurb} For example: ${ind.useCases[0].toLowerCase()}.`,
  })),
  {
    keywords: ["hi", "hello", "hey"],
    reply:
      "Hey — I'm a live preview of an AI Sales Rep. Ask about pricing, timelines, integrations, or your industry, or tap a question below.",
  },
  {
    keywords: ["human", "real person", "talk to someone", "speak to"],
    reply: "Of course — I can route you straight to the team. Want me to get you booked on a free 30-minute audit call?",
  },
];

const FALLBACK_REPLY =
  "That deserves a precise answer, not a guess — want me to get you on a free 30-minute audit call so the team can answer that properly?";

function matchReply(raw: string): string {
  const text = raw.toLowerCase();
  for (const rule of REPLY_RULES) {
    if (rule.keywords.some((k) => text.includes(k))) return rule.reply;
  }
  return FALLBACK_REPLY;
}

const QUICK_ASKS = [
  "What's the pricing?",
  "How long to build?",
  "Do you work with clinics?",
  "Can this connect to my CRM?",
];

function useScriptLoop(script: Line[], stepMs = 1700, holdMs = 3000) {
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (step < script.length) {
      const t = setTimeout(() => setStep((s) => s + 1), stepMs);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStep(0);
      setCycle((c) => c + 1);
    }, holdMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return { step, cycle, done: step >= script.length };
}

function VoiceDemo() {
  const { step, cycle, done } = useScriptLoop(voiceScript);
  const lastFrom = voiceScript[Math.min(step, voiceScript.length - 1)]?.from;

  return (
    <DemoFrame>
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="h-8 w-8 rounded-md bg-cyan-dim border border-cyan-border flex items-center justify-center shrink-0">
          <PhoneCall size={14} className="text-cyan" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading text-[11px] font-bold tracking-wide truncate">
            AI Voice Receptionist
          </div>
          <div className="text-[10px] text-muted">Incoming call · 00:12</div>
        </div>
        <Waveform talking={!done && lastFrom === "ai"} />
      </div>

      <div className="flex flex-col gap-2.5">
        <AnimatePresence mode="popLayout">
          {voiceScript.slice(0, step).map((line, i) => (
            <ChatBubble key={`${cycle}-${i}`} line={line} />
          ))}
        </AnimatePresence>
        <DoneBadge show={done} cycle={cycle} label="Booked · 0 staff involved" />
      </div>
    </DemoFrame>
  );
}

function ChatDemo({ onPauseChange }: { onPauseChange: (paused: boolean) => void }) {
  const { step, cycle, done } = useScriptLoop(chatScript);
  const [liveMessages, setLiveMessages] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [focused, setFocused] = useState(false);
  const engaged = liveMessages.length > 0;

  // Pause the auto-rotating tabs the moment the visitor taps into the input or has a draft
  // typed — losing the tab mid-keystroke would feel broken. Only resume once they've blurred
  // the field with nothing drafted and haven't actually started a conversation.
  useEffect(() => {
    onPauseChange(engaged || focused || input.trim().length > 0);
  }, [engaged, focused, input, onPauseChange]);

  const showScriptTyping = !engaged && !done && step < chatScript.length && chatScript[step]?.from === "ai";

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setLiveMessages((m) => [...m, { from: "them", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        setLiveMessages((m) => [...m, { from: "ai", text: matchReply(trimmed) }]);
        setTyping(false);
      },
      650 + Math.random() * 450,
    );
  }

  return (
    <DemoFrame>
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="h-8 w-8 rounded-md bg-cyan-dim border border-cyan-border flex items-center justify-center shrink-0">
          <MessageCircle size={14} className="text-cyan" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading text-[11px] font-bold tracking-wide truncate">
            AI Sales Rep — Website Chat
          </div>
          <div className="text-[10px] text-muted">{engaged ? "You're live — try it" : "Visitor on Pricing page"}</div>
        </div>
      </div>

      <div className="themed-scroll flex flex-col gap-2.5 max-h-[180px] overflow-y-auto pr-0.5">
        <AnimatePresence mode="popLayout">
          {!engaged &&
            chatScript.slice(0, step).map((line, i) => <ChatBubble key={`${cycle}-${i}`} line={line} />)}
          {engaged && liveMessages.map((line, i) => <ChatBubble key={`live-${i}`} line={line} />)}
          {(showScriptTyping || typing) && (
            <motion.div
              key={`typing-${cycle}-${step}-${typing}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-end"
            >
              <div className="flex items-center gap-1 rounded-lg px-3 py-2.5 bg-cyan/15 border border-cyan-border">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-cyan/70 animate-bounce"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {!engaged && <DoneBadge show={done} cycle={cycle} label="Meeting booked · 0 staff involved" />}
      </div>

      {!engaged && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {QUICK_ASKS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-white/45 hover:text-cyan hover:border-cyan-border transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask about pricing, timelines, your industry..."
          className="flex-1 min-w-0 bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-[12px] text-white placeholder:text-white/30 outline-none focus:border-cyan-border"
        />
        <button
          type="submit"
          aria-label="Send"
          className="h-8 w-8 shrink-0 rounded-md bg-cyan text-black flex items-center justify-center disabled:opacity-40"
          disabled={!input.trim() || typing}
        >
          <Send size={14} />
        </button>
      </form>
    </DemoFrame>
  );
}

function ChatBubble({ line }: { line: Line }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${line.from === "ai" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-lg px-3 py-2 text-[12.5px] leading-snug ${
          line.from === "ai"
            ? "bg-cyan/15 border border-cyan-border text-white"
            : "bg-white/[0.05] border border-white/[0.07] text-white/70"
        }`}
      >
        {line.text}
      </div>
    </motion.div>
  );
}

function DoneBadge({ show, cycle, label }: { show: boolean; cycle: number; label: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={`done-${cycle}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1.5 mt-1 text-[11px] text-cyan/80 font-heading uppercase tracking-wide"
        >
          <CheckCircle2 size={13} />
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const opsNodes = [
  { icon: FileText, label: "Form" },
  { icon: Bot, label: "AI" },
  { icon: Database, label: "CRM" },
  { icon: BellRing, label: "Slack" },
];

function OpsDemo() {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(1247);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % (opsNodes.length + 1));
    }, 850);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (active === opsNodes.length) {
      setCount((c) => c + 1);
    }
  }, [active]);

  return (
    <DemoFrame>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="h-8 w-8 rounded-md bg-cyan-dim border border-cyan-border flex items-center justify-center shrink-0">
          <Workflow size={14} className="text-cyan" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading text-[11px] font-bold tracking-wide truncate">
            AI Ops Assistant
          </div>
          <div className="text-[10px] text-muted">New lead → CRM → team alert</div>
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        {opsNodes.map((node, i) => {
          const lit = i < active;
          return (
            <div key={node.label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`h-9 w-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    lit
                      ? "bg-cyan-dim border-cyan-border text-cyan"
                      : "bg-white/[0.03] border-white/[0.08] text-white/30"
                  }`}
                >
                  <node.icon size={15} />
                </div>
                <span
                  className={`text-[9px] uppercase tracking-wide transition-colors duration-300 ${
                    lit ? "text-cyan/80" : "text-white/25"
                  }`}
                >
                  {node.label}
                </span>
              </div>
              {i < opsNodes.length - 1 && (
                <div
                  className={`w-7 md:w-9 h-px mx-1 mb-4 transition-colors duration-300 ${
                    i < active ? "bg-cyan/50" : "bg-white/[0.08]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-7 pt-4 border-t border-white/[0.05] flex items-baseline justify-between">
        <span className="text-[11px] text-muted tracking-wide">Tasks automated today</span>
        <span className="font-heading text-[15px] font-bold text-cyan tabular-nums">
          {count.toLocaleString()}
        </span>
      </div>
    </DemoFrame>
  );
}
