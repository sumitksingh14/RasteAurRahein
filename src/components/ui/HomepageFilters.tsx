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
  if (/jun|jul|aug|sep/.test(m)) return { text: "Monsoon", bg: "#1e3a5f", color: "#fff" };
  if (/oct|nov|dec/.test(m)) return { text: "Autumn", bg: "#6b4226", color: "#fff" };
  if (/jan|feb|mar/.test(m)) return { text: "Winter", bg: "#2c3e50", color: "#fff" };
  if (/apr|may/.test(m)) return { text: "Summer", bg: "#d45f11", color: "#fff" };
  return { text: "Year Round", bg: "#e7d9cf", color: "#1b130d" };
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
function CaretDown() {
  return (
    <svg fill="currentColor" height={16} viewBox="0 0 256 256" width={16}>
      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
    </svg>
  );
}
function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 256 256" width={size}>
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
  );
}
function Clock() {
  return (
    <svg fill="currentColor" height={12} viewBox="0 0 256 256" width={12}>
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
    <>
      {/* Filter bar */}
      <div style={{ display: "flex", gap: "0.75rem", padding: "0.75rem 1.5rem", overflowX: "auto", borderBottom: "1px solid rgba(243,236,231,0.6)", scrollbarWidth: "none" }}>
        {FILTER_CATEGORIES.map((cat) => {
          const active = activeFilter === cat.key;
          const count = filterCounts[cat.key];
          return (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              aria-pressed={active}
              style={{
                display: "flex", alignItems: "center", gap: "0.375rem",
                height: "2.25rem", padding: "0 0.75rem 0 1rem",
                borderRadius: "0.75rem", border: "none", cursor: "pointer",
                fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 500,
                whiteSpace: "nowrap", flexShrink: 0,
                background: active ? "#d45f11" : "#f3ece7",
                color: active ? "#fff" : "#1b130d",
                transition: "background 0.15s, color 0.15s",
                boxShadow: active ? "0 2px 8px rgba(212,95,17,0.3)" : "none",
              }}
            >
              {cat.label}
              {count > 0 && (
                <span style={{
                  fontSize: "0.625rem", fontWeight: 700,
                  background: active ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.1)",
                  borderRadius: "9999px", padding: "0.1rem 0.375rem",
                }}>
                  {count}
                </span>
              )}
              <CaretDown />
            </button>
          );
        })}
      </div>

      {/* Section header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "2rem 1.5rem 0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#1b130d", letterSpacing: "-0.015em" }}>
            Featured Expeditions &amp; Road Trips
          </h2>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem", color: "#9a6b4c" }}>
            {activeFilter === "all"
              ? "Tested overland routes and self-supported hiking expeditions across India"
              : `${visibleTrips.length} of ${filterCounts[activeFilter]} ${activeLabel} trips`}
          </p>
        </div>
        <Link href="/trips" style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875rem", fontWeight: 700, color: "#d45f11", textDecoration: "none", whiteSpace: "nowrap" }}>
          View all {tripCount} itineraries <Arrow size={16} />
        </Link>
      </div>

      {/* Cards or empty state */}
      {visibleTrips.length === 0 ? (
        <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1b130d", margin: "0 0 0.5rem" }}>No {activeLabel} trips found</p>
          <button onClick={() => setActiveFilter("all")} style={{ color: "#d45f11", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", padding: 0 }}>
            View all trips →
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", padding: "0.5rem 1.5rem 1rem" }}>
          {visibleTrips.map((trip, idx) => {
            const typeBadge = getTypeBadge(trip);
            const seasonBadge = getSeasonBadge(trip);
            const days = trip.itinerary?.length ?? 0;
            const readTime = trip.readingTime ?? Math.max(5, days * 2);
            const imgSrc = PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];

            return (
              <div key={trip._id} style={{ display: "flex", flexDirection: "column", background: "#fff", borderRadius: "0.75rem", border: "1px solid #e7d9cf", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "200px", flexShrink: 0, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt={trip.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading={idx < 3 ? "eager" : "lazy"} />
                  <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", padding: "0.25rem 0.625rem", borderRadius: "0.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#1b130d", letterSpacing: "0.04em" }}>
                    {typeBadge}
                  </span>
                  <span style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: seasonBadge.bg, color: seasonBadge.color, padding: "0.25rem 0.625rem", borderRadius: "0.5rem", fontSize: "0.7rem", fontWeight: 600 }}>
                    {seasonBadge.text}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Meta */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.7rem", color: "#9a6b4c", fontWeight: 500, marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    {days > 0 && <><span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}><Clock /> {days} Day{days !== 1 ? "s" : ""}</span><span>•</span></>}
                    <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}><Clock /> {readTime} min read</span>
                    {trip.totalBudget && <><span>•</span><span>₹{trip.totalBudget.toLocaleString("en-IN")}</span></>}
                  </div>

                  {/* Title */}
                  <h3 style={{ margin: "0 0 0.4rem", fontSize: "0.9375rem", fontWeight: 700, color: "#1b130d", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                    {trip.title}
                  </h3>

                  {/* Excerpt */}
                  {trip.excerpt && (
                    <p style={{ margin: 0, fontSize: "0.8125rem", color: "#9a6b4c", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                      {trip.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {(trip.tags?.length ?? 0) > 0 && (
                    <div style={{ display: "flex", gap: "0.35rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                      {trip.tags!.slice(0, 3).map((tag) => (
                        <span key={tag} style={{ fontSize: "0.65rem", fontWeight: 500, color: "#9a6b4c", background: "#f8f7f6", borderRadius: "0.25rem", padding: "0.1rem 0.4rem" }}>{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid #f3ece7", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#1b130d", background: "#f8f7f6", padding: "0.25rem 0.625rem", borderRadius: "0.375rem" }}>
                      {trip.country ?? "India"}
                    </span>
                    <Link href={`/trips/${trip.slug}`} style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 700, color: "#d45f11", textDecoration: "none" }}>
                      Read Guide <Arrow size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
