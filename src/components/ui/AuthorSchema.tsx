import type { Author } from "@/lib/types";
import { safeJsonLd } from "@/lib/jsonld";

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
  const sameAs: string[] = (author.socialLinks ?? []).map((l) => l.url).filter(Boolean);

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
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Raste Aur Raahein",
        description:
          "Portfolio-style travel blog documenting high-altitude treks, desert roads, and off-the-beaten-path adventures across India.",
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#author` },
        // potentialAction — SearchAction (only if the site has a /search route)
        // Uncomment when /search is live:
        // potentialAction: {
        //   "@type": "SearchAction",
        //   target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/trips?q={search_term_string}` },
        //   "query-input": "required name=search_term_string",
        // },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#author`,
        name: "Sumit Singh",
        url: `${SITE_URL}/about`,
        description:
          "Travel writer, photographer, and software engineer documenting the roads less taken across India.",
        sameAs: ["https://instagram.com", "https://twitter.com"],
        jobTitle: "Travel Writer & Photographer",
        knowsAbout: [
          "India travel",
          "High-altitude road trips",
          "Himalayan trekking",
          "Budget travel",
        ],
      },
    ],
  };

  return (
    <script
      id="website-schema"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
