import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raste Aur Raahein",
    short_name: "RasteAurRahein",
    description:
      "Discover India through curated travel itineraries, trip guides, and honest travel stories by Sumit Singh.",
    start_url: "/",
    scope: "/",
    lang: "en-IN",
    dir: "ltr",

    // display_override gives Android Chrome the priority order:
    // 1. standalone (removes browser chrome entirely — best app feel)
    // 2. minimal-ui (fallback for older Android that supports minimal-ui)
    display: "standalone",
    display_override: ["standalone", "minimal-ui", "browser"],

    // Light theme colours — match the Figma design system
    background_color: "#FFFFFF",
    theme_color: "#006CE4",

    orientation: "portrait-primary",
    categories: ["travel", "lifestyle", "navigation"],

    // ── Icons ──────────────────────────────────────────────────────────────
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        // maskable = safe zone for adaptive icons on Android 8+
        purpose: "maskable",
      },
    ],

    // ── Shortcuts (long-press the app icon on Android launcher) ────────────
    shortcuts: [
      {
        name: "Find Trips",
        short_name: "Trips",
        description: "Browse all curated India trip guides",
        url: "/trips",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "AI Trip Planner",
        short_name: "AI Planner",
        description: "Plan your next Indian adventure with AI",
        url: "/ai-planner",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Import Itinerary",
        short_name: "Import",
        description: "Import your own trip itinerary",
        url: "/import",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Regions",
        short_name: "Regions",
        description: "Explore trips by region of India",
        url: "/regions",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],

    // ── Screenshots (Chrome shows these in the rich install dialog) ────────
    screenshots: [
      {
        src: "/screenshots/screenshot-mobile.png",
        sizes: "390x844",
        type: "image/png",
        // form_factor "narrow" = mobile — required for Chrome's install UI
        form_factor: "narrow",
        label: "Raste Aur Raahein — Home screen with Trip Discovery search",
      },
      {
        src: "/screenshots/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Raste Aur Raahein — Desktop view with featured trips",
      },
    ],

    // ── Share Target (receive shared URLs into the app) ────────────────────
    // When a user shares a URL from another app, this opens /import?url=<shared-url>
    share_target: {
      action: "/import",
      method: "GET",
      params: {
        title: "title",
        text: "text",
        url: "url",
      },
    },

    // ── Related Applications ───────────────────────────────────────────────
    // Tells Chrome this IS the app — suppress Play Store suggestions
    prefer_related_applications: false,
  };
}

