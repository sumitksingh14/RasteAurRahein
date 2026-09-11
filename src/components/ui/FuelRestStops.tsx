"use client";

import { Fuel, Coffee, Eye, Utensils, Banknote, Gauge, ExternalLink, MapPin, Navigation, Search, Sparkles } from "lucide-react";
import type { FuelStop } from "@/lib/types";

// ── Per-trip fuel & rest stop data ───────────────────────────────────────────
const FUEL_DATA: Record<string, FuelStop[]> = {
  "leh-ladakh-9-days": [
    { id: "ll_r1", name: "Leh Airport Taxi Stand", type: "rest", town: "Leh Airport (IXL)", distanceFromPrev: 0, altitude: 3256, notes: "Arrive, collect luggage, and rest in your vehicle. DO NOT rush — acclimatise slowly. Pre-book hotel transfer." },
    { id: "ll_r2", name: "HPCL Pump, Leh (Main Town)", type: "fuel", town: "Leh City", distanceFromPrev: 5, altitude: 3524, notes: "FILL UP COMPLETELY — always fuel to full in Leh before any excursion. Next pump at Khardung La base (56 km, limited stock)." },
    { id: "ll_r3", name: "SBI ATM, Leh Market", type: "atm", town: "Leh Main Bazaar", distanceFromPrev: 1, altitude: 3524, notes: "Withdraw sufficient cash here — ATMs are non-existent in Nubra, Pangong, and Tso Moriri. Carry ₹10,000+ in cash." },
    { id: "ll_r4", name: "DC Office — Inner Line Permit", type: "rest", town: "Leh, J&K", distanceFromPrev: 1, altitude: 3524, notes: "Collect Restricted Area Permit (RAP) for Nubra Valley and Pangong Tso. Required by all Indian nationals. Carry Aadhaar/passport copies." },
    { id: "ll_r5", name: "Khardung La North Pullu Check Post", type: "rest", town: "Khardung La Base (North)", distanceFromPrev: 22, altitude: 4700, notes: "Army check post — show permit and ID. Fuel availability is limited and expensive here. Last toilet stop before the pass." },
    { id: "ll_r6", name: "Khardung La Pass Summit", type: "viewpoint", town: "Khardung La Pass", distanceFromPrev: 18, altitude: 5359, notes: "World's highest motorable road at 5,359 m. Photo stop — 15–20 minutes MAX. AMS risk is real. Military canteen serves hot tea and Maggi. Do NOT run." },
    { id: "ll_r7", name: "Diskit Fuel Point, Nubra", type: "fuel", town: "Diskit, Nubra Valley", distanceFromPrev: 60, altitude: 3260, notes: "Only fuel available in Nubra Valley. Fill up here before heading to Hunder or Turtuk. May have queues — go early morning." },
    { id: "ll_r8", name: "Diskit Monastery Parking", type: "viewpoint", town: "Diskit, Nubra Valley", distanceFromPrev: 2, altitude: 3260, notes: "Ladakh's oldest monastery (1420 AD) with giant Maitreya Buddha overlooking Nubra. 15-min walk to the top — worth every step." },
    { id: "ll_r9", name: "Hunder Sand Dunes Rest Stop", type: "rest", town: "Hunder, Nubra Valley", distanceFromPrev: 7, altitude: 3100, notes: "Bactrian camel safaris start here (₹250/person). Park and walk to the dunes — 10-minute walk. Spectacular Karakoram mountain backdrop." },
    { id: "ll_r10", name: "Turtuk Check Post (Last Indian Village)", type: "rest", town: "Turtuk, Nubra Valley", distanceFromPrev: 83, altitude: 2990, notes: "Show Indian ID (no foreigners allowed beyond this point). Northernmost village in India — near LoC. Army-controlled area; be respectful." },
    { id: "ll_r11", name: "Agham Junction — Shyok Route Split", type: "rest", town: "Agham, Shyok Valley", distanceFromPrev: 90, altitude: 3320, notes: "Turn off towards Pangong via Shyok Valley (new road). Avoid old Khardung La route to save 3 hours. Road surface is rough — 4WD preferred." },
    { id: "ll_r12", name: "Durbuk Village Chai Stop", type: "food", town: "Durbuk, Shyok Valley", distanceFromPrev: 55, altitude: 3850, notes: "Only roadside dhaba on Shyok-Pangong route. Hot chai and Maggi. Last food stop before Pangong Tso. Top up water bottles here." },
    { id: "ll_r13", name: "Pangong Tso Entry Checkpoint", type: "rest", town: "Spangmik, Pangong Tso", distanceFromPrev: 50, altitude: 4350, notes: "Permit check by Army. Entry ₹100 per person (conservation fee). Photography towards Chinese side is restricted. No drone flying without permit." },
    { id: "ll_r14", name: "Chang La Pass", type: "viewpoint", town: "Chang La Pass", distanceFromPrev: 80, altitude: 5360, notes: "2nd highest motorable pass at 5,360 m. Quick stop — 15 min max. Hot tea at military canteen. Snow possible even in July. AMS protocol applies." },
    { id: "ll_r15", name: "Debring Dhaba — Lunch Stop", type: "food", town: "Debring Village, Ladakh", distanceFromPrev: 45, altitude: 4450, notes: "Only food stop between Chang La and Tso Moriri. Simple dal-rice and chai. Restroom available. Road turns south towards Rupshu beyond here." },
    { id: "ll_r16", name: "Rupshu / Tso Moriri Check Post", type: "rest", town: "Puga Valley, Rupshu", distanceFromPrev: 70, altitude: 4500, notes: "Present RAP for Tso Moriri / Rupshu district. Road from here to Korzok is rough and crosses volcanic Puga Valley hot springs area." },
    { id: "ll_r17", name: "Puga Valley Hot Springs", type: "viewpoint", town: "Puga Valley, Rupshu", distanceFromPrev: 20, altitude: 4500, notes: "Natural geothermal sulfur springs in the high Himalayas — a rare sight. Quick 20-min stop. Government is developing this as a geothermal energy site." },
    { id: "ll_r18", name: "Tanglang La Pass (Manali-Leh HW)", type: "viewpoint", town: "Tanglang La Pass", distanceFromPrev: 120, altitude: 5328, notes: "3rd highest motorable pass on the Manali-Leh Highway at 5,328 m. 'Thank God I Made It' board for photos. Short stop only. Moon-like Changthang plateau views." },
    { id: "ll_r19", name: "Morey Plains Roadside Stall", type: "food", town: "More Plains (Morey Plains)", distanceFromPrev: 30, altitude: 4600, notes: "One of the world's highest flat plateaus. Tent café serves hot Maggi and chai. Wild kiang (Tibetan wild ass) roam freely nearby." },
    { id: "ll_r20", name: "Indus-Zanskar Sangam, Nimmu", type: "viewpoint", town: "Nimmu, Leh District", distanceFromPrev: 90, altitude: 3050, notes: "The dramatic confluence of the Indus and Zanskar rivers — two distinct river colours. Great photo stop on the return to Leh. 5-minute stop." },
  ],
  "jyotirlinga-pilgrimage-road-trip": [
    { id: "jy_r1", name: "HP Pump, Nashik Phata", type: "fuel", town: "Nashik Phata, Pune", distanceFromPrev: 0, notes: "Fill up before Bhimashankar road. Mountain road ahead; last easy fuel station." },
    { id: "jy_r2", name: "Bhimashankar Forest Gate", type: "viewpoint", town: "Bhimashankar Wildlife Sanctuary", distanceFromPrev: 100, altitude: 1050, notes: "Check-in point for sanctuary. Beautiful Sahyadri forest trail starts here." },
    { id: "jy_r3", name: "Bhimashankar Temple Parking", type: "rest", town: "Bhimashankar", distanceFromPrev: 50, altitude: 1050, notes: "Park and walk 5 minutes to the Jyotirlinga. Keep temple dress code." },
    { id: "jy_r4", name: "BPCL Pump, Nashik", type: "fuel", town: "Nashik", distanceFromPrev: 120, notes: "Refuel before heading to Trimbakeshwar — 28 km ahead on NH-61." },
    { id: "jy_r5", name: "Trimbakeshwar Temple Area", type: "rest", town: "Trimbakeshwar", distanceFromPrev: 28, altitude: 750, notes: "Park at main lot. Walk to the temple ghats. Godavari river origin nearby." },
    { id: "jy_r6", name: "Brahmagiri Viewpoint", type: "viewpoint", town: "Brahmagiri Hill, Trimbakeshwar", distanceFromPrev: 5, altitude: 1298, notes: "Origin of River Godavari. 45-min trek from the base. Stunning valley view." },
    { id: "jy_r7", name: "Igatpuri Rest Stop", type: "food", town: "Igatpuri, NH-3", distanceFromPrev: 60, notes: "MTDC rest area on the Nashik–Aurangabad highway; good thali and restrooms." },
    { id: "jy_r8", name: "IOC Pump, Aurangabad", type: "fuel", town: "Aurangabad (Chhatrapati Sambhajinagar)", distanceFromPrev: 135, notes: "Full refuel before visiting Ellora and Grishneshwar." },
    { id: "jy_r9", name: "Grishneshwar Temple Lot", type: "rest", town: "Ellora Village", distanceFromPrev: 30, notes: "Park at designated lot. 5-minute walk to the temple. Photography not allowed inside." },
    { id: "jy_r10", name: "Ellora Caves Ticket Counter", type: "viewpoint", town: "Ellora, Aurangabad", distanceFromPrev: 1, notes: "UNESCO World Heritage Site. Budget 3–4 hours; hire a licensed guide." },
    { id: "jy_r11", name: "SBI ATM, Aurangabad", type: "atm", town: "Aurangabad", distanceFromPrev: 30, notes: "Withdraw cash before the Indore–Ujjain stretch. ATMs sparse on NH-52 through Madhya Pradesh." },
    { id: "jy_r12", name: "BPCL Pump, Jalgaon", type: "fuel", town: "Jalgaon, Maharashtra", distanceFromPrev: 130, notes: "Refuel on the Aurangabad–Indore highway. Long stretch to Indore ahead." },
    { id: "jy_r13", name: "Indore Bypass Rest", type: "food", town: "Indore Ring Road", distanceFromPrev: 220, notes: "Quick stop for Indori Poha and chai before the final 55 km to Ujjain." },
    { id: "jy_r14", name: "HPCL Pump, Ujjain", type: "fuel", town: "Ujjain, Madhya Pradesh", distanceFromPrev: 55, notes: "Top up before Omkareshwar. Station is 2 km from the Mahakaleshwar temple gate." },
    { id: "jy_r15", name: "Mahakaleshwar Temple Gate", type: "rest", town: "Ujjain", distanceFromPrev: 2, notes: "Park at sanctioned lot. Attend the Bhasma Aarti (4 AM) and Sandhya Aarti (7 PM)." },
    { id: "jy_r16", name: "Ram Ghat, Shipra River", type: "viewpoint", town: "Ujjain Ghats", distanceFromPrev: 1, notes: "Evening river walk. Aarti at sunset. Tea stalls line the ghat — great photo spot." },
    { id: "jy_r17", name: "Omkareshwar Bridge Fuel", type: "fuel", town: "Omkareshwar Road, MP", distanceFromPrev: 120, notes: "Small pump near the Narmada bridge. Last fuel before the island pilgrimage." },
    { id: "jy_r18", name: "Mandhata Island Ferry Ghat", type: "rest", town: "Omkareshwar", distanceFromPrev: 5, notes: "Leave vehicles at the mainland lot; cross via foot bridge or short boat to the island." },
    { id: "jy_r19", name: "Narmada River Boat Launch", type: "viewpoint", town: "Omkareshwar Island", distanceFromPrev: 1, notes: "Best views of the twin shrines from the water. Life vests mandatory on the boat." },
  ],
  "spiti-valley": [
    { id: "r1", name: "HPCL Pump, Manali", type: "fuel", town: "Manali", distanceFromPrev: 0, notes: "FILL UP FULLY — next reliable fuel is 210 km away." },
    { id: "r2", name: "Dhaba at Gramphu", type: "food", town: "Gramphu Junction", distanceFromPrev: 75, notes: "Last chai before Kunzum Pass. Also last mobile signal zone." },
    { id: "r3", name: "Kunzum Pass Top", type: "viewpoint", town: "Kunzum Pass", distanceFromPrev: 45, altitude: 4590, notes: "Mandatory puja stop; keep it under 30 min — altitude affects breathing." },
    { id: "r4", name: "HPCL Pump, Kaza", type: "fuel", town: "Kaza", distanceFromPrev: 90, notes: "Only pump in Spiti Valley. Also has ATM — withdraw enough cash." },
    { id: "r5", name: "Losar Dhaba", type: "food", town: "Losar", distanceFromPrev: 55, notes: "Only food stop between Chandratal and Kaza." },
    { id: "r6", name: "Ki Monastery Rest Area", type: "rest", town: "Ki, near Kaza", distanceFromPrev: 12, altitude: 4166, notes: "Toilets and a small chai stall. Stunning views." },
    { id: "r7", name: "Fuel Point, Tabo", type: "fuel", town: "Tabo", distanceFromPrev: 47, notes: "Small pump — may be out of stock on busy season days." },
    { id: "r8", name: "SBI ATM, Reckong Peo", type: "atm", town: "Reckong Peo", distanceFromPrev: 120, notes: "Withdraw before heading to Sangla — no ATMs further." },
    { id: "r9", name: "HPCL, Rampur", type: "fuel", town: "Rampur Bushahr", distanceFromPrev: 95, notes: "Final Spiti circuit fuel before Shimla highway." },
  ],
  "rajasthan-desert-kingdom": [
    { id: "rj1", name: "HP Pump, Jaipur (exit)", type: "fuel", town: "Jaipur", distanceFromPrev: 0, notes: "Fill up before NH48 — fuel stations sparse in desert stretches." },
    { id: "rj2", name: "Dhani Dhaba, Ajmer Road", type: "food", town: "Ajmer Road (NH48)", distanceFromPrev: 135, notes: "Great Rajasthani thali; recommended rest stop." },
    { id: "rj3", name: "BPCL Pump, Jodhpur", type: "fuel", town: "Jodhpur", distanceFromPrev: 210, notes: "Fill here before Jaisalmer road." },
    { id: "rj4", name: "Keru Dhaba, Barmer Road", type: "rest", town: "Barmer Road", distanceFromPrev: 90, notes: "Only shade and water for 100 km." },
    { id: "rj5", name: "Indian Oil, Jaisalmer", type: "fuel", town: "Jaisalmer", distanceFromPrev: 185, notes: "Fill here before Sam Dunes — Sam has no fuel." },
    { id: "rj6", name: "Sam Sand Dunes Viewpoint", type: "viewpoint", town: "Sam, Jaisalmer", distanceFromPrev: 42, notes: "Best sunset in Rajasthan — arrive by 5:30 PM." },
  ],
  "mysore-coorg-wayanad-ooty": [
    { id: "mc1", name: "HPCL, Mysore outskirts", type: "fuel", town: "Mysore", distanceFromPrev: 0 },
    { id: "mc2", name: "Viewpoint, Madikeri Ghat", type: "viewpoint", town: "Madikeri Ghats", distanceFromPrev: 120, notes: "15-minute walk to Raja's Seat viewpoint — worth it." },
    { id: "mc3", name: "Coorg Coffee Stall", type: "food", town: "Virajpet", distanceFromPrev: 35, notes: "Try fresh estate coffee — ₹20 a cup." },
    { id: "mc4", name: "BPCL, Mananthavady", type: "fuel", town: "Mananthavady, Wayanad", distanceFromPrev: 65, notes: "Fill here before Wayanad hills." },
    { id: "mc5", name: "Ooty Lake Parking", type: "rest", town: "Ooty", distanceFromPrev: 95, notes: "Paid parking ₹50; crowded on weekends — visit early morning." },
  ],
  "goa-beyond-beaches": [
    { id: "ga1", name: "HP Pump, Panaji", type: "fuel", town: "Panaji", distanceFromPrev: 0 },
    { id: "ga2", name: "Calangute Beach Promenade", type: "rest", town: "Calangute", distanceFromPrev: 16, notes: "Park near the Infantaria Café." },
    { id: "ga3", name: "Arambol Viewpoint", type: "viewpoint", town: "Arambol", distanceFromPrev: 30, notes: "Sweet Lake and sunset views — 20-min walk from parking." },
    { id: "ga4", name: "BPCL, Margao", type: "fuel", town: "Margao (South Goa)", distanceFromPrev: 60, notes: "Fill before heading to Palolem." },
  ],
  "sikkim-7-days": [
    { id: "sk1", name: "HPCL, Siliguri", type: "fuel", town: "Siliguri", distanceFromPrev: 0, notes: "Fill up — no fuel in Sikkim for 100+ km stretches." },
    { id: "sk2", name: "Rangpo Fuel Pump", type: "fuel", town: "Rangpo (Sikkim Entry)", distanceFromPrev: 80, notes: "Show Sikkim permit here. Last easy fuel before Gangtok." },
    { id: "sk3", name: "Nathula Pass Viewpoint (if permit)", type: "viewpoint", town: "Nathu La", distanceFromPrev: 55, altitude: 4310, notes: "India-China border. Need protected area permit booked in advance." },
    { id: "sk4", name: "Rumtek Monastery Rest Stop", type: "rest", town: "Rumtek", distanceFromPrev: 24, notes: "Beautiful monastery with small cafeteria." },
  ],
  "meghalaya-5-days": [
    { id: "mg1", name: "BPCL, Guwahati", type: "fuel", town: "Guwahati", distanceFromPrev: 0, notes: "Fill up before Meghalaya entry." },
    { id: "mg2", name: "Shillong Peak Viewpoint", type: "viewpoint", town: "Shillong", distanceFromPrev: 105, altitude: 1966, notes: "360° view of Shillong city and surrounding hills." },
    { id: "mg3", name: "Cherrapunji Fuel Station", type: "fuel", town: "Cherrapunji (Sohra)", distanceFromPrev: 56 },
    { id: "mg4", name: "Dawki River Bank", type: "rest", town: "Dawki", distanceFromPrev: 100, notes: "Park and walk to the crystal-clear Umngot riverbank." },
  ],
  "kerala-7-days": [
    { id: "kl1", name: "HP Pump, Cochin airport road", type: "fuel", town: "Kochi", distanceFromPrev: 0 },
    { id: "kl2", name: "Alleppey Boat Jetty", type: "rest", town: "Alleppey", distanceFromPrev: 55, notes: "Houseboat boarding point — arrive 30 min early." },
    { id: "kl3", name: "BPCL, Kottayam", type: "fuel", town: "Kottayam", distanceFromPrev: 45 },
    { id: "kl4", name: "Munnar Tea Garden Overlook", type: "viewpoint", town: "Top Station, Munnar", distanceFromPrev: 95, altitude: 1700, notes: "Best sunrise viewpoint in Munnar; arrive before 7 AM." },
    { id: "kl5", name: "Thekkady (Periyar) Entry", type: "rest", town: "Thekkady", distanceFromPrev: 85, notes: "Boat safari booking counter is right at the gate." },
  ],
  "munsiyari-6-days": [
    { id: "mn1", name: "IOC Pump, Haldwani", type: "fuel", town: "Haldwani", distanceFromPrev: 0, notes: "Fill here — last reliable pump before mountain roads." },
    { id: "mn2", name: "Almora Rest Stop", type: "rest", town: "Almora", distanceFromPrev: 90, notes: "Great views and the famous Almora Bal Mithai sweet shops." },
    { id: "mn3", name: "BPCL, Pithoragarh", type: "fuel", town: "Pithoragarh", distanceFromPrev: 100 },
    { id: "mn4", name: "Birthi Waterfall Viewpoint", type: "viewpoint", town: "Birthi Falls", distanceFromPrev: 65, notes: "140m waterfall — short 10-min walk from road." },
    { id: "mn5", name: "Thal Fuel Stop", type: "fuel", town: "Thal", distanceFromPrev: 28, notes: "Last fuel before Munsiyari." },
    { id: "mn6", name: "Khaliya Top Start", type: "rest", town: "Munsiyari", distanceFromPrev: 30, altitude: 2200, notes: "Park at Khaliya Top trailhead; overnight camping gear pickup." },
  ],
  "char-dham-yatra-uttarakhand": [
    { id: "cd1", name: "HPCL, Rishikesh", type: "fuel", town: "Rishikesh", distanceFromPrev: 0, notes: "Fill up before Devprayag ghats — mountain roads ahead." },
    { id: "cd2", name: "Devprayag Sangam Viewpoint", type: "viewpoint", town: "Devprayag", distanceFromPrev: 72, notes: "Bhagirathi meets Alaknanda — sacred confluence, quick stop." },
    { id: "cd3", name: "Fuel, Rudraprayag", type: "fuel", town: "Rudraprayag", distanceFromPrev: 67 },
    { id: "cd4", name: "Gaurikund Parking Lot", type: "rest", town: "Gaurikund", distanceFromPrev: 75, notes: "Vehicle stays here; 22 km trek to Kedarnath starts." },
    { id: "cd5", name: "Fuel, Joshimath", type: "fuel", town: "Joshimath", distanceFromPrev: 178, notes: "Top up before Badrinath — next pump is far." },
  ],
  "panch-kedar-trek-10-days": [
    { id: "pk1", name: "HPCL, Rishikesh", type: "fuel", town: "Rishikesh", distanceFromPrev: 0, notes: "Fill up — no vehicle fuel beyond Chopta." },
    { id: "pk2", name: "Chopta Trailhead Parking", type: "rest", town: "Chopta", distanceFromPrev: 225, altitude: 2900, notes: "Leave vehicle here. Tungnath shrine is 3.5 km trek." },
    { id: "pk3", name: "Madhyamaheshwar Base Camp", type: "rest", town: "Ransi Village", distanceFromPrev: 120, notes: "Drive back to Ukhimath; Ransi is the trek start for Madhyamaheshwar." },
  ],
  "pune-konkan-coast-raigad": [
    { id: "pu1", name: "HP Pump, Pune exit", type: "fuel", town: "Pune", distanceFromPrev: 0, notes: "Fill before NH66 coastal highway." },
    { id: "pu2", name: "Tamhini Ghat Viewpoint", type: "viewpoint", town: "Tamhini Ghat", distanceFromPrev: 65, notes: "Stunning Sahyadri waterfall views in monsoon/post-monsoon." },
    { id: "pu3", name: "Murud Beach Rest", type: "rest", town: "Murud", distanceFromPrev: 75, notes: "Ferry to Janjira Fort leaves from here — check tide times." },
    { id: "pu4", name: "BPCL, Diveagar", type: "fuel", town: "Diveagar", distanceFromPrev: 55, notes: "Small pump — may close early." },
    { id: "pu5", name: "Shrivardhan Beach Cafe", type: "food", town: "Shrivardhan", distanceFromPrev: 30, notes: "Fresh coconut and seafood right on the beach." },
  ],
  "khaliya-top-5-days": [
    { id: "kht_st1", name: "IOC Pump, Haldwani / Kathgodam", type: "fuel", town: "Haldwani", distanceFromPrev: 0, notes: "Fill fuel before heading into Kumaon mountain highway." },
    { id: "kht_st2", name: "Almora Shikhar Rest Stop", type: "food", town: "Almora", distanceFromPrev: 90, notes: "Famous for Almora Bal Mithai and hot pahadi ginger tea." },
    { id: "kht_st3", name: "Bageshwar River Confluence", type: "rest", town: "Bageshwar", distanceFromPrev: 75, altitude: 1004, notes: "Bagnath Temple riverside rest; last major ATM hub." },
    { id: "kht_st4", name: "Thal Fuel Station", type: "fuel", town: "Thal", distanceFromPrev: 55, notes: "Last reliable petrol pump before Munsiyari and Khaliya Top." },
    { id: "kht_st5", name: "Birthi Waterfall Viewpoint", type: "viewpoint", town: "Birthi Falls", distanceFromPrev: 38, altitude: 2000, notes: "126 m cascade crashing down beside the road." },
    { id: "kht_st6", name: "Balanti Bend Trailhead", type: "rest", town: "Munsiyari / Balanti", distanceFromPrev: 32, altitude: 2450, notes: "Trailhead parking for Khaliya Bugyal hike." },
  ],
  "chakrata-4-days": [
    { id: "ckt_st1", name: "HP Fuel Station, Vikasnagar", type: "fuel", town: "Vikasnagar", distanceFromPrev: 0, notes: "Fill up before the steep 50 km mountain climb to Chakrata." },
    { id: "ckt_st2", name: "Kalsi Yamuna Bridge", type: "rest", town: "Kalsi", distanceFromPrev: 15, altitude: 520, notes: "Rest stop near Ashokan 250 BC rock edicts." },
    { id: "ckt_st3", name: "Sahiya Mountain Bazaar", type: "food", town: "Sahiya", distanceFromPrev: 25, altitude: 1100, notes: "Mid-way tea stall and fresh mountain pakoras." },
    { id: "ckt_st4", name: "Chakrata Sadar Bazaar", type: "rest", town: "Chakrata", distanceFromPrev: 28, altitude: 2118, notes: "Quiet cantonment market; ATMs and cafes." },
    { id: "ckt_st5", name: "Tiger Falls Trail Entry", type: "viewpoint", town: "Tiger Falls Road", distanceFromPrev: 18, altitude: 1750, notes: "Vehicle drop point for 5 km nature hike to the 312 ft falls." },
    { id: "ckt_st6", name: "Deoban Forest Gate", type: "rest", town: "Deoban", distanceFromPrev: 14, altitude: 2870, notes: "4x4 entry gate for God's Own Forest (9,400 ft)." },
  ],
  "kanatal-4-days": [
    { id: "knt_st1", name: "BPCL, Rishikesh Bypass / Narendra Nagar", type: "fuel", town: "Narendra Nagar", distanceFromPrev: 0, notes: "Top up fuel before entering the Chamba-Kanatal ridge." },
    { id: "knt_st2", name: "Chamba Main Junction", type: "food", town: "Chamba (Garhwal)", distanceFromPrev: 55, altitude: 1600, notes: "Hub town with ATMs, bakeries, and route bifurcation to Tehri Dam." },
    { id: "knt_st3", name: "Kaddukhal Surkhanda Base", type: "rest", town: "Kaddukhal", distanceFromPrev: 16, altitude: 2560, notes: "Parking and ropeway ticket counter for Surkhanda Devi Temple." },
    { id: "knt_st4", name: "Kanatal Pine Ridge Rest", type: "viewpoint", town: "Kanatal", distanceFromPrev: 8, altitude: 2590, notes: "Panoramic view deck facing Chaukhamba and Bandarpunch peaks." },
    { id: "knt_st5", name: "Kaudia Forest Trailhead", type: "rest", town: "Kaudia Forest", distanceFromPrev: 6, altitude: 2650, notes: "Entry gate for tranquil 6 km pine and deodar forest nature walk." },
  ],
  "chaukori-5-days": [
    { id: "chk_st1", name: "HP Pump, Kathgodam", type: "fuel", town: "Kathgodam", distanceFromPrev: 0, notes: "Fill tank before embarking on the Kumaon highway." },
    { id: "chk_st2", name: "Bhimtal Lake Rest Stop", type: "rest", town: "Bhimtal", distanceFromPrev: 22, altitude: 1370, notes: "Lakeside tea and breakfast before the mountain ascent." },
    { id: "chk_st3", name: "Almora Bypass Fuel Pump", type: "fuel", town: "Almora", distanceFromPrev: 68, altitude: 1638, notes: "Reliable fuel and ATM point." },
    { id: "chk_st4", name: "Danya Ghat Rest Point", type: "food", town: "Danya", distanceFromPrev: 45, notes: "Riverside snack point with fresh Pahadi fruit stalls." },
    { id: "chk_st5", name: "Chaukori Tea Estate Viewpoint", type: "viewpoint", town: "Chaukori", distanceFromPrev: 50, altitude: 2010, notes: "Front-row watchtower facing Nanda Devi and Trishul." },
    { id: "chk_st6", name: "Patal Bhuvaneshwar Complex", type: "rest", town: "Patal Bhuvaneshwar", distanceFromPrev: 35, altitude: 1350, notes: "Underground limestone cave counter and shoe stall." },
  ],
  "gurez-valley-5-days": [
    { id: "gur_st1", name: "Indian Oil Pump, Bandipora", type: "fuel", town: "Bandipora", distanceFromPrev: 0, altitude: 1580, notes: "MANDATORY REFUEL. Last reliable commercial fuel station before crossing Razdan Pass into Gurez." },
    { id: "gur_st2", name: "Tragbal Viewpoint", type: "viewpoint", town: "Tragbal", distanceFromPrev: 18, altitude: 2750, notes: "Stunning panorama over Wular Lake and Pir Panjal mountains before the pass ascent." },
    { id: "gur_st3", name: "Razdan Pass Summit", type: "viewpoint", town: "Razdan Pass", distanceFromPrev: 24, altitude: 3557, notes: "Highest point of the pass at 11,672 ft. Photo stop; Army checkpost clearance." },
    { id: "gur_st4", name: "Dawar Army Checkpost & Town Entry", type: "rest", town: "Dawar, Gurez", distanceFromPrev: 42, altitude: 2370, notes: "Entry checkpoint for Gurez Valley. Present ID proofs. Small local diesel pump in town." },
    { id: "gur_st5", name: "Tulail Road Junction", type: "rest", town: "Kanzalwan / Tulail Fork", distanceFromPrev: 15, altitude: 2420, notes: "Bridge over Kishanganga towards Sheikhpora and Badugam." },
  ],
  "aru-valley-4-days": [
    { id: "aru_st1", name: "Srinagar Highway HPCL Fuel Station", type: "fuel", town: "Pampore / Awantipora", distanceFromPrev: 0, altitude: 1590, notes: "Top up fuel before entering Lidder Valley." },
    { id: "aru_st2", name: "Awantipora Ruins Rest Stop", type: "rest", town: "Awantipora", distanceFromPrev: 30, altitude: 1600, notes: "Tea stall, restrooms, and 9th-century temple ruins along NH-44." },
    { id: "aru_st3", name: "Pahalgam Taxi Stand & IOC Petrol Pump", type: "fuel", town: "Pahalgam Main Town", distanceFromPrev: 55, altitude: 2130, notes: "Last official petrol pump before Aru Valley (12 km ahead). Taxi union transfers." },
    { id: "aru_st4", name: "Aru Eco Trailhead Parking", type: "rest", town: "Aru Valley", distanceFromPrev: 12, altitude: 2414, notes: "Meadow parking, trail guides, pony stand, and hot chai shacks." },
  ],
  "yusmarg-4-days": [
    { id: "yus_st1", name: "Bharat Petroleum, Budgam Bypass", type: "fuel", town: "Budgam", distanceFromPrev: 0, altitude: 1610, notes: "Primary fuel station on the Srinagar–Yusmarg road." },
    { id: "yus_st2", name: "Charar-i-Sharief Shrine Plaza", type: "rest", town: "Charar-i-Sharief", distanceFromPrev: 28, altitude: 1980, notes: "Historic Sufi shrine, ATM, and local bakeries with crisp girda bread." },
    { id: "yus_st3", name: "Nagam Junction Rest Point", type: "food", town: "Nagam", distanceFromPrev: 8, altitude: 1850, notes: "Fruit stalls selling fresh Kashmiri apples and walnuts in season." },
    { id: "yus_st4", name: "Yusmarg Meadow Gate & Tourist Center", type: "rest", town: "Yusmarg", distanceFromPrev: 11, altitude: 2396, notes: "Main parking lot, JKTDC information desk, pony stand, and cafe." },
  ],
  "turtuk-5-days": [
    { id: "tur_st1", name: "HPCL Pump, Leh Main Town", type: "fuel", town: "Leh", distanceFromPrev: 0, altitude: 3524, notes: "MANDATORY FULL REFUEL before Khardung La ascent. Next fuel is 115 km away in Diskit." },
    { id: "tur_st2", name: "South Pullu Army Checkpost", type: "rest", town: "Khardung La South", distanceFromPrev: 24, altitude: 4600, notes: "Permit inspection and medical emergency post." },
    { id: "tur_st3", name: "Khardung La Pass Summit", type: "viewpoint", town: "Khardung La Pass", distanceFromPrev: 15, altitude: 5359, notes: "World's highest motorable pass at 17,982 ft. 15-min limit; Indian Army tea canteen." },
    { id: "tur_st4", name: "Diskit Petrol Pump", type: "fuel", town: "Diskit, Nubra Valley", distanceFromPrev: 76, altitude: 3144, notes: "The ONLY operating petrol pump in Nubra Valley. Must fill up before Turtuk (90 km round-trip has zero fuel)." },
    { id: "tur_st5", name: "Bogdang Village Army Checkpost", type: "rest", town: "Bogdang", distanceFromPrev: 65, altitude: 2950, notes: "Frontier checkpost transitioning from Buddhist Nubra into Balti Muslim region." },
    { id: "tur_st6", name: "Turtuk Wooden Bridge Parking", type: "rest", town: "Turtuk Farol", distanceFromPrev: 25, altitude: 2900, notes: "Vehicle terminal. Walk across wooden suspension bridge into vehicle-free village paths." },
  ],
  "basgo-4-days": [
    { id: "bas_st1", name: "Indian Oil Pump, Spituk", type: "fuel", town: "Spituk, Leh Bypass", distanceFromPrev: 0, altitude: 3300, notes: "First fuel station on the Leh-Srinagar Highway heading west." },
    { id: "bas_st2", name: "Magnetic Hill Lay-by", type: "viewpoint", town: "Magnetic Hill", distanceFromPrev: 25, altitude: 3350, notes: "Marked yellow vehicle box demonstrating gravity anomaly." },
    { id: "bas_st3", name: "Nimmu Indus-Zanskar Sangam Viewpoint", type: "viewpoint", town: "Nimmu", distanceFromPrev: 7, altitude: 3100, notes: "Panoramic cliffside rest stop with juice stalls and clean restrooms." },
    { id: "bas_st4", name: "Basgo Citadel Access Gate", type: "rest", town: "Basgo Village", distanceFromPrev: 8, altitude: 3292, notes: "Foot of the mud-brick fortress; ticket counter and tea shop." },
  ],
  "chumathang-4-days": [
    { id: "chu_st1", name: "Indian Oil Pump, Karu", type: "fuel", town: "Karu Junction", distanceFromPrev: 0, altitude: 3400, notes: "CRITICAL REFUEL. Last guaranteed fuel station on the Indus Highway towards Changthang." },
    { id: "chu_st2", name: "Upshi Police & Army Checkpost", type: "rest", town: "Upshi", distanceFromPrev: 14, altitude: 3450, notes: "Permit checking station. River confluence dhaba serving thukpa and momos." },
    { id: "chu_st3", name: "Kiari Village Rest Stop", type: "food", town: "Kiari", distanceFromPrev: 55, altitude: 3650, notes: "Tibetan resettlement village with roadside tea stalls and snack shops." },
    { id: "chu_st4", name: "Chumathang Hot Springs Complex", type: "rest", town: "Chumathang", distanceFromPrev: 71, altitude: 3950, notes: "Riverbank natural steam vents, public/private thermal baths, and roadside dhabas." },
  ],
  "hanle-5-days": [
    { id: "han_st1", name: "Karu Indian Oil Highway Pump", type: "fuel", town: "Karu", distanceFromPrev: 0, altitude: 3400, notes: "FULL TANK REFUEL. Carry extra fuel in jerrycans if possible; Hanle round-trip is ~550 km." },
    { id: "han_st2", name: "Chumathang Hot Springs Dhaba", type: "food", town: "Chumathang", distanceFromPrev: 140, altitude: 3950, notes: "Midway breakfast and rest stop en route to Loma." },
    { id: "han_st3", name: "Mahe Bridge Military Checkpost", type: "rest", town: "Mahe", distanceFromPrev: 25, altitude: 4100, notes: "Present Inner Line / Protected Area Permits to ITBP / Army." },
    { id: "han_st4", name: "Nyoma Town IOC Fuel Pump", type: "fuel", town: "Nyoma", distanceFromPrev: 22, altitude: 4180, notes: "Small high-altitude pump — stock can be irregular; always top up if open." },
    { id: "han_st5", name: "Loma Bridge Army Checkpoint", type: "rest", town: "Loma", distanceFromPrev: 18, altitude: 4200, notes: "Last military control post before entering the Hanle dark sky sanctuary basin." },
    { id: "han_st6", name: "Hanle Observatory Base & Stargazing Point", type: "viewpoint", town: "Hanle / Mt. Saraswati", distanceFromPrev: 50, altitude: 4500, notes: "Foot of Mt. Saraswati. Use red-light headlamps only after dark to preserve dark-sky reserve." },
  ],
  "kuldhara-4-days": [
    { id: "kul_st1", name: "HPCL Highway Fuel Pump, Pokhran Road", type: "fuel", town: "Jodhpur-Jaisalmer NH-11", distanceFromPrev: 0, notes: "Reliable highway refuel and tea stop." },
    { id: "kul_st2", name: "Pokhran Desert Oasis Rest Stop", type: "rest", town: "Pokhran", distanceFromPrev: 110, altitude: 233, notes: "Midpoint break between Jodhpur and Jaisalmer; clean restrooms and snacks." },
    { id: "kul_st3", name: "Indian Oil Pump, Jaisalmer Bypass", type: "fuel", town: "Jaisalmer", distanceFromPrev: 170, altitude: 225, notes: "Last major town fuel station before heading into remote Kuldhara & Sam desert track." },
    { id: "kul_st4", name: "Kuldhara Ghost Village Gate", type: "viewpoint", town: "Kuldhara", distanceFromPrev: 18, altitude: 210, notes: "Entry ticket counter and parking for the ruined 13th-century Paliwal settlement." },
    { id: "kul_st5", name: "Khaba Fort Viewpoint", type: "viewpoint", town: "Khaba", distanceFromPrev: 15, altitude: 205, notes: "Scenic ruined watchtower overlooking peacock feeding grounds." },
  ],
  "narlai-4-days": [
    { id: "nar_st1", name: "BPCL Fuel Station, Sukher", type: "fuel", town: "Udaipur NH-27 Exit", distanceFromPrev: 0, altitude: 598, notes: "Top up before entering the winding Aravalli ghats." },
    { id: "nar_st2", name: "Gogunda Ghat Viewpoint", type: "viewpoint", town: "Gogunda", distanceFromPrev: 35, altitude: 810, notes: "Panoramic pass overlook; Maharana Pratap coronation site." },
    { id: "nar_st3", name: "Ranakpur Temple Rest Area", type: "rest", town: "Ranakpur", distanceFromPrev: 55, altitude: 486, notes: "Monkeys, pure vegetarian dhabas, and 1,444 marble pillars." },
    { id: "nar_st4", name: "Sadri Junction Fuel Pump", type: "fuel", town: "Sadri", distanceFromPrev: 10, altitude: 440, notes: "Last reliable fuel pump before rural Narlai." },
    { id: "nar_st5", name: "Elephant Rock Base Trailhead", type: "viewpoint", town: "Narlai", distanceFromPrev: 15, altitude: 430, notes: "Parking area for the early morning climb up the granite monolith." },
  ],
  "khimsar-4-days": [
    { id: "khi_st1", name: "IOC Pump, Mandore Road", type: "fuel", town: "Jodhpur Outer", distanceFromPrev: 0, altitude: 245, notes: "Full tank refuel before heading north on NH-62." },
    { id: "khi_st2", name: "Osian Desert Junction Dhaba", type: "food", town: "Osian Phata", distanceFromPrev: 40, altitude: 260, notes: "Tea and fresh kachoris at the ancient temple town turnoff." },
    { id: "khi_st3", name: "Khimsar Fort Gate Parking", type: "rest", town: "Khimsar", distanceFromPrev: 45, altitude: 290, notes: "Main security gate of the 16th-century fortress resort." },
    { id: "khi_st4", name: "Khimsar Sand Dunes Track Point", type: "viewpoint", town: "Khimsar Dunes", distanceFromPrev: 6, altitude: 335, notes: "Switch to 4WD or camel cart for the desert lake oasis track." },
    { id: "khi_st5", name: "Panchala Blackbuck Vantage", type: "viewpoint", town: "Panchala Reserve", distanceFromPrev: 18, altitude: 295, notes: "Wildlife spotting area for endangered blackbuck herds." },
  ],
  "bhangarh-4-days": [
    { id: "bha_st1", name: "Indian Oil Express Pump, Dausa", type: "fuel", town: "Dausa NH-21", distanceFromPrev: 0, altitude: 320, notes: "Highway fuel and ATM stop on Delhi-Jaipur corridor." },
    { id: "bha_st2", name: "Chand Baori Stepwell Gate", type: "viewpoint", town: "Abhaneri", distanceFromPrev: 30, altitude: 280, notes: "Ancient 8th-century stepwell marvel with 3,500 symmetrical steps." },
    { id: "bha_st3", name: "Gola ka Baas Rest Area", type: "food", town: "Gola ka Baas", distanceFromPrev: 28, altitude: 310, notes: "Local tea and snacks shop; last settlement before Bhangarh." },
    { id: "bha_st4", name: "Bhangarh ASI Checkpoint & Parking", type: "rest", town: "Bhangarh Fort", distanceFromPrev: 6, altitude: 340, notes: "Official Archaeological Survey entry gate. Note: Entry strictly prohibited after sunset." },
    { id: "bha_st5", name: "Sariska Tiger Reserve Gate", type: "viewpoint", town: "Thanagazi", distanceFromPrev: 25, altitude: 420, notes: "Safari departure point for Royal Bengal tiger tracking." },
  ],
  "bishnoi-villages-3-days": [
    { id: "bis_st1", name: "HPCL Fuel Station, Pali Road", type: "fuel", town: "Jodhpur South", distanceFromPrev: 0, altitude: 235, notes: "Fuel up before entering rural desert trails." },
    { id: "bis_st2", name: "Guda Bishnoiyan Lake Sanctuary", type: "viewpoint", town: "Guda Lake", distanceFromPrev: 22, altitude: 240, notes: "Scenic desert lake with roaming blackbucks, chinkaras, and migratory demoiselle cranes." },
    { id: "bis_st3", name: "Salawas Durry Craft Village", type: "rest", town: "Salawas", distanceFromPrev: 12, altitude: 225, notes: "Master weavers cooperative; tea and weaving demonstrations." },
    { id: "bis_st4", name: "Kakani Potters Chawk", type: "rest", town: "Kakani", distanceFromPrev: 8, altitude: 215, notes: "Clay pottery workshops and traditional wood-fired kilns." },
    { id: "bis_st5", name: "Khejarli 363 Martyrs Memorial", type: "viewpoint", town: "Khejarli", distanceFromPrev: 10, altitude: 235, notes: "Sacred khejri tree forest dedicated to the legendary 1730 AD eco-martyrs." },
  ],
  "dholavira-4-days": [
    { id: "dho_st1", name: "Indian Oil Pump, Bhachau", type: "fuel", town: "Bhachau NH-41", distanceFromPrev: 0, altitude: 45, notes: "MANDATORY FULL TANK. Fuel stations are extremely sparse on Khadir Bet island." },
    { id: "dho_st2", name: "Rapar Gateway Dhaba & ATM", type: "food", town: "Rapar", distanceFromPrev: 52, altitude: 35, notes: "Last major town for cash withdrawal, water bottles, and Kutchi snacks." },
    { id: "dho_st3", name: "Road to Heaven Viewpoint", type: "viewpoint", town: "White Rann Causeway", distanceFromPrev: 38, altitude: 10, notes: "Iconic 30-km straight highway cutting directly through the dazzling white salt desert." },
    { id: "dho_st4", name: "Dholavira Harappan Excavation Gate", type: "rest", town: "Dholavira", distanceFromPrev: 22, altitude: 30, notes: "UNESCO World Heritage Site museum, ticket counter, and ASI guides." },
    { id: "dho_st5", name: "Khadir Bet Wood Fossil Point", type: "viewpoint", town: "Khadir North", distanceFromPrev: 12, altitude: 45, notes: "Jurassic petrified tree trunks overlooking the flamingo wetlands." },
  ],
  "mandvi-4-days": [
    { id: "man_st1", name: "HP Pump, Bhuj-Mandvi Highway", type: "fuel", town: "Bhuj Bypass", distanceFromPrev: 0, altitude: 110, notes: "Refuel on the smooth 55-km highway to the coast." },
    { id: "man_st2", name: "Kera Shiva Temple Rest Stop", type: "rest", town: "Kera", distanceFromPrev: 22, altitude: 75, notes: "10th-century Solanki-era stone temple ruins beside the highway." },
    { id: "man_st3", name: "Rukmavati River Shipbuilding Yard", type: "viewpoint", town: "Mandvi Wharf", distanceFromPrev: 33, altitude: 8, notes: "Watch master shipwrights build giant ocean-going wooden dhows without blueprints." },
    { id: "man_st4", name: "Vijay Vilas Palace Gate", type: "rest", town: "Mandvi Coastal Road", distanceFromPrev: 8, altitude: 35, notes: "Red sandstone palace museum and private beach access." },
    { id: "man_st5", name: "Wind Farm Beach", type: "viewpoint", town: "Mandvi Beach", distanceFromPrev: 4, altitude: 4, notes: "Sunset camel rides, seaside dhabas, and wind turbines." },
  ],
  "poshina-3-days": [
    { id: "pos_st1", name: "BPCL Pump, Himatnagar Bypass", type: "fuel", town: "Himatnagar", distanceFromPrev: 0, altitude: 127, notes: "Fill up before heading into the northern Aravalli border hills." },
    { id: "pos_st2", name: "Idar Fort Viewpoint", type: "viewpoint", town: "Idar", distanceFromPrev: 28, altitude: 210, notes: "Colossal granite hills and ancient Ilva Durga fort ruins." },
    { id: "pos_st3", name: "Darbargadh Palace Gate, Poshina", type: "rest", town: "Poshina", distanceFromPrev: 45, altitude: 295, notes: "15th-century royal palace check-in and tribal guide center." },
    { id: "pos_st4", name: "Sacred Terracotta Horse Grove", type: "viewpoint", town: "Poshina Forest", distanceFromPrev: 5, altitude: 310, notes: "Open-air shrine with thousands of clay horse votive offerings to tribal deities." },
    { id: "pos_st5", name: "Kumbhariya Jain Temples", type: "viewpoint", town: "Ambaji Border", distanceFromPrev: 25, altitude: 520, notes: "Exquisite 11th-century white marble temple complex." },
  ],
  "champaner-pavagadh-3-days": [
    { id: "cha_st1", name: "Indian Oil Express Pump, Halol", type: "fuel", town: "Halol Bypass", distanceFromPrev: 0, altitude: 110, notes: "Primary fuel stop on Vadodara-Champaner expressway." },
    { id: "cha_st2", name: "Jami Masjid UNESCO Complex", type: "viewpoint", town: "Champaner Citadel", distanceFromPrev: 8, altitude: 128, notes: "Magnificent 16th-century Sultanate architecture with carved stone screens." },
    { id: "cha_st3", name: "Manchi Foothills Rest & Parking", type: "rest", town: "Pavagadh Base", distanceFromPrev: 5, altitude: 380, notes: "Cable car ropeway boarding station, restaurants, and shoe deposit." },
    { id: "cha_st4", name: "Kalika Mata Temple Summit", type: "viewpoint", town: "Pavagadh Peak", distanceFromPrev: 3, altitude: 822, notes: "Highest volcanic peak with sacred Shaktipeeth temple." },
    { id: "cha_st5", name: "Jambughoda Sanctuary Gate", type: "rest", town: "Jambughoda", distanceFromPrev: 18, altitude: 195, notes: "Dense teak forest rest area and wildlife interpretation center." },
  ],
  "palitana-3-days": [
    { id: "pal_st1", name: "HP Pump, Sihor Highway", type: "fuel", town: "Sihor", distanceFromPrev: 0, altitude: 55, notes: "Refuel on the road from Bhavnagar to Palitana." },
    { id: "pal_st2", name: "Palitana Taleti Pilgrim Gate", type: "rest", town: "Palitana Base", distanceFromPrev: 32, altitude: 150, notes: "Starting point of the 3,800 steps climb; doli (palanquin) hire and walking sticks." },
    { id: "pal_st3", name: "Gauri Kund Midway Rest Point", type: "rest", town: "Shatrunjaya Trail", distanceFromPrev: 2, altitude: 510, notes: "Cool spring water rest shelter overlooking Shetrunji river." },
    { id: "pal_st4", name: "Shatrunjaya Summit Adinath Temple", type: "viewpoint", town: "Shatrunjaya Hill", distanceFromPrev: 1, altitude: 603, notes: "Sacred cluster of 900+ marble Jain temples atop the twin summits." },
    { id: "pal_st5", name: "Taleti Jain Museum", type: "rest", town: "Taleti Road", distanceFromPrev: 3, altitude: 155, notes: "Museum documenting the spiritual history and marble architecture of Shatrunjaya." },
  ],
};

