'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency } from '@/lib/utils';

interface PriceData {
  id: string;
  crop: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  unit: string;
  mandi: string;
}

const mockPriceData: PriceData[] = [
  {
    id: '1',
    crop: 'Wheat',
    currentPrice: 2150,
    previousPrice: 2100,
    change: 2.38,
    unit: 'per quintal',
    mandi: 'Bareilly',
  },
  {
    id: '2',
    crop: 'Rice',
    currentPrice: 1850,
    previousPrice: 1900,
    change: -2.63,
    unit: 'per quintal',
    mandi: 'Lucknow',
  },
  {
    id: '3',
    crop: 'Sugarcane',
    currentPrice: 315,
    previousPrice: 310,
    change: 1.61,
    unit: 'per quintal',
    mandi: 'Meerut',
  },
  {
    id: '4',
    crop: 'Cotton',
    currentPrice: 6500,
    previousPrice: 6450,
    change: 0.78,
    unit: 'per quintal',
    mandi: 'Agra',
  },
];

export function MarketPriceTicker() {
  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-success-600" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-error-600" />;
    return <Minus className="w-4 h-4 text-neutral-500" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-success-600';
    if (change < 0) return 'text-error-600';
    return 'text-neutral-600';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Market Prices</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockPriceData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-neutral-900">{item.crop}</h3>
                <div className="flex items-center space-x-2">
                  {getChangeIcon(item.change)}
                  <span className={`text-sm font-medium ${getChangeColor(item.change)}`}>
                    {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">{item.unit}</span>
                <span className="text-neutral-500">{item.mandi}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-lg font-semibold text-neutral-900">
                {formatCurrency(item.currentPrice)}
              </div>
              <div className="text-xs text-neutral-500">
                Prev: {formatCurrency(item.previousPrice)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">Last updated: 2 minutes ago</span>
          <span className="text-primary-600 font-medium">Live</span>
        </div>
      </div>
    </Card>
  );
} 