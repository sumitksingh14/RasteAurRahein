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
  {
    _id: "seed-004",
    slug: "15-must-visit-national-parks-in-india",
    title: "15 Must-Visit National Parks in India (and When to Go)",
    category: "seasonal-advisory",
    excerpt:
      "A region-by-region field guide to 15 extraordinary Indian national parks — from trans-Himalayan snowfields and central sal forests to mangrove deltas — with optimal wildlife tracking windows and safari booking tips.",
    body: `India's 106 national parks protect a dramatic ecological spectrum, compressing subalpine Himalayan valleys at 4,000 meters, dense sal corridors, arid volcanic plateaus, and mangrove deltas into one subcontinent. These biomes shelter over 70 percent of the world's wild tigers, the last Asiatic lions, and the great one-horned rhinoceros. Because seasonal climate shifts and forest department schedules vary sharply by region, timing your expedition to match park accessibility and wildlife movements is essential.

---

### 1. Jim Corbett National Park — Uttarakhand (North)

India's oldest national park (est. 1936) hugs the Shivalik foothills along the Ramganga River basin, celebrated for riverine grasslands and dense sal canopies.

- **Known For:** Bengal tigers, wild Asian elephants, gharials, and 600+ bird species.
- **Best Months to Visit:** Mid-November to Mid-June (Dhikala core opens Nov 15–Jun 15; Bijrani opens mid-October).
- **Practical Tip:** Book Dhikala Forest Rest House 46 days ahead on \`corbettgov.org\` for exclusive core night permits. Nearest railhead: Ramnagar (12 km).

### 2. Kaziranga National Park — Assam (Northeast)

A UNESCO World Heritage Site in the fertile Brahmaputra floodplains, characterized by tall elephant grass and marshland water bodies.

- **Known For:** Two-thirds of the world's Great Indian one-horned rhinos, wild water buffalo, and eastern swamp deer.
- **Best Months to Visit:** November to April (closed May–Oct due to monsoon flooding; visibility peaks Jan–Mar).
- **Practical Tip:** Split game drives between Central (Kohora) range for rhinos and Western (Bagori) range for water birds. Fly to Jorhat (97 km) or Guwahati (220 km).

### 3. Ranthambore National Park — Rajasthan (West)

A former royal hunting ground where dry deciduous forests wrap around a 10th-century fortress, creating dramatic historical backdrops for wildlife.

- **Known For:** Bengal tigers roaming amidst medieval ruins, marsh crocodiles in Padam Talao, and leopards.
- **Best Months to Visit:** October to June (Nov–Feb brings pleasant weather; Mar–May offers peak tiger sightings around drying lakes).
- **Practical Tip:** Book core Zones 1–5 Gypsy safaris 90 days ahead via Rajasthan Forest portal. Nearest railhead: Sawai Madhopur (11 km); Jaipur Airport: 160 km.

### 4. Kanha National Park — Madhya Pradesh (Central)

The central Indian wilderness that inspired Kipling's *The Jungle Book*, renowned for vast open meadows where morning mist settles over wildlife.

- **Known For:** Rescued hard-ground barasingha (swamp deer), Bengal tigers, leopards, dhole (wild dogs), and vast sal maidans.
- **Best Months to Visit:** Mid-October to June (Nov–Feb delivers misty landscapes; Apr–Jun yields top predator tracking; closed Jul–Sep).
- **Practical Tip:** Book Mukki or Kanha gates online via MP Forest portal. Fly to Jabalpur (160 km) or train to Gondia (145 km).

### 5. Bandhavgarh National Park — Madhya Pradesh (Central)

Dominated by a sheer sandstone plateau crowned by an ancient 2,000-year-old fort, surrounded by vertical cliffs and bamboo thickets.

- **Known For:** Exceptional tiger density, 10th-century reclining Vishnu statue (Shesh Shaiya), and steep cliff scenery.
- **Best Months to Visit:** October 15 to June 30 (peak tiger tracking runs February through May; closed July to mid-October).
- **Practical Tip:** Book Tala Zone (Zone 1) for fort vistas and historic cat territory. Nearest railhead: Umaria (35 km); Jabalpur Airport: 190 km.

### 6. Sundarbans National Park — West Bengal (East)

The world's largest mangrove river delta where the Ganges and Brahmaputra meet the Bay of Bengal, explored strictly by boat along tidal waterways.

- **Known For:** Swimming Bengal tigers, estuarine crocodiles, Gangetic dolphins, and water monitor lizards.
- **Best Months to Visit:** November to March (winter offers calm waters and basking reptiles; avoid April to September).
- **Practical Tip:** Book licensed safari boats departing Godkhali Port (3 hours from Kolkata). Carry government photo ID for permits at Sajnekhali.

### 7. Hemis National Park — Ladakh (North / Trans-Himalaya)

South Asia's largest national park, spanning rugged high-altitude cold desert valleys between 3,300 and 6,000 meters in eastern Ladakh.

- **Known For:** Snow leopards ("ghosts of the mountains"), Tibetan wolves, blue sheep (bharal), and golden eagles.
- **Best Months to Visit:** Late December to mid-March for snow leopard tracking; June to September for alpine trekking.
- **Practical Tip:** Acclimatize in Leh for 48 hours. Stay in Rumbak village homestays with skilled spotters. Wildlife permits issued in Leh.

### 8. Gir National Park — Gujarat (West)

An arid teak and thorny scrub haven in Gujarat's Kathiawar peninsula, representing a conservation miracle for endangered carnivores.

- **Known For:** The last wild home of the Asiatic lion (*Panthera leo persica*), leopards, hyenas, and Maldhari pastoral communities.
- **Best Months to Visit:** December to March for pleasant safaris; April–May for guaranteed waterhole sightings (closed June 16 to October 15).
- **Practical Tip:** Book Gir Jungle Trail permits strictly via \`girlion.gujarat.gov.in\` 60 days ahead. Rajkot Airport is 160 km away.

### 9. Periyar National Park — Kerala (South)

A lush Western Ghats sanctuary nestled in the Cardamom Hills, centered on a picturesque 1895 reservoir lake fringed by tropical rainforest.

- **Known For:** Wild Asian elephant herds bathing on the lake shore, gaur, sambar deer, and otters.
- **Best Months to Visit:** October to March (cool mountain weather; April–May is warm but prime for elephant gatherings).
- **Practical Tip:** Book the 7:30 AM KTDC boat cruise or a guided bamboo rafting trek through Thekkady forest office. Madurai Airport: 140 km.

### 10. Nagarhole National Park (Kabini) — Karnataka (South)

Part of the Nilgiri Biosphere Reserve along the scenic Kabini River, combining dense teak woods with fertile riverbanks.

- **Known For:** Asian elephants, leopards, black panthers (melanistic leopards), Bengal tigers, and river crocodiles.
- **Best Months to Visit:** October to May (Mar–May is prime as elephant herds gather on the dry riverbed; Nov–Feb offers misty drives).
- **Practical Tip:** Choose Antharasanthe gate for Kabini river boat safaris via Karnataka Forest portal. Nearest airport: Mysore (80 km) or Bengaluru.

### 11. Manas National Park — Assam (Northeast)

A UNESCO World Heritage Site bordering Bhutan along the turquoise Manas River, protecting one of Asia's richest biodiversity corridors.

- **Known For:** Endangered rarities: pygmy hog, golden langur, hispid hare, wild water buffalo, and Bengal florican.
- **Best Months to Visit:** November to April (clear skies and mild 15°C–25°C temperatures; closed May–October for monsoons).
- **Practical Tip:** Pair Bansbari jeep drives with a raft trip from Mathanguri lodge along the Bhutan border. Guwahati Airport: 140 km.

### 12. Tadoba-Andhari Tiger Reserve — Maharashtra (West / Central)

"The Jewel of Vidarbha" encompasses rugged dry teak hills, bamboo thickets, and deep ravines around the perennial Tadoba Lake.

- **Known For:** Top-tier tiger sighting frequencies, sloth bears, dhole packs, and mugger crocodiles.
- **Best Months to Visit:** October to June (Nov–Feb offers pleasant weather; Mar–May delivers daily waterhole sightings).
- **Practical Tip:** Core gates (Moharli, Kolara) book out fast on \`mytadoba.org\`; buffer gates (Agarzari) offer great sightings. Nagpur Airport: 140 km.

### 13. Great Himalayan National Park — Himachal Pradesh (North)

A roadless UNESCO wilderness in Kullu protecting virgin temperate forests, glacial catchments, and subalpine glades explored purely on foot.

- **Known For:** Rare western tragopan, musk deer, Himalayan brown bear, and pristine trekker-only valleys.
- **Best Months to Visit:** April to June for wildflowers; September to November for clear skies and tracking (closed Dec–Mar and Jul–Aug).
- **Practical Tip:** Secure trekking permits at Sai Ropa GHNP office; hire local guides through the community BTCO collective.

### 14. Silent Valley National Park — Kerala (South)

A virgin tract of tropical rainforest in the Nilgiris, celebrated for its haunting quiet due to the natural absence of cicadas.

- **Known For:** Endangered lion-tailed macaques, Nilgiri langurs, great Indian hornbills, and the crystal Kunthi River.
- **Best Months to Visit:** November to March (post-monsoon dry trails and low leech activity; avoid June–September monsoons).
- **Practical Tip:** Board official 4x4 forest jeeps at Mukkali with an eco-guide for the 23-km drive to Sairandhri. Coimbatore Airport: 75 km.

### 15. Keibul Lamjao National Park — Manipur (Northeast)

The world's only floating national park, located on Loktak Lake, consisting of *phumdis* (thick floating mats of soil, peat, and vegetation).

- **Known For:** Sole refuge of the endangered Sangai ("dancing deer"), living on floating biomass mats.
- **Best Months to Visit:** November to March (stable lake levels and firm phumdi mats allow dependable Sangai viewing).
- **Practical Tip:** Take an early wooden canoe safari to the Sendra watchtower at sunrise when deer graze. Imphal Airport is 53 km.

---

## Seasonal Overview: When to Plan Wildlife Safaris in India

Wildlife tourism across India operates on distinct seasonal cycles dictated by climate and forest protocols:

- **Core Season (Mid-October to Mid-June):** Lowland reserves across Central, North, West, and East India welcome visitors during this dry eight-month window.
- **Summer Peak (March to May):** Scorching heat (38°C–44°C) withers forest vegetation and shrinks waterholes, forcing tigers, lions, and elephants into open clearings. This is the undisputed best window for serious predator sightings.
- **Winter Window (November to February):** The most pleasant travel window, offering cool mornings, dramatic mist, and vibrant migratory bird arrivals, though dense greenery demands patient tracking.
- **Monsoon Closures (July to September):** Most core tiger reserves in North, Central, and Northeast India shut completely for road repair and animal breeding. Southern reserves (like Kabini and Periyar) remain accessible year-round.
- **Trans-Himalayan Exception:** High-altitude sanctuaries like Hemis invert this schedule: mid-winter (late December to March) is peak season for tracking snow leopards as freezing heights push them to valley floors.

---

## Quick Reference: National Parks → Best Months

| National Park | Region & State | Best Months to Visit |
|---|---|---|
| Jim Corbett National Park | North (Uttarakhand) | Mid-November to Mid-June |
| Kaziranga National Park | Northeast (Assam) | November to April |
| Ranthambore National Park | West (Rajasthan) | October to June |
| Kanha National Park | Central (Madhya Pradesh) | Mid-October to June |
| Bandhavgarh National Park | Central (Madhya Pradesh) | October 15 to June 30 |
| Sundarbans National Park | East (West Bengal) | November to March |
| Hemis National Park | North / Trans-Himalaya (Ladakh) | Dec–Mar (Snow Leopard) / Jun–Sep (Treks) |
| Gir National Park | West (Gujarat) | Dec–Mar (Comfort) / Apr–May (Sightings) |
| Periyar National Park | South (Kerala) | October to March |
| Nagarhole National Park (Kabini) | South (Karnataka) | October to May |
| Manas National Park | Northeast (Assam) | November to April |
| Tadoba-Andhari Tiger Reserve | West / Central (Maharashtra) | October to June |
| Great Himalayan National Park | North (Himachal Pradesh) | Apr–Jun & Sep–Nov |
| Silent Valley National Park | South (Kerala) | November to March |
| Keibul Lamjao National Park | Northeast (Manipur) | November to March |
`,
    relatedTripSlug: "orchha-bundelkhand-heritage",
    tags: ["wildlife", "national-parks", "safari", "india-travel", "seasonal-guide", "tigers"],
    readingTime: 10,
    _createdAt: "2026-09-20T08:00:00Z",
    _updatedAt: "2026-09-20T08:00:00Z",
  },
  {
    _id: "seed-005",
    slug: "10-best-beaches-in-india-best-time-to-visit",
    title: "10 Best Beaches in India (and the Best Time to Visit Each)",
    category: "seasonal-advisory",
    excerpt:
      "From Andaman's powder-white silica sands and Goa's sheltered crescent coves to Kerala's dramatic laterite cliffs and Gujarat's Blue Flag waters — a complete coast-by-coast guide with monsoon timing and practical travel tips.",
    body: `India's 7,500-kilometer coastline spans three major bodies of water: the Arabian Sea to the west, the Bay of Bengal to the east, and the Indian Ocean to the south. Along this vast perimeter lie radically diverse shores — from sheer red laterite cliffs and serene coconut lagoons to windswept sand spits, remote coral atolls, and certified Blue Flag sanctuaries. Because two distinct monsoon cycles dictate weather across opposing shores, knowing which coast is dry, calm, and swimmable during any given month is key to a memorable seaside escape.

---

### 1. Radhanagar Beach — Havelock Island (Swaraj Dweep), Andaman & Nicobar

Ranked among Asia's finest shores, Radhanagar (Beach No. 7) unfurls as an expansive crescent of white silica sand backed by ancient Mahua trees.

- **Distinctive Features:** Secluded tropical paradise, crystal-clear turquoise waters, gentle surf for swimming, and epic western sunsets without motorized jet skis.
- **Best Time to Visit:** November to April (clear skies, minimal swells, and prime diving visibility; avoid May–September monsoons).
- **Practical Tip:** Take a catamaran (Makruzz/Nautika) from Port Blair to Havelock (2 hours). Stay near Vijaynagar Beach and rent a scooter for Radhanagar.

### 2. Palolem Beach — Canacona, South Goa

A postcard-perfect 1.6-kilometer crescent bay cradled between rocky headlands and shaded by leaning coconut palms.

- **Distinctive Features:** Laid-back bohemian beach life, calm swimming waters, paddleboarding, sea-kayaking to Butterfly Island, and silent headphone parties.
- **Best Time to Visit:** November to March (warm, sunny 28°C–32°C days; beach huts dismantle completely during June–September monsoons).
- **Practical Tip:** Canacona rail station is 3 km away; Dabolim Airport is 60 km. Reserve beach-facing wooden huts on the quieter southern end well ahead.

### 3. Varkala Beach (Papanasam) — Kerala

A dramatic geological marvel where sheer red laterite cliffs plunge directly into golden sands bordering the Arabian Sea.

- **Distinctive Features:** Bohemian clifftop promenade, natural mineral springs, ancestral bathing rituals (*Papanasam*), Ayurveda centers, and clifftop yoga cafes.
- **Best Time to Visit:** October to March (crisp skies and swimmable waters; heavy monsoon surf from June to August swallows the beach below).
- **Practical Tip:** Varkala Sivagiri rail station is 4 km away; Trivandrum Airport is 45 km south. Book cliff-edge guesthouses along the tranquil North Cliff.

### 4. Om Beach — Gokarna, Karnataka

Named for its natural resemblance to the sacred 'ॐ' symbol, formed by two curved crescent bays divided by rugged rocky headlands.

- **Distinctive Features:** Spiritual yet rugged backpacker haven, scenic cliffside coastal trekking to Half Moon and Paradise beaches, and beachside seafood cafes.
- **Best Time to Visit:** October to March (clear dry days and gentle surf; May is intensely humid; June–September brings rough seas).
- **Practical Tip:** Gokarna Road station is 9 km away; Dabolim Airport is 140 km north. From the Om Beach parking area, take a 10-minute downhill footpath to the sand.

### 5. Dhanushkodi Beach & Arichal Munai — Rameswaram, Tamil Nadu

A ghost town on the windswept eastern tip of Pamban Island, destroyed during the catastrophic 1964 cyclone.

- **Distinctive Features:** Haunting ruins (church, railway station), mythic terminal point of *Ram Setu*, and the visual convergence of the Bay of Bengal and Indian Ocean.
- **Best Time to Visit:** October to February (mild 22°C–28°C temperatures and pleasant sea breezes; April to June is searing with blowing sand).
- **Practical Tip:** Fly to Madurai (175 km) or train to Rameswaram. A paved road runs to Arichal Munai (open 6 AM–6 PM). Stay in Rameswaram town; no lodging exists at Dhanushkodi.

### 6. Kashid Beach — Raigad, Maharashtra (Konkan Coast)

A three-kilometer expanse of silvery-white sand sheltered by whistling casuarina groves on the northern Konkan coastline.

- **Distinctive Features:** Energetic surf for boogie boarding and water sports, uncrowded coastal strolls, fresh Malvani seafood, and proximity to Murud-Janjira sea fort.
- **Best Time to Visit:** October to March (crisp winter coastal air and manageable waves; monsoons bring dangerous undertows).
- **Practical Tip:** Board the Ro-Ro car ferry from Mumbai (Bhaucha Dhakka) to Mandwa jetty, followed by a 1.5-hour drive via Alibaug. Choose homestays near the southern end.

### 7. Shivrajpur Beach — Dwarka, Gujarat

A pristine Blue Flag-certified eco-beach on the Saurashtra coast meeting stringent international water quality and environmental standards.

- **Distinctive Features:** Spotless white sand, calm shallow turquoise waters, frequent sightings of wild bottlenose dolphins, and family-friendly swimming.
- **Best Time to Visit:** October to March (gentle sunshine and comfortable 20°C–28°C temperatures; summers bring dry heat over 40°C).
- **Practical Tip:** Located 12 km from Dwarka pilgrimage town; Jamnagar Airport is 140 km away. A nominal fee (~₹30) covers solar showers and changing facilities.

### 8. Marari Beach — Mararikulam, Kerala

A tranquil fishing village shoreline framed by endless coconut palm groves, situated just 14 km from the Alleppey backwaters.

- **Distinctive Features:** Serene seclusion with zero commercial shacks or noisy water sports, authentic village culture, traditional coir-making, and luxury eco-resorts.
- **Best Time to Visit:** September to March (lush post-monsoon palms, gentle waves, and comfortable weather; June to August receives heavy rains).
- **Practical Tip:** Kochi Airport is 75 km north (2 hours). Combine a 2-night backwater houseboat stay in Alleppey with a 3-night restorative stay at an eco-lodge in Marari.

### 9. Chandrabhaga Beach — Konark / Puri, Odisha

A sacred golden Bay of Bengal shoreline situated just 3 km from the 13th-century UNESCO World Heritage Konark Sun Temple.

- **Distinctive Features:** Celebrated open-ocean sunrise views, rich cultural heritage hosting the annual Magha Saptami festival and Sand Art Festival, and Blue Flag clean zones.
- **Best Time to Visit:** November to February (cool coastal breezes of 16°C–26°C, clear skies, and calm weather; May to October carries cyclonic risks).
- **Practical Tip:** Fly to Bhubaneswar (65 km) or train to Puri (35 km). Drive the scenic Puri–Konark Marine Drive. Strong currents restrict swimming to lifeguarded zones.

### 10. Agonda Beach — Canacona, South Goa

A wide, quiet three-kilometer golden strand designated as a protected nesting sanctuary for endangered Olive Ridley sea turtles.

- **Distinctive Features:** Peaceful sanctuary with a ban on loud music and motorized water sports, beachside yoga schools, sunset walks, and cozy wooden chalets.
- **Best Time to Visit:** November to April (warm, sunny weather and active turtle nesting patrols from Dec–Mar; completely closed during monsoons).
- **Practical Tip:** Located 15 minutes north of Palolem and 65 km from Dabolim Airport. Stay in wooden eco-cottages. Avoid flashlights near the northern turtle hatchery at night.

---

## Monsoon Dynamics: Understanding India's Dual Coastlines

Timing an Indian beach trip requires understanding the two distinct monsoon systems influencing opposite shores:

- **Southwest Monsoon (June to September):** Sweeps in from the Arabian Sea, impacting the entire West Coast (Kerala, Karnataka, Goa, Maharashtra, Gujarat). During these months, western beaches experience rough swells, strong undertows, constant rain, and dismantled beach shacks.
- **Northeast / Retreating Monsoon (October to December):** Strikes the East Coast, particularly Tamil Nadu (including Chennai and Rameswaram) and southern Andhra Pradesh. While Goa and Maharashtra turn dry, sunny, and calm by late October, Tamil Nadu experiences its heaviest rainfall and cyclonic storms.
- **Andaman & Nicobar Islands:** Receive rain from both monsoons, making November through April the only reliable window for calm seas and scuba diving.
- **Traveler's Rule of Thumb:** From November to March, the West Coast, Andamans, and Odisha enjoy optimal dry weather. In September and October, Kerala and Gujarat clear up weeks earlier than Tamil Nadu.

---

## Quick Reference: Beaches → Best Months

| Beach | Coastline / State | Best Months to Visit |
|---|---|---|
| Radhanagar Beach | Havelock Island, Andaman & Nicobar | November to April |
| Palolem Beach | South Goa | November to March |
| Varkala Beach (Papanasam) | Kerala (Arabian Sea) | October to March |
| Om Beach | Gokarna, Karnataka | October to March |
| Dhanushkodi Beach | Rameswaram, Tamil Nadu | October to February |
| Kashid Beach | Raigad, Maharashtra (Konkan) | October to March |
| Shivrajpur Beach | Dwarka, Gujarat | October to March |
| Marari Beach | Mararikulam, Kerala | September to March |
| Chandrabhaga Beach | Konark / Puri, Odisha | November to February |
| Agonda Beach | South Goa | November to April |
`,
    relatedTripSlug: "goa-beyond-beaches",
    tags: ["beaches", "coastal-india", "andaman", "goa", "kerala", "seasonal-guide"],
    readingTime: 8,
    _createdAt: "2026-09-22T08:00:00Z",
    _updatedAt: "2026-09-22T08:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// CRUD helpers
// ---------------------------------------------------------------------------

/** Seed any missing starter notes into Redis */
async function ensureSeeded(): Promise<void> {
  try {
    for (const note of SEED_NOTES) {
      const exists = await redis.sismember("journal:index", note.slug);
      if (!exists) {
        await redis.sadd("journal:index", note.slug);
        await redis.set(`journal:${note.slug}`, JSON.stringify(note), TTL);
      }
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
