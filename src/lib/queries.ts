import { sanityClient } from "./sanity";
import type { Trip, Author } from "./types";

// --- Demo data fallback (used when Sanity is not yet configured) ---
export const DEMO_TRIPS: Trip[] = [
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
    viewCount: 1284,
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
    tags: ["Road Trip", "India", "Mountains", "Culture", "Nature"],
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
    viewCount: 2156,
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
    tags: ["Beach", "Food", "Culture", "Goa", "India"],
    country: "India",
    startDate: "2023-01-05",
    endDate: "2023-01-11",
    bestSuggestedMonth: "November – February",
    status: "published",
    viewCount: 987,
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

// --- Sanity GROQ Queries ---

const tripFields = `
  _id,
  title,
  "slug": slug.current,
  coverImage,
  excerpt,
  tags,
  country,
  startDate,
  endDate,
  bestSuggestedMonth,
  status,
  viewCount,
  totalBudget,
  currency,
  tripType,
  readingTime,
  _createdAt,
  _updatedAt,
  "author": author->{_id, name, "slug": slug.current, photo, bio}
`;

const itineraryFields = `
  itinerary[]{
    _key,
    dayNumber,
    title,
    date,
    summary,
    coverImage,
    activities[]{
      _key,
      time,
      title,
      description,
      location,
      photos,
      cost,
      currency,
      notes,
      type
    }
  }
`;

export async function getAllTrips(): Promise<Trip[]> {
  try {
    const query = `*[_type == "trip" && status == "published" && country == "India"] | order(_createdAt desc) { ${tripFields} }`;
    const trips = await sanityClient.fetch(query);
    return trips.length > 0 ? trips : DEMO_TRIPS;
  } catch {
    return DEMO_TRIPS;
  }
}

export async function getTripBySlug(slug: string): Promise<Trip | null> {
  try {
    const query = `*[_type == "trip" && slug.current == $slug && country == "India"][0] { ${tripFields}, ${itineraryFields}, gallery, body }`;
    const trip = await sanityClient.fetch(query, { slug });
    if (trip) return trip;
    return DEMO_TRIPS.find((t) => t.slug === slug) || null;
  } catch {
    return DEMO_TRIPS.find((t) => t.slug === slug) || null;
  }
}

export async function getFeaturedTrips(): Promise<Trip[]> {
  try {
    const query = `*[_type == "trip" && status == "published" && country == "India"] | order(viewCount desc)[0..2] { ${tripFields} }`;
    const trips = await sanityClient.fetch(query);
    return trips.length > 0 ? trips : DEMO_TRIPS.slice(0, 3);
  } catch {
    return DEMO_TRIPS.slice(0, 3);
  }
}

export async function searchTrips(queryText: string): Promise<Trip[]> {
  try {
    const query = `*[_type == "trip" && status == "published" && country == "India" && (title match $q || excerpt match $q || $q in tags)] | order(_createdAt desc) { ${tripFields} }`;
    return await sanityClient.fetch(query, { q: `${queryText}*` });
  } catch {
    return DEMO_TRIPS.filter(
      (t) =>
        t.title.toLowerCase().includes(queryText.toLowerCase()) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(queryText.toLowerCase()))
    );
  }
}

export async function incrementViewCount(slug: string): Promise<void> {
  try {
    const trip = await sanityClient.fetch(
      `*[_type == "trip" && slug.current == $slug][0]{_id, viewCount}`,
      { slug }
    );
    if (trip) {
      await sanityClient
        .patch(trip._id)
        .set({ viewCount: (trip.viewCount || 0) + 1 })
        .commit();
    }
  } catch {
    // Silently fail in demo mode
  }
}
