"use client";

import { useState, useRef } from "react";
import { Send, MapPin, Calendar, DollarSign, FileText, Upload, Image, CheckCircle } from "lucide-react";

const INDIA_REGIONS = [
  "Himachal Pradesh", "Uttarakhand", "Jammu & Kashmir", "Ladakh",
  "Rajasthan", "Gujarat", "Maharashtra", "Goa",
  "Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh", "Telangana",
  "Odisha", "West Bengal", "Sikkim", "Meghalaya", "Assam",
  "Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram", "Tripura",
  "Bihar", "Jharkhand", "Chhattisgarh", "Madhya Pradesh", "Uttar Pradesh",
  "Punjab", "Haryana", "Delhi", "Puducherry", "Andaman & Nicobar Islands",
  "Lakshadweep", "North East Circuit", "South India Circuit", "Cross-Country",
];

export default function SubmitTripForm() {
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [gpxFileName, setGpxFileName] = useState("");
  const [gpxData, setGpxData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const gpxRef = useRef<HTMLInputElement>(null);

  const handleGpxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGpxFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setGpxData(ev.target?.result as string || "");
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !region || !description.trim()) {
      setError("Please fill in title, region, and description.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/trip-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, region, days, budget, description, gpxData: gpxData || undefined, coverImageUrl: coverImageUrl || undefined }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Submission failed. Please try again."); return; }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "var(--radius-md)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "var(--text-muted)",
    marginBottom: "0.5rem",
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <CheckCircle size={60} style={{ color: "#10b981", margin: "0 auto 1rem" }} />
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
          Route Submitted!
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
          Thanks for contributing! Your route is under review and will appear in the trip catalog once approved. We typically review submissions within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Title */}
      <div>
        <label style={labelStyle}><FileText size={12} /> Trip Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Spiti Valley Winter Loop — 10 Days"
          maxLength={120}
          required
          style={inputStyle}
        />
      </div>

      {/* Region + Days */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}><MapPin size={12} /> Region / State *</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">Select a region…</option>
            {INDIA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}><Calendar size={12} /> Duration (days)</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
            min={1}
            max={60}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <label style={labelStyle}><DollarSign size={12} /> Budget Range (optional)</label>
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g. ₹15,000–₹25,000 per person"
          maxLength={60}
          style={inputStyle}
        />
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}><FileText size={12} /> Route Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={`Describe the route, key highlights, road conditions, best season, permits needed, tips for first-timers…\n\nBe as detailed as possible — your experience helps fellow travellers!`}
          rows={8}
          maxLength={3000}
          required
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }}
        />
        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem", textAlign: "right" }}>
          {description.length}/3000
        </div>
      </div>

      {/* GPX Upload */}
      <div>
        <label style={labelStyle}><Upload size={12} /> GPX Track (optional)</label>
        <input
          ref={gpxRef}
          type="file"
          accept=".gpx,application/gpx+xml"
          onChange={handleGpxChange}
          style={{ display: "none" }}
          id="gpx-upload"
        />
        <label
          htmlFor="gpx-upload"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            background: "rgba(255,255,255,0.04)",
            border: "1px dashed rgba(255,255,255,0.15)",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
            color: gpxFileName ? "var(--text-primary)" : "var(--text-muted)",
            fontSize: "0.88rem",
          }}
        >
          <Upload size={16} style={{ flexShrink: 0 }} />
          {gpxFileName ? `✅ ${gpxFileName}` : "Click to upload a .gpx file"}
        </label>
        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
          GPX tracks help us display your route on the map. Export from Strava, Komoot, or Google Maps.
        </p>
      </div>

      {/* Cover Image URL */}
      <div>
        <label style={labelStyle}><Image size={12} /> Cover Image URL (optional)</label>
        <input
          type="url"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="https://... (paste a direct image link)"
          style={inputStyle}
        />
      </div>

      {error && (
        <p style={{ color: "#DC2626", fontSize: "0.85rem", background: "rgba(220,38,38,0.06)", padding: "0.6rem 0.9rem", borderRadius: "var(--radius-md)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.75rem 2rem", alignSelf: "flex-start", fontSize: "0.95rem" }}
      >
        <Send size={16} />
        {loading ? "Submitting…" : "Submit Route for Review"}
      </button>
    </form>
  );
}
