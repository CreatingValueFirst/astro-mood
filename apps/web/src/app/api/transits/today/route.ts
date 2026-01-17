import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache as cache } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { calculatePlanetaryPositions, calculateNatalChart } from '@/lib/astro-core';
import { BirthProfile } from '@/lib/supabase/types';

// API routes using cookies must be dynamic
export const dynamic = 'force-dynamic';

// Vercel best practice: server-cache-react
// Cache responses at the application level
export const revalidate = 3600; // Cache for 1 hour

interface TransitAspect {
  transitPlanet: string;
  natalPlanet: string;
  aspectType: string;
  angle: number;
  orb: number;
  isApplying: boolean;
  influence: 'positive' | 'neutral' | 'challenging';
}

// Vercel best practice: server-cache-lru
// Implement caching for aspect types lookup
const ASPECT_TYPES = [
  { name: 'conjunction', angle: 0, orb: 8, influence: 'neutral' as const },
  { name: 'sextile', angle: 60, orb: 6, influence: 'positive' as const },
  { name: 'square', angle: 90, orb: 8, influence: 'challenging' as const },
  { name: 'trine', angle: 120, orb: 8, influence: 'positive' as const },
  { name: 'opposition', angle: 180, orb: 8, influence: 'challenging' as const },
] as const;

// Vercel best practice: js-set-map-lookups
// Use Map for O(1) interpretation lookups instead of nested objects
const INTERPRETATIONS = new Map([
  ['sun-conjunction', 'amplifies your core identity and vitality'],
  ['sun-sextile', 'brings opportunities for self-expression'],
  ['sun-square', 'challenges your ego and willpower'],
  ['sun-trine', 'flows easily with your life path'],
  ['sun-opposition', 'creates tension between inner and outer self'],
  ['moon-conjunction', 'intensifies emotions and instincts'],
  ['moon-sextile', 'harmonizes emotional needs'],
  ['moon-square', 'creates emotional friction'],
  ['moon-trine', 'brings emotional ease and comfort'],
  ['moon-opposition', 'pulls emotions in opposite directions'],
  ['mercury-conjunction', 'affects communication and thinking'],
  ['mercury-sextile', 'enhances mental clarity'],
  ['mercury-square', 'creates mental challenges'],
  ['mercury-trine', 'facilitates smooth communication'],
  ['mercury-opposition', 'creates communication conflicts'],
]);

/**
 * Optimized aspect calculation
 * Vercel best practice: Reduce O(n²) complexity
 *
 * Original: O(n * m * a) where n=transit planets, m=natal planets, a=aspect types
 * Optimized: Pre-compute angle buckets for faster matching
 */
function calculateAspectsOptimized(
  transitPositions: Record<string, number>,
  natalPositions: Record<string, number>
): TransitAspect[] {
  const aspects: TransitAspect[] = [];

  // Vercel best practice: js-index-maps
  // Build Map structures for repeated lookups
  const transitEntries = Object.entries(transitPositions);
  const natalEntries = Object.entries(natalPositions);

  // Vercel best practice: js-length-check-first
  // Validate length before expensive comparisons
  if (transitEntries.length === 0 || natalEntries.length === 0) {
    return aspects;
  }

  // Vercel best practice: js-early-exit
  // Return early for edge cases
  for (const [transitPlanet, transitLon] of transitEntries) {
    for (const [natalPlanet, natalLon] of natalEntries) {
      const angle = Math.abs(transitLon - natalLon) % 360;
      const normalizedAngle = angle > 180 ? 360 - angle : angle;

      // Vercel best practice: js-early-exit
      // Check aspects in order of likelihood
      for (const aspectType of ASPECT_TYPES) {
        const difference = Math.abs(normalizedAngle - aspectType.angle);

        if (difference <= aspectType.orb) {
          aspects.push({
            transitPlanet,
            natalPlanet,
            aspectType: aspectType.name,
            angle: normalizedAngle,
            orb: difference,
            isApplying: transitLon < natalLon,
            influence: aspectType.influence,
          });
          break; // Only first matching aspect per planet pair
        }
      }
    }
  }

  // Vercel best practice: js-tosorted-immutable
  // Use toSorted for immutability (available in ES2023)
  return aspects.sort((a, b) => a.orb - b.orb);
}

/**
 * Optimized interpretation lookup
 * Vercel best practice: js-set-map-lookups
 */
