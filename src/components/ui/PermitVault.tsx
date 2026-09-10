"use client";

import { useState, useEffect } from "react";
import { FileText, ExternalLink, ShieldCheck, Check, Save, AlertCircle, Info } from "lucide-react";
import { PERMIT_REGISTRY, type PermitDetail } from "@/lib/permitInfo";

interface PermitVaultProps {
  tripSlug: string;
}

export default function PermitVault({ tripSlug }: PermitVaultProps) {
  const permit: PermitDetail | undefined = PERMIT_REGISTRY[tripSlug];
  const [refNumber, setRefNumber] = useState("");
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  const storageKey = `rar-permit-ref-${tripSlug}`;

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setRefNumber(stored);
    } catch {
      // ignore
    }
  }, [storageKey]);

  if (!permit) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(storageKey, refNumber.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore
    }
  };

  if (!mounted) return null;

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "1.75rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.25rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={18} color="var(--accent-gold)" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-serif)", margin: 0 }}>
              Permit & Checkpost Guidelines
            </h3>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
            Official border and eco-tourism regulations for {permit.region}
          </p>
        </div>

        <a
          href={permit.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-accent)",
            background: "var(--accent-gold)",
            color: "var(--bg-primary)",
            fontSize: "0.82rem",
            fontWeight: 700,
            textDecoration: "none",
            transition: "all var(--transition)",
          }}
        >
          <span>Apply on {permit.portalName}</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Grid: Fee, Processing, Zones */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 700, marginBottom: "0.3rem" }}>
            Permit Name
          </div>
          <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
            {permit.name}
          </div>
        </div>

        <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 700, marginBottom: "0.3rem" }}>
            Government Fee & Timeline
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--accent-gold)", fontWeight: 600 }}>
            {permit.costEstimate}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
            ⏱️ {permit.processingTime}
          </div>
        </div>
      </div>

      {/* Instructions & Required Documents */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "1.75rem" }}>
        <div>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            📋 Documents to Carry
          </div>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {permit.documentsRequired.map((doc, idx) => (
              <li key={idx} style={{ marginBottom: "0.2rem" }}>{doc}</li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            🗺️ Permitted Travel Zones
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {permit.zonesCovered.map((z, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "4px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                📍 {z}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Advisory note */}
      <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "var(--radius-sm)", padding: "0.85rem 1rem", marginBottom: "1.5rem" }}>
        <p style={{ margin: 0, fontSize: "0.78rem", color: "#92400e", lineHeight: 1.5 }}>
          <strong>Important Checkpost Advice:</strong> {permit.instructions}
        </p>
      </div>

      {/* Offline Reference Code Storage */}
      <form onSubmit={handleSave} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "1rem 1.25rem" }}>
        <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.3rem" }}>
          💾 Offline Permit Reference Vault
        </label>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0 0 0.75rem" }}>
          Save your approved permit reference number here for instant recall at checkposts even with zero mobile connectivity.
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="e.g. LAH-2025-884920"
            value={refNumber}
            onChange={(e) => setRefNumber(e.target.value)}
            style={{
              flex: 1,
              minWidth: 200,
              padding: "0.55rem 0.85rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.85rem",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.55rem 1rem",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: saved ? "#10b981" : "var(--accent-gold)",
              color: saved ? "#fff" : "var(--bg-primary)",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            <span>{saved ? "Saved to Device!" : "Save Reference"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
