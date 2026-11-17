import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Wegweiser mit drei Schildern: Hausarztpraxis, 116117 und 112. */
export default function NotrufOderBereitschaftsdienst() {
  return (
    <Zeichnung titel="Wegweiser mit drei Schildern: Bei Lebensgefahr der Notruf 112, nachts und am Wochenende der ärztliche Bereitschaftsdienst 116117, zu den Sprechzeiten die eigene Hausarztpraxis">
      {/* Pfosten und Boden */}
      <rect x={346} y={96} width={28} height={560} rx="6" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <line x1={250} y1={656} x2={470} y2={656} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />

      {/* 112 */}
      <path
        d="M336 120 L630 120 L684 175 L630 230 L336 230 Z"
        fill={F.kupfer}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Etikett x={366} y={166} farbe={F.tief}>
        112
      </Etikett>
      <Unterzeile x={366} y={204} farbe={F.tief}>
        bei Lebensgefahr
      </Unterzeile>

      {/* 116117 */}
      <path
        d="M384 290 L90 290 L36 345 L90 400 L384 400 Z"
        fill={F.petrol}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Etikett x={96} y={336}>
        116117
      </Etikett>
      <Unterzeile x={96} y={374} farbe={F.linie}>
        nachts, am Wochenende
      </Unterzeile>

      {/* Hausarztpraxis */}
      <path
        d="M336 460 L630 460 L684 515 L630 570 L336 570 Z"
        fill={F.petrolDunkel}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Etikett x={366} y={506}>
        Ihre Hausarztpraxis
      </Etikett>
      <Unterzeile x={366} y={544} farbe={F.linie}>
        zu den Sprechzeiten
      </Unterzeile>
    </Zeichnung>
  );
}
