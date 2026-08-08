'use client';

import { useReducedMotion } from 'framer-motion';
import { invitationConfig, EVENT_DATETIME, EVENT_WEEKDAY } from '@/lib/invitationConfig';
import { FloralFrame } from '../decor/FloralFrame';
import { Sparkle } from '../decor/Sparkle';
import { Reveal, Stagger } from '../motion/Reveal';
import { EASE } from '@/lib/ease';

/**
 * Hero — full-screen elegant engagement banner:
 *  "With the blessings of our families" → A & V script names → invite line
 *  → date / time → "Save the Date".
 */
export function HeroSection() {
  const reduce = useReducedMotion();
  const { brideName, groomName } = invitationConfig;
  const date = new Date(EVENT_DATETIME);

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-14 text-center sm:py-20"
      aria-label="Engagement announcement"
    >
      {/* soft ivory backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 20%, #FFFFFF 0%, #FFF9F3 40%, #F5E6D3 100%)',
        }}
      />
      {/* gentle rising shimmer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 8%, rgba(228,201,139,0.18) 0%, transparent 70%)',
        }}
      />

      <FloralFrame />

      {/* scattered sparkles */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[
            { l: '12%', t: '22%', s: 12 },
            { l: '86%', t: '30%', s: 9 },
            { l: '78%', t: '68%', s: 10 },
            { l: '18%', t: '74%', s: 8 },
            { l: '50%', t: '12%', s: 7 },
          ].map((sp, i) => (
            <Sparkle
              key={i}
              size={sp.s}
              className="anim-twinkle absolute"
              style={{ left: sp.l, top: sp.t, animationDelay: `${i * 0.7}s` }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <Reveal direction="up" distance={26} delay={0.1}>
          <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-burgundy/70 sm:text-xs">
            With the blessings of our families
          </p>
        </Reveal>

        <Stagger className="mt-6 sm:mt-8" step={0.22} delay={0.15}>
          <h1 className="font-script text-6xl leading-[1.05] text-burgundy sm:text-7xl md:text-8xl">
            <span className="block">{brideName}</span>
          </h1>
          <h1 className="font-script text-6xl leading-[1.05] text-burgundy sm:text-7xl md:text-8xl">
            <span className="block">&amp;</span>
            <span className="block">{groomName}</span>
          </h1>
        </Stagger>

        <Reveal direction="up" delay={0.6} className="mt-6 sm:mt-7">
          <p className="font-serif text-lg italic text-ink-soft sm:text-2xl">
            Joyfully invite you to celebrate their engagement
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.85} className="mt-8 sm:mt-10">
          <div className="glass-card rounded-[2rem] px-6 py-6 sm:px-12 sm:py-9">
            <p className="font-sans text-xs uppercase tracking-[0.34em] text-gold-dark">
              {EVENT_WEEKDAY}
            </p>
            <p className="mt-1.5 font-serif text-2xl font-semibold text-burgundy sm:mt-2 sm:text-4xl">
              {date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="mt-1.5 font-sans text-sm tracking-[0.22em] text-ink-soft sm:mt-2 sm:text-base">
              {invitationConfig.eventTimeLabel}
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={1.05} className="mt-8 sm:mt-10">
          <a
            href="#save-the-date"
            className="gold-ring-btn rounded-full px-9 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-burgundy"
          >
            Save the Date
          </a>
        </Reveal>
      </div>
    </section>
  );
}
