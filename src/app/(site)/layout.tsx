import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import StaticBackground from "@/components/ui/StaticBackground";
import ChatWidgetDynamic from "@/components/chatbot/ChatWidgetDynamic";
import TripViewTracker from "@/components/providers/TripViewTracker";
import { getAllTrips } from "@/lib/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // Build a minimal search index server-side — no secrets exposed, no heavy bundle
  const trips = await getAllTrips();
  const searchIndex = trips.map((t) => ({
    slug: t.slug,
    title: t.title,
    tags: t.tags ?? [],
  }));

  return (
    <>
      <TripViewTracker />
      {/* Static fixed background — single image for all pages */}
      <StaticBackground />
      {/* Page chrome — sits above background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar searchIndex={searchIndex} />
        <main>{children}</main>
        <Footer />
        <MobileTabBar />
      </div>
      <ChatWidgetDynamic />
    </>
  );
}
