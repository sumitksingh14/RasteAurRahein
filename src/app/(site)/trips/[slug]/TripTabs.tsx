"use client";

import { useState } from "react";
import { Map, Camera, List, DollarSign, Hotel, Utensils, Gauge } from "lucide-react";
import ItineraryAccordion from "@/components/ui/ItineraryAccordion";
import PhotoGallery from "@/components/ui/PhotoGallery";
import MapView from "@/components/ui/MapView";
import StaySuggestions from "@/components/ui/StaySuggestions";
import FoodRecommendations from "@/components/ui/FoodRecommendations";
import FuelRestStops from "@/components/ui/FuelRestStops";
import type { Trip, MapPin } from "@/lib/types";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

const TRIP_GALLERIES: Record<string, GalleryImage[]> = {
  "spiti-valley": [
    { src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=85", alt: "Spiti Valley mountain landscape", caption: "The high-altitude landscapes of Spiti Valley." },
    { src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=85", alt: "Himalayan monastery", caption: "Monastery country around Kaza and Ki." },
    { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85", alt: "Himalayan mountain road", caption: "Remote roads on the Spiti circuit." },
    { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85", alt: "High-altitude lake and mountains", caption: "The alpine character of Chandratal and the high passes." },
  ],
  "mysore-coorg-wayanad-ooty": [
    { src: "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/d4676652506983.591f0235258b3.jpg", alt: "Misty Coorg hills", caption: "Misty Western Ghats landscapes around Coorg." },
    { src: "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/33844d52506983.591f0235254e9.jpg", alt: "Coorg coffee-country landscape", caption: "Coffee-country scenery on the Coorg leg." },
    { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=85", alt: "Mountain lake", caption: "Cooler hill-country scenery toward Ooty and Coonoor." },
    { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85", alt: "Scenic road through the hills", caption: "A road-trip view of the Western Ghats circuit." },
  ],
  "rajasthan-desert-kingdom": [
    { src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1200&q=85", alt: "Rajasthan palace architecture", caption: "Royal architecture from Rajasthan's historic cities." },
    { src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=85", alt: "Historic Indian architecture", caption: "Forts, palaces, and carved stone landmarks across the circuit." },
    { src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=85", alt: "Indian heritage monument", caption: "The heritage-rich city stops from Jaipur to Udaipur." },
    { src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=85", alt: "Desert landscape", caption: "Desert horizons around Jaisalmer and Sam Sand Dunes." },
  ],
  "goa-beyond-beaches": [
    { src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=85", alt: "Goa beach", caption: "The Arabian Sea side of Goa." },
    { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85", alt: "Tropical beach", caption: "Beach time across North and South Goa." },
    { src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=85", alt: "Coastal palm landscape", caption: "Goa's palm-lined coastal character." },
    { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85", alt: "Sunset on the coast", caption: "A slow sunset finish on the Goan coast." },
  ],
};

type TabId = "itinerary" | "photos" | "map" | "costs" | "stay" | "food" | "route";

const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: "itinerary", label: "Itinerary", Icon: List },
  { id: "photos", label: "Photos", Icon: Camera },
  { id: "map", label: "Map", Icon: Map },
  { id: "costs", label: "Costs", Icon: DollarSign },
  { id: "stay", label: "Stay", Icon: Hotel },
  { id: "food", label: "Food", Icon: Utensils },
  { id: "route", label: "Route", Icon: Gauge },
];

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

  // Collect all costs
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

  return (
    <div>
      {/* Tab Bar */}
      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          background: "var(--bg-secondary)",
          padding: "0.375rem",
          borderRadius: "var(--radius-md)",
          marginBottom: "2rem",
          overflowX: "auto",
        }}
      >
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              id={`tab-${id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.625rem 1.25rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
                whiteSpace: "nowrap",
                flex: 1,
                justifyContent: "center",
                transition: "all var(--transition)",
                background: isActive ? "var(--bg-card)" : "transparent",
                color: isActive ? "var(--accent-gold)" : "var(--text-muted)",
                boxShadow: isActive ? "var(--shadow-sm)" : "none",
              }}
            >
              <Icon size={15} />
              {label}
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
                // Best-effort: pull the first transport activity title as Day 1 origin,
                // or fall back to an empty string (Maps button will still show destination-only)
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

      {activeTab === "photos" && (
        <PhotoGallery
          images={TRIP_GALLERIES[trip.slug] || []}
          title={`${trip.title} Gallery`}
        />
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
            // Demo map for Spiti Valley when no pins are in itinerary
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
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--text-muted)",
                border: "1px dashed var(--border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              No cost data recorded for this trip.
            </div>
          )}
        </div>
      )}
      {activeTab === "stay" && (
        <StaySuggestions tripSlug={trip.slug} />
      )}

      {activeTab === "food" && (
        <FoodRecommendations tripSlug={trip.slug} />
      )}

      {activeTab === "route" && (
        <FuelRestStops tripSlug={trip.slug} />
      )}
    </div>
  );
}
