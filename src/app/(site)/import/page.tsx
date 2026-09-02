"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  MapPin,
  Clock,
  Eye,
  Loader2,
  Sparkles,
  Plane,
  Bed,
  Map,
  Car,
  Train,
  Ship,
  X
} from "lucide-react";
import { parseItineraryAction, confirmImportAction, getSuggestionsAction } from "./actions";
import type { ImportSegment } from "@/lib/services/ImportService";
import type { Suggestion } from "@/lib/services/SuggestionService";

type Step = "input" | "parsing" | "preview" | "suggestions" | "error";

export default function ImportPage() {
  const [step, setStep] = useState<Step>("input");
  const [html, setHtml] = useState("");
  const [segments, setSegments] = useState<ImportSegment[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const handleParse = async () => {
    if (!html.trim()) return;
    setStep("parsing");
    setErrorMsg("");
    setWarnings([]);
    setSegments([]);

    try {
      const res = await parseItineraryAction("paste_text", html);
      setSegments(res.segments || []);
      setWarnings(res.warnings || []);
      setStep("preview");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStep("error");
    }
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      // Mock trip ID for demo purposes
      await confirmImportAction("demo-trip-id", segments);
      setStep("suggestions");
      
      // Fetch suggestions asynchronously
      setIsLoadingSuggestions(true);
      const { suggestions } = await getSuggestionsAction("demo-trip-id", segments);
      setSuggestions(suggestions || []);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to confirm");
    } finally {
      setIsConfirming(false);
    }
  };

  const reset = () => {
    setStep("input");
    setSegments([]);
    setSuggestions([]);
    setErrorMsg("");
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "flight": return <Plane size={16} />;
      case "lodging": return <Bed size={16} />;
      case "car_rental": return <Car size={16} />;
      case "activity": return <Map size={16} />;
      case "train": return <Train size={16} />;
      case "cruise": return <Ship size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* Page header */}
      <section
        style={{
          padding: "4rem 0 3rem",
          background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: 800 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.4rem 1rem",
              background: "var(--accent-gold-dim)",
              border: "1px solid var(--border-accent)",
              borderRadius: "100px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--accent-gold)",
              marginBottom: "1.25rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <Upload size={12} />
            Smart Import
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Import Itinerary
          </h1>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 560 }}>
            Paste raw text from confirmation emails, booking sites, or planners. Our AI will automatically extract flights, hotels, and activities into structured segments.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem", maxWidth: 900 }}>
        {/* ── STEP 1: INPUT ── */}
        {(step === "input" || step === "error") && (
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--text-muted)",
                  marginBottom: "0.625rem",
                }}
              >
                Paste your confirmation text
              </label>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="Flight Confirmation: AC123 to Lisbon..."
                rows={18}
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1.6,
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color var(--transition)",
                }}
              />
            </div>

            {step === "error" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "0.875rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(232, 133, 125, 0.1)",
                  border: "1px solid rgba(232, 133, 125, 0.3)",
                  color: "var(--accent-rose)",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}
              >
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handleParse}
                disabled={!html.trim()}
                className="btn btn-primary"
                style={{ opacity: !html.trim() ? 0.5 : 1, cursor: !html.trim() ? "not-allowed" : "pointer" }}
              >
                <FileText size={16} />
                Extract Details
              </button>
            </div>
          </div>
        )}

        {/* ── PARSING SPINNER ── */}
        {step === "parsing" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "5rem 2rem",
              gap: "1rem",
              color: "var(--text-muted)",
            }}
          >
            <Loader2 size={36} style={{ color: "var(--accent-gold)", animation: "spin 1s linear infinite" }} />
            <p style={{ fontSize: "0.9rem" }}>Analyzing text and extracting segments…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ── STEP 2: PREVIEW ── */}
        {step === "preview" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(78, 205, 196, 0.08)",
                border: "1px solid rgba(78, 205, 196, 0.25)",
                color: "var(--accent-teal)",
                marginBottom: "2rem",
              }}
            >
              <CheckCircle size={18} />
              <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                Extraction Complete — found {segments.length} segment{segments.length !== 1 ? "s" : ""}
              </span>
            </div>
            
            {warnings.length > 0 && (
              <div style={{ marginBottom: "2rem", padding: "1rem", background: "rgba(232, 133, 125, 0.1)", borderRadius: "var(--radius-sm)", color: "var(--accent-rose)" }}>
                <strong>Warnings:</strong>
                <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                  {warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {segments.map((seg) => {
                const isLowConfidence = seg.confidence < 0.8;
                return (
                  <div
                    key={seg.id}
                    style={{
                      border: `1px solid ${isLowConfidence ? "var(--accent-gold)" : "var(--border)"}`,
                      borderRadius: "var(--radius-md)",
                      padding: "1.25rem",
                      background: isLowConfidence ? "rgba(254, 187, 2, 0.03)" : "var(--bg-card)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-blue)", fontWeight: 600, textTransform: "capitalize" }}>
                        {getIconForType(seg.type)}
                        {seg.type.replace("_", " ")}
                      </div>
                      {isLowConfidence && (
                        <div style={{ fontSize: "0.75rem", color: "var(--accent-gold)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <AlertCircle size={12} /> Please Review
                        </div>
                      )}
                    </div>
                    <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Provider</label>
                        <div style={{ fontWeight: 500 }}>{seg.provider}</div>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Confirmation #</label>
                        <div style={{ fontWeight: 500 }}>{seg.confirmationNumber || "—"}</div>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Start</label>
                        <div>{seg.startDateTime}</div>
                      </div>
                      {seg.endDateTime && (
                        <div>
                          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>End</label>
                          <div>{seg.endDateTime}</div>
                        </div>
                      )}
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Location</label>
                        <div>{seg.location.name}</div>
                      </div>
                      {seg.destinationLocation && (
                        <div>
                          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Destination</label>
                          <div>{seg.destinationLocation.name}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button
                className="btn btn-primary"
                onClick={handleConfirm}
                disabled={isConfirming}
              >
                {isConfirming ? <Loader2 size={16} className="spin" /> : <CheckCircle size={16} />}
                Confirm & Save
              </button>
              <button onClick={reset} className="btn btn-outline" disabled={isConfirming}>
                Discard
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: SUGGESTIONS ── */}
        {step === "suggestions" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(78, 205, 196, 0.08)",
                border: "1px solid rgba(78, 205, 196, 0.25)",
                color: "var(--accent-teal)",
                marginBottom: "2rem",
              }}
            >
              <CheckCircle size={18} />
              <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                Successfully Saved!
              </span>
            </div>

            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Sparkles size={18} color="var(--accent-gold)" />
              Itinerary Enhancements
            </h3>
            
            {isLoadingSuggestions ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
                <Loader2 size={16} className="spin" /> Checking past trips for recommendations...
              </div>
            ) : suggestions.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {suggestions.map((s) => (
                  <div key={s.id} style={{ padding: "1rem", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: 600, color: "var(--accent-blue)", fontSize: "0.9rem" }}>{s.segment.provider}</span>
                      <span style={{ fontSize: "0.75rem", background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>{s.sourceType}</span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", marginBottom: "1rem" }}>{s.rationale}</p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="btn btn-primary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Add to Itinerary</button>
                      <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Dismiss</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)" }}>No additional suggestions at this time.</p>
            )}

            <div style={{ marginTop: "2rem" }}>
              <button className="btn btn-outline" onClick={reset}>Import Another</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
