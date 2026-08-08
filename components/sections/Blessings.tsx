'use client';

import { Reveal } from '../motion/Reveal';
import { Blossom, Leaf } from '../decor/Flower';
import { useReducedMotion } from 'framer-motion';

/**
 * Blessings — "Your Blessings Mean Everything To Us" with a softly glowing
 * diya (traditional lamp) as the centerpiece, framed by gentle florals.
 */
export function Blessings() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden px-5 py-24 sm:py-32"
      aria-label="Blessings"
      style={{
        background:
          'radial-gradient(120% 100% at 50% 30%, #5A2430 0%, #4A1C26 55%, #3A141D 100%)',
      }}
    >
      {/* floating floral accents */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Blossom size={70} tone="cream" opacity={0.14} className="absolute -right-8 top-14" />
        <Blossom size={54} tone="cream" opacity={0.1} className="absolute -left-6 bottom-20" />
        <Leaf size={30} color="#A9B98A" className="absolute left-[12%] top-24 opacity-40" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(40% 40% at 50% 45%, rgba(228,201,139,0.12) 0%, transparent 70%)' }} />
      </div>

      <Reveal className="relative z-10 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-[#E9D3A0]/80 sm:text-xs">
          With gratitude
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-script text-4xl leading-[1.2] text-[#F5E6D3] sm:text-6xl">
          Your Blessings Mean
          <br />
          Everything To Us
        </h2>

        {/* diya */}
        <div className="mx-auto mt-12 flex max-w-xs items-center justify-center">
          <svg viewBox="0 0 200 130" className="w-full max-w-[220px]" role="img" aria-label="A softly glowing traditional lamp">
            <defs>
              <radialGradient id="diya-halo" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="rgba(255,214,140,0.5)" />
                <stop offset="55%" stopColor="rgba(255,196,110,0.16)" />
                <stop offset="100%" stopColor="rgba(255,196,110,0)" />
              </radialGradient>
            </defs>

            {/* halo */}
            <circle cx="100" cy="58" r="70" fill="url(#diya-halo)" className="anim-glow-pulse" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />

            {/* rays */}
            {!reduce &&
              [0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                <g key={i} transform={`rotate(${a} 100 58)`} className="anim-twinkle" style={{ animationDelay: `${i * 0.4}s`, transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <path d="M100 6 v10 M100 100 v10 M6 58 h10 M184 58 h10" stroke="#E4C98B" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
                </g>
              ))}

            {/* flame */}
            <g className={reduce ? undefined : 'anim-glow-pulse'} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <path d="M100 22 C94 34 90 42 90 50 C90 58 94 62 100 62 C106 62 110 58 110 50 C110 42 106 34 100 22 Z" fill="#FFC24E" />
              <path d="M100 32 C97 39 95 45 95 50 C95 54 97 57 100 57 C103 57 105 54 105 50 C105 45 103 39 100 32 Z" fill="#FFE9B8" />
              <path d="M100 42 C99 46 98 49 98 51 C98 53 99 54 100 54 C101 54 102 53 102 51 C102 49 101 46 100 42 Z" fill="#FFFFFF" />
            </g>

            {/* diya bowl */}
            <path d="M20 96 C45 88 155 88 180 96 C172 112 150 118 128 118 L72 118 C50 118 28 112 20 96 Z" fill="#702F3B" />
            <path d="M20 96 C45 88 155 88 180 96 C172 112 150 118 128 118 L72 118 C50 118 28 112 20 96 Z" fill="url(#diya-halo)" opacity="0.25" />
            <ellipse cx="100" cy="96" rx="80" ry="10" fill="#F5E6D3" opacity="0.9" />
            <ellipse cx="100" cy="96" rx="80" ry="10" fill="#E4C98B" opacity="0.4" />
            <ellipse cx="100" cy="97" rx="66" ry="7" fill="#702F3B" opacity="0.85" />
          </svg>
        </div>

        <p className="mx-auto mt-10 max-w-md font-serif text-lg italic leading-relaxed text-[#E9D3A0]/85">
          Every blessing and every wish you share
          <br />
          becomes a light on our journey together.
        </p>
      </Reveal>
    </section>
  );
}
