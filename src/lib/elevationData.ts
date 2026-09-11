export interface ElevationPoint {
  label: string;
  day: number;
  altitudeMeters: number;
  description?: string;
}

export interface AMSRiskAssessment {
  riskLevel: "Low" | "Moderate" | "High" | "Extreme";
  maxAltitudeMeters: number;
  maxAltitudeLocation: string;
  steepestAscentDay: number;
  steepestAscentMeters: number;
  isHighAltitude: boolean; // > 2,500m
  isAMSAlert: boolean; // climbs > 3,500m or > 800m ascent in a single day above 2,500m
  guidelines: string[];
  oxygenPoints?: string[];
}

export const TRIP_ELEVATION_PROFILES: Record<string, ElevationPoint[]> = {
  "leh-ladakh-9-days": [
    { label: "Leh Airport Arrival", day: 1, altitudeMeters: 3500, description: "Mandatory rest day for acclimatization" },
    { label: "Leh Market & Shanti Stupa", day: 2, altitudeMeters: 3600, description: "Light acclimatization walk" },
    { label: "Sham Valley (Sangam)", day: 3, altitudeMeters: 3100, description: "Lower altitude descent along Indus" },
    { label: "Khardung La Pass", day: 4, altitudeMeters: 5359, description: "World's highest motorable pass pass-through" },
    { label: "Hunder (Nubra Valley)", day: 4, altitudeMeters: 3050, description: "Descent into lower desert valley" },
    { label: "Turtuk Village", day: 5, altitudeMeters: 2800, description: "Balti cultural border town" },
    { label: "Diskit Monastery", day: 6, altitudeMeters: 3150, description: "Maitreya Buddha statue viewpoint" },
    { label: "Shyok River Route", day: 7, altitudeMeters: 3800, description: "Rugged river canyon transit" },
    { label: "Pangong Tso (Spangmik)", day: 7, altitudeMeters: 4250, description: "High altitude lakeside overnight stay" },
    { label: "Chang La Pass", day: 8, altitudeMeters: 5360, description: "Steep high altitude pass crossing" },
    { label: "Leh City Return", day: 8, altitudeMeters: 3500, description: "Final night in Leh" },
  ],
  "spiti-valley": [
    { label: "Shimla Start", day: 1, altitudeMeters: 2200, description: "Colonial town start point" },
    { label: "Narkanda (Hatu Peak)", day: 1, altitudeMeters: 2700, description: "Apple orchards ridge" },
    { label: "Sangla (Kinnaur)", day: 2, altitudeMeters: 2680, description: "Baspa river valley" },
    { label: "Chitkul (Last Village)", day: 3, altitudeMeters: 3450, description: "Indo-Tibet border outpost" },
    { label: "Kalpa (Kinner Kailash)", day: 3, altitudeMeters: 2960, description: "Sacred peak sunrise view" },
    { label: "Nako Lake", day: 4, altitudeMeters: 3662, description: "High altitude trans-Himalayan lake" },
    { label: "Tabo Monastery", day: 4, altitudeMeters: 3280, description: "Ajanta of the Himalayas" },
    { label: "Dhankar Gompa", day: 5, altitudeMeters: 3894, description: "Cliff-edge monastery" },
    { label: "Kaza (Spiti Hub)", day: 5, altitudeMeters: 3650, description: "Spiti Valley administrative hub" },
    { label: "Key Monastery & Kibber", day: 6, altitudeMeters: 4205, description: "Highest inhabited villages" },
    { label: "Hikkim (Highest Post Office)", day: 6, altitudeMeters: 4400, description: "High plateau post office" },
    { label: "Komic & Langza", day: 6, altitudeMeters: 4587, description: "Fossil village" },
    { label: "Kunzum Pass (Kunzum La)", day: 7, altitudeMeters: 4590, description: "Gateway pass between Spiti & Lahaul" },
    { label: "Chandratal Lake (Moon Lake)", day: 7, altitudeMeters: 4300, description: "Pristine crescent alpine lake" },
    { label: "Atal Tunnel (Rohtang)", day: 8, altitudeMeters: 3100, description: "Engineering marvel transit" },
    { label: "Manali Finish", day: 8, altitudeMeters: 2050, description: "Descent to Kullu Valley" },
  ],
  "char-dham-yatra-uttarakhand": [
    { label: "Haridwar", day: 1, altitudeMeters: 314, description: "Ganges plains" },
    { label: "Barkot", day: 1, altitudeMeters: 1220, description: "Yamuna valley foothill" },
    { label: "Yamunotri Temple", day: 2, altitudeMeters: 3291, description: "First Dham - 6km trek from Janki Chatti" },
    { label: "Uttarkashi", day: 3, altitudeMeters: 1158, description: "Bhagirathi river valley" },
    { label: "Gangotri Temple", day: 4, altitudeMeters: 3100, description: "Second Dham" },
    { label: "Guptkashi", day: 5, altitudeMeters: 1319, description: "Base for Kedarnath" },
    { label: "Gaurikund Base", day: 6, altitudeMeters: 1982, description: "Trek starting point" },
    { label: "Kedarnath Temple", day: 6, altitudeMeters: 3583, description: "Third Dham - Holy shrine behind Mandakini" },
    { label: "Chopta (Mini Switzerland)", day: 7, altitudeMeters: 2680, description: "Meadows base for Tungnath" },
    { label: "Badrinath Temple", day: 8, altitudeMeters: 3133, description: "Fourth Dham - Neelkanth peak backdrop" },
    { label: "Mana (First Indian Village)", day: 8, altitudeMeters: 3219, description: "Bheem Pul & Saraswati river origin" },
    { label: "Rishikesh Return", day: 9, altitudeMeters: 372, description: "Descent to yoga capital" },
  ],
  "panch-kedar-trek-10-days": [
    { label: "Rishikesh", day: 1, altitudeMeters: 372, description: "Foothills" },
    { label: "Kedarnath", day: 2, altitudeMeters: 3583, description: "First Kedar - Lord Shiva's hump" },
    { label: "Madhyamaheshwar", day: 4, altitudeMeters: 3497, description: "Second Kedar - Navel of Shiva" },
    { label: "Tungnath Temple", day: 6, altitudeMeters: 3680, description: "Third Kedar - Highest Shiva temple on Earth" },
    { label: "Chandrashila Peak", day: 6, altitudeMeters: 4000, description: "360-degree Himalayan summit" },
    { label: "Rudranath Temple", day: 8, altitudeMeters: 3600, description: "Fourth Kedar - Face of Shiva through rhododendrons" },
    { label: "Kalpeshwar Temple", day: 9, altitudeMeters: 2200, description: "Fifth Kedar - Hair of Shiva (Jata)" },
  ],
  "munsiyari-6-days": [
    { label: "Kathgodam", day: 1, altitudeMeters: 554, description: "Kumaon plains station" },
    { label: "Almora / Kausani", day: 1, altitudeMeters: 1890, description: "Pine forest ridge" },
    { label: "Birthi Falls", day: 2, altitudeMeters: 2000, description: "126m cascading waterfall" },
    { label: "Munsiyari Town", day: 2, altitudeMeters: 2298, description: "Panchachuli peaks base" },
    { label: "Khaliya Top Ridge", day: 3, altitudeMeters: 3500, description: "High alpine meadow summit" },
    { label: "Darkot Village", day: 4, altitudeMeters: 2100, description: "Pashmina & Angora weaving hub" },
    { label: "Chaukori", day: 5, altitudeMeters: 2010, description: "Tea gardens overlooking Nanda Devi" },
  ],
  "sikkim-7-days": [
    { label: "Bagdogra / Siliguri", day: 1, altitudeMeters: 126, description: "Plains" },
    { label: "Gangtok", day: 1, altitudeMeters: 1650, description: "State capital" },
    { label: "Tsomgo Lake (Changu)", day: 2, altitudeMeters: 3753, description: "Glacial lake" },
    { label: "Nathu La Pass", day: 2, altitudeMeters: 4310, description: "Historic Indo-China Silk Route pass" },
    { label: "Lachen", day: 3, altitudeMeters: 2750, description: "North Sikkim village" },
    { label: "Gurudongmar Lake", day: 4, altitudeMeters: 5183, description: "Sacred high altitude lake" },
    { label: "Lachung", day: 5, altitudeMeters: 2700, description: "Valley of flowers base" },
    { label: "Yumthang Valley", day: 6, altitudeMeters: 3700, description: "Rhododendron sanctuary" },
    { label: "Zero Point (Yumesamdong)", day: 6, altitudeMeters: 4663, description: "Permanent snowline outpost" },
  ],
  "khaliya-top-5-days": [
    { label: "Pantnagar / Kathgodam", day: 1, altitudeMeters: 554, description: "Kumaon foothill gateway" },
    { label: "Almora", day: 1, altitudeMeters: 1638, description: "Cultural capital of Kumaon" },
    { label: "Thal", day: 1, altitudeMeters: 900, description: "Ramganga river valley base" },
    { label: "Birthi Falls", day: 2, altitudeMeters: 2000, description: "126m roaring mountain cascade" },
    { label: "Munsiyari Basecamp", day: 2, altitudeMeters: 2200, description: "Johar valley hub facing Panchachuli" },
    { label: "Balanti Bend Trailhead", day: 3, altitudeMeters: 2450, description: "Khaliya trek start point" },
    { label: "Khaliya Bugyal Camp", day: 3, altitudeMeters: 3500, description: "Alpine meadow crest (11,500 ft)" },
    { label: "Khaliya Zero Point Summit", day: 4, altitudeMeters: 3700, description: "360° summit panorama (12,140 ft)" },
    { label: "Munsiyari Town", day: 4, altitudeMeters: 2200, description: "Descent & warm dinner" },
    { label: "Kathgodam / Return", day: 5, altitudeMeters: 554, description: "Foothills railway / airport" },
  ],
  "chakrata-4-days": [
    { label: "Dehradun Airport", day: 1, altitudeMeters: 550, description: "Jolly Grant entry point" },
    { label: "Kalsi Confluence", day: 1, altitudeMeters: 520, description: "Yamuna-Tons river meeting point" },
    { label: "Chakrata Cantonment", day: 1, altitudeMeters: 2118, description: "Secluded deodar ridge (7,000 ft)" },
    { label: "Tiger Falls Base", day: 2, altitudeMeters: 1400, description: "312 ft direct single-plunge waterfall" },
    { label: "Jaunsari Hamlets", day: 2, altitudeMeters: 1800, description: "Timber-and-stone carved tribal villages" },
    { label: "Deoban Forest Reserve", day: 3, altitudeMeters: 2870, description: "God's Own Forest - 55 peak viewpoint (9,400 ft)" },
    { label: "Chilmiri Neck", day: 3, altitudeMeters: 2160, description: "Cantonment sunset plateau" },
    { label: "Kalsi Ashokan Edicts", day: 4, altitudeMeters: 520, description: "250 BC Maurayan rock inscription" },
    { label: "Dehradun Airport", day: 4, altitudeMeters: 550, description: "Return flight departure" },
  ],
  "kanatal-4-days": [
    { label: "Dehradun Airport", day: 1, altitudeMeters: 550, description: "Arrival in Doon valley" },
    { label: "Narendra Nagar", day: 1, altitudeMeters: 1120, description: "Scenic Ganga overlook highway" },
    { label: "Kanatal Ridge", day: 1, altitudeMeters: 2590, description: "Peaceful pine & oak sanctuary (8,500 ft)" },
    { label: "Kaddukhal Base", day: 2, altitudeMeters: 2560, description: "Trailhead for Surkhanda Devi" },
    { label: "Surkhanda Devi Temple", day: 2, altitudeMeters: 3048, description: "Sacred Shaktipeeth summit (9,995 ft)" },
    { label: "Kaudia Forest Reserve", day: 3, altitudeMeters: 2650, description: "Dense deodar forest & wildlife trails" },
    { label: "Tehri Reservoir Overlook", day: 3, altitudeMeters: 1750, description: "Turquoise mountain lake vista" },
    { label: "Dhanaulti Eco Park", day: 4, altitudeMeters: 2286, description: "Century-old deodars & nature walk" },
    { label: "Dehradun Airport", day: 4, altitudeMeters: 550, description: "Return flight departure" },
  ],
  "chaukori-5-days": [
    { label: "Pantnagar / Kathgodam", day: 1, altitudeMeters: 554, description: "Kumaon plains entry" },
    { label: "Almora Ridge", day: 1, altitudeMeters: 1638, description: "Historic cultural hub" },
    { label: "Chaukori Tea Bowl", day: 1, altitudeMeters: 2010, description: "British tea estate (6,600 ft)" },
    { label: "Chaukori Watch Tower", day: 2, altitudeMeters: 2030, description: "180° uninterrupted Himalayan sunrise" },
    { label: "Patal Bhuvaneshwar", day: 3, altitudeMeters: 1350, description: "Subterranean limestone cave complex" },
    { label: "Berinag Tea Slopes", day: 4, altitudeMeters: 1740, description: "Ancient serpent shrines & tea estates" },
    { label: "Gangolihat Hat Kalika", day: 4, altitudeMeters: 1760, description: "Medieval Shaktipeeth shrine" },
    { label: "Jageshwar Dham", day: 5, altitudeMeters: 1870, description: "124 stone temples in sacred deodar grove" },
    { label: "Kathgodam / Return", day: 5, altitudeMeters: 554, description: "Plains return station" },
  ],
  "gurez-valley-5-days": [
    { label: "Srinagar Airport", day: 1, altitudeMeters: 1585, description: "Kashmir valley gateway" },
    { label: "Bandipora / Wular Lake", day: 1, altitudeMeters: 1580, description: "Shoreline base before mountain climb" },
    { label: "Razdan Pass", day: 1, altitudeMeters: 3558, description: "Snow pass with 360° views of Harmukh peak (11,672 ft)" },
    { label: "Dawar Basecamp", day: 1, altitudeMeters: 2370, description: "Gurez Valley capital on Kishanganga river" },
    { label: "Habba Khatoon Peak Base", day: 2, altitudeMeters: 2450, description: "Pyramid peak named after poetess queen" },
    { label: "Achura Heritage Village", day: 2, altitudeMeters: 2360, description: "Ancient wooden log-house hamlets" },
    { label: "Barnoi Gorge", day: 3, altitudeMeters: 2400, description: "Pristine river canyon entrance" },
    { label: "Tulail Valley", day: 3, altitudeMeters: 2550, description: "Remote Shina-speaking border frontier" },
    { label: "Bagtore LoC Viewpoint", day: 4, altitudeMeters: 2480, description: "Border outpost overlooking Neelum valley" },
    { label: "Razdan Pass", day: 5, altitudeMeters: 3558, description: "Final mountain pass crossing" },
    { label: "Srinagar Airport", day: 5, altitudeMeters: 1585, description: "Return flight departure" },
  ],
  "aru-valley-4-days": [
    { label: "Srinagar Airport", day: 1, altitudeMeters: 1585, description: "Arrival in Kashmir" },
    { label: "Pahalgam Valley", day: 1, altitudeMeters: 2130, description: "Lidder river confluence town" },
    { label: "Aru Valley Meadows", day: 1, altitudeMeters: 2414, description: "Emerald alpine pastures & pine rim (7,920 ft)" },
    { label: "Pine Woodland Trail", day: 2, altitudeMeters: 2600, description: "Rhododendron and fir forest ascent" },
    { label: "Lidderwat Alpine Base", day: 2, altitudeMeters: 2780, description: "Camp beside roaring Lidder river stream (9,120 ft)" },
    { label: "Kotpatri Forest Stream", day: 3, altitudeMeters: 2520, description: "Glacial stream and wildflower meadows" },
    { label: "Overa-Aru Sanctuary", day: 3, altitudeMeters: 2550, description: "Habitat of the endangered Kashmiri Stag (Hangul)" },
    { label: "Betaab Valley Overlook", day: 4, altitudeMeters: 2300, description: "Scenic descent to Pahalgam" },
    { label: "Srinagar Airport", day: 4, altitudeMeters: 1585, description: "Return flight departure" },
  ],
  "yusmarg-4-days": [
    { label: "Srinagar Airport", day: 1, altitudeMeters: 1585, description: "Flight arrival" },
    { label: "Charar-i-Sharief", day: 1, altitudeMeters: 1920, description: "Historic Sufi shrine hill" },
    { label: "Yusmarg Grasslands", day: 1, altitudeMeters: 2396, description: "The Meadow of Jesus surrounded by Pir Panjal (7,861 ft)" },
    { label: "Doodhganga River Gorge", day: 2, altitudeMeters: 2250, description: "Frothing white mountain river rapids" },
    { label: "Nilnag Alpine Lake", day: 2, altitudeMeters: 2180, description: "Pine-rimmed emerald natural spring lake" },
    { label: "Dragdolan High Pasture", day: 3, altitudeMeters: 2650, description: "Sweeping views of Sunset Peak & Tatakoti" },
    { label: "Sang-e-Safed Meadow", day: 3, altitudeMeters: 2900, description: "White rock valley fed by melting snow fields (9,514 ft)" },
    { label: "Srinagar Airport", day: 4, altitudeMeters: 1585, description: "Return flight departure" },
  ],
  "turtuk-5-days": [
    { label: "Leh Airport", day: 1, altitudeMeters: 3524, description: "High altitude arrival — strict rest day" },
    { label: "South Pullu Checkpost", day: 2, altitudeMeters: 4600, description: "Permit verification point" },
    { label: "Khardung La Pass", day: 2, altitudeMeters: 5359, description: "World's iconic motorable pass (17,582 ft)" },
    { label: "Diskit / Hunder", day: 2, altitudeMeters: 3100, description: "Nubra sand dunes and double-humped camels" },
    { label: "Shyok River Gorge", day: 3, altitudeMeters: 3000, description: "Carved river canyon cutting through Karakoram" },
    { label: "Turtuk Village", day: 3, altitudeMeters: 2850, description: "Northernmost Balti village in India (9,350 ft)" },
    { label: "Tyakshi Border Outpost", day: 4, altitudeMeters: 2800, description: "Ancient LoC line of control checkpoint" },
    { label: "Thang Frontier Hamlet", day: 4, altitudeMeters: 2750, description: "Last civilian point on the northern frontier" },
    { label: "Khardung La Pass", day: 5, altitudeMeters: 5359, description: "High pass return crossing" },
    { label: "Leh Airport", day: 5, altitudeMeters: 3524, description: "Departure flight home" },
  ],
  "basgo-4-days": [
    { label: "Leh Airport", day: 1, altitudeMeters: 3524, description: "Arrival and acclimatization" },
    { label: "Magnetic Hill", day: 2, altitudeMeters: 3350, description: "Gravity-defying highway phenomenon" },
    { label: "Indus-Zanskar Sangam", day: 2, altitudeMeters: 3050, description: "Confluence of turquoise and muddy mountain rivers" },
    { label: "Basgo Citadel & Gompa", day: 2, altitudeMeters: 3292, description: "Ruined clay fortress & 16th-c Maitreya Buddha (10,800 ft)" },
    { label: "Likir Monastery", day: 3, altitudeMeters: 3700, description: "Colossal 75-ft gilded outdoor Buddha statue" },
    { label: "Alchi Choskor", day: 3, altitudeMeters: 3100, description: "11th-century Kashmiri-style Buddhist wood temples" },
    { label: "Saspol Rock Caves", day: 3, altitudeMeters: 3150, description: "Painted meditation caves on sheer cliff" },
    { label: "Leh Airport", day: 4, altitudeMeters: 3524, description: "Departure flight home" },
  ],
  "chumathang-4-days": [
    { label: "Leh Airport", day: 1, altitudeMeters: 3524, description: "Arrival and rest in Leh" },
    { label: "Upshi Checkpost", day: 2, altitudeMeters: 3450, description: "Indus river highway toll and fuel junction" },
    { label: "Chumathang Hot Springs", day: 2, altitudeMeters: 3962, description: "Geothermal sulfur springs beside icy Indus (13,000 ft)" },
    { label: "Mahe Bridge Gateway", day: 3, altitudeMeters: 4100, description: "Entry gate to high Changthang plateau" },
    { label: "Sumdo Nomadic Pastures", day: 3, altitudeMeters: 4350, description: "Tibetan wild ass (Kiang) sightings" },
    { label: "Kyagar Tso Vantage", day: 3, altitudeMeters: 4570, description: "Turquoise brackish lake view (15,000 ft)" },
    { label: "Leh Airport", day: 4, altitudeMeters: 3524, description: "Departure flight home" },
  ],
  "hanle-5-days": [
    { label: "Leh Airport", day: 1, altitudeMeters: 3524, description: "Acclimatization day in Leh (mandatory)" },
    { label: "Chumathang", day: 2, altitudeMeters: 3962, description: "Hot springs rest stop" },
    { label: "Loma Checkpost", day: 2, altitudeMeters: 4200, description: "Army border verification gate" },
    { label: "Hanle Dark Sky Reserve", day: 2, altitudeMeters: 4500, description: "High-altitude astronomical sanctuary (14,760 ft)" },
    { label: "Hanle Monastery Hill", day: 3, altitudeMeters: 4600, description: "17th-century Drukpa Kagyu cliff monastery" },
    { label: "Indian Astronomical Observatory", day: 3, altitudeMeters: 4500, description: "World's highest optical telescope dome" },
    { label: "Photi La / Umling La Gateway", day: 4, altitudeMeters: 5200, description: "Extremely high desert pass route (17,000+ ft)" },
    { label: "Hanle Khaldo", day: 4, altitudeMeters: 4500, description: "Changpa nomadic settlement and night astrophotography" },
    { label: "Leh Airport", day: 5, altitudeMeters: 3524, description: "Departure flight home" },
  ],
  "kuldhara-4-days": [
    { label: "Jodhpur Airport", day: 1, altitudeMeters: 230, description: "Arrival transit from Mumbai/Pune" },
    { label: "Pokhran", day: 1, altitudeMeters: 233, description: "Midway highway oasis" },
    { label: "Jaisalmer Golden City", day: 1, altitudeMeters: 225, description: "Check-in overlooking Sonar Qila" },
    { label: "Kuldhara Ghost Village", day: 2, altitudeMeters: 210, description: "Ruined Paliwal sandstone settlement" },
    { label: "Khaba Fort Ruins", day: 2, altitudeMeters: 205, description: "Medieval desert outpost & peacock feeding" },
    { label: "Sam Sand Dunes", day: 2, altitudeMeters: 190, description: "Shifting Thar desert dunes & camel safari" },
    { label: "Desert National Park", day: 3, altitudeMeters: 180, description: "Great Indian Bustard sanctuary" },
    { label: "Bada Bagh Cenotaphs", day: 3, altitudeMeters: 240, description: "Royal carved chhatris at sunset" },
    { label: "Jaisalmer Fort", day: 4, altitudeMeters: 250, description: "Living fort exploration" },
    { label: "Departure Airport", day: 4, altitudeMeters: 230, description: "Return flight home" },
  ],
  "narlai-4-days": [
    { label: "Udaipur Airport", day: 1, altitudeMeters: 598, description: "Arrival in Mewar" },
    { label: "Gogunda Aravalli Pass", day: 1, altitudeMeters: 810, description: "High forested pass route" },
    { label: "Ranakpur Jain Temple", day: 1, altitudeMeters: 486, description: "1,444 carved marble pillars valley" },
    { label: "Narlai Heritage Village", day: 2, altitudeMeters: 430, description: "Rawla Narlai royal hunting seat" },
    { label: "Elephant Rock (Jharokha Rock)", day: 2, altitudeMeters: 650, description: "Granite monolith summit climb" },
    { label: "Narlai Baoli Stepwell", day: 2, altitudeMeters: 425, description: "Atmospheric 110-lamp stepwell feast" },
    { label: "Kumbhalgarh Fort Wall", day: 3, altitudeMeters: 1050, description: "Great Wall of India (high ridge)" },
    { label: "Aravalli Leopard Scrub", day: 3, altitudeMeters: 720, description: "Granite hillocks leopard safari" },
    { label: "Udaipur Airport", day: 4, altitudeMeters: 598, description: "Departure flight home" },
  ],
  "khimsar-4-days": [
    { label: "Jodhpur Airport", day: 1, altitudeMeters: 230, description: "Touchdown in Marwar" },
    { label: "Mandore Gardens", day: 1, altitudeMeters: 245, description: "Ancient Marwar capital cenotaphs" },
    { label: "Khimsar Fort", day: 1, altitudeMeters: 290, description: "16th-century fortress check-in" },
    { label: "Khimsar Fort Ramparts", day: 2, altitudeMeters: 310, description: "Walk along artillery parapets" },
    { label: "Khimsar Dunes Village", day: 2, altitudeMeters: 335, description: "Private sand dunes & desert lake" },
    { label: "Nagaur Fort (Ahhichatragarh)", day: 3, altitudeMeters: 302, description: "Sultanate Mughal water palaces" },
    { label: "Panchala Blackbuck Reserve", day: 3, altitudeMeters: 295, description: "Antelope & gazelle herds safari" },
    { label: "Jodhpur Airport", day: 4, altitudeMeters: 230, description: "Return flight to Mumbai/Pune" },
  ],
  "bhangarh-4-days": [
    { label: "Jaipur Airport", day: 1, altitudeMeters: 431, description: "Arrival in Pink City" },
    { label: "Dausa Highway", day: 1, altitudeMeters: 320, description: "Rural Rajasthan corridor" },
    { label: "Chand Baori, Abhaneri", day: 1, altitudeMeters: 280, description: "World's deepest ancient stepwell" },
    { label: "Gola ka Baas", day: 2, altitudeMeters: 310, description: "Gateway to Bhangarh" },
    { label: "Bhangarh Fort Ruins", day: 2, altitudeMeters: 390, description: "Ruined citadel & Someshwar temple" },
    { label: "Sariska Tiger Reserve", day: 3, altitudeMeters: 420, description: "Morning Royal Bengal Tiger safari" },
    { label: "Kankwari Fort Hill", day: 3, altitudeMeters: 510, description: "Isolated hill fortress in jungle" },
    { label: "Jaipur Airport", day: 4, altitudeMeters: 431, description: "Return flight home" },
  ],
  "bishnoi-villages-3-days": [
    { label: "Jodhpur Airport", day: 1, altitudeMeters: 230, description: "Touchdown in Blue City" },
    { label: "Guda Bishnoiyan Lake", day: 1, altitudeMeters: 240, description: "Blackbucks, cranes & deer sanctuary" },
    { label: "Salawas Weavers Village", day: 2, altitudeMeters: 225, description: "Master durry & rug weavers" },
    { label: "Kakani Pottery Hamlet", day: 2, altitudeMeters: 215, description: "Traditional terracotta wheel potters" },
    { label: "Khejarli Sacred Grove", day: 2, altitudeMeters: 235, description: "1730 AD tree conservation memorial" },
    { label: "Mehrangarh Fort Ridge", day: 3, altitudeMeters: 350, description: "Clifftop fortress panorama" },
    { label: "Jodhpur Airport", day: 3, altitudeMeters: 230, description: "Return flight home" },
  ],
  "dholavira-4-days": [
    { label: "Ahmedabad / Bhuj Airport", day: 1, altitudeMeters: 110, description: "Arrival in Gujarat" },
    { label: "Rapar Gateway", day: 1, altitudeMeters: 35, description: "Kutch countryside junction" },
    { label: "Road to Heaven (White Rann)", day: 2, altitudeMeters: 10, description: "Scenic highway cutting across salt desert" },
    { label: "Dholavira Harappan Citadel", day: 2, altitudeMeters: 30, description: "5,000-yr UNESCO Indus Valley reservoirs" },
    { label: "Khadir Bet Fossil Park", day: 3, altitudeMeters: 45, description: "Jurassic petrified wood tree trunks" },
    { label: "Great Rann Sunset Rim", day: 3, altitudeMeters: 8, description: "Pure white crystallized salt expanse" },
    { label: "Flamingo City Waters", day: 3, altitudeMeters: 5, description: "Breeding ground of greater flamingos" },
    { label: "Departure Airport", day: 4, altitudeMeters: 110, description: "Return flight home" },
  ],
  "mandvi-4-days": [
    { label: "Bhuj Airport", day: 1, altitudeMeters: 110, description: "Touchdown in central Kutch" },
    { label: "Prag Mahal & Aina Mahal", day: 1, altitudeMeters: 115, description: "19th-c Italian Gothic royal palaces" },
    { label: "Mandvi Coastal Port", day: 1, altitudeMeters: 15, description: "Arrival on Arabian Sea coast" },
    { label: "Rukmavati River Shipyard", day: 2, altitudeMeters: 8, description: "Hand-crafted wooden cargo dhow construction" },
    { label: "Mandvi Port Wharf", day: 2, altitudeMeters: 5, description: "Centuries-old spice trade harbor" },
    { label: "Vijay Vilas Royal Palace", day: 3, altitudeMeters: 35, description: "Red sandstone palace with jharokhas" },
    { label: "Palace Private Beach", day: 3, altitudeMeters: 3, description: "Secluded Arabian sea sands" },
    { label: "Wind Farm Beach", day: 3, altitudeMeters: 4, description: "Windmills line the surf at sunset" },
    { label: "Bhuj Airport", day: 4, altitudeMeters: 110, description: "Return flight home" },
  ],
  "poshina-3-days": [
    { label: "Ahmedabad Airport", day: 1, altitudeMeters: 53, description: "Arrival transit" },
    { label: "Himatnagar", day: 1, altitudeMeters: 127, description: "North Gujarat highway" },
    { label: "Darbargadh Poshina Palace", day: 1, altitudeMeters: 295, description: "15th-century royal palace check-in" },
    { label: "Terracotta Horse Shrines", day: 2, altitudeMeters: 310, description: "Sacred grove of thousands of votive clay horses" },
    { label: "Garasia & Bhil Villages", day: 2, altitudeMeters: 340, description: "Tribal silversmiths & arrow makers" },
    { label: "Lambadiya Forest Ridge", day: 2, altitudeMeters: 410, description: "Scenic Aravalli border hills" },
    { label: "Kumbhariya Jain Temples", day: 3, altitudeMeters: 520, description: "11th-century marble temple cluster" },
    { label: "Ahmedabad Airport", day: 3, altitudeMeters: 53, description: "Return flight home" },
  ],
  "champaner-pavagadh-3-days": [
    { label: "Vadodara Junction", day: 1, altitudeMeters: 39, description: "Arrival via Vande Bharat / Flight" },
    { label: "Champaner UNESCO Citadel", day: 1, altitudeMeters: 125, description: "16th-century capital of Mahmud Begada" },
    { label: "Jami Masjid Champaner", day: 1, altitudeMeters: 128, description: "Finest Indo-Islamic Sultanate mosque" },
    { label: "Manchi Foothills", day: 2, altitudeMeters: 380, description: "Base of Pavagadh volcanic hill" },
    { label: "Pavagadh Ropeway Terminal", day: 2, altitudeMeters: 720, description: "High-speed scenic cable car ascent" },
    { label: "Kalika Mata Temple Peak", day: 2, altitudeMeters: 822, description: "Sacred Shaktipeeth on volcanic summit" },
    { label: "Jambughoda Wildlife Sanctuary", day: 3, altitudeMeters: 195, description: "Teak forest flora & sloth bears" },
    { label: "Vadodara Departure", day: 3, altitudeMeters: 39, description: "Return train / flight home" },
  ],
  "palitana-3-days": [
    { label: "Bhavnagar Airport", day: 1, altitudeMeters: 24, description: "Arrival in Saurashtra" },
    { label: "Sihor Heritage Town", day: 1, altitudeMeters: 55, description: "Ancient copper craft center" },
    { label: "Palitana Taleti Base", day: 1, altitudeMeters: 150, description: "Starting point of Shatrunjaya pilgrimage" },
    { label: "Taleti Pilgrim Step Gate", day: 2, altitudeMeters: 160, description: "Begin 3,800 stone steps ascent" },
    { label: "Midway Rest Point (1500 Steps)", day: 2, altitudeMeters: 360, description: "Panoramic view of Shetrunji river" },
    { label: "Gauri Kund", day: 2, altitudeMeters: 510, description: "Sacred mountain reservoir" },
    { label: "Adinath Temple Summit", day: 2, altitudeMeters: 603, description: "Shatrunjaya peak with 900+ marble temples" },
    { label: "Taleti Descent", day: 2, altitudeMeters: 150, description: "Complete pilgrimage before sunset" },
    { label: "Bhavnagar Airport", day: 3, altitudeMeters: 24, description: "Return flight home" },
  ],
};

