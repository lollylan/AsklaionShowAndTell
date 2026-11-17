import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Drei Schritte zum Facharzttermin über die Terminservicestelle. */
const SCHRITTE = [
  { titel: 'Überweisung', zeile: 'mit Dringlichkeitscode, wenn es eilt' },
  { titel: 'Terminservicestelle', zeile: '116117 – Telefon, Internet, App' },
  { titel: 'Facharzttermin', zeile: 'meist innerhalb von vier Wochen' },
];

const X = 90;
const OBEN = 230;
const ABSTAND = 180;

export default function Ueberweisung() {
  const letzte = OBEN + (SCHRITTE.length - 1) * ABSTAND;
  return (
    <Zeichnung titel="Drei Schritte zum Facharzttermin: Überweisung mit Dringlichkeitscode, Anruf bei der Terminservicestelle 116117 oder Buchung im Internet, Facharzttermin meist innerhalb von vier Wochen">
      {/* Überweisungsschein mit Code */}
      <g transform="translate(40 40)">
        <rect x={0} y={0} width={100} height={120} rx="8" fill={F.creme} stroke={F.linie} strokeWidth="4" />
        <line x1={18} y1={28} x2={82} y2={28} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
        <line x1={18} y1={48} x2={64} y2={48} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
        <rect x={16} y={74} width={68} height={28} rx="4" fill={F.kupfer} />
      </g>

      <line x1={X} y1={OBEN} x2={X} y2={letzte} stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
      {SCHRITTE.map((s, i) => {
        const y = OBEN + i * ABSTAND;
        return (
          <g key={s.titel}>
            <circle
              cx={X}
              cy={y}
              r="34"
              fill={i === SCHRITTE.length - 1 ? F.petrolHell : F.petrol}
              stroke={F.linie}
              strokeWidth="4"
            />
            <text x={X} y={y + 11} textAnchor="middle" fontSize="30" fontWeight="700" fill={F.linie}>
              {i + 1}
            </text>
            <Etikett x={X + 64} y={y - 2}>
              {s.titel}
            </Etikett>
            <Unterzeile x={X + 64} y={y + 30}>
              {s.zeile}
            </Unterzeile>
          </g>
        );
      })}
    </Zeichnung>
  );
}
