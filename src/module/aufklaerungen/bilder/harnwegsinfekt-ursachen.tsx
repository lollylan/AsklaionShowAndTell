import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Blase mit Harnröhre; `roehre` ist der Pfad der Harnröhre ab dem Blasenausgang. */
function Blase({ cx, roehre }: { cx: number; roehre: string }) {
  return (
    <g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={roehre} stroke={F.linie} strokeWidth="24" />
        <path d={roehre} stroke={F.tief} strokeWidth="16" />
      </g>
      <ellipse cx={cx} cy="250" rx="112" ry="92" {...KONTUR} fill={F.petrol} />
    </g>
  );
}

/** Bakterien als Stäbchen: [x, y, Drehwinkel]. */
function Bakterien({ liste }: { liste: [number, number, number][] }) {
  return (
    <g>
      {liste.map(([x, y, w]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 9}
          y={y - 4}
          width="18"
          height="8"
          rx="4"
          fill={F.kupfer}
          stroke={F.kupferHell}
          strokeWidth="1.5"
          transform={`rotate(${w} ${x} ${y})`}
        />
      ))}
    </g>
  );
}

/** Kurze Harnröhre der Frau, lange des Mannes: der Weg der Bakterien zur Blase. */
export default function HarnwegsinfektUrsachen() {
  return (
    <Zeichnung titel="Links die Blase einer Frau mit kurzer Harnröhre: Bakterien erreichen die Blase leicht. Rechts die Blase eines Mannes mit langer Harnröhre: der Weg ist weit">
      <Blase cx={190} roehre="M190 330 L190 430" />
      <Blase cx={530} roehre="M530 330 L530 430 C530 480 560 500 580 530 C596 556 596 590 596 630" />

      <Bakterien
        liste={[
          [186, 470, 20],
          [206, 486, -30],
          [174, 500, 70],
          [190, 404, 90],
          [190, 372, 80],
          [160, 250, 10],
          [214, 226, -40],
          [200, 286, 60],
        ]}
      />
      <Bakterien
        liste={[
          [592, 668, 20],
          [612, 680, -30],
          [578, 690, 60],
        ]}
      />

      <Pfeil d="M246 500 L246 360" farbe={F.kupferHell} breite={6} />
      <Pfeil d="M640 676 L640 600" farbe={F.kupferHell} breite={6} />

      <Etikett x={190} y={86} anker="middle">
        Frau
      </Etikett>
      <Unterzeile x={190} y={118} anker="middle">
        Harnröhre etwa 4 cm
      </Unterzeile>
      <Etikett x={530} y={86} anker="middle">
        Mann
      </Etikett>
      <Unterzeile x={530} y={118} anker="middle">
        Harnröhre etwa 20 cm
      </Unterzeile>

      <Etikett x={40} y={580} farbe={F.kupferHell}>
        Kurzer Weg:
      </Etikett>
      <Unterzeile x={40} y={612}>
        Bakterien erreichen
      </Unterzeile>
      <Unterzeile x={40} y={640}>
        die Blase leicht
      </Unterzeile>
    </Zeichnung>
  );
}
