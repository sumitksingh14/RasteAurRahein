# 🧭 Raste Aur Raahein

> *"Every road has a story."*

A premium, full-stack travel blog built with **Next.js 16** — documenting high-altitude treks, desert roads, and off-the-beaten-path adventures across India. Features an **AI-powered trip planner** driven by Google Gemini, a rich itinerary import tool, interactive maps, and a stunning dark/light theme.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-3.6_Flash-4285F4?logo=google)](https://ai.google.dev)
[![Sanity CMS](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity)](https://sanity.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📸 Preview

| Dark Mode | Light Mode |
|-----------|------------|
| Rich glassmorphism hero, gold accent palette | Warm off-white with high-contrast text |

---

## ✨ Features

### 🤖 AI Trip Planner (Gemini-powered)
- **Floating ✨ button** accessible from every page
- Multi-step wizard: destination inputs → AI generation → day-by-day preview → save
- Configurable: destination, duration (1–21 days), travel style, month, budget, highlights
- Generates realistic, India-specific itineraries with activities, times, tips & budget estimates
- Saved trips persist in `localStorage` and appear on the `/itineraries` page

### 🗺️ Trip Pages
- Beautiful trip cards with cover images, tags, duration badges, view counts
- Full slug-based trip detail pages with tabbed layout (Itinerary, Map, Gallery)
- Interactive Leaflet map with day-based pin markers
- Photo gallery with lightbox viewer
- Estimated reading time and social share button

### 📥 HTML Itinerary Importer
- Paste HTML from **Google Docs**, **TripIt**, or any planner
- Server-side parser extracts day headings, activities, timestamps, and notes
- Sanitises HTML before rendering
- Preview parsed structure before publishing

### 🎨 Design System
- **Dark mode by default**, toggleable light mode (persisted in `localStorage`)
- Glassmorphism cards, gradient text, subtle micro-animations
- Google Fonts: Inter (sans), Playfair Display (serif), JetBrains Mono (code)
- Fully responsive — mobile-first layout
- `force-dark` utility class for dark sections (e.g. Hero) that remain dark in light mode

### 📝 CMS (Sanity)
- Optional Sanity Studio integration for managing trips, authors, and media
- Graceful demo-data fallback when Sanity is not configured — the app runs fully without a CMS

### 📬 Contact Form
- Integrated with [Resend](https://resend.com) for transactional email (optional)
- Form validation and success/error states

---

## 🗂️ Project Structure

```
travel-blog/
├── public/                     # Static assets
│   └── sumit-singh.png         # Author photo
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── layout.tsx          # Root layout (providers, navbar, footer, AI button)
│   │   ├── globals.css         # Design tokens & global styles
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact form page
│   │   ├── import/             # HTML itinerary importer
│   │   ├── itineraries/        # AI-generated itineraries library
│   │   ├── trips/              # Trip listing + [slug] detail pages
│   │   └── api/
│   │       ├── generate-itinerary/  # ← Gemini AI route
│   │       ├── import-itinerary/   # HTML parser route
│   │       ├── contact/            # Email route (Resend)
│   │       └── view-count/         # View tracking
│   ├── components/
│   │   ├── ai/
│   │   │   ├── AIItineraryButton.tsx   # Floating trigger button
│   │   │   └── AIItineraryModal.tsx    # 4-step wizard modal
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── providers/
│   │   │   ├── ThemeProvider.tsx           # Dark/light toggle
│   │   │   └── GeneratedTripsProvider.tsx  # localStorage trip store
│   │   └── ui/
│   │       ├── TripCard.tsx
│   │       ├── ItineraryAccordion.tsx
│   │       ├── MapView.tsx / LeafletMapInner.tsx
│   │       └── PhotoGallery.tsx
│   └── lib/
│       ├── types.ts            # All TypeScript interfaces
│       ├── queries.ts          # Sanity GROQ queries + demo data
│       ├── sanity.ts           # Sanity client
│       └── itineraryParser.ts  # HTML → ParsedItinerary
├── .env.local                  # Secret keys (not committed)
├── next.config.ts
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sumitksingh14/RasteAurRahein.git
cd RasteAurRahein
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example and fill in your keys:

```bash
cp .env.local.example .env.local   # or create .env.local manually
```

```env
# .env.local

# ── Google Gemini AI (required for AI Trip Planner) ──────────────────────────
# Get a free key at https://ai.google.dev → "Get API key"
GEMINI_API_KEY=your_gemini_api_key_here

# ── Sanity CMS (optional — app runs on demo data without this) ───────────────
# Run: npx sanity init  in the project, then paste the values below
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# ── Contact form via Resend (optional) ───────────────────────────────────────
# Free tier: 3,000 emails/month — https://resend.com
RESEND_API_KEY=
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 AI Trip Planner — How it Works

1. Click the **✨ AI Trip Planner** button (bottom-right corner, any page).
2. Fill in the wizard:
   - **Destination** — e.g. "Spiti Valley", "Coorg", "Rajasthan circuit"
   - **Duration** — drag the slider (1–21 days)
   - **Travel Style** — Adventure / Culture / Relaxed / Budget / Luxury / Road Trip / Wildlife / Food & Culture
   - **Month** — for weather-aware recommendations
   - **Budget Range** — Budget → Luxury (INR tiers)
   - **Highlights** — optional must-sees or preferences
3. Hit **Generate** — Gemini 3.6 Flash crafts a full itinerary (~5–15 s).
4. Review the day-by-day schedule, expand each day, read tips.
5. Click **Save to My Itineraries** — the trip is stored in your browser and appears at `/itineraries`.

> **API used:** `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent`  
> The response is forced to JSON via `responseMimeType: "application/json"` — no markdown stripping needed.

---

## 📥 HTML Itinerary Importer — How it Works

Navigate to `/import` and paste HTML from any travel planner (Google Docs export, TripIt, custom HTML).

The server-side parser (`src/lib/itineraryParser.ts`):
- Sanitises HTML (strips scripts, iframes, event handlers)
- Extracts the trip title from `<h1>`
- Splits content by `<h2>` / `<h3>` tags matching `"Day N"` pattern
- Extracts activities from `<li>` items, `<p>` tags, or `<table>` rows
- Parses time stamps like `"9:00 AM"`, `"14:30"` automatically

---

## 🎨 Design Tokens

All colours, typography, spacing, and shadows live in CSS custom properties in `src/app/globals.css`:

| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| `--bg-primary` | `#0a0a0f` | `#fafaf8` |
| `--text-primary` | `#f0ede8` | `#1a1714` |
| `--accent-gold` | `#c9a84c` | `#b38a36` |
| `--accent-teal` | `#4ecdc4` | `#2b9b94` |
| `--accent-rose` | `#e8857d` | `#d1564d` |

Theme is toggled via a `.light` class on `<html>` (stored in `localStorage`).  
Use `.force-dark` on any section that sits over a dark background image (e.g. the Hero) to keep text readable regardless of theme.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | [TypeScript 5](https://typescriptlang.org) |
| Styling | Vanilla CSS custom properties (no Tailwind by default) |
| AI | [Google Gemini 3.6 Flash](https://ai.google.dev) |
| CMS | [Sanity v3](https://sanity.io) (optional) |
| Maps | [React Leaflet 5](https://react-leaflet.js.org) |
| Animations | [Framer Motion 13](https://framer.motion) |
| Icons | [Lucide React](https://lucide.dev) |
| HTML Sanitisation | [sanitize-html](https://github.com/apostrophecms/sanitize-html) |
| Date Formatting | [date-fns 4](https://date-fns.org) |
| Email | [Resend](https://resend.com) (optional) |
| Fonts | Inter, Playfair Display, JetBrains Mono (Google Fonts) |

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## 🔌 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/generate-itinerary` | AI itinerary generation via Gemini |
| `POST` | `/api/import-itinerary` | Parse & sanitise HTML itinerary |
| `POST` | `/api/contact` | Send contact form email via Resend |
| `POST` | `/api/view-count` | Increment trip view count in Sanity |

### `POST /api/generate-itinerary`

**Request body:**
```json
{
  "destination": "Spiti Valley, Himachal Pradesh",
  "days": 7,
  "style": "Adventure",
  "month": "September",
  "budget": "Mid-range (₹2,000–₹5,000/day)",
  "highlights": "Chandratal Lake, Key Monastery, local food"
}
```

**Response:**
```json
{
  "success": true,
  "itinerary": {
    "title": "7 Days in Spiti Valley — Cold Desert & Ancient Monasteries",
    "destination": "Spiti Valley, Himachal Pradesh",
    "overview": "...",
    "totalBudgetEstimate": "₹35,000–₹50,000 per person",
    "tags": ["Adventure", "Himalayas", "Road Trip"],
    "days": [ { "dayNumber": 1, "title": "...", "activities": [...] } ]
  },
  "generatedAt": "2026-08-25T..."
}
```

---

## 🗺️ Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, featured trips, about blurb, tags, latest posts |
| `/trips` | All trips with search and tag filtering |
| `/trips/[slug]` | Individual trip with itinerary, map, gallery |
| `/itineraries` | AI-generated trips library |
| `/import` | HTML itinerary importer |
| `/about` | Author bio, timeline, travel stats |
| `/contact` | Contact form |

---

## 🌐 Deployment

### Vercel (recommended)

1. Push to GitHub (done ✅)
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard (`GEMINI_API_KEY`, optionally Sanity + Resend keys)
4. Deploy — Vercel auto-detects Next.js

### Self-hosted

```bash
npm run build
npm run start   # runs on port 3000
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to your fork: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

## 🔵 Progressive Web App (PWA)

The app is installable as a PWA on Android (Chrome) and iOS (Safari "Add to Home Screen").

### What's included

| Feature | Implementation |
|---|---|
| Web App Manifest | `src/app/manifest.ts` — native Next.js App Router |
| Service Worker | `src/app/sw.ts` via **Serwist** (officially recommended by Next.js 16 docs) |
| Install prompt | `src/components/pwa/InstallPrompt.tsx` — bottom banner with spring animation |
| Icons | `public/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` |

### Caching strategy

| Route pattern | Strategy |
|---|---|
| `/api/auth/*` | `NetworkOnly` — never cached |
| Other `/api/*` | `NetworkFirst` — fresh content, cache fallback |
| Static assets (`.js`, `.css`, fonts, images) | `CacheFirst` — 30-day cache |
| `cdn.sanity.io` images | `CacheFirst` — 7-day cache |

### Testing PWA

```bash
# Build first — SW only active in production mode
npm run build && npm start

# Then open Chrome DevTools → Application → Service Workers
```

### Lighthouse PWA checklist

- [x] Valid `manifest.json` (auto-generated from `manifest.ts`)
- [x] Service worker registered and active
- [x] HTTPS on Vercel (automatic)
- [x] Icons at 192×192 and 512×512
- [x] `start_url` responds with 200
- [x] `theme_color` matches app brand

---

## 📋 License

MIT © [Sumit Singh](https://github.com/sumitksingh14)

---

<div align="center">
  <sub>Built with ❤️ and too many cups of chai ☕</sub>
</div>
