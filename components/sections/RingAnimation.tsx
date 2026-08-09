'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { EngagementRing } from '../decor/Rings';
import { Sparkle } from '../decor/Sparkle';
import { Reveal } from '../motion/Reveal';

/**
 * Special engagement ring section — the ring slowly rotates with the page
 * scroll, its diamond glows, sparkles twinkle, and a short poetic line
 * sits beside it.
 */
export function RingAnimation() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rotation = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), {
    stiffness: 60,
    damping: 18,
  });

  return (
    <section
      ref={ref}
      id="ring-animation"
      className="relative overflow-hidden px-5 py-14 sm:py-28"
      aria-label="A promise written in gold"
      style={{
        background:
          'radial-gradient(90% 120% at 50% 0%, #F5E6D3 0%, #FFF9F3 45%, #F5E6D3 100%)',
      }}
    >
      {/* soft golden halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(228,201,139,0.22) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:justify-center md:gap-20">
        {/* ring visual */}
        <motion.div
          className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72"
          style={{ rotate: reduce ? 0 : rotation }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <EngagementRing size={230} className="max-w-full" />
          {/* orbiting sparkles */}
          {!reduce && (
            <>
              <Sparkle size={16} className="anim-twinkle absolute -top-1 right-4" />
              <Sparkle size={12} className="anim-twinkle absolute -bottom-2 left-8" style={{ animationDelay: '1.1s' }} />
              <Sparkle size={10} className="anim-twinkle absolute top-16 -left-2" style={{ animationDelay: '0.5s' }} />
              <Sparkle size={11} className="anim-twinkle absolute top-10 -right-3" style={{ animationDelay: '1.8s' }} />
            </>
          )}
        </motion.div>

        {/* text */}
        <Reveal direction="right" distance={50} amount={0.5} className="text-center md:text-left">
          <h2 className="font-script text-4xl leading-[1.25] text-burgundy sm:text-6xl">
            A Promise
            <br />
            Written in Gold
            <br />
            <span className="text-gold">Made to Last a Lifetime</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gold/60 md:mx-0" aria-hidden="true" />
          <p className="mt-5 max-w-sm font-serif text-lg italic text-ink-soft">
            Where words fall short, this ring speaks — a circle without end,
            a love without measure.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
