"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SearchIcon() {
  return (
    <svg fill="currentColor" height={20} viewBox="0 0 256 256" width={20} xmlns="http://www.w3.org/2000/svg">
      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
    </svg>
  );
}

export interface TrendingItem {
  label: string;
  query: string;
}

const DEFAULT_TRENDING: TrendingItem[] = [
  { label: "Spiti Valley", query: "Spiti Valley" },
  { label: "Leh Ladakh", query: "Leh Ladakh" },
  { label: "Meghalaya", query: "Meghalaya" },
];

interface HeroSearchBarProps {
  trendingTrips?: TrendingItem[];
}

export default function HeroSearchBar({ trendingTrips }: HeroSearchBarProps = {}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const trending = trendingTrips && trendingTrips.length > 0 ? trendingTrips : DEFAULT_TRENDING;

  function navigate(query: string) {
    const q = query.trim();
    if (!q) {
      router.push("/trips");
    } else {
      router.push(`/trips?query=${encodeURIComponent(q)}`);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") navigate(value);
  }

  return (
    <>
      {/* Search bar */}
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "#fcfaf8",
          borderRadius: "0.75rem",
          border: "1px solid #e7d9cf",
          display: "flex",
          alignItems: "center",
          height: "3.5rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          overflow: "hidden",
          padding: "0.25rem",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", padding: "0 0.375rem 0 0.75rem", color: "#9a6b4c", flexShrink: 0, cursor: "pointer" }}
          onClick={() => inputRef.current?.focus()}
        >
          <SearchIcon />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search destinations, passes, trails (e.g. Spiti Valley, Ladakh)"
          aria-label="Search destinations"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "0.8125rem",
            color: "#1b130d",
            minWidth: 0,
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={() => navigate(value)}
          style={{
            background: "#d45f11",
            color: "#fcfaf8",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0 1.125rem",
            height: "100%",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.015em",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "inherit",
            flexShrink: 0,
            transition: "opacity 0.15s",
          }}
          onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")}
          onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        >
          Explore Guides
        </button>
      </div>

      {/* Trending links */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.375rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.8)" }}>
        <span style={{ fontWeight: 600 }}>Trending Now:</span>
        {trending.map((item, i) => (
          <span key={item.query} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            {i > 0 && <span>•</span>}
            <Link
              href={`/trips?query=${encodeURIComponent(item.query)}`}
              style={{
                color: "rgba(255,255,255,0.85)",
                textDecoration: "underline",
                textDecorationColor: "rgba(255,255,255,0.4)",
                transition: "color 0.15s",
              }}
              onMouseOver={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
              onMouseOut={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)")}
            >
              {item.label}
            </Link>
          </span>
        ))}
      </div>
    </>
  );
}
