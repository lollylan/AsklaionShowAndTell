import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Beine der Zecke: Strecken [x1, y1, x2, y2], links; rechts gespiegelt um die Körpermitte. */
const BEINE: [number, number, number, number][] = [
  [140, 312, 108, 290],
  [136, 330, 100, 324],
  [138, 348, 102, 362],
  [144, 364, 116, 396],
];
const MITTE = 172;

/** Links: Zecke hautnah mit der Pinzette fassen und gerade herausziehen. Rechts: Wanderröte von oben. */
export default function Zeckenstich() {
  return (
    <Zeichnung titel="Links eine Zecke, die mit dem Kopf in der Haut steckt; eine Pinzette fasst sie direkt an der Haut, ein Pfeil zeigt gerade nach oben. Rechts ein Hautstück von oben mit einem roten Ring um die Einstichstelle, der Wanderröte">
      {/* Haut im Schnitt */}
      <rect x="40" y="424" width="290" height="110" rx="12" fill={F.petrol} />
      <path d="M40 424 L330 424" {...KONTUR} />

      {/* Zecke */}
      <g stroke={F.linie} strokeWidth="3" strokeLinecap="round">
        {BEINE.map(([x1, y1, x2, y2]) => (
          <g key={`${x1}-${y1}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} />
            <line x1={2 * MITTE - x1} y1={y1} x2={2 * MITTE - x2} y2={y2} />
          </g>
        ))}
      </g>
      <ellipse cx={MITTE} cy="336" rx="38" ry="50" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      <ellipse cx="180" cy="400" rx="11" ry="15" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      <path d="M182 414 L186 448" stroke={F.linie} strokeWidth="5" strokeLinecap="round" />

      {/* Pinzette, fasst direkt an der Haut */}
      <path d="M176 420 L262 272 L352 168" {...KONTUR} stroke={F.leise} strokeWidth={6} />
      <path d="M196 420 L292 288 L360 176" {...KONTUR} stroke={F.leise} strokeWidth={6} />
      <path d="M352 168 L360 176" {...KONTUR} stroke={F.leise} strokeWidth={6} />

      <Pfeil d="M86 390 L86 250" farbe={F.linie} breite={6} />

      {/* Hautstück von oben mit Wanderröte */}
      <circle cx="535" cy="330" r="150" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <circle cx="535" cy="330" r="96" fill={F.kupferHell} fillOpacity="0.18" />
      <circle cx="535" cy="330" r="108" fill="none" stroke={F.kupfer} strokeWidth="30" />
      <circle cx="535" cy="330" r="8" fill={F.kupfer} />

      {/* Größe: meist über 5 cm */}
      <path d="M427 512 L643 512 M427 500 L427 524 M643 500 L643 524" {...KONTUR} stroke={F.leise} strokeWidth={3} />
      <Unterzeile x={535} y={552} anker="middle">
        meist größer als 5 cm
      </Unterzeile>

      <Etikett x={185} y={66} anker="middle">
        Zecke entfernen
      </Etikett>
      <Unterzeile x={185} y={98} anker="middle">
        hautnah fassen, gerade ziehen
      </Unterzeile>
      <Etikett x={535} y={66} anker="middle" farbe={F.kupferHell}>
        Wanderröte
      </Etikett>
      <Unterzeile x={535} y={98} anker="middle">
        Tage bis Wochen später
      </Unterzeile>

      <Etikett x={360} y={640} anker="middle" farbe={F.kupferHell}>
        Wanderröte? Bitte in die Praxis kommen
      </Etikett>
    </Zeichnung>
  );
}
