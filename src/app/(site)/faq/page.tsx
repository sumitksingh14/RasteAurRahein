import type { Metadata } from "next";
import Link from "next/link";
import SilkPageHeader from "@/components/ui/SilkPageHeader";
import FAQSchema from "@/components/ui/FAQSchema";

export const metadata: Metadata = {
  title: "FAQs — Common Questions About India Travel",
  description:
    "Answers to the most common questions about planning India road trips, Himalayan treks, permits, budgets, best seasons, and using Raste Aur Raahein's itineraries.",
  alternates: { canonical: "/faq" },
  robots: { index: true, follow: true },
};

const FAQ_CATEGORIES = [
  {
    id: "planning",
    label: "🗺️ Trip Planning",
    faqs: [
      {
        question: "How accurate are the itineraries on Raste Aur Raahein?",
        answer:
          "All itineraries are based on personal experience and real journeys by Sumit Singh and verified community contributors. That said, road conditions, hotel prices, and accessibility can change — especially in high-altitude regions. Always cross-check with local sources or the Border Roads Organisation (BRO) before travel.",
      },
      {
        question: "What is the best time to visit Ladakh and Spiti Valley?",
        answer:
          "For Ladakh, June to September is ideal — roads are open, weather is stable, and the landscape is at its most dramatic. For Spiti, late June to October is best. The Manali–Leh and Manali–Kaza highways typically open by mid-June depending on snowfall. Winter travel (November–March) is possible only for those with experience in extreme cold.",
      },
      {
        question: "Do I need special permits for Ladakh or Spiti Valley?",
        answer:
          "Yes. Areas near the China and Pakistan borders (Pangong Tso, Nubra Valley, Tso Moriri, Hanle) require an Inner Line Permit (ILP) from the Leh DC Office or online via the LAHDC website. Spiti Valley is generally permit-free for Indian nationals, but Rohtang Pass requires an online permit via the Himachal Pradesh portal. Foreign nationals need a Protected Area Permit (PAP) for restricted zones.",
      },
      {
        question: "How many days should I plan for a Spiti Valley circuit?",
        answer:
          "A comfortable Spiti Valley circuit (Shimla → Kaza → Manali or vice versa) takes 7–10 days. We recommend at least 9 days to avoid rushing and to include acclimatisation rest days at Kaza (3,800m). Rushing over high passes like Kunzum La (4,590m) without acclimatisation significantly increases AMS risk.",
      },
      {
        question: "What vehicle is best for Ladakh and Spiti road trips?",
        answer:
          "High ground clearance is essential. Popular choices: Royal Enfield motorcycles (350/411cc+), SUVs like Toyota Fortuner, Mahindra Thar/Scorpio, or Maruti Jimny. Sedan cars can manage some routes but struggle on rocky stretches near Marsimik La or Zanskar roads. Always carry a full-size spare tyre and basic recovery gear.",
      },
      {
        question: "Can I do a Leh-Ladakh trip on a budget?",
        answer:
          "Yes. Our budget-focused itineraries show how to do Ladakh for ₹25,000–₹40,000 per person (excluding flights/bus to Leh) over 10 days. Key money-savers: stay in homestays (₹400–₹800/night), cook or eat at dhabbas, travel in a group to split fuel costs, and rent a bike locally in Leh.",
      },
    ],
  },
  {
    id: "altitude",
    label: "⛰️ Altitude & Safety",
    faqs: [
      {
        question: "How do I prevent Altitude Mountain Sickness (AMS)?",
        answer:
          "Ascend gradually — don't fly directly to Leh and expect to trek the next day. Rest for 24–48 hours upon arrival. Stay well hydrated (3–4L water/day). Avoid alcohol and sleeping pills for the first 48 hours. Carry Diamox (acetazolamide) after consulting your doctor. Descend immediately if you experience severe headache, vomiting, confusion, or difficulty breathing.",
      },
      {
        question: "Is it safe to drive over Khardung La and Baralacha La?",
        answer:
          "Yes, with preparation. These passes are among the world's highest motorable roads. Drive slowly, keep the engine revving, carry extra fuel (stations are sparse), and avoid travel in poor weather. Check BRO road status updates or ask at your hotel/guesthouse in Leh before departure.",
      },
      {
        question: "Should I have travel insurance for Himalayan trips?",
        answer:
          "Absolutely — this is non-negotiable for high-altitude adventure travel. Ensure your policy covers high-altitude trekking (above 3,500m), emergency medical evacuation (helicopter), trip cancellation, and road accident cover. International insurers like World Nomads or SafetyWing cover adventure sports; check the fine print for altitude limits.",
      },
    ],
  },
  {
    id: "site",
    label: "💻 Using This Site",
    faqs: [
      {
        question: "Can I download itineraries for offline use?",
        answer:
          "Yes! Every trip page has a PDF Download button. Alternatively, install the Raste Aur Raahein PWA (tap 'Add to Home Screen' on your phone) for full offline access, including saved itineraries, maps, and road condition data — no internet required once installed.",
      },
      {
        question: "How does the AI Trip Planner work?",
        answer:
          "Our AI Planner uses Groq (powered by Llama) to generate custom India trip itineraries based on your destination, duration, budget, and preferences. Results are generated in seconds. You can save generated itineraries to your account or export them as PDF. It's a starting point — always personalise the plan.",
      },
      {
        question: "How do I submit my own trip itinerary?",
        answer:
          "Head to the Submit a Trip page. Fill in your route, duration, budget, and highlights. Our team reviews all submissions for accuracy and quality before publishing. Accepted contributors are credited by name and get a special badge on their profile.",
      },
      {
        question: "How do I report a road condition or trail closure?",
        answer:
          "Use the Field Report button on any Road Conditions or trip page. Reports are geotagged and timestamped. Our community of travellers and the site team review reports. Critical closures are highlighted at the top of relevant trip pages.",
      },
      {
        question: "Is Raste Aur Raahein free to use?",
        answer:
          "Yes — all core content (itineraries, guides, road conditions, weather) is completely free. We sustain the site through contextual advertising and occasional affiliate links (hotels, gear). We clearly label affiliate links and only recommend services we'd actually use. Creating an account is also free.",
      },
      {
        question: "How do I delete my account and data?",
        answer:
          "Email us at zsumitksingh@gmail.com with subject 'Account Deletion Request'. We will permanently delete your account and associated personal data within 7 working days. Trip contributions you've made will be anonymised unless you request full removal.",
      },
    ],
  },
  {
    id: "gear",
    label: "🎒 Gear & Packing",
    faqs: [
      {
        question: "What are the essentials for a Himalayan road trip packing list?",
        answer:
          "Key items: thermal base layers, windproof/waterproof outer jacket, sun protection (SPF 50+, UV sunglasses, lip balm), high-altitude first aid kit (Diamox, ibuprofen, ORS sachets, blister pads), portable charger/power bank, offline maps (Maps.me or downloaded Google Maps), headlamp, and cash (ATMs are sparse above Manali/Leh). Download our Smart Packing Checklist from any trip page for a tailored list.",
      },
      {
        question: "Is there mobile network connectivity in Ladakh and Spiti?",
        answer:
          "BSNL and Jio have the best coverage in remote areas — Airtel and Vi are very limited. Carry a BSNL SIM as backup. Expect no signal on many mountain passes and between villages. Download offline maps, itineraries, and emergency contacts before you leave the last town. Our PWA works fully offline once installed.",
      },
    ],
  },
];

