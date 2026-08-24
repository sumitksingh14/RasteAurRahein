"use client";

// IMPORTANT: CSS must be imported at module-level (not inside useEffect)
// This file is only ever loaded client-side via dynamic() in MapView.tsx
import "leaflet/dist/leaflet.css";

import { useEffect, useRef, useState } from "react";
import type { MapPin } from "@/lib/types";

interface LeafletMapInnerProps {
  pins: MapPin[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height: number;
}

export default function LeafletMapInner({
  pins,
  center,
  zoom = 8,
  height,
}: LeafletMapInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Guard: already mounted
    if (mapRef.current) return;
    if (!containerRef.current) return;

    let cancelled = false;

    const init = async () => {
      try {
        const L = (await import("leaflet")).default;

        if (cancelled || !containerRef.current) return;

        // Fix broken default marker icons when bundled with webpack/turbopack
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        // Calculate map center
        const mapCenter: [number, number] =
          center?.lat && center?.lng
            ? [center.lat, center.lng]
            : pins.length > 0
            ? [
                pins.reduce((s, p) => s + p.lat, 0) / pins.length,
                pins.reduce((s, p) => s + p.lng, 0) / pins.length,
              ]
            : [32.2, 78.0]; // Spiti Valley default

        const map = L.map(containerRef.current, {
          zoomControl: true,
          scrollWheelZoom: false,
          attributionControl: true,
        }).setView(mapCenter, zoom);

        mapRef.current = map;

        // ── Tile layer ─────────────────────────────────────────────────────
        // CartoDB Dark Matter — completely FREE, no API key, OSM-licensed
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 20,
          }
        ).addTo(map);

        // ── Custom gold teardrop marker ────────────────────────────────────
        const goldIcon = L.divIcon({
          html: `
            <div style="
              width: 22px;
              height: 22px;
              background: linear-gradient(135deg, #c9a84c, #e8c878);
              border: 2.5px solid #fff;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              box-shadow: 0 3px 10px rgba(201,168,76,0.55), 0 1px 3px rgba(0,0,0,0.4);
            "></div>`,
          className: "", // remove default Leaflet white box
          iconSize: [22, 22],
          iconAnchor: [11, 22],  // point of the tear drop
          popupAnchor: [0, -26],
        });

        // ── Markers ────────────────────────────────────────────────────────
        pins.forEach((pin) => {
          if (!pin.lat || !pin.lng) return;
          const dayBadge = pin.day
            ? `<span style="font-size:11px;color:#c9a84c;font-weight:600;">Day ${pin.day}</span><br>`
            : "";
          L.marker([pin.lat, pin.lng], { icon: goldIcon })
            .addTo(map)
            .bindPopup(
              `<div style="font-family:Inter,sans-serif;font-size:13px;min-width:110px;padding:2px 0;">
                ${dayBadge}
                <strong style="color:#f0ede8">${pin.label}</strong>
              </div>`,
              { maxWidth: 220, className: "wc-popup" }
            );
        });

        // ── Route polyline ─────────────────────────────────────────────────
        if (pins.length > 1) {
          const coords = pins
            .filter((p) => p.lat && p.lng)
            .map((p) => [p.lat, p.lng] as [number, number]);
          L.polyline(coords, {
            color: "#c9a84c",
            weight: 2.5,
            opacity: 0.7,
            dashArray: "8 5",
            lineJoin: "round",
          }).addTo(map);
        }

        setLoaded(true);
      } catch (err) {
        console.error("[LeafletMap] init failed:", err);
        setError("Map failed to load.");
      }
    };

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount; pins/zoom passed at mount time

  if (error) {
    return (
      <div
        style={{
          height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          background: "var(--bg-card)",
          border: "1px dashed var(--border)",
          borderRadius: "var(--radius-md)",
          color: "var(--text-muted)",
          fontSize: "0.875rem",
        }}
      >
        <span>🗺️</span>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        height,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--border)",
      }}
    >
      {/* Skeleton while tiles load */}
      {!loaded && (
        <div
          className="skeleton"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            borderRadius: "var(--radius-md)",
          }}
        />
      )}

      {/* The actual Leaflet mount point */}
      <div
        ref={containerRef}
        style={{
          height: "100%",
          width: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Popup theme override — injected once into the document */}
      <style>{`
        .wc-popup .leaflet-popup-content-wrapper {
          background: #1a1a26 !important;
          border: 1px solid rgba(201,168,76,0.25) !important;
          border-radius: 10px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
          color: #f0ede8 !important;
        }
        .wc-popup .leaflet-popup-tip {
          background: #1a1a26 !important;
        }
        .leaflet-control-zoom a {
          background: #1a1a26 !important;
          color: #a8a4a0 !important;
          border-color: rgba(255,255,255,0.08) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #20202e !important;
          color: #c9a84c !important;
        }
        .leaflet-control-attribution {
          background: rgba(10,10,15,0.7) !important;
          color: #6b6870 !important;
          font-size: 10px !important;
          backdrop-filter: blur(4px);
        }
        .leaflet-control-attribution a {
          color: #c9a84c !important;
        }
      `}</style>
    </div>
  );
}
