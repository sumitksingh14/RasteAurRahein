"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  TrendingUp,
  Clock,
  Grid2X2,
  MapIcon,
  Compass,
  RotateCcw,
} from "lucide-react";
import TripCard from "@/components/ui/TripCard";
import type { Trip } from "@/lib/types";
import { REGIONS, filterTripsByRegion } from "@/lib/regions";
import dynamic from "next/dynamic";

const TripsMapExplorer = dynamic(() => import("@/components/ui/TripsMapExplorer"), {
  ssr: false,
  loading: () => (
    <div className="skeleton" style={{ height: 520, borderRadius: "var(--radius-md)" }} />
  ),
});

// ── Type Options (Faceted) ───────────────────────────────────────────────────
export interface TypeOption {
  label: string;
  value: string;
  keywords: string[];
}

export const TYPE_OPTIONS: TypeOption[] = [
  { label: "All Types", value: "all", keywords: [] },
  {
    label: "Road Trips",
    value: "road-trips",
    keywords: ["road trip", "road", "drive", "highway", "motorcycle", "bike", "overland", "pass"],
  },
  {
    label: "Treks",
    value: "treks",
    keywords: ["trek", "trekking", "hike", "hiking", "high altitude", "summit", "trail"],
  },
  {
    label: "Heritage",
    value: "heritage",
    keywords: ["heritage", "culture", "historical", "temple", "monastery", "palace", "fort", "pilgrimage"],
  },
  {
    label: "Coastal",
    value: "coastal",
    keywords: ["coastal", "beach", "sea", "ocean", "island", "backwaters", "konkan"],
  },
  {
    label: "Mountains",
    value: "mountains",
    keywords: ["mountain", "mountains", "himalaya", "valley", "spiti", "ladakh", "zanskar", "leh"],
  },
  {
    label: "Adventure",
    value: "adventure",
    keywords: ["adventure", "expedition", "wildlife", "safari", "camping", "rafting"],
  },
];

// ── Season Options ───────────────────────────────────────────────────────────
export const SEASON_OPTIONS = [
  { label: "All Seasons", value: "Any" },
  { label: "Monsoon", value: "Monsoon" },
  { label: "Autumn/Winter", value: "Autumn/Winter" },
  { label: "Summer", value: "Summer" },
  { label: "Spring", value: "Spring" },
];

const DIFFICULTY_OPTIONS = ["Any", "Easy", "Moderate", "Hard"] as const;
type Difficulty = (typeof DIFFICULTY_OPTIONS)[number];

const MONTH_NAMES: Record<string, number> = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

const SEASON_MONTHS: Record<string, number[]> = {
  Summer: [3, 4, 5, 6],
  Monsoon: [6, 7, 8, 9],
  Autumn: [9, 10, 11],
  Winter: [11, 12, 1, 2, 3],
  Spring: [2, 3, 4],
};

function checkSingleSeason(trip: Trip, seasonName: string): boolean {
  const months = SEASON_MONTHS[seasonName];
  if (!months) return true;

  if (trip.tags?.some((t) => t.toLowerCase() === seasonName.toLowerCase())) {
    return true;
  }

  if (trip.bestSuggestedMonth) {
    const text = trip.bestSuggestedMonth.toLowerCase();
    if (text.includes(seasonName.toLowerCase())) return true;

    const foundMonths: number[] = [];
    const rangeRegex = /([a-z]+)\s*(?:[\u2013\u2014\-–—]|to)\s*([a-z]+)/gi;
    let match;
    while ((match = rangeRegex.exec(text)) !== null) {
      const startM = MONTH_NAMES[match[1].toLowerCase()];
      const endM = MONTH_NAMES[match[2].toLowerCase()];
      if (startM && endM) {
        let curr = startM;
        let count = 0;
        while (count < 12) {
          foundMonths.push(curr);
          if (curr === endM) break;
          curr = curr === 12 ? 1 : curr + 1;
          count++;
        }
      }
    }

    const words = text.match(/[a-z]+/g) || [];
    for (const w of words) {
      const m = MONTH_NAMES[w];
      if (m) foundMonths.push(m);
    }

    if (foundMonths.some((m) => months.includes(m))) {
      return true;
    }
  }

  if (trip.startDate) {
    const d = new Date(trip.startDate);
    if (!isNaN(d.getTime())) {
      const m = d.getMonth() + 1;
      if (months.includes(m)) return true;
    }
  }

  return false;
}

function tripMatchesSeason(trip: Trip, targetSeason: string): boolean {
  if (!targetSeason || targetSeason === "Any") return true;
  if (targetSeason === "Autumn/Winter") {
    return checkSingleSeason(trip, "Autumn") || checkSingleSeason(trip, "Winter");
  }
  return checkSingleSeason(trip, targetSeason);
}

function tripMatchesType(trip: Trip, typeValue: string): boolean {
  if (!typeValue || typeValue === "all") return true;
  const opt = TYPE_OPTIONS.find((o) => o.value === typeValue);
  if (!opt || opt.keywords.length === 0) return true;

  const typeLower = (trip.tripType || "").toLowerCase();
  const tagsLower = (trip.tags || []).map((t) => t.toLowerCase());
  const titleLower = trip.title.toLowerCase();

  return opt.keywords.some(
    (kw) =>
      typeLower.includes(kw) ||
      tagsLower.some((t) => t.includes(kw)) ||
      titleLower.includes(kw)
  );
}

function computeDuration(trip: Trip): number | null {
  if (trip.quickFacts?.durationDays) return trip.quickFacts.durationDays;
  if (trip.startDate && trip.endDate) {
    return (
      Math.ceil(
        (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    );
  }
  return trip.itinerary?.length || null;
}

function inferDifficulty(trip: Trip): Difficulty {
  if (trip.difficulty) return trip.difficulty;
  const tags = (trip.tags || []).map((t) => t.toLowerCase());
  const type = (trip.tripType || "").toLowerCase();
  const hardKeywords = [
    "trek",
    "trekking",
    "adventure",
    "high altitude",
    "ladakh",
    "spiti",
    "himalaya",
    "mountaineering",
    "glacier",
  ];
  const easyKeywords = ["beach", "family", "culture", "pilgrimage", "heritage", "food", "relaxation"];
  if (hardKeywords.some((kw) => tags.includes(kw) || type.includes(kw))) return "Hard";
  if (easyKeywords.some((kw) => tags.includes(kw) || type.includes(kw))) return "Easy";
  return "Moderate";
}

interface TripsClientProps {
  trips: Trip[];
  initialQuery?: string;
  initialType?: string;
  initialTag?: string;
  initialSeason?: string;
  initialMaxDays?: number;
  initialMaxBudget?: number;
  initialDurationIdx?: number;
  initialBudgetIdx?: number;
  initialRegion?: string;
  initialSortBy?: "date" | "views" | "title";
  initialDifficulty?: Difficulty;
}

export default function TripsClient({
  trips,
  initialQuery = "",
  initialType = "all",
  initialTag = "",
  initialSeason = "Any",
  initialMaxDays = 21,
  initialMaxBudget = 150000,
  initialRegion = "Any",
  initialSortBy = "date",
  initialDifficulty = "Any" as Difficulty,
}: TripsClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<string>(initialType || "all");
  const [season, setSeason] = useState(initialSeason || "Any");
  const [maxDays, setMaxDays] = useState(initialMaxDays ?? 21);
  const [maxBudget, setMaxBudget] = useState(initialMaxBudget ?? 150000);
  const [regionLabel, setRegionLabel] = useState(initialRegion || "Any");
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [sortBy, setSortBy] = useState<"date" | "views" | "title">(initialSortBy);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const isFirstMount = useRef(true);

  // Synchronize filter state changes with URL query string
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query.trim());
    if (selectedType && selectedType !== "all") params.set("type", selectedType);
    if (season && season !== "Any") params.set("season", season);
    if (maxDays < 21) params.set("days", String(maxDays));
    if (maxBudget < 150000) params.set("budget", String(maxBudget));
    if (regionLabel && regionLabel !== "Any") params.set("region", regionLabel);
    if (difficulty && difficulty !== "Any") params.set("difficulty", difficulty);
    if (sortBy && sortBy !== "date") params.set("sortBy", sortBy);
    if (viewMode === "map") params.set("view", "map");

    const queryString = params.toString();
    const newUrl = queryString ? `/trips?${queryString}` : "/trips";
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", newUrl);
    }
  }, [query, selectedType, season, maxDays, maxBudget, regionLabel, difficulty, sortBy, viewMode]);

  const clearFilters = () => {
    setQuery("");
    setSelectedType("all");
    setSeason("Any");
    setMaxDays(21);
    setMaxBudget(150000);
    setRegionLabel("Any");
    setDifficulty("Any");
    setSortBy("date");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    router.replace("/trips", { scroll: false });
  };

  // Helper matching functions
  const matchesQuery = (t: Trip, q: string) => {
    if (!q.trim()) return true;
    const lq = q.toLowerCase();
    return (
      t.title.toLowerCase().includes(lq) ||
      t.excerpt?.toLowerCase().includes(lq) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(lq)) ||
      t.country?.toLowerCase().includes(lq) ||
      t.quickFacts?.baseLocation?.toLowerCase().includes(lq)
    );
  };

  const matchesDuration = (t: Trip, maxD: number) => {
    if (maxD >= 21) return true;
    const d = computeDuration(t);
    return d !== null && d <= maxD;
  };

  const matchesBudget = (t: Trip, maxB: number) => {
    if (maxB >= 150000) return true;
    if (t.totalBudget === undefined || t.totalBudget === null) return false;
    return t.totalBudget <= maxB;
  };

  const matchesRegion = (t: Trip, rLabel: string) => {
    if (rLabel === "Any") return true;
    const reg = REGIONS.find((r) => r.label === rLabel);
    return reg ? filterTripsByRegion([t], reg).length > 0 : true;
  };

  const matchesDifficultyFilter = (t: Trip, diff: Difficulty) => {
    if (diff === "Any") return true;
    return inferDifficulty(t) === diff;
  };

  // ── Dynamic counts per chip based on the current other filters ─────────────
  const typeCounts = useMemo(() => {
    // Other active filters excluding Type
    const base = trips.filter(
      (t) =>
        matchesQuery(t, query) &&
        tripMatchesSeason(t, season) &&
        matchesDuration(t, maxDays) &&
        matchesBudget(t, maxBudget) &&
        matchesRegion(t, regionLabel) &&
        matchesDifficultyFilter(t, difficulty)
    );
    const counts: Record<string, number> = {};
    for (const opt of TYPE_OPTIONS) {
      counts[opt.value] =
        opt.value === "all" ? base.length : base.filter((t) => tripMatchesType(t, opt.value)).length;
    }
    return counts;
  }, [trips, query, season, maxDays, maxBudget, regionLabel, difficulty]);

  const seasonCounts = useMemo(() => {
    // Other active filters excluding Season
    const base = trips.filter(
      (t) =>
        matchesQuery(t, query) &&
        tripMatchesType(t, selectedType) &&
        matchesDuration(t, maxDays) &&
        matchesBudget(t, maxBudget) &&
        matchesRegion(t, regionLabel) &&
        matchesDifficultyFilter(t, difficulty)
    );
    const counts: Record<string, number> = {};
    for (const opt of SEASON_OPTIONS) {
      counts[opt.value] =
        opt.value === "Any" ? base.length : base.filter((t) => tripMatchesSeason(t, opt.value)).length;
    }
    return counts;
  }, [trips, query, selectedType, maxDays, maxBudget, regionLabel, difficulty]);

  // ── Filtered Trips ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = trips.filter(
      (t) =>
        matchesQuery(t, query) &&
        tripMatchesType(t, selectedType) &&
        tripMatchesSeason(t, season) &&
        matchesDuration(t, maxDays) &&
        matchesBudget(t, maxBudget) &&
        matchesRegion(t, regionLabel) &&
        matchesDifficultyFilter(t, difficulty)
    );

    if (sortBy === "date") {
      result.sort(
        (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
      );
    } else if (sortBy === "views") {
      result.sort((a, b) => (b.likes || b.viewCount || 0) - (a.likes || a.viewCount || 0));
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [trips, query, selectedType, season, maxDays, maxBudget, regionLabel, difficulty, sortBy]);

  const hasActiveFilters =
    Boolean(query) ||
    selectedType !== "all" ||
    (season !== "Any" && Boolean(season)) ||
    maxDays < 21 ||
    maxBudget < 150000 ||
    regionLabel !== "Any" ||
    difficulty !== "Any";

  const mostPopular = useMemo(() => {
    return [...trips]
      .sort((a, b) => (b.likes || b.viewCount || 0) - (a.likes || a.viewCount || 0))
      .slice(0, 3);
  }, [trips]);

  const activeFilterCount =
    (selectedType !== "all" ? 1 : 0) +
    (season !== "Any" && Boolean(season) ? 1 : 0) +
    (maxDays < 21 ? 1 : 0) +
    (maxBudget < 150000 ? 1 : 0) +
    (regionLabel !== "Any" ? 1 : 0) +
    (difficulty !== "Any" ? 1 : 0) +
    (query.trim() ? 1 : 0);

  return (
    <div>
      {/* ── Search + Filter Bar ────────────────────────────────────── */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          padding: "1.25rem 0",
          position: "sticky",
          top: "var(--nav-height)",
          zIndex: 100,
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Search input */}
            <div className="trips-search-wrap" style={{ flex: "1 1 240px", position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, tags, routes..."
                id="trips-search-input"
                aria-label="Search destinations"
                style={{
                  width: "100%",
                  padding: "0.65rem 0.875rem 0.65rem 2.5rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                }}
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters((s) => !s)}
              id="filter-toggle-btn"
              aria-label="Toggle advanced filters"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid",
                borderColor: showFilters || activeFilterCount > 0 ? "var(--border-accent)" : "var(--border)",
                background: showFilters ? "var(--accent-gold-dim)" : "var(--bg-card)",
                color: showFilters ? "var(--accent-gold)" : "var(--text-secondary)",
                fontSize: "0.875rem",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                whiteSpace: "nowrap",
              }}
            >
              <SlidersHorizontal size={15} />
              <span>Sliders &amp; More</span>
              {activeFilterCount > 0 && (
                <span
                  style={{
                    background: "var(--accent-gold)",
                    color: "var(--bg-primary)",
                    borderRadius: "100px",
                    padding: "0 6px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    minWidth: 18,
                    textAlign: "center",
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "views" | "title")}
              id="trips-sort-select"
              aria-label="Sort trips"
              style={{
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="date">Latest</option>
              <option value="views">Most Popular</option>
              <option value="title">A–Z</option>
            </select>

            {/* Grid / Map toggle */}
            <div
              style={{
                display: "flex",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {(["grid", "map"] as const).map((mode) => (
                <button
                  key={mode}
                  id={`view-${mode}-btn`}
                  onClick={() => setViewMode(mode)}
                  title={mode === "grid" ? "Grid view" : "Map view"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "0.6rem 0.85rem",
                    background: viewMode === mode ? "var(--accent-gold-dim)" : "var(--bg-card)",
                    color: viewMode === mode ? "var(--accent-gold)" : "var(--text-muted)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {mode === "grid" ? <Grid2X2 size={14} /> : <MapIcon size={14} />}
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-sans)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <RotateCcw size={13} />
                Clear all
              </button>
            )}
          </div>

          {/* ── FILTER GROUP 1: TYPE CHIPS (Dynamic Counts) ──────────── */}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              overflowX: "auto",
              scrollbarWidth: "none",
              paddingBottom: "2px",
            }}
          >
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                flexShrink: 0,
              }}
            >
              Type:
            </span>
            <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
              {TYPE_OPTIONS.map((opt) => {
                const active = selectedType === opt.value;
                const count = typeCounts[opt.value] ?? 0;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedType(opt.value)}
                    style={chipStyle(active)}
                    aria-pressed={active}
                  >
                    <span>{opt.label}</span>
                    <span style={countBadgeStyle(active)}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── FILTER GROUP 2: SEASON CHIPS (Dynamic Counts) ────────── */}
          <div
            style={{
              marginTop: "0.625rem",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              overflowX: "auto",
              scrollbarWidth: "none",
              paddingBottom: "2px",
            }}
          >
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                flexShrink: 0,
              }}
            >
              Season:
            </span>
            <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
              {SEASON_OPTIONS.map((opt) => {
                const active = season === opt.value;
                const count = seasonCounts[opt.value] ?? 0;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSeason(opt.value)}
                    style={chipStyle(active)}
                    aria-pressed={active}
                  >
                    <span>{opt.label}</span>
                    <span style={countBadgeStyle(active)}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── EXPANDED SLIDERS & ADVANCED CONTROLS ──────────────────── */}
          {showFilters && (
            <div
              style={{
                marginTop: "1rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid var(--border)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
                gap: "1.5rem",
                background: "var(--bg-card)",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Duration Slider */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={labelStyle}>Duration</span>
                  <span style={{ fontWeight: 700, color: "var(--accent-gold)", fontSize: "0.8125rem" }}>
                    {maxDays < 21 ? `Up to ${maxDays} days` : "Any (unlimited)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="21"
                  step="1"
                  value={maxDays}
                  onChange={(e) => setMaxDays(Number(e.target.value))}
                  aria-label="Maximum days"
                  style={{ width: "100%", accentColor: "var(--accent-gold)", cursor: "pointer" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.6875rem",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  <span>1 day</span>
                  <span>7 days</span>
                  <span>14 days</span>
                  <span>21+ days</span>
                </div>
              </div>

              {/* Budget Slider */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={labelStyle}>Budget</span>
                  <span style={{ fontWeight: 700, color: "var(--accent-gold)", fontSize: "0.8125rem" }}>
                    {maxBudget < 150000
                      ? `Up to ₹${maxBudget.toLocaleString("en-IN")}`
                      : "Any (unlimited)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  aria-label="Maximum budget"
                  style={{ width: "100%", accentColor: "var(--accent-gold)", cursor: "pointer" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.6875rem",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  <span>₹10k</span>
                  <span>₹50k</span>
                  <span>₹1L</span>
                  <span>₹1.5L+</span>
                </div>
              </div>

              {/* Region */}
              <div>
                <div style={labelStyle}>Region</div>
                <select
                  value={regionLabel}
                  onChange={(e) => setRegionLabel(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.8125rem",
                    outline: "none",
                  }}
                >
                  <option value="Any">All Regions</option>
                  {REGIONS.map((r) => (
                    <option key={r.label} value={r.label}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <div style={labelStyle}>Difficulty</div>
                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                  {DIFFICULTY_OPTIONS.map((opt) => {
                    const active = difficulty === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setDifficulty(opt)}
                        style={chipStyle(active)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Container ─────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
        {/* Map view */}
        {viewMode === "map" && <TripsMapExplorer trips={filtered} />}

        {/* Grid view */}
        {viewMode === "grid" && (
          <>
            {/* Most Popular strip */}
            {sortBy === "date" && !hasActiveFilters && mostPopular.length > 0 && (
              <div style={{ marginBottom: "3rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "1.25rem",
                    color: "var(--accent-gold)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  <TrendingUp size={15} />
                  Most Popular
                </div>
                <div className="trip-grid">
                  {mostPopular.map((trip, idx) => (
                    <TripCard
                      key={trip._id}
                      trip={trip}
                      priority={idx < 2}
                      loading={idx < 2 ? "eager" : "lazy"}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Results header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.8125rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  fontWeight: 600,
                }}
              >
                {hasActiveFilters
                  ? `${filtered.length} trip${filtered.length !== 1 ? "s" : ""} found`
                  : `All Trips (${trips.length})`}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "none",
                    border: "none",
                    color: "var(--accent-gold)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <X size={13} />
                  Reset filters
                </button>
              )}
            </div>

            {/* Trip Grid */}
            {filtered.length > 0 && (
              <div className="trip-grid">
                {filtered.map((trip, idx) => {
                  const isAboveFold = hasActiveFilters && idx < 2;
                  return (
                    <TripCard
                      key={trip._id}
                      trip={trip}
                      priority={isAboveFold}
                      loading={isAboveFold ? "eager" : "lazy"}
                    />
                  );
                })}
              </div>
            )}

            {/* ── Empty State ─────────────────────────────────────────── */}
            {filtered.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "5rem 2rem",
                  background: "var(--bg-card)",
                  borderRadius: "1rem",
                  border: "1px dashed var(--border)",
                  maxWidth: "560px",
                  margin: "1rem auto 3rem",
                }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    background: "var(--accent-gold-dim)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    color: "var(--accent-gold)",
                  }}
                >
                  <Compass size={32} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.375rem",
                    color: "var(--text-primary)",
                    margin: "0 0 0.5rem",
                  }}
                >
                  No trips match your filters
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    margin: "0 0 1.5rem",
                  }}
                >
                  Try broadening your season, increasing maximum duration or budget limits, or clearing the search query.
                </p>
                <button
                  onClick={clearFilters}
                  style={{
                    background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <RotateCcw size={15} />
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Micro Styles ─────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: "0.6875rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--text-muted)",
  marginBottom: "0.375rem",
  fontWeight: 600,
  display: "block",
};

function chipStyle(active: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.3rem 0.75rem",
    borderRadius: "9999px",
    border: "1px solid",
    borderColor: active ? "var(--border-accent)" : "var(--border)",
    background: active ? "var(--accent-gold-dim)" : "var(--bg-card)",
    color: active ? "var(--accent-gold)" : "var(--text-secondary)",
    fontSize: "0.78rem",
    fontWeight: active ? 600 : 400,
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    transition: "all var(--transition)",
    whiteSpace: "nowrap",
  };
}

function countBadgeStyle(active: boolean): React.CSSProperties {
  return {
    fontSize: "0.675rem",
    padding: "0.05rem 0.375rem",
    borderRadius: "9999px",
    background: active ? "rgba(217, 119, 6, 0.22)" : "var(--bg-secondary)",
    color: active ? "var(--accent-gold)" : "var(--text-muted)",
    fontWeight: 700,
  };
}
