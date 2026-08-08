'use client';

import { motion } from 'framer-motion';
import { Blossom, Leaf } from './Flower';

/**
 * Decorative floral corners placed around the hero. Absolutely positioned,
 * scaled down on mobile, hidden entirely when reduced motion is preferred.
 */
export function FloralFrame() {
  return (
    <>
      {/* top-left */}
      <Corner className="left-3 top-3 sm:left-6 sm:top-6" />
      {/* top-right */}
      <Corner className="right-3 top-3 sm:right-6 sm:top-6" flip />
      {/* bottom-left */}
      <Corner className="bottom-3 left-3 sm:bottom-6 sm:left-6" rotate />
      {/* bottom-right */}
      <Corner className="bottom-3 right-3 sm:bottom-6 sm:right-6" flip rotate />
    </>
  );
}

function Corner({
  className,
  flip = false,
  rotate = false,
}: {
  className?: string;
  flip?: boolean;
  rotate?: boolean;
}) {
  const style = {
    transform: `${rotate ? 'rotate(180deg)' : ''} ${flip ? 'scaleX(-1)' : ''}`,
  };
  return (
    <motion.div
      className={`pointer-events-none absolute z-10 ${className ?? ''}`}
      style={style}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="flex items-start gap-1 sm:gap-2">
        <Blossom size={30} tone="cream" />
        <Leaf size={26} color="#A9B98A" className="mt-2 -ml-3 sm:mt-4" />
        <Leaf size={20} color="#C8A45D" flip className="ml-2 -mt-1" />
        <Blossom size={22} tone="rose" className="mt-4 -ml-2" />
      </div>
    </motion.div>
  );
}
