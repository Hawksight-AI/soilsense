# 🌾 SoilSense UI

A modern, multilingual Progressive Web App (PWA) for SoilSense - an AI-powered farming platform designed specifically for Indian farmers. The interface provides intuitive access to weather monitoring, crop management, market intelligence, and agricultural insights.

## 🚀 Features

### Core Functionality
- **Weather Monitoring**: Real-time weather data with 7-day forecasts
- **Crop Health Tracking**: Visual indicators for crop growth stages and health
- **Market Intelligence**: Live price updates and market trends
- **AI Recommendations**: Personalized farming advice and alerts
- **Multilingual Support**: Support for 9 Indian languages
- **Offline Capability**: Works without internet connection
- **PWA Features**: Installable app with native-like experience

### Technical Features
- **Responsive Design**: Mobile-first approach with touch-friendly interface
- **Performance Optimized**: Fast loading with service worker caching
- **Accessibility**: WCAG AA compliant with screen reader support
- **Modern UI**: Glassmorphism effects and smooth animations
- **Type Safety**: Full TypeScript implementation
- **State Management**: Zustand for efficient state handling

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom agricultural theme
- **Framer Motion** for animations

### UI Components
- **Radix UI** for accessible base components
- **Lucide React** for consistent iconography
- **React Hook Form** with Zod validation

### Data & State
- **TanStack Query** for data fetching and caching
- **Zustand** for state management
- **IndexedDB** for offline data storage

### PWA & Performance
- **Next-PWA** for PWA configuration
- **Workbox** for service worker management
- **React Spring** for physics-based animations

## 🎨 Design System

### Color Palette
```css
/* Primary - Agricultural Green */
--primary-500: #22c55e;
--primary-600: #16a34a;

/* Secondary - Earth Tones */
--earth-500: #f97316;
--earth-600: #ea580c;

/* Accent - Sky Blue */
--sky-500: #0ea5e9;
--sky-600: #0284c7;
```

### Typography
- **Primary**: Inter for UI elements
- **Display**: Poppins for headings
- **Regional**: Noto Sans for Indian languages

### Components
- Glassmorphic cards with backdrop blur
- Agricultural-themed animations
- High contrast mode support
- Touch-friendly button sizes (44px minimum)

## 📱 Key Interface Sections

### 1. Dashboard Homepage
- Weather widget with 7-day forecast
- Crop health status cards
- Urgent alerts carousel
- Quick action buttons
- Market price ticker
- AI recommendations feed

### 2. Crop Management Hub
- Interactive crop calendar
- Growth stage tracker
- Pest/disease identification
- Treatment history timeline

### 3. Market Intelligence Center
- Real-time price charts
- Market trend analysis
- Mandi location finder
- Price alerts configuration

### 4. Weather & Irrigation Planner
- Interactive weather maps
- Irrigation scheduling
- Soil moisture indicators
- Rainfall predictions

## 🌐 Multilingual Support

### Supported Languages
- English (en)
- Hindi (hi)
- Marathi (mr)
- Tamil (ta)
- Telugu (te)
- Kannada (kn)
- Bengali (bn)
- Punjabi (pa)
- Assamese (as)

### Localization Features
- Dynamic font loading for regional scripts
- Cultural date/number formatting
- Region-specific crop calendars
- Local weather terminology

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/soilsense/ui.git
   cd ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run e2e          # Run end-to-end tests

# Storybook
npm run storybook    # Start Storybook
npm run build-storybook # Build Storybook

# Performance
npm run lighthouse   # Run Lighthouse audit
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   └── ui/              # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run e2e
```

### Accessibility Tests
```bash
npm run test:a11y
```

## 📊 Performance Metrics

### Target Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **PWA Audit Score**: > 90

### Monitoring
- Lighthouse CI integration
- Real User Monitoring (RUM)
- Core Web Vitals tracking

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.soilsense.app
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# PWA Configuration
NEXT_PUBLIC_APP_NAME=SoilSense
NEXT_PUBLIC_APP_DESCRIPTION=AI-Powered Farming Platform
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Agricultural color palette
- Custom animations
- Responsive breakpoints
- Accessibility utilities

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful commit messages

## 📚 Documentation

### Component Documentation
Each component includes:
- JSDoc comments
- Storybook stories
- Usage examples
- Accessibility notes

### API Documentation
- REST API endpoints
- GraphQL schema
- WebSocket events
- Error handling

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Docker Deployment
```bash
docker build -t soilsense-ui .
docker run -p 3000:3000 soilsense-ui
```

### Vercel Deployment
```bash
vercel --prod
```

## 📱 PWA Features

### Installation
- Add to home screen on mobile
- Desktop app installation
- Offline functionality
- Background sync

### Service Worker
- Cache-first strategy for static assets
- Network-first for API calls
- Background sync for form submissions
- Push notifications

## 🔒 Security

### Security Headers
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### Data Protection
- Input validation
- XSS prevention
- CSRF protection
- Secure API communication

## 📈 Analytics

### User Analytics
- Page views and navigation
- Feature usage tracking
- Performance monitoring
- Error tracking

### Agricultural Analytics
- Crop health trends
- Weather impact analysis
- Market price patterns
- Yield predictions

## 🆘 Support

### Getting Help
- Check the [documentation](https://docs.soilsense.app)
- Search [existing issues](https://github.com/soilsense/ui/issues)
- Create a [new issue](https://github.com/soilsense/ui/issues/new)

### Community
- [Discord Server](https://discord.gg/soilsense)
- [Telegram Group](https://t.me/soilsense)
- [Email Support](mailto:support@soilsense.app)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indian farmers for feedback and insights
- Agricultural experts for domain knowledge
- Open source community for tools and libraries
- Design system contributors

---

**Built with ❤️ for Indian Farmers** 