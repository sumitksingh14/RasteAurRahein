import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Map, FileCheck, Users } from "lucide-react";
import { getSession } from "@/lib/session";
import SubmitTripForm from "@/components/ui/SubmitTripForm";
import LoginPrompt from "@/components/ui/LoginPrompt";

export const metadata: Metadata = {
  title: "Submit Your Route — Raste Aur Raahein",
  description: "Share your India road trip, trek, or travel route with the Raste Aur Raahein community. Upload your GPX track and help fellow travellers discover hidden gems.",
};

export default async function SubmitTripPage() {
  const session = await getSession();

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0d1f0e 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "3.5rem 0 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 40%, rgba(0,108,228,0.12) 0%, transparent 55%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <Link
            href="/trips"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginBottom: "1.5rem", textDecoration: "none" }}
          >
            <ArrowLeft size={13} /> Back to Trips
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "1rem",
              maxWidth: 680,
            }}
          >
            Submit Your Route
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 560, marginBottom: "2rem" }}>
            Been somewhere unforgettable? Share your route with the community. Once reviewed and approved, your trip will appear in our catalog and inspire thousands of fellow travellers.
          </p>

          {/* How it works */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { icon: <FileCheck size={18} />, label: "Fill the form", desc: "Share your route details, tips, and GPX track" },
              { icon: <Users size={18} />, label: "Expert review", desc: "Our team reviews within 48 hours" },
              { icon: <Map size={18} />, label: "Published!", desc: "Your trip goes live for the community" },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem 1.25rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "var(--radius-md)",
                  maxWidth: 220,
                }}
              >
                <div style={{ color: "#FEBB02", flexShrink: 0, marginTop: 2 }}>{step.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: "2px" }}>{step.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form area */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 740 }}>
        {!session ? (
          <LoginPrompt message="You need to be signed in to submit a route." />
        ) : (
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "var(--radius-lg)",
              padding: "2.5rem",
            }}
          >
            <SubmitTripForm />
          </div>
        )}
      </div>
    </div>
  );
}
