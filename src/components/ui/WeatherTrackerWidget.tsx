"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWeatherDesc, isGoodTime } from "@/lib/weatherCoords";
import { Wind, MapPin } from "lucide-react";

interface LocationWeather {
  name: string;
  lat: number;
  lon: number;
  tempC: number | null;
  feelsLikeC: number | null;
  precipMm: number | null;
  weatherCode: number | null;
  error?: boolean;
}

interface TrackerData {
  locations: LocationWeather[];
  fetchedAt: string;
}

function ConditionBadge({ status }: { status: "good" | "okay" | "avoid" }) {
  const config = {
    good: { label: "Great time ✓", bg: "rgba(16,185,129,0.1)", color: "#065F46", border: "rgba(16,185,129,0.3)" },
    okay: { label: "Manageable", bg: "rgba(251,191,36,0.1)", color: "#92400E", border: "rgba(251,191,36,0.3)" },
    avoid: { label: "Difficult conditions", bg: "rgba(239,68,68,0.08)", color: "#991B1B", border: "rgba(239,68,68,0.25)" },
  };
  const c = config[status];
  return (
    <span
      style={{
        padding: "0.15rem 0.6rem",
        borderRadius: "100px",
        fontSize: "0.68rem",
        fontWeight: 700,
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        letterSpacing: "0.02em",
      }}
    >
      {c.label}
    </span>
  );
}

function WeatherCard({ loc }: { loc: LocationWeather }) {
  if (loc.error || loc.tempC === null || loc.weatherCode === null) {
    return (
      <div
        style={{
          background: "#F9FAFB",
          border: "1px solid #E5E7EB",
          borderRadius: "var(--radius-md)",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          opacity: 0.6,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#374151" }}>{loc.name}</div>
        <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>Data unavailable</div>
      </div>
    );
  }

  const desc = getWeatherDesc(loc.weatherCode);
  const status = isGoodTime(loc.tempC, loc.precipMm || 0, loc.weatherCode);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: "var(--radius-md)",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
      }}
    >
      {/* Location + emoji */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#262729" }}>
            {loc.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "#6B7280", marginTop: 2 }}>
            <MapPin size={10} /> {loc.lat.toFixed(2)}°N, {loc.lon.toFixed(2)}°E
          </div>
        </div>
        <span style={{ fontSize: "2rem" }}>{desc.emoji}</span>
      </div>

      {/* Temp */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
        <span style={{ fontSize: "2rem", fontWeight: 800, color: "#262729", lineHeight: 1 }}>
          {Math.round(loc.tempC)}°C
        </span>
        <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>
          feels {Math.round(loc.feelsLikeC || loc.tempC)}°
        </span>
      </div>

      {/* Condition */}
      <div style={{ fontSize: "0.8rem", color: "#374151" }}>{desc.label}</div>

      {/* Good time indicator */}
      <ConditionBadge status={status} />
    </div>
  );
}

export default function WeatherTrackerWidget() {
  const [data, setData] = useState<TrackerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/weather/tracker")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const fetchedLabel = data?.fetchedAt
    ? new Date(data.fetchedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.75rem",
              color: "#262729",
              marginBottom: "0.25rem",
            }}
          >
            Live Weather Across India
          </h2>
          <p style={{ color: "#6B7280", fontSize: "0.85rem" }}>
            Current conditions at key travel hubs. Updates every 10 minutes.
          </p>
        </div>
        {fetchedLabel && (
          <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
            Last updated: {fetchedLabel}
          </div>
        )}
      </div>

      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(200px,100%),1fr))",
            gap: "1rem",
          }}
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 160,
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.4s infinite",
              }}
            />
          ))}
          <style>{`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(200px,100%),1fr))",
            gap: "1rem",
          }}
        >
          {(data?.locations || []).map((loc) => (
            <WeatherCard key={`${loc.lat}-${loc.lon}`} loc={loc} />
          ))}
        </div>
      )}

      <p style={{ fontSize: "0.7rem", color: "#9CA3AF", marginTop: "1.5rem", textAlign: "right" }}>
        Data:{" "}
        <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" style={{ color: "#9CA3AF" }}>
          Open-Meteo
        </a>{" "}
        · Free &amp; no API key required
      </p>
    </div>
  );
}
