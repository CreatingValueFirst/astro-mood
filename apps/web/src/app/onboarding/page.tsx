'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function OnboardingPage() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('birth_profiles')
        .insert({
          user_id: user.id,
          name,
          birth_date: new Date(birthDate).toISOString(),
          is_primary: true,
        });

      if (error) throw error;

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-black p-4">
      <Card className="w-full max-w-md bg-gray-900/50 border-purple-500/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Tell us about yourself
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            We need your birth date to generate your personalized forecast
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-gray-200">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                max={new Date().toISOString().split('T')[0]}
                className="bg-gray-800/50 border-purple-500/30 text-white"
              />
            </div>
            {error && (
              <div className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-500/30">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={loading}
            >
              {loading ? 'Creating profile...' : 'Continue to Dashboard'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
