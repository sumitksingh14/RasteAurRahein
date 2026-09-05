"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Sparkles, Loader2,
  Mountain, Wallet, CheckCircle, AlertCircle,
  Map, ChevronRight, Clock, Utensils, Bus, Bed, Camera,
  Users, User, Calendar, LogIn, Download, FileText,
} from "lucide-react";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import { buildGoogleMapsUrl } from "@/lib/googleMapsRoute";
import ExportPDFButton from "@/components/ai/ExportPDFButton";
import { useGeneratedTrips } from "@/components/providers/GeneratedTripsProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import type { MapPin } from "@/lib/types";

// Lazy-load map (browser only)
const MapView = dynamic(() => import("@/components/ui/MapView"), { ssr: false });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface GeneratedActivity {
  time?: string;
  title: string;
  description?: string;
  notes?: string;
  type?: string;
}

interface GeneratedDay {
  dayNumber: number;
  title: string;
  summary?: string;
  activities: GeneratedActivity[];
}

interface GeneratedItinerary {
  title: string;
  destination: string;
  overview?: string;
  bestTimeToVisit?: string;
  totalBudgetEstimate?: string;
  tags?: string[];
  days: GeneratedDay[];
}

type StreamEvent =
  | { type: "model"; label: string }
  | ({ type: "meta" } & Omit<GeneratedItinerary, "days">)
  | ({ type: "day" } & GeneratedDay)
  | { type: "error"; message: string }
  | { type: "done" };

const ACTIVITY_ICONS: Record<string, React.ElementType> = {
  transport: Bus,
  accommodation: Bed,
  food: Utensils,
  activity: Camera,
  sightseeing: Mountain,
};

