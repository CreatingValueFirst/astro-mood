'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Reusable Error Fallback Component
 *
 * Can be used with error boundaries for granular error handling
 * Vercel best practice: Proper error recovery UI
 */

interface ErrorFallbackProps {
  error?: Error;
  reset?: () => void;
  title?: string;
  description?: string;
  showDetails?: boolean;
  variant?: 'card' | 'inline' | 'fullscreen';
}

export function ErrorFallback({
  error,
  reset,
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  showDetails = process.env.NODE_ENV === 'development',
  variant = 'card',
}: ErrorFallbackProps) {
  if (variant === 'inline') {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-red-300 mb-1">{title}</h3>
            <p className="text-sm text-red-200/80">{description}</p>
            {showDetails && error && (
              <p className="text-xs font-mono text-red-300/70 mt-2 break-all">
                {error.message}
              </p>
            )}
          </div>
          {reset && (
            <button
              onClick={reset}
              className="flex-shrink-0 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
              title="Try again"
            >
              <RefreshCw className="h-4 w-4 text-red-300" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-red-500/20 p-4">
                <AlertCircle className="h-12 w-12 text-red-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-white mb-4">{title}</h1>
            <p className="text-gray-300 text-center mb-6">{description}</p>
            {showDetails && error && (
              <div className="mb-6 p-4 bg-black/30 rounded-lg border border-red-500/30">
                <p className="text-xs font-mono text-red-300 break-all">{error.message}</p>
              </div>
            )}
            {reset && (
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
              >
                <RefreshCw className="h-5 w-5" />
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default: card variant
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-red-500/30 p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-red-500/20 p-3 flex-shrink-0">
          <AlertCircle className="h-6 w-6 text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          {showDetails && error && (
            <div className="mb-4 p-3 bg-black/30 rounded-lg border border-red-500/30">
              <p className="text-xs font-mono text-red-300 break-all">{error.message}</p>
            </div>
          )}
          {reset && (
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Simple Error Message
 *
 * For displaying error messages without reset functionality
 */
export function ErrorMessage({
  message,
  className = '',
}: {
  message: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 text-red-300 ${className}`}>
      <AlertCircle className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
