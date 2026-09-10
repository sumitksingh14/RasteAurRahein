import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Light mode (for use on light backgrounds). Defaults to dark/glass mode. */
  light?: boolean;
}

/**
 * Breadcrumb component — renders:
 *  1. A visible pill navigation trail: Home > Trips > [Trip Title]
 *  2. BreadcrumbList JSON-LD for Google rich snippets
 *
 * Usage:
 *   <Breadcrumb items={[{ label: "Trips", href: "/trips" }, { label: trip.title }]} />
 */
export default function Breadcrumb({ items, light = false }: BreadcrumbProps) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rasteaurrahein.com";

  const allItems = [{ label: "Home", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: item.href ? `${BASE_URL}${item.href}` : undefined,
    })),
  };

  const textColor = light ? "#4B5563" : "rgba(255,255,255,0.55)";
  const activeColor = light ? "#111827" : "rgba(255,255,255,0.9)";
  const separatorColor = light ? "#9CA3AF" : "rgba(255,255,255,0.3)";

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexWrap: "wrap" }}
      >
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1;
          return (
            <span
              key={idx}
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  style={{
                    fontSize: "0.8rem",
                    color: textColor,
                    textDecoration: "none",
                    transition: "color 0.15s",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{
                    fontSize: "0.8rem",
                    color: isLast ? activeColor : textColor,
                    fontWeight: isLast ? 500 : 400,
                    fontFamily: "var(--font-sans)",
                    maxWidth: "20ch",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={isLast ? item.label : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span style={{ color: separatorColor, fontSize: "0.7rem" }}>
                  /
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
