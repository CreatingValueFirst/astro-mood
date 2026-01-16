/**
 * API Route: Get Monthly Forecast
 * Fetches or generates monthly forecast for authenticated user
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateMonthlyForecast } from '@/lib/forecast/generateMonthlyForecast';
import type { ZodiacSign } from '@astro-mood/astro-core';

export async function GET(request: NextRequest) {
  try {
    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || String(new Date().getFullYear()));
    const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1));

    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's primary birth profile
    const { data: profile, error: profileError } = await supabase
      .from('birth_profiles')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_primary', true)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'No birth profile found. Please complete onboarding first.' },
        { status: 404 }
      );
    }

    // Check if forecast already exists in cache
    const { data: cachedForecast } = await supabase
      .from('monthly_forecasts')
      .select('forecast_data, computed_at')
      .eq('profile_id', profile.id)
      .eq('year', year)
      .eq('month', month)
      .single();

    // If cached and recent (less than 24 hours old), return it
    if (cachedForecast) {
      const computedAt = new Date(cachedForecast.computed_at);
      const hoursSinceComputed = (Date.now() - computedAt.getTime()) / (1000 * 60 * 60);

      if (hoursSinceComputed < 24) {
        console.log('✅ Returning cached forecast');
        return NextResponse.json({
          forecast: cachedForecast.forecast_data,
          cached: true,
          computedAt: cachedForecast.computed_at,
        });
      }
    }

    // Get sun sign from natal chart or calculate it
    let sunSign: ZodiacSign;

    // Try to get from natal chart first
    const { data: natalChart } = await supabase
      .from('natal_charts')
      .select('chart_data')
      .eq('profile_id', profile.id)
      .single();

    if (natalChart && natalChart.chart_data?.sunSign) {
      sunSign = natalChart.chart_data.sunSign;
    } else {
      // Calculate sun sign from birth date
      sunSign = calculateSunSignFromDate(new Date(profile.birth_date));
    }

    console.log(`🔮 Generating new forecast for ${sunSign} - ${year}/${month}`);

    // Generate forecast
    const forecast = await generateMonthlyForecast(year, month, sunSign);

    // Cache the forecast
    const { error: upsertError } = await supabase
      .from('monthly_forecasts')
      .upsert({
        profile_id: profile.id,
        year,
        month,
        forecast_data: forecast,
        computed_at: new Date().toISOString(),
      }, {
        onConflict: 'profile_id,year,month'
      });

    if (upsertError) {
      console.error('Error caching forecast:', upsertError);
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      forecast,
      cached: false,
      computedAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Error generating forecast:', error);
    return NextResponse.json(
      { error: 'Failed to generate forecast', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Calculate sun sign from birth date
 */
function calculateSunSignFromDate(birthDate: Date): ZodiacSign {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}
