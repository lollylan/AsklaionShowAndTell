import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Hautblock im Schnitt, gemeinsam mit der Verbrennungs-Zeichnung genutzt. */
export const BLOCK = { links: 40, rechts: 680, oben: 260, unten: 560, oberhaut: 290, fett: 430 } as const;

/** Fettläppchen im Unterhautfett als [x, y]. */
const LAEPPCHEN: [number, number][] = [];
for (let reihe = 0; reihe < 3; reihe++) {
  for (let x = BLOCK.links + 20 + (reihe % 2) * 26; x < BLOCK.rechts + 30; x += 52) {
    const y = BLOCK.fett + 26 + reihe * 46;
    if (x > 530 && y > 480) continue; // Platz für die Beschriftung
    LAEPPCHEN.push([x, y]);
  }
}

/** Die drei Hautschichten; children liegen darüber und werden auf den Block beschnitten. */
export function Hautblock({ id, children }: { id: string; children?: ReactNode }) {
  const { links, rechts, oben, unten, oberhaut, fett } = BLOCK;
  const breite = rechts - links;
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <rect x={links} y={oben} width={breite} height={unten - oben} rx="18" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x={links} y={oben} width={breite} height={oberhaut - oben} fill={F.petrolHell} />
        <rect x={links} y={oberhaut} width={breite} height={fett - oberhaut} fill={F.petrol} />
        <rect x={links} y={fett} width={breite} height={unten - fett} fill={F.petrolDunkel} />
        <g fill="none" stroke={F.petrol} strokeWidth="3">
          {LAEPPCHEN.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="21" />
          ))}
        </g>
        {children}
      </g>
      <rect x={links} y={oben} width={breite} height={unten - oben} rx="18" {...KONTUR} />
    </g>
  );
}

/** Hautschnitt mit einer flachen Schürfwunde links und einer klaffenden Schnittwunde rechts. */
export default function Wunden() {
  const { oben, oberhaut, fett } = BLOCK;
  const sx = 200; // Mitte Schürfwunde
  const cx = 470; // Mitte Schnittwunde
  return (
    <Zeichnung titel="Haut im Schnitt mit Oberhaut, Lederhaut und Fettgewebe. Links eine Schürfwunde, bei der nur die oberste Schicht abgerieben ist. Rechts eine klaffende Schnittwunde, die bis ins Fettgewebe reicht">
      <Hautblock id="wunden-haut">
        {/* Schürfwunde: Oberhaut fehlt, Wundgrund gerötet */}
        <path
          d={`M${sx - 110} ${oben - 2} L${sx + 110} ${oben - 2} C${sx + 100} ${oberhaut + 14} ${sx - 100} ${oberhaut + 14} ${sx - 110} ${oben - 2} Z`}
          fill={F.kupfer}
        />
        <g fill={F.kupferHell}>
          {[-70, -36, -4, 30, 64].map((dx, i) => (
            <circle key={dx} cx={sx + dx} cy={oberhaut - 4 + (i % 2) * 6} r="4" />
          ))}
        </g>

        {/* Schnittwunde: klafft bis ins Fett */}
        <path
          d={`M${cx - 44} ${oben - 2} L${cx - 10} ${fett + 60} Q${cx} ${fett + 72} ${cx + 10} ${fett + 60} L${cx + 44} ${oben - 2} Z`}
          fill={F.tief}
          stroke={F.kupfer}
          strokeWidth="8"
          strokeLinejoin="round"
        />
      </Hautblock>
      <Pfeil d={`M${cx - 56} ${oben - 26} L${cx - 96} ${oben - 26}`} farbe={F.leise} breite={4} />
      <Pfeil d={`M${cx + 56} ${oben - 26} L${cx + 96} ${oben - 26}`} farbe={F.leise} breite={4} />

      <Etikett x={sx} y={150} anker="middle" farbe={F.kupferHell}>
        Schürfwunde
      </Etikett>
      <Unterzeile x={sx} y={182} anker="middle">
        nur oberste Schicht
      </Unterzeile>
      <Etikett x={cx} y={150} anker="middle" farbe={F.kupferHell}>
        Schnittwunde
      </Etikett>
      <Unterzeile x={cx} y={182} anker="middle">
        oft nähen oder kleben
      </Unterzeile>

      <Unterzeile x={660} y={372} anker="end" farbe={F.linie}>
        Lederhaut
      </Unterzeile>
      <Unterzeile x={660} y={520} anker="end" farbe={F.linie}>
        Fettgewebe
      </Unterzeile>
    </Zeichnung>
  );
}
