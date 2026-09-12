"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  RotateCcw,
  Minimize2,
  Maximize2,
  Square,
  Copy,
  Check,
  Wallet,
  Mountain,
  ChevronRight,
  Paperclip,
  Mic,
  Compass,
  ArrowRight,
  MapPin,
  Download,
  Map,
} from "lucide-react";
import { usePageContext } from "@/lib/chatbot/usePageContext";
import { useChatStream } from "@/lib/chatbot/useChatStream";
import { TRIP_IMAGES } from "@/lib/data/tripImages";
import { TRIP_MINI_MAP } from "@/lib/chatbot/tripSummaryMap";

/* ─────────────────────────────────────────────────────────────
   BRAND TOKENS  (matches the HTML spec palette exactly)
───────────────────────────────────────────────────────────── */
const B = {
  sand: "#fbf9f4",
  sandDark: "#eeece6",
  bg: "#f5f3ee",
  forest: "#18281e",
  forestLight: "#243b2d",
  terra: "#c85a17",
  terraHover: "#b34d10",
  slate: "#3d453e",
  muted: "#727970",
  border: "#dbdad5",
  darkBorder: "#2d4233",
};

/* ─────────────────────────────────────────────────────────────
   INLINE TRIP CARD
───────────────────────────────────────────────────────────── */
function InlineTripCard({ slug }: { slug: string }) {
  const meta = TRIP_MINI_MAP[slug];
  const imageSrc = TRIP_IMAGES[slug] || "/images/spiti-ki-monastery.jpg";
  if (!meta) return null;

  return (
    <Link
      href={`/trips/${slug}`}
      className="group my-2 block overflow-hidden rounded-xl border hover:border-[#c85a17]/60 bg-white shadow-sm hover:shadow-md transition-all duration-200"
      style={{ borderColor: B.border }}
    >
      <div className="flex items-center gap-3 p-2.5">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0" style={{ background: B.sandDark }}>
          <Image
            src={imageSrc}
            alt={meta.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="64px"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            {meta.tripType && (
              <span
                className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ background: `${B.terra}15`, color: B.terra }}
              >
                {meta.tripType}
              </span>
            )}
            {meta.season && (
              <span className="text-[10px] truncate font-mono" style={{ color: B.muted }}>
                • {meta.season}
              </span>
            )}
          </div>

          <h4
            className="text-xs font-bold truncate transition-colors"
            style={{ color: B.forest, fontFamily: 'var(--font-serif)' }}
          >
            {meta.title}
          </h4>

          <div className="flex items-center gap-3 mt-1 text-[11px] font-mono" style={{ color: B.slate }}>
            {meta.days && (
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3" style={{ color: B.terra }} />
                {meta.days} Days
              </span>
            )}
            {meta.budget && (
              <span className="flex items-center gap-1" style={{ color: "#15803d" }}>
                <Wallet className="w-3 h-3" />
                ₹{meta.budget.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#c85a17] transition-colors"
          style={{ background: B.sandDark, color: B.muted }}
        >
          <ChevronRight className="w-4 h-4 group-hover:text-white transition-colors" />
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   MARKDOWN RENDERER  (expedition-themed styles)
───────────────────────────────────────────────────────────── */
function MarkdownRenderer({ content }: { content: string }) {
  const tripSlugs = useMemo(() => {
    const found: string[] = [];
    const tripRegex = /\/trips\/([a-z0-9-]+)/g;
    let match: RegExpExecArray | null;
    while ((match = tripRegex.exec(content)) !== null) {
      const slug = match[1];
      if (TRIP_MINI_MAP[slug] && !found.includes(slug)) found.push(slug);
    }
    return found.slice(0, 3);
  }, [content]);

  const lines = content.split("\n");

  const renderFormattedText = (text: string): React.ReactNode => {
    const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
      const token = match[1];

      if (token.startsWith("**") && token.endsWith("**")) {
        parts.push(
          <strong key={match.index} style={{ color: B.forest, fontWeight: 700 }}>
            {renderFormattedText(token.slice(2, -2))}
          </strong>
        );
      } else if (token.startsWith("`") && token.endsWith("`")) {
        parts.push(
          <code
            key={match.index}
            className="px-1.5 py-0.5 mx-0.5 rounded text-[11px] font-mono"
            style={{ background: B.sandDark, color: B.terra }}
          >
            {token.slice(1, -1)}
          </code>
        );
      } else if (token.startsWith("[")) {
        const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const label = linkMatch[1];
          const url = linkMatch[2];
          const isTrip = url.includes("/trips/");
          const isRegion = url.includes("/regions/");
          parts.push(
            <Link
              key={match.index}
              href={url}
              className="inline-flex items-center gap-1 font-semibold transition-all"
              style={{
                color: isTrip || isRegion ? B.terra : B.terra,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {isTrip && <Compass className="w-3 h-3 shrink-0" />}
              {isRegion && <Mountain className="w-3 h-3 shrink-0" />}
              <span>{label}</span>
            </Link>
          );
        } else {
          parts.push(token);
        }
      }

      lastIndex = match.index + token.length;
    }

    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="space-y-2 text-xs" style={{ color: B.slate, lineHeight: 1.65 }}>
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lIdx} className="h-1" />;

        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={lIdx}
              className="text-[13px] font-bold pt-2 pb-1 border-b"
              style={{
                color: B.forest,
                borderColor: B.border,
                fontFamily: 'var(--font-serif)',
              }}
            >
              {renderFormattedText(trimmed.replace(/^###\s+/, ""))}
            </h4>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3
              key={lIdx}
              className="text-sm font-bold pt-2.5 pb-1 border-b"
              style={{
                color: B.forest,
                borderColor: B.border,
                fontFamily: 'var(--font-serif)',
              }}
            >
              {renderFormattedText(trimmed.replace(/^##\s+/, ""))}
            </h3>
          );
        }

        // Blockquote → Field notebook callout
        if (trimmed.startsWith(">")) {
          return (
            <div
              key={lIdx}
              className="my-2 p-2.5 rounded-r-xl text-[11px] italic"
              style={{
                borderLeft: `2px solid ${B.terra}`,
                background: B.bg,
                color: B.slate,
              }}
            >
              {renderFormattedText(trimmed.replace(/^>\s*/, ""))}
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-1 py-0.5">
              <span
                className="w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: B.forest, color: B.sand }}
              >
                {numMatch[1]}
              </span>
              <div className="flex-1">{renderFormattedText(numMatch[2])}</div>
            </div>
          );
        }

        // Bullet
        const isBullet =
          trimmed.startsWith("•") ||
          trimmed.startsWith("- ") ||
          trimmed.startsWith("* ");
        if (isBullet) {
          const cleanLine = trimmed.replace(/^([•\-\*]\s*)/, "");
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-1 py-0.5">
              <span
                className="text-xs mt-0.5 font-bold shrink-0"
                style={{ color: B.terra }}
              >
                ◆
              </span>
              <div className="flex-1">{renderFormattedText(cleanLine)}</div>
            </div>
          );
        }

        return <p key={lIdx} style={{ lineHeight: 1.65 }}>{renderFormattedText(line)}</p>;
      })}

      {/* Interactive trip cards */}
      {tripSlugs.length > 0 && (
        <div className="pt-2 mt-2 border-t space-y-1" style={{ borderColor: B.border }}>
          <div
            className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
            style={{ color: B.terra }}
          >
            <MapPin className="w-3 h-3" />
            Curated Route Dossiers:
          </div>
          {tripSlugs.map((slug) => (
            <InlineTripCard key={slug} slug={slug} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   WELCOME STATE
───────────────────────────────────────────────────────────── */
function WelcomeState({ onSelectTopic }: { onSelectTopic: (q: string) => void }) {
  const topics = [
    {
      emoji: "🏔️",
      title: "High-Altitude Passes",
      desc: "Best windows for Ladakh, Spiti & Zanskar circuits",
      query: "What are the best high-altitude road trips and when are the mountain passes open?",
    },
    {
      emoji: "🌧️",
      title: "Monsoon Sahyadris",
      desc: "Waterfalls, sea forts & Konkan coastal drives",
      query: "Which trips are best for monsoon waterfalls in the Western Ghats?",
    },
    {
      emoji: "💰",
      title: "Honest Budgets",
      desc: "Verified stays, fuel & permit breakdowns",
      query: "What are your most budget-friendly road trips under ₹25,000?",
    },
    {
      emoji: "✨",
      title: "AI Route Studio",
      desc: "Generate custom day-by-day itineraries",
      query: "How does the AI Trip Planner work and what can I customize?",
    },
  ];

  return (
    <div className="py-3 space-y-5">
      {/* Intro card */}
      <div
        className="rounded-xl border"
        style={{ background: B.sandDark, borderColor: B.border, padding: "20px" }}
      >
        <div className="flex items-start gap-3.5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
            style={{
              background: `${B.terra}20`,
              borderColor: `${B.terra}40`,
            }}
          >
            <span
              className="text-xl font-bold"
              style={{ color: B.terra }}
            >
              R
            </span>
          </div>
          <div className="min-w-0">
            <p
              className="font-bold text-sm leading-snug"
              style={{ color: B.forest }}
            >
              Welcome to Raahi 🚗✨
            </p>
            <div className="text-xs mt-1.5 leading-relaxed space-y-1.5" style={{ color: B.slate, lineHeight: 1.6 }}>
              <p>Your trusted travel companion across <span className="font-semibold" style={{ color: B.forest }}>64,800 km</span> of documented routes.</p>
              <p>I know every pass, homestay, fuel stop, and permit checkpoint—ready to guide you on your journey.</p>
              <p>Ask me anything, and let&apos;s plan your adventure together!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Topic grid */}
      <div>
        <div
          className="text-[10px] font-mono font-bold uppercase tracking-widest px-1 mb-2 flex items-center gap-1.5"
          style={{ color: B.muted }}
        >
          Quick Expeditions:
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {topics.map((t, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTopic(t.query)}
              className="rounded-xl text-left border transition-all duration-200 hover:shadow-md group"
              style={{
                background: B.sand,
                borderColor: B.border,
                padding: "20px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = `${B.terra}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = B.border;
              }}
            >
              <div className="text-2xl mb-2">{t.emoji}</div>
              <div
                className="font-bold text-xs leading-snug"
                style={{ color: B.forest }}
              >
                {t.title}
              </div>
              <p className="text-[11px] mt-1 leading-snug" style={{ color: B.muted }}>
                {t.desc}
              </p>
              <span
                className="mt-2.5 text-[10px] font-mono font-semibold flex items-center gap-0.5"
                style={{ color: B.terra }}
              >
                Ask now <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TELEMETRY TICKER DATA  (static - contextual)
───────────────────────────────────────────────────────────── */
const PASS_TELEMETRY = [
  { pass: "Kunzum La (4,590m)", status: "Clear till 16:00", temp: "-2°C" },
  { pass: "Rohtang (3,978m)", status: "Active", temp: "4°C" },
  { pass: "Baralacha La (4,890m)", status: "Caution – Icing", temp: "-7°C" },
];

/* ─────────────────────────────────────────────────────────────
   MAIN CHAT WIDGET
───────────────────────────────────────────────────────────── */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [tickerIdx, setTickerIdx] = useState(0);

  const pageContext = usePageContext();
  const { messages, isStreaming, sendMessage, clearChat, stopStreaming } = useChatStream();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  // Ticker cycle
  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(() => setTickerIdx((i) => (i + 1) % PASS_TELEMETRY.length), 5000);
    return () => clearInterval(t);
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend ?? input).trim();
    if (!text || isStreaming) return;
    setInput("");
    sendMessage(text, pageContext);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isOnlyWelcome = messages.length === 1 && messages[0].id === "welcome-msg";
  const activeTripMeta = pageContext.entitySlug ? TRIP_MINI_MAP[pageContext.entitySlug] : null;
  const ticker = PASS_TELEMETRY[tickerIdx];

  const panelWidth = isExpanded ? "sm:w-[640px]" : "sm:w-[440px]";
  const panelHeight = isExpanded ? "sm:h-[760px]" : "sm:h-[640px]";

  return (
    <>
      {/* ── FIXED ANCHOR (bottom-right) ── */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[950]">

        {/* ── CHAT WINDOW — floats above the FAB ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute bottom-[72px] right-0
                w-[92vw] ${panelWidth} h-[78vh] ${panelHeight}
                max-h-[calc(100vh-6rem)]
                flex flex-col overflow-hidden
                rounded-2xl border
                shadow-[0_20px_45px_-10px_rgba(24,40,30,0.30),0_8px_20px_-6px_rgba(24,40,30,0.18)]
                transition-[width,height] duration-300`}
              style={{ background: B.sand, borderColor: B.border }}
            >
              {/* ── HEADER ── */}
              <div
                className="relative flex items-center justify-between px-4 py-3 border-b select-none shrink-0"
                style={{ background: B.forest, borderColor: B.darkBorder }}
              >
                {/* Mobile drag handle */}
                <div className="sm:hidden absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />

                <div className="flex items-center gap-2.5 min-w-0 overflow-hidden flex-1">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center border font-bold"
                      style={{
                        background: `${B.terra}20`,
                        borderColor: `${B.terra}40`,
                      }}
                    >
                      <span
                        className="text-base"
                        style={{ color: B.terra }}
                      >
                        R
                      </span>
                    </div>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                      style={{ background: "#22c55e", borderColor: B.forest }}
                    />
                  </div>

                  <div className="min-w-0 overflow-hidden flex-1">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <h2
                        className="font-semibold text-[10px] leading-tight truncate"
                        style={{ color: B.sand }}
                      >
                        Raahi bot
                      </h2>
                      <span
                        className="text-[7px] font-mono font-bold px-1 py-0.5 rounded tracking-wider uppercase shrink-0"
                        style={{ background: B.terra, color: "#fff" }}
                      >
                        AI
                      </span>
                    </div>
                    <p className="text-[9px] mt-0.5 flex items-center gap-1" style={{ color: "#a8b5aa" }}>
                      <span
                        className="w-1.5 h-1.5 rounded-full inline-block animate-pulse shrink-0"
                        style={{ background: "#4ade80" }}
                      />
                      Live Telemetry &amp; BRO Synced
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-0.5 shrink-0 ml-2" style={{ color: "#9ca89e" }}>
                  <button
                    onClick={clearChat}
                    title="Reset conversation"
                    className="p-1.5 rounded-lg transition-colors hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Standard view" : "Expanded view"}
                    className="hidden sm:inline-flex p-1.5 rounded-lg transition-colors hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    {isExpanded ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close"
                    className="p-1.5 rounded-lg transition-colors hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── PASS TELEMETRY TICKER ── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tickerIdx}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center justify-between px-4 py-1.5 border-b text-[11px] font-mono shrink-0"
                  style={{ background: "#101c15", borderColor: B.darkBorder }}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="text-[10px] uppercase font-semibold shrink-0"
                      style={{ color: B.terra }}
                    >
                      Active Pass:
                    </span>
                    <span className="truncate font-medium text-white">{ticker.pass}</span>
                    <span style={{ color: "#525c53" }}>•</span>
                    <span style={{ color: "#4ade80" }}>{ticker.status}</span>
                  </div>
                  <span
                    className="text-[10px] ml-2 whitespace-nowrap px-2 py-0.5 rounded border bg-white/5 shrink-0"
                    style={{ color: "#9ca89e", borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    Temp {ticker.temp}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* ── ACTIVE CONTEXT BAR (trip/region page) ── */}
              {pageContext.entitySlug && (
                <div
                  className="flex items-center justify-between px-4 py-2 border-b text-xs shrink-0"
                  style={{ background: `${B.terra}10`, borderColor: `${B.terra}25` }}
                >
                  <div className="flex items-center gap-2 truncate" style={{ color: B.terra }}>
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ background: B.terra }}
                    />
                    <span className="truncate font-mono text-[11px]">
                      Viewing:{" "}
                      <strong style={{ color: B.forest }}>
                        {activeTripMeta
                          ? activeTripMeta.title
                          : pageContext.entitySlug.replace(/-/g, " ")}
                      </strong>
                    </span>
                  </div>
                  {activeTripMeta && (
                    <div
                      className="hidden sm:flex items-center gap-2 text-[11px] font-mono font-semibold shrink-0 pl-2"
                      style={{ color: B.terra }}
                    >
                      {activeTripMeta.days && <span>{activeTripMeta.days}D</span>}
                      {activeTripMeta.budget && (
                        <span>• ₹{activeTripMeta.budget.toLocaleString("en-IN")}</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ── MESSAGES SCROLL AREA ── */}
              <div
                className="flex-1 overflow-y-auto px-4 pt-4 pb-4"
                style={{ background: B.sand }}
              >
                <div className="flex flex-col gap-4">
                  {/* Corpus stamp — inline inside scroll area so it doesn't eat panel height */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1" style={{ background: B.border }} />
                    <span
                      className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0"
                      style={{ color: B.muted, background: B.sandDark, borderColor: B.border }}
                    >
                      64,800 KM Ground Data
                    </span>
                    <div className="h-px flex-1" style={{ background: B.border }} />
                  </div>
                  {isOnlyWelcome ? (
                    <WelcomeState onSelectTopic={handleSend} />
                  ) : (
                    messages.map((msg) => {
                      const isUser = msg.role === "user";
                      const isWelcome = msg.id === "welcome-msg";

                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          {/* Bot avatar */}
                          {!isUser && (
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold"
                              style={{ background: B.forest }}
                            >
                              <span
                                className="text-sm"
                                style={{
                                  color: B.terra,
                                  fontFamily: 'var(--font-serif)',
                                }}
                              >
                                R
                              </span>
                            </div>
                          )}

                          <div className={`${isUser ? "max-w-[75%]" : "max-w-[82%]"} space-y-0.5`}>
                            {/* Message bubble */}
                            <div
                              className="rounded-2xl text-[14px] leading-relaxed shadow-sm"
                              style={
                                isUser
                                  ? {
                                      background: B.forest,
                                      color: "#f3f4f6", // light grey/white text for user
                                      padding: "16px",
                                      borderRadius: "16px 4px 16px 16px",
                                    }
                                  : {
                                      background: "#ffffff",
                                      borderColor: B.border,
                                      color: B.slate,
                                      borderWidth: 1,
                                      padding: "16px",
                                      borderRadius: "4px 16px 16px 16px",
                                    }
                              }
                            >
                              {isUser ? (
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                              ) : msg.content ? (
                                <div>
                                  <MarkdownRenderer content={msg.content} />

                                  {/* Message footer */}
                                  {!isWelcome && (
                                    <div
                                      className="flex items-center justify-between pt-2 mt-2 border-t text-[10px] font-mono"
                                      style={{ borderColor: B.border, color: B.muted }}
                                    >
                                      <span className="flex items-center gap-1">
                                        <span
                                          className="w-1.5 h-1.5 rounded-full"
                                          style={{ background: "#22c55e" }}
                                        />
                                        BRO Log Validated
                                      </span>
                                      <button
                                        onClick={() => handleCopy(msg.id, msg.content)}
                                        className="p-1 rounded flex items-center gap-1 transition-colors cursor-pointer"
                                        style={{ color: B.muted }}
                                        title="Copy response"
                                      >
                                        {copiedId === msg.id ? (
                                          <>
                                            <Check className="w-3 h-3" style={{ color: "#22c55e" }} />
                                            <span style={{ color: "#22c55e" }}>Copied</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3 h-3" />
                                            <span>Copy</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                /* Typing indicator */
                                <div
                                  className="flex items-center gap-2 py-1 text-xs"
                                  style={{ color: B.muted }}
                                >
                                  <span
                                    className="w-2 h-2 rounded-full animate-bounce"
                                    style={{ background: B.terra, animationDelay: "0ms" }}
                                  />
                                  <span
                                    className="w-2 h-2 rounded-full animate-bounce"
                                    style={{ background: B.terra, animationDelay: "150ms" }}
                                  />
                                  <span
                                    className="w-2 h-2 rounded-full animate-bounce"
                                    style={{ background: B.terra, animationDelay: "300ms" }}
                                  />
                                  <span className="ml-1 font-mono text-[11px] italic">
                                    Consulting route notes...
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Timestamps */}
                            <div
                              className={`text-[10px] font-mono mt-1.5 ${
                                isUser ? "text-right mr-1" : "text-left ml-1"
                              }`}
                              style={{ color: B.muted }}
                            >
                              {isUser ? "08:42 AM • Explorer Query" : "08:40 AM • BRO Sync Active"}
                            </div>
                          </div>

                          {/* User avatar */}
                          {isUser && (
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
                              style={{ background: B.terra }}
                            >
                              <svg
                                className="w-3.5 h-3.5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>
                          )}
                        </motion.div>
                      );
                    })
                  )}

                  {/* Inline CTA card for trip/region context */}
                  {!isOnlyWelcome && activeTripMeta && (
                    <div
                      className="rounded-xl p-3 border"
                      style={{ background: "#ffffff", borderColor: B.border }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span
                            className="text-[9px] font-mono uppercase font-bold tracking-wider"
                            style={{ color: B.terra }}
                          >
                            Curated Route Dossier
                          </span>
                          <h4
                            className="font-bold text-sm leading-snug truncate"
                            style={{
                              color: B.forest,
                              fontFamily: 'var(--font-serif)',
                            }}
                          >
                            {activeTripMeta.title}
                          </h4>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            className="py-1.5 px-2.5 text-[11px] font-medium rounded-lg flex items-center gap-1 transition-colors shadow-xs"
                            style={{ background: B.forest, color: B.sand }}
                          >
                            <Download className="w-3 h-3" />
                            GPX
                          </button>
                          <Link
                            href={`/trips/${pageContext.entitySlug}`}
                            className="py-1.5 px-2.5 text-[11px] font-medium rounded-lg flex items-center gap-1 transition-colors border"
                            style={{ background: B.sandDark, color: B.forest, borderColor: B.border }}
                          >
                            <Map className="w-3 h-3" style={{ color: B.terra }} />
                            Dossier
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>{/* end flex flex-col gap-4 */}
              </div>

              {/* ── SUGGESTED CHIPS ── */}
              {pageContext.suggestedPrompts.length > 0 && (
                <div
                  className="px-3.5 py-2.5 border-t flex items-start gap-2 overflow-x-auto shrink-0"
                  style={{ background: B.bg, borderColor: B.border }}
                >
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest shrink-0 mt-1.5 leading-none"
                    style={{ color: B.muted }}
                  >
                    QUICK PROMPTS:
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {pageContext.suggestedPrompts.slice(0, 2).map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        disabled={isStreaming}
                        className="text-[12px] px-3 py-1.5 rounded-full border whitespace-nowrap transition-all disabled:opacity-50 shrink-0 cursor-pointer shadow-sm"
                        style={{
                          background: "#ffffff",
                          borderColor: B.border,
                          color: B.slate,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = B.terra;
                          (e.currentTarget as HTMLButtonElement).style.color = B.terra;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = B.border;
                          (e.currentTarget as HTMLButtonElement).style.color = B.slate;
                        }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── INPUT DOCK ── */}
              <div
                className="px-3.5 pt-3 pb-2.5 border-t shrink-0"
                style={{ background: "#ffffff", borderColor: B.border }}
              >
                <div
                  className="flex items-center gap-2 rounded-full px-4 py-1 border transition-all bg-white"
                  style={{
                    borderColor: B.border,
                  }}
                  onFocus={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = B.terra)
                  }
                  onBlur={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = B.border)
                  }
                >
                  {/* Attachment */}
                  <button
                    className="transition-colors p-1 shrink-0 cursor-pointer"
                    style={{ color: B.muted }}
                    title="Attach GPX or field photo"
                    type="button"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  {/* Text input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about passes, road conditions, fuel points, secret..."
                    className="flex-1 h-[46px] bg-transparent text-[14px] focus:outline-none"
                    style={{ color: B.forest }}
                  />

                  {/* Voice */}
                  <button
                    className="transition-colors p-1 shrink-0 cursor-pointer"
                    style={{ color: B.muted }}
                    title="Voice dictation"
                    type="button"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* Send / Stop */}
                  {isStreaming ? (
                    <button
                      onClick={stopStreaming}
                      aria-label="Stop generation"
                      className="w-8 h-8 rounded-full text-white flex items-center justify-center transition-all shadow-sm shrink-0 cursor-pointer"
                      style={{ background: "#dc2626" }}
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      aria-label="Send message"
                      className="w-8 h-8 rounded-full text-white flex items-center justify-center transition-all shadow-sm shrink-0 cursor-pointer disabled:opacity-30"
                      style={{ background: B.terra }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div
                  className="flex items-center justify-between text-[10px] font-mono mt-1.5 px-1"
                  style={{ color: B.muted }}
                >
                  <span>Press Enter to transmit</span>
                  <span className="flex items-center gap-1" style={{ color: "#15803d" }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#22c55e" }}
                    />
                    Offline Cache Active
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TOGGLE FAB — always visible, anchors the widget ── */}
        <motion.button
          id="raahi-chat-launcher"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full text-white flex items-center justify-center focus:outline-none shadow-[0_10px_25px_-4px_rgba(200,90,23,0.45)] transition-colors duration-200"
          style={{ background: isOpen ? B.forest : B.terra }}
          aria-label={isOpen ? "Close Raahi Travel Guide" : "Open Raahi Travel Guide"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
