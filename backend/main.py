from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="Soil Monitor API")

# cors meaning allow unity to call this api
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

SUPABASE_URL: str = os.getenv("SUPABASE_URL")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


# latest
# Returns the most recent row from the soil table
@app.get("/sensor/latest")
def get_latest_sensor():
    try:
        res = supabase.table("soil") \
            .select("*") \
            .order("created_at", desc=True) \
            .limit(1) \
            .execute()

        if not res.data:
            raise HTTPException(status_code=404, detail="No sensor data found.")

        return res.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# history
# Returns last N rows from soil table (default 20, max 100)
@app.get("/sensor/history")
def get_sensor_history(limit: int = 30):
    if limit > 100:
        limit = 100
    try:
        res = supabase.table("soil") \
            .select("*") \
            .order("created_at", desc=True) \
            .limit(limit) \
            .execute()

        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# status
# Returns the most recent row from the algo table
@app.get("/status/latest")
def get_latest_status():
    try:
        res = supabase.table("algo") \
            .select("*") \
            .order("created_at", desc=True) \
            .limit(1) \
            .execute()
        

        print("Status data from Supabase:", res.data) 

        if not res.data:
            raise HTTPException(status_code=404, detail="No status data found.")

        return res.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# get all
# Unity can call this single endpoint to get everything at once
@app.get("/dashboard/latest")
def get_dashboard_latest():
    try:
        soil_res = supabase.table("soil") \
            .select("*") \
            .order("created_at", desc=True) \
            .limit(1) \
            .execute()

        algo_res = supabase.table("algo") \
            .select("*") \
            .order("created_at", desc=True) \
            .limit(1) \
            .execute()

        soil = soil_res.data[0] if soil_res.data else None
        algo = algo_res.data[0] if algo_res.data else None

        return {
            "sensor": soil,
            "status": algo
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# test home
@app.get("/")
def health_check():
    return {"status": "ok", "message": "Soil Monitor API is running."}