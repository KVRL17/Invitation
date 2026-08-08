'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { BridePortrait, GroomPortrait } from './CouplePortrait';

function useGradId(prefix: string): string {
  const id = React.useId().replace(/:/g, '');
  return `${prefix}-${id}`;
}

/**
 * CoupleTogether — a premium cartoon scene of Brinda & Chaitanya standing
 * together beneath a floral arch. Reuses the refined portrait artwork from
 * CouplePortrait, layered over a soft glow, twinkling fairy lights and a
 * gently beating heart floating between them. Pure SVG, no external images.
 */
export function CoupleTogether({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const arch = useGradId('ct-arch');
  const glow = useGradId('ct-glow');

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-to-b from-champagne/50 to-ivory ${className ?? ''}`}
      role="img"
      aria-label="Cartoon illustration of Brinda and Chaitanya together beneath a floral arch"
    >
      <div className="relative mx-auto aspect-[80/52] w-full">
        {/* backdrop: glow, floral arch, fairy lights, ground */}
        <svg
          viewBox="0 0 800 520"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={glow} cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="rgba(228,201,139,0.55)" />
              <stop offset="60%" stopColor="rgba(200,164,93,0.18)" />
              <stop offset="100%" stopColor="rgba(200,164,93,0)" />
            </radialGradient>
            <linearGradient id={arch} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C8A45D" />
              <stop offset="50%" stopColor="#E4C98B" />
              <stop offset="100%" stopColor="#C8A45D" />
            </linearGradient>
          </defs>

          {/* warm glow behind the couple */}
          <ellipse cx="400" cy="300" rx="290" ry="260" fill={`url(#${glow})`} />

          {/* floral arch */}
          <g stroke={`url(#${arch})`} strokeWidth="7" fill="none" strokeLinecap="round">
            <path d="M110 500 C110 290 145 200 210 155" />
            <path d="M690 500 C690 290 655 200 590 155" />
            <path d="M210 155 C290 88 510 88 590 155" />
          </g>

          {/* blossoms on the arch */}
          <g fill="#F7D9DD" stroke="#C9878E" strokeWidth="1">
            <circle cx="175" cy="235" r="13" />
            <circle cx="625" cy="235" r="13" />
            <circle cx="285" cy="135" r="13" />
            <circle cx="515" cy="135" r="13" />
            <circle cx="400" cy="105" r="13" />
          </g>

          {/* fairy lights */}
          <g fill="none" stroke="rgba(228,201,139,0.55)" strokeWidth="1.2">
            <path d="M128 470 C200 380 300 330 400 330 C500 330 600 380 672 470" />
          </g>
          {[
            { x: 170, y: 436, d: 0 },
            { x: 235, y: 385, d: 0.8 },
            { x: 315, y: 345, d: 1.5 },
            { x: 400, y: 330, d: 0.4 },
            { x: 485, y: 345, d: 1.2 },
            { x: 565, y: 385, d: 0.6 },
            { x: 630, y: 436, d: 1.8 },
          ].map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i % 2 ? 3.2 : 4.5}
              fill="#F3E3C0"
              className="anim-twinkle"
              style={{ animationDelay: `${p.d}s`, transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}

          {/* ground */}
          <ellipse cx="400" cy="494" rx="340" ry="34" fill="rgba(169,185,138,0.35)" />
          <ellipse cx="400" cy="490" rx="280" ry="22" fill="rgba(169,185,138,0.45)" />
        </svg>

        {/* bride — Brinda */}
        <div className="absolute bottom-[2%] left-[19%] w-[27%]">
          <BridePortrait
            size={200}
            className="h-auto w-full drop-shadow-[0_18px_24px_rgba(112,47,59,0.18)]"
          />
        </div>

        {/* groom — Chaitanya */}
        <div className="absolute bottom-[2%] right-[19%] w-[27%]">
          <GroomPortrait
            size={200}
            className="h-auto w-full drop-shadow-[0_18px_24px_rgba(112,47,59,0.18)]"
          />
        </div>

        {/* glowing heart between them */}
        <div className="absolute left-1/2 top-[26%] -translate-x-1/2">
          <svg
            width="54"
            height="48"
            viewBox="0 0 24 24"
            className={reduce ? undefined : 'anim-heartbeat'}
            style={{ filter: 'drop-shadow(0 0 10px rgba(201,135,142,0.6))' }}
            aria-hidden="true"
          >
            <path
              d="M12 21 C12 21 2 14.5 2 8.5 C2 4.5 5 3 7.5 3 C10 3 12 5.5 12 5.5 C12 5.5 14 3 16.5 3 C19 3 22 4.5 22 8.5 C22 14.5 12 21 12 21 Z"
              fill="#C9878E"
            />
          </svg>
        </div>

        {/* twinkling sparkles */}
        {!reduce && (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <span className="anim-twinkle absolute left-[8%] top-[22%] h-2 w-2 rounded-full bg-gold-light" />
            <span className="anim-twinkle absolute right-[10%] top-[28%] h-2.5 w-2.5 rounded-full bg-gold-light" style={{ animationDelay: '0.8s' }} />
            <span className="anim-twinkle absolute left-[38%] top-[12%] h-2 w-2 rounded-full bg-rose" style={{ animationDelay: '1.4s' }} />
            <span className="anim-twinkle absolute right-[36%] top-[16%] h-1.5 w-1.5 rounded-full bg-gold-light" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
      </div>
    </div>
  );
}
