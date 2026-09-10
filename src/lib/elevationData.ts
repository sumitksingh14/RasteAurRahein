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
