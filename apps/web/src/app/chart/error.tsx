'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Chart Error Boundary
 *
 * Catches errors in the natal chart page and provides specific fallback UI
 */
export default function ChartError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Chart error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-500/20 p-4">
              <AlertCircle className="h-12 w-12 text-red-400" />
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Chart Calculation Error
          </h1>

          {/* Error Description */}
          <p className="text-gray-300 text-center mb-6">
            We encountered an issue while calculating your natal chart. This might be because:
          </p>

          {/* Common Causes */}
          <ul className="space-y-2 mb-6 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Your birth profile is incomplete or missing required data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>The birth time or location data is invalid</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Astrological calculation engine encountered an error</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Ephemeris data is temporarily unavailable</span>
            </li>
          </ul>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-black/30 rounded-lg border border-red-500/30">
              <p className="text-xs font-mono text-red-300 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-gray-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-300">
                    Stack trace
                  </summary>
                  <pre className="text-xs text-gray-400 mt-2 overflow-auto max-h-40">
                    {error.stack}
                  </pre>
                </details>
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
              Recalculate Chart
            </button>

            {/* Back to Dashboard */}
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong>Need help?</strong> Make sure your birth profile includes:
            </p>
            <ul className="text-sm text-blue-300 mt-2 space-y-1 ml-4">
              <li>• Accurate birth date</li>
              <li>• Birth time (if known)</li>
              <li>• Birth location (city, country)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
