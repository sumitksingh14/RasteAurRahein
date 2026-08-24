import sanitizeHtml from "sanitize-html";
import type { ParsedItinerary } from "./types";

// Allowed HTML tags and attributes after sanitization
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "ul", "ol", "li",
    "strong", "em", "b", "i", "u",
    "table", "thead", "tbody", "tr", "th", "td",
    "blockquote", "img", "figure", "figcaption",
    "div", "span", "section", "article",
    "a", "time",
  ],
  allowedAttributes: {
    img: ["src", "alt", "title", "width", "height"],
    a: ["href", "title", "target"],
    "*": ["class", "id", "data-*"],
    time: ["datetime"],
  },
  // Strip all scripts, iframes, event handlers
  disallowedTagsMode: "discard",
};

// Regex patterns for extracting time stamps like "9:00 AM", "14:30", etc.
const TIME_PATTERN = /\b(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)\b/;
// Regex for day headings like "Day 1", "DAY 1:", "Day 1 –", etc.
const DAY_HEADING_PATTERN = /^day\s+(\d+)[:\s\-–]?\s*(.*)/i;

export function sanitizeItineraryHtml(rawHtml: string): string {
  return sanitizeHtml(rawHtml, SANITIZE_OPTIONS);
}

/**
 * Parse a raw HTML itinerary into a structured ParsedItinerary object.
 * Handles common patterns from Google Docs exports, TripIt, and manual HTML.
 */
export function parseItineraryHtml(rawHtml: string): ParsedItinerary {
  const clean = sanitizeItineraryHtml(rawHtml);

  // Use a lightweight DOM-like approach by creating an element with innerHTML
  // This runs server-side using string parsing
  const result: ParsedItinerary = {
    title: "",
    days: [],
    rawHtml: clean,
  };

  // Extract title from first <h1>
  const h1Match = clean.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match) {
    result.title = stripHtmlTags(h1Match[1]);
  }

  // Split content by day headings (h2, h3 that match "Day N" pattern)
  const dayBlocks = splitByDayHeadings(clean);

  if (dayBlocks.length === 0) {
    // No structured days found — return as single raw content block
    result.days = [
      {
        dayNumber: 1,
        title: result.title || "Itinerary",
        activities: parseActivitiesFromBlock(clean),
      },
    ];
  } else {
    result.days = dayBlocks;
  }

  return result;
}

function splitByDayHeadings(html: string): ParsedItinerary["days"] {
  // Match h2 and h3 tags
  const days: ParsedItinerary["days"] = [];

  const parts = html.split(/<h[23][^>]*>/i);
  let dayCounter = 1;

  for (const part of parts) {
    // Use [\s\S] instead of dotAll 's' flag — works with any ES target
    const closingTag = part.match(/^([\s\S]*?)<\/h[23]>/i);
    if (!closingTag) continue;

    const headingText = stripHtmlTags(closingTag[1]);
    const dayMatch = headingText.match(DAY_HEADING_PATTERN);

    if (dayMatch) {
      const dayNumber = parseInt(dayMatch[1], 10);
      const dayTitle = dayMatch[2]?.trim() || `Day ${dayNumber}`;
      const bodyAfterHeading = part.slice(closingTag[0].length);

      days.push({
        dayNumber: isNaN(dayNumber) ? dayCounter++ : dayNumber,
        title: dayTitle || `Day ${dayNumber}`,
        activities: parseActivitiesFromBlock(bodyAfterHeading),
      });
    }
  }

  return days;
}

function parseActivitiesFromBlock(
  html: string
): ParsedItinerary["days"][0]["activities"] {
  const activities: ParsedItinerary["days"][0]["activities"] = [];

  // Extract list items ([\s\S] spans newlines without needing ES2018 's' flag)
  const listItems = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];

  for (const item of listItems) {
    const text = stripHtmlTags(item[1]).trim();
    if (!text) continue;

    const timeMatch = text.match(TIME_PATTERN);
    const time = timeMatch ? timeMatch[1] : undefined;
    const title = time
      ? text.replace(TIME_PATTERN, "").trim().replace(/^[-\u2013:]\s*/, "")
      : text;

    const noteMatch = item[1].match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);
    const notes = noteMatch ? stripHtmlTags(noteMatch[1]) : undefined;

    if (title) {
      activities.push({ time, title: title.slice(0, 150), notes });
    }
  }

  // Fallback: extract from paragraphs
  if (activities.length === 0) {
    const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
    for (const para of paragraphs) {
      const text = stripHtmlTags(para[1]).trim();
      if (!text || text.length < 5) continue;

      const timeMatch = text.match(TIME_PATTERN);
      const time = timeMatch ? timeMatch[1] : undefined;
      const title = time
        ? text.replace(TIME_PATTERN, "").trim().replace(/^[-\u2013:]\s*/, "")
        : text;

      if (title) {
        activities.push({ time, title: title.slice(0, 150) });
      }
    }
  }

  // Fallback: extract from table rows
  if (activities.length === 0) {
    const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
    for (const row of rows) {
      const cells = [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)];
      if (cells.length >= 2) {
        const time = stripHtmlTags(cells[0][1]).trim();
        const title = stripHtmlTags(cells[1][1]).trim();
        const notes = cells[2] ? stripHtmlTags(cells[2][1]).trim() : undefined;
        if (title) {
          activities.push({ time, title, notes });
        }
      }
    }
  }

  return activities;
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
}
