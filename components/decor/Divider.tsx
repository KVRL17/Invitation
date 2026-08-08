import { HeartOrnament } from './Flower';

/**
 * A slim gold divider with a small ornament — used between sections.
 * `tone` picks colors for ivory vs deep-background sections.
 */
export function Divider({
  className,
  tone = 'light',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const line = tone === 'light' ? '#C8A45D' : 'rgba(228,201,139,0.6)';
  return (
    <div className={`flex items-center justify-center gap-4 ${className ?? ''}`} aria-hidden="true">
      <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-gold to-gold" style={{ background: `linear-gradient(90deg, transparent, ${line})` }} />
      <HeartOrnament size={18} color={tone === 'light' ? '#C9878E' : '#E4C98B'} className="anim-heartbeat" />
      <span className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(90deg, ${line}, transparent)` }} />
    </div>
  );
}
