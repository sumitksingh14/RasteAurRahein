import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Weather Tracker — Raste Aur Raahein",
  description:
    "Live weather conditions across India's top travel destinations — Himalayas, Rajasthan, Goa, South India, and Northeast India. Plan your trip with real-time data.",
};

export default function WeatherLayout({ children }: { children: React.ReactNode }) {
  return children;
}
