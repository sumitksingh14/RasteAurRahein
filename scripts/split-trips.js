#!/usr/bin/env node
/**
 * split-trips.js — Splits the monolithic trips.ts into per-region files.
 * Uses the `_id` suffix (after "trip-") as the key, since that's what's in the file.
 * Run from repo root: node scripts/split-trips.js
 */

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "../src/lib/data/trips.ts");
const OUT_DIR = path.join(__dirname, "../src/lib/data/trips");

// Keys are the _id suffix (after "trip-")
const REGION_MAP = {
  // Himalayas & North (32)
  "leh-ladakh-9-days": "himalayas",
  "spiti-valley": "himalayas",
  "munsiyari-6-days": "himalayas",
  "char-dham-yatra": "himalayas",
  "panch-kedar-trek": "himalayas",
  "haridwar-rishikesh-3-days": "himalayas",
  "nainital-jim-corbett-3-days": "himalayas",
  "himachal-5-days": "himalayas",
  "jammu-kashmir-5-days": "himalayas",
  "auli-nearby-3-days": "himalayas",
  "chitkul-5-days": "himalayas",
  "kalpa-5-days": "himalayas",
  "tirthan-valley-6-days": "himalayas",
  "malana-4-days": "himalayas",
  "barot-valley-4-days": "himalayas",
  "rakchham-5-days": "himalayas",
  "nako-6-days": "himalayas",
  "pangi-valley-6-days": "himalayas",
  "tosh-3-days": "himalayas",
  "sach-pass-5-days": "himalayas",
  "chopta-4-days": "himalayas",
  "khaliya-top-5-days": "himalayas",
  "chakrata-4-days": "himalayas",
  "kanatal-4-days": "himalayas",
  "chaukori-5-days": "himalayas",
  "gurez-valley-5-days": "himalayas",
  "aru-valley-4-days": "himalayas",
  "yusmarg-4-days": "himalayas",
  "turtuk-5-days": "himalayas",
  "basgo-4-days": "himalayas",
  "chumathang-4-days": "himalayas",
  "hanle-5-days": "himalayas",
  // Northeast India (17)
  "sikkim-7-days": "northeast",
  "meghalaya-5-days": "northeast",
  "mawlynnong-meghalaya": "northeast",
  "nongriat-root-bridge": "northeast",
  "dawki-river": "northeast",
  "mawsynram-meghalaya": "northeast",
  "majuli-island": "northeast",
  "khonoma-nagaland": "northeast",
  "dzukou-valley": "northeast",
  "ziro-valley": "northeast",
  "namdapha-arunachal": "northeast",
  "bomdila-monastery": "northeast",
  "ukhrul-manipur": "northeast",
  "loktak-lake-manipur": "northeast",
  "reiek-mizoram": "northeast",
  "vantawng-falls-mizoram": "northeast",
  "unakoti-tripura": "northeast",
  // Coastal India & Islands (12)
  "goa": "coastal",
  "pune-konkan-raigad": "coastal",
  "velas-turtle-festival": "coastal",
  "tarkarli-sindhudurg": "coastal",
  "panhala-kolhapur": "coastal",
  "amboli-sahyadri": "coastal",
  "toranmal-satpura": "coastal",
  "chorla-ghat-western-ghats": "coastal",
  "cotigao-wildlife-sanctuary": "coastal",
  "gorakhgad-trek": "coastal",
  "neil-island-6-days": "coastal",
  "diglipur-7-days": "coastal",
  // Central India (10)
  "orchha-bundelkhand": "central-india",
  "mandu-afghan-ruins": "central-india",
  "chitrakoot-ramayana": "central-india",
  "bhimbetka-prehistoric": "central-india",
  "amarkantak-narmada": "central-india",
  "patalkot-valley": "central-india",
  "panna-tigers": "central-india",
  "tirathgarh-bastar": "central-india",
  "chitrakoot-falls-cg": "central-india",
  "bastar-tribal-haats": "central-india",
  // South India (2)
  "mysore-coorg-wayanad-ooty": "south-india",
  "kerala-7-days": "south-india",
  // Rajasthan & West (14)
  "rajasthan": "rajasthan",
  "agra-mathura-3-days": "rajasthan",
  "jyotirlinga-pilgrimage": "rajasthan",
  "kuldhara-4-days": "rajasthan",
  "narlai-4-days": "rajasthan",
  "khimsar-4-days": "rajasthan",
  "bhangarh-4-days": "rajasthan",
  "bishnoi-villages-3-days": "rajasthan",
  "dholavira-4-days": "rajasthan",
  "mandvi-4-days": "rajasthan",
  "poshina-3-days": "rajasthan",
  "champaner-pavagadh-3-days": "rajasthan",
  "palitana-3-days": "rajasthan",
  "varanasi-ayodhya-prayagraj-5-days": "rajasthan",
};

