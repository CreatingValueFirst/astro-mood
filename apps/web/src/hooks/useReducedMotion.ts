'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 *
 * Returns true if user has enabled "Reduce motion" in their system settings
 * Components should respect this by disabling or simplifying animations
 *
 * Vercel best practice: Accessibility - respect user preferences
 * WCAG 2.1 Success Criterion 2.3.3 (AAA)
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes (user might toggle setting while app is open)
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    // Legacy browsers (Safari < 14)
    else {
      // @ts-ignore - legacy API
      mediaQuery.addListener(handler);
      // @ts-ignore - legacy API
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation duration based on user's motion preference
 *
 * Returns 0 if user prefers reduced motion, otherwise returns the provided duration
 *
 * @param duration - Desired animation duration in seconds
 * @returns 0 if reduced motion preferred, otherwise the provided duration
 *
 * @example
 * const duration = getAnimationDuration(0.5); // Returns 0 if reduced motion, 0.5 otherwise
 * const variants = {
 *   hidden: { opacity: 0, y: 20 },
 *   visible: { opacity: 1, y: 0, transition: { duration } }
 * };
 */
export function getAnimationDuration(duration: number): number {
  if (typeof window === 'undefined') {
    return duration;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion ? 0 : duration;
}

/**
 * Get animation variants that respect reduced motion preference
 *
 * Returns variants with no animation if user prefers reduced motion
 *
 * @param normalVariants - Animation variants for users who don't prefer reduced motion
 * @param reducedVariants - Optional simplified variants for reduced motion (defaults to no animation)
 * @returns Appropriate variants based on user preference
 *
 * @example
 * const variants = getResponsiveVariants({
 *   hidden: { opacity: 0, y: 20 },
 *   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
 * });
 */
export function getResponsiveVariants<T extends Record<string, any>>(
  normalVariants: T,
  reducedVariants?: Partial<T>
): T {
  if (typeof window === 'undefined') {
    return normalVariants;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    return normalVariants;
  }

  // If custom reduced variants provided, use them
  if (reducedVariants) {
    return { ...normalVariants, ...reducedVariants } as T;
  }

  // Otherwise, remove all animations
  const staticVariants: any = {};
  for (const key in normalVariants) {
    const variant = normalVariants[key];
    if (typeof variant === 'object' && variant !== null) {
      // Keep final state but remove animations
      staticVariants[key] = {
        ...variant,
        transition: { duration: 0 },
      };
    } else {
      staticVariants[key] = variant;
    }
  }

  return staticVariants as T;
}