// Flatten all FAQs for schema injection
const ALL_FAQS = FAQ_CATEGORIES.flatMap((cat) => cat.faqs);

export default function FAQPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "var(--nav-height)" }}>
      {/* Inject FAQ JSON-LD schema (hidden accordion rendered below) */}
      <FAQSchema items={ALL_FAQS} showAccordion={false} />

      <SilkPageHeader
        eyebrow="✦ Help & Info"
        heading="Frequently Asked Questions"
        description="Everything you need to know about India road trips, Himalayan treks, using this site, and staying safe at altitude."
        maxWidth={820}
      />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Category Quick-Nav */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          {FAQ_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="faq-pill"
              style={{
                padding: "0.5rem 1.125rem",
                borderRadius: "9999px",
                background: "var(--bg-card)",
                boxShadow: "var(--shadow-neo-raised)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                border: "1.5px solid transparent",
              }}
            >
              {cat.label}
            </a>
          ))}
        </div>
        <style>{`
          .faq-pill:hover {
            color: var(--accent-gold) !important;
            border-color: var(--accent-gold) !important;
            background: var(--accent-gold-dim) !important;
          }
        `}</style>

        {/* FAQ Categories */}
        {FAQ_CATEGORIES.map((cat) => (
          <section key={cat.id} id={cat.id} style={{ marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.375rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {cat.label}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {cat.faqs.map((faq, idx) => (
                <FaqItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>
        ))}

        {/* Still need help CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            background: "var(--bg-card)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-neo-raised)",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-gold)",
              marginBottom: "1rem",
            }}
          >
            ✦ Still Have Questions?
          </div>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
            }}
          >
            We&apos;re Here to Help
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              lineHeight: 1.7,
              maxWidth: "48ch",
              margin: "0 auto 2rem",
            }}
          >
            Can&apos;t find your answer? Send us a message and we&apos;ll respond within 24–48 hours.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.875rem 2rem",
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.9375rem",
                boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
                transition: "all 0.2s ease",
              }}
            >
              📬 Ask a Question
            </Link>
            <Link
              href="/trips"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.875rem 2rem",
                background: "transparent",
                color: "var(--text-secondary)",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.9375rem",
                border: "1.5px solid var(--border-accent)",
              }}
            >
              🗺️ Browse Itineraries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Client accordion item (server-rendered fallback via details/summary) ──────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        background: "var(--bg-card)",
        boxShadow: "var(--shadow-neo-raised)",
        overflow: "hidden",
      }}
    >
      <summary
        style={{
          padding: "1.125rem 1.375rem",
          cursor: "pointer",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          lineHeight: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          listStyle: "none",
          gap: "1rem",
          userSelect: "none",
        }}
      >
        <span>{question}</span>
        <span
          style={{
            fontSize: "1.25rem",
            color: "var(--accent-gold)",
            flexShrink: 0,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <div
        style={{
          padding: "0 1.375rem 1.25rem",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          borderTop: "1px solid var(--border)",
          paddingTop: "1rem",
        }}
      >
        {answer}
      </div>
    </details>
  );
}
