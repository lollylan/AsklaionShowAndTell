import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

// Rumpf von vorn (Brust bis Oberschenkel), auch für narbenbruch.tsx.
// Die rechte Körperseite liegt links im Bild.

/** Linke Bildhälfte des Rumpfes, von Hals über Schulter und Hüfte bis zum Oberschenkel. */
const SEITE =
  'M330 24 L330 50 C276 56 222 64 206 98 L236 186 C246 236 256 262 258 290 C262 340 232 400 228 470 L240 650';
/** Rechte Bildhälfte: gespiegelt an x = 360 und umgekehrt (vom Oberschenkel zum Hals). */
const SEITE_RECHTS =
  'M480 650 L492 470 C488 400 458 340 462 290 C464 262 474 236 484 186 L514 98 C498 64 444 56 390 50 L390 24';
const SCHRITT = 'M344 650 L356 588 Q360 576 364 588 L376 650';

/** Fläche des Rumpfes. */
const RUMPF = `${SEITE} L${SCHRITT.slice(1)} L${SEITE_RECHTS.slice(1)} Z`;
/** Seitenkonturen, Schultern und Schritt (oben und unten offen). */
const RUMPF_KONTUR = `${SEITE} ${SCHRITT} ${SEITE_RECHTS}`;

/** Lage des Nabels. */
export const NABEL: [number, number] = [360, 340];

/** Rumpf von vorn mit Rippenbogen, Nabel und Leistenfalten. `children` liegen obenauf. */
export function Rumpf({ strich = 4, children }: { strich?: number; children?: ReactNode }) {
  return (
    <g>
      <path d={RUMPF} fill={F.petrol} />
      <path d={RUMPF_KONTUR} {...KONTUR} strokeWidth={strich} />
      <g fill="none" stroke={F.leise} strokeWidth={strich * 0.75} strokeLinecap="round">
        {/* Rippenbogen */}
        <path d="M262 170 C300 206 336 170 360 130 C384 170 420 206 458 170" />
        {/* Schlüsselbeine */}
        <path d="M232 92 C270 82 310 84 342 70" />
        <path d="M488 92 C450 82 410 84 378 70" />
        {/* Leistenfalten */}
        <path d="M244 430 C276 476 316 524 350 566" />
        <path d="M476 430 C444 476 404 524 370 566" />
      </g>
      {children}
      <ellipse cx={NABEL[0]} cy={NABEL[1]} rx="7" ry="10" fill={F.petrolDunkel} stroke={F.linie} strokeWidth={strich * 0.75} />
    </g>
  );
}

/** Weiche Vorwölbung als kupferner Fleck. */
function Beule({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />;
}

/** Überblick: Rumpf von vorn mit den drei typischen Stellen für einen Bauchwandbruch. */
export default function Hernie() {
  return (
    <Zeichnung titel="Rumpf von vorn mit drei typischen Stellen für einen Bauchwandbruch: in der Leiste, am Nabel und an einer alten Operationsnarbe">
      <Rumpf>
        {/* Leistenbruch */}
        <Beule cx={298} cy={498} rx={28} ry={20} />
        {/* Nabelbruch */}
        <Beule cx={NABEL[0]} cy={NABEL[1]} rx={24} ry={24} />
        {/* Narbenbruch */}
        <Beule cx={430} cy={262} rx={22} ry={32} />
        <path d="M426 214 L426 310" fill="none" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
        <g stroke={F.linie} strokeWidth="2.5" strokeLinecap="round">
          {[226, 246, 266, 286].map((y) => (
            <line key={y} x1="418" y1={y} x2="434" y2={y} />
          ))}
        </g>
      </Rumpf>

      <Etikett x={700} y={236} anker="end" farbe={F.kupferHell}>
        Narbenbruch
      </Etikett>
      <Zeiger von={[506, 248]} nach={[452, 262]} />

      <Etikett x={700} y={400} anker="end" farbe={F.kupferHell}>
        Nabelbruch
      </Etikett>
      <Zeiger von={[522, 392]} nach={[384, 346]} />

      <Etikett x={20} y={560} farbe={F.kupferHell}>
        Leistenbruch
      </Etikett>
      <Zeiger von={[170, 532]} nach={[274, 500]} />

      <Unterzeile x={360} y={696} anker="middle">
        Typische Stellen für einen Bruch
      </Unterzeile>
    </Zeichnung>
  );
}
