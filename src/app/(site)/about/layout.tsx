import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sumit Singh — Raste Aur Raahein",
  description:
    "Meet Sumit Singh — traveller, photographer, and software engineer behind Raste Aur Raahein. 12+ countries, 60,000 km, and every Indian mountain range.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Sumit Singh — Raste Aur Raahein",
    description:
      "The story behind the blog — high-altitude solo trips, road-trip culture, and documenting India's roads less taken.",
    type: "profile",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