const DEFAULT_STOPS: FuelStop[] = [
  { id: "def1", name: "Local Petrol Pump", type: "fuel", town: "Nearest Town", notes: "Check Google Maps for 'petrol pump near me' en route." },
  { id: "def2", name: "Roadside Dhaba", type: "food", town: "Highway", notes: "Indian highways always have dhabas every 50-70 km." },
];

const STOP_ICONS: Record<FuelStop["type"], React.ReactNode> = {
  fuel: <Fuel size={16} />, rest: <Coffee size={16} />, food: <Utensils size={16} />,
  viewpoint: <Eye size={16} />, atm: <Banknote size={16} />,
};

const STOP_COLORS: Record<FuelStop["type"], { bg: string; border: string; color: string }> = {
  fuel: { bg: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.4)", color: "#fbbf24" },
  rest: { bg: "rgba(94,234,212,0.15)", border: "rgba(94,234,212,0.4)", color: "var(--accent-teal)" },
  food: { bg: "rgba(249,168,212,0.15)", border: "rgba(249,168,212,0.4)", color: "var(--accent-rose)" },
  viewpoint: { bg: "rgba(137,180,250,0.15)", border: "rgba(137,180,250,0.4)", color: "var(--accent-gold)" },
  atm: { bg: "rgba(166,227,161,0.15)", border: "rgba(166,227,161,0.4)", color: "#a6e3a1" },
};

