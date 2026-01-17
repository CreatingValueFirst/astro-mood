'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/AnimatedButton';
import { StarryBackground } from '@/components/StarryBackground';
import { MonthlyForecastCard } from '@/components/MonthlyForecastCard';
import { CalendarView } from '@/components/CalendarView';
import { TodayTransits } from '@/components/TodayTransits';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DashboardClientProps {
  profile: {
    name: string;
    birth_date: string;
  };
  userEmail: string;
  onSignOut: () => void;
}

export function DashboardClient({ profile, userEmail, onSignOut }: DashboardClientProps) {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants that respect reduced motion preference
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 100, damping: 10 },
    },
  };

  const titleVariants = {
    scale: prefersReducedMotion ? 1 : 0.9,
    opacity: prefersReducedMotion ? 1 : 0,
  };

  const titleTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 100, delay: 0.3 };

  const hoverAnimation = prefersReducedMotion
    ? {}
    : { y: -5, scale: 1.02 };

  const hoverTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 300, damping: 20 };
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white p-4 sm:p-6 md:p-8 safe-top safe-bottom overflow-hidden">
      <StarryBackground />

      <motion.main
        id="main-content"
        tabIndex={-1}
        className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative z-10 outline-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          variants={itemVariants}
        >
          <div className="flex-1">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              initial={titleVariants}
              animate={{ scale: 1, opacity: 1 }}
              transition={titleTransition}
            >
              Welcome, {profile.name}
            </motion.h1>
            <p className="text-gray-400 mt-2 text-base sm:text-lg">
              Your cosmic forecast dashboard
            </p>
          </div>
          {/* Sign out button hidden for public demo */}
          {/* <form action={onSignOut}>
            <AnimatedButton
              variant="outline"
              className="border-purple-400 text-purple-300 touch-target w-full sm:w-auto text-base py-6 sm:py-2 hover:bg-purple-900/50 transition-all"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </span>
            </AnimatedButton>
          </form> */}
        </motion.div>

        {/* Today's Transits - Full Width */}
        <motion.div variants={itemVariants}>
          <TodayTransits />
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={itemVariants}
        >
          <motion.div
            whileHover={hoverAnimation}
            transition={hoverTransition}
          >
            <MonthlyForecastCard />
          </motion.div>

          <motion.div
            whileHover={hoverAnimation}
            transition={hoverTransition}
          >
            <CalendarView />
          </motion.div>

          <motion.div
            whileHover={hoverAnimation}
            transition={hoverTransition}
          >
            <Link href="/chart">
              <Card className="group bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-xl hover:from-purple-900/70 hover:to-pink-900/70 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] h-full cursor-pointer">
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                      <Sparkles className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <CardTitle className="text-white text-lg sm:text-xl group-hover:text-purple-200 transition-colors">
                      Natal Chart
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 group-hover:text-white text-sm sm:text-base transition-colors">
                  View your complete birth chart with planetary positions and aspects
                  <div className="mt-4 p-3 rounded-lg bg-purple-900/40 border border-purple-500/40 group-hover:bg-purple-900/60 transition-colors">
                    <p className="text-sm text-purple-300 font-medium">✨ Click to explore</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>

        {/* Profile Info */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
                <span className="text-gray-400 font-medium min-w-[100px]">Name:</span>
                <span className="text-white">{profile.name}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
                <span className="text-gray-400 font-medium min-w-[100px]">Birth Date:</span>
                <span className="text-white">
                  {new Date(profile.birth_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
                <span className="text-gray-400 font-medium min-w-[100px]">Account:</span>
                <span className="text-white break-all">{userEmail}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>
    </div>
  );
}
