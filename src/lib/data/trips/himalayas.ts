import type { Trip } from "@/lib/types";

/**
 * Himalayas & North India — HP, Ladakh, Spiti, Kinnaur, Uttarakhand, J&K, Kashmir
 * 32 trips
 *
 * ── Adding a new trip ──────────────────────────────────────────
 * 1. Append a new trip object to the array below.
 * 2. Add its slug → region mapping in src/lib/regions.ts (TRIP_REGION_MAP).
 * That's it — it appears everywhere automatically.
 */
export const HIMALAYA_TRIPS: Trip[] = [
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
    _id: "trip-munsiyari-6-days",
    title: "Munsiyari & Johar Valley — 6 Days from Mumbai / Pune (via Pantnagar / Kathgodam)",
    slug: "munsiyari-6-days",
    excerpt:
      "Journey from Mumbai or Pune to Munsiyari — the 'Little Kashmir' of Uttarakhand — starting with a flight to Pantnagar/Delhi or train to Kathgodam, traversing Kausani's Himalayan panorama, trekking to Khaliya Top for dramatic Panchachuli views, and experiencing warm Bhotiya mountain culture.",
    tags: ["Himalayas", "Uttarakhand", "Road Trip", "Mountains", "Adventure", "Trekking", "India", "High Altitude", "North India"],
    country: "India",
    bestSuggestedMonth: "April – June & September – November",
    status: "published",
    viewCount: 0,
    totalBudget: 21000,
    currency: "INR",
    tripType: "Road Trip & Trek",
    readingTime: 10,
    _createdAt: "2026-08-26T00:00:00Z",
    _updatedAt: "2026-08-26T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "mu-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Pantnagar/Kathgodam → Kausani",
        date: undefined,
        summary: "Take an early morning flight from Mumbai (BOM) or Pune (PNQ) to Pantnagar (PGH) or an overnight train to Kathgodam. Embark on the winding mountain drive through Kathgodam, Bhimtal, and Almora to Kausani, arriving in time for an unforgettable Trishul and Nanda Devi sunset.",
        activities: [
          { _key: "mu1a", title: "Flight from Mumbai/Pune to Pantnagar / Delhi (~2 hrs)", description: "Direct morning flight to Pantnagar (PGH) or Delhi (DEL) followed by car hire or Ranikhet Express to Kathgodam.", location: { name: "Pantnagar Airport", lat: 29.0322, lng: 79.4736 }, type: "transport" },
          { _key: "mu1b", title: "Breakfast stop at Kathgodam foothills", description: "Gateway to Kumaon — fuel up and begin the winding ascent into the pine-scented hills.", location: { name: "Kathgodam", lat: 29.2730, lng: 79.5447 }, type: "food" },
          { _key: "mu1c", title: "Lunch & brief stop at Almora", description: "Explore the cultural capital of Kumaon and grab traditional Bal Mithai from the historic bazaar.", location: { name: "Almora", lat: 29.5971, lng: 79.6586 }, type: "activity" },
          { _key: "mu1d", title: "Arrive Kausani, sunset views", description: "Check-in with Trishul (7,120 m) and Nanda Devi (7,816 m) visible at sunset. Called the 'Switzerland of India'.", location: { name: "Kausani", lat: 29.8422, lng: 79.6062 }, type: "accommodation" },
        ],
      },
      {
        _key: "mu-day2",
        dayNumber: 2,
        title: "Kausani → Munsiyari (Johar Valley Gateway)",
        date: undefined,
        summary: "Sunrise at Anasakti Ashram viewpoint followed by the dramatic mountain drive to Munsiyari (~2,200 m) — stopping at the ancient 11th-century Baijnath Temple and the roaring roadside Birthi Falls waterfall.",
        activities: [
          { _key: "mu2a", title: "Sunrise at Kausani — Anasakti Ashram viewpoint", description: "Mahatma Gandhi meditated here in 1929 — tranquil panoramic sunrise viewpoint overlooking Trishul and Nanda Devi peaks.", location: { name: "Anasakti Ashram, Kausani", lat: 29.8431, lng: 79.6053 }, type: "sightseeing" },
          { _key: "mu2b", title: "Drive to Munsiyari via Bageshwar (~230 km, 7–8 hrs)", description: "Scenic mountain highway winding through Saryu and Gori Ganga river valleys. Fuel up in Bageshwar as petrol pumps are sparse ahead.", location: { name: "Bageshwar Mountain Pass Highway", lat: 29.8398, lng: 79.7694 }, type: "transport" },
          { _key: "mu2c", title: "Baijnath Temple", description: "Ancient Katyuri-era Shiva temple complex (~11th century) on the banks of Gomti River with intricate stone carvings.", location: { name: "Baijnath Temple, Bageshwar", lat: 29.8289, lng: 79.6208 }, type: "sightseeing" },
          { _key: "mu2d", title: "Birthi Falls", description: "Magnificent 126-metre mountain cascade plunging through deodar forests along the Thal-Munsiyari road.", location: { name: "Birthi Falls", lat: 29.9833, lng: 80.1167 }, type: "sightseeing" },
          { _key: "mu2e", title: "Arrive Munsiyari, check-in", description: "The 'Little Kashmir' of Kumaon — panoramic front-row views of the snow-crowned Panchachuli five-peak range.", location: { name: "Munsiyari", lat: 30.0668, lng: 80.2377 }, type: "accommodation" },
        ],
      },
      {
        _key: "mu-day3",
        dayNumber: 3,
        title: "Munsiyari — Khaliya Top Alpine Trek & Heritage",
        date: undefined,
        summary: "Trek to Khaliya Top alpine meadow at ~3,500 m for close-up Panchachuli five-peak vistas, then explore the Masterji Tribal Heritage Museum and sunset at Nanda Devi viewpoint.",
        activities: [
          { _key: "mu3a", title: "Trek to Khaliya Top", description: "~6 km gradual climb through rhododendron and oak forests up to the alpine meadow at ~3,500 m. Hire a local guide (~₹800).", location: { name: "Khaliya Top Trek Trailhead", lat: 30.0785, lng: 80.2215 }, type: "activity" },
          { _key: "mu3b", title: "Summit views of Panchachuli peaks", description: "Unobstructed panorama of Panchachuli I–V, Rajrambha, and Hardeol peaks dominating the Kumaon skyline.", location: { name: "Panchachuli Viewpoint, Munsiyari", lat: 30.0712, lng: 80.2415 }, type: "sightseeing" },
          { _key: "mu3c", title: "Masterji Tribal Heritage Museum", description: "Private museum documenting the Indo-Tibetan trade route, Bhotiya artifacts, traditional garments, and antique currency.", location: { name: "Masterji Tribal Heritage Museum, Nanasen", lat: 30.0635, lng: 80.2351 }, type: "activity" },
          { _key: "mu3d", title: "Nanda Devi Temple & sunset viewpoint", description: "Sacred 1,000-year-old temple setting with Munsiyari's most stunning golden sunset panorama.", location: { name: "Nanda Devi Temple, Munsiyari", lat: 30.0760, lng: 80.2480 }, type: "sightseeing" },
        ],
      },
      {
        _key: "mu-day4",
        dayNumber: 4,
        title: "Munsiyari — Balati Weaving Village & Gori Ganga",
        date: undefined,
        summary: "A cultural immersion day with the Bhotiya weaving community in Balati village, riverside walk along the glacial Gori Ganga river, and cozy mountain dinner.",
        activities: [
          { _key: "mu4a", title: "Drive to Balati Village", description: "Traditional Bhotiya weaving hub where women hand-weave fine pashmina and sheep wool shawls, rugs, and thulmas.", location: { name: "Balati Village, Gori Ganga Valley", lat: 30.0500, lng: 80.2300 }, type: "activity" },
          { _key: "mu4b", title: "Walk along Gori Ganga riverbank", description: "Gentle nature walk along the roaring glacial torrent surrounded by high pine and birch slopes.", location: { name: "Gori Ganga Riverbank Trail", lat: 30.0410, lng: 80.2280 }, type: "activity" },
          { _key: "mu4c", title: "Visit Darkot village or relax at hotel", description: "Explore Darkot village renowned for handspun Angora rabbit wool shawls and traditional carved wooden houses.", location: { name: "Darkot Village Handicrafts", lat: 30.0380, lng: 80.2220 }, type: "activity" },
          { _key: "mu4d", title: "Bonfire evening & Kumaoni dinner", description: "Warm campfire evening under glittering starry Himalayan skies savoring local Bhatt ki Dal and hot rotes.", location: { name: "Munsiyari Himalayan Campfire", lat: 30.0668, lng: 80.2377 }, type: "activity" },
        ],
      },
      {
        _key: "mu-day5",
        dayNumber: 5,
        title: "Munsiyari → Kausani via Bageshwar (Return)",
        date: undefined,
        summary: "Begin the return journey through the scenic Bageshwar valleys, with a stop at the famed Chitai Golu Devta Temple adorned with thousands of brass bells, before resting in Kausani.",
        activities: [
          { _key: "mu5a", title: "Drive Munsiyari → Kausani via Bageshwar (~230 km, 7–8 hrs)", description: "Descent through mountain passes into the pine ridges of Central Kumaon.", location: { name: "Kumaon Mountain Highway", lat: 29.9100, lng: 80.0500 }, type: "transport" },
          { _key: "mu5b", title: "Lunch at Bageshwar", description: "Traditional North Indian and Kumaoni thali at the confluence of Saryu and Gomti rivers.", location: { name: "Saryu Riverside Dhaba, Bageshwar", lat: 29.8398, lng: 79.7694 }, type: "food" },
          { _key: "mu5c", title: "Chitai Golu Devta Temple", description: "Temple dedicated to Golu Devta, God of Justice, decorated with thousands of prayer bells and handwritten petitions.", location: { name: "Chitai Golu Devta Temple", lat: 29.6486, lng: 79.6642 }, type: "sightseeing" },
          { _key: "mu5d", title: "Arrive Kausani, overnight rest", description: "Relax at tea estate resort watching evening twilight over Trishul peak.", location: { name: "Kausani", lat: 29.8422, lng: 79.6062 }, type: "accommodation" },
        ],
      },
      {
        _key: "mu-day6",
        dayNumber: 6,
        title: "Kausani → Kathgodam / Pantnagar → Mumbai / Pune",
        date: undefined,
        summary: "Descend from Kausani to Kathgodam railway station or Pantnagar airport (PGH) / Delhi (DEL) for return flights/trains back to Mumbai or Pune.",
        activities: [
          { _key: "mu6a", title: "Drive Kausani → Kathgodam (~135 km, 4.5 hrs)", description: "Smooth morning drive down through Ranikhet or Almora pine forests to the foothills.", location: { name: "Kausani to Kathgodam Highway", lat: 29.5000, lng: 79.4000 }, type: "transport" },
          { _key: "mu6b", title: "Lunch stop at Kathgodam foothills", description: "Hearty lunch and local sweets before boarding your transit.", location: { name: "Kathgodam Foothills Dhaba", lat: 29.2730, lng: 79.5447 }, type: "food" },
          { _key: "mu6c", title: "Board Flight/Train to Mumbai / Pune", description: "Take afternoon/evening direct or 1-stop flight from Pantnagar (PGH) or train/cab to Delhi for flight to Mumbai (BOM) or Pune (PNQ).", location: { name: "Pantnagar Airport / Kathgodam Station", lat: 29.0322, lng: 79.4736 }, type: "transport" },
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

  // ─────────────────────────────────────────────────────────────────────────
  // MAHARASHTRA & GOA — OFFBEAT DESTINATIONS (8 trips)
  // ─────────────────────────────────────────────────────────────────────────

  // 1. VELAS — Olive Ridley turtle nesting village
  {
    _id: "trip-chitkul-5-days",
    title: "Chitkul — The Last Indian Village",
    slug: "chitkul-5-days",
    excerpt: "Journey to the last inhabited village near the Indo-Tibetan border. Experience the pristine Baspa River, wooden houses, and snow-capped Kinnaur Himalayas.",
    tags: ["Mountains", "Road Trip", "Himalayas", "Kinnaur", "Offbeat"],
    country: "India",
    startDate: "2026-05-10",
    endDate: "2026-05-14",
    bestSuggestedMonth: "May – October",
    status: "published",
    viewCount: 0,
    totalBudget: 35000,
    currency: "INR",
    tripType: "Adventure",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/chitkul.jpg" } } as any,
    itinerary: [
      {
        _key: "chit-day1",
        dayNumber: 1,
        title: "Chandigarh to Narkanda",
        date: "2026-05-10",
        summary: "Drive from Chandigarh (accessible via flight from Mumbai/Pune) to Narkanda for the night.",
        activities: [
          {
            _key: "chit1a",
            title: "Drive to Narkanda",
            description: "A scenic 6-hour drive through the lower Himalayas.",
            location: { name: "Narkanda", lat: 31.2581, lng: 77.4601 },
            time: "10:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "chit-day2",
        dayNumber: 2,
        title: "Narkanda to Chitkul via Sangla",
        date: "2026-05-11",
        summary: "Enter the Kinnaur Valley and drive alongside the Baspa river to reach Chitkul.",
        activities: [
          {
            _key: "chit2a",
            title: "Drive to Chitkul",
            description: "The road gets rugged and extremely beautiful.",
            location: { name: "Chitkul", lat: 31.3524, lng: 78.4354 },
            time: "08:00 AM",
            type: "transport"
          },
          {
            _key: "chit2b",
            title: "Check-in at Samaa Resorts",
            description: "Settle into a cozy stay overlooking the valley.",
            time: "03:00 PM",
            type: "accommodation",
            notes: "Zostel Chitkul is also a great option."
          },
          {
            _key: "chit2c",
            title: "Hindustan Ka Aakhri Dhaba",
            description: "Have Maggi and tea at the famous 'Last Dhaba of India'.",
            time: "05:00 PM",
            type: "food"
          }
        ]
      },
      {
        _key: "chit-day3",
        dayNumber: 3,
        title: "Explore the Baspa River",
        date: "2026-05-12",
        summary: "Walk through the village and sit by the freezing but crystal-clear river.",
        activities: [
          {
            _key: "chit3a",
            title: "Village Walk",
            description: "Admire the traditional Kinnauri wooden architecture and the Mathi Goddess Temple.",
            time: "09:00 AM",
            type: "sightseeing"
          }
        ]
      },
      {
        _key: "chit-day4",
        dayNumber: 4,
        title: "Return to Shimla",
        date: "2026-05-13",
        summary: "Start the journey back, stopping at Shimla.",
        activities: [
          {
            _key: "chit4a",
            title: "Drive to Shimla",
            description: "Long drive back to the capital of Himachal.",
            time: "07:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "chit-day5",
        dayNumber: 5,
        title: "Departure",
        date: "2026-05-14",
        summary: "Drive to Chandigarh and fly back.",
        activities: [
          {
            _key: "chit5a",
            title: "Flight from Chandigarh",
            description: "Fly back to Mumbai/Pune.",
            time: "02:00 PM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-kalpa-5-days",
    title: "Kalpa — Kinnaur Kailash Views",
    slug: "kalpa-5-days",
    excerpt: "Witness the majestic Kinnaur Kailash range turning gold at sunrise. Explore apple orchards and ancient Buddhist-Hindu temples.",
    tags: ["Mountains", "Road Trip", "Himalayas", "Kinnaur", "Nature"],
    country: "India",
    startDate: "2026-09-10",
    endDate: "2026-09-14",
    bestSuggestedMonth: "September – October",
    status: "published",
    viewCount: 0,
    totalBudget: 32000,
    currency: "INR",
    tripType: "Relaxation",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/kalpa.jpg" } } as any,
    itinerary: [
      {
        _key: "kalpa-day1",
        dayNumber: 1,
        title: "Chandigarh to Narkanda",
        date: "2026-09-10",
        summary: "Fly from Mumbai to Chandigarh, drive to Narkanda.",
        activities: [
          {
            _key: "kalpa1a",
            title: "Arrival and Drive",
            description: "Start the scenic journey up the mountains.",
            location: { name: "Narkanda", lat: 31.2581, lng: 77.4601 },
            time: "12:00 PM",
            type: "transport"
          }
        ]
      },
      {
        _key: "kalpa-day2",
        dayNumber: 2,
        title: "Narkanda to Kalpa",
        date: "2026-09-11",
        summary: "Drive to Kalpa via Reckong Peo.",
        activities: [
          {
            _key: "kalpa2a",
            title: "Drive to Kalpa",
            description: "The road offers dramatic views of deep gorges.",
            location: { name: "Kalpa", lat: 31.5379, lng: 78.2753 },
            time: "09:00 AM",
            type: "transport"
          },
          {
            _key: "kalpa2b",
            title: "Check-in at The Grand Shamba-La",
            description: "Stay with an uninterrupted view of the Kinnaur Kailash.",
            time: "03:00 PM",
            type: "accommodation"
          }
        ]
      },
      {
        _key: "kalpa-day3",
        dayNumber: 3,
        title: "Suicide Point and Roghi Village",
        date: "2026-09-12",
        summary: "Explore the nearby villages and steep cliffs.",
        activities: [
          {
            _key: "kalpa3a",
            title: "Suicide Point",
            description: "Walk to this famous viewpoint with a vertical drop.",
            time: "10:00 AM",
            type: "sightseeing"
          },
          {
            _key: "kalpa3b",
            title: "Roghi Village Walk",
            description: "Experience authentic Himachali village life and apple orchards.",
            time: "12:00 PM",
            type: "activity"
          }
        ]
      },
      {
        _key: "kalpa-day4",
        dayNumber: 4,
        title: "Return to Shimla",
        date: "2026-09-13",
        summary: "Start the return journey.",
        activities: [
          {
            _key: "kalpa4a",
            title: "Drive to Shimla",
            description: "Overnight stay in Shimla before departure.",
            time: "08:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "kalpa-day5",
        dayNumber: 5,
        title: "Departure",
        date: "2026-09-14",
        summary: "Fly back from Chandigarh.",
        activities: [
          {
            _key: "kalpa5a",
            title: "Flight Home",
            description: "Drive to Chandigarh airport and fly back.",
            time: "03:00 PM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-tirthan-valley-6-days",
    title: "Tirthan Valley — Gateway to GHNP",
    slug: "tirthan-valley-6-days",
    excerpt: "Escape to the tranquil Tirthan Valley, fish for trout, and explore the pristine Great Himalayan National Park.",
    tags: ["Mountains", "Nature", "Wildlife", "Himachal", "Offbeat"],
    country: "India",
    startDate: "2026-04-10",
    endDate: "2026-04-15",
    bestSuggestedMonth: "March – June",
    status: "published",
    viewCount: 0,
    totalBudget: 40000,
    currency: "INR",
    tripType: "Nature",
    readingTime: 9,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/tirthan-valley.jpg" } } as any,
    itinerary: [
      {
        _key: "tv-day1",
        dayNumber: 1,
        title: "Chandigarh to Tirthan Valley",
        date: "2026-04-10",
        summary: "Fly to Chandigarh from Mumbai/Pune, then drive to Tirthan.",
        activities: [
          {
            _key: "tv1a",
            title: "Drive to Banjar",
            description: "An 8-hour drive from Chandigarh to the valley.",
            location: { name: "Tirthan Valley", lat: 31.6373, lng: 77.3458 },
            time: "10:00 AM",
            type: "transport"
          },
          {
            _key: "tv1b",
            title: "Check-in at Raju Bharti's Guesthouse",
            description: "A legendary homestay accessible by a pulley cart across the river.",
            time: "05:00 PM",
            type: "accommodation"
          }
        ]
      },
      {
        _key: "tv-day2",
        dayNumber: 2,
        title: "Trout Fishing and Jalori Pass",
        date: "2026-04-11",
        summary: "Try trout fishing in the Tirthan river and drive up to Jalori Pass.",
        activities: [
          {
            _key: "tv2a",
            title: "Trout Fishing",
            description: "Get a permit and try angling in the crystal clear waters.",
            time: "09:00 AM",
            type: "activity"
          },
          {
            _key: "tv2b",
            title: "Jalori Pass & Serolsar Lake",
            description: "Drive to Jalori Pass (10,800 ft) and take a short trek to Serolsar Lake.",
            time: "12:00 PM",
            type: "sightseeing"
          }
        ]
      },
      {
        _key: "tv-day3",
        dayNumber: 3,
        title: "Choi Waterfall Trek",
        date: "2026-04-12",
        summary: "A short trek through the woods to a hidden waterfall.",
        activities: [
          {
            _key: "tv3a",
            title: "Trek to Choi Waterfall",
            description: "A 45-minute uphill hike from the main road.",
            time: "10:00 AM",
            type: "activity"
          }
        ]
      },
      {
        _key: "tv-day4",
        dayNumber: 4,
        title: "Great Himalayan National Park",
        date: "2026-04-13",
        summary: "Enter the UNESCO World Heritage site.",
        activities: [
          {
            _key: "tv4a",
            title: "GHNP Eco Zone",
            description: "Take a guided nature walk into the park. Spot rare birds and flora.",
            time: "08:00 AM",
            type: "sightseeing"
          }
        ]
      },
      {
        _key: "tv-day5",
        dayNumber: 5,
        title: "Relaxation and Local Food",
        date: "2026-04-14",
        summary: "Enjoy the homestay and local delicacies.",
        activities: [
          {
            _key: "tv5a",
            title: "Homestay Relaxation",
            description: "Read a book by the river. Enjoy local Himachali Dham cooked by the hosts.",
            time: "11:00 AM",
            type: "food"
          }
        ]
      },
      {
        _key: "tv-day6",
        dayNumber: 6,
        title: "Departure",
        date: "2026-04-15",
        summary: "Return drive to Chandigarh.",
        activities: [
          {
            _key: "tv6a",
            title: "Drive to Airport",
            description: "Head back to Chandigarh and fly home.",
            time: "08:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-malana-4-days",
    title: "Malana — The Ancient Isolated Village",
    slug: "malana-4-days",
    excerpt: "Trek to the isolated and mysterious village of Malana in the Parvati Valley. Known for its strict customs, unique dialect, and stunning natural beauty.",
    tags: ["Mountains", "Trekking", "Culture", "Himachal", "Offbeat"],
    country: "India",
    startDate: "2026-05-15",
    endDate: "2026-05-18",
    bestSuggestedMonth: "May – June",
    status: "published",
    viewCount: 0,
    totalBudget: 15000,
    currency: "INR",
    tripType: "Adventure",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/malana.jpg" } } as any,
    itinerary: [
      {
        _key: "mal-day1",
        dayNumber: 1,
        title: "Chandigarh to Kasol",
        date: "2026-05-15",
        summary: "Travel from Chandigarh to the base town of Kasol in the Parvati Valley.",
        activities: [
          {
            _key: "mal1a",
            title: "Drive to Kasol",
            description: "A scenic 8-hour drive. Check into a riverside cafe/homestay.",
            location: { name: "Kasol", lat: 32.0098, lng: 77.3150 },
            time: "10:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "mal-day2",
        dayNumber: 2,
        title: "Trek to Malana",
        date: "2026-05-16",
        summary: "Drive to the Malana gate and trek up to the ancient village.",
        activities: [
          {
            _key: "mal2a",
            title: "Drive to Malana Gate",
            description: "A bumpy 1-hour drive from Kasol.",
            time: "08:00 AM",
            type: "transport"
          },
          {
            _key: "mal2b",
            title: "Trek up to Malana",
            description: "A steep 2-hour trek to reach the village. Remember, outsiders cannot touch the villagers or their belongings.",
            location: { name: "Malana", lat: 32.0645, lng: 77.2657 },
            time: "10:00 AM",
            type: "activity"
          },
          {
            _key: "mal2c",
            title: "Village Walk",
            description: "Observe the unique Kanashi dialect and ancient wooden architecture.",
            time: "01:00 PM",
            type: "sightseeing"
          }
        ]
      },
      {
        _key: "mal-day3",
        dayNumber: 3,
        title: "Magic Valley Trek",
        date: "2026-05-17",
        summary: "Trek further up to Magic Valley for incredible views.",
        activities: [
          {
            _key: "mal3a",
            title: "Magic Valley",
            description: "Trek beyond Malana to Waichin (Magic Valley) for unparalleled peace and mountain views.",
            time: "09:00 AM",
            type: "activity"
          }
        ]
      },
      {
        _key: "mal-day4",
        dayNumber: 4,
        title: "Return Journey",
        date: "2026-05-18",
        summary: "Trek down and drive back.",
        activities: [
          {
            _key: "mal4a",
            title: "Descend and Drive",
            description: "Trek down to the gate, take a cab back to Kasol, and drive down to Chandigarh.",
            time: "08:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-barot-valley-4-days",
    title: "Barot Valley — Hidden Gem of Himachal",
    slug: "barot-valley-4-days",
    excerpt: "Discover the untouched Barot Valley, known for trout fishing, the Uhl river, and serene cedar forests.",
    tags: ["Mountains", "Nature", "Relaxation", "Himachal", "Offbeat"],
    country: "India",
    startDate: "2026-04-20",
    endDate: "2026-04-23",
    bestSuggestedMonth: "April – June",
    status: "published",
    viewCount: 0,
    totalBudget: 20000,
    currency: "INR",
    tripType: "Nature",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/barot-valley.jpg" } } as any,
    itinerary: [
      {
        _key: "barot-day1",
        dayNumber: 1,
        title: "Pathankot to Barot",
        date: "2026-04-20",
        summary: "Arrive via train to Pathankot or fly to Dharamshala, then drive to Barot.",
        activities: [
          {
            _key: "bar1a",
            title: "Drive to Barot",
            description: "A beautiful drive through terraced fields and thick forests.",
            location: { name: "Barot", lat: 32.0396, lng: 76.8447 },
            time: "11:00 AM",
            type: "transport"
          },
          {
            _key: "bar1b",
            title: "Riverside Check-in",
            description: "Check into a wooden cottage or homestay near the Uhl river.",
            time: "04:00 PM",
            type: "accommodation"
          }
        ]
      },
      {
        _key: "barot-day2",
        dayNumber: 2,
        title: "Uhl River and Trout Farm",
        date: "2026-04-21",
        summary: "Explore the local trout breeding center and relax by the river.",
        activities: [
          {
            _key: "bar2a",
            title: "Trout Farm Visit",
            description: "Visit the government trout breeding center and learn about the fish.",
            time: "10:00 AM",
            type: "sightseeing"
          },
          {
            _key: "bar2b",
            title: "Trout Dinner",
            description: "Enjoy freshly cooked trout for dinner at your homestay.",
            time: "08:00 PM",
            type: "food"
          }
        ]
      },
      {
        _key: "barot-day3",
        dayNumber: 3,
        title: "Nargu Wildlife Sanctuary",
        date: "2026-04-22",
        summary: "Take a nature walk through the sanctuary.",
        activities: [
          {
            _key: "bar3a",
            title: "Nature Walk",
            description: "Trek through the dense cedar forests. Spot monals and Himalayan black bears if lucky.",
            time: "09:00 AM",
            type: "activity"
          }
        ]
      },
      {
        _key: "barot-day4",
        dayNumber: 4,
        title: "Departure",
        date: "2026-04-23",
        summary: "Head back to the plains.",
        activities: [
          {
            _key: "bar4a",
            title: "Drive Back",
            description: "Drive back to Dharamshala/Pathankot.",
            time: "09:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-rakchham-5-days",
    title: "Rakchham — The Pink Village of Kinnaur",
    slug: "rakchham-5-days",
    excerpt: "Nestled between Sangla and Chitkul, Rakchham is famous for its pink buckwheat fields, wooden houses, and serene Baspa river.",
    tags: ["Mountains", "Road Trip", "Himalayas", "Kinnaur", "Offbeat"],
    country: "India",
    startDate: "2026-09-01",
    endDate: "2026-09-05",
    bestSuggestedMonth: "September – October",
    status: "published",
    viewCount: 0,
    totalBudget: 32000,
    currency: "INR",
    tripType: "Relaxation",
    readingTime: 7,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/rakchham.jpg" } } as any,
    itinerary: [
      {
        _key: "rak-day1",
        dayNumber: 1,
        title: "Chandigarh to Narkanda",
        date: "2026-09-01",
        summary: "Drive from Chandigarh to Narkanda for an overnight halt.",
        activities: [
          {
            _key: "rak1a",
            title: "Drive",
            description: "Head up the NH5 to Narkanda.",
            time: "10:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "rak-day2",
        dayNumber: 2,
        title: "Narkanda to Rakchham",
        date: "2026-09-02",
        summary: "Enter the stunning Baspa Valley.",
        activities: [
          {
            _key: "rak2a",
            title: "Drive to Rakchham",
            description: "A breathtaking drive alongside the Sutlej and Baspa rivers.",
            location: { name: "Rakchham", lat: 31.3917, lng: 78.3517 },
            time: "08:00 AM",
            type: "transport"
          },
          {
            _key: "rak2b",
            title: "Riverside Check-in",
            description: "Check into a camp or homestay right on the banks of the Baspa.",
            time: "04:00 PM",
            type: "accommodation"
          }
        ]
      },
      {
        _key: "rak-day3",
        dayNumber: 3,
        title: "Buckwheat Fields and Baspa River",
        date: "2026-09-03",
        summary: "Walk through the blooming pink fields (in September).",
        activities: [
          {
            _key: "rak3a",
            title: "Village and Fields Walk",
            description: "Wander through the village surrounded by bright pink Ogal (buckwheat) fields.",
            time: "10:00 AM",
            type: "sightseeing"
          }
        ]
      },
      {
        _key: "rak-day4",
        dayNumber: 4,
        title: "Day Trip to Chitkul",
        date: "2026-09-04",
        summary: "A short drive to the last village on the border.",
        activities: [
          {
            _key: "rak4a",
            title: "Visit Chitkul",
            description: "Drive further up to Chitkul for a half-day excursion.",
            time: "09:00 AM",
            type: "activity"
          }
        ]
      },
      {
        _key: "rak-day5",
        dayNumber: 5,
        title: "Departure",
        date: "2026-09-05",
        summary: "Long drive back to Chandigarh.",
        activities: [
          {
            _key: "rak5a",
            title: "Return Drive",
            description: "Start early for the long drive down.",
            time: "06:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-nako-6-days",
    title: "Nako — The High Altitude Desert Village",
    slug: "nako-6-days",
    excerpt: "Experience the rugged beauty of Nako in Spiti Valley. Visit the sacred Nako Lake, ancient monasteries, and mud-brick Tibetan houses.",
    tags: ["Mountains", "Road Trip", "Spiti", "Himalayas", "Offbeat"],
    country: "India",
    startDate: "2026-06-10",
    endDate: "2026-06-15",
    bestSuggestedMonth: "June – September",
    status: "published",
    viewCount: 0,
    totalBudget: 40000,
    currency: "INR",
    tripType: "Adventure",
    readingTime: 9,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/nako.jpg" } } as any,
    itinerary: [
      {
        _key: "nako-day1",
        dayNumber: 1,
        title: "Chandigarh to Narkanda",
        date: "2026-06-10",
        summary: "Begin the Spiti circuit.",
        activities: [
          {
            _key: "nak1a",
            title: "Drive to Narkanda",
            description: "Overnight halt to break the long journey.",
            time: "12:00 PM",
            type: "transport"
          }
        ]
      },
      {
        _key: "nako-day2",
        dayNumber: 2,
        title: "Narkanda to Kalpa/Reckong Peo",
        date: "2026-06-11",
        summary: "Continue towards Kinnaur.",
        activities: [
          {
            _key: "nak2a",
            title: "Drive to Kalpa",
            description: "Another halt to acclimatize.",
            time: "10:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "nako-day3",
        dayNumber: 3,
        title: "Kalpa to Nako",
        date: "2026-06-12",
        summary: "Enter the high altitude desert landscape.",
        activities: [
          {
            _key: "nak3a",
            title: "Drive to Nako",
            description: "The landscape dramatically changes from green pine forests to barren, rugged mountains. Drive on the treacherous Khab bridge route.",
            location: { name: "Nako", lat: 31.8814, lng: 78.6272 },
            time: "09:00 AM",
            type: "transport"
          },
          {
            _key: "nak3b",
            title: "Check-in",
            description: "Settle into a local homestay or camp near the lake.",
            time: "03:00 PM",
            type: "accommodation"
          }
        ]
      },
      {
        _key: "nako-day4",
        dayNumber: 4,
        title: "Nako Lake and Monastery",
        date: "2026-06-13",
        summary: "Explore the ancient village.",
        activities: [
          {
            _key: "nak4a",
            title: "Nako Lake",
            description: "Walk around the sacred high-altitude lake surrounded by willow trees.",
            time: "09:00 AM",
            type: "sightseeing"
          },
          {
            _key: "nak4b",
            title: "Nako Monastery",
            description: "Visit the 11th-century monastery founded by Rinchen Zangpo.",
            time: "11:00 AM",
            type: "activity"
          }
        ]
      },
      {
        _key: "nako-day5",
        dayNumber: 5,
        title: "Return to Rampur/Narkanda",
        date: "2026-06-14",
        summary: "Begin the descent.",
        activities: [
          {
            _key: "nak5a",
            title: "Long Drive Down",
            description: "Start early for the long drive back towards the plains.",
            time: "06:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "nako-day6",
        dayNumber: 6,
        title: "Departure",
        date: "2026-06-15",
        summary: "Drive to Chandigarh and fly back.",
        activities: [
          {
            _key: "nak6a",
            title: "Final Leg",
            description: "Drive to Chandigarh airport.",
            time: "09:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-pangi-valley-6-days",
    title: "Pangi Valley — The Hidden Tribal Land",
    slug: "pangi-valley-6-days",
    excerpt: "Explore the most remote, rugged, and unspoiled valley of Himachal Pradesh. A paradise for extreme adventure seekers and nature lovers.",
    tags: ["Mountains", "Offbeat", "Adventure", "Himachal", "Trekking"],
    country: "India",
    startDate: "2026-07-15",
    endDate: "2026-07-20",
    bestSuggestedMonth: "July – September",
    status: "published",
    viewCount: 0,
    totalBudget: 25000,
    currency: "INR",
    tripType: "Adventure",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/pangi-valley.jpg" } } as any,
    itinerary: [
      {
        _key: "pangi-day1",
        dayNumber: 1,
        title: "Manali to Keylong",
        date: "2026-07-15",
        summary: "Arrive in Manali and drive through the Atal Tunnel to Keylong.",
        activities: [
          {
            _key: "pan1a",
            title: "Drive to Keylong",
            description: "Cross into the Lahaul valley via the Atal Tunnel.",
            location: { name: "Keylong", lat: 32.5719, lng: 77.0322 },
            time: "10:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "pangi-day2",
        dayNumber: 2,
        title: "Keylong to Killar (Pangi Valley)",
        date: "2026-07-16",
        summary: "Drive along the treacherous Chenab river gorge to reach Killar, the headquarters of Pangi.",
        activities: [
          {
            _key: "pan2a",
            title: "Drive to Killar",
            description: "An extreme 5-hour off-roading experience on the Cliffhanger road.",
            location: { name: "Killar", lat: 33.0833, lng: 76.5833 },
            time: "08:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "pangi-day3",
        dayNumber: 3,
        title: "Explore Hudan Bhatori",
        date: "2026-07-17",
        summary: "Visit the highest village in the valley.",
        activities: [
          {
            _key: "pan3a",
            title: "Hudan Bhatori Visit",
            description: "Explore the ancient monastery and the small alpine lake in the village.",
            time: "10:00 AM",
            type: "sightseeing"
          }
        ]
      },
      {
        _key: "pangi-day4",
        dayNumber: 4,
        title: "Sural Bhatori",
        date: "2026-07-18",
        summary: "Visit another incredibly scenic and remote village.",
        activities: [
          {
            _key: "pan4a",
            title: "Drive to Sural Bhatori",
            description: "Witness the unique Pangwala culture and towering waterfalls.",
            time: "09:00 AM",
            type: "activity"
          }
        ]
      },
      {
        _key: "pangi-day5",
        dayNumber: 5,
        title: "Return to Keylong",
        date: "2026-07-19",
        summary: "Navigate the cliffhanger road back to Lahaul.",
        activities: [
          {
            _key: "pan5a",
            title: "Drive back",
            description: "Slow drive back to Keylong for an overnight stay.",
            time: "08:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "pangi-day6",
        dayNumber: 6,
        title: "Departure",
        date: "2026-07-20",
        summary: "Drive to Manali and depart.",
        activities: [
          {
            _key: "pan6a",
            title: "Drive to Manali",
            description: "Return to Manali to end the adventurous journey.",
            time: "09:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-tosh-3-days",
    title: "Tosh — The Alpine Village",
    slug: "tosh-3-days",
    excerpt: "A short weekend getaway to Tosh in the Parvati Valley. Experience the hippy culture, wooden cafes, and breathtaking Himalayan views.",
    tags: ["Mountains", "Weekend Getaway", "Himachal", "Parvati Valley", "Relaxation"],
    country: "India",
    startDate: "2026-10-10",
    endDate: "2026-10-12",
    bestSuggestedMonth: "April – October",
    status: "published",
    viewCount: 0,
    totalBudget: 8000,
    currency: "INR",
    tripType: "Relaxation",
    readingTime: 5,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/tosh.jpg" } } as any,
    itinerary: [
      {
        _key: "tosh-day1",
        dayNumber: 1,
        title: "Bhuntar to Tosh",
        date: "2026-10-10",
        summary: "Arrive in Bhuntar, drive to Barshaini, and hike up to Tosh.",
        activities: [
          {
            _key: "tosh1a",
            title: "Drive to Barshaini",
            description: "Take a local bus or cab from Bhuntar through Kasol.",
            time: "09:00 AM",
            type: "transport"
          },
          {
            _key: "tosh1b",
            title: "Hike to Tosh",
            description: "A short 1-hour walk from the dam to the village.",
            location: { name: "Tosh", lat: 32.0253, lng: 77.4475 },
            time: "01:00 PM",
            type: "activity"
          }
        ]
      },
      {
        _key: "tosh-day2",
        dayNumber: 2,
        title: "Explore Tosh and Kutla",
        date: "2026-10-11",
        summary: "Cafe hopping and a short trek to Kutla.",
        activities: [
          {
            _key: "tosh2a",
            title: "Cafe Hopping",
            description: "Try Israeli food and relax in the famous cafes like Pink Floyd.",
            time: "10:00 AM",
            type: "food"
          },
          {
            _key: "tosh2b",
            title: "Trek to Kutla",
            description: "A beautiful 2-hour uphill trek to a pristine alpine meadow.",
            time: "01:00 PM",
            type: "activity"
          }
        ]
      },
      {
        _key: "tosh-day3",
        dayNumber: 3,
        title: "Return",
        date: "2026-10-12",
        summary: "Hike back down and drive to Bhuntar.",
        activities: [
          {
            _key: "tosh3a",
            title: "Hike to Barshaini",
            description: "Walk back down to catch a cab/bus.",
            time: "10:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-sach-pass-5-days",
    title: "Sach Pass — The Ultimate Thrill",
    slug: "sach-pass-5-days",
    excerpt: "Conquer one of the most dangerous and thrilling mountain passes in India, connecting Chamba to the Pangi Valley.",
    tags: ["Mountains", "Road Trip", "Adventure", "Extreme", "Himachal"],
    country: "India",
    startDate: "2026-08-01",
    endDate: "2026-08-05",
    bestSuggestedMonth: "Late July – September",
    status: "published",
    viewCount: 0,
    totalBudget: 22000,
    currency: "INR",
    tripType: "Adventure",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/sach-pass.jpg" } } as any,
    itinerary: [
      {
        _key: "sach-day1",
        dayNumber: 1,
        title: "Pathankot to Dalhousie",
        date: "2026-08-01",
        summary: "Arrive in Pathankot and drive to the hill station of Dalhousie.",
        activities: [
          {
            _key: "sac1a",
            title: "Drive to Dalhousie",
            description: "A comfortable 3-hour drive to start the trip.",
            location: { name: "Dalhousie", lat: 32.5387, lng: 75.9710 },
            time: "02:00 PM",
            type: "transport"
          }
        ]
      },
      {
        _key: "sach-day2",
        dayNumber: 2,
        title: "Dalhousie to Bairagarh",
        date: "2026-08-02",
        summary: "Drive to the base of the pass.",
        activities: [
          {
            _key: "sac2a",
            title: "Drive to Bairagarh",
            description: "The road starts getting narrower and rougher. Last major settlement before the pass.",
            location: { name: "Bairagarh", lat: 32.8465, lng: 76.1432 },
            time: "10:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "sach-day3",
        dayNumber: 3,
        title: "Cross Sach Pass to Killar",
        date: "2026-08-03",
        summary: "The main adventure day. Cross the 14,500 ft high pass.",
        activities: [
          {
            _key: "sac3a",
            title: "Cross Sach Pass",
            description: "Drive through massive walls of ice, water crossings, and zero-visibility fog. A true test of driving skills.",
            location: { name: "Sach Pass", lat: 32.9667, lng: 76.2333 },
            time: "06:00 AM",
            type: "activity"
          },
          {
            _key: "sac3b",
            title: "Arrive in Killar",
            description: "Descend into the Pangi Valley and rest in Killar.",
            time: "04:00 PM",
            type: "accommodation"
          }
        ]
      },
      {
        _key: "sach-day4",
        dayNumber: 4,
        title: "Killar to Keylong",
        date: "2026-08-04",
        summary: "Drive out of Pangi Valley into Lahaul.",
        activities: [
          {
            _key: "sac4a",
            title: "Cliffhanger Drive",
            description: "Drive along the Chenab gorge on a road carved into the cliff face.",
            time: "08:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "sach-day5",
        dayNumber: 5,
        title: "Departure",
        date: "2026-08-05",
        summary: "Keylong to Manali and depart.",
        activities: [
          {
            _key: "sac5a",
            title: "Drive to Manali",
            description: "Cross the Atal Tunnel to Manali and take a bus/flight home.",
            time: "09:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-chopta-4-days",
    title: "Chopta — The Mini Switzerland of India",
    slug: "chopta-4-days",
    excerpt: "Trek to Tungnath, the highest Shiva temple in the world, and Chandrashila peak, all starting from the lush green meadows of Chopta.",
    tags: ["Mountains", "Trekking", "Pilgrimage", "Uttarakhand", "Nature"],
    country: "India",
    startDate: "2026-05-01",
    endDate: "2026-05-04",
    bestSuggestedMonth: "April – June, Sep – Nov",
    status: "published",
    viewCount: 0,
    totalBudget: 12000,
    currency: "INR",
    tripType: "Adventure",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/chopta.jpg" } } as any,
    itinerary: [
      {
        _key: "chop-day1",
        dayNumber: 1,
        title: "Dehradun to Chopta",
        date: "2026-05-01",
        summary: "Long scenic drive from Dehradun/Rishikesh to Chopta.",
        activities: [
          {
            _key: "cho1a",
            title: "Drive to Chopta",
            description: "Drive alongside the Alaknanda and Mandakini rivers.",
            location: { name: "Chopta", lat: 30.4851, lng: 79.1721 },
            time: "08:00 AM",
            type: "transport"
          },
          {
            _key: "cho1b",
            title: "Camp Check-in",
            description: "Stay in a Swiss tent overlooking the bugyals (meadows).",
            time: "04:00 PM",
            type: "accommodation"
          }
        ]
      },
      {
        _key: "chop-day2",
        dayNumber: 2,
        title: "Tungnath & Chandrashila Trek",
        date: "2026-05-02",
        summary: "The main trek day.",
        activities: [
          {
            _key: "cho2a",
            title: "Trek to Tungnath",
            description: "A moderate 3.5 km trek to the highest Shiva temple (12,073 ft).",
            time: "08:00 AM",
            type: "activity"
          },
          {
            _key: "cho2b",
            title: "Trek to Chandrashila",
            description: "A steep 1.5 km climb from Tungnath to the summit for a 360-degree Himalayan view.",
            time: "11:00 AM",
            type: "activity"
          }
        ]
      },
      {
        _key: "chop-day3",
        dayNumber: 3,
        title: "Deoria Tal Trek",
        date: "2026-05-03",
        summary: "Drive to Sari village and trek to a beautiful alpine lake.",
        activities: [
          {
            _key: "cho3a",
            title: "Trek to Deoria Tal",
            description: "A short 2 km uphill trek to a pristine lake reflecting the Chaukhamba peaks.",
            time: "10:00 AM",
            type: "sightseeing"
          }
        ]
      },
      {
        _key: "chop-day4",
        dayNumber: 4,
        title: "Return",
        date: "2026-05-04",
        summary: "Drive back to Rishikesh/Dehradun.",
        activities: [
          {
            _key: "cho4a",
            title: "Drive Down",
            description: "Head back to the plains to catch your flight/train.",
            time: "09:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-khaliya-top-5-days",
    title: "Khaliya Top — 5 Days Alpine Meadow Trek from Mumbai/Pune",
    slug: "khaliya-top-5-days",
    excerpt: "Climb to 11,500 ft on Khaliya Bugyal for India's most dramatic and accessible high-altitude panorama of Panchachuli, Nanda Devi, and Rajrambha — with seamless flight connections from Mumbai or Pune via Pantnagar/Kathgodam.",
    tags: ["Himalayas", "Uttarakhand", "Trekking", "Mountains", "Adventure", "High Altitude", "Kumaon", "North India"],
    country: "India",
    startDate: "2026-05-10",
    endDate: "2026-05-14",
    bestSuggestedMonth: "April – June & September – November (Snow in Dec–Feb)",
    status: "published",
    viewCount: 0,
    totalBudget: 19500,
    currency: "INR",
    tripType: "Trek & Road Trip",
    readingTime: 9,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "kht-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Pantnagar/Kathgodam → Almora → Thal",
        date: "2026-05-10",
        summary: "Depart Mumbai (BOM) or Pune (PNQ) on an early morning flight to Pantnagar (PGH) or take an overnight train to Kathgodam. Meet your mountain cab and begin the scenic ascent into Kumaon pine hills, halting at Almora before staying overnight at Thal by the Ramganga river.",
        activities: [
          {
            _key: "kht1a",
            title: "Flight BOM/PNQ to Pantnagar (2h 15m)",
            description: "Direct or one-stop morning connection to Pantnagar Airport (PGH) nestled in the Terai plains. Pre-book private mountain taxi.",
            location: { name: "Pantnagar Airport", lat: 29.0322, lng: 79.4736 },
            time: "07:30 AM",
            type: "transport",
            cost: 6500,
            currency: "INR",
            notes: "Indigo flies BOM/PNQ to PGH via Delhi. Alternatively, board Kathgodam Shatabdi Express from Delhi.",
          },
          {
            _key: "kht1b",
            title: "Drive through Almora & Bageshwar (~190 km, 6 hrs)",
            description: "Scenic mountain road along terrace farms, crossing Almora and Bageshwar riverside temples. Stop at Almora for hot ginger tea and Bal Mithai.",
            location: { name: "Almora", lat: 29.5971, lng: 79.6586 },
            time: "11:30 AM",
            type: "transport",
            cost: 3500,
            currency: "INR",
            notes: "Shared or private cab fare split across group. ATM facilities available in Almora and Bageshwar.",
          },
          {
            _key: "kht1c",
            title: "Overnight by Ramganga at Thal",
            description: "Quiet rest in the Ramganga valley to break the long journey and ensure proper acclimatization before heading to higher altitudes.",
            location: { name: "Thal, Uttarakhand", lat: 29.8333, lng: 80.1333 },
            time: "06:30 PM",
            type: "accommodation",
            cost: 1600,
            currency: "INR",
            notes: "Basic KMVN rest house or riverfront lodge. Enjoy hot dal, rice, and fresh mountain vegetables.",
          },
        ],
      },
      {
        _key: "kht-d2",
        dayNumber: 2,
        title: "Thal → Birthi Falls → Munsiyari Basecamp (7,200 ft)",
        date: "2026-05-11",
        summary: "Climb through the dramatic Gori Ganga valley, stopping at the roaring 400 ft cascade of Birthi Falls before entering the high amphitheater of Munsiyari with Panchachuli dominating the horizon.",
        activities: [
          {
            _key: "kht2a",
            title: "Birthi Falls Photography Stop",
            description: "A dramatic 126-meter waterfall cascading through alpine cedar cliffs with mist spraying the highway. Short 15-min walkway to the viewing deck.",
            location: { name: "Birthi Falls", lat: 29.9833, lng: 80.1167 },
            time: "10:30 AM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "Entry ₹30 pp. Grab hot pakoras and tea at the KMVN roadside cafe.",
          },
          {
            _key: "kht2b",
            title: "Arrive in Munsiyari & Bhotiya Village Walk",
            description: "Check in at Sarmoli village homestays. Stroll through traditional stone houses, interact with Bhotiya weavers, and visit the Tribal Museum.",
            location: { name: "Munsiyari", lat: 30.0668, lng: 80.2377 },
            time: "02:00 PM",
            type: "activity",
            cost: 200,
            currency: "INR",
            notes: "Museum entry ₹50 pp. Handwoven sheep wool shawls available for purchase directly from artisans.",
          },
          {
            _key: "kht2c",
            title: "Trek Briefing & Gear Check at Sarmoli",
            description: "Meet your local mountain guide, check crampons/poles for Khaliya Bugyal, and feast on traditional Bhatt ki Churkani and Mandua rotis.",
            location: { name: "Sarmoli Village", lat: 30.0712, lng: 80.2410 },
            time: "06:30 PM",
            type: "food",
            cost: 1800,
            currency: "INR",
            notes: "Includes guide advance fee and hearty organic dinner. Keep water bottles ready for early morning.",
          },
        ],
      },
      {
        _key: "kht-d3",
        dayNumber: 3,
        title: "Munsiyari → Balanti Bend → Khaliya Bugyal Alpine Meadow (11,500 ft)",
        date: "2026-05-12",
        summary: "Commence the 6 km trek from Balanti potato farm. Ascend through dense forests of oak, rhododendron, and Himalayan birch to emerge onto the vast alpine meadows of Khaliya Bugyal with five Panchachuli spires right in front of you.",
        activities: [
          {
            _key: "kht3a",
            title: "Drive to Balanti Trailhead (9 km, 20 mins)",
            description: "Transfer by gypsy from Munsiyari town to the Khaliya Top entry gate at Balanti bend.",
            location: { name: "Balanti Bend", lat: 30.0740, lng: 80.2290 },
            time: "07:00 AM",
            type: "transport",
            cost: 400,
            currency: "INR",
            notes: "Forest entry permit (₹100) collected at the checkpost.",
          },
          {
            _key: "kht3b",
            title: "Trek to Khaliya Meadow (6 km, 4 hrs, +3,500 ft)",
            description: "Gradual to steep trail traversing ancient rhododendron woodlands alive with Himalayan Monal birds, opening into vast alpine bugyals.",
            location: { name: "Khaliya Bugyal", lat: 30.0785, lng: 80.2215 },
            time: "08:00 AM",
            type: "activity",
            cost: 500,
            currency: "INR",
            notes: "Trek at a steady pace. Carry 2 liters of water and energy bars.",
          },
          {
            _key: "kht3c",
            title: "Camp Setup & Panchachuli Sunset",
            description: "Watch the massive granite spires of Panchachuli I–V turn from blazing gold to crimson under a violet sky. Dinner around camp stove.",
            location: { name: "Khaliya Top Camp", lat: 30.0785, lng: 80.2215 },
            time: "05:30 PM",
            type: "accommodation",
            cost: 2200,
            currency: "INR",
            notes: "High-altitude tent stay including sleeping bag, inner liner, and hot dinner. Night temperatures drop near freezing.",
          },
        ],
      },
      {
        _key: "kht-d4",
        dayNumber: 4,
        title: "Khaliya Zero Point Summit (12,140 ft) → Descent to Munsiyari",
        date: "2026-05-13",
        summary: "Pre-dawn alpine hike to Khaliya Zero Point for a 360-degree sunrise over Nanda Devi, Hardeol, Trishul, and western Nepal peaks. Savor hot chai on the ridge and descend back to Munsiyari town.",
        activities: [
          {
            _key: "kht4a",
            title: "Dawn Push to Zero Point (2 km, 1.5 hrs)",
            description: "Scramble along the exposed grassy crest to the summit cairn at 3,700 meters (12,140 ft).",
            location: { name: "Khaliya Zero Point", lat: 30.0833, lng: 80.2180 },
            time: "05:00 AM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Headlamp required. Windproof jacket and gloves essential.",
          },
          {
            _key: "kht4b",
            title: "360-Degree Himalayan Sunrise",
            description: "Unrivaled panoramic vantage revealing Nanda Devi (7,816 m), Hardeol, Nanda Kot, and Api Himal across Nepal bathed in golden sunlight.",
            location: { name: "Khaliya Zero Point", lat: 30.0833, lng: 80.2180 },
            time: "06:15 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Bring wide-angle and zoom lens for snow peak ridges.",
          },
          {
            _key: "kht4c",
            title: "Descent to Balanti & Drive to Munsiyari",
            description: "Hike back down through the pine glades, savor hot lunch at Monal Cafe, and enjoy a warm shower at your Munsiyari homestay.",
            location: { name: "Munsiyari", lat: 30.0668, lng: 80.2377 },
            time: "11:30 AM",
            type: "accommodation",
            cost: 1800,
            currency: "INR",
            notes: "Celebratory evening with hot momos and mountain herbal chai.",
          },
        ],
      },
      {
        _key: "kht-d5",
        dayNumber: 5,
        title: "Munsiyari → Kathgodam / Pantnagar → Return to Mumbai / Pune",
        date: "2026-05-14",
        summary: "Early morning start descending from the high Himalayas through Bageshwar and Almora to Pantnagar Airport or Kathgodam station for your return flight/train to Mumbai or Pune.",
        activities: [
          {
            _key: "kht5a",
            title: "Drive Munsiyari to Kathgodam/Pantnagar (~270 km, 8–9 hrs)",
            description: "Descent through scenic Kumaon valleys with a farewell stop for steaming chai and pahadi pakoras.",
            location: { name: "Kathgodam", lat: 29.2730, lng: 79.5447 },
            time: "05:30 AM",
            type: "transport",
            cost: 4000,
            currency: "INR",
            notes: "Depart at dawn to safely catch afternoon flights or evening trains.",
          },
          {
            _key: "kht5b",
            title: "Evening Flight / Train to BOM / PNQ",
            description: "Board evening flight from Pantnagar or Kathgodam Shatabdi to Delhi with connecting flight back to Mumbai or Pune.",
            location: { name: "Pantnagar Airport", lat: 29.0322, lng: 79.4736 },
            time: "05:00 PM",
            type: "transport",
            cost: 6500,
            currency: "INR",
            notes: "Arrive back in Mumbai or Pune with unforgettable memories of the Panchachuli snowfields.",
          },
        ],
      },
    ],
  },
  {
    _id: "trip-chakrata-4-days",
    title: "Chakrata — 4 Days Colonial Cantonment & Tiger Falls from Mumbai/Pune",
    slug: "chakrata-4-days",
    excerpt: "Escape the city rush on a quick 4-day mountain getaway from Mumbai/Pune to Chakrata — plunging 312 ft Tiger Falls, untouched deodar forests of Deoban, and golden 360-degree Himalayan sunsets at Chilmiri Neck.",
    tags: ["Himalayas", "Uttarakhand", "Hill Station", "Waterfalls", "Offbeat", "Heritage", "North India", "Mountains"],
    country: "India",
    startDate: "2026-04-16",
    endDate: "2026-04-19",
    bestSuggestedMonth: "March – June & September – December",
    status: "published",
    viewCount: 0,
    totalBudget: 14500,
    currency: "INR",
    tripType: "Road Trip & Hiking",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "ckt-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Dehradun (Jolly Grant) → Kalsi → Chakrata (7,000 ft)",
        date: "2026-04-16",
        summary: "Catch a 2-hour morning non-stop flight from Mumbai (BOM) or Pune (PNQ) to Dehradun (DED). Drive northwest past the Yamuna and Tons river confluence at Kalsi and climb winding deodar roads to the secluded British cantonment town of Chakrata.",
        activities: [
          {
            _key: "ckt1a",
            title: "Flight BOM/PNQ to Dehradun Airport (2h 10m)",
            description: "Direct morning flight landing at Jolly Grant Airport with immediate cab transfer.",
            location: { name: "Dehradun Airport", lat: 30.1897, lng: 78.1803 },
            time: "07:15 AM",
            type: "transport",
            cost: 5200,
            currency: "INR",
            notes: "IndiGo, Air India, and SpiceJet operate daily direct morning flights from Mumbai and Pune.",
          },
          {
            _key: "ckt1b",
            title: "Drive to Chakrata via Vikasnagar (~115 km, 3.5 hrs)",
            description: "Smooth ascent winding along emerald terraced valleys and towering Himalayan cedar trees.",
            location: { name: "Chakrata", lat: 30.7016, lng: 77.8698 },
            time: "10:30 AM",
            type: "transport",
            cost: 2800,
            currency: "INR",
            notes: "Private cab booked from Dehradun airport. Beautiful mountain twists beyond Kalsi.",
          },
          {
            _key: "ckt1c",
            title: "Evening Walk on Sadar Bazaar Ridge",
            description: "Quiet stroll past colonial stone bungalows, cantonment churches, and mountain bakeries.",
            location: { name: "Sadar Bazaar, Chakrata", lat: 30.7016, lng: 77.8698 },
            time: "04:30 PM",
            type: "activity",
            cost: 300,
            currency: "INR",
            notes: "Sample fresh walnut fudge and ginger tea at heritage market bakeries.",
          },
        ],
      },
      {
        _key: "ckt-d2",
        dayNumber: 2,
        title: "Tiger Falls Hike & Jaunsari Village Exploration",
        date: "2026-04-17",
        summary: "Embark on a refreshing 5 km downhill nature hike through oak and rhododendron glades to the base of Tiger Falls — India's highest direct waterfall plunge (312 ft) — followed by an afternoon in traditional Jaunsari wood-and-stone hamlets.",
        activities: [
          {
            _key: "ckt2a",
            title: "Trek to Tiger Falls (5 km downhill, 2 hrs)",
            description: "Picturesque forest trail passing terraced cornfields and clear mountain streams.",
            location: { name: "Tiger Falls Trail", lat: 30.7180, lng: 77.8820 },
            time: "08:30 AM",
            type: "activity",
            cost: 100,
            currency: "INR",
            notes: "Wear sturdy shoes with good grip. A taxi can pick you up from the lower road if you prefer not to climb back up.",
          },
          {
            _key: "ckt2b",
            title: "Swim & Refresh at Tiger Falls Pool",
            description: "Witness the thundering 312 ft single-drop waterfall cascading into an emerald natural pool.",
            location: { name: "Tiger Falls", lat: 30.7225, lng: 77.8864 },
            time: "11:00 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Entry fee ₹50 pp. Pristine natural amphitheater surrounded by towering mossy rock cliffs.",
          },
          {
            _key: "ckt2c",
            title: "Jaunsari Cultural Lunch & Village Visit",
            description: "Savor Gahat ki Dal and Cholu rotis at Chaupal Rasoi, visiting centuries-old carved timber houses.",
            location: { name: "Jaunsar Bawar Village", lat: 30.7100, lng: 77.8750 },
            time: "01:30 PM",
            type: "food",
            cost: 450,
            currency: "INR",
            notes: "Authentic local family dining experience. Photography of carved wood motifs encouraged.",
          },
        ],
      },
      {
        _key: "ckt-d3",
        dayNumber: 3,
        title: "Deoban Virgin Deodar Forest (9,400 ft) & Chilmiri Neck Sunset",
        date: "2026-04-18",
        summary: "Drive up into the pristine alpine wilderness of Deoban — literally 'God's Own Forest' — famous for 55 peak views and rich birdlife, followed by a dramatic golden sunset from the military crest of Chilmiri Neck.",
        activities: [
          {
            _key: "ckt3a",
            title: "4x4 Jeep Safari to Deoban (13 km, 1 hr)",
            description: "Rough dirt track winding through dense virgin deodars and alpine meadows at 2,870 m.",
            location: { name: "Deoban Forest", lat: 30.7483, lng: 77.8786 },
            time: "09:00 AM",
            type: "activity",
            cost: 2000,
            currency: "INR",
            notes: "4x4 Gypsy hire for the steep dirt track. Spot woodpeckers, monals, and barking deer.",
          },
          {
            _key: "ckt3b",
            title: "55 Peak Viewpoint Hike (Vyas Shikhar)",
            description: "Spectacular vantage point offering uninterrupted views of Swargarohini, Bandarpoonch, and Chaukhamba.",
            location: { name: "Vyas Shikhar, Deoban", lat: 30.7510, lng: 77.8810 },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Legend states Maharishi Vyas wrote the Mahabharata on this peaceful forest ridge.",
          },
          {
            _key: "ckt3c",
            title: "Sunset at Chilmiri Neck",
            description: "Flat grassy plateau offering the grandest sunset in the Jaunsar region over rolling ridges.",
            location: { name: "Chilmiri Neck", lat: 30.6930, lng: 77.8590 },
            time: "05:30 PM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Carry a warm jacket as the wind picks up immediately after sunset.",
          },
        ],
      },
      {
        _key: "ckt-d4",
        dayNumber: 4,
        title: "Chakrata → Ashokan Rock Edicts at Kalsi → Dehradun → Mumbai/Pune",
        date: "2026-04-19",
        summary: "Descend from the hills to Kalsi on the Yamuna river to visit the ancient 250 BC Ashokan rock inscription before heading to Dehradun Airport for your evening return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "ckt4a",
            title: "Ashokan Rock Edict at Kalsi",
            description: "UNESCO-tentative quartz rock inscribed in Prakrit Brahmi script by Emperor Ashoka in 250 BC.",
            location: { name: "Ashokan Edicts, Kalsi", lat: 30.5312, lng: 77.8520 },
            time: "10:30 AM",
            type: "sightseeing",
            cost: 25,
            currency: "INR",
            notes: "ASI maintained site. Quiet garden complex beside the Yamuna.",
          },
          {
            _key: "ckt4b",
            title: "Transfer to Dehradun Airport (~85 km, 2.5 hrs)",
            description: "Drive along the Doon Valley highway to Jolly Grant Airport.",
            location: { name: "Dehradun Airport", lat: 30.1897, lng: 78.1803 },
            time: "01:30 PM",
            type: "transport",
            cost: 2400,
            currency: "INR",
            notes: "Smooth highway with scenic views of Rajaji National Park foothills.",
          },
          {
            _key: "ckt4c",
            title: "Flight back to Mumbai (BOM) / Pune (PNQ)",
            description: "Board evening flight landing back in Mumbai or Pune with timeless mountain memories.",
            location: { name: "Dehradun Airport", lat: 30.1897, lng: 78.1803 },
            time: "05:30 PM",
            type: "transport",
            cost: 5200,
            currency: "INR",
            notes: "2h non-stop flight back to Mumbai or Pune.",
          },
        ],
      },
    ],
  },
  {
    _id: "trip-kanatal-4-days",
    title: "Kanatal — 4 Days Pine Trails & Surkhanda Devi from Mumbai/Pune",
    slug: "kanatal-4-days",
    excerpt: "A serene pine forest escape perched at 8,500 ft in Tehri Garhwal — trek through the Kaudia forest reserve, hike to the sacred 9,995 ft peak of Surkhanda Devi, and enjoy cozy mountain campfires just 2.5 hours from Dehradun airport.",
    tags: ["Himalayas", "Uttarakhand", "Hill Station", "Nature", "Offbeat", "Spiritual", "Weekend Getaway", "North India"],
    country: "India",
    startDate: "2026-04-23",
    endDate: "2026-04-26",
    bestSuggestedMonth: "Year-round (Snow in Jan–Feb, cool pleasant summers)",
    status: "published",
    viewCount: 0,
    totalBudget: 13500,
    currency: "INR",
    tripType: "Weekend Road Trip",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "knt-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Dehradun Airport → Narendra Nagar → Kanatal (8,500 ft)",
        date: "2026-04-23",
        summary: "Fly from Mumbai (BOM) or Pune (PNQ) to Dehradun Jolly Grant Airport. Avoid crowded Mussoorie by taking the scenic mountain bypass via Narendra Nagar and Chamba, climbing into the quiet oak and pine sanctuary of Kanatal.",
        activities: [
          {
            _key: "knt1a",
            title: "Flight BOM/PNQ to Dehradun (2h 15m)",
            description: "Direct morning flight to Dehradun (DED), met by pre-arranged private mountain cab.",
            location: { name: "Dehradun Airport", lat: 30.1897, lng: 78.1803 },
            time: "07:30 AM",
            type: "transport",
            cost: 5000,
            currency: "INR",
            notes: "Early departure allows you to reach Kanatal in time for afternoon tea.",
          },
          {
            _key: "knt1b",
            title: "Scenic Drive to Kanatal via Chamba (~85 km, 2.5 hrs)",
            description: "Smooth winding highway ascending through misty pine canopies with glimpses of Tehri hills.",
            location: { name: "Kanatal", lat: 30.4184, lng: 78.3444 },
            time: "10:30 AM",
            type: "transport",
            cost: 2200,
            currency: "INR",
            notes: "Bypasses Rishikesh/Mussoorie tourist traffic entirely.",
          },
          {
            _key: "knt1c",
            title: "Sunset Deck Check-in & Pahadi Chai",
            description: "Unpack at a cozy wooden cottage or luxury safari camp with sweeping views of the Garhwal range.",
            location: { name: "Kanatal Ridge", lat: 30.4184, lng: 78.3444 },
            time: "04:30 PM",
            type: "accommodation",
            cost: 3000,
            currency: "INR",
            notes: "Enjoy hot Rhododendron (Buransh) welcome drink and evening bonfire.",
          },
        ],
      },
      {
        _key: "knt-d2",
        dayNumber: 2,
        title: "Surkhanda Devi Temple Peak Hike (9,995 ft)",
        date: "2026-04-24",
        summary: "Drive to Kaddukhal and take the paved mountain footpath or ropeway up to the revered Shaktipeeth of Surkhanda Devi for an astonishing 360-degree amphitheater of snow peaks including Kedarnath, Badrinath, and Chaukhamba.",
        activities: [
          {
            _key: "knt2a",
            title: "Kaddukhal Base & Trailhead Ascent (2 km, 1 hr)",
            description: "Steep but well-paved trail lined with pine trees and brass temple bells (ropeway option available).",
            location: { name: "Kaddukhal", lat: 30.4120, lng: 78.2910 },
            time: "08:30 AM",
            type: "activity",
            cost: 200,
            currency: "INR",
            notes: "Ropeway return ticket ₹177 pp; hiking trail takes ~45 mins up.",
          },
          {
            _key: "knt2b",
            title: "Surkhanda Devi Temple Darshan & Summit View",
            description: "Ancient temple dedicated to Goddess Sati perched at 3,048 m with panoramic views of the Greater Himalayas.",
            location: { name: "Surkhanda Devi Temple", lat: 30.4147, lng: 78.2867 },
            time: "10:00 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "One of the 51 Shaktipeeths where the head of Goddess Sati is believed to have fallen.",
          },
          {
            _key: "knt2c",
            title: "Traditional Garhwali Chainsoo Lunch",
            description: "Enjoy hot local mountain lentils, tawa rotis with homemade white butter, and rhododendron buransh squash at Milan Dhaba.",
            location: { name: "Milan Dhaba, Kanatal", lat: 30.4184, lng: 78.3444 },
            time: "01:30 PM",
            type: "food",
            cost: 350,
            currency: "INR",
            notes: "Chainsoo (ground black gram curry) is a nourishing local staple.",
          },
        ],
      },
      {
        _key: "knt-d3",
        dayNumber: 3,
        title: "Kaudia Forest Reserve Trek & Tehri Lake Overlook",
        date: "2026-04-25",
        summary: "Spend a blissful day walking through the dense mossy canopy of Kaudia Forest — home to barking deer and mountain pheasants — followed by an afternoon overlook of the turquoise waters of Tehri Dam reservoir.",
        activities: [
          {
            _key: "knt3a",
            title: "Kaudia Forest Reserve Nature Walk (6 km)",
            description: "Flat, tranquil dirt track through towering deodars, dense oak undergrowth, and natural freshwater springs.",
            location: { name: "Kaudia Forest", lat: 30.4280, lng: 78.3580 },
            time: "09:00 AM",
            type: "activity",
            cost: 100,
            currency: "INR",
            notes: "Entry fee ₹50 pp. Jeep safari option available inside forest for ₹1,500.",
          },
          {
            _key: "knt3b",
            title: "Picnic & Wood-Fired Pizza at Kaudia Cafe",
            description: "Relax at the forest edge eco-cafe sampling fresh herb tea, organic salads, and wood-fired pizzas.",
            location: { name: "Kaudia Nature Cafe", lat: 30.4280, lng: 78.3580 },
            time: "01:00 PM",
            type: "food",
            cost: 600,
            currency: "INR",
            notes: "Panoramic mountain view deck with hammock swings.",
          },
          {
            _key: "knt3c",
            title: "Tehri Lake Panoramic Viewpoint",
            description: "Short detour to overlook the massive emerald reservoir of Tehri Dam nestled between mountain folds.",
            location: { name: "Tehri Dam Viewpoint", lat: 30.3780, lng: 78.4800 },
            time: "04:00 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Spectacular contrast of turquoise water against barren Himalayan contours.",
          },
        ],
      },
      {
        _key: "knt-d4",
        dayNumber: 4,
        title: "Kanatal → Dhanaulti Eco Park → Dehradun Airport → Mumbai/Pune",
        date: "2026-04-26",
        summary: "Stroll beneath towering centuries-old deodars at Dhanaulti Eco Park, enjoy breakfast with mountain views, and descend to Dehradun Airport for your afternoon flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "knt4a",
            title: "Dhanaulti Eco Park Walk (Amber & Dhara)",
            description: "Peaceful forest park preserved by local youth cooperatives with winding paths and flying fox lines.",
            location: { name: "Dhanaulti Eco Park", lat: 30.4500, lng: 78.2400 },
            time: "09:30 AM",
            type: "activity",
            cost: 150,
            currency: "INR",
            notes: "Entry ₹50 pp. Fresh pine smell and deodar canopy walks.",
          },
          {
            _key: "knt4b",
            title: "Descent to Jolly Grant Airport (~75 km, 2.5 hrs)",
            description: "Scenic mountain downhill drive back to Dehradun Airport via Rishikesh bypass.",
            location: { name: "Dehradun Airport", lat: 30.1897, lng: 78.1803 },
            time: "12:00 PM",
            type: "transport",
            cost: 2000,
            currency: "INR",
            notes: "Stop at Narendra Nagar for viewpoint overlooking Rishikesh plains.",
          },
          {
            _key: "knt4c",
            title: "Flight back to Mumbai (BOM) / Pune (PNQ)",
            description: "Board direct flight home feeling refreshed by the pure Himalayan pine air.",
            location: { name: "Dehradun Airport", lat: 30.1897, lng: 78.1803 },
            time: "04:30 PM",
            type: "transport",
            cost: 5000,
            currency: "INR",
            notes: "Non-stop flight landing in Mumbai/Pune by evening.",
          },
        ],
      },
    ],
  },
  {
    _id: "trip-chaukori-5-days",
    title: "Chaukori — 5 Days Tea Gardens & 180° Himalayan Peaks from Mumbai/Pune",
    slug: "chaukori-5-days",
    excerpt: "Wake up to unhindered 180-degree sunrises illuminating Nanda Devi, Trishul, and Panchachuli over historic British tea gardens — combined with underground limestone cave wonders at Patal Bhuvaneshwar.",
    tags: ["Himalayas", "Uttarakhand", "Tea Gardens", "Mountains", "Offbeat", "Nature", "Spiritual", "North India"],
    country: "India",
    startDate: "2026-05-01",
    endDate: "2026-05-05",
    bestSuggestedMonth: "October – April & May – June",
    status: "published",
    viewCount: 0,
    totalBudget: 16500,
    currency: "INR",
    tripType: "Scenic Road Trip",
    readingTime: 9,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "chk-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Pantnagar / Kathgodam → Almora → Chaukori (6,600 ft)",
        date: "2026-05-01",
        summary: "Fly from Mumbai (BOM) or Pune (PNQ) to Pantnagar (PGH) or arrive via Kathgodam Express. Board your private cab for the scenic mountain highway through Bhimtal, Bhowali fruit orchards, and Almora to the quiet tea bowl of Chaukori.",
        activities: [
          {
            _key: "chk1a",
            title: "Flight BOM/PNQ to Pantnagar (PGH)",
            description: "Direct morning flight landing in Kumaon gateway plains, met by mountain taxi.",
            location: { name: "Pantnagar Airport", lat: 29.0322, lng: 79.4736 },
            time: "07:30 AM",
            type: "transport",
            cost: 6200,
            currency: "INR",
            notes: "Pantnagar is the closest functional airport to Kumaon hills.",
          },
          {
            _key: "chk1b",
            title: "Drive to Chaukori via Almora (~185 km, 6.5 hrs)",
            description: "Scenic drive ascending through pine ridges, terrace valleys, and the historic cultural town of Almora.",
            location: { name: "Chaukori", lat: 29.8710, lng: 80.0210 },
            time: "10:30 AM",
            type: "transport",
            cost: 3200,
            currency: "INR",
            notes: "Stop for lunch at Almora or Chitai Golu Devta temple.",
          },
          {
            _key: "chk1c",
            title: "Check-in at KMVN Tea Estate Cottage",
            description: "Unwind at the heritage British tea garden rest house with direct view of snowy peaks from the lawn.",
            location: { name: "Chaukori Tea Estate", lat: 29.8710, lng: 80.0210 },
            time: "05:30 PM",
            type: "accommodation",
            cost: 2200,
            currency: "INR",
            notes: "Cottages open directly onto historic tea plantation slopes.",
          },
        ],
      },
      {
        _key: "chk-d2",
        dayNumber: 2,
        title: "Chaukori British Tea Gardens & 180° Himalayan Sunrise",
        date: "2026-05-02",
        summary: "Step out at dawn to witness a breathtaking 180-degree sunrise setting the snow ramparts of Nanda Devi, Nanda Kot, Trishul, and Panchachuli on fire. Spend the day exploring organic tea plantations and local fruit orchards.",
        activities: [
          {
            _key: "chk2a",
            title: "Sunrise at Chaukori Watch Tower",
            description: "Climb the watchtower for one of the widest unbroken Himalayan views in India, stretching across 300 km of peaks.",
            location: { name: "Chaukori Watch Tower", lat: 29.8720, lng: 80.0220 },
            time: "05:45 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Watch the golden alpenglow illuminate Nanda Devi (7,816 m) and Maiktoli.",
          },
          {
            _key: "chk2b",
            title: "Heritage Tea Garden Walking Tour",
            description: "Stroll among tea bushes planted by British planters in the late 19th century and visit local processing sheds.",
            location: { name: "Chaukori Tea Gardens", lat: 29.8710, lng: 80.0210 },
            time: "09:30 AM",
            type: "activity",
            cost: 100,
            currency: "INR",
            notes: "Interact with local tea pickers and taste freshly processed organic green tea.",
          },
          {
            _key: "chk2c",
            title: "Kumaoni Feast with Local Tea",
            description: "Taste authentic Bhatt ki Dal, Singori sweet in Malu leaves, and freshly brewed organic Chaukori green tea.",
            location: { name: "Tea Garden Kitchen, Chaukori", lat: 29.8710, lng: 80.0210 },
            time: "01:30 PM",
            type: "food",
            cost: 400,
            currency: "INR",
            notes: "Traditional brass thali served with mountain ghee.",
          },
        ],
      },
      {
        _key: "chk-d3",
        dayNumber: 3,
        title: "Subterranean Expedition to Patal Bhuvaneshwar Caves",
        date: "2026-05-03",
        summary: "Take an exciting 35 km day excursion to Patal Bhuvaneshwar — a mystical subterranean limestone cave temple located 90 feet underground, venerated for natural stalagmite and stalactite geological formations.",
        activities: [
          {
            _key: "chk3a",
            title: "Drive to Patal Bhuvaneshwar (35 km, 1.2 hrs)",
            description: "Scenic drive descending into the Saryu river basin to the cave complex entry.",
            location: { name: "Patal Bhuvaneshwar", lat: 29.6917, lng: 80.0917 },
            time: "09:00 AM",
            type: "transport",
            cost: 1200,
            currency: "INR",
            notes: "Shared or private cab. Narrow but scenic country road.",
          },
          {
            _key: "chk3b",
            title: "Underground Limestone Cave Exploration",
            description: "Descend narrow iron chains into the subterranean chamber to witness natural stone sculptures described in Skanda Purana.",
            location: { name: "Patal Bhuvaneshwar Caves", lat: 29.6917, lng: 80.0917 },
            time: "10:45 AM",
            type: "activity",
            cost: 100,
            currency: "INR",
            notes: "ASI token and temple guide fee ₹100 pp. Not recommended for severely claustrophobic visitors.",
          },
          {
            _key: "chk3c",
            title: "Cave Base Dhaba Lunch & Return to Chaukori",
            description: "Steaming hot Dubuk dal, mountain pakoras, and ginger chai before returning for sunset.",
            location: { name: "Patal Bhuvaneshwar Village", lat: 29.6917, lng: 80.0917 },
            time: "01:30 PM",
            type: "food",
            cost: 250,
            currency: "INR",
            notes: "Rustic village eatery serving authentic Kumaoni comfort food.",
          },
        ],
      },
      {
        _key: "chk-d4",
        dayNumber: 4,
        title: "Berinag Snake Shrines & Mahakali Temple at Gangolihat",
        date: "2026-05-04",
        summary: "Explore the ancient Nag Devta temples of Berinag set amidst tea gardens, followed by the powerful medieval Shaktipeeth of Hat Kalika established by Adi Shankaracharya at Gangolihat.",
        activities: [
          {
            _key: "chk4a",
            title: "Berinag Serpent Temples & Tea Gardens",
            description: "Visit the revered Snake temples of Berinag surrounded by rolling pine forests and tea slopes.",
            location: { name: "Berinag", lat: 29.8000, lng: 80.0500 },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Berinag was named after the famous Nag Veni temple.",
          },
          {
            _key: "chk4b",
            title: "Hat Kalika Temple, Gangolihat",
            description: "Historic 8th-century temple complex dedicated to Goddess Kali, deeply revered by the Indian Army's Kumaon Regiment.",
            location: { name: "Gangolihat", lat: 29.6600, lng: 80.0400 },
            time: "12:00 PM",
            type: "activity",
            cost: 100,
            currency: "INR",
            notes: "Sacred deodar grove surrounding the temple with historical bell offerings by armed forces battalions.",
          },
          {
            _key: "chk4c",
            title: "Bonfire & Star Gazing Night at Chaukori",
            description: "Evening campfire under crystal clear Himalayan night skies with Orion and the Milky Way glistening above Nanda Devi.",
            location: { name: "Chaukori Ridge", lat: 29.8710, lng: 80.0210 },
            time: "07:30 PM",
            type: "accommodation",
            cost: 500,
            currency: "INR",
            notes: "Zero light pollution makes Chaukori an exceptional astrophotography destination.",
          },
        ],
      },
      {
        _key: "chk-d5",
        dayNumber: 5,
        title: "Chaukori → Jageshwar Dham Temples → Kathgodam/Pantnagar → Mumbai/Pune",
        date: "2026-05-05",
        summary: "Early morning departure via the sacred 8th-century deodar glade of Jageshwar Dham (124 carved stone temples) before reaching Pantnagar Airport or Kathgodam station for your return journey home.",
        activities: [
          {
            _key: "chk5a",
            title: "Jageshwar Dham Temple Complex (85 km, 2.5 hrs)",
            description: "Enchanting 8th-to-12th century stone temple cluster dedicated to Lord Shiva set deep within towering deodar woods.",
            location: { name: "Jageshwar Dham", lat: 29.6400, lng: 79.8500 },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "One of the 12 Jyotirlinga precursors mentioned in Shiva Purana. Archaeological museum on site.",
          },
          {
            _key: "chk5b",
            title: "Drive to Kathgodam / Pantnagar Airport (~115 km, 3.5 hrs)",
            description: "Final descent to the railway terminal or airport.",
            location: { name: "Kathgodam", lat: 29.2730, lng: 79.5447 },
            time: "01:00 PM",
            type: "transport",
            cost: 3200,
            currency: "INR",
            notes: "Stop for hot tea and sweet Bal Mithai at Bhowali.",
          },
          {
            _key: "chk5c",
            title: "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            description: "Board evening flight carrying home the tranquility and crisp mountain air of Kumaon.",
            location: { name: "Pantnagar Airport", lat: 29.0322, lng: 79.4736 },
            time: "05:30 PM",
            type: "transport",
            cost: 6200,
            currency: "INR",
            notes: "Direct flight back to Mumbai or Pune.",
          },
        ],
      },
    ],
  },
  {
    _id: "trip-gurez-valley-5-days",
    title: "Gurez Valley & Dard-Shin Frontier — 5 Days from Mumbai / Pune (via Srinagar & Razdan Pass)",
    slug: "gurez-valley-5-days",
    excerpt: "Journey from Mumbai or Pune deep into northern Kashmir's most pristine frontier — crossing the dramatic Razdan Pass at 11,672 ft to reach the turquoise Kishanganga River, the iconic pyramid of Habba Khatoon peak, and the ancient Dard-Shin wooden villages of Dawar and Tulail bordering the LoC.",
    tags: [
      "Himalayas",
      "Kashmir",
      "Offbeat",
      "Culture",
      "Borderlands",
      "Mountains",
      "Nature",
      "India"
    ],
    country: "India",
    startDate: "2026-06-15",
    endDate: "2026-06-19",
    bestSuggestedMonth: "May – October (Pass closed in winter)",
    status: "published",
    viewCount: 0,
    totalBudget: 22000,
    currency: "INR",
    tripType: "Offbeat Valley & Cultural Expedition",
    readingTime: 9,
    _createdAt: "2026-08-28T00:00:00Z",
    _updatedAt: "2026-08-28T00:00:00Z",
    itinerary: [
      {
        _key: "gur-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Srinagar Airport → Razdan Pass (11,672 ft) → Dawar (Gurez)",
        date: "2026-06-15",
        summary: "Board an early morning flight from Mumbai (BOM) or Pune (PNQ) to Srinagar (SXR). Meet your 4x4 mountain cab and drive through the scenic northern shores of Wular Lake and Bandipora, ascending the hairpin turns of Razdan Pass before descending into the hidden Shangri-La of Dawar valley.",
        activities: [
          {
            _key: "gur1a",
            title: "Morning Flight Mumbai / Pune to Srinagar Airport (~2.5 hrs)",
            description: "Direct morning flight landing in Srinagar by 9:30 AM. Clear baggage and meet your driver with pre-arranged army permit passes.",
            location: {
              name: "Srinagar International Airport",
              lat: 34.008,
              lng: 74.7741
            },
            time: "09:30 AM",
            type: "transport",
            cost: 6800,
            currency: "INR",
            notes: "Keep physical copies of Aadhaar card / ID for border checkposts."
          },
          {
            _key: "gur1b",
            title: "Scenic Drive through Bandipora & Wular Lake Viewpoint",
            description: "Traverse apple orchards of north Kashmir and catch panoramic vistas of Wular Lake, India's largest freshwater lake.",
            location: {
              name: "Bandipora Wular Road",
              lat: 34.4225,
              lng: 74.6441
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Stop for hot Nadru pakoras and spiced Kahwa at Bandipora town."
          },
          {
            _key: "gur1c",
            title: "Razdan Pass Summit (3,557 m / 11,672 ft)",
            description: "The high-altitude gateway between Kashmir Valley and Gurez with breath-taking views of Harmukh peak and rolling alpine meadows.",
            location: {
              name: "Razdan Pass Top",
              lat: 34.5422,
              lng: 74.6548
            },
            time: "01:30 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Army checkpost requires registration. Temperature drops noticeably by 10°C."
          },
          {
            _key: "gur1d",
            title: "Arrival in Dawar & Check-in at Riverside Lodge",
            description: "Descend into the emerald Kishanganga valley. Settle into your wooden log lodge facing the towering Habba Khatoon peak.",
            location: {
              name: "Dawar Main Town, Gurez",
              lat: 34.6375,
              lng: 74.7661
            },
            time: "04:30 PM",
            type: "accommodation",
            cost: 2500,
            currency: "INR",
            notes: "Evening tea beside the turquoise Kishanganga river."
          }
        ]
      },
      {
        _key: "gur-day2",
        dayNumber: 2,
        title: "Habba Khatoon Pyramid Peak & Dard-Shin Village Heritage",
        date: "2026-06-16",
        summary: "Spend a mesmerizing day discovering the legend of Kashmiri poetess-queen Habba Khatoon, tasting crystal glacial water from her sacred spring, and exploring traditional logwood hamlet life with the indigenous Dard-Shin community.",
        activities: [
          {
            _key: "gur2a",
            title: "Habba Khatoon Peak Golden Hour Viewpoint",
            description: "Watch dawn sunlight illuminate the sharp triangular limestone pyramid peak named after Kashmir's nightingale poetess.",
            location: {
              name: "Habba Khatoon Peak",
              lat: 34.6492,
              lng: 74.789
            },
            time: "06:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "The peak dominates the Gurez skyline with sheer vertical limestone cliffs."
          },
          {
            _key: "gur2b",
            title: "Spring of Habba Khatoon & Riverside Trail",
            description: "Visit the natural freshwater spring bubbling from the rock face where the queen once composed mournful verses for King Yusuf Shah Chak.",
            location: {
              name: "Habba Khatoon Spring",
              lat: 34.648,
              lng: 74.785
            },
            time: "09:30 AM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "The spring water is pristine, ice-cold, and renowned for therapeutic minerals."
          },
          {
            _key: "gur2c",
            title: "Dard-Shin Cultural Heritage Walk in Dawar",
            description: "Stroll through traditional multi-storey cedar-log homes, interacting with the Dardic Shin-speaking locals wearing embroidered caps and silver jewelry.",
            location: {
              name: "Dawar Heritage Village",
              lat: 34.639,
              lng: 74.765
            },
            time: "02:00 PM",
            type: "activity",
            cost: 200,
            currency: "INR",
            notes: "The Dards are an ancient Indo-Aryan ethnic group with rich oral folklore traditions."
          },
          {
            _key: "gur2d",
            title: "Fresh Himalayan Trout Dinner at River View",
            description: "Savor freshly caught pan-fried Kishanganga river trout served with warm walnut chutney and Kashmiri rice.",
            location: {
              name: "Dawar Riverfront",
              lat: 34.636,
              lng: 74.768
            },
            time: "07:30 PM",
            type: "food",
            cost: 650,
            currency: "INR",
            notes: "Gurez is famous across Jammu & Kashmir for its crystal-clear rainbow trout waters."
          }
        ]
      },
      {
        _key: "gur-day3",
        dayNumber: 3,
        title: "Dawar to Tulail Valley Expedition (Sheikhpora & Badugam)",
        date: "2026-06-17",
        summary: "Embark on an off-road day expedition along the upper Kishanganga River to remote Tulail Valley — exploring untouched wooden villages like Barnoi, Sheikhpora, and Badugam nestled right against snow-clad mountain passes.",
        activities: [
          {
            _key: "gur3a",
            title: "Drive into Tulail Valley along Kishanganga (45 km)",
            description: "Scenic 4WD drive passing narrow gorges, cascading waterfalls, and lush alpine pasture slopes towards the Dras frontier.",
            location: {
              name: "Tulail Valley Highway",
              lat: 34.5714,
              lng: 75.0519
            },
            time: "08:30 AM",
            type: "transport",
            cost: 1200,
            currency: "INR",
            notes: "Road is unpaved in sections; high clearance 4WD SUV required."
          },
          {
            _key: "gur3b",
            title: "Traditional Wooden Log Architecture in Badugam",
            description: "Discover entirely hand-carved cedarwood settlements with mud-insulated flat roofs and hanging corn cobs.",
            location: {
              name: "Badugam Village, Tulail",
              lat: 34.582,
              lng: 75.07
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Zero modern cement construction preserves the authentic 19th-century frontier look."
          },
          {
            _key: "gur3c",
            title: "Picnic Lunch at Sheikhpora Alpine Meadows",
            description: "Unpack packed picnic lunch alongside blooming wild irises and grazing horses with snowfields towering above.",
            location: {
              name: "Sheikhpora Meadow",
              lat: 34.568,
              lng: 75.035
            },
            time: "01:30 PM",
            type: "food",
            cost: 350,
            currency: "INR",
            notes: "Carry all trash back; leave zero trace in this delicate ecosystem."
          },
          {
            _key: "gur3d",
            title: "Evening Campfire & Dardic Storytelling Session",
            description: "Gather around crackling cedar bonfire under starlit skies listening to village elders recount historical Silk Route legends.",
            location: {
              name: "Dawar Camp Ground",
              lat: 34.6375,
              lng: 74.7661
            },
            time: "07:30 PM",
            type: "activity",
            cost: 500,
            currency: "INR",
            notes: "Warm down jackets essential as night temperature plummets."
          }
        ]
      },
      {
        _key: "gur-day4",
        dayNumber: 4,
        title: "Kanzalwan Silk Route Crossing & Chorwan Borderlands",
        date: "2026-06-18",
        summary: "Visit Kanzalwan — the historic crossway where the ancient Silk Route bifurcated towards Gilgit and Central Asia — followed by the panoramic border viewpoints around Chorwan overlooking the Line of Control.",
        activities: [
          {
            _key: "gur4a",
            title: "Drive to Kanzalwan Village & River Confluence",
            description: "Explore the quiet outpost where Sir Aurel Stein and ancient Buddhist pilgrims crossed on their way to Gilgit and China.",
            location: {
              name: "Kanzalwan Village",
              lat: 34.652,
              lng: 74.698
            },
            time: "09:00 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Surrounded by steep deodar forests and sheer cliffs."
          },
          {
            _key: "gur4b",
            title: "Chorwan LoC Border Viewpoint",
            description: "Accompanied by Indian Army permissions, observe the peaceful frontier ridgeline dividing Jammu & Kashmir from Pakistan-administered Gilgit-Baltistan.",
            location: {
              name: "Chorwan Border Viewpoint",
              lat: 34.675,
              lng: 74.835
            },
            time: "11:30 AM",
            type: "activity",
            cost: 100,
            currency: "INR",
            notes: "Strict photography restrictions apply towards defensive military installations."
          },
          {
            _key: "gur4c",
            title: "Traditional Noon Chai & Tsot Bread with Host Family",
            description: "Sip salted pink noon chai brewed with baking soda and milk, paired with fresh oven-baked tandoori girda and lavas bread.",
            location: {
              name: "Dawar Homestay Kitchen",
              lat: 34.6375,
              lng: 74.7661
            },
            time: "03:30 PM",
            type: "food",
            cost: 200,
            currency: "INR",
            notes: "Hearty traditional Kashmiri high tea hospitality."
          },
          {
            _key: "gur4d",
            title: "Night Astrophotography by Kishanganga River",
            description: "With virtually zero light pollution, capture the Milky Way core arching above the silhouette of Habba Khatoon peak.",
            location: {
              name: "Kishanganga Riverbank",
              lat: 34.637,
              lng: 74.77
            },
            time: "09:30 PM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Bortle Class 1 dark skies ideal for star trail photography."
          }
        ]
      },
      {
        _key: "gur-day5",
        dayNumber: 5,
        title: "Dawar → Razdan Pass → Srinagar Shikara → Mumbai / Pune",
        date: "2026-06-19",
        summary: "Early morning farewell drive over Razdan Pass back into Kashmir Valley, enjoying an afternoon Shikara ride on Dal Lake and a traditional Wazwan feast before your return flight home.",
        activities: [
          {
            _key: "gur5a",
            title: "Descent over Razdan Pass to Srinagar Valley (135 km, 4.5 hrs)",
            description: "Bid farewell to Gurez and wind down through the pine-scented peaks to Srinagar.",
            location: {
              name: "Razdan Pass Descent",
              lat: 34.5422,
              lng: 74.6548
            },
            time: "07:00 AM",
            type: "transport",
            cost: 2500,
            currency: "INR",
            notes: "Early start ensures reaching Srinagar with comfortable flight buffer."
          },
          {
            _key: "gur5b",
            title: "Dal Lake Shikara Ride & Floating Market",
            description: "Glide silently along the water lilies and wooden houseboats of Dal Lake before lunch.",
            location: {
              name: "Dal Lake Ghat, Srinagar",
              lat: 34.0837,
              lng: 74.834
            },
            time: "12:00 PM",
            type: "activity",
            cost: 600,
            currency: "INR",
            notes: "Relaxing contrast to the rugged mountain passes of the past 4 days."
          },
          {
            _key: "gur5c",
            title: "Authentic Kashmiri Wazwan Lunch at Ahdoos",
            description: "Savor Gushtaba, Rista, Rogan Josh, and Tabak Maaz served over fragrant saffron rice.",
            location: {
              name: "Residency Road, Srinagar",
              lat: 34.072,
              lng: 74.816
            },
            time: "01:30 PM",
            type: "food",
            cost: 950,
            currency: "INR",
            notes: "Historic 1918 culinary institution on the banks of Jhelum River."
          },
          {
            _key: "gur5d",
            title: "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            description: "Transfer to Srinagar Airport for evening direct flight back home.",
            location: {
              name: "Srinagar International Airport",
              lat: 34.008,
              lng: 74.7741
            },
            time: "05:00 PM",
            type: "transport",
            cost: 7200,
            currency: "INR",
            notes: "Arrive at airport 2.5 hours early due to multi-tier security checks."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-aru-valley-4-days",
    title: "Aru Valley Meadow Sanctuary — 4 Days from Mumbai / Pune (via Srinagar & Pahalgam)",
    slug: "aru-valley-4-days",
    excerpt: "Escape Mumbai or Pune for Kashmir's most idyllic alpine meadow retreat — nestled 12 km past Pahalgam at 7,920 ft. Walk along the gushing Lidder River, hike towards Lidderwat pine glades, explore Gujjar shepherd hamlets, and unwind surrounded by silver firs and towering Himalayan peaks.",
    tags: [
      "Himalayas",
      "Kashmir",
      "Meadows",
      "Trekking",
      "Nature",
      "Relaxation",
      "Offbeat",
      "India"
    ],
    country: "India",
    startDate: "2026-06-22",
    endDate: "2026-06-25",
    bestSuggestedMonth: "April – October & Dec – Feb for snow",
    status: "published",
    viewCount: 0,
    totalBudget: 16500,
    currency: "INR",
    tripType: "Alpine Meadow & Nature Trek",
    readingTime: 8,
    _createdAt: "2026-08-28T00:00:00Z",
    _updatedAt: "2026-08-28T00:00:00Z",
    itinerary: [
      {
        _key: "aru-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Srinagar Airport → Pahalgam → Aru Valley (7,920 ft)",
        date: "2026-06-22",
        summary: "Take a morning flight from Mumbai (BOM) or Pune (PNQ) to Srinagar (SXR). Drive south past the saffron fields of Pampore and 9th-century Avantipur ruins to Pahalgam, then ascend the winding 12 km single-lane forest road into the serene pine-ringed bowl of Aru Valley.",
        activities: [
          {
            _key: "aru1a",
            title: "Morning Flight BOM/PNQ to Srinagar Airport",
            description: "Direct flight to Srinagar. Meet private cab outside terminal for the transfer to Lidder Valley.",
            location: {
              name: "Srinagar International Airport",
              lat: 34.008,
              lng: 74.7741
            },
            time: "09:30 AM",
            type: "transport",
            cost: 6500,
            currency: "INR",
            notes: "Grab a bottle of fresh saffron kehwa from the airport lounge."
          },
          {
            _key: "aru1b",
            title: "Pampore Saffron Fields & Awantipora Hindu Temple Ruins",
            description: "Stop at the 9th-century Avantiswami temple built by King Avantivarman dedicated to Lord Vishnu with intricate basalt stone carvings.",
            location: {
              name: "Awantipora Ruins",
              lat: 33.9238,
              lng: 75.0152
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 25,
            currency: "INR",
            notes: "ASI protected site; buy certified saffron from nearby farmers' co-op."
          },
          {
            _key: "aru1c",
            title: "Ascent past Pahalgam into Aru Valley (12 km, 30 min)",
            description: "Bypass tourist crowds in Pahalgam and drive through dense deodar forests alongside gushing Aru Nallah stream.",
            location: {
              name: "Aru Valley Trailhead",
              lat: 34.09,
              lng: 75.26
            },
            time: "02:30 PM",
            type: "transport",
            cost: 800,
            currency: "INR",
            notes: "Local Pahalgam taxi union regulates transfers; pre-booked vehicle arranged."
          },
          {
            _key: "aru1d",
            title: "Check-in at Aru Wooden Eco-Lodge & Golden Hour Stroll",
            description: "Settle into your cottage surrounded by terraced meadows and grazing ponies with Mt. Kolahoi visible in the distance.",
            location: {
              name: "Aru Eco Village",
              lat: 34.091,
              lng: 75.261
            },
            time: "04:30 PM",
            type: "accommodation",
            cost: 2200,
            currency: "INR",
            notes: "Unwind with steaming cup of cinnamon-spiced Kashmiri Kehwa."
          }
        ]
      },
      {
        _key: "aru-day2",
        dayNumber: 2,
        title: "Day Hike towards Lidderwat & Gujjar Shepherd Settlements",
        date: "2026-06-23",
        summary: "Trek the legendary first leg of the Kolahoi Glacier & Tarsar Marsar trail — ascending through aromatic pine forests, crossing wooden log bridges over glacial torrents, and picnicking in the alpine glades of Lidderwat base.",
        activities: [
          {
            _key: "aru2a",
            title: "Morning Trek to Lidderwat Trail (10 km round trip)",
            description: "Gentle 3-to-4 hour walk along Lidder River through dense silver firs, maple groves, and open riverside boulder fields.",
            location: {
              name: "Lidderwat Trailhead",
              lat: 34.15,
              lng: 75.25
            },
            time: "08:30 AM",
            type: "activity",
            cost: 800,
            currency: "INR",
            notes: "Local trekking guide included. Ponies available for those preferring to ride."
          },
          {
            _key: "aru2b",
            title: "Visit Nomadic Gujjar Log Cabins & Noon Chai Tasting",
            description: "Interact with seasonal pastoralist shepherds, observing traditional buffalo butter churning and woodcraft in authentic dhoks.",
            location: {
              name: "Lidder Glade Shepherds",
              lat: 34.14,
              lng: 75.252
            },
            time: "11:30 AM",
            type: "activity",
            cost: 150,
            currency: "INR",
            notes: "Warm hospitality; gift of biscuits or stationery appreciated by children."
          },
          {
            _key: "aru2c",
            title: "Riverside Picnic Lunch along Aru Nallah",
            description: "Enjoy fresh boiled eggs, parathas, and local apple jam beside the foaming glacial river.",
            location: {
              name: "Lidder River Bank",
              lat: 34.12,
              lng: 75.256
            },
            time: "01:00 PM",
            type: "food",
            cost: 300,
            currency: "INR",
            notes: "The water is ice-cold straight from the Kolahoi Glacier."
          },
          {
            _key: "aru2d",
            title: "Traditional Kashmiri Wazwan Feast at Aru",
            description: "Relish Rista (meatballs in saffron-red gravy), Rogan Josh, and Haakh greens cooked by local chef.",
            location: {
              name: "Aru Village Restaurant",
              lat: 34.09,
              lng: 75.26
            },
            time: "07:30 PM",
            type: "food",
            cost: 650,
            currency: "INR",
            notes: "Vegetarian options like Nadru Yakhni and Dum Aloo also served."
          }
        ]
      },
      {
        _key: "aru-day3",
        dayNumber: 3,
        title: "Green Top & Kootpathri Wildflower Meadows Ridge Trek",
        date: "2026-06-24",
        summary: "A moderate 4 km uphill hike to Green Top ridge viewpoint providing a 360-degree panorama of Aru Valley, Katrinag peak, and distant snow peaks, followed by an afternoon of wildflower spotting in Kootpathri pasture.",
        activities: [
          {
            _key: "aru3a",
            title: "Hike to Green Top Viewpoint (2,850 m)",
            description: "Scenic climb through oak and birch woods opening out onto a lush green plateau overlooking the entire valley amphitheatre.",
            location: {
              name: "Green Top Viewpoint",
              lat: 34.105,
              lng: 75.275
            },
            time: "09:00 AM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Carry binoculars to spot Himalayan monal pheasants and golden eagles."
          },
          {
            _key: "aru3b",
            title: "Kootpathri Alpine Meadow Walk & Wildflowers",
            description: "Stroll across rolling alpine pastures carpeted in wild anemones, primulas, and forget-me-nots in early summer.",
            location: {
              name: "Kootpathri Meadow",
              lat: 34.1,
              lng: 75.27
            },
            time: "12:00 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Peaceful off-the-beaten-path meadow with barely any tourists."
          },
          {
            _key: "aru3c",
            title: "Trout Angling or Riverside Reading by Aru Stream",
            description: "Try catch-and-release brown trout fly-fishing with permit or read quietly listening to rushing glacial waters.",
            location: {
              name: "Aru Stream Banks",
              lat: 34.089,
              lng: 75.259
            },
            time: "03:30 PM",
            type: "activity",
            cost: 500,
            currency: "INR",
            notes: "Angling permits can be obtained via J&K Fisheries department."
          },
          {
            _key: "aru3d",
            title: "Starlit Campfire Evening in Aru Meadow",
            description: "Bonfire in the courtyard under star-studded Himalayan skies with hot walnut brownies and kahwa.",
            location: {
              name: "Aru Eco Cottage Lawn",
              lat: 34.091,
              lng: 75.261
            },
            time: "08:00 PM",
            type: "accommodation",
            cost: 400,
            currency: "INR",
            notes: "Crisp night air with temperatures hovering around 8–12°C in summer."
          }
        ]
      },
      {
        _key: "aru-day4",
        dayNumber: 4,
        title: "Aru Valley → Betaab Valley Confluence → Srinagar Airport → Mumbai / Pune",
        date: "2026-06-25",
        summary: "Enjoy early dawn photography across mist-shrouded Aru meadows, visit the scenic Betaab Valley confluence near Pahalgam, and drive back along National Highway 44 to Srinagar for your return flight.",
        activities: [
          {
            _key: "aru4a",
            title: "Morning Sunrise Photography in Aru Meadow",
            description: "Witness golden sunlight piercing through the pines onto mist hanging over the valley floor.",
            location: {
              name: "Aru Central Meadow",
              lat: 34.09,
              lng: 75.26
            },
            time: "06:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Best lighting of the trip for landscape photography."
          },
          {
            _key: "aru4b",
            title: "Brief Visit to Betaab Valley (Hajan Valley)",
            description: "Famous movie shooting location with crystal-clear turquoise stream waters and manicured willow gardens.",
            location: {
              name: "Betaab Valley, Pahalgam",
              lat: 34.03,
              lng: 75.35
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "Entry ticket ₹100 per person; 45-min stroll."
          },
          {
            _key: "aru4c",
            title: "Drive to Srinagar Airport (95 km, 2.5 hrs)",
            description: "Smooth highway drive through saffron country to Srinagar terminal.",
            location: {
              name: "Srinagar International Airport",
              lat: 34.008,
              lng: 74.7741
            },
            time: "01:30 PM",
            type: "transport",
            cost: 2200,
            currency: "INR",
            notes: "Allow plenty of time for Srinagar highway traffic."
          },
          {
            _key: "aru4d",
            title: "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            description: "Board late afternoon flight home carrying memories of Kashmir's most peaceful mountain meadow.",
            location: {
              name: "Srinagar International Airport",
              lat: 34.008,
              lng: 74.7741
            },
            time: "04:30 PM",
            type: "transport",
            cost: 6800,
            currency: "INR",
            notes: "Direct or one-stop connection back to Mumbai or Pune."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-yusmarg-4-days",
    title: "Yusmarg 'Meadow of Jesus' & Doodhganga River — 4 Days from Mumbai / Pune",
    slug: "yusmarg-4-days",
    excerpt: "A serene 4-day mountain sojourn from Mumbai or Pune to Yusmarg — the legendary 'Meadow of Jesus' tucked away in the Pir Panjal range just 47 km from Srinagar. Wander through rolling green carpets, trek to the frothing waters of Doodhganga river, visit turquoise Nilnag Lake, and experience untouched Kashmiri serenity.",
    tags: [
      "Himalayas",
      "Kashmir",
      "Meadows",
      "Peaceful",
      "Trekking",
      "Offbeat",
      "Nature",
      "India"
    ],
    country: "India",
    startDate: "2026-06-27",
    endDate: "2026-06-30",
    bestSuggestedMonth: "April – October & Jan – Feb for snow",
    status: "published",
    viewCount: 0,
    totalBudget: 15500,
    currency: "INR",
    tripType: "Alpine Pastures & River Trek",
    readingTime: 8,
    _createdAt: "2026-08-28T00:00:00Z",
    _updatedAt: "2026-08-28T00:00:00Z",
    itinerary: [
      {
        _key: "yus-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Srinagar Airport → Charar-i-Sharief → Yusmarg (7,861 ft)",
        date: "2026-06-27",
        summary: "Take an early morning flight from Mumbai (BOM) or Pune (PNQ) to Srinagar (SXR). Drive southwest through the apple orchards of Budgam, pausing at the historic 600-year-old wooden shrine of Sheikh Noor-ud-Din Wali in Charar-i-Sharief, before arriving at the sweeping alpine meadows of Yusmarg.",
        activities: [
          {
            _key: "yus1a",
            title: "Morning Flight Mumbai / Pune to Srinagar Airport",
            description: "Direct morning arrival in Srinagar. Board waiting private taxi for the scenic 47 km drive southwest.",
            location: {
              name: "Srinagar International Airport",
              lat: 34.008,
              lng: 74.7741
            },
            time: "09:30 AM",
            type: "transport",
            cost: 6500,
            currency: "INR",
            notes: "Yusmarg is the closest major alpine meadow to Srinagar airport (under 2 hours drive)."
          },
          {
            _key: "yus1b",
            title: "Heritage Visit to Charar-i-Sharief Sufi Shrine",
            description: "Visit the revered shrine dedicated to Kashmir's patron Sufi saint Sheikh Noor-ud-Din Noorani (Nund Rishi), famous for traditional woodwork and peaceful ambiance.",
            location: {
              name: "Charar-i-Sharief Shrine",
              lat: 33.8642,
              lng: 74.7678
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Dress respectfully; head covering required for both men and women."
          },
          {
            _key: "yus1c",
            title: "Arrival at Yusmarg Meadow (2,396 m) & JKTDC Cottage Check-in",
            description: "Emerge from pine forest into vast rolling emerald grasslands framed by the snow-capped Pir Panjal range and Tatakoti peak.",
            location: {
              name: "Yusmarg Alpine Meadow",
              lat: 33.83,
              lng: 74.66
            },
            time: "02:00 PM",
            type: "accommodation",
            cost: 2000,
            currency: "INR",
            notes: "Check into cozy JKTDC tourist huts or pine view alpine resort."
          },
          {
            _key: "yus1d",
            title: "Golden Hour Stroll across Central Pastures",
            description: "Walk across the springy turf where legend says Jesus once walked. Watch grazing sheep and horses against the setting sun.",
            location: {
              name: "Yusmarg Central Pastures",
              lat: 33.828,
              lng: 74.658
            },
            time: "05:00 PM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Yusmarg is blessed with zero commercial clutter or loud crowds."
          }
        ]
      },
      {
        _key: "yus-day2",
        dayNumber: 2,
        title: "Doodhganga River Trek & Sang-e-Safed Valley Foothills",
        date: "2026-06-28",
        summary: "Descend through aromatic blue pine forests to the foaming, milky torrent of Doodhganga River, continuing on foot or horseback along the boulder-strewn glacial valley towards the snowbound amphitheatre of Sang-e-Safed.",
        activities: [
          {
            _key: "yus2a",
            title: "Pine Forest Descent to Doodhganga Gorge (2 km, 45 min)",
            description: "Walk down through towering fir and pine woods to the roaring river, named 'Milk River' because its frothing white waters resemble milk.",
            location: {
              name: "Doodhganga River Trail",
              lat: 33.815,
              lng: 74.648
            },
            time: "09:00 AM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Gentle descent; pony hire available for ₹400 if preferred."
          },
          {
            _key: "yus2b",
            title: "Riverside Relaxation & Pebble Skipping by Doodhganga",
            description: "Sit on giant sun-warmed river boulders, dipping feet in ice-cold glacial meltwater and listening to the mountain roar.",
            location: {
              name: "Doodhganga River Banks",
              lat: 33.812,
              lng: 74.645
            },
            time: "11:00 AM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Take care near fast-flowing currents."
          },
          {
            _key: "yus2c",
            title: "Picnic Trek towards Sang-e-Safed (White Rock) Valley",
            description: "Follow the upstream trail towards the oval-shaped glacial valley of Sang-e-Safed (10 km one-way) surrounded by perpetual snowfields.",
            location: {
              name: "Sang-e-Safed Valley Trail",
              lat: 33.785,
              lng: 74.62
            },
            time: "01:00 PM",
            type: "activity",
            cost: 700,
            currency: "INR",
            notes: "Trek as far as comfort allows; packed lunch provided by lodge."
          },
          {
            _key: "yus2d",
            title: "Traditional Kashmiri Dinner with Rogan Josh & Haakh",
            description: "Warm up in the wooden dining hall with slow-cooked mutton rogan josh, collard haakh greens, and steaming Kashmiri rice.",
            location: {
              name: "Yusmarg Tourist Complex",
              lat: 33.83,
              lng: 74.66
            },
            time: "07:30 PM",
            type: "food",
            cost: 600,
            currency: "INR",
            notes: "Finish with a cup of soothing cardamom and almond kahwa."
          }
        ]
      },
      {
        _key: "yus-day3",
        dayNumber: 3,
        title: "Nilnag Alpine Blue Lake Forest Expedition",
        date: "2026-06-29",
        summary: "Trek or take a short off-road cab through thick deodar forest to Nilnag — an exquisite, secluded freshwater lake famous for its deep aquamarine color, water lilies, and tranquil pine-clad banks.",
        activities: [
          {
            _key: "yus3a",
            title: "Trek through Blue Pine Forest to Nilnag Lake (4 km, 1.5 hrs)",
            description: "A scenic bridle path winding through chir and blue pine ridges down into the hidden lake basin.",
            location: {
              name: "Nilnag Lake Trail",
              lat: 33.842,
              lng: 74.698
            },
            time: "09:30 AM",
            type: "activity",
            cost: 300,
            currency: "INR",
            notes: "Can also be reached via rough 4x4 road from Nagam village."
          },
          {
            _key: "yus3b",
            title: "Nilnag Lake Exploration & Photography",
            description: "Surrounded by pine-blanketed hills, the lake gets its name ('Blue Lake') from its brilliant teal hue reflecting the mountain sky.",
            location: {
              name: "Nilnag Lake, Yusmarg",
              lat: 33.842,
              lng: 74.698
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Historical lake noted in the Rajatarangini chronicles of Kashmir."
          },
          {
            _key: "yus3c",
            title: "Lakeside Village Dhaba Lunch",
            description: "Taste piping hot Rajma chawal, aloo jeera, and crisp tandoori roti at a family-run wooden shack.",
            location: {
              name: "Nilnag Village Dhaba",
              lat: 33.843,
              lng: 74.695
            },
            time: "01:30 PM",
            type: "food",
            cost: 250,
            currency: "INR",
            notes: "Simple, honest, and comforting mountain meal."
          },
          {
            _key: "yus3d",
            title: "Sunset Viewpoint over Tatakoti & Sunset Peaks",
            description: "Watch dusk turn the Pir Panjal snows to burnt orange from the high western rim of Yusmarg.",
            location: {
              name: "Yusmarg Ridge Viewpoint",
              lat: 33.832,
              lng: 74.655
            },
            time: "06:30 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Tatakoti Peak (4,725 m) stands majestic in the southern horizon."
          }
        ]
      },
      {
        _key: "yus-day4",
        dayNumber: 4,
        title: "Yusmarg → Srinagar Old City Heritage → Mumbai / Pune",
        date: "2026-06-30",
        summary: "Enjoy a final morning walk across the tranquil meadows, drive down to Srinagar for a quick exploration of the historic 14th-century Jamia Masjid in Old City, before boarding your flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "yus4a",
            title: "Dawn Walk in the Dew-Soaked Meadows",
            description: "Take deep breaths of crisp Himalayan mountain air scented with pine resin and wild herbs.",
            location: {
              name: "Yusmarg Meadows",
              lat: 33.83,
              lng: 74.66
            },
            time: "07:00 AM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Horses run freely across the mist-covered slopes at sunrise."
          },
          {
            _key: "yus4b",
            title: "Scenic Drive Yusmarg to Srinagar (47 km, 1.5 hrs)",
            description: "Descend from the highlands through terraced mustard and apple fields into Srinagar city.",
            location: {
              name: "Yusmarg to Srinagar Highway",
              lat: 33.95,
              lng: 74.75
            },
            time: "09:30 AM",
            type: "transport",
            cost: 1500,
            currency: "INR",
            notes: "Smooth paved road with panoramic views of Srinagar basin."
          },
          {
            _key: "yus4c",
            title: "Historic Jamia Masjid Srinagar & Spicemarket Walk",
            description: "Visit the magnificent 600-year-old Indo-Saracenic wooden mosque featuring 378 majestic deodar pillars and courtyard fountain.",
            location: {
              name: "Jamia Masjid, Nowhatta",
              lat: 34.1011,
              lng: 74.815
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Pick up pure Kashmiri walnuts, dried morels (guchhi), and saffron."
          },
          {
            _key: "yus4d",
            title: "Transfer to Srinagar Airport & Return Flight to BOM / PNQ",
            description: "Check in for late afternoon direct flight back to Mumbai or Pune.",
            location: {
              name: "Srinagar International Airport",
              lat: 34.008,
              lng: 74.7741
            },
            time: "03:30 PM",
            type: "transport",
            cost: 6500,
            currency: "INR",
            notes: "Arrive 2.5 hours prior to departure for security screening."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-turtuk-5-days",
    title: "Turtuk Balti Frontier & Nubra Valley — 5 Days from Mumbai / Pune (via Leh & Khardung La)",
    slug: "turtuk-5-days",
    excerpt: "Venture from Mumbai or Pune across the legendary Khardung La Pass (17,982 ft) into Nubra Valley and further to Turtuk — the northernmost Balti settlement in India, opened to travellers only in 2010. Experience stone-and-wood Balti architecture, lush apricot orchards, organic walnut farming, and century-old Tibetan-Persian heritage on the edge of the Karakoram.",
    tags: [
      "Himalayas",
      "Ladakh",
      "Balti",
      "Borderlands",
      "High Altitude",
      "Culture",
      "Adventure",
      "India"
    ],
    country: "India",
    startDate: "2026-07-05",
    endDate: "2026-07-09",
    bestSuggestedMonth: "May – October",
    status: "published",
    viewCount: 0,
    totalBudget: 26000,
    currency: "INR",
    tripType: "Karakoram Frontier Cultural Road Trip",
    readingTime: 10,
    _createdAt: "2026-08-28T00:00:00Z",
    _updatedAt: "2026-08-28T00:00:00Z",
    itinerary: [
      {
        _key: "tur-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Leh Airport (11,500 ft) — Mandatory Acclimatisation",
        date: "2026-07-05",
        summary: "Catch an early morning flight from Mumbai (BOM) or Pune (PNQ) to Leh (IXL) over the snow-bound Himalayas. Dedicate the entire first day to strict high-altitude acclimatisation — resting, hydrating, and taking a gentle evening walk around the historic Leh Main Bazaar.",
        activities: [
          {
            _key: "tur1a",
            title: "Morning Flight BOM/PNQ to Leh Kushok Bakula Rimpochee Airport",
            description: "Spectacular aerial landing over the Stok Kangri and Zanskar ranges. Arrive at 3,524 m altitude.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "08:30 AM",
            type: "transport",
            cost: 8500,
            currency: "INR",
            notes: "Diamox (as per doctor advice) and immediate rest are crucial for altitude acclimatisation."
          },
          {
            _key: "tur1b",
            title: "Check-in at Hotel & Mandatory Full Day Rest",
            description: "Lie down, sip hot water, garlic soup, or ginger lemon tea. Do not shower or rush around on Day 1.",
            location: {
              name: "Leh Main Town Hotel",
              lat: 34.1642,
              lng: 77.584
            },
            time: "10:00 AM",
            type: "accommodation",
            cost: 3200,
            currency: "INR",
            notes: "Keep pulse oximeter handy; target SpO2 above 85%."
          },
          {
            _key: "tur1c",
            title: "Gentle Evening Stroll in Leh Main Bazaar & Shanti Stupa View",
            description: "A relaxed flat walk through the pedestrianized stone market lined with Tibetan handicraft stores and organic cafes.",
            location: {
              name: "Leh Main Bazaar",
              lat: 34.1645,
              lng: 77.585
            },
            time: "05:30 PM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Collect Inner Line Permits (ILP) / Protected Area Permits for Nubra & Turtuk from travel agent."
          },
          {
            _key: "tur1d",
            title: "Warm Ladakhi Thukpa Dinner at Tibetan Kitchen",
            description: "Comforting handmade pulled noodle soup with mountain greens and momos.",
            location: {
              name: "Fort Road, Leh",
              lat: 34.162,
              lng: 77.583
            },
            time: "07:30 PM",
            type: "food",
            cost: 450,
            currency: "INR",
            notes: "Light, easily digestible meal recommended during acclimatisation."
          }
        ]
      },
      {
        _key: "tur-day2",
        dayNumber: 2,
        title: "Leh → Khardung La Pass (17,982 ft) → Diskit → Turtuk (205 km)",
        date: "2026-07-06",
        summary: "Drive across the famed Khardung La pass into the Shyok river gorge of Nubra Valley, driving past the Diskit Monastery and military settlements of Thoise to reach Turtuk — nestled right beneath the soaring peaks of Karakoram.",
        activities: [
          {
            _key: "tur2a",
            title: "Ascent to Khardung La Pass Summit (5,359 m / 17,982 ft)",
            description: "Cross one of the highest motorable mountain passes in the world with breathtaking views of the Karakoram range to the north.",
            location: {
              name: "Khardung La Pass Summit",
              lat: 34.2789,
              lng: 77.6045
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Do NOT stay longer than 15-20 minutes at the top to avoid Acute Mountain Sickness (AMS)."
          },
          {
            _key: "tur2b",
            title: "Diskit Giant Maitreya Buddha & Monastery Stop",
            description: "Behold the 106-foot tall colorful statue of Maitreya Buddha overlooking the Nubra-Shyok confluence.",
            location: {
              name: "Diskit Monastery",
              lat: 34.5429,
              lng: 77.5594
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Nubra's oldest monastery dating back to the 14th century."
          },
          {
            _key: "tur2c",
            title: "Drive through Shyok Gorge & Bogdang Checkpost",
            description: "Follow the turquoise Shyok River into the Baltistan frontier, crossing through the traditional village of Bogdang.",
            location: {
              name: "Bogdang Frontier Checkpost",
              lat: 34.6715,
              lng: 77.2185
            },
            time: "02:00 PM",
            type: "transport",
            cost: 0,
            currency: "INR",
            notes: "Army permit verification; checkpost manned by Ladakh Scouts."
          },
          {
            _key: "tur2d",
            title: "Arrive Turtuk (2,900 m) & Check-in at Wooden Balti Homestay",
            description: "Cross the wooden footbridge into Turtuk Farol, greeted by lush apricot orchards and friendly Balti villagers.",
            location: {
              name: "Turtuk Farol Village",
              lat: 34.8467,
              lng: 76.8286
            },
            time: "05:00 PM",
            type: "accommodation",
            cost: 2500,
            currency: "INR",
            notes: "At 2,900 m, Turtuk is noticeably warmer and richer in oxygen than Leh."
          }
        ]
      },
      {
        _key: "tur-day3",
        dayNumber: 3,
        title: "Turtuk Heritage: Yabgo Royal Palace, Natural Cold Storage & Orchards",
        date: "2026-07-07",
        summary: "Spend a magical day exploring the twin villages of Turtuk Farol and Youl — visiting the Yabgo Royal Dynasty Palace Museum, inspecting ancient natural rock refrigerators, wandering through stone-walled apricot groves, and savoring authentic Balti cuisine.",
        activities: [
          {
            _key: "tur3a",
            title: "Yabgo Royal Heritage Palace Museum Tour",
            description: "Guided tour by the reigning descendant of the Yabgo dynasty that ruled Baltistan for over 1,000 years, viewing weapons, armor, and royal robes.",
            location: {
              name: "Yabgo Royal Palace, Turtuk",
              lat: 34.848,
              lng: 76.8305
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 150,
            currency: "INR",
            notes: "The royal house features traditional Tibetan-Persian woodwork and ancestral artifacts."
          },
          {
            _key: "tur3b",
            title: "Ancient Natural Cold Storage (Nangchung)",
            description: "Inspect ingenious hollow stone chambers cooled by subterranean glacial air currents where villagers preserve butter and meat all summer.",
            location: {
              name: "Turtuk Farol Cold Chambers",
              lat: 34.847,
              lng: 76.827
            },
            time: "11:30 AM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Natural geological refrigeration functioning flawlessly for centuries."
          },
          {
            _key: "tur3c",
            title: "Balti Feast: Kissir Buckwheat Pancakes & Muskat Walnut Paste",
            description: "Delight in regional Balti delicacies: fresh Kissir with spicy mint-walnut sauce, dried apricot stew, and homemade herbal tea.",
            location: {
              name: "Balti Kitchen, Turtuk Youl",
              lat: 34.846,
              lng: 76.829
            },
            time: "01:30 PM",
            type: "food",
            cost: 450,
            currency: "INR",
            notes: "Distinct from Ladakhi food; heavily influenced by Central Asian and Persian culinary roots."
          },
          {
            _key: "tur3d",
            title: "Hike to Turtuk Gompa Viewpoint for Sunset over K2 Foothills",
            description: "Climb through barley terraces to the solitary Buddhist monastery perched on a cliff edge with panoramic views into northern Karakoram.",
            location: {
              name: "Turtuk Gompa",
              lat: 34.8495,
              lng: 76.832
            },
            time: "05:30 PM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Spectacular golden hour light over the Shyok river canyon."
          }
        ]
      },
      {
        _key: "tur-day4",
        dayNumber: 4,
        title: "Tyakshi LoC Border Village → Hunder Sand Dunes Camel Safari",
        date: "2026-07-08",
        summary: "Visit Tyakshi and Thang — the absolute last Indian villages on the Line of Control with Pakistan — before driving back to Hunder to experience double-humped Bactrian camel rides amongst the rolling white sand dunes.",
        activities: [
          {
            _key: "tur4a",
            title: "Excursion to Tyakshi & Thang Border Viewpoint (10 km)",
            description: "The northernmost point accessible to tourists in India; stand at the border marker overlooking the village of Phobrang across the LoC.",
            location: {
              name: "Thang Border Post",
              lat: 34.872,
              lng: 76.795
            },
            time: "09:00 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Indian Army post with small canteen serving tea; carry original Aadhaar/passport."
          },
          {
            _key: "tur4b",
            title: "Drive Turtuk to Hunder Desert Oasis (85 km, 2.5 hrs)",
            description: "Retrace the scenic Shyok river valley back towards the white sand dunes of central Nubra.",
            location: {
              name: "Shyok River Road",
              lat: 34.6,
              lng: 77.4
            },
            time: "12:00 PM",
            type: "transport",
            cost: 1500,
            currency: "INR",
            notes: "Stop for quick lunch and fresh seabuckthorn juice at Diskit."
          },
          {
            _key: "tur4c",
            title: "Bactrian Double-Humped Camel Safari at Hunder Dunes",
            description: "Ride shaggy two-humped Bactrian camels — descendants of the ancient Silk Route caravans — across undulating cold desert dunes.",
            location: {
              name: "Hunder Sand Dunes",
              lat: 34.5775,
              lng: 77.4728
            },
            time: "05:00 PM",
            type: "activity",
            cost: 350,
            currency: "INR",
            notes: "Stunning contrast of white sand, green sea-buckthorn bushes, and snow-capped peaks."
          },
          {
            _key: "tur4d",
            title: "Overnight in Luxury Desert Glamping Camp at Hunder",
            description: "Sleep under the stars in deluxe Swiss cottage tents with attached bath and hot water.",
            location: {
              name: "Hunder Valley Camps",
              lat: 34.58,
              lng: 77.47
            },
            time: "07:30 PM",
            type: "accommodation",
            cost: 3500,
            currency: "INR",
            notes: "Buffet dinner with Ladakhi cultural dance performance."
          }
        ]
      },
      {
        _key: "tur-day5",
        dayNumber: 5,
        title: "Hunder → Khardung La → Leh Airport → Mumbai / Pune",
        date: "2026-07-09",
        summary: "Early morning crossing over Khardung La Pass descending directly to Leh Kushok Bakula Rimpochee Airport for your afternoon flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "tur5a",
            title: "Drive Hunder to Khardung La to Leh (125 km, 4.5 hrs)",
            description: "Early 5:30 AM departure to beat pass traffic and ascend over the Karakoram ridge into Leh valley.",
            location: {
              name: "Khardung La Highway",
              lat: 34.2789,
              lng: 77.6045
            },
            time: "05:30 AM",
            type: "transport",
            cost: 2800,
            currency: "INR",
            notes: "Packed breakfast provided by Hunder camp."
          },
          {
            _key: "tur5b",
            title: "Quick Souvenir Stop at Leh Tibetan Market",
            description: "Pick up hand-spun Ladakhi pashmina, organic dried apricots, and turquoise jewelry.",
            location: {
              name: "Leh Tibetan Refugee Market",
              lat: 34.163,
              lng: 77.582
            },
            time: "10:30 AM",
            type: "activity",
            cost: 500,
            currency: "INR",
            notes: "Ensure pashmina has official government GI tag."
          },
          {
            _key: "tur5c",
            title: "Transfer to Leh Kushok Bakula Rimpochee Airport (IXL)",
            description: "Drop at airport terminal for departure.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "11:30 AM",
            type: "transport",
            cost: 400,
            currency: "INR",
            notes: "Strict powerbank and battery check rules apply in baggage."
          },
          {
            _key: "tur5d",
            title: "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            description: "Board afternoon connecting flight back to Mumbai or Pune carrying memories of Baltistan.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "01:00 PM",
            type: "transport",
            cost: 8800,
            currency: "INR",
            notes: "Window seats on the right side offer panoramic Himalayan views."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-basgo-4-days",
    title: "Basgo Royal Citadel & Sham Valley Heritage — 4 Days from Mumbai / Pune (via Leh)",
    slug: "basgo-4-days",
    excerpt: "Discover Ladakh's medieval history on a 4-day trip from Mumbai or Pune centered around the dramatic mud-brick citadel and 16th-century golden Maitreya Buddha of Basgo Gompa. Combine ancient cliffside ruins with Sham Valley highlights: the Indus-Zanskar confluence at Nimmu, Magnetic Hill, and the 1,000-year-old murals of Likir and Alchi.",
    tags: [
      "Himalayas",
      "Ladakh",
      "Heritage",
      "Monasteries",
      "Culture",
      "History",
      "Offbeat",
      "India"
    ],
    country: "India",
    startDate: "2026-07-12",
    endDate: "2026-07-15",
    bestSuggestedMonth: "April – November",
    status: "published",
    viewCount: 0,
    totalBudget: 17500,
    currency: "INR",
    tripType: "Historic Citadel & Monastery Circuit",
    readingTime: 8,
    _createdAt: "2026-08-28T00:00:00Z",
    _updatedAt: "2026-08-28T00:00:00Z",
    itinerary: [
      {
        _key: "bas-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Leh Airport → Acclimatisation & Spituk Gompa",
        date: "2026-07-12",
        summary: "Arrive in Leh from Mumbai or Pune. Spend the day gently acclimatising to the thin mountain air at 11,500 ft, followed by a relaxed late-afternoon visit to the 11th-century cliff-top Spituk Monastery overlooking the Indus River.",
        activities: [
          {
            _key: "bas1a",
            title: "Morning Flight BOM/PNQ to Leh Airport",
            description: "Scenic trans-Himalayan flight landing in Leh. Transfer to hotel for mandatory acclimatisation rest.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "08:30 AM",
            type: "transport",
            cost: 8200,
            currency: "INR",
            notes: "Rest completely for first 6 hours; drink plenty of water with ORS."
          },
          {
            _key: "bas1b",
            title: "Spituk Gompa (Maryul Monastery) & Kali Mata Temple",
            description: "Visit the Gelugpa monastery founded by Od-de in the 11th century, perched dramatically atop an isolated hillock.",
            location: {
              name: "Spituk Monastery",
              lat: 34.1294,
              lng: 77.5258
            },
            time: "04:30 PM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Houses ancient thangkas and an iconic temple dedicated to Goddess Mahakali."
          },
          {
            _key: "bas1c",
            title: "Twilight View from Shanti Stupa",
            description: "Watch the sun sink behind the Zanskar range, illuminating the Leh Valley and Stok Kangri peak in golden light.",
            location: {
              name: "Shanti Stupa, Leh",
              lat: 34.167,
              lng: 77.575
            },
            time: "06:30 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Drive directly up to the top car park to avoid climbing steps on Day 1."
          },
          {
            _key: "bas1d",
            title: "Traditional Ladakhi Skyu & Mok-Mok Dinner",
            description: "Savor Skyu (traditional pasta stew cooked with root vegetables and dried yak cheese) at a heritage restaurant.",
            location: {
              name: "Leh Heritage Kitchen",
              lat: 34.164,
              lng: 77.584
            },
            time: "07:30 PM",
            type: "food",
            cost: 400,
            currency: "INR",
            notes: "Wholesome, slow-cooked indigenous comfort food."
          }
        ]
      },
      {
        _key: "bas-day2",
        dayNumber: 2,
        title: "Magnetic Hill → Sangam Confluence → Basgo Royal Citadel & Maitreya Temples",
        date: "2026-07-13",
        summary: "Drive west down the Indus Highway past the optical illusion of Magnetic Hill and the dramatic confluence of the Indus and Zanskar rivers, ascending to the medieval royal mud-brick citadel and 16th-century golden Maitreya Buddha temples of Basgo.",
        activities: [
          {
            _key: "bas2a",
            title: "Magnetic Hill Gravity Phenomenon Stop",
            description: "Witness vehicles appearing to roll uphill against gravity on this famous stretch of the Leh-Srinagar Highway.",
            location: {
              name: "Magnetic Hill",
              lat: 34.1844,
              lng: 77.3512
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Natural optical illusion created by the surrounding horizon topography."
          },
          {
            _key: "bas2b",
            title: "Indus & Zanskar River Confluence (Sangam) at Nimmu",
            description: "Stand atop the cliff overlooking the breathtaking meeting of emerald green Indus and mud-brown Zanskar waters.",
            location: {
              name: "Indus-Zanskar Sangam, Nimmu",
              lat: 34.1648,
              lng: 77.3298
            },
            time: "10:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "World Famous river viewpoint; optional flat-water rafting launch site."
          },
          {
            _key: "bas2c",
            title: "Basgo Citadel & Chamba Lhakhang (Maitreya Temple)",
            description: "Explore the UNESCO World Monuments Watch-listed 15th-century mud-brick ruins perched precariously on sheer red clay cliffs.",
            location: {
              name: "Basgo Citadel & Gompa",
              lat: 34.2183,
              lng: 77.2844
            },
            time: "12:00 PM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "Marvel at the giant two-storey gilded copper statue of Maitreya Buddha built in 1553 AD by King Tsewang Namgyal."
          },
          {
            _key: "bas2d",
            title: "Heritage Farmstay Check-in & Apricot Garden Walk at Basgo",
            description: "Unwind at a tranquil rural farmstay surrounded by organic barley terraces, apple orchards, and irrigation channels.",
            location: {
              name: "Basgo Village Farmstay",
              lat: 34.217,
              lng: 77.283
            },
            time: "03:30 PM",
            type: "accommodation",
            cost: 2200,
            currency: "INR",
            notes: "Experience village life far away from commercial tourist circuits."
          }
        ]
      },
      {
        _key: "bas-day3",
        dayNumber: 3,
        title: "Basgo → Likir Monastery Giant Buddha → 11th-Century Alchi Choskor",
        date: "2026-07-14",
        summary: "Continue through the Lower Sham Valley to Likir Gompa to view its 75-foot outdoor Maitreya Buddha statue, before visiting the legendary Alchi Choskor — Ladakh's oldest monastic jewel renowned for world-famous Kashmiri-style Buddhist frescoes from the 11th century.",
        activities: [
          {
            _key: "bas3a",
            title: "Likir Gompa & 75-Foot Outdoor Maitreya Buddha",
            description: "Explore the picturesque 11th-century monastery housing valuable manuscripts, thangkas, and a prominent open-air Buddha statue.",
            location: {
              name: "Likir Monastery",
              lat: 34.2933,
              lng: 77.215
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Founded by Lama Duwang Ngawang under King Lhachen Gyalpo."
          },
          {
            _key: "bas3b",
            title: "Alchi Choskor Monastic Complex (10th-11th Century)",
            description: "Unlike high mountain monasteries, Alchi is built on flat ground by the Indus and houses the greatest surviving Kashmiri Buddhist wood carvings and wall frescoes.",
            location: {
              name: "Alchi Monastery",
              lat: 34.2239,
              lng: 77.175
            },
            time: "12:00 PM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "Photography strictly forbidden inside temples to preserve delicate natural pigments."
          },
          {
            _key: "bas3c",
            title: "Garden Lunch at Alchi Apricot Tree Courtyard",
            description: "Dine under shaded apricot trees enjoying hot momos, tingmo steamed bread, and mint tea.",
            location: {
              name: "Alchi Garden Restaurant",
              lat: 34.223,
              lng: 77.174
            },
            time: "01:30 PM",
            type: "food",
            cost: 350,
            currency: "INR",
            notes: "Organic salad and fresh mountain juices."
          },
          {
            _key: "bas3d",
            title: "Return Drive to Leh & Farewell Dinner",
            description: "Smooth 65 km drive back to Leh along the Indus river; evening souvenir shopping.",
            location: {
              name: "Leh City Centre",
              lat: 34.1642,
              lng: 77.584
            },
            time: "05:30 PM",
            type: "accommodation",
            cost: 2800,
            currency: "INR",
            notes: "Overnight in Leh ahead of early morning flight."
          }
        ]
      },
      {
        _key: "bas-day4",
        dayNumber: 4,
        title: "Leh Market Souvenirs → Leh Airport → Mumbai / Pune",
        date: "2026-07-15",
        summary: "Pick up hand-carved prayer wheels, butter tea cups, and roasted barley tsampa in Leh market before transferring to the airport for your flight home to Mumbai or Pune.",
        activities: [
          {
            _key: "bas4a",
            title: "Morning Visit to Central Asian Museum, Leh",
            description: "A 4-storey stone-and-wood tower museum tracing the historical Silk Route caravans connecting Yarkand, Tibet, and Kashmir.",
            location: {
              name: "Central Asian Museum",
              lat: 34.164,
              lng: 77.586
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Located behind the historic Jama Masjid in Old Leh."
          },
          {
            _key: "bas4b",
            title: "Transfer to Leh Kushok Bakula Rimpochee Airport (IXL)",
            description: "Short 15-minute drive to the departure terminal.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "10:30 AM",
            type: "transport",
            cost: 400,
            currency: "INR",
            notes: "Ensure checked baggage conforms to airline weight limits."
          },
          {
            _key: "bas4c",
            title: "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            description: "Board direct or one-stop flight home with memories of ancient Ladakhi fortresses.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "12:30 PM",
            type: "transport",
            cost: 8200,
            currency: "INR",
            notes: "Fly over the magnificent Pir Panjal and Shivalik ranges."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-chumathang-4-days",
    title: "Chumathang Geothermal Hot Springs & Indus Valley — 4 Days from Mumbai / Pune",
    slug: "chumathang-4-days",
    excerpt: "Journey from Mumbai or Pune into the wild southeastern Indus gorge to Chumathang — famed for its bubbling geothermal sulfur hot springs steaming right on the icy riverbanks at 13,000 ft. A gateway to the high Changthang plateau, Chumathang offers natural healing thermal baths, ancient Tibetan settlements, and unforgettable stargazing.",
    tags: [
      "Himalayas",
      "Ladakh",
      "Hot Springs",
      "Offbeat",
      "Nature",
      "High Altitude",
      "River",
      "India"
    ],
    country: "India",
    startDate: "2026-07-18",
    endDate: "2026-07-21",
    bestSuggestedMonth: "May – October",
    status: "published",
    viewCount: 0,
    totalBudget: 18500,
    currency: "INR",
    tripType: "Geothermal Springs & Frontier Expedition",
    readingTime: 8,
    _createdAt: "2026-08-28T00:00:00Z",
    _updatedAt: "2026-08-28T00:00:00Z",
    itinerary: [
      {
        _key: "chu-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Leh Airport → Acclimatisation & Thiksey Monastery",
        date: "2026-07-18",
        summary: "Arrive at Leh Airport from Mumbai or Pune. Rest during the morning for essential altitude adaptation, then enjoy a serene late afternoon visit to Thiksey Monastery, styled after Lhasa's Potala Palace.",
        activities: [
          {
            _key: "chu1a",
            title: "Morning Flight BOM/PNQ to Leh Kushok Bakula Rimpochee Airport",
            description: "Morning touchdown in Ladakh at 3,524 m. Transfer to hotel for mandatory acclimatisation.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "08:30 AM",
            type: "transport",
            cost: 8200,
            currency: "INR",
            notes: "Avoid alcohol, smoking, and sudden exertion on Day 1."
          },
          {
            _key: "chu1b",
            title: "Afternoon Excursion to Thiksey Monastery (19 km)",
            description: "Visit the 12-storey whitewashed Gompa complex featuring the revered 49-foot Maitreya Buddha statue installed by the 14th Dalai Lama.",
            location: {
              name: "Thiksey Monastery",
              lat: 34.0583,
              lng: 77.6667
            },
            time: "03:30 PM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Catch the monks blowing traditional conch shells and Dungchen brass horns."
          },
          {
            _key: "chu1c",
            title: "Evening Acclimatisation Rest & Garlic Broth Dinner",
            description: "Warm homemade garlic soup and steamed vegetable momos to promote blood oxygenation.",
            location: {
              name: "Leh Town Restaurant",
              lat: 34.164,
              lng: 77.584
            },
            time: "07:30 PM",
            type: "food",
            cost: 380,
            currency: "INR",
            notes: "Early sleep recommended before heading into Changthang."
          }
        ]
      },
      {
        _key: "chu-day2",
        dayNumber: 2,
        title: "Leh → Upshi → Kiari → Chumathang Geothermal Hot Springs (140 km)",
        date: "2026-07-19",
        summary: "Embark on an extraordinary road journey following the turquoise Indus River through deep multicolored granite canyons, passing Upshi and Kiari Tibetan settlement to reach the steaming riverbanks of Chumathang at 3,950 m (13,000 ft).",
        activities: [
          {
            _key: "chu2a",
            title: "Drive Leh along the Indus to Upshi & Kiari (100 km)",
            description: "Spectacular highway carving through sheer canyon walls of purple, orange, and emerald slate along the Indus.",
            location: {
              name: "Upshi Indus Gorge",
              lat: 33.8306,
              lng: 77.8183
            },
            time: "08:30 AM",
            type: "transport",
            cost: 2000,
            currency: "INR",
            notes: "Checkpost at Upshi; foreign nationals require Inner Line Permit (ILP)."
          },
          {
            _key: "chu2b",
            title: "Chumathang Geothermal Vents & River Steam Phenomenon",
            description: "Arrive at Chumathang where boiling sulfur springs (over 85°C) bubble vigorously from cracks along the freezing Indus riverbed.",
            location: {
              name: "Chumathang Geothermal Hot Springs",
              lat: 33.3592,
              lng: 78.3458
            },
            time: "12:30 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "The stark contrast of boiling volcanic steam and ice-cold river waters is unique in the Himalayas."
          },
          {
            _key: "chu2c",
            title: "Natural Geothermal Mineral Bath & Relaxing Soak",
            description: "Immerse in private indoor thermal spring baths fed directly by the mineral-rich sulfur waters, known for curing joint pain and fatigue.",
            location: {
              name: "Chumathang Hot Spring Resort Baths",
              lat: 33.36,
              lng: 78.346
            },
            time: "03:00 PM",
            type: "activity",
            cost: 250,
            currency: "INR",
            notes: "Water is naturally heated by deep tectonic faults."
          },
          {
            _key: "chu2d",
            title: "Geothermally Cooked Eggs & Ladakhi Dinner",
            description: "Watch locals boil eggs and potatoes in small mesh bags directly dipped into the boiling roadside steam vent.",
            location: {
              name: "Chumathang Springs Dhaba",
              lat: 33.359,
              lng: 78.3455
            },
            time: "07:30 PM",
            type: "food",
            cost: 300,
            currency: "INR",
            notes: "Eggs boil perfectly in 7 minutes in the natural boiling spring!"
          }
        ]
      },
      {
        _key: "chu-day3",
        dayNumber: 3,
        title: "Chumathang Village Walk & Mahe Gorge Gateway Excursion",
        date: "2026-07-20",
        summary: "Walk through the high-altitude barley terraces of Chumathang village, visit the hilltop Gompa, take an excursion to the sheer cliffs of Mahe Bridge (gateway to Tso Moriri), before enjoying an evening of stargazing under Bortle Class 1 dark skies.",
        activities: [
          {
            _key: "chu3a",
            title: "Chumathang Hilltop Gompa & Village Trail",
            description: "Climb the rocky promontory above the village to visit the peaceful Buddhist shrine adorned with wind-whipped prayer flags.",
            location: {
              name: "Chumathang Gompa",
              lat: 33.362,
              lng: 78.348
            },
            time: "09:00 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Offers a sweeping panoramic vista of the steaming Indus river bend."
          },
          {
            _key: "chu3b",
            title: "Excursion to Mahe Bridge & Indus Canyon (25 km)",
            description: "Drive down to the military checkpoint at Mahe Bridge, where roads branch south toward Tso Moriri and east toward Nyoma and Hanle.",
            location: {
              name: "Mahe Bridge, Ladakh",
              lat: 33.275,
              lng: 78.508
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Dramatic geological strata formations and soaring golden eagle nesting cliffs."
          },
          {
            _key: "chu3c",
            title: "Riverside Dhaba Lunch with Butter Tea & Tingmo",
            description: "Enjoy hot steamed tingmo bread served with spicy vegetable curry and churned salty butter tea (gur-gur chai).",
            location: {
              name: "Kiari Tibetan Roadside Eatery",
              lat: 33.682,
              lng: 78.105
            },
            time: "02:00 PM",
            type: "food",
            cost: 250,
            currency: "INR",
            notes: "Warm, hearty nomadic staple foods."
          },
          {
            _key: "chu3d",
            title: "Dark Sky Stargazing over the Steaming Indus",
            description: "Observe the glowing arc of the Milky Way reflected on steam plumes rising from the river under crystal black skies.",
            location: {
              name: "Chumathang River Ridge",
              lat: 33.3592,
              lng: 78.3458
            },
            time: "09:30 PM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Uninhibited cosmic views free of city light pollution."
          }
        ]
      },
      {
        _key: "chu-day4",
        dayNumber: 4,
        title: "Chumathang → Indus Valley Return → Leh Airport → Mumbai / Pune",
        date: "2026-07-21",
        summary: "Early morning scenic return drive following the Indus downstream to Leh Kushok Bakula Rimpochee Airport for your return flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "chu4a",
            title: "Early Morning Return Drive along Indus Gorge (140 km, 3.5 hrs)",
            description: "Watch morning shadows play across the towering canyon walls as you head back towards Leh.",
            location: {
              name: "Indus Highway",
              lat: 33.8306,
              lng: 77.8183
            },
            time: "06:00 AM",
            type: "transport",
            cost: 2200,
            currency: "INR",
            notes: "Early start ensures comfortable check-in at Leh Airport."
          },
          {
            _key: "chu4b",
            title: "Quick Breakfast & Chai Stop at Karu Junction",
            description: "Fuel up on hot aloo parathas and ginger chai at the major highway junction connecting Pangong and Manali roads.",
            location: {
              name: "Karu Junction",
              lat: 33.9214,
              lng: 77.7472
            },
            time: "08:30 AM",
            type: "food",
            cost: 150,
            currency: "INR",
            notes: "Convenient rest stop with ATM and restrooms."
          },
          {
            _key: "chu4c",
            title: "Drop at Leh Airport & Return Flight to BOM / PNQ",
            description: "Board afternoon connecting flight back to Mumbai or Pune carrying memories of high-altitude hot springs.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "10:30 AM",
            type: "transport",
            cost: 8500,
            currency: "INR",
            notes: "Window seats provide dramatic aerial views of the Ladakh range."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-hanle-5-days",
    title: "Hanle Dark-Sky Reserve & Astronomical Observatory — 5 Days from Mumbai / Pune",
    slug: "hanle-5-days",
    excerpt: "The ultimate celestial pilgrimage from Mumbai or Pune to India's first designated Dark-Sky Reserve at Hanle (14,760 ft) in the remote Changthang plateau. Stand under the clearest night skies on Earth, visit the world's highest optical observatory on Mt. Saraswati, explore the 17th-century Hanle Gompa, and encounter Tibetan wild asses (Kiang) roaming across infinite Himalayan plains.",
    tags: [
      "Himalayas",
      "Ladakh",
      "Dark Sky",
      "Astrophotography",
      "High Altitude",
      "Remote",
      "Wildlife",
      "India"
    ],
    country: "India",
    startDate: "2026-07-25",
    endDate: "2026-07-29",
    bestSuggestedMonth: "May – October (New Moon week best for astronomy)",
    status: "published",
    viewCount: 0,
    totalBudget: 28500,
    currency: "INR",
    tripType: "Dark-Sky Astronomy & High-Altitude Safari",
    readingTime: 10,
    _createdAt: "2026-08-28T00:00:00Z",
    _updatedAt: "2026-08-28T00:00:00Z",
    itinerary: [
      {
        _key: "han-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Leh Airport (11,500 ft) — Mandatory Acclimatisation & Permits",
        date: "2026-07-25",
        summary: "Take an early morning flight from Mumbai (BOM) or Pune (PNQ) to Leh (IXL). Spend the day strictly resting to acclimatise to the altitude, while collecting your mandatory Protected Area Permits (PAP) for Hanle and the remote Changthang frontier.",
        activities: [
          {
            _key: "han1a",
            title: "Morning Flight BOM/PNQ to Leh Kushok Bakula Rimpochee Airport",
            description: "Touch down in Ladakh at 3,524 m. Check in to your hotel for mandatory full-day rest.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "08:30 AM",
            type: "transport",
            cost: 8500,
            currency: "INR",
            notes: "Hanle sits at 4,500 m (14,760 ft); adequate acclimatisation in Leh is vital."
          },
          {
            _key: "han1b",
            title: "Inner Line Permit & Hanle Protected Area Endorsement",
            description: "Collect your official DC Office permit endorsing Hanle, Loma, and Nyoma sectors.",
            location: {
              name: "DC Office, Leh",
              lat: 34.161,
              lng: 77.58
            },
            time: "11:30 AM",
            type: "activity",
            cost: 650,
            currency: "INR",
            notes: "Carry 5 physical photocopies of permit and Aadhaar/passport for army checkposts."
          },
          {
            _key: "han1c",
            title: "Leh Market Sunset Walk & Battery Gear Check",
            description: "Test your camera gear, tripods, extra lithium batteries (cold drains batteries fast), and red-light headlamps required for Dark Sky Reserve.",
            location: {
              name: "Leh Main Bazaar",
              lat: 34.1645,
              lng: 77.585
            },
            time: "05:30 PM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Red light headlamps preserve night vision and are strictly required in Hanle."
          },
          {
            _key: "han1d",
            title: "High-Protein Ladakhi Dinner",
            description: "Warm bowl of vegetable and cheese thenthuk with steamed momos.",
            location: {
              name: "Leh Tibetan Kitchen",
              lat: 34.164,
              lng: 77.584
            },
            time: "07:30 PM",
            type: "food",
            cost: 450,
            currency: "INR",
            notes: "Hydrate with at least 3-4 litres of water throughout the day."
          }
        ]
      },
      {
        _key: "han-day2",
        dayNumber: 2,
        title: "Leh → Chumathang → Loma Bridge Checkpost → Hanle (255 km, 7–8 hrs)",
        date: "2026-07-26",
        summary: "An epic high-altitude drive tracing the Indus upstream through Chumathang to the military bridge at Loma, entering the sprawling Changthang plateau basin to reach Hanle (14,760 ft) before sunset for your first night of naked-eye cosmic stargazing.",
        activities: [
          {
            _key: "han2a",
            title: "Early Departure via Upshi & Chumathang (140 km)",
            description: "Scenic drive through Indus canyons; quick morning stop at the steaming hot springs of Chumathang.",
            location: {
              name: "Chumathang Hot Springs",
              lat: 33.3592,
              lng: 78.3458
            },
            time: "06:30 AM",
            type: "transport",
            cost: 3500,
            currency: "INR",
            notes: "Stop for hot tea and aloo paratha at Chumathang."
          },
          {
            _key: "han2b",
            title: "Loma Checkpost Border Registration & Nyoma",
            description: "Present Hanle permits at Loma Bridge, crossing into the restricted Changthang military zone.",
            location: {
              name: "Loma Bridge Checkpost",
              lat: 33.161,
              lng: 78.825
            },
            time: "12:30 PM",
            type: "transport",
            cost: 0,
            currency: "INR",
            notes: "Indian Army strictly inspects IDs; foreign tourists need special approvals."
          },
          {
            _key: "han2c",
            title: "Arrival at Hanle (4,500 m / 14,760 ft) & Homestay Check-in",
            description: "Enter the vast, golden Hanle marshland plain ringed by barren mountain crags. Settle into a local Ladakhi homestay.",
            location: {
              name: "Hanle Village Homestay",
              lat: 32.775,
              lng: 78.97
            },
            time: "03:30 PM",
            type: "accommodation",
            cost: 2600,
            currency: "INR",
            notes: "Bukhari wood/gas heating in rooms; oxygen cylinder available at homestay if required."
          },
          {
            _key: "han2d",
            title: "Night 1: Dark-Sky Observation & Milky Way Core Alignment",
            description: "Step out under India's darkest skies (Bortle Class 1). Witness billions of stars, the sprawling Milky Way arm, and the Andromeda Galaxy visible with the naked eye.",
            location: {
              name: "Hanle Dark Sky Reserve Plains",
              lat: 32.7794,
              lng: 78.9642
            },
            time: "09:30 PM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Night temperatures frequently dip below 0°C even in summer; thermal layers, windcheater, and gloves mandatory."
          }
        ]
      },
      {
        _key: "han-day3",
        dayNumber: 3,
        title: "Indian Astronomical Observatory (Mt. Saraswati) & 17th-Century Hanle Gompa",
        date: "2026-07-27",
        summary: "Ascend Mt. Saraswati to visit the Indian Astronomical Observatory — the world's highest optical observatory operated by the Indian Institute of Astrophysics — followed by the historic 17th-century Hanle Monastery perched atop a solitary rocky hill.",
        activities: [
          {
            _key: "han3a",
            title: "Indian Astronomical Observatory (IAO) Tour (Mt. Saraswati)",
            description: "Ascend the winding peak to 4,500 m to view the 2-metre optical-infrared Himalayan Chandra Telescope (HCT) remotely controlled from Bengaluru.",
            location: {
              name: "Indian Astronomical Observatory, Hanle",
              lat: 32.7794,
              lng: 78.9642
            },
            time: "10:00 AM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "Learn about MACE (Major Atmospheric Cherenkov Experiment) gamma ray telescope installed nearby."
          },
          {
            _key: "han3b",
            title: "Traditional Nomadic Lunch at Hanle Homestay",
            description: "Home-cooked meal of fresh Khambir bread, barley soup, potato sabzi, and hot butter tea prepared by the host family.",
            location: {
              name: "Hanle Homestay Kitchen",
              lat: 32.775,
              lng: 78.97
            },
            time: "01:30 PM",
            type: "food",
            cost: 350,
            currency: "INR",
            notes: "Warm Changpa hospitality in a traditional carpeted dining room."
          },
          {
            _key: "han3c",
            title: "Hanle Gompa (17th-Century Drukpa Kagyu Monastery)",
            description: "Explore the historic monastery built under King Sengge Namgyal in the 17th century, commanding a panoramic view of the entire Hanle basin.",
            location: {
              name: "Hanle Monastery",
              lat: 32.7725,
              lng: 78.9767
            },
            time: "04:00 PM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Houses ancient scriptures, thangkas, and a serene inner sanctum."
          },
          {
            _key: "han3d",
            title: "Night 2: Deep-Sky Astrophotography & Stargazing Workshop",
            description: "Set up tripods for long-exposure wide-field astrophotography of the Galactic Centre, Airglow, and Zodiacal Light.",
            location: {
              name: "Mt. Saraswati Base",
              lat: 32.778,
              lng: 78.963
            },
            time: "10:00 PM",
            type: "activity",
            cost: 500,
            currency: "INR",
            notes: "Use fast f/1.8–f/2.8 wide lenses with ISO 3200–6400 for stunning 20-second exposures."
          }
        ]
      },
      {
        _key: "han-day4",
        dayNumber: 4,
        title: "Hanle Basin Wildlife Safari (Kiang & Cranes) → Nyoma → Leh Return",
        date: "2026-07-28",
        summary: "Take a sunrise wildlife drive across the wetlands spotting wild Tibetan Ass (Kiang) and rare Black-necked Cranes, before embarking on the scenic return drive via Nyoma and Upshi back to Leh.",
        activities: [
          {
            _key: "han4a",
            title: "Dawn Safari across Hanle Plains & Wetlands",
            description: "Spot herds of Kiang (Equus kiang) galloping across the steppe, migratory Black-necked Cranes, and bar-headed geese in the marshes.",
            location: {
              name: "Hanle Wetlands",
              lat: 32.79,
              lng: 78.95
            },
            time: "06:00 AM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "The Black-necked Crane is the revered state bird of Ladakh."
          },
          {
            _key: "han4b",
            title: "Scenic Return Drive: Hanle → Loma → Nyoma → Upshi (255 km)",
            description: "Follow the Indus valley back towards central Ladakh, stopping for tea along the riverbank.",
            location: {
              name: "Nyoma Indus Highway",
              lat: 33.195,
              lng: 78.67
            },
            time: "08:30 AM",
            type: "transport",
            cost: 3500,
            currency: "INR",
            notes: "Road is predominantly well-paved Border Roads Organisation (BRO) highway."
          },
          {
            _key: "han4c",
            title: "Lunch Stop at Chumathang Hot Springs Dhaba",
            description: "Warm bowl of Thukpa and momos by the riverside before the final leg into Leh.",
            location: {
              name: "Chumathang Springs",
              lat: 33.3592,
              lng: 78.3458
            },
            time: "01:00 PM",
            type: "food",
            cost: 300,
            currency: "INR",
            notes: "Quick mineral leg soak available during lunch break."
          },
          {
            _key: "han4d",
            title: "Arrive in Leh & Celebration Dinner",
            description: "Check in to Leh hotel and celebrate completing one of India's most remote expeditions with Kashmiri Wazwan or continental pizza.",
            location: {
              name: "Bon Appetit, Leh",
              lat: 34.1615,
              lng: 77.581
            },
            time: "07:30 PM",
            type: "food",
            cost: 750,
            currency: "INR",
            notes: "Charming apple orchard setting with outdoor terrace."
          }
        ]
      },
      {
        _key: "han-day5",
        dayNumber: 5,
        title: "Leh Airport → Return Flight to Mumbai / Pune",
        date: "2026-07-29",
        summary: "Transfer to Leh Kushok Bakula Rimpochee Airport for your morning return flight back to Mumbai or Pune carrying extraordinary cosmic memories of India's highest starry frontier.",
        activities: [
          {
            _key: "han5a",
            title: "Transfer to Leh Kushok Bakula Rimpochee Airport (IXL)",
            description: "Short 15-minute cab ride to the terminal for check-in.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "08:30 AM",
            type: "transport",
            cost: 400,
            currency: "INR",
            notes: "Arrive 2 hours prior to scheduled departure."
          },
          {
            _key: "han5b",
            title: "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            description: "Fly back home over the majestic Greater Himalayas, carrying memories of the starlit skies of Hanle.",
            location: {
              name: "Leh Kushok Bakula Rimpochee Airport",
              lat: 34.1359,
              lng: 77.5465
            },
            time: "10:30 AM",
            type: "transport",
            cost: 8500,
            currency: "INR",
            notes: "Direct or connecting flight back to Mumbai or Pune."
          }
        ]
      }
    ]
  },

];
