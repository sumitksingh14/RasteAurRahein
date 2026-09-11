export interface PassportStamp {
  id: string;
  title: string;
  region: string;
  tagline: string;
  icon: string;
  color: string;
  requiredTripSlugs: string[];
  requiredCount: number;
}

export interface UnlockedStampStatus {
  stamp: PassportStamp;
  unlocked: boolean;
  progressCount: number;
  unlockedDate?: string;
}

export const PASSPORT_STAMPS: PassportStamp[] = [
  {
    id: "himalayan-wanderer",
    title: "Himalayan Wanderer",
    region: "The Trans-Himalayas",
    tagline: "Crossed high altitude mountain passes, pine valleys, and glacial lakes",
    icon: "🏔️",
    color: "#0284c7",
    requiredTripSlugs: [
      "leh-ladakh-9-days",
      "spiti-valley",
      "munsiyari-6-days",
      "char-dham-yatra-uttarakhand",
      "panch-kedar-trek-10-days",
      "sikkim-7-days",
      "chitkul-kinnaur-himachal",
      "kalpa-kinnaur-kailash",
      "tirthan-valley-jibhi",
      "malana-magic-valley-parvati",
      "barot-valley-uhland-trout",
      "rakchham-baspa-valley",
      "nako-spiti-gateway",
      "pangi-valley-himachal",
      "tosh-parvati-valley",
      "sach-pass-chamba-pangi",
      "chopta-tungnath-chandrashila",
      "haridwar-rishikesh-3-days",
      "nainital-jim-corbett-3-days",
      "himachal-shimla-manali-dharamshala-dalhousie-5-days",
      "jammu-kashmir-5-days",
      "auli-nearby-3-days",
    ],
    requiredCount: 2,
  },
  {
    id: "konkan-cruiser",
    title: "Konkan Coastal Cruiser",
    region: "Western Coastline & Sahyadri",
    tagline: "Traversed cliff-edge coastal highways, sea forts, and Sahyadri crests",
    icon: "🌊",
    color: "#0d9488",
    requiredTripSlugs: [
      "pune-konkan-coast-raigad",
      "goa-beyond-beaches",
      "velas-turtle-festival-konkan",
      "tarkarli-sindhudurg-beach",
      "panhala-kolhapur-hill-fort",
      "amboli-sahyadri-waterfalls",
      "toranmal-satpura-hill-station",
      "chorla-ghat-western-ghats",
      "cotigao-wildlife-sanctuary-goa",
      "gorakhgad-fort-trek-mumbai",
    ],
    requiredCount: 1,
  },
  {
    id: "rajputana-explorer",
    title: "Rajputana Explorer",
    region: "Thar Desert & Heartland",
    tagline: "Traveled through living golden forts, palaces, and camel dunes",
    icon: "🏰",
    color: "#d97706",
    requiredTripSlugs: [
      "rajasthan-desert-kingdom",
      "agra-mathura-3-days",
      "orchha-bundelkhand-heritage",
      "mandu-afghan-ruins-plateau",
    ],
    requiredCount: 1,
  },
  {
    id: "western-ghats-trailblazer",
    title: "Western Ghats Trailblazer",
    region: "South India Highlands",
    tagline: "Navigated mist-covered tea hills, coffee plantations, and backwaters",
    icon: "☕",
    color: "#16a34a",
    requiredTripSlugs: [
      "mysore-coorg-wayanad-ooty",
      "kerala-7-days",
    ],
    requiredCount: 1,
  },
  {
    id: "sacred-circuits",
    title: "Sacred Pilgrim",
    region: "Ancient Spiritual Circuits",
    tagline: "Completed historical temple yatras, cave shelters, and sacred rivers",
    icon: "🛕",
    color: "#ea580c",
    requiredTripSlugs: [
      "char-dham-yatra-uttarakhand",
      "panch-kedar-trek-10-days",
      "jyotirlinga-pilgrimage-road-trip",
      "haridwar-rishikesh-3-days",
      "chitrakoot-mp-pilgrimage",
      "amarkantak-narmada-source",
      "bhimbetka-rock-shelters",
    ],
    requiredCount: 1,
  },
  {
    id: "northeast-pioneer",
    title: "Northeast Pioneer",
    region: "The Seven Sisters & Sikkim",
    tagline: "Explored living root bridges, crystal rivers, and cloud kingdoms",
    icon: "🌿",
    color: "#059669",
    requiredTripSlugs: [
      "meghalaya-5-days",
      "sikkim-7-days",
      "ziro-valley-apatani",
      "dzukou-valley-trek-nagaland",
      "mawlynnong-cleanest-village",
      "nongriat-double-decker-trek",
      "dawki-umngot-river-meghalaya",
      "mawsynram-wettest-place-earth",
      "majuli-brahmaputra-assam",
      "khonoma-green-village-nagaland",
      "ukhrul-tangkhul-manipur",
      "loktak-lake-floating-islands",
      "unakoti-carvings-tripura",
      "namdapha-national-park",
      "bomdila-monastery-arunachal",
      "reiek-heritage-mizoram",
      "vantawng-falls-mizoram",
      "tirathgarh-kanger-valley-chhattisgarh",
      "chitrakoot-waterfall-bastar",
      "bastar-tribal-culture-haat",
      "patalkot-valley-tribal",
      "panna-tiger-reserve-safari",
    ],
    requiredCount: 1,
  },
];

export function evaluateUserStamps(savedTripSlugs: string[] = []): UnlockedStampStatus[] {
  const normalizedSlugs = new Set(savedTripSlugs.map((s) => s.toLowerCase()));

  return PASSPORT_STAMPS.map((stamp) => {
    const matched = stamp.requiredTripSlugs.filter((slug) => normalizedSlugs.has(slug.toLowerCase()));
    const progressCount = matched.length;
    const unlocked = progressCount >= stamp.requiredCount;

    return {
      stamp,
      unlocked,
      progressCount,
      unlockedDate: unlocked ? new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : undefined,
    };
  });
}
