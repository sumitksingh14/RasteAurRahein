import type { Trip } from "@/lib/types";

export interface RegionConfig {
  slug: string;
  label: string;
  headline: string;
  description: string;
  intro: string;
  /** Tags that match trips to this region */
  tags: string[];
  /** Hero image (Unsplash) */
  heroImage: string;
  heroAlt: string;
  /** Related region slugs for cross-links */
  related: string[];
}

export const REGIONS: RegionConfig[] = [
  {
    slug: "himalayas",
    label: "Himalayas",
    headline: "The Himalayan Circuit",
    description:
      "High-altitude passes, ancient monasteries, and cold deserts — the definitive guide to road-tripping through India's Himalayan regions.",
    intro:
      "From Spiti Valley's moonscapes to the prayer-flag-strung passes of Ladakh, the Himalayas offer some of the most dramatic and demanding road trips on the planet. Expect altitude, solitude, and roads that test both driver and machine — rewarded by landscapes that feel genuinely otherworldly.",
    tags: [
      "Himalayas", "Spiti Valley", "Ladakh", "Trekking",
      "Himachal", "Uttarakhand", "High Altitude",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=85",
    heroAlt: "Himalayan mountain landscape with ancient monastery",
    related: ["northeast-india", "rajasthan"],
  },
  {
    slug: "south-india",
    label: "South India",
    headline: "South India Circuit",
    description:
      "Temple towns, misty hill stations, and the coast — a complete guide to road-tripping through Karnataka, Kerala, Tamil Nadu and beyond.",
    intro:
      "South India rewards slow travel. The roads weave through coffee estates in Coorg, climb into mist-wrapped Nilgiris, and drop to coastlines where the Arabian Sea and the Bay of Bengal collide at Kanyakumari. Filter coffee, Dravidian temples, and a pace of life that resists hurry.",
    tags: [
      "South India", "Kerala", "Karnataka", "Tamil Nadu", "Coorg",
      "Ooty", "Mysore", "Wayanad", "Coastal",
    ],
    heroImage:
      "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/d4676652506983.591f0235258b3.jpg",
    heroAlt: "Misty Western Ghats hills in South India",
    related: ["coastal", "himalayas"],
  },
  {
    slug: "rajasthan",
    label: "Rajasthan / Desert",
    headline: "Rajasthan & the Desert",
    description:
      "Forts, palaces, and sand dunes — the grand circuit through India's royal desert state.",
    intro:
      "Rajasthan is India at its most theatrical. Blue cities, golden deserts, and palaces so ornate they look like set design. The roads link a succession of royal capitals — Jaipur, Jodhpur, Jaisalmer, Udaipur — each different enough to justify the drive, each worth at least two nights.",
    tags: [
      "Rajasthan", "Desert", "Jaisalmer",
      "Udaipur", "Jodhpur", "Jaipur",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1920&q=85",
    heroAlt: "Rajasthan golden desert landscape with palace",
    related: ["himalayas", "coastal"],
  },
  {
    slug: "coastal",
    label: "Coastal India",
    headline: "India's Coastlines",
    description:
      "From Goa's backstreets to Kerala's backwaters — the best coastal road trips along India's western and southern shores.",
    intro:
      "India has over 7,500 km of coastline and almost none of it is boring. The Konkan coast switchbacks between cliffs and coves; Goa offers colonial-era churches and all-day beaches; Kerala unrolls into backwaters and lagoons. The best coastal drives are best done outside peak season — quieter roads, cooler air.",
    tags: [
      "Beach", "Goa", "Coastal", "Beaches", "Kerala",
      "Konkan", "Mangalore",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=85",
    heroAlt: "Goa beach with palm trees and Arabian Sea",
    related: ["south-india", "rajasthan"],
  },
  {
    slug: "northeast-india",
    label: "Northeast India",
    headline: "The Northeast Frontier",
    description:
      "Living root bridges, cloud-wrapped peaks, and cultures unlike anywhere else — the least-visited and most rewarding corner of India.",
    intro:
      "Northeast India remains India's best-kept travel secret. Meghalaya's living root bridges and wettest place on earth; Arunachal Pradesh's Buddhist monasteries and snow peaks bordering Tibet; Nagaland's warrior heritage and hornbill festivals. These trips require more planning, more time, and reward both generously.",
    tags: [
      "Northeast", "Meghalaya", "Arunachal", "Nagaland", "Assam",
      "Trekking",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=85",
    heroAlt: "Lush green landscape in Northeast India",
    related: ["himalayas", "south-india"],
  },
];

/** Filter trips that belong to a given region */
export function filterTripsByRegion(trips: Trip[], region: RegionConfig): Trip[] {
  return trips.filter((t) =>
    region.tags.some((rtag) =>
      t.tags?.some((ttag) => ttag.toLowerCase().includes(rtag.toLowerCase()))
    )
  );
}
