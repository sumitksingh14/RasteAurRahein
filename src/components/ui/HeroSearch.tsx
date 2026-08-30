"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const TRIP_TYPES = ["Treks", "Road Trips", "Destinations", "Itineraries"];

const DURATION_OPTIONS = [
  "Any length",
  "1–3 days",
  "4–7 days",
  "8–14 days",
  "15+ days",
];

const SEASON_OPTIONS = [
  "Any season",
  "Spring",
  "Summer",
  "Monsoon",
  "Autumn",
  "Winter",
];

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(TRIP_TYPES[0]);
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState(SEASON_OPTIONS[0]);
  const [duration, setDuration] = useState(DURATION_OPTIONS[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (location.trim()) {
      params.append("query", location.trim());
    }
    
    // We map the active tab to a tag
    if (activeTab !== "Destinations" && activeTab !== "Itineraries") {
       const tagMap: Record<string, string> = {
         "Treks": "Trekking",
         "Road Trips": "Adventure", 
       };
       const mappedTag = tagMap[activeTab] || activeTab;
       params.append("tag", mappedTag);
    }

    if (duration !== "Any length") {
       const durationIdx = DURATION_OPTIONS.indexOf(duration);
       if (durationIdx > 0) {
         params.append("durationIdx", durationIdx.toString());
       }
    }

    if (season !== "Any season") {
       params.append("season", season);
    }

    router.push(`/trips?${params.toString()}`);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "2rem",
        left: "2rem",
        right: "2rem",
        zIndex: 3,
      }}
    >
      {/* Type tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.9)",
            marginRight: "0.5rem",
          }}
        >
          FIND
        </span>
        {TRIP_TYPES.map((type) => {
          const isActive = activeTab === type;
          return (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              type="button"
              style={{
                border: "none",
                background: "transparent",
                color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                borderBottom: isActive ? "2px solid #FEBB02" : "2px solid transparent",
                borderRadius: "0",
                padding: "0.3rem 0.75rem",
              }}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Search inputs row */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "stretch",
          background: "#FFFFFF",
          borderRadius: "100px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          maxWidth: "680px",
        }}
      >
        {/* Location */}
        <div
          style={{
            flex: 2,
            padding: "0 1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "56px",
            borderRight: "1px solid #E5E7EB",
          }}
        >
          <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "#374151", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Which state do you prefer?"
            style={{
              border: "none",
              outline: "none",
              fontSize: "0.82rem",
              color: "#006CE4",
              background: "transparent",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              padding: 0,
            }}
          />
        </div>

        {/* Season */}
        <div
          style={{
            flex: 1,
            padding: "0 1.25rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "56px",
            borderRight: "1px solid #E5E7EB",
          }}
        >
          <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "#374151", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Season
          </label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "0.82rem",
              color: season === "Any season" ? "#9CA3AF" : "#006CE4",
              background: "transparent",
              fontFamily: "var(--font-sans)",
              fontWeight: season === "Any season" ? 400 : 500,
              padding: 0,
              cursor: "pointer",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
          >
            {SEASON_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div
          style={{
            flex: 1,
            padding: "0 1.25rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "56px",
          }}
        >
          <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "#374151", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "0.82rem",
              color: duration === "Any length" ? "#9CA3AF" : "#006CE4",
              background: "transparent",
              fontFamily: "var(--font-sans)",
              fontWeight: duration === "Any length" ? 400 : 500,
              padding: 0,
              cursor: "pointer",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
          >
            {DURATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="hero-search-btn"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "none",
            cursor: "pointer",
          }}
        >
          <Search size={20} color="#262729" />
        </button>
      </form>
    </div>
  );
}
