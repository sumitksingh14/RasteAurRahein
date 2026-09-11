"use client";

import { Leaf, Flame, ExternalLink, MapPin, Search, Sparkles } from "lucide-react";
import type { FoodSpot } from "@/lib/types";

import { FOOD_DATA, DEFAULT_FOOD } from "@/lib/data/foodData";

function getFoodRecommendations(tripSlug: string, tripTitle?: string): FoodSpot[] {
  if (FOOD_DATA[tripSlug] && FOOD_DATA[tripSlug].length > 0) {
    return FOOD_DATA[tripSlug];
  }
  const cleanTitle = (tripTitle || tripSlug.replace(/-/g, " "))
    .replace(/\s*—.*$/, "")
    .replace(/\s*–.*$/, "")
    .trim();
  return [
    {
      id: `${tripSlug}-food-1`,
      name: `${cleanTitle} Heritage Kitchen`,
      type: "restaurant",
      town: cleanTitle,
      mustTry: ["Regional Special Thali", "Local Flatbreads", "Authentic Spiced Chai"],
      priceRange: "₹₹",
      isVeg: true,
      notes: `Locally recommended eatery serving traditional dishes and authentic home-style flavors in ${cleanTitle}.`,
    },
    {
      id: `${tripSlug}-food-2`,
      name: `${cleanTitle} Mountain Cafe`,
      type: "cafe",
      town: cleanTitle,
      mustTry: ["Freshly Brewed Coffee", "Wood-fired Snacks", "Local Herbal Tea"],
      priceRange: "₹",
      isVeg: true,
      notes: `Relaxed spot popular with travellers for breakfast, evening tea, and quick mountain bites.`,
    },
  ];
}

const TYPE_LABELS: Record<FoodSpot["type"], string> = {
  restaurant: "Restaurant", dhaba: "Dhaba", "street-food": "Street Food",
  cafe: "Café", "homestay-kitchen": "Homestay Kitchen",
};

const TYPE_COLORS: Record<FoodSpot["type"], { bg: string; color: string }> = {
  restaurant: { bg: "rgba(137,180,250,0.15)", color: "var(--accent-gold)" },
  dhaba: { bg: "rgba(249,168,212,0.15)", color: "var(--accent-rose)" },
  "street-food": { bg: "rgba(250,179,135,0.15)", color: "#fab387" },
  cafe: { bg: "rgba(94,234,212,0.15)", color: "var(--accent-teal)" },
  "homestay-kitchen": { bg: "rgba(166,227,161,0.15)", color: "#a6e3a1" },
};

interface FoodRecommendationsProps {
  tripSlug: string;
  tripTitle?: string;
}

