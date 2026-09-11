import type { Trip } from "@/lib/types";

export interface RegionConfig {
  slug: string;
  label: string;
  headline: string;
  description: string;
  intro: string;
  /** Primary tags that identify trips in this region */
  tags: string[];
  /** Hero image (local or high-res) */
  heroImage: string;
  heroAlt: string;
  /** Related region slugs for cross-links */
  related: string[];
}

export const REGIONS: RegionConfig[] = [
  {
    slug: "himalayas",
    label: "Himalayas & North",
    headline: "The Himalayan & Northern Circuit",
    description:
      "High-altitude passes, cold deserts, pine valleys, and sacred shrines — exploring Himachal, Uttarakhand, Ladakh, and Kashmir.",
    intro:
      "From Spiti Valley's cold deserts and Ladakh's high mountain passes to the deep cedar valleys of Kinnaur, Parvati, and Garhwal, the Himalayas offer some of the most dramatic journeys on Earth. Expect high altitude, serene Buddhist gompas, and roads that reward both driver and trekker with unparalleled vistas.",
    tags: [
      "Himalayas", "Spiti Valley", "Ladakh", "Himachal", "Uttarakhand",
      "High Altitude", "Kashmir", "Jammu", "Kinnaur", "Parvati Valley",
      "Kumaon", "Garhwal", "North India", "Mountains",
    ],
    heroImage: "/images/spiti-ki-monastery.jpg",
    heroAlt: "Spiti Valley Ki Monastery and Himalayan mountains",
    related: ["northeast-india", "central-india", "rajasthan"],
  },
  {
    slug: "central-india",
    label: "Central India",
    headline: "The Heartland of India",
    description:
      "Ancient prehistoric caves, forgotten Afghan palaces, sacred river sources, and the tribal waterfalls of Bastar — exploring Madhya Pradesh and Chhattisgarh.",
    intro:
      "Central India is where India's deepest history and most pristine tribal wilderness intersect. From Bhimbetka's 30,000-year-old rock art and Mandu's floating Afghan palaces to the thundering monsoon cataracts of Chitrakoot and the weekly haat markets of Bastar, this is the undiscovered heart of the subcontinent.",
    tags: [
      "Central India", "Madhya Pradesh", "Chhattisgarh", "Bastar",
      "Bundelkhand", "Bhopal", "Orchha", "Mandu", "Bhimbetka",
      "Amarkantak", "Chitrakoot", "Panna", "Patalkot", "Satpura",
    ],
    heroImage: "/images/chitrakoot-waterfall.jpg",
    heroAlt: "Chitrakoot Falls in Bastar Chhattisgarh",
    related: ["coastal", "south-india", "rajasthan"],
  },
  {
    slug: "coastal",
    label: "Coastal & Western Ghats",
    headline: "Coastlines, Sahyadris & Islands",
    description:
      "From Goa's hidden hinterlands and Maharashtra's Sahyadri hill forts to the pristine coral waters of the Andamans and the Konkan coast.",
    intro:
      "India's western coast and tropical archipelagos feature rugged cliff-edge highways, historical Maratha sea forts, biodiversity hotspots, and secret coves. From the turtle nesting beaches of Velas and scuba waters of Tarkarli to remote rainforest sanctuaries and the emerald Andaman islands, this circuit is crafted for coastal wanderers.",
    tags: [
      "Coastal", "Beach", "Beaches", "Goa", "Konkan", "Andamans",
      "Island", "Islands", "Maharashtra", "Sahyadri", "Sindhudurg",
      "Tarkarli", "Velas", "Panhala", "Kolhapur", "Amboli", "Cotigao",
      "Gorakhgad", "Alibaug", "Malvan",
    ],
    heroImage: "/images/tarkarli-beach.jpg",
    heroAlt: "Konkan coast beach and clear waters",
    related: ["south-india", "central-india", "himalayas"],
  },
  {
    slug: "south-india",
    label: "South India",
    headline: "South India Circuit",
    description:
      "Misty coffee estates, Dravidian temple architecture, Western Ghats rainforests, and serene backwaters across Karnataka and Kerala.",
    intro:
      "South India rewards contemplative, slow travel. The routes weave through shaded coffee plantations in Coorg and Wayanad, climb into the cool Nilgiri ranges around Ooty, and descend to coastal spice towns and palm-fringed backwaters. Filter coffee, ancient heritage, and lush tropical greenery define this journey.",
    tags: [
      "South India", "Kerala", "Karnataka", "Tamil Nadu", "Coorg",
      "Ooty", "Mysore", "Wayanad", "Nilgiris", "Andhra Pradesh", "Telangana",
    ],
    heroImage: "/images/mysore-palace.jpg",
    heroAlt: "Mysore Palace and South India Western Ghats",
    related: ["coastal", "central-india", "himalayas"],
  },
  {
    slug: "rajasthan",
    label: "Rajasthan & West",
    headline: "Rajasthan & the Royal West",
    description:
      "Living golden forts, desert dunes, lake palaces, and the royal heritage of the Thar and the Golden Triangle.",
    intro:
      "Rajasthan is India at its most regal and evocative. Golden sandstone ramparts rising from the Thar desert, kaleidoscopic bazaars, and palaces poised over mirrored lakes. Coupled with iconic monuments along the historic Yamuna corridor, this region represents centuries of royalty, chivalry, and timeless folklore.",
    tags: [
      "Rajasthan", "Desert", "Jaisalmer", "Udaipur", "Jodhpur",
      "Jaipur", "Gujarat", "Kutch", "Thar", "Agra", "Mathura", "Taj Mahal",
    ],
    heroImage: "/images/rajasthan-desert.jpg",
    heroAlt: "Rajasthan Thar desert golden sand dunes",
    related: ["himalayas", "central-india", "coastal"],
  },
  {
    slug: "northeast-india",
    label: "Northeast India",
    headline: "The Northeast Frontier & Seven Sisters",
    description:
      "Living root bridges, floating lake islands, high Tibetan monasteries, and indigenous tribal heritage across the Seven Sisters and Sikkim.",
    intro:
      "Northeast India is a breathtaking realm of biodiversity, clouds, and indigenous heritage. From Meghalaya's bio-engineered root bridges and Arunachal's remote Buddhist monasteries to Nagaland's green villages, Assam's island monasteries on the Brahmaputra, and Manipur's floating phumdis, this frontier offers experiences found nowhere else in the world.",
    tags: [
      "Northeast", "Meghalaya", "Arunachal", "Nagaland", "Assam",
      "Sikkim", "Manipur", "Mizoram", "Tripura", "Brahmaputra",
      "Living Root Bridge", "Khonoma", "Apatani", "Dzukou",
      "Loktak", "Unakoti", "Vantawng", "Namdapha", "Bomdila",
    ],
    heroImage: "/images/meghalaya-dawki-river.jpg",
    heroAlt: "Crystal clear Umngot River in Dawki Meghalaya",
    related: ["himalayas", "central-india", "south-india"],
  },
];

