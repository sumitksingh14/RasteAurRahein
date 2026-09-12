/**
 * Weather coordinates for trip slugs and region hub towns.
 * Used by /api/weather/* to resolve lat/lon from a semantic identifier.
 */

export interface WeatherLocation {
  name: string;
  lat: number;
  lon: number;
}

export interface RegionWeatherConfig {
  hubTowns: WeatherLocation[];
}

// ---------------------------------------------------------------------------
// Per-trip destination coordinates
// ---------------------------------------------------------------------------
export const TRIP_WEATHER_COORDS: Record<string, WeatherLocation> = {
  "leh-ladakh-9-days": { name: "Leh", lat: 34.1526, lon: 77.5771 },
  "spiti-valley": { name: "Kaza, Spiti", lat: 32.2262, lon: 78.0718 },
  "mysore-coorg-wayanad-ooty": { name: "Mysore", lat: 12.2958, lon: 76.6394 },
  "rajasthan-desert-kingdom": { name: "Jaisalmer", lat: 26.9157, lon: 70.9083 },
  "goa-beyond-beaches": { name: "Panaji, Goa", lat: 15.4909, lon: 73.8278 },
  "sikkim-7-days": { name: "Gangtok", lat: 27.3389, lon: 88.6065 },
  "meghalaya-5-days": { name: "Shillong", lat: 25.5788, lon: 91.8933 },
  "kerala-7-days": { name: "Kochi", lat: 9.9312, lon: 76.2673 },
  "munsiyari-6-days": { name: "Munsiyari", lat: 30.0688, lon: 80.2372 },
  "char-dham-yatra-uttarakhand": { name: "Kedarnath", lat: 30.7352, lon: 79.0669 },
  "panch-kedar-trek-10-days": { name: "Rudraprayag", lat: 30.2840, lon: 78.9810 },
  "pune-konkan-coast-raigad": { name: "Alibaug, Raigad", lat: 18.6414, lon: 72.8722 },
  "khaliya-top-5-days": { name: "Khaliya Top, Munsiyari", lat: 30.0785, lon: 80.2215 },
  "chakrata-4-days": { name: "Chakrata", lat: 30.7016, lon: 77.8698 },
  "kanatal-4-days": { name: "Kanatal", lat: 30.4184, lon: 78.3444 },
  "chaukori-5-days": { name: "Chaukori", lat: 29.8710, lon: 80.0210 },
  "gurez-valley-5-days": { name: "Dawar, Gurez Valley", lat: 34.6333, lon: 74.7667 },
  "aru-valley-4-days": { name: "Aru Valley, Pahalgam", lat: 34.0933, lon: 75.2633 },
  "yusmarg-4-days": { name: "Yusmarg", lat: 33.8290, lon: 74.6640 },
  "turtuk-5-days": { name: "Turtuk, Nubra Valley", lat: 34.8464, lon: 76.8397 },
  "basgo-4-days": { name: "Basgo, Sham Valley", lat: 34.2250, lon: 77.2880 },
  "chumathang-4-days": { name: "Chumathang", lat: 33.3590, lon: 78.3240 },
  "hanle-5-days": { name: "Hanle Dark Sky Reserve", lat: 32.7660, lon: 78.9660 },
  "kuldhara-4-days": { name: "Kuldhara, Jaisalmer", lat: 26.8708, lon: 70.7853 },
  "narlai-4-days": { name: "Narlai, Pali", lat: 25.3211, lon: 73.5356 },
  "khimsar-4-days": { name: "Khimsar, Nagaur", lat: 26.9786, lon: 73.4078 },
  "bhangarh-4-days": { name: "Bhangarh, Alwar", lat: 27.0964, lon: 76.2864 },
  "bishnoi-villages-3-days": { name: "Guda Bishnoiyan, Jodhpur", lat: 26.1367, lon: 73.0847 },
  "dholavira-4-days": { name: "Dholavira, Kutch", lat: 23.8864, lon: 70.2178 },
  "mandvi-4-days": { name: "Mandvi Port, Kutch", lat: 22.8336, lon: 69.3564 },
  "poshina-3-days": { name: "Poshina, Sabarkantha", lat: 24.2389, lon: 73.0639 },
  "champaner-pavagadh-3-days": { name: "Champaner-Pavagadh", lat: 22.4833, lon: 73.5333 },
  "palitana-3-days": { name: "Palitana, Shatrunjaya", lat: 21.5222, lon: 71.8286 },
  "varanasi-ayodhya-prayagraj-5-days": { name: "Varanasi (Kashi Dham)", lat: 25.3176, lon: 82.9739 },
};

// ---------------------------------------------------------------------------
// Per-region hub towns (2–3 representative points)
// ---------------------------------------------------------------------------
export const REGION_WEATHER_COORDS: Record<string, RegionWeatherConfig> = {
  himalayas: {
    hubTowns: [
      { name: "Leh", lat: 34.1526, lon: 77.5771 },
      { name: "Manali", lat: 32.2396, lon: 77.1887 },
      { name: "Kaza (Spiti)", lat: 32.2262, lon: 78.0718 },
    ],
  },
  "south-india": {
    hubTowns: [
      { name: "Mysore", lat: 12.2958, lon: 76.6394 },
      { name: "Kochi", lat: 9.9312, lon: 76.2673 },
      { name: "Ooty", lat: 11.4102, lon: 76.6950 },
    ],
  },
  rajasthan: {
    hubTowns: [
      { name: "Jaisalmer", lat: 26.9157, lon: 70.9083 },
      { name: "Jodhpur", lat: 26.2389, lon: 73.0243 },
      { name: "Udaipur", lat: 24.5854, lon: 73.7125 },
    ],
  },
  coastal: {
    hubTowns: [
      { name: "Panaji (Goa)", lat: 15.4909, lon: 73.8278 },
      { name: "Alibaug", lat: 18.6414, lon: 72.8722 },
      { name: "Kochi", lat: 9.9312, lon: 76.2673 },
    ],
  },
  "northeast-india": {
    hubTowns: [
      { name: "Shillong", lat: 25.5788, lon: 91.8933 },
      { name: "Gangtok", lat: 27.3389, lon: 88.6065 },
      { name: "Guwahati", lat: 26.1445, lon: 91.7362 },
    ],
  },
  "central-india": {
    hubTowns: [
      { name: "Bhopal", lat: 23.2599, lon: 77.4126 },
      { name: "Orchha / Jhansi", lat: 25.3524, lon: 78.6433 },
      { name: "Jagdalpur (Bastar)", lat: 19.0740, lon: 82.0080 },
    ],
  },
};

// ---------------------------------------------------------------------------
// All hub locations for the /weather tracker page
// ---------------------------------------------------------------------------
export const ALL_HUB_LOCATIONS: WeatherLocation[] = Object.values(
  REGION_WEATHER_COORDS
).flatMap((r) => r.hubTowns);

// Weather condition codes → human-readable + icon class
export const WMO_DESCRIPTIONS: Record<number, { label: string; emoji: string }> = {
  0: { label: "Clear sky", emoji: "☀️" },
  1: { label: "Mainly clear", emoji: "🌤️" },
  2: { label: "Partly cloudy", emoji: "⛅" },
  3: { label: "Overcast", emoji: "☁️" },
  45: { label: "Foggy", emoji: "🌫️" },
  48: { label: "Icy fog", emoji: "🌫️" },
  51: { label: "Light drizzle", emoji: "🌦️" },
  53: { label: "Drizzle", emoji: "🌦️" },
  55: { label: "Heavy drizzle", emoji: "🌧️" },
  61: { label: "Slight rain", emoji: "🌧️" },
  63: { label: "Moderate rain", emoji: "🌧️" },
  65: { label: "Heavy rain", emoji: "🌧️" },
  71: { label: "Slight snow", emoji: "🌨️" },
  73: { label: "Moderate snow", emoji: "🌨️" },
  75: { label: "Heavy snow", emoji: "❄️" },
  77: { label: "Snow grains", emoji: "❄️" },
  80: { label: "Slight showers", emoji: "🌦️" },
  81: { label: "Moderate showers", emoji: "🌧️" },
  82: { label: "Violent showers", emoji: "⛈️" },
  85: { label: "Slight snow showers", emoji: "🌨️" },
  86: { label: "Heavy snow showers", emoji: "❄️" },
  95: { label: "Thunderstorm", emoji: "⛈️" },
  96: { label: "Thunderstorm w/ hail", emoji: "⛈️" },
  99: { label: "Thunderstorm w/ heavy hail", emoji: "⛈️" },
};

export function getWeatherDesc(code: number) {
  return WMO_DESCRIPTIONS[code] ?? { label: "Unknown", emoji: "🌡️" };
}

// Rough "good time to visit" based on temperature + precipitation
export function isGoodTime(
  tempC: number,
  precipMm: number,
  weatherCode: number
): "good" | "okay" | "avoid" {
  if (weatherCode >= 71 && weatherCode <= 77) return "avoid"; // snow
  if (weatherCode >= 80 && weatherCode <= 82 && precipMm > 10) return "avoid"; // heavy showers
  if (weatherCode >= 95) return "avoid"; // thunderstorm
  if (precipMm > 20) return "avoid";
  if (tempC < 0 || tempC > 42) return "okay";
  if (precipMm > 10) return "okay";
  return "good";
}
