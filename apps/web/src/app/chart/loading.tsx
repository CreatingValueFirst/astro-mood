/**
 * Chart Loading Skeleton
 *
 * Provides visual feedback while natal chart is being calculated and rendered
 * Matches the actual chart page layout
 */
export default function ChartLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-white/10 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/5 rounded-lg w-96 animate-pulse"></div>
        </div>

        {/* Big Three Skeleton */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-purple-500/20 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-white/10 rounded w-20"></div>
                  <div className="h-5 bg-white/20 rounded w-32"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Wheel Skeleton (Takes 2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6 animate-pulse">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-6 bg-purple-500/30 rounded"></div>
                <div className="h-7 bg-white/20 rounded-lg w-48"></div>
              </div>

              {/* Circular Chart Skeleton */}
              <div className="aspect-square max-w-2xl mx-auto relative">
                {/* Outer Circle */}
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>

                {/* Middle Circle */}
                <div className="absolute inset-8 border-4 border-indigo-500/20 rounded-full"></div>

                {/* Inner Circle */}
                <div className="absolute inset-16 border-4 border-blue-500/20 rounded-full"></div>

                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 bg-purple-500/10 rounded-full animate-pulse"></div>
                </div>

                {/* Zodiac Signs Skeleton */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                  <div
                    key={angle}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle}deg) translateY(-45%) translateX(-50%)`,
                    }}
                  >
                    <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                  </div>
                ))}
              </div>

              {/* Loading Text */}
              <div className="text-center mt-6">
                <div className="inline-flex items-center gap-2 text-purple-300">
                  <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Calculating planetary positions...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Planet Positions Skeleton */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 animate-pulse">
              <div className="h-6 bg-white/20 rounded-lg w-48 mb-4"></div>
              <div className="space-y-3">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-purple-500/20 rounded-full"></div>
                      <div className="h-4 bg-white/10 rounded w-20"></div>
                    </div>
                    <div className="h-4 bg-white/5 rounded w-24"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Elemental Balance Skeleton */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 animate-pulse">
            <div className="h-6 bg-white/20 rounded-lg w-48 mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Fire', 'Earth', 'Air', 'Water'].map((element) => (
                <div key={element} className="text-center">
                  <div className="h-32 w-full bg-white/5 rounded-lg mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-16 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Aspect Table Skeleton */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 animate-pulse">
            <div className="h-6 bg-white/20 rounded-lg w-48 mb-6"></div>
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="h-4 bg-white/10 rounded"></div>
                  <div className="h-4 bg-white/10 rounded"></div>
                  <div className="h-4 bg-white/10 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Legend Skeleton */}
        <div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 animate-pulse">
            <div className="h-6 bg-white/20 rounded-lg w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-purple-500/20 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-white/10 rounded w-24"></div>
                      <div className="h-2 bg-white/5 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-indigo-500/20 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-white/10 rounded w-24"></div>
                      <div className="h-2 bg-white/5 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
