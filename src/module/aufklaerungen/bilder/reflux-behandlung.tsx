import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Speiseröhre und Magen wie in reflux.tsx, Magenausgang nach links. */
const MAGEN =
  'M285 50 L285 300 C287 370 268 420 200 440 L130 440 L130 500 L200 500 ' +
  'C290 505 330 610 430 610 C540 610 610 510 600 400 C592 290 540 225 470 228 ' +
  'C410 230 375 262 355 300 L355 50 Z';

/** Kleiner Magen; `saeure` ist die Höhe des Säurespiegels in Magen-Koordinaten. */
function KleinerMagen({ x, saeure, id }: { x: number; saeure: number; id: string }) {
  return (
    <g transform={`translate(${x} 352) scale(0.38)`}>
      <clipPath id={id}>
        <path d={MAGEN} />
      </clipPath>
      <path d={MAGEN} fill={F.petrol} />
      <g clipPath={`url(#${id})`}>
        <rect x="100" y={saeure} width="540" height="200" fill={F.kupfer} />
      </g>
      <path d={MAGEN} {...KONTUR} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

/** Säureblocker: eine halbe Stunde vor dem Essen nehmen, dann bildet der Magen weniger Säure. */
export default function RefluxBehandlung() {
  return (
    <Zeichnung titel="Oben der Ablauf: Tablette nehmen, eine halbe Stunde warten, dann essen. Unten zwei Mägen: ohne Tablette viel Magensäure, mit Tablette deutlich weniger">
      {/* Tablette */}
      <g transform="rotate(-25 130 170)">
        <rect x="75" y="146" width="110" height="48" rx="24" fill={F.linie} />
        <path d="M130 146 L99 146 A24 24 0 0 0 99 194 L130 194 Z" fill={F.petrolHell} />
        <rect x="75" y="146" width="110" height="48" rx="24" {...KONTUR} />
      </g>

      {/* Uhr: eine halbe Stunde */}
      <circle cx="360" cy="170" r="60" {...KONTUR} fill={F.petrolDunkel} />
      <path d="M360 170 L360 110 A60 60 0 0 1 360 230 Z" fill={F.petrolHell} opacity="0.55" />
      <circle cx="360" cy="170" r="60" {...KONTUR} />
      <path d="M360 170 L360 214" {...KONTUR} strokeWidth={5} />

      {/* Teller */}
      <circle cx="590" cy="170" r="58" {...KONTUR} fill={F.petrolDunkel} />
      <circle cx="590" cy="170" r="38" fill="none" stroke={F.leise} strokeWidth="3" />

      <Pfeil d="M206 170 L280 170" farbe={F.leise} />
      <Pfeil d="M436 170 L496 170" farbe={F.leise} />

      <Etikett x={130} y={276} anker="middle">
        Tablette
      </Etikett>
      <Etikett x={360} y={276} anker="middle">
        30 Minuten
      </Etikett>
      <Etikett x={590} y={276} anker="middle">
        Essen
      </Etikett>

      <line
        x1="40"
        y1="330"
        x2="680"
        y2="330"
        stroke={F.leise}
        strokeWidth="2"
        strokeDasharray="4 8"
        strokeLinecap="round"
      />

      <KleinerMagen x={51} saeure={440} id="reflux-behandlung-ohne" />
      <KleinerMagen x={391} saeure={560} id="reflux-behandlung-mit" />

      <Etikett x={190} y={634} anker="middle">
        Ohne Tablette
      </Etikett>
      <Unterzeile x={190} y={666} anker="middle">
        viel Magensäure
      </Unterzeile>
      <Etikett x={530} y={634} anker="middle">
        Mit Tablette
      </Etikett>
      <Unterzeile x={530} y={666} anker="middle">
        deutlich weniger Säure
      </Unterzeile>
    </Zeichnung>
  );
}
