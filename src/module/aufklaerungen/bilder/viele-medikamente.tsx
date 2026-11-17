import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Zeilen des Plans: Farbe der Tablette und wann sie genommen wird (morgens, mittags, abends, nachts). */
const ZEILEN: { farbe: string; wann: number[] }[] = [
  { farbe: F.petrolHell, wann: [1, 0, 0, 0] },
  { farbe: F.petrol, wann: [1, 0, 1, 0] },
  { farbe: F.kupferHell, wann: [0, 0, 1, 0] },
  { farbe: F.petrolHell, wann: [1, 1, 1, 0] },
  { farbe: F.petrol, wann: [0, 0, 0, 1] },
  { farbe: F.petrolHell, wann: [1, 0, 0, 0] },
];
const SPALTEN = [256, 286, 316, 346];

/** Medikationsplan und eine Tüte mit allen Packungen zum Mitbringen. */
export default function VieleMedikamente() {
  return (
    <Zeichnung titel="Links ein Medikationsplan mit allen Tabletten und ihren Einnahmezeiten, rechts eine Tüte mit allen Packungen, die zur Besprechung mitgebracht werden">
      {/* Medikationsplan */}
      <rect x="80" y="160" width="310" height="430" rx="12" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <rect x="100" y="182" width="270" height="40" rx="6" fill={F.petrol} />
      {SPALTEN.map((x) => (
        <circle key={x} cx={x + 10} cy="202" r="6" fill={F.creme} />
      ))}
      {ZEILEN.map((zeile, i) => {
        const y = 250 + i * 54;
        return (
          <g key={y}>
            <rect x="104" y={y} width="42" height="20" rx="10" fill={zeile.farbe} stroke={F.petrolDunkel} strokeWidth="2" />
            <rect x="158" y={y + 6} width="76" height="8" rx="4" fill={F.leise} />
            {SPALTEN.map((x, s) => (
              <g key={x}>
                <rect x={x} y={y} width="20" height="20" rx="4" fill="none" stroke={F.petrolDunkel} strokeWidth="2" />
                {zeile.wann[s] === 1 && <circle cx={x + 10} cy={y + 10} r="5" fill={F.petrolDunkel} />}
              </g>
            ))}
          </g>
        );
      })}

      {/* Tüte mit Packungen */}
      <rect x="474" y="232" width="62" height="96" rx="4" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <rect x="540" y="254" width="48" height="74" rx="4" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <path d="M596 270 L596 248 Q596 238 606 238 L618 238 Q628 238 628 248 L628 300 L596 300 Z" fill={F.kupferHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d="M460 300 L640 300 L656 590 L444 590 Z" {...KONTUR} fill={F.petrolDunkel} />

      <Etikett x={360} y={70} anker="middle">
        Alle Medikamente im Blick
      </Etikett>
      <Unterzeile x={360} y={104} anker="middle">
        so viel wie nötig, so wenig wie möglich
      </Unterzeile>

      <Etikett x={235} y={636} anker="middle">
        Medikationsplan
      </Etikett>
      <Unterzeile x={235} y={668} anker="middle">
        immer dabeihaben
      </Unterzeile>

      <Etikett x={550} y={636} anker="middle">
        Alles mitbringen
      </Etikett>
      <Unterzeile x={550} y={668} anker="middle">
        auch Gekauftes
      </Unterzeile>
    </Zeichnung>
  );
}
