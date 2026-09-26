import type { Metadata } from "next";
import Link from "next/link";
import NewsletterInline from "@/components/ui/NewsletterInline";

export const metadata: Metadata = {
  title: "Field Guides & Overland Playbooks | Raste Aur Raahein",
  description:
    "Long-form comparative guides, seasonal route analysis, and overland playbooks for Indian road trips and Himalayan passes, curated by Sumit Singh.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Field Guides & Overland Playbooks | Raste Aur Raahein",
    description: "In-depth expedition guides, route comparisons, and seasonal advice.",
    type: "website",
  },
};

const GUIDES = [
  {
    slug: "spiti-vs-ladakh",
    title: "Spiti vs Ladakh: The Honest, Unsponsored Overland Comparison",
    excerpt:
      "Terrain brutality, oxygen levels, acclimatization curves, budget differences, and permit bureaucracy. Which trans-Himalayan high desert is right for your vehicle and timeline?",
    readTime: "12 min read",
    category: "Trans-Himalayan Comparison",
    tags: ["Spiti", "Ladakh", "High Altitude", "Overland"],
    heroIcon: "🏔️",
  },
  {
    slug: "best-monsoon-road-trips-south-india",
    title: "Best Monsoon Road Trips in South India: 6 Ghat Drives That Come Alive in the Rain",
    excerpt:
      "From the 70 hairpin bends of Kolli Hills to the mist-drenched rainforests of Agumbe and the thunder of Athirappilly. Real road conditions, tire recommendations, and monsoon safety.",
    readTime: "10 min read",
    category: "Monsoon Routes",
    tags: ["Western Ghats", "Kerala", "Tamil Nadu", "Karnataka"],
    heroIcon: "🌧️",
  },
  {
    slug: "kerala-waterfalls-guide",
    title: "Kerala Waterfalls Field Guide: Athirappilly, Vazhachal & the Hidden Forest Cascades",
    excerpt:
      "A complete guide to navigating the Sholayar rainforest corridor, monsoon flow timing, forest department check-posts, and combining waterfalls with tea plantations.",
    readTime: "9 min read",
    category: "Regional Field Guide",
    tags: ["Kerala", "Waterfalls", "Western Ghats", "Chalakudy"],
    heroIcon: "🌊",
  },
  {
    slug: "himalayan-passes-explained",
    title: "Himalayan Passes Explained: Kunzum, Rohtang, Baralacha La, Zoji La & Sela",
    excerpt:
      "Altitude physiology, BRO clearing windows, vehicle ground clearance, black ice management, and bypass tunnels. What every driver needs to know before crossing 13,000+ feet.",
    readTime: "14 min read",
    category: "Technical Mountain Driving",
    tags: ["High Passes", "BRO", "Himachal", "Ladakh", "Arunachal"],
    heroIcon: "🛣️",
  },
];

export default function GuidesHubPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1b4b 100%)",
          padding: "4rem 1.5rem 3.5rem",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)",
              color: "#fde68a",
              padding: "0.25rem 0.85rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "1rem",
            }}
          >
            Editorial Playbooks
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              fontWeight: 700,
              margin: "0 0 1rem",
              lineHeight: 1.15,
            }}
          >
            Expedition Field Guides
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "650px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Deep-dive overland analysis, route face-offs, and mountain logistics. Built from genuine odometer miles and field notebooks.
          </p>
        </div>
      </section>

      {/* Guide Cards Grid */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3.5rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {GUIDES.map((guide) => (
            <article
              key={guide.slug}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid var(--border, #e5e7eb)",
                borderRadius: "1rem",
                background: "var(--bg-primary, #fff)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                overflow: "hidden",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div
                style={{
                  padding: "1.75rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "2rem" }}>{guide.heroIcon}</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-tertiary, #6b7280)",
                    }}
                  >
                    {guide.readTime}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--accent-gold, #b45309)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {guide.category}
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-serif, Georgia, serif)",
                    fontSize: "1.375rem",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    margin: "0 0 0.85rem",
                    color: "var(--text-primary, #111827)",
                  }}
                >
                  <Link
                    href={`/guides/${guide.slug}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {guide.title}
                  </Link>
                </h2>

                <p
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    color: "var(--text-secondary, #4b5563)",
                    marginBottom: "1.5rem",
                    flex: 1,
                  }}
                >
                  {guide.excerpt}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {guide.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.6875rem",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.25rem",
                        background: "var(--bg-secondary, #f3f4f6)",
                        color: "var(--text-secondary, #4b5563)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/guides/${guide.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    color: "var(--accent-gold, #b45309)",
                    textDecoration: "none",
                  }}
                >
                  Read full playbook →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: "4rem" }}>
          <NewsletterInline
            title="Receive New Overland Guides"
            subtitle="Get unsponsored mountain routing breakdowns and expedition field manuals delivered once a month."
          />
        </div>
      </div>
    </div>
  );
}
