"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
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
  const [form, setForm] = useState<TripForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`/api/admin/trips/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.trip) {
          const t = d.trip;
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
    if (!confirm(`Delete this trip? This cannot be undone.`)) return;
    await fetch(`/api/admin/trips/${slug}`, { method: "DELETE" });
    router.push("/admin/trips");
  };

  if (loading) return <div style={{ color: "#64748b" }}>Loading trip…</div>;
  if (!form) return <div style={{ color: "#ef4444" }}>Trip not found.</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <Link href="/admin/trips" style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", textDecoration: "none", fontSize: "0.875rem" }}>
          <ArrowLeft size={16} /> Back to Trips
        </Link>
        <button
          onClick={handleDelete}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", borderRadius: 10, border: "1px solid #FCA5A5", background: "#FEF2F2", color: "#dc2626", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
        >
          <Trash2 size={14} /> Delete Trip
        </button>
      </div>

      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.25rem" }}>Edit Trip</h1>
      <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "0 0 1.75rem" }}>/{slug}</p>

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

          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
            <button
              type="submit"
              disabled={saving}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.7rem 1.5rem", borderRadius: 10, background: "linear-gradient(135deg,#006CE4,#3B82F6)", color: "#fff", border: "none", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}
            >
              <Save size={16} />
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
