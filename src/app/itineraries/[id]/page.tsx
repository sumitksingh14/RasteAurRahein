"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Clock, Navigation } from "lucide-react";
import { useGeneratedTrips, type GeneratedTrip } from "@/components/providers/GeneratedTripsProvider";
import ExportPDFButton from "@/components/ai/ExportPDFButton";
import { useAuth } from "@/components/providers/AuthProvider";

export default function ItineraryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { trips } = useGeneratedTrips();
  const [trip, setTrip] = useState<GeneratedTrip | null>(null);
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (trips.length > 0) {
      const found = trips.find((t) => t.id === unwrappedParams.id);
      setTrip(found || null);
    }
  }, [trips, unwrappedParams.id]);

  if (loading || !user) return null;
  if (!mounted) return null;

  if (!trip) {
    return (
      <div className="container" style={{ padding: "8rem 0", textAlign: "center", minHeight: "100vh" }}>
        <h2 style={{ color: "var(--text-primary)", fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "1rem" }}>
          Itinerary Not Found
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          The itinerary you are looking for does not exist or has been deleted.
        </p>
        <Link 
          href="/itineraries" 
          style={{ 
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--accent-gold)", 
            fontWeight: 500,
            padding: "0.75rem 1.5rem",
            border: "1px solid var(--accent-gold)",
            borderRadius: "var(--radius-md)",
            transition: "all var(--transition)"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-gold-dim)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
        >
          <ArrowLeft size={16} /> Back to Itineraries
        </Link>
      </div>
    );
  }

  const createdAt = new Date(trip.generatedAt);
  const dateLabel = createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div style={{ minHeight: "100vh", paddingTop: "var(--nav-height)", paddingBottom: "4rem" }}>
      <div className="container" style={{ maxWidth: "800px", marginTop: "2rem" }}>
        
        <Link
          href="/itineraries"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-secondary)",
            marginBottom: "2rem",
            textDecoration: "none",
            fontSize: "0.9rem",
            transition: "color var(--transition)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <ArrowLeft size={16} /> Back to My Itineraries
        </Link>

        {/* Header Section */}
        <div style={{ marginBottom: "3rem" }}>
          {trip.tags && trip.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
              {trip.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          )}
          
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-primary)", lineHeight: 1.2 }}>
            {trip.title}
          </h1>
          
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            {trip.overview}
          </p>
          
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "1.5rem", 
            color: "var(--text-muted)", 
            marginBottom: "2rem",
            fontSize: "0.9rem",
            padding: "1rem",
            background: "var(--bg-card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)"
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={16} /> {trip.destination}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar size={16} /> {trip.days.length} days · {trip.month}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={16} /> Generated {dateLabel}</span>
            {trip.totalBudgetEstimate && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent-gold)", fontWeight: 600 }}>
                {trip.totalBudgetEstimate}
              </span>
            )}
          </div>
          
          <ExportPDFButton trip={trip} />
        </div>

        {/* Days Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--text-primary)", borderBottom: "1px solid var(--border)", paddingBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Navigation size={24} style={{ color: "var(--accent-gold)" }} /> Full Itinerary
          </h2>

          {trip.days.map((day) => (
            <div key={day.dayNumber} style={{ background: "var(--bg-card)", padding: "2rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.25rem" }}>
                <span style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: "50%", 
                  background: "var(--accent-gold-dim)", 
                  color: "var(--accent-gold)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontWeight: 700, 
                  fontSize: "1.25rem",
                  flexShrink: 0
                }}>
                  D{day.dayNumber}
                </span>
                <div>
                  <h3 style={{ fontSize: "1.35rem", color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-serif)" }}>{day.title}</h3>
                  {day.summary && <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: "0.35rem 0 0 0", lineHeight: 1.5 }}>{day.summary}</p>}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {day.activities.map((act, i) => (
                  <div key={i} style={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600, width: "70px", flexShrink: 0, paddingTop: "0.25rem", textAlign: "right" }}>
                      {act.time}
                    </div>
                    <div style={{ borderLeft: "2px solid var(--border-accent)", paddingLeft: "1.5rem", paddingBottom: "0.5rem" }}>
                      <h4 style={{ color: "var(--text-primary)", fontSize: "1.1rem", margin: "0 0 0.5rem 0" }}>{act.title}</h4>
                      {act.description && <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: "0 0 0.75rem 0", lineHeight: 1.6 }}>{act.description}</p>}
                      {act.notes && (
                        <div style={{ 
                          background: "var(--bg-primary)", 
                          padding: "0.75rem", 
                          borderRadius: "var(--radius-sm)",
                          borderLeft: "3px solid var(--accent-teal)"
                        }}>
                          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: 0 }}>
                            <span style={{ color: "var(--accent-teal)", fontWeight: 600 }}>Tip: </span> 
                            {act.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
