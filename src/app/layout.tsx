import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GeneratedTripsProvider } from "@/components/providers/GeneratedTripsProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { WebSiteSchema } from "@/components/ui/AuthorSchema";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import GoogleAnalytics from "@/components/providers/GoogleAnalytics";
import NewsletterPopup from "@/components/ui/NewsletterPopup";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://raste-aur-rahein.vercel.app/"
  ),
  title: {
    default: "Raste Aur Raahein — India Travel Blog by Sumit Singh",
    template: "%s | Raste Aur Raahein",
  },
  description:
    "India travel blog with detailed itineraries, budgets, and route maps for Himalayan treks, road trips, and off-the-beaten-path adventures.",
  keywords: ["India travel blog", "travel itinerary India", "Himalayan road trip", "Spiti Valley", "Leh Ladakh guide", "adventure travel India"],
  authors: [{ name: "Sumit Singh" }],
  creator: "Sumit Singh",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "BIEenwmGrsRC5bsvFN9U6T7pYVD2082zfSkxi4CObA4",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Raste Aur Raahein",
    title: "Raste Aur Raahein — India Travel Blog by Sumit Singh",
    description:
      "Detailed travel itineraries, honest budgets, and route maps for India's greatest road trips and treks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raste Aur Raahein — India Travel Blog",
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
        {/* ── Android PWA: status-bar colour ── */}
        <meta name="theme-color" content="#006CE4" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111318" media="(prefers-color-scheme: dark)" />
        {/* ── Android legacy flag ── */}
        <meta name="mobile-web-app-capable" content="yes" />
        {/* ── iOS standalone flags ── */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Raste Aur Raahein" />
        {/* ── iOS touch icon (shown when "Add to Home Screen") ── */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
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
        {/* Google Analytics 4 — loads after page is interactive, no-ops if env var not set */}
        <GoogleAnalytics />
        {/* Google AdSense — loads after interactive so it doesn't mutate head before React hydration */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4406894064911133"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}


