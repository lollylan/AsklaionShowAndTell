import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Stationen auf dem Weg von gesund bis eingeschränkt; Kur setzt vorher an, Reha danach. */
const STATIONEN = [
  { x: 100, text: 'gesund', farbe: F.petrolHell },
  { x: 260, text: 'gefährdet', farbe: F.kupferHell },
  { x: 440, text: 'krank', farbe: F.kupfer },
  { x: 610, text: 'eingeschränkt', farbe: F.kupfer },
];

const LINIE = 360;

function Kasten({ x, titel, zeile, farbe }: { x: number; titel: string; zeile: string; farbe: string }) {
  return (
    <g>
      <rect x={x - 115} y={130} width={230} height={110} rx="18" fill={farbe} stroke={F.linie} strokeWidth="4" />
      <text x={x} y={180} textAnchor="middle" fontSize="34" fontWeight="700" fill={F.linie}>
        {titel}
      </text>
      <Unterzeile x={x} y={216} anker="middle" farbe={F.linie}>
        {zeile}
      </Unterzeile>
    </g>
  );
}

/** Kur und Reha auf dem Weg von gesund über gefährdet zu krank; darunter, wer meist bezahlt. */
export default function KurOderReha() {
  return (
    <Zeichnung titel="Ein Weg von gesund über gefährdet und krank bis eingeschränkt: die Kur setzt an, wenn die Gesundheit gefährdet ist, die Reha, wenn eine Krankheit einschränkt. Die Kur zahlt die Krankenkasse, die Reha meist die Rentenversicherung">
      <Kasten x={260} titel="Kur" zeile="vorbeugen" farbe={F.petrolDunkel} />
      <Kasten x={590} titel="Reha" zeile="wieder fit werden" farbe={F.petrol} />
      <Pfeil d={`M260 248 L260 ${LINIE - 30}`} farbe={F.leise} breite={4} />
      <Pfeil d={`M600 248 L610 ${LINIE - 30}`} farbe={F.leise} breite={4} />

      <Etikett x={40} y={70}>
        Wann hilft was?
      </Etikett>

      {/* Der Weg */}
      <line x1={60} y1={LINIE} x2={660} y2={LINIE} stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
      {STATIONEN.map((s) => (
        <g key={s.text}>
          <circle cx={s.x} cy={LINIE} r="20" fill={s.farbe} stroke={F.linie} strokeWidth="4" />
          <Unterzeile x={s.x} y={LINIE + 52} anker="middle" farbe={F.linie}>
            {s.text}
          </Unterzeile>
        </g>
      ))}

      {/* Wer zahlt */}
      <line x1={40} y1={480} x2={680} y2={480} stroke={F.petrolHell} strokeWidth="2" />
      <Etikett x={40} y={530}>
        Kur:
      </Etikett>
      <Unterzeile x={130} y={530} farbe={F.linie}>
        zahlt die Krankenkasse
      </Unterzeile>
      <Etikett x={40} y={590}>
        Reha:
      </Etikett>
      <Unterzeile x={130} y={590} farbe={F.linie}>
        berufstätig: Rentenversicherung
      </Unterzeile>
      <Unterzeile x={130} y={622} farbe={F.linie}>
        in Rente: Krankenkasse
      </Unterzeile>
      <Unterzeile x={130} y={654}>
        nach Arbeitsunfall: Unfallversicherung
      </Unterzeile>
    </Zeichnung>
  );
}
