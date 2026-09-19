/**
 * reviewSchema.ts
 *
 * Server-safe helper that derives AggregateRating data from the seed
 * reviews in TravelerReviews.tsx without importing the client component.
 *
 * Used by TripSchema to emit Review/AggregateRating JSON-LD for
 * Google rich result star snippets in search results.
 */

interface AggregateRatingData {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
}

// Mirrors the SEED_REVIEWS data in TravelerReviews.tsx
// Update both files if review data changes.
const SEED_RATINGS: { tripSlugs: string[]; rating: number }[] = [
  { tripSlugs: ["leh-ladakh-9-days"], rating: 5 },
  { tripSlugs: ["spiti-valley"], rating: 5 },
  { tripSlugs: ["rajasthan-desert-kingdom"], rating: 4 },
  { tripSlugs: ["mysore-coorg-wayanad-ooty"], rating: 5 },
  // Generic reviews count toward all trips
  { tripSlugs: [], rating: 5 },
  { tripSlugs: [], rating: 5 },
];

/**
 * Returns AggregateRating values for a given trip slug.
 * Generic reviews (empty tripSlugs) always count.
 */
export function getTripAggregateRating(tripSlug: string): AggregateRatingData | null {
  const applicable = SEED_RATINGS.filter(
    (r) => r.tripSlugs.length === 0 || r.tripSlugs.includes(tripSlug)
  );

  if (applicable.length === 0) return null;

  const avg =
    applicable.reduce((sum, r) => sum + r.rating, 0) / applicable.length;

  return {
    ratingValue: Math.round(avg * 10) / 10,
    reviewCount: applicable.length,
    bestRating: 5,
  };
}
