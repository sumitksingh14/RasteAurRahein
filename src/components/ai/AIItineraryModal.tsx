"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X, Sparkles, MapPin, Calendar, ChevronRight,
  CheckCircle, AlertCircle, Loader2, Clock, Utensils,
  Bus, Bed, Camera, Navigation, Trash2,
} from "lucide-react";
import { useGeneratedTrips, type GeneratedTrip } from "@/components/providers/GeneratedTripsProvider";

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
}

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
  });
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [savedTrip, setSavedTrip] = useState<GeneratedTrip | null>(null);
  const [error, setError] = useState("");
  const [stageIdx, setStageIdx] = useState(0);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const stageTimer = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // ---------------------------------------------------------------------------
  const handleGenerate = async () => {
    if (!params.destination.trim()) return;
    setStep("generating");
    setError("");

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setItinerary(data.itinerary);
      setExpandedDays(new Set([1]));
      setStep("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setStep("form");
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
  // Shared styles
  // ---------------------------------------------------------------------------
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color var(--transition)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "var(--text-muted)",
    marginBottom: "0.5rem",
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1100,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          animation: "fadeIn 0.25s ease",
        }}
      />

      {/* Modal */}
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
        <div
          style={{
            width: "100%",
            maxWidth: 680,
            maxHeight: "90vh",
            overflowY: "auto",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-accent)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg), 0 0 80px rgba(201,168,76,0.12)",
            pointerEvents: "all",
            animation: "fadeInUp 0.3s ease",
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
              padding: "1.5rem 1.75rem",
              borderBottom: "1px solid var(--border)",
              flexShrink: 0,
              background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)",
              borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Sparkles size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 600, color: "var(--text-primary)" }}>
                AI Trip Planner
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Powered by Google Gemini
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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-gold)"; e.currentTarget.style.color = "var(--accent-gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
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

                {/* Highlights */}
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

                {/* Error */}
                {error && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      padding: "0.875rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(232,133,125,0.1)",
                      border: "1px solid rgba(232,133,125,0.3)",
                      color: "var(--accent-rose)",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                    }}
                  >
                    <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{error}</span>
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
                      ? "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))"
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
                  gap: "1.5rem",
                  minHeight: 300,
                }}
              >
                {/* Animated orb */}
                <div style={{ position: "relative", width: 80, height: 80 }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                      animation: "ai-spin 1.8s linear infinite",
                      opacity: 0.15,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 8,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--accent-gold), var(--accent-teal))",
                      animation: "ai-spin 1.2s linear infinite reverse",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Sparkles size={28} color="#fff" />
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.25rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Crafting your {params.days}-day trip to{" "}
                    <span style={{ color: "var(--accent-gold)" }}>{params.destination}</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-muted)",
                      minHeight: 24,
                      animation: "fadeIn 0.4s ease",
                    }}
                    key={stageIdx}
                  >
                    {GENERATING_STAGES[stageIdx]}
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: 320,
                    height: 4,
                    borderRadius: 2,
                    background: "var(--border)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg, var(--accent-gold), var(--accent-rose))",
                      borderRadius: 2,
                      animation: "ai-progress 8s linear forwards",
                    }}
                  />
                </div>

                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  This usually takes 5–15 seconds…
                </p>
              </div>
            )}

            {/* ====== STEP: PREVIEW ====== */}
            {step === "preview" && itinerary && (
              <div>
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
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button
                    onClick={handleSave}
                    id="ai-save-trip-btn"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "var(--radius-sm)",
                      background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                      color: "#fff",
                      border: "none",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      cursor: "pointer",
                    }}
                  >
                    <CheckCircle size={16} />
                    Save to My Itineraries
                  </button>
                  <button
                    onClick={() => { setStep("form"); setItinerary(null); }}
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
                    Regenerate
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
      `}</style>
    </>
  );
}
