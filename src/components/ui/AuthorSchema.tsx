import type { Author } from "@/lib/types";
import { safeJsonLd } from "@/lib/jsonld";
import { getValidSocialUrls, isValidSocialUrl } from "@/lib/site-config";

// Strip trailing slash — env var ships with one ("https://…vercel.app/")
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://raste-aur-rahein.vercel.app"
).replace(/\/$/, "");

interface AuthorSchemaProps {
  author: Author;
  url?: string;
}

/**
 * Renders structured data for a Person (author) following Google's E-E-A-T guidance.
 * Drop this into any page that has an author to signal expertise and authority.
 */
export default function AuthorSchema({ author, url = SITE_URL }: AuthorSchemaProps) {
  const sameAs: string[] = Array.from(
    new Set(
      [
        ...getValidSocialUrls(),
        ...(author.socialLinks ?? []).map((l) => l.url),
      ].filter(isValidSocialUrl)
    )
  );

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url,
    description: author.bio || "Travel writer documenting India's roads less taken.",
    sameAs,
    jobTitle: "Travel Writer & Photographer",
    knowsAbout: [
      "India travel",
      "High-altitude road trips",
      "Himalayan trekking",
      "Budget travel",
      "Travel itinerary planning",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Raste Aur Raahein",
      url: SITE_URL,
    },
  };

  return (
    <script
      id="author-schema"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: safeJsonLd(personSchema) }}
    />
  );
}

/** Site-level WebSite + Person combo — use in the root layout once */
export function WebSiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "India Trip Itineraries",
    alternateName: [
      "India Trip Itineraries",
      "Raste Aur Raahein",
      "India Trip Itineraries - Raste Aur Raahein",
      "RasteAurRahein",
    ],
    url: `${SITE_URL}/`,
    description:
      "Curated India travel itineraries, high-altitude treks, road trips, and route guides by Sumit Singh.",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "India Trip Itineraries",
      alternateName: "Raste Aur Raahein",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icons/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
  };

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#author`,
    name: "Sumit Singh",
    url: `${SITE_URL}/about`,
    description:
      "Travel writer, photographer, and software engineer documenting the roads less taken across India.",
    sameAs: getValidSocialUrls(),
    jobTitle: "Travel Writer & Photographer",
    knowsAbout: [
      "India travel",
      "High-altitude road trips",
      "Himalayan trekking",
      "Budget travel",
    ],
  };

  return (
    <>
      <script
        id="website-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />
      <script
        id="site-author-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: safeJsonLd(authorSchema) }}
      />
    </>
  );
}
