/**
 * Monthly Forecast Generation
 * Generates personalized monthly astrological forecasts with mood predictions
 */

import type { ZodiacSign } from '@astro-mood/astro-core';
import {
  calculatePlanetaryPositions,
  findSignChanges,
  findRetrogradeStations,
  calculateLunations,
  calculateDailyMood,
  calculateTransitImpact,
  getNewMoonImpact,
  getFullMoonImpact,
  getMercuryRetrogradeImpact,
  getAdviceForMood,
  explainMoodImpact,
} from '@astro-mood/astro-core';

export interface MonthlyForecast {
  summary: string;
  overallMood: number;
  moodScores: {
    energy: number;
    focus: number;
    romance: number;
    stress: number;
    social: number;
  };
  dailyScores: Array<{
    date: string;
    mood: number;
    energy: number;
    focus: number;
    romance: number;
    stress: number;
    social: number;
  }>;
  keyDates: Array<{
    date: string;
    event: string;
    type: 'lunation' | 'transit' | 'retrograde';
    impact: 'high' | 'medium' | 'low';
    description: string;
  }>;
  transits: Array<{
    planet: string;
    event: string;
    date: string;
    description: string;
    moodImpact: {
      energy: number;
      focus: number;
      romance: number;
      stress: number;
      social: number;
    };
  }>;
  weeklyBreakdowns: Array<{
    week: number;
    dates: string;
    theme: string;
    advice: string;
    averageMood: number;
  }>;
  doList: string[];
  dontList: string[];
  affirmations: string[];
}

/**
 * Generate a comprehensive monthly forecast for a user
 */
export async function generateMonthlyForecast(
  year: number,
  month: number,
  sunSign: ZodiacSign
): Promise<MonthlyForecast> {
  console.log(`🔮 Generating forecast for ${sunSign} - ${year}/${month}`);

  // Calculate all astrological events for the month
  const signChanges = findSignChanges(year, month);
  const retrogradeStations = findRetrogradeStations(year, month);
  const lunations = calculateLunations(year, month);

  // Generate daily mood scores
  const dailyScores = generateDailyScores(year, month, sunSign);

  // Calculate overall monthly averages
  const averages = calculateMonthlyAverages(dailyScores);

  // Identify key dates (most significant astrological events)
  const keyDates = identifyKeyDates(lunations, signChanges, retrogradeStations, sunSign);

  // Generate transit interpretations
  const transits = generateTransitInterpretations(signChanges, retrogradeStations, sunSign);

  // Generate weekly breakdowns
  const weeklyBreakdowns = generateWeeklyBreakdowns(dailyScores, year, month);

  // Generate advice based on overall mood
  const advice = getAdviceForMood({
    overall: averages.overall,
    energy: averages.energy,
    focus: averages.focus,
    romance: averages.romance,
    stress: averages.stress,
    social: averages.social,
  });

  // Generate summary
  const summary = generateSummary(averages, keyDates, sunSign);

  return {
    summary,
    overallMood: averages.overall,
    moodScores: {
      energy: averages.energy,
      focus: averages.focus,
      romance: averages.romance,
      stress: averages.stress,
      social: averages.social,
    },
    dailyScores,
    keyDates,
    transits,
    weeklyBreakdowns,
    doList: advice.doList,
    dontList: advice.dontList,
    affirmations: advice.affirmations,
  };
}

/**
 * Generate daily mood scores for entire month
 */
function generateDailyScores(year: number, month: number, sunSign: ZodiacSign) {
  const dailyScores: Array<{
    date: string;
    mood: number;
    energy: number;
    focus: number;
    romance: number;
    stress: number;
    social: number;
  }> = [];

  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dateStr = date.toISOString().split('T')[0];

    // Calculate planetary positions for this day
    const positions = calculatePlanetaryPositions(date);

    // Build transits array
    const transits = Object.entries(positions).map(([planetName, position]) => ({
      planet: planetName as any,
      sign: position.sign,
    }));

    // Calculate mood for this day
    const mood = calculateDailyMood(date, sunSign, transits);

    dailyScores.push({
      date: dateStr,
      mood: mood.overall,
      energy: mood.energy,
      focus: mood.focus,
      romance: mood.romance,
      stress: mood.stress,
      social: mood.social,
    });
  }

  return dailyScores;
}

/**
 * Calculate monthly averages
 */
