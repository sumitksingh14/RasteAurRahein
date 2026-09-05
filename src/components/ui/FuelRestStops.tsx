"use client";

import { Fuel, Coffee, Eye, Utensils, Banknote, Gauge, ExternalLink, MapPin, Navigation, Search, Sparkles } from "lucide-react";
import type { FuelStop } from "@/lib/types";

// ── Per-trip fuel & rest stop data ───────────────────────────────────────────
const FUEL_DATA: Record<string, FuelStop[]> = {
  "jyotirlinga-pilgrimage-road-trip": [
    { id: "jy_r1", name: "HP Pump, Nashik Phata", type: "fuel", town: "Nashik Phata, Pune", distanceFromPrev: 0, notes: "Fill up before Bhimashankar road. Mountain road ahead; last easy fuel station." },
    { id: "jy_r2", name: "Bhimashankar Forest Gate", type: "viewpoint", town: "Bhimashankar Wildlife Sanctuary", distanceFromPrev: 100, altitude: 1050, notes: "Check-in point for sanctuary. Beautiful Sahyadri forest trail starts here." },
    { id: "jy_r3", name: "Bhimashankar Temple Parking", type: "rest", town: "Bhimashankar", distanceFromPrev: 50, altitude: 1050, notes: "Park and walk 5 minutes to the Jyotirlinga. Keep temple dress code." },
    { id: "jy_r4", name: "BPCL Pump, Nashik", type: "fuel", town: "Nashik", distanceFromPrev: 120, notes: "Refuel before heading to Trimbakeshwar — 28 km ahead on NH-61." },
    { id: "jy_r5", name: "Trimbakeshwar Temple Area", type: "rest", town: "Trimbakeshwar", distanceFromPrev: 28, altitude: 750, notes: "Park at main lot. Walk to the temple ghats. Godavari river origin nearby." },
    { id: "jy_r6", name: "Brahmagiri Viewpoint", type: "viewpoint", town: "Brahmagiri Hill, Trimbakeshwar", distanceFromPrev: 5, altitude: 1298, notes: "Origin of River Godavari. 45-min trek from the base. Stunning valley view." },
    { id: "jy_r7", name: "Igatpuri Rest Stop", type: "food", town: "Igatpuri, NH-3", distanceFromPrev: 60, notes: "MTDC rest area on the Nashik–Aurangabad highway; good thali and restrooms." },
    { id: "jy_r8", name: "IOC Pump, Aurangabad", type: "fuel", town: "Aurangabad (Chhatrapati Sambhajinagar)", distanceFromPrev: 135, notes: "Full refuel before visiting Ellora and Grishneshwar." },
    { id: "jy_r9", name: "Grishneshwar Temple Lot", type: "rest", town: "Ellora Village", distanceFromPrev: 30, notes: "Park at designated lot. 5-minute walk to the temple. Photography not allowed inside." },
    { id: "jy_r10", name: "Ellora Caves Ticket Counter", type: "viewpoint", town: "Ellora, Aurangabad", distanceFromPrev: 1, notes: "UNESCO World Heritage Site. Budget 3–4 hours; hire a licensed guide." },
    { id: "jy_r11", name: "SBI ATM, Aurangabad", type: "atm", town: "Aurangabad", distanceFromPrev: 30, notes: "Withdraw cash before the Indore–Ujjain stretch. ATMs sparse on NH-52 through Madhya Pradesh." },
    { id: "jy_r12", name: "BPCL Pump, Jalgaon", type: "fuel", town: "Jalgaon, Maharashtra", distanceFromPrev: 130, notes: "Refuel on the Aurangabad–Indore highway. Long stretch to Indore ahead." },
    { id: "jy_r13", name: "Indore Bypass Rest", type: "food", town: "Indore Ring Road", distanceFromPrev: 220, notes: "Quick stop for Indori Poha and chai before the final 55 km to Ujjain." },
    { id: "jy_r14", name: "HPCL Pump, Ujjain", type: "fuel", town: "Ujjain, Madhya Pradesh", distanceFromPrev: 55, notes: "Top up before Omkareshwar. Station is 2 km from the Mahakaleshwar temple gate." },
    { id: "jy_r15", name: "Mahakaleshwar Temple Gate", type: "rest", town: "Ujjain", distanceFromPrev: 2, notes: "Park at sanctioned lot. Attend the Bhasma Aarti (4 AM) and Sandhya Aarti (7 PM)." },
    { id: "jy_r16", name: "Ram Ghat, Shipra River", type: "viewpoint", town: "Ujjain Ghats", distanceFromPrev: 1, notes: "Evening river walk. Aarti at sunset. Tea stalls line the ghat — great photo spot." },
    { id: "jy_r17", name: "Omkareshwar Bridge Fuel", type: "fuel", town: "Omkareshwar Road, MP", distanceFromPrev: 120, notes: "Small pump near the Narmada bridge. Last fuel before the island pilgrimage." },
    { id: "jy_r18", name: "Mandhata Island Ferry Ghat", type: "rest", town: "Omkareshwar", distanceFromPrev: 5, notes: "Leave vehicles at the mainland lot; cross via foot bridge or short boat to the island." },
    { id: "jy_r19", name: "Narmada River Boat Launch", type: "viewpoint", town: "Omkareshwar Island", distanceFromPrev: 1, notes: "Best views of the twin shrines from the water. Life vests mandatory on the boat." },
  ],
  "spiti-valley": [
    { id: "r1", name: "HPCL Pump, Manali", type: "fuel", town: "Manali", distanceFromPrev: 0, notes: "FILL UP FULLY — next reliable fuel is 210 km away." },
    { id: "r2", name: "Dhaba at Gramphu", type: "food", town: "Gramphu Junction", distanceFromPrev: 75, notes: "Last chai before Kunzum Pass. Also last mobile signal zone." },
    { id: "r3", name: "Kunzum Pass Top", type: "viewpoint", town: "Kunzum Pass", distanceFromPrev: 45, altitude: 4590, notes: "Mandatory puja stop; keep it under 30 min — altitude affects breathing." },
    { id: "r4", name: "HPCL Pump, Kaza", type: "fuel", town: "Kaza", distanceFromPrev: 90, notes: "Only pump in Spiti Valley. Also has ATM — withdraw enough cash." },
    { id: "r5", name: "Losar Dhaba", type: "food", town: "Losar", distanceFromPrev: 55, notes: "Only food stop between Chandratal and Kaza." },
    { id: "r6", name: "Ki Monastery Rest Area", type: "rest", town: "Ki, near Kaza", distanceFromPrev: 12, altitude: 4166, notes: "Toilets and a small chai stall. Stunning views." },
    { id: "r7", name: "Fuel Point, Tabo", type: "fuel", town: "Tabo", distanceFromPrev: 47, notes: "Small pump — may be out of stock on busy season days." },
    { id: "r8", name: "SBI ATM, Reckong Peo", type: "atm", town: "Reckong Peo", distanceFromPrev: 120, notes: "Withdraw before heading to Sangla — no ATMs further." },
    { id: "r9", name: "HPCL, Rampur", type: "fuel", town: "Rampur Bushahr", distanceFromPrev: 95, notes: "Final Spiti circuit fuel before Shimla highway." },
  ],
  "rajasthan-desert-kingdom": [
    { id: "rj1", name: "HP Pump, Jaipur (exit)", type: "fuel", town: "Jaipur", distanceFromPrev: 0, notes: "Fill up before NH48 — fuel stations sparse in desert stretches." },
    { id: "rj2", name: "Dhani Dhaba, Ajmer Road", type: "food", town: "Ajmer Road (NH48)", distanceFromPrev: 135, notes: "Great Rajasthani thali; recommended rest stop." },
    { id: "rj3", name: "BPCL Pump, Jodhpur", type: "fuel", town: "Jodhpur", distanceFromPrev: 210, notes: "Fill here before Jaisalmer road." },
    { id: "rj4", name: "Keru Dhaba, Barmer Road", type: "rest", town: "Barmer Road", distanceFromPrev: 90, notes: "Only shade and water for 100 km." },
    { id: "rj5", name: "Indian Oil, Jaisalmer", type: "fuel", town: "Jaisalmer", distanceFromPrev: 185, notes: "Fill here before Sam Dunes — Sam has no fuel." },
    { id: "rj6", name: "Sam Sand Dunes Viewpoint", type: "viewpoint", town: "Sam, Jaisalmer", distanceFromPrev: 42, notes: "Best sunset in Rajasthan — arrive by 5:30 PM." },
  ],
  "mysore-coorg-wayanad-ooty": [
    { id: "mc1", name: "HPCL, Mysore outskirts", type: "fuel", town: "Mysore", distanceFromPrev: 0 },
    { id: "mc2", name: "Viewpoint, Madikeri Ghat", type: "viewpoint", town: "Madikeri Ghats", distanceFromPrev: 120, notes: "15-minute walk to Raja's Seat viewpoint — worth it." },
    { id: "mc3", name: "Coorg Coffee Stall", type: "food", town: "Virajpet", distanceFromPrev: 35, notes: "Try fresh estate coffee — ₹20 a cup." },
    { id: "mc4", name: "BPCL, Mananthavady", type: "fuel", town: "Mananthavady, Wayanad", distanceFromPrev: 65, notes: "Fill here before Wayanad hills." },
    { id: "mc5", name: "Ooty Lake Parking", type: "rest", town: "Ooty", distanceFromPrev: 95, notes: "Paid parking ₹50; crowded on weekends — visit early morning." },
  ],
  "goa-beyond-beaches": [
    { id: "ga1", name: "HP Pump, Panaji", type: "fuel", town: "Panaji", distanceFromPrev: 0 },
    { id: "ga2", name: "Calangute Beach Promenade", type: "rest", town: "Calangute", distanceFromPrev: 16, notes: "Park near the Infantaria Café." },
    { id: "ga3", name: "Arambol Viewpoint", type: "viewpoint", town: "Arambol", distanceFromPrev: 30, notes: "Sweet Lake and sunset views — 20-min walk from parking." },
    { id: "ga4", name: "BPCL, Margao", type: "fuel", town: "Margao (South Goa)", distanceFromPrev: 60, notes: "Fill before heading to Palolem." },
  ],
  "sikkim-7-days": [
    { id: "sk1", name: "HPCL, Siliguri", type: "fuel", town: "Siliguri", distanceFromPrev: 0, notes: "Fill up — no fuel in Sikkim for 100+ km stretches." },
    { id: "sk2", name: "Rangpo Fuel Pump", type: "fuel", town: "Rangpo (Sikkim Entry)", distanceFromPrev: 80, notes: "Show Sikkim permit here. Last easy fuel before Gangtok." },
    { id: "sk3", name: "Nathula Pass Viewpoint (if permit)", type: "viewpoint", town: "Nathu La", distanceFromPrev: 55, altitude: 4310, notes: "India-China border. Need protected area permit booked in advance." },
    { id: "sk4", name: "Rumtek Monastery Rest Stop", type: "rest", town: "Rumtek", distanceFromPrev: 24, notes: "Beautiful monastery with small cafeteria." },
  ],
  "meghalaya-5-days": [
    { id: "mg1", name: "BPCL, Guwahati", type: "fuel", town: "Guwahati", distanceFromPrev: 0, notes: "Fill up before Meghalaya entry." },
    { id: "mg2", name: "Shillong Peak Viewpoint", type: "viewpoint", town: "Shillong", distanceFromPrev: 105, altitude: 1966, notes: "360° view of Shillong city and surrounding hills." },
    { id: "mg3", name: "Cherrapunji Fuel Station", type: "fuel", town: "Cherrapunji (Sohra)", distanceFromPrev: 56 },
    { id: "mg4", name: "Dawki River Bank", type: "rest", town: "Dawki", distanceFromPrev: 100, notes: "Park and walk to the crystal-clear Umngot riverbank." },
  ],
  "kerala-7-days": [
    { id: "kl1", name: "HP Pump, Cochin airport road", type: "fuel", town: "Kochi", distanceFromPrev: 0 },
    { id: "kl2", name: "Alleppey Boat Jetty", type: "rest", town: "Alleppey", distanceFromPrev: 55, notes: "Houseboat boarding point — arrive 30 min early." },
    { id: "kl3", name: "BPCL, Kottayam", type: "fuel", town: "Kottayam", distanceFromPrev: 45 },
    { id: "kl4", name: "Munnar Tea Garden Overlook", type: "viewpoint", town: "Top Station, Munnar", distanceFromPrev: 95, altitude: 1700, notes: "Best sunrise viewpoint in Munnar; arrive before 7 AM." },
    { id: "kl5", name: "Thekkady (Periyar) Entry", type: "rest", town: "Thekkady", distanceFromPrev: 85, notes: "Boat safari booking counter is right at the gate." },
  ],
  "munsiyari-6-days": [
    { id: "mn1", name: "IOC Pump, Haldwani", type: "fuel", town: "Haldwani", distanceFromPrev: 0, notes: "Fill here — last reliable pump before mountain roads." },
    { id: "mn2", name: "Almora Rest Stop", type: "rest", town: "Almora", distanceFromPrev: 90, notes: "Great views and the famous Almora Bal Mithai sweet shops." },
    { id: "mn3", name: "BPCL, Pithoragarh", type: "fuel", town: "Pithoragarh", distanceFromPrev: 100 },
    { id: "mn4", name: "Birthi Waterfall Viewpoint", type: "viewpoint", town: "Birthi Falls", distanceFromPrev: 65, notes: "140m waterfall — short 10-min walk from road." },
    { id: "mn5", name: "Thal Fuel Stop", type: "fuel", town: "Thal", distanceFromPrev: 28, notes: "Last fuel before Munsiyari." },
    { id: "mn6", name: "Khaliya Top Start", type: "rest", town: "Munsiyari", distanceFromPrev: 30, altitude: 2200, notes: "Park at Khaliya Top trailhead; overnight camping gear pickup." },
  ],
  "char-dham-yatra-uttarakhand": [
    { id: "cd1", name: "HPCL, Rishikesh", type: "fuel", town: "Rishikesh", distanceFromPrev: 0, notes: "Fill up before Devprayag ghats — mountain roads ahead." },
    { id: "cd2", name: "Devprayag Sangam Viewpoint", type: "viewpoint", town: "Devprayag", distanceFromPrev: 72, notes: "Bhagirathi meets Alaknanda — sacred confluence, quick stop." },
    { id: "cd3", name: "Fuel, Rudraprayag", type: "fuel", town: "Rudraprayag", distanceFromPrev: 67 },
    { id: "cd4", name: "Gaurikund Parking Lot", type: "rest", town: "Gaurikund", distanceFromPrev: 75, notes: "Vehicle stays here; 22 km trek to Kedarnath starts." },
    { id: "cd5", name: "Fuel, Joshimath", type: "fuel", town: "Joshimath", distanceFromPrev: 178, notes: "Top up before Badrinath — next pump is far." },
  ],
  "panch-kedar-trek-10-days": [
    { id: "pk1", name: "HPCL, Rishikesh", type: "fuel", town: "Rishikesh", distanceFromPrev: 0, notes: "Fill up — no vehicle fuel beyond Chopta." },
    { id: "pk2", name: "Chopta Trailhead Parking", type: "rest", town: "Chopta", distanceFromPrev: 225, altitude: 2900, notes: "Leave vehicle here. Tungnath shrine is 3.5 km trek." },
    { id: "pk3", name: "Madhyamaheshwar Base Camp", type: "rest", town: "Ransi Village", distanceFromPrev: 120, notes: "Drive back to Ukhimath; Ransi is the trek start for Madhyamaheshwar." },
  ],
  "pune-konkan-coast-raigad": [
    { id: "pu1", name: "HP Pump, Pune exit", type: "fuel", town: "Pune", distanceFromPrev: 0, notes: "Fill before NH66 coastal highway." },
    { id: "pu2", name: "Tamhini Ghat Viewpoint", type: "viewpoint", town: "Tamhini Ghat", distanceFromPrev: 65, notes: "Stunning Sahyadri waterfall views in monsoon/post-monsoon." },
    { id: "pu3", name: "Murud Beach Rest", type: "rest", town: "Murud", distanceFromPrev: 75, notes: "Ferry to Janjira Fort leaves from here — check tide times." },
    { id: "pu4", name: "BPCL, Diveagar", type: "fuel", town: "Diveagar", distanceFromPrev: 55, notes: "Small pump — may close early." },
    { id: "pu5", name: "Shrivardhan Beach Cafe", type: "food", town: "Shrivardhan", distanceFromPrev: 30, notes: "Fresh coconut and seafood right on the beach." },
  ],
};

