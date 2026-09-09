// Mock queries module relying on DEMO_TRIPS + Redis-persisted admin trips
import type { Trip, Author } from "./types";
import { redis } from "./redis";

// --- Demo data fallback (used when Sanity is not yet configured) ---
export const DEMO_TRIPS: Trip[] = [
  {
    _id: "trip-leh-ladakh-9-days",
    title: "Leh Ladakh — Land of High Passes",
    slug: "leh-ladakh-9-days",
    excerpt:
      "A 9-day odyssey through the world's highest motorable roads — Khardung La, Pangong Tso's ever-changing blue, Nubra Valley's sand dunes and Bactrian camels, Magnetic Hill, and ancient monasteries perched on cliff faces. Leh at 3,524 m is unlike anywhere else on Earth.",
    tags: ["Adventure", "Road Trip", "India", "Himalayas", "Ladakh", "High Altitude", "Motorcycle", "Monasteries", "Mountains"],
    country: "India",
    startDate: "2026-07-01",
    endDate: "2026-07-09",
    bestSuggestedMonth: "June – September",
    status: "published",
    viewCount: 0,
    totalBudget: 55000,
    currency: "INR",
    tripType: "Adventure",
    readingTime: 14,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "ll-day1",
        dayNumber: 1,
        title: "Arrive in Leh — Acclimatise & Explore",
        date: "2026-07-01",
        summary: "Land in Leh, the 'Moon Land' at 3,524 m, and spend the day resting and gently exploring Leh Market and the iconic Shanti Stupa at sunset to acclimatise before the high-altitude days ahead.",
        activities: [
          {
            _key: "ll1a",
            title: "Fly into Leh Kushok Bakula Rimpochhe Airport",
            description: "Morning flight from Delhi (~1.5 hrs). Keep the entire first day for complete rest — no strenuous activities. Altitude sickness risk is real; drink 3–4 litres of water.",
            location: { name: "Leh Airport (IXL)", lat: 34.1359, lng: 77.5465 },
            time: "09:00 AM",
            type: "transport",
            notes: "Do NOT rush up stairs or carry heavy bags on arrival day. Acclimatise strictly.",
          },
          {
            _key: "ll1b",
            title: "Rest & Light Lunch at Leh Market",
            description: "Walk through the main bazaar at a slow pace. Try Tibetan butter tea (gur gur chai) and thukpa at a local café.",
            location: { name: "Leh Main Bazaar", lat: 34.1642, lng: 77.5849 },
            time: "01:00 PM",
            type: "food",
            notes: "Eat light — avoid alcohol completely for the first 48 hrs.",
          },
          {
            _key: "ll1c",
            title: "Leh Palace Visit",
            description: "9-storey palace of the Namgyal dynasty (1553 AD) towering over the old city. Easy 15-min walk from the market. Entry ₹100 pp.",
            location: { name: "Leh Palace", lat: 34.1678, lng: 77.5843 },
            time: "03:30 PM",
            type: "sightseeing",
            notes: "Wear warm layers — temperatures drop sharply after 4 PM.",
          },
          {
            _key: "ll1d",
            title: "Sunset at Shanti Stupa",
            description: "White-domed peace pagoda with the finest 360° panoramic views of the Indus Valley, Leh city, and surrounding peaks. 500 steps from the road.",
            location: { name: "Shanti Stupa, Leh", lat: 34.1669, lng: 77.5711 },
            time: "06:00 PM",
            type: "sightseeing",
          },
          {
            _key: "ll1e",
            title: "Dinner & Check-in at Leh Hotel",
            description: "Try Skyu (Ladakhi pasta stew), momos, or chhang (local barley beer — only after day 2). Overnight in Leh.",
            location: { name: "Leh", lat: 34.1642, lng: 77.5849 },
            time: "08:00 PM",
            type: "accommodation",
            notes: "Recommended guesthouses: The Grand Dragon Ladakh, Stok Palace Heritage Hotel, or Nimmu House.",
          },
        ],
      },
      {
        _key: "ll-day2",
        dayNumber: 2,
        title: "Leh Monastery Circuit — Thiksey, Hemis & Stok Palace",
        date: "2026-07-02",
        summary: "A gentle half-day monastery circuit to continue acclimatisation — the towering Thiksey Monastery resembling the Potala Palace, the largest monastery in Ladakh at Hemis, and the royal Stok Palace museum.",
        activities: [
          {
            _key: "ll2a",
            title: "Morning at Thiksey Monastery",
            description: "The most photographed monastery in Ladakh, modelled on Lhasa's Potala Palace. 12-storey complex with a 15-m Maitreya Buddha statue inside. Best at 6 AM for morning puja.",
            location: { name: "Thiksey Monastery", lat: 33.9672, lng: 77.6678 },
            time: "07:00 AM",
            type: "sightseeing",
            notes: "Entry ₹50 pp. Morning prayers at 6:30 AM — a deeply serene experience.",
          },
          {
            _key: "ll2b",
            title: "Breakfast at Thiksey Monastery Café",
            description: "Hot porridge, Tibetan bread with butter, and a bowl of thukpa at the monastery's own café — with sweeping valley views.",
            time: "09:00 AM",
            type: "food",
          },
          {
            _key: "ll2c",
            title: "Hemis Monastery",
            description: "Largest and wealthiest monastery in Ladakh (17th century). Houses rare thangkas, stupas, and statues. The Hemis Festival (June/July) draws thousands.",
            location: { name: "Hemis Monastery", lat: 33.9126, lng: 77.6963 },
            time: "11:00 AM",
            type: "sightseeing",
            notes: "Entry ₹100 pp. Photography inside the main shrine is not permitted.",
          },
          {
            _key: "ll2d",
            title: "Rancho's School (Druk Padma Karpo School)",
            description: "Made famous by the Bollywood film '3 Idiots' — a quick photo stop with the school building and Indus Valley backdrop.",
            location: { name: "Druk Padma Karpo School, Shey", lat: 34.0145, lng: 77.6278 },
            time: "01:30 PM",
            type: "activity",
          },
          {
            _key: "ll2e",
            title: "Stok Palace Museum",
            description: "11th-century royal palace of the Namgyal dynasty, still the royal residence. Museum houses royal thrones, armour, and ancient artefacts. ₹100 pp entry.",
            location: { name: "Stok Palace", lat: 34.0858, lng: 77.5803 },
            time: "03:00 PM",
            type: "sightseeing",
          },
          {
            _key: "ll2f",
            title: "Dinner in Leh — Tibetan Kitchen",
            description: "Try Tibetan Kitchen restaurant for butter chicken, momos, and tsampa porridge. Warm interior, great for a slow dinner.",
            location: { name: "Leh", lat: 34.1642, lng: 77.5849 },
            time: "07:30 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "ll-day3",
        dayNumber: 3,
        title: "Leh → Khardung La → Nubra Valley",
        date: "2026-07-03",
        summary: "Cross the world's highest motorable road — Khardung La at 5,359 m — and descend into the remote Nubra Valley, a high-altitude desert with sand dunes, Bactrian camels, and the riverside village of Hunder.",
        activities: [
          {
            _key: "ll3a",
            title: "Depart Leh for Khardung La (~40 km, 2 hrs)",
            description: "Fill tank in Leh — last fuel station before Nubra. Inner Line Permit mandatory (collect from DC Office, Leh). Start early to avoid afternoon clouds.",
            location: { name: "Leh", lat: 34.1642, lng: 77.5849 },
            time: "07:00 AM",
            type: "transport",
            notes: "Inner Line Permit is required for Nubra Valley — carry passport/Aadhaar copies.",
          },
          {
            _key: "ll3b",
            title: "Khardung La Pass — World's Highest Motorable Road",
            description: "At 5,359 m, Khardung La offers panoramic views of the Karakoram and Ladakh ranges. Hot tea and Maggi at the military canteen. Keep your stop to 20–30 minutes maximum.",
            location: { name: "Khardung La Pass", lat: 34.2739, lng: 77.6027 },
            time: "09:00 AM",
            type: "sightseeing",
            notes: "Do NOT stay long — AMS risk at 5,359 m. Take slow deep breaths. No rushing.",
          },
          {
            _key: "ll3c",
            title: "Descend to Nubra Valley — Hunder Village",
            description: "A dramatic 50 km descent through hairpin bends into the green Shyok-Nubra valley. Stop at Diskit Monastery (Ladakh's oldest, ~1420 AD) en route.",
            location: { name: "Diskit Monastery, Nubra", lat: 34.5616, lng: 77.5848 },
            time: "11:30 AM",
            type: "transport",
          },
          {
            _key: "ll3d",
            title: "Lunch at Diskit",
            description: "Dal, rice, and chutney at a roadside dhaba in Diskit village — first proper meal in the valley.",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "ll3e",
            title: "Bactrian Camel Ride at Hunder Sand Dunes",
            description: "The cold desert of Nubra has white sand dunes and the rare double-humped Bactrian camels — a surreal sight with snowcapped peaks in the background.",
            location: { name: "Hunder Sand Dunes, Nubra Valley", lat: 34.5817, lng: 77.4861 },
            time: "03:00 PM",
            type: "activity",
            notes: "Camel ride ~₹250 per person for 10-15 minutes.",
          },
          {
            _key: "ll3f",
            title: "Overnight at Hunder — Camp or Guesthouse",
            description: "Stay in a Swiss tent camp or guesthouse near the dunes. Bonfire and stargazing at night — one of India's darkest skies.",
            location: { name: "Hunder, Nubra Valley", lat: 34.5817, lng: 77.4861 },
            time: "07:00 PM",
            type: "accommodation",
            notes: "Recommended: Mystic Meadows Camp or Himalayan Ecotourism Camp.",
          },
        ],
      },
      {
        _key: "ll-day4",
        dayNumber: 4,
        title: "Nubra Valley — Turtuk Village (Indo-Pak Border)",
        date: "2026-07-04",
        summary: "Drive to Turtuk — India's northernmost village, formerly part of Pakistan until 1971 — a lush apricot orchard village at the foot of the Karakoram range, with a warm Balti culture and sweeping views toward Pakistan-occupied Kashmir.",
        activities: [
          {
            _key: "ll4a",
            title: "Drive to Turtuk (~90 km, 3 hrs from Hunder)",
            description: "The road follows the Shyok river through stunning narrow gorges. Thang and Tyakshi are the last villages — Turtuk sits right on the LOC.",
            time: "08:00 AM",
            type: "transport",
            notes: "Indian nationals only — carry original ID. No foreign nationals permitted.",
          },
          {
            _key: "ll4b",
            title: "Turtuk Village Walk & Balti Culture",
            description: "Walk through the terraced apricot and walnut gardens. Visit the Balti heritage house and interact with the warm Balti community. The village offers a peek into Karakoram culture unique in India.",
            location: { name: "Turtuk Village", lat: 34.8464, lng: 76.8397 },
            time: "11:30 AM",
            type: "sightseeing",
          },
          {
            _key: "ll4c",
            title: "Lunch in Turtuk — Balti Cuisine",
            description: "Try local Balti food — apricot soup, tsampa bread, and dried apricots. Homestay kitchens offer the most authentic experience.",
            time: "01:00 PM",
            type: "food",
            notes: "Buy dried apricots and apricot oil as souvenirs — exceptionally good quality.",
          },
          {
            _key: "ll4d",
            title: "Return to Hunder / Diskit — Evening Sunset",
            description: "Drive back (~3 hrs) and watch the sunset paint the sand dunes and Karakoram peaks in amber and rose gold.",
            location: { name: "Diskit, Nubra Valley", lat: 34.5616, lng: 77.5848 },
            time: "04:00 PM",
            type: "transport",
          },
          {
            _key: "ll4e",
            title: "Second Night in Nubra",
            description: "Rest in Hunder or Diskit. Dinner of trout fish (local specialty) and yak cheese at the guesthouse.",
            time: "07:30 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "ll-day5",
        dayNumber: 5,
        title: "Nubra → Shyok Valley → Pangong Tso",
        date: "2026-07-05",
        summary: "Take the newer Shyok route (bypassing Khardung La) from Nubra to Pangong Tso — a 160 km drive through the remote Shyok Valley with a grand finale arrival at the world-famous Pangong Lake at 4,350 m.",
        activities: [
          {
            _key: "ll5a",
            title: "Depart Nubra via Shyok Valley Route (~160 km, 5–6 hrs)",
            description: "The Shyok-Pangong direct route avoids Khardung La. Road passes through Agham, Shyok village, and the Durbuk confluence. Fill fuel in Nubra — no pumps until Pangong.",
            time: "07:30 AM",
            type: "transport",
            notes: "Road can be rough after rain — check road conditions at local guesthouse the night before.",
          },
          {
            _key: "ll5b",
            title: "Durbuk & Chang La area views",
            description: "The drive offers stunning views of the braided Shyok river, red-rock cliffs, and snow peaks. Brief stop at Durbuk village for tea.",
            location: { name: "Durbuk, Shyok Valley", lat: 34.1858, lng: 77.9997 },
            time: "10:00 AM",
            type: "activity",
          },
          {
            _key: "ll5c",
            title: "First Sight of Pangong Tso — 'The Blue Dream'",
            description: "The vivid electric-blue lake at 4,350 m — the first view as you crest the ridge will take your breath away. The lake extends 134 km into Tibet, with ever-shifting shades of blue, teal, and turquoise.",
            location: { name: "Pangong Tso Lake", lat: 33.7617, lng: 78.6394 },
            time: "01:30 PM",
            type: "sightseeing",
            notes: "The 3 Idiots 'bicycle scene' was shot here — at Spangmik near the lake's western shore.",
          },
          {
            _key: "ll5d",
            title: "Lunch & afternoon by Pangong Shore",
            description: "Tsampa and Maggi noodles at a lakeshore café. Spend the golden afternoon walking the shore, photographing the colour changes, and watching migratory birds.",
            time: "02:30 PM",
            type: "food",
          },
          {
            _key: "ll5e",
            title: "Sunset & Overnight at Pangong Lake Camp",
            description: "The sunset turns the lake into liquid gold — one of India's greatest natural spectacles. Stay in a lakeside tent camp for the full experience.",
            location: { name: "Spangmik, Pangong Tso", lat: 33.7617, lng: 78.6394 },
            time: "07:00 PM",
            type: "accommodation",
            notes: "Recommended: The Pangong Retreat, Lake View Camp, or Norbu Camps. Book 2–4 weeks ahead in peak season.",
          },
        ],
      },
      {
        _key: "ll-day6",
        dayNumber: 6,
        title: "Pangong Sunrise → Tso Moriri (via Chang La)",
        date: "2026-07-06",
        summary: "Catch the sunrise on Pangong, cross the high Chang La pass (5,360 m), and drive south to the pristine Tso Moriri lake — the highest lake in Ladakh at 4,522 m, far less visited than Pangong and stunningly remote.",
        activities: [
          {
            _key: "ll6a",
            title: "Sunrise on Pangong Tso (4:30 AM–6:30 AM)",
            description: "The lake turns blood orange, then violet, then deep blue as the sun rises over the Himalayan ridgeline. Bring warm layers — temperatures are -2°C to 5°C at dawn.",
            location: { name: "Pangong Tso Sunrise Point", lat: 33.7617, lng: 78.6394 },
            time: "04:30 AM",
            type: "sightseeing",
          },
          {
            _key: "ll6b",
            title: "Depart Pangong — Cross Chang La Pass",
            description: "Chang La at 5,360 m is the second highest motorable road in the world. Hot tea at the military canteen. Keep stop brief — AMS risk.",
            location: { name: "Chang La Pass", lat: 34.0031, lng: 77.9019 },
            time: "07:30 AM",
            type: "transport",
            notes: "Chang La is snowbound until May. Check conditions with locals before proceeding.",
          },
          {
            _key: "ll6c",
            title: "Lunch at Debring Village",
            description: "Simple dal-rice lunch at a road-side dhaba in Debring before turning south toward Puga Valley and Tso Moriri.",
            time: "12:30 PM",
            type: "food",
          },
          {
            _key: "ll6d",
            title: "Arrive Tso Moriri — Korzok Village",
            description: "The 28 km long Tso Moriri at 4,522 m is a Ramsar Wetland — home to Black-necked Cranes, Tibetan wild ass (kiang), and migratory birds. Far fewer tourists than Pangong.",
            location: { name: "Tso Moriri Lake, Korzok", lat: 32.9081, lng: 78.2998 },
            time: "04:00 PM",
            type: "sightseeing",
            notes: "Inner Line Permit required for Tso Moriri (Rupshu district).",
          },
          {
            _key: "ll6e",
            title: "Overnight at Korzok — Remote Homestay",
            description: "Korzok is Ladakh's highest permanently inhabited village at 4,595 m. Stay in a traditional Ladakhi stone homestay — authentic and warming.",
            location: { name: "Korzok Village, Tso Moriri", lat: 32.9081, lng: 78.2998 },
            time: "06:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "ll-day7",
        dayNumber: 7,
        title: "Tso Moriri → Puga Valley Hot Springs → Leh",
        date: "2026-07-07",
        summary: "Morning walk on Tso Moriri's shores, stop at the geothermal Puga Valley hot springs, cross the Tanglang La pass, and return to Leh on the world-famous Manali-Leh Highway.",
        activities: [
          {
            _key: "ll7a",
            title: "Early Morning Bird Walk at Tso Moriri",
            description: "Spot Black-necked Cranes, Bar-headed Geese, and Brahminy Ducks from the lakeshore before other visitors arrive.",
            location: { name: "Tso Moriri Wetland", lat: 32.9081, lng: 78.2998 },
            time: "05:30 AM",
            type: "activity",
          },
          {
            _key: "ll7b",
            title: "Puga Valley Geothermal Hot Springs",
            description: "Natural sulfuric hot springs at 4,500 m — a rare geological phenomenon in the high Himalayas. A quick dip or foot soak in the warm spring water.",
            location: { name: "Puga Valley Hot Springs", lat: 32.8836, lng: 78.0289 },
            time: "09:00 AM",
            type: "activity",
          },
          {
            _key: "ll7c",
            title: "Tanglang La Pass (5,328 m) — 3rd Highest Motorable Road",
            description: "The spectacular Tanglang La on the Manali-Leh Highway. A brief photostop at the 'Thank God I Made It' board. Views of the barren, moon-like plateau of Changthang.",
            location: { name: "Tanglang La Pass", lat: 33.4744, lng: 77.6136 },
            time: "12:00 PM",
            type: "sightseeing",
          },
          {
            _key: "ll7d",
            title: "Lunch at More Plains (Morey Plains)",
            description: "Vast open plateau at 4,600 m — one of the highest elevated plateaus in the world. Roadside tent café serves hot Maggi, thukpa, and chai.",
            location: { name: "More Plains, Ladakh", lat: 33.5547, lng: 77.6756 },
            time: "01:30 PM",
            type: "food",
          },
          {
            _key: "ll7e",
            title: "Return to Leh via Upshi",
            description: "Complete the dramatic Manali-Leh Highway drive back to Leh along the Indus River. Stop briefly at the Indus-Zanskar confluence near Nimmu.",
            location: { name: "Leh", lat: 34.1642, lng: 77.5849 },
            time: "05:00 PM",
            type: "transport",
          },
          {
            _key: "ll7f",
            title: "Dinner at Leh — Celebration Meal",
            description: "Treat yourself to a proper celebration dinner at Bon Appetit Restaurant or The Tibetan Kitchen — try the yak steak, trout fish, or Ladakhi Thali.",
            time: "07:30 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "ll-day8",
        dayNumber: 8,
        title: "Sham Valley — Alchi, Magnetic Hill & Gurudwara Pathar Sahib",
        date: "2026-07-08",
        summary: "A relaxed final full-day circuit west of Leh — the ancient Alchi Monastery with 1,000-year-old murals, the mysterious Magnetic Hill that appears to pull cars uphill, and the revered Gurudwara Pathar Sahib built by the Mughal army on the Indus Valley highway.",
        activities: [
          {
            _key: "ll8a",
            title: "Drive to Alchi Monastery (~70 km, 1.5 hrs)",
            description: "One of Ladakh's oldest monasteries (c. 1000 AD) — famous for its exquisite Kashmiri-style murals and detailed Dukhang (prayer hall). Not under Gelug school governance.",
            location: { name: "Alchi Monastery", lat: 34.2268, lng: 77.1988 },
            time: "08:30 AM",
            type: "sightseeing",
            notes: "Entry ₹50 pp. Photography inside not permitted — cameras must be left outside.",
          },
          {
            _key: "ll8b",
            title: "Lunch at Alchi — Dzomsa Restaurant",
            description: "Dzomsa is the monastery restaurant cooperative. Try the apricot jam tarts, butter tea, and fresh local bread — a unique experience.",
            time: "11:00 AM",
            type: "food",
          },
          {
            _key: "ll8c",
            title: "Gurudwara Pathar Sahib",
            description: "Sacred Sikh Gurudwara built in 1517 on the Srinagar-Leh highway. Maintained by the Indian Army. Langar (free community kitchen) is always open.",
            location: { name: "Gurudwara Pathar Sahib", lat: 34.1958, lng: 77.4494 },
            time: "01:30 PM",
            type: "sightseeing",
          },
          {
            _key: "ll8d",
            title: "Magnetic Hill — Anti-Gravity Illusion",
            description: "Park your vehicle in neutral at the painted road marking — it appears to roll uphill against gravity due to a compelling visual illusion. A fun 15-minute stop.",
            location: { name: "Magnetic Hill, Leh", lat: 34.2050, lng: 77.4664 },
            time: "02:15 PM",
            type: "activity",
          },
          {
            _key: "ll8e",
            title: "Sangam — Indus-Zanskar River Confluence",
            description: "The dramatic confluence of the Indus and Zanskar rivers — the two colours (greenish-grey Zanskar and grey Indus) run parallel for hundreds of metres before merging.",
            location: { name: "Sangam — Zanskar-Indus Confluence", lat: 34.1917, lng: 77.2814 },
            time: "03:00 PM",
            type: "sightseeing",
          },
          {
            _key: "ll8f",
            title: "Final Evening in Leh — Shopping & Farewell Dinner",
            description: "Last chance to buy Pashmina shawls, Ladakhi thangkas, turquoise jewellery, and local apricot products at the Leh Market. Farewell dinner at Bon Appetit.",
            location: { name: "Leh Main Bazaar", lat: 34.1642, lng: 77.5849 },
            time: "05:00 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "ll-day9",
        dayNumber: 9,
        title: "Leh → Delhi — Departure",
        date: "2026-07-09",
        summary: "Final sunrise views from the hotel rooftop, a last walk through the Leh Market, and a morning flight back to Delhi — carrying memories of the highest roads, bluest lakes, and most remote villages in India.",
        activities: [
          {
            _key: "ll9a",
            title: "Sunrise from Hotel Rooftop",
            description: "Final morning in Leh — watch the sun touch the Stok Kangri peak (6,153 m) as Leh slowly wakes up. Tea and toast on the rooftop.",
            time: "05:30 AM",
            type: "activity",
          },
          {
            _key: "ll9b",
            title: "Morning at Leh Market — Last Purchases",
            description: "Pick up last-minute gifts: local honey, saffron, dried apricots, Pashmina wool, and prayer flags from the Leh Bazaar.",
            location: { name: "Leh Main Bazaar", lat: 34.1642, lng: 77.5849 },
            time: "07:30 AM",
            type: "activity",
          },
          {
            _key: "ll9c",
            title: "Depart Leh for Airport",
            description: "Check-out by 10 AM and drive to the airport (~15 min). Morning flight to Delhi. Ensure you're at the airport 2 hours before departure.",
            location: { name: "Leh Airport (IXL)", lat: 34.1359, lng: 77.5465 },
            time: "10:00 AM",
            type: "transport",
            notes: "Delhi altitude sickness reversal is real — you may feel unusually hungry and energetic after landing.",
          },
        ],
      },
    ],
  },
  {
    _id: "trip-jyotirlinga-pilgrimage",
    title: "Maharashtra & Madhya Pradesh Jyotirlinga Pilgrimage",
    slug: "jyotirlinga-pilgrimage-road-trip",
    excerpt: "Explore the sacred Jyotirlingas of Bhimashankar, Trimbakeshwar, Grishneshwar, Mahakaleshwar and Omkareshwar on a culturally immersive road journey. Experience local cuisine, heritage sites and serene river vistas across two states.",
    tags: ["Pilgrimage", "Road Trip", "India", "Maharashtra", "Madhya Pradesh", "Jyotirlinga"],
    country: "India",
    bestSuggestedMonth: "September",
    status: "published",
    viewCount: 0,
    totalBudget: 25000,
    currency: "INR",
    tripType: "Pilgrimage",
    readingTime: 5,
    _createdAt: "2026-08-31T00:00:00Z",
    _updatedAt: "2026-08-31T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "day1",
        dayNumber: 1,
        title: "Bhimashankar Blessings",
        summary: "Reach Bhimashankar, worship the Jyotirlinga and enjoy the forest backdrop.",
        activities: [
          {
            _key: "1a",
            title: "07:00 AM Depart Mumbai",
            description: "Leave Mumbai in a private vehicle heading north to Bhimashankar (~150 km).",
            notes: "Start early to avoid traffic; carry water bottles.",
            type: "transport"
          },
          {
            _key: "1b",
            title: "09:30 AM Bhimashankar Jyotirlinga Darshan",
            description: "Visit the ancient Bhimashankar Shiva temple perched in the Western Ghats.",
            notes: "Dress modestly; remove shoes before entering the sanctum.",
            location: { name: "Bhimashankar Jyotirlinga, Maharashtra", lat: 19.0728, lng: 73.5370 },
            type: "sightseeing"
          },
          {
            _key: "1c",
            title: "12:30 PM Lunch – Maharashtrian Thali",
            description: "Enjoy a wholesome thali with bhakri, varan, sabzi and solkadhi at Madhurima Dhaba.",
            notes: "Try the local solkadhi for digestion after the temple visit.",
            location: { name: "Madhurima Dhaba, Bhimashankar", lat: 19.0740, lng: 73.5360 },
            type: "food"
          },
          {
            _key: "1d",
            title: "02:00 PM Forest Viewpoint Trek",
            description: "A short guided trek to a viewpoint offering panoramic views of the Bhimashankar forest.",
            notes: "Wear comfortable shoes; carry a light raincoat in September.",
            type: "activity"
          },
          {
            _key: "1e",
            title: "08:00 PM Check in at Bhimashankar Eco Resort",
            description: "Relax in a eco friendly resort near the temple premises.",
            notes: "Reserve beforehand during pilgrimage season.",
            type: "accommodation"
          }
        ]
      },
      {
        _key: "day2",
        dayNumber: 2,
        title: "Trimbakeshwar Trails",
        summary: "Drive to Trimbakeshwar, worship the Jyotirlinga and explore the source of the Godavari.",
        activities: [
          {
            _key: "2a",
            title: "07:30 AM Drive to Trimbakeshwar",
            description: "Travel from Bhimashankar to Trimbakeshwar (~120 km) via NH-48.",
            notes: "Expect a scenic ride through hills; keep an eye on fuel.",
            type: "transport"
          },
          {
            _key: "2b",
            title: "10:30 AM Trimbakeshwar Jyotirlinga Darshan",
            description: "Visit the revered Trimbakeshwar Shiva temple, one of the twelve Jyotirlingas.",
            notes: "Offer a heartfelt puja; the temple opens at 6:00 AM.",
            location: { name: "Trimbakeshwar Jyotirlinga, Nashik", lat: 19.9342, lng: 73.5306 },
            type: "sightseeing"
          },
          {
            _key: "2c",
            title: "01:00 PM Lunch – Pithla Bhakri",
            description: "Savor traditional pithla (gram flour curry) with fresh bhakri at Madhav's Kitchen.",
            notes: "Spicy; pair with a glass of buttermilk to cool the palate.",
            type: "food"
          },
          {
            _key: "2d",
            title: "02:30 PM Brahmagiri Hill Visit",
            description: "Drive up to Brahmagiri Hill, the origin point of the Godavari River.",
            notes: "Great photo spot; stay hydrated at the hilltop.",
            location: { name: "Brahmagiri Hill, Trimbakeshwar", lat: 19.9200, lng: 73.5100 },
            type: "activity"
          },
          {
            _key: "2e",
            title: "07:30 PM Stay at Trimbakeshwar Heritage Resort",
            description: "Evening rest in a heritage styled resort with garden views.",
            notes: "Early check in may be available upon request.",
            type: "accommodation"
          }
        ]
      },
      {
        _key: "day3",
        dayNumber: 3,
        title: "Grishneshwar & Ellora Exploration",
        summary: "Witness Grishneshwar Jyotirlinga and the magnificent Ellora Caves.",
        activities: [
          {
            _key: "3a",
            title: "07:00 AM Depart for Grishneshwar",
            description: "Leave Trimbakeshwar for Grishneshwar (~100 km).",
            notes: "Road passes through scenic valleys; keep a snack handy.",
            type: "transport"
          },
          {
            _key: "3b",
            title: "09:30 AM Grishneshwar Jyotirlinga Darshan",
            description: "Pay homage at the Grishneshwar temple, the last Jyotirlinga in Maharashtra.",
            notes: "It's less crowded in the morning; take a moment for personal prayer.",
            location: { name: "Grishneshwar Jyotirlinga, Ellora", lat: 20.0269, lng: 75.1772 },
            type: "sightseeing"
          },
          {
            _key: "3c",
            title: "12:00 PM Lunch – Zunka Ambadi",
            description: "Enjoy rustic Zunka (spiced gram flour) with ambadi (millet flatbread) at Maharaj Dhaba.",
            notes: "A protein rich meal ideal for the travel day ahead.",
            type: "food"
          },
          {
            _key: "3d",
            title: "01:30 PM Ellora Caves Guided Tour",
            description: "Explore the UNESCO listed rock cut caves of Ellora, a short drive from the temple.",
            notes: "Hire a knowledgeable guide to appreciate the sculptures.",
            location: { name: "Ellora Caves, Aurangabad", lat: 20.0268, lng: 75.1777 },
            type: "activity"
          },
          {
            _key: "3e",
            title: "08:00 PM Overnight at Aurangabad Heritage Hotel",
            description: "Rest in a heritage hotel blending Mughal Maratha architecture.",
            notes: "Book a room with a view of the city skyline.",
            location: { name: "Aurangabad", lat: 19.8762, lng: 75.3433 },
            type: "accommodation"
          }
        ]
      },
      {
        _key: "day4",
        dayNumber: 4,
        title: "Ujjain – Mahakaleshwar Majesty",
        summary: "Long drive to Ujjain, worship Mahakaleshwar and attend the evening Aarti.",
        activities: [
          {
            _key: "4a",
            title: "05:00 AM Depart Aurangabad for Ujjain",
            description: "Early start for a 9 hour drive to Ujjain (~620 km) via NH-52.",
            notes: "Carry light breakfast; plan rest stops in Indore.",
            type: "transport"
          },
          {
            _key: "4b",
            title: "02:00 PM Mahakaleshwar Jyotirlinga Darshan",
            description: "Enter the sacred Mahakaleshwar temple in Ujjain, a pinnacle of Shaivism.",
            notes: "Dress code: no shorts or sleeveless tops; carry a small offering.",
            location: { name: "Mahakaleshwar Jyotirlinga, Ujjain", lat: 23.1828, lng: 75.7682 },
            type: "sightseeing"
          },
          {
            _key: "4c",
            title: "02:30 PM Lunch – Ujjaini Poha",
            description: "Taste the iconic fluffy poha with sev at Madhurima Veg restaurant.",
            notes: "A light, energizing meal after the darshan.",
            type: "food"
          },
          {
            _key: "4d",
            title: "04:30 PM Sandhya Aarti at Mahakaleshwar",
            description: "Participate in the soulful evening aarti with chants and incense.",
            notes: "Arrive early to secure a good spot; keep cameras off during the ritual.",
            location: { name: "Mahakaleshwar Temple Aarti, Ujjain", lat: 23.1828, lng: 75.7682 },
            type: "activity"
          },
          {
            _key: "4e",
            title: "07:30 PM Check in at Ujjain Riverside Hotel",
            description: "Relax at a riverside hotel overlooking the Shipra River.",
            notes: "Enjoy a night walk along the ghats after dinner.",
            location: { name: "Ujjain, Madhya Pradesh", lat: 23.1765, lng: 75.7885 },
            type: "accommodation"
          }
        ]
      },
      {
        _key: "day5",
        dayNumber: 5,
        title: "Omkareshwar River Reverence",
        summary: "Cross the Narmada to Omkareshwar, worship the Jyotirlinga and enjoy a boat ride.",
        activities: [
          {
            _key: "5a",
            title: "08:00 AM Drive to Omkareshwar",
            description: "Leave Ujjain for Omkareshwar (~120 km) via the Narmada bridge.",
            notes: "Scenic route; keep your camera ready for river views.",
            type: "transport"
          },
          {
            _key: "5b",
            title: "12:30 PM Omkareshwar Jyotirlinga Darshan",
            description: "Visit the twin temples on Mandhata Island dedicated to Lord Shiva.",
            notes: "Both the east and west shrines are considered Jyotirlingas; offer prayers at both.",
            location: { name: "Omkareshwar Jyotirlinga, Mandhata Island", lat: 22.2380, lng: 76.1484 },
            type: "sightseeing"
          },
          {
            _key: "5c",
            title: "01:30 PM Lunch – Dal Bati",
            description: "Delight in hearty Dal Bati with ghee and a side of cucumber raita at Omkareshwar Rasoi.",
            notes: "A fulfilling meal before the boat excursion.",
            type: "food"
          },
          {
            _key: "5d",
            title: "03:00 PM Narmada River Boat Ride",
            description: "Take a guided boat cruise around the island to view the temples from the water.",
            notes: "Wear a life vest; the river is gentle in September.",
            location: { name: "Narmada River, Omkareshwar", lat: 22.2350, lng: 76.1500 },
            type: "activity"
          },
          {
            _key: "5e",
            title: "07:00 PM Stay at Narmada View Resort",
            description: "End the pilgrimage with a comfortable stay overlooking the Narmada.",
            notes: "Early check in possible; enjoy a nightcap of fresh coconut water.",
            location: { name: "Narmada View Resort, Omkareshwar", lat: 22.2380, lng: 76.1470 },
            type: "accommodation"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-spiti-valley",
    title: "Spiti Valley — The Cold Desert Odyssey",
    slug: "spiti-valley",
    excerpt:
      "A 10-day self-driven Himalayan road trip from Delhi through Manali, Spiti, Kinnaur, and Shimla — high passes, ancient monasteries, and the cold desert.",
    tags: ["Adventure", "Road Trip", "India", "Himalayas", "Spiti Valley"],
    country: "India",
    startDate: "2026-09-29",
    endDate: "2026-10-08",
    bestSuggestedMonth: "June – September",
    status: "published",
    viewCount: 0,
    totalBudget: 110000,
    currency: "INR",
    tripType: "Adventure",
    readingTime: 15,
    _createdAt: "2026-08-24T00:00:00Z",
    _updatedAt: "2026-08-24T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "day1",
        dayNumber: 1,
        title: "New Delhi → Manali",
        date: "2026-09-29",
        summary: "The long drive north and an acclimatisation night in Manali before the high-pass crossing.",
        activities: [
          {
            _key: "a1",
            title: "Drive to Manali (~530 km)",
            description: "Fill the tank in Delhi; stop for dhaba lunch at Sundernagar or Mandi and reach Manali by evening.",
            type: "transport",
          },
          {
            _key: "a2",
            title: "Fuel and camp check",
            description: "Refuel completely in Manali—the next reliable fuel is 210 km away—and confirm Chandratal camp availability.",
            type: "activity",
          },
          {
            _key: "a3",
            title: "Overnight at Getaway Stays, Manali",
            description: "Acclimatise at 2,050 m before crossing Kunzum Pass.",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "day2",
        dayNumber: 2,
        title: "Manali → Atal Tunnel → Kunzum Pass → Chandratal",
        date: "2026-09-30",
        summary: "The critical high-altitude crossing to Chandratal Lake camp via Atal Tunnel and Kunzum Pass (4,590 m).",
        activities: [
          {
            _key: "b1",
            title: "Cross Atal Tunnel and Kunzum Pass (~120 km)",
            description: "No Rohtang permit is needed. Keep the Kunzum stop brief—20 to 30 minutes maximum.",
            type: "transport",
          },
          {
            _key: "b2",
            title: "Chandratal Lake",
            description: "Visit the crescent lake at 4,300 m.",
            location: { name: "Chandratal Lake", lat: 32.481, lng: 77.617 },
            type: "sightseeing",
          },
          {
            _key: "b3",
            title: "Overnight at Parasol Camps, Chandratal",
            description: "Night temperatures can drop below -10°C; thermals and a sleeping bag are essential.",
            notes: "Start Diamox 24–48 hours beforehand only as medically advised; hydrate aggressively and avoid alcohol.",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "day3",
        dayNumber: 3,
        title: "Chandratal → Losar → Kaza",
        date: "2026-10-01",
        summary: "Descend into Spiti's cold desert, refuel in Kaza, and assess everyone for altitude sickness.",
        activities: [
          {
            _key: "c1",
            title: "Drive via Losar to Kaza (~90 km)",
            description: "Descend gradually from 4,300 m to Kaza at 3,800 m, passing the first major settlement of Losar.",
            type: "transport",
          },
          {
            _key: "c2",
            title: "Fuel, supplies, and AMS check",
            description: "Fill the tank at Kaza's retail pump, explore the market, and collect supplies or a local SIM.",
            notes: "Ensure all four travellers are symptom-free before heading deeper into Spiti.",
            type: "activity",
          },
          {
            _key: "c3",
            title: "Overnight at Sakya Homestay, Kaza",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "day4",
        dayNumber: 4,
        title: "Kaza High Villages Loop",
        date: "2026-10-02",
        summary: "A high-altitude loop through Spiti's remote villages, ending at Ki Monastery.",
        activities: [
          { _key: "d1", title: "Hikkim Post Office", description: "Visit the world's highest post office and send a postcard home.", type: "sightseeing" },
          { _key: "d2", title: "Komik and Langza", description: "Explore one of the world's highest motorable villages and Langza's giant Buddha statue above the fossil-rich plateau.", type: "sightseeing" },
          { _key: "d3", title: "Kibber and Ki Monastery", description: "Pass snow-leopard country at Kibber and visit the 1,000-year-old fortress monastery with panoramic views.", location: { name: "Ki Monastery", lat: 32.319, lng: 78.024 }, type: "sightseeing" },
          { _key: "d4", title: "Overnight at Sakya Homestay, Kaza", description: "Return to Kaza after the ~80 km loop.", type: "accommodation" },
        ],
      },
      {
        _key: "day5",
        dayNumber: 5,
        title: "Kaza → Pin Valley → Mud Village",
        date: "2026-10-03",
        summary: "A short but rugged drive into Pin Valley National Park and the remote village of Mud.",
        activities: [
          { _key: "e1", title: "Drive to Mud Village (~50 km)", description: "Take the rough track through Pin Valley; drive carefully at stream crossings.", type: "transport" },
          { _key: "e2", title: "Pin Valley National Park", description: "Explore snow-leopard and Siberian ibex habitat.", type: "sightseeing" },
          { _key: "e3", title: "Overnight at a Mud Village homestay", description: "Arrange it from Kaza before departure.", notes: "There is zero mobile network. Inform someone of the day plan and carry extra water, food, and warm clothing.", type: "accommodation" },
        ],
      },
      {
        _key: "day6",
        dayNumber: 6,
        title: "Pin Valley → Dhankar → Tabo",
        date: "2026-10-04",
        summary: "Cliff monasteries, a high-altitude lake hike, and a millennium of Buddhist art.",
        activities: [
          { _key: "f1", title: "Drive to Dhankar and Tabo (~100 km)", type: "transport" },
          { _key: "f2", title: "Dhankar Monastery and Lake", description: "See the clifftop monastery above the Spiti-Pin confluence and allow 2–3 hours round trip for the lake hike.", type: "sightseeing" },
          { _key: "f3", title: "Tabo Monastery", description: "Visit India's oldest continuously operating monastery (996 AD) and its cave frescoes.", location: { name: "Tabo Monastery", lat: 32.095, lng: 78.384 }, type: "sightseeing" },
          { _key: "f4", title: "Overnight at Namsay Homestay, Tabo", type: "accommodation" },
        ],
      },
      {
        _key: "day7",
        dayNumber: 7,
        title: "Tabo → Nako → Gue → Kalpa",
        date: "2026-10-05",
        summary: "Lakes, a centuries-old mummy stupa, and Kinner Kailash in alpenglow.",
        activities: [
          { _key: "g1", title: "Drive to Kalpa via Nako and Gue (~150–190 km)", type: "transport" },
          { _key: "g2", title: "Nako Lake and Gue Mummy Stupa", description: "See the high-altitude lake with its island monastery and the naturally mummified Buddhist monk.", type: "sightseeing" },
          { _key: "g3", title: "Kalpa sunset", description: "Refuel at Reckong Peo or Tapri, then watch Kinner Kailash (6,050 m) glow at sunset.", location: { name: "Kalpa, Kinnaur", lat: 31.539, lng: 78.263 }, type: "sightseeing" },
          { _key: "g4", title: "Overnight at Akshit Homestay, Kalpa", type: "accommodation" },
        ],
      },
      {
        _key: "day8",
        dayNumber: 8,
        title: "Kalpa → Roghi Village → Chitkul",
        date: "2026-10-06",
        summary: "Follow the Baspa Valley to India's last inhabited village near the Indo-Tibetan border.",
        activities: [
          { _key: "h1", title: "Drive to Chitkul via Roghi (~65 km)", description: "Stop at Roghi's hanging bridge and apple orchards.", type: "transport" },
          { _key: "h2", title: "Chitkul and Baspa River", description: "Explore the last inhabited border village and its crystal-clear glacial river.", location: { name: "Chitkul, Kinnaur", lat: 31.351, lng: 78.438 }, type: "sightseeing" },
          { _key: "h3", title: "Overnight at RR Homestay, Chitkul", notes: "Foreign nationals should check current border-area permit requirements.", type: "accommodation" },
        ],
      },
      {
        _key: "day9",
        dayNumber: 9,
        title: "Chitkul → Sangla → Narkanda",
        date: "2026-10-07",
        summary: "Leave the cold desert behind for Sangla's greenery, the Sutlej gorge, and Hatu Peak.",
        activities: [
          { _key: "i1", title: "Drive to Narkanda via Sangla (~160–200 km)", description: "Follow the dramatic Sutlej river gorge through Kinnaur.", type: "transport" },
          { _key: "i2", title: "Sangla Valley and Hatu Peak", description: "Enjoy the lush valley contrast and 360° Himalayan views from accessible Hatu Peak near Narkanda.", location: { name: "Hatu Peak, Narkanda", lat: 31.272, lng: 77.502 }, type: "sightseeing" },
          { _key: "i3", title: "Overnight at Hatu Valley Homestay, Narkanda", type: "accommodation" },
        ],
      },
      {
        _key: "day10",
        dayNumber: 10,
        title: "Narkanda → Shimla → Chandigarh → New Delhi",
        date: "2026-10-08",
        summary: "The all-weather homeward run, descending through Shimla and the plains to Delhi.",
        activities: [
          { _key: "j1", title: "Drive home (~350–400 km)", description: "Have breakfast in Shimla, follow NH-5 to Chandigarh, and stop for lunch in Chandigarh or Ambala.", type: "transport" },
          { _key: "j2", title: "Arrive in New Delhi", description: "Aim for an evening arrival after 10 days and more than 1,800 km.", location: { name: "New Delhi", lat: 28.614, lng: 77.209 }, type: "activity" },
        ],
      },
    ],
  },
  {
    _id: "trip-mysore-coorg-wayanad-ooty",
    title: "Mysore, Coorg, Wayanad, Ooty & Coonoor Road Trip",
    slug: "mysore-coorg-wayanad-ooty",
    excerpt:
      "A scenic South India circuit from Pune through Mysore, Coorg, Wayanad, Ooty, and Coonoor—palaces, safaris, coffee country, caves, and the Nilgiris.",
    tags: ["Road Trip", "India", "South India", "Karnataka", "Kerala", "Mysore", "Ooty", "Coorg", "Culture", "Food", "Mountains", "Nature"],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Road Trip",
    readingTime: 10,
    _createdAt: "2026-08-24T00:00:00Z",
    _updatedAt: "2026-08-24T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "south-day1",
        dayNumber: 1,
        title: "Pune → Mysore",
        summary: "Start the circuit with the long Pune-to-Mysore drive, approximately 850 km on the route map.",
        activities: [
          { _key: "s1a", title: "Drive from Pune to Mysore (~850 km)", description: "Begin early and plan the drive around rest and meal breaks.", type: "transport" },
          { _key: "s1b", title: "Fuel stop at Hubli", description: "One of the route map's listed fuel stops—top up before continuing south.", type: "activity" },
          { _key: "s1c", title: "Mysore Palace", description: "Make Mysore Palace the headline stop on arrival.", type: "sightseeing" },
          { _key: "s1d", title: "Overnight in Mysore", description: "Rest before the shorter Coorg leg.", type: "accommodation" },
        ],
      },
      {
        _key: "south-day2",
        dayNumber: 2,
        title: "Mysore → Coorg",
        summary: "A roughly 120 km transition from Mysore to Coorg, with wildlife and coffee-country highlights.",
        activities: [
          { _key: "s2a", title: "Drive from Mysore to Coorg (~120 km)", type: "transport" },
          { _key: "s2b", title: "Bandipur Safari", description: "Plan a safari stop as featured on the route map.", type: "sightseeing" },
          { _key: "s2c", title: "Fuel stop at Gonikoppal", description: "Top up at the listed fuel stop before settling into Coorg.", type: "activity" },
          { _key: "s2d", title: "Overnight in Coorg", type: "accommodation" },
        ],
      },
      {
        _key: "south-day3",
        dayNumber: 3,
        title: "Explore Coorg",
        summary: "Spend a slower day among Coorg's waterfalls, coffee plantations, and cultural landmarks.",
        activities: [
          { _key: "s3a", title: "Abbey Falls", description: "Visit the waterfall highlighted on the route map.", type: "sightseeing" },
          { _key: "s3b", title: "Coffee plantations", description: "Explore one of the route map's featured hidden gems.", type: "activity" },
          { _key: "s3c", title: "Golden Temple", description: "Include the Golden Temple, listed among the hidden gems.", type: "sightseeing" },
          { _key: "s3d", title: "Second night in Coorg", type: "accommodation" },
        ],
      },
      {
        _key: "south-day4",
        dayNumber: 4,
        title: "Coorg → Wayanad",
        summary: "Continue into Kerala on the approximately 130 km Coorg-to-Wayanad leg.",
        activities: [
          { _key: "s4a", title: "Drive from Coorg to Wayanad (~130 km)", type: "transport" },
          { _key: "s4b", title: "Fuel stop at Gundlupet", description: "Refuel at one of the listed stops along the route.", type: "activity" },
          { _key: "s4c", title: "Edakkal Caves", description: "Explore the cave complex featured on the route map.", type: "sightseeing" },
          { _key: "s4d", title: "Overnight in Wayanad", type: "accommodation" },
        ],
      },
      {
        _key: "south-day5",
        dayNumber: 5,
        title: "Wayanad → Ooty",
        summary: "Climb from Wayanad into the Nilgiris on the approximately 110 km Wayanad-to-Ooty route.",
        activities: [
          { _key: "s5a", title: "Drive from Wayanad to Ooty (~110 km)", type: "transport" },
          { _key: "s5b", title: "Ooty Lake", description: "Enjoy the lakeside stop shown among the route highlights.", type: "sightseeing" },
          { _key: "s5c", title: "Overnight in Ooty", notes: "Carry light woollens and rain gear, as recommended on the route map.", type: "accommodation" },
        ],
      },
      {
        _key: "south-day6",
        dayNumber: 6,
        title: "Ooty → Coonoor",
        summary: "A relaxed Nilgiris day, centred on Coonoor and Toda culture.",
        activities: [
          { _key: "s6a", title: "Drive from Ooty to Coonoor", description: "Continue south from Ooty to Coonoor on the mapped circuit.", type: "transport" },
          { _key: "s6b", title: "Toda Village", description: "Visit the Toda Village featured as a hidden gem.", type: "sightseeing" },
          { _key: "s6c", title: "Overnight in Coonoor", notes: "Pack snacks and essential medicines for the road, as noted on the route map.", type: "accommodation" },
        ],
      },
      {
        _key: "south-day7",
        dayNumber: 7,
        title: "Coonoor → Pune",
        summary: "Complete the return leg from Coonoor to Pune; the image does not specify a distance for this final route.",
        activities: [
          { _key: "s7a", title: "Begin the return drive to Pune", description: "Plan breaks around the long homeward journey.", type: "transport" },
          { _key: "s7b", title: "Fuel stop at Salem", description: "Use the final listed fuel stop to prepare for the return route.", type: "activity" },
          { _key: "s7c", title: "Arrive in Pune", description: "Finish the Mysore–Coorg–Wayanad–Ooty–Coonoor circuit.", type: "activity" },
        ],
      },
    ],
  },
  {
    _id: "trip-rajasthan",
    title: "Rajasthan — The Desert Kingdom",
    slug: "rajasthan-desert-kingdom",
    excerpt:
      "Forts, palaces, camel dunes, and the most vivid colors you'll ever see — a royal journey through India's legendary desert state.",
    tags: ["Culture", "Heritage", "Rajasthan", "India", "Desert"],
    country: "India",
    startDate: "2023-11-10",
    endDate: "2023-11-19",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 35000,
    currency: "INR",
    tripType: "Cultural",
    readingTime: 10,
    _createdAt: "2023-12-01T00:00:00Z",
    _updatedAt: "2023-12-01T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "rajasthan-day1",
        dayNumber: 1,
        title: "Arrive in Jaipur → Pink City Evening",
        date: "2023-11-10",
        summary: "Begin in Jaipur with an easy first day in the historic centre and a sunset introduction to the Pink City.",
        activities: [
          { _key: "r1a", title: "Arrive and check in at Jaipur", description: "Keep arrival day flexible and arrange local transport for the city circuit.", location: { name: "Jaipur", lat: 26.9124, lng: 75.7873 }, type: "accommodation" },
          { _key: "r1b", title: "Hawa Mahal and Bapu Bazaar", description: "See the iconic façade, then browse the old-city lanes and handicraft markets.", location: { name: "Hawa Mahal", lat: 26.9239, lng: 75.8267 }, type: "sightseeing" },
          { _key: "r1c", title: "Sunset at Nahargarh Fort", description: "Take in a wide view of Jaipur as the city lights come on.", location: { name: "Nahargarh Fort", lat: 26.9373, lng: 75.815 }, type: "sightseeing" },
          { _key: "r1d", title: "Overnight in Jaipur", notes: "Use licensed guides and agree taxi or auto fares before setting off.", type: "accommodation" },
        ],
      },
      {
        _key: "rajasthan-day2",
        dayNumber: 2,
        title: "Amer → Jaigarh → Jaipur Heritage Core",
        date: "2023-11-11",
        summary: "Dedicate a full day to Jaipur's hill forts, royal collections, and astronomical heritage.",
        activities: [
          { _key: "r2a", title: "Amer Fort", description: "Start early to explore the palace complex before the busiest period.", location: { name: "Amer Fort", lat: 26.9855, lng: 75.8513 }, type: "sightseeing" },
          { _key: "r2b", title: "Jaigarh Fort", description: "Continue to the hilltop fort for ramparts and views across Amer.", location: { name: "Jaigarh Fort", lat: 26.9855, lng: 75.8453 }, type: "sightseeing" },
          { _key: "r2c", title: "City Palace and Jantar Mantar", description: "Return to central Jaipur for royal collections and the historic observatory.", location: { name: "City Palace, Jaipur", lat: 26.9258, lng: 75.8237 }, type: "sightseeing" },
          { _key: "r2d", title: "Jaipur food walk", description: "Finish with Rajasthani specialities in the old city.", type: "food" },
        ],
      },
      {
        _key: "rajasthan-day3",
        dayNumber: 3,
        title: "Jaipur → Bikaner",
        date: "2023-11-12",
        summary: "Head into the desert state via Bikaner, known for its imposing fort and old-city character.",
        activities: [
          { _key: "r3a", title: "Drive from Jaipur to Bikaner", description: "Leave after breakfast and keep a buffer for highway stops and check-in.", type: "transport" },
          { _key: "r3b", title: "Junagarh Fort", description: "Explore Bikaner's richly decorated fort complex in the afternoon.", location: { name: "Junagarh Fort, Bikaner", lat: 28.0229, lng: 73.3178 }, type: "sightseeing" },
          { _key: "r3c", title: "Old Bikaner evening", description: "Walk the old-city lanes and sample local snacks.", type: "food" },
          { _key: "r3d", title: "Overnight in Bikaner", type: "accommodation" },
        ],
      },
      {
        _key: "rajasthan-day4",
        dayNumber: 4,
        title: "Bikaner → Jaisalmer",
        date: "2023-11-13",
        summary: "Travel west into the Thar Desert and arrive in the Golden City.",
        activities: [
          { _key: "r4a", title: "Drive from Bikaner to Jaisalmer", description: "Carry water and snacks for the long desert-road day.", type: "transport" },
          { _key: "r4b", title: "Gadisar Lake at sunset", description: "Take a gentle first look at Jaisalmer around the historic reservoir.", location: { name: "Gadisar Lake", lat: 26.912, lng: 70.9229 }, type: "sightseeing" },
          { _key: "r4c", title: "Overnight in Jaisalmer", description: "Rest before a full day inside the fort and old city.", type: "accommodation" },
        ],
      },
      {
        _key: "rajasthan-day5",
        dayNumber: 5,
        title: "Jaisalmer Fort → Havelis → Bada Bagh",
        date: "2023-11-14",
        summary: "Explore the living fort, intricate merchant homes, and desert-era cenotaphs.",
        activities: [
          { _key: "r5a", title: "Jaisalmer Fort", description: "Walk the living fort's lanes, temples, and viewpoints early in the day.", location: { name: "Jaisalmer Fort", lat: 26.9123, lng: 70.912 }, type: "sightseeing" },
          { _key: "r5b", title: "Patwon Ki Haveli and Salim Singh Ki Haveli", description: "See Jaisalmer's finely carved merchant architecture.", location: { name: "Patwon Ki Haveli", lat: 26.9157, lng: 70.9083 }, type: "sightseeing" },
          { _key: "r5c", title: "Bada Bagh sunset", description: "Visit the cenotaph complex outside the city as the sandstone turns gold.", location: { name: "Bada Bagh", lat: 26.9628, lng: 70.8708 }, type: "sightseeing" },
          { _key: "r5d", title: "Second night in Jaisalmer", type: "accommodation" },
        ],
      },
      {
        _key: "rajasthan-day6",
        dayNumber: 6,
        title: "Jaisalmer → Kuldhara → Sam Sand Dunes",
        date: "2023-11-15",
        summary: "Move from the city into the desert for a dunes sunset and overnight camp experience.",
        activities: [
          { _key: "r6a", title: "Kuldhara village", description: "Stop at the abandoned village on the route toward the dunes.", location: { name: "Kuldhara", lat: 26.9202, lng: 70.713 }, type: "sightseeing" },
          { _key: "r6b", title: "Drive to Sam Sand Dunes", description: "Continue west to the dunes; carry a light layer for the cooler desert evening.", location: { name: "Sam Sand Dunes", lat: 26.8144, lng: 70.5163 }, type: "transport" },
          { _key: "r6c", title: "Desert sunset and cultural programme", description: "Enjoy the dunes at sunset and an evening of local music and food at camp.", type: "activity" },
          { _key: "r6d", title: "Overnight desert camp", notes: "Choose a licensed camp operator and avoid driving on dunes outside designated routes.", type: "accommodation" },
        ],
      },
      {
        _key: "rajasthan-day7",
        dayNumber: 7,
        title: "Jaisalmer → Jodhpur",
        date: "2023-11-16",
        summary: "Leave the Thar behind and reach the Blue City for a relaxed evening around its clock tower market.",
        activities: [
          { _key: "r7a", title: "Drive from Jaisalmer to Jodhpur", description: "Start after breakfast and plan a late-afternoon check-in.", type: "transport" },
          { _key: "r7b", title: "Clock Tower and Sardar Market", description: "Walk the market area for spices, textiles, and a first taste of Jodhpur.", location: { name: "Ghanta Ghar, Jodhpur", lat: 26.292, lng: 73.0246 }, type: "sightseeing" },
          { _key: "r7c", title: "Overnight in Jodhpur", type: "accommodation" },
        ],
      },
      {
        _key: "rajasthan-day8",
        dayNumber: 8,
        title: "Mehrangarh → Jaswant Thada → Mandore",
        date: "2023-11-17",
        summary: "A full Jodhpur day around its great hill fort, memorial architecture, and gardens.",
        activities: [
          { _key: "r8a", title: "Mehrangarh Fort", description: "Give Rajasthan's great hill fort the morning for galleries, ramparts, and city views.", location: { name: "Mehrangarh Fort", lat: 26.298, lng: 73.0181 }, type: "sightseeing" },
          { _key: "r8b", title: "Jaswant Thada", description: "Visit the marble memorial immediately below the fort.", location: { name: "Jaswant Thada", lat: 26.3031, lng: 73.0205 }, type: "sightseeing" },
          { _key: "r8c", title: "Mandore Gardens", description: "Spend the later afternoon among the historic cenotaphs and gardens.", location: { name: "Mandore Gardens", lat: 26.3545, lng: 73.0394 }, type: "sightseeing" },
          { _key: "r8d", title: "Second night in Jodhpur", type: "accommodation" },
        ],
      },
      {
        _key: "rajasthan-day9",
        dayNumber: 9,
        title: "Jodhpur → Ranakpur → Udaipur",
        date: "2023-11-18",
        summary: "Cross the Aravallis via Ranakpur's celebrated Jain temple complex to the City of Lakes.",
        activities: [
          { _key: "r9a", title: "Drive to Ranakpur", description: "Leave early for the temple stop and the scenic Aravalli approach.", type: "transport" },
          { _key: "r9b", title: "Ranakpur Jain Temple", description: "Explore the celebrated marble temple complex with its carved columns.", location: { name: "Ranakpur Jain Temple", lat: 25.1165, lng: 73.4729 }, type: "sightseeing" },
          { _key: "r9c", title: "Continue to Udaipur", description: "Check in and head to the lakefront for an evening walk.", location: { name: "Udaipur", lat: 24.5854, lng: 73.7125 }, type: "transport" },
          { _key: "r9d", title: "Lake Pichola sunset", description: "Take in the waterfront views at the end of the road day.", type: "sightseeing" },
        ],
      },
      {
        _key: "rajasthan-day10",
        dayNumber: 10,
        title: "Udaipur City Palace → Lake Pichola → Departure",
        date: "2023-11-19",
        summary: "End in Udaipur with lakeside palaces, gardens, and a measured departure buffer.",
        activities: [
          { _key: "r10a", title: "City Palace and Jagdish Temple", description: "Start at Udaipur's palace complex, then walk to the nearby temple and old-city lanes.", location: { name: "City Palace, Udaipur", lat: 24.5764, lng: 73.6835 }, type: "sightseeing" },
          { _key: "r10b", title: "Saheliyon-ki-Bari", description: "Visit the historic garden before the final lakefront stop.", location: { name: "Saheliyon-ki-Bari", lat: 24.602, lng: 73.6878 }, type: "sightseeing" },
          { _key: "r10c", title: "Lake Pichola boat ride", description: "If timing permits, finish with a lake ride and views of the palace skyline.", location: { name: "Lake Pichola", lat: 24.5713, lng: 73.6791 }, type: "activity" },
          { _key: "r10d", title: "Depart Udaipur", notes: "Keep sufficient transfer time for the airport or railway station and reconfirm transport the night before.", type: "transport" },
        ],
      },
    ],
  },
  {
    _id: "trip-goa",
    title: "Goa — Beyond the Beach Shacks",
    slug: "goa-beyond-beaches",
    excerpt:
      "Old Goa churches, hidden spice farms, Portuguese-era homes, and yes — a few perfect sunsets over the Arabian Sea.",
    tags: ["Beach", "Food", "Coastal", "Goa", "India"],
    country: "India",
    startDate: "2023-01-05",
    endDate: "2023-01-11",
    bestSuggestedMonth: "November – February",
    status: "published",
    viewCount: 0,
    totalBudget: 18000,
    currency: "INR",
    tripType: "Leisure",
    readingTime: 7,
    _createdAt: "2023-02-01T00:00:00Z",
    _updatedAt: "2023-02-01T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "goa-day1",
        dayNumber: 1,
        title: "Arrive in Panaji → Fontainhas → Miramar",
        date: "2023-01-05",
        summary: "Ease into Goa through Panaji's Latin Quarter, with a sunset finish on the Mandovi waterfront.",
        activities: [
          { _key: "g1a", title: "Arrive and check in at Panaji", description: "Settle in, collect a local SIM if needed, and keep the first day unhurried.", location: { name: "Panaji", lat: 15.4909, lng: 73.8278 }, type: "accommodation" },
          { _key: "g1b", title: "Walk through Fontainhas", description: "Explore Panaji's Portuguese-era Latin Quarter, its colourful homes, lanes, and cafés.", location: { name: "Fontainhas, Panaji", lat: 15.4984, lng: 73.8281 }, type: "sightseeing" },
          { _key: "g1c", title: "Sunset at Miramar Beach", description: "End the day by the Arabian Sea near the Mandovi estuary.", location: { name: "Miramar Beach", lat: 15.4798, lng: 73.8078 }, type: "sightseeing" },
          { _key: "g1d", title: "Dinner in Panaji", description: "Try a Goan meal and confirm the following day's Old Goa transport plan.", type: "food" },
        ],
      },
      {
        _key: "goa-day2",
        dayNumber: 2,
        title: "Panaji → Old Goa → Divar Island",
        date: "2023-01-06",
        summary: "A heritage-focused day among Old Goa's churches, followed by a quieter island detour.",
        activities: [
          { _key: "g2a", title: "Explore Old Goa", description: "Start early to comfortably explore the historic church precinct before the busiest hours.", location: { name: "Old Goa", lat: 15.5009, lng: 73.9116 }, type: "sightseeing" },
          { _key: "g2b", title: "Basilica of Bom Jesus", description: "Visit one of Goa's best-known Portuguese-era churches.", location: { name: "Basilica of Bom Jesus", lat: 15.5007, lng: 73.9114 }, type: "sightseeing" },
          { _key: "g2c", title: "Ferry to Divar Island", description: "Take the short ferry for village lanes, fields, and a slower side of the region.", location: { name: "Divar Island", lat: 15.5266, lng: 73.8745 }, type: "activity" },
          { _key: "g2d", title: "Second night in Panaji", notes: "Carry water and sun protection; heritage sites involve a fair amount of walking.", type: "accommodation" },
        ],
      },
      {
        _key: "goa-day3",
        dayNumber: 3,
        title: "Panaji → Candolim → Anjuna → Vagator",
        date: "2023-01-07",
        summary: "Head north for Goa's classic coastal landmarks, beach time, and a cliffside sunset.",
        activities: [
          { _key: "g3a", title: "Drive to North Goa", description: "Move north from Panaji, allowing time for traffic and parking around the popular beach belt.", type: "transport" },
          { _key: "g3b", title: "Fort Aguada and Candolim Beach", description: "Pair the hilltop fort views with a relaxed beach stop.", location: { name: "Fort Aguada", lat: 15.4921, lng: 73.7738 }, type: "sightseeing" },
          { _key: "g3c", title: "Anjuna Beach", description: "Explore the beach and nearby cafés at an unhurried pace.", location: { name: "Anjuna Beach", lat: 15.573, lng: 73.7407 }, type: "sightseeing" },
          { _key: "g3d", title: "Sunset at Vagator", description: "Finish with views from the Vagator cliffside.", location: { name: "Vagator Beach", lat: 15.5977, lng: 73.7338 }, type: "sightseeing" },
          { _key: "g3e", title: "Overnight in North Goa", type: "accommodation" },
        ],
      },
      {
        _key: "goa-day4",
        dayNumber: 4,
        title: "Mandrem → Arambol → Chapora",
        date: "2023-01-08",
        summary: "A quieter North Goa loop of broad beaches, a village atmosphere, and fort views.",
        activities: [
          { _key: "g4a", title: "Morning at Mandrem Beach", description: "Start early for a quieter stretch of sand and an easy breakfast.", location: { name: "Mandrem Beach", lat: 15.6571, lng: 73.7101 }, type: "sightseeing" },
          { _key: "g4b", title: "Explore Arambol", description: "Spend the afternoon around Arambol's beach and local lanes.", location: { name: "Arambol Beach", lat: 15.6863, lng: 73.7045 }, type: "sightseeing" },
          { _key: "g4c", title: "Chapora Fort at golden hour", description: "Climb to the fort for wide coastal views before sunset.", location: { name: "Chapora Fort", lat: 15.6066, lng: 73.7392 }, type: "sightseeing" },
          { _key: "g4d", title: "Second night in North Goa", notes: "Use a cab or designated driver if you plan to drink; do not ride or drive after alcohol.", type: "accommodation" },
        ],
      },
      {
        _key: "goa-day5",
        dayNumber: 5,
        title: "North Goa → Ponda → Palolem",
        date: "2023-01-09",
        summary: "Cross Goa through its green interior, stopping at a spice plantation before reaching the slower South Goa coast.",
        activities: [
          { _key: "g5a", title: "Drive to Ponda", description: "Leave North Goa after breakfast and travel inland toward Ponda.", type: "transport" },
          { _key: "g5b", title: "Goan spice plantation visit", description: "Take a guided plantation walk and learn about the region's spice-growing traditions.", location: { name: "Ponda", lat: 15.403, lng: 74.015 }, type: "activity" },
          { _key: "g5c", title: "Continue to Palolem", description: "Head south to Palolem and check in near the beach.", location: { name: "Palolem Beach", lat: 15.01, lng: 74.023 }, type: "transport" },
          { _key: "g5d", title: "Palolem sunset and overnight", description: "Keep the evening open for the beach and a relaxed dinner.", type: "accommodation" },
        ],
      },
      {
        _key: "goa-day6",
        dayNumber: 6,
        title: "Palolem → Agonda → Cola Beach",
        date: "2023-01-10",
        summary: "A South Goa beach day built around quieter coves and a low-key coastal pace.",
        activities: [
          { _key: "g6a", title: "Morning at Palolem", description: "Enjoy the beach before moving on to the quieter southern coves.", type: "sightseeing" },
          { _key: "g6b", title: "Agonda Beach", description: "Spend time at the long, less-built-up beach south of Palolem.", location: { name: "Agonda Beach", lat: 15.0466, lng: 73.9868 }, type: "sightseeing" },
          { _key: "g6c", title: "Cola Beach", description: "Visit the secluded beach and lagoon area, allowing for slower local roads.", location: { name: "Cola Beach", lat: 15.0876, lng: 73.9889 }, type: "sightseeing" },
          { _key: "g6d", title: "Second night in South Goa", notes: "Keep swim plans conservative: respect flags, currents, weather, and local advice.", type: "accommodation" },
        ],
      },
      {
        _key: "goa-day7",
        dayNumber: 7,
        title: "South Goa → Margao → Departure",
        date: "2023-01-11",
        summary: "Wrap up with a final local stop and leave a sensible buffer for the airport or railway station.",
        activities: [
          { _key: "g7a", title: "Breakfast and check-out in South Goa", description: "Pack up early and keep valuables, documents, and chargers together for departure.", type: "accommodation" },
          { _key: "g7b", title: "Stop in Margao", description: "Use Margao for a final meal or quick shopping before continuing to your departure point.", location: { name: "Margao", lat: 15.2832, lng: 73.9862 }, type: "food" },
          { _key: "g7c", title: "Depart Goa", description: "Allow a comfortable buffer for traffic and transfer time.", type: "transport" },
        ],
      },
    ],
  },
  // ─── 6 NEW TRIPS ───────────────────────────────────────────────────────────
  {
    _id: "trip-sikkim-7-days",
    title: "7 Days in Sikkim — Gurudongmar, Yumthang & Pelling",
    slug: "sikkim-7-days",
    excerpt:
      "North Sikkim's sacred high-altitude lake at 5,183 m, the 'Valley of Flowers' at Yumthang, Zero Point snow fields, and Kanchenjunga views from Pelling — a complete week across Sikkim.",
    tags: ["Northeast", "Sikkim", "Mountains", "Adventure", "Trekking", "Culture", "India", "High Altitude"],
    country: "India",
    bestSuggestedMonth: "March – June & September – December",
    status: "published",
    viewCount: 0,
    totalBudget: 27000,
    currency: "INR",
    tripType: "Mountain/Nature",
    readingTime: 12,
    _createdAt: "2026-08-26T00:00:00Z",
    _updatedAt: "2026-08-26T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "sk-day1",
        dayNumber: 1,
        title: "Bagdogra / NJP → Gangtok",
        date: undefined,
        summary: "Transfer from Bagdogra Airport or NJP railway station to Gangtok through the scenic Teesta valley, arriving in time for an evening stroll on MG Marg.",
        activities: [
          { _key: "sk1a", title: "Land at Bagdogra / arrive NJP", description: "Private cab pickup, drive to Gangtok (~4–5 hrs, 125 km) through the Teesta river valley.", location: { name: "Bagdogra Airport, Siliguri", lat: 26.6812, lng: 88.3286 }, type: "transport" },
          { _key: "sk1b", title: "Lunch stop at Rangpo / Melli", description: "Riverside dhaba lunch en route — Sikkim border crossing.", type: "food" },
          { _key: "sk1c", title: "Check-in at Gangtok hotel", description: "Arrange Inner Line Permit (ILP) with hotel/agent. Keep 4 passport photos and ID proof handy.", location: { name: "Gangtok", lat: 27.3389, lng: 88.6065 }, type: "accommodation" },
          { _key: "sk1d", title: "Evening stroll at MG Marg", description: "Gangtok's pedestrian-only promenade — cafés, handicraft shops, and mountain views.", type: "activity" },
          { _key: "sk1e", title: "Dinner at Tibetan/Sikkimese restaurant", description: "Try Thukpa, momos, or traditional Sikkimese pork dishes.", type: "food" },
        ],
      },
      {
        _key: "sk-day2",
        dayNumber: 2,
        title: "Gangtok Local Sightseeing",
        date: undefined,
        summary: "Rumtek Monastery — the largest in Sikkim — red pandas at the Himalayan Zoological Park, Ganesh Tok, and Kanchenjunga views from Tashi viewpoint.",
        activities: [
          { _key: "sk2a", title: "Rumtek Monastery", description: "Largest monastery in Sikkim (~24 km from Gangtok). Closed on Mondays.", location: { name: "Rumtek Monastery", lat: 27.2854, lng: 88.5613 }, type: "sightseeing" },
          { _key: "sk2b", title: "Ganesh Tok & Hanuman Tok viewpoints", description: "Hilltop viewpoints offering panoramic Himalayan vistas above Gangtok.", type: "sightseeing" },
          { _key: "sk2c", title: "Himalayan Zoological Park", description: "Home to red pandas, snow leopards, and Himalayan wolves. Closed Mondays.", type: "activity" },
          { _key: "sk2d", title: "Tashi View Point", description: "Best viewpoint for Kanchenjunga (8,586 m) — visit early morning for clearest mountain visibility.", location: { name: "Tashi Viewpoint, Gangtok", lat: 27.3633, lng: 88.5958 }, type: "sightseeing" },
          { _key: "sk2e", title: "Evening shopping at Lal Bazaar", description: "Gangtok's main market for handicrafts, Tibetan souvenirs, and local produce.", type: "activity" },
        ],
      },
      {
        _key: "sk-day3",
        dayNumber: 3,
        title: "Gangtok → Lachen (North Sikkim)",
        date: undefined,
        summary: "Enter restricted North Sikkim on a permit-cleared vehicle, stopping at Naga and Seven Sisters Falls before arriving at Lachen to acclimatize at 2,750 m.",
        activities: [
          { _key: "sk3a", title: "Depart Gangtok in permit vehicle", description: "North Sikkim Protected Area Permit required — arrange via registered travel agent.", type: "transport" },
          { _key: "sk3b", title: "Naga Waterfall & Seven Sisters Falls", description: "Series of seven cascading waterfalls along the North Sikkim highway.", location: { name: "Seven Sisters Falls, North Sikkim", lat: 27.5000, lng: 88.6000 }, type: "sightseeing" },
          { _key: "sk3c", title: "Lunch at Chungthang", description: "Confluence town of Lachen Chu and Lachung Chu rivers — last major market.", type: "food" },
          { _key: "sk3d", title: "Arrive Lachen, acclimatize", description: "Check-in at homestay (~2,750 m). Minimal network — BSNL works best. Carry warm layers.", location: { name: "Lachen", lat: 27.7167, lng: 88.55 }, type: "accommodation" },
        ],
      },
      {
        _key: "sk-day4",
        dayNumber: 4,
        title: "Gurudongmar Lake → Lachung",
        date: undefined,
        summary: "A 4:30 AM departure for sacred Gurudongmar Lake at 5,183 m — one of the highest lakes in the world — then drive across to Lachung for the night.",
        activities: [
          { _key: "sk4a", title: "Early departure for Gurudongmar Lake", description: "Leave at 4:30 AM for the ~3 hr drive. High-altitude sickness risk — move slowly, stay hydrated.", type: "transport" },
          { _key: "sk4b", title: "Gurudongmar Lake", description: "Sacred Buddhist and Sikh lake at 5,183 m. Photography, prayer-flag walk. Partially frozen year-round.", location: { name: "Gurudongmar Lake", lat: 28.0333, lng: 88.7 }, type: "sightseeing" },
          { _key: "sk4c", title: "Return to Lachen, breakfast", description: "Descend to Lachen for a late breakfast and recovery before the drive to Lachung.", type: "food" },
          { _key: "sk4d", title: "Drive Lachen → Lachung", description: "Scenic 3–4 hr drive through North Sikkim's river valleys.", type: "transport" },
          { _key: "sk4e", title: "Lachung Monastery & check-in", description: "Explore the peaceful monastery in Lachung before settling in for the night.", location: { name: "Lachung", lat: 27.6913, lng: 88.7419 }, type: "accommodation" },
        ],
      },
      {
        _key: "sk-day5",
        dayNumber: 5,
        title: "Yumthang Valley & Zero Point → Gangtok",
        date: undefined,
        summary: "The 'Valley of Flowers' at Yumthang with rhododendron meadows and hot springs, then Zero Point snow fields at 4,600 m — followed by the long drive back to Gangtok.",
        activities: [
          { _key: "sk5a", title: "Yumthang Valley", description: "Valley of Flowers — rhododendron bloom Mar–May, hot springs nearby. Altitude ~3,564 m.", location: { name: "Yumthang Valley", lat: 27.8167, lng: 88.6833 }, type: "sightseeing" },
          { _key: "sk5b", title: "Zero Point (Snow Point)", description: "~4,600 m — weather-dependent snow fields. Rent snow boots locally (~₹150). Backup plan required if road is closed.", type: "sightseeing" },
          { _key: "sk5c", title: "Return to Lachung, lunch", description: "Lunch before the long drive south.", type: "food" },
          { _key: "sk5d", title: "Long drive back to Gangtok", description: "~5–6 hour drive. Check-in and dinner in Gangtok.", location: { name: "Gangtok", lat: 27.3389, lng: 88.6065 }, type: "accommodation" },
        ],
      },
      {
        _key: "sk-day6",
        dayNumber: 6,
        title: "Gangtok → Pelling (via Ravangla)",
        date: undefined,
        summary: "Drive to West Sikkim via Ravangla, stopping at the giant Buddha Park and Ralang Monastery, arriving in Pelling for sunset views of the Kanchenjunga massif.",
        activities: [
          { _key: "sk6a", title: "Drive to Ravangla", description: "Scenic 2 hr drive south through South Sikkim. Alternative route via Namchi covers Char Dham replica if time allows.", type: "transport" },
          { _key: "sk6b", title: "Buddha Park & Ralang Monastery, Ravangla", description: "One of Sikkim's most striking hilltop Buddha statues with valley views.", location: { name: "Ravangla", lat: 27.3167, lng: 88.3667 }, type: "sightseeing" },
          { _key: "sk6c", title: "Continue to Pelling", description: "Check-in, then watch the Kanchenjunga massif at sunset from the hotel viewpoint.", location: { name: "Pelling", lat: 27.2167, lng: 88.2167 }, type: "accommodation" },
        ],
      },
      {
        _key: "sk-day7",
        dayNumber: 7,
        title: "Pelling Sightseeing & Departure",
        date: undefined,
        summary: "Sunrise from Pelling Skywalk, Pemayangtse Monastery — one of the oldest in Sikkim — Rabdentse Ruins, then depart for Bagdogra/NJP.",
        activities: [
          { _key: "sk7a", title: "Sunrise at Pelling Skywalk / Sangey viewpoint", description: "Kanchenjunga at dawn — one of the finest mountain views in Sikkim.", type: "sightseeing" },
          { _key: "sk7b", title: "Pemayangtse Monastery", description: "One of Sikkim's oldest and most important monasteries (founded ~1705).", location: { name: "Pemayangtse Monastery", lat: 27.2144, lng: 88.2436 }, type: "sightseeing" },
          { _key: "sk7c", title: "Rabdentse Ruins", description: "Ruins of the second capital of Sikkim, set in the forest above Pelling.", type: "sightseeing" },
          { _key: "sk7d", title: "Depart for Bagdogra/NJP", description: "~5 hr drive. Keep buffer time near Siliguri traffic. Evening flight or train onward.", location: { name: "Bagdogra Airport", lat: 26.6812, lng: 88.3286 }, type: "transport" },
        ],
      },
    ],
  },
  {
    _id: "trip-meghalaya-5-days",
    title: "5 Days in Meghalaya — Living Root Bridges, Dawki & Waterfalls",
    slug: "meghalaya-5-days",
    excerpt:
      "Shillong's misty hills, Cherrapunji's record-breaking waterfalls, the double-decker living root bridge trek to Nongriat, and a boat ride on the crystal-clear Umngot River at Dawki.",
    tags: ["Northeast", "Meghalaya", "Nature", "Trekking", "Waterfalls", "Adventure", "India"],
    country: "India",
    bestSuggestedMonth: "October – May",
    status: "published",
    viewCount: 0,
    totalBudget: 18000,
    currency: "INR",
    tripType: "Nature & Trekking",
    readingTime: 9,
    _createdAt: "2026-08-26T00:00:00Z",
    _updatedAt: "2026-08-26T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "mg-day1",
        dayNumber: 1,
        title: "Guwahati Arrival → Shillong",
        date: undefined,
        summary: "Transfer from Guwahati airport to the 'Scotland of the East', arriving in time for an evening walk through the vibrant Police Bazaar and a taste of Khasi cuisine.",
        activities: [
          { _key: "mg1a", title: "Land at Guwahati Airport", description: "Private cab to Shillong (~100 km, 3 hrs via NH-6). Lunch stop at Nongpoh en route.", location: { name: "Guwahati Airport (GAU)", lat: 26.1061, lng: 91.5859 }, type: "transport" },
          { _key: "mg1b", title: "Check-in Shillong hotel", description: "No special permit needed for Indian nationals. Foreign nationals arrange Protected Area Permit on arrival.", location: { name: "Shillong", lat: 25.5788, lng: 91.8933 }, type: "accommodation" },
          { _key: "mg1c", title: "Evening at Police Bazaar", description: "Shillong's bustling market hub — street food, local crafts, and Meghalaya vibes.", type: "activity" },
          { _key: "mg1d", title: "Dinner — Khasi cuisine", description: "Try Jadoh (rice and pork), Tungrymbai (fermented soybean), and Doh Khlieh.", type: "food" },
        ],
      },
      {
        _key: "mg-day2",
        dayNumber: 2,
        title: "Shillong Local Sightseeing",
        date: undefined,
        summary: "Umiam Lake boating, the tiered cascade of Elephant Falls, panoramic city views from Shillong Peak, and an evening at the neo-Gothic Cathedral of Mary Help of Christians.",
        activities: [
          { _key: "mg2a", title: "Umiam Lake", description: "Boating and photography on the large man-made reservoir above Shillong.", location: { name: "Umiam Lake", lat: 25.6667, lng: 91.8833 }, type: "activity" },
          { _key: "mg2b", title: "Elephant Falls", description: "Three-tier waterfall in a forested gorge near Shillong. Entry ₹20 pp.", location: { name: "Elephant Falls", lat: 25.5375, lng: 91.8256 }, type: "sightseeing" },
          { _key: "mg2c", title: "Shillong Peak viewpoint", description: "Highest point in Meghalaya with city panorama. Bring valid ID — Air Force restricted area.", type: "sightseeing" },
          { _key: "mg2d", title: "Ward's Lake & Lady Hydari Park", description: "Central Shillong's green lungs — boating and gardens.", type: "activity" },
          { _key: "mg2e", title: "Cathedral of Mary Help of Christians", description: "Beautiful Gothic church in central Shillong, lit up in the evening.", type: "sightseeing" },
        ],
      },
      {
        _key: "mg-day3",
        dayNumber: 3,
        title: "Shillong → Cherrapunji (Sohra)",
        date: undefined,
        summary: "Drive to one of the wettest places on Earth — Mawsmai limestone cave, Nohkalikai (India's tallest plunge waterfall), Seven Sisters Falls, and a homestay in Sohra.",
        activities: [
          { _key: "mg3a", title: "Drive to Cherrapunji", description: "~55 km, 1.5–2 hrs through scenic ghat roads.", type: "transport" },
          { _key: "mg3b", title: "Mawsmai Cave", description: "Narrow limestone cave with stalactites and stalagmites. Entry ₹30 pp. Not suitable for claustrophobic travelers.", location: { name: "Mawsmai Cave, Cherrapunji", lat: 25.2702, lng: 91.7323 }, type: "activity" },
          { _key: "mg3c", title: "Nohkalikai Falls", description: "India's tallest plunge waterfall (340 m). Most dramatic Sep–Oct just after monsoon.", location: { name: "Nohkalikai Falls", lat: 25.253, lng: 91.7161 }, type: "sightseeing" },
          { _key: "mg3d", title: "Seven Sisters Falls (Nohsngithiang)", description: "Seven parallel waterfalls cascading down the Meghalaya plateau.", type: "sightseeing" },
          { _key: "mg3e", title: "Eco Park / Thangkharang Park", description: "Viewpoint overlooking the Bangladesh plains below the Cherrapunji cliffs.", type: "sightseeing" },
          { _key: "mg3f", title: "Check-in Cherrapunji homestay", description: "Overnight in Sohra with views across the deep valley.", type: "accommodation" },
        ],
      },
      {
        _key: "mg-day4",
        dayNumber: 4,
        title: "Double Decker Root Bridge Trek & Dawki",
        date: undefined,
        summary: "The flagship Meghalaya experience — the gruelling 3,500-step descent and ascent to the double-decker living root bridge at Nongriat, then drive to the crystal-clear Umngot River at Dawki.",
        activities: [
          { _key: "mg4a", title: "Early breakfast, drive to Tyrna village", description: "Trek trailhead for the Nongriat Living Root Bridge. Leave by 6:30 AM.", type: "transport" },
          { _key: "mg4b", title: "Trek to Double Decker Living Root Bridge", description: "~3,500 steps down to Nongriat (~2.5–3 hrs one way). Wear grip shoes, carry water. Steep and demanding — not suitable for knee issues.", location: { name: "Double Decker Root Bridge, Nongriat", lat: 25.2496, lng: 91.7247 }, type: "activity" },
          { _key: "mg4c", title: "Rainbow Falls swim", description: "Natural pool at Rainbow Falls near Nongriat — turquoise water surrounded by jungle.", type: "activity" },
          { _key: "mg4d", title: "Trek back to Tyrna", description: "~2–2.5 hrs climbing back up 3,500 steps.", type: "activity" },
          { _key: "mg4e", title: "Drive to Dawki, sunset at Umngot River", description: "Check-in at Dawki homestay. Sunset at the crystal-clear Umngot River, one of Asia's clearest rivers.", location: { name: "Dawki, Umngot River", lat: 25.1892, lng: 92.0197 }, type: "accommodation" },
        ],
      },
      {
        _key: "mg-day5",
        dayNumber: 5,
        title: "Dawki River Boating & Departure",
        date: undefined,
        summary: "Morning boat ride on the transparent Umngot River — boats appear to float in mid-air — optional visit to Mawlynnong (cleanest village in Asia), then drive back to Guwahati.",
        activities: [
          { _key: "mg5a", title: "Boating on Umngot River", description: "Best in winter months when water is at its clearest. Shared boat ~₹500.", location: { name: "Umngot River, Dawki", lat: 25.1917, lng: 92.0181 }, type: "activity" },
          { _key: "mg5b", title: "Mawlynnong village (optional)", description: "Cleanest village in Asia — bamboo-lined paths, single-decker root bridge, tree-house viewpoint.", type: "sightseeing" },
          { _key: "mg5c", title: "Drive to Guwahati Airport", description: "~4 hrs. Keep buffer time for the long return drive.", location: { name: "Guwahati Airport", lat: 26.1061, lng: 91.5859 }, type: "transport" },
        ],
      },
    ],
  },
  {
    _id: "trip-kerala-7-days",
    title: "7 Days in Kerala — Fort Kochi, Munnar, Backwaters & Kovalam",
    slug: "kerala-7-days",
    excerpt:
      "Fort Kochi's Chinese fishing nets and Kathakali, Munnar's tea-carpeted hills and Nilgiri Tahr, Thekkady's spice plantation and Periyar tiger reserve, an overnight backwater houseboat on Vembanad Lake, and Kovalam's lighthouse beach.",
    tags: ["South India", "Kerala", "Coastal", "Mountains", "Culture", "Food", "Beach", "India"],
    country: "India",
    startDate: undefined,
    endDate: undefined,
    bestSuggestedMonth: "September – March",
    status: "published",
    viewCount: 0,
    totalBudget: 30000,
    currency: "INR",
    tripType: "Backwaters, Hills & Beach",
    readingTime: 13,
    _createdAt: "2026-08-26T00:00:00Z",
    _updatedAt: "2026-08-26T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "kl-day1",
        dayNumber: 1,
        title: "Kochi Arrival — Fort Kochi Exploration",
        date: undefined,
        summary: "Land at Kochi, settle into Fort Kochi's colonial streets, see the iconic Chinese fishing nets, St. Francis Church, Jew Town, and an evening Kathakali performance.",
        activities: [
          { _key: "kl1a", title: "Land at Kochi Airport, transfer to Fort Kochi", description: "~45 min drive. Kerala fish curry and appam for lunch.", location: { name: "Fort Kochi", lat: 9.9658, lng: 76.2422 }, type: "transport" },
          { _key: "kl1b", title: "Chinese Fishing Nets", description: "Iconic cantilevered fishing nets along the Fort Kochi waterfront — best at sunset.", type: "sightseeing" },
          { _key: "kl1c", title: "Santa Cruz Basilica & St. Francis Church", description: "St. Francis Church is where Vasco da Gama was originally buried — one of India's oldest European churches.", type: "sightseeing" },
          { _key: "kl1d", title: "Jew Town & Mattancherry Palace", description: "Browse the antique shops of Jew Town and visit the Dutch Palace with Kerala murals.", location: { name: "Mattancherry, Kochi", lat: 9.9557, lng: 76.2574 }, type: "sightseeing" },
          { _key: "kl1e", title: "Kathakali dance performance", description: "Book tickets in advance; arrive 30 min early for the make-up demonstration. ₹400 pp.", type: "activity" },
        ],
      },
      {
        _key: "kl-day2",
        dayNumber: 2,
        title: "Kochi → Munnar",
        date: undefined,
        summary: "Scenic 4-hour ghat road drive to the tea capital of South India, stopping at Cheeyappara and Valara waterfalls along the way.",
        activities: [
          { _key: "kl2a", title: "Drive Kochi → Munnar (~130 km, 4 hrs)", description: "Carry motion sickness tablets — roads have many hairpin bends. Temperature drops noticeably on ascent.", type: "transport" },
          { _key: "kl2b", title: "Cheeyappara & Valara Waterfalls", description: "Roadside waterfalls on the Kochi–Munnar ghat road — worth a quick stop.", type: "sightseeing" },
          { _key: "kl2c", title: "Arrive Munnar, check-in", description: "Visit a local spice/tea shop for a first taste of Munnar's aromatic produce.", location: { name: "Munnar", lat: 10.0889, lng: 77.0595 }, type: "accommodation" },
        ],
      },
      {
        _key: "kl-day3",
        dayNumber: 3,
        title: "Munnar Sightseeing",
        date: undefined,
        summary: "Sunrise at Top Station, Nilgiri Tahr spotting at Eravikulam National Park, Mattupetty Dam, boating on Kundala Lake, and the Tea Museum.",
        activities: [
          { _key: "kl3a", title: "Sunrise at Top Station viewpoint", description: "Highest point on the Munnar–Kodaikanal road with views into Tamil Nadu.", type: "sightseeing" },
          { _key: "kl3b", title: "Eravikulam National Park", description: "Nilgiri Tahr habitat — Munnar's rarest attraction. Park closes Feb–Mar some years for breeding. Entry + shuttle ₹150 pp.", location: { name: "Eravikulam National Park", lat: 10.1667, lng: 77.05 }, type: "activity" },
          { _key: "kl3c", title: "Mattupetty Dam & Echo Point", description: "Scenic dam with boat rides and an echo phenomenon nearby.", type: "sightseeing" },
          { _key: "kl3d", title: "Kundala Lake boating", description: "Pedal boats on a picturesque lake surrounded by tea gardens.", location: { name: "Kundala Lake, Munnar", lat: 10.1167, lng: 77.1167 }, type: "activity" },
          { _key: "kl3e", title: "Tea Museum", description: "History of Munnar's tea plantations from the British colonial era. ₹150 pp.", type: "sightseeing" },
        ],
      },
      {
        _key: "kl-day4",
        dayNumber: 4,
        title: "Munnar → Thekkady",
        date: undefined,
        summary: "Drive into the spice heartland — guided cardamom and pepper plantation tour, then a Periyar Lake boat safari with chances of spotting wild elephants and bison.",
        activities: [
          { _key: "kl4a", title: "Drive Munnar → Thekkady (~110 km, 3.5 hrs)", type: "transport" },
          { _key: "kl4b", title: "Guided spice plantation tour", description: "Walk among cardamom, pepper, cinnamon, and vanilla vines. ₹200 pp.", location: { name: "Thekkady/Periyar Tiger Reserve", lat: 9.5916, lng: 77.1611 }, type: "activity" },
          { _key: "kl4c", title: "Periyar Lake boat safari", description: "Book in advance — early morning slots have better wildlife sightings. Elephants, bison, and rare birds. ₹300 pp.", type: "activity" },
          { _key: "kl4d", title: "Kalaripayattu martial arts show (optional)", description: "Kerala's ancient martial art form — an evening cultural show. ₹350 pp.", type: "activity" },
        ],
      },
      {
        _key: "kl-day5",
        dayNumber: 5,
        title: "Thekkady → Alleppey — Houseboat Overnight",
        date: undefined,
        summary: "Drive to Alleppey and board a traditional Kettuvallam houseboat for an overnight cruise through Vembanad Lake, Kerala's backwater canals, and village waterways.",
        activities: [
          { _key: "kl5a", title: "Drive Thekkady → Alleppey (~140 km, 4 hrs)", type: "transport" },
          { _key: "kl5b", title: "Board houseboat — welcome lunch onboard", description: "Traditional Kettuvallam with AC bedroom. Confirm veg/non-veg meals with operator beforehand.", location: { name: "Alleppey Backwaters", lat: 9.4981, lng: 76.3388 }, type: "accommodation" },
          { _key: "kl5c", title: "Cruise through Vembanad Lake & narrow canals", description: "Sunset over the backwaters, evening snacks, and village life along the waterways.", type: "activity" },
          { _key: "kl5d", title: "Dinner onboard — overnight stay", description: "Fresh backwater fish and Kerala specialties cooked by the houseboat chef.", type: "food" },
        ],
      },
      {
        _key: "kl-day6",
        dayNumber: 6,
        title: "Alleppey → Kovalam Beach",
        date: undefined,
        summary: "Disembark the houseboat and drive south to Kerala's most famous beach resort, arriving in time for a relaxed afternoon at Lighthouse Beach and a seafood dinner.",
        activities: [
          { _key: "kl6a", title: "Disembark houseboat after breakfast", description: "Check-out around 9 AM.", type: "transport" },
          { _key: "kl6b", title: "Drive Alleppey → Kovalam (~160 km, 4 hrs)", type: "transport" },
          { _key: "kl6c", title: "Lighthouse Beach, Kovalam", description: "Relax on the crescent beach. Swim only in flagged zones. Lighthouse climb for panoramic views (small fee).", location: { name: "Kovalam", lat: 8.3988, lng: 76.9781 }, type: "activity" },
          { _key: "kl6d", title: "Sunset at Kovalam Lighthouse", description: "The lighthouse offers a 360° view of Kerala's southern coastline at golden hour.", type: "sightseeing" },
          { _key: "kl6e", title: "Seafood dinner by the beach", description: "Fresh catch — Karimeen (pearl spot fish), prawns, or lobster at the beach shacks.", type: "food" },
        ],
      },
      {
        _key: "kl-day7",
        dayNumber: 7,
        title: "Kovalam Leisure — Departure from Trivandrum",
        date: undefined,
        summary: "Optional Ayurvedic massage, a final beach walk, then transfer to Trivandrum Airport for the return flight.",
        activities: [
          { _key: "kl7a", title: "Ayurvedic massage session (optional)", description: "Book with Kerala Tourism-approved centers only. ₹1,200 pp.", type: "activity" },
          { _key: "kl7b", title: "Beach leisure & souvenir shopping", description: "Last chance for Kerala spices, coconut products, and handicrafts.", type: "activity" },
          { _key: "kl7c", title: "Depart for Trivandrum Airport", description: "~20 km / 40 min. Allow buffer time — Trivandrum city traffic can be unpredictable.", location: { name: "Trivandrum Airport (TRV)", lat: 8.4821, lng: 76.92 }, type: "transport" },
        ],
      },
    ],
  },
  {
    _id: "trip-munsiyari-6-days",
    title: "Munsiyari Trip from Haridwar — 6 Days in Kumaon",
    slug: "munsiyari-6-days",
    excerpt:
      "Road trip through the Kumaon Himalayas from Haridwar to Munsiyari — the 'Little Kashmir' of Uttarakhand — stopping at Kausani's Himalayan panorama, trekking to Khaliya Top for Panchachuli views, and ending with Ganga Aarti at Haridwar.",
    tags: ["Himalayas", "Uttarakhand", "Road Trip", "Mountains", "Adventure", "Trekking", "India", "High Altitude"],
    country: "India",
    bestSuggestedMonth: "April – June & September – November",
    status: "published",
    viewCount: 0,
    totalBudget: 17000,
    currency: "INR",
    tripType: "Road Trip",
    readingTime: 10,
    _createdAt: "2026-08-26T00:00:00Z",
    _updatedAt: "2026-08-26T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "mu-day1",
        dayNumber: 1,
        title: "Haridwar → Kausani",
        date: undefined,
        summary: "Begin the Kumaon road trip from Haridwar, climbing through Kathgodam and Almora to Kausani — Switzerland of India — arriving in time for a Trishul and Nanda Devi sunset.",
        activities: [
          { _key: "mu1a", title: "Depart Haridwar (~250 km, 8–9 hrs)", description: "Start early to avoid driving winding Kumaon roads after dark.", location: { name: "Haridwar", lat: 29.9457, lng: 78.1642 }, type: "transport" },
          { _key: "mu1b", title: "Breakfast stop at Kathgodam", description: "Gateway to Kumaon — last major plains town before the hills.", type: "food" },
          { _key: "mu1c", title: "Lunch & brief stop at Almora", description: "Almora market and Bright Corner viewpoint — the cultural capital of Kumaon.", location: { name: "Almora", lat: 29.5971, lng: 79.6586 }, type: "activity" },
          { _key: "mu1d", title: "Arrive Kausani, sunset views", description: "Check-in with Trishul (7,120 m) and Nanda Devi (7,816 m) visible at sunset. Called the 'Switzerland of India'.", location: { name: "Kausani", lat: 29.8422, lng: 79.6062 }, type: "accommodation" },
        ],
      },
      {
        _key: "mu-day2",
        dayNumber: 2,
        title: "Kausani → Munsiyari",
        date: undefined,
        summary: "Sunrise at Anasakti Ashram viewpoint then the long Kumaon drive to Munsiyari — stopping at the ancient Baijnath Temple and the roadside Birthi Falls waterfall.",
        activities: [
          { _key: "mu2a", title: "Sunrise at Kausani — Anasakti Ashram viewpoint", description: "Gandhi meditated here in 1929 — now a tranquil sunrise spot with wide Himalayan views.", type: "sightseeing" },
          { _key: "mu2b", title: "Drive to Munsiyari via Bageshwar (~230 km, 7–8 hrs)", description: "Fuel up in Bageshwar — limited petrol pumps beyond this point.", type: "transport" },
          { _key: "mu2c", title: "Baijnath Temple", description: "Ancient Katyuri-era Shiva temple (~11th century) with fine stone carvings.", location: { name: "Baijnath Temple, Bageshwar", lat: 29.8289, lng: 79.6208 }, type: "sightseeing" },
          { _key: "mu2d", title: "Birthi Falls", description: "Beautiful roadside waterfall cascading through pine forest — roads narrow considerably after this point.", location: { name: "Birthi Falls", lat: 29.9833, lng: 80.1167 }, type: "sightseeing" },
          { _key: "mu2e", title: "Arrive Munsiyari, check-in", description: "The 'Little Kashmir' — panoramic views of the Panchachuli five-peak range.", location: { name: "Munsiyari", lat: 30.0668, lng: 80.2377 }, type: "accommodation" },
        ],
      },
      {
        _key: "mu-day3",
        dayNumber: 3,
        title: "Munsiyari — Khaliya Top Trek",
        date: undefined,
        summary: "Trek to Khaliya Top alpine meadow at 3,500 m for close-up Panchachuli five-peak views, then the Tribal Heritage Museum and sunset at Munsiyari viewpoint.",
        activities: [
          { _key: "mu3a", title: "Trek to Khaliya Top", description: "~5 km, 3–4 hrs round trip. Alpine meadow at ~3,500 m. Hire a local guide (~₹800/day). Carry trekking shoes and walking stick.", location: { name: "Khaliya Top", lat: 30.0833, lng: 80.2333 }, type: "activity" },
          { _key: "mu3b", title: "Summit views of Panchachuli peaks", description: "Five-peak massif dominating the eastern Kumaon skyline — one of Uttarakhand's most dramatic panoramas.", type: "sightseeing" },
          { _key: "mu3c", title: "Tribal Heritage Museum", description: "Small museum documenting the Bhotiya people — traditional clothes, tools, and culture. ₹30 pp.", type: "activity" },
          { _key: "mu3d", title: "Nanda Devi Temple & sunset viewpoint", description: "Temple dedicated to the goddess Nanda Devi, with Munsiyari's best sunset vantage.", type: "sightseeing" },
        ],
      },
      {
        _key: "mu-day4",
        dayNumber: 4,
        title: "Munsiyari — Balati Village & Gori Ganga Valley",
        date: undefined,
        summary: "A cultural immersion day with the Bhotiya weaving community in Balati village, a walk along the Gori Ganga river, and an optional bonfire evening.",
        activities: [
          { _key: "mu4a", title: "Drive to Balati Village", description: "Traditional Bhotiya weaving community. Observe and buy wool shawls and carpets directly from artisans.", location: { name: "Balati Village, Gori Ganga Valley", lat: 30.05, lng: 80.23 }, type: "activity" },
          { _key: "mu4b", title: "Walk along Gori Ganga riverbank", description: "Short walk along the glacier-fed Gori Ganga river through the valley.", type: "activity" },
          { _key: "mu4c", title: "Visit Darkot village or relax at hotel", description: "Flexible buffer day — also useful as an acclimatization/rest day after the Khaliya Top trek.", type: "activity" },
          { _key: "mu4d", title: "Bonfire evening (seasonal)", description: "Weather permitting — a cozy end to the day in the mountains.", type: "activity" },
        ],
      },
      {
        _key: "mu-day5",
        dayNumber: 5,
        title: "Munsiyari → Kausani (Return)",
        date: undefined,
        summary: "Begin the return drive through Bageshwar, with an optional stop at Chitai Golu Devta Temple — famous for thousands of bells — before arriving back at Kausani.",
        activities: [
          { _key: "mu5a", title: "Drive Munsiyari → Kausani via Bageshwar (~230 km, 7–8 hrs)", type: "transport" },
          { _key: "mu5b", title: "Lunch at Bageshwar", type: "food" },
          { _key: "mu5c", title: "Chitai Golu Devta Temple (optional)", description: "Famous for thousands of bells left by devotees as offerings — worth a 20-min stop.", location: { name: "Chitai Golu Devta Temple", lat: 29.6486, lng: 79.6642 }, type: "sightseeing" },
          { _key: "mu5d", title: "Arrive Kausani, overnight rest", location: { name: "Kausani", lat: 29.8422, lng: 79.6062 }, type: "accommodation" },
        ],
      },
      {
        _key: "mu-day6",
        dayNumber: 6,
        title: "Kausani → Haridwar — Departure",
        date: undefined,
        summary: "The final drive back from the hills to Haridwar, timed to arrive for the evening Ganga Aarti — one of India's most moving spiritual ceremonies.",
        activities: [
          { _key: "mu6a", title: "Drive Kausani → Haridwar (~250 km, 8–9 hrs)", description: "Start early to reach Haridwar before the 6:30–7:00 PM aarti.", type: "transport" },
          { _key: "mu6b", title: "Lunch stop at Kathgodam", type: "food" },
          { _key: "mu6c", title: "Evening Ganga Aarti at Har Ki Pauri", description: "A fitting end to the Kumaon trip — priests chant, bells ring, and oil lamp floats lit on the Ganga.", location: { name: "Har Ki Pauri, Haridwar", lat: 29.9457, lng: 78.1642 }, type: "activity" },
        ],
      },
    ],
  },
  {
    _id: "trip-char-dham-yatra",
    title: "Char Dham Yatra Uttarakhand — 10 Days",
    slug: "char-dham-yatra-uttarakhand",
    excerpt:
      "The complete Char Dham circuit: Yamunotri, Gangotri, Kedarnath, and Badrinath — four sacred shrines in the Garhwal Himalayas. Includes the 16 km Kedarnath trek, the Gangotri glacier source of the Ganga, and the last village of India at Mana.",
    tags: ["Himalayas", "Uttarakhand", "Trekking", "Heritage", "Culture", "India", "Pilgrimage", "Adventure"],
    country: "India",
    bestSuggestedMonth: "May – June & September – October",
    status: "published",
    viewCount: 0,
    totalBudget: 38000,
    currency: "INR",
    tripType: "Pilgrimage Trek",
    readingTime: 16,
    _createdAt: "2026-08-26T00:00:00Z",
    _updatedAt: "2026-08-26T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "cd-day1",
        dayNumber: 1,
        title: "Arrival at Haridwar",
        date: undefined,
        summary: "Arrive in Haridwar, collect Char Dham biometric registration e-pass, and attend the iconic Ganga Aarti at Har Ki Pauri — the spiritual gateway to the yatra.",
        activities: [
          { _key: "cd1a", title: "Arrive Haridwar", description: "By train or via Dehradun airport. Get medical fitness check if you have heart/BP conditions.", location: { name: "Haridwar", lat: 29.9457, lng: 78.1642 }, type: "transport" },
          { _key: "cd1b", title: "Collect Char Dham e-pass", description: "Mandatory biometric registration via Uttarakhand Tourism portal — checked at all dham checkpoints.", type: "activity" },
          { _key: "cd1c", title: "Evening Ganga Aarti at Har Ki Pauri", description: "Priests chant, conch shells sound, and oil lamps float on the sacred Ganga.", type: "sightseeing" },
        ],
      },
      {
        _key: "cd-day2",
        dayNumber: 2,
        title: "Haridwar → Barkot (Yamunotri Base)",
        date: undefined,
        summary: "Long drive through Mussoorie hills to Barkot — the base camp for the Yamunotri trek. Last major ATM and fuel stop before the trek.",
        activities: [
          { _key: "cd2a", title: "Drive Haridwar → Barkot (~170 km, 6–7 hrs)", description: "Breakfast stop near Mussoorie/Kempty area.", type: "transport" },
          { _key: "cd2b", title: "Arrive Barkot, rest and prepare", description: "Barkot has the last major ATM and fuel before Janki Chatti. Early rest for the Yamunotri trek.", location: { name: "Barkot", lat: 30.8167, lng: 78.2167 }, type: "accommodation" },
        ],
      },
      {
        _key: "cd-day3",
        dayNumber: 3,
        title: "Yamunotri Darshan",
        date: undefined,
        summary: "Trek 6 km from Janki Chatti to Yamunotri Temple (3,293 m) — the source of river Yamuna — for a holy dip at the Surya Kund hot spring. Cook rice in the hot spring as tradition demands.",
        activities: [
          { _key: "cd3a", title: "Drive to Janki Chatti, begin Yamunotri trek", description: "~6 km trek (4–5 hrs). Pony ~₹1,300 pp or palki (stretcher) available for those unable to walk.", type: "activity" },
          { _key: "cd3b", title: "Darshan at Yamunotri Temple & Surya Kund", description: "Surya Kund hot spring reaches ~94°C — pilgrims cook rice wrapped in cloth as a prasad offering.", location: { name: "Yamunotri Temple", lat: 31.01, lng: 78.45 }, type: "sightseeing" },
          { _key: "cd3c", title: "Descend to Janki Chatti, drive to Barkot/Uttarkashi", description: "Overnight in Barkot or Uttarkashi.", type: "accommodation" },
        ],
      },
      {
        _key: "cd-day4",
        dayNumber: 4,
        title: "Gangotri Darshan",
        date: undefined,
        summary: "Drive to Gangotri Temple (3,100 m) on the banks of the Bhagirathi — the origin of the sacred Ganga — the easiest of the four dhams (no major trek required).",
        activities: [
          { _key: "cd4a", title: "Drive Uttarkashi → Gangotri (~100 km, 4 hrs)", type: "transport" },
          { _key: "cd4b", title: "Darshan at Gangotri Temple", description: "Sacred temple on the banks of the Bhagirathi river, surrounded by snow peaks.", location: { name: "Gangotri Temple", lat: 30.9946, lng: 78.9398 }, type: "sightseeing" },
          { _key: "cd4c", title: "Bhagirath Shila & riverside ghats", description: "Rock where King Bhagirath meditated to bring the Ganga to earth — a key pilgrimage spot.", type: "sightseeing" },
          { _key: "cd4d", title: "Return drive to Uttarkashi", description: "Overnight in Uttarkashi.", type: "accommodation" },
        ],
      },
      {
        _key: "cd-day5",
        dayNumber: 5,
        title: "Uttarkashi → Guptkashi (via Rudraprayag)",
        date: undefined,
        summary: "Long transit day connecting the Yamunotri/Gangotri circuit to the Kedarnath/Badrinath circuit — stop at the Alaknanda-Mandakini river confluence at Rudraprayag.",
        activities: [
          { _key: "cd5a", title: "Drive Uttarkashi → Guptkashi (~220 km, 7–8 hrs)", description: "Long transit day — start early.", type: "transport" },
          { _key: "cd5b", title: "Lunch at Srinagar (Uttarakhand)", type: "food" },
          { _key: "cd5c", title: "Brief stop at Rudraprayag", description: "Confluence of the Alaknanda and Mandakini rivers — one of Garhwal's sacred prayags.", location: { name: "Rudraprayag", lat: 30.2858, lng: 78.9814 }, type: "sightseeing" },
          { _key: "cd5d", title: "Arrive Guptkashi, pack light bags for Kedarnath", description: "Leave heavy luggage at hotel. Take only essentials for the Kedarnath trek.", location: { name: "Guptkashi", lat: 30.5333, lng: 79.0667 }, type: "accommodation" },
        ],
      },
      {
        _key: "cd-day6",
        dayNumber: 6,
        title: "Kedarnath Trek & Arrival",
        date: undefined,
        summary: "The longest and most challenging leg — 16–18 km trek from Gaurikund to Kedarnath temple (3,583 m). Helicopter option available for those skipping the trek.",
        activities: [
          { _key: "cd6a", title: "Drive to Gaurikund, begin Kedarnath trek", description: "~16–18 km, 6–8 hrs. Pony ₹3,500–4,000. Helicopter (Phata/Guptkashi) ₹7,500–9,000 one-way — book weeks ahead.", type: "activity" },
          { _key: "cd6b", title: "Arrive Kedarnath, evening aarti", description: "Check-in at guesthouse or dharamshala at 3,583 m. Evening aarti at the ancient temple.", location: { name: "Kedarnath", lat: 30.7346, lng: 79.0669 }, type: "accommodation" },
        ],
      },
      {
        _key: "cd-day7",
        dayNumber: 7,
        title: "Kedarnath Darshan — Descend to Guptkashi",
        date: undefined,
        summary: "Sunrise darshan at Kedarnath temple, visit Bhairav Temple and Adi Shankaracharya Samadhi, then begin the descent back to Gaurikund.",
        activities: [
          { _key: "cd7a", title: "Early morning darshan at Kedarnath Temple", description: "5 AM queue for morning puja — one of the twelve Jyotirlingas of Shiva.", location: { name: "Kedarnath Temple", lat: 30.7346, lng: 79.0669 }, type: "sightseeing" },
          { _key: "cd7b", title: "Bhairav Temple & Adi Shankaracharya Samadhi", description: "Shankaracharya is said to have attained mahasamadhi here in the 8th century.", type: "sightseeing" },
          { _key: "cd7c", title: "Descend to Gaurikund, drive to Guptkashi", description: "5–6 hrs descent on foot. Start early to avoid trekking after dark.", type: "transport" },
        ],
      },
      {
        _key: "cd-day8",
        dayNumber: 8,
        title: "Guptkashi → Badrinath (via Joshimath)",
        date: undefined,
        summary: "Drive north through Joshimath and past Vishnuprayag to reach Badrinath — the abode of Lord Vishnu at 3,133 m — for the evening aarti.",
        activities: [
          { _key: "cd8a", title: "Drive Guptkashi → Badrinath (~200 km, 7–8 hrs)", description: "Check road status near Joshimath — landslide-prone stretch.", type: "transport" },
          { _key: "cd8b", title: "Lunch at Joshimath", description: "Gateway to Badrinath — also base for Auli ski resort and Valley of Flowers.", location: { name: "Joshimath", lat: 30.5546, lng: 79.5658 }, type: "food" },
          { _key: "cd8c", title: "Evening darshan at Badrinath Temple", description: "Colourful facade of the temple lit up at dusk — one of the most iconic images of the Char Dham.", location: { name: "Badrinath", lat: 30.7433, lng: 79.4938 }, type: "sightseeing" },
        ],
      },
      {
        _key: "cd-day9",
        dayNumber: 9,
        title: "Badrinath Darshan — Drive to Rudraprayag/Srinagar",
        date: undefined,
        summary: "Early Badrinath darshan, then Mana Village — the last village before the Tibetan border — Vyas Gufa, Bhim Pul, and a dip in the Tapt Kund hot spring.",
        activities: [
          { _key: "cd9a", title: "Early darshan at Badrinath Temple", description: "5 AM puja to avoid the day's crowds.", location: { name: "Badrinath Temple", lat: 30.7433, lng: 79.4938 }, type: "sightseeing" },
          { _key: "cd9b", title: "Mana Village — last Indian village", description: "Bring ID — border proximity. Vyas Gufa (cave where the Mahabharata was dictated), Bhim Pul (natural rock bridge).", location: { name: "Mana Village", lat: 30.7681, lng: 79.4909 }, type: "sightseeing" },
          { _key: "cd9c", title: "Tapt Kund hot spring dip", description: "Sulfuric hot spring near the Badrinath temple complex — sacred ritual bath.", type: "activity" },
          { _key: "cd9d", title: "Drive to Rudraprayag/Srinagar", description: "Char Dham circuit complete. Overnight before the final return leg.", type: "accommodation" },
        ],
      },
      {
        _key: "cd-day10",
        dayNumber: 10,
        title: "Return to Haridwar — Departure",
        date: undefined,
        summary: "Final drive back to Haridwar, stopping at Devprayag — where the Bhagirathi and Alaknanda merge to officially form the Ganga — a meaningful final moment.",
        activities: [
          { _key: "cd10a", title: "Drive toward Haridwar (~160 km, 5–6 hrs)", type: "transport" },
          { _key: "cd10b", title: "Breakfast stop at Devprayag", description: "Where Bhagirathi + Alaknanda merge to form the Ganga — a sacred and scenic confluence.", location: { name: "Devprayag", lat: 30.1462, lng: 78.5983 }, type: "sightseeing" },
          { _key: "cd10c", title: "Arrive Haridwar, departure", description: "Char Dham Yatra complete — four sacred dhams in the Garhwal Himalayas.", location: { name: "Haridwar", lat: 29.9457, lng: 78.1642 }, type: "activity" },
        ],
      },
    ],
  },
  {
    _id: "trip-panch-kedar-trek",
    title: "Panch Kedar Trek — All 5 Sacred Shiva Shrines in 10 Days",
    slug: "panch-kedar-trek-10-days",
    excerpt:
      "The ultimate Garhwal Himalayan pilgrimage circuit — trekking all five Kedar shrines: Kedarnath, Tungnath (world's highest Shiva temple), Madhyamaheshwar, Rudranath (most remote), and Kalpeshwar. A 10-day fast-paced adventure requiring strong fitness.",
    tags: ["Himalayas", "Uttarakhand", "Trekking", "Adventure", "Heritage", "Culture", "India", "High Altitude", "Pilgrimage"],
    country: "India",
    bestSuggestedMonth: "May – June & September – October",
    status: "published",
    viewCount: 0,
    totalBudget: 26000,
    currency: "INR",
    tripType: "Multi-site Pilgrimage Trek",
    readingTime: 17,
    _createdAt: "2026-08-26T00:00:00Z",
    _updatedAt: "2026-08-26T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "pk-day1",
        dayNumber: 1,
        title: "Haridwar → Sonprayag/Guptkashi",
        date: undefined,
        summary: "Drive from Haridwar into the Garhwal hills, arriving at Sonprayag to begin the Panch Kedar circuit. Kedarnath e-pass registration required in advance.",
        activities: [
          { _key: "pk1a", title: "Drive Haridwar → Sonprayag (~220 km, 8 hrs)", description: "Lunch at Rudraprayag (Alaknanda-Mandakini confluence).", location: { name: "Sonprayag", lat: 30.6167, lng: 78.95 }, type: "transport" },
          { _key: "pk1b", title: "Rest, prepare trek gear", description: "Register for Kedarnath e-pass online in advance — checked at Sonprayag checkpoint. Carry trekking poles and layered clothing.", type: "activity" },
        ],
      },
      {
        _key: "pk-day2",
        dayNumber: 2,
        title: "Sonprayag → Gaurikund → Kedarnath Trek (Kedar 1/5)",
        date: undefined,
        summary: "Cab to Gaurikund, then the 16–18 km trek to Kedarnath (3,583 m) — the first and most famous of the five Kedar shrines — arriving in time for evening aarti.",
        activities: [
          { _key: "pk2a", title: "Cab to Gaurikund, begin trek", description: "16–18 km, 6–8 hrs. Pony available ~₹3,500–4,000 for those conserving energy for the days ahead.", type: "activity" },
          { _key: "pk2b", title: "Kedarnath Temple — evening aarti", description: "**Kedar 1 of 5** — the most famous Jyotirlinga, set against the Kedar Dome peak at 3,583 m.", location: { name: "Kedarnath", lat: 30.7346, lng: 79.0669 }, type: "sightseeing" },
          { _key: "pk2c", title: "Overnight at guesthouse/dharamshala", description: "Basic facilities — carry sleeping bag liner.", type: "accommodation" },
        ],
      },
      {
        _key: "pk-day3",
        dayNumber: 3,
        title: "Kedarnath Sunrise Darshan — Descend to Ukhimath",
        date: undefined,
        summary: "Sunrise puja at Kedarnath, descend to Gaurikund, then drive to Ukhimath — the winter seat of the Kedarnath deity — for a quick visit to Omkareshwar Temple.",
        activities: [
          { _key: "pk3a", title: "Sunrise darshan at Kedarnath Temple", description: "5 AM morning puja — the most auspicious time. Kedar 1 complete.", location: { name: "Kedarnath Temple", lat: 30.7346, lng: 79.0669 }, type: "sightseeing" },
          { _key: "pk3b", title: "Descent to Gaurikund (~6–7 hrs)", description: "Start early to avoid trekking after dark.", type: "activity" },
          { _key: "pk3c", title: "Drive to Ukhimath, Omkareshwar Temple", description: "Kedarnath deity resides here in winter. An atmospheric stop on the return.", location: { name: "Ukhimath", lat: 30.5333, lng: 79.1167 }, type: "sightseeing" },
        ],
      },
      {
        _key: "pk-day4",
        dayNumber: 4,
        title: "Ukhimath → Chopta — Tungnath Trek (Kedar 2/5)",
        date: undefined,
        summary: "The shortest and most accessible Kedar trek — 3.5 km to Tungnath, the world's highest Shiva temple at 3,680 m, with an optional extension to Chandrashila summit for 360° Himalayan views.",
        activities: [
          { _key: "pk4a", title: "Drive to Chopta (~40 km, 1.5 hrs)", description: "The 'Mini Switzerland of Uttarakhand' — stunning oak and rhododendron forests.", type: "transport" },
          { _key: "pk4b", title: "Trek to Tungnath Temple", description: "~3.5 km, 2.5–3 hrs. **Kedar 2 of 5** — world's highest Shiva temple at 3,680 m. Stone architecture dating back 1,000 years.", location: { name: "Tungnath", lat: 30.4897, lng: 79.2189 }, type: "activity" },
          { _key: "pk4c", title: "Chandrashila Summit (optional)", description: "~1.5 km further from Tungnath. 360° views of Nanda Devi, Trishul, Chaukhamba — highly recommended.", type: "sightseeing" },
          { _key: "pk4d", title: "Descend to Chopta, check-in", description: "Overnight in Chopta tents or guesthouses.", type: "accommodation" },
        ],
      },
      {
        _key: "pk-day5",
        dayNumber: 5,
        title: "Chopta → Ransi — Trek to Gaundar (Madhyamaheshwar Base)",
        date: undefined,
        summary: "Drive to Ransi village and begin trekking toward Madhyamaheshwar base camp at Gaundar — a quiet, less-commercialized route through terraced Garhwal villages.",
        activities: [
          { _key: "pk5a", title: "Drive Chopta → Ransi village (~35 km, 2 hrs)", type: "transport" },
          { _key: "pk5b", title: "Trek Ransi → Gaundar village (~9 km, 4–5 hrs)", description: "Base camp for Madhyamaheshwar. Carry cash — no ATMs beyond Ukhimath. Local guide recommended.", location: { name: "Gaundar Village", lat: 30.6167, lng: 79.2333 }, type: "activity" },
          { _key: "pk5c", title: "Rest and village exploration at Gaundar", description: "Peaceful terraced farmland village with Garhwali hospitality.", type: "accommodation" },
        ],
      },
      {
        _key: "pk-day6",
        dayNumber: 6,
        title: "Gaundar → Madhyamaheshwar Trek (Kedar 3/5)",
        date: undefined,
        summary: "The 9 km steady climb to Madhyamaheshwar (3,497 m) — third of the five Kedar shrines — with sweeping Chaukhamba peak views from the temple.",
        activities: [
          { _key: "pk6a", title: "Trek Gaundar → Madhyamaheshwar (~9 km, 5–6 hrs)", description: "Steady climb through bugyal meadows. Mules can carry heavier luggage for a fee.", type: "activity" },
          { _key: "pk6b", title: "Darshan at Madhyamaheshwar Temple", description: "**Kedar 3 of 5** — navel (nabhi) of Shiva according to Puranas, at 3,497 m. Chaukhamba (7,138 m) looms directly behind.", location: { name: "Madhyamaheshwar", lat: 30.6667, lng: 79.2167 }, type: "sightseeing" },
          { _key: "pk6c", title: "Overnight at temple guesthouse", description: "Very basic facilities — carry sleeping bag liner and personal medication.", type: "accommodation" },
        ],
      },
      {
        _key: "pk-day7",
        dayNumber: 7,
        title: "Descend Madhyamaheshwar → Drive to Gopeshwar",
        date: undefined,
        summary: "Descend from Madhyamaheshwar back to Gaundar then drive the long road to Gopeshwar — the gateway for the demanding Rudranath trek.",
        activities: [
          { _key: "pk7a", title: "Descend Madhyamaheshwar → Gaundar (~9 km, 4–5 hrs)", type: "activity" },
          { _key: "pk7b", title: "Drive Gaundar → Gopeshwar via Ransi (~70 km, 3 hrs)", description: "Long tiring transit day — pace yourself and hydrate.", type: "transport" },
          { _key: "pk7c", title: "Arrive Gopeshwar, rest for Rudranath", description: "Prepare for the toughest leg. Check gear and food supplies.", location: { name: "Gopeshwar", lat: 30.3833, lng: 79.3333 }, type: "accommodation" },
        ],
      },
      {
        _key: "pk-day8",
        dayNumber: 8,
        title: "Gopeshwar → Rudranath Trek (Kedar 4/5)",
        date: undefined,
        summary: "The hardest day of the entire circuit — 20 km through Panar Bugyal alpine meadows and dense forest to reach the most remote of the five shrines: Rudranath at 3,600 m. A mandatory local guide is not optional.",
        activities: [
          { _key: "pk8a", title: "Drive to Sagar village, begin Rudranath trek", description: "20 km one-way, 8–10 hrs through Panar Bugyal meadows. The toughest and most remote trek of the circuit.", type: "transport" },
          { _key: "pk8b", title: "Trek through Panar Bugyal to Rudranath", description: "Dense forest and alpine meadow crossing. Carry enough food and water — facilities minimal en route. Local guide mandatory.", location: { name: "Rudranath", lat: 30.4667, lng: 79.3333 }, type: "activity" },
          { _key: "pk8c", title: "Evening darshan at Rudranath Temple", description: "**Kedar 4 of 5** — the face (mukh) of Shiva. Temple carved into a natural rock face at 3,600 m.", type: "sightseeing" },
          { _key: "pk8d", title: "Overnight at basic guesthouse", type: "accommodation" },
        ],
      },
      {
        _key: "pk-day9",
        dayNumber: 9,
        title: "Rudranath Descent — Drive to Joshimath",
        date: undefined,
        summary: "Descend via the alternate Helang route (14 km) to reach the road head, then drive to Joshimath to prepare for the fifth and final Kedar.",
        activities: [
          { _key: "pk9a", title: "Alternate descent via Helang (~14 km, 6–7 hrs)", description: "Different trail from the ascent — confirm with guide which trailhead connects to Helang.", type: "activity" },
          { _key: "pk9b", title: "Drive Helang → Joshimath (~15 km, 30 min)", description: "Gateway to Badrinath and the Valley of Flowers.", location: { name: "Joshimath", lat: 30.5546, lng: 79.5658 }, type: "transport" },
          { _key: "pk9c", title: "Optional: Narsingh Temple, Joshimath", description: "Short evening walk to the historic Narsingh Temple in Joshimath town.", type: "activity" },
        ],
      },
      {
        _key: "pk-day10",
        dayNumber: 10,
        title: "Kalpeshwar Darshan (Kedar 5/5) — Return to Haridwar",
        date: undefined,
        summary: "The serene finale — a short 2 km walk to Kalpeshwar cave temple, the only Panch Kedar accessible without a major trek. Completing all five Kedars is considered highly auspicious. Then the long drive back to Haridwar.",
        activities: [
          { _key: "pk10a", title: "Drive to Urgam village, walk to Kalpeshwar", description: "~2 km easy walk from Urgam village to the cave temple.", type: "transport" },
          { _key: "pk10b", title: "Kalpeshwar Cave Temple — Panch Kedar circuit complete", description: "**Kedar 5 of 5** — the hair (jata) of Shiva. A serene cave temple, the most accessible of the five shrines. Circuit complete!", location: { name: "Kalpeshwar", lat: 30.5, lng: 79.4667 }, type: "sightseeing" },
          { _key: "pk10c", title: "Long drive Kalpeshwar → Haridwar (~230 km, 8 hrs)", description: "Arrive Haridwar/Rishikesh by evening. Panch Kedar complete.", location: { name: "Haridwar", lat: 29.9457, lng: 78.1642 }, type: "transport" },
        ],
      },
    ],
  },
  {
    _id: "trip-pune-konkan-raigad",
    title: "Pune – Konkan Coast – Raigad",
    slug: "pune-konkan-coast-raigad",
    excerpt:
      "A 4-Day / 5-Stop Coastal Loop — ~550–600 km from Pune down the Konkan coast and back via Raigad Fort.",
    tags: ["Road Trip", "Coastal", "Konkan", "Maharashtra", "India"],
    country: "India",
    bestSuggestedMonth: "October – February",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Road Trip",
    readingTime: 6,
    _createdAt: "2026-08-27T00:00:00Z",
    _updatedAt: "2026-08-27T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "pkr-day1",
        dayNumber: 1,
        title: "Pune to Anjarle",
        date: undefined,
        summary: "~180 km loop starting with misty ghats and ending at the cliffside temple of Anjarle.",
        activities: [
          { _key: "pkr1a", title: "Tamhini Ghat", description: "Waterfalls, misty ghats, and a great early-morning ride. Start here before the day heats up.", location: { name: "Tamhini Ghat", lat: 18.45, lng: 73.4167 }, type: "transport" },
          { _key: "pkr1b", title: "Mangaon → Ambet → Mandangad", description: "Winding ghat roads with small-town stops for chai and breakfast along the way.", location: { name: "Mandangad", lat: 17.9868, lng: 73.0487 }, type: "transport" },
          { _key: "pkr1c", title: "Anjarle & Kadyavarcha Ganpati", description: "Kadyavarcha Ganpati temple perched on a cliff, plus Anjarle beach.", location: { name: "Anjarle", lat: 17.85, lng: 73.0833 }, type: "sightseeing" },
          { _key: "pkr1d", title: "Overnight at Anjarle", description: "Rest after the ride.", type: "accommodation" },
        ],
      },
      {
        _key: "pkr-day2",
        dayNumber: 2,
        title: "Anjarle to Ganpatipule",
        date: undefined,
        summary: "~90 km coastal cruise past black-sand beaches and historic temples.",
        activities: [
          { _key: "pkr2a", title: "Murud (Kokan) & Ladghar", description: "Quiet black-sand beach at Murud, and clean, less-crowded Ladghar beach for a swim break.", location: { name: "Ladghar", lat: 17.6534, lng: 73.1365 }, type: "sightseeing" },
          { _key: "pkr2b", title: "Guhagar → Hedavi", description: "Hedavi's Ganpati temple and the Dashabhuja Ganesh idol.", location: { name: "Guhagar", lat: 17.4721, lng: 73.1977 }, type: "sightseeing" },
          { _key: "pkr2c", title: "Ganpatipule", description: "The famous Swayambhu Ganpati temple right on the beach.", location: { name: "Ganpatipule", lat: 17.1438, lng: 73.2687 }, type: "sightseeing" },
          { _key: "pkr2d", title: "Overnight at Ganpatipule", description: "Stay near the famous beachside temple.", type: "accommodation" },
        ],
      },
      {
        _key: "pkr-day3",
        dayNumber: 3,
        title: "Ganpatipule to Chiplun",
        date: undefined,
        summary: "~100 km ride exploring Ratnagiri, a cave shrine, and river confluence towns.",
        activities: [
          { _key: "pkr3a", title: "Ratnagiri", description: "Ratnagiri (Ratnadurg) Fort, Thibaw Palace, and Bhatye beach. Try local Alphonso mangoes if in season.", location: { name: "Ratnagiri", lat: 16.9902, lng: 73.312 }, type: "sightseeing" },
          { _key: "pkr3b", title: "Marleshwar", description: "Cave shrine plus a waterfall at the base of the Sahyadri hills — a short trek.", location: { name: "Marleshwar", lat: 17.0754, lng: 73.7431 }, type: "sightseeing" },
          { _key: "pkr3c", title: "Sangameshwar", description: "River confluence town with a temple stop.", location: { name: "Sangameshwar", lat: 17.1856, lng: 73.5597 }, type: "sightseeing" },
          { _key: "pkr3d", title: "Overnight at Chiplun", description: "Riverside town on the Vashishti river.", location: { name: "Chiplun", lat: 17.5332, lng: 73.5186 }, type: "accommodation" },
        ],
      },
      {
        _key: "pkr-day4",
        dayNumber: 4,
        title: "Chiplun to Pune via Raigad",
        date: undefined,
        summary: "~200 km return journey featuring the historic Raigad Fort.",
        activities: [
          { _key: "pkr4a", title: "Mahad", description: "Base town for Raigad Fort.", location: { name: "Mahad", lat: 18.0833, lng: 73.4167 }, type: "transport" },
          { _key: "pkr4b", title: "Raigad Fort", description: "Shivaji Maharaj's capital — take the ropeway or the ~1,400-step trek to the top. Worth a half-day.", location: { name: "Raigad Fort", lat: 18.2341, lng: 73.4464 }, type: "sightseeing" },
          { _key: "pkr4c", title: "Pune", description: "Ride back, arriving in the evening.", location: { name: "Pune", lat: 18.5204, lng: 73.8567 }, type: "transport" },
        ],
      },
    ],
  },
  // ─── NEW TRIPS ──────────────────────────────────────────────────────────────

  // 1. Haridwar & Rishikesh — 3 Days from New Delhi
  {
    _id: "trip-haridwar-rishikesh-3-days",
    title: "Haridwar & Rishikesh — 3 Days from New Delhi",
    slug: "haridwar-rishikesh-3-days",
    excerpt:
      "A soulful 3-day escape from New Delhi to the Ganga's sacred shores — evening Ganga Aarti at Har Ki Pauri, white-water rafting on the Ganges, yoga at sunrise in Rishikesh, a trek to Kunjapuri Devi, and the iconic Laxman Jhula at dusk. India's spiritual heartland, just 250 km from Delhi.",
    tags: ["Spiritual", "Adventure", "Uttarakhand", "India", "Yoga", "Ganga", "Weekend Getaway", "North India"],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 8000,
    currency: "INR",
    tripType: "Spiritual & Adventure",
    readingTime: 5,
    _createdAt: "2026-09-09T00:00:00Z",
    _updatedAt: "2026-09-09T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "hr-day1",
        dayNumber: 1,
        title: "New Delhi → Haridwar — Ganga Aarti at Har Ki Pauri",
        date: undefined,
        summary: "Early morning drive from New Delhi (~250 km, 5 hrs via NH-58). Check in, freshen up, and spend the afternoon exploring the ghats before the unforgettable Ganga Aarti at sunset.",
        activities: [
          { _key: "hr1a", title: "Depart New Delhi (Early Morning)", description: "Start by 5–6 AM to beat traffic and arrive before lunch. NH-58 is well maintained; stop at Murthal dhabas for parathas.", location: { name: "New Delhi", lat: 28.6139, lng: 77.209 }, time: "05:30 AM", type: "transport" },
          { _key: "hr1b", title: "Arrive Haridwar & Check-In", description: "Check into a hotel near Har Ki Pauri ghat. Drop luggage and head out on foot.", location: { name: "Haridwar", lat: 29.9457, lng: 78.1642 }, time: "11:00 AM", type: "accommodation" },
          { _key: "hr1c", title: "Explore Haridwar Ghats & Bazaar", description: "Walk along the ghats — Har Ki Pauri, Mansa Devi (ropeway ride up), and the vibrant pilgrim bazaar for rudraksha, brass diyas, and sweets.", location: { name: "Har Ki Pauri", lat: 29.9583, lng: 78.1642 }, time: "12:30 PM", type: "sightseeing", notes: "Entry to Mansa Devi ropeway ₹100 pp. Keep valuables secure in busy market." },
          { _key: "hr1d", title: "Chandi Devi Temple (Optional)", description: "Take the ropeway to Chandi Devi temple atop Neel Parvat for sweeping valley views.", location: { name: "Chandi Devi Temple", lat: 29.933, lng: 78.1847 }, time: "03:00 PM", type: "sightseeing" },
          { _key: "hr1e", title: "Ganga Aarti at Har Ki Pauri", description: "The most spectacular Ganga Aarti in India — thousands of lamps (diyas) float on the river while priests perform the ritual in unison. Reach by 6 PM to find a spot. Deeply moving experience.", location: { name: "Har Ki Pauri", lat: 29.9583, lng: 78.1642 }, time: "06:30 PM", type: "sightseeing", notes: "Best viewed from Brahma Kund steps. No entry fee. Avoid wearing footwear near the ghat." },
          { _key: "hr1f", title: "Dinner & Overnight in Haridwar", description: "Try puri-sabzi, chole bhature, or kachori from the street stalls near Har Ki Pauri. Haridwar is a dry city — no alcohol.", time: "08:00 PM", type: "accommodation" },
        ],
      },
      {
        _key: "hr-day2",
        dayNumber: 2,
        title: "Rishikesh — Rafting, Laxman Jhula & Café Hopping",
        date: undefined,
        summary: "Drive 25 km upstream to Rishikesh for an adrenaline-pumping white-water rafting session on the Ganges, followed by an afternoon exploring Laxman Jhula, Ram Jhula, and the beloved cafés of Tapovan.",
        activities: [
          { _key: "hr2a", title: "Drive to Rishikesh (25 km)", description: "15–20 min drive or shared auto-rickshaw from Haridwar. Check in at a riverside camp or hotel.", location: { name: "Rishikesh", lat: 30.0869, lng: 78.2676 }, time: "08:00 AM", type: "transport" },
          { _key: "hr2b", title: "White-Water Rafting on the Ganges", description: "16 km stretch from Shivpuri to Rishikesh — Grade 2-3 rapids including 'Golf Course', 'Club House', and 'Three Blind Mice'. ~2 hrs on the water. Book with licensed operator.", location: { name: "Shivpuri Rafting Point", lat: 30.1333, lng: 78.2667 }, time: "09:30 AM", type: "activity", notes: "Cost: ₹600–1,200 pp. Lifejackets mandatory. Best Sep–Nov and Mar–May. Avoid monsoon season." },
          { _key: "hr2c", title: "Lunch at a Riverside Café", description: "Head to Tapovan and pick from Chotiwala, Little Buddha Café, or Oasis Café for Israeli, Indian, or continental food with Ganges views.", location: { name: "Tapovan, Rishikesh", lat: 30.1317, lng: 78.3119 }, time: "01:00 PM", type: "food" },
          { _key: "hr2d", title: "Laxman Jhula & Ram Jhula", description: "Walk across these iconic iron suspension bridges over the Ganges. The 13-storey Trayambakeshwar Temple next to Laxman Jhula is a must-visit. Monkeys are friendly but watch your snacks.", location: { name: "Laxman Jhula", lat: 30.1169, lng: 78.3241 }, time: "03:00 PM", type: "sightseeing" },
          { _key: "hr2e", title: "Beatles Ashram (Maharishi Mahesh Yogi)", description: "The ashram where the Beatles meditated in 1968 — now an atmospheric art-covered ruin open for exploration (₹150 pp entry). Surreal and photogenic.", location: { name: "Maharishi Mahesh Yogi Ashram", lat: 30.1005, lng: 78.3166 }, time: "04:30 PM", type: "sightseeing" },
          { _key: "hr2f", title: "Sunset Yoga / Evening by the Ghats", description: "Many yoga ashrams offer evening sessions (₹200–500). Alternatively, simply sit by the ghat with a masala chai and watch the river.", time: "06:00 PM", type: "activity" },
          { _key: "hr2g", title: "Overnight in Rishikesh", description: "Stay at a riverside camp near Shivpuri or a guesthouse in Tapovan for the best atmosphere.", type: "accommodation" },
        ],
      },
      {
        _key: "hr-day3",
        dayNumber: 3,
        title: "Sunrise at Kunjapuri — Return to New Delhi",
        date: undefined,
        summary: "A predawn drive to Kunjapuri Devi temple for a jaw-dropping Himalayan sunrise over snow peaks, then a leisurely return to Haridwar for the afternoon Aarti before the drive back to Delhi.",
        activities: [
          { _key: "hr3a", title: "Predawn Drive to Kunjapuri Devi (35 km)", description: "Start at 4 AM — the mountain road to Kunjapuri temple (1,676 m) takes ~1.5 hrs. Cold and dark — carry layers.", location: { name: "Kunjapuri Devi Temple", lat: 30.2547, lng: 78.3647 }, time: "04:00 AM", type: "transport" },
          { _key: "hr3b", title: "Sunrise from Kunjapuri (1,676 m)", description: "On clear days, the panorama spans Gangotri, Yamunotri, Chaukhamba, Kedarnath, and Srikantha peaks draped in pink-gold light. One of the finest sunrise spots in Uttarakhand.", location: { name: "Kunjapuri Devi Temple", lat: 30.2547, lng: 78.3647 }, time: "06:00 AM", type: "sightseeing", notes: "Dress very warm — temperatures near 0°C in winter. Reach 20 min before sunrise." },
          { _key: "hr3c", title: "Return to Rishikesh, Breakfast & Check-Out", description: "Descend to Rishikesh for a hot breakfast — try rohtang paratha and tea at a local dhaba.", time: "08:30 AM", type: "food" },
          { _key: "hr3d", title: "Back to Haridwar (Optional: Afternoon Aarti)", description: "If time permits, stop at Har Ki Pauri for the smaller but beautiful afternoon Aarti (4 PM).", location: { name: "Har Ki Pauri", lat: 29.9583, lng: 78.1642 }, time: "03:30 PM", type: "sightseeing" },
          { _key: "hr3e", title: "Drive back to New Delhi (~250 km)", description: "Depart by 4–5 PM to reach Delhi by 10 PM. Stop at Murthal for dinner.", location: { name: "New Delhi", lat: 28.6139, lng: 77.209 }, time: "04:30 PM", type: "transport" },
        ],
      },
    ],
  },

  // 2. Nainital & Jim Corbett — 3 Days
  {
    _id: "trip-nainital-jim-corbett-3-days",
    title: "Nainital & Jim Corbett — 3 Days",
    slug: "nainital-jim-corbett-3-days",
    excerpt:
      "A perfect 3-day weekend escape into Uttarakhand's most beloved destinations — the colonial lake town of Nainital with its snow-season cable cars, and the ancient forests of Jim Corbett National Park where Bengal tigers, elephants, and leopards roam. Best combined into one unforgettable circuit.",
    tags: ["Wildlife", "Hills", "Uttarakhand", "India", "Nature", "Weekend Getaway", "Jim Corbett", "Nainital", "North India"],
    country: "India",
    bestSuggestedMonth: "November – June",
    status: "published",
    viewCount: 0,
    totalBudget: 12000,
    currency: "INR",
    tripType: "Nature & Wildlife",
    readingTime: 5,
    _createdAt: "2026-09-09T01:00:00Z",
    _updatedAt: "2026-09-09T01:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "nc-day1",
        dayNumber: 1,
        title: "Delhi → Nainital — The Lake City Arrival",
        date: undefined,
        summary: "Drive from Delhi (~300 km, 6 hrs) to Nainital perched at 2,084 m around the emerald Naini Lake. Afternoon boat ride, Mall Road walk, and evening at the lake.",
        activities: [
          { _key: "nc1a", title: "Depart Delhi (Early Morning)", description: "Leave by 4–5 AM via Moradabad to reach Nainital by mid-morning. Road is NH-9 then state highway through Ramnagar/Kaladungi.", location: { name: "New Delhi", lat: 28.6139, lng: 77.209 }, time: "04:30 AM", type: "transport" },
          { _key: "nc1b", title: "Arrive Nainital & Check-In", description: "Check into a hotel on the Mall Road or near Tallital for lake views. Freshen up.", location: { name: "Nainital", lat: 29.3919, lng: 79.4542 }, time: "11:00 AM", type: "accommodation" },
          { _key: "nc1c", title: "Boat Ride on Naini Lake", description: "Rent a rowboat or pedal boat on the iconic crescent-shaped lake. Gorgeous views of the surrounding wooded hills.", location: { name: "Naini Lake", lat: 29.3906, lng: 79.4571 }, time: "12:00 PM", type: "activity", notes: "Cost: ₹200–400 per hour. Life jackets provided." },
          { _key: "nc1d", title: "Lunch on Mall Road", description: "Try Sakley's Restaurant or local cafés on Mall Road for cheese toast, momos, and Maggi.", time: "01:30 PM", type: "food" },
          { _key: "nc1e", title: "Snow View Point (Cable Car)", description: "Take the cable car (ropeway) to Snow View Point at 2,270 m for views of Nanda Devi (if clear). ₹175 pp for cable car.", location: { name: "Snow View Point, Nainital", lat: 29.4028, lng: 79.4553 }, time: "03:00 PM", type: "sightseeing" },
          { _key: "nc1f", title: "Naina Devi Temple", description: "One of the 51 Shakti Peethas, situated on the northern shore of Naini Lake. A short and spiritually significant visit.", location: { name: "Naina Devi Temple", lat: 29.3964, lng: 79.4542 }, time: "05:00 PM", type: "sightseeing" },
          { _key: "nc1g", title: "Evening at Flats (The Mall)", description: "Stroll along the flat ground by the lake as locals and tourists fill the promenade. Street food — bhelpuri, chaat, and corn.", time: "06:30 PM", type: "activity" },
          { _key: "nc1h", title: "Overnight in Nainital", description: "Recommended: Manu Maharani Classic, The Naini Retreat, or budget guesthouses near Tallital.", time: "08:30 PM", type: "accommodation" },
        ],
      },
      {
        _key: "nc-day2",
        dayNumber: 2,
        title: "Nainital Exploration — Eco Cave & Tiffin Top",
        date: undefined,
        summary: "A full day covering Nainital's best viewpoints and natural attractions before driving to Jim Corbett in the evening.",
        activities: [
          { _key: "nc2a", title: "Sunrise Walk to Tiffin Top (Dorothy Seat)", description: "Early morning 2 km walk through oak forests to the best sunrise viewpoint over Naini Lake (2,292 m). Allow 45 min each way.", location: { name: "Tiffin Top, Nainital", lat: 29.4026, lng: 79.4497 }, time: "05:30 AM", type: "activity" },
          { _key: "nc2b", title: "Breakfast at Hotel", time: "08:00 AM", type: "food" },
          { _key: "nc2c", title: "Eco Cave Gardens", description: "Six interconnected rocky caves representing different animals — fun for families. Musical fountain show in the evening.", location: { name: "Eco Cave Gardens, Nainital", lat: 29.3911, lng: 79.4626 }, time: "10:00 AM", type: "activity", notes: "Entry ₹50 adults, ₹25 children." },
          { _key: "nc2d", title: "Bhimtal or Sattal (Optional Excursion)", description: "Drive 25 km to Bhimtal lake (larger and less crowded than Naini) or the lovely Seven Sisters lakes at Sattal for a quiet picnic.", location: { name: "Bhimtal", lat: 29.3396, lng: 79.5617 }, time: "11:30 AM", type: "sightseeing" },
          { _key: "nc2e", title: "Afternoon Check-Out & Drive to Jim Corbett (~65 km)", description: "Check out post-lunch and drive to Ramnagar — the gateway to Jim Corbett. Winding roads through jungle scenery.", location: { name: "Ramnagar (Jim Corbett Gate)", lat: 29.3944, lng: 79.1231 }, time: "02:00 PM", type: "transport" },
          { _key: "nc2f", title: "Check-In at Corbett Jungle Resort", description: "Several eco-resorts and river-facing camps near Dhikala and Bijrani zones. Evening jungle sounds and bonfire.", location: { name: "Jim Corbett National Park", lat: 29.5392, lng: 78.7682 }, time: "05:00 PM", type: "accommodation" },
        ],
      },
      {
        _key: "nc-day3",
        dayNumber: 3,
        title: "Jim Corbett Safari — Wildlife & Return to Delhi",
        date: undefined,
        summary: "A thrilling early morning jeep safari through India's oldest national park — home to Bengal tigers, Asian elephants, leopards, sloth bears, and over 600 bird species — followed by the return drive to Delhi.",
        activities: [
          { _key: "nc3a", title: "Early Morning Jeep Safari (Bijrani / Jhirna Zone)", description: "6 AM jeep safari into the core zones. Bijrani zone has the highest tiger density; Jhirna is open year-round. 4-hr safari with naturalist guide.", location: { name: "Bijrani Zone, Jim Corbett", lat: 29.4667, lng: 78.8333 }, time: "05:30 AM", type: "activity", notes: "Book online in advance on the official Uttarakhand Forest Dept portal. Gypsy safari ₹2,500–4,000 per vehicle + entry fees." },
          { _key: "nc3b", title: "Breakfast Back at Resort", description: "Return from safari by 10 AM for breakfast. Tiger pugmarks, peacocks, and hornbills are virtually guaranteed; actual tiger sighting is seasonal.", time: "10:00 AM", type: "food" },
          { _key: "nc3c", title: "Corbett Museum (Optional)", description: "Jim Corbett's bungalow 'Choti Haldwani' turned into a museum — memorabilia, rifles, and photographs of the legendary hunter-turned-conservationist.", location: { name: "Corbett Museum, Kaladhungi", lat: 29.3053, lng: 79.0744 }, time: "11:30 AM", type: "sightseeing" },
          { _key: "nc3d", title: "Drive Back to Delhi (~250 km)", description: "Depart Ramnagar by noon via Moradabad. Allow 5–6 hrs. Arrive Delhi by evening.", location: { name: "New Delhi", lat: 28.6139, lng: 77.209 }, time: "12:30 PM", type: "transport" },
        ],
      },
    ],
  },

  // 3. Shimla, Manali, Dharamshala & Dalhousie — 5 Days
  {
    _id: "trip-himachal-5-days",
    title: "Shimla, Manali, Dharamshala & Dalhousie — 5 Days",
    slug: "himachal-shimla-manali-dharamshala-dalhousie-5-days",
    excerpt:
      "A grand 5-day Himachal circuit covering the colonial charm of Shimla's Mall Road and Jakhoo temple, Manali's snow-covered Rohtang and Solang Valley adventures, the Dalai Lama's home in McLeod Ganj-Dharamshala, and the Scottish-feel hill station of Dalhousie. The Himalayan grand tour.",
    tags: ["Hills", "Himachal Pradesh", "India", "Snow", "Adventure", "Colonial", "Mountains", "Road Trip", "North India"],
    country: "India",
    bestSuggestedMonth: "March – June, October – November",
    status: "published",
    viewCount: 0,
    totalBudget: 25000,
    currency: "INR",
    tripType: "Hill Station & Adventure",
    readingTime: 8,
    _createdAt: "2026-09-09T02:00:00Z",
    _updatedAt: "2026-09-09T02:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "hm-day1",
        dayNumber: 1,
        title: "Delhi → Shimla — Mall Road & Jakhoo Hill",
        date: undefined,
        summary: "Overnight bus or early drive (~350 km, 8 hrs) to Shimla, the former summer capital of British India at 2,206 m. Stroll the iconic Mall Road, visit the colonial Christ Church, and hike to Jakhoo Temple.",
        activities: [
          { _key: "hm1a", title: "Arrive Shimla & Check-In", description: "HPTDC or private hotels on or near Mall Road. Drop bags and explore on foot.", location: { name: "Shimla", lat: 31.1048, lng: 77.1734 }, time: "09:00 AM", type: "accommodation" },
          { _key: "hm1b", title: "The Mall Road & Scandal Point", description: "The pedestrian promenade of colonial-era shops, cafés, and buildings. Start at Scandal Point — the historic meeting place.", location: { name: "Mall Road, Shimla", lat: 31.1048, lng: 77.1734 }, time: "10:30 AM", type: "sightseeing" },
          { _key: "hm1c", title: "Christ Church & Gaiety Theatre", description: "The neo-Gothic Christ Church (1857) is Shimla's landmark. Gaiety Theatre next door hosts cultural performances.", location: { name: "Christ Church, Shimla", lat: 31.1054, lng: 77.1721 }, time: "11:30 AM", type: "sightseeing" },
          { _key: "hm1d", title: "Lunch at Indian Coffee House or Wake & Bake", description: "Iconic cafés on Mall Road — try the sandwiches, omelettes, and coffee.", time: "01:00 PM", type: "food" },
          { _key: "hm1e", title: "Jakhoo Temple (2,455 m)", description: "2 km steep walk from Mall Road through dense forests to the Hanuman temple at the highest point in Shimla. Spectacular views of snow peaks. Monkeys abound!", location: { name: "Jakhoo Temple, Shimla", lat: 31.1035, lng: 77.1849 }, time: "03:00 PM", type: "sightseeing", notes: "Carry a stick to deter monkeys. Sunrise visit is equally rewarding." },
          { _key: "hm1f", title: "Overnight in Shimla", time: "07:00 PM", type: "accommodation" },
        ],
      },
      {
        _key: "hm-day2",
        dayNumber: 2,
        title: "Kufri Day Trip & Drive to Manali",
        date: undefined,
        summary: "Morning at Kufri for snow activities (seasonal), then a scenic 7-hour drive through Kullu Valley to Manali — the 'Valley of the Gods'.",
        activities: [
          { _key: "hm2a", title: "Kufri Morning (15 km from Shimla)", description: "Snow activities (Jan–Mar), yak rides, and Himalayan Nature Park with Himalayan pheasants. Chail Palace (45 km) is an extension for heritage lovers.", location: { name: "Kufri", lat: 31.0994, lng: 77.2539 }, time: "08:00 AM", type: "activity", notes: "Snow present Nov–Feb; lush meadows Mar–Jun." },
          { _key: "hm2b", title: "Drive Shimla → Manali (~270 km, 7 hrs)", description: "Via Mandi — stunning Beas River valley route. Stop at Mandi (Pandoh Dam viewpoint) and Kullu for local crafts/shawls.", location: { name: "Manali", lat: 32.2396, lng: 77.1887 }, time: "10:00 AM", type: "transport" },
          { _key: "hm2c", title: "Arrive Manali & Check-In", description: "Manali at 2,050 m — stay in Old Manali for a bohemian vibe or near the Mall Road for convenience.", time: "05:30 PM", type: "accommodation" },
          { _key: "hm2d", title: "Stroll Old Manali & Hadimba Temple", description: "Quick evening visit to the unique pagoda-style Hadimba Devi Temple (1553 AD) surrounded by ancient deodar cedar forest.", location: { name: "Hadimba Temple, Manali", lat: 32.2464, lng: 77.1777 }, time: "06:30 PM", type: "sightseeing" },
        ],
      },
      {
        _key: "hm-day3",
        dayNumber: 3,
        title: "Rohtang Pass / Solang Valley — Manali Snow & Adventure",
        date: undefined,
        summary: "Full day in Manali covering Solang Valley for adventure sports and (if open, May–Oct) the legendary Rohtang Pass at 3,978 m — gateway to Lahaul-Spiti.",
        activities: [
          { _key: "hm3a", title: "Solang Valley (14 km from Manali)", description: "Paragliding (₹1,200–2,000), zorbing, skiing (winter), horse riding, and cable car rides. Stunning valley framed by snow peaks.", location: { name: "Solang Valley", lat: 32.3283, lng: 77.1523 }, time: "08:00 AM", type: "activity", notes: "Book paragliding with licensed operators. Morning slots preferred before winds pick up." },
          { _key: "hm3b", title: "Rohtang Pass (3,978 m) — Seasonal", description: "If open (typically May–Oct): the high-altitude pass with snow, glaciers, and dramatic Lahaul valley views. Inner Line Permit required online (₹500 pp). Alternatively, visit Atal Tunnel viewpoint year-round.", location: { name: "Rohtang Pass", lat: 32.3717, lng: 77.2451 }, time: "11:00 AM", type: "sightseeing", notes: "Only a limited number of vehicles permitted per day. Book e-permit a day in advance at rohtangpermit.nic.in." },
          { _key: "hm3c", title: "Vashisht Hot Springs & Temple", description: "Return via Vashisht village — natural sulphur hot springs (communal pools, free) and an ancient Vashisht Rishi temple.", location: { name: "Vashisht, Manali", lat: 32.2574, lng: 77.1962 }, time: "04:00 PM", type: "sightseeing" },
          { _key: "hm3d", title: "Dinner in Old Manali", description: "Restaurant row in Old Manali — try The Lazy Dog, Dylan's Toasted & Roasted, or Johnson's Café for wood-fired pizza or continental fare.", time: "07:00 PM", type: "food" },
          { _key: "hm3e", title: "Overnight in Manali", type: "accommodation" },
        ],
      },
      {
        _key: "hm-day4",
        dayNumber: 4,
        title: "Drive to Dharamshala — McLeod Ganj & Dalai Lama Temple",
        date: undefined,
        summary: "A 5-hour drive from Manali to Dharamshala (McLeod Ganj), home of the Dalai Lama and the Tibetan Government-in-Exile. Namgyal Monastery, Bhagsu Waterfall, and café culture.",
        activities: [
          { _key: "hm4a", title: "Drive Manali → Dharamshala (~200 km, 5 hrs)", description: "Via Mandi and Palampur. The Kangra Valley route is scenic — tea gardens, Dhauladhar range backdrop.", location: { name: "Dharamshala", lat: 32.219, lng: 76.3234 }, time: "08:00 AM", type: "transport" },
          { _key: "hm4b", title: "Arrive McLeod Ganj, Check-In", description: "Upper Dharamshala (McLeod Ganj) at 1,457 m — the 'Little Lhasa' with Tibetan flags, monasteries, and momos everywhere.", time: "01:00 PM", type: "accommodation" },
          { _key: "hm4c", title: "Namgyal Monastery & Tsuglagkhang Complex", description: "The official monastery of the Dalai Lama — a serene complex with a golden Buddha, prayer wheel corridors, and the Tibet Museum documenting the struggle for Tibetan freedom.", location: { name: "Namgyal Monastery, McLeod Ganj", lat: 32.2229, lng: 76.3233 }, time: "02:30 PM", type: "sightseeing" },
          { _key: "hm4d", title: "Bhagsu Waterfall Trek (3 km)", description: "Easy 1.5 km walk to the Bhagsu waterfall and Nag Dal temple. Continue to the café at the waterfall for maggi and chai with views.", location: { name: "Bhagsu Waterfall", lat: 32.2266, lng: 76.3352 }, time: "04:30 PM", type: "activity" },
          { _key: "hm4e", title: "Dinner: Tibetan Momos & Thukpa", description: "McLeod Ganj is paradise for momos — steam, fry, jhol (soup momos). Try Nick's Italian Kitchen for dessert.", time: "07:30 PM", type: "food" },
          { _key: "hm4f", title: "Overnight in McLeod Ganj / Dharamshala", type: "accommodation" },
        ],
      },
      {
        _key: "hm-day5",
        dayNumber: 5,
        title: "Dalhousie & Khajjiar — Return Drive",
        date: undefined,
        summary: "Morning drive to Dalhousie (~120 km, 3.5 hrs), a Victorian-era hill station known for its Scots-Irish architecture, and a stop at Khajjiar — the 'Mini Switzerland of India' — before returning to Delhi or Chandigarh overnight.",
        activities: [
          { _key: "hm5a", title: "Drive Dharamshala → Dalhousie (~120 km, 3.5 hrs)", description: "Via Pathankot or Nurpur. Pine forests, clean mountain air.", location: { name: "Dalhousie", lat: 32.5393, lng: 75.9723 }, time: "07:00 AM", type: "transport" },
          { _key: "hm5b", title: "Dalhousie Mall Road & Gandhi Chowk", description: "The colonial town spread across 5 hills — walk the Mall Road (Thandi Sarak), Gandhi Chowk, and St. Francis Church (1894). Spectacular Pir Panjal range views on clear days.", location: { name: "Gandhi Chowk, Dalhousie", lat: 32.5393, lng: 75.9723 }, time: "11:00 AM", type: "sightseeing" },
          { _key: "hm5c", title: "Khajjiar — Mini Switzerland (22 km)", description: "A circular meadow ringed by dense deodar forests with a small lake in the centre. Paragliding and horse riding available. UNESCO nominated 'mini Switzerland of India'.", location: { name: "Khajjiar", lat: 32.5394, lng: 76.0693 }, time: "01:00 PM", type: "sightseeing", notes: "Altitude 1,951 m. Best visited in the afternoon when crowds thin." },
          { _key: "hm5d", title: "Drive Back to Delhi / Chandigarh", description: "Dalhousie → Chandigarh is ~280 km (6 hrs). Chandigarh → Delhi is another 250 km (4 hrs). Or overnight in Chandigarh and return fresh next morning.", location: { name: "Delhi / Chandigarh", lat: 28.6139, lng: 77.209 }, time: "04:00 PM", type: "transport" },
        ],
      },
    ],
  },

  // 4. Jammu & Kashmir — 5 Days
  {
    _id: "trip-jammu-kashmir-5-days",
    title: "Jammu & Kashmir — 5 Days",
    slug: "jammu-kashmir-5-days",
    excerpt:
      "Five days in paradise — the breathtaking Dal Lake houseboats of Srinagar, Mughal gardens, Gulmarg's Gondola (Asia's highest cable car), the meadow-and-glacier world of Pahalgam's Betaab Valley, and the Vaishno Devi pilgrimage in Jammu. Kashmir is India's crown jewel and truly heaven on Earth.",
    tags: ["Kashmir", "Jammu", "India", "Mountains", "Dal Lake", "Shikara", "Spiritual", "Snow", "Adventure", "North India"],
    country: "India",
    bestSuggestedMonth: "April – June, October – November",
    status: "published",
    viewCount: 0,
    totalBudget: 30000,
    currency: "INR",
    tripType: "Scenic & Spiritual",
    readingTime: 8,
    _createdAt: "2026-09-09T03:00:00Z",
    _updatedAt: "2026-09-09T03:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "jk-day1",
        dayNumber: 1,
        title: "Arrive Srinagar — Dal Lake Shikara & Mughal Gardens",
        date: undefined,
        summary: "Fly into Srinagar (~1.5 hrs from Delhi). Check into a houseboat on Dal Lake, take a shikara (traditional wooden boat) ride at sunset, and visit the stunning Mughal-era Nishat Bagh or Shalimar Bagh gardens.",
        activities: [
          { _key: "jk1a", title: "Fly into Srinagar Airport", description: "Morning flight from Delhi or Mumbai (~1.5 hrs). Srinagar at 1,585 m — mild and beautiful.", location: { name: "Sheikh ul-Alam International Airport, Srinagar", lat: 33.9871, lng: 74.7742 }, time: "09:00 AM", type: "transport" },
          { _key: "jk1b", title: "Check-In: Dal Lake Houseboat", description: "Stay in a traditional hand-carved cedar houseboat on Dal Lake — furnished with Kashmiri carpets, walnut wood, and a private shikara. An unmissable experience.", location: { name: "Dal Lake, Srinagar", lat: 34.0837, lng: 74.8204 }, time: "11:00 AM", type: "accommodation", notes: "Recommended houseboats: Buckingham Palace, Broadway, Sukoon. Book in advance." },
          { _key: "jk1c", title: "Shikara Ride on Dal Lake", description: "A wooden shikara glide around the famous floating vegetable markets, lotus gardens, and willow-lined channels. Sunset is the best time.", location: { name: "Dal Lake", lat: 34.0837, lng: 74.8204 }, time: "12:30 PM", type: "activity", notes: "Negotiate price upfront — ₹500–800 per hour for a private shikara." },
          { _key: "jk1d", title: "Mughal Gardens: Nishat Bagh or Shalimar Bagh", description: "Nishat Bagh ('Garden of Joy') — 12-terraced Mughal garden with Zabarwan mountain backdrop and Dal Lake foreground. Alternatively, Shalimar Bagh (built by Emperor Jahangir for Noor Jahan).", location: { name: "Nishat Bagh", lat: 34.0826, lng: 74.8702 }, time: "03:00 PM", type: "sightseeing", notes: "Entry ₹10 pp. Stunning in tulip season (March-April)." },
          { _key: "jk1e", title: "Hazratbal Shrine (Optional)", description: "The only mosque in Kashmir with a Mughal-style dome — houses the Moi-e-Muqqadas (sacred hair of Prophet Muhammad). Peaceful lakeside location.", location: { name: "Hazratbal Shrine", lat: 34.1269, lng: 74.8355 }, time: "05:30 PM", type: "sightseeing" },
          { _key: "jk1f", title: "Dinner: Wazwan on the Houseboat", description: "A traditional Kashmiri Wazwan feast — Rogan Josh, Yakhni, Gushtaba (pounded mutton balls in yoghurt gravy), Seekh Kabab, and Kashmiri pulao.", time: "08:00 PM", type: "food" },
        ],
      },
      {
        _key: "jk-day2",
        dayNumber: 2,
        title: "Gulmarg — Asia's Highest Gondola & Skiing",
        date: undefined,
        summary: "A full-day excursion to Gulmarg (52 km, 1.5 hrs) — the world's highest green golf course in summer and India's premier ski destination in winter. Take the Gondola to Kongdoori (Phase 1) and Apharwat Peak (Phase 2) at 4,200 m.",
        activities: [
          { _key: "jk2a", title: "Drive to Gulmarg (52 km, 1.5 hrs)", description: "Winding road through pine forests and Tangmarg. Gulmarg at 2,650 m.", location: { name: "Gulmarg", lat: 34.0494, lng: 74.3806 }, time: "08:00 AM", type: "transport" },
          { _key: "jk2b", title: "Gondola Ride — Phase 1 (Kongdoori, 3,099 m)", description: "Asia's second-highest and longest cable car. Phase 1 reaches Kongdoori for ski slopes and meadow walks in summer.", location: { name: "Gulmarg Gondola", lat: 34.0488, lng: 74.3803 }, time: "09:30 AM", type: "activity", notes: "Gondola Phase 1: ₹900 pp (return). Phase 2 to Apharwat Peak: ₹1,200 pp additional. Book at the counter — queues can be long." },
          { _key: "jk2c", title: "Gondola Phase 2 — Apharwat Peak (4,200 m)", description: "One of the finest high-altitude glacier experiences accessible by cable car in India. Snow year-round. Sweeping views of Nanga Parbat (8,126 m) on clear days.", location: { name: "Apharwat Peak, Gulmarg", lat: 34.0782, lng: 74.37 }, time: "11:00 AM", type: "sightseeing", notes: "Dress very warmly — temperatures near 0°C even in June. Altitude sickness possible for those coming directly from low altitude." },
          { _key: "jk2d", title: "Skiing / Snow Activities (Winter) or Nature Walk (Summer)", description: "Ski season: December–February with JKSA-certified instructors available. Summer: walk through wildflower meadows; horse rides to Khilanmarg meadow available.", time: "12:00 PM", type: "activity" },
          { _key: "jk2e", title: "Lunch at Gulmarg & Return to Srinagar", description: "Try Bakkarwali wazwan or simple dal-roti at one of the local dhabas before the return drive.", time: "02:00 PM", type: "food" },
          { _key: "jk2f", title: "Evening: Local Shawl & Handicraft Shopping", description: "Srinagar's Polo View Market and Lal Chowk area for Pashmina shawls (buy from certified dealers — certificate of authenticity available), carpet emporiums, papier-mâché boxes, walnut wood carvings, and saffron.", location: { name: "Polo View Market, Srinagar", lat: 34.0926, lng: 74.7975 }, time: "05:30 PM", type: "activity" },
        ],
      },
      {
        _key: "jk-day3",
        dayNumber: 3,
        title: "Pahalgam — Betaab Valley & Lidder River",
        date: undefined,
        summary: "Drive 95 km (2.5 hrs) to Pahalgam — the 'Valley of Shepherds' and base camp for the Amarnath Yatra. Betaab Valley (Bollywood filming location), Chandanwari meadows, and Aru Valley.",
        activities: [
          { _key: "jk3a", title: "Drive Srinagar → Pahalgam (95 km, 2.5 hrs)", description: "Via Anantnag. The Lidder river runs alongside the road through saffron fields and apple orchards.", location: { name: "Pahalgam", lat: 34.0151, lng: 75.3147 }, time: "08:00 AM", type: "transport" },
          { _key: "jk3b", title: "Betaab Valley", description: "Named after the 1983 Bollywood film — lush green meadow surrounded by snow-capped peaks and the Lidder river. One of Kashmir's most scenic valleys.", location: { name: "Betaab Valley, Pahalgam", lat: 34.0455, lng: 75.3682 }, time: "11:00 AM", type: "sightseeing", notes: "Local jeeps ₹300–500 pp for the 15 km drive from Pahalgam." },
          { _key: "jk3c", title: "Chandanwari & Sheshnag Lake (Optional Trek)", description: "Chandanwari at 2,895 m is the start point of the Amarnath Yatra trek. Snow bridges in summer make for fantastic photos.", location: { name: "Chandanwari", lat: 34.0833, lng: 75.4167 }, time: "01:30 PM", type: "activity" },
          { _key: "jk3d", title: "Aru Valley", description: "An untouched meadow 11 km from Pahalgam — base for trekking to Kolahoi Glacier. Horse rides available.", location: { name: "Aru Valley, Pahalgam", lat: 34.0581, lng: 75.2603 }, time: "03:30 PM", type: "sightseeing" },
          { _key: "jk3e", title: "Evening by the Lidder River", description: "Sit by the crystal-clear Lidder river in Pahalgam town — stone-skipping, chai, and fresh mountain air.", time: "05:30 PM", type: "activity" },
          { _key: "jk3f", title: "Overnight in Pahalgam or Return to Srinagar", description: "Recommended: Pahalgam Hotel (JKTDC), or the excellent Pine Spring Hotel.", type: "accommodation" },
        ],
      },
      {
        _key: "jk-day4",
        dayNumber: 4,
        title: "Srinagar Exploration — Old City, Shankaracharya & Jammu Drive",
        date: undefined,
        summary: "Morning in Srinagar's old city — Jama Masjid, Khanqah-i-Moula, and the ancient Shankaracharya Temple. After lunch, drive (~300 km, 6 hrs) to Jammu for the Vaishno Devi pilgrimage.",
        activities: [
          { _key: "jk4a", title: "Shankaracharya Temple (Takht-e-Suleiman)", description: "Ancient Shiva temple atop a hill at 1,000 ft above Srinagar (6th century BC) — 243 steps from the base. Panoramic view of the entire Dal Lake and city.", location: { name: "Shankaracharya Temple, Srinagar", lat: 34.0671, lng: 74.8428 }, time: "07:30 AM", type: "sightseeing" },
          { _key: "jk4b", title: "Jama Masjid & Old City Walk", description: "Friday Mosque of Srinagar (1402 AD) — 300 wooden pillars, each from a single deodar tree. The surrounding old city lanes (muhallas) are full of traditional craftsmen.", location: { name: "Jama Masjid, Srinagar", lat: 34.0967, lng: 74.8025 }, time: "09:30 AM", type: "sightseeing" },
          { _key: "jk4c", title: "Khanqah-i-Moula (Shah-i-Hamadan)", description: "One of the oldest wooden mosques in Kashmir (1395 AD), sitting dramatically on the banks of the Jhelum river.", location: { name: "Khanqah-i-Moula, Srinagar", lat: 34.0951, lng: 74.8033 }, time: "10:30 AM", type: "sightseeing" },
          { _key: "jk4d", title: "Farewell Lunch & Last Shikara Moment", description: "Last meal in Srinagar — Kashmiri Dum Aloo, lotus stem (nadru) dishes, and the famous Kahwa green tea with saffron, cardamom, and almond.", time: "12:30 PM", type: "food" },
          { _key: "jk4e", title: "Drive Srinagar → Jammu (~290 km, 6 hrs, NH-44)", description: "The Jammu-Srinagar National Highway via Banihal Tunnel (3 km). Arrive Jammu by evening.", location: { name: "Jammu", lat: 32.7266, lng: 74.857 }, time: "02:00 PM", type: "transport" },
          { _key: "jk4f", title: "Overnight in Jammu (Register for Vaishno Devi)", description: "Register for the Vaishno Devi Yatra online (shrine board website) or at the counter in Katra. Early registration recommended.", location: { name: "Jammu", lat: 32.7266, lng: 74.857 }, time: "08:00 PM", type: "accommodation" },
        ],
      },
      {
        _key: "jk-day5",
        dayNumber: 5,
        title: "Vaishno Devi Pilgrimage — Return Journey",
        date: undefined,
        summary: "One of India's holiest pilgrimages — a 14 km trek (each way) from Katra (30 km from Jammu) to the cave shrine of Mata Vaishno Devi at 5,200 ft. Battery cars, palki, and helicopter options available.",
        activities: [
          { _key: "jk5a", title: "Drive Jammu → Katra (50 km, 1 hr)", description: "Base camp of the Vaishno Devi Yatra. Register at the RFID counter and receive your yatra parchi.", location: { name: "Katra", lat: 32.9912, lng: 74.9314 }, time: "05:00 AM", type: "transport" },
          { _key: "jk5b", title: "Trek to Vaishno Devi Shrine (14 km)", description: "Trek from Katra (1,560 m) to the holy cave shrine (1,700 m) via Banganga, Charan Paduka, Adhkwari, and Sanjichhat. Helicopter available from Katra to Sanjichhat (₹1,050 one-way). Battery-powered cars (₹350) and palkis also available.", location: { name: "Vaishno Devi Shrine", lat: 32.9935, lng: 74.9519 }, time: "06:00 AM", type: "activity", notes: "Total trek: 14 km one-way (~4–5 hrs). Darshan at the cave takes 30–60 min depending on crowd. Sturdy shoes and warm layers essential." },
          { _key: "jk5c", title: "Darshan at Vaishno Devi Cave Shrine", description: "The 30 m natural rock cave enshrines three natural rock formations (pindies) — Maha Kali, Maha Lakshmi, and Maha Saraswati. One of the most visited religious sites in India.", location: { name: "Vaishno Devi Cave", lat: 32.9935, lng: 74.9519 }, time: "10:00 AM", type: "sightseeing" },
          { _key: "jk5d", title: "Descent & Lunch at Katra", description: "Descent via the same or Tarakote Marg. Prasad (halwa) and a full meal at Katra dhabas.", time: "01:00 PM", type: "food" },
          { _key: "jk5e", title: "Fly or Drive Back to Delhi", description: "Jammu Airport (35 km from Katra) has direct flights to Delhi (~1 hr). Alternatively, take the Jammu Rajdhani Express (5.5 hrs) or drive (~600 km, 10 hrs).", location: { name: "Jammu Airport", lat: 32.6891, lng: 74.8374 }, time: "04:00 PM", type: "transport" },
        ],
      },
    ],
  },

  // 5. Agra, Mathura & Nearby — 3 Days
  {
    _id: "trip-agra-mathura-3-days",
    title: "Agra, Mathura & Nearby — 3 Days",
    slug: "agra-mathura-3-days",
    excerpt:
      "Three days along the Yamuna's sacred and imperial arc — the Taj Mahal at sunrise (one of the world's greatest monuments), Agra Fort, Fatehpur Sikri's ghost city, Mathura's 25 temples, and Vrindavan's colourful Banke Bihari. India's most iconic heritage triangle, just 200 km from Delhi.",
    tags: ["Heritage", "Spiritual", "Uttar Pradesh", "India", "Taj Mahal", "History", "Weekend Getaway", "North India"],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 10000,
    currency: "INR",
    tripType: "Heritage & Spiritual",
    readingTime: 5,
    _createdAt: "2026-09-09T04:00:00Z",
    _updatedAt: "2026-09-09T04:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "am-day1",
        dayNumber: 1,
        title: "Mathura & Vrindavan — Krishna's Sacred Land",
        date: undefined,
        summary: "Start the tour at Mathura (birthplace of Lord Krishna) and Vrindavan — visiting the Krishna Janmabhoomi, Dwarkadhish Temple, Prem Mandir, and Banke Bihari. Experience the aarti and Holi (if in season).",
        activities: [
          { _key: "am1a", title: "Delhi → Mathura (180 km, 3 hrs via Yamuna Expressway)", description: "Fast expressway — reach Mathura by mid-morning. Yamuna Expressway toll ~₹300.", location: { name: "Mathura", lat: 27.4924, lng: 77.6737 }, time: "06:00 AM", type: "transport" },
          { _key: "am1b", title: "Krishna Janmabhoomi Temple", description: "Birthplace of Lord Krishna — the sanctum sanctorum marks the exact prison cell where Krishna was born to Devaki and Vasudeva.", location: { name: "Krishna Janmabhoomi, Mathura", lat: 27.5006, lng: 77.6551 }, time: "09:30 AM", type: "sightseeing", notes: "Photography not permitted inside the sanctum. Leave shoes at the counter." },
          { _key: "am1c", title: "Dwarkadhish Temple", description: "One of the finest temples in Mathura — built in 1814, with exquisite haveli-style architecture. Lord Krishna is worshipped here as the King of Dwarka.", location: { name: "Dwarkadhish Temple, Mathura", lat: 27.4998, lng: 77.6539 }, time: "11:00 AM", type: "sightseeing" },
          { _key: "am1d", title: "Boat Ride on Yamuna at Vishram Ghat", description: "A peaceful 20-min rowboat ride on the sacred Yamuna from Vishram Ghat — where Krishna is said to have rested after slaying Kansa.", location: { name: "Vishram Ghat, Mathura", lat: 27.5007, lng: 77.6543 }, time: "12:00 PM", type: "activity" },
          { _key: "am1e", title: "Lunch: Mathura Peda & Chaat", description: "Mathura is famous for its milk-based peda — buy from Brijwasi or Radha Swami shops. Lunch at a local vegetarian thali restaurant.", time: "01:30 PM", type: "food" },
          { _key: "am1f", title: "Vrindavan: Banke Bihari Temple", description: "Krishna's most beloved temple — the deity's eyes are so captivating that the curtain is repeatedly drawn to prevent devotees from losing themselves. Extraordinary atmosphere during aarti.", location: { name: "Banke Bihari Temple, Vrindavan", lat: 27.5796, lng: 77.6921 }, time: "03:00 PM", type: "sightseeing" },
          { _key: "am1g", title: "Prem Mandir, Vrindavan", description: "A magnificent white marble temple built by Jagadguru Kripalu Ji — illuminated at night with coloured lights. Beautiful garden complex.", location: { name: "Prem Mandir, Vrindavan", lat: 27.5663, lng: 77.6716 }, time: "05:00 PM", type: "sightseeing" },
          { _key: "am1h", title: "Drive to Agra & Check-In (60 km, 1 hr)", description: "Arrive Agra by evening. Stay near the Taj Ganj for early Taj access.", location: { name: "Agra", lat: 27.1767, lng: 78.0081 }, time: "06:30 PM", type: "accommodation" },
        ],
      },
      {
        _key: "am-day2",
        dayNumber: 2,
        title: "Agra — Taj Mahal Sunrise, Agra Fort & Mehtab Bagh",
        date: undefined,
        summary: "Wake up before dawn for the world's greatest sunrise — the Taj Mahal turning pink and gold as the sun rises. Then Agra Fort and the rear-view sunset from Mehtab Bagh across the Yamuna.",
        activities: [
          { _key: "am2a", title: "Taj Mahal at Sunrise (East Gate Opening)", description: "Arrive at the east or south gate 30 min before opening (6 AM year-round). The Taj's marble glows a warm pink in early dawn light — the most beautiful hour. Stay until full light (8 AM).", location: { name: "Taj Mahal, Agra", lat: 27.1751, lng: 78.0421 }, time: "05:30 AM", type: "sightseeing", notes: "Entry: ₹1,300 for Indians (including ASI monument fee), ₹1,500 for foreigners. Friday closed. Carry a government-issued photo ID." },
          { _key: "am2b", title: "Inside the Taj — Mausoleum & Gardens", description: "Walk the full chaharbagh (four-quadrant garden) to the marble platform. The main mausoleum houses the cenotaphs of Mumtaz Mahal and Shah Jahan — no shoes allowed on the platform (cloth booties provided).", location: { name: "Taj Mahal", lat: 27.1751, lng: 78.0421 }, time: "07:00 AM", type: "sightseeing" },
          { _key: "am2c", title: "Breakfast near Taj Ganj", description: "Rooftop breakfast at Saniya Palace Hotel, John's Place, or Café by the Taj for Taj views over chai and parathas.", time: "09:00 AM", type: "food" },
          { _key: "am2d", title: "Agra Fort (Red Fort of Agra)", description: "UNESCO World Heritage Site — the massive Mughal fortification built by Akbar (1565). Highlights: Diwan-i-Khas (Hall of Private Audience), Sheesh Mahal (Mirror Palace), Musamman Burj (where Shah Jahan spent his final imprisoned years gazing at the Taj).", location: { name: "Agra Fort", lat: 27.18, lng: 78.0219 }, time: "11:00 AM", type: "sightseeing", notes: "Entry: ₹850 pp (includes ASI fee). Audio guide available." },
          { _key: "am2e", title: "Lunch: Mughlai Cuisine in Agra", description: "Try Peshawri at ITC Mughal for authentic Mughlai or Dasaprakash for South Indian. Agra's petha (white pumpkin sweet) is a must-buy.", time: "01:30 PM", type: "food" },
          { _key: "am2f", title: "Itmad-ud-Daulah (Baby Taj)", description: "The 'Jewel Box' — Mughal empress Nur Jahan's father's tomb (1628). The first Mughal monument built entirely in marble with intricate pietra dura inlay work that later inspired the Taj.", location: { name: "Itmad-ud-Daulah, Agra", lat: 27.1963, lng: 78.0415 }, time: "03:30 PM", type: "sightseeing" },
          { _key: "am2g", title: "Mehtab Bagh — Taj Sunset Viewpoint", description: "The garden directly across the Yamuna from the Taj — best sunset view of the monument's rear. The Yamuna river reflection makes for incredible photos.", location: { name: "Mehtab Bagh", lat: 27.1834, lng: 78.0457 }, time: "05:00 PM", type: "sightseeing", notes: "Entry ₹300 pp. Arrive 1 hr before sunset." },
          { _key: "am2h", title: "Overnight in Agra", type: "accommodation" },
        ],
      },
      {
        _key: "am-day3",
        dayNumber: 3,
        title: "Fatehpur Sikri & Return to Delhi",
        date: undefined,
        summary: "A morning excursion to Fatehpur Sikri — Emperor Akbar's perfectly preserved 16th-century 'ghost city' carved entirely from red sandstone — before driving back to Delhi.",
        activities: [
          { _key: "am3a", title: "Fatehpur Sikri (40 km, 1 hr from Agra)", description: "Akbar's magnificent capital (1571–1585), abandoned 14 years after construction due to water shortage. Now a UNESCO World Heritage Site in pristine condition.", location: { name: "Fatehpur Sikri", lat: 27.0945, lng: 77.6607 }, time: "08:00 AM", type: "sightseeing", notes: "Entry: ₹610 pp. Arrive early to avoid crowds and harsh afternoon heat." },
          { _key: "am3b", title: "Explore Fatehpur Sikri Complex", description: "Highlights: Buland Darwaza (the Gate of Magnificence — 54 m high), Jama Masjid, Salim Chishti's Dargah (white marble mausoleum where wishes are tied with red thread), Panch Mahal (5-storey wind palace), Diwan-i-Aam, and the Jodha Bai Palace.", location: { name: "Fatehpur Sikri", lat: 27.0945, lng: 77.6607 }, time: "08:30 AM", type: "activity" },
          { _key: "am3c", title: "Return to Agra, Breakfast & Check-Out", time: "11:30 AM", type: "food" },
          { _key: "am3d", title: "Optional: Sikandra (Akbar's Tomb)", description: "15 km from Agra on the way to Delhi — Akbar's monumental red sandstone tomb in Mughal style. Worth a 45-min stop.", location: { name: "Sikandra, Agra", lat: 27.2255, lng: 77.9608 }, time: "12:30 PM", type: "sightseeing" },
          { _key: "am3e", title: "Drive Back to Delhi (200 km via Yamuna Expressway)", description: "~3 hrs on the expressway. Arrive Delhi by evening.", location: { name: "New Delhi", lat: 28.6139, lng: 77.209 }, time: "01:30 PM", type: "transport" },
        ],
      },
    ],
  },

  // 6. Auli & Nearby — 3 Days
  {
    _id: "trip-auli-nearby-3-days",
    title: "Auli & Nearby — 3 Days",
    slug: "auli-nearby-3-days",
    excerpt:
      "A 3-day high-altitude escape to Auli — India's premier ski destination at 2,519 m in Uttarakhand's Garhwal Himalayas. A ski run with Nanda Devi as your backdrop, Asia's longest cable car (Joshimath-Auli Gondola), the medieval Narsingh Temple in Joshimath, and a day trip to Badrinath — one of India's Char Dham pilgrimages.",
    tags: ["Adventure", "Skiing", "Snow", "Uttarakhand", "India", "Himalayas", "Badrinath", "Mountains", "North India"],
    country: "India",
    bestSuggestedMonth: "January – March (skiing), May – June & Sep – Nov (trekking)",
    status: "published",
    viewCount: 0,
    totalBudget: 15000,
    currency: "INR",
    tripType: "Adventure & Spiritual",
    readingTime: 5,
    _createdAt: "2026-09-09T05:00:00Z",
    _updatedAt: "2026-09-09T05:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "au-day1",
        dayNumber: 1,
        title: "Delhi → Joshimath → Auli — Cable Car & First Snow",
        date: undefined,
        summary: "An overnight bus or early drive from Delhi (~500 km) reaches Joshimath by late morning. Take the famous Auli Gondola (Asia's longest ropeway at 4.15 km) up to Auli at 2,519 m — your base for snow days.",
        activities: [
          { _key: "au1a", title: "Travel to Joshimath (~500 km from Delhi)", description: "Option A: Overnight Volvo bus from ISBT Delhi to Joshimath (~10–12 hrs). Option B: Drive via Rishikesh, Devprayag, Rudraprayag, Karnaprayag to Joshimath (NH-58 / NH-7). Option C: Fly Delhi–Dehradun, then drive 250 km.", location: { name: "Joshimath", lat: 30.5546, lng: 79.5658 }, time: "07:00 AM", type: "transport" },
          { _key: "au1b", title: "Narsingh Temple, Joshimath", description: "The ancient Narsingh (Vishnu as Narasimha) temple in Joshimath town — also the winter seat of the Badrinath deity. A 15-min atmospheric stop.", location: { name: "Narsingh Temple, Joshimath", lat: 30.5546, lng: 79.5658 }, time: "11:30 AM", type: "sightseeing" },
          { _key: "au1c", title: "Joshimath–Auli Gondola (Asia's Longest Ropeway)", description: "4.15 km cable car ascending from Joshimath (1,875 m) to Auli (2,519 m) through dense forests. Spectacular Nanda Devi, Hathi Parbat, and Mana Peak views. ₹750 one-way, ₹1,000 return.", location: { name: "Auli Gondola Station, Joshimath", lat: 30.5452, lng: 79.5727 }, time: "01:00 PM", type: "activity", notes: "Alternatively, drive 13 km by road. Gondola is the far better experience. Cable car closes in bad weather." },
          { _key: "au1d", title: "Check-In at Auli", description: "GMVN Auli Tourist Rest House (spectacular mountain-facing rooms) or private resorts. Drop bags and enjoy your first snow walk.", location: { name: "Auli", lat: 30.5208, lng: 79.5661 }, time: "02:30 PM", type: "accommodation" },
          { _key: "au1e", title: "Artificial Lake & Slope Exploration", description: "Walk to Auli's artificial lake (used for snow-making). Nanda Devi (7,816 m) dominates the horizon — India's second-highest peak and the country's highest entirely within Indian territory.", location: { name: "Auli Artificial Lake", lat: 30.5194, lng: 79.5667 }, time: "03:30 PM", type: "sightseeing" },
          { _key: "au1f", title: "Overnight at Auli", description: "Dinner at GMVN or your resort — simple dal-roti-sabzi with mountain views. Temperatures drop to -10°C in peak winter.", type: "accommodation" },
        ],
      },
      {
        _key: "au-day2",
        dayNumber: 2,
        title: "Auli Skiing / Trekking & Gorson Bugyal",
        date: undefined,
        summary: "A full day at Auli — skiing on well-groomed slopes (January–March) with certified GARHWAL MANDAL VIKAS NIGAM instructors, or a stunning summer trek to Gorson Bugyal (meadow) and Kwani Bugyal with 360° Himalayan panoramas.",
        activities: [
          { _key: "au2a", title: "Skiing at Auli Slopes (January–March)", description: "India's best ski terrain — 500 m beginner slope and up to 3 km advanced runs. GMVN provides ski equipment hire (₹750/day) and certified instructors (₹500/hr). SKi lift operating Feb–March.", location: { name: "Auli Ski Resort", lat: 30.5208, lng: 79.5661 }, time: "09:00 AM", type: "activity", notes: "Auli hosts the National Winter Games. Best snow: January. Equipment: skis, ski poles, boots, helmet, and goggles all available for rent." },
          { _key: "au2b", title: "Gorson Bugyal Trek (Summer/Autumn)", description: "3 km trek from Auli through dense oak and rhododendron forests to the Gorson Bugyal (meadow) at 3,056 m. 360° views of 13 Himalayan peaks: Nanda Devi, Dronagiri, Neelkanth, Hathi Parbat, and Mana.", location: { name: "Gorson Bugyal", lat: 30.5078, lng: 79.5667 }, time: "09:00 AM", type: "activity", notes: "Easy-moderate trek. Good fitness required. Carry water and snacks." },
          { _key: "au2c", title: "Chattrakund Lake (Extension)", description: "Additional 4 km from Gorson Bugyal — a pristine high-altitude lake at 3,350 m surrounded by snow peaks. Campable spot.", location: { name: "Chattrakund", lat: 30.4954, lng: 79.5564 }, time: "12:00 PM", type: "activity" },
          { _key: "au2d", title: "Clifftop Lunch with Nanda Devi View", description: "Packed lunch or return to GMVN for hot lunch. Sitting on the snow with Nanda Devi straight ahead is a sublime Himalayan moment.", time: "01:30 PM", type: "food" },
          { _key: "au2e", title: "Evening Stargazing at Auli", description: "At 2,500 m with near-zero light pollution, Auli offers extraordinary stargazing — Milky Way visible in winter skies. Carry a warm sleeping bag for outdoor sessions.", time: "07:00 PM", type: "activity" },
          { _key: "au2f", title: "Overnight in Auli", type: "accommodation" },
        ],
      },
      {
        _key: "au-day3",
        dayNumber: 3,
        title: "Badrinath Day Trip — Char Dham Pilgrimage",
        date: undefined,
        summary: "A stunning 95 km (3 hr) drive from Joshimath through the Alaknanda valley to Badrinath — one of India's holiest Char Dham shrines at 3,133 m, with the backdrop of Neelkanth peak (6,596 m).",
        activities: [
          { _key: "au3a", title: "Descend to Joshimath via Gondola/Road", description: "Take the early morning gondola down or drive. Pack check-out from Auli and store bags at Joshimath if returning Delhi same day.", time: "06:00 AM", type: "transport" },
          { _key: "au3b", title: "Drive to Badrinath (95 km, 3 hrs)", description: "Via Vishnuprayag, Pandukeshwar, and Govindghat. The Alaknanda valley is breathtaking — sheer gorges, roaring river, and Himalayan peaks lining every turn.", location: { name: "Badrinath", lat: 30.7433, lng: 79.4938 }, time: "07:30 AM", type: "transport" },
          { _key: "au3c", title: "Badrinath Temple Darshan", description: "One of the four Char Dham pilgrimage sites — Lord Vishnu (Badrinarayan) is worshipped here. The temple stands at 3,133 m against the stunning Neelkanth peak backdrop. Queue for darshan varies — early morning is fastest.", location: { name: "Badrinath Temple", lat: 30.7433, lng: 79.4938 }, time: "10:30 AM", type: "sightseeing", notes: "Temple open May–November. Closed in winter (deity moves to Joshimath's Narsingh Temple)." },
          { _key: "au3d", title: "Tapt Kund Hot Springs", description: "Natural sulphur hot spring below the temple — pilgrims traditionally bathe here before entering the temple. Temperature ~45°C.", location: { name: "Tapt Kund, Badrinath", lat: 30.7433, lng: 79.4938 }, time: "11:30 AM", type: "activity" },
          { _key: "au3e", title: "Mana Village (Last Indian Village)", description: "4 km from Badrinath — the last inhabited village before the Tibet border. Visit the Vyas Gufa (cave where Vedas were dictated), Ganesh Gufa, and the India's Last Café (literally named).", location: { name: "Mana Village", lat: 30.7667, lng: 79.5167 }, time: "12:30 PM", type: "sightseeing" },
          { _key: "au3f", title: "Return Drive Badrinath → Joshimath → Rishikesh or Delhi", description: "Return drive to Joshimath (3 hrs) → Rishikesh (another 4 hrs) → Delhi (another 6 hrs). Alternatively, overnight in Rishikesh for a calmer return.", location: { name: "Rishikesh / Delhi", lat: 30.0869, lng: 78.2676 }, time: "02:00 PM", type: "transport" },
        ],
      },
    ],
  },
];


