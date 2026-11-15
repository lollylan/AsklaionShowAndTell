import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const LUNGE_LINKS = 'M334 352 C290 340 236 390 228 470 C222 540 240 580 290 584 C320 586 336 560 338 520 Z';
const LUNGE_RECHTS = 'M386 352 C430 340 484 390 492 470 C498 540 480 580 430 584 C400 586 384 560 382 520 Z';
const LUFTROEHRE = 'M360 232 L360 372 M360 372 L306 414 M360 372 L414 414';
const SPEISEROEHRE = 'M374 236 L374 560 C374 588 388 600 404 606';

/** Atemwege, Speiseröhre und Magen von vorn; ringsum die häufigen Ursachen für Dauerhusten. */
export default function ChronischerHusten() {
  return (
    <Zeichnung titel="Kopf, Atemwege, Lunge und Magen von vorn; Hinweise auf die häufigen Ursachen von Dauerhusten: Schleim aus Nase und Nebenhöhlen, empfindliche Bronchien, aufsteigende Magensäure und Medikamente">
      {/* Speiseröhre hinter der Luftröhre */}
      <path d={SPEISEROEHRE} fill="none" stroke={F.leise} strokeWidth="18" strokeLinecap="round" />
      <path d={SPEISEROEHRE} fill="none" stroke={F.petrolDunkel} strokeWidth="10" strokeLinecap="round" />

      {/* Magen unter dem Zwerchfell */}
      <path
        d="M210 604 Q290 574 360 598 Q430 574 510 604"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M394 610 C380 644 400 678 450 678 C500 678 522 642 508 618 C498 602 472 606 464 622 C452 642 424 638 420 610 Z"
        {...KONTUR}
        fill={F.petrolDunkel}
      />
      <Pfeil d="M392 610 C376 600 374 590 374 528" farbe={F.kupfer} breite={6} />

      {/* Lunge mit Bronchien */}
      <path d={LUNGE_LINKS} {...KONTUR} fill={F.petrol} />
      <path d={LUNGE_RECHTS} {...KONTUR} fill={F.petrol} />
      <g stroke={F.petrolHell} strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M306 414 L284 470 M306 414 L318 476 M284 470 L262 512 M284 470 L292 530" />
        <path d="M414 414 L436 470 M414 414 L402 476 M436 470 L458 512 M436 470 L428 530" />
      </g>
      <path d={LUFTROEHRE} fill="none" stroke={F.linie} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      <path d={LUFTROEHRE} fill="none" stroke={F.creme} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />

      {/* Kopf mit Nebenhöhlen */}
      <rect x="336" y="200" width="48" height="40" fill={F.petrol} />
      <ellipse cx="360" cy="140" rx="76" ry="92" {...KONTUR} fill={F.petrol} />
      <ellipse cx="326" cy="166" rx="16" ry="12" fill={F.kupferHell} />
      <ellipse cx="394" cy="166" rx="16" ry="12" fill={F.kupferHell} />
      <path d="M336 116 L350 116 M370 116 L384 116" {...KONTUR} />
      <path d="M360 130 L350 170 Q360 176 370 170" {...KONTUR} stroke={F.leise} />
      {/* Schleim läuft in den Rachen */}
      <path d="M360 238 C352 252 350 260 360 264 C370 260 368 252 360 238 Z" fill={F.kupfer} />

      <Etikett x={40} y={124}>
        Nase und
      </Etikett>
      <Etikett x={40} y={156}>
        Nebenhöhlen
      </Etikett>
      <Unterzeile x={40} y={188}>
        Schleim im Rachen
      </Unterzeile>
      <Zeiger von={[220, 152]} nach={[318, 166]} />

      <Etikett x={680} y={124} anker="end">
        Medikamente
      </Etikett>
      <Unterzeile x={680} y={156} anker="end">
        Blutdrucksenker
      </Unterzeile>
      <g transform="translate(618 212) rotate(-30)">
        <path d="M0 -14 L-22 -14 A14 14 0 0 0 -22 14 L0 14 Z" fill={F.petrolHell} />
        <path d="M0 -14 L22 -14 A14 14 0 0 1 22 14 L0 14 Z" fill={F.creme} />
        <rect x="-36" y="-14" width="72" height="28" rx="14" {...KONTUR} strokeWidth="3" />
      </g>

      <Etikett x={40} y={432}>
        Bronchien
      </Etikett>
      <Unterzeile x={40} y={464}>
        Asthma,
      </Unterzeile>
      <Unterzeile x={40} y={492}>
        Rauchen, COPD
      </Unterzeile>
      <Zeiger von={[180, 424]} nach={[288, 462]} />

      <Etikett x={40} y={636}>
        Magen
      </Etikett>
      <Unterzeile x={40} y={668}>
        Säure steigt auf
      </Unterzeile>
      <Zeiger von={[136, 628]} nach={[400, 640]} />
    </Zeichnung>
  );
}
