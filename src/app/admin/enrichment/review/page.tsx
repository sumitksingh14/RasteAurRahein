"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Edit3,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import type {
  TripFieldStatus,
  TripFieldName,
  EnrichedWeatherValue,
  EnrichedCostValue,
  EnrichedStayValue,
  EnrichedRouteValue,
  EnrichedImageValue,
} from "@/lib/enrichment/types";

type QueueItem = TripFieldStatus & { _tripTitle?: string };

// ---------------------------------------------------------------------------
// Value renderers
// ---------------------------------------------------------------------------
function WeatherPreview({ value }: { value: EnrichedWeatherValue }) {
  return (
    <div>
      <p style={{ margin: "0 0 0.5rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
        {value.summary}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {value.bestMonths.map((m) => (
          <span
            key={m}
            style={{
              background: "#dbeafe",
              color: "#1d4ed8",
              borderRadius: 20,
              padding: "2px 8px",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {m}
          </span>
        ))}
      </div>
      <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: 6 }}>
        Forecast date: {new Date(value.forecastDate).toLocaleDateString()}
      </div>
    </div>
  );
}

function CostPreview({ value }: { value: EnrichedCostValue }) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {value.lineItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0.5rem",
              background: "#f8fafc",
              borderRadius: 6,
              fontSize: "0.8rem",
            }}
          >
            <div>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>
                {item.label}
              </span>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: 6,
                    color: "#3b82f6",
                    fontSize: "0.7rem",
                  }}
                >
                  <ExternalLink size={10} style={{ display: "inline" }} />
                </a>
              )}
            </div>
            <span style={{ color: "#475569", fontWeight: 600 }}>
              ₹{item.minINR.toLocaleString()}–₹{item.maxINR.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 8,
          fontWeight: 700,
          fontSize: "0.9rem",
          color: "#0f172a",
        }}
      >
        Total: ₹{value.totalMinINR.toLocaleString()}–₹
        {value.totalMaxINR.toLocaleString()}
      </div>
    </div>
  );
}

