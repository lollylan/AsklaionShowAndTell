import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

// Fluss-Volumen-Kurve beim kräftigen Ausatmen. Nach oben: wie schnell die Luft strömt,
// nach rechts: wie viel Luft schon draußen ist.
const GESUND = 'M100 560 C105 360 120 210 155 195 C185 185 210 220 590 560';
const ENG = 'M100 560 C104 420 115 340 140 330 C170 320 180 420 300 480 C380 520 440 545 500 560';

/** Spirometrie-Kurve: gesund und bei engen Atemwegen. */
export default function Lungenfunktion() {
  return (
    <Zeichnung titel="Lungenfunktionskurve: Bei gesunder Lunge steigt der Luftstrom steil an und fällt fast gerade ab; bei engen Atemwegen ist die Kurve niedriger, hängt nach innen durch und endet früher">
      {/* Achsen */}
      <Pfeil d="M100 560 L100 118" farbe={F.leise} breite={4} />
      <Pfeil d="M100 560 L650 560" farbe={F.leise} breite={4} />

      <path d={GESUND} {...KONTUR} strokeWidth="5" />
      <path d={ENG} {...KONTUR} stroke={F.kupferHell} strokeWidth="5" />

      <Unterzeile x={120} y={128}>
        Luftstrom
      </Unterzeile>
      <Unterzeile x={650} y={600} anker="end">
        ausgeatmete Luftmenge
      </Unterzeile>

      <Etikett x={300} y={190}>
        Gesund
      </Etikett>
      <Unterzeile x={300} y={222}>
        steil, dann fast gerade
      </Unterzeile>

      <Zeiger von={[200, 618]} nach={[229, 430]} />
      <Etikett x={110} y={650} farbe={F.kupferHell}>
        Enge Atemwege
      </Etikett>
      <Unterzeile x={110} y={682}>
        Kurve hängt durch
      </Unterzeile>
    </Zeichnung>
  );
}
