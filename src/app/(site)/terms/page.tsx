import type { Metadata } from "next";
import SilkPageHeader from "@/components/ui/SilkPageHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms and Conditions for using Raste Aur Raahein — India's trusted travel itinerary blog. Understand your rights and responsibilities.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "October 1, 2026";
const SITE_NAME = "Raste Aur Raahein";
const CONTACT_EMAIL = "zsumitksingh@gmail.com";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      style={{
        marginBottom: "2.5rem",
        padding: "2rem",
        background: "var(--bg-card)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-neo-raised)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "2px solid var(--accent-gold-dim)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          fontSize: "0.9375rem",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        paddingLeft: "0.5rem",
        marginBottom: "0.4rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.5rem",
      }}
    >
      <span style={{ color: "var(--accent-gold)", fontWeight: 700, flexShrink: 0 }}>→</span>
      <span>{children}</span>
    </li>
  );
}

const TOC = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "use-of-site", label: "Use of Site" },
  { id: "content", label: "Content & Accuracy" },
  { id: "user-content", label: "User-Submitted Content" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "limitation", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes", label: "Changes to Terms" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "var(--nav-height)" }}>
      <SilkPageHeader
        eyebrow="✦ Legal"
        heading="Terms & Conditions"
        description={`Last updated: ${LAST_UPDATED}. Please read these Terms carefully before using ${SITE_NAME}.`}
        maxWidth={1100}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "3rem 1.5rem 5rem",
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "2.5rem",
          alignItems: "start",
        }}
        className="terms-grid"
      >
        {/* Sticky TOC Sidebar */}
        <aside
          style={{
            position: "sticky",
            top: "calc(var(--nav-height) + 1.5rem)",
            background: "var(--bg-card)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-neo-raised)",
            padding: "1.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-gold)",
              marginBottom: "1rem",
            }}
          >
            Contents
          </p>
          <nav aria-label="Terms sections">
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="toc-link"
                    style={{
                      display: "block",
                      padding: "0.35rem 0.5rem",
                      borderRadius: "8px",
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <style>{`
            .toc-link:hover {
              color: var(--accent-gold) !important;
              background: var(--accent-gold-dim) !important;
            }
          `}</style>
        </aside>

        {/* Main Content */}
        <main>
          <div
            style={{
              padding: "1.25rem 1.5rem",
              background: "rgba(99,102,241,0.06)",
              borderRadius: "var(--radius-md)",
              borderLeft: "4px solid var(--accent-gold)",
              marginBottom: "2rem",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            These Terms and Conditions ("Terms") govern your access to and use of <strong style={{ color: "var(--text-primary)" }}>{SITE_NAME}</strong> ("the Site"). By accessing the Site, you agree to be bound by these Terms. If you do not agree, please discontinue use immediately.
          </div>

          <Section id="acceptance" title="1. Acceptance of Terms">
            <p>
              By accessing or using {SITE_NAME}, you confirm that you are at least 13 years of age, have read and understood these Terms, and agree to be legally bound by them. If you are using the Site on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.
            </p>
          </Section>

          <Section id="use-of-site" title="2. Acceptable Use of Site">
            <p style={{ marginBottom: "1rem" }}>You may use {SITE_NAME} only for lawful purposes. You agree <strong style={{ color: "var(--text-primary)" }}>not</strong> to:</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <Li>Scrape, crawl, or systematically download content without prior written permission</Li>
              <Li>Use the site to distribute spam, malware, or unsolicited commercial messages</Li>
              <Li>Attempt to gain unauthorised access to any portion of the site, servers, or databases</Li>
              <Li>Reverse-engineer, decompile, or disassemble any part of the site</Li>
              <Li>Use automated bots to create fake accounts, generate artificial traffic, or manipulate site metrics</Li>
              <Li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity</Li>
              <Li>Upload or submit content that is defamatory, obscene, fraudulent, or violates any applicable law</Li>
            </ul>
          </Section>

          <Section id="content" title="3. Content & Accuracy">
            <p style={{ marginBottom: "1rem" }}>
              {SITE_NAME} provides travel itineraries, route guides, road condition reports, weather information, and general travel advice based on personal experience and community contributions.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Travel conditions change rapidly.</strong> Road conditions, weather, permit requirements, fuel availability, and accommodation options described on this site may differ from actual conditions at the time of your journey. Always:
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <Li>Verify current road and weather conditions with local authorities before travel</Li>
              <Li>Check for the latest permit requirements with relevant government bodies</Li>
              <Li>Consult licensed travel agents or local guides for high-altitude or remote routes</Li>
              <Li>Obtain appropriate travel insurance for adventure and high-altitude travel</Li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Content is provided for informational purposes only and does not constitute professional travel, legal, medical, or safety advice.
            </p>
          </Section>

          <Section id="user-content" title="4. User-Submitted Content">
            <p style={{ marginBottom: "1rem" }}>
              When you submit trip itineraries, field reports, comments, or reviews ("User Content"), you grant {SITE_NAME} a worldwide, non-exclusive, royalty-free licence to use, reproduce, modify, publish, and distribute that content on the Site and associated social channels.
            </p>
            <p style={{ marginBottom: "1rem" }}>You represent and warrant that:</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <Li>You own or have the right to submit the User Content</Li>
              <Li>The User Content does not infringe any third-party intellectual property, privacy, or publicity rights</Li>
              <Li>The User Content is accurate to the best of your knowledge and not misleading</Li>
              <Li>The User Content does not contain personal data of third parties without their consent</Li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              We reserve the right to remove or moderate any User Content that violates these Terms or that we deem inappropriate, at our sole discretion.
            </p>
          </Section>

          <Section id="intellectual-property" title="5. Intellectual Property">
            <p style={{ marginBottom: "1rem" }}>
              All original content on {SITE_NAME} — including written itineraries, route descriptions, photography credited to Sumit Singh, logos, and site design — is protected by copyright and owned by Sumit Singh.
            </p>
            <p style={{ marginBottom: "1rem" }}>You may:</p>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "1rem" }}>
              <Li>Share links to our content on social media or other websites</Li>
              <Li>Quote short excerpts (up to 150 words) with clear attribution and a link back to the source</Li>
            </ul>
            <p>
              You may <strong style={{ color: "var(--text-primary)" }}>not</strong> reproduce, republish, or commercially exploit our content without prior written permission. To request a licence or collaboration, contact{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent-gold)", fontWeight: 600 }}>{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section id="third-party-links" title="6. Third-Party Links & Services">
            <p>
              {SITE_NAME} contains links to third-party websites (hotel booking platforms, permit portals, maps, and more). These links are provided for convenience only. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.
            </p>
          </Section>

          <Section id="disclaimer" title="7. Disclaimer of Warranties">
            <p>
              THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, {SITE_NAME.toUpperCase()} DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY OF INFORMATION. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES.
            </p>
          </Section>

          <Section id="limitation" title="8. Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUMIT SINGH AND {SITE_NAME.toUpperCase()} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF — OR INABILITY TO USE — THE SITE OR ITS CONTENT, INCLUDING DAMAGES FOR PERSONAL INJURY, LOSS OF PROFITS, OR LOSS OF DATA, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Our total cumulative liability to you for any claim arising from the use of the Site shall not exceed INR 1,000 (Indian Rupees one thousand).
            </p>
          </Section>

          <Section id="indemnification" title="9. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless Sumit Singh, {SITE_NAME}, and their affiliates from any claim, liability, loss, damage, or expense (including reasonable legal fees) arising from: (a) your use of the Site in violation of these Terms; (b) your User Content; or (c) your violation of any applicable law or regulation.
            </p>
          </Section>

          <Section id="termination" title="10. Termination">
            <p>
              We reserve the right to suspend or terminate your access to the Site at any time and for any reason, including but not limited to breach of these Terms, without prior notice. Upon termination, all provisions that by their nature should survive termination (intellectual property, disclaimers, limitation of liability) shall continue to apply.
            </p>
          </Section>

          <Section id="governing-law" title="11. Governing Law & Dispute Resolution">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of New Delhi, India. Before initiating formal proceedings, you agree to first attempt resolution by contacting us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent-gold)", fontWeight: 600 }}>{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section id="changes" title="12. Changes to Terms">
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting the updated Terms with a revised "Last updated" date. Your continued use of the Site after changes are posted constitutes your acceptance of the revised Terms. We recommend reviewing this page periodically.
            </p>
          </Section>

          <Section id="contact" title="13. Contact">
            <p style={{ marginBottom: "1.25rem" }}>
              Questions about these Terms? Get in touch:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
              <span>📧 Email: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent-gold)", fontWeight: 600 }}>{CONTACT_EMAIL}</a></span>
              <span>📍 Location: New Delhi, India</span>
              <span>🌐 Contact Form: <Link href="/contact" style={{ color: "var(--accent-gold)", fontWeight: 600 }}>Visit Contact Page</Link></span>
            </div>
          </Section>

          {/* CTA Block */}
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem",
              background: "var(--bg-card)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-neo-raised)",
            }}
          >
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.25rem", fontSize: "0.9375rem" }}>
              Have questions or concerns about our terms?
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.75rem",
                  background: "var(--color-primary)",
                  color: "#fff",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Contact Us
              </Link>
              <Link
                href="/privacy-policy"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.75rem",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  border: "1.5px solid var(--border-accent)",
                }}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .terms-grid {
            grid-template-columns: 1fr !important;
          }
          .terms-grid aside {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
