"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Calendar, Clock, IndianRupee } from "lucide-react";

export interface TrendingItem {
  label: string;
  query: string;
}

const DEFAULT_TRENDING: TrendingItem[] = [
  { label: "Spiti Valley", query: "Spiti Valley" },
  { label: "Leh Ladakh", query: "Leh Ladakh" },
  { label: "Meghalaya", query: "Meghalaya" },
  { label: "Zanskar", query: "Zanskar" },
];

const STARTING_HUBS = [
  "Any Departure",
  "Delhi",
  "Chandigarh",
  "Manali",
  "Srinagar",
  "Leh",
  "Guwahati",
  "Mumbai",
  "Bengaluru",
];

const MONTH_OPTIONS = [
  { label: "Any Month", value: "Any" },
  { label: "January", value: "january" },
  { label: "February", value: "february" },
  { label: "March", value: "march" },
  { label: "April", value: "april" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "august" },
  { label: "September", value: "september" },
  { label: "October", value: "october" },
  { label: "November", value: "november" },
  { label: "December", value: "december" },
];

const DURATION_OPTIONS = [
  { label: "Any Duration", idx: 0, queryVal: "" },
  { label: "1–3 Days", idx: 1, queryVal: "1-3" },
  { label: "4–7 Days", idx: 2, queryVal: "4-7" },
  { label: "8–14 Days", idx: 3, queryVal: "8-14" },
  { label: "15+ Days", idx: 4, queryVal: "15+" },
];

const BUDGET_OPTIONS = [
  { label: "Any Budget", idx: 0, queryVal: "" },
  { label: "Under ₹20,000", idx: 1, queryVal: "under-20k" },
  { label: "₹20,000 – ₹50,000", idx: 2, queryVal: "20k-50k" },
  { label: "₹50,000 – ₹1,00,000", idx: 3, queryVal: "50k-1l" },
  { label: "₹1,00,000+", idx: 4, queryVal: "1l+" },
];

interface TripFinderHeroProps {
  trendingTrips?: TrendingItem[];
}

