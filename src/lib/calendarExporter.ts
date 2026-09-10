import type { Trip, ItineraryDay } from "./types";

export interface CalendarEvent {
  title: string;
  description: string;
  location?: string;
  startDate: Date;
  endDate: Date;
}

function padZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDateToICS(date: Date): string {
  return (
    date.getUTCFullYear() +
    padZero(date.getUTCMonth() + 1) +
    padZero(date.getUTCDate()) +
    "T" +
    padZero(date.getUTCHours()) +
    padZero(date.getUTCMinutes()) +
    padZero(date.getUTCSeconds()) +
    "Z"
  );
}

function escapeICS(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function extractTripEvents(trip: Trip, baseStartDate?: Date): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  if (!trip.itinerary || trip.itinerary.length === 0) return events;

  // Determine starting date: use trip.startDate, or baseStartDate, or tomorrow
  let tripStart: Date;
  if (trip.startDate) {
    tripStart = new Date(trip.startDate);
  } else if (baseStartDate) {
    tripStart = new Date(baseStartDate);
  } else {
    tripStart = new Date();
    tripStart.setDate(tripStart.getDate() + 1);
    tripStart.setHours(9, 0, 0, 0);
  }

  trip.itinerary.forEach((day: ItineraryDay, index: number) => {
    const dayDate = new Date(tripStart);
    dayDate.setDate(tripStart.getDate() + index);

    // If day has activities, create events for them or a summary day event
    const activitiesList = day.activities
      ?.map((a) => `• ${a.time ? `[${a.time}] ` : ""}${a.title}${a.notes ? ` (${a.notes})` : ""}`)
      .join("\n") || "";

    const desc = `${day.summary ? `${day.summary}\n\n` : ""}Activities:\n${activitiesList}\n\nCurated by Raste Aur Raahein`;

    const dayStart = new Date(dayDate);
    dayStart.setHours(9, 0, 0, 0);
    const dayEnd = new Date(dayDate);
    dayEnd.setHours(19, 0, 0, 0);

    events.push({
      title: `Day ${day.dayNumber}: ${day.title} (${trip.title})`,
      description: desc,
      location: day.activities?.[0]?.location?.name || trip.country || "India",
      startDate: dayStart,
      endDate: dayEnd,
    });
  });

  return events;
}

/**
 * Generates an iCalendar (.ics) RFC 5545 string
 */
export function generateICSContent(tripTitle: string, events: CalendarEvent[]): string {
  const nowStr = formatDateToICS(new Date());

  let ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Raste Aur Raahein//Travel Itinerary//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:${escapeICS(tripTitle)}\r\n`;

  events.forEach((ev, idx) => {
    const uid = `rar-${Date.now()}-${idx}@rasteaurraahein.com`;
    ics += `BEGIN:VEVENT\r\n`;
    ics += `UID:${uid}\r\n`;
    ics += `DTSTAMP:${nowStr}\r\n`;
    ics += `DTSTART:${formatDateToICS(ev.startDate)}\r\n`;
    ics += `DTEND:${formatDateToICS(ev.endDate)}\r\n`;
    ics += `SUMMARY:${escapeICS(ev.title)}\r\n`;
    ics += `DESCRIPTION:${escapeICS(ev.description)}\r\n`;
    if (ev.location) {
      ics += `LOCATION:${escapeICS(ev.location)}\r\n`;
    }
    ics += `STATUS:CONFIRMED\r\n`;
    ics += `END:VEVENT\r\n`;
  });

  ics += `END:VCALENDAR\r\n`;
  return ics;
}

/**
 * Generates direct Google Calendar Web URL for the first day or whole trip
 */
export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const startStr = formatDateToICS(event.startDate);
  const endStr = formatDateToICS(event.endDate);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${startStr}/${endStr}`,
    details: event.description,
  });

  if (event.location) {
    params.set("location", event.location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Trigger client-side download of the .ics file
 */
export function downloadICSFile(filename: string, icsContent: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
