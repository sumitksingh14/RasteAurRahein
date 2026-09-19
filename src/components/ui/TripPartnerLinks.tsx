"use client";

import { ExternalLink, Hotel, ShoppingBag, ShieldCheck, FileText } from "lucide-react";

interface PartnerLink {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
  badge?: string;
}

// Per-trip affiliate config — swap # hrefs with your real affiliate-tagged URLs
// Booking.com Partner: https://www.booking.com/affiliateprogramme/
// Amazon Associates India: https://affiliate-program.amazon.in/
const TRIP_PARTNER_CONFIG: Record<string, Partial<Record<string, string>>> = {
  "leh-ladakh-9-days": {
    hotel: "https://www.booking.com/searchresults.html?ss=Leh%2C+Ladakh",
    gear: "https://www.amazon.in/s?k=ladakh+road+trip+gear",
  },
  "spiti-valley": {
    hotel: "https://www.booking.com/searchresults.html?ss=Kaza%2C+Spiti",
    gear: "https://www.amazon.in/s?k=spiti+valley+trekking+gear",
  },
  "rajasthan-desert-kingdom": {
    hotel: "https://www.booking.com/searchresults.html?ss=Jaisalmer",
    gear: "https://www.amazon.in/s?k=rajasthan+road+trip+essentials",
  },
};

function buildLinks(tripSlug: string, country?: string): PartnerLink[] {
  const slugConfig = TRIP_PARTNER_CONFIG[tripSlug] ?? {};
  const searchDest = country ?? "India";

  return [
    {
      icon: Hotel,
      label: "Book Accommodation",
      description: "Hotels, homestays & camps — verified traveller reviews",
      href: slugConfig.hotel ?? `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(searchDest)}`,
      badge: "Booking.com",
    },
    {
      icon: ShoppingBag,
      label: "Trip Gear & Essentials",
      description: "Backpacks, thermals, altitude meds & more",
      href: slugConfig.gear ?? `https://www.amazon.in/s?k=${encodeURIComponent(tripSlug + " travel gear")}`,
      badge: "Amazon India",
    },
    {
      icon: ShieldCheck,
      label: "Travel Insurance",
      description: "Single-trip cover with adventure sports & medical",
      href: "https://www.bajajallianz.com/travel-insurance.html",
      badge: "Bajaj Allianz",
    },
    {
      icon: FileText,
      label: "Permit Information",
      description: "Entry permit requirements, fees & processing time",
      href: `/trips/${tripSlug}#permits`,
      badge: "On this page",
    },
  ];
}

interface TripPartnerLinksProps {
  tripSlug: string;
  country?: string;
}

export default function TripPartnerLinks({ tripSlug, country }: TripPartnerLinksProps) {
  const links = buildLinks(tripSlug, country);

  return (
    <div>
      <div style={{
        fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "0.75rem",
      }}>
        Helpful Links
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {links.map(({ icon: Icon, label, description, href, badge }) => {
          const isExternal = href.startsWith("http");
          return (
            <a
              key={label}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="glass-card"
              style={{
                display: "flex", alignItems: "flex-start", gap: "0.75rem",
                padding: "0.875rem", textDecoration: "none",
                transition: "all var(--transition)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-accent)";
                e.currentTarget.style.background = "var(--bg-card-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--bg-glass)";
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: "var(--accent-gold-dim)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={15} color="var(--accent-gold)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
                    {label}
                  </span>
                  {isExternal && <ExternalLink size={10} color="var(--text-muted)" />}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                  {description}
                </div>
                {badge && (
                  <div style={{
                    marginTop: "0.3rem", display: "inline-block",
                    fontSize: "0.65rem", fontWeight: 600, padding: "1px 6px",
                    borderRadius: 4, background: "var(--bg-primary)",
                    border: "1px solid var(--border)", color: "var(--text-muted)",
                    letterSpacing: "0.04em",
                  }}>
                    {badge}
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </div>

      <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.75rem", lineHeight: 1.4, fontStyle: "italic" }}>
        Some links may be affiliate links — using them costs you nothing and helps keep this site free.
      </p>
    </div>
  );
}
