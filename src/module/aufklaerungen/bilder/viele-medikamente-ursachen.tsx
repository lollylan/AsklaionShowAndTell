import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Tabletten und Kapseln, die sich in der Mitte sammeln. */
const TABLETTEN: [number, number, string][] = [
  [330, 340, F.petrolHell],
  [380, 330, F.creme],
  [420, 370, F.petrolHell],
  [350, 392, F.kupferHell],
  [300, 384, F.creme],
  [400, 420, F.creme],
];
const KAPSELN: [number, number, number, string][] = [
  [360, 296, -20, F.kupferHell],
  [440, 330, 40, F.creme],
  [290, 430, 10, F.petrolHell],
  [356, 446, -50, F.kupferHell],
];

/** Mehrere Stellen verschreiben oder verkaufen Medikamente, oft ohne voneinander zu wissen. */
export default function VieleMedikamenteUrsachen() {
  return (
    <Zeichnung titel="Vier Quellen für Medikamente – Hausarztpraxis, Fachärzte, Krankenhaus und selbst Gekauftes – zeigen mit Pfeilen auf einen Haufen Tabletten in der Mitte. Oft weiß keiner vom anderen">
      <Etikett x={360} y={58} anker="middle">
        Oft weiß keiner vom anderen
      </Etikett>

      <Pfeil d="M190 200 L276 290" farbe={F.leise} />
      <Pfeil d="M530 200 L446 290" farbe={F.leise} />
      <Pfeil d="M190 540 L270 460" farbe={F.leise} />
      <Pfeil d="M530 540 L452 460" farbe={F.kupferHell} />

      <circle cx="360" cy="376" r="118" fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" strokeDasharray="10 10" />
      {KAPSELN.map(([x, y, w, farbe]) => (
        <g key={`${x}-${y}`} transform={`rotate(${w} ${x} ${y})`}>
          <rect x={x - 30} y={y - 13} width="60" height="26" rx="13" fill={farbe} stroke={F.linie} strokeWidth="3" />
          <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke={F.linie} strokeWidth="3" />
        </g>
      ))}
      {TABLETTEN.map(([x, y, farbe]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="20" fill={farbe} stroke={F.linie} strokeWidth="3" />
      ))}

      <Etikett x={160} y={150} anker="middle">
        Hausarztpraxis
      </Etikett>
      <Etikett x={560} y={150} anker="middle">
        Fachärzte
      </Etikett>
      <Etikett x={160} y={590} anker="middle">
        Krankenhaus
      </Etikett>
      <Etikett x={560} y={590} anker="middle" farbe={F.kupferHell}>
        Selbst gekauft
      </Etikett>
      <Unterzeile x={560} y={622} anker="middle">
        auch Pflanzliches
      </Unterzeile>
    </Zeichnung>
  );
}
