import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const NUMMER_X = 70;
const BILD_X = 190;
const TEXT_X = 280;
const REIHEN = [200, 370, 540];

/** Vier Plättchen Traubenzucker, 2 × 2. */
function Traubenzucker({ cy }: { cy: number }) {
  const s = 40;
  const lage = [-1, 1].flatMap((a) => [-1, 1].map((b) => [a, b] as const));
  return (
    <g>
      {lage.map(([a, b]) => (
        <g key={`${a}${b}`}>
          <rect x={BILD_X + a * 24 - s / 2} y={cy + b * 24 - s / 2} width={s} height={s} rx="7" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />
          <circle cx={BILD_X + a * 24} cy={cy + b * 24} r="5" fill={F.kupferHell} />
        </g>
      ))}
    </g>
  );
}

/** Uhr, die ersten 15 Minuten hervorgehoben. */
function Uhr({ cy }: { cy: number }) {
  const r = 52;
  return (
    <g>
      <circle cx={BILD_X} cy={cy} r={r} fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <path d={`M${BILD_X} ${cy} L${BILD_X} ${cy - r + 8} A${r - 8} ${r - 8} 0 0 1 ${BILD_X + r - 8} ${cy} Z`} fill={F.petrolHell} />
      {[0, 90, 180, 270].map((w) => (
        <line key={w} x1={BILD_X} y1={cy - r + 6} x2={BILD_X} y2={cy - r + 16} stroke={F.linie} strokeWidth="4" strokeLinecap="round" transform={`rotate(${w} ${BILD_X} ${cy})`} />
      ))}
      <line x1={BILD_X} y1={cy} x2={BILD_X} y2={cy - 36} stroke={F.linie} strokeWidth="5" strokeLinecap="round" />
      <line x1={BILD_X} y1={cy} x2={BILD_X + 30} y2={cy} stroke={F.linie} strokeWidth="5" strokeLinecap="round" />
      <circle cx={BILD_X} cy={cy} r="6" fill={F.linie} />
    </g>
  );
}

/** Kleines Messgerät mit Wert unter 70. */
function Geraet({ cy }: { cy: number }) {
  return (
    <g>
      <rect x={BILD_X - 42} y={cy - 56} width="84" height="112" rx="16" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <rect x={BILD_X - 30} y={cy - 42} width="60" height="44" rx="6" fill={F.tief} stroke={F.leise} strokeWidth="2" />
      <text x={BILD_X} y={cy - 10} textAnchor="middle" fontSize="26" fontWeight="700" fill={F.kupferHell}>
        65
      </text>
      <circle cx={BILD_X} cy={cy + 30} r="11" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
    </g>
  );
}

export default function Unterzucker() {
  const schritte = [
    { titel: 'Schnellen Zucker', bild: <Traubenzucker cy={REIHEN[0]} /> },
    { titel: '15 Minuten warten', bild: <Uhr cy={REIHEN[1]} /> },
    { titel: 'Nachmessen', bild: <Geraet cy={REIHEN[2]} /> },
  ];
  return (
    <Zeichnung titel="Unterzucker unter 70 mg/dl, Zeichen sind Zittern, Schwitzen und Heißhunger. Drei Schritte: schnellen Zucker essen, etwa vier Plättchen Traubenzucker, 15 Minuten warten, nachmessen; ist der Wert noch unter 70, alles wiederholen">
      <Etikett x={360} y={58} anker="middle" farbe={F.kupferHell}>
        Unterzucker: unter 70 mg/dl
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        Zittern, Schwitzen, Heißhunger
      </Unterzeile>

      <line x1={NUMMER_X} y1={REIHEN[0]} x2={NUMMER_X} y2={REIHEN[2]} stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
      {schritte.map((s, i) => {
        const y = REIHEN[i];
        return (
          <g key={s.titel}>
            <circle cx={NUMMER_X} cy={y} r="30" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
            <text x={NUMMER_X} y={y + 11} textAnchor="middle" fontSize="30" fontWeight="700" fill={F.linie}>
              {i + 1}
            </text>
            {s.bild}
            <Etikett x={TEXT_X} y={y + 9}>
              {s.titel}
            </Etikett>
          </g>
        );
      })}

      {/* Schleife zurück zu Schritt 1 */}
      <path
        d={`M450 ${REIHEN[2]} L650 ${REIHEN[2]} L650 ${REIHEN[0]} L556 ${REIHEN[0]}`}
        fill="none"
        stroke={F.kupfer}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#pfeilspitze)"
      />
      <Etikett x={TEXT_X} y={REIHEN[2] + 60} farbe={F.kupferHell}>
        unter 70? wiederholen
      </Etikett>

      <Unterzeile x={NUMMER_X - 30} y={690}>
        danach etwas Langsames essen, z. B. ein Brot
      </Unterzeile>
    </Zeichnung>
  );
}
