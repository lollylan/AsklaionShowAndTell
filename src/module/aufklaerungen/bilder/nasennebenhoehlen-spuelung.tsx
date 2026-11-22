import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Gesicht von vorn, zur Seite geneigt; Salzwasser rein ins obere, raus aus dem unteren Nasenloch. */
export default function NasennebenhoehlenSpuelung() {
  return (
    <Zeichnung titel="Gesicht von vorn, über ein Waschbecken zur Seite geneigt. Aus einer Spülflasche fließt Salzwasser in das obere Nasenloch und läuft aus dem unteren Nasenloch wieder heraus ins Becken">
      <Etikett x={360} y={60} anker="middle">
        Nasenspülung mit Salzwasser
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        Löst festes Sekret und spült Pollen aus
      </Unterzeile>

      {/* Gesicht, geneigt */}
      <g transform="translate(300 300) rotate(-40)">
        <ellipse cx="0" cy="0" rx="110" ry="140" {...KONTUR} fill={F.petrol} />
        <path d="M-58 -40 q16 10 32 0 M26 -40 q16 10 32 0" {...KONTUR} stroke={F.leise} />
        <path d="M0 -26 C-6 0 -26 30 -28 48 C-20 58 20 58 28 48 C26 30 6 0 0 -26" {...KONTUR} fill={F.petrolHell} />
        <ellipse cx="-14" cy="50" rx="7" ry="5" fill={F.tief} />
        <ellipse cx="14" cy="50" rx="7" ry="5" fill={F.tief} />
        <path d="M-26 92 q26 12 52 0" {...KONTUR} stroke={F.leise} />
      </g>

      {/* Spülflasche von unten rechts ins obere Nasenloch */}
      <g transform="translate(-22 -44) rotate(-38 430 470)">
        <rect x="400" y="430" width="70" height="130" rx="22" {...KONTUR} fill={F.creme} />
        <path d="M420 430 L428 360 L442 360 L450 430" {...KONTUR} fill={F.creme} />
      </g>

      {/* Abfluss aus dem unteren Nasenloch */}
      <path
        d="M318 362 C318 420 316 470 316 560"
        fill="none"
        stroke={F.petrolHell}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="14 10"
      />
      {/* Waschbecken */}
      <path d="M150 560 L520 560 C510 640 430 670 335 670 C240 670 160 640 150 560 Z" {...KONTUR} fill={F.petrolDunkel} />

      <Zeiger von={[590, 244]} nach={[350, 334]} />
      <Etikett x={690} y={190} anker="end">
        Salzwasser
      </Etikett>
      <Unterzeile x={690} y={222} anker="end">
        ins obere Nasenloch
      </Unterzeile>

      <Zeiger von={[150, 470]} nach={[316, 470]} />
      <Etikett x={30} y={410}>
        läuft aus dem
      </Etikett>
      <Etikett x={30} y={442}>
        anderen heraus
      </Etikett>
    </Zeichnung>
  );
}
