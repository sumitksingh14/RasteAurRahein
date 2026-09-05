"use client";

import { Leaf, Flame, ExternalLink, MapPin, Search, Sparkles } from "lucide-react";
import type { FoodSpot } from "@/lib/types";

// ── Per-trip food data ────────────────────────────────────────────────────────
const FOOD_DATA: Record<string, FoodSpot[]> = {
  "jyotirlinga-pilgrimage-road-trip": [
    {
      id: "jy_f1", name: "Madhurima Dhaba, Bhimashankar", type: "dhaba", town: "Bhimashankar",
      mustTry: ["Maharashtrian Thali", "Sol Kadhi", "Jowar Bhakri"],
      priceRange: "₹", isVeg: true,
      notes: "Simple post-darshan thali spot near the temple; best reached by 1 PM.",
    },
    {
      id: "jy_f2", name: "Madhav's Kitchen, Trimbakeshwar", type: "restaurant", town: "Trimbakeshwar, Nashik",
      mustTry: ["Pithla Bhakri", "Buttermilk", "Varan Bhat"],
      priceRange: "₹", isVeg: true,
      notes: "Vegetarian only; a warm family kitchen steps from the Godavari ghat.",
    },
    {
      id: "jy_f3", name: "Maharaj Dhaba, Ellora", type: "dhaba", town: "Ellora, Aurangabad",
      mustTry: ["Zunka Bhakar", "Ambadi Sabzi", "Fresh Lassi"],
      priceRange: "₹", isVeg: true,
      notes: "Rustic dhaba with protein-rich Vidarbha cuisine; perfect fuel before the cave tour.",
    },
    {
      id: "jy_f4", name: "Madhurima Veg Restaurant, Ujjain", type: "restaurant", town: "Ujjain",
      mustTry: ["Ujjaini Poha", "Bhutte ki Kees", "Malpua"],
      priceRange: "₹", isVeg: true,
      notes: "Ujjain's iconic breakfast; arrive at dawn after the Bhasma Aarti.",
    },
    {
      id: "jy_f5", name: "Omkareshwar Rasoi", type: "homestay-kitchen", town: "Omkareshwar",
      mustTry: ["Dal Bati Churma", "Malwa Thali", "Coconut Water"],
      priceRange: "₹", isVeg: true,
      notes: "Traditional Malwa thali served riverside; deeply satisfying after the boat puja.",
    },
    {
      id: "jy_f6", name: "Shipra Ghat Tea Stalls", type: "street-food", town: "Ujjain Ghats",
      mustTry: ["Kesar Masala Chai", "Bun Maska", "Tikki Chaat"],
      priceRange: "₹", isVeg: true,
      notes: "Evening chai ritual at the Shipra ghat after the Sandhya Aarti — unmissable.",
    },
  ],
  "spiti-valley": [
    {
      id: "f1", name: "Sichuan Kitchen, Kaza", type: "restaurant", town: "Kaza",
      mustTry: ["Thukpa (Tibetan noodle soup)", "Momos", "Butter Tea"],
      priceRange: "₹", isVeg: false,
      notes: "Popular spot with trekkers; warming food at altitude.",
    },
    {
      id: "f2", name: "Sakya Cafe, Kaza", type: "cafe", town: "Kaza",
      mustTry: ["Tibetan Bread with Yak Butter", "Apple Juice", "Tsampa Porridge"],
      priceRange: "₹", isVeg: true,
      notes: "Tiny café run by a monastery — proceeds support local monks.",
    },
    {
      id: "f3", name: "Spitian Homestay Kitchen", type: "homestay-kitchen", town: "Kibber / Langza",
      mustTry: ["Chhurpe (dried yak cheese)", "Paba (barley bread)", "Chang (local barley wine)"],
      priceRange: "₹", isVeg: false,
      notes: "Authentic Spitian cuisine not found in restaurants.",
    },
    {
      id: "f4", name: "Himalayan Dhaba, Losar", type: "dhaba", town: "Losar",
      mustTry: ["Dal Chawal", "Aloo Paratha", "Chai"],
      priceRange: "₹", isVeg: true,
      notes: "Only dhaba for 50 km — essential lunch stop.",
    },
  ],
  "mysore-coorg-wayanad-ooty": [
    {
      id: "mc_f1", name: "Dasaprakash, Mysore", type: "restaurant", town: "Mysore",
      mustTry: ["Mysore Masala Dosa", "Filter Coffee", "Bisi Bele Bath"],
      priceRange: "₹", isVeg: true,
      notes: "Legendary vegetarian South Indian restaurant since 1918.",
    },
    {
      id: "mc_f2", name: "Coorg Coffee Estate Café", type: "cafe", town: "Madikeri, Coorg",
      mustTry: ["Estate-grown Pour Over Coffee", "Pork Curry", "Coorg Akki Rotti"],
      priceRange: "₹₹", isVeg: false,
    },
    {
      id: "mc_f3", name: "Wayanad Tribal Cuisine", type: "homestay-kitchen", town: "Kalpetta, Wayanad",
      mustTry: ["Bamboo Rice Curry", "Wild Jackfruit Dish", "Black Pepper Chicken"],
      priceRange: "₹", isVeg: false,
      notes: "Arranged through tribal tourism initiative.",
    },
    {
      id: "mc_f4", name: "Hotel Vinayaka Mylari, Mysore", type: "restaurant", town: "Mysore",
      mustTry: ["Mylari Dosa", "Saagu Curry", "Filter Coffee"],
      priceRange: "₹", isVeg: true,
      notes: "Cult dosa spot — opens only until noon, so go early!",
    },
  ],
  "rajasthan-desert-kingdom": [
    {
      id: "rd_f1", name: "Trio Restaurant, Jaisalmer", type: "restaurant", town: "Jaisalmer",
      mustTry: ["Laal Maas", "Dal Baati Churma", "Ker Sangri"],
      priceRange: "₹₹", isVeg: false,
      notes: "Rooftop views of Jaisalmer Fort — go at sunset.",
    },
    {
      id: "rd_f2", name: "Sonu's Dhaba, Pushkar", type: "dhaba", town: "Pushkar",
      mustTry: ["Mawa Kachori", "Ghevar", "Lassi"],
      priceRange: "₹", isVeg: true,
    },
    {
      id: "rd_f3", name: "Ambrai Ghat Restaurant, Udaipur", type: "restaurant", town: "Udaipur",
      mustTry: ["Gatte ki Sabzi", "Daal Bati", "Makhani Paneer"],
      priceRange: "₹₹₹", isVeg: true,
      notes: "Best lakeside setting in Udaipur — book ahead for dinner.",
    },
  ],
  "goa-beyond-beaches": [
    {
      id: "ga_f1", name: "Ritz Classic, Panaji", type: "restaurant", town: "Panaji",
      mustTry: ["Prawn Balchão", "Fish Curry Rice", "Bebinca"],
      priceRange: "₹₹", isVeg: false,
      notes: "Old-school Goan institution; try the prawns.",
    },
    {
      id: "ga_f2", name: "Fisherman's Wharf", type: "restaurant", town: "Cavelossim, South Goa",
      mustTry: ["King Crab Masala", "Clam Soup", "Feni"],
      priceRange: "₹₹₹", isVeg: false,
    },
    {
      id: "ga_f3", name: "Curlies Beach Shack", type: "street-food", town: "Anjuna, North Goa",
      mustTry: ["Grilled Fish Tikka", "Goan Sausage Pav", "Cashew Feni Cocktail"],
      priceRange: "₹₹", isVeg: false,
    },
  ],
  "sikkim-7-days": [
    {
      id: "sk_f1", name: "The Dragon Wok, Gangtok", type: "restaurant", town: "Gangtok",
      mustTry: ["Gyathuk (noodle soup)", "Phagshapa (dried pork)", "Chhurpi Soup"],
      priceRange: "₹", isVeg: false,
    },
    {
      id: "sk_f2", name: "MG Marg Street Stalls", type: "street-food", town: "Gangtok",
      mustTry: ["Sel Roti", "Wai Wai Noodle Chat", "Momos"],
      priceRange: "₹", isVeg: false,
    },
  ],
  "meghalaya-5-days": [
    {
      id: "mg_f1", name: "City Hut Dhaba, Shillong", type: "dhaba", town: "Shillong",
      mustTry: ["Jadoh (rice and pork)", "Dohneiiong", "Kwai (betel nut)"],
      priceRange: "₹", isVeg: false,
      notes: "Khasi tribal cuisine — one of the best in Shillong.",
    },
    {
      id: "mg_f2", name: "Cherrapunji Homestay Kitchen", type: "homestay-kitchen", town: "Cherrapunji",
      mustTry: ["Nakham Bitchi (dried fish chutney)", "Putharo (rice cake)", "Local Honey"],
      priceRange: "₹",
    },
  ],
  "kerala-7-days": [
    {
      id: "kl_f1", name: "Houseboat Kitchen", type: "homestay-kitchen", town: "Alleppey Backwaters",
      mustTry: ["Karimeen Pollichathu (Pearl Spot Fish)", "Prawn Moilee", "Appam with Stew"],
      priceRange: "₹₹", isVeg: false,
      notes: "Cooked fresh on the houseboat by your chef.",
    },
    {
      id: "kl_f2", name: "Shri Krishna Cafe, Fort Kochi", type: "restaurant", town: "Fort Kochi",
      mustTry: ["Kerala Prawn Curry", "Puttu Kadala", "Coconut Payasam"],
      priceRange: "₹", isVeg: false,
    },
  ],
  "munsiyari-6-days": [
    {
      id: "mn_f1", name: "Local Bhojanalaya, Munsiyari", type: "dhaba", town: "Munsiyari",
      mustTry: ["Aloo Ke Gutke", "Bal Mithai", "Bhatt ki Dal"],
      priceRange: "₹", isVeg: true,
      notes: "Kumaoni staple dishes — incredibly satisfying after a trek.",
    },
  ],
  "char-dham-yatra-uttarakhand": [
    {
      id: "cd_f1", name: "Prasad Bhandara (Temple)", type: "restaurant", town: "Kedarnath / Badrinath",
      mustTry: ["Temple Prasad", "Chana Dal", "Poori Sabzi"],
      priceRange: "₹", isVeg: true,
      notes: "Free langar (community meal) available at shrines.",
    },
    {
      id: "cd_f2", name: "Pahadi Dhaba, Guptkashi", type: "dhaba", town: "Guptkashi",
      mustTry: ["Gahat Ki Dal", "Mandua Roti", "Kafal Juice (seasonal)"],
      priceRange: "₹", isVeg: true,
    },
  ],
  "panch-kedar-trek-10-days": [
    {
      id: "pk_f1", name: "Trek Camp Kitchen", type: "homestay-kitchen", town: "Along Route",
      mustTry: ["Maggi at altitude", "Aloo Paratha", "Hot Kadha (herbal drink)"],
      priceRange: "₹", isVeg: true,
      notes: "Each campsite has basic cooking; budget ₹200-400/meal.",
    },
  ],
  "pune-konkan-coast-raigad": [
    {
      id: "pu_f1", name: "Aswad, Pune", type: "restaurant", town: "Pune",
      mustTry: ["Misal Pav", "Sabudana Vada", "Shrikhand"],
      priceRange: "₹", isVeg: true,
      notes: "Iconic Maharashtrian breakfast spot — always a queue.",
    },
    {
      id: "pu_f2", name: "Murud Beach Seafood Shacks", type: "street-food", town: "Murud-Janjira",
      mustTry: ["Surmai Fry (King Mackerel)", "Kolambi Fry (Prawns)", "Modak"],
      priceRange: "₹₹", isVeg: false,
      notes: "Fresh catch cooked right on the beach.",
    },
  ],
};