function StayPreview({ value }: { value: EnrichedStayValue }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {value.stays.map((stay, i) => (
        <div
          key={i}
          style={{
            padding: "0.5rem",
            background: "#f8fafc",
            borderRadius: 6,
            fontSize: "0.8rem",
          }}
        >
          <div style={{ fontWeight: 600, color: "#0f172a" }}>
            {stay.name}
            {stay.nominatimVerified && (
              <span
                style={{
                  marginLeft: 6,
                  color: "#10b981",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                }}
              >
                ✓ OSM verified
              </span>
            )}
          </div>
          <div style={{ color: "#64748b" }}>
            {stay.town} · {stay.type} · {stay.priceBand}
          </div>
          {stay.bookingUrl && (
            <a
              href={stay.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3b82f6", fontSize: "0.75rem" }}
            >
              Booking link ↗
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function RoutePreview({ value }: { value: EnrichedRouteValue }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {value.routes.map((route, i) => (
        <div
          key={i}
          style={{
            padding: "0.5rem",
            background: "#f8fafc",
            borderRadius: 6,
            fontSize: "0.8rem",
          }}
        >
          <div style={{ fontWeight: 600, color: "#0f172a" }}>
            {route.name} ({route.profile})
          </div>
          <div style={{ color: "#64748b", fontSize: "0.75rem" }}>
            {route.distanceKm} km · ~{route.durationMin} min
          </div>
          <div style={{ marginTop: 4, color: "#475569", lineHeight: 1.5 }}>
            {route.description}
          </div>
        </div>
      ))}
    </div>
  );
}

function ImagePreview({ value }: { value: EnrichedImageValue }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {value.images.map((img) => (
        <div key={img.unsplashId} style={{ position: "relative" }}>
          <img
            src={img.thumbUrl}
            alt={img.alt}
            style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 6 }}
          />
          <div
            style={{
              fontSize: "0.6rem",
              color: "#94a3b8",
              marginTop: 2,
            }}
          >
            © {img.attribution.photographerName}
          </div>
        </div>
      ))}
    </div>
  );
}

function FieldValuePreview({ field, value }: { field: TripFieldName; value: unknown }) {
  if (!value) return <span style={{ color: "#94a3b8" }}>No value</span>;
  switch (field) {
    case "weather_summary":
      return <WeatherPreview value={value as EnrichedWeatherValue} />;
    case "overall_cost":
      return <CostPreview value={value as EnrichedCostValue} />;
    case "stay_recommendations":
      return <StayPreview value={value as EnrichedStayValue} />;
    case "route_options":
      return <RoutePreview value={value as EnrichedRouteValue} />;
    case "cover_image":
    case "gallery_images":
      return <ImagePreview value={value as EnrichedImageValue} />;
    default:
      return (
        <pre
          style={{
            fontSize: "0.75rem",
            background: "#f8fafc",
            padding: "0.5rem",
            borderRadius: 6,
            overflow: "auto",
            maxHeight: 200,
          }}
        >
          {JSON.stringify(value, null, 2)}
        </pre>
      );
  }
}

// ---------------------------------------------------------------------------
// Review card
// ---------------------------------------------------------------------------
function ReviewCard({
  item,
  onAction,
}: {
  item: QueueItem;
  onAction: (
    tripSlug: string,
    field: TripFieldName,
    action: "approve" | "reject",
    editedValue?: unknown
  ) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(
    JSON.stringify(item.value, null, 2)
  );
  const [actionPending, setActionPending] = useState(false);

  const confidencePct = Math.round((item.confidence ?? 0) * 100);
  const confidenceColor =
    confidencePct >= 80
      ? "#10b981"
      : confidencePct >= 60
        ? "#f59e0b"
        : "#ef4444";

  const handleApprove = async () => {
    setActionPending(true);
    let editedValue: unknown = undefined;
    if (editing) {
      try {
        editedValue = JSON.parse(editText);
      } catch {
        alert("Invalid JSON in edit view. Please fix before approving.");
        setActionPending(false);
        return;
      }
    }
    await onAction(item.tripSlug, item.field, "approve", editedValue);
    setActionPending(false);
  };

  const handleReject = async () => {
    if (!confirm(`Reject ${item.field} for ${item.tripSlug}? This will reset it to missing.`)) return;
    setActionPending(true);
    await onAction(item.tripSlug, item.field, "reject");
    setActionPending(false);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        overflow: "hidden",
        border: "1px solid #f1f5f9",
      }}
    >
      {/* Card header */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid #f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div>
          <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "1rem" }}>
            {item._tripTitle ?? item.tripSlug}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
            {item.tripSlug} · Field:{" "}
            <code
              style={{
                background: "#f1f5f9",
                padding: "1px 6px",
                borderRadius: 4,
                fontSize: "0.75rem",
              }}
            >
              {item.field}
            </code>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Confidence */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: confidenceColor,
              }}
            >
              {confidencePct}%
            </div>
            <div style={{ fontSize: "0.65rem", color: "#94a3b8" }}>confidence</div>
          </div>

          {/* Generated at */}
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
            {item.generatedAt
              ? new Date(item.generatedAt).toLocaleDateString()
              : "—"}
          </div>
        </div>
      </div>

      {/* Citations */}
      {item.citations && item.citations.length > 0 && (
        <div
          style={{
            padding: "0.75rem 1.5rem",
            background: "#f8fafc",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Citations ({item.citations.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {item.citations.slice(0, 3).map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.75rem",
                  color: "#3b82f6",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
              >
                <ExternalLink size={10} style={{ display: "inline", marginRight: 4 }} />
                {url}
              </a>
            ))}
            {item.citations.length > 3 && (
              <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                +{item.citations.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Value preview / edit */}
      <div style={{ padding: "1rem 1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
            }}
          >
            Proposed Value
          </div>
          <button
            onClick={() => setEditing(!editing)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: "0.75rem",
              color: "#64748b",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <Edit3 size={12} />
            {editing ? "Show Preview" : "Edit"}
          </button>
        </div>

        {editing ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{
              width: "100%",
              minHeight: 200,
              fontFamily: "monospace",
              fontSize: "0.75rem",
              padding: "0.5rem",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        ) : (
          <FieldValuePreview field={item.field} value={item.value} />
        )}
      </div>

      {/* Warning for high-stakes fields */}
      {(item.field === "overall_cost" || item.field === "stay_recommendations") && (
        <div
          style={{
            padding: "0.65rem 1.5rem",
            background: "#fffbeb",
            borderTop: "1px solid #fef3c7",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.75rem",
            color: "#92400e",
          }}
        >
          <AlertTriangle size={13} />
          Verify against real sources before approving — travellers will rely on this.
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          padding: "0.75rem 1.5rem",
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          gap: 8,
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={handleReject}
          disabled={actionPending}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0.5rem 1rem",
            borderRadius: 8,
            border: "1px solid #fecaca",
            background: "#fef2f2",
            color: "#dc2626",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <XCircle size={14} />
          Reject
        </button>
        <button
          onClick={handleApprove}
          disabled={actionPending}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0.5rem 1.25rem",
            borderRadius: 8,
            border: "none",
            background: actionPending
              ? "#93c5fd"
              : "linear-gradient(135deg,#006CE4,#3B82F6)",
            color: "#fff",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: actionPending ? "not-allowed" : "pointer",
          }}
        >
          <CheckCircle size={14} />
          {editing ? "Edit & Approve" : "Approve"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function ReviewQueuePage() {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterField, setFilterField] = useState<TripFieldName | "all">("all");

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/enrichment/gaps")
      .then((r) => r.json())
      .then((data) => {
        // Extract all ai_filled fields across all trips
        const queue: QueueItem[] = [];
        for (const trip of data.trips ?? []) {
          for (const fieldInfo of trip.fields ?? []) {
            if (fieldInfo.status === "ai_filled") {
              queue.push({
                id: `${trip.tripSlug}:${fieldInfo.field}`,
                tripSlug: trip.tripSlug,
                field: fieldInfo.field,
                status: "ai_filled",
                value: null, // loaded separately
                sourceType: "llm",
                confidence: fieldInfo.confidence ?? 0,
                citations: [],
                generatedAt: fieldInfo.generatedAt,
                verifiedAt: null,
                verifiedBy: null,
                pendingReason: null,
                reportCount: 0,
                _tripTitle: trip.tripTitle,
              });
            }
          }
        }
        setItems(queue);
        setLoading(false);

        // Load full values in parallel
        for (const item of queue) {
          fetch(
            `/api/enrichment/status?tripSlug=${item.tripSlug}&field=${item.field}`
          )
            .then((r) => r.json())
            .then((d) => {
              if (d.status) {
                setItems((prev) =>
                  prev.map((i) =>
                    i.tripSlug === item.tripSlug && i.field === item.field
                      ? { ...i, value: d.status.value, citations: d.status.citations ?? [] }
                      : i
                  )
                );
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAction = async (
    tripSlug: string,
    field: TripFieldName,
    action: "approve" | "reject",
    editedValue?: unknown
  ) => {
    const res = await fetch("/api/admin/enrichment/review", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripSlug, field, action, editedValue }),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.filter((i) => !(i.tripSlug === tripSlug && i.field === field))
      );
    } else {
      alert("Action failed. Please try again.");
    }
  };

  const FIELD_NAMES: TripFieldName[] = [
    "cover_image",
    "gallery_images",
    "overall_cost",
    "stay_recommendations",
    "route_options",
    "weather_summary",
  ];

  const filtered =
    filterField === "all"
      ? items
      : items.filter((i) => i.field === filterField);

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
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Link
              href="/admin/enrichment"
              style={{ color: "#64748b", textDecoration: "none", fontSize: "0.85rem" }}
            >
              <ChevronLeft size={14} style={{ display: "inline" }} /> Enrichment
            </Link>
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#0f172a",
              margin: 0,
            }}
          >
            🔍 Review Queue
          </h1>
          <p style={{ color: "#64748b", margin: "0.35rem 0 0", fontSize: "0.9rem" }}>
            AI-suggested values awaiting human approval.{" "}
            <strong>{filtered.length}</strong> pending.
          </p>
        </div>

        <button
          onClick={load}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0.55rem 1rem",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "#fff",
            fontSize: "0.85rem",
            cursor: "pointer",
            color: "#475569",
          }}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Field filter */}
      <div
        style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.5rem" }}
      >
        <button
          onClick={() => setFilterField("all")}
          style={{
            padding: "0.35rem 0.85rem",
            borderRadius: 20,
            border: "1px solid",
            borderColor: filterField === "all" ? "#3b82f6" : "#e2e8f0",
            background: filterField === "all" ? "#eff6ff" : "#fff",
            color: filterField === "all" ? "#1d4ed8" : "#64748b",
            fontSize: "0.8rem",
            fontWeight: filterField === "all" ? 700 : 400,
            cursor: "pointer",
          }}
        >
          All ({items.length})
        </button>
        {FIELD_NAMES.map((f) => {
          const count = items.filter((i) => i.field === f).length;
          if (count === 0) return null;
          return (
            <button
              key={f}
              onClick={() => setFilterField(f)}
              style={{
                padding: "0.35rem 0.85rem",
                borderRadius: 20,
                border: "1px solid",
                borderColor: filterField === f ? "#3b82f6" : "#e2e8f0",
                background: filterField === f ? "#eff6ff" : "#fff",
                color: filterField === f ? "#1d4ed8" : "#64748b",
                fontSize: "0.8rem",
                fontWeight: filterField === f ? 700 : 400,
                cursor: "pointer",
              }}
            >
              {f.replace(/_/g, " ")} ({count})
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ color: "#64748b" }}>Loading review queue…</div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "3rem",
            textAlign: "center",
            color: "#64748b",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <Sparkles size={32} color="#c7d2fe" style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 600 }}>No items in the review queue</div>
          <div style={{ fontSize: "0.85rem", marginTop: 4 }}>
            All AI-suggested values have been reviewed.
          </div>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {filtered.map((item) => (
            <ReviewCard
              key={`${item.tripSlug}:${item.field}`}
              item={item}
              onAction={handleAction}
            />
          ))}
        </div>
      )}
    </div>
  );
}
