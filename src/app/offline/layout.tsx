import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're Offline — Raste Aur Raahein",
  description: "No internet connection. Check your connection and try again.",
  robots: { index: false, follow: false },
};

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
