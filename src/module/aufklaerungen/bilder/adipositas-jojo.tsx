import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Nach einer Diät steigt der Hunger, das Gewicht kehrt zurück: Der Körper verteidigt sein Gewicht. */
export default function AdipositasJojo() {
  return (
    <Zeichnung titel="Verlauf über die Zeit: Während einer Diät sinkt das Gewicht, gleichzeitig steigen Hunger und Appetit und bleiben danach hoch. Das Gewicht steigt wieder an – der Körper verteidigt sein Gewicht">
      {/* Diätphase */}
      <rect x="200" y="140" width="180" height="380" fill={F.petrolDunkel} opacity="0.7" />
      <Etikett x={290} y={126} anker="middle">
        Diät
      </Etikett>

      {/* Achsen */}
      <path d="M80 130 L80 520 L670 520" {...KONTUR} stroke={F.leise} strokeWidth={3} />
      <Unterzeile x={670} y={556} anker="end">
        Zeit
      </Unterzeile>

      {/* Gewicht */}
      <path d="M80 220 L200 220 C260 230 320 320 380 330 C460 340 540 250 660 228" {...KONTUR} stroke={F.petrolHell} strokeWidth={7} />
      <Etikett x={660} y={204} anker="end">
        Gewicht
      </Etikett>

      {/* Hunger und Appetit */}
      <path d="M80 460 L200 460 C260 456 320 392 380 384 C460 376 560 380 660 386" {...KONTUR} stroke={F.kupfer} strokeWidth={7} />
      <Etikett x={660} y={436} anker="end" farbe={F.kupferHell}>
        Hunger und Appetit
      </Etikett>

      <Etikett x={40} y={620}>
        Der Körper verteidigt sein Gewicht
      </Etikett>
      <Unterzeile x={40} y={652}>
        Darum ist das Halten so schwer
      </Unterzeile>
    </Zeichnung>
  );
}
