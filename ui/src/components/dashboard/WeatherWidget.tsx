'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';
import { Card } from '../ui/Card';

interface WeatherData {
  current: {
    temperature: number;
    condition: 'sunny' | 'cloudy' | 'rainy';
    humidity: number;
    windSpeed: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: 'sunny' | 'cloudy' | 'rainy';
  }>;
}

const mockWeatherData: WeatherData = {
  current: {
    temperature: 28,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
  },
  forecast: [
    { date: 'Today', high: 30, low: 22, condition: 'sunny' },
    { date: 'Tomorrow', high: 29, low: 21, condition: 'cloudy' },
    { date: 'Wed', high: 27, low: 20, condition: 'rainy' },
    { date: 'Thu', high: 31, low: 23, condition: 'sunny' },
    { date: 'Fri', high: 28, low: 21, condition: 'cloudy' },
    { date: 'Sat', high: 32, low: 24, condition: 'sunny' },
    { date: 'Sun', high: 29, low: 22, condition: 'cloudy' },
  ],
};

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
};

const weatherColors = {
  sunny: 'text-yellow-500',
  cloudy: 'text-sky-500',
  rainy: 'text-sky-600',
};

export function WeatherWidget() {
  const [weather] = useState<WeatherData>(mockWeatherData);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Weather</h2>
        <span className="text-sm text-neutral-500">Bareilly, UP</span>
      </div>

      {/* Current Weather */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            {(() => {
              const Icon = weatherIcons[weather.current.condition];
              return <Icon className={`w-16 h-16 ${weatherColors[weather.current.condition]}`} />;
            })()}
          </div>
          <div className="text-4xl font-bold text-neutral-900 mb-2">
            {weather.current.temperature}°C
          </div>
          <div className="text-lg text-neutral-600 capitalize">
            {weather.current.condition}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-neutral-500" />
              <span className="text-neutral-700">Feels like</span>
            </div>
            <span className="font-medium">{weather.current.temperature + 2}°C</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-neutral-500" />
              <span className="text-neutral-700">Humidity</span>
            </div>
            <span className="font-medium">{weather.current.humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wind className="w-5 h-5 text-neutral-500" />
              <span className="text-neutral-700">Wind</span>
            </div>
            <span className="font-medium">{weather.current.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-7 gap-2">
          {weather.forecast.map((day, index) => {
            const Icon = weatherIcons[day.condition];
            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-3 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="text-sm text-neutral-600 mb-1">{day.date}</div>
                <Icon className={`w-6 h-6 mx-auto mb-2 ${weatherColors[day.condition]}`} />
                <div className="text-sm font-medium text-neutral-900">{day.high}°</div>
                <div className="text-xs text-neutral-500">{day.low}°</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
} 