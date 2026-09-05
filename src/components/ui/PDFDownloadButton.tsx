"use client";

import { useState } from "react";
import { Download, Lock } from "lucide-react";
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
  const { user, openAuthModal } = useAuth();

  const handleDownload = async () => {
    // If not logged in, open auth modal instead
    if (!user) {
      openAuthModal();
      return;
    }
    if (loading) return;
    setLoading(true);
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
                  {day.date && (
                    <Text style={styles.dayDate}>
                      {new Date(day.date).toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                  )}
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
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      id="pdf-download-btn"
      className="btn btn-outline"
      title={!user ? "Sign in to download the itinerary PDF" : undefined}
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
      {!user ? <Lock size={14} style={{ opacity: 0.7 }} /> : <Download size={15} />}
      {loading ? "Generating PDF…" : !user ? "Sign in to Export PDF" : "Download Itinerary PDF"}
    </button>
  );
}
