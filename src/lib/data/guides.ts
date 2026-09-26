export interface GuideMeta {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  featuredTripSlugs: string[];
}

export const FIELD_GUIDES: GuideMeta[] = [
  {
    slug: "spiti-vs-ladakh",
    title: "Spiti vs Ladakh: The Honest, Unsponsored Overland Comparison",
    category: "Trans-Himalayan Face-Off",
    excerpt: "Terrain brutality, acclimatization curves, permits, and vehicle demands compared side-by-side.",
    readTime: "12 min read",
    featuredTripSlugs: [
      "spiti-valley",
      "leh-ladakh-9-days",
      "sach-pass-5-days",
      "hanle-5-days",
      "turtuk-5-days",
    ],
  },
  {
    slug: "best-monsoon-road-trips-south-india",
    title: "Best Monsoon Road Trips in South India: 6 Ghat Drives That Come Alive in Rain",
    category: "Monsoon Routes",
    excerpt: "Kolli Hills, Agumbe, Athirappilly, Hogenakkal, Yercaud, and Chelavara rain-soaked circuits.",
    readTime: "10 min read",
    featuredTripSlugs: [
      "vazhachal-falls-3-days",
      "kolli-hills-3-days",
      "yercaud-4-days",
      "hogenakkal-falls-3-days",
      "valparai-4-days",
      "agumbe-3-days",
      "chelavara-falls-3-days",
    ],
  },
  {
    slug: "kerala-waterfalls-guide",
    title: "Kerala Waterfalls Field Guide: Athirappilly, Vazhachal & Secret Forest Cascades",
    category: "Regional Guide",
    excerpt: "Chalakudy river corridor logistics, forest department timings, and Anamalai connections.",
    readTime: "9 min read",
    featuredTripSlugs: [
      "vazhachal-falls-3-days",
      "kerala-7-days",
      "valparai-4-days",
      "chelavara-falls-3-days",
    ],
  },
  {
    slug: "himalayan-passes-explained",
    title: "Himalayan Passes Explained: Kunzum, Rohtang, Baralacha La, Zoji La & Sela",
    category: "Technical Mountain Driving",
    excerpt: "Altitude drops, black ice physics, BRO clearing windows, and vehicle clearance requirements.",
    readTime: "14 min read",
    featuredTripSlugs: [
      "spiti-valley",
      "leh-ladakh-9-days",
      "sach-pass-5-days",
    ],
  },
];

/** Get all guides that feature this trip slug */
export function getGuidesForTrip(tripSlug: string): GuideMeta[] {
  return FIELD_GUIDES.filter((g) => g.featuredTripSlugs.includes(tripSlug));
}
