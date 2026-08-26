"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, MapPin, Calendar, Clock, Trash2, ChevronRight, Navigation } from "lucide-react";
import { useGeneratedTrips, type GeneratedTrip } from "@/components/providers/GeneratedTripsProvider";
import AIItineraryModal from "@/components/ai/AIItineraryModal";
import ExportPDFButton from "@/components/ai/ExportPDFButton";
import LikeButton from "@/components/ui/LikeButton";
import { useAuth } from "@/components/providers/AuthProvider";

// ---------------------------------------------------------------------------
// Glassmorphism Trip Card
// ---------------------------------------------------------------------------
function GeneratedTripCard({
  trip,
  onDelete,
}: {
  trip: GeneratedTrip;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const createdAt = new Date(trip.generatedAt);
  const dateLabel = createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "24px",
        borderTop: "1px solid rgba(255,255,255,0.35)",
        borderRight: hovered
          ? "1px solid rgba(255,255,255,0.28)"
          : "1px solid rgba(255,255,255,0.14)",
        borderBottom: hovered
          ? "1px solid rgba(255,255,255,0.28)"
          : "1px solid rgba(255,255,255,0.14)",
        borderLeft: hovered
          ? "1px solid rgba(255,255,255,0.22)"
          : "1px solid rgba(255,255,255,0.16)",
        background: hovered
          ? "linear-gradient(145deg, rgba(255,255,255,0.13) 0%, rgba(137,180,250,0.08) 100%)"
          : "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(137,180,250,0.04) 100%)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        boxShadow: hovered
          ? ["0 20px 60px rgba(0,0,0,0.5)", "inset 0 1px 0 rgba(255,255,255,0.3)", "0 0 40px rgba(137,180,250,0.15)"].join(", ")
          : ["0 8px 32px rgba(0,0,0,0.35)", "inset 0 1px 0 rgba(255,255,255,0.18)"].join(", "),
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Top shimmer stripe */}
      <div
        style={{
          height: 3,
          background: "linear-gradient(90deg, rgba(137,180,250,0.8), rgba(148,226,213,0.8), rgba(243,139,168,0.6))",
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.3s ease",
        }}
      />

      <div style={{ padding: "1.5rem" }}>
        {/* Tags */}
        {trip.tags && trip.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
            {trip.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.2rem 0.6rem",
                  borderRadius: "100px",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  background: "rgba(137,180,250,0.15)",
                  border: "1px solid rgba(137,180,250,0.3)",
                  color: "rgba(180,208,253,0.9)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.2rem",
            color: "#fff",
            marginBottom: "0.5rem",
            lineHeight: 1.25,
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          {trip.title}
        </h3>

        {/* Overview */}
        {trip.overview && (
          <p style={{ color: "rgba(165,202,214,0.85)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>
            {trip.overview}
          </p>
        )}

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.65rem",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "1rem",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={11} /> {trip.destination}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={11} /> {trip.days.length} days · {trip.month}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={11} /> {dateLabel}
          </span>
          {trip.totalBudgetEstimate && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "rgba(137,180,250,0.9)",
                fontWeight: 600,
              }}
            >
              {trip.totalBudgetEstimate}
            </span>
          )}
        </div>

        {/* Actions row: expand + like */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.78rem",
              color: "rgba(137,180,250,0.85)",
              fontWeight: 500,
              background: "rgba(137,180,250,0.08)",
              border: "1px solid rgba(137,180,250,0.2)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              padding: "0.4rem 0.85rem",
              borderRadius: "100px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(137,180,250,0.18)"; e.currentTarget.style.color = "#b4d0fd"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(137,180,250,0.08)"; e.currentTarget.style.color = "rgba(137,180,250,0.85)"; }}
          >
            <ChevronRight
              size={13}
              style={{
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            />
            {expanded ? "Hide" : "View"} {trip.days.length}-day itinerary
          </button>

          {/* Like button */}
          <LikeButton type="itinerary" id={trip.id} />
        </div>

        {expanded && (
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "0.75rem",
            }}
          >
            {trip.days.map((day) => (
              <div
                key={day.dayNumber}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.55rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span
                  style={{
                    minWidth: 28,
                    height: 28,
                    borderRadius: "8px",
                    background: "rgba(137,180,250,0.15)",
                    border: "1px solid rgba(137,180,250,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: "rgba(180,208,253,0.9)",
                    flexShrink: 0,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  D{day.dayNumber}
                </span>
                <div>
                  <div style={{ fontSize: "0.84rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", marginBottom: 2 }}>
                    {day.title}
                  </div>
                  {day.summary && (
                    <div style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                      {day.summary}
                    </div>
                  )}
                  <div style={{ fontSize: "0.68rem", color: "rgba(137,180,250,0.6)", marginTop: 3 }}>
                    {day.activities.length} activities
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1.1rem",
            paddingTop: "0.9rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link
              href={`/itineraries/${trip.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.75rem",
                color: "rgba(137,180,250,0.9)",
                background: "rgba(137,180,250,0.1)",
                border: "1px solid rgba(137,180,250,0.25)",
                backdropFilter: "blur(8px)",
                textDecoration: "none",
                fontWeight: 500,
                padding: "0.38rem 0.8rem",
                borderRadius: "100px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(137,180,250,0.22)"; e.currentTarget.style.color = "#b4d0fd"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(137,180,250,0.1)"; e.currentTarget.style.color = "rgba(137,180,250,0.9)"; }}
            >
              View Details
            </Link>
            <ExportPDFButton trip={trip} variant="ghost" />
          </div>

          <button
            onClick={() => onDelete(trip.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.73rem",
              color: "rgba(255,255,255,0.3)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              padding: "0.38rem 0.6rem",
              borderRadius: "100px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(243,139,168,0.9)"; e.currentTarget.style.background = "rgba(243,139,168,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "none"; }}
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ItinerariesPage() {
  const { trips, removeTrip } = useGeneratedTrips();
  const [modalOpen, setModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <style>{`
        @keyframes it-orb-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.18; }
          50%       { transform: translateY(-30px) scale(1.08); opacity: 0.28; }
        }
        @keyframes it-orb-float2 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.12; }
          50%       { transform: translateY(24px) scale(0.92); opacity: 0.22; }
        }
      `}</style>

      {/* ── Glassmorphism Page Hero ── */}
      <section
        style={{
          position: "relative",
          padding: "5rem 0 3.5rem",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Ambient orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-80px", left: "-60px",
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(137,180,250,1) 0%, transparent 70%)",
            animation: "it-orb-float 8s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", top: "10%", right: "-100px",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(148,226,213,1) 0%, transparent 70%)",
            animation: "it-orb-float2 11s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "-60px", left: "40%",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(243,139,168,0.7) 0%, transparent 70%)",
            animation: "it-orb-float 14s ease-in-out infinite",
          }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Eyebrow glass pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.35rem 1rem",
              borderRadius: "100px",
              background: "rgba(137,180,250,0.12)",
              border: "1px solid rgba(137,180,250,0.35)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              fontSize: "0.72rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(137,180,250,0.9)",
              marginBottom: "1.25rem",
              boxShadow: "0 0 20px rgba(137,180,250,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <Sparkles size={11} /> AI-Generated
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              color: "#fff",
              marginBottom: "0.75rem",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              lineHeight: 1.15,
            }}
          >
            My Travel{" "}
            <span
              style={{
                background: "linear-gradient(135deg, rgba(137,180,250,1), rgba(148,226,213,1))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Itineraries
            </span>
          </h1>

          <p
            style={{
              color: "rgba(165,202,214,0.7)",
              maxWidth: 500,
              lineHeight: 1.75,
              fontSize: "1rem",
              marginBottom: "2rem",
            }}
          >
            Your AI-generated day-by-day trip plans, saved for reference and planning.
          </p>

          {/* Glass CTA button */}
          <button
            onClick={() => setModalOpen(true)}
            id="itineraries-new-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.75rem 1.75rem",
              borderRadius: "100px",
              background: "linear-gradient(135deg, rgba(137,180,250,0.3) 0%, rgba(148,226,213,0.2) 100%)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderTop: "1px solid rgba(255,255,255,0.4)",
              color: "#fff",
              fontSize: "0.9rem",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(137,180,250,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(137,180,250,0.45) 0%, rgba(148,226,213,0.32) 100%)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(137,180,250,0.4), inset 0 1px 0 rgba(255,255,255,0.35)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(137,180,250,0.3) 0%, rgba(148,226,213,0.2) 100%)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(137,180,250,0.25), inset 0 1px 0 rgba(255,255,255,0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Sparkles size={15} />
            Generate New Itinerary
          </button>

          {/* Trip count glass chip */}
          {trips.length > 0 && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginLeft: "1rem",
                padding: "0.4rem 0.9rem",
                borderRadius: "100px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(8px)",
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 500,
              }}
            >
              {trips.length} {trips.length === 1 ? "itinerary" : "itineraries"} saved
            </span>
          )}
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
        {trips.length === 0 ? (
          /* ── Glass Empty State ── */
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              borderRadius: "28px",
              background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(137,180,250,0.04) 100%)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderTop: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.18)",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            {/* Glowing icon orb */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(137,180,250,0.25), rgba(148,226,213,0.15))",
                border: "1px solid rgba(137,180,250,0.35)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.75rem",
                boxShadow: "0 0 30px rgba(137,180,250,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <Navigation size={32} style={{ color: "rgba(137,180,250,0.9)" }} />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                color: "#fff",
                marginBottom: "0.75rem",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              No itineraries yet
            </h2>
            <p style={{ color: "rgba(165,202,214,0.7)", lineHeight: 1.75, marginBottom: "2.25rem", maxWidth: 400, margin: "0 auto 2.25rem" }}>
              Use the AI Trip Planner to generate your first personalised day-by-day itinerary — just enter a destination and let AI do the rest.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.8rem 2rem",
                borderRadius: "100px",
                background: "linear-gradient(135deg, rgba(137,180,250,0.3), rgba(148,226,213,0.2))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderTop: "1px solid rgba(255,255,255,0.4)",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(137,180,250,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(137,180,250,0.45), rgba(148,226,213,0.32))";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(137,180,250,0.3), rgba(148,226,213,0.2))";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Sparkles size={15} />
              Generate My First Trip
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {trips.map((trip) => (
              <GeneratedTripCard key={trip.id} trip={trip} onDelete={removeTrip} />
            ))}
          </div>
        )}
      </div>

      {modalOpen && <AIItineraryModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
