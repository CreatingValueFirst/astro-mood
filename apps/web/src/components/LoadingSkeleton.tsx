/**
 * Reusable Loading Skeleton Component
 *
 * Can be used with Suspense boundaries for granular loading states
 * Vercel best practice: rendering-activity
 */

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'chart' | 'text';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({
  variant = 'card',
  count = 1,
  className = '',
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count });

  switch (variant) {
    case 'card':
      return (
        <>
          {skeletons.map((_, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 animate-pulse ${className}`}
            >
              <div className="h-6 bg-white/20 rounded-lg w-48 mb-4"></div>
              <div className="h-4 bg-white/10 rounded-lg w-full mb-2"></div>
              <div className="h-4 bg-white/10 rounded-lg w-3/4 mb-4"></div>
              <div className="h-32 bg-white/5 rounded-lg"></div>
            </div>
          ))}
        </>
      );

    case 'list':
      return (
        <div className={`space-y-3 ${className}`}>
          {skeletons.map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg animate-pulse"
            >
              <div className="h-10 w-10 bg-purple-500/20 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/5 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      );

    case 'chart':
      return (
        <div className={`${className}`}>
          <div className="aspect-square max-w-md mx-auto relative animate-pulse">
            <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
            <div className="absolute inset-8 border-4 border-indigo-500/20 rounded-full"></div>
            <div className="absolute inset-16 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 bg-purple-500/10 rounded-full"></div>
            </div>
          </div>
        </div>
      );

    case 'text':
      return (
        <div className={`space-y-2 ${className}`}>
          {skeletons.map((_, index) => (
            <div
              key={index}
              className="h-4 bg-white/10 rounded animate-pulse"
              style={{ width: `${Math.random() * 30 + 70}%` }}
            ></div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

/**
 * Inline Loading Spinner
 *
 * For small, inline loading states
 */
export function LoadingSpinner({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-purple-400 border-t-transparent rounded-full animate-spin ${className}`}
    ></div>
  );
}

/**
 * Full Page Loading
 *
 * For page-level loading states with Suspense
 */
export function PageLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-purple-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
        </div>
        <p className="text-purple-300">{message}</p>
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
