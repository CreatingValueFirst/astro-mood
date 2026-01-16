'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, CheckCircle, Check, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/AnimatedButton';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { StarryBackground } from '@/components/StarryBackground';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Password validation
  const hasMinLength = password.length >= 6;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const showPasswordValidation = password.length > 0;
  const showMatchValidation = confirmPassword.length > 0;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) throw error;

      if (data.user) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/onboarding');
          router.refresh();
        }, 800);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
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
          <CardHeader className="space-y-1 px-4 sm:px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-white">
                Create your account
              </CardTitle>
            </motion.div>
            <CardDescription className="text-center text-gray-400 text-base sm:text-sm">
              Start your cosmic journey with AstroMood
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="email" className="text-gray-200 text-base flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-500 h-12 text-base focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="password" className="text-gray-200 text-base flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-400" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  required
                  minLength={6}
                  className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-500 h-12 text-base focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
                />
                {showPasswordValidation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 text-sm"
                  >
                    {hasMinLength ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <X className="w-4 h-4 text-red-400" />
                    )}
                    <span className={hasMinLength ? 'text-green-400' : 'text-red-400'}>
                      At least 6 characters
                    </span>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="confirm-password" className="text-gray-200 text-base flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-400" />
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-500 h-12 text-base focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
                />
                {showMatchValidation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 text-sm"
                  >
                    {passwordsMatch ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <X className="w-4 h-4 text-red-400" />
                    )}
                    <span className={passwordsMatch ? 'text-green-400' : 'text-red-400'}>
                      Passwords match
                    </span>
                  </motion.div>
                )}
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
                  <span>Success! Setting up your profile...</span>
                </motion.div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6 pb-6">
              <AnimatedButton
                type="submit"
                className="w-full touch-target bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base sm:text-lg py-6 sm:py-3 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
                disabled={loading || success}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Creating account...
                  </span>
                ) : success ? (
                  'Success!'
                ) : (
                  'Create Account'
                )}
              </AnimatedButton>

              <motion.p
                className="text-sm sm:text-base text-center text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Already have an account?{' '}
                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Sign in
                </Link>
              </motion.p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