export default function TripFinderHero({ trendingTrips }: TripFinderHeroProps) {
  const router = useRouter();
  const [startingFrom, setStartingFrom] = useState("Any Departure");
  const [customStarting, setCustomStarting] = useState("");
  const [isCustomStart, setIsCustomStart] = useState(false);
  const [month, setMonth] = useState("Any");
  const [durationIdx, setDurationIdx] = useState(0);
  const [budgetIdx, setBudgetIdx] = useState(0);

  const trending = trendingTrips && trendingTrips.length > 0 ? trendingTrips : DEFAULT_TRENDING;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();

    const startVal = isCustomStart ? customStarting.trim() : (startingFrom !== "Any Departure" ? startingFrom : "");
    if (startVal) {
      params.set("startingFrom", startVal);
      params.set("query", startVal);
    }

    if (month !== "Any") {
      params.set("month", month);
    }

    if (durationIdx > 0) {
      params.set("durationIdx", String(durationIdx));
    }

    if (budgetIdx > 0) {
      params.set("budgetIdx", String(budgetIdx));
    }

    const queryStr = params.toString();
    router.push(queryStr ? `/trips?${queryStr}` : "/trips");
  }

  return (
    <div style={{ width: "100%", maxWidth: "860px", margin: "0 auto" }}>
      {/* ── Compact Trip Finder Bar ─────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Trip finder"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "1rem",
          padding: "0.625rem",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.24), 0 2px 8px rgba(0, 0, 0, 0.12)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr)) auto",
          gap: "0.5rem",
          alignItems: "center",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
        className="trip-finder-form"
      >
        {/* Starting From */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            background: "#f1f3f7",
            borderRadius: "0.625rem",
            padding: "0.5rem 0.625rem",
            minHeight: "44px",
          }}
        >
          <MapPin size={16} color="#6366f1" style={{ flexShrink: 0 }} aria-hidden="true" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <label
              htmlFor="finder-start"
              style={{
                display: "block",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748b",
                lineHeight: 1,
                marginBottom: "2px",
              }}
            >
              From
            </label>
            {!isCustomStart ? (
              <select
                id="finder-start"
                value={startingFrom}
                onChange={(e) => {
                  if (e.target.value === "__custom__") {
                    setIsCustomStart(true);
                  } else {
                    setStartingFrom(e.target.value);
                  }
                }}
                aria-label="Starting location"
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#1e1b4b",
                  outline: "none",
                  cursor: "pointer",
                  padding: 0,
                  textOverflow: "ellipsis",
                }}
              >
                {STARTING_HUBS.map((hub) => (
                  <option key={hub} value={hub}>
                    {hub}
                  </option>
                ))}
                <option value="__custom__">✎ Type city...</option>
              </select>
            ) : (
              <input
                id="finder-start"
                type="text"
                autoFocus
                value={customStarting}
                onChange={(e) => setCustomStarting(e.target.value)}
                onBlur={() => {
                  if (!customStarting.trim()) {
                    setIsCustomStart(false);
                    setStartingFrom("Any Departure");
                  }
                }}
                placeholder="e.g. Pune, Jaipur"
                aria-label="Starting location city"
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#1e1b4b",
                  outline: "none",
                  padding: 0,
                }}
              />
            )}
          </div>
        </div>

        {/* Month */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            background: "#f1f3f7",
            borderRadius: "0.625rem",
            padding: "0.5rem 0.625rem",
            minHeight: "44px",
          }}
        >
          <Calendar size={16} color="#6366f1" style={{ flexShrink: 0 }} aria-hidden="true" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <label
              htmlFor="finder-month"
              style={{
                display: "block",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748b",
                lineHeight: 1,
                marginBottom: "2px",
              }}
            >
              Month
            </label>
            <select
              id="finder-month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              aria-label="Travel month"
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#1e1b4b",
                outline: "none",
                cursor: "pointer",
                padding: 0,
                textOverflow: "ellipsis",
              }}
            >
              {MONTH_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Days (Duration) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            background: "#f1f3f7",
            borderRadius: "0.625rem",
            padding: "0.5rem 0.625rem",
            minHeight: "44px",
          }}
        >
          <Clock size={16} color="#6366f1" style={{ flexShrink: 0 }} aria-hidden="true" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <label
              htmlFor="finder-days"
              style={{
                display: "block",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748b",
                lineHeight: 1,
                marginBottom: "2px",
              }}
            >
              Days
            </label>
            <select
              id="finder-days"
              value={durationIdx}
              onChange={(e) => setDurationIdx(Number(e.target.value))}
              aria-label="Trip duration"
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#1e1b4b",
                outline: "none",
                cursor: "pointer",
                padding: 0,
                textOverflow: "ellipsis",
              }}
            >
              {DURATION_OPTIONS.map((opt) => (
                <option key={opt.idx} value={opt.idx}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            background: "#f1f3f7",
            borderRadius: "0.625rem",
            padding: "0.5rem 0.625rem",
            minHeight: "44px",
          }}
        >
          <IndianRupee size={16} color="#6366f1" style={{ flexShrink: 0 }} aria-hidden="true" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <label
              htmlFor="finder-budget"
              style={{
                display: "block",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748b",
                lineHeight: 1,
                marginBottom: "2px",
              }}
            >
              Budget
            </label>
            <select
              id="finder-budget"
              value={budgetIdx}
              onChange={(e) => setBudgetIdx(Number(e.target.value))}
              aria-label="Trip budget"
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#1e1b4b",
                outline: "none",
                cursor: "pointer",
                padding: 0,
                textOverflow: "ellipsis",
              }}
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.idx} value={opt.idx}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          aria-label="Search matching trips"
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "0.625rem",
            padding: "0 1.25rem",
            height: "44px",
            fontSize: "0.875rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.35)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
          className="finder-submit-btn"
        >
          <Search size={16} strokeWidth={2.5} aria-hidden="true" />
          <span>Search</span>
        </button>
      </form>

      {/* ── Trending Destinations Quick Chips ──────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "0.875rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.8)",
            letterSpacing: "0.02em",
          }}
        >
          Popular:
        </span>
        {trending.map((item) => (
          <Link
            key={item.label}
            href={`/trips?query=${encodeURIComponent(item.query)}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#ffffff",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              padding: "0.2rem 0.65rem",
              borderRadius: "9999px",
              textDecoration: "none",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .trip-finder-form {
            grid-template-columns: 1fr 1fr !important;
          }
          .finder-submit-btn {
            grid-column: 1 / -1;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
