import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const STIRN_LINKS = 'M350 252 C342 196 302 186 288 204 C276 222 294 252 350 252 Z';
const STIRN_RECHTS = 'M370 252 C378 196 418 186 432 204 C444 222 426 252 370 252 Z';
const KIEFER_LINKS = 'M338 386 L338 452 C320 470 272 468 256 446 C244 426 250 398 272 386 Z';
const KIEFER_RECHTS = 'M382 386 L382 452 C400 470 448 468 464 446 C476 426 470 398 448 386 Z';

/** Gesicht von vorn mit Stirn- und Kieferhöhlen: links belüftet, rechts entzündet mit Sekretstau. */
export default function Nasennebenhoehlen() {
  return (
    <Zeichnung titel="Gesicht von vorn mit Stirnhöhlen und Kieferhöhlen: auf der linken Bildseite mit Luft gefüllt, auf der rechten Seite mit geschwollener Schleimhaut und gestautem Sekret, Pfeile zeigen den Druckschmerz">
      <defs>
        <clipPath id="nasennebenhoehlen-rechts">
          <path d={STIRN_RECHTS} />
          <path d={KIEFER_RECHTS} />
        </clipPath>
      </defs>

      {/* Kopf */}
      <ellipse cx="360" cy="370" rx="175" ry="235" {...KONTUR} fill={F.petrol} />

      {/* Augenbrauen, Augen, Nase, Mund */}
      <path d="M256 286 C278 274 308 274 330 284 M390 284 C412 274 442 274 464 286" {...KONTUR} stroke={F.leise} />
      <ellipse cx="292" cy="326" rx="34" ry="15" {...KONTUR} />
      <circle cx="292" cy="326" r="8" fill={F.linie} />
      <ellipse cx="428" cy="326" rx="34" ry="15" {...KONTUR} />
      <circle cx="428" cy="326" r="8" fill={F.linie} />
      <path d="M360 300 L360 410 C355 422 350 428 345 430 M360 410 C365 422 370 428 375 430" {...KONTUR} />
      <path d="M318 516 C340 528 380 528 402 516" {...KONTUR} />

      {/* Links: gesund, mit Luft gefüllt */}
      <path d={STIRN_LINKS} fill={F.tief} stroke={F.petrolHell} strokeWidth="4" strokeLinejoin="round" />
      <path d={KIEFER_LINKS} fill={F.tief} stroke={F.petrolHell} strokeWidth="4" strokeLinejoin="round" />

      {/* Rechts: Sekret staut sich, Schleimhaut geschwollen */}
      <path d={STIRN_RECHTS} fill={F.tief} />
      <path d={KIEFER_RECHTS} fill={F.tief} />
      <g clipPath="url(#nasennebenhoehlen-rechts)">
        <rect x="360" y="226" width="100" height="40" fill={F.kupfer} />
        <rect x="360" y="418" width="130" height="60" fill={F.kupfer} />
      </g>
      <path d={STIRN_RECHTS} fill="none" stroke={F.kupferHell} strokeWidth="8" strokeLinejoin="round" />
      <path d={KIEFER_RECHTS} fill="none" stroke={F.kupferHell} strokeWidth="8" strokeLinejoin="round" />

      {/* Druckschmerz */}
      <Pfeil d="M600 196 L512 212" farbe={F.kupferHell} breite={6} />
      <Pfeil d="M630 426 L548 426" farbe={F.kupferHell} breite={6} />

      <Etikett x={180} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={180} y={98} anker="middle">
        Die Höhlen sind belüftet
      </Unterzeile>
      <Etikett x={540} y={66} anker="middle" farbe={F.kupferHell}>
        Entzündet
      </Etikett>
      <Unterzeile x={540} y={98} anker="middle">
        Sekret staut sich
      </Unterzeile>

      <Etikett x={30} y={226}>
        Stirnhöhle
      </Etikett>
      <Zeiger von={[180, 218]} nach={[300, 224]} />
      <Etikett x={30} y={432}>
        Kieferhöhle
      </Etikett>
      <Zeiger von={[194, 424]} nach={[272, 424]} />

      <Etikett x={360} y={660} anker="middle" farbe={F.kupferHell}>
        Druck und Schmerz, stärker beim Bücken
      </Etikett>
    </Zeichnung>
  );
}