const REGION_EXPORT_NAME = {
  himalayas: "HIMALAYA_TRIPS",
  northeast: "NORTHEAST_TRIPS",
  coastal: "COASTAL_TRIPS",
  "central-india": "CENTRAL_INDIA_TRIPS",
  "south-india": "SOUTH_INDIA_TRIPS",
  rajasthan: "RAJASTHAN_TRIPS",
};

const REGION_COMMENT = {
  himalayas: "Himalayas & North India — HP, Ladakh, Spiti, Kinnaur, Uttarakhand, J&K, Kashmir",
  northeast: "Northeast India — Meghalaya, Sikkim, Nagaland, Assam, Manipur, Mizoram, Tripura, Arunachal Pradesh",
  coastal: "Coastal India & Islands — Konkan, Goa, Andamans, Western Ghats",
  "central-india": "Central India — Madhya Pradesh & Chhattisgarh",
  "south-india": "South India — Kerala, Karnataka, Tamil Nadu",
  rajasthan: "Rajasthan & West India — Rajasthan, Gujarat, UP Heritage, Sacred Ganga Belt",
};

// ── Parse trips.ts ───────────────────────────────────────────────────────────
const content = fs.readFileSync(SRC, "utf8");
const lines = content.split("\n");

const tripBoundaries = [];
for (let i = 0; i < lines.length; i++) {
  // Match lines like:    _id: "trip-foo"  OR    "_id": "trip-foo"
  const m = lines[i].match(/^    (?:_id|"_id"): "trip-([^"]+)"/);
  if (m) {
    let openBrace = i - 1;
    // Walk back to the opening { of this trip object
    while (openBrace >= 0 && !lines[openBrace].match(/^\s*\{\s*$/)) {
      openBrace--;
      if (i - openBrace > 5) break;
    }
    tripBoundaries.push({ openLine: openBrace, idSuffix: m[1] });
  }
}

function findTripEnd(idx) {
  if (idx + 1 < tripBoundaries.length) {
    return tripBoundaries[idx + 1].openLine - 1;
  }
  // Last trip — scan backward for closing },
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].match(/^\s*\},?\s*$/)) return i;
  }
  return lines.length - 2;
}

const trips = tripBoundaries.map((b, idx) => ({
  idSuffix: b.idSuffix,
  lines: lines.slice(b.openLine, findTripEnd(idx) + 1),
}));

console.log(`Extracted ${trips.length} trips`);

// ── Normalize JSON-key style ("key":) to TS style (key:) ────────────────────
function normalize(tripLines) {
  return tripLines.map((line) =>
    line.replace(/^(\s+)"([a-zA-Z_][a-zA-Z0-9_]*)"\s*:/g, "$1$2:")
  );
}

// ── Group by region ──────────────────────────────────────────────────────────
const regionTrips = {};
for (const region of Object.keys(REGION_EXPORT_NAME)) regionTrips[region] = [];

const unassigned = [];
for (const trip of trips) {
  const region = REGION_MAP[trip.idSuffix];
  if (!region) { unassigned.push(trip.idSuffix); continue; }
  regionTrips[region].push(normalize(trip.lines));
}

