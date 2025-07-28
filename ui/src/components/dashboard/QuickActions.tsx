'use client';

import { motion } from 'framer-motion';
import { 
  Droplets, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Camera, 
  MessageSquare,
  MapPin,
  FileText
} from 'lucide-react';
import { Card } from '../ui/Card';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Irrigation',
    description: 'Schedule watering',
    icon: Droplets,
    color: 'bg-sky-500',
    href: '/irrigation',
  },
  {
    id: '2',
    title: 'Calendar',
    description: 'View farming schedule',
    icon: Calendar,
    color: 'bg-primary-500',
    href: '/calendar',
  },
  {
    id: '3',
    title: 'Market Prices',
    description: 'Check current rates',
    icon: TrendingUp,
    color: 'bg-earth-500',
    href: '/market',
  },
  {
    id: '4',
    title: 'Insurance',
    description: 'Manage policies',
    icon: Shield,
    color: 'bg-info-500',
    href: '/insurance',
  },
  {
    id: '5',
    title: 'Crop Scanner',
    description: 'Identify diseases',
    icon: Camera,
    color: 'bg-success-500',
    href: '/scanner',
  },
  {
    id: '6',
    title: 'Expert Chat',
    description: 'Get advice',
    icon: MessageSquare,
    color: 'bg-warning-500',
    href: '/chat',
  },
  {
    id: '7',
    title: 'Location',
    description: 'Find nearby services',
    icon: MapPin,
    color: 'bg-error-500',
    href: '/location',
  },
  {
    id: '8',
    title: 'Documents',
    description: 'Manage records',
    icon: FileText,
    color: 'bg-neutral-500',
    href: '/documents',
  },
];

export function QuickActions() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-neutral-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => console.log(`Navigate to ${action.href}`)}
              className="w-full p-4 rounded-xl border border-neutral-200 hover:shadow-medium transition-all duration-200 group"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-neutral-900 text-sm mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </Card>
  );
} 