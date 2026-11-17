import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Schädel im Querschnitt von vorn: sichelförmiger Bluterguss zwischen harter Hirnhaut und Gehirn, eine gerissene Brückenvene, die Mitte des Gehirns ist zur Seite gedrückt. */
export default function Subduralhaematom() {
  return (
    <Zeichnung titel="Schädel im Querschnitt von vorn: zwischen der harten Hirnhaut und dem Gehirn liegt ein sichelförmiger Bluterguss aus einer gerissenen Brückenvene. Er drückt das Gehirn zur Seite, die Mittellinie ist verschoben">
      {/* Schädelknochen */}
      <ellipse cx="360" cy="300" rx="230" ry="220" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <ellipse cx="360" cy="300" rx="208" ry="198" fill={F.tief} stroke={F.leise} strokeWidth="2" />
      {/* Harte Hirnhaut */}
      <ellipse cx="360" cy="300" rx="202" ry="192" fill="none" stroke={F.petrolHell} strokeWidth="6" />

      {/* Bluterguss, sichelförmig zwischen harter Hirnhaut und Gehirn */}
      <path
        d="M250 132 A202 192 0 0 0 250 468 Q150 300 250 132 Z"
        fill={F.kupfer}
        stroke={F.linie}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Gehirn: linke Hälfte im Bild zusammengedrückt, die Mitte nach rechts verschoben */}
      <path
        d="M384 118 C340 112 290 124 262 146 Q154 300 262 454 C296 482 350 488 384 486 Z"
        {...KONTUR}
        fill={F.petrol}
      />
      <path
        d="M396 118 C474 114 546 168 550 270 C554 370 516 456 446 478 C424 486 408 488 396 486 Z"
        {...KONTUR}
        fill={F.petrol}
      />
      <g fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round">
        <path d="M296 186 C314 174 334 202 356 188" />
        <path d="M262 270 C282 258 300 286 324 272" />
        <path d="M272 360 C292 348 312 376 336 362" />
        <path d="M430 170 C452 158 472 186 494 172" />
        <path d="M450 270 C472 258 492 286 516 272" />
        <path d="M430 370 C452 358 472 386 494 372" />
      </g>
      {/* Hirnsichel zwischen den Hälften */}
      <line x1="390" y1="108" x2="390" y2="330" stroke={F.petrolHell} strokeWidth="5" strokeLinecap="round" />

      {/* Gerissene Brückenvene */}
      <g stroke={F.creme} strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M164 268 C172 274 174 282 184 292" />
        <path d="M196 308 C202 318 206 320 212 332" />
      </g>

      {/* Wo die Mitte eigentlich liegt */}
      <line x1="360" y1="96" x2="360" y2="548" stroke={F.leise} strokeWidth="3" strokeDasharray="10 10" strokeLinecap="round" />
      <Pfeil d="M360 572 L392 572" farbe={F.kupferHell} breite={4} />

      <Etikett x={30} y={50}>
        Gerissene Brückenvene
      </Etikett>
      <Zeiger von={[120, 64]} nach={[176, 282]} />

      <Etikett x={690} y={50} anker="end">
        Schädelknochen
      </Etikett>
      <Zeiger von={[600, 64]} nach={[526, 130]} />

      <Etikett x={460} y={318} anker="middle">
        Gehirn
      </Etikett>

      <Etikett x={690} y={680} anker="end">
        Harte Hirnhaut
      </Etikett>
      <Zeiger von={[640, 656]} nach={[548, 390]} />

      <Etikett x={30} y={600} farbe={F.kupferHell}>
        Bluterguss
      </Etikett>
      <Unterzeile x={30} y={630}>
        drückt auf das Gehirn
      </Unterzeile>
      <Zeiger von={[100, 576]} nach={[196, 380]} />

      <Etikett x={376} y={616} anker="middle">
        Mitte verschoben
      </Etikett>
    </Zeichnung>
  );
}
