'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { invitationConfig } from '@/lib/invitationConfig';
import { InterlockedRings } from '../decor/Rings';
import { Reveal } from '../motion/Reveal';
import { Blossom, Leaf } from '../decor/Flower';
import { FloatingPetals } from '../FloatingPetals';

/**
 * Closing — an emotional finale: soft floral gradient, floating petals,
 * the couple's names, animated interlocked rings and "See You There!".
 */
export function ClosingSection() {
  const reduce = useReducedMotion();
  const { brideName, groomName } = invitationConfig;

  return (
    <section
      className="relative overflow-hidden px-5 py-16 sm:py-36"
      aria-label="Closing"
      style={{
        background:
          'radial-gradient(120% 110% at 50% 0%, #FFF9F3 0%, #F7D9DD 55%, #F5E6D3 100%)',
      }}
    >
      <FloatingPetals count={14} opacity={0.45} />

      {/* floral frame accents */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Blossom size={90} tone="rose" opacity={0.2} className="absolute -left-8 bottom-16" />
        <Blossom size={70} tone="cream" opacity={0.5} className="absolute -right-8 top-12" />
        <Leaf size={34} color="#A9B98A" className="absolute right-[10%] bottom-24 opacity-60" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <Reveal direction="up">
          <h2 className="font-script text-4xl leading-[1.15] text-burgundy sm:text-6xl md:text-7xl">
            We Can&apos;t Wait
            <br />
            To Celebrate With You
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.25} className="mt-6 sm:mt-8">
          <p className="font-script text-3xl text-burgundy sm:text-5xl">
            {brideName}
            <span className="mx-3 align-middle text-2xl text-rose sm:text-3xl" aria-hidden="true">
              <motion.svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                animate={reduce ? undefined : { scale: [1, 1.16, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M12 21 C12 21 2 14.5 2 8.5 C2 4.5 5 3 7.5 3 C10 3 12 5.5 12 5.5 C12 5.5 14 3 16.5 3 C19 3 22 4.5 22 8.5 C22 14.5 12 21 12 21 Z"
                  fill="#C9878E"
                />
              </motion.svg>
            </span>
            {groomName}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4} className="mt-5 sm:mt-6">
          <p className="font-serif text-lg italic text-ink-soft sm:text-xl">
            With Love,
            <br />
            Our Families
          </p>
        </Reveal>

        {/* interlocked rings */}
        <Reveal direction="up" delay={0.5} className="mt-8 flex justify-center sm:mt-12">
          <div className={reduce ? undefined : 'anim-float-slow'}>
            <InterlockedRings size={200} />
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.65} className="mt-8 sm:mt-10">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-gold-dark sm:text-sm">
            See You There!
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 sm:mt-5" aria-hidden="true">
            <span className="h-px w-16 bg-gold/50" />
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              animate={reduce ? undefined : { scale: [1, 1.3, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M12 21 C12 21 2 14.5 2 8.5 C2 4.5 5 3 7.5 3 C10 3 12 5.5 12 5.5 C12 5.5 14 3 16.5 3 C19 3 22 4.5 22 8.5 C22 14.5 12 21 12 21 Z"
                fill="#C9878E"
              />
            </motion.svg>
            <span className="h-px w-16 bg-gold/50" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