const DEMO_PINS: MapPin[] = [
  { lat: 32.24, lng: 77.19, label: "Manali", day: 1 },
  { lat: 32.32, lng: 77.16, label: "Solang Valley", day: 2 },
  { lat: 32.41, lng: 77.14, label: "Dhundi", day: 3 },
  { lat: 32.36, lng: 77.07, label: "Beas Kund", day: 4 },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ---------------------------------------------------------------------------
// Topo background SVG pattern
// ---------------------------------------------------------------------------
const TOPO_PATTERN = `
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
  <defs><filter id='blur'><feGaussianBlur stdDeviation='0.5'/></filter></defs>
  <rect width='400' height='400' fill='none'/>
  <g stroke='rgba(255,255,255,0.12)' fill='none' stroke-width='1' filter='url(#blur)'>
    <path d='M0,200 Q100,150 200,200 T400,200'/>
    <path d='M0,180 Q100,130 200,180 T400,180'/>
    <path d='M0,220 Q100,170 200,220 T400,220'/>
    <path d='M0,160 Q100,110 200,160 T400,160'/>
    <path d='M0,240 Q100,190 200,240 T400,240'/>
    <path d='M0,140 Q80,100 200,140 T400,140'/>
    <path d='M0,260 Q120,210 200,260 T400,260'/>
    <path d='M0,120 Q90,80 200,120 T400,120'/>
    <path d='M0,280 Q110,230 200,280 T400,280'/>
    <path d='M0,300 Q100,260 200,300 T400,300'/>
    <path d='M0,320 Q120,280 200,320 T400,320'/>
    <path d='M0,100 Q100,60 200,100 T400,100'/>
    <path d='M0,80 Q90,40 200,80 T400,80'/>
    <path d='M0,340 Q110,300 200,340 T400,340'/>
    <path d='M0,60 Q120,20 200,60 T400,60'/>
    <path d='M0,360 Q100,320 200,360 T400,360'/>
    <path d='M0,380 Q90,340 200,380 T400,380'/>
    <path d='M0,40 Q110,0 200,40 T400,40'/>
    <path d='M50,0 Q50,100 50,200 T50,400'/>
    <path d='M100,0 Q120,100 100,200 T100,400'/>
    <path d='M150,0 Q130,100 150,200 T150,400'/>
    <path d='M200,0 Q200,100 200,200 T200,400'/>
    <path d='M250,0 Q270,100 250,200 T250,400'/>
    <path d='M300,0 Q280,100 300,200 T300,400'/>
    <path d='M350,0 Q330,100 350,200 T350,400'/>
  </g>
</svg>`;

const TOPO_BG = `url("data:image/svg+xml,${encodeURIComponent(TOPO_PATTERN)}")`;

// ---------------------------------------------------------------------------
// SmoothSlider helper component
// ---------------------------------------------------------------------------
function SmoothSlider({
  value, onChange, leftIcon: LeftIcon, rightIcon: RightIcon,
  leftLabel, rightLabel, id, min = 0, max = 100, step = 1,
  showValue = false, valueSuffix = "",
}: {
  value: number; onChange: (v: number) => void;
  leftIcon: React.ElementType; rightIcon: React.ElementType;
  leftLabel: string; rightLabel: string; id: string;
  min?: number; max?: number; step?: number;
  showValue?: boolean; valueSuffix?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <LeftIcon size={22} style={{ color: "#f5c87a", flexShrink: 0 }} />
      <div style={{ flex: 1, position: "relative" }}>
        {/* Floating value tooltip */}
        {showValue && (
          <div style={{
            position: "absolute",
            left: `${pct}%`,
            top: -30,
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #f5a623, #e05c20)",
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
            transition: "left 0.1s cubic-bezier(0.25,0.46,0.45,0.94)",
            zIndex: 2,
          }}>
            {value}{valueSuffix}
            <div style={{
              position: "absolute",
              bottom: -4,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "4px solid #e05c20",
            }}/>
          </div>
        )}

        {/* Custom track */}
        <div style={{ position: "relative", height: 24, display: "flex", alignItems: "center" }}>
          {/* Track background */}
          <div style={{
            position: "absolute",
            left: 0, right: 0,
            height: 6,
            borderRadius: 3,
            background: "rgba(255,255,255,0.18)",
            overflow: "hidden",
          }}>
            {/* Filled portion with smooth transition */}
            <div style={{
              height: "100%",
              width: `${pct}%`,
              background: "linear-gradient(90deg, #f5a623, #e05c20)",
              borderRadius: 3,
              transition: "width 0.1s cubic-bezier(0.25,0.46,0.45,0.94)",
            }} />
          </div>
          {/* Native range input (transparent, overlaid) */}
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="planner-range"
            style={{
              position: "absolute",
              left: 0,
              width: "100%",
              height: 6,
              borderRadius: 3,
              appearance: "none",
              background: "transparent",
              cursor: "pointer",
              outline: "none",
              margin: 0,
              zIndex: 1,
            }}
          />
        </div>
      </div>
      <RightIcon size={22} style={{ color: "#f5c87a", flexShrink: 0 }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ExportDropdown component
// ---------------------------------------------------------------------------
function ExportDropdown({ itinerary, streamingDays, adventureLevel }: {
  itinerary: GeneratedItinerary | null;
  streamingDays: GeneratedDay[];
  adventureLevel: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const handleExportText = () => {
    if (!itinerary) return;
    const lines: string[] = [];
    lines.push(`# ${itinerary.title}`);
    lines.push(`Destination: ${itinerary.destination}`);
    if (itinerary.overview) lines.push(`\n${itinerary.overview}`);
    if (itinerary.bestTimeToVisit) lines.push(`Best Time: ${itinerary.bestTimeToVisit}`);
    if (itinerary.totalBudgetEstimate) lines.push(`Budget: ${itinerary.totalBudgetEstimate}`);
    lines.push("");
    for (const day of streamingDays) {
      lines.push(`## Day ${day.dayNumber}: ${day.title}`);
      if (day.summary) lines.push(day.summary);
      for (const act of day.activities || []) {
        const time = act.time ? `[${act.time}] ` : "";
        lines.push(`  - ${time}${act.title}`);
        if (act.description) lines.push(`    ${act.description}`);
        if (act.notes) lines.push(`    Note: ${act.notes}`);
      }
      lines.push("");
    }
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(itinerary.title || "itinerary").replace(/\s+/g, "_").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const trip = {
    id: "planner-preview",
    title: itinerary?.title ?? "My Trip",
    destination: itinerary?.destination ?? "",
    overview: itinerary?.overview,
    bestTimeToVisit: itinerary?.bestTimeToVisit,
    totalBudgetEstimate: itinerary?.totalBudgetEstimate,
    tags: itinerary?.tags,
    days: streamingDays,
    style: adventureLevel > 60 ? "Adventure" : "Relaxed",
    month: MONTHS[new Date().getMonth()],
    generatedAt: new Date().toISOString(),
  };

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        id="ai-planner-export-btn"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.7rem 1rem",
          borderRadius: 10,
          border: "1px solid rgba(245,166,35,0.45)",
          background: "linear-gradient(135deg, rgba(245,166,35,0.12), rgba(224,92,32,0.12))",
          color: "#f5c87a",
          fontSize: "0.82rem",
          fontWeight: 600,
          fontFamily: "var(--font-sans)",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <Download size={14} /> Export ▾
      </button>
      {open && (
        <div
          className="export-dropdown"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            right: 0,
            minWidth: 170,
            background: "#1a2440",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
            overflow: "hidden",
            zIndex: 100,
          }}
        >
          <div style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <ExportPDFButton trip={trip} variant="ghost" />
          </div>
          <button
            onClick={handleExportText}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              width: "100%",
              padding: "0.65rem 1rem",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.82rem",
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,166,35,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <FileText size={13} /> Export as Text
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main AIPlanner component
// ---------------------------------------------------------------------------
export default function AIPlanner() {
  const { addTrip } = useGeneratedTrips();
  const { user, loading: authLoading, openAuthModal } = useAuth();

  // Form state
  const [prompt, setPrompt] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [adventureLevel, setAdventureLevel] = useState(50);
  const [budgetLevel, setBudgetLevel] = useState(40);
  const [numberOfDays, setNumberOfDays] = useState(5);
  const [origin, setOrigin] = useState("");

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [streamingDays, setStreamingDays] = useState<GeneratedDay[]>([]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Derived map pins
  const mapPins: MapPin[] = streamingDays.flatMap((d) =>
    (d.activities ?? [])
      .filter((a: any) => a.location?.lat && a.location?.lng)
      .map((a: any) => ({
        lat: a.location.lat,
        lng: a.location.lng,
        label: a.location.name,
        day: d.dayNumber,
      }))
  );

  useEffect(() => () => {
    abortRef.current?.abort();
    if (progressTimer.current) clearInterval(progressTimer.current);
  }, []);

  function buildParams() {
    const monthMatch = MONTHS.find((m) =>
      prompt.toLowerCase().includes(m.toLowerCase())
    );
    const paceLabel =
      adventureLevel < 33 ? "relaxed" : adventureLevel < 66 ? "moderate" : "packed";
    const budgetLabel =
      budgetLevel < 25
        ? "Budget (Rs.1,000-Rs.2,000/day)"
        : budgetLevel < 50
        ? "Mid-range (Rs.2,000-Rs.5,000/day)"
        : budgetLevel < 75
        ? "Premium (Rs.5,000-Rs.10,000/day)"
        : "Luxury (Rs.10,000+/day)";

    return {
      destination: prompt,
      days: numberOfDays,
      style: adventureLevel > 60 ? "Adventure" : "Relaxed",
      month: monthMatch ?? MONTHS[new Date().getMonth()],
      travelers: isGroup ? 4 : 1,
      pace: paceLabel as "relaxed" | "moderate" | "packed",
      budget: budgetLabel,
      transportMode: "mixed" as const,
      dietary: "no-preference" as const,
      highlights: prompt,
      avoid: "",
      model: "gemini" as const,
      nvidiaModel: "nvidia/nemotron-3.5-lightning-30b-a3b",
      groqModel: "openai/gpt-oss-20b",
      openaiModel: "gpt-4o",
      stream: true,
      origin,
    };
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setGenerating(true);
    setError("");
    setSaved(false);
    setItinerary(null);
    setStreamingDays([]);
    setProgress(0);

    if (progressTimer.current) clearInterval(progressTimer.current);
    progressTimer.current = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 4, 88));
    }, 500);

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildParams()),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) throw new Error(`Generation failed (${res.status})`);

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
          try { evt = JSON.parse(line); } catch { continue; }

          if (evt.type === "meta") {
            setItinerary({
              title: evt.title,
              destination: evt.destination,
              overview: evt.overview,
              bestTimeToVisit: evt.bestTimeToVisit,
              totalBudgetEstimate: evt.totalBudgetEstimate,
              tags: evt.tags,
              days: [],
            });
          } else if (evt.type === "day") {
            setStreamingDays((prev) => {
              const next = [
                ...prev.filter((d) => d.dayNumber !== evt.dayNumber),
                { dayNumber: evt.dayNumber, title: evt.title, summary: evt.summary, activities: evt.activities || [] },
              ].sort((a, b) => a.dayNumber - b.dayNumber);
              return next;
            });
          } else if (evt.type === "error") {
            throw new Error(evt.message);
          }
        }
      }

      setProgress(100);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Generation failed. Please try again.");
    } finally {
      setGenerating(false);
      if (progressTimer.current) clearInterval(progressTimer.current);
    }
  };

  const handleSave = () => {
    if (!itinerary || streamingDays.length === 0) return;
    addTrip({
      title: itinerary.title,
      destination: itinerary.destination,
      overview: itinerary.overview,
      bestTimeToVisit: itinerary.bestTimeToVisit,
      totalBudgetEstimate: itinerary.totalBudgetEstimate,
      tags: itinerary.tags,
      days: streamingDays,
      style: adventureLevel > 60 ? "Adventure" : "Relaxed",
      month: MONTHS[new Date().getMonth()],
      generatedAt: new Date().toISOString(),
    });
    setSaved(true);
  };

  const mapsUrl =
    origin && itinerary?.destination
      ? buildGoogleMapsUrl(origin, itinerary.destination)
      : itinerary?.destination
      ? buildGoogleMapsUrl(itinerary.destination, itinerary.destination)
      : null;

  const hasResult = streamingDays.length > 0;
  const previewTitle = itinerary?.title ?? (generating ? "Generating..." : "Live Preview");
  const daysLabel = `${numberOfDays} ${numberOfDays === 1 ? "Day" : "Days"}`;

  return (
    <>
      <style>{`
        /* Smooth slider thumb */
        .planner-range {
          -webkit-appearance: none;
          appearance: none;
        }
        .planner-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5a623, #e05c20);
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          cursor: grab;
          transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
          margin-top: -8px;
        }
        .planner-range::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.18);
          box-shadow: 0 2px 14px rgba(0,0,0,0.5), 0 0 0 6px rgba(245,166,35,0.22);
        }
        .planner-range:focus::-webkit-slider-thumb {
          box-shadow: 0 2px 8px rgba(0,0,0,0.4), 0 0 0 4px rgba(245,166,35,0.3);
        }
        .planner-range::-moz-range-thumb {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5a623, #e05c20);
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          cursor: grab;
          transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
        }
        .planner-range::-moz-range-thumb:active {
          cursor: grabbing;
          transform: scale(1.18);
        }
        .planner-range::-webkit-slider-runnable-track {
          background: transparent;
          height: 6px;
        }
        .planner-range::-moz-range-track {
          background: transparent;
          height: 6px;
          border-radius: 3px;
        }
        /* Green glowing dot */
        .day-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px #4ade80;
          flex-shrink: 0;
          margin-top: 3px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .planner-spin { animation: spin 1s linear infinite; }
        @keyframes planner-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .planner-pulse { animation: planner-pulse 1.4s ease-in-out infinite; }
        @keyframes planner-slide-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .planner-day-in { animation: planner-slide-in 0.35s ease forwards; }
        @keyframes planner-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .export-dropdown { animation: planner-slide-in 0.18s ease forwards; }
        @keyframes login-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,166,35,0); }
          50% { box-shadow: 0 0 0 4px rgba(245,166,35,0.2); }
        }
        .login-banner { animation: login-glow 2.5s ease-in-out infinite; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          paddingTop: "var(--nav-height)",
          background: `#6b7f5e ${TOPO_BG}`,
          backgroundSize: "400px 400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: `calc(var(--nav-height) + 2rem) 1rem 3rem`,
        }}
      >
        {/* Page title */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            marginBottom: "2rem",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}
        >
          AI Itinerary Planner
        </h1>

        {/* Two-panel grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            width: "100%",
            maxWidth: 1080,
          }}
          className="ai-planner-grid"
        >
          {/* LEFT PANEL */}
          <div
            style={{
              background: "linear-gradient(160deg, #8B3D1F 0%, #6e2e12 100%)",
              borderRadius: 20,
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "#f5c87a",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Craft Your Journey
            </h2>

            {/* Starting City with LocationAutocomplete */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: 14 }}>📍</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Starting City
                </span>
              </div>
              <LocationAutocomplete
                id="ai-planner-origin"
                value={origin}
                onChange={setOrigin}
                onSelect={(s) => setOrigin(s.label)}
                placeholder="e.g. Mumbai, Delhi, Bengaluru..."
                theme="dark"
                showGpsButton
              />
            </div>

            {/* Destination with LocationAutocomplete */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: 14 }}>🗺️</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Destination
                </span>
              </div>
              <LocationAutocomplete
                id="ai-planner-destination"
                value={prompt}
                onChange={setPrompt}
                onSelect={(s) => setPrompt(s.label)}
                placeholder="e.g. Manali, Coorg, Jaipur..."
                theme="dark"
                showGpsButton={false}
              />
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.38)", marginTop: "0.4rem" }}>
                Add more trip details below (optional)
              </p>
              {/* Additional prompt textarea */}
              <textarea
                id="ai-planner-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Budget trek in Himachal for June — Solang Valley, Beas Kund, alpine camping..."
                rows={3}
                style={{
                  width: "100%",
                  marginTop: "0.45rem",
                  padding: "0.85rem 1rem",
                  borderRadius: 12,
                  border: "none",
                  background: "rgba(255,255,255,0.92)",
                  color: "#2d1a0e",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-sans)",
                  resize: "vertical",
                  outline: "none",
                  lineHeight: 1.6,
                  boxSizing: "border-box",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate();
                }}
              />
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: "0.3rem" }}>
                Cmd+Enter to generate
              </p>
            </div>

            {/* Generate button */}
            <button
              id="ai-planner-generate-btn"
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                padding: "0.9rem 1.5rem",
                borderRadius: 12,
                border: "none",
                background: !prompt.trim() || generating ? "rgba(255,255,255,0.2)" : "#1C2B4A",
                color: !prompt.trim() || generating ? "rgba(255,255,255,0.4)" : "#fff",
                fontSize: "1rem",
                fontWeight: 700,
                fontFamily: "var(--font-sans)",
                cursor: !prompt.trim() || generating ? "not-allowed" : "pointer",
                transition: "all 0.25s",
                letterSpacing: "0.01em",
              }}
            >
              {generating ? (
                <><Loader2 size={18} className="planner-spin" /> Generating...</>
              ) : (
                <><Sparkles size={18} /> Generate Itinerary</>
              )}
            </button>

            {/* Solo / Group */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
                    Solo / Group
                  </div>
                  <button
                    id="ai-planner-solo-toggle"
                    onClick={() => setIsGroup((g) => !g)}
                    style={{ display: "flex", alignItems: "center", gap: 10, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <div style={{
                      width: 52, height: 28, borderRadius: 14,
                      background: isGroup ? "#f5a623" : "rgba(255,255,255,0.25)",
                      position: "relative",
                      transition: "background 0.25s",
                      flexShrink: 0,
                    }}>
                      <div style={{
                        position: "absolute",
                        top: 4,
                        left: isGroup ? 28 : 4,
                        width: 20, height: 20,
                        borderRadius: "50%",
                        background: "#fff",
                        transition: "left 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      }} />
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>
                      {isGroup ? "Group" : "Solo"}
                    </span>
                  </button>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <User size={28} style={{ color: isGroup ? "rgba(255,255,255,0.4)" : "#f5c87a" }} />
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>vs</span>
                  <Users size={28} style={{ color: isGroup ? "#f5c87a" : "rgba(255,255,255,0.4)" }} />
                </div>
              </div>
            </div>

            {/* Number of Days Slider */}
            <div>
              <div style={{
                fontSize: "1rem", fontWeight: 700, color: "#fff",
                marginBottom: "1rem",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Calendar size={18} style={{ color: "#f5c87a" }} />
                  Number of Days
                </div>
                <span style={{
                  background: "linear-gradient(135deg, #f5a623, #e05c20)",
                  color: "#fff",
                  fontSize: "0.78rem", fontWeight: 700,
                  padding: "3px 12px", borderRadius: 20,
                  minWidth: 56, textAlign: "center",
                  transition: "all 0.2s",
                }}>
                  {daysLabel}
                </span>
              </div>
              <SmoothSlider
                id="ai-days-slider"
                value={numberOfDays}
                onChange={setNumberOfDays}
                min={1}
                max={21}
                step={1}
                leftIcon={() => <span style={{ fontSize: 18 }}>1️⃣</span>}
                rightIcon={() => <span style={{ fontSize: 18 }}>📅</span>}
                leftLabel="1 Day"
                rightLabel="21 Days"
                showValue
                valueSuffix=""
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>1 Day</span>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>21 Days</span>
              </div>
            </div>

            {/* Adventure Level */}
            <div>
              <div style={{
                fontSize: "1rem", fontWeight: 700, color: "#fff",
                marginBottom: "1rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <Mountain size={18} style={{ color: "#f5c87a" }} />
                Adventure Level
                <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                  {adventureLevel < 33 ? "Relaxed" : adventureLevel < 66 ? "Moderate" : "Packed"}
                </span>
              </div>
              <SmoothSlider
                id="ai-adventure-level"
                value={adventureLevel}
                onChange={setAdventureLevel}
                leftIcon={() => <span style={{ fontSize: 20 }}>🚶</span>}
                rightIcon={() => <span style={{ fontSize: 20 }}>🧗</span>}
                leftLabel="Low"
                rightLabel="High"
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>Relaxed</span>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>Packed</span>
              </div>
            </div>

            {/* Budget */}
            <div>
              <div style={{
                fontSize: "1rem", fontWeight: 700, color: "#fff",
                marginBottom: "1rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <Wallet size={18} style={{ color: "#f5c87a" }} />
                Budget
                <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                  {budgetLevel < 25 ? "Budget" : budgetLevel < 50 ? "Mid-range" : budgetLevel < 75 ? "Premium" : "Luxury"}
                </span>
              </div>
              <SmoothSlider
                id="ai-budget-level"
                value={budgetLevel}
                onChange={setBudgetLevel}
                leftIcon={() => <span style={{ fontSize: 20 }}>💰</span>}
                rightIcon={() => <span style={{ fontSize: 20 }}>💎</span>}
                leftLabel="Economy"
                rightLabel="Luxury"
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>Economy</span>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>Luxury</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                display: "flex", gap: "0.5rem", alignItems: "flex-start",
                padding: "0.75rem 1rem", borderRadius: 10,
                background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
              }}>
                <AlertCircle size={16} style={{ color: "#f87171", flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: "0.82rem", color: "#fca5a5", lineHeight: 1.5 }}>{error}</p>
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div
            style={{
              background: "linear-gradient(160deg, #1C2B4A 0%, #111827 100%)",
              borderRadius: 20,
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
              minHeight: 480,
            }}
          >
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.35rem", fontWeight: 800,
              color: "#f5c87a", letterSpacing: "-0.01em", lineHeight: 1.2,
            }}>
              {hasResult && itinerary?.title
                ? `📍 ${itinerary.title}`
                : previewTitle === "Generating..."
                ? "🗺️ Generating..."
                : "Live Preview"}
            </h2>

            {/* Map */}
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
              <MapView
                pins={mapPins.length > 0 ? mapPins : DEMO_PINS}
                height={200}
                zoom={mapPins.length > 0 ? 9 : 10}
              />
            </div>

            {/* Status / day list */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {generating && streamingDays.length === 0 && (
                <div className="planner-pulse" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4ade80", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                  <Loader2 size={15} className="planner-spin" />
                  Generating your itinerary...
                </div>
              )}
              {generating && streamingDays.length > 0 && (
                <div className="planner-pulse" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4ade80", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                  <Loader2 size={14} className="planner-spin" />
                  Generating day {streamingDays.length + 1}...
                </div>
              )}

              {itinerary?.overview && (
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  {itinerary.overview}
                </p>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {streamingDays.map((day) => (
                  <div key={day.dayNumber} className="planner-day-in" style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                    <div className="day-dot" />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>Day {day.dayNumber}: </span>
                      <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)" }}>
                        {day.title}{generating && day.dayNumber === streamingDays.length && "..."}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {!generating && streamingDays.length === 0 && (
                <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <Map size={36} style={{ color: "rgba(255,255,255,0.15)", marginBottom: "0.75rem" }} />
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}>Describe your trip on the left and click Generate</p>
                </div>
              )}

              {!generating && hasResult && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.75rem" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "0.25rem 0.65rem", borderRadius: 100, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontSize: "0.72rem", fontWeight: 500 }}>
                    📅 {streamingDays.length} Days
                  </span>
                  {itinerary?.bestTimeToVisit && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "0.25rem 0.65rem", borderRadius: 100, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: "0.72rem" }}>
                      🗓 {itinerary.bestTimeToVisit}
                    </span>
                  )}
                  {itinerary?.totalBudgetEstimate && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "0.25rem 0.65rem", borderRadius: 100, background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.25)", color: "#f5c87a", fontSize: "0.72rem", fontWeight: 500 }}>
                      💰 {itinerary.totalBudgetEstimate}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div style={{ borderRadius: 8, overflow: "hidden", height: 36, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", position: "relative", flexShrink: 0 }}>
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                width: `${progress}%`,
                background: progress === 100 ? "linear-gradient(90deg, #22c55e, #16a34a)" : "linear-gradient(90deg, #f5a623, #f59e0b)",
                transition: "width 0.5s ease, background 0.5s",
                backgroundSize: "200% 100%",
                animation: generating && progress < 100 ? "planner-shimmer 2s linear infinite" : "none",
              }} />
              <span style={{ position: "relative", zIndex: 1, fontSize: "0.78rem", fontWeight: 600, color: progress > 15 ? "#fff" : "rgba(255,255,255,0.5)", paddingLeft: "0.75rem", whiteSpace: "nowrap" }}>
                {progress === 0 && "Ready to generate"}
                {progress > 0 && progress < 100 && `Creating your journey... ${Math.round(progress)}%`}
                {progress === 100 && "Itinerary complete!"}
              </span>
            </div>

            {/* Action buttons */}
            {!generating && hasResult && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flexShrink: 0 }}>

                {/* Auth-gated Save */}
                {!authLoading && !user ? (
                  <div className="login-banner" style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.75rem 1rem", borderRadius: 12,
                    background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.3)",
                  }}>
                    <LogIn size={18} style={{ color: "#f5c87a", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.82rem", color: "#f5c87a", fontWeight: 600, marginBottom: 2 }}>Login to save your itinerary</p>
                      <p style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.4)" }}>Sign in to keep this trip in your collection</p>
                    </div>
                    <button
                      id="ai-planner-login-btn"
                      onClick={openAuthModal}
                      style={{
                        padding: "0.5rem 1rem", borderRadius: 8, border: "none",
                        background: "linear-gradient(135deg, #f5a623, #e05c20)",
                        color: "#fff", fontSize: "0.78rem", fontWeight: 700,
                        fontFamily: "var(--font-sans)", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                ) : (
                  !authLoading && (
                    <button
                      id="ai-planner-save-btn"
                      onClick={handleSave}
                      disabled={saved}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                        padding: "0.7rem 1rem", borderRadius: 10, border: "none",
                        background: saved ? "rgba(34,197,94,0.2)" : "linear-gradient(135deg, #f5a623, #e88c10)",
                        color: saved ? "#4ade80" : "#fff",
                        fontSize: "0.85rem", fontWeight: 700, fontFamily: "var(--font-sans)",
                        cursor: saved ? "default" : "pointer", transition: "all 0.25s",
                      }}
                    >
                      {saved ? <><CheckCircle size={15} /> Saved!</> : <><CheckCircle size={15} /> Save Itinerary</>}
                    </button>
                  )
                )}

                {/* Export + Maps + Redo row */}
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  <ExportDropdown itinerary={itinerary} streamingDays={streamingDays} adventureLevel={adventureLevel} />

                  {mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="ai-planner-maps-btn"
                      style={{
                        display: "flex", alignItems: "center", gap: "0.4rem",
                        padding: "0.7rem 1rem", borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)",
                        color: "#fff", fontSize: "0.82rem", fontWeight: 600,
                        textDecoration: "none", fontFamily: "var(--font-sans)",
                        flexShrink: 0, transition: "all 0.2s",
                      }}
                    >
                      <Map size={15} /> Maps
                    </a>
                  )}

                  <button
                    id="ai-planner-regen-btn"
                    onClick={handleGenerate}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.4rem",
                      padding: "0.7rem 1rem", borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.15)", background: "transparent",
                      color: "rgba(255,255,255,0.6)", fontSize: "0.82rem",
                      fontFamily: "var(--font-sans)", cursor: "pointer",
                      flexShrink: 0, transition: "all 0.2s",
                    }}
                  >
                    <Sparkles size={14} /> Redo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full day-by-day breakdown */}
        {!generating && streamingDays.length > 0 && (
          <div style={{
            marginTop: "2rem", width: "100%", maxWidth: 1080,
            background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)", borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.12)", padding: "1.75rem",
          }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>
              Full Itinerary — {streamingDays.length} Days
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {streamingDays.map((day) => (
                <details key={day.dayNumber} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <summary style={{
                    padding: "1rem 1.25rem", background: "rgba(255,255,255,0.06)",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem",
                    listStyle: "none", fontFamily: "var(--font-sans)",
                  }}>
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #f5a623, #e05c20)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0 }}>
                      D{day.dayNumber}
                    </span>
                    <span style={{ flex: 1, fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}>{day.title}</span>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>{(day.activities || []).length} stops</span>
                    <ChevronRight size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                  </summary>

                  <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    {day.summary && (
                      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", fontStyle: "italic", marginBottom: "1rem", lineHeight: 1.6, borderLeft: "2px solid #f5a623", paddingLeft: "0.75rem" }}>
                        {day.summary}
                      </p>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {(day.activities || []).map((act, i) => {
                        const Icon = (act.type && ACTIVITY_ICONS[act.type]) || Camera;
                        return (
                          <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                            <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#f5c87a" }}>
                              <Icon size={12} />
                            </span>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: 2 }}>
                                {act.time && (
                                  <span style={{ fontSize: "0.7rem", color: "#f5a623", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                                    <Clock size={10} /> {act.time}
                                  </span>
                                )}
                                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{act.title}</span>
                              </div>
                              {act.description && <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{act.description}</p>}
                              {act.notes && (
                                <div style={{ marginTop: 4, padding: "0.3rem 0.6rem", borderRadius: 6, background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.2)", fontSize: "0.72rem", color: "#f5c87a", lineHeight: 1.5 }}>
                                  {act.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .ai-planner-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </>
  );
}
