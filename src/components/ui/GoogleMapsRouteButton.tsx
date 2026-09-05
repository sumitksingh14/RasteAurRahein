"use client";

import { ExternalLink, Map } from "lucide-react";
import { buildGoogleMapsUrl, type RouteStop } from "@/lib/googleMapsRoute";

interface GoogleMapsRouteButtonProps {
  origin: string;
  destination: string;
  waypoints?: RouteStop[];
  /** Optional extra CSS class */
  className?: string;
  /** Compact mode renders a smaller inline button */
  compact?: boolean;
}

export default function GoogleMapsRouteButton({
  origin,
  destination,
  waypoints,
  compact = false,
}: GoogleMapsRouteButtonProps) {
  if (!destination) return null;

  const url = buildGoogleMapsUrl(origin || destination, destination, waypoints);

  if (compact) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        id="google-maps-route-btn-compact"
        title="Open route in Google Maps"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.4rem 0.85rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-accent)",
          background: "var(--accent-gold-dim)",
          color: "var(--accent-gold)",
          fontSize: "0.78rem",
          fontWeight: 600,
          fontFamily: "var(--font-sans)",
          textDecoration: "none",
          whiteSpace: "nowrap",
          transition: "all var(--transition)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-gold)";
          (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-gold-dim)";
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-gold)";
        }}
      >
        <Map size={13} />
        Google Maps
        <ExternalLink size={11} />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      id="google-maps-route-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.85rem 1.5rem",
        borderRadius: "var(--radius-md)",
        border: "1.5px solid var(--border-accent)",
        background: "var(--accent-gold-dim)",
        color: "var(--accent-gold)",
        fontSize: "0.9rem",
        fontWeight: 600,
        fontFamily: "var(--font-sans)",
        textDecoration: "none",
        transition: "all var(--transition)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "pointer",
        width: "100%",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = "var(--accent-gold)";
        el.style.color = "#fff";
        el.style.boxShadow = "0 4px 16px rgba(254,187,2,0.3)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = "var(--accent-gold-dim)";
        el.style.color = "var(--accent-gold)";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
      }}
    >
      <Map size={18} />
      <span>
        {origin && origin !== destination
          ? `Open Route: ${origin} → ${destination}`
          : `Open ${destination} on Google Maps`}
      </span>
      <ExternalLink size={14} style={{ marginLeft: "auto", opacity: 0.7 }} />
    </a>
  );
}
