/**
 * Dashboard Loading Skeleton
 *
 * Provides visual feedback while dashboard data is loading
 * Matches the actual dashboard layout for better UX
 */
export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-white/10 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/5 rounded-lg w-96 animate-pulse"></div>
        </div>

        {/* Today's Transits Card Skeleton (Full Width) */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-purple-500/30 rounded"></div>
              <div className="h-7 bg-white/20 rounded-lg w-48"></div>
            </div>
            <div className="h-4 bg-white/10 rounded-lg w-full mb-6"></div>

            {/* Energy Score Skeleton */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 bg-purple-500/20 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded-lg w-32"></div>
                <div className="h-3 bg-white/5 rounded-lg w-full"></div>
              </div>
            </div>

            {/* Aspects Skeleton */}
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="h-8 w-8 bg-purple-500/20 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/10 rounded w-3/4"></div>
                    <div className="h-2 bg-white/5 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Layout Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Monthly Forecast Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-purple-500/30 rounded"></div>
              <div className="h-6 bg-white/20 rounded-lg w-40"></div>
            </div>
            <div className="h-4 bg-white/10 rounded-lg w-full mb-4"></div>
            <div className="space-y-3">
              <div className="h-32 bg-white/5 rounded-lg"></div>
              <div className="h-4 bg-white/10 rounded-lg w-3/4"></div>
              <div className="h-3 bg-white/5 rounded-lg w-full"></div>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-indigo-500/30 rounded"></div>
              <div className="h-6 bg-white/20 rounded-lg w-32"></div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-8 bg-white/5 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(35)].map((_, i) => (
                <div key={i} className="h-10 bg-white/5 rounded"></div>
              ))}
            </div>
          </div>

          {/* Natal Chart Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-blue-500/30 rounded"></div>
              <div className="h-6 bg-white/20 rounded-lg w-36"></div>
            </div>
            <div className="aspect-square bg-white/5 rounded-full mb-4"></div>
            <div className="h-4 bg-white/10 rounded-lg w-full mb-2"></div>
            <div className="h-3 bg-white/5 rounded-lg w-3/4"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-purple-300">
            <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Loading your cosmic insights...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
