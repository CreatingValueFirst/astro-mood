import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fegqcrzdqbhoubruchky.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZ3FjcnpkcWJob3VicnVjaGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MjMxODIsImV4cCI6MjA4NDA5OTE4Mn0.30Vg58OxWNAGTOouse1FwABW1AzuUqsiXed3FwXHjoY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🚀 Testing Vercel Deployment');
console.log('═'.repeat(70));
console.log('');

// Generate unique test email
const testEmail = `vercel.test.${Date.now()}@gmail.com`;
const testPassword = 'TestPassword123!';

console.log('📝 Testing Signup (Same as Vercel will use)');
console.log('─'.repeat(70));
console.log(`Email: ${testEmail}`);
console.log(`Password: ${testPassword}`);
console.log('');

try {
  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
  });

  if (error) {
    console.log('❌ Signup Failed');
    console.log(`Error: ${error.message}`);
    console.log(`Code: ${error.code}`);
    console.log('');
    console.log('This means Vercel deployment will also fail with the same error.');
    process.exit(1);
  }

  console.log('✅ Signup Successful!');
  console.log(`User ID: ${data.user?.id}`);
  console.log(`Email Confirmed: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}`);

  if (data.session) {
    console.log('✅ Session created immediately (email confirmation disabled)');
  } else {
    console.log('⚠️  No session (email confirmation enabled)');
  }

  console.log('');
  console.log('═'.repeat(70));
  console.log('🎉 SUCCESS! Your Vercel deployment should work now!');
  console.log('═'.repeat(70));
  console.log('');
  console.log('✅ Test account created:');
  console.log(`   Email: ${testEmail}`);
  console.log(`   Password: ${testPassword}`);
  console.log('');
  console.log('📱 Now test in your browser:');
  console.log('   1. Visit: https://astro-world-eight.vercel.app/debug-env');
  console.log('   2. You should see ✅ green success message');
  console.log('   3. Visit: https://astro-world-eight.vercel.app/signup');
  console.log('   4. Create a new account');
  console.log('   5. You should be redirected to onboarding');
  console.log('');

  // Cleanup
  await supabase.auth.signOut();

} catch (err) {
  console.error('❌ Unexpected error:', err.message);
  process.exit(1);
}
