import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome, {profile.name}
            </h1>
            <p className="text-gray-400 mt-2">
              Your cosmic forecast dashboard
            </p>
          </div>
          <form action={handleSignOut}>
            <Button variant="outline" className="border-purple-400 text-purple-300">
              Sign Out
            </Button>
          </form>
        </div>

        {/* Coming Soon Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Monthly Forecast</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400">
              Your personalized mood forecast is being generated...
              <p className="mt-4 text-sm">Coming soon!</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Calendar View</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400">
              See your mood patterns throughout the month
              <p className="mt-4 text-sm">Coming soon!</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400">
              Understand your natal chart and current transits
              <p className="mt-4 text-sm">Coming soon!</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Info */}
        <Card className="bg-gray-900/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2">
            <p><span className="text-gray-400">Name:</span> {profile.name}</p>
            <p><span className="text-gray-400">Birth Date:</span> {new Date(profile.birth_date).toLocaleDateString()}</p>
            <p><span className="text-gray-400">Account:</span> {user.email}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
