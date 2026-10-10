import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GeneratedTripsProvider } from "@/components/providers/GeneratedTripsProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { WebSiteSchema } from "@/components/ui/AuthorSchema";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NewsletterPopup from "@/components/ui/NewsletterPopup";

// Strip trailing slash so metadataBase never produces double-slash canonicals.
// Use || (not ??) so an empty-string env var also falls back to the default.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://raste-aur-rahein.vercel.app"
).replace(/\/$/, "");

// GA4 Measurement ID parameterized via environment variable
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "India Trip Itineraries",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192" },
      { url: "/icons/icon-512.png", sizes: "512x512" },
    ],
  },
  appleWebApp: {
    title: "India Trip Itineraries",
    capable: true,
    statusBarStyle: "default",
  },
  title: {
    default: "India Trip Itineraries — Raste Aur Raahein",
    template: "%s | India Trip Itineraries",
  },
  description:
    "India travel blog with detailed itineraries, budgets, and route maps for Himalayan treks, road trips, and off-the-beaten-path adventures.",
  keywords: ["India Trip Itineraries", "India travel blog", "travel itinerary India", "Himalayan road trip", "Spiti Valley", "Leh Ladakh guide", "adventure travel India"],
  authors: [{ name: "Sumit Singh" }],
  creator: "Sumit Singh",
  alternates: {
    canonical: "/",
  },
  verification: {
    // Read verification tokens from env with fallbacks
    google: [
      "J-9mLTBJXKKSwogSAo7iPNMfRCCY7xq1xPROBf0aYV8",
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? [process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION]
        : ["BIEenwmGrsRC5bsvFN9U6T7pYVD2082zfSkxi4CObA4"]),
    ],
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": [process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION] } }
      : {}),
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "India Trip Itineraries",
    title: "India Trip Itineraries — Raste Aur Raahein",
    description:
      "Detailed travel itineraries, honest budgets, and route maps for India's greatest road trips and treks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "India Trip Itineraries — Raste Aur Raahein",
    description: "Travel itineraries for India — high altitudes, ancient monasteries, and roads less taken.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="google-site-verification" content="J-9mLTBJXKKSwogSAo7iPNMfRCCY7xq1xPROBf0aYV8" />
        <meta name="application-name" content="India Trip Itineraries" />
        {/* ── Android PWA: status-bar colour ── */}
        <meta name="theme-color" content="#006CE4" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111318" media="(prefers-color-scheme: dark)" />
        {/* ── Android legacy flag ── */}
        <meta name="mobile-web-app-capable" content="yes" />
        {/* ── iOS standalone flags ── */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="India Trip Itineraries" />
        {/* ── iOS touch icon (shown when "Add to Home Screen") ── */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
        {/* ── Performance: preconnect to third-party origins ──
            Tells the browser to open early TCP+TLS connections before
            requests are made. Reduces LCP on pages that load external assets. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <WebSiteSchema />
      </head>
      <body>
        <ThemeProvider>
          <GeneratedTripsProvider>
            <AuthProvider>
              {children}
              <InstallPrompt />
              {/* Exit-intent newsletter popup — mounts once, self-manages visibility */}
              <NewsletterPopup />
            </AuthProvider>
          </GeneratedTripsProvider>
        </ThemeProvider>
        {/* 
          Google Analytics 4 via @next/third-parties/google:
          - Automatically deferred so it never blocks LCP or page interaction.
          - Consent-friendly defaults: No invasive advertising cookies or cross-site profiling
            are initialized prior to user interaction.
          - Enhanced measurement is enabled directly on the GA4 Data Stream for page views,
            scroll depth (90%), outbound link tracking, and site searches.
          - Internal editor/developer traffic is excluded via src/lib/analytics.ts and GA4 IP filters.
        */}
        {GA4_ID && <GoogleAnalytics gaId={GA4_ID} />}

        {/* Real-User Core Web Vitals monitoring (p75 LCP, CLS, INP) */}
        <SpeedInsights />
      </body>
    </html>
  );
}


