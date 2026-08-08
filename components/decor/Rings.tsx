'use client';

import React from 'react';

/** Unique gradient id helper so multiple instances never collide. */
function useGradId(prefix: string): string {
  const id = React.useId().replace(/:/g, '');
  return `${prefix}-${id}`;
}

const bandGradient = (id: string) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F0DC9F" />
      <stop offset="45%" stopColor="#C8A45D" />
      <stop offset="100%" stopColor="#9A7433" />
    </linearGradient>
  </defs>
);

const diamondGradient = (id: string) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="55%" stopColor="#EAF3FF" />
      <stop offset="100%" stopColor="#B9D0EA" />
    </linearGradient>
  </defs>
);

/**
 * A single engagement ring with a glowing diamond — used inside the intro,
 * the ring section and the closing animation.
 */
export function EngagementRing({
  size = 120,
  className,
  glow = true,
}: {
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  const band = useGradId('ring-band');
  const gem = useGradId('ring-gem');
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 120 140"
      className={className}
      role="img"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      {bandGradient(band)}
      {diamondGradient(gem)}

      {/* subtle glow behind diamond */}
      {glow && (
        <circle cx="60" cy="30" r="26" fill="#FFF6DC" opacity="0.35" className="anim-diamond-glow" />
      )}

      {/* band */}
      <circle cx="60" cy="100" r="42" fill="none" stroke={`url(#${band})`} strokeWidth="9" />

      {/* prongs */}
      <path
        d="M47 22 L45 30 L60 33 L75 30 L73 22"
        fill="none"
        stroke={`url(#${band})`}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* diamond crown */}
      <polygon points="60,8 46,26 60,32 74,26" fill={`url(#${gem})`} stroke="#D9E6F6" strokeWidth="0.6" />
      {/* pavilion */}
      <polygon points="46,26 60,52 74,26" fill={`url(#${gem})`} opacity="0.92" stroke="#D9E6F6" strokeWidth="0.6" />
      {/* facet lines */}
      <path d="M60 8 L60 32 M60 32 L60 52 M46 26 L60 32 M74 26 L60 32" stroke="#C9DAEF" strokeWidth="0.5" fill="none" opacity="0.9" />
      {/* sparkle cross on table */}
      <path
        d="M60 14 L60 22 M56 18 L64 18"
        stroke="#FFFFFF"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.95"
      />
    </svg>
  );
}

/**
 * Two rings tilted toward each other — the interlocked pose used in the
 * intro sequence and closing section.
 */
export function InterlockedRings({
  size = 220,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const bandA = useGradId('il-band-a');
  const bandB = useGradId('il-band-b');
  const gem = useGradId('il-gem');
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 240 175"
      className={className}
      role="img"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={bandA} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0DC9F" />
          <stop offset="50%" stopColor="#C8A45D" />
          <stop offset="100%" stopColor="#9A7433" />
        </linearGradient>
        <linearGradient id={bandB} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0DC9F" />
          <stop offset="50%" stopColor="#C8A45D" />
          <stop offset="100%" stopColor="#9A7433" />
        </linearGradient>
        <linearGradient id={gem} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#C3D7EF" />
        </linearGradient>
      </defs>

      {/* soft golden glow behind the interlock */}
      <circle cx="120" cy="95" r="78" fill="#FFF4D6" opacity="0.4" />

      {/* ring A — behind */}
      <g transform="rotate(-16 92 100)">
        <circle cx="92" cy="108" r="44" fill="none" stroke={`url(#${bandA})`} strokeWidth="9" />
        <polygon points="92,16 78,36 92,42 106,36" fill={`url(#${gem})`} stroke="#D9E6F6" strokeWidth="0.5" />
        <polygon points="78,36 92,64 106,36" fill={`url(#${gem})`} opacity="0.9" />
      </g>

      {/* ring B — in front, interlocking */}
      <g transform="rotate(16 148 100)">
        <circle cx="148" cy="108" r="44" fill="none" stroke={`url(#${bandB})`} strokeWidth="9" />
        <polygon points="148,16 134,36 148,42 162,36" fill={`url(#${gem})`} stroke="#D9E6F6" strokeWidth="0.5" />
        <polygon points="134,36 148,64 162,36" fill={`url(#${gem})`} opacity="0.9" />
      </g>
    </svg>
  );
}
