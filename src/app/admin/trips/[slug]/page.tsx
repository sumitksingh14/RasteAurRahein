"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft, Save, Trash2, List, Settings, Code2,
  Calendar, Clock, Eye, MapPin, DollarSign, Tag,
  ChevronDown, Lightbulb, Car, Utensils, Bed, Binoculars, Camera,
  Sparkles, CheckCircle, AlertCircle, RefreshCw, Globe, FileText,
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Itinerary Preview (read-only, admin-themed)
// ─────────────────────────────────────────────────────────────
const ACTIVITY_ICONS: Record<string, React.ElementType> = {
  transport: Car,
  food: Utensils,
  accommodation: Bed,
  sightseeing: Binoculars,
  activity: Camera,
};

const ACTIVITY_COLORS: Record<string, string> = {
  transport: "#3b82f6",
  food: "#f59e0b",
  accommodation: "#8b5cf6",
  sightseeing: "#10b981",
  activity: "#ec4899",
};

function ActivityBadge({ type }: { type?: string }) {
  const color = type && ACTIVITY_COLORS[type] ? ACTIVITY_COLORS[type] : "#94a3b8";
  const Icon = type && ACTIVITY_ICONS[type] ? ACTIVITY_ICONS[type] : MapPin;
  return (
    <span style={{
      width: 28, height: 28, borderRadius: "50%",
      background: `${color}18`,
      border: `1px solid ${color}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <Icon size={12} color={color} />
    </span>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", padding: "0.75rem 0", borderBottom: "1px solid #F1F5F9" }}>
      <ActivityBadge type={activity.type} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: 2 }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0f172a" }}>{activity.title}</span>
          {activity.time && (
            <span style={{ fontSize: "0.72rem", color: "#f59e0b", fontWeight: 600, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 3 }}>
              <Clock size={10} />{activity.time}
            </span>
          )}
        </div>
        {activity.description && (
          <p style={{ fontSize: "0.8rem", color: "#475569", margin: "2px 0 4px", lineHeight: 1.5 }}>{activity.description}</p>
        )}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {activity.location && (
            <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 3 }}>
              <MapPin size={9} />{activity.location.name}
            </span>
          )}
          {activity.cost !== undefined && (
            <span style={{ fontSize: "0.72rem", color: "#10b981", display: "flex", alignItems: "center", gap: 3 }}>
              <DollarSign size={9} />₹{activity.cost.toLocaleString()}
            </span>
          )}
          {activity.type && (
            <span style={{
              fontSize: "0.68rem", fontWeight: 600, padding: "1px 7px", borderRadius: 10,
              background: `${ACTIVITY_COLORS[activity.type] || "#94a3b8"}18`,
              color: ACTIVITY_COLORS[activity.type] || "#94a3b8",
            }}>
              {activity.type}
            </span>
          )}
        </div>
        {activity.notes && (
          <div style={{
            display: "flex", gap: 6, background: "#FFFBEB",
            border: "1px solid #FDE68A", borderRadius: 8,
            padding: "0.4rem 0.65rem", marginTop: 6,
          }}>
            <Lightbulb size={11} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: "0.75rem", color: "#92400E", margin: 0, lineHeight: 1.5 }}>{activity.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DayAccordion({ day, defaultOpen = false }: { day: ItineraryDay; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid", borderColor: open ? "#006CE4" : "#E2E8F0", borderRadius: 12, overflow: "hidden", marginBottom: 8, background: open ? "#fff" : "#F8FAFC" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", padding: "1rem 1.25rem", display: "flex", alignItems: "center",
          gap: "0.75rem", background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 8, flexShrink: 0,
          background: open ? "linear-gradient(135deg,#006CE4,#3B82F6)" : "#EFF6FF",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: "0.55rem", fontWeight: 700, color: open ? "rgba(255,255,255,0.8)" : "#94a3b8", lineHeight: 1, textTransform: "uppercase" }}>DAY</span>
          <span style={{ fontSize: "1rem", fontWeight: 800, color: open ? "#fff" : "#0f172a", lineHeight: 1 }}>{day.dayNumber}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem" }}>{day.title}</div>
          {day.summary && <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{day.summary}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{day.activities?.length || 0} stops</span>
          <ChevronDown size={16} color="#94a3b8" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
        </div>
      </button>
      {open && (
        <div style={{ padding: "0 1.25rem 1rem", borderTop: "1px solid #E2E8F0" }}>
          {day.summary && (
            <p style={{ fontSize: "0.82rem", color: "#475569", fontStyle: "italic", margin: "0.75rem 0 0", paddingLeft: "0.75rem", borderLeft: "2px solid #006CE4", lineHeight: 1.6 }}>
              {day.summary}
            </p>
          )}
          <div style={{ marginTop: "0.75rem" }}>
            {day.activities?.map((act, i) => (
              <ActivityRow key={act._key || i} activity={act} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ItineraryPreviewTab({
  trip,
  onGenerateComplete,
}: {
  trip: Trip;
  onGenerateComplete: (updated: Trip) => void;
}) {
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");

  const handleGenerate = async () => {
    setGenerating(true);
    setGenError("");
    try {
      const res = await fetch(`/api/admin/trips/${trip.slug}/generate`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setGenError(data.error || "Generation failed.");
      } else {
        onGenerateComplete(data.trip);
      }
    } catch {
      setGenError("Network error during generation.");
    } finally {
      setGenerating(false);
    }
  };

  const hasItinerary = trip.itinerary && trip.itinerary.length > 0;
  const totalActivities = trip.itinerary?.reduce((sum, d) => sum + (d.activities?.length || 0), 0) || 0;
  const typeBreakdown = trip.itinerary?.flatMap((d) => d.activities || []).reduce<Record<string, number>>((acc, a) => {
    if (a.type) acc[a.type] = (acc[a.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Stats bar */}
      {hasItinerary && (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {[
            { label: "Days", value: trip.itinerary!.length, color: "#006CE4" },
            { label: "Activities", value: totalActivities, color: "#10b981" },
            { label: "Locations", value: trip.itinerary!.flatMap((d) => d.activities || []).filter((a) => a.location).length, color: "#f59e0b" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: "0.75rem 1.25rem", display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: stat.color }}>{stat.value}</span>
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{stat.label}</span>
            </div>
          ))}
          {typeBreakdown && Object.entries(typeBreakdown).map(([type, count]) => (
            <div key={type} style={{
              background: `${ACTIVITY_COLORS[type] || "#94a3b8"}12`,
              border: `1px solid ${ACTIVITY_COLORS[type] || "#94a3b8"}30`,
              borderRadius: 10, padding: "0.75rem 1.25rem", display: "flex", gap: 8, alignItems: "center",
            }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: ACTIVITY_COLORS[type] || "#94a3b8" }}>{count}</span>
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{type}</span>
            </div>
          ))}
        </div>
      )}

      {/* Regenerate button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem", gap: "0.75rem", alignItems: "center" }}>
        {genError && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#dc2626", fontSize: "0.8rem" }}>
            <AlertCircle size={14} />{genError}
          </div>
        )}
        <button
          onClick={handleGenerate}
          disabled={generating}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "0.55rem 1.1rem", borderRadius: 10,
            background: generating ? "#E2E8F0" : "linear-gradient(135deg,#7c3aed,#a78bfa)",
            color: generating ? "#94a3b8" : "#fff",
            border: "none", fontSize: "0.82rem", fontWeight: 600,
            cursor: generating ? "not-allowed" : "pointer",
          }}
        >
          {generating ? <RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={13} />}
          {generating ? "Generating…" : hasItinerary ? "Re-generate with AI" : "Generate Itinerary with AI"}
        </button>
      </div>

      {/* Empty state */}
      {!hasItinerary && !generating && (
        <div style={{
          textAlign: "center", padding: "3rem 2rem",
          border: "2px dashed #E2E8F0", borderRadius: 16,
          color: "#94a3b8", background: "#FAFAFA",
        }}>
          <List size={32} style={{ marginBottom: "0.75rem", opacity: 0.4 }} />
          <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 6 }}>No itinerary yet</div>
          <div style={{ fontSize: "0.85rem" }}>Click "Generate Itinerary with AI" to auto-create a day-by-day plan.</div>
        </div>
      )}

      {/* Generating skeleton */}
      {generating && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ height: 64, borderRadius: 12, background: `rgba(0,108,228,${0.04 + i * 0.01})`, animation: "pulse 1.5s ease-in-out infinite" }} />
          ))}
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {/* Day accordions */}
      {hasItinerary && !generating && (
        <div>
          {trip.itinerary!.map((day, idx) => (
            <DayAccordion key={day._key || idx} day={day} defaultOpen={idx === 0} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Raw JSON tab
// ─────────────────────────────────────────────────────────────
function RawDataTab({ trip }: { trip: Trip }) {
  const [copied, setCopied] = useState(false);
  const raw = JSON.stringify(trip, null, 2);
  const handleCopy = () => {
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.75rem" }}>
        <button
          onClick={handleCopy}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.45rem 0.9rem", borderRadius: 8, border: "1px solid #E2E8F0", background: "#fff", color: "#475569", fontSize: "0.8rem", cursor: "pointer" }}
        >
          {copied ? <CheckCircle size={13} color="#10b981" /> : <Code2 size={13} />}
          {copied ? "Copied!" : "Copy JSON"}
        </button>
      </div>
      <pre style={{
        background: "#0f172a", color: "#e2e8f0", padding: "1.5rem", borderRadius: 12,
        fontSize: "0.78rem", lineHeight: 1.6, overflow: "auto", maxHeight: "60vh",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}>
        {raw}
      </pre>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────
type TabId = "overview" | "itinerary" | "raw";

interface TripForm {
  title: string;
  excerpt: string;
  country: string;
  tags: string;
  startDate: string;
  endDate: string;
  bestSuggestedMonth: string;
  status: string;
  totalBudget: string;
  currency: string;
  tripType: string;
}

export default function EditTripPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [form, setForm] = useState<TripForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const loadTrip = useCallback(() => {
    setLoading(true);
    fetch(`/api/admin/trips/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.trip) {
          const t: Trip = d.trip;
          setTrip(t);
          setForm({
            title: t.title || "",
            excerpt: t.excerpt || "",
            country: t.country || "",
            tags: (t.tags || []).join(", "),
            startDate: t.startDate || "",
            endDate: t.endDate || "",
            bestSuggestedMonth: t.bestSuggestedMonth || "",
            status: t.status || "draft",
            totalBudget: t.totalBudget ? String(t.totalBudget) : "",
            currency: t.currency || "INR",
            tripType: t.tripType || "",
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => { loadTrip(); }, [loadTrip]);

  const set = (k: string, v: string) => setForm((f) => f ? { ...f, [k]: v } : f);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setError(""); setSuccess("");
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/trips/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          totalBudget: form.totalBudget ? Number(form.totalBudget) : undefined,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Failed to update.");
      } else {
        const data = await res.json();
        setTrip(data.trip);
        setSuccess("Trip updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this trip? This cannot be undone.")) return;
    await fetch(`/api/admin/trips/${slug}`, { method: "DELETE" });
    router.push("/admin/trips");
  };

  // Compute derived values
  const durationDays = trip?.startDate && trip?.endDate
    ? Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
    : null;

  if (loading) return <div style={{ color: "#64748b", padding: "2rem" }}>Loading trip…</div>;
  if (!form || !trip) return <div style={{ color: "#ef4444", padding: "2rem" }}>Trip not found.</div>;

  const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
    { id: "overview", label: "Overview & Edit", Icon: Settings },
    { id: "itinerary", label: `Itinerary${trip.itinerary?.length ? ` (${trip.itinerary.length} days)` : ""}`, Icon: List },
    { id: "raw", label: "Raw JSON", Icon: Code2 },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <Link href="/admin/trips" style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", textDecoration: "none", fontSize: "0.875rem" }}>
          <ArrowLeft size={16} /> Back to Trips
        </Link>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <Link
            href={`/trips/${slug}`}
            target="_blank"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 0.9rem", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#475569", textDecoration: "none", fontSize: "0.82rem" }}
          >
            <Eye size={13} /> Preview
          </Link>
          <button
            onClick={handleDelete}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", borderRadius: 10, border: "1px solid #FCA5A5", background: "#FEF2F2", color: "#dc2626", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {/* Title + meta */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{trip.title}</h1>
          <span style={{
            padding: "3px 10px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 600,
            background: trip.status === "published" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
            color: trip.status === "published" ? "#059669" : "#d97706",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            {trip.status === "published" ? <Globe size={10} /> : <FileText size={10} />}
            {trip.status}
          </span>
        </div>
        <div style={{ display: "flex", gap: "1.25rem", color: "#94a3b8", fontSize: "0.78rem", flexWrap: "wrap" }}>
          <span>/{slug}</span>
          {trip.country && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={10} />{trip.country}</span>}
          {durationDays && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} />{durationDays} days</span>}
          {trip.viewCount !== undefined && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Eye size={10} />{trip.viewCount.toLocaleString()} views</span>}
          {trip.totalBudget && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><DollarSign size={10} />₹{trip.totalBudget.toLocaleString()}</span>}
          {trip.bestSuggestedMonth && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Calendar size={10} />{trip.bestSuggestedMonth}</span>}
          {trip.tags?.length && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Tag size={10} />{trip.tags.slice(0, 3).join(", ")}
              {trip.tags.length > 3 && ` +${trip.tags.length - 3}`}
            </span>
          )}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0.25rem", background: "#F8FAFC", padding: "0.3rem", borderRadius: 10, marginBottom: "1.5rem", width: "fit-content", border: "1px solid #E2E8F0" }}>
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "0.5rem 1rem", borderRadius: 8,
              border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 500,
              fontFamily: "inherit", whiteSpace: "nowrap",
              background: activeTab === id ? "#fff" : "transparent",
              color: activeTab === id ? "#006CE4" : "#64748b",
              boxShadow: activeTab === id ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <Icon size={14} />{label}
          </button>
        ))}
      </div>

      {/* ── TAB: Overview & Edit ── */}
      {activeTab === "overview" && (
        <>
          {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", color: "#dc2626", fontSize: "0.875rem" }}>{error}</div>}
          {success && <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", color: "#16a34a", fontSize: "0.875rem" }}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <Field label="Title">
                <input style={inputStyle} value={form.title} onChange={(e) => set("title", e.target.value)} required />
              </Field>

              <Field label="Excerpt">
                <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
                <Field label="Country">
                  <input style={inputStyle} value={form.country} onChange={(e) => set("country", e.target.value)} />
                </Field>
                <Field label="Trip Type">
                  <input style={inputStyle} value={form.tripType} onChange={(e) => set("tripType", e.target.value)} />
                </Field>
                <Field label="Status">
                  <select style={inputStyle} value={form.status} onChange={(e) => set("status", e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </Field>
              </div>

              <Field label="Tags (comma-separated)">
                <input style={inputStyle} value={form.tags} onChange={(e) => set("tags", e.target.value)} />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <Field label="Start Date">
                  <input style={inputStyle} type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
                </Field>
                <Field label="End Date">
                  <input style={inputStyle} type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
                <Field label="Total Budget">
                  <input style={inputStyle} type="number" value={form.totalBudget} onChange={(e) => set("totalBudget", e.target.value)} />
                </Field>
                <Field label="Currency">
                  <select style={inputStyle} value={form.currency} onChange={(e) => set("currency", e.target.value)}>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </Field>
                <Field label="Best Month">
                  <input style={inputStyle} value={form.bestSuggestedMonth} onChange={(e) => set("bestSuggestedMonth", e.target.value)} />
                </Field>
              </div>

              {/* Read-only stats */}
              <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "1.25rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Read-only Stats</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(160px,100%), 1fr))", gap: "0.75rem" }}>
                  {[
                    { label: "Trip ID", value: trip._id },
                    { label: "Views", value: (trip.viewCount || 0).toLocaleString() },
                    { label: "Itinerary Days", value: trip.itinerary?.length ?? 0 },
                    { label: "Generation", value: trip.generationStatus || "—" },
                    { label: "Created", value: new Date(trip._createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
                    { label: "Updated", value: new Date(trip._updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "0.6rem 0.9rem" }}>
                      <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#0f172a", wordBreak: "break-all" }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.7rem 1.5rem", borderRadius: 10, background: saving ? "#E2E8F0" : "linear-gradient(135deg,#006CE4,#3B82F6)", color: saving ? "#94a3b8" : "#fff", border: "none", fontSize: "0.9rem", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer" }}
                >
                  <Save size={16} />
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </>
      )}

      {/* ── TAB: Itinerary ── */}
      {activeTab === "itinerary" && (
        <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <ItineraryPreviewTab
            trip={trip}
            onGenerateComplete={(updated) => {
              setTrip(updated);
              // Also refresh form with any updated tags/budget/bestMonth from AI
              setForm((f) => f ? {
                ...f,
                tags: (updated.tags || []).join(", "),
                totalBudget: updated.totalBudget ? String(updated.totalBudget) : f.totalBudget,
                bestSuggestedMonth: updated.bestSuggestedMonth || f.bestSuggestedMonth,
                excerpt: updated.excerpt || f.excerpt,
              } : f);
            }}
          />
        </div>
      )}

      {/* ── TAB: Raw JSON ── */}
      {activeTab === "raw" && (
        <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <RawDataTab trip={trip} />
        </div>
      )}
    </div>
  );
}
