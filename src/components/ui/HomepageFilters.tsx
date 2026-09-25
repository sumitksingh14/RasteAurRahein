"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Trip } from "@/lib/types";

// ── Filter categories with keyword matchers ───────────────────────────────────
const FILTER_CATEGORIES = [
  { label: "All Types", key: "all" },
  { label: "Treks", key: "treks" },
  { label: "Road Trips", key: "road-trips" },
  { label: "Monsoon Season", key: "monsoon" },
  { label: "Autumn/Winter", key: "autumn-winter" },
  { label: "Weekend Getaways", key: "weekend" },
] as const;

type FilterKey = (typeof FILTER_CATEGORIES)[number]["key"];

function matchesFilter(trip: Trip, key: FilterKey): boolean {
  if (key === "all") return true;
  const typeLower = (trip.tripType ?? "").toLowerCase();
  const tagsLower = (trip.tags ?? []).map((t) => t.toLowerCase());
  const monthLower = (trip.bestSuggestedMonth ?? "").toLowerCase();
  const has = (...kws: string[]) =>
    kws.some((kw) => tagsLower.some((t) => t.includes(kw)) || typeLower.includes(kw));

  switch (key) {
    case "treks":
      return has("trek", "trekking", "hiking", "high altitude", "summit");
    case "road-trips":
      return has("road trip", "road", "highway", "drive", "motorcycle", "route");
    case "monsoon":
      return has("monsoon", "rain", "waterfall") ||
        /\b(jun|jul|aug|sep|june|july|august|september)\b/.test(monthLower);
    case "autumn-winter":
      return has("winter", "snow", "christmas") ||
        /\b(oct|nov|dec|jan|feb|october|november|december|january|february)\b/.test(monthLower);
    case "weekend":
      return has("weekend", "short", "getaway", "day trip") ||
        (trip.totalBudget !== undefined && trip.totalBudget <= 20000) ||
        ((trip.itinerary?.length ?? 99) <= 3);
    default:
      return true;
  }
}

// ── Derive display badges from real trip data ─────────────────────────────────
function getTypeBadge(trip: Trip): string {
  const t = (trip.tripType ?? "").toLowerCase();
  const tags = (trip.tags ?? []).map((x) => x.toLowerCase());
  if (t.includes("trek") || tags.includes("trekking")) return "Trek";
  if (t.includes("road") || tags.includes("road trip")) return "Road Trip";
  if (t.includes("pilgrimage")) return "Pilgrimage";
  if (t.includes("wildlife") || t.includes("safari")) return "Wildlife";
  if (t.includes("beach") || t.includes("coastal")) return "Coastal";
  if (t.includes("heritage") || t.includes("culture")) return "Heritage";
  return trip.tripType ?? "Adventure";
}

function getSeasonBadge(trip: Trip) {
  const m = (trip.bestSuggestedMonth ?? "").toLowerCase();
  if (/jun|jul|aug|sep/.test(m)) return { text: "Monsoon", bg: "rgba(30,58,95,0.85)", color: "#fff" };
  if (/oct|nov|dec/.test(m)) return { text: "Autumn", bg: "rgba(107,66,38,0.85)", color: "#fff" };
  if (/jan|feb|mar/.test(m)) return { text: "Winter", bg: "rgba(44,62,80,0.85)", color: "#fff" };
  if (/apr|may/.test(m)) return { text: "Summer", bg: "rgba(212,95,17,0.85)", color: "#fff" };
  return { text: "Year Round", bg: "rgba(232,226,213,0.9)", color: "#1b130d" };
}

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
];

const MAX_CARDS = 6;

