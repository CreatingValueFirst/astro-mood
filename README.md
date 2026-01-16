# AstroMood

> Personalized monthly mood forecasts powered by real astronomical calculations

AstroMood is a modern astrology app that generates data-driven monthly mood forecasts using actual planetary positions and transits. Built with Next.js, Supabase, and the astronomy-engine library for accurate celestial calculations.

## Features

- **Real Astronomical Data**: Uses `astronomy-engine` for precise planetary calculations
- **Personalized Forecasts**: Monthly mood scores based on your birth date and current transits
- **Explainable Insights**: Understand *why* certain days have specific mood patterns
- **Beautiful UI**: Premium design with dark mode support
- **Cloud-Synced**: Save multiple birth profiles, access from any device
- **Privacy-First**: Row-level security ensures your data stays private

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Calculations**: astronomy-engine (JavaScript astronomy library)
- **Deployment**: Vercel
- **UI Components**: shadcn/ui + custom components

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works great)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/astro-mood.git
cd astro-mood
```

### 2. Install Dependencies

```bash
# Install dependencies for the Next.js web app
cd apps/web
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be provisioned

#### Link Your Local Project

```bash
# From the root directory
cd ../..
npx supabase link --project-ref your-project-ref

# Start local Supabase (optional, for local development)
npx supabase start
```

#### Run Migrations

```bash
# Apply database schema
npx supabase db push
```

### 4. Configure Environment Variables

```bash
# Copy the example env file
cd apps/web
cp .env.example .env.local
```

Edit `apps/web/.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

You can find these values in your Supabase project settings under **Settings > API**.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
astro-mood/
├── apps/
│   └── web/                    # Next.js web application
│       ├── src/
│       │   ├── app/            # Next.js App Router pages
│       │   ├── components/     # React components
│       │   └── lib/            # Utilities and Supabase clients
│       └── package.json
├── packages/
│   ├── astro-core/             # Shared astrology calculation logic
│   └── shared-types/           # Shared TypeScript types
├── supabase/
│   ├── functions/              # Edge Functions
│   └── migrations/             # Database migrations
└── docs/                       # Documentation
```

## Development

### Running Tests

```bash
cd apps/web
npm test
```

### Building for Production

```bash
cd apps/web
npm run build
```

### Database Migrations

```bash
# Create a new migration
npx supabase migration new your_migration_name

# Apply migrations
npx supabase db push

# Reset database (⚠️ destructive)
npx supabase db reset
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

### Supabase Production Setup

1. In your Supabase dashboard, go to **Settings > API**
2. Copy your production URL and anon key
3. Add them to Vercel's environment variables
4. Run migrations on production:

```bash
npx supabase db push --linked
```

## Features Roadmap

### Phase 1: MVP (Current)
- [x] Project setup and infrastructure
- [ ] Database schema and migrations
- [ ] Astronomical calculation engine
- [ ] User authentication
- [ ] Onboarding flow
- [ ] Monthly forecast generation
- [ ] Dashboard UI
- [ ] Calendar view
- [ ] Basic deployment

### Phase 2: Enhancements
- [ ] Full natal chart support (requires birth time + location)
- [ ] Daily forecasts
- [ ] Transit notifications
- [ ] Synastry/compatibility reports
- [ ] Mobile app (React Native)

### Phase 3: Advanced
- [ ] AI-enhanced content generation
- [ ] Community features
- [ ] Premium subscription tiers
- [ ] Email digests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **astronomy-engine** - Precise astronomical calculations
- **Supabase** - Backend infrastructure
- **Astro.com** - Reference for validation
- **Cafe Astrology**, **Astrology King** - Astrological wisdom and interpretations

## Support

For questions or issues, please open an issue on GitHub or contact [@yourusername](https://github.com/yourusername).

---

Made with ☄️ by the AstroMood team
