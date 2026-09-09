import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're Offline — Raste Aur Raahein",
  description: "No internet connection. Check your connection and try again.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
        textAlign: "center",
      }}
    >
      {/* Animated offline icon */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
          border: "2px solid #BFDBFE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          fontSize: "2.5rem",
        }}
      >
        🏔️
      </div>

      {/* App wordmark */}
      <div
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#006CE4",
          marginBottom: "0.75rem",
        }}
      >
        Raste Aur Raahein
      </div>

      {/* Heading */}
      <h1
        style={{
          fontWeight: 900,
          fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
          color: "#262729",
          lineHeight: 1.1,
          marginBottom: "1rem",
        }}
      >
        You&apos;re Off the Grid
      </h1>

      {/* Body */}
      <p
        style={{
          color: "#6B7280",
          fontSize: "1rem",
          lineHeight: 1.7,
          maxWidth: "380px",
          marginBottom: "0.5rem",
        }}
      >
        No internet connection found. Reconnect to browse new trips — or check
        out pages you&apos;ve already visited below.
      </p>

      <p
        style={{
          color: "#9CA3AF",
          fontSize: "0.85rem",
          marginBottom: "2.5rem",
        }}
      >
        Previously cached pages are still available.
      </p>

      {/* Cached quick-links */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          justifyContent: "center",
          marginBottom: "2.5rem",
        }}
      >
        {[
          { href: "/", label: "🏠 Home" },
          { href: "/trips", label: "🗺️ Trips" },
          { href: "/regions", label: "📍 Regions" },
          { href: "/about", label: "👤 About" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              padding: "0.55rem 1.2rem",
              borderRadius: "100px",
              border: "1.5px solid #E5E7EB",
              background: "#F9FAFB",
              color: "#374151",
              fontFamily: "inherit",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Retry button */}
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: "0.75rem 2.5rem",
          borderRadius: "100px",
          border: "none",
          background: "#006CE4",
          color: "#FFFFFF",
          fontFamily: "inherit",
          fontSize: "0.95rem",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,108,228,0.3)",
          transition: "background 0.2s ease, transform 0.1s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#0057b8";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#006CE4";
          (e.currentTarget as HTMLButtonElement).style.transform = "none";
        }}
      >
        Try Again
      </button>

      {/* Footer note */}
      <p
        style={{
          marginTop: "3rem",
          fontSize: "0.75rem",
          color: "#D1D5DB",
        }}
      >
        Once reconnected, all trips and itineraries will load normally.
      </p>

      {/* Inline reload script — works even without JS hydration */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.querySelector('button').addEventListener('click', function() {
              window.location.reload();
            });
          `,
        }}
      />
    </div>
  );
}
