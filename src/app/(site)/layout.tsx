import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import StaticBackground from "@/components/ui/StaticBackground";
import ChatWidgetDynamic from "@/components/chatbot/ChatWidgetDynamic";
import TripViewTracker from "@/components/providers/TripViewTracker";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TripViewTracker />
      {/* Static fixed background — single image for all pages */}
      <StaticBackground />
      {/* Page chrome — sits above background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileTabBar />
      </div>
      <ChatWidgetDynamic />
    </>
  );
}

