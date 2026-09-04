import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  // Only enable the service worker in production builds.
  // Using !== "production" (rather than === "development") suppresses the
  // @serwist/next Turbopack warning and also disables the SW in test/staging
  // environments where it would interfere with hot-reload.
  disable: process.env.NODE_ENV !== "production",
});

const nextConfig: NextConfig = {
  // Empty turbopack config tells Next.js 16 we are aware Turbopack is
  // active. @serwist/next uses a webpack plugin that runs at build time
  // (next build uses webpack by default), so this is not a conflict.
  turbopack: {},
  images: {
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net",
      },
      {
        protocol: "https",
        hostname: "unpkg.com", // Leaflet marker icon PNGs
      },
    ],
  },
};

export default withSerwist(nextConfig);
