-- =============================================================================
-- AstroMood Database Schema - Initial Migration
-- Core tables for birth profiles, natal charts, forecasts, and ephemeris
-- =============================================================================

-- Birth Profiles: User birth information for chart calculations
CREATE TABLE birth_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_date TIMESTAMPTZ NOT NULL,
  birth_time TIME,  -- optional: for full natal chart (requires exact time)
  birth_location JSONB,  -- { lat: number, lon: number, timezone: string, city?: string, country?: string }
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT birth_profiles_name_not_empty CHECK (length(trim(name)) > 0),
  CONSTRAINT birth_profiles_valid_location CHECK (
    birth_location IS NULL OR (
      birth_location ? 'lat' AND
      birth_location ? 'lon' AND
      (birth_location->>'lat')::numeric BETWEEN -90 AND 90 AND
      (birth_location->>'lon')::numeric BETWEEN -180 AND 180
    )
  )
);

-- Indexes for faster queries
CREATE INDEX birth_profiles_user_id_idx ON birth_profiles(user_id);
CREATE INDEX birth_profiles_is_primary_idx ON birth_profiles(user_id, is_primary) WHERE is_primary = true;

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER birth_profiles_updated_at
  BEFORE UPDATE ON birth_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Natal Charts: Cached natal chart calculations
CREATE TABLE natal_charts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  chart_data JSONB NOT NULL,  -- Includes: sunSign, planets, houses, aspects, elements, modalities
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

CREATE INDEX natal_charts_profile_id_idx ON natal_charts(profile_id);

-- Monthly Forecasts: Cached monthly astrological forecasts
CREATE TABLE monthly_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  year INT NOT NULL,
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  forecast_data JSONB NOT NULL,  -- Includes: summary, moodScores, dailyScores, keyDates, transits, etc.
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, year, month)
);

CREATE INDEX monthly_forecasts_profile_id_idx ON monthly_forecasts(profile_id);
CREATE INDEX monthly_forecasts_year_month_idx ON monthly_forecasts(year, month);
CREATE INDEX monthly_forecasts_computed_at_idx ON monthly_forecasts(computed_at);

-- Ephemeris Cache: Shared planetary positions (optimizes calculations)
CREATE TABLE ephemeris_cache (
  date DATE PRIMARY KEY,
  planetary_positions JSONB NOT NULL,  -- All 10 planets with positions and retrograde status
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ephemeris_cache_date_idx ON ephemeris_cache(date);

-- Table comments
COMMENT ON TABLE birth_profiles IS 'User birth information for astrological chart calculations';
COMMENT ON TABLE natal_charts IS 'Cached natal chart calculations';
COMMENT ON TABLE monthly_forecasts IS 'Cached monthly astrological forecasts';
COMMENT ON TABLE ephemeris_cache IS 'Shared planetary positions cache';
