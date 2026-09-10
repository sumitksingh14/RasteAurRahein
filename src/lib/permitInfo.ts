export interface PermitDetail {
  region: string;
  name: string;
  portalUrl: string;
  portalName: string;
  costEstimate: string;
  processingTime: string;
  documentsRequired: string[];
  zonesCovered: string[];
  instructions: string;
}

export const PERMIT_REGISTRY: Record<string, PermitDetail> = {
  "leh-ladakh-9-days": {
    region: "Ladakh",
    name: "Ladakh Inner Line Permit (ILP) / Environment Fee",
    portalUrl: "https://www.lahdclehpermit.in/",
    portalName: "LAHDCL Official Leh Permit Portal",
    costEstimate: "₹400 environment fee + ₹20/day wildlife fee + ₹100 Red Cross fee (~₹550–₹650 pp)",
    processingTime: "Online approval usually instant; print 4–5 hard copies",
    documentsRequired: [
      "Government photo ID (Aadhaar / Voter ID / Passport)",
      "Passport-sized photograph",
      "Vehicle RC & Driver license (if self-driving)",
    ],
    zonesCovered: ["Pangong Tso", "Nubra Valley (Hunder, Diskit, Turtuk)", "Tso Moriri & Tsokar", "Dha-Hanu", "Chushul"],
    instructions:
      "All domestic and international tourists require the Ladakh Ecology & Wildlife permit to travel beyond Leh city. Keep physical printed copies in your vehicle dashboard as police/army checkposts at South Pullu, North Pullu, and Tangtse inspect and retain physical slips.",
  },
  "spiti-valley": {
    region: "Himachal Pradesh (Kinnaur & Spiti)",
    name: "Rohtang Road Permit & Foreigner Inner Line Permit",
    portalUrl: "https://rohtangpermit.nic.in/",
    portalName: "Himachal Tourism Rohtang E-Permit",
    costEstimate: "₹550 per vehicle (Rohtang pass congestion fee)",
    processingTime: "Book 1 day prior at 10:00 AM or 04:00 PM slot",
    documentsRequired: ["Vehicle RC & valid PUC", "Driver driving license"],
    zonesCovered: ["Rohtang Pass", "Khab to Samdo checkpost (for foreign passport holders)"],
    instructions:
      "Domestic Indian travelers do not require an ILP for Spiti Valley. However, vehicles passing via Rohtang Pass require a valid Rohtang e-permit. Foreign passport holders traveling between Reckong Peo and Kaza require an ILP issued by the ADM office at Shimla, Reckong Peo, or Kaza.",
  },
  "sikkim-7-days": {
    region: "Sikkim",
    name: "Sikkim Protected Area Permit (PAP)",
    portalUrl: "https://sikkimtourism.gov.in/",
    portalName: "Sikkim Tourism Official Portal",
    costEstimate: "Free (government fee); nominal agency processing fee",
    processingTime: "24–48 hours via registered Sikkim travel operator",
    documentsRequired: ["Voter ID or Passport (Aadhaar not accepted at Nathu La)", "2 passport photos"],
    zonesCovered: ["Tsomgo Lake", "Nathu La Pass", "Gurudongmar Lake (North Sikkim)", "Zero Point (Yumesamdong)"],
    instructions:
      "North Sikkim (Lachen, Lachung, Gurudongmar) and Nathu La are classified military border zones. Permits are issued exclusively through Sikkim Police and Army authorities via registered tour operators.",
  },
  "char-dham-yatra-uttarakhand": {
    region: "Uttarakhand",
    name: "Char Dham Yatra Biometric Registration",
    portalUrl: "https://registrationandtouristcare.uk.gov.in/",
    portalName: "Uttarakhand Tourism Yatra Registration",
    costEstimate: "Free of cost",
    processingTime: "Instant digital QR pass generated",
    documentsRequired: ["Aadhaar card", "Emergency contact number", "Medical self-declaration"],
    zonesCovered: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath", "Hemkund Sahib"],
    instructions:
      "Mandatory for every pilgrim and trekker visiting Kedarnath, Badrinath, Gangotri, or Yamunotri. Carry your downloaded digital QR code and wristband slip for scanning at entry checkpoints.",
  },
};
