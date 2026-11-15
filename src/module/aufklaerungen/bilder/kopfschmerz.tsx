import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Kopf von vorn mit Hals und Schultern, Mittelpunkt in der Kopfmitte. */
function Kopf() {
  return (
    <>
      <path
        d="M-150 230 C-140 190 -80 180 -52 150 L-52 100 L52 100 L52 150 C80 180 140 190 150 230 Z"
        {...KONTUR}
        fill={F.petrolDunkel}
      />
      <ellipse cx="-100" cy="0" rx="14" ry="28" {...KONTUR} fill={F.petrol} />
      <ellipse cx="100" cy="0" rx="14" ry="28" {...KONTUR} fill={F.petrol} />
      <ellipse cx="0" cy="-10" rx="100" ry="128" {...KONTUR} fill={F.petrol} />
      <path d="M-50 4 L-22 4 M22 4 L50 4" {...KONTUR} />
      <path d="M0 18 C-4 38 -8 52 4 58" {...KONTUR} stroke={F.leise} />
      <path d="M-26 82 Q0 74 26 82" {...KONTUR} />
    </>
  );
}

/** Zwei Köpfe: Spannungskopfschmerz beidseits wie ein Band, Migräne einseitig pochend. */
export default function Kopfschmerz() {
  return (
    <Zeichnung titel="Zwei Köpfe von vorn: links drückt ein Band beidseits um Stirn und Schläfen, rechts pocht der Schmerz an einer Schläfe">
      <Etikett x={360} y={80} anker="middle">
        Die zwei häufigsten Formen
      </Etikett>

      {/* Spannungskopfschmerz: Band um den Kopf, Druck von beiden Seiten */}
      <g transform="translate(190 330)">
        <Kopf />
        <path d="M-100 -46 Q0 -86 100 -46" fill="none" stroke={F.kupfer} strokeWidth="24" strokeLinecap="round" />
        <Pfeil d="M-150 -40 L-116 -40" farbe={F.kupferHell} />
        <Pfeil d="M150 -40 L116 -40" farbe={F.kupferHell} />
      </g>

      {/* Migräne: Schmerzherd an einer Schläfe mit pochenden Wellen */}
      <g transform="translate(530 330)">
        <Kopf />
        <circle cx="60" cy="-40" r="30" fill={F.kupfer} />
        <circle cx="60" cy="-40" r="13" fill={F.kupferHell} />
        <g fill="none" stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round">
          <path d="M85 -83 A50 50 0 0 1 98 -8" />
          <path d="M97 -104 A74 74 0 0 1 117 8" strokeOpacity="0.6" />
        </g>
      </g>

      <Etikett x={190} y={604} anker="middle">
        Spannungskopfschmerz
      </Etikett>
      <Unterzeile x={190} y={636} anker="middle">
        beidseits, drückend
      </Unterzeile>
      <Unterzeile x={190} y={664} anker="middle">
        wie ein enges Band
      </Unterzeile>

      <Etikett x={530} y={604} anker="middle">
        Migräne
      </Etikett>
      <Unterzeile x={530} y={636} anker="middle">
        einseitig, pochend
      </Unterzeile>
      <Unterzeile x={530} y={664} anker="middle">
        oft mit Übelkeit
      </Unterzeile>
    </Zeichnung>
  );
}
