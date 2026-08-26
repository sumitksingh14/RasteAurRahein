import type { Author } from "@/lib/types";

interface AuthorSchemaProps {
  author: Author;
  url?: string;
}

/**
 * Renders structured data for a Person (author) following Google's E-E-A-T guidance.
 * Drop this into any page that has an author to signal expertise and authority.
 * Also injects a WebSite entity when used in the root layout.
 */
export default function AuthorSchema({ author, url = "https://rasteaurrahein.com" }: AuthorSchemaProps) {
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
      url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
        "@id": "https://rasteaurrahein.com/#website",
        url: "https://rasteaurrahein.com",
        name: "Raste Aur Raahein",
        description:
          "Portfolio-style travel blog documenting high-altitude treks, desert roads, and off-the-beaten-path adventures across India.",
        inLanguage: "en-IN",
        publisher: { "@id": "https://rasteaurrahein.com/#author" },
      },
      {
        "@type": "Person",
        "@id": "https://rasteaurrahein.com/#author",
        name: "Sumit Singh",
        url: "https://rasteaurrahein.com/about",
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
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
