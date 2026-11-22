import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Oberes Knochenende eines Gelenks, Mitte cx, Gelenkfläche unten bei y = 345. */
const oben = (cx: number) =>
  `M${cx - 46} 160 L${cx - 46} 262 C${cx - 96} 282 ${cx - 106} 330 ${cx - 88} 345 L${cx + 88} 345 C${cx + 106} 330 ${cx + 96} 282 ${cx + 46} 262 L${cx + 46} 160`;
/** Unteres Knochenende, Gelenkfläche oben bei y = 385. */
const unten = (cx: number) =>
  `M${cx - 46} 570 L${cx - 46} 468 C${cx - 96} 448 ${cx - 106} 400 ${cx - 88} 385 L${cx + 88} 385 C${cx + 106} 400 ${cx + 96} 448 ${cx + 46} 468 L${cx + 46} 570`;

function Gelenk({ cx, krank }: { cx: number; krank?: boolean }) {
  return (
    <g>
      {/* Gelenkkapsel mit Innenhaut */}
      <ellipse cx={cx} cy="365" rx="134" ry="96" {...KONTUR} stroke={F.leise} strokeWidth="3" />
      {krank && (
        <>
          <ellipse cx={cx} cy="365" rx="128" ry="88" fill={F.kupfer} fillOpacity="0.28" />
          <ellipse cx={cx - 100} cy="365" rx="34" ry="62" fill={F.kupfer} />
          <ellipse cx={cx + 100} cy="365" rx="34" ry="62" fill={F.kupfer} />
        </>
      )}
      <path d={oben(cx)} {...KONTUR} fill={F.creme} />
      <path d={unten(cx)} {...KONTUR} fill={F.creme} />
      {/* Knorpel */}
      <rect x={cx - (krank ? 62 : 86)} y="333" width={krank ? 124 : 172} height="12" rx="6" fill={F.petrolHell} />
      <rect x={cx - (krank ? 62 : 86)} y="385" width={krank ? 124 : 172} height="12" rx="6" fill={F.petrolHell} />
      {krank && (
        <>
          {/* angefressene Knochenränder */}
          <circle cx={cx - 84} cy="334" r="13" fill={F.kupfer} />
          <circle cx={cx + 84} cy="396" r="13" fill={F.kupfer} />
          <ellipse cx={cx - 100} cy="365" rx="34" ry="62" fill="none" stroke={F.kupferHell} strokeWidth="3" />
          <ellipse cx={cx + 100} cy="365" rx="34" ry="62" fill="none" stroke={F.kupferHell} strokeWidth="3" />
        </>
      )}
    </g>
  );
}

/** Gesundes Gelenk und Gelenk bei Rheuma: entzündete Innenhaut greift Knorpel und Knochen an. */
export default function RheumatoideArthritisUrsachen() {
  return (
    <Zeichnung titel="Zwei Fingergelenke im Schnitt: links gesund mit dünner Gelenkhaut und glattem Knorpel; rechts bei Rheuma eine dicke, entzündete Gelenkhaut, die seitlich in Knorpel und Knochen hineinwächst">
      <Etikett x={190} y={74} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={108} anker="middle">
        dünne Gelenkhaut
      </Unterzeile>
      <Etikett x={530} y={74} anker="middle" farbe={F.kupferHell}>
        Rheuma
      </Etikett>
      <Unterzeile x={530} y={108} anker="middle">
        Gelenkhaut entzündet
      </Unterzeile>

      <Gelenk cx={190} />
      <Gelenk cx={530} krank />

      <Zeiger von={[110, 596]} nach={[66, 400]} />
      <Etikett x={40} y={630}>
        Gelenkhaut
      </Etikett>

      <Zeiger von={[600, 596]} nach={[450, 338]} />
      <Etikett x={690} y={630} anker="end" farbe={F.kupferHell}>
        greift Knorpel und
      </Etikett>
      <Etikett x={690} y={662} anker="end" farbe={F.kupferHell}>
        Knochen an
      </Etikett>
    </Zeichnung>
  );
}