// ── Icons ─────────────────────────────────────────────────────────────────────
function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 256 256" width={size}>
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
  );
}
function Clock() {
  return (
    <svg fill="currentColor" height={13} viewBox="0 0 256 256" width={13}>
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HomepageFilters({ allTrips, tripCount }: { allTrips: Trip[]; tripCount: number }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filterCounts = useMemo(() => {
    const map = {} as Record<FilterKey, number>;
    for (const cat of FILTER_CATEGORIES) {
      map[cat.key] = cat.key === "all"
        ? allTrips.length
        : allTrips.filter((t) => matchesFilter(t, cat.key)).length;
    }
    return map;
  }, [allTrips]);

  const visibleTrips = useMemo(
    () => allTrips.filter((t) => matchesFilter(t, activeFilter)).slice(0, MAX_CARDS),
    [allTrips, activeFilter]
  );

  const activeLabel = FILTER_CATEGORIES.find((c) => c.key === activeFilter)?.label ?? "";

  return (
    <div style={{ padding: "0 1.5rem" }}>
      {/* ── Filter Bar + View All ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingBottom: "2px",
            flexWrap: "nowrap",
          }}
          id="trail-filter-container"
        >
          {FILTER_CATEGORIES.map((cat) => {
            const active = activeFilter === cat.key;
            const count = filterCounts[cat.key];
            return (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                aria-pressed={active}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.875rem",
                  fontWeight: active ? 600 : 400,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  background: active ? "#6366f1" : "#e8eaf0",
                  color: active ? "#fff" : "#1b130d",
                  transition: "all 0.15s ease",
                  boxShadow: active ? "0 2px 10px rgba(200,90,23,0.3)" : "0 1px 4px rgba(0,0,0,0.06)",
                  border: active ? "none" : "1px solid rgba(99,102,241,0.15)",
                }}
              >
                {cat.label}
                {count > 0 && (
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      background: active ? "rgba(255,255,255,0.2)" : "#e8eaf0",
                      color: active ? "#fff" : "#7c3aed",
                      borderRadius: "9999px",
                      padding: "0.1rem 0.45rem",
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <Link
          href="/trips"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "#6366f1",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          View all {tripCount} itineraries <Arrow size={16} />
        </Link>
      </div>

      {/* ── Section Header ── */}
      <div style={{ marginBottom: "1.25rem" }}>
        <h2
          style={{
            margin: "0 0 0.25rem",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1e1b4b",
            letterSpacing: "-0.015em",
            fontFamily: "'Source Serif 4', Georgia, serif",
          }}
        >
          Featured Expeditions &amp; Road Trips
        </h2>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#4B5563" }}>
          {activeFilter === "all"
            ? "Tested overland routes and self-supported hiking expeditions across India"
            : `${visibleTrips.length} of ${filterCounts[activeFilter]} ${activeLabel} trips`}
        </p>
      </div>

      {/* ── Cards Grid ── */}
      {visibleTrips.length === 0 ? (
        <div style={{ padding: "3rem 0", textAlign: "center" }}>
          <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1e1b4b", margin: "0 0 0.5rem" }}>
            No {activeLabel} trips found
          </p>
          <button
            onClick={() => setActiveFilter("all")}
            style={{
              color: "#6366f1",
              fontWeight: 700,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.875rem",
              padding: 0,
            }}
          >
            View all trips →
          </button>
        </div>
      ) : (
        <div className="expedition-grid" style={{ marginBottom: "1.5rem" }}>
          {visibleTrips.map((trip, idx) => {
            const typeBadge = getTypeBadge(trip);
            const seasonBadge = getSeasonBadge(trip);
            const days = trip.itinerary?.length ?? 0;
            const readTime = trip.readingTime ?? Math.max(5, days * 2);
            const imgSrc = PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];

            return (
              <div
                key={trip._id}
                className="expedition-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#e8eaf0",
                  borderRadius: "16px",
                  border: "none",
                  overflow: "hidden",
                  transition: "box-shadow 0.25s ease, transform 0.2s ease",
                  boxShadow: "6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(255,255,255,0.60)",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 18px rgba(0,0,0,0.10), -8px -8px 18px rgba(255,255,255,0.65)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(255,255,255,0.60)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "220px", flexShrink: 0, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={trip.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    className="card-img"
                    loading={idx < 3 ? "eager" : "lazy"}
                  />
                  {/* Type badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      background: "rgba(24,40,30,0.82)",
                      backdropFilter: "blur(6px)",
                      padding: "0.3rem 0.7rem",
                      borderRadius: "0.4rem",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {typeBadge}
                  </span>
                  {/* Season badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      background: seasonBadge.bg,
                      color: seasonBadge.color,
                      backdropFilter: "blur(6px)",
                      padding: "0.3rem 0.7rem",
                      borderRadius: "0.4rem",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {seasonBadge.text}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.75rem",
                      color: "#7c3aed",
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {days > 0 && (
                      <>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Clock /> {days} Day{days !== 1 ? "s" : ""}
                        </span>
                        <span>•</span>
                      </>
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Clock /> {readTime} min read
                    </span>
                    {trip.totalBudget && (
                      <>
                        <span>•</span>
                        <span>₹{trip.totalBudget.toLocaleString("en-IN")}</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      margin: "0 0 0.5rem",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#1e1b4b",
                      lineHeight: 1.35,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                      fontFamily: "'Source Serif 4', Georgia, serif",
                    }}
                  >
                    {trip.title}
                  </h3>

                  {/* Excerpt */}
                  {trip.excerpt && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.8125rem",
                        color: "#4B5563",
                        lineHeight: 1.65,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {trip.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {(trip.tags?.length ?? 0) > 0 && (
                    <div style={{ display: "flex", gap: "0.375rem", marginTop: "auto", flexWrap: "wrap", paddingTop: "0.5rem" }}>
                      {trip.tags!.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 500,
                            color: "#7c3aed",
                            background: "#e8eaf0",
                            borderRadius: "0.25rem",
                            padding: "0.15rem 0.5rem",
                            border: "1px solid rgba(99,102,241,0.15)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div
                    style={{
                      marginTop: "1rem",
                      paddingTop: "0.875rem",
                      borderTop: "1px solid #f3ece7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        color: "#4B5563",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {trip.country ?? "India"}
                    </span>
                    <Link
                      href={`/trips/${trip.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "#6366f1",
                        textDecoration: "none",
                      }}
                    >
                      Read Guide <Arrow size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .expedition-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .expedition-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 600px) {
          .expedition-grid {
            grid-template-columns: 1fr;
          }
        }
        .expedition-card:hover .card-img {
          transform: scale(1.05);
        }
        #trail-filter-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
