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
    tagline: "Crossed high altitude mountain passes and glacial lakes",
    icon: "🏔️",
    color: "#0284c7",
    requiredTripSlugs: [
      "leh-ladakh-9-days",
      "spiti-valley",
      "munsiyari-6-days",
      "char-dham-yatra-uttarakhand",
      "panch-kedar-trek-10-days",
      "sikkim-7-days",
    ],
    requiredCount: 2,
  },
  {
    id: "konkan-cruiser",
    title: "Konkan Coastal Cruiser",
    region: "Western Coastline",
    tagline: "Traversed cliff-edge coastal highways and sea forts",
    icon: "🌊",
    color: "#0d9488",
    requiredTripSlugs: ["pune-konkan-coast-raigad", "goa-beyond-beaches", "kerala-7-days"],
    requiredCount: 1,
  },
  {
    id: "rajputana-explorer",
    title: "Rajputana Explorer",
    region: "Thar Desert",
    tagline: "Traveled through living golden forts and camel dunes",
    icon: "🏰",
    color: "#d97706",
    requiredTripSlugs: ["rajasthan-desert-kingdom"],
    requiredCount: 1,
  },
  {
    id: "western-ghats-trailblazer",
    title: "Western Ghats Trailblazer",
    region: "South India Highlands",
    tagline: "Navigated mist-covered tea hills, coffee plantations, and wildlife corridors",
    icon: "☕",
    color: "#16a34a",
    requiredTripSlugs: ["mysore-coorg-wayanad-ooty", "kerala-7-days"],
    requiredCount: 1,
  },
  {
    id: "sacred-circuits",
    title: "Sacred Pilgrim",
    region: "Ancient Spiritual Circuits",
    tagline: "Completed historical temple yatras and Himalayan shrines",
    icon: "🛕",
    color: "#ea580c",
    requiredTripSlugs: ["char-dham-yatra-uttarakhand", "panch-kedar-trek-10-days", "jyotirlinga-pilgrimage-road-trip"],
    requiredCount: 1,
  },
  {
    id: "northeast-pioneer",
    title: "Northeast Pioneer",
    region: "The Seven Sisters & Sikkim",
    tagline: "Explored living root bridges, crystal rivers, and cloud kingdoms",
    icon: "🌿",
    color: "#059669",
    requiredTripSlugs: ["meghalaya-5-days", "sikkim-7-days"],
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
