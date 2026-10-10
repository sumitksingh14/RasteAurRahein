"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import type { Trip } from "@/lib/types";
import { getTripImage } from "@/lib/data/tripImages";
import { shouldDisplayPublicViewCount } from "@/lib/site-config";
import { getDailyFeaturedTrips } from "@/lib/featured-rotation";

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

const MAX_CARDS = 8;

// ── Icons ─────────────────────────────────────────────────────────────────────
function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 256 256" width={size}>
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
  );
}
function ChevronLeft({ size = 20 }: { size?: number }) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight({ size = 20 }: { size?: number }) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
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
function Eye({ size = 12 }: { size?: number }) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ── Glassy Carousel (single row, scroll snapping, deterministic daily rotation) ─
function GlassyCarousel({ trips }: { trips: Trip[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const total = trips.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const hoverRef = useRef(false);

  /** Return the offsetWidth of one card (first child in the track) */
  const getCardWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return 0;
    const child = track.firstElementChild as HTMLElement;
    const gap = 20; // 1.25rem ≈ 20px
    return child.offsetWidth + gap;
  }, []);

  /** Scroll smoothly to a specific card index */
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, trips.length - 1));
    const cw = getCardWidth();
    track.scrollTo({ left: clamped * cw, behavior: "smooth" });
    setActiveIdx(clamped);
  }, [getCardWidth, trips.length]);

  /** Smooth previous navigation with wrap-around */
  const prev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cw = getCardWidth();
    if (track.scrollLeft <= 10) {
      scrollToIndex(trips.length - 1);
    } else {
      track.scrollBy({ left: -cw, behavior: "smooth" });
    }
  }, [getCardWidth, scrollToIndex, trips.length]);

  /** Smooth next navigation with wrap-around */
  const next = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cw = getCardWidth();
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      scrollToIndex(0);
    } else {
      track.scrollBy({ left: cw, behavior: "smooth" });
    }
  }, [getCardWidth, scrollToIndex]);

  /** Update active index based on current scroll position */
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cw = getCardWidth();
    if (cw === 0) return;
    const newIdx = Math.round(track.scrollLeft / cw);
    setActiveIdx(Math.max(0, Math.min(newIdx, trips.length - 1)));
  }, [getCardWidth, trips.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reset scroll on trips filter change
  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.scrollLeft = 0;
      setActiveIdx(0);
    }
  }, [trips]);

  /** Auto-advance every 5 s, pauses on hover */
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      if (!hoverRef.current) {
        next();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [next, total]);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
    >
      {/* ── Carousel Track ── */}
      <div
        ref={trackRef}
        className="glassy-carousel-track"
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          paddingBottom: "1rem",
          paddingLeft: "0.25rem",
          paddingRight: "0.25rem",
          cursor: "grab",
        }}
      >
        {trips.map((trip, idx) => {
          const typeBadge = getTypeBadge(trip);
          const seasonBadge = getSeasonBadge(trip);
          const days = trip.itinerary?.length ?? 0;
          const readTime = trip.readingTime ?? Math.max(5, days * 2);
          const imgSrc = getTripImage(trip.slug) || PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];
          const isTopRanked = idx === 0;

          return (
            <div
              key={trip._id || trip.slug || idx}
              className="glassy-card"
              style={{
                flex: "0 0 clamp(280px, 80vw, 340px)",
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.09) 100%)",
                backdropFilter: "blur(18px) saturate(160%)",
                WebkitBackdropFilter: "blur(18px) saturate(160%)",
                border: "1px solid rgba(255,255,255,0.30)",
                boxShadow: "0 8px 32px rgba(31,38,135,0.14), inset 0 1px 0 rgba(255,255,255,0.35)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                minHeight: "460px",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px) scale(1.012)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 20px 48px rgba(31,38,135,0.22), inset 0 1px 0 rgba(255,255,255,0.45)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(31,38,135,0.14), inset 0 1px 0 rgba(255,255,255,0.35)";
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "210px", flexShrink: 0, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={trip.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.55s ease",
                  }}
                  className="glassy-card-img"
                  loading={idx < 3 ? "eager" : "lazy"}
                />
                {/* Gradient overlay for glass feel */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Type badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    left: "0.75rem",
                    background: "rgba(14,24,18,0.70)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    padding: "0.28rem 0.7rem",
                    borderRadius: "6px",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "#e2f0d9",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  {typeBadge}
                </span>
                {/* Top Viewed Badge */}
                {isTopRanked && (
                  <span
                    style={{
                      position: "absolute",
                      top: "2.4rem",
                      left: "0.75rem",
                      background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                      color: "#fff",
                      padding: "0.22rem 0.55rem",
                      borderRadius: "6px",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      boxShadow: "0 2px 8px rgba(217,119,6,0.45)",
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    ★ Daily Spotlight
                  </span>
                )}
                {/* Season badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: seasonBadge.bg,
                    color: seasonBadge.color,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    padding: "0.28rem 0.7rem",
                    borderRadius: "6px",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  {seasonBadge.text}
                </span>
                {/* Index pill */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "0.75rem",
                    right: "0.75rem",
                    background: "rgba(99,102,241,0.80)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: "#fff",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                >
                  {idx + 1} / {total}
                </span>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: "1.25rem 1.25rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
                }}
              >
                {/* Meta row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    fontSize: "0.72rem",
                    color: "#7c5cd6",
                    fontWeight: 600,
                    marginBottom: "0.55rem",
                    flexWrap: "wrap",
                  }}
                >
                  {days > 0 && (
                    <>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.22rem" }}>
                        <Clock /> {days} Day{days !== 1 ? "s" : ""}
                      </span>
                      <span style={{ opacity: 0.4 }}>•</span>
                    </>
                  )}
                  <span style={{ display: "flex", alignItems: "center", gap: "0.22rem" }}>
                    <Clock /> {readTime} min read
                  </span>
                  {(trip.quickFacts?.budgetRange || trip.totalBudget) && (
                    <>
                      <span style={{ opacity: 0.4 }}>•</span>
                      <span
                        style={{ color: "#059669", fontWeight: 700 }}
                        title="Estimated budget per person (excl. flights)"
                      >
                        {trip.quickFacts?.budgetRange
                          ? trip.quickFacts.budgetRange
                              .replace(" per person (excl. flights)", " pp")
                              .replace(" per person", " pp")
                          : `₹${trip.totalBudget!.toLocaleString("en-IN")} pp`}
                      </span>
                    </>
                  )}
                  {shouldDisplayPublicViewCount(trip.viewCount) && (
                    <>
                      <span style={{ opacity: 0.4 }}>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.22rem", color: "#d97706", fontWeight: 700 }}>
                        <Eye size={12} /> {trip.viewCount!.toLocaleString()} views
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    margin: "0 0 0.5rem",
                    fontSize: "1.025rem",
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
                      fontSize: "0.8rem",
                      color: "#374151",
                      lineHeight: 1.6,
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
                  <div
                    style={{
                      display: "flex",
                      gap: "0.35rem",
                      marginTop: "auto",
                      flexWrap: "wrap",
                      paddingTop: "0.45rem",
                    }}
                  >
                    {trip.tags!.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          color: "#6d28d9",
                          background: "rgba(109,40,217,0.08)",
                          borderRadius: "4px",
                          padding: "0.15rem 0.5rem",
                          border: "1px solid rgba(109,40,217,0.18)",
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
                    borderTop: "1px solid rgba(99,102,241,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.67rem",
                      fontWeight: 700,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {trip.country ?? "India"}
                  </span>
                  <Link
                    href={`/trips/${trip.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.28rem",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      color: "#6366f1",
                      textDecoration: "none",
                      background: "rgba(99,102,241,0.09)",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(99,102,241,0.18)",
                      transition: "background 0.2s ease",
                    }}
                  >
                    Read Guide <Arrow size={13} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Prev / Next Arrows (always enabled — infinite loop) ── */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous expedition"
            className="carousel-nav-btn carousel-nav-prev"
            style={{
              position: "absolute",
              left: "-16px",
              top: "calc(50% - 3rem)",
              transform: "translateY(-50%)",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "1px solid rgba(99,102,241,0.22)",
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 4px 16px rgba(31,38,135,0.14)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4338ca",
              transition: "all 0.2s ease",
              zIndex: 10,
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            aria-label="Next expedition"
            className="carousel-nav-btn carousel-nav-next"
            style={{
              position: "absolute",
              right: "-16px",
              top: "calc(50% - 3rem)",
              transform: "translateY(-50%)",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "1px solid rgba(99,102,241,0.22)",
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 4px 16px rgba(31,38,135,0.14)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4338ca",
              transition: "all 0.2s ease",
              zIndex: 10,
            }}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* ── Dot indicators ── */}
      {total > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "0.5rem",
            paddingBottom: "0.25rem",
          }}
        >
          {trips.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to expedition ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              style={{
                width: i === activeIdx ? "24px" : "8px",
                height: "8px",
                borderRadius: "9999px",
                border: "none",
                background: i === activeIdx ? "#6366f1" : "rgba(99,102,241,0.25)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HomepageFilters({ allTrips, tripCount }: { allTrips: Trip[]; tripCount: number }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [liveViews, setLiveViews] = useState<Record<string, number>>({});

  // Dynamically fetch latest real-time view counts from Redis API
  useEffect(() => {
    fetch("/api/view-count")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.views && Object.keys(data.views).length > 0) {
          setLiveViews(data.views);
        }
      })
      .catch(() => {});
  }, []);

  // Enrich trips with live view counts
  const enrichedTrips = useMemo(() => {
    if (Object.keys(liveViews).length === 0) return allTrips;
    return allTrips.map((trip) => ({
      ...trip,
      viewCount: liveViews[trip.slug] ?? trip.viewCount ?? 0,
    }));
  }, [allTrips, liveViews]);

  const filterCounts = useMemo(() => {
    const map = {} as Record<FilterKey, number>;
    for (const cat of FILTER_CATEGORIES) {
      map[cat.key] = cat.key === "all"
        ? enrichedTrips.length
        : enrichedTrips.filter((t) => matchesFilter(t, cat.key)).length;
    }
    return map;
  }, [enrichedTrips]);

  // Dynamically compute daily deterministic rotation with regional and seasonal balance
  const visibleTrips = useMemo(() => {
    if (activeFilter === "all") {
      return getDailyFeaturedTrips(enrichedTrips, MAX_CARDS);
    }
    const filtered = enrichedTrips.filter((t) => matchesFilter(t, activeFilter));
    return getDailyFeaturedTrips(filtered, MAX_CARDS);
  }, [enrichedTrips, activeFilter]);

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
                  background: active
                    ? "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)"
                    : "rgba(255,255,255,0.55)",
                  backdropFilter: active ? "none" : "blur(8px)",
                  WebkitBackdropFilter: active ? "none" : "blur(8px)",
                  color: active ? "#fff" : "#1b130d",
                  transition: "all 0.2s ease",
                  boxShadow: active
                    ? "0 4px 14px rgba(99,102,241,0.40)"
                    : "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                  border: active
                    ? "1px solid rgba(255,255,255,0.18)"
                    : "1px solid rgba(99,102,241,0.18)",
                }}
              >
                {cat.label}
                {count > 0 && (
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      background: active ? "rgba(255,255,255,0.22)" : "rgba(99,102,241,0.12)",
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
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e1b4b",
              letterSpacing: "-0.015em",
              fontFamily: "'Source Serif 4', Georgia, serif",
            }}
          >
            Featured Expeditions &amp; Road Trips
          </h2>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.10) 100%)",
              color: "#4338ca",
              padding: "0.2rem 0.6rem",
              borderRadius: "9999px",
              fontSize: "0.7rem",
              fontWeight: 700,
              border: "1px solid rgba(99,102,241,0.22)",
              letterSpacing: "0.02em",
            }}
          >
            ✨ Daily Curated
          </span>
        </div>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#4B5563" }}>
          {activeFilter === "all"
            ? "Daily rotation of self-supported routes, high-altitude treks, and road trips balanced by season and region"
            : `Daily selection of ${visibleTrips.length} ${activeLabel} expeditions`}
        </p>
      </div>

      {/* ── Glassy Carousel / Empty State ── */}
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
            View all trips &#8594;
          </button>
        </div>
      ) : (
        <div style={{ position: "relative", marginBottom: "2rem", padding: "0 8px" }}>
          <GlassyCarousel trips={visibleTrips} />
        </div>
      )}

      <style>{`
        .glassy-carousel-track::-webkit-scrollbar {
          display: none;
        }
        .glassy-carousel-track {
          -webkit-overflow-scrolling: touch;
        }
        .glassy-card:hover .glassy-card-img {
          transform: scale(1.07);
        }
        .carousel-nav-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.92) !important;
          box-shadow: 0 6px 24px rgba(31,38,135,0.22) !important;
          color: #4338ca !important;
        }
        #trail-filter-container::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 600px) {
          .carousel-nav-prev,
          .carousel-nav-next {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
