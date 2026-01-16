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

    // AUTHENTICATION DISABLED - Using mock data for public demo
    const mockBirthDate = '1990-06-15'; // Gemini sun sign
    const sunSign: ZodiacSign = calculateSunSignFromDate(new Date(mockBirthDate));

    console.log(`🔮 Generating forecast for ${sunSign} - ${year}/${month}`);

    // Generate forecast (no caching for public demo)
    const forecast = await generateMonthlyForecast(year, month, sunSign);

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