const DEFAULT_STOPS: FuelStop[] = [
  { id: "def1", name: "Local Petrol Pump", type: "fuel", town: "Nearest Town", notes: "Check Google Maps for 'petrol pump near me' en route." },
  { id: "def2", name: "Roadside Dhaba", type: "food", town: "Highway", notes: "Indian highways always have dhabas every 50-70 km." },
];

const STOP_ICONS: Record<FuelStop["type"], React.ReactNode> = {
  fuel: <Fuel size={16} />, rest: <Coffee size={16} />, food: <Utensils size={16} />,
  viewpoint: <Eye size={16} />, atm: <Banknote size={16} />,
};

const STOP_COLORS: Record<FuelStop["type"], { bg: string; border: string; color: string }> = {
  fuel: { bg: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.4)", color: "#fbbf24" },
  rest: { bg: "rgba(94,234,212,0.15)", border: "rgba(94,234,212,0.4)", color: "var(--accent-teal)" },
  food: { bg: "rgba(249,168,212,0.15)", border: "rgba(249,168,212,0.4)", color: "var(--accent-rose)" },
  viewpoint: { bg: "rgba(137,180,250,0.15)", border: "rgba(137,180,250,0.4)", color: "var(--accent-gold)" },
  atm: { bg: "rgba(166,227,161,0.15)", border: "rgba(166,227,161,0.4)", color: "#a6e3a1" },
};

