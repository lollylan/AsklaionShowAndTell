import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const KOERPER = 'M40 330 Q360 250 680 330 L680 690 L40 690 Z';
const SCHALLKOPF =
  'M318 196 Q318 180 334 176 L344 82 Q360 64 376 82 L386 176 Q402 180 402 196 L402 276 Q402 290 388 290 L332 290 Q318 290 318 276 Z';

/** Schallwellen als Bögen um die Mitte des Schallkopfs (360 / 300), im Winkel des Schallfächers. */
function Welle({ r }: { r: number }) {
  const dx = Math.round(r * 0.447);
  const dy = Math.round(r * 0.894);
  return (
    <path
      d={`M${360 - dx} ${300 + dy} A${r} ${r} 0 0 0 ${360 + dx} ${300 + dy}`}
      fill="none"
      stroke={F.linie}
      strokeWidth="4"
      strokeLinecap="round"
    />
  );
}

/** Schallkopf auf dem Bauch, Schallwellen dringen ein, das Echo der Leber kommt zurück. */
export default function Ultraschall() {
  return (
    <Zeichnung titel="Schnitt durch die Bauchdecke: Der Schallkopf liegt mit etwas Gel auf der Haut, Schallwellen laufen fächerförmig in den Bauch bis zur Leber, das Echo kommt zum Schallkopf zurück">
      <defs>
        <clipPath id="ultraschall-koerper">
          <path d={KOERPER} />
        </clipPath>
      </defs>

      {/* Bauch mit Leber und Schallfächer */}
      <path d={KOERPER} fill={F.petrol} />
      <ellipse cx="380" cy="575" rx="170" ry="75" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <g clipPath="url(#ultraschall-koerper)">
        <path d="M330 300 L176 690 L544 690 L390 300 Z" fill={F.petrolHell} fillOpacity="0.3" />
        <Welle r={110} />
        <Welle r={180} />
      </g>
      <path d="M40 330 Q360 250 680 330" {...KONTUR} />
      <Pfeil d="M432 488 L414 384" farbe={F.kupferHell} breite={6} />

      {/* Gel und Schallkopf */}
      <ellipse cx="360" cy="292" rx="52" ry="8" fill={F.leise} />
      <path d={SCHALLKOPF} fill={F.creme} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d="M360 66 Q360 40 380 24" {...KONTUR} stroke={F.leise} />

      <Zeiger von={[432, 128]} nach={[392, 196]} />
      <Etikett x={442} y={126}>
        Schallkopf
      </Etikett>
      <Unterzeile x={442} y={158}>
        gleitet auf Gel
      </Unterzeile>

      <Zeiger von={[214, 250]} nach={[315, 398]} />
      <Etikett x={40} y={232}>
        Schallwellen
      </Etikett>
      <Unterzeile x={40} y={264}>
        nicht hörbar
      </Unterzeile>

      <Etikett x={700} y={428} anker="end" farbe={F.kupferHell}>
        Echo wird zum Bild
      </Etikett>

      <Etikett x={380} y={600} anker="middle">
        Leber
      </Etikett>
    </Zeichnung>
  );
}
