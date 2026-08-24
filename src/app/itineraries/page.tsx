"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, Calendar, Clock, Trash2, ChevronRight, Navigation } from "lucide-react";
import { useGeneratedTrips, type GeneratedTrip } from "@/components/providers/GeneratedTripsProvider";
import AIItineraryModal from "@/components/ai/AIItineraryModal";

// ---------------------------------------------------------------------------
// Trip Card
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
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--bg-card)",
        transition: "border-color var(--transition), box-shadow var(--transition)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-accent)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Card header — gradient strip */}
      <div
        style={{
          height: 6,
          background: "linear-gradient(90deg, var(--accent-gold), var(--accent-rose), var(--accent-teal))",
        }}
      />

      <div style={{ padding: "1.5rem" }}>
        {/* Tags */}
        {trip.tags && trip.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
            {trip.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag-pill" style={{ fontSize: "0.65rem" }}>{tag}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.2rem",
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
            lineHeight: 1.25,
          }}
        >
          {trip.title}
        </h3>

        {/* Overview */}
        {trip.overview && (
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>
            {trip.overview}
          </p>
        )}

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            marginBottom: "1rem",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={12} /> {trip.destination}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={12} /> {trip.days.length} days · {trip.month}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={12} /> Generated {dateLabel}
          </span>
          {trip.totalBudgetEstimate && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "var(--accent-gold)",
                fontWeight: 600,
              }}
            >
              {trip.totalBudgetEstimate}
            </span>
          )}
        </div>

        {/* Expand/collapse day list */}
        <button
          onClick={() => setExpanded((e) => !e)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
            color: "var(--accent-gold)",
            fontWeight: 500,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            padding: "0.5rem 0.75rem",
            borderRadius: "var(--radius-sm)",
            marginBottom: "0.25rem",
            transition: "background var(--transition)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-gold-dim)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <ChevronRight
            size={14}
            style={{
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform var(--transition)",
            }}
          />
          {expanded ? "Hide" : "View"} {trip.days.length}-day itinerary
        </button>

        {expanded && (
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              borderTop: "1px solid var(--border)",
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
                  padding: "0.6rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    minWidth: 28,
                    height: 28,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--accent-gold-dim)",
                    border: "1px solid var(--border-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    flexShrink: 0,
                  }}
                >
                  D{day.dayNumber}
                </span>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                    {day.title}
                  </div>
                  {day.summary && (
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                      {day.summary}
                    </div>
                  )}
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>
                    {day.activities.length} activities
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
          <button
            onClick={() => onDelete(trip.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              padding: "0.3rem 0.5rem",
              borderRadius: "var(--radius-sm)",
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-rose)"; e.currentTarget.style.background = "rgba(232,133,125,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "none"; }}
          >
            <Trash2 size={13} /> Delete
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
        <div className="container">
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-gold)",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Sparkles size={12} /> AI-Generated
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            My Travel Itineraries
          </h1>
          <p style={{ color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.7, fontSize: "1rem", marginBottom: "1.5rem" }}>
            Your AI-generated day-by-day trip plans, saved for reference and planning.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            id="itineraries-new-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.75rem 1.5rem",
              borderRadius: "var(--radius-sm)",
              background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
              color: "#fff",
              border: "none",
              fontSize: "0.9rem",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
            }}
          >
            <Sparkles size={15} />
            Generate New Itinerary
          </button>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
        {trips.length === 0 ? (
          /* Empty state */
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              borderRadius: "var(--radius-lg)",
              border: "1px dashed var(--border)",
              background: "var(--bg-secondary)",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-gold-dim), rgba(78,205,196,0.1))",
                border: "1px solid var(--border-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <Navigation size={32} style={{ color: "var(--accent-gold)" }} />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              No itineraries yet
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Use the AI Trip Planner to generate your first personalised day-by-day itinerary — just enter a destination and let Gemini do the rest.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.8rem 1.75rem",
                borderRadius: "var(--radius-sm)",
                background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                color: "#fff",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
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