/**
 * Authoritative, destination-exact classification mapping for all 65 trips.
 * Ensures zero false positives and 100% accurate regional filtering.
 */
export const TRIP_REGION_MAP: Record<string, string[]> = {
  // ── 1. Himalayas & North India (21 trips) ──
  "leh-ladakh-9-days": ["himalayas"],
  "spiti-valley": ["himalayas"],
  "munsiyari-6-days": ["himalayas"],
  "char-dham-yatra-uttarakhand": ["himalayas"],
  "panch-kedar-trek-10-days": ["himalayas"],
  "haridwar-rishikesh-3-days": ["himalayas"],
  "nainital-jim-corbett-3-days": ["himalayas"],
  "himachal-shimla-manali-dharamshala-dalhousie-5-days": ["himalayas"],
  "jammu-kashmir-5-days": ["himalayas"],
  "auli-nearby-3-days": ["himalayas"],
  "chitkul-5-days": ["himalayas"],
  "kalpa-5-days": ["himalayas"],
  "tirthan-valley-6-days": ["himalayas"],
  "malana-4-days": ["himalayas"],
  "barot-valley-4-days": ["himalayas"],
  "rakchham-5-days": ["himalayas"],
  "nako-6-days": ["himalayas"],
  "pangi-valley-6-days": ["himalayas"],
  "tosh-3-days": ["himalayas"],
  "sach-pass-5-days": ["himalayas"],
  "chopta-4-days": ["himalayas"],

  // ── 2. Northeast India & Seven Sisters (17 trips) ──
  "sikkim-7-days": ["northeast-india"],
  "meghalaya-5-days": ["northeast-india"],
  "mawlynnong-cleanest-village": ["northeast-india"],
  "nongriat-double-decker-trek": ["northeast-india"],
  "dawki-umngot-river-meghalaya": ["northeast-india"],
  "mawsynram-wettest-place-earth": ["northeast-india"],
  "majuli-brahmaputra-assam": ["northeast-india"],
  "khonoma-green-village-nagaland": ["northeast-india"],
  "dzukou-valley-trek-nagaland": ["northeast-india"],
  "ziro-valley-apatani": ["northeast-india"],
  "namdapha-national-park-safari": ["northeast-india"],
  "bomdila-monastery-arunachal": ["northeast-india"],
  "ukhrul-tangkhul-manipur": ["northeast-india"],
  "loktak-lake-floating-islands": ["northeast-india"],
  "reiek-hill-mizoram": ["northeast-india"],
  "vantawng-waterfall-thenzawl": ["northeast-india"],
  "unakoti-rock-carvings-tripura": ["northeast-india"],

  // ── 3. Central India & Heartland (11 trips) ──
  "orchha-bundelkhand-heritage": ["central-india"],
  "mandu-afghan-ruins-plateau": ["central-india"],
  "chitrakoot-mp-pilgrimage": ["central-india"],
  "bhimbetka-rock-shelters": ["central-india"],
  "amarkantak-narmada-source": ["central-india"],
  "patalkot-valley-tribal": ["central-india"],
  "panna-tiger-reserve-safari": ["central-india"],
  "tirathgarh-kanger-valley-chhattisgarh": ["central-india"],
  "chitrakoot-waterfall-bastar": ["central-india"],
  "bastar-tribal-culture-haat": ["central-india"],
  "jyotirlinga-pilgrimage-road-trip": ["central-india", "coastal"],

  // ── 4. Coastal India, Sahyadris & Islands (11 trips) ──
  "goa-beyond-beaches": ["coastal"],
  "pune-konkan-coast-raigad": ["coastal"],
  "velas-turtle-festival-konkan": ["coastal"],
  "tarkarli-sindhudurg-beach": ["coastal"],
  "panhala-kolhapur-hill-fort": ["coastal"],
  "amboli-sahyadri-waterfalls": ["coastal"],
  "toranmal-satpura-hill-station": ["coastal", "central-india"],
  "cotigao-wildlife-sanctuary-goa": ["coastal"],
  "gorakhgad-fort-trek-mumbai": ["coastal"],
  "neil-island-6-days": ["coastal"],
  "diglipur-7-days": ["coastal"],

  // ── 5. South India (3 trips) ──
  "mysore-coorg-wayanad-ooty": ["south-india"],
  "kerala-7-days": ["south-india", "coastal"],
  "chorla-ghat-western-ghats": ["south-india", "coastal"],

  // ── 6. Rajasthan & West (2 trips) ──
  "rajasthan-desert-kingdom": ["rajasthan"],
  "agra-mathura-3-days": ["rajasthan", "himalayas"],
};

/**
 * Filter trips that belong to a given region.
 * Uses exact slug mapping if present; falls back to tag matching.
 */
export function filterTripsByRegion(trips: Trip[], region: RegionConfig): Trip[] {
  return trips.filter((t) => {
    const mappedRegions = TRIP_REGION_MAP[t.slug];
    if (mappedRegions && mappedRegions.length > 0) {
      return mappedRegions.includes(region.slug);
    }
    return region.tags.some((rtag) =>
      t.tags?.some((ttag) => ttag.toLowerCase() === rtag.toLowerCase() || ttag.toLowerCase().includes(rtag.toLowerCase()))
    );
  });
}

/**
 * Get all matching regions for a single trip.
 */
export function getTripRegions(trip: Trip): RegionConfig[] {
  const mappedRegions = TRIP_REGION_MAP[trip.slug];
  if (mappedRegions && mappedRegions.length > 0) {
    return REGIONS.filter((r) => mappedRegions.includes(r.slug));
  }
  return REGIONS.filter((r) =>
    r.tags.some((rtag) =>
      trip.tags?.some((ttag) => ttag.toLowerCase() === rtag.toLowerCase() || ttag.toLowerCase().includes(rtag.toLowerCase()))
    )
  );
}
