"use client";

import { Phone, ExternalLink, MapPin, Star, Wifi, Car, Utensils, Droplets } from "lucide-react";
import type { HotelSuggestion } from "@/lib/types";

// ── Per-trip hotel & homestay data ────────────────────────────────────────────
const STAY_DATA: Record<string, HotelSuggestion[]> = {
  "spiti-valley": [
    {
      id: "s1",
      name: "Getaway Stays Manali",
      type: "hotel",
      stars: 3,
      avgPricePerNight: 2500,
      town: "Manali",
      contact: "+91-98050-00001",
      bookingUrl: "https://www.booking.com",
      amenities: ["Wi-Fi", "Hot Water", "Parking"],
      notes: "Good base for acclimatisation before crossing Rohtang.",
    },
    {
      id: "s2",
      name: "Parasol Camps Chandratal",
      type: "camp",
      stars: 4,
      avgPricePerNight: 4500,
      town: "Chandratal Lake",
      contact: "+91-94180-00002",
      bookingUrl: "https://www.makemytrip.com",
      amenities: ["Meals Included", "Sleeping Bags", "Bonfire"],
      notes: "Book months in advance — only option near the lake at 4,300 m.",
    },
    {
      id: "s3",
      name: "Sakya Abode, Kaza",
      type: "homestay",
      stars: 4,
      avgPricePerNight: 1800,
      town: "Kaza",
      contact: "+91-94592-00003",
      bookingUrl: "https://www.airbnb.com",
      amenities: ["Meals", "Hot Water", "Local Guide"],
      notes: "Family-run Spitian homestay; incredible food and local insights.",
    },
    {
      id: "s4",
      name: "Norling House, Kaza",
      type: "guesthouse",
      stars: 3,
      avgPricePerNight: 1200,
      town: "Kaza",
      contact: "+91-98166-00004",
      amenities: ["Wi-Fi", "Meals Optional"],
    },
    {
      id: "s5",
      name: "Rakcham Camps",
      type: "camp",
      stars: 3,
      avgPricePerNight: 2800,
      town: "Rakcham / Sangla",
      contact: "+91-94185-00005",
      amenities: ["Meals Included", "River View", "Bonfire"],
      notes: "Gorgeous Baspa Valley riverside camp.",
    },
  ],
  "mysore-coorg-wayanad-ooty": [
    {
      id: "mc1",
      name: "Coorg Misty Woods Resort",
      type: "resort",
      stars: 4,
      avgPricePerNight: 6000,
      town: "Madikeri, Coorg",
      contact: "+91-82961-00010",
      bookingUrl: "https://www.booking.com",
      amenities: ["Pool", "Restaurant", "Spa", "Wi-Fi"],
      notes: "Stunning misty jungle views; great coffee estate experience.",
    },
    {
      id: "mc2",
      name: "Zostel Mysore",
      type: "guesthouse",
      stars: 3,
      avgPricePerNight: 700,
      town: "Mysore",
      bookingUrl: "https://www.zostel.com",
      amenities: ["Wi-Fi", "Common Kitchen", "Lockers"],
      notes: "Budget-friendly; perfect base for palace visit.",
    },
    {
      id: "mc3",
      name: "Wayanad Coffee Trail Homestay",
      type: "homestay",
      stars: 4,
      avgPricePerNight: 3500,
      town: "Wayanad",
      contact: "+91-94972-00011",
      amenities: ["Meals Included", "Farm Stay", "Nature Walks"],
    },
  ],
  "rajasthan-desert-kingdom": [
    {
      id: "rd1",
      name: "Suryagarh Palace, Jaisalmer",
      type: "hotel",
      stars: 5,
      avgPricePerNight: 12000,
      town: "Jaisalmer",
      bookingUrl: "https://www.suryagarh.com",
      amenities: ["Pool", "Spa", "Desert Safari", "Restaurant"],
      notes: "Luxury heritage hotel in sandstone — splurge on at least one night.",
    },
    {
      id: "rd2",
      name: "Sam Sand Dunes Camp",
      type: "camp",
      stars: 4,
      avgPricePerNight: 5500,
      town: "Sam, Jaisalmer",
      contact: "+91-94141-00020",
      bookingUrl: "https://www.makemytrip.com",
      amenities: ["Camel Safari", "Cultural Evening", "Meals Included"],
    },
    {
      id: "rd3",
      name: "Jagat Niwas Palace, Udaipur",
      type: "hotel",
      stars: 4,
      avgPricePerNight: 5000,
      town: "Udaipur",
      bookingUrl: "https://www.jagatniwaspalace.com",
      amenities: ["Lake View", "Restaurant", "Wi-Fi"],
    },
  ],
  "sikkim-7-days": [
    {
      id: "sk1",
      name: "Elgin Mount Pandim, Pelling",
      type: "hotel",
      stars: 4,
      avgPricePerNight: 7000,
      town: "Pelling",
      bookingUrl: "https://www.elginhotels.com",
      amenities: ["Kanchenjunga View", "Restaurant", "Wi-Fi"],
      notes: "Colonial heritage hotel with stunning mountain panorama.",
    },
    {
      id: "sk2",
      name: "Sikkim Homestay Network",
      type: "homestay",
      stars: 4,
      avgPricePerNight: 2000,
      town: "Gangtok",
      amenities: ["Meals Included", "Local Guide", "Cultural Experience"],
    },
  ],
  "meghalaya-5-days": [
    {
      id: "mg1",
      name: "Polo Orchid Resort",
      type: "resort",
      stars: 4,
      avgPricePerNight: 5500,
      town: "Shillong",
      bookingUrl: "https://www.booking.com",
      amenities: ["Restaurant", "Wi-Fi", "Garden"],
    },
    {
      id: "mg2",
      name: "Dawki River View Camp",
      type: "camp",
      stars: 3,
      avgPricePerNight: 3000,
      town: "Dawki",
      notes: "Wake up to the crystal-clear Umngot River.",
      amenities: ["River View", "Meals Included"],
    },
  ],
  "kerala-7-days": [
    {
      id: "kl1",
      name: "Houseboat — Alleppey",
      type: "resort",
      stars: 4,
      avgPricePerNight: 9000,
      town: "Alleppey (Alappuzha)",
      bookingUrl: "https://www.keralahouseboat.org",
      amenities: ["Backwater Cruise", "Meals Included", "AC Bedrooms"],
      notes: "Non-negotiable experience; book premium houseboat for best quality.",
    },
    {
      id: "kl2",
      name: "Spice Garden Homestay, Munnar",
      type: "homestay",
      stars: 4,
      avgPricePerNight: 3200,
      town: "Munnar",
      amenities: ["Tea Estate Walk", "Meals Included", "Mountain View"],
    },
  ],
  "munsiyari-6-days": [
    {
      id: "mn1",
      name: "Himalayan Eco Lodge",
      type: "guesthouse",
      stars: 3,
      avgPricePerNight: 1500,
      town: "Munsiyari",
      contact: "+91-94109-00030",
      amenities: ["Panchachuli View", "Hot Water", "Meals"],
    },
    {
      id: "mn2",
      name: "Khaliya Top Trek Camp",
      type: "camp",
      stars: 3,
      avgPricePerNight: 2500,
      town: "Khaliya Top",
      amenities: ["Meals Included", "Sleeping Bags", "Trek Guide"],
    },
  ],
  "char-dham-yatra-uttarakhand": [
    {
      id: "cd1",
      name: "GMVN Guest House, Kedarnath",
      type: "guesthouse",
      stars: 2,
      avgPricePerNight: 1200,
      town: "Kedarnath",
      bookingUrl: "https://www.gmvnl.in",
      notes: "Book months ahead; government-run and reliable.",
      amenities: ["Meals", "Hot Water"],
    },
    {
      id: "cd2",
      name: "Hotel Mandakini View, Rudraprayag",
      type: "hotel",
      stars: 3,
      avgPricePerNight: 2000,
      town: "Rudraprayag",
      amenities: ["River View", "Wi-Fi", "Restaurant"],
    },
  ],
  "panch-kedar-trek-10-days": [
    {
      id: "pk1",
      name: "Forest Rest House, Tungnath",
      type: "guesthouse",
      stars: 2,
      avgPricePerNight: 600,
      town: "Chopta",
      contact: "+91-94120-00040",
      notes: "Permit required; book through forest dept.",
      amenities: ["Basic Meals", "Blankets"],
    },
    {
      id: "pk2",
      name: "Chopta Camp",
      type: "camp",
      stars: 3,
      avgPricePerNight: 2000,
      town: "Chopta",
      amenities: ["Meals Included", "Bonfire"],
    },
  ],
  "pune-konkan-coast-raigad": [
    {
      id: "pu1",
      name: "MTDC Beach Resort, Diveagar",
      type: "resort",
      stars: 3,
      avgPricePerNight: 3500,
      town: "Diveagar",
      bookingUrl: "https://www.maharashtratourism.gov.in",
      amenities: ["Beach Access", "AC Rooms", "Restaurant"],
    },
    {
      id: "pu2",
      name: "Coastal Homestay, Murud",
      type: "homestay",
      stars: 4,
      avgPricePerNight: 2200,
      town: "Murud",
      amenities: ["Sea View", "Konkan Meals", "Rooftop"],
    },
  ],
};

