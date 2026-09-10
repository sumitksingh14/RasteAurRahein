"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, Download, ExternalLink, ChevronDown, Check } from "lucide-react";
import type { Trip } from "@/lib/types";
import {
  extractTripEvents,
  generateICSContent,
  buildGoogleCalendarUrl,
  downloadICSFile,
} from "@/lib/calendarExporter";

interface AddToCalendarButtonProps {
  trip: Trip;
  style?: React.CSSProperties;
}

export default function AddToCalendarButton({ trip, style = {} }: AddToCalendarButtonProps) {
  const [open, setOpen] = useState(false);
  const [icsDownloaded, setIcsDownloaded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const events = extractTripEvents(trip);

  const handleDownloadICS = () => {
    if (events.length === 0) {
      alert("No itinerary days found to add to calendar.");
      return;
    }
    const icsContent = generateICSContent(trip.title, events);
    downloadICSFile(`${trip.slug}-itinerary.ics`, icsContent);
    setIcsDownloaded(true);
    setOpen(false);
    setTimeout(() => setIcsDownloaded(false), 2500);
  };

  const handleGoogleCalendar = () => {
    if (events.length === 0) {
      alert("No itinerary days found to add to calendar.");
      return;
    }
    // Open Google Calendar for Day 1 event (or entire trip overview)
    const url = buildGoogleCalendarUrl(events[0]);
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div ref={menuRef} style={{ position: "relative", display: "inline-block", ...style }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "0.5rem 0.9rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border)",
          background: "var(--bg-card)",
          color: icsDownloaded ? "#10b981" : "var(--text-secondary)",
          fontSize: "0.85rem",
          fontWeight: 500,
          fontFamily: "var(--font-sans)",
          cursor: "pointer",
          transition: "all var(--transition)",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-accent)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--accent-gold)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLButtonElement).style.color = icsDownloaded ? "#10b981" : "var(--text-secondary)";
        }}
      >
        {icsDownloaded ? <Check size={14} color="#10b981" /> : <Calendar size={14} />}
        <span>{icsDownloaded ? "Calendar Exported!" : "Add to Calendar"}</span>
        <ChevronDown size={13} style={{ opacity: 0.6, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            zIndex: 150,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
            padding: "0.4rem",
            minWidth: 220,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <button
            onClick={handleGoogleCalendar}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "0.55rem 0.75rem",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: "transparent",
              color: "var(--text-primary)",
              fontSize: "0.82rem",
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
              textAlign: "left",
              transition: "background var(--transition)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--bg-secondary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ExternalLink size={14} color="var(--accent-gold)" />
              Google Calendar
            </span>
          </button>

          <button
            onClick={handleDownloadICS}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "0.55rem 0.75rem",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: "transparent",
              color: "var(--text-primary)",
              fontSize: "0.82rem",
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
              textAlign: "left",
              transition: "background var(--transition)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--bg-secondary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Download size={14} color="var(--accent-gold)" />
              Apple / Outlook (.ics)
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