export function computeAMSRisk(points: ElevationPoint[]): AMSRiskAssessment {
  if (!points || points.length === 0) {
    return {
      riskLevel: "Low",
      maxAltitudeMeters: 0,
      maxAltitudeLocation: "None",
      steepestAscentDay: 0,
      steepestAscentMeters: 0,
      isHighAltitude: false,
      isAMSAlert: false,
      guidelines: ["Standard travel hydration and fitness suffice."],
    };
  }

  let maxAlt = 0;
  let maxLoc = "";
  let maxAscent = 0;
  let maxAscentDay = 1;

  for (let i = 0; i < points.length; i++) {
    if (points[i].altitudeMeters > maxAlt) {
      maxAlt = points[i].altitudeMeters;
      maxLoc = points[i].label;
    }
    if (i > 0) {
      const ascent = points[i].altitudeMeters - points[i - 1].altitudeMeters;
      if (ascent > maxAscent) {
        maxAscent = ascent;
        maxAscentDay = points[i].day;
      }
    }
  }

  const isHighAltitude = maxAlt >= 2500;
  let riskLevel: AMSRiskAssessment["riskLevel"] = "Low";

  if (maxAlt >= 4800 || maxAscent > 1400) {
    riskLevel = "Extreme";
  } else if (maxAlt >= 3800 || maxAscent > 900) {
    riskLevel = "High";
  } else if (maxAlt >= 2500 || maxAscent > 500) {
    riskLevel = "Moderate";
  }

  const guidelines: string[] = [];
  if (riskLevel === "Extreme" || riskLevel === "High") {
    guidelines.push("Mandatory 24–48 hr acclimatization with zero strenuous exertion upon first reaching > 3,000m.");
    guidelines.push("Drink at least 4 to 5 liters of water and electrolytes daily. Avoid alcohol and heavy tobacco.");
    guidelines.push("Consult a doctor regarding Acetazolamide (Diamox 125mg or 250mg) before ascending.");
    guidelines.push("Sleep lower than your daytime peak whenever possible ('Climb high, sleep low' rule).");
    guidelines.push("If severe headache, nausea, loss of coordination (HACE) or breathlessness at rest (HAPE) occurs, descend immediately by 500m–1,000m.");
  } else if (riskLevel === "Moderate") {
    guidelines.push("Hydrate well and pace yourself during initial climbs.");
    guidelines.push("Allow time for your body to adjust before undertaking steep summit hikes.");
  } else {
    guidelines.push("Low altitude profile. Standard hydration and comfortable pacing are recommended.");
  }

  const oxygenPoints: string[] = [];
  if (maxAlt > 3500) {
    oxygenPoints.push("SNM Hospital, Leh (24x7 Emergency & Hyperbaric Chamber)");
    oxygenPoints.push("Army & ITBP Medical Aid Posts along high passes (Khardung La, Chang La, Tanglang La)");
    oxygenPoints.push("District Hospital, Kaza, Spiti Valley");
    oxygenPoints.push("Government Primary Health Centre, Keylong & Diskit");
  }

  return {
    riskLevel,
    maxAltitudeMeters: maxAlt,
    maxAltitudeLocation: maxLoc,
    steepestAscentDay: maxAscentDay,
    steepestAscentMeters: maxAscent,
    isHighAltitude,
    isAMSAlert: riskLevel === "High" || riskLevel === "Extreme",
    guidelines,
    oxygenPoints: oxygenPoints.length > 0 ? oxygenPoints : undefined,
  };
}
