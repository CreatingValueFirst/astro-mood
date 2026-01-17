'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Brain } from 'lucide-react';
import { AnimatedButton } from '@/components/AnimatedButton';
import { StarryBackground } from '@/components/StarryBackground';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Home() {
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

  const iconVariants = {
    hidden: { scale: prefersReducedMotion ? 1 : 0, rotate: prefersReducedMotion ? 0 : -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 200, damping: 15 },
    },
  };

  const titleVariants = {
    scale: prefersReducedMotion ? 1 : 0.5,
    opacity: prefersReducedMotion ? 1 : 0,
  };

  const titleTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 100, damping: 15, delay: 0.2 };

  const hoverAnimation = prefersReducedMotion
    ? {}
    : { y: -5, scale: 1.02 };

  const hoverTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 300, damping: 20 };
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white safe-top safe-bottom overflow-hidden">
      <StarryBackground />

      <motion.div
        className="container flex max-w-4xl flex-col items-center gap-6 px-4 py-8 text-center sm:gap-8 sm:py-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Title */}
        <motion.div className="space-y-3 sm:space-y-4" variants={itemVariants}>
          <motion.h1
            className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
            initial={titleVariants}
            animate={{ scale: 1, opacity: 1 }}
            transition={titleTransition}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              AstroMood
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-purple-200 sm:text-xl md:text-2xl"
            variants={itemVariants}
          >
            Your cosmic mood companion
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg"
          variants={itemVariants}
        >
          Discover personalized monthly mood forecasts powered by real astronomical calculations.
          Understand how planetary transits influence your energy, focus, and emotions.
        </motion.p>

        {/* Features */}
        <motion.div
          className="grid w-full max-w-3xl gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6 sm:mt-8"
          variants={itemVariants}
        >
          <motion.div
            className="group rounded-xl border border-purple-500/20 bg-purple-900/20 p-6 backdrop-blur hover:bg-purple-900/40 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            whileHover={hoverAnimation}
            transition={hoverTransition}
          >
            <motion.div variants={iconVariants}>
              <Sparkles className="w-8 h-8 mb-3 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-200 transition-colors">Real Astronomy</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              Based on actual planetary positions, not generic horoscopes
            </p>
          </motion.div>

          <motion.div
            className="group rounded-xl border border-purple-500/20 bg-purple-900/20 p-6 backdrop-blur hover:bg-purple-900/40 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            whileHover={hoverAnimation}
            transition={hoverTransition}
          >
            <motion.div variants={iconVariants}>
              <Brain className="w-8 h-8 mb-3 text-pink-400 group-hover:text-pink-300 transition-colors" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-200 transition-colors">Explainable</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              See exactly why certain days have specific mood patterns
            </p>
          </motion.div>

          <motion.div
            className="group rounded-xl border border-purple-500/20 bg-purple-900/20 p-6 backdrop-blur hover:bg-purple-900/40 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] sm:col-span-2 md:col-span-1"
            whileHover={hoverAnimation}
            transition={hoverTransition}
          >
            <motion.div variants={iconVariants}>
              <Calendar className="w-8 h-8 mb-3 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-200 transition-colors">Personalized</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              Forecasts tailored to your unique birth chart
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex w-full max-w-md flex-col gap-3 mt-6 sm:mt-8 sm:flex-row sm:gap-4"
          variants={itemVariants}
        >
          <Link href="/signup" className="flex-1">
            <AnimatedButton
              size="lg"
              className="w-full touch-target bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base sm:text-lg py-6 sm:py-3 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
            >
              Get Started
            </AnimatedButton>
          </Link>
          <Link href="/login" className="flex-1">
            <AnimatedButton
              size="lg"
              variant="outline"
              className="w-full touch-target border-purple-400 text-purple-300 hover:bg-purple-900/50 text-base sm:text-lg py-6 sm:py-3 hover:border-purple-300 transition-all"
            >
              Sign In
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="mt-12 text-sm text-gray-500 sm:mt-16"
          variants={itemVariants}
        >
          Made with ☄️ using real ephemeris data
        </motion.p>
      </motion.div>
    </div>
  );
}
