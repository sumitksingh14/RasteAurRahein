"use client";

import { useState } from "react";
import { Mountain, HeartPulse, Table, LineChart, Info } from "lucide-react";
import { TRIP_ELEVATION_PROFILES, computeAMSRisk, type ElevationPoint } from "@/lib/elevationData";
import { ALTITUDE_RISK_CONFIG, getAltitudeRiskBand } from "@/lib/altitude-risk";
import type { ItineraryDay } from "@/lib/types";

interface ElevationProfileProps {
  tripSlug: string;
  tripTitle?: string;
  itinerary?: ItineraryDay[];
}

export default function ElevationProfile({ tripSlug, tripTitle, itinerary }: ElevationProfileProps) {
  const [unit, setUnit] = useState<"meters" | "feet">("meters");
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");

  // Derive points from itinerary if present with overnight altitudes, or fall back to preset elevation profile
  let points: ElevationPoint[] = TRIP_ELEVATION_PROFILES[tripSlug] || [];

  if (itinerary && itinerary.length > 0) {
    const itineraryPoints = itinerary
      .filter((d) => typeof d.overnightAltitudeM === "number")
      .map((d) => ({
        label: `${d.title} (Overnight)`,
        day: d.dayNumber,
        altitudeMeters: d.overnightAltitudeM!,
        description: d.summary || `Night ${d.dayNumber} sleeping altitude`,
      }));

    if (itineraryPoints.length > 0) {
      points = itineraryPoints;
    }
  }

  // Strictly render ONLY when the trip has valid altitude data
  if (!points || points.length === 0) {
    return null;
  }

  const ams = computeAMSRisk(points);
  const toUnit = (meters: number) => (unit === "feet" ? Math.round(meters * 3.28084) : meters);
  const unitLabel = unit === "feet" ? "ft" : "m";

  // Chart coordinate calculations
  const maxMeters = Math.max(...points.map((p) => p.altitudeMeters));
  const minMeters = Math.min(...points.map((p) => p.altitudeMeters));
  const chartHeight = 240;
  const chartWidth = 720;
  const paddingX = 45;
  const paddingY = 32;

  const yMaxBound = Math.max(maxMeters + 400, 3800);
  const yMinBound = Math.max(minMeters - 300, 0);

  const getX = (index: number) =>
    points.length === 1
      ? chartWidth / 2
      : paddingX + (index / (points.length - 1)) * (chartWidth - paddingX * 2);

  const getY = (alt: number) => {
    const range = Math.max(yMaxBound - yMinBound, 500);
    const normalized = (alt - yMinBound) / range;
    return chartHeight - paddingY - normalized * (chartHeight - paddingY * 2);
  };

  const pathD = points.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getY(pt.altitudeMeters);
    return i === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
  }, "");

  const areaD =
    points.length > 1
      ? `${pathD} L ${getX(points.length - 1)},${chartHeight - paddingY} L ${getX(0)},${chartHeight - paddingY} Z`
      : "";

  const peakRiskBand = getAltitudeRiskBand(maxMeters);

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
            <h3
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "var(--font-serif)",
                margin: 0,
              }}
            >
              Altitude Profile &amp; Mountain Sickness (AMS) Zones
            </h3>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
            Per-day sleeping altitude telemetry with color-coded risk bands
          </p>
        </div>

        {/* View Mode & Unit Toggles */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* Chart / Table toggle */}
          <div
            style={{
              display: "flex",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              padding: "2px",
              border: "1px solid var(--border)",
            }}
          >
            <button
              onClick={() => setViewMode("chart")}
              aria-label="Show altitude chart"
              style={{
                border: "none",
                background: viewMode === "chart" ? "var(--accent-gold)" : "transparent",
                color: viewMode === "chart" ? "var(--bg-primary)" : "var(--text-secondary)",
                fontWeight: viewMode === "chart" ? 700 : 500,
                fontSize: "0.75rem",
                padding: "0.3rem 0.65rem",
                borderRadius: "4px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <LineChart size={13} />
              Chart
            </button>
            <button
              onClick={() => setViewMode("table")}
              aria-label="Show accessible altitude table"
              style={{
                border: "none",
                background: viewMode === "table" ? "var(--accent-gold)" : "transparent",
                color: viewMode === "table" ? "var(--bg-primary)" : "var(--text-secondary)",
                fontWeight: viewMode === "table" ? 700 : 500,
                fontSize: "0.75rem",
                padding: "0.3rem 0.65rem",
                borderRadius: "4px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Table size={13} />
              Table
            </button>
          </div>

          {/* Unit toggle */}
          <div
            style={{
              display: "flex",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              padding: "2px",
              border: "1px solid var(--border)",
            }}
          >
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
              m
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
              ft
            </button>
          </div>
        </div>
      </div>

      {/* Risk Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          background: "var(--bg-secondary)",
          border: `1px solid ${peakRiskBand.color}40`,
          borderRadius: "var(--radius-md)",
          padding: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: "0.25rem",
            }}
          >
            Peak Altitude Risk
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: peakRiskBand.color,
                boxShadow: `0 0 8px ${peakRiskBand.color}`,
              }}
            />
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                color: peakRiskBand.color,
                fontFamily: "var(--font-sans)",
              }}
            >
              {peakRiskBand.label}
            </span>
          </div>
          <div style={{ fontSize: "0.73rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
            {peakRiskBand.description}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: "0.25rem",
            }}
          >
            Highest Elevation Point
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {toUnit(ams.maxAltitudeMeters).toLocaleString()} {unitLabel}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-gold)", fontWeight: 500 }}>
            {ams.maxAltitudeLocation}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: "0.25rem",
            }}
          >
            Steepest Daily Climb
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
            +{toUnit(ams.steepestAscentMeters).toLocaleString()} {unitLabel}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Recorded on Day {ams.steepestAscentDay}
          </div>
        </div>
      </div>

      {/* Screen reader text alternative */}
      <p className="sr-only">
        Altitude profile for {tripTitle || tripSlug}. Maximum altitude reaches {maxMeters} meters at{" "}
        {ams.maxAltitudeLocation}. Risk rating: {peakRiskBand.label}.
      </p>

      {/* Visualization Mode: SVG Chart */}
      {viewMode === "chart" ? (
        <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            style={{ width: "100%", minWidth: 550, height: "auto" }}
            role="img"
            aria-label="Per-day altitude profile chart with color-coded risk bands"
          >
            <defs>
              <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d45f11" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#FEBB02" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FEBB02" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Color-coded Risk Background Bands */}
            {/* Red Band (> 3,500m) */}
            {yMaxBound > 3500 && (
              <rect
                x={paddingX}
                y={getY(yMaxBound)}
                width={chartWidth - paddingX * 2}
                height={Math.max(0, getY(3500) - getY(yMaxBound))}
                fill="rgba(239, 68, 68, 0.08)"
              />
            )}
            {/* Amber Band (2,500m – 3,500m) */}
            {yMaxBound > 2500 && (
              <rect
                x={paddingX}
                y={getY(Math.min(yMaxBound, 3500))}
                width={chartWidth - paddingX * 2}
                height={Math.max(0, getY(2500) - getY(Math.min(yMaxBound, 3500)))}
                fill="rgba(245, 158, 11, 0.08)"
              />
            )}
            {/* Green Band (< 2,500m) */}
            <rect
              x={paddingX}
              y={getY(Math.min(yMaxBound, 2500))}
              width={chartWidth - paddingX * 2}
              height={Math.max(0, chartHeight - paddingY - getY(Math.min(yMaxBound, 2500)))}
              fill="rgba(16, 185, 129, 0.08)"
            />

            {/* Threshold reference lines */}
            {[2500, 3500].map((thresh) => {
              if (thresh > yMaxBound || thresh < yMinBound) return null;
              const y = getY(thresh);
              const isHigh = thresh === 3500;
              return (
                <g key={thresh}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke={isHigh ? "#ef4444" : "#f59e0b"}
                    strokeDasharray="4 4"
                    strokeWidth="1.2"
                    opacity={0.8}
                  />
                  <text
                    x={chartWidth - paddingX - 4}
                    y={y - 5}
                    textAnchor="end"
                    fill={isHigh ? "#ef4444" : "#f59e0b"}
                    fontSize="8.5"
                    fontWeight="700"
                    fontFamily="var(--font-sans)"
                  >
                    {isHigh ? "High AMS Threshold (3,500m)" : "Acclimatization Threshold (2,500m)"}
                  </text>
                </g>
              );
            })}

            {/* Elevation grid markings */}
            {[1000, 2000, 3000, 4000, 5000].map((level) => {
              if (level > yMaxBound || level < yMinBound) return null;
              const y = getY(level);
              return (
                <g key={level}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="var(--border)"
                    strokeDasharray="2 3"
                    opacity={0.5}
                  />
                  <text
                    x={paddingX - 6}
                    y={y + 4}
                    textAnchor="end"
                    fill="var(--text-muted)"
                    fontSize="9"
                    fontFamily="var(--font-sans)"
                  >
                    {toUnit(level)} {unitLabel}
                  </text>
                </g>
              );
            })}

            {/* Gradient area under curve */}
            {areaD && <path d={areaD} fill="url(#elevationGrad)" />}

            {/* Elevation curve */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="var(--accent-gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Waypoint markers */}
            {points.map((pt, idx) => {
              const cx = getX(idx);
              const cy = getY(pt.altitudeMeters);
              const band = getAltitudeRiskBand(pt.altitudeMeters);

              return (
                <g key={idx}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={band.color}
                    stroke="#ffffff"
                    strokeWidth="1.75"
                  />
                  {/* Altitude label */}
                  <text
                    x={cx}
                    y={cy - 9}
                    textAnchor="middle"
                    fill={band.color}
                    fontSize="8.5"
                    fontWeight="700"
                    fontFamily="var(--font-sans)"
                  >
                    {toUnit(pt.altitudeMeters)}
                  </text>
                  {/* Waypoint day label */}
                  <text
                    x={cx}
                    y={chartHeight - paddingY + 16}
                    textAnchor="middle"
                    fill="var(--text-muted)"
                    fontSize="8"
                    fontFamily="var(--font-sans)"
                  >
                    Day {pt.day}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        /* Accessible Table View */
        <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.82rem",
              fontFamily: "var(--font-sans)",
            }}
          >
            <thead>
              <tr style={{ background: "var(--bg-secondary)", borderBottom: "2px solid var(--border)" }}>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-primary)" }}>Day</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-primary)" }}>Halt / Location</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "right", color: "var(--text-primary)" }}>Altitude</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-primary)" }}>Risk Band</th>
              </tr>
            </thead>
            <tbody>
              {points.map((pt, i) => {
                const band = getAltitudeRiskBand(pt.altitudeMeters);
                return (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: i % 2 === 0 ? "transparent" : "var(--bg-secondary)",
                    }}
                  >
                    <td style={{ padding: "0.65rem 1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      Day {pt.day}
                    </td>
                    <td style={{ padding: "0.65rem 1rem", color: "var(--text-secondary)" }}>
                      {pt.label}
                    </td>
                    <td style={{ padding: "0.65rem 1rem", textAlign: "right", fontWeight: 700, color: band.color }}>
                      {toUnit(pt.altitudeMeters).toLocaleString()} {unitLabel}
                    </td>
                    <td style={{ padding: "0.65rem 1rem" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          background: band.badgeBg,
                          color: band.color,
                          border: `1px solid ${band.badgeBorder}`,
                        }}
                      >
                        {band.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Guidelines & Emergency Medical Box */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          style={{
            background: "rgba(245,158,11,0.06)",
            border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: "var(--radius-sm)",
            padding: "1rem 1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
            <HeartPulse size={16} color="#d97706" />
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#92400e", margin: 0 }}>
              Acclimatization &amp; High-Altitude Safety Guidelines
            </h4>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.2rem",
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            {ams.guidelines.map((g, i) => (
              <li key={i} style={{ marginBottom: "0.25rem" }}>
                {g}
              </li>
            ))}
          </ul>
        </div>

        {ams.oxygenPoints && (
          <div
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "0.85rem 1.25rem",
            }}
          >
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
              🏥 Emergency Oxygen &amp; High-Altitude Medical Posts
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

        {/* Short non-medical disclaimer mandated by legal/safety guidelines */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            background: "rgba(0,0,0,0.03)",
            padding: "0.6rem 0.9rem",
            borderRadius: "var(--radius-sm)",
            border: "1px dashed var(--border)",
          }}
        >
          <Info size={14} style={{ flexShrink: 0, opacity: 0.7 }} />
          <span>{ALTITUDE_RISK_CONFIG.disclaimer}</span>
        </div>
      </div>
    </div>
  );
}
