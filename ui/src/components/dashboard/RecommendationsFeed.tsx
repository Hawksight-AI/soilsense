'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'info' | 'warning';
  priority: 'high' | 'medium' | 'low';
  time: string;
  completed?: boolean;
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Apply Fertilizer',
    description: 'Your wheat crop needs nitrogen fertilizer application this week for optimal growth.',
    type: 'action',
    priority: 'high',
    time: '2 hours ago',
  },
  {
    id: '2',
    title: 'Monitor Soil Moisture',
    description: 'Soil moisture levels are dropping. Consider irrigation scheduling for rice field.',
    type: 'warning',
    priority: 'medium',
    time: '4 hours ago',
  },
  {
    id: '3',
    title: 'Pest Prevention',
    description: 'Weather conditions are favorable for pest activity. Apply preventive measures.',
    type: 'info',
    priority: 'medium',
    time: '6 hours ago',
  },
  {
    id: '4',
    title: 'Harvest Planning',
    description: 'Cotton crop is ready for harvest. Plan your harvesting schedule.',
    type: 'action',
    priority: 'low',
    time: '1 day ago',
    completed: true,
  },
];

const priorityColors = {
  high: 'border-l-4 border-l-error-500',
  medium: 'border-l-4 border-l-warning-500',
  low: 'border-l-4 border-l-info-500',
};

const typeIcons = {
  action: Lightbulb,
  info: Clock,
  warning: CheckCircle,
};

const typeColors = {
  action: 'text-primary-600',
  info: 'text-info-600',
  warning: 'text-warning-600',
};

export function RecommendationsFeed() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">AI Recommendations</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockRecommendations.map((recommendation, index) => {
          const Icon = typeIcons[recommendation.type];
          return (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg bg-white border border-neutral-200 hover:shadow-medium transition-shadow ${
                recommendation.completed ? 'opacity-60' : ''
              } ${priorityColors[recommendation.priority]}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${typeColors[recommendation.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-neutral-900">
                      {recommendation.title}
                      {recommendation.completed && (
                        <span className="ml-2 text-xs text-success-600">✓ Completed</span>
                      )}
                    </h3>
                    <span className="text-xs text-neutral-500">
                      {recommendation.time}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">
                    {recommendation.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      recommendation.priority === 'high' 
                        ? 'bg-error-100 text-error-700' 
                        : recommendation.priority === 'medium'
                        ? 'bg-warning-100 text-warning-700'
                        : 'bg-info-100 text-info-700'
                    }`}>
                      {recommendation.priority.toUpperCase()}
                    </span>
                    {!recommendation.completed && (
                      <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                        Take Action
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">Based on your farm data and weather</span>
          <span className="text-primary-600 font-medium">AI Powered</span>
        </div>
      </div>
    </Card>
  );
} 