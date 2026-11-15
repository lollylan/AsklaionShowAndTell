import { Etikett, F, KONTUR, Zeichnung } from './bausteine';

const LEISE = {
  fill: 'none',
  stroke: F.leise,
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Kopf von vorn: pochender Schmerz auf einer Seite, dazu die typischen Begleiter. */
export default function Migraene() {
  return (
    <Zeichnung titel="Kopf von vorn mit pochendem Schmerz an einer Schläfe, daneben die Begleitzeichen Übelkeit sowie Licht- und Lärmempfindlichkeit">
      {/* Hals und Schultern */}
      <path
        d="M50 600 C60 560 150 545 182 500 L182 430 L278 430 L278 500 C310 545 400 560 410 600"
        {...KONTUR}
        fill={F.petrolDunkel}
      />

      {/* Ohren */}
      <path d="M102 262 C82 254 78 302 101 316" {...KONTUR} fill={F.petrol} />
      <path d="M358 262 C378 254 382 302 359 316" {...KONTUR} fill={F.petrol} />

      {/* Kopf */}
      <path
        d="M230 110 C310 110 362 170 360 255 C358 330 335 395 290 435 C270 452 250 458 230 458 C210 458 190 452 170 435 C125 395 102 330 100 255 C98 170 150 110 230 110 Z"
        {...KONTUR}
        fill={F.petrol}
      />

      {/* Schmerzherd an Schläfe und Auge */}
      <circle cx="305" cy="245" r="40" fill={F.kupfer} fillOpacity="0.9" />
      <circle cx="305" cy="245" r="18" fill={F.kupferHell} />
      <g fill="none" stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round">
        <path d="M321 185 A62 62 0 0 1 361 271" />
        <path d="M327 162 A86 86 0 0 1 383 281" strokeOpacity="0.75" />
        <path d="M333 139 A110 110 0 0 1 405 292" strokeOpacity="0.5" />
      </g>

      {/* Gesicht: zusammengekniffene Augen */}
      <path d="M160 270 L205 276 M300 270 L255 276" {...KONTUR} />
      <path d="M165 292 Q185 304 205 292 M255 292 Q275 304 295 292" {...KONTUR} />
      <path d="M230 306 C226 326 222 342 233 349" {...KONTUR} stroke={F.leise} />
      <path d="M205 394 Q230 386 255 394" {...KONTUR} />

      {/* Stichworte rechts */}
      <Etikett x={460} y={232} farbe={F.kupferHell}>
        einseitig,
      </Etikett>
      <Etikett x={460} y={264} farbe={F.kupferHell}>
        pochend
      </Etikett>

      {/* Übelkeit: Spirale */}
      <path d="M480 350 a4 4 0 1 1 -8 0 a8 8 0 1 1 16 0 a12 12 0 1 1 -24 0 a16 16 0 1 1 32 0" {...LEISE} />
      <Etikett x={460} y={402}>
        Übelkeit
      </Etikett>

      {/* Licht (Sonne) und Lärm (Schallwellen) */}
      <circle cx="476" cy="470" r="8" {...LEISE} />
      <path
        d="M489 470 L495 470 M457 470 L463 470 M476 451 L476 457 M476 483 L476 489 M485 461 L490 456 M462 484 L467 479 M467 461 L462 456 M490 484 L485 479"
        {...LEISE}
      />
      <path d="M524 462 A10 10 0 0 1 524 478 M532 455 A19 19 0 0 1 532 485 M540 448 A28 28 0 0 1 540 492" {...LEISE} />
      <Etikett x={460} y={522}>
        licht- und
      </Etikett>
      <Etikett x={460} y={554}>
        lärmempfindlich
      </Etikett>
    </Zeichnung>
  );
}
