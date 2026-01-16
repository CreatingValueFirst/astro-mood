/**
 * Supabase Utility Functions
 * Common operations and error handling
 */

import { PostgrestError } from '@supabase/supabase-js';

/**
 * Type guard to check if an error is a Supabase error
 */
export function isSupabaseError(error: unknown): error is PostgrestError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'details' in error
  );
}

/**
 * Format Supabase error for user display
 */
export function formatSupabaseError(error: unknown): string {
  if (isSupabaseError(error)) {
    // Handle specific error codes
    switch (error.code) {
      case '23505':
        return 'This record already exists.';
      case '23503':
        return 'Referenced record not found.';
      case '42501':
        return 'You don't have permission to perform this action.';
      default:
        return error.message || 'An unexpected database error occurred.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred.';
}

/**
 * Check if user has permission to access a profile
 */
export async function checkProfileOwnership(
  supabase: any,
  profileId: string,
  userId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('birth_profiles')
    .select('id')
    .eq('id', profileId)
    .eq('user_id', userId)
    .single();

  return !error && !!data;
}

/**
 * Get user's primary profile
 */
export async function getPrimaryProfile(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('birth_profiles')
    .select('*')
    .eq('user_id', userId)
    .eq('is_primary', true)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned
    throw error;
  }

  return data;
}

/**
 * Get user's birth profiles
 */
export async function getUserProfiles(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('birth_profiles')
    .select('*')
    .eq('user_id', userId)
    .order('is_primary', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

/**
 * Create or update a birth profile
 */
export async function upsertBirthProfile(
  supabase: any,
  profile: {
    id?: string;
    user_id: string;
    name: string;
    birth_date: string;
    birth_time?: string | null;
    birth_location?: any | null;
    is_primary?: boolean;
  }
) {
  // If setting as primary, unset other profiles
  if (profile.is_primary) {
    await supabase
      .from('birth_profiles')
      .update({ is_primary: false })
      .eq('user_id', profile.user_id);
  }

  const { data, error } = await supabase
    .from('birth_profiles')
    .upsert(profile, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Delete a birth profile and related data
 */
export async function deleteBirthProfile(supabase: any, profileId: string, userId: string) {
  // Check ownership
  const hasPermission = await checkProfileOwnership(supabase, profileId, userId);
  if (!hasPermission) {
    throw new Error('You don't have permission to delete this profile.');
  }

  // Delete profile (cascades to natal_charts and monthly_forecasts)
  const { error } = await supabase
    .from('birth_profiles')
    .delete()
    .eq('id', profileId);

  if (error) {
    throw error;
  }

  return true;
}

/**
 * Get cached monthly forecast
 */
export async function getCachedForecast(
  supabase: any,
  profileId: string,
  year: number,
  month: number
) {
  const { data, error } = await supabase
    .from('monthly_forecasts')
    .select('*')
    .eq('profile_id', profileId)
    .eq('year', year)
    .eq('month', month)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data;
}

/**
 * Cache a monthly forecast
 */
export async function cacheForecast(
  supabase: any,
  forecast: {
    profile_id: string;
    year: number;
    month: number;
    forecast_data: any;
  }
) {
  const { data, error } = await supabase
    .from('monthly_forecasts')
    .upsert(forecast, {
      onConflict: 'profile_id,year,month',
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Check if a forecast is stale (older than 7 days)
 */
export function isForecastStale(computedAt: string): boolean {
  const computed = new Date(computedAt);
  const now = new Date();
  const daysSinceComputed = (now.getTime() - computed.getTime()) / (1000 * 60 * 60 * 24);

  return daysSinceComputed > 7;
}
