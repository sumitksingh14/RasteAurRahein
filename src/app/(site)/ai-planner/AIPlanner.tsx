"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Sparkles, Loader2, AlertCircle, CheckCircle, ChevronRight,
  Clock, Utensils, Bus, Bed, Camera, Navigation,
  Calendar, Download, FileText, Map, LocateFixed, Trash2,
  Mountain, Wallet, Users, LogIn,
} from "lucide-react";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import { buildGoogleMapsUrl } from "@/lib/googleMapsRoute";
import ExportPDFButton from "@/components/ai/ExportPDFButton";
import { useGeneratedTrips } from "@/components/providers/GeneratedTripsProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import type { MapPin } from "@/lib/types";
import "../../../components/ui/AnimatedLoader.css";

// Lazy-load map (browser only)
const MapView = dynamic(() => import("@/components/ui/MapView"), { ssr: false });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TripParams {
  destination: string;
  origin: string;
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
  model: "auto" | "gemini" | "nvidia" | "groq" | "openai";
  nvidiaModel: string;
  groqModel: string;
  openaiModel: string;
}

interface GeneratedActivity {
  time?: string;
  title: string;
  description?: string;
  notes?: string;
  type?: string;
  location?: { name: string; lat: number; lng: number };
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

type Step = "form" | "generating" | "result" | "saved";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const STYLES = [
  { value: "Adventure",    emoji: "🏔️" },
  { value: "Culture",      emoji: "🛕" },
  { value: "Relaxed",      emoji: "🌴" },
  { value: "Budget",       emoji: "💰" },
  { value: "Luxury",       emoji: "✨" },
  { value: "Road Trip",    emoji: "🛻" },
  { value: "Wildlife",     emoji: "🐅" },
  { value: "Food & Culture", emoji: "🍛" },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const BUDGET_OPTIONS = [
  { value: "Budget (₹1,000–₹2,000/day)",    label: "Budget" },
  { value: "Mid-range (₹2,000–₹5,000/day)", label: "Mid-range" },
  { value: "Premium (₹5,000–₹10,000/day)",  label: "Premium" },
  { value: "Luxury (₹10,000+/day)",          label: "Luxury" },
];

const PACE_OPTIONS: { value: TripParams["pace"]; label: string }[] = [
  { value: "relaxed",  label: "Relaxed" },
  { value: "moderate", label: "Moderate" },
  { value: "packed",   label: "Packed" },
];

const TRANSPORT_OPTIONS: { value: TripParams["transportMode"]; label: string }[] = [
  { value: "self-drive",       label: "Self-drive" },
  { value: "public-transport", label: "Public Transport" },
  { value: "flights",          label: "Flights" },
  { value: "mixed",            label: "Mixed" },
];

const DIETARY_OPTIONS: { value: TripParams["dietary"]; label: string }[] = [
  { value: "no-preference",  label: "No preference" },
  { value: "vegetarian",     label: "Vegetarian" },
  { value: "vegan",          label: "Vegan" },
  { value: "jain",           label: "Jain" },
  { value: "non-vegetarian", label: "Non-vegetarian" },
];

const NVIDIA_MODEL_OPTIONS = [
  { id: "nvidia/nemotron-3.5-lightning-30b-a3b", label: "Nemotron 3.5 Lightning (30B)" },
  { id: "nvidia/nemotron-3-ultra-550b-a55b",     label: "Nemotron Ultra (550B)" },
  { id: "deepseek-ai/deepseek-v4-flash-0731",    label: "DeepSeek v4 Flash" },
  { id: "nvidia/nemotron-3-nano-30b-a3b",        label: "Nemotron Nano (30B)" },
  { id: "nvidia/nemotron-3-super-120b-a12b",     label: "Nemotron Super (120B)" },
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
  transport:     Bus,
  accommodation: Bed,
  food:          Utensils,
  activity:      Navigation,
  sightseeing:   Camera,
};

// ---------------------------------------------------------------------------
// Topo background
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
    <path d='M50,0 Q50,100 50,200 T50,400'/>
    <path d='M150,0 Q130,100 150,200 T150,400'/>
    <path d='M200,0 Q200,100 200,200 T200,400'/>
    <path d='M250,0 Q270,100 250,200 T250,400'/>
    <path d='M300,0 Q280,100 300,200 T300,400'/>
  </g>
</svg>`;
const TOPO_BG = `url("data:image/svg+xml,${encodeURIComponent(TOPO_PATTERN)}")`;

// ---------------------------------------------------------------------------
// SmoothSlider
// ---------------------------------------------------------------------------
function SmoothSlider({
  value, onChange, leftIcon: LeftIcon, rightIcon: RightIcon,
  id, min = 0, max = 100, step = 1, showValue = false, valueSuffix = "",
}: {
  value: number; onChange: (v: number) => void;
  leftIcon: React.ElementType; rightIcon: React.ElementType;
  id: string; min?: number; max?: number; step?: number;
  showValue?: boolean; valueSuffix?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <LeftIcon size={22} style={{ color: "#f5c87a", flexShrink: 0 }} />
      <div style={{ flex: 1, position: "relative" }}>
        {showValue && (
          <div style={{
            position: "absolute", left: `${pct}%`, top: -30,
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #f5a623, #e05c20)",
            color: "#fff", fontSize: "0.7rem", fontWeight: 700,
            padding: "2px 8px", borderRadius: 6, whiteSpace: "nowrap",
            pointerEvents: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
            transition: "left 0.1s cubic-bezier(0.25,0.46,0.45,0.94)", zIndex: 2,
          }}>
            {value}{valueSuffix}
            <div style={{
              position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "4px solid transparent", borderRight: "4px solid transparent",
              borderTop: "4px solid #e05c20",
            }} />
          </div>
        )}
        <div style={{ position: "relative", height: 24, display: "flex", alignItems: "center" }}>
          <div style={{
            position: "absolute", left: 0, right: 0, height: 6, borderRadius: 3,
            background: "rgba(255,255,255,0.18)", overflow: "hidden",
          }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: "linear-gradient(90deg, #f5a623, #e05c20)", borderRadius: 3,
              transition: "width 0.1s cubic-bezier(0.25,0.46,0.45,0.94)",
            }} />
          </div>
          <input
            id={id} type="range" min={min} max={max} step={step} value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="planner-range"
            style={{
              position: "absolute", left: 0, width: "100%", height: 6, borderRadius: 3,
              appearance: "none", background: "transparent", cursor: "pointer",
              outline: "none", margin: 0, zIndex: 1,
            }}
          />
        </div>
      </div>
      <RightIcon size={22} style={{ color: "#f5c87a", flexShrink: 0 }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ExportDropdown
// ---------------------------------------------------------------------------
function ExportDropdown({ itinerary, streamingDays, params }: {
  itinerary: GeneratedItinerary | null;
  streamingDays: GeneratedDay[];
  params: TripParams;
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
    style: params.style,
    month: params.month,
    generatedAt: new Date().toISOString(),
  };

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        id="ai-planner-export-btn"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          padding: "0.7rem 1rem", borderRadius: 10,
          border: "1px solid rgba(245,166,35,0.45)",
          background: "linear-gradient(135deg, rgba(245,166,35,0.12), rgba(224,92,32,0.12))",
          color: "#f5c87a", fontSize: "0.82rem", fontWeight: 600,
          fontFamily: "var(--font-sans)", cursor: "pointer", transition: "all 0.2s",
        }}
      >
        <Download size={14} /> Export ▾
      </button>
      {open && (
        <div
          className="export-dropdown"
          style={{
            position: "absolute", bottom: "calc(100% + 8px)", right: 0,
            minWidth: 170, background: "#1a2440",
            border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.45)", overflow: "hidden", zIndex: 100,
          }}
        >
          <div style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <ExportPDFButton trip={trip} variant="ghost" />
          </div>
          <button
            onClick={handleExportText}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              width: "100%", padding: "0.65rem 1rem",
              background: "none", border: "none",
              color: "rgba(255,255,255,0.75)", fontSize: "0.82rem",
              fontFamily: "var(--font-sans)", cursor: "pointer",
              textAlign: "left", transition: "background 0.15s",
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

  // ── Unified params ──────────────────────────────────────────────────────
  const [params, setParams] = useState<TripParams>({
    destination: "",
    origin: "",
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
    model: "auto",
    nvidiaModel: "nvidia/nemotron-3.5-lightning-30b-a3b",
    groqModel: "openai/gpt-oss-20b",
    openaiModel: "gpt-4o",
  });

  // ── Visual sliders (adventure / budget — these map to params.pace / params.budget) ──
  const [adventureLevel, setAdventureLevel] = useState(50);
  const [budgetLevel, setBudgetLevel] = useState(40);

  // ── Generation state ──────────────────────────────────────────────────────
  const [step, setStep] = useState<Step>("form");
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [streamingDays, setStreamingDays] = useState<GeneratedDay[]>([]);
  const [modelUsed, setModelUsed] = useState("");
  const [error, setError] = useState("");
  const [isAuthError, setIsAuthError] = useState(false);
  const [failedModel, setFailedModel] = useState<TripParams["model"] | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stageIdx, setStageIdx] = useState(0);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [progress, setProgress] = useState(0);
  const [savedTitle, setSavedTitle] = useState("");
  // Geocoded pin for the destination — set when streaming finishes
  const [destinationPin, setDestinationPin] = useState<{ lat: number; lng: number } | null>(null);

  // ── GROQ models (dynamic) ────────────────────────────────────────────────
  const [groqModels, setGroqModels] = useState<{ id: string; ownedBy: string }[]>([]);

  const abortRef = useRef<AbortController | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stageTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch Groq model list on mount
  useEffect(() => {
    fetch("/api/groq-models")
      .then((r) => r.json())
      .then((d) => {
        if (d.models?.length) {
          setGroqModels(d.models);
          const pref = d.models.find((m: { id: string }) => m.id === "openai/gpt-oss-20b");
          setParams((p) => ({ ...p, groqModel: pref?.id ?? d.models[0].id }));
        }
      })
      .catch(() => {/* non-fatal */});
  }, []);

  // Cycling stage labels during generation
  useEffect(() => {
    if (step === "generating") {
      stageTimer.current = setInterval(() => {
        setStageIdx((i) => Math.min(i + 1, GENERATING_STAGES.length - 1));
      }, 1400);
    }
    return () => { if (stageTimer.current) clearInterval(stageTimer.current); };
  }, [step]);

  // Cleanup on unmount
  useEffect(() => () => {
    abortRef.current?.abort();
    if (progressTimer.current) clearInterval(progressTimer.current);
    if (stageTimer.current) clearInterval(stageTimer.current);
  }, []);

  // Geocode destination once streaming finishes so we can show the map
  useEffect(() => {
    if (isStreaming || !itinerary) return;
    const query = itinerary.destination || params.destination;
    if (!query.trim()) return;
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    fetch(url.toString(), { headers: { "User-Agent": "RasteAurRahein/1.0 (travel-blog)" } })
      .then((r) => r.json())
      .then((data) => {
        if (data?.[0]) setDestinationPin({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      })
      .catch(() => {}); // silently fail — map just won't show
  }, [isStreaming, itinerary, params.destination]);

  // Derived map pins from streamed activities
  const mapPins: MapPin[] = streamingDays.flatMap((d) =>
    (d.activities ?? [])
      .filter((a): a is GeneratedActivity & { location: { name: string; lat: number; lng: number } } =>
        Boolean(a.location?.lat && a.location?.lng)
      )
      .map((a) => ({
        lat: a.location.lat,
        lng: a.location.lng,
        label: a.location.name,
        day: d.dayNumber,
      }))
  );

  // The pin set to show on the map: real activity pins if the LLM returned
  // coordinates, otherwise a single centred pin on the destination.
  const activePins: MapPin[] =
    mapPins.length > 0
      ? mapPins
      : destinationPin
      ? [{ lat: destinationPin.lat, lng: destinationPin.lng, label: params.destination }]
      : [];

  // ── Generate ──────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!params.destination.trim()) return;

    // Must be signed in — open auth modal instead of hitting the API and getting a 401
    if (!user) {
      openAuthModal();
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStep("generating");
    setStageIdx(0);
    setError("");
    setFailedModel(null);
    setItinerary(null);
    setStreamingDays([]);
    setModelUsed("");
    setProgress(0);
    setIsStreaming(true);
    setExpandedDays(new Set([1]));
    setDestinationPin(null); // clear stale pin from previous trip

    if (progressTimer.current) clearInterval(progressTimer.current);
    progressTimer.current = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 4, 88));
    }, 500);

    let gotAnyContent = false;

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...params, stream: true }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        if (res.status === 401) {
          setIsAuthError(true);
          setStep("form");
          return;
        }
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
          try { evt = JSON.parse(line) as StreamEvent; } catch { continue; }

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
            setStep("result");
          } else if (evt.type === "day") {
            gotAnyContent = true;
            setStreamingDays((prev) => {
              const next = [
                ...prev.filter((d) => d.dayNumber !== evt.dayNumber),
                { dayNumber: evt.dayNumber, title: evt.title, summary: evt.summary, activities: evt.activities || [] },
              ].sort((a, b) => a.dayNumber - b.dayNumber);
              return next;
            });
            setStep("result");
          } else if (evt.type === "error") {
            throw new Error(evt.message || "Generation failed.");
          }
        }
      }

      if (!gotAnyContent) throw new Error("The AI returned no itinerary content.");
      setProgress(100);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;

      const msg = err instanceof Error ? err.message : "Unknown error";
      const isQuota   = /quota|rate.?limit|429|too many/i.test(msg);
      const isTimeout = /timeout|network|fetch|ECONNRESET/i.test(msg);
      const isModel   = /model|overload|503|unavailable|capacity/i.test(msg);

      let friendly = msg;
      if (isQuota)   friendly = "This model has hit its usage limit or rate limit. Please try again in a moment or switch to another AI.";
      else if (isTimeout) friendly = "The request timed out — the model may be experiencing high load.";
      else if (isModel)   friendly = "This model is currently overloaded or unavailable. Try a different AI LLM.";

      setFailedModel(params.model);
      setError(friendly);
      if (!gotAnyContent) setStep("form");
    } finally {
      setIsStreaming(false);
      if (progressTimer.current) clearInterval(progressTimer.current);
    }
  };

  // ── Save ───────────────────────────────────────────────────────────────────
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
      style: params.style,
      month: params.month,
      generatedAt: new Date().toISOString(),
    });
    setSavedTitle(itinerary.title);
    setStep("saved");
  };

  const toggleDay = (n: number) =>
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(n)) {
        next.delete(n);
      } else {
        next.add(n);
      }
      return next;
    });

  const mapsUrl =
    params.origin && itinerary?.destination
      ? buildGoogleMapsUrl(params.origin, itinerary.destination)
      : itinerary?.destination
      ? buildGoogleMapsUrl(itinerary.destination, itinerary.destination)
      : null;

  const hasResult = streamingDays.length > 0;

  // ── Shared input style ────────────────────────────────────────────────────
  const darkInput: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "0.88rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  };

  const darkLabel: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.72rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.6)",
    marginBottom: "0.5rem",
  };

  // ── Model badge colours ────────────────────────────────────────────────────
  const modelColor = params.model === "nvidia" ? "#76b900"
    : params.model === "groq"   ? "#f55036"
    : params.model === "openai" ? "#10a37f"
    : "#c9a84c";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /* Smooth slider thumb */
        .planner-range { -webkit-appearance: none; appearance: none; }
        .planner-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px; border-radius: 50%;
          background: linear-gradient(135deg, #f5a623, #e05c20);
          border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          cursor: grab; transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
          margin-top: -8px;
        }
        .planner-range::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(1.18); }
        .planner-range::-moz-range-thumb {
          width: 22px; height: 22px; border-radius: 50%;
          background: linear-gradient(135deg, #f5a623, #e05c20);
          border: 3px solid #fff; cursor: grab;
        }
        .planner-range::-webkit-slider-runnable-track { background: transparent; height: 6px; }
        .planner-range::-moz-range-track { background: transparent; height: 6px; border-radius: 3px; }
        .day-dot { width: 9px; height: 9px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 6px #4ade80; flex-shrink: 0; margin-top: 3px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .planner-spin { animation: spin 1s linear infinite; }
        @keyframes planner-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .planner-pulse { animation: planner-pulse 1.4s ease-in-out infinite; }
        @keyframes planner-slide-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .planner-day-in { animation: planner-slide-in 0.35s ease forwards; }
        @keyframes planner-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .export-dropdown { animation: planner-slide-in 0.18s ease forwards; }
        @keyframes login-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(245,166,35,0); } 50% { box-shadow: 0 0 0 4px rgba(245,166,35,0.2); } }
        .login-banner { animation: login-glow 2.5s ease-in-out infinite; }
        @keyframes ai-skel-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.7; } }
        .planner-skel { animation: ai-skel-pulse 1.4s ease-in-out infinite; }
        select option { background: #1a2440; color: #fff; }
        @media (max-width: 768px) {
          .ai-planner-grid { grid-template-columns: 1fr !important; }
          .ai-form-2col { grid-template-columns: 1fr !important; }
          .ai-model-dropdown-container { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          paddingTop: "var(--nav-height)",
          backgroundColor: "#5a6e4e",
          backgroundImage: TOPO_BG,
          backgroundSize: "400px 400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}
        >
          ✨ AI Trip Planner
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", marginBottom: "2rem", textAlign: "center" }}>
          Describe your dream trip — get a personalised itinerary in seconds.
        </p>

        {/* ═══════════════════════════════════════════════════════════════════
            SAVED STATE
        ═══════════════════════════════════════════════════════════════════ */}
        {step === "saved" && (
          <div
            style={{
              width: "100%", maxWidth: 540,
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              borderRadius: 20, border: "1px solid rgba(255,255,255,0.15)",
              padding: "3rem 2rem",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "1.5rem", textAlign: "center",
              boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg, #4ade80, #22c55e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 10px rgba(74,222,128,0.15)",
            }}>
              <CheckCircle size={40} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>
                Itinerary Saved!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                <strong style={{ color: "#f5c87a" }}>{savedTitle}</strong> has been added to your itineraries library.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link
                href="/itineraries"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "0.75rem 1.5rem", borderRadius: 10,
                  background: "linear-gradient(135deg, #f5a623, #e05c20)",
                  color: "#fff", fontSize: "0.9rem", fontWeight: 600,
                  fontFamily: "var(--font-sans)", textDecoration: "none",
                }}
              >
                <Navigation size={15} /> View All Itineraries
              </Link>
              <button
                onClick={() => { setStep("form"); setItinerary(null); setStreamingDays([]); setProgress(0); setError(""); setFailedModel(null); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "0.75rem 1.25rem", borderRadius: 10,
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.85)", fontSize: "0.85rem",
                  fontFamily: "var(--font-sans)", cursor: "pointer",
                }}
              >
                <Sparkles size={14} /> Plan Another Trip
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            MAIN TWO-PANEL GRID (form + generating + result share the grid)
        ═══════════════════════════════════════════════════════════════════ */}
        {step !== "saved" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              width: "100%",
              maxWidth: 1100,
            }}
            className="ai-planner-grid"
          >
            {/* ──────────────────────────────────────────────────────────
                LEFT PANEL — Form
            ────────────────────────────────────────────────────────── */}
            <div
              style={{
                background: "linear-gradient(160deg, #8B3D1F 0%, #6e2e12 100%)",
                borderRadius: 20, padding: "2rem",
                display: "flex", flexDirection: "column", gap: "1.25rem",
                boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
              }}
            >
              <h2 style={{
                fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 800,
                color: "#f5c87a", letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>
                Craft Your Journey
              </h2>

              {/* Starting city */}
              <div>
                <div style={darkLabel}><LocateFixed size={12} /> Starting From <span style={{ fontWeight: 400, textTransform: "none" }}>(optional)</span></div>
                <LocationAutocomplete
                  id="ai-planner-origin"
                  value={params.origin}
                  onChange={(v) => setParams((p) => ({ ...p, origin: v }))}
                  onSelect={(s) => setParams((p) => ({ ...p, origin: s.label }))}
                  placeholder="e.g. Mumbai, Delhi, Bengaluru..."
                  theme="dark"
                  showGpsButton
                />
              </div>

              {/* Destination */}
              <div>
                <div style={darkLabel}><span>🗺️</span> Destination</div>
                <LocationAutocomplete
                  id="ai-planner-destination"
                  value={params.destination}
                  onChange={(v) => setParams((p) => ({ ...p, destination: v }))}
                  onSelect={(s) => setParams((p) => ({ ...p, destination: s.label }))}
                  placeholder="e.g. Manali, Coorg, Jaipur..."
                  theme="dark"
                  showGpsButton={false}
                />
              </div>

              {/* Travelers + Pace */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }} className="ai-form-2col">
                <div>
                  <div style={darkLabel}><Users size={12} /> Travelers</div>
                  <input
                    id="ai-planner-travelers"
                    type="number" min={1} max={20}
                    value={params.travelers}
                    onChange={(e) => setParams((p) => ({ ...p, travelers: Math.min(20, Math.max(1, Number(e.target.value) || 1)) }))}
                    style={darkInput}
                  />
                </div>
                <div>
                  <div style={darkLabel}><span>🎯</span> Pace</div>
                  <div style={{ display: "flex", gap: "0.3rem" }}>
                    {PACE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setParams((p) => ({ ...p, pace: opt.value }))}
                        style={{
                          flex: 1, padding: "0.6rem 0.3rem",
                          borderRadius: 8,
                          border: `1px solid ${params.pace === opt.value ? "#f5a623" : "rgba(255,255,255,0.2)"}`,
                          background: params.pace === opt.value ? "rgba(245,166,35,0.2)" : "rgba(255,255,255,0.07)",
                          color: params.pace === opt.value ? "#f5c87a" : "rgba(255,255,255,0.65)",
                          fontSize: "0.72rem", fontWeight: params.pace === opt.value ? 700 : 400,
                          cursor: "pointer", fontFamily: "var(--font-sans)",
                          transition: "all 0.15s",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Days slider */}
              <div>
                <div style={{
                  ...darkLabel, marginBottom: "1rem",
                  justifyContent: "space-between",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Calendar size={12} /> Number of Days</span>
                  <span style={{ background: "linear-gradient(135deg, #f5a623, #e05c20)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "2px 10px", borderRadius: 20 }}>
                    {params.days} {params.days === 1 ? "Day" : "Days"}
                  </span>
                </div>
                <SmoothSlider
                  id="ai-days-slider"
                  value={params.days}
                  onChange={(v) => setParams((p) => ({ ...p, days: v }))}
                  min={1} max={21} step={1}
                  leftIcon={() => <span style={{ fontSize: 18 }}>1️⃣</span>}
                  rightIcon={() => <span style={{ fontSize: 18 }}>📅</span>}
                  showValue valueSuffix=""
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>1 Day</span>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>21 Days</span>
                </div>
              </div>

              {/* Adventure Level */}
              <div>
                <div style={{ ...darkLabel, justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Mountain size={12} /> Adventure Level</span>
                  <span style={{ fontWeight: 500, textTransform: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem" }}>
                    {adventureLevel < 33 ? "Relaxed" : adventureLevel < 66 ? "Moderate" : "Packed"}
                  </span>
                </div>
                <SmoothSlider
                  id="ai-adventure-level"
                  value={adventureLevel}
                  onChange={(val) => {
                    setAdventureLevel(val);
                    const pace: TripParams["pace"] =
                      val < 33 ? "relaxed" : val < 66 ? "moderate" : "packed";
                    setParams((p) => ({ ...p, pace }));
                  }}
                  leftIcon={() => <span style={{ fontSize: 20 }}>🚶</span>}
                  rightIcon={() => <span style={{ fontSize: 20 }}>🧗</span>}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>Relaxed</span>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>Packed</span>
                </div>
              </div>

              {/* Budget slider */}
              <div>
                <div style={{ ...darkLabel, justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Wallet size={12} /> Budget</span>
                  <span style={{ fontWeight: 500, textTransform: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem" }}>
                    {budgetLevel < 25 ? "Budget" : budgetLevel < 50 ? "Mid-range" : budgetLevel < 75 ? "Premium" : "Luxury"}
                  </span>
                </div>
                <SmoothSlider
                  id="ai-budget-level"
                  value={budgetLevel}
                  onChange={setBudgetLevel}
                  leftIcon={() => <span style={{ fontSize: 20 }}>💰</span>}
                  rightIcon={() => <span style={{ fontSize: 20 }}>💎</span>}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>Economy</span>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>Luxury</span>
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <div style={darkLabel}><span>🎨</span> Travel Style</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {STYLES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setParams((p) => ({ ...p, style: s.value }))}
                      style={{
                        padding: "0.35rem 0.75rem", borderRadius: 100,
                        border: `1px solid ${params.style === s.value ? "#f5a623" : "rgba(255,255,255,0.2)"}`,
                        background: params.style === s.value ? "rgba(245,166,35,0.2)" : "rgba(255,255,255,0.07)",
                        color: params.style === s.value ? "#f5c87a" : "rgba(255,255,255,0.7)",
                        fontSize: "0.78rem", fontWeight: params.style === s.value ? 700 : 400,
                        cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.15s",
                      }}
                    >
                      {s.emoji} {s.value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Month + Budget dropdown */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }} className="ai-form-2col">
                <div>
                  <div style={darkLabel}><Calendar size={12} /> Travel Month</div>
                  <select
                    id="ai-month"
                    value={params.month}
                    onChange={(e) => setParams((p) => ({ ...p, month: e.target.value }))}
                    style={darkInput}
                  >
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <div style={darkLabel}><Wallet size={12} /> Budget Range</div>
                  <select
                    id="ai-budget"
                    value={params.budget}
                    onChange={(e) => setParams((p) => ({ ...p, budget: e.target.value }))}
                    style={darkInput}
                  >
                    {BUDGET_OPTIONS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Transport + Dietary */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }} className="ai-form-2col">
                <div>
                  <div style={darkLabel}><Bus size={12} /> Transport</div>
                  <select
                    id="ai-transport"
                    value={params.transportMode}
                    onChange={(e) => setParams((p) => ({ ...p, transportMode: e.target.value as TripParams["transportMode"] }))}
                    style={darkInput}
                  >
                    {TRANSPORT_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <div style={darkLabel}><Utensils size={12} /> Dietary</div>
                  <select
                    id="ai-dietary"
                    value={params.dietary}
                    onChange={(e) => setParams((p) => ({ ...p, dietary: e.target.value as TripParams["dietary"] }))}
                    style={darkInput}
                  >
                    {DIETARY_OPTIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <div style={darkLabel}><Camera size={12} /> Highlights <span style={{ fontWeight: 400, textTransform: "none" }}>(optional)</span></div>
                <textarea
                  id="ai-highlights"
                  value={params.highlights}
                  onChange={(e) => setParams((p) => ({ ...p, highlights: e.target.value }))}
                  placeholder="e.g. Chandratal Lake, Key Monastery, local food..."
                  rows={2}
                  style={{ ...darkInput, resize: "vertical", lineHeight: 1.6 }}
                />
              </div>

              {/* Things to avoid */}
              <div>
                <div style={darkLabel}><Trash2 size={12} /> Avoid <span style={{ fontWeight: 400, textTransform: "none" }}>(optional)</span></div>
                <textarea
                  id="ai-avoid"
                  value={params.avoid}
                  onChange={(e) => setParams((p) => ({ ...p, avoid: e.target.value }))}
                  placeholder="e.g. overnight drives, crowded tourist traps, spicy food..."
                  rows={2}
                  style={{ ...darkInput, resize: "vertical", lineHeight: 1.6 }}
                />
              </div>

              {/* ── AI Model Selector (2-Level Dropdown) ── */}
              <div>
                <div style={darkLabel}><Sparkles size={12} /> AI Model Selection</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.65rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 12,
                    padding: "0.85rem",
                  }}
                  className="ai-model-dropdown-container"
                >
                  {/* Level 1: Engine / Provider */}
                  <div>
                    <label
                      htmlFor="ai-model-provider-select"
                      style={{
                        display: "block",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "0.35rem",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Step 1 · Select Provider / Mode
                    </label>
                    <select
                      id="ai-model-provider-select"
                      value={params.model}
                      onChange={(e) => setParams((p) => ({ ...p, model: e.target.value as TripParams["model"] }))}
                      style={{
                        ...darkInput,
                        cursor: "pointer",
                        border:
                          params.model === "nvidia"
                            ? "1.5px solid #76b900"
                            : params.model === "groq"
                            ? "1.5px solid #f55036"
                            : params.model === "openai"
                            ? "1.5px solid #10a37f"
                            : "1.5px solid #c9a84c",
                      }}
                    >
                      <option value="auto">⚡ Auto (Best Model — Recommended)</option>
                      <option value="gemini">✦ Google Gemini</option>
                      <option value="nvidia">⚡ NVIDIA NIM</option>
                      <option value="groq">🖤 Groq</option>
                      <option value="openai">🟢 OpenAI</option>
                    </select>
                  </div>

                  {/* Level 2: Specific Model */}
                  <div>
                    <label
                      htmlFor="ai-specific-model-select"
                      style={{
                        display: "block",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "0.35rem",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Step 2 · Select LLM Architecture
                    </label>
                    {params.model === "auto" && (
                      <select
                        id="ai-specific-model-select"
                        disabled
                        style={{
                          ...darkInput,
                          opacity: 0.9,
                          cursor: "default",
                          border: "1.5px solid rgba(201,168,76,0.45)",
                          background: "rgba(201,168,76,0.06)",
                          color: "#f5c87a",
                        }}
                      >
                        <option value="auto">✨ Best Model (Gemini Flash + Failover)</option>
                      </select>
                    )}
                    {params.model === "gemini" && (
                      <select
                        id="ai-specific-model-select"
                        disabled
                        style={{
                          ...darkInput,
                          opacity: 0.9,
                          cursor: "default",
                          border: "1.5px solid rgba(201,168,76,0.45)",
                          background: "rgba(201,168,76,0.06)",
                          color: "#f5c87a",
                        }}
                      >
                        <option value="gemini-flash">Gemini 2.5 Flash (Fast · JSON)</option>
                      </select>
                    )}
                    {params.model === "nvidia" && (
                      <select
                        id="ai-specific-model-select"
                        value={params.nvidiaModel}
                        onChange={(e) => setParams((p) => ({ ...p, nvidiaModel: e.target.value }))}
                        style={{
                          ...darkInput,
                          cursor: "pointer",
                          border: "1.5px solid #76b900",
                          background: "rgba(118,185,0,0.06)",
                        }}
                      >
                        {NVIDIA_MODEL_OPTIONS.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {params.model === "groq" && (
                      <select
                        id="ai-specific-model-select"
                        value={params.groqModel}
                        onChange={(e) => setParams((p) => ({ ...p, groqModel: e.target.value }))}
                        style={{
                          ...darkInput,
                          cursor: "pointer",
                          border: "1.5px solid #f55036",
                          background: "rgba(245,80,54,0.06)",
                        }}
                      >
                        {groqModels.length > 0 ? (
                          groqModels.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.id} ({m.ownedBy})
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</option>
                            <option value="llama-3.1-8b-instant">llama-3.1-8b-instant</option>
                            <option value="openai/gpt-oss-20b">openai/gpt-oss-20b</option>
                          </>
                        )}
                      </select>
                    )}
                    {params.model === "openai" && (
                      <select
                        id="ai-specific-model-select"
                        value={params.openaiModel}
                        onChange={(e) => setParams((p) => ({ ...p, openaiModel: e.target.value }))}
                        style={{
                          ...darkInput,
                          cursor: "pointer",
                          border: "1.5px solid #10a37f",
                          background: "rgba(16,163,127,0.06)",
                        }}
                      >
                        <option value="gpt-4o">GPT-4o (Flagship)</option>
                        <option value="gpt-4o-mini">GPT-4o Mini (Fast & Compact)</option>
                        <option value="o3-mini">o3 Mini (Reasoning)</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Engine description badge */}
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", marginTop: "0.4rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background:
                        params.model === "nvidia"
                          ? "#76b900"
                          : params.model === "groq"
                          ? "#f55036"
                          : params.model === "openai"
                          ? "#10a37f"
                          : "#c9a84c",
                    }}
                  />
                  {params.model === "auto" && "Auto selects the fastest and highest quality model (Gemini Flash) with automatic provider failover."}
                  {params.model === "gemini" && "Gemini 2.5 Flash produces ultra-fast, structured itineraries with rich context."}
                  {params.model === "nvidia" && "NVIDIA NIM delivers specialized open-weights models and high-parameter reasoning."}
                  {params.model === "groq" && "Groq LPUs deliver near-instantaneous token generation speeds."}
                  {params.model === "openai" && "OpenAI provides industry-standard GPT-4o and o3 reasoning architectures."}
                </div>
              </div>

              {/* ── Auth Error Panel (401) ── */}
              {isAuthError && (
                <div style={{
                  borderRadius: 10, border: "1px solid rgba(250,204,21,0.35)",
                  background: "rgba(250,204,21,0.06)", overflow: "hidden",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "0.9rem 1rem 0.75rem" }}>
                    <LogIn size={17} color="#facc15" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#facc15", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Sign in required
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
                        You need to be signed in to generate an itinerary.
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "0.6rem 1rem 0.85rem" }}>
                    <button
                      id="ai-planner-sign-in-btn"
                      onClick={() => { setIsAuthError(false); openAuthModal(); }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.45rem",
                        padding: "0.5rem 1.1rem", borderRadius: 8,
                        border: "1px solid rgba(250,204,21,0.45)",
                        background: "rgba(250,204,21,0.12)",
                        color: "#facc15", fontSize: "0.82rem", fontWeight: 700,
                        fontFamily: "var(--font-sans)", cursor: "pointer",
                        transition: "background 0.18s",
                      }}
                    >
                      <LogIn size={14} /> Sign In to Continue
                    </button>
                  </div>
                </div>
              )}

              {/* ── Error Panel ── */}
              {error && (
                <div style={{
                  borderRadius: 10, border: "1px solid rgba(243,139,168,0.4)",
                  background: "rgba(243,139,168,0.07)", overflow: "hidden",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "0.9rem 1rem 0.75rem" }}>
                    <AlertCircle size={17} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#f87171", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {failedModel
                          ? `${failedModel === "auto" ? "AI Engine" : failedModel === "gemini" ? "Google Gemini" : failedModel === "nvidia" ? "NVIDIA" : failedModel === "openai" ? "OpenAI" : "Groq"} could not generate a result`
                          : "Generation failed"}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{error}</div>
                    </div>
                  </div>
                  {failedModel && (
                    <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid rgba(243,139,168,0.15)" }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>🔄 Try a different AI</div>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {failedModel !== "auto" && <button id="ai-switch-auto-btn" onClick={() => { setParams((p) => ({ ...p, model: "auto" })); setError(""); setFailedModel(null); }} style={{ padding: "0.35rem 0.75rem", borderRadius: 8, border: "1px solid rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.1)", color: "#f5c87a", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer" }}>⚡ Auto</button>}
                        {failedModel !== "gemini" && <button id="ai-switch-gemini-btn" onClick={() => { setParams((p) => ({ ...p, model: "gemini" })); setError(""); setFailedModel(null); }} style={{ padding: "0.35rem 0.75rem", borderRadius: 8, border: "1px solid rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.1)", color: "#f5c87a", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer" }}>✦ Gemini</button>}
                        {failedModel !== "nvidia" && <button id="ai-switch-nvidia-btn" onClick={() => { setParams((p) => ({ ...p, model: "nvidia" })); setError(""); setFailedModel(null); }} style={{ padding: "0.35rem 0.75rem", borderRadius: 8, border: "1px solid rgba(118,185,0,0.4)", background: "rgba(118,185,0,0.1)", color: "#76b900", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer" }}>⚡ NVIDIA</button>}
                        {failedModel !== "groq" && <button id="ai-switch-groq-btn" onClick={() => { setParams((p) => ({ ...p, model: "groq" })); setError(""); setFailedModel(null); }} style={{ padding: "0.35rem 0.75rem", borderRadius: 8, border: "1px solid rgba(245,80,54,0.4)", background: "rgba(245,80,54,0.1)", color: "#f55036", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer" }}>🖤 Groq</button>}
                        {failedModel !== "openai" && <button id="ai-switch-openai-btn" onClick={() => { setParams((p) => ({ ...p, model: "openai" })); setError(""); setFailedModel(null); }} style={{ padding: "0.35rem 0.75rem", borderRadius: 8, border: "1px solid rgba(16,163,127,0.4)", background: "rgba(16,163,127,0.1)", color: "#10a37f", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer" }}>🟢 OpenAI</button>}
                      </div>
                      <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", marginTop: "0.35rem" }}>Switch model above, then hit Generate again.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Generate button */}
              <button
                id="ai-planner-generate-btn"
                onClick={handleGenerate}
                disabled={!params.destination.trim() || step === "generating"}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                  padding: "0.9rem 1.5rem", borderRadius: 12, border: "none",
                  background: !params.destination.trim() || step === "generating"
                    ? "rgba(255,255,255,0.15)"
                    : "#1C2B4A",
                  color: !params.destination.trim() || step === "generating"
                    ? "rgba(255,255,255,0.4)"
                    : "#fff",
                  fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-sans)",
                  cursor: !params.destination.trim() || step === "generating" ? "not-allowed" : "pointer",
                  transition: "all 0.25s", letterSpacing: "0.01em",
                }}
              >
                {step === "generating"
                  ? <><Loader2 size={18} className="planner-spin" /> Generating...</>
                  : <><Sparkles size={18} /> Generate {params.days}-Day Itinerary</>
                }
              </button>
            </div>

            {/* ──────────────────────────────────────────────────────────
                RIGHT PANEL — Preview / Generating / Result
            ────────────────────────────────────────────────────────── */}
            <div
              style={{
                background: "linear-gradient(160deg, #1C2B4A 0%, #111827 100%)",
                borderRadius: 20, padding: "1.75rem",
                display: "flex", flexDirection: "column", gap: "1rem",
                boxShadow: "0 8px 40px rgba(0,0,0,0.45)", minHeight: 500,
              }}
            >
              {/* ── GENERATING STATE ── */}
              {step === "generating" && !hasResult && (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: "1.75rem", padding: "2rem 1rem",
                }}>
                  {/* Animated SVG loader */}
                  <svg className="pl" viewBox="0 0 160 160" width="140px" height="140px" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000" />
                        <stop offset="100%" stopColor="#fff" />
                      </linearGradient>
                      <mask id="pl-mask1"><rect x="0" y="0" width="160" height="160" fill="url(#pl-grad)" /></mask>
                      <mask id="pl-mask2"><rect x="28" y="28" width="104" height="104" fill="url(#pl-grad)" /></mask>
                    </defs>
                    <g><g className="pl__ring-rotate"><circle className="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(223,90%,55%)" strokeWidth="16" strokeDasharray="452.39 452.39" strokeDashoffset="452" strokeLinecap="round" transform="rotate(-45,80,80)" /></g></g>
                    <g mask="url(#pl-mask1)"><g className="pl__ring-rotate"><circle className="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(193,90%,55%)" strokeWidth="16" strokeDasharray="452.39 452.39" strokeDashoffset="452" strokeLinecap="round" transform="rotate(-45,80,80)" /></g></g>
                    <g><g strokeWidth="4" strokeDasharray="12 12" strokeDashoffset="12" strokeLinecap="round" transform="translate(80,80)">
                      {[-135,-90,-45,0,45,90,135,180].map((r) => <polyline key={r} className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform={`rotate(${r},0,0) translate(0,40)`} />)}
                    </g></g>
                    <g mask="url(#pl-mask1)"><g strokeWidth="4" strokeDasharray="12 12" strokeDashoffset="12" strokeLinecap="round" transform="translate(80,80)">
                      {[-135,-90,-45,0,45,90,135,180].map((r) => <polyline key={r} className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform={`rotate(${r},0,0) translate(0,40)`} />)}
                    </g></g>
                    <g><g transform="translate(64,28)"><g className="pl__arrows" transform="rotate(45,16,52)">
                      <path fill="hsl(3,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z" />
                      <path fill="hsl(223,10%,90%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z" />
                    </g></g></g>
                  </svg>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "#fff", marginBottom: "0.4rem" }}>
                      Crafting your {params.days}-day trip to{" "}
                      <span style={{ color: "#f5c87a" }}>{params.destination}</span>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", minHeight: 24, animation: "planner-slide-in 0.4s ease" }} key={stageIdx}>
                      {GENERATING_STAGES[stageIdx]}
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: "0.75rem" }}>
                      Usually takes 5–15 seconds…
                    </p>
                  </div>
                </div>
              )}

              {/* ── RESULT / STREAMING STATE ── */}
              {(step === "result" || (step === "generating" && hasResult)) && (
                <>
                  {/* Map — only shown after generation is complete */}
                  {!isStreaming && activePins.length > 0 && (
                    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
                      <MapView
                        pins={activePins}
                        height={180}
                        zoom={mapPins.length > 0 ? 9 : 10}
                      />
                    </div>
                  )}

                  {/* Panel header */}
                  <h2 style={{
                    fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 800,
                    color: "#f5c87a", letterSpacing: "-0.01em", lineHeight: 1.2,
                  }}>
                    {itinerary?.title ? `📍 ${itinerary.title}` : "🗺️ Generating…"}
                  </h2>

                  {/* Live streaming banner */}
                  {isStreaming && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "0.55rem 0.85rem", borderRadius: 8,
                      background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.3)",
                      fontSize: "0.78rem", color: "#f5c87a", fontWeight: 600,
                    }}>
                      <Loader2 size={14} className="planner-spin" />
                      Generating day {streamingDays.length + 1} of {params.days}…
                    </div>
                  )}

                  {/* "Generated by" badge */}
                  {!isStreaming && modelUsed && (
                    <div>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "0.22rem 0.65rem", borderRadius: 100, fontSize: "0.68rem", fontWeight: 600,
                        background: `${modelColor}18`, border: `1px solid ${modelColor}44`, color: modelColor,
                      }}>
                        {params.model === "nvidia" ? "⚡" : params.model === "groq" ? "🖤" : params.model === "openai" ? "🟢" : "✦"} Generated by {modelUsed}
                      </span>
                    </div>
                  )}

                  {/* Overview */}
                  {itinerary?.overview && (
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                      {itinerary.overview}
                    </p>
                  )}

                  {/* Meta chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "0.22rem 0.6rem", borderRadius: 100, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontSize: "0.7rem", fontWeight: 500 }}>
                      📅 {streamingDays.length} of {params.days} Days
                    </span>
                    {itinerary?.bestTimeToVisit && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "0.22rem 0.6rem", borderRadius: 100, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: "0.7rem" }}>
                        🗓 {itinerary.bestTimeToVisit}
                      </span>
                    )}
                    {itinerary?.totalBudgetEstimate && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "0.22rem 0.6rem", borderRadius: 100, background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.25)", color: "#f5c87a", fontSize: "0.7rem", fontWeight: 500 }}>
                        💰 {itinerary.totalBudgetEstimate}
                      </span>
                    )}
                  </div>

                  {/* Streaming day list */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem", overflowY: "auto" }}>
                    {streamingDays.map((day) => (
                      <div key={day.dayNumber} className="planner-day-in" style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                        <div className="day-dot" />
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>Day {day.dayNumber}: </span>
                          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                            {day.title}{isStreaming && day.dayNumber === streamingDays.length ? "…" : ""}
                          </span>
                        </div>
                      </div>
                    ))}
                    {/* Skeletons for un-arrived days */}
                    {isStreaming && Array.from({ length: Math.max(0, params.days - streamingDays.length) }).map((_, i) => (
                      <div key={`skel-${i}`} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                        <div className="planner-skel" style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        <div className="planner-skel" style={{ flex: 1, height: 10, borderRadius: 4, background: "rgba(255,255,255,0.1)" }} />
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div style={{ borderRadius: 8, overflow: "hidden", height: 32, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", position: "relative", flexShrink: 0 }}>
                    <div style={{
                      position: "absolute", left: 0, top: 0, bottom: 0, width: `${progress}%`,
                      backgroundImage: progress === 100 ? "linear-gradient(90deg, #22c55e, #16a34a)" : "linear-gradient(90deg, #f5a623, #f59e0b)",
                      transition: "width 0.5s ease, background-image 0.5s",
                      animation: isStreaming && progress < 100 ? "planner-shimmer 2s linear infinite" : "none",
                      backgroundSize: "200% 100%",
                    }} />
                    <span style={{ position: "relative", zIndex: 1, fontSize: "0.73rem", fontWeight: 600, color: progress > 15 ? "#fff" : "rgba(255,255,255,0.5)", paddingLeft: "0.75rem", lineHeight: "32px", whiteSpace: "nowrap" }}>
                      {progress === 0 && "Ready to generate"}
                      {progress > 0 && progress < 100 && `Creating your journey… ${Math.round(progress)}%`}
                      {progress === 100 && "✓ Itinerary complete!"}
                    </span>
                  </div>

                  {/* Action buttons */}
                  {!isStreaming && hasResult && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flexShrink: 0 }}>
                      {/* Auth-gated Save */}
                      {!authLoading && !user ? (
                        <div className="login-banner" style={{
                          display: "flex", alignItems: "center", gap: "0.75rem",
                          padding: "0.75rem 1rem", borderRadius: 12,
                          background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.3)",
                        }}>
                          <LogIn size={18} style={{ color: "#f5c87a", flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "0.8rem", color: "#f5c87a", fontWeight: 600, marginBottom: 2 }}>Login to save your itinerary</p>
                            <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>Sign in to keep this trip in your collection</p>
                          </div>
                          <button
                            id="ai-planner-login-btn"
                            onClick={openAuthModal}
                            style={{
                              padding: "0.45rem 0.9rem", borderRadius: 8, border: "none",
                              background: "linear-gradient(135deg, #f5a623, #e05c20)",
                              color: "#fff", fontSize: "0.75rem", fontWeight: 700,
                              fontFamily: "var(--font-sans)", cursor: "pointer", flexShrink: 0,
                            }}
                          >
                            Sign In
                          </button>
                        </div>
                      ) : !authLoading && (
                        <button
                          id="ai-planner-save-btn"
                          onClick={handleSave}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                            padding: "0.75rem 1rem", borderRadius: 10, border: "none",
                            background: "linear-gradient(135deg, #f5a623, #e88c10)",
                            color: "#fff", fontSize: "0.88rem", fontWeight: 700,
                            fontFamily: "var(--font-sans)", cursor: "pointer", transition: "all 0.25s",
                          }}
                        >
                          <CheckCircle size={15} /> Save to My Itineraries
                        </button>
                      )}

                      {/* Export + Maps + Redo row */}
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <ExportDropdown itinerary={itinerary} streamingDays={streamingDays} params={params} />

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
                </>
              )}

              {/* ── IDLE (no generation yet) ── */}
              {step === "form" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                  <Map size={42} style={{ color: "rgba(255,255,255,0.12)", marginBottom: "0.5rem" }} />
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
                    Fill in your trip details on the left and click Generate
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            FULL DAY-BY-DAY BREAKDOWN (below the panels, after generation)
        ═══════════════════════════════════════════════════════════════════ */}
        {!isStreaming && streamingDays.length > 0 && step !== "saved" && (
          <div
            style={{
              marginTop: "2rem", width: "100%", maxWidth: 1100,
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.12)", padding: "1.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>
                Full Itinerary — {streamingDays.length} Days
              </h3>
              {itinerary?.tags && (
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {itinerary.tags.map((tag) => (
                    <span key={tag} style={{ padding: "0.2rem 0.65rem", borderRadius: 100, background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.25)", color: "#f5c87a", fontSize: "0.7rem" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {streamingDays.map((day) => (
                <div key={day.dayNumber} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {/* Day header — clickable accordion */}
                  <button
                    onClick={() => toggleDay(day.dayNumber)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
                      padding: "1rem 1.25rem", background: "rgba(255,255,255,0.06)",
                      border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", textAlign: "left",
                    }}
                  >
                    <span style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: "linear-gradient(135deg, #f5a623, #e05c20)",
                      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.72rem", fontWeight: 700, flexShrink: 0,
                    }}>
                      D{day.dayNumber}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}>{day.title}</div>
                      {day.summary && !expandedDays.has(day.dayNumber) && (
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {day.summary}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>{(day.activities || []).length} stops</span>
                    <ChevronRight
                      size={16}
                      style={{
                        color: "rgba(255,255,255,0.4)", flexShrink: 0,
                        transform: expandedDays.has(day.dayNumber) ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>

                  {/* Day activities */}
                  {expandedDays.has(day.dayNumber) && (
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
                              <span style={{
                                width: 28, height: 28, borderRadius: "50%",
                                background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0, color: "#f5c87a",
                              }}>
                                <Icon size={12} />
                              </span>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: 2, flexWrap: "wrap" }}>
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
                                    💡 {act.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
