"use client";

import { useState } from "react";
import { CheckCircle, XCircle, MapPin, Calendar, DollarSign, User, FileText } from "lucide-react";
import type { TripSubmission } from "@/lib/tripSubmissions";

export default function SubmissionModerationClient({ initialSubmissions }: { initialSubmissions: TripSubmission[] }) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [busy, setBusy] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setBusy(id);
    try {
      const res = await fetch(`/api/trip-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (res.ok) setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 860, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
        Trip Submissions
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
        {submissions.length} pending submission{submissions.length !== 1 ? "s" : ""}
      </p>

      {submissions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px dashed var(--border)", borderRadius: "var(--radius-lg)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🗂️</div>
          <p style={{ color: "var(--text-muted)" }}>No pending submissions right now.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {submissions.map((s) => (
            <div
              key={s.id}
              style={{ background: "var(--surface-elevated, rgba(255,255,255,0.04))", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "1.25rem 1.5rem", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "0.4rem" }}>{s.title}</h3>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><User size={12} /> {s.authorName}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={12} /> {s.region}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={12} /> {s.days} days</span>
                    {s.budget && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><DollarSign size={12} /> {s.budget}</span>}
                    {s.gpxData && <span style={{ color: "#60a5fa" }}>📍 GPX attached</span>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, alignItems: "center" }}>
                  <button
                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                    style={{ padding: "0.45rem 0.9rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.78rem", cursor: "pointer" }}
                  >
                    <FileText size={13} /> Preview
                  </button>
                  <button
                    onClick={() => updateStatus(s.id, "approved")}
                    disabled={busy === s.id}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.45rem 1rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "var(--radius-md)", color: "#059669", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
                  >
                    <CheckCircle size={14} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(s.id, "rejected")}
                    disabled={busy === s.id}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.45rem 1rem", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: "var(--radius-md)", color: "#DC2626", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              </div>
              {/* Expanded description */}
              {expandedId === s.id && (
                <div style={{ borderTop: "1px solid var(--border)", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.02)" }}>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                    {s.description}
                  </p>
                  {s.coverImageUrl && (
                    <div style={{ marginTop: "0.75rem" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.coverImageUrl} alt="Cover" style={{ maxWidth: 320, borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
