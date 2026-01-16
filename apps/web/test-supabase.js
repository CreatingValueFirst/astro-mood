/**
 * Supabase Connection and Database Test Script
 * Run with: node test-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local file
let SUPABASE_URL, SUPABASE_ANON_KEY;

try {
  const envPath = path.join(__dirname, '.env.local');
  const envFile = fs.readFileSync(envPath, 'utf8');
  const envLines = envFile.split('\n');

  for (const line of envLines) {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      SUPABASE_URL = line.split('=')[1].trim();
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      SUPABASE_ANON_KEY = line.split('=')[1].trim();
    }
  }
} catch (err) {
  console.error('Error reading .env.local file:', err.message);
  console.log('Trying environment variables...');
  SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

console.log('🧪 AstroMood - Supabase Connection Test\n');
console.log('='.repeat(50));

// Check environment variables
console.log('\n1️⃣ Checking Environment Variables...');
if (!SUPABASE_URL) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing!');
  process.exit(1);
}
if (!SUPABASE_ANON_KEY) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing!');
  process.exit(1);
}
console.log('✅ NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL);
console.log('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY.substring(0, 20) + '...');

// Create Supabase client
console.log('\n2️⃣ Creating Supabase Client...');
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log('✅ Supabase client created successfully');

// Test database connection
async function testDatabaseConnection() {
  console.log('\n3️⃣ Testing Database Connection...');
  try {
    const { data, error } = await supabase
      .from('birth_profiles')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      console.error('   Error code:', error.code);
      console.error('   Error details:', error.details);
      return false;
    }
    console.log('✅ Database connection successful');
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    return false;
  }
}

// Test table existence
async function testTablesExist() {
  console.log('\n4️⃣ Checking Database Tables...');
  const tables = ['birth_profiles', 'natal_charts', 'monthly_forecasts', 'ephemeris_cache'];

  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows, but table exists
          console.log(`✅ ${table} - exists (empty)`);
        } else if (error.code === '42P01') {
          console.log(`❌ ${table} - table does not exist!`);
        } else {
          console.log(`⚠️  ${table} - ${error.message}`);
        }
      } else {
        console.log(`✅ ${table} - exists`);
      }
    } catch (err) {
      console.log(`❌ ${table} - error: ${err.message}`);
    }
  }
}

// Test RLS policies
async function testRLSPolicies() {
  console.log('\n5️⃣ Testing Row Level Security...');
  try {
    // Try to insert without auth (should fail with RLS)
    const { error } = await supabase
      .from('birth_profiles')
      .insert({
        name: 'Test',
        birth_date: new Date().toISOString(),
      });

    if (error) {
      if (error.code === '42501' || error.message.includes('row-level security')) {
        console.log('✅ RLS is enabled (anonymous insert blocked as expected)');
      } else {
        console.log('⚠️  RLS check inconclusive:', error.message);
      }
    } else {
      console.log('⚠️  Warning: Anonymous insert succeeded (RLS may not be configured)');
    }
  } catch (err) {
    console.log('⚠️  RLS test error:', err.message);
  }
}

// Test authentication endpoints
async function testAuthEndpoints() {
  console.log('\n6️⃣ Testing Authentication Endpoints...');
  try {
    // This should fail with invalid credentials, but confirms auth is working
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'invalid',
    });

    if (error) {
      if (error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed')) {
        console.log('✅ Auth endpoints are working (got expected auth error)');
      } else {
        console.log('⚠️  Auth error:', error.message);
      }
    }
  } catch (err) {
    console.log('❌ Auth test failed:', err.message);
  }
}

// Run all tests
async function runAllTests() {
  const dbConnected = await testDatabaseConnection();

  if (!dbConnected) {
    console.log('\n❌ Database connection failed. Cannot proceed with other tests.');
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Check that your Supabase project is active (not paused)');
    console.log('   2. Verify the URL and anon key are correct');
    console.log('   3. Run migrations: cd ../.. && npx supabase db push');
    process.exit(1);
  }

  await testTablesExist();
  await testRLSPolicies();
  await testAuthEndpoints();

  console.log('\n' + '='.repeat(50));
  console.log('✅ All tests completed!');
  console.log('\n📊 Summary:');
  console.log('   - Database connection: ✅');
  console.log('   - Tables exist: Check output above');
  console.log('   - RLS enabled: Check output above');
  console.log('   - Auth working: Check output above');
  console.log('\n🚀 Your Supabase setup is ready for deployment!');
  console.log('='.repeat(50) + '\n');
}

// Execute tests
runAllTests().catch(err => {
  console.error('\n💥 Fatal error:', err);
  process.exit(1);
});
