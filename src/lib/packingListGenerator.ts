import type { Trip } from "./types";

export interface PackingItem {
  id: string;
  category: "clothing" | "gear" | "medical" | "documents" | "electronics";
  text: string;
  essential: boolean;
  tip?: string;
}

export interface PackingCategory {
  key: PackingItem["category"];
  label: string;
  icon: string;
}

export const PACKING_CATEGORIES: PackingCategory[] = [
  { key: "clothing", label: "Clothing & Layers", icon: "🧥" },
  { key: "gear", label: "Trail & Terrain Gear", icon: "🎒" },
  { key: "medical", label: "Health & High-Altitude Meds", icon: "💊" },
  { key: "documents", label: "Permits, Cards & Cash", icon: "📄" },
  { key: "electronics", label: "Gadgets & Power", icon: "⚡" },
];

export function generatePackingList(trip: Trip): PackingItem[] {
  const isHimalayan =
    trip.tags?.some((t) => ["himalayas", "trekking", "mountains", "ladakh", "spiti", "uttarakhand", "himachal"].includes(t.toLowerCase())) ||
    trip.title.toLowerCase().includes("ladakh") ||
    trip.title.toLowerCase().includes("spiti") ||
    trip.title.toLowerCase().includes("kedar");

  const isDesert = trip.tags?.some((t) => ["desert", "rajasthan"].includes(t.toLowerCase()));
  const isCoastal = trip.tags?.some((t) => ["beach", "coastal", "goa", "kerala"].includes(t.toLowerCase()));

  const items: PackingItem[] = [];

  // Documents & Money
  items.push(
    {
      id: "doc-aadhaar",
      category: "documents",
      text: "Government ID (Aadhaar / Passport) + 4 physical photocopies",
      essential: true,
      tip: "Required at army/police checkposts; digital copies are often rejected in zero-connectivity areas.",
    },
    {
      id: "doc-cash",
      category: "documents",
      text: "Sufficient Cash (₹5,000–₹15,000 in ₹100 & ₹500 notes)",
      essential: true,
      tip: "UPI and ATMs fail frequently beyond main hub towns like Manali, Leh, or Rishikesh.",
    },
    {
      id: "doc-car",
      category: "documents",
      text: "Vehicle Registration Certificate, Insurance, and PUC",
      essential: true,
      tip: "Crucial for highway and state border checkpoints.",
    }
  );

  if (isHimalayan) {
    items.push({
      id: "doc-permit",
      category: "documents",
      text: "Inner Line Permit (ILP) or Protected Area Permit (PAP)",
      essential: true,
      tip: "Apply online 3–5 days prior for Pangong, Nubra, Tso Moriri, Rohtang, or North Sikkim.",
    });
  }

  // Clothing
  if (isHimalayan) {
    items.push(
      { id: "cl-thermal", category: "clothing", text: "Merino wool or synthetic thermal base layers (top & bottom)", essential: true },
      { id: "cl-fleece", category: "clothing", text: "Mid-layer fleece jacket or pullover", essential: true },
      { id: "cl-down", category: "clothing", text: "Down or heavy windproof insulated jacket (-5°C to -10°C rated)", essential: true },
      { id: "cl-gloves", category: "clothing", text: "Waterproof / windproof insulated gloves + inner fleece liners", essential: true },
      { id: "cl-beanie", category: "clothing", text: "Woolen beanie / balaclava covering ears and neck", essential: true },
      { id: "cl-socks", category: "clothing", text: "3–4 pairs of thick woolen / trekking socks", essential: true },
      { id: "cl-pants", category: "clothing", text: "Quick-dry trekking trousers (cargo / convertible)", essential: false }
    );
  } else if (isDesert) {
    items.push(
      { id: "cl-breathable", category: "clothing", text: "Loose, full-sleeve cotton/linen shirts (sun protection)", essential: true },
      { id: "cl-night-warm", category: "clothing", text: "Light warm jacket / cardigan for chilly desert nights", essential: true },
      { id: "cl-scarf", category: "clothing", text: "Cotton turban scarf / shemagh against sand and dust", essential: true },
      { id: "cl-hat", category: "clothing", text: "Wide-brim sun hat", essential: true }
    );
  } else if (isCoastal) {
    items.push(
      { id: "cl-swim", category: "clothing", text: "Quick-dry swimwear and board shorts", essential: true },
      { id: "cl-linen", category: "clothing", text: "Breathable tropical linen or rayon shirts", essential: true },
      { id: "cl-rain", category: "clothing", text: "Lightweight packable rain poncho (monsoon season)", essential: false }
    );
  } else {
    items.push(
      { id: "cl-comfort", category: "clothing", text: "Comfortable breathable walking apparel", essential: true },
      { id: "cl-light-jacket", category: "clothing", text: "Light jacket / layer for air-conditioned transit & evenings", essential: true }
    );
  }

  // Trail & Terrain Gear
  items.push({
    id: "gr-sunglasses",
    category: "gear",
    text: "UV400 Polarized Sunglasses (Category 3 or 4)",
    essential: true,
    tip: "Essential to prevent snow blindness and intense high-altitude mountain glare.",
  });

  if (isHimalayan) {
    items.push(
      { id: "gr-boots", category: "gear", text: "Water-resistant high-ankle trekking shoes with deep lug sole", essential: true, tip: "Break them in at least 2 weeks before the trip to avoid blisters." },
      { id: "gr-poles", category: "gear", text: "Telescopic trekking poles (pair)", essential: false, tip: "Reduces knee impact by up to 25% during steep mountain descents." },
      { id: "gr-flask", category: "gear", text: "1L Insulated thermal stainless flask", essential: true, tip: "Keeps warm water from freezing overnight." },
      { id: "gr-daypack", category: "gear", text: "20L–30L daypack with rain cover", essential: true }
    );
  } else {
    items.push(
      { id: "gr-shoes", category: "gear", text: "Comfortable cushioned walking / sneaker shoes", essential: true },
      { id: "gr-bottle", category: "gear", text: "Reusable filtered water bottle", essential: true }
    );
  }

  // Health & First Aid
  items.push(
    { id: "med-sunscreen", category: "medical", text: "High SPF 50+ Sunscreen + SPF Lip Balm", essential: true },
    { id: "med-ors", category: "medical", text: "Electrolyte sachets (ORS / Enerzal) - 10 packets", essential: true, tip: "Combat dehydration and high-altitude dry air." },
    { id: "med-stomach", category: "medical", text: "Antacids, digestive enzymes & anti-diarrheal tablets", essential: true },
    { id: "med-bandages", category: "medical", text: "Blister band-aids, crepe bandage, and antiseptic ointment", essential: true }
  );

  if (isHimalayan) {
    items.push(
      { id: "med-diamox", category: "medical", text: "Diamox (Acetazolamide) tablets", essential: true, tip: "Consult your physician before taking; aids mountain acclimatization." },
      { id: "med-camphor", category: "medical", text: "Camphor (Kafur) in a pouch or portable oxyspray can", essential: false, tip: "Helps comfort breathing when crossing 5,000m passes." },
      { id: "med-pain", category: "medical", text: "Paracetamol / Ibuprofen (for altitude tension headaches)", essential: true }
    );
  }

  // Electronics & Gadgets
  items.push(
    { id: "el-powerbank", category: "electronics", text: "20,000 mAh High-Capacity Power Bank", essential: true, tip: "Lithium batteries discharge twice as fast in sub-zero mountain temperatures." },
    { id: "el-torch", category: "electronics", text: "LED Headlamp or bright tactical flashlight + extra batteries", essential: true },
    { id: "el-offline-maps", category: "electronics", text: "Downloaded Offline Google Maps & GPX tracks on phone", essential: true, tip: "Pre-download offline map areas while connected to home Wi-Fi." },
    { id: "el-postpaid-sim", category: "electronics", text: "BSNL / Airtel Postpaid SIM Card", essential: isHimalayan, tip: "Prepaid SIM cards from outside Jammu & Kashmir / Ladakh do not work in Ladakh due to security regulations." }
  );

  return items;
}
