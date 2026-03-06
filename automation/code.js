// ============================================================
// n8n Code Node (runs after HTTP Request node)
// ============================================================

const input = $('Webhook').first().json.body;

// Reads weathercode from the Open-Meteo HTTP Request node output
const weatherCode = $input.first().json.current?.weathercode ?? null;

function decodeWeatherCode(code) {
  if (code === 0)  return "Clear";
  if (code <= 2)   return "Partly Cloudy";
  if (code === 3)  return "Overcast";
  if (code <= 49)  return "Foggy";
  if (code <= 59)  return "Drizzle";
  if (code <= 69)  return "Rainy";
  if (code <= 79)  return "Snowy";
  if (code <= 84)  return "Rain Showers";
  if (code <= 94)  return "Thunderstorm";
  return "Severe Thunderstorm";
}

const weatherCondition = weatherCode !== null ? decodeWeatherCode(weatherCode) : "Unknown";

// Based on agronomic standards for general crop health monitoring.
// Adjust thresholds here as needed per crop type.

function evaluateSoilMeter(v) {
  if (v === null || v === undefined || isNaN(v))
    return { status: "MISSING", alert: "No soil moisture data received." };
  v = parseFloat(v);
  if (v < 40) return { status: "CRITICAL", alert: "Soil too dry — trigger irrigation alert." };
  if (v > 70) return { status: "CRITICAL", alert: "Soil too wet — risk of root disease." };
  return { status: "OPTIMAL", alert: null };
}

function evaluateTemperature(v) {
  if (v === null || v === undefined || isNaN(v))
    return { status: "MISSING", alert: "No temperature data received." };
  v = parseFloat(v);
  if (v < 20) return { status: "WARNING", alert: "Temperature too low — slow crop growth." };
  if (v > 33) return { status: "CRITICAL", alert: "Temperature too high — heat stress." };
  return { status: "OPTIMAL", alert: null };
}

function evaluateHumidity(v) {
  if (v === null || v === undefined || isNaN(v))
    return { status: "MISSING", alert: "No humidity data received." };
  v = parseFloat(v);
  if (v > 85) return { status: "CRITICAL", alert: "Humidity too high — risk of fungal infection." };
  if (v < 50) return { status: "WARNING", alert: "Humidity too low — plant dehydration." };
  return { status: "OPTIMAL", alert: null };
}
// Flexible key mapping — accepts multiple field name conventions
const rawSoilMeter = input.soil_meter  ?? input.moisture ?? null;
const rawTemp      = input.temperature ?? input.temp     ?? null;
const rawHumidity  = input.humidity    ?? input.hum      ?? null;

const soilResult     = evaluateSoilMeter(rawSoilMeter);
const tempResult     = evaluateTemperature(rawTemp);
const humidityResult = evaluateHumidity(rawHumidity);

// Status
const severityMap = { OPTIMAL: 0, WARNING: 1, CRITICAL: 2, MISSING: 3 };
const maxSeverity = Math.max(
  severityMap[soilResult.status],
  severityMap[tempResult.status],
  severityMap[humidityResult.status]
);

const overallStatus =
  maxSeverity === 0 ? "OPTIMAL"     :
  maxSeverity === 1 ? "WARNING"     :
  maxSeverity === 2 ? "CRITICAL"    : "INCOMPLETE";

// Combine all active alert messages into one string
const alerts = [soilResult.alert, tempResult.alert, humidityResult.alert]
  .filter(Boolean)
  .join(" | ");

const timestamp = new Date().toISOString();

// Single item output.
// soil_meter, humidity, temperature, created_at → go to Supabase `soil` table
// _overall_status, _alert, _weather              → carried forward to `algo` table
//   (read via $('Code in JavaScript').first().json._* in the algo Supabase node)

return [
  {
    json: {
      // Fields for `soil` table (Supabase)
      soil_meter:      rawSoilMeter !== null ? parseFloat(rawSoilMeter) : null,
      humidity:        rawHumidity  !== null ? parseFloat(rawHumidity)  : null,
      temperature:     rawTemp      !== null ? parseFloat(rawTemp)      : null,
      created_at:      timestamp,

      // Fields for `algo` table (Supabase) — prefixed with _ to distinguish
      _overall_status: overallStatus,
      _alert:          alerts.length > 0 ? alerts : null,
      _weather:        weatherCondition,
    }
  }
];
