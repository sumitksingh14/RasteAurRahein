import type { Metadata } from "next";
import Link from "next/link";
import NewsletterInline from "@/components/ui/NewsletterInline";

export const metadata: Metadata = {
  title: "Spiti vs Ladakh: The Honest, Unsponsored Overland Comparison (2026)",
  description:
    "Planning a trans-Himalayan expedition? A candid, field-tested comparison of Spiti Valley and Ladakh covering terrain brutality, acclimatization curves, permits, budgets, and road conditions.",
  alternates: {
    canonical: "/guides/spiti-vs-ladakh",
  },
  openGraph: {
    title: "Spiti vs Ladakh: Overland Comparison | Raste Aur Raahein",
    description:
      "Direct comparison between Spiti and Ladakh by Sumit Singh. Terrain, acclimatization, cost, permits, and vehicle demands.",
    type: "article",
  },
};

export default function SpitiVsLadakhGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Spiti vs Ladakh: The Honest, Unsponsored Overland Comparison",
    description:
      "A complete trans-Himalayan field comparison between Spiti Valley and Ladakh for motorists, trekkers, and independent travelers.",
    author: {
      "@type": "Person",
      name: "Sumit Singh",
    },
    publisher: {
      "@type": "Organization",
      name: "Raste Aur Raahein",
      url: "https://raste-aur-rahein.vercel.app",
    },
    mainEntityOfPage: "https://raste-aur-rahein.vercel.app/guides/spiti-vs-ladakh",
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
        name: "Spiti vs Ladakh",
        item: "https://raste-aur-rahein.vercel.app/guides/spiti-vs-ladakh",
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
              Spiti vs Ladakh
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
              Overland Face-Off
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
              Spiti vs Ladakh: The Honest, Unsponsored Overland Comparison
            </h1>
            <p
              style={{
                fontSize: "1.0625rem",
                color: "rgba(255,255,255,0.8)",
                maxWidth: "680px",
                margin: "0 auto 1.5rem",
                lineHeight: 1.6,
              }}
            >
              Every year hundreds of drivers debate between Spiti and Ladakh. Having logged over 15,000 km across both plateaus in 4x4s, sedans, and motorcycles, here is the unfiltered reality.
            </p>
            <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)" }}>
              By Sumit Singh • 12 min read • Updated for 2026 Season
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
              Jump To Section
            </h2>
            <ol style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: 1.8, fontSize: "0.9375rem" }}>
              <li><a href="#quick-verdict" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Quick Verdict: Which One Should You Pick?</a></li>
              <li><a href="#comparison-matrix" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Side-by-Side Comparison Matrix</a></li>
              <li><a href="#terrain-brutality" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Terrain Brutality &amp; Road Conditions</a></li>
              <li><a href="#altitude-physiology" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Altitude Physiology &amp; Acclimatization</a></li>
              <li><a href="#permits-bureaucracy" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Permits, Checkpoints &amp; Bureaucracy</a></li>
              <li><a href="#fuel-mechanics" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Fuel Logistics &amp; Mechanical Survival</a></li>
              <li><a href="#budget-reality" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Real Budget Reality Check</a></li>
              <li><a href="#related-field-notes" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Recommended Field Notes &amp; Route Guides</a></li>
            </ol>
          </nav>

          {/* Section 1 */}
          <section id="quick-verdict" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Quick Verdict: Which One Should You Pick?
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              If you want sweeping landscapes, tarmac ribbons through colossal moonscapes, comfortable stays, established café culture, and world-class heritage monasteries without beating your chassis to pieces, <strong>choose Ladakh</strong>. Ladakh is an empire-scale trans-Himalayan plateau with superior infrastructure developed by the Indian Army and Border Roads Organisation (BRO).
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              If you crave raw isolation, single-lane dirt ledges carved out of vertical slate cliffs, ferocious glacial torrent crossings, mud-brick homestays with zero mobile network, and an intense sensation of being at the edge of the inhabited earth, <strong>choose Spiti Valley</strong>. Spiti remains genuinely punitive on low-clearance hatchbacks and weak suspensions.
            </p>
            <div style={{ padding: "1.25rem", borderLeft: "4px solid var(--accent-gold, #b45309)", background: "rgba(180, 83, 9, 0.05)", borderRadius: "0 0.5rem 0.5rem 0" }}>
              <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, fontStyle: "italic", color: "var(--text-primary, #111827)" }}>
                "Ladakh gives you high-altitude majesty with an espresso machine in Leh. Spiti gives you dry compost toilets, salt butter tea, and river boulders that will peel your sump guard right off."
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="comparison-matrix" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Side-by-Side Comparison Matrix
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#1e1b4b", color: "#fff" }}>
                    <th style={{ padding: "0.75rem 1rem", border: "1px solid #312e81" }}>Dimension</th>
                    <th style={{ padding: "0.75rem 1rem", border: "1px solid #312e81" }}>Spiti Valley</th>
                    <th style={{ padding: "0.75rem 1rem", border: "1px solid #312e81" }}>Ladakh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: "var(--bg-secondary, #f9fafb)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, border: "1px solid var(--border, #e5e7eb)" }}>Typical Days Needed</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>8–10 Days (Complete Circuit)</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>9–14 Days (Leh + Nubra + Pangong + Hanle)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, border: "1px solid var(--border, #e5e7eb)" }}>Road Quality</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>40% Dirt/Gravel/Water crossings, 60% Paved</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>85% Smooth BRO Highway, 15% Broken Pass approach</td>
                  </tr>
                  <tr style={{ background: "var(--bg-secondary, #f9fafb)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, border: "1px solid var(--border, #e5e7eb)" }}>Vehicle Demands</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>High clearance (200mm+) essential on Gramphoo-Kaza</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>Carefully driven sedans manageable on main circuits</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, border: "1px solid var(--border, #e5e7eb)" }}>Acclimatization Incline</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>Gradual if entering via Kinnaur (Shimla); brutal via Manali</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>Severe risk if flying straight into Leh (3,500 m)</td>
                  </tr>
                  <tr style={{ background: "var(--bg-secondary, #f9fafb)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, border: "1px solid var(--border, #e5e7eb)" }}>Permit Bureaucracy</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>None for Indians (Foreigners need PAP beyond Reckong Peo)</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>Inner Line Permit (ILP) required for Nubra, Pangong, Hanle</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, border: "1px solid var(--border, #e5e7eb)" }}>Budget Range</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>₹2,000–₹3,500 / day (homestay dominated)</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>₹3,500–₹8,000 / day (taxis and commercial hotels)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section id="terrain-brutality" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Terrain Brutality &amp; Road Conditions
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              The starkest contrast between the two is surface quality. Ladakh has benefited from immense strategic defense spending. The highway from Leh to Nubra Valley over Khardung La, the road to Pangong Tso via Chang La, and the long southern stretch to Hanle are largely asphalted. While passes still suffer from winter frost heaves and summer melt runoff, modern SUVs glide across Ladakh with relative ease.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              In contrast, Spiti still features the notorious 70 km Gramphoo–Batal–Losar stretch. Crossing the ferocious{" "}
              <Link href="/road-conditions/kunzum-pass" style={{ color: "var(--accent-gold, #b45309)", fontWeight: 600, textDecoration: "underline" }}>
                Kunzum Pass (4,551 m)
              </Link>{" "}
              is not a highway drive; it is an off-road ordeal across loose river shingle, submerged boulders, and churning snowmelt nullahs (Chhota Dhara and Pagal Nullah). If you take a low hatchback here in July when meltwater peaks in the afternoon, you will scrape your floorpan or flood your airbox.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)" }}>
              For an exact breakdown of Spiti's daily stages and road surfaces, see our detailed{" "}
              <Link href="/trips/spiti-valley" style={{ color: "var(--accent-gold, #b45309)", fontWeight: 600, textDecoration: "underline" }}>
                10-Day Spiti Valley Expedition Field Note
              </Link>.
            </p>
          </section>

          {/* Section 4 */}
          <section id="altitude-physiology" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Altitude Physiology &amp; Acclimatization
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              More vacations are ruined by Acute Mountain Sickness (AMS) in Ladakh than almost anywhere else in Asia. The culprit is the Leh airport (Kushok Bakula Rimpochee Airport). Landing in Leh transports your body from sea-level Delhi (216 m) to 3,500 m in 75 minutes. The atmospheric pressure drops by nearly a third, and oxygen saturation plummets. Mandatory 48-hour rest in Leh is not a suggestion — it is a biological requirement.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Spiti, when approached the right way (via Shimla, Kinnaur, Nako, and Tabo), is the gold standard of acclimatization. You gain altitude in modest daily steps: Shimla (2,200 m) → Kalpa (2,960 m) → Nako (3,625 m) → Kaza (3,800 m). By the time you sleep in Kaza on Day 4 or 5, your body has adapted naturally without headaches or supplemental Diamox.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)" }}>
              If you choose Ladakh by road, driving the Srinagar–Leh Highway over{" "}
              <Link href="/road-conditions/zoji-la" style={{ color: "var(--accent-gold, #b45309)", fontWeight: 600, textDecoration: "underline" }}>
                Zoji La (3,528 m)
              </Link>{" "}
              or the Manali–Leh route over{" "}
              <Link href="/road-conditions/baralacha-la" style={{ color: "var(--accent-gold, #b45309)", fontWeight: 600, textDecoration: "underline" }}>
                Baralacha La (4,890 m)
              </Link>{" "}
              provides superior acclimatization compared to flying.
            </p>
          </section>

          {/* Section 5 */}
          <section id="permits-bureaucracy" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Permits, Checkpoints &amp; Bureaucracy
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Ladakh borders sensitive international lines of control, so Indian nationals and foreigners alike require an Inner Line Permit (ILP) or Protected Area Permit (PAP) to visit Khardung La, Nubra Valley, Pangong Tso, Chushul, and the{" "}
              <Link href="/trips/hanle-5-days" style={{ color: "var(--accent-gold, #b45309)", fontWeight: 600, textDecoration: "underline" }}>
                Hanle Dark Sky Reserve
              </Link>{" "}
              or the historic border hamlet of{" "}
              <Link href="/trips/turtuk-5-days" style={{ color: "var(--accent-gold, #b45309)", fontWeight: 600, textDecoration: "underline" }}>
                Turtuk in the Baltistan sector
              </Link>. While the portal is streamlined online, you must still carry physical printouts for military checkpoints.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)" }}>
              Spiti requires zero permits for Indian citizens throughout the circuit. Foreign passport holders require an Inner Line Permit only for the border-adjacent section between Jangi and Sumdo in Upper Kinnaur, easily obtained at Shimla, Rampur, or Reckong Peo.
            </p>
          </section>

          {/* Section 6 */}
          <section id="fuel-mechanics" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Fuel Logistics &amp; Mechanical Survival
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              In Ladakh, reliable fuel stations operate in Leh, Karu, Diskit (Nubra), and Khaltsi. Carrying 10–20 liters of extra petrol or diesel in metal jerry cans is necessary only when executing long wilderness circuits like Hanle to Pangong via Chushul.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Spiti has the world's highest retail petrol pump at Kaza (3,740 m), but fuel availability is prone to power outages or tanker delays. The gap between Powari (Kinnaur) and Kaza is 200 km of mountain driving where fuel burns 25% faster. Always fill your tank to the brim at Reckong Peo and top up the instant you reach Kaza.
            </p>
          </section>

          {/* Section 7 */}
          <section id="budget-reality" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Real Budget Reality Check
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              A 9-day Ladakh road trip typically costs ₹35,000–₹65,000 per person if renting bikes or hiring local union taxis. Ladakh's taxi union strictly prohibits outside non-commercial rental cars from sightseeing circuits like Pangong and Nubra — forcing travellers to hire local Innovas at fixed union rates (often ₹12,000–₹18,000 for a 2-day Nubra circuit).
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Spiti has no taxi union restrictions on self-drive cars or private motorcycles. Village homestays in Langza, Komic, and Mudh charge ₹1,200–₹1,800 per night including hearty home-cooked dinners and breakfasts. A full 10-day Spiti circuit can comfortably be completed on ₹22,000–₹35,000 per person.
            </p>
          </section>

          {/* Related Trips & Cross-Links */}
          <section
            id="related-field-notes"
            style={{
              marginTop: "4rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid var(--border, #e5e7eb)",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--text-primary, #111827)" }}>
              Field Notes from the Plateau
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
              <Link
                href="/trips/leh-ladakh-9-days"
                style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)", textDecoration: "none", color: "inherit", background: "var(--bg-secondary, #f9fafb)" }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textTransform: "uppercase" }}>Overland Blueprint</div>
                <h3 style={{ fontSize: "1.125rem", margin: "0.5rem 0", color: "var(--text-primary, #111827)" }}>Leh-Ladakh 9-Day Circuit</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary, #4b5563)", margin: 0 }}>Full route telemetry, high-pass staging, and monastery field notes.</p>
              </Link>

              <Link
                href="/trips/spiti-valley"
                style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)", textDecoration: "none", color: "inherit", background: "var(--bg-secondary, #f9fafb)" }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textTransform: "uppercase" }}>High-Altitude Drive</div>
                <h3 style={{ fontSize: "1.125rem", margin: "0.5rem 0", color: "var(--text-primary, #111827)" }}>Spiti Valley 10-Day Expedition</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary, #4b5563)", margin: 0 }}>Kinnaur approach, Pin Valley detour, Chandratal camping protocol.</p>
              </Link>

              <Link
                href="/trips/sach-pass-5-days"
                style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)", textDecoration: "none", color: "inherit", background: "var(--bg-secondary, #f9fafb)" }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textTransform: "uppercase" }}>Extreme Mountain Road</div>
                <h3 style={{ fontSize: "1.125rem", margin: "0.5rem 0", color: "var(--text-primary, #111827)" }}>Sach Pass &amp; Pangi Valley</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary, #4b5563)", margin: 0 }}>Cliff-hanger roads connecting Chamba to Lahaul across 4,420 m.</p>
              </Link>
            </div>
          </section>

          {/* Lead Magnet */}
          <div style={{ marginTop: "4rem" }}>
            <NewsletterInline
              title="Get Our Himalayan Route Playbooks"
              subtitle="Detailed turn-by-turn road conditions, offline GPX waypoints, and homestay contacts across Spiti and Ladakh."
            />
          </div>
        </div>
      </article>
    </>
  );
}
