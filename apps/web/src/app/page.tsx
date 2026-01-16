import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white safe-top safe-bottom">
      <div className="container flex max-w-4xl flex-col items-center gap-6 px-4 py-8 text-center sm:gap-8 sm:py-12">
        {/* Logo/Title */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AstroMood
            </span>
          </h1>
          <p className="text-lg text-purple-200 sm:text-xl md:text-2xl">
            Your cosmic mood companion
          </p>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
          Discover personalized monthly mood forecasts powered by real astronomical calculations.
          Understand how planetary transits influence your energy, focus, and emotions.
        </p>

        {/* Features */}
        <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6 sm:mt-8">
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
        <div className="flex w-full max-w-md flex-col gap-3 mt-6 sm:mt-8 sm:flex-row sm:gap-4">
          <Link href="/signup" className="flex-1">
            <Button
              size="lg"
              className="w-full touch-target bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base sm:text-lg py-6 sm:py-3"
            >
              Get Started
            </Button>
          </Link>
          <Link href="/login" className="flex-1">
            <Button
              size="lg"
              variant="outline"
              className="w-full touch-target border-purple-400 text-purple-300 hover:bg-purple-900/50 text-base sm:text-lg py-6 sm:py-3"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-gray-500 sm:mt-16">
          Made with ☄️ using real ephemeris data
        </p>
      </div>
    </div>
  );
}
