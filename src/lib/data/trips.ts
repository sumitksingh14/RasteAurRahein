import type { Trip } from "../types";

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

  // ─────────────────────────────────────────────────────────────────────────
  // MAHARASHTRA & GOA — OFFBEAT DESTINATIONS (8 trips)
  // ─────────────────────────────────────────────────────────────────────────

  // 1. VELAS — Olive Ridley turtle nesting village
  {
    _id: "trip-velas-turtle-festival",
    title: "Velas — Olive Ridley Turtle Festival on the Konkan Coast",
    slug: "velas-turtle-festival-konkan",
    excerpt:
      "A 2-night Konkan escape to Velas, a sleepy fishing village south of Shrivardhan, where Olive Ridley sea turtles nest on a pristine beach every February–March. The Kasav Mahotsav (Turtle Festival) is one of India's most heartwarming wildlife experiences — watch hatchlings waddle to the sea at dawn.",
    tags: ["Wildlife", "Konkan", "Maharashtra", "Beach", "Nature", "Offbeat", "Weekend Getaway", "Turtle"],
    country: "India",
    startDate: "2027-02-20",
    endDate: "2027-02-22",
    bestSuggestedMonth: "February – March (Turtle Nesting Season)",
    status: "published",
    viewCount: 0,
    totalBudget: 8000,
    currency: "INR",
    tripType: "Nature & Wildlife",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "velas-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Velas — Arrival & Beach Evening",
        date: "2027-02-20",
        summary: "Drive the Konkan coast to Velas village. Settle into a homestay, walk the nesting beach at twilight, and enjoy a fresh Malvani seafood dinner by the sea.",
        activities: [
          {
            _key: "velas1a",
            title: "Depart Mumbai/Pune — Route via NH-66",
            description: "From Mumbai: NH-66 via Alibaug ferry or Kashid–Murud road (~210 km, 5 hrs). From Pune: NH-48 → Tamhini Ghat → Mahad → Shrivardhan → Velas (~200 km, 5.5 hrs). The Tamhini Ghat route is spectacular in winter — misty valleys and gurgling streams.",
            location: { name: "Mumbai/Pune", lat: 19.0760, lng: 72.8777 },
            time: "06:00 AM",
            type: "transport",
            notes: "Booking Mandwa ferry from Gateway of India cuts 1.5 hrs off Mumbai route. Book ferry at makemytrip.com or Maharashtra Tourism.",
          },
          {
            _key: "velas1b",
            title: "Lunch at Rajapuri / Shrivardhan",
            description: "Stop at a Malvani dhaba near Shrivardhan — Sol Kadhi (coconut-kokum drink), Surmai fry, and Kombdi Vade (spiced chicken with fried bread). Best dhabas: Hotel Atithi, Shrivardhan.",
            location: { name: "Shrivardhan", lat: 18.0386, lng: 73.0166 },
            time: "12:30 PM",
            type: "food",
            notes: "Sol Kadhi is a must — it aids digestion and cools the body in coastal heat.",
          },
          {
            _key: "velas1c",
            title: "Check-in at Velas Homestay",
            description: "Velas has no hotels — accommodation is exclusively in village homestays managed by the Sahyadri Nisarga Mitra conservation group. Rooms are simple, clean, and include home-cooked Malvani meals.",
            location: { name: "Velas Village", lat: 17.9707, lng: 73.1084 },
            time: "03:00 PM",
            type: "accommodation",
            notes: "Book exclusively via Sahyadri Nisarga Mitra: +91-99210-21786. Rates ~₹1,500 pp/night including meals. Book 4–6 weeks ahead in turtle season.",
          },
          {
            _key: "velas1d",
            title: "Velas Beach Sunset Walk",
            description: "The 2 km pristine beach is flanked by casuarina groves. At dusk, watch local fishermen haul in nets. Look out for marked nesting sites — each one is protected by village volunteers.",
            location: { name: "Velas Beach", lat: 17.9661, lng: 73.1006 },
            time: "05:30 PM",
            type: "sightseeing",
          },
          {
            _key: "velas1e",
            title: "Malvani Dinner at Homestay",
            description: "Home-cooked Malvani thali: rice, sol kadhi, prawns in coconut curry, Bombil (Bombay duck) fry, bhakri, and solkadhi. Hosts often share stories of conservation work over dinner.",
            time: "07:30 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "velas-day2",
        dayNumber: 2,
        title: "Dawn Turtle Watch — Hatchling Release & Village Life",
        date: "2027-02-21",
        summary: "The highlight: a 5 AM walk to the beach where Sahyadri Nisarga Mitra volunteers have been up all night protecting nests. Watch hatchlings — dozens of tiny turtles — scramble to the sea. One of India's most moving wildlife moments.",
        activities: [
          {
            _key: "velas2a",
            title: "Pre-Dawn Walk to Nesting Beach (5 AM)",
            description: "A volunteer guide leads a torch-lit walk to nesting sites. Olive Ridley turtles weigh ~45 kg and nest between January and March. Hatchlings emerge at 47–51 days after laying. You may witness a simultaneous release of 50–100 hatchlings.",
            location: { name: "Velas Turtle Beach", lat: 17.9661, lng: 73.1006 },
            time: "05:00 AM",
            type: "activity",
            notes: "No flash photography near hatchlings — it disorients them. Red-tinted torches only.",
          },
          {
            _key: "velas2b",
            title: "Village Walk — Ganapati Temples & Traditional Houses",
            description: "Velas has 11 Ganapati temples, earning it the name 'Ganeshacha Velas'. The century-old Konkani houses with terracotta-tiled roofs and carved wooden pillars are extraordinarily well-preserved.",
            location: { name: "Velas Village", lat: 17.9707, lng: 73.1084 },
            time: "08:00 AM",
            type: "sightseeing",
          },
          {
            _key: "velas2c",
            title: "Breakfast — Upma, Kanda Poha & Kokum Sherbet",
            description: "Traditional Konkan breakfast at the homestay — home-made upma, poha with fresh coconut, and a glass of kokum sherbet to start the day.",
            time: "09:00 AM",
            type: "food",
          },
          {
            _key: "velas2d",
            title: "Harihareshwar Temple & Beach (20 km side trip)",
            description: "A scenic 20 km coastal drive to Harihareshwar — the 'Dakshin Kashi' shrine set dramatically on a rocky promontory with black-sand beaches and crashing waves. Avoid during peak Hindu festivals.",
            location: { name: "Harihareshwar Temple", lat: 17.9820, lng: 73.0194 },
            time: "11:00 AM",
            type: "sightseeing",
          },
          {
            _key: "velas2e",
            title: "Lunch — Malvani Seafood at Harihareshwar",
            description: "Surmai (King Fish) thali, Tisre (clam) curry, and crab masala at Hotel Atithi near Harihareshwar beach. Budget ~₹400–600 pp.",
            location: { name: "Harihareshwar", lat: 17.9820, lng: 73.0194 },
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "velas2f",
            title: "Afternoon — Relax on Velas Beach",
            description: "The beach is completely deserted in the afternoons — ideal for swimming (safe, gentle waves), beach yoga, or simply napping under a casuarina tree.",
            time: "03:30 PM",
            type: "activity",
          },
          {
            _key: "velas2g",
            title: "Dinner & Overnight at Homestay",
            description: "Coconut prawn curry, steamed rice, and a dessert of Aamboli (coconut-rice pancakes) with jaggery — a true Malvani feast.",
            time: "07:30 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "velas-day3",
        dayNumber: 3,
        title: "Return — Via Diveagar Beach & Kashid",
        date: "2027-02-22",
        summary: "Leisurely morning, a final beach walk, then return via Diveagar (another pristine Konkan beach) and the scenic coastal road through Kashid. Reach Mumbai/Pune by evening.",
        activities: [
          {
            _key: "velas3a",
            title: "Final Morning Turtle Watch (Optional)",
            description: "Volunteers are out each morning during nesting season. A second morning watch often yields sightings if the first night was quiet.",
            time: "05:30 AM",
            type: "activity",
          },
          {
            _key: "velas3b",
            title: "Check-out & Drive to Diveagar Beach (15 km)",
            description: "A pristine, uncrowded beach with golden sand — good for a final swim and fresh coconut water before the drive home.",
            location: { name: "Diveagar Beach", lat: 18.0166, lng: 73.0480 },
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "velas3c",
            title: "Return Drive to Mumbai/Pune via NH-66",
            description: "Via Murud-Janjira → Kashid → Alibaug → Mumbai (~4.5 hrs). Or reverse via Mahad → Tamhini Ghat → Pune (~5 hrs).",
            location: { name: "Mumbai / Pune", lat: 19.0760, lng: 72.8777 },
            time: "10:30 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 2. TARKARLI — Clear-water beach & scuba diving
  {
    _id: "trip-tarkarli-sindhudurg",
    title: "Tarkarli — Crystal Waters, Scuba Diving & Sindhudurg Fort",
    slug: "tarkarli-sindhudurg-beach",
    excerpt:
      "Tarkarli in Sindhudurg district offers the clearest beach water in Maharashtra — visibility of up to 15 feet for snorkelling and scuba diving. Paired with the 17th-century Sindhudurg sea fort, the Karli river backwaters, and legendary Malvani cuisine, it makes for a near-perfect Konkan long weekend.",
    tags: ["Beach", "Scuba Diving", "Konkan", "Maharashtra", "Sindhudurg", "Adventure", "Weekend Getaway", "Water Sports"],
    country: "India",
    startDate: "2027-01-15",
    endDate: "2027-01-18",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 14000,
    currency: "INR",
    tripType: "Beach & Adventure",
    readingTime: 10,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "tark-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Tarkarli — Arrival & Sindhudurg Fort",
        date: "2027-01-15",
        summary: "Long scenic drive down the Konkan coast or overnight train to Kudal, followed by the iconic Sindhudurg sea fort on arrival, and a Malvani dinner on the beach.",
        activities: [
          {
            _key: "tark1a",
            title: "Travel to Tarkarli — Train or Drive",
            description: "By train: Konkan Railway from Mumbai CST/Pune to Kudal (~8 hrs, overnight Mandovi Express) then taxi 14 km to Tarkarli. By road: Mumbai → Panvel → Kolad → Chiplun → Ratnagiri → Malvan (~520 km, 9–10 hrs, NH-66). Drive route is stunning — best done overnight or with early departure.",
            location: { name: "Tarkarli, Sindhudurg", lat: 16.0167, lng: 73.4667 },
            time: "Overnight / 06:00 AM",
            type: "transport",
            notes: "Mandovi Express (10103) from Mumbai CST departs 07:10 PM, arrives Kudal 04:05 AM. Book at least 3 weeks ahead in peak season.",
          },
          {
            _key: "tark1b",
            title: "Sindhudurg Fort (Boat from Malvan Jetty)",
            description: "Chhatrapati Shivaji Maharaj's most impressive sea fort (1664–68), built on a 48-acre rocky island 500m offshore. The fort walls are 3–6m thick and extend 2.5 km. Entry ₹30 pp. Boats from Malvan jetty every 30 min (₹30 pp return).",
            location: { name: "Sindhudurg Fort", lat: 16.0425, lng: 73.4644 },
            time: "10:00 AM",
            type: "sightseeing",
            notes: "Inside the fort: Shivaji's handprint and footprint shrine, the Maruti temple, and a freshwater well inside a salt-water fort — a feat of Maratha engineering.",
          },
          {
            _key: "tark1c",
            title: "Lunch — Malvani Thali at Chaitanya Restaurant, Malvan",
            description: "The best Malvani food in Sindhudurg: Kombdi Vade (chicken with fried bread), Surmai curry, Tisre sukke (dry clam), and Sol Kadhi. Budget ₹300–500 pp.",
            location: { name: "Chaitanya Restaurant, Malvan", lat: 16.0614, lng: 73.4669 },
            time: "01:30 PM",
            type: "food",
          },
          {
            _key: "tark1d",
            title: "Check-in at Beach Resort/MTDC Tarkarli",
            description: "Best accommodation options: MTDC Tarkarli Beach Resort (book at mahatourism.gov.in), Sai Prasad Beach Resort, or private beach huts. Book weeks ahead in season.",
            location: { name: "Tarkarli Beach", lat: 16.0167, lng: 73.4667 },
            time: "03:00 PM",
            type: "accommodation",
            notes: "MTDC Tarkarli: ₹2,500–4,000/night. Private huts: ₹1,500–2,500/night. Best for: families (MTDC), couples (beach huts).",
          },
          {
            _key: "tark1e",
            title: "Sunset on Tarkarli Beach",
            description: "The beach is a 3 km unbroken arc of white sand with clear, shallow water. Perfect for sunset photography — the sky turns deep orange over the Arabian Sea.",
            time: "06:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "tark-day2",
        dayNumber: 2,
        title: "Scuba Diving, Snorkelling & Karli Backwaters",
        date: "2027-01-16",
        summary: "The main event: scuba diving in Tarkarli's crystal-clear waters with visibility of 10–20 feet, followed by a serene kayak or boat ride through the Karli river mangroves.",
        activities: [
          {
            _key: "tark2a",
            title: "Scuba Diving Session (6:30 AM)",
            description: "Tarkarli offers Maharashtra's best scuba diving — corals, lionfish, pufferfish, and occasional dolphin sightings. Water temp: 26–29°C. Operators: Red Coral Diving (certified PADI), Underwater World Tarkarli. Beginner Discover Scuba: ₹2,000–2,500 pp (no certification needed). Includes equipment and instructor.",
            location: { name: "Tarkarli Scuba Point", lat: 16.0150, lng: 73.4630 },
            time: "06:30 AM",
            type: "activity",
            notes: "Book the previous evening — dive slots fill early. Best diving: October–March when visibility is peak. Avoid monsoon (water visibility drops to nil).",
          },
          {
            _key: "tark2b",
            title: "Breakfast — Fresh Juice & Coconut",
            description: "Fresh coconut water and fruit on the beach after your dive. Most resorts serve breakfast 8–10 AM.",
            time: "08:30 AM",
            type: "food",
          },
          {
            _key: "tark2c",
            title: "Snorkelling & Water Sports",
            description: "After scuba, try snorkelling (₹400–600 pp), banana boat riding, parasailing, and jet skiing. All operators are based near the beach.",
            time: "10:00 AM",
            type: "activity",
          },
          {
            _key: "tark2d",
            title: "Karli River Backwater Kayaking / Boat Ride",
            description: "The Karli river creates a stunning backwater estuary behind the beach. Kayak through dense mangroves, spot kingfishers, egrets, and cormorants. Boat rides available too (₹150 pp/30 min). Kayaks: ₹300/hr.",
            location: { name: "Karli River Backwaters", lat: 16.0250, lng: 73.4710 },
            time: "02:00 PM",
            type: "activity",
          },
          {
            _key: "tark2e",
            title: "Lunch at Rock Garden Restaurant, Tarkarli",
            description: "Seafood overlooking the backwaters: Crab Masala, Bombil fry, Prawn Butter Garlic, and Malvani Fish Biryani. Budget ₹500–800 pp.",
            location: { name: "Rock Garden Restaurant, Tarkarli", lat: 16.0200, lng: 73.4650 },
            time: "12:30 PM",
            type: "food",
          },
          {
            _key: "tark2f",
            title: "Evening — Beach Bonfire & Fresh Catch BBQ",
            description: "Most beach huts arrange an evening bonfire with fresh catch BBQ (prawns, pomfret, mackerel grilled on coconut shell coal). Malvani masala gives the fish a uniquely spicy-coconut crust.",
            time: "07:00 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "tark-day3",
        dayNumber: 3,
        title: "Malvan Market, Devbagh Beach & Return",
        date: "2027-01-17",
        summary: "Morning at the Malvan fish market, a detour to the pristine Devbagh Beach (best snorkelling spot), afternoon return drive or train.",
        activities: [
          {
            _key: "tark3a",
            title: "Malvan Fish Market (Early Morning)",
            description: "A vivid morning ritual — boats return at dawn with the night's catch. Watch the auction, buy fresh fish, and have it cooked by any dhaba for ₹100–150.",
            location: { name: "Malvan Fish Market", lat: 16.0614, lng: 73.4669 },
            time: "07:00 AM",
            type: "activity",
          },
          {
            _key: "tark3b",
            title: "Devbagh Beach — Snorkelling & Peace",
            description: "12 km from Tarkarli — accessible by boat (₹100 pp return). The beach at the confluence of the Karli river and Arabian Sea is one of Maharashtra's finest. Exceptional snorkelling in the shallow clear waters.",
            location: { name: "Devbagh Beach", lat: 16.0050, lng: 73.4570 },
            time: "09:30 AM",
            type: "sightseeing",
          },
          {
            _key: "tark3c",
            title: "Return Journey — Train or Drive",
            description: "Return to Kudal station for evening Konkan Kanya Express (arrives Mumbai 05:30 AM next day) or drive north on NH-66.",
            time: "02:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 3. PANHALA — Hill fort near Kolhapur
  {
    _id: "trip-panhala-kolhapur",
    title: "Panhala — Maratha Hill Fort & Kolhapur's Royal Heritage",
    slug: "panhala-kolhapur-hill-fort",
    excerpt:
      "Panhala is a 12th-century hill fort at 3,175 feet — the longest fort in the Deccan and Chhatrapati Shivaji's favourite stronghold. Combine it with a day in Kolhapur for the Mahalakshmi temple, royal palace-museum, and famous Kolhapuri cuisine. An ideal weekend from Pune (235 km).",
    tags: ["History", "Maharashtra", "Forts", "Kolhapur", "Maratha", "Heritage", "Weekend Getaway", "Offbeat"],
    country: "India",
    startDate: "2027-01-09",
    endDate: "2027-01-11",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 9000,
    currency: "INR",
    tripType: "Heritage & History",
    readingTime: 9,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "panh-day1",
        dayNumber: 1,
        title: "Pune/Mumbai → Kolhapur → Panhala Fort",
        date: "2027-01-09",
        summary: "Drive to Kolhapur with a brief stop at the Mahalakshmi temple, then wind up to Panhala fort by evening to catch the sunset over the Sahyadri ranges.",
        activities: [
          {
            _key: "panh1a",
            title: "Depart Pune/Mumbai for Kolhapur",
            description: "From Pune: NH-48 via Satara → Karad → Kolhapur (~235 km, 4.5 hrs). From Mumbai: NH-48 via Pune → Kolhapur (~380 km, 7 hrs). Or take Sahyadri Express (11023) from Mumbai — departs 05:25 PM, arrives Kolhapur at 11:30 PM.",
            location: { name: "Pune / Mumbai", lat: 18.5204, lng: 73.8567 },
            time: "06:00 AM",
            type: "transport",
          },
          {
            _key: "panh1b",
            title: "Mahalakshmi Temple, Kolhapur",
            description: "One of the 51 Shakti Peethas — the Ambabai temple dedicated to Mahalakshmi. The sun directly illuminates the deity's face during Kiranavandana (March & September equinoxes). Magnificent Hemadpanthi architecture.",
            location: { name: "Mahalakshmi Temple, Kolhapur", lat: 16.7056, lng: 74.2330 },
            time: "10:30 AM",
            type: "sightseeing",
            notes: "Dress modestly. No entry for non-Hindus to inner sanctum. Photography restricted inside.",
          },
          {
            _key: "panh1c",
            title: "Kolhapuri Thali Lunch — Hotel Opal or Padma Guest House",
            description: "Authentic Kolhapuri cuisine: Tambda Rassa (fiery red mutton curry), Pandhra Rassa (white mutton gravy), Vada, Bhakri, and Solkadhi. Kolhapuri misal pav is also unmissable. Hotel Opal (near Rankala Lake) is famous for authentic thalis — ₹350 pp.",
            location: { name: "Hotel Opal, Kolhapur", lat: 16.7050, lng: 74.2295 },
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "panh1d",
            title: "Drive to Panhala Fort (18 km from Kolhapur)",
            description: "The fort sits at 3,175 ft on a spur of the Sahyadri range. 14 km of walls, 110+ bastions, and three gates (Teen Darwaza, Wagh Darwaza, Char Darwaza). Shivaji spent 16 crucial years here and escaped from Mughal siege in 1660.",
            location: { name: "Panhala Fort", lat: 16.8130, lng: 74.1122 },
            time: "03:00 PM",
            type: "sightseeing",
            notes: "Entry free. Panhala Fort extends over 14 km — comfortable shoes essential.",
          },
          {
            _key: "panh1e",
            title: "Sunset from Sajja Kothi (Watch Tower)",
            description: "Sajja Kothi offers the finest panoramic views — Kolhapur city to the south, Sahyadri ridges to the north, and on clear days, the Mahadeo ranges 80 km away. Best 15–20 minutes before sunset.",
            location: { name: "Sajja Kothi, Panhala", lat: 16.8115, lng: 74.1090 },
            time: "06:00 PM",
            type: "sightseeing",
          },
          {
            _key: "panh1f",
            title: "Dinner & Stay at MTDC Panhala or Hotel Sai Krupa",
            description: "MTDC Resort Panhala: ₹2,200–3,000/night with basic rooms and Sahyadri views. Hotel Sai Krupa (inside fort village): ₹1,200–1,800/night, home-cooked Kolhapuri food. Dinner: Bharli Vangi (stuffed brinjal) and Zunka-Bhakri.",
            location: { name: "Panhala Village", lat: 16.8130, lng: 74.1122 },
            time: "08:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "panh-day2",
        dayNumber: 2,
        title: "Panhala Fort Deep Exploration & Kolhapur Palace",
        date: "2027-01-10",
        summary: "Spend the morning exploring Panhala's massive fort complex — granaries, cisterns, temples, and Pavankhind — then return to Kolhapur for the New Palace museum and Rankala Lake sunset.",
        activities: [
          {
            _key: "panh2a",
            title: "Morning Fort Walk — Granaries, Temples & Andhar Bavdi",
            description: "The fort has remarkable structures: Ganga Kothi and Yamuna Kothi (massive stone granaries capable of storing grain for 50,000 soldiers for 5 years), the Sajja Kothi, Tin Darwaja (three-arched entry), and the Andhar Bavdi (dark well — a secret passage).",
            location: { name: "Panhala Fort Complex", lat: 16.8130, lng: 74.1122 },
            time: "07:30 AM",
            type: "sightseeing",
          },
          {
            _key: "panh2b",
            title: "Pavankhind — Site of Baji Prabhu's Last Stand",
            description: "8 km from Panhala, Pavankhind is where the legendary Baji Prabhu Deshpande held off 10,000 Mughal soldiers with 300 men to ensure Shivaji's escape. A national monument and deeply moving site for Maratha history lovers.",
            location: { name: "Pavankhind", lat: 16.7520, lng: 74.0783 },
            time: "11:00 AM",
            type: "sightseeing",
          },
          {
            _key: "panh2c",
            title: "Kolhapur New Palace Museum",
            description: "The Chatrapati Shahu Museum inside the Indo-Saracenic New Palace (1884) houses royal weaponry, shikaar (hunting) trophies, vintage cars, and Kolhapuri art. Entry ₹50 pp.",
            location: { name: "New Palace Museum, Kolhapur", lat: 16.7020, lng: 74.2280 },
            time: "02:30 PM",
            type: "sightseeing",
          },
          {
            _key: "panh2d",
            title: "Rankala Lake & Tambe Ganapati Temple",
            description: "A relaxed lakeside walk around Rankala Lake at the edge of Kolhapur city. Street food stalls serve Kolhapuri bhadang (spiced puffed rice) and zunka vade.",
            location: { name: "Rankala Lake, Kolhapur", lat: 16.6990, lng: 74.2140 },
            time: "05:00 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "panh-day3",
        dayNumber: 3,
        title: "Return via Radhanagari Wildlife Sanctuary (Optional)",
        date: "2027-01-11",
        summary: "Morning option to visit Radhanagari Wildlife Sanctuary (India's first wildlife sanctuary, 45 km from Kolhapur) for a chance to spot Indian bison (Gaur), before returning to Pune/Mumbai.",
        activities: [
          {
            _key: "panh3a",
            title: "Radhanagari Wildlife Sanctuary (Optional Detour)",
            description: "45 km from Kolhapur — India's oldest wildlife sanctuary (1958), dense deciduous forest with Gaur (Indian bison), leopard, barking deer, and hornbills. Jeep safari ₹1,200 pp (book at forest office). Open 06:00–09:00 AM and 03:00–06:00 PM.",
            location: { name: "Radhanagari Wildlife Sanctuary", lat: 16.5440, lng: 73.9790 },
            time: "06:30 AM",
            type: "activity",
          },
          {
            _key: "panh3b",
            title: "Return to Pune/Mumbai",
            description: "Return via NH-48 to Pune (~4.5 hrs) or continue to Mumbai (~7 hrs).",
            time: "10:30 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 4. AMBOLI — Monsoon waterfalls & Sahyadri
  {
    _id: "trip-amboli-sahyadri",
    title: "Amboli — The Chirapunji of Maharashtra: Monsoon Waterfalls",
    slug: "amboli-sahyadri-waterfalls",
    excerpt:
      "Amboli hill station receives 7,000 mm of rainfall annually — making it one of India's wettest places. In monsoon (June–September), over a dozen waterfalls cascade through dense evergreen forest, mist blankets the valley 24/7, and the biodiversity is extraordinary — Amboli is a critical hotspot for endemic frogs, snakes, and birds. An utterly immersive wet season escape.",
    tags: ["Monsoon", "Waterfalls", "Maharashtra", "Sahyadri", "Offbeat", "Nature", "Wildlife", "Trekking"],
    country: "India",
    startDate: "2027-07-18",
    endDate: "2027-07-20",
    bestSuggestedMonth: "June – September (Monsoon)",
    status: "published",
    viewCount: 0,
    totalBudget: 7500,
    currency: "INR",
    tripType: "Nature & Monsoon",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "amb-day1",
        dayNumber: 1,
        title: "Pune/Mumbai → Amboli — Arrival in the Mist",
        date: "2027-07-18",
        summary: "Drive through the Konkan and ascend to Amboli through switchback roads draped in monsoon green. Arrive to mist, waterfalls, and a cool 18–22°C welcome.",
        activities: [
          {
            _key: "amb1a",
            title: "Depart Pune/Mumbai for Amboli",
            description: "From Pune: NH-48 → Kolhapur → Sawantwadi → Amboli (~380 km, 7 hrs). From Mumbai: NH-66 → Lanja → Rajapur → Amboli (~490 km, 9–10 hrs). The Ghat section from Sawantwadi (14 km) is pure magic in monsoon — waterfalls cascading on both sides of the road.",
            location: { name: "Pune / Mumbai", lat: 18.5204, lng: 73.8567 },
            time: "05:00 AM",
            type: "transport",
            notes: "Road to Amboli can get slippery in heavy rain — AWD vehicle or local bus recommended. Check road status before travel.",
          },
          {
            _key: "amb1b",
            title: "Amboli Falls — The Centrepiece",
            description: "The main Amboli waterfall plunges 690 feet in three cascades. In peak monsoon (July–August), the volume is thunderous — spray creates a rainbow every afternoon. Entry ₹20 pp, parking ₹50.",
            location: { name: "Amboli Falls", lat: 15.9637, lng: 74.0022 },
            time: "12:00 PM",
            type: "sightseeing",
            notes: "Do NOT cross barriers — several fatalities each year from slippery rocks at water's edge.",
          },
          {
            _key: "amb1c",
            title: "Hiranyakeshi River Source",
            description: "A short 200m walk from the main road to a sacred spring — the source of the Hiranyakeshi river. The spring bubbles from a rocky hillside inside a temple grove. Calm, meditative spot.",
            location: { name: "Hiranyakeshi Spring, Amboli", lat: 15.9680, lng: 74.0110 },
            time: "02:00 PM",
            type: "sightseeing",
          },
          {
            _key: "amb1d",
            title: "Check-in at Amboli Hill Resort or MTDC",
            description: "Best stays: MTDC Amboli Resort (basic, well-located, ₹2,000–2,800/night), Amboli Hill Resort (₹2,500–3,500), Sahyadri Homestay (village house with home cooking, ₹1,200/night). Evenings here are chilly — carry light woolens.",
            location: { name: "Amboli Village", lat: 15.9637, lng: 74.0022 },
            time: "03:30 PM",
            type: "accommodation",
          },
          {
            _key: "amb1e",
            title: "Sunset Point — Fog & Valley Views",
            description: "Amboli's viewpoint overlooks the Konkan plain 700m below — on clear evenings you can see the Arabian Sea. In monsoon, rolling fog banks move through like a slow river of cloud. Magical at dusk.",
            location: { name: "Amboli Sunset Point", lat: 15.9660, lng: 73.9994 },
            time: "06:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "amb-day2",
        dayNumber: 2,
        title: "Waterfall Walks, Night Frog Survey & Sawantwadi",
        date: "2027-07-19",
        summary: "Explore secondary waterfalls (Nangarta, Mahadevgad), an afternoon nature walk for endemic wildlife, and an optional evening frog-watching session — Amboli hosts 14+ endemic frog species.",
        activities: [
          {
            _key: "amb2a",
            title: "Nangarta Falls Trek (Morning)",
            description: "1.5 km walk from Amboli village through dense forest to Nangarta Falls — a 350-ft tiered waterfall largely unknown to tourists. Guide essential (hire at village: ₹300). The trail passes through dense Malabar tree frog habitat.",
            location: { name: "Nangarta Falls, Amboli", lat: 15.9543, lng: 74.0035 },
            time: "07:00 AM",
            type: "activity",
          },
          {
            _key: "amb2b",
            title: "Mahadevgad Fort Trek",
            description: "2 km uphill to a small Maratha-era fort overlooking Amboli plateau and Konkan. The monsoon views are extraordinary — clouds at eye level, forest below, and cascading water everywhere.",
            location: { name: "Mahadevgad Fort, Amboli", lat: 15.9730, lng: 74.0085 },
            time: "10:00 AM",
            type: "activity",
          },
          {
            _key: "amb2c",
            title: "Lunch — Local Malvani Thali",
            description: "Try Amboli Dhaba near the main circle — Chicken Handi, Sol Kadhi, Vade, and Malvani Fish Curry. Budget ₹250–400 pp.",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "amb2d",
            title: "Night Frog Survey (Guided)",
            description: "Amboli is one of India's most important amphibian hotspots — 14 endemic frog species including the Amboli Toad and Amboli Bush Frog (discovered here). Naturalist-led torch walks at 8 PM reveal an extraordinary diversity. Contact: Amboli Eco-Tourism (local nature guide Sanjay Molawade: +91-94222-95887).",
            location: { name: "Amboli Forest", lat: 15.9637, lng: 74.0022 },
            time: "08:00 PM",
            type: "activity",
            notes: "₹500–800 pp for guided frog walk (~2 hrs). Waterproof shoes mandatory — the path is extremely muddy.",
          },
        ],
      },
      {
        _key: "amb-day3",
        dayNumber: 3,
        title: "Sawantwadi Palace & Return",
        date: "2027-07-20",
        summary: "Morning visit to Sawantwadi — the royal town known for its 250-year-old lacquerware craft tradition and the beautiful Moti Talao palace lake — before the drive home.",
        activities: [
          {
            _key: "amb3a",
            title: "Sawantwadi Royal Palace & Lacquerware",
            description: "30 km from Amboli — the 18th-century palace of the Sawant Bhosale dynasty houses a craft centre where artisans create the famous Sawantwadi lacquerware (Lakhavi Khilane) — brightly painted wooden toys and chess sets. The palace itself overlooks the serene Moti Talao (Pearl Lake).",
            location: { name: "Sawantwadi Palace", lat: 15.9047, lng: 73.8257 },
            time: "08:30 AM",
            type: "sightseeing",
          },
          {
            _key: "amb3b",
            title: "Return Drive to Pune/Mumbai",
            description: "Return via same route or alternative via Goa-Mumbai coastal highway (NH-66) for variety — adds 1 hr but more scenic.",
            time: "11:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 5. TORANMAL — Satpura hill station
  {
    _id: "trip-toranmal-satpura",
    title: "Toranmal — The Hidden Hill Station of the Satpura Ranges",
    slug: "toranmal-satpura-hill-station",
    excerpt:
      "Toranmal is a little-visited hill station at 1,150 m in the Satpura ranges of north Maharashtra — far from the crowds of Mahabaleshwar. With panoramic tribal village scenery, the pristine Yashwant Lake, the Gorakhnath Temple, and dense teak forests, it is one of Maharashtra's best-kept secrets. 2–3 days from Mumbai (420 km) or Nashik (200 km).",
    tags: ["Offbeat", "Hill Station", "Maharashtra", "Tribal", "Nature", "Satpura", "Weekend Getaway"],
    country: "India",
    startDate: "2027-01-23",
    endDate: "2027-01-25",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 8500,
    currency: "INR",
    tripType: "Offbeat Hill Station",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "tor-day1",
        dayNumber: 1,
        title: "Mumbai/Nashik → Toranmal — Arrival & Satpura Views",
        date: "2027-01-23",
        summary: "Long drive through the Deccan plateau into the Satpura hills. Arrive at Toranmal and explore the Yashwant Lake and Gorakhnath Temple complex at golden hour.",
        activities: [
          {
            _key: "tor1a",
            title: "Depart for Toranmal",
            description: "From Mumbai: NH-3 via Nashik → Dhule → Shahada → Toranmal (~420 km, 8 hrs). From Nashik: NH-3 → Dhule → Shahada → Toranmal (~200 km, 4 hrs). The final 30 km mountain climb from Shahada is on a winding forest road — stunning views.",
            location: { name: "Mumbai / Nashik", lat: 19.9975, lng: 73.7898 },
            time: "05:00 AM",
            type: "transport",
            notes: "Petrol last available at Shahada (30 km before Toranmal) — fill up there.",
          },
          {
            _key: "tor1b",
            title: "Yashwant Lake",
            description: "A beautiful natural lake in the heart of the hill station, surrounded by forest and tribal villages. Paddle boats available (₹80/30 min). The lake is mirror-calm in winter mornings and reflects the surrounding hills perfectly.",
            location: { name: "Yashwant Lake, Toranmal", lat: 21.8720, lng: 74.5146 },
            time: "02:00 PM",
            type: "sightseeing",
          },
          {
            _key: "tor1c",
            title: "Gorakhnath Temple & Cave",
            description: "An ancient cave temple carved into the plateau edge, dedicated to the saint Gorakhnath. A 20-minute trek leads to the cave entrance — the views from the platform outside the cave overlook the entire Satpura valley 1,000m below.",
            location: { name: "Gorakhnath Temple, Toranmal", lat: 21.8780, lng: 74.5212 },
            time: "04:00 PM",
            type: "sightseeing",
          },
          {
            _key: "tor1d",
            title: "Check-in at MTDC Toranmal or Forest Rest House",
            description: "MTDC Toranmal (₹1,800–2,500/night): clean rooms, basic restaurant, forest-edge location. Forest Department Rest House (₹800–1,200/night): book at Divisional Forest Office, Dhule — very basic but in the heart of the forest.",
            location: { name: "Toranmal", lat: 21.8720, lng: 74.5146 },
            time: "05:30 PM",
            type: "accommodation",
            notes: "Toranmal has very limited accommodation — book MTDC at mahatourism.gov.in at least 2–3 weeks ahead.",
          },
        ],
      },
      {
        _key: "tor-day2",
        dayNumber: 2,
        title: "Tribal Village Walk, Lotus Lake & Sunset Point",
        date: "2027-01-24",
        summary: "Explore the Bhil tribal villages surrounding Toranmal, visit the second Lotus Lake (Kamalagadh), and walk through teak and bamboo forest to a dramatic cliff-edge sunset point.",
        activities: [
          {
            _key: "tor2a",
            title: "Bhil Tribal Village Walk",
            description: "Toranmal plateau is home to the Bhil tribe — India's largest tribal community. Morning walks through their hamlets reveal unique architecture (thatched homes decorated with Warli art), farming practices, and cultural warmth. Guide strongly recommended (MTDC staff can arrange).",
            location: { name: "Toranmal Tribal Villages", lat: 21.8700, lng: 74.5100 },
            time: "07:00 AM",
            type: "activity",
          },
          {
            _key: "tor2b",
            title: "Kamalagadh — Lotus Lake",
            description: "A beautiful natural pond that blooms with pink lotus flowers in the post-monsoon season (October–November). Even in winter, the setting is peaceful and photogenic — reflections of surrounding hills on still water.",
            location: { name: "Kamalagadh Lake, Toranmal", lat: 21.8810, lng: 74.5290 },
            time: "10:00 AM",
            type: "sightseeing",
          },
          {
            _key: "tor2c",
            title: "Lunch — MTDC Restaurant or Local Dhaba",
            description: "Simple Maharashtrian thali at MTDC or a local dhaba — dal, rice, sabzi, bhakri (jowar flatbread). The local jowar bhakri with pithla (chickpea flour curry) is a Satpura staple and utterly satisfying.",
            time: "12:30 PM",
            type: "food",
          },
          {
            _key: "tor2d",
            title: "Forest Trek to Sitadevi Wildlife Sanctuary Edge",
            description: "Toranmal is adjacent to the Sitadevi Wildlife Sanctuary — a 4 km trek along the plateau edge passes through dense dry deciduous forest. Leopard, wolf, and wild boar are present but rarely seen. The cliff-edge views are dramatic.",
            location: { name: "Sitadevi Sanctuary Border", lat: 21.8560, lng: 74.5400 },
            time: "02:30 PM",
            type: "activity",
          },
          {
            _key: "tor2e",
            title: "Sunset from Toranmal Plateau Edge",
            description: "The plateau drops dramatically to the Tapti valley far below. At sunset, the plains turn gold and the Satpura ridges glow amber. On clear winter days, the horizon stretches 100+ km.",
            time: "05:45 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "tor-day3",
        dayNumber: 3,
        title: "Return — via Navapur & Taloda",
        date: "2027-01-25",
        summary: "Morning option to trek to the ancient Kakdi waterfall, then descend from the plateau and return to Mumbai or Nashik.",
        activities: [
          {
            _key: "tor3a",
            title: "Kakdi Waterfall Trek (Optional)",
            description: "4 km round-trip trail to a seasonal waterfall at the plateau edge. Best in post-monsoon but even in January has some flow. The final descent to the base requires care on the rocky trail.",
            time: "06:30 AM",
            type: "activity",
          },
          {
            _key: "tor3b",
            title: "Return Drive — via NH-3",
            description: "Descend from Toranmal via Shahada → Dhule → Nashik (~200 km) or continue to Mumbai (~420 km).",
            time: "09:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 6. CHORLA GHAT — Western Ghats viewpoint, Goa-Karnataka border
  {
    _id: "trip-chorla-ghat-western-ghats",
    title: "Chorla Ghat — Western Ghats Biodiversity at the Goa-Karnataka Tri-Border",
    slug: "chorla-ghat-western-ghats",
    excerpt:
      "Chorla Ghat sits at the tri-junction of Goa, Karnataka, and Maharashtra at 900m — a pristine UNESCO-recognised Western Ghats biodiversity hotspot. Waterfalls, misty rainforest, hornbills, and leopards in a single hidden corner. Best done as a 2-night monsoon or post-monsoon trip from Goa (65 km) or Belgaum (75 km).",
    tags: ["Western Ghats", "Goa", "Karnataka", "Nature", "Wildlife", "Waterfall", "Monsoon", "Biodiversity", "Offbeat"],
    country: "India",
    startDate: "2027-09-12",
    endDate: "2027-09-14",
    bestSuggestedMonth: "July – November",
    status: "published",
    viewCount: 0,
    totalBudget: 9000,
    currency: "INR",
    tripType: "Nature & Wildlife",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "cho-day1",
        dayNumber: 1,
        title: "Goa/Mumbai → Chorla Ghat — Rainforest Arrival",
        date: "2027-09-12",
        summary: "Drive into the Bhagwan Mahavir Wildlife Sanctuary corridor through Chorla Ghat, stop at the magnificent Vajrapoha Falls, and settle into an eco-stay in the forest.",
        activities: [
          {
            _key: "cho1a",
            title: "Drive to Chorla Ghat",
            description: "From Panaji (Goa): NH-4A via Valpoi → Chorla → Anmod (~65 km, 2 hrs). From Mumbai: NH-66 → Panaji → Chorla (~650 km, 12 hrs, best done overnight). From Pune: Via Kolhapur → Belgaum → Chorla (~390 km, 7 hrs). The Ghat road from Anmod is a winding 25 km through virgin rainforest.",
            location: { name: "Chorla Ghat", lat: 15.5856, lng: 74.2222 },
            time: "09:00 AM",
            type: "transport",
            notes: "Road is steep with sharp hairpin bends — avoid after 6 PM in monsoon. Check landslide alerts before travel.",
          },
          {
            _key: "cho1b",
            title: "Vajrapoha (Virdi) Waterfall",
            description: "500m walk from the road into rainforest to a beautiful 40-ft waterfall tumbling into a natural pool — surrounded by Malabar tree frogs, hornbills, and giant squirrels. Crystal clear water, safe for swimming.",
            location: { name: "Vajrapoha Falls, Chorla", lat: 15.5740, lng: 74.2145 },
            time: "11:00 AM",
            type: "sightseeing",
          },
          {
            _key: "cho1c",
            title: "Lunch at Chorla Dhaba",
            description: "Simple Goan thali at the small dhabas near the viewpoint: Goan fish curry, rice, and kokum sherbet. Very limited options — carry backup snacks.",
            time: "01:30 PM",
            type: "food",
          },
          {
            _key: "cho1d",
            title: "Check-in — Swapna Shilp Eco Stay or Wildernest",
            description: "Best stay options: Wildernest Nature Resort (eco-luxury, ₹5,000–8,000/night with meals, guided walks included) or Swapna Shilp (budget option, ₹1,800–2,500/night). Wildernest is the finest eco-property in North Goa — architecture integrates with the forest canopy.",
            location: { name: "Chorla Area", lat: 15.5856, lng: 74.2222 },
            time: "02:30 PM",
            type: "accommodation",
            notes: "Wildernest bookings: wildernest-goa.com. Book at least 4 weeks ahead in monsoon season.",
          },
          {
            _key: "cho1e",
            title: "Nature Walk with Resort Naturalist (PM)",
            description: "The property naturalist leads a 2-hr guided walk through the surrounding forest — identifying bird calls (Malabar Trogon, Nilgiri Woodpigeon), spotting insects, frogs, and tracking leopard prints. The 300+ bird species count makes this a birding hotspot.",
            time: "04:30 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "cho-day2",
        dayNumber: 2,
        title: "Dawn Birding, Atoll Lake & Mahadei Wildlife Sanctuary",
        date: "2027-09-13",
        summary: "6 AM birding walk through the forest for hornbills and flycatchers, afternoon jeep safari into the Mahadei Wildlife Sanctuary, and a sunset from the Chorla plateau.",
        activities: [
          {
            _key: "cho2a",
            title: "Dawn Birding Walk (6 AM)",
            description: "The hour after dawn is peak birding — Ceylon Frogmouth, Malabar Trogon, Indian Pitta, Malabar Pied Hornbill, and Nilgiri Langur are regulars. Binoculars provided by Wildernest.",
            location: { name: "Chorla Forest", lat: 15.5856, lng: 74.2222 },
            time: "06:00 AM",
            type: "activity",
          },
          {
            _key: "cho2b",
            title: "Breakfast in the Forest Canopy",
            description: "Wildernest serves breakfast in an open-air canopy platform with forest views. Goan poee bread, egg bhurji with local spices, fresh papaya, and filter coffee.",
            time: "08:30 AM",
            type: "food",
          },
          {
            _key: "cho2c",
            title: "Atoll Lake (Chorla's Hidden Lake)",
            description: "A 1.5 km forest trail leads to a small pristine lake hidden in the forest canopy — formed in a natural depression. In post-monsoon (October), surrounded by mist, it is one of Goa's most beautiful secret spots.",
            location: { name: "Atoll Lake, Chorla", lat: 15.5910, lng: 74.2310 },
            time: "10:30 AM",
            type: "sightseeing",
          },
          {
            _key: "cho2d",
            title: "Mahadei Wildlife Sanctuary Drive",
            description: "The Mahadei sanctuary borders Chorla — a jeep drive on forest tracks passes through habitat of gaur, sloth bear, leopard, and wild dog (Dhol). Best chance of sightings: early morning and late evening. Gaur are commonly spotted.",
            location: { name: "Mahadei Wildlife Sanctuary", lat: 15.5200, lng: 74.2500 },
            time: "02:30 PM",
            type: "activity",
            notes: "Entry permit required — Wildernest arranges permits. Forest department jeep: ₹2,000–3,000.",
          },
        ],
      },
      {
        _key: "cho-day3",
        dayNumber: 3,
        title: "Return — via Dudh Sagar Falls or Goa Beaches",
        date: "2027-09-14",
        summary: "Morning option to extend to Dudh Sagar Falls (70 km from Chorla) — one of India's tallest waterfalls — before returning to Goa or Mumbai.",
        activities: [
          {
            _key: "cho3a",
            title: "Dudh Sagar Falls (Optional, via Mollem)",
            description: "70 km from Chorla via Mollem — India's 5th highest waterfall at 310m, in full monsoon roar from June–October. Jeep ride through Bhagwan Mahavir National Park required (₹1,200 pp from Collem jeep stand). Total detour: 3–4 hrs.",
            location: { name: "Dudh Sagar Falls", lat: 15.3145, lng: 74.3133 },
            time: "08:00 AM",
            type: "sightseeing",
          },
          {
            _key: "cho3b",
            title: "Return to Goa / Mumbai",
            description: "Return to Panaji (~2 hrs) or drive north to Mumbai (~12 hrs via NH-66).",
            time: "01:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 7. COTIGAO WILDLIFE SANCTUARY — South Goa
  {
    _id: "trip-cotigao-wildlife-sanctuary",
    title: "Cotigao Wildlife Sanctuary — Goa's Quiet Forest Reserve",
    slug: "cotigao-wildlife-sanctuary-goa",
    excerpt:
      "Cotigao in South Goa is Goa's second-largest wildlife sanctuary — and its most peaceful. Far removed from the beaches and nightclubs, this dry deciduous forest harbours Gaur, sloth bears, pangolins, and 200+ bird species. The treetop watchtower at dawn delivers one of South Goa's most serene wildlife experiences.",
    tags: ["Wildlife", "Goa", "South Goa", "Nature", "Forest", "Offbeat", "Birding", "Weekend Getaway"],
    country: "India",
    startDate: "2027-02-06",
    endDate: "2027-02-08",
    bestSuggestedMonth: "November – March",
    status: "published",
    viewCount: 0,
    totalBudget: 9500,
    currency: "INR",
    tripType: "Wildlife & Nature",
    readingTime: 7,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "coti-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Cotigao — Arrival & Watchtower",
        date: "2027-02-06",
        summary: "Travel to Canacona in South Goa and enter the Cotigao sanctuary by afternoon. Set up at the forest rest house and climb the watchtower at dusk for your first wildlife sightings.",
        activities: [
          {
            _key: "coti1a",
            title: "Travel to Cotigao — Drive or Train",
            description: "From Mumbai: Konkan Railway overnight to Canacona station (~12 hrs). From Pune: NH-48 → Kolhapur → Belgaum → Canacona → Cotigao (~550 km, 10 hrs). Cotigao is 12 km from Canacona/Chaudi town.",
            location: { name: "Cotigao Wildlife Sanctuary", lat: 14.9960, lng: 74.1480 },
            time: "Overnight / 08:00 AM",
            type: "transport",
            notes: "Tejas Superfast Express (12052) from Mumbai CST reaches Canacona in ~11.5 hrs. Book well ahead.",
          },
          {
            _key: "coti1b",
            title: "Sanctuary Entry & Forest Walk",
            description: "Entry ₹20 pp (Indian). The sanctuary has well-maintained forest trails. The mix of dry deciduous and semi-evergreen forest is exceptionally biodiverse — and genuinely quiet compared to North Goa's national parks.",
            location: { name: "Cotigao Sanctuary Gate", lat: 14.9960, lng: 74.1480 },
            time: "11:00 AM",
            type: "sightseeing",
          },
          {
            _key: "coti1c",
            title: "Forest Department Rest House Check-in",
            description: "Book the Forest Department Rest House inside the sanctuary (₹600–1,000/night) via DFO Canacona. Very basic — bring your own food or arrange catering. Alternatively, stay at Canacona town (~12 km) with better amenity options.",
            location: { name: "Cotigao Rest House", lat: 14.9950, lng: 74.1430 },
            time: "02:00 PM",
            type: "accommodation",
            notes: "Book rest house at Canacona Forest Office: +91-832-264-3420. Book 2 weeks ahead in season.",
          },
          {
            _key: "coti1d",
            title: "Dusk Watchtower Vigil",
            description: "The 10m watchtower overlooks a watering hole — at dusk, Gaur (Indian Bison, the world's largest bovine) come to drink. Sloth bear, barking deer, and sambar are also frequently sighted at dusk. Sit silently and wait — it rewards patience.",
            location: { name: "Cotigao Watchtower", lat: 14.9920, lng: 74.1400 },
            time: "05:30 PM",
            type: "activity",
            notes: "Silence mandatory at watchtower — no phones, conversation, or sudden movement. Carry repellent and thin jacket.",
          },
        ],
      },
      {
        _key: "coti-day2",
        dayNumber: 2,
        title: "Dawn Birding, Trekking & River Walk",
        date: "2027-02-07",
        summary: "A 6 AM watchtower vigil for Gaur at dawn (most active), followed by a trek to the river and a bird survey through the forest canopy.",
        activities: [
          {
            _key: "coti2a",
            title: "Pre-Dawn Watchtower Vigil (5:30 AM)",
            description: "Dawn is the best wildlife window. The watering hole is most active between 5:30–8:00 AM. Gaur (groups of 10–30) are regulars. Spot-billed pelicans and king vultures have been recorded. Carry a torch for the walk from rest house.",
            time: "05:30 AM",
            type: "activity",
          },
          {
            _key: "coti2b",
            title: "Breakfast — Simple Forest Camp",
            description: "If staying in rest house, cook simple dal-rice on a camp stove or bring packed breakfast from Canacona. Chai from local dhaba near the gate.",
            time: "08:30 AM",
            type: "food",
          },
          {
            _key: "coti2c",
            title: "Cotigao River Forest Walk",
            description: "A 4 km forest walk following the Cotigao river through riparian forest — the riverbank habitat is exceptional for birds (kingfishers, darters, herons). Look for freshwater crocodile basking on the rocks.",
            time: "09:30 AM",
            type: "activity",
          },
          {
            _key: "coti2d",
            title: "Palolem Beach Afternoon (12 km from Cotigao)",
            description: "One of Goa's most beautiful crescent beaches — a perfect contrast to the forest. Calm, shallow water safe for swimming. Excellent seafood at beachside shacks: Dropadi, Café Inn, or Bhakti Kutir for organic food.",
            location: { name: "Palolem Beach, South Goa", lat: 14.9914, lng: 74.0232 },
            time: "01:00 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "coti-day3",
        dayNumber: 3,
        title: "Butterfly Beach & Return",
        date: "2027-02-08",
        summary: "Morning kayak to Butterfly Beach (reachable only by sea), then return journey north.",
        activities: [
          {
            _key: "coti3a",
            title: "Butterfly Beach by Kayak from Agonda",
            description: "Agonda Beach (10 km from Palolem) offers kayak rentals (₹300/hr) — paddle 20 minutes around a headland to Butterfly Beach, a tiny cove accessible only by sea or a 45-min forest trek. Crystal clear water, absolute privacy.",
            location: { name: "Butterfly Beach, South Goa", lat: 14.9714, lng: 74.0178 },
            time: "07:00 AM",
            type: "activity",
          },
          {
            _key: "coti3b",
            title: "Return Journey",
            description: "Train from Canacona station or drive north via NH-66 to Mumbai.",
            time: "12:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 8. GORAKHGAD — Trekking fort near Mumbai
  {
    _id: "trip-gorakhgad-trek",
    title: "Gorakhgad Trek — The Perfect One-Day Fort Trek from Mumbai",
    slug: "gorakhgad-fort-trek-mumbai",
    excerpt:
      "Gorakhgad at 1,065 m is one of the finest one-day treks in the Sahyadris — a 3-hour drive from Mumbai, with a 2.5-hour ascent through dense forest to a twin-peaked fort with caves, watchtowers, and sweeping Konkan views. Best in monsoon (waterfall views) and winter (crystal-clear visibility). The narrow final chimney climb adds a thrilling edge.",
    tags: ["Trekking", "Maharashtra", "Mumbai", "Sahyadri", "Forts", "Adventure", "Day Trip", "Weekend"],
    country: "India",
    startDate: "2027-01-30",
    endDate: "2027-01-31",
    bestSuggestedMonth: "October – February (winter clarity) or July–September (monsoon drama)",
    status: "published",
    viewCount: 0,
    totalBudget: 4500,
    currency: "INR",
    tripType: "Trekking",
    readingTime: 7,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "gork-day1",
        dayNumber: 1,
        title: "Mumbai → Dehane Village → Gorakhgad Summit",
        date: "2027-01-30",
        summary: "Early departure from Mumbai, drive to Dehane base village, ascend Gorakhgad through dense forest and a thrilling chimney rock climb to the fort summit and caves.",
        activities: [
          {
            _key: "gork1a",
            title: "Depart Mumbai to Dehane Base Village",
            description: "From Mumbai: Kasara or Karjat direction → Mahad road → Dehane village (~130 km, 3 hrs via Khopoli). By train: Karjat Fast Local to Karjat, then share jeep/cab to Dehane (~20 km, ₹200). Departure by 5:30–6 AM is ideal for a cool morning start.",
            location: { name: "Dehane Village, Raigad", lat: 18.5560, lng: 73.4240 },
            time: "05:30 AM",
            type: "transport",
            notes: "Karjat to Dehane: shared jeeps available from Karjat station (₹40 pp). Car parking at Dehane: ₹100.",
          },
          {
            _key: "gork1b",
            title: "Breakfast at Dehane Village",
            description: "Village tea stalls serve poha, vada pav, and chai before the trek. Stock up on water (2–3 litres minimum) — no water sources on the mountain.",
            location: { name: "Dehane Village", lat: 18.5560, lng: 73.4240 },
            time: "08:30 AM",
            type: "food",
            notes: "Carry at least 2.5 litres of water. No water sources on trek after base village.",
          },
          {
            _key: "gork1c",
            title: "Trek to Gorakhgad — Forest Trail (2.5 hrs)",
            description: "The trail begins at the edge of Dehane village through dense forest — the first 45 minutes is relatively gentle on a well-marked path. After the forest section, the terrain steepens into a rocky scramble. The final section (Chimney Rock) is an almost-vertical 20m rock face with iron pegs and a rope for handholds — the most thrilling part.",
            location: { name: "Gorakhgad Trail", lat: 18.5650, lng: 73.4350 },
            time: "09:00 AM",
            type: "activity",
            notes: "Difficulty: Moderate (Grade 2). No prior experience needed but some comfort with exposed terrain helps. Trek shoes with grip mandatory — avoid rubber slippers.",
          },
          {
            _key: "gork1d",
            title: "Gorakhgad Summit — Fort Ruins & Caves",
            description: "The summit (1,065 m) has a small Hanuman temple and ancient fort ruins. Three rock-cut caves provide shelter — in monsoon, small waterfalls cascade off the summit rocks. 360° views: Prabalgad, Matheran, Naneghat, and on clear winter days, the distant Sahyadri ridges 80 km away.",
            location: { name: "Gorakhgad Summit", lat: 18.5680, lng: 73.4400 },
            time: "11:30 AM",
            type: "sightseeing",
          },
          {
            _key: "gork1e",
            title: "Lunch at Summit — Packed Meal",
            description: "Eat packed lunch at the summit caves with 270° Konkan views. The caves are sheltered from wind — a remarkably peaceful spot 1,000m above the plains.",
            time: "12:00 PM",
            type: "food",
          },
          {
            _key: "gork1f",
            title: "Descent to Dehane (1.5 hrs)",
            description: "Descend via the same route — the chimney section on descent requires more care. Iron pegs assist on descent. Reach base by 2:30–3:00 PM.",
            time: "01:00 PM",
            type: "transport",
            notes: "Descending the chimney is trickier than ascending — face inward, three points of contact always.",
          },
          {
            _key: "gork1g",
            title: "Optional: Overnight at Dehane Village Homestay",
            description: "If doing a relaxed 2-day trip: village homestays in Dehane charge ₹600–800 pp including dinner and breakfast (dal, bhakri, and fresh vegetable sabzi). Sleep under the stars in a quiet Konkan village.",
            location: { name: "Dehane Village", lat: 18.5560, lng: 73.4240 },
            time: "03:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "gork-day2",
        dayNumber: 2,
        title: "Morning at Bhimashankar or Return — Prabalgad Combo Option",
        date: "2027-01-31",
        summary: "For a 2-day itinerary: drive to Bhimashankar Wildlife Sanctuary (60 km) for Indian Giant Squirrel spotting and the Jyotirlinga temple, or return to Mumbai. Alternatively, combine with Prabalgad fort (35 km from Dehane) for a twin-fort weekend.",
        activities: [
          {
            _key: "gork2a",
            title: "Option A: Bhimashankar Wildlife Sanctuary",
            description: "60 km from Dehane — one of the 12 Jyotirlinga temples (Lord Shiva) set in dense Sahyadri forest at 1,065 m. The sanctuary is the stronghold of the Indian Giant Squirrel — massive, rust-and-cream coloured. 3–4 km forest walk from the temple to the sanctuary. Best sighting: early morning in tall Malabar forest.",
            location: { name: "Bhimashankar", lat: 19.0726, lng: 73.5370 },
            time: "07:00 AM",
            type: "sightseeing",
          },
          {
            _key: "gork2b",
            title: "Option B: Return to Mumbai",
            description: "Return drive via Karjat → Pune Expressway → Mumbai (~3 hrs). Or take the Karjat train to CST/Dadar.",
            time: "08:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MADHYA PRADESH & CHHATTISGARH (CENTRAL INDIA)
  // ─────────────────────────────────────────────────────────────────────────

  // 42. ORCHHA — Riverside Bundela palaces
  {
    _id: "trip-orchha-bundelkhand",
    title: "Orchha — The Forgotten Bundela Capital on the Betwa",
    slug: "orchha-bundelkhand-heritage",
    excerpt:
      "A frozen-in-time 16th-century capital of the Bundela Rajputs. Nestled on the boulder-strewn banks of the Betwa River, Orchha features spectacular palace-fortresses, looming cenotaphs (chhatris), and the only temple in India where Lord Rama is worshipped as a King. A perfect architectural weekend escape.",
    tags: ["Heritage", "History", "Madhya Pradesh", "Orchha", "Architecture", "Offbeat", "Weekend Getaway"],
    country: "India",
    startDate: "2027-11-12",
    endDate: "2027-11-14",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 12000,
    currency: "INR",
    tripType: "Heritage & Culture",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "orc-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Jhansi → Orchha Arrival",
        date: "2027-11-12",
        summary: "Arrive in Jhansi via train or flight to Gwalior. A short drive brings you to the sleepy riverside town of Orchha. Check in and witness the evening Aarti at Ram Raja Temple.",
        activities: [
          {
            _key: "orc1a",
            title: "Travel to Jhansi & Drive to Orchha",
            description: "From Mumbai: Direct overnight train to Jhansi (VGLJ) (~14-16 hrs, e.g., Punjab Mail). Or fly to Gwalior (GWL) and drive 120 km (2.5 hrs). From Pune: Jhelum Express to Jhansi. Orchha is just 15 km (30 mins) from Jhansi station. Taxi costs ~₹800.",
            location: { name: "Jhansi / Orchha", lat: 25.3524, lng: 78.6436 },
            time: "Morning Arrival",
            type: "transport",
            notes: "Orchha is best accessed via Jhansi junction which is on the main Delhi-Mumbai railway line.",
          },
          {
            _key: "orc1b",
            title: "Check-in at Sheesh Mahal or Bundelkhand Riverside",
            description: "MPT Sheesh Mahal: Heritage hotel actually located *inside* the fort complex. Bundelkhand Riverside: Set right on the banks of the Betwa river (built by the current Maharaja of Orchha). Budget: ₹3,500–6,000/night.",
            location: { name: "Orchha Fort Complex", lat: 25.3524, lng: 78.6436 },
            time: "02:00 PM",
            type: "accommodation",
          },
          {
            _key: "orc1c",
            title: "Late Lunch — Bundeli Thali",
            description: "Try a local Bundeli thali at the Sheesh Mahal restaurant or Orchha Hut Restaurant. Features local preparations like Kadhi, Baingan Bharta, and freshly baked rotis.",
            time: "03:00 PM",
            type: "food",
          },
          {
            _key: "orc1d",
            title: "Ram Raja Temple & Evening Aarti",
            description: "The only temple where Rama is worshipped as a King, with a police guard of honour. It was originally a palace until the deity refused to be moved from the kitchen where it was temporarily placed. The evening Aarti at 7 PM is atmospheric.",
            location: { name: "Ram Raja Temple", lat: 25.3500, lng: 78.6410 },
            time: "06:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "orc-day2",
        dayNumber: 2,
        title: "Fortress Palaces, Chhatris & Betwa Sunset",
        date: "2027-11-13",
        summary: "A full day exploring the magnificent Orchha Fort complex, the mural-filled Lakshmi Narayan Temple, and the royal cenotaphs dotting the riverbank.",
        activities: [
          {
            _key: "orc2a",
            title: "Jahangir Mahal & Raja Mahal",
            description: "Jahangir Mahal was built by Bir Singh Deo exclusively to host the Mughal Emperor Jahangir for *one* night. It’s a masterpiece of Indo-Islamic architecture with massive lapis-lazuli tiled doorways. Raja Mahal features incredible, well-preserved murals of the Dasavatara.",
            location: { name: "Orchha Fort Complex", lat: 25.3524, lng: 78.6436 },
            time: "09:00 AM",
            type: "sightseeing",
            notes: "Entry ticket covers all monuments. Best visited early morning to avoid the midday sun.",
          },
          {
            _key: "orc2b",
            title: "Chaturbhuj Temple Climb",
            description: "A colossal, soaring temple built on a massive stone platform. It looks more like a European cathedral than a Hindu temple. Climb the dark, narrow stairs to the roof for a panoramic view of Orchha.",
            location: { name: "Chaturbhuj Temple", lat: 25.3510, lng: 78.6420 },
            time: "11:30 AM",
            type: "sightseeing",
          },
          {
            _key: "orc2c",
            title: "Lunch at Open Sky Restaurant",
            description: "Relaxed rooftop cafe near the main square. Good Indian and continental food. Banana Nutella pancakes and cold coffee are popular.",
            time: "01:30 PM",
            type: "food",
          },
          {
            _key: "orc2d",
            title: "Laxmi Narayan Temple Murals",
            description: "A triangular temple resembling a fort. The ceiling murals are some of the finest in central India, depicting scenes from the Ramayana, the 1857 mutiny, and even British soldiers.",
            location: { name: "Laxmi Narayan Temple", lat: 25.3550, lng: 78.6350 },
            time: "03:30 PM",
            type: "sightseeing",
          },
          {
            _key: "orc2e",
            title: "Sunset at the Royal Chhatris (Cenotaphs)",
            description: "14 looming cenotaphs of the Bundela kings stand in a row along the Betwa river. Cross the narrow bridge to the opposite bank right before sunset for the iconic postcard view of Orchha.",
            location: { name: "Orchha Chhatris", lat: 25.3480, lng: 78.6450 },
            time: "05:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "orc-day3",
        dayNumber: 3,
        title: "Betwa River Rafting & Departure",
        date: "2027-11-14",
        summary: "Morning river rafting on the Betwa, passing the Chhatris and Orchha Nature Reserve, before heading back to Jhansi for the return journey.",
        activities: [
          {
            _key: "orc3a",
            title: "River Rafting on the Betwa",
            description: "A gentle 3 km raft trip (arranged by MP Tourism) starting from the boat club. It passes right under the Chhatris and goes through mild Grade I/II rapids inside the Orchha Nature Reserve. Beautiful birdwatching opportunities.",
            location: { name: "Betwa River Boat Club", lat: 25.3480, lng: 78.6460 },
            time: "08:00 AM",
            type: "activity",
            notes: "Available post-monsoon (October to March). Costs ~₹1000–1500 per raft.",
          },
          {
            _key: "orc3b",
            title: "Explore Orchha Nature Reserve",
            description: "A 12 km trail on an island formed by the Betwa and Jamni rivers. Good for spotting spotted deer, peacocks, and vultures nesting on the cenotaphs.",
            time: "10:30 AM",
            type: "activity",
          },
          {
            _key: "orc3c",
            title: "Return to Jhansi & Depart",
            description: "Drive back to Jhansi (30 mins) to catch the afternoon/evening train or flight from Gwalior back to Mumbai/Pune.",
            time: "02:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 43. MANDU — Afghan-era ruins
  {
    _id: "trip-mandu-afghan-ruins",
    title: "Mandu — City of Joy and Afghan Ruins on a Malwa Plateau",
    slug: "mandu-afghan-ruins-plateau",
    excerpt:
      "Perched on a forested plateau in the Vindhya range, Mandu is a vast celebration of Afghan architecture. Famous for the legendary romance of poet-prince Baz Bahadur and Rani Roopmati, its palaces, stepwells, and mosques are most magical during the monsoon.",
    tags: ["History", "Architecture", "Madhya Pradesh", "Monsoon", "Romance", "Heritage", "Offbeat"],
    country: "India",
    startDate: "2027-08-10",
    endDate: "2027-08-12",
    bestSuggestedMonth: "July – September (Monsoon is magical here)",
    status: "published",
    viewCount: 0,
    totalBudget: 15000,
    currency: "INR",
    tripType: "Heritage & Romance",
    readingTime: 9,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "man-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Indore → Mandu — The Royal Enclave",
        date: "2027-08-10",
        summary: "Fly or take a train to Indore, drive through the Malwa plateau to Mandu, and explore the central Royal Enclave featuring the Jahaz Mahal.",
        activities: [
          {
            _key: "man1a",
            title: "Travel to Indore & Drive to Mandu",
            description: "From Mumbai/Pune: Direct flight to Indore (1 hr) or overnight train (Avantika Express from Mumbai, Pune-Indore Express). From Indore airport, hire a taxi to Mandu (~95 km, 2.5 hrs). The road winds up the Vindhyas — watch for the massive medieval gates (Darwazas) as you enter the city.",
            location: { name: "Indore / Mandu", lat: 22.3424, lng: 75.3942 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "man1b",
            title: "Check-in at MPT Malwa Resort",
            description: "Set on the edge of the Sagar Talao lake, this MP Tourism property offers the best views and location. Spacious cottages and a good restaurant. (₹3,000–5,000/night).",
            location: { name: "Mandu", lat: 22.3424, lng: 75.3942 },
            time: "01:30 PM",
            type: "accommodation",
          },
          {
            _key: "man1c",
            title: "Jahaz Mahal (Ship Palace)",
            description: "Mandu's most famous structure, built between two artificial lakes (Kapur Talao and Munj Talao). At 120m long, it resembles a ship floating on water. Built by Ghiyas-ud-din Khilji to house his vast harem.",
            location: { name: "Jahaz Mahal, Mandu", lat: 22.3480, lng: 75.3950 },
            time: "03:30 PM",
            type: "sightseeing",
            notes: "The sunset reflections of Jahaz Mahal on the Munj Talao are spectacular.",
          },
          {
            _key: "man1d",
            title: "Hindola Mahal (Swinging Palace)",
            description: "Adjacent to Jahaz Mahal. Features wildly sloping sidewalls (77 degrees) that create the optical illusion that the entire building is swaying.",
            time: "05:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "man-day2",
        dayNumber: 2,
        title: "Baz Bahadur, Roopmati & The Central Group",
        date: "2027-08-11",
        summary: "Explore the romantic southern pavilions of Baz Bahadur and Roopmati, followed by the grand Jami Masjid and Hoshang Shah's Tomb (India's first marble tomb).",
        activities: [
          {
            _key: "man2a",
            title: "Baz Bahadur’s Palace",
            description: "Located in the southern Rewa Kund group. A mix of Rajasthani and Islamic styles, featuring high terraces where the musically-inclined Sultan Baz Bahadur composed poetry.",
            location: { name: "Rewa Kund Group", lat: 22.3150, lng: 75.3950 },
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "man2b",
            title: "Roopmati's Pavilion",
            description: "Built on the absolute edge of the plateau, 300m above the Nimar plains. It was originally an army observation post, but Roopmati used it to view the distant Narmada River which she worshipped. The acoustic resonance in the domes is incredible.",
            location: { name: "Roopmati Pavilion", lat: 22.3080, lng: 75.3960 },
            time: "10:30 AM",
            type: "sightseeing",
          },
          {
            _key: "man2c",
            title: "Lunch — Dal Paniya & Baobab Fruit",
            description: "Try 'Dal Paniya' (similar to dal baati but the bread is roasted between leaves of the Aak plant) at a local dhaba like Shivani Restaurant. Also buy 'Khorasani Imli' (Baobab fruit pods) sold by locals — the seeds were brought by African slaves centuries ago.",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "man2d",
            title: "Jami Masjid",
            description: "A massive, austere mosque inspired by the great mosque of Damascus. Its sheer scale and the acoustics of its echoing corridors are breathtaking.",
            location: { name: "Central Group, Mandu", lat: 22.3400, lng: 75.3950 },
            time: "03:00 PM",
            type: "sightseeing",
          },
          {
            _key: "man2e",
            title: "Hoshang Shah's Tomb",
            description: "India's first marble edifice. Shah Jahan sent four of his architects (including Ustad Hamid) here to study its proportions before they built the Taj Mahal.",
            time: "04:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "man-day3",
        dayNumber: 3,
        title: "Nilkanth Palace & Maheshwar (Optional)",
        date: "2027-08-12",
        summary: "A quiet morning at the Nilkanth Palace gorge, followed by an optional detour to the riverside town of Maheshwar on the way back to Indore.",
        activities: [
          {
            _key: "man3a",
            title: "Nilkanth Palace",
            description: "A Shiva temple occupying a former Mughal governor's pleasure palace, built deep in a wooded ravine. A small waterfall cascades through the courtyard during the monsoon.",
            location: { name: "Nilkanth Palace", lat: 22.3250, lng: 75.3850 },
            time: "08:30 AM",
            type: "sightseeing",
          },
          {
            _key: "man3b",
            title: "Maheshwar Detour (Optional)",
            description: "40 km from Mandu. The capital of Queen Ahilyabai Holkar on the Narmada River. Visit the majestic Ahilya Fort, walk the immaculate ghats, and shop for authentic Maheshwari handloom sarees.",
            location: { name: "Maheshwar", lat: 22.1764, lng: 75.5843 },
            time: "11:00 AM",
            type: "sightseeing",
          },
          {
            _key: "man3c",
            title: "Return to Indore & Depart",
            description: "Drive back from Maheshwar (or Mandu) to Indore airport (~2 hrs) for the evening flight to Mumbai/Pune.",
            time: "03:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 44. CHITRAKOOT — Ramayana pilgrim town
  {
    _id: "trip-chitrakoot-ramayana",
    title: "Chitrakoot — The Forest of the Ramayana",
    slug: "chitrakoot-mp-pilgrimage",
    excerpt:
      "Spanning the border of UP and MP, Chitrakoot ('The Hill of Many Wonders') is where Lord Rama, Sita, and Lakshmana spent 11 years of their exile. A deeply spiritual town defined by the Mandakini river, forested hillocks, and cave shrines.",
    tags: ["Pilgrimage", "Madhya Pradesh", "Ramayana", "Spiritual", "Offbeat", "Culture"],
    country: "India",
    startDate: "2027-10-15",
    endDate: "2027-10-17",
    bestSuggestedMonth: "October – March (Or during Deepavali for the grand fair)",
    status: "published",
    viewCount: 0,
    totalBudget: 10000,
    currency: "INR",
    tripType: "Spiritual & Cultural",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "chi-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Satna → Chitrakoot",
        date: "2027-10-15",
        summary: "Arrive via train to Satna, drive to Chitrakoot, check in, and experience the evening Aarti at Ramghat on the Mandakini river.",
        activities: [
          {
            _key: "chi1a",
            title: "Travel to Satna / Banda",
            description: "From Mumbai: Mahanagari Express or Kamayani Express to Satna (~16 hrs). From Pune: Pune-Patna Express to Satna. Satna to Chitrakoot is 75 km (1.5 hrs). Alternatively, fly to Prayagraj (120 km) or Khajuraho (150 km).",
            location: { name: "Satna / Chitrakoot", lat: 25.1764, lng: 80.8493 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "chi1b",
            title: "Check-in at MPT Tourist Village",
            description: "MPT Tourist Village in the MP section of Chitrakoot offers the best reliable accommodation with cottages and a veg restaurant. (₹2,500–4,000/night).",
            location: { name: "Chitrakoot", lat: 25.1764, lng: 80.8493 },
            time: "02:00 PM",
            type: "accommodation",
          },
          {
            _key: "chi1c",
            title: "Kamadgiri Parikrama",
            description: "Kamadgiri is a forested hill believed to be the original Chitrakoot. A 5 km paved parikrama (circumambulation) path circles the base, dotted with small temples and mischievous monkeys. A spiritually charged walk.",
            location: { name: "Kamadgiri", lat: 25.1680, lng: 80.8450 },
            time: "04:00 PM",
            type: "activity",
          },
          {
            _key: "chi1d",
            title: "Ramghat & Evening Mandakini Aarti",
            description: "The main ghat where Rama and Sita are said to have bathed. At dusk, priests perform an Aarti to the Mandakini River. Rent a boat (₹100) and watch the lamps float on the water while Tulsidas bhajans play.",
            location: { name: "Ramghat", lat: 25.1730, lng: 80.8520 },
            time: "06:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "chi-day2",
        dayNumber: 2,
        title: "Cave Shrines, Hidden Springs & Sati Anusuya",
        date: "2027-10-16",
        summary: "Explore the natural springs and caves associated with the epic, set deep in the dense forests of the Vindhyas.",
        activities: [
          {
            _key: "chi2a",
            title: "Gupt Godavari Caves",
            description: "A fascinating geological anomaly. A pair of caves—one high and dry, the other containing a knee-deep subterranean stream that emerges from the rocks and disappears into another hole. Legend says the Godavari river secretly emerged here to glimpse Rama.",
            location: { name: "Gupt Godavari", lat: 25.1150, lng: 80.8480 },
            time: "09:00 AM",
            type: "sightseeing",
            notes: "Expect to walk in knee-deep water. Wear shorts/rolled up pants.",
          },
          {
            _key: "chi2b",
            title: "Sati Anusuya Ashram",
            description: "Located 16 km deep in the forest. A peaceful ashram dedicated to the sage Atri and his wife Anusuya. The Mandakini river actually originates here, gushing out from the base of a cliff.",
            location: { name: "Sati Anusuya", lat: 25.1010, lng: 80.8120 },
            time: "11:30 AM",
            type: "sightseeing",
          },
          {
            _key: "chi2c",
            title: "Lunch — Pure Veg Local Thali",
            description: "Chitrakoot is a strictly vegetarian and alcohol-free zone. Annapurna Restaurant near Ramghat serves excellent, simple satvik thalis.",
            time: "01:30 PM",
            type: "food",
          },
          {
            _key: "chi2d",
            title: "Hanuman Dhara",
            description: "A steep climb of 360 steps up a hill to a shrine where a natural spring falls continuously on an idol of Hanuman. The view from the top overlooking Chitrakoot and the plains is stunning.",
            location: { name: "Hanuman Dhara", lat: 25.1950, lng: 80.8650 },
            time: "03:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "chi-day3",
        dayNumber: 3,
        title: "Sphatik Shila & Departure",
        date: "2027-10-17",
        summary: "A quiet morning at a forested riverside spot before heading back to Satna for the return journey.",
        activities: [
          {
            _key: "chi3a",
            title: "Sphatik Shila",
            description: "A massive, flat crystal-like rock by the Mandakini river where Rama and Sita are said to have sat. You can still see alleged footprints. It is extremely peaceful in the early morning, surrounded by dense forest.",
            location: { name: "Sphatik Shila", lat: 25.1610, lng: 80.8520 },
            time: "08:30 AM",
            type: "sightseeing",
          },
          {
            _key: "chi3b",
            title: "Return to Satna",
            description: "Drive 75 km back to Satna railway station for the afternoon train to Mumbai/Pune.",
            time: "11:30 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 45. BHIMBETKA — Prehistoric Rock Shelters
  {
    _id: "trip-bhimbetka-prehistoric",
    title: "Bhimbetka & Bhojpur — Journey to Prehistoric India",
    slug: "bhimbetka-rock-shelters",
    excerpt:
      "A UNESCO World Heritage site featuring over 700 rock shelters, some with cave paintings dating back 30,000 years. Combined with the massive unfinished Shiva temple at Bhojpur, this is a fascinating weekend trip into deep antiquity just an hour from Bhopal.",
    tags: ["History", "UNESCO", "Madhya Pradesh", "Caves", "Archaeology", "Bhopal", "Weekend Getaway"],
    country: "India",
    startDate: "2027-12-04",
    endDate: "2027-12-05",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 8000,
    currency: "INR",
    tripType: "History & Archaeology",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "bhm-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Bhopal → Bhimbetka",
        date: "2027-12-04",
        summary: "Arrive in Bhopal, drive to the Ratapani Wildlife Sanctuary edge, and explore the ancient Bhimbetka rock paintings.",
        activities: [
          {
            _key: "bhm1a",
            title: "Travel to Bhopal",
            description: "From Mumbai/Pune: Direct flight to Bhopal (1.5 hrs). Or take the overnight Punjab Mail / Jhelum Express to Bhopal Junction. Taxi from Bhopal to Bhimbetka is ~45 km (1 hr).",
            location: { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "bhm1b",
            title: "Check-in at MPT Highway Treat, Bhimbetka or Bhopal",
            description: "Most prefer to stay in Bhopal (e.g., Jehan Numa Palace or MPT Palash). If you want to stay near the caves, MPT Highway Treat is basic but very close.",
            location: { name: "Bhimbetka", lat: 22.9270, lng: 77.5850 },
            time: "12:00 PM",
            type: "accommodation",
          },
          {
            _key: "bhm1c",
            title: "Bhimbetka Rock Shelters (UNESCO)",
            description: "Set inside the Ratapani Wildlife Sanctuary, these massive sandstone outcrops look like a ruined fortress. A 2 km walking trail takes you past 15 shelters open to the public. The paintings (in red and white pigments) depict hunting, dancing, bison, elephants, and horse riders, spanning the Paleolithic to the Medieval period.",
            location: { name: "Bhimbetka Caves", lat: 22.9377, lng: 77.6105 },
            time: "02:30 PM",
            type: "sightseeing",
            notes: "Entry ₹25. Guide recommended (₹300) to spot the faded older paintings. Watch out for sloth bears in the dense forest at dusk.",
          },
          {
            _key: "bhm1d",
            title: "Auditorium Cave & Zoo Rock",
            description: "The 'Auditorium Cave' is massive, cathedral-like. 'Zoo Rock' contains the highest concentration of animal paintings. The 'Boar Rock' features a giant mythical boar attacking a tiny human.",
            time: "04:00 PM",
            type: "sightseeing",
          },
          {
            _key: "bhm1e",
            title: "Dinner in Bhopal — Bhopali Cuisine",
            description: "Return to Bhopal. Try traditional Bhopali food in the old city (Chatori Gali) or at Zam Zam: Mutton Paya, Nalli Nihari, and Sulemani Chai.",
            time: "08:00 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "bhm-day2",
        dayNumber: 2,
        title: "Bhojpur Temple & Sanchi Stupa (Optional)",
        date: "2027-12-05",
        summary: "Visit the colossal unfinished Shiva temple at Bhojpur, and optionally extend the day to the Buddhist Stupas of Sanchi before departing.",
        activities: [
          {
            _key: "bhm2a",
            title: "Bhojpur Shiva Temple",
            description: "28 km from Bhopal. Founded by King Bhoj in the 11th century but left unfinished. It houses one of the largest Shiva Lingas in India (7.5 feet tall, carved from a single rock) inside a massive cyclopean stone structure. The earthen ramp used to haul the stones still remains.",
            location: { name: "Bhojpur", lat: 23.0970, lng: 77.5750 },
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "bhm2b",
            title: "Sanchi Stupa (Optional Detour)",
            description: "If you have an evening flight, drive 46 km north of Bhopal to Sanchi. The Great Stupa built by Ashoka in the 3rd century BCE is the oldest stone structure in India, featuring intricately carved toranas (gateways).",
            location: { name: "Sanchi", lat: 23.4792, lng: 77.7397 },
            time: "12:30 PM",
            type: "sightseeing",
          },
          {
            _key: "bhm2c",
            title: "Return to Bhopal & Depart",
            description: "Head to Raja Bhoj Airport or Bhopal Junction for the journey home.",
            time: "05:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 46. AMARKANTAK — Source of the Narmada
  {
    _id: "trip-amarkantak-narmada",
    title: "Amarkantak — The Mystical Source of the Narmada",
    slug: "amarkantak-narmada-source",
    excerpt:
      "At 1048m in the Maikal Hills where the Vindhya and Satpura ranges meet, Amarkantak is heavily forested, deeply spiritual, and exceptionally tranquil. It is the birthplace of the Narmada and Son rivers, featuring ancient temples, thundering waterfalls, and medicinal plant forests.",
    tags: ["Pilgrimage", "Nature", "Waterfalls", "Madhya Pradesh", "Amarkantak", "Offbeat", "Forest"],
    country: "India",
    startDate: "2027-02-18",
    endDate: "2027-02-20",
    bestSuggestedMonth: "September – March",
    status: "published",
    viewCount: 0,
    totalBudget: 11000,
    currency: "INR",
    tripType: "Spiritual & Nature",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "ama-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Pendra Road → Amarkantak",
        date: "2027-02-18",
        summary: "Overnight train to Pendra Road, drive up into the Maikal hills to Amarkantak, and visit the sacred Narmada Kund.",
        activities: [
          {
            _key: "ama1a",
            title: "Train to Pendra Road & Drive",
            description: "From Mumbai/Pune: The most convenient railhead is Pendra Road (PND) in Chhattisgarh, accessible via the Howrah Mail or Jnaneswari Delx. From Pendra Road, it’s a 40 km (1 hr) scenic drive up the ghats to Amarkantak. Alternatively, fly to Jabalpur and drive 220 km (5 hrs).",
            location: { name: "Pendra Road / Amarkantak", lat: 22.6780, lng: 81.7580 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "ama1b",
            title: "Check-in at MPT Holiday Homes",
            description: "MP Tourism runs a reliable, clean property with a veg restaurant. There are also many Dharamshalas for budget pilgrims. Budget: ₹2,000–3,500/night.",
            location: { name: "Amarkantak", lat: 22.6780, lng: 81.7580 },
            time: "01:00 PM",
            type: "accommodation",
          },
          {
            _key: "ama1c",
            title: "Narmada Kund & Evening Aarti",
            description: "A walled temple complex enclosing the sacred spring that is the source of the Narmada River. It contains 16 stone temples. The evening Aarti here is intimate, echoing with bells and chants in the cool hill air.",
            location: { name: "Narmada Kund", lat: 22.6765, lng: 81.7565 },
            time: "04:30 PM",
            type: "sightseeing",
          },
          {
            _key: "ama1d",
            title: "Sri Yantra Maha Meru Temple",
            description: "A massive, ongoing architectural project. The temple is built in the exact 3D geometry of the Sri Yantra mandala. The entrance is a colossal face of a Goddess.",
            location: { name: "Sri Yantra Temple", lat: 22.6710, lng: 81.7520 },
            time: "06:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "ama-day2",
        dayNumber: 2,
        title: "Waterfalls, Kalachuri Temples & Mai ki Bagiya",
        date: "2027-02-19",
        summary: "Explore the ancient 11th-century Kalachuri temples, the medicinal gardens, and the spectacular waterfalls where the Narmada begins its descent from the hills.",
        activities: [
          {
            _key: "ama2a",
            title: "Ancient Temples of Kalachuri",
            description: "Just behind the Narmada Kund is a complex of beautifully carved 11th-century stone temples built by the Kalachuri Maharaja Karnadeva. Maintained by ASI, they resemble a miniature Khajuraho.",
            location: { name: "Kalachuri Temples", lat: 22.6770, lng: 81.7570 },
            time: "08:30 AM",
            type: "sightseeing",
          },
          {
            _key: "ama2b",
            title: "Mai ki Bagiya (Mother's Garden)",
            description: "A natural grove of mango, banana, and other fruit trees dedicated to the goddess Narmada. It is rich with medicinal plants (Gulbakavali). Very serene.",
            location: { name: "Mai ki Bagiya", lat: 22.6820, lng: 81.7650 },
            time: "10:30 AM",
            type: "sightseeing",
          },
          {
            _key: "ama2c",
            title: "Lunch — Simple Satvik Food",
            description: "Amarkantak is strictly veg. Small dhabas near the Narmada Kund serve excellent hot rotis, dal fry, and fresh sabzi.",
            time: "12:30 PM",
            type: "food",
          },
          {
            _key: "ama2d",
            title: "Kapildhara & Dugdhdhara Waterfalls",
            description: "6 km from town, the newborn Narmada plunges 100 feet down a sheer cliff at Kapildhara. A 1 km trek down stone stairs through dense forest takes you to Dugdhdhara (Milk Fall), a lower, wider cascade where Sage Durvasa meditated.",
            location: { name: "Kapildhara", lat: 22.6950, lng: 81.7220 },
            time: "02:30 PM",
            type: "activity",
            notes: "Beware of aggressive macaques along the waterfall paths. Do not carry open food.",
          },
        ],
      },
      {
        _key: "ama-day3",
        dayNumber: 3,
        title: "Kabir Chabutra & Departure",
        date: "2027-02-20",
        summary: "Visit the spot where mystic poet Kabir meditated, marking the border of MP and Chhattisgarh, before returning to Pendra Road.",
        activities: [
          {
            _key: "ama3a",
            title: "Kabir Chabutra",
            description: "5 km from town on the MP-Chhattisgarh border. A simple white platform surrounded by Sal trees where Sant Kabir is said to have meditated and achieved enlightenment. The forest here is dense and quiet.",
            location: { name: "Kabir Chabutra", lat: 22.7050, lng: 81.7850 },
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "ama3b",
            title: "Return to Pendra Road",
            description: "Drive down the ghats back to Pendra Road station to catch the train to Mumbai/Pune, or drive to Jabalpur for a flight.",
            time: "12:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 47. PATALKOT VALLEY — Hidden tribal valley
  {
    _id: "trip-patalkot-valley",
    title: "Patalkot Valley — Into the Hidden Horseshoe",
    slug: "patalkot-valley-tribal",
    excerpt:
      "A deep, 1,200 ft horseshoe-shaped valley in the Satpura range that is so dense that sunlight barely reaches the bottom. It is home to the Bharia and Gond tribes who lived in near-total isolation for centuries. A starkly beautiful, off-the-grid adventure.",
    tags: ["Nature", "Tribal Culture", "Madhya Pradesh", "Trekking", "Offbeat", "Forest"],
    country: "India",
    startDate: "2027-10-22",
    endDate: "2027-10-24",
    bestSuggestedMonth: "October – February",
    status: "published",
    viewCount: 0,
    totalBudget: 9000,
    currency: "INR",
    tripType: "Adventure & Culture",
    readingTime: 7,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "pat-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Nagpur → Tamia",
        date: "2027-10-22",
        summary: "Arrive in Nagpur, drive up the scenic Satpura ghats to the hill station of Tamia, the gateway to Patalkot.",
        activities: [
          {
            _key: "pat1a",
            title: "Travel to Nagpur & Drive to Tamia",
            description: "From Mumbai/Pune: Direct flight to Nagpur (1.5 hrs) or overnight train (Duronto/Garib Rath). From Nagpur, hire a taxi and drive 180 km (4 hrs) via Chhindwara to the colonial-era hill station of Tamia.",
            location: { name: "Nagpur / Tamia", lat: 22.3486, lng: 78.6738 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "pat1b",
            title: "Check-in at MPT Motel, Tamia",
            description: "MP Tourism's Motel Tamia is perched right on the edge of a cliff overlooking the vast forested valley. It offers the best views in the region. (₹2,500–3,500/night).",
            location: { name: "Tamia", lat: 22.3486, lng: 78.6738 },
            time: "02:00 PM",
            type: "accommodation",
          },
          {
            _key: "pat1c",
            title: "Sunset at Tamia Viewpoint",
            description: "A short walk from the hotel to Sunset Point. The view of the horseshoe-shaped Patalkot gorge far below, heavily forested with Sal and Teak, is breathtaking.",
            time: "05:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "pat-day2",
        dayNumber: 2,
        title: "Descent into Patalkot & Tribal Hamlets",
        date: "2027-10-23",
        summary: "Drive to the rim of Patalkot, descend into the valley via steep stairs, and interact with the Bharia tribal communities who are masters of herbal medicine.",
        activities: [
          {
            _key: "pat2a",
            title: "Drive to Patalkot Viewpoint (Chimtipur)",
            description: "A 25 km drive from Tamia brings you to the rim of Patalkot at Chimtipur. From the observation deck, the Dudhi river can be seen snake-ing through the deep valley.",
            location: { name: "Chimtipur", lat: 22.4200, lng: 78.7500 },
            time: "08:30 AM",
            type: "sightseeing",
          },
          {
            _key: "pat2b",
            title: "Trek into the Valley",
            description: "Descend into the valley using the recently built steep staircases (it used to be accessible only by ropes and vines). The temperature drops noticeably as you descend into the dense forest.",
            time: "09:30 AM",
            type: "activity",
            notes: "The climb back up is strenuous. Carry plenty of water and wear good trekking shoes.",
          },
          {
            _key: "pat2c",
            title: "Bharia Tribal Villages & Herbal Medicine",
            description: "Visit the hamlets of Rated, Chhindametri, or Gaildubba at the bottom. The Bharia tribe are renowned herbalists. You can learn about rare medicinal plants (like the magical 'Sanjeevani' roots) they gather from the forest.",
            location: { name: "Patalkot Valley Floor", lat: 22.4300, lng: 78.7600 },
            time: "11:30 AM",
            type: "activity",
          },
          {
            _key: "pat2d",
            title: "Lunch — Local Tribal Fare",
            description: "Share a simple, authentic meal arranged by local guides (must be pre-booked) featuring Kodon-Kutki (millets), wild mushrooms, and mahua.",
            time: "01:30 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "pat-day3",
        dayNumber: 3,
        title: "Little Mahadev Cave & Departure",
        date: "2027-10-24",
        summary: "Visit a hidden cave temple deep in the Tamia forest before driving back to Nagpur.",
        activities: [
          {
            _key: "pat3a",
            title: "Chhota Mahadev (Little Mahadev) Cave",
            description: "A short, steep 2 km trek from Tamia town leads to a cave hidden under a massive overhanging rock, featuring a small waterfall that drips continuously onto a Shiva Linga.",
            location: { name: "Chhota Mahadev", lat: 22.3550, lng: 78.6800 },
            time: "08:30 AM",
            type: "sightseeing",
          },
          {
            _key: "pat3b",
            title: "Return to Nagpur & Depart",
            description: "Drive back to Nagpur (4 hrs) to catch the afternoon flight or evening train back to Mumbai/Pune.",
            time: "12:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 48. PANNA — Tigers & Diamonds
  {
    _id: "trip-panna-tigers",
    title: "Panna — Tigers, Vultures & Diamonds on the Ken",
    slug: "panna-tiger-reserve-safari",
    excerpt:
      "A stunning tiger reserve characterized by the emerald green Ken River, deep gorges, and cascading waterfalls. Panna is a massive conservation success story, bringing its tiger population back from zero. The town is also famous for its active diamond mines.",
    tags: ["Wildlife", "Safari", "Madhya Pradesh", "Tigers", "Nature", "Photography"],
    country: "India",
    startDate: "2027-03-10",
    endDate: "2027-03-12",
    bestSuggestedMonth: "February – May (For best tiger sightings)",
    status: "published",
    viewCount: 0,
    totalBudget: 18000,
    currency: "INR",
    tripType: "Wildlife Safari",
    readingTime: 7,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "pan-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Khajuraho → Panna",
        date: "2027-03-10",
        summary: "Fly into Khajuraho, drive to the Panna tiger reserve, check in to a jungle lodge, and take an afternoon safari.",
        activities: [
          {
            _key: "pan1a",
            title: "Travel to Khajuraho & Drive to Panna",
            description: "From Mumbai/Pune: Fly to Khajuraho via Delhi, or take the overnight train to Satna. Panna National Park is just 45 km (1 hr) from Khajuraho, making it highly accessible.",
            location: { name: "Khajuraho / Panna", lat: 24.7113, lng: 80.1873 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "pan1b",
            title: "Check-in at Ken River Lodge / MPT Jungle Camp",
            description: "Ken River Lodge (Pugdundee Safaris) offers luxurious treehouses right on the riverbank. MPT Jungle Camp at Madla is an excellent, more affordable alternative.",
            location: { name: "Madla Gate, Panna", lat: 24.7113, lng: 80.1873 },
            time: "12:30 PM",
            type: "accommodation",
          },
          {
            _key: "pan1c",
            title: "Afternoon Jungle Safari (Madla Zone)",
            description: "Enter the park via the Madla gate. The terrain here is beautiful—plateaus, gorges, and the Ken river. Look out for Tigers, Leopards, Sloth Bears, and the massive Indian Crocodile (Mugger) basking on the river banks.",
            time: "03:00 PM",
            type: "activity",
            notes: "Book safaris via the MP Forest website well in advance. Carry dust masks and binoculars.",
          },
        ],
      },
      {
        _key: "pan-day2",
        dayNumber: 2,
        title: "Vulture Gorge, Boating & Diamond Mines",
        date: "2027-03-11",
        summary: "A full day featuring a morning safari focusing on the spectacular vulture gorges, a boat ride on the Ken river, and a visit to India's only active diamond mines.",
        activities: [
          {
            _key: "pan2a",
            title: "Morning Safari (Hinouta Zone) & Vulture Point",
            description: "Drive deep into the park to the steep gorges of the Ken River. Panna is one of the best places in India to see critically endangered vulture species (Long-billed, White-backed, Himalayan Griffon) nesting on the sheer cliff faces.",
            location: { name: "Hinouta Gate", lat: 24.6500, lng: 80.2000 },
            time: "06:00 AM",
            type: "activity",
          },
          {
            _key: "pan2b",
            title: "Boat Ride on the Ken River",
            description: "An hour-long boat ride operated by the forest department. It's the best way to see massive crocodiles up close and spot water birds. The reflections of the forest in the emerald water are stunning.",
            time: "11:00 AM",
            type: "activity",
          },
          {
            _key: "pan2c",
            title: "Lunch at the Lodge",
            description: "Rest and eat at your jungle lodge during the hot midday hours.",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "pan2d",
            title: "Majhgawan Diamond Mines",
            description: "Drive to the NMDC Diamond Mines, the only mechanized diamond mine in Asia. You can view the massive open-cast pit (special permission sometimes required) and buy small, certified rough or polished diamonds from local jewelers in Panna town.",
            location: { name: "Majhgawan", lat: 24.6250, lng: 80.1700 },
            time: "03:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "pan-day3",
        dayNumber: 3,
        title: "Pandav Falls & Departure",
        date: "2027-03-12",
        summary: "Visit a spectacular waterfall and cave complex associated with the Mahabharata before departing via Khajuraho.",
        activities: [
          {
            _key: "pan3a",
            title: "Pandav Falls & Caves",
            description: "Located right on the highway back to Khajuraho. A 30m high waterfall cascading into a heart-shaped pool, surrounded by ancient caves where the Pandavas supposedly hid during their exile.",
            location: { name: "Pandav Falls", lat: 24.7500, lng: 80.0500 },
            time: "08:30 AM",
            type: "sightseeing",
          },
          {
            _key: "pan3b",
            title: "Return to Khajuraho & Depart",
            description: "Drive the remaining 30 mins to Khajuraho airport or station for the journey back to Mumbai/Pune.",
            time: "12:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 49. TIRATHGARH FALLS — Bastar's Tiered Wonder
  {
    _id: "trip-tirathgarh-bastar",
    title: "Tirathgarh Falls & Kanger Valley — The Bastar Wilderness",
    slug: "tirathgarh-kanger-valley-chhattisgarh",
    excerpt:
      "Tirathgarh is a spectacular block-type waterfall that plunges 300 feet in milky white cascades over terraced rocks. Located inside the dense Kanger Valley National Park in the tribal heartland of Bastar, Chhattisgarh.",
    tags: ["Waterfalls", "Nature", "Chhattisgarh", "Caves", "Offbeat", "Forest"],
    country: "India",
    startDate: "2027-11-20",
    endDate: "2027-11-22",
    bestSuggestedMonth: "October – February",
    status: "published",
    viewCount: 0,
    totalBudget: 11000,
    currency: "INR",
    tripType: "Nature & Adventure",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "tir-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Raipur → Jagdalpur",
        date: "2027-11-20",
        summary: "Fly to Raipur, drive down to Jagdalpur (the capital of Bastar), and settle in for a deep forest adventure.",
        activities: [
          {
            _key: "tir1a",
            title: "Travel to Raipur & Drive to Jagdalpur",
            description: "From Mumbai/Pune: Direct flight to Swami Vivekananda Airport, Raipur (2 hrs). From Raipur, hire a taxi or take a luxury bus to Jagdalpur (280 km, 6 hrs) through the heavily forested Keshkal Ghats.",
            location: { name: "Raipur / Jagdalpur", lat: 19.0733, lng: 82.0239 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "tir1b",
            title: "Check-in at Dandami Luxury Resort / Naman Bastar",
            description: "Dandami (run by CG Tourism) is excellent and very close to Chitrakoot falls, but for Tirathgarh, staying in Jagdalpur town (e.g., Naman Bastar Resort) is more central. (₹3,000–4,500/night).",
            location: { name: "Jagdalpur", lat: 19.0733, lng: 82.0239 },
            time: "03:00 PM",
            type: "accommodation",
          },
          {
            _key: "tir1c",
            title: "Evening at Dalpat Sagar",
            description: "Relax after the long drive at Dalpat Sagar, the largest artificial lake in Chhattisgarh, built 400 years ago. Beautiful sunset spot.",
            time: "05:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "tir-day2",
        dayNumber: 2,
        title: "Kanger Valley National Park & Tirathgarh Falls",
        date: "2027-11-21",
        summary: "A full day inside the dense Kanger Valley, exploring the magnificent Tirathgarh cascades and the subterranean Kutumsar caves.",
        activities: [
          {
            _key: "tir2a",
            title: "Tirathgarh Waterfalls",
            description: "35 km from Jagdalpur. The Kanger river plunges 300 feet over limestone steps, splitting into multiple milky white streams. You can walk right down to the base and bathe in the cool pools. There is a small Shiva-Parvati temple at the top.",
            location: { name: "Tirathgarh Falls", lat: 18.9130, lng: 81.8650 },
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "tir2b",
            title: "Kutumsar Caves",
            description: "Located deep inside Kanger Valley NP. A 330m long subterranean limestone cave. You must descend via narrow stairs into pitch darkness (forest guards provide solar lamps). Famous for massive stalactite formations and genetically blind cave fish.",
            location: { name: "Kutumsar Caves", lat: 18.8780, lng: 81.9300 },
            time: "12:00 PM",
            type: "activity",
            notes: "Not recommended for those with severe claustrophobia.",
          },
          {
            _key: "tir2c",
            title: "Lunch — Bastar Thali",
            description: "Have lunch in Jagdalpur. Try local Bastar specialties like Chapda (red ant) chutney (if you're adventurous!), bamboo shoot sabzi, and rice beer (Salphi).",
            time: "02:30 PM",
            type: "food",
          },
          {
            _key: "tir2d",
            title: "Kanger Dhara",
            description: "Another beautiful, smaller, and wider cascade inside the national park. Very peaceful and excellent for photography.",
            time: "04:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "tir-day3",
        dayNumber: 3,
        title: "Bastar Palace & Departure",
        date: "2027-11-22",
        summary: "Visit the historic Bastar Palace before embarking on the long drive back to Raipur.",
        activities: [
          {
            _key: "tir3a",
            title: "Bastar Palace & Anthropological Museum",
            description: "Visit the residence of the former Kakatiya rulers of Bastar. The adjacent Anthropological Museum provides excellent context on the Muria, Maria, and Gond tribes of the region.",
            location: { name: "Bastar Palace", lat: 19.0800, lng: 82.0300 },
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "tir3b",
            title: "Return to Raipur & Depart",
            description: "Drive 6 hours back to Raipur airport for the evening flight to Mumbai/Pune.",
            time: "11:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 50. CHITRAKOOT FALLS — The Niagara of India
  {
    _id: "trip-chitrakoot-falls-cg",
    title: "Chitrakoot Falls — The Thundering 'Niagara of India'",
    slug: "chitrakoot-waterfall-bastar",
    excerpt:
      "At nearly 300 meters across during the monsoon, the horseshoe-shaped Chitrakoot Falls on the Indravati river is the widest waterfall in India. An awe-inspiring display of raw natural power set in the deep Bastar forests.",
    tags: ["Waterfalls", "Nature", "Chhattisgarh", "Monsoon", "Offbeat", "Photography"],
    country: "India",
    startDate: "2027-08-25",
    endDate: "2027-08-27",
    bestSuggestedMonth: "July – October (For maximum volume)",
    status: "published",
    viewCount: 0,
    totalBudget: 12000,
    currency: "INR",
    tripType: "Nature & Photography",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "chc-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Raipur → Chitrakoot",
        date: "2027-08-25",
        summary: "Fly to Raipur, drive to the Indravati river in Bastar, and check into a resort sitting right on the edge of the falls.",
        activities: [
          {
            _key: "chc1a",
            title: "Travel to Raipur & Drive",
            description: "Fly to Raipur (RPR). Drive via National Highway 30 towards Jagdalpur. About 40 km before Jagdalpur, take the detour to Chitrakoot. Total drive: ~290 km (6 hrs).",
            location: { name: "Raipur / Chitrakoot", lat: 19.2085, lng: 81.7169 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "chc1b",
            title: "Check-in at Dandami Luxury Resort",
            description: "Run by Chhattisgarh Tourism, this resort is located directly opposite the falls. You can hear the roar from your room, and the viewing deck offers an unhindered panorama. (₹3,500–5,000/night).",
            location: { name: "Dandami Resort", lat: 19.2085, lng: 81.7169 },
            time: "03:30 PM",
            type: "accommodation",
            notes: "Must book well in advance during monsoon.",
          },
          {
            _key: "chc1c",
            title: "Sunset over the Falls",
            description: "Walk down to the observation deck. The setting sun often creates brilliant rainbows in the mist kicked up by the plunging Indravati river.",
            time: "05:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "chc-day2",
        dayNumber: 2,
        title: "Boating to the Base & Narayanpal Temple",
        date: "2027-08-26",
        summary: "Get up close to the raging waterfall via local paddle boats, and visit an ancient riverside temple in the afternoon.",
        activities: [
          {
            _key: "chc2a",
            title: "Paddle Boat Ride to the Falls Base",
            description: "Local boatmen take you in small paddle boats terrifyingly close to the base of the thundering falls (only available when water levels are safe, usually post-monsoon). The sheer scale and noise are exhilarating.",
            location: { name: "Base of Chitrakoot", lat: 19.2080, lng: 81.7170 },
            time: "09:00 AM",
            type: "activity",
          },
          {
            _key: "chc2b",
            title: "Explore the Riverbanks & Shivalingas",
            description: "Walk along the lower banks of the river. There are several small Shiva Lingas carved into the bedrock which get submerged during peak monsoon.",
            time: "11:00 AM",
            type: "sightseeing",
          },
          {
            _key: "chc2c",
            title: "Lunch at the Resort",
            description: "Enjoy a relaxed lunch at the Dandami resort restaurant overlooking the falls.",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "chc2d",
            title: "Narayanpal Temple",
            description: "A short 15 km drive brings you to the 11th-century Narayanpal Temple on the banks of the Indravati river. It’s a beautiful, solitary, intricately carved Vishnu temple built by the Chindak Nagavanshi kings.",
            location: { name: "Narayanpal", lat: 19.1500, lng: 81.8000 },
            time: "03:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "chc-day3",
        dayNumber: 3,
        title: "Morning Mist & Departure",
        date: "2027-08-27",
        summary: "Enjoy the misty morning views before driving back to Raipur.",
        activities: [
          {
            _key: "chc3a",
            title: "Sunrise Photography",
            description: "Wake up early when the falls are swathed in thick mist and the crowds are zero. Perfect time for long-exposure photography.",
            time: "06:30 AM",
            type: "activity",
          },
          {
            _key: "chc3b",
            title: "Return to Raipur & Depart",
            description: "Drive back up the highway to Raipur (6 hrs) for the return flight/train.",
            time: "10:30 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 51. BASTAR — Tribal Heartland & Weekly Haats
  {
    _id: "trip-bastar-tribal-haats",
    title: "Bastar — Dhokra Art & Weekly Haat Markets",
    slug: "bastar-tribal-culture-haat",
    excerpt:
      "Deep inside Chhattisgarh lies Bastar, a region defined by its vibrant indigenous cultures. Explore Kondagaon (the hub of Dhokra bell-metal casting) and the incredibly colourful weekly Haat markets where tribes gather to trade forest produce.",
    tags: ["Culture", "Tribal", "Chhattisgarh", "Art", "Handicrafts", "Photography", "Offbeat"],
    country: "India",
    startDate: "2027-01-14",
    endDate: "2027-01-17",
    bestSuggestedMonth: "October – March (Coincide with Bastar Dussehra if possible)",
    status: "published",
    viewCount: 0,
    totalBudget: 14000,
    currency: "INR",
    tripType: "Culture & Handicrafts",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "bas-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Raipur → Kondagaon",
        date: "2027-01-14",
        summary: "Fly to Raipur and drive south to Kondagaon, the center of Bastar's famous bell-metal and wrought-iron handicrafts.",
        activities: [
          {
            _key: "bas1a",
            title: "Travel to Raipur & Drive to Kondagaon",
            description: "Fly to Raipur. Hire a taxi and drive towards Jagdalpur on NH30. Stop at Kondagaon (210 km, 4.5 hrs).",
            location: { name: "Kondagaon", lat: 19.5960, lng: 81.6660 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "bas1b",
            title: "Check-in at a local Guesthouse or drive to Jagdalpur",
            description: "Kondagaon has basic guesthouses (like Shabari Resort). For better amenities, continue 70 km to Jagdalpur and check into Naman Bastar or Bastar Jungle Resort.",
            time: "02:00 PM",
            type: "accommodation",
          },
          {
            _key: "bas1c",
            title: "Dhokra Art Workshops in Shilpgram",
            description: "Kondagaon is renowned for 'Dhokra' (lost wax bell-metal casting) and wrought iron craft. Visit the workshops of master craftsmen like Jaidev Baghel's family. You can watch the fascinating casting process and buy incredible pieces directly from the artisans.",
            location: { name: "Kondagaon Shilpgram", lat: 19.5960, lng: 81.6660 },
            time: "03:30 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "bas-day2",
        dayNumber: 2,
        title: "The Weekly Tribal Haat",
        date: "2027-01-15",
        summary: "Immerse yourself in a weekly tribal market (Haat)—a sensory explosion of color, sound, and local produce.",
        activities: [
          {
            _key: "bas2a",
            title: "Visit a Weekly Haat (e.g., Lohandiguda or Tokapal)",
            description: "Different villages host markets on different days (e.g., Lohandiguda on Fridays). These are the social lifelines of the Muria and Maria tribes. Witness the barter system, the sale of Mahua liquor, forest honey, red ants, handmade knives, and vibrant tribal jewelry.",
            location: { name: "Bastar Tribal Haat", lat: 19.1000, lng: 81.8000 },
            time: "10:00 AM",
            type: "activity",
            notes: "Be extremely respectful when taking photographs. Always ask for permission or hire a local guide.",
          },
          {
            _key: "bas2b",
            title: "Lunch — Salphi & Local Snacks",
            description: "Try local street food at the haat. 'Salphi' is the local beer extracted from the fishtail palm tree. Have it fresh in the morning.",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "bas2c",
            title: "Danteshwari Temple, Dantewada (Optional Drive)",
            description: "Drive 80 km south to Dantewada. The Danteshwari Temple is one of the 52 Shakti Peethas. The patron goddess of the Kakatiya kings is worshipped here by a massive tribal congregation during Bastar Dussehra.",
            location: { name: "Dantewada", lat: 18.9050, lng: 81.3520 },
            time: "03:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "bas-day3",
        dayNumber: 3,
        title: "Anthropological Museum & Tribal Homestay",
        date: "2027-01-16",
        summary: "Deepen your understanding of Bastar's culture at the museum and experience a tribal village walk.",
        activities: [
          {
            _key: "bas3a",
            title: "Anthropological Museum of Jagdalpur",
            description: "Located near the Zila Panchayat office. It provides an excellent, curated look into the clothing, weapons, tools, and belief systems of the various tribes of Bastar.",
            location: { name: "Jagdalpur", lat: 19.0733, lng: 82.0239 },
            time: "09:30 AM",
            type: "sightseeing",
          },
          {
            _key: "bas3b",
            title: "Tribal Village Walk (e.g., Amcho Bastar tour)",
            description: "Take a guided, ethical village walk arranged by responsible local operators (like 'Unexplored Bastar'). Learn about the 'Ghotul' system, observe traditional weaving, and interact with the villagers.",
            time: "11:30 AM",
            type: "activity",
          },
          {
            _key: "bas3c",
            title: "Dinner — Traditional Bastar Feast",
            description: "A pre-arranged dinner featuring local delicacies cooked over a wood fire.",
            time: "07:30 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "bas-day4",
        dayNumber: 4,
        title: "Return Journey via Keshkal Ghat",
        date: "2027-01-17",
        summary: "Drive back to Raipur, stopping at the scenic Keshkal Ghats.",
        activities: [
          {
            _key: "bas4a",
            title: "Keshkal Valley Viewpoint",
            description: "Stop on the highway at Keshkal Ghats. The road features 12 sharp hairpin bends and a viewing tower that offers a sweeping panorama of the dense Bastar forests you are leaving behind.",
            location: { name: "Keshkal Ghat", lat: 20.0833, lng: 81.5833 },
            time: "09:30 AM",
            type: "sightseeing",
          },
          {
            _key: "bas4b",
            title: "Arrival in Raipur & Depart",
            description: "Arrive at Swami Vivekananda Airport in Raipur for the afternoon flight to Mumbai/Pune.",
            time: "01:30 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NORTHEAST INDIA
  // ─────────────────────────────────────────────────────────────────────────

  // 52. ZIRO VALLEY — Apatani tribal rice-paddy valley
  {
    _id: "trip-ziro-valley",
    title: "Ziro Valley — The Land of the Apatanis",
    slug: "ziro-valley-apatani",
    excerpt:
      "A lush green paradise in Arunachal Pradesh, famous for its pine-clad hills and meticulously terraced rice fields. Home to the Apatani tribe, known for their unique agricultural practices, facial tattoos, and the massive Ziro Festival of Music.",
    tags: ["Culture", "Nature", "Northeast", "Arunachal Pradesh", "Tribal", "Offbeat"],
    country: "India",
    startDate: "2027-09-25",
    endDate: "2027-09-29",
    bestSuggestedMonth: "September (for Ziro Music Festival) or March–May",
    status: "published",
    viewCount: 0,
    totalBudget: 16000,
    currency: "INR",
    tripType: "Culture & Nature",
    readingTime: 7,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/ziro-valley.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "ziro-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Guwahati → Itanagar/Naharlagun",
        date: "2027-09-25",
        summary: "Fly to Guwahati and take an overnight train to Naharlagun, the gateway to Arunachal.",
        activities: [
          {
            _key: "ziro1a",
            title: "Fly to Guwahati & Donyi Polo Express",
            description: "From Mumbai/Pune: Fly to Guwahati (GAU). From Guwahati railway station, take the overnight Donyi Polo Express to Naharlagun (near Itanagar). Alternatively, fly directly to Hollongi Airport (Itanagar) if flights are available.",
            location: { name: "Guwahati / Naharlagun", lat: 27.1000, lng: 93.6167 },
            time: "Afternoon",
            type: "transport",
            notes: "Inner Line Permit (ILP) is mandatory for Indian tourists entering Arunachal Pradesh. Apply online in advance.",
          },
        ],
      },
      {
        _key: "ziro-day2",
        dayNumber: 2,
        title: "Drive to Ziro & Check-in",
        date: "2027-09-26",
        summary: "A scenic, winding drive up into the misty hills to reach the Ziro Valley.",
        activities: [
          {
            _key: "ziro2a",
            title: "Drive Naharlagun to Ziro",
            description: "Hire a shared Sumo or private taxi from Naharlagun to Ziro (115 km, ~4 hrs). The road is beautiful, passing through thick bamboo and pine forests.",
            time: "08:00 AM",
            type: "transport",
          },
          {
            _key: "ziro2b",
            title: "Check-in at Ziro Valley Resort or Siiro Resort",
            description: "Stay in traditional bamboo cottages. Ziro Valley Resort offers great views of the paddy fields. (₹2,500–4,500/night). Homestays with Apatani families are also highly recommended.",
            location: { name: "Ziro Valley", lat: 27.5350, lng: 93.8260 },
            time: "01:00 PM",
            type: "accommodation",
          },
          {
            _key: "ziro2c",
            title: "Lunch — Traditional Apatani Thali",
            description: "Try a traditional meal at a homestay. It usually includes rice, boiled vegetables, bamboo shoot, smoked pork (optional), and Apong (rice beer).",
            time: "02:00 PM",
            type: "food",
          },
          {
            _key: "ziro2d",
            title: "Walk through Hong Village",
            description: "Hong is one of the largest villages in Asia. Walk through the narrow lanes lined with traditional bamboo houses on stilts. Meet elderly Apatani women with their distinctive facial tattoos and nose plugs.",
            time: "04:00 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "ziro-day3",
        dayNumber: 3,
        title: "Paddy Field Fish Farming & Shiva Linga",
        date: "2027-09-27",
        summary: "Explore the unique sustainable agriculture of the valley and visit a massive rock formation.",
        activities: [
          {
            _key: "ziro3a",
            title: "Apatani Paddy cum Fish Cultivation",
            description: "The Apatanis practice a highly evolved, sustainable system of farming where they rear fish in the water of their terraced rice fields. The visual of the flat valley floor covered in shimmering green paddies is iconic.",
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "ziro3b",
            title: "Tarin Fish Farm",
            description: "A high-altitude fish farm that supplies fingerlings to the local farmers. Beautiful setting amidst pine trees.",
            time: "11:30 AM",
            type: "sightseeing",
          },
          {
            _key: "ziro3c",
            title: "Meghna Cave Temple (Optional)",
            description: "A 5,000-year-old ancient temple dedicated to Lord Shiva, rediscovered in 1962. It requires a climb of about 300 steps but offers a stunning panoramic view of the valley.",
            time: "03:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "ziro-day4",
        dayNumber: 4,
        title: "Return Journey via Guwahati",
        date: "2027-09-28",
        summary: "Drive back down to Naharlagun to catch the return train.",
        activities: [
          {
            _key: "ziro4a",
            title: "Drive to Naharlagun & Donyi Polo Express",
            description: "Drive back to Naharlagun station to catch the evening train back to Guwahati.",
            time: "12:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 53. DZUKOU VALLEY — Nagaland
  {
    _id: "trip-dzukou-valley",
    title: "Dzukou Valley — Trek to the Valley of Flowers",
    slug: "dzukou-valley-trek-nagaland",
    excerpt:
      "A high-altitude valley on the border of Nagaland and Manipur, known for its rolling green, velvety hills and the rare Dzukou Lily. It looks like a painting and is one of the most beautiful, pristine treks in Northeast India.",
    tags: ["Trekking", "Nature", "Northeast", "Nagaland", "Adventure", "Landscape"],
    country: "India",
    startDate: "2027-06-15",
    endDate: "2027-06-18",
    bestSuggestedMonth: "June – July (for lilies) or October (for clear skies)",
    status: "published",
    viewCount: 0,
    totalBudget: 12000,
    currency: "INR",
    tripType: "Trekking & Adventure",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/dzukou-valley.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "dzu-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Dimapur → Kohima",
        date: "2027-06-15",
        summary: "Fly to Dimapur and drive up to the capital city of Kohima to acclimatize.",
        activities: [
          {
            _key: "dzu1a",
            title: "Fly to Dimapur & Drive to Kohima",
            description: "From Mumbai/Pune: Fly to Dimapur Airport (DMU) via Kolkata. From Dimapur, take a shared taxi to Kohima (70 km, ~2.5 hrs). Kohima is at an altitude of 1,444m.",
            location: { name: "Kohima", lat: 25.6701, lng: 94.1077 },
            time: "Afternoon",
            type: "transport",
            notes: "ILP is required for Nagaland.",
          },
          {
            _key: "dzu1b",
            title: "Check-in & Kohima War Cemetery",
            description: "Stay in a homestay or hotel in Kohima (e.g., Razhu Pru). If time permits, visit the beautifully maintained WWII cemetery in the center of town.",
            time: "03:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "dzu-day2",
        dayNumber: 2,
        title: "Trek to Dzukou Valley",
        date: "2027-06-16",
        summary: "A challenging but highly rewarding trek up to the valley floor.",
        activities: [
          {
            _key: "dzu2a",
            title: "Drive to Viswema Village",
            description: "Drive 25 km from Kohima to Viswema village. Hire a local 4x4 pickup truck (Sumo) to take you up the extremely rough dirt road to the trek starting point.",
            time: "07:00 AM",
            type: "transport",
          },
          {
            _key: "dzu2b",
            title: "The Steep Climb",
            description: "The trek begins with a very steep, near-vertical climb up stone stairs through dense mossy forest for about 1 hour. This is the hardest part of the trek.",
            time: "08:30 AM",
            type: "activity",
          },
          {
            _key: "dzu2c",
            title: "The Valley Walk",
            description: "Once you crest the ridge, the landscape opens up into a sweeping, undulating green valley. It's a relatively flat 2-3 hour walk along the ridge line to the guest house, offering spectacular views.",
            location: { name: "Dzukou Valley", lat: 25.5530, lng: 94.0620 },
            time: "10:30 AM",
            type: "sightseeing",
          },
          {
            _key: "dzu2d",
            title: "Dzukou Rest House",
            description: "Check into the basic Dzukou Rest House. Accommodation is very basic—usually bare dormitories where you sleep in sleeping bags on the floor, or you can pitch a tent outside. Basic dal, rice, and Maggi are available.",
            time: "01:30 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "dzu-day3",
        dayNumber: 3,
        title: "Explore the Valley Floor & Cave",
        date: "2027-06-17",
        summary: "Descend into the heart of the valley to walk among the dwarf bamboo and crystal clear streams.",
        activities: [
          {
            _key: "dzu3a",
            title: "Descend to the Valley Floor",
            description: "Walk down from the Rest House into the valley itself. The entire landscape is covered in a velvety carpet of dwarf bamboo. Crystal clear, icy streams weave through the green mounds.",
            time: "07:00 AM",
            type: "activity",
          },
          {
            _key: "dzu3b",
            title: "Dzukou Lily Spotting",
            description: "If you visit in June-July, look for the rare pink Dzukou Lily (Lilium mackliniae) which blooms only here.",
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "dzu3c",
            title: "Trek back to Kohima via Jakhama",
            description: "After lunch, trek down via the shorter, steeper Jakhama route. A taxi will meet you at the bottom to drive you back to Kohima.",
            time: "12:00 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "dzu-day4",
        dayNumber: 4,
        title: "Return Journey",
        date: "2027-06-18",
        summary: "Drive back to Dimapur for your flight home.",
        activities: [
          {
            _key: "dzu4a",
            title: "Kohima to Dimapur Airport",
            description: "Drive back down the winding road to Dimapur (3 hours) to catch your flight back to Mumbai/Pune.",
            time: "08:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 54. MAWLYNNONG — Cleanest Village
  {
    _id: "trip-mawlynnong-meghalaya",
    title: "Mawlynnong — Asia's Cleanest Village",
    slug: "mawlynnong-cleanest-village",
    excerpt:
      "Tucked away in the East Khasi Hills of Meghalaya, Mawlynnong earned the title of Asia's Cleanest Village. Discover immaculate bamboo houses, flower-lined pathways, and the ingenious living root bridges nearby.",
    tags: ["Culture", "Nature", "Meghalaya", "Village", "Eco-tourism", "Offbeat"],
    country: "India",
    startDate: "2027-10-05",
    endDate: "2027-10-07",
    bestSuggestedMonth: "October – May",
    status: "published",
    viewCount: 0,
    totalBudget: 10000,
    currency: "INR",
    tripType: "Eco-Tourism",
    readingTime: 5,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/mawlynnong.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "maw-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Guwahati → Shillong → Mawlynnong",
        date: "2027-10-05",
        summary: "Fly to Guwahati, drive through the hills via Shillong, and arrive in the pristine village of Mawlynnong.",
        activities: [
          {
            _key: "maw1a",
            title: "Travel & Drive",
            description: "Fly to Guwahati. Hire a cab to Mawlynnong (190 km, ~6 hrs). The route passes through Shillong and Cherrapunjee, offering spectacular viewpoints of the Khasi hills.",
            location: { name: "Mawlynnong", lat: 25.2024, lng: 91.9157 },
            time: "Morning Arrival",
            type: "transport",
          },
          {
            _key: "maw1b",
            title: "Check-in at a Village Homestay",
            description: "Stay in a traditional bamboo stilt house homestay run by the Khasi locals (e.g., Hala Tyngkong). (₹1,500–3,000/night).",
            time: "03:00 PM",
            type: "accommodation",
          },
          {
            _key: "maw1c",
            title: "Village Walk & Sky View Point",
            description: "Walk through the impeccably clean village with bamboo dustbins everywhere. Climb the 85-foot high bamboo 'Sky View' tower to see the plains of Bangladesh stretching out below.",
            time: "04:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "maw-day2",
        dayNumber: 2,
        title: "Riwai Living Root Bridge & Balancing Rock",
        date: "2027-10-06",
        summary: "Visit a nearby bio-engineering marvel and a geological curiosity.",
        activities: [
          {
            _key: "maw2a",
            title: "Riwai Living Root Bridge",
            description: "Just 2 km from Mawlynnong. A short 15-minute walk takes you to a spectacular single-decker living root bridge spanning a rocky stream. It is made by training the aerial roots of the Ficus elastica tree over decades.",
            location: { name: "Riwai Root Bridge", lat: 25.2100, lng: 91.9000 },
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "maw2b",
            title: "Balancing Rock",
            description: "A huge boulder inexplicably balancing on a tiny rock base, considered sacred by the pre-Christian Khasi tribes.",
            time: "11:30 AM",
            type: "sightseeing",
          },
          {
            _key: "maw2c",
            title: "Lunch — Khasi Cuisine",
            description: "Try Jadoh (rice cooked with meat) or simple local veg thalis with bamboo shoot pickles at the village stalls.",
            time: "01:00 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "maw-day3",
        dayNumber: 3,
        title: "Departure",
        date: "2027-10-07",
        summary: "Drive back to Guwahati.",
        activities: [
          {
            _key: "maw3a",
            title: "Return Drive",
            description: "Depart early for the 6-hour drive back to Guwahati airport.",
            time: "08:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 55. NONGRIAT — Double Decker Root Bridge
  {
    _id: "trip-nongriat-root-bridge",
    title: "Nongriat — The Double Decker Living Root Bridge",
    slug: "nongriat-double-decker-trek",
    excerpt:
      "Hidden deep in a tropical gorge below Cherrapunjee is Nongriat, home to the legendary Umshiang Double-Decker Living Root Bridge. Reaching it requires a grueling 3,500-step descent into the jungle, but the azure natural pools and bio-engineering marvels are worth the sweat.",
    tags: ["Trekking", "Nature", "Meghalaya", "Root Bridge", "Adventure", "Offbeat"],
    country: "India",
    startDate: "2027-11-10",
    endDate: "2027-11-13",
    bestSuggestedMonth: "October – March (Avoid peak monsoon for safety)",
    status: "published",
    viewCount: 0,
    totalBudget: 11000,
    currency: "INR",
    tripType: "Trekking & Nature",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/nongriat.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "non-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Guwahati → Cherrapunjee (Sohra)",
        date: "2027-11-10",
        summary: "Fly to Guwahati, drive to Cherrapunjee, and rest before the big trek.",
        activities: [
          {
            _key: "non1a",
            title: "Travel & Drive to Sohra",
            description: "Fly to Guwahati, then drive 150 km (~5 hrs) to Cherrapunjee (Sohra). Stay overnight in Sohra to start the trek early the next day.",
            location: { name: "Cherrapunjee", lat: 25.2702, lng: 91.7323 },
            time: "Afternoon",
            type: "transport",
          },
          {
            _key: "non1b",
            title: "Check-in at Cherrapunjee Holiday Resort",
            description: "A famous, cozy resort near the trek starting point. (₹4,000/night).",
            time: "05:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "non-day2",
        dayNumber: 2,
        title: "Trek to Nongriat (The 3,500 Steps)",
        date: "2027-11-11",
        summary: "Descend into the gorge, crossing swinging wire bridges and single root bridges to reach Nongriat.",
        activities: [
          {
            _key: "non2a",
            title: "Drive to Tyrna Village",
            description: "Drive to Tyrna (30 mins from Sohra). This is where the road ends and the steps begin.",
            time: "08:00 AM",
            type: "transport",
          },
          {
            _key: "non2b",
            title: "The Descent",
            description: "Begin the 3,500 stone step descent. The path drops sharply into the tropical jungle. You will cross two terrifyingly bouncy wire suspension bridges over crystal-clear blue rivers.",
            time: "09:00 AM",
            type: "activity",
          },
          {
            _key: "non2c",
            title: "The Double Decker Bridge",
            description: "Arrive at Nongriat village. The Umshiang Double-Decker bridge is breathtaking—two levels of living roots woven across a river, with a natural pool beneath.",
            location: { name: "Nongriat", lat: 25.2500, lng: 91.6830 },
            time: "11:30 AM",
            type: "sightseeing",
          },
          {
            _key: "non2d",
            title: "Homestay Check-in & Natural Pools",
            description: "Stay overnight in a basic village homestay (like Serene Homestay). Spend the afternoon swimming in the azure natural pools.",
            time: "01:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "non-day3",
        dayNumber: 3,
        title: "Rainbow Falls & The Ascent",
        date: "2027-11-12",
        summary: "Trek further to a spectacular waterfall, then begin the grueling climb back up.",
        activities: [
          {
            _key: "non3a",
            title: "Trek to Rainbow Falls",
            description: "A 1.5 hr trek further into the jungle from Nongriat. The trail is rough, but ends at a spectacular waterfall plunging into a deep blue pool where a rainbow is almost always visible.",
            time: "08:00 AM",
            type: "activity",
          },
          {
            _key: "non3b",
            title: "The 3,500 Step Ascent",
            description: "Return to Nongriat, collect your bags, and begin the brutal climb back up to Tyrna. Take it extremely slow.",
            time: "01:00 PM",
            type: "activity",
          },
          {
            _key: "non3c",
            title: "Drive back to Shillong",
            description: "Meet your cab in Tyrna and drive to Shillong to recover in comfort.",
            time: "05:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 56. DAWKI — Crystal Clear River
  {
    _id: "trip-dawki-river",
    title: "Dawki & Shnongpdeng — The Transparent River",
    slug: "dawki-umngot-river-meghalaya",
    excerpt:
      "Famous for the Umngot River, whose water is so crystal clear during the winter months that the boats appear to be floating on air. Set right on the Bangladesh border, it's a hotspot for camping and water sports.",
    tags: ["Nature", "Boating", "Meghalaya", "Rivers", "Offbeat", "Camping"],
    country: "India",
    startDate: "2027-12-10",
    endDate: "2027-12-12",
    bestSuggestedMonth: "November – March (Water is muddy during monsoon)",
    status: "published",
    viewCount: 0,
    totalBudget: 9000,
    currency: "INR",
    tripType: "Nature & Relaxation",
    readingTime: 5,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/dawki.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "daw-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Guwahati → Dawki",
        date: "2027-12-10",
        summary: "Fly to Guwahati and drive to the Bangladesh border town of Dawki.",
        activities: [
          {
            _key: "daw1a",
            title: "Travel & Drive",
            description: "Fly to Guwahati. Drive 175 km (~5.5 hrs) via Shillong to Dawki.",
            location: { name: "Dawki", lat: 25.1852, lng: 92.0163 },
            time: "Afternoon",
            type: "transport",
          },
          {
            _key: "daw1b",
            title: "Boating on the Umngot River",
            description: "Hire a small wooden boat. In winter, the river bed is visible 15-20 feet below. The optical illusion of floating in mid-air is perfect for photography.",
            time: "04:00 PM",
            type: "activity",
          },
          {
            _key: "daw1c",
            title: "Camp Check-in at Shnongpdeng",
            description: "Drive 8 km further to Shnongpdeng village. Stay in a riverside tent camp (e.g., Pioneer Adventure Tours) with a bonfire under the stars. (₹1,500–2,500/tent).",
            location: { name: "Shnongpdeng", lat: 25.1950, lng: 92.0300 },
            time: "06:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "daw-day2",
        dayNumber: 2,
        title: "Water Sports & Bangladesh Border",
        date: "2027-12-11",
        summary: "Enjoy kayaking, cliff jumping, and a visit to the international border.",
        activities: [
          {
            _key: "daw2a",
            title: "Kayaking & Cliff Jumping",
            description: "Shnongpdeng is the adventure hub. Rent a kayak and paddle up the quiet gorge, or try cliff jumping and snorkeling in the clear waters.",
            time: "09:00 AM",
            type: "activity",
          },
          {
            _key: "daw2b",
            title: "Lunch — Fresh River Fish",
            description: "Enjoy freshly caught river fish prepared with local spices at a village shack.",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "daw2c",
            title: "Dawki Bridge & Tamabil Border",
            description: "Drive on the suspension bridge built by the British. Then visit the Tamabil border crossing where Indian and Bangladeshi guards stand meters apart.",
            time: "03:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "daw-day3",
        dayNumber: 3,
        title: "Krang Suri Falls & Departure",
        date: "2027-12-12",
        summary: "Visit a spectacularly blue waterfall on the drive back.",
        activities: [
          {
            _key: "daw3a",
            title: "Krang Suri Waterfalls",
            description: "On the way back to Shillong/Guwahati, take a detour to Krang Suri (30 km from Dawki). The water is a mesmerizing cobalt blue.",
            location: { name: "Krang Suri", lat: 25.2660, lng: 92.1700 },
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "daw3b",
            title: "Return to Guwahati",
            description: "Continue the drive back to Guwahati for your evening flight.",
            time: "02:00 PM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 57. MAWSYNRAM — Wettest place on Earth
  {
    _id: "trip-mawsynram-meghalaya",
    title: "Mawsynram — Rain, Caves & Monoliths",
    slug: "mawsynram-wettest-place-earth",
    excerpt:
      "Holding the Guinness Record for the highest average rainfall on Earth, Mawsynram is a moody, mist-shrouded village in the East Khasi Hills. It's famous for incredible limestone caves, deep gorges, and the massive Mawjymbuin stalagmite.",
    tags: ["Nature", "Caves", "Meghalaya", "Monsoon", "Offbeat", "Rain"],
    country: "India",
    startDate: "2027-08-10",
    endDate: "2027-08-12",
    bestSuggestedMonth: "July – September (To truly experience the epic rainfall)",
    status: "published",
    viewCount: 0,
    totalBudget: 11000,
    currency: "INR",
    tripType: "Nature & Exploration",
    readingTime: 5,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/mawsynram.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "msy-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Guwahati → Mawsynram",
        date: "2027-08-10",
        summary: "Fly to Guwahati, drive up into the clouds to Mawsynram, and visit the sacred cave.",
        activities: [
          {
            _key: "msy1a",
            title: "Travel & Drive to Mawsynram",
            description: "Fly to Guwahati. Hire a cab and drive 140 km (~4.5 hrs) via Shillong. The road gets increasingly misty and dramatic as you approach Mawsynram.",
            location: { name: "Mawsynram", lat: 25.2975, lng: 91.5826 },
            time: "Afternoon",
            type: "transport",
          },
          {
            _key: "msy1b",
            title: "Check-in at a Homestay",
            description: "Accommodation is basic here. Stay in a local Khasi homestay (e.g., Emily & Sankyntiew Homestay) to experience local hospitality. (₹1,500–2,500/night).",
            time: "02:30 PM",
            type: "accommodation",
          },
          {
            _key: "msy1c",
            title: "Mawjymbuin Cave",
            description: "A short walk from the village center. A massive natural cave made of calcareous sandstone containing a giant stalagmite shaped like a Shiva Linga, naturally bathed by water dripping from a stalactite above.",
            time: "04:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "msy-day2",
        dayNumber: 2,
        title: "Krem Puri & Khasi Monoliths",
        date: "2027-08-11",
        summary: "Explore the longest sandstone cave in the world and ancient tribal monoliths.",
        activities: [
          {
            _key: "msy2a",
            title: "Explore Krem Puri Cave",
            description: "Discovered recently in 2016, this is the world's longest sandstone cave (24.5 km mapped). You can explore the first few hundred meters safely with a local guide. Dinosaur fossils (Mosasaurus) were found here.",
            location: { name: "Krem Puri", lat: 25.2800, lng: 91.5500 },
            time: "09:00 AM",
            type: "activity",
            notes: "Wear sturdy shoes and carry a powerful torch.",
          },
          {
            _key: "msy2b",
            title: "Lunch — Hot Soup & Momo",
            description: "The torrential rain makes hot local noodle soup and pork momos a perfect midday meal.",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "msy2c",
            title: "Mawphlang Sacred Grove & Monoliths",
            description: "Drive towards Mawphlang. Walk through the sacred forest where the cutting of even a single branch is taboo. Nearby are ancient Khasi monoliths erected in memory of ancestors.",
            location: { name: "Mawphlang", lat: 25.4450, lng: 91.7580 },
            time: "03:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "msy-day3",
        dayNumber: 3,
        title: "Departure",
        date: "2027-08-12",
        summary: "Drive back to Guwahati through the rain.",
        activities: [
          {
            _key: "msy3a",
            title: "Return Drive",
            description: "Drive back down the winding hills to Guwahati airport.",
            time: "09:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 58. MAJULI ISLAND — River Island
  {
    _id: "trip-majuli-island",
    title: "Majuli Island — The Shrinking River Island",
    slug: "majuli-brahmaputra-assam",
    excerpt:
      "The world's largest river island, floating in the mighty Brahmaputra river. Majuli is the cultural capital of Assam, famous for its Neo-Vaishnavite Satras (monasteries), masked dances, and the Mishing tribe's stilt houses. Visit soon, as erosion is slowly shrinking the island.",
    tags: ["Culture", "Island", "Assam", "Brahmaputra", "Monastery", "Offbeat"],
    country: "India",
    startDate: "2027-11-20",
    endDate: "2027-11-23",
    bestSuggestedMonth: "November – March",
    status: "published",
    viewCount: 0,
    totalBudget: 13000,
    currency: "INR",
    tripType: "Culture & Heritage",
    readingTime: 7,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/majuli-island.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "maj-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Jorhat → Ferry to Majuli",
        date: "2027-11-20",
        summary: "Fly to Jorhat, take a local ferry across the massive Brahmaputra, and arrive on the island.",
        activities: [
          {
            _key: "maj1a",
            title: "Travel & Ferry Crossing",
            description: "Fly to Jorhat Airport (JRH). Take an auto to Nimati Ghat (15 km). Board the government Ro-Ro ferry or a private wooden boat to cross the Brahmaputra (1.5 hrs) to Kamalabari Ghat in Majuli.",
            location: { name: "Nimati Ghat / Majuli", lat: 26.9530, lng: 94.1680 },
            time: "Afternoon",
            type: "transport",
            notes: "The last ferry usually leaves around 3:30 PM. Do not be late.",
          },
          {
            _key: "maj1b",
            title: "Check-in at a Bamboo Cottage",
            description: "Stay in traditional Mishing-style bamboo cottages built on stilts (e.g., La Maison de Ananda or Yggdrasil Bamboo Cottage). (₹2,000–3,500/night).",
            location: { name: "Garurmur, Majuli", lat: 26.9600, lng: 94.1600 },
            time: "04:30 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "maj-day2",
        dayNumber: 2,
        title: "Satras & Mask Making",
        date: "2027-11-21",
        summary: "Explore the ancient monastic centers (Satras) and watch artisans create traditional masks.",
        activities: [
          {
            _key: "maj2a",
            title: "Auniati Satra",
            description: "Visit one of the oldest and largest Satras on the island. Observe the monks (Bhakats) going about their daily prayers and explore the museum housing ancient Assamese artifacts.",
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "maj2b",
            title: "Samaguri Satra (Mask Making)",
            description: "This Satra is world-renowned for its traditional mask-making using bamboo, clay, and cow dung. These masks are used in traditional Bhaona theatrical performances. You can watch the artisans at work and buy a mask.",
            time: "11:30 AM",
            type: "activity",
          },
          {
            _key: "maj2c",
            title: "Lunch — Assamese Thali",
            description: "Try an authentic Assamese thali featuring Khar (an alkaline dish), Masor Tenga (sour fish curry), and sticky rice.",
            time: "01:30 PM",
            type: "food",
          },
          {
            _key: "maj2d",
            title: "Sunset at the River Bank",
            description: "Rent a bicycle and ride to the edge of the island. The sunsets over the vast, ocean-like Brahmaputra are legendary.",
            time: "04:30 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "maj-day3",
        dayNumber: 3,
        title: "Mishing Tribe & Pottery",
        date: "2027-11-22",
        summary: "Interact with the indigenous Mishing people and see the unique Salmora pottery.",
        activities: [
          {
            _key: "maj3a",
            title: "Mishing Village Walk",
            description: "Visit a local Mishing tribal village. See their elevated stilt houses (Chang Ghar), observe women weaving exquisite textiles on handlooms, and taste Apong (rice beer) if offered.",
            time: "09:00 AM",
            type: "activity",
          },
          {
            _key: "maj3b",
            title: "Salmora Village Pottery",
            description: "Salmora is known for a unique style of pottery made without a potter's wheel, using only hands to beat the clay into shape.",
            time: "12:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "maj-day4",
        dayNumber: 4,
        title: "Departure",
        date: "2027-11-23",
        summary: "Take the morning ferry back to the mainland.",
        activities: [
          {
            _key: "maj4a",
            title: "Ferry & Drive to Jorhat",
            description: "Take the 8:00 AM ferry back to Nimati Ghat, then auto/taxi to Jorhat airport for the flight back.",
            time: "08:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 59. KHONOMA — Green Village
  {
    _id: "trip-khonoma-nagaland",
    title: "Khonoma — India's First Green Village",
    slug: "khonoma-green-village-nagaland",
    excerpt:
      "A 700-year-old Angami Naga village perched on a ridge. Once known for fierce warriors who resisted the British, it is now famous as India's first 'Green Village', leading the way in conservation and a total ban on hunting and logging.",
    tags: ["Culture", "Eco-tourism", "Nagaland", "Village", "History", "Offbeat"],
    country: "India",
    startDate: "2027-12-01",
    endDate: "2027-12-04",
    bestSuggestedMonth: "October – May",
    status: "published",
    viewCount: 0,
    totalBudget: 14000,
    currency: "INR",
    tripType: "Eco-Tourism & History",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/khonoma.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "kho-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Dimapur → Khonoma",
        date: "2027-12-01",
        summary: "Fly to Dimapur and drive directly up to the historic village of Khonoma.",
        activities: [
          {
            _key: "kho1a",
            title: "Travel & Drive",
            description: "Fly to Dimapur (DMU). Drive past Kohima to Khonoma (90 km, ~3 hrs). The road gets narrower and steeper as you approach the village.",
            location: { name: "Khonoma", lat: 25.6420, lng: 94.0200 },
            time: "Afternoon",
            type: "transport",
          },
          {
            _key: "kho1b",
            title: "Check-in at a Homestay",
            description: "Stay in one of the beautifully maintained Angami homestays (e.g., Dovipie Inn or Khonoma Homestay). (₹2,500–4,000/night).",
            time: "04:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "kho-day2",
        dayNumber: 2,
        title: "Village Walk & Historic Forts",
        date: "2027-12-02",
        summary: "Walk through the terraced village, learn about the Angami culture, and visit the old forts.",
        activities: [
          {
            _key: "kho2a",
            title: "Guided Village Walk",
            description: "Hire a local guide. Walk through the three main 'Khels' (clans) of the village. See the traditional wooden houses adorned with mithun (bison) horns, indicating wealth and status.",
            time: "09:00 AM",
            type: "activity",
          },
          {
            _key: "kho2b",
            title: "Khonoma Fort & Memorials",
            description: "Visit the remnants of the stone fort where the Angami warriors fought a legendary battle against the British in 1879. See the memorial stones erected for past warriors.",
            time: "11:30 AM",
            type: "sightseeing",
          },
          {
            _key: "kho2c",
            title: "Lunch — Naga Cuisine",
            description: "Enjoy smoked pork with bamboo shoot, local red rice, and a very cautious taste of Raja Mircha (Bhut Jolokia / Ghost Pepper) chutney.",
            time: "01:30 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "kho-day3",
        dayNumber: 3,
        title: "Tragopan Sanctuary & Terrace Farming",
        date: "2027-12-03",
        summary: "Explore the community conservation forest and the ancient terrace farming system.",
        activities: [
          {
            _key: "kho3a",
            title: "Khonoma Nature Conservation and Tragopan Sanctuary",
            description: "Trek into the community-protected forest. It was created to protect the endangered Blyth's Tragopan bird. The forest is pristine and rich in biodiversity.",
            time: "08:30 AM",
            type: "activity",
          },
          {
            _key: "kho3b",
            title: "Alder-based Terrace Farming",
            description: "Observe the unique agricultural practice where nitrogen-fixing Alder trees are planted alongside crops. This sustainable practice has been used here for centuries.",
            time: "02:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "kho-day4",
        dayNumber: 4,
        title: "Departure",
        date: "2027-12-04",
        summary: "Drive back to Dimapur.",
        activities: [
          {
            _key: "kho4a",
            title: "Return Drive",
            description: "Drive back to Dimapur airport for the flight out.",
            time: "09:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 60. UKHRUL — Tangkhul hills & Shirui Lily
  {
    _id: "trip-ukhrul-manipur",
    title: "Ukhrul — Tangkhul Hills & The Shirui Lily",
    slug: "ukhrul-tangkhul-manipur",
    excerpt:
      "A stunning, high-altitude hill station in Manipur, home to the Tangkhul Naga tribe. Famous for its sweeping pine forests, cascading waterfalls, and the extremely rare Shirui Lily that blooms on the highest peak.",
    tags: ["Nature", "Hills", "Manipur", "Trekking", "Flowers", "Offbeat"],
    country: "India",
    startDate: "2027-05-15",
    endDate: "2027-05-18",
    bestSuggestedMonth: "May – June (for Shirui Lily) or October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 12000,
    currency: "INR",
    tripType: "Nature & Trekking",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/ukhrul.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "ukh-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Imphal → Ukhrul",
        date: "2027-05-15",
        summary: "Fly to Imphal and take a shared taxi winding up the hills to Ukhrul.",
        activities: [
          {
            _key: "ukh1a",
            title: "Travel to Imphal & Drive",
            description: "Fly to Imphal (IMF). Take a shared Winger or private taxi to Ukhrul (85 km, ~3 hrs). The road ascends steeply, offering beautiful views of the Manipur valley.",
            location: { name: "Ukhrul", lat: 25.1147, lng: 94.3592 },
            time: "Afternoon",
            type: "transport",
            notes: "Inner Line Permit is required for Manipur.",
          },
          {
            _key: "ukh1b",
            title: "Check-in at a local Hotel/Homestay",
            description: "Stay in a homestay or hotel in Ukhrul town (e.g., 25 Degree North). (₹2,000–3,500/night).",
            time: "04:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "ukh-day2",
        dayNumber: 2,
        title: "Trek to Shirui Kashong Peak",
        date: "2027-05-16",
        summary: "A trek up the highest peak in the area to find the state flower of Manipur.",
        activities: [
          {
            _key: "ukh2a",
            title: "Trek to Shirui Peak",
            description: "Drive to Shirui village and begin the trek. It's a steep 2-3 hour climb. In May/June, the peak is covered in the rare, pale-pink Shirui Lily, which cannot be transplanted anywhere else in the world.",
            location: { name: "Shirui Kashong", lat: 25.1300, lng: 94.4300 },
            time: "08:00 AM",
            type: "activity",
          },
          {
            _key: "ukh2b",
            title: "Picnic at the Peak",
            description: "Enjoy packed lunch at the top with a 360-degree view of the undulating Indo-Myanmar border hills.",
            time: "12:30 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "ukh-day3",
        dayNumber: 3,
        title: "Khangkhui Caves & Nillai Tea Estate",
        date: "2027-05-17",
        summary: "Explore ancient limestone caves that provided shelter during WWII.",
        activities: [
          {
            _key: "ukh3a",
            title: "Khangkhui Mangsor Caves",
            description: "A natural limestone cave system featuring huge stalactites. During WWII, the local villagers used these deep caves as a shelter from Allied and Japanese bombings.",
            location: { name: "Khangkhui", lat: 25.0600, lng: 94.4500 },
            time: "09:00 AM",
            type: "sightseeing",
          },
          {
            _key: "ukh3b",
            title: "Nillai Tea Estate",
            description: "Visit this lush tea estate known for its green tea. The rolling hills of tea bushes make for great photography.",
            time: "01:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "ukh-day4",
        dayNumber: 4,
        title: "Departure",
        date: "2027-05-18",
        summary: "Drive back down to Imphal.",
        activities: [
          {
            _key: "ukh4a",
            title: "Return Drive",
            description: "Drive back to Imphal (3 hrs) for the return flight.",
            time: "08:30 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 61. LOKTAK LAKE — Floating islands
  {
    _id: "trip-loktak-lake-manipur",
    title: "Loktak Lake — The Floating Islands of Manipur",
    slug: "loktak-lake-floating-islands",
    excerpt:
      "The largest freshwater lake in Northeast India, famous for 'phumdis'—massive circular floating islands of vegetation. It is home to the world's only floating national park and the endangered Sangai dancing deer.",
    tags: ["Nature", "Lake", "Wildlife", "Manipur", "Offbeat", "Boating"],
    country: "India",
    startDate: "2027-11-05",
    endDate: "2027-11-07",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 12000,
    currency: "INR",
    tripType: "Nature & Wildlife",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/loktak-lake.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "lok-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Imphal → Loktak",
        date: "2027-11-05",
        summary: "Fly to Imphal, drive to Moirang, and check into a resort overlooking the massive lake.",
        activities: [
          {
            _key: "lok1a",
            title: "Travel & Drive to Moirang",
            description: "Fly to Imphal. Drive 50 km (~1.5 hrs) south to Moirang/Sendra island on Loktak lake.",
            location: { name: "Loktak Lake", lat: 24.5500, lng: 93.8000 },
            time: "Afternoon",
            type: "transport",
          },
          {
            _key: "lok1b",
            title: "Check-in at Sendra Park Resort",
            description: "Located on a hillock (Sendra Island) right in the middle of the lake, offering stunning panoramic views of the phumdis. (₹3,500–5,000/night). You can also opt to stay in a floating homestay right on a phumdi.",
            time: "03:00 PM",
            type: "accommodation",
          },
          {
            _key: "lok1c",
            title: "Sunset Boat Ride",
            description: "Take a local wooden boat out onto the lake at sunset, weaving through the circular floating biomasses where fishermen have built their small huts.",
            time: "05:00 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "lok-day2",
        dayNumber: 2,
        title: "Floating National Park & INA Museum",
        date: "2027-11-06",
        summary: "Visit Keibul Lamjao National Park to spot the rare dancing deer, and learn about the INA history in Moirang.",
        activities: [
          {
            _key: "lok2a",
            title: "Keibul Lamjao National Park",
            description: "The only floating national park in the world. It is the last natural refuge of the Sangai (brow-antlered deer). Take a boat safari early in the morning to spot them balancing on the spongy floating vegetation.",
            location: { name: "Keibul Lamjao", lat: 24.4830, lng: 93.8160 },
            time: "07:00 AM",
            type: "sightseeing",
          },
          {
            _key: "lok2b",
            title: "Lunch — Manipuri Fish Curry",
            description: "Enjoy Nga-Thongba (fish curry) made with fresh catch from the lake, along with black rice.",
            time: "12:30 PM",
            type: "food",
          },
          {
            _key: "lok2c",
            title: "INA Memorial, Moirang",
            description: "Visit the INA (Indian National Army) museum. This is the spot where Subhas Chandra Bose's INA first hoisted the Indian tricolor on Indian soil in 1944.",
            location: { name: "Moirang", lat: 24.5000, lng: 93.7600 },
            time: "03:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "lok-day3",
        dayNumber: 3,
        title: "Departure",
        date: "2027-11-07",
        summary: "Drive back to Imphal for departure.",
        activities: [
          {
            _key: "lok3a",
            title: "Return Drive",
            description: "Drive back to Imphal airport (1.5 hrs) for the flight back to Mumbai/Pune.",
            time: "10:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 62. REIEK — Hilltop village Mizoram
  {
    _id: "trip-reiek-mizoram",
    title: "Reiek — The Misty Mizo Heritage Village",
    slug: "reiek-hill-mizoram",
    excerpt:
      "A picturesque mountain village near Aizawl, offering a spectacular trek to the Reiek Tlang peak with panoramic views of the surrounding valleys and the Bangladesh plains. Experience authentic Mizo culture in the heritage village setup.",
    tags: ["Hills", "Trekking", "Culture", "Mizoram", "Offbeat", "Nature"],
    country: "India",
    startDate: "2027-10-12",
    endDate: "2027-10-14",
    bestSuggestedMonth: "September – March",
    status: "published",
    viewCount: 0,
    totalBudget: 11000,
    currency: "INR",
    tripType: "Culture & Trekking",
    readingTime: 5,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/reiek.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "rek-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Aizawl → Reiek",
        date: "2027-10-12",
        summary: "Fly to Lengpui Airport, bypass Aizawl, and drive directly into the misty Reiek hills.",
        activities: [
          {
            _key: "rek1a",
            title: "Travel & Drive",
            description: "Fly to Lengpui Airport (AJL). Hire a taxi to drive directly to Reiek (30 km, ~1.5 hrs). The road winds through dense green forests and small waterfalls.",
            location: { name: "Reiek", lat: 23.6800, lng: 92.6200 },
            time: "Afternoon",
            type: "transport",
            notes: "Inner Line Permit required for Mizoram.",
          },
          {
            _key: "rek1b",
            title: "Check-in at Reiek Tourist Resort",
            description: "Stay at the Mizoram Tourism cottages situated beautifully on the hillside. (₹1,500–2,500/night).",
            time: "03:00 PM",
            type: "accommodation",
          },
          {
            _key: "rek1c",
            title: "Explore Mizo Heritage Village",
            description: "Located right next to the resort, this reconstructed village showcases the traditional houses of different Mizo sub-tribes and the chief's house.",
            time: "04:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "rek-day2",
        dayNumber: 2,
        title: "Trek to Reiek Peak",
        date: "2027-10-13",
        summary: "An exhilarating trek to the rocky summit for a spectacular sunrise or afternoon view.",
        activities: [
          {
            _key: "rek2a",
            title: "Trek to Reiek Tlang",
            description: "A 45-minute trek from the resort. The trail passes through dense forests before suddenly opening up to a massive rocky cliff edge with a sweeping drop. On a clear day, you can see the plains of Bangladesh.",
            location: { name: "Reiek Peak", lat: 23.6830, lng: 92.6100 },
            time: "08:00 AM",
            type: "activity",
          },
          {
            _key: "rek2b",
            title: "Lunch — Mizo Bai",
            description: "Have a traditional Mizo meal including 'Bai' (a mixed vegetable stew with bamboo shoots and pork/fermented soy).",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "rek2c",
            title: "Khuangchera Puk (Cave)",
            description: "Explore the second longest cave in Mizoram, named after a legendary Mizo warrior. Located a short drive away in Ailawng village.",
            time: "03:00 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "rek-day3",
        dayNumber: 3,
        title: "Departure",
        date: "2027-10-14",
        summary: "Drive back to Lengpui Airport.",
        activities: [
          {
            _key: "rek3a",
            title: "Return Drive",
            description: "Enjoy a misty morning tea and drive back down to the airport.",
            time: "09:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 63. VANTAWNG FALLS — Mizoram's tallest
  {
    _id: "trip-vantawng-falls-mizoram",
    title: "Vantawng Falls — Mizoram's Highest Cascade",
    slug: "vantawng-waterfall-thenzawl",
    excerpt:
      "A spectacular two-tiered waterfall plunging 750 feet through a dense, impenetrable bamboo forest. Located near the handloom town of Thenzawl in central Mizoram.",
    tags: ["Waterfalls", "Nature", "Mizoram", "Offbeat", "Photography"],
    country: "India",
    startDate: "2027-11-05",
    endDate: "2027-11-07",
    bestSuggestedMonth: "September – December",
    status: "published",
    viewCount: 0,
    totalBudget: 11000,
    currency: "INR",
    tripType: "Nature & Relaxation",
    readingTime: 5,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/vantawng-falls.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "van-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Aizawl → Thenzawl",
        date: "2027-11-05",
        summary: "Fly to Aizawl and drive south to the plateau town of Thenzawl.",
        activities: [
          {
            _key: "van1a",
            title: "Travel & Drive",
            description: "Fly to Lengpui Airport (Aizawl). Drive south to Thenzawl (90 km, ~3 hrs). The route crosses the Tropic of Cancer.",
            location: { name: "Thenzawl", lat: 23.2840, lng: 92.7560 },
            time: "Afternoon",
            type: "transport",
          },
          {
            _key: "van1b",
            title: "Check-in at Thenzawl Golf Resort",
            description: "A surprisingly beautiful eco-resort built around a golf course by Mizoram Tourism. (₹2,500–4,000/night).",
            time: "04:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "van-day2",
        dayNumber: 2,
        title: "Vantawng Falls & Tuirihiau",
        date: "2027-11-06",
        summary: "Visit the massive Vantawng waterfall and a unique cave waterfall.",
        activities: [
          {
            _key: "van2a",
            title: "Vantawng Falls Viewpoint",
            description: "Because the forest is so dense, the falls can only be viewed from a dedicated viewpoint built on the opposite hill. The sheer 750-foot drop is mesmerizing.",
            location: { name: "Vantawng Falls", lat: 23.2500, lng: 92.7600 },
            time: "09:30 AM",
            type: "sightseeing",
          },
          {
            _key: "van2b",
            title: "Tuirihiau Falls",
            description: "A short drive away is Tuirihiau. It's smaller, but unique because you can walk behind the curtain of the falling water into a small cave.",
            time: "11:30 AM",
            type: "sightseeing",
          },
          {
            _key: "van2c",
            title: "Thenzawl Handloom Centers",
            description: "Thenzawl is the handloom hub of Mizoram. Visit the weaving centers where women create the traditional colorful 'Puan' fabric.",
            time: "03:00 PM",
            type: "activity",
          },
        ],
      },
      {
        _key: "van-day3",
        dayNumber: 3,
        title: "Departure",
        date: "2027-11-07",
        summary: "Drive back to Aizawl.",
        activities: [
          {
            _key: "van3a",
            title: "Return Drive",
            description: "Drive back to Lengpui Airport (3 hrs) for departure.",
            time: "08:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 64. UNAKOTI — Rock-cut giant carvings
  {
    _id: "trip-unakoti-tripura",
    title: "Unakoti — The Angkor Wat of the North-East",
    slug: "unakoti-rock-carvings-tripura",
    excerpt:
      "Hidden in a dense jungle in Tripura, Unakoti is an ancient Shaivite pilgrimage site featuring massive 11th-century rock carvings of Hindu deities, including a 30-foot high Shiva head.",
    tags: ["History", "Archaeology", "Tripura", "Religion", "Art", "Offbeat"],
    country: "India",
    startDate: "2027-02-15",
    endDate: "2027-02-17",
    bestSuggestedMonth: "October – March (Or during the Makar Sankranti festival)",
    status: "published",
    viewCount: 0,
    totalBudget: 10000,
    currency: "INR",
    tripType: "Heritage & Archaeology",
    readingTime: 5,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/unakoti.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "una-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Agartala → Kumarghat",
        date: "2027-02-15",
        summary: "Fly to Agartala and take a scenic train to North Tripura.",
        activities: [
          {
            _key: "una1a",
            title: "Fly to Agartala & Train to Kumarghat",
            description: "Fly to Agartala (IXA). From Agartala railway station, take a local train north to Kumarghat or Dharmanagar (approx. 3.5 hrs).",
            location: { name: "Kumarghat", lat: 24.1600, lng: 92.0300 },
            time: "Afternoon",
            type: "transport",
          },
          {
            _key: "una1b",
            title: "Check-in at Kailashahar",
            description: "Stay at the Unakoti Tourist Lodge in Kailashahar (run by Tripura Tourism), about 20 km from the site. (₹1,500–2,500/night).",
            location: { name: "Kailashahar", lat: 24.3200, lng: 92.0100 },
            time: "05:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "una-day2",
        dayNumber: 2,
        title: "The Giant Carvings of Unakoti",
        date: "2027-02-16",
        summary: "A full morning exploring the monumental stone bas-reliefs hidden in the jungle.",
        activities: [
          {
            _key: "una2a",
            title: "Explore Unakoti",
            description: "Drive 10 km to the site. The name translates to 'one less than a crore (ten million)'. Walk the steep steps down into a forested ravine to see massive rock-cut sculptures of Shiva, Ganesha, and Durga.",
            location: { name: "Unakoti", lat: 24.3090, lng: 92.0170 },
            time: "08:00 AM",
            type: "sightseeing",
          },
          {
            _key: "una2b",
            title: "Lunch — Bengali/Tripuri Cuisine",
            description: "Have a local lunch featuring Mui Borok (traditional Tripuri food) or a classic Bengali fish thali.",
            time: "01:00 PM",
            type: "food",
          },
          {
            _key: "una2c",
            title: "Tea Gardens of North Tripura",
            description: "Spend the afternoon walking through the rolling tea estates that surround the Kailashahar region.",
            time: "03:30 PM",
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "una-day3",
        dayNumber: 3,
        title: "Departure",
        date: "2027-02-17",
        summary: "Train back to Agartala.",
        activities: [
          {
            _key: "una3a",
            title: "Return Journey",
            description: "Take the morning train back to Agartala for your afternoon flight home.",
            time: "08:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 65. NAMDAPHA NATIONAL PARK — Arunachal Pradesh
  {
    _id: "trip-namdapha-arunachal",
    title: "Namdapha — Into the Deep Jungle",
    slug: "namdapha-national-park-safari",
    excerpt:
      "The largest protected area in the Eastern Himalaya biodiversity hotspot. The only park in the world known to have four feline species—Snow leopard, Clouded leopard, Leopard, and Tiger. A true, wild jungle expedition.",
    tags: ["Wildlife", "Jungle", "Arunachal Pradesh", "Adventure", "Offbeat", "Trekking"],
    country: "India",
    startDate: "2027-11-15",
    endDate: "2027-11-19",
    bestSuggestedMonth: "November – March (Park is closed during monsoon)",
    status: "published",
    viewCount: 0,
    totalBudget: 22000,
    currency: "INR",
    tripType: "Wildlife Expedition",
    readingTime: 8,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/namdapha.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "nam-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Dibrugarh → Miao",
        date: "2027-11-15",
        summary: "Fly to Dibrugarh (Assam) and drive to Miao, the gateway to the park.",
        activities: [
          {
            _key: "nam1a",
            title: "Fly to Dibrugarh & Drive",
            description: "Fly to Dibrugarh Airport (DIB). Hire a 4x4 SUV (Sumo/Bolero) and drive 160 km (~5 hrs) to Miao in Arunachal Pradesh.",
            location: { name: "Miao", lat: 27.4900, lng: 96.2000 },
            time: "Morning Arrival",
            type: "transport",
            notes: "ILP is required. Book forest rest houses via the Field Director in Miao well in advance.",
          },
          {
            _key: "nam1b",
            title: "Check-in at Miao / Deban",
            description: "Stay in the Eco-Camp at Miao or drive 25 km further into the park to stay at the Deban Forest Rest House (if permits allow).",
            time: "04:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "nam-day2",
        dayNumber: 2,
        title: "Jungle Trek to Hornbill Camp",
        date: "2027-11-16",
        summary: "Unlike other parks, Namdapha is explored largely on foot. Begin a guided deep jungle trek.",
        activities: [
          {
            _key: "nam2a",
            title: "Trek Deban to Hornbill Camp",
            description: "Cross the Noa-Dihing river by boat. Begin a 9 km trek through incredibly dense, primeval rainforest to Hornbill Camp. Spot Hoolock Gibbons (India's only ape) and giant hornbills.",
            location: { name: "Namdapha Forest", lat: 27.5000, lng: 96.3900 },
            time: "08:00 AM",
            type: "activity",
            notes: "Leeches are very common. Wear leech socks.",
          },
          {
            _key: "nam2b",
            title: "Jungle Camping",
            description: "Set up camp at Hornbill. Your local guides (usually from the Lisu tribe) will prepare dinner over a fire. Sleep surrounded by the intense sounds of the deep jungle.",
            time: "04:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "nam-day3",
        dayNumber: 3,
        title: "Trek to Firmbase & Return to Deban",
        date: "2027-11-17",
        summary: "Continue exploring the dense canopies before returning to the rest house.",
        activities: [
          {
            _key: "nam3a",
            title: "Morning Bird Watching",
            description: "Namdapha is a birder's paradise. Wake up at dawn to spot the rare White-bellied Heron and Snowy-throated Babbler.",
            time: "05:30 AM",
            type: "activity",
          },
          {
            _key: "nam3b",
            title: "Trek back to Deban",
            description: "Hike back the 9 km through the humid forest to the relative comfort of the Deban Rest House.",
            time: "10:00 AM",
            type: "activity",
          },
        ],
      },
      {
        _key: "nam-day4",
        dayNumber: 4,
        title: "Departure",
        date: "2027-11-18",
        summary: "Drive back to Assam.",
        activities: [
          {
            _key: "nam4a",
            title: "Return Drive to Dibrugarh",
            description: "Depart early to ensure you make the 5-hour drive back to Dibrugarh for your afternoon flight.",
            time: "07:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },

  // 66. BOMDILA — Monastery Town
  {
    _id: "trip-bomdila-monastery",
    title: "Bomdila — High Altitude Monasteries & Orchards",
    slug: "bomdila-monastery-arunachal",
    excerpt:
      "Perched at 8,000 feet on the way to Tawang, Bomdila offers sweeping views of the Gorichen peak, extensive apple orchards, and a deep immersion into Mahayana Buddhism at the Bomdila Monastery.",
    tags: ["Mountains", "Culture", "Arunachal Pradesh", "Buddhism", "Himalayas"],
    country: "India",
    startDate: "2027-04-10",
    endDate: "2027-04-13",
    bestSuggestedMonth: "March – May or September – November",
    status: "published",
    viewCount: 0,
    totalBudget: 13000,
    currency: "INR",
    tripType: "Culture & Mountains",
    readingTime: 6,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _ref: "/images/trips/bomdila.jpg", _type: "reference" } },
    itinerary: [
      {
        _key: "bom-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Guwahati → Tezpur/Bhalukpong",
        date: "2027-04-10",
        summary: "Fly to Guwahati and drive to the Arunachal border.",
        activities: [
          {
            _key: "bom1a",
            title: "Travel & Drive",
            description: "Fly to Guwahati. Drive 240 km (~5 hrs) to Tezpur or the border town of Bhalukpong to break the long journey.",
            location: { name: "Bhalukpong", lat: 27.0100, lng: 92.6400 },
            time: "Afternoon",
            type: "transport",
            notes: "ILP required.",
          },
          {
            _key: "bom1b",
            title: "Check-in at Bhalukpong",
            description: "Stay overnight near the Kameng river. (₹2,000/night).",
            time: "06:00 PM",
            type: "accommodation",
          },
        ],
      },
      {
        _key: "bom-day2",
        dayNumber: 2,
        title: "Drive to Bomdila & The Monastery",
        date: "2027-04-11",
        summary: "A steep, winding mountain drive up to 8,000 feet.",
        activities: [
          {
            _key: "bom2a",
            title: "Drive up the Himalayas",
            description: "Drive 100 km (~4 hrs) up the steep, winding mountain roads from Bhalukpong to Bomdila.",
            location: { name: "Bomdila", lat: 27.2645, lng: 92.4159 },
            time: "08:00 AM",
            type: "transport",
          },
          {
            _key: "bom2b",
            title: "Bomdila Monastery (GRL Monastry)",
            description: "A major center of Mahayana Buddhism. It has three wings (Upper, Middle, and Lower). The Upper Gompa offers stunning views of the town.",
            time: "02:00 PM",
            type: "sightseeing",
          },
          {
            _key: "bom2c",
            title: "Lunch — Thukpa & Momos",
            description: "Enjoy hot Tibetan food in the local market.",
            time: "04:00 PM",
            type: "food",
          },
        ],
      },
      {
        _key: "bom-day3",
        dayNumber: 3,
        title: "RR Hill & Apple Orchards",
        date: "2027-04-12",
        summary: "Visit the highest point in town and stroll through massive apple orchards.",
        activities: [
          {
            _key: "bom3a",
            title: "RR Hill Viewpoint",
            description: "The highest point in Bomdila. On a clear day, you can see the snow-capped Gorichen Peak and Kangto Peak, the highest in Arunachal.",
            time: "08:00 AM",
            type: "sightseeing",
          },
          {
            _key: "bom3b",
            title: "Dirang Apple Orchards (Optional Excursion)",
            description: "Drive 40 km towards Dirang to see massive, sprawling apple and kiwi orchards (best in late summer/autumn).",
            location: { name: "Dirang", lat: 27.3500, lng: 92.2300 },
            time: "11:00 AM",
            type: "activity",
          },
        ],
      },
      {
        _key: "bom-day4",
        dayNumber: 4,
        title: "Departure",
        date: "2027-04-13",
        summary: "Long drive back to the plains.",
        activities: [
          {
            _key: "bom4a",
            title: "Return Drive to Guwahati",
            description: "It is an 8-9 hour drive back to Guwahati, so start very early.",
            time: "06:00 AM",
            type: "transport",
          },
        ],
      },
    ],
  },
  {
    _id: "trip-neil-island-6-days",
    title: "Neil Island (Shaheed Dweep) — The Laid-Back Andaman Alternative",
    slug: "neil-island-6-days",
    excerpt: "A laid-back alternative to the bustling Havelock, offering serene beaches, natural rock bridges, and a slow-paced island life.",
    tags: ["Beach", "Island", "Relaxation", "Andamans", "Nature"],
    country: "India",
    startDate: "2026-10-01",
    endDate: "2026-10-06",
    bestSuggestedMonth: "October – May",
    status: "published",
    viewCount: 0,
    totalBudget: 45000,
    currency: "INR",
    tripType: "Relaxation",
    readingTime: 10,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/neil-island.jpg" } } as any,
    itinerary: [
      {
        _key: "ni-day1",
        dayNumber: 1,
        title: "Travel to Port Blair",
        date: "2026-10-01",
        summary: "Fly from Mumbai/Pune to Veer Savarkar International Airport, Port Blair. Rest and prep for ferry.",
        activities: [
          {
            _key: "ni1a",
            title: "Arrival in Port Blair",
            description: "Check into a hotel, relax, and maybe visit Cellular Jail for the evening light and sound show.",
            location: { name: "Port Blair", lat: 11.6234, lng: 92.7265 },
            time: "12:00 PM",
            type: "transport"
          }
        ]
      },
      {
        _key: "ni-day2",
        dayNumber: 2,
        title: "Ferry to Neil Island",
        date: "2026-10-02",
        summary: "Take a morning cruise to Neil Island and check into your beachside accommodation.",
        activities: [
          {
            _key: "ni2a",
            title: "Ferry Ride",
            description: "Take Makruzz or Green Ocean ferry from Port Blair to Neil Island (approx. 1.5 - 2 hours).",
            location: { name: "Neil Island Jetty", lat: 11.8354, lng: 93.0336 },
            time: "08:00 AM",
            type: "transport"
          },
          {
            _key: "ni2b",
            title: "Check-in at Sea Shell Samssara",
            description: "Check into one of the best places to stay on the island.",
            time: "11:00 AM",
            type: "accommodation",
            notes: "Other great options: Summer Sands Beach Resort, TSG Aura."
          },
          {
            _key: "ni2c",
            title: "Lunch at Something Different",
            description: "A beachside cafe known for great seafood and continental dishes.",
            time: "01:30 PM",
            type: "food"
          }
        ]
      },
      {
        _key: "ni-day3",
        dayNumber: 3,
        title: "Beaches and Howrah Bridge",
        date: "2026-10-03",
        summary: "Explore the natural rock formation and pristine beaches.",
        activities: [
          {
            _key: "ni3a",
            title: "Natural Rock Formation (Howrah Bridge)",
            description: "Visit during low tide to walk up to the natural rock bridge.",
            time: "09:00 AM",
            type: "sightseeing"
          },
          {
            _key: "ni3b",
            title: "Laxmanpur Beach",
            description: "Perfect for an evening stroll and a stunning sunset view.",
            time: "04:30 PM",
            type: "activity"
          },
          {
            _key: "ni3c",
            title: "Dinner at Blue Sea Restaurant",
            description: "Enjoy local Andamanese and Indian thalis.",
            time: "08:00 PM",
            type: "food"
          }
        ]
      },
      {
        _key: "ni-day4",
        dayNumber: 4,
        title: "Snorkeling at Bharatpur Beach",
        date: "2026-10-04",
        summary: "Enjoy water sports and relax.",
        activities: [
          {
            _key: "ni4a",
            title: "Bharatpur Beach",
            description: "Great for swimming, glass-bottom boat rides, and snorkeling. The coral reefs here are vibrant.",
            time: "10:00 AM",
            type: "activity"
          }
        ]
      },
      {
        _key: "ni-day5",
        dayNumber: 5,
        title: "Return to Port Blair",
        date: "2026-10-05",
        summary: "Take the ferry back to Port Blair.",
        activities: [
          {
            _key: "ni5a",
            title: "Ferry to Port Blair",
            description: "Catch the afternoon ferry back to the capital.",
            time: "02:00 PM",
            type: "transport"
          }
        ]
      },
      {
        _key: "ni-day6",
        dayNumber: 6,
        title: "Departure",
        date: "2026-10-06",
        summary: "Fly back to Mumbai/Pune.",
        activities: [
          {
            _key: "ni6a",
            title: "Flight from Port Blair",
            description: "Depart from Veer Savarkar Airport.",
            time: "10:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
  {
    _id: "trip-diglipur-7-days",
    title: "Diglipur — North Andaman's Pristine Frontier",
    slug: "diglipur-7-days",
    excerpt: "Famous for its turtle nesting beaches, twin islands of Ross & Smith connected by a sandbar, and the highest peak in the Andamans.",
    tags: ["Adventure", "Island", "Offbeat", "Andamans", "Nature"],
    country: "India",
    startDate: "2026-11-10",
    endDate: "2026-11-16",
    bestSuggestedMonth: "October – April",
    status: "published",
    viewCount: 0,
    totalBudget: 55000,
    currency: "INR",
    tripType: "Adventure",
    readingTime: 12,
    _createdAt: "2026-09-11T00:00:00Z",
    _updatedAt: "2026-09-11T00:00:00Z",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: "/images/diglipur.jpg" } } as any,
    itinerary: [
      {
        _key: "dig-day1",
        dayNumber: 1,
        title: "Arrival in Port Blair",
        date: "2026-11-10",
        summary: "Fly from Mumbai/Pune to Port Blair.",
        activities: [
          {
            _key: "dig1a",
            title: "Reach Port Blair",
            description: "Check into your hotel. Rest early as tomorrow is a long journey.",
            location: { name: "Port Blair", lat: 11.6234, lng: 92.7265 },
            time: "02:00 PM",
            type: "transport"
          }
        ]
      },
      {
        _key: "dig-day2",
        dayNumber: 2,
        title: "The Long Journey North",
        date: "2026-11-11",
        summary: "Take the Andaman Trunk Road (ATR) passing through the Jarawa Reserve to Diglipur.",
        activities: [
          {
            _key: "dig2a",
            title: "Road Trip to Diglipur",
            description: "An adventurous 10-12 hour drive (approx 300km) through dense forests. Alternatively, take an overnight ferry to Aerial Bay Jetty.",
            time: "04:00 AM",
            type: "transport"
          },
          {
            _key: "dig2b",
            title: "Check-in at Pristine Beach Resort",
            description: "Arrive at Kalipur Beach and settle in.",
            time: "04:00 PM",
            type: "accommodation",
            notes: "Other options: Turtle Resort (APTDC) or Saddle Peak View Resort."
          },
          {
            _key: "dig2c",
            title: "Dinner at Anu Bar & Restaurant",
            description: "Reliable local spot for Indian and seafood meals.",
            time: "08:00 PM",
            type: "food"
          }
        ]
      },
      {
        _key: "dig-day3",
        dayNumber: 3,
        title: "Ross and Smith Islands",
        date: "2026-11-12",
        summary: "Visit the stunning twin islands connected by a natural white sandbar.",
        activities: [
          {
            _key: "dig3a",
            title: "Boat to Ross & Smith",
            description: "Take a short fiber boat ride from Aerial Bay Jetty. Spend the day walking the sandbar and swimming in crystal clear waters.",
            location: { name: "Ross and Smith Islands", lat: 13.2965, lng: 93.0673 },
            time: "09:00 AM",
            type: "activity"
          }
        ]
      },
      {
        _key: "dig-day4",
        dayNumber: 4,
        title: "Kalipur Beach & Turtle Nesting",
        date: "2026-11-13",
        summary: "Explore Kalipur Beach and look out for turtles.",
        activities: [
          {
            _key: "dig4a",
            title: "Kalipur Beach",
            description: "Walk the unique volcanic sand beach. During the nesting season (Dec-Mar), you might see Olive Ridley or Leatherback turtles.",
            time: "06:00 PM",
            type: "sightseeing"
          }
        ]
      },
      {
        _key: "dig-day5",
        dayNumber: 5,
        title: "Trek to Saddle Peak (Optional) or Rest",
        date: "2026-11-14",
        summary: "Trek the highest peak of Andaman.",
        activities: [
          {
            _key: "dig5a",
            title: "Saddle Peak Trek",
            description: "A challenging 8km trek through Saddle Peak National Park, offering breathtaking views of the archipelago.",
            time: "06:00 AM",
            type: "activity"
          },
          {
            _key: "dig5b",
            title: "Dinner at Resort",
            description: "Have a hearty multi-cuisine dinner at the Pristine Beach Resort Restaurant.",
            time: "08:00 PM",
            type: "food"
          }
        ]
      },
      {
        _key: "dig-day6",
        dayNumber: 6,
        title: "Return to Port Blair",
        date: "2026-11-15",
        summary: "Journey back to the capital.",
        activities: [
          {
            _key: "dig6a",
            title: "Return Drive/Ferry",
            description: "Head back to Port Blair via the ATR or by sea.",
            time: "05:00 AM",
            type: "transport"
          }
        ]
      },
      {
        _key: "dig-day7",
        dayNumber: 7,
        title: "Departure",
        date: "2026-11-16",
        summary: "Fly back from Port Blair.",
        activities: [
          {
            _key: "dig7a",
            title: "Flight from Port Blair",
            description: "Fly back to Mumbai/Pune.",
            time: "11:00 AM",
            type: "transport"
          }
        ]
      }
    ]
  },
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
    "_id": "trip-gurez-valley-5-days",
    "title": "Gurez Valley & Dard-Shin Frontier — 5 Days from Mumbai / Pune (via Srinagar & Razdan Pass)",
    "slug": "gurez-valley-5-days",
    "excerpt": "Journey from Mumbai or Pune deep into northern Kashmir's most pristine frontier — crossing the dramatic Razdan Pass at 11,672 ft to reach the turquoise Kishanganga River, the iconic pyramid of Habba Khatoon peak, and the ancient Dard-Shin wooden villages of Dawar and Tulail bordering the LoC.",
    "tags": [
      "Himalayas",
      "Kashmir",
      "Offbeat",
      "Culture",
      "Borderlands",
      "Mountains",
      "Nature",
      "India"
    ],
    "country": "India",
    "startDate": "2026-06-15",
    "endDate": "2026-06-19",
    "bestSuggestedMonth": "May – October (Pass closed in winter)",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 22000,
    "currency": "INR",
    "tripType": "Offbeat Valley & Cultural Expedition",
    "readingTime": 9,
    "_createdAt": "2026-08-28T00:00:00Z",
    "_updatedAt": "2026-08-28T00:00:00Z",
    "itinerary": [
      {
        "_key": "gur-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Srinagar Airport → Razdan Pass (11,672 ft) → Dawar (Gurez)",
        "date": "2026-06-15",
        "summary": "Board an early morning flight from Mumbai (BOM) or Pune (PNQ) to Srinagar (SXR). Meet your 4x4 mountain cab and drive through the scenic northern shores of Wular Lake and Bandipora, ascending the hairpin turns of Razdan Pass before descending into the hidden Shangri-La of Dawar valley.",
        "activities": [
          {
            "_key": "gur1a",
            "title": "Morning Flight Mumbai / Pune to Srinagar Airport (~2.5 hrs)",
            "description": "Direct morning flight landing in Srinagar by 9:30 AM. Clear baggage and meet your driver with pre-arranged army permit passes.",
            "location": {
              "name": "Srinagar International Airport",
              "lat": 34.008,
              "lng": 74.7741
            },
            "time": "09:30 AM",
            "type": "transport",
            "cost": 6800,
            "currency": "INR",
            "notes": "Keep physical copies of Aadhaar card / ID for border checkposts."
          },
          {
            "_key": "gur1b",
            "title": "Scenic Drive through Bandipora & Wular Lake Viewpoint",
            "description": "Traverse apple orchards of north Kashmir and catch panoramic vistas of Wular Lake, India's largest freshwater lake.",
            "location": {
              "name": "Bandipora Wular Road",
              "lat": 34.4225,
              "lng": 74.6441
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Stop for hot Nadru pakoras and spiced Kahwa at Bandipora town."
          },
          {
            "_key": "gur1c",
            "title": "Razdan Pass Summit (3,557 m / 11,672 ft)",
            "description": "The high-altitude gateway between Kashmir Valley and Gurez with breath-taking views of Harmukh peak and rolling alpine meadows.",
            "location": {
              "name": "Razdan Pass Top",
              "lat": 34.5422,
              "lng": 74.6548
            },
            "time": "01:30 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Army checkpost requires registration. Temperature drops noticeably by 10°C."
          },
          {
            "_key": "gur1d",
            "title": "Arrival in Dawar & Check-in at Riverside Lodge",
            "description": "Descend into the emerald Kishanganga valley. Settle into your wooden log lodge facing the towering Habba Khatoon peak.",
            "location": {
              "name": "Dawar Main Town, Gurez",
              "lat": 34.6375,
              "lng": 74.7661
            },
            "time": "04:30 PM",
            "type": "accommodation",
            "cost": 2500,
            "currency": "INR",
            "notes": "Evening tea beside the turquoise Kishanganga river."
          }
        ]
      },
      {
        "_key": "gur-day2",
        "dayNumber": 2,
        "title": "Habba Khatoon Pyramid Peak & Dard-Shin Village Heritage",
        "date": "2026-06-16",
        "summary": "Spend a mesmerizing day discovering the legend of Kashmiri poetess-queen Habba Khatoon, tasting crystal glacial water from her sacred spring, and exploring traditional logwood hamlet life with the indigenous Dard-Shin community.",
        "activities": [
          {
            "_key": "gur2a",
            "title": "Habba Khatoon Peak Golden Hour Viewpoint",
            "description": "Watch dawn sunlight illuminate the sharp triangular limestone pyramid peak named after Kashmir's nightingale poetess.",
            "location": {
              "name": "Habba Khatoon Peak",
              "lat": 34.6492,
              "lng": 74.789
            },
            "time": "06:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "The peak dominates the Gurez skyline with sheer vertical limestone cliffs."
          },
          {
            "_key": "gur2b",
            "title": "Spring of Habba Khatoon & Riverside Trail",
            "description": "Visit the natural freshwater spring bubbling from the rock face where the queen once composed mournful verses for King Yusuf Shah Chak.",
            "location": {
              "name": "Habba Khatoon Spring",
              "lat": 34.648,
              "lng": 74.785
            },
            "time": "09:30 AM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "The spring water is pristine, ice-cold, and renowned for therapeutic minerals."
          },
          {
            "_key": "gur2c",
            "title": "Dard-Shin Cultural Heritage Walk in Dawar",
            "description": "Stroll through traditional multi-storey cedar-log homes, interacting with the Dardic Shin-speaking locals wearing embroidered caps and silver jewelry.",
            "location": {
              "name": "Dawar Heritage Village",
              "lat": 34.639,
              "lng": 74.765
            },
            "time": "02:00 PM",
            "type": "activity",
            "cost": 200,
            "currency": "INR",
            "notes": "The Dards are an ancient Indo-Aryan ethnic group with rich oral folklore traditions."
          },
          {
            "_key": "gur2d",
            "title": "Fresh Himalayan Trout Dinner at River View",
            "description": "Savor freshly caught pan-fried Kishanganga river trout served with warm walnut chutney and Kashmiri rice.",
            "location": {
              "name": "Dawar Riverfront",
              "lat": 34.636,
              "lng": 74.768
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 650,
            "currency": "INR",
            "notes": "Gurez is famous across Jammu & Kashmir for its crystal-clear rainbow trout waters."
          }
        ]
      },
      {
        "_key": "gur-day3",
        "dayNumber": 3,
        "title": "Dawar to Tulail Valley Expedition (Sheikhpora & Badugam)",
        "date": "2026-06-17",
        "summary": "Embark on an off-road day expedition along the upper Kishanganga River to remote Tulail Valley — exploring untouched wooden villages like Barnoi, Sheikhpora, and Badugam nestled right against snow-clad mountain passes.",
        "activities": [
          {
            "_key": "gur3a",
            "title": "Drive into Tulail Valley along Kishanganga (45 km)",
            "description": "Scenic 4WD drive passing narrow gorges, cascading waterfalls, and lush alpine pasture slopes towards the Dras frontier.",
            "location": {
              "name": "Tulail Valley Highway",
              "lat": 34.5714,
              "lng": 75.0519
            },
            "time": "08:30 AM",
            "type": "transport",
            "cost": 1200,
            "currency": "INR",
            "notes": "Road is unpaved in sections; high clearance 4WD SUV required."
          },
          {
            "_key": "gur3b",
            "title": "Traditional Wooden Log Architecture in Badugam",
            "description": "Discover entirely hand-carved cedarwood settlements with mud-insulated flat roofs and hanging corn cobs.",
            "location": {
              "name": "Badugam Village, Tulail",
              "lat": 34.582,
              "lng": 75.07
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Zero modern cement construction preserves the authentic 19th-century frontier look."
          },
          {
            "_key": "gur3c",
            "title": "Picnic Lunch at Sheikhpora Alpine Meadows",
            "description": "Unpack packed picnic lunch alongside blooming wild irises and grazing horses with snowfields towering above.",
            "location": {
              "name": "Sheikhpora Meadow",
              "lat": 34.568,
              "lng": 75.035
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 350,
            "currency": "INR",
            "notes": "Carry all trash back; leave zero trace in this delicate ecosystem."
          },
          {
            "_key": "gur3d",
            "title": "Evening Campfire & Dardic Storytelling Session",
            "description": "Gather around crackling cedar bonfire under starlit skies listening to village elders recount historical Silk Route legends.",
            "location": {
              "name": "Dawar Camp Ground",
              "lat": 34.6375,
              "lng": 74.7661
            },
            "time": "07:30 PM",
            "type": "activity",
            "cost": 500,
            "currency": "INR",
            "notes": "Warm down jackets essential as night temperature plummets."
          }
        ]
      },
      {
        "_key": "gur-day4",
        "dayNumber": 4,
        "title": "Kanzalwan Silk Route Crossing & Chorwan Borderlands",
        "date": "2026-06-18",
        "summary": "Visit Kanzalwan — the historic crossway where the ancient Silk Route bifurcated towards Gilgit and Central Asia — followed by the panoramic border viewpoints around Chorwan overlooking the Line of Control.",
        "activities": [
          {
            "_key": "gur4a",
            "title": "Drive to Kanzalwan Village & River Confluence",
            "description": "Explore the quiet outpost where Sir Aurel Stein and ancient Buddhist pilgrims crossed on their way to Gilgit and China.",
            "location": {
              "name": "Kanzalwan Village",
              "lat": 34.652,
              "lng": 74.698
            },
            "time": "09:00 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Surrounded by steep deodar forests and sheer cliffs."
          },
          {
            "_key": "gur4b",
            "title": "Chorwan LoC Border Viewpoint",
            "description": "Accompanied by Indian Army permissions, observe the peaceful frontier ridgeline dividing Jammu & Kashmir from Pakistan-administered Gilgit-Baltistan.",
            "location": {
              "name": "Chorwan Border Viewpoint",
              "lat": 34.675,
              "lng": 74.835
            },
            "time": "11:30 AM",
            "type": "activity",
            "cost": 100,
            "currency": "INR",
            "notes": "Strict photography restrictions apply towards defensive military installations."
          },
          {
            "_key": "gur4c",
            "title": "Traditional Noon Chai & Tsot Bread with Host Family",
            "description": "Sip salted pink noon chai brewed with baking soda and milk, paired with fresh oven-baked tandoori girda and lavas bread.",
            "location": {
              "name": "Dawar Homestay Kitchen",
              "lat": 34.6375,
              "lng": 74.7661
            },
            "time": "03:30 PM",
            "type": "food",
            "cost": 200,
            "currency": "INR",
            "notes": "Hearty traditional Kashmiri high tea hospitality."
          },
          {
            "_key": "gur4d",
            "title": "Night Astrophotography by Kishanganga River",
            "description": "With virtually zero light pollution, capture the Milky Way core arching above the silhouette of Habba Khatoon peak.",
            "location": {
              "name": "Kishanganga Riverbank",
              "lat": 34.637,
              "lng": 74.77
            },
            "time": "09:30 PM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Bortle Class 1 dark skies ideal for star trail photography."
          }
        ]
      },
      {
        "_key": "gur-day5",
        "dayNumber": 5,
        "title": "Dawar → Razdan Pass → Srinagar Shikara → Mumbai / Pune",
        "date": "2026-06-19",
        "summary": "Early morning farewell drive over Razdan Pass back into Kashmir Valley, enjoying an afternoon Shikara ride on Dal Lake and a traditional Wazwan feast before your return flight home.",
        "activities": [
          {
            "_key": "gur5a",
            "title": "Descent over Razdan Pass to Srinagar Valley (135 km, 4.5 hrs)",
            "description": "Bid farewell to Gurez and wind down through the pine-scented peaks to Srinagar.",
            "location": {
              "name": "Razdan Pass Descent",
              "lat": 34.5422,
              "lng": 74.6548
            },
            "time": "07:00 AM",
            "type": "transport",
            "cost": 2500,
            "currency": "INR",
            "notes": "Early start ensures reaching Srinagar with comfortable flight buffer."
          },
          {
            "_key": "gur5b",
            "title": "Dal Lake Shikara Ride & Floating Market",
            "description": "Glide silently along the water lilies and wooden houseboats of Dal Lake before lunch.",
            "location": {
              "name": "Dal Lake Ghat, Srinagar",
              "lat": 34.0837,
              "lng": 74.834
            },
            "time": "12:00 PM",
            "type": "activity",
            "cost": 600,
            "currency": "INR",
            "notes": "Relaxing contrast to the rugged mountain passes of the past 4 days."
          },
          {
            "_key": "gur5c",
            "title": "Authentic Kashmiri Wazwan Lunch at Ahdoos",
            "description": "Savor Gushtaba, Rista, Rogan Josh, and Tabak Maaz served over fragrant saffron rice.",
            "location": {
              "name": "Residency Road, Srinagar",
              "lat": 34.072,
              "lng": 74.816
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 950,
            "currency": "INR",
            "notes": "Historic 1918 culinary institution on the banks of Jhelum River."
          },
          {
            "_key": "gur5d",
            "title": "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            "description": "Transfer to Srinagar Airport for evening direct flight back home.",
            "location": {
              "name": "Srinagar International Airport",
              "lat": 34.008,
              "lng": 74.7741
            },
            "time": "05:00 PM",
            "type": "transport",
            "cost": 7200,
            "currency": "INR",
            "notes": "Arrive at airport 2.5 hours early due to multi-tier security checks."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-aru-valley-4-days",
    "title": "Aru Valley Meadow Sanctuary — 4 Days from Mumbai / Pune (via Srinagar & Pahalgam)",
    "slug": "aru-valley-4-days",
    "excerpt": "Escape Mumbai or Pune for Kashmir's most idyllic alpine meadow retreat — nestled 12 km past Pahalgam at 7,920 ft. Walk along the gushing Lidder River, hike towards Lidderwat pine glades, explore Gujjar shepherd hamlets, and unwind surrounded by silver firs and towering Himalayan peaks.",
    "tags": [
      "Himalayas",
      "Kashmir",
      "Meadows",
      "Trekking",
      "Nature",
      "Relaxation",
      "Offbeat",
      "India"
    ],
    "country": "India",
    "startDate": "2026-06-22",
    "endDate": "2026-06-25",
    "bestSuggestedMonth": "April – October & Dec – Feb for snow",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 16500,
    "currency": "INR",
    "tripType": "Alpine Meadow & Nature Trek",
    "readingTime": 8,
    "_createdAt": "2026-08-28T00:00:00Z",
    "_updatedAt": "2026-08-28T00:00:00Z",
    "itinerary": [
      {
        "_key": "aru-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Srinagar Airport → Pahalgam → Aru Valley (7,920 ft)",
        "date": "2026-06-22",
        "summary": "Take a morning flight from Mumbai (BOM) or Pune (PNQ) to Srinagar (SXR). Drive south past the saffron fields of Pampore and 9th-century Avantipur ruins to Pahalgam, then ascend the winding 12 km single-lane forest road into the serene pine-ringed bowl of Aru Valley.",
        "activities": [
          {
            "_key": "aru1a",
            "title": "Morning Flight BOM/PNQ to Srinagar Airport",
            "description": "Direct flight to Srinagar. Meet private cab outside terminal for the transfer to Lidder Valley.",
            "location": {
              "name": "Srinagar International Airport",
              "lat": 34.008,
              "lng": 74.7741
            },
            "time": "09:30 AM",
            "type": "transport",
            "cost": 6500,
            "currency": "INR",
            "notes": "Grab a bottle of fresh saffron kehwa from the airport lounge."
          },
          {
            "_key": "aru1b",
            "title": "Pampore Saffron Fields & Awantipora Hindu Temple Ruins",
            "description": "Stop at the 9th-century Avantiswami temple built by King Avantivarman dedicated to Lord Vishnu with intricate basalt stone carvings.",
            "location": {
              "name": "Awantipora Ruins",
              "lat": 33.9238,
              "lng": 75.0152
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 25,
            "currency": "INR",
            "notes": "ASI protected site; buy certified saffron from nearby farmers' co-op."
          },
          {
            "_key": "aru1c",
            "title": "Ascent past Pahalgam into Aru Valley (12 km, 30 min)",
            "description": "Bypass tourist crowds in Pahalgam and drive through dense deodar forests alongside gushing Aru Nallah stream.",
            "location": {
              "name": "Aru Valley Trailhead",
              "lat": 34.09,
              "lng": 75.26
            },
            "time": "02:30 PM",
            "type": "transport",
            "cost": 800,
            "currency": "INR",
            "notes": "Local Pahalgam taxi union regulates transfers; pre-booked vehicle arranged."
          },
          {
            "_key": "aru1d",
            "title": "Check-in at Aru Wooden Eco-Lodge & Golden Hour Stroll",
            "description": "Settle into your cottage surrounded by terraced meadows and grazing ponies with Mt. Kolahoi visible in the distance.",
            "location": {
              "name": "Aru Eco Village",
              "lat": 34.091,
              "lng": 75.261
            },
            "time": "04:30 PM",
            "type": "accommodation",
            "cost": 2200,
            "currency": "INR",
            "notes": "Unwind with steaming cup of cinnamon-spiced Kashmiri Kehwa."
          }
        ]
      },
      {
        "_key": "aru-day2",
        "dayNumber": 2,
        "title": "Day Hike towards Lidderwat & Gujjar Shepherd Settlements",
        "date": "2026-06-23",
        "summary": "Trek the legendary first leg of the Kolahoi Glacier & Tarsar Marsar trail — ascending through aromatic pine forests, crossing wooden log bridges over glacial torrents, and picnicking in the alpine glades of Lidderwat base.",
        "activities": [
          {
            "_key": "aru2a",
            "title": "Morning Trek to Lidderwat Trail (10 km round trip)",
            "description": "Gentle 3-to-4 hour walk along Lidder River through dense silver firs, maple groves, and open riverside boulder fields.",
            "location": {
              "name": "Lidderwat Trailhead",
              "lat": 34.15,
              "lng": 75.25
            },
            "time": "08:30 AM",
            "type": "activity",
            "cost": 800,
            "currency": "INR",
            "notes": "Local trekking guide included. Ponies available for those preferring to ride."
          },
          {
            "_key": "aru2b",
            "title": "Visit Nomadic Gujjar Log Cabins & Noon Chai Tasting",
            "description": "Interact with seasonal pastoralist shepherds, observing traditional buffalo butter churning and woodcraft in authentic dhoks.",
            "location": {
              "name": "Lidder Glade Shepherds",
              "lat": 34.14,
              "lng": 75.252
            },
            "time": "11:30 AM",
            "type": "activity",
            "cost": 150,
            "currency": "INR",
            "notes": "Warm hospitality; gift of biscuits or stationery appreciated by children."
          },
          {
            "_key": "aru2c",
            "title": "Riverside Picnic Lunch along Aru Nallah",
            "description": "Enjoy fresh boiled eggs, parathas, and local apple jam beside the foaming glacial river.",
            "location": {
              "name": "Lidder River Bank",
              "lat": 34.12,
              "lng": 75.256
            },
            "time": "01:00 PM",
            "type": "food",
            "cost": 300,
            "currency": "INR",
            "notes": "The water is ice-cold straight from the Kolahoi Glacier."
          },
          {
            "_key": "aru2d",
            "title": "Traditional Kashmiri Wazwan Feast at Aru",
            "description": "Relish Rista (meatballs in saffron-red gravy), Rogan Josh, and Haakh greens cooked by local chef.",
            "location": {
              "name": "Aru Village Restaurant",
              "lat": 34.09,
              "lng": 75.26
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 650,
            "currency": "INR",
            "notes": "Vegetarian options like Nadru Yakhni and Dum Aloo also served."
          }
        ]
      },
      {
        "_key": "aru-day3",
        "dayNumber": 3,
        "title": "Green Top & Kootpathri Wildflower Meadows Ridge Trek",
        "date": "2026-06-24",
        "summary": "A moderate 4 km uphill hike to Green Top ridge viewpoint providing a 360-degree panorama of Aru Valley, Katrinag peak, and distant snow peaks, followed by an afternoon of wildflower spotting in Kootpathri pasture.",
        "activities": [
          {
            "_key": "aru3a",
            "title": "Hike to Green Top Viewpoint (2,850 m)",
            "description": "Scenic climb through oak and birch woods opening out onto a lush green plateau overlooking the entire valley amphitheatre.",
            "location": {
              "name": "Green Top Viewpoint",
              "lat": 34.105,
              "lng": 75.275
            },
            "time": "09:00 AM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Carry binoculars to spot Himalayan monal pheasants and golden eagles."
          },
          {
            "_key": "aru3b",
            "title": "Kootpathri Alpine Meadow Walk & Wildflowers",
            "description": "Stroll across rolling alpine pastures carpeted in wild anemones, primulas, and forget-me-nots in early summer.",
            "location": {
              "name": "Kootpathri Meadow",
              "lat": 34.1,
              "lng": 75.27
            },
            "time": "12:00 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Peaceful off-the-beaten-path meadow with barely any tourists."
          },
          {
            "_key": "aru3c",
            "title": "Trout Angling or Riverside Reading by Aru Stream",
            "description": "Try catch-and-release brown trout fly-fishing with permit or read quietly listening to rushing glacial waters.",
            "location": {
              "name": "Aru Stream Banks",
              "lat": 34.089,
              "lng": 75.259
            },
            "time": "03:30 PM",
            "type": "activity",
            "cost": 500,
            "currency": "INR",
            "notes": "Angling permits can be obtained via J&K Fisheries department."
          },
          {
            "_key": "aru3d",
            "title": "Starlit Campfire Evening in Aru Meadow",
            "description": "Bonfire in the courtyard under star-studded Himalayan skies with hot walnut brownies and kahwa.",
            "location": {
              "name": "Aru Eco Cottage Lawn",
              "lat": 34.091,
              "lng": 75.261
            },
            "time": "08:00 PM",
            "type": "accommodation",
            "cost": 400,
            "currency": "INR",
            "notes": "Crisp night air with temperatures hovering around 8–12°C in summer."
          }
        ]
      },
      {
        "_key": "aru-day4",
        "dayNumber": 4,
        "title": "Aru Valley → Betaab Valley Confluence → Srinagar Airport → Mumbai / Pune",
        "date": "2026-06-25",
        "summary": "Enjoy early dawn photography across mist-shrouded Aru meadows, visit the scenic Betaab Valley confluence near Pahalgam, and drive back along National Highway 44 to Srinagar for your return flight.",
        "activities": [
          {
            "_key": "aru4a",
            "title": "Morning Sunrise Photography in Aru Meadow",
            "description": "Witness golden sunlight piercing through the pines onto mist hanging over the valley floor.",
            "location": {
              "name": "Aru Central Meadow",
              "lat": 34.09,
              "lng": 75.26
            },
            "time": "06:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Best lighting of the trip for landscape photography."
          },
          {
            "_key": "aru4b",
            "title": "Brief Visit to Betaab Valley (Hajan Valley)",
            "description": "Famous movie shooting location with crystal-clear turquoise stream waters and manicured willow gardens.",
            "location": {
              "name": "Betaab Valley, Pahalgam",
              "lat": 34.03,
              "lng": 75.35
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 100,
            "currency": "INR",
            "notes": "Entry ticket ₹100 per person; 45-min stroll."
          },
          {
            "_key": "aru4c",
            "title": "Drive to Srinagar Airport (95 km, 2.5 hrs)",
            "description": "Smooth highway drive through saffron country to Srinagar terminal.",
            "location": {
              "name": "Srinagar International Airport",
              "lat": 34.008,
              "lng": 74.7741
            },
            "time": "01:30 PM",
            "type": "transport",
            "cost": 2200,
            "currency": "INR",
            "notes": "Allow plenty of time for Srinagar highway traffic."
          },
          {
            "_key": "aru4d",
            "title": "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            "description": "Board late afternoon flight home carrying memories of Kashmir's most peaceful mountain meadow.",
            "location": {
              "name": "Srinagar International Airport",
              "lat": 34.008,
              "lng": 74.7741
            },
            "time": "04:30 PM",
            "type": "transport",
            "cost": 6800,
            "currency": "INR",
            "notes": "Direct or one-stop connection back to Mumbai or Pune."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-yusmarg-4-days",
    "title": "Yusmarg 'Meadow of Jesus' & Doodhganga River — 4 Days from Mumbai / Pune",
    "slug": "yusmarg-4-days",
    "excerpt": "A serene 4-day mountain sojourn from Mumbai or Pune to Yusmarg — the legendary 'Meadow of Jesus' tucked away in the Pir Panjal range just 47 km from Srinagar. Wander through rolling green carpets, trek to the frothing waters of Doodhganga river, visit turquoise Nilnag Lake, and experience untouched Kashmiri serenity.",
    "tags": [
      "Himalayas",
      "Kashmir",
      "Meadows",
      "Peaceful",
      "Trekking",
      "Offbeat",
      "Nature",
      "India"
    ],
    "country": "India",
    "startDate": "2026-06-27",
    "endDate": "2026-06-30",
    "bestSuggestedMonth": "April – October & Jan – Feb for snow",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 15500,
    "currency": "INR",
    "tripType": "Alpine Pastures & River Trek",
    "readingTime": 8,
    "_createdAt": "2026-08-28T00:00:00Z",
    "_updatedAt": "2026-08-28T00:00:00Z",
    "itinerary": [
      {
        "_key": "yus-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Srinagar Airport → Charar-i-Sharief → Yusmarg (7,861 ft)",
        "date": "2026-06-27",
        "summary": "Take an early morning flight from Mumbai (BOM) or Pune (PNQ) to Srinagar (SXR). Drive southwest through the apple orchards of Budgam, pausing at the historic 600-year-old wooden shrine of Sheikh Noor-ud-Din Wali in Charar-i-Sharief, before arriving at the sweeping alpine meadows of Yusmarg.",
        "activities": [
          {
            "_key": "yus1a",
            "title": "Morning Flight Mumbai / Pune to Srinagar Airport",
            "description": "Direct morning arrival in Srinagar. Board waiting private taxi for the scenic 47 km drive southwest.",
            "location": {
              "name": "Srinagar International Airport",
              "lat": 34.008,
              "lng": 74.7741
            },
            "time": "09:30 AM",
            "type": "transport",
            "cost": 6500,
            "currency": "INR",
            "notes": "Yusmarg is the closest major alpine meadow to Srinagar airport (under 2 hours drive)."
          },
          {
            "_key": "yus1b",
            "title": "Heritage Visit to Charar-i-Sharief Sufi Shrine",
            "description": "Visit the revered shrine dedicated to Kashmir's patron Sufi saint Sheikh Noor-ud-Din Noorani (Nund Rishi), famous for traditional woodwork and peaceful ambiance.",
            "location": {
              "name": "Charar-i-Sharief Shrine",
              "lat": 33.8642,
              "lng": 74.7678
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Dress respectfully; head covering required for both men and women."
          },
          {
            "_key": "yus1c",
            "title": "Arrival at Yusmarg Meadow (2,396 m) & JKTDC Cottage Check-in",
            "description": "Emerge from pine forest into vast rolling emerald grasslands framed by the snow-capped Pir Panjal range and Tatakoti peak.",
            "location": {
              "name": "Yusmarg Alpine Meadow",
              "lat": 33.83,
              "lng": 74.66
            },
            "time": "02:00 PM",
            "type": "accommodation",
            "cost": 2000,
            "currency": "INR",
            "notes": "Check into cozy JKTDC tourist huts or pine view alpine resort."
          },
          {
            "_key": "yus1d",
            "title": "Golden Hour Stroll across Central Pastures",
            "description": "Walk across the springy turf where legend says Jesus once walked. Watch grazing sheep and horses against the setting sun.",
            "location": {
              "name": "Yusmarg Central Pastures",
              "lat": 33.828,
              "lng": 74.658
            },
            "time": "05:00 PM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Yusmarg is blessed with zero commercial clutter or loud crowds."
          }
        ]
      },
      {
        "_key": "yus-day2",
        "dayNumber": 2,
        "title": "Doodhganga River Trek & Sang-e-Safed Valley Foothills",
        "date": "2026-06-28",
        "summary": "Descend through aromatic blue pine forests to the foaming, milky torrent of Doodhganga River, continuing on foot or horseback along the boulder-strewn glacial valley towards the snowbound amphitheatre of Sang-e-Safed.",
        "activities": [
          {
            "_key": "yus2a",
            "title": "Pine Forest Descent to Doodhganga Gorge (2 km, 45 min)",
            "description": "Walk down through towering fir and pine woods to the roaring river, named 'Milk River' because its frothing white waters resemble milk.",
            "location": {
              "name": "Doodhganga River Trail",
              "lat": 33.815,
              "lng": 74.648
            },
            "time": "09:00 AM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Gentle descent; pony hire available for ₹400 if preferred."
          },
          {
            "_key": "yus2b",
            "title": "Riverside Relaxation & Pebble Skipping by Doodhganga",
            "description": "Sit on giant sun-warmed river boulders, dipping feet in ice-cold glacial meltwater and listening to the mountain roar.",
            "location": {
              "name": "Doodhganga River Banks",
              "lat": 33.812,
              "lng": 74.645
            },
            "time": "11:00 AM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Take care near fast-flowing currents."
          },
          {
            "_key": "yus2c",
            "title": "Picnic Trek towards Sang-e-Safed (White Rock) Valley",
            "description": "Follow the upstream trail towards the oval-shaped glacial valley of Sang-e-Safed (10 km one-way) surrounded by perpetual snowfields.",
            "location": {
              "name": "Sang-e-Safed Valley Trail",
              "lat": 33.785,
              "lng": 74.62
            },
            "time": "01:00 PM",
            "type": "activity",
            "cost": 700,
            "currency": "INR",
            "notes": "Trek as far as comfort allows; packed lunch provided by lodge."
          },
          {
            "_key": "yus2d",
            "title": "Traditional Kashmiri Dinner with Rogan Josh & Haakh",
            "description": "Warm up in the wooden dining hall with slow-cooked mutton rogan josh, collard haakh greens, and steaming Kashmiri rice.",
            "location": {
              "name": "Yusmarg Tourist Complex",
              "lat": 33.83,
              "lng": 74.66
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 600,
            "currency": "INR",
            "notes": "Finish with a cup of soothing cardamom and almond kahwa."
          }
        ]
      },
      {
        "_key": "yus-day3",
        "dayNumber": 3,
        "title": "Nilnag Alpine Blue Lake Forest Expedition",
        "date": "2026-06-29",
        "summary": "Trek or take a short off-road cab through thick deodar forest to Nilnag — an exquisite, secluded freshwater lake famous for its deep aquamarine color, water lilies, and tranquil pine-clad banks.",
        "activities": [
          {
            "_key": "yus3a",
            "title": "Trek through Blue Pine Forest to Nilnag Lake (4 km, 1.5 hrs)",
            "description": "A scenic bridle path winding through chir and blue pine ridges down into the hidden lake basin.",
            "location": {
              "name": "Nilnag Lake Trail",
              "lat": 33.842,
              "lng": 74.698
            },
            "time": "09:30 AM",
            "type": "activity",
            "cost": 300,
            "currency": "INR",
            "notes": "Can also be reached via rough 4x4 road from Nagam village."
          },
          {
            "_key": "yus3b",
            "title": "Nilnag Lake Exploration & Photography",
            "description": "Surrounded by pine-blanketed hills, the lake gets its name ('Blue Lake') from its brilliant teal hue reflecting the mountain sky.",
            "location": {
              "name": "Nilnag Lake, Yusmarg",
              "lat": 33.842,
              "lng": 74.698
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Historical lake noted in the Rajatarangini chronicles of Kashmir."
          },
          {
            "_key": "yus3c",
            "title": "Lakeside Village Dhaba Lunch",
            "description": "Taste piping hot Rajma chawal, aloo jeera, and crisp tandoori roti at a family-run wooden shack.",
            "location": {
              "name": "Nilnag Village Dhaba",
              "lat": 33.843,
              "lng": 74.695
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 250,
            "currency": "INR",
            "notes": "Simple, honest, and comforting mountain meal."
          },
          {
            "_key": "yus3d",
            "title": "Sunset Viewpoint over Tatakoti & Sunset Peaks",
            "description": "Watch dusk turn the Pir Panjal snows to burnt orange from the high western rim of Yusmarg.",
            "location": {
              "name": "Yusmarg Ridge Viewpoint",
              "lat": 33.832,
              "lng": 74.655
            },
            "time": "06:30 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Tatakoti Peak (4,725 m) stands majestic in the southern horizon."
          }
        ]
      },
      {
        "_key": "yus-day4",
        "dayNumber": 4,
        "title": "Yusmarg → Srinagar Old City Heritage → Mumbai / Pune",
        "date": "2026-06-30",
        "summary": "Enjoy a final morning walk across the tranquil meadows, drive down to Srinagar for a quick exploration of the historic 14th-century Jamia Masjid in Old City, before boarding your flight back to Mumbai or Pune.",
        "activities": [
          {
            "_key": "yus4a",
            "title": "Dawn Walk in the Dew-Soaked Meadows",
            "description": "Take deep breaths of crisp Himalayan mountain air scented with pine resin and wild herbs.",
            "location": {
              "name": "Yusmarg Meadows",
              "lat": 33.83,
              "lng": 74.66
            },
            "time": "07:00 AM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Horses run freely across the mist-covered slopes at sunrise."
          },
          {
            "_key": "yus4b",
            "title": "Scenic Drive Yusmarg to Srinagar (47 km, 1.5 hrs)",
            "description": "Descend from the highlands through terraced mustard and apple fields into Srinagar city.",
            "location": {
              "name": "Yusmarg to Srinagar Highway",
              "lat": 33.95,
              "lng": 74.75
            },
            "time": "09:30 AM",
            "type": "transport",
            "cost": 1500,
            "currency": "INR",
            "notes": "Smooth paved road with panoramic views of Srinagar basin."
          },
          {
            "_key": "yus4c",
            "title": "Historic Jamia Masjid Srinagar & Spicemarket Walk",
            "description": "Visit the magnificent 600-year-old Indo-Saracenic wooden mosque featuring 378 majestic deodar pillars and courtyard fountain.",
            "location": {
              "name": "Jamia Masjid, Nowhatta",
              "lat": 34.1011,
              "lng": 74.815
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Pick up pure Kashmiri walnuts, dried morels (guchhi), and saffron."
          },
          {
            "_key": "yus4d",
            "title": "Transfer to Srinagar Airport & Return Flight to BOM / PNQ",
            "description": "Check in for late afternoon direct flight back to Mumbai or Pune.",
            "location": {
              "name": "Srinagar International Airport",
              "lat": 34.008,
              "lng": 74.7741
            },
            "time": "03:30 PM",
            "type": "transport",
            "cost": 6500,
            "currency": "INR",
            "notes": "Arrive 2.5 hours prior to departure for security screening."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-turtuk-5-days",
    "title": "Turtuk Balti Frontier & Nubra Valley — 5 Days from Mumbai / Pune (via Leh & Khardung La)",
    "slug": "turtuk-5-days",
    "excerpt": "Venture from Mumbai or Pune across the legendary Khardung La Pass (17,982 ft) into Nubra Valley and further to Turtuk — the northernmost Balti settlement in India, opened to travellers only in 2010. Experience stone-and-wood Balti architecture, lush apricot orchards, organic walnut farming, and century-old Tibetan-Persian heritage on the edge of the Karakoram.",
    "tags": [
      "Himalayas",
      "Ladakh",
      "Balti",
      "Borderlands",
      "High Altitude",
      "Culture",
      "Adventure",
      "India"
    ],
    "country": "India",
    "startDate": "2026-07-05",
    "endDate": "2026-07-09",
    "bestSuggestedMonth": "May – October",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 26000,
    "currency": "INR",
    "tripType": "Karakoram Frontier Cultural Road Trip",
    "readingTime": 10,
    "_createdAt": "2026-08-28T00:00:00Z",
    "_updatedAt": "2026-08-28T00:00:00Z",
    "itinerary": [
      {
        "_key": "tur-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Leh Airport (11,500 ft) — Mandatory Acclimatisation",
        "date": "2026-07-05",
        "summary": "Catch an early morning flight from Mumbai (BOM) or Pune (PNQ) to Leh (IXL) over the snow-bound Himalayas. Dedicate the entire first day to strict high-altitude acclimatisation — resting, hydrating, and taking a gentle evening walk around the historic Leh Main Bazaar.",
        "activities": [
          {
            "_key": "tur1a",
            "title": "Morning Flight BOM/PNQ to Leh Kushok Bakula Rimpochee Airport",
            "description": "Spectacular aerial landing over the Stok Kangri and Zanskar ranges. Arrive at 3,524 m altitude.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "08:30 AM",
            "type": "transport",
            "cost": 8500,
            "currency": "INR",
            "notes": "Diamox (as per doctor advice) and immediate rest are crucial for altitude acclimatisation."
          },
          {
            "_key": "tur1b",
            "title": "Check-in at Hotel & Mandatory Full Day Rest",
            "description": "Lie down, sip hot water, garlic soup, or ginger lemon tea. Do not shower or rush around on Day 1.",
            "location": {
              "name": "Leh Main Town Hotel",
              "lat": 34.1642,
              "lng": 77.584
            },
            "time": "10:00 AM",
            "type": "accommodation",
            "cost": 3200,
            "currency": "INR",
            "notes": "Keep pulse oximeter handy; target SpO2 above 85%."
          },
          {
            "_key": "tur1c",
            "title": "Gentle Evening Stroll in Leh Main Bazaar & Shanti Stupa View",
            "description": "A relaxed flat walk through the pedestrianized stone market lined with Tibetan handicraft stores and organic cafes.",
            "location": {
              "name": "Leh Main Bazaar",
              "lat": 34.1645,
              "lng": 77.585
            },
            "time": "05:30 PM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Collect Inner Line Permits (ILP) / Protected Area Permits for Nubra & Turtuk from travel agent."
          },
          {
            "_key": "tur1d",
            "title": "Warm Ladakhi Thukpa Dinner at Tibetan Kitchen",
            "description": "Comforting handmade pulled noodle soup with mountain greens and momos.",
            "location": {
              "name": "Fort Road, Leh",
              "lat": 34.162,
              "lng": 77.583
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 450,
            "currency": "INR",
            "notes": "Light, easily digestible meal recommended during acclimatisation."
          }
        ]
      },
      {
        "_key": "tur-day2",
        "dayNumber": 2,
        "title": "Leh → Khardung La Pass (17,982 ft) → Diskit → Turtuk (205 km)",
        "date": "2026-07-06",
        "summary": "Drive across the famed Khardung La pass into the Shyok river gorge of Nubra Valley, driving past the Diskit Monastery and military settlements of Thoise to reach Turtuk — nestled right beneath the soaring peaks of Karakoram.",
        "activities": [
          {
            "_key": "tur2a",
            "title": "Ascent to Khardung La Pass Summit (5,359 m / 17,982 ft)",
            "description": "Cross one of the highest motorable mountain passes in the world with breathtaking views of the Karakoram range to the north.",
            "location": {
              "name": "Khardung La Pass Summit",
              "lat": 34.2789,
              "lng": 77.6045
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Do NOT stay longer than 15-20 minutes at the top to avoid Acute Mountain Sickness (AMS)."
          },
          {
            "_key": "tur2b",
            "title": "Diskit Giant Maitreya Buddha & Monastery Stop",
            "description": "Behold the 106-foot tall colorful statue of Maitreya Buddha overlooking the Nubra-Shyok confluence.",
            "location": {
              "name": "Diskit Monastery",
              "lat": 34.5429,
              "lng": 77.5594
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Nubra's oldest monastery dating back to the 14th century."
          },
          {
            "_key": "tur2c",
            "title": "Drive through Shyok Gorge & Bogdang Checkpost",
            "description": "Follow the turquoise Shyok River into the Baltistan frontier, crossing through the traditional village of Bogdang.",
            "location": {
              "name": "Bogdang Frontier Checkpost",
              "lat": 34.6715,
              "lng": 77.2185
            },
            "time": "02:00 PM",
            "type": "transport",
            "cost": 0,
            "currency": "INR",
            "notes": "Army permit verification; checkpost manned by Ladakh Scouts."
          },
          {
            "_key": "tur2d",
            "title": "Arrive Turtuk (2,900 m) & Check-in at Wooden Balti Homestay",
            "description": "Cross the wooden footbridge into Turtuk Farol, greeted by lush apricot orchards and friendly Balti villagers.",
            "location": {
              "name": "Turtuk Farol Village",
              "lat": 34.8467,
              "lng": 76.8286
            },
            "time": "05:00 PM",
            "type": "accommodation",
            "cost": 2500,
            "currency": "INR",
            "notes": "At 2,900 m, Turtuk is noticeably warmer and richer in oxygen than Leh."
          }
        ]
      },
      {
        "_key": "tur-day3",
        "dayNumber": 3,
        "title": "Turtuk Heritage: Yabgo Royal Palace, Natural Cold Storage & Orchards",
        "date": "2026-07-07",
        "summary": "Spend a magical day exploring the twin villages of Turtuk Farol and Youl — visiting the Yabgo Royal Dynasty Palace Museum, inspecting ancient natural rock refrigerators, wandering through stone-walled apricot groves, and savoring authentic Balti cuisine.",
        "activities": [
          {
            "_key": "tur3a",
            "title": "Yabgo Royal Heritage Palace Museum Tour",
            "description": "Guided tour by the reigning descendant of the Yabgo dynasty that ruled Baltistan for over 1,000 years, viewing weapons, armor, and royal robes.",
            "location": {
              "name": "Yabgo Royal Palace, Turtuk",
              "lat": 34.848,
              "lng": 76.8305
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 150,
            "currency": "INR",
            "notes": "The royal house features traditional Tibetan-Persian woodwork and ancestral artifacts."
          },
          {
            "_key": "tur3b",
            "title": "Ancient Natural Cold Storage (Nangchung)",
            "description": "Inspect ingenious hollow stone chambers cooled by subterranean glacial air currents where villagers preserve butter and meat all summer.",
            "location": {
              "name": "Turtuk Farol Cold Chambers",
              "lat": 34.847,
              "lng": 76.827
            },
            "time": "11:30 AM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Natural geological refrigeration functioning flawlessly for centuries."
          },
          {
            "_key": "tur3c",
            "title": "Balti Feast: Kissir Buckwheat Pancakes & Muskat Walnut Paste",
            "description": "Delight in regional Balti delicacies: fresh Kissir with spicy mint-walnut sauce, dried apricot stew, and homemade herbal tea.",
            "location": {
              "name": "Balti Kitchen, Turtuk Youl",
              "lat": 34.846,
              "lng": 76.829
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 450,
            "currency": "INR",
            "notes": "Distinct from Ladakhi food; heavily influenced by Central Asian and Persian culinary roots."
          },
          {
            "_key": "tur3d",
            "title": "Hike to Turtuk Gompa Viewpoint for Sunset over K2 Foothills",
            "description": "Climb through barley terraces to the solitary Buddhist monastery perched on a cliff edge with panoramic views into northern Karakoram.",
            "location": {
              "name": "Turtuk Gompa",
              "lat": 34.8495,
              "lng": 76.832
            },
            "time": "05:30 PM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Spectacular golden hour light over the Shyok river canyon."
          }
        ]
      },
      {
        "_key": "tur-day4",
        "dayNumber": 4,
        "title": "Tyakshi LoC Border Village → Hunder Sand Dunes Camel Safari",
        "date": "2026-07-08",
        "summary": "Visit Tyakshi and Thang — the absolute last Indian villages on the Line of Control with Pakistan — before driving back to Hunder to experience double-humped Bactrian camel rides amongst the rolling white sand dunes.",
        "activities": [
          {
            "_key": "tur4a",
            "title": "Excursion to Tyakshi & Thang Border Viewpoint (10 km)",
            "description": "The northernmost point accessible to tourists in India; stand at the border marker overlooking the village of Phobrang across the LoC.",
            "location": {
              "name": "Thang Border Post",
              "lat": 34.872,
              "lng": 76.795
            },
            "time": "09:00 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Indian Army post with small canteen serving tea; carry original Aadhaar/passport."
          },
          {
            "_key": "tur4b",
            "title": "Drive Turtuk to Hunder Desert Oasis (85 km, 2.5 hrs)",
            "description": "Retrace the scenic Shyok river valley back towards the white sand dunes of central Nubra.",
            "location": {
              "name": "Shyok River Road",
              "lat": 34.6,
              "lng": 77.4
            },
            "time": "12:00 PM",
            "type": "transport",
            "cost": 1500,
            "currency": "INR",
            "notes": "Stop for quick lunch and fresh seabuckthorn juice at Diskit."
          },
          {
            "_key": "tur4c",
            "title": "Bactrian Double-Humped Camel Safari at Hunder Dunes",
            "description": "Ride shaggy two-humped Bactrian camels — descendants of the ancient Silk Route caravans — across undulating cold desert dunes.",
            "location": {
              "name": "Hunder Sand Dunes",
              "lat": 34.5775,
              "lng": 77.4728
            },
            "time": "05:00 PM",
            "type": "activity",
            "cost": 350,
            "currency": "INR",
            "notes": "Stunning contrast of white sand, green sea-buckthorn bushes, and snow-capped peaks."
          },
          {
            "_key": "tur4d",
            "title": "Overnight in Luxury Desert Glamping Camp at Hunder",
            "description": "Sleep under the stars in deluxe Swiss cottage tents with attached bath and hot water.",
            "location": {
              "name": "Hunder Valley Camps",
              "lat": 34.58,
              "lng": 77.47
            },
            "time": "07:30 PM",
            "type": "accommodation",
            "cost": 3500,
            "currency": "INR",
            "notes": "Buffet dinner with Ladakhi cultural dance performance."
          }
        ]
      },
      {
        "_key": "tur-day5",
        "dayNumber": 5,
        "title": "Hunder → Khardung La → Leh Airport → Mumbai / Pune",
        "date": "2026-07-09",
        "summary": "Early morning crossing over Khardung La Pass descending directly to Leh Kushok Bakula Rimpochee Airport for your afternoon flight back to Mumbai or Pune.",
        "activities": [
          {
            "_key": "tur5a",
            "title": "Drive Hunder to Khardung La to Leh (125 km, 4.5 hrs)",
            "description": "Early 5:30 AM departure to beat pass traffic and ascend over the Karakoram ridge into Leh valley.",
            "location": {
              "name": "Khardung La Highway",
              "lat": 34.2789,
              "lng": 77.6045
            },
            "time": "05:30 AM",
            "type": "transport",
            "cost": 2800,
            "currency": "INR",
            "notes": "Packed breakfast provided by Hunder camp."
          },
          {
            "_key": "tur5b",
            "title": "Quick Souvenir Stop at Leh Tibetan Market",
            "description": "Pick up hand-spun Ladakhi pashmina, organic dried apricots, and turquoise jewelry.",
            "location": {
              "name": "Leh Tibetan Refugee Market",
              "lat": 34.163,
              "lng": 77.582
            },
            "time": "10:30 AM",
            "type": "activity",
            "cost": 500,
            "currency": "INR",
            "notes": "Ensure pashmina has official government GI tag."
          },
          {
            "_key": "tur5c",
            "title": "Transfer to Leh Kushok Bakula Rimpochee Airport (IXL)",
            "description": "Drop at airport terminal for departure.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "11:30 AM",
            "type": "transport",
            "cost": 400,
            "currency": "INR",
            "notes": "Strict powerbank and battery check rules apply in baggage."
          },
          {
            "_key": "tur5d",
            "title": "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            "description": "Board afternoon connecting flight back to Mumbai or Pune carrying memories of Baltistan.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "01:00 PM",
            "type": "transport",
            "cost": 8800,
            "currency": "INR",
            "notes": "Window seats on the right side offer panoramic Himalayan views."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-basgo-4-days",
    "title": "Basgo Royal Citadel & Sham Valley Heritage — 4 Days from Mumbai / Pune (via Leh)",
    "slug": "basgo-4-days",
    "excerpt": "Discover Ladakh's medieval history on a 4-day trip from Mumbai or Pune centered around the dramatic mud-brick citadel and 16th-century golden Maitreya Buddha of Basgo Gompa. Combine ancient cliffside ruins with Sham Valley highlights: the Indus-Zanskar confluence at Nimmu, Magnetic Hill, and the 1,000-year-old murals of Likir and Alchi.",
    "tags": [
      "Himalayas",
      "Ladakh",
      "Heritage",
      "Monasteries",
      "Culture",
      "History",
      "Offbeat",
      "India"
    ],
    "country": "India",
    "startDate": "2026-07-12",
    "endDate": "2026-07-15",
    "bestSuggestedMonth": "April – November",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 17500,
    "currency": "INR",
    "tripType": "Historic Citadel & Monastery Circuit",
    "readingTime": 8,
    "_createdAt": "2026-08-28T00:00:00Z",
    "_updatedAt": "2026-08-28T00:00:00Z",
    "itinerary": [
      {
        "_key": "bas-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Leh Airport → Acclimatisation & Spituk Gompa",
        "date": "2026-07-12",
        "summary": "Arrive in Leh from Mumbai or Pune. Spend the day gently acclimatising to the thin mountain air at 11,500 ft, followed by a relaxed late-afternoon visit to the 11th-century cliff-top Spituk Monastery overlooking the Indus River.",
        "activities": [
          {
            "_key": "bas1a",
            "title": "Morning Flight BOM/PNQ to Leh Airport",
            "description": "Scenic trans-Himalayan flight landing in Leh. Transfer to hotel for mandatory acclimatisation rest.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "08:30 AM",
            "type": "transport",
            "cost": 8200,
            "currency": "INR",
            "notes": "Rest completely for first 6 hours; drink plenty of water with ORS."
          },
          {
            "_key": "bas1b",
            "title": "Spituk Gompa (Maryul Monastery) & Kali Mata Temple",
            "description": "Visit the Gelugpa monastery founded by Od-de in the 11th century, perched dramatically atop an isolated hillock.",
            "location": {
              "name": "Spituk Monastery",
              "lat": 34.1294,
              "lng": 77.5258
            },
            "time": "04:30 PM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Houses ancient thangkas and an iconic temple dedicated to Goddess Mahakali."
          },
          {
            "_key": "bas1c",
            "title": "Twilight View from Shanti Stupa",
            "description": "Watch the sun sink behind the Zanskar range, illuminating the Leh Valley and Stok Kangri peak in golden light.",
            "location": {
              "name": "Shanti Stupa, Leh",
              "lat": 34.167,
              "lng": 77.575
            },
            "time": "06:30 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Drive directly up to the top car park to avoid climbing steps on Day 1."
          },
          {
            "_key": "bas1d",
            "title": "Traditional Ladakhi Skyu & Mok-Mok Dinner",
            "description": "Savor Skyu (traditional pasta stew cooked with root vegetables and dried yak cheese) at a heritage restaurant.",
            "location": {
              "name": "Leh Heritage Kitchen",
              "lat": 34.164,
              "lng": 77.584
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 400,
            "currency": "INR",
            "notes": "Wholesome, slow-cooked indigenous comfort food."
          }
        ]
      },
      {
        "_key": "bas-day2",
        "dayNumber": 2,
        "title": "Magnetic Hill → Sangam Confluence → Basgo Royal Citadel & Maitreya Temples",
        "date": "2026-07-13",
        "summary": "Drive west down the Indus Highway past the optical illusion of Magnetic Hill and the dramatic confluence of the Indus and Zanskar rivers, ascending to the medieval royal mud-brick citadel and 16th-century golden Maitreya Buddha temples of Basgo.",
        "activities": [
          {
            "_key": "bas2a",
            "title": "Magnetic Hill Gravity Phenomenon Stop",
            "description": "Witness vehicles appearing to roll uphill against gravity on this famous stretch of the Leh-Srinagar Highway.",
            "location": {
              "name": "Magnetic Hill",
              "lat": 34.1844,
              "lng": 77.3512
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Natural optical illusion created by the surrounding horizon topography."
          },
          {
            "_key": "bas2b",
            "title": "Indus & Zanskar River Confluence (Sangam) at Nimmu",
            "description": "Stand atop the cliff overlooking the breathtaking meeting of emerald green Indus and mud-brown Zanskar waters.",
            "location": {
              "name": "Indus-Zanskar Sangam, Nimmu",
              "lat": 34.1648,
              "lng": 77.3298
            },
            "time": "10:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "World Famous river viewpoint; optional flat-water rafting launch site."
          },
          {
            "_key": "bas2c",
            "title": "Basgo Citadel & Chamba Lhakhang (Maitreya Temple)",
            "description": "Explore the UNESCO World Monuments Watch-listed 15th-century mud-brick ruins perched precariously on sheer red clay cliffs.",
            "location": {
              "name": "Basgo Citadel & Gompa",
              "lat": 34.2183,
              "lng": 77.2844
            },
            "time": "12:00 PM",
            "type": "sightseeing",
            "cost": 100,
            "currency": "INR",
            "notes": "Marvel at the giant two-storey gilded copper statue of Maitreya Buddha built in 1553 AD by King Tsewang Namgyal."
          },
          {
            "_key": "bas2d",
            "title": "Heritage Farmstay Check-in & Apricot Garden Walk at Basgo",
            "description": "Unwind at a tranquil rural farmstay surrounded by organic barley terraces, apple orchards, and irrigation channels.",
            "location": {
              "name": "Basgo Village Farmstay",
              "lat": 34.217,
              "lng": 77.283
            },
            "time": "03:30 PM",
            "type": "accommodation",
            "cost": 2200,
            "currency": "INR",
            "notes": "Experience village life far away from commercial tourist circuits."
          }
        ]
      },
      {
        "_key": "bas-day3",
        "dayNumber": 3,
        "title": "Basgo → Likir Monastery Giant Buddha → 11th-Century Alchi Choskor",
        "date": "2026-07-14",
        "summary": "Continue through the Lower Sham Valley to Likir Gompa to view its 75-foot outdoor Maitreya Buddha statue, before visiting the legendary Alchi Choskor — Ladakh's oldest monastic jewel renowned for world-famous Kashmiri-style Buddhist frescoes from the 11th century.",
        "activities": [
          {
            "_key": "bas3a",
            "title": "Likir Gompa & 75-Foot Outdoor Maitreya Buddha",
            "description": "Explore the picturesque 11th-century monastery housing valuable manuscripts, thangkas, and a prominent open-air Buddha statue.",
            "location": {
              "name": "Likir Monastery",
              "lat": 34.2933,
              "lng": 77.215
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Founded by Lama Duwang Ngawang under King Lhachen Gyalpo."
          },
          {
            "_key": "bas3b",
            "title": "Alchi Choskor Monastic Complex (10th-11th Century)",
            "description": "Unlike high mountain monasteries, Alchi is built on flat ground by the Indus and houses the greatest surviving Kashmiri Buddhist wood carvings and wall frescoes.",
            "location": {
              "name": "Alchi Monastery",
              "lat": 34.2239,
              "lng": 77.175
            },
            "time": "12:00 PM",
            "type": "sightseeing",
            "cost": 100,
            "currency": "INR",
            "notes": "Photography strictly forbidden inside temples to preserve delicate natural pigments."
          },
          {
            "_key": "bas3c",
            "title": "Garden Lunch at Alchi Apricot Tree Courtyard",
            "description": "Dine under shaded apricot trees enjoying hot momos, tingmo steamed bread, and mint tea.",
            "location": {
              "name": "Alchi Garden Restaurant",
              "lat": 34.223,
              "lng": 77.174
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 350,
            "currency": "INR",
            "notes": "Organic salad and fresh mountain juices."
          },
          {
            "_key": "bas3d",
            "title": "Return Drive to Leh & Farewell Dinner",
            "description": "Smooth 65 km drive back to Leh along the Indus river; evening souvenir shopping.",
            "location": {
              "name": "Leh City Centre",
              "lat": 34.1642,
              "lng": 77.584
            },
            "time": "05:30 PM",
            "type": "accommodation",
            "cost": 2800,
            "currency": "INR",
            "notes": "Overnight in Leh ahead of early morning flight."
          }
        ]
      },
      {
        "_key": "bas-day4",
        "dayNumber": 4,
        "title": "Leh Market Souvenirs → Leh Airport → Mumbai / Pune",
        "date": "2026-07-15",
        "summary": "Pick up hand-carved prayer wheels, butter tea cups, and roasted barley tsampa in Leh market before transferring to the airport for your flight home to Mumbai or Pune.",
        "activities": [
          {
            "_key": "bas4a",
            "title": "Morning Visit to Central Asian Museum, Leh",
            "description": "A 4-storey stone-and-wood tower museum tracing the historical Silk Route caravans connecting Yarkand, Tibet, and Kashmir.",
            "location": {
              "name": "Central Asian Museum",
              "lat": 34.164,
              "lng": 77.586
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Located behind the historic Jama Masjid in Old Leh."
          },
          {
            "_key": "bas4b",
            "title": "Transfer to Leh Kushok Bakula Rimpochee Airport (IXL)",
            "description": "Short 15-minute drive to the departure terminal.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "10:30 AM",
            "type": "transport",
            "cost": 400,
            "currency": "INR",
            "notes": "Ensure checked baggage conforms to airline weight limits."
          },
          {
            "_key": "bas4c",
            "title": "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            "description": "Board direct or one-stop flight home with memories of ancient Ladakhi fortresses.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "12:30 PM",
            "type": "transport",
            "cost": 8200,
            "currency": "INR",
            "notes": "Fly over the magnificent Pir Panjal and Shivalik ranges."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-chumathang-4-days",
    "title": "Chumathang Geothermal Hot Springs & Indus Valley — 4 Days from Mumbai / Pune",
    "slug": "chumathang-4-days",
    "excerpt": "Journey from Mumbai or Pune into the wild southeastern Indus gorge to Chumathang — famed for its bubbling geothermal sulfur hot springs steaming right on the icy riverbanks at 13,000 ft. A gateway to the high Changthang plateau, Chumathang offers natural healing thermal baths, ancient Tibetan settlements, and unforgettable stargazing.",
    "tags": [
      "Himalayas",
      "Ladakh",
      "Hot Springs",
      "Offbeat",
      "Nature",
      "High Altitude",
      "River",
      "India"
    ],
    "country": "India",
    "startDate": "2026-07-18",
    "endDate": "2026-07-21",
    "bestSuggestedMonth": "May – October",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 18500,
    "currency": "INR",
    "tripType": "Geothermal Springs & Frontier Expedition",
    "readingTime": 8,
    "_createdAt": "2026-08-28T00:00:00Z",
    "_updatedAt": "2026-08-28T00:00:00Z",
    "itinerary": [
      {
        "_key": "chu-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Leh Airport → Acclimatisation & Thiksey Monastery",
        "date": "2026-07-18",
        "summary": "Arrive at Leh Airport from Mumbai or Pune. Rest during the morning for essential altitude adaptation, then enjoy a serene late afternoon visit to Thiksey Monastery, styled after Lhasa's Potala Palace.",
        "activities": [
          {
            "_key": "chu1a",
            "title": "Morning Flight BOM/PNQ to Leh Kushok Bakula Rimpochee Airport",
            "description": "Morning touchdown in Ladakh at 3,524 m. Transfer to hotel for mandatory acclimatisation.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "08:30 AM",
            "type": "transport",
            "cost": 8200,
            "currency": "INR",
            "notes": "Avoid alcohol, smoking, and sudden exertion on Day 1."
          },
          {
            "_key": "chu1b",
            "title": "Afternoon Excursion to Thiksey Monastery (19 km)",
            "description": "Visit the 12-storey whitewashed Gompa complex featuring the revered 49-foot Maitreya Buddha statue installed by the 14th Dalai Lama.",
            "location": {
              "name": "Thiksey Monastery",
              "lat": 34.0583,
              "lng": 77.6667
            },
            "time": "03:30 PM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Catch the monks blowing traditional conch shells and Dungchen brass horns."
          },
          {
            "_key": "chu1c",
            "title": "Evening Acclimatisation Rest & Garlic Broth Dinner",
            "description": "Warm homemade garlic soup and steamed vegetable momos to promote blood oxygenation.",
            "location": {
              "name": "Leh Town Restaurant",
              "lat": 34.164,
              "lng": 77.584
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 380,
            "currency": "INR",
            "notes": "Early sleep recommended before heading into Changthang."
          }
        ]
      },
      {
        "_key": "chu-day2",
        "dayNumber": 2,
        "title": "Leh → Upshi → Kiari → Chumathang Geothermal Hot Springs (140 km)",
        "date": "2026-07-19",
        "summary": "Embark on an extraordinary road journey following the turquoise Indus River through deep multicolored granite canyons, passing Upshi and Kiari Tibetan settlement to reach the steaming riverbanks of Chumathang at 3,950 m (13,000 ft).",
        "activities": [
          {
            "_key": "chu2a",
            "title": "Drive Leh along the Indus to Upshi & Kiari (100 km)",
            "description": "Spectacular highway carving through sheer canyon walls of purple, orange, and emerald slate along the Indus.",
            "location": {
              "name": "Upshi Indus Gorge",
              "lat": 33.8306,
              "lng": 77.8183
            },
            "time": "08:30 AM",
            "type": "transport",
            "cost": 2000,
            "currency": "INR",
            "notes": "Checkpost at Upshi; foreign nationals require Inner Line Permit (ILP)."
          },
          {
            "_key": "chu2b",
            "title": "Chumathang Geothermal Vents & River Steam Phenomenon",
            "description": "Arrive at Chumathang where boiling sulfur springs (over 85°C) bubble vigorously from cracks along the freezing Indus riverbed.",
            "location": {
              "name": "Chumathang Geothermal Hot Springs",
              "lat": 33.3592,
              "lng": 78.3458
            },
            "time": "12:30 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "The stark contrast of boiling volcanic steam and ice-cold river waters is unique in the Himalayas."
          },
          {
            "_key": "chu2c",
            "title": "Natural Geothermal Mineral Bath & Relaxing Soak",
            "description": "Immerse in private indoor thermal spring baths fed directly by the mineral-rich sulfur waters, known for curing joint pain and fatigue.",
            "location": {
              "name": "Chumathang Hot Spring Resort Baths",
              "lat": 33.36,
              "lng": 78.346
            },
            "time": "03:00 PM",
            "type": "activity",
            "cost": 250,
            "currency": "INR",
            "notes": "Water is naturally heated by deep tectonic faults."
          },
          {
            "_key": "chu2d",
            "title": "Geothermally Cooked Eggs & Ladakhi Dinner",
            "description": "Watch locals boil eggs and potatoes in small mesh bags directly dipped into the boiling roadside steam vent.",
            "location": {
              "name": "Chumathang Springs Dhaba",
              "lat": 33.359,
              "lng": 78.3455
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 300,
            "currency": "INR",
            "notes": "Eggs boil perfectly in 7 minutes in the natural boiling spring!"
          }
        ]
      },
      {
        "_key": "chu-day3",
        "dayNumber": 3,
        "title": "Chumathang Village Walk & Mahe Gorge Gateway Excursion",
        "date": "2026-07-20",
        "summary": "Walk through the high-altitude barley terraces of Chumathang village, visit the hilltop Gompa, take an excursion to the sheer cliffs of Mahe Bridge (gateway to Tso Moriri), before enjoying an evening of stargazing under Bortle Class 1 dark skies.",
        "activities": [
          {
            "_key": "chu3a",
            "title": "Chumathang Hilltop Gompa & Village Trail",
            "description": "Climb the rocky promontory above the village to visit the peaceful Buddhist shrine adorned with wind-whipped prayer flags.",
            "location": {
              "name": "Chumathang Gompa",
              "lat": 33.362,
              "lng": 78.348
            },
            "time": "09:00 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Offers a sweeping panoramic vista of the steaming Indus river bend."
          },
          {
            "_key": "chu3b",
            "title": "Excursion to Mahe Bridge & Indus Canyon (25 km)",
            "description": "Drive down to the military checkpoint at Mahe Bridge, where roads branch south toward Tso Moriri and east toward Nyoma and Hanle.",
            "location": {
              "name": "Mahe Bridge, Ladakh",
              "lat": 33.275,
              "lng": 78.508
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Dramatic geological strata formations and soaring golden eagle nesting cliffs."
          },
          {
            "_key": "chu3c",
            "title": "Riverside Dhaba Lunch with Butter Tea & Tingmo",
            "description": "Enjoy hot steamed tingmo bread served with spicy vegetable curry and churned salty butter tea (gur-gur chai).",
            "location": {
              "name": "Kiari Tibetan Roadside Eatery",
              "lat": 33.682,
              "lng": 78.105
            },
            "time": "02:00 PM",
            "type": "food",
            "cost": 250,
            "currency": "INR",
            "notes": "Warm, hearty nomadic staple foods."
          },
          {
            "_key": "chu3d",
            "title": "Dark Sky Stargazing over the Steaming Indus",
            "description": "Observe the glowing arc of the Milky Way reflected on steam plumes rising from the river under crystal black skies.",
            "location": {
              "name": "Chumathang River Ridge",
              "lat": 33.3592,
              "lng": 78.3458
            },
            "time": "09:30 PM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Uninhibited cosmic views free of city light pollution."
          }
        ]
      },
      {
        "_key": "chu-day4",
        "dayNumber": 4,
        "title": "Chumathang → Indus Valley Return → Leh Airport → Mumbai / Pune",
        "date": "2026-07-21",
        "summary": "Early morning scenic return drive following the Indus downstream to Leh Kushok Bakula Rimpochee Airport for your return flight back to Mumbai or Pune.",
        "activities": [
          {
            "_key": "chu4a",
            "title": "Early Morning Return Drive along Indus Gorge (140 km, 3.5 hrs)",
            "description": "Watch morning shadows play across the towering canyon walls as you head back towards Leh.",
            "location": {
              "name": "Indus Highway",
              "lat": 33.8306,
              "lng": 77.8183
            },
            "time": "06:00 AM",
            "type": "transport",
            "cost": 2200,
            "currency": "INR",
            "notes": "Early start ensures comfortable check-in at Leh Airport."
          },
          {
            "_key": "chu4b",
            "title": "Quick Breakfast & Chai Stop at Karu Junction",
            "description": "Fuel up on hot aloo parathas and ginger chai at the major highway junction connecting Pangong and Manali roads.",
            "location": {
              "name": "Karu Junction",
              "lat": 33.9214,
              "lng": 77.7472
            },
            "time": "08:30 AM",
            "type": "food",
            "cost": 150,
            "currency": "INR",
            "notes": "Convenient rest stop with ATM and restrooms."
          },
          {
            "_key": "chu4c",
            "title": "Drop at Leh Airport & Return Flight to BOM / PNQ",
            "description": "Board afternoon connecting flight back to Mumbai or Pune carrying memories of high-altitude hot springs.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "10:30 AM",
            "type": "transport",
            "cost": 8500,
            "currency": "INR",
            "notes": "Window seats provide dramatic aerial views of the Ladakh range."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-hanle-5-days",
    "title": "Hanle Dark-Sky Reserve & Astronomical Observatory — 5 Days from Mumbai / Pune",
    "slug": "hanle-5-days",
    "excerpt": "The ultimate celestial pilgrimage from Mumbai or Pune to India's first designated Dark-Sky Reserve at Hanle (14,760 ft) in the remote Changthang plateau. Stand under the clearest night skies on Earth, visit the world's highest optical observatory on Mt. Saraswati, explore the 17th-century Hanle Gompa, and encounter Tibetan wild asses (Kiang) roaming across infinite Himalayan plains.",
    "tags": [
      "Himalayas",
      "Ladakh",
      "Dark Sky",
      "Astrophotography",
      "High Altitude",
      "Remote",
      "Wildlife",
      "India"
    ],
    "country": "India",
    "startDate": "2026-07-25",
    "endDate": "2026-07-29",
    "bestSuggestedMonth": "May – October (New Moon week best for astronomy)",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 28500,
    "currency": "INR",
    "tripType": "Dark-Sky Astronomy & High-Altitude Safari",
    "readingTime": 10,
    "_createdAt": "2026-08-28T00:00:00Z",
    "_updatedAt": "2026-08-28T00:00:00Z",
    "itinerary": [
      {
        "_key": "han-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Leh Airport (11,500 ft) — Mandatory Acclimatisation & Permits",
        "date": "2026-07-25",
        "summary": "Take an early morning flight from Mumbai (BOM) or Pune (PNQ) to Leh (IXL). Spend the day strictly resting to acclimatise to the altitude, while collecting your mandatory Protected Area Permits (PAP) for Hanle and the remote Changthang frontier.",
        "activities": [
          {
            "_key": "han1a",
            "title": "Morning Flight BOM/PNQ to Leh Kushok Bakula Rimpochee Airport",
            "description": "Touch down in Ladakh at 3,524 m. Check in to your hotel for mandatory full-day rest.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "08:30 AM",
            "type": "transport",
            "cost": 8500,
            "currency": "INR",
            "notes": "Hanle sits at 4,500 m (14,760 ft); adequate acclimatisation in Leh is vital."
          },
          {
            "_key": "han1b",
            "title": "Inner Line Permit & Hanle Protected Area Endorsement",
            "description": "Collect your official DC Office permit endorsing Hanle, Loma, and Nyoma sectors.",
            "location": {
              "name": "DC Office, Leh",
              "lat": 34.161,
              "lng": 77.58
            },
            "time": "11:30 AM",
            "type": "activity",
            "cost": 650,
            "currency": "INR",
            "notes": "Carry 5 physical photocopies of permit and Aadhaar/passport for army checkposts."
          },
          {
            "_key": "han1c",
            "title": "Leh Market Sunset Walk & Battery Gear Check",
            "description": "Test your camera gear, tripods, extra lithium batteries (cold drains batteries fast), and red-light headlamps required for Dark Sky Reserve.",
            "location": {
              "name": "Leh Main Bazaar",
              "lat": 34.1645,
              "lng": 77.585
            },
            "time": "05:30 PM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Red light headlamps preserve night vision and are strictly required in Hanle."
          },
          {
            "_key": "han1d",
            "title": "High-Protein Ladakhi Dinner",
            "description": "Warm bowl of vegetable and cheese thenthuk with steamed momos.",
            "location": {
              "name": "Leh Tibetan Kitchen",
              "lat": 34.164,
              "lng": 77.584
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 450,
            "currency": "INR",
            "notes": "Hydrate with at least 3-4 litres of water throughout the day."
          }
        ]
      },
      {
        "_key": "han-day2",
        "dayNumber": 2,
        "title": "Leh → Chumathang → Loma Bridge Checkpost → Hanle (255 km, 7–8 hrs)",
        "date": "2026-07-26",
        "summary": "An epic high-altitude drive tracing the Indus upstream through Chumathang to the military bridge at Loma, entering the sprawling Changthang plateau basin to reach Hanle (14,760 ft) before sunset for your first night of naked-eye cosmic stargazing.",
        "activities": [
          {
            "_key": "han2a",
            "title": "Early Departure via Upshi & Chumathang (140 km)",
            "description": "Scenic drive through Indus canyons; quick morning stop at the steaming hot springs of Chumathang.",
            "location": {
              "name": "Chumathang Hot Springs",
              "lat": 33.3592,
              "lng": 78.3458
            },
            "time": "06:30 AM",
            "type": "transport",
            "cost": 3500,
            "currency": "INR",
            "notes": "Stop for hot tea and aloo paratha at Chumathang."
          },
          {
            "_key": "han2b",
            "title": "Loma Checkpost Border Registration & Nyoma",
            "description": "Present Hanle permits at Loma Bridge, crossing into the restricted Changthang military zone.",
            "location": {
              "name": "Loma Bridge Checkpost",
              "lat": 33.161,
              "lng": 78.825
            },
            "time": "12:30 PM",
            "type": "transport",
            "cost": 0,
            "currency": "INR",
            "notes": "Indian Army strictly inspects IDs; foreign tourists need special approvals."
          },
          {
            "_key": "han2c",
            "title": "Arrival at Hanle (4,500 m / 14,760 ft) & Homestay Check-in",
            "description": "Enter the vast, golden Hanle marshland plain ringed by barren mountain crags. Settle into a local Ladakhi homestay.",
            "location": {
              "name": "Hanle Village Homestay",
              "lat": 32.775,
              "lng": 78.97
            },
            "time": "03:30 PM",
            "type": "accommodation",
            "cost": 2600,
            "currency": "INR",
            "notes": "Bukhari wood/gas heating in rooms; oxygen cylinder available at homestay if required."
          },
          {
            "_key": "han2d",
            "title": "Night 1: Dark-Sky Observation & Milky Way Core Alignment",
            "description": "Step out under India's darkest skies (Bortle Class 1). Witness billions of stars, the sprawling Milky Way arm, and the Andromeda Galaxy visible with the naked eye.",
            "location": {
              "name": "Hanle Dark Sky Reserve Plains",
              "lat": 32.7794,
              "lng": 78.9642
            },
            "time": "09:30 PM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Night temperatures frequently dip below 0°C even in summer; thermal layers, windcheater, and gloves mandatory."
          }
        ]
      },
      {
        "_key": "han-day3",
        "dayNumber": 3,
        "title": "Indian Astronomical Observatory (Mt. Saraswati) & 17th-Century Hanle Gompa",
        "date": "2026-07-27",
        "summary": "Ascend Mt. Saraswati to visit the Indian Astronomical Observatory — the world's highest optical observatory operated by the Indian Institute of Astrophysics — followed by the historic 17th-century Hanle Monastery perched atop a solitary rocky hill.",
        "activities": [
          {
            "_key": "han3a",
            "title": "Indian Astronomical Observatory (IAO) Tour (Mt. Saraswati)",
            "description": "Ascend the winding peak to 4,500 m to view the 2-metre optical-infrared Himalayan Chandra Telescope (HCT) remotely controlled from Bengaluru.",
            "location": {
              "name": "Indian Astronomical Observatory, Hanle",
              "lat": 32.7794,
              "lng": 78.9642
            },
            "time": "10:00 AM",
            "type": "sightseeing",
            "cost": 100,
            "currency": "INR",
            "notes": "Learn about MACE (Major Atmospheric Cherenkov Experiment) gamma ray telescope installed nearby."
          },
          {
            "_key": "han3b",
            "title": "Traditional Nomadic Lunch at Hanle Homestay",
            "description": "Home-cooked meal of fresh Khambir bread, barley soup, potato sabzi, and hot butter tea prepared by the host family.",
            "location": {
              "name": "Hanle Homestay Kitchen",
              "lat": 32.775,
              "lng": 78.97
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 350,
            "currency": "INR",
            "notes": "Warm Changpa hospitality in a traditional carpeted dining room."
          },
          {
            "_key": "han3c",
            "title": "Hanle Gompa (17th-Century Drukpa Kagyu Monastery)",
            "description": "Explore the historic monastery built under King Sengge Namgyal in the 17th century, commanding a panoramic view of the entire Hanle basin.",
            "location": {
              "name": "Hanle Monastery",
              "lat": 32.7725,
              "lng": 78.9767
            },
            "time": "04:00 PM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Houses ancient scriptures, thangkas, and a serene inner sanctum."
          },
          {
            "_key": "han3d",
            "title": "Night 2: Deep-Sky Astrophotography & Stargazing Workshop",
            "description": "Set up tripods for long-exposure wide-field astrophotography of the Galactic Centre, Airglow, and Zodiacal Light.",
            "location": {
              "name": "Mt. Saraswati Base",
              "lat": 32.778,
              "lng": 78.963
            },
            "time": "10:00 PM",
            "type": "activity",
            "cost": 500,
            "currency": "INR",
            "notes": "Use fast f/1.8–f/2.8 wide lenses with ISO 3200–6400 for stunning 20-second exposures."
          }
        ]
      },
      {
        "_key": "han-day4",
        "dayNumber": 4,
        "title": "Hanle Basin Wildlife Safari (Kiang & Cranes) → Nyoma → Leh Return",
        "date": "2026-07-28",
        "summary": "Take a sunrise wildlife drive across the wetlands spotting wild Tibetan Ass (Kiang) and rare Black-necked Cranes, before embarking on the scenic return drive via Nyoma and Upshi back to Leh.",
        "activities": [
          {
            "_key": "han4a",
            "title": "Dawn Safari across Hanle Plains & Wetlands",
            "description": "Spot herds of Kiang (Equus kiang) galloping across the steppe, migratory Black-necked Cranes, and bar-headed geese in the marshes.",
            "location": {
              "name": "Hanle Wetlands",
              "lat": 32.79,
              "lng": 78.95
            },
            "time": "06:00 AM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "The Black-necked Crane is the revered state bird of Ladakh."
          },
          {
            "_key": "han4b",
            "title": "Scenic Return Drive: Hanle → Loma → Nyoma → Upshi (255 km)",
            "description": "Follow the Indus valley back towards central Ladakh, stopping for tea along the riverbank.",
            "location": {
              "name": "Nyoma Indus Highway",
              "lat": 33.195,
              "lng": 78.67
            },
            "time": "08:30 AM",
            "type": "transport",
            "cost": 3500,
            "currency": "INR",
            "notes": "Road is predominantly well-paved Border Roads Organisation (BRO) highway."
          },
          {
            "_key": "han4c",
            "title": "Lunch Stop at Chumathang Hot Springs Dhaba",
            "description": "Warm bowl of Thukpa and momos by the riverside before the final leg into Leh.",
            "location": {
              "name": "Chumathang Springs",
              "lat": 33.3592,
              "lng": 78.3458
            },
            "time": "01:00 PM",
            "type": "food",
            "cost": 300,
            "currency": "INR",
            "notes": "Quick mineral leg soak available during lunch break."
          },
          {
            "_key": "han4d",
            "title": "Arrive in Leh & Celebration Dinner",
            "description": "Check in to Leh hotel and celebrate completing one of India's most remote expeditions with Kashmiri Wazwan or continental pizza.",
            "location": {
              "name": "Bon Appetit, Leh",
              "lat": 34.1615,
              "lng": 77.581
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 750,
            "currency": "INR",
            "notes": "Charming apple orchard setting with outdoor terrace."
          }
        ]
      },
      {
        "_key": "han-day5",
        "dayNumber": 5,
        "title": "Leh Airport → Return Flight to Mumbai / Pune",
        "date": "2026-07-29",
        "summary": "Transfer to Leh Kushok Bakula Rimpochee Airport for your morning return flight back to Mumbai or Pune carrying extraordinary cosmic memories of India's highest starry frontier.",
        "activities": [
          {
            "_key": "han5a",
            "title": "Transfer to Leh Kushok Bakula Rimpochee Airport (IXL)",
            "description": "Short 15-minute cab ride to the terminal for check-in.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "08:30 AM",
            "type": "transport",
            "cost": 400,
            "currency": "INR",
            "notes": "Arrive 2 hours prior to scheduled departure."
          },
          {
            "_key": "han5b",
            "title": "Return Flight to Mumbai (BOM) / Pune (PNQ)",
            "description": "Fly back home over the majestic Greater Himalayas, carrying memories of the starlit skies of Hanle.",
            "location": {
              "name": "Leh Kushok Bakula Rimpochee Airport",
              "lat": 34.1359,
              "lng": 77.5465
            },
            "time": "10:30 AM",
            "type": "transport",
            "cost": 8500,
            "currency": "INR",
            "notes": "Direct or connecting flight back to Mumbai or Pune."
          }
        ]
      }
    ]
  },

  {
    "_id": "trip-kuldhara-4-days",
    "title": "Kuldhara Ghost Village & Thar Desert Mysteries — 4 Days from Mumbai / Pune",
    "slug": "kuldhara-4-days",
    "excerpt": "Journey from Mumbai or Pune into the golden heart of the Thar Desert to uncover the haunting ruins of Kuldhara — an entire 13th-century Paliwal Brahmin settlement abandoned overnight under a legendary curse. Pair the paranormal intrigue with Khaba Fort, sunset camel safaris across Sam Dunes, and Jaisalmer's living golden citadel.",
    "tags": [
      "Rajasthan",
      "Desert",
      "Heritage",
      "Folklore",
      "Offbeat",
      "Culture",
      "Ruins",
      "India"
    ],
    "country": "India",
    "startDate": "2026-10-10",
    "endDate": "2026-10-13",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 18500,
    "currency": "INR",
    "tripType": "Desert Heritage & Mystery Expedition",
    "readingTime": 8,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "kul-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Jaisalmer Airport → Gadisar Lake Sunset",
        "date": "2026-10-10",
        "summary": "Take a direct morning flight from Mumbai (BOM) or Pune (PNQ) to Jaisalmer Airport (JSA) or via Jodhpur. Check in to your desert stone haveli, relax over authentic Ker Sangri lunch, and spend a serene evening watching the golden sunset over the chhatris of historic Gadisar Lake.",
        "activities": [
          {
            "_key": "kul1a",
            "title": "Morning Flight Mumbai / Pune to Jaisalmer (JSA)",
            "description": "Fly from Mumbai (BOM) or Pune (PNQ) to Jaisalmer Airport, or fly to Jodhpur and take a smooth 4.5-hour highway cab ride across Thar desert landscapes.",
            "location": {
              "name": "Jaisalmer Airport",
              "lat": 26.8898,
              "lng": 70.8644
            },
            "time": "10:30 AM",
            "type": "transport",
            "cost": 6500,
            "currency": "INR",
            "notes": "Direct flights operate seasonally between Oct and Mar."
          },
          {
            "_key": "kul1b",
            "title": "Check-in to Jaisalmer Heritage Hotel",
            "description": "Check in at Suryagarh Jaisalmer or boutique golden sandstone haveli near the fort gate. Sip warm spiced Kahwa tea.",
            "location": {
              "name": "Suryagarh Jaisalmer",
              "lat": 26.9114,
              "lng": 70.7831
            },
            "time": "12:30 PM",
            "type": "accommodation",
            "cost": 4500,
            "currency": "INR",
            "notes": "Ask front desk to arrange authorized desert guide for Kuldhara visit."
          },
          {
            "_key": "kul1c",
            "title": "Ker Sangri & Bajra Roti Lunch at Trio Restaurant",
            "description": "Savor royal Rajasthani Ker Sangri, Gatta Curry, and piping hot Bajra Roti overlooking the town ramparts.",
            "location": {
              "name": "The Trio Jaisalmer",
              "lat": 26.9157,
              "lng": 70.9126
            },
            "time": "02:00 PM",
            "type": "food",
            "cost": 850,
            "currency": "INR",
            "notes": "Pair with fresh buttermilk (chaas)."
          },
          {
            "_key": "kul1d",
            "title": "Sunset Boat Ride & Chhatris at Gadisar Lake",
            "description": "Explore the 14th-century artificial rainwater reservoir flanked by carved yellow sandstone temples, ghats, and Tilon Ki Pol gateway.",
            "location": {
              "name": "Gadisar Lake Jaisalmer",
              "lat": 26.9079,
              "lng": 70.9238
            },
            "time": "05:15 PM",
            "type": "sightseeing",
            "cost": 200,
            "currency": "INR",
            "notes": "Magnificent photo reflections as migratory desert birds arrive."
          }
        ]
      },
      {
        "_key": "kul-day2",
        "dayNumber": 2,
        "title": "Kuldhara Ghost Village → Khaba Fort → Sam Sand Dunes Safari",
        "date": "2026-10-11",
        "summary": "Step back into the 13th century at the abandoned ghost village of Kuldhara. Walk the eerie roofless streets, inspect ancient carved temples, and learn why 84 villages were deserted overnight in 1825. Continue to the romantic ruins of Khaba Fort, followed by a dramatic sunset camel safari at Sam Sand Dunes.",
        "activities": [
          {
            "_key": "kul2a",
            "title": "Guided Exploration of Kuldhara Ghost Village",
            "description": "Walk down the silent stone grid streets, preserved houses, stepwells, and the central temple of this Paliwal Brahmin settlement abandoned overnight due to the tyranny of minister Salim Singh.",
            "location": {
              "name": "Kuldhara Abandoned Village",
              "lat": 26.8715,
              "lng": 70.7846
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 150,
            "currency": "INR",
            "notes": "Entry managed by ASI. Mornings are peaceful and less hot."
          },
          {
            "_key": "kul2b",
            "title": "Khaba Fort Ruins & Peacock Feeding Point",
            "description": "A short 15 km drive to the dramatic Khaba Fort ruins perched on an escarpment overlooking an abandoned desert valley where hundreds of wild peacocks gather.",
            "location": {
              "name": "Khaba Fort",
              "lat": 26.8378,
              "lng": 70.6723
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 100,
            "currency": "INR",
            "notes": "Houses a small museum with fossilized sea shells from prehistoric oceans."
          },
          {
            "_key": "kul2c",
            "title": "Traditional Thali Lunch at Desert Boy's Dhaba",
            "description": "Authentic Dal Baati Churma and Rajasthani Papad ki Sabzi prepared over charcoal hearths.",
            "location": {
              "name": "Desert Boy's Dhaba Sam Road",
              "lat": 26.879,
              "lng": 70.62
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 600,
            "currency": "INR",
            "notes": "Hearty, filling traditional desert cuisine."
          },
          {
            "_key": "kul2d",
            "title": "Camel & 4x4 Dune Bashing Sunset Safari at Sam Dunes",
            "description": "Arrive at the sweeping golden ripples of Sam Sand Dunes. Ride camels into the dunes for an unforgettable crimson sunset, followed by Manganiyar folk music around the campfire.",
            "location": {
              "name": "Sam Sand Dunes",
              "lat": 26.8327,
              "lng": 70.5042
            },
            "time": "04:45 PM",
            "type": "activity",
            "cost": 1800,
            "currency": "INR",
            "notes": "Carry a warm jacket as desert temperatures drop rapidly after dark."
          }
        ]
      },
      {
        "_key": "kul-day3",
        "dayNumber": 3,
        "title": "Jaisalmer Living Golden Fort → Patwon Ki Haveli → Bada Bagh Chhatris",
        "date": "2026-10-12",
        "summary": "Spend the day exploring Jaisalmer's UNESCO-listed 'Sonar Qila', one of the world's very few living forts where thousands still reside within 800-year-old bastions. Tour the ornate filigree stone craftsmanship of Patwon Ki Haveli and conclude with sunset at the royal cenotaphs of Bada Bagh.",
        "activities": [
          {
            "_key": "kul3a",
            "title": "Walking Tour of Jaisalmer Fort (Sonar Qila)",
            "description": "Enter via Suraj Pol into the 12th-century living fort. Walk labyrinthine sandstone alleyways, inspect the Royal Palace (Raj Mahal), and admire the intricately carved 7 Jain Temples dating from 12th to 15th century.",
            "location": {
              "name": "Jaisalmer Fort",
              "lat": 26.9124,
              "lng": 70.9127
            },
            "time": "09:00 AM",
            "type": "sightseeing",
            "cost": 250,
            "currency": "INR",
            "notes": "Hire a licensed ASI guide at the entrance gate for historical insights."
          },
          {
            "_key": "kul3b",
            "title": "Architectural Marvel of Patwon Ki Haveli",
            "description": "Marvel at the five-storey cluster of 5 havelis built by rich brocade merchants featuring 60 balconies with lace-like stone jali screens.",
            "location": {
              "name": "Patwon Ki Haveli",
              "lat": 26.9172,
              "lng": 70.9135
            },
            "time": "12:00 PM",
            "type": "sightseeing",
            "cost": 150,
            "currency": "INR",
            "notes": "Exceptional antique furniture and Rajasthani miniature frescoes."
          },
          {
            "_key": "kul3c",
            "title": "Rooftop Lunch at Jaisalmer Oasis Restaurant",
            "description": "Enjoy chilled drinks, Laal Maas, and paneer tikka overlooking the yellow bastion walls.",
            "location": {
              "name": "Oasis Rooftop Cafe",
              "lat": 26.914,
              "lng": 70.912
            },
            "time": "01:45 PM",
            "type": "food",
            "cost": 750,
            "currency": "INR",
            "notes": "Great 360-degree panorama of the fort and Thar horizon."
          },
          {
            "_key": "kul3d",
            "title": "Golden Hour at Bada Bagh Royal Cenotaphs",
            "description": "Visit the serene desert garden complex housing dozens of carved stone chhatris built in memory of the Bhatti dynasty maharajas beside ancient windmills.",
            "location": {
              "name": "Bada Bagh Cenotaphs",
              "lat": 26.9472,
              "lng": 70.8872
            },
            "time": "05:00 PM",
            "type": "sightseeing",
            "cost": 150,
            "currency": "INR",
            "notes": "The golden hour turns the sandstone into a luminous amber glow."
          }
        ]
      },
      {
        "_key": "kul-day4",
        "dayNumber": 4,
        "title": "Bazaar Souvenir Walk → Return Flight to Mumbai / Pune",
        "date": "2026-10-13",
        "summary": "Enjoy a leisurely morning breakfast of Poha and Jalebi in the fort courtyard, pick up handmade camel leather items, mirror-work textiles, and yellow fossil stone pottery before taking your transfer to Jaisalmer Airport for your return flight.",
        "activities": [
          {
            "_key": "kul4a",
            "title": "Morning Souvenir Shopping at Sadar Bazaar & Manak Chowk",
            "description": "Pick up hand-embroidered Thar tapestries, silver jewelry, and Habur stone artifacts that naturally curdle milk into yogurt.",
            "location": {
              "name": "Manak Chowk Jaisalmer",
              "lat": 26.9148,
              "lng": 70.9142
            },
            "time": "09:30 AM",
            "type": "activity",
            "cost": 1000,
            "currency": "INR",
            "notes": "Support local weaver cooperatives inside the old bazaar."
          },
          {
            "_key": "kul4b",
            "title": "Transfer to Jaisalmer Airport (JSA) & Flight to Mumbai/Pune",
            "description": "Short 20-minute cab drive to the desert airport for your direct flight back home carrying stories of Kuldhara's mysterious sands.",
            "location": {
              "name": "Jaisalmer Airport Terminal",
              "lat": 26.8898,
              "lng": 70.8644
            },
            "time": "12:15 PM",
            "type": "transport",
            "cost": 6500,
            "currency": "INR",
            "notes": "Arrive 90 minutes before scheduled domestic flight departure."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-narlai-4-days",
    "title": "Rawla Narlai & Aravalli Granite Monolith — 4 Days from Mumbai / Pune",
    "slug": "narlai-4-days",
    "excerpt": "Escape into Rajasthan's hidden Godwar heartland — nestled beneath an imposing 350-ft single granite monolith crowned by a white stone elephant. Experience 17th-century royal heritage at Rawla Narlai, sunrise monolith treks, leopard safaris through the granite hillocks, and an unforgettable candlelit royal dinner inside a 16th-century stepwell.",
    "tags": [
      "Rajasthan",
      "Heritage",
      "Wildlife",
      "Luxury",
      "Offbeat",
      "Mountains",
      "Culture",
      "India"
    ],
    "country": "India",
    "startDate": "2026-10-16",
    "endDate": "2026-10-19",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 24000,
    "currency": "INR",
    "tripType": "Heritage & Wildlife Hideaway",
    "readingTime": 8,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "nar-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Udaipur Airport → Scenic Drive to Narlai",
        "date": "2026-10-16",
        "summary": "Fly from Mumbai (BOM) or Pune (PNQ) into Udaipur's Maharana Pratap Airport (UDR). Embark on a picturesque 2.5-hour drive through the rolling Aravalli mountain passes and rural Godwar villages to reach Narlai, checking in to the aristocratic 17th-century Rawla Narlai heritage retreat.",
        "activities": [
          {
            "_key": "nar1a",
            "title": "Morning Flight Mumbai / Pune to Udaipur (UDR)",
            "description": "Direct flight to Udaipur Maharana Pratap Airport (~1 hr 20 mins from BOM/PNQ). Meet private chauffeur with AC SUV.",
            "location": {
              "name": "Maharana Pratap Airport Udaipur",
              "lat": 24.6177,
              "lng": 73.8961
            },
            "time": "09:45 AM",
            "type": "transport",
            "cost": 5800,
            "currency": "INR",
            "notes": "Smooth rural highway route via Gogunda and Ranakpur."
          },
          {
            "_key": "nar1b",
            "title": "Check-in to Rawla Narlai Heritage Retreat",
            "description": "Step into this former royal hunting lodge dating back to the 17th century, restored with blooming bougainvillea, frescoed courtyards, and deep sandstone stepwells.",
            "location": {
              "name": "Rawla Narlai",
              "lat": 25.3218,
              "lng": 73.535
            },
            "time": "01:00 PM",
            "type": "accommodation",
            "cost": 8500,
            "currency": "INR",
            "notes": "Welcome drink of iced fresh mint shikanji and marigold garlands."
          },
          {
            "_key": "nar1c",
            "title": "Royal Courtyard Lunch at Jharokha Cafe",
            "description": "Relish authentic Mewari Govind Gatta, Ker Dak (currant) sabzi, and fresh tandoori roti by the pool courtyard.",
            "location": {
              "name": "Rawla Narlai Courtyard",
              "lat": 25.3218,
              "lng": 73.535
            },
            "time": "02:15 PM",
            "type": "food",
            "cost": 1100,
            "currency": "INR",
            "notes": "Signature royal recipes curated from royal Mewar kitchens."
          },
          {
            "_key": "nar1d",
            "title": "Village Heritage Walk with Rabari Shepherds",
            "description": "Stroll with a resident naturalist through the vibrant Narlai village lanes, meeting the nomadic red-turbaned Rabari shepherd community and local blacksmiths.",
            "location": {
              "name": "Narlai Heritage Village",
              "lat": 25.323,
              "lng": 73.534
            },
            "time": "05:00 PM",
            "type": "activity",
            "cost": 300,
            "currency": "INR",
            "notes": "Witness the evening ritual of cattle returning home against village temple bells."
          }
        ]
      },
      {
        "_key": "nar-day2",
        "dayNumber": 2,
        "title": "Elephant Rock Sunrise Climb → Cave Temples → Jawai Leopard Safari",
        "date": "2026-10-17",
        "summary": "Wake up before sunrise to ascend the 350-foot granite monolith of Elephant Rock via 350 stone steps. Ring the bell beside the white stone elephant statue at the crest for panoramic vistas of the mist-draped Aravallis. In the afternoon, board an open 4x4 jeep for an exhilarating safari searching for wild Indian leopards roaming the granite boulders.",
        "activities": [
          {
            "_key": "nar2a",
            "title": "Elephant Rock (Hathi Rock) Sunrise Trek",
            "description": "Climb the 350 stone steps cut into the massive granite monolith towering above Narlai. Marvel at the life-size white marble elephant atop the summit and panoramic sunrise vistas.",
            "location": {
              "name": "Elephant Rock Narlai",
              "lat": 25.3235,
              "lng": 73.538
            },
            "time": "06:00 AM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Wear sturdy shoes. Fresh morning tea is served at the base upon descent."
          },
          {
            "_key": "nar2b",
            "title": "Visit Ancient Adinath & Shiva Cave Temples",
            "description": "Visit the rock-cut cave temples tucked into the granite boulder caves where local ascetics have meditated for centuries.",
            "location": {
              "name": "Narlai Rock Cave Temples",
              "lat": 25.3205,
              "lng": 73.5365
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Quiet, spiritually charged rock caverns with natural perennial springs."
          },
          {
            "_key": "nar2c",
            "title": "Leopard Safari through Granite Kopjes & Jawai Foothills",
            "description": "Board a customized open 4x4 Gypsy with experienced spotters to scan the giant granite boulders for wild Indian leopards, striped hyenas, and nilgai antelopes.",
            "location": {
              "name": "Godwar Leopard Hills",
              "lat": 25.298,
              "lng": 73.489
            },
            "time": "03:45 PM",
            "type": "activity",
            "cost": 2800,
            "currency": "INR",
            "notes": "Leopards here live in harmony with the Rabari pastoralists."
          },
          {
            "_key": "nar2d",
            "title": "Sunset High Tea by the Forest Lake",
            "description": "Enjoy hot masala chai and kachoris as the setting sun paints the granite kopjes in shades of deep amber and violet.",
            "location": {
              "name": "Narlai Forest Lake Point",
              "lat": 25.305,
              "lng": 73.512
            },
            "time": "06:15 PM",
            "type": "food",
            "cost": 450,
            "currency": "INR",
            "notes": "Watch egrets and cormorants roosting in the lakeside acacia trees."
          }
        ]
      },
      {
        "_key": "nar-day3",
        "dayNumber": 3,
        "title": "Ranakpur Marble Jain Temple → Stepwell Baori Dinner",
        "date": "2026-10-18",
        "summary": "Take a 40-minute drive down the Ghat road to the 15th-century Ranakpur Jain Temple, world-famous for its 1,444 uniquely hand-carved marble pillars. In the evening, dress in traditional attire and ride a decorated bullock cart into the wilderness for an enchanting candlelit feast inside a 16th-century stepwell.",
        "activities": [
          {
            "_key": "nar3a",
            "title": "Ranakpur Jain Temple Architecture Pilgrimage",
            "description": "Marvel at the Chaumukha temple dedicated to Tirthankara Adinath, featuring 1,444 exquisitely carved marble pillars where no two pillars share the same design.",
            "location": {
              "name": "Ranakpur Jain Temple",
              "lat": 25.1158,
              "lng": 73.4735
            },
            "time": "10:00 AM",
            "type": "sightseeing",
            "cost": 300,
            "currency": "INR",
            "notes": "Audio guides in multiple languages available at the entrance."
          },
          {
            "_key": "nar3b",
            "title": "Satvik Lunch at King's Abode Ranakpur",
            "description": "Delicious multi-course vegetarian Rajasthani spread with fresh paneer, gatte, and churma.",
            "location": {
              "name": "King's Abode Dining Hall",
              "lat": 25.132,
              "lng": 73.481
            },
            "time": "01:15 PM",
            "type": "food",
            "cost": 700,
            "currency": "INR",
            "notes": "Tranquil hillside views overlooking private organic orchards."
          },
          {
            "_key": "nar3c",
            "title": "Bullock Cart Ride to the 16th-Century Stepwell",
            "description": "Dress in royal Rajasthani turbans and ride a decorated bullock cart across mustard fields towards the ancient subterranean stepwell.",
            "location": {
              "name": "Narlai Royal Baori Track",
              "lat": 25.315,
              "lng": 73.541
            },
            "time": "06:30 PM",
            "type": "transport",
            "cost": 600,
            "currency": "INR",
            "notes": "Torches and oil lamps light the wilderness trail."
          },
          {
            "_key": "nar3d",
            "title": "Royal Stepwell Dinner (Baori Candlelit Experience)",
            "description": "Dine on the tiers of a 500-year-old stone stepwell illuminated by hundreds of flickering oil diyas, serenaded by an ascetic folk singer on the Jogia sarangi.",
            "location": {
              "name": "Rawla Narlai Stepwell",
              "lat": 25.3175,
              "lng": 73.5435
            },
            "time": "07:30 PM",
            "type": "food",
            "cost": 3500,
            "currency": "INR",
            "notes": "An unforgettable, bucket-list culinary experience under starry desert skies."
          }
        ]
      },
      {
        "_key": "nar-day4",
        "dayNumber": 4,
        "title": "Morning Temple Chants → Udaipur Airport → Mumbai / Pune",
        "date": "2026-10-19",
        "summary": "Listen to the morning temple conch shells, savor a lazy veranda breakfast, and enjoy a smooth scenic drive back to Udaipur's airport to catch your afternoon flight to Mumbai or Pune.",
        "activities": [
          {
            "_key": "nar4a",
            "title": "Farewell Veranda Breakfast & Heritage Photography",
            "description": "Enjoy fresh farm eggs, hot poha, masala omelettes, and brewed estate coffee on the palace terrace overlooking the monolith.",
            "location": {
              "name": "Rawla Narlai Veranda",
              "lat": 25.3218,
              "lng": 73.535
            },
            "time": "08:30 AM",
            "type": "food",
            "cost": 0,
            "currency": "INR",
            "notes": "Included with luxury room package."
          },
          {
            "_key": "nar4b",
            "title": "Scenic Transfer to Udaipur Airport (UDR) & Return Flight",
            "description": "Chauffeur transfer back to Udaipur Airport for afternoon departure to Mumbai (BOM) or Pune (PNQ).",
            "location": {
              "name": "Maharana Pratap Airport Udaipur",
              "lat": 24.6177,
              "lng": 73.8961
            },
            "time": "11:30 AM",
            "type": "transport",
            "cost": 5800,
            "currency": "INR",
            "notes": "Optional stop at Gogunda palace on the highway if time permits."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-khimsar-4-days",
    "title": "Khimsar Fort & Sand Dunes Oasis — 4 Days from Mumbai / Pune",
    "slug": "khimsar-4-days",
    "excerpt": "Discover royal Thar opulence at Khimsar — an extraordinary 16th-century fortified citadel with scarred battlements and sprawling ramparts. Experience camel journeys across virgin sand dunes to an exclusive desert eco-oasis village surrounding an azure lake, paired with Panchala Blackbuck wildlife safaris and Nagaur Fort frescoes.",
    "tags": [
      "Rajasthan",
      "Forts",
      "Desert",
      "Wildlife",
      "Heritage",
      "Luxury",
      "Offbeat",
      "India"
    ],
    "country": "India",
    "startDate": "2026-10-23",
    "endDate": "2026-10-26",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 22500,
    "currency": "INR",
    "tripType": "Royal Fort & Desert Dunes Oasis",
    "readingTime": 8,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "khi-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Jodhpur Airport → Khimsar Fort Arrival",
        "date": "2026-10-23",
        "summary": "Fly into the Sun City of Jodhpur from Mumbai (BOM) or Pune (PNQ). Meet your driver for a smooth 1.5-hour highway cruise north along NH62 to the 16th-century fortress of Khimsar. Check in past battle-scarred gates into a grand heritage hotel, enjoying an evening rampart walk and museum tour.",
        "activities": [
          {
            "_key": "khi1a",
            "title": "Morning Flight Mumbai / Pune to Jodhpur Airport (JDH)",
            "description": "Direct flight landing in Jodhpur (~1 hr 45 mins). Board private vehicle for the 85-km highway drive to Khimsar.",
            "location": {
              "name": "Jodhpur Civil Airport",
              "lat": 26.2514,
              "lng": 73.0487
            },
            "time": "10:15 AM",
            "type": "transport",
            "cost": 5900,
            "currency": "INR",
            "notes": "Wide 4-lane expressway with desert views."
          },
          {
            "_key": "khi1b",
            "title": "Check-in to ITC Welcomhotel Khimsar Fort",
            "description": "Check in to this sprawling 16th-century bastion built by Rao Karamsiji, 8th son of the founder of Jodhpur Rao Jodha.",
            "location": {
              "name": "Khimsar Fort",
              "lat": 26.989,
              "lng": 73.4072
            },
            "time": "01:00 PM",
            "type": "accommodation",
            "cost": 7800,
            "currency": "INR",
            "notes": "Greeted by nagada drums, camel escort, and royal tilak ceremony."
          },
          {
            "_key": "khi1c",
            "title": "Royal Rajputana Thali at Vansh Dining Hall",
            "description": "Savor Laal Maas cooked over slow wood fire, Marwari Kadhi, and Churma served on traditional brass thalis.",
            "location": {
              "name": "Vansh Khimsar Fort",
              "lat": 26.989,
              "lng": 73.4072
            },
            "time": "02:15 PM",
            "type": "food",
            "cost": 1100,
            "currency": "INR",
            "notes": "Recipes preserved from the ancestral Khimsar royal household."
          },
          {
            "_key": "khi1d",
            "title": "Rampart Walk & Antique Armory Tour",
            "description": "Walk atop the high fortified ramparts dotted with vintage cannons, inspect ancient swords and matchlocks, and watch peacock roosting at dusk.",
            "location": {
              "name": "Khimsar Fort Ramparts",
              "lat": 26.9895,
              "lng": 73.408
            },
            "time": "05:00 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Superb vantage point across the surrounding rural landscape."
          }
        ]
      },
      {
        "_key": "khi-day2",
        "dayNumber": 2,
        "title": "Panchala Blackbuck Sanctuary Safari → Khimsar Dunes Oasis Village",
        "date": "2026-10-24",
        "summary": "Set off on an early morning open-top jeep safari to the Panchala Reserve to observe herds of Indian blackbuck antelopes and chinkaras. In the afternoon, journey 15 minutes deeper into the desert on a camel cart to check in to Khimsar Sand Dunes Village — an exclusive eco-resort encircling an enchanting natural water body nestled amid high sand dunes.",
        "activities": [
          {
            "_key": "khi2a",
            "title": "Panchala Blackbuck Wildlife Jeep Safari",
            "description": "Open-jeep expedition into the surrounding scrub grasslands to witness herds of graceful blackbucks, chinkara gazelles, desert foxes, and blue bulls roaming freely.",
            "location": {
              "name": "Panchala Blackbuck Sanctuary",
              "lat": 26.945,
              "lng": 73.36
            },
            "time": "06:30 AM",
            "type": "activity",
            "cost": 1600,
            "currency": "INR",
            "notes": "Guided by knowledgeable local Bishnoi wildlife trackers."
          },
          {
            "_key": "khi2b",
            "title": "Breakfast on the Fort Lawn & Swimming Pool",
            "description": "Relax by the turquoise swimming pool nestled amid medieval stone turrets and flowering gardens.",
            "location": {
              "name": "Khimsar Fort Garden",
              "lat": 26.9888,
              "lng": 73.4068
            },
            "time": "09:30 AM",
            "type": "food",
            "cost": 0,
            "currency": "INR",
            "notes": "Complimentary breakfast spread with fresh fruit and juices."
          },
          {
            "_key": "khi2c",
            "title": "Camel Cart Transfer to Khimsar Sand Dunes Village",
            "description": "Ride across the rolling desert dunes to the secluded Dunes Oasis, where circular thatch-roofed eco-huts ring a tranquil desert lake oasis.",
            "location": {
              "name": "Khimsar Dunes Village",
              "lat": 27.0125,
              "lng": 73.441
            },
            "time": "03:30 PM",
            "type": "accommodation",
            "cost": 8000,
            "currency": "INR",
            "notes": "Accessible only by 4x4 or camel safari; 100% serene isolation."
          },
          {
            "_key": "khi2d",
            "title": "Sunset over Virgin Sand Dunes & Folk Music",
            "description": "Ascend the crest of high dunes overlooking the lake for sunset, followed by Manganiyar folk singers and Kalbeliya fire dancers around a glowing bonfire.",
            "location": {
              "name": "Khimsar Oasis Sunset Ridge",
              "lat": 27.014,
              "lng": 73.443
            },
            "time": "05:30 PM",
            "type": "activity",
            "cost": 500,
            "currency": "INR",
            "notes": "Unmatched dark sky stargazing with the Milky Way visible to the naked eye."
          }
        ]
      },
      {
        "_key": "khi-day3",
        "dayNumber": 3,
        "title": "Day Trip to Nagaur Fort (Ahichhatragarh) & Water Palaces",
        "date": "2026-10-25",
        "summary": "Embark on an excursion 45 km northeast to Nagaur to explore the majestic UNESCO-awarded Ahhichatragarh (Nagaur Fort) — famous for its Persian-style water gardens, elaborate fountains, and exquisite 16th-century Mughal wall frescoes.",
        "activities": [
          {
            "_key": "khi3a",
            "title": "Scenic Drive to Nagaur Fort (Ahichhatragarh)",
            "description": "Chauffeur drive north along NH62 through mustard fields to ancient Nagaur.",
            "location": {
              "name": "Nagaur Highway Route",
              "lat": 27.15,
              "lng": 73.65
            },
            "time": "09:00 AM",
            "type": "transport",
            "cost": 1500,
            "currency": "INR",
            "notes": "Smooth 45-minute rural highway stretch."
          },
          {
            "_key": "khi3b",
            "title": "Guided Tour of Ahichhatragarh Fort & Mughal Water Gardens",
            "description": "Explore the UNESCO-restored 12th-century fort, the Hadi Rani Mahal, Badal Mahal with rain-cloud ceiling frescoes, and the ingenious medieval water cooling system.",
            "location": {
              "name": "Ahichhatragarh Fort Nagaur",
              "lat": 27.1989,
              "lng": 73.738
            },
            "time": "10:15 AM",
            "type": "sightseeing",
            "cost": 350,
            "currency": "INR",
            "notes": "One of the most impeccably conserved medieval forts in India."
          },
          {
            "_key": "khi3c",
            "title": "Lunch at Ranvas Royal Pavilions",
            "description": "Dine inside the private havelis of Ranvas within Nagaur fort walls, savoring authentic Marwari delicacies.",
            "location": {
              "name": "Ranvas Restaurant Nagaur",
              "lat": 27.1995,
              "lng": 73.7375
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 1200,
            "currency": "INR",
            "notes": "Exceptional heritage dining ambiance inside ancient stone zenana courtyards."
          },
          {
            "_key": "khi3d",
            "title": "Evening Stroll around Khimsar Village Bazaars",
            "description": "Return to Khimsar to visit local potters and blacksmiths handcrafting iron bell souvenirs and bell-metal items.",
            "location": {
              "name": "Khimsar Old Market",
              "lat": 26.991,
              "lng": 73.409
            },
            "time": "05:00 PM",
            "type": "activity",
            "cost": 300,
            "currency": "INR",
            "notes": "Gentle village pace with warm local Rajasthani hospitality."
          }
        ]
      },
      {
        "_key": "khi-day4",
        "dayNumber": 4,
        "title": "Morning Oasis Stroll → Drive to Jodhpur → Mumbai / Pune",
        "date": "2026-10-26",
        "summary": "Enjoy a leisurely sunrise walk around the desert lake oasis, spotting desert birds and migratory ducks. Check out and drive back to Jodhpur for your flight to Mumbai or Pune, carrying memories of royal forts and endless sand dunes.",
        "activities": [
          {
            "_key": "khi4a",
            "title": "Sunrise Birding & Breakfast by the Desert Lake",
            "description": "Walk the shoreline of the oasis lake to spot teals, sandgrouse, and lapwings while enjoying fresh parathas and masala tea.",
            "location": {
              "name": "Khimsar Oasis Lake",
              "lat": 27.013,
              "lng": 73.4415
            },
            "time": "07:30 AM",
            "type": "food",
            "cost": 0,
            "currency": "INR",
            "notes": "Unbelievably tranquil desert morning setting."
          },
          {
            "_key": "khi4b",
            "title": "Transfer to Jodhpur Airport & Return Flight",
            "description": "Drive back to Jodhpur Airport (JDH) for your return flight to Mumbai (BOM) or Pune (PNQ).",
            "location": {
              "name": "Jodhpur Civil Airport",
              "lat": 26.2514,
              "lng": 73.0487
            },
            "time": "11:30 AM",
            "type": "transport",
            "cost": 5900,
            "currency": "INR",
            "notes": "Arrive 2 hours prior to scheduled flight departure."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-bhangarh-4-days",
    "title": "Bhangarh Haunted Fort & Sariska Wilderness — 4 Days from Mumbai / Pune",
    "slug": "bhangarh-4-days",
    "excerpt": "Venture from Mumbai or Pune into the shadows of the Aravalli hills to investigate Bhangarh Fort — India's most famous ruined ghost citadel shrouded in tantrik curses and paranormal folklore. Balance the ancient mysteries with tiger tracking in Sariska Tiger Reserve and marveling at the 3,500-step geometry of Chand Baori stepwell.",
    "tags": [
      "Rajasthan",
      "Mystery",
      "Wildlife",
      "Heritage",
      "Offbeat",
      "Ruins",
      "Adventure",
      "India"
    ],
    "country": "India",
    "startDate": "2026-11-05",
    "endDate": "2026-11-08",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 16500,
    "currency": "INR",
    "tripType": "Mystery Ruins & Tiger Safari",
    "readingTime": 8,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "bha-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Jaipur Airport → Sariska Valley Heritage Check-in",
        "date": "2026-11-05",
        "summary": "Take an early morning flight from Mumbai (BOM) or Pune (PNQ) to Jaipur International Airport (JAI). Board an AC cab for a 2-hour countryside journey through Dausa and Alwar into the forested hills of Sariska. Check in to a rustic heritage wilderness lodge and enjoy an evening nature walk.",
        "activities": [
          {
            "_key": "bha1a",
            "title": "Morning Flight Mumbai / Pune to Jaipur (JAI)",
            "description": "Direct flight landing in Jaipur by 10:00 AM. Meet your driver for the scenic 85-km transfer to the Sariska-Bhangarh region.",
            "location": {
              "name": "Jaipur International Airport",
              "lat": 26.8289,
              "lng": 75.8056
            },
            "time": "10:00 AM",
            "type": "transport",
            "cost": 5200,
            "currency": "INR",
            "notes": "Smooth expressway via NH21 towards Dausa."
          },
          {
            "_key": "bha1b",
            "title": "Check-in to Sariska Tiger Camp Resort",
            "description": "Settle into a serene cottage nestled against the backdrop of the rocky Aravalli ridges.",
            "location": {
              "name": "Sariska Tiger Camp Resort",
              "lat": 27.275,
              "lng": 76.435
            },
            "time": "01:00 PM",
            "type": "accommodation",
            "cost": 4500,
            "currency": "INR",
            "notes": "Surrounded by mustard fields and acacia woodland."
          },
          {
            "_key": "bha1c",
            "title": "Traditional Rajasthani Thali Lunch",
            "description": "Relish spicy Dal Baati Churma, Gatta curry, and fresh garlic chutney prepared in countryside dhaba style.",
            "location": {
              "name": "Tiger Camp Dining Room",
              "lat": 27.275,
              "lng": 76.435
            },
            "time": "02:15 PM",
            "type": "food",
            "cost": 650,
            "currency": "INR",
            "notes": "Hot chapatis served straight from earthen tandoor."
          },
          {
            "_key": "bha1d",
            "title": "Sunset Walk & Folk Tales around the Campfire",
            "description": "Walk the buffer trail with a local naturalist, spotting peacocks and spotted deer, followed by local elders sharing the eerie lore of Bhangarh.",
            "location": {
              "name": "Sariska Campfire Ground",
              "lat": 27.276,
              "lng": 76.436
            },
            "time": "05:30 PM",
            "type": "activity",
            "cost": 0,
            "currency": "INR",
            "notes": "Atmospheric introduction to the legends of Madho Singh and Princess Ratnavati."
          }
        ]
      },
      {
        "_key": "bha-day2",
        "dayNumber": 2,
        "title": "Daylight Exploration of Bhangarh Ghost Citadel",
        "date": "2026-11-06",
        "summary": "Spend the entire day thoroughly investigating the ruined 17th-century citadel of Bhangarh during permitted daylight hours. Pass through the five concentric gates, explore the Jauhari Bazaar ruins, admire the remarkably preserved Gopinath Temple, and hike up to the royal palace ruins under the watchful gaze of the Aravalli cliffs.",
        "activities": [
          {
            "_key": "bha2a",
            "title": "Enter Bhangarh Fort via Delhi & Lahori Gates",
            "description": "Pass the famous ASI warning board forbidding entry after sunset. Walk through the giant stone bastions, banyan-strangled gates, and Hanuman temple.",
            "location": {
              "name": "Bhangarh Fort Main Gate",
              "lat": 27.0964,
              "lng": 76.2863
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Strict ASI rule: Everyone must vacate before sunset (5:30 PM)."
          },
          {
            "_key": "bha2b",
            "title": "Walk the Ruins of Jauhari Bazaar & Merchant Haveli Mansions",
            "description": "Explore the roofless cobblestone streets of the once-thriving marketplace where merchants sold gems, spices, and silk before the city was abandoned.",
            "location": {
              "name": "Jauhari Bazaar Ruins",
              "lat": 27.0975,
              "lng": 76.287
            },
            "time": "11:00 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Look up at the hilltop chhatri of the ascetic Guru Balu Nath who cursed the fort."
          },
          {
            "_key": "bha2c",
            "title": "Picnic Lunch at Royal Garden Veranda",
            "description": "Enjoy packed vegetarian lunch boxes and fresh lime water in the shaded stone pavilions beside the ancient temple pond.",
            "location": {
              "name": "Bhangarh Garden Pavilions",
              "lat": 27.098,
              "lng": 76.2875
            },
            "time": "01:15 PM",
            "type": "food",
            "cost": 350,
            "currency": "INR",
            "notes": "Beware of wild monkeys; keep food containers secured."
          },
          {
            "_key": "bha2d",
            "title": "Ascend to the Royal Palace Ruins & Gopinath Temple",
            "description": "Climb the seven-tier royal palace ruins overlooking the entire deserted valley. Admire the carved sandstone brackets of Gopinath Temple with zero idols inside.",
            "location": {
              "name": "Bhangarh Royal Palace Ruins",
              "lat": 27.0995,
              "lng": 76.2885
            },
            "time": "02:45 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "The wind howling through the palace stone arches is spine-chilling."
          }
        ]
      },
      {
        "_key": "bha-day3",
        "dayNumber": 3,
        "title": "Sariska Tiger Reserve Jungle Safari → Chand Baori Stepwell (Abhaneri)",
        "date": "2026-11-07",
        "summary": "Wake at dawn for an open-top Gypsy tiger safari in Sariska National Park tracking Bengal tigers and leopards. In the afternoon, drive south to Abhaneri to witness Chand Baori — one of India's deepest and most visually stunning stepwells with 3,500 narrow stone steps.",
        "activities": [
          {
            "_key": "bha3a",
            "title": "Early Morning Jungle Safari in Sariska Tiger Reserve",
            "description": "Traverse deciduous dhok forests and rocky gorges in an open 4x4 Gypsy to track Royal Bengal tigers, sambar deer, striped hyenas, and rare birds.",
            "location": {
              "name": "Sariska National Park Gate",
              "lat": 27.32,
              "lng": 76.415
            },
            "time": "06:15 AM",
            "type": "activity",
            "cost": 2400,
            "currency": "INR",
            "notes": "Pre-booking safari permits in advance online is mandatory."
          },
          {
            "_key": "bha3b",
            "title": "Brunch at Sariska Palace Heritage Hotel",
            "description": "Dine like a maharaja in the hunting lodge built by Maharaja Sawai Jai Singh of Alwar in 1892.",
            "location": {
              "name": "The Sariska Palace",
              "lat": 27.318,
              "lng": 76.422
            },
            "time": "10:30 AM",
            "type": "food",
            "cost": 950,
            "currency": "INR",
            "notes": "Royal decor with vintage hunting photographs and French furnishings."
          },
          {
            "_key": "bha3c",
            "title": "Marvel at Chand Baori Stepwell in Abhaneri",
            "description": "Gaze down into the 13-storey subterranean geometric marvel featuring 3,500 perfectly symmetrical steps descending 64 feet to a pool of jade water.",
            "location": {
              "name": "Chand Baori Stepwell Abhaneri",
              "lat": 27.0073,
              "lng": 76.6064
            },
            "time": "02:30 PM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Built by King Chanda in the 9th century; incredible photography."
          },
          {
            "_key": "bha3d",
            "title": "Visit Harshat Mata Temple Ruins",
            "description": "Explore the neighboring 8th-century temple ruins dedicated to the Goddess of Joy and Happiness, featuring intricately carved sculptures and mandapa fragments.",
            "location": {
              "name": "Harshat Mata Temple",
              "lat": 27.008,
              "lng": 76.607
            },
            "time": "04:15 PM",
            "type": "sightseeing",
            "cost": 25,
            "currency": "INR",
            "notes": "Shows classic Gurjara-Pratihara architectural motifs."
          }
        ]
      },
      {
        "_key": "bha-day4",
        "dayNumber": 4,
        "title": "Neelkanth Temple Ruins → Drive to Jaipur → Mumbai / Pune",
        "date": "2026-11-08",
        "summary": "Conclude your journey with a morning off-road climb to the secluded 10th-century Neelkanth Mahadev temple ruins hidden deep inside the Sariska mountain plateau, before driving to Jaipur Airport for your return flight.",
        "activities": [
          {
            "_key": "bha4a",
            "title": "Excursion to Secluded Neelkanth Mahadev Temple Ruins",
            "description": "Ascend a rocky forest track to an isolated mountain ridge hosting hundreds of 10th-century stone temple ruins, erotic carvings, and a colossal monolithic Jain statue.",
            "location": {
              "name": "Neelkanth Temple Sariska",
              "lat": 27.288,
              "lng": 76.324
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 100,
            "currency": "INR",
            "notes": "Remarkably tranquil archaeological gem far off the tourist trail."
          },
          {
            "_key": "bha4b",
            "title": "Transfer to Jaipur Airport (JAI) & Return Flight",
            "description": "Chauffeur transfer back to Jaipur Airport for afternoon flight back to Mumbai (BOM) or Pune (PNQ).",
            "location": {
              "name": "Jaipur International Airport",
              "lat": 26.8289,
              "lng": 75.8056
            },
            "time": "01:30 PM",
            "type": "transport",
            "cost": 5200,
            "currency": "INR",
            "notes": "Arrive 2 hours prior to scheduled departure."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-bishnoi-villages-3-days",
    "title": "Bishnoi Eco-Villages & Wildlife Sanctuaries — 3 Days from Mumbai / Pune",
    "slug": "bishnoi-villages-3-days",
    "excerpt": "Immerse yourself in the extraordinary world of the Bishnoi community — the world's first true environmentalists who have fiercely guarded wildlife and trees for over 500 years. Spot roaming herds of blackbuck and chinkara, visit Khejarli's sacred martyr grove, witness Salawas durry weaving and Kakani pottery, and experience true rural Thar hospitality.",
    "tags": [
      "Rajasthan",
      "Eco Tourism",
      "Wildlife",
      "Culture",
      "Offbeat",
      "Rural",
      "India"
    ],
    "country": "India",
    "startDate": "2026-11-12",
    "endDate": "2026-11-14",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 13500,
    "currency": "INR",
    "tripType": "Eco-Community & Cultural Immersion",
    "readingTime": 7,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "bis-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Jodhpur Airport → Guda Bishnoi Lake Sunset",
        "date": "2026-11-12",
        "summary": "Take a direct morning flight from Mumbai (BOM) or Pune (PNQ) to Jodhpur Airport (JDH). Take a short 30-minute cab ride south into the serene Bishnoi rural belt of Guda and Salawas. Settle into a traditional adobe bhunga hut, enjoy a home-cooked bajra roti lunch, and walk along the shores of Guda Bishnoi Lake at sunset.",
        "activities": [
          {
            "_key": "bis1a",
            "title": "Morning Flight Mumbai / Pune to Jodhpur (JDH)",
            "description": "Direct morning flight landing in Jodhpur (~1 hr 45 mins). Board a rural taxi into the Bishnoi heartland.",
            "location": {
              "name": "Jodhpur Civil Airport",
              "lat": 26.2514,
              "lng": 73.0487
            },
            "time": "10:15 AM",
            "type": "transport",
            "cost": 5400,
            "currency": "INR",
            "notes": "Quick 25-km transfer straight to rural homestays."
          },
          {
            "_key": "bis1b",
            "title": "Check-in to Bishnoi Village Camp and Resort",
            "description": "Check in to traditional thatched-roof circular adobe huts (jhopas) decorated with organic clay relief motifs.",
            "location": {
              "name": "Bishnoi Village Camp",
              "lat": 26.136,
              "lng": 73.072
            },
            "time": "12:00 PM",
            "type": "accommodation",
            "cost": 3200,
            "currency": "INR",
            "notes": "Eco-friendly rural retreat with authentic village ambiance."
          },
          {
            "_key": "bis1c",
            "title": "Traditional Bajra Roti & Sangri Homestyle Lunch",
            "description": "Savor steaming bajra rotis with homemade white butter (makkhan), dried desert berry (ker sangri) sabzi, and tangy chaas.",
            "location": {
              "name": "Bishnoi Village Homestay Dining",
              "lat": 26.136,
              "lng": 73.072
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 450,
            "currency": "INR",
            "notes": "100% vegetarian satvik meals prepared with farm-fresh organic ingredients."
          },
          {
            "_key": "bis1d",
            "title": "Sunset Birding at Guda Bishnoi Lake",
            "description": "Walk the scenic banks of the artificial desert reservoir to observe blackbucks drinking, migratory demoiselle cranes (Kurjan), and pelicans.",
            "location": {
              "name": "Guda Bishnoi Lake",
              "lat": 26.128,
              "lng": 73.085
            },
            "time": "05:00 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Bring binoculars for birding and wildlife viewing."
          }
        ]
      },
      {
        "_key": "bis-day2",
        "dayNumber": 2,
        "title": "Khejarli Tree Martyr Grove → Artisan Workshops & Opium Ceremony",
        "date": "2026-11-13",
        "summary": "Dedicate the day to understanding the 29 sacred principles of Guru Jambheshwar. Pay homage at Khejarli village where 363 Bishnois sacrificed their lives in 1730 hugging Khejri trees. Visit master durry weavers in Salawas, wheel potters in Kakani, and partake in a ceremonial Amal Sabha tea ritual.",
        "activities": [
          {
            "_key": "bis2a",
            "title": "Sacred Pilgrimage to Khejarli Memorial",
            "description": "Visit the revered memorial grove where Amrita Devi Bishnoi and 362 villagers laid down their lives to protect sacred Khejri trees from the Maharaja's axemen.",
            "location": {
              "name": "Khejarli Memorial",
              "lat": 26.068,
              "lng": 73.136
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "The foundational historical inspiration for the modern Chipko movement."
          },
          {
            "_key": "bis2b",
            "title": "Salawas Handwoven Durry Workshop",
            "description": "Watch master weavers at the world-famous Chhotaram Prajapat workshop handcrafting vibrant flat-weave camel wool and cotton rugs on pit looms.",
            "location": {
              "name": "Salawas Durry Weavers",
              "lat": 26.162,
              "lng": 73.045
            },
            "time": "11:00 AM",
            "type": "activity",
            "cost": 500,
            "currency": "INR",
            "notes": "Direct fair-trade purchase opportunity supporting 5th-generation weavers."
          },
          {
            "_key": "bis2c",
            "title": "Kakani Terracotta Pottery & Block Printing",
            "description": "Try your hands on the traditional manual potter's wheel and watch artisans handcraft water jugs and earthen cookware using desert clay.",
            "location": {
              "name": "Kakani Pottery Village",
              "lat": 26.185,
              "lng": 73.06
            },
            "time": "01:30 PM",
            "type": "activity",
            "cost": 200,
            "currency": "INR",
            "notes": "Watch clay toys and pots baked in open husk kilns."
          },
          {
            "_key": "bis2d",
            "title": "Traditional Amal Sabha (Opium Ceremony) & Village Council",
            "description": "Sit with village elders in their spotless courtyard for the ancient Marwari hospitality ritual of filtered poppy tea, symbolizing peace and fraternal brotherhood.",
            "location": {
              "name": "Bishnoi Elder Homestead",
              "lat": 26.14,
              "lng": 73.07
            },
            "time": "05:00 PM",
            "type": "activity",
            "cost": 300,
            "currency": "INR",
            "notes": "Strictly cultural and non-narcotic ceremonial offering."
          }
        ]
      },
      {
        "_key": "bis-day3",
        "dayNumber": 3,
        "title": "Morning Blackbuck Safari → Jodhpur Airport → Mumbai / Pune",
        "date": "2026-11-14",
        "summary": "Set off at first light into the scrub forest to watch wild blackbucks and Indian gazelles feeding fearlessly right around Bishnoi homes. Enjoy a leisurely breakfast and head to Jodhpur Airport for your return flight.",
        "activities": [
          {
            "_key": "bis3a",
            "title": "Sunrise Blackbuck & Chinkara Tracking Walk",
            "description": "Walk alongside village borders where wild antelopes graze without fear, protected fiercely by community members who feed and water them daily.",
            "location": {
              "name": "Bishnoi Scrub Pastures",
              "lat": 26.132,
              "lng": 73.078
            },
            "time": "06:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Incredible wildlife photography in natural golden morning light."
          },
          {
            "_key": "bis3b",
            "title": "Transfer to Jodhpur Airport (JDH) & Return Flight",
            "description": "Short 25-minute drive back to Jodhpur Airport for your direct flight home to Mumbai (BOM) or Pune (PNQ).",
            "location": {
              "name": "Jodhpur Civil Airport",
              "lat": 26.2514,
              "lng": 73.0487
            },
            "time": "11:00 AM",
            "type": "transport",
            "cost": 5400,
            "currency": "INR",
            "notes": "Arrive 90 minutes before flight departure."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-dholavira-4-days",
    "title": "Dholavira Harappan Metropolis & White Rann Road to Heaven — 4 Days from Mumbai / Pune",
    "slug": "dholavira-4-days",
    "excerpt": "Travel from Mumbai or Pune across the surreal 30-km 'Road to Heaven' slicing straight through the blinding White Rann of Kutch to Dholavira. Uncover the 5,000-year-old UNESCO Harappan metropolis on Khadir Bet island, marvel at monumental stone water reservoirs, the world's oldest signboard, and ancient Jurassic fossils.",
    "tags": [
      "Gujarat",
      "UNESCO",
      "Archaeology",
      "Offbeat",
      "Road Trip",
      "Desert",
      "Culture",
      "India"
    ],
    "country": "India",
    "startDate": "2026-11-19",
    "endDate": "2026-11-22",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 19500,
    "currency": "INR",
    "tripType": "Harappan Archaeology & Desert Highway",
    "readingTime": 8,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "dho-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Bhuj Airport → 'Road to Heaven' Highway to Dholavira",
        "date": "2026-11-19",
        "summary": "Take a morning flight from Mumbai (BOM) or Pune (PNQ) to Bhuj Airport (BHJ) or board the overnight Kutch Express train. Board your private SUV and drive through Rapar towards Khadir Bet island, driving along the sensational 30-km 'Road to Heaven' flanked by glistening white salt plains on both sides.",
        "activities": [
          {
            "_key": "dho1a",
            "title": "Morning Flight Mumbai / Pune to Bhuj Airport (BHJ)",
            "description": "Direct flight to Bhuj Airport (~1 hr 15 mins). Meet your driver for the legendary road trip to Dholavira.",
            "location": {
              "name": "Bhuj Airport",
              "lat": 23.2878,
              "lng": 69.6701
            },
            "time": "10:30 AM",
            "type": "transport",
            "cost": 6200,
            "currency": "INR",
            "notes": "Smooth drive of approximately 210 km (4.5 hours)."
          },
          {
            "_key": "dho1b",
            "title": "Kutchi Dabeli & Fafda Snack Stop at Rapar",
            "description": "Enjoy world-famous spicy Kutchi Dabeli stuffed with spiced potatoes, pomegranate, peanuts, and sev, paired with sweet jalebis.",
            "location": {
              "name": "Rapar Town Center",
              "lat": 23.57,
              "lng": 70.64
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 200,
            "currency": "INR",
            "notes": "The last major town before entering the salt causeway."
          },
          {
            "_key": "dho1c",
            "title": "Drive the Spectacular 'Road to Heaven' (Gadhuli-Santalpur Highway)",
            "description": "Cruise down the newly paved 30-km highway cutting straight through the shimmering white salt pan of the Greater Rann with endless white horizons on both sides.",
            "location": {
              "name": "Road to Heaven White Rann",
              "lat": 23.75,
              "lng": 70.35
            },
            "time": "03:30 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "One of the most photogenic highway stretches in all of Asia."
          },
          {
            "_key": "dho1d",
            "title": "Check-in to Dholavira Tourism Resort & Sunset Bhunga",
            "description": "Check in to traditional circular Kutchi mud cottages (Bhungas) at Dholavira resort, watching the sun dip into the salt flats.",
            "location": {
              "name": "Dholavira Tourism Resort",
              "lat": 23.882,
              "lng": 70.218
            },
            "time": "05:45 PM",
            "type": "accommodation",
            "cost": 3800,
            "currency": "INR",
            "notes": "Equipped with traditional mirrors and hand-painted mud walls."
          }
        ]
      },
      {
        "_key": "dho-day2",
        "dayNumber": 2,
        "title": "Full Day Guided Exploration of UNESCO Dholavira Harappan Excavation",
        "date": "2026-11-20",
        "summary": "Dedicate the entire day to exploring one of the two largest Harappan sites in India. Walk through the fortified Citadel, the ceremonial Middle Town, the Lower Town, inspect the mammoth 5,000-year-old stone step reservoirs, the underground storm-water drainage network, and view the famous 10-letter Harappan signboard in the ASI Museum.",
        "activities": [
          {
            "_key": "dho2a",
            "title": "The Citadel & Grand Stadium of Harappa",
            "description": "Walk the massive dressed-stone ramparts of the Citadel and the vast ceremonial sports/festival ground between the Citadel and Middle Town.",
            "location": {
              "name": "Dholavira Harappan Citadel",
              "lat": 23.886,
              "lng": 70.213
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Hire an ASI-certified local guide at the ticket counter."
          },
          {
            "_key": "dho2b",
            "title": "Mammoth 5,000-Year-Old Stone Step Reservoirs",
            "description": "Inspect the colossal rock-cut rainwater harvesting reservoirs, stone sluice gates, and water filtration conduits that sustained 20,000 residents in arid Kutch.",
            "location": {
              "name": "Dholavira Harappan Reservoirs",
              "lat": 23.8875,
              "lng": 70.2145
            },
            "time": "10:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "A breathtaking testament to ancient urban hydraulic engineering."
          },
          {
            "_key": "dho2c",
            "title": "Traditional Kutchi Thali Lunch at Toran Dining Hall",
            "description": "Relish Gujarati Kadhi, Ringan No Olo (smoked eggplant bharta), Rotla, and fresh jaggery ghee.",
            "location": {
              "name": "Toran Dining Dholavira",
              "lat": 23.881,
              "lng": 70.217
            },
            "time": "01:15 PM",
            "type": "food",
            "cost": 350,
            "currency": "INR",
            "notes": "Authentic, wholesome rural Kutchi recipes."
          },
          {
            "_key": "dho2d",
            "title": "ASI Museum & 10-Symbol Harappan Signboard",
            "description": "Examine excavated beads, seals with unicorn motifs, terracotta ornaments, bronze weights, and the iconic 10-symbol wooden signboard replica.",
            "location": {
              "name": "Dholavira Archaeological Museum",
              "lat": 23.8845,
              "lng": 70.216
            },
            "time": "03:00 PM",
            "type": "sightseeing",
            "cost": 25,
            "currency": "INR",
            "notes": "Deeply educational curation spanning all 7 developmental stages."
          }
        ]
      },
      {
        "_key": "dho-day3",
        "dayNumber": 3,
        "title": "Dholavira Fossil Park → Chipper Point Sunset → Kala Dungar Hills",
        "date": "2026-11-21",
        "summary": "Visit the Jurassic Fossil Park on Khadir Bet displaying 175-million-year-old petrified tree trunks, drive out to Chipper Point at the northern edge of the island where the White Desert meets the sky, and journey towards Bhuj via the panoramic heights of Kala Dungar (Black Hill).",
        "activities": [
          {
            "_key": "dho3a",
            "title": "Wood Fossil Park on Khadir Bet",
            "description": "Marvel at massive 175-million-year-old petrified Jurassic tree trunks embedded naturally in stone cliffs from when Kutch was underwater.",
            "location": {
              "name": "Dholavira Fossil Park",
              "lat": 23.91,
              "lng": 70.23
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Incredible geological evidence of the prehistoric sea."
          },
          {
            "_key": "dho3b",
            "title": "Chipper Point Edge of the White Desert",
            "description": "Drive to the outermost tip of Khadir Bet island to witness the blinding white horizon where flamingos feed in salt pools during winter.",
            "location": {
              "name": "Chipper Point Dholavira",
              "lat": 23.94,
              "lng": 70.25
            },
            "time": "10:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Feels like the edge of the world; stark white wilderness."
          },
          {
            "_key": "dho3c",
            "title": "Drive to Kala Dungar (Highest Point of Kutch at 462 m)",
            "description": "Scenic 2.5-hour drive to Kala Dungar for a panoramic 360-degree vista of the Great Rann of Kutch blending seamlessly into the Arabian sky.",
            "location": {
              "name": "Kala Dungar Black Hill",
              "lat": 23.929,
              "lng": 69.815
            },
            "time": "03:30 PM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Visit the 400-year-old Dattatreya Temple where wild jackals are fed sacred prasad daily."
          },
          {
            "_key": "dho3d",
            "title": "Check-in to Bhuj Heritage Hotel",
            "description": "Drive down to Bhuj city and check in to Regenta Resort or traditional heritage haveli.",
            "location": {
              "name": "Regenta Resort Bhuj",
              "lat": 23.238,
              "lng": 69.645
            },
            "time": "07:30 PM",
            "type": "accommodation",
            "cost": 4200,
            "currency": "INR",
            "notes": "Relax with authentic Kutchi dinner and Gujarati sweets."
          }
        ]
      },
      {
        "_key": "dho-day4",
        "dayNumber": 4,
        "title": "Aina Mahal & Prag Mahal Tour → Bhuj Airport → Mumbai / Pune",
        "date": "2026-11-22",
        "summary": "Explore the ornate mirror halls of 18th-century Aina Mahal and Italian-Gothic Prag Mahal in Bhuj, pick up authentic Ajrakh block-print scarves, and head to Bhuj Airport for your flight back home.",
        "activities": [
          {
            "_key": "dho4a",
            "title": "Tour of Aina Mahal (Hall of Mirrors) & Prag Mahal",
            "description": "Marvel at the Venetian glass chandeliers, mirror-lined walls, and English clock tower built by master artisan Ram Singh Malam in the 18th century.",
            "location": {
              "name": "Aina Mahal Bhuj",
              "lat": 23.255,
              "lng": 69.667
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 150,
            "currency": "INR",
            "notes": "Magnificent blend of European and Kutchi royal aesthetics."
          },
          {
            "_key": "dho4b",
            "title": "Transfer to Bhuj Airport (BHJ) & Return Flight",
            "description": "Short 15-minute cab ride to Bhuj Airport for direct flight back to Mumbai (BOM) or Pune (PNQ).",
            "location": {
              "name": "Bhuj Airport Terminal",
              "lat": 23.2878,
              "lng": 69.6701
            },
            "time": "12:30 PM",
            "type": "transport",
            "cost": 6200,
            "currency": "INR",
            "notes": "Arrive 2 hours prior to scheduled departure."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-mandvi-4-days",
    "title": "Mandvi Maritime Heritage & Pristine Arabian Sea — 4 Days from Mumbai / Pune",
    "slug": "mandvi-4-days",
    "excerpt": "Head from Mumbai or Pune to the historic maritime port of Mandvi on Kutch's Arabian Sea coast. Watch master carpenters hand-build 400-year-old mammoth wooden dhow ships on the Rukmavati River, stroll the private beaches of the royal Vijay Vilas Palace, admire windmill-lined shores, and sample authentic Kutchi coastal flavours.",
    "tags": [
      "Gujarat",
      "Coastal",
      "Heritage",
      "Beach",
      "Offbeat",
      "Crafts",
      "Culture",
      "India"
    ],
    "country": "India",
    "startDate": "2026-11-26",
    "endDate": "2026-11-29",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 17500,
    "currency": "INR",
    "tripType": "Maritime Heritage & Coastal Getaway",
    "readingTime": 8,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "man-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Bhuj Airport → Scenic Drive to Mandvi Beach",
        "date": "2026-11-26",
        "summary": "Fly into Bhuj Airport (BHJ) from Mumbai (BOM) or Pune (PNQ). Meet your chauffeur for a comfortable 1-hour drive through date-palm plantations to the historic port town of Mandvi. Check into a beachfront luxury tent or resort, relaxing with an evening barefoot stroll on Mandvi Wind Farm Beach.",
        "activities": [
          {
            "_key": "man1a",
            "title": "Morning Flight Mumbai / Pune to Bhuj (BHJ)",
            "description": "Direct flight to Bhuj Airport (~1 hr 15 mins). Meet your driver for the 55-km drive to Mandvi coast.",
            "location": {
              "name": "Bhuj Airport",
              "lat": 23.2878,
              "lng": 69.6701
            },
            "time": "10:30 AM",
            "type": "transport",
            "cost": 5800,
            "currency": "INR",
            "notes": "Smooth, scenic 2-lane coastal highway."
          },
          {
            "_key": "man1b",
            "title": "Check-in to Serena Beach Resort Mandvi",
            "description": "Check in to luxury beachfront tents or cottages with direct private access to pristine Arabian Sea beaches.",
            "location": {
              "name": "Serena Beach Resort",
              "lat": 22.825,
              "lng": 69.318
            },
            "time": "01:00 PM",
            "type": "accommodation",
            "cost": 6500,
            "currency": "INR",
            "notes": "Private beach dunes, swimming pool, and spa amenities."
          },
          {
            "_key": "man1c",
            "title": "Fresh Seafood & Kutchi Thali Lunch",
            "description": "Enjoy fresh surmai fry, prawn masala, or authentic vegetarian Kutchi thali with Bajra Rotla and garlic chutney.",
            "location": {
              "name": "Osho Restaurant Mandvi",
              "lat": 22.833,
              "lng": 69.355
            },
            "time": "02:15 PM",
            "type": "food",
            "cost": 650,
            "currency": "INR",
            "notes": "Renowned across Kutch for unmatched authentic home-style thalis."
          },
          {
            "_key": "man1d",
            "title": "Sunset Stroll at Mandvi Wind Farm Beach",
            "description": "Walk the golden sands of Asia's first wind-farm beach with tall windmills spinning against pink and orange sunset skies.",
            "location": {
              "name": "Wind Farm Beach Mandvi",
              "lat": 22.818,
              "lng": 69.345
            },
            "time": "05:15 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Camel and horse rides available right on the shore."
          }
        ]
      },
      {
        "_key": "man-day2",
        "dayNumber": 2,
        "title": "400-Year-Old Wooden Shipbuilding Yards → Royal Vijay Vilas Palace",
        "date": "2026-11-27",
        "summary": "Witness living history along the banks of the Rukmavati River, where Kharva shipwrights hand-build mammoth wooden sea vessels without blueprints. In the afternoon, visit the 1929 Rajput-Victorian Vijay Vilas Palace, exploring royal reception rooms, film shoot locations, and private royal beach pavilions.",
        "activities": [
          {
            "_key": "man2a",
            "title": "Rukmavati River Wooden Dhow Shipbuilding Yards",
            "description": "Walk among the ribs of colossal wooden merchant dhows hand-carved from Malaysian sal wood by master craftsmen whose families have built ships for 400 years.",
            "location": {
              "name": "Mandvi Shipbuilding Yards",
              "lat": 22.831,
              "lng": 69.36
            },
            "time": "09:00 AM",
            "type": "activity",
            "cost": 100,
            "currency": "INR",
            "notes": "The vessels are ordered by merchants across the Persian Gulf and Africa."
          },
          {
            "_key": "man2b",
            "title": "Visit Topansar Lake & Rukmavati Stone Bridge",
            "description": "Walk across the 1883 four-arched stone bridge built over Rukmavati river and visit the peaceful migratory bird sanctuary at Topansar Lake.",
            "location": {
              "name": "Rukmavati Bridge Mandvi",
              "lat": 22.834,
              "lng": 69.358
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "One of the oldest stone bridges in western India."
          },
          {
            "_key": "man2c",
            "title": "Original Mandvi Dabeli at Joshi Dabeli Center",
            "description": "Taste the iconic snack in the very town where it was invented in the 1960s by Keshavji Gabha Chudasama.",
            "location": {
              "name": "Joshi Dabeli Mandvi",
              "lat": 22.835,
              "lng": 69.352
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 150,
            "currency": "INR",
            "notes": "Served with unique spicy garlic chutney and fresh roasted peanuts."
          },
          {
            "_key": "man2d",
            "title": "Tour of Vijay Vilas Palace & Private Royal Beach",
            "description": "Explore the red sandstone summer retreat built by Maharao Shri Khengarji III, featuring Bengali domes, Gothic arches, stained glass windows, and a pristine private beach.",
            "location": {
              "name": "Vijay Vilas Palace",
              "lat": 22.8335,
              "lng": 69.298
            },
            "time": "03:15 PM",
            "type": "sightseeing",
            "cost": 200,
            "currency": "INR",
            "notes": "Iconic filming location for Bollywood blockbusters like 'Hum Dil De Chuke Sanam'."
          }
        ]
      },
      {
        "_key": "man-day3",
        "dayNumber": 3,
        "title": "72 Jinalaya Temple Complex → Bandhani Tie-and-Dye Artisans",
        "date": "2026-11-28",
        "summary": "Take a morning excursion to the sprawling marble complex of 72 Jinalaya (Bhadreshwar Tirth), dedicated to Mahavira. Return to Mandvi's narrow old alleys to watch master craftsmen create world-renowned Bandhani (tie-and-dye) textiles.",
        "activities": [
          {
            "_key": "man3a",
            "title": "Excursion to 72 Jinalaya Jain Temple Complex",
            "description": "Marvel at the colossal 80-acre white marble temple sanctuary featuring 72 distinct shrines surrounding the central sanctum.",
            "location": {
              "name": "72 Jinalaya Mandvi Highway",
              "lat": 22.956,
              "lng": 69.452
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Immaculate tranquility, serene marble carving, and satvik atmosphere."
          },
          {
            "_key": "man3b",
            "title": "Satvik Lunch at 72 Jinalaya Bhojanshala",
            "description": "Wholesome satvik Jain thali prepared fresh with pure ghee and local seasonal produce.",
            "location": {
              "name": "72 Jinalaya Bhojanshala",
              "lat": 22.956,
              "lng": 69.452
            },
            "time": "12:30 PM",
            "type": "food",
            "cost": 120,
            "currency": "INR",
            "notes": "Strict satvik lunch served until 1:30 PM."
          },
          {
            "_key": "man3c",
            "title": "Bandhani (Tie-and-Dye) Artisan Workshop Tour",
            "description": "Meet Khatri community master artisans tying thousands of microscopic knots with thread on silk and georgette fabric before natural dye dipping.",
            "location": {
              "name": "Mandvi Old Bazaar",
              "lat": 22.834,
              "lng": 69.353
            },
            "time": "03:00 PM",
            "type": "activity",
            "cost": 500,
            "currency": "INR",
            "notes": "Buy authentic GI-tagged Kutchi Bandhani sarees and dupattas directly from makers."
          },
          {
            "_key": "man3d",
            "title": "Sunset at Kashivishvanath Beach & Coconut Water",
            "description": "Relax on the quiet sands listening to the crashing waves, enjoying fresh tender coconut water and spicy corn on the cob.",
            "location": {
              "name": "Kashivishvanath Beach",
              "lat": 22.822,
              "lng": 69.33
            },
            "time": "05:30 PM",
            "type": "sightseeing",
            "cost": 100,
            "currency": "INR",
            "notes": "Far less crowded than the main beach."
          }
        ]
      },
      {
        "_key": "man-day4",
        "dayNumber": 4,
        "title": "Kranti Teerth Memorial → Bhuj Airport → Mumbai / Pune",
        "date": "2026-11-29",
        "summary": "Visit the inspiring Kranti Teerth memorial dedicated to freedom fighter Shyamji Krishna Varma on the outskirts of Mandvi, before heading to Bhuj Airport for your flight back home.",
        "activities": [
          {
            "_key": "man4a",
            "title": "Visit Kranti Teerth (Shyamji Krishna Varma Memorial)",
            "description": "Tour the exact replica of London's 'India House' built on the Mandvi coast commemorating the revolutionary patriot and his comrades.",
            "location": {
              "name": "Kranti Teerth Mandvi",
              "lat": 22.846,
              "lng": 69.382
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Houses the sacred urns containing the ashes of Shyamji and his wife brought from Geneva."
          },
          {
            "_key": "man4b",
            "title": "Transfer to Bhuj Airport (BHJ) & Return Flight",
            "description": "Drive back to Bhuj Airport for your direct afternoon flight to Mumbai (BOM) or Pune (PNQ).",
            "location": {
              "name": "Bhuj Airport Terminal",
              "lat": 23.2878,
              "lng": 69.6701
            },
            "time": "12:00 PM",
            "type": "transport",
            "cost": 5800,
            "currency": "INR",
            "notes": "Arrive 90 minutes before flight departure."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-poshina-3-days",
    "title": "Poshina Tribal Valleys & Sacred Terracotta Shrines — 3 Days from Mumbai / Pune",
    "slug": "poshina-3-days",
    "excerpt": "Venture from Mumbai or Pune into the rugged Aravalli borderlands of northern Gujarat to Poshina. Stay at the royal 17th-century Darbargadh Poshina palace, discover hidden sacred forest groves with thousands of votive terracotta horses offered by Garasia and Bhil tribes, and trek through the ancient 10th-century Jain temple ruins of Polo Forest.",
    "tags": [
      "Gujarat",
      "Tribal",
      "Heritage",
      "Offbeat",
      "Culture",
      "Forest",
      "Ruins",
      "India"
    ],
    "country": "India",
    "startDate": "2026-12-03",
    "endDate": "2026-12-05",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 14500,
    "currency": "INR",
    "tripType": "Tribal Shrines & Royal Heritage",
    "readingTime": 7,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "pos-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Ahmedabad Airport → Scenic Drive to Poshina",
        "date": "2026-12-03",
        "summary": "Take a 1-hour flight from Mumbai (BOM) or Pune (PNQ) to Ahmedabad Airport (AMD), or take the morning Vande Bharat Express. Meet your driver for a scenic 3-hour journey through Sabarkantha into the Aravalli hills. Check in to Darbargadh Poshina — a 17th-century fortified palace hosted by the local royal family.",
        "activities": [
          {
            "_key": "pos1a",
            "title": "Morning Flight Mumbai / Pune to Ahmedabad (AMD)",
            "description": "Direct flight to Sardar Vallabhbhai Patel International Airport (~1 hr 10 mins). Meet your private chauffeur for the 140-km drive.",
            "location": {
              "name": "Ahmedabad International Airport",
              "lat": 23.0772,
              "lng": 72.6347
            },
            "time": "09:30 AM",
            "type": "transport",
            "cost": 4200,
            "currency": "INR",
            "notes": "Scenic highway route via Himatnagar and Idar."
          },
          {
            "_key": "pos1b",
            "title": "Check-in to Darbargadh Poshina Heritage Palace",
            "description": "Check in to this aristocratic 17th-century fortified palace featuring courtyards, pillared verandas, royal armory, and antique family memorabilia.",
            "location": {
              "name": "Darbargadh Poshina",
              "lat": 24.1667,
              "lng": 73.0833
            },
            "time": "01:00 PM",
            "type": "accommodation",
            "cost": 5500,
            "currency": "INR",
            "notes": "Warm personal hospitality from Rawat Harendra Singhji and family."
          },
          {
            "_key": "pos1c",
            "title": "Royal Rajput-Gujarati Feast at Darbargadh",
            "description": "Savor recipes passed down generations: Sev Tameta nu Shaak, Ringan Bharta, Kathiawadi Dal, and piping hot Rotlas with pure churned butter.",
            "location": {
              "name": "Darbargadh Dining Hall",
              "lat": 24.1667,
              "lng": 73.0833
            },
            "time": "02:15 PM",
            "type": "food",
            "cost": 850,
            "currency": "INR",
            "notes": "Dine on vintage silver and brass thalis."
          },
          {
            "_key": "pos1d",
            "title": "Evening Village Walk & Silver Artisan Bazaar",
            "description": "Stroll through Poshina's village lanes to visit tribal silver and brass craftsmen making massive hollow silver anklets, amulets, and arrows.",
            "location": {
              "name": "Poshina Village Market",
              "lat": 24.168,
              "lng": 73.082
            },
            "time": "05:00 PM",
            "type": "activity",
            "cost": 200,
            "currency": "INR",
            "notes": "Meet friendly Garasia and Bhil tribal women dressed in brilliant red and yellow odhanis."
          }
        ]
      },
      {
        "_key": "pos-day2",
        "dayNumber": 2,
        "title": "Sacred Terracotta Horse Shrines → Garasia & Bhil Tribal Hamlets",
        "date": "2026-12-04",
        "summary": "Join the palace host on an expedition deep into the forested Aravalli hills to witness one of India's most extraordinary folk shrines: thousands of votive terracotta horses standing under sacred banyan trees, offered by local tribes to invoke divine blessings.",
        "activities": [
          {
            "_key": "pos2a",
            "title": "Expedition to Sacred Terracotta Horse Forest Groves",
            "description": "Walk into an enchanted clearing beneath ancient banyan canopies where thousands of handmade clay horses, elephants, and chhatris stand silently offered to village spirits.",
            "location": {
              "name": "Terracotta Horse Shrines Poshina",
              "lat": 24.18,
              "lng": 73.11
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 150,
            "currency": "INR",
            "notes": "An awe-inspiring spiritual tradition practiced undisturbed for millennia."
          },
          {
            "_key": "pos2b",
            "title": "Visit Potter Hamlet Crafting Votive Terracotta Horses",
            "description": "Watch tribal potter families sculpting hollow terracotta horses with clay gathered from forest riverbeds, baking them in wood fires.",
            "location": {
              "name": "Poshina Kumhar Hamlet",
              "lat": 24.175,
              "lng": 73.095
            },
            "time": "11:00 AM",
            "type": "activity",
            "cost": 300,
            "currency": "INR",
            "notes": "You can purchase small authentic terracotta horses directly from the artist."
          },
          {
            "_key": "pos2c",
            "title": "Farmstead Picnic Lunch by River Sei",
            "description": "Enjoy fresh farm-cooked rotlas, methi theplas, kachumber salad, and buttermilk under the shade of mango trees beside the river.",
            "location": {
              "name": "Sei River Riverside",
              "lat": 24.16,
              "lng": 73.07
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 450,
            "currency": "INR",
            "notes": "Prepared by the palace staff using farm-fresh vegetables."
          },
          {
            "_key": "pos2d",
            "title": "Visit Garasia & Bhil Tribal Homesteads",
            "description": "Learn about tribal customs, painted wall murals (Pithora art), traditional bow-and-arrow craft, and herbal forest medicine.",
            "location": {
              "name": "Garasia Tribal Settlement",
              "lat": 24.19,
              "lng": 73.125
            },
            "time": "04:00 PM",
            "type": "activity",
            "cost": 200,
            "currency": "INR",
            "notes": "Guided with deep cultural sensitivity and respect for community privacy."
          }
        ]
      },
      {
        "_key": "pos-day3",
        "dayNumber": 3,
        "title": "Polo Forest Ancient Temple Ruins → Ahmedabad Airport → Mumbai / Pune",
        "date": "2026-12-05",
        "summary": "Depart Poshina and drive 45 minutes south to the lush Polo Forest. Hike among the 10th-century carved Jain and Shiva temple ruins along the Harnav River, before returning to Ahmedabad for your evening flight back to Mumbai or Pune.",
        "activities": [
          {
            "_key": "pos3a",
            "title": "Trek through Ancient Polo Forest Ruins",
            "description": "Explore the 10th-century ruined Jain temples, the Shiva temple at Sharaneshwar, and carved stepwells hidden amidst dense deciduous teak forest.",
            "location": {
              "name": "Polo Forest Ruins",
              "lat": 24.004,
              "lng": 73.238
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 100,
            "currency": "INR",
            "notes": "Stunning forest setting along the pristine Harnav River."
          },
          {
            "_key": "pos3b",
            "title": "Gujarati Thali Lunch at Idar / Sabarkantha",
            "description": "Enjoy a traditional unlimited Gujarati thali with sweet dal, khichdi, kadhi, and shrikhand.",
            "location": {
              "name": "Highway Grand Dining Sabarkantha",
              "lat": 23.83,
              "lng": 72.99
            },
            "time": "01:00 PM",
            "type": "food",
            "cost": 400,
            "currency": "INR",
            "notes": "Quick, clean highway dining break on route to Ahmedabad."
          },
          {
            "_key": "pos3c",
            "title": "Transfer to Ahmedabad Airport (AMD) & Return Flight",
            "description": "Reach Ahmedabad Airport for your evening flight back to Mumbai (BOM) or Pune (PNQ).",
            "location": {
              "name": "Ahmedabad International Airport",
              "lat": 23.0772,
              "lng": 72.6347
            },
            "time": "04:30 PM",
            "type": "transport",
            "cost": 4200,
            "currency": "INR",
            "notes": "Arrive 2 hours prior to scheduled departure."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-champaner-pavagadh-3-days",
    "title": "Champaner-Pavagadh UNESCO Heritage & Sacred Peak — 3 Days from Mumbai / Pune",
    "slug": "champaner-pavagadh-3-days",
    "excerpt": "Embark from Mumbai or Pune on a quick Vande Bharat getaway to the UNESCO World Heritage Archaeological Park of Champaner-Pavagadh. Discover the breathtaking 16th-century Indo-Islamic Sultanate mosques with lace-like stone filigree, ascend the dramatic volcanic Pavagadh Hill to the Kalika Mata Temple via ropeway, and tour Vadodara's royal Laxmi Vilas Palace.",
    "tags": [
      "Gujarat",
      "UNESCO",
      "Heritage",
      "Temples",
      "Architecture",
      "Offbeat",
      "Culture",
      "India"
    ],
    "country": "India",
    "startDate": "2026-12-10",
    "endDate": "2026-12-12",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 12500,
    "currency": "INR",
    "tripType": "UNESCO Architecture & Sacred Mountain",
    "readingTime": 7,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "cha-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Vadodara Vande Bharat → Champaner Jami Masjid Sunset",
        "date": "2026-12-10",
        "summary": "Board the high-speed Mumbai Central – Gandhinagar Vande Bharat Express (or fly from Pune to Vadodara BDQ). Reach Vadodara Junction in just 4.5 hours. Take a smooth 50-minute cab ride to the foothills of Champaner. Check in to a heritage eco-resort, relaxing with a golden hour visit to the magnificent 1513 Jami Masjid.",
        "activities": [
          {
            "_key": "cha1a",
            "title": "Morning Vande Bharat Express to Vadodara Junction (BRC)",
            "description": "High-speed train from Mumbai Central (06:00 AM) arriving in Vadodara by 10:15 AM (or flight from Pune/Mumbai to BDQ). Chauffeur pickup at station.",
            "location": {
              "name": "Vadodara Junction Railway Station",
              "lat": 22.3107,
              "lng": 73.1812
            },
            "time": "10:15 AM",
            "type": "transport",
            "cost": 1650,
            "currency": "INR",
            "notes": "Comfortable Executive Chair Car travel with scenic views."
          },
          {
            "_key": "cha1b",
            "title": "Check-in to Champaner Heritage Resort",
            "description": "Check in to sprawling mango and chikoo orchard cottages situated at the base of Pavagadh hill.",
            "location": {
              "name": "Champaner Heritage Resort",
              "lat": 22.485,
              "lng": 73.535
            },
            "time": "12:00 PM",
            "type": "accommodation",
            "cost": 4200,
            "currency": "INR",
            "notes": "Serene rural environment with backdrop of the volcanic peak."
          },
          {
            "_key": "cha1c",
            "title": "Authentic Gujarati Thali Lunch at Bageecha",
            "description": "Savor local Gujarati dishes: Undhiyu, Sev Tameta, hot Phulkas, Steamed Rice, Dal, and Gulab Jamun.",
            "location": {
              "name": "Bageecha Restaurant Halol",
              "lat": 22.502,
              "lng": 73.475
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 450,
            "currency": "INR",
            "notes": "Wholesome, clean regional vegetarian thali."
          },
          {
            "_key": "cha1d",
            "title": "Golden Hour at Jami Masjid (Great Mosque of Champaner)",
            "description": "Marvel at Sultan Mahmud Begada's architectural masterpiece dating from 1513 — 172 carved pillars, high central dome, 7 mihrabs, and perforated stone screens.",
            "location": {
              "name": "Jami Masjid Champaner",
              "lat": 22.4858,
              "lng": 73.5385
            },
            "time": "04:30 PM",
            "type": "sightseeing",
            "cost": 40,
            "currency": "INR",
            "notes": "Considered the pinnacle of Indo-Islamic mosque architecture in Gujarat."
          }
        ]
      },
      {
        "_key": "cha-day2",
        "dayNumber": 2,
        "title": "Pavagadh Hill Ropeway & Kalika Mata Temple → UNESCO Monuments",
        "date": "2026-12-11",
        "summary": "Ride the modern Udan Khatola cable car up the dramatic 800-meter volcanic Pavagadh hill to the revered Kalika Mata Temple Shaktipeeth atop the pinnacle. In the afternoon, descend to explore Champaner Archaeological Park's medieval monuments: Kevda Masjid, Nagina Masjid, Citadel walls, and the spiral Helical Stepwell.",
        "activities": [
          {
            "_key": "cha2a",
            "title": "Pavagadh Hill Cable Car (Udan Khatola) & Sacred Summit Climb",
            "description": "Glide over sheer volcanic cliffs on the ropeway to the Mauliya plateau, then climb the stone stairs to the sacred Kalika Mata Temple perched atop the cliff crest.",
            "location": {
              "name": "Pavagadh Hill Summit",
              "lat": 22.46,
              "lng": 73.518
            },
            "time": "07:30 AM",
            "type": "activity",
            "cost": 250,
            "currency": "INR",
            "notes": "One of the 51 Shaktipeeths; mesmerizing mist and sunrise valley panoramas."
          },
          {
            "_key": "cha2b",
            "title": "Lakulisha Temple & Sadan Shah Peer Dargah Ruins",
            "description": "Explore the ancient 10th-century Lakulisha temple carvings and historical bastions scattered across the Pavagadh plateau.",
            "location": {
              "name": "Lakulisha Temple Pavagadh",
              "lat": 22.463,
              "lng": 73.52
            },
            "time": "10:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Unique harmony of Hindu, Jain, and Islamic spiritual architecture on one hill."
          },
          {
            "_key": "cha2c",
            "title": "Country Lunch at Hotel Sarvottam Halol",
            "description": "Relish spicy Kathiawadi Baingan Bharta, Bajra Rotla with white butter, and refreshing cold buttermilk.",
            "location": {
              "name": "Hotel Sarvottam Halol",
              "lat": 22.505,
              "lng": 73.472
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 350,
            "currency": "INR",
            "notes": "Popular local highway stop known for rich Kathiawadi taste."
          },
          {
            "_key": "cha2d",
            "title": "Tour of Nagina Masjid, Kevda Masjid & Helical Stepwell",
            "description": "Discover the pure white cenotaph of Nagina Masjid, the floral globe carvings of Kevda Masjid, and descend the spiral stone staircase of Helical Vav.",
            "location": {
              "name": "Nagina Masjid Champaner",
              "lat": 22.492,
              "lng": 73.535
            },
            "time": "03:45 PM",
            "type": "sightseeing",
            "cost": 40,
            "currency": "INR",
            "notes": "The 16th-century spiral stepwell is a marvel of medieval hydraulic design."
          }
        ]
      },
      {
        "_key": "cha-day3",
        "dayNumber": 3,
        "title": "Laxmi Vilas Palace Tour → Sev Usal Tasting → Return Train/Flight",
        "date": "2026-12-12",
        "summary": "Drive to Vadodara city to tour the grand Laxmi Vilas Palace — four times the size of Buckingham Palace. Savor Vadodara's famous Mahakali Sev Usal and board your afternoon Vande Bharat train or flight back to Mumbai or Pune.",
        "activities": [
          {
            "_key": "cha3a",
            "title": "Tour of Majestic Laxmi Vilas Palace Vadodara",
            "description": "Tour the 1890 Indo-Saracenic palace of the Gaekwad dynasty featuring Belgian stained glass, Italian marble mosaic floors, armory, and peacocks on golf lawns.",
            "location": {
              "name": "Laxmi Vilas Palace Vadodara",
              "lat": 22.2941,
              "lng": 73.1925
            },
            "time": "09:30 AM",
            "type": "sightseeing",
            "cost": 300,
            "currency": "INR",
            "notes": "Audio guide voiced by the Gaekwad royal family included."
          },
          {
            "_key": "cha3b",
            "title": "Iconic Vadodara Street Food Lunch: Mahakali Sev Usal",
            "description": "Taste Vadodara's legendary fiery green-pea curry topped with spicy sev, tari, spring onions, and buttered pav.",
            "location": {
              "name": "Mahakali Sev Usal Vadodara",
              "lat": 22.302,
              "lng": 73.208
            },
            "time": "01:00 PM",
            "type": "food",
            "cost": 150,
            "currency": "INR",
            "notes": "A culinary must-do when in Vadodara since 1972."
          },
          {
            "_key": "cha3c",
            "title": "Return Vande Bharat / Flight to Mumbai / Pune",
            "description": "Board the afternoon Vande Bharat Express from Vadodara Junction (03:30 PM) arriving Mumbai Central by 08:00 PM, or flight to Pune/Mumbai.",
            "location": {
              "name": "Vadodara Junction Railway Station",
              "lat": 22.3107,
              "lng": 73.1812
            },
            "time": "03:30 PM",
            "type": "transport",
            "cost": 1650,
            "currency": "INR",
            "notes": "Relaxing end to a 3-day UNESCO heritage escape."
          }
        ]
      }
    ]
  },
  {
    "_id": "trip-palitana-3-days",
    "title": "Palitana Sacred Shatrunjaya Temples — 3 Days from Mumbai / Pune",
    "slug": "palitana-3-days",
    "excerpt": "Embark from Mumbai or Pune on a sacred pilgrimage to Palitana — the world's first vegetarian city. Climb 3,800 hand-hewn stone steps up Mount Shatrunjaya to an ethereal city of 900+ white marble Jain temples overlooking the Shetrunji River, accompanied by Bhavnagar's coastal palaces and satvik Gujarati hospitality.",
    "tags": [
      "Gujarat",
      "Pilgrimage",
      "Temples",
      "Architecture",
      "Offbeat",
      "Spiritual",
      "Culture",
      "India"
    ],
    "country": "India",
    "startDate": "2026-12-17",
    "endDate": "2026-12-19",
    "bestSuggestedMonth": "October – March",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 11500,
    "currency": "INR",
    "tripType": "Sacred Pilgrimage & Temple City",
    "readingTime": 7,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "pal-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Bhavnagar Airport / Train → Palitana Check-in",
        "date": "2026-12-17",
        "summary": "Take a flight from Mumbai (BOM) or Pune (PNQ) to Bhavnagar Airport (BHU) or take the overnight Saurashtra / Bandra-Bhavnagar Express train. Take a 1-hour drive through the Saurashtra countryside to Palitana. Check in to a peaceful dharamsala or resort, relax, and explore the vegetarian town and Taleti foothill museums.",
        "activities": [
          {
            "_key": "pal1a",
            "title": "Flight Mumbai / Pune to Bhavnagar Airport (BHU)",
            "description": "Direct flight landing at Bhavnagar Airport (~1 hr 10 mins). Meet your taxi for the 50-km drive to Palitana town.",
            "location": {
              "name": "Bhavnagar Airport",
              "lat": 21.7519,
              "lng": 72.1852
            },
            "time": "10:30 AM",
            "type": "transport",
            "cost": 3800,
            "currency": "INR",
            "notes": "Smooth rural 2-lane road through Saurashtra cotton fields."
          },
          {
            "_key": "pal1b",
            "title": "Check-in to Vijay Vilas Heritage Homestay / Dharamsala",
            "description": "Check in to Vijay Vilas Palace homestay or modern pilgrim dharamsala at the foot of Shatrunjaya hill.",
            "location": {
              "name": "Vijay Vilas Palitana",
              "lat": 21.52,
              "lng": 71.835
            },
            "time": "12:30 PM",
            "type": "accommodation",
            "cost": 3200,
            "currency": "INR",
            "notes": "Pure vegetarian and satvik premises."
          },
          {
            "_key": "pal1c",
            "title": "Satvik Kathiawadi Thali at Taleti",
            "description": "Enjoy authentic satvik dishes without onion or garlic: Moong dal khichdi, Kadhi, ringna no olo, and hot rotlas.",
            "location": {
              "name": "Taleti Bhojanshala Palitana",
              "lat": 21.515,
              "lng": 71.83
            },
            "time": "01:30 PM",
            "type": "food",
            "cost": 250,
            "currency": "INR",
            "notes": "Food in Palitana is 100% vegetarian by law."
          },
          {
            "_key": "pal1d",
            "title": "Visit Sri Vishal Jain Museum at Taleti Foothills",
            "description": "View ancient palm-leaf manuscripts, circular cosmographical maps (Jambudvipa), and carved ivory relics before preparing for tomorrow's early climb.",
            "location": {
              "name": "Vishal Jain Museum",
              "lat": 21.512,
              "lng": 71.828
            },
            "time": "04:30 PM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Early sleep recommended for the 05:00 AM summit trek."
          }
        ]
      },
      {
        "_key": "pal-day2",
        "dayNumber": 2,
        "title": "Early Dawn Climb of Mount Shatrunjaya (3,800 Steps) & Marble Temples",
        "date": "2026-12-18",
        "summary": "Begin the sacred spiritual ascent of Mount Shatrunjaya at 05:00 AM before dawn. Climb 3,800 hand-hewn marble steps amidst chanting pilgrims to reach the mountain crest, home to 900+ intricately carved marble temples. Offer prayers at the Adishwar Temple, explore the Chaumukha Temple, and descend before midday.",
        "activities": [
          {
            "_key": "pal2a",
            "title": "Dawn Ascent of Mount Shatrunjaya (3,800 Steps)",
            "description": "Begin the climb at 05:00 AM in cool morning air with walking sticks or doli (palanquin) option for senior citizens, watching the sunrise over Shetrunji River.",
            "location": {
              "name": "Shatrunjaya Foothills Taleti",
              "lat": 21.508,
              "lng": 71.825
            },
            "time": "05:00 AM",
            "type": "activity",
            "cost": 800,
            "currency": "INR",
            "notes": "Takes 2 to 2.5 hours at a gentle pace. Wear comfortable walking shoes."
          },
          {
            "_key": "pal2b",
            "title": "Prayers & Marvel at Adishwar (Rishabhanatha) Temple",
            "description": "Enter the main temple courtyard crowned by soaring spires and marble columns adorned with diamond-eyed idols of the first Tirthankara Lord Adinath.",
            "location": {
              "name": "Shri Adishwar Temple Summit",
              "lat": 21.498,
              "lng": 71.808
            },
            "time": "08:00 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "One of the most sacred pilgrimage shrines in Jainism."
          },
          {
            "_key": "pal2c",
            "title": "Explore Chaumukha (Four-Faced) Temple & Summit Panorama",
            "description": "Walk between the high stone walls of the nine sacred temple enclosures (Tuks), marveling at over 900 marble spires glistening in the mountain sun.",
            "location": {
              "name": "Chaumukha Temple Tuk",
              "lat": 21.496,
              "lng": 71.806
            },
            "time": "10:00 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "No eating is permitted on the sacred mountain; descend before noon."
          },
          {
            "_key": "pal2d",
            "title": "Celebratory Satvik Gujarati Lunch at Taleti",
            "description": "Descend to the foothill base and enjoy a celebratory satvik feast with sweet lapsi, sprouted moong, phulkas, and fresh chaas.",
            "location": {
              "name": "Siddhachal Bhojanshala",
              "lat": 21.514,
              "lng": 71.829
            },
            "time": "01:00 PM",
            "type": "food",
            "cost": 250,
            "currency": "INR",
            "notes": "Soul-satisfying meal after completing the 7,600 total steps round-trip."
          }
        ]
      },
      {
        "_key": "pal-day3",
        "dayNumber": 3,
        "title": "Hastagiri Tirth → Bhavnagar Heritage & Return Flight / Train",
        "date": "2026-12-19",
        "summary": "Visit the peaceful hilltop shrine of Hastagiri overlooking the Shetrunji River dam, drive to historic Bhavnagar to visit the 1894 Barton Library and Nilambag Palace, and board your afternoon flight or train back to Mumbai or Pune.",
        "activities": [
          {
            "_key": "pal3a",
            "title": "Morning Excursion to Hastagiri Hill Tirth",
            "description": "Drive 15 km to Hastagiri hill for magnificent views of the sacred Shatrunjaya peak across the waters of the Shetrunji River reservoir.",
            "location": {
              "name": "Hastagiri Jain Tirth",
              "lat": 21.46,
              "lng": 71.745
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Unbelievably tranquil hilltop with breeze and bird calls."
          },
          {
            "_key": "pal3b",
            "title": "Visit Historic Nilambag Palace & Barton Library Bhavnagar",
            "description": "Tour the 1859 heritage Nilambag Palace hotel and the Victorian Gothic Barton Library in Bhavnagar city.",
            "location": {
              "name": "Nilambag Palace Bhavnagar",
              "lat": 21.764,
              "lng": 72.146
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 150,
            "currency": "INR",
            "notes": "Excellent royal architecture and heritage photographs."
          },
          {
            "_key": "pal3c",
            "title": "Transfer to Bhavnagar Airport (BHU) / Railway Station & Return",
            "description": "Direct flight to Mumbai (BOM) or Pune (PNQ), or board the Bandra Terminus Express back home.",
            "location": {
              "name": "Bhavnagar Airport Terminal",
              "lat": 21.7519,
              "lng": 72.1852
            },
            "time": "02:30 PM",
            "type": "transport",
            "cost": 3800,
            "currency": "INR",
            "notes": "Depart with spiritual fulfillment from Shatrunjaya's heights."
          }
        ]
      }
    ]
  },

  {
    "_id": "trip-varanasi-ayodhya-prayagraj-5-days",
    "title": "Varanasi, Ayodhya & Prayagraj Sacred Triangle — 5 Days from Mumbai / Pune",
    "slug": "varanasi-ayodhya-prayagraj-5-days",
    "excerpt": "Embark on an inspiring 5-day spiritual pilgrimage through India's holiest Gangetic triangle — from the eternal ghats, Kashi Vishwanath Jyotirlinga, and divine evening Maha Aarti of Varanasi (Kashi), to the sacred Triveni Sangam holy dip and reclining Hanuman in Prayagraj, culminating in the grand new Shri Ram Janmabhoomi Mandir and serene Saryu Aarti in Ayodhya. Curated with direct flights from Mumbai/Pune, verified riverside stays, and authentic satvik cuisine.",
    "tags": [
      "Pilgrimage",
      "Spiritual",
      "Varanasi",
      "Ayodhya",
      "Prayagraj",
      "Ganga Aarti",
      "Temples",
      "Heritage",
      "Culture",
      "North India"
    ],
    "country": "India",
    "startDate": "2026-10-20",
    "endDate": "2026-10-24",
    "bestSuggestedMonth": "October – March (Crisp 12°C–25°C, sacred festival season)",
    "status": "published",
    "viewCount": 0,
    "totalBudget": 22500,
    "currency": "INR",
    "tripType": "Sacred Pilgrimage & Temple Circuit",
    "readingTime": 9,
    "_createdAt": "2026-09-08T00:00:00Z",
    "_updatedAt": "2026-09-08T00:00:00Z",
    "itinerary": [
      {
        "_key": "vap-day1",
        "dayNumber": 1,
        "title": "Mumbai/Pune → Varanasi Airport (VNS) → Dashashwamedh Ghat Evening Maha Aarti",
        "date": "2026-10-20",
        "summary": "Board a direct morning flight from Mumbai (BOM) or Pune (PNQ) to Varanasi's Lal Bahadur Shastri Airport (VNS). Transfer to your riverside heritage haveli on the ghats. Enjoy authentic Banarasi Tamatar Chaat at Godowlia before embarking on a private sunset Bajra boat cruise to witness the world-renowned Dashashwamedh Ghat Ganga Maha Aarti.",
        "activities": [
          {
            "_key": "vap1a",
            "title": "Direct Morning Flight Mumbai / Pune to Varanasi (VNS)",
            "description": "Fly direct from Mumbai (BOM) or Pune (PNQ) to Varanasi Airport (~2 hrs 10 mins). Meet your private pre-booked chauffeur at the arrival gate.",
            "location": {
              "name": "Lal Bahadur Shastri International Airport Varanasi",
              "lat": 25.4524,
              "lng": 82.8593
            },
            "time": "10:30 AM",
            "type": "transport",
            "cost": 6500,
            "currency": "INR",
            "notes": "Daily direct flights on IndiGo and Air India Express. Pre-arranged AC cab avoids airport touts."
          },
          {
            "_key": "vap1b",
            "title": "Check-in to BrijRama Palace / Riverside Heritage Haveli",
            "description": "Arrive at Rajghat/Darbhanga Ghat and take a traditional wooden boat transfer to check in to the 210-year-old palace hotel directly on the riverfront.",
            "location": {
              "name": "BrijRama Palace Varanasi",
              "lat": 25.3056,
              "lng": 83.0102
            },
            "time": "01:00 PM",
            "type": "accommodation",
            "cost": 8500,
            "currency": "INR",
            "notes": "Contact: +91-542-2450840. Uninterrupted view of the sacred Ganges from private stone balconies."
          },
          {
            "_key": "vap1c",
            "title": "Iconic Street Food Lunch at Kashi Chaat Bhandar",
            "description": "Walk to Godowlia Chowk to savor the world-famous piping hot Tamatar Chaat served in earthen kulhads, crispy Palak Patta Chaat, and Gulab Jamun.",
            "location": {
              "name": "Kashi Chaat Bhandar Godowlia",
              "lat": 25.3105,
              "lng": 83.0075
            },
            "time": "02:30 PM",
            "type": "food",
            "cost": 250,
            "currency": "INR",
            "notes": "Must-try Banaras specialty; uniquely spiced tomato puree with crispy namakpare."
          },
          {
            "_key": "vap1d",
            "title": "Sunset Bajra Boat Cruise across 84 Ghats",
            "description": "Board a hand-rowed wooden Bajra boat at Assi Ghat and glide down the river past ancient sandstone palaces, akhadas, and historic ghats as dusk sets in.",
            "location": {
              "name": "Assi Ghat to Dashashwamedh Riverfront",
              "lat": 25.2896,
              "lng": 83.0068
            },
            "time": "05:00 PM",
            "type": "activity",
            "cost": 1200,
            "currency": "INR",
            "notes": "MUST ATTEND: Experience the golden hour reflections of temples and thousands of floating marigold diyas."
          },
          {
            "_key": "vap1e",
            "title": "Dashashwamedh Ghat Evening Ganga Maha Aarti",
            "description": "Witness the grand ritual performed by saffron-clad Vedic priests holding multi-tiered brass lamps, amidst the ringing of bronze bells, blowing of conch shells, and Vedic chanting.",
            "location": {
              "name": "Dashashwamedh Ghat Varanasi",
              "lat": 25.3075,
              "lng": 83.0106
            },
            "time": "06:45 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "MUST ATTEND: The best vantage point is directly from your moored wooden boat on the river facing the ghat."
          }
        ]
      },
      {
        "_key": "vap-day2",
        "dayNumber": 2,
        "title": "Shri Kashi Vishwanath Jyotirlinga Dham → Heritage Lanes → Sarnath Excursion",
        "date": "2026-10-21",
        "summary": "Rise before dawn for the divine Sugam Darshan at Shri Kashi Vishwanath Jyotirlinga through the grand corridor. Explore Annapurna Mandir, Manikarnika Ghat, and historic Galis. After a breakfast of clay-pot Blue Lassi and Malai Toast, journey to Sarnath where Lord Buddha delivered his historic first sermon.",
        "activities": [
          {
            "_key": "vap2a",
            "title": "Shri Kashi Vishwanath Jyotirlinga Mangala Darshan",
            "description": "Enter via the new river corridor directly from the ghat to offer bilva leaves, holy Ganga jal, and milk to the golden-spired Vishweshwara Jyotirlinga.",
            "location": {
              "name": "Shri Kashi Vishwanath Temple",
              "lat": 25.3109,
              "lng": 83.0107
            },
            "time": "05:30 AM",
            "type": "sightseeing",
            "cost": 500,
            "currency": "INR",
            "notes": "MUST ATTEND: Book online Sugam Darshan ticket in advance to avoid 2-hour queue. Carry original ID."
          },
          {
            "_key": "vap2b",
            "title": "Maa Annapurna Mandir & Manikarnika Ghat Walk",
            "description": "Seek blessings for perpetual abundance at Maa Annapurna Temple, followed by a sober, philosophical walk past Manikarnika Ghat (the eternal Mahashamshan crematorium).",
            "location": {
              "name": "Manikarnika Ghat Varanasi",
              "lat": 25.3108,
              "lng": 83.0142
            },
            "time": "07:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Deeply reflective and sacred site where the eternal funeral fires have burned continuously for millennia."
          },
          {
            "_key": "vap2c",
            "title": "Breakfast: Blue Lassi Shop & Lakshmi Chai Toast",
            "description": "Relish hand-churned thick curd lassi with pomegranate, banana, and rabdi at the 1925 Blue Lassi shop, paired with white-butter malai toast and saffron kulhad chai.",
            "location": {
              "name": "Blue Lassi Shop Varanasi",
              "lat": 25.3115,
              "lng": 83.0125
            },
            "time": "09:00 AM",
            "type": "food",
            "cost": 200,
            "currency": "INR",
            "notes": "Located in the narrow heritage lanes near Manikarnika; loved by travelers worldwide."
          },
          {
            "_key": "vap2d",
            "title": "Excursion to Sarnath (Dhamek Stupa & Deer Park)",
            "description": "Drive 10 km north to Sarnath, the sacred deer park where Lord Buddha preached his first sermon (Dharmachakra Pravartana). Explore the massive 5th-century Dhamek Stupa and Mulagandhakuti Vihara.",
            "location": {
              "name": "Dhamek Stupa Sarnath",
              "lat": 25.3809,
              "lng": 83.0245
            },
            "time": "11:30 AM",
            "type": "sightseeing",
            "cost": 100,
            "currency": "INR",
            "notes": "MUST ATTEND: Meditate in the tranquil archaeological gardens. Visit Sarnath ASI Museum to see the original Ashoka Lion Capital."
          },
          {
            "_key": "vap2e",
            "title": "Satvik Feast at Shree Shivay Thali & Keshav Paan",
            "description": "Enjoy a grand multi-course pure satvik thali in Varanasi, concluding with an authentic melt-in-mouth Banarasi Maghai Meetha Paan at Keshav Tambool.",
            "location": {
              "name": "Shree Shivay Grand Thali",
              "lat": 25.315,
              "lng": 82.992
            },
            "time": "02:00 PM",
            "type": "food",
            "cost": 550,
            "currency": "INR",
            "notes": "Traditional Banarasi paan folded with gulkand, saunf, and silver vark without tobacco."
          }
        ]
      },
      {
        "_key": "vap-day3",
        "dayNumber": 3,
        "title": "Varanasi → Prayagraj (125 km / 2.5 hrs) → Triveni Sangam Sacred Snan & Bade Hanuman",
        "date": "2026-10-22",
        "summary": "Drive along the smooth 4-lane NH19 expressway to holy Prayagraj (Allahabad). Savor legendary Netram Desi Ghee Kachoris in Katra. Board an authorized motorboat to the sacred Triveni Sangam for a holy dip (Snan) where the Ganga, Yamuna, and invisible Saraswati converge. Seek blessings at the unique underground reclining Bade Hanuman Ji Mandir and visit the immortal Akshayavat tree.",
        "activities": [
          {
            "_key": "vap3a",
            "title": "Scenic Highway Drive to Prayagraj via NH19 (125 km)",
            "description": "Comfortable 2.5-hour AC cab ride across the fertile Gangetic plains via Gopiganj and Handia.",
            "location": {
              "name": "Varanasi-Prayagraj NH19 Expressway",
              "lat": 25.38,
              "lng": 82.45
            },
            "time": "08:00 AM",
            "type": "transport",
            "cost": 2800,
            "currency": "INR",
            "notes": "Clean highway dhabas and fuel plazas available en route."
          },
          {
            "_key": "vap3b",
            "title": "Legendary Kachori-Jalebi Breakfast at Netram Moolchand & Sons",
            "description": "Feast on crisp urad dal kachoris fried in pure cow desi ghee, spicy dum aloo, pumpkin sabzi, and thick malai jalebi in Katra bazaar since 1864.",
            "location": {
              "name": "Netram Moolchand & Sons Katra",
              "lat": 25.459,
              "lng": 81.854
            },
            "time": "10:45 AM",
            "type": "food",
            "cost": 200,
            "currency": "INR",
            "notes": "A cherished Prayag culinary tradition; eat warm straight from the kadai."
          },
          {
            "_key": "vap3c",
            "title": "Check-in to The Legend Hotel / Hotel Kanha Shyam",
            "description": "Check in to your boutique luxury hotel in Prayagraj's tree-lined Civil Lines.",
            "location": {
              "name": "The Legend Hotel Prayagraj",
              "lat": 25.4518,
              "lng": 81.834
            },
            "time": "11:45 AM",
            "type": "accommodation",
            "cost": 4200,
            "currency": "INR",
            "notes": "Contact: +91-532-2409999. Hotel concierge arranges private boat permits for Sangam."
          },
          {
            "_key": "vap3d",
            "title": "Triveni Sangam Boat Ride & Sacred Snan (Holy Confluence)",
            "description": "Board an authorized boat from Qila Ghat / Daraganj to the exact confluence where the greyish Ganga meets the deep greenish-blue Yamuna and mythical Saraswati. Take the auspicious holy dip on wooden platforms.",
            "location": {
              "name": "Triveni Sangam Prayagraj",
              "lat": 25.426,
              "lng": 81.8845
            },
            "time": "01:30 PM",
            "type": "activity",
            "cost": 800,
            "currency": "INR",
            "notes": "MUST ATTEND: The holy dip is believed to cleanse lifetimes of sins. Changing enclosures and lifejackets available on wooden platforms."
          },
          {
            "_key": "vap3e",
            "title": "Darshan at Reclining Bade Hanuman Ji Mandir (Bandhwa Wale)",
            "description": "Visit the revered subterranean temple housing a 20-foot monolithic red vermilion idol of Lord Hanuman in a unique reclining posture, flooded by Mother Ganga during monsoons.",
            "location": {
              "name": "Bade Hanuman Temple Prayagraj",
              "lat": 25.4285,
              "lng": 81.8795
            },
            "time": "03:45 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "MUST ATTEND: One-of-a-kind temple in India. Devotees offer red sindoor and boondi laddoos."
          },
          {
            "_key": "vap3f",
            "title": "Allahabad Fort, Patalpuri Temple & Akshayavat Banyan Tree",
            "description": "Explore the exterior bastions of the colossal 1583 Akbar Fort and visit Patalpuri underground temple and the immortal Akshayavat tree mentioned in ancient Puranas.",
            "location": {
              "name": "Akshayavat Tree & Patalpuri Temple",
              "lat": 25.429,
              "lng": 81.877
            },
            "time": "05:00 PM",
            "type": "sightseeing",
            "cost": 50,
            "currency": "INR",
            "notes": "Army perimeter pass managed easily at the entrance gate."
          }
        ]
      },
      {
        "_key": "vap-day4",
        "dayNumber": 4,
        "title": "Prayagraj → Ayodhya (165 km / 3.5 hrs) → Shri Ram Janmabhoomi Mandir & Saryu Aarti",
        "date": "2026-10-23",
        "summary": "Embark on a scenic drive along NH330 north to Ayodhya Dham, the birthplace of Lord Rama. Settle into The Ramayana Hotel. Seek blessings at the fortified Hanuman Garhi before having an unforgettable darshan of Ram Lalla at the grand newly consecrated Shri Ram Janmabhoomi Mandir. Visit Kanak Bhavan and witness the grand evening Saryu Maha Aarti and laser show at Ram Ki Paidi.",
        "activities": [
          {
            "_key": "vap4a",
            "title": "Highway Drive Prayagraj to Ayodhya via NH330 (165 km)",
            "description": "Smooth 3.5-hour AC drive through Pratapgarh and Sultanpur across rural Awadh countryside to reach Ayodhya Dham.",
            "location": {
              "name": "Prayagraj-Ayodhya Highway NH330",
              "lat": 26.2,
              "lng": 82
            },
            "time": "08:00 AM",
            "type": "transport",
            "cost": 3200,
            "currency": "INR",
            "notes": "Stop at Sultanpur bypass for fresh tea and Awadhi samosas."
          },
          {
            "_key": "vap4b",
            "title": "Check-in to The Ramayana Hotel Ayodhya",
            "description": "Check in to this premium luxury hotel just 10 minutes from the temple corridor, featuring Ramayana-themed decor and pure satvik dining.",
            "location": {
              "name": "The Ramayana Hotel Ayodhya",
              "lat": 26.782,
              "lng": 82.185
            },
            "time": "12:00 PM",
            "type": "accommodation",
            "cost": 6500,
            "currency": "INR",
            "notes": "Contact: +91-5278-297777. E-rickshaw transport and wheelchair access readily coordinated."
          },
          {
            "_key": "vap4c",
            "title": "Satvik Lunch at Ramprastha Restaurant / Kanak Rasoi",
            "description": "Relish hot Bedmi Poori with Aloo Jhol, Kadhi-Chawal, Paneer Makhani, and sweet Khoya Peda prepared fresh in temple style.",
            "location": {
              "name": "Ramprastha Dining Naya Ghat",
              "lat": 26.797,
              "lng": 82.202
            },
            "time": "01:15 PM",
            "type": "food",
            "cost": 400,
            "currency": "INR",
            "notes": "100% vegetarian, pure ghee satvik meal."
          },
          {
            "_key": "vap4d",
            "title": "Hanuman Garhi Fortress Darshan (76 Steps)",
            "description": "Ascend the 76 stone steps to the 10th-century fortress temple of Lord Hanuman who guards the city. According to tradition, one must take Hanuman Ji's permission before visiting Lord Rama.",
            "location": {
              "name": "Hanuman Garhi Temple Ayodhya",
              "lat": 26.793,
              "lng": 82.199
            },
            "time": "02:45 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "MUST ATTEND: Offer Besan Laddoos. The circular ramparts give sweeping views across the holy city."
          },
          {
            "_key": "vap4e",
            "title": "Shri Ram Janmabhoomi Mandir Darshan (Ram Lalla)",
            "description": "Pass through the ornamental Gopuram gates to the magnificent Nagara-style temple hand-carved from pink Bansi Paharpur sandstone. Experience the divine darshan of the 51-inch black granite Ram Lalla idol adorned with golden jewels.",
            "location": {
              "name": "Shri Ram Janmabhoomi Temple",
              "lat": 26.7956,
              "lng": 82.1944
            },
            "time": "04:15 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "MUST ATTEND: Free electronic lockers available for phones and leather belts. Dedicated fast-track pilgrim corridor with ramp facilities."
          },
          {
            "_key": "vap4f",
            "title": "Visit Kanak Bhavan (Golden Palace of Sita)",
            "description": "Explore the breathtaking temple palace gifted by Queen Kaikeyi to Sita upon her marriage to Rama, housing gold-crowned idols of Rama and Sita.",
            "location": {
              "name": "Kanak Bhavan Ayodhya",
              "lat": 26.7985,
              "lng": 82.1968
            },
            "time": "05:45 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Mesmerizing Bundelkhandi palace architecture with painted courtyards."
          },
          {
            "_key": "vap4g",
            "title": "Saryu River Evening Sandhya Aarti & Ram Ki Paidi Light Show",
            "description": "Gather at Ram Ki Paidi and Naya Ghat as the setting sun turns the Saryu waters gold. Watch the Vedic priests perform the grand Saryu Aarti followed by a high-tech musical laser fountain show narrating the Ramayana.",
            "location": {
              "name": "Ram Ki Paidi Saryu Ghat",
              "lat": 26.801,
              "lng": 82.2045
            },
            "time": "07:00 PM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "MUST ATTEND: Thousands of glowing oil lamps illuminate the riverfront steps creating an ethereal visual feast."
          }
        ]
      },
      {
        "_key": "vap-day5",
        "dayNumber": 5,
        "title": "Guptar Ghat Sunrise → Surya Kund → Ayodhya Airport (AYJ) → Mumbai / Pune",
        "date": "2026-10-24",
        "summary": "Start the day with tranquil sunrise prayers at Guptar Ghat on the Saryu River where Lord Rama concluded his earthly avatar. Visit Surya Kund and Nageshwarnath Temple. Savor hot Bedmi Puri and Rabdi Jalebi before boarding your direct afternoon flight from Ayodhya's new Maharishi Valmiki Airport back to Mumbai or Pune.",
        "activities": [
          {
            "_key": "vap5a",
            "title": "Sunrise Prayers & Boat Ride at Guptar Ghat",
            "description": "Visit the serene riverside ghat where Lord Rama entered the Saryu River for Jal Samadhi (Maha Prayan) to return to his heavenly abode of Vaikuntha.",
            "location": {
              "name": "Guptar Ghat Ayodhya Cantt",
              "lat": 26.786,
              "lng": 82.138
            },
            "time": "06:30 AM",
            "type": "sightseeing",
            "cost": 300,
            "currency": "INR",
            "notes": "Remarkably tranquil morning ambiance with gentle river breezes, far from crowds."
          },
          {
            "_key": "vap5b",
            "title": "Visit Historic Surya Kund & Nageshwarnath Mandir",
            "description": "Visit the expansive Sun temple reservoir renovated with ancient stone chhatris, and Nageshwarnath Temple established by Rama's son Kush.",
            "location": {
              "name": "Surya Kund Ayodhya",
              "lat": 26.765,
              "lng": 82.162
            },
            "time": "08:30 AM",
            "type": "sightseeing",
            "cost": 0,
            "currency": "INR",
            "notes": "Surya Kund features 52 ghat steps and stunning manicured heritage gardens."
          },
          {
            "_key": "vap5c",
            "title": "Farewell Breakfast & Souvenir Shopping",
            "description": "Relish steaming Rabdi-Jalebi, Samosas, and Kulhad Chai. Pick up Ayodhya Khoya Peda sweets and Ramcharitmanas scripture souvenirs for home.",
            "location": {
              "name": "Naya Ghat Market Ayodhya",
              "lat": 26.799,
              "lng": 82.203
            },
            "time": "10:00 AM",
            "type": "food",
            "cost": 350,
            "currency": "INR",
            "notes": "Authentic souvenirs: brass puja lamps, wooden Ram Mandir models, and sacred Tulsi malas."
          },
          {
            "_key": "vap5d",
            "title": "Transfer to Ayodhya Maharishi Valmiki Airport (AYJ) & Return Flight",
            "description": "Short 15-minute cab ride to the newly inaugurated Ayodhya Airport for direct flight back home to Mumbai (BOM) or Pune (PNQ).",
            "location": {
              "name": "Maharishi Valmiki International Airport Ayodhya",
              "lat": 26.745,
              "lng": 82.155
            },
            "time": "12:30 PM",
            "type": "transport",
            "cost": 6200,
            "currency": "INR",
            "notes": "Direct flights to Mumbai (IndiGo 6E / Air India Express, ~2h 15m). Carry blessed prasad and timeless spiritual memories."
          }
        ]
      }
    ]
  },
];
