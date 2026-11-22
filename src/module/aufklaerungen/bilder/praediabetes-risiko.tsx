import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Kleine Person, Mittelpunkt des Kopfes bei (x, y). */
function Person({ x, y, krank }: { x: number; y: number; krank: boolean }) {
  const farbe = krank ? F.kupfer : F.petrolHell;
  return (
    <g fill={farbe}>
      <circle cx={x} cy={y} r="11" />
      <path d={`M${x - 18} ${y + 50} L${x - 18} ${y + 30} Q${x - 18} ${y + 16} ${x} ${y + 16} Q${x + 18} ${y + 16} ${x + 18} ${y + 30} L${x + 18} ${y + 50} Z`} />
    </g>
  );
}

/** 20 Personen in zwei Reihen, die ersten `krank` in Kupfer. */
function Gruppe({ y, krank }: { y: number; krank: number }) {
  return (
    <g>
      {Array.from({ length: 20 }, (_, i) => (
        <Person key={i} x={80 + (i % 10) * 62} y={y + Math.floor(i / 10) * 76} krank={i < krank} />
      ))}
    </g>
  );
}

/** Lebensstil halbiert etwa das Risiko, aus einem Prädiabetes einen Diabetes zu bekommen. */
export default function PraediabetesRisiko() {
  return (
    <Zeichnung titel="Zwei Gruppen mit je 20 Menschen mit Prädiabetes. Ohne Änderung bekommen in etwa drei Jahren 6 von 20 einen Diabetes, mit Bewegung und Abnehmen nur etwa 3 von 20. Das Risiko halbiert sich etwa">
      <Unterzeile x={40} y={56}>
        So viele bekommen in drei Jahren Diabetes
      </Unterzeile>

      <Etikett x={40} y={128}>
        Ohne Änderung
      </Etikett>
      <Etikett x={680} y={128} anker="end" farbe={F.kupferHell}>
        6 von 20
      </Etikett>
      <Gruppe y={170} krank={6} />

      <Etikett x={40} y={390}>
        Mit Bewegung und Abnehmen
      </Etikett>
      <Etikett x={680} y={390} anker="end" farbe={F.kupferHell}>
        3 von 20
      </Etikett>
      <Gruppe y={432} krank={3} />

      <Etikett x={40} y={652}>
        Das Risiko halbiert sich etwa
      </Etikett>
      <Unterzeile x={40} y={682}>
        Ergebnis großer Studien
      </Unterzeile>
    </Zeichnung>
  );
}
