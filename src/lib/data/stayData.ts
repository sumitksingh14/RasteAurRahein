import type { HotelSuggestion } from "../types";

export const STAY_DATA: Record<string, HotelSuggestion[]> = {
  "leh-ladakh-9-days": [
    {
      id: "ll1", name: "The Grand Dragon Ladakh", type: "hotel", stars: 5,
      avgPricePerNight: 12000, town: "Leh City", contact: "+91-1982-257786",
      bookingUrl: "https://www.thegranddragonladakh.com/",
      amenities: ["Mountain View", "Restaurant", "Wi-Fi", "Parking", "Oxygen Bar"],
      notes: "Best luxury hotel in Leh with rooftop panoramic views of the Stok Kangri range. Altitude-friendly rooms with oxygen support. 5 min from Leh Market.",
    },
    {
      id: "ll2", name: "Stok Palace Heritage Hotel", type: "hotel", stars: 4,
      avgPricePerNight: 8500, town: "Stok Village, Leh", contact: "+91-1982-242336",
      bookingUrl: "https://www.stokpalace.in/",
      amenities: ["Heritage Property", "Restaurant", "Garden", "Mountain View", "Hot Water"],
      notes: "11th-century royal palace of the Namgyal dynasty converted to a heritage hotel. Authentic royal Ladakhi décor; ask for rooms overlooking the Stok Kangri peak.",
    },
    {
      id: "ll3", name: "Nimmu House", type: "homestay", stars: 4,
      avgPricePerNight: 4500, town: "Nimmu Village, Leh", contact: "+91-94191-17666",
      bookingUrl: "https://www.nimmuhouse.com/",
      amenities: ["Traditional Ladakhi Rooms", "Meals Included", "River View", "Hot Water"],
      notes: "Award-winning traditional Ladakhi house on the Indus river. Beautifully restored with Himalayan art and hand-woven textiles. Ideal base for monasteries.",
    },
    {
      id: "ll4", name: "Mystic Meadows Camp, Hunder", type: "camp", stars: 4,
      avgPricePerNight: 5500, town: "Hunder, Nubra Valley", contact: "+91-94191-67845",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Hunder+Nubra+Valley",
      amenities: ["Swiss Tents", "Meals Included", "Bonfire", "Camel Dunes View", "Stargazing"],
      notes: "Set amongst the famous Hunder sand dunes. Premium Swiss tents with attached bathrooms; wake up to Bactrian camels outside. Book 3–4 weeks ahead in July–Aug.",
    },
    {
      id: "ll5", name: "Himalayan Ecotourism Camp, Hunder", type: "camp", stars: 3,
      avgPricePerNight: 3500, town: "Hunder, Nubra Valley", contact: "+91-98169-40011",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Hunder+Nubra+Valley",
      amenities: ["Tents", "Meals Included", "Bonfire", "Sand Dunes Nearby"],
      notes: "Budget-friendly camp near the dunes. Basic but clean shared facilities. Great value for overnight in Nubra.",
    },
    {
      id: "ll6", name: "The Pangong Retreat (Norbu Camps)", type: "camp", stars: 4,
      avgPricePerNight: 6500, town: "Spangmik, Pangong Tso", contact: "+91-94191-23454",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Pangong+Tso",
      amenities: ["Lake View Tents", "Meals Included", "Sunrise Views", "Photography Spot"],
      notes: "Lakeside Swiss tents facing Pangong Tso's blue waters directly. The sunrise from your tent is unmissable. Book 4–6 weeks in advance for June–August.",
    },
    {
      id: "ll7", name: "Lake View Camp, Spangmik", type: "camp", stars: 3,
      avgPricePerNight: 4000, town: "Spangmik, Pangong Tso", contact: "+91-96228-07888",
      bookingUrl: "https://www.airbnb.co.in/s/Pangong-Tso/homes",
      amenities: ["Lake View", "Meals Included", "Sleeping Bags", "Generator Power"],
      notes: "Budget lakeside camp with great views. Shared Western-style restrooms. Popular with backpackers for the classic Pangong overnight experience.",
    },
    {
      id: "ll8", name: "Korzok Village Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1500, town: "Korzok Village, Tso Moriri", contact: "+91-94192-01237",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Korzok+Tso+Moriri",
      amenities: ["Traditional Stone House", "Home-Cooked Meals", "Yak Wool Blankets"],
      notes: "Authentic Ladakhi stone homestay in the highest permanently inhabited village at 4,595 m. Warming family kitchen; the warmest and most memorable overnight of the entire trip.",
    },
  ],
  "jyotirlinga-pilgrimage-road-trip": [
    {
      id: "jy1", name: "Bhimashankar Eco Resort", type: "resort", stars: 3,
      avgPricePerNight: 2800, town: "Bhimashankar, Pune District", contact: "+91-94222-00101",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Bhimashankar",
      amenities: ["Meals Included", "Forest View", "Hot Water"],
      notes: "Only comfortable stay near the temple; book at least a week ahead in pilgrimage season.",
    },
    {
      id: "jy2", name: "Trimbakeshwar Heritage Resort", type: "resort", stars: 3,
      avgPricePerNight: 3200, town: "Trimbakeshwar, Nashik", contact: "+91-94234-00102",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Trimbakeshwar",
      amenities: ["Garden View", "Restaurant", "Wi-Fi", "Hot Water"],
      notes: "Heritage-styled property close to the Jyotirlinga. Walk to the temple ghats.",
    },
    {
      id: "jy3", name: "Lemon Tree Hotel, Aurangabad", type: "hotel", stars: 4,
      avgPricePerNight: 4500, town: "Aurangabad (Chhatrapati Sambhajinagar)",
      bookingUrl: "https://www.lemontreehotels.com/lemon-tree-hotel/aurangabad/hotel-aurangabad.aspx",
      amenities: ["Pool", "Restaurant", "Wi-Fi", "Parking"],
      notes: "Best positioned hotel for Ellora & Grishneshwar visits; 10 km to caves.",
    },
    {
      id: "jy4", name: "Ujjain Ramada by Wyndham", type: "hotel", stars: 4,
      avgPricePerNight: 5500, town: "Ujjain, Madhya Pradesh",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Ujjain",
      amenities: ["Shipra River View", "Restaurant", "Wi-Fi", "Parking"],
      notes: "Close to Mahakaleshwar temple; ideal for attending the Bhasma Aarti at 4 AM.",
    },
    {
      id: "jy5", name: "Narmada View Resort, Omkareshwar", type: "resort", stars: 3,
      avgPricePerNight: 2500, town: "Omkareshwar, Madhya Pradesh", contact: "+91-94250-00105",
      bookingUrl: "https://www.airbnb.co.in/s/Omkareshwar/homes",
      amenities: ["Narmada View", "Meals Included", "Boat Jetty Access"],
      notes: "Wake up to Narmada Aarti chants; a deeply spiritual stay.",
    },
  ],
  "spiti-valley": [
    {
      id: "s1", name: "Getaway Stays Manali", type: "hotel", stars: 3,
      avgPricePerNight: 2500, town: "Manali", contact: "+91-98050-00001",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Manali",
      amenities: ["Wi-Fi", "Hot Water", "Parking"],
      notes: "Good base for acclimatisation before crossing Rohtang.",
    },
    {
      id: "s2", name: "Parasol Camps Chandratal", type: "camp", stars: 4,
      avgPricePerNight: 4500, town: "Chandratal Lake", contact: "+91-94180-00002",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Chandratal",
      amenities: ["Meals Included", "Sleeping Bags", "Bonfire"],
      notes: "Book months in advance — only option near the lake at 4,300 m.",
    },
    {
      id: "s3", name: "Sakya Abode, Kaza", type: "homestay", stars: 4,
      avgPricePerNight: 1800, town: "Kaza", contact: "+91-94592-00003",
      bookingUrl: "https://www.airbnb.co.in/s/Kaza--Himachal-Pradesh/homes",
      amenities: ["Meals", "Hot Water", "Local Guide"],
      notes: "Family-run Spitian homestay; incredible food and local insights.",
    },
    {
      id: "s4", name: "Norling House, Kaza", type: "guesthouse", stars: 3,
      avgPricePerNight: 1200, town: "Kaza", contact: "+91-98166-00004",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Kaza+Himachal",
      amenities: ["Wi-Fi", "Meals Optional"],
    },
    {
      id: "s5", name: "Rakcham Camps", type: "camp", stars: 3,
      avgPricePerNight: 2800, town: "Rakcham / Sangla", contact: "+91-94185-00005",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Sangla",
      amenities: ["Meals Included", "River View", "Bonfire"],
      notes: "Gorgeous Baspa Valley riverside camp.",
    },
  ],
  "mysore-coorg-wayanad-ooty": [
    {
      id: "mc1", name: "Coorg Misty Woods Resort", type: "resort", stars: 4,
      avgPricePerNight: 6000, town: "Madikeri, Coorg", contact: "+91-82961-00010",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Madikeri+Coorg",
      amenities: ["Pool", "Restaurant", "Spa", "Wi-Fi"],
      notes: "Stunning misty jungle views; great coffee estate experience.",
    },
    {
      id: "mc2", name: "Zostel Mysore", type: "guesthouse", stars: 3,
      avgPricePerNight: 700, town: "Mysore",
      bookingUrl: "https://www.zostel.com/zostel/mysore/",
      amenities: ["Wi-Fi", "Common Kitchen", "Lockers"],
      notes: "Budget-friendly; perfect base for palace visit.",
    },
    {
      id: "mc3", name: "Wayanad Coffee Trail Homestay", type: "homestay", stars: 4,
      avgPricePerNight: 3500, town: "Wayanad", contact: "+91-94972-00011",
      bookingUrl: "https://www.airbnb.co.in/s/Wayanad--Kerala/homes",
      amenities: ["Meals Included", "Farm Stay", "Nature Walks"],
    },
  ],
  "rajasthan-desert-kingdom": [
    {
      id: "rd1", name: "Suryagarh Palace, Jaisalmer", type: "hotel", stars: 5,
      avgPricePerNight: 12000, town: "Jaisalmer",
      bookingUrl: "https://www.suryagarh.com",
      amenities: ["Pool", "Spa", "Desert Safari", "Restaurant"],
      notes: "Luxury heritage hotel in sandstone — splurge on at least one night.",
    },
    {
      id: "rd2", name: "Sam Sand Dunes Camp", type: "camp", stars: 4,
      avgPricePerNight: 5500, town: "Sam, Jaisalmer", contact: "+91-94141-00020",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Sam+Sand+Dunes",
      amenities: ["Camel Safari", "Cultural Evening", "Meals Included"],
    },
    {
      id: "rd3", name: "Jagat Niwas Palace, Udaipur", type: "hotel", stars: 4,
      avgPricePerNight: 5000, town: "Udaipur",
      bookingUrl: "https://www.jagatniwaspalace.com",
      amenities: ["Lake View", "Restaurant", "Wi-Fi"],
    },
  ],
  "goa-beyond-beaches": [
    {
      id: "ga1", name: "The Leela Goa", type: "resort", stars: 5,
      avgPricePerNight: 15000, town: "Cavelossim, South Goa",
      bookingUrl: "https://www.theleela.com/en_us/hotels-in-goa/the-leela-goa/",
      amenities: ["Private Beach", "Pool", "Spa", "Restaurant", "Wi-Fi"],
      notes: "Award-winning luxury resort on a pristine beach.",
    },
    {
      id: "ga2", name: "Zostel Goa (Palolem)", type: "guesthouse", stars: 3,
      avgPricePerNight: 900, town: "Palolem, South Goa",
      bookingUrl: "https://www.zostel.com/zostel/goa/",
      amenities: ["Wi-Fi", "Beach Walk", "Social Events"],
      notes: "Perfect for solo travellers; steps from Palolem Beach.",
    },
    {
      id: "ga3", name: "Airbnb Beachfront Villas", type: "resort", stars: 4,
      avgPricePerNight: 5000, town: "Anjuna / Vagator",
      bookingUrl: "https://www.airbnb.co.in/s/Goa/homes",
      amenities: ["Pool", "Private Garden", "Sea View"],
      notes: "Book early for peak season (Nov–Feb).",
    },
  ],
  "sikkim-7-days": [
    {
      id: "sk1", name: "Elgin Mount Pandim, Pelling", type: "hotel", stars: 4,
      avgPricePerNight: 7000, town: "Pelling",
      bookingUrl: "https://www.elginhotels.com",
      amenities: ["Kanchenjunga View", "Restaurant", "Wi-Fi"],
      notes: "Colonial heritage hotel with stunning mountain panorama.",
    },
    {
      id: "sk2", name: "Sikkim Homestay Network", type: "homestay", stars: 4,
      avgPricePerNight: 2000, town: "Gangtok",
      bookingUrl: "https://www.airbnb.co.in/s/Gangtok--Sikkim/homes",
      amenities: ["Meals Included", "Local Guide", "Cultural Experience"],
    },
  ],
  "meghalaya-5-days": [
    {
      id: "mg1", name: "Polo Orchid Resort", type: "resort", stars: 4,
      avgPricePerNight: 5500, town: "Shillong",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Shillong",
      amenities: ["Restaurant", "Wi-Fi", "Garden"],
    },
    {
      id: "mg2", name: "Dawki River View Camp", type: "camp", stars: 3,
      avgPricePerNight: 3000, town: "Dawki",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Dawki",
      notes: "Wake up to the crystal-clear Umngot River.",
      amenities: ["River View", "Meals Included"],
    },
  ],
  "kerala-7-days": [
    {
      id: "kl1", name: "Houseboat — Alleppey", type: "resort", stars: 4,
      avgPricePerNight: 9000, town: "Alleppey (Alappuzha)",
      bookingUrl: "https://www.keralahouseboat.org",
      amenities: ["Backwater Cruise", "Meals Included", "AC Bedrooms"],
      notes: "Non-negotiable experience; book premium houseboat for best quality.",
    },
    {
      id: "kl2", name: "Spice Garden Homestay, Munnar", type: "homestay", stars: 4,
      avgPricePerNight: 3200, town: "Munnar",
      bookingUrl: "https://www.airbnb.co.in/s/Munnar--Kerala/homes",
      amenities: ["Tea Estate Walk", "Meals Included", "Mountain View"],
    },
  ],
  "munsiyari-6-days": [
    {
      id: "mn1", name: "Himalayan Eco Lodge", type: "guesthouse", stars: 3,
      avgPricePerNight: 1500, town: "Munsiyari", contact: "+91-94109-00030",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Munsiyari",
      amenities: ["Panchachuli View", "Hot Water", "Meals"],
    },
    {
      id: "mn2", name: "Khaliya Top Trek Camp", type: "camp", stars: 3,
      avgPricePerNight: 2500, town: "Khaliya Top",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Munsiyari",
      amenities: ["Meals Included", "Sleeping Bags", "Trek Guide"],
    },
    {
      id: "mn3", name: "Milam Inn Munsiyari", type: "hotel", stars: 3,
      avgPricePerNight: 2800, town: "Munsiyari", contact: "+91-94120-18456",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Munsiyari",
      amenities: ["Direct Panchachuli View", "Heated Blankets", "In-house Kumaoni Restaurant", "Balcony Rooms"],
    },
  ],
  "char-dham-yatra-uttarakhand": [
    {
      id: "cd1", name: "GMVN Guest House, Kedarnath", type: "guesthouse", stars: 2,
      avgPricePerNight: 1200, town: "Kedarnath",
      bookingUrl: "https://www.gmvnl.in",
      notes: "Book months ahead; government-run and reliable.",
      amenities: ["Meals", "Hot Water"],
    },
    {
      id: "cd2", name: "Hotel Mandakini View, Rudraprayag", type: "hotel", stars: 3,
      avgPricePerNight: 2000, town: "Rudraprayag",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Rudraprayag",
      amenities: ["River View", "Wi-Fi", "Restaurant"],
    },
  ],
  "panch-kedar-trek-10-days": [
    {
      id: "pk1", name: "Forest Rest House, Tungnath", type: "guesthouse", stars: 2,
      avgPricePerNight: 600, town: "Chopta", contact: "+91-94120-00040",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Chopta+Uttarakhand",
      notes: "Permit required; book through forest dept.",
      amenities: ["Basic Meals", "Blankets"],
    },
    {
      id: "pk2", name: "Chopta Camp", type: "camp", stars: 3,
      avgPricePerNight: 2000, town: "Chopta",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Chopta",
      amenities: ["Meals Included", "Bonfire"],
    },
  ],
  "pune-konkan-coast-raigad": [
    {
      id: "pu1", name: "MTDC Beach Resort, Diveagar", type: "resort", stars: 3,
      avgPricePerNight: 3500, town: "Diveagar",
      bookingUrl: "https://www.maharashtratourism.gov.in",
      amenities: ["Beach Access", "AC Rooms", "Restaurant"],
    },
    {
      id: "pu2", name: "Coastal Homestay, Murud", type: "homestay", stars: 4,
      avgPricePerNight: 2200, town: "Murud",
      bookingUrl: "https://www.airbnb.co.in/s/Murud--Maharashtra/homes",
      amenities: ["Sea View", "Konkan Meals", "Rooftop"],
    },
  ],

  // ── Batch 1 & 2 Destinations ──────────────────────────────────────────────
  "haridwar-rishikesh-3-days": [
    {
      id: "hr1", name: "Aloha On The Ganges", type: "resort", stars: 4,
      avgPricePerNight: 8500, town: "Tapovan, Rishikesh", contact: "+91-135-2426000",
      bookingUrl: "https://www.alohaontheganges.com/",
      amenities: ["River View", "Pool", "Spa", "Restaurant", "Wi-Fi"],
      notes: "Luxury riverside resort overlooking the Ganga, close to Laxman Jhula. Features infinity pool and yoga sessions.",
    },
    {
      id: "hr2", name: "Ganga Lahari by Leisure Hotels", type: "hotel", stars: 4,
      avgPricePerNight: 6500, town: "Gau Ghat, Haridwar", contact: "+91-1334-227546",
      bookingUrl: "https://www.leisurehotels.co.in/ganga-lahari-haridwar/",
      amenities: ["Ghat Access", "Pure Veg Restaurant", "Wi-Fi", "Hot Water"],
      notes: "Right on the banks of Ganga near Har Ki Pauri. Private ghat access for evening aarti darshan.",
    },
    {
      id: "hr3", name: "Zostel Rishikesh (Tapovan)", type: "guesthouse", stars: 3,
      avgPricePerNight: 1200, town: "Tapovan, Rishikesh", contact: "+91-11-40845115",
      bookingUrl: "https://www.zostel.com/zostel/rishikesh/",
      amenities: ["Wi-Fi", "Cafe", "Rooftop Common Area", "Lockers"],
      notes: "Vibrant backpacker hub with terrace cafe, yoga spaces, and daily community walks.",
    },
  ],

  "nainital-jim-corbett-3-days": [
    {
      id: "nc1", name: "The Naini Retreat by Leisure Hotels", type: "hotel", stars: 4,
      avgPricePerNight: 7500, town: "Ayarpatta Slopes, Nainital", contact: "+91-5942-235105",
      bookingUrl: "https://www.leisurehotels.co.in/the-naini-retreat-nainital/",
      amenities: ["Lake View", "Heritage Property", "Restaurant", "Wi-Fi", "Bonfire"],
      notes: "Tudor-style former royal residence of the Maharaja of Pilibhit, overlooking Naini Lake amidst pine woods.",
    },
    {
      id: "nc2", name: "Jim's Jungle Retreat", type: "resort", stars: 4,
      avgPricePerNight: 9500, town: "Dhela Zone, Jim Corbett", contact: "+91-11-43516376",
      bookingUrl: "https://www.jimsjungleretreat.com/",
      amenities: ["Safari Desk", "Pool", "Eco-Lodge", "Naturalist Walks", "Meals Included"],
      notes: "Eco-luxury wildlife resort bordering the southern boundary of Corbett National Park with expert naturalists.",
    },
    {
      id: "nc3", name: "Corbett Riverside Resort", type: "resort", stars: 4,
      avgPricePerNight: 5500, town: "Garjia, Ramnagar", contact: "+91-5947-287860",
      bookingUrl: "https://www.corbettriverside.com/",
      amenities: ["Kosi Riverfront", "Pool", "Restaurant", "Wi-Fi", "Parking"],
      notes: "Sprawling riverfront property on the banks of Kosi with private pebble beach and open lawns.",
    },
  ],

  "himachal-shimla-manali-dharamshala-dalhousie-5-days": [
    {
      id: "hp1", name: "The Oberoi Cecil", type: "hotel", stars: 5,
      avgPricePerNight: 16000, town: "Chaura Maidan, Shimla", contact: "+91-177-2804848",
      bookingUrl: "https://www.oberoihotels.com/hotels-in-shimla-cecil/",
      amenities: ["Heritage Property", "Indoor Heated Pool", "Spa", "Fine Dining", "Valley View"],
      notes: "Historic 130-year-old colonial grand hotel with classic chandeliers and cedar-scented lounges.",
    },
    {
      id: "hp2", name: "Solang Valley Resort", type: "resort", stars: 4,
      avgPricePerNight: 6500, town: "Solang, Manali", contact: "+91-1902-256038",
      bookingUrl: "https://www.solangvalleyresorts.com/",
      amenities: ["Riverside", "Snow Peak Views", "Restaurant", "Bonfire", "Wi-Fi"],
      notes: "Set on the banks of Beas River facing snow-clad glaciers, right at the start of Solang adventure activities.",
    },
    {
      id: "hp3", name: "Fortune Park Moksha", type: "hotel", stars: 4,
      avgPricePerNight: 5800, town: "McLeod Ganj, Dharamshala", contact: "+91-1892-242424",
      bookingUrl: "https://www.fortunehotels.in/",
      amenities: ["Dhauladhar Views", "Pool", "Spa", "Wi-Fi", "Restaurant"],
      notes: "Strawberry Hills sanctuary location with 360-degree views of pine forests and the snow-capped Dhauladhars.",
    },
    {
      id: "hp4", name: "Grand View Hotel", type: "hotel", stars: 4,
      avgPricePerNight: 4200, town: "Near Dalhousie Club, Dalhousie", contact: "+91-1899-240760",
      bookingUrl: "https://www.grandviewdalhousie.com/",
      amenities: ["Colonial Heritage", "Terrace Garden", "Restaurant", "Wi-Fi"],
      notes: "British-era hill property with unobstructed panoramas of the Pir Panjal ranges.",
    },
  ],

  "jammu-kashmir-5-days": [
    {
      id: "jk1", name: "The Lalit Grand Palace Srinagar", type: "hotel", stars: 5,
      avgPricePerNight: 18000, town: "Gupkar Road, Srinagar", contact: "+91-194-2501001",
      bookingUrl: "https://www.thelalit.com/the-lalit-srinagar/",
      amenities: ["Dal Lake View", "Heritage Palace", "Chinar Lawns", "Spa", "Indoor Pool"],
      notes: "Former palace of the Maharaja of Jammu & Kashmir ringed by the Zabarwan mountains overlooking Dal Lake.",
    },
    {
      id: "jk2", name: "Khyber Himalayan Resort & Spa", type: "resort", stars: 5,
      avgPricePerNight: 24000, town: "Gulmarg", contact: "+91-1954-350666",
      bookingUrl: "https://www.khyberhotels.com/",
      amenities: ["Ski Resort", "Gondola Nearby", "Heated Pool", "Luxury Spa", "Snow Views"],
      notes: "World-class ski resort at 8,825 ft; step out directly to pine woods and the Gulmarg Gondola.",
    },
    {
      id: "jk3", name: "Kolahoi Green Resort", type: "resort", stars: 4,
      avgPricePerNight: 6500, town: "KP Road, Pahalgam", contact: "+91-1936-243222",
      bookingUrl: "https://www.kolahoigreen.com/",
      amenities: ["Lidder River Proximity", "Pine Garden", "Restaurant", "Wi-Fi", "Heated Rooms"],
      notes: "Nestled in pine woods near the Lidder River, ideal base for Betaab Valley and Aru explorations.",
    },
    {
      id: "jk4", name: "Sukoon Luxury Houseboat", type: "resort", stars: 4,
      avgPricePerNight: 11000, town: "Dal Lake (Ghat 21), Srinagar", contact: "+91-194-2422002",
      bookingUrl: "https://www.sukoonhouseboat.com/",
      amenities: ["Hand-Carved Cedar", "Rooftop Deck", "Shikara Transfers", "Traditional Wazwan"],
      notes: "Eco-friendly luxury pinewood houseboat on the tranquil open waters of Dal Lake.",
    },
  ],

  "agra-mathura-3-days": [
    {
      id: "am1", name: "The Oberoi Amarvilas", type: "hotel", stars: 5,
      avgPricePerNight: 28000, town: "Taj East Gate Road, Agra", contact: "+91-562-2231515",
      bookingUrl: "https://www.oberoihotels.com/hotels-in-agra-amarvilas/",
      amenities: ["Taj Mahal Views", "Mughal Architecture", "Pool", "Spa", "Fine Dining"],
      notes: "Every single room and terrace has an uninterrupted direct view of the Taj Mahal, just 600m away.",
    },
    {
      id: "am2", name: "ITC Mughal, A Luxury Collection Resort", type: "hotel", stars: 5,
      avgPricePerNight: 9500, town: "Fatehabad Road, Agra", contact: "+91-562-4021700",
      bookingUrl: "https://www.itchotels.com/in/en/itcmughal-agra",
      amenities: ["Mughal Gardens", "Kaya Kalp Spa", "Pool", "Wi-Fi", "Restaurants"],
      notes: "Sprawling 35-acre landscaped resort celebrating Mughal heritage and architecture.",
    },
    {
      id: "am3", name: "Nidhivan Sarovar Portico", type: "hotel", stars: 4,
      avgPricePerNight: 3800, town: "Vrindavan, Mathura", contact: "+91-565-3037000",
      bookingUrl: "https://www.sarovarhotels.com/nidhivan-sarovar-portico-vrindavan/",
      amenities: ["Pure Vegetarian", "Temple Shuttle", "Wi-Fi", "Hot Water", "Parking"],
      notes: "Contemporary pure vegetarian hotel near ISKCON and Banke Bihari temple in Vrindavan.",
    },
  ],

  "auli-nearby-3-days": [
    {
      id: "au1", name: "Cliff Top Club Auli", type: "resort", stars: 4,
      avgPricePerNight: 8500, town: "Auli Ski Slopes", contact: "+91-1389-223217",
      bookingUrl: "https://www.clifftopclubauli.com/",
      amenities: ["Ski-in/Ski-out", "Nanda Devi View", "Restaurant", "Bonfire", "Heating"],
      notes: "High-altitude resort at 10,000 ft directly on the ski slopes, offering 270-degree snow peak vistas.",
    },
    {
      id: "au2", name: "The Royal Village Auli", type: "resort", stars: 3,
      avgPricePerNight: 5500, town: "Auli Road, Joshimath", contact: "+91-94120-00109",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Auli",
      amenities: ["Log Chalets", "Mountain View", "Meals Included", "Bonfire"],
      notes: "Swiss log chalets with front-row views of Nanda Devi and Hathi Ghodi Parvat.",
    },
    {
      id: "au3", name: "GMVN Ski Resort Auli", type: "guesthouse", stars: 3,
      avgPricePerNight: 2800, town: "Auli Ski Base", contact: "+91-1389-223208",
      bookingUrl: "https://www.gmvnl.in/",
      amenities: ["Chairlift Access", "Basic Meals", "Hot Water", "Ski Equipment Rental"],
      notes: "Government tourism lodge conveniently located right next to the chairlift and ski school.",
    },
  ],

  "velas-turtle-festival-konkan": [
    {
      id: "vt1", name: "Mohan Upadhye Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1200, town: "Velas Village, Mandangad", contact: "+91-94238-31718",
      bookingUrl: "https://www.airbnb.co.in/s/Velas--Maharashtra/homes",
      amenities: ["Home Cooked Meals", "Konkani Courtyard", "Turtle Walk Guides", "Hot Water"],
      notes: "Pioneering homestay family of the Sahyadri Nisarga Mitra turtle conservation program.",
    },
    {
      id: "vt2", name: "Omkar Homestay Velas", type: "homestay", stars: 3,
      avgPricePerNight: 1100, town: "Beach Road, Velas", contact: "+91-94035-71954",
      bookingUrl: "https://www.airbnb.co.in/s/Velas--Maharashtra/homes",
      amenities: ["Traditional Konkani Food", "Village Ambiance", "Walking Distance to Beach"],
      notes: "Quiet red-soil courtyard home 10 minutes walk from the Olive Ridley hatching sanctuary.",
    },
    {
      id: "vt3", name: "Shri Ganesh Kripa Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1000, town: "Velas Village", contact: "+91-94211-45678",
      bookingUrl: "https://www.airbnb.co.in/s/Velas--Maharashtra/homes",
      amenities: ["Ukadiche Modak", "Solkadhi", "Clean Rooms"],
      notes: "Authentic village home where hot meals and bedding are provided with genuine Konkan warmth.",
    },
  ],

  "tarkarli-sindhudurg-beach": [
    {
      id: "tk1", name: "MTDC Resort Tarkarli", type: "resort", stars: 3,
      avgPricePerNight: 3600, town: "Tarkarli Beach, Malvan", contact: "+91-2365-252390",
      bookingUrl: "https://www.maharashtratourism.gov.in/",
      amenities: ["Beachfront", "AC Houseboats", "Restaurant", "Water Sports Desk", "Wi-Fi"],
      notes: "Government beachfront resort with cottages nestled in coconut palms right on the white sands.",
    },
    {
      id: "tk2", name: "Blue Sea Resort", type: "resort", stars: 3,
      avgPricePerNight: 2800, town: "Devbagh Road, Tarkarli", contact: "+91-94224-34567",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Tarkarli",
      amenities: ["Scuba Diving Desk", "Sea View", "Malvani Food", "Hot Water"],
      notes: "Close to Karli backwaters and scuba diving launch points. Very hospitable local staff.",
    },
    {
      id: "tk3", name: "Siddhivinayak Beach Resort", type: "homestay", stars: 3,
      avgPricePerNight: 2200, town: "Devbagh Sangam, Malvan", contact: "+91-94041-89765",
      bookingUrl: "https://www.airbnb.co.in/s/Tarkarli/homes",
      amenities: ["Backwater Confluence", "Homemade Seafood", "Boat Rides"],
      notes: "Located at the quiet Devbagh Sangam where the Karli river empties into the Arabian Sea.",
    },
  ],

  "panhala-kolhapur-hill-fort": [
    {
      id: "pn1", name: "MTDC Resort Panhala", type: "resort", stars: 3,
      avgPricePerNight: 2600, town: "Panhala Fort Plateau", contact: "+91-2328-235048",
      bookingUrl: "https://www.maharashtratourism.gov.in/",
      amenities: ["Valley View", "Historic Fort Location", "Restaurant", "Garden"],
      notes: "Situated right inside the historic hill fort complex with sweeping Sahyadri valley views.",
    },
    {
      id: "pn2", name: "Valley View Grand", type: "hotel", stars: 3,
      avgPricePerNight: 2900, town: "Tabak Baug, Panhala", contact: "+91-2328-235372",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Panhala",
      amenities: ["Mountain View", "Restaurant", "Wi-Fi", "Parking"],
      notes: "Serene hill station property surrounded by red soil gardens and cool mountain breezes.",
    },
    {
      id: "pn3", name: "Sayaji Hotel Kolhapur", type: "hotel", stars: 5,
      avgPricePerNight: 4800, town: "Old Pune-Bangalore Rd, Kolhapur", contact: "+91-231-2555999",
      bookingUrl: "https://sayajihotels.com/sayaji-kolhapur",
      amenities: ["Luxury Rooms", "Pool", "Multiple Restaurants", "Spa"],
      notes: "Premier 5-star hotel in Kolhapur, 20 km from Panhala Fort. Ideal for royal palace & temple tour.",
    },
  ],

  "amboli-sahyadri-waterfalls": [
    {
      id: "ab1", name: "Whistling Woods Amboli", type: "resort", stars: 3,
      avgPricePerNight: 2800, town: "Amboli Main Road, Sindhudurg", contact: "+91-94220-55444",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Amboli",
      amenities: ["Rainforest View", "Naturalist Guides", "Restaurant", "Herpetology Walks"],
      notes: "Top choice for wildlife photographers and nature lovers visiting Amboli's mist-covered rainforests.",
    },
    {
      id: "ab2", name: "MTDC Green Valley Resort", type: "resort", stars: 3,
      avgPricePerNight: 2400, town: "Amboli Ghats", contact: "+91-2363-276239",
      bookingUrl: "https://www.maharashtratourism.gov.in/",
      amenities: ["Stone Cottages", "Garden", "Malvani Kitchen", "Hot Water"],
      notes: "Spacious government resort near Amboli waterfall and Sunset Point, enveloped in monsoon clouds.",
    },
  ],

  "toranmal-satpura-hill-station": [
    {
      id: "tm1", name: "Toranmal Hill Resort (Forest Lodge)", type: "resort", stars: 3,
      avgPricePerNight: 1800, town: "Yashwant Lake, Toranmal", contact: "+91-2567-224410",
      bookingUrl: "https://www.maharashtratourism.gov.in/",
      amenities: ["Lake View", "Teak Forest", "Home-style Food", "Parking"],
      notes: "Quiet retreat overlooking Yashwant Lake in the Satpura Ranges of Nandurbar district.",
    },
    {
      id: "tm2", name: "Forest Rest House Toranmal", type: "guesthouse", stars: 2,
      avgPricePerNight: 1200, town: "Toranmal Plateau", contact: "+91-2567-224400",
      bookingUrl: "https://www.google.com/travel/hotels/s/Toranmal",
      amenities: ["Forest Dept Property", "Basic Meals", "Fireplace"],
      notes: "British-era stone rest house with views over Sita Khai gorge and deep teak valleys.",
    },
  ],

  "chorla-ghat-western-ghats": [
    {
      id: "cg1", name: "Wildernest Nature Resort", type: "resort", stars: 4,
      avgPricePerNight: 7500, town: "Swapnagandha Valley, Chorla Ghat", contact: "+91-831-2407300",
      bookingUrl: "https://www.wildernestgoa.com/",
      amenities: ["Infinity Pool", "Vazra Falls View", "Machan Cottages", "Meals Included", "Guided Treks"],
      notes: "Acclaimed eco-resort perched at 800m on the Goa-Karnataka border overlooking the Swapnagandha valley.",
    },
    {
      id: "cg2", name: "Swapnagandha Resort", type: "resort", stars: 4,
      avgPricePerNight: 6500, town: "Chorla Ghats", contact: "+91-832-2438888",
      bookingUrl: "https://www.swapnagandha.com/",
      amenities: ["Valley View", "Eco-architecture", "Forest Walks", "Birdwatching"],
      notes: "Sister property to Wildernest with cliffside eco-cottages facing cascading seasonal waterfalls.",
    },
  ],

  "cotigao-wildlife-sanctuary-goa": [
    {
      id: "co1", name: "Cotigao Forest Rest House", type: "guesthouse", stars: 2,
      avgPricePerNight: 1200, town: "Cotigao Sanctuary Gate, South Goa", contact: "+91-832-2229701",
      bookingUrl: "https://www.forest.goa.gov.in/",
      amenities: ["Forest Canopy", "Basic Amenities", "Wildlife Trails"],
      notes: "Government forest department rest house inside the core sanctuary. Must book via Forest Department.",
    },
    {
      id: "co2", name: "The Tubki Resort", type: "resort", stars: 3,
      avgPricePerNight: 2800, town: "Chaudi, Canacona", contact: "+91-832-2643500",
      bookingUrl: "https://www.thetubkiresort.com/",
      amenities: ["Swimming Pool", "Restaurant", "Wi-Fi", "Proximity to Sanctuary"],
      notes: "Comfortable base hotel in Canacona town, just 15 minutes drive from Cotigao Wildlife Sanctuary.",
    },
  ],

  "gorakhgad-fort-trek-mumbai": [
    {
      id: "gg1", name: "Dehane Village Homestay", type: "homestay", stars: 2,
      avgPricePerNight: 800, town: "Dehane Village, Murbad", contact: "+91-98200-11223",
      bookingUrl: "https://www.google.com/search?q=Dehane+Village+Gorakhgad+homestay",
      amenities: ["Traditional Konkani Meals", "Base of Pinnacle", "Guide Service"],
      notes: "Rustic village home at the direct trek base. Local hosts provide hot Pithla Bhakri and parking.",
    },
    {
      id: "gg2", name: "Malshej Ghat MTDC Resort", type: "resort", stars: 3,
      avgPricePerNight: 3200, town: "Malshej Ghat Plateau", contact: "+91-2132-242010",
      bookingUrl: "https://www.maharashtratourism.gov.in/",
      amenities: ["Cliffside Views", "Waterfalls", "Restaurant", "Wi-Fi"],
      notes: "Conveniently located 35 minutes up the ghat from Gorakhgad base, with cliff views and monsoon waterfalls.",
    },
  ],

  "orchha-bundelkhand-heritage": [
    {
      id: "or1", name: "Sheesh Mahal Heritage Hotel", type: "hotel", stars: 4,
      avgPricePerNight: 5500, town: "Orchha Fort Complex", contact: "+91-7680-252624",
      bookingUrl: "https://www.mptourism.com/",
      amenities: ["Royal Fort Courtyard", "Heritage Suites", "Restaurant", "Historic Ambiance"],
      notes: "A real palace converted to hotel inside Raja Mahal courtyard with royal Bundelkhand heritage.",
    },
    {
      id: "or2", name: "Bundelkhand Riverside Resort", type: "resort", stars: 4,
      avgPricePerNight: 4800, town: "Kanchana Ghat, Betwa River, Orchha", contact: "+91-7680-252612",
      bookingUrl: "https://www.bundelkhandriverside.com/",
      amenities: ["Betwa Riverfront", "Cenotaph Views", "Swimming Pool", "Gardens"],
      notes: "Heritage property along the Betwa River with panoramic views of the famous Orchha Chattris.",
    },
    {
      id: "or3", name: "Amar Mahal Orchha", type: "hotel", stars: 4,
      avgPricePerNight: 5200, town: "Bypass Road, Orchha", contact: "+91-7680-252102",
      bookingUrl: "https://www.amarmahal.com/",
      amenities: ["Bundela Architecture", "Pool", "Spa", "Monument Views"],
      notes: "Exquisite Bundela style architecture overlooking the cenotaphs and lush green sanctuary.",
    },
  ],

  "mandu-afghan-ruins-plateau": [
    {
      id: "md1", name: "MPT Malwa Resort Mandu", type: "resort", stars: 3,
      avgPricePerNight: 3200, town: "Jahaz Mahal Road, Mandu", contact: "+91-7292-263235",
      bookingUrl: "https://www.mptourism.com/",
      amenities: ["Lakefront", "Gardens", "Restaurant", "Wi-Fi", "Parking"],
      notes: "State tourism resort set around a serene natural lake near Jahaz Mahal and Hindola Mahal.",
    },
    {
      id: "md2", name: "MPT Malwa Retreat", type: "hotel", stars: 3,
      avgPricePerNight: 2400, town: "Main Road, Mandu", contact: "+91-7292-263221",
      bookingUrl: "https://www.mptourism.com/",
      amenities: ["Garden View", "Restaurant", "Hot Water", "Clean Cottages"],
      notes: "Peaceful budget-friendly property surrounded by trees, close to Baz Bahadur's Palace.",
    },
  ],

  "chitrakoot-mp-pilgrimage": [
    {
      id: "ck1", name: "MPT Tourist Bungalow Chitrakoot", type: "hotel", stars: 3,
      avgPricePerNight: 2200, town: "Near Ramghat, Chitrakoot", contact: "+91-7670-265326",
      bookingUrl: "https://www.mptourism.com/",
      amenities: ["Mandakini Riverfront", "Garden", "Pure Veg Restaurant", "Parking"],
      notes: "Spacious MP Tourism hotel on the banks of Mandakini River, 10 min walk to Ramghat.",
    },
    {
      id: "ck2", name: "MPT Mandakini Resort", type: "resort", stars: 3,
      avgPricePerNight: 2600, town: "Chitrakoot", contact: "+91-7670-265384",
      bookingUrl: "https://www.mptourism.com/",
      amenities: ["River View", "Hot Water", "Satvik Food", "Temple Access"],
      notes: "Comfortable cottages overlooking the gentle waters of the Mandakini River.",
    },
  ],

  "bhimbetka-rock-shelters": [
    {
      id: "bb1", name: "MPT Highway Treat Bhimbetka", type: "guesthouse", stars: 3,
      avgPricePerNight: 2400, town: "NH-46, Bhimbetka Bypass", contact: "+91-7480-265222",
      bookingUrl: "https://www.mptourism.com/",
      amenities: ["Proximity to Rock Shelters", "Restaurant", "Parking", "Wi-Fi"],
      notes: "Strategic highway retreat situated right at the approach turnoff to the UNESCO rock art caves.",
    },
    {
      id: "bb2", name: "Jehan Numa Palace Hotel", type: "hotel", stars: 5,
      avgPricePerNight: 8500, town: "Shamla Hills, Bhopal", contact: "+91-755-2661100",
      bookingUrl: "https://www.jehannuma.com/palace-bhopal/",
      amenities: ["Royal Heritage", "Pool", "Spa", "World-class Dining", "Horse Riding"],
      notes: "Splendid 19th-century Nawabi residence in Bhopal, 40 km from Bhimbetka & Bhojpur.",
    },
  ],

  "amarkantak-narmada-source": [
    {
      id: "ak1", name: "MPT Holiday Homes Amarkantak", type: "hotel", stars: 3,
      avgPricePerNight: 2500, town: "Amarkantak, Anuppur", contact: "+91-7659-269416",
      bookingUrl: "https://www.mptourism.com/",
      amenities: ["Sal Forest Surroundings", "Restaurant", "Garden", "Hot Water"],
      notes: "Set in tranquil pine and sal forests close to Narmada Udgam and ancient Kalachuri temples.",
    },
    {
      id: "ak2", name: "Sarvodaya Vishram Griha", type: "guesthouse", stars: 2,
      avgPricePerNight: 1200, town: "Temple Complex, Amarkantak", contact: "+91-7659-269430",
      bookingUrl: "https://www.google.com/travel/hotels/s/Amarkantak",
      amenities: ["Temple Proximity", "Satvik Food", "Clean Rooms"],
      notes: "Peaceful pilgrim guesthouse just minutes from the sacred Narmada temple pond.",
    },
  ],

  "patalkot-valley-tribal": [
    {
      id: "pt1", name: "MPT Motel Tamia", type: "hotel", stars: 3,
      avgPricePerNight: 2400, town: "Tamia Hills, Chhindwara", contact: "+91-7161-278225",
      bookingUrl: "https://www.mptourism.com/",
      amenities: ["Cliff Edge Panorama", "Valley View", "Restaurant", "Parking"],
      notes: "Perched on the cliff rim of the Satpura range with breathtaking views over the hidden Patalkot horseshoe valley.",
    },
    {
      id: "pt2", name: "Tamia Eco Forest Rest House", type: "guesthouse", stars: 2,
      avgPricePerNight: 1500, town: "Chimhipur / Tamia", contact: "+91-7161-278200",
      bookingUrl: "https://www.google.com/travel/hotels/s/Tamia",
      amenities: ["Forest Setting", "Local Guides", "Basic Amenities"],
      notes: "Surrounded by medicinal herb reserves and dense sal forests on the valley rim.",
    },
  ],

  "panna-tiger-reserve-safari": [
    {
      id: "pr1", name: "Ken River Lodge", type: "resort", stars: 4,
      avgPricePerNight: 8500, town: "Madla Gate, Panna", contact: "+91-11-41517722",
      bookingUrl: "https://www.kenriverlodge.com/",
      amenities: ["Treehouse Machans", "Ken Riverfront", "Safari Desk", "Meals Included"],
      notes: "Pioneering wildlife lodge set on 50 acres of riverside forest along the Ken River near Madla Gate.",
    },
    {
      id: "pr2", name: "MPT Jungle Camp Madla", type: "resort", stars: 3,
      avgPricePerNight: 3800, town: "Madla, Panna National Park", contact: "+91-7732-275275",
      bookingUrl: "https://www.mptourism.com/",
      amenities: ["Gate Proximity", "Cottages", "Restaurant", "Safari Jeep Desk"],
      notes: "Located just 500 meters from Panna's primary safari entrance gate in Madla.",
    },
  ],

  "tirathgarh-kanger-valley-chhattisgarh": [
    {
      id: "tg1", name: "Dandami Luxury Resort", type: "resort", stars: 3,
      avgPricePerNight: 3500, town: "Chitrakote / Jagdalpur, Bastar", contact: "+91-7782-229210",
      bookingUrl: "https://www.chhattisgarhtourism.co.in/",
      amenities: ["Bastar Architecture", "Restaurant", "Garden", "Cottages"],
      notes: "State-run resort with tribal terracotta design, convenient base for Kanger Valley National Park.",
    },
    {
      id: "tg2", name: "Naman Bastar Resort", type: "resort", stars: 3,
      avgPricePerNight: 3800, town: "Chitrakote Road, Jagdalpur", contact: "+91-7782-229555",
      bookingUrl: "https://www.namanbastar.com/",
      amenities: ["Cultural Shows", "Swimming Pool", "Bastar Craft Studio", "Wi-Fi"],
      notes: "Boutique eco-resort themed around tribal Dhokra art and bell-metal crafts.",
    },
  ],

  "chitrakoot-waterfall-bastar": [
    {
      id: "cw1", name: "Dandami Luxury Resort Chitrakote", type: "resort", stars: 3,
      avgPricePerNight: 3800, town: "Chitrakoot Falls Rim, Bastar", contact: "+91-7782-229211",
      bookingUrl: "https://www.chhattisgarhtourism.co.in/",
      amenities: ["Waterfall Front View", "Wooden Cottages", "Restaurant", "Lawn"],
      notes: "Cottages positioned right along the cliff rim directly facing India's widest waterfall.",
    },
    {
      id: "cw2", name: "Bastar Jungle Resort", type: "resort", stars: 3,
      avgPricePerNight: 3200, town: "Jagdalpur Outskirts", contact: "+91-94252-58110",
      bookingUrl: "https://www.bastarjungleresort.com/",
      amenities: ["Sal Forest", "Tribal Hospitality", "Bonfire", "Authentic Meals"],
      notes: "Quiet jungle resort immersed in nature, 30 minutes drive from Chitrakoot Falls.",
    },
  ],

  "bastar-tribal-culture-haat": [
    {
      id: "bt1", name: "Bastar Homestay Tokapal", type: "homestay", stars: 3,
      avgPricePerNight: 1800, town: "Tokapal, Bastar", contact: "+91-94252-12345",
      bookingUrl: "https://www.airbnb.co.in/s/Jagdalpur--Chhattisgarh/homes",
      amenities: ["Maria Tribal Hosts", "Village Meals", "Haat Guide", "Local Culture"],
      notes: "Stay with local families and experience weekly tribal haats, rooster fights, and Dhokra foundry visits.",
    },
    {
      id: "bt2", name: "Naman Bastar Jagdalpur", type: "resort", stars: 3,
      avgPricePerNight: 3800, town: "Jagdalpur", contact: "+91-7782-229555",
      bookingUrl: "https://www.namanbastar.com/",
      amenities: ["Pool", "Restaurant", "Wi-Fi", "Artisan Workshops"],
      notes: "Comfortable heritage resort within easy reach of Jagdalpur palace and craft villages.",
    },
  ],

  "ziro-valley-apatani": [
    {
      id: "zv1", name: "Ziro Valley Resort", type: "resort", stars: 3,
      avgPricePerNight: 3800, town: "Biiri Village, Ziro", contact: "+91-94360-45678",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Ziro+Arunachal",
      amenities: ["Pine Woods View", "Local Cuisine", "Wi-Fi", "Bonfire"],
      notes: "Nestled amidst blue pine forests with panoramic views over lush Apatani rice paddies.",
    },
    {
      id: "zv2", name: "Siiro Resort", type: "resort", stars: 3,
      avgPricePerNight: 3200, town: "Siiro, Old Ziro", contact: "+91-94022-78901",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Ziro",
      amenities: ["Kiwi Orchard", "Wooden Cottages", "Mountain View"],
      notes: "Charming wooden chalets surrounded by kiwi plantations and terraced fields.",
    },
    {
      id: "zv3", name: "Abasa Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 2000, town: "Siiro Village, Ziro", contact: "+91-94360-49663",
      bookingUrl: "https://www.airbnb.co.in/s/Ziro/homes",
      amenities: ["Apatani Family", "Hearth Cooking", "Organic Farming Tour", "Hot Water"],
      notes: "Acclaimed indigenous Apatani homestay where you sit around the family hearth and learn tribal customs.",
    },
  ],

  "dzukou-valley-trek-nagaland": [
    {
      id: "dz1", name: "Dzukou Valley Rest House", type: "guesthouse", stars: 2,
      avgPricePerNight: 800, town: "Dzukou Valley Rim", contact: "+91-98622-45678",
      bookingUrl: "https://www.google.com/search?q=Dzukou+Valley+rest+house+booking",
      amenities: ["Valley View", "Campground", "Basic Mattresses", "Fireplace"],
      notes: "The only rest house perched right on the rim above Dzukou Valley. Bring warm sleeping bag and thermals.",
    },
    {
      id: "dz2", name: "Viswema Base Camp & Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1500, town: "Viswema Village, Kohima", contact: "+91-94360-12344",
      bookingUrl: "https://www.airbnb.co.in/s/Kohima/homes",
      amenities: ["Naga Thali", "Trailhead Access", "Hot Water", "Local Trek Guide"],
      notes: "Traditional Angami Naga homestay at the Viswema trail entrance before starting the trek.",
    },
    {
      id: "dz3", name: "Hotel Japfu Kohima", type: "hotel", stars: 3,
      avgPricePerNight: 3500, town: "PR Hill, Kohima", contact: "+91-370-2240211",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Kohima",
      amenities: ["Heritage Hotel", "Restaurant", "Wi-Fi", "Valley View"],
      notes: "Centrally located government hotel in Kohima with views of Mount Japfu.",
    },
  ],

  "mawlynnong-cleanest-village": [
    {
      id: "mw1", name: "Mawlynnong Village Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1800, town: "Mawlynnong Village, East Khasi Hills", contact: "+91-96120-78901",
      bookingUrl: "https://www.airbnb.co.in/s/Mawlynnong/homes",
      amenities: ["Bamboo Stilt Hut", "Orchid Gardens", "Khasi Meals", "Cleanest Village Tour"],
      notes: "Traditional eco-friendly bamboo hut maintained by local Khasi villagers with spotless courtyards.",
    },
    {
      id: "mw2", name: "Hala Tyngkong Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 2000, town: "Mawlynnong", contact: "+91-98560-23456",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Mawlynnong",
      amenities: ["Garden View", "Home Cooking", "Hot Water"],
      notes: "Surrounded by betel nut trees and pitcher plants near the famous Sky Walk bamboo tower.",
    },
  ],

  "nongriat-double-decker-trek": [
    {
      id: "nr1", name: "Serene Homestay Nongriat", type: "homestay", stars: 3,
      avgPricePerNight: 1200, town: "Nongriat Village", contact: "+91-96150-12345",
      bookingUrl: "https://www.airbnb.co.in/s/Nongriat/homes",
      amenities: ["Beside Root Bridge", "Natural Pool Access", "Home Food", "Backpacker Community"],
      notes: "Legendary homestay situated right in Nongriat village, 2 minutes walk from the Double Decker Living Root Bridge.",
    },
    {
      id: "nr2", name: "Cherrapunjee Holiday Resort", type: "resort", stars: 3,
      avgPricePerNight: 4200, town: "Laitkynsew, Cherrapunji", contact: "+91-94361-15925",
      bookingUrl: "https://www.cherrapunjee.com/",
      amenities: ["Trek Trailhead", "Khasi Heritage", "Restaurant", "Trek Guides"],
      notes: "Pioneering eco-resort that first documented the living root bridges for travellers; perched on the canyon rim.",
    },
  ],

  "dawki-umngot-river-meghalaya": [
    {
      id: "dw1", name: "Shnongpdeng River Camps", type: "camp", stars: 3,
      avgPricePerNight: 2200, town: "Shnongpdeng Beach, Dawki", contact: "+91-98630-11223",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Dawki",
      amenities: ["Riverside Tents", "Kayaking", "Cliff Jumping", "Bonfire", "Meals Included"],
      notes: "Pebble beach camping directly on the crystal-clear turquoise waters of the Umngot River.",
    },
    {
      id: "dw2", name: "Betelnut Eco Resort Dawki", type: "resort", stars: 3,
      avgPricePerNight: 3200, town: "Darrang, Dawki", contact: "+91-94361-88990",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Dawki",
      amenities: ["Cottages", "River View", "Restaurant", "Boating"],
      notes: "Thatched eco-cottages overlooking lush river bends near the Bangladesh border.",
    },
  ],

  "mawsynram-wettest-place-earth": [
    {
      id: "mr1", name: "Sookha Homestay Mawsynram", type: "homestay", stars: 3,
      avgPricePerNight: 1600, town: "Mawsynram Village", contact: "+91-98620-33445",
      bookingUrl: "https://www.airbnb.co.in/s/Mawsynram/homes",
      amenities: ["Fireplace Hearth", "Warm Khasi Hospitality", "Hot Water", "Local Meals"],
      notes: "Cozy home with warming hearths, essential for the rainy mist-shrouded plateau of Mawsynram.",
    },
    {
      id: "mr2", name: "Polo Orchid Resort Cherrapunjee", type: "resort", stars: 4,
      avgPricePerNight: 6500, town: "Mawkdok, Sohra / Mawsynram Road", contact: "+91-3637-235000",
      bookingUrl: "https://www.polohotels.com/",
      amenities: ["Infinity Pool", "Waterfall View", "Luxury Villas", "Restaurant"],
      notes: "Luxury cliff-hanging resort offering panoramic views of the deepest gorges in the Khasi Hills.",
    },
  ],

  "majuli-brahmaputra-assam": [
    {
      id: "mj1", name: "La Maison de Ananda", type: "homestay", stars: 3,
      avgPricePerNight: 1800, town: "Garamur, Majuli Island", contact: "+91-94352-03482",
      bookingUrl: "https://www.airbnb.co.in/s/Majuli/homes",
      amenities: ["Mishing Bamboo Architecture", "River Breeze", "Home Food", "Bicycle Rental"],
      notes: "Iconic bamboo stilt cottage designed by a French architect, immersing you in Mishing tribal heritage.",
    },
    {
      id: "mj2", name: "Prashanti Eco Tourism Resort", type: "resort", stars: 3,
      avgPricePerNight: 2400, town: "Kamalabari, Majuli", contact: "+91-3775-274443",
      bookingUrl: "https://tourism.assam.gov.in/",
      amenities: ["Assam Tourism Property", "Cottages", "Assamese Food", "Satra Proximity"],
      notes: "Conveniently located near Kamalabari Ghat and centuries-old neo-Vaishnavite Satras.",
    },
  ],

  "khonoma-green-village-nagaland": [
    {
      id: "kh1", name: "Meru's Homestay Khonoma", type: "homestay", stars: 3,
      avgPricePerNight: 1800, town: "Khonoma Village, Kohima", contact: "+91-94362-15890",
      bookingUrl: "https://www.airbnb.co.in/s/Khonoma/homes",
      amenities: ["Terraced Paddy Views", "Angami Naga Culture", "Organic Food", "Village Walks"],
      notes: "Authentic stone and timber house with sweeping views of the centuries-old terraced valley.",
    },
    {
      id: "kh2", name: "Dovipie Inn", type: "guesthouse", stars: 3,
      avgPricePerNight: 2200, town: "Khonoma Hills", contact: "+91-94364-00123",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Khonoma",
      amenities: ["Terrace View", "Naga Kitchen", "Hot Water", "Clean Rooms"],
      notes: "Panoramic terrace overlooking the historic village forts and the green Blyth's tragopan sanctuary.",
    },
  ],

  "ukhrul-tangkhul-manipur": [
    {
      id: "uk1", name: "Shirui Lily Cottage", type: "homestay", stars: 3,
      avgPricePerNight: 1600, town: "Shirui Village, Ukhrul", contact: "+91-98621-34567",
      bookingUrl: "https://www.airbnb.co.in/s/Ukhrul/homes",
      amenities: ["Mountain Base", "Tangkhul Food", "Trail Guides", "Fireplace"],
      notes: "Set at the foot of the Shirui Kashong peak, home to the rare Shirui Lily.",
    },
    {
      id: "uk2", name: "25 Degree North Hotel", type: "hotel", stars: 3,
      avgPricePerNight: 2500, town: "Viewland, Ukhrul Town", contact: "+91-3870-265111",
      bookingUrl: "https://www.google.com/travel/hotels/s/Ukhrul",
      amenities: ["Valley View", "Restaurant", "Wi-Fi", "Hot Water"],
      notes: "Modern hill town hotel with commanding views of the Tangkhul highland ridges.",
    },
  ],

  "loktak-lake-floating-islands": [
    {
      id: "lt1", name: "Sendra Park & Resort by Classic", type: "resort", stars: 4,
      avgPricePerNight: 4500, town: "Sendra Island, Loktak Lake, Moirang", contact: "+91-385-2443969",
      bookingUrl: "https://www.theclassichotel.in/sendra-park-resort/",
      amenities: ["360 Lake View", "Phumdi Panorama", "Restaurant", "Boating Jetty"],
      notes: "Perched atop an elevated island with panoramic views of the floating biomass phumdis and Keibul Lamjao.",
    },
    {
      id: "lt2", name: "Loktak Floating Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 2200, town: "Thanga Island, Loktak Lake", contact: "+91-87878-12345",
      bookingUrl: "https://www.airbnb.co.in/s/Loktak-Lake/homes",
      amenities: ["Stay on a Phumdi", "Canoe Ride", "Fresh Lake Fish", "Stargazing"],
      notes: "World's most unique lodging: an authentic cottage built directly on a floating island of soil and vegetation.",
    },
  ],

  "reiek-hill-mizoram": [
    {
      id: "re1", name: "Reiek Tourist Resort (Mizoram Tourism)", type: "resort", stars: 3,
      avgPricePerNight: 1800, town: "Reiek Tlang, Aizawl District", contact: "+91-389-2333475",
      bookingUrl: "https://tourism.mizoram.gov.in/",
      amenities: ["Mizo Heritage Village", "Cottages", "Mizo Kitchen", "Peak Trailhead"],
      notes: "Stone cottages located right next to the model Mizo chieftain village and the Reiek peak cliff trail.",
    },
    {
      id: "re2", name: "David's Hotel Clover", type: "hotel", stars: 3,
      avgPricePerNight: 3200, town: "Chanmari, Aizawl", contact: "+91-389-2341541",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Aizawl",
      amenities: ["City Panorama", "Restaurant", "Wi-Fi", "Clean Modern Rooms"],
      notes: "Comfortable boutique base in Aizawl city, 30 km from Reiek peak.",
    },
  ],

  "vantawng-waterfall-thenzawl": [
    {
      id: "vtg1", name: "Thenzawl Golf Resort & Wellness", type: "resort", stars: 3,
      avgPricePerNight: 2800, town: "Thenzawl, Serchhip District", contact: "+91-389-2333475",
      bookingUrl: "https://tourism.mizoram.gov.in/",
      amenities: ["18-Hole Golf Course", "Log Chalets", "Restaurant", "Lush Meadows"],
      notes: "State-of-the-art eco chalets situated in an expansive green plateau near Mizoram's highest waterfalls.",
    },
    {
      id: "vtg2", name: "Thenzawl Tourist Lodge", type: "guesthouse", stars: 2,
      avgPricePerNight: 1400, town: "Handloom Village, Thenzawl", contact: "+91-389-2333400",
      bookingUrl: "https://tourism.mizoram.gov.in/",
      amenities: ["Handloom Center", "Basic Meals", "Hot Water"],
      notes: "Clean government rest house close to traditional Mizo Puan handloom weaving workshops.",
    },
  ],

  "unakoti-rock-carvings-tripura": [
    {
      id: "un1", name: "Unakoti Tourist Lodge", type: "guesthouse", stars: 3,
      avgPricePerNight: 1600, town: "Kailashahar, Unakoti District", contact: "+91-3824-222340",
      bookingUrl: "https://tripuratourism.gov.in/",
      amenities: ["Tripura Tourism", "Restaurant", "Garden", "Proximity to Bas-Reliefs"],
      notes: "State lodge located 8 km from the ancient rock-carved Shiva heads nestled in dense forest.",
    },
    {
      id: "un2", name: "Royal Guest House Dharmanagar", type: "hotel", stars: 2,
      avgPricePerNight: 1200, town: "Dharmanagar", contact: "+91-3822-220111",
      bookingUrl: "https://www.google.com/travel/hotels/s/Dharmanagar",
      amenities: ["Railway Station Access", "Clean Rooms", "Food on Order"],
      notes: "Convenient railhead base hotel 25 km from Unakoti.",
    },
  ],

  "namdapha-national-park-safari": [
    {
      id: "np1", name: "Deban Forest Inspection Bungalow", type: "guesthouse", stars: 2,
      avgPricePerNight: 1200, town: "Deban, Namdapha Core", contact: "+91-3786-222249",
      bookingUrl: "https://www.google.com/search?q=Namdapha+Deban+forest+rest+house",
      amenities: ["Noa-Dihing River View", "Core Jungle", "Campfire", "Forest Dept Permits"],
      notes: "Iconic colonial-era forest bungalow inside the core tiger reserve, overlooking the crystal river.",
    },
    {
      id: "np2", name: "Namdapha Jungle Camp Miao", type: "camp", stars: 3,
      avgPricePerNight: 2500, town: "Miao, Changlang", contact: "+91-94360-12399",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Miao+Arunachal",
      amenities: ["Singpho Bamboo Huts", "Naturalist Guides", "Bonfire", "Local Meals"],
      notes: "Eco-camp run by local indigenous Singpho tribe members near the park entrance gate.",
    },
  ],

  "bomdila-monastery-arunachal": [
    {
      id: "bm1", name: "Hotel Elysium Bomdila", type: "hotel", stars: 3,
      avgPricePerNight: 3200, town: "Cona Road, Bomdila", contact: "+91-94360-66778",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Bomdila",
      amenities: ["Himalayan Panorama", "Restaurant", "Wi-Fi", "Heated Rooms"],
      notes: "Modern mountain hotel with unobstructed views of the snow-clad Kangto and Gorichen peaks.",
    },
    {
      id: "bm2", name: "Tsepal Yangjom Hotel", type: "hotel", stars: 3,
      avgPricePerNight: 2600, town: "Bomdila Main Market", contact: "+91-3782-222347",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Bomdila",
      amenities: ["Tibetan Décor", "Restaurant", "Hot Water", "Monastery Proximity"],
      notes: "Warm Buddhist-style boutique stay walking distance from Lower and Middle Gompa.",
    },
  ],

  "neil-island-6-days": [
    {
      id: "ni1", name: "Sea Shell Samssara Neil", type: "resort", stars: 4,
      avgPricePerNight: 8500, town: "Laxmanpur Beach, Neil Island", contact: "+91-3192-234453",
      bookingUrl: "https://www.seashellhotels.net/neil-island/",
      amenities: ["Private Beach Access", "Swimming Pool", "Restaurant", "Spa", "Wi-Fi"],
      notes: "Luxury beachfront villas set amidst lush coconut groves near the sunset beach and natural bridge.",
    },
    {
      id: "ni2", name: "Summer Sands Beach Resort", type: "resort", stars: 4,
      avgPricePerNight: 6500, town: "Ramnagar Beach, Neil Island", contact: "+91-3192-282430",
      bookingUrl: "https://www.summersands.in/",
      amenities: ["Courtyard Pool", "Sea View", "Bar & Restaurant", "Bicycle Rental"],
      notes: "Tranquil property with spacious pool villas located on the quiet eastern coast of Neil Island.",
    },
    {
      id: "ni3", name: "TSG Aura", type: "resort", stars: 3,
      avgPricePerNight: 4200, town: "Sitapur Beach, Neil Island", contact: "+91-3192-282600",
      bookingUrl: "https://www.tsghotels.in/tsg-aura-neil-island/",
      amenities: ["Sunrise Beach", "Wooden Cabins", "Restaurant", "Wi-Fi"],
      notes: "Charming wooden cottages just steps from Sitapur Beach, famous for spectacular sunrise views.",
    },
  ],

  "diglipur-7-days": [
    {
      id: "dg1", name: "Pristine Beach Resort", type: "resort", stars: 3,
      avgPricePerNight: 3500, town: "Kalipur Beach, Diglipur", contact: "+91-3192-272532",
      bookingUrl: "https://www.hotelpristinebeachresort.com/",
      amenities: ["Turtle Nesting Beach", "Bamboo Cottages", "Seafood Restaurant", "Saddle Peak Base"],
      notes: "Top eco-resort on Kalipur Beach, steps away from turtle hatching points and Ross & Smith boat jetty.",
    },
    {
      id: "dg2", name: "Saddle Peak View Resort", type: "resort", stars: 3,
      avgPricePerNight: 2800, town: "Kalipur, North Andaman", contact: "+91-94742-12345",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Diglipur",
      amenities: ["Peak View", "Garden Cottages", "Fresh Seafood"],
      notes: "Quiet family-run cottages offering views of the highest mountain peak in the Andaman archipelago.",
    },
    {
      id: "dg3", name: "Turtle Resort (APTDC)", type: "resort", stars: 2,
      avgPricePerNight: 1800, town: "Kalipur, Diglipur", contact: "+91-3192-272648",
      bookingUrl: "https://www.andamantourism.gov.in/",
      amenities: ["Government Property", "Clean Rooms", "Canteen", "Beach Proximity"],
      notes: "Government tourism lodge perched on a hillock overlooking Kalipur Beach.",
    },
  ],

  "chitkul-5-days": [
    {
      id: "ckl1", name: "Samaa Resorts Chitkul", type: "resort", stars: 4,
      avgPricePerNight: 5500, town: "Chitkul, Baspa Valley, Kinnaur", contact: "+91-98160-55443",
      bookingUrl: "https://www.samaaresorts.com/",
      amenities: ["Baspa Riverfront", "Snow Peak Views", "Restaurant", "Bonfire", "Heating"],
      notes: "Luxury alpine retreat overlooking snow peaks on the banks of Baspa River in India's last village.",
    },
    {
      id: "ckl2", name: "Zostel Chitkul", type: "guesthouse", stars: 3,
      avgPricePerNight: 1400, town: "Chitkul Village", contact: "+91-11-40845115",
      bookingUrl: "https://www.zostel.com/zostel/chitkul/",
      amenities: ["Terrace Cafe", "Wi-Fi", "Common Room", "Mountain Views"],
      notes: "World's highest backpacker hostel with wood-and-stone rooms facing the Kinnauri mountain ridges.",
    },
    {
      id: "ckl3", name: "Wanderers Nest Chitkul", type: "homestay", stars: 3,
      avgPricePerNight: 2200, town: "Chitkul Village", contact: "+91-98160-12345",
      bookingUrl: "https://www.airbnb.co.in/s/Chitkul/homes",
      amenities: ["Slate Roof Architecture", "Kinnauri Food", "Heated Beds"],
      notes: "Traditional Kathkuni wooden homestay run by friendly village locals with home-cooked meals.",
    },
  ],

  "kalpa-5-days": [
    {
      id: "klp1", name: "The Grand Shamba-La", type: "hotel", stars: 4,
      avgPricePerNight: 4800, town: "Kalpa, Kinnaur", contact: "+91-1786-226001",
      bookingUrl: "https://www.thegrandshambala.com/",
      amenities: ["180 Kinnaur Kailash View", "Rooftop Restaurant", "Wi-Fi", "Heating"],
      notes: "Premier boutique hotel in Kalpa with uninterrupted panoramas of the 6,050m Kinnaur Kailash Shivling.",
    },
    {
      id: "klp2", name: "Hotel Kinner Kailash (HPTDC)", type: "resort", stars: 3,
      avgPricePerNight: 3500, town: "Apple Orchards, Kalpa", contact: "+91-1786-226159",
      bookingUrl: "https://hptdc.in/",
      amenities: ["Himachal Tourism", "Apple Orchard", "Bar & Restaurant", "Huge Balconies"],
      notes: "Perched high above Reckong Peo amidst apple orchards, famous for sunrise mountain views.",
    },
    {
      id: "klp3", name: "Blue Lotus Hotel", type: "hotel", stars: 3,
      avgPricePerNight: 2200, town: "Kalpa Village", contact: "+91-94180-23456",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Kalpa",
      amenities: ["Wooden Balcony", "Hot Water", "Local Cuisine"],
      notes: "Cozy rooms with traditional Kinnauri wooden carvings overlooking the sacred Kailash peak.",
    },
  ],

  "tirthan-valley-6-days": [
    {
      id: "tv1", name: "Raju Bharti's Guesthouse", type: "homestay", stars: 4,
      avgPricePerNight: 3800, town: "Gushaini, Tirthan Valley", contact: "+91-94181-49808",
      bookingUrl: "https://www.google.com/search?q=Raju+Bharti+Guesthouse+Tirthan",
      amenities: ["River Pulley Crossing", "Home-Cooked Trout", "Orchard Setting", "Meals Included"],
      notes: "Legendary pioneer homestay accessed via an iconic hand-pulled cable car over the roaring river.",
    },
    {
      id: "tv2", name: "The Himalayan Trout House", type: "resort", stars: 3,
      avgPricePerNight: 4200, town: "Nagini, Tirthan Valley", contact: "+91-98160-11100",
      bookingUrl: "https://www.trouthouse.com/",
      amenities: ["Stone Mud Cottages", "Angling Guides", "Wood-fired Oven Cafe", "River Access"],
      notes: "Rustic-chic mud-and-stone lodge famous for brown trout fishing and GHNP trek expeditions.",
    },
    {
      id: "tv3", name: "Tirthan River View Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 2000, town: "Sai Ropa, Tirthan", contact: "+91-98164-56789",
      bookingUrl: "https://www.airbnb.co.in/s/Tirthan-Valley/homes",
      amenities: ["Riverside Lawn", "Wi-Fi", "Bonfire", "Himachali Food"],
      notes: "Peaceful riverside stay located right near the Great Himalayan National Park information office.",
    },
  ],

  "malana-4-days": [
    {
      id: "ml1", name: "Dragon Guesthouse & Cafe", type: "guesthouse", stars: 3,
      avgPricePerNight: 1800, town: "Malana Base / Magic Valley", contact: "+91-98160-77665",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Malana+Himachal",
      amenities: ["Valley View", "Cafe", "Bonfire", "Trailhead Access"],
      notes: "Comfortable lodge situated just outside the sacred village boundaries to respect local customs.",
    },
    {
      id: "ml2", name: "Waichin Valley Camps", type: "camp", stars: 3,
      avgPricePerNight: 2500, town: "Waichin / Magic Valley, Malana", contact: "+91-98055-12345",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Waichin+Valley",
      amenities: ["High Altitude Tents", "Alpine Meadows", "Meals Included", "Stargazing"],
      notes: "Glamping tents located in the pristine Waichin Valley above Malana with panoramic Himalayan views.",
    },
    {
      id: "ml3", name: "The Himalayan Village", type: "resort", stars: 5,
      avgPricePerNight: 14000, town: "Kailash Nagar, Kasol / Jari", contact: "+91-1902-276266",
      bookingUrl: "https://www.thehimalayanvillage.com/",
      amenities: ["Kathkuni Architecture", "Spa", "Private Jacuzzi", "Luxury Dining"],
      notes: "Ultra-luxury traditional wooden machans located 12 km from the Malana trek starting point.",
    },
  ],

  "barot-valley-4-days": [
    {
      id: "bv1", name: "Barot River View Camp", type: "camp", stars: 3,
      avgPricePerNight: 2200, town: "Uhl Riverbank, Barot Valley", contact: "+91-98160-98765",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Barot",
      amenities: ["Riverside Tents", "Trout Angling", "Bonfire", "Meals Included"],
      notes: "Alpine camping right along the gushing waters of the Uhl River, minutes from the trout breeding center.",
    },
    {
      id: "bv2", name: "Negi Homestay Multhan", type: "homestay", stars: 3,
      avgPricePerNight: 1500, town: "Multhan, Barot", contact: "+91-94180-87654",
      bookingUrl: "https://www.airbnb.co.in/s/Barot--Himachal/homes",
      amenities: ["Home Cooked Meals", "Himachali Wooden Rooms", "Hot Water"],
      notes: "Warm and cozy family homestay in Multhan across the wooden bridge from Barot market.",
    },
    {
      id: "bv3", name: "Wild Highs Forest Camp", type: "camp", stars: 3,
      avgPricePerNight: 2600, town: "Barot Reservoir Woods", contact: "+91-98165-43210",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Barot",
      amenities: ["Cedar Forest", "Alpine Glamping", "Trek Guides", "Stargazing"],
      notes: "Surrounded by cedar and deodar forests near the British-era funicular trolley and reservoir.",
    },
  ],

  "rakchham-5-days": [
    {
      id: "rk1", name: "Rupin River View Hotel", type: "hotel", stars: 3,
      avgPricePerNight: 3500, town: "Rakchham, Baspa Valley", contact: "+91-94180-34567",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Rakchham",
      amenities: ["Baspa River View", "Wooden Interior", "Restaurant", "Balcony"],
      notes: "Charming Swiss-style wooden lodge directly facing the turquoise glacial Baspa River.",
    },
    {
      id: "rk2", name: "Apple Pie Resort Rakchham", type: "resort", stars: 3,
      avgPricePerNight: 3800, town: "Sangla-Chitkul Road, Rakchham", contact: "+91-98160-65432",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Rakchham",
      amenities: ["Mountain Panorama", "Apple Grove", "Heating", "Hot Water"],
      notes: "Midway between Sangla and Chitkul in the tranquil pink-stone village of Rakchham.",
    },
    {
      id: "rk3", name: "Igloo Nature Camp Rakchham", type: "camp", stars: 3,
      avgPricePerNight: 2500, town: "Riverside, Rakchham", contact: "+91-94182-12340",
      bookingUrl: "https://www.airbnb.co.in/s/Rakchham/homes",
      amenities: ["Riverside Dome Tents", "Bonfire", "Stargazing", "Meals Included"],
      notes: "Glamping domes set right beside the Baspa River under towering granite peaks.",
    },
  ],

  "nako-6-days": [
    {
      id: "nk1", name: "Lake View Hotel & Resort Nako", type: "hotel", stars: 3,
      avgPricePerNight: 2800, town: "Nako Lake, Kinnaur-Spiti Border", contact: "+91-94180-99887",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Nako+Himachal",
      amenities: ["Lake View", "Rooftop Cafe", "Hot Water", "Local Food"],
      notes: "Directly overlooks the high-altitude willow-fringed sacred Nako Lake at 3,662 m.",
    },
    {
      id: "nk2", name: "Knaygoh Kinner Camp", type: "camp", stars: 3,
      avgPricePerNight: 3200, town: "Nako Village", contact: "+91-94184-77665",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Nako",
      amenities: ["Deluxe Swiss Tents", "Meals Included", "Bonfire", "Mountain Panorama"],
      notes: "Comfortable Swiss tents nestled in poplar groves with views towards Reo Purgil peak.",
    },
    {
      id: "nk3", name: "Reo Purgil Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1600, town: "Ancient Village, Nako", contact: "+91-94188-33221",
      bookingUrl: "https://www.airbnb.co.in/s/Nako/homes",
      amenities: ["Mud-Brick House", "Traditional Tibetan Hearth", "Monastery Access"],
      notes: "Authentic mud-brick homestay in the 1,000-year-old historic village near Nako Monastery.",
    },
  ],

  "pangi-valley-6-days": [
    {
      id: "pg1", name: "PWD Rest House Killar", type: "guesthouse", stars: 2,
      avgPricePerNight: 1200, town: "Killar, Pangi Valley, Chamba", contact: "+91-1895-222222",
      bookingUrl: "https://www.google.com/search?q=PWD+Rest+House+Killar+Pangi",
      amenities: ["Chenab Gorge View", "Basic Meals", "Fireplace", "Cliff Edge"],
      notes: "High on the cliff overlooking the wild roaring Chenab river gorge; essential overnight after Sach Pass.",
    },
    {
      id: "pg2", name: "Chamunda Homestay Killar", type: "homestay", stars: 2,
      avgPricePerNight: 1400, town: "Killar Town, Pangi", contact: "+91-94180-11223",
      bookingUrl: "https://www.airbnb.co.in/s/Pangi-Valley/homes",
      amenities: ["Traditional Wooden Rooms", "Pangwala Meals", "Hot Water", "Local Host"],
      notes: "Warm Pangwala indigenous hospitality with firewood tandoor heating and home-cooked meals.",
    },
  ],

  "tosh-3-days": [
    {
      id: "ts1", name: "Pink Floyd Cafe & Guesthouse", type: "guesthouse", stars: 3,
      avgPricePerNight: 1600, town: "Top of Tosh Village, Parvati Valley", contact: "+91-98160-44332",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Tosh+Himachal",
      amenities: ["Glacier View", "Psychedelic Cafe", "Balcony Hammocks", "Wi-Fi"],
      notes: "Legendary hilltop guesthouse offering 360-degree views of the Tosh glacier and snowy ridges.",
    },
    {
      id: "ts2", name: "Stoned Cow Cafe & Stays", type: "guesthouse", stars: 3,
      avgPricePerNight: 1400, town: "Tosh Village", contact: "+91-98050-88776",
      bookingUrl: "https://www.airbnb.co.in/s/Tosh--Himachal/homes",
      amenities: ["Wooden Architecture", "Wood Tandoor", "Cafe", "Valley Views"],
      notes: "Popular with backpackers for cozy timber-paneled rooms and wood-fired oven Israeli cuisine.",
    },
    {
      id: "ts3", name: "Boom Shiva Guesthouse", type: "guesthouse", stars: 2,
      avgPricePerNight: 1000, town: "Upper Ridge, Tosh", contact: "+91-98165-22334",
      bookingUrl: "https://www.google.com/travel/hotels/s/Tosh",
      amenities: ["Waterfalls View", "Budget Rooms", "Cafe"],
      notes: "Quiet alpine stay right on the trail heading towards Kutla and the glacier viewpoint.",
    },
  ],

  "sach-pass-5-days": [
    {
      id: "sp1", name: "PWD Rest House Killar", type: "guesthouse", stars: 2,
      avgPricePerNight: 1200, town: "Killar, Pangi Valley", contact: "+91-1895-222222",
      bookingUrl: "https://www.google.com/search?q=PWD+Rest+House+Killar",
      amenities: ["Cliffside Setting", "Basic Food", "Secure Parking"],
      notes: "Primary refuge after navigating the treacherous 14,500 ft Sach Pass descent into Pangi.",
    },
    {
      id: "sp2", name: "Bairagarh Forest Lodge", type: "guesthouse", stars: 2,
      avgPricePerNight: 1000, town: "Bairagarh, Chamba", contact: "+91-1896-224411",
      bookingUrl: "https://www.google.com/travel/hotels/s/Bairagarh",
      amenities: ["Base Camp Setting", "Forest Surroundings", "Hot Tea"],
      notes: "Strategic base camp stay on the Chamba side before the morning assault on Sach Pass.",
    },
  ],

  "chopta-4-days": [
    {
      id: "ch1", name: "Meadows Chopta Resort", type: "resort", stars: 3,
      avgPricePerNight: 3500, town: "Duggalbitta, Chopta", contact: "+91-94120-88990",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Chopta",
      amenities: ["Swiss Tents", "Alpine Bugyal View", "Restaurant", "Bonfire", "Tungnath Guide"],
      notes: "Eco-friendly Swiss tents and stone cottages in Duggalbitta, right at the gateway to Chopta meadows.",
    },
    {
      id: "ch2", name: "Magpie Jungle Camp Chopta", type: "camp", stars: 3,
      avgPricePerNight: 2800, town: "Chopta Ridge", contact: "+91-94120-77665",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Chopta",
      amenities: ["Rhododendron Woods", "Delicious Garhwali Food", "Campfire", "Stargazing"],
      notes: "Surrounded by deodar and rhododendron forests with direct trail access to Tungnath and Chandrashila.",
    },
    {
      id: "ch3", name: "Forest Rest House Chopta", type: "guesthouse", stars: 2,
      avgPricePerNight: 1200, town: "Chopta Meadow", contact: "+91-1364-268220",
      bookingUrl: "https://www.google.com/search?q=Forest+Rest+House+Chopta",
      amenities: ["Bugyal View", "Historic Lodge", "Basic Meals"],
      notes: "British-era forest bungalow overlooking the sprawling alpine bugyals and Himalayan peaks.",
    },
  ],
  "khaliya-top-5-days": [
    {
      id: "kht1", name: "Khaliya Top Alpine Campsite", type: "camp", stars: 3,
      avgPricePerNight: 2200, town: "Khaliya Bugyal Ridge (11,500 ft)", contact: "+91-94111-87291",
      bookingUrl: "https://www.google.com/search?q=Khaliya+Top+Alpine+Campsite+Munsiyari",
      amenities: ["Panchachuli Sunrise View", "Thermal Tents", "Hot Meals Included", "Campfire", "Stargazing"],
      notes: "Perched right on the high alpine meadow of Khaliya Bugyal with 360-degree views of Panchachuli, Nanda Devi, and Hardeol peaks.",
    },
    {
      id: "kht2", name: "KMVN Tourist Rest House Khaliya", type: "guesthouse", stars: 2,
      avgPricePerNight: 1500, town: "Khaliya Meadow Trail", contact: "+91-5961-222334",
      bookingUrl: "https://kmvn.in",
      amenities: ["Basic Solar Power", "Hot Water", "Local Kumaoni Dining", "Mountain Views"],
      notes: "Government high-altitude shelter located mid-way on the Khaliya ridge, ideal for acclimatization before summiting Zero Point.",
    },
    {
      id: "kht3", name: "Bilju Homestay & Trek Base", type: "homestay", stars: 3,
      avgPricePerNight: 1800, town: "Balanti Forest Gate, Munsiyari", contact: "+91-98712-44390",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Munsiyari",
      amenities: ["Traditional Wooden Rooms", "Home-Cooked Kumaoni Thali", "Local Trek Guides", "Geyser"],
      notes: "Warm local Bhotiya family homestay situated right at the trailhead of the Khaliya Top hike in Balanti potato farm village.",
    },
  ],
  "chakrata-4-days": [
    {
      id: "ckt1", name: "Himalayan Eco Lodges Chakrata", type: "resort", stars: 4,
      avgPricePerNight: 4200, town: "Virhatkhai, Chakrata", contact: "+91-97177-03355",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Chakrata",
      amenities: ["Panoramic Mountain Valley View", "Luxury Cottages", "Multi-Cuisine Restaurant", "Bonfire", "Trekking Guides"],
      notes: "Secluded mountain eco-lodge set amid pine forests overlooking the Mussoorie hills and Great Himalayan range.",
    },
    {
      id: "ckt2", name: "Deoban Forest Rest House", type: "guesthouse", stars: 3,
      avgPricePerNight: 1600, town: "Deoban Forest Reserve (9,400 ft)", contact: "+91-1360-272210",
      bookingUrl: "https://forest.uk.gov.in",
      amenities: ["Virgin Deodar Woods", "Historic British Architecture", "Pahadi Cooking", "Wildlife Sighting"],
      notes: "Century-old British colonial forest bungalow deep in the virgin deodar groves of Deoban, offering clear views of 55 Himalayan peaks.",
    },
    {
      id: "ckt3", name: "Hotel Snow View Chakrata", type: "hotel", stars: 3,
      avgPricePerNight: 2400, town: "Chakrata Cantonment", contact: "+91-98972-66120",
      bookingUrl: "https://www.google.com/search?q=Hotel+Snow+View+Chakrata",
      amenities: ["Terrace Viewpoint", "Room Service", "Free Parking", "Wi-Fi"],
      notes: "Centrally positioned in the quiet cantonment ridge with uninterrupted views of Chilmiri Neck and evening sunsets.",
    },
  ],
  "kanatal-4-days": [
    {
      id: "knt1", name: "The Terraces Spa Resort Kanatal", type: "resort", stars: 4,
      avgPricePerNight: 7500, town: "Chamba-Mussoorie Highway, Kanatal", contact: "+91-1376-283180",
      bookingUrl: "https://theterraces.biz",
      amenities: ["Luxury Spa & Wellness", "Fireplace Cottages", "Fine Dining Italian & Indian", "Balcony Mountain Views"],
      notes: "Award-winning boutique mountain resort set inside 5 acres of terraced apple and pine orchards facing snow-clad peaks.",
    },
    {
      id: "knt2", name: "Whispering Pines Himalayan Camp", type: "camp", stars: 3,
      avgPricePerNight: 3000, town: "Kaudia Forest Trail, Kanatal", contact: "+91-98101-57887",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Kanatal",
      amenities: ["Swiss Canvas Tents", "Buffet Meals Included", "Rappelling & Zipline", "Campfire Nights"],
      notes: "Adventure campsite tucked in dense oak and pine woods near Kaudia forest, famous for star-filled Himalayan night skies.",
    },
    {
      id: "knt3", name: "Kanatal Heights Wooden Cottages", type: "homestay", stars: 3,
      avgPricePerNight: 2200, town: "Surkhanda Foothills, Kanatal", contact: "+91-94115-33902",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Kanatal",
      amenities: ["Handcrafted Pine Interiors", "Home Cooked Meals", "Valley Sunset Deck", "Electric Blankets"],
      notes: "Rustic and warm wooden cottages directly overlooking the Tehri reservoir hills and rolling pine ridges.",
    },
  ],
  "chaukori-5-days": [
    {
      id: "chk1", name: "KMVN Tourist Rest House Chaukori", type: "resort", stars: 3,
      avgPricePerNight: 2200, town: "Chaukori Tea Estate", contact: "+91-5964-258028",
      bookingUrl: "https://kmvn.in",
      amenities: ["180-Degree Himalayan View", "Historic Tea Garden", "In-House Restaurant", "Watch Tower", "Spacious Lawns"],
      notes: "Sprawled across the historic British tea garden with an open watchtower providing one of India's grandest views of Nanda Devi, Nanda Kot, and Panchachuli.",
    },
    {
      id: "chk2", name: "The Mist Mountain Resort Chaukori", type: "hotel", stars: 3,
      avgPricePerNight: 3200, town: "Berinag-Chaukori Road", contact: "+91-94111-09887",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Chaukori",
      amenities: ["Private Balconies", "Bonfire Garden", "Multi-Cuisine Dining", "Wi-Fi", "Orchard Walks"],
      notes: "Peaceful boutique mountain hotel perched above tea plantations with unobstructed sunrise views of the eastern Himalayan ramparts.",
    },
    {
      id: "chk3", name: "Hardik Resort & Cottages", type: "guesthouse", stars: 3,
      avgPricePerNight: 1900, town: "Udiyari Band, Chaukori", contact: "+91-94129-87612",
      bookingUrl: "https://www.google.com/search?q=Hardik+Resort+Chaukori",
      amenities: ["Pine Forest Surroundings", "Authentic Kumaoni Kitchen", "Garden Cafe", "Hot Water"],
      notes: "Charming family-run retreat nestled among cedar groves, celebrated for fresh Bhatt ki Churkani and warm mountain hospitality.",
    },
  ],

  "gurez-valley-5-days": [
    {
      id: "grz_s1", name: "Kaka Palace Guest House Dawar", type: "hotel", stars: 3,
      avgPricePerNight: 2800, town: "Dawar, Gurez Valley", contact: "+91-94190-28190",
      bookingUrl: "https://www.google.com/search?q=Kaka+Palace+Gurez",
      amenities: ["Habba Khatoon View", "Geyser Water", "In-House Wazwan", "Power Backup"],
      notes: "The most established hotel in Dawar offering panoramic river views facing Habba Khatoon peak.",
    },
    {
      id: "grz_s2", name: "JKTDC Alpine Huts Gurez", type: "resort", stars: 3,
      avgPricePerNight: 2200, town: "Dawar Riverbank, Gurez", contact: "+91-1942-502279",
      bookingUrl: "https://jktdc.co.in",
      amenities: ["Wooden Log Cabins", "Kishanganga Riverfront", "Garden Lawn", "Heated Blankets"],
      notes: "Charming government pine cabins nestled along the turquoise Kishanganga river.",
    },
    {
      id: "grz_s3", name: "Dard Shin Heritage Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1500, town: "Markoot Village, Gurez", contact: "+91-95968-33102",
      bookingUrl: "https://www.google.com/search?q=Dard+Homestay+Gurez",
      amenities: ["Traditional Wooden Interiors", "Home Cooked Meals", "Cultural Storytelling", "Warm Bedding"],
      notes: "Authentic Dardic village homestay where host families share centuries-old folklore and home-cooked Shina dishes.",
    },
  ],

  "aru-valley-4-days": [
    {
      id: "aru_s1", name: "Aru Eco Resort & Cottages", type: "resort", stars: 4,
      avgPricePerNight: 4200, town: "Aru Valley, Pahalgam", contact: "+91-99066-88120",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Pahalgam",
      amenities: ["Meadow Facing Balconies", "Bonfire Garden", "Central Heating", "Horse Riding Assistance"],
      notes: "Wooden chalets set amidst the main Aru meadow overlooking pine ridges and grazing pastures.",
    },
    {
      id: "aru_s2", name: "Milky Way Guest House & Camps", type: "guesthouse", stars: 3,
      avgPricePerNight: 1800, town: "Aru Village", contact: "+91-94195-43090",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Pahalgam",
      amenities: ["Trekker Friendly", "Trout Dining", "Hot Water", "Local Guides"],
      notes: "Popular hub for trekkers departing to Lidderwat and Tarsar Marsar lakes.",
    },
    {
      id: "aru_s3", name: "JKTDC Alpine Tourist Hut Aru", type: "guesthouse", stars: 3,
      avgPricePerNight: 2000, town: "Aru Meadow", contact: "+91-1936-243224",
      bookingUrl: "https://jktdc.co.in",
      amenities: ["Scenic Lawn", "Spacious Suites", "Mountain Stream", "Kitchen Facility"],
      notes: "Peaceful government rest huts positioned on an elevated terrace with uninterrupted 360-degree views of the valley.",
    },
  ],

  "yusmarg-4-days": [
    {
      id: "yus_s1", name: "JKTDC Kongposh Tourist Complex Yusmarg", type: "resort", stars: 3,
      avgPricePerNight: 2400, town: "Yusmarg Central Meadow", contact: "+91-1942-502280",
      bookingUrl: "https://jktdc.co.in",
      amenities: ["Meadow View Chalets", "Restaurant", "Horse Riding Desk", "Geysers"],
      notes: "Set right in the heart of the rolling green grasslands of Yusmarg facing the Pir Panjal range.",
    },
    {
      id: "yus_s2", name: "Yusmarg Pine Forest Huts", type: "homestay", stars: 3,
      avgPricePerNight: 1800, town: "Yusmarg Ridge", contact: "+91-94191-77823",
      bookingUrl: "https://www.google.com/search?q=Yusmarg+Huts",
      amenities: ["Pine Forest Setting", "Warm Bukhari Heating", "Local Kashmiri Food", "Parking"],
      notes: "Tranquil wooden cottages sheltered under towering firs, ideal for quiet retreats away from tourist crowds.",
    },
    {
      id: "yus_s3", name: "Nilnag Lake Eco Camp", type: "camp", stars: 3,
      avgPricePerNight: 2000, town: "Nilnag Forest Trail", contact: "+91-98711-45601",
      bookingUrl: "https://www.google.com/search?q=Nilnag+Camp+Yusmarg",
      amenities: ["Safari Tents", "Bonfire Nights", "Stargazing", "Nature Treks"],
      notes: "Lakeside wilderness campsite beside the turquoise waters of pine-rimmed Nilnag lake.",
    },
  ],

  "turtuk-5-days": [
    {
      id: "tur_s1", name: "Maha Guest House Turtuk", type: "guesthouse", stars: 3,
      avgPricePerNight: 2200, town: "Youl, Turtuk", contact: "+91-94691-76110",
      bookingUrl: "https://www.google.com/search?q=Maha+Guest+House+Turtuk",
      amenities: ["Apricot Garden Terrace", "Traditional Balti Food", "Solar Hot Water", "Wi-Fi"],
      notes: "Famed stone heritage guesthouse set inside lush apricot groves in historic Youl hamlet.",
    },
    {
      id: "tur_s2", name: "Turtuk Holiday Resort", type: "camp", stars: 4,
      avgPricePerNight: 3800, town: "Farol, Turtuk", contact: "+91-94198-15400",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Turtuk",
      amenities: ["Luxury Swiss Tents", "Karakoram View Deck", "Buffet Meals Included", "Campfire"],
      notes: "Comfortable glamping retreat with wooden verandas looking toward the Karakoram mountain crest.",
    },
    {
      id: "tur_s3", name: "Balti Heritage Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1600, town: "Farol, Turtuk", contact: "+91-94193-45210",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Turtuk",
      amenities: ["Carved Wood Rooms", "Home Cooked Kissir", "Village Walks", "Organic Fruits"],
      notes: "Stay with a local Balti family in a 150-year-old stone farmhouse with terrace drying beds for sweet apricots.",
    },
  ],

  "basgo-4-days": [
    {
      id: "bas_s1", name: "Nimmu House Ladakh (Heritage Hotel)", type: "resort", stars: 5,
      avgPricePerNight: 9500, town: "Nimmu (near Basgo)", contact: "+91-98108-98444",
      bookingUrl: "https://www.nimmu-house.com",
      amenities: ["Restored Royal Ladakhi House", "Organic Orchard Garden", "Luxury Tents", "Yoga Deck", "Gourmet Dining"],
      notes: "Stunning 100-year-old heritage boutique hotel set in a 1-acre apricot and walnut orchard, 8 km from Basgo Gompa.",
    },
    {
      id: "bas_s2", name: "Basgo Heritage Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1800, town: "Basgo Village", contact: "+91-94198-02319",
      bookingUrl: "https://www.google.com/search?q=Basgo+Homestay",
      amenities: ["Traditional Ladakhi Kitchen", "Bukhari Heating", "Citadel View Rooftop", "Hot Water"],
      notes: "Centuries-old mud-brick village home situated right beneath the Basgo citadel fortress.",
    },
    {
      id: "bas_s3", name: "Sham Valley Camp & Cottages", type: "camp", stars: 3,
      avgPricePerNight: 2600, town: "Saspol / Basgo Road", contact: "+91-94191-78901",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Ladakh",
      amenities: ["Valley River Views", "Swiss Tents", "Buffet Breakfast", "Free Parking"],
      notes: "Riverside camp located along the Indus highway, ideal base for exploring Basgo, Likir, and Alchi.",
    },
  ],

  "chumathang-4-days": [
    {
      id: "chu_s1", name: "Chumathang Hot Spring Resort", type: "resort", stars: 3,
      avgPricePerNight: 2800, town: "Chumathang Riverbank", contact: "+91-94191-78220",
      bookingUrl: "https://www.google.com/search?q=Chumathang+Hot+Spring+Resort",
      amenities: ["Natural Geothermal Bathrooms", "Geothermally Heated Rooms", "Indus View", "In-House Restaurant"],
      notes: "Direct access to private piping-hot sulfur spring baths pumped straight from the riverbank springs into guest rooms.",
    },
    {
      id: "chu_s2", name: "Indus Valley Tourist Guest House", type: "guesthouse", stars: 2,
      avgPricePerNight: 1500, town: "Chumathang Village", contact: "+91-94198-33410",
      bookingUrl: "https://www.google.com/search?q=Chumathang+Guest+House",
      amenities: ["Hot Spring Water", "Basic Ladakhi Dining", "Blankets", "Bicycle Rental"],
      notes: "Budget friendly stopover along the Changthang highway, heavily favored by photographers and motorbikers.",
    },
    {
      id: "chu_s3", name: "Mahe Eco Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 1800, town: "Mahe Bridge (near Chumathang)", contact: "+91-94692-10874",
      bookingUrl: "https://www.google.com/search?q=Mahe+Homestay+Ladakh",
      amenities: ["Riverside Orchard", "Home Cooked Thukpa", "Solar Hot Water", "Stargazing"],
      notes: "Warm Changpa family retreat near the scenic Mahe bridge gateway to Tso Moriri and Hanle.",
    },
  ],

  "hanle-5-days": [
    {
      id: "han_s1", name: "Padma Homestay & Observatory Lodge", type: "homestay", stars: 3,
      avgPricePerNight: 2200, town: "Hanle Khaldo", contact: "+91-94692-24302",
      bookingUrl: "https://www.google.com/search?q=Padma+Homestay+Hanle",
      amenities: ["Observatory View", "Telescope Deck", "Warm Bukhari Heating", "Home Cooked Meals", "Solar Battery Power"],
      notes: "Legendary pioneer homestay of Hanle, hosted by Padma and his family who assist astrophotographers and telescope crews.",
    },
    {
      id: "han_s2", name: "Siddharth Homestay & Stargazer Camp", type: "homestay", stars: 3,
      avgPricePerNight: 2400, town: "Hanle Village", contact: "+91-94198-90123",
      bookingUrl: "https://www.google.com/search?q=Siddharth+Homestay+Hanle",
      amenities: ["Clear Dark Sky Horizon", "Electric Blankets", "24hr Hot Water", "Oxygen Cylinder On Request"],
      notes: "Positioned directly on the vast Hanle plain with 360-degree unobstructed horizon view for Milky Way shooting.",
    },
    {
      id: "han_s3", name: "Hanle Astro-Resort & Swiss Tents", type: "camp", stars: 4,
      avgPricePerNight: 4200, town: "Hanle Plains", contact: "+91-98711-22900",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Hanle",
      amenities: ["Insulated Geodesic Domes", "Astro-Telescope Sessions", "Buffet Dining", "Oxygen Concentrators"],
      notes: "Modern dark-sky glamping domes with skylight windows allowing you to watch the stars right from your bed.",
    },
  ],
  "kuldhara-4-days": [
    {
      id: "kul_s1", name: "Suryagarh Jaisalmer", type: "resort", stars: 5,
      avgPricePerNight: 16000, town: "Sam Road (near Kuldhara)", contact: "+91-2992-269269",
      bookingUrl: "https://www.suryagarh.com",
      amenities: ["Thar Fortress Architecture","Rait Spa","Chudail Trail Night Safari","Heated Pool","Fine Dining"],
      notes: "Spectacular golden stone palace fortress offering bespoke midnight expeditions into Kuldhara ghost village.",
    },
    {
      id: "kul_s2", name: "Desert Springs Luxury Camp", type: "camp", stars: 3,
      avgPricePerNight: 3200, town: "Kuldhara Road, Sam", contact: "+91-98290-77612",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Jaisalmer",
      amenities: ["Swiss Glamping Tents","Camel Safari","Kalbelia Folk Dance","Bonfire Dinners"],
      notes: "Comfortable desert tents set on rolling sand dunes just 10 minutes drive from the abandoned village ruins.",
    },
    {
      id: "kul_s3", name: "Kuldhara Heritage Village Camp", type: "homestay", stars: 3,
      avgPricePerNight: 1900, town: "Kuldhara Village Gate", contact: "+91-94141-89021",
      bookingUrl: "https://www.google.com/search?q=Kuldhara+Camps",
      amenities: ["Mud-Brick Huts","Stargazing","Desi Ghee Home Meals","Free Parking"],
      notes: "Rustic mud huts built in traditional Paliwal architectural style near the ancient stepwell and temple.",
    },
  ],

  "narlai-4-days": [
    {
      id: "nar_s1", name: "Rawla Narlai Heritage Resort", type: "resort", stars: 5,
      avgPricePerNight: 9500, town: "Narlai Village, Pali", contact: "+91-2934-260443",
      bookingUrl: "https://www.rawlanarlai.com",
      amenities: ["17th-Century Hunting Lodge","Stepwell Dinner at Baoli","Leopard Safari","Swimming Pool","Ayurvedic Spa"],
      notes: "Exquisite restored royal retreat nestled beneath Elephant Rock monolith, famous for candlelit 110-lamp stepwell feasts.",
    },
    {
      id: "nar_s2", name: "Dadhikar Aravalli Homestay Narlai", type: "homestay", stars: 3,
      avgPricePerNight: 2400, town: "Narlai Old Quarter", contact: "+91-98291-33201",
      bookingUrl: "https://www.airbnb.co.in/s/Narlai/homes",
      amenities: ["Courtyard Haveli","Home Cooked Mewari Food","Village Walks","Mountain Views"],
      notes: "Charming family-run mansion with carved stone pillars and open terraces facing the surrounding granite crags.",
    },
    {
      id: "nar_s3", name: "Elephant Rock Safari Camp", type: "camp", stars: 3,
      avgPricePerNight: 2800, town: "Foot of Elephant Rock, Narlai", contact: "+91-94142-65410",
      bookingUrl: "https://www.google.com/search?q=Narlai+Safari+Camp",
      amenities: ["Safari Tents","Rock Climbing Assistance","Campfire","Stargazing"],
      notes: "Glamping tents situated directly at the base of the massive granite dome with early morning trek access.",
    },
  ],

  "khimsar-4-days": [
    {
      id: "khi_s1", name: "Welcomhotel by ITC Hotels Khimsar Fort", type: "resort", stars: 5,
      avgPricePerNight: 11000, town: "Khimsar, Nagaur", contact: "+91-1585-262345",
      bookingUrl: "https://www.itchotels.com",
      amenities: ["16th-Century Battlements","Rampart Swimming Pool","Peacock Gardens","Royal Heritage Suites","Bar & Spa"],
      notes: "Sprawling 11-acre fortress built in 1523 AD with cannon towers, royal courtyards, and war memorabilia museum.",
    },
    {
      id: "khi_s2", name: "Khimsar Dunes Village", type: "resort", stars: 4,
      avgPricePerNight: 7500, town: "Khimsar Sand Dunes", contact: "+91-1585-262345",
      bookingUrl: "https://www.itchotels.com",
      amenities: ["Isolated Eco Thatched Huts","Oasis Lake Views","Camel & Jeep Dunes Safari","Open Sky Dining"],
      notes: "Accessible only by 4WD or camel cart, this secluded sanctuary features luxury circular huts around a desert lake.",
    },
    {
      id: "khi_s3", name: "Desert Haveli Heritage Khimsar", type: "hotel", stars: 3,
      avgPricePerNight: 2800, town: "Khimsar Town Bypass", contact: "+91-94144-88902",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Khimsar",
      amenities: ["Carved Sandstone Balconies","Rooftop Restaurant","Rajasthani Dining","Free Parking"],
      notes: "Traditional Rajasthani haveli offering comfortable budget accommodation right across from the fort entrance.",
    },
  ],

  "bhangarh-4-days": [
    {
      id: "bha_s1", name: "Umaid Lake Palace Resort", type: "resort", stars: 4,
      avgPricePerNight: 4800, town: "Kalakho, Dausa (near Bhangarh)", contact: "+91-97999-36888",
      bookingUrl: "https://www.umaidlakepalace.com",
      amenities: ["Organic Farmland","Swimming Pool","Vintage Jeep Tours","Royal Marwari Dining","Lakeside Walks"],
      notes: "Sprawling heritage countryside estate located midway between Bhangarh ruins and the Chand Baori stepwell.",
    },
    {
      id: "bha_s2", name: "Sariska Tiger Camp Resort", type: "resort", stars: 4,
      avgPricePerNight: 5200, town: "Thanagazi, Alwar Road", contact: "+91-1465-224823",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Sariska",
      amenities: ["Safari Booking Desk","Aravalli Hill View Cottages","Pool","Bonfire Nights"],
      notes: "Ideal dual-base for exploring both Bhangarh Fort (25 km away) and Sariska Tiger Reserve morning safaris.",
    },
    {
      id: "bha_s3", name: "Fort View Guesthouse Gola ka Baas", type: "guesthouse", stars: 2,
      avgPricePerNight: 1600, town: "Gola ka Baas (near Bhangarh)", contact: "+91-98294-11209",
      bookingUrl: "https://www.google.com/search?q=Bhangarh+Guesthouse",
      amenities: ["Village Setting","Home Cooked Meals","Parking","Geyser"],
      notes: "Simple rural family guesthouse just 6 km from Bhangarh Fort, convenient for early morning photography.",
    },
  ],

  "bishnoi-villages-3-days": [
    {
      id: "bis_s1", name: "Bishnoi Village Camp and Resort", type: "resort", stars: 3,
      avgPricePerNight: 2800, town: "Guda Bishnoiyan, Jodhpur", contact: "+91-98280-31207",
      bookingUrl: "https://www.bishnoivillage.com",
      amenities: ["Traditional Thatched Huts (Jhopas)","Wildlife Safari Desk","Blackbuck Sighting","Folk Dance"],
      notes: "Authentic desert village resort nestled in the heart of Guda Bishnoiyan with frequent blackbuck sightings on lawns.",
    },
    {
      id: "bis_s2", name: "Chhotaram Prajapat's Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 2200, town: "Salawas Village, Jodhpur", contact: "+91-94147-20724",
      bookingUrl: "https://www.airbnb.co.in/s/Salawas/homes",
      amenities: ["Prajapat Family Hospitality","Durry Weaving Workshops","Organic Home Meals","Mud Cottages"],
      notes: "World-renowned award-winning homestay offering immersive cultural experiences with traditional potter-weaver families.",
    },
    {
      id: "bis_s3", name: "Rohet Garh Heritage Palace", type: "resort", stars: 5,
      avgPricePerNight: 8500, town: "Rohet (near Bishnoi belt)", contact: "+91-2938-268231",
      bookingUrl: "https://www.rohetgarh.com",
      amenities: ["17th-Century Fortified Mansion","Pioneers of Bishnoi Village Safari","Equestrian Center","Lake Pool"],
      notes: "Legendary luxury heritage haven whose royal family pioneered respectful rural Bishnoi community safaris.",
    },
  ],

  "dholavira-4-days": [
    {
      id: "dho_s1", name: "Dholavira Tourism Resort", type: "resort", stars: 3,
      avgPricePerNight: 3500, town: "Dholavira, Khadir Bet", contact: "+91-97277-50607",
      bookingUrl: "https://www.dholaviratourismresort.com",
      amenities: ["Traditional Bhunga Mud Cottages","White Rann Excursions","Kutchi Thali Included","Air Conditioned"],
      notes: "Authentic Kutchi circular Bhungas featuring intricate mud and mirror Lipan work, 5 minutes from Harappan ruins.",
    },
    {
      id: "dho_s2", name: "Rann Resort Dholavira", type: "resort", stars: 3,
      avgPricePerNight: 4200, town: "Archaeological Road, Khadir Island", contact: "+91-94287-66551",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Dholavira",
      amenities: ["Luxury Bhungas","Flamingo Sanctuary Tour Desk","Cultural Music Nights","Buffet Dining"],
      notes: "Comfortable resort perched on the edge of the salt flats, renowned for sunset safaris and star-watching.",
    },
    {
      id: "dho_s3", name: "Toran Tourist Complex Dholavira", type: "guesthouse", stars: 2,
      avgPricePerNight: 1800, town: "Archaeological Survey Gate", contact: "+91-2832-250000",
      bookingUrl: "https://gujarattourism.com",
      amenities: ["Government Guest House","Direct Site Access","Vegetarian Dining Hall","Parking"],
      notes: "Gujarat Tourism rest house located directly adjacent to the UNESCO World Heritage excavation and museum.",
    },
  ],

  "mandvi-4-days": [
    {
      id: "man_s1", name: "Serena Beach Resort Mandvi", type: "resort", stars: 5,
      avgPricePerNight: 8500, town: "Nani Khakhar Beach, Mandvi", contact: "+91-2834-290000",
      bookingUrl: "https://www.serenabeachresort.com",
      amenities: ["Private White Sand Beach","Infinity Pool","Luxury Villas","Water Sports","Seafood Restaurant"],
      notes: "Premier coastal luxury resort on the Arabian Sea with sprawling manicured palms and private beach access.",
    },
    {
      id: "man_s2", name: "Vijay Vilas Heritage Camp", type: "resort", stars: 4,
      avgPricePerNight: 5500, town: "Vijay Vilas Palace Estate", contact: "+91-98252-25956",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Mandvi",
      amenities: ["Palace Beach Access","Swiss Tents & Cottages","Orchard Lawns","Birdwatching Haven"],
      notes: "Exclusive accommodations set within the private estate gardens of the iconic red sandstone Vijay Vilas Palace.",
    },
    {
      id: "man_s3", name: "Hotel Sea View Mandvi", type: "hotel", stars: 3,
      avgPricePerNight: 2200, town: "Topansar Lake Road, Mandvi", contact: "+91-2834-222888",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Mandvi",
      amenities: ["Shipbuilding Wharf Proximity","AC Rooms","Vegetarian & Seafood Dining","Free Wi-Fi"],
      notes: "Convenient central hotel located walking distance from the historic wooden dhow shipyards along Rukmavati river.",
    },
  ],

  "poshina-3-days": [
    {
      id: "pos_s1", name: "Darbargadh Poshina Heritage Hotel", type: "resort", stars: 4,
      avgPricePerNight: 5800, town: "Poshina, Sabarkantha", contact: "+91-2775-283424",
      bookingUrl: "https://www.darbargadhposhina.com",
      amenities: ["Restored Royal Palace","Courtyards & Arches","Tribal Village Safari Desk","Traditional Royal Banquets"],
      notes: "Historic 15th-century palace fortress hosted by royal family descendants who personally guide tribal village tours.",
    },
    {
      id: "pos_s2", name: "Poshina Safari Homestay", type: "homestay", stars: 3,
      avgPricePerNight: 2200, town: "Terracotta Shrine Road, Poshina", contact: "+91-94263-88120",
      bookingUrl: "https://www.google.com/search?q=Poshina+Homestay",
      amenities: ["Garasia Village Setting","Pottery Making Workshops","Home Cooked Food","Local Guides"],
      notes: "Warm rural retreat near the sacred grove filled with thousands of terracotta horse offerings.",
    },
    {
      id: "pos_s3", name: "Aravalli Hills Nature Retreat", type: "resort", stars: 3,
      avgPricePerNight: 2600, town: "Himatnagar-Poshina Border", contact: "+91-98791-44021",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Gujarat",
      amenities: ["Garden Cottages","Vegetarian Restaurant","Bonfire","Hill Views"],
      notes: "Scenic border stop nestled among the rolling granite outcroppings of the southern Aravalli hills.",
    },
  ],

  "champaner-pavagadh-3-days": [
    {
      id: "cha_s1", name: "Champaner Heritage Resort", type: "resort", stars: 4,
      avgPricePerNight: 6200, town: "Halol, Vadodara Highway", contact: "+91-98240-33290",
      bookingUrl: "https://www.champanerheritageresort.com",
      amenities: ["Mango & Guava Orchards","Heritage Architecture","Swimming Pool","UNESCO Tour Guides"],
      notes: "Tranquil luxury resort set in 50 acres of fruit orchards, 10 minutes from the Jami Masjid UNESCO monuments.",
    },
    {
      id: "cha_s2", name: "Toran Hotel Pavagadh", type: "guesthouse", stars: 2,
      avgPricePerNight: 1800, town: "Manchi, Pavagadh Base", contact: "+91-2676-245623",
      bookingUrl: "https://gujarattourism.com",
      amenities: ["Ropeway Proximity","Vegetarian Dining Hall","Clean AC Rooms","Pilgrim Desk"],
      notes: "Official Gujarat Tourism lodge positioned right at the cable car terminal ascending to the Kalika Mata summit.",
    },
    {
      id: "cha_s3", name: "Vananchal Jungle Resort Jambughoda", type: "resort", stars: 3,
      avgPricePerNight: 3200, town: "Jambughoda Wildlife Sanctuary", contact: "+91-98795-66700",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Vadodara",
      amenities: ["Forest Cottages","Teak Canopy","Pool","Birdwatching Safari Desk"],
      notes: "Eco-resort nestled in the teak forests of Jambughoda Wildlife Sanctuary, 18 km from Champaner ruins.",
    },
  ],

  "palitana-3-days": [
    {
      id: "pal_s1", name: "Hotel Shetrunjay Palitana", type: "hotel", stars: 3,
      avgPricePerNight: 2500, town: "Taleti Road, Palitana", contact: "+91-2848-252123",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Palitana",
      amenities: ["Pilgrim Friendly","Satvik Jain Dining","Early 4 AM Wake-Up Calls","AC Rooms"],
      notes: "Clean, comfortable hotel located 800 meters from the Shatrunjaya hill climb starting point (Taleti).",
    },
    {
      id: "pal_s2", name: "Toran Tourist Bungalow Palitana", type: "guesthouse", stars: 2,
      avgPricePerNight: 1600, town: "Gariadhar Road, Palitana", contact: "+91-2848-252421",
      bookingUrl: "https://gujarattourism.com",
      amenities: ["Gujarat Tourism Run","Spacious Lawns","Jain Bhojanalaya Access","Free Parking"],
      notes: "Government heritage property offering tranquil garden cottages catering to pilgrims and heritage travelers.",
    },
    {
      id: "pal_s3", name: "Vijay Vilas Palace Adpur Palitana", type: "hotel", stars: 3,
      avgPricePerNight: 4200, town: "Adpur Village, Palitana", contact: "+91-2848-252002",
      bookingUrl: "https://www.google.com/search?q=Vijay+Vilas+Adpur+Palitana",
      amenities: ["Panoramic Shatrunjaya Hill View","Country Palace Heritage","Pure Vegetarian Kitchen","Spacious Suites"],
      notes: "Scenic royal country seat perched on a hillock overlooking the glistening white Jain temples of Shatrunjaya.",
    },
  ],

  "varanasi-ayodhya-prayagraj-5-days": [
    {
      id: "vap_s1", name: "BrijRama Palace Varanasi (Heritage Grand)", type: "hotel", stars: 5,
      avgPricePerNight: 18500, town: "Darbhanga Ghat, Varanasi", contact: "+91-542-2450840",
      bookingUrl: "https://www.brijhotels.com/brijrama-palace-varanasi/",
      amenities: ["Direct Ghat Access", "Private Bajra Boat", "Live Classical Sitar", "Pure Vegetarian Fine Dining", "Ayurvedic Spa"],
      notes: "One of the oldest landmark structures on Varanasi's ghats (1812 AD). Accessible only by private river boat. Unmatched balcony vistas of the sunrise Ganga Aarti and floating lamps.",
    },
    {
      id: "vap_s2", name: "Hotel Surya, Kaiser Palace Varanasi", type: "hotel", stars: 4,
      avgPricePerNight: 4800, town: "The Mall, Cantonment, Varanasi", contact: "+91-542-2508466",
      bookingUrl: "https://www.hotelsuryavns.com/",
      amenities: ["Palatial Lawns", "Swimming Pool", "Heritage Architecture", "Cantonment Tranquility", "Multi-Cuisine Dining"],
      notes: "19th-century royal palace of King of Nepal. Set amid lush manicured gardens away from city congestion, offering a serene luxury sanctuary after temple walks.",
    },
    {
      id: "vap_s3", name: "The Legend Hotel Prayagraj", type: "hotel", stars: 4,
      avgPricePerNight: 4200, town: "Civil Lines, Prayagraj", contact: "+91-532-2409999",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Prayagraj",
      amenities: ["Central Civil Lines Location", "Fine Dining Restaurant", "Wi-Fi", "Travel Desk for Sangam Boats", "Airport Shuttle"],
      notes: "Premier boutique hotel in the heart of Prayagraj's colonial Civil Lines. Excellent concierge service arranging authorized motorboat trips to Triveni Sangam.",
    },
    {
      id: "vap_s4", name: "Hotel Kanha Shyam Prayagraj", type: "hotel", stars: 4,
      avgPricePerNight: 5200, town: "Civil Lines, Prayagraj", contact: "+91-532-2560123",
      bookingUrl: "https://www.hotelkanhashyam.com/",
      amenities: ["Vegetarian Specialty Dining", "Executive Suites", "Fitness Center", "Complimentary Breakfast", "Valet Parking"],
      notes: "A trusted luxury choice for pilgrims and dignitaries, featuring authentic Awadhi and North Indian cuisine just 15 minutes from the sacred Sangam.",
    },
    {
      id: "vap_s5", name: "The Ramayana Hotel Ayodhya", type: "hotel", stars: 4,
      avgPricePerNight: 6500, town: "Maniyarkot, Ayodhya", contact: "+91-5278-297777",
      bookingUrl: "https://www.theramayanahotel.com/",
      amenities: ["10 Mins from Ram Janmabhoomi", "Pure Vegetarian Satvik Kitchen", "Spiritual Ambiance", "Travel Desk", "EV Charging Station"],
      notes: "Upscale modern luxury hotel themed around the Ramayana epic. Offers smooth VIP darshan facilitation and temple shuttle services.",
    },
    {
      id: "vap_s6", name: "Royal Heritage Hotel & Resort Ayodhya", type: "hotel", stars: 3,
      avgPricePerNight: 3800, town: "Ayodhya Bypass Road, Ayodhya", contact: "+91-5278-232323",
      bookingUrl: "https://www.makemytrip.com/hotels/hotel-listing/?searchText=Ayodhya",
      amenities: ["Spacious Garden Lawns", "AC Cottages", "Vegetarian Dining", "Ample Parking", "24x7 Hot Water"],
      notes: "Peaceful resort located near Saryu River bridge and Ram Ki Paidi, ideal for families and elderly travelers.",
    },
  ],
};

export const DEFAULT_STAYS: HotelSuggestion[] = [
  {
    id: "def1", name: "Heritage Homestay & Resort", type: "homestay", stars: 3,
    avgPricePerNight: 2500, town: "Destination Center",
    notes: "Locally recommended accommodation with scenic views and authentic regional hospitality.",
    amenities: ["Wi-Fi", "Hot Water", "Home-Cooked Meals", "Parking"],
  },
];
