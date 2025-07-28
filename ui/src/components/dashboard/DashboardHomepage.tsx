'use client';

import { motion } from 'framer-motion';
import { WeatherWidget } from './WeatherWidget';
import { CropHealthCards } from './CropHealthCards';
import { AlertsCarousel } from './AlertsCarousel';
import { QuickActions } from './QuickActions';
import { MarketPriceTicker } from './MarketPriceTicker';
import { RecommendationsFeed } from './RecommendationsFeed';
import { useLanguage } from '@/hooks/useLanguage';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function DashboardHomepage() {
  const { t } = useLanguage();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
          {t('dashboard.welcome')}
        </h1>
        <p className="text-neutral-600">
          Your AI-powered farming companion
        </p>
      </motion.div>

      {/* Weather Widget */}
      <motion.div variants={itemVariants}>
        <WeatherWidget />
      </motion.div>

      {/* Alerts Carousel */}
      <motion.div variants={itemVariants}>
        <AlertsCarousel />
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <QuickActions />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Health Cards */}
        <motion.div variants={itemVariants}>
          <CropHealthCards />
        </motion.div>

        {/* Market Price Ticker */}
        <motion.div variants={itemVariants}>
          <MarketPriceTicker />
        </motion.div>
      </div>

      {/* Recommendations Feed */}
      <motion.div variants={itemVariants}>
        <RecommendationsFeed />
      </motion.div>
    </motion.div>
  );
} 