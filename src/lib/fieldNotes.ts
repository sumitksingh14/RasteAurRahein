/**
 * fieldNotes.ts — Redis-backed CRUD for Field Notes (Journal entries).
 *
 * Key schema:
 *   journal:index   → SET of slugs
 *   journal:{slug}  → JSON string of FieldNote
 */

import { redis } from "@/lib/redis";
import type { FieldNote } from "@/lib/types";

const TTL = 60 * 60 * 24 * 365; // 1 year

// ---------------------------------------------------------------------------
// Seed data — 3 starter notes to prevent an empty page on first deploy
// ---------------------------------------------------------------------------
export const SEED_NOTES: FieldNote[] = [
  {
    _id: "seed-001",
    slug: "spiti-valley-winter-gear-guide",
    title: "Complete Gear Guide for Spiti Valley in Winter",
    category: "gear-review",
    excerpt:
      "Surviving -20°C nights at 4,500m requires the right kit. Here's exactly what worked — and what didn't — on a January traverse of Spiti.",
    body: `## Layering System

The single most important principle in extreme cold is **layers**, not one thick jacket.

### Base Layer
I used **Decathlon Forclaz -10° merino wool** base (top + bottom). Merino is odour-resistant over multi-day use and retains warmth when slightly damp. Avoid cotton entirely.

### Mid Layer
A **Primaloft or down sweater** (I used Quechua Trek 100) on top of the base. This is the warmth layer. Down is lighter and warmer by weight, but loses loft when wet — Primaloft synthetic is safer in Spiti's occasional snowfall.

### Outer Shell
Windproof and waterproof hardshell. I used the **Decathlon Forclaz MT900** — excellent value, fully seam-taped. A shell with pit zips is worth the premium in variable conditions.

## Sleep System

The most dangerous mistake in Spiti is an under-rated sleeping bag.

- **Sleeping bag:** Minimum -15°C comfort rating. I used Quechua MH500 0°C comfort + worn down sweater + hot water bottle. 
- **Sleeping pad:** Insulation from the ground matters as much as the bag. I used a foam sit pad under a thin inflatable — the foam never deflates in the cold unlike air-only pads.

## What I Wished I Had Packed

1. **Hand warmers (HeatMax)** — available in Kaza but expensive. Buy in Chandigarh.
2. **Balaclava with mouth hole** — a neck gaiter gets soggy from breathing. Balaclava is better.
3. **Liner gloves** — wear under shell mittens. Lets you use phone/camera without removing outer shell.

## What Wasn't Worth Carrying

- **Trekking poles** — helpful on ice but more hindrance than help on road sections
- **Heavy SLR camera** — my phone (Pixel 8) outperformed in low light in Kaza village at -15°C
`,
    relatedTripSlug: "spiti-valley",
    tags: ["gear", "winter", "spiti", "packing"],
    readingTime: 8,
    _createdAt: "2025-01-15T00:00:00Z",
    _updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    _id: "seed-002",
    slug: "leh-ladakh-real-budget-2025",
    title: "Real Budget Breakdown: Leh–Ladakh 9-Day Road Trip (₹28,400 per person)",
    category: "budget-breakdown",
    excerpt:
      "Exact costs, receipts, and honest commentary on where we overspent and where we saved on a 9-day Leh–Ladakh trip in July 2025.",
    body: `## The Short Answer

**Total: ₹28,400 per person** (2 people sharing all costs except flights)

Flights from Delhi: ₹8,500–₹14,000 (variable — booked 6 weeks out)

All-in including flights: **₹36,900–₹42,400 per person**

---

## Day-by-Day Cost Log

| Day | Location | Accommodation | Food | Transport | Misc | Daily Total |
|-----|----------|---------------|------|-----------|------|-------------|
| 1 | Leh | ₹1,200 | ₹600 | ₹300 (taxi from airport) | — | ₹2,100 |
| 2 | Leh (acclimatisation) | ₹1,200 | ₹700 | ₹400 (shared jeep to Shanti Stupa) | ₹500 (permits) | ₹2,800 |
| 3 | Nubra Valley | ₹1,500 | ₹500 | ₹1,200 (shared cab to Diskit) | ₹200 (Bactrian camel ride) | ₹3,400 |
| 4 | Nubra | ₹1,500 | ₹450 | — | — | ₹1,950 |
| 5 | Pangong Tso | ₹2,000 | ₹600 | ₹1,800 (shared cab Nubra→Pangong) | — | ₹4,400 |
| 6 | Pangong | ₹2,000 | ₹500 | — | ₹200 (sunrise boat) | ₹2,700 |
| 7 | Leh (via Chang La) | ₹1,200 | ₹600 | ₹1,500 (return cab) | — | ₹3,300 |
| 8 | Leh (Sham Valley day trip) | ₹1,200 | ₹700 | ₹1,800 (Alchi, Likir day trip) | — | ₹3,700 |
| 9 | Departure | — | ₹400 | ₹300 (taxi to airport) | ₹1,750 (souvenirs) | ₹2,450 |

**Total accommodation:** ₹11,800 · **Food:** ₹5,550 · **Transport within Ladakh:** ₹7,300 · **Misc/permits:** ₹2,650 · **Souvenirs:** ₹1,100

## Biggest Surprises

**Over-budget:** Shared cabs between remote areas are quoted per seat but groups often buy out the cab — negotiate before committing.

**Under-budget:** Food in Leh town is very reasonable (₹150–250/meal at local restaurants). Avoid tourist-facing restaurants on Main Bazaar Road.

## Tips to Save ₹5,000+

1. Book homestays over hotels — warmer, more authentic, ₹300–500 cheaper per night
2. Form groups of 4–6 for cab sharing — prices drop 40%
3. Buy groceries in Leh for Pangong/Nubra — options are extremely limited and expensive there
`,
    relatedTripSlug: "leh-ladakh-9-days",
    tags: ["budget", "ladakh", "costs"],
    readingTime: 6,
    _createdAt: "2025-08-10T00:00:00Z",
    _updatedAt: "2025-08-10T00:00:00Z",
  },
  {
    _id: "seed-003",
    slug: "best-time-visit-spiti-valley",
    title: "Best Time to Visit Spiti Valley: Month-by-Month Honest Guide",
    category: "seasonal-advisory",
    excerpt:
      "The 'best time' depends entirely on what you want. Here's what each month actually looks like — from complete road closure in winter to monsoon risk in July.",
    body: `## The Honest Summary

There is **no single best month** for Spiti. The right window depends on what you're willing to trade.

---

## Month-by-Month

### November – February: Winter Circuit (Extreme, Beautiful, Difficult)
- Manali–Spiti road **closed**. Entry only via Shimla–Nako–Sumdo
- Temperature: -15°C to -30°C at night in Kaza
- Roads can be treacherous — winter tyres or chains mandatory
- Very few tourists. Homestays in Pin Valley remain open
- **Best for:** Experienced winter trekkers, Chadar-style experiences, astrophotography

### March – April: Shoulder Season
- Manali road starts thawing — passable by late April (weather-dependent)
- Some guesthouses still closed. Check ahead
- River crossings may be difficult (snowmelt)
- **Best for:** Those who want near-zero tourists and don't mind rough conditions

### May – June: Pre-Monsoon Peak ⭐
- Most guesthouses open by mid-May
- Flowers bloom — Kibber wildlife sanctuary is spectacular
- Rohtang Pass to Manali usually opens by late May
- **Best for:** Most travellers — best balance of accessibility, weather, and facilities

### July – August: Monsoon Risk
- Manali–Spiti is in a **rain shadow** — drier than surrounding Himachal
- But landslide risk on Rohtang Pass section peaks in July
- Rivers run high — some crossings risky
- **Best for:** Those specifically wanting lush green landscapes and lower guesthouse rates

### September – October: Post-Monsoon Peak ⭐
- Crystal clear skies — best visibility and photography
- All passes open, guesthouses fully operational
- Slightly cooler nights by October (prep for cold)
- **Best for:** Photography, trekking, clear weather

### Monsoon note:
The Kunzum Pass and Rohtang Pass are where most closures happen. The Shimla route via Nako is almost always more reliable but adds 4–5 hours.
`,
    relatedTripSlug: "spiti-valley",
    tags: ["seasonal", "spiti", "travel-planning"],
    readingTime: 7,
    _createdAt: "2025-06-01T00:00:00Z",
    _updatedAt: "2025-06-01T00:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// CRUD helpers
// ---------------------------------------------------------------------------

/** Seed the journal into Redis if not already present */
async function ensureSeeded(): Promise<void> {
  try {
    const count = await redis.scard("journal:index");
    if (count > 0) return;
    for (const note of SEED_NOTES) {
      await redis.sadd("journal:index", note.slug);
      await redis.set(`journal:${note.slug}`, JSON.stringify(note), TTL);
    }
  } catch {
    // Redis unavailable — fall through to static seed data
  }
}

export async function getAllFieldNotes(): Promise<FieldNote[]> {
  try {
    await ensureSeeded();
    const slugs = await redis.smembers("journal:index");
    if (!slugs.length) return SEED_NOTES;
    const keys = slugs.map((s) => `journal:${s}`);
    const raws = await redis.mget(...keys);
    const notes = (raws as (string | null)[])
      .map((r) => {
        if (!r) return null;
        try { return JSON.parse(r) as FieldNote; } catch { return null; }
      })
      .filter((n): n is FieldNote => Boolean(n));
    notes.sort(
      (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );
    return notes.length ? notes : SEED_NOTES;
  } catch {
    return SEED_NOTES;
  }
}

export async function getFieldNoteBySlug(slug: string): Promise<FieldNote | null> {
  try {
    await ensureSeeded();
    const raw = await redis.get(`journal:${slug}`);
    if (!raw) return null;
    return JSON.parse(raw) as FieldNote;
  } catch {
    return SEED_NOTES.find((n) => n.slug === slug) ?? null;
  }
}

export async function createFieldNote(
  note: Omit<FieldNote, "_id" | "_createdAt" | "_updatedAt">
): Promise<FieldNote> {
  const now = new Date().toISOString();
  const full: FieldNote = {
    ...note,
    _id: `fn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    _createdAt: now,
    _updatedAt: now,
  };
  await redis.sadd("journal:index", full.slug);
  await redis.set(`journal:${full.slug}`, JSON.stringify(full), TTL);
  return full;
}
