# Measurement & Analytics Runbook — Raste Aur Raahein

> **Authoritative Measurement Architecture**
> **Site:** [raste-aur-rahein.vercel.app](https://raste-aur-rahein.vercel.app)  
> **Stack:** Next.js 16 (App Router), `@next/third-parties/google` (GA4), `@vercel/speed-insights`  
> **Core Principle:** Suppress all vanity metrics. Measure only what answers: *"Is our SEO, technical overhaul, content structure, and distribution driving real organic growth and engaged readers?"*

---

## 1. The Monthly Scorecard (15-Minute Review)

Run this scorecard on the **1st of every month**. Record all values in your monthly tracking sheet.

| # | Metric | Tool / View | Why It Matters | Healthy Direction | When to Worry (Action Threshold) |
|---|--------|-------------|----------------|-------------------|-----------------------------------|
| **1** | **Organic Clicks** | Google Search Console → Performance (Last 28 days) | Primary indicator of search visibility and real search traffic | Upward MoM trend | Flat for 3 consecutive months despite publishing |
| **2** | **Indexed Pages** | GSC → Indexing → Pages ("Indexed" count) | Confirms search engines are discovering and indexing new trips & guides | Climbs toward total URL count (~215+) | Drops by > 10% or sudden surge in "Discovered - currently not indexed" |
| **3** | **Avg Position (Top 10 Target Queries)** | GSC → Performance → Queries (Filter: non-branded) | Validates keyword rank gains for high-intent queries (e.g. *kunzum pass road condition*, *spiti road trip itinerary*) | Average position climbing towards Top 5 (< 5.0) | Slipping beyond position 15 for primary destination targets |
| **4** | **Engagement Rate & Avg Engagement Time** | GA4 → Reports → Engagement → Pages and screens | Signal of content depth, readability, and dwell time | Engagement Rate > 65%, Avg Time > 2m 30s on field notes | Engagement rate < 50% on articles (trigger QuickFacts & intro rewrite) |
| **5** | **Email Signups** | GA4 → Engagement → Events → `email_signup` | Owned audience growth from GPX gates and Route Report opt-ins | 15–30+ signups per 1,000 unique article readers | < 1% conversion on high-traffic trips |
| **6** | **GPX Downloads** | GA4 → Engagement → Events → `gpx_download` | Validates practical value of route telemetry assets | High correlation with long dwell time and bookmarking | Zero downloads on top 5 visited road trips |
| **7** | **"Continue the Journey" CTR** | GA4 → Explore → Free Form (`related_trip_click` / `page_view`) | Measures internal mesh health and content discovery across siblings | > 8% click-through rate to next field note | < 3% CTR (indicates poor tag matching or weak card placement) |
| **8** | **LCP & CLS (p75 Real-User)** | Vercel Dashboard → Speed Insights (75th percentile) | Core Web Vitals pass rates directly impacting search ranking algorithms | LCP ≤ 2.2s, CLS ≤ 0.05, INP ≤ 150ms | LCP > 2.5s or CLS > 0.1 on mobile devices |

---

## 2. GA4 Custom Events Reference

All custom events are implemented in [`src/lib/analytics.ts`](file:///Users/singh_su/Documents/SumitWorkspace/Trip_Itinerary/travel-blog/src/lib/analytics.ts) and follow strict `lowercase_snake_case` naming.

| Event Name | Trigger Condition | Parameters | Parameter Example | Component Source |
|------------|-------------------|------------|-------------------|------------------|
| `email_signup` | Successful form submission | `source`<br>`trip_slug`<br>`route_report_optin` | `source: 'article_gpx'`<br>`trip_slug: 'spiti-valley'`<br>`route_report_optin: true` | `TripLeadCapture.tsx`<br>`NewsletterInline.tsx`<br>`NewsletterPopup.tsx` |
| `gpx_download` | User clicks or auto-receives GPX track | `trip_slug`<br>`trip_title` | `trip_slug: 'leh-ladakh-9-days'`<br>`trip_title: 'Leh Ladakh...'` | `TripLeadCapture.tsx`<br>`GPXDownloadButton.tsx` |
| `itinerary_import` | Parser processes raw email or map text | `import_type` | `import_type: 'gpx'` \| `'mymaps'` \| `'notes'` | `src/app/(site)/import/page.tsx` |
| `outbound_click` | External partner/booking/portal click | `label`<br>`destination_url` | `label: 'Book Accommodation'`<br>`destination_url: 'https://booking.com/...'` | `TripPartnerLinks.tsx`<br>External resource links |
| `related_trip_click` | Click on "Continue the Journey" related card | `trip_slug`<br>`source_slug`<br>`position` | `trip_slug: 'valparai-4-days'`<br>`source_slug: 'vazhachal-falls-3-days'`<br>`position: 1` | `TripCard.tsx`<br>`trips/[slug]/page.tsx` |

*Note: `page_view` and `scroll` (90% depth) are handled automatically by GA4 Enhanced Measurement. Do NOT fire custom events for them to avoid duplicate data.*

---

## 3. How to Build the 2-Minute GA4 Explorations Report

To track items 5, 6, and 7 without digging through standard menus:

1. Open **[Google Analytics](https://analytics.google.com)** → Navigate to **Explore** (left sidebar) → Click **Blank**.
2. Name the exploration: **`Content Engine & Lead Capture Scorecard`**.
3. In **Variables**:
   - **Dimensions**: Add `Event name`, `Page path and screen class`, `source`, `trip_slug`, `position`.
   - **Metrics**: Add `Event count`, `Total users`.
4. In **Tab Settings**:
   - **Rows**: Drop in `Page path and screen class` and `Event name`.
   - **Values**: Drop in `Event count`.
   - **Filters**: Add filter `Event name` *matches regex* `email_signup|gpx_download|related_trip_click`.
5. Save the report. You now have an instant readout of signups, GPX downloads, and internal link clicks per article.

---

## 4. GSC Branded vs Non-Branded Performance Filter

Branded queries (e.g. *"raste aur rahein"*, *"sumit singh blog"*) skew impressions. Non-branded search growth is the primary North Star metric.

1. Go to **Google Search Console** → **Performance** → **Search Results**.
2. Click **+ New** (Filter) → Select **Query...**.
3. Choose **Queries not containing** → Enter regex:  
   `raste|raahein|rahein|sumit singh`
4. Set Date range to **Last 28 days** (compare to previous period).
5. Review the non-branded clicks, impressions, and CTR. This reflects your true organic market acquisition from search intent.

---

## 5. Search Console & Bing Webmaster Tools Checklist

### Step 1: Verification
1. **Google Search Console**:
   - Go to [search.google.com/search-console](https://search.google.com/search-console) → Add Property → URL Prefix: `https://raste-aur-rahein.vercel.app`.
   - Select **HTML tag**. Copy the `content="..."` string.
   - Set in Vercel environment variables: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token>` (already verified in `src/app/layout.tsx`).
   - Click **Verify**.
2. **Bing Webmaster Tools**:
   - Go to [bing.com/webmasters](https://www.bing.com/webmasters) → Log in.
   - Choose **Import from Google Search Console** (recommended, takes 30 seconds and syncs verified properties).
   - Alternatively, copy the `msvalidate.01` token into `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel.

### Step 2: Submit Sitemap
1. In both GSC and Bing, navigate to **Sitemaps**.
2. Enter the full URL: `https://raste-aur-rahein.vercel.app/sitemap.xml`.
3. Submit and verify status displays **Success** with ~215 URLs discovered.

### Step 3: Priority Indexing Requests (URL Inspection)
Use the **URL Inspection** tool at the top of GSC to submit these priority URLs immediately:
1. `https://raste-aur-rahein.vercel.app/` (Homepage)
2. `https://raste-aur-rahein.vercel.app/road-conditions` (Live telemetry hub)
3. `https://raste-aur-rahein.vercel.app/road-conditions/kunzum-pass`
4. `https://raste-aur-rahein.vercel.app/road-conditions/baralacha-la`
5. `https://raste-aur-rahein.vercel.app/road-conditions/zoji-la`
6. `https://raste-aur-rahein.vercel.app/guides/spiti-vs-ladakh`
7. `https://raste-aur-rahein.vercel.app/guides/best-monsoon-road-trips-south-india`
8. `https://raste-aur-rahein.vercel.app/guides/kerala-waterfalls-guide`
9. `https://raste-aur-rahein.vercel.app/guides/himalayan-passes-explained`
10. `https://raste-aur-rahein.vercel.app/trips/spiti-valley`
11. `https://raste-aur-rahein.vercel.app/trips/leh-ladakh-9-days`

### Step 4: Link GSC to GA4
1. In **Google Analytics 4**, navigate to **Admin** (gear icon) → **Product Links** → **Search Console Links**.
2. Click **Link**. Select your verified GSC web property (`https://raste-aur-rahein.vercel.app`).
3. Select your GA4 web data stream.
4. Confirm. Within 24–48 hours, organic search queries, impressions, and Google organic landing pages appear directly inside GA4 Reports.

---

## 6. Internal Traffic Exclusion Setup

To prevent your own browsing and testing from inflating metrics:

### Method A: Browser Opt-Out (Immediate for Authors / Editors)
1. Open the site in your browser: `https://raste-aur-rahein.vercel.app`.
2. Open Developer Tools Console (`Cmd + Option + J` on Mac or `F12` on Windows).
3. Run:
   ```javascript
   window.setInternalAuthor(true);
   ```
4. All subsequent event dispatches from `src/lib/analytics.ts` will immediately no-op on your device.

### Method B: GA4 IP Address Filter (Home / Office IPs)
1. In **GA4 Admin** → **Data Streams** → Click your Web stream.
2. Under *Google tag*, click **Configure tag settings** → **Show more** → **Define internal traffic**.
3. Click **Create**:
   - Rule name: `Home / Office Broadbands`
   - `traffic_type_value`: `internal`
   - IP address: Select `IP address equals` and enter your public IPv4/IPv6 (find via `curl ifconfig.me`).
4. In **GA4 Admin** → **Data Settings** → **Data Filters**:
   - Click the default `Internal Traffic` filter.
   - Switch state from *Testing* to **Active**.
   - Save. All matching IP traffic will be permanently excluded from reports.

---

## 7. Baseline Reset & Day 1 Capture (Task 6)

> **Baseline Reset Notice:**  
> A complete technical SEO overhaul, sitemap repair, canonical fix, metadata alignment, and content restructuring was completed in **September 2026**.  
> **Official Baseline Point:** `2026-09-26`  
> Compare month-over-month (MoM) growth starting from **October 2026 onward**.

### Day 1 Snapshot Checklist (Take screenshots on day of launch):
- [ ] **GSC Overview Screen**: Total Clicks (Last 28 days), Total Impressions, Average CTR, Average Position.
- [ ] **GSC Page Indexing Screen**: Count of "Indexed" pages vs "Not indexed".
- [ ] **GA4 30-Day Snapshot**: Total Users, Engagement Rate, Average Engagement Time.
- [ ] **Vercel Speed Insights Dashboard**: p75 LCP, CLS, INP across mobile and desktop.
- [ ] **Email List Count**: Starting subscriber count across Brevo/Resend/Buttondown.
