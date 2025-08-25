from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, timedelta
import asyncio

from ..services.weather_service import WeatherService
from ..models.weather import WeatherAlert, WeatherForecast, RouteOptimization

router = APIRouter()

@router.get("/alerts", response_model=List[WeatherAlert])
async def get_weather_alerts(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    radius: int = Query(100, description="Alert radius in km")
):
    """
    Get real-time weather alerts for a specific location
    """
    weather_service = WeatherService()
    
    try:
        alerts = await weather_service.get_alerts(lat, lon, radius)
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch weather alerts: {str(e)}")

@router.get("/forecast", response_model=List[WeatherForecast])
async def get_weather_forecast(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    days: int = Query(10, description="Forecast days (max 10)")
):
    """
    Get weather forecast for up to 10 days
    """
    if days > 10:
        raise HTTPException(status_code=400, detail="Maximum forecast period is 10 days")
    
    weather_service = WeatherService()
    
    try:
        forecast = await weather_service.get_forecast(lat, lon, days)
        return forecast
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch weather forecast: {str(e)}")

@router.post("/optimize-route", response_model=RouteOptimization)
async def optimize_route(
    start_lat: float,
    start_lon: float,
    end_lat: float,
    end_lon: float,
    vessel_speed: float = Query(..., description="Vessel speed in knots"),
    departure_time: Optional[datetime] = None
):
    """
    Get route optimization suggestions based on weather conditions
    """
    weather_service = WeatherService()
    
    if departure_time is None:
        departure_time = datetime.utcnow()
    
    try:
        optimization = await weather_service.optimize_route(
            start_lat, start_lon, end_lat, end_lon, vessel_speed, departure_time
        )
        return optimization
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Route optimization failed: {str(e)}")

@router.get("/marine-conditions")
async def get_marine_conditions(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude")
):
    """
    Get current marine conditions (waves, currents, wind)
    """
    weather_service = WeatherService()
    
    try:
        conditions = await weather_service.get_marine_conditions(lat, lon)
        return conditions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch marine conditions: {str(e)}")