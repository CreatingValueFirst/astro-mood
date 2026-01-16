'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles, TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface PlanetPosition {
  longitude: number;
  sign: string;
  degree: number;
  latitude?: number;
  isRetrograde?: boolean;
}

interface TransitAspect {
  transitPlanet: string;
  natalPlanet: string;
  aspectType: string;
  angle: number;
  orb: number;
  isApplying: boolean;
  influence: 'positive' | 'neutral' | 'challenging';
  interpretation: string;
}

interface TodayTransitsData {
  date: string;
  currentPositions: Record<string, PlanetPosition>;
  significantAspects: TransitAspect[];
  totalAspects: number;
  dailyEnergy: number;
  energyLevel: 'high' | 'moderate' | 'low';
  recommendation: string;
  profile: {
    name: string;
    sunSign: string;
    moonSign?: string | null;
    risingSign?: string | null;
  };
}

const planetSymbols: Record<string, string> = {
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

const aspectSymbols: Record<string, string> = {
  conjunction: '☌',
  sextile: '⚹',
  square: '□',
  trine: '△',
  opposition: '☍',
};

export function TodayTransits() {
  const [data, setData] = useState<TodayTransitsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/transits/today');
      if (!response.ok) {
        throw new Error('Failed to fetch transits');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransits();
  }, []);

  if (loading) {
    return (
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Today's Cosmic Energy
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Today's Cosmic Energy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error || 'No data available'}</p>
          <button
            onClick={fetchTransits}
            className="mt-4 flex items-center gap-2 text-sm text-purple-500 hover:text-purple-600"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  const energyColors = {
    high: 'from-green-500/10 to-emerald-500/10 border-green-500/30',
    moderate: 'from-blue-500/10 to-cyan-500/10 border-blue-500/30',
    low: 'from-orange-500/10 to-red-500/10 border-orange-500/30',
  };

  const energyIcons = {
    high: <TrendingUp className="h-5 w-5 text-green-500" />,
    moderate: <Minus className="h-5 w-5 text-blue-500" />,
    low: <TrendingDown className="h-5 w-5 text-orange-500" />,
  };

  return (
    <Card className={`border bg-gradient-to-br ${energyColors[data.energyLevel]}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Today's Cosmic Energy
            </CardTitle>
            <CardDescription className="mt-1">
              {new Date(data.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {energyIcons[data.energyLevel]}
            <span className="text-2xl font-bold">{data.dailyEnergy}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Daily Recommendation */}
        <div className="rounded-lg bg-background/50 p-4">
          <p className="text-sm font-medium text-foreground">{data.recommendation}</p>
        </div>

        {/* Current Planetary Positions */}
        <div>
          <h4 className="mb-3 text-sm font-semibold">Current Planetary Positions</h4>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
            {Object.entries(data.currentPositions).map(([planet, pos]) => (
              <div
                key={planet}
                className="flex items-center gap-2 rounded-md bg-background/50 p-2"
              >
                <span className="text-xl">{planetSymbols[planet] || planet}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium capitalize">{planet}</p>
                  <p className="text-xs text-muted-foreground">
                    {pos.sign} {Math.round(pos.degree)}°
                    {pos.isRetrograde && <span className="ml-1 text-orange-500">℞</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Significant Aspects */}
        <div>
          <h4 className="mb-3 text-sm font-semibold">
            Most Significant Transits ({data.totalAspects} active)
          </h4>
          <div className="space-y-2">
            {data.significantAspects.length > 0 ? (
              data.significantAspects.map((aspect, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-background/50 p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{planetSymbols[aspect.transitPlanet]}</span>
                    <span className="text-sm text-muted-foreground">
                      {aspectSymbols[aspect.aspectType]}
                    </span>
                    <span className="text-lg">{planetSymbols[aspect.natalPlanet]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          aspect.influence === 'positive'
                            ? 'default'
                            : aspect.influence === 'challenging'
                            ? 'destructive'
                            : 'secondary'
                        }
                        className="text-xs"
                      >
                        {aspect.influence}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {aspect.aspectType} • {aspect.orb.toFixed(1)}° orb
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{aspect.interpretation}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No major transits today</p>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <Separator />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            ☉ {data.profile.sunSign}
            {data.profile.moonSign && ` • ☽ ${data.profile.moonSign}`}
            {data.profile.risingSign && ` • ↑ ${data.profile.risingSign}`}
          </span>
          <button
            onClick={fetchTransits}
            className="flex items-center gap-1 text-purple-500 hover:text-purple-600"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
