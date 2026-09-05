"use client";

import { useState } from "react";
import { Send, Mail, AtSign, Globe, CheckCircle, AlertCircle } from "lucide-react";

// ─── WhatsApp SVG Icon ──────────────────────────────────────────────────────
function WhatsAppIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "919619191109";

// ─── Middle-asterisk masking ────────────────────────────────────────────────
function maskValue(value: string): string {
  const MASK = "••••••••";
  // Email  e.g. zsumitksingh@gmail.com → zsum••••••••@gmail.com
  if (!value.startsWith("@") && value.includes("@") && value.includes(".")) {
    const atIdx = value.indexOf("@");
    const local = value.slice(0, atIdx);
    const domain = value.slice(atIdx); // includes @
    const show = Math.max(3, Math.floor(local.length * 0.4));
    return local.slice(0, show) + MASK + domain;
  }
  // Phone  e.g. +91 96191 91109 → +91 961••••••09
  if (value.startsWith("+") || /^[0-9 ()-+]+$/.test(value)) {
    const digits = value.replace(/\s/g, "");
    const showStart = Math.min(7, Math.floor(digits.length * 0.45));
    const showEnd = 2;
    return digits.slice(0, showStart) + MASK + digits.slice(-showEnd);
  }
  // Social handle  e.g. @the_unpredictable_sum_1 → @the_un••••••••_1
  if (value.startsWith("@")) {
    const handle = value.slice(1);
    const showStart = Math.max(3, Math.floor(handle.length * 0.28));
    const showEnd = Math.max(1, Math.floor(handle.length * 0.1));
    return "@" + handle.slice(0, showStart) + MASK + handle.slice(-showEnd);
  }
  // Fallback: show first 3 + mask + last 2
  if (value.length <= 6) return value;
  return value.slice(0, 3) + MASK + value.slice(-2);
}

