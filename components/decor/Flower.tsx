'use client';

import React from 'react';

function useGradId(prefix: string): string {
  const id = React.useId().replace(/:/g, '');
  return `${prefix}-${id}`;
}

/**
 * A soft five-petal blossom. `tone` picks the palette:
 *  - rose  (pink, used on ivory)
 *  - cream (champagne/gold, used on deep backgrounds)
 */
export function Blossom({
  size = 40,
  tone = 'rose',
  className,
  opacity,
}: {
  size?: number;
  tone?: 'rose' | 'cream';
  className?: string;
  opacity?: number;
}) {
  const grad = useGradId('blossom');
  const core = useGradId('blossom-core');
  const petalColor = tone === 'rose' ? '#F7D9DD' : '#F5E6D3';
  const coreColor = tone === 'rose' ? '#C9878E' : '#C8A45D';
  const angles = [0, 72, 144, 216, 288];
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} opacity={opacity} aria-hidden="true">
      <defs>
        <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={petalColor} />
        </linearGradient>
        <radialGradient id={core} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E6D3" />
          <stop offset="100%" stopColor={coreColor} />
        </radialGradient>
      </defs>
      {angles.map((a) => (
        <ellipse
          key={a}
          cx="32"
          cy="13.5"
          rx="8.5"
          ry="14"
          fill={`url(#${grad})`}
          stroke={tone === 'rose' ? 'rgba(201,135,142,0.25)' : 'rgba(200,164,93,0.25)'}
          strokeWidth="0.6"
          transform={`rotate(${a} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="7" fill={`url(#${core})`} />
    </svg>
  );
}

/** A simple elegant leaf. */
export function Leaf({
  size = 24,
  className,
  flip = false,
  color = '#A9B98A',
}: {
  size?: number;
  className?: string;
  flip?: boolean;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M12 2 C20 6 21 14 12 22 C3 14 4 6 12 2 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M12 4 C13 9 13 15 12 21"
        stroke="#8A9A6E"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * A horizontal golden branch with leaves — used as a divider ornament.
 */
export function GoldBranch({ className, width = 220 }: { className?: string; width?: number }) {
  return (
    <svg
      width={width}
      height={width * 0.3}
      viewBox="0 0 220 66"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 44 C60 30 160 30 210 44"
        stroke="url(#gb-line)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gb-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(200,164,93,0)" />
          <stop offset="50%" stopColor="#C8A45D" />
          <stop offset="100%" stopColor="rgba(200,164,93,0)" />
        </linearGradient>
        <linearGradient id="gb-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D3C08A" />
          <stop offset="100%" stopColor="#B3945A" />
        </linearGradient>
      </defs>
      {[
        { x: 70, y: 36, r: 16, ro: -40 },
        { x: 112, y: 32, r: 18, ro: 30 },
        { x: 152, y: 37, r: 14, ro: -20 },
        { x: 40, y: 40, r: 12, ro: 50 },
      ].map((l, i) => (
        <path
          key={i}
          d={`M${l.x} ${l.y} c${-l.r * 0.4} ${-l.r * 0.9} ${l.r * 0.4} ${-l.r * 0.9} 0 0`}
          transform={`rotate(${l.ro} ${l.x} ${l.y})`}
          fill="none"
        />
      ))}
      <path d="M30 46 C40 40 46 34 48 30 M58 40 C66 36 70 32 72 28 M150 40 C160 36 168 32 172 28" stroke="#B3945A" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M104 32 C108 22 114 16 122 12 M128 34 C132 24 138 18 146 14" stroke="#B3945A" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/** A small ornamental heart used to dot headings. */
export function HeartOrnament({
  size = 16,
  className,
  color = '#C9878E',
}: {
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 21 C12 21 2 14.5 2 8.5 C2 4.5 5 3 7.5 3 C10 3 12 5.5 12 5.5 C12 5.5 14 3 16.5 3 C19 3 22 4.5 22 8.5 C22 14.5 12 21 12 21 Z"
        fill={color}
      />
    </svg>
  );
}
