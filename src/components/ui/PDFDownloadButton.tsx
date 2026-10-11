"use client";

import { useState } from "react";
import { Download, Check, Loader2, Mail, FileText, ArrowRight } from "lucide-react";
import type { Trip } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";

interface PDFDownloadButtonProps {
  trip: Trip;
}

/**
 * Lazy-loads @react-pdf/renderer only on click to keep the initial bundle small.
 * Generates a structured itinerary PDF with cover, day-by-day breakdown and cost summary.
 */
export default function PDFDownloadButton({ trip }: PDFDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [attempts, setAttempts] = useState(0);
  const { user } = useAuth();

  const executePdfGeneration = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMsg("");
    try {
      // Dynamic import so PDF libs don't bloat the initial JS bundle
      const { pdf, Document, Page, Text, View, StyleSheet, Font } =
        await import("@react-pdf/renderer");

      const styles = StyleSheet.create({
        page: {
          fontFamily: "Helvetica",
          backgroundColor: "#0a0a0f",
          color: "#e8e0d0",
          padding: 0,
        },
        cover: {
          backgroundColor: "#0a0a0f",
          padding: 48,
          minHeight: "100%",
          justifyContent: "flex-end",
        },
        coverEyebrow: {
          fontSize: 9,
          color: "#c9a84c",
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 12,
        },
        coverTitle: {
          fontSize: 28,
          fontFamily: "Helvetica-Bold",
          color: "#e8e0d0",
          lineHeight: 1.2,
          marginBottom: 16,
        },
        coverMeta: {
          fontSize: 10,
          color: "#a09898",
          marginBottom: 4,
        },
        coverAccent: {
          width: 48,
          height: 3,
          backgroundColor: "#c9a84c",
          marginBottom: 24,
        },
        contentPage: {
          backgroundColor: "#0d0d14",
          padding: "40 48",
        },
        sectionLabel: {
          fontSize: 7,
          color: "#c9a84c",
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 8,
          fontFamily: "Helvetica-Bold",
        },
        dayCard: {
          marginBottom: 20,
          padding: "14 16",
          backgroundColor: "#13131e",
          borderRadius: 6,
          borderLeft: "3px solid #c9a84c",
        },
        dayHeader: {
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 10,
          marginBottom: 8,
        },
        dayBadge: {
          fontSize: 7,
          color: "#c9a84c",
          fontFamily: "Helvetica-Bold",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 2,
        },
        dayTitle: {
          fontSize: 12,
          fontFamily: "Helvetica-Bold",
          color: "#e8e0d0",
          lineHeight: 1.3,
        },
        dayDate: {
          fontSize: 8.5,
          color: "#6a6060",
          marginTop: 2,
        },
        daySummary: {
          fontSize: 9,
          color: "#a09898",
          lineHeight: 1.6,
          marginBottom: 10,
          fontStyle: "italic",
        },
        activity: {
          flexDirection: "row",
          gap: 8,
          marginBottom: 8,
        },
        activityDot: {
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#c9a84c",
          marginTop: 3,
          flexShrink: 0,
        },
        activityTitle: {
          fontSize: 9.5,
          color: "#e8e0d0",
          fontFamily: "Helvetica-Bold",
          marginBottom: 2,
        },
        activityDesc: {
          fontSize: 8.5,
          color: "#a09898",
          lineHeight: 1.5,
        },
        activityNote: {
          fontSize: 8,
          color: "#c9a84c",
          marginTop: 3,
          lineHeight: 1.4,
        },
        costRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 5,
          borderBottom: "1px solid #1e1e2a",
        },
        costLabel: { fontSize: 9, color: "#a09898" },
        costValue: { fontSize: 9, color: "#c9a84c", fontFamily: "Helvetica-Bold" },
        totalRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
          marginTop: 4,
        },
        totalLabel: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#e8e0d0" },
        totalValue: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#c9a84c" },
        footer: {
          position: "absolute",
          bottom: 24,
          left: 48,
          right: 48,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        footerText: { fontSize: 7.5, color: "#3a3040" },
        divider: { height: 1, backgroundColor: "#1e1e2a", marginVertical: 16 },
      });

      const durationDays =
        trip.startDate && trip.endDate
          ? Math.ceil(
              (new Date(trip.endDate).getTime() -
                new Date(trip.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1
          : null;

      const hasCosts =
        trip.itinerary?.some((d) =>
          d.activities?.some((a) => a.cost !== undefined)
        ) || !!trip.totalBudget;

      const doc = (
        <Document
          title={trip.title}
          author="Raste Aur Raahein"
          subject={`Travel Itinerary — ${trip.title}`}
        >
          {/* ── Cover page ── */}
          <Page size="A4" style={styles.page}>
            <View style={styles.cover}>
              <Text style={styles.coverEyebrow}>Raste Aur Raahein · Itinerary</Text>
              <View style={styles.coverAccent} />
              <Text style={styles.coverTitle}>{trip.title}</Text>
              {trip.country && (
                <Text style={styles.coverMeta}>📍 {trip.country}</Text>
              )}
              {durationDays && (
                <Text style={styles.coverMeta}>⏱ {durationDays} days</Text>
              )}
              {trip.startDate && (
                <Text style={styles.coverMeta}>
                  🗓 {new Date(trip.startDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {trip.endDate
                    ? ` – ${new Date(trip.endDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}`
                    : ""}
                </Text>
              )}
              {trip.totalBudget && (
                <Text style={styles.coverMeta}>
                  💰 Budget: ₹{trip.totalBudget.toLocaleString()}
                </Text>
              )}
              {trip.excerpt && (
                <Text
                  style={{
                    ...styles.coverMeta,
                    marginTop: 20,
                    fontSize: 10.5,
                    lineHeight: 1.7,
                    color: "#9a9090",
                    maxWidth: 420,
                  }}
                >
                  {trip.excerpt}
                </Text>
              )}
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>rasteaurrahein.com</Text>
              <Text style={styles.footerText}>
                Generated {new Date().toLocaleDateString("en-IN")}
              </Text>
            </View>
          </Page>

          {/* ── Itinerary pages ── */}
          {trip.itinerary && trip.itinerary.length > 0 && (
            <Page size="A4" style={{ ...styles.page, ...styles.contentPage }}>
              <Text style={styles.sectionLabel}>Day-by-Day Itinerary</Text>
              <View style={styles.divider} />
              {trip.itinerary.map((day) => (
                <View key={day._key} style={styles.dayCard} wrap={false}>
                  <Text style={styles.dayBadge}>Day {day.dayNumber}</Text>
                  <Text style={styles.dayTitle}>{day.title}</Text>
                  <Text style={styles.dayDate}>Day {day.dayNumber} · Suggested Schedule</Text>
                  {day.summary && (
                    <Text style={{ ...styles.daySummary, marginTop: 6 }}>
                      {day.summary}
                    </Text>
                  )}
                  {day.activities?.map((act) => (
                    <View key={act._key} style={styles.activity}>
                      <View style={styles.activityDot} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.activityTitle}>{act.title}</Text>
                        {act.description && (
                          <Text style={styles.activityDesc}>
                            {act.description}
                          </Text>
                        )}
                        {act.notes && (
                          <Text style={styles.activityNote}>
                            💡 {act.notes}
                          </Text>
                        )}
                      </View>
                      {act.cost !== undefined && (
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#4db6ac",
                            flexShrink: 0,
                          }}
                        >
                          ₹{act.cost.toLocaleString()}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
              <View style={styles.footer}>
                <Text style={styles.footerText}>rasteaurrahein.com</Text>
              </View>
            </Page>
          )}

          {/* ── Cost summary page ── */}
          {hasCosts && (
            <Page size="A4" style={{ ...styles.page, ...styles.contentPage }}>
              <Text style={styles.sectionLabel}>Cost Summary</Text>
              <View style={styles.divider} />
              {trip.itinerary?.map((day) => {
                const costs = day.activities?.filter(
                  (a) => a.cost !== undefined
                );
                if (!costs?.length) return null;
                return (
                  <View key={day._key} style={{ marginBottom: 16 }}>
                    <Text
                      style={{
                        fontSize: 9,
                        fontFamily: "Helvetica-Bold",
                        color: "#e8e0d0",
                        marginBottom: 6,
                      }}
                    >
                      Day {day.dayNumber} — {day.title}
                    </Text>
                    {costs.map((a) => (
                      <View key={a._key} style={styles.costRow}>
                        <Text style={styles.costLabel}>{a.title}</Text>
                        <Text style={styles.costValue}>
                          ₹{a.cost!.toLocaleString()}{" "}
                          {a.currency ? a.currency : ""}
                        </Text>
                      </View>
                    ))}
                  </View>
                );
              })}
              {trip.totalBudget && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total Budget</Text>
                  <Text style={styles.totalValue}>
                    ₹{trip.totalBudget.toLocaleString()}
                  </Text>
                </View>
              )}
              <View style={styles.footer}>
                <Text style={styles.footerText}>rasteaurrahein.com</Text>
              </View>
            </Page>
          )}
        </Document>
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${trip.slug}-itinerary.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setErrorMsg("Could not generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInitialClick = () => {
    // If logged in, generate immediately
    if (user) {
      executePdfGeneration();
      return;
    }
    // Check if user already provided email previously
    try {
      const stored = localStorage.getItem("rar_captured_email");
      if (stored && stored.includes("@")) {
        executePdfGeneration();
        return;
      }
    } catch {
      // ignore
    }
    setShowEmailGate(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot bot protection
    if (honeypot) return;

    // Rate limiting (max 4 tries)
    if (attempts >= 4) {
      setErrorMsg("Too many attempts. Please try again in a few minutes.");
      return;
    }
    setAttempts((prev) => prev + 1);

    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: `pdf-${trip.slug}`,
        }),
      });
      try {
        localStorage.setItem("rar_captured_email", email.trim());
      } catch {
        // ignore
      }
      setShowEmailGate(false);
      executePdfGeneration();
    } catch (err) {
      console.warn("Newsletter lead sync notice:", err);
      // Still allow PDF download even if newsletter endpoint temporarily errs
      setShowEmailGate(false);
      executePdfGeneration();
    }
  };

  if (showEmailGate) {
    return (
      <div
        className="glass-card"
        style={{
          marginTop: "0.75rem",
          padding: "1rem 1.25rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-accent)",
          background: "var(--bg-secondary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.35rem" }}>
          <Mail size={15} color="var(--accent-gold)" />
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Get PDF Itinerary Guide
          </span>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0 0 0.75rem", lineHeight: 1.4 }}>
          Enter your email to download the offline PDF itinerary.
        </p>

        <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {/* Honeypot field */}
          <input
            type="text"
            name="b_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div style={{ display: "flex", gap: "6px" }}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              style={{
                flex: 1,
                minWidth: 0,
                padding: "0.55rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "0.82rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "0.55rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: "var(--accent-gold)",
                color: "var(--bg-primary)",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: loading ? "wait" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <ArrowRight size={13} />}
              <span>{loading ? "Exporting…" : "Get PDF"}</span>
            </button>
          </div>

          {errorMsg && (
            <div style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "2px" }}>
              {errorMsg}
            </div>
          )}

          <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "2px", lineHeight: 1.3 }}>
            🔒 Free download • We never sell your data • Unsubscribe anytime
          </div>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={handleInitialClick}
      disabled={loading}
      id="pdf-download-btn"
      className="btn btn-outline"
      aria-label="Download itinerary PDF"
      style={{
        width: "100%",
        justifyContent: "center",
        gap: "8px",
        opacity: loading ? 0.7 : 1,
        fontSize: "0.875rem",
        marginTop: "0.75rem",
        position: "relative",
      }}
    >
      {loading ? (
        <Loader2 size={15} className="animate-spin" />
      ) : downloaded ? (
        <Check size={15} color="#10b981" />
      ) : (
        <Download size={15} />
      )}
      {loading ? "Generating PDF…" : downloaded ? "PDF Downloaded!" : "Download Itinerary PDF"}
    </button>
  );
}
