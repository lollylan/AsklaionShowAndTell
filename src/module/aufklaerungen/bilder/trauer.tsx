import { Etikett, F, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const GRUND = 420;

/** Wellen der Trauer: Mitte und Höhe. Die fünfte ist ein Jahrestag. */
const WELLEN: [number, number][] = [
  [130, 230],
  [210, 180],
  [290, 130],
  [370, 95],
  [450, 150],
  [530, 60],
  [610, 42],
];
const JAHRESTAG = 4;

function welle(mitte: number, hoehe: number) {
  const k = Math.round((hoehe * 4) / 3);
  return `M${mitte - 40} ${GRUND} C${mitte - 34} ${GRUND - k} ${mitte + 34} ${GRUND - k} ${mitte + 40} ${GRUND}`;
}

/** Trauer kommt in Wellen, mit der Zeit meist seltener und sanfter, an Jahrestagen wieder höher. */
export default function Trauer() {
  return (
    <Zeichnung titel="Trauer im Verlauf der Zeit: Wellen, die nach dem Verlust hoch sind, mit der Zeit meist flacher werden und an Jahrestagen wieder höher schlagen">
      {WELLEN.map(([mitte, hoehe], i) => (
        <path
          key={mitte}
          d={`${welle(mitte, hoehe)} Z`}
          fill={i === JAHRESTAG ? F.kupfer : F.petrol}
          stroke={F.linie}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      ))}

      <Pfeil d={`M80 ${GRUND} L668 ${GRUND}`} farbe={F.leise} breite={4} />
      <Unterzeile x={90} y={GRUND + 40}>
        Verlust
      </Unterzeile>
      <Unterzeile x={670} y={GRUND + 40} anker="end">
        Zeit
      </Unterzeile>

      <Zeiger von={[552, 228]} nach={[456, 274]} />
      <Etikett x={560} y={226} farbe={F.kupferHell}>
        Jahrestage
      </Etikett>

      <Etikett x={360} y={80} anker="middle">
        Trauer kommt in Wellen
      </Etikett>
      <Unterzeile x={360} y={114} anker="middle">
        mit der Zeit meist seltener und sanfter
      </Unterzeile>

      <Etikett x={360} y={570} anker="middle">
        Jede Trauer hat ihr eigenes Tempo
      </Etikett>
    </Zeichnung>
  );
}
