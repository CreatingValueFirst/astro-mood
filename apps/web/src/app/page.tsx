import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
      <div className="container flex max-w-4xl flex-col items-center gap-8 px-4 text-center">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AstroMood
            </span>
          </h1>
          <p className="text-xl text-purple-200 sm:text-2xl">
            Your cosmic mood companion
          </p>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-lg text-gray-300">
          Discover personalized monthly mood forecasts powered by real astronomical calculations.
          Understand how planetary transits influence your energy, focus, and emotions.
        </p>

        {/* Features */}
        <div className="grid gap-4 sm:grid-cols-3 max-w-3xl w-full mt-8">
          <div className="rounded-lg border border-purple-500/20 bg-purple-900/20 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold mb-2">Real Astronomy</h3>
            <p className="text-sm text-gray-400">
              Based on actual planetary positions, not generic horoscopes
            </p>
          </div>
          <div className="rounded-lg border border-purple-500/20 bg-purple-900/20 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold mb-2">Explainable</h3>
            <p className="text-sm text-gray-400">
              See exactly why certain days have specific mood patterns
            </p>
          </div>
          <div className="rounded-lg border border-purple-500/20 bg-purple-900/20 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold mb-2">Personalized</h3>
            <p className="text-sm text-gray-400">
              Forecasts tailored to your unique birth chart
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-8">
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-900/50">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-16 text-sm text-gray-500">
          Made with ☄️ using real ephemeris data
        </p>
      </div>
    </div>
  );
}
