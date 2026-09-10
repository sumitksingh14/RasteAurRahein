"use client";

import { useState } from "react";
import { Mountain, AlertTriangle, ShieldCheck, HeartPulse, Activity, Info } from "lucide-react";
import { TRIP_ELEVATION_PROFILES, computeAMSRisk, type ElevationPoint } from "@/lib/elevationData";

interface ElevationProfileProps {
  tripSlug: string;
  tripTitle?: string;
}

export default function ElevationProfile({ tripSlug, tripTitle }: ElevationProfileProps) {
  const [unit, setUnit] = useState<"meters" | "feet">("meters");
  const points = TRIP_ELEVATION_PROFILES[tripSlug];

  if (!points || points.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          background: "var(--bg-secondary)",
          borderRadius: "var(--radius-md)",
          border: "1px dashed var(--border)",
          color: "var(--text-muted)",
          fontSize: "0.88rem",
        }}
      >
        <Mountain size={28} style={{ opacity: 0.4, margin: "0 auto 0.5rem" }} />
        <p style={{ margin: 0 }}>This itinerary travels primarily along valleys and coastal plains with low altitude variance.</p>
      </div>
    );
  }

  const ams = computeAMSRisk(points);
  const toUnit = (meters: number) => (unit === "feet" ? Math.round(meters * 3.28084) : meters);
  const unitLabel = unit === "feet" ? "ft" : "m";

  // Chart coordinate calculations
  const maxMeters = Math.max(...points.map((p) => p.altitudeMeters));
  const minMeters = Math.min(...points.map((p) => p.altitudeMeters));
  const chartHeight = 220;
  const chartWidth = 700;
  const paddingX = 40;
  const paddingY = 30;

  const getX = (index: number) => paddingX + (index / (points.length - 1)) * (chartWidth - paddingX * 2);
  const getY = (alt: number) => {
    const range = Math.max(maxMeters - minMeters, 500);
    const normalized = (alt - Math.max(minMeters - 200, 0)) / (range + 400);
    return chartHeight - paddingY - normalized * (chartHeight - paddingY * 2);
  };

  const pathD = points.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getY(pt.altitudeMeters);
    return i === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
  }, "");

  const areaD = `${pathD} L ${getX(points.length - 1)},${chartHeight - paddingY} L ${getX(0)},${chartHeight - paddingY} Z`;

  const riskColor =
    ams.riskLevel === "Extreme"
      ? "#ef4444"
      : ams.riskLevel === "High"
      ? "#f97316"
      : ams.riskLevel === "Moderate"
      ? "#eab308"
      : "#10b981";

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "1.75rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Mountain size={18} color="var(--accent-gold)" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-serif)", margin: 0 }}>
              Route Elevation & Altitude Profile
            </h3>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
            Altitude curve and high-altitude mountain sickness monitoring
          </p>
        </div>

        {/* Meters / Feet toggle */}
        <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", padding: "2px", border: "1px solid var(--border)" }}>
          <button
            onClick={() => setUnit("meters")}
            style={{
              border: "none",
              background: unit === "meters" ? "var(--accent-gold)" : "transparent",
              color: unit === "meters" ? "var(--bg-primary)" : "var(--text-secondary)",
              fontWeight: unit === "meters" ? 700 : 500,
              fontSize: "0.75rem",
              padding: "0.3rem 0.65rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Meters (m)
          </button>
          <button
            onClick={() => setUnit("feet")}
            style={{
              border: "none",
              background: unit === "feet" ? "var(--accent-gold)" : "transparent",
              color: unit === "feet" ? "var(--bg-primary)" : "var(--text-secondary)",
              fontWeight: unit === "feet" ? 700 : 500,
              fontSize: "0.75rem",
              padding: "0.3rem 0.65rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Feet (ft)
          </button>
        </div>
      </div>

      {/* AMS Risk Assessment Gauge Banner */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          background: "var(--bg-secondary)",
          border: `1px solid ${riskColor}40`,
          borderRadius: "var(--radius-md)",
          padding: "1.25rem",
          marginBottom: "1.75rem",
        }}
      >
        <div>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.25rem" }}>
            AMS Risk Rating
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: riskColor,
                boxShadow: `0 0 8px ${riskColor}`,
              }}
            />
            <span style={{ fontSize: "1.3rem", fontWeight: 800, color: riskColor, fontFamily: "var(--font-sans)" }}>
              {ams.riskLevel} Risk
            </span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
            {ams.isHighAltitude ? "High Altitude Route (>2,500m)" : "Standard Altitude"}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.25rem" }}>
            Highest Point
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {toUnit(ams.maxAltitudeMeters).toLocaleString()} {unitLabel}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-gold)", fontWeight: 500 }}>
            {ams.maxAltitudeLocation}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.25rem" }}>
            Steepest 1-Day Climb
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
            +{toUnit(ams.steepestAscentMeters).toLocaleString()} {unitLabel}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Recorded on Day {ams.steepestAscentDay}
          </div>
        </div>
      </div>

      {/* SVG Elevation Curve */}
      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: "100%", minWidth: 550, height: "auto" }}>
          <defs>
            <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d45f11" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#FEBB02" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FEBB02" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[1000, 2500, 3500, 4500, 5300].map((level) => {
            if (level > maxMeters + 300) return null;
            const y = getY(level);
            return (
              <g key={level}>
                <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="var(--border)" strokeDasharray="3 3" opacity={0.6} />
                <text x={paddingX - 6} y={y + 4} textAnchor="end" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-sans)">
                  {toUnit(level)} {unitLabel}
                </text>
              </g>
            );
          })}

          {/* Gradient area under curve */}
          <path d={areaD} fill="url(#elevationGrad)" />

          {/* Elevation curve */}
          <path d={pathD} fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Waypoint markers */}
          {points.map((pt, idx) => {
            const cx = getX(idx);
            const cy = getY(pt.altitudeMeters);
            const isPeak = pt.altitudeMeters === maxMeters;
            return (
              <g key={idx}>
                <circle cx={cx} cy={cy} r={isPeak ? 5.5 : 3.5} fill={isPeak ? "#ef4444" : "var(--accent-gold)"} stroke="#fff" strokeWidth="1.5" />
                {/* Text label */}
                <text
                  x={cx}
                  y={cy - 9}
                  textAnchor="middle"
                  fill={isPeak ? "#ef4444" : "var(--text-primary)"}
                  fontSize={isPeak ? "9.5" : "8"}
                  fontWeight={isPeak ? "700" : "500"}
                  fontFamily="var(--font-sans)"
                >
                  {toUnit(pt.altitudeMeters)}
                </text>
                {/* Waypoint short name below bottom line */}
                <text
                  x={cx}
                  y={chartHeight - paddingY + 16}
                  textAnchor="middle"
                  fill="var(--text-muted)"
                  fontSize="7.5"
                  fontFamily="var(--font-sans)"
                >
                  {pt.label.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Guidelines & Oxygen Points Accordion / Box */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "var(--radius-sm)", padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
            <HeartPulse size={16} color="#d97706" />
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#92400e", margin: 0 }}>
              Acclimatization & Mountain Health Guidelines
            </h4>
          </div>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {ams.guidelines.map((g, i) => (
              <li key={i} style={{ marginBottom: "0.25rem" }}>
                {g}
              </li>
            ))}
          </ul>
        </div>

        {ams.oxygenPoints && (
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.85rem 1.25rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
              🏥 Emergency Oxygen & Medical Support Points
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {ams.oxygenPoints.map((pt, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "0.73rem",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "4px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  📍 {pt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
