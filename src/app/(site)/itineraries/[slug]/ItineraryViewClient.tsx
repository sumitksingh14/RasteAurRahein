"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Calendar,
  Wallet,
  Sparkles,
  ArrowLeft,
  Clock,
  Edit3,
  Eye,
  Navigation,
  Compass,
  Car,
  Utensils,
  Bed,
  Binoculars,
  Camera,
  Check,
} from "lucide-react";
import { useGeneratedTrips, type GeneratedTrip, type GeneratedDay, type GeneratedActivity } from "@/components/providers/GeneratedTripsProvider";
import type { SavedItinerary } from "@/lib/savedItineraries";
import ShareItineraryButtons from "./ShareItineraryButtons";
import ExportPDFButton from "@/components/ai/ExportPDFButton";
import ItineraryEditor from "@/components/itinerary/ItineraryEditor";

interface Props {
  slug: string;
  initialServerItinerary: SavedItinerary | null;
}

const TYPE_EMOJI: Record<string, string> = {
  transport: "🚗",
  accommodation: "🏨",
  food: "🍴",
  activity: "⛺",
  sightseeing: "📸",
};

function parseServerItinerary(itinerary: SavedItinerary): GeneratedTrip {
  try {
    const parsed = JSON.parse(itinerary.itineraryJson);
    return {
      id: parsed.id || itinerary.slug || itinerary.id,
      title: parsed.title || itinerary.title,
      destination: parsed.destination || itinerary.destination,
      overview: parsed.overview,
      bestTimeToVisit: parsed.bestTimeToVisit,
      totalBudgetEstimate: parsed.totalBudgetEstimate || itinerary.budget,
      tags: parsed.tags || (itinerary.travelStyle ? itinerary.travelStyle.split(",").map((s: string) => s.trim()) : []),
      days: parsed.days || [],
      style: parsed.style || itinerary.travelStyle || "Adventure",
      month: parsed.month || "Anytime",
      generatedAt: parsed.generatedAt || itinerary.createdAt || new Date().toISOString(),
    };
  } catch {
    return {
      id: itinerary.slug || itinerary.id,
      title: itinerary.title,
      destination: itinerary.destination,
      overview: undefined,
      totalBudgetEstimate: itinerary.budget,
      tags: itinerary.travelStyle ? itinerary.travelStyle.split(",").map((s: string) => s.trim()) : [],
      days: [],
      style: itinerary.travelStyle || "Adventure",
      month: "Anytime",
      generatedAt: itinerary.createdAt || new Date().toISOString(),
    };
  }
}

