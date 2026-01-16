# 🌟 AstroMood

<div align="center">

![AstroMood Banner](https://img.shields.io/badge/AstroMood-Cosmic%20Mood%20Companion-purple?style=for-the-badge)

**Personalized monthly mood forecasts powered by real astronomical calculations**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

[Demo](https://astro-mood.vercel.app) · [Documentation](./docs) · [Report Bug](https://github.com/CreatingValueFirst/astro-mood/issues) · [Request Feature](https://github.com/CreatingValueFirst/astro-mood/issues)

</div>

---

## ✨ Features

- 🔭 **Real Astronomical Data** - Calculations based on actual planetary positions using `astronomy-engine`
- 🧠 **Explainable AI** - Transparent mood scoring model showing exactly why certain days have specific patterns
- 📊 **5 Mood Dimensions** - Track energy, focus, romance, stress, and social vitality
- 🌙 **Lunation Tracking** - New Moons, Full Moons, and eclipses with detailed impacts
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation and screen reader support
- 🔐 **Privacy First** - Row-level security, encrypted data, GDPR compliant
- 📱 **Responsive** - Beautiful UI that works on all devices
- ⚡ **Fast** - Server-side rendering with smart caching

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account (free tier)
- Vercel account (optional, for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/CreatingValueFirst/astro-mood.git
cd astro-mood

# Install dependencies
cd apps/web
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from your [Supabase project settings](https://supabase.com/dashboard/project/_/settings/api).

## 📦 Project Structure

```
astro-mood/
├── apps/
│   └── web/                    # Next.js web application
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   │   ├── (auth)/     # Authentication pages
│       │   │   ├── dashboard/  # Protected dashboard
│       │   │   └── onboarding/ # User onboarding
│       │   ├── components/     # React components
│       │   │   └── ui/         # shadcn/ui components
│       │   ├── lib/            # Utilities
│       │   │   └── supabase/   # Supabase clients
│       │   └── middleware.ts   # Auth middleware
│       └── package.json
├── packages/
│   ├── astro-core/             # Astrology calculation engine
│   │   ├── src/
│   │   │   ├── calculations/   # Planetary positions, aspects
│   │   │   ├── interpretations/# Mood scoring model
│   │   │   └── types.ts        # TypeScript definitions
│   │   └── package.json
│   └── shared-types/           # Shared TypeScript types
├── supabase/
│   ├── migrations/             # Database migrations
│   └── functions/              # Edge Functions
├── docs/                       # Documentation
└── README.md
```

## 🗄️ Database Schema

AstroMood uses Supabase (PostgreSQL) with the following tables:

- `birth_profiles` - User birth data for chart calculations
- `natal_charts` - Cached natal chart computations
- `monthly_forecasts` - Cached monthly mood forecasts
- `ephemeris_cache` - Shared planetary position data

All tables are protected with Row Level Security (RLS) policies.

## 🧮 Astrology Engine

The core calculation engine (`packages/astro-core`) provides:

### Planetary Calculations
- Real-time planetary positions for all 10 celestial bodies
- Retrograde detection using velocity analysis
- Sign ingress (planet entering new zodiac sign) finder
- Lunation calculator (New/Full Moons)

### Mood Scoring Model

**Deterministic algorithm** that converts astronomical transits into quantifiable mood impacts:

```typescript
MoodScore = {
  overall: 0-100,
  energy: 0-100,
  focus: 0-100,
  romance: 0-100,
  stress: 0-100,   // Higher = more stress
  social: 0-100
}
```

**Factors considered:**
- Planet influence weights (Sun: 1.0, Moon: 0.9, etc.)
- Sign compatibility modifiers
- Aspect multipliers (conjunction, trine, square, opposition)
- Transit-to-natal relationships
- Special events (Mercury retrograde, eclipses)

### Example Usage

```typescript
import { calculatePlanetaryPositions, calculateDailyMood } from '@astro-mood/astro-core';

// Get current planetary positions
const positions = calculatePlanetaryPositions(new Date());

// Calculate mood for a Capricorn
const mood = calculateDailyMood(
  new Date(),
  'Capricorn',
  [
    { planet: 'Mars', sign: 'Leo', aspectType: 'Trine' },
    { planet: 'Venus', sign: 'Pisces' }
  ]
);

console.log(mood);
// { overall: 72, energy: 80, focus: 65, romance: 85, stress: 35, social: 70 }
```

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS:

- 🎭 Cosmic gradient theme (purple/pink/indigo)
- 🌙 Dark mode optimized
- 📱 Fully responsive
- ♿ Accessible (WCAG AA)
- ⚡ Optimized performance

## 🔐 Authentication & Security

- **Supabase Auth** - Email/password authentication
- **Row Level Security** - Users can only access their own data
- **Session Management** - Automatic token refresh via middleware
- **Protected Routes** - Middleware-based route protection
- **HTTPS Only** - Secure communication in production

## 📊 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CreatingValueFirst/astro-mood&project-name=astro-mood&repository-name=astro-mood&root-directory=apps/web&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY)

1. Click the button above
2. Connect your GitHub account
3. Configure environment variables
4. Deploy!

**Manual Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Configure Supabase

After deployment, add your Vercel URL to Supabase:

1. Go to [Supabase Auth Settings](https://supabase.com/dashboard)
2. Add to **Redirect URLs**: `https://your-app.vercel.app/**`
3. Update **Site URL**: `https://your-app.vercel.app`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type check
npm run type-check

# Lint
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- **astronomy-engine** - Precise astronomical calculations
- **Supabase** - Backend infrastructure
- **shadcn/ui** - Beautiful UI components
- **Vercel** - Deployment platform
- **Astro.com** - Reference for validation

## 📧 Contact

- **GitHub**: [@CreatingValueFirst](https://github.com/CreatingValueFirst)
- **Project**: [astro-mood](https://github.com/CreatingValueFirst/astro-mood)
- **Issues**: [Bug Reports & Feature Requests](https://github.com/CreatingValueFirst/astro-mood/issues)

## 🗺️ Roadmap

- [x] Core astrology calculation engine
- [x] User authentication
- [x] Birth profile management
- [x] Basic dashboard
- [ ] Monthly forecast generation API
- [ ] Calendar view with daily breakdown
- [ ] Insights page with natal chart
- [ ] Transit notifications
- [ ] Synastry/compatibility reports
- [ ] Mobile app (React Native)
- [ ] AI-enhanced content generation
- [ ] Premium subscription tiers

---

<div align="center">

**Made with ☄️ by AstroMood**

[⬆ Back to Top](#-astromood)

</div>
