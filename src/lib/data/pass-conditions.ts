/**
 * pass-conditions.ts — Authoritative data for Himalayan pass & road conditions.
 *
 * This is the single source of truth for:
 *   - /road-conditions (status overview page)
 *   - /road-conditions/[slug] (per-pass detail pages)
 *   - Homepage Telemetry Corridor ticker
 *   - JSON-LD structured data on condition pages
 *
 * UPDATING CONDITIONS:
 *   Change `status`, `lastVerified`, and `statusNote` for a pass — everything
 *   else (history, elevation, alternates) is editorial and rarely changes.
 *
 * STATUS KEY:
 *   "open"    — road passable without restrictions
 *   "caution" — open but with conditions (snow, icing, landslide zone, one-way windows)
 *   "closed"  — impassable; use alternate route
 */

export type PassStatus = "open" | "caution" | "closed";

export interface PassCondition {
  slug: string;
  name: string;
  shortName: string; // For ticker display
  status: PassStatus;
  statusNote: string; // Current plain-English condition note
  lastVerified: string; // ISO date string "YYYY-MM-DD"
  lastVerifiedSource: string; // e.g. "BRO field report" | "Himachal PWD" | "Direct field observation"
  elevation: number; // metres
  region: string; // e.g. "Himachal Pradesh" | "Ladakh"
  openingMonth: string; // typical opening, e.g. "May – June"
  closingMonth: string; // typical closure start, e.g. "October – November"
  location: { lat: number; lng: number };
  surface: string; // e.g. "Paved with gravel patches"
  vehicleRequired: string; // e.g. "4WD recommended; 2WD SUVs in good conditions"
  fuelNotes: string;
  alternateRoute?: string;
  alternateRouteSlug?: string;
  relatedTripSlugs: string[];
  description: string; // 2–4 sentences of editorial context
  typicalHazards: string[];
  permit?: string; // permit info if required for this pass
}

