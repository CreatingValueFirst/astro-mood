-- =============================================================================
-- AstroMood Optimized Database Schema
-- Removes redundancies, adds missing constraints, and improves performance
-- =============================================================================

-- Add missing indexes for better query performance
CREATE INDEX IF NOT EXISTS natal_charts_computed_at_idx ON natal_charts(computed_at);

-- Add constraints to ensure data integrity in JSONB columns
-- Birth location validation (already exists, but ensuring it's there)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'birth_profiles_valid_location'
  ) THEN
    ALTER TABLE birth_profiles
    ADD CONSTRAINT birth_profiles_valid_location CHECK (
      birth_location IS NULL OR (
        birth_location ? 'lat' AND
        birth_location ? 'lon' AND
        (birth_location->>'lat')::numeric BETWEEN -90 AND 90 AND
        (birth_location->>'lon')::numeric BETWEEN -180 AND 180
      )
    );
  END IF;
END $$;

-- Add constraint to ensure natal chart has required fields
ALTER TABLE natal_charts DROP CONSTRAINT IF EXISTS natal_charts_valid_data;
ALTER TABLE natal_charts
ADD CONSTRAINT natal_charts_valid_data CHECK (
  chart_data ? 'sunSign' AND
  chart_data ? 'planets'
);

-- Add constraint to ensure forecast has required structure
ALTER TABLE monthly_forecasts DROP CONSTRAINT IF EXISTS monthly_forecasts_valid_data;
ALTER TABLE monthly_forecasts
ADD CONSTRAINT monthly_forecasts_valid_data CHECK (
  forecast_data ? 'summary' AND
  forecast_data ? 'overallMood' AND
  forecast_data ? 'moodScores' AND
  forecast_data ? 'dailyScores'
);

-- Add constraint to ensure ephemeris has all required planets
ALTER TABLE ephemeris_cache DROP CONSTRAINT IF EXISTS ephemeris_valid_planets;
ALTER TABLE ephemeris_cache
ADD CONSTRAINT ephemeris_valid_planets CHECK (
  planetary_positions ? 'sun' AND
  planetary_positions ? 'moon' AND
  planetary_positions ? 'mercury' AND
  planetary_positions ? 'venus' AND
  planetary_positions ? 'mars' AND
  planetary_positions ? 'jupiter' AND
  planetary_positions ? 'saturn' AND
  planetary_positions ? 'uranus' AND
  planetary_positions ? 'neptune' AND
  planetary_positions ? 'pluto'
);

-- Add index for faster ephemeris cache lookups
CREATE INDEX IF NOT EXISTS ephemeris_cache_computed_at_idx ON ephemeris_cache(computed_at);

-- Function to automatically clean up old ephemeris cache (older than 1 year)
CREATE OR REPLACE FUNCTION cleanup_old_ephemeris()
RETURNS void AS $$
BEGIN
  DELETE FROM ephemeris_cache
  WHERE date < CURRENT_DATE - INTERVAL '1 year';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to ensure only one primary profile per user
CREATE OR REPLACE FUNCTION ensure_single_primary_profile()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_primary = true THEN
    UPDATE birth_profiles
    SET is_primary = false
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to maintain single primary profile
DROP TRIGGER IF EXISTS ensure_single_primary_profile_trigger ON birth_profiles;
CREATE TRIGGER ensure_single_primary_profile_trigger
  BEFORE INSERT OR UPDATE ON birth_profiles
  FOR EACH ROW
  WHEN (NEW.is_primary = true)
  EXECUTE FUNCTION ensure_single_primary_profile();

-- Add partial unique index to ensure only one primary profile per user
DROP INDEX IF EXISTS birth_profiles_unique_primary_per_user;
CREATE UNIQUE INDEX birth_profiles_unique_primary_per_user
ON birth_profiles(user_id)
WHERE is_primary = true;

-- Improve birth_profiles query performance with composite index
DROP INDEX IF EXISTS birth_profiles_user_created_idx;
CREATE INDEX birth_profiles_user_created_idx ON birth_profiles(user_id, created_at DESC);

-- Add index for faster monthly forecast lookups
DROP INDEX IF EXISTS monthly_forecasts_profile_year_month_idx;
CREATE INDEX monthly_forecasts_profile_year_month_idx
ON monthly_forecasts(profile_id, year DESC, month DESC);

-- =============================================================================
-- Comments (Essential only)
-- =============================================================================
COMMENT ON FUNCTION cleanup_old_ephemeris IS 'Removes ephemeris data older than 1 year to save storage';
COMMENT ON FUNCTION ensure_single_primary_profile IS 'Ensures user has only one primary profile';
COMMENT ON CONSTRAINT natal_charts_valid_data ON natal_charts IS 'Ensures chart has required fields: sunSign, planets';
COMMENT ON CONSTRAINT monthly_forecasts_valid_data ON monthly_forecasts IS 'Ensures forecast has required fields';
COMMENT ON CONSTRAINT ephemeris_valid_planets ON ephemeris_cache IS 'Ensures all 10 planets are present';
