'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Irrigation Required',
    message: 'Wheat field needs irrigation within 24 hours',
    time: '2 hours ago',
    priority: 'high',
  },
  {
    id: '2',
    type: 'error',
    title: 'Pest Alert',
    message: 'Potential pest infestation detected in rice field',
    time: '4 hours ago',
    priority: 'high',
  },
  {
    id: '3',
    type: 'info',
    title: 'Weather Update',
    message: 'Heavy rainfall expected in next 48 hours',
    time: '6 hours ago',
    priority: 'medium',
  },
];

const alertIcons = {
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

const alertColors = {
  warning: 'text-warning-600 bg-warning-50 border-warning-200',
  error: 'text-error-600 bg-error-50 border-error-200',
  info: 'text-info-600 bg-info-50 border-info-200',
};

export function AlertsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextAlert = () => {
    setCurrentIndex((prev) => (prev + 1) % mockAlerts.length);
  };

  const prevAlert = () => {
    setCurrentIndex((prev) => (prev - 1 + mockAlerts.length) % mockAlerts.length);
  };

  if (mockAlerts.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-neutral-900">Urgent Alerts</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevAlert}
            className="p-1 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Previous alert"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-neutral-500">
            {currentIndex + 1} of {mockAlerts.length}
          </span>
          <button
            onClick={nextAlert}
            className="p-1 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Next alert"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg border ${alertColors[mockAlerts[currentIndex].type]}`}
          >
            <div className="flex items-start space-x-3">
              {(() => {
                const Icon = alertIcons[mockAlerts[currentIndex].type];
                return <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />;
              })()}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-sm">
                    {mockAlerts[currentIndex].title}
                  </h3>
                  <span className="text-xs opacity-75">
                    {mockAlerts[currentIndex].time}
                  </span>
                </div>
                <p className="text-sm opacity-90">
                  {mockAlerts[currentIndex].message}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    mockAlerts[currentIndex].priority === 'high' 
                      ? 'bg-red-100 text-red-700' 
                      : mockAlerts[currentIndex].priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {mockAlerts[currentIndex].priority.toUpperCase()}
                  </span>
                  <button className="text-xs font-medium hover:underline">
                    Take Action
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {mockAlerts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary-600' : 'bg-neutral-300'
            }`}
            aria-label={`Go to alert ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  );
} 