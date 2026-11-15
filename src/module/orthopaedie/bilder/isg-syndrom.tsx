import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

// Becken von hinten. Die linke Bildhälfte wird gezeichnet und für rechts gespiegelt.

const KREUZBEIN =
  'M300 222 C330 212 390 212 420 222 C420 300 396 380 370 428 L350 428 C324 380 300 300 300 222 Z';
const STEISSBEIN = 'M352 436 L368 436 C370 450 366 462 360 468 C354 462 350 450 352 436 Z';
/** Löcher im Kreuzbein, je Seite vier. */
const LOECHER: [number, number][] = [
  [30, 262],
  [27, 302],
  [22, 342],
  [16, 380],
];

const DARMBEIN =
  'M288 228 C262 190 220 158 176 156 C140 154 112 176 110 214 C108 258 132 300 166 330 C188 350 204 372 214 398 L240 402 C252 380 270 360 300 346 C298 310 292 266 288 228 Z';
/** Sitz- und Schambein als Ring um das Loch darunter. */
const BECKENRING =
  'M212 398 C206 432 214 466 236 488 C262 508 312 506 336 490 C346 470 338 446 318 442 C290 438 262 428 244 404 Z M250 462 C250 450 286 450 296 462 C300 474 286 482 270 480 C258 478 250 472 250 462 Z';
const OBERSCHENKEL =
  'M190 392 C168 396 150 396 132 404 C116 414 116 438 128 452 C140 466 148 480 152 500 L160 700 L206 700 L202 500 C204 470 210 446 222 428 Z';
const GELENK = 'M294 228 C296 268 300 306 306 344';

function Haelfte({ gereizt = false }: { gereizt?: boolean }) {
  return (
    <g>
      <circle cx="198" cy="412" r="30" {...KONTUR} fill={F.creme} />
      <path d={OBERSCHENKEL} {...KONTUR} fill={F.creme} />
      <path d={BECKENRING} {...KONTUR} fill={F.creme} fillRule="evenodd" />
      <path d={DARMBEIN} {...KONTUR} fill={F.creme} />
      {gereizt ? (
        <path d={GELENK} {...KONTUR} stroke={F.kupfer} strokeWidth="12" />
      ) : (
        <path d={GELENK} {...KONTUR} stroke={F.petrolHell} strokeWidth="8" />
      )}
    </g>
  );
}

/** Becken von hinten mit beiden Kreuz-Darmbein-Gelenken, rechts gereizt mit Schmerz in Gesäß und Oberschenkel. */
export default function IsgSyndrom() {
  return (
    <Zeichnung titel="Becken von hinten: in der Mitte das Kreuzbein zwischen den beiden Darmbeinschaufeln, rechts ist das Kreuz-Darmbein-Gelenk gereizt, der Schmerz strahlt ins Gesäß und in die Rückseite des Oberschenkels aus">
      {/* Schmerzzone hinter den Knochen */}
      <path
        d="M420 350 C470 322 560 334 602 376 C642 418 624 480 594 520 C582 560 588 620 574 660 C562 692 520 692 512 660 C500 610 500 560 470 522 C430 482 400 418 420 350 Z"
        fill={F.kupfer}
        fillOpacity="0.75"
        stroke={F.kupferHell}
        strokeWidth="3"
        strokeDasharray="10 9"
      />

      <Haelfte />
      <g transform="translate(720 0) scale(-1 1)">
        <Haelfte gereizt />
      </g>

      <path d={KREUZBEIN} {...KONTUR} fill={F.creme} />
      {LOECHER.map(([dx, y]) => (
        <g key={y} fill={F.petrol}>
          <ellipse cx={360 - dx} cy={y} rx="8" ry="6" />
          <ellipse cx={360 + dx} cy={y} rx="8" ry="6" />
        </g>
      ))}
      <path d={STEISSBEIN} {...KONTUR} fill={F.creme} />

      {/* Schmerz-Striche am gereizten Gelenk */}
      <path d="M446 250 L470 242 M450 276 L476 276 M446 302 L470 310" {...KONTUR} stroke={F.kupfer} />

      <Zeiger von={[360, 164]} nach={[360, 250]} />
      <Etikett x={360} y={150} anker="middle">
        Kreuzbein
      </Etikett>
      <Zeiger von={[90, 128]} nach={[150, 184]} />
      <Etikett x={40} y={112}>
        Darmbein
      </Etikett>
      <Zeiger von={[500, 128]} nach={[428, 232]} />
      <Etikett x={690} y={80} anker="end" farbe={F.kupferHell}>
        Gelenk gereizt
      </Etikett>
      <Unterzeile x={690} y={112} anker="end">
        Kreuz-Darmbein-Gelenk
      </Unterzeile>

      <Etikett x={360} y={600} anker="middle" farbe={F.kupferHell}>
        Schmerz im Gesäß
      </Etikett>
      <Unterzeile x={360} y={632} anker="middle">
        strahlt in den Oberschenkel
      </Unterzeile>
    </Zeichnung>
  );
}
