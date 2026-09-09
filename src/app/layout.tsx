import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GeneratedTripsProvider } from "@/components/providers/GeneratedTripsProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { WebSiteSchema } from "@/components/ui/AuthorSchema";
import InstallPrompt from "@/components/pwa/InstallPrompt";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rasteaurrahein.com"
  ),
  title: {
    default: "Raste Aur Raahein — Travel Blog by Sumit Singh",
    template: "%s | Raste Aur Raahein",
  },
  description:
    "Portfolio-style travel blog documenting high-altitude treks, desert roads, and off-the-beaten-path adventures across India and beyond.",
  keywords: ["travel blog", "India travel", "trekking", "Spiti Valley", "adventure travel", "itinerary"],
  authors: [{ name: "Sumit Singh" }],
  creator: "Sumit Singh",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Raste Aur Raahein",
    title: "Raste Aur Raahein — Travel Blog by Sumit Singh",
    description:
      "Portfolio-style travel blog documenting high-altitude treks, desert roads, and off-the-beaten-path adventures.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raste Aur Raahein — Travel Blog by Sumit Singh",
    description: "Travel blog — high altitudes, ancient monasteries, and roads less taken.",
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
            </AuthProvider>
          </GeneratedTripsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


