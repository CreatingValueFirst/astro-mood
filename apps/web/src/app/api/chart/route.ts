import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache as cache } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { calculateNatalChart } from '@/lib/astro-core';
import { BirthProfile } from '@/lib/supabase/types';

// Vercel best practice: server-cache-react
// Remove force-dynamic, use proper revalidation
export const revalidate = 86400; // 24 hours

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get profile ID from query params (optional)
    const searchParams = request.nextUrl.searchParams;
    const profileId = searchParams.get('profile_id');

    let query = supabase
      .from('birth_profiles')
      .select('*')
      .eq('user_id', user.id);

    if (profileId) {
      query = query.eq('id', profileId);
    } else {
      query = query.eq('is_primary', true);
    }

    const { data: profile, error: profileError } = await query.single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'No birth profile found. Please complete onboarding.' },
        { status: 404 }
      );
    }

    const birthProfile = profile as unknown as BirthProfile;

    // Vercel best practice: async-parallel
    // Check cached chart in parallel with potential calculation prep
    const { data: cachedChart } = await supabase
      .from('natal_charts')
      .select('*')
      .eq('profile_id', birthProfile.id)
      .single();

    // If cached and recent (less than 30 days old), return it
    if (cachedChart && cachedChart.computed_at) {
      const cacheAge = Date.now() - new Date(cachedChart.computed_at).getTime();
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

      if (cacheAge < thirtyDaysInMs) {
        return NextResponse.json(
          {
            chart: cachedChart.chart_data,
            profile: {
              id: birthProfile.id,
              name: birthProfile.name,
              birth_date: birthProfile.birth_date,
              birth_time: birthProfile.birth_time,
              birth_location: birthProfile.birth_location,
              is_primary: birthProfile.is_primary,
            },
            cached: true,
            computed_at: cachedChart.computed_at,
          },
          {
            headers: {
              'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
              'CDN-Cache-Control': 'public, s-maxage=86400',
            },
          }
        );
      }
    }

    // Calculate fresh natal chart
    const chart = calculateNatalChart({
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

    // Cache the chart
    // Vercel best practice: async-defer-await
    // Don't await cache update - return response immediately
    const cachePromise = supabase
      .from('natal_charts')
      .upsert(
        {
          profile_id: birthProfile.id,
          chart_data: chart,
          computed_at: new Date().toISOString(),
        },
        { onConflict: 'profile_id' }
      );

    // Return immediately, cache in background
    const response = NextResponse.json(
      {
        chart,
        profile: {
          id: birthProfile.id,
          name: birthProfile.name,
          birth_date: birthProfile.birth_date,
          birth_time: birthProfile.birth_time,
          birth_location: birthProfile.birth_location,
          is_primary: birthProfile.is_primary,
        },
        cached: false,
        computed_at: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
          'CDN-Cache-Control': 'public, s-maxage=86400',
        },
      }
    );

    // Wait for cache to complete before returning (but don't block response)
    cachePromise.catch((err) => console.error('Failed to cache chart:', err));

    return response;
  } catch (error) {
    console.error('Error calculating natal chart:', error);
    return NextResponse.json(
      { error: 'Failed to calculate natal chart' },
      { status: 500 }
    );
  }
}
