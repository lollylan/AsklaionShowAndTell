import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

interface Stufe {
  name: string;
  bereich: string;
  text: string;
  /** typischer Wert der Stufe, bestimmt die Balkenlänge */
  wert: number;
  farbe: string;
}

const STUFEN: Stufe[] = [
  { name: 'G1', bereich: 'ab 90', text: 'normal', wert: 96, farbe: F.petrol },
  { name: 'G2', bereich: '60 bis 89', text: 'leicht eingeschränkt', wert: 75, farbe: F.petrolHell },
  { name: 'G3a', bereich: '45 bis 59', text: 'mäßig eingeschränkt', wert: 52, farbe: F.leise },
  { name: 'G3b', bereich: '30 bis 44', text: 'deutlich eingeschränkt', wert: 37, farbe: F.kupferHell },
  { name: 'G4', bereich: '15 bis 29', text: 'stark eingeschränkt', wert: 22, farbe: F.kupfer },
  { name: 'G5', bereich: 'unter 15', text: 'Nierenversagen', wert: 10, farbe: F.kupfer },
];

const START = 100;
const PRO_ML = 2.9;
const OBEN = 104;
const ZEILE = 92;
const HOEHE = 56;
const TEXT_X = 400;
/** Länge des vollen Balkens (gesunde Niere), als dunkle Spur hinter jedem Balken. */
const VOLL = 96 * PRO_ML;

/** Die Stufen der Nierenleistung (eGFR) als Balken: je kürzer, desto weniger filtert die Niere. */
export default function EgfrStufen() {
  return (
    <Zeichnung titel="Die sechs Stufen der Nierenleistung als Balken, von G1 mit 90 und mehr Millilitern pro Minute (normal) bis G5 unter 15 (Nierenversagen); je kürzer der Balken, desto weniger filtert die Niere.">
      <Etikett x={360} y={60} anker="middle">
        Nierenleistung (eGFR) in ml/min
      </Etikett>

      {STUFEN.map((s, i) => {
        const y = OBEN + i * ZEILE;
        const laenge = s.wert * PRO_ML;
        return (
          <g key={s.name}>
            <Etikett x={START - 18} y={y + HOEHE / 2 + 9} anker="end">
              {s.name}
            </Etikett>
            <rect x={START} y={y} width={VOLL} height={HOEHE} rx="12" fill={F.tief} />
            <rect
              x={START}
              y={y}
              width={laenge}
              height={HOEHE}
              rx="12"
              fill={s.farbe}
              stroke={F.linie}
              strokeWidth="3"
            />
            <Etikett x={TEXT_X} y={y + 24} farbe={i >= 3 ? F.kupferHell : F.linie}>
              {s.bereich}
            </Etikett>
            <Unterzeile x={TEXT_X} y={y + 52}>
              {s.text}
            </Unterzeile>
          </g>
        );
      })}

      <Unterzeile x={360} y={676} anker="middle">
        Je kürzer der Balken, desto weniger filtert die Niere
      </Unterzeile>
    </Zeichnung>
  );
}
