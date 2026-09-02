"use client";

import { useEffect, useState } from "react";
import { Save, Settings } from "lucide-react";

interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  maintenanceMode: string;
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
      {hint && <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: -2 }}>{hint}</div>}
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

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const set = (k: keyof SiteSettings, v: string) =>
    setSettings((s) => s ? { ...s, [k]: v } : s);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setError(""); setSuccess("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) { setError("Failed to save settings."); }
      else { setSuccess("Settings saved successfully!"); setTimeout(() => setSuccess(""), 3000); }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ color: "#64748b" }}>Loading settings…</div>;
  if (!settings) return <div style={{ color: "#ef4444" }}>Failed to load settings.</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.75rem" }}>
        <Settings size={22} color="#0f172a" />
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Site Settings</h1>
      </div>

      {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", color: "#dc2626", fontSize: "0.875rem" }}>{error}</div>}
      {success && <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", color: "#16a34a", fontSize: "0.875rem" }}>{success}</div>}

      <form onSubmit={handleSave}>
        {/* General */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.25rem" }}>General</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <Field label="Site Name">
                <input style={inputStyle} value={settings.siteName} onChange={(e) => set("siteName", e.target.value)} />
              </Field>
              <Field label="Contact Email">
                <input style={inputStyle} type="email" value={settings.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
              </Field>
            </div>
            <Field label="Tagline">
              <input style={inputStyle} value={settings.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Short site description" />
            </Field>
            <Field label="Maintenance Mode" hint="When enabled, visitors see a maintenance page.">
              <select style={inputStyle} value={settings.maintenanceMode} onChange={(e) => set("maintenanceMode", e.target.value)}>
                <option value="false">Disabled</option>
                <option value="true">Enabled</option>
              </select>
            </Field>
          </div>
        </div>

        {/* Social links */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.25rem" }}>Social Links</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <Field label="Instagram URL">
              <input style={inputStyle} type="url" value={settings.instagramUrl} onChange={(e) => set("instagramUrl", e.target.value)} placeholder="https://instagram.com/yourhandle" />
            </Field>
            <Field label="Twitter / X URL">
              <input style={inputStyle} type="url" value={settings.twitterUrl} onChange={(e) => set("twitterUrl", e.target.value)} placeholder="https://x.com/yourhandle" />
            </Field>
            <Field label="YouTube URL">
              <input style={inputStyle} type="url" value={settings.youtubeUrl} onChange={(e) => set("youtubeUrl", e.target.value)} placeholder="https://youtube.com/@yourchannel" />
            </Field>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={saving}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.7rem 1.75rem", borderRadius: 10, background: "linear-gradient(135deg,#006CE4,#3B82F6)", color: "#fff", border: "none", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}
          >
            <Save size={16} />
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
