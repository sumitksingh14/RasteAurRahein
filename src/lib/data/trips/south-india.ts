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

  // ── 3. Vazhachal & Athirappilly Falls, Kerala ─────────────────────────
  {
    _id: "trip-vazhachal-falls-3-days",
    title: "Vazhachal & Athirappilly Falls — Rainforest Waterfalls of Chalakudy",
    slug: "vazhachal-falls-3-days",
    excerpt:
      "Journey from Mumbai/Pune into the lush Western Ghats rainforest canopy along the Chalakudy River. Experience the roaring cascades of Athirappilly and Vazhachal, Charpa falls, hornbill sightings, and pristine Sholayar jungle corridors in 3 days.",
    tags: [
      "Waterfalls",
      "Kerala",
      "South India",
      "Rainforest",
      "Nature",
      "Chalakudy",
      "Athirappilly",
      "Vazhachal",
      "Western Ghats",
      "Road Trip",
      "Monsoon",
    ],
    country: "India",
    bestSuggestedMonth: "June – January",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Road Trip",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "vzh-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Kochi → Chalakudy & Thumboormuzhy Butterfly Garden",
        summary:
          "Board an early direct flight from Mumbai (BOM) or Pune (PNQ) to Kochi (COK, 1h 50m). Pick up your self-drive rental or private cab directly from Kochi Airport. Athirappilly is just 42 km (1 hr 15 min) away via NH-544 and the Chalakudy river road. Check in to your cliffside rainforest resort and explore the hanging bridge at Thumboormuzhy.",
        activities: [
          {
            _key: "vzh1a",
            title: "Direct Flight Mumbai/Pune → Kochi Airport (COK)",
            description:
              "Take an early morning flight arriving into Kochi before 10:00 AM. Kochi Airport is conveniently located in Nedumbassery on the northern outskirts, saving city traffic.",
            location: { name: "Cochin International Airport (COK)", lat: 10.1518, lng: 76.393 },
            type: "transport",
          },
          {
            _key: "vzh1b",
            title: "Scenic Drive Kochi Airport → Chalakudy (~42 km, 1h 15m)",
            description:
              "Cruise through coconut palm groves and rubber plantations along the Chalakudy river basin towards the foothills of the Western Ghats.",
            location: { name: "Chalakudy River Road", lat: 10.307, lng: 76.333 },
            type: "transport",
          },
          {
            _key: "vzh1c",
            title: "Thumboormuzhy Dam, Hanging Bridge & Butterfly Park",
            description:
              "Walk across the 140-meter pedestrian suspension bridge swaying over the roaring Chalakudy river weir. Wander through the manicured butterfly park home to 148 species of endemic Western Ghats butterflies.",
            location: { name: "Thumboormuzhy Dam & Hanging Bridge", lat: 10.2917, lng: 76.4522 },
            type: "sightseeing",
          },
          {
            _key: "vzh1d",
            title: "Check-in to Rainforest Cliffside Resort & Balcony Sunset",
            description:
              "Check into your eco-resort overlooking the jungle gorge. Unwind on the balcony with steaming Kerala spiced tea listening to the distant thunder of cascading water.",
            location: { name: "Athirappilly Rainforest Retreat", lat: 10.318, lng: 76.453 },
            type: "accommodation",
          },
        ],
      },
      {
        _key: "vzh-d2",
        dayNumber: 2,
        title: "Athirappilly Cascades, Charpa Falls & Vazhachal Forest Rapids",
        summary:
          "Full day immersed in water and wilderness: trek to the base of the mighty 80-foot Athirappilly cascade, stop by roadside Charpa falls, explore the rushing rocky rapids and riparian forests of Vazhachal, and spot Malabar Pied Hornbills.",
        activities: [
          {
            _key: "vzh2a",
            title: "Athirappilly Falls Base Forest Trek",
            description:
              "Descend the stone pathway through moist deciduous forest to stand right at the churning foot of Kerala's largest waterfall, affectionately called the 'Niagara of India'. Feel the cool monsoon mist drench the gorge.",
            location: { name: "Athirappilly Waterfalls", lat: 10.316, lng: 76.451 },
            type: "sightseeing",
          },
          {
            _key: "vzh2b",
            title: "Charpa Falls Roadside Cascade",
            description:
              "Just 3 km ahead towards Vazhachal, Charpa falls plunges straight off the cliff right onto the bridge during monsoon months, spraying travelers crossing the road.",
            location: { name: "Charpa Falls", lat: 10.306, lng: 76.488 },
            type: "sightseeing",
          },
          {
            _key: "vzh2c",
            title: "Vazhachal Falls & Riparian Forest Walk",
            description:
              "Unlike the vertical plunge of Athirappilly, Vazhachal is a surging, horizontal torrent of foaming water rushing over inclined granite slabs. Walk along the shaded medicinal herb trail maintained by the Kerala Forest Department.",
            location: { name: "Vazhachal Waterfalls", lat: 10.2986, lng: 76.5414 },
            type: "activity",
          },
          {
            _key: "vzh2d",
            title: "Authentic Karimeen Pollichathu & Kappa Lunch",
            description:
              "Feast on freshwater pearl spot fish marinated in shallots and crushed peppercorns, slow-roasted inside a smoked banana leaf, paired with boiled tapioca and spicy fish gravy.",
            location: { name: "Athirappilly Riverside Dining", lat: 10.314, lng: 76.455 },
            type: "food",
          },
        ],
      },
      {
        _key: "vzh-d3",
        dayNumber: 3,
        title: "Sholayar Forest Drive → Chalakudy Spices → Return to Mumbai/Pune",
        summary:
          "Enjoy a morning birdwatching drive into the Sholayar Reserve Forest corridor towards Malakkappara. Shop for estate-fresh Tellicherry black pepper, cardamom, and fresh-fried hot banana chips in Chalakudy town before heading to Kochi Airport.",
        activities: [
          {
            _key: "vzh3a",
            title: "Morning Hornbill Trail in Sholayar Reserve",
            description:
              "Look out for all four South Indian hornbill species (Great Indian, Malabar Pied, Malabar Grey, and Indian Grey) nesting in the towering vatta and maruthu trees of the Sholayar jungle.",
            location: { name: "Sholayar Reserve Forest", lat: 10.312, lng: 76.784 },
            type: "activity",
          },
          {
            _key: "vzh3b",
            title: "Chalakudy Market Spice & Banana Chips Shopping",
            description:
              "Pick up freshly sliced Nendran banana chips fried in pure golden coconut oil right before your eyes, alongside single-origin green cardamom and whole cinnamon bark.",
            location: { name: "Chalakudy Market", lat: 10.3075, lng: 76.332 },
            type: "activity",
          },
          {
            _key: "vzh3c",
            title: "Transfer to Kochi Airport (COK) & Evening Flight",
            description:
              "Complete the easy 45-minute highway drive to Kochi Airport. Check in for your evening nonstop flight back to Mumbai or Pune.",
            location: { name: "Cochin International Airport (COK)", lat: 10.1518, lng: 76.393 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 4. Marari Beach, Kerala ──────────────────────────────────────────
  {
    _id: "trip-marari-beach-4-days",
    title: "Marari Beach — Untouristy Malabar Coast & Fishermen Hamlets",
    slug: "marari-beach-4-days",
    excerpt:
      "Escape to the peaceful silence of Mararikulam along Kerala's Malabar coast. Endless white powdery sands, leaning coconut groves, traditional coir-making village lanes, dawn fishing boat launches, and sunset Ayurvedic wellness just 90 minutes from Kochi.",
    tags: [
      "Beach",
      "Kerala",
      "South India",
      "Marari",
      "Coastal",
      "Relaxation",
      "Ayurveda",
      "Offbeat",
      "Village Tour",
      "Seafood",
    ],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Relaxation & Coastal",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "mrb-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Kochi → Mararikulam Beach Check-in",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Kochi (COK, 1h 50m). A smooth 68 km private taxi drive south via NH-66 brings you to the tranquil coastal village of Mararikulam in under two hours. Check in to your thatched eco-cottage and catch the sun dipping into the Arabian Sea.",
        activities: [
          {
            _key: "mrb1a",
            title: "Flight Mumbai/Pune → Kochi Airport (COK)",
            description:
              "Morning departure from Mumbai or Pune. Arrive at Kochi's solar-powered terminal and meet your pre-booked coastal cab.",
            location: { name: "Cochin International Airport (COK)", lat: 10.1518, lng: 76.393 },
            type: "transport",
          },
          {
            _key: "mrb1b",
            title: "Scenic Coastal Drive Kochi → Mararikulam (~68 km, 1.5h)",
            description:
              "Drive south along the palm-fringed coast road passing historic church spires, backwater lagoons, and lush green paddy fields.",
            location: { name: "NH-66 Coastal Highway", lat: 9.8, lng: 76.3 },
            type: "transport",
          },
          {
            _key: "mrb1c",
            title: "Check-in to Marari Beach Thatched Villa",
            description:
              "Settle into an eco-friendly thatched cottage nestled inside a private coconut plantation with open-air garden bathrooms and hammocks tied between palm trees.",
            location: { name: "Mararikulam North Beach", lat: 9.6019, lng: 76.2994 },
            type: "accommodation",
          },
          {
            _key: "mrb1d",
            title: "Golden Hour Beach Walk & Welcome Seafood Dinner",
            description:
              "Walk along the uncrowded white sand beach with no hawkers or jet skis. Dine on freshly grilled Tiger Prawns and coconut appams under the starlit sky.",
            location: { name: "Marari Beach Shore", lat: 9.601, lng: 76.2985 },
            type: "food",
          },
        ],
      },
      {
        _key: "mrb-d2",
        dayNumber: 2,
        title: "Dawn Fishermen Boat Launch, Coir Village Bicycle Tour & Ayurveda",
        summary:
          "Wake at 6:00 AM to watch the spectacle of village fishermen launching wooden country boats into the surf. Cycle through quiet village lanes to watch coir rope spinning, visit the ancient Shiva Temple, and indulge in an afternoon Ayurvedic massage.",
        activities: [
          {
            _key: "mrb2a",
            title: "Watch Dawn Traditional Fishing Net Hauling",
            description:
              "Witness local fishermen chant rhythmic boat songs as they push wooden catamarans through the breaking waves and haul in silver sardines and mackerel.",
            location: { name: "Marari Fishermen Cove", lat: 9.599, lng: 76.298 },
            type: "activity",
          },
          {
            _key: "mrb2b",
            title: "Village Bicycle Tour & Coir-Making Workshop",
            description:
              "Pedal through shaded village bylanes. Stop at traditional homesteads to see women soak coconut husks and spin golden coir fiber into resilient yarn on wooden spinning wheels.",
            location: { name: "Mararikulam Coir Village", lat: 9.598, lng: 76.31 },
            type: "activity",
          },
          {
            _key: "mrb2c",
            title: "Ancient Mararikulam Shiva Temple Visit",
            description:
              "Visit the centuries-old temple renowned for traditional Kerala pitched-roof wooden architecture, stone oil lamps, and tranquil temple pond.",
            location: { name: "Mararikulam Mahadeva Temple", lat: 9.605, lng: 76.305 },
            type: "sightseeing",
          },
          {
            _key: "mrb2d",
            title: "Rejuvenating Kerala Ayurvedic Abhyanga Massage",
            description:
              "Experience authentic therapeutic massage using warm medicated herbal oils infused with sesame, bala, and ashwagandha to melt away urban tension.",
            location: { name: "Marari Ayurvedic Wellness Center", lat: 9.6025, lng: 76.3 },
            type: "activity",
          },
        ],
      },
      {
        _key: "mrb-d3",
        dayNumber: 3,
        title: "Alleppey Backwater Shikara Day Trip & Village Canals",
        summary:
          "Take a short 16 km hop to Alleppey for a private, eco-friendly wooden Shikara boat ride gliding through narrow canals that houseboats cannot enter. Watch village life unfold on the waterways and enjoy a spicy duck roast lunch.",
        activities: [
          {
            _key: "mrb3a",
            title: "Drive Marari → Alleppey Backwaters (~16 km, 30m)",
            description:
              "Quick scenic hop south through Alappuzha town to the Punnamada backwater jetties.",
            location: { name: "Alleppey Boat Jetty", lat: 9.501, lng: 76.345 },
            type: "transport",
          },
          {
            _key: "mrb3b",
            title: "Private Shikara Canal Cruise in Kuttanad",
            description:
              "Glide silently through the palm-shaded narrow canals of Kuttanad, the 'Rice Bowl of Kerala', where paddy farming occurs up to 2 meters below sea level.",
            location: { name: "Kuttanad Canals", lat: 9.4981, lng: 76.3388 },
            type: "activity",
          },
          {
            _key: "mrb3c",
            title: "Traditional Toddy-Shop Style Seafood Feast",
            description:
              "Feast on spicy Alappuzha Crab Roast, duck mappas simmered in thick coconut milk, and flaky coin parottas at an authentic canalside dining spot.",
            location: { name: "Alleppey Canalside Diner", lat: 9.495, lng: 76.335 },
            type: "food",
          },
          {
            _key: "mrb3d",
            title: "Sunset Stroll on Alappuzha Colonial Pier",
            description:
              "Walk along the atmospheric 160-year-old sea bridge ruins and British colonial lighthouse before returning to Marari for the night.",
            location: { name: "Alappuzha Lighthouse & Pier", lat: 9.4925, lng: 76.318 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "mrb-d4",
        dayNumber: 4,
        title: "Morning Beach Yoga → Kochi Airport → Return to Mumbai/Pune",
        summary:
          "Begin with sunrise yoga on the tranquil sands of Marari. Pick up handloom Kasavu saris and cold-pressed organic coconut oil before the 68 km transfer back to Kochi Airport for your evening flight home.",
        activities: [
          {
            _key: "mrb4a",
            title: "Sunrise Beach Yoga & Coconut Water",
            description:
              "Gentle yoga stretches on the quiet shoreline followed by fresh sweet tender coconut water cut directly from the trees.",
            location: { name: "Marari Beach Front", lat: 9.6019, lng: 76.2994 },
            type: "activity",
          },
          {
            _key: "mrb4b",
            title: "Mararikulam Local Souvenir Shopping",
            description:
              "Pick up hand-woven coir door mats, virgin cold-pressed coconut oil, and artisanal Kerala spices from local women's self-help co-operatives.",
            location: { name: "Mararikulam Craft Stalls", lat: 9.603, lng: 76.302 },
            type: "activity",
          },
          {
            _key: "mrb4c",
            title: "Drive to Kochi Airport & Return Flight",
            description:
              "Transfer to Cochin International Airport (COK) via the smooth NH-66 bypass and board your nonstop flight back to Mumbai or Pune.",
            location: { name: "Cochin International Airport (COK)", lat: 10.1518, lng: 76.393 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 5. Hogenakkal Falls, Tamil Nadu ──────────────────────────────────
  {
    _id: "trip-hogenakkal-falls-3-days",
    title: "Hogenakkal Falls — The Smoky Canyon & Parisal Boating",
    slug: "hogenakkal-falls-3-days",
    excerpt:
      "Known as the 'Niagara of India', Hogenakkal is where the mighty Kaveri River plunges into a sheer carbonatite rock canyon. Take thrilling circular coracle (parisal) boat rides into churning mist, experience natural herbal waterfall baths, and feast on fresh hot river fish fry.",
    tags: [
      "Waterfalls",
      "Tamil Nadu",
      "South India",
      "Kaveri River",
      "Adventure",
      "Coracle Boating",
      "Dharmapuri",
      "Canyon",
      "Food",
      "Offbeat",
    ],
    country: "India",
    bestSuggestedMonth: "July – February",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Adventure & Nature",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "hgn-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Bengaluru → Hosur & Dharmapuri → Hogenakkal",
        summary:
          "Catch an early flight from Mumbai (BOM) or Pune (PNQ) to Bengaluru Airport (BLR, 1h 35m). Pick up a rental car or cab and drive 150 km south via Hosur and Dharmapuri (3.5 hours) down the scenic Kaveri valley to Hogenakkal. Check into TTDC Hotel Tamil Nadu and view the smoky mist rising from the gorge at sunset.",
        activities: [
          {
            _key: "hgn1a",
            title: "Direct Flight Mumbai/Pune → Bengaluru Airport (BLR)",
            description:
              "Early flight landing into Bengaluru by 8:30 AM. Exit straight onto the Outer Ring Road avoiding central Bangalore city jams.",
            location: { name: "Kempegowda International Airport (BLR)", lat: 13.1986, lng: 77.7066 },
            type: "transport",
          },
          {
            _key: "hgn1b",
            title: "Road Trip Bengaluru → Hogenakkal (~150 km, 3.5h)",
            description:
              "Drive along NH-44 through Hosur, Krishnagiri, and Pennagaram. The final 20 km winds through scenic deciduous scrub forest and mango groves.",
            location: { name: "Pennagaram - Hogenakkal Ghat Road", lat: 12.135, lng: 77.82 },
            type: "transport",
          },
          {
            _key: "hgn1c",
            title: "Check-in to TTDC Hotel Tamil Nadu Hogenakkal",
            description:
              "Check into the government tourist bungalow situated right beside the falls access pathways and coracle boarding point.",
            location: { name: "Hotel Tamil Nadu Hogenakkal", lat: 12.1188, lng: 77.7766 },
            type: "accommodation",
          },
          {
            _key: "hgn1d",
            title: "Sunset from the Hogenakkal View Tower",
            description:
              "Climb the observation watchtower as the sun casts an amber glow across the Kaveri river canyon and the smoky spray that gives Hogenakkal ('Smoky Rock') its name.",
            location: { name: "Hogenakkal Watch Tower", lat: 12.1195, lng: 77.775 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "hgn-d2",
        dayNumber: 2,
        title: "Parisal (Coracle) Boating, Herbal River Bath & Fresh Fish Fry",
        summary:
          "The signature Hogenakkal experience: board a traditional round wickerwork coracle steered by skilled boatmen right under the roaring curtain of water. Enjoy an invigorating herbal oil massage, bathe in the river cascades, and eat freshly fried Kaveri fish.",
        activities: [
          {
            _key: "hgn2a",
            title: "Parisal (Coracle) Boat Ride in the Kaveri Gorge",
            description:
              "Board circular bamboo coracles coated in water-resistant resin. The boatman spins the craft playfully on whirlpools and maneuvers right beneath churning waterfalls into hidden rock alcoves.",
            location: { name: "Hogenakkal Coracle Boarding Point", lat: 12.115, lng: 77.774 },
            type: "activity",
          },
          {
            _key: "hgn2b",
            title: "Herbal Oil River Massage & Natural Cascade Bathing",
            description:
              "Local masseurs apply warm sesame and herbal oils infused with 18 forest herbs, followed by a natural high-pressure hydromassage beneath the refreshing mineral-rich falls of the Kaveri.",
            location: { name: "Hogenakkal Bathing Ghats", lat: 12.116, lng: 77.7755 },
            type: "activity",
          },
          {
            _key: "hgn2c",
            title: "Riverside Hot Fish Fry Feast on the Rocks",
            description:
              "Choose fresh catch from the river—Kendai, Rohu, or Katla. Local women marinate the fish in crushed red chillies, ginger, and curry leaves and pan-fry it crisp on wood-fired tawas.",
            location: { name: "Hogenakkal Fish Stalls", lat: 12.1175, lng: 77.776 },
            type: "food",
          },
          {
            _key: "hgn2d",
            title: "Crocodile Rehabilitation Center & Melagiri Hills",
            description:
              "Visit the Tamil Nadu Forest Department crocodile conservation sanctuary housing Mugger crocodiles, followed by an evening drive towards the Melagiri hill ridge viewpoints.",
            location: { name: "Crocodile Park Hogenakkal", lat: 12.122, lng: 77.78 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "hgn-d3",
        dayNumber: 3,
        title: "Hanging Bridge Walk → Pennagaram Mango Groves → Return via BLR",
        summary:
          "Cross the Hogenakkal pedestrian suspension bridge for breathtaking aerial views of the entire canyon. Sample famous Dharmapuri mango halwa in Pennagaram before driving back to Bengaluru Airport for your flight to Mumbai/Pune.",
        activities: [
          {
            _key: "hgn3a",
            title: "Hogenakkal Suspension Hanging Bridge Morning Walk",
            description:
              "Walk across the steel suspension bridge spanning the turbulent Kaveri gorge, watching coracles dotting the emerald waters below in the morning mist.",
            location: { name: "Hogenakkal Hanging Bridge", lat: 12.117, lng: 77.775 },
            type: "sightseeing",
          },
          {
            _key: "hgn3b",
            title: "Pennagaram Mango Halwa & Filter Coffee Stop",
            description:
              "Stop in the bustling agricultural town of Pennagaram to taste delicious slow-cooked mango halwa made with local Alphonso and Totapuri pulp.",
            location: { name: "Pennagaram Bazaar", lat: 12.138, lng: 77.886 },
            type: "food",
          },
          {
            _key: "hgn3c",
            title: "Drive to Bengaluru Airport (BLR) & Evening Flight",
            description:
              "Smooth 3.5-hour drive via Krishnagiri and Hosur directly to Bengaluru Airport for your return flight to Mumbai or Pune.",
            location: { name: "Kempegowda International Airport (BLR)", lat: 13.1986, lng: 77.7066 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 6. Yercaud, Tamil Nadu ───────────────────────────────────────────
  {
    _id: "trip-yercaud-4-days",
    title: "Yercaud — The Jewel of Shevaroy Hills & Coffee Trails",
    slug: "yercaud-4-days",
    excerpt:
      "Escape to 1,515 meters in Tamil Nadu's Shevaroy range. Conquer 20 scenic hairpin bends to discover orange groves, century-old coffee plantations, the tranquil Emerald Lake, Lady's Seat cliff views, and the 90-meter drop of Killiyur Falls.",
    tags: [
      "Hill Station",
      "Tamil Nadu",
      "South India",
      "Yercaud",
      "Shevaroy Hills",
      "Coffee Plantations",
      "Waterfalls",
      "Offbeat",
      "Trekking",
      "Nature",
    ],
    country: "India",
    bestSuggestedMonth: "October – June",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Hill Station & Nature",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "yrc-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Bengaluru/Coimbatore → Salem → 20 Hairpins to Yercaud",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Bengaluru (BLR, 225 km to Yercaud) or Coimbatore (CJB, 195 km). Drive to Salem city and begin the thrilling climb up the 20 numbered hairpin bends of the Shevaroy Ghat Road. Check into your cliffside resort and take in the panoramic sunset from Lady's Seat.",
        activities: [
          {
            _key: "yrc1a",
            title: "Flight Mumbai/Pune → Bengaluru (BLR) or Coimbatore (CJB)",
            description:
              "Fly into Bengaluru or Coimbatore and hop into a pre-booked highway cab towards Salem on the smooth NH-44/NH-544 corridors.",
            location: { name: "Salem Junction Gateway", lat: 11.6643, lng: 78.146 },
            type: "transport",
          },
          {
            _key: "yrc1b",
            title: "Climb the 20 Hairpin Bends Shevaroy Ghat Road (~30 km, 45m)",
            description:
              "Ascend from 200m to 1,515m above sea level through dense silver oak forests and coffee undergrowth, negotiating 20 dramatic switchbacks with viewing bays.",
            location: { name: "Shevaroy Ghat Road Hairpins", lat: 11.75, lng: 78.18 },
            type: "transport",
          },
          {
            _key: "yrc1c",
            title: "Check-in to Valley-Facing Resort in Yercaud",
            description:
              "Check into your hilltop villa perched above the mountain rim. Enjoy crisp mountain air and sweeping views of the Salem valley below.",
            location: { name: "Yercaud Hill Resort", lat: 11.7753, lng: 78.2093 },
            type: "accommodation",
          },
          {
            _key: "yrc1d",
            title: "Sunset at Lady's Seat Viewpoint & Telescope House",
            description:
              "British women once gathered on this sheer natural rock cliff to view Salem's evening sunset. Peer through the telescope at the winding ghat road lights shining like a diamond necklace.",
            location: { name: "Lady's Seat Yercaud", lat: 11.769, lng: 78.206 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "yrc-d2",
        dayNumber: 2,
        title: "Emerald Lake Boating, Botanical Orchidarium & Pagoda Point",
        summary:
          "Spend a leisurely day around Yercaud's colonial heart: paddle boat on Emerald Lake, walk through the 3,000-variety National Orchidarium, explore the tribal stone towers at Pagoda Point, and dine at the quirky Sweet Rascal.",
        activities: [
          {
            _key: "yrc2a",
            title: "Pedal Boating on Yercaud Emerald Lake",
            description:
              "The centerpiece of Yercaud surrounded by manicured flower gardens, deer park, and tall conifers. Enjoy a quiet morning boat ride across the tranquil waters.",
            location: { name: "Yercaud Emerald Lake", lat: 11.778, lng: 78.211 },
            type: "activity",
          },
          {
            _key: "yrc2b",
            title: "National Orchidarium & Botanical Garden",
            description:
              "Operated by the Botanical Survey of India, this garden houses the famous Pitcher Plant (Nepenthes khasiana), Lady's Slipper orchids, and 30 endangered species found only in the Eastern Ghats.",
            location: { name: "National Orchidarium Yercaud", lat: 11.776, lng: 78.214 },
            type: "sightseeing",
          },
          {
            _key: "yrc2c",
            title: "Pagoda Point Eastern Vistas",
            description:
              "Four stone pyramid pillars built by local Malayali tribesmen adorn this cliff viewpoint, offering unobstructed views across the Attur valley and green mountain ranges.",
            location: { name: "Pagoda Point", lat: 11.772, lng: 78.232 },
            type: "sightseeing",
          },
          {
            _key: "yrc2d",
            title: "Dinner at the Famous Sweet Rascal",
            description:
              "Dine at this legendary reservation-only establishment run by warm host Rascal Dennis. Enjoy herb roast country chicken, shepherd's pie, and warm passion fruit crumble.",
            location: { name: "Sweet Rascal Restaurant", lat: 11.771, lng: 78.208 },
            type: "food",
          },
        ],
      },
      {
        _key: "yrc-d3",
        dayNumber: 3,
        title: "Killiyur Falls Trek, Shevaroyan Cave Temple & Coffee Estates",
        summary:
          "Hike down 300 stone steps through cardamom plantations to witness the 300-foot plunge of Killiyur Falls. Visit the highest point of the Shevaroy range at the cave temple of Lord Shevaroyan and tour an organic coffee estate.",
        activities: [
          {
            _key: "yrc3a",
            title: "Killiyur Falls Forest Trek (~2 km)",
            description:
              "A steep, rewarding trail through lush coffee bushes and tree ferns leading to the dramatic pool of Killiyur Falls, where water from the Yercaud lake cascades 90 meters down into the valley.",
            location: { name: "Killiyur Falls", lat: 11.792, lng: 78.203 },
            type: "activity",
          },
          {
            _key: "yrc3b",
            title: "Shevaroyan Cave Temple Summit (1,623 m)",
            description:
              "The highest point in the Shevaroy Hills. Crawl into the narrow, prehistoric rock cave temple dedicated to deity Shevaroyan and Goddess Kaveri, worshipped by 67 tribal villages.",
            location: { name: "Shevaroyan Temple Summit", lat: 11.831, lng: 78.228 },
            type: "sightseeing",
          },
          {
            _key: "yrc3c",
            title: "Guided Coffee & Orange Plantation Walk",
            description:
              "Walk under the canopy of shade trees hung with black pepper vines. Learn how Arabica and Robusta beans are hand-picked, pulped, and sun-dried alongside sweet mandarin orange trees.",
            location: { name: "Shevaroy Coffee Estate", lat: 11.785, lng: 78.215 },
            type: "activity",
          },
          {
            _key: "yrc3d",
            title: "Evening Campfire & Salem Mutton Biryani",
            description:
              "Unwind by a roaring bonfire under starlit mountain skies with a spread of authentic Salem Seeraga Samba mutton biryani and flaky parottas.",
            location: { name: "Resort Campfire Grounds", lat: 11.7753, lng: 78.2093 },
            type: "food",
          },
        ],
      },
      {
        _key: "yrc-d4",
        dayNumber: 4,
        title: "Tipperary Viewpoint → Salem Textile & Spices → Return Flight",
        summary:
          "Take an early morning stroll to Tipperary viewpoint for sweeping vistas of the southern plains. Pick up single-origin roasted coffee beans and clove-infused honey in Yercaud before descending the ghats for your return flight.",
        activities: [
          {
            _key: "yrc4a",
            title: "Tipperary Viewpoint Morning Walk",
            description:
              "Catch the first rays of the sun touching the red clay hillsides from Tipperary Colonial Estate, where British planters lived in the late 1800s.",
            location: { name: "Tipperary Viewpoint", lat: 11.765, lng: 78.204 },
            type: "sightseeing",
          },
          {
            _key: "yrc4b",
            title: "Shopping for Yercaud Coffee, Spices & Perfumes",
            description:
              "Stock up on freshly roasted Arabica coffee beans, pure eucalyptus oil, jackfruit chips, and raw forest blossom honey from local co-operatives.",
            location: { name: "Yercaud Market Square", lat: 11.778, lng: 78.21 },
            type: "activity",
          },
          {
            _key: "yrc4c",
            title: "Descent to Salem & Airport Transfer to BLR/CJB",
            description:
              "Descend the 20 hairpin bends and transfer via 4-lane highway to Bengaluru Airport (BLR) or Coimbatore (CJB) for your evening flight back to Mumbai or Pune.",
            location: { name: "Salem Highway Interchange", lat: 11.6643, lng: 78.146 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 7. Kolli Hills, Tamil Nadu ───────────────────────────────────────
  {
    _id: "trip-kolli-hills-3-days",
    title: "Kolli Hills — The 70 Hairpin Bends & Agaya Gangai Falls",
    slug: "kolli-hills-3-days",
    excerpt:
      "A mountain driver's holy grail in central Tamil Nadu. Tackle the legendary 70 consecutive hairpin bends up the 'Mountain of Death' to discover a peaceful tribal plateau, the roaring 300-foot Agaya Gangai waterfall, ancient Shiva sanctuaries, and sweet Queen pineapples.",
    tags: [
      "Road Trip",
      "Hairpin Bends",
      "Tamil Nadu",
      "South India",
      "Kolli Hills",
      "Agaya Gangai",
      "Adventure",
      "Trekking",
      "Waterfalls",
      "Offbeat",
    ],
    country: "India",
    bestSuggestedMonth: "August – February",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Road Trip & Adventure",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "klh-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Trichy/Coimbatore → The 70 Hairpins → Semmedu",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Tiruchirappalli (TRZ, 90 km to Kolli Hills) or Coimbatore (CJB, 170 km). Drive to Kalappanaickenpatti at the base of Kolli Hills. Negotiate the mind-boggling 70 continuous hairpin bends over 20 km to reach Semmedu plateau at 1,300 meters.",
        activities: [
          {
            _key: "klh1a",
            title: "Flight Mumbai/Pune → Tiruchirappalli (TRZ) or Coimbatore (CJB)",
            description:
              "Fly into Trichy (closest, 2.5h drive) or Coimbatore and take a rental car or sturdy taxi towards Namakkal district.",
            location: { name: "Tiruchirappalli International Airport (TRZ)", lat: 10.7654, lng: 78.7107 },
            type: "transport",
          },
          {
            _key: "klh1b",
            title: "Conquer the 70 Continuous Hairpin Bends (~20 km, 1h 15m)",
            description:
              "One of the most thrilling driving roads in Asia. 70 numbered hairpin switchbacks carved into sheer green cliffs, offering dizzying views as you climb from the plains into the clouds.",
            location: { name: "Kolli Hills 70 Hairpins Road", lat: 11.23, lng: 78.31 },
            type: "transport",
          },
          {
            _key: "klh1c",
            title: "Check-in to Silverline Retreat in Semmedu",
            description:
              "Check into your valley-view cottage in the mountain administrative capital of Semmedu. Sip steaming herbal tea prepared with wild mountain roots.",
            location: { name: "Silverline Retreat Semmedu", lat: 11.2484, lng: 78.3387 },
            type: "accommodation",
          },
          {
            _key: "klh1d",
            title: "Dinner with Kolli Nattu Kozhi Varuval & Parotta",
            description:
              "Feast on authentic free-range mountain country chicken tossed with black peppercorns, shallots, and fresh curry leaves, paired with flaky hot parottas.",
            location: { name: "Semmedu Local Mess", lat: 11.249, lng: 78.3395 },
            type: "food",
          },
        ],
      },
      {
        _key: "klh-d2",
        dayNumber: 2,
        title: "Arapaleeswarar Temple & The 1,025 Steps to Agaya Gangai Falls",
        summary:
          "Morning worship at the 1,000-year-old Chola-era Arapaleeswarar Shiva Temple. Then tackle the legendary endurance trek down 1,025 steep stone steps into the deep gorge where the 300-foot Agaya Gangai ('Ganges of the Sky') waterfall plunges into the Aiyaru River.",
        activities: [
          {
            _key: "klh2a",
            title: "Arapaleeswarar Shiva Temple Darshan",
            description:
              "Ancient temple dating to the 1st century Sangam literature. Observe the sacred golden fish in the adjoining Panchanathi river stream.",
            location: { name: "Arapaleeswarar Temple", lat: 11.282, lng: 78.351 },
            type: "sightseeing",
          },
          {
            _key: "klh2b",
            title: "The 1,025 Steps Descent to Agaya Gangai Falls",
            description:
              "Hike down the steep iron and stone staircase into the forested abyss. The 300-foot vertical cascade crashes against massive boulders with ferocious deafening spray.",
            location: { name: "Agaya Gangai Waterfalls", lat: 11.285, lng: 78.353 },
            type: "activity",
          },
          {
            _key: "klh2c",
            title: "Refuel with Sweet Kolli Hills Queen Pineapples",
            description:
              "After climbing back up the 1,000 steps, replenish energy with slices of intensely sweet, low-acid Kolli Hills Queen pineapples sprinkled with rock salt and red chilli powder.",
            location: { name: "Temple Steps Fruit Stalls", lat: 11.283, lng: 78.3515 },
            type: "food",
          },
          {
            _key: "klh2d",
            title: "Seekuparai & Selur Viewpoints Sunset",
            description:
              "Drive out to the Seekuparai observation deck overlooking the rolling jungle valleys and watch eagles soar below your eye level.",
            location: { name: "Seekuparai Viewpoint", lat: 11.258, lng: 78.319 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "klh-d3",
        dayNumber: 3,
        title: "Tampcol Medicinal Herbal Farm → Descent → Return to Mumbai/Pune",
        summary:
          "Visit the state medicinal plant research farm producing Ayurvedic elixirs, stop at the gentle Masila Falls, and descend the 70 hairpins in daylight before driving to Trichy or Coimbatore for your return flight.",
        activities: [
          {
            _key: "klh3a",
            title: "Tampcol Medicinal Farm & Masila Falls",
            description:
              "Kolli Hills is revered in Siddha medicine for magical healing herbs. Tour the medicinal botanical garden and take a refreshing dip in the gentle multi-tiered Masila Falls.",
            location: { name: "Masila Falls & Tampcol", lat: 11.291, lng: 78.361 },
            type: "sightseeing",
          },
          {
            _key: "klh3b",
            title: "Daylight Descent of the 70 Hairpin Bends",
            description:
              "Enjoy driving down the 70 hairpins in clear morning light, stopping at Turn #35 and Turn #22 for breathtaking photos of the serpentine highway.",
            location: { name: "70 Hairpins View Bay", lat: 11.228, lng: 78.305 },
            type: "activity",
          },
          {
            _key: "klh3c",
            title: "Drive to Trichy (TRZ) & Evening Flight to Mumbai/Pune",
            description:
              "Head to Tiruchirappalli Airport (90 km, 2.5h) via Namakkal and catch your evening flight back to Mumbai or Pune.",
            location: { name: "Tiruchirappalli International Airport (TRZ)", lat: 10.7654, lng: 78.7107 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 8. Chettinad, Tamil Nadu ─────────────────────────────────────────
  {
    _id: "trip-chettinad-4-days",
    title: "Chettinad — Palatial Mansions, Athangudi Tiles & Heritage Feasts",
    slug: "chettinad-4-days",
    excerpt:
      "Enter the grand realm of the Nattukottai Chettiars. Explore 19th-century merchant palaces built with Burmese teak, Italian marble, and Belgian glass; watch artisans handcraft vibrant Athangudi tiles; and indulge in legendary 7-course fiery Chettinad banana leaf feasts.",
    tags: [
      "Heritage",
      "Palaces",
      "Architecture",
      "Tamil Nadu",
      "South India",
      "Chettinad",
      "Karaikudi",
      "Food",
      "Culture",
      "Artisan",
    ],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Heritage & Culinary",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "cht-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Madurai/Trichy → Kanadukathan Palace Check-in",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Madurai (IXM, 88 km to Karaikudi) or Tiruchirappalli (TRZ, 85 km). A 1.5-hour highway drive brings you into the royal heritage village of Kanadukathan. Check in to a restored 110-year-old Chettiar mansion and enjoy your first authentic banana leaf dinner.",
        activities: [
          {
            _key: "cht1a",
            title: "Direct Flight Mumbai/Pune → Madurai (IXM) or Trichy (TRZ)",
            description:
              "Morning departure landing before noon into Madurai or Trichy airport. Both airports offer seamless 1.5-hour four-lane highway drives to Chettinad.",
            location: { name: "Madurai Airport (IXM)", lat: 9.8345, lng: 78.0934 },
            type: "transport",
          },
          {
            _key: "cht1b",
            title: "Highway Drive to Kanadukathan / Karaikudi (~85 km, 1.5h)",
            description:
              "Drive through the rural heart of Sivaganga district, entering village streets lined with towering fortress-like merchant mansions.",
            location: { name: "Kanadukathan Heritage Village", lat: 10.138, lng: 78.784 },
            type: "transport",
          },
          {
            _key: "cht1c",
            title: "Check-in to a 110-Year-Old Restored Chettiar Palace",
            description:
              "Marvel at towering carved Burmese teak pillars, Belgian crystal chandeliers, Italian Carrara marble floors, and open-to-sky central courtyards.",
            location: { name: "Chidambara Vilas / Visalam", lat: 10.0714, lng: 78.7838 },
            type: "accommodation",
          },
          {
            _key: "cht1d",
            title: "Welcome Chettinad Banana Leaf Feast",
            description:
              "Savor freshly ground pepper chicken, Kola Urundai (spiced minced meatballs), tangy tamarind fish curry, and Kavuni Arisi black rice sweet on a traditional plantain leaf.",
            location: { name: "Chettinad Heritage Dining Room", lat: 10.072, lng: 78.7845 },
            type: "food",
          },
        ],
      },
      {
        _key: "cht-d2",
        dayNumber: 2,
        title: "Kanadukathan Mansions, Athangudi Tile Factory & Cotton Weaving",
        summary:
          "Immerse yourself in Chettinad's unparalleled craftsmanship: walk through the opulent Chettinad Palace, witness master artisans cast colorful patterned tiles by hand in Athangudi village, and watch Kandangi cotton saris woven on pit looms.",
        activities: [
          {
            _key: "cht2a",
            title: "Chettinad Palace & Aayiram Jannal Veedu Walking Tour",
            description:
              "Explore the grandeur of Chettinad Palace built in 1912 by Raja Sir Annamalai Chettiar, and visit the famous 'Mansion of 1,000 Windows' with monumental teak gateways.",
            location: { name: "Chettinad Palace, Kanadukathan", lat: 10.1385, lng: 78.7845 },
            type: "sightseeing",
          },
          {
            _key: "cht2b",
            title: "Athangudi Handmade Tile Workshops",
            description:
              "Visit the artisan village of Athangudi where craftsmen pour vibrant mineral pigments into brass stencils over glass sheets to make timeless, mirror-polished floor tiles.",
            location: { name: "Athangudi Tile Factory", lat: 10.165, lng: 78.802 },
            type: "activity",
          },
          {
            _key: "cht2c",
            title: "Chettinad Cotton (Kandangi) Sari Weaving",
            description:
              "Observe master weavers at their pit looms threading vibrant turmeric-yellow, brick-red, and earthy mustard Kandangi saris worn by Chettiar women for over 250 years.",
            location: { name: "Kadiapatti Weaving Center", lat: 10.145, lng: 78.77 },
            type: "activity",
          },
          {
            _key: "cht2d",
            title: "Evening Vellai Paniyaram & Kai Murukku Tasting",
            description:
              "Crisp melt-in-the-mouth white rice paniyarams served with fiery red tomato chutney and hand-twisted crunchy Kai Murukku.",
            location: { name: "Kanadukathan Street Food Stalls", lat: 10.139, lng: 78.785 },
            type: "food",
          },
        ],
      },
      {
        _key: "cht-d3",
        dayNumber: 3,
        title: "Karaikudi Antique Market, Thirumayam Fort & The Bangala Kitchen",
        summary:
          "Hunt for royal heirlooms in Karaikudi's famous Muneeswaran antique bazaar, explore the 9th-century rock-cut fort of Thirumayam, and experience the world-famous culinary excellence of The Bangala.",
        activities: [
          {
            _key: "cht3a",
            title: "Karaikudi Antique Bazaar Treasure Hunt",
            description:
              "Wander through dusty antique alleys stocked with treasures sold by erstwhile merchant families: vintage Burmese lacquerware, Swedish enamel pots, brass urlis, and Tanjore paintings.",
            location: { name: "Karaikudi Antique Market", lat: 10.068, lng: 78.775 },
            type: "activity",
          },
          {
            _key: "cht3b",
            title: "Thirumayam Rock Fort & Cave Temples",
            description:
              "Ascend the imposing 17th-century bastion built by the Raja of Ramnad atop a massive granite monolith, housing ancient rock-cut cave shrines dedicated to Vishnu and Shiva.",
            location: { name: "Thirumayam Fort", lat: 10.248, lng: 78.752 },
            type: "sightseeing",
          },
          {
            _key: "cht3c",
            title: "Culinary Masterclass & Lunch at The Bangala",
            description:
              "Dine at the internationally celebrated manor of cookbook author Meenakshi Meyyappan. Savor legendary recipes prepared without commercial spice packets using traditional stone ammi kal grinders.",
            location: { name: "The Bangala Karaikudi", lat: 10.065, lng: 78.78 },
            type: "food",
          },
          {
            _key: "cht3d",
            title: "Sunset Bullock Cart Ride through Village Groves",
            description:
              "Enjoy an unhurried wooden bullock cart ride past village lotus ponds, terracotta horse shrines (Aiyanar kovils), and silent country verandas.",
            location: { name: "Chettinad Rural Trail", lat: 10.14, lng: 78.782 },
            type: "activity",
          },
        ],
      },
      {
        _key: "cht-d4",
        dayNumber: 4,
        title: "Kottaiyur Mansions → Madurai Meenakshi Temple → Return Flight",
        summary:
          "Take a final morning walk through the quiet palatial streets of Kottaiyur. Stop at the monumental Madurai Meenakshi Temple before your evening flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "cht4a",
            title: "Morning Walk in Kottaiyur Palace Street",
            description:
              "Admire the grand pastel facades, baroque parapets, and Greek-goddess statues blending European architecture with Dravidian traditions.",
            location: { name: "Kottaiyur Heritage Street", lat: 10.11, lng: 78.795 },
            type: "sightseeing",
          },
          {
            _key: "cht4b",
            title: "Drive to Madurai & Meenakshi Amman Temple Darshan",
            description:
              "Drive 1.5 hours to Madurai. Marvel at the 14 soaring gopurams of the Meenakshi Amman Temple, intricately sculpted with thousands of vibrant mythical deities.",
            location: { name: "Meenakshi Amman Temple, Madurai", lat: 9.9195, lng: 78.1193 },
            type: "sightseeing",
          },
          {
            _key: "cht4c",
            title: "Return Flight to Mumbai/Pune from Madurai (IXM)",
            description:
              "Head to Madurai Airport (IXM) for your direct evening flight back to Mumbai or Pune, carrying memories of royal Chettiar hospitality.",
            location: { name: "Madurai Airport (IXM)", lat: 9.8345, lng: 78.0934 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 9. Dhanushkodi & Rameswaram, Tamil Nadu ───────────────────────────
  {
    _id: "trip-dhanushkodi-4-days",
    title: "Dhanushkodi & Rameswaram — Ghost Town at Ocean's Edge",
    slug: "dhanushkodi-4-days",
    excerpt:
      "Journey to the southernmost edge of India where the Bay of Bengal meets the Indian Ocean. Cross the engineering marvel of Pamban Sea Bridge, explore the evocative submerged ruins of the 1964 cyclone ghost town of Dhanushkodi, stand at Arichal Munai, and bathe in the sacred 22 Theerthams.",
    tags: [
      "Heritage",
      "Coastline",
      "Tamil Nadu",
      "South India",
      "Dhanushkodi",
      "Rameswaram",
      "Ghost Town",
      "Pamban Bridge",
      "Pilgrimage",
      "Offbeat",
    ],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Heritage & Coastal",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "dhk-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Madurai → Cross Pamban Sea Bridge → Rameswaram",
        summary:
          "Take an early flight from Mumbai (BOM) or Pune (PNQ) to Madurai (IXM, 2 hours). Drive 165 km eastward along NH-87 to Mandapam and cross the awe-inspiring 2 km Pamban Sea Bridge over the open ocean to reach Rameswaram Island. Check in to your coastal hotel and watch the sunset at Agni Theertham.",
        activities: [
          {
            _key: "dhk1a",
            title: "Flight Mumbai/Pune → Madurai Airport (IXM)",
            description:
              "Morning departure landing into Madurai before 11:00 AM. Meet your coastal tour driver and head towards the Gulf of Mannar.",
            location: { name: "Madurai Airport (IXM)", lat: 9.8345, lng: 78.0934 },
            type: "transport",
          },
          {
            _key: "dhk1b",
            title: "Cross the Legendary Pamban Sea Bridge (~2 km)",
            description:
              "Drive across the historic road bridge running parallel to the 1914 railway cantilever bridge. Watch the turquoise sea churn underneath as cargo ships pass through the shipping channel.",
            location: { name: "Pamban Sea Bridge", lat: 9.28, lng: 79.2 },
            type: "transport",
          },
          {
            _key: "dhk1c",
            title: "Check-in to Coastal Hotel in Rameswaram",
            description:
              "Check into your hotel in Rameswaram town, just minutes away from the sacred seaside temples and the eastern marine highway.",
            location: { name: "Rameswaram Island Stay", lat: 9.2876, lng: 79.3129 },
            type: "accommodation",
          },
          {
            _key: "dhk1d",
            title: "Sunset at Agni Theertham & Evening Aarti",
            description:
              "Walk along the calm seashore where thousands of oil lamps float on the gentle waves as the temple conch shells blow in the dusk breeze.",
            location: { name: "Agni Theertham Beach", lat: 9.2885, lng: 79.318 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "dhk-d2",
        dayNumber: 2,
        title: "The Marine Highway to Dhanushkodi Ghost Town & Arichal Munai",
        summary:
          "Drive the dramatic marine road flanked by the ocean on both sides into the ghost town of Dhanushkodi, destroyed in the tragic 1964 super-cyclone. Explore the skeletal brick ruins of the church, railway station, and post office, and stand at Arichal Munai where two oceans collide.",
        activities: [
          {
            _key: "dhk2a",
            title: "Drive the Dramatic Marine Highway (~18 km)",
            description:
              "A mesmerizing highway built atop a narrow strip of white sand flanked by the roaring, deep blue Bay of Bengal on the left and the serene, turquoise Indian Ocean on the right.",
            location: { name: "Dhanushkodi Marine Highway", lat: 9.21, lng: 79.38 },
            type: "transport",
          },
          {
            _key: "dhk2b",
            title: "Explore the Submerged Ruins of Dhanushkodi",
            description:
              "Walk through the eerie, atmospheric ruins of the 1964 cyclone: the Gothic church arches, the old railway station platform, the water tank, and the colonial post office half-buried in pristine white beach sand.",
            location: { name: "Dhanushkodi Ghost Town Ruins", lat: 9.1775, lng: 79.4144 },
            type: "sightseeing",
          },
          {
            _key: "dhk2c",
            title: "Stand at Arichal Munai (India's Land's End)",
            description:
              "The Ashoka Pillar at Arichal Munai marks the southernmost tip of the sandspit. On clear days, Sri Lanka's Talaimannar coastline is just 24 km across the shallow coral sandbars of Rama's Bridge (Adam's Bridge).",
            location: { name: "Arichal Munai Tip", lat: 9.155, lng: 79.435 },
            type: "sightseeing",
          },
          {
            _key: "dhk2d",
            title: "Freshly Fried Seer Fish & Crab Lunch on the Beach",
            description:
              "Savor freshly caught Vanjaram (Seer Fish) and baby crabs pan-fried in hot coconut oil by local fisherfolk right on the sandspit.",
            location: { name: "Dhanushkodi Beach Stalls", lat: 9.17, lng: 79.41 },
            type: "food",
          },
        ],
      },
      {
        _key: "dhk-d3",
        dayNumber: 3,
        title: "Ramanathaswamy Temple Corridor, 22 Theerthams & Kalam Memorial",
        summary:
          "Experience the spiritual heart of Rameswaram: bathe in the 22 sacred well theerthams, walk the longest pillared corridor in the world inside Ramanathaswamy Temple, visit the national memorial of Dr. APJ Abdul Kalam, and explore Kothandaramaswamy Temple.",
        activities: [
          {
            _key: "dhk3a",
            title: "Ramanathaswamy Temple & The Longest Pillared Corridor",
            description:
              "Walk along the magnificent 1,212 carved sandstone pillars spanning over 1.2 kilometers. Bathe in the 22 holy wells (Theerthams), each with distinct mineral temperatures and healing properties.",
            location: { name: "Ramanathaswamy Temple", lat: 9.288, lng: 79.317 },
            type: "sightseeing",
          },
          {
            _key: "dhk3b",
            title: "Kothandaramaswamy Temple in the Sea Lagoon",
            description:
              "The sole surviving 500-year-old temple that completely escaped the 1964 cyclone, surrounded by shallow azure sea waters where Rama is said to have performed Vibhishana's coronation.",
            location: { name: "Kothandaramaswamy Temple", lat: 9.231, lng: 79.378 },
            type: "sightseeing",
          },
          {
            _key: "dhk3c",
            title: "Dr. APJ Abdul Kalam National Memorial",
            description:
              "Pay homage to India's beloved 'People's President' at his beautifully designed memorial showcasing his childhood in Rameswaram, missile research, and inspirational manuscripts.",
            location: { name: "Dr. APJ Abdul Kalam Memorial", lat: 9.294, lng: 79.295 },
            type: "sightseeing",
          },
          {
            _key: "dhk3d",
            title: "Pure Satvik South Indian Thali Dinner",
            description:
              "Enjoy an unlimited traditional South Indian feast with sambar, rasam, kootu, payasam, and frothy filter coffee served on fresh plantain leaves.",
            location: { name: "Hotel Guru Rameswaram", lat: 9.287, lng: 79.313 },
            type: "food",
          },
        ],
      },
      {
        _key: "dhk-d4",
        dayNumber: 4,
        title: "Olaikuda Coral Coast → Return via Pamban → Madurai Flight",
        summary:
          "Spend a peaceful morning walking along the quiet coral beach of Olaikuda. Drive across the Pamban bridge for your return highway trip to Madurai Airport for your flight to Mumbai or Pune.",
        activities: [
          {
            _key: "dhk4a",
            title: "Morning Coral Walk at Olaikuda Beach",
            description:
              "Explore the tranquil northern shoreline where gentle tides lap over dead coral beds and local catamarans prepare for offshore diving.",
            location: { name: "Olaikuda Beach", lat: 9.308, lng: 79.33 },
            type: "activity",
          },
          {
            _key: "dhk4b",
            title: "Scenic Return Drive Across Pamban to Madurai (~165 km, 3.5h)",
            description:
              "Re-cross the Pamban Sea Bridge and drive smoothly along the 4-lane NH-87 corridor through Ramanathapuram and Paramakudi.",
            location: { name: "NH-87 Madurai-Rameswaram Road", lat: 9.55, lng: 78.7 },
            type: "transport",
          },
          {
            _key: "dhk4c",
            title: "Evening Flight from Madurai (IXM) to Mumbai/Pune",
            description:
              "Arrive at Madurai Airport for your nonstop flight back to Mumbai or Pune.",
            location: { name: "Madurai Airport (IXM)", lat: 9.8345, lng: 78.0934 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 10. Valparai, Tamil Nadu ─────────────────────────────────────────
  {
    _id: "trip-valparai-4-days",
    title: "Valparai — 40 Hairpins, Rainforest Plateau & Anamalai Tea Estates",
    slug: "valparai-4-days",
    excerpt:
      "Climb 3,500 feet into the Anamalai Tiger Reserve via 40 dramatic hairpin bends. Discover an emerald plateau of century-old British tea estates, endangered Lion-tailed Macaques, the massive Sholayar Dam, and natural river swimming pools in 4 days from Mumbai/Pune.",
    tags: [
      "Hill Station",
      "Tea Estates",
      "Tamil Nadu",
      "South India",
      "Valparai",
      "Anamalai",
      "Wildlife",
      "40 Hairpins",
      "Waterfalls",
      "Offbeat",
    ],
    country: "India",
    bestSuggestedMonth: "September – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Hill Station & Wildlife",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "vlp-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Coimbatore → Pollachi → 40 Hairpins to Valparai",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Coimbatore (CJB, 1h 45m). Drive 40 km to Pollachi and enter the Anamalai Tiger Reserve checkpost. Ascend the legendary 40 numbered Hairpin Bends through cloud-kissed rain forests, spotting Nilgiri Tahr near Carver Marsh, to reach Valparai plateau (1,050m). Check in to a heritage British planter bungalow.",
        activities: [
          {
            _key: "vlp1a",
            title: "Direct Flight Mumbai/Pune → Coimbatore Airport (CJB)",
            description:
              "Take a morning flight landing into Coimbatore before 10:30 AM. Pick up your self-drive SUV or private taxi from the airport.",
            location: { name: "Coimbatore International Airport (CJB)", lat: 11.0298, lng: 77.0434 },
            type: "transport",
          },
          {
            _key: "vlp1b",
            title: "Ascend the Famous 40 Hairpin Bends Road (~65 km, 2.5h)",
            description:
              "A magnificent mountain drive passing Aliyar Dam and ascending through tropical evergreen rainforests. Look out for the endangered Nilgiri Tahr clambering on granite cliffs near Hairpin #9.",
            location: { name: "40 Hairpin Bends Anamalai", lat: 10.45, lng: 76.98 },
            type: "transport",
          },
          {
            _key: "vlp1c",
            title: "Check-in to a British Colonial Tea Planter Bungalow",
            description:
              "Check into a 100-year-old stone bungalow set in the middle of rolling tea carpets with wooden fireplaces, high ceilings, and personal butler service.",
            location: { name: "Briar / Sinna Dorai Bungalow", lat: 10.3263, lng: 76.9554 },
            type: "accommodation",
          },
          {
            _key: "vlp1d",
            title: "Veranda Sunset & Fireside Kongu Chicken Dinner",
            description:
              "Sip hot estate-grown orange pekoe tea on the veranda as dusk falls over the Sholayar range. Dine on spicy Kongu country chicken and flaky parottas by the fireplace.",
            location: { name: "Planter Bungalow Dining Room", lat: 10.325, lng: 76.954 },
            type: "food",
          },
        ],
      },
      {
        _key: "vlp-d2",
        dayNumber: 2,
        title: "Lion-Tailed Macaque Trail, Sholayar Dam & Koolangal River",
        summary:
          "Spend the day encountering Valparai's unique wildlife and pristine waters: spot endangered Lion-tailed Macaques in the forest canopy, marvel at the colossal Sholayar Dam (second deepest in Asia), and take a natural freshwater dip in Koolangal River.",
        activities: [
          {
            _key: "vlp2a",
            title: "Lion-Tailed Macaque Canopy Sighting Trail",
            description:
              "Valparai is the premier global stronghold of the rare Lion-tailed Macaque. Watch family troops forage for wild figs and seeds in the canopies of Puduthotam Estate.",
            location: { name: "Puduthotam Macaque Canopy", lat: 10.34, lng: 76.945 },
            type: "activity",
          },
          {
            _key: "vlp2b",
            title: "Sholayar Dam Mega Reservoir (Second Deepest in Asia)",
            description:
              "Drive 20 km through misty tea hills to the colossal Sholayar Dam built across the Chalakudy river system. Admire the vast blue water expanse framed by dense jungle hills.",
            location: { name: "Upper Sholayar Dam", lat: 10.3, lng: 76.75 },
            type: "sightseeing",
          },
          {
            _key: "vlp2c",
            title: "Fresh Parotta & Pepper Chicken Lunch in Valparai Town",
            description:
              "Relish hot multi-layered Kerala parottas with rich pepper chicken gravy and refreshing lime soda at the popular Green Hill restaurant in town.",
            location: { name: "Green Hill Restaurant Valparai", lat: 10.327, lng: 76.956 },
            type: "food",
          },
          {
            _key: "vlp2d",
            title: "Natural Swimming Dip in Koolangal River",
            description:
              "A serene, crystal-clear pebble-bed river flowing through tea estates with gentle natural pools ideal for dipping your feet or taking a refreshing mountain swim.",
            location: { name: "Koolangal River Bathing Spot", lat: 10.315, lng: 76.938 },
            type: "activity",
          },
        ],
      },
      {
        _key: "vlp-d3",
        dayNumber: 3,
        title: "Nallamudi Poonjolai Sunrise, Waterfall Tea Factory & Balaji Temple",
        summary:
          "Catch an unforgettable sunrise over the 1,000-meter drop into Kerala's wilderness at Nallamudi Poonjolai viewpoint. Take a guided tea-making factory tour at Waterfall Estate, and visit the secluded Balaji Temple nestled in tea bushes.",
        activities: [
          {
            _key: "vlp3a",
            title: "Sunrise at Nallamudi Poonjolai Viewpoint",
            description:
              "Walk through a narrow tea trail to a sheer precipice overlooking the deep rainforest ravines of Kerala's Sholayar river, where multiple waterfalls tumble into the abyss.",
            location: { name: "Nallamudi Poonjolai", lat: 10.285, lng: 76.985 },
            type: "sightseeing",
          },
          {
            _key: "vlp3b",
            title: "Waterfall Estate Historic Tea Factory Tour",
            description:
              "Witness the century-old process of turning freshly plucked two-leaves-and-a-bud into aromatic CTC and orthodox black tea through withering, rolling, fermenting, and drying.",
            location: { name: "Waterfall Tea Factory", lat: 10.35, lng: 76.96 },
            type: "activity",
          },
          {
            _key: "vlp3c",
            title: "Karumalai Balaji Temple inside Tea Gardens",
            description:
              "A tranquil temple dedicated to Lord Venkateswara set amidst manicured private tea hills. Absolute peace with vehicles prohibited for the final kilometer.",
            location: { name: "Karumalai Balaji Temple", lat: 10.352, lng: 76.912 },
            type: "sightseeing",
          },
          {
            _key: "vlp3d",
            title: "Planter Afternoon High Tea & Hornbill Watching",
            description:
              "Indulge in warm buttery scones with homemade strawberry jam and fresh cream while looking out for the massive Great Indian Hornbill swooping between silver oaks.",
            location: { name: "Planter Tea Veranda", lat: 10.3263, lng: 76.9554 },
            type: "food",
          },
        ],
      },
      {
        _key: "vlp-d4",
        dayNumber: 4,
        title: "Aliyar Dam Foothills → Coimbatore Airport → Return to Mumbai/Pune",
        summary:
          "Begin with morning birdwatching, descend the 40 hairpin bends with panoramic views over Aliyar reservoir, stop for garden walks, and transfer to Coimbatore Airport for your evening flight home.",
        activities: [
          {
            _key: "vlp4a",
            title: "Morning Wildlife Birdwatching Drive",
            description:
              "Spot emerald doves, Malabar whistling thrushes, and Indian gaur grazing alongside the estate borders before beginning the descent.",
            location: { name: "Valparai Estate Roads", lat: 10.33, lng: 76.95 },
            type: "activity",
          },
          {
            _key: "vlp4b",
            title: "Descend 40 Hairpins & Aliyar Dam Park",
            description:
              "Enjoy the sweeping views of the plains on your descent down the 40 hairpins. Stop at Aliyar Dam park for coconut water and fresh mountain jackfruit.",
            location: { name: "Aliyar Dam & Park", lat: 10.482, lng: 76.972 },
            type: "sightseeing",
          },
          {
            _key: "vlp4c",
            title: "Drive to Coimbatore Airport (CJB) & Return Flight",
            description:
              "Complete the 105 km drive to Coimbatore International Airport (CJB) for your nonstop flight back to Mumbai or Pune.",
            location: { name: "Coimbatore International Airport (CJB)", lat: 11.0298, lng: 77.0434 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 11. Vagamon, Kerala ──────────────────────────────────────────────
  {
    _id: "trip-vagamon-3-days",
    title: "Vagamon — Misty Meadows, Pine Forests & Kurisumala Trails",
    slug: "vagamon-3-days",
    excerpt:
      "Escape to 1,100 meters on the borders of Idukki and Kottayam. Experience rolling velvet green meadows (Motta Kunnukal), towering Scottish pine forests, misty pilgrim hillocks, tea estates, and cascading Marmala waterfalls in 3 days from Mumbai/Pune.",
    tags: [
      "Hill Station",
      "Kerala",
      "South India",
      "Vagamon",
      "Pine Forest",
      "Meadows",
      "Waterfalls",
      "Trekking",
      "Offbeat",
      "Nature",
    ],
    country: "India",
    bestSuggestedMonth: "September – May",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Hill Station & Nature",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "vgm-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Kochi → Pala & Erattupetta → Vagamon Pine Woods",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Kochi (COK, 1h 50m). Take a rental car or taxi directly from Kochi Airport and drive 95 km (2.5 hours) via Pala and Erattupetta, climbing up the winding green Western Ghats slopes into Vagamon at 1,100 meters. Walk through the towering Scottish pine forest and catch the sunset at Thangal Para.",
        activities: [
          {
            _key: "vgm1a",
            title: "Flight Mumbai/Pune → Kochi Airport (COK)",
            description:
              "Morning departure landing into Kochi before 10:00 AM. Meet your driver and exit via the eastern highway toward Kottayam/Idukki.",
            location: { name: "Cochin International Airport (COK)", lat: 10.1518, lng: 76.393 },
            type: "transport",
          },
          {
            _key: "vgm1b",
            title: "Scenic Hill Drive Kochi → Vagamon (~95 km, 2.5h)",
            description:
              "A picturesque drive passing rubber plantations of Pala and the steep ghat bends of Erattupetta and Teekoy with misty mountain views.",
            location: { name: "Erattupetta - Vagamon Ghat Road", lat: 9.68, lng: 76.85 },
            type: "transport",
          },
          {
            _key: "vgm1c",
            title: "Stroll Through the Vagamon Pine Forest",
            description:
              "Wander through towering rows of Scottish pine trees planted during the British colonial era. The pine needle carpet and whistling mountain breeze create an enchanting woodland ambiance.",
            location: { name: "Vagamon Pine Forest", lat: 9.682, lng: 76.901 },
            type: "activity",
          },
          {
            _key: "vgm1d",
            title: "Check-in to Misty Resort & Thangal Para Sunset",
            description:
              "Check into your cliffside villa and drive 4 km to Thangal Para, a colossal spherical rock resting precariously on a mountain ridge offering 360-degree sunset vistas.",
            location: { name: "Thangal Para, Vagamon", lat: 9.684, lng: 76.885 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "vgm-d2",
        dayNumber: 2,
        title: "Vagamon Green Meadows, Kurisumala Dairy Farm & Marmala Falls",
        summary:
          "Explore the iconic rolling velvet mounds of Vagamon Meadows (Motta Kunnukal), visit the peaceful Trappist monks' dairy farm at Kurisumala Ashram, and take an exhilarating Jeep trek to the deep rock pool of Marmala Waterfall.",
        activities: [
          {
            _key: "vgm2a",
            title: "Walk Across Vagamon Green Meadows (Motta Kunnukal)",
            description:
              "Endless wave-like mounds of soft green velvet grass without a single tree, surrounded by a peaceful lake. Run along the breezy hill crests and watch paragliders soar above.",
            location: { name: "Vagamon Meadows", lat: 9.691, lng: 76.908 },
            type: "sightseeing",
          },
          {
            _key: "vgm2b",
            title: "Kurisumala Ashram & Silent Dairy Farm Trek",
            description:
              "Hike up the quiet wooded hill to Kurisumala monastery, founded in 1958 blending Christian Benedictine spirituality with Indian ashram traditions. Visit their Jersey cow dairy farm producing organic ghee and milk.",
            location: { name: "Kurisumala Ashram", lat: 9.669, lng: 76.888 },
            type: "activity",
          },
          {
            _key: "vgm2c",
            title: "Jeep Trail to Marmala Waterfall & Natural Pool Dip",
            description:
              "A rugged 4WD descent through rubber and pepper estates leading to the 200-foot Marmala cascade crashing into an emerald rock lagoon, shrouded in thick forest canopy.",
            location: { name: "Marmala Waterfall", lat: 9.712, lng: 76.852 },
            type: "sightseeing",
          },
          {
            _key: "vgm2d",
            title: "Dinner with Kerala Duck Roast & Appam",
            description:
              "Feast on tender duck roast simmered in caramelized shallots, crushed black pepper, and thick coconut milk, paired with hot lacy appams.",
            location: { name: "Vagamon Hill Restaurant", lat: 9.687, lng: 76.906 },
            type: "food",
          },
        ],
      },
      {
        _key: "vgm-d3",
        dayNumber: 3,
        title: "Moon Mala (Suicide Point) → Tea Estate Spices → Return Flight",
        summary:
          "Catch the sunrise from Moon Mala overlooking deep ravines and tea valleys. Buy single-origin tea flushes and Idukki green cardamom before descending to Kochi Airport for your flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "vgm3a",
            title: "Sunrise at Moon Mala (Suicide Point)",
            description:
              "A breath-taking cliff ledge dropping vertically thousands of feet into the Cumbum valley of Tamil Nadu, blanketed in morning cloud inversions.",
            location: { name: "Moon Mala Viewpoint", lat: 9.675, lng: 76.912 },
            type: "sightseeing",
          },
          {
            _key: "vgm3b",
            title: "Vagamon Highland Tea & Spices Shopping",
            description:
              "Pick up freshly packed high-altitude orthodox tea from local estate outlets alongside wild cinnamon, cloves, and homemade dark chocolates.",
            location: { name: "Vagamon Tea Outlet", lat: 9.686, lng: 76.905 },
            type: "activity",
          },
          {
            _key: "vgm3c",
            title: "Drive to Kochi Airport (COK) & Return Flight",
            description:
              "Smooth 2.5-hour descent through Pala directly to Kochi Airport for your nonstop evening flight back to Mumbai or Pune.",
            location: { name: "Cochin International Airport (COK)", lat: 10.1518, lng: 76.393 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 12. Gavi, Kerala ─────────────────────────────────────────────────
  {
    _id: "trip-gavi-3-days",
    title: "Gavi — Untamed Evergreen Rainforest & Periyar Lake Safari",
    slug: "gavi-3-days",
    excerpt:
      "Venture deep into the core evergreen wilderness of Periyar Tiger Reserve. Tackle a 28 km unpaved forest jeep safari, row across silent Gavi lake surrounded by wild elephants, trek with tribal guides to Sabarimala viewpoints, and stay inside the KFDC Green Mansions eco-lodge in 3 days from Mumbai/Pune.",
    tags: [
      "Wildlife",
      "Jungle Safari",
      "Kerala",
      "South India",
      "Gavi",
      "Periyar",
      "Eco Tourism",
      "Elephants",
      "Offbeat",
      "Adventure",
    ],
    country: "India",
    bestSuggestedMonth: "September – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Wildlife & Eco-Tourism",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "gvi-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Kochi/Madurai → Kumily → 4WD Safari into Gavi",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Kochi (COK, 165 km to Kumily) or Madurai (IXM, 170 km). Drive to Kumily/Vandiperiyar at the gateway to Periyar Tiger Reserve. Board your pre-booked Kerala Forest Development Corporation (KFDC) 4x4 Jeep through the Vallakkadavu checkpost. The 28 km unpaved jungle track crosses deep evergreen canopies and elephant corridors to reach Gavi lake.",
        activities: [
          {
            _key: "gvi1a",
            title: "Flight Mumbai/Pune → Kochi (COK) or Madurai (IXM)",
            description:
              "Fly into Kochi or Madurai and take a scenic mountain taxi through tea and cardamom plantations to Kumily/Vandiperiyar.",
            location: { name: "Kumily / Thekkady Gateway", lat: 9.605, lng: 77.168 },
            type: "transport",
          },
          {
            _key: "gvi1b",
            title: "Vallakkadavu Forest Checkpost & 4WD Safari (~28 km, 1.5h)",
            description:
              "Enter the restricted Periyar Tiger Reserve corridor. Drive through dense tropical rainforests, frequently spotting wild gaur (Indian bison), sambar deer, and troops of lion-tailed macaques.",
            location: { name: "Vallakkadavu Forest Gate", lat: 9.55, lng: 77.12 },
            type: "transport",
          },
          {
            _key: "gvi1c",
            title: "Check-in to KFDC Green Mansions Jungle Eco-Lodge",
            description:
              "Check into the government eco-lodge situated right on the tranquil shores of Gavi lake. Unwind with fresh herbal tea on the open-air wooden deck.",
            location: { name: "KFDC Green Mansions, Gavi", lat: 9.4389, lng: 77.1658 },
            type: "accommodation",
          },
          {
            _key: "gvi1d",
            title: "Sunset Row Boating on Silent Gavi Lake",
            description:
              "Row across the glass-still waters of Gavi lake in traditional rowing boats. Watch wild elephant herds emerge from the bamboo thickets onto the water's edge at twilight.",
            location: { name: "Gavi Lake Boating Deck", lat: 9.4395, lng: 77.1662 },
            type: "activity",
          },
        ],
      },
      {
        _key: "gvi-d2",
        dayNumber: 2,
        title: "Deep Jungle Trek, Sabarimala Viewpoint & Cardamom Curing Mill",
        summary:
          "Full day immersed in primary rainforest: embark on a 3-hour guided walking safari with local tribal trackers, view the sacred golden roof of Sabarimala temple across the misty ravine, explore the colonial cardamom plantation, and see Meenar dam.",
        activities: [
          {
            _key: "gvi2a",
            title: "Guided Elephant Tracking Forest Trek (~6 km)",
            description:
              "Trek with licensed tribal naturalists along animal paths under giant 100-foot rainforest canopies. Learn to identify elephant footprints, tiger scrape marks, and medicinal lichen.",
            location: { name: "Gavi Forest Core Zone", lat: 9.435, lng: 77.16 },
            type: "activity",
          },
          {
            _key: "gvi2b",
            title: "Sabarimala Viewpoint Cliff",
            description:
              "Stand on an elevated forest ridge overlooking the sacred Sabarimala hill shrine and the dense Pamba river valley nestled amidst endless emerald mountains.",
            location: { name: "Sabarimala Viewpoint Gavi", lat: 9.425, lng: 77.142 },
            type: "sightseeing",
          },
          {
            _key: "gvi2c",
            title: "Colonial Cardamom Processing Plant & Meenar Dam",
            description:
              "Visit the historic cardamom curing factory powered by mountain streams, followed by an afternoon drive to Meenar and Kochupamba dams where wild otters play in the shallows.",
            location: { name: "Meenar Dam & Cardamom Factory", lat: 9.451, lng: 77.175 },
            type: "sightseeing",
          },
          {
            _key: "gvi2d",
            title: "Campfire & Jungle Naturalist Storytelling",
            description:
              "Gather around a warm campfire under a canopy of stars listening to forest guards recount thrilling encounters with tigers and solitary wild tuskers.",
            location: { name: "Green Mansions Campfire Grounds", lat: 9.4389, lng: 77.1658 },
            type: "food",
          },
        ],
      },
      {
        _key: "gvi-d3",
        dayNumber: 3,
        title: "Sunrise Birdwatching → Thekkady Spices → Return Flight",
        summary:
          "Dawn birdwatching session spotting the endangered Nilgiri Tahr and Great Pied Hornbill. Take the morning 4WD safari back to Vandiperiyar gate, explore Thekkady's famous spice market, and drive to the airport for your return flight.",
        activities: [
          {
            _key: "gvi3a",
            title: "Sunrise Birdwatching & Canopy Walk",
            description:
              "Spot rare avian species including the Malabar Trogon, Emerald Dove, White-bellied Blue Flycatcher, and the colossal Great Indian Hornbill feeding on wild figs.",
            location: { name: "Gavi Canopy Trail", lat: 9.44, lng: 77.168 },
            type: "activity",
          },
          {
            _key: "gvi3b",
            title: "4WD Return Safari & Thekkady Spice Bazaars",
            description:
              "Exit the forest reserve back to Vandiperiyar and Kumily. Shop for export-grade green cardamom pods, Tellicherry black pepper, and pure vanilla beans.",
            location: { name: "Kumily Spice Market", lat: 9.608, lng: 77.169 },
            type: "activity",
          },
          {
            _key: "gvi3c",
            title: "Drive to Kochi (COK) or Madurai (IXM) & Return Flight",
            description:
              "Transfer along the smooth 4-lane highway to Kochi Airport (COK) or Madurai Airport (IXM) for your evening nonstop flight back to Mumbai or Pune.",
            location: { name: "Cochin International Airport (COK)", lat: 10.1518, lng: 76.393 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 13. Chembra Peak, Kerala ─────────────────────────────────────────
  {
    _id: "trip-chembra-peak-3-days",
    title: "Chembra Peak — The Heart-Shaped Lake & Wayanad Cloud Trek",
    slug: "chembra-peak-3-days",
    excerpt:
      "Summit the highest mountain peak in Wayanad at 2,100 meters. Hike through emerald tea plantations and misty shola grasslands to reach the mystical perennial Heart-Shaped Lake (Hridaya Saras), soak under Soochipara falls, and stay in luxury rainforest treehouses in 3 days from Mumbai/Pune.",
    tags: [
      "Trekking",
      "Wayanad",
      "Kerala",
      "South India",
      "Chembra Peak",
      "Heart Lake",
      "Waterfalls",
      "Adventure",
      "Tea Estates",
      "High Altitude",
    ],
    country: "India",
    bestSuggestedMonth: "September – May",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Trekking & Adventure",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "chm-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Kozhikode (Calicut) → Thamarassery Ghat → Wayanad",
        summary:
          "Board an early nonstop flight from Mumbai (BOM) or Pune (PNQ) to Kozhikode / Calicut Airport (CCJ, 1h 45m). Pick up your self-drive rental or private taxi and drive 85 km (2.5 hours) via NH-766. Climb the legendary 9 hairpin bends of Thamarassery Churam with sweeping views of the Malabar coastal plains. Check into a luxury rainforest treehouse in Vythiri or Meppadi.",
        activities: [
          {
            _key: "chm1a",
            title: "Direct Flight Mumbai/Pune → Kozhikode Airport (CCJ)",
            description:
              "Morning flight landing in Calicut before 10:30 AM. Kozhikode is the closest and most convenient airport to Wayanad.",
            location: { name: "Calicut International Airport (CCJ)", lat: 11.1369, lng: 75.9553 },
            type: "transport",
          },
          {
            _key: "chm1b",
            title: "Climb the 9 Hairpin Bends Thamarassery Churam (~85 km, 2.5h)",
            description:
              "Ascend from sea level to 700 meters through 9 dramatic hairpin bends flanked by towering rain trees, gushing streams, and misty mountain views.",
            location: { name: "Thamarassery Churam Viewpoint", lat: 11.53, lng: 76.01 },
            type: "transport",
          },
          {
            _key: "chm1c",
            title: "Check-in to Luxury Rainforest Treehouse / Estate Suite",
            description:
              "Check into your eco-resort nestled amidst 200 acres of coffee and pepper vines, featuring canopy treehouses suspended 40 feet above ground.",
            location: { name: "Vythiri / Meppadi Rainforest Stay", lat: 11.5133, lng: 76.0872 },
            type: "accommodation",
          },
          {
            _key: "chm1d",
            title: "Sunset Walk at Pookode Lake & Lakkidi Viewpoint",
            description:
              "Stroll around the natural freshwater lake shaped like India's map, covered with blue water lilies, and view the winding ghat road lights from Lakkidi pass.",
            location: { name: "Pookode Lake, Wayanad", lat: 11.542, lng: 76.028 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "chm-d2",
        dayNumber: 2,
        title: "Chembra Peak Trek to the Heart-Shaped Lake & Soochipara Falls",
        summary:
          "Start at 7:00 AM at the Meppadi Forest Office to secure your trekking permit. Trek 4 km through manicured tea gardens and misty shola slopes to reach the mythical Heart-Shaped Lake (Hridaya Saras) at 1,500m. After descending, relax at the thundering Soochipara Waterfalls.",
        activities: [
          {
            _key: "chm2a",
            title: "Forest Permit & Tea Garden Ascent (~1.5h)",
            description:
              "Obtain your trek pass from the VSS Forest Office at Meppadi. Begin the gentle climb through the undulating emerald carpet of Chembra tea estate.",
            location: { name: "Chembra Trek Starting Point", lat: 11.5133, lng: 76.0872 },
            type: "activity",
          },
          {
            _key: "chm2b",
            title: "Reach the Mystical Heart-Shaped Lake (Hridaya Saras)",
            description:
              "Arrive at the famous natural perennial lake shaped precisely like a heart, situated at 1,500 meters altitude. Believed by locals never to have dried up throughout recorded history.",
            location: { name: "Heart-Shaped Lake (Hridaya Saras)", lat: 11.51, lng: 76.085 },
            type: "sightseeing",
          },
          {
            _key: "chm2c",
            title: "Traditional Wayanad Bamboo Biryani Lunch",
            description:
              "Feast on authentic fragrant biryani cooked inside whole green bamboo shoots over open embers, served with date pickle and tender coconut pudding.",
            location: { name: "1980's Nostalgic Restaurant", lat: 11.605, lng: 76.132 },
            type: "food",
          },
          {
            _key: "chm2d",
            title: "Swim & Relax at Soochipara (Sentinel Rock) Falls",
            description:
              "A three-tiered waterfall crashing 200 meters down into a massive natural rock pool ideal for wading, surrounded by dense deciduous jungle cliffs.",
            location: { name: "Soochipara Waterfalls", lat: 11.505, lng: 76.162 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "chm-d3",
        dayNumber: 3,
        title: "900 Kandi Glass Skywalk → Wayanad Spices → Return Flight",
        summary:
          "Visit the glass cantilever bridge suspended over the forest canopy at 900 Kandi. Shop for single-origin Wayanad Robusta coffee, bamboo rice, and wild forest honey before descending to Kozhikode Airport for your return flight.",
        activities: [
          {
            _key: "chm3a",
            title: "900 Kandi Glass Skywalk & Off-Road Trail",
            description:
              "Take an off-road 4WD jeep up to the glass-bottomed cantilever skywalk extending over a deep forested abyss with panoramic mountain vistas.",
            location: { name: "900 Kandi Glass Bridge", lat: 11.521, lng: 76.135 },
            type: "activity",
          },
          {
            _key: "chm3b",
            title: "Wayanad Coffee & Forest Honey Shopping",
            description:
              "Stock up on GI-tagged Wayanad Robusta coffee beans, rare bamboo seed rice, organic cardamom, and forest honey gathered by local Kattunaikkam tribes.",
            location: { name: "Meppadi Spices Center", lat: 11.55, lng: 76.12 },
            type: "activity",
          },
          {
            _key: "chm3c",
            title: "Drive to Kozhikode Airport (CCJ) & Return Flight",
            description:
              "Descend the Thamarassery Churam and head to Calicut International Airport (CCJ) for your evening nonstop flight back to Mumbai or Pune.",
            location: { name: "Calicut International Airport (CCJ)", lat: 11.1369, lng: 75.9553 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 14. Silent Valley National Park, Kerala ──────────────────────────
  {
    _id: "trip-silent-valley-3-days",
    title: "Silent Valley National Park — Primeval Rainforest & Kunthi River",
    slug: "silent-valley-3-days",
    excerpt:
      "Enter one of the last undisturbed tracts of tropical evergreen rainforest on Earth. Explore the Nilgiri Biosphere sanctuary devoid of noisy cicadas, cross the crystal-clear Kunthi River hanging bridge, spot endangered Lion-tailed Macaques, and climb Sairandhri Watch Tower in 3 days from Mumbai/Pune.",
    tags: [
      "National Park",
      "Rainforest",
      "Kerala",
      "South India",
      "Silent Valley",
      "Wildlife",
      "Lion-Tailed Macaque",
      "Kunthi River",
      "Offbeat",
      "Nature",
    ],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Wildlife & Nature",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "slv-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Coimbatore → Anakatti Border → Mukkali Base Camp",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Coimbatore (CJB, 1h 45m). Pick up a rental car or cab and drive 68 km (2 hours) west across the Kerala border via Anakatti along the Bhavani river to Mukkali, the base camp and gateway to Silent Valley National Park. Check into the Forest Department rest house or riverside resort and attend the evening orientation at the Wildlife Interpretation Centre.",
        activities: [
          {
            _key: "slv1a",
            title: "Direct Flight Mumbai/Pune → Coimbatore Airport (CJB)",
            description:
              "Morning departure landing into Coimbatore before 10:00 AM. Coimbatore is the closest airport to Silent Valley, just 68 km away.",
            location: { name: "Coimbatore International Airport (CJB)", lat: 11.0298, lng: 77.0434 },
            type: "transport",
          },
          {
            _key: "slv1b",
            title: "Scenic River Drive Coimbatore → Mukkali (~68 km, 2h)",
            description:
              "Drive through Thadagam valley, cross the Anakatti border into Kerala, and wind along the picturesque Bhavani river into the Attappadi forest reserve.",
            location: { name: "Anakatti - Mukkali Forest Road", lat: 11.05, lng: 76.54 },
            type: "transport",
          },
          {
            _key: "slv1c",
            title: "Check-in to Silent Valley Forest Rest House / Resort",
            description:
              "Check into your accommodation at Mukkali base camp surrounded by giant teak and bamboo groves, with gentle mountain breezes.",
            location: { name: "Mukkali Base Camp, Silent Valley", lat: 11.056, lng: 76.538 },
            type: "accommodation",
          },
          {
            _key: "slv1d",
            title: "Wildlife Interpretation Centre & Documentary Screening",
            description:
              "Learn about the historic 'Save Silent Valley' movement of the 1970s that saved this 89 sq km primeval rainforest from a hydroelectric dam project, creating India's most celebrated conservation victory.",
            location: { name: "Silent Valley Interpretation Centre", lat: 11.057, lng: 76.537 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "slv-d2",
        dayNumber: 2,
        title: "4WD Core Safari to Sairandhri, Watch Tower & Kunthi River Trek",
        summary:
          "Board an authorized Kerala Forest Department 4x4 Jeep for the 23 km journey into the virgin core zone of Sairandhri. Climb the 100-foot steel watchtower overlooking unbroken rainforest canopies, trek 1.5 km to the crystal waters of Kunthi River, and spot Lion-tailed Macaques.",
        activities: [
          {
            _key: "slv2a",
            title: "4x4 Jeep Safari Mukkali → Sairandhri Core (~23 km, 1.5h)",
            description:
              "Travel along the unpaved forest track through continuous multi-layered evergreen canopy where sunlight barely pierces the floor. Experience the eerie silence caused by the absence of cicadas.",
            location: { name: "Sairandhri Forest Core", lat: 11.1333, lng: 76.4333 },
            type: "activity",
          },
          {
            _key: "slv2b",
            title: "Climb the 100-Foot Sairandhri Observation Tower",
            description:
              "Ascend the panoramic steel watchtower rising above the tree canopy for an astounding 360-degree view of rolling rainforest ridges stretching into the Nilgiris.",
            location: { name: "Sairandhri Watch Tower", lat: 11.134, lng: 76.434 },
            type: "sightseeing",
          },
          {
            _key: "slv2c",
            title: "Guided Forest Trek to Kunthi River Suspension Bridge",
            description:
              "Hike down the 1.5 km stone trail under ancient trees draped with orchids. Cross the suspension bridge over the crystal-clear Kunthi River, pure enough to drink directly from the riverbed.",
            location: { name: "Kunthi River Suspension Bridge", lat: 11.13, lng: 76.43 },
            type: "activity",
          },
          {
            _key: "slv2d",
            title: "Lion-Tailed Macaque & Nilgiri Langur Sighting",
            description:
              "Silent Valley shelters the largest viable global population of the endangered Lion-tailed Macaque. Watch them forage along the riverbanks with their silvery-white manes and black coats.",
            location: { name: "Kunthi River Macaque Corridor", lat: 11.131, lng: 76.432 },
            type: "activity",
          },
        ],
      },
      {
        _key: "slv-d3",
        dayNumber: 3,
        title: "Attappadi Tribal Millet Trail → Coimbatore Airport → Return Flight",
        summary:
          "Explore the organic farming valley of Attappadi and taste traditional ragi puttu and herbal sukku coffee before returning across the Anakatti border to Coimbatore Airport for your flight to Mumbai/Pune.",
        activities: [
          {
            _key: "slv3a",
            title: "Morning Attappadi Organic Tribal Trail",
            description:
              "Visit organic millet farms managed by Irula and Muduga tribal communities, spotting colorful Malabar Trogons and hornbills in the agro-forests.",
            location: { name: "Attappadi Valley Farms", lat: 11.08, lng: 76.58 },
            type: "activity",
          },
          {
            _key: "slv3b",
            title: "Traditional Tribal Breakfast with Ragi Puttu & Sukku Coffee",
            description:
              "Savor steamed finger-millet puttu with spicy black chickpea curry and dry-ginger cardamom coffee sweetened with palm jaggery.",
            location: { name: "Attappadi Tribal Kitchen", lat: 11.06, lng: 76.55 },
            type: "food",
          },
          {
            _key: "slv3c",
            title: "Drive to Coimbatore Airport (CJB) & Return Flight",
            description:
              "Drive 68 km via Anakatti back to Coimbatore International Airport (CJB) for your evening nonstop flight to Mumbai or Pune.",
            location: { name: "Coimbatore International Airport (CJB)", lat: 11.0298, lng: 77.0434 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 15. Poovar Island, Kerala ─────────────────────────────────────────
  {
    _id: "trip-poovar-island-3-days",
    title: "Poovar Island — Where Backwaters, Mangroves & Ocean Converge",
    slug: "poovar-island-3-days",
    excerpt:
      "Unwind at a rare natural wonder where river, backwater lake, mangrove forests, and the open Arabian Sea meet. Stay in floating cottages over the water, cruise through dense mangrove bird sanctuaries, and walk on the uninhabited Golden Sand Beach accessible only by boat in 3 days from Mumbai/Pune.",
    tags: [
      "Beach",
      "Backwaters",
      "Floating Cottages",
      "Kerala",
      "South India",
      "Poovar Island",
      "Mangroves",
      "Ayurveda",
      "Coastal",
      "Relaxation",
    ],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Coastal & Relaxation",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "pvr-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Trivandrum → Motorboat to Floating Cottage",
        summary:
          "Board an early direct flight from Mumbai (BOM) or Pune (PNQ) to Thiruvananthapuram / Trivandrum (TRV, 2 hours). A quick 30 km taxi drive (45 mins) brings you to the Poovar river jetty. Board a motorized wooden country boat gliding through coconut canals to reach your luxury floating cottage anchored over the backwaters. Unwind with sunset views over the estuary.",
        activities: [
          {
            _key: "pvr1a",
            title: "Direct Flight Mumbai/Pune → Trivandrum Airport (TRV)",
            description:
              "Fly into the capital of Kerala with scenic aerial views of coconut palm groves and the Arabian Sea coastline.",
            location: { name: "Trivandrum International Airport (TRV)", lat: 8.4821, lng: 76.92 },
            type: "transport",
          },
          {
            _key: "pvr1b",
            title: "Drive to Poovar Boat Jetty & Motorboat Transfer (~30 km, 45m)",
            description:
              "Arrive at the private boat jetty and board a covered motorboat for a scenic 10-minute cruise through serene backwater channels to the resort.",
            location: { name: "Poovar Boat Jetty", lat: 8.32, lng: 77.065 },
            type: "transport",
          },
          {
            _key: "pvr1c",
            title: "Check-in to Luxury Floating Cottage on Backwaters",
            description:
              "Check into your eco-friendly timber cottage floating directly on the water. Open your bedroom veranda doors to water lapping beneath and gentle sea breezes.",
            location: { name: "Poovar Island Resort Floating Cottages", lat: 8.3186, lng: 77.0628 },
            type: "accommodation",
          },
          {
            _key: "pvr1d",
            title: "Floating Restaurant Seafood Dinner",
            description:
              "Dine on an anchored floating deck under the stars. Savor Jumbo Tiger Prawns tawa roast, Karimeen Pollichathu, and Kerala coconut rice.",
            location: { name: "Floating Restaurant Poovar", lat: 8.318, lng: 77.062 },
            type: "food",
          },
        ],
      },
      {
        _key: "pvr-d2",
        dayNumber: 2,
        title: "Mangrove Estuary Boat Safari, Golden Beach & Ayurvedic Spa",
        summary:
          "Morning private boat safari navigating narrow mangrove tunnels where branches form a natural green roof. Land on the uninhabited Golden Sand Beach sandspit that separates the river from the sea. Enjoy an afternoon authentic Ayurvedic rejuvenation massage.",
        activities: [
          {
            _key: "pvr2a",
            title: "Private Mangrove Forest Boat Cruise (~2h)",
            description:
              "Glide silently through the labyrinthine mangrove channels of Neyyar river. Watch Brahminy kites, purple herons, kingfishers, and monitor lizards basking on tree roots.",
            location: { name: "Poovar Mangrove Forest Canals", lat: 8.312, lng: 77.06 },
            type: "activity",
          },
          {
            _key: "pvr2b",
            title: "Disembark at Uninhabited Golden Sand Beach",
            description:
              "Step onto the golden sandspit accessible only by boat. Stand at the dramatic natural divide where the calm fresh river waters flow on one side and roaring sea breakers crash on the other.",
            location: { name: "Poovar Golden Sand Beach", lat: 8.31, lng: 77.058 },
            type: "sightseeing",
          },
          {
            _key: "pvr2c",
            title: "Traditional Kerala Ayurvedic Abhyanga & Shirodhara",
            description:
              "Indulge in a 90-minute therapeutic session with warm medicated herbal oils and rhythmic oil streaming across the forehead for profound mental tranquility.",
            location: { name: "Poovar Ayurvedic Wellness Center", lat: 8.319, lng: 77.063 },
            type: "activity",
          },
          {
            _key: "pvr2d",
            title: "Sunset Cocktails at the Estuary Deck",
            description:
              "Watch the sky turn crimson and violet over the Arabian Sea while sipping fresh tender coconut water or tropical fruit coolers.",
            location: { name: "Estuary Sunset Deck", lat: 8.3185, lng: 77.0625 },
            type: "food",
          },
        ],
      },
      {
        _key: "pvr-d3",
        dayNumber: 3,
        title: "Pozhiyoor Fishing Cove → Padmanabhaswamy Temple → Return Flight",
        summary:
          "Take an early morning boat ride past traditional catamarans at Pozhiyoor fishing cove. Stop by the monumental Sree Padmanabhaswamy Temple in Trivandrum before your return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "pvr3a",
            title: "Morning Fishermen Village Cruise to Pozhiyoor",
            description:
              "Observe coastal fishermen casting large Chinese-style shore nets and launching wooden country boats into the morning waves.",
            location: { name: "Pozhiyoor Fishermen Cove", lat: 8.305, lng: 77.072 },
            type: "sightseeing",
          },
          {
            _key: "pvr3b",
            title: "Visit Sree Padmanabhaswamy Temple, Trivandrum",
            description:
              "Marvel at the monumental 16th-century Dravidian gopuram and the sacred temple pond of the wealthiest shrine in the world, dedicated to Lord Vishnu in Anantha Sayana posture.",
            location: { name: "Padmanabhaswamy Temple", lat: 8.483, lng: 76.9436 },
            type: "sightseeing",
          },
          {
            _key: "pvr3c",
            title: "Drive to Trivandrum Airport (TRV) & Return Flight",
            description:
              "Quick 15-minute transfer from the city center to Trivandrum International Airport (TRV) for your nonstop flight back to Mumbai or Pune.",
            location: { name: "Trivandrum International Airport (TRV)", lat: 8.4821, lng: 76.92 },
            type: "transport",
          },
        ],
      },
    ],
  },
  // ── 16. Sirsi, Karnataka ──────────────────────────────────────────────
  {
    _id: "trip-sirsi-3-days",
    title: "Sirsi — Waterfall Capital of the Western Ghats & Sahasralinga",
    slug: "sirsi-3-days",
    excerpt:
      "Journey into Karnataka's hidden Western Ghats paradise: thundering Unchalli Falls (Lushington Falls), mystical black limestone monoliths of Yana, 1000 Shiva lingas carved into the Shalmala riverbed at Sahasralinga, and the ancient Kadamba capital of Banavasi in 3 days from Mumbai/Pune.",
    tags: [
      "Waterfalls",
      "Western Ghats",
      "Karnataka",
      "South India",
      "Sirsi",
      "Trekking",
      "Nature",
      "Monoliths",
      "Temples",
      "Havyaka Cuisine",
    ],
    country: "India",
    bestSuggestedMonth: "July – February",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Nature & Adventure",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "srs-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Hubli (HBX) / Goa (GOI) → Sirsi & Sahasralinga River Carvings",
        summary:
          "Take an early direct flight from Mumbai (BOM) or Pune (PNQ) to Hubballi / Hubli (HBX, 1h 15m) or Goa Dabolim/Mopa (150 km). Alternatively, drive from Pune (~520 km, 9 hours) down NH48 via Belgaum and Dharwad. Drive through dense spice and areca-nut plantations to Sirsi town. Check into your heritage homestay. In the afternoon, visit the serene Shalmala River at Sahasralinga, where nearly a thousand ancient Shiva lingas and Nandi bulls are intricately carved directly into rocks across the riverbed. Return to Sirsi for the famous crispy Benne Dosa and Banana Halwa.",
        activities: [
          {
            _key: "srs1a",
            title: "Flight Mumbai/Pune to Hubli (HBX) & Drive to Sirsi (~102 km, 2.5h)",
            description:
              "Arrive at Hubli Airport and embark on a scenic drive winding past verdant areca nut groves and dense Western Ghats reserve forests into Sirsi.",
            location: { name: "Hubli Airport (HBX)", lat: 15.3617, lng: 75.0849 },
            type: "transport",
          },
          {
            _key: "srs1b",
            title: "Check-in at Areca County Heritage Homestay",
            description:
              "Unwind in a traditional tile-roofed plantation home surrounded by betel nut palms, pepper vines, and tropical foliage.",
            location: { name: "Areca County Sirsi", lat: 14.6288, lng: 74.8412 },
            type: "accommodation",
          },
          {
            _key: "srs1c",
            title: "Explore Sahasralinga on the Shalmala River",
            description:
              "Walk along the shaded riverbanks to witness roughly a thousand Shiva lingas sculpted into black bedrock, submerged and revealed by the flowing crystal waters.",
            location: { name: "Sahasralinga", lat: 14.7088, lng: 74.8715 },
            type: "sightseeing",
          },
          {
            _key: "srs1d",
            title: "Visit Historic Marikamba Temple & Savor Sirsi Benne Dosa",
            description:
              "Seek blessings at the 16th-century temple housing the magnificent golden goddess idol, then enjoy golden butter dosas and warm Havyaka herbal teas in town.",
            location: { name: "Sri Marikamba Temple Sirsi", lat: 14.6214, lng: 74.839 },
            type: "food",
          },
        ],
      },
      {
        _key: "srs-d2",
        dayNumber: 2,
        title: "The Roaring Cataracts: Unchalli Falls & Yana Karst Monoliths",
        summary:
          "Dedicate the full day to Sirsi\'s natural wonders. In the morning, drive 35 km to the edge of the Aghanashini River gorge to experience Unchalli Falls (Lushington Falls), where the wild river plunges 380 feet down a sheer rock amphitheater shrouded in perpetual mist and rainbows. Afterwards, trek through primeval rainforest between the soaring black limestone karst monoliths of Yana (Bhairaveshwara Shikhara, 120m tall). Explore the subterranean cave shrine hidden beneath the rock spire.",
        activities: [
          {
            _key: "srs2a",
            title: "Spectacular Unchalli Falls (Lushington Falls)",
            description:
              "Trek down the forest steps through lush canopies to view the colossal 116-meter cataract booming into the deep Western Ghats canyon.",
            location: { name: "Unchalli Falls", lat: 14.5085, lng: 74.8105 },
            type: "sightseeing",
          },
          {
            _key: "srs2b",
            title: "Traditional Havyaka Banana Leaf Lunch",
            description:
              "Relish home-style Appe Huli (wild mango rasam), cooling Tambli, Patrode, and fresh jackfruit curries at a nearby plantation mess.",
            location: { name: "Heggarne Village", lat: 14.524, lng: 74.821 },
            type: "food",
          },
          {
            _key: "srs2c",
            title: "Hike Through Dense Jungle to Yana Karst Rock Monoliths",
            description:
              "Trek through evergreen rainforest to the colossal twin black crystalline limestone pillars rising surreal above the tree canopy. Enter the cave shrine of Lord Shiva carved into the base.",
            location: { name: "Yana Rocks", lat: 14.5276, lng: 74.5615 },
            type: "activity",
          },
        ],
      },
      {
        _key: "srs-d3",
        dayNumber: 3,
        title: "Banavasi Ancient Kadamba Capital, Vibhooti Falls & Departure",
        summary:
          "Visit Banavasi, the 4th-century capital of the Kadamba Dynasty mentioned by Ptolemy and celebrated by the poet Pampa. Tour the 9th-century Madhukeshwara Temple with its monolithic stone cot and carved Ashta Dikpalaka ceiling. Continue to the cascading tiers and natural emerald swimming pools of Vibhooti Falls. Return to Hubballi Airport (HBX) or Goa (GOI) for your evening flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "srs3a",
            title: "Madhukeshwara Temple, Banavasi Ancient Capital",
            description:
              "Explore the oldest temple town in Karnataka with its intricate Chalukyan and Kadamba stone architecture, honey-colored lingam, and carved stone throne.",
            location: { name: "Madhukeshwara Temple Banavasi", lat: 14.5367, lng: 75.0118 },
            type: "sightseeing",
          },
          {
            _key: "srs3b",
            title: "Dip in the Tiered Pools of Vibhooti Falls",
            description:
              "Hike a shaded bamboo trail to these gentle multi-tiered limestone cascades where refreshing mountain spring water flows over smooth bedrock.",
            location: { name: "Vibhooti Falls", lat: 14.5516, lng: 74.6366 },
            type: "sightseeing",
          },
          {
            _key: "srs3c",
            title: "Transfer to Hubli Airport (HBX) & Return Flight",
            description:
              "Drive back to Hubli Airport (HBX) via Sirsi and Yellapur for your direct return flight to Mumbai or Pune.",
            location: { name: "Hubli Airport (HBX)", lat: 15.3617, lng: 75.0849 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 17. Gandikota & Belum Caves, Andhra Pradesh ────────────────────────
  {
    _id: "trip-gandikota-3-days",
    title: "Gandikota & Belum Caves — The Grand Canyon of India",
    slug: "gandikota-3-days",
    excerpt:
      "Stand atop the 300-foot red granite gorge of the Pennar River, explore the 13th-century fort ruins of the Pemmasani Nayaks, and descend into India's second-largest subterranean cave network at Belum Caves in 3 days from Mumbai/Pune.",
    tags: [
      "Canyon",
      "Heritage",
      "Forts",
      "Andhra Pradesh",
      "South India",
      "Gandikota",
      "Belum Caves",
      "Adventure",
      "Geology",
      "Grand Canyon",
    ],
    country: "India",
    bestSuggestedMonth: "September – February",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Heritage & Adventure",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "gdk-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Bengaluru (BLR) → Drive to Gandikota & Sunset on the Gorge",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Kempegowda International Airport, Bengaluru (BLR, 1.5 hours). Alternatively, take the overnight train to Gooty or Tadipatri. Board your private cab for a scenic 4.5-hour highway drive (280 km) across Andhra\'s Rayalaseema heartland through Lepakshi and Kadiri into Gandikota. Pass through the monumental granite ramparts of Gandikota Fort. Check into Haritha Resort or riverside adventure tents. Head straight to the gorge rim to witness the sun sink into the deep chasm carved by the Pennar River through towering reddish-brown sandstone layers.",
        activities: [
          {
            _key: "gdk1a",
            title: "Flight Mumbai/Pune to Bengaluru (BLR) & Drive to Gandikota (~280 km, 4.5h)",
            description:
              "Arrive in Bengaluru and take NH44 north through Karnataka into Andhra Pradesh, traversing rugged Rayalaseema landscapes to reach the fort citadel.",
            location: { name: "Bengaluru Kempegowda Airport (BLR)", lat: 13.1986, lng: 77.7066 },
            type: "transport",
          },
          {
            _key: "gdk1b",
            title: "Check-in at Haritha Resort Gandikota",
            description:
              "Settle into your cottage located right next to the 13th-century fort entrance walls, walking distance from the canyon rim.",
            location: { name: "Haritha Resort Gandikota", lat: 14.8143, lng: 78.2862 },
            type: "accommodation",
          },
          {
            _key: "gdk1c",
            title: "Sunset Over the Pennar River Gorge",
            description:
              "Perch on colossal layered granite boulders overlooking the serpentine 300ft deep canyon as golden light illuminates the Pennar River far below.",
            location: { name: "Gandikota Gorge Viewpoint", lat: 14.8185, lng: 78.2915 },
            type: "sightseeing",
          },
          {
            _key: "gdk1d",
            title: "Rayalaseema Dinner: Ragi Mudda with Natu Kodi Pulusu",
            description:
              "Feast on authentic country chicken cooked in pungent red chilli gravy, served with wholesome steamed ragi balls and dollops of fresh desi ghee.",
            location: { name: "Haritha Restaurant Gandikota", lat: 14.8145, lng: 78.286 },
            type: "food",
          },
        ],
      },
      {
        _key: "gdk-d2",
        dayNumber: 2,
        title: "Sunrise Kayaking, Pemmasani Nayak Citadel & Jamia Masjid",
        summary:
          "Rise before dawn for sunrise over the canyon. Trek down into the gorge floor to launch kayaks onto the calm emerald waters of the Pennar River, gazing up at 300-foot vertical cliff faces. Return to the clifftop to explore the sprawling fort ruins: the massive Granary, the 17th-century Jamia Masjid with its twin minarets framing the canyon, the subterranean Rayalacheruvu lake, and the intricately carved pillars of the 14th-century Raghunatha Swamy and Madhavaraya temples. Enjoy evening campfire stargazing on the canyon edge.",
        activities: [
          {
            _key: "gdk2a",
            title: "Kayaking on the Pennar River Inside the Gorge",
            description:
              "Paddle through the canyon chasm under towering red sandstone amphitheaters, experiencing the majestic scale of India\'s Grand Canyon from water level.",
            location: { name: "Pennar Riverbed Kayaking Point", lat: 14.821, lng: 78.2925 },
            type: "activity",
          },
          {
            _key: "gdk2b",
            title: "Explore Gandikota Fort Ruins & Madhavaraya Temple",
            description:
              "Walk through 5 square kilometers of history: the monumental 40-foot gateways, high stone granary, royal prison, and the towering 4-tiered gopuram of Madhavaraya Temple.",
            location: { name: "Madhavaraya Temple Gandikota", lat: 14.8115, lng: 78.2842 },
            type: "sightseeing",
          },
          {
            _key: "gdk2c",
            title: "Visit Jamia Masjid & Raghunatha Swamy Temple",
            description:
              "Photograph the striking contrast between Islamic minarets and Vijayanagara carved stone pillars set against the backdrop of the rocky gorge.",
            location: { name: "Jamia Masjid Gandikota", lat: 14.8155, lng: 78.2875 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "gdk-d3",
        dayNumber: 3,
        title: "Belum Subterranean Limestone Caves & Return to Bengaluru",
        summary:
          "After breakfast, drive 60 km north to Belum Caves, the second-largest cave system on the Indian subcontinent, formed over millions of years by the underground Chitravathi River. Walk through 1.5 km of illuminated passages descending up to 150 feet below ground. Marvel at stalactites, stalagmites, the musical limestone pillars (Saptasvarala Guha), and the subterranean perennial stream at Pataalaganga. Enjoy a comforting Andhra thali before driving back to Bengaluru Airport for your evening return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "gdk3a",
            title: "Expedition into Belum Subterranean Caves",
            description:
              "Descend into vast underground chambers with naturally sculpted limestone formations, sinkholes, and ancient Buddhist meditation platforms dating back to 4500 BC.",
            location: { name: "Belum Caves", lat: 15.1026, lng: 78.1118 },
            type: "sightseeing",
          },
          {
            _key: "gdk3b",
            title: "Authentic Andhra Meals at Belum Canteen",
            description:
              "Savor piping hot steamed rice, spicy Podi with ghee, Gongura Pappu, and crispy appadams after emerging from the underground cavern.",
            location: { name: "Haritha Belum Canteen", lat: 15.103, lng: 78.1122 },
            type: "food",
          },
          {
            _key: "gdk3c",
            title: "Drive to Bengaluru Airport (BLR) & Return Flight",
            description:
              "Drive south along NH44 directly to Kempegowda International Airport, Bengaluru for your flight back to Mumbai or Pune.",
            location: { name: "Bengaluru Kempegowda Airport (BLR)", lat: 13.1986, lng: 77.7066 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 18. Araku Valley, Andhra Pradesh ──────────────────────────────────
  {
    _id: "trip-araku-valley-4-days",
    title: "Araku Valley & Borra Caves — Coffee Clouds & Vistadome Rail",
    slug: "araku-valley-4-days",
    excerpt:
      "Climb through 58 tunnels and 84 bridges aboard the glass-domed Vistadome train into the Eastern Ghats. Sip single-origin organic Arabica coffee, explore million-year-old Borra Caves, swim in Chaparai cascading rock pools, and taste wood-fired bamboo chicken in 4 days from Mumbai/Pune.",
    tags: [
      "Hills",
      "Coffee",
      "Tribal",
      "Andhra Pradesh",
      "South India",
      "Araku Valley",
      "Caves",
      "Vistadome",
      "Nature",
      "Eastern Ghats",
    ],
    country: "India",
    bestSuggestedMonth: "September – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Mountains & Culture",
    readingTime: 8,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "ark-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Visakhapatnam (VTZ) → Coastal Vizag & Submarine Museum",
        summary:
          "Board an early morning direct flight from Mumbai (BOM) or Pune (PNQ) to Visakhapatnam / Vizag (VTZ, 2 hours). Check into your coastal hotel. In the afternoon, walk along the breezy Ramakrishna (RK) Beach and explore INS Kursura, a Soviet-built submarine turned into South Asia\'s first submarine museum. Take the ropeway up to Kailasagiri hilltop park for 360-degree views of the crescent beach coastline meeting the Eastern Ghats. Enjoy dinner featuring coastal Andhra prawn fry and freshly caught fish curry.",
        activities: [
          {
            _key: "ark1a",
            title: "Direct Flight Mumbai/Pune to Visakhapatnam Airport (VTZ)",
            description:
              "Touch down in the City of Destiny on the shores of the Bay of Bengal, surrounded by mountain ridges.",
            location: { name: "Visakhapatnam Airport (VTZ)", lat: 17.7215, lng: 83.2245 },
            type: "transport",
          },
          {
            _key: "ark1b",
            title: "Tour INS Kursura Submarine Museum, RK Beach",
            description:
              "Walk through the narrow compartments and torpedo rooms of this legendary 1971 Indo-Pak war submarine preserved on the sands of RK Beach.",
            location: { name: "INS Kursura Submarine Museum", lat: 17.7171, lng: 83.3323 },
            type: "sightseeing",
          },
          {
            _key: "ark1c",
            title: "Sunset Cable Car to Kailasagiri Hilltop",
            description:
              "Ride the ropeway high above the city to see the colossal white marble statues of Shiva and Parvati gazing across the Bay of Bengal.",
            location: { name: "Kailasagiri", lat: 17.7491, lng: 83.3422 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "ark-d2",
        dayNumber: 2,
        title: "Iconic Vistadome Train into the Clouds & Araku Coffee Plantations",
        summary:
          "Board the legendary Visakhapatnam–Kirandul Passenger (Train 08551) at 06:45 AM from Vizag Railway Station in the glass-domed Vistadome coach. Watch the landscape transform as the train climbs 3,000 feet up the Ananthagiri Ghats through 58 tunnels and across 84 bridges spanning misty mountain ravines. Arrive at Araku station by 11:00 AM. Check into Haritha Valley Resort. In the afternoon, visit the Araku Tribal Museum celebrating the traditions of 19 indigenous tribes and sip organic Arabica coffee at the Araku Coffee Museum.",
        activities: [
          {
            _key: "ark2a",
            title: "Scenic Vistadome Train Ride Vizag → Araku (~130 km, 4h)",
            description:
              "Experience 360-degree views of cascading waterfalls, deep gorges, and cloud-draped hills through panoramic glass roofs and rotating seats.",
            location: { name: "Araku Railway Station", lat: 18.3333, lng: 82.8833 },
            type: "transport",
          },
          {
            _key: "ark2b",
            title: "Check-in at Haritha Valley Resort Araku",
            description:
              "Settle into scenic valley-facing cottages surrounded by lush gardens, terraced fields, and cool mountain breezes.",
            location: { name: "Haritha Valley Resort Araku", lat: 18.3273, lng: 82.8775 },
            type: "accommodation",
          },
          {
            _key: "ark2c",
            title: "Araku Tribal Museum & Coffee House Tasting",
            description:
              "Discover tribal artifacts, weapons, clay huts, and traditional metalsmithing. Follow with a coffee cupping of world-famous shade-grown Araku Arabica.",
            location: { name: "Araku Tribal Museum", lat: 18.3285, lng: 82.878 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "ark-d3",
        dayNumber: 3,
        title: "Chaparai Cascades, Katiki Waterfalls & Bamboo Chicken Feasts",
        summary:
          "Morning drive to Chaparai Water Cascades, where gentle mountain streams slide over sloping, smooth granite slabs surrounded by dense forest. Dip in natural splash pools. Continue deep into the hills via rugged 4x4 forest jeeps to Katiki Waterfalls, where the Gosthani River drops 50 feet through thick jungle. Watch indigenous chefs prepare legendary Bongu Kodi (Bamboo Chicken)—marinated chicken stuffed inside freshly cut green bamboo poles and slow-roasted over burning coals with zero oil. Enjoy an evening Dhimsa tribal folk dance around the campfire.",
        activities: [
          {
            _key: "ark3a",
            title: "Splash in Chaparai Natural Rock Water Cascades",
            description:
              "Wade through shallow mountain streams and slide down smooth natural stone slides in a picturesque valley clearing.",
            location: { name: "Chaparai Water Cascades", lat: 18.2861, lng: 82.7842 },
            type: "sightseeing",
          },
          {
            _key: "ark3b",
            title: "Taste Authentic Wood-Fired Bongu Kodi (Bamboo Chicken)",
            description:
              "Relish succulent country chicken cooked inside green bamboo with wild ginger, garlic, and forest herbs over red-hot charcoal coals.",
            location: { name: "Chaparai Road Bamboo Stalls", lat: 18.288, lng: 82.786 },
            type: "food",
          },
          {
            _key: "ark3c",
            title: "4x4 Jeep Safari & Hike to Katiki Waterfalls",
            description:
              "Ride rough mud tracks and hike through towering sal and teak canopies to this secluded 50-foot waterfall pool.",
            location: { name: "Katiki Waterfalls", lat: 18.2917, lng: 83.0083 },
            type: "activity",
          },
        ],
      },
      {
        _key: "ark-d4",
        dayNumber: 4,
        title: "Deep Caverns of Borra Caves, Galikonda Viewpoint & Return to Vizag",
        summary:
          "Check out and drive to Borra Caves, one of India\'s deepest and most magnificent limestone cave formations, situated at 2,300 feet in the Ananthagiri hills. Marvel at the dramatic stalactites and stalagmites sculpted over a million years by the Gosthani River, vividly illuminated by colorful mercury lights. Stop at Galikonda Viewpoint (the highest peak in Visakhapatnam district at 4,990 ft) for panoramic valley vistas. Continue down the ghat road directly to Visakhapatnam Airport (VTZ) for your evening flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "ark4a",
            title: "Explore the Million-Year-Old Borra Caves",
            description:
              "Descend 300 feet into subterranean limestone caverns to view breathtaking formations resembling a Shiva lingam, mother-and-child, and royal court.",
            location: { name: "Borra Caves", lat: 18.2806, lng: 83.0394 },
            type: "sightseeing",
          },
          {
            _key: "ark4b",
            title: "Panoramas from Galikonda Viewpoint (4,990 ft)",
            description:
              "Take in awe-inspiring views of undulating coffee valleys, winding railway bridges, and distant cloud-kissed peaks from the highest ridge in the district.",
            location: { name: "Galikonda View Point", lat: 18.2722, lng: 82.9733 },
            type: "sightseeing",
          },
          {
            _key: "ark4c",
            title: "Drive to Visakhapatnam Airport (VTZ) & Return Flight",
            description:
              "Descend the scenic Ananthagiri ghats (90 km, 2.5h) to Vizag Airport for your direct evening flight back to Mumbai or Pune.",
            location: { name: "Visakhapatnam Airport (VTZ)", lat: 17.7215, lng: 83.2245 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 19. Papikondalu, Andhra Pradesh ────────────────────────────────────
  {
    _id: "trip-papikondalu-3-days",
    title: "Papikondalu & Godavari River Gorge — Bamboo Huts & Riverboat Safari",
    slug: "papikondalu-3-days",
    excerpt:
      "Cruise along the sacred Godavari River as it carves a dramatic serpentine gorge through the emerald Papikonda mountain range. Stay overnight in eco bamboo huts on island sandbars, visit the remote forest shrine of Perantapalli, and savor fiery Godavari river prawn delicacies in 3 days from Mumbai/Pune.",
    tags: [
      "River Cruise",
      "Gorge",
      "Eco-Tourism",
      "Andhra Pradesh",
      "South India",
      "Papikondalu",
      "Godavari",
      "Nature",
      "Tribal",
      "Bamboo Huts",
    ],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "River Cruise & Nature",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "ppk-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Rajahmundry (RJA) → Godavari Ghats & Havelock Bridge",
        summary:
          "Board a flight from Mumbai (BOM) or Pune (PNQ) to Rajahmundry Airport (RJA, direct or via Hyderabad, 2.5h). Check into River Bay Resort or Hotel Shelton. In the evening, stroll along the bustling Pushkar Ghat where evening aarti takes place on the banks of the sacred Godavari River. Photograph the historic 2.7-kilometer Havelock Bridge (built in 1897) spanning the river. Sample world-famous paper sweets—Atreyapuram Potharekulu—layered with ghee, jaggery, and crushed dry fruits.",
        activities: [
          {
            _key: "ppk1a",
            title: "Flight Mumbai/Pune to Rajahmundry Airport (RJA)",
            description:
              "Fly into the cultural capital of Andhra Pradesh, situated on the banks of the mighty Godavari River.",
            location: { name: "Rajahmundry Airport (RJA)", lat: 17.1106, lng: 81.8183 },
            type: "transport",
          },
          {
            _key: "ppk1b",
            title: "Check-in at River Bay Resort Rajahmundry",
            description:
              "Unwind in a river-facing resort with panoramic views of the Godavari River and evening sunset breezes.",
            location: { name: "River Bay Resort", lat: 17.0005, lng: 81.765 },
            type: "accommodation",
          },
          {
            _key: "ppk1c",
            title: "Evening Aarti at Pushkar Ghat & Havelock Bridge",
            description:
              "Watch oil lamps float down the tranquil river as temple bells chime, with the monumental historic railway bridge illuminated against the twilight sky.",
            location: { name: "Pushkar Ghat Rajahmundry", lat: 16.995, lng: 81.771 },
            type: "sightseeing",
          },
          {
            _key: "ppk1d",
            title: "Sweet Tasting: Authentic Atreyapuram Potharekulu",
            description:
              "Taste the delicate, paper-thin rice starch sweet roll handcrafted with pure desi ghee and roasted nuts, a prized Andhra delicacy.",
            location: { name: "Kotipalli Road Sweets Market", lat: 17.002, lng: 81.778 },
            type: "food",
          },
        ],
      },
      {
        _key: "ppk-d2",
        dayNumber: 2,
        title: "Boat Launch at Polavaram, Serpentine Papikonda Gorge & Kolluru Bamboo Huts",
        summary:
          "Rise early for a 40 km drive to Polavaram/Purushothapatnam boat launch jetty. Board your two-tiered luxury river cruise vessel. As the boat sails upriver, enjoy a traditional breakfast on the upper observation deck. Stop for blessings at Gandi Pochamma Temple on the riverbank. Soon, the Godavari narrows dramatically from a wide delta to barely 100 meters across as you enter the Papikondalu gorge, flanked by soaring 2,000-foot forested mountains on both sides. Stop at the secluded Ramakrishna Hermitage at Perantapalli. Disembark at Kolluru island sandbank to check into rustic bamboo huts beneath starry skies.",
        activities: [
          {
            _key: "ppk2a",
            title: "Board Papikondalu Riverboat Cruise at Polavaram Jetty",
            description:
              "Embark on a full-day river voyage upstream through changing landscapes into the Papikonda National Park mountain sanctuary.",
            location: { name: "Polavaram Boat Jetty", lat: 17.2589, lng: 81.6444 },
            type: "transport",
          },
          {
            _key: "ppk2b",
            title: "Cruise Through the Majestic Papikonda Mountain Gorge",
            description:
              "Marvel at dramatic vertical mountain slopes rising sheer from the green waters of the Godavari as the boat maneuvers through narrow serpentine canyon curves.",
            location: { name: "Papikondalu Gorge", lat: 17.55, lng: 81.52 },
            type: "sightseeing",
          },
          {
            _key: "ppk2c",
            title: "Visit Perantapalli Ashram & Waterfalls",
            description:
              "Disembark at a tranquil tribal clearing to visit the Sri Ramakrishna hermit monastery and hidden jungle waterfalls.",
            location: { name: "Perantapalli Village", lat: 17.562, lng: 81.498 },
            type: "sightseeing",
          },
          {
            _key: "ppk2d",
            title: "Stay Overnight at Kolluru Sandbank Bamboo Huts",
            description:
              "Experience pure digital detox in authentic eco bamboo huts on the white sandbars of the Godavari. Savor campfire barbecue and stargazing.",
            location: { name: "Kolluru Island Bamboo Camp", lat: 17.545, lng: 81.535 },
            type: "accommodation",
          },
        ],
      },
      {
        _key: "ppk-d3",
        dayNumber: 3,
        title: "Sunrise over Godavari, Return River Cruise & Flight from Rajahmundry",
        summary:
          "Wake to the gentle sound of the river lapping against the sandbanks and mist swirling over the Papikonda peaks. After an authentic country breakfast cooked on wood stoves, board the cruise vessel for the return voyage downstream. Enjoy lively tribal Dhimsa folk music and dance performances on board. Savor a lavish Godavari buffet including spicy prawn fry and Gongura chicken. Disembark at the jetty by 3:30 PM and transfer to Rajahmundry Airport (RJA) for your evening flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "ppk3a",
            title: "Sunrise Walk on Kolluru River Sandbanks",
            description:
              "Breathe in crisp river air as the golden sun crests over the Papikonda ridge, illuminating mist rising from the emerald waters.",
            location: { name: "Kolluru Sandbanks", lat: 17.545, lng: 81.535 },
            type: "sightseeing",
          },
          {
            _key: "ppk3b",
            title: "Return Cruise with Onboard Folk Dance & Godavari Feast",
            description:
              "Cruise downriver enjoying live folk music performances and a lavish traditional feast featuring Royyala Vepudu and fragrant ghee rice.",
            location: { name: "Papikondalu Cruise Deck", lat: 17.4, lng: 81.58 },
            type: "food",
          },
          {
            _key: "ppk3c",
            title: "Transfer to Rajahmundry Airport (RJA) & Return Flight",
            description:
              "Disembark at Polavaram and take a 1-hour private cab to Rajahmundry Airport for your evening flight back to Mumbai or Pune.",
            location: { name: "Rajahmundry Airport (RJA)", lat: 17.1106, lng: 81.8183 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 20. Talakona, Andhra Pradesh ───────────────────────────────────────
  {
    _id: "trip-talakona-3-days",
    title: "Talakona & Chandragiri — High Cascades & Vijayanagara Heritage",
    slug: "talakona-3-days",
    excerpt:
      "Hike through lush medicinal forests of Sri Venkateswara National Park to reach Andhra's tallest cascade (270 ft), cross the 240-meter treetop canopy rope walk, and explore the Vijayanagara citadel of Chandragiri Fort and Tirupati in 3 days from Mumbai/Pune.",
    tags: [
      "Waterfalls",
      "Trekking",
      "Forests",
      "Andhra Pradesh",
      "South India",
      "Talakona",
      "Heritage",
      "National Park",
      "Nature",
      "Vijayanagara",
    ],
    country: "India",
    bestSuggestedMonth: "September – February",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Nature & Heritage",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "tlk-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Tirupati (TIR) → Chandragiri Fort Palace Citadel",
        summary:
          "Board a direct flight from Mumbai (BOM) or Pune (PNQ) to Tirupati International Airport (TIR, 1h 45m). Meet your driver and drive 30 km to Chandragiri, the 11th-century citadel that served as the final capital of the Vijayanagara Empire after the fall of Hampi. Explore the magnificent Raja Mahal (three-storied Indo-Saracenic palace built of stone and brick without timber) and the graceful Rani Mahal. Savor a traditional Rayalaseema lunch featuring Natu Kodi Biryani. In the evening, drive into the forested foothills of Sri Venkateswara National Park to check into Haritha Forest Resort Talakona.",
        activities: [
          {
            _key: "tlk1a",
            title: "Direct Flight Mumbai/Pune to Tirupati Airport (TIR)",
            description:
              "Fly into the sacred temple valley surrounded by the Seven Hills of the Eastern Ghats.",
            location: { name: "Tirupati International Airport (TIR)", lat: 13.6325, lng: 79.5433 },
            type: "transport",
          },
          {
            _key: "tlk1b",
            title: "Tour Chandragiri Fort: Raja Mahal & Rani Mahal",
            description:
              "Walk through the royal audience halls, crowned tower pavilions, and arched arcades where Vijayanagara emperors ruled and granted land for Fort St. George.",
            location: { name: "Chandragiri Fort", lat: 13.5833, lng: 79.3167 },
            type: "sightseeing",
          },
          {
            _key: "tlk1c",
            title: "Check-in at Haritha Forest Resort Talakona",
            description:
              "Settle into log cabins located right at the entrance of the reserve forest waterfall trail, surrounded by medicinal trees and wild bird calls.",
            location: { name: "Haritha Resort Talakona", lat: 13.8052, lng: 79.2152 },
            type: "accommodation",
          },
        ],
      },
      {
        _key: "tlk-d2",
        dayNumber: 2,
        title: "Talakona 270-Foot Waterfall Trek & Treetop Canopy Walk",
        summary:
          "Begin your morning trek along the gurgling mountain stream through dense mixed deciduous and evergreen forests of Sri Venkateswara National Park. This biosphere reserve is famous for endangered species like the Slender Loris, Golden Gecko, and Indian Giant Squirrel. Arrive at the base of Talakona Waterfall, where crystal waters plunge 270 feet from a sheer cliff into a natural rock pool. The water is enriched by hundreds of medicinal roots and herbs. Bathe in the refreshing spray. Afterwards, experience the 240-meter canopy rope walk suspended 40 feet high through the forest crown.",
        activities: [
          {
            _key: "tlk2a",
            title: "Hike Through Reserve Forest to Talakona Waterfall (270 ft)",
            description:
              "Trek 2 km through mossy boulder-strewn jungle trails to Andhra Pradesh\'s highest single-drop waterfall cascading into an emerald herbal pool.",
            location: { name: "Talakona Waterfalls", lat: 13.8167, lng: 79.2083 },
            type: "sightseeing",
          },
          {
            _key: "tlk2b",
            title: "Walk the 240-Meter Treetop Canopy Rope Walk",
            description:
              "Stroll along swaying suspension bridges high in the tree canopies, spotting hornbills, parakeets, and playful bonnet macaques at eye level.",
            location: { name: "Talakona Canopy Walk", lat: 13.809, lng: 79.213 },
            type: "activity",
          },
          {
            _key: "tlk2c",
            title: "Rayalaseema Thali Lunch at Forest Canteen",
            description:
              "Wholesome hot meals served with spicy gunpowder podi, ghee, tangy tomato rasam, and country chicken curry prepared by local village cooks.",
            location: { name: "Talakona Forest Canteen", lat: 13.8055, lng: 79.215 },
            type: "food",
          },
        ],
      },
      {
        _key: "tlk-d3",
        dayNumber: 3,
        title: "Lord Siddheswara Swamy Shrine, Tirupati Heritage & Return Flight",
        summary:
          "Visit the ancient Siddheswara Swamy Temple located close to the waterfall base, dedicated to Lord Shiva and surrounded by sacred groves where ancient rishis meditated. Drive back toward Tirupati town. Stop for breakfast at the iconic Minerva Coffee Shop for golden ghee roast dosas, savoury pongal, and aromatic degree filter coffee. Browse local red sandalwood and brass handicrafts at Shilparamam arts village before transferring to Tirupati International Airport (TIR) for your return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "tlk3a",
            title: "Visit Ancient Siddheswara Swamy Forest Shrine",
            description:
              "Seek quiet meditation at this 10th-century stone temple tucked into dense foliage, revered for its natural spring and timeless sanctity.",
            location: { name: "Siddheswara Swamy Temple", lat: 13.81, lng: 79.212 },
            type: "sightseeing",
          },
          {
            _key: "tlk3b",
            title: "Ghee Roast Dosa & Degree Filter Coffee at Minerva, Tirupati",
            description:
              "Indulge in crisp butter dosas, savoury ven pongal with ginger coconut chutney, and piping hot South Indian filter coffee in Tirupati.",
            location: { name: "Minerva Coffee Shop Tirupati", lat: 13.6288, lng: 79.4192 },
            type: "food",
          },
          {
            _key: "tlk3c",
            title: "Drive to Tirupati Airport (TIR) & Return Flight",
            description:
              "Take a 25-minute drive to Tirupati Airport for your nonstop flight back to Mumbai or Pune.",
            location: { name: "Tirupati International Airport (TIR)", lat: 13.6325, lng: 79.5433 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 21. Horsley Hills, Andhra Pradesh ──────────────────────────────────
  {
    _id: "trip-horsley-hills-3-days",
    title: "Horsley Hills & Kaigal Falls — Andhra's Tranquil Summer Retreat",
    slug: "horsley-hills-3-days",
    excerpt:
      "Escape to Andhra Pradesh's beloved hill station at 1,290 meters: dense fragrant eucalyptus groves, refreshing mountain breezes, windy clifftops at Gali Bandalu, the 150-year-old giant Kalyani eucalyptus tree, and hidden Kaigal Falls in 3 days from Mumbai/Pune.",
    tags: [
      "Hill Station",
      "Nature",
      "Relaxation",
      "Andhra Pradesh",
      "South India",
      "Horsley Hills",
      "Waterfalls",
      "Western Ghats",
      "Eucalyptus",
    ],
    country: "India",
    bestSuggestedMonth: "August – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Hill Station & Nature",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "hsh-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Bengaluru (BLR) → Scenic Ghat Drive to Horsley Hills (1,290m)",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Kempegowda International Airport, Bengaluru (BLR, 1.5h). Meet your private cab and embark on a picturesque 140 km road trip (3.5 hours) heading northeast through Chintamani, Rayachoti highway, and Madanapalle. Climb the winding 9 km ghat road shaded by gulmohar and jacaranda trees to reach Horsley Hills (Yenugu Mallamma Konda) at 1,290 meters altitude. Check into Haritha Hill Resort. Stroll through fragrant eucalyptus groves to Sunset Point to watch dusk settle over the plains.",
        activities: [
          {
            _key: "hsh1a",
            title: "Flight Mumbai/Pune to Bengaluru (BLR) & Drive to Horsley Hills (~140 km, 3.5h)",
            description:
              "Cross the Karnataka–Andhra border and ascend the cool, breeze-swept hills of the Annamayya district.",
            location: { name: "Bengaluru Kempegowda Airport (BLR)", lat: 13.1986, lng: 77.7066 },
            type: "transport",
          },
          {
            _key: "hsh1b",
            title: "Check-in at Haritha Hill Resort Horsley Hills",
            description:
              "Settle into cottages perched on the ridge of the plateau, surrounded by old-growth eucalyptus and gulmohar trees.",
            location: { name: "Haritha Hill Resort Horsley Hills", lat: 13.6508, lng: 78.397 },
            type: "accommodation",
          },
          {
            _key: "hsh1c",
            title: "Sunset Views from View Point Deck",
            description:
              "Watch evening colors paint the jagged hills and farming hamlets stretching across the southern plateau far below.",
            location: { name: "Horsley Hills Sunset Point", lat: 13.6535, lng: 78.3955 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "hsh-d2",
        dayNumber: 2,
        title: "Gali Bandalu Windy Rocks, 150-Year Kalyani Tree & Forest Trails",
        summary:
          "Wake up to brisk mountain air and singing bulbuls. Walk to Gali Bandalu (literally 'Windy Rocks'), an open rocky tableland where continuous mountain gusts blow at 40–50 km/h all year round. Visit the historic Governor\'s Bungalow, built in 1870 by British collector W.D. Horsley who made this hill his summer residence. Stand beneath 'Kalyani', a colossal 150-year-old eucalyptus tree with a massive trunk circumference. Sip hot herbal nilgiri tea paired with spicy punugulu and onion pakoras.",
        activities: [
          {
            _key: "hsh2a",
            title: "Experience the Gale at Gali Bandalu (Windy Rocks)",
            description:
              "Stand on the smooth, barren granite plateau where powerful breezes blow continuously, offering thrilling views of deep forested valleys.",
            location: { name: "Gali Bandalu", lat: 13.6492, lng: 78.3945 },
            type: "sightseeing",
          },
          {
            _key: "hsh2b",
            title: "Marvel at 'Kalyani' — The 150-Year-Old Giant Eucalyptus",
            description:
              "Inspect the colossal eucalyptus tree planted by W.D. Horsley in 1870, reaching towering heights with a trunk requiring multiple people to encircle.",
            location: { name: "Kalyani Eucalyptus Tree", lat: 13.652, lng: 78.3985 },
            type: "sightseeing",
          },
          {
            _key: "hsh2c",
            title: "Savor Andhra Meals with Gutti Vankaya (Stuffed Brinjal)",
            description:
              "Enjoy a flavorful lunch featuring Rayalaseema spiced stuffed baby brinjals, steaming hot rice, and spicy country chicken fry.",
            location: { name: "Haritha Hilltop Restaurant", lat: 13.651, lng: 78.3972 },
            type: "food",
          },
        ],
      },
      {
        _key: "hsh-d3",
        dayNumber: 3,
        title: "Hidden Kaigal (Dumukurallu) Waterfalls, Madanapalle & Return Flight",
        summary:
          "Descend the hill toward Palamaner to visit Kaigal Falls (Dumukurallu Waterfalls), a stunning secluded cascade where perennial forest streams tumble 40 feet over massive granite boulders inside Koundinya Wildlife Sanctuary. Enjoy a dip in the pristine rock pools. Head to Madanapalle town for lunch at a traditional military hotel. Drive back to Bengaluru Kempegowda Airport (BLR) for your evening return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "hsh3a",
            title: "Hike & Swim at Kaigal (Dumukurallu) Waterfalls",
            description:
              "Trek through lush forest along the Kaigal stream to watch water plunge over huge rock blocks into natural swimming ponds.",
            location: { name: "Kaigal Falls", lat: 13.1235, lng: 78.5833 },
            type: "sightseeing",
          },
          {
            _key: "hsh3b",
            title: "Traditional Lunch in Madanapalle",
            description:
              "Feast on authentic wood-fired biryani, peppery chicken gravy, and warm parottas at an old-school town restaurant.",
            location: { name: "Madanapalle Town", lat: 13.55, lng: 78.5 },
            type: "food",
          },
          {
            _key: "hsh3c",
            title: "Drive to Bengaluru Airport (BLR) & Return Flight",
            description:
              "Smooth 130 km highway drive back to Bengaluru International Airport (BLR) for your flight to Mumbai or Pune.",
            location: { name: "Bengaluru Kempegowda Airport (BLR)", lat: 13.1986, lng: 77.7066 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 22. Yaganti, Andhra Pradesh ────────────────────────────────────────
  {
    _id: "trip-yaganti-3-days",
    title: "Yaganti & Belum Circuit — Sacred Rock Shrines & Subterranean Caves",
    slug: "yaganti-3-days",
    excerpt:
      "Discover the ancient 15th-century Vijayanagara rock-cut temple of Yaganti with its ever-growing stone Nandi, natural cave sanctuaries of sage Agastya and Venkateswara, freshwater Pushkarini springs, and nearby Belum Caves in 3 days from Mumbai/Pune.",
    tags: [
      "Temples",
      "Heritage",
      "Caves",
      "Andhra Pradesh",
      "South India",
      "Yaganti",
      "Mystic",
      "Architecture",
      "Pilgrimage",
      "Belum Caves",
    ],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Heritage & Mysticism",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "ygt-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Hyderabad (HYD) / Kurnool (KJB) → Konda Reddy Buruju & Yaganti",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Rajiv Gandhi International Airport, Hyderabad (HYD, 1h 15m) or direct flight to Kurnool (KJB). Board your private vehicle and drive south along NH44 into the historic city of Kurnool (210 km from Hyderabad, 3.5h). Visit the iconic 12th-century Konda Reddy Buruju, a circular stone fort bastion that withstood historical sieges. Continue 75 km into the rugged Erramala mountain range through Banaganapalle to reach the sacred valley of Yaganti. Check into Haritha Hotel Yaganti and attend the evening camphor aarti.",
        activities: [
          {
            _key: "ygt1a",
            title: "Flight Mumbai/Pune to Hyderabad (HYD) & Drive South (~210 km, 3.5h)",
            description:
              "Fly into Hyderabad and cruise down the smooth NH44 highway through Telangana into Andhra Pradesh\'s Rayalaseema gateway.",
            location: { name: "Hyderabad Rajiv Gandhi Airport (HYD)", lat: 17.2403, lng: 78.4294 },
            type: "transport",
          },
          {
            _key: "ygt1b",
            title: "Visit Historic Konda Reddy Buruju Bastion, Kurnool",
            description:
              "Explore the ancient multi-tiered stone fortification and watchtower that guarded the Tungabhadra River basin during the Vijayanagara era.",
            location: { name: "Konda Reddy Buruju Kurnool", lat: 15.8281, lng: 78.0373 },
            type: "sightseeing",
          },
          {
            _key: "ygt1c",
            title: "Check-in at Haritha Hotel Yaganti & Evening Temple Aarti",
            description:
              "Arrive at the foot of craggy granite bluffs to stay at the state tourism hotel opposite the temple. Witness the evening lamp offering.",
            location: { name: "Haritha Hotel Yaganti", lat: 15.3486, lng: 78.1364 },
            type: "accommodation",
          },
        ],
      },
      {
        _key: "ygt-d2",
        dayNumber: 2,
        title: "Mystical Yaganti Uma Maheswara Shrine, Growing Nandi & Cave Sanctuaries",
        summary:
          "Spend an immersive day exploring Sri Yaganti Uma Maheswara Temple, built in the 15th century by King Harihara Bukka Raya of the Vijayanagara Empire. Marvel at the colossal monolithic Nandi idol, which the Archaeological Survey of India has confirmed is steadily growing by roughly 1 inch every 20 years. Take a holy dip in the crystal Pushkarini, where perennial natural mountain spring water cascades out of a sculpted stone Nandi mouth whose source remains an unsolved mystery. Climb 120 stone steps into the deep Agastya Cave and Venkateswara Cave nestled in the sheer cliff faces.",
        activities: [
          {
            _key: "ygt2a",
            title: "Worship at Yaganti Uma Maheswara Temple & The Growing Nandi",
            description:
              "Witness the famous monolithic Nandi bull idol that has grown so large that surrounding stone pillars had to be relocated, and the unique single-stone Shiva-Parvati idol.",
            location: { name: "Yaganti Temple", lat: 15.349, lng: 78.137 },
            type: "sightseeing",
          },
          {
            _key: "ygt2b",
            title: "Dip in the Sacred Pushkarini Holy Tank",
            description:
              "Bathe in the sweet, crystal-clear spring water flowing year-round into the royal bathing tank from secret underground mountain fissures.",
            location: { name: "Yaganti Pushkarini", lat: 15.3488, lng: 78.1368 },
            type: "sightseeing",
          },
          {
            _key: "ygt2c",
            title: "Climb Steep Stone Steps to Agastya & Venkateswara Caves",
            description:
              "Ascend narrow cliffside flights of stairs into the ancient meditation cave of Sage Agastya and the massive Venkateswara cave sanctuary with sweeping gorge vistas.",
            location: { name: "Agastya Cave Yaganti", lat: 15.3505, lng: 78.1385 },
            type: "activity",
          },
          {
            _key: "ygt2d",
            title: "Traditional Temple Prasadam & Rayalaseema Feast",
            description:
              "Relish sacred tamarind Pulihora with roasted peanuts, sweet Pongal, followed by authentic Jowar rotis and spicy brinjal curry in town.",
            location: { name: "Yaganti Temple Dining Hall", lat: 15.3485, lng: 78.1365 },
            type: "food",
          },
        ],
      },
      {
        _key: "ygt-d3",
        dayNumber: 3,
        title: "Banaganapalle Heritage, Belum Subterranean Caves & Return to Hyderabad",
        summary:
          "Check out and drive 15 km through the historic Nawabi town of Banaganapalle, origin of the legendary GI-tagged Benishan (Banganapalle) mango and the summer palace of the Nawabs. Continue 45 km to the vast subterranean labyrinth of Belum Caves. Explore massive stalactite chambers, the deep Pataalaganga river chamber, and ancient Jain and Buddhist meditation relics. Enjoy a hot Andhra lunch before driving back along NH44 to Hyderabad Airport for your return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "ygt3a",
            title: "Drive Through Banaganapalle Mango Groves & Nawabi Palace",
            description:
              "Pass through the historic seat of the Banaganapalle princely state, famous for its royal orchards and rich agricultural heritage.",
            location: { name: "Banaganapalle Town", lat: 15.3167, lng: 78.2333 },
            type: "sightseeing",
          },
          {
            _key: "ygt3b",
            title: "Explore the Subterranean Chambers of Belum Caves",
            description:
              "Wander through 1.5 km of subterranean limestone tunnels, cavernous domes, and mysterious underground streams 150 feet below ground.",
            location: { name: "Belum Caves", lat: 15.1026, lng: 78.1118 },
            type: "sightseeing",
          },
          {
            _key: "ygt3c",
            title: "Drive to Hyderabad Airport (HYD) & Return Flight",
            description:
              "Drive north via Kurnool on NH44 directly to Rajiv Gandhi International Airport, Hyderabad (HYD) for your evening flight back to Mumbai or Pune.",
            location: { name: "Hyderabad Rajiv Gandhi Airport (HYD)", lat: 17.2403, lng: 78.4294 },
            type: "transport",
          },
        ],
      },
    ],
  },
  // ── 23. Anegundi, Karnataka ───────────────────────────────────────────
  {
    _id: "trip-anegundi-3-days",
    title: "Anegundi — Mythological Kishkindha & Boulder Biking Across Hampi",
    slug: "anegundi-3-days",
    excerpt:
      "Cross the sacred Tungabhadra into the mythological monkey kingdom of Kishkindha: climb Anjanadri Hill (Hanuman's birthplace) for epic sunrises, cliff jump into turquoise Sanapur Lake, cycle past 14th-century Vijayanagara aqueducts, and meet banana-fiber artisans in 3 days from Mumbai/Pune.",
    tags: [
      "Heritage",
      "Mythology",
      "Bouldering",
      "Karnataka",
      "South India",
      "Anegundi",
      "Hampi",
      "Nature",
      "Lakes",
      "Temples",
    ],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Heritage & Adventure",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "ang-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Hubballi (HBX) / Hospet → Drive to Anegundi & Sanapur Lake Sunset",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Hubballi / Hubli (HBX, 1h 15m) or Jindal Vijayanagar Airport (VDY, 40 km). Alternatively, board an overnight sleeper train or private luxury bus to Hosapete / Hospet (18 km from Anegundi). Drive across the Tungabhadra River over the modern bridge past Bukka's stone aqueduct into the peaceful heritage village of Anegundi. Check into Uramma Heritage Homes or Kishkinda Resort. In the afternoon, rent a moped or bicycle to explore Sanapur Lake, drifting on round wicker coracle boats between giant balancing red granite boulders at sunset.",
        activities: [
          {
            _key: "ang1a",
            title: "Flight Mumbai/Pune to Hubli (HBX) & Scenic Drive (~140 km, 3h)",
            description:
              "Arrive at Hubli and drive east through Karnataka's Deccan plains past sunflower fields and granite monoliths into the boulder-strewn landscape of Kishkindha.",
            location: { name: "Hubli Airport (HBX)", lat: 15.3617, lng: 75.0849 },
            type: "transport",
          },
          {
            _key: "ang1b",
            title: "Check-in at Uramma Heritage Homes, Anegundi",
            description:
              "Settle into a beautifully restored 150-year-old traditional home with stone courtyards and wooden carved pillars in the historic village.",
            location: { name: "Uramma Heritage Homes Anegundi", lat: 15.3533, lng: 76.4958 },
            type: "accommodation",
          },
          {
            _key: "ang1c",
            title: "Coracle Boat Ride & Sunset at Sanapur Lake",
            description:
              "Glide on traditional round woven coracles across the calm turquoise waters of Sanapur Lake surrounded by colossal balancing granite rock formations.",
            location: { name: "Sanapur Lake", lat: 15.3644, lng: 76.4592 },
            type: "activity",
          },
          {
            _key: "ang1d",
            title: "Riverside Dinner at Laughing Buddha Cafe",
            description:
              "Relax on colorful floor cushions overlooking the boulder fields and the Tungabhadra river, enjoying wood-fired pizzas and fresh fruit juices.",
            location: { name: "Laughing Buddha Cafe", lat: 15.348, lng: 76.471 },
            type: "food",
          },
        ],
      },
      {
        _key: "ang-d2",
        dayNumber: 2,
        title: "Anjanadri Hill Dawn Ascent, Kishkinda Crafts & Pampa Sarovar",
        summary:
          "Rise before daybreak to climb the 575 white stone steps of Anjanadri Hill, revered as the birthplace of Lord Hanuman. Reach the hilltop temple just as the golden sun breaks over the horizon, illuminating an infinite surreal landscape of rugged granite hills, emerald paddy fields, and winding canals. Descend for a wholesome breakfast at The Kishkinda Trust cafe. Visit the sacred Pampa Sarovar lotus pond and the ancient 14th-century Durga Temple. In the afternoon, watch skilled village women turn wild banana pseudostems into eco-friendly bags, mats, and baskets.",
        activities: [
          {
            _key: "ang2a",
            title: "Dawn Ascent of Anjanadri Hill (Hanuman's Birthplace)",
            description:
              "Climb 575 stone steps up the sacred hill to experience one of India's most breathtaking 360-degree sunrise panoramas across Kishkindha.",
            location: { name: "Anjanadri Hill", lat: 15.3542, lng: 76.4725 },
            type: "sightseeing",
          },
          {
            _key: "ang2b",
            title: "Visit Sacred Pampa Sarovar & Lakshmi Temple",
            description:
              "Worship at one of the five sacred sarovars mentioned in Hindu epics, nestled in a hidden valley surrounded by towering boulders and lotus blossoms.",
            location: { name: "Pampa Sarovar", lat: 15.3585, lng: 76.477 },
            type: "sightseeing",
          },
          {
            _key: "ang2c",
            title: "Banana Fiber Craft Workshop at The Kishkinda Trust",
            description:
              "Witness sustainable rural artisan craftwork transforming organic agricultural waste into exquisite world-class homeware and accessories.",
            location: { name: "The Kishkinda Trust Anegundi", lat: 15.3528, lng: 76.4952 },
            type: "activity",
          },
        ],
      },
      {
        _key: "ang-d3",
        dayNumber: 3,
        title: "Chintamani Rock Temple, Navabrindavana Island & Return to Hubballi",
        summary:
          "Visit the riverside Chintamani Temple complex, where Lord Rama is believed to have met Sugriva and shot the arrow at Vali, marked by ancient footprint carvings. Board a country boat across the river rapids to Navabrindavana, a sacred island housing the samadhis of nine prominent Dvaita saints, including Sri Vyasaraja. Savor a traditional North Karnataka Jolada Rotti lunch with peanut chutney and curd. Transfer to Hubballi Airport (HBX) or Hosapete station for your return journey to Mumbai or Pune.",
        activities: [
          {
            _key: "ang3a",
            title: "Chintamani Temple & Historic Tungabhadra Ghat",
            description:
              "Explore ancient rock-cut cave shelters, bow-and-arrow stone carvings, and quiet stone ghats overlooking the sacred river.",
            location: { name: "Chintamani Temple Anegundi", lat: 15.3512, lng: 76.4975 },
            type: "sightseeing",
          },
          {
            _key: "ang3b",
            title: "Boat Crossing to Navabrindavana Island",
            description:
              "Cross the river to this secluded, peaceful rocky island in the middle of the Tungabhadra, venerated for centuries by pilgrims.",
            location: { name: "Navabrindavana Island", lat: 15.3465, lng: 76.4925 },
            type: "sightseeing",
          },
          {
            _key: "ang3c",
            title: "Drive to Hubballi Airport (HBX) & Return Flight",
            description:
              "Drive 140 km back to Hubli Airport for your nonstop flight back to Mumbai or Pune.",
            location: { name: "Hubli Airport (HBX)", lat: 15.3617, lng: 75.0849 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 24. Yana Rocks, Karnataka ──────────────────────────────────────────
  {
    _id: "trip-yana-rocks-3-days",
    title: "Yana Rocks & Vibhooti Falls — Karst Monoliths in the Sahyadri Canopies",
    slug: "yana-rocks-3-days",
    excerpt:
      "Hike beneath the towering black crystalline limestone spires of Bhairaveshwara (120m) and Mohini Shikhara in the deep Western Ghats rainforest, swim in the tiered emerald pools of Vibhooti Falls, and explore historic Mirjan Fort in 3 days from Mumbai/Pune.",
    tags: [
      "Monoliths",
      "Geology",
      "Western Ghats",
      "Karnataka",
      "South India",
      "Yana Rocks",
      "Waterfalls",
      "Trekking",
      "Nature",
      "Caves",
    ],
    country: "India",
    bestSuggestedMonth: "September – February",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Adventure & Nature",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "ynr-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Goa (GOI/GOX) / Hubballi (HBX) → Drive to Kumta / Yana Rainforest Base",
        summary:
          "Fly from Mumbai (BOM) or Pune (PNQ) to Goa Dabolim/Mopa Airport (160 km) or Hubballi Airport (HBX, 145 km). Alternatively, board an overnight train directly to Kumta Railway Station. Meet your cab and drive down the scenic coastal NH66 corridor, turning inland into the Sahyadri mountains of Uttara Kannada. Check into a serene rainforest lodge near Yana or a beachfront villa in Gokarna. Enjoy a peaceful evening listening to jungle cicadas and sipping hot ginger kokum brew.",
        activities: [
          {
            _key: "ynr1a",
            title: "Flight Mumbai/Pune to Goa / Hubli & Drive to Kumta (~150 km, 3.5h)",
            description:
              "Scenic drive through the Western Ghats foothills passing estuaries, teak forests, and coastal betel nut plantations.",
            location: { name: "Kumta", lat: 14.4258, lng: 74.4172 },
            type: "transport",
          },
          {
            _key: "ynr1b",
            title: "Check-in at Yana Wilderness Resort & Camps",
            description:
              "Unwind in rustic eco-cottages surrounded by towering evergreen canopies, wild bamboo groves, and mountain streams.",
            location: { name: "Yana Foothills", lat: 14.522, lng: 74.568 },
            type: "accommodation",
          },
          {
            _key: "ynr1c",
            title: "Traditional Malnad Jolada Rotti & Ennegai Dinner",
            description:
              "Feast on hand-patted jowar rotis with spicy stuffed brinjal curry, garlic chutney, and freshly extracted buttermilk.",
            location: { name: "Yana Valley Forest Canteen", lat: 14.525, lng: 74.565 },
            type: "food",
          },
        ],
      },
      {
        _key: "ynr-d2",
        dayNumber: 2,
        title: "Trek to Yana Karst Monoliths, Bhairaveshwara Cave Shrine & Vibhooti Falls",
        summary:
          "Start your morning hike through dense semi-evergreen jungle to the base of the two colossal karst limestone monoliths: Bhairaveshwara Shikhara (120 meters tall) and Mohini Shikhara (90 meters tall), rising dramatically out of the green canopy. Walk barefoot into the cool subterranean cave temple carved into the solid rock base, where natural spring water perpetually trickles over a self-manifested Shiva lingam. Circle the rock monolith through natural cave arches. In the afternoon, drive 10 km to Vibhooti Falls and take a refreshing dip in its crystal-clear tiered limestone rock pools.",
        activities: [
          {
            _key: "ynr2a",
            title: "Rainforest Hike to Bhairaveshwara & Mohini Shikhara Monoliths",
            description:
              "Walk shaded stone pathways between the soaring black limestone geological wonders sculpted by millions of years of wind and rain.",
            location: { name: "Yana Rocks", lat: 14.5276, lng: 74.5615 },
            type: "sightseeing",
          },
          {
            _key: "ynr2b",
            title: "Worship at the Natural Cave Shrine of Lord Shiva",
            description:
              "Enter the cathedral-like limestone cavern to witness the Chandi stream dripping steadily from the cavern roof onto the lingam.",
            location: { name: "Yana Cave Temple", lat: 14.5278, lng: 74.5618 },
            type: "sightseeing",
          },
          {
            _key: "ynr2c",
            title: "Swim in the Tiered Pools of Vibhooti Falls",
            description:
              "Trek through bamboo glades to these secluded tiered waterfalls where water flows over smooth limestone rocks into natural plunge pools.",
            location: { name: "Vibhooti Falls", lat: 14.5516, lng: 74.6366 },
            type: "activity",
          },
        ],
      },
      {
        _key: "ynr-d3",
        dayNumber: 3,
        title: "Historic 16th-Century Mirjan Fort, Apsarakonda & Return Flight",
        summary:
          "Drive 30 km toward the coast to explore Mirjan Fort, the historic 16th-century laterite citadel built by Queen Chennabhairadevi (the 'Pepper Queen' of Gersoppa). Walk along high moss-covered ramparts, double-walled watchtowers, and deep moats. Continue south to Apsarakonda, where a sweet mountain cascade plunges into a natural pond overlooking the Arabian Sea beach. Enjoy fresh seafood in Kumta or Gokarna before transferring to Goa or Hubli Airport for your evening return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "ynr3a",
            title: "Explore the Citadel Ramparts of Mirjan Fort",
            description:
              "Walk through ancient stone arches, royal courtyards, and secret escape passages of this fairytale castle surrounded by coconut groves.",
            location: { name: "Mirjan Fort", lat: 14.4942, lng: 74.4217 },
            type: "sightseeing",
          },
          {
            _key: "ynr3b",
            title: "Visit Apsarakonda Pond & Marine Beach Viewpoint",
            description:
              "Discover this cliffside haven where mythological nymphs were believed to bathe, offering magnificent ocean views from clifftop gardens.",
            location: { name: "Apsarakonda Falls", lat: 14.3417, lng: 74.4444 },
            type: "sightseeing",
          },
          {
            _key: "ynr3c",
            title: "Drive to Goa Airport (GOI/GOX) & Return Flight",
            description:
              "Smooth drive north along NH66 directly to Goa Airport for your flight back to Mumbai or Pune.",
            location: { name: "Goa Dabolim Airport (GOI)", lat: 15.3808, lng: 73.8314 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 25. Agumbe, Karnataka ──────────────────────────────────────────────
  {
    _id: "trip-agumbe-3-days",
    title: "Agumbe — Rainforest Trails, Arabian Sea Sunsets & Malgudi Days",
    slug: "agumbe-3-days",
    excerpt:
      "Venture into the 'Cherrapunji of the South': track king cobras with herpetologists at the Rainforest Research Station, stay in the 130-year-old 'Malgudi Days' heritage house at Doddamane, watch Arabian Sea sunsets from the 14th hairpin bend, and climb 850ft Barkana Falls in 3 days from Mumbai/Pune.",
    tags: [
      "Rainforest",
      "Monsoon",
      "Waterfalls",
      "Karnataka",
      "South India",
      "Agumbe",
      "King Cobra",
      "Western Ghats",
      "Malgudi Days",
      "Heritage",
    ],
    country: "India",
    bestSuggestedMonth: "July – February",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Rainforest & Heritage",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "agb-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Mangaluru (IXE) / Shivamogga → Ascend Someshwara Ghats to Agumbe",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Mangaluru International Airport (IXE, 1h 25m) or Shivamogga Airport (RQY, 90 km). Meet your cab and drive through coastal palm country, ascending the legendary Someshwara Ghat through 14 hairpin bends into the cloud forest of Agumbe at 825m elevation. Check into the historic 130-year-old Doddamane (the authentic mansion from R.K. Narayan's 'Malgudi Days'). In the evening, head to Sunset Point on the ghat edge to watch the glowing sunset sink directly into the distant Arabian Sea.",
        activities: [
          {
            _key: "agb1a",
            title: "Flight Mumbai/Pune to Mangaluru (IXE) & Ghat Climb (~100 km, 2.5h)",
            description:
              "Drive from coastal Mangalore ascending the dramatic Western Ghats through Someshwara Wildlife Sanctuary into the wettest rainforest in South India.",
            location: { name: "Mangalore Airport (IXE)", lat: 12.9613, lng: 74.8901 },
            type: "transport",
          },
          {
            _key: "agb1b",
            title: "Check-in at Doddamane Heritage Homestay (Malgudi Days House)",
            description:
              "Step into cinematic history in this 130-year-old wooden ancestral home with open stone courtyards, operated with heartwarming warmth by Kasturi Akka.",
            location: { name: "Doddamane Agumbe", lat: 13.5042, lng: 75.0939 },
            type: "accommodation",
          },
          {
            _key: "agb1c",
            title: "Arabian Sea Sunset from the 14th Hairpin Bend",
            description:
              "Watch panoramic views of coastal valleys and the horizon where on clear days the golden waters of the Arabian Sea shimmer 40 km away.",
            location: { name: "Agumbe Sunset Point", lat: 13.5005, lng: 75.0875 },
            type: "sightseeing",
          },
          {
            _key: "agb1d",
            title: "Unlimited Malnad Brahmin Feast & Kashaya",
            description:
              "Dine on banana leaves inside Doddamane, enjoying steaming rice, Majjige Huli, Jackfruit payasa, and the secret medicinal Kashaya herbal infusion.",
            location: { name: "Doddamane Dining Hall", lat: 13.5043, lng: 75.094 },
            type: "food",
          },
        ],
      },
      {
        _key: "agb-d2",
        dayNumber: 2,
        title: "Agumbe Rainforest Research Station (ARRS) & Onake Abbi Falls Trek",
        summary:
          "Start your morning with a guided ecology walk at the Agumbe Rainforest Research Station (ARRS), founded by legendary herpetologist Romulus Whitaker. Learn about the biology and telemetry tracking of the world's longest venomous snake, the King Cobra. Afternoon trek through virgin rainforest canopies of cane, cinnamon, and wild nutmeg to Onake Abbi Falls, where the river plunges 500 feet into a circular granite rock pool. Experience evening night walks around forest clearings to observe glowing bioluminescent fungi and endemic tree frogs.",
        activities: [
          {
            _key: "agb2a",
            title: "Canopy Ecology Walk at Agumbe Rainforest Research Station",
            description:
              "Walk with resident naturalists learning about rainforest ecology, rainfall gauging, telemetry tracking, and king cobra conservation.",
            location: { name: "Agumbe Rainforest Research Station (ARRS)", lat: 13.518, lng: 75.088 },
            type: "activity",
          },
          {
            _key: "agb2b",
            title: "Trek Through Rainforest to Onake Abbi Waterfalls",
            description:
              "Hike down 4 km through moss-draped evergreen forest along ancient boulder paths to view the single-drop cascade booming into the canyon.",
            location: { name: "Onake Abbi Falls", lat: 13.5125, lng: 75.0745 },
            type: "sightseeing",
          },
          {
            _key: "agb2c",
            title: "Evening Guided Night Walk for Bioluminescent Fungi",
            description:
              "Turn off torches in the dense jungle to watch rotting wood logs glow neon green with natural bioluminescence.",
            location: { name: "Someshwara Rainforest Buffer", lat: 13.515, lng: 75.085 },
            type: "activity",
          },
        ],
      },
      {
        _key: "agb-d3",
        dayNumber: 3,
        title: "Kundadri Peak 17th-Century Jain Basadi, Barkana Falls & Return Flight",
        summary:
          "Drive up the winding single-lane mountain road to Kundadri Hill (3,200 feet), crowned by a 17th-century Jain basadi dedicated to Parshvanatha with stone ponds carved into solid rock. Gaze across an unbroken sea of clouds covering the Sahyadri mountains. Stop at Barkana Falls viewpoint to marvel at India's 10th-highest waterfall plunging 850 feet through dense forest. Relish Kotte Kadubu steamed in jackfruit leaves at Thirthahalli before driving to Mangaluru Airport (IXE) for your return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "agb3a",
            title: "Ascend to Kundadri Hill 17th-Century Jain Basadi (3,200 ft)",
            description:
              "Visit this ancient granite temple poised dramatically on the peak with sheer cliffs, rock pools, and 360-degree vistas of the Western Ghats canopy.",
            location: { name: "Kundadri Peak", lat: 13.5578, lng: 75.1689 },
            type: "sightseeing",
          },
          {
            _key: "agb3b",
            title: "Barkana Falls 850-Foot Rainforest Cataract View",
            description:
              "View the thunderous 260-meter drop of the Seetha River crashing through untouched evergreen valleys.",
            location: { name: "Barkana Falls Viewpoint", lat: 13.5189, lng: 75.1228 },
            type: "sightseeing",
          },
          {
            _key: "agb3c",
            title: "Drive to Mangalore Airport (IXE) & Return Flight",
            description:
              "Descend the ghats to Mangalore International Airport for your direct evening flight back to Mumbai or Pune.",
            location: { name: "Mangalore Airport (IXE)", lat: 12.9613, lng: 74.8901 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 26. Chelavara Falls, Coorg, Karnataka ──────────────────────────────
  {
    _id: "trip-chelavara-falls-3-days",
    title: "Chelavara Falls & Chomabetta — Coorg's Hidden Cascades & Cloud Ridges",
    slug: "chelavara-falls-3-days",
    excerpt:
      "Discover Coorg's most secluded natural wonder: walk through emerald coffee and cardamom estates to Chelavara Falls cascading over tortoise-shell rock, trek the windswept Chomabetta ridge on the Kerala border, tour the 18th-century royal hideout at Nalknad Palace, and savor authentic Kodava Pandi Curry in 3 days from Mumbai/Pune.",
    tags: [
      "Waterfalls",
      "Coffee",
      "Coorg",
      "Karnataka",
      "South India",
      "Chelavara Falls",
      "Trekking",
      "Kodava Cuisine",
      "Nature",
      "Hills",
    ],
    country: "India",
    bestSuggestedMonth: "August – February",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Coffee Hills & Trekking",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "clv-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Kannur (CNN) / Mysuru → Virajpet & Chelavara Coffee Country",
        summary:
          "Board an early flight from Mumbai (BOM) or Pune (PNQ) to Kannur International Airport (CNN, 75 km, 2h) or Mysuru Airport (MYQ, 130 km). Enjoy a picturesque road trip climbing the lush Western Ghats into South Coorg's Virajpet coffee country. Drive through shade-grown Arabica coffee and black pepper estates to Cheyyandane. Check into Kabbe Holidays Homestay or The Tamara Coorg. Stroll through the estate trails listening to hornbills and savor dinner featuring authentic Kodava Pandi Curry with steamed rice Kadambuttu.",
        activities: [
          {
            _key: "clv1a",
            title: "Flight Mumbai/Pune to Kannur (CNN) & Ghat Drive to Coorg (~75 km, 2h)",
            description:
              "Cross the Kerala–Karnataka mountain border through mist-covered rainforest ghats into the coffee-growing heartland of Kodagu.",
            location: { name: "Kannur International Airport (CNN)", lat: 11.9175, lng: 75.5481 },
            type: "transport",
          },
          {
            _key: "clv1b",
            title: "Check-in at Kabbe Holidays Homestay",
            description:
              "Settle into a cozy estate homestay perched on the edge of the Kabbe mountain ridge overlooking deep valleys and coffee plantations.",
            location: { name: "Kabbe Holidays Cheyyandane", lat: 12.2185, lng: 75.792 },
            type: "accommodation",
          },
          {
            _key: "clv1c",
            title: "Authentic Kodava Pandi Curry & Kadambuttu Dinner",
            description:
              "Feast on the signature culinary heritage of Coorg: pork slow-cooked with dark roasted spices and tart wild Kachampuli vinegar, paired with soft rice dumplings.",
            location: { name: "Kabbe Ridge Homestyle Kitchen", lat: 12.218, lng: 75.7915 },
            type: "food",
          },
        ],
      },
      {
        _key: "clv-d2",
        dayNumber: 2,
        title: "Chelavara Falls Tortoise Rock Cascade & Chomabetta Ridge Trek",
        summary:
          "Hike down a shaded forest path between coffee bushes to Chelavara Falls (known locally as Emirepaare or 'Tortoise Rock'). The perennial stream rushes down a 150-foot curved, smooth granite dome resembling the shell of a giant tortoise, splashing into an emerald pool shrouded in morning mist. Continue by 4x4 jeep to the base of Chomabetta (Kabbe Hills) and trek along the windswept mountain ridge separating Karnataka from Kerala. Experience panoramic views of the Arabian Sea coastline in the far distance and the endless undulating ridges of Wayanad below.",
        activities: [
          {
            _key: "clv2a",
            title: "Explore Chelavara Falls (Emirepaare)",
            description:
              "Stand before the spectacular natural waterfall tumbling down a massive curved rock dome enveloped by cardamom plants and misty spray.",
            location: { name: "Chelavara Falls", lat: 12.2158, lng: 75.7874 },
            type: "sightseeing",
          },
          {
            _key: "clv2b",
            title: "Trek the Windswept Ridge of Chomabetta (Kabbe Hills)",
            description:
              "Hike the crest along the state border where gusty mountain winds blow across rolling grasslands with vistas extending to the Kerala coastline.",
            location: { name: "Chomabetta Peak", lat: 12.2045, lng: 75.798 },
            type: "activity",
          },
          {
            _key: "clv2c",
            title: "Coffee Plantation Tour & Fresh Peaberry Tasting",
            description:
              "Walk through shaded estate pathways learning how Arabica and Robusta beans are picked, pulped, and roasted to perfection.",
            location: { name: "Cheyyandane Coffee Estate", lat: 12.222, lng: 75.785 },
            type: "activity",
          },
        ],
      },
      {
        _key: "clv-d3",
        dayNumber: 3,
        title: "Historic Nalknad Palace, Padi Igguthappa Temple & Return Flight",
        summary:
          "Visit the historic Nalknad Palace in Kakkabe, an 18th-century two-storied royal retreat built in 1792 by Kodava King Dodda Veerarajendra as a secret hideout against British and Tipu Sultan's forces, featuring ancient wall frescoes. Seek blessings at Padi Igguthappa Temple, the chief shrine of the rain deity venerated by the Kodava clan. Stop in Virajpet for crispy Akki Rotti with sesame chutney before transferring to Kannur Airport (CNN) or Mysuru for your return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "clv3a",
            title: "Tour the 18th-Century Nalknad Palace Citadel",
            description:
              "Inspect carved wooden pillars, royal sleeping chambers, and preserved battlements of this historic palace tucked into the foothills of Tadiandamol.",
            location: { name: "Nalknad Palace", lat: 12.2475, lng: 75.7289 },
            type: "sightseeing",
          },
          {
            _key: "clv3b",
            title: "Worship at Ancient Padi Igguthappa Temple",
            description:
              "Visit the sacred shrine dedicated to Lord Subrahmanya, revered as the provider of bountiful rains and grain harvests across Kodagu.",
            location: { name: "Padi Igguthappa Temple", lat: 12.2742, lng: 75.7486 },
            type: "sightseeing",
          },
          {
            _key: "clv3c",
            title: "Drive to Kannur Airport (CNN) & Return Flight",
            description:
              "Scenic 2-hour drive descending the Western Ghats to Kannur Airport for your direct flight back to Mumbai or Pune.",
            location: { name: "Kannur International Airport (CNN)", lat: 11.9175, lng: 75.5481 },
            type: "transport",
          },
        ],
      },
    ],
  },

  // ── 27. Gopalaswamy Betta, Karnataka ───────────────────────────────────
  {
    _id: "trip-gopalaswamy-betta-3-days",
    title: "Himavad Gopalaswamy Betta & Bandipur — Mist Shrines & Tiger Corridors",
    slug: "gopalaswamy-betta-3-days",
    excerpt:
      "Ascend the mist-swathed summit of Gopalaswamy Betta (1,450m) to worship at the 14th-century Venugopala Swamy Temple amidst wandering wild elephants, take 4x4 open-jeep safaris inside Bandipur Tiger Reserve, and drive past Gundlupet sunflower fields in 3 days from Mumbai/Pune.",
    tags: [
      "Mist Peak",
      "Wildlife",
      "Tiger Reserve",
      "Karnataka",
      "South India",
      "Gopalaswamy Betta",
      "Bandipur",
      "Temples",
      "Safaris",
      "Elephants",
    ],
    country: "India",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    currency: "INR",
    tripType: "Wildlife & Heritage",
    readingTime: 7,
    _createdAt: "2026-09-17T00:00:00Z",
    _updatedAt: "2026-09-17T00:00:00Z",
    coverImage: undefined,
    itinerary: [
      {
        _key: "gsb-d1",
        dayNumber: 1,
        title: "Mumbai/Pune → Mysuru (MYQ) / Bengaluru → Gundlupet Sunflower Fields & Bandipur",
        summary:
          "Board a direct flight from Mumbai (BOM) or Pune (PNQ) to Mysuru Airport (MYQ, 75 km, 1.5h) or Bengaluru Kempegowda Airport (BLR, 235 km). Take a private vehicle heading south along NH766 through historic Nanjangud and the vibrant golden sunflower and marigold fields of Gundlupet. Arrive at the southern boundary of Karnataka and check into Bandipur Safari Lodge or The Serai Bandipur. In the late afternoon, embark on your first 4x4 open-top safari inside Bandipur Tiger Reserve to spot Asiatic wild elephants, gaur, chital herds, and elusive leopards.",
        activities: [
          {
            _key: "gsb1a",
            title: "Flight Mumbai/Pune to Mysuru (MYQ) & Drive to Bandipur (~75 km, 1.5h)",
            description:
              "Scenic drive through southern Karnataka countryside past sunflower fields into the Nilgiri Biosphere Reserve.",
            location: { name: "Mysore Airport (MYQ)", lat: 12.2294, lng: 76.6547 },
            type: "transport",
          },
          {
            _key: "gsb1b",
            title: "Check-in at Bandipur Safari Lodge (JLR)",
            description:
              "Settle into eco-friendly cottages bordered by scrub jungle, where spotted deer and wild peacocks roam freely on the lawns.",
            location: { name: "Bandipur Safari Lodge", lat: 11.666, lng: 76.633 },
            type: "accommodation",
          },
          {
            _key: "gsb1c",
            title: "Evening 4x4 Open-Top Jungle Safari in Bandipur",
            description:
              "Traverse deep bamboo thickets and teak forests with government naturalist guides tracking tigers, sloth bears, and herds of wild elephants.",
            location: { name: "Bandipur Tiger Reserve", lat: 11.655, lng: 76.628 },
            type: "activity",
          },
          {
            _key: "gsb1d",
            title: "Jungle Lodges Buffet Dinner by the Campfire",
            description:
              "Relish hot Bisi Bele Bath with boondi, Mysore rasam, and spicy chicken sukka around a crackling outdoor bonfire.",
            location: { name: "Bandipur Safari Lodge Dining Hall", lat: 11.6662, lng: 76.6332 },
            type: "food",
          },
        ],
      },
      {
        _key: "gsb-d2",
        dayNumber: 2,
        title: "Dawn Ascent to Himavad Gopalaswamy Betta & Venugopala Swamy Temple",
        summary:
          "Rise early to reach the Hangala forest checkpost. Board the designated KSRTC forest shuttle bus climbing the winding ghat road through dense mist to the summit of Himavad Gopalaswamy Betta (1,450m), the highest peak in Bandipur National Park. 'Himavad' refers to the heavy veil of mist and fog that envelops the hill throughout the year. Enter the ancient 14th-century Hoysala-era Venugopala Swamy Temple, where Lord Krishna plays his flute under the sacred gopuram. Walk along the fenced perimeter to watch wild elephant herds grazing on the vast grassy shola slopes. Return to the lodge for an afternoon wildlife safari.",
        activities: [
          {
            _key: "gsb2a",
            title: "Ascent into the Mists of Gopalaswamy Betta (1,450m)",
            description:
              "Ride the forest shuttle up through swirling white fog and brisk mountain air to the cloud-covered mountain crest.",
            location: { name: "Himavad Gopalaswamy Betta", lat: 11.7222, lng: 76.5764 },
            type: "sightseeing",
          },
          {
            _key: "gsb2b",
            title: "Worship at 700-Year-Old Venugopala Swamy Temple",
            description:
              "Marvel at the stone carvings and sanctum of Lord Venugopala Swamy built in 1315 AD by King Chola Ballala of the Hoysala dynasty.",
            location: { name: "Venugopala Swamy Temple", lat: 11.7224, lng: 76.5766 },
            type: "sightseeing",
          },
          {
            _key: "gsb2c",
            title: "Wild Elephant Spotting on Shola Grasslands",
            description:
              "Scan the rolling emerald valleys below the temple where herds of wild Asiatic elephants emerge from the forest to feed on mountain bamboo.",
            location: { name: "Gopalaswamy Viewpoint", lat: 11.7215, lng: 76.5755 },
            type: "sightseeing",
          },
        ],
      },
      {
        _key: "gsb-d3",
        dayNumber: 3,
        title: "Historic Nanjangud Srikanteshwara Temple, Mysore Pak & Return Flight",
        summary:
          "After a morning birdwatching walk around the lodge, drive north toward Mysuru. Stop at the ancient temple town of Nanjangud on the banks of the sacred Kapila River. Visit the monumental Srikanteshwara (Nanjundeshwara) Temple, one of the largest temple complexes in Karnataka with a colossal 9-tiered gopuram. Taste royal GI-tagged fragrant Nanjangud Rasabale bananas and authentic pure ghee Mysore Pak. Drive to Mysuru Airport (MYQ) or Bengaluru (BLR) for your evening return flight to Mumbai or Pune.",
        activities: [
          {
            _key: "gsb3a",
            title: "Explore Monumental Srikanteshwara Temple, Nanjangud",
            description:
              "Tour the ancient 'Dakshina Kashi' shrine renowned for its massive Dravidian gopuram, 100 stone pillars, and sacred Kapila river bathing ghats.",
            location: { name: "Nanjangud Srikanteshwara Temple", lat: 12.1189, lng: 76.6853 },
            type: "sightseeing",
          },
          {
            _key: "gsb3b",
            title: "Taste Nanjangud Rasabale Bananas & Royal Mysore Pak",
            description:
              "Sample the distinctively aromatic, GI-protected heirloom bananas and warm melt-in-the-mouth Mysore Pak made with pure desi ghee.",
            location: { name: "Nanjangud Town Market", lat: 12.1195, lng: 76.686 },
            type: "food",
          },
          {
            _key: "gsb3c",
            title: "Drive to Mysuru Airport (MYQ) & Return Flight",
            description:
              "Short 20-minute drive to Mysuru Airport for your flight back to Mumbai or Pune.",
            location: { name: "Mysore Airport (MYQ)", lat: 12.2294, lng: 76.6547 },
            type: "transport",
          },
        ],
      },
    ],
  },
];
