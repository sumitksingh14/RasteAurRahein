/**
 * Altitude and Acute Mountain Sickness (AMS) Risk Configuration
 *
 * Configurable thresholds based on UIAA (International Climbing and Mountaineering Federation)
 * and Himalayan altitude medicine guidelines.
 *
 * Edit thresholds, risk bands, and guidance in this single file.
 */

export interface RiskBandConfig {
  band: "green" | "amber" | "red";
  label: string;
  minMeters: number;
  maxMeters: number;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  description: string;
}

export const ALTITUDE_RISK_CONFIG = {
  /** Short non-medical legal disclaimer required on all altitude displays */
  disclaimer: "General guidance, not medical advice. Consult a doctor before high-altitude travel.",

  /**
   * Risk band thresholds for sleeping / overnight altitudes (in meters)
   * - Green (< 2,500m): Low altitude, minimal risk of altitude sickness
   * - Amber (2,500m – 3,500m): Moderate altitude, acclimatization zone; gradual ascent advised
   * - Red (> 3,500m): High altitude; increased risk of AMS/HAPE/HACE; mandatory rest days
   */
  thresholds: {
    moderateRiskMeters: 2500, // 8,200 ft
    highRiskMeters: 3500,     // 11,480 ft
    extremeRiskMeters: 4500,  // 14,760 ft
    maxSafeSleepingAscentPerDayMeters: 500, // Safe rule: < 500m gain in sleeping altitude per 24h above 2,500m
  },

  bands: [
    {
      band: "green",
      label: "Low Risk (< 2,500m)",
      minMeters: 0,
      maxMeters: 2500,
      color: "#10b981", // Emerald
      badgeBg: "rgba(16, 185, 129, 0.12)",
      badgeBorder: "rgba(16, 185, 129, 0.35)",
      description: "Atmospheric oxygen is near sea level. Altitude sickness is very unlikely.",
    },
    {
      band: "amber",
      label: "Moderate Risk / Acclimatization (2,500m – 3,500m)",
      minMeters: 2500,
      maxMeters: 3500,
      color: "#f59e0b", // Amber
      badgeBg: "rgba(245, 158, 11, 0.12)",
      badgeBorder: "rgba(245, 158, 11, 0.35)",
      description: "Mild symptoms possible (headache, fatigue). Ascend steadily and stay hydrated.",
    },
    {
      band: "red",
      label: "High Risk (> 3,500m)",
      minMeters: 3500,
      maxMeters: 9000,
      color: "#ef4444", // Red
      badgeBg: "rgba(239, 68, 68, 0.12)",
      badgeBorder: "rgba(239, 68, 68, 0.35)",
      description: "Significant AMS risk. Avoid rapid ascents (> 500m/day). Descend immediately if severe symptoms arise.",
    },
  ] as RiskBandConfig[],
};

/**
 * Returns the matching risk band for a given altitude in meters
 */
export function getAltitudeRiskBand(altitudeMeters: number): RiskBandConfig {
  if (altitudeMeters >= ALTITUDE_RISK_CONFIG.thresholds.highRiskMeters) {
    return ALTITUDE_RISK_CONFIG.bands[2];
  }
  if (altitudeMeters >= ALTITUDE_RISK_CONFIG.thresholds.moderateRiskMeters) {
    return ALTITUDE_RISK_CONFIG.bands[1];
  }
  return ALTITUDE_RISK_CONFIG.bands[0];
}
