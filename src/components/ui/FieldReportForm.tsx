"use client";

import { useState } from "react";
import { Star, Send, Camera, Calendar, Leaf } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

const SEASONS = ["Summer", "Monsoon", "Winter", "Spring", "Autumn"] as const;

interface FieldReportFormProps {
  tripSlug: string;
  onSubmitted: () => void;
}

export default function FieldReportForm({ tripSlug, onSubmitted }: FieldReportFormProps) {
  const { user, openAuthModal } = useAuth();
  const [body, setBody] = useState("");
  const [dateOfTravel, setDateOfTravel] = useState("");
  const [season, setSeason] = useState<typeof SEASONS[number]>("Summer");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [photoUrls, setPhotoUrls] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    return (
      <div
        style={{
          background: "rgba(0,108,228,0.04)",
          border: "1px dashed rgba(0,108,228,0.25)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📝</div>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "0.95rem" }}>
          Sign in to submit a field report for this trip.
        </p>
        <button onClick={openAuthModal} className="btn btn-primary" style={{ padding: "0.5rem 1.5rem" }}>
          Sign in to write a report
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        style={{
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.25)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎉</div>
        <h3 style={{ color: "var(--text-primary)", marginBottom: "0.5rem", fontFamily: "var(--font-sans)", fontWeight: 700 }}>
          Report submitted!
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Your field report is under review and will appear here once approved. Thanks for contributing!
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) { setError("Please write your experience."); return; }
    if (!rating) { setError("Please select a rating."); return; }
    if (!dateOfTravel) { setError("Please enter your travel date."); return; }

    setError("");
    setLoading(true);

    try {
      const urls = photoUrls.filter((u) => u.trim().startsWith("http"));
      const res = await fetch("/api/field-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tripSlug, text: body, dateOfTravel, season, rating, photoUrls: urls }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Submission failed. Try again."); return; }
      setSubmitted(true);
      onSubmitted();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.9rem",
    background: "var(--surface-elevated, rgba(255,255,255,0.06))",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    outline: "none",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--surface-elevated, rgba(255,255,255,0.04))",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.75rem",
        marginTop: "2rem",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "var(--text-primary)",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Send size={16} style={{ color: "var(--accent-blue, #006CE4)" }} />
        Write a Field Report
      </h3>

      {/* Rating */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "0.5rem" }}>
          Your Rating *
        </label>
        <div style={{ display: "flex", gap: "6px" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(n)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}
            >
              <Star
                size={28}
                fill={(hoverRating || rating) >= n ? "#FEBB02" : "none"}
                color={(hoverRating || rating) >= n ? "#FEBB02" : "var(--text-muted)"}
                strokeWidth={1.5}
              />
            </button>
          ))}
          {rating > 0 && (
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", alignSelf: "center", marginLeft: "0.25rem" }}>
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
            </span>
          )}
        </div>
      </div>

      {/* Travel Date + Season row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
        <div>
          <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "0.5rem" }}>
            <Calendar size={11} style={{ display: "inline", marginRight: 4 }} />
            Date of Travel *
          </label>
          <input
            type="month"
            value={dateOfTravel}
            onChange={(e) => setDateOfTravel(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "0.5rem" }}>
            <Leaf size={11} style={{ display: "inline", marginRight: 4 }} />
            Season *
          </label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value as typeof SEASONS[number])}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {SEASONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Body */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "0.5rem" }}>
          Your Experience *
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share road conditions, weather, crowd levels, hidden gems, honest tips..."
          rows={5}
          maxLength={2000}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
        />
        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem", textAlign: "right" }}>
          {body.length}/2000
        </div>
      </div>

      {/* Photo URLs */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "0.5rem" }}>
          <Camera size={11} style={{ display: "inline", marginRight: 4 }} />
          Photos (optional — paste up to 5 image URLs)
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {photoUrls.map((url, i) => (
            <input
              key={i}
              type="url"
              placeholder={`Photo ${i + 1} URL (https://...)`}
              value={url}
              onChange={(e) => {
                const updated = [...photoUrls];
                updated[i] = e.target.value;
                setPhotoUrls(updated);
              }}
              style={{ ...inputStyle, fontSize: "0.82rem" }}
            />
          ))}
        </div>
        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
          Tip: Upload photos to Google Photos / Imgur and paste the direct image link.
        </p>
      </div>

      {error && (
        <p style={{ color: "#DC2626", fontSize: "0.85rem", marginBottom: "1rem", background: "rgba(220,38,38,0.06)", padding: "0.6rem 0.9rem", borderRadius: "var(--radius-md)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.65rem 1.5rem" }}
      >
        <Send size={15} />
        {loading ? "Submitting…" : "Submit Field Report"}
      </button>
    </form>
  );
}
