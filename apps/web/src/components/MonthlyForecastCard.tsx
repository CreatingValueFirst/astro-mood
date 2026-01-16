'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MonthlyForecastCardProps {
  className?: string;
}

export function MonthlyForecastCard({ className }: MonthlyForecastCardProps) {
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchForecast();
  }, []);

  async function fetchForecast() {
    try {
      setLoading(true);
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const response = await fetch(`/api/forecast?year=${year}&month=${month}`);

      if (!response.ok) {
        throw new Error('Failed to fetch forecast');
      }

      const data = await response.json();
      setForecast(data.forecast);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching forecast:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Card className={`group bg-gray-900/50 border-purple-500/20 backdrop-blur-xl h-full ${className}`}>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <TrendingUp className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <CardTitle className="text-white text-lg sm:text-xl">
              Monthly Forecast
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-gray-400 text-sm sm:text-base">
          <div className="space-y-3">
            <div className="h-4 bg-purple-900/30 rounded animate-pulse"></div>
            <div className="h-4 bg-purple-900/30 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-purple-900/30 rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`group bg-gray-900/50 border-purple-500/20 backdrop-blur-xl h-full ${className}`}>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <TrendingUp className="w-6 h-6 text-red-400" />
            </div>
            <CardTitle className="text-white text-lg sm:text-xl">
              Monthly Forecast
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-red-400 text-sm sm:text-base">
          Unable to load forecast. Please try again later.
        </CardContent>
      </Card>
    );
  }

  if (!forecast) {
    return null;
  }

  const monthName = new Date().toLocaleString('default', { month: 'long' });

  return (
    <Card className={`group bg-gray-900/50 border-purple-500/20 backdrop-blur-xl hover:bg-gray-900/70 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] h-full ${className}`}>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
            <TrendingUp className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-white text-lg sm:text-xl group-hover:text-purple-200 transition-colors">
              {monthName} Forecast
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1">
              Overall Mood: {forecast.overallMood}/100
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="text-gray-300 text-sm leading-relaxed">
          {forecast.summary}
        </div>

        {/* Mood Scores */}
        <div className="grid grid-cols-2 gap-2">
          <MoodBar label="Energy" value={forecast.moodScores.energy} color="orange" />
          <MoodBar label="Focus" value={forecast.moodScores.focus} color="blue" />
          <MoodBar label="Romance" value={forecast.moodScores.romance} color="pink" />
          <MoodBar label="Social" value={forecast.moodScores.social} color="green" />
        </div>

        {/* Key Dates */}
        {forecast.keyDates && forecast.keyDates.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Key Dates</span>
            </div>
            <div className="space-y-2">
              {forecast.keyDates.slice(0, 3).map((date: any, index: number) => (
                <div key={index} className="text-xs text-gray-400">
                  <span className="text-purple-300">
                    {new Date(date.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  {' - '}
                  {date.event}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Affirmation */}
        {forecast.affirmations && forecast.affirmations.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-indigo-900/20 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-300">Daily Affirmation</span>
            </div>
            <p className="text-sm text-gray-300 italic">
              "{forecast.affirmations[0]}"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MoodBar({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    pink: 'bg-pink-500',
    green: 'bg-green-500',
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs text-gray-300 font-medium">{value}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colorClasses[color as keyof typeof colorClasses]}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
