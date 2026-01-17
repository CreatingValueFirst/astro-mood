'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Moon, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DayData {
  date: string;
  mood: number;
  energy: number;
  focus: number;
  romance: number;
  stress: number;
  social: number;
}

interface KeyDate {
  date: string;
  event: string;
  type: 'lunation' | 'transit' | 'retrograde';
  impact: 'high' | 'medium' | 'low';
  description: string;
}

interface CalendarViewProps {
  className?: string;
}

export function CalendarView({ className }: CalendarViewProps) {
  const prefersReducedMotion = useReducedMotion();
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<KeyDate[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Respect user's motion preferences
  const hoverAnimation = prefersReducedMotion ? {} : { scale: 1.05 };
  const tapAnimation = prefersReducedMotion ? {} : { scale: 0.95 };

  useEffect(() => {
    fetchForecast();
  }, [currentDate]);

  async function fetchForecast() {
    try {
      setLoading(true);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

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

  function changeMonth(delta: number) {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  }

  function handleDayClick(day: DayData) {
    setSelectedDay(day);

    // Find events for this day
    if (forecast?.keyDates) {
      const events = forecast.keyDates.filter((event: KeyDate) =>
        event.date === day.date
      );
      setSelectedDayEvents(events);
    }
  }

  function getMoodColor(mood: number): string {
    if (mood >= 75) return 'bg-green-500/80 hover:bg-green-500';
    if (mood >= 60) return 'bg-blue-500/80 hover:bg-blue-500';
    if (mood >= 45) return 'bg-yellow-500/80 hover:bg-yellow-500';
    if (mood >= 30) return 'bg-orange-500/80 hover:bg-orange-500';
    return 'bg-red-500/80 hover:bg-red-500';
  }

  function getMoodLabel(mood: number): string {
    if (mood >= 75) return 'Excellent';
    if (mood >= 60) return 'Good';
    if (mood >= 45) return 'Moderate';
    if (mood >= 30) return 'Challenging';
    return 'Difficult';
  }

  function getEventIcon(type: string) {
    if (type === 'lunation') return <Moon className="w-3 h-3" />;
    if (type === 'retrograde') return <Star className="w-3 h-3" />;
    return <Star className="w-3 h-3" />;
  }

  if (loading) {
    return (
      <Card className={`group bg-gray-900/50 border-purple-500/20 backdrop-blur-xl h-full ${className}`}>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-500/20">
                <CalendarIcon className="w-6 h-6 text-pink-400 animate-pulse" />
              </div>
              <CardTitle className="text-white text-lg sm:text-xl">
                Calendar View
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-8 bg-purple-900/30 rounded animate-pulse"></div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="h-12 bg-purple-900/30 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !forecast) {
    return (
      <Card className={`group bg-gray-900/50 border-purple-500/20 backdrop-blur-xl h-full ${className}`}>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <CalendarIcon className="w-6 h-6 text-red-400" />
            </div>
            <CardTitle className="text-white text-lg sm:text-xl">
              Calendar View
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-red-400 text-sm sm:text-base">
          Unable to load calendar. Please try again later.
        </CardContent>
      </Card>
    );
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Create calendar grid
  const calendarDays: (DayData | null)[] = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayData = forecast.dailyScores?.find((d: DayData) => d.date === dateStr);

    if (dayData) {
      calendarDays.push(dayData);
    } else {
      // Fallback if data missing
      calendarDays.push({
        date: dateStr,
        mood: 60,
        energy: 60,
        focus: 60,
        romance: 60,
        stress: 40,
        social: 60,
      });
    }
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <Card className={`group bg-gray-900/50 border-purple-500/20 backdrop-blur-xl hover:bg-gray-900/70 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] h-full ${className}`}>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors">
                <CalendarIcon className="w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors" />
              </div>
              <div>
                <CardTitle className="text-white text-lg sm:text-xl group-hover:text-purple-200 transition-colors">
                  {monthName} {year}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  Click any day for details
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4 text-purple-400" />
              </button>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4 text-purple-400" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-400 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dayNumber = new Date(day.date).getDate();
              const hasEvent = forecast.keyDates?.some((event: KeyDate) =>
                event.date === day.date
              );

              return (
                <motion.button
                  key={day.date}
                  onClick={() => handleDayClick(day)}
                  className={`
                    relative aspect-square rounded-lg
                    ${getMoodColor(day.mood)}
                    transition-all duration-200
                    flex flex-col items-center justify-center
                    cursor-pointer
                    group/day
                  `}
                  whileHover={hoverAnimation}
                  whileTap={tapAnimation}
                >
                  <span className="text-sm font-semibold text-white">
                    {dayNumber}
                  </span>
                  <span className="text-[10px] text-white/80 mt-0.5">
                    {day.mood}
                  </span>
                  {hasEvent && (
                    <div className="absolute top-0.5 right-0.5">
                      <Star className="w-2.5 h-2.5 text-yellow-300 fill-yellow-300" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-purple-500/20">
            <p className="text-xs text-gray-400 mb-2">Mood Levels:</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-green-500/80"></div>
                <span className="text-gray-400">Excellent (75+)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-blue-500/80"></div>
                <span className="text-gray-400">Good (60-74)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-yellow-500/80"></div>
                <span className="text-gray-400">Moderate (45-59)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-orange-500/80"></div>
                <span className="text-gray-400">Challenging (30-44)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Details Modal */}
      <Dialog open={selectedDay !== null} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="bg-gray-900 border-purple-500/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {selectedDay && new Date(selectedDay.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </DialogTitle>
          </DialogHeader>

          {selectedDay && (
            <div className="space-y-4">
              {/* Overall Mood */}
              <div className="p-4 rounded-lg bg-purple-900/30 border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Overall Mood</span>
                  <span className="text-2xl font-bold text-white">{selectedDay.mood}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className={getMoodColor(selectedDay.mood).replace('hover:', '')}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedDay.mood}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {getMoodLabel(selectedDay.mood)} day
                </p>
              </div>

              {/* Mood Breakdown */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Mood Breakdown</h4>
                <MoodStat label="Energy" value={selectedDay.energy} color="orange" />
                <MoodStat label="Focus" value={selectedDay.focus} color="blue" />
                <MoodStat label="Romance" value={selectedDay.romance} color="pink" />
                <MoodStat label="Social" value={selectedDay.social} color="green" />
                <MoodStat label="Stress" value={selectedDay.stress} color="red" />
              </div>

              {/* Events */}
              {selectedDayEvents.length > 0 && (
                <div className="p-4 rounded-lg bg-indigo-900/30 border border-indigo-500/30">
                  <h4 className="text-sm font-semibold text-indigo-300 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Special Events
                  </h4>
                  <div className="space-y-2">
                    {selectedDayEvents.map((event, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          {getEventIcon(event.type)}
                          <span className="font-medium text-white">{event.event}</span>
                          <span className={`
                            text-xs px-2 py-0.5 rounded
                            ${event.impact === 'high' ? 'bg-red-500/20 text-red-300' : ''}
                            ${event.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : ''}
                            ${event.impact === 'low' ? 'bg-blue-500/20 text-blue-300' : ''}
                          `}>
                            {event.impact}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function MoodStat({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-gray-400 min-w-[60px]">{label}</span>
      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={colorClasses[color as keyof typeof colorClasses]}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-sm text-white font-medium min-w-[30px] text-right">{value}</span>
    </div>
  );
}
