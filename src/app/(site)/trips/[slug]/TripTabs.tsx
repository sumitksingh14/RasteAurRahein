"use client";

import { useState } from "react";
import { Map, List, DollarSign, Hotel, Utensils, Gauge, Sparkles, ExternalLink } from "lucide-react";
import ItineraryAccordion from "@/components/ui/ItineraryAccordion";
import MapView from "@/components/ui/MapView";
import StaySuggestions from "@/components/ui/StaySuggestions";
import FoodRecommendations from "@/components/ui/FoodRecommendations";
import FuelRestStops from "@/components/ui/FuelRestStops";
import type { Trip, MapPin } from "@/lib/types";

type TabId = "itinerary" | "map" | "costs" | "stay" | "food" | "route";

const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: "itinerary", label: "Itinerary", Icon: List },
  { id: "map", label: "Map", Icon: Map },
  { id: "costs", label: "Costs", Icon: DollarSign },
  { id: "stay", label: "Stay", Icon: Hotel },
  { id: "food", label: "Food", Icon: Utensils },
  { id: "route", label: "Route", Icon: Gauge },
];

// AI-estimated budget ranges per trip slug (derived from trip type & destination)
const AI_BUDGET_ESTIMATES: Record<string, {
  accommodation: [number, number];
  food: [number, number];
  transport: [number, number];
  activities: [number, number];
  misc: [number, number];
  currency: string;
  source: string;
  searchQuery: string;
}> = {
  "jyotirlinga-pilgrimage-road-trip": {
    accommodation: [1200, 5500], food: [200, 600], transport: [800, 1500],
    activities: [200, 500], misc: [300, 600], currency: "INR",
    source: "Based on Jyotirlinga pilgrimage traveller reports (2024–25)",
    searchQuery: "Jyotirlinga pilgrimage Maharashtra Madhya Pradesh budget per day 2024",
  },
  "spiti-valley": {
    accommodation: [1200, 4500], food: [300, 800], transport: [800, 1500],
    activities: [200, 600], misc: [300, 500], currency: "INR",
    source: "Based on Spiti Valley traveller reports (2024–25)",
    searchQuery: "Spiti Valley trip budget per day 2024",
  },
  "mysore-coorg-wayanad-ooty": {
    accommodation: [700, 6000], food: [400, 1200], transport: [600, 1000],
    activities: [300, 800], misc: [200, 400], currency: "INR",
    source: "Based on South India circuit reports (2024–25)",
    searchQuery: "Mysore Coorg Wayanad Ooty trip budget per day 2024",
  },
  "rajasthan-desert-kingdom": {
    accommodation: [1500, 12000], food: [400, 1500], transport: [700, 1200],
    activities: [500, 1500], misc: [300, 600], currency: "INR",
    source: "Based on Rajasthan circuit traveller reports (2024–25)",
    searchQuery: "Rajasthan road trip budget per day 2024",
  },
  "goa-beyond-beaches": {
    accommodation: [1200, 8000], food: [500, 2000], transport: [400, 900],
    activities: [500, 2000], misc: [300, 700], currency: "INR",
    source: "Based on Goa traveller reports (2024–25)",
    searchQuery: "Goa trip budget per day 2024",
  },
  "sikkim-7-days": {
    accommodation: [1000, 7000], food: [300, 1000], transport: [600, 1200],
    activities: [400, 1200], misc: [200, 500], currency: "INR",
    source: "Based on Sikkim traveller reports (2024–25)",
    searchQuery: "Sikkim trip budget per day 2024",
  },
  "meghalaya-5-days": {
    accommodation: [1200, 5500], food: [300, 900], transport: [500, 1000],
    activities: [300, 800], misc: [200, 400], currency: "INR",
    source: "Based on Meghalaya traveller reports (2024–25)",
    searchQuery: "Meghalaya trip budget per day 2024",
  },
  "kerala-7-days": {
    accommodation: [2000, 9000], food: [500, 1500], transport: [600, 1200],
    activities: [600, 2000], misc: [300, 600], currency: "INR",
    source: "Based on Kerala traveller reports (2024–25)",
    searchQuery: "Kerala trip budget per day 2024",
  },
  "munsiyari-6-days": {
    accommodation: [800, 3000], food: [250, 700], transport: [600, 1200],
    activities: [200, 600], misc: [200, 400], currency: "INR",
    source: "Based on Munsiyari traveller reports (2024–25)",
    searchQuery: "Munsiyari trip budget per day 2024",
  },
  "char-dham-yatra-uttarakhand": {
    accommodation: [600, 3500], food: [200, 700], transport: [800, 1500],
    activities: [300, 1000], misc: [200, 500], currency: "INR",
    source: "Based on Char Dham Yatra reports (2024–25)",
    searchQuery: "Char Dham Yatra budget per day 2024",
  },
  "panch-kedar-trek-10-days": {
    accommodation: [600, 2500], food: [300, 800], transport: [700, 1400],
    activities: [400, 1200], misc: [300, 600], currency: "INR",
    source: "Based on Panch Kedar trek reports (2024–25)",
    searchQuery: "Panch Kedar trek budget per day 2024",
  },
  "pune-konkan-coast-raigad": {
    accommodation: [1500, 5000], food: [400, 1200], transport: [500, 1000],
    activities: [300, 800], misc: [200, 400], currency: "INR",
    source: "Based on Konkan coast traveller reports (2024–25)",
    searchQuery: "Pune Konkan trip budget per day 2024",
  },
};

