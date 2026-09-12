import { DEMO_TRIPS } from "@/lib/data/trips";
import { REGIONS } from "@/lib/regions";
import type { KnowledgeChunk } from "./types";

/**
 * Builds all knowledge chunks from the app's published data.
 * Static memoization ensures zero re-computation across requests in server runtime.
 */
let cachedCorpus: KnowledgeChunk[] | null = null;

export function getKnowledgeCorpus(): KnowledgeChunk[] {
  if (cachedCorpus) return cachedCorpus;

  const chunks: KnowledgeChunk[] = [];

  // ─────────────────────────────────────────────────────────────
  // 1. TRIPS
  // ─────────────────────────────────────────────────────────────
  for (const trip of DEMO_TRIPS) {
    const daysCount = trip.itinerary?.length || 1;
    const budgetStr = trip.totalBudget
      ? `₹${trip.totalBudget.toLocaleString("en-IN")} ${trip.currency || "INR"}`
      : "Not specified";
    const seasonStr = trip.bestSuggestedMonth || "Year-round";
    const tagsStr = (trip.tags || []).join(", ");

    // Overview chunk
    const overviewLines = [
      `Trip Title: ${trip.title}`,
      `Slug: ${trip.slug}`,
      `URL: /trips/${trip.slug}`,
      `Duration: ${daysCount} Days`,
      `Estimated Budget: ${budgetStr}`,
      `Best Time / Season: ${seasonStr}`,
      `Trip Type: ${trip.tripType || "Travel"}`,
      `Country: ${trip.country || "India"}`,
      `Tags: ${tagsStr}`,
      `Summary: ${trip.excerpt || ""}`,
    ];

    chunks.push({
      id: `trip-overview-${trip.slug}`,
      sourceType: "trip",
      slug: trip.slug,
      title: trip.title,
      url: `/trips/${trip.slug}`,
      category: "Trip Overview",
      content: overviewLines.join("\n"),
      metadata: {
        budget: trip.totalBudget,
        days: daysCount,
        season: seasonStr,
        tags: trip.tags,
      },
    });

    // Itinerary days chunks (batch ~3 days per chunk for optimal context density)
    if (trip.itinerary && trip.itinerary.length > 0) {
      const batchSize = 3;
      for (let i = 0; i < trip.itinerary.length; i += batchSize) {
        const batch = trip.itinerary.slice(i, i + batchSize);
        const dayTexts: string[] = [];

        for (const day of batch) {
          const actTexts = (day.activities || []).map((act) => {
            const costText = act.cost ? ` [Cost: ₹${act.cost}]` : "";
            const noteText = act.notes ? ` (Note: ${act.notes})` : "";
            const locText = act.location?.name ? ` @ ${act.location.name}` : "";
            return `  - ${act.time ? `${act.time}: ` : ""}${act.title}${locText}${costText}. ${act.description || ""}${noteText}`;
          });

          dayTexts.push(
            `Day ${day.dayNumber}: ${day.title}\n` +
            `Summary: ${day.summary || "Exploration"}\n` +
            `Activities:\n${actTexts.join("\n")}`
          );
        }

        chunks.push({
          id: `trip-days-${trip.slug}-${i + 1}-to-${i + batch.length}`,
          sourceType: "trip",
          slug: trip.slug,
          title: `${trip.title} (Days ${i + 1}–${i + batch.length})`,
          url: `/trips/${trip.slug}`,
          category: "Itinerary Schedule",
          content: `Trip: ${trip.title} (/trips/${trip.slug})\n\n` + dayTexts.join("\n\n"),
          metadata: {
            days: daysCount,
            budget: trip.totalBudget,
            season: seasonStr,
            tags: trip.tags,
          },
        });
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 2. REGIONS
  // ─────────────────────────────────────────────────────────────
  for (const reg of REGIONS) {
    const matchingTrips = DEMO_TRIPS.filter((t) =>
      t.tags?.some((tag) =>
        reg.tags.map((rt) => rt.toLowerCase()).includes(tag.toLowerCase())
      )
    ).map((t) => `• ${t.title} (/trips/${t.slug}) - ${t.itinerary?.length || 1} Days, ₹${t.totalBudget?.toLocaleString("en-IN") || "N/A"}`);

    const regionContent = [
      `Region: ${reg.label} (${reg.headline})`,
      `Slug: ${reg.slug}`,
      `URL: /regions/${reg.slug}`,
      `Description: ${reg.description}`,
      `Introduction: ${reg.intro}`,
      `Key Circuit Tags: ${reg.tags.join(", ")}`,
      `Related Circuits: ${reg.related.join(", ")}`,
      `Documented Trips in this Region (${matchingTrips.length}):`,
      matchingTrips.length > 0 ? matchingTrips.join("\n") : "None currently published.",
    ].join("\n");

    chunks.push({
      id: `region-${reg.slug}`,
      sourceType: "region",
      slug: reg.slug,
      title: `${reg.label} Region Guide`,
      url: `/regions/${reg.slug}`,
      category: "Region",
      content: regionContent,
      metadata: {
        region: reg.slug,
        tags: reg.tags,
      },
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 3. STATIC SITE PAGES
  // ─────────────────────────────────────────────────────────────

  // About Page
  chunks.push({
    id: "page-about",
    sourceType: "page",
    title: "About Raste Aur Raahein & Founder Sumit Singh",
    url: "/about",
    category: "About",
    content: [
      "Page: About Raste Aur Raahein (/about)",
      "Founder: Sumit Singh (traveler, engineer, photographer)",
      "Mission: Raste Aur Raahein is an India travel blog and trip-planning app built on the philosophy of raw, unfiltered notes, honest budgets, and real stories over glossy tourist brochures.",
      "Core Values:",
      "1. Ground Truth First: Every route, pass, homestay, and fuel stop is documented from real ground journeys.",
      "2. Honest Accounting: Transparent budget breakdowns in INR including fuel, permits, stays, and hidden fees.",
      "3. Offbeat Over Cliché: Prioritizing rural homestays, forgotten mountain trails, and cultural depth over crowded tourist traps.",
      "Travel Stats: 12+ Countries explored, 48+ Detailed Trips documented, 60,000+ km travelled across India, 200+ original photos published.",
      "Key Milestones:",
      "• First Solo Trip: Leh Ladakh across high Himalayan passes on local buses.",
      "• Founding: Started Raste Aur Raahein to solve the lack of honest, actionable overland notes.",
      "• Rajasthan Circuit: 21 days across Jaisalmer, Jodhpur, Udaipur, Thar desert outposts.",
      "• Trans-Himalayan Expeditions: Spiti Valley, Kinnaur, and Lahaul deep exploration.",
      "• South India Coastal Drive: 1,800 km on two wheels from Goa to Kanyakumari along the Arabian Sea.",
      "• Frontier Trails: Deep journeys into Northeast India (Meghalaya, Arunachal Pradesh, Nagaland).",
    ].join("\n"),
  });

  // Contact Page
  chunks.push({
    id: "page-contact",
    sourceType: "page",
    title: "Contact & Community Channels",
    url: "/contact",
    category: "Contact",
    content: [
      "Page: Contact Us (/contact)",
      "Email: sumit@rasteaurrahein.com",
      "Channels: Contact form on /contact, newsletter subscription, and GitHub.",
      "Frequently Asked Questions (FAQs):",
      "Q: Can I suggest a trip or route for Raste Aur Raahein to document?",
      "A: Yes! Reach out via the contact form or email with details of the route.",
      "Q: Are the budget estimates per person or total?",
      "A: All trip budgets on Raste Aur Raahein are clearly stated per person unless specifically noted as a shared vehicle/stay cost.",
      "Q: Can I download GPX files for routes?",
      "A: Yes, trips with verified GPS tracks offer GPX download buttons on their trip pages.",
      "Q: Can I collaborate or write a guest itinerary?",
      "A: We collaborate with overland travelers and local guides who practice authentic, leave-no-trace travel.",
    ].join("\n"),
  });

  // AI Itinerary Planner Explainer
  chunks.push({
    id: "page-ai-planner",
    sourceType: "page",
    title: "AI Itinerary Planner Feature Guide",
    url: "/ai-planner",
    category: "Feature Guide",
    content: [
      "Page: AI Trip Planner (/ai-planner)",
      "What it is: An intelligent travel itinerary generator specifically calibrated for India and Southeast Asia travel routes.",
      "Capabilities:",
      "• Generates comprehensive day-by-day itineraries with morning, afternoon, and evening activities.",
      "• Provides realistic INR budget ranges, recommended travel months, and trip tags.",
      "Customizable Parameters:",
      "1. Destination: Any city, state, or circuit (e.g., 'Spiti Valley', 'Kerala backwaters', 'Coorg').",
      "2. Duration: 1 to 30 days.",
      "3. Travel Style: Adventure, Road Trip, Cultural, Relaxed, Budget Backpacking, Wildlife, Luxury.",
      "4. Travel Month: January through December.",
      "5. Starting Origin: User's departure city so day 1 includes realistic transit planning.",
      "6. Travel Pace: Relaxed (fewer stops), Moderate, or Packed (maximize sightseeing).",
      "7. Transport Mode: Self-drive, Public transport/trains, Flights, or Mixed.",
      "8. Dietary Preferences: Vegetarian, Vegan, Jain, Non-Vegetarian, or No Preference.",
      "9. Must-see Highlights & Things to Avoid: Free-text specific requests.",
      "How to access: Navigate to /ai-planner or click the AI Trip Planner button in the navigation bar.",
    ].join("\n"),
  });

  // Import Itinerary Explainer
  chunks.push({
    id: "page-import",
    sourceType: "page",
    title: "Import Itinerary Feature Guide",
    url: "/import",
    category: "Feature Guide",
    content: [
      "Page: Import Itinerary (/import)",
      "What it is: A tool that converts your raw travel plans, GPS recordings, and saved maps into fully formatted interactive itineraries.",
      "Supported Input Formats:",
      "1. GPX Files (.gpx): Direct upload of GPS tracking files from Garmin, Strava, OsmAnd, or Wikiloc.",
      "2. Google My Maps Links: Paste a public or unlisted Google My Maps URL.",
      "3. Raw Notes / Day-by-Day Text: Paste unstructured trip notes, email confirmations, or bulleted lists.",
      "Output Provided:",
      "• Structured daily schedule with activities and timings.",
      "• Interactive route maps and waypoint coordinates.",
      "• Automated elevation profile graphs.",
      "• Downloadable packing list and printable PDF exports.",
      "How to access: Visit /import from the header menu.",
    ].join("\n"),
  });

  // Weather Intelligence
  chunks.push({
    id: "page-weather",
    sourceType: "page",
    title: "Weather Intelligence & Regional Seasons",
    url: "/weather",
    category: "Weather",
    content: [
      "Page: Weather Intelligence (/weather)",
      "Overview: Real-time and seasonal climate guidance across India's key travel circuits.",
      "Regional Season Highlights:",
      "• Himalayas & Ladakh: June to September for motorable passes (Khardung La, Rohtang, Kunzum). Heavy snow and road closures from November to May. Winter Chadar trek occurs in January-February.",
      "• Western Ghats & Sahyadris: July to September for dramatic monsoon waterfalls, lush green treks, and mist; November to February for cool, pleasant hiking.",
      "• Central India (Madhya Pradesh & Chhattisgarh): October to March is best for national parks, heritage sites (Khajuraho, Bhimbetka), and waterfalls.",
      "• Coastal & South India: November to February offers ideal warm beach weather with low humidity. Monsoon season (June-August) brings heavy rainfall.",
      "• Rajasthan & Thar Desert: October to March brings pleasant days and crisp cool nights. Summers (April-June) exceed 42°C and are not advised.",
      "• Northeast India: October to April is the dry, clear window for living root bridges, tea gardens, and high mountain passes.",
    ].join("\n"),
  });

  // Dashboard & User Features
  chunks.push({
    id: "page-dashboard",
    sourceType: "page",
    title: "Traveler Dashboard & Saved Trips",
    url: "/dashboard",
    category: "User Features",
    content: [
      "Page: Traveler Dashboard (/dashboard)",
      "Functionality:",
      "• Bookmark trips: Click the heart/bookmark icon on any trip card or guide to save it to your personal dashboard.",
      "• Saved AI Itineraries: View, export, or edit itineraries previously generated with the AI Planner.",
      "• Digital Passport Stamps: Earn collectible digital travel stamps as you read, bookmark, and document journeys across regions.",
      "• Account Access: Sign in securely via WhatsApp OTP or password to sync saved trips across your devices.",
      "Note: The chatbot can explain how to use dashboard features, but does not access private account credentials.",
    ].join("\n"),
  });

  cachedCorpus = chunks;
  return chunks;
}
