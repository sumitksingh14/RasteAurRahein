/**
 * Builds a schema.org BreadcrumbList JSON-LD object.
 *
 * Usage:
 *   import { buildBreadcrumbSchema } from "@/lib/breadcrumbSchema";
 *
 *   const schema = buildBreadcrumbSchema([
 *     { label: "Trips", url: "/trips" },
 *     { label: "Spiti Valley Road Trip" },     // last item — no url needed
 *   ]);
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rasteaurrahein.com";

export interface BreadcrumbItem {
  label: string;
  /** Relative or absolute URL. Omit for the current/last crumb. */
  url?: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.url
        ? {
            item: item.url.startsWith("http")
              ? item.url
              : `${SITE_URL}${item.url}`,
          }
        : {}),
    })),
  };
}
