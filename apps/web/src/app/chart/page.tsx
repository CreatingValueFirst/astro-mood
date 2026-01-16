'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarryBackground } from '@/components/StarryBackground';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { NatalChartWheel } from '@/components/NatalChartWheel';
import { ChartLegend } from '@/components/ChartLegend';
import { AspectTable } from '@/components/AspectTable';
import { NatalChart, BirthProfile } from '@/lib/supabase/types';

const PLANET_SYMBOLS = {
  sun: '☉',
  moon: '☽',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

export default function ChartPage() {
  const [chart, setChart] = useState<NatalChart | null>(null);
  const [profile, setProfile] = useState<Partial<BirthProfile> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/chart');
      if (!response.ok) {
        throw new Error('Failed to fetch natal chart');
      }
      const data = await response.json();
      setChart(data.chart);
      setProfile(data.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load chart');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white flex items-center justify-center">
        <StarryBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-400">Calculating your natal chart...</p>
        </div>
      </div>
    );
  }

  if (error || !chart || !profile) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white p-8">
        <StarryBackground />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Card className="bg-red-900/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400">Error Loading Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                {error || 'No chart data available'}
              </p>
              <Link href="/dashboard">
                <Button variant="outline" className="border-purple-400 text-purple-300">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white p-4 sm:p-6 md:p-8">
      <StarryBackground />

      <motion.div
        className="max-w-7xl mx-auto space-y-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {profile.name}'s Natal Chart
            </h1>
            <p className="text-gray-400 mt-2">
              Born {new Date(profile.birth_date!).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {profile.birth_time && ` at ${profile.birth_time}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-300 hover:bg-purple-900/50"
              disabled
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-300 hover:bg-purple-900/50"
              disabled
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Big Three */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-gray-900/30">
                <p className="text-sm text-gray-400 mb-1">Sun Sign</p>
                <p className="text-3xl font-bold text-yellow-400">
                  ☉ {chart.sunSign}
                </p>
                <p className="text-xs text-gray-500 mt-1">Your core identity</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-900/30">
                <p className="text-sm text-gray-400 mb-1">Moon Sign</p>
                <p className="text-3xl font-bold text-gray-300">
                  ☽ {chart.moonSign || 'Unknown'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Your emotions</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-900/30">
                <p className="text-sm text-gray-400 mb-1">Rising Sign</p>
                <p className="text-3xl font-bold text-purple-400">
                  ↑ {chart.risingSign || 'Unknown'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {chart.risingSign ? 'Your outer persona' : 'Birth time needed'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Natal Chart Wheel */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Natal Chart Wheel</CardTitle>
                <CardDescription className="text-gray-400">
                  Your planetary positions at birth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square w-full">
                  <NatalChartWheel chart={chart} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Planetary Positions & Elements */}
          <div className="space-y-6">
            {/* Planetary Positions */}
            <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Planetary Positions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(chart.planets).map(([planet, position]) => (
                  <div
                    key={planet}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {PLANET_SYMBOLS[planet as keyof typeof PLANET_SYMBOLS]}
                      </span>
                      <span className="text-sm font-medium text-white capitalize">
                        {planet}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-purple-400">{position.sign}</p>
                      <p className="text-xs text-gray-500">
                        {Math.floor(position.degree)}°
                        {position.isRetrograde && (
                          <span className="ml-1 text-orange-400">℞</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Elemental Balance */}
            {chart.elements && (
              <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Elemental Balance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(chart.elements).map(([element, count]) => (
                    <div key={element}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white capitalize">
                          {element}
                        </span>
                        <span className="text-sm text-gray-400">{count}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            element === 'fire'
                              ? 'bg-red-500'
                              : element === 'earth'
                              ? 'bg-green-500'
                              : element === 'air'
                              ? 'bg-cyan-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${(count / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Modalities */}
            {chart.modalities && (
              <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Modalities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(chart.modalities).map(([modality, count]) => (
                    <div key={modality}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white capitalize">
                          {modality}
                        </span>
                        <span className="text-sm text-gray-400">{count}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${(count / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Aspect Table */}
        <AspectTable chart={chart} />

        {/* Chart Legend */}
        <ChartLegend />
      </motion.div>
    </div>
  );
}
