import type { Metadata } from "next";
import Link from "next/link";
import NewsletterInline from "@/components/ui/NewsletterInline";

export const metadata: Metadata = {
  title: "Kerala Waterfalls Field Guide: Athirappilly, Vazhachal & Secret Forest Cascades",
  description:
    "A complete logistical field guide to navigating Kerala's greatest forest waterfalls along the Chalakudy River and Western Ghats: entry timings, forest check-posts, monsoon water volume, and photography viewpoints.",
  alternates: {
    canonical: "/guides/kerala-waterfalls-guide",
  },
  openGraph: {
    title: "Kerala Waterfalls Field Guide | Raste Aur Raahein",
    description: "Athirappilly, Vazhachal, Charpa, and the rainforest cascades of the Western Ghats.",
    type: "article",
  },
};

export default function KeralaWaterfallsGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Kerala Waterfalls Field Guide: Athirappilly, Vazhachal & Secret Forest Cascades",
    description: "In-depth expedition field guide to Kerala's most dramatic waterfalls and river gorges.",
    author: {
      "@type": "Person",
      name: "Sumit Singh",
    },
    publisher: {
      "@type": "Organization",
      name: "Raste Aur Raahein",
      url: "https://raste-aur-rahein.vercel.app",
    },
    mainEntityOfPage: "https://raste-aur-rahein.vercel.app/guides/kerala-waterfalls-guide",
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
        name: "Kerala Waterfalls Guide",
        item: "https://raste-aur-rahein.vercel.app/guides/kerala-waterfalls-guide",
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
              Kerala Waterfalls Guide
            </li>
          </ol>
        </nav>

        {/* Hero header */}
        <header
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0284c7 100%)",
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
                color: "#7dd3fc",
                padding: "0.25rem 0.85rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              Chalakudy &amp; Western Ghats Field Guide
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
              Kerala Waterfalls Field Guide: Athirappilly, Vazhachal &amp; Forest Cascades
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
              How to experience South India&apos;s most powerful river plunges without tourist crowds. Timing, forest permits, check-posts, and continuous overland routes into the high Anamalai hills.
            </p>
            <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)" }}>
              By Sumit Singh • 9 min read • Updated Field Telemetry
            </div>
          </div>
        </header>

        {/* Content Body */}
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
              Guide Contents
            </h2>
            <ol style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: 1.8, fontSize: "0.9375rem" }}>
              <li><a href="#athirappilly-overview" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Athirappilly: The 80-Foot Curtain of the Chalakudy River</a></li>
              <li><a href="#vazhachal-and-charpa" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Vazhachal &amp; Charpa: The Riparian Rainforest Corridor</a></li>
              <li><a href="#how-to-reach" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Logistics: Access from Kochi &amp; Coimbatore</a></li>
              <li><a href="#checkposts-and-timings" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Forest Check-posts, Entry Gates &amp; Timings</a></li>
              <li><a href="#sholayar-trans-ghat-drive" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Connecting to Valparai: The Sholayar Wilderness Highway</a></li>
              <li><a href="#related-field-notes" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>Related Kerala Field Notes &amp; Itineraries</a></li>
            </ol>
          </nav>

          {/* Section 1 */}
          <section id="athirappilly-overview" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Athirappilly: The 80-Foot Curtain of the Chalakudy River
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Often termed the &ldquo;Niagara of South India&rdquo; in tourist brochures, Athirappilly Falls (80 feet / 24 meters high and over 330 feet wide during monsoon floods) is the largest waterfall in Kerala. Fed by the Chalakudy River originating in the Anamalai mountains, the river splits into multiple braided channels across a wide rocky lip before plunging into a cavernous plunge pool enveloped in permanent mist.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Two distinct perspectives exist: the upper walkway (wheelchair accessible, gentle bamboo fencing) and the steep rocky jungle descent to the foot of the falls. The hike down takes roughly 15 minutes through bamboo thickets. At the base, the acoustic vibration of thousands of gallons slamming into the riverbed rattles your ribcage.
            </p>
            <div style={{ padding: "1.25rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.5rem", borderLeft: "4px solid #0284c7" }}>
              <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-primary, #111827)" }}>
                <strong>Field Tip:</strong> Arrive at the ticket counter by 7:45 AM (gates open at 8:00 AM). Between 8:00 and 9:30 AM, you share the viewpoint with Nilgiri langurs and Malabar Pied Hornbills. By 11:30 AM, tourist buses from Thrissur and Kochi pack the path.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="vazhachal-and-charpa" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Vazhachal &amp; Charpa: The Riparian Rainforest Corridor
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Just 5 km upstream from Athirappilly sits Charpa Falls, a dramatic seasonal torrent that shoots directly beneath the highway bridge. In July and August, road travelers must roll up windows as river spray washes directly over their windscreens.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              Another 2 km further along the road lies Vazhachal Falls. Unlike the vertical cliff-drop of Athirappilly, Vazhachal is a continuous, inclined river rapids cascade through dense evergreen forest. The Kerala Forest Research Institute (KFRI) herbal garden and the riparian tree canopies here harbor all four South Indian hornbill species: the Great Indian Hornbill, Malabar Pied Hornbill, Malabar Grey Hornbill, and Indian Grey Hornbill.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)" }}>
              Read our full field account in the{" "}
              <Link href="/trips/vazhachal-falls-3-days" style={{ color: "var(--accent-gold, #b45309)", fontWeight: 600, textDecoration: "underline" }}>
                Vazhachal Falls 3-Day Rainforest Expedition
              </Link>.
            </p>
          </section>

          {/* Section 3 */}
          <section id="how-to-reach" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Logistics: Access from Kochi &amp; Coimbatore
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              The gateway town is Chalakudy on National Highway 544.
            </p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, fontSize: "1rem", color: "var(--text-secondary, #374151)" }}>
              <li><strong>From Cochin International Airport (COK):</strong> 42 km (approx 1 hour 15 mins). Take the airport road to Angamaly, join NH 544 to Chalakudy, and turn east onto SH 21 (Chalakudy–Anamala Road).</li>
              <li><strong>From Coimbatore (CJB):</strong> 130 km via Palakkad and Thrissur bypass, or 105 km through the high mountain pass via Pollachi and Valparai.</li>
              <li><strong>Public Transit:</strong> KSRTC operates regular ordinary and fast-passenger buses from Chalakudy KSRTC bus stand directly to Athirappilly and Malakkappara.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="checkposts-and-timings" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Forest Check-posts, Entry Gates &amp; Timings
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#fff" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Gate / Check-post</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Operating Hours</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Fee / Rules</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: "var(--bg-secondary, #f9fafb)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, border: "1px solid var(--border, #e5e7eb)" }}>Athirappilly Ticket Counter</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>8:00 AM – 5:00 PM</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>₹50 per adult; single composite ticket valid for Vazhachal too</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, border: "1px solid var(--border, #e5e7eb)" }}>Vazhachal Forest Check-post (to Valparai)</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>6:00 AM – 4:00 PM (Entry strictly closed after 4 PM)</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>Free vehicle log entry; zero stopping allowed in sanctuary corridor</td>
                  </tr>
                  <tr style={{ background: "var(--bg-secondary, #f9fafb)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, border: "1px solid var(--border, #e5e7eb)" }}>Malakkappara Interstate Border (Kerala/TN)</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>6:00 AM – 6:00 PM</td>
                    <td style={{ padding: "0.75rem 1rem", border: "1px solid var(--border, #e5e7eb)" }}>Police &amp; Forest registry verification</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sholayar-trans-ghat-drive" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Connecting to Valparai: The Sholayar Wilderness Highway
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)", marginBottom: "1.25rem" }}>
              The most rewarding way to experience the waterfall country is not as an out-and-back day trip from Kochi, but as a trans-Ghat overland connection into Tamil Nadu via the Upper Sholayar Dam and Valparai. This 85 km segment crosses the Vazhachal Forest Division and Anamalai Tiger Reserve.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary, #374151)" }}>
              You traverse thick rainforest canopies where Lion-tailed Macaques frequently forage in the fig branches above the road, eventually ascending past Sholayar Dam into the sweeping tea carpets and 40 hairpin bends of Valparai. See our complete{" "}
              <Link href="/trips/valparai-4-days" style={{ color: "var(--accent-gold, #b45309)", fontWeight: 600, textDecoration: "underline" }}>
                Valparai 4-Day Expedition Guide
              </Link>.
            </p>
          </section>

          {/* Related Articles */}
          <section
            id="related-field-notes"
            style={{
              marginTop: "4rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid var(--border, #e5e7eb)",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--text-primary, #111827)" }}>
              Featured Southern Field Notes
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
              <Link
                href="/trips/vazhachal-falls-3-days"
                style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)", textDecoration: "none", color: "inherit", background: "var(--bg-secondary, #f9fafb)" }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textTransform: "uppercase" }}>Primary Field Note</div>
                <h3 style={{ fontSize: "1.125rem", margin: "0.5rem 0", color: "var(--text-primary, #111827)" }}>Vazhachal &amp; Athirappilly Falls 3 Days</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary, #4b5563)", margin: 0 }}>Chalakudy River rainforest trail, canopy birding, and base lodging.</p>
              </Link>

              <Link
                href="/trips/kerala-7-days"
                style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)", textDecoration: "none", color: "inherit", background: "var(--bg-secondary, #f9fafb)" }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textTransform: "uppercase" }}>State Road Trip</div>
                <h3 style={{ fontSize: "1.125rem", margin: "0.5rem 0", color: "var(--text-primary, #111827)" }}>Kerala 7-Day Complete Circuit</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary, #4b5563)", margin: 0 }}>Munnar tea ridges, Thekkady cardamom reserves, and Alleppey waters.</p>
              </Link>

              <Link
                href="/trips/chelavara-falls-3-days"
                style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)", textDecoration: "none", color: "inherit", background: "var(--bg-secondary, #f9fafb)" }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold, #b45309)", textTransform: "uppercase" }}>Coorg Waterways</div>
                <h3 style={{ fontSize: "1.125rem", margin: "0.5rem 0", color: "var(--text-primary, #111827)" }}>Chelavara Falls 3-Day Note</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary, #4b5563)", margin: 0 }}>Natural rock plunge pool and cardamom plantation backroads.</p>
              </Link>
            </div>
          </section>

          {/* Lead Magnet */}
          <div style={{ marginTop: "4rem" }}>
            <NewsletterInline
              title="Download the Sholayar Rainforest Route Map"
              subtitle="Full GPS waypoints, check-post schedules, and wildlife safety guidelines for the Chalakudy to Valparai jungle highway."
            />
          </div>
        </div>
      </article>
    </>
  );
}
