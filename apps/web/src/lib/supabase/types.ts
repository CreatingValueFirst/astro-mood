/**
 * Supabase Database Types
 * Strongly-typed interfaces for database tables
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// =============================================================================
// Structured Types for JSON Columns
// =============================================================================

export interface BirthLocation {
  lat: number;
  lon: number;
  timezone?: string;
  city?: string;
  country?: string;
}

export interface PlanetPosition {
  longitude: number;
  sign: string;
  degree: number;
  latitude?: number;
  isRetrograde?: boolean;
}

export interface NatalChart {
  sunSign: string;
  moonSign?: string | null;
  risingSign?: string | null;
  planets: {
    sun: PlanetPosition;
    moon: PlanetPosition;
    mercury: PlanetPosition;
    venus: PlanetPosition;
    mars: PlanetPosition;
    jupiter: PlanetPosition;
    saturn: PlanetPosition;
    uranus: PlanetPosition;
    neptune: PlanetPosition;
    pluto: PlanetPosition;
  };
  houses?: number[] | null;
  aspects?: Array<{
    planet1: string;
    planet2: string;
    aspect: string;
    angle: number;
  }>;
  elements?: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  modalities?: {
    cardinal: number;
    fixed: number;
    mutable: number;
  };
}

export interface MoodScores {
  energy: number;
  focus: number;
  romance: number;
  stress: number;
  social: number;
}

export interface DailyScore extends MoodScores {
  date: string;
  mood: number;
}

export interface MonthlyForecast {
  summary: string;
  overallMood: number;
  moodScores: MoodScores;
  dailyScores: DailyScore[];
  keyDates?: Array<{
    date: string;
    event: string;
    type: string;
    impact: string;
  }>;
  transits?: Array<{
    planet: string;
    event: string;
    date: string;
    description?: string;
  }>;
  weeklyBreakdowns?: Array<{
    week: number;
    dates: string;
    theme: string;
    advice: string;
  }>;
  doList?: string[];
  dontList?: string[];
  affirmations?: string[];
}

export interface EphemerisData {
  sun: PlanetPosition;
  moon: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  uranus: PlanetPosition;
  neptune: PlanetPosition;
  pluto: PlanetPosition;
}

// =============================================================================
// Database Schema Types
// =============================================================================

export interface Database {
  public: {
    Tables: {
      birth_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          birth_date: string;
          birth_time: string | null;
          birth_location: BirthLocation | null;
          is_primary: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          birth_date: string;
          birth_time?: string | null;
          birth_location?: BirthLocation | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          birth_date?: string;
          birth_time?: string | null;
          birth_location?: BirthLocation | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      natal_charts: {
        Row: {
          id: string;
          profile_id: string;
          chart_data: NatalChart;
          computed_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          chart_data: NatalChart;
          computed_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          chart_data?: NatalChart;
          computed_at?: string;
        };
      };
      monthly_forecasts: {
        Row: {
          id: string;
          profile_id: string;
          year: number;
          month: number;
          forecast_data: MonthlyForecast;
          computed_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          year: number;
          month: number;
          forecast_data: MonthlyForecast;
          computed_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          year?: number;
          month?: number;
          forecast_data?: MonthlyForecast;
          computed_at?: string;
        };
      };
      ephemeris_cache: {
        Row: {
          date: string;
          planetary_positions: EphemerisData;
          computed_at: string;
        };
        Insert: {
          date: string;
          planetary_positions: EphemerisData;
          computed_at?: string;
        };
        Update: {
          date?: string;
          planetary_positions?: EphemerisData;
          computed_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      user_owns_profile: {
        Args: { profile_uuid: string };
        Returns: boolean;
      };
      cleanup_old_ephemeris: {
        Args: Record<string, never>;
        Returns: void;
      };
    };
    Enums: Record<string, never>;
  };
}

// =============================================================================
// Type Helpers
// =============================================================================

export type BirthProfile = Database['public']['Tables']['birth_profiles']['Row'];
export type BirthProfileInsert = Database['public']['Tables']['birth_profiles']['Insert'];
export type BirthProfileUpdate = Database['public']['Tables']['birth_profiles']['Update'];

export type NatalChartRow = Database['public']['Tables']['natal_charts']['Row'];
export type NatalChartInsert = Database['public']['Tables']['natal_charts']['Insert'];
export type NatalChartUpdate = Database['public']['Tables']['natal_charts']['Update'];

export type MonthlyForecastRow = Database['public']['Tables']['monthly_forecasts']['Row'];
export type MonthlyForecastInsert = Database['public']['Tables']['monthly_forecasts']['Insert'];
export type MonthlyForecastUpdate = Database['public']['Tables']['monthly_forecasts']['Update'];

export type EphemerisRow = Database['public']['Tables']['ephemeris_cache']['Row'];
export type EphemerisInsert = Database['public']['Tables']['ephemeris_cache']['Insert'];
export type EphemerisUpdate = Database['public']['Tables']['ephemeris_cache']['Update'];
