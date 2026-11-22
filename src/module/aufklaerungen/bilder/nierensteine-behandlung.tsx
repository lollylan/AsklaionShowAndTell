import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Harnleiter als Röhre: helle Kontur, darin der Urin. */
function Harnleiter({ x }: { x: number }) {
  const d = `M${x} 160 L${x} 520`;
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={F.linie} strokeWidth="34" />
      <path d={d} stroke={F.petrolHell} strokeWidth="26" />
    </g>
  );
}

/** Kleiner Stein geht von selbst ab, großer wird zertrümmert oder entfernt. */
export default function NierensteineBehandlung() {
  return (
    <Zeichnung titel="Zwei Harnleiter: Links rutscht ein kleiner Stein bis etwa fünf Millimeter von selbst nach unten. Rechts steckt ein großer Stein fest und wird mit Stoßwellen von außen zertrümmert oder bei einer Spiegelung entfernt">
      <Harnleiter x={190} />
      <Harnleiter x={500} />

      {/* Kleiner Stein, wandert nach unten */}
      <path
        d="M182 300 L194 296 L202 306 L198 318 L186 320 L178 310 Z"
        fill={F.kupfer}
        stroke={F.kupferHell}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Pfeil d="M246 280 L246 440" farbe={F.linie} />

      {/* Großer Stein, staut den Harnleiter */}
      <ellipse cx="500" cy="330" rx="42" ry="50" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <path
        d="M478 304 L504 292 L528 306 L532 336 L516 360 L488 362 L470 340 Z"
        fill={F.kupfer}
        stroke={F.kupferHell}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Stoßwellen von außen */}
      <g fill="none" stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round">
        <path d="M584 290 A60 60 0 0 1 584 370" />
        <path d="M612 270 A90 90 0 0 1 612 390" />
        <path d="M640 250 A120 120 0 0 1 640 410" />
      </g>

      <Etikett x={190} y={86} anker="middle">
        Bis etwa 5 mm
      </Etikett>
      <Unterzeile x={190} y={118} anker="middle">
        geht meist von selbst ab
      </Unterzeile>
      <Etikett x={500} y={86} anker="middle" farbe={F.kupferHell}>
        Großer Stein
      </Etikett>
      <Unterzeile x={500} y={118} anker="middle">
        Stoßwellen oder Spiegelung
      </Unterzeile>

      <Unterzeile x={190} y={590} anker="middle">
        Tamsulosin kann den
      </Unterzeile>
      <Unterzeile x={190} y={618} anker="middle">
        Abgang erleichtern
      </Unterzeile>
      <Unterzeile x={500} y={590} anker="middle">
        Stoßwellen zertrümmern
      </Unterzeile>
      <Unterzeile x={500} y={618} anker="middle">
        den Stein von außen
      </Unterzeile>
    </Zeichnung>
  );
}
