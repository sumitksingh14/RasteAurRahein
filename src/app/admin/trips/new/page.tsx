"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
      {children}
    </div>
  );
}

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

export default function NewTripPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    country: "",
    tags: "",
    startDate: "",
    endDate: "",
    bestSuggestedMonth: "",
    status: "draft",
    totalBudget: "",
    currency: "INR",
    tripType: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.slug) { setError("Title and Slug are required."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          totalBudget: form.totalBudget ? Number(form.totalBudget) : undefined,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Failed to create trip.");
      } else {
        router.push("/admin/trips");
      }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/trips" style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", textDecoration: "none", fontSize: "0.875rem" }}>
          <ArrowLeft size={16} /> Back to Trips
        </Link>
      </div>

      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0 0 1.75rem" }}>
        New Trip
      </h1>

      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", color: "#dc2626", fontSize: "0.875rem" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <Field label="Title *">
              <input
                style={inputStyle}
                value={form.title}
                onChange={(e) => { set("title", e.target.value); if (!form.slug) set("slug", autoSlug(e.target.value)); }}
                placeholder="e.g. Spiti Valley Road Trip"
                required
              />
            </Field>
            <Field label="Slug *">
              <input style={inputStyle} value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s/g, "-"))} placeholder="e.g. spiti-valley-road-trip" required />
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
            <Field label="Country">
              <input style={inputStyle} value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="India" />
            </Field>
            <Field label="Trip Type">
              <input style={inputStyle} value={form.tripType} onChange={(e) => set("tripType", e.target.value)} placeholder="Adventure, Road Trip…" />
            </Field>
            <Field label="Status">
              <select style={inputStyle} value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
          </div>

          <Field label="Tags (comma-separated)">
            <input style={inputStyle} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Adventure, India, Himalayas" />
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
              <input style={inputStyle} type="number" value={form.totalBudget} onChange={(e) => set("totalBudget", e.target.value)} placeholder="110000" />
            </Field>
            <Field label="Currency">
              <select style={inputStyle} value={form.currency} onChange={(e) => set("currency", e.target.value)}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </Field>
            <Field label="Best Month">
              <input style={inputStyle} value={form.bestSuggestedMonth} onChange={(e) => set("bestSuggestedMonth", e.target.value)} placeholder="June – September" />
            </Field>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
            <button
              type="submit"
              disabled={saving}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.7rem 1.5rem", borderRadius: 10, background: "linear-gradient(135deg,#006CE4,#3B82F6)", color: "#fff", border: "none", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}
            >
              <Save size={16} />
              {saving ? "Creating…" : "Create Trip"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
