'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ComponentProps } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedButtonProps extends ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  // Respect user's motion preferences
  const hoverAnimation = prefersReducedMotion ? {} : { scale: 1.02, y: -2 };
  const tapAnimation = prefersReducedMotion ? {} : { scale: 0.98 };
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 400, damping: 17 };

  return (
    <motion.div
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      transition={transition}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
