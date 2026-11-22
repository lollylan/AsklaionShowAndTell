import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const MITTE: [number, number] = [360, 350];
const STELLEN: { x: number; y: number; titel: string; zeile: string }[] = [
  { x: 170, y: 190, titel: 'Familie, Freunde', zeile: 'Menschen, die da sind' },
  { x: 550, y: 190, titel: 'Hausarztpraxis', zeile: 'Gespräch, Körper' },
  { x: 170, y: 510, titel: 'Trauergruppe', zeile: 'Hospizverein, Gemeinde' },
  { x: 550, y: 510, titel: 'Psychotherapie', zeile: 'wenn sie nicht nachlässt' },
];

/** Wer in der Trauer begleiten kann. */
export default function TrauerHalt() {
  return (
    <Zeichnung titel="Ein Mensch in der Mitte, um ihn herum vier Stellen, die in der Trauer begleiten: Familie und Freunde, die Hausarztpraxis, Trauergruppen von Hospizverein oder Gemeinde und, wenn die Trauer nicht nachlässt, eine Psychotherapie">
      <Etikett x={360} y={64} anker="middle">
        Sie müssen nicht allein sein
      </Etikett>

      {STELLEN.map((s) => (
        <line
          key={s.titel}
          x1={MITTE[0]}
          y1={MITTE[1]}
          x2={s.x}
          y2={s.y}
          stroke={F.leise}
          strokeWidth="3"
          strokeDasharray="10 10"
          strokeLinecap="round"
        />
      ))}

      {/* Mensch in der Mitte */}
      <circle cx={MITTE[0]} cy={MITTE[1]} r="70" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <circle cx={360} cy={326} r="20" fill={F.kupferHell} />
      <path d="M322 392 C324 364 340 352 360 352 C380 352 396 364 398 392 Z" fill={F.kupferHell} />

      {STELLEN.map((s, i) => (
        <g key={s.titel}>
          <circle cx={s.x} cy={s.y} r="16" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
          <Etikett x={s.x} y={i < 2 ? s.y - 58 : s.y + 52} anker="middle">
            {s.titel}
          </Etikett>
          <Unterzeile x={s.x} y={i < 2 ? s.y - 28 : s.y + 82} anker="middle">
            {s.zeile}
          </Unterzeile>
        </g>
      ))}
    </Zeichnung>
  );
}
