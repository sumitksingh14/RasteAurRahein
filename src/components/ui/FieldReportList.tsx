"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, Calendar, Leaf, User, Clock, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import type { FieldReport, Season } from "@/lib/fieldReports";

const SEASON_EMOJIS: Record<Season, string> = {
  Summer: "☀️",
  Monsoon: "🌧️",
  Winter: "❄️",
  Spring: "🌸",
  Autumn: "🍂",
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          fill={rating >= n ? "#FEBB02" : "none"}
          color={rating >= n ? "#FEBB02" : "var(--text-muted)"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function ReportCard({ report, onDeleted }: { report: FieldReport; onDeleted: (id: string) => void }) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const canDelete = user && (user.id === report.userId || user.isAdmin);
  const isPending = report.status === "pending";

  const formattedDate = (() => {
    try {
      const d = new Date(report.dateOfTravel + "-01");
      return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
    } catch {
      return report.dateOfTravel;
    }
  })();

  const photoList = report.photoUrls
    ? report.photoUrls.split(",").filter(Boolean)
    : [];

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/field-reports/${report.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) onDeleted(report.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      style={{
        background: isPending ? "rgba(245,158,11,0.04)" : "var(--surface-elevated, rgba(255,255,255,0.04))",
        border: `1px solid ${isPending ? "rgba(245,158,11,0.25)" : "var(--border)"}`,
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem 1.5rem",
        transition: "box-shadow 0.2s ease",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-blue, #006CE4), #0057b8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {report.authorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <User size={13} style={{ opacity: 0.5 }} />
              {report.authorName}
              {isPending && (
                <span style={{ fontSize: "0.68rem", background: "rgba(245,158,11,0.15)", color: "#b45309", padding: "1px 8px", borderRadius: 100, fontWeight: 700 }}>
                  Pending review
                </span>
              )}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "2px", flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Calendar size={11} /> {formattedDate}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Leaf size={11} />
                {SEASON_EMOJIS[report.season]} {report.season}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <StarRow rating={report.rating} />
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", opacity: deleting ? 0.5 : 1 }}
              title="Delete your report"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Body — truncated with expand */}
      <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.5rem" }}>
        {report.body.length > 280 && !expanded
          ? `${report.body.slice(0, 280)}…`
          : report.body}
      </div>
      {report.body.length > 280 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-blue, #006CE4)", fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, padding: 0, marginBottom: "0.75rem" }}
        >
          {expanded ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> Read more</>}
        </button>
      )}

      {/* Photos */}
      {photoList.length > 0 && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
          {photoList.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Report photo ${i + 1}`}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </a>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.75rem", display: "flex", alignItems: "center", gap: 4 }}>
        <Clock size={11} />
        {new Date(report.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </div>
    </div>
  );
}

interface FieldReportListProps {
  tripSlug: string;
  refreshKey?: number;
}

export default function FieldReportList({ tripSlug, refreshKey = 0 }: FieldReportListProps) {
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/field-reports?tripSlug=${encodeURIComponent(tripSlug)}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } finally {
      setLoading(false);
    }
  }, [tripSlug]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports, refreshKey]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              height: 120,
              borderRadius: "var(--radius-lg)",
              background: "var(--shimmer-bg, rgba(255,255,255,0.06))",
              animation: "shimmer 1.4s infinite",
            }}
          />
        ))}
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem 1.5rem",
          border: "1px dashed var(--border)",
          borderRadius: "var(--radius-lg)",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🧭</div>
        <p style={{ fontSize: "0.9rem" }}>No field reports yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
        <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6 }}>
          <Star size={15} fill="#FEBB02" color="#FEBB02" />
          {reports.filter(r => r.status === "approved").length} Field Report{reports.filter(r => r.status === "approved").length !== 1 ? "s" : ""}
        </h3>
      </div>
      {reports.map((r) => (
        <ReportCard
          key={r.id}
          report={r}
          onDeleted={(id) => setReports((prev) => prev.filter((x) => x.id !== id))}
        />
      ))}
    </div>
  );
}
