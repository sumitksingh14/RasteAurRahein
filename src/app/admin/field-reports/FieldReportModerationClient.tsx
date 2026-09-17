"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Star, Calendar, Leaf, User } from "lucide-react";
import type { FieldReport, Season } from "@/lib/fieldReports";
import Link from "next/link";

const SEASON_EMOJIS: Record<Season, string> = {
  Summer: "☀️", Monsoon: "🌧️", Winter: "❄️", Spring: "🌸", Autumn: "🍂",
};

export default function FieldReportModerationClient({ initialReports }: { initialReports: FieldReport[] }) {
  const [reports, setReports] = useState(initialReports);
  const [busy, setBusy] = useState<string | null>(null);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setBusy(id);
    try {
      const res = await fetch(`/api/field-reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (res.ok) setReports((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
        Field Report Moderation
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
        {reports.length} pending report{reports.length !== 1 ? "s" : ""}
      </p>

      {reports.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px dashed var(--border)", borderRadius: "var(--radius-lg)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
          <p style={{ color: "var(--text-muted)" }}>All caught up — no pending reports.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {reports.map((r) => (
            <div
              key={r.id}
              style={{
                background: "var(--surface-elevated, rgba(255,255,255,0.04))",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem 1.5rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                <div>
                  <Link
                    href={`/trips/${r.tripSlug}`}
                    style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent-blue, #006CE4)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {r.tripSlug}
                  </Link>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "4px", flexWrap: "wrap", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><User size={12} /> {r.authorName}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={12} /> {r.dateOfTravel}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Leaf size={12} /> {SEASON_EMOJIS[r.season]} {r.season}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {[1,2,3,4,5].map(n => <Star key={n} size={12} fill={r.rating >= n ? "#FEBB02" : "none"} color={r.rating >= n ? "#FEBB02" : "var(--text-muted)"} strokeWidth={1.5} />)}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button
                    onClick={() => updateStatus(r.id, "approved")}
                    disabled={busy === r.id}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.45rem 1rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "var(--radius-md)", color: "#059669", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
                  >
                    <CheckCircle size={14} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(r.id, "rejected")}
                    disabled={busy === r.id}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.45rem 1rem", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: "var(--radius-md)", color: "#DC2626", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                {r.body.slice(0, 400)}{r.body.length > 400 ? "…" : ""}
              </p>
              {r.photoUrls && (
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  📷 {r.photoUrls.split(",").filter(Boolean).length} photo(s) attached
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
