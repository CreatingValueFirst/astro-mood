'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Dashboard Error Boundary
 *
 * Catches errors in the dashboard and provides contextual fallback UI
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-orange-500/20 p-4">
              <AlertTriangle className="h-12 w-12 text-orange-400" />
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Dashboard Unavailable
          </h1>

          {/* Error Description */}
          <p className="text-gray-300 text-center mb-6">
            We're having trouble loading your cosmic dashboard. This could be due to:
          </p>

          {/* Common Causes */}
          <ul className="space-y-2 mb-6 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Missing or incomplete birth profile information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Temporary connection issues with our astrological calculations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>An unexpected error in the cosmic data processing</span>
            </li>
          </ul>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-black/30 rounded-lg border border-orange-500/30">
              <p className="text-xs font-mono text-orange-300 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-gray-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Retry Button */}
            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
            >
              <RefreshCw className="h-5 w-5" />
              Reload Dashboard
            </button>

            {/* Back Button */}
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300 text-center">
              💡 Tip: Make sure you've completed your birth profile in the onboarding process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
