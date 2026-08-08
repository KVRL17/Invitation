import React from 'react';

/** A four-point star sparkle. */
export function Sparkle({
  size = 18,
  className,
  style,
  color = '#E4C98B',
  opacity,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      opacity={opacity}
      aria-hidden="true"
    >
      <path
        d="M12 0 C13.2 6.4 17.6 10.8 24 12 C17.6 13.2 13.2 17.6 12 24 C10.8 17.6 6.4 13.2 0 12 C6.4 10.8 10.8 6.4 12 0 Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * A cluster of sparkles used around the rings and headings.
 * Wraps the area with position:relative and sprinkles twinkling stars.
 */
export function SparkleCluster({ className }: { className?: string }) {
  const sparkles: Array<{ size: number; top?: string; left?: string; right?: string; bottom?: string; delay: string }> = [
    { size: 16, top: '-4%', left: '10%', delay: '0s' },
    { size: 10, top: '16%', right: '-2%', delay: '0.8s' },
    { size: 13, bottom: '2%', left: '-2%', delay: '0.4s' },
    { size: 9, bottom: '18%', right: '10%', delay: '1.4s' },
    { size: 7, top: '-10%', right: '34%', delay: '1.9s' },
  ];
  return (
    <div className={className} aria-hidden="true" style={{ position: 'relative' }}>
      {sparkles.map((s, i) => (
        <Sparkle
          key={i}
          size={s.size}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            animationDelay: s.delay,
          }}
          className="anim-twinkle"
        />
      ))}
    </div>
  );
}