const DEFAULT_BUDGET = {
  accommodation: [1000, 4000] as [number, number],
  food: [300, 1000] as [number, number],
  transport: [500, 1200] as [number, number],
  activities: [300, 800] as [number, number],
  misc: [200, 500] as [number, number],
  currency: "INR",
  source: "AI-estimated range based on similar India trips",
  searchQuery: "",
};

const BUDGET_CATS = [
  { key: "accommodation", label: "🏨 Accommodation", color: "#60a5fa" },
  { key: "food", label: "🍽️ Food & Drinks", color: "#f9a8d4" },
  { key: "transport", label: "🚗 Transport / Fuel", color: "#fbbf24" },
  { key: "activities", label: "🎟️ Activities & Entry", color: "#4ade80" },
  { key: "misc", label: "🧳 Miscellaneous", color: "#c4b5fd" },
] as const;

interface TripTabsProps {
  trip: Trip;
}

export default function TripTabs({ trip }: TripTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("itinerary");

  // Collect all map pins from itinerary
  const mapPins: MapPin[] =
    trip.itinerary?.flatMap(
      (day) =>
        day.activities
          ?.filter((a) => a.location?.lat && a.location?.lng)
          .map((a) => ({
            lat: a.location!.lat,
            lng: a.location!.lng,
            label: a.location!.name,
            day: day.dayNumber,
          })) || []
    ) || [];

  // Collect all costs from structured itinerary data
  const costsByDay =
    trip.itinerary?.map((day) => ({
      day: day.title,
      dayNumber: day.dayNumber,
      activities: day.activities
        ?.filter((a) => a.cost !== undefined)
        .map((a) => ({
          name: a.title,
          cost: a.cost!,
          currency: a.currency || trip.currency || "INR",
        })) || [],
      total: day.activities?.reduce((sum, a) => sum + (a.cost || 0), 0) || 0,
    })) || [];

  const grandTotal = costsByDay.reduce((sum, d) => sum + d.total, 0);
  const numDays = trip.itinerary?.length || 1;

  // AI budget estimate for this trip
  const aiBudget = AI_BUDGET_ESTIMATES[trip.slug] || DEFAULT_BUDGET;
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(aiBudget.searchQuery || `${trip.title} budget per day 2024`)}`;

  return (
    <div>
      {/* Tab Bar — horizontally scrollable on mobile */}
      <div
        className="trip-tabs-bar"
        style={{
          display: "flex",
          gap: "0.25rem",
          background: "var(--bg-secondary)",
          padding: "0.375rem",
          borderRadius: "var(--radius-md)",
          marginBottom: "2rem",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          scrollbarWidth: "none" as React.CSSProperties["scrollbarWidth"],
          msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
        }}
      >
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              id={`tab-${id}`}
              className="trip-tab-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.625rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
                whiteSpace: "nowrap",
                flexShrink: 0,
                justifyContent: "center",
                transition: "all var(--transition)",
                background: isActive ? "var(--bg-card)" : "transparent",
                color: isActive ? "var(--accent-gold)" : "var(--text-muted)",
                boxShadow: isActive ? "var(--shadow-sm)" : "none",
              }}
            >
              <Icon size={15} />
              <span className="trip-tab-label">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === "itinerary" && (
        <div>
          {trip.itinerary && trip.itinerary.length > 0 ? (
            <ItineraryAccordion
              days={trip.itinerary}
              destination={trip.title}
              origin={
                trip.itinerary[0]?.activities?.find((a) => a.type === "transport")?.location?.name ||
                ""
              }
            />
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--text-muted)",
                border: "1px dashed var(--border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              No detailed itinerary available for this trip.
            </div>
          )}
        </div>
      )}

      {activeTab === "map" && (
        <div>
          {mapPins.length > 0 ? (
            <div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}
              >
                {mapPins.length} location{mapPins.length !== 1 ? "s" : ""}{" "}
                pinned along this route
              </p>
              <MapView pins={mapPins} height={480} />
            </div>
          ) : (
            <div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}
              >
                Route overview — Spiti Valley circuit
              </p>
              <MapView
                pins={[
                  { lat: 31.42, lng: 77.45, label: "Narkanda", day: 1 },
                  { lat: 31.59, lng: 78.24, label: "Sangla", day: 2 },
                  { lat: 31.35, lng: 78.44, label: "Chitkul", day: 3 },
                  { lat: 32.07, lng: 78.57, label: "Kaza", day: 4 },
                  { lat: 32.3, lng: 78.02, label: "Chandratal", day: 5 },
                ]}
                height={480}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === "costs" && (
        <div>
          {grandTotal > 0 ? (
            /* ── Structured cost data from itinerary ── */
            <div>
              {/* Grand Total */}
              <div
                style={{
                  background: "var(--accent-gold-dim)",
                  border: "1px solid var(--border-accent)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--accent-gold)",
                      fontWeight: 600,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Total Trip Cost
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      color: "var(--accent-gold)",
                      lineHeight: 1,
                    }}
                  >
                    ₹{grandTotal.toLocaleString()}
                  </div>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "right" }}>
                  <div>{costsByDay.length} days tracked</div>
                  <div>Avg ₹{Math.round(grandTotal / Math.max(costsByDay.length, 1)).toLocaleString()} / day</div>
                </div>
              </div>

              {/* Day-by-day breakdown */}
              {costsByDay.filter((d) => d.total > 0).map((day) => (
                <div
                  key={day.dayNumber}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "0.75rem",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      background: "var(--bg-card)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.9rem" }}>
                      Day {day.dayNumber} — {day.day}
                    </span>
                    <span style={{ color: "var(--accent-teal)", fontWeight: 600, fontSize: "0.9rem" }}>
                      ₹{day.total.toLocaleString()}
                    </span>
                  </div>
                  {day.activities.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.625rem 1.25rem",
                        borderBottom: i < day.activities.length - 1 ? "1px solid var(--border)" : "none",
                        background: "var(--bg-secondary)",
                      }}
                    >
                      <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                        {item.name}
                      </span>
                      <span style={{ color: "var(--text-primary)", fontSize: "0.875rem", fontWeight: 500 }}>
                        ₹{item.cost.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* ── AI-estimated budget when no structured cost data ── */
            <div>
              {/* AI Badge Header */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                marginBottom: "1.25rem",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.25)",
              }}>
                <Sparkles size={16} style={{ color: "#a78bfa", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#a78bfa" }}>
                    AI-Estimated Budget Range
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {aiBudget.source} · per person per day
                  </div>
                </div>
                <a
                  href={googleSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.3rem",
                    fontSize: "0.72rem", color: "var(--accent-teal)", fontWeight: 600,
                    textDecoration: "none", flexShrink: 0,
                  }}
                >
                  <ExternalLink size={11} /> Verify
                </a>
              </div>

              {/* Category cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
                {BUDGET_CATS.map(({ key, label, color }) => {
                  const [lo, hi] = (aiBudget[key as keyof typeof aiBudget] as [number, number]) || [0, 0];
                  const midPct = Math.round(((lo + hi) / 2) / (
                    (BUDGET_CATS.reduce((s, c) => {
                      const [l, h] = (aiBudget[c.key as keyof typeof aiBudget] as [number, number]) || [0, 0];
                      return s + (l + h) / 2;
                    }, 0)) || 1
                  ) * 100);
                  return (
                    <div
                      key={key}
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        padding: "0.85rem 1rem",
                        background: "var(--bg-card)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
                        <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
                          {label}
                        </span>
                        <span style={{ fontSize: "0.88rem", fontWeight: 700, color }}>
                          ₹{lo.toLocaleString()} – ₹{hi.toLocaleString()}
                        </span>
                      </div>
                      {/* Mini bar */}
                      <div style={{ height: 4, borderRadius: 2, background: "var(--border)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${midPct}%`, background: color, borderRadius: 2, opacity: 0.75 }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Daily & total summary */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}>
                {[
                  {
                    label: "Daily Budget (budget traveller)",
                    value: `₹${BUDGET_CATS.reduce((s, c) => s + ((aiBudget[c.key as keyof typeof aiBudget] as [number, number])?.[0] || 0), 0).toLocaleString()}`,
                    sub: "per person/day",
                    color: "#4ade80",
                  },
                  {
                    label: "Daily Budget (mid-range)",
                    value: `₹${BUDGET_CATS.reduce((s, c) => s + ((aiBudget[c.key as keyof typeof aiBudget] as [number, number])?.[1] || 0), 0).toLocaleString()}`,
                    sub: "per person/day",
                    color: "#60a5fa",
                  },
                  {
                    label: `${numDays}-Day Trip (budget)`,
                    value: `₹${(BUDGET_CATS.reduce((s, c) => s + ((aiBudget[c.key as keyof typeof aiBudget] as [number, number])?.[0] || 0), 0) * numDays).toLocaleString()}`,
                    sub: "estimated total",
                    color: "#fbbf24",
                  },
                  {
                    label: `${numDays}-Day Trip (mid-range)`,
                    value: `₹${(BUDGET_CATS.reduce((s, c) => s + ((aiBudget[c.key as keyof typeof aiBudget] as [number, number])?.[1] || 0), 0) * numDays).toLocaleString()}`,
                    sub: "estimated total",
                    color: "#f9a8d4",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      padding: "1rem",
                      background: "var(--bg-secondary)",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.35rem" }}>{card.label}</div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 700, color: card.color }}>{card.value}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{card.sub}</div>
                  </div>
                ))}
              </div>

              {/* Search engine links */}
              <div style={{
                padding: "0.85rem 1rem",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--border)",
                display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center",
              }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  🔍 Get latest estimates:
                </span>
                {[
                  { label: "Google", url: googleSearchUrl },
                  { label: "TripAdvisor", url: `https://www.tripadvisor.in/Search?q=${encodeURIComponent(trip.title + " travel budget")}` },
                  { label: "MakeMyTrip", url: `https://www.makemytrip.com/holidays-india/` },
                  { label: "IndiaMike", url: `https://www.indiamike.com/india/search/?q=${encodeURIComponent(trip.title + " budget")}` },
                ].map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.3rem",
                      padding: "0.3rem 0.7rem", borderRadius: 20,
                      border: "1px solid var(--border)",
                      background: "var(--bg-card)",
                      color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: 500,
                      textDecoration: "none", transition: "all 0.2s",
                    }}
                  >
                    <ExternalLink size={10} /> {label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "stay" && (
        <StaySuggestions tripSlug={trip.slug} tripTitle={trip.title} />
      )}

      {activeTab === "food" && (
        <FoodRecommendations tripSlug={trip.slug} tripTitle={trip.title} />
      )}

      {activeTab === "route" && (
        <FuelRestStops tripSlug={trip.slug} tripTitle={trip.title} />
      )}
    </div>
  );
}
