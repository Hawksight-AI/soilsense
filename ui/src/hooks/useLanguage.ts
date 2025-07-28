'use client';

import { useLanguage as useLanguageContext } from '@/components/providers/LanguageProvider';

// Mock translations - in a real app, these would come from translation files
const translations = {
  en: {
    'search.placeholder': 'Search crops, weather, prices...',
    'profile.title': 'Profile',
    'settings.title': 'Settings',
    'auth.logout': 'Logout',
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back',
    'weather.title': 'Weather',
    'crops.title': 'Crops',
    'market.title': 'Market',
    'insurance.title': 'Insurance',
    'irrigation.title': 'Irrigation',
  },
  hi: {
    'search.placeholder': 'फसल, मौसम, कीमतें खोजें...',
    'profile.title': 'प्रोफ़ाइल',
    'settings.title': 'सेटिंग्स',
    'auth.logout': 'लॉगआउट',
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'weather.title': 'मौसम',
    'crops.title': 'फसलें',
    'market.title': 'बाजार',
    'insurance.title': 'बीमा',
    'irrigation.title': 'सिंचाई',
  },
  // Add more languages as needed
} as const;

export function useLanguage() {
  const { language } = useLanguageContext();

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations];
    if (!langTranslations) {
      return translations.en[key as keyof typeof translations.en] || key;
    }
    return langTranslations[key as keyof typeof langTranslations] || translations.en[key as keyof typeof translations.en] || key;
  };

  return { t, language };
} 