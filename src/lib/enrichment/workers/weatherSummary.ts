/**
 * Weather Summary Enrichment Worker
 *
 * Fetches real forecast data from Open-Meteo (no API key needed) and uses
 * the LLM purely to convert the structured JSON into a readable 2-sentence
 * summary. Never asks the LLM to invent weather facts.
 */

import { LLMService } from "@/lib/services/LLMService";
import { TRIP_WEATHER_COORDS } from "@/lib/weatherCoords";
import type { EnrichedWeatherValue } from "../types";

const ENRICHMENT_LLM = (process.env.ENRICHMENT_LLM_PROVIDER ?? "gemini") as
  | "gemini"
  | "groq"
  | "nvidia"
  | "openai";

interface WeatherFetchResult {
  current: {
    tempC: number;
    feelsLikeC: number;
    humidity: number;
    precipMm: number;
    weatherCode: number;
    windKph: number;
  };
  daily: {
    date: string;
    weatherCode: number;
    maxC: number;
    minC: number;
    precipMm: number;
    precipProbability: number;
    windMaxKph: number;
    sunrise: string;
    sunset: string;
  }[];
}

async function fetchWeatherForCoords(
  lat: number,
  lon: number
): Promise<WeatherFetchResult> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(",")
  );
  url.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "sunrise",
      "sunset",
    ].join(",")
  );
  url.searchParams.set("timezone", "Asia/Kolkata");
  url.searchParams.set("forecast_days", "7");

  const res = await fetch(url.toString(), { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`Open-Meteo failed: ${res.status}`);
  }
  const raw = await res.json();

  return {
    current: {
      tempC: raw.current.temperature_2m,
      feelsLikeC: raw.current.apparent_temperature,
      humidity: raw.current.relative_humidity_2m,
      precipMm: raw.current.precipitation,
      weatherCode: raw.current.weather_code,
      windKph: raw.current.wind_speed_10m,
    },
    daily: raw.daily.time.map((date: string, i: number) => ({
      date,
      weatherCode: raw.daily.weather_code[i],
      maxC: raw.daily.temperature_2m_max[i],
      minC: raw.daily.temperature_2m_min[i],
      precipMm: raw.daily.precipitation_sum[i],
      precipProbability: raw.daily.precipitation_probability_max[i],
      windMaxKph: raw.daily.wind_speed_10m_max[i],
      sunrise: raw.daily.sunrise[i],
      sunset: raw.daily.sunset[i],
    })),
  };
}

interface WeatherWorkerResult {
  value: EnrichedWeatherValue;
  tokensUsed: number;
}

export async function enrichWeatherSummary(
  tripSlug: string
): Promise<WeatherWorkerResult> {
  const coords = TRIP_WEATHER_COORDS[tripSlug];
  if (!coords) {
    throw new Error(
      `No weather coordinates configured for trip: ${tripSlug}`
    );
  }

  // 1. Fetch real forecast data
  const forecast = await fetchWeatherForCoords(coords.lat, coords.lon);

  // 2. Ask LLM to summarize the structured forecast data
  const avgMaxC =
    forecast.daily.reduce((sum, d) => sum + d.maxC, 0) / forecast.daily.length;
  const avgMinC =
    forecast.daily.reduce((sum, d) => sum + d.minC, 0) / forecast.daily.length;
  const avgPrecipProb =
    forecast.daily.reduce((sum, d) => sum + (d.precipProbability ?? 0), 0) /
    forecast.daily.length;

  const prompt = `
You are a travel weather summarizer. Convert the following real weather forecast data
into a concise 2-sentence travel advisory summary. Also suggest the best months to visit
based on the current weather pattern and the destination name.

IMPORTANT: Only use the data provided below. Do not invent or embellish.

Destination: ${coords.name}
Current temperature: ${forecast.current.tempC}°C (feels like ${forecast.current.feelsLikeC}°C)
Current humidity: ${forecast.current.humidity}%
7-day average max: ${avgMaxC.toFixed(1)}°C, average min: ${avgMinC.toFixed(1)}°C
Average precipitation probability: ${avgPrecipProb.toFixed(0)}%

Respond ONLY with a valid JSON object in this exact shape:
{
  "summary": "<2-sentence weather advisory for travellers>",
  "bestMonths": ["<Month>", "<Month>"],
  "confidence": <number 0.0 to 1.0>
}
`.trim();

  const raw = await LLMService.generateContent(prompt, {
    model: ENRICHMENT_LLM,
    jsonMode: true,
  });

  // Strip markdown code fences if present
  const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
  const parsed = JSON.parse(cleaned) as {
    summary: string;
    bestMonths: string[];
    confidence: number;
  };

  // Validate shape
  if (
    typeof parsed.summary !== "string" ||
    !Array.isArray(parsed.bestMonths) ||
    typeof parsed.confidence !== "number"
  ) {
    throw new Error("LLM returned invalid weather summary shape");
  }

  const result: EnrichedWeatherValue = {
    summary: parsed.summary,
    bestMonths: parsed.bestMonths.slice(0, 6),
    confidence: Math.min(1, Math.max(0, parsed.confidence)),
    forecastDate: new Date().toISOString(),
  };

  // Rough token estimate (LLM response char count / 4)
  const tokensUsed = Math.ceil((prompt.length + raw.length) / 4);

  return { value: result, tokensUsed };
}
