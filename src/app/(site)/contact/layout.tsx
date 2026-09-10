import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Raste Aur Raahein",
  description:
    "Get in touch with Sumit Singh — collaborations, trip questions, press enquiries, or just to say hello about your next Indian adventure.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Raste Aur Raahein",
    description: "Reach out for collaborations, travel queries, or press enquiries.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
