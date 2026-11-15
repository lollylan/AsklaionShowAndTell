import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const OHRTROMPETE = 'M432 384 C472 460 560 520 650 580';

/** Schnitt durch das Ohr: Gehörgang, vorgewölbtes Trommelfell, Eiter im Mittelohr, zugeschwollene Ohrtrompete. */
export default function Mittelohrentzuendung() {
  return (
    <Zeichnung titel="Schnitt durch das Ohr: Von links führt der Gehörgang zum Trommelfell, das sich nach außen wölbt. Dahinter ist das Mittelohr mit Eiter gefüllt, die Ohrtrompete nach unten zum Rachen ist zugeschwollen">
      {/* Gewebe und Knochen um das Ohr */}
      <rect x="170" y="170" width="510" height="440" rx="40" fill={F.petrol} />

      {/* Ohrmuschel */}
      <path
        d="M154 192 C102 150 50 190 52 282 C54 362 90 430 154 442"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Gehörgang */}
      <rect x="60" y="272" width="276" height="56" fill={F.tief} />
      <path d="M60 272 L330 272 M60 328 L330 328" fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />

      {/* Mittelohr voller Eiter */}
      <path
        d="M336 248 C370 205 455 210 472 250 C492 300 484 356 452 378 C414 400 356 392 336 352 Z"
        fill={F.kupfer}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Gehörknöchelchen */}
      <g stroke={F.creme} strokeLinecap="round" fill="none">
        <path d="M330 300 L372 262" strokeWidth="8" />
        <path d="M396 266 L438 292" strokeWidth="6" />
      </g>
      <circle cx="384" cy="257" r="13" fill={F.creme} />

      {/* Trommelfell, nach außen vorgewölbt */}
      <path d="M336 258 Q300 300 336 342" fill="none" stroke={F.kupferHell} strokeWidth="7" strokeLinecap="round" />

      {/* Innenohr (Schnecke) */}
      <path
        d="M560 296 a8 8 0 1 1 16 0 a16 16 0 1 1 -32 0 a24 24 0 1 1 48 0 a32 32 0 1 1 -64 0"
        fill="none"
        stroke={F.leise}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Ohrtrompete, zugeschwollen */}
      <path d={OHRTROMPETE} fill="none" stroke={F.kupferHell} strokeWidth="30" strokeLinecap="round" />
      <path d={OHRTROMPETE} fill="none" stroke={F.tief} strokeWidth="3" strokeLinecap="round" />

      <Etikett x={360} y={66} anker="middle">
        Mittelohrentzündung
      </Etikett>

      <Etikett x={290} y={146} anker="middle">
        Trommelfell
      </Etikett>
      <Zeiger von={[300, 158]} nach={[316, 290]} />

      <Etikett x={690} y={146} anker="end" farbe={F.kupferHell}>
        Eiter im Mittelohr
      </Etikett>
      <Zeiger von={[560, 158]} nach={[446, 262]} />

      <Etikett x={40} y={500}>
        Gehörgang
      </Etikett>
      <Zeiger von={[100, 474]} nach={[100, 312]} />

      <Zeiger von={[360, 624]} nach={[515, 494]} />
      <Etikett x={40} y={652} farbe={F.kupferHell}>
        Ohrtrompete zugeschwollen
      </Etikett>
      <Unterzeile x={40} y={686}>
        meist nach einer Erkältung
      </Unterzeile>
    </Zeichnung>
  );
}
