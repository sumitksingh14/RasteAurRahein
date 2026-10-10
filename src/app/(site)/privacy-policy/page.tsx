import type { Metadata } from "next";
import SilkPageHeader from "@/components/ui/SilkPageHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Raste Aur Raahein collects, uses, and protects your personal information when you use our India travel blog and itinerary platform.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "October 1, 2026";
const SITE_NAME = "Raste Aur Raahein";
const CONTACT_EMAIL = "zsumitksingh@gmail.com";
const SITE_URL = "https://raste-aur-rahein.vercel.app";

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
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "third-parties", label: "Third-Party Services" },
  { id: "data-retention", label: "Data Retention" },
  { id: "your-rights", label: "Your Rights" },
  { id: "security", label: "Security" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "var(--nav-height)" }}>
      <SilkPageHeader
        eyebrow="✦ Legal"
        heading="Privacy Policy"
        description={`Last updated: ${LAST_UPDATED}. Your privacy is important to us. This policy explains how ${SITE_NAME} handles your data.`}
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
        className="privacy-grid"
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
          <nav aria-label="Privacy policy sections">
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
            This Privacy Policy applies to <strong style={{ color: "var(--text-primary)" }}>{SITE_NAME}</strong> (&quot;{SITE_URL}&quot;) operated by Sumit Singh. By using our site, you agree to this policy. If you do not agree, please discontinue use of the site.
          </div>

          <Section id="information-we-collect" title="1. Information We Collect">
            <p style={{ marginBottom: "1rem" }}>We collect information you provide directly and information collected automatically:</p>
            <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Information you provide:</p>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "1rem" }}>
              <Li>Name and email address when you subscribe to our newsletter or create an account</Li>
              <Li>Trip data and itineraries you submit through our trip submission feature</Li>
              <Li>Messages you send via our contact form</Li>
              <Li>Comments and reviews you post on trip pages</Li>
              <Li>Field reports and travel conditions you submit</Li>
            </ul>
            <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Automatically collected information:</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <Li>IP address and general geographic location (city/region level only)</Li>
              <Li>Browser type, device type, and operating system</Li>
              <Li>Pages visited, time spent, and interactions on our site</Li>
              <Li>Referring URL (how you arrived at our site)</Li>
              <Li>Search queries entered within the site</Li>
            </ul>
          </Section>

          <Section id="how-we-use" title="2. How We Use Your Information">
            <p style={{ marginBottom: "1rem" }}>We use your information to:</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <Li>Deliver trip itineraries, guides, and travel content you request</Li>
              <Li>Send our newsletter (only if you explicitly opt in — unsubscribe anytime)</Li>
              <Li>Respond to your contact form messages and support requests</Li>
              <Li>Improve site content, navigation, and user experience based on aggregate analytics</Li>
              <Li>Detect and prevent spam, abuse, or fraudulent activity</Li>
              <Li>Comply with legal obligations</Li>
              <Li>Display personalised trip recommendations based on your browsing history on this site</Li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              We do <strong style={{ color: "var(--text-primary)" }}>not</strong> sell, rent, or trade your personal information to third parties for their own marketing purposes.
            </p>
          </Section>

          <Section id="cookies" title="3. Cookies & Tracking Technologies">
            <p style={{ marginBottom: "1rem" }}>We use the following cookies and tracking technologies:</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ background: "var(--accent-gold-dim)" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-primary)", fontWeight: 700, borderRadius: "8px 0 0 0" }}>Type</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-primary)", fontWeight: 700 }}>Purpose</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-primary)", fontWeight: 700, borderRadius: "0 8px 0 0" }}>Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Essential", purpose: "Authentication, session management, saved itineraries (offline)", provider: "First-party" },
                    { type: "Analytics", purpose: "Aggregate page-view statistics, scroll depth, and outbound click tracking", provider: "Google Analytics 4" },
                    { type: "Performance", purpose: "Core Web Vitals monitoring (LCP, CLS, INP) — no PII", provider: "Vercel Speed Insights" },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-primary)" }}>{row.type}</td>
                      <td style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)" }}>{row.purpose}</td>
                      <td style={{ padding: "0.75rem 1rem", color: "var(--text-muted)" }}>{row.provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: "1rem" }}>
              You can manage or disable cookies through your browser settings. Note that disabling essential cookies may affect site functionality (e.g., saved itineraries, offline mode).
            </p>
          </Section>

          <Section id="third-parties" title="4. Third-Party Services">
            <p style={{ marginBottom: "1rem" }}>We integrate with the following third-party services, each governed by their own privacy policy:</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <Li><strong>Google Analytics 4</strong> — website analytics. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-gold)" }}>Google Privacy Policy</a></Li>
              <Li><strong>Resend</strong> — transactional email delivery for newsletter and contact form. <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-gold)" }}>Resend Privacy Policy</a></Li>
              <Li><strong>Vercel</strong> — hosting, edge functions, and speed insights. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-gold)" }}>Vercel Privacy Policy</a></Li>
              <Li><strong>Upstash Redis</strong> — rate limiting and caching layer (no PII stored). <a href="https://upstash.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-gold)" }}>Upstash Privacy Policy</a></Li>
              <Li><strong>Unsplash</strong> — landscape photography embedded in itineraries. No tracking cookies from Unsplash embeds.</Li>
            </ul>
          </Section>

          <Section id="data-retention" title="5. Data Retention">
            <ul style={{ listStyle: "none", padding: 0 }}>
              <Li>Newsletter subscriptions: retained until you unsubscribe. Unsubscribe via the link in any email or by contacting us.</Li>
              <Li>Contact form submissions: retained for up to 12 months to facilitate follow-up.</Li>
              <Li>Analytics data: retained per Google Analytics default (14 months), aggregated and anonymised.</Li>
              <Li>User accounts: retained while active. You may request account deletion at any time.</Li>
              <Li>Trip submissions: retained indefinitely as part of the community knowledge base unless you request removal.</Li>
            </ul>
          </Section>

          <Section id="your-rights" title="6. Your Rights">
            <p style={{ marginBottom: "1rem" }}>
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <Li><strong>Access</strong> — Request a copy of the personal data we hold about you</Li>
              <Li><strong>Correction</strong> — Request correction of inaccurate data</Li>
              <Li><strong>Deletion</strong> — Request erasure of your data (&quot;right to be forgotten&quot;)</Li>
              <Li><strong>Portability</strong> — Request your data in a machine-readable format</Li>
              <Li><strong>Objection</strong> — Object to processing based on legitimate interests</Li>
              <Li><strong>Opt-out of newsletter</strong> — Click &quot;Unsubscribe&quot; in any email</Li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              To exercise any right, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent-gold)", fontWeight: 600 }}>
                {CONTACT_EMAIL}
              </a>{" "}
              with subject line &quot;Privacy Request&quot;. We will respond within 30 days.
            </p>
          </Section>

          <Section id="security" title="7. Security">
            <p>
              We implement industry-standard security measures including HTTPS encryption (TLS), hashed passwords (bcrypt), JWT-based session tokens, and rate limiting on all API endpoints. However, no transmission over the internet is 100% secure. We encourage you to use a strong, unique password for your account and to contact us immediately if you suspect unauthorised access.
            </p>
          </Section>

          <Section id="childrens-privacy" title="8. Children's Privacy">
            <p>
              {SITE_NAME} is not directed at children under 13 years of age. We do not knowingly collect personal data from children under 13. If you believe we have inadvertently collected data from a child, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent-gold)" }}>
                {CONTACT_EMAIL}
              </a>{" "}
              and we will promptly delete the information.
            </p>
          </Section>

          <Section id="changes" title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we make material changes, we will update the &quot;Last updated&quot; date at the top of this page and, where appropriate, notify newsletter subscribers. Your continued use of {SITE_NAME} after the update constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section id="contact" title="10. Contact Us">
            <p style={{ marginBottom: "1.25rem" }}>
              If you have any questions, concerns, or requests about this Privacy Policy or your personal data, please reach out:
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <span>📧 Email: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent-gold)", fontWeight: 600 }}>{CONTACT_EMAIL}</a></span>
              <span>📍 Location: New Delhi, India</span>
              <span>🌐 Contact Form: <Link href="/contact" style={{ color: "var(--accent-gold)", fontWeight: 600 }}>raste-aur-rahein.vercel.app/contact</Link></span>
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
              Questions about your data? We&apos;re happy to help.
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
                  transition: "all 0.2s ease",
                }}
              >
                Contact Us
              </Link>
              <Link
                href="/terms"
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
                  transition: "all 0.2s ease",
                }}
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .privacy-grid {
            grid-template-columns: 1fr !important;
          }
          .privacy-grid aside {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
