import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardClient } from '@/components/DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch user's primary profile
  const { data: profile } = await supabase
    .from('birth_profiles')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_primary', true)
    .single();

  if (!profile) {
    redirect('/onboarding');
  }

  const handleSignOut = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
  };

  return (
    <DashboardClient
      profile={{
        name: profile.name,
        birth_date: profile.birth_date,
      }}
      userEmail={user.email || ''}
      onSignOut={handleSignOut}
    />
  );
}
