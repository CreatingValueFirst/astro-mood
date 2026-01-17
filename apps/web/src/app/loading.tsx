/**
 * Root Loading State
 *
 * Displays while the application is loading
 * Following Next.js 16 App Router conventions
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>

          {/* Spinning Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>

          {/* Inner Glow */}
          <div className="absolute inset-4 bg-purple-500/20 rounded-full blur-xl"></div>

          {/* Center Icon */}
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

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-white mb-2">
          Loading AstroMood
        </h2>

        {/* Subtext */}
        <p className="text-purple-300">
          Aligning the cosmic energies...
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
