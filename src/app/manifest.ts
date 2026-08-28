import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RasteAurRahein",
    short_name: "RasteAurRahein",
    description:
      "Discover India through curated travel itineraries, trip guides, and travel stories.",
    start_url: "/",
    display: "standalone",
    // Match the dark-mode --bg-primary CSS variable used throughout the app
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    orientation: "portrait",
    categories: ["travel", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
