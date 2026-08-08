import React from 'react';

export type IconName =
  | 'calendar'
  | 'clock'
  | 'pin'
  | 'heart'
  | 'cup'
  | 'flower'
  | 'ring'
  | 'couple'
  | 'envelope'
  | 'sparkles'
  | 'music'
  | 'chat'
  | 'check'
  | 'arrow'
  | 'home'
  | 'star';

/**
 * A minimal, elegant stroke icon set (1.4px strokes, round caps) that stays
 * consistent across the whole invitation.
 */
export function Icon({
  name,
  size = 22,
  className,
  color = 'currentColor',
}: {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
}) {
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...common}
    >
      {name === 'calendar' && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      )}
      {name === 'pin' && (
        <>
          <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.6" />
        </>
      )}
      {name === 'heart' && (
        <path d="M12 20.5C12 20.5 3.5 15 3.5 8.8 3.5 5.6 6 3.5 8.4 3.5c1.6 0 3 .8 3.6 2 .6-1.2 2-2 3.6-2C17.9 3.5 20.5 5.6 20.5 8.8c0 6.2-8.5 11.7-8.5 11.7Z" />
      )}
      {name === 'cup' && (
        <>
          <path d="M6 8h12v3a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V8Z" />
          <path d="M6 9H4.5A1.5 1.5 0 0 0 3 10.5 3.5 3.5 0 0 0 6.5 14M16 9h1.5A1.5 1.5 0 0 1 19 10.5 3.5 3.5 0 0 1 15.5 14M8 21h8M10 17.5V21M14 17.5V21" />
        </>
      )}
      {name === 'flower' && (
        <>
          <circle cx="12" cy="12" r="2.4" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx="12"
              cy="5"
              rx="2.1"
              ry="3.4"
              transform={`rotate(${a} 12 12)`}
            />
          ))}
        </>
      )}
      {name === 'ring' && (
        <>
          <circle cx="12" cy="15.5" r="5.5" />
          <path d="M12 10V7M12 7l-1.6-3M12 7l1.6-3" />
          <path d="M10.4 4h3.2" />
        </>
      )}
      {name === 'couple' && (
        <>
          <circle cx="8.5" cy="7" r="2.5" />
          <path d="M3.5 19c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" />
          <circle cx="16.5" cy="9" r="2" />
          <path d="M15 19c0-2.4 1.6-4 3.7-4S22 16.6 22 19" />
        </>
      )}
      {name === 'envelope' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
      {name === 'sparkles' && (
        <>
          <path d="M12 3c.8 4.6 4.4 8.2 9 9-4.6.8-8.2 4.4-9 9-.8-4.6-4.4-8.2-9-9 4.6-.8 8.2-4.4 9-9Z" />
          <path d="M19 3.5c.3 1.8 1.7 3.2 3.5 3.5-1.8.3-3.2 1.7-3.5 3.5-.3-1.8-1.7-3.2-3.5-3.5C17.3 6.7 18.7 5.3 19 3.5Z" />
        </>
      )}
      {name === 'music' && (
        <>
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
        </>
      )}
      {name === 'chat' && (
        <path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" />
      )}
      {name === 'check' && <path d="m5 12 5 5 9-11" />}
      {name === 'arrow' && <path d="M5 12h14M13 6l6 6-6 6" />}
      {name === 'home' && (
        <>
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </>
      )}
      {name === 'star' && (
        <path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.2l5.9-.8L12 3Z" />
      )}
    </svg>
  );
}
