'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EVENT_DATETIME } from '@/lib/invitationConfig';
import { Reveal } from '../motion/Reveal';
import { HeartOrnament } from '../decor/Flower';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function compute(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

/**
 * Live countdown to the engagement — soft glass circles, no dashboard boxes.
 */
export function CountdownTimer() {
  const [left, setLeft] = useState<TimeLeft>(() => compute(EVENT_DATETIME));

  useEffect(() => {
    const id = setInterval(() => setLeft(compute(EVENT_DATETIME)), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Minutes' },
    { key: 'seconds', label: 'Seconds' },
  ];

  return (
    <section className="relative overflow-hidden px-5 py-20 sm:py-24" aria-label="Countdown to the engagement">
      <Reveal direction="up" className="text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-gold-dark sm:text-xs">
          Counting every moment
        </p>
        <h2 className="mt-3 font-script text-5xl text-burgundy sm:text-6xl">
          Until We Say Yes
        </h2>
        <div className="mt-5 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-16 bg-gold/50" />
          <HeartOrnament size={14} color="#C9878E" className="anim-heartbeat" />
          <span className="h-px w-16 bg-gold/50" />
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <div
          className="mx-auto grid max-w-3xl grid-cols-4 gap-3 sm:gap-8"
          role="timer"
          aria-live="polite"
          aria-label={`${left.days} days, ${left.hours} hours, ${left.minutes} minutes and ${left.seconds} seconds until the engagement`}
        >
          {units.map(({ key, label }) => {
            const value = left[key];
            return (
              <div
                key={key}
                className="glass-card flex flex-col items-center rounded-full border-gold/30 px-1 py-6 sm:py-9"
                style={{ aspectRatio: '1 / 1' }}
              >
                <motion.span
                  key={value}
                  className="font-serif text-3xl font-semibold text-burgundy sm:text-5xl md:text-6xl"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {String(value).padStart(2, '0')}
                </motion.span>
                <span className="mt-2 font-sans text-[9px] uppercase tracking-[0.28em] text-ink-soft sm:text-xs">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