const DEFAULT_FOOD: FoodSpot[] = [
  {
    id: "def_f1", name: "Local Dhaba", type: "dhaba", town: "Nearest Town",
    mustTry: ["Regional Thali", "Fresh Chai", "Local Bread"],
    priceRange: "₹", isVeg: false,
    notes: "Ask your host or locals for the best eating spots — they always know!",
  },
];

const TYPE_LABELS: Record<FoodSpot["type"], string> = {
  restaurant: "Restaurant", dhaba: "Dhaba", "street-food": "Street Food",
  cafe: "Café", "homestay-kitchen": "Homestay Kitchen",
};

const TYPE_COLORS: Record<FoodSpot["type"], { bg: string; color: string }> = {
  restaurant: { bg: "rgba(137,180,250,0.15)", color: "var(--accent-gold)" },
  dhaba: { bg: "rgba(249,168,212,0.15)", color: "var(--accent-rose)" },
  "street-food": { bg: "rgba(250,179,135,0.15)", color: "#fab387" },
  cafe: { bg: "rgba(94,234,212,0.15)", color: "var(--accent-teal)" },
  "homestay-kitchen": { bg: "rgba(166,227,161,0.15)", color: "#a6e3a1" },
};

interface FoodRecommendationsProps {
  tripSlug: string;
  tripTitle?: string;
}

