import Link from "next/link";

export default function BrandStorySection() {
  return (
    <section
      style={{
        padding: "1.5rem 1.5rem",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {/* ── Brand Philosophy / Manifesto Card ── */}
      <div
        style={{
          position: "relative",
          background: "#ffffff",
          borderRadius: "1.5rem",
          border: "1px solid #e8e2d5",
          boxShadow: "0 12px 40px rgba(24, 40, 30, 0.06)",
          overflow: "hidden",
        }}
      >
        {/* Top Decorative Terracotta Border Accent */}
        <div
          style={{
            height: "8px",
            width: "100%",
            background: "linear-gradient(to right, #c85a17, #d97706, #065f46)",
          }}
        />

        <div className="brand-story-grid">
          {/* ── Left Column: Rich Editorial Storytelling & Mission ── */}
          <div
            style={{
              padding: "clamp(2rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Eyebrow Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.375rem 0.875rem",
                  borderRadius: "9999px",
                  background: "#f4efe6",
                  border: "1px solid #e8e2d5",
                  marginBottom: "1.5rem",
                }}
              >
                <span style={{ fontSize: "1rem" }}>🧭</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#a34208",
                  }}
                >
                  Brand Story &amp; Mission Statement
                </span>
              </div>

              {/* Main Headline */}
              <h2
                style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: "clamp(1.75rem, 3.2vw, 2.625rem)",
                  lineHeight: 1.2,
                  color: "#18281e",
                  fontWeight: 600,
                  margin: "0 0 1.5rem",
                }}
              >
                Raste Aur Raahein —{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "#c85a17",
                    fontWeight: 400,
                  }}
                >
                  Beyond destinations, into the soul of India.
                </span>
              </h2>

              {/* Core Narrative Paragraphs */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  color: "#68726b",
                  lineHeight: 1.75,
                  fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontStyle: "italic",
                    color: "rgba(24, 40, 30, 0.9)",
                    fontSize: "clamp(1.05rem, 1.35vw, 1.2rem)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Raste Aur Raahein is born from the belief that travel is not about polished
                  itineraries, but about the raw, unfiltered journeys that shape us. India’s roads
                  and pathways carry countless stories — of landscapes that shift with every mile,
                  of people whose warmth defines the journey, and of moments that stay long after
                  the trip ends.
                </p>

                <p style={{ margin: 0 }}>
                  Our mission is simple: to celebrate the spirit of exploration by capturing
                  journeys as they are — imperfect, spontaneous, and deeply human. Whether it’s
                  a dusty trail in Rajasthan, a winding road in the Himalayas, or a bustling street
                  in Kerala, we bring together travelers who seek:
                </p>
              </div>

              {/* Value Pillars / Badges */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "0.75rem",
                  margin: "2rem 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.875rem",
                    borderRadius: "0.75rem",
                    background: "rgba(244, 239, 230, 0.7)",
                    border: "1px solid rgba(232, 226, 213, 0.8)",
                  }}
                >
                  <span
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "0.5rem",
                      background: "rgba(200, 90, 23, 0.1)",
                      color: "#c85a17",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      flexShrink: 0,
                    }}
                  >
                    01
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#68726b",
                        fontWeight: 600,
                      }}
                    >
                      Core Value
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#18281e",
                        fontFamily: "'Source Serif 4', Georgia, serif",
                      }}
                    >
                      Authenticity{" "}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#68726b",
                          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontWeight: 400,
                          display: "block",
                        }}
                      >
                        over luxury
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.875rem",
                    borderRadius: "0.75rem",
                    background: "rgba(244, 239, 230, 0.7)",
                    border: "1px solid rgba(232, 226, 213, 0.8)",
                  }}
                >
                  <span
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "0.5rem",
                      background: "rgba(6, 95, 70, 0.1)",
                      color: "#065f46",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      flexShrink: 0,
                    }}
                  >
                    02
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#68726b",
                        fontWeight: 600,
                      }}
                    >
                      Core Value
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#18281e",
                        fontFamily: "'Source Serif 4', Georgia, serif",
                      }}
                    >
                      Connection{" "}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#68726b",
                          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontWeight: 400,
                          display: "block",
                        }}
                      >
                        over convenience
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.875rem",
                    borderRadius: "0.75rem",
                    background: "rgba(244, 239, 230, 0.7)",
                    border: "1px solid rgba(232, 226, 213, 0.8)",
                  }}
                >
                  <span
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "0.5rem",
                      background: "rgba(146, 64, 14, 0.1)",
                      color: "#92400e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      flexShrink: 0,
                    }}
                  >
                    03
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#68726b",
                        fontWeight: 600,
                      }}
                    >
                      Core Value
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#18281e",
                        fontFamily: "'Source Serif 4', Georgia, serif",
                      }}
                    >
                      Stories{" "}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#68726b",
                          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                          fontWeight: 400,
                          display: "block",
                        }}
                      >
                        over souvenirs
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pull Quote Box */}
              <div
                style={{
                  position: "relative",
                  paddingLeft: "1.5rem",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  paddingRight: "1rem",
                  borderLeft: "4px solid #c85a17",
                  margin: "1.5rem 0",
                  background: "linear-gradient(to right, rgba(255, 247, 237, 0.6), transparent)",
                  borderRadius: "0 0.75rem 0.75rem 0",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                    color: "#18281e",
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  “Raste Aur Raahein is not just about reaching destinations. It’s about embracing the road, honoring the journey, and discovering India in its truest form.”
                </p>
                <div
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#c85a17",
                    textTransform: "uppercase",
                  }}
                >
                  Sumit Singh — &ldquo;Traveller at Heart, IT by Craft&rdquo;
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons & Social Proof */}
            <div
              style={{
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(232, 226, 213, 0.7)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link
                  href="/trips"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    borderRadius: "0.75rem",
                    background: "#c85a17",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(200, 90, 23, 0.25)",
                    transition: "background 0.2s ease",
                  }}
                >
                  <span>Explore Curated Trails</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  href="/about"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    borderRadius: "0.75rem",
                    background: "#fbf9f4",
                    color: "#18281e",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "1px solid #e8e2d5",
                    textDecoration: "none",
                    transition: "background 0.2s ease",
                  }}
                >
                  <span>Meet Sumit Singh</span>
                </Link>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  fontSize: "0.75rem",
                  color: "#68726b",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#c85a17">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Self-funded expeditions</span>
                </div>
                <span style={{ display: "inline-block", width: "4px", height: "4px", borderRadius: "50%", background: "#e8e2d5" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L7 9h3l-4 7h5v4h2v-4h5l-4-7h3L12 2z" />
                  </svg>
                  <span>Leave No Trace pledge</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Visual Storytelling, Imagery & Field Stats ── */}
          <div
            style={{
              background: "#f4efe6",
              borderTop: "1px solid #e8e2d5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "clamp(1.5rem, 3vw, 2rem)",
            }}
            className="brand-story-right-col"
          >
            {/* Image Card with Badge Overlay */}
            <div
              style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ZzQqTUBYv13tYH4mVpuV59NqU5nWQRVtxuwVvz6ocM_ZtENowpcXlgp3oDfeai0z_izRubC9TGcXKDViXtVhPICdFfBxr4NCGvJgowGfPjdg4RnvNp0FpIDm3CoA1jJ_25Qrrm23gTbcn9wfPjzP8ozMZJNu25AbbgKNnwJZgRUUfIRg1nnLBkiKm4NIFKk232PD4WHc6EKj_Ljehlu5pAELUMRN8iI2TG-UpxaamCDjo8J_ySryXQ"
                alt="Spiti Valley road trip winding through mountain pass at sunset"
                style={{
                  width: "100%",
                  height: "20rem",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.7s ease",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                }}
              />

              {/* Badge on Image */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  background: "rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(8px)",
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
                <span>Spiti Valley Circuit, HP</span>
              </div>

              {/* Bottom Caption */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  right: "1rem",
                  color: "#ffffff",
                }}
              >
                <div
                  style={{
                    fontSize: "0.6875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#fde68a",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  Field Note #142
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontStyle: "italic",
                    color: "rgba(255, 255, 255, 0.95)",
                    lineHeight: 1.4,
                  }}
                >
                  “Where the road ends in loose scree, the actual conversation with the Himalayas begins.”
                </p>
              </div>
            </div>

            {/* Micro Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  background: "#ffffff",
                  border: "1px solid #e8e2d5",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    color: "#18281e",
                    lineHeight: 1.1,
                  }}
                >
                  60,000+
                </div>
                <div style={{ fontSize: "0.75rem", color: "#68726b", marginTop: "0.25rem" }}>
                  Kilometers Driven &amp; Trekked
                </div>
                <div style={{ fontSize: "0.6875rem", color: "#c85a17", marginTop: "0.35rem", fontWeight: 600 }}>
                  Across 12+ Indian States
                </div>
              </div>

              <div
                style={{
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  background: "#ffffff",
                  border: "1px solid #e8e2d5",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    color: "#18281e",
                    lineHeight: 1.1,
                  }}
                >
                  100%
                </div>
                <div style={{ fontSize: "0.75rem", color: "#68726b", marginTop: "0.25rem" }}>
                  Field-Tested GPS Tracks
                </div>
                <div style={{ fontSize: "0.6875rem", color: "#047857", marginTop: "0.35rem", fontWeight: 600 }}>
                  Unsponsored &amp; Authentic
                </div>
              </div>
            </div>

            {/* Mini Dispatch Snippet */}
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: "0.75rem",
                background: "#18281e",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#34d399",
                      boxShadow: "0 0 6px rgba(52, 211, 153, 0.7)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#6ee7b7",
                      fontWeight: 700,
                    }}
                  >
                    Active Philosophy
                  </span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)" }}>Est. 2024</span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.75rem",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                We decline paid influencer junkets to protect the integrity of every route rating,
                homestay contact, and mountain trail condition report.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .brand-story-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .brand-story-grid {
            grid-template-columns: 7fr 5fr;
          }
          .brand-story-right-col {
            border-top: none !important;
            border-left: 1px solid #e8e2d5 !important;
          }
        }
      `}</style>
    </section>
  );
}
