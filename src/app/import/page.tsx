"use client";

import { useState } from "react";
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
} from "lucide-react";
import type { ParsedItinerary } from "@/lib/types";

type Step = "input" | "parsing" | "preview" | "error";

const SAMPLE_HTML = `<h1>7 Days in Coorg — The Scotland of India</h1>

<h2>Day 1: Arrival & Abbey Falls</h2>
<ul>
  <li>9:00 AM – Land at Mysore Airport, pick up rental car</li>
  <li>11:30 AM – Arrive Madikeri, check in at Pepper Trail Homestay</li>
  <li>2:00 PM – Abbey Falls (20 min walk through cardamom estates)</li>
  <li>5:00 PM – Raja's Seat sunset viewpoint</li>
  <li>7:30 PM – Dinner at Coorg Cuisine restaurant</li>
</ul>

<h2>Day 2: Coffee Estates</h2>
<ul>
  <li>7:00 AM – Morning coffee plantation walk (included with homestay)</li>
  <li>10:00 AM – Tata Coffee Estate guided tour</li>
  <li>1:00 PM – Lunch at local toddy shop — pandi curry, akki roti</li>
  <li>3:00 PM – Nagarhole National Park drive</li>
</ul>

<h2>Day 3: Talacauvery Trek</h2>
<ul>
  <li>6:00 AM – Depart for Brahmagiri Peak trailhead</li>
  <li>8:00 AM – Summit attempt (1608m, 3.5 km each way)</li>
  <li>12:00 PM – Talacauvery temple, origin of River Cauvery</li>
  <li>4:00 PM – Return, hot shower, local spiced toddy</li>
</ul>`;