function buildWhatsAppUrl(form: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const subjectLabel = form.subject
    ? form.subject.charAt(0).toUpperCase() + form.subject.slice(1)
    : "General Inquiry";

  const template = [
    `Hi! 👋 I'm reaching out via your travel blog *RasteAurRahein*.`,
    ``,
    `*Name:* ${form.name}`,
    `*Email:* ${form.email}`,
    `*Topic:* ${subjectLabel}`,
    ``,
    `*Message:*`,
    form.message,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(template)}`;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [whatsappSent, setWhatsappSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    form.name.trim() !== "" && form.email.trim() !== "" && form.message.trim() !== "";

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setEmailStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEmailStatus(res.ok ? "success" : "error");
    } catch {
      setEmailStatus("error");
    }
  };

  const handleWhatsApp = () => {
    if (!isFormValid) return;
    window.open(buildWhatsAppUrl(form), "_blank", "noopener,noreferrer");
    setWhatsappSent(true);
  };

  const handleReset = () => {
    setEmailStatus("idle");
    setWhatsappSent(false);
    setForm({ name: "", email: "", subject: "", message: "" });
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

  const isSuccess = emailStatus === "success" || whatsappSent;

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
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
            Travel collaborations, itinerary consultations, photography projects, or just to say
            hello — I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "4rem",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {/* Form */}
          <div>
            {isSuccess ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  border: "1px solid var(--border-accent)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--accent-gold-dim)",
                }}
              >
                <CheckCircle size={48} style={{ color: "var(--accent-gold)", margin: "0 auto 1rem" }} />
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {emailStatus === "success" ? "Email Sent!" : "WhatsApp Opened!"}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  {emailStatus === "success"
                    ? "Thanks for reaching out. I'll get back to you within 48 hours."
                    : "Your message has been pre-filled in WhatsApp. Just hit Send there to deliver it!"}
                </p>
                <button onClick={handleReset} className="btn btn-outline" style={{ marginTop: "1.5rem" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleEmailSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
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

                {emailStatus === "error" && (
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
                    Something went wrong. Please try again or reach out via WhatsApp.
                  </div>
                )}

                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                  Choose how you&apos;d like to send your message:
                </p>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {/* Email button */}
                  <button
                    type="submit"
                    id="contact-submit-email-btn"
                    disabled={emailStatus === "sending" || !isFormValid}
                    className="btn btn-primary"
                    style={{
                      flex: "1 1 auto",
                      justifyContent: "center",
                      opacity: emailStatus === "sending" || !isFormValid ? 0.6 : 1,
                      cursor: emailStatus === "sending" || !isFormValid ? "not-allowed" : "pointer",
                      minWidth: 140,
                    }}
                  >
                    <Send size={15} />
                    {emailStatus === "sending" ? "Sending…" : "Send via Email"}
                  </button>

                  {/* WhatsApp button */}
                  <button
                    type="button"
                    id="contact-whatsapp-btn"
                    disabled={!isFormValid}
                    onClick={handleWhatsApp}
                    style={{
                      flex: "1 1 auto",
                      minWidth: 158,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.65rem 1.25rem",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      background: isFormValid
                        ? "linear-gradient(135deg, #25d366 0%, #128c7e 100%)"
                        : "rgba(128,128,128,0.3)",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      cursor: isFormValid ? "pointer" : "not-allowed",
                      opacity: isFormValid ? 1 : 0.55,
                      transition: "filter 0.2s ease, transform 0.15s ease",
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) => {
                      if (isFormValid) {
                        (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.1)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter = "";
                      (e.currentTarget as HTMLButtonElement).style.transform = "";
                    }}
                  >
                    <WhatsAppIcon size={17} />
                    Send via WhatsApp
                  </button>
                </div>

                {!isFormValid && (
                  <p style={{ fontSize: "0.76rem", color: "var(--text-muted)", margin: 0, fontStyle: "italic" }}>
                    Fill in Name, Email and Message to enable sending.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Contact Info sidebar */}
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
                icon: <Mail size={17} />,
                label: "Email",
                value: "zsumitksingh@gmail.com",
                href: "mailto:zsumitksingh@gmail.com",
                accentColor: "var(--accent-gold)",
                accentBg: "var(--accent-gold-dim)",
                accentBorder: "var(--border-accent)",
              },
              {
                icon: <AtSign size={17} />,
                label: "Instagram",
                value: "@the_unpredictable_sum_1",
                href: "https://instagram.com/the_unpredictable_sum_1",
                accentColor: "var(--accent-gold)",
                accentBg: "var(--accent-gold-dim)",
                accentBorder: "var(--border-accent)",
              },
              {
                icon: <Globe size={17} />,
                label: "Twitter / X",
                value: "@SumitKumarouip",
                href: "https://twitter.com/SumitKumarouip",
                accentColor: "var(--accent-gold)",
                accentBg: "var(--accent-gold-dim)",
                accentBorder: "var(--border-accent)",
              },
              {
                icon: <WhatsAppIcon size={18} />,
                label: "WhatsApp",
                value: "+91 96191 91109",
                href: `https://wa.me/${WHATSAPP_NUMBER}`,
                accentColor: "#25d366",
                accentBg: "rgba(37,211,102,0.1)",
                accentBorder: "rgba(37,211,102,0.35)",
              },
            ].map(({ icon, label, value, href, accentColor, accentBg, accentBorder }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                title={`Open ${label}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${accentBorder}`,
                  background: accentBg,
                  marginBottom: "0.75rem",
                  transition: "opacity var(--transition)",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.82"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                {/* Icon badge */}
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: accentBg,
                    border: `1px solid ${accentBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: accentColor,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </span>

                {/* Label + masked value */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "2px" }}>
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {maskValue(value)}
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
                <strong style={{ color: "var(--accent-gold)" }}>Response time:</strong> I typically
                reply within 24–48 hours. For urgent inquiries, WhatsApp is fastest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
