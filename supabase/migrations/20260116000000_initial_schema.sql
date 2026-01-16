-- AstroMood Database Schema
-- Initial migration: Core tables for birth profiles, natal charts, forecasts, and ephemeris cache

-- Note: gen_random_uuid() is built into modern PostgreSQL (13+)
-- No extension needed for UUID generation

-- =====================================================
-- Birth Profiles Table
-- Stores user birth information for chart calculations
-- =====================================================
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

-- =====================================================
-- Natal Charts Table
-- Cached natal chart calculations
-- =====================================================
CREATE TABLE natal_charts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  chart_data JSONB NOT NULL,
  /* chart_data structure:
  {
    "sunSign": string,  // e.g., "Capricorn"
    "moonSign": string | null,
    "risingSign": string | null,
    "planets": {
      "sun": { "longitude": number, "sign": string, "degree": number },
      "moon": { "longitude": number, "sign": string, "degree": number },
      "mercury": { "longitude": number, "sign": string, "degree": number },
      ...
    },
    "houses": [...] | null,  // if birth time available
    "aspects": [...],  // major aspects between planets
    "elements": { "fire": number, "earth": number, "air": number, "water": number },
    "modalities": { "cardinal": number, "fixed": number, "mutable": number }
  }
  */
  computed_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one natal chart per profile
  UNIQUE(profile_id)
);

-- Index
CREATE INDEX natal_charts_profile_id_idx ON natal_charts(profile_id);

-- =====================================================
-- Monthly Forecasts Table
-- Cached forecast computations for each month
-- =====================================================
CREATE TABLE monthly_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  year INT NOT NULL,
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  forecast_data JSONB NOT NULL,
  /* forecast_data structure:
  {
    "summary": string,
    "overallMood": number,  // 0-100
    "moodScores": {
      "energy": number,  // 0-100
      "focus": number,
      "romance": number,
      "stress": number,
      "social": number
    },
    "dailyScores": [
      { "date": "2024-02-01", "mood": 75, "energy": 80, "focus": 70, ... },
      ...
    ],
    "keyDates": [
      { "date": "2024-02-05", "event": "Full Moon in Leo", "type": "lunation", "impact": "high" },
      ...
    ],
    "transits": [
      { "planet": "Mars", "event": "enters Gemini", "date": "2024-02-15", "description": "...", "moodImpact": {...} },
      ...
    ],
    "weeklyBreakdowns": [
      { "week": 1, "dates": "Feb 1-7", "theme": "...", "advice": "..." },
      ...
    ],
    "doList": [...],
    "dontList": [...],
    "affirmations": [...]
  }
  */
  computed_at TIMESTAMPTZ DEFAULT NOW(),

  -- One forecast per profile per month
  UNIQUE(profile_id, year, month)
);

-- Indexes
CREATE INDEX monthly_forecasts_profile_id_idx ON monthly_forecasts(profile_id);
CREATE INDEX monthly_forecasts_year_month_idx ON monthly_forecasts(year, month);
CREATE INDEX monthly_forecasts_computed_at_idx ON monthly_forecasts(computed_at);

-- =====================================================
-- Ephemeris Cache Table
-- Shared planetary position cache (reduces redundant calculations)
-- =====================================================
CREATE TABLE ephemeris_cache (
  date DATE PRIMARY KEY,
  planetary_positions JSONB NOT NULL,
  /* planetary_positions structure:
  {
    "sun": { "longitude": number, "sign": string, "degree": number, "latitude": number },
    "moon": { "longitude": number, "sign": string, "degree": number, "latitude": number },
    "mercury": { "longitude": number, "sign": string, "degree": number, "isRetrograde": boolean },
    "venus": { "longitude": number, "sign": string, "degree": number, "isRetrograde": boolean },
    "mars": { "longitude": number, "sign": string, "degree": number, "isRetrograde": boolean },
    "jupiter": { "longitude": number, "sign": string, "degree": number, "isRetrograde": boolean },
    "saturn": { "longitude": number, "sign": string, "degree": number, "isRetrograde": boolean },
    "uranus": { "longitude": number, "sign": string, "degree": number, "isRetrograde": boolean },
    "neptune": { "longitude": number, "sign": string, "degree": number, "isRetrograde": boolean },
    "pluto": { "longitude": number, "sign": string, "degree": number, "isRetrograde": boolean }
  }
  */
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for date range queries
CREATE INDEX ephemeris_cache_date_idx ON ephemeris_cache(date);

-- =====================================================
-- Comments for documentation
-- =====================================================
COMMENT ON TABLE birth_profiles IS 'User birth information for astrological chart calculations';
COMMENT ON TABLE natal_charts IS 'Cached natal chart calculations based on birth data';
COMMENT ON TABLE monthly_forecasts IS 'Cached monthly astrological forecasts with mood scores';
COMMENT ON TABLE ephemeris_cache IS 'Shared cache of planetary positions to optimize calculations';

COMMENT ON COLUMN birth_profiles.birth_time IS 'Optional exact time of birth (required for houses and rising sign)';
COMMENT ON COLUMN birth_profiles.birth_location IS 'Birth location coordinates and timezone for accurate calculations';
COMMENT ON COLUMN birth_profiles.is_primary IS 'User primary profile for quick access';
COMMENT ON COLUMN monthly_forecasts.forecast_data IS 'Complete forecast including mood scores, transits, and interpretations';
COMMENT ON COLUMN ephemeris_cache.planetary_positions IS 'Daily planetary positions at midnight UTC';
