"use client";

import { useState } from "react";
import { Download, Check, MapPin, Mail, User, Printer } from "lucide-react";
import type { Trip } from "@/lib/types";
import { extractTripWaypoints, generateGPXContent, downloadGPXFile } from "@/lib/gpxExporter";
import { trackEmailSignup, trackGpxDownload } from "@/lib/analytics";

interface TripLeadCaptureProps {
  trip: Trip;
}

export default function TripLeadCapture({ trip }: TripLeadCaptureProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [routeReportOptIn, setRouteReportOptIn] = useState(false);
  const [optInConfirmed, setOptInConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: `gpx-${trip.slug}`,
          subscribeRouteReport: routeReportOptIn,
        }),
      });

      if (!res.ok) {
        throw new Error("Could not process signup. Please try again.");
      }

      setStatus("success");

      // Track email signup and GPX download in GA4
      trackEmailSignup("article_gpx", {
        trip_slug: trip.slug,
        route_report_optin: routeReportOptIn,
      });
      trackGpxDownload(trip.slug, trip.title);

      // Automatically trigger the GPX download upon successful submission
      const waypoints = extractTripWaypoints(trip);
      if (waypoints.length > 0) {
        const gpx = generateGPXContent(trip.title, waypoints);
        downloadGPXFile(`${trip.slug}-route.gpx`, gpx);
      }
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  const handleDownloadAgain = () => {
    trackGpxDownload(trip.slug, trip.title);
    const waypoints = extractTripWaypoints(trip);
    if (waypoints.length > 0) {
      const gpx = generateGPXContent(trip.title, waypoints);
      downloadGPXFile(`${trip.slug}-route.gpx`, gpx);
    }
  };

  const handlePrintPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleOptInChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setRouteReportOptIn(checked);
    if (checked) {
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            source: `route-report-optin-${trip.slug}`,
            subscribeRouteReport: true,
          }),
        });
        setOptInConfirmed(true);
      } catch {
        // silent fallback
      }
    }
  };

  return (
    <div
      className="trip-lead-capture-box"
      style={{
        margin: "2.5rem 0",
        padding: "1.75rem",
        borderRadius: "0.875rem",
        background: "linear-gradient(135deg, #1e1b4b 0%, #1e1b4b 50%, #312e81 100%)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <MapPin size={18} color="#fde68a" />
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#fde68a",
          }}
        >
          Overland Telemetry Asset
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-serif, Georgia, serif)",
          fontSize: "1.375rem",
          fontWeight: 700,
          margin: "0 0 0.5rem",
          color: "#fff",
        }}
      >
        Get the GPX track + offline route PDF — free
      </h3>

      <p
        style={{
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.8)",
          margin: "0 0 1.25rem",
          lineHeight: 1.6,
        }}
      >
        Download verified GPS waypoints and offline field guides for <strong>{trip.title}</strong>, compatible with Garmin, Strava, Gaia GPS, and OsmAnd.
      </p>

      {status === "success" ? (
        <div style={{ background: "rgba(255,255,255,0.08)", padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.75rem" }}>
            <Check size={18} />
            Your GPX track is downloading!
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
            <button
              onClick={handleDownloadAgain}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                background: "#fde68a",
                color: "#1e1b4b",
                fontWeight: 700,
                fontSize: "0.8125rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Download size={14} /> Download Track (.GPX)
            </button>

            <button
              onClick={handlePrintPDF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.8125rem",
                border: "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
              }}
            >
              <Printer size={14} /> Save / Print Route PDF
            </button>
          </div>

          {/* Monthly Route Report opt-in (NOT pre-checked) */}
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.9)",
              cursor: "pointer",
              marginTop: "0.75rem",
            }}
          >
            <input
              type="checkbox"
              checked={routeReportOptIn}
              onChange={handleOptInChange}
              style={{ marginTop: "0.15rem" }}
            />
            <span>
              Also subscribe to our monthly <strong>Route Report</strong> (Himalayan pass openings, seasonal monsoon advisories, and unsponsored field notes).
              {optInConfirmed && <span style={{ color: "#34d399", marginLeft: "0.5rem" }}>✓ Subscribed</span>}
            </span>
          </label>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
            <div style={{ position: "relative" }}>
              <User
                size={14}
                style={{
                  position: "absolute",
                  left: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.4)",
                }}
              />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.85rem 0.625rem 2.25rem",
                  borderRadius: "0.375rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ position: "relative" }}>
              <Mail
                size={14}
                style={{
                  position: "absolute",
                  left: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.4)",
                }}
              />
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.85rem 0.625rem 2.25rem",
                  borderRadius: "0.375rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "0.375rem",
                background: "#fde68a",
                color: "#1e1b4b",
                fontWeight: 700,
                fontSize: "0.875rem",
                border: "none",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                transition: "opacity 0.2s",
              }}
            >
              <Download size={15} />
              {status === "loading" ? "Generating GPX..." : "Get Free GPX Track"}
            </button>

            {/* Privacy note */}
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>
              🔒 Zero spam. Used exclusively to send route files &amp; safety advisories.
            </span>
          </div>

          {status === "error" && (
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.8125rem", color: "#f87171" }}>
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
