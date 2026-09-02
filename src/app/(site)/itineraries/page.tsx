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
// Clean Light-Mode Trip Card
// ---------------------------------------------------------------------------
function GeneratedTripCard({
  trip,
  onDelete,
}: {
  trip: GeneratedTrip;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const createdAt = new Date(trip.generatedAt);
  const dateLabel = createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "transform var(--transition), box-shadow var(--transition)",
      }}
      className="trip-card-hover"
    >
      <div style={{ padding: "1.5rem" }}>
        {/* Tags */}
        {trip.tags && trip.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
            {trip.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.2rem 0.75rem",
                  borderRadius: "100px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  background: "rgba(0,108,228,0.08)",
                  color: "#006CE4",
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
            fontSize: "1.25rem",
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
            lineHeight: 1.3,
          }}
        >
          {trip.title}
        </h3>

        {/* Overview */}
        {trip.overview && (
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>
            {trip.overview}
          </p>
        )}

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.85rem",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginBottom: "1.25rem",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={14} /> {trip.destination}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={14} /> {trip.days.length} days · {trip.month}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={14} /> {dateLabel}
          </span>
          {trip.totalBudgetEstimate && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#006CE4",
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
            className="btn btn-outline"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.4rem 1rem",
              fontSize: "0.8rem",
            }}
          >
            <ChevronRight
              size={14}
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
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              borderTop: "1px solid var(--border)",
              paddingTop: "1rem",
            }}
          >
            {trip.days.map((day) => (
              <div
                key={day.dayNumber}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    minWidth: 32,
                    height: 32,
                    borderRadius: "8px",
                    background: "rgba(0,108,228,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#006CE4",
                    flexShrink: 0,
                  }}
                >
                  D{day.dayNumber}
                </span>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                    {day.title}
                  </div>
                  {day.summary && (
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {day.summary}
                    </div>
                  )}
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 6, fontWeight: 500 }}>
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
            marginTop: "1.25rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href={`/itineraries/${trip.id}`}
              className="btn btn-outline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8rem",
                padding: "0.4rem 1rem",
              }}
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
              gap: "6px",
              fontSize: "0.8rem",
              color: "#DC2626",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              padding: "0.4rem 0.5rem",
              fontWeight: 500,
            }}
            className="hover-opacity"
          >
            <Trash2 size={14} /> Delete
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
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", background: "var(--bg-secondary)" }}>
      {/* ── Page Hero ── */}
      <section
        style={{
          padding: "4rem 0 3.5rem",
          background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#006CE4",
              marginBottom: "1rem",
            }}
          >
            ✦ AI-Generated
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.15,
            }}
          >
            My Travel Itineraries
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: 500,
              lineHeight: 1.75,
              fontSize: "1rem",
              marginBottom: "2rem",
            }}
          >
            Your AI-generated day-by-day trip plans, saved for reference and planning.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-primary"
              style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}
            >
              <Sparkles size={16} />
              Generate New Itinerary
            </button>

            {/* Trip count chip */}
            {trips.length > 0 && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "100px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                {trips.length} {trips.length === 1 ? "itinerary" : "itineraries"} saved
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
        {trips.length === 0 ? (
          /* ── Empty State ── */
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(0,108,228,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <Navigation size={32} style={{ color: "#006CE4" }} />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.75rem",
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              No itineraries yet
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2.25rem", maxWidth: 400, margin: "0 auto 2.25rem" }}>
              Use the AI Trip Planner to generate your first personalised day-by-day itinerary — just enter a destination and let AI do the rest.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-primary"
              style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}
            >
              <Sparkles size={16} />
              Generate My First Trip
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "2rem",
            }}
          >
            {trips.map((trip) => (
              <GeneratedTripCard 
                key={trip.id} 
                trip={trip} 
                onDelete={removeTrip} 
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && <AIItineraryModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
