"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, TrendingUp, Clock } from "lucide-react";
import TripCard from "@/components/ui/TripCard";
import type { Trip } from "@/lib/types";

const ALL_TAGS = [
  "Adventure", "Budget", "Solo", "Culture", "Food",
  "Trekking", "Beach", "Mountains", "Heritage", "Family",
];

interface TripsClientProps {
  trips: Trip[];
}

export default function TripsClient({ trips }: TripsClientProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "views" | "title">("date");
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedTags([]);
    setSortBy("date");
  };

  const filtered = useMemo(() => {
    let result = [...trips];

    // Query filter
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
  }, [trips, query, selectedTags, sortBy]);

  const hasActiveFilters =
    query || selectedTags.length > 0;

  const mostPopular = [...trips]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 3);

  return (
    <div>
      {/* Search + Filter Bar */}
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
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
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
              {selectedTags.length > 0 && (
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
                  {selectedTags.length}
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
                Clear
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div
              style={{
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              {/* Tags */}
              <div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                  }}
                >
                  Tags
                </div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {ALL_TAGS.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        style={{
                          padding: "0.3rem 0.75rem",
                          borderRadius: "100px",
                          border: "1px solid",
                          borderColor: active
                            ? "var(--border-accent)"
                            : "var(--border)",
                          background: active
                            ? "var(--accent-gold-dim)"
                            : "var(--bg-card)",
                          color: active
                            ? "var(--accent-gold)"
                            : "var(--text-secondary)",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          fontFamily: "var(--font-sans)",
                          transition: "all var(--transition)",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {tag}
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1rem",
              }}
            >
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
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
              Try a different search term or clear your filters.
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
