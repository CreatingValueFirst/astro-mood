'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

/**
 * Root Error Boundary
 *
 * Catches all errors in the application and provides fallback UI
 * Following Next.js 16 App Router conventions
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);

    // You can send to error tracking service like Sentry here
    // if (typeof window !== 'undefined') {
    //   Sentry.captureException(error);
    // }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-500/20 p-4">
              <AlertCircle className="h-12 w-12 text-red-400" />
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Oops! Something went wrong
          </h1>

          {/* Error Description */}
          <p className="text-gray-300 text-center mb-6">
            The cosmic energies seem misaligned. We encountered an unexpected error.
          </p>

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
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Try Again Button */}
            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </button>

            {/* Go Home Button */}
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-white/20"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-center text-gray-400 text-sm mt-6">
            If the problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
}