export const PASS_CONDITIONS: PassCondition[] = [
  {
    slug: "kunzum-pass",
    name: "Kunzum Pass",
    shortName: "Kunzum",
    status: "open",
    statusNote: "Clear; road passable for all vehicles. Minor gravel patches near summit.",
    lastVerified: "2026-09-24",
    lastVerifiedSource: "BRO Rohtang Task Force field report",
    elevation: 4551,
    region: "Himachal Pradesh (Spiti)",
    openingMonth: "May – June",
    closingMonth: "October – November",
    location: { lat: 32.2464, lng: 77.7667 },
    surface: "Gravel and rock; no paved surface. River crossings on the Spiti approach.",
    vehicleRequired: "4WD strongly recommended. 2WD cars discouraged in wet conditions.",
    fuelNotes: "Last fuel point: Kaza (38 km east). Fill up completely — no petrol station at the pass.",
    alternateRoute: "Shimla → Nako → Sumdo (Kinnaur route) — adds 4–5 hours but far more reliable",
    alternateRouteSlug: "spiti-valley",
    relatedTripSlugs: ["spiti-valley"],
    description:
      "Kunzum Pass (4,551 m) connects the Lahaul Valley to Spiti Valley and is the only motorable route into Spiti from the Manali side in summer. The road is maintained by the BRO (Border Roads Organisation) and is unpaved throughout. The pass is famous for the Kunzum Mata temple at the summit, where travellers traditionally seek blessings before crossing. The view north towards the Pin Parbati range from the summit is one of the finest in the Himalayas.",
    typicalHazards: [
      "Sudden snowfall even in August",
      "River crossings on the Losar approach (often knee-deep in July)",
      "Narrow one-lane sections with sheer drops",
      "No mobile network — BSNL fails ~5 km before summit",
    ],
  },
  {
    slug: "rohtang-pass",
    name: "Rohtang Pass",
    shortName: "Rohtang",
    status: "open",
    statusNote: "Active. BRO permit required for non-commercial vehicles. Atal Tunnel bypass recommended.",
    lastVerified: "2026-09-24",
    lastVerifiedSource: "Himachal Pradesh Tourism live updates",
    elevation: 3978,
    region: "Himachal Pradesh",
    openingMonth: "May (variable)",
    closingMonth: "November",
    location: { lat: 32.3720, lng: 77.2434 },
    surface: "Paved with seasonal damage; stretches near summit prone to icing and erosion.",
    vehicleRequired: "All vehicles allowed with permit. Snowchains may be required in early/late season.",
    fuelNotes: "Last full fuel point: Manali (50 km south). Petrol availability at Gramphoo is unreliable.",
    alternateRoute: "Atal Tunnel (Rohtang Tunnel) — 9 km tunnel at 3,100 m, open year-round, no permit needed",
    relatedTripSlugs: ["spiti-valley", "leh-ladakh-9-days"],
    description:
      "Rohtang Pass (3,978 m) on the Manali–Leh Highway is the most famous — and most commercially-accessible — pass in Himachal Pradesh. Since the opening of the Atal Tunnel in 2020, most travellers bypass the pass entirely, but the summit road remains open for those wanting the high-altitude experience or heading toward Spiti. A daily vehicle permit (available online via the Himachal Tourism portal) is required for non-commercial vehicles; the quota fills quickly in peak season. Budget 3–4 hours from Manali for the crossing if skipping the tunnel.",
    typicalHazards: [
      "Traffic jams on weekends (tourist overcrowding)",
      "Icing on the road surface even in October",
      "Altitude sickness for first-time visitors (3,978 m)",
      "Limited visibility in cloud/fog — common in monsoon",
    ],
    permit: "Rohtang Pass vehicle permit required for non-commercial vehicles. Book at rohtangpermits.hp.gov.in",
  },
  {
    slug: "baralacha-la",
    name: "Baralacha La",
    shortName: "Baralacha",
    status: "caution",
    statusNote: "Open but icing reported on approach from Jispa. Night driving not advised.",
    lastVerified: "2026-09-24",
    lastVerifiedSource: "BRO 14 BRTF (Manali)",
    elevation: 4890,
    region: "Himachal Pradesh (Lahaul–Ladakh border)",
    openingMonth: "June",
    closingMonth: "October",
    location: { lat: 32.7400, lng: 77.3900 },
    surface: "Paved with gravel patches. Melting snowfields near summit in early season.",
    vehicleRequired: "4WD recommended. Snowchains mandatory before October 15.",
    fuelNotes: "Last reliable fuel: Keylong (68 km south). Carry 20L jerry can.",
    alternateRoute: "None — this is the only route on the Manali–Leh Highway",
    relatedTripSlugs: ["leh-ladakh-9-days"],
    description:
      "Baralacha La (4,890 m) sits on the Manali–Leh Highway, separating the Lahaul Valley from the Bharatpur plains of Ladakh. It is typically the coldest pass on the highway, and icing can occur even in August. The Suraj Tal glacial lake just below the southern approach is one of Ladakh's most photogenic spots. Unlike Rohtang and Kunzum, this pass sees almost no tourist traffic — it's the domain of bikers and expedition vehicles.",
    typicalHazards: [
      "Icing from late September onwards",
      "Road washouts from glacial meltwater in July",
      "No medical facilities within 60 km",
      "Flash floods near Suraj Tal in heavy rain",
    ],
  },
  {
    slug: "zoji-la",
    name: "Zoji La",
    shortName: "Zoji La",
    status: "open",
    statusNote: "Clear. Z-Morh tunnel (one-way traffic windows) is operational. Check timing before departure.",
    lastVerified: "2026-09-23",
    lastVerifiedSource: "NHIDCL traffic advisory",
    elevation: 3528,
    region: "Jammu & Kashmir (Kashmir–Ladakh border)",
    openingMonth: "April – May",
    closingMonth: "November – December",
    location: { lat: 34.2500, lng: 75.4800 },
    surface: "Narrow paved road; prone to landslides on the western Baltal approach.",
    vehicleRequired: "All vehicles. One-way traffic windows enforce eastbound and westbound convoys.",
    fuelNotes: "Last fuel point before crossing: Sonamarg (20 km west). Next: Drass (14 km east).",
    relatedTripSlugs: ["leh-ladakh-9-days"],
    description:
      "Zoji La (3,528 m) is the lowest of the major Leh passes yet geographically the most critical — it separates the Kashmir Valley from Ladakh, and its closure effectively cuts Leh off from Srinagar. The Z-Morh Tunnel now keeps the Sonamarg–Gund section open year-round, but the Zoji La road itself closes in winter under heavy snow. Army convoy vehicles have priority, so civilian traffic often faces delays. The section between Baltal and Zoji La summit is narrow, single-lane, and prone to rockfall — drive defensively.",
    typicalHazards: [
      "Rockfall on the western approach (Baltal side)",
      "One-way windows — arrive outside your convoy's window and you wait 3+ hours",
      "Heavy army convoy traffic reduces road space",
      "Flash floods from Sind River tributary in monsoon",
    ],
  },
  {
    slug: "sela-pass",
    name: "Sela Pass",
    shortName: "Sela",
    status: "open",
    statusNote: "Sela Tunnel open and operational — bypasses the snow-prone summit. Old pass road also open.",
    lastVerified: "2026-09-22",
    lastVerifiedSource: "BRO direct bulletin",
    elevation: 4170,
    region: "Arunachal Pradesh (Tawang district)",
    openingMonth: "April (tunnel year-round)",
    closingMonth: "December",
    location: { lat: 27.4670, lng: 92.1130 },
    surface: "Old road: narrow gravel. New Sela Tunnel: paved two-lane, all-weather.",
    vehicleRequired: "All vehicles via tunnel. Inner Line Permit (ILP) required for Arunachal Pradesh entry.",
    fuelNotes: "Last fuel: Dirang (42 km south). Next: Tawang (80 km north). Carry surplus.",
    relatedTripSlugs: [],
    description:
      "Sela Pass (4,170 m) in Arunachal Pradesh is the gateway to Tawang, the site of the largest Buddhist monastery in India after Lhasa's Potala. Until 2024, the pass was snow-closed for 4–5 months annually. The newly opened Sela Tunnel (two-tube, 1,790 m + 475 m) has dramatically cut travel time and ensures year-round access to Tawang. The old road over the summit is still drivable and offers the surreal Sela Lake and Jaswant Garh war memorial. An Inner Line Permit (ILP) is mandatory for all non-Arunachal residents.",
    typicalHazards: [
      "Black ice on the old road in December–February",
      "Dense fog near the summit year-round",
      "ILP checkpoint — ensure permit is valid before departure",
      "Limited mobile connectivity in Tawang district",
    ],
    permit: "Inner Line Permit (ILP) required. Apply online at arunachalipt.gov.in or at district offices in Guwahati / Tezpur.",
  },
];

/** Helper: get a single pass by slug */
export function getPassBySlug(slug: string): PassCondition | undefined {
  return PASS_CONDITIONS.find((p) => p.slug === slug);
}

/** Helper: get status badge color */
export function getStatusColor(status: PassStatus): string {
  return status === "open" ? "#16a34a" : status === "caution" ? "#d97706" : "#dc2626";
}

/** Helper: get status label */
export function getStatusLabel(status: PassStatus): string {
  return status === "open" ? "Open" : status === "caution" ? "Caution" : "Closed";
}