const STOP_LABELS: Record<FuelStop["type"], string> = {
  fuel: "Fuel Station", rest: "Rest Stop", food: "Food Stop",
  viewpoint: "Viewpoint", atm: "ATM",
};

interface FuelRestStopsProps {
  tripSlug: string;
  tripTitle?: string;
}

export default function FuelRestStops({ tripSlug, tripTitle }: FuelRestStopsProps) {
  const stops = FUEL_DATA[tripSlug] || DEFAULT_STOPS;
  const totalDistance = stops.reduce((sum, s) => sum + (s.distanceFromPrev || 0), 0);
  const destination = tripTitle || tripSlug.replace(/-/g, " ");

  // Build a Google Maps multi-stop directions URL from all towns
  const waypoints = stops.map((s) => encodeURIComponent(s.town)).join("|");
  const mapsRouteUrl = stops.length >= 2
    ? `https://www.google.com/maps/dir/${encodeURIComponent(stops[0].town)}/${encodeURIComponent(stops[stops.length - 1].town)}/?waypoints=${waypoints}`
    : `https://www.google.com/maps/search/${encodeURIComponent(destination)}`;

  const fuelSearchUrl = `https://www.google.com/maps/search/petrol+pump+near+${encodeURIComponent(destination)}`;
  const tollSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(destination + " toll charges highway route")}`;

  return (
    <div className="fuel-stops">
      {/* Header */}
      <div className="fuel-stops-header">
        <div>
          <p className="fuel-intro">
            Essential waypoints, fuel stations, viewpoints, and rest stops for this road trip.
          </p>
        </div>
        <div className="fuel-total-badge">
          <Gauge size={14} />
          {totalDistance > 0 ? `~${totalDistance.toLocaleString()} km total` : "Route overview"}
        </div>
      </div>

      {/* AI + Quick links bar */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem",
        marginBottom: "1.25rem", padding: "0.7rem 0.9rem",
        borderRadius: "var(--radius-md)",
        background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)",
      }}>
        <Sparkles size={13} style={{ color: "#a78bfa", flexShrink: 0 }} />
        <span style={{ fontSize: "0.72rem", color: "#a78bfa", fontWeight: 600 }}>AI-curated route</span>
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", flex: 1 }}>
          · Live fuel prices & road conditions may vary.
        </span>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <a href={mapsRouteUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.7rem", borderRadius: 20,
              border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.08)",
              color: "#4ade80", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
            }}>
            <Navigation size={11} /> Full Route
          </a>
          <a href={fuelSearchUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.7rem", borderRadius: 20,
              border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)",
              color: "#fbbf24", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
            }}>
            <Fuel size={11} /> Find Fuel
          </a>
          <a href={tollSearchUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.7rem", borderRadius: 20,
              border: "1px solid var(--border)", background: "var(--bg-card)",
              color: "var(--text-secondary)", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
            }}>
            <Search size={11} /> Toll Info
          </a>
        </div>
      </div>

      {/* Legend */}
      <div className="fuel-legend">
        {(Object.keys(STOP_LABELS) as FuelStop["type"][]).map((type) => (
          <span key={type} className="fuel-legend-item" style={{ color: STOP_COLORS[type].color }}>
            {STOP_ICONS[type]}
            {STOP_LABELS[type]}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="fuel-timeline">
        {stops.map((stop, idx) => {
          const { bg, border, color } = STOP_COLORS[stop.type];
          const isLast = idx === stops.length - 1;
          const stopMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(stop.name + " " + stop.town)}`;
          const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stop.town)}&travelmode=driving`;

          return (
            <div key={stop.id} className="fuel-stop-item">
              {/* Timeline connector */}
              <div className="fuel-stop-connector">
                <div
                  className="fuel-stop-dot"
                  style={{ background: bg, border: `2px solid ${border}`, color }}
                >
                  {STOP_ICONS[stop.type]}
                </div>
                {!isLast && <div className="fuel-stop-line" />}
              </div>

              {/* Content */}
              <div className="fuel-stop-content glass-card">
                <div className="fuel-stop-top">
                  <div>
                    <span className="fuel-stop-type-badge" style={{ background: bg, color, border: `1px solid ${border}` }}>
                      {STOP_LABELS[stop.type]}
                    </span>
                    <h3 className="fuel-stop-name">{stop.name}</h3>
                    <div className="fuel-stop-meta">
                      <span>📍 {stop.town}</span>
                      {stop.altitude && <span>⛰️ {stop.altitude.toLocaleString()} m</span>}
                    </div>
                  </div>
                  {stop.distanceFromPrev !== undefined && stop.distanceFromPrev > 0 && (
                    <div className="fuel-distance-badge">
                      +{stop.distanceFromPrev} km
                    </div>
                  )}
                </div>
                {stop.notes && (
                  <p className="fuel-stop-notes">💡 {stop.notes}</p>
                )}
                {/* Per-stop action links */}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem", flexWrap: "wrap" }}>
                  <a href={stopMapsUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.3rem",
                      padding: "0.25rem 0.6rem", borderRadius: 20,
                      border: `1px solid ${border}`, background: bg,
                      color, fontSize: "0.7rem", fontWeight: 600, textDecoration: "none",
                    }}>
                    <MapPin size={10} /> View on Maps
                  </a>
                  <a href={navUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.3rem",
                      padding: "0.25rem 0.6rem", borderRadius: 20,
                      border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.07)",
                      color: "#4ade80", fontSize: "0.7rem", fontWeight: 600, textDecoration: "none",
                    }}>
                    <Navigation size={10} /> Navigate
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom strip */}
      <div style={{
        marginTop: "1.5rem", padding: "0.85rem 1rem",
        borderRadius: "var(--radius-md)", border: "1px dashed var(--border)",
        display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center",
      }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          🗺️ More tools:
        </span>
        {[
          { label: "Google Maps Route", url: mapsRouteUrl },
          { label: "Petrol Prices India", url: "https://www.goodreturns.in/petrol-price.html" },
          { label: "NHAI Toll Calculator", url: "https://www.nhaihelp.com" },
          { label: "Weather en route", url: `https://www.google.com/search?q=${encodeURIComponent("weather " + destination)}` },
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
