"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const CATEGORY_CHIPS = ["Treks", "Road Trip", "Destinations", "Itineraries"];

const SEASON_OPTIONS = ["Summer", "Monsoon", "Winter", "Spring", "Autumn"];
const DURATION_OPTIONS = ["1 Week", "2+ Weeks", "Weekend", "3–5 Days"];

export default function HeroSearch() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(CATEGORY_CHIPS[1]);
  const [season, setSeason] = useState(SEASON_OPTIONS[0]);
  const [duration, setDuration] = useState(DURATION_OPTIONS[0]);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.append("query", query.trim());
    const tagMap: Record<string, string> = {
      Treks: "Trekking",
      "Road Trip": "Adventure",
    };
    const mappedTag = tagMap[activeCategory] || activeCategory;
    if (activeCategory !== "Destinations" && activeCategory !== "Itineraries") {
      params.append("tag", mappedTag);
    }
    params.append("season", season);
    router.push(`/trips?${params.toString()}`);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3,
        width: "min(680px, calc(100% - 2rem))",
        overflow: "hidden",
      }}
    >
      {/* "Trip Discovery" label + category chips */}
      <div
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "12px",
          padding: "0.4rem 0.7rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          marginBottom: "0.65rem",
          width: "100%",
          overflow: "hidden",
          flexWrap: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            paddingLeft: "0.25rem",
            whiteSpace: "nowrap",
          }}
        >
          Trip Discovery
        </span>
        <div
          style={{
            width: "1px",
            height: "14px",
            background: "rgba(255,255,255,0.3)",
            flexShrink: 0,
          }}
        />
        {CATEGORY_CHIPS.map((chip) => {
          const isActive = activeCategory === chip;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveCategory(chip)}
              style={{
                border: isActive ? "1.5px solid #FEBB02" : "1.5px solid rgba(255,255,255,0.3)",
                background: isActive ? "#FEBB02" : "rgba(255,255,255,0.1)",
                color: isActive ? "#262729" : "rgba(255,255,255,0.9)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                borderRadius: "100px",
                padding: "0.25rem 0.7rem",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Main search bar */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "stretch",
          background: "#FFFFFF",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
        }}
      >
        {/* Query input */}
        <div
          style={{
            flex: 2,
            padding: "0 1.25rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "56px",
            borderRight: "1px solid #E5E7EB",
          }}
        >
          <label
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#374151",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Category
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={activeCategory === "Road Trip" ? "Road Trip" : activeCategory}
            style={{
              border: "none",
              outline: "none",
              fontSize: "0.82rem",
              color: "#262729",
              background: "transparent",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              padding: 0,
            }}
          />
        </div>

        {/* Season */}
        <div
          style={{
            flex: 1,
            padding: "0 1.1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "56px",
            borderRight: "1px solid #E5E7EB",
          }}
        >
          <label
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#374151",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Season
          </label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "0.82rem",
              color: "#262729",
              background: "transparent",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              padding: 0,
              cursor: "pointer",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
          >
            {SEASON_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div
          style={{
            flex: 1,
            padding: "0 1.1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "56px",
          }}
        >
          <label
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#374151",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "0.82rem",
              color: "#262729",
              background: "transparent",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              padding: 0,
              cursor: "pointer",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
          >
            {DURATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          type="submit"
          style={{
            width: 56,
            height: 56,
            borderRadius: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "none",
            background: "#006CE4",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#0057b8";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#006CE4";
          }}
        >
          <Search size={20} color="#FFFFFF" />
        </button>
      </form>
    </div>
  );
}
