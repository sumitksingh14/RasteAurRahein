"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X, Sparkles, MapPin, Calendar, ChevronRight,
  CheckCircle, AlertCircle, Loader2, Clock, Utensils,
  Bus, Bed, Camera, Navigation, Trash2,
} from "lucide-react";
import { useGeneratedTrips, type GeneratedTrip } from "@/components/providers/GeneratedTripsProvider";
import ExportPDFButton from "./ExportPDFButton";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TripParams {
  destination: string;
  days: number;
  style: string;
  month: string;
  highlights: string;
  budget: string;
  travelers: number;
  pace: "relaxed" | "moderate" | "packed";
  transportMode: "self-drive" | "public-transport" | "flights" | "mixed";
  dietary: "no-preference" | "vegetarian" | "vegan" | "jain" | "non-vegetarian";
  avoid: string;
  model: "gemini" | "nvidia" | "groq" | "openai";
  nvidiaModel: string;
  groqModel: string;
  openaiModel: string;
}

// NVIDIA models mirrored from the API route config
const NVIDIA_MODEL_OPTIONS = [
  { id: "nvidia/nemotron-3.5-lightning-30b-a3b", label: "Nemotron 3.5 Lightning (30B)" },
  { id: "nvidia/nemotron-3-ultra-550b-a55b",     label: "Nemotron Ultra (550B)" },
  { id: "deepseek-ai/deepseek-v4-flash-0731",    label: "DeepSeek v4 Flash" },
  { id: "nvidia/nemotron-3-nano-30b-a3b",        label: "Nemotron Nano (30B)" },
  { id: "nvidia/nemotron-3-super-120b-a12b",     label: "Nemotron Super (120B)" },
];

type Step = "form" | "generating" | "preview" | "saved";

interface GeneratedItinerary {
  title: string;
  destination: string;
  overview?: string;
  bestTimeToVisit?: string;
  totalBudgetEstimate?: string;
  tags?: string[];
  days: {
    dayNumber: number;
    title: string;
    summary?: string;
    activities: {
      time?: string;
      title: string;
      description?: string;
      notes?: string;
      type?: string;
    }[];
  }[];
}

