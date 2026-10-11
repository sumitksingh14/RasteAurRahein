"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, Compass } from "lucide-react";
import type { RegionConfig } from "@/lib/regions";
import type { Trip } from "@/lib/types";
import { filterTripsByRegion } from "@/lib/regions";

interface InteractiveRegionsMapProps {
  regions: RegionConfig[];
  allTrips: Trip[];
}

interface RegionMapZone {
  slug: string;
  name: string;
  path: string;
  pinX: number;
  pinY: number;
  color: string;
  activeColor: string;
}

const REGION_ZONES: RegionMapZone[] = [
  {
    slug: "himalayas",
    name: "Himalayas & North",
    // Crown of northern India: Ladakh, Kashmir, Himachal, Uttarakhand
    path: "M 180,60 C 205,30 250,25 280,45 C 310,65 315,100 295,135 C 275,170 230,175 195,160 C 160,145 155,90 180,60 Z",
    pinX: 235,
    pinY: 100,
    color: "rgba(56, 189, 248, 0.15)",
    activeColor: "#38bdf8",
  },
  {
    slug: "rajasthan",
    name: "Rajasthan & West",
    // Thar desert, Aravallis & Gujarat peninsula
    path: "M 120,165 C 165,165 195,185 190,240 C 185,290 145,330 110,315 C 80,300 70,240 85,200 C 95,175 110,165 120,165 Z",
    pinX: 135,
    pinY: 245,
    color: "rgba(245, 158, 11, 0.15)",
    activeColor: "#f59e0b",
  },
  {
    slug: "central-india",
    name: "Central India",
    // Heartland: MP, Chhattisgarh, Vindhyas & Satpuras
    path: "M 200,200 C 255,190 310,210 325,260 C 335,305 295,350 240,360 C 190,370 175,320 185,265 C 190,225 195,205 200,200 Z",
    pinX: 255,
    pinY: 280,
    color: "rgba(16, 185, 129, 0.15)",
    activeColor: "#10b981",
  },
  {
    slug: "northeast-india",
    name: "Northeast India",
    // Seven Sisters & Sikkim
    path: "M 380,140 C 435,120 480,135 500,175 C 520,215 490,265 440,270 C 405,275 375,235 370,195 C 365,165 370,145 380,140 Z",
    pinX: 435,
    pinY: 195,
    color: "rgba(168, 85, 247, 0.15)",
    activeColor: "#a855f7",
  },
  {
    slug: "east-india",
    name: "East India",
    // Odisha, West Bengal, Jharkhand
    path: "M 320,250 C 370,240 400,270 395,330 C 390,385 340,410 300,390 C 275,370 290,310 305,275 C 315,255 318,252 320,250 Z",
    pinX: 345,
    pinY: 325,
    color: "rgba(236, 72, 153, 0.15)",
    activeColor: "#ec4899",
  },
  {
    slug: "coastal",
    name: "Coastal & Western Ghats",
    // Konkan coast, Goa, Sahyadri range
    path: "M 135,320 C 175,335 180,385 175,445 C 170,490 145,510 130,480 C 115,440 110,380 120,340 C 125,325 130,320 135,320 Z",
    pinX: 150,
    pinY: 415,
    color: "rgba(6, 182, 212, 0.15)",
    activeColor: "#06b6d4",
  },
  {
    slug: "south-india",
    name: "South India",
    // Deccan Peninsula: Karnataka, Kerala, Tamil Nadu
    path: "M 180,410 C 245,410 270,450 255,520 C 240,580 190,620 170,580 C 150,540 155,470 170,430 C 175,415 178,412 180,410 Z",
    pinX: 210,
    pinY: 510,
    color: "rgba(254, 187, 2, 0.15)",
    activeColor: "#FEBB02",
  },
];

