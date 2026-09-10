"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import type { Trip } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { useGeneratedTrips, type GeneratedTrip, type GeneratedDay } from "@/components/providers/GeneratedTripsProvider";

interface RemixTripButtonProps {
  trip: Trip;
  style?: React.CSSProperties;
}

export default function RemixTripButton({ trip, style = {} }: RemixTripButtonProps) {
  const router = useRouter();
  const { user, openAuthModal } = useAuth();
  const { addTrip } = useGeneratedTrips();
  const [loading, setLoading] = useState(false);

  const handleRemix = async () => {
    if (!user) {
      openAuthModal();
      return;
    }

    setLoading(true);

    try {
      // Map Trip itinerary to GeneratedTrip format
      const generatedDays: GeneratedDay[] =
        trip.itinerary?.map((d) => ({
          dayNumber: d.dayNumber,
          title: d.title,
          summary: d.summary,
          activities:
            d.activities?.map((a) => ({
              time: a.time,
              title: a.title,
              description: a.description,
              notes: a.notes,
              type: a.type,
            })) || [],
        })) || [];

      const newTripData: Omit<GeneratedTrip, "id"> = {
        title: `My ${trip.title} (Customized)`,
        destination: trip.country || trip.title,
        overview: trip.excerpt || `Customized variant of ${trip.title}`,
        bestTimeToVisit: trip.bestSuggestedMonth,
        totalBudgetEstimate: trip.totalBudget ? `₹${trip.totalBudget.toLocaleString()}` : undefined,
        tags: trip.tags || ["Customized", "Remix"],
        days: generatedDays,
        style: trip.tripType || "Adventure",
        month: trip.bestSuggestedMonth || "October",
        generatedAt: new Date().toISOString(),
      };

      const saved = addTrip(newTripData);

      // Also persist to Redis backend if user is logged in
      try {
        await fetch("/api/saved-itineraries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTripData.title,
            destination: newTripData.destination,
            days: newTripData.days.length,
            pace: "moderate",
            budget: newTripData.totalBudgetEstimate || "₹30,000",
            travelStyle: (newTripData.tags || []).join(", "),
            itineraryJson: JSON.stringify({ ...newTripData, id: saved.id }),
          }),
        });
      } catch {
        // LocalStorage fallback already set in addTrip
      }

      router.push(`/itineraries/${saved.id}`);
    } catch (err) {
      console.error("Failed to remix trip:", err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRemix}
      disabled={loading}
      title="Clone and customize this itinerary in your planner"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "0.5rem 1rem",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-accent)",
        background: "var(--accent-gold-dim)",
        color: "var(--accent-gold)",
        fontSize: "0.85rem",
        fontWeight: 600,
        fontFamily: "var(--font-sans)",
        cursor: loading ? "wait" : "pointer",
        transition: "all var(--transition)",
        whiteSpace: "nowrap",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-gold)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--bg-primary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-gold-dim)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--accent-gold)";
      }}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Sparkles size={14} />
      )}
      <span>{loading ? "Customizing…" : "Customize Itinerary"}</span>
      {!loading && <ArrowRight size={13} style={{ opacity: 0.8 }} />}
    </button>
  );
}
