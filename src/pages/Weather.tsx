import React from 'react';
import { WeatherDashboard } from '../components/WeatherDashboard';
import { Cloud, Navigation, Zap } from 'lucide-react';

export function Weather() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Cloud className="h-8 w-8 mr-3 text-blue-600" />
          Marine Weather Intelligence
        </h1>
        <p className="text-gray-600">
          Real-time weather alerts, marine forecasts, and route optimization for safe navigation.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center mb-3">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Real-time Alerts</h3>
          </div>
          <p className="text-sm text-gray-700">
            Cyclone warnings, storm alerts, and severe weather notifications for your route.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center mb-3">
            <div className="bg-green-600 p-2 rounded-lg mr-3">
              <Navigation className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Route Optimization</h3>
          </div>
          <p className="text-sm text-gray-700">
            AI-powered speed and course recommendations based on weather conditions.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center mb-3">
            <div className="bg-purple-600 p-2 rounded-lg mr-3">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">10-Day Forecast</h3>
          </div>
          <p className="text-sm text-gray-700">
            Extended marine forecasts with wind, wave, and current predictions.
          </p>
        </div>
      </div>

      {/* Weather Dashboard */}
      <WeatherDashboard />
    </div>
  );
}