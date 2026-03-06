# Automated Evaluation Pipeline

An n8n automation workflow that receives real-time soil sensor data via webhook, evaluates it against expert agronomic parameters, fetches live weather conditions, and stores the results in a Supabase database.

Built without AI agents — pure rule-based logic.

---

## Workflow Overview

```
IoT (POST) → Webhook → HTTP Request (weather) → Code (evaluate) → Supabase: soil → Supabase: algo
```

| Step | Node | Description |
|---|---|---|
| 1 | Webhook | Receives sensor POST request |
| 2 | HTTP Request | Fetches current weather from Open-Meteo (UPLB, Los Baños) |
| 3 | Code in JavaScript | Evaluates sensor values, computes overall status and alerts |
| 4 | Create soil row | Inserts raw sensor data into `soil` table |
| 5 | Create algo row | Inserts evaluation results into `algo` table with foreign key |

---

## Webhook Input Format

Send a POST request with the following JSON body:

```json
{
  "soil_meter": 55,
  "temperature": 24,
  "humidity": 65
}
```

---

## Evaluation Rules

| Sensor | Condition | Status |
|---|---|---|
| Soil Moisture | < 40% | CRITICAL — trigger irrigation alert |
| Soil Moisture | > 70% | CRITICAL — risk of root disease |
| Temperature | < 20°C | WARNING — slow crop growth |
| Temperature | > 33°C | CRITICAL — heat stress |
| Humidity | > 85% | CRITICAL — risk of fungal infection |
| Humidity | < 50% | WARNING — plant dehydration |

Overall status is determined by the highest severity across all three sensors:
- `OPTIMAL` — all within range
- `WARNING` — at least one warning
- `CRITICAL` — at least one critical
- `INCOMPLETE` — missing sensor data

---

## Supabase Tables

### `soil` (parent)
| Column | Type |
|---|---|
| `id` | int8, primary key, auto-increment |
| `soil_meter` | float4 |
| `humidity` | float4 |
| `temperature` | float4 |
| `created_at` | timestamptz |

### `algo` (child)
| Column | Type |
|---|---|
| `id` | int8, primary key, auto-increment |
| `overall_status` | varchar |
| `alert` | varchar |
| `weather` | varchar |
| `created_at` | timestamptz |
| `fkid` | int8, foreign key → `soil(id)` |

---

## ☁️ Weather

Live weather is fetched automatically from [Open-Meteo](https://open-meteo.com/) on every request.

- **Location:** UPLB, Los Baños, Laguna (14.1648° N, 121.2414° E)
- **Field:** WMO weather code → decoded to human-readable condition
- **No API key required**

### Weather Condition Codes
| Code | Condition |
|---|---|
| 0 | Clear |
| 1–2 | Partly Cloudy |
| 3 | Overcast |
| 4–49 | Foggy |
| 50–59 | Drizzle |
| 60–69 | Rainy |
| 70–79 | Snowy |
| 80–84 | Rain Showers |
| 85–94 | Thunderstorm |
| 95+ | Severe Thunderstorm |

---

## Testing with PowerShell

```powershell
# OPTIMAL
Invoke-RestMethod -Uri "https://YOUR_WEBHOOK_URL" -Method POST -ContentType "application/json" -Body '{ "soil_meter": 55, "temperature": 24, "humidity": 65 }'

# CRITICAL — all sensors bad
Invoke-RestMethod -Uri "https://YOUR_WEBHOOK_URL" -Method POST -ContentType "application/json" -Body '{ "soil_meter": 5, "temperature": 42, "humidity": 95 }'

# Simulate loop (every 10 seconds)
while ($true) {
    Invoke-RestMethod -Uri "https://YOUR_WEBHOOK_URL" -Method POST -ContentType "application/json" -Body '{ "soil_meter": 55, "temperature": 24, "humidity": 65 }'
    Start-Sleep -Seconds 10
}
```