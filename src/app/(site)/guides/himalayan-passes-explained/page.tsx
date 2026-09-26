import type { Metadata } from "next";
import Link from "next/link";
import NewsletterInline from "@/components/ui/NewsletterInline";

export const metadata: Metadata = {
  title: "Himalayan Passes Explained: Kunzum, Rohtang, Baralacha La, Zoji La & Sela",
  description:
    "An overland driver's technical handbook to crossing high Himalayan passes: altitude drop, BRO clearing windows, black ice physics, vehicle clearance requirements, and mountain survival.",
  alternates: {
    canonical: "/guides/himalayan-passes-explained",
  },
  openGraph: {
    title: "Himalayan Passes Explained | Raste Aur Raahein",
    description: "Technical guide to India's high mountain passes by Sumit Singh.",
    type: "article",
  },
};

export default function HimalayanPassesExplainedGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Himalayan Passes Explained: Kunzum, Rohtang, Baralacha La, Zoji La & Sela",
    description: "An overland motorist's technical guide to navigating high Himalayan mountain passes.",
    author: {
      "@type": "Person",
      name: "Sumit Singh",
    },
    publisher: {
      "@type": "Organization",
      name: "Raste Aur Raahein",
      url: "https://raste-aur-rahein.vercel.app",
    },
    mainEntityOfPage: "https://raste-aur-rahein.vercel.app/guides/himalayan-passes-explained",
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
        name: "Himalayan Passes Explained",
        item: "https://raste-aur-rahein.vercel.app/guides/himalayan-passes-explained",
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
        {/* Breadcrumb nav */}
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
              Himalayan Passes Explained
            </li>
          </ol>
        </nav>

        {/* Hero header */}
        <header
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1b4b 100%)",
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
              Technical Mountain Driving
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
              Himalayan Passes Explained: Kunzum, Rohtang, Baralacha La, Zoji La &amp; Sela
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
              A high-altitude pass is not simply a highway at high elevation. It is a dynamic weather barrier, an engine oxygen starve zone, and a biological test. Here is the operational handbook.
            </p>
            <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)" }}>
              By Sumit Singh • 14 min read • Comprehensive Technical Guide
            </div>
          </div>
        </header>

        {/* Article Body */}
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
              Handbook Structure
            </h2>
            <ol style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: 1.8, fontSize: "0.9375rem" }}>
              <li><a href="#what-makes-a-pass" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>What Makes a Himalayan Pass Dangerous?</a></li>
              <li><a href="#the-five-critical-passes" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>The 5 Strategic Passes: Deep Dives &amp; Live Telemetry</a></li>
              <li><a href="#vehicle-demands" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Vehicle Demands: Ground Clearance, 4WD &amp; Turbo Lag</a></li>
              <li><a href="#tunnels-vs-passes" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>The Era of Strategic Tunnels: Atal, Z-Morh &amp; Sela</a></li>
              <li><a href="#black-ice-and-water" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Black Ice Physics &amp; Glacial Melt Timers</a></li>
              <li><a href="#live-trackers" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Check Live Road Conditions Before You Roll</a></li>
            </ol>
          </nav>

          {/* Section 1 */}
          <section id="what-makes-a-pass" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              What Makes a Himalayan Pass Dangerous?
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              In trans-Himalayan geography, a mountain pass (termed <em>La</em> in Tibetan and Ladakhi, <em>Darra</em> in Urdu) represents the lowest saddle point between two mountain ridges. While it provides the path of least resistance across massive geological walls, it also acts as a funnel for severe weather systems.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              At elevations above 3,900 meters (13,000 ft), effective air pressure is reduced by 35% to 45%. For internal combustion engines, naturally aspirated motors lose roughly 3% power per 1,000 feet of climb. At Baralacha La (4,890 m / 16,040 ft), an engine produces nearly 45% less horsepower than at sea level. If your radiator cap has a weak seal or your coolant is diluted with plain tap water, the reduced atmospheric boiling point will cause instantaneous engine boil-over.
            </p>
          </section>

          {/* Section 2: The 5 Passes */}
          <section id="the-five-critical-passes" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1.5rem", color: "var(--text-primary, #111827)" }}>
              The 5 Strategic Passes: Deep Dives &amp; Live Telemetry
            </h2>

            {/* Pass 1: Kunzum */}
            <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.75rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.375rem", fontWeight: 700, margin: 0, color: "var(--text-primary, #111827)" }}>
                  1. Kunzum Pass (4,551 m / 14,931 ft)
                </h3>
                <Link
                  href="/road-conditions/kunzum-pass"
                  style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
                >
                  View Live Kunzum Status →
                </Link>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary, #4b5563)", margin: "0.75rem 0 1rem", lineHeight: 1.7 }}>
                Connects Lahaul Valley to Spiti Valley. Completely unpaved, loose scree, and notorious water crossings on the Spiti descent toward Losar. Open typically June through late October.
              </p>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary, #6b7280)" }}>
                Featured in:{" "}
                <Link href="/trips/spiti-valley" style={{ color: "var(--text-primary, #111827)", fontWeight: 600, textDecoration: "underline" }}>
                  Spiti Valley Expedition
                </Link>
              </div>
            </div>

            {/* Pass 2: Rohtang */}
            <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.75rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.375rem", fontWeight: 700, margin: 0, color: "var(--text-primary, #111827)" }}>
                  2. Rohtang Pass (3,978 m / 13,051 ft)
                </h3>
                <Link
                  href="/road-conditions/rohtang-pass"
                  style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
                >
                  View Live Rohtang Status →
                </Link>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary, #4b5563)", margin: "0.75rem 0 1rem", lineHeight: 1.7 }}>
                The historic gate to Lahaul from Manali. While most traffic now uses the Atal Tunnel, the summit route is still open in summer for those crossing into Spiti or seeking high views. Requires a vehicle permit quota online.
              </p>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary, #6b7280)" }}>
                Featured in:{" "}
                <Link href="/trips/leh-ladakh-9-days" style={{ color: "var(--text-primary, #111827)", fontWeight: 600, textDecoration: "underline" }}>
                  Manali–Leh Overland
                </Link>
              </div>
            </div>

            {/* Pass 3: Baralacha La */}
            <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.75rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.375rem", fontWeight: 700, margin: 0, color: "var(--text-primary, #111827)" }}>
                  3. Baralacha La (4,890 m / 16,043 ft)
                </h3>
                <Link
                  href="/road-conditions/baralacha-la"
                  style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
                >
                  View Live Baralacha La Status →
                </Link>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary, #4b5563)", margin: "0.75rem 0 1rem", lineHeight: 1.7 }}>
                The coldest and most forbidding pass on the Manali–Leh Highway. Massive snowbanks remain until late July; black ice develops by mid-September. Suraj Tal lies at its southern foot. No cellular reception for 120 km.
              </p>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary, #6b7280)" }}>
                Featured in:{" "}
                <Link href="/trips/leh-ladakh-9-days" style={{ color: "var(--text-primary, #111827)", fontWeight: 600, textDecoration: "underline" }}>
                  Leh-Ladakh 9-Day Circuit
                </Link>
              </div>
            </div>

            {/* Pass 4: Zoji La */}
            <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.75rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.375rem", fontWeight: 700, margin: 0, color: "var(--text-primary, #111827)" }}>
                  4. Zoji La (3,528 m / 11,575 ft)
                </h3>
                <Link
                  href="/road-conditions/zoji-la"
                  style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
                >
                  View Live Zoji La Status →
                </Link>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary, #4b5563)", margin: "0.75rem 0 1rem", lineHeight: 1.7 }}>
                The strategic lifeline between Kashmir (Sonamarg) and Ladakh (Drass). Single-lane cliff edges with sheer drops into the Sind and Drass river valleys. One-way traffic windows are strictly regulated by traffic police.
              </p>
            </div>

            {/* Pass 5: Sela Pass */}
            <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.75rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.375rem", fontWeight: 700, margin: 0, color: "var(--text-primary, #111827)" }}>
                  5. Sela Pass (4,170 m / 13,680 ft)
                </h3>
                <Link
                  href="/road-conditions/sela-pass"
                  style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
                >
                  View Live Sela Pass Status →
                </Link>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary, #4b5563)", margin: "0.75rem 0 1rem", lineHeight: 1.7 }}>
                Gateway to Tawang in Arunachal Pradesh. Subjected to dense fog and blizzard conditions. The landmark Sela Tunnel now bypasses the summit snow hazards, providing round-the-year access.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="vehicle-demands" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Vehicle Demands: Ground Clearance, 4WD &amp; Turbo Lag
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Can a front-wheel-drive hatchback cross Kunzum or Baralacha La? The honest answer: yes, if driven with exceptional mechanical sympathy in dry conditions, but at high risk of underbody damage. The primary limiting factor is not 4WD traction — it is <strong>ground clearance</strong>.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Heavy trucks create deep ruts in unpaved mud sections. If your vehicle has 165 mm of ground clearance, the raised central ridge of rock and frozen mud will constantly scrape against your catalytic converter and engine sump. Vehicles with 200 mm+ clearance (Thar, Scorpio-N, Jimny, Fortuner, Duster) can negotiate these berms without scraping.
            </p>
          </section>

          {/* Section 4 */}
          <section id="tunnels-vs-passes" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              The Era of Strategic Tunnels: Atal, Z-Morh &amp; Sela
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              The engineering landscape of the Himalayas is undergoing its most radical transformation in human history. The completion of the 9.02 km Atal Tunnel beneath Rohtang reduced travel time from Manali to Keylong by nearly 4 hours and opened year-round connectivity to Lahaul.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)" }}>
              Similarly, the Z-Morh Tunnel near Sonamarg, the ongoing Zoji La tunnel, and the twin-tube Sela Tunnel in Arunachal ensure that critical border regions are no longer severed from the Indian mainland during 6 months of winter freeze.
            </p>
          </section>

          {/* Section 5 */}
          <section id="black-ice-and-water" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Black Ice Physics &amp; Glacial Melt Timers
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Two predictable hazards dictate mountain driving schedules:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              <div style={{ padding: "1.25rem", border: "1px solid var(--border, #e5e7eb)", borderRadius: "0.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--text-primary, #111827)" }}>Morning: Black Ice Window</h3>
                <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-secondary, #4b5563)" }}>
                  Between 5:00 AM and 8:30 AM, moisture from previous daytime snowmelt freezes solid across shaded hairpin corners. It appears as harmless wet tarmac but has a friction coefficient near zero. Never overtake on shadowed mountain corners before the sun has heated the tarmac.
                </p>
              </div>
              <div style={{ padding: "1.25rem", border: "1px solid var(--border, #e5e7eb)", borderRadius: "0.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--text-primary, #111827)" }}>Afternoon: Glacial Melt Nullas</h3>
                <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-secondary, #4b5563)" }}>
                  Between 1:30 PM and 5:00 PM, strong solar radiation melts high glaciers, transforming trickling streams into ferocious brown torrents carrying submerged boulders. Cross all major river crossings (Chhota Dhara, Pagal Nullah, Zingzingbar) before 11:00 AM.
                </p>
              </div>
            </div>
          </section>

          {/* Live Link Callout */}
          <section id="live-trackers" style={{ padding: "2rem", background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", borderRadius: "1rem", color: "#fff", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", margin: "0 0 0.75rem", color: "#fff" }}>
              Check Live Himalayan Pass Conditions
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "560px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
              We track manual field reports and BRO bulletins for Kunzum, Rohtang, Baralacha La, Zoji La, and Sela Pass with verified timestamps.
            </p>
            <Link
              href="/road-conditions"
              style={{
                display: "inline-block",
                padding: "0.85rem 2rem",
                borderRadius: "0.5rem",
                background: "var(--accent-gold, #d97706)",
                color: "#fff",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.9375rem",
              }}
            >
              Open Live Telemetry Tracker →
            </Link>
          </section>

          {/* Lead Magnet */}
          <div style={{ marginTop: "4rem" }}>
            <NewsletterInline
              title="Get Pass Clearance Alerts Before Your Trip"
              subtitle="We dispatch email advisories the moment BRO opens or closes Kunzum, Rohtang, and Baralacha La each season."
            />
          </div>
        </div>
      </article>
    </>
  );
}
