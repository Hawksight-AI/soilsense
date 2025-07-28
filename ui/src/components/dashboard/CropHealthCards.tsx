'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';
import { getStatusColor, getGrowthStageColor } from '@/lib/utils';

interface CropData {
  id: string;
  name: string;
  health: number;
  stage: 'seedling' | 'vegetative' | 'flowering' | 'fruiting' | 'harvest';
  area: number;
  lastUpdated: string;
  alerts: number;
}

const mockCrops: CropData[] = [
  {
    id: '1',
    name: 'Wheat',
    health: 85,
    stage: 'vegetative',
    area: 2.5,
    lastUpdated: '2 hours ago',
    alerts: 0,
  },
  {
    id: '2',
    name: 'Rice',
    health: 92,
    stage: 'flowering',
    area: 1.8,
    lastUpdated: '1 hour ago',
    alerts: 1,
  },
  {
    id: '3',
    name: 'Sugarcane',
    health: 78,
    stage: 'fruiting',
    area: 3.2,
    lastUpdated: '3 hours ago',
    alerts: 2,
  },
  {
    id: '4',
    name: 'Cotton',
    health: 95,
    stage: 'harvest',
    area: 1.5,
    lastUpdated: '30 minutes ago',
    alerts: 0,
  },
];

export function CropHealthCards() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Crop Health</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockCrops.map((crop, index) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-neutral-200 rounded-lg hover:shadow-medium transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-neutral-900">{crop.name}</h3>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                  crop.health >= 90 ? 'healthy' : crop.health >= 70 ? 'warning' : 'critical'
                )}`}>
                  {crop.health}%
                </span>
                {crop.alerts > 0 && (
                  <span className="w-2 h-2 bg-error-500 rounded-full"></span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-3">
              <ProgressRing
                progress={crop.health}
                size={60}
                strokeWidth={4}
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <div className="text-sm text-neutral-600 mb-1">
                  Growth Stage
                </div>
                <div className={`text-sm font-medium ${getGrowthStageColor(crop.stage)}`}>
                  {crop.stage.charAt(0).toUpperCase() + crop.stage.slice(1)}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>{crop.area} hectares</span>
              <span>{crop.lastUpdated}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
} 