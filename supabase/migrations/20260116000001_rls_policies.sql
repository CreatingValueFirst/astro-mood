-- =============================================================================
-- AstroMood Row Level Security (RLS) Policies
-- Ensures users can only access their own data
-- =============================================================================

-- Enable RLS
ALTER TABLE birth_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE natal_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ephemeris_cache ENABLE ROW LEVEL SECURITY;

-- Birth Profiles Policies (Users can CRUD their own profiles only)
CREATE POLICY "Users can view own birth profiles"
  ON birth_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can create their own profiles
CREATE POLICY "Users can create own birth profiles"
  ON birth_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can update their own profiles
CREATE POLICY "Users can update own birth profiles"
  ON birth_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can delete their own profiles
CREATE POLICY "Users can delete own birth profiles"
  ON birth_profiles
  FOR DELETE
  USING (auth.uid() = user_id);

-- Natal Charts Policies (Users can access charts for their profiles)
CREATE POLICY "Users can view own natal charts"
  ON natal_charts
  FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  );

-- INSERT: Users can create natal charts for their profiles
CREATE POLICY "Users can create own natal charts"
  ON natal_charts
  FOR INSERT
  WITH CHECK (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  );

-- UPDATE: Users can update natal charts for their profiles
CREATE POLICY "Users can update own natal charts"
  ON natal_charts
  FOR UPDATE
  USING (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  );

-- DELETE: Users can delete natal charts for their profiles
CREATE POLICY "Users can delete own natal charts"
  ON natal_charts
  FOR DELETE
  USING (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  );

-- Monthly Forecasts Policies (Users can access forecasts for their profiles)
CREATE POLICY "Users can view own forecasts"
  ON monthly_forecasts
  FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  );

-- INSERT: Users can create forecasts for their profiles
CREATE POLICY "Users can create own forecasts"
  ON monthly_forecasts
  FOR INSERT
  WITH CHECK (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  );

-- UPDATE: Users can update forecasts for their profiles
CREATE POLICY "Users can update own forecasts"
  ON monthly_forecasts
  FOR UPDATE
  USING (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  );

-- DELETE: Users can delete forecasts for their profiles
CREATE POLICY "Users can delete own forecasts"
  ON monthly_forecasts
  FOR DELETE
  USING (
    profile_id IN (
      SELECT id FROM birth_profiles WHERE user_id = auth.uid()
    )
  );

-- Ephemeris Cache Policies (Shared data: public read, service write)
CREATE POLICY "Authenticated users can view ephemeris cache"
  ON ephemeris_cache
  FOR SELECT
  TO authenticated
  USING (true);

-- INSERT: Only service role can insert ephemeris data
-- (This will be handled by Edge Functions with service role key)
CREATE POLICY "Service role can insert ephemeris data"
  ON ephemeris_cache
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- UPDATE: Only service role can update ephemeris data
CREATE POLICY "Service role can update ephemeris data"
  ON ephemeris_cache
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- DELETE: Only service role can delete ephemeris data
CREATE POLICY "Service role can delete ephemeris data"
  ON ephemeris_cache
  FOR DELETE
  TO service_role
  USING (true);

-- Helper Functions
CREATE OR REPLACE FUNCTION user_owns_profile(profile_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM birth_profiles
    WHERE id = profile_uuid AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION user_owns_profile IS 'Checks if current user owns a profile';
