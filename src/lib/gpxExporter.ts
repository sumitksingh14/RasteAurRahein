import type { Trip, ItineraryDay, Activity } from "./types";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface Waypoint {
  lat: number;
  lng: number;
  name: string;
  desc?: string;
  type?: string;
  time?: string;
  day?: number;
}

export function extractTripWaypoints(trip: Trip): Waypoint[] {
  const waypoints: Waypoint[] = [];
  if (!trip.itinerary) return waypoints;

  trip.itinerary.forEach((day: ItineraryDay) => {
    day.activities?.forEach((act: Activity) => {
      if (act.location && typeof act.location.lat === "number" && typeof act.location.lng === "number") {
        waypoints.push({
          lat: act.location.lat,
          lng: act.location.lng,
          name: act.location.name || act.title,
          desc: act.description || act.notes || `${act.title} (Day ${day.dayNumber})`,
          type: act.type || "activity",
          time: act.time,
          day: day.dayNumber,
        });
      }
    });
  });

  return waypoints;
}

/**
 * Generate standard GPX 1.1 XML file content
 */
export function generateGPXContent(tripTitle: string, waypoints: Waypoint[]): string {
  const safeTitle = escapeXml(tripTitle);
  const nowIso = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Raste Aur Raahein - https://rasteaurraahein.com"
  xmlns="http://www.topografix.com/GPX/1/1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${safeTitle}</name>
    <desc>GPS Waypoints and Route for ${safeTitle} curated by Raste Aur Raahein</desc>
    <time>${nowIso}</time>
    <author>
      <name>Raste Aur Raahein</name>
    </author>
  </metadata>
`;

  // Add individual waypoints
  waypoints.forEach((wp) => {
    const sym = wp.type === "accommodation" ? "Hotel" : wp.type === "food" ? "Restaurant" : wp.type === "sightseeing" ? "Scenic Area" : "Waypoint";
    xml += `  <wpt lat="${wp.lat}" lon="${wp.lng}">
    <name>${escapeXml(wp.name)}</name>
    <desc>${escapeXml(wp.desc || "")}</desc>
    <sym>${sym}</sym>
    <type>${escapeXml(wp.type || "activity")}</type>
  </wpt>\n`;
  });

  // Add track sequence
  if (waypoints.length > 0) {
    xml += `  <trk>
    <name>${safeTitle} Route Track</name>
    <desc>Chronological itinerary route</desc>
    <trkseg>\n`;
    waypoints.forEach((wp) => {
      xml += `      <trkpt lat="${wp.lat}" lon="${wp.lng}">
        <name>${escapeXml(wp.name)}</name>
      </trkpt>\n`;
    });
    xml += `    </trkseg>
  </trk>\n`;
  }

  xml += `</gpx>`;
  return xml;
}

/**
 * Trigger client-side download of the GPX file
 */
export function downloadGPXFile(filename: string, gpxContent: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([gpxContent], { type: "application/gpx+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".gpx") ? filename : `${filename}.gpx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
