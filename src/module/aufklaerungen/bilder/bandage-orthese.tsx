import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

// Gemeinsame Teile für die Zeichnungen zu Bandagen und Orthesen. Nur benannte Exporte,
// der default-Export ist die Zeichnung „bandage-orthese“.

/** Bein von vorn vom Oberschenkel bis zum Schienbein, Mitte bei x = 0, oben y = 0, unten y = 440. */
export const KNIEBEIN =
  'M-76 0 C-74 70 -66 140 -58 190 C-54 215 -63 235 -59 262 C-55 292 -58 322 -54 352 ' +
  'C-50 392 -44 420 -42 440 L42 440 C44 420 50 392 54 352 C58 322 55 292 59 262 ' +
  'C63 235 54 215 58 190 C66 140 74 70 76 0 Z';

/** Nur die beiden Seitenränder des Beins (ohne Schnittkanten oben und unten). */
const KNIEBEIN_RAENDER =
  'M-76 0 C-74 70 -66 140 -58 190 C-54 215 -63 235 -59 262 C-55 292 -58 322 -54 352 C-50 392 -44 420 -42 440 ' +
  'M76 0 C74 70 66 140 58 190 C54 215 63 235 59 262 C55 292 58 322 54 352 C50 392 44 420 42 440';

export const KNIESCHEIBE_Y = 238;

/** Bein von vorn mit Kniescheibe; children liegen auf dem Bein und werden darauf beschnitten. */
export function Kniebein({ id, children, ueber }: { id: string; children?: ReactNode; ueber?: ReactNode }) {
  return (
    <g>
      <defs>
        <clipPath id={`${id}-bein`}>
          <path d={KNIEBEIN} />
        </clipPath>
      </defs>
      <path d={KNIEBEIN} fill={F.petrol} />
      <ellipse cx="0" cy={KNIESCHEIBE_Y} rx="27" ry="32" {...KONTUR} fill={F.petrolHell} />
      <g clipPath={`url(#${id}-bein)`}>{children}</g>
      <path d={KNIEBEIN_RAENDER} {...KONTUR} />
      {ueber}
    </g>
  );
}

/** Elastische Kniebandage mit Strickmuster und Öffnung an der Kniescheibe. */
function Bandage() {
  const oben = 120;
  const unten = 350;
  const rippen = Array.from({ length: 17 }, (_, i) => -80 + i * 10);
  return (
    <Kniebein
      id="bandage-orthese-bandage"
      ueber={
        <ellipse cx="0" cy={KNIESCHEIBE_Y} rx="27" ry="32" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      }
    >
      <rect x="-90" y={oben} width="180" height={unten - oben} fill={F.kupfer} />
      {/* Strickrippen */}
      <g stroke={F.kupferHell} strokeWidth="2" strokeOpacity="0.45">
        {rippen.map((x) => (
          <line key={x} x1={x} y1={oben + 14} x2={x} y2={unten - 14} />
        ))}
      </g>
      {/* Bündchen oben und unten */}
      <rect x="-90" y={oben} width="180" height="14" fill={F.kupferHell} />
      <rect x="-90" y={unten - 14} width="180" height="14" fill={F.kupferHell} />
      <path d={`M-90 ${oben} L90 ${oben} M-90 ${unten} L90 ${unten}`} stroke={F.linie} strokeWidth="3" />
      {/* Rand der Öffnung */}
      <ellipse cx="0" cy={KNIESCHEIBE_Y} rx="38" ry="44" fill={F.kupferHell} stroke={F.linie} strokeWidth="3" />
    </Kniebein>
  );
}

/** Knieorthese mit festen Seitenschienen, Gelenk auf Kniehöhe und Gurten. */
export function Knieorthese() {
  const k = KNIESCHEIBE_Y;
  const schienen = [
    `M-82 100 L-70 ${k} L-64 370`,
    `M82 100 L70 ${k} L64 370`,
  ];
  const gurte = [
    { y: 112, l: 82 },
    { y: 172, l: 76 },
    { y: 300, l: 68 },
    { y: 350, l: 66 },
  ];
  return (
    <g>
      <Kniebein id="bandage-orthese-orthese" />
      {gurte.map(({ y, l }) => (
        <rect key={y} x={-l} y={y - 13} width={l * 2} height="26" rx="8" fill={F.kupferHell} stroke={F.linie} strokeWidth="3" />
      ))}
      {schienen.map((d) => (
        <path key={`k${d}`} d={d} fill="none" stroke={F.linie} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {schienen.map((d) => (
        <path key={`f${d}`} d={d} fill="none" stroke={F.kupfer} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {[-70, 70].map((x) => (
        <g key={x}>
          <circle cx={x} cy={k} r="19" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
          <circle cx={x} cy={k} r="6" fill={F.linie} />
        </g>
      ))}
    </g>
  );
}

const OBEN = 70;

export default function BandageOrthese() {
  return (
    <Zeichnung titel="Zwei Knie von vorn im Vergleich: links eine elastische Bandage mit Öffnung an der Kniescheibe, sie wärmt und gibt Gefühl; rechts eine Orthese mit festen Seitenschienen, Gelenk am Knie und Gurten, sie führt die Bewegung">
      <g transform={`translate(190 ${OBEN})`}>
        <Bandage />
      </g>
      <g transform={`translate(530 ${OBEN})`}>
        <Knieorthese />
      </g>

      <Etikett x={190} y={566} anker="middle" farbe={F.kupferHell}>
        Bandage
      </Etikett>
      <Unterzeile x={190} y={600} anker="middle">
        elastisch, wärmt,
      </Unterzeile>
      <Unterzeile x={190} y={628} anker="middle">
        gibt Gefühl
      </Unterzeile>

      <Etikett x={530} y={566} anker="middle" farbe={F.kupferHell}>
        Orthese
      </Etikett>
      <Unterzeile x={530} y={600} anker="middle">
        fest, führt
      </Unterzeile>
      <Unterzeile x={530} y={628} anker="middle">
        die Bewegung
      </Unterzeile>
    </Zeichnung>
  );
}
