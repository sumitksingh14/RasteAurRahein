"use client";

import { Phone, ExternalLink, MapPin, Star, Wifi, Car, Utensils, Droplets, Search, Sparkles, MessageCircle } from "lucide-react";
import type { HotelSuggestion } from "@/lib/types";

function cleanWhatsAppNumber(phone?: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  if (digits.length > 10) return digits;
  return null;
}

import { STAY_DATA, DEFAULT_STAYS } from "@/lib/data/stayData";

function getStaySuggestions(tripSlug: string, tripTitle?: string): HotelSuggestion[] {
  if (STAY_DATA[tripSlug] && STAY_DATA[tripSlug].length > 0) {
    return STAY_DATA[tripSlug];
  }
  const cleanTitle = (tripTitle || tripSlug.replace(/-/g, " "))
    .replace(/\s*—.*$/, "")
    .replace(/\s*–.*$/, "")
    .trim();
  return [
    {
      id: `${tripSlug}-stay-1`,
      name: `${cleanTitle} Heritage Resort & Homestay`,
      type: "resort",
      stars: 4,
      avgPricePerNight: 3500,
      town: cleanTitle,
      bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(cleanTitle)}`,
      amenities: ["Wi-Fi", "Restaurant", "Hot Water", "Parking"],
      notes: `Scenic accommodation centrally situated for exploring ${cleanTitle} and nearby viewpoints.`,
    },
    {
      id: `${tripSlug}-stay-2`,
      name: `${cleanTitle} Eco Lodge`,
      type: "homestay",
      stars: 3,
      avgPricePerNight: 1800,
      town: cleanTitle,
      bookingUrl: `https://www.makemytrip.com/hotels/hotel-listing/?searchText=${encodeURIComponent(cleanTitle)}`,
      amenities: ["Meals Included", "Wi-Fi", "Hot Water"],
      notes: `Authentic regional hospitality and home-cooked cuisine hosted by locals in ${cleanTitle}.`,
    },
  ];
}

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
  const stays = getStaySuggestions(tripSlug, tripTitle);
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
              {stay.contact && cleanWhatsAppNumber(stay.contact) && (
                <a
                  href={`https://wa.me/${cleanWhatsAppNumber(stay.contact)}?text=${encodeURIComponent(
                    `Namaste! Found ${stay.name} on Raste Aur Raahein travel blog (${stay.town}). Wanted to check room availability and tariffs. Thank you!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stay-action-btn stay-action-whatsapp"
                  aria-label={`WhatsApp ${stay.name}`}
                  style={{
                    borderColor: "rgba(37,211,102,0.35)",
                    color: "#25D366",
                    background: "rgba(37,211,102,0.06)",
                  }}
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </a>
              )}
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
