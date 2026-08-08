'use client';

import { motion } from 'framer-motion';
import { invitationConfig, EVENT_DATETIME, EVENT_WEEKDAY } from '@/lib/invitationConfig';
import { Reveal } from '../motion/Reveal';
import { Blossom, Leaf } from '../decor/Flower';
import { EASE } from '@/lib/ease';

/**
 * Save The Date — a decorative calendar-style announcement.
 * The day number animates digit-by-digit when it scrolls into view.
 */
export function SaveTheDate() {
  const date = new Date(EVENT_DATETIME);
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const day = date.getDate();
  const dayStr = String(day);

  return (
    <section id="save-the-date" className="relative overflow-hidden px-5 py-14 sm:py-32" aria-label="Save the date">
      {/* backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 0%, #FFF9F3 0%, #F5E6D3 60%, #F2DDC6 100%)',
        }}
      />
      {/* floral corners */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Blossom size={110} tone="rose" opacity={0.16} className="absolute -right-10 -top-10" />
        <Blossom size={90} tone="cream" opacity={0.5} className="absolute -left-8 bottom-16" />
        <Leaf size={34} color="#A9B98A" className="absolute left-[12%] top-16 opacity-70" />
      </div>

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <Reveal direction="up">
          <p className="font-sans text-[11px] uppercase tracking-[0.5em] text-gold-dark sm:text-sm">
            Save
          </p>
          <h2 className="mt-1 font-script text-5xl text-burgundy sm:mt-3 sm:text-7xl">The Date</h2>
        </Reveal>

        {/* calendar card */}
        <Reveal direction="up" delay={0.2} className="mt-8 sm:mt-12">
          <div className="relative mx-auto max-w-sm rounded-[2rem] border border-gold/35 bg-white/70 p-2 shadow-card backdrop-blur">
            <div className="rounded-[1.6rem] border border-gold/20 bg-gradient-to-b from-ivory to-champagne/70 px-5 py-8 sm:px-6 sm:py-10">
              {/* month header */}
              <p className="font-sans text-sm uppercase tracking-[0.42em] text-gold-dark">
                {month} · {year}
              </p>

              {/* big day number, digit by digit */}
              <div className="mt-3 flex items-start justify-center gap-3 sm:mt-4" aria-label={`Day ${day}`}>
                {dayStr.split('').map((d, i) => (
                  <motion.span
                    key={i}
                    className="font-serif text-7xl font-semibold leading-none text-burgundy sm:text-9xl"
                    initial={{ opacity: 0, y: 40, rotateX: 40 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.18, ease: EASE }}
                  >
                    {d}
                  </motion.span>
                ))}
              </div>

              {/* weekday ribbon */}
              <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-ivory/80 px-6 py-2 sm:mt-6">
                <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden="true" />
                <span className="font-sans text-xs uppercase tracking-[0.34em] text-burgundy sm:text-sm">
                  {EVENT_WEEKDAY}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden="true" />
              </div>

              {/* time */}
              <p className="mt-4 font-serif text-lg italic text-ink-soft sm:mt-5">
                {invitationConfig.eventTimeLabel}
              </p>

              {/* small flourish */}
              <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6" aria-hidden="true">
                <span className="h-px w-14 bg-gold/50" />
                <Blossom size={26} tone="rose" />
                <span className="h-px w-14 bg-gold/50" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
