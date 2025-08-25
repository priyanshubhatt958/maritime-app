import React, { useState, useEffect } from 'react';
import { Cloud, Wind, Waves, AlertTriangle, Navigation, TrendingUp } from 'lucide-react';

interface WeatherData {
  alerts: Array<{
    type: string;
    severity: string;
    message: string;
    validUntil: string;
  }>;
  forecast: Array<{
    date: string;
    temperature: number;
    windSpeed: number;
    waveHeight: number;
    conditions: string;
  }>;
  marineConditions: {
    windSpeed: number;
    windDirection: number;
    waveHeight: number;
    currentSpeed: number;
    visibility: number;
  };
}

export function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({ lat: 51.5074, lon: -0.1278 }); // London

  useEffect(() => {
    fetchWeatherData();
  }, [selectedLocation]);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Mock weather data - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWeatherData({
        alerts: [
          {
            type: "Storm Warning",
            severity: "high",
            message: "Severe thunderstorms expected with winds up to 45 knots",
            validUntil: "2024-01-16T18:00:00Z"
          },
          {
            type: "High Seas",
            severity: "medium",
            message: "Wave heights 3-5 meters expected",
            validUntil: "2024-01-17T06:00:00Z"
          }
        ],
        forecast: Array.from({ length: 10 }, (_, i) => ({
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          temperature: 15 + Math.random() * 10,
          windSpeed: 10 + Math.random() * 20,
          waveHeight: 1 + Math.random() * 3,
          conditions: ['Clear', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)]
        })),
        marineConditions: {
          windSpeed: 15.5,
          windDirection: 245,
          waveHeight: 2.3,
          currentSpeed: 1.2,
          visibility: 8.5
        }
      });
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Weather Alerts */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
          Active Weather Alerts
        </h3>
        
        {weatherData?.alerts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No active weather alerts</p>
        ) : (
          <div className="space-y-3">
            {weatherData?.alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} animate-fadeIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{alert.type}</h4>
                    <p className="text-sm mt-1">{alert.message}</p>
                  </div>
                  <span className="text-xs opacity-75">
                    Valid until {new Date(alert.validUntil).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current Marine Conditions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Waves className="h-5 w-5 mr-2 text-blue-500" />
          Current Marine Conditions
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg transform hover:scale-105 transition-transform">
            <Wind className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="text-xl font-bold text-blue-600">{weatherData?.marineConditions.windSpeed} kts</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg transform hover:scale-105 transition-transform">
            <Navigation className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Wind Direction</p>
            <p className="text-xl font-bold text-green-600">{weatherData?.marineConditions.windDirection}°</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg transform hover:scale-105 transition-transform">
            <Waves className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Wave Height</p>
            <p className="text-xl font-bold text-purple-600">{weatherData?.marineConditions.waveHeight} m</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg transform hover:scale-105 transition-transform">
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Current Speed</p>
            <p className="text-xl font-bold text-orange-600">{weatherData?.marineConditions.currentSpeed} kts</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg transform hover:scale-105 transition-transform">
            <Cloud className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Visibility</p>
            <p className="text-xl font-bold text-gray-600">{weatherData?.marineConditions.visibility} nm</p>
          </div>
        </div>
      </div>

      {/* 10-Day Forecast */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">10-Day Marine Forecast</h3>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {weatherData?.forecast.map((day, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border transform hover:scale-105 transition-all duration-200"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <p className="text-sm font-medium text-gray-900 text-center mb-2">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
                
                <div className="text-center space-y-2">
                  <p className="text-xs text-gray-600">Temp</p>
                  <p className="text-lg font-bold text-blue-600">{Math.round(day.temperature)}°C</p>
                  
                  <p className="text-xs text-gray-600">Wind</p>
                  <p className="text-sm font-semibold text-green-600">{Math.round(day.windSpeed)} kts</p>
                  
                  <p className="text-xs text-gray-600">Waves</p>
                  <p className="text-sm font-semibold text-purple-600">{day.waveHeight.toFixed(1)} m</p>
                  
                  <p className="text-xs text-gray-500 mt-2">{day.conditions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}