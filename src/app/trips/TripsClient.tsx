"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, TrendingUp, Clock } from "lucide-react";
import TripCard from "@/components/ui/TripCard";
import type { Trip } from "@/lib/types";

const ALL_TAGS = [
  "Adventure", "Budget", "Solo", "Culture", "Food",
  "Trekking", "Beach", "Mountains", "Heritage", "Family",
];

const REGIONS: { label: string; tags: string[]; countries?: string[] }[] = [
  { label: "Himalayas", tags: ["Himalayas", "Spiti Valley", "Ladakh", "Himachal", "Uttarakhand", "High Altitude"] },
  { label: "South India", tags: ["South India", "Kerala", "Karnataka", "Tamil Nadu", "Mysore", "Ooty", "Coorg", "Wayanad"], countries: ["India"] },
  { label: "Rajasthan / Desert", tags: ["Rajasthan", "Desert", "Jaisalmer", "Udaipur", "Jodhpur", "Jaipur"] },
  { label: "Coastal", tags: ["Beach", "Goa", "Coastal", "Beaches", "Konkan", "Mangalore"] },
  { label: "Northeast India", tags: ["Northeast", "Meghalaya", "Arunachal", "Nagaland", "Assam", "Sikkim"] },
];

const DURATION_OPTIONS: { label: string; min: number; max: number }[] = [
  { label: "Any", min: 0, max: Infinity },
  { label: "1–3 days", min: 1, max: 3 },
  { label: "4–7 days", min: 4, max: 7 },
  { label: "8–14 days", min: 8, max: 14 },
  { label: "15+ days", min: 15, max: Infinity },
];

const BUDGET_OPTIONS: { label: string; min: number; max: number }[] = [
  { label: "Any", min: 0, max: Infinity },
  { label: "Under ₹20k", min: 0, max: 20000 },
  { label: "₹20k–₹50k", min: 20000, max: 50000 },
  { label: "₹50k–₹1L", min: 50000, max: 100000 },
  { label: "₹1L+", min: 100000, max: Infinity },
];

function computeDuration(trip: Trip): number | null {
  if (!trip.startDate || !trip.endDate) return null;
  return (
    Math.ceil(
      (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1
  );
}

interface TripsClientProps {
  trips: Trip[];
}

export default function TripsClient({ trips }: TripsClientProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "views" | "title">("date");
  const [showFilters, setShowFilters] = useState(false);
  const [durationIdx, setDurationIdx] = useState(0); // index into DURATION_OPTIONS
  const [budgetIdx, setBudgetIdx] = useState(0);     // index into BUDGET_OPTIONS
  const [regionLabel, setRegionLabel] = useState("Any");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedTags([]);
    setSortBy("date");
    setDurationIdx(0);
    setBudgetIdx(0);
    setRegionLabel("Any");
  };

  const filtered = useMemo(() => {
    let result = [...trips];

    // Keyword filter
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.excerpt?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q)) ||
          t.country?.toLowerCase().includes(q)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter((t) =>
        selectedTags.every((tag) => t.tags?.includes(tag))
      );
    }

    // Duration filter
    const dur = DURATION_OPTIONS[durationIdx];
    if (dur.min > 0 || dur.max < Infinity) {
      result = result.filter((t) => {
        const d = computeDuration(t);
        if (d === null) return false;
        return d >= dur.min && d <= dur.max;
      });
    }

    // Budget filter
    const bud = BUDGET_OPTIONS[budgetIdx];
    if (bud.min > 0 || bud.max < Infinity) {
      result = result.filter((t) => {
        if (t.totalBudget === undefined || t.totalBudget === null) return false;
        return t.totalBudget >= bud.min && t.totalBudget <= bud.max;
      });
    }

    // Region filter
    if (regionLabel !== "Any") {
      const region = REGIONS.find((r) => r.label === regionLabel);
      if (region) {
        result = result.filter((t) =>
          region.tags.some((rtag) =>
            t.tags?.some((ttag) =>
              ttag.toLowerCase().includes(rtag.toLowerCase())
            )
          )
        );
      }
    }

    // Sort
    if (sortBy === "date") {
      result.sort(
        (a, b) =>
          new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
      );
    } else if (sortBy === "views") {
      result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [trips, query, selectedTags, sortBy, durationIdx, budgetIdx, regionLabel]);

  const hasActiveFilters =
    query ||
    selectedTags.length > 0 ||
    durationIdx > 0 ||
    budgetIdx > 0 ||
    regionLabel !== "Any";

  const mostPopular = [...trips]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 3);

  const activeFilterCount =
    selectedTags.length +
    (durationIdx > 0 ? 1 : 0) +
    (budgetIdx > 0 ? 1 : 0) +
    (regionLabel !== "Any" ? 1 : 0);

  return (
    <div>
      {/* ── Search + Filter Bar ── */}
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
            <div className="trips-search-wrap">
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
                placeholder="Search destinations, tags, countries…"
                id="trips-search-input"
                style={{
                  width: "100%",
                  padding: "0.7rem 0.875rem 0.7rem 2.5rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                  transition: "border-color var(--transition)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--border-accent)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--border)")
                }
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters((s) => !s)}
              id="filter-toggle-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.7rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid",
                borderColor: showFilters ? "var(--border-accent)" : "var(--border)",
                background: showFilters ? "var(--accent-gold-dim)" : "var(--bg-card)",
                color: showFilters ? "var(--accent-gold)" : "var(--text-secondary)",
                fontSize: "0.875rem",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                transition: "all var(--transition)",
                whiteSpace: "nowrap",
              }}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span
                  style={{
                    background: "var(--accent-gold)",
                    color: "var(--bg-primary)",
                    borderRadius: "100px",
                    padding: "0 5px",
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
              style={{
                padding: "0.7rem 1rem",
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

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <X size={13} />
                Clear all
              </button>
            )}
          </div>

          {/* ── Expanded Filter Panel ── */}
          {showFilters && (
            <div
              style={{
                marginTop: "1rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid var(--border)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {/* Tags */}
              <div>
                <div style={labelStyle}>Tags</div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {ALL_TAGS.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        style={pillStyle(active)}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration */}
              <div>
                <div style={labelStyle}>Duration</div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {DURATION_OPTIONS.map((opt, idx) => {
                    const active = durationIdx === idx;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setDurationIdx(idx)}
                        id={`duration-filter-${idx}`}
                        style={pillStyle(active)}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget */}
              <div>
                <div style={labelStyle}>Budget</div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {BUDGET_OPTIONS.map((opt, idx) => {
                    const active = budgetIdx === idx;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setBudgetIdx(idx)}
                        id={`budget-filter-${idx}`}
                        style={pillStyle(active)}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Region */}
              <div>
                <div style={labelStyle}>Region</div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {[{ label: "Any" }, ...REGIONS].map((r) => {
                    const active = regionLabel === r.label;
                    return (
                      <button
                        key={r.label}
                        onClick={() => setRegionLabel(r.label)}
                        id={`region-filter-${r.label.toLowerCase().replace(/\s/g, "-")}`}
                        style={pillStyle(active)}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
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
              {mostPopular.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
          </div>
        )}

        {/* Results header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          {hasActiveFilters && (
            <div
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              {filtered.length > 0
                ? `${filtered.length} trip${filtered.length !== 1 ? "s" : ""} found`
                : "No trips match your filters"}
            </div>
          )}
          {!hasActiveFilters && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <Clock size={13} />
              All Trips
            </div>
          )}
        </div>

        {/* Trip Grid */}
        {filtered.length > 0 ? (
          <div className="trip-grid">
            {filtered.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              color: "var(--text-muted)",
            }}
          >
            <Search
              size={40}
              style={{ margin: "0 auto 1rem", opacity: 0.4 }}
            />
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
              No trips found
            </h3>
            <p style={{ fontSize: "0.9rem", maxWidth: 360, margin: "0 auto 1.5rem" }}>
              Try a different search term or adjust your filters.
            </p>
            <button onClick={clearFilters} className="btn btn-outline">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Shared micro-styles ──

const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--text-muted)",
  marginBottom: "0.5rem",
  fontWeight: 600,
};

function pillStyle(active: boolean): React.CSSProperties {
  return {
    padding: "0.3rem 0.75rem",
    borderRadius: "100px",
    border: "1px solid",
    borderColor: active ? "var(--border-accent)" : "var(--border)",
    background: active ? "var(--accent-gold-dim)" : "var(--bg-card)",
    color: active ? "var(--accent-gold)" : "var(--text-secondary)",
    fontSize: "0.8rem",
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    transition: "all var(--transition)",
    fontWeight: active ? 600 : 400,
  };
}
