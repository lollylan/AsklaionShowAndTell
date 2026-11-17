import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Skala von HbA1c 5,0 bis 7,5 % auf x = 40 … 680. */
function x(wert: number) {
  return 40 + ((wert - 5) / 2.5) * 640;
}

const OBEN = 230;
const UNTEN = 310;

/** Langzeitzucker als Band: normal, Vorstufe, Diabetes; ein Pfeil zeigt den Weg zurück. */
export default function Praediabetes() {
  return (
    <Zeichnung titel="Band für den Langzeitzucker HbA1c mit drei Bereichen: normal unter 5,7 Prozent, Vorstufe von 5,7 bis 6,4 Prozent, Diabetes ab 6,5 Prozent; eine Markierung liegt in der Vorstufe, ein Pfeil führt zurück in den Normalbereich">
      <defs>
        <clipPath id="praediabetes-band">
          <rect x={x(5)} y={OBEN} width={x(7.5) - x(5)} height={UNTEN - OBEN} rx="24" />
        </clipPath>
      </defs>

      <g transform="translate(0 50)">
        <Etikett x={40} y={90}>
          Langzeitzucker HbA1c
        </Etikett>

        {/* Band in drei Bereichen */}
        <g clipPath="url(#praediabetes-band)">
          <rect x={x(5)} y={OBEN} width={x(5.7) - x(5)} height={UNTEN - OBEN} fill={F.petrol} />
          <rect x={x(5.7)} y={OBEN} width={x(6.5) - x(5.7)} height={UNTEN - OBEN} fill={F.kupferHell} />
          <rect x={x(6.5)} y={OBEN} width={x(7.5) - x(6.5)} height={UNTEN - OBEN} fill={F.kupfer} />
        </g>
        <rect x={x(5)} y={OBEN} width={x(7.5) - x(5)} height={UNTEN - OBEN} rx="24" {...KONTUR} />
        <path d={`M${x(5.7)} ${OBEN} L${x(5.7)} ${UNTEN} M${x(6.5)} ${OBEN} L${x(6.5)} ${UNTEN}`} {...KONTUR} />

        {/* Grenzwerte über dem Band */}
        <Unterzeile x={x(5.7)} y={210} anker="middle" farbe={F.linie}>
          5,7 %
        </Unterzeile>
        <Unterzeile x={x(6.5)} y={210} anker="middle" farbe={F.linie}>
          6,5 %
        </Unterzeile>

        {/* Markierung: Wert liegt in der Vorstufe */}
        <path
          d={`M${x(6.05) - 16} 160 L${x(6.05) + 16} 160 L${x(6.05)} 192 Z`}
          fill={F.creme}
          stroke={F.linie}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Namen der Bereiche */}
        <Etikett x={(x(5) + x(5.7)) / 2} y={360} anker="middle">
          Normal
        </Etikett>
        <Etikett x={(x(5.7) + x(6.5)) / 2} y={360} anker="middle" farbe={F.kupferHell}>
          Vorstufe
        </Etikett>
        <Etikett x={(x(6.5) + x(7.5)) / 2} y={360} anker="middle" farbe={F.kupferHell}>
          Diabetes
        </Etikett>

        {/* Weg zurück */}
        <Pfeil d={`M${x(6.1)} 400 Q${x(5.7)} 500 ${x(5.3)} 412`} farbe={F.petrolHell} breite={6} />
        <Etikett x={360} y={580} anker="middle">
          Zurück ist oft möglich
        </Etikett>
      </g>
    </Zeichnung>
  );
}