export default function FoodRecommendations({ tripSlug, tripTitle }: FoodRecommendationsProps) {
  const spots = FOOD_DATA[tripSlug] || DEFAULT_FOOD;
  const destination = tripTitle || tripSlug.replace(/-/g, " ");

  const zomatoUrl = `https://www.zomato.com/india/${encodeURIComponent(destination.split(" ")[0]?.toLowerCase() || "")}/restaurants`;
  const googleFoodUrl = `https://www.google.com/search?q=best+restaurants+${encodeURIComponent(destination)}`;
  const tripadvisorUrl = `https://www.tripadvisor.in/Restaurants-g${encodeURIComponent(destination)}.html`;

  return (
    <div className="food-recommendations">
      {/* Header with search links */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
        gap: "0.75rem", marginBottom: "1rem",
      }}>
        <p className="food-intro" style={{ margin: 0 }}>
          Locally curated restaurants, dhabas, and authentic kitchens along this route.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, flexWrap: "wrap" }}>
          <a href={zomatoUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.35rem 0.75rem", borderRadius: 20,
              border: "1px solid rgba(249,168,212,0.35)", background: "rgba(249,168,212,0.08)",
              color: "var(--accent-rose)", fontSize: "0.73rem", fontWeight: 600, textDecoration: "none",
            }}>
            <ExternalLink size={11} /> Zomato
          </a>
          <a href={googleFoodUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.35rem 0.75rem", borderRadius: 20,
              border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.08)",
              color: "#4ade80", fontSize: "0.73rem", fontWeight: 600, textDecoration: "none",
            }}>
            <Search size={11} /> Google
          </a>
        </div>
      </div>

      {/* AI badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem",
        padding: "0.6rem 0.85rem", borderRadius: "var(--radius-md)",
        background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)",
      }}>
        <Sparkles size={13} style={{ color: "#a78bfa", flexShrink: 0 }} />
        <span style={{ fontSize: "0.72rem", color: "#a78bfa", fontWeight: 600 }}>AI-curated picks</span>
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
          · Includes traditional dishes unique to this region. Click Maps to navigate.
        </span>
      </div>

      <div className="food-grid">
        {spots.map((spot) => {
          const { bg, color } = TYPE_COLORS[spot.type];
          const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(spot.name + " " + spot.town)}`;
          const zomatoSpotUrl = `https://www.zomato.com/search?q=${encodeURIComponent(spot.name)}`;
          return (
            <div key={spot.id} className="food-card glass-card">
              <div className="food-card-top">
                <div>
                  <span className="food-type-badge" style={{ background: bg, color }}>
                    {TYPE_LABELS[spot.type]}
                  </span>
                  <h3 className="food-name">{spot.name}</h3>
                  <div className="food-meta">
                    <span className="food-town" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      📍 {spot.town}
                    </span>
                    {spot.isVeg !== undefined && (
                      <span className={`food-veg-badge ${spot.isVeg ? "veg" : "nonveg"}`}>
                        {spot.isVeg ? <Leaf size={10} /> : <Flame size={10} />}
                        {spot.isVeg ? "Pure Veg" : "Non-Veg"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="food-price-badge" title={`Price range: ${spot.priceRange}`}>
                  {spot.priceRange}
                </div>
              </div>

              {/* Must Try */}
              <div className="food-must-try-section">
                <div className="food-must-try-label">Must Try</div>
                <div className="food-must-try-list">
                  {spot.mustTry.map((dish) => (
                    <span key={dish} className="food-dish-pill">{dish}</span>
                  ))}
                </div>
              </div>

              {spot.notes && (
                <p className="food-notes">💡 {spot.notes}</p>
              )}

              {/* Action links */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                <a
                  href={mapsUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    padding: "0.3rem 0.65rem", borderRadius: 20,
                    border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.07)",
                    color: "#4ade80", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
                  }}
                >
                  <MapPin size={11} /> Find on Maps
                </a>
                {spot.type === "restaurant" || spot.type === "cafe" || spot.type === "dhaba" ? (
                  <a
                    href={zomatoSpotUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.3rem",
                      padding: "0.3rem 0.65rem", borderRadius: 20,
                      border: "1px solid rgba(249,168,212,0.3)", background: "rgba(249,168,212,0.07)",
                      color: "var(--accent-rose)", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
                    }}
                  >
                    <ExternalLink size={11} /> Zomato
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom discovery strip */}
      <div style={{
        marginTop: "1.5rem", padding: "0.85rem 1rem",
        borderRadius: "var(--radius-md)", border: "1px dashed var(--border)",
        display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center",
      }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          🍽️ Discover more:
        </span>
        {[
          { label: "Swiggy", url: `https://www.swiggy.com/` },
          { label: "TripAdvisor", url: tripadvisorUrl },
          { label: "Google Maps Food", url: `https://www.google.com/maps/search/restaurants+near+${encodeURIComponent(destination)}` },
          { label: "Instagram", url: `https://www.instagram.com/explore/tags/${encodeURIComponent(destination.replace(/\s+/g, "").toLowerCase())}food/` },
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
