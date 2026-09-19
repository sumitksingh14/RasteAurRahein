"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { MapPin as MapPinIcon, ExternalLink } from "lucide-react";
import type { Trip } from "@/lib/types";
import { TRIP_WEATHER_COORDS } from "@/lib/weatherCoords";

// Lazy-load map only in browser
const OpenLayersMapInner = dynamic(
  () => import("@/components/ui/OpenLayersMapInner"),
  {
    ssr: false,
    loading: () => (
      <div
        className="skeleton"
        style={{ height: 520, width: "100%", borderRadius: "var(--radius-md)" }}
      />
    ),
  }
);

interface TripsMapExplorerProps {
  trips: Trip[];
}

interface PinWithTrip {
  lat: number;
  lng: number;
  label: string;
  day?: number;
  slug: string;
}

export default function TripsMapExplorer({ trips }: TripsMapExplorerProps) {
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Build MapPins from TRIP_WEATHER_COORDS (only trips we have coords for)
  const pins: PinWithTrip[] = useMemo(
    () =>
      trips
        .filter((t) => TRIP_WEATHER_COORDS[t.slug])
        .map((t) => {
          const coords = TRIP_WEATHER_COORDS[t.slug];
          return {
            lat: coords.lat,
            lng: coords.lon,
            label: t.title,
            slug: t.slug,
          };
        }),
    [trips]
  );

  const mappedCount = pins.length;
  const unmappedCount = trips.length - mappedCount;

  const activeTrip = activeSlug
    ? trips.find((t) => t.slug === activeSlug)
    : null;

  return (
    <div>
      {/* Map info bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
          }}
        >
          <MapPinIcon size={13} color="var(--accent-gold)" />
          {mappedCount} trips plotted
          {unmappedCount > 0 && ` · ${unmappedCount} without coordinates`}
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
          Click a pin to see trip details
        </p>
      </div>

      {/* Map container with clickable overlay */}
      <div style={{ position: "relative" }}>
        <OpenLayersMapInner
          pins={pins}
          zoom={5}
          height={520}
          center={{ lat: 22.5, lng: 80 }}
        />

        {/* Active trip popup card */}
        {activeTrip && (
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              maxWidth: 340,
              background: "rgba(17, 19, 24, 0.95)",
              border: "1px solid var(--border-accent)",
              borderRadius: "var(--radius-md)",
              padding: "1rem",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--accent-gold)",
                marginBottom: "0.3rem",
              }}
            >
              {activeTrip.country ?? "India"}
            </div>
            <div
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "var(--font-serif)",
                marginBottom: "0.4rem",
                lineHeight: 1.3,
              }}
            >
              {activeTrip.title}
            </div>
            {activeTrip.excerpt && (
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                  margin: "0 0 0.75rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {activeTrip.excerpt}
              </p>
            )}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => router.push(`/trips/${activeTrip.slug}`)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  padding: "0.5rem",
                  background: "var(--accent-gold)",
                  color: "#0a0a0f",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <ExternalLink size={12} />
                View Trip
              </button>
              <button
                onClick={() => setActiveSlug(null)}
                style={{
                  padding: "0.5rem 0.75rem",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-muted)",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable trip list under map */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
          gap: "0.75rem",
          maxHeight: 340,
          overflowY: "auto",
          paddingRight: "0.25rem",
        }}
      >
        {pins.map((pin) => {
          const trip = trips.find((t) => t.slug === pin.slug);
          if (!trip) return null;
          const isActive = activeSlug === pin.slug;
          return (
            <button
              key={pin.slug}
              onClick={() => setActiveSlug(isActive ? null : pin.slug)}
              style={{
                textAlign: "left",
                padding: "0.75rem",
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${isActive ? "var(--border-accent)" : "var(--border)"}`,
                background: isActive ? "var(--accent-gold-dim)" : "var(--bg-card)",
                cursor: "pointer",
                transition: "all var(--transition)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "0.2rem",
                }}
              >
                <MapPinIcon size={11} color="var(--accent-gold)" />
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  {TRIP_WEATHER_COORDS[pin.slug]?.name}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: isActive ? "var(--accent-gold)" : "var(--text-primary)",
                  lineHeight: 1.3,
                }}
              >
                {trip.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
