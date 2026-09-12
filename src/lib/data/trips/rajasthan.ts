import type { Trip } from "@/lib/types";

/**
 * Rajasthan & West India — Rajasthan, Gujarat, UP Heritage, Sacred Ganga Belt
 * 14 trips
 *
 * ── Adding a new trip ──────────────────────────────────────────
 * 1. Append a new trip object to the array below.
 * 2. Add its slug → region mapping in src/lib/regions.ts (TRIP_REGION_MAP).
 * That's it — it appears everywhere automatically.
 */
export const RAJASTHAN_TRIPS: Trip[] = [
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
    _id: "trip-kuldhara-4-days",
    title: "Kuldhara Ghost Village & Thar Desert Mysteries — 4 Days from Mumbai / Pune",
    slug: "kuldhara-4-days",
    excerpt: "Journey from Mumbai or Pune into the golden heart of the Thar Desert to uncover the haunting ruins of Kuldhara — an entire 13th-century Paliwal Brahmin settlement abandoned overnight under a legendary curse. Pair the paranormal intrigue with Khaba Fort, sunset camel safaris across Sam Dunes, and Jaisalmer's living golden citadel.",
    tags: [
      "Rajasthan",
      "Desert",
      "Heritage",
      "Folklore",
      "Offbeat",
      "Culture",
      "Ruins",
      "India"
    ],
    country: "India",
    startDate: "2026-10-10",
    endDate: "2026-10-13",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 18500,
    currency: "INR",
    tripType: "Desert Heritage & Mystery Expedition",
    readingTime: 8,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "kul-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Jaisalmer Airport → Gadisar Lake Sunset",
        date: "2026-10-10",
        summary: "Take a direct morning flight from Mumbai (BOM) or Pune (PNQ) to Jaisalmer Airport (JSA) or via Jodhpur. Check in to your desert stone haveli, relax over authentic Ker Sangri lunch, and spend a serene evening watching the golden sunset over the chhatris of historic Gadisar Lake.",
        activities: [
          {
            _key: "kul1a",
            title: "Morning Flight Mumbai / Pune to Jaisalmer (JSA)",
            description: "Fly from Mumbai (BOM) or Pune (PNQ) to Jaisalmer Airport, or fly to Jodhpur and take a smooth 4.5-hour highway cab ride across Thar desert landscapes.",
            location: {
              name: "Jaisalmer Airport",
              lat: 26.8898,
              lng: 70.8644
            },
            time: "10:30 AM",
            type: "transport",
            cost: 6500,
            currency: "INR",
            notes: "Direct flights operate seasonally between Oct and Mar."
          },
          {
            _key: "kul1b",
            title: "Check-in to Jaisalmer Heritage Hotel",
            description: "Check in at Suryagarh Jaisalmer or boutique golden sandstone haveli near the fort gate. Sip warm spiced Kahwa tea.",
            location: {
              name: "Suryagarh Jaisalmer",
              lat: 26.9114,
              lng: 70.7831
            },
            time: "12:30 PM",
            type: "accommodation",
            cost: 4500,
            currency: "INR",
            notes: "Ask front desk to arrange authorized desert guide for Kuldhara visit."
          },
          {
            _key: "kul1c",
            title: "Ker Sangri & Bajra Roti Lunch at Trio Restaurant",
            description: "Savor royal Rajasthani Ker Sangri, Gatta Curry, and piping hot Bajra Roti overlooking the town ramparts.",
            location: {
              name: "The Trio Jaisalmer",
              lat: 26.9157,
              lng: 70.9126
            },
            time: "02:00 PM",
            type: "food",
            cost: 850,
            currency: "INR",
            notes: "Pair with fresh buttermilk (chaas)."
          },
          {
            _key: "kul1d",
            title: "Sunset Boat Ride & Chhatris at Gadisar Lake",
            description: "Explore the 14th-century artificial rainwater reservoir flanked by carved yellow sandstone temples, ghats, and Tilon Ki Pol gateway.",
            location: {
              name: "Gadisar Lake Jaisalmer",
              lat: 26.9079,
              lng: 70.9238
            },
            time: "05:15 PM",
            type: "sightseeing",
            cost: 200,
            currency: "INR",
            notes: "Magnificent photo reflections as migratory desert birds arrive."
          }
        ]
      },
      {
        _key: "kul-day2",
        dayNumber: 2,
        title: "Kuldhara Ghost Village → Khaba Fort → Sam Sand Dunes Safari",
        date: "2026-10-11",
        summary: "Step back into the 13th century at the abandoned ghost village of Kuldhara. Walk the eerie roofless streets, inspect ancient carved temples, and learn why 84 villages were deserted overnight in 1825. Continue to the romantic ruins of Khaba Fort, followed by a dramatic sunset camel safari at Sam Sand Dunes.",
        activities: [
          {
            _key: "kul2a",
            title: "Guided Exploration of Kuldhara Ghost Village",
            description: "Walk down the silent stone grid streets, preserved houses, stepwells, and the central temple of this Paliwal Brahmin settlement abandoned overnight due to the tyranny of minister Salim Singh.",
            location: {
              name: "Kuldhara Abandoned Village",
              lat: 26.8715,
              lng: 70.7846
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 150,
            currency: "INR",
            notes: "Entry managed by ASI. Mornings are peaceful and less hot."
          },
          {
            _key: "kul2b",
            title: "Khaba Fort Ruins & Peacock Feeding Point",
            description: "A short 15 km drive to the dramatic Khaba Fort ruins perched on an escarpment overlooking an abandoned desert valley where hundreds of wild peacocks gather.",
            location: {
              name: "Khaba Fort",
              lat: 26.8378,
              lng: 70.6723
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "Houses a small museum with fossilized sea shells from prehistoric oceans."
          },
          {
            _key: "kul2c",
            title: "Traditional Thali Lunch at Desert Boy's Dhaba",
            description: "Authentic Dal Baati Churma and Rajasthani Papad ki Sabzi prepared over charcoal hearths.",
            location: {
              name: "Desert Boy's Dhaba Sam Road",
              lat: 26.879,
              lng: 70.62
            },
            time: "01:30 PM",
            type: "food",
            cost: 600,
            currency: "INR",
            notes: "Hearty, filling traditional desert cuisine."
          },
          {
            _key: "kul2d",
            title: "Camel & 4x4 Dune Bashing Sunset Safari at Sam Dunes",
            description: "Arrive at the sweeping golden ripples of Sam Sand Dunes. Ride camels into the dunes for an unforgettable crimson sunset, followed by Manganiyar folk music around the campfire.",
            location: {
              name: "Sam Sand Dunes",
              lat: 26.8327,
              lng: 70.5042
            },
            time: "04:45 PM",
            type: "activity",
            cost: 1800,
            currency: "INR",
            notes: "Carry a warm jacket as desert temperatures drop rapidly after dark."
          }
        ]
      },
      {
        _key: "kul-day3",
        dayNumber: 3,
        title: "Jaisalmer Living Golden Fort → Patwon Ki Haveli → Bada Bagh Chhatris",
        date: "2026-10-12",
        summary: "Spend the day exploring Jaisalmer's UNESCO-listed 'Sonar Qila', one of the world's very few living forts where thousands still reside within 800-year-old bastions. Tour the ornate filigree stone craftsmanship of Patwon Ki Haveli and conclude with sunset at the royal cenotaphs of Bada Bagh.",
        activities: [
          {
            _key: "kul3a",
            title: "Walking Tour of Jaisalmer Fort (Sonar Qila)",
            description: "Enter via Suraj Pol into the 12th-century living fort. Walk labyrinthine sandstone alleyways, inspect the Royal Palace (Raj Mahal), and admire the intricately carved 7 Jain Temples dating from 12th to 15th century.",
            location: {
              name: "Jaisalmer Fort",
              lat: 26.9124,
              lng: 70.9127
            },
            time: "09:00 AM",
            type: "sightseeing",
            cost: 250,
            currency: "INR",
            notes: "Hire a licensed ASI guide at the entrance gate for historical insights."
          },
          {
            _key: "kul3b",
            title: "Architectural Marvel of Patwon Ki Haveli",
            description: "Marvel at the five-storey cluster of 5 havelis built by rich brocade merchants featuring 60 balconies with lace-like stone jali screens.",
            location: {
              name: "Patwon Ki Haveli",
              lat: 26.9172,
              lng: 70.9135
            },
            time: "12:00 PM",
            type: "sightseeing",
            cost: 150,
            currency: "INR",
            notes: "Exceptional antique furniture and Rajasthani miniature frescoes."
          },
          {
            _key: "kul3c",
            title: "Rooftop Lunch at Jaisalmer Oasis Restaurant",
            description: "Enjoy chilled drinks, Laal Maas, and paneer tikka overlooking the yellow bastion walls.",
            location: {
              name: "Oasis Rooftop Cafe",
              lat: 26.914,
              lng: 70.912
            },
            time: "01:45 PM",
            type: "food",
            cost: 750,
            currency: "INR",
            notes: "Great 360-degree panorama of the fort and Thar horizon."
          },
          {
            _key: "kul3d",
            title: "Golden Hour at Bada Bagh Royal Cenotaphs",
            description: "Visit the serene desert garden complex housing dozens of carved stone chhatris built in memory of the Bhatti dynasty maharajas beside ancient windmills.",
            location: {
              name: "Bada Bagh Cenotaphs",
              lat: 26.9472,
              lng: 70.8872
            },
            time: "05:00 PM",
            type: "sightseeing",
            cost: 150,
            currency: "INR",
            notes: "The golden hour turns the sandstone into a luminous amber glow."
          }
        ]
      },
      {
        _key: "kul-day4",
        dayNumber: 4,
        title: "Bazaar Souvenir Walk → Return Flight to Mumbai / Pune",
        date: "2026-10-13",
        summary: "Enjoy a leisurely morning breakfast of Poha and Jalebi in the fort courtyard, pick up handmade camel leather items, mirror-work textiles, and yellow fossil stone pottery before taking your transfer to Jaisalmer Airport for your return flight.",
        activities: [
          {
            _key: "kul4a",
            title: "Morning Souvenir Shopping at Sadar Bazaar & Manak Chowk",
            description: "Pick up hand-embroidered Thar tapestries, silver jewelry, and Habur stone artifacts that naturally curdle milk into yogurt.",
            location: {
              name: "Manak Chowk Jaisalmer",
              lat: 26.9148,
              lng: 70.9142
            },
            time: "09:30 AM",
            type: "activity",
            cost: 1000,
            currency: "INR",
            notes: "Support local weaver cooperatives inside the old bazaar."
          },
          {
            _key: "kul4b",
            title: "Transfer to Jaisalmer Airport (JSA) & Flight to Mumbai/Pune",
            description: "Short 20-minute cab drive to the desert airport for your direct flight back home carrying stories of Kuldhara's mysterious sands.",
            location: {
              name: "Jaisalmer Airport Terminal",
              lat: 26.8898,
              lng: 70.8644
            },
            time: "12:15 PM",
            type: "transport",
            cost: 6500,
            currency: "INR",
            notes: "Arrive 90 minutes before scheduled domestic flight departure."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-narlai-4-days",
    title: "Rawla Narlai & Aravalli Granite Monolith — 4 Days from Mumbai / Pune",
    slug: "narlai-4-days",
    excerpt: "Escape into Rajasthan's hidden Godwar heartland — nestled beneath an imposing 350-ft single granite monolith crowned by a white stone elephant. Experience 17th-century royal heritage at Rawla Narlai, sunrise monolith treks, leopard safaris through the granite hillocks, and an unforgettable candlelit royal dinner inside a 16th-century stepwell.",
    tags: [
      "Rajasthan",
      "Heritage",
      "Wildlife",
      "Luxury",
      "Offbeat",
      "Mountains",
      "Culture",
      "India"
    ],
    country: "India",
    startDate: "2026-10-16",
    endDate: "2026-10-19",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 24000,
    currency: "INR",
    tripType: "Heritage & Wildlife Hideaway",
    readingTime: 8,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "nar-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Udaipur Airport → Scenic Drive to Narlai",
        date: "2026-10-16",
        summary: "Fly from Mumbai (BOM) or Pune (PNQ) into Udaipur's Maharana Pratap Airport (UDR). Embark on a picturesque 2.5-hour drive through the rolling Aravalli mountain passes and rural Godwar villages to reach Narlai, checking in to the aristocratic 17th-century Rawla Narlai heritage retreat.",
        activities: [
          {
            _key: "nar1a",
            title: "Morning Flight Mumbai / Pune to Udaipur (UDR)",
            description: "Direct flight to Udaipur Maharana Pratap Airport (~1 hr 20 mins from BOM/PNQ). Meet private chauffeur with AC SUV.",
            location: {
              name: "Maharana Pratap Airport Udaipur",
              lat: 24.6177,
              lng: 73.8961
            },
            time: "09:45 AM",
            type: "transport",
            cost: 5800,
            currency: "INR",
            notes: "Smooth rural highway route via Gogunda and Ranakpur."
          },
          {
            _key: "nar1b",
            title: "Check-in to Rawla Narlai Heritage Retreat",
            description: "Step into this former royal hunting lodge dating back to the 17th century, restored with blooming bougainvillea, frescoed courtyards, and deep sandstone stepwells.",
            location: {
              name: "Rawla Narlai",
              lat: 25.3218,
              lng: 73.535
            },
            time: "01:00 PM",
            type: "accommodation",
            cost: 8500,
            currency: "INR",
            notes: "Welcome drink of iced fresh mint shikanji and marigold garlands."
          },
          {
            _key: "nar1c",
            title: "Royal Courtyard Lunch at Jharokha Cafe",
            description: "Relish authentic Mewari Govind Gatta, Ker Dak (currant) sabzi, and fresh tandoori roti by the pool courtyard.",
            location: {
              name: "Rawla Narlai Courtyard",
              lat: 25.3218,
              lng: 73.535
            },
            time: "02:15 PM",
            type: "food",
            cost: 1100,
            currency: "INR",
            notes: "Signature royal recipes curated from royal Mewar kitchens."
          },
          {
            _key: "nar1d",
            title: "Village Heritage Walk with Rabari Shepherds",
            description: "Stroll with a resident naturalist through the vibrant Narlai village lanes, meeting the nomadic red-turbaned Rabari shepherd community and local blacksmiths.",
            location: {
              name: "Narlai Heritage Village",
              lat: 25.323,
              lng: 73.534
            },
            time: "05:00 PM",
            type: "activity",
            cost: 300,
            currency: "INR",
            notes: "Witness the evening ritual of cattle returning home against village temple bells."
          }
        ]
      },
      {
        _key: "nar-day2",
        dayNumber: 2,
        title: "Elephant Rock Sunrise Climb → Cave Temples → Jawai Leopard Safari",
        date: "2026-10-17",
        summary: "Wake up before sunrise to ascend the 350-foot granite monolith of Elephant Rock via 350 stone steps. Ring the bell beside the white stone elephant statue at the crest for panoramic vistas of the mist-draped Aravallis. In the afternoon, board an open 4x4 jeep for an exhilarating safari searching for wild Indian leopards roaming the granite boulders.",
        activities: [
          {
            _key: "nar2a",
            title: "Elephant Rock (Hathi Rock) Sunrise Trek",
            description: "Climb the 350 stone steps cut into the massive granite monolith towering above Narlai. Marvel at the life-size white marble elephant atop the summit and panoramic sunrise vistas.",
            location: {
              name: "Elephant Rock Narlai",
              lat: 25.3235,
              lng: 73.538
            },
            time: "06:00 AM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Wear sturdy shoes. Fresh morning tea is served at the base upon descent."
          },
          {
            _key: "nar2b",
            title: "Visit Ancient Adinath & Shiva Cave Temples",
            description: "Visit the rock-cut cave temples tucked into the granite boulder caves where local ascetics have meditated for centuries.",
            location: {
              name: "Narlai Rock Cave Temples",
              lat: 25.3205,
              lng: 73.5365
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Quiet, spiritually charged rock caverns with natural perennial springs."
          },
          {
            _key: "nar2c",
            title: "Leopard Safari through Granite Kopjes & Jawai Foothills",
            description: "Board a customized open 4x4 Gypsy with experienced spotters to scan the giant granite boulders for wild Indian leopards, striped hyenas, and nilgai antelopes.",
            location: {
              name: "Godwar Leopard Hills",
              lat: 25.298,
              lng: 73.489
            },
            time: "03:45 PM",
            type: "activity",
            cost: 2800,
            currency: "INR",
            notes: "Leopards here live in harmony with the Rabari pastoralists."
          },
          {
            _key: "nar2d",
            title: "Sunset High Tea by the Forest Lake",
            description: "Enjoy hot masala chai and kachoris as the setting sun paints the granite kopjes in shades of deep amber and violet.",
            location: {
              name: "Narlai Forest Lake Point",
              lat: 25.305,
              lng: 73.512
            },
            time: "06:15 PM",
            type: "food",
            cost: 450,
            currency: "INR",
            notes: "Watch egrets and cormorants roosting in the lakeside acacia trees."
          }
        ]
      },
      {
        _key: "nar-day3",
        dayNumber: 3,
        title: "Ranakpur Marble Jain Temple → Stepwell Baori Dinner",
        date: "2026-10-18",
        summary: "Take a 40-minute drive down the Ghat road to the 15th-century Ranakpur Jain Temple, world-famous for its 1,444 uniquely hand-carved marble pillars. In the evening, dress in traditional attire and ride a decorated bullock cart into the wilderness for an enchanting candlelit feast inside a 16th-century stepwell.",
        activities: [
          {
            _key: "nar3a",
            title: "Ranakpur Jain Temple Architecture Pilgrimage",
            description: "Marvel at the Chaumukha temple dedicated to Tirthankara Adinath, featuring 1,444 exquisitely carved marble pillars where no two pillars share the same design.",
            location: {
              name: "Ranakpur Jain Temple",
              lat: 25.1158,
              lng: 73.4735
            },
            time: "10:00 AM",
            type: "sightseeing",
            cost: 300,
            currency: "INR",
            notes: "Audio guides in multiple languages available at the entrance."
          },
          {
            _key: "nar3b",
            title: "Satvik Lunch at King's Abode Ranakpur",
            description: "Delicious multi-course vegetarian Rajasthani spread with fresh paneer, gatte, and churma.",
            location: {
              name: "King's Abode Dining Hall",
              lat: 25.132,
              lng: 73.481
            },
            time: "01:15 PM",
            type: "food",
            cost: 700,
            currency: "INR",
            notes: "Tranquil hillside views overlooking private organic orchards."
          },
          {
            _key: "nar3c",
            title: "Bullock Cart Ride to the 16th-Century Stepwell",
            description: "Dress in royal Rajasthani turbans and ride a decorated bullock cart across mustard fields towards the ancient subterranean stepwell.",
            location: {
              name: "Narlai Royal Baori Track",
              lat: 25.315,
              lng: 73.541
            },
            time: "06:30 PM",
            type: "transport",
            cost: 600,
            currency: "INR",
            notes: "Torches and oil lamps light the wilderness trail."
          },
          {
            _key: "nar3d",
            title: "Royal Stepwell Dinner (Baori Candlelit Experience)",
            description: "Dine on the tiers of a 500-year-old stone stepwell illuminated by hundreds of flickering oil diyas, serenaded by an ascetic folk singer on the Jogia sarangi.",
            location: {
              name: "Rawla Narlai Stepwell",
              lat: 25.3175,
              lng: 73.5435
            },
            time: "07:30 PM",
            type: "food",
            cost: 3500,
            currency: "INR",
            notes: "An unforgettable, bucket-list culinary experience under starry desert skies."
          }
        ]
      },
      {
        _key: "nar-day4",
        dayNumber: 4,
        title: "Morning Temple Chants → Udaipur Airport → Mumbai / Pune",
        date: "2026-10-19",
        summary: "Listen to the morning temple conch shells, savor a lazy veranda breakfast, and enjoy a smooth scenic drive back to Udaipur's airport to catch your afternoon flight to Mumbai or Pune.",
        activities: [
          {
            _key: "nar4a",
            title: "Farewell Veranda Breakfast & Heritage Photography",
            description: "Enjoy fresh farm eggs, hot poha, masala omelettes, and brewed estate coffee on the palace terrace overlooking the monolith.",
            location: {
              name: "Rawla Narlai Veranda",
              lat: 25.3218,
              lng: 73.535
            },
            time: "08:30 AM",
            type: "food",
            cost: 0,
            currency: "INR",
            notes: "Included with luxury room package."
          },
          {
            _key: "nar4b",
            title: "Scenic Transfer to Udaipur Airport (UDR) & Return Flight",
            description: "Chauffeur transfer back to Udaipur Airport for afternoon departure to Mumbai (BOM) or Pune (PNQ).",
            location: {
              name: "Maharana Pratap Airport Udaipur",
              lat: 24.6177,
              lng: 73.8961
            },
            time: "11:30 AM",
            type: "transport",
            cost: 5800,
            currency: "INR",
            notes: "Optional stop at Gogunda palace on the highway if time permits."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-khimsar-4-days",
    title: "Khimsar Fort & Sand Dunes Oasis — 4 Days from Mumbai / Pune",
    slug: "khimsar-4-days",
    excerpt: "Discover royal Thar opulence at Khimsar — an extraordinary 16th-century fortified citadel with scarred battlements and sprawling ramparts. Experience camel journeys across virgin sand dunes to an exclusive desert eco-oasis village surrounding an azure lake, paired with Panchala Blackbuck wildlife safaris and Nagaur Fort frescoes.",
    tags: [
      "Rajasthan",
      "Forts",
      "Desert",
      "Wildlife",
      "Heritage",
      "Luxury",
      "Offbeat",
      "India"
    ],
    country: "India",
    startDate: "2026-10-23",
    endDate: "2026-10-26",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 22500,
    currency: "INR",
    tripType: "Royal Fort & Desert Dunes Oasis",
    readingTime: 8,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "khi-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Jodhpur Airport → Khimsar Fort Arrival",
        date: "2026-10-23",
        summary: "Fly into the Sun City of Jodhpur from Mumbai (BOM) or Pune (PNQ). Meet your driver for a smooth 1.5-hour highway cruise north along NH62 to the 16th-century fortress of Khimsar. Check in past battle-scarred gates into a grand heritage hotel, enjoying an evening rampart walk and museum tour.",
        activities: [
          {
            _key: "khi1a",
            title: "Morning Flight Mumbai / Pune to Jodhpur Airport (JDH)",
            description: "Direct flight landing in Jodhpur (~1 hr 45 mins). Board private vehicle for the 85-km highway drive to Khimsar.",
            location: {
              name: "Jodhpur Civil Airport",
              lat: 26.2514,
              lng: 73.0487
            },
            time: "10:15 AM",
            type: "transport",
            cost: 5900,
            currency: "INR",
            notes: "Wide 4-lane expressway with desert views."
          },
          {
            _key: "khi1b",
            title: "Check-in to ITC Welcomhotel Khimsar Fort",
            description: "Check in to this sprawling 16th-century bastion built by Rao Karamsiji, 8th son of the founder of Jodhpur Rao Jodha.",
            location: {
              name: "Khimsar Fort",
              lat: 26.989,
              lng: 73.4072
            },
            time: "01:00 PM",
            type: "accommodation",
            cost: 7800,
            currency: "INR",
            notes: "Greeted by nagada drums, camel escort, and royal tilak ceremony."
          },
          {
            _key: "khi1c",
            title: "Royal Rajputana Thali at Vansh Dining Hall",
            description: "Savor Laal Maas cooked over slow wood fire, Marwari Kadhi, and Churma served on traditional brass thalis.",
            location: {
              name: "Vansh Khimsar Fort",
              lat: 26.989,
              lng: 73.4072
            },
            time: "02:15 PM",
            type: "food",
            cost: 1100,
            currency: "INR",
            notes: "Recipes preserved from the ancestral Khimsar royal household."
          },
          {
            _key: "khi1d",
            title: "Rampart Walk & Antique Armory Tour",
            description: "Walk atop the high fortified ramparts dotted with vintage cannons, inspect ancient swords and matchlocks, and watch peacock roosting at dusk.",
            location: {
              name: "Khimsar Fort Ramparts",
              lat: 26.9895,
              lng: 73.408
            },
            time: "05:00 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Superb vantage point across the surrounding rural landscape."
          }
        ]
      },
      {
        _key: "khi-day2",
        dayNumber: 2,
        title: "Panchala Blackbuck Sanctuary Safari → Khimsar Dunes Oasis Village",
        date: "2026-10-24",
        summary: "Set off on an early morning open-top jeep safari to the Panchala Reserve to observe herds of Indian blackbuck antelopes and chinkaras. In the afternoon, journey 15 minutes deeper into the desert on a camel cart to check in to Khimsar Sand Dunes Village — an exclusive eco-resort encircling an enchanting natural water body nestled amid high sand dunes.",
        activities: [
          {
            _key: "khi2a",
            title: "Panchala Blackbuck Wildlife Jeep Safari",
            description: "Open-jeep expedition into the surrounding scrub grasslands to witness herds of graceful blackbucks, chinkara gazelles, desert foxes, and blue bulls roaming freely.",
            location: {
              name: "Panchala Blackbuck Sanctuary",
              lat: 26.945,
              lng: 73.36
            },
            time: "06:30 AM",
            type: "activity",
            cost: 1600,
            currency: "INR",
            notes: "Guided by knowledgeable local Bishnoi wildlife trackers."
          },
          {
            _key: "khi2b",
            title: "Breakfast on the Fort Lawn & Swimming Pool",
            description: "Relax by the turquoise swimming pool nestled amid medieval stone turrets and flowering gardens.",
            location: {
              name: "Khimsar Fort Garden",
              lat: 26.9888,
              lng: 73.4068
            },
            time: "09:30 AM",
            type: "food",
            cost: 0,
            currency: "INR",
            notes: "Complimentary breakfast spread with fresh fruit and juices."
          },
          {
            _key: "khi2c",
            title: "Camel Cart Transfer to Khimsar Sand Dunes Village",
            description: "Ride across the rolling desert dunes to the secluded Dunes Oasis, where circular thatch-roofed eco-huts ring a tranquil desert lake oasis.",
            location: {
              name: "Khimsar Dunes Village",
              lat: 27.0125,
              lng: 73.441
            },
            time: "03:30 PM",
            type: "accommodation",
            cost: 8000,
            currency: "INR",
            notes: "Accessible only by 4x4 or camel safari; 100% serene isolation."
          },
          {
            _key: "khi2d",
            title: "Sunset over Virgin Sand Dunes & Folk Music",
            description: "Ascend the crest of high dunes overlooking the lake for sunset, followed by Manganiyar folk singers and Kalbeliya fire dancers around a glowing bonfire.",
            location: {
              name: "Khimsar Oasis Sunset Ridge",
              lat: 27.014,
              lng: 73.443
            },
            time: "05:30 PM",
            type: "activity",
            cost: 500,
            currency: "INR",
            notes: "Unmatched dark sky stargazing with the Milky Way visible to the naked eye."
          }
        ]
      },
      {
        _key: "khi-day3",
        dayNumber: 3,
        title: "Day Trip to Nagaur Fort (Ahichhatragarh) & Water Palaces",
        date: "2026-10-25",
        summary: "Embark on an excursion 45 km northeast to Nagaur to explore the majestic UNESCO-awarded Ahhichatragarh (Nagaur Fort) — famous for its Persian-style water gardens, elaborate fountains, and exquisite 16th-century Mughal wall frescoes.",
        activities: [
          {
            _key: "khi3a",
            title: "Scenic Drive to Nagaur Fort (Ahichhatragarh)",
            description: "Chauffeur drive north along NH62 through mustard fields to ancient Nagaur.",
            location: {
              name: "Nagaur Highway Route",
              lat: 27.15,
              lng: 73.65
            },
            time: "09:00 AM",
            type: "transport",
            cost: 1500,
            currency: "INR",
            notes: "Smooth 45-minute rural highway stretch."
          },
          {
            _key: "khi3b",
            title: "Guided Tour of Ahichhatragarh Fort & Mughal Water Gardens",
            description: "Explore the UNESCO-restored 12th-century fort, the Hadi Rani Mahal, Badal Mahal with rain-cloud ceiling frescoes, and the ingenious medieval water cooling system.",
            location: {
              name: "Ahichhatragarh Fort Nagaur",
              lat: 27.1989,
              lng: 73.738
            },
            time: "10:15 AM",
            type: "sightseeing",
            cost: 350,
            currency: "INR",
            notes: "One of the most impeccably conserved medieval forts in India."
          },
          {
            _key: "khi3c",
            title: "Lunch at Ranvas Royal Pavilions",
            description: "Dine inside the private havelis of Ranvas within Nagaur fort walls, savoring authentic Marwari delicacies.",
            location: {
              name: "Ranvas Restaurant Nagaur",
              lat: 27.1995,
              lng: 73.7375
            },
            time: "01:30 PM",
            type: "food",
            cost: 1200,
            currency: "INR",
            notes: "Exceptional heritage dining ambiance inside ancient stone zenana courtyards."
          },
          {
            _key: "khi3d",
            title: "Evening Stroll around Khimsar Village Bazaars",
            description: "Return to Khimsar to visit local potters and blacksmiths handcrafting iron bell souvenirs and bell-metal items.",
            location: {
              name: "Khimsar Old Market",
              lat: 26.991,
              lng: 73.409
            },
            time: "05:00 PM",
            type: "activity",
            cost: 300,
            currency: "INR",
            notes: "Gentle village pace with warm local Rajasthani hospitality."
          }
        ]
      },
      {
        _key: "khi-day4",
        dayNumber: 4,
        title: "Morning Oasis Stroll → Drive to Jodhpur → Mumbai / Pune",
        date: "2026-10-26",
        summary: "Enjoy a leisurely sunrise walk around the desert lake oasis, spotting desert birds and migratory ducks. Check out and drive back to Jodhpur for your flight to Mumbai or Pune, carrying memories of royal forts and endless sand dunes.",
        activities: [
          {
            _key: "khi4a",
            title: "Sunrise Birding & Breakfast by the Desert Lake",
            description: "Walk the shoreline of the oasis lake to spot teals, sandgrouse, and lapwings while enjoying fresh parathas and masala tea.",
            location: {
              name: "Khimsar Oasis Lake",
              lat: 27.013,
              lng: 73.4415
            },
            time: "07:30 AM",
            type: "food",
            cost: 0,
            currency: "INR",
            notes: "Unbelievably tranquil desert morning setting."
          },
          {
            _key: "khi4b",
            title: "Transfer to Jodhpur Airport & Return Flight",
            description: "Drive back to Jodhpur Airport (JDH) for your return flight to Mumbai (BOM) or Pune (PNQ).",
            location: {
              name: "Jodhpur Civil Airport",
              lat: 26.2514,
              lng: 73.0487
            },
            time: "11:30 AM",
            type: "transport",
            cost: 5900,
            currency: "INR",
            notes: "Arrive 2 hours prior to scheduled flight departure."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-bhangarh-4-days",
    title: "Bhangarh Haunted Fort & Sariska Wilderness — 4 Days from Mumbai / Pune",
    slug: "bhangarh-4-days",
    excerpt: "Venture from Mumbai or Pune into the shadows of the Aravalli hills to investigate Bhangarh Fort — India's most famous ruined ghost citadel shrouded in tantrik curses and paranormal folklore. Balance the ancient mysteries with tiger tracking in Sariska Tiger Reserve and marveling at the 3,500-step geometry of Chand Baori stepwell.",
    tags: [
      "Rajasthan",
      "Mystery",
      "Wildlife",
      "Heritage",
      "Offbeat",
      "Ruins",
      "Adventure",
      "India"
    ],
    country: "India",
    startDate: "2026-11-05",
    endDate: "2026-11-08",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 16500,
    currency: "INR",
    tripType: "Mystery Ruins & Tiger Safari",
    readingTime: 8,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "bha-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Jaipur Airport → Sariska Valley Heritage Check-in",
        date: "2026-11-05",
        summary: "Take an early morning flight from Mumbai (BOM) or Pune (PNQ) to Jaipur International Airport (JAI). Board an AC cab for a 2-hour countryside journey through Dausa and Alwar into the forested hills of Sariska. Check in to a rustic heritage wilderness lodge and enjoy an evening nature walk.",
        activities: [
          {
            _key: "bha1a",
            title: "Morning Flight Mumbai / Pune to Jaipur (JAI)",
            description: "Direct flight landing in Jaipur by 10:00 AM. Meet your driver for the scenic 85-km transfer to the Sariska-Bhangarh region.",
            location: {
              name: "Jaipur International Airport",
              lat: 26.8289,
              lng: 75.8056
            },
            time: "10:00 AM",
            type: "transport",
            cost: 5200,
            currency: "INR",
            notes: "Smooth expressway via NH21 towards Dausa."
          },
          {
            _key: "bha1b",
            title: "Check-in to Sariska Tiger Camp Resort",
            description: "Settle into a serene cottage nestled against the backdrop of the rocky Aravalli ridges.",
            location: {
              name: "Sariska Tiger Camp Resort",
              lat: 27.275,
              lng: 76.435
            },
            time: "01:00 PM",
            type: "accommodation",
            cost: 4500,
            currency: "INR",
            notes: "Surrounded by mustard fields and acacia woodland."
          },
          {
            _key: "bha1c",
            title: "Traditional Rajasthani Thali Lunch",
            description: "Relish spicy Dal Baati Churma, Gatta curry, and fresh garlic chutney prepared in countryside dhaba style.",
            location: {
              name: "Tiger Camp Dining Room",
              lat: 27.275,
              lng: 76.435
            },
            time: "02:15 PM",
            type: "food",
            cost: 650,
            currency: "INR",
            notes: "Hot chapatis served straight from earthen tandoor."
          },
          {
            _key: "bha1d",
            title: "Sunset Walk & Folk Tales around the Campfire",
            description: "Walk the buffer trail with a local naturalist, spotting peacocks and spotted deer, followed by local elders sharing the eerie lore of Bhangarh.",
            location: {
              name: "Sariska Campfire Ground",
              lat: 27.276,
              lng: 76.436
            },
            time: "05:30 PM",
            type: "activity",
            cost: 0,
            currency: "INR",
            notes: "Atmospheric introduction to the legends of Madho Singh and Princess Ratnavati."
          }
        ]
      },
      {
        _key: "bha-day2",
        dayNumber: 2,
        title: "Daylight Exploration of Bhangarh Ghost Citadel",
        date: "2026-11-06",
        summary: "Spend the entire day thoroughly investigating the ruined 17th-century citadel of Bhangarh during permitted daylight hours. Pass through the five concentric gates, explore the Jauhari Bazaar ruins, admire the remarkably preserved Gopinath Temple, and hike up to the royal palace ruins under the watchful gaze of the Aravalli cliffs.",
        activities: [
          {
            _key: "bha2a",
            title: "Enter Bhangarh Fort via Delhi & Lahori Gates",
            description: "Pass the famous ASI warning board forbidding entry after sunset. Walk through the giant stone bastions, banyan-strangled gates, and Hanuman temple.",
            location: {
              name: "Bhangarh Fort Main Gate",
              lat: 27.0964,
              lng: 76.2863
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Strict ASI rule: Everyone must vacate before sunset (5:30 PM)."
          },
          {
            _key: "bha2b",
            title: "Walk the Ruins of Jauhari Bazaar & Merchant Haveli Mansions",
            description: "Explore the roofless cobblestone streets of the once-thriving marketplace where merchants sold gems, spices, and silk before the city was abandoned.",
            location: {
              name: "Jauhari Bazaar Ruins",
              lat: 27.0975,
              lng: 76.287
            },
            time: "11:00 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Look up at the hilltop chhatri of the ascetic Guru Balu Nath who cursed the fort."
          },
          {
            _key: "bha2c",
            title: "Picnic Lunch at Royal Garden Veranda",
            description: "Enjoy packed vegetarian lunch boxes and fresh lime water in the shaded stone pavilions beside the ancient temple pond.",
            location: {
              name: "Bhangarh Garden Pavilions",
              lat: 27.098,
              lng: 76.2875
            },
            time: "01:15 PM",
            type: "food",
            cost: 350,
            currency: "INR",
            notes: "Beware of wild monkeys; keep food containers secured."
          },
          {
            _key: "bha2d",
            title: "Ascend to the Royal Palace Ruins & Gopinath Temple",
            description: "Climb the seven-tier royal palace ruins overlooking the entire deserted valley. Admire the carved sandstone brackets of Gopinath Temple with zero idols inside.",
            location: {
              name: "Bhangarh Royal Palace Ruins",
              lat: 27.0995,
              lng: 76.2885
            },
            time: "02:45 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "The wind howling through the palace stone arches is spine-chilling."
          }
        ]
      },
      {
        _key: "bha-day3",
        dayNumber: 3,
        title: "Sariska Tiger Reserve Jungle Safari → Chand Baori Stepwell (Abhaneri)",
        date: "2026-11-07",
        summary: "Wake at dawn for an open-top Gypsy tiger safari in Sariska National Park tracking Bengal tigers and leopards. In the afternoon, drive south to Abhaneri to witness Chand Baori — one of India's deepest and most visually stunning stepwells with 3,500 narrow stone steps.",
        activities: [
          {
            _key: "bha3a",
            title: "Early Morning Jungle Safari in Sariska Tiger Reserve",
            description: "Traverse deciduous dhok forests and rocky gorges in an open 4x4 Gypsy to track Royal Bengal tigers, sambar deer, striped hyenas, and rare birds.",
            location: {
              name: "Sariska National Park Gate",
              lat: 27.32,
              lng: 76.415
            },
            time: "06:15 AM",
            type: "activity",
            cost: 2400,
            currency: "INR",
            notes: "Pre-booking safari permits in advance online is mandatory."
          },
          {
            _key: "bha3b",
            title: "Brunch at Sariska Palace Heritage Hotel",
            description: "Dine like a maharaja in the hunting lodge built by Maharaja Sawai Jai Singh of Alwar in 1892.",
            location: {
              name: "The Sariska Palace",
              lat: 27.318,
              lng: 76.422
            },
            time: "10:30 AM",
            type: "food",
            cost: 950,
            currency: "INR",
            notes: "Royal decor with vintage hunting photographs and French furnishings."
          },
          {
            _key: "bha3c",
            title: "Marvel at Chand Baori Stepwell in Abhaneri",
            description: "Gaze down into the 13-storey subterranean geometric marvel featuring 3,500 perfectly symmetrical steps descending 64 feet to a pool of jade water.",
            location: {
              name: "Chand Baori Stepwell Abhaneri",
              lat: 27.0073,
              lng: 76.6064
            },
            time: "02:30 PM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Built by King Chanda in the 9th century; incredible photography."
          },
          {
            _key: "bha3d",
            title: "Visit Harshat Mata Temple Ruins",
            description: "Explore the neighboring 8th-century temple ruins dedicated to the Goddess of Joy and Happiness, featuring intricately carved sculptures and mandapa fragments.",
            location: {
              name: "Harshat Mata Temple",
              lat: 27.008,
              lng: 76.607
            },
            time: "04:15 PM",
            type: "sightseeing",
            cost: 25,
            currency: "INR",
            notes: "Shows classic Gurjara-Pratihara architectural motifs."
          }
        ]
      },
      {
        _key: "bha-day4",
        dayNumber: 4,
        title: "Neelkanth Temple Ruins → Drive to Jaipur → Mumbai / Pune",
        date: "2026-11-08",
        summary: "Conclude your journey with a morning off-road climb to the secluded 10th-century Neelkanth Mahadev temple ruins hidden deep inside the Sariska mountain plateau, before driving to Jaipur Airport for your return flight.",
        activities: [
          {
            _key: "bha4a",
            title: "Excursion to Secluded Neelkanth Mahadev Temple Ruins",
            description: "Ascend a rocky forest track to an isolated mountain ridge hosting hundreds of 10th-century stone temple ruins, erotic carvings, and a colossal monolithic Jain statue.",
            location: {
              name: "Neelkanth Temple Sariska",
              lat: 27.288,
              lng: 76.324
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "Remarkably tranquil archaeological gem far off the tourist trail."
          },
          {
            _key: "bha4b",
            title: "Transfer to Jaipur Airport (JAI) & Return Flight",
            description: "Chauffeur transfer back to Jaipur Airport for afternoon flight back to Mumbai (BOM) or Pune (PNQ).",
            location: {
              name: "Jaipur International Airport",
              lat: 26.8289,
              lng: 75.8056
            },
            time: "01:30 PM",
            type: "transport",
            cost: 5200,
            currency: "INR",
            notes: "Arrive 2 hours prior to scheduled departure."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-bishnoi-villages-3-days",
    title: "Bishnoi Eco-Villages & Wildlife Sanctuaries — 3 Days from Mumbai / Pune",
    slug: "bishnoi-villages-3-days",
    excerpt: "Immerse yourself in the extraordinary world of the Bishnoi community — the world's first true environmentalists who have fiercely guarded wildlife and trees for over 500 years. Spot roaming herds of blackbuck and chinkara, visit Khejarli's sacred martyr grove, witness Salawas durry weaving and Kakani pottery, and experience true rural Thar hospitality.",
    tags: [
      "Rajasthan",
      "Eco Tourism",
      "Wildlife",
      "Culture",
      "Offbeat",
      "Rural",
      "India"
    ],
    country: "India",
    startDate: "2026-11-12",
    endDate: "2026-11-14",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 13500,
    currency: "INR",
    tripType: "Eco-Community & Cultural Immersion",
    readingTime: 7,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "bis-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Jodhpur Airport → Guda Bishnoi Lake Sunset",
        date: "2026-11-12",
        summary: "Take a direct morning flight from Mumbai (BOM) or Pune (PNQ) to Jodhpur Airport (JDH). Take a short 30-minute cab ride south into the serene Bishnoi rural belt of Guda and Salawas. Settle into a traditional adobe bhunga hut, enjoy a home-cooked bajra roti lunch, and walk along the shores of Guda Bishnoi Lake at sunset.",
        activities: [
          {
            _key: "bis1a",
            title: "Morning Flight Mumbai / Pune to Jodhpur (JDH)",
            description: "Direct morning flight landing in Jodhpur (~1 hr 45 mins). Board a rural taxi into the Bishnoi heartland.",
            location: {
              name: "Jodhpur Civil Airport",
              lat: 26.2514,
              lng: 73.0487
            },
            time: "10:15 AM",
            type: "transport",
            cost: 5400,
            currency: "INR",
            notes: "Quick 25-km transfer straight to rural homestays."
          },
          {
            _key: "bis1b",
            title: "Check-in to Bishnoi Village Camp and Resort",
            description: "Check in to traditional thatched-roof circular adobe huts (jhopas) decorated with organic clay relief motifs.",
            location: {
              name: "Bishnoi Village Camp",
              lat: 26.136,
              lng: 73.072
            },
            time: "12:00 PM",
            type: "accommodation",
            cost: 3200,
            currency: "INR",
            notes: "Eco-friendly rural retreat with authentic village ambiance."
          },
          {
            _key: "bis1c",
            title: "Traditional Bajra Roti & Sangri Homestyle Lunch",
            description: "Savor steaming bajra rotis with homemade white butter (makkhan), dried desert berry (ker sangri) sabzi, and tangy chaas.",
            location: {
              name: "Bishnoi Village Homestay Dining",
              lat: 26.136,
              lng: 73.072
            },
            time: "01:30 PM",
            type: "food",
            cost: 450,
            currency: "INR",
            notes: "100% vegetarian satvik meals prepared with farm-fresh organic ingredients."
          },
          {
            _key: "bis1d",
            title: "Sunset Birding at Guda Bishnoi Lake",
            description: "Walk the scenic banks of the artificial desert reservoir to observe blackbucks drinking, migratory demoiselle cranes (Kurjan), and pelicans.",
            location: {
              name: "Guda Bishnoi Lake",
              lat: 26.128,
              lng: 73.085
            },
            time: "05:00 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Bring binoculars for birding and wildlife viewing."
          }
        ]
      },
      {
        _key: "bis-day2",
        dayNumber: 2,
        title: "Khejarli Tree Martyr Grove → Artisan Workshops & Opium Ceremony",
        date: "2026-11-13",
        summary: "Dedicate the day to understanding the 29 sacred principles of Guru Jambheshwar. Pay homage at Khejarli village where 363 Bishnois sacrificed their lives in 1730 hugging Khejri trees. Visit master durry weavers in Salawas, wheel potters in Kakani, and partake in a ceremonial Amal Sabha tea ritual.",
        activities: [
          {
            _key: "bis2a",
            title: "Sacred Pilgrimage to Khejarli Memorial",
            description: "Visit the revered memorial grove where Amrita Devi Bishnoi and 362 villagers laid down their lives to protect sacred Khejri trees from the Maharaja's axemen.",
            location: {
              name: "Khejarli Memorial",
              lat: 26.068,
              lng: 73.136
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "The foundational historical inspiration for the modern Chipko movement."
          },
          {
            _key: "bis2b",
            title: "Salawas Handwoven Durry Workshop",
            description: "Watch master weavers at the world-famous Chhotaram Prajapat workshop handcrafting vibrant flat-weave camel wool and cotton rugs on pit looms.",
            location: {
              name: "Salawas Durry Weavers",
              lat: 26.162,
              lng: 73.045
            },
            time: "11:00 AM",
            type: "activity",
            cost: 500,
            currency: "INR",
            notes: "Direct fair-trade purchase opportunity supporting 5th-generation weavers."
          },
          {
            _key: "bis2c",
            title: "Kakani Terracotta Pottery & Block Printing",
            description: "Try your hands on the traditional manual potter's wheel and watch artisans handcraft water jugs and earthen cookware using desert clay.",
            location: {
              name: "Kakani Pottery Village",
              lat: 26.185,
              lng: 73.06
            },
            time: "01:30 PM",
            type: "activity",
            cost: 200,
            currency: "INR",
            notes: "Watch clay toys and pots baked in open husk kilns."
          },
          {
            _key: "bis2d",
            title: "Traditional Amal Sabha (Opium Ceremony) & Village Council",
            description: "Sit with village elders in their spotless courtyard for the ancient Marwari hospitality ritual of filtered poppy tea, symbolizing peace and fraternal brotherhood.",
            location: {
              name: "Bishnoi Elder Homestead",
              lat: 26.14,
              lng: 73.07
            },
            time: "05:00 PM",
            type: "activity",
            cost: 300,
            currency: "INR",
            notes: "Strictly cultural and non-narcotic ceremonial offering."
          }
        ]
      },
      {
        _key: "bis-day3",
        dayNumber: 3,
        title: "Morning Blackbuck Safari → Jodhpur Airport → Mumbai / Pune",
        date: "2026-11-14",
        summary: "Set off at first light into the scrub forest to watch wild blackbucks and Indian gazelles feeding fearlessly right around Bishnoi homes. Enjoy a leisurely breakfast and head to Jodhpur Airport for your return flight.",
        activities: [
          {
            _key: "bis3a",
            title: "Sunrise Blackbuck & Chinkara Tracking Walk",
            description: "Walk alongside village borders where wild antelopes graze without fear, protected fiercely by community members who feed and water them daily.",
            location: {
              name: "Bishnoi Scrub Pastures",
              lat: 26.132,
              lng: 73.078
            },
            time: "06:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Incredible wildlife photography in natural golden morning light."
          },
          {
            _key: "bis3b",
            title: "Transfer to Jodhpur Airport (JDH) & Return Flight",
            description: "Short 25-minute drive back to Jodhpur Airport for your direct flight home to Mumbai (BOM) or Pune (PNQ).",
            location: {
              name: "Jodhpur Civil Airport",
              lat: 26.2514,
              lng: 73.0487
            },
            time: "11:00 AM",
            type: "transport",
            cost: 5400,
            currency: "INR",
            notes: "Arrive 90 minutes before flight departure."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-dholavira-4-days",
    title: "Dholavira Harappan Metropolis & White Rann Road to Heaven — 4 Days from Mumbai / Pune",
    slug: "dholavira-4-days",
    excerpt: "Travel from Mumbai or Pune across the surreal 30-km 'Road to Heaven' slicing straight through the blinding White Rann of Kutch to Dholavira. Uncover the 5,000-year-old UNESCO Harappan metropolis on Khadir Bet island, marvel at monumental stone water reservoirs, the world's oldest signboard, and ancient Jurassic fossils.",
    tags: [
      "Gujarat",
      "UNESCO",
      "Archaeology",
      "Offbeat",
      "Road Trip",
      "Desert",
      "Culture",
      "India"
    ],
    country: "India",
    startDate: "2026-11-19",
    endDate: "2026-11-22",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 19500,
    currency: "INR",
    tripType: "Harappan Archaeology & Desert Highway",
    readingTime: 8,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "dho-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Bhuj Airport → 'Road to Heaven' Highway to Dholavira",
        date: "2026-11-19",
        summary: "Take a morning flight from Mumbai (BOM) or Pune (PNQ) to Bhuj Airport (BHJ) or board the overnight Kutch Express train. Board your private SUV and drive through Rapar towards Khadir Bet island, driving along the sensational 30-km 'Road to Heaven' flanked by glistening white salt plains on both sides.",
        activities: [
          {
            _key: "dho1a",
            title: "Morning Flight Mumbai / Pune to Bhuj Airport (BHJ)",
            description: "Direct flight to Bhuj Airport (~1 hr 15 mins). Meet your driver for the legendary road trip to Dholavira.",
            location: {
              name: "Bhuj Airport",
              lat: 23.2878,
              lng: 69.6701
            },
            time: "10:30 AM",
            type: "transport",
            cost: 6200,
            currency: "INR",
            notes: "Smooth drive of approximately 210 km (4.5 hours)."
          },
          {
            _key: "dho1b",
            title: "Kutchi Dabeli & Fafda Snack Stop at Rapar",
            description: "Enjoy world-famous spicy Kutchi Dabeli stuffed with spiced potatoes, pomegranate, peanuts, and sev, paired with sweet jalebis.",
            location: {
              name: "Rapar Town Center",
              lat: 23.57,
              lng: 70.64
            },
            time: "01:30 PM",
            type: "food",
            cost: 200,
            currency: "INR",
            notes: "The last major town before entering the salt causeway."
          },
          {
            _key: "dho1c",
            title: "Drive the Spectacular 'Road to Heaven' (Gadhuli-Santalpur Highway)",
            description: "Cruise down the newly paved 30-km highway cutting straight through the shimmering white salt pan of the Greater Rann with endless white horizons on both sides.",
            location: {
              name: "Road to Heaven White Rann",
              lat: 23.75,
              lng: 70.35
            },
            time: "03:30 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "One of the most photogenic highway stretches in all of Asia."
          },
          {
            _key: "dho1d",
            title: "Check-in to Dholavira Tourism Resort & Sunset Bhunga",
            description: "Check in to traditional circular Kutchi mud cottages (Bhungas) at Dholavira resort, watching the sun dip into the salt flats.",
            location: {
              name: "Dholavira Tourism Resort",
              lat: 23.882,
              lng: 70.218
            },
            time: "05:45 PM",
            type: "accommodation",
            cost: 3800,
            currency: "INR",
            notes: "Equipped with traditional mirrors and hand-painted mud walls."
          }
        ]
      },
      {
        _key: "dho-day2",
        dayNumber: 2,
        title: "Full Day Guided Exploration of UNESCO Dholavira Harappan Excavation",
        date: "2026-11-20",
        summary: "Dedicate the entire day to exploring one of the two largest Harappan sites in India. Walk through the fortified Citadel, the ceremonial Middle Town, the Lower Town, inspect the mammoth 5,000-year-old stone step reservoirs, the underground storm-water drainage network, and view the famous 10-letter Harappan signboard in the ASI Museum.",
        activities: [
          {
            _key: "dho2a",
            title: "The Citadel & Grand Stadium of Harappa",
            description: "Walk the massive dressed-stone ramparts of the Citadel and the vast ceremonial sports/festival ground between the Citadel and Middle Town.",
            location: {
              name: "Dholavira Harappan Citadel",
              lat: 23.886,
              lng: 70.213
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Hire an ASI-certified local guide at the ticket counter."
          },
          {
            _key: "dho2b",
            title: "Mammoth 5,000-Year-Old Stone Step Reservoirs",
            description: "Inspect the colossal rock-cut rainwater harvesting reservoirs, stone sluice gates, and water filtration conduits that sustained 20,000 residents in arid Kutch.",
            location: {
              name: "Dholavira Harappan Reservoirs",
              lat: 23.8875,
              lng: 70.2145
            },
            time: "10:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "A breathtaking testament to ancient urban hydraulic engineering."
          },
          {
            _key: "dho2c",
            title: "Traditional Kutchi Thali Lunch at Toran Dining Hall",
            description: "Relish Gujarati Kadhi, Ringan No Olo (smoked eggplant bharta), Rotla, and fresh jaggery ghee.",
            location: {
              name: "Toran Dining Dholavira",
              lat: 23.881,
              lng: 70.217
            },
            time: "01:15 PM",
            type: "food",
            cost: 350,
            currency: "INR",
            notes: "Authentic, wholesome rural Kutchi recipes."
          },
          {
            _key: "dho2d",
            title: "ASI Museum & 10-Symbol Harappan Signboard",
            description: "Examine excavated beads, seals with unicorn motifs, terracotta ornaments, bronze weights, and the iconic 10-symbol wooden signboard replica.",
            location: {
              name: "Dholavira Archaeological Museum",
              lat: 23.8845,
              lng: 70.216
            },
            time: "03:00 PM",
            type: "sightseeing",
            cost: 25,
            currency: "INR",
            notes: "Deeply educational curation spanning all 7 developmental stages."
          }
        ]
      },
      {
        _key: "dho-day3",
        dayNumber: 3,
        title: "Dholavira Fossil Park → Chipper Point Sunset → Kala Dungar Hills",
        date: "2026-11-21",
        summary: "Visit the Jurassic Fossil Park on Khadir Bet displaying 175-million-year-old petrified tree trunks, drive out to Chipper Point at the northern edge of the island where the White Desert meets the sky, and journey towards Bhuj via the panoramic heights of Kala Dungar (Black Hill).",
        activities: [
          {
            _key: "dho3a",
            title: "Wood Fossil Park on Khadir Bet",
            description: "Marvel at massive 175-million-year-old petrified Jurassic tree trunks embedded naturally in stone cliffs from when Kutch was underwater.",
            location: {
              name: "Dholavira Fossil Park",
              lat: 23.91,
              lng: 70.23
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Incredible geological evidence of the prehistoric sea."
          },
          {
            _key: "dho3b",
            title: "Chipper Point Edge of the White Desert",
            description: "Drive to the outermost tip of Khadir Bet island to witness the blinding white horizon where flamingos feed in salt pools during winter.",
            location: {
              name: "Chipper Point Dholavira",
              lat: 23.94,
              lng: 70.25
            },
            time: "10:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Feels like the edge of the world; stark white wilderness."
          },
          {
            _key: "dho3c",
            title: "Drive to Kala Dungar (Highest Point of Kutch at 462 m)",
            description: "Scenic 2.5-hour drive to Kala Dungar for a panoramic 360-degree vista of the Great Rann of Kutch blending seamlessly into the Arabian sky.",
            location: {
              name: "Kala Dungar Black Hill",
              lat: 23.929,
              lng: 69.815
            },
            time: "03:30 PM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Visit the 400-year-old Dattatreya Temple where wild jackals are fed sacred prasad daily."
          },
          {
            _key: "dho3d",
            title: "Check-in to Bhuj Heritage Hotel",
            description: "Drive down to Bhuj city and check in to Regenta Resort or traditional heritage haveli.",
            location: {
              name: "Regenta Resort Bhuj",
              lat: 23.238,
              lng: 69.645
            },
            time: "07:30 PM",
            type: "accommodation",
            cost: 4200,
            currency: "INR",
            notes: "Relax with authentic Kutchi dinner and Gujarati sweets."
          }
        ]
      },
      {
        _key: "dho-day4",
        dayNumber: 4,
        title: "Aina Mahal & Prag Mahal Tour → Bhuj Airport → Mumbai / Pune",
        date: "2026-11-22",
        summary: "Explore the ornate mirror halls of 18th-century Aina Mahal and Italian-Gothic Prag Mahal in Bhuj, pick up authentic Ajrakh block-print scarves, and head to Bhuj Airport for your flight back home.",
        activities: [
          {
            _key: "dho4a",
            title: "Tour of Aina Mahal (Hall of Mirrors) & Prag Mahal",
            description: "Marvel at the Venetian glass chandeliers, mirror-lined walls, and English clock tower built by master artisan Ram Singh Malam in the 18th century.",
            location: {
              name: "Aina Mahal Bhuj",
              lat: 23.255,
              lng: 69.667
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 150,
            currency: "INR",
            notes: "Magnificent blend of European and Kutchi royal aesthetics."
          },
          {
            _key: "dho4b",
            title: "Transfer to Bhuj Airport (BHJ) & Return Flight",
            description: "Short 15-minute cab ride to Bhuj Airport for direct flight back to Mumbai (BOM) or Pune (PNQ).",
            location: {
              name: "Bhuj Airport Terminal",
              lat: 23.2878,
              lng: 69.6701
            },
            time: "12:30 PM",
            type: "transport",
            cost: 6200,
            currency: "INR",
            notes: "Arrive 2 hours prior to scheduled departure."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-mandvi-4-days",
    title: "Mandvi Maritime Heritage & Pristine Arabian Sea — 4 Days from Mumbai / Pune",
    slug: "mandvi-4-days",
    excerpt: "Head from Mumbai or Pune to the historic maritime port of Mandvi on Kutch's Arabian Sea coast. Watch master carpenters hand-build 400-year-old mammoth wooden dhow ships on the Rukmavati River, stroll the private beaches of the royal Vijay Vilas Palace, admire windmill-lined shores, and sample authentic Kutchi coastal flavours.",
    tags: [
      "Gujarat",
      "Coastal",
      "Heritage",
      "Beach",
      "Offbeat",
      "Crafts",
      "Culture",
      "India"
    ],
    country: "India",
    startDate: "2026-11-26",
    endDate: "2026-11-29",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 17500,
    currency: "INR",
    tripType: "Maritime Heritage & Coastal Getaway",
    readingTime: 8,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "man-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Bhuj Airport → Scenic Drive to Mandvi Beach",
        date: "2026-11-26",
        summary: "Fly into Bhuj Airport (BHJ) from Mumbai (BOM) or Pune (PNQ). Meet your chauffeur for a comfortable 1-hour drive through date-palm plantations to the historic port town of Mandvi. Check into a beachfront luxury tent or resort, relaxing with an evening barefoot stroll on Mandvi Wind Farm Beach.",
        activities: [
          {
            _key: "man1a",
            title: "Morning Flight Mumbai / Pune to Bhuj (BHJ)",
            description: "Direct flight to Bhuj Airport (~1 hr 15 mins). Meet your driver for the 55-km drive to Mandvi coast.",
            location: {
              name: "Bhuj Airport",
              lat: 23.2878,
              lng: 69.6701
            },
            time: "10:30 AM",
            type: "transport",
            cost: 5800,
            currency: "INR",
            notes: "Smooth, scenic 2-lane coastal highway."
          },
          {
            _key: "man1b",
            title: "Check-in to Serena Beach Resort Mandvi",
            description: "Check in to luxury beachfront tents or cottages with direct private access to pristine Arabian Sea beaches.",
            location: {
              name: "Serena Beach Resort",
              lat: 22.825,
              lng: 69.318
            },
            time: "01:00 PM",
            type: "accommodation",
            cost: 6500,
            currency: "INR",
            notes: "Private beach dunes, swimming pool, and spa amenities."
          },
          {
            _key: "man1c",
            title: "Fresh Seafood & Kutchi Thali Lunch",
            description: "Enjoy fresh surmai fry, prawn masala, or authentic vegetarian Kutchi thali with Bajra Rotla and garlic chutney.",
            location: {
              name: "Osho Restaurant Mandvi",
              lat: 22.833,
              lng: 69.355
            },
            time: "02:15 PM",
            type: "food",
            cost: 650,
            currency: "INR",
            notes: "Renowned across Kutch for unmatched authentic home-style thalis."
          },
          {
            _key: "man1d",
            title: "Sunset Stroll at Mandvi Wind Farm Beach",
            description: "Walk the golden sands of Asia's first wind-farm beach with tall windmills spinning against pink and orange sunset skies.",
            location: {
              name: "Wind Farm Beach Mandvi",
              lat: 22.818,
              lng: 69.345
            },
            time: "05:15 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Camel and horse rides available right on the shore."
          }
        ]
      },
      {
        _key: "man-day2",
        dayNumber: 2,
        title: "400-Year-Old Wooden Shipbuilding Yards → Royal Vijay Vilas Palace",
        date: "2026-11-27",
        summary: "Witness living history along the banks of the Rukmavati River, where Kharva shipwrights hand-build mammoth wooden sea vessels without blueprints. In the afternoon, visit the 1929 Rajput-Victorian Vijay Vilas Palace, exploring royal reception rooms, film shoot locations, and private royal beach pavilions.",
        activities: [
          {
            _key: "man2a",
            title: "Rukmavati River Wooden Dhow Shipbuilding Yards",
            description: "Walk among the ribs of colossal wooden merchant dhows hand-carved from Malaysian sal wood by master craftsmen whose families have built ships for 400 years.",
            location: {
              name: "Mandvi Shipbuilding Yards",
              lat: 22.831,
              lng: 69.36
            },
            time: "09:00 AM",
            type: "activity",
            cost: 100,
            currency: "INR",
            notes: "The vessels are ordered by merchants across the Persian Gulf and Africa."
          },
          {
            _key: "man2b",
            title: "Visit Topansar Lake & Rukmavati Stone Bridge",
            description: "Walk across the 1883 four-arched stone bridge built over Rukmavati river and visit the peaceful migratory bird sanctuary at Topansar Lake.",
            location: {
              name: "Rukmavati Bridge Mandvi",
              lat: 22.834,
              lng: 69.358
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "One of the oldest stone bridges in western India."
          },
          {
            _key: "man2c",
            title: "Original Mandvi Dabeli at Joshi Dabeli Center",
            description: "Taste the iconic snack in the very town where it was invented in the 1960s by Keshavji Gabha Chudasama.",
            location: {
              name: "Joshi Dabeli Mandvi",
              lat: 22.835,
              lng: 69.352
            },
            time: "01:30 PM",
            type: "food",
            cost: 150,
            currency: "INR",
            notes: "Served with unique spicy garlic chutney and fresh roasted peanuts."
          },
          {
            _key: "man2d",
            title: "Tour of Vijay Vilas Palace & Private Royal Beach",
            description: "Explore the red sandstone summer retreat built by Maharao Shri Khengarji III, featuring Bengali domes, Gothic arches, stained glass windows, and a pristine private beach.",
            location: {
              name: "Vijay Vilas Palace",
              lat: 22.8335,
              lng: 69.298
            },
            time: "03:15 PM",
            type: "sightseeing",
            cost: 200,
            currency: "INR",
            notes: "Iconic filming location for Bollywood blockbusters like 'Hum Dil De Chuke Sanam'."
          }
        ]
      },
      {
        _key: "man-day3",
        dayNumber: 3,
        title: "72 Jinalaya Temple Complex → Bandhani Tie-and-Dye Artisans",
        date: "2026-11-28",
        summary: "Take a morning excursion to the sprawling marble complex of 72 Jinalaya (Bhadreshwar Tirth), dedicated to Mahavira. Return to Mandvi's narrow old alleys to watch master craftsmen create world-renowned Bandhani (tie-and-dye) textiles.",
        activities: [
          {
            _key: "man3a",
            title: "Excursion to 72 Jinalaya Jain Temple Complex",
            description: "Marvel at the colossal 80-acre white marble temple sanctuary featuring 72 distinct shrines surrounding the central sanctum.",
            location: {
              name: "72 Jinalaya Mandvi Highway",
              lat: 22.956,
              lng: 69.452
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Immaculate tranquility, serene marble carving, and satvik atmosphere."
          },
          {
            _key: "man3b",
            title: "Satvik Lunch at 72 Jinalaya Bhojanshala",
            description: "Wholesome satvik Jain thali prepared fresh with pure ghee and local seasonal produce.",
            location: {
              name: "72 Jinalaya Bhojanshala",
              lat: 22.956,
              lng: 69.452
            },
            time: "12:30 PM",
            type: "food",
            cost: 120,
            currency: "INR",
            notes: "Strict satvik lunch served until 1:30 PM."
          },
          {
            _key: "man3c",
            title: "Bandhani (Tie-and-Dye) Artisan Workshop Tour",
            description: "Meet Khatri community master artisans tying thousands of microscopic knots with thread on silk and georgette fabric before natural dye dipping.",
            location: {
              name: "Mandvi Old Bazaar",
              lat: 22.834,
              lng: 69.353
            },
            time: "03:00 PM",
            type: "activity",
            cost: 500,
            currency: "INR",
            notes: "Buy authentic GI-tagged Kutchi Bandhani sarees and dupattas directly from makers."
          },
          {
            _key: "man3d",
            title: "Sunset at Kashivishvanath Beach & Coconut Water",
            description: "Relax on the quiet sands listening to the crashing waves, enjoying fresh tender coconut water and spicy corn on the cob.",
            location: {
              name: "Kashivishvanath Beach",
              lat: 22.822,
              lng: 69.33
            },
            time: "05:30 PM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "Far less crowded than the main beach."
          }
        ]
      },
      {
        _key: "man-day4",
        dayNumber: 4,
        title: "Kranti Teerth Memorial → Bhuj Airport → Mumbai / Pune",
        date: "2026-11-29",
        summary: "Visit the inspiring Kranti Teerth memorial dedicated to freedom fighter Shyamji Krishna Varma on the outskirts of Mandvi, before heading to Bhuj Airport for your flight back home.",
        activities: [
          {
            _key: "man4a",
            title: "Visit Kranti Teerth (Shyamji Krishna Varma Memorial)",
            description: "Tour the exact replica of London's 'India House' built on the Mandvi coast commemorating the revolutionary patriot and his comrades.",
            location: {
              name: "Kranti Teerth Mandvi",
              lat: 22.846,
              lng: 69.382
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Houses the sacred urns containing the ashes of Shyamji and his wife brought from Geneva."
          },
          {
            _key: "man4b",
            title: "Transfer to Bhuj Airport (BHJ) & Return Flight",
            description: "Drive back to Bhuj Airport for your direct afternoon flight to Mumbai (BOM) or Pune (PNQ).",
            location: {
              name: "Bhuj Airport Terminal",
              lat: 23.2878,
              lng: 69.6701
            },
            time: "12:00 PM",
            type: "transport",
            cost: 5800,
            currency: "INR",
            notes: "Arrive 90 minutes before flight departure."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-poshina-3-days",
    title: "Poshina Tribal Valleys & Sacred Terracotta Shrines — 3 Days from Mumbai / Pune",
    slug: "poshina-3-days",
    excerpt: "Venture from Mumbai or Pune into the rugged Aravalli borderlands of northern Gujarat to Poshina. Stay at the royal 17th-century Darbargadh Poshina palace, discover hidden sacred forest groves with thousands of votive terracotta horses offered by Garasia and Bhil tribes, and trek through the ancient 10th-century Jain temple ruins of Polo Forest.",
    tags: [
      "Gujarat",
      "Tribal",
      "Heritage",
      "Offbeat",
      "Culture",
      "Forest",
      "Ruins",
      "India"
    ],
    country: "India",
    startDate: "2026-12-03",
    endDate: "2026-12-05",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 14500,
    currency: "INR",
    tripType: "Tribal Shrines & Royal Heritage",
    readingTime: 7,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "pos-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Ahmedabad Airport → Scenic Drive to Poshina",
        date: "2026-12-03",
        summary: "Take a 1-hour flight from Mumbai (BOM) or Pune (PNQ) to Ahmedabad Airport (AMD), or take the morning Vande Bharat Express. Meet your driver for a scenic 3-hour journey through Sabarkantha into the Aravalli hills. Check in to Darbargadh Poshina — a 17th-century fortified palace hosted by the local royal family.",
        activities: [
          {
            _key: "pos1a",
            title: "Morning Flight Mumbai / Pune to Ahmedabad (AMD)",
            description: "Direct flight to Sardar Vallabhbhai Patel International Airport (~1 hr 10 mins). Meet your private chauffeur for the 140-km drive.",
            location: {
              name: "Ahmedabad International Airport",
              lat: 23.0772,
              lng: 72.6347
            },
            time: "09:30 AM",
            type: "transport",
            cost: 4200,
            currency: "INR",
            notes: "Scenic highway route via Himatnagar and Idar."
          },
          {
            _key: "pos1b",
            title: "Check-in to Darbargadh Poshina Heritage Palace",
            description: "Check in to this aristocratic 17th-century fortified palace featuring courtyards, pillared verandas, royal armory, and antique family memorabilia.",
            location: {
              name: "Darbargadh Poshina",
              lat: 24.1667,
              lng: 73.0833
            },
            time: "01:00 PM",
            type: "accommodation",
            cost: 5500,
            currency: "INR",
            notes: "Warm personal hospitality from Rawat Harendra Singhji and family."
          },
          {
            _key: "pos1c",
            title: "Royal Rajput-Gujarati Feast at Darbargadh",
            description: "Savor recipes passed down generations: Sev Tameta nu Shaak, Ringan Bharta, Kathiawadi Dal, and piping hot Rotlas with pure churned butter.",
            location: {
              name: "Darbargadh Dining Hall",
              lat: 24.1667,
              lng: 73.0833
            },
            time: "02:15 PM",
            type: "food",
            cost: 850,
            currency: "INR",
            notes: "Dine on vintage silver and brass thalis."
          },
          {
            _key: "pos1d",
            title: "Evening Village Walk & Silver Artisan Bazaar",
            description: "Stroll through Poshina's village lanes to visit tribal silver and brass craftsmen making massive hollow silver anklets, amulets, and arrows.",
            location: {
              name: "Poshina Village Market",
              lat: 24.168,
              lng: 73.082
            },
            time: "05:00 PM",
            type: "activity",
            cost: 200,
            currency: "INR",
            notes: "Meet friendly Garasia and Bhil tribal women dressed in brilliant red and yellow odhanis."
          }
        ]
      },
      {
        _key: "pos-day2",
        dayNumber: 2,
        title: "Sacred Terracotta Horse Shrines → Garasia & Bhil Tribal Hamlets",
        date: "2026-12-04",
        summary: "Join the palace host on an expedition deep into the forested Aravalli hills to witness one of India's most extraordinary folk shrines: thousands of votive terracotta horses standing under sacred banyan trees, offered by local tribes to invoke divine blessings.",
        activities: [
          {
            _key: "pos2a",
            title: "Expedition to Sacred Terracotta Horse Forest Groves",
            description: "Walk into an enchanted clearing beneath ancient banyan canopies where thousands of handmade clay horses, elephants, and chhatris stand silently offered to village spirits.",
            location: {
              name: "Terracotta Horse Shrines Poshina",
              lat: 24.18,
              lng: 73.11
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 150,
            currency: "INR",
            notes: "An awe-inspiring spiritual tradition practiced undisturbed for millennia."
          },
          {
            _key: "pos2b",
            title: "Visit Potter Hamlet Crafting Votive Terracotta Horses",
            description: "Watch tribal potter families sculpting hollow terracotta horses with clay gathered from forest riverbeds, baking them in wood fires.",
            location: {
              name: "Poshina Kumhar Hamlet",
              lat: 24.175,
              lng: 73.095
            },
            time: "11:00 AM",
            type: "activity",
            cost: 300,
            currency: "INR",
            notes: "You can purchase small authentic terracotta horses directly from the artist."
          },
          {
            _key: "pos2c",
            title: "Farmstead Picnic Lunch by River Sei",
            description: "Enjoy fresh farm-cooked rotlas, methi theplas, kachumber salad, and buttermilk under the shade of mango trees beside the river.",
            location: {
              name: "Sei River Riverside",
              lat: 24.16,
              lng: 73.07
            },
            time: "01:30 PM",
            type: "food",
            cost: 450,
            currency: "INR",
            notes: "Prepared by the palace staff using farm-fresh vegetables."
          },
          {
            _key: "pos2d",
            title: "Visit Garasia & Bhil Tribal Homesteads",
            description: "Learn about tribal customs, painted wall murals (Pithora art), traditional bow-and-arrow craft, and herbal forest medicine.",
            location: {
              name: "Garasia Tribal Settlement",
              lat: 24.19,
              lng: 73.125
            },
            time: "04:00 PM",
            type: "activity",
            cost: 200,
            currency: "INR",
            notes: "Guided with deep cultural sensitivity and respect for community privacy."
          }
        ]
      },
      {
        _key: "pos-day3",
        dayNumber: 3,
        title: "Polo Forest Ancient Temple Ruins → Ahmedabad Airport → Mumbai / Pune",
        date: "2026-12-05",
        summary: "Depart Poshina and drive 45 minutes south to the lush Polo Forest. Hike among the 10th-century carved Jain and Shiva temple ruins along the Harnav River, before returning to Ahmedabad for your evening flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "pos3a",
            title: "Trek through Ancient Polo Forest Ruins",
            description: "Explore the 10th-century ruined Jain temples, the Shiva temple at Sharaneshwar, and carved stepwells hidden amidst dense deciduous teak forest.",
            location: {
              name: "Polo Forest Ruins",
              lat: 24.004,
              lng: 73.238
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "Stunning forest setting along the pristine Harnav River."
          },
          {
            _key: "pos3b",
            title: "Gujarati Thali Lunch at Idar / Sabarkantha",
            description: "Enjoy a traditional unlimited Gujarati thali with sweet dal, khichdi, kadhi, and shrikhand.",
            location: {
              name: "Highway Grand Dining Sabarkantha",
              lat: 23.83,
              lng: 72.99
            },
            time: "01:00 PM",
            type: "food",
            cost: 400,
            currency: "INR",
            notes: "Quick, clean highway dining break on route to Ahmedabad."
          },
          {
            _key: "pos3c",
            title: "Transfer to Ahmedabad Airport (AMD) & Return Flight",
            description: "Reach Ahmedabad Airport for your evening flight back to Mumbai (BOM) or Pune (PNQ).",
            location: {
              name: "Ahmedabad International Airport",
              lat: 23.0772,
              lng: 72.6347
            },
            time: "04:30 PM",
            type: "transport",
            cost: 4200,
            currency: "INR",
            notes: "Arrive 2 hours prior to scheduled departure."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-champaner-pavagadh-3-days",
    title: "Champaner-Pavagadh UNESCO Heritage & Sacred Peak — 3 Days from Mumbai / Pune",
    slug: "champaner-pavagadh-3-days",
    excerpt: "Embark from Mumbai or Pune on a quick Vande Bharat getaway to the UNESCO World Heritage Archaeological Park of Champaner-Pavagadh. Discover the breathtaking 16th-century Indo-Islamic Sultanate mosques with lace-like stone filigree, ascend the dramatic volcanic Pavagadh Hill to the Kalika Mata Temple via ropeway, and tour Vadodara's royal Laxmi Vilas Palace.",
    tags: [
      "Gujarat",
      "UNESCO",
      "Heritage",
      "Temples",
      "Architecture",
      "Offbeat",
      "Culture",
      "India"
    ],
    country: "India",
    startDate: "2026-12-10",
    endDate: "2026-12-12",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 12500,
    currency: "INR",
    tripType: "UNESCO Architecture & Sacred Mountain",
    readingTime: 7,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "cha-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Vadodara Vande Bharat → Champaner Jami Masjid Sunset",
        date: "2026-12-10",
        summary: "Board the high-speed Mumbai Central – Gandhinagar Vande Bharat Express (or fly from Pune to Vadodara BDQ). Reach Vadodara Junction in just 4.5 hours. Take a smooth 50-minute cab ride to the foothills of Champaner. Check in to a heritage eco-resort, relaxing with a golden hour visit to the magnificent 1513 Jami Masjid.",
        activities: [
          {
            _key: "cha1a",
            title: "Morning Vande Bharat Express to Vadodara Junction (BRC)",
            description: "High-speed train from Mumbai Central (06:00 AM) arriving in Vadodara by 10:15 AM (or flight from Pune/Mumbai to BDQ). Chauffeur pickup at station.",
            location: {
              name: "Vadodara Junction Railway Station",
              lat: 22.3107,
              lng: 73.1812
            },
            time: "10:15 AM",
            type: "transport",
            cost: 1650,
            currency: "INR",
            notes: "Comfortable Executive Chair Car travel with scenic views."
          },
          {
            _key: "cha1b",
            title: "Check-in to Champaner Heritage Resort",
            description: "Check in to sprawling mango and chikoo orchard cottages situated at the base of Pavagadh hill.",
            location: {
              name: "Champaner Heritage Resort",
              lat: 22.485,
              lng: 73.535
            },
            time: "12:00 PM",
            type: "accommodation",
            cost: 4200,
            currency: "INR",
            notes: "Serene rural environment with backdrop of the volcanic peak."
          },
          {
            _key: "cha1c",
            title: "Authentic Gujarati Thali Lunch at Bageecha",
            description: "Savor local Gujarati dishes: Undhiyu, Sev Tameta, hot Phulkas, Steamed Rice, Dal, and Gulab Jamun.",
            location: {
              name: "Bageecha Restaurant Halol",
              lat: 22.502,
              lng: 73.475
            },
            time: "01:30 PM",
            type: "food",
            cost: 450,
            currency: "INR",
            notes: "Wholesome, clean regional vegetarian thali."
          },
          {
            _key: "cha1d",
            title: "Golden Hour at Jami Masjid (Great Mosque of Champaner)",
            description: "Marvel at Sultan Mahmud Begada's architectural masterpiece dating from 1513 — 172 carved pillars, high central dome, 7 mihrabs, and perforated stone screens.",
            location: {
              name: "Jami Masjid Champaner",
              lat: 22.4858,
              lng: 73.5385
            },
            time: "04:30 PM",
            type: "sightseeing",
            cost: 40,
            currency: "INR",
            notes: "Considered the pinnacle of Indo-Islamic mosque architecture in Gujarat."
          }
        ]
      },
      {
        _key: "cha-day2",
        dayNumber: 2,
        title: "Pavagadh Hill Ropeway & Kalika Mata Temple → UNESCO Monuments",
        date: "2026-12-11",
        summary: "Ride the modern Udan Khatola cable car up the dramatic 800-meter volcanic Pavagadh hill to the revered Kalika Mata Temple Shaktipeeth atop the pinnacle. In the afternoon, descend to explore Champaner Archaeological Park's medieval monuments: Kevda Masjid, Nagina Masjid, Citadel walls, and the spiral Helical Stepwell.",
        activities: [
          {
            _key: "cha2a",
            title: "Pavagadh Hill Cable Car (Udan Khatola) & Sacred Summit Climb",
            description: "Glide over sheer volcanic cliffs on the ropeway to the Mauliya plateau, then climb the stone stairs to the sacred Kalika Mata Temple perched atop the cliff crest.",
            location: {
              name: "Pavagadh Hill Summit",
              lat: 22.46,
              lng: 73.518
            },
            time: "07:30 AM",
            type: "activity",
            cost: 250,
            currency: "INR",
            notes: "One of the 51 Shaktipeeths; mesmerizing mist and sunrise valley panoramas."
          },
          {
            _key: "cha2b",
            title: "Lakulisha Temple & Sadan Shah Peer Dargah Ruins",
            description: "Explore the ancient 10th-century Lakulisha temple carvings and historical bastions scattered across the Pavagadh plateau.",
            location: {
              name: "Lakulisha Temple Pavagadh",
              lat: 22.463,
              lng: 73.52
            },
            time: "10:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Unique harmony of Hindu, Jain, and Islamic spiritual architecture on one hill."
          },
          {
            _key: "cha2c",
            title: "Country Lunch at Hotel Sarvottam Halol",
            description: "Relish spicy Kathiawadi Baingan Bharta, Bajra Rotla with white butter, and refreshing cold buttermilk.",
            location: {
              name: "Hotel Sarvottam Halol",
              lat: 22.505,
              lng: 73.472
            },
            time: "01:30 PM",
            type: "food",
            cost: 350,
            currency: "INR",
            notes: "Popular local highway stop known for rich Kathiawadi taste."
          },
          {
            _key: "cha2d",
            title: "Tour of Nagina Masjid, Kevda Masjid & Helical Stepwell",
            description: "Discover the pure white cenotaph of Nagina Masjid, the floral globe carvings of Kevda Masjid, and descend the spiral stone staircase of Helical Vav.",
            location: {
              name: "Nagina Masjid Champaner",
              lat: 22.492,
              lng: 73.535
            },
            time: "03:45 PM",
            type: "sightseeing",
            cost: 40,
            currency: "INR",
            notes: "The 16th-century spiral stepwell is a marvel of medieval hydraulic design."
          }
        ]
      },
      {
        _key: "cha-day3",
        dayNumber: 3,
        title: "Laxmi Vilas Palace Tour → Sev Usal Tasting → Return Train/Flight",
        date: "2026-12-12",
        summary: "Drive to Vadodara city to tour the grand Laxmi Vilas Palace — four times the size of Buckingham Palace. Savor Vadodara's famous Mahakali Sev Usal and board your afternoon Vande Bharat train or flight back to Mumbai or Pune.",
        activities: [
          {
            _key: "cha3a",
            title: "Tour of Majestic Laxmi Vilas Palace Vadodara",
            description: "Tour the 1890 Indo-Saracenic palace of the Gaekwad dynasty featuring Belgian stained glass, Italian marble mosaic floors, armory, and peacocks on golf lawns.",
            location: {
              name: "Laxmi Vilas Palace Vadodara",
              lat: 22.2941,
              lng: 73.1925
            },
            time: "09:30 AM",
            type: "sightseeing",
            cost: 300,
            currency: "INR",
            notes: "Audio guide voiced by the Gaekwad royal family included."
          },
          {
            _key: "cha3b",
            title: "Iconic Vadodara Street Food Lunch: Mahakali Sev Usal",
            description: "Taste Vadodara's legendary fiery green-pea curry topped with spicy sev, tari, spring onions, and buttered pav.",
            location: {
              name: "Mahakali Sev Usal Vadodara",
              lat: 22.302,
              lng: 73.208
            },
            time: "01:00 PM",
            type: "food",
            cost: 150,
            currency: "INR",
            notes: "A culinary must-do when in Vadodara since 1972."
          },
          {
            _key: "cha3c",
            title: "Return Vande Bharat / Flight to Mumbai / Pune",
            description: "Board the afternoon Vande Bharat Express from Vadodara Junction (03:30 PM) arriving Mumbai Central by 08:00 PM, or flight to Pune/Mumbai.",
            location: {
              name: "Vadodara Junction Railway Station",
              lat: 22.3107,
              lng: 73.1812
            },
            time: "03:30 PM",
            type: "transport",
            cost: 1650,
            currency: "INR",
            notes: "Relaxing end to a 3-day UNESCO heritage escape."
          }
        ]
      }
    ]
  },
  {
    _id: "trip-palitana-3-days",
    title: "Palitana Sacred Shatrunjaya Temples — 3 Days from Mumbai / Pune",
    slug: "palitana-3-days",
    excerpt: "Embark from Mumbai or Pune on a sacred pilgrimage to Palitana — the world's first vegetarian city. Climb 3,800 hand-hewn stone steps up Mount Shatrunjaya to an ethereal city of 900+ white marble Jain temples overlooking the Shetrunji River, accompanied by Bhavnagar's coastal palaces and satvik Gujarati hospitality.",
    tags: [
      "Gujarat",
      "Pilgrimage",
      "Temples",
      "Architecture",
      "Offbeat",
      "Spiritual",
      "Culture",
      "India"
    ],
    country: "India",
    startDate: "2026-12-17",
    endDate: "2026-12-19",
    bestSuggestedMonth: "October – March",
    status: "published",
    viewCount: 0,
    totalBudget: 11500,
    currency: "INR",
    tripType: "Sacred Pilgrimage & Temple City",
    readingTime: 7,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "pal-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Bhavnagar Airport / Train → Palitana Check-in",
        date: "2026-12-17",
        summary: "Take a flight from Mumbai (BOM) or Pune (PNQ) to Bhavnagar Airport (BHU) or take the overnight Saurashtra / Bandra-Bhavnagar Express train. Take a 1-hour drive through the Saurashtra countryside to Palitana. Check in to a peaceful dharamsala or resort, relax, and explore the vegetarian town and Taleti foothill museums.",
        activities: [
          {
            _key: "pal1a",
            title: "Flight Mumbai / Pune to Bhavnagar Airport (BHU)",
            description: "Direct flight landing at Bhavnagar Airport (~1 hr 10 mins). Meet your taxi for the 50-km drive to Palitana town.",
            location: {
              name: "Bhavnagar Airport",
              lat: 21.7519,
              lng: 72.1852
            },
            time: "10:30 AM",
            type: "transport",
            cost: 3800,
            currency: "INR",
            notes: "Smooth rural 2-lane road through Saurashtra cotton fields."
          },
          {
            _key: "pal1b",
            title: "Check-in to Vijay Vilas Heritage Homestay / Dharamsala",
            description: "Check in to Vijay Vilas Palace homestay or modern pilgrim dharamsala at the foot of Shatrunjaya hill.",
            location: {
              name: "Vijay Vilas Palitana",
              lat: 21.52,
              lng: 71.835
            },
            time: "12:30 PM",
            type: "accommodation",
            cost: 3200,
            currency: "INR",
            notes: "Pure vegetarian and satvik premises."
          },
          {
            _key: "pal1c",
            title: "Satvik Kathiawadi Thali at Taleti",
            description: "Enjoy authentic satvik dishes without onion or garlic: Moong dal khichdi, Kadhi, ringna no olo, and hot rotlas.",
            location: {
              name: "Taleti Bhojanshala Palitana",
              lat: 21.515,
              lng: 71.83
            },
            time: "01:30 PM",
            type: "food",
            cost: 250,
            currency: "INR",
            notes: "Food in Palitana is 100% vegetarian by law."
          },
          {
            _key: "pal1d",
            title: "Visit Sri Vishal Jain Museum at Taleti Foothills",
            description: "View ancient palm-leaf manuscripts, circular cosmographical maps (Jambudvipa), and carved ivory relics before preparing for tomorrow's early climb.",
            location: {
              name: "Vishal Jain Museum",
              lat: 21.512,
              lng: 71.828
            },
            time: "04:30 PM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Early sleep recommended for the 05:00 AM summit trek."
          }
        ]
      },
      {
        _key: "pal-day2",
        dayNumber: 2,
        title: "Early Dawn Climb of Mount Shatrunjaya (3,800 Steps) & Marble Temples",
        date: "2026-12-18",
        summary: "Begin the sacred spiritual ascent of Mount Shatrunjaya at 05:00 AM before dawn. Climb 3,800 hand-hewn marble steps amidst chanting pilgrims to reach the mountain crest, home to 900+ intricately carved marble temples. Offer prayers at the Adishwar Temple, explore the Chaumukha Temple, and descend before midday.",
        activities: [
          {
            _key: "pal2a",
            title: "Dawn Ascent of Mount Shatrunjaya (3,800 Steps)",
            description: "Begin the climb at 05:00 AM in cool morning air with walking sticks or doli (palanquin) option for senior citizens, watching the sunrise over Shetrunji River.",
            location: {
              name: "Shatrunjaya Foothills Taleti",
              lat: 21.508,
              lng: 71.825
            },
            time: "05:00 AM",
            type: "activity",
            cost: 800,
            currency: "INR",
            notes: "Takes 2 to 2.5 hours at a gentle pace. Wear comfortable walking shoes."
          },
          {
            _key: "pal2b",
            title: "Prayers & Marvel at Adishwar (Rishabhanatha) Temple",
            description: "Enter the main temple courtyard crowned by soaring spires and marble columns adorned with diamond-eyed idols of the first Tirthankara Lord Adinath.",
            location: {
              name: "Shri Adishwar Temple Summit",
              lat: 21.498,
              lng: 71.808
            },
            time: "08:00 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "One of the most sacred pilgrimage shrines in Jainism."
          },
          {
            _key: "pal2c",
            title: "Explore Chaumukha (Four-Faced) Temple & Summit Panorama",
            description: "Walk between the high stone walls of the nine sacred temple enclosures (Tuks), marveling at over 900 marble spires glistening in the mountain sun.",
            location: {
              name: "Chaumukha Temple Tuk",
              lat: 21.496,
              lng: 71.806
            },
            time: "10:00 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "No eating is permitted on the sacred mountain; descend before noon."
          },
          {
            _key: "pal2d",
            title: "Celebratory Satvik Gujarati Lunch at Taleti",
            description: "Descend to the foothill base and enjoy a celebratory satvik feast with sweet lapsi, sprouted moong, phulkas, and fresh chaas.",
            location: {
              name: "Siddhachal Bhojanshala",
              lat: 21.514,
              lng: 71.829
            },
            time: "01:00 PM",
            type: "food",
            cost: 250,
            currency: "INR",
            notes: "Soul-satisfying meal after completing the 7,600 total steps round-trip."
          }
        ]
      },
      {
        _key: "pal-day3",
        dayNumber: 3,
        title: "Hastagiri Tirth → Bhavnagar Heritage & Return Flight / Train",
        date: "2026-12-19",
        summary: "Visit the peaceful hilltop shrine of Hastagiri overlooking the Shetrunji River dam, drive to historic Bhavnagar to visit the 1894 Barton Library and Nilambag Palace, and board your afternoon flight or train back to Mumbai or Pune.",
        activities: [
          {
            _key: "pal3a",
            title: "Morning Excursion to Hastagiri Hill Tirth",
            description: "Drive 15 km to Hastagiri hill for magnificent views of the sacred Shatrunjaya peak across the waters of the Shetrunji River reservoir.",
            location: {
              name: "Hastagiri Jain Tirth",
              lat: 21.46,
              lng: 71.745
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Unbelievably tranquil hilltop with breeze and bird calls."
          },
          {
            _key: "pal3b",
            title: "Visit Historic Nilambag Palace & Barton Library Bhavnagar",
            description: "Tour the 1859 heritage Nilambag Palace hotel and the Victorian Gothic Barton Library in Bhavnagar city.",
            location: {
              name: "Nilambag Palace Bhavnagar",
              lat: 21.764,
              lng: 72.146
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 150,
            currency: "INR",
            notes: "Excellent royal architecture and heritage photographs."
          },
          {
            _key: "pal3c",
            title: "Transfer to Bhavnagar Airport (BHU) / Railway Station & Return",
            description: "Direct flight to Mumbai (BOM) or Pune (PNQ), or board the Bandra Terminus Express back home.",
            location: {
              name: "Bhavnagar Airport Terminal",
              lat: 21.7519,
              lng: 72.1852
            },
            time: "02:30 PM",
            type: "transport",
            cost: 3800,
            currency: "INR",
            notes: "Depart with spiritual fulfillment from Shatrunjaya's heights."
          }
        ]
      }
    ]
  },

  {
    _id: "trip-varanasi-ayodhya-prayagraj-5-days",
    title: "Varanasi, Ayodhya & Prayagraj Sacred Triangle — 5 Days from Mumbai / Pune",
    slug: "varanasi-ayodhya-prayagraj-5-days",
    excerpt: "Embark on an inspiring 5-day spiritual pilgrimage through India's holiest Gangetic triangle — from the eternal ghats, Kashi Vishwanath Jyotirlinga, and divine evening Maha Aarti of Varanasi (Kashi), to the sacred Triveni Sangam holy dip and reclining Hanuman in Prayagraj, culminating in the grand new Shri Ram Janmabhoomi Mandir and serene Saryu Aarti in Ayodhya. Curated with direct flights from Mumbai/Pune, verified riverside stays, and authentic satvik cuisine.",
    tags: [
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
    country: "India",
    startDate: "2026-10-20",
    endDate: "2026-10-24",
    bestSuggestedMonth: "October – March (Crisp 12°C–25°C, sacred festival season)",
    status: "published",
    viewCount: 0,
    totalBudget: 22500,
    currency: "INR",
    tripType: "Sacred Pilgrimage & Temple Circuit",
    readingTime: 9,
    _createdAt: "2026-09-08T00:00:00Z",
    _updatedAt: "2026-09-08T00:00:00Z",
    itinerary: [
      {
        _key: "vap-day1",
        dayNumber: 1,
        title: "Mumbai/Pune → Varanasi Airport (VNS) → Dashashwamedh Ghat Evening Maha Aarti",
        date: "2026-10-20",
        summary: "Board a direct morning flight from Mumbai (BOM) or Pune (PNQ) to Varanasi's Lal Bahadur Shastri Airport (VNS). Transfer to your riverside heritage haveli on the ghats. Enjoy authentic Banarasi Tamatar Chaat at Godowlia before embarking on a private sunset Bajra boat cruise to witness the world-renowned Dashashwamedh Ghat Ganga Maha Aarti.",
        activities: [
          {
            _key: "vap1a",
            title: "Direct Morning Flight Mumbai / Pune to Varanasi (VNS)",
            description: "Fly direct from Mumbai (BOM) or Pune (PNQ) to Varanasi Airport (~2 hrs 10 mins). Meet your private pre-booked chauffeur at the arrival gate.",
            location: {
              name: "Lal Bahadur Shastri International Airport Varanasi",
              lat: 25.4524,
              lng: 82.8593
            },
            time: "10:30 AM",
            type: "transport",
            cost: 6500,
            currency: "INR",
            notes: "Daily direct flights on IndiGo and Air India Express. Pre-arranged AC cab avoids airport touts."
          },
          {
            _key: "vap1b",
            title: "Check-in to BrijRama Palace / Riverside Heritage Haveli",
            description: "Arrive at Rajghat/Darbhanga Ghat and take a traditional wooden boat transfer to check in to the 210-year-old palace hotel directly on the riverfront.",
            location: {
              name: "BrijRama Palace Varanasi",
              lat: 25.3056,
              lng: 83.0102
            },
            time: "01:00 PM",
            type: "accommodation",
            cost: 8500,
            currency: "INR",
            notes: "Contact: +91-542-2450840. Uninterrupted view of the sacred Ganges from private stone balconies."
          },
          {
            _key: "vap1c",
            title: "Iconic Street Food Lunch at Kashi Chaat Bhandar",
            description: "Walk to Godowlia Chowk to savor the world-famous piping hot Tamatar Chaat served in earthen kulhads, crispy Palak Patta Chaat, and Gulab Jamun.",
            location: {
              name: "Kashi Chaat Bhandar Godowlia",
              lat: 25.3105,
              lng: 83.0075
            },
            time: "02:30 PM",
            type: "food",
            cost: 250,
            currency: "INR",
            notes: "Must-try Banaras specialty; uniquely spiced tomato puree with crispy namakpare."
          },
          {
            _key: "vap1d",
            title: "Sunset Bajra Boat Cruise across 84 Ghats",
            description: "Board a hand-rowed wooden Bajra boat at Assi Ghat and glide down the river past ancient sandstone palaces, akhadas, and historic ghats as dusk sets in.",
            location: {
              name: "Assi Ghat to Dashashwamedh Riverfront",
              lat: 25.2896,
              lng: 83.0068
            },
            time: "05:00 PM",
            type: "activity",
            cost: 1200,
            currency: "INR",
            notes: "MUST ATTEND: Experience the golden hour reflections of temples and thousands of floating marigold diyas."
          },
          {
            _key: "vap1e",
            title: "Dashashwamedh Ghat Evening Ganga Maha Aarti",
            description: "Witness the grand ritual performed by saffron-clad Vedic priests holding multi-tiered brass lamps, amidst the ringing of bronze bells, blowing of conch shells, and Vedic chanting.",
            location: {
              name: "Dashashwamedh Ghat Varanasi",
              lat: 25.3075,
              lng: 83.0106
            },
            time: "06:45 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "MUST ATTEND: The best vantage point is directly from your moored wooden boat on the river facing the ghat."
          }
        ]
      },
      {
        _key: "vap-day2",
        dayNumber: 2,
        title: "Shri Kashi Vishwanath Jyotirlinga Dham → Heritage Lanes → Sarnath Excursion",
        date: "2026-10-21",
        summary: "Rise before dawn for the divine Sugam Darshan at Shri Kashi Vishwanath Jyotirlinga through the grand corridor. Explore Annapurna Mandir, Manikarnika Ghat, and historic Galis. After a breakfast of clay-pot Blue Lassi and Malai Toast, journey to Sarnath where Lord Buddha delivered his historic first sermon.",
        activities: [
          {
            _key: "vap2a",
            title: "Shri Kashi Vishwanath Jyotirlinga Mangala Darshan",
            description: "Enter via the new river corridor directly from the ghat to offer bilva leaves, holy Ganga jal, and milk to the golden-spired Vishweshwara Jyotirlinga.",
            location: {
              name: "Shri Kashi Vishwanath Temple",
              lat: 25.3109,
              lng: 83.0107
            },
            time: "05:30 AM",
            type: "sightseeing",
            cost: 500,
            currency: "INR",
            notes: "MUST ATTEND: Book online Sugam Darshan ticket in advance to avoid 2-hour queue. Carry original ID."
          },
          {
            _key: "vap2b",
            title: "Maa Annapurna Mandir & Manikarnika Ghat Walk",
            description: "Seek blessings for perpetual abundance at Maa Annapurna Temple, followed by a sober, philosophical walk past Manikarnika Ghat (the eternal Mahashamshan crematorium).",
            location: {
              name: "Manikarnika Ghat Varanasi",
              lat: 25.3108,
              lng: 83.0142
            },
            time: "07:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Deeply reflective and sacred site where the eternal funeral fires have burned continuously for millennia."
          },
          {
            _key: "vap2c",
            title: "Breakfast: Blue Lassi Shop & Lakshmi Chai Toast",
            description: "Relish hand-churned thick curd lassi with pomegranate, banana, and rabdi at the 1925 Blue Lassi shop, paired with white-butter malai toast and saffron kulhad chai.",
            location: {
              name: "Blue Lassi Shop Varanasi",
              lat: 25.3115,
              lng: 83.0125
            },
            time: "09:00 AM",
            type: "food",
            cost: 200,
            currency: "INR",
            notes: "Located in the narrow heritage lanes near Manikarnika; loved by travelers worldwide."
          },
          {
            _key: "vap2d",
            title: "Excursion to Sarnath (Dhamek Stupa & Deer Park)",
            description: "Drive 10 km north to Sarnath, the sacred deer park where Lord Buddha preached his first sermon (Dharmachakra Pravartana). Explore the massive 5th-century Dhamek Stupa and Mulagandhakuti Vihara.",
            location: {
              name: "Dhamek Stupa Sarnath",
              lat: 25.3809,
              lng: 83.0245
            },
            time: "11:30 AM",
            type: "sightseeing",
            cost: 100,
            currency: "INR",
            notes: "MUST ATTEND: Meditate in the tranquil archaeological gardens. Visit Sarnath ASI Museum to see the original Ashoka Lion Capital."
          },
          {
            _key: "vap2e",
            title: "Satvik Feast at Shree Shivay Thali & Keshav Paan",
            description: "Enjoy a grand multi-course pure satvik thali in Varanasi, concluding with an authentic melt-in-mouth Banarasi Maghai Meetha Paan at Keshav Tambool.",
            location: {
              name: "Shree Shivay Grand Thali",
              lat: 25.315,
              lng: 82.992
            },
            time: "02:00 PM",
            type: "food",
            cost: 550,
            currency: "INR",
            notes: "Traditional Banarasi paan folded with gulkand, saunf, and silver vark without tobacco."
          }
        ]
      },
      {
        _key: "vap-day3",
        dayNumber: 3,
        title: "Varanasi → Prayagraj (125 km / 2.5 hrs) → Triveni Sangam Sacred Snan & Bade Hanuman",
        date: "2026-10-22",
        summary: "Drive along the smooth 4-lane NH19 expressway to holy Prayagraj (Allahabad). Savor legendary Netram Desi Ghee Kachoris in Katra. Board an authorized motorboat to the sacred Triveni Sangam for a holy dip (Snan) where the Ganga, Yamuna, and invisible Saraswati converge. Seek blessings at the unique underground reclining Bade Hanuman Ji Mandir and visit the immortal Akshayavat tree.",
        activities: [
          {
            _key: "vap3a",
            title: "Scenic Highway Drive to Prayagraj via NH19 (125 km)",
            description: "Comfortable 2.5-hour AC cab ride across the fertile Gangetic plains via Gopiganj and Handia.",
            location: {
              name: "Varanasi-Prayagraj NH19 Expressway",
              lat: 25.38,
              lng: 82.45
            },
            time: "08:00 AM",
            type: "transport",
            cost: 2800,
            currency: "INR",
            notes: "Clean highway dhabas and fuel plazas available en route."
          },
          {
            _key: "vap3b",
            title: "Legendary Kachori-Jalebi Breakfast at Netram Moolchand & Sons",
            description: "Feast on crisp urad dal kachoris fried in pure cow desi ghee, spicy dum aloo, pumpkin sabzi, and thick malai jalebi in Katra bazaar since 1864.",
            location: {
              name: "Netram Moolchand & Sons Katra",
              lat: 25.459,
              lng: 81.854
            },
            time: "10:45 AM",
            type: "food",
            cost: 200,
            currency: "INR",
            notes: "A cherished Prayag culinary tradition; eat warm straight from the kadai."
          },
          {
            _key: "vap3c",
            title: "Check-in to The Legend Hotel / Hotel Kanha Shyam",
            description: "Check in to your boutique luxury hotel in Prayagraj's tree-lined Civil Lines.",
            location: {
              name: "The Legend Hotel Prayagraj",
              lat: 25.4518,
              lng: 81.834
            },
            time: "11:45 AM",
            type: "accommodation",
            cost: 4200,
            currency: "INR",
            notes: "Contact: +91-532-2409999. Hotel concierge arranges private boat permits for Sangam."
          },
          {
            _key: "vap3d",
            title: "Triveni Sangam Boat Ride & Sacred Snan (Holy Confluence)",
            description: "Board an authorized boat from Qila Ghat / Daraganj to the exact confluence where the greyish Ganga meets the deep greenish-blue Yamuna and mythical Saraswati. Take the auspicious holy dip on wooden platforms.",
            location: {
              name: "Triveni Sangam Prayagraj",
              lat: 25.426,
              lng: 81.8845
            },
            time: "01:30 PM",
            type: "activity",
            cost: 800,
            currency: "INR",
            notes: "MUST ATTEND: The holy dip is believed to cleanse lifetimes of sins. Changing enclosures and lifejackets available on wooden platforms."
          },
          {
            _key: "vap3e",
            title: "Darshan at Reclining Bade Hanuman Ji Mandir (Bandhwa Wale)",
            description: "Visit the revered subterranean temple housing a 20-foot monolithic red vermilion idol of Lord Hanuman in a unique reclining posture, flooded by Mother Ganga during monsoons.",
            location: {
              name: "Bade Hanuman Temple Prayagraj",
              lat: 25.4285,
              lng: 81.8795
            },
            time: "03:45 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "MUST ATTEND: One-of-a-kind temple in India. Devotees offer red sindoor and boondi laddoos."
          },
          {
            _key: "vap3f",
            title: "Allahabad Fort, Patalpuri Temple & Akshayavat Banyan Tree",
            description: "Explore the exterior bastions of the colossal 1583 Akbar Fort and visit Patalpuri underground temple and the immortal Akshayavat tree mentioned in ancient Puranas.",
            location: {
              name: "Akshayavat Tree & Patalpuri Temple",
              lat: 25.429,
              lng: 81.877
            },
            time: "05:00 PM",
            type: "sightseeing",
            cost: 50,
            currency: "INR",
            notes: "Army perimeter pass managed easily at the entrance gate."
          }
        ]
      },
      {
        _key: "vap-day4",
        dayNumber: 4,
        title: "Prayagraj → Ayodhya (165 km / 3.5 hrs) → Shri Ram Janmabhoomi Mandir & Saryu Aarti",
        date: "2026-10-23",
        summary: "Embark on a scenic drive along NH330 north to Ayodhya Dham, the birthplace of Lord Rama. Settle into The Ramayana Hotel. Seek blessings at the fortified Hanuman Garhi before having an unforgettable darshan of Ram Lalla at the grand newly consecrated Shri Ram Janmabhoomi Mandir. Visit Kanak Bhavan and witness the grand evening Saryu Maha Aarti and laser show at Ram Ki Paidi.",
        activities: [
          {
            _key: "vap4a",
            title: "Highway Drive Prayagraj to Ayodhya via NH330 (165 km)",
            description: "Smooth 3.5-hour AC drive through Pratapgarh and Sultanpur across rural Awadh countryside to reach Ayodhya Dham.",
            location: {
              name: "Prayagraj-Ayodhya Highway NH330",
              lat: 26.2,
              lng: 82
            },
            time: "08:00 AM",
            type: "transport",
            cost: 3200,
            currency: "INR",
            notes: "Stop at Sultanpur bypass for fresh tea and Awadhi samosas."
          },
          {
            _key: "vap4b",
            title: "Check-in to The Ramayana Hotel Ayodhya",
            description: "Check in to this premium luxury hotel just 10 minutes from the temple corridor, featuring Ramayana-themed decor and pure satvik dining.",
            location: {
              name: "The Ramayana Hotel Ayodhya",
              lat: 26.782,
              lng: 82.185
            },
            time: "12:00 PM",
            type: "accommodation",
            cost: 6500,
            currency: "INR",
            notes: "Contact: +91-5278-297777. E-rickshaw transport and wheelchair access readily coordinated."
          },
          {
            _key: "vap4c",
            title: "Satvik Lunch at Ramprastha Restaurant / Kanak Rasoi",
            description: "Relish hot Bedmi Poori with Aloo Jhol, Kadhi-Chawal, Paneer Makhani, and sweet Khoya Peda prepared fresh in temple style.",
            location: {
              name: "Ramprastha Dining Naya Ghat",
              lat: 26.797,
              lng: 82.202
            },
            time: "01:15 PM",
            type: "food",
            cost: 400,
            currency: "INR",
            notes: "100% vegetarian, pure ghee satvik meal."
          },
          {
            _key: "vap4d",
            title: "Hanuman Garhi Fortress Darshan (76 Steps)",
            description: "Ascend the 76 stone steps to the 10th-century fortress temple of Lord Hanuman who guards the city. According to tradition, one must take Hanuman Ji's permission before visiting Lord Rama.",
            location: {
              name: "Hanuman Garhi Temple Ayodhya",
              lat: 26.793,
              lng: 82.199
            },
            time: "02:45 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "MUST ATTEND: Offer Besan Laddoos. The circular ramparts give sweeping views across the holy city."
          },
          {
            _key: "vap4e",
            title: "Shri Ram Janmabhoomi Mandir Darshan (Ram Lalla)",
            description: "Pass through the ornamental Gopuram gates to the magnificent Nagara-style temple hand-carved from pink Bansi Paharpur sandstone. Experience the divine darshan of the 51-inch black granite Ram Lalla idol adorned with golden jewels.",
            location: {
              name: "Shri Ram Janmabhoomi Temple",
              lat: 26.7956,
              lng: 82.1944
            },
            time: "04:15 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "MUST ATTEND: Free electronic lockers available for phones and leather belts. Dedicated fast-track pilgrim corridor with ramp facilities."
          },
          {
            _key: "vap4f",
            title: "Visit Kanak Bhavan (Golden Palace of Sita)",
            description: "Explore the breathtaking temple palace gifted by Queen Kaikeyi to Sita upon her marriage to Rama, housing gold-crowned idols of Rama and Sita.",
            location: {
              name: "Kanak Bhavan Ayodhya",
              lat: 26.7985,
              lng: 82.1968
            },
            time: "05:45 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Mesmerizing Bundelkhandi palace architecture with painted courtyards."
          },
          {
            _key: "vap4g",
            title: "Saryu River Evening Sandhya Aarti & Ram Ki Paidi Light Show",
            description: "Gather at Ram Ki Paidi and Naya Ghat as the setting sun turns the Saryu waters gold. Watch the Vedic priests perform the grand Saryu Aarti followed by a high-tech musical laser fountain show narrating the Ramayana.",
            location: {
              name: "Ram Ki Paidi Saryu Ghat",
              lat: 26.801,
              lng: 82.2045
            },
            time: "07:00 PM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "MUST ATTEND: Thousands of glowing oil lamps illuminate the riverfront steps creating an ethereal visual feast."
          }
        ]
      },
      {
        _key: "vap-day5",
        dayNumber: 5,
        title: "Guptar Ghat Sunrise → Surya Kund → Ayodhya Airport (AYJ) → Mumbai / Pune",
        date: "2026-10-24",
        summary: "Start the day with tranquil sunrise prayers at Guptar Ghat on the Saryu River where Lord Rama concluded his earthly avatar. Visit Surya Kund and Nageshwarnath Temple. Savor hot Bedmi Puri and Rabdi Jalebi before boarding your direct afternoon flight from Ayodhya's new Maharishi Valmiki Airport back to Mumbai or Pune.",
        activities: [
          {
            _key: "vap5a",
            title: "Sunrise Prayers & Boat Ride at Guptar Ghat",
            description: "Visit the serene riverside ghat where Lord Rama entered the Saryu River for Jal Samadhi (Maha Prayan) to return to his heavenly abode of Vaikuntha.",
            location: {
              name: "Guptar Ghat Ayodhya Cantt",
              lat: 26.786,
              lng: 82.138
            },
            time: "06:30 AM",
            type: "sightseeing",
            cost: 300,
            currency: "INR",
            notes: "Remarkably tranquil morning ambiance with gentle river breezes, far from crowds."
          },
          {
            _key: "vap5b",
            title: "Visit Historic Surya Kund & Nageshwarnath Mandir",
            description: "Visit the expansive Sun temple reservoir renovated with ancient stone chhatris, and Nageshwarnath Temple established by Rama's son Kush.",
            location: {
              name: "Surya Kund Ayodhya",
              lat: 26.765,
              lng: 82.162
            },
            time: "08:30 AM",
            type: "sightseeing",
            cost: 0,
            currency: "INR",
            notes: "Surya Kund features 52 ghat steps and stunning manicured heritage gardens."
          },
          {
            _key: "vap5c",
            title: "Farewell Breakfast & Souvenir Shopping",
            description: "Relish steaming Rabdi-Jalebi, Samosas, and Kulhad Chai. Pick up Ayodhya Khoya Peda sweets and Ramcharitmanas scripture souvenirs for home.",
            location: {
              name: "Naya Ghat Market Ayodhya",
              lat: 26.799,
              lng: 82.203
            },
            time: "10:00 AM",
            type: "food",
            cost: 350,
            currency: "INR",
            notes: "Authentic souvenirs: brass puja lamps, wooden Ram Mandir models, and sacred Tulsi malas."
          },
          {
            _key: "vap5d",
            title: "Transfer to Ayodhya Maharishi Valmiki Airport (AYJ) & Return Flight",
            description: "Short 15-minute cab ride to the newly inaugurated Ayodhya Airport for direct flight back home to Mumbai (BOM) or Pune (PNQ).",
            location: {
              name: "Maharishi Valmiki International Airport Ayodhya",
              lat: 26.745,
              lng: 82.155
            },
            time: "12:30 PM",
            type: "transport",
            cost: 6200,
            currency: "INR",
            notes: "Direct flights to Mumbai (IndiGo 6E / Air India Express, ~2h 15m). Carry blessed prasad and timeless spiritual memories."
          }
        ]
      }
    ]
  },
];
