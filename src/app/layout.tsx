import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GeneratedTripsProvider } from "@/components/providers/GeneratedTripsProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import AIItineraryButton from "@/components/ai/AIItineraryButton";
import SnowEffect from "@/components/ui/SnowEffect";
import ButterflyFollower from "@/components/ui/ButterflyFollower";
import AmbientBackground from "@/components/ui/AmbientBackground";
import { WebSiteSchema } from "@/components/ui/AuthorSchema";
export const metadata: Metadata = {
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <WebSiteSchema />
      </head>
      <body>
        <ThemeProvider>
          <GeneratedTripsProvider>
            <AuthProvider>
              {/* Ambient cycling background — fixed, z-index 0 */}
              <AmbientBackground />
              {/* Global overlays — float above everything */}
              <SnowEffect />
              <ButterflyFollower />
              {/* Page chrome — sits above ambient */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <MobileTabBar />
              </div>
              <AIItineraryButton />
            </AuthProvider>
          </GeneratedTripsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


