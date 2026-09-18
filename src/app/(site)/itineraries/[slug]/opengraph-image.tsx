import { ImageResponse } from "next/og";
import { getItineraryBySlug } from "@/lib/savedItineraries";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);

  const title = itinerary?.title || "AI-Generated Itinerary";
  const destination = itinerary?.destination || "India";
  const days = itinerary?.days || 0;
  const budget = itinerary?.budget || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f172a 0%, #1a2744 50%, #0f2a1a 100%)",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 80% 20%, rgba(0,108,228,0.2) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(254,187,2,0.1) 0%, transparent 40%)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 72px", flex: 1, position: "relative" }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
            <div style={{ fontSize: "24px" }}>🏔️</div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Raste Aur Raahein
            </div>
            <div style={{ marginLeft: "12px", padding: "3px 12px", background: "rgba(254,187,2,0.15)", border: "1px solid rgba(254,187,2,0.3)", borderRadius: "100px", fontSize: "11px", fontWeight: 800, color: "#FEBB02", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex" }}>
              AI Itinerary
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 50 ? "42px" : "54px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "32px",
              maxWidth: "800px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>

          {/* Destination */}
          <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
            <span>📍</span>
            <span style={{ display: "flex" }}>{destination}</span>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "24px", marginTop: "auto" }}>
            {days > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 24px", background: "rgba(0,108,228,0.15)", border: "1px solid rgba(0,108,228,0.3)", borderRadius: "12px" }}>
                <span style={{ fontSize: "20px" }}>📅</span>
                <span style={{ fontSize: "18px", fontWeight: 700, color: "#fff", display: "flex" }}>{days} Days</span>
              </div>
            )}
            {budget && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 24px", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "12px" }}>
                <span style={{ fontSize: "20px" }}>💰</span>
                <span style={{ fontSize: "18px", fontWeight: 700, color: "#6ee7b7", display: "flex" }}>{budget}</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 24px", background: "rgba(254,187,2,0.1)", border: "1px solid rgba(254,187,2,0.25)", borderRadius: "12px" }}>
              <span style={{ fontSize: "20px" }}>✨</span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#FEBB02", display: "flex" }}>AI-Generated</span>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{ display: "flex", padding: "16px 72px", background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
          raste-aur-rahein.vercel.app · Free AI-powered India travel planning
        </div>
      </div>
    ),
    { ...size }
  );
}
