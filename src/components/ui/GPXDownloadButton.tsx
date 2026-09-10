"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";
import type { Trip } from "@/lib/types";
import { extractTripWaypoints, generateGPXContent, downloadGPXFile } from "@/lib/gpxExporter";

interface GPXDownloadButtonProps {
  trip: Trip;
  variant?: "button" | "pill" | "outline";
  style?: React.CSSProperties;
}

export default function GPXDownloadButton({
  trip,
  variant = "outline",
  style = {},
}: GPXDownloadButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const waypoints = extractTripWaypoints(trip);
    if (waypoints.length === 0) {
      alert("No GPS coordinates found for this trip route.");
      return;
    }
    const gpxContent = generateGPXContent(trip.title, waypoints);
    downloadGPXFile(`${trip.slug}-route.gpx`, gpxContent);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const isPill = variant === "pill";

  return (
    <button
      onClick={handleDownload}
      title="Download GPS route (.GPX) for Strava, Garmin, Gaia GPS, or Google Earth"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: isPill ? "0.35rem 0.75rem" : "0.55rem 1rem",
        borderRadius: isPill ? "100px" : "var(--radius-sm)",
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        color: downloaded ? "#10b981" : "var(--text-secondary)",
        fontSize: isPill ? "0.78rem" : "0.85rem",
        fontWeight: 500,
        fontFamily: "var(--font-sans)",
        cursor: "pointer",
        transition: "all var(--transition)",
        whiteSpace: "nowrap",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-accent)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--accent-gold)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLButtonElement).style.color = downloaded ? "#10b981" : "var(--text-secondary)";
      }}
    >
      {downloaded ? <Check size={14} color="#10b981" /> : <Download size={14} />}
      <span>{downloaded ? "GPX Downloaded!" : "Export GPX Route"}</span>
    </button>
  );
}
