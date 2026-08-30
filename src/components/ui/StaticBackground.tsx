/**
 * StaticBackground — single fixed background image for all pages.
 * Replaces the old AmbientBackground carousel (Unsplash slideshow + ken-burns animation).
 */
export default function StaticBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/raste-aur-raahein-bg.jpg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />

      {/* Dark overlay — keeps all pages legible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(3, 15, 20, 0.74)",
        }}
      />

      {/* Subtle vignette for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />
    </div>
  );
}
