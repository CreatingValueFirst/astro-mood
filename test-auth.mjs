import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fegqcrzdqbhoubruchky.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZ3FjcnpkcWJob3VicnVjaGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MjMxODIsImV4cCI6MjA4NDA5OTE4Mn0.30Vg58OxWNAGTOouse1FwABW1AzuUqsiXed3FwXHjoY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate a random test email with a common domain
const testEmail = `astromood.test.${Date.now()}@gmail.com`;
const testPassword = 'TestPassword123!';

console.log('🧪 Testing Astro Mood Authentication Flow\n');
console.log('═'.repeat(60));

// Test 1: Signup
console.log('\n1️⃣  Testing Signup Flow...');
console.log('   Email:', testEmail);
console.log('   Password:', testPassword);

try {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      emailRedirectTo: 'http://localhost:3000/onboarding'
    }
  });

  if (signupError) {
    console.log('   ❌ Signup Error:', signupError.message);
    console.log('   Full Error:', JSON.stringify(signupError, null, 2));
    process.exit(1);
  }

  console.log('   ✅ Signup successful!');
  console.log('   User ID:', signupData.user?.id);
  console.log('   Email confirmed:', signupData.user?.email_confirmed_at ? 'Yes' : 'No');

  // Check if email confirmation is required
  if (!signupData.user?.email_confirmed_at && signupData.user?.confirmation_sent_at) {
    console.log('   ⚠️  Email confirmation required');
    console.log('   Confirmation email sent at:', signupData.user.confirmation_sent_at);
  } else if (signupData.user?.email_confirmed_at) {
    console.log('   ✅ Email auto-confirmed (confirmation disabled in project settings)');
  }

  // Test 2: Check session after signup
  console.log('\n2️⃣  Checking Session After Signup...');
  const { data: sessionData } = await supabase.auth.getSession();

  if (sessionData.session) {
    console.log('   ✅ Session exists after signup');
    console.log('   Access token:', sessionData.session.access_token.substring(0, 20) + '...');
  } else {
    console.log('   ⚠️  No session (email confirmation likely required)');
  }

  // Test 3: Sign out
  console.log('\n3️⃣  Testing Sign Out...');
  await supabase.auth.signOut();
  console.log('   ✅ Signed out successfully');

  // Test 4: Login with created account
  console.log('\n4️⃣  Testing Login Flow...');
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });

  if (loginError) {
    console.log('   ❌ Login Error:', loginError.message);

    if (loginError.message.includes('Email not confirmed')) {
      console.log('\n   📧 Email confirmation is REQUIRED for this project.');
      console.log('   To disable email confirmation:');
      console.log('   1. Go to https://supabase.com/dashboard/project/fegqcrzdqbhoubruchky/auth/providers');
      console.log('   2. Scroll to "Email" settings');
      console.log('   3. Toggle OFF "Confirm email"');
    } else if (loginError.message.includes('Invalid login credentials')) {
      console.log('   This could mean:');
      console.log('   - Email confirmation is required but not completed');
      console.log('   - Wrong credentials (but we just created this account)');
      console.log('   - Account was not created successfully');
    }

    console.log('\n   Full Error:', JSON.stringify(loginError, null, 2));
  } else {
    console.log('   ✅ Login successful!');
    console.log('   User ID:', loginData.user?.id);
    console.log('   Access token:', loginData.session?.access_token.substring(0, 20) + '...');

    // Test 5: Fetch user profile
    console.log('\n5️⃣  Testing User Profile Access...');
    const { data: profile, error: profileError } = await supabase
      .from('birth_profiles')
      .select('*')
      .eq('user_id', loginData.user?.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.log('   ⚠️  Profile Error:', profileError.message);
    } else if (profile) {
      console.log('   ✅ Profile found:', profile.name);
    } else {
      console.log('   ✅ No profile yet (expected - onboarding not completed)');
    }
  }

  console.log('\n═'.repeat(60));
  console.log('✨ Authentication Test Complete\n');

} catch (error) {
  console.error('\n❌ Unexpected Error:', error.message);
  console.error(error);
  process.exit(1);
}
