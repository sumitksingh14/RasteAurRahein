import type { Metadata } from "next";
import Link from "next/link";
import NewsletterInline from "@/components/ui/NewsletterInline";

export const metadata: Metadata = {
  title: "Best Monsoon Road Trips in South India: 6 Ghat Drives That Come Alive in Rain",
  description:
    "When the southwest monsoon slams into the Western Ghats, these 6 mountain highways transform into emerald corridors with raging cascades and cloud cover. Real driving conditions and route notes.",
  alternates: {
    canonical: "/guides/best-monsoon-road-trips-south-india",
  },
  openGraph: {
    title: "Best Monsoon Road Trips in South India | Raste Aur Raahein",
    description: "6 incredible rain-soaked ghat road trips across Kerala, Tamil Nadu, and Karnataka.",
    type: "article",
  },
};

export default function MonsoonRoadTripsSouthIndiaGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Monsoon Road Trips in South India: 6 Ghat Drives That Come Alive in Rain",
    description: "Comprehensive field guide to the top rainy-season mountain drives in South India.",
    author: {
      "@type": "Person",
      name: "Sumit Singh",
    },
    publisher: {
      "@type": "Organization",
      name: "Raste Aur Raahein",
      url: "https://raste-aur-rahein.vercel.app",
    },
    mainEntityOfPage: "https://raste-aur-rahein.vercel.app/guides/best-monsoon-road-trips-south-india",
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://raste-aur-rahein.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: "https://raste-aur-rahein.vercel.app/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Best Monsoon Road Trips South India",
        item: "https://raste-aur-rahein.vercel.app/guides/best-monsoon-road-trips-south-india",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <article style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          style={{
            maxWidth: "840px",
            margin: "0 auto",
            padding: "1.25rem 1.5rem 0.5rem",
            fontSize: "0.8125rem",
            color: "var(--text-tertiary, #6b7280)",
          }}
        >
          <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", listStyle: "none", margin: 0, padding: 0 }}>
            <li>
              <Link href="/" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/guides" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>
                Guides
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: "var(--text-primary, #111827)", fontWeight: 600 }}>
              Monsoon Road Trips South India
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header
          style={{
            background: "linear-gradient(135deg, #064e3b 0%, #065f46 60%, #022c22 100%)",
            color: "#fff",
            padding: "3rem 1.5rem 3.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "840px", margin: "0 auto" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.12)",
                color: "#6ee7b7",
                padding: "0.25rem 0.85rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              Western Ghats Monsoon Circuits
            </span>
            <h1
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                margin: "0 0 1rem",
              }}
            >
              Best Monsoon Road Trips in South India: 6 Ghat Drives That Come Alive in Rain
            </h1>
            <p
              style={{
                fontSize: "1.0625rem",
                color: "rgba(255,255,255,0.85)",
                maxWidth: "680px",
                margin: "0 auto 1.5rem",
                lineHeight: 1.6,
              }}
            >
              Most tourists retreat indoors when the southwest monsoon arrives in June. For motorists and road trippers, this is the premier season to point your bonnet toward the Ghats.
            </p>
            <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)" }}>
              By Sumit Singh • 10 min read • Field-tested July–September
            </div>
          </div>
        </header>

        {/* Main Body */}
        <div style={{ maxWidth: "840px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
          {/* Table of Contents */}
          <nav
            style={{
              padding: "1.5rem",
              background: "var(--bg-secondary, #f9fafb)",
              borderRadius: "0.75rem",
              border: "1px solid var(--border, #e5e7eb)",
              marginBottom: "3rem",
            }}
          >
            <h2 style={{ fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 1rem", color: "var(--text-primary, #111827)" }}>
              In This Monsoon Guide
            </h2>
            <ol style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: 1.8, fontSize: "0.9375rem" }}>
              <li><a href="#why-monsoon-south" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Why the Western Ghats Reign Supreme in July</a></li>
              <li><a href="#route-1-athirappilly" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>1. Chalakudy to Valparai via Athirappilly Rainforest</a></li>
              <li><a href="#route-2-kolli-hills" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>2. Kolli Hills: 70 Hairpin Bends in Dense Fog</a></li>
              <li><a href="#route-3-agumbe" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>3. Agumbe Ghat: The Wettest Valley of the South</a></li>
              <li><a href="#route-4-hogenakkal" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>4. Bangalore to Hogenakkal Falls Gorge Drive</a></li>
              <li><a href="#route-5-yercaud" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>5. Shevaroy Hills: Salem to Yercaud Loop Road</a></li>
              <li><a href="#route-6-coorg" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>6. Coorg Highlands: Chelavara Falls &amp; Tadiandamol</a></li>
              <li><a href="#monsoon-driving-rules" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Essential Ghat Driving Protocols in Heavy Downpours</a></li>
            </ol>
          </nav>

          {/* Section 1 */}
          <section id="why-monsoon-south" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Why the Western Ghats Reign Supreme in July
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              While north Indian states endure scorching pre-monsoon heat or treacherous landslide warnings along Himalayan river gorges, the older, granite-rooted geology of the Western Ghats handles monsoon moisture with extraordinary resilience. Between June and September, the high ridges of Kerala, Tamil Nadu, and Karnataka trap moisture-laden oceanic clouds, triggering endless sheets of mist, swollen forest cascades every 200 meters, and temperatures hovering in the crisp 18°C–22°C range.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)" }}>
              The tarmac on South Indian State and National Highways through wildlife sanctuaries is often well-engineered, with paved shoulders and clear cat's eyes. Here are the 6 standout routes tested across hundreds of monsoon kilometers.
            </p>
          </section>

          {/* Route 1 */}
          <section id="route-1-athirappilly" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--text-primary, #111827)" }}>
              1. Chalakudy to Valparai via Athirappilly Rainforest
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1rem" }}>
              This 130 km single-lane forest route bisects the Sholayar rain shadow and is arguably South India's premier wilderness drive. Starting near Kochi at Chalakudy, you shadow the roaring Chalakudy River toward the 24-meter thunderous roar of Athirappilly Falls and the quieter, jungle-wrapped Vazhachal cascades before climbing into the 40 hairpin bends of the tea-carpeted Valparai plateau.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              The Forest Department check-post at Vazhachal enforces strict timing: entry closes at 4:00 PM, and stopping inside the wildlife sanctuary is prohibited due to wild elephant herds crossing the asphalt in the twilight.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
              <Link
                href="/trips/vazhachal-falls-3-days"
                style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
              >
                Read: Vazhachal &amp; Athirappilly Falls 3-Day Expedition Note →
              </Link>
              <Link
                href="/trips/valparai-4-days"
                style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
              >
                Read: Valparai 40-Hairpin Tea Circuit Guide →
              </Link>
            </div>
          </section>

          {/* Route 2 */}
          <section id="route-2-kolli-hills" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--text-primary, #111827)" }}>
              2. Kolli Hills: 70 Hairpin Bends in Dense Fog
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1rem" }}>
              Kolli Hills (Kolli Malai) in central Tamil Nadu holds the record for the highest density of continuous hairpin bends in India — exactly 70 numbered switchbacks packed into just 17 km of vertical ascent. In the monsoon, clouds descend to Bend 22, enveloping your headlights in white vapor.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1rem" }}>
              At the summit sits the holy Arapaleeswarar Temple and the trailhead to Agaya Gangai Falls, where a thousand vertical steps drop to a thundering 300-foot monsoon cascade.
            </p>
            <Link
              href="/trips/kolli-hills-3-days"
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
            >
              Read: Kolli Hills 70 Hairpin Bends Field Note &amp; Driving Telemetry →
            </Link>
          </section>

          {/* Route 3 */}
          <section id="route-3-agumbe" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--text-primary, #111827)" }}>
              3. Agumbe Ghat: The Wettest Valley of the South
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1rem" }}>
              Known as the "Cherrapunji of South India," Agumbe in Karnataka's Shimoga district receives over 7,000 mm of annual rainfall. Driving down the 14-hairpin Agumbe Ghat connecting Thirthahalli to coastal Udupi during heavy cloudbursts is an ethereal experience: the road is flanked by prehistoric tree ferns, mossy granite faces, and rushing roadside gullies.
            </p>
            <Link
              href="/trips/agumbe-3-days"
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
            >
              Read: Agumbe Rainforest &amp; King Cobra Research Field Guide →
            </Link>
          </section>

          {/* Route 4 */}
          <section id="route-4-hogenakkal" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--text-primary, #111827)" }}>
              4. Bangalore to Hogenakkal Falls Gorge Drive
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1rem" }}>
              A 180 km day-drive from Bengaluru via Dharmapuri leads to the Cauvery River canyon at Hogenakkal. When Karnataka reservoirs release monsoon surplus, the Cauvery splits into dozens of roaring channels plunging over carbonatite rock outcrops. While coracle boat rides are halted during peak flood warnings, the viewpoint terraces offer an unmatched spectacle of churning brown water and rising spray.
            </p>
            <Link
              href="/trips/hogenakkal-falls-3-days"
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
            >
              Read: Hogenakkal Falls Canyon Road Trip &amp; Coracle Guide →
            </Link>
          </section>

          {/* Route 5 */}
          <section id="route-5-yercaud" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--text-primary, #111827)" }}>
              5. Shevaroy Hills: Salem to Yercaud Loop Road
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1rem" }}>
              The 20 hairpin bends climbing from the hot plains of Salem up to Yercaud (1,515 m) in the Shevaroy Hills offer a swift temperature drop of 10°C in under 45 minutes. The 32 km 60-feet Loop Road winding through private coffee estates and silver oak canopies is one of the most serene tarmac stretches in South India during July drizzle.
            </p>
            <Link
              href="/trips/yercaud-4-days"
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
            >
              Read: Yercaud Shevaroy Coffee Estate &amp; Loop Road Field Note →
            </Link>
          </section>

          {/* Route 6 */}
          <section id="route-6-coorg" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--text-primary, #111827)" }}>
              6. Coorg Highlands: Chelavara Falls &amp; Tadiandamol
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1rem" }}>
              South Coorg near Virajpet and Kakkabe remains far quieter than the commercial homestays around Madikeri. The narrow, red-soil approach road to Chelavara Falls winds through lush cardamom estates and spice groves, with the highest peak in Kodagu (Tadiandamol) looming under shroud of monsoon storm clouds.
            </p>
            <Link
              href="/trips/chelavara-falls-3-days"
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
            >
              Read: Chelavara Falls &amp; South Coorg Spice Route Note →
            </Link>
          </section>

          {/* Driving Rules */}
          <section id="monsoon-driving-rules" style={{ marginBottom: "3rem", padding: "1.5rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.75rem", border: "1px solid var(--border, #e5e7eb)" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.375rem", margin: "0 0 1rem", color: "var(--text-primary, #111827)" }}>
              Essential Ghat Driving Protocols in Heavy Downpours
            </h2>
            <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: 1.8, fontSize: "0.9375rem", color: "var(--text-secondary, #374151)" }}>
              <li><strong>Tread Depth:</strong> Never attempt ghat roads with under 3 mm of tire tread. Aquaplaning on wet asphalt downhill switchbacks happens before ABS can react.</li>
              <li><strong>Engine Braking:</strong> Shift into 2nd or 3rd gear on continuous descents. Prolonged riding of brakes on wet ghats boils brake fluid and causes sudden pedal fade.</li>
              <li><strong>Fog Light Discipline:</strong> Use yellow fog lights or low beams. High beams in dense monsoon mist create an opaque blinding glare. Never use hazard blinkers while moving; it disables turn signals.</li>
              <li><strong>Waterfall Crossings:</strong> If muddy water crosses the road surface, stop and inspect depth with a branch before wading. Flash torrents can easily sweep vehicle tires sideways.</li>
            </ul>
          </section>

          {/* Lead capture */}
          <div style={{ marginTop: "4rem" }}>
            <NewsletterInline
              title="Download Offline Western Ghats Route Maps"
              subtitle="Get GPX tracks and checkpoint contact sheets for South India's secret ghat roads delivered to your inbox."
            />
          </div>
        </div>
      </article>
    </>
  );
}
