import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 40;
const RECHTS = 400;
const TX = 432; // Beginn der Beschriftung
const REIHEN = [120, 340, 560]; // Hautoberfläche je Reihe

/** Hautstreifen im Schnitt: Oberhaut, darunter Lederhaut. */
function Streifen({ y, id, children }: { y: number; id: string; children?: ReactNode }) {
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <rect x={LINKS} y={y} width={RECHTS - LINKS} height="110" rx="14" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x={LINKS} y={y} width={RECHTS - LINKS} height="36" fill={F.petrolHell} />
        <rect x={LINKS} y={y + 36} width={RECHTS - LINKS} height="74" fill={F.petrolDunkel} />
        {children}
      </g>
      <rect x={LINKS} y={y} width={RECHTS - LINKS} height="110" rx="14" {...KONTUR} />
    </g>
  );
}

/** Dunkle Pünktchen: geronnene Äderchen in der Warze. */
function Punkte({ punkte }: { punkte: [number, number][] }) {
  return (
    <g fill={F.tief}>
      {punkte.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
      ))}
    </g>
  );
}

/** Drei Warzenarten im Hautschnitt untereinander: gewöhnliche Warze, Dornwarze, Dellwarze. */
export default function Warzen() {
  const [y1, y2, y3] = REIHEN;
  const mx = 220;
  return (
    <Zeichnung titel="Drei Hautausschnitte im Schnitt untereinander: Oben eine gewöhnliche Warze, die rau und zerklüftet über die Haut hinauswächst. In der Mitte eine Dornwarze an der Fußsohle, die vom Körpergewicht nach innen gedrückt wird. Unten zwei kleine glatte Dellwarzen mit einer Delle in der Mitte">
      {/* Gewöhnliche Warze: wächst nach oben, zerklüftet */}
      <path
        d={`M${mx - 70} ${y1 + 2} C${mx - 74} ${y1 - 30} ${mx - 58} ${y1 - 38} ${mx - 50} ${y1 - 46} L${mx - 40} ${y1 - 30} L${mx - 30} ${y1 - 62} L${mx - 16} ${y1 - 38} L${mx - 4} ${y1 - 70} L${mx + 10} ${y1 - 40} L${mx + 24} ${y1 - 66} L${mx + 36} ${y1 - 36} L${mx + 50} ${y1 - 54} C${mx + 62} ${y1 - 36} ${mx + 74} ${y1 - 24} ${mx + 70} ${y1 + 2} Z`}
        fill={F.kupfer}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Streifen y={y1} id="warzen-gewoehnlich">
        <path d={`M${mx - 70} ${y1 - 2} L${mx + 70} ${y1 - 2} C${mx + 60} ${y1 + 50} ${mx - 60} ${y1 + 50} ${mx - 70} ${y1 - 2} Z`} fill={F.kupfer} />
      </Streifen>
      <Punkte punkte={[[mx - 30, y1 - 46], [mx - 4, y1 - 52], [mx + 24, y1 - 48]]} />

      {/* Dornwarze: nach innen gedrückt */}
      <Streifen y={y2} id="warzen-dorn">
        <rect x={LINKS} y={y2} width={RECHTS - LINKS} height="14" fill={F.kupferHell} fillOpacity="0.55" />
        <path d={`M${mx - 56} ${y2} L${mx + 56} ${y2} C${mx + 54} ${y2 + 60} ${mx + 22} ${y2 + 92} ${mx} ${y2 + 94} C${mx - 22} ${y2 + 92} ${mx - 54} ${y2 + 60} ${mx - 56} ${y2} Z`} fill={F.kupfer} />
        <Punkte punkte={[[mx - 26, y2 + 8], [mx - 4, y2 + 12], [mx + 18, y2 + 6], [mx + 34, y2 + 14], [mx - 40, y2 + 16]]} />
      </Streifen>
      <Pfeil d={`M${mx} ${y2 - 84} L${mx} ${y2 - 14}`} farbe={F.leise} />
      <Pfeil d={`M${mx - 80} ${y2 - 74} L${mx - 80} ${y2 - 14}`} farbe={F.leise} />
      <Pfeil d={`M${mx + 80} ${y2 - 74} L${mx + 80} ${y2 - 14}`} farbe={F.leise} />

      {/* Dellwarzen: klein, glatt, mit Delle */}
      {[
        [mx - 60, 30],
        [mx + 56, 22],
      ].map(([x, r]) => (
        <path
          key={x}
          d={`M${x - r} ${y3 + 2} C${x - r} ${y3 - r * 1.1} ${x - r * 0.4} ${y3 - r * 1.15} ${x - r * 0.2} ${y3 - r * 1.05} Q${x} ${y3 - r * 0.8} ${x + r * 0.2} ${y3 - r * 1.05} C${x + r * 0.4} ${y3 - r * 1.15} ${x + r} ${y3 - r * 1.1} ${x + r} ${y3 + 2} Z`}
          fill={F.kupferHell}
          stroke={F.linie}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      ))}
      <Streifen y={y3} id="warzen-dell" />

      <Etikett x={TX} y={y1 - 16} farbe={F.kupferHell}>
        gewöhnliche Warze
      </Etikett>
      <Unterzeile x={TX} y={y1 + 16}>
        rau, zerklüftet
      </Unterzeile>
      <Etikett x={TX} y={y2 + 24} farbe={F.kupferHell}>
        Dornwarze
      </Etikett>
      <Unterzeile x={TX} y={y2 + 56}>
        nach innen gedrückt
      </Unterzeile>
      <Etikett x={TX} y={y3 + 24} farbe={F.kupferHell}>
        Dellwarze
      </Etikett>
      <Unterzeile x={TX} y={y3 + 56}>
        Delle in der Mitte
      </Unterzeile>
    </Zeichnung>
  );
}
