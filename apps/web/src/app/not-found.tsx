import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

/**
 * Global 404 Not Found Page
 *
 * Displayed when a route doesn't exist
 * Following Next.js 16 App Router conventions
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 text-center">
          {/* 404 Animation */}
          <div className="mb-6 relative">
            {/* Large 404 */}
            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              404
            </div>

            {/* Floating Stars */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 text-yellow-300 text-2xl animate-pulse">
                ✨
              </div>
              <div className="absolute top-1/4 right-1/4 text-purple-300 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>
                ⭐
              </div>
              <div className="absolute bottom-1/4 left-1/3 text-pink-300 text-lg animate-pulse" style={{ animationDelay: '1s' }}>
                💫
              </div>
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-white mb-4">
            Lost in the Cosmos
          </h1>

          {/* Error Description */}
          <p className="text-gray-300 mb-6">
            The page you're looking for doesn't exist in our astrological universe. It might have been moved, deleted, or never existed at all.
          </p>

          {/* Suggestions */}
          <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-sm text-gray-300 mb-2 font-semibold flex items-center justify-center gap-2">
              <Search className="h-4 w-4" />
              Try these instead:
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Check if the URL is spelled correctly</li>
              <li>• Go back to the previous page</li>
              <li>• Return to the homepage</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Home Button */}
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Link>

            {/* Dashboard Button */}
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
              Go to Dashboard
            </Link>
          </div>

          {/* Fun Fact */}
          <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-300">
              🌙 Fun Fact: There are approximately 100-400 billion stars in the Milky Way, but this page isn't one of them!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