// NDJSON events emitted by the streaming /api/generate-itinerary endpoint
type StreamEvent =
  | { type: "model"; label: string }
  | ({ type: "meta" } & Omit<GeneratedItinerary, "days">)
  | ({ type: "day" } & GeneratedItinerary["days"][number])
  | { type: "error"; message: string }
  | { type: "done" };

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const STYLES = [
  { value: "Adventure", emoji: "🏔️" },
  { value: "Culture", emoji: "🛕" },
  { value: "Relaxed", emoji: "🌴" },
  { value: "Budget", emoji: "💰" },
  { value: "Luxury", emoji: "✨" },
  { value: "Road Trip", emoji: "🛻" },
  { value: "Wildlife", emoji: "🐅" },
  { value: "Food & Culture", emoji: "🍛" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const BUDGET_OPTIONS = [
  { value: "Budget (₹1,000–₹2,000/day)", label: "Budget" },
  { value: "Mid-range (₹2,000–₹5,000/day)", label: "Mid-range" },
  { value: "Premium (₹5,000–₹10,000/day)", label: "Premium" },
  { value: "Luxury (₹10,000+/day)", label: "Luxury" },
];

const PACE_OPTIONS: { value: TripParams["pace"]; label: string }[] = [
  { value: "relaxed", label: "Relaxed" },
  { value: "moderate", label: "Moderate" },
  { value: "packed", label: "Packed" },
];

const TRANSPORT_OPTIONS: { value: TripParams["transportMode"]; label: string }[] = [
  { value: "self-drive", label: "Self-drive" },
  { value: "public-transport", label: "Public Transport" },
  { value: "flights", label: "Flights" },
  { value: "mixed", label: "Mixed" },
];

const DIETARY_OPTIONS: { value: TripParams["dietary"]; label: string }[] = [
  { value: "no-preference", label: "No preference" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "jain", label: "Jain" },
  { value: "non-vegetarian", label: "Non-vegetarian" },
];

const GENERATING_STAGES = [
  "🌍 Researching destination...",
  "🗺️  Planning routes & logistics...",
  "🍴 Curating local food & stays...",
  "📅 Writing day-by-day schedule...",
  "✨ Adding tips & hidden gems...",
  "🎒 Finalising your itinerary...",
];

const ACTIVITY_ICONS: Record<string, React.ElementType> = {
  transport: Bus,
  accommodation: Bed,
  food: Utensils,
  activity: Navigation,
  sightseeing: Camera,
};

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function ActivityIcon({ type }: { type?: string }) {
  const Icon = (type && ACTIVITY_ICONS[type]) || MapPin;
  return <Icon size={13} />;
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------
interface Props {
  onClose: () => void;
}

export default function AIItineraryModal({ onClose }: Props) {
  const { addTrip } = useGeneratedTrips();

  const [step, setStep] = useState<Step>("form");
  const [params, setParams] = useState<TripParams>({
    destination: "",
    days: 5,
    style: "Adventure",
    month: MONTHS[new Date().getMonth()],
    highlights: "",
    budget: "Mid-range (₹2,000–₹5,000/day)",
    travelers: 2,
    pace: "moderate",
    transportMode: "mixed",
    dietary: "no-preference",
    avoid: "",
    model: "gemini",
    nvidiaModel: "nvidia/nemotron-3.5-lightning-30b-a3b",
    groqModel: "openai/gpt-oss-20b",
    openaiModel: "gpt-4o",
  });
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [savedTrip, setSavedTrip] = useState<GeneratedTrip | null>(null);
  const [modelUsed, setModelUsed] = useState("");
  const [error, setError] = useState("");
  const [failedModel, setFailedModel] = useState<"gemini" | "nvidia" | "groq" | "openai" | null>(null);
  const [stageIdx, setStageIdx] = useState(0);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [isStreaming, setIsStreaming] = useState(false);
  const stageTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamAbortRef = useRef<AbortController | null>(null);

  // GROQ model list (fetched once on mount)
  const [groqModels, setGroqModels] = useState<{ id: string; ownedBy: string }[]>([]);
  useEffect(() => {
    fetch("/api/groq-models")
      .then((r) => r.json())
      .then((d) => {
        if (d.models?.length) {
          setGroqModels(d.models);
          // Set a sensible default: prefer gpt-oss-20b, else first
          const pref = d.models.find((m: any) => m.id === "openai/gpt-oss-20b");
          setParams((p) => ({ ...p, groqModel: pref?.id ?? d.models[0].id }));
        }
      })
      .catch(() => {/* non-fatal */});
  }, []);

  // Advance generation stage label every 1.4 s
  useEffect(() => {
    if (step === "generating") {
      setStageIdx(0);
      stageTimer.current = setInterval(() => {
        setStageIdx((i) => Math.min(i + 1, GENERATING_STAGES.length - 1));
      }, 1400);
    }
    return () => {
      if (stageTimer.current) clearInterval(stageTimer.current);
    };
  }, [step]);

  // Trap focus in modal and allow ESC close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Abort any in-flight generation stream when the modal unmounts
  useEffect(() => () => streamAbortRef.current?.abort(), []);

  // ---------------------------------------------------------------------------
  const handleGenerate = async () => {
    if (!params.destination.trim()) return;
    setStep("generating");
    setError("");
    setFailedModel(null);
    setItinerary(null);
    setModelUsed("");
    setIsStreaming(true);
    setExpandedDays(new Set([1]));

    streamAbortRef.current?.abort();
    const controller = new AbortController();
    streamAbortRef.current = controller;

    let gotAnyContent = false;

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...params, stream: true }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Generation failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";

        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line) continue;
          let evt: StreamEvent;
          try {
            evt = JSON.parse(line) as StreamEvent;
          } catch {
            continue; // skip malformed line
          }

          if (evt.type === "model") {
            setModelUsed(evt.label || "");
          } else if (evt.type === "meta") {
            gotAnyContent = true;
            setItinerary({
              title: evt.title,
              destination: evt.destination,
              overview: evt.overview,
              bestTimeToVisit: evt.bestTimeToVisit,
              totalBudgetEstimate: evt.totalBudgetEstimate,
              tags: evt.tags,
              days: [],
            });
            setStep("preview");
          } else if (evt.type === "day") {
            gotAnyContent = true;
            setItinerary((prev) => {
              const base: GeneratedItinerary = prev ?? {
                title: params.destination,
                destination: params.destination,
                days: [],
              };
              const days = [
                ...base.days.filter((d) => d.dayNumber !== evt.dayNumber),
                { dayNumber: evt.dayNumber, title: evt.title, summary: evt.summary, activities: evt.activities || [] },
              ].sort((a, b) => a.dayNumber - b.dayNumber);
              return { ...base, days };
            });
            setStep("preview");
          } else if (evt.type === "error") {
            throw new Error(evt.message || "Generation failed.");
          }
        }
      }

      if (!gotAnyContent) throw new Error("The AI returned no itinerary content.");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;

      const msg = err instanceof Error ? err.message : "Unknown error";
      // Classify the error for friendlier messaging
      const isQuota = /quota|rate.?limit|429|too many/i.test(msg);
      const isAuth = /api.?key|auth|403|401|invalid.?key|signed in/i.test(msg);
      const isTimeout = /timeout|network|fetch|ECONNRESET/i.test(msg);
      const isModel = /model|overload|503|unavailable|capacity/i.test(msg);

      let friendly = msg;
      if (isQuota) friendly = "This model has hit its usage limit or rate limit. Please try again in a moment or switch to another AI.";
      else if (isAuth) friendly = "API authentication failed for this model. The key may be invalid or missing.";
      else if (isTimeout) friendly = "The request timed out — the model may be experiencing high load.";
      else if (isModel) friendly = "This model is currently overloaded or unavailable. Try a different AI LLM.";

      setFailedModel(params.model);
      setError(friendly);
      // If nothing streamed in yet, bounce back to the form; otherwise keep
      // showing whatever days already arrived alongside the error.
      if (!gotAnyContent) setStep("form");
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSave = () => {
    if (!itinerary) return;
    const trip = addTrip({
      title: itinerary.title,
      destination: itinerary.destination,
      overview: itinerary.overview,
      bestTimeToVisit: itinerary.bestTimeToVisit,
      totalBudgetEstimate: itinerary.totalBudgetEstimate,
      tags: itinerary.tags,
      days: itinerary.days,
      style: params.style,
      month: params.month,
      generatedAt: new Date().toISOString(),
    });
    setSavedTrip(trip);
    setStep("saved");
  };

  const toggleDay = (n: number) =>
    setExpandedDays((prev) => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });

  // ---------------------------------------------------------------------------
  // Shared styles — Home Page Theme
  // ---------------------------------------------------------------------------
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    boxShadow: "var(--shadow-sm)",
    transition: "border-color var(--transition), box-shadow var(--transition)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "var(--text-muted)",
    marginBottom: "0.5rem",
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* Liquid Glass shimmer keyframe */}
      <style>{`
        @keyframes lg-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes lg-float-in {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1100,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Modal positioner */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AI Trip Planner"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1101,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          pointerEvents: "none",
        }}
      >
        {/* Card */}
        <div
          style={{
            width: "100%",
            maxWidth: 680,
            maxHeight: "90vh",
            overflowY: "auto",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            boxShadow: "var(--shadow-lg)",
            pointerEvents: "all",
            animation: "lg-float-in 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1.4rem 1.75rem",
              borderBottom: "1px solid var(--border)",
              flexShrink: 0,
              background: "var(--bg-secondary)",
              borderRadius: "24px 24px 0 0",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "var(--accent-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Sparkles size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
                AI Trip Planner
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                {params.model === "nvidia"
                  ? `NVIDIA · ${NVIDIA_MODEL_OPTIONS.find(m => m.id === params.nvidiaModel)?.label ?? "Nemotron"}`
                  : params.model === "groq"
                  ? "Powered by Groq"
                  : params.model === "openai"
                  ? "Powered by OpenAI"
                  : "Powered by Google Gemini"}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                marginLeft: "auto",
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all var(--transition)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-card)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "1.75rem", overflowY: "auto", flex: 1 }}>

            {/* ====== STEP: FORM ====== */}
            {step === "form" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Destination */}
                <div>
                  <label htmlFor="ai-destination" style={labelStyle}>
                    <MapPin size={12} style={{ display: "inline", marginRight: 4 }} />
                    Destination
                  </label>
                  <input
                    id="ai-destination"
                    type="text"
                    value={params.destination}
                    onChange={(e) => setParams((p) => ({ ...p, destination: e.target.value }))}
                    placeholder="e.g. Spiti Valley, Coorg, Rajasthan circuit…"
                    style={inputStyle}
                    autoFocus
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Days */}
                <div>
                  <label htmlFor="ai-days" style={labelStyle}>
                    <Calendar size={12} style={{ display: "inline", marginRight: 4 }} />
                    Duration — {params.days} {params.days === 1 ? "day" : "days"}
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <input
                      id="ai-days"
                      type="range"
                      min={1}
                      max={21}
                      value={params.days}
                      onChange={(e) => setParams((p) => ({ ...p, days: Number(e.target.value) }))}
                      style={{ flex: 1, accentColor: "var(--accent-gold)", height: 4 }}
                    />
                    <span
                      style={{
                        minWidth: 44,
                        textAlign: "center",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--accent-gold-dim)",
                        color: "var(--accent-gold)",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        border: "1px solid var(--border-accent)",
                      }}
                    >
                      {params.days}D
                    </span>
                  </div>
                </div>

                {/* Travelers + Pace row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label htmlFor="ai-travelers" style={labelStyle}>Travelers</label>
                    <input
                      id="ai-travelers"
                      type="number"
                      min={1}
                      max={20}
                      value={params.travelers}
                      onChange={(e) => setParams((p) => ({ ...p, travelers: Math.min(20, Math.max(1, Number(e.target.value) || 1)) }))}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Pace</label>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      {PACE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setParams((p) => ({ ...p, pace: opt.value }))}
                          style={{
                            flex: 1,
                            padding: "0.55rem 0.4rem",
                            borderRadius: "var(--radius-sm)",
                            border: `1px solid ${params.pace === opt.value ? "var(--accent-gold)" : "var(--border)"}`,
                            background: params.pace === opt.value ? "var(--accent-gold-dim)" : "var(--bg-card)",
                            color: params.pace === opt.value ? "var(--accent-gold)" : "var(--text-secondary)",
                            fontSize: "0.78rem",
                            fontWeight: params.pace === opt.value ? 600 : 400,
                            cursor: "pointer",
                            fontFamily: "var(--font-sans)",
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Travel Style */}
                <div>
                  <label style={labelStyle}>Travel Style</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {STYLES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setParams((p) => ({ ...p, style: s.value }))}
                        style={{
                          padding: "0.4rem 0.9rem",
                          borderRadius: "100px",
                          border: `1px solid ${params.style === s.value ? "var(--accent-gold)" : "var(--border)"}`,
                          background: params.style === s.value ? "var(--accent-gold-dim)" : "var(--bg-card)",
                          color: params.style === s.value ? "var(--accent-gold)" : "var(--text-secondary)",
                          fontSize: "0.8rem",
                          fontWeight: params.style === s.value ? 600 : 400,
                          cursor: "pointer",
                          transition: "all var(--transition)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {s.emoji} {s.value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Month + Budget row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label htmlFor="ai-month" style={labelStyle}>Travel Month</label>
                    <select
                      id="ai-month"
                      value={params.month}
                      onChange={(e) => setParams((p) => ({ ...p, month: e.target.value }))}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ai-budget" style={labelStyle}>Budget Range</label>
                    <select
                      id="ai-budget"
                      value={params.budget}
                      onChange={(e) => setParams((p) => ({ ...p, budget: e.target.value }))}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      {BUDGET_OPTIONS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                    </select>
                  </div>
                </div>

                {/* Transport Mode + Dietary row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label htmlFor="ai-transport" style={labelStyle}>Transport Mode</label>
                    <select
                      id="ai-transport"
                      value={params.transportMode}
                      onChange={(e) => setParams((p) => ({ ...p, transportMode: e.target.value as TripParams["transportMode"] }))}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      {TRANSPORT_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ai-dietary" style={labelStyle}>Dietary</label>
                    <select
                      id="ai-dietary"
                      value={params.dietary}
                      onChange={(e) => setParams((p) => ({ ...p, dietary: e.target.value as TripParams["dietary"] }))}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      {DIETARY_OPTIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                  </div>
                </div>

                {/* Must-see Highlights */}
                <div>
                  <label htmlFor="ai-highlights" style={labelStyle}>
                    Must-see highlights <span style={{ color: "var(--text-muted)", textTransform: "none", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea
                    id="ai-highlights"
                    value={params.highlights}
                    onChange={(e) => setParams((p) => ({ ...p, highlights: e.target.value }))}
                    placeholder="e.g. Chandratal Lake, monasteries, try local food, no taxis…"
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Things to avoid */}
                <div>
                  <label htmlFor="ai-avoid" style={labelStyle}>
                    Avoid <span style={{ color: "var(--text-muted)", textTransform: "none", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea
                    id="ai-avoid"
                    value={params.avoid}
                    onChange={(e) => setParams((p) => ({ ...p, avoid: e.target.value }))}
                    placeholder="e.g. Long overnight drives, crowded tourist traps, spicy food…"
                    rows={2}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* AI Model Selector */}
                <div>
                  <label style={labelStyle}>🤖 AI Model</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.6rem" }}>

                    {/* Gemini option */}
                    <button
                      id="model-select-gemini"
                      onClick={() => setParams((p) => ({ ...p, model: "gemini" }))}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "0.3rem",
                        padding: "0.85rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        border: `1.5px solid ${
                          params.model === "gemini" ? "var(--accent-gold)" : "var(--border)"
                        }`,
                        background: params.model === "gemini" ? "var(--accent-gold-dim)" : "var(--bg-card)",
                        cursor: "pointer",
                        transition: "all var(--transition)",
                        fontFamily: "var(--font-sans)",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
                        <span style={{ fontSize: "1.1rem" }}>✦</span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: params.model === "gemini" ? "var(--accent-gold)" : "var(--text-primary)",
                          }}
                        >
                          Gemini
                        </span>
                        {params.model === "gemini" && (
                          <span
                            style={{
                              marginLeft: "auto",
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              padding: "2px 5px",
                              borderRadius: "100px",
                              background: "var(--accent-gold)",
                              color: "#fff",
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                        Fast · JSON-native
                      </span>
                    </button>

                    {/* NVIDIA option */}
                    <button
                      id="model-select-nvidia"
                      onClick={() => setParams((p) => ({ ...p, model: "nvidia" }))}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "0.3rem",
                        padding: "0.85rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        border: `1.5px solid ${
                          params.model === "nvidia" ? "#76b900" : "var(--border)"
                        }`,
                        background: params.model === "nvidia" ? "rgba(118,185,0,0.08)" : "var(--bg-card)",
                        cursor: "pointer",
                        transition: "all var(--transition)",
                        fontFamily: "var(--font-sans)",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
                        <span style={{ fontSize: "1.1rem" }}>⚡</span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: params.model === "nvidia" ? "#76b900" : "var(--text-primary)",
                          }}
                        >
                          NVIDIA
                        </span>
                        {params.model === "nvidia" && (
                          <span
                            style={{
                              marginLeft: "auto",
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              padding: "2px 5px",
                              borderRadius: "100px",
                              background: "#76b900",
                              color: "#fff",
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                        Reasoning
                      </span>
                    </button>

                    {/* GROQ option */}
                    <button
                      id="model-select-groq"
                      onClick={() => setParams((p) => ({ ...p, model: "groq" }))}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "0.3rem",
                        padding: "0.85rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        border: `1.5px solid ${
                          params.model === "groq" ? "#f55036" : "var(--border)"
                        }`,
                        background: params.model === "groq" ? "rgba(245,80,54,0.07)" : "var(--bg-card)",
                        cursor: "pointer",
                        transition: "all var(--transition)",
                        fontFamily: "var(--font-sans)",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
                        <span style={{ fontSize: "1.1rem" }}>🖤</span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: params.model === "groq" ? "#f55036" : "var(--text-primary)",
                          }}
                        >
                          Groq
                        </span>
                        {params.model === "groq" && (
                          <span
                            style={{
                              marginLeft: "auto",
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              padding: "2px 5px",
                              borderRadius: "100px",
                              background: "#f55036",
                              color: "#fff",
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                        Ultra-fast
                      </span>
                    </button>

                    {/* OpenAI option */}
                    <button
                      id="model-select-openai"
                      onClick={() => setParams((p) => ({ ...p, model: "openai" }))}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "0.3rem",
                        padding: "0.85rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        border: `1.5px solid ${
                          params.model === "openai" ? "#10a37f" : "var(--border)"
                        }`,
                        background: params.model === "openai" ? "rgba(16,163,127,0.08)" : "var(--bg-card)",
                        cursor: "pointer",
                        transition: "all var(--transition)",
                        fontFamily: "var(--font-sans)",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
                        <span style={{ fontSize: "1.1rem" }}>🟢</span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: params.model === "openai" ? "#10a37f" : "var(--text-primary)",
                          }}
                        >
                          OpenAI
                        </span>
                        {params.model === "openai" && (
                          <span
                            style={{
                              marginLeft: "auto",
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              padding: "2px 5px",
                              borderRadius: "100px",
                              background: "#10a37f",
                              color: "#fff",
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                        GPT-4o · o3
                      </span>
                    </button>
                  </div>

                  {/* GROQ model sub-picker (shown only when groq is selected) */}
                  {params.model === "groq" && groqModels.length > 0 && (
                    <div style={{ marginTop: "0.6rem" }}>
                      <label
                        htmlFor="groq-model-select"
                        style={{ ...labelStyle, marginBottom: "0.4rem", color: "#f55036", fontSize: "0.68rem" }}
                      >
                        🖤 Select Groq Model
                      </label>
                      <select
                        id="groq-model-select"
                        value={params.groqModel}
                        onChange={(e) => setParams((p) => ({ ...p, groqModel: e.target.value }))}
                        style={{
                          ...inputStyle,
                          cursor: "pointer",
                          border: "1.5px solid #f55036",
                          background: "rgba(245,80,54,0.04)",
                          fontSize: "0.82rem",
                        }}
                      >
                        {groqModels.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.id} ({m.ownedBy})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* OpenAI model sub-picker (shown only when openai is selected) */}
                  {params.model === "openai" && (
                    <div style={{ marginTop: "0.6rem" }}>
                      <label
                        htmlFor="openai-model-select"
                        style={{ ...labelStyle, marginBottom: "0.4rem", color: "#10a37f", fontSize: "0.68rem" }}
                      >
                        🟢 Select OpenAI Model
                      </label>
                      <select
                        id="openai-model-select"
                        value={params.openaiModel}
                        onChange={(e) => setParams((p) => ({ ...p, openaiModel: e.target.value }))}
                        style={{
                          ...inputStyle,
                          cursor: "pointer",
                          border: "1.5px solid #10a37f",
                          background: "rgba(16,163,127,0.04)",
                          fontSize: "0.82rem",
                        }}
                      >
                        <option value="gpt-4o">GPT-4o</option>
                        <option value="gpt-4o-mini">GPT-4o Mini</option>
                        <option value="o3-mini">o3 Mini</option>
                      </select>
                    </div>
                  )}

                  {/* NVIDIA model sub-picker (shown only when nvidia is selected) */}
                  {params.model === "nvidia" && (
                    <div style={{ marginTop: "0.6rem" }}>
                      <label
                        htmlFor="nvidia-model-select"
                        style={{ ...labelStyle, marginBottom: "0.4rem", color: "#76b900", fontSize: "0.68rem" }}
                      >
                        ⚡ Select NVIDIA Model
                      </label>
                      <select
                        id="nvidia-model-select"
                        value={params.nvidiaModel}
                        onChange={(e) => setParams((p) => ({ ...p, nvidiaModel: e.target.value }))}
                        style={{
                          ...inputStyle,
                          cursor: "pointer",
                          border: "1.5px solid #76b900",
                          background: "rgba(118,185,0,0.04)",
                          fontSize: "0.82rem",
                        }}
                      >
                        {NVIDIA_MODEL_OPTIONS.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* ── LLM Error Panel ── */}
                {error && (
                  <div
                    style={{
                      borderRadius: "var(--radius-md)",
                      border: "1px solid rgba(243,139,168,0.4)",
                      background: "rgba(243,139,168,0.07)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Error header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "0.9rem 1rem 0.75rem",
                        borderBottom: error && failedModel ? "1px solid rgba(243,139,168,0.2)" : undefined,
                      }}
                    >
                      <AlertCircle size={17} color="var(--accent-rose)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--accent-rose)", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          {failedModel
                            ? `${failedModel === "gemini" ? "Google Gemini" : failedModel === "nvidia" ? "NVIDIA" : failedModel === "openai" ? "OpenAI" : "Groq"} could not generate a result`
                            : "Generation failed"}
                        </div>
                        <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                          {error}
                        </div>
                      </div>
                    </div>

                    {/* Switch model suggestion */}
                    {failedModel && (
                      <div style={{ padding: "0.85rem 1rem" }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.6rem" }}>
                          🔄 Try a different AI model
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                          {failedModel !== "gemini" && (
                            <button
                              id="ai-switch-gemini-btn"
                              onClick={() => { setParams(p => ({ ...p, model: "gemini" })); setError(""); setFailedModel(null); }}
                              style={{
                                padding: "0.4rem 0.9rem",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid var(--border-accent)",
                                background: "var(--accent-gold-dim)",
                                color: "var(--accent-gold)",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                fontFamily: "var(--font-sans)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                transition: "all var(--transition)",
                              }}
                            >
                              <Sparkles size={12} /> Google Gemini
                            </button>
                          )}
                          {failedModel !== "nvidia" && (
                            <button
                              id="ai-switch-nvidia-btn"
                              onClick={() => { setParams(p => ({ ...p, model: "nvidia" })); setError(""); setFailedModel(null); }}
                              style={{
                                padding: "0.4rem 0.9rem",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(100,220,100,0.3)",
                                background: "rgba(100,220,100,0.08)",
                                color: "#6dda6d",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                fontFamily: "var(--font-sans)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                transition: "all var(--transition)",
                              }}
                            >
                              <Sparkles size={12} /> NVIDIA
                            </button>
                          )}
                          {failedModel !== "groq" && (
                            <button
                              id="ai-switch-groq-btn"
                              onClick={() => { setParams(p => ({ ...p, model: "groq" })); setError(""); setFailedModel(null); }}
                              style={{
                                padding: "0.4rem 0.9rem",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(150,100,255,0.3)",
                                background: "rgba(150,100,255,0.08)",
                                color: "#b07fff",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                fontFamily: "var(--font-sans)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                transition: "all var(--transition)",
                              }}
                            >
                              <Sparkles size={12} /> Groq
                            </button>
                          )}
                          {failedModel !== "openai" && (
                            <button
                              id="ai-switch-openai-btn"
                              onClick={() => { setParams(p => ({ ...p, model: "openai" })); setError(""); setFailedModel(null); }}
                              style={{
                                padding: "0.4rem 0.9rem",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(16,163,127,0.3)",
                                background: "rgba(16,163,127,0.08)",
                                color: "#10a37f",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                fontFamily: "var(--font-sans)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                transition: "all var(--transition)",
                              }}
                            >
                              <Sparkles size={12} /> OpenAI
                            </button>
                          )}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                          Clicking a model above will switch your selection — then hit Generate again.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Generate button */}
                <button
                  onClick={handleGenerate}
                  disabled={!params.destination.trim()}
                  id="ai-generate-submit-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "0.9rem",
                    borderRadius: "var(--radius-sm)",
                    background: params.destination.trim()
                      ? "var(--accent-gold)"
                      : "var(--bg-card)",
                    color: params.destination.trim() ? "#fff" : "var(--text-muted)",
                    border: "none",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-sans)",
                    cursor: params.destination.trim() ? "pointer" : "not-allowed",
                    transition: "all var(--transition)",
                    letterSpacing: "0.01em",
                    marginTop: "0.25rem",
                  }}
                >
                  <Sparkles size={16} />
                  Generate {params.days}-Day Itinerary
                </button>
              </div>
            )}

            {/* ====== STEP: GENERATING ====== */}
            {step === "generating" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3rem 1rem",
                  gap: "1.75rem",
                  minHeight: 340,
                }}
              >
                <style>{`
                  .ai-loader-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 180px;
                    height: 180px;
                    font-family: "Inter", sans-serif;
                    font-size: 1.2em;
                    font-weight: 300;
                    color: var(--text-primary);
                    border-radius: 50%;
                    background-color: transparent;
                    user-select: none;
                  }

                  .ai-loader {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    border-radius: 50%;
                    background-color: transparent;
                    animation: ai-loader-rotate 2s linear infinite;
                    z-index: 0;
                  }

                  @keyframes ai-loader-rotate {
                    0% {
                      transform: rotate(90deg);
                      box-shadow:
                        0 10px 20px 0 #fff inset,
                        0 20px 30px 0 #ad5fff inset,
                        0 60px 60px 0 #471eec inset;
                    }
                    50% {
                      transform: rotate(270deg);
                      box-shadow:
                        0 10px 20px 0 #fff inset,
                        0 20px 10px 0 #d60a47 inset,
                        0 40px 60px 0 #311e80 inset;
                    }
                    100% {
                      transform: rotate(450deg);
                      box-shadow:
                        0 10px 20px 0 #fff inset,
                        0 20px 30px 0 #ad5fff inset,
                        0 60px 60px 0 #471eec inset;
                    }
                  }

                  .ai-loader-letter {
                    display: inline-block;
                    opacity: 0.4;
                    transform: translateY(0);
                    animation: ai-loader-letter-anim 2s infinite;
                    z-index: 1;
                    border-radius: 50ch;
                    border: none;
                  }

                  .ai-loader-letter:nth-child(1)  { animation-delay: 0s; }
                  .ai-loader-letter:nth-child(2)  { animation-delay: 0.1s; }
                  .ai-loader-letter:nth-child(3)  { animation-delay: 0.2s; }
                  .ai-loader-letter:nth-child(4)  { animation-delay: 0.3s; }
                  .ai-loader-letter:nth-child(5)  { animation-delay: 0.4s; }
                  .ai-loader-letter:nth-child(6)  { animation-delay: 0.5s; }
                  .ai-loader-letter:nth-child(7)  { animation-delay: 0.6s; }
                  .ai-loader-letter:nth-child(8)  { animation-delay: 0.7s; }
                  .ai-loader-letter:nth-child(9)  { animation-delay: 0.8s; }
                  .ai-loader-letter:nth-child(10) { animation-delay: 0.9s; }

                  @keyframes ai-loader-letter-anim {
                    0%,  100% { opacity: 0.4; transform: translateY(0); }
                    20%       { opacity: 1;   transform: scale(1.15);   }
                    40%       { opacity: 0.7; transform: translateY(0); }
                  }
                `}</style>

                {/* The loader — 50% = 90px */}
                <div className="ai-loader-wrapper" style={{ width: 90, height: 90, fontSize: "0.6em" }}>
                  <span className="ai-loader-letter">G</span>
                  <span className="ai-loader-letter">e</span>
                  <span className="ai-loader-letter">n</span>
                  <span className="ai-loader-letter">e</span>
                  <span className="ai-loader-letter">r</span>
                  <span className="ai-loader-letter">a</span>
                  <span className="ai-loader-letter">t</span>
                  <span className="ai-loader-letter">i</span>
                  <span className="ai-loader-letter">n</span>
                  <span className="ai-loader-letter">g</span>
                  <div className="ai-loader" />
                </div>

                {/* Stage label */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Crafting your {params.days}-day trip to{" "}
                    <span style={{ color: "var(--accent-gold)" }}>{params.destination}</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-muted)",
                      minHeight: 24,
                      animation: "fadeIn 0.4s ease",
                    }}
                    key={stageIdx}
                  >
                    {GENERATING_STAGES[stageIdx]}
                  </div>
                </div>

                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  This usually takes 5–15 seconds…
                </p>
              </div>
            )}


            {/* ====== STEP: PREVIEW ====== */}
            {step === "preview" && itinerary && (
              <div>
                {/* Live streaming banner — shown while days are still arriving */}
                {isStreaming && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.6rem 0.9rem",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--accent-gold-dim)",
                      border: "1px solid var(--border-accent)",
                      marginBottom: "1rem",
                      fontSize: "0.8rem",
                      color: "var(--accent-gold)",
                      fontWeight: 600,
                    }}
                  >
                    <Loader2 size={14} style={{ animation: "ai-spin 1s linear infinite" }} />
                    Generating day {Math.min(itinerary.days.length + 1, params.days)} of {params.days}…
                  </div>
                )}

                {/* Trip header */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {itinerary.tags?.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {itinerary.title}
                  </h2>
                  {modelUsed && (
                    <div style={{ marginBottom: "0.5rem" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "0.25rem 0.65rem",
                          borderRadius: "100px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          background:
                            params.model === "nvidia"
                              ? "rgba(118,185,0,0.1)"
                              : params.model === "groq"
                              ? "rgba(245,80,54,0.08)"
                              : "var(--accent-gold-dim)",
                          border: `1px solid ${
                            params.model === "nvidia"
                              ? "rgba(118,185,0,0.3)"
                              : params.model === "groq"
                              ? "rgba(245,80,54,0.3)"
                              : "var(--border-accent)"
                          }`,
                          color:
                            params.model === "nvidia"
                              ? "#76b900"
                              : params.model === "groq"
                              ? "#f55036"
                              : "var(--accent-gold)",
                        }}
                      >
                        {params.model === "nvidia" ? "⚡" : params.model === "groq" ? "🖤" : "✦"} Generated by {modelUsed}
                      </span>
                    </div>
                  )}
                  {itinerary.overview && (
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                      {itinerary.overview}
                    </p>
                  )}

                  {/* Meta chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {itinerary.bestTimeToVisit && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "0.3rem 0.7rem",
                          borderRadius: "100px",
                          fontSize: "0.75rem",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <Calendar size={11} /> {itinerary.bestTimeToVisit}
                      </span>
                    )}
                    {itinerary.totalBudgetEstimate && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "0.3rem 0.7rem",
                          borderRadius: "100px",
                          fontSize: "0.75rem",
                          background: "var(--accent-gold-dim)",
                          border: "1px solid var(--border-accent)",
                          color: "var(--accent-gold)",
                          fontWeight: 500,
                        }}
                      >
                        {itinerary.totalBudgetEstimate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Day-by-day */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {itinerary.days.map((day) => (
                    <div
                      key={day.dayNumber}
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        transition: "border-color var(--transition)",
                      }}
                    >
                      {/* Day header — clickable to expand */}
                      <button
                        onClick={() => toggleDay(day.dayNumber)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.875rem 1.25rem",
                          background: "var(--bg-card)",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "var(--font-sans)",
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "var(--radius-sm)",
                            background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          D{day.dayNumber}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                            {day.title}
                          </div>
                          {day.summary && !expandedDays.has(day.dayNumber) && (
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                              {day.summary}
                            </div>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--text-muted)",
                            marginRight: "0.25rem",
                          }}
                        >
                          {day.activities.length} stops
                        </span>
                        <ChevronRight
                          size={16}
                          style={{
                            color: "var(--text-muted)",
                            transform: expandedDays.has(day.dayNumber) ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform var(--transition)",
                            flexShrink: 0,
                          }}
                        />
                      </button>

                      {/* Activities */}
                      {expandedDays.has(day.dayNumber) && (
                        <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid var(--border)" }}>
                          {day.summary && (
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: "0.75rem", fontStyle: "italic" }}>
                              {day.summary}
                            </p>
                          )}
                          {day.activities.map((activity, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                gap: "0.75rem",
                                padding: "0.6rem 0",
                                borderBottom: i < day.activities.length - 1 ? "1px solid var(--border)" : "none",
                              }}
                            >
                              {activity.time && (
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "3px",
                                    fontSize: "0.72rem",
                                    color: "var(--accent-gold)",
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                    minWidth: 68,
                                    paddingTop: 2,
                                  }}
                                >
                                  <Clock size={10} />
                                  {activity.time}
                                </span>
                              )}
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    marginBottom: activity.description ? "3px" : 0,
                                  }}
                                >
                                  <span style={{ color: "var(--accent-gold)", flexShrink: 0 }}>
                                    <ActivityIcon type={activity.type} />
                                  </span>
                                  {activity.title}
                                </div>
                                {activity.description && (
                                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55, margin: "2px 0 0" }}>
                                    {activity.description}
                                  </p>
                                )}
                                {activity.notes && (
                                  <div
                                    style={{
                                      marginTop: "4px",
                                      padding: "0.3rem 0.6rem",
                                      borderRadius: "var(--radius-sm)",
                                      background: "var(--accent-gold-dim)",
                                      border: "1px solid var(--border-accent)",
                                      fontSize: "0.72rem",
                                      color: "var(--accent-gold)",
                                      lineHeight: 1.5,
                                    }}
                                  >
                                    💡 {activity.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Skeleton placeholders for days not yet streamed in */}
                  {isStreaming && Array.from({ length: Math.max(0, params.days - itinerary.days.length) }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.875rem 1.25rem",
                        border: "1px dashed var(--border)",
                        borderRadius: "var(--radius-md)",
                      }}
                    >
                      <span
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "var(--radius-sm)",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          height: 10,
                          borderRadius: 4,
                          background: "var(--bg-card)",
                          animation: "ai-skel-pulse 1.4s ease-in-out infinite",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button
                    onClick={handleSave}
                    disabled={isStreaming}
                    id="ai-save-trip-btn"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "var(--radius-sm)",
                      background: isStreaming ? "var(--bg-card)" : "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                      color: isStreaming ? "var(--text-muted)" : "#fff",
                      border: "none",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      cursor: isStreaming ? "not-allowed" : "pointer",
                    }}
                  >
                    <CheckCircle size={16} />
                    {isStreaming ? "Generating…" : "Save to My Itineraries"}
                  </button>
                  
                  {!isStreaming && (
                    <ExportPDFButton 
                      trip={{
                        id: "preview",
                        title: itinerary.title,
                        destination: itinerary.destination,
                        overview: itinerary.overview,
                        bestTimeToVisit: itinerary.bestTimeToVisit,
                        totalBudgetEstimate: itinerary.totalBudgetEstimate,
                        tags: itinerary.tags,
                        days: itinerary.days,
                        style: params.style,
                        month: params.month,
                        generatedAt: new Date().toISOString(),
                      }} 
                      variant="outline" 
                    />
                  )}

                  <button
                    onClick={() => { streamAbortRef.current?.abort(); setStep("form"); setItinerary(null); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "0.8rem 1.25rem",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--bg-card)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      fontSize: "0.85rem",
                      fontFamily: "var(--font-sans)",
                      cursor: "pointer",
                    }}
                  >
                    {isStreaming ? "Cancel" : "Regenerate"}
                  </button>
                </div>
              </div>
            )}

            {/* ====== STEP: SAVED ====== */}
            {step === "saved" && savedTrip && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "2rem 1rem",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent-teal), var(--accent-gold))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle size={36} color="#fff" />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.3rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Itinerary Saved!
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 380 }}>
                    <strong style={{ color: "var(--accent-gold)" }}>{savedTrip.title}</strong> has been added to your itineraries library.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
                  <Link
                    href="/itineraries"
                    onClick={onClose}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "var(--radius-sm)",
                      background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                      color: "#fff",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      textDecoration: "none",
                    }}
                  >
                    <Navigation size={15} />
                    View All Itineraries
                  </Link>
                  <button
                    onClick={() => { setStep("form"); setItinerary(null); setSavedTrip(null); }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--bg-card)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      fontSize: "0.85rem",
                      fontFamily: "var(--font-sans)",
                      cursor: "pointer",
                    }}
                  >
                    <Sparkles size={14} />
                    Plan Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ai-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ai-progress {
          from { width: 0%; }
          to   { width: 95%; }
        }
        @keyframes ai-skel-pulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.7; }
        }
      `}</style>
    </>
  );
}
