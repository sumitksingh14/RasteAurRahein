/**
 * Deterministic pseudo-random likes generator for trips.
 * Ensures consistent likes in range (50-500) per trip across page refreshes.
 */
export function getTripDummyLikes(slug: string): number {
  if (!slug) return 150;
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  // Range: 50 to 500 inclusive (50 + [0..450])
  return 50 + (absHash % 451);
}
