import type { Metadata } from "next";
import { getAllTrips } from "@/lib/queries";
import TripsClient from "./TripsClient";
import { safeJsonLd } from "@/lib/jsonld";
import SilkPageHeader from "@/components/ui/SilkPageHeader";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rasteaurrahein.com";

export const metadata: Metadata = {
  title: "India Travel Itineraries — All Trips | Raste Aur Raahein",
  description:
    "Browse detailed travel itineraries across India — Himalayan road trips, desert drives, coastal routes, and forest trails. Filter by region, season, and budget.",
  keywords: [
    "India travel itineraries",
    "Himalayan road trip",
    "adventure travel India",
    "Spiti Valley",
    "Leh Ladakh",
    "offbeat India",
    "travel planning India",
  ],
  alternates: { canonical: "/trips" },
  openGraph: {
    title: "India Travel Itineraries — All Trips | Raste Aur Raahein",
    description:
      "Browse detailed travel itineraries across India — Himalayan road trips, desert drives, coastal routes, and forest trails.",
    type: "website",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: "Raste Aur Raahein trips" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Travel Itineraries | Raste Aur Raahein",
    description: "Documented adventures across India — search or browse by region, season, and budget.",
    images: ["/icons/icon-512.png"],
  },
};


type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TripsPage(props: PageProps) {
  const sp = await props.searchParams;
  const trips = await getAllTrips();
  
  const initialQuery = typeof sp.query === 'string' ? sp.query : "";
  const initialTag = typeof sp.tag === 'string' ? sp.tag : (typeof sp.tags === 'string' ? sp.tags : "");
  const initialSeason = typeof sp.season === 'string' ? sp.season : "Any";
  const initialDurationIdx = typeof sp.durationIdx === 'string' ? parseInt(sp.durationIdx, 10) : 0;
  const initialBudgetIdx = typeof sp.budgetIdx === 'string' ? parseInt(sp.budgetIdx, 10) : 0;
  const initialRegion = typeof sp.region === 'string' ? sp.region : "Any";
  const initialSortBy = (sp.sortBy === "views" || sp.sortBy === "title" || sp.sortBy === "date") ? sp.sortBy : "date";
  const initialDifficulty = (sp.difficulty === "Easy" || sp.difficulty === "Moderate" || sp.difficulty === "Hard") ? sp.difficulty : "Any";

  // CollectionPage JSON-LD for Google structured data
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "India Travel Itineraries",
    description:
      "Browse detailed travel itineraries across India — Himalayan road trips, desert drives, coastal routes, and forest trails.",
    url: `${BASE_URL}/trips`,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#website`,
      name: "Raste Aur Raahein",
    },
    hasPart: trips.slice(0, 10).map((trip) => ({
      "@type": "TouristTrip",
      name: trip.title,
      url: `${BASE_URL}/trips/${trip.slug}`,
      description: trip.excerpt ?? "",
    })),
  };

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* CollectionPage JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: safeJsonLd(collectionSchema) }}
      />
      {/* Silk 3D Page header */}
      <SilkPageHeader
        eyebrow="✦ Explore"
        heading="India Trips"
        description={`${trips.length} documented adventures across India — search or browse by tag.`}
        maxWidth={900}
      />

      <TripsClient 
        trips={trips} 
        initialQuery={initialQuery}
        initialTag={initialTag}
        initialSeason={initialSeason}
        initialDurationIdx={initialDurationIdx}
        initialBudgetIdx={initialBudgetIdx}
        initialRegion={initialRegion}
        initialSortBy={initialSortBy}
        initialDifficulty={initialDifficulty as "Any" | "Easy" | "Moderate" | "Hard"}
      />
    </div>
  );
}