const DEFAULT_STAYS: HotelSuggestion[] = [
  {
    id: "def1",
    name: "Local Guesthouse",
    type: "guesthouse",
    stars: 3,
    avgPricePerNight: 1500,
    town: "Nearby Town",
    notes: "Ask locals for best-value accommodation on arrival.",
    amenities: ["Basic Meals", "Wi-Fi"],
  },
];

const TYPE_LABELS: Record<HotelSuggestion["type"], string> = {
  hotel: "Hotel",
  homestay: "Homestay",
  guesthouse: "Guesthouse",
  camp: "Camp / Glamping",
  resort: "Resort",
};

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={12} />,
  Parking: <Car size={12} />,
  Restaurant: <Utensils size={12} />,
  "Hot Water": <Droplets size={12} />,
  Pool: <Droplets size={12} />,
};

function StarRow({ stars }: { stars?: number }) {
  if (!stars) return null;
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < stars ? "#f59e0b" : "none"}
          stroke={i < stars ? "#f59e0b" : "var(--border)"}
        />
      ))}
    </div>
  );
}

interface StaySuggestionsProps {
  tripSlug: string;
}

export default function StaySuggestions({ tripSlug }: StaySuggestionsProps) {
  const stays = STAY_DATA[tripSlug] || DEFAULT_STAYS;

  return (
    <div className="stay-suggestions">
      <p className="stay-intro">
        Curated accommodation picks along this route — from budget homestays to premium camps.
      </p>
      <div className="stay-grid">
        {stays.map((stay) => (
          <div key={stay.id} className="stay-card glass-card">
            {/* Header */}
            <div className="stay-card-header">
              <div>
                <div className="stay-type-badge stay-type-{stay.type}"
                  style={{
                    background: stay.type === "camp" ? "rgba(94,234,212,0.15)" :
                      stay.type === "homestay" ? "rgba(249,168,212,0.15)" :
                      stay.type === "resort" ? "rgba(201,168,76,0.15)" :
                      "rgba(137,180,250,0.15)",
                    color: stay.type === "camp" ? "var(--accent-teal)" :
                      stay.type === "homestay" ? "var(--accent-rose)" :
                      stay.type === "resort" ? "var(--accent-gold)" :
                      "var(--accent-gold)",
                  }}
                >
                  {TYPE_LABELS[stay.type]}
                </div>
                <h3 className="stay-name">{stay.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem", flexWrap: "wrap" }}>
                  <StarRow stars={stay.stars} />
                  <span className="stay-town">
                    <MapPin size={11} />
                    {stay.town}
                  </span>
                </div>
              </div>
              <div className="stay-price">
                <div className="stay-price-amount">₹{stay.avgPricePerNight.toLocaleString()}</div>
                <div className="stay-price-label">per night</div>
              </div>
            </div>

            {/* Notes */}
            {stay.notes && (
              <p className="stay-notes">{stay.notes}</p>
            )}

            {/* Amenities */}
            {stay.amenities && stay.amenities.length > 0 && (
              <div className="stay-amenities">
                {stay.amenities.map((a) => (
                  <span key={a} className="stay-amenity-pill">
                    {AMENITY_ICONS[a] || null}
                    {a}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="stay-actions">
              {stay.contact && (
                <a
                  href={`tel:${stay.contact}`}
                  className="stay-action-btn stay-action-call"
                  aria-label={`Call ${stay.name}`}
                >
                  <Phone size={13} />
                  Call
                </a>
              )}
              {stay.bookingUrl && (
                <a
                  href={stay.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stay-action-btn stay-action-book"
                  aria-label={`Book ${stay.name}`}
                >
                  <ExternalLink size={13} />
                  Book Online
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
