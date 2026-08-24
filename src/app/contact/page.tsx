"use client";

import { useState } from "react";
import { Send, Mail, AtSign, Globe, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color var(--transition)",
  } as React.CSSProperties;

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    color: "var(--text-muted)",
    marginBottom: "0.5rem",
  };

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          padding: "5rem 0 3rem",
          background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: 700 }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-gold)",
              marginBottom: "0.75rem",
            }}
          >
            ✦ Get in Touch
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
              marginBottom: "1rem",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            Let&apos;s Connect
          </h1>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "1rem" }}>
            Travel collaborations, itinerary consultations, photography projects, or just to say hello — I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "4rem",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {/* Form */}
          <div>
            {status === "success" ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  border: "1px solid var(--border-accent)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--accent-gold-dim)",
                }}
              >
                <CheckCircle
                  size={48}
                  style={{ color: "var(--accent-gold)", margin: "0 auto 1rem" }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Thanks for reaching out. I&apos;ll get back to you within 48 hours.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="btn btn-outline"
                  style={{ marginTop: "1.5rem" }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label htmlFor="contact-name" style={labelStyle}>Your Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Sumit Singh"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" style={labelStyle}>Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" style={labelStyle}>Subject</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">Select a topic…</option>
                    <option value="collaboration">Travel Collaboration</option>
                    <option value="itinerary">Itinerary Consultation</option>
                    <option value="photography">Photography Project</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" style={labelStyle}>Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me what you have in mind…"
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {status === "error" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(232, 133, 125, 0.1)",
                      border: "1px solid rgba(232, 133, 125, 0.3)",
                      color: "var(--accent-rose)",
                      fontSize: "0.875rem",
                    }}
                  >
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or email directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary"
                  id="contact-submit-btn"
                  style={{
                    justifyContent: "center",
                    opacity: status === "sending" ? 0.7 : 1,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                  }}
                >
                  <Send size={15} />
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
                fontSize: "1.5rem",
              }}
            >
              Other Ways to Reach Me
            </h3>

            {[
              {
                Icon: Mail,
                label: "Email",
                value: "hello@wanderlustchronicles.com",
                href: "mailto:hello@wanderlustchronicles.com",
              },
              {
                Icon: AtSign,
                label: "Instagram",
                value: "@wanderlust.chronicles",
                href: "https://instagram.com",
              },
              {
                Icon: Globe,
                label: "Twitter / X",
                value: "@sumitsingh",
                href: "https://twitter.com",
              },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  marginBottom: "0.75rem",
                  transition: "all var(--transition)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.background = "var(--bg-card-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--bg-card)";
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--accent-gold-dim)",
                    border: "1px solid var(--border-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={17} />
                </span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "2px" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                    {value}
                  </div>
                </div>
              </a>
            ))}

            <div
              style={{
                marginTop: "2rem",
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                background: "var(--accent-gold-dim)",
                border: "1px solid var(--border-accent)",
              }}
            >
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                <strong style={{ color: "var(--accent-gold)" }}>Response time:</strong> I typically reply within 24–48 hours. For urgent inquiries, Instagram DMs are fastest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
