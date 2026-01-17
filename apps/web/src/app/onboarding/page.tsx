'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Calendar, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/AnimatedButton';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { StarryBackground } from '@/components/StarryBackground';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

export default function OnboardingPage() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-black p-4 safe-top safe-bottom overflow-hidden">
      <StarryBackground />

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)]">
          <CardHeader className="px-4 sm:px-6">
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring' as const, stiffness: 150, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-white">
                Tell us about yourself
              </CardTitle>
            </motion.div>

            <CardDescription className="text-center text-gray-400 text-base sm:text-sm pt-2">
              We need your birth date to generate your personalized cosmic forecast
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="name" className="text-gray-200 text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-400" />
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-500 h-12 text-base focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="birthDate" className="text-gray-200 text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Birth Date
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  autoComplete="bday"
                  className="bg-gray-800/50 border-purple-500/30 text-white h-12 text-base focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used to calculate your astrological natal chart
                </p>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-500/30"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-sm text-green-400 bg-green-900/20 p-3 rounded-md border border-green-500/30"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Profile created! Loading your dashboard...</span>
                </motion.div>
              )}

              <AnimatedButton
                type="submit"
                className="w-full touch-target bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base sm:text-lg py-6 sm:py-3 mt-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
                disabled={loading || success}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Creating profile...
                  </span>
                ) : success ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Success!
                  </span>
                ) : (
                  'Continue to Dashboard'
                )}
              </AnimatedButton>
            </CardContent>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