function calculateMonthlyAverages(dailyScores: any[]) {
  const totals = dailyScores.reduce(
    (acc, day) => ({
      overall: acc.overall + day.mood,
      energy: acc.energy + day.energy,
      focus: acc.focus + day.focus,
      romance: acc.romance + day.romance,
      stress: acc.stress + day.stress,
      social: acc.social + day.social,
    }),
    { overall: 0, energy: 0, focus: 0, romance: 0, stress: 0, social: 0 }
  );

  const count = dailyScores.length;

  return {
    overall: Math.round(totals.overall / count),
    energy: Math.round(totals.energy / count),
    focus: Math.round(totals.focus / count),
    romance: Math.round(totals.romance / count),
    stress: Math.round(totals.stress / count),
    social: Math.round(totals.social / count),
  };
}

/**
 * Identify key dates (most significant events)
 */
function identifyKeyDates(
  lunations: any[],
  signChanges: any[],
  retrogradeStations: any[],
  sunSign: ZodiacSign
): Array<{
  date: string;
  event: string;
  type: 'lunation' | 'transit' | 'retrograde';
  impact: 'high' | 'medium' | 'low';
  description: string;
}> {
  const keyDates: Array<{
    date: string;
    event: string;
    type: 'lunation' | 'transit' | 'retrograde';
    impact: 'high' | 'medium' | 'low';
    description: string;
  }> = [];

  // Add lunations (New & Full Moons)
  for (const lunation of lunations) {
    const isNewMoon = lunation.type === 'new_moon';
    const impact = lunation.sign === sunSign ? 'high' : 'medium';

    keyDates.push({
      date: lunation.date.toISOString().split('T')[0],
      event: `${isNewMoon ? 'New' : 'Full'} Moon in ${lunation.sign}`,
      type: 'lunation',
      impact,
      description: isNewMoon
        ? `Perfect time for new beginnings and setting intentions${lunation.sign === sunSign ? ' - especially powerful for you!' : ''}`
        : `Emotions peak, bringing clarity and completion${lunation.sign === sunSign ? ' - a significant moment for your sign!' : ''}`,
    });
  }

  // Add major sign changes (Sun, Mars, Venus)
  const majorPlanets = ['Sun', 'Mars', 'Venus'];
  for (const change of signChanges) {
    if (majorPlanets.includes(change.planet)) {
      const impact =
        change.planet === 'Sun' && change.toSign === sunSign
          ? 'high'
          : change.planet === 'Sun'
          ? 'medium'
          : 'low';

      keyDates.push({
        date: change.date.toISOString().split('T')[0],
        event: `${change.planet} enters ${change.toSign}`,
        type: 'transit',
        impact,
        description:
          change.planet === 'Sun' && change.toSign === sunSign
            ? 'Happy birthday season! A powerful month for personal growth and new beginnings.'
            : `${change.planet} brings ${getPlanetTheme(change.planet)} energy to ${change.toSign}`,
      });
    }
  }

  // Add retrograde stations
  for (const station of retrogradeStations) {
    const isStart = station.type === 'start';
    const impact = station.planet === 'Mercury' ? 'high' : 'medium';

    keyDates.push({
      date: station.date.toISOString().split('T')[0],
      event: `${station.planet} ${isStart ? 'goes' : 'turns'} ${isStart ? 'retrograde' : 'direct'}`,
      type: 'retrograde',
      impact,
      description: isStart
        ? `${station.planet} retrograde begins - time to ${getRetrogradeTheme(station.planet)}`
        : `${station.planet} direct motion resumes - forward progress returns`,
    });
  }

  // Sort by date
  keyDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return keyDates;
}

/**
 * Generate transit interpretations
 */
function generateTransitInterpretations(
  signChanges: any[],
  retrogradeStations: any[],
  sunSign: ZodiacSign
): Array<{
  planet: string;
  event: string;
  date: string;
  description: string;
  moodImpact: any;
}> {
  const transits: Array<{
    planet: string;
    event: string;
    date: string;
    description: string;
    moodImpact: any;
  }> = [];

  // Add sign changes
  for (const change of signChanges) {
    const impact = calculateTransitImpact(change.planet as any, change.toSign, sunSign);

    transits.push({
      planet: change.planet,
      event: `Enters ${change.toSign}`,
      date: change.date.toISOString().split('T')[0],
      description: explainMoodImpact(change.planet as any, change.toSign, impact, sunSign),
      moodImpact: impact,
    });
  }

  // Add retrogrades
  for (const station of retrogradeStations) {
    const isStart = station.type === 'start';
    const impact = station.planet === 'Mercury' ? getMercuryRetrogradeImpact() : { energy: 0, focus: 0, romance: 0, stress: 0, social: 0 };

    transits.push({
      planet: station.planet,
      event: isStart ? 'Goes Retrograde' : 'Turns Direct',
      date: station.date.toISOString().split('T')[0],
      description: isStart
        ? `Time to review, revise, and reconsider matters related to ${getRetrogradeTheme(station.planet)}`
        : `Forward momentum returns in areas of ${getRetrogradeTheme(station.planet)}`,
      moodImpact: impact,
    });
  }

  return transits;
}

