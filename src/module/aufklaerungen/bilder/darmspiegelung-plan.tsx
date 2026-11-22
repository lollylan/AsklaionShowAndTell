import { Etikett, F, Folge, KONTUR, Unterzeile, Wachsen, Zeichnung } from './bausteine';

const ZEILEN = [130, 290, 450, 610];

/** Kanne mit Abführlösung, links unten bei (0, 0). */
function Kanne() {
  return (
    <g>
      <path d="M0 0 L8 -96 L72 -96 L80 0 Z" {...KONTUR} fill={F.petrolDunkel} />
      <path d="M4 -46 L76 -46 L80 0 L0 0 Z" fill={F.petrolHell} />
      <path d="M78 -80 Q104 -70 100 -40 Q98 -22 78 -18" {...KONTUR} />
    </g>
  );
}

/** Vorbereitung der Darmspiegelung über drei Tage: Körner weglassen, klare Getränke, zweimal abführen. */
export default function DarmspiegelungPlan() {
  return (
    <Zeichnung titel="Plan für die Vorbereitung der Darmspiegelung: drei Tage vorher keine Körner und kein Vollkorn; am Vortag ein leichtes Frühstück, danach nur klare Getränke; am Abend die erste und am Morgen die zweite Portion Abführlösung">
      {/* Zeitstrahl */}
      <path d={`M80 ${ZEILEN[0]} L80 ${ZEILEN[3]}`} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      <Wachsen d={`M80 ${ZEILEN[0]} L80 ${ZEILEN[3]}`} farbe={F.linie} breite={6} dauer={4.2} ab={0.4} />

      {/* 3 Tage vorher: keine Körner */}
      <Folge ab={0.4}>
        <circle cx="80" cy={ZEILEN[0]} r="14" fill={F.linie} />
        <Etikett x={120} y={ZEILEN[0] - 6}>
          3 Tage vorher
        </Etikett>
        <Unterzeile x={120} y={ZEILEN[0] + 28}>
          keine Körner, kein Vollkorn
        </Unterzeile>
        <g transform={`translate(560 ${ZEILEN[0]})`}>
          <path d="M-70 40 L-70 -20 Q-70 -50 -40 -50 L40 -50 Q70 -50 70 -20 L70 40 Z" {...KONTUR} fill={F.kupferHell} />
          <g fill={F.petrolDunkel}>
            <ellipse cx="-34" cy="-14" rx="6" ry="10" />
            <ellipse cx="0" cy="4" rx="6" ry="10" />
            <ellipse cx="30" cy="-20" rx="6" ry="10" />
            <ellipse cx="-20" cy="22" rx="6" ry="10" />
            <ellipse cx="36" cy="20" rx="6" ry="10" />
          </g>
          <path d="M-84 -60 L84 56" stroke={F.kupfer} strokeWidth="9" strokeLinecap="round" />
        </g>
      </Folge>

      {/* Vortag */}
      <Folge ab={1.6}>
        <circle cx="80" cy={ZEILEN[1]} r="14" fill={F.linie} />
        <Etikett x={120} y={ZEILEN[1] - 6}>
          Am Vortag
        </Etikett>
        <Unterzeile x={120} y={ZEILEN[1] + 28}>
          leichtes Frühstück,
        </Unterzeile>
        <Unterzeile x={120} y={ZEILEN[1] + 56}>
          danach nur klare Getränke
        </Unterzeile>
        <g transform={`translate(520 ${ZEILEN[1] + 50})`}>
          <path d="M0 0 L-10 -100 L60 -100 L50 0 Z" {...KONTUR} fill={F.petrolDunkel} />
          <path d="M-5 -52 L55 -52 L50 0 L0 0 Z" fill="#f2e3a5" opacity="0.85" />
          <path d="M90 0 L90 -70 Q90 -96 116 -96 L132 -96 Q158 -96 158 -70 L158 0 Z" {...KONTUR} fill={F.petrolDunkel} />
          <path d="M96 -40 L152 -40 L152 -6 L96 -6 Z" fill="#e8c98a" opacity="0.8" />
        </g>
      </Folge>

      {/* Abend */}
      <Folge ab={2.8}>
        <circle cx="80" cy={ZEILEN[2]} r="14" fill={F.linie} />
        <Etikett x={120} y={ZEILEN[2] - 6}>
          Am Abend
        </Etikett>
        <Unterzeile x={120} y={ZEILEN[2] + 28}>
          1. Portion Abführlösung
        </Unterzeile>
        <g transform={`translate(520 ${ZEILEN[2] + 50})`}>
          <Kanne />
          <path d="M150 -90 A34 34 0 1 0 176 -34 A26 26 0 1 1 150 -90 Z" fill={F.kupferHell} />
        </g>
      </Folge>

      {/* Morgen */}
      <Folge ab={4}>
        <circle cx="80" cy={ZEILEN[3]} r="14" fill={F.kupfer} />
        <Etikett x={120} y={ZEILEN[3] - 6}>
          Am Morgen
        </Etikett>
        <Unterzeile x={120} y={ZEILEN[3] + 28}>
          2. Portion, dann zur Spiegelung
        </Unterzeile>
        <g transform={`translate(520 ${ZEILEN[3] + 50})`}>
          <Kanne />
          <circle cx="152" cy="-60" r="20" fill={F.kupferHell} />
          <path
            d="M152 -100 L152 -90 M152 -30 L152 -20 M112 -60 L122 -60 M182 -60 L192 -60 M124 -88 L131 -81 M173 -39 L180 -32 M180 -88 L173 -81 M131 -39 L124 -32"
            stroke={F.kupferHell}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      </Folge>
    </Zeichnung>
  );
}
