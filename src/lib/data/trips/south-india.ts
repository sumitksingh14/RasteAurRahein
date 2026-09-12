import type { Trip } from "@/lib/types";

/**
 * South India — Kerala, Karnataka, Tamil Nadu
 * 2 trips
 *
 * ── Adding a new trip ──────────────────────────────────────────
 * 1. Append a new trip object to the array below.
 * 2. Add its slug → region mapping in src/lib/regions.ts (TRIP_REGION_MAP).
 * That's it — it appears everywhere automatically.
 */
export const SOUTH_INDIA_TRIPS: Trip[] = [
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
];
