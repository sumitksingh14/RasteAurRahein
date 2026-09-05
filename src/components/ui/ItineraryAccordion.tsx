"use client";

import { useState } from "react";
import {
  ChevronDown,
  Clock,
  MapPin,
  DollarSign,
  Camera,
  Lightbulb,
  Car,
  Utensils,
  Bed,
  Binoculars,
} from "lucide-react";
import type { ItineraryDay, Activity } from "@/lib/types";
import { format } from "date-fns";
import GoogleMapsRouteButton from "@/components/ui/GoogleMapsRouteButton";
import { extractWaypointsFromItinerary, type ItineraryActivity, type ItineraryDay as RouteDay } from "@/lib/googleMapsRoute";

const ACTIVITY_ICONS: Record<string, React.ElementType> = {
  transport: Car,
  food: Utensils,
  accommodation: Bed,
  sightseeing: Binoculars,
  activity: Camera,
};

function ActivityIcon({ type }: { type?: string }) {
  const Icon = type && ACTIVITY_ICONS[type] ? ACTIVITY_ICONS[type] : MapPin;
  return (
    <span
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "var(--accent-gold-dim)",
        border: "1px solid var(--border-accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: "var(--accent-gold)",
      }}
    >
      <Icon size={14} />
    </span>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        paddingBottom: "1.25rem",
        position: "relative",
      }}
    >
      {/* Timeline line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        <ActivityIcon type={activity.type} />
        <div
          style={{
            width: 1,
            flexGrow: 1,
            background: "var(--border)",
            marginTop: "4px",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "0.25rem",
          }}
        >
          <h4
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              fontFamily: "var(--font-sans)",
              lineHeight: 1.3,
            }}
          >
            {activity.title}
          </h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexShrink: 0,
            }}
          >
            {activity.time && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.75rem",
                  color: "var(--accent-gold)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                <Clock size={11} />
                {activity.time}
              </span>
            )}
            {activity.cost !== undefined && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "0.75rem",
                  color: "var(--accent-teal)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                <DollarSign size={11} />
                {activity.cost.toLocaleString()}
                {activity.currency && ` ${activity.currency}`}
              </span>
            )}
          </div>
        </div>

        {activity.description && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "0.5rem",
            }}
          >
            {activity.description}
          </p>
        )}

        {activity.location && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginBottom: activity.notes ? "0.5rem" : 0,
            }}
          >
            <MapPin size={11} />
            {activity.location.name}
          </span>
        )}

        {activity.notes && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
              background: "var(--accent-gold-dim)",
              border: "1px solid var(--border-accent)",
              borderRadius: "var(--radius-sm)",
              padding: "0.5rem 0.75rem",
              marginTop: "0.5rem",
            }}
          >
            <Lightbulb size={13} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {activity.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface ItineraryAccordionProps {
  days: ItineraryDay[];
  /** User's trip origin city — enables Google Maps route button */
  origin?: string;
  /** Trip destination — used as final stop in Google Maps link */
  destination?: string;
}

export default function ItineraryAccordion({ days, origin, destination }: ItineraryAccordionProps) {
  const [openDays, setOpenDays] = useState<Set<string>>(
    new Set(days.slice(0, 1).map((d) => d._key))
  );

  const toggleDay = (key: string) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const expandAll = () => setOpenDays(new Set(days.map((d) => d._key)));
  const collapseAll = () => setOpenDays(new Set());

  const totalCost = days.flatMap((d) => d.activities).reduce(
    (sum, a) => sum + (a.cost || 0),
    0
  );

  if (!days || days.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          color: "var(--text-muted)",
          border: "1px dashed var(--border)",
          borderRadius: "var(--radius-md)",
        }}
      >
        No itinerary data available for this trip.
      </div>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            {days.length} {days.length === 1 ? "day" : "days"}
          </span>
          {totalCost > 0 && (
            <span
              style={{
                color: "var(--accent-teal)",
                fontSize: "0.875rem",
                marginLeft: "1rem",
              }}
            >
              Total tracked: ₹{totalCost.toLocaleString()}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* Google Maps route button */}
          {destination && (
            <GoogleMapsRouteButton
              origin={origin || ""}
              destination={destination}
              waypoints={extractWaypointsFromItinerary(
                days.map((d) => ({
                  activities: (d.activities ?? []).map((a) => ({
                    title: a.title,
                    type: a.type,
                    location: a.location
                      ? { name: a.location.name, lat: a.location.lat, lng: a.location.lng }
                      : undefined,
                  })) as ItineraryActivity[],
                })) as RouteDay[]
              )}
              compact
            />
          )}
          <button
            onClick={expandAll}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all var(--transition)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all var(--transition)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Day Accordions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {days.map((day, index) => {
          const isOpen = openDays.has(day._key);
          return (
            <div
              key={day._key}
              style={{
                border: "1px solid",
                borderColor: isOpen ? "var(--border-accent)" : "var(--border)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                transition: "border-color var(--transition)",
                background: isOpen ? "var(--bg-card)" : "var(--bg-secondary)",
              }}
            >
              {/* Header */}
              <button
                onClick={() => toggleDay(day._key)}
                id={`itinerary-day-${day.dayNumber}`}
                style={{
                  width: "100%",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {/* Day badge */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--radius-sm)",
                    background: isOpen
                      ? "var(--accent-gold)"
                      : "var(--bg-card)",
                    border: "1px solid",
                    borderColor: isOpen ? "var(--accent-gold)" : "var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all var(--transition)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: isOpen ? "var(--bg-primary)" : "var(--text-muted)",
                      lineHeight: 1,
                    }}
                  >
                    DAY
                  </span>
                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-serif)",
                      color: isOpen ? "var(--bg-primary)" : "var(--text-primary)",
                      lineHeight: 1,
                    }}
                  >
                    {day.dayNumber}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      color: "var(--text-primary)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {day.title}
                  </h3>
                  {day.date && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {format(new Date(day.date), "EEEE, MMMM d, yyyy")}
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {day.activities?.length || 0} stops
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: "var(--text-muted)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform var(--transition)",
                    }}
                  />
                </div>
              </button>

              {/* Collapsible Body */}
              <div
                style={{
                  maxHeight: isOpen ? "2000px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div
                  style={{
                    padding: "0 1.5rem 1.5rem 1.5rem",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "1.25rem",
                  }}
                >
                  {day.summary && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        fontStyle: "italic",
                        marginBottom: "1.5rem",
                        lineHeight: 1.7,
                        borderLeft: "2px solid var(--accent-gold)",
                        paddingLeft: "1rem",
                      }}
                    >
                      {day.summary}
                    </p>
                  )}

                  {day.activities?.map((activity, aIdx) => (
                    <ActivityItem
                      key={activity._key || aIdx}
                      activity={activity}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
