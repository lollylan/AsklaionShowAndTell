import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

// Herzform um den Nullpunkt (wie in herzschwaeche.tsx), etwa 226 breit und 220 hoch.
const HERZ =
  'M0 -55 C-18 -105 -92 -108 -110 -55 C-130 5 -70 60 0 125 C70 60 130 5 110 -55 C92 -108 18 -105 0 -55 Z';

/** Sauerstoffteilchen auf dem Weg zwischen den Stationen. */
const SAUERSTOFF: [number, number][] = [
  [186, 300],
  [356, 300],
  [526, 300],
];

/** Der Weg des Sauerstoffs: Lunge, Blut, Herz, Muskel – jede Station kann Luftnot machen. */
export default function Luftnot() {
  return (
    <Zeichnung titel="Der Weg des Sauerstoffs in vier Stationen: Die Lunge nimmt ihn auf, das Blut trägt ihn, das Herz pumpt ihn, die Muskeln verbrauchen ihn. An jeder Station kann Luftnot entstehen">
      <Etikett x={360} y={96} anker="middle">
        Der Weg des Sauerstoffs
      </Etikett>
      <Unterzeile x={360} y={130} anker="middle">
        Jede Station kann Luftnot machen
      </Unterzeile>

      {/* Lunge */}
      <g strokeLinejoin="round">
        <path
          d="M95 284 C62 280 46 320 46 364 C46 396 66 410 98 396 Z"
          fill={F.petrol}
          stroke={F.linie}
          strokeWidth="4"
        />
        <path
          d="M115 284 C148 280 164 320 164 364 C164 396 144 410 112 396 Z"
          fill={F.petrol}
          stroke={F.linie}
          strokeWidth="4"
        />
        <path d="M105 236 L105 292 M105 292 L86 316 M105 292 L124 316" {...KONTUR} />
      </g>

      {/* Blut: rote Blutkörperchen */}
      <g fill={F.petrolHell} stroke={F.linie} strokeWidth="4">
        <circle cx="252" cy="306" r="26" />
        <circle cx="300" cy="334" r="26" />
        <circle cx="258" cy="370" r="26" />
      </g>
      <g fill={F.petrolDunkel}>
        <circle cx="252" cy="306" r="10" />
        <circle cx="300" cy="334" r="10" />
        <circle cx="258" cy="370" r="10" />
      </g>

      {/* Herz */}
      <g transform="translate(445 326) scale(0.5)">
        <path d={HERZ} fill={F.petrol} stroke={F.linie} strokeWidth="8" strokeLinejoin="round" />
      </g>

      {/* Muskel: Spindel mit Sehnen */}
      <g transform="rotate(-30 615 334)">
        <path d="M545 334 L560 334 M670 334 L685 334" {...KONTUR} />
        <ellipse cx="615" cy="334" rx="56" ry="30" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
        <path d="M582 324 L648 324 M578 344 L652 344" stroke={F.petrolDunkel} strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Weitergabe von Station zu Station */}
      <Pfeil d="M170 340 L212 340" />
      <Pfeil d="M336 340 L384 340" />
      <Pfeil d="M506 340 L552 340" />
      <g fill={F.kupferHell}>
        {SAUERSTOFF.map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="9" />
        ))}
      </g>

      <Etikett x={105} y={474} anker="middle">
        Lunge
      </Etikett>
      <Unterzeile x={105} y={506} anker="middle">
        Asthma, COPD
      </Unterzeile>
      <Etikett x={275} y={474} anker="middle">
        Blut
      </Etikett>
      <Unterzeile x={275} y={506} anker="middle">
        Blutarmut
      </Unterzeile>
      <Etikett x={445} y={474} anker="middle">
        Herz
      </Etikett>
      <Unterzeile x={445} y={506} anker="middle">
        Herzschwäche
      </Unterzeile>
      <Etikett x={615} y={474} anker="middle">
        Muskeln
      </Etikett>
      <Unterzeile x={615} y={506} anker="middle">
        untrainiert
      </Unterzeile>

      <Unterzeile x={360} y={640} anker="middle">
        Auch Angst und Übergewicht machen Luftnot
      </Unterzeile>
    </Zeichnung>
  );
}
