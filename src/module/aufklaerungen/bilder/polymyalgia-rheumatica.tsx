import type { ReactNode } from 'react';
import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

type Strecke = [number, number, number, number];

/** Arme und Beine als dicke Linien [x1, y1, x2, y2]; Breite 52 (Arme) und 60 (Beine). */
const ARME: Strecke[] = [
  [170, 225, 128, 455],
  [330, 225, 372, 455],
];
const BEINE: Strecke[] = [
  [218, 440, 200, 655],
  [282, 440, 300, 655],
];
const RUMPF =
  'M180 198 Q250 186 320 198 Q340 202 338 228 L322 410 Q320 452 290 452 L210 452 Q180 452 178 410 L162 228 Q160 202 180 198 Z';

/** Punkt auf einer Strecke, anteil 0 = Anfang, 1 = Ende. */
export function aufStrecke([x1, y1, x2, y2]: Strecke, anteil: number): [number, number] {
  return [x1 + (x2 - x1) * anteil, y1 + (y2 - y1) * anteil];
}

export const KOERPER_ARME = ARME;
export const KOERPER_BEINE = BEINE;

function Glieder({ farbe, zusatz }: { farbe: string; zusatz: number }) {
  return (
    <g stroke={farbe} strokeLinecap="round">
      {ARME.map(([x1, y1, x2, y2]) => (
        <line key={x1} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={52 + zusatz} />
      ))}
      {BEINE.map(([x1, y1, x2, y2]) => (
        <line key={x1} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={60 + zusatz} />
      ))}
      <line x1="250" y1="150" x2="250" y2="205" strokeWidth={36 + zusatz} />
    </g>
  );
}

/**
 * Schlichter Körper von vorn, Mitte bei x = 250, Kopf oben (Mittelpunkt 250/120), Füße bei y ≈ 690.
 * `rumpf` liegt auf dem Rumpf und wird auf ihn beschnitten, `kopf` liegt über dem Kopf,
 * `oben` über allem. `praefix` macht die clipPath-id eindeutig.
 */
export function Koerper({
  praefix,
  rumpf,
  kopf,
  oben,
}: {
  praefix: string;
  rumpf?: ReactNode;
  kopf?: ReactNode;
  oben?: ReactNode;
}) {
  const clip = `${praefix}-rumpf`;
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <path d={RUMPF} />
        </clipPath>
      </defs>
      {/* Erst der Rand: alles dick in Linienfarbe */}
      <Glieder farbe={F.linie} zusatz={8} />
      <path d={RUMPF} fill={F.linie} stroke={F.linie} strokeWidth="8" strokeLinejoin="round" />
      <ellipse cx="250" cy="120" rx="44" ry="52" fill={F.linie} stroke={F.linie} strokeWidth="8" />
      {/* Dann die Flächen */}
      <Glieder farbe={F.petrol} zusatz={0} />
      <path d={RUMPF} fill={F.petrol} />
      <g clipPath={`url(#${clip})`}>{rumpf}</g>
      <ellipse cx="250" cy="120" rx="44" ry="52" fill={F.petrol} />
      {kopf}
      {oben}
    </g>
  );
}

/** Körper von vorn: Schulter- und Beckengürtel entzündet, an der Schläfe das Warnzeichen. */
export default function PolymyalgiaRheumatica() {
  return (
    <Zeichnung titel="Körper von vorn: Schultern mit Oberarmen und Nacken sowie Hüften mit Oberschenkeln sind auf beiden Seiten hervorgehoben, an der Schläfe ist die Schlagader als Warnzeichen markiert">
      <Koerper
        praefix="polymyalgia-rheumatica"
        rumpf={
          <g fill={F.kupfer}>
            <rect x="150" y="180" width="200" height="56" />
            <rect x="150" y="410" width="200" height="56" />
          </g>
        }
        kopf={
          <path
            d="M280 142 C290 126 274 112 284 94"
            fill="none"
            stroke={F.kupferHell}
            strokeWidth="6"
            strokeLinecap="round"
          />
        }
        oben={
          <g stroke={F.kupfer} strokeLinecap="round">
            {/* Nacken */}
            <line x1="250" y1="171" x2="250" y2="205" strokeWidth="36" strokeLinecap="butt" />
            {/* Oberarme */}
            {ARME.map((s) => {
              const [x, y] = aufStrecke(s, 0.36);
              return <line key={s[0]} x1={s[0]} y1={s[1]} x2={x} y2={y} strokeWidth="52" />;
            })}
            {/* Oberschenkel */}
            {BEINE.map((s) => {
              const [x, y] = aufStrecke(s, 0.4);
              return <line key={s[0]} x1={s[0]} y1={s[1] + 12} x2={x} y2={y} strokeWidth="60" />;
            })}
          </g>
        }
      />

      <Zeiger von={[396, 112]} nach={[282, 116]} />
      <Etikett x={404} y={112} farbe={F.kupferHell}>
        Warnzeichen Kopf
      </Etikett>
      <Unterzeile x={404} y={144}>
        Kopfschmerz, Sehstörung
      </Unterzeile>

      <Zeiger von={[396, 236]} nach={[352, 250]} />
      <Etikett x={404} y={244}>
        Schultern, Oberarme
      </Etikett>
      <Unterzeile x={404} y={276}>
        und Nacken
      </Unterzeile>

      <Zeiger von={[396, 520]} nach={[296, 512]} />
      <Etikett x={404} y={528}>
        Hüfte, Oberschenkel
      </Etikett>

      <Etikett x={404} y={630}>
        Morgens am stärksten
      </Etikett>
      <Unterzeile x={404} y={662}>
        beide Seiten gleich
      </Unterzeile>
    </Zeichnung>
  );
}
