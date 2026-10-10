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
  
  let initialQuery = typeof sp.query === "string" ? sp.query : (typeof sp.q === "string" ? sp.q : "");
  if (!initialQuery && typeof sp.startingFrom === "string" && sp.startingFrom !== "Any Departure") {
    initialQuery = sp.startingFrom;
  } else if (!initialQuery && typeof sp.from === "string" && sp.from !== "Any Departure") {
    initialQuery = sp.from;
  }

  const initialTag = typeof sp.tag === "string" ? sp.tag : (typeof sp.tags === "string" ? sp.tags : "");

  let initialSeason = typeof sp.season === "string" ? sp.season : "Any";
  if (initialSeason === "Any" && typeof sp.month === "string" && sp.month !== "Any") {
    const m = sp.month.toLowerCase();
    if (["march", "april", "may"].includes(m)) initialSeason = "Summer";
    else if (["june", "july", "august", "september"].includes(m)) initialSeason = "Monsoon";
    else if (["october", "november"].includes(m)) initialSeason = "Autumn";
    else if (["december", "january", "february"].includes(m)) initialSeason = "Winter";
  }

  let initialDurationIdx = typeof sp.durationIdx === "string" ? parseInt(sp.durationIdx, 10) : 0;
  if (!initialDurationIdx && typeof sp.days === "string") {
    const dStr = sp.days.toLowerCase();
    if (dStr.includes("1-3") || dStr.includes("1–3")) initialDurationIdx = 1;
    else if (dStr.includes("4-7") || dStr.includes("4–7")) initialDurationIdx = 2;
    else if (dStr.includes("8-14") || dStr.includes("8–14")) initialDurationIdx = 3;
    else if (dStr.includes("15")) initialDurationIdx = 4;
  }

  let initialBudgetIdx = typeof sp.budgetIdx === "string" ? parseInt(sp.budgetIdx, 10) : 0;
  if (!initialBudgetIdx && typeof sp.budget === "string") {
    const bStr = sp.budget.toLowerCase();
    if (bStr.includes("20k") && (bStr.includes("under") || bStr.includes("<"))) initialBudgetIdx = 1;
    else if (bStr.includes("20k") && bStr.includes("50k")) initialBudgetIdx = 2;
    else if (bStr.includes("50k") && (bStr.includes("1l") || bStr.includes("100k"))) initialBudgetIdx = 3;
    else if (bStr.includes("1l") || bStr.includes("100k")) initialBudgetIdx = 4;
  }

  const initialRegion = typeof sp.region === "string" ? sp.region : "Any";
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
