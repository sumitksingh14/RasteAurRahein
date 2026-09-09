"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Image,
  DollarSign,
  Hotel,
  Navigation,
  Cloud,
  Camera,
} from "lucide-react";
import type { TripFieldName } from "@/lib/enrichment/types";

type FieldStatus = "missing" | "pending" | "ai_filled" | "verified" | "stale";

interface FieldSummary {
  field: TripFieldName;
  status: FieldStatus;
  confidence: number | null;
  generatedAt: string | null;
  verifiedAt: string | null;
}

interface TripReport {
  tripSlug: string;
  tripTitle: string;
  tripStatus: string;
  fields: FieldSummary[];
  statusCounts: Record<string, number>;
  completenessScore: number;
}

interface GapsResponse {
  trips: TripReport[];
  totalTrips: number;
  summary: Record<string, number>;
}

// ---------------------------------------------------------------------------
// Field metadata
// ---------------------------------------------------------------------------
const FIELD_META: Record<
  TripFieldName,
  { label: string; icon: React.ElementType; color: string }
> = {
  cover_image: { label: "Cover", icon: Image, color: "#8b5cf6" },
  gallery_images: { label: "Gallery", icon: Camera, color: "#06b6d4" },
  overall_cost: { label: "Cost", icon: DollarSign, color: "#f59e0b" },
  stay_recommendations: { label: "Stay", icon: Hotel, color: "#10b981" },
  route_options: { label: "Routes", icon: Navigation, color: "#3b82f6" },
  weather_summary: { label: "Weather", icon: Cloud, color: "#64748b" },
};

const STATUS_COLORS: Record<FieldStatus, string> = {
  missing: "#ef4444",
  pending: "#f59e0b",
  ai_filled: "#3b82f6",
  verified: "#10b981",
  stale: "#94a3b8",
};

const STATUS_ICONS: Record<FieldStatus, React.ElementType> = {
  missing: AlertCircle,
  pending: Clock,
  ai_filled: Sparkles,
  verified: CheckCircle,
  stale: RefreshCw,
};

