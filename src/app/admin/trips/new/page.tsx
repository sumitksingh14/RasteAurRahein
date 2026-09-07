"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Save, Sparkles, CheckCircle, AlertCircle,
  Globe, Clock, Loader, ChevronDown, MapPin, Lightbulb,
  Car, Utensils, Bed, Binoculars, Camera,
} from "lucide-react";
import Link from "next/link";
import type { Trip, ItineraryDay, Activity } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// Shared styles
// ─────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  padding: "0.65rem 0.9rem",
  borderRadius: 10,
  border: "1px solid #E2E8F0",
  fontSize: "0.9rem",
  color: "#0f172a",
  background: "#F8FAFC",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}{required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mini itinerary preview (for the review stage)
// ─────────────────────────────────────────────────────────────
const ACTIVITY_COLORS: Record<string, string> = {
  transport: "#3b82f6", food: "#f59e0b", accommodation: "#8b5cf6",
  sightseeing: "#10b981", activity: "#ec4899",
};
const ACTIVITY_ICONS: Record<string, React.ElementType> = {
  transport: Car, food: Utensils, accommodation: Bed,
  sightseeing: Binoculars, activity: Camera,
};

function ActivityRow({ activity }: { activity: Activity }) {
  const Icon = activity.type && ACTIVITY_ICONS[activity.type] ? ACTIVITY_ICONS[activity.type] : MapPin;
  const color = activity.type && ACTIVITY_COLORS[activity.type] ? ACTIVITY_COLORS[activity.type] : "#94a3b8";
  return (
    <div style={{ display: "flex", gap: "0.65rem", padding: "0.6rem 0", borderBottom: "1px solid #F1F5F9" }}>
      <span style={{ width: 24, height: 24, borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={10} color={color} />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0f172a" }}>{activity.title}</span>
          {activity.time && <span style={{ fontSize: "0.68rem", color: "#f59e0b", fontWeight: 600 }}>{activity.time}</span>}
        </div>
        {activity.description && <p style={{ fontSize: "0.74rem", color: "#64748b", margin: "2px 0 0", lineHeight: 1.4 }}>{activity.description}</p>}
        {activity.notes && (
          <div style={{ display: "flex", gap: 4, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 6, padding: "0.3rem 0.5rem", marginTop: 4 }}>
            <Lightbulb size={9} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: "0.68rem", color: "#92400E" }}>{activity.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DayCard({ day, defaultOpen }: { day: ItineraryDay; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ border: "1px solid", borderColor: open ? "#006CE4" : "#E2E8F0", borderRadius: 10, overflow: "hidden", marginBottom: 6, background: open ? "#fff" : "#F8FAFC" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ width: "100%", padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: "0.65rem", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 7, background: open ? "linear-gradient(135deg,#006CE4,#3B82F6)" : "#EFF6FF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "0.5rem", fontWeight: 700, color: open ? "rgba(255,255,255,0.8)" : "#94a3b8", lineHeight: 1, textTransform: "uppercase" }}>DAY</span>
          <span style={{ fontSize: "0.9rem", fontWeight: 800, color: open ? "#fff" : "#0f172a", lineHeight: 1 }}>{day.dayNumber}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>{day.title}</div>
          {day.summary && !open && <div style={{ fontSize: "0.72rem", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{day.summary}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{day.activities?.length || 0} stops</span>
          <ChevronDown size={14} color="#94a3b8" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
        </div>
      </button>
      {open && (
        <div style={{ padding: "0 1rem 0.75rem", borderTop: "1px solid #E2E8F0" }}>
          {day.summary && <p style={{ fontSize: "0.78rem", color: "#475569", fontStyle: "italic", margin: "0.65rem 0 0.5rem", paddingLeft: "0.65rem", borderLeft: "2px solid #006CE4", lineHeight: 1.5 }}>{day.summary}</p>}
          {day.activities?.map((act, i) => <ActivityRow key={act._key || i} activity={act} />)}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Generation progress steps
// ─────────────────────────────────────────────────────────────
const GEN_STEPS = [
  { id: "create", label: "Saving draft to database", icon: Save },
  { id: "generate", label: "Generating day-by-day itinerary with AI", icon: Sparkles },
  { id: "enrich", label: "Enriching with tags, budget & best month", icon: Globe },
  { id: "save", label: "Saving enriched trip", icon: CheckCircle },
];

type StepStatus = "pending" | "active" | "done" | "error";

function ProgressSteps({ currentStep, error }: { currentStep: number; error?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {GEN_STEPS.map((step, idx) => {
        const status: StepStatus =
          idx < currentStep ? "done"
          : idx === currentStep ? (error ? "error" : "active")
          : "pending";
        const Icon = step.icon;
        return (
          <div
            key={step.id}
            style={{
              display: "flex", alignItems: "center", gap: "0.875rem",
              padding: "0.875rem 1.1rem", borderRadius: 10,
              border: `1px solid ${status === "active" ? "#006CE4" : status === "done" ? "#10b981" : status === "error" ? "#ef4444" : "#E2E8F0"}`,
              background: status === "active" ? "#EFF6FF" : status === "done" ? "#F0FDF4" : status === "error" ? "#FEF2F2" : "#F8FAFC",
              transition: "all 0.3s",
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: status === "done" ? "#10b981" : status === "active" ? "#006CE4" : status === "error" ? "#ef4444" : "#E2E8F0",
            }}>
              {status === "done" && <CheckCircle size={15} color="#fff" />}
              {status === "active" && !error && <Loader size={15} color="#fff" style={{ animation: "spin 1s linear infinite" }} />}
              {status === "error" && <AlertCircle size={15} color="#fff" />}
              {status === "pending" && <Icon size={15} color="#94a3b8" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: status === "pending" ? "#94a3b8" : "#0f172a" }}>
                {step.label}
              </div>
              {status === "active" && !error && <div style={{ fontSize: "0.72rem", color: "#006CE4", marginTop: 2 }}>In progress…</div>}
              {status === "active" && error && <div style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: 2 }}>{error}</div>}
              {status === "done" && <div style={{ fontSize: "0.72rem", color: "#10b981", marginTop: 2 }}>Complete</div>}
            </div>
          </div>
        );
      })}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main page — 3 stages
// ─────────────────────────────────────────────────────────────
type Stage = "form" | "generating" | "review";

export default function NewTripPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("form");
  const [genStep, setGenStep] = useState(0);
  const [genError, setGenError] = useState("");
  const [createdTrip, setCreatedTrip] = useState<Trip | null>(null);
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    country: "",
    tags: "",
    startDate: "",
    endDate: "",
    bestSuggestedMonth: "",
    status: "draft" as const,
    totalBudget: "",
    currency: "INR",
    tripType: "",
    days: "5",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.title || !form.slug) { setFormError("Title and Slug are required."); return; }
    if (!form.days || Number(form.days) < 1 || Number(form.days) > 30) {
      setFormError("Number of days must be between 1 and 30.");
      return;
    }

    setStage("generating");
    setGenStep(0);
    setGenError("");

    // ── Step 0: Create draft in Redis ──
    try {
      const createRes = await fetch("/api/admin/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          totalBudget: form.totalBudget ? Number(form.totalBudget) : undefined,
          status: "draft",
          generationStatus: "generating",
          // Compute dates from "days" if no explicit dates given
          ...(form.days && !form.startDate ? {
            startDate: new Date().toISOString().split("T")[0],
            endDate: (() => {
              const d = new Date();
              d.setDate(d.getDate() + Number(form.days) - 1);
              return d.toISOString().split("T")[0];
            })(),
          } : {}),
        }),
      });
      if (!createRes.ok) {
        const data = await createRes.json();
        setGenError(data.error || "Failed to create draft.");
        return;
      }
      const { trip } = await createRes.json();
      setCreatedTrip(trip);
      setGenStep(1);

      // ── Step 1-3: Generate itinerary via LLM ──
      const generateRes = await fetch(`/api/admin/trips/${trip.slug}/generate`, {
        method: "POST",
      });
      const generateData = await generateRes.json();

      if (!generateRes.ok) {
        setGenStep(1); // stay on generate step
        setGenError(generateData.error || "AI generation failed.");
        return;
      }

      setGenStep(2); // enrich step (already done inside generate, but show it)
      await new Promise((r) => setTimeout(r, 600)); // brief pause for UX

      setGenStep(3); // saving
      await new Promise((r) => setTimeout(r, 400));

      setCreatedTrip(generateData.trip);
      setStage("review");
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  const handlePublish = async () => {
    if (!createdTrip) return;
    const res = await fetch(`/api/admin/trips/${createdTrip.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "published" }),
    });
    if (res.ok) {
      router.push(`/admin/trips/${createdTrip.slug}`);
    }
  };

  // ── STAGE: Form ──────────────────────────────────────────────
  if (stage === "form") {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <Link href="/admin/trips" style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", textDecoration: "none", fontSize: "0.875rem" }}>
            <ArrowLeft size={16} /> Back to Trips
          </Link>
        </div>

        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.35rem" }}>New Trip</h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>
            Fill in the details below. The AI will automatically generate a complete day-by-day itinerary after you save.
          </p>
        </div>

        {/* AI generation info banner */}
        <div style={{ display: "flex", gap: "0.75rem", background: "linear-gradient(135deg,#EFF6FF,#F5F3FF)", border: "1px solid #BFDBFE", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
          <Sparkles size={18} color="#7c3aed" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1e1b4b", marginBottom: 3 }}>AI-Powered Itinerary Generation</div>
            <div style={{ fontSize: "0.8rem", color: "#4338ca", lineHeight: 1.5 }}>
              After saving, the AI will generate a full day-by-day itinerary, tags, budget estimates, and best travel months.
              You can review everything before publishing.
            </div>
          </div>
        </div>

        {formError && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", color: "#dc2626", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: 6 }}>
            <AlertCircle size={14} />{formError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <Field label="Title" required>
                <input
                  style={inputStyle} value={form.title} required
                  onChange={(e) => { set("title", e.target.value); if (!form.slug) set("slug", autoSlug(e.target.value)); }}
                  placeholder="e.g. Spiti Valley Road Trip"
                />
              </Field>
              <Field label="Slug" required>
                <input style={inputStyle} value={form.slug} required
                  onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s/g, "-"))}
                  placeholder="e.g. spiti-valley-road-trip"
                />
              </Field>
            </div>

            <Field label="Excerpt">
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="Short description for cards and SEO…"
              />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1.25rem" }}>
              <Field label="Country">
                <input style={inputStyle} value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="India" />
              </Field>
              <Field label="Trip Type">
                <input style={inputStyle} value={form.tripType} onChange={(e) => set("tripType", e.target.value)} placeholder="Adventure, Road Trip…" />
              </Field>
              <Field label="Number of Days" required>
                <input style={inputStyle} type="number" min={1} max={30} value={form.days} required
                  onChange={(e) => set("days", e.target.value)} placeholder="5" />
              </Field>
              <Field label="Currency">
                <select style={inputStyle} value={form.currency} onChange={(e) => set("currency", e.target.value)}>
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </Field>
            </div>

            <Field label="Tags (comma-separated)">
              <input style={inputStyle} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Adventure, India, Himalayas" />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
              <Field label="Start Date">
                <input style={inputStyle} type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
              </Field>
              <Field label="End Date">
                <input style={inputStyle} type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
              </Field>
              <Field label="Best Month">
                <input style={inputStyle} value={form.bestSuggestedMonth} onChange={(e) => set("bestSuggestedMonth", e.target.value)} placeholder="June – September" />
              </Field>
            </div>

            <Field label="Total Budget (optional — AI will estimate if blank)">
              <input style={inputStyle} type="number" value={form.totalBudget} onChange={(e) => set("totalBudget", e.target.value)} placeholder="110000" />
            </Field>

            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
              <button
                type="submit"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "0.75rem 1.75rem", borderRadius: 10,
                  background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                  color: "#fff", border: "none", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
                }}
              >
                <Sparkles size={16} /> Save & Generate Itinerary
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // ── STAGE: Generating ────────────────────────────────────────
  if (stage === "generating") {
    return (
      <div>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.35rem" }}>Generating Itinerary…</h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.875rem" }}>
            The AI is creating a full day-by-day itinerary for <strong>{form.title}</strong>. This may take 15–30 seconds.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", maxWidth: 560 }}>
          <ProgressSteps currentStep={genStep} error={genError} />

          {genError && (
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "0.75rem 1rem", color: "#dc2626", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6 }}>
                <AlertCircle size={14} />Generation failed: {genError}
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {createdTrip && (
                  <Link
                    href={`/admin/trips/${createdTrip.slug}`}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.6rem 1.2rem", borderRadius: 10, background: "linear-gradient(135deg,#006CE4,#3B82F6)", color: "#fff", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}
                  >
                    Edit draft & retry
                  </Link>
                )}
                <button
                  onClick={() => { setStage("form"); setGenError(""); setGenStep(0); }}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.6rem 1.2rem", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#475569", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  <ArrowLeft size={14} />Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── STAGE: Review & Publish ──────────────────────────────────
  if (stage === "review" && createdTrip) {
    const itinerary = createdTrip.itinerary || [];
    const totalActivities = itinerary.reduce((s, d) => s + (d.activities?.length || 0), 0);
    const locCount = itinerary.flatMap((d) => d.activities || []).filter((a) => a.location).length;

    return (
      <div>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: 6 }}>
              <CheckCircle size={22} color="#10b981" />
              <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Itinerary Ready!</h1>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontSize: "0.875rem" }}>
              Review the AI-generated itinerary for <strong>{createdTrip.title}</strong> below, then publish when ready.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Link
              href={`/admin/trips/${createdTrip.slug}`}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.65rem 1.1rem", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}
            >
              Edit Details
            </Link>
            <button
              onClick={handlePublish}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "0.65rem 1.5rem", borderRadius: 10,
                background: "linear-gradient(135deg,#10b981,#34d399)",
                color: "#fff", border: "none", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
              }}
            >
              <Globe size={15} /> Publish Trip
            </button>
          </div>
        </div>

        {/* Trip summary card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>{createdTrip.title}</h2>
              {createdTrip.excerpt && <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem", maxWidth: 600, lineHeight: 1.5 }}>{createdTrip.excerpt}</p>}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {createdTrip.tags?.map((tag) => (
                <span key={tag} style={{ fontSize: "0.72rem", fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: "#EFF6FF", color: "#006CE4" }}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(140px,100%), 1fr))", gap: "0.75rem" }}>
            {[
              { label: "Days", value: itinerary.length, icon: Clock },
              { label: "Activities", value: totalActivities, icon: Camera },
              { label: "Locations", value: locCount, icon: MapPin },
              { label: "Budget", value: createdTrip.totalBudget ? `₹${createdTrip.totalBudget.toLocaleString()}` : "—", icon: null },
              { label: "Best Month", value: createdTrip.bestSuggestedMonth || "—", icon: null },
              { label: "Country", value: createdTrip.country || "—", icon: null },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "0.65rem 0.9rem" }}>
                <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2, display: "flex", alignItems: "center", gap: 3 }}>
                  {Icon && <Icon size={9} />}{label}
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary accordion */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem 1.5rem 1rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1rem" }}>Day-by-Day Itinerary</h3>
          {itinerary.map((day, idx) => (
            <DayCard key={day._key || idx} day={day} defaultOpen={idx === 0} />
          ))}
        </div>

        {/* Bottom publish button */}
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <Link
            href={`/admin/trips/${createdTrip.slug}`}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.75rem 1.5rem", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#475569", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}
          >
            Keep as Draft
          </Link>
          <button
            onClick={handlePublish}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "0.75rem 2rem", borderRadius: 10,
              background: "linear-gradient(135deg,#10b981,#34d399)",
              color: "#fff", border: "none", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
            }}
          >
            <Globe size={16} /> Publish Trip
          </button>
        </div>
      </div>
    );
  }

  return null;
}
