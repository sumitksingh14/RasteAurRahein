/**
 * TripSchema — Server Component
 *
 * Emits two JSON-LD blocks for trip detail pages:
 *   1. Article — signals to Google that this is a long-form editorial piece,
 *      enabling article-rich results (author byline, publish date, image).
 *   2. TouristTrip — a travel-specific schema type that Google Travel uses to
 *      surface trip details (destination, duration, price range).
 *
 * Drop this inside the <article> wrapper on the trip detail page.
 */

import type { Trip } from "@/lib/types";
import { safeJsonLd } from "@/lib/jsonld";
import { getTripImage } from "@/lib/data/tripImages";
import { getTripAggregateRating } from "@/lib/reviewSchema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rasteaurrahein.com";

interface TripSchemaProps {
  trip: Trip;
}

export default function TripSchema({ trip }: TripSchemaProps) {
  const pageUrl = `${SITE_URL}/trips/${trip.slug}`;
  const imageUrl = getTripImage(trip.slug);

  const durationDays =
    trip.startDate && trip.endDate
      ? Math.ceil(
          (new Date(trip.endDate).getTime() -
            new Date(trip.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : trip.itinerary?.length ?? null;

  // ── Article schema ────────────────────────────────────────────────────────
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: trip.title,
    description: trip.excerpt ?? "",
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: trip._createdAt,
    dateModified: trip._updatedAt || trip._createdAt,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: trip.author?.name ?? "Sumit Singh",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#website`,
      name: "Raste Aur Raahein",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icons/icon-192.png`,
        width: 192,
        height: 192,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    keywords: trip.tags?.join(", ") ?? "",
    articleSection: "Travel Itinerary",
    inLanguage: "en-IN",
    url: pageUrl,
  };

  // ── TouristTrip schema ────────────────────────────────────────────────────
  const touristTripSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${pageUrl}#trip`,
    name: trip.title,
    description: trip.excerpt ?? "",
    url: pageUrl,
    image: imageUrl,
    touristType: trip.tripType
      ? [{ "@type": "Audience", audienceType: trip.tripType }]
      : undefined,
    itinerary:
      trip.itinerary && trip.itinerary.length > 0
        ? {
            "@type": "ItemList",
            numberOfItems: trip.itinerary.length,
            itemListElement: trip.itinerary.map((day, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: day.title,
            })),
          }
        : undefined,
    availableLanguage: { "@type": "Language", name: "English" },
  };

  // Add duration if we can calculate it
  if (durationDays) {
    touristTripSchema.duration = `P${durationDays}D`;
  }

  // Add destination / offers if data present
  if (trip.country) {
    touristTripSchema.touristType = [
      { "@type": "Audience", audienceType: trip.tripType ?? "Adventure" },
    ];
    touristTripSchema.subjectOf = {
      "@type": "CreativeWork",
      about: {
        "@type": "Country",
        name: trip.country,
      },
    };
  }

  if (trip.totalBudget) {
    touristTripSchema.offers = {
      "@type": "Offer",
      price: trip.totalBudget,
      priceCurrency: trip.currency ?? "INR",
      availability: "https://schema.org/InStock",
    };
  }

  // Add AggregateRating for star snippets in Google Search
  const aggregateRating = getTripAggregateRating(trip.slug);
  if (aggregateRating) {
    touristTripSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
    };
  }

  return (
    <>
      <script
        id="trip-article-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
      />
      <script
        id="trip-tourist-trip-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: safeJsonLd(touristTripSchema) }}
      />
    </>
  );
}