if (unassigned.length > 0) console.warn("⚠️  Unassigned:", unassigned);

// ── Write region files ────────────────────────────────────────────────────────
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const region of Object.keys(REGION_EXPORT_NAME)) {
  const exportName = REGION_EXPORT_NAME[region];
  const tripsArr = regionTrips[region];
  const comment = REGION_COMMENT[region];

  const header = [
    `import type { Trip } from "@/lib/types";`,
    ``,
    `/**`,
    ` * ${comment}`,
    ` * ${tripsArr.length} trip${tripsArr.length !== 1 ? "s" : ""}`,
    ` *`,
    ` * ── Adding a new trip ──────────────────────────────────────────`,
    ` * 1. Append a new trip object to the array below.`,
    ` * 2. Add its slug → region mapping in src/lib/regions.ts (TRIP_REGION_MAP).`,
    ` * That's it — it appears everywhere automatically.`,
    ` */`,
    `export const ${exportName}: Trip[] = [`,
  ].join("\n");

  const tripBlocks = tripsArr.map((tl) => tl.join("\n")).join("\n");
  const fileContent = header + "\n" + tripBlocks + "\n];\n";
  const outPath = path.join(OUT_DIR, `${region}.ts`);
  fs.writeFileSync(outPath, fileContent, "utf8");
  const sizeKB = Math.round(fileContent.length / 1024);
  console.log(`✅  trips/${region}.ts — ${tripsArr.length} trips, ${sizeKB} KB`);
}

// ── Write trips/index.ts barrel ──────────────────────────────────────────────
const indexContent = `import type { Trip } from "@/lib/types";

import { HIMALAYA_TRIPS } from "./himalayas";
import { NORTHEAST_TRIPS } from "./northeast";
import { COASTAL_TRIPS } from "./coastal";
import { CENTRAL_INDIA_TRIPS } from "./central-india";
import { SOUTH_INDIA_TRIPS } from "./south-india";
import { RAJASTHAN_TRIPS } from "./rajasthan";

/**
 * Combined trip dataset from all regions.
 *
 * ── ADDING A TRIP ─────────────────────────────────────────────────────────
 * 1. Add the trip object to the correct region file:
 *    Himalayas / Uttarakhand / J&K  →  trips/himalayas.ts
 *    Northeast India (7 Sisters)    →  trips/northeast.ts
 *    Konkan / Goa / Andamans        →  trips/coastal.ts
 *    MP / Chhattisgarh              →  trips/central-india.ts
 *    Kerala / Karnataka / TN        →  trips/south-india.ts
 *    Rajasthan / Gujarat / UP       →  trips/rajasthan.ts
 *
 * 2. Add its slug → region(s) in src/lib/regions.ts  TRIP_REGION_MAP.
 *
 * The trip then automatically appears on /trips, in sitemaps,
 * in the chatbot corpus, and on regional filter pages.
 */
export const DEMO_TRIPS: Trip[] = [
  ...HIMALAYA_TRIPS,
  ...NORTHEAST_TRIPS,
  ...COASTAL_TRIPS,
  ...CENTRAL_INDIA_TRIPS,
  ...SOUTH_INDIA_TRIPS,
  ...RAJASTHAN_TRIPS,
];

// Named region exports for direct region-scoped access
export {
  HIMALAYA_TRIPS,
  NORTHEAST_TRIPS,
  COASTAL_TRIPS,
  CENTRAL_INDIA_TRIPS,
  SOUTH_INDIA_TRIPS,
  RAJASTHAN_TRIPS,
};
`;

fs.writeFileSync(path.join(OUT_DIR, "index.ts"), indexContent, "utf8");
console.log("✅  trips/index.ts written");

const total = Object.keys(REGION_EXPORT_NAME).reduce((s, r) => s + regionTrips[r].length, 0);
console.log(`\n📊 Total trips written: ${total} / ${trips.length}`);
if (total !== trips.length) console.warn(`⚠️  ${trips.length - total} unassigned trips!`);
