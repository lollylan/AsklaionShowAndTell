import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 40;
const RECHTS = 680;
const DRITTEL = (RECHTS - LINKS) / 3;
const OBEN = 250;
const HOEHE = 84;
const G1 = LINKS + DRITTEL;
const G2 = LINKS + 2 * DRITTEL;

/** Vitamin B12 im Blut als Band mit drei Bereichen; die Grauzone klären weitere Werte. */
export default function B12Werte() {
  return (
    <Zeichnung titel="Vitamin B12 im Blut als waagrechtes Band: unter 200 pg/ml (150 pmol/l) ist ein Mangel wahrscheinlich, 200 bis 300 pg/ml (bis 220 pmol/l) ist eine Grauzone, über 300 ausreichend; die Grauzone klären Holo-TC, das aktive B12, und MMA, die Methylmalonsäure">
      <defs>
        <pattern id="b12-werte-streifen" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="22" height="22" fill={F.petrolDunkel} />
          <rect width="10" height="22" fill={F.leise} fillOpacity="0.55" />
        </pattern>
        <clipPath id="b12-werte-band">
          <rect x={LINKS} y={OBEN} width={RECHTS - LINKS} height={HOEHE} rx="22" />
        </clipPath>
      </defs>

      <Etikett x={360} y={70} anker="middle">
        Vitamin B12 im Blut
      </Etikett>
      <Unterzeile x={360} y={104} anker="middle">
        pg/ml (darunter pmol/l)
      </Unterzeile>

      {/* Namen über den Bereichen */}
      <Etikett x={LINKS + DRITTEL / 2} y={194} anker="middle" farbe={F.kupferHell}>
        Mangel
      </Etikett>
      <Etikett x={LINKS + DRITTEL / 2} y={226} anker="middle" farbe={F.kupferHell}>
        wahrscheinlich
      </Etikett>
      <Etikett x={G1 + DRITTEL / 2} y={226} anker="middle">
        Grauzone
      </Etikett>
      <Etikett x={G2 + DRITTEL / 2} y={226} anker="middle">
        ausreichend
      </Etikett>

      {/* Band */}
      <g clipPath="url(#b12-werte-band)">
        <rect x={LINKS} y={OBEN} width={DRITTEL} height={HOEHE} fill={F.kupfer} />
        <rect x={G1} y={OBEN} width={DRITTEL} height={HOEHE} fill="url(#b12-werte-streifen)" />
        <rect x={G2} y={OBEN} width={DRITTEL} height={HOEHE} fill={F.petrol} />
      </g>
      <line x1={G1} y1={OBEN} x2={G1} y2={OBEN + HOEHE} stroke={F.linie} strokeWidth="3" />
      <line x1={G2} y1={OBEN} x2={G2} y2={OBEN + HOEHE} stroke={F.linie} strokeWidth="3" />
      <rect x={LINKS} y={OBEN} width={RECHTS - LINKS} height={HOEHE} rx="22" fill="none" stroke={F.linie} strokeWidth="4" />

      {/* Grenzwerte */}
      {[
        [G1, '200', '150'],
        [G2, '300', '220'],
      ].map(([x, pg, pmol]) => (
        <g key={pg}>
          <line x1={x} y1={OBEN + HOEHE + 6} x2={x} y2={OBEN + HOEHE + 20} stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
          <Etikett x={Number(x)} y={OBEN + HOEHE + 50} anker="middle">
            {pg}
          </Etikett>
          <Unterzeile x={Number(x)} y={OBEN + HOEHE + 78} anker="middle">
            {pmol}
          </Unterzeile>
        </g>
      ))}

      {/* Von der Grauzone zu den Zusatzwerten */}
      <Pfeil d={`M360 ${OBEN + HOEHE + 14} L360 474`} farbe={F.leise} />
      <rect x={190} y={490} width={340} height={110} rx="18" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      <Etikett x={360} y={536} anker="middle">
        Holo-TC und MMA
      </Etikett>
      <Unterzeile x={360} y={574} anker="middle">
        klären die Grauzone
      </Unterzeile>
      <Unterzeile x={360} y={652} anker="middle">
        aktives B12 und Methylmalonsäure
      </Unterzeile>
    </Zeichnung>
  );
}
