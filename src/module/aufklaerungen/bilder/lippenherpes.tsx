import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Bläschen als [x, y, r], relativ zu einer Mitte. */
const BLAESCHEN: [number, number, number][] = [
  [-22, -8, 11],
  [0, -14, 12],
  [22, -6, 10],
  [-10, 12, 10],
  [12, 12, 11],
  [32, 12, 8],
];

function Blaeschen({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g>
      <ellipse cx={x + 4 * s} cy={y} rx={50 * s} ry={34 * s} fill={F.kupfer} fillOpacity="0.85" />
      {BLAESCHEN.map(([dx, dy, r]) => (
        <circle
          key={`${dx}-${dy}`}
          cx={x + dx * s}
          cy={y + dy * s}
          r={r * s}
          fill={F.creme}
          fillOpacity="0.9"
          stroke={F.kupferHell}
          strokeWidth="2"
        />
      ))}
    </g>
  );
}

const STUFEN = [
  { x: 120, name: 'Kribbeln' },
  { x: 280, name: 'Bläschen' },
  { x: 440, name: 'Kruste' },
  { x: 600, name: 'abgeheilt' },
];
const SY = 500; // Mitte der Stufen

/** Lippen von vorn mit Bläschengruppe, darunter der Verlauf in vier Stufen. */
export default function Lippenherpes() {
  return (
    <Zeichnung titel="Lippen von vorn mit einer Gruppe kleiner Bläschen auf rotem Grund am Lippenrand. Darunter der Verlauf in vier Stufen: erst Kribbeln und leichte Rötung, dann Bläschen, dann eine Kruste, schließlich abgeheilte Haut ohne Narbe">
      {/* Oberlippe und Unterlippe */}
      <path
        d="M150 250 C210 200 290 186 338 212 Q360 224 382 212 C430 186 510 200 570 250 C470 262 250 262 150 250 Z"
        fill={F.petrol}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M150 250 C250 262 470 262 570 250 C520 338 200 338 150 250 Z"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Blaeschen x={492} y={232} />

      <Etikett x={40} y={110} farbe={F.kupferHell}>
        Bläschen am Lippenrand
      </Etikett>
      <Zeiger von={[340, 124]} nach={[470, 214]} />

      {/* Verlauf in vier Stufen */}
      {STUFEN.slice(0, 3).map(({ x }) => (
        <Pfeil key={x} d={`M${x + 70} ${SY} L${x + 92} ${SY}`} farbe={F.leise} breite={4} />
      ))}
      {STUFEN.map(({ x }) => (
        <circle key={x} cx={x} cy={SY} r="62" fill={F.petrolHell} />
      ))}

      {/* 1: Kribbeln, leichte Rötung */}
      <ellipse cx={120} cy={SY} rx="34" ry="22" fill={F.kupfer} />
      <path d="M96 476 l8 -8 l8 8 l8 -8 l8 8 l8 -8 M100 532 l8 -8 l8 8 l8 -8 l8 8 l8 -8" fill="none" stroke={F.creme} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* 2: Bläschen */}
      <Blaeschen x={276} y={SY} s={0.8} />

      {/* 3: Kruste */}
      <ellipse cx={440} cy={SY} rx="40" ry="28" fill={F.kupfer} />
      <path
        d="M414 498 C412 480 432 470 446 476 C462 470 474 488 468 500 C474 516 452 526 438 520 C422 526 410 512 414 498 Z"
        fill={F.kupferHell}
        stroke={F.kupfer}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 4: abgeheilt – nur gesunde Haut */}

      {STUFEN.map(({ x }) => (
        <circle key={`r${x}`} cx={x} cy={SY} r="62" {...KONTUR} />
      ))}
      {STUFEN.map(({ x, name }) => (
        <Etikett key={`t${x}`} x={x} y={SY + 104} anker="middle">
          {name}
        </Etikett>
      ))}
      <Unterzeile x={360} y={SY + 160} anker="middle">
        heilt in ein bis zwei Wochen ohne Narbe
      </Unterzeile>
    </Zeichnung>
  );
}