const STOP_LABELS: Record<FuelStop["type"], string> = {
  fuel: "Fuel Station", rest: "Rest Stop", food: "Food Stop",
  viewpoint: "Viewpoint", atm: "ATM",
};

interface FuelRestStopsProps {
  tripSlug: string;
  tripTitle?: string;
}

export default function FuelRestStops({ tripSlug, tripTitle }: FuelRestStopsProps) {
  const stops = FUEL_DATA[tripSlug] || DEFAULT_STOPS;
  const totalDistance = stops.reduce((sum, s) => sum + (s.distanceFromPrev || 0), 0);
  const destination = tripTitle || tripSlug.replace(/-/g, " ");

  // Build a Google Maps multi-stop directions URL from all towns
  const waypoints = stops.map((s) => encodeURIComponent(s.town)).join("|");
  const mapsRouteUrl = stops.length >= 2
    ? `https://www.google.com/maps/dir/${encodeURIComponent(stops[0].town)}/${encodeURIComponent(stops[stops.length - 1].town)}/?waypoints=${waypoints}`
    : `https://www.google.com/maps/search/${encodeURIComponent(destination)}`;

  const fuelSearchUrl = `https://www.google.com/maps/search/petrol+pump+near+${encodeURIComponent(destination)}`;
  const tollSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(destination + " toll charges highway route")}`;

  return (
    <div className="fuel-stops">
      {/* Header */}
      <div className="fuel-stops-header">
        <div>
          <p className="fuel-intro">
            Essential waypoints, fuel stations, viewpoints, and rest stops for this road trip.
          </p>
        </div>
        <div className="fuel-total-badge">
          <Gauge size={14} />
          {totalDistance > 0 ? `~${totalDistance.toLocaleString()} km total` : "Route overview"}
        </div>
      </div>

      {/* AI + Quick links bar */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem",
        marginBottom: "1.25rem", padding: "0.7rem 0.9rem",
        borderRadius: "var(--radius-md)",
        background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)",
      }}>
        <Sparkles size={13} style={{ color: "#a78bfa", flexShrink: 0 }} />
        <span style={{ fontSize: "0.72rem", color: "#a78bfa", fontWeight: 600 }}>AI-curated route</span>
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", flex: 1 }}>
          · Live fuel prices & road conditions may vary.
        </span>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <a href={mapsRouteUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.7rem", borderRadius: 20,
              border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.08)",
              color: "#4ade80", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
            }}>
            <Navigation size={11} /> Full Route
          </a>
          <a href={fuelSearchUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.7rem", borderRadius: 20,
              border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)",
              color: "#fbbf24", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
            }}>
            <Fuel size={11} /> Find Fuel
          </a>
          <a href={tollSearchUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.7rem", borderRadius: 20,
              border: "1px solid var(--border)", background: "var(--bg-card)",
              color: "var(--text-secondary)", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
            }}>
            <Search size={11} /> Toll Info
          </a>
        </div>
      </div>

      {/* Legend */}
      <div className="fuel-legend">
        {(Object.keys(STOP_LABELS) as FuelStop["type"][]).map((type) => (
          <span key={type} className="fuel-legend-item" style={{ color: STOP_COLORS[type].color }}>
            {STOP_ICONS[type]}
            {STOP_LABELS[type]}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="fuel-timeline">
        {stops.map((stop, idx) => {
          const { bg, border, color } = STOP_COLORS[stop.type];
          const isLast = idx === stops.length - 1;
          const stopMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(stop.name + " " + stop.town)}`;
          const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stop.town)}&travelmode=driving`;

          return (
            <div key={stop.id} className="fuel-stop-item">
              {/* Timeline connector */}
              <div className="fuel-stop-connector">
                <div
                  className="fuel-stop-dot"
                  style={{ background: bg, border: `2px solid ${border}`, color }}
                >
                  {STOP_ICONS[stop.type]}
                </div>
                {!isLast && <div className="fuel-stop-line" />}
              </div>

              {/* Content */}
              <div className="fuel-stop-content glass-card">
                <div className="fuel-stop-top">
                  <div>
                    <span className="fuel-stop-type-badge" style={{ background: bg, color, border: `1px solid ${border}` }}>
                      {STOP_LABELS[stop.type]}
                    </span>
                    <h3 className="fuel-stop-name">{stop.name}</h3>
                    <div className="fuel-stop-meta">
                      <span>📍 {stop.town}</span>
                      {stop.altitude && <span>⛰️ {stop.altitude.toLocaleString()} m</span>}
                    </div>
                  </div>
                  {stop.distanceFromPrev !== undefined && stop.distanceFromPrev > 0 && (
                    <div className="fuel-distance-badge">
                      +{stop.distanceFromPrev} km
                    </div>
                  )}
                </div>
                {stop.notes && (
                  <p className="fuel-stop-notes">💡 {stop.notes}</p>
                )}
                {/* Per-stop action links */}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem", flexWrap: "wrap" }}>
                  <a href={stopMapsUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.3rem",
                      padding: "0.25rem 0.6rem", borderRadius: 20,
                      border: `1px solid ${border}`, background: bg,
                      color, fontSize: "0.7rem", fontWeight: 600, textDecoration: "none",
                    }}>
                    <MapPin size={10} /> View on Maps
                  </a>
                  <a href={navUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.3rem",
                      padding: "0.25rem 0.6rem", borderRadius: 20,
                      border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.07)",
                      color: "#4ade80", fontSize: "0.7rem", fontWeight: 600, textDecoration: "none",
                    }}>
                    <Navigation size={10} /> Navigate
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom strip */}
      <div style={{
        marginTop: "1.5rem", padding: "0.85rem 1rem",
        borderRadius: "var(--radius-md)", border: "1px dashed var(--border)",
        display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center",
      }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          🗺️ More tools:
        </span>
        {[
          { label: "Google Maps Route", url: mapsRouteUrl },
          { label: "Petrol Prices India", url: "https://www.goodreturns.in/petrol-price.html" },
          { label: "NHAI Toll Calculator", url: "https://www.nhaihelp.com" },
          { label: "Weather en route", url: `https://www.google.com/search?q=${encodeURIComponent("weather " + destination)}` },
        ].map(({ label, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.7rem", borderRadius: 20,
              border: "1px solid var(--border)", background: "var(--bg-card)",
              color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <ExternalLink size={10} /> {label}
          </a>
        ))}
      </div>
    </div>
  );
}