export default function ImportPage() {
  const [step, setStep] = useState<Step>("input");
  const [html, setHtml] = useState("");
  const [parsed, setParsed] = useState<ParsedItinerary | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  const handleParse = async () => {
    if (!html.trim()) return;
    setStep("parsing");
    setErrorMsg("");

    try {
      const res = await fetch("/api/import-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Parse failed");
      }

      const data = await res.json();
      setParsed(data.parsed);
      setSanitizedHtml(data.sanitizedHtml);
      setStep("preview");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStep("error");
    }
  };

  const useSample = () => {
    setHtml(SAMPLE_HTML);
    setStep("input");
  };

  const reset = () => {
    setStep("input");
    setParsed(null);
    setErrorMsg("");
  };

  const sectionStyle = {
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden" as const,
    marginBottom: "1rem",
  };

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* Page header */}
      <section
        style={{
          padding: "4rem 0 3rem",
          background:
            "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
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
              textTransform: "uppercase" as const,
              letterSpacing: "0.05em",
            }}
          >
            <Upload size={12} />
            Admin Tool
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
            Paste raw HTML from Google Docs, TripIt, or any planner. We&apos;ll
            sanitize it, parse the structure into day-by-day activities, and
            preview it before publishing.
          </p>
        </div>
      </section>

      <div
        className="container"
        style={{ paddingTop: "2.5rem", paddingBottom: "5rem", maxWidth: 900 }}
      >
        {/* Progress steps */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            fontSize: "0.8rem",
          }}
        >
          {(["input", "preview"] as const).map((s, i) => {
            const done =
              (s === "input" && (step === "preview")) ||
              (s === "preview" && false);
            const active = step === s || (step === "parsing" && s === "input");
            return (
              <span key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: done
                      ? "var(--accent-gold)"
                      : active
                      ? "var(--accent-gold-dim)"
                      : "var(--bg-card)",
                    border: `1px solid ${active || done ? "var(--accent-gold)" : "var(--border)"}`,
                    color: done ? "var(--bg-primary)" : active ? "var(--accent-gold)" : "var(--text-muted)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ color: active ? "var(--text-primary)" : "var(--text-muted)", fontWeight: active ? 600 : 400 }}>
                  {s === "input" ? "Paste HTML" : "Preview & Publish"}
                </span>
                {i === 0 && <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />}
              </span>
            );
          })}
        </div>

        {/* ── STEP 1: INPUT ── */}
        {(step === "input" || step === "error") && (
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.625rem",
                }}
              >
                <label
                  htmlFor="html-input"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.05em",
                    color: "var(--text-muted)",
                  }}
                >
                  Paste your HTML itinerary
                </label>
                <button
                  onClick={useSample}
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--accent-gold)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    padding: 0,
                  }}
                >
                  Use sample →
                </button>
              </div>
              <textarea
                id="html-input"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="<h1>My Trip to Coorg</h1>&#10;<h2>Day 1: Arrival</h2>&#10;<ul>&#10;  <li>9:00 AM – Drive from Bangalore</li>&#10;  ...&#10;</ul>"
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
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--border-accent)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--border)")
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.4rem",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                <span>{html.length.toLocaleString()} characters</span>
                <span>Max 500 KB</span>
              </div>
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
                id="parse-itinerary-btn"
                style={{
                  opacity: !html.trim() ? 0.5 : 1,
                  cursor: !html.trim() ? "not-allowed" : "pointer",
                }}
              >
                <FileText size={16} />
                Parse Itinerary
              </button>
              {html && (
                <button onClick={reset} className="btn btn-outline">
                  Clear
                </button>
              )}
            </div>

            {/* Format hints */}
            <div
              style={{
                marginTop: "2.5rem",
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "1rem",
                }}
              >
                What the parser understands
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {[
                  { tag: "<h1>", maps: "Trip title" },
                  { tag: "<h2> / <h3>", maps: "Day headings (\"Day 1: …\")" },
                  { tag: "<li>", maps: "Activities (with time extraction)" },
                  { tag: "<table>", maps: "Schedule / cost breakdowns" },
                  { tag: "<blockquote>", maps: "Tips & notes" },
                  { tag: "Time patterns", maps: "\"9:00 AM\", \"14:30\" → timestamps" },
                ].map(({ tag, maps }) => (
                  <div key={tag}>
                    <code
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--accent-gold)",
                        display: "block",
                        marginBottom: "2px",
                      }}
                    >
                      {tag}
                    </code>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      → {maps}
                    </span>
                  </div>
                ))}
              </div>
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
            <Loader2
              size={36}
              style={{
                color: "var(--accent-gold)",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ fontSize: "0.9rem" }}>Parsing and sanitizing your HTML…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ── STEP 2: PREVIEW ── */}
        {step === "preview" && parsed && (
          <div>
            {/* Success banner */}
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
                Parsed successfully —
              </span>
              <span style={{ fontSize: "0.875rem" }}>
                {parsed.days.length} day{parsed.days.length !== 1 ? "s" : ""},{" "}
                {parsed.days.reduce((s, d) => s + d.activities.length, 0)} activities
              </span>
            </div>

            {/* Parsed title */}
            {parsed.title && (
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--text-primary)",
                  marginBottom: "2rem",
                  fontSize: "2rem",
                }}
              >
                {parsed.title}
              </h2>
            )}

            {/* Day-by-day preview */}
            {parsed.days.map((day) => (
              <div key={day.dayNumber} style={sectionStyle}>
                <div
                  style={{
                    padding: "1rem 1.25rem",
                    background: "var(--bg-card)",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-sm)",
                      background: "var(--accent-gold)",
                      color: "var(--bg-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {day.dayNumber}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {day.title}
                  </h3>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {day.activities.length} stops
                  </span>
                </div>
                <div style={{ padding: "0.75rem 1.25rem" }}>
                  {day.activities.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.5rem 0",
                        borderBottom:
                          i < day.activities.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                      }}
                    >
                      {a.time && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                            fontSize: "0.75rem",
                            color: "var(--accent-gold)",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            minWidth: 70,
                            paddingTop: 2,
                          }}
                        >
                          <Clock size={11} />
                          {a.time}
                        </span>
                      )}
                      <div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--text-primary)",
                            fontWeight: 500,
                          }}
                        >
                          {a.title}
                        </div>
                        {a.notes && (
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--text-muted)",
                              marginTop: "2px",
                              fontStyle: "italic",
                            }}
                          >
                            💡 {a.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Sanitized HTML preview */}
            <details
              style={{
                marginTop: "1.5rem",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
              }}
            >
              <summary
                style={{
                  padding: "0.875rem 1.25rem",
                  background: "var(--bg-secondary)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  userSelect: "none",
                }}
              >
                <Eye size={14} style={{ display: "inline", marginRight: "6px" }} />
                View sanitized HTML
              </summary>
              <div
                className="imported-itinerary"
                style={{ padding: "1.25rem", maxHeight: 400, overflowY: "auto" }}
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              />
            </details>

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-primary"
                id="publish-trip-btn"
                onClick={() => alert("Configure your Sanity project to enable publishing. See src/app/api/publish-trip/route.ts")}
              >
                <MapPin size={15} />
                Publish to Sanity
              </button>
              <button onClick={reset} className="btn btn-outline">
                ← Parse Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
