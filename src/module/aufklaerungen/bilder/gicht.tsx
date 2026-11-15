import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Harnsäure-Kristalle als kurze Nadeln [x1, y1, x2, y2] im vergrößerten Gelenk. */
const KRISTALLE: [number, number, number, number][] = [
  [520, 180, 538, 208],
  [508, 292, 532, 270],
  [522, 226, 544, 216],
  [518, 244, 546, 252],
  [524, 266, 540, 292],
  [500, 170, 516, 190],
  [548, 168, 566, 190],
  [490, 302, 512, 314],
  [552, 300, 570, 284],
];

/** Fuß von der Seite mit entzündetem Großzehengelenk und vergrößertem Ausschnitt. */
export default function Gicht() {
  return (
    <Zeichnung titel="Fuß von der Seite mit hervorgehobenem Gelenk am großen Zeh, daneben ein vergrößerter Ausschnitt des Gelenks mit nadelförmigen Harnsäure-Kristallen">
      <defs>
        <clipPath id="gicht-lupe">
          <circle cx="520" cy="240" r="138" />
        </clipPath>
      </defs>

      {/* Fuß mit Unterschenkel, Zehen zeigen nach rechts */}
      <path
        d="M110 140 L110 420 C105 460 60 470 60 520 C60 550 80 562 120 562 C180 562 200 544 250 544 C290 544 310 562 350 562 L420 562 C448 562 456 548 456 536 C456 520 440 510 420 508 C360 500 300 440 250 400 C225 380 212 350 212 300 L212 140"
        {...KONTUR}
        fill={F.petrol}
      />
      <path d="M138 446 A16 16 0 0 1 166 446" {...KONTUR} stroke={F.leise} />

      {/* Entzündetes Großzehengrundgelenk */}
      <circle cx="362" cy="528" r="22" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />

      {/* Verbindung zur Vergrößerung */}
      <path
        d="M346 512 L401 314 M384 522 L594 359"
        fill="none"
        stroke={F.leise}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Vergrößerter Ausschnitt */}
      <circle cx="520" cy="240" r="140" fill={F.tief} />
      <g clipPath="url(#gicht-lupe)">
        <circle cx="524" cy="240" r="92" fill={F.kupfer} fillOpacity="0.4" />
        <path
          d="M360 212 L440 212 C455 190 510 195 512 240 C510 285 455 290 440 268 L360 268 Z"
          fill={F.creme}
          stroke={F.leise}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M690 216 L610 216 C590 198 545 195 540 202 C552 225 552 255 540 278 C545 285 590 282 610 264 L690 264 Z"
          fill={F.creme}
          stroke={F.leise}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {KRISTALLE.map(([x1, y1, x2, y2]) => (
          <line
            key={`${x1}-${y1}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={F.kupferHell}
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
      </g>
      <circle cx="520" cy="240" r="140" {...KONTUR} />

      <Etikett x={690} y={60} anker="end">
        Harnsäure-Kristalle im Gelenk
      </Etikett>
      <Zeiger von={[560, 78]} nach={[557, 179]} />

      <Zeiger von={[362, 612]} nach={[362, 540]} />
      <Etikett x={362} y={642} anker="middle" farbe={F.kupferHell}>
        rot, heiß, geschwollen
      </Etikett>
      <Unterzeile x={362} y={674} anker="middle">
        meist am großen Zeh
      </Unterzeile>
    </Zeichnung>
  );
}
