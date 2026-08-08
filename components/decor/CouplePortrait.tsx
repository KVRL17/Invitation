'use client';

import React from 'react';

function useGradId(prefix: string): string {
  const id = React.useId().replace(/:/g, '');
  return `${prefix}-${id}`;
}

/**
 * Hand-crafted premium cartoon portraits of the couple — Brinda in a
 * burgundy-and-gold lehenga, Chaitanya in an ivory sherwani. Drawn to match
 * the invitation's elegant hand-illustrated style so they always look
 * on-theme (and never rely on external image hosts).
 *
 * The portraits are pure SVG so they scale crisply at any size. Small groups
 * use the shared CSS animation classes (gentle float, twinkling sparkles) to
 * feel alive inside the "Meet the Couple" section.
 */

/* ------------------------------------------------------------------ */
/* Shared palette                                                      */
/* ------------------------------------------------------------------ */
const SKIN = '#F2C8A6';
const SKIN_SHADE = '#E4AE8B';
const BRIDE_HAIR = '#331820';
const GROOM_HAIR = '#1E1714';
const GOLD = '#C8A45D';
const GOLD_LIGHT = '#E4C98B';
const BURGUNDY = '#702F3B';
const BURGUNDY_DEEP = '#4A1C26';

/* ------------------------------------------------------------------ */
/* Brinda — bride                                                      */
/* ------------------------------------------------------------------ */
export function BridePortrait({
  size = 300,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const gSkin = useGradId('br-skin');
  const gHair = useGradId('br-hair');
  const gLehenga = useGradId('br-lehenga');
  const gGold = useGradId('br-gold');
  const gDupatta = useGradId('br-dupatta');

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 320 400"
      className={className}
      role="img"
      aria-label="Cartoon illustration of Brinda, the bride, in a burgundy lehenga"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gSkin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7D3B4" />
          <stop offset="100%" stopColor={SKIN} />
        </linearGradient>
        <linearGradient id={gHair} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A2832" />
          <stop offset="100%" stopColor={BRIDE_HAIR} />
        </linearGradient>
        <linearGradient id={gLehenga} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A3B48" />
          <stop offset="55%" stopColor={BURGUNDY} />
          <stop offset="100%" stopColor={BURGUNDY_DEEP} />
        </linearGradient>
        <linearGradient id={gGold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD_LIGHT} />
          <stop offset="50%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#9A7433" />
        </linearGradient>
        <linearGradient id={gDupatta} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(245,230,211,0)" />
          <stop offset="45%" stopColor="rgba(245,230,211,0.85)" />
          <stop offset="100%" stopColor="rgba(228,201,139,0.55)" />
        </linearGradient>
      </defs>

      {/* soft halo behind the figure */}
      <ellipse cx="160" cy="205" rx="122" ry="142" fill="#E9D3A0" opacity="0.14" />

      {/* ---------- hair: back & bun ---------- */}
      <path
        d="M160 80 C 118 80 102 112 100 150 L 100 214 C 100 240 124 250 160 250 C 196 250 220 240 220 214 L 220 150 C 218 112 202 80 160 80 Z"
        fill={BRIDE_HAIR}
      />
      <ellipse cx="160" cy="68" rx="36" ry="28" fill={BRIDE_HAIR} />
      <path
        d="M160 40 C 138 40 128 54 126 74 C 140 64 180 64 194 74 C 192 54 182 40 160 40 Z"
        fill="#45242C"
      />

      {/* ---------- neck ---------- */}
      <path d="M146 200 L146 232 C146 240 154 242 160 242 C166 242 174 240 174 232 L174 200 Z" fill={SKIN} />
      <path d="M146 200 C 152 206 168 206 174 200" stroke="rgba(112,47,59,0.18)" strokeWidth="2" fill="none" />

      {/* ---------- ears + jhumka ---------- */}
      <ellipse cx="102" cy="158" rx="9" ry="15" fill={SKIN} />
      <ellipse cx="218" cy="158" rx="9" ry="15" fill={SKIN} />
      {([102, 218] as const).map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="176" r="6" fill="url(#gGold)" />
          <circle cx={cx} cy="182" r="7" fill="url(#gGold)" />
          <circle cx={cx} cy="186" r="4" fill={GOLD_LIGHT} />
          <path d={`M${cx - 3} 176 l0 6 M${cx + 3} 176 l0 6`} stroke="#9A7433" strokeWidth="1" />
        </g>
      ))}

      {/* ---------- face ---------- */}
      <ellipse cx="160" cy="150" rx="58" ry="62" fill={`url(#${gSkin})`} />

      {/* blush */}
      <ellipse cx="118" cy="172" rx="12" ry="6" fill="#F0A9A4" opacity="0.35" />
      <ellipse cx="202" cy="172" rx="12" ry="6" fill="#F0A9A4" opacity="0.35" />

      {/* ---------- front hair ---------- */}
      <path
        d="M102 148
           C 102 98 132 82 160 82
           C 188 82 218 98 218 148
           C 218 124 202 110 178 108
           C 170 120 170 138 160 148
           C 150 138 150 120 142 108
           C 118 110 102 124 102 148 Z"
        fill={`url(#${gHair})`}
      />
      <path d="M102 152 C 96 190 98 214 106 236 C 116 216 118 186 120 160 Z" fill={`url(#${gHair})`} />
      <path d="M218 152 C 224 190 222 214 214 236 C 204 216 202 186 200 160 Z" fill={`url(#${gHair})`} />

      {/* ---------- maang tikka ---------- */}
      <path d="M160 84 L160 118" stroke={GOLD} strokeWidth="1.4" />
      <path d="M152 104 C 156 108 164 108 168 104" stroke={GOLD} strokeWidth="1.2" fill="none" />
      <circle cx="160" cy="120" r="3.2" fill="url(#gGold)" />
      <path d="M157 123 l-3 5 M163 123 l3 5" stroke="#9A7433" strokeWidth="1.1" />

      {/* ---------- eyebrows, eyes, nose, lips ---------- */}
      <path d="M130 140 Q 142 134 152 138" stroke="#6B3A2E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M168 138 Q 178 134 190 140" stroke="#6B3A2E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M134 150 Q 144 158 152 150" stroke="#4A2321" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M168 150 Q 176 158 186 150" stroke="#4A2321" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M134 150 l-4 -2 M186 150 l4 -2" stroke="#4A2321" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M160 168 C 159 172 158 175 159 178 C 160 180 160 180 161 178 C 162 175 161 172 160 168 Z" fill="#E29A8B" />
      <path d="M152 184 Q 160 191 168 184" stroke="#A84848" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {/* ---------- necklace ---------- */}
      <path d="M128 214 C 140 234 180 234 192 214" stroke="url(#gGold)" strokeWidth="3" fill="none" />
      <circle cx="160" cy="228" r="7" fill="url(#gGold)" />
      <circle cx="160" cy="228" r="3" fill={GOLD_LIGHT} />
      <path d="M134 216 l0 8 M186 216 l0 8" stroke="url(#gGold)" strokeWidth="2.4" />
      <circle cx="134" cy="226" r="2.4" fill={GOLD_LIGHT} />
      <circle cx="186" cy="226" r="2.4" fill={GOLD_LIGHT} />

      {/* ---------- blouse / bodice ---------- */}
      <path
        d="M112 236 C 112 268 120 282 160 288 C 200 282 208 268 208 236
           L 200 236 C 190 260 170 268 160 268 C 150 268 130 260 120 236 Z"
        fill={`url(#${gLehenga})`}
      />
      <path d="M122 242 C 138 268 182 268 198 242" stroke="url(#gGold)" strokeWidth="2" fill="none" />

      {/* ---------- arms + namaste hands ---------- */}
      <path d="M112 244 C 96 258 92 280 96 300 L 108 300 C 110 282 116 266 128 256 Z" fill={SKIN} />
      <path d="M208 244 C 224 258 228 280 224 300 L 212 300 C 210 282 204 266 192 256 Z" fill={SKIN} />
      {/* sleeves */}
      <path d="M112 234 C 102 240 100 252 106 260 L 128 256 C 120 246 118 238 120 232 Z" fill={`url(#${gLehenga})`} />
      <path d="M208 234 C 218 240 220 252 214 260 L 192 256 C 200 246 202 238 200 232 Z" fill={`url(#${gLehenga})`} />
      {/* folded hands */}
      <path
        d="M142 300 C 142 310 148 316 160 316 C 172 316 178 310 178 300
           L 178 296 C 168 302 152 302 142 296 Z"
        fill={SKIN}
      />
      <path d="M140 296 C 150 302 170 302 180 296 L 178 292 C 168 298 152 298 142 292 Z" fill={SKIN} />
      {/* bangles */}
      <path d="M140 300 l0 -4 M144 302 l0 -4 M148 303 l0 -4" stroke="url(#gGold)" strokeWidth="2.4" strokeLinecap="round" />

      {/* ---------- dupatta ---------- */}
      <path
        d="M126 250 C 108 268 104 296 116 320 L 128 318 C 122 296 126 272 142 258 Z"
        fill={`url(#${gDupatta})`}
      />
      <path
        d="M126 250 C 108 268 104 296 116 320 L 128 318 C 122 296 126 272 142 258 Z"
        fill="none"
        stroke="rgba(200,164,93,0.5)"
        strokeWidth="1.2"
      />

      {/* ---------- lehenga skirt ---------- */}
      <path
        d="M96 288 C 96 332 120 360 160 360 C 200 360 224 332 224 288
           C 200 296 120 296 96 288 Z"
        fill={`url(#${gLehenga})`}
      />
      <path
        d="M96 288 C 120 300 200 300 224 288 C 224 320 204 344 160 344 C 116 344 96 320 96 288 Z"
        fill="rgba(255,249,243,0.12)"
      />
      {/* gold hem band */}
      <path
        d="M100 314 C 124 324 196 324 220 314 L 214 330 C 192 340 128 340 106 330 Z"
        fill="url(#gGold)"
      />
      <path
        d="M104 344 C 124 352 196 352 216 344 L 212 354 C 192 360 128 360 108 354 Z"
        fill={GOLD}
        opacity="0.85"
      />

      {/* twinkling sparkles */}
      <g aria-hidden="true">
        <circle cx="120" cy="140" r="2" fill="#F3E3C0" className="anim-twinkle" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx="204" cy="120" r="2" fill="#F3E3C0" className="anim-twinkle" style={{ animationDelay: '0.9s', transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx="232" cy="210" r="2.2" fill="#F3E3C0" className="anim-twinkle" style={{ animationDelay: '1.6s', transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx="88" cy="250" r="2.2" fill="#F3E3C0" className="anim-twinkle" style={{ animationDelay: '0.4s', transformBox: 'fill-box', transformOrigin: 'center' }} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Chaitanya — groom                                                   */
/* ------------------------------------------------------------------ */
export function GroomPortrait({
  size = 300,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const gSkin = useGradId('gr-skin');
  const gHair = useGradId('gr-hair');
  const gCoat = useGradId('gr-coat');
  const gTrim = useGradId('gr-trim');

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 320 400"
      className={className}
      role="img"
      aria-label="Cartoon illustration of Chaitanya, the groom, in an ivory sherwani"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gSkin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6D0AE" />
          <stop offset="100%" stopColor="#E9B98F" />
        </linearGradient>
        <linearGradient id={gHair} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A2F2B" />
          <stop offset="100%" stopColor={GROOM_HAIR} />
        </linearGradient>
        <linearGradient id={gCoat} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="60%" stopColor="#F3E8D5" />
          <stop offset="100%" stopColor="#E6D4B8" />
        </linearGradient>
        <linearGradient id={gTrim} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD_LIGHT} />
          <stop offset="55%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#9A7433" />
        </linearGradient>
      </defs>

      {/* soft halo */}
      <ellipse cx="160" cy="205" rx="122" ry="142" fill="#E9D3A0" opacity="0.14" />

      {/* ---------- hair ---------- */}
      <path
        d="M102 150 C 102 100 128 82 160 82 C 192 82 218 100 218 150
           C 218 132 204 120 188 118 C 178 108 168 104 160 104 C 152 104 142 108 132 118
           C 116 120 102 132 102 150 Z"
        fill={`url(#${gHair})`}
      />
      <path d="M102 152 C 100 176 104 196 114 208 C 116 188 118 168 120 156 Z" fill={`url(#${gHair})`} />
      <path d="M218 152 C 220 176 216 196 206 208 C 204 188 202 168 200 156 Z" fill={`url(#${gHair})`} />

      {/* ---------- neck ---------- */}
      <path d="M146 200 L146 232 C146 240 154 242 160 242 C166 242 174 240 174 232 L174 200 Z" fill={SKIN} />
      <path d="M146 200 C 152 206 168 206 174 200" stroke="rgba(112,47,59,0.18)" strokeWidth="2" fill="none" />

      {/* ---------- ears ---------- */}
      <ellipse cx="102" cy="156" rx="9" ry="15" fill={SKIN} />
      <ellipse cx="218" cy="156" rx="9" ry="15" fill={SKIN} />

      {/* ---------- face ---------- */}
      <ellipse cx="160" cy="150" rx="58" ry="60" fill={`url(#${gSkin})`} />

      {/* ---------- eyebrows, eyes, nose, lips ---------- */}
      <path d="M130 140 Q 142 134 152 138" stroke="#5E3A28" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M168 138 Q 178 134 190 140" stroke="#5E3A28" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M134 150 Q 144 158 152 150" stroke="#4A2321" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M168 150 Q 176 158 186 150" stroke="#4A2321" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M134 150 l-4 -2 M186 150 l4 -2" stroke="#4A2321" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M160 168 C 159 172 158 175 159 178 C 160 180 160 180 161 178 C 162 175 161 172 160 168 Z" fill="#DF947F" />
      <path d="M152 182 Q 160 189 168 182" stroke="#9C4A44" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* subtle smile shadow */}
      <path d="M152 182 Q 160 189 168 182" stroke="rgba(156,74,68,0.35)" strokeWidth="1" fill="none" />

      {/* ---------- collar (inner kurta) ---------- */}
      <path d="M126 208 L 148 226 L 160 216 L 172 226 L 194 208 L 182 200 L 160 210 L 138 200 Z" fill="#7A3238" />
      <path d="M126 208 L 148 226 L 160 216 L 172 226 L 194 208" stroke="url(#gTrim)" strokeWidth="1.6" fill="none" />

      {/* ---------- sherwani coat ---------- */}
      <path
        d="M118 206 C 118 250 122 292 128 320 C 132 344 140 356 160 356 C 180 356 188 344 192 320
           C 198 292 202 250 202 206
           C 186 214 176 214 160 214 C 144 214 134 214 118 206 Z"
        fill={`url(#${gCoat})`}
      />
      {/* placket + buttons */}
      <path d="M160 214 L160 356" stroke="#C9B08A" strokeWidth="1.4" />
      {[228, 252, 276, 300, 324].map((y) => (
        <g key={y}>
          <circle cx="160" cy={y} r="3.4" fill="url(#gTrim)" />
          <circle cx="160" cy={y} r="1.4" fill={GOLD_LIGHT} />
        </g>
      ))}
      {/* gold trim along the placket */}
      <path d="M154 216 L154 352" stroke="rgba(200,164,93,0.55)" strokeWidth="1.4" />
      <path d="M166 216 L166 352" stroke="rgba(200,164,93,0.55)" strokeWidth="1.4" />
      {/* hem band */}
      <path d="M124 330 C 140 340 180 340 196 330 L 194 344 C 178 354 142 354 126 344 Z" fill="url(#gTrim)" />
      {/* neckline lapel shading */}
      <path d="M118 206 C 132 214 146 214 160 214" stroke="rgba(200,164,93,0.4)" strokeWidth="1.6" fill="none" />

      {/* ---------- arms ---------- */}
      <path d="M118 218 C 100 232 94 260 98 290 L 112 290 C 112 262 116 240 128 230 Z" fill={`url(#${gCoat})`} />
      <path d="M202 218 C 220 232 226 260 222 290 L 208 290 C 208 262 204 240 192 230 Z" fill={`url(#${gCoat})`} />
      {/* cuffs */}
      <path d="M98 282 L112 282 L112 292 L98 292 Z" fill="url(#gTrim)" />
      <path d="M208 282 L222 282 L222 292 L208 292 Z" fill="url(#gTrim)" />

      {/* ---------- hand (namaste) ---------- */}
      <path
        d="M142 292 C 142 304 148 312 160 312 C 172 312 178 304 178 292
           L 178 288 C 168 294 152 294 142 288 Z"
        fill={SKIN}
      />
      <path d="M140 288 C 150 294 170 294 180 288 L 178 284 C 168 290 152 290 142 284 Z" fill={SKIN} />

      {/* ---------- boutonniere ---------- */}
      <g className="svg-float anim-float-slow" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <circle cx="180" cy="222" r="6" fill="#C9878E" />
        <circle cx="185" cy="218" r="5" fill="#F7D9DD" />
        <circle cx="188" cy="225" r="4" fill="#E4C98B" />
        <path d="M176 228 L 182 252" stroke="#8A9A6E" strokeWidth="2" />
        <path d="M180 236 C 184 234 186 236 184 240 C 181 238 180 238 180 236 Z" fill="#A9B98A" />
      </g>

      {/* twinkling sparkles */}
      <g aria-hidden="true">
        <circle cx="120" cy="140" r="2" fill="#F3E3C0" className="anim-twinkle" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx="204" cy="120" r="2" fill="#F3E3C0" className="anim-twinkle" style={{ animationDelay: '1.1s', transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx="234" cy="240" r="2.2" fill="#F3E3C0" className="anim-twinkle" style={{ animationDelay: '0.6s', transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx="86" cy="252" r="2.2" fill="#F3E3C0" className="anim-twinkle" style={{ animationDelay: '1.8s', transformBox: 'fill-box', transformOrigin: 'center' }} />
      </g>
    </svg>
  );
}
