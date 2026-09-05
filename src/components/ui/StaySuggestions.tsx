"use client";

import { Phone, ExternalLink, MapPin, Star, Wifi, Car, Utensils, Droplets, Search, Sparkles } from "lucide-react";
import type { HotelSuggestion } from "@/lib/types";

// ── Per-trip hotel & homestay data ────────────────────────────────────────────
const STAY_DATA: Record<string, HotelSuggestion[]> = {
  "jyotirlinga-pilgrimage-road-trip": [
    {
      id: "jy1", name: "Bhimashankar Eco Resort", type: "resort", stars: 3,
      avgPricePerNight: 2800, town: "Bhimashankar, Pune District", contact: "+91-94222-00101",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Bhimashankar",
      amenities: ["Meals Included", "Forest View", "Hot Water"],
      notes: "Only comfortable stay near the temple; book at least a week ahead in pilgrimage season.",
    },
    {
      id: "jy2", name: "Trimbakeshwar Heritage Resort", type: "resort", stars: 3,
      avgPricePerNight: 3200, town: "Trimbakeshwar, Nashik", contact: "+91-94234-00102",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Trimbakeshwar",
      amenities: ["Garden View", "Restaurant", "Wi-Fi", "Hot Water"],
      notes: "Heritage-styled property close to the Jyotirlinga. Walk to the temple ghats.",
    },
    {
      id: "jy3", name: "Lemon Tree Hotel, Aurangabad", type: "hotel", stars: 4,
      avgPricePerNight: 4500, town: "Aurangabad (Chhatrapati Sambhajinagar)",
      bookingUrl: "https://www.lemontreehotels.com/lemon-tree-hotel/aurangabad/hotel-aurangabad.aspx",
      amenities: ["Pool", "Restaurant", "Wi-Fi", "Parking"],
      notes: "Best positioned hotel for Ellora & Grishneshwar visits; 10 km to caves.",
    },
    {
      id: "jy4", name: "Ujjain Ramada by Wyndham", type: "hotel", stars: 4,
      avgPricePerNight: 5500, town: "Ujjain, Madhya Pradesh",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Ujjain",
      amenities: ["Shipra River View", "Restaurant", "Wi-Fi", "Parking"],
      notes: "Close to Mahakaleshwar temple; ideal for attending the Bhasma Aarti at 4 AM.",
    },
    {
      id: "jy5", name: "Narmada View Resort, Omkareshwar", type: "resort", stars: 3,
      avgPricePerNight: 2500, town: "Omkareshwar, Madhya Pradesh", contact: "+91-94250-00105",
      bookingUrl: "https://www.airbnb.co.in/s/Omkareshwar/homes",
      amenities: ["Narmada View", "Meals Included", "Boat Jetty Access"],
      notes: "Wake up to Narmada Aarti chants; a deeply spiritual stay.",
    },
  ],
  "spiti-valley": [
    {
      id: "s1", name: "Getaway Stays Manali", type: "hotel", stars: 3,
      avgPricePerNight: 2500, town: "Manali", contact: "+91-98050-00001",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Manali&checkin_monthday=1&checkin_month=6&checkout_monthday=2&checkout_month=6",
      amenities: ["Wi-Fi", "Hot Water", "Parking"],
      notes: "Good base for acclimatisation before crossing Rohtang.",
    },
    {
      id: "s2", name: "Parasol Camps Chandratal", type: "camp", stars: 4,
      avgPricePerNight: 4500, town: "Chandratal Lake", contact: "+91-94180-00002",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?topHtlId=&checkin=&checkout=&roomCount=1&adultsCount=2&childCount=0&searchText=Chandratal",
      amenities: ["Meals Included", "Sleeping Bags", "Bonfire"],
      notes: "Book months in advance — only option near the lake at 4,300 m.",
    },
    {
      id: "s3", name: "Sakya Abode, Kaza", type: "homestay", stars: 4,
      avgPricePerNight: 1800, town: "Kaza", contact: "+91-94592-00003",
      bookingUrl: "https://www.airbnb.co.in/s/Kaza--Himachal-Pradesh/homes",
      amenities: ["Meals", "Hot Water", "Local Guide"],
      notes: "Family-run Spitian homestay; incredible food and local insights.",
    },
    {
      id: "s4", name: "Norling House, Kaza", type: "guesthouse", stars: 3,
      avgPricePerNight: 1200, town: "Kaza", contact: "+91-98166-00004",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Kaza+Himachal",
      amenities: ["Wi-Fi", "Meals Optional"],
    },
    {
      id: "s5", name: "Rakcham Camps", type: "camp", stars: 3,
      avgPricePerNight: 2800, town: "Rakcham / Sangla", contact: "+91-94185-00005",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Sangla",
      amenities: ["Meals Included", "River View", "Bonfire"],
      notes: "Gorgeous Baspa Valley riverside camp.",
    },
  ],
  "mysore-coorg-wayanad-ooty": [
    {
      id: "mc1", name: "Coorg Misty Woods Resort", type: "resort", stars: 4,
      avgPricePerNight: 6000, town: "Madikeri, Coorg", contact: "+91-82961-00010",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Madikeri+Coorg",
      amenities: ["Pool", "Restaurant", "Spa", "Wi-Fi"],
      notes: "Stunning misty jungle views; great coffee estate experience.",
    },
    {
      id: "mc2", name: "Zostel Mysore", type: "guesthouse", stars: 3,
      avgPricePerNight: 700, town: "Mysore",
      bookingUrl: "https://www.zostel.com/zostel/mysore/",
      amenities: ["Wi-Fi", "Common Kitchen", "Lockers"],
      notes: "Budget-friendly; perfect base for palace visit.",
    },
    {
      id: "mc3", name: "Wayanad Coffee Trail Homestay", type: "homestay", stars: 4,
      avgPricePerNight: 3500, town: "Wayanad", contact: "+91-94972-00011",
      bookingUrl: "https://www.airbnb.co.in/s/Wayanad--Kerala/homes",
      amenities: ["Meals Included", "Farm Stay", "Nature Walks"],
    },
  ],
  "rajasthan-desert-kingdom": [
    {
      id: "rd1", name: "Suryagarh Palace, Jaisalmer", type: "hotel", stars: 5,
      avgPricePerNight: 12000, town: "Jaisalmer",
      bookingUrl: "https://www.suryagarh.com",
      amenities: ["Pool", "Spa", "Desert Safari", "Restaurant"],
      notes: "Luxury heritage hotel in sandstone — splurge on at least one night.",
    },
    {
      id: "rd2", name: "Sam Sand Dunes Camp", type: "camp", stars: 4,
      avgPricePerNight: 5500, town: "Sam, Jaisalmer", contact: "+91-94141-00020",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Sam+Sand+Dunes",
      amenities: ["Camel Safari", "Cultural Evening", "Meals Included"],
    },
    {
      id: "rd3", name: "Jagat Niwas Palace, Udaipur", type: "hotel", stars: 4,
      avgPricePerNight: 5000, town: "Udaipur",
      bookingUrl: "https://www.jagatniwaspalace.com",
      amenities: ["Lake View", "Restaurant", "Wi-Fi"],
    },
  ],
  "goa-beyond-beaches": [
    {
      id: "ga1", name: "The Leela Goa", type: "resort", stars: 5,
      avgPricePerNight: 15000, town: "Cavelossim, South Goa",
      bookingUrl: "https://www.theleela.com/en_us/hotels-in-goa/the-leela-goa/",
      amenities: ["Private Beach", "Pool", "Spa", "Restaurant", "Wi-Fi"],
      notes: "Award-winning luxury resort on a pristine beach.",
    },
    {
      id: "ga2", name: "Zostel Goa (Palolem)", type: "guesthouse", stars: 3,
      avgPricePerNight: 900, town: "Palolem, South Goa",
      bookingUrl: "https://www.zostel.com/zostel/goa/",
      amenities: ["Wi-Fi", "Beach Walk", "Social Events"],
      notes: "Perfect for solo travellers; steps from Palolem Beach.",
    },
    {
      id: "ga3", name: "Airbnb Beachfront Villas", type: "resort", stars: 4,
      avgPricePerNight: 5000, town: "Anjuna / Vagator",
      bookingUrl: "https://www.airbnb.co.in/s/Goa/homes?refinement_paths%5B%5D=%2Fhomes&search_type=category_change&tab_id=home_tab&property_type_id%5B%5D=2",
      amenities: ["Pool", "Private Garden", "Sea View"],
      notes: "Book early for peak season (Nov–Feb).",
    },
  ],
  "sikkim-7-days": [
    {
      id: "sk1", name: "Elgin Mount Pandim, Pelling", type: "hotel", stars: 4,
      avgPricePerNight: 7000, town: "Pelling",
      bookingUrl: "https://www.elginhotels.com",
      amenities: ["Kanchenjunga View", "Restaurant", "Wi-Fi"],
      notes: "Colonial heritage hotel with stunning mountain panorama.",
    },
    {
      id: "sk2", name: "Sikkim Homestay Network", type: "homestay", stars: 4,
      avgPricePerNight: 2000, town: "Gangtok",
      bookingUrl: "https://www.airbnb.co.in/s/Gangtok--Sikkim/homes",
      amenities: ["Meals Included", "Local Guide", "Cultural Experience"],
    },
  ],
  "meghalaya-5-days": [
    {
      id: "mg1", name: "Polo Orchid Resort", type: "resort", stars: 4,
      avgPricePerNight: 5500, town: "Shillong",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Shillong",
      amenities: ["Restaurant", "Wi-Fi", "Garden"],
    },
    {
      id: "mg2", name: "Dawki River View Camp", type: "camp", stars: 3,
      avgPricePerNight: 3000, town: "Dawki",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Dawki",
      notes: "Wake up to the crystal-clear Umngot River.",
      amenities: ["River View", "Meals Included"],
    },
  ],
  "kerala-7-days": [
    {
      id: "kl1", name: "Houseboat — Alleppey", type: "resort", stars: 4,
      avgPricePerNight: 9000, town: "Alleppey (Alappuzha)",
      bookingUrl: "https://www.keralahouseboat.org",
      amenities: ["Backwater Cruise", "Meals Included", "AC Bedrooms"],
      notes: "Non-negotiable experience; book premium houseboat for best quality.",
    },
    {
      id: "kl2", name: "Spice Garden Homestay, Munnar", type: "homestay", stars: 4,
      avgPricePerNight: 3200, town: "Munnar",
      bookingUrl: "https://www.airbnb.co.in/s/Munnar--Kerala/homes",
      amenities: ["Tea Estate Walk", "Meals Included", "Mountain View"],
    },
  ],
  "munsiyari-6-days": [
    {
      id: "mn1", name: "Himalayan Eco Lodge", type: "guesthouse", stars: 3,
      avgPricePerNight: 1500, town: "Munsiyari", contact: "+91-94109-00030",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Munsiyari",
      amenities: ["Panchachuli View", "Hot Water", "Meals"],
    },
    {
      id: "mn2", name: "Khaliya Top Trek Camp", type: "camp", stars: 3,
      avgPricePerNight: 2500, town: "Khaliya Top",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Munsiyari",
      amenities: ["Meals Included", "Sleeping Bags", "Trek Guide"],
    },
  ],
  "char-dham-yatra-uttarakhand": [
    {
      id: "cd1", name: "GMVN Guest House, Kedarnath", type: "guesthouse", stars: 2,
      avgPricePerNight: 1200, town: "Kedarnath",
      bookingUrl: "https://www.gmvnl.in",
      notes: "Book months ahead; government-run and reliable.",
      amenities: ["Meals", "Hot Water"],
    },
    {
      id: "cd2", name: "Hotel Mandakini View, Rudraprayag", type: "hotel", stars: 3,
      avgPricePerNight: 2000, town: "Rudraprayag",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Rudraprayag",
      amenities: ["River View", "Wi-Fi", "Restaurant"],
    },
  ],
  "panch-kedar-trek-10-days": [
    {
      id: "pk1", name: "Forest Rest House, Tungnath", type: "guesthouse", stars: 2,
      avgPricePerNight: 600, town: "Chopta", contact: "+91-94120-00040",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Chopta+Uttarakhand",
      notes: "Permit required; book through forest dept.",
      amenities: ["Basic Meals", "Blankets"],
    },
    {
      id: "pk2", name: "Chopta Camp", type: "camp", stars: 3,
      avgPricePerNight: 2000, town: "Chopta",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Chopta",
      amenities: ["Meals Included", "Bonfire"],
    },
  ],
  "pune-konkan-coast-raigad": [
    {
      id: "pu1", name: "MTDC Beach Resort, Diveagar", type: "resort", stars: 3,
      avgPricePerNight: 3500, town: "Diveagar",
      bookingUrl: "https://www.maharashtratourism.gov.in",
      amenities: ["Beach Access", "AC Rooms", "Restaurant"],
    },
    {
      id: "pu2", name: "Coastal Homestay, Murud", type: "homestay", stars: 4,
      avgPricePerNight: 2200, town: "Murud",
      bookingUrl: "https://www.airbnb.co.in/s/Murud--Maharashtra/homes",
      amenities: ["Sea View", "Konkan Meals", "Rooftop"],
    },
  ],
};

