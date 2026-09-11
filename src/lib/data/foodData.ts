import type { FoodSpot } from "../types";

export const FOOD_DATA: Record<string, FoodSpot[]> = {
  "leh-ladakh-9-days": [
    {
      id: "ll_f1", name: "The Tibetan Kitchen, Leh", type: "restaurant", town: "Leh Market",
      mustTry: ["Thukpa (Tibetan noodle soup)", "Momos", "Skyu (Ladakhi pasta stew)", "Butter Tea"],
      priceRange: "₹₹", isVeg: false,
      notes: "Best Tibetan restaurant in Leh — warm interior, generous portions. Try the yak stew on cold evenings. Located on the upper main bazaar road.",
    },
    {
      id: "ll_f2", name: "Bon Appétit, Leh", type: "restaurant", town: "Fort Road, Leh",
      mustTry: ["Yak Steak", "Trout Fish Curry", "Ladakhi Thali", "Chhang (barley beer)"],
      priceRange: "₹₹", isVeg: false,
      notes: "The most popular multi-cuisine restaurant in Leh among Indian and foreign travellers. Rooftop seating with fort views. Ideal for celebration dinners.",
    },
    {
      id: "ll_f3", name: "Thiksey Monastery Café", type: "cafe", town: "Thiksey Monastery",
      mustTry: ["Tibetan Bread with Butter", "Hot Porridge", "Butter Tea", "Thukpa"],
      priceRange: "₹", isVeg: true,
      notes: "Monastery-run café with sweeping Indus Valley views. Best at 9 AM after the morning puja. A deeply calming breakfast experience before the monastery circuit.",
    },
    {
      id: "ll_f4", name: "Dzomsa Restaurant, Alchi", type: "cafe", town: "Alchi Monastery, Sham Valley",
      mustTry: ["Apricot Jam Tarts", "Butter Tea", "Fresh Local Bread", "Apricot Juice"],
      priceRange: "₹", isVeg: true,
      notes: "Monastery cooperative restaurant — proceeds support local monks. The apricot tarts are legendary. Only open in summer season (May–September).",
    },
    {
      id: "ll_f5", name: "Diskit Dhaba, Nubra Valley", type: "dhaba", town: "Diskit, Nubra Valley",
      mustTry: ["Dal Chawal", "Aloo Paratha", "Fresh Chai", "Tsampa Porridge"],
      priceRange: "₹", isVeg: true,
      notes: "First proper meal stop after descending from Khardung La. Simple roadside dhaba; best to arrive by 1 PM as food runs out early. Also sells basic supplies.",
    },
    {
      id: "ll_f6", name: "Hunder Camp Kitchen, Nubra", type: "homestay-kitchen", town: "Hunder, Nubra Valley",
      mustTry: ["Trout Fish Fry (local Nubra river)", "Yak Cheese", "Balti Apricot Soup", "Dried Apricots"],
      priceRange: "₹", isVeg: false,
      notes: "Most camps in Hunder serve dinner in-house. Ask specifically for Balti cuisine — the dried apricot soup is unique to Nubra. Best eaten under an open sky with Karakoram views.",
    },
    {
      id: "ll_f7", name: "Pangong Tso Shore Café", type: "cafe", town: "Spangmik, Pangong Tso",
      mustTry: ["Instant Maggi Noodles at 4,350m", "Tsampa Porridge", "Butter Tea", "Hot Soup"],
      priceRange: "₹", isVeg: true,
      notes: "There are no restaurants at Pangong — all food is from small lakeside makeshift stalls/cafés. Maggi, tea, and tsampa are the staples. Carry snacks as an insurance.",
    },
  ],
  "jyotirlinga-pilgrimage-road-trip": [
    {
      id: "jy_f1", name: "Madhurima Dhaba, Bhimashankar", type: "dhaba", town: "Bhimashankar",
      mustTry: ["Maharashtrian Thali", "Sol Kadhi", "Jowar Bhakri"],
      priceRange: "₹", isVeg: true,
      notes: "Simple post-darshan thali spot near the temple; best reached by 1 PM.",
    },
    {
      id: "jy_f2", name: "Madhav's Kitchen, Trimbakeshwar", type: "restaurant", town: "Trimbakeshwar, Nashik",
      mustTry: ["Pithla Bhakri", "Buttermilk", "Varan Bhat"],
      priceRange: "₹", isVeg: true,
      notes: "Vegetarian only; a warm family kitchen steps from the Godavari ghat.",
    },
    {
      id: "jy_f3", name: "Maharaj Dhaba, Ellora", type: "dhaba", town: "Ellora, Aurangabad",
      mustTry: ["Zunka Bhakar", "Ambadi Sabzi", "Fresh Lassi"],
      priceRange: "₹", isVeg: true,
      notes: "Rustic dhaba with protein-rich Vidarbha cuisine; perfect fuel before the cave tour.",
    },
    {
      id: "jy_f4", name: "Madhurima Veg Restaurant, Ujjain", type: "restaurant", town: "Ujjain",
      mustTry: ["Ujjaini Poha", "Bhutte ki Kees", "Malpua"],
      priceRange: "₹", isVeg: true,
      notes: "Ujjain's iconic breakfast; arrive at dawn after the Bhasma Aarti.",
    },
    {
      id: "jy_f5", name: "Omkareshwar Rasoi", type: "homestay-kitchen", town: "Omkareshwar",
      mustTry: ["Dal Bati Churma", "Malwa Thali", "Coconut Water"],
      priceRange: "₹", isVeg: true,
      notes: "Traditional Malwa thali served riverside; deeply satisfying after the boat puja.",
    },
    {
      id: "jy_f6", name: "Shipra Ghat Tea Stalls", type: "street-food", town: "Ujjain Ghats",
      mustTry: ["Kesar Masala Chai", "Bun Maska", "Tikki Chaat"],
      priceRange: "₹", isVeg: true,
      notes: "Evening chai ritual at the Shipra ghat after the Sandhya Aarti — unmissable.",
    },
  ],
  "spiti-valley": [
    {
      id: "f1", name: "Sichuan Kitchen, Kaza", type: "restaurant", town: "Kaza",
      mustTry: ["Thukpa (Tibetan noodle soup)", "Momos", "Butter Tea"],
      priceRange: "₹", isVeg: false,
      notes: "Popular spot with trekkers; warming food at altitude.",
    },
    {
      id: "f2", name: "Sakya Cafe, Kaza", type: "cafe", town: "Kaza",
      mustTry: ["Tibetan Bread with Yak Butter", "Apple Juice", "Tsampa Porridge"],
      priceRange: "₹", isVeg: true,
      notes: "Tiny café run by a monastery — proceeds support local monks.",
    },
    {
      id: "f3", name: "Spitian Homestay Kitchen", type: "homestay-kitchen", town: "Kibber / Langza",
      mustTry: ["Chhurpe (dried yak cheese)", "Paba (barley bread)", "Chang (local barley wine)"],
      priceRange: "₹", isVeg: false,
      notes: "Authentic Spitian cuisine not found in restaurants.",
    },
    {
      id: "f4", name: "Himalayan Dhaba, Losar", type: "dhaba", town: "Losar",
      mustTry: ["Dal Chawal", "Aloo Paratha", "Chai"],
      priceRange: "₹", isVeg: true,
      notes: "Only dhaba for 50 km — essential lunch stop.",
    },
  ],
  "mysore-coorg-wayanad-ooty": [
    {
      id: "mc_f1", name: "Dasaprakash, Mysore", type: "restaurant", town: "Mysore",
      mustTry: ["Mysore Masala Dosa", "Filter Coffee", "Bisi Bele Bath"],
      priceRange: "₹", isVeg: true,
      notes: "Legendary vegetarian South Indian restaurant since 1918.",
    },
    {
      id: "mc_f2", name: "Coorg Coffee Estate Café", type: "cafe", town: "Madikeri, Coorg",
      mustTry: ["Estate-grown Pour Over Coffee", "Pork Curry", "Coorg Akki Rotti"],
      priceRange: "₹₹", isVeg: false,
    },
    {
      id: "mc_f3", name: "Wayanad Tribal Cuisine", type: "homestay-kitchen", town: "Kalpetta, Wayanad",
      mustTry: ["Bamboo Rice Curry", "Wild Jackfruit Dish", "Black Pepper Chicken"],
      priceRange: "₹", isVeg: false,
      notes: "Arranged through tribal tourism initiative.",
    },
    {
      id: "mc_f4", name: "Hotel Vinayaka Mylari, Mysore", type: "restaurant", town: "Mysore",
      mustTry: ["Mylari Dosa", "Saagu Curry", "Filter Coffee"],
      priceRange: "₹", isVeg: true,
      notes: "Cult dosa spot — opens only until noon, so go early!",
    },
  ],
  "rajasthan-desert-kingdom": [
    {
      id: "rd_f1", name: "Trio Restaurant, Jaisalmer", type: "restaurant", town: "Jaisalmer",
      mustTry: ["Laal Maas", "Dal Baati Churma", "Ker Sangri"],
      priceRange: "₹₹", isVeg: false,
      notes: "Rooftop views of Jaisalmer Fort — go at sunset.",
    },
    {
      id: "rd_f2", name: "Sonu's Dhaba, Pushkar", type: "dhaba", town: "Pushkar",
      mustTry: ["Mawa Kachori", "Ghevar", "Lassi"],
      priceRange: "₹", isVeg: true,
    },
    {
      id: "rd_f3", name: "Ambrai Ghat Restaurant, Udaipur", type: "restaurant", town: "Udaipur",
      mustTry: ["Gatte ki Sabzi", "Daal Bati", "Makhani Paneer"],
      priceRange: "₹₹₹", isVeg: true,
      notes: "Best lakeside setting in Udaipur — book ahead for dinner.",
    },
  ],
  "goa-beyond-beaches": [
    {
      id: "ga_f1", name: "Ritz Classic, Panaji", type: "restaurant", town: "Panaji",
      mustTry: ["Prawn Balchão", "Fish Curry Rice", "Bebinca"],
      priceRange: "₹₹", isVeg: false,
      notes: "Old-school Goan institution; try the prawns.",
    },
    {
      id: "ga_f2", name: "Fisherman's Wharf", type: "restaurant", town: "Cavelossim, South Goa",
      mustTry: ["King Crab Masala", "Clam Soup", "Feni"],
      priceRange: "₹₹₹", isVeg: false,
    },
    {
      id: "ga_f3", name: "Curlies Beach Shack", type: "street-food", town: "Anjuna, North Goa",
      mustTry: ["Grilled Fish Tikka", "Goan Sausage Pav", "Cashew Feni Cocktail"],
      priceRange: "₹₹", isVeg: false,
    },
  ],
  "sikkim-7-days": [
    {
      id: "sk_f1", name: "The Dragon Wok, Gangtok", type: "restaurant", town: "Gangtok",
      mustTry: ["Gyathuk (noodle soup)", "Phagshapa (dried pork)", "Chhurpi Soup"],
      priceRange: "₹", isVeg: false,
    },
    {
      id: "sk_f2", name: "MG Marg Street Stalls", type: "street-food", town: "Gangtok",
      mustTry: ["Sel Roti", "Wai Wai Noodle Chat", "Momos"],
      priceRange: "₹", isVeg: false,
    },
  ],
  "meghalaya-5-days": [
    {
      id: "mg_f1", name: "City Hut Dhaba, Shillong", type: "dhaba", town: "Shillong",
      mustTry: ["Jadoh (rice and pork)", "Dohneiiong", "Kwai (betel nut)"],
      priceRange: "₹", isVeg: false,
      notes: "Khasi tribal cuisine — one of the best in Shillong.",
    },
    {
      id: "mg_f2", name: "Cherrapunji Homestay Kitchen", type: "homestay-kitchen", town: "Cherrapunji",
      mustTry: ["Nakham Bitchi (dried fish chutney)", "Putharo (rice cake)", "Local Honey"],
      priceRange: "₹",
    },
  ],
  "kerala-7-days": [
    {
      id: "kl_f1", name: "Houseboat Kitchen", type: "homestay-kitchen", town: "Alleppey Backwaters",
      mustTry: ["Karimeen Pollichathu (Pearl Spot Fish)", "Prawn Moilee", "Appam with Stew"],
      priceRange: "₹₹", isVeg: false,
      notes: "Cooked fresh on the houseboat by your chef.",
    },
    {
      id: "kl_f2", name: "Shri Krishna Cafe, Fort Kochi", type: "restaurant", town: "Fort Kochi",
      mustTry: ["Kerala Prawn Curry", "Puttu Kadala", "Coconut Payasam"],
      priceRange: "₹", isVeg: false,
    },
  ],
  "munsiyari-6-days": [
    {
      id: "mn_f1", name: "Local Bhojanalaya, Munsiyari", type: "dhaba", town: "Munsiyari",
      mustTry: ["Aloo Ke Gutke", "Bal Mithai", "Bhatt ki Dal"],
      priceRange: "₹", isVeg: true,
      notes: "Kumaoni staple dishes — incredibly satisfying after a trek.",
    },
    {
      id: "mn_f2", name: "Pandey Restaurant & Sweet Centre", type: "restaurant", town: "Munsiyari Main Bazaar",
      mustTry: ["Bhatt Ki Churkani", "Fresh Jhangora Kheer", "Piping Hot Thukpa"],
      priceRange: "₹", isVeg: true,
      notes: "Beloved local kitchen serving authentic Himalayan comfort food and fresh Bal Mithai.",
    },
    {
      id: "mn_f3", name: "Milan Dhaba & Himalayan Cafe", type: "dhaba", town: "Munsiyari",
      mustTry: ["Madua (Finger Millet) Roti", "Pahadi Rajma", "Bhang Ki Chutney"],
      priceRange: "₹", isVeg: true,
      notes: "Hearty traditional Kumaoni thali with magnificent Panchachuli peak vistas.",
    },
  ],
  "char-dham-yatra-uttarakhand": [
    {
      id: "cd_f1", name: "Prasad Bhandara (Temple)", type: "restaurant", town: "Kedarnath / Badrinath",
      mustTry: ["Temple Prasad", "Chana Dal", "Poori Sabzi"],
      priceRange: "₹", isVeg: true,
      notes: "Free langar (community meal) available at shrines.",
    },
    {
      id: "cd_f2", name: "Pahadi Dhaba, Guptkashi", type: "dhaba", town: "Guptkashi",
      mustTry: ["Gahat Ki Dal", "Mandua Roti", "Kafal Juice (seasonal)"],
      priceRange: "₹", isVeg: true,
    },
  ],
  "panch-kedar-trek-10-days": [
    {
      id: "pk_f1", name: "Trek Camp Kitchen", type: "homestay-kitchen", town: "Along Route",
      mustTry: ["Maggi at altitude", "Aloo Paratha", "Hot Kadha (herbal drink)"],
      priceRange: "₹", isVeg: true,
      notes: "Each campsite has basic cooking; budget ₹200-400/meal.",
    },
  ],
  "pune-konkan-coast-raigad": [
    {
      id: "pu_f1", name: "Aswad, Pune", type: "restaurant", town: "Pune",
      mustTry: ["Misal Pav", "Sabudana Vada", "Shrikhand"],
      priceRange: "₹", isVeg: true,
      notes: "Iconic Maharashtrian breakfast spot — always a queue.",
    },
    {
      id: "pu_f2", name: "Murud Beach Seafood Shacks", type: "street-food", town: "Murud-Janjira",
      mustTry: ["Surmai Fry (King Mackerel)", "Kolambi Fry (Prawns)", "Modak"],
      priceRange: "₹₹", isVeg: false,
      notes: "Fresh catch cooked right on the beach.",
    },
  ],

  // ── Destinations 14 to 65 ──────────────────────────────────────────────────
  "haridwar-rishikesh-3-days": [
    {
      id: "hr_f1", name: "Chotiwala Restaurant", type: "restaurant", town: "Swarg Ashram, Rishikesh",
      mustTry: ["Garhwali Thali", "Special Chotiwala Thali", "Gulab Jamun", "Lassi"],
      priceRange: "₹₹", isVeg: true,
      notes: "Iconic pure vegetarian landmark since 1958 near Ram Jhula. Famous mascot sitting outside.",
    },
    {
      id: "hr_f2", name: "Mohanji Puri Wale", type: "street-food", town: "Har Ki Pauri, Haridwar",
      mustTry: ["Crispy Hing Kachori", "Aloo Sabzi", "Suji Halwa", "Thandi Lassi"],
      priceRange: "₹", isVeg: true,
      notes: "Legendary breakfast institution near the main bathing ghats. Arrive before 10 AM for hot kachoris.",
    },
    {
      id: "hr_f3", name: "The Little Buddha Cafe", type: "cafe", town: "Laxman Jhula, Tapovan",
      mustTry: ["Wood-fired Pizza", "Tibetan Momos", "Fresh Fruit Smoothie Bowl", "Shakshuka"],
      priceRange: "₹₹", isVeg: true,
      notes: "Treehouse-style cafe with tree trunks inside and direct panoramic views of the turquoise Ganga.",
    },
    {
      id: "hr_f4", name: "Prakash Lok", type: "street-food", town: "Bada Bazar, Haridwar",
      mustTry: ["Rabdi Malpua", "Kulfi Falooda", "Matka Kesar Milk"],
      priceRange: "₹", isVeg: true,
      notes: "Centuries-old dessert destination in the heart of Haridwar's old bazaar.",
    },
  ],

  "nainital-jim-corbett-3-days": [
    {
      id: "nc_f1", name: "Sakley's Restaurant & Pastry Shop", type: "cafe", town: "Mallital, Nainital",
      mustTry: ["Roast Chicken Sizzler", "Apple Pie with Cream", "Hot Chocolate", "Chicken Pot Pie"],
      priceRange: "₹₹", isVeg: false,
      notes: "Classic mountain bakery and bistro operating since 1944. Cozy rustic interiors tucked away from the crowds.",
    },
    {
      id: "nc_f2", name: "Machan Restaurant Nainital", type: "restaurant", town: "The Mall, Nainital",
      mustTry: ["Kumaoni Thali", "Bhatt Ki Churdkani", "Aloo Ke Gutke", "Singhauri Sweet"],
      priceRange: "₹₹", isVeg: false,
      notes: "Popular lakefront restaurant serving traditional Uttarakhand Kumaoni fare alongside North Indian classics.",
    },
    {
      id: "nc_f3", name: "Sonam's Momo Stall", type: "street-food", town: "Tibetan Market, Nainital",
      mustTry: ["Mutton Momos", "Veg Steamed Momos with Fiery Red Chutney", "Thukpa"],
      priceRange: "₹", isVeg: false,
      notes: "Cult-favorite momo vendor in the bustling Tibetan market on Flats ground.",
    },
    {
      id: "nc_f4", name: "The Safari Grill Dhaba", type: "dhaba", town: "Ramnagar / Corbett Highway",
      mustTry: ["Kumaoni Pahadi Mutton", "Yellow Dal Tadka", "Fresh Tandoori Roti"],
      priceRange: "₹", isVeg: false,
      notes: "Highway stop favored by safari guides after early morning game drives in Corbett.",
    },
  ],

  "himachal-shimla-manali-dharamshala-dalhousie-5-days": [
    {
      id: "hp_f1", name: "Cafe 1947", type: "cafe", town: "Old Manali",
      mustTry: ["Trout Fish with Garlic Butter", "Wood-fired Pizza", "Nutella Crepes", "Ginger Lemon Tea"],
      priceRange: "₹₹", isVeg: false,
      notes: "Old Manali's oldest music cafe perched on the rushing Manalsu River with riverside wooden decks.",
    },
    {
      id: "hp_f2", name: "Wake & Bake Cafe", type: "cafe", town: "The Mall, Shimla",
      mustTry: ["French Crepes", "Organic Mountain Coffee", "Apple Cinnamon Pie", "Hummus Falafel"],
      priceRange: "₹₹", isVeg: true,
      notes: "Vibrant yellow rooftop cafe on Shimla Mall Road with hand-painted tables and valley views.",
    },
    {
      id: "hp_f3", name: "Tibet Kitchen", type: "restaurant", town: "Jogiwara Road, McLeod Ganj",
      mustTry: ["Shaphalay (Tibetan meat pie)", "Thenthuk (hand-pulled noodle soup)", "Tingmo Bread", "Steamed Momos"],
      priceRange: "₹₹", isVeg: false,
      notes: "Unmatched Tibetan and Bhutanese cuisine in McLeod Ganj. Crowded at dinner time, book early.",
    },
    {
      id: "hp_f4", name: "Kwality Restaurant Dalhousie", type: "restaurant", town: "Gandhi Chowk, Dalhousie",
      mustTry: ["Tandoori Trout", "Sizzling Brownie", "Dal Makhani", "Pahadi Chicken"],
      priceRange: "₹₹", isVeg: false,
      notes: "Heritage hill restaurant running since British times with wood-paneled walls and mountain views.",
    },
  ],

  "jammu-kashmir-5-days": [
    {
      id: "jk_f1", name: "Ahdoos Restaurant", type: "restaurant", town: "Residency Road, Srinagar",
      mustTry: ["Rogan Josh", "Gushtaba (meatballs in yogurt gravy)", "Rista", "Tabak Maaz", "Kashmiri Kahwa"],
      priceRange: "₹₹₹", isVeg: false,
      notes: "Srinagar's premier Kashmiri Wazwan destination since 1918 on the banks of Jhelum.",
    },
    {
      id: "jk_f2", name: "Mughal Darbar", type: "restaurant", town: "Shaheed Gunj, Srinagar",
      mustTry: ["Wazwan Trami Feast", "Chicken Kanti", "Shami Kebab", "Firni"],
      priceRange: "₹₹", isVeg: false,
      notes: "Authentic multi-course Wazwan served on traditional copper plates.",
    },
    {
      id: "jk_f3", name: "Dana Pani Restaurant", type: "restaurant", town: "Main Market, Pahalgam",
      mustTry: ["Kashmiri Dum Aloo", "Nadru Yakhni (Lotus stem in yogurt)", "Paneer Butter Masala"],
      priceRange: "₹₹", isVeg: true,
      notes: "Clean, reliable pure vegetarian restaurant serving North Indian & authentic Kashmiri Pandit dishes.",
    },
    {
      id: "jk_f4", name: "Highlands Park Lounge", type: "cafe", town: "Gulmarg",
      mustTry: ["Saffron Kahwa with Almonds", "Hot Apple Crumble", "Irish Coffee", "Grilled Sandwiches"],
      priceRange: "₹₹₹", isVeg: true,
      notes: "Classic après-ski heritage lounge with roaring stone fireplace and retro ski photos.",
    },
  ],

  "agra-mathura-3-days": [
    {
      id: "am_f1", name: "Pinch of Spice", type: "restaurant", town: "Fatehabad Road, Agra",
      mustTry: ["Murg Boti Masala", "Dal Panchratna", "Dahi Ke Kebab", "Butter Naan"],
      priceRange: "₹₹", isVeg: false,
      notes: "Award-winning Mughlai and North Indian dining close to the Taj Mahal.",
    },
    {
      id: "am_f2", name: "Brijwasi Mithai Wala", type: "street-food", town: "Holi Gate, Mathura",
      mustTry: ["Mathura Ke Pede", "Makhan Mishri", "Bedmi Puri with Hing Aloo", "Malpua"],
      priceRange: "₹", isVeg: true,
      notes: "Centuries-old sweets shop famous for the sacred caramelised khoya Mathura pedas.",
    },
    {
      id: "am_f3", name: "Shankar Mithai Bhandar", type: "street-food", town: "Taj Ganj, Agra",
      mustTry: ["Bedai (crispy dal poori)", "Spicy Hing Aloo", "Hot Jalebi dipped in Rabdi"],
      priceRange: "₹", isVeg: true,
      notes: "The definitive breakfast ritual of Agra locals, fried fresh each morning.",
    },
  ],

  "auli-nearby-3-days": [
    {
      id: "au_f1", name: "Cliff Top Panorama Restaurant", type: "restaurant", town: "Auli Ski Slopes",
      mustTry: ["Garhwali Kafuli (spinach gravy)", "Phaanu (lentil stew)", "Hot Tomato Soup", "Gahat ki Roti"],
      priceRange: "₹₹", isVeg: true,
      notes: "Dine while gazing at Nanda Devi and Kamet peaks through floor-to-ceiling glass windows.",
    },
    {
      id: "au_f2", name: "Joshimath Pahadi Bhojanalaya", type: "dhaba", town: "Joshimath Upper Bazaar",
      mustTry: ["Garhwali Thali", "Mandua Roti with Ghee", "Jhangora Ki Kheer", "Aloo Ke Gutke"],
      priceRange: "₹", isVeg: true,
      notes: "Traditional Kumaoni and Garhwali home-style cooking at very modest prices.",
    },
    {
      id: "au_f3", name: "Auli Slopes Maggi & Chai Point", type: "street-food", town: "Auli Artificial Lake",
      mustTry: ["Cheese Butter Maggi at 10,000 ft", "Ginger Lemon Honey Tea", "Bun Maska"],
      priceRange: "₹", isVeg: true,
      notes: "The quintessential snow-slope refreshment with panoramic vistas of the Trishul peak.",
    },
  ],

  "velas-turtle-festival-konkan": [
    {
      id: "vt_f1", name: "Upadhye Family Kitchen", type: "homestay-kitchen", town: "Velas Village",
      mustTry: ["Steamed Ukadiche Modak", "Solkadhi", "Pithla Bhakri with Thecha", "Aluvadi"],
      priceRange: "₹", isVeg: true,
      notes: "Freshly made authentic Konkani vegetarian meals prepared on traditional firewood stoves.",
    },
    {
      id: "vt_f2", name: "Omkar Khanawal", type: "homestay-kitchen", town: "Beach Road, Velas",
      mustTry: ["Bangda Curry (mackerel)", "Surmai Rava Fry", "Konkani Rice Bhakri", "Kaju Usal"],
      priceRange: "₹", isVeg: false,
      notes: "Fresh coastal catch cooked with freshly grated coconut and homemade Malvani masala.",
    },
    {
      id: "vt_f3", name: "Velas Village Breakfast Shack", type: "street-food", town: "Velas Temple Square",
      mustTry: ["Kande Pohe", "Ghavane (rice crepes)", "Fresh Coconut Chutney", "Adrak Chai"],
      priceRange: "₹", isVeg: true,
      notes: "Quick morning fuel right after the 6:30 AM turtle hatching walk on the beach.",
    },
  ],

  "tarkarli-sindhudurg-beach": [
    {
      id: "tk_f1", name: "Chaitanya Restaurant", type: "restaurant", town: "Malvan Market",
      mustTry: ["Special Malvani Surmai Thali", "Tisrya Masala (Clams)", "Bombil Fry", "Solkadhi"],
      priceRange: "₹₹", isVeg: false,
      notes: "Consistently rated the best authentic Malvani seafood restaurant in the entire coastal belt.",
    },
    {
      id: "tk_f2", name: "Athithi Bamboo", type: "restaurant", town: "Malvan Jetty Road",
      mustTry: ["Crab Masala", "Kombdi Vade (chicken curry with multi-grain puri)", "Prawns Sukka"],
      priceRange: "₹₹", isVeg: false,
      notes: "Iconic local spot known for fiery spices and generous portions of fresh seafood.",
    },
    {
      id: "tk_f3", name: "Swami Samarth Bhojanalaya", type: "dhaba", town: "Tarkarli Beach Road",
      mustTry: ["Home-style Fish Thali", "Mori (Shark) Masala", "Ukadiche Modak"],
      priceRange: "₹", isVeg: false,
      notes: "Family-run dhaba where the owner's mother cooks on earthen chulhas behind the dining room.",
    },
  ],

  "panhala-kolhapur-hill-fort": [
    {
      id: "pn_f1", name: "Hotel Opal Kolhapur", type: "restaurant", town: "Old Pune-Bangalore Rd, Kolhapur",
      mustTry: ["Tambda Rassa (spicy red broth)", "Pandhra Rassa (coconut bone broth)", "Mutton Sukka", "Bhakri"],
      priceRange: "₹₹", isVeg: false,
      notes: "Legendary temple of Kolhapuri non-veg cuisine since 1968. Free refills of hot tambda and pandhra rassa.",
    },
    {
      id: "pn_f2", name: "Dehaati", type: "restaurant", town: "Near Shivaji University, Kolhapur",
      mustTry: ["Dehaati Special Mutton Thali", "Chicken Fry Kolhapuri", "Solkadhi", "Indrayani Bhaat"],
      priceRange: "₹₹", isVeg: false,
      notes: "Rustic ambiance serving farm-to-table Kolhapuri recipes spiced with homemade Lavangi mirchi.",
    },
    {
      id: "pn_f3", name: "Phadatare Misal Kendra", type: "street-food", town: "Udyamnagar, Kolhapur",
      mustTry: ["Special Kolhapuri Misal Pav", "Extra Kat (spicy red gravy)", "Thick Curd", "Taak"],
      priceRange: "₹", isVeg: true,
      notes: "Famous Misal joint operating since 1937. Mild, medium, and the famous 'Jhatka' spicy versions available.",
    },
  ],

  "amboli-sahyadri-waterfalls": [
    {
      id: "ab_f1", name: "Narvekar's Mess", type: "dhaba", town: "Amboli Bazaar",
      mustTry: ["Gavran Chicken Curry", "Kombdi Vade", "Surmai Fry", "Solkadhi"],
      priceRange: "₹", isVeg: false,
      notes: "Modest mess serving the tastiest country-chicken curry and puffed vade in the hill station.",
    },
    {
      id: "ab_f2", name: "Hotel Shivmalhar", type: "dhaba", town: "Amboli Ghats Viewpoint",
      mustTry: ["Kanda Bhajji (onion fritters)", "Spicy Misal Pav", "Cutting Masala Chai"],
      priceRange: "₹", isVeg: true,
      notes: "Hot fried snacks in the thick monsoon fog overlooking roaring Sahyadri waterfalls.",
    },
  ],

  "toranmal-satpura-hill-station": [
    {
      id: "tm_f1", name: "Lake View Canteen Toranmal", type: "dhaba", town: "Yashwant Lake, Toranmal",
      mustTry: ["Jowar & Bajra Bhakri", "Shev Bhaji (Khandeshi spicy)", "Thecha with Raw Onion", "Kadhi Khichdi"],
      priceRange: "₹", isVeg: true,
      notes: "Hearty Khandeshi tribal cuisine served fresh alongside the quiet waters of Yashwant Lake.",
    },
    {
      id: "tm_f2", name: "Toranmal Tribal Kitchen", type: "homestay-kitchen", town: "Toranmal Village",
      mustTry: ["Kodo Millet Dalia", "Forest Honey Flatbread", "Wood-fired Baingan Bharta"],
      priceRange: "₹", isVeg: true,
      notes: "Authentic Satpura tribal specialties prepared using organic millets and wild forest greens.",
    },
  ],

  "chorla-ghat-western-ghats": [
    {
      id: "cg_f1", name: "Randhan Dining Hall (Wildernest)", type: "restaurant", town: "Swapnagandha, Chorla Ghat",
      mustTry: ["Goan Saraswat Thali", "Tambdi Bhaji (red amaranth)", "Fish Hooman Curry", "Kokum Kheer"],
      priceRange: "₹₹₹", isVeg: false,
      notes: "Multi-course regional buffet cooked in traditional clay pots over wood fires, overlooking the jungle.",
    },
    {
      id: "cg_f2", name: "Chorla Valley View Dhaba", type: "dhaba", town: "State Highway 4, Chorla Border",
      mustTry: ["South Indian Filter Coffee", "Mirchi Pakoda", "Usal Pav", "Egg Bhurji"],
      priceRange: "₹", isVeg: false,
      notes: "High-altitude pit stop on the winding ghat road between Belagavi and Goa.",
    },
  ],

  "cotigao-wildlife-sanctuary-goa": [
    {
      id: "co_f1", name: "Canacona Fish Market Khanawal", type: "dhaba", town: "Chaudi, Canacona",
      mustTry: ["Kingfish Thali", "Mackerel Recheado", "Goan Prawn Curry", "Kismur (dried shrimp salad)"],
      priceRange: "₹", isVeg: false,
      notes: "Authentic local workers' lunch canteen serving fresh morning-catch fish thali.",
    },
    {
      id: "co_f2", name: "Forest Gate Canteen", type: "street-food", town: "Cotigao Sanctuary Gate",
      mustTry: ["Goan Ross Omelette with Xacuti Gravy", "Hot Poee Bread", "Spiced Chai"],
      priceRange: "₹", isVeg: false,
      notes: "Simple breakfast stop right outside the wildlife sanctuary gate.",
    },
  ],

  "gorakhgad-fort-trek-mumbai": [
    {
      id: "gg_f1", name: "Dehane Village Kitchen", type: "homestay-kitchen", town: "Dehane Base Village",
      mustTry: ["Firewood Pithla Bhakri", "Spicy Mirchi Thecha", "Gavran Chicken Sukka", "Chaas"],
      priceRange: "₹", isVeg: true,
      notes: "Freshly prepared by village host families right after you descend from the Gorakhgad pinnacle.",
    },
    {
      id: "gg_f2", name: "Malshej Ghat Highway Dhaba", type: "dhaba", town: "Kalyan-Naneghat Highway",
      mustTry: ["Kolhapuri Misal Pav", "Batata Vada", "Hot Ginger Tea"],
      priceRange: "₹", isVeg: true,
      notes: "Famous highway stop for Mumbai trekkers fueling up on the drive towards Dehane.",
    },
  ],

  "orchha-bundelkhand-heritage": [
    {
      id: "or_f1", name: "Open Sky Restaurant", type: "restaurant", town: "Near Ram Raja Temple, Orchha",
      mustTry: ["Bundelkhandi Thali", "Dal Baati Churma", "Paneer Lababdar", "Cold Lassi"],
      priceRange: "₹₹", isVeg: true,
      notes: "Rooftop terrace dining with direct views of the illuminated Ram Raja Temple towers.",
    },
    {
      id: "or_f2", name: "Betwa Tarang Restaurant", type: "restaurant", town: "Main Road, Orchha",
      mustTry: ["Malai Kofta", "Kadhi Pakora", "Fresh Mint Chutney with Tandoori Roti"],
      priceRange: "₹₹", isVeg: true,
      notes: "Air-conditioned restaurant with top floor balconies overlooking the cenotaph gardens.",
    },
    {
      id: "or_f3", name: "Ram Raja Temple Street Sweets", type: "street-food", town: "Temple Chowk, Orchha",
      mustTry: ["Khoya Jalebi", "Rabdi", "Crispy Moong Dal Kachori"],
      priceRange: "₹", isVeg: true,
      notes: "Evening sweet vendors buzzing with pilgrims after the Aarti.",
    },
  ],

  "mandu-afghan-ruins-plateau": [
    {
      id: "md_f1", name: "Shivani Restaurant Mandu", type: "restaurant", town: "Near Jahaz Mahal, Mandu",
      mustTry: ["Dal Paniya (baked in cow-dung embers)", "Baobab Tamarind Chutney", "Sev Tamatar", "Baingan Bharta"],
      priceRange: "₹", isVeg: true,
      notes: "Famous for 'Dal Paniya' — an ancient Malwa specialty that cannot be found outside Mandu.",
    },
    {
      id: "md_f2", name: "Malwa Retreat Dining Room", type: "restaurant", town: "MPT Malwa Retreat, Mandu",
      mustTry: ["Bhutte Ka Kees (grated spiced corn)", "Malwa Thali", "Dal Baati with Ghee"],
      priceRange: "₹₹", isVeg: true,
      notes: "Traditional central Indian dishes prepared with authentic Malwa spices.",
    },
  ],

  "chitrakoot-mp-pilgrimage": [
    {
      id: "ck_f1", name: "Ramghat Rabdi & Lassi Bhandar", type: "street-food", town: "Ramghat, Chitrakoot",
      mustTry: ["Clay-Cup Creamy Rabdi", "Peda of Chitrakoot", "Kesar Badam Lassi"],
      priceRange: "₹", isVeg: true,
      notes: "Iconic dairy dessert shop operating directly on the holy ghats of the Mandakini.",
    },
    {
      id: "ck_f2", name: "Sita Rasoi Satvik Bhojanalaya", type: "restaurant", town: "Near Kamadgiri Temple, Chitrakoot",
      mustTry: ["Satvik Thali (No Onion, No Garlic)", "Moong Dal Khichdi", "Puri Sabzi", "Kheer"],
      priceRange: "₹", isVeg: true,
      notes: "Pure vegetarian pilgrim kitchen serving wholesome prasadam meals.",
    },
  ],

  "bhimbetka-rock-shelters": [
    {
      id: "bb_f1", name: "MPT Highway Treat Canteen", type: "restaurant", town: "Bhimbetka Entrance, NH-46",
      mustTry: ["Bhopali Poha Jalebi", "Central Indian Thali", "Masala Chai", "Paneer Paratha"],
      priceRange: "₹", isVeg: true,
      notes: "Fresh and clean refreshments right at the turnoff to the prehistoric cave paintings.",
    },
    {
      id: "bb_f2", name: "Under The Mango Tree (Jehan Numa)", type: "restaurant", town: "Shamla Hills, Bhopal",
      mustTry: ["Bhopali Gosht Korma", "Bhopali Filfora", "Dum Biryani", "Shahi Tukda"],
      priceRange: "₹₹₹", isVeg: false,
      notes: "World-class royal Nawabi cuisine prepared from secret recipes of the Begums of Bhopal.",
    },
    {
      id: "bb_f3", name: "Manohar Dairy & Restaurant", type: "restaurant", town: "Hamidia Road, Bhopal",
      mustTry: ["Chole Bhature", "Dahi Vada", "Rabdi Rasmalai", "Raj Kachori"],
      priceRange: "₹₹", isVeg: true,
      notes: "Bhopal's most famous multi-generation chaat and vegetarian culinary institution.",
    },
  ],

  "amarkantak-narmada-source": [
    {
      id: "ak_f1", name: "Narmada Mandir Prasad Bhandara", type: "restaurant", town: "Narmada Udgam Complex, Amarkantak",
      mustTry: ["Satvik Temple Khichdi", "Bundelkhandi Kadhi", "Poori Sabzi", "Suji Halwa"],
      priceRange: "₹", isVeg: true,
      notes: "Divine temple kitchen serving sacred offerings to pilgrims in a serene courtyard.",
    },
    {
      id: "ak_f2", name: "Kalchuri Bhojanalaya", type: "dhaba", town: "Amarkantak Main Chowk",
      mustTry: ["Traditional Madhya Pradesh Thali", "Dal Bati Churma", "Fresh Buffalo Milk Rabdi"],
      priceRange: "₹", isVeg: true,
      notes: "Clean family-run dining hall near the main bazaar.",
    },
  ],

  "patalkot-valley-tribal": [
    {
      id: "pt_f1", name: "Tamia Valley View Canteen", type: "dhaba", town: "Tamia Cliff Top, Chhindwara",
      mustTry: ["Kodo-Kutki Millet Thali", "Bharia Mahua Sweets", "Fire-Roasted Sweet Corn", "Achar"],
      priceRange: "₹", isVeg: true,
      notes: "Dine while gazing at the 1,500 ft sheer gorge of Patalkot valley.",
    },
    {
      id: "pt_f2", name: "Chhindwara Desi Dhaba", type: "dhaba", town: "Tamia-Chhindwara Road",
      mustTry: ["Gondwana Spicy Chicken", "Jowar Bhakri", "Spicy Dal Tadka"],
      priceRange: "₹", isVeg: false,
      notes: "Earthy rural recipes cooked on wood charcoal with regional wild herbs.",
    },
  ],

  "panna-tiger-reserve-safari": [
    {
      id: "pr_f1", name: "Ken River Deck Dining", type: "restaurant", town: "Ken River Lodge, Madla",
      mustTry: ["Bundeli Mutton Curry", "Wood-fired Tandoori Trout", "Dal Tadka", "Gulab Jamun"],
      priceRange: "₹₹₹", isVeg: false,
      notes: "Lantern-lit candle dinners set directly on wooden machans above the Ken River.",
    },
    {
      id: "pr_f2", name: "Madla Safari Tea & Tiffin", type: "street-food", town: "Madla Gate, Panna",
      mustTry: ["Spicy Poha", "Aloo Parathas with Curd", "Masala Chai", "Samosa"],
      priceRange: "₹", isVeg: true,
      notes: "Essential morning refueling stop before the safari jeeps enter the park gates.",
    },
  ],

  "tirathgarh-kanger-valley-chhattisgarh": [
    {
      id: "tg_f1", name: "Kanger Valley Tribal Canteen", type: "dhaba", town: "Tirathgarh Falls Gate, Bastar",
      mustTry: ["Chaprah (Red Ant Chutney - local delicacy)", "Bafauri (steamed chana snack)", "Dubki Kadhi", "Rice"],
      priceRange: "₹", isVeg: false,
      notes: "Taste authentic indigenous Bastar tribal ingredients right beside the roaring white cascade.",
    },
    {
      id: "tg_f2", name: "Bastar Haat Bhojanalaya", type: "restaurant", town: "Jagdalpur",
      mustTry: ["Lal Bhaji with Rice", "Bastar Fish Curry", "Kanda Thali", "Mahua Ladoo"],
      priceRange: "₹", isVeg: false,
      notes: "Hearty Chhattisgarhi meal cooked with local forest produce.",
    },
  ],

  "chitrakoot-waterfall-bastar": [
    {
      id: "cw_f1", name: "Falls View Restaurant (Dandami)", type: "restaurant", town: "Chitrakote Falls Rim, Bastar",
      mustTry: ["Chhattisgarhi Chila (rice flour savory crepes)", "Tomato Spicy Chutney", "Indravati River Fish Fry"],
      priceRange: "₹₹", isVeg: false,
      notes: "Unmatched dining experience directly overlooking the thundering 'Niagara of India'.",
    },
    {
      id: "cw_f2", name: "Suruchi Thali Restaurant", type: "restaurant", town: "Jagdalpur City",
      mustTry: ["Chhattisgarhi Special Thali", "Farra (rice flour rolls)", "Thetari Snack", "Sweet Khurmi"],
      priceRange: "₹", isVeg: true,
      notes: "Clean pure vegetarian restaurant serving authentic state thalis.",
    },
  ],

  "bastar-tribal-culture-haat": [
    {
      id: "bt_f1", name: "Tokapal Weekly Haat Food Stalls", type: "street-food", town: "Tokapal Market, Bastar",
      mustTry: ["Fresh Sulphi (palm sap wine)", "Roasted Forest Tubers", "Bafauri Dal Cakes", "Mahua Drink"],
      priceRange: "₹", isVeg: false,
      notes: "Vibrant weekly tribal market where locals gather to share traditional snacks and palm wine.",
    },
    {
      id: "bt_f2", name: "Tribal Heritage Kitchen", type: "homestay-kitchen", town: "Tokapal Village",
      mustTry: ["Pej (fermented cooling rice porridge)", "Bamboo Shoot Chicken", "Millet Flatbreads"],
      priceRange: "₹", isVeg: false,
      notes: "Cooked inside a traditional Maria home on firewood clay stoves.",
    },
  ],

  "ziro-valley-apatani": [
    {
      id: "zv_f1", name: "Abasa Traditional Kitchen", type: "homestay-kitchen", town: "Siiro Village, Ziro",
      mustTry: ["Pike Pila (pork cooked in bamboo hollow)", "Pika Chila", "Tapyo (herbal salt)", "Apong (Rice Beer)"],
      priceRange: "₹", isVeg: false,
      notes: "The gold standard of authentic Apatani hearth cuisine served around the family fireplace.",
    },
    {
      id: "zv_f2", name: "Cloud 9 Cafe Ziro", type: "cafe", town: "Hapoli Market, Ziro",
      mustTry: ["Smoked Pork Thukpa", "Tibetan Steamed Momos", "Kiwi Fruit Shake", "Black Mountain Tea"],
      priceRange: "₹", isVeg: false,
      notes: "Cozy wood-paneled cafe in Hapoli popular during the Ziro Music Festival.",
    },
  ],

  "dzukou-valley-trek-nagaland": [
    {
      id: "dz_f1", name: "Dzukou Rest House Trail Canteen", type: "homestay-kitchen", town: "Dzukou Valley Rim",
      mustTry: ["Campfire Maggi at 8,000 ft", "Spicy Boiled Eggs", "Hot Black Tea with Ginger", "Steamed Rice with Dal"],
      priceRange: "₹", isVeg: true,
      notes: "Simple life-saving hot meals prepared over firewood inside the rest house cave shelter.",
    },
    {
      id: "dz_f2", name: "Dzuleke Naga Kitchen", type: "restaurant", town: "Viswema / Kohima Road",
      mustTry: ["Smoked Pork with Axone (fermented soybean)", "Fermented Bamboo Shoot Gravy", "Raja Mircha Chutney", "Sticky Rice"],
      priceRange: "₹₹", isVeg: false,
      notes: "Authentic Angami Naga tribal dishes flavored with the legendary fiery King Chilli.",
    },
  ],

  "mawlynnong-cleanest-village": [
    {
      id: "mw_f1", name: "Na-i-Tylli Restaurant", type: "restaurant", town: "Mawlynnong Village",
      mustTry: ["Organic Khasi Thali", "Tungrymbai (fermented soybean curry)", "Chicken Jadoh", "Red Rice"],
      priceRange: "₹", isVeg: false,
      notes: "Village cooperative dining space serving food prepared with vegetables grown in the village gardens.",
    },
    {
      id: "mw_f2", name: "Riwai Root Bridge Cafe", type: "cafe", town: "Riwai Village",
      mustTry: ["Forest Honey Lemon Tea", "Aloo Dum with Steamed Rice Cakes", "Fresh Pineapples"],
      priceRange: "₹", isVeg: true,
      notes: "Rest stop near the single-decker living root bridge in Riwai.",
    },
  ],

  "nongriat-double-decker-trek": [
    {
      id: "nr_f1", name: "Byron's Kitchen (Serene Homestay)", type: "homestay-kitchen", town: "Nongriat Village",
      mustTry: ["Nongriat Veg Thali", "Scrambled Eggs with Garden Herbs", "Cinnamon Black Tea", "Banana Pancakes"],
      priceRange: "₹", isVeg: true,
      notes: "Cooked with love by the homestay hosts right beside the Double Decker Living Root Bridge.",
    },
    {
      id: "nr_f2", name: "Cherrapunjee Holiday Resort Restaurant", type: "restaurant", town: "Laitkynsew Rim",
      mustTry: ["Khasi Pepper Pork", "Dohneiiong (pork with black sesame seeds)", "Fresh Orange Blossom Tea"],
      priceRange: "₹₹", isVeg: false,
      notes: "Scenic cliff restaurant renowned for pioneering root bridge tourism.",
    },
  ],

  "dawki-umngot-river-meghalaya": [
    {
      id: "dw_f1", name: "Shnongpdeng River View Dhaba", type: "dhaba", town: "Shnongpdeng Riverbank, Dawki",
      mustTry: ["Fresh Umngot River Fish Fry", "Mustard Fish Curry", "Steamed Sticky Rice", "Dal Tadka"],
      priceRange: "₹", isVeg: false,
      notes: "Fresh fish caught directly from the crystal river cooked with simple Bengali and Khasi spices.",
    },
    {
      id: "dw_f2", name: "Dawki Border Shack", type: "street-food", town: "Tamabil Border, Dawki",
      mustTry: ["Egg Toast", "Bangladeshi Milk Chai", "Samosa Chaat"],
      priceRange: "₹", isVeg: false,
      notes: "Friendly border checkpoint tea stall bustling with cross-border trade travelers.",
    },
  ],

  "mawsynram-wettest-place-earth": [
    {
      id: "mr_f1", name: "Mawsynram Village Canteen", type: "dhaba", town: "Mawsynram Market",
      mustTry: ["Steaming Pork Momos", "Khasi Spicy Noodle Soup", "Red Tea with Kwai (betel nut)"],
      priceRange: "₹", isVeg: false,
      notes: "Warm up from the relentless monsoon downpours with hot bowls of soup.",
    },
    {
      id: "mr_f2", name: "Mawjymbuin Cave Tea Stall", type: "street-food", town: "Mawjymbuin Cave Entrance",
      mustTry: ["Piping Hot Vegetable Pakoras", "Sweet Buns", "Spiced Ginger Tea"],
      priceRange: "₹", isVeg: true,
      notes: "Perfect tea break after exploring the natural Shivalinga stalagmite cave.",
    },
  ],

  "majuli-brahmaputra-assam": [
    {
      id: "mj_f1", name: "Uriam Traditional Restaurant", type: "restaurant", town: "Garamur, Majuli",
      mustTry: ["Assamese Thali on Bell Metal", "Maasor Tenga (tangy river fish)", "Khaar (alkaline raw papaya dish)", "Kholar Pitha"],
      priceRange: "₹₹", isVeg: false,
      notes: "Traditional culinary haven serving classical Assamese recipes in royal brass utensils.",
    },
    {
      id: "mj_f2", name: "Mishing Tribal Kitchen", type: "homestay-kitchen", town: "Derasang, Majuli",
      mustTry: ["Patot Diya Maas (fish steamed in banana leaves)", "Porok Aapong (rice brew)", "Bora Saul (sticky rice)"],
      priceRange: "₹", isVeg: false,
      notes: "Authentic indigenous Mishing food cooked inside a bamboo stilt house.",
    },
  ],

  "khonoma-green-village-nagaland": [
    {
      id: "kh_f1", name: "Dovipie Dining Hall", type: "restaurant", town: "Khonoma Village",
      mustTry: ["Smoked Beef with Yam", "Boiled Mountain Green Salad", "Axone and Tomato Dip", "Red Organic Rice"],
      priceRange: "₹", isVeg: false,
      notes: "Panoramic village views paired with healthy, un-oiled traditional Angami food.",
    },
    {
      id: "kh_f2", name: "Terhuotu Cafe Khonoma", type: "cafe", town: "Village Fort Square, Khonoma",
      mustTry: ["Galho (Naga wholesome rice-vegetable porridge)", "Naga Herbal Green Tea", "Roasted Squash Seeds"],
      priceRange: "₹", isVeg: true,
      notes: "Rest stop near the historic Anglo-Khonoma battle memorial site.",
    },
  ],

  "ukhrul-tangkhul-manipur": [
    {
      id: "uk_f1", name: "Hill View Tangkhul Restaurant", type: "restaurant", town: "Viewland, Ukhrul",
      mustTry: ["Smoked Pork with Fermented Bamboo Shoot", "Kangshoi (stewed seasonal vegetables)", "Hawaijar (fermented beans)", "Sticky Rice"],
      priceRange: "₹", isVeg: false,
      notes: "The best place to experience authentic Tangkhul Naga highland cuisine in Ukhrul.",
    },
    {
      id: "uk_f2", name: "Shirui Trail Cafe", type: "street-food", town: "Shirui Peak Trailhead",
      mustTry: ["Mountain Ginger Tea", "Hard Boiled Free-Range Eggs", "Vegetable Chowmein"],
      priceRange: "₹", isVeg: true,
      notes: "High altitude snacks for trekkers heading up to the Shirui Lily meadows.",
    },
  ],

  "loktak-lake-floating-islands": [
    {
      id: "lt_f1", name: "Sendra Island Restaurant", type: "restaurant", town: "Sendra Island, Loktak Lake",
      mustTry: ["Eromba (mashed greens & boiled fish)", "Singju (fiery lotus root salad)", "Fried Loktak Carp", "Chak-hao Kheer (black rice pudding)"],
      priceRange: "₹₹", isVeg: false,
      notes: "Spectacular elevated views of the floating islands paired with authentic Meitei cuisine.",
    },
    {
      id: "lt_f2", name: "Moirang Fish Stalls", type: "street-food", town: "Moirang Market",
      mustTry: ["Crispy Lake Fish Pakoras", "Thoiding Chicken", "Sweet Sticky Black Rice Cakes"],
      priceRange: "₹", isVeg: false,
      notes: "Famous evening street food hub where fishermen bring their afternoon catch.",
    },
  ],

  "reiek-hill-mizoram": [
    {
      id: "re_f1", name: "Reiek Heritage Cafeteria", type: "restaurant", town: "Reiek Tourist Resort, Mizoram",
      mustTry: ["Mizo Bai (pork and bamboo shoot vegetable stew)", "Boiled Mustard Greens", "Spicy Sawhchiar (Mizo meat risotto)", "Local Rice"],
      priceRange: "₹", isVeg: false,
      notes: "Traditional Mizo cuisine made without cooking oil, letting natural herbs and smoked meat shine.",
    },
    {
      id: "re_f2", name: "Aizawl Chopstyx", type: "restaurant", town: "Chanmari, Aizawl",
      mustTry: ["Smoky Pork Ribs", "Steamed Wontons", "Pan-Fried Momos", "Mizo Drip Coffee"],
      priceRange: "₹₹", isVeg: false,
      notes: "Trendy and lively dining spot in Aizawl city serving modern Mizo and Pan-Asian dishes.",
    },
  ],

  "vantawng-waterfall-thenzawl": [
    {
      id: "vtg_f1", name: "Thenzawl Highway Canteen", type: "dhaba", town: "Main Road, Thenzawl",
      mustTry: ["Sanpiau (Mizo rice porridge with roasted spices)", "Pork Bamboo Stew", "Boiled Forest Squash"],
      priceRange: "₹", isVeg: false,
      notes: "Comforting bowls of warm Sanpiau beloved by travelers driving the mountain highway.",
    },
    {
      id: "vtg_f2", name: "Vantawng Falls Viewpoint Shack", type: "street-food", town: "Vantawng Viewpoint",
      mustTry: ["Ginger Lemon Black Tea", "Roasted Peanuts", "Local Chili Noodles"],
      priceRange: "₹", isVeg: true,
      notes: "Sip hot tea while watching Mizoram's highest 750-foot two-tiered waterfall crash into the valley.",
    },
  ],

  "unakoti-rock-carvings-tripura": [
    {
      id: "un_f1", name: "Unakoti Heritage Canteen", type: "restaurant", town: "Unakoti Site Entrance",
      mustTry: ["Tripuri Mui Borok (traditional dish with berma fish)", "Kosoi Bwtwi (steamed beans with chili)", "Steamed Rice", "Dal"],
      priceRange: "₹", isVeg: false,
      notes: "Authentic indigenous Tripuri cuisine served directly at the rock bas-relief pilgrimage site.",
    },
    {
      id: "un_f2", name: "Kailashahar Sweets & Bhojanalaya", type: "street-food", town: "Kailashahar Town",
      mustTry: ["Bengali Fish Curry Thali (Rohu / Katla)", "Kolkata Style Rosogolla", "Fresh Mishti Doi"],
      priceRange: "₹", isVeg: false,
      notes: "Traditional Bengali fish thali and rich dairy sweets in the border town of Kailashahar.",
    },
  ],

  "namdapha-national-park-safari": [
    {
      id: "np_f1", name: "Singpho Heritage Kitchen", type: "homestay-kitchen", town: "Miao, Changlang",
      mustTry: ["Bamboo Hollow Herbal Chicken", "Singpho Herbal Tea (Phalap)", "Mashed Fish with Local Herbs", "Sticky Rice in Banana Leaf"],
      priceRange: "₹₹", isVeg: false,
      notes: "The Singpho tribe are the original discoverers of wild tea in India. Food is subtly spiced and steamed in bamboo.",
    },
    {
      id: "np_f2", name: "Deban Camp Mess", type: "homestay-kitchen", town: "Deban, Namdapha Core",
      mustTry: ["Campfire Dal Rice", "Seasonal Forest Squash Sabzi", "Black Tea with Wild Mint"],
      priceRange: "₹", isVeg: true,
      notes: "Wholesome field meals served to trekkers and wildlife researchers deep inside the rainforest.",
    },
  ],

  "bomdila-monastery-arunachal": [
    {
      id: "bm_f1", name: "Dragon Restaurant Bomdila", type: "restaurant", town: "Bomdila Main Bazaar",
      mustTry: ["Monpa Thukpa", "Tingmo with Chili Pork", "Fried Momos", "Tibetan Butter Tea"],
      priceRange: "₹", isVeg: false,
      notes: "Cozy Tibetan restaurant crowded with local monks and travellers on chilly Himalayan evenings.",
    },
    {
      id: "bm_f2", name: "Upper Gompa Monastery Canteen", type: "cafe", town: "Gontse Gaden Rabgyel Lhing Monastery",
      mustTry: ["Tibetan Salted Butter Tea", "Warm Tsampa Porridge", "Vegetable Noodle Soup"],
      priceRange: "₹", isVeg: true,
      notes: "Peaceful monastery cafe run by the Buddhist community with panoramic views of the valley.",
    },
  ],

  "neil-island-6-days": [
    {
      id: "ni_f1", name: "Something Different - Beachside Cafe", type: "cafe", town: "Neil Island Beach Road",
      mustTry: ["Grilled Andaman Red Snapper", "Wood-fired Thin Crust Pizza", "Mango Mint Smoothie", "Seafood Platter"],
      priceRange: "₹₹", isVeg: false,
      notes: "Colorful seaside cafe with beanbags, fairy lights, and delicious freshly caught reef fish.",
    },
    {
      id: "ni_f2", name: "Blue Sea Restaurant", type: "restaurant", town: "Neil Kendra Market",
      mustTry: ["Garlic Butter Lobster", "Crab Masala Curry", "Coconut Fish Curry with Steamed Rice"],
      priceRange: "₹₹", isVeg: false,
      notes: "Local Neil institution where you select your fresh catch of the day by weight.",
    },
    {
      id: "ni_f3", name: "Dugong Restaurant (Sea Shell)", type: "restaurant", town: "Laxmanpur Beach",
      mustTry: ["Seafood Bisque", "Tandoori Tiger Prawns", "Pineapple Fried Rice"],
      priceRange: "₹₹₹", isVeg: false,
      notes: "Fine dining seaside restaurant with candle-lit tables on the sand under starlit skies.",
    },
  ],

  "diglipur-7-days": [
    {
      id: "dg_f1", name: "Anu Bar & Restaurant", type: "restaurant", town: "Diglipur Main Market",
      mustTry: ["Andaman Tiger Prawns Fry", "Crab Masala", "Bengali Mustard Fish Curry", "Cold Beer"],
      priceRange: "₹₹", isVeg: false,
      notes: "Hearty seafood restaurant popular with locals and travelers exploring North Andaman.",
    },
    {
      id: "dg_f2", name: "Kalipur Beach Bamboo Shack", type: "street-food", town: "Kalipur Beach, Diglipur",
      mustTry: ["Fresh Green Tender Coconut", "Pan-fried Kingfish", "Egg Bhurji with Paratha"],
      priceRange: "₹", isVeg: false,
      notes: "Rustic shack right beside the turtle nesting beach, perfect after climbing Saddle Peak.",
    },
  ],

  "chitkul-5-days": [
    {
      id: "ckl_f1", name: "Hindustan Ka Aakhri Dhaba", type: "dhaba", town: "Chitkul Riverbank, Kinnaur",
      mustTry: ["Pahadi Rajma Chawal", "Spicy Kadhi Pakora", "Aloo Paratha with Desi Butter", "Masala Chai"],
      priceRange: "₹", isVeg: true,
      notes: "The world-famous 'Last Dhaba of India', sitting on the emerald banks of the Baspa River just before the Tibet border.",
    },
    {
      id: "ckl_f2", name: "Samaa Restaurant Chitkul", type: "restaurant", town: "Samaa Resorts, Chitkul",
      mustTry: ["Himachali Siddu with Ghee", "Kinnauri Mutton Curry", "Steaming Thukpa", "Apple Halwa"],
      priceRange: "₹₹", isVeg: false,
      notes: "Fine dining mountain lodge restaurant with heated dining hall and glacier views.",
    },
  ],

  "kalpa-5-days": [
    {
      id: "klp_f1", name: "Kinner Kailash Restaurant (HPTDC)", type: "restaurant", town: "Apple Orchards, Kalpa",
      mustTry: ["Traditional Himachali Siddu", "Kinnauri Apple Pie", "Dal Makhani", "Pahadi Chicken Curry"],
      priceRange: "₹₹", isVeg: false,
      notes: "Large glass-windowed dining hall with uninterrupted sunrise views of the sacred Kinnaur Kailash Shivling.",
    },
    {
      id: "klp_f2", name: "Little Chef Kalpa", type: "restaurant", town: "Reckong Peo / Kalpa",
      mustTry: ["Tibetan Steamed Momos", "Spicy Chowmein", "Thukpa", "Fresh Kinnauri Apple Juice"],
      priceRange: "₹", isVeg: false,
      notes: "Bustling local diner serving hot comfort food on cold mountain afternoons.",
    },
  ],

  "tirthan-valley-6-days": [
    {
      id: "tv_f1", name: "Raju's Homestay Dining Room", type: "homestay-kitchen", town: "Gushaini, Tirthan Valley",
      mustTry: ["Pan-Seared Himalayan Brown Trout", "Fresh Garden Mint Chutney", "Himachali Dal", "Hot Apple Crumble"],
      priceRange: "₹₹", isVeg: false,
      notes: "Unmatched culinary experience: freshly caught brown trout pan-fried on firewood with orchard-grown herbs.",
    },
    {
      id: "tv_f2", name: "The Trout House Cafe", type: "cafe", town: "Nagini, Tirthan Valley",
      mustTry: ["Wood-fired Oven Trout Pizza", "Grilled Trout with Lemon Garlic", "Freshly Pressed Apple Cider", "Filter Coffee"],
      priceRange: "₹₹", isVeg: false,
      notes: "Rustic-chic stone cafe on the riverbanks where anglers and trekkers gather in the evenings.",
    },
  ],

  "malana-4-days": [
    {
      id: "ml_f1", name: "Magic Valley Cafe", type: "cafe", town: "Waichin Valley, Malana",
      mustTry: ["Wood-Fired Thin Crust Pizza", "Israeli Shakshuka", "Hummus with Fresh Pita", "Mint Lemon Tea"],
      priceRange: "₹₹", isVeg: true,
      notes: "Alpine cafe nestled high in Waichin above Malana with sweeping views of the roaring glaciers.",
    },
    {
      id: "ml_f2", name: "Dragon Cafe Malana Base", type: "cafe", town: "Malana Trek Base",
      mustTry: ["Steaming Veg Thukpa", "Yak Cheese Toast", "Pahadi Chai with Honey", "Nutella Pancake"],
      priceRange: "₹", isVeg: true,
      notes: "Rest stop for hikers preparing for or returning from the steep Malana stairs.",
    },
  ],

  "barot-valley-4-days": [
    {
      id: "bv_f1", name: "Uhl River Trout Corner", type: "dhaba", town: "Barot Main Bazaar",
      mustTry: ["Crispy Fried Rainbow Trout", "Spicy Coriander Chutney", "Himachali Rajma Chawal", "Hot Lemon Tea"],
      priceRange: "₹", isVeg: false,
      notes: "Barot is famous for its government trout breeding farms. This dhaba serves the freshest fried trout in the valley.",
    },
    {
      id: "bv_f2", name: "Prakash Dhaba Multhan", type: "dhaba", town: "Multhan Bridge, Barot",
      mustTry: ["Himachali Kadhi Chawal", "Rajma Madra (yogurt gravy)", "Hot Tandoori Rotis with Desi Ghee"],
      priceRange: "₹", isVeg: true,
      notes: "Beloved local dhaba on the wooden bridge connecting Mandi and Kangra districts.",
    },
  ],

  "rakchham-5-days": [
    {
      id: "rk_f1", name: "Baspa Valley Kitchen (Rupin View)", type: "restaurant", town: "Rakchham, Kinnaur",
      mustTry: ["Kinnauri Rajma Madra", "Poppy Seed Stuffed Siddu", "Pahadi Mutton Curry", "Local Butter Tea"],
      priceRange: "₹₹", isVeg: false,
      notes: "Wooden dining room overlooking the roaring Baspa River serving traditional Kinnauri specialties.",
    },
    {
      id: "rk_f2", name: "Pink Village Cafe", type: "cafe", town: "Rakchham Village",
      mustTry: ["Ginger Lemon Honey Tea", "Steaming Thukpa", "Cheese Omelette with Toast", "Apple Walnut Cake"],
      priceRange: "₹", isVeg: true,
      notes: "Cozy pit stop in Rakchham's quiet streets with views of pink granite Himalayan cliffs.",
    },
  ],

  "nako-6-days": [
    {
      id: "nk_f1", name: "Nako Lake View Restaurant", type: "restaurant", town: "Nako Lake Shore",
      mustTry: ["Tibetan Thukpa", "Tingmo with Spicy Vegetable Stew", "Mint Lemon Tea", "Apple Crumble"],
      priceRange: "₹", isVeg: true,
      notes: "Rooftop seating right above the sacred high-altitude Nako Lake at 3,660 m.",
    },
    {
      id: "nk_f2", name: "Moon Lake Cafe Nako", type: "cafe", town: "Village Square, Nako",
      mustTry: ["Yak Cheese Momos", "Freshly Baked Apple Pie", "Fresh Filter Coffee", "Tsampa Porridge"],
      priceRange: "₹", isVeg: true,
      notes: "Popular hangout run by local youth in Nako old village.",
    },
  ],

  "pangi-valley-6-days": [
    {
      id: "pg_f1", name: "Killar Main Market Dhaba", type: "dhaba", town: "Killar, Pangi Valley",
      mustTry: ["Pangwala Thali", "Kodra Ki Roti (finger millet bread)", "Wild Morel Mushroom (Gucchi) Curry", "Rajma Chawal"],
      priceRange: "₹", isVeg: false,
      notes: "Pangi is famous for prized wild Gucchi mushrooms gathered in the high pine forests.",
    },
    {
      id: "pg_f2", name: "Chenab Cliff Tea Stall", type: "street-food", town: "Killar-Sach Pass Junction",
      mustTry: ["Hot Adrak Chai", "Crispy Aloo Pakoras", "Spicy Omelette"],
      priceRange: "₹", isVeg: false,
      notes: "Unmatched dramatic location perched over the sheer vertical drop of the Chenab river gorge.",
    },
  ],

  "tosh-3-days": [
    {
      id: "ts_f1", name: "Pink Floyd Cafe Tosh", type: "cafe", town: "Top of Tosh Village",
      mustTry: ["Authentic Israeli Shakshuka", "Hummus with Fresh Falafel and Pita", "Chicken Schnitzel", "Hot Mint Nana Tea"],
      priceRange: "₹₹", isVeg: false,
      notes: "Legendary psychedelic hill cafe with floor seating, low tables, and endless views of Tosh snow peaks.",
    },
    {
      id: "ts_f2", name: "German Bakery Tosh", type: "cafe", town: "Tosh Village Entrance",
      mustTry: ["Cinnamon Buns", "Warm Apple Strudel", "Hot Cappuccino", "Yak Cheese Pizza"],
      priceRange: "₹", isVeg: true,
      notes: "Fresh morning bakes and espresso coffee before you hike up the village trail.",
    },
  ],

  "sach-pass-5-days": [
    {
      id: "sp_f1", name: "Bairagarh Highway Dhaba", type: "dhaba", town: "Bairagarh, Chamba",
      mustTry: ["Stuffed Aloo Paratha with Butter", "Egg Curry with Rice", "Hot Spiced Tea"],
      priceRange: "₹", isVeg: false,
      notes: "Crucial early morning fueling stop on the Chamba side before beginning the steep ascent to 14,500 ft Sach Pass.",
    },
    {
      id: "sp_f2", name: "Satrundi Check Post Tea Tent", type: "street-food", town: "Satrundi, 11,500 ft",
      mustTry: ["Steaming Hot Maggi Noodles", "Black Pepper Tea", "Glucose Biscuits"],
      priceRange: "₹", isVeg: true,
      notes: "Life-saving checkpoint tent in extreme cold before the final glacier climb over Sach Pass.",
    },
  ],

  "chopta-4-days": [
    {
      id: "ch_f1", name: "Chopta Bugyal Dhaba", type: "dhaba", town: "Chopta Meadow Trailhead",
      mustTry: ["Garhwali Dal", "Aloo Paratha with Fresh Curd", "Pahadi Kadha (herbal brew)", "Maggi with Veggies"],
      priceRange: "₹", isVeg: true,
      notes: "Warm dhaba sitting right on the alpine meadow where the trek to Tungnath Shiva temple begins.",
    },
    {
      id: "ch_f2", name: "Tungnath Summit Tea Point", type: "street-food", town: "Tungnath Temple, 12,073 ft",
      mustTry: ["Ginger Lemon Honey Tea", "Hot Tomato Soup", "Energy Chocolate Bites"],
      priceRange: "₹", isVeg: true,
      notes: "The world's highest tea stall beside the highest Shiva temple on Earth.",
    },
  ],

  "khaliya-top-5-days": [
    {
      id: "kht_f1", name: "Khaliya Campfire Kitchen", type: "dhaba", town: "Khaliya Bugyal Ridge, 11,500 ft",
      mustTry: ["Steaming Kumaoni Dal & Rice", "Desi Ghee Rotis", "Adrak-Tulsi Kadha", "Pahadi Maggi with Mountain Herbs"],
      priceRange: "₹", isVeg: true,
      notes: "High altitude camp kitchen serving piping hot home meals around an evening bonfire under the Panchachuli stars.",
    },
    {
      id: "kht_f2", name: "Sarmoli Village Kitchen", type: "restaurant", town: "Sarmoli Homestay Cluster, Munsiyari",
      mustTry: ["Bhatt ki Churkani (black soybean curry)", "Mandua (finger millet) Rotis", "Jhangore ki Kheer", "Bhang ki Chutney"],
      priceRange: "₹", isVeg: true,
      notes: "Community kitchen managed by Bhotiya women serving authentic seasonal Kumaoni farm-to-table recipes.",
    },
    {
      id: "kht_f3", name: "Monal Cafe & Bakery", type: "cafe", town: "Main Market, Munsiyari",
      mustTry: ["Tibetan Steamed Momos", "Fresh Filter Coffee", "Wild Mountain Honey Pancakes", "Apple Crumble"],
      priceRange: "₹₹", isVeg: false,
      notes: "Cozy trekker cafe with floor seating, book exchange shelves, and stunning glass window views of Panchachuli III and IV.",
    },
  ],

  "chakrata-4-days": [
    {
      id: "ckt_f1", name: "Chaupal Jaunsari Rasoi", type: "restaurant", town: "Chakrata Bazaar",
      mustTry: ["Jaunsari Gahat ki Dal", "Red Rice with Mountain Ghee", "Cholu ki Roti", "Aloo ke Gutke with Pahadi Raita"],
      priceRange: "₹", isVeg: true,
      notes: "Traditional Jaunsari family dining serving time-honored tribal recipes cooked over slow wood fire in earthenware pots.",
    },
    {
      id: "ckt_f2", name: "Tiger Falls Waterfall Dhaba", type: "dhaba", town: "Tiger Falls Gorge",
      mustTry: ["Mountain Butter Maggi", "Spicy Onion-Potato Parathas", "Fresh Mint Chutney", "Gur Chai (Jaggery Tea)"],
      priceRange: "₹", isVeg: true,
      notes: "Picturesque rustic dhaba perched right beside the misty spray of Tiger Falls (India's highest direct waterfall cascade).",
    },
    {
      id: "ckt_f3", name: "Kalsi Riverfront Junction", type: "restaurant", town: "Kalsi Yamuna Bank",
      mustTry: ["Yamuna Valley Kadhi Chawal", "Roasted Mountain Corn", "Fresh Pahadi Cucumber Salad", "Sweet Lassi"],
      priceRange: "₹", isVeg: true,
      notes: "Riverside highway stop near the historic 3rd-century BC Ashokan Rock Edicts, famous for refreshing yogurt and buttermilk.",
    },
  ],

  "kanatal-4-days": [
    {
      id: "knt_f1", name: "Milan Mountain Dhaba", type: "dhaba", town: "Chamba-Mussoorie Highway, Kanatal",
      mustTry: ["Garhwali Chainsoo (black gram stew)", "Urad Dal Pakoras", "Fresh Tawa Rotis with White Butter", "Buransh (Rhododendron) Juice"],
      priceRange: "₹", isVeg: true,
      notes: "Popular highway dhaba known for hearty portions and authentic Garhwali home-cooked mountain lentils.",
    },
    {
      id: "knt_f2", name: "Kaudia Forest Nature Cafe", type: "cafe", town: "Kaudia Forest Entrance",
      mustTry: ["Wood-Fired Thin Crust Pizza", "Himalayan Herbal Lemon Tea", "Fresh Wild Mint Toast", "Warm Apple Walnut Pie"],
      priceRange: "₹₹", isVeg: false,
      notes: "Eco-cafe situated at the start of the Kaudia pine forest trek, sourcing all herbs and fruit from neighboring terraced orchards.",
    },
    {
      id: "knt_f3", name: "Surkhanda View Point Eatery", type: "street-food", town: "Surkhanda Devi Base, Kaddukhal",
      mustTry: ["Piping Hot Poori-Sabzi", "Steamed Pahadi Momos", "Masala Chai with Green Cardamom", "Besan Ladoo Prasad"],
      priceRange: "₹", isVeg: true,
      notes: "Bustling trail base eatery serving quick pilgrimage snacks and steaming mountain beverages before the steep temple ropeway.",
    },
  ],

  "chaukori-5-days": [
    {
      id: "chk_f1", name: "Chaukori Tea Garden Kitchen", type: "restaurant", town: "KMVN Tea Estate, Chaukori",
      mustTry: ["Bhatt ki Dal with Basmati Rice", "Singori Sweet wrapped in Malu leaf", "Kumaoni Raita with Yellow Mustard", "Fresh CTC Chaukori Green Tea"],
      priceRange: "₹", isVeg: true,
      notes: "Historic British tea bungalow dining hall offering classic Kumaoni comfort food and estate-grown tea with panoramic peak views.",
    },
    {
      id: "chk_f2", name: "Gaurav Pahadi Rasoi", type: "dhaba", town: "Berinag Road, Chaukori",
      mustTry: ["Traditional Pahadi Mutton Curry", "Spiced Aloo Gutke with Roasted Coriander", "Madira (Hemp seed) Chutney", "Mandua Roti"],
      priceRange: "₹₹", isVeg: false,
      notes: "Renowned local eatery famous for slow-cooked tender mountain goat curry and spicy Kumaoni condiments.",
    },
    {
      id: "chk_f3", name: "Patal Bhuvaneshwar Caves Dhaba", type: "street-food", town: "Patal Bhuvaneshwar Village",
      mustTry: ["Dubuk (ground lentil paste soup)", "Crisp Onion Pakoras", "Ginger Masala Chai", "Fresh Mawa Gujiya"],
      priceRange: "₹", isVeg: true,
      notes: "Welcoming mountain refreshment stall outside the ancient subterranean limestone cave temples.",
    },
  ],
};

export const DEFAULT_FOOD: FoodSpot[] = [
  {
    id: "def_f1", name: "Regional Kitchen & Dhaba", type: "restaurant", town: "Destination Center",
    mustTry: ["Traditional Regional Thali", "Fresh Local Bread", "Authentic Spiced Chai"],
    priceRange: "₹", isVeg: true,
    notes: "Locally recommended eatery serving authentic regional specialties, seasonal produce, and home-style hospitality.",
  },
];
