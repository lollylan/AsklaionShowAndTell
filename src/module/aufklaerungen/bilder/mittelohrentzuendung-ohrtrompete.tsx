import { Etikett, F, Fluss, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Kopf im Profil, Blick nach links (wie in schlafapnoe.tsx). */
const KOPF =
  'M150 420 L150 348 C130 338 120 334 104 332 C76 334 58 318 60 292 C56 284 50 276 52 268 ' +
  'L64 256 L50 244 C48 232 56 224 58 216 L30 206 C40 186 56 168 62 150 ' +
  'C54 110 66 70 100 46 C150 10 240 24 268 84 C296 150 286 250 250 300 L250 420 Z';
const ATEMWEG = 'M66 198 C115 184 170 180 195 205 C212 225 205 300 205 420';

/** Kopf mit Ohr, Atemweg und Ohrtrompete vom Mittelohr zum Rachen. */
function Kopf({ ohr, kind = false }: { ohr: [number, number]; kind?: boolean }) {
  return (
    <g>
      <path d={KOPF} {...KONTUR} fill={F.petrolDunkel} />
      <path d={ATEMWEG} fill="none" stroke={F.tief} strokeWidth="18" strokeLinecap="round" />
      <ellipse cx="236" cy="188" rx="16" ry="28" {...KONTUR} fill={F.petrol} />
      <path d={`M${ohr[0]} ${ohr[1]} L192 206`} stroke={F.kupferHell} strokeWidth="12" strokeLinecap="round" />
      {kind ? (
        <>
          {/* Kurz und flach: Keime steigen aus dem Rachen leicht ins Mittelohr, es entzündet sich. */}
          <Fluss d={`M192 206 L${ohr[0]} ${ohr[1]}`} farbe={F.tief} breite={6} dauer={1.6} />
          <circle
            className="mittelohrentzuendung-ohrtrompete-ohr-form"
            cx={ohr[0]}
            cy={ohr[1]}
            r="11"
            fill={F.kupfer}
            stroke={F.linie}
            strokeWidth="3"
          />
        </>
      ) : (
        <>
          {/* Lang und steil: Sekret läuft gut zum Rachen ab. */}
          <Fluss d={`M${ohr[0]} ${ohr[1]} L192 206`} farbe={F.tief} breite={6} dauer={1.4} />
          <circle cx={ohr[0]} cy={ohr[1]} r="11" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />
        </>
      )}
    </g>
  );
}

/** Kind und Erwachsener: Beim Kind ist die Ohrtrompete kurz und flach. */
export default function MittelohrentzuendungOhrtrompete() {
  return (
    <Zeichnung titel="Zwei Köpfe im Profil, links ein Kind, rechts ein Erwachsener. Die Ohrtrompete verbindet das Mittelohr mit dem Rachen. Beim Kind ist sie kurz und verläuft fast waagerecht, beim Erwachsenen ist sie länger und steiler">
      <Etikett x={360} y={50} anker="middle">
        Die Ohrtrompete
      </Etikett>

      <g transform="translate(40 280)">
        <Kopf ohr={[232, 200]} kind />
      </g>
      <Etikett x={190} y={220} anker="middle">
        Kind
      </Etikett>
      <Unterzeile x={190} y={252} anker="middle">
        kurz und flach
      </Unterzeile>

      <g transform="translate(330 160) scale(1.25)">
        <Kopf ohr={[246, 160]} />
      </g>
      <Etikett x={720 - 40} y={100} anker="end">
        Erwachsene
      </Etikett>
      <Unterzeile x={720 - 40} y={132} anker="end">
        länger und steiler
      </Unterzeile>

    </Zeichnung>
  );
}