// ---------------------------------------------------------------------------
// Field cell component
// ---------------------------------------------------------------------------
function FieldCell({ field }: { field: FieldSummary }) {
  const meta = FIELD_META[field.field];
  const FieldIcon = meta.icon;
  const StatusIcon = STATUS_ICONS[field.status];
  const statusColor = STATUS_COLORS[field.status];

  return (
    <div
      title={`${meta.label}: ${field.status}${field.confidence != null ? ` (${Math.round(field.confidence * 100)}%)` : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: 52,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background:
            field.status === "missing"
              ? "rgba(239,68,68,0.1)"
              : field.status === "verified"
                ? "rgba(16,185,129,0.1)"
                : field.status === "ai_filled"
                  ? "rgba(59,130,246,0.1)"
                  : field.status === "pending"
                    ? "rgba(245,158,11,0.1)"
                    : "rgba(148,163,184,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <FieldIcon size={14} color={meta.color} />
        <div
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatusIcon size={9} color={statusColor} />
        </div>
      </div>
      <span
        style={{
          fontSize: "0.6rem",
          color: "#94a3b8",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {meta.label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Completeness bar
// ---------------------------------------------------------------------------
function CompletenessBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color =
    pct >= 80 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          background: "#e2e8f0",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 4,
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <span style={{ fontSize: "0.7rem", color, fontWeight: 600, minWidth: 30 }}>
        {pct}%
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Summary chip
// ---------------------------------------------------------------------------
function SummaryChip({
  status,
  count,
}: {
  status: string;
  count: number;
}) {
  const color =
    status === "verified"
      ? "#10b981"
      : status === "ai_filled"
        ? "#3b82f6"
        : status === "pending"
          ? "#f59e0b"
          : status === "stale"
            ? "#94a3b8"
            : "#ef4444";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: `${color}15`,
        border: `1px solid ${color}30`,
        borderRadius: 20,
        padding: "2px 10px",
        fontSize: "0.75rem",
        fontWeight: 600,
        color,
      }}
    >
      {count}
      <span style={{ fontWeight: 400, opacity: 0.7 }}>{status}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function EnrichmentGapsPage() {
  const [data, setData] = useState<GapsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FieldStatus | "all">("all");
  const [sweeping, setSweeping] = useState(false);
  const [sweepMsg, setSweepMsg] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetch("/api/admin/enrichment/gaps")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Failed to load");
        setLoading(false);
      });
  };

  useEffect(load, []);

  const handleSweep = async () => {
    setSweeping(true);
    setSweepMsg(null);
    try {
      const res = await fetch("/api/enrichment/sweep", { method: "POST" });
      const d = await res.json();
      setSweepMsg(`Queued ${d.queued ?? 0} enrichment jobs.`);
      setTimeout(load, 1500);
    } catch {
      setSweepMsg("Failed to trigger sweep.");
    } finally {
      setSweeping(false);
    }
  };

  const filteredTrips = data?.trips.filter((t) => {
    if (filter === "all") return true;
    return t.fields.some((f) => f.status === filter);
  });

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#0f172a",
              margin: 0,
            }}
          >
            ✨ Enrichment Gaps
          </h1>
          <p style={{ color: "#64748b", margin: "0.35rem 0 0", fontSize: "0.9rem" }}>
            Completeness tracker — fields missing AI-enriched data across all trips.
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link
            href="/admin/enrichment/review"
            style={{
              padding: "0.55rem 1.1rem",
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              background: "#fff",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#0f172a",
              textDecoration: "none",
            }}
          >
            Review Queue
          </Link>
          <Link
            href="/admin/enrichment/runs"
            style={{
              padding: "0.55rem 1.1rem",
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              background: "#fff",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#0f172a",
              textDecoration: "none",
            }}
          >
            Run Logs
          </Link>
          <button
            onClick={handleSweep}
            disabled={sweeping}
            style={{
              padding: "0.55rem 1.25rem",
              borderRadius: 10,
              border: "none",
              background: sweeping
                ? "#93c5fd"
                : "linear-gradient(135deg,#006CE4,#3B82F6)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#fff",
              cursor: sweeping ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Sparkles size={14} />
            {sweeping ? "Sweeping…" : "Sweep & Enrich All"}
          </button>
        </div>
      </div>

      {sweepMsg && (
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 10,
            padding: "0.75rem 1rem",
            marginBottom: "1.5rem",
            color: "#166534",
            fontSize: "0.85rem",
          }}
        >
          {sweepMsg}
        </div>
      )}

      {/* Global summary chips */}
      {data && (
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          {(
            [
              "missing",
              "pending",
              "ai_filled",
              "verified",
              "stale",
            ] as const
          ).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? "all" : s)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: 0,
                outline:
                  filter === s
                    ? `2px solid ${STATUS_COLORS[s]}`
                    : "none",
                borderRadius: 20,
              }}
            >
              <SummaryChip status={s} count={data.summary[s] ?? 0} />
            </button>
          ))}
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: "1.5rem",
          fontSize: "0.75rem",
          color: "#64748b",
        }}
      >
        {(
          [
            ["missing", "❌ Missing"],
            ["pending", "⏳ Pending"],
            ["ai_filled", "🤖 AI Filled (unverified)"],
            ["verified", "✅ Verified"],
            ["stale", "🔄 Stale"],
          ] as const
        ).map(([status, label]) => (
          <span key={status} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: STATUS_COLORS[status as FieldStatus],
                display: "inline-block",
              }}
            />
            {label}
          </span>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ color: "#64748b", fontSize: "0.9rem" }}>
          Loading completeness report…
        </div>
      ) : error ? (
        <p style={{ color: "#ef4444" }}>{error}</p>
      ) : !filteredTrips?.length ? (
        <p style={{ color: "#64748b" }}>No trips match the current filter.</p>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 340px 80px",
              padding: "0.75rem 1.5rem",
              borderBottom: "1px solid #f1f5f9",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <span>Trip</span>
            <span>Completeness</span>
            <span>Fields</span>
            <span>Actions</span>
          </div>

          {filteredTrips?.map((trip, i) => (
            <div
              key={trip.tripSlug}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 340px 80px",
                padding: "1rem 1.5rem",
                borderBottom:
                  i < (filteredTrips?.length ?? 0) - 1
                    ? "1px solid #f8fafc"
                    : "none",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {/* Trip name */}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#0f172a",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {trip.tripTitle}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#94a3b8",
                    marginTop: 2,
                  }}
                >
                  {trip.tripSlug}
                </div>
              </div>

              {/* Completeness bar */}
              <div style={{ paddingRight: "1rem" }}>
                <CompletenessBar score={trip.completenessScore} />
              </div>

              {/* Field cells */}
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {trip.fields.map((f) => (
                  <FieldCell key={f.field} field={f} />
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={async () => {
                    const missingFields = trip.fields
                      .filter((f) => f.status === "missing" || f.status === "stale")
                      .map((f) => f.field);
                    for (const field of missingFields) {
                      await fetch("/api/enrichment/trigger", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          tripSlug: trip.tripSlug,
                          field,
                          priority: "high",
                        }),
                      });
                    }
                    setTimeout(load, 1000);
                  }}
                  title="Trigger enrichment for missing fields"
                  style={{
                    padding: "0.35rem 0.65rem",
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    color: "#475569",
                  }}
                >
                  <Sparkles size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