export default function InteractiveRegionsMap({ regions, allTrips }: InteractiveRegionsMapProps) {
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string>("himalayas");

  const activeRegion = regions.find((r) => r.slug === activeSlug) || regions[0];
  const activeZone = REGION_ZONES.find((z) => z.slug === activeSlug) || REGION_ZONES[0];
  const tripCount = filterTripsByRegion(allTrips, activeRegion).length;

  const handleSelectRegion = (slug: string) => {
    setActiveSlug(slug);
  };

  const handleNavigate = (slug: string) => {
    router.push(`/regions/${slug}`);
  };

  return (
    <div
      className="interactive-regions-map-wrapper glass-card"
      style={{
        padding: "clamp(1.25rem, 3.5vw, 2.25rem)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        marginBottom: "3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.75rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1.25rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.25rem" }}>
            <Compass size={18} color="var(--accent-gold)" />
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                fontFamily: "var(--font-serif)",
                margin: 0,
              }}
            >
              Interactive Subcontinent Circuit Map
            </h2>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
            Click or navigate any region on the map or selector below to view regional itineraries
          </p>
        </div>

        {/* Region pills quick selector */}
        <div
          role="tablist"
          aria-label="Subcontinent regions"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
          }}
        >
          {REGION_ZONES.map((zone) => {
            const isSelected = zone.slug === activeSlug;
            return (
              <button
                key={zone.slug}
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectRegion(zone.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleNavigate(zone.slug);
                  }
                }}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: "9999px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: isSelected ? zone.activeColor : "var(--border)",
                  background: isSelected ? `${zone.activeColor}22` : "var(--bg-card)",
                  color: isSelected ? zone.activeColor : "var(--text-secondary)",
                  transition: "all 0.15s ease",
                }}
              >
                {zone.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Layout: SVG Map + Active Details Preview Card */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {/* SVG Interactive Map */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 480,
            margin: "0 auto",
            aspectRatio: "560/640",
            background: "rgba(10, 10, 15, 0.45)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            padding: "1rem",
            boxSizing: "border-box",
          }}
        >
          <svg
            viewBox="0 0 560 640"
            role="region"
            aria-label="Map of India showing 7 travel regions"
            style={{
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
          >
            {/* Ambient India outline glow */}
            <defs>
              <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Region Zones */}
            {REGION_ZONES.map((zone) => {
              const isActive = zone.slug === activeSlug;
              return (
                <g
                  key={zone.slug}
                  tabIndex={0}
                  role="button"
                  aria-label={`${zone.name} region`}
                  onClick={() => handleNavigate(zone.slug)}
                  onMouseEnter={() => handleSelectRegion(zone.slug)}
                  onFocus={() => handleSelectRegion(zone.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNavigate(zone.slug);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    outline: "none",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path
                    d={zone.path}
                    fill={isActive ? `${zone.activeColor}40` : zone.color}
                    stroke={isActive ? zone.activeColor : "rgba(255, 255, 255, 0.25)"}
                    strokeWidth={isActive ? 2.5 : 1.2}
                    filter={isActive ? "url(#mapGlow)" : undefined}
                    style={{
                      transition: "fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease",
                    }}
                  />

                  {/* Waypoint Marker Pin */}
                  <circle
                    cx={zone.pinX}
                    cy={zone.pinY}
                    r={isActive ? 7 : 5}
                    fill={zone.activeColor}
                    stroke="#ffffff"
                    strokeWidth={isActive ? 2 : 1.5}
                    style={{ transition: "r 0.2s ease" }}
                  />

                  {/* Region text tag */}
                  <text
                    x={zone.pinX}
                    y={zone.pinY - 12}
                    textAnchor="middle"
                    fill={isActive ? "#ffffff" : "var(--text-muted)"}
                    fontSize={isActive ? 11 : 9.5}
                    fontWeight={isActive ? 800 : 600}
                    fontFamily="var(--font-sans)"
                    style={{
                      textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                      pointerEvents: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {zone.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Region Detailed Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            background: "var(--bg-card)",
            padding: "1.75rem",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${activeZone.activeColor}55`,
            boxShadow: `0 8px 30px ${activeZone.activeColor}15`,
            transition: "all 0.25s ease",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: activeZone.activeColor,
                marginBottom: "0.5rem",
              }}
            >
              <MapPin size={13} />
              <span>Selected Region</span>
            </div>

            <h3
              style={{
                fontSize: "1.65rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                fontFamily: "var(--font-serif)",
                margin: "0 0 0.5rem",
              }}
            >
              {activeRegion.label}
            </h3>

            <div
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                background: `${activeZone.activeColor}18`,
                color: activeZone.activeColor,
                border: `1px solid ${activeZone.activeColor}44`,
                marginBottom: "0.75rem",
              }}
            >
              {tripCount} Field-Tested Route{tripCount !== 1 ? "s" : ""}
            </div>

            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {activeRegion.description}
            </p>
          </div>

          <div
            style={{
              paddingTop: "1rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Includes: {activeRegion.tags.slice(0, 4).join(" · ")}
            </div>

            <Link
              href={`/regions/${activeRegion.slug}`}
              id={`view-region-btn-${activeRegion.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-sm)",
                background: activeZone.activeColor,
                color: "#0a0a0f",
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
                transition: "transform 0.15s ease",
              }}
            >
              <span>Explore {activeRegion.label}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
