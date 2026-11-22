import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Medikamente werden in Stufen gesteigert; das Befinden sackt anfangs etwas ab und wird dann besser. */
export default function HerzschwaecheMedikamente() {
  return (
    <Zeichnung titel="Oben eine Treppe: Die Dosis der Herzmedikamente wird Schritt für Schritt erhöht. Darunter eine Kurve des Befindens: anfangs etwas matter, dann meist deutlich besser als vorher">
      <Etikett x={40} y={58}>
        Die Dosis steigt Schritt für Schritt
      </Etikett>
      <Unterzeile x={40} y={90}>
        etwa alle zwei bis vier Wochen
      </Unterzeile>

      {/* Treppe der Dosis */}
      <path d="M80 300 L80 270 L220 270 L220 220 L360 220 L360 170 L500 170 L500 124 L660 124 L660 300 Z" fill={F.petrol} />
      <path
        d="M80 270 L220 270 L220 220 L360 220 L360 170 L500 170 L500 124 L660 124"
        fill="none"
        stroke={F.petrolHell}
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line x1="80" y1="300" x2="660" y2="300" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />

      {/* Befinden */}
      <Etikett x={40} y={378}>
        So fühlen Sie sich
      </Etikett>
      <line x1="80" y1="470" x2="660" y2="470" stroke={F.leise} strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" />
      <path
        d="M80 470 C140 470 170 536 240 534 C330 532 420 430 660 404"
        fill="none"
        stroke={F.linie}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="236" cy="534" r="9" fill={F.kupferHell} />
      <circle cx="640" cy="406" r="9" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />

      <Unterzeile x={236} y={580} anker="middle" farbe={F.kupferHell}>
        anfangs oft matter
      </Unterzeile>
      <Unterzeile x={640} y={376} anker="end" farbe={F.linie}>
        dann meist besser
      </Unterzeile>

      <Pfeil d="M80 640 L640 640" farbe={F.leise} breite={3} />
      <Unterzeile x={80} y={680}>
        Wochen und Monate
      </Unterzeile>
    </Zeichnung>
  );
}
