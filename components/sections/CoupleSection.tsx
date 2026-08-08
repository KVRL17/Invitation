'use client';

import { useReducedMotion } from 'framer-motion';
import { invitationConfig } from '@/lib/invitationConfig';
import { BridePortrait, GroomPortrait } from '../decor/CouplePortrait';
import { Blossom, Leaf } from '../decor/Flower';
import { Reveal } from '../motion/Reveal';

/**
 * Meet the Couple — two premium cartoon portraits of Brinda & Chaitanya in
 * gold-rimmed oval frames, floating gently with twinkling sparkles. The
 * portraits are hand-drawn SVGs so they always look on-theme and load
 * instantly.
 */
export function CoupleSection() {
  const reduce = useReducedMotion();
  const { brideName, groomName } = invitationConfig;

  return (
    <section
      id="meet-the-couple"
      className="relative overflow-hidden px-5 py-14 sm:py-32"
      aria-label="Meet the couple"
    >
      {/* soft backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 0%, #FFF9F3 0%, #F5E6D3 60%, #F2DDC6 100%)',
        }}
      />
      {/* decorative florals */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Blossom size={96} tone="rose" opacity={0.16} className="absolute -left-8 top-20" />
        <Blossom size={80} tone="cream" opacity={0.5} className="absolute -right-8 bottom-16" />
        <Leaf size={34} color="#A9B98A" className="absolute right-[10%] top-20 opacity-60" />
        <Leaf size={28} color="#A9B98A" className="absolute left-[12%] bottom-24 opacity-60" />
      </div>

      <Reveal direction="up" className="relative z-10 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-gold-dark sm:text-xs">
          With hearts full of joy
        </p>
        <h2 className="mt-2 font-script text-4xl text-burgundy sm:mt-3 sm:text-6xl md:text-7xl">
          Meet the Couple
        </h2>
      </Reveal>

      <div className="relative z-10 mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-10 sm:mt-14 sm:gap-10 md:grid-cols-2 md:gap-8">
        {/* -------- bride -------- */}
        <Reveal direction="left" distance={56} amount={0.35}>
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {/* gold oval frame */}
              <div
                className="relative overflow-hidden rounded-t-full rounded-b-[46%] border border-gold/50 bg-gradient-to-b from-ivory to-champagne/70 p-2 shadow-card"
                style={{ width: 262, height: 330 }}
              >
                <div className="h-full w-full overflow-hidden rounded-t-full rounded-b-[44%] border border-gold/30 bg-ivory">
                  <div className={reduce ? undefined : 'anim-float-soft'}>
                    <BridePortrait size={246} className="mx-auto" />
                  </div>
                </div>
                {/* shimmering gold ring inside */}
                <div className="pointer-events-none absolute inset-0 rounded-t-full rounded-b-[46%] ring-1 ring-gold/40" aria-hidden="true" />
              </div>

              {/* floating sparkles */}
              {!reduce && (
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <span className="anim-twinkle absolute -left-3 top-8 h-2 w-2 rounded-full bg-gold-light" />
                  <span className="anim-twinkle absolute -right-4 top-24 h-2.5 w-2.5 rounded-full bg-gold-light" style={{ animationDelay: '0.8s' }} />
                  <span className="anim-twinkle absolute -left-5 bottom-16 h-2 w-2 rounded-full bg-rose" style={{ animationDelay: '1.4s' }} />
                </div>
              )}
            </div>

            <h3 className="mt-5 font-script text-4xl text-burgundy sm:mt-6 sm:text-5xl">{brideName}</h3>
            <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.32em] text-gold-dark sm:text-xs">
              The Bride
            </p>
          </div>
        </Reveal>

        {/* -------- groom -------- */}
        <Reveal direction="right" distance={56} amount={0.35}>
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-t-full rounded-b-[46%] border border-gold/50 bg-gradient-to-b from-ivory to-champagne/70 p-2 shadow-card"
                style={{ width: 262, height: 330 }}
              >
                <div className="h-full w-full overflow-hidden rounded-t-full rounded-b-[44%] border border-gold/30 bg-ivory">
                  <div className={reduce ? undefined : 'anim-float-soft'} style={{ animationDelay: '0.7s' }}>
                    <GroomPortrait size={246} className="mx-auto" />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-t-full rounded-b-[46%] ring-1 ring-gold/40" aria-hidden="true" />
              </div>

              {!reduce && (
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <span className="anim-twinkle absolute -right-3 top-8 h-2 w-2 rounded-full bg-gold-light" />
                  <span className="anim-twinkle absolute -left-4 top-24 h-2.5 w-2.5 rounded-full bg-gold-light" style={{ animationDelay: '1.1s' }} />
                  <span className="anim-twinkle absolute -right-5 bottom-16 h-2 w-2 rounded-full bg-rose" style={{ animationDelay: '0.5s' }} />
                </div>
              )}
            </div>

            <h3 className="mt-5 font-script text-4xl text-burgundy sm:mt-6 sm:text-5xl">{groomName}</h3>
            <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.32em] text-gold-dark sm:text-xs">
              The Groom
            </p>
          </div>
        </Reveal>
      </div>

      {/* heart divider */}
      <Reveal delay={0.2} className="relative z-10 mt-10 sm:mt-14">
        <div className="flex items-center justify-center gap-4" aria-hidden="true">
          <span className="h-px w-16 bg-gold/50 sm:w-24" />
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className={reduce ? undefined : 'anim-heartbeat'}
          >
            <path
              d="M12 21 C12 21 2 14.5 2 8.5 C2 4.5 5 3 7.5 3 C10 3 12 5.5 12 5.5 C12 5.5 14 3 16.5 3 C19 3 22 4.5 22 8.5 C22 14.5 12 21 12 21 Z"
              fill="#C9878E"
            />
          </svg>
          <span className="h-px w-16 bg-gold/50 sm:w-24" />
        </div>
      </Reveal>

      <Reveal delay={0.3} className="relative z-10 mt-6 text-center sm:mt-8">
        <p className="mx-auto max-w-md font-serif text-lg italic leading-relaxed text-ink-soft sm:text-xl">
          Two souls, one heart — our love story begins here, and we would be
          honoured to have you be part of it.
        </p>
      </Reveal>
    </section>
  );
}
