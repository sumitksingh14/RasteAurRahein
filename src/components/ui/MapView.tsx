/**
 * MapView — public API wrapper around LeafletMapInner.
 *
 * Why the split?
 *   • Leaflet requires a DOM (window/document) — it cannot run on the server.
 *   • `import "leaflet/dist/leaflet.css"` must be a static top-level import,
 *     NOT a dynamic `await import(…)` inside useEffect (Next.js ignores the latter).
 *   • Solution: put both the CSS import and all Leaflet code inside
 *     LeafletMapInner.tsx, then load it here with `dynamic({ ssr: false })`.
 *     Next.js will only bundle and execute that file in the browser.
 *
 * Tile provider: CartoDB Dark Matter (https://carto.com/basemaps/)
 *   ✅ Free — no API key, no rate-limit for typical blog traffic
 *   ✅ OSM-licensed data
 *   ✅ Dark aesthetic that matches the site theme
 */

import dynamic from "next/dynamic";
import type { MapPin } from "@/lib/types";
import { MapPin as MapPinIcon } from "lucide-react";

// Lazy-load the real map only in the browser
const LeafletMapInner = dynamic(
  () => import("@/components/ui/LeafletMapInner"),
  {
    ssr: false,
    loading: () => (
      <div
        className="skeleton"
        style={{
          height: "var(--map-height, 400px)",
          width: "100%",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border)",
        }}
      />
    ),
  }
);

export interface MapViewProps {
  /** Array of pins to render on the map */
  pins: MapPin[];
  /** Optional explicit map centre; defaults to the average of all pins */
  center?: { lat: number; lng: number };
  /** Initial zoom level (1–18). Defaults to 8 */
  zoom?: number;
  /** Map container height in pixels. Defaults to 400 */
  height?: number;
}

/**
 * Drop-in map component — renders a Leaflet map with:
 *   - CartoDB Dark Matter tiles (zero cost, no API key)
 *   - Gold teardrop markers per pin
 *   - Dashed gold polyline connecting stops in order
 *   - Dark-themed popups & controls matching the site design system
 *   - Skeleton loader while tiles initialise
 *   - Error fallback if Leaflet fails
 */
export default function MapView({
  pins,
  center,
  zoom = 8,
  height = 400,
}: MapViewProps) {
  // If called with no pins at all, show a graceful placeholder rather
  // than an empty dark square.
  if (!pins || pins.length === 0) {
    return (
      <div
        style={{
          height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          background: "var(--bg-card)",
          border: "1px dashed var(--border)",
          borderRadius: "var(--radius-md)",
          color: "var(--text-muted)",
          fontSize: "0.875rem",
        }}
      >
        <MapPinIcon size={28} style={{ opacity: 0.35 }} />
        <span>No location data for this trip yet</span>
      </div>
    );
  }

  return (
    // CSS custom property lets the skeleton match the final height
    // before the JS bundle loads.
    <div style={{ "--map-height": `${height}px` } as React.CSSProperties}>
      <LeafletMapInner pins={pins} center={center} zoom={zoom} height={height} />
    </div>
  );
}
