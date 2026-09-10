import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "India Travel Weather Guide — Raste Aur Raahein",
  description:
    "Real-time weather and seasonal travel conditions across India — Himalayas, Rajasthan, Kerala, Goa, Northeast. Plan the perfect time to visit.",
  alternates: { canonical: "/weather" },
};

export default function WeatherLayout({ children }: { children: React.ReactNode }) {
  return children;
}