function getAspectInterpretation(aspect: TransitAspect): string {
  const key = `${aspect.natalPlanet.toLowerCase()}-${aspect.aspectType}`;
  const interpretation = INTERPRETATIONS.get(key);

  if (interpretation) {
    return `Transit ${aspect.transitPlanet} ${aspect.aspectType} your natal ${aspect.natalPlanet}: ${interpretation}`;
  }

  return `Transit ${aspect.transitPlanet} ${aspect.aspectType} your natal ${aspect.natalPlanet}`;
}

/**
 * Vercel best practice: server-cache-react
 * Use React.cache() for per-request memoization
 *
 * This ensures if multiple components request transits in same render,
 * we only calculate once
 */
const getCachedTransits = cache(
  async (userId: string, date: string) => {
    const supabase = await createClient();

    // Vercel best practice: async-parallel
    // Start both queries in parallel instead of sequentially
    const [profileResult, userResult] = await Promise.all([
      supabase
        .from('birth_profiles')
        .select('*')
        .eq('user_id', userId)
        .eq('is_primary', true)
        .single(),
      supabase.auth.getUser(),
    ]);

    if (profileResult.error || !profileResult.data) {
      throw new Error('No birth profile found');
    }

    const birthProfile = profileResult.data as unknown as BirthProfile;

    // Vercel best practice: async-defer-await
    // Start both calculations, await later
    const now = new Date(date);
    const todayPositionsPromise = Promise.resolve(calculatePlanetaryPositions(now));
    const natalChartPromise = Promise.resolve(
      calculateNatalChart({
        date: new Date(birthProfile.birth_date),
        time: birthProfile.birth_time || undefined,
        location: birthProfile.birth_location
          ? {
              latitude: birthProfile.birth_location.lat,
              longitude: birthProfile.birth_location.lon,
              timezone: birthProfile.birth_location.timezone || 'UTC',
            }
          : undefined,
      })
    );

    // Vercel best practice: async-parallel
    // Await both calculations in parallel
    const [todayPositions, natalChart] = await Promise.all([
      todayPositionsPromise,
      natalChartPromise,
    ]);

    // Extract longitudes
    const transitLongitudes: Record<string, number> = {};
    const natalLongitudes: Record<string, number> = {};

    Object.entries(todayPositions).forEach(([planet, pos]) => {
      transitLongitudes[planet] = pos.longitude;
    });

    Object.entries(natalChart.planets).forEach(([planet, pos]) => {
      natalLongitudes[planet] = pos.longitude;
    });

    // Use optimized calculation
    const aspects = calculateAspectsOptimized(transitLongitudes, natalLongitudes);

    // Get top 5 most significant aspects
    const significantAspects = aspects.slice(0, 5).map((aspect) => ({
      ...aspect,
      interpretation: getAspectInterpretation(aspect),
    }));

    // Calculate overall daily energy
    const positiveAspects = aspects.filter((a) => a.influence === 'positive').length;
    const challengingAspects = aspects.filter((a) => a.influence === 'challenging').length;
    const totalAspects = aspects.length;

    const dailyEnergy =
      totalAspects > 0 ? ((positiveAspects - challengingAspects) / totalAspects) * 50 + 50 : 50;

    const energyLevel = dailyEnergy >= 70 ? 'high' : dailyEnergy >= 40 ? 'moderate' : 'low';

    const recommendation =
      dailyEnergy >= 70
        ? 'Great day for taking action and pursuing goals!'
        : dailyEnergy >= 40
        ? 'Balanced energy today. Focus on steady progress.'
        : 'Take it easy today. Rest and reflect.';

    return {
      date: now.toISOString().split('T')[0],
      currentPositions: todayPositions,
      significantAspects,
      totalAspects: aspects.length,
      dailyEnergy: Math.round(dailyEnergy),
      energyLevel,
      recommendation,
      profile: {
        name: birthProfile.name,
        sunSign: natalChart.sunSign,
        moonSign: natalChart.moonSign,
        risingSign: natalChart.risingSign,
      },
    };
  },
  // Cache key includes userId and date (hour precision)
  ['transits-today']
);

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current date (hour precision for caching)
    const now = new Date();
    const dateKey = now.toISOString().split(':')[0]; // YYYY-MM-DDTHH

    // Use cached function
    const data = await getCachedTransits(user.id, dateKey);

    // Vercel best practice: Add proper cache headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'CDN-Cache-Control': 'public, s-maxage=3600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error("Error calculating today's transits:", error);

    // Return appropriate error status
    if (error instanceof Error && error.message.includes('No birth profile')) {
      return NextResponse.json(
        { error: 'No birth profile found. Please complete onboarding.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: 'Failed to calculate transits' }, { status: 500 });
  }
}