const DEFAULT_STAYS: HotelSuggestion[] = [
  {
    id: "def1", name: "Local Guesthouse", type: "guesthouse", stars: 3,
    avgPricePerNight: 1500, town: "Nearby Town",
    notes: "Ask locals for best-value accommodation on arrival.",
    amenities: ["Basic Meals", "Wi-Fi"],
  },
];

const TYPE_LABELS: Record<HotelSuggestion["type"], string> = {
  hotel: "Hotel", homestay: "Homestay", guesthouse: "Guesthouse",
  camp: "Camp / Glamping", resort: "Resort",
};

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={12} />, "Parking": <Car size={12} />,
  "Restaurant": <Utensils size={12} />, "Hot Water": <Droplets size={12} />,
  "Pool": <Droplets size={12} />,
};

function StarRow({ stars }: { stars?: number }) {
  if (!stars) return null;
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i} size={12}
          fill={i < stars ? "#f59e0b" : "none"}
          stroke={i < stars ? "#f59e0b" : "var(--border)"}
        />
      ))}
    </div>
  );
}

interface StaySuggestionsProps {
  tripSlug: string;
  tripTitle?: string;
}

export default function StaySuggestions({ tripSlug, tripTitle }: StaySuggestionsProps) {
  const stays = STAY_DATA[tripSlug] || DEFAULT_STAYS;
  const searchQuery = encodeURIComponent(`hotels homestays near ${tripTitle || tripSlug.replace(/-/g, " ")} India`);
  const googleHotelsUrl = `https://www.google.com/travel/hotels/s/${encodeURIComponent((tripTitle || tripSlug.replace(/-/g, " ")) + " India")}`;
  const bookingSearchUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(tripTitle || tripSlug.replace(/-/g, " "))}`;
  const mmtSearchUrl = `https://www.makemytrip.com/hotels/hotel-listing/?searchText=${encodeURIComponent(tripTitle || tripSlug.replace(/-/g, " "))}`;

  return (
    <div className="stay-suggestions">
      {/* AI + Search header */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
        gap: "0.75rem", marginBottom: "1rem",
      }}>
        <p className="stay-intro" style={{ margin: 0 }}>
          Curated accommodation picks along this route — from budget homestays to premium camps.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, flexWrap: "wrap" }}>
          <a href={googleHotelsUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.35rem 0.75rem", borderRadius: 20,
              border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.08)",
              color: "#4ade80", fontSize: "0.73rem", fontWeight: 600, textDecoration: "none",
            }}>
            <Search size={11} /> Google Hotels
          </a>
          <a href={bookingSearchUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.35rem 0.75rem", borderRadius: 20,
              border: "1px solid rgba(96,165,250,0.3)", background: "rgba(96,165,250,0.08)",
              color: "#60a5fa", fontSize: "0.73rem", fontWeight: 600, textDecoration: "none",
            }}>
            <ExternalLink size={11} /> Booking.com
          </a>
          <a href={mmtSearchUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.35rem 0.75rem", borderRadius: 20,
              border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)",
              color: "#fbbf24", fontSize: "0.73rem", fontWeight: 600, textDecoration: "none",
            }}>
            <ExternalLink size={11} /> MakeMyTrip
          </a>
        </div>
      </div>

      {/* AI recommendation badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem",
        padding: "0.6rem 0.85rem", borderRadius: "var(--radius-md)",
        background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)",
      }}>
        <Sparkles size={13} style={{ color: "#a78bfa", flexShrink: 0 }} />
        <span style={{ fontSize: "0.72rem", color: "#a78bfa", fontWeight: 600 }}>AI-curated picks</span>
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
          · Prices are indicative for peak season. Always verify on booking platform.
        </span>
      </div>

      <div className="stay-grid">
        {stays.map((stay) => (
          <div key={stay.id} className="stay-card glass-card">
            {/* Header */}
            <div className="stay-card-header">
              <div>
                <div className="stay-type-badge"
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
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(stay.name + " " + stay.town)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="stay-action-btn"
                aria-label={`Find ${stay.name} on Maps`}
                style={{ borderColor: "rgba(74,222,128,0.3)", color: "#4ade80" }}
              >
                <MapPin size={13} />
                Maps
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom search fallback */}
      <div style={{
        marginTop: "1.5rem", padding: "0.85rem 1rem",
        borderRadius: "var(--radius-md)", border: "1px dashed var(--border)",
        display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center",
      }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          🔍 Search more options:
        </span>
        {[
          { label: "Airbnb", url: `https://www.airbnb.co.in/s/${encodeURIComponent(tripTitle || "")}/homes` },
          { label: "Goibibo", url: `https://www.goibibo.com/hotels/hotels-in-${tripSlug}/` },
          { label: "OYO", url: `https://www.oyorooms.com/hotels-in-${encodeURIComponent(tripTitle?.split(" ")[0]?.toLowerCase() || "")}` },
          { label: "Google Search", url: `https://www.google.com/search?q=${searchQuery}` },
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
