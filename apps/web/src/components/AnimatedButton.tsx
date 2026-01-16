'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ComponentProps } from 'react';

interface AnimatedButtonProps extends ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
