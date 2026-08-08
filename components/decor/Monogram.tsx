'use client';

import { motion } from 'framer-motion';
import { invitationConfig } from '@/lib/invitationConfig';

/**
 * The beating-heart initials separator ( A  ♥  V ).
 * Animated heart + small golden side flourishes.
 */
export function Monogram({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const { brideInitial, groomInitial } = invitationConfig;
  const accent = dark ? '#E4C98B' : '#C8A45D';
  const text = dark ? '#F5E6D3' : '#3A2A2A';

  return (
    <div className={`flex items-center justify-center gap-5 sm:gap-8 ${className ?? ''}`} aria-label={`${brideInitial} and ${groomInitial}`}>
      {/* left flourish */}
      <svg width="64" height="12" viewBox="0 0 64 12" aria-hidden="true">
        <path d="M4 6 C20 6 40 2 60 4" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      </svg>

      <span className="font-script text-4xl sm:text-5xl md:text-6xl" style={{ color: text }}>
        {brideInitial}
      </span>

      <motion.span
        className="anim-heartbeat inline-block"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        aria-hidden="true"
      >
        <svg width="26" height="26" viewBox="0 0 24 24">
          <path
            d="M12 21 C12 21 2 14.5 2 8.5 C2 4.5 5 3 7.5 3 C10 3 12 5.5 12 5.5 C12 5.5 14 3 16.5 3 C19 3 22 4.5 22 8.5 C22 14.5 12 21 12 21 Z"
            fill={dark ? '#E4C98B' : '#C9878E'}
          />
        </svg>
      </motion.span>

      <span className="font-script text-4xl sm:text-5xl md:text-6xl" style={{ color: text }}>
        {groomInitial}
      </span>

      {/* right flourish */}
      <svg width="64" height="12" viewBox="0 0 64 12" aria-hidden="true">
        <path d="M60 6 C44 6 24 2 4 4" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}
