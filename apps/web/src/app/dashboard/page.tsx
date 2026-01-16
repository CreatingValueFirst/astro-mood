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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white p-4 sm:p-6 md:p-8 safe-top safe-bottom">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome, {profile.name}
            </h1>
            <p className="text-gray-400 mt-2 text-base sm:text-lg">
              Your cosmic forecast dashboard
            </p>
          </div>
          <form action={handleSignOut}>
            <Button
              variant="outline"
              className="border-purple-400 text-purple-300 touch-target w-full sm:w-auto text-base py-6 sm:py-2"
            >
              Sign Out
            </Button>
          </form>
        </div>

        {/* Coming Soon Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-white text-lg sm:text-xl">Monthly Forecast</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400 text-sm sm:text-base">
              Your personalized mood forecast is being generated...
              <p className="mt-4 text-sm">Coming soon!</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-white text-lg sm:text-xl">Calendar View</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400 text-sm sm:text-base">
              See your mood patterns throughout the month
              <p className="mt-4 text-sm">Coming soon!</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-white text-lg sm:text-xl">Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400 text-sm sm:text-base">
              Understand your natal chart and current transits
              <p className="mt-4 text-sm">Coming soon!</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Info */}
        <Card className="bg-gray-900/50 border-purple-500/20">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-white text-lg sm:text-xl">Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 text-sm sm:text-base">
            <p><span className="text-gray-400">Name:</span> {profile.name}</p>
            <p><span className="text-gray-400">Birth Date:</span> {new Date(profile.birth_date).toLocaleDateString()}</p>
            <p className="break-all"><span className="text-gray-400">Account:</span> {user.email}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