export const DEMO_AUTHOR: Author = {
  _id: "author-sumit",
  name: "Sumit Singh",
  slug: "sumit-singh",
  bio: "Travel writer, photographer, and software engineer. I document the roads less taken — high-altitude deserts, ancient monasteries, and everything in between. Based in India, always en route somewhere.",
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "twitter", url: "https://twitter.com" },
  ],
};

// ──────────────────────────────────────────────────
// Redis trip storage helpers (admin CRUD)
// Keys:
//   trips:index   → Redis Set of slugs for admin-managed trips
//   trip:<slug>   → JSON string of the full Trip object
// ──────────────────────────────────────────────────

const TRIPS_INDEX_KEY = "trips:index";

/** Fetch all admin-managed trips from Redis */
async function getRedisTrips(): Promise<Trip[]> {
  try {
    const slugs = await redis.smembers(TRIPS_INDEX_KEY);
    if (!slugs || slugs.length === 0) return [];
    const trips = await Promise.all(
      slugs.map(async (slug) => {
        const raw = await redis.get(`trip:${slug}`);
        if (!raw) return null;
        try { return JSON.parse(raw) as Trip; } catch { return null; }
      })
    );
    return trips.filter(Boolean) as Trip[];
  } catch {
    return [];
  }
}

export async function getAllTrips(): Promise<Trip[]> {
  const redisTrips = await getRedisTrips();
  // Redis trips take precedence over DEMO_TRIPS (override by slug)
  const redisSlugs = new Set(redisTrips.map((t) => t.slug));
  const filteredDemo = DEMO_TRIPS.filter((t) => !redisSlugs.has(t.slug));
  return [...redisTrips, ...filteredDemo].sort(
    (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  );
}

export async function getTripBySlug(slug: string): Promise<Trip | null> {
  // Check Redis first
  try {
    const raw = await redis.get(`trip:${slug}`);
    if (raw) return JSON.parse(raw) as Trip;
  } catch {
    // fall through to DEMO_TRIPS
  }
  const trip = DEMO_TRIPS.find((t) => t.slug === slug);
  return trip || null;
}

export async function getTripsByRegion(regionSlug: string): Promise<Trip[]> {
  const all = await getAllTrips();
  return all.filter((t) => t.tags?.map((tag) => tag.toLowerCase()).includes(regionSlug.replace(/-/g, " ")));
}

export async function getFeaturedTrips(): Promise<Trip[]> {
  const all = await getAllTrips();
  return all.filter((t) => t.status === "published").slice(0, 3);
}

export async function searchTrips(queryText: string): Promise<Trip[]> {
  const lower = queryText.toLowerCase();
  const all = await getAllTrips();
  return all.filter(
    (t) =>
      t.title.toLowerCase().includes(lower) ||
      (t.excerpt && t.excerpt.toLowerCase().includes(lower)) ||
      (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(lower)))
  );
}

export async function incrementViewCount(slug: string): Promise<void> {
  // Mock no-op since Sanity is removed
}

// ──────────────────────────────────────────────────
// Admin CRUD
// ──────────────────────────────────────────────────

export async function createTrip(trip: Trip): Promise<void> {
  await redis.set(`trip:${trip.slug}`, JSON.stringify(trip));
  await redis.sadd(TRIPS_INDEX_KEY, trip.slug);
}

export async function updateTrip(slug: string, updates: Partial<Trip>): Promise<Trip | null> {
  const existing = await getTripBySlug(slug);
  if (!existing) return null;
  const updated: Trip = {
    ...existing,
    ...updates,
    slug, // slug is immutable
    _updatedAt: new Date().toISOString(),
  };
  await redis.set(`trip:${slug}`, JSON.stringify(updated));
  await redis.sadd(TRIPS_INDEX_KEY, slug); // ensure indexed
  return updated;
}

export async function deleteTrip(slug: string): Promise<void> {
  await redis.del(`trip:${slug}`);
  await redis.srem(TRIPS_INDEX_KEY, slug);
}