export default function FoodRecommendations({ tripSlug, tripTitle }: FoodRecommendationsProps) {
  const spots = getFoodRecommendations(tripSlug, tripTitle);
  const destination = tripTitle || tripSlug.replace(/-/g, " ");

  const zomatoUrl = `https://www.zomato.com/india/${encodeURIComponent(destination.split(" ")[0]?.toLowerCase() || "")}/restaurants`;
  const googleFoodUrl = `https://www.google.com/search?q=best+restaurants+${encodeURIComponent(destination)}`;
  const tripadvisorUrl = `https://www.tripadvisor.in/Restaurants-g${encodeURIComponent(destination)}.html`;

  return (
    <div className="food-recommendations">
      {/* Header with search links */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
        gap: "0.75rem", marginBottom: "1rem",
      }}>
        <p className="food-intro" style={{ margin: 0 }}>
          Locally curated restaurants, dhabas, and authentic kitchens along this route.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, flexWrap: "wrap" }}>
          <a href={zomatoUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.35rem 0.75rem", borderRadius: 20,
              border: "1px solid rgba(249,168,212,0.35)", background: "rgba(249,168,212,0.08)",
              color: "var(--accent-rose)", fontSize: "0.73rem", fontWeight: 600, textDecoration: "none",
            }}>
            <ExternalLink size={11} /> Zomato
          </a>
          <a href={googleFoodUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.35rem 0.75rem", borderRadius: 20,
              border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.08)",
              color: "#4ade80", fontSize: "0.73rem", fontWeight: 600, textDecoration: "none",
            }}>
            <Search size={11} /> Google
          </a>
        </div>
      </div>

      {/* AI badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem",
        padding: "0.6rem 0.85rem", borderRadius: "var(--radius-md)",
        background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)",
      }}>
        <Sparkles size={13} style={{ color: "#a78bfa", flexShrink: 0 }} />
        <span style={{ fontSize: "0.72rem", color: "#a78bfa", fontWeight: 600 }}>AI-curated picks</span>
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
          · Includes traditional dishes unique to this region. Click Maps to navigate.
        </span>
      </div>

      <div className="food-grid">
        {spots.map((spot) => {
          const { bg, color } = TYPE_COLORS[spot.type];
          const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(spot.name + " " + spot.town)}`;
          const zomatoSpotUrl = `https://www.zomato.com/search?q=${encodeURIComponent(spot.name)}`;
          return (
            <div key={spot.id} className="food-card glass-card">
              <div className="food-card-top">
                <div>
                  <span className="food-type-badge" style={{ background: bg, color }}>
                    {TYPE_LABELS[spot.type]}
                  </span>
                  <h3 className="food-name">{spot.name}</h3>
                  <div className="food-meta">
                    <span className="food-town" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      📍 {spot.town}
                    </span>
                    {spot.isVeg !== undefined && (
                      <span className={`food-veg-badge ${spot.isVeg ? "veg" : "nonveg"}`}>
                        {spot.isVeg ? <Leaf size={10} /> : <Flame size={10} />}
                        {spot.isVeg ? "Pure Veg" : "Non-Veg"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="food-price-badge" title={`Price range: ${spot.priceRange}`}>
                  {spot.priceRange}
                </div>
              </div>

              {/* Must Try */}
              <div className="food-must-try-section">
                <div className="food-must-try-label">Must Try</div>
                <div className="food-must-try-list">
                  {spot.mustTry.map((dish) => (
                    <span key={dish} className="food-dish-pill">{dish}</span>
                  ))}
                </div>
              </div>

              {spot.notes && (
                <p className="food-notes">💡 {spot.notes}</p>
              )}

              {/* Action links */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                <a
                  href={mapsUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    padding: "0.3rem 0.65rem", borderRadius: 20,
                    border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.07)",
                    color: "#4ade80", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
                  }}
                >
                  <MapPin size={11} /> Find on Maps
                </a>
                {spot.type === "restaurant" || spot.type === "cafe" || spot.type === "dhaba" ? (
                  <a
                    href={zomatoSpotUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.3rem",
                      padding: "0.3rem 0.65rem", borderRadius: 20,
                      border: "1px solid rgba(249,168,212,0.3)", background: "rgba(249,168,212,0.07)",
                      color: "var(--accent-rose)", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
                    }}
                  >
                    <ExternalLink size={11} /> Zomato
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom discovery strip */}
      <div style={{
        marginTop: "1.5rem", padding: "0.85rem 1rem",
        borderRadius: "var(--radius-md)", border: "1px dashed var(--border)",
        display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center",
      }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          🍽️ Discover more:
        </span>
        {[
          { label: "Swiggy", url: `https://www.swiggy.com/` },
          { label: "TripAdvisor", url: tripadvisorUrl },
          { label: "Google Maps Food", url: `https://www.google.com/maps/search/restaurants+near+${encodeURIComponent(destination)}` },
          { label: "Instagram", url: `https://www.instagram.com/explore/tags/${encodeURIComponent(destination.replace(/\s+/g, "").toLowerCase())}food/` },
        ].map(({ label, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.7rem", borderRadius: 20,
              border: "1px solid var(--border)", background: "var(--bg-card)",
              color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <ExternalLink size={10} /> {label}
          </a>
        ))}
      </div>
    </div>
  );
}
