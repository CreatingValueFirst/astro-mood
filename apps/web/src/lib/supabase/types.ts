/**
 * Supabase Database Types
 * Auto-generated types for database tables
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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
          birth_location: Json | null;
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
          birth_location?: Json | null;
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
          birth_location?: Json | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      natal_charts: {
        Row: {
          id: string;
          profile_id: string;
          chart_data: Json;
          computed_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          chart_data: Json;
          computed_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          chart_data?: Json;
          computed_at?: string;
        };
      };
      monthly_forecasts: {
        Row: {
          id: string;
          profile_id: string;
          year: number;
          month: number;
          forecast_data: Json;
          computed_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          year: number;
          month: number;
          forecast_data: Json;
          computed_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          year?: number;
          month?: number;
          forecast_data?: Json;
          computed_at?: string;
        };
      };
      ephemeris_cache: {
        Row: {
          date: string;
          planetary_positions: Json;
          computed_at: string;
        };
        Insert: {
          date: string;
          planetary_positions: Json;
          computed_at?: string;
        };
        Update: {
          date?: string;
          planetary_positions?: Json;
          computed_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