export default function ItineraryViewClient({ slug, initialServerItinerary }: Props) {
  const searchParams = useSearchParams();
  const editParam = searchParams?.get("edit");
  const { trips, updateTrip, addTrip } = useGeneratedTrips();

  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(editParam === "true");
  const [trip, setTrip] = useState<GeneratedTrip | null>(() => {
    if (initialServerItinerary) {
      return parseServerItinerary(initialServerItinerary);
    }
    return null;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync with local storage trips when mounted or when trips change
  useEffect(() => {
    if (!mounted) return;
    const localTrip = trips.find((t) => t.id === slug);
    if (localTrip) {
      setTrip(localTrip);
    } else if (!trip && initialServerItinerary) {
      setTrip(parseServerItinerary(initialServerItinerary));
    }
  }, [mounted, trips, slug, initialServerItinerary]);

  // If edit param changes in URL
  useEffect(() => {
    if (editParam === "true") {
      setIsEditing(true);
    }
  }, [editParam]);

  const handleTripUpdate = (updatedTrip: GeneratedTrip) => {
    setTrip(updatedTrip);
    const exists = trips.some((t) => t.id === updatedTrip.id);
    if (exists) {
      updateTrip(updatedTrip.id, updatedTrip);
    } else {
      addTrip(updatedTrip);
    }

    // Attempt background persistence to Redis if authenticated
    try {
      fetch("/api/saved-itineraries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: updatedTrip.id,
          title: updatedTrip.title,
          destination: updatedTrip.destination,
          days: updatedTrip.days?.length || 1,
          pace: "moderate",
          budget: updatedTrip.totalBudgetEstimate || "₹30,000",
          travelStyle: (updatedTrip.tags || []).join(", "),
          itineraryJson: JSON.stringify(updatedTrip),
        }),
      }).catch(() => {});
    } catch {
      // offline / local fallback
    }
  };

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://raste-aur-rahein.vercel.app";
  const pageUrl = `${siteUrl}/itineraries/${slug}`;

  // Unmounted state: show server rendered preview if available, else skeleton
  if (!mounted && !trip) {
    return (
      <div style={{ minHeight: "100vh", paddingTop: "var(--nav-height)", background: "#111318" }}>
        <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
          <div style={{ display: "inline-block", width: 40, height: 40, border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#006CE4", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          <p style={{ marginTop: "1rem", color: "var(--text-secondary, rgba(255,255,255,0.6))", fontSize: "0.95rem" }}>
            Loading itinerary details…
          </p>
        </div>
      </div>
    );
  }

  // Not found in neither localStorage nor Redis
  if (mounted && !trip) {
    return (
      <div style={{ minHeight: "100vh", paddingTop: "var(--nav-height)", background: "#111318" }}>
        <div className="container" style={{ padding: "6rem 1rem", maxWidth: 640, textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              margin: "0 auto 1.5rem",
              borderRadius: "50%",
              background: "rgba(0,108,228,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#006CE4",
            }}
          >
            <Compass size={32} />
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--text-primary, #fff)", marginBottom: "0.75rem" }}>
            Itinerary Not Found
          </h1>
          <p style={{ color: "var(--text-secondary, rgba(255,255,255,0.65))", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            We couldn’t find an itinerary matching <code style={{ background: "rgba(255,255,255,0.08)", padding: "0.2rem 0.4rem", borderRadius: 4 }}>{slug}</code>. It may have been cleared from your browser storage or removed.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/itineraries"
              className="btn btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.6rem 1.25rem" }}
            >
              <ArrowLeft size={15} /> My Saved Itineraries
            </Link>
            <Link
              href="/ai-planner"
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.6rem 1.25rem" }}
            >
              <Sparkles size={15} /> Create New Itinerary
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Safe trip is guaranteed non-null here
  const safeTrip = trip!;
  const days = safeTrip.days || [];
  const createdAt = safeTrip.generatedAt ? new Date(safeTrip.generatedAt) : null;
  const dateLabel = createdAt && !isNaN(createdAt.getTime())
    ? createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <div style={{ minHeight: "100vh", paddingTop: "var(--nav-height)", background: "#111318" }}>
      {/* Hero Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2a1a 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "3rem 0 2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0,108,228,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative" }}>
          {/* Breadcrumb row */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <Link
              href="/itineraries"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.85rem",
                textDecoration: "none",
                transition: "color var(--transition)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FEBB02")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              <ArrowLeft size={14} /> Back to My Itineraries
            </Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>•</span>
            <Link
              href="/ai-planner"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.82rem",
                textDecoration: "none",
              }}
            >
              <Sparkles size={12} color="#FEBB02" /> AI Planner
            </Link>
          </div>

          {/* Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <Sparkles size={14} style={{ color: "#FEBB02" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FEBB02" }}>
              {isEditing ? "Customizing Itinerary" : "Interactive Travel Plan"}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              color: "#fff",
              lineHeight: 1.18,
              marginBottom: "1rem",
              maxWidth: 760,
            }}
          >
            {safeTrip.title}
          </h1>

          {/* Meta row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <MapPin size={15} color="#006CE4" /> {safeTrip.destination}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Calendar size={15} color="#FEBB02" /> {days.length} days {safeTrip.month ? `· ${safeTrip.month}` : ""}
            </span>
            {safeTrip.totalBudgetEstimate && (
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Wallet size={15} color="#10b981" /> {safeTrip.totalBudgetEstimate}
              </span>
            )}
            {dateLabel && (
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Clock size={15} color="rgba(255,255,255,0.4)" /> Created {dateLabel}
              </span>
            )}
          </div>

          {/* Tags */}
          {safeTrip.tags && safeTrip.tags.length > 0 && (
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
              {safeTrip.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.2rem 0.75rem",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 100,
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
            {/* Customize / View Mode Toggle */}
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-accent, #FEBB02)",
                background: isEditing ? "#FEBB02" : "rgba(254, 187, 2, 0.15)",
                color: isEditing ? "#000" : "#FEBB02",
                fontSize: "0.88rem",
                fontWeight: 700,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
                transition: "all var(--transition)",
                boxShadow: isEditing ? "0 4px 12px rgba(254,187,2,0.3)" : "none",
              }}
            >
              {isEditing ? <Eye size={16} /> : <Edit3 size={16} />}
              <span>{isEditing ? "View Clean Itinerary" : "Customize & Reorder Stops"}</span>
            </button>

            {/* Export to PDF */}
            <ExportPDFButton trip={safeTrip} variant="ghost" />

            {/* Share Buttons */}
            <ShareItineraryButtons
              url={pageUrl}
              title={safeTrip.title}
              destination={safeTrip.destination}
              days={days.length}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem", maxWidth: 840, marginInline: "auto" }}>
        {/* If Customizer / Editor Mode */}
        {isEditing ? (
          <div>
            {/* Edit mode banner — amber, shown on dark background */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
                padding: "0.75rem 1rem",
                background: "rgba(254, 187, 2, 0.12)",
                border: "1px solid rgba(254, 187, 2, 0.3)",
                borderRadius: "12px",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FEBB02", fontSize: "0.85rem", fontWeight: 600 }}>
                <Sparkles size={16} />
                <span>You are customizing this itinerary. Reorder stops, add cafes, or adjust timings below:</span>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "8px",
                  border: "1px solid #FEBB02",
                  background: "transparent",
                  color: "#FEBB02",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Done Customizing
              </button>
            </div>

            {/* ItineraryEditor uses CSS variables — wrap in light-theme context */}
            <div style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "1.5rem",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <ItineraryEditor trip={safeTrip} onUpdate={handleTripUpdate} />
            </div>
          </div>
        ) : (
          /* Clean View Mode */
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Overview */}
            {safeTrip.overview && (
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                  borderLeft: "3px solid #FEBB02",
                  paddingLeft: "1.25rem",
                  fontStyle: "italic",
                }}
              >
                {safeTrip.overview}
              </p>
            )}

            {/* Header bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  color: "#fff",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Navigation size={20} color="#006CE4" /> Full Day-by-Day Schedule
              </h2>

              <button
                onClick={() => setIsEditing(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#FEBB02",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Edit3 size={14} /> Edit Stops
              </button>
            </div>

            {/* Days list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {days.map((day) => (
                <div
                  key={day.dayNumber}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                  }}
                >
                  {/* Day header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "1rem 1.25rem",
                      background: "rgba(0,108,228,0.08)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "#006CE4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      D{day.dayNumber}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.05rem", color: "#fff", margin: 0 }}>
                      {day.title}
                    </h3>
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    {day.summary && (
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary, rgba(255,255,255,0.65))", lineHeight: 1.65, marginBottom: "1rem" }}>
                        {day.summary}
                      </p>
                    )}

                    {day.activities && day.activities.length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {day.activities.map((act, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              gap: "0.85rem",
                              padding: "0.75rem 0.85rem",
                              background: "rgba(255,255,255,0.02)",
                              borderRadius: "var(--radius-md)",
                              border: "1px solid rgba(255,255,255,0.05)",
                            }}
                          >
                            <span style={{ fontSize: "1.15rem", flexShrink: 0, lineHeight: 1 }}>
                              {TYPE_EMOJI[act.type || ""] || "📍"}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                                {act.title}
                                {act.time && (
                                  <span style={{ fontSize: "0.75rem", color: "#FEBB02", fontWeight: 500, background: "rgba(254,187,2,0.1)", padding: "1px 6px", borderRadius: 4 }}>
                                    {act.time}
                                  </span>
                                )}
                              </div>
                              {act.description && (
                                <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: "4px 0 0" }}>
                                  {act.description}
                                </p>
                              )}
                              {act.notes && (
                                <div
                                  style={{
                                    marginTop: "6px",
                                    padding: "0.4rem 0.6rem",
                                    background: "rgba(0,108,228,0.08)",
                                    borderLeft: "2px solid #006CE4",
                                    borderRadius: "0 4px 4px 0",
                                    fontSize: "0.78rem",
                                    color: "rgba(255,255,255,0.75)",
                                  }}
                                >
                                  <strong>Tip:</strong> {act.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div
              style={{
                marginTop: "2.5rem",
                padding: "2rem",
                background: "rgba(0,108,228,0.08)",
                border: "1px solid rgba(0,108,228,0.2)",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Want to plan another trip or explore more regions?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.25rem", fontSize: "0.9rem" }}>
                Generate custom multi-day plans, discover hidden gems, or customize curated routes across India.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/ai-planner" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Sparkles size={15} /> Try the AI Planner
                </Link>
                <Link href="/trips" className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Compass size={15} /> Explore Curated Trips
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
