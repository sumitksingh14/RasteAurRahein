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
];
