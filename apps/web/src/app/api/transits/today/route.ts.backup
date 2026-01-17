import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculatePlanetaryPositions, calculateNatalChart } from '@/lib/astro-core';
import { BirthProfile } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

interface TransitAspect {
  transitPlanet: string;
  natalPlanet: string;
  aspectType: string;
  angle: number;
  orb: number;
  isApplying: boolean;
  influence: 'positive' | 'neutral' | 'challenging';
}

function calculateAspects(
  transitPositions: Record<string, number>,
  natalPositions: Record<string, number>
): TransitAspect[] {
  const aspects: TransitAspect[] = [];

  const aspectTypes = [
    { name: 'conjunction', angle: 0, orb: 8, influence: 'neutral' as const },
    { name: 'sextile', angle: 60, orb: 6, influence: 'positive' as const },
    { name: 'square', angle: 90, orb: 8, influence: 'challenging' as const },
    { name: 'trine', angle: 120, orb: 8, influence: 'positive' as const },
    { name: 'opposition', angle: 180, orb: 8, influence: 'challenging' as const },
  ];

  Object.entries(transitPositions).forEach(([transitPlanet, transitLon]) => {
    Object.entries(natalPositions).forEach(([natalPlanet, natalLon]) => {
      aspectTypes.forEach((aspectType) => {
        const angle = Math.abs(transitLon - natalLon) % 360;
        const normalizedAngle = angle > 180 ? 360 - angle : angle;
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
        }
      });
    });
  });

  return aspects.sort((a, b) => a.orb - b.orb);
}

function getAspectInterpretation(aspect: TransitAspect): string {
  const interpretations: Record<string, Record<string, string>> = {
    sun: {
      conjunction: 'amplifies your core identity and vitality',
      sextile: 'brings opportunities for self-expression',
      square: 'challenges your ego and willpower',
      trine: 'flows easily with your life path',
      opposition: 'creates tension between inner and outer self',
    },
    moon: {
      conjunction: 'intensifies emotions and instincts',
      sextile: 'harmonizes emotional needs',
      square: 'creates emotional friction',
      trine: 'brings emotional ease and comfort',
      opposition: 'pulls emotions in opposite directions',
    },
    mercury: {
      conjunction: 'affects communication and thinking',
      sextile: 'enhances mental clarity',
      square: 'creates mental challenges',
      trine: 'facilitates smooth communication',
      opposition: 'creates communication conflicts',
    },
  };

  const planetInterpretation = interpretations[aspect.natalPlanet.toLowerCase()];
  if (planetInterpretation) {
    return `Transit ${aspect.transitPlanet} ${aspect.aspectType} your natal ${aspect.natalPlanet}: ${planetInterpretation[aspect.aspectType]}`;
  }

  return `Transit ${aspect.transitPlanet} ${aspect.aspectType} your natal ${aspect.natalPlanet}`;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's primary profile
    const { data: profile, error: profileError } = await supabase
      .from('birth_profiles')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_primary', true)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'No birth profile found. Please complete onboarding.' },
        { status: 404 }
      );
    }

    const birthProfile = profile as unknown as BirthProfile;

    // Calculate today's planetary positions
    const now = new Date();
    const todayPositions = calculatePlanetaryPositions(now);

    // Calculate natal chart to get natal positions
    const natalChart = calculateNatalChart({
      date: new Date(birthProfile.birth_date),
      time: birthProfile.birth_time || undefined,
      location: birthProfile.birth_location
        ? {
            latitude: birthProfile.birth_location.lat,
            longitude: birthProfile.birth_location.lon,
            timezone: birthProfile.birth_location.timezone || 'UTC',
          }
        : undefined,
    });

    // Extract longitudes
    const transitLongitudes: Record<string, number> = {};
    const natalLongitudes: Record<string, number> = {};

    Object.entries(todayPositions).forEach(([planet, pos]) => {
      transitLongitudes[planet] = pos.longitude;
    });

    Object.entries(natalChart.planets).forEach(([planet, pos]) => {
      natalLongitudes[planet] = pos.longitude;
    });

    // Calculate aspects between transits and natal positions
    const aspects = calculateAspects(transitLongitudes, natalLongitudes);

    // Get top 5 most significant aspects
    const significantAspects = aspects.slice(0, 5).map((aspect) => ({
      ...aspect,
      interpretation: getAspectInterpretation(aspect),
    }));

    // Calculate overall daily energy
    const positiveAspects = aspects.filter((a) => a.influence === 'positive').length;
    const challengingAspects = aspects.filter((a) => a.influence === 'challenging').length;
    const totalAspects = aspects.length;

    const dailyEnergy = totalAspects > 0
      ? ((positiveAspects - challengingAspects) / totalAspects) * 50 + 50
      : 50;

    const energyLevel =
      dailyEnergy >= 70
        ? 'high'
        : dailyEnergy >= 40
        ? 'moderate'
        : 'low';

    const recommendation =
      dailyEnergy >= 70
        ? 'Great day for taking action and pursuing goals!'
        : dailyEnergy >= 40
        ? 'Balanced energy today. Focus on steady progress.'
        : 'Take it easy today. Rest and reflect.';

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error('Error calculating today\'s transits:', error);
    return NextResponse.json(
      { error: 'Failed to calculate transits' },
      { status: 500 }
    );
  }
}