/**
 * Generate weekly breakdowns
 */
function generateWeeklyBreakdowns(
  dailyScores: any[],
  year: number,
  month: number
): Array<{
  week: number;
  dates: string;
  theme: string;
  advice: string;
  averageMood: number;
}> {
  const weeks: Array<{
    week: number;
    dates: string;
    theme: string;
    advice: string;
    averageMood: number;
  }> = [];

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  let currentWeek = 1;
  let weekStart = 1;
  let weekScores: any[] = [];

  for (let day = 1; day <= dailyScores.length; day++) {
    const dayScore = dailyScores[day - 1];
    weekScores.push(dayScore);

    const date = new Date(year, month - 1, day);
    const isEndOfWeek = date.getDay() === 0 || day === dailyScores.length;

    if (isEndOfWeek) {
      const avgMood = Math.round(
        weekScores.reduce((sum, s) => sum + s.mood, 0) / weekScores.length
      );

      const monthName = date.toLocaleString('default', { month: 'short' });
      const weekEnd = day;

      weeks.push({
        week: currentWeek,
        dates: `${monthName} ${weekStart}-${weekEnd}`,
        theme: getWeekTheme(avgMood),
        advice: getWeekAdvice(avgMood, weekScores),
        averageMood: avgMood,
      });

      currentWeek++;
      weekStart = day + 1;
      weekScores = [];
    }
  }

  return weeks;
}

/**
 * Generate overall summary
 */
function generateSummary(
  averages: any,
  keyDates: any[],
  sunSign: ZodiacSign
): string {
  const moodLevel =
    averages.overall >= 75
      ? 'excellent'
      : averages.overall >= 60
      ? 'positive'
      : averages.overall >= 45
      ? 'moderate'
      : 'challenging';

  const majorEvents = keyDates.filter((d) => d.impact === 'high');

  let summary = `This month brings ${moodLevel} energy for ${sunSign}. `;

  if (majorEvents.length > 0) {
    const firstEvent = majorEvents[0];
    summary += `Key focus: ${firstEvent.event} on ${new Date(firstEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.`;
  }

  if (averages.energy >= 70) {
    summary += ' You will have plenty of energy to accomplish your goals.';
  } else if (averages.energy <= 45) {
    summary += ' Focus on rest and self-care this month.';
  }

  if (averages.stress >= 65) {
    summary += ' Practice stress management techniques.';
  } else if (averages.stress <= 40) {
    summary += ' Enjoy a relatively calm and peaceful period.';
  }

  return summary;
}

// Helper functions
function getPlanetTheme(planet: string): string {
  const themes: Record<string, string> = {
    Sun: 'vital, identity-focused',
    Moon: 'emotional, nurturing',
    Mercury: 'communicative, mental',
    Venus: 'loving, harmonious',
    Mars: 'active, assertive',
    Jupiter: 'expansive, optimistic',
    Saturn: 'disciplined, structured',
  };
  return themes[planet] || 'transformative';
}

function getRetrogradeTheme(planet: string): string {
  const themes: Record<string, string> = {
    Mercury: 'communication, technology, and travel',
    Venus: 'relationships and values',
    Mars: 'action and energy',
    Jupiter: 'growth and expansion',
    Saturn: 'structure and responsibility',
  };
  return themes[planet] || 'personal transformation';
}

function getWeekTheme(avgMood: number): string {
  if (avgMood >= 75) return 'Peak Performance';
  if (avgMood >= 60) return 'Positive Flow';
  if (avgMood >= 45) return 'Steady Progress';
  return 'Self-Care Focus';
}

function getWeekAdvice(avgMood: number, weekScores: any[]): string {
  const avgEnergy = Math.round(
    weekScores.reduce((sum, s) => sum + s.energy, 0) / weekScores.length
  );
  const avgStress = Math.round(
    weekScores.reduce((sum, s) => sum + s.stress, 0) / weekScores.length
  );

  if (avgMood >= 75) {
    return 'Great week to tackle challenging projects and make significant progress.';
  } else if (avgMood >= 60) {
    return 'Balance productivity with enjoyment. Stay focused on your priorities.';
  } else if (avgMood >= 45) {
    return 'Pace yourself and do not push too hard. Steady wins the race.';
  } else {
    return 'Prioritize self-care and rest. Be gentle with yourself.';
  }
}
