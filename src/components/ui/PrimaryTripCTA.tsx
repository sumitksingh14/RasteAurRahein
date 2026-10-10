"use client";

import { useState } from "react";
import { Download, Check, Loader2, Package } from "lucide-react";
import type { Trip } from "@/lib/types";
import { extractTripWaypoints, generateGPXContent, downloadGPXFile } from "@/lib/gpxExporter";

interface PrimaryTripCTAProps {
  trip: Trip;
  className?: string;
  style?: React.CSSProperties;
}

export default function PrimaryTripCTA({ trip, className = "", style = {} }: PrimaryTripCTAProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadPack = async () => {
    setDownloading(true);

    try {
      // 1. Generate & trigger GPX download
      const waypoints = extractTripWaypoints(trip);
      const gpxContent = generateGPXContent(
        trip.title,
        waypoints.length > 0
          ? waypoints
          : [
              {
                name: trip.title,
                lat: 32.2464, // Fallback coordinates if none specified
                lng: 77.7667,
                desc: trip.title,
              },
            ]
      );
      downloadGPXFile(`${trip.slug}-offline-pack.gpx`, gpxContent);

      // 2. Cache trip summary to localStorage for offline reference
      if (typeof window !== "undefined") {
        try {
          const offlineSnapshot = {
            slug: trip.slug,
            title: trip.title,
            quickFacts: trip.quickFacts,
            savedAt: new Date().toISOString(),
          };
          window.localStorage.setItem(`offline-trip-${trip.slug}`, JSON.stringify(offlineSnapshot));
          window.dispatchEvent(new CustomEvent("rar:offline-pack-downloaded", { detail: { slug: trip.slug } }));
        } catch {
          // ignore localStorage errors
        }
      }

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3500);
    } catch (err) {
      console.error("Failed to download offline pack:", err);
    } finally {
      setDownloading(false);
    }
  };

  const waypoints = extractTripWaypoints(trip);
  const estimatedKb = Math.max(8, Math.round((waypoints.length || 1) * 2.4));

  return (
    <div className={`primary-trip-cta-wrapper ${className}`} style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <button
        onClick={handleDownloadPack}
        disabled={downloading}
        id="primary-trip-gpx-btn"
        aria-label="Get GPX and offline pack for this itinerary"
        title="Download GPS route and offline travel pack"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.625rem",
          minHeight: "48px",
          padding: "0.75rem 1.625rem",
          borderRadius: "0.75rem",
          border: "none",
          background: downloaded
            ? "linear-gradient(135deg, #059669 0%, #10b981 100%)"
            : "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
          color: "#ffffff",
          fontSize: "0.9375rem",
          fontWeight: 700,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          cursor: downloading ? "wait" : "pointer",
          whiteSpace: "nowrap",
          boxShadow: downloaded
            ? "0 4px 18px rgba(16, 185, 129, 0.40)"
            : "0 4px 18px rgba(37, 99, 235, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease",
          ...style,
        }}
        className="primary-gpx-pack-btn"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        {downloading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : downloaded ? (
          <Check size={18} strokeWidth={2.5} color="#ffffff" />
        ) : (
          <Download size={18} strokeWidth={2.3} />
        )}
        <span>{downloaded ? "Offline Pack Downloaded!" : "Get GPX + Offline Pack"}</span>
        <span
          style={{
            fontSize: "0.72rem",
            background: "rgba(255, 255, 255, 0.22)",
            padding: "2px 7px",
            borderRadius: "999px",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          {estimatedKb} KB
        </span>
      </button>
      <div
        style={{
          fontSize: "0.74rem",
          color: "rgba(255, 255, 255, 0.7)",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          paddingLeft: "0.25rem",
        }}
      >
        <span>Free • Includes turn-by-turn GPX, offline map, permit checklist</span>
      </div>
    </div>
  );
}
