import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Elektrode, KOERPER, Schmerzzone } from './tens-teile';

/** Hals, Schultern und oberer Rücken von hinten, Arme abgeschnitten; Mitte bei x = 360. */
const OBERKOERPER =
  'M306 170 L304 262 C300 290 250 300 190 318 C140 334 112 362 106 410 L100 640 ' +
  'L620 640 L614 410 C608 362 580 334 530 318 C470 300 420 290 416 262 L414 170 Z';

/** Nacken und Schultern von hinten mit Elektroden neben der Halswirbelsäule und auf der schmerzenden Schulter. */
export default function TensNacken() {
  return (
    <Zeichnung titel="Kopf, Nacken und Schultern von hinten: zwei Elektroden kleben links und rechts neben der Halswirbelsäule im Nacken, zwei weitere oben auf der schmerzenden Schulter">
      <clipPath id="tens-nacken-koerper">
        <path d={OBERKOERPER} />
      </clipPath>

      <path d={OBERKOERPER} {...KOERPER} />
      <g clipPath="url(#tens-nacken-koerper)">
        <Schmerzzone cx={500} cy={330} rx={140} ry={72} />
      </g>

      {/* Hinterkopf mit Haar bis zum Haaransatz im Nacken */}
      <clipPath id="tens-nacken-kopf">
        <ellipse cx="360" cy="138" rx="78" ry="92" />
      </clipPath>
      <ellipse cx="360" cy="138" rx="78" ry="92" {...KOERPER} />
      <path
        d="M270 40 L450 40 L450 196 C420 212 400 200 360 206 C320 200 300 212 270 196 Z"
        fill={F.petrolDunkel}
        clipPath="url(#tens-nacken-kopf)"
      />
      <ellipse cx="360" cy="138" rx="78" ry="92" {...KOERPER} fill="none" />
      {/* Ohren */}
      <path d="M282 130 C268 126 266 160 284 166 M438 130 C452 126 454 160 436 166" fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />

      {/* Schulterblätter */}
      <path
        d="M250 400 C232 450 240 500 280 530 M470 400 C488 450 480 500 440 530"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />

      {/* Wirbelsäule */}
      <line x1="360" y1="236" x2="360" y2="630" stroke={F.leise} strokeWidth="12" strokeDasharray="14 8" />

      {/* Elektroden im Nacken neben der Halswirbelsäule */}
      <Elektrode x={326} y={270} groesse={40} />
      <Elektrode x={394} y={270} groesse={40} />
      {/* Elektroden auf der schmerzenden Schulter */}
      <Elektrode x={466} y={330} groesse={44} drehung={14} />
      <Elektrode x={566} y={364} groesse={44} drehung={24} />

      <Zeiger von={[166, 258]} nach={[322, 270]} />
      <Etikett x={40} y={266}>
        Nacken
      </Etikett>
      <Unterzeile x={40} y={298}>
        nicht vorne am Hals
      </Unterzeile>

      <Zeiger von={[590, 260]} nach={[566, 362]} />
      <Etikett x={690} y={240} anker="end" farbe={F.kupferHell}>
        Schulter
      </Etikett>
    </Zeichnung>
  );
}
