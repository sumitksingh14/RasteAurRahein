"use client";

import { useState } from "react";
import { MessageCircle, Mail, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import type { Trip } from "@/lib/types";
import PDFDownloadButton from "@/components/ui/PDFDownloadButton";

interface TripCTABlockProps {
  trip: Trip;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function TripCTABlock({ trip }: TripCTABlockProps) {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const waMessage = encodeURIComponent(
    `Hi! I found your guide "${trip.title}" on Raste Aur Raahein and would love help planning this trip. Could you help me customise it?`
  );
  const waUrl = `https://wa.me/919619191109?text=${waMessage}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setFormState("submitting");
    setErrorMsg("");
    const savedEmail = email.trim();
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: savedEmail,
          message: message.trim(),
          tripTitle: trip.title,
          tripSlug: trip.slug,
        }),
      });
      if (res.ok) {
        setFormState("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        const d = await res.json().catch(() => ({}));
        setErrorMsg(d.error || "Something went wrong. Please try again.");
        setFormState("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.85rem",
    background: "var(--bg-primary)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    fontSize: "0.875rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color var(--transition)",
    boxSizing: "border-box",
  };

  return (
    <section
      aria-label="Plan this trip with us"
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-accent)",
        background:
          "linear-gradient(135deg, rgba(201,168,76,0.05) 0%, var(--bg-card) 60%)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "1.75rem 2rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{
          fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.12em", color: "var(--accent-gold)", marginBottom: "0.5rem",
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <Sparkles size={11} />
          Custom Planning
        </div>
        <h2 style={{
          fontFamily: "var(--font-serif)", fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
          color: "var(--text-primary)", margin: "0 0 0.5rem", lineHeight: 1.25,
        }}>
          Want this planned for you?
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
          I&apos;ll help you customise dates, accommodation, budget, and permits — based on real experience on this route.
        </p>
      </div>

      {/* Three CTA options */}
      <div style={{
        padding: "1.5rem 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
        gap: "1rem",
      }}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="cta-whatsapp-btn"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
            padding: "0.8rem 1.25rem",
            background: "linear-gradient(135deg, #25d366 0%, #1da851 100%)",
            borderRadius: "var(--radius-md)", textDecoration: "none", color: "#fff",
            fontWeight: 700, fontSize: "0.875rem", fontFamily: "var(--font-sans)",
            transition: "opacity var(--transition), transform var(--transition)",
            boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <MessageCircle size={17} />
          Chat on WhatsApp
        </a>

        <PDFDownloadButton trip={trip} />

        <button
          id="cta-enquiry-toggle-btn"
          onClick={() => { setExpanded((e) => !e); setFormState("idle"); }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
            padding: "0.8rem 1.25rem", borderRadius: "var(--radius-md)",
            border: `1px solid ${expanded ? "var(--border-accent)" : "var(--border)"}`,
            background: expanded ? "var(--accent-gold-dim)" : "var(--bg-secondary)",
            color: expanded ? "var(--accent-gold)" : "var(--text-secondary)",
            fontWeight: 600, fontSize: "0.875rem", fontFamily: "var(--font-sans)",
            cursor: "pointer", transition: "all var(--transition)",
          }}
        >
          <Mail size={16} />
          Request Custom Trip
        </button>
      </div>

      {/* Inline lead form */}
      {expanded && (
        <div style={{ padding: "0 2rem 2rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
          {formState === "success" ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "2rem", textAlign: "center" }}>
              <CheckCircle size={40} color="#16a34a" />
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", margin: 0, color: "var(--text-primary)" }}>
                Enquiry sent!
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0, lineHeight: 1.6 }}>
                I&apos;ll get back to you within 24–48 hours.
                For a faster response, <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-gold)" }}>WhatsApp me directly</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div>
                  <label htmlFor="cta-name" style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>Your Name</label>
                  <input id="cta-name" type="text" required placeholder="Ravi Shankar" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>
                <div>
                  <label htmlFor="cta-email" style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>Email Address</label>
                  <input id="cta-email" type="email" required placeholder="you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="cta-message" style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>Your Plans & Questions</label>
                <textarea id="cta-message" required rows={4}
                  placeholder={`e.g. "We are 2 people planning ${trip.title} in October. Need help with accommodation, permits and a rough budget."`}
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 96 }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
              </div>

              {formState === "error" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1rem", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: "var(--radius-sm)", color: "#dc2626", fontSize: "0.82rem", marginBottom: "0.75rem" }}>
                  <AlertCircle size={14} />
                  {errorMsg}
                </div>
              )}

              <button type="submit" id="cta-submit-btn" disabled={formState === "submitting"} style={{
                width: "100%", padding: "0.85rem",
                background: formState === "submitting" ? "var(--text-muted)" : "linear-gradient(135deg, var(--accent-gold) 0%, #e8c878 100%)",
                color: "#0a0a0f", borderRadius: "var(--radius-md)", border: "none",
                fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-sans)",
                cursor: formState === "submitting" ? "default" : "pointer",
                opacity: formState === "submitting" ? 0.7 : 1, transition: "opacity var(--transition)",
              }}>
                {formState === "submitting" ? "Sending…" : "Send My Trip Request"}
              </button>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.75rem", lineHeight: 1.5 }}>
                No spam. Your details are only used to respond to your enquiry.
              </p>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
