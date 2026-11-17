import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const WIRBEL = [0, 1, 2, 3, 4, 5, 6];

/** Kopf und Hals von der Seite, Gesicht links: Augen, Innenohr und Nacken melden dem Gleichgewichtszentrum; der verspannte Nacken meldet etwas anderes. */
export default function VertebragenerSchwindel() {
  return (
    <Zeichnung titel="Kopf und Hals von der Seite: Augen, Innenohr und Nackenmuskeln melden dem Gleichgewichtszentrum im Gehirn, wie der Kopf steht. Sind die Nackenmuskeln verspannt, passen die Meldungen nicht zusammen und man fühlt sich unsicher">
      {/* Schultern und Hals */}
      <path
        d="M252 404 C258 470 262 520 256 560 C200 585 130 598 70 612 M462 380 C494 450 512 520 532 562 C580 586 610 598 650 612"
        {...KONTUR}
      />
      <path d="M256 560 C200 585 130 598 70 612 L650 612 C610 598 580 586 532 562 C512 520 494 450 462 380 L252 404 C258 470 262 520 256 560 Z" fill={F.petrolDunkel} />

      {/* Halswirbelsäule */}
      {WIRBEL.map((i) => (
        <rect
          key={i}
          x={316 + i * 2.5}
          y={408 + i * 26}
          width="46"
          height="18"
          rx="6"
          fill={F.petrolHell}
          stroke={F.linie}
          strokeWidth="3"
        />
      ))}

      {/* Kopf mit Nase */}
      <path d="M140 228 L104 290 L142 300" {...KONTUR} fill={F.petrolDunkel} />
      <ellipse cx="300" cy="250" rx="170" ry="178" {...KONTUR} fill={F.petrolDunkel} />
      {/* Gehirn */}
      <ellipse cx="310" cy="210" rx="128" ry="112" fill={F.petrol} stroke={F.leise} strokeWidth="3" />
      {/* Auge */}
      <path d="M156 226 Q176 210 196 226 Q176 242 156 226 Z" fill={F.creme} stroke={F.linie} strokeWidth="3" />
      <circle cx="174" cy="226" r="6" fill={F.tief} />
      {/* Ohr */}
      <path d="M400 232 C432 226 440 266 426 292 C416 310 398 306 396 292" {...KONTUR} fill={F.petrolDunkel} />
      <path d="M412 254 C422 258 420 276 410 278" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Verspannte Nackenmuskeln, setzen am Hinterkopf an */}
      <path
        d="M380 372 C424 360 450 410 460 460 C470 510 478 550 490 590 C458 596 428 592 412 586 C402 540 394 480 386 430 Z"
        fill={F.kupfer}
        stroke={F.linie}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g fill="none" stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round">
        <path d="M396 396 C410 440 418 490 424 540" />
        <path d="M418 392 C432 440 444 500 456 570" />
        <path d="M404 470 C410 510 416 550 422 580" />
      </g>

      {/* Gleichgewichtszentrum */}
      <circle cx="300" cy="282" r="30" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <text x="300" y="294" textAnchor="middle" fontSize="34" fontWeight="700" fill={F.kupferHell}>
        ?
      </text>

      {/* Meldungen an das Gleichgewichtszentrum */}
      <Pfeil d="M204 236 C230 246 248 258 262 268" farbe={F.linie} breite={5} />
      <Pfeil d="M392 274 C370 278 356 280 340 282" farbe={F.linie} breite={5} />
      <Pfeil d="M436 500 C420 420 370 350 320 314" farbe={F.kupferHell} breite={5} />

      <Etikett x={360} y={46} anker="middle">
        Gleichgewichtszentrum
      </Etikett>
      <Zeiger von={[330, 58]} nach={[300, 252]} />

      <Etikett x={30} y={150}>
        Augen
      </Etikett>
      <Zeiger von={[70, 162]} nach={[162, 222]} />

      <Etikett x={690} y={196} anker="end">
        Innenohr
      </Etikett>
      <Zeiger von={[612, 206]} nach={[430, 262]} />

      <Etikett x={690} y={376} anker="end" farbe={F.kupferHell}>
        Nackenmuskeln
      </Etikett>
      <Unterzeile x={690} y={406} anker="end">
        verspannt
      </Unterzeile>
      <Zeiger von={[620, 418]} nach={[462, 520]} />

      <Etikett x={30} y={470}>
        Halswirbelsäule
      </Etikett>
      <Zeiger von={[150, 484]} nach={[322, 490]} />

      <Etikett x={360} y={656} anker="middle" farbe={F.kupferHell}>
        Widersprüchliche Signale
      </Etikett>
      <Unterzeile x={360} y={690} anker="middle">
        Sie fühlen sich unsicher und schwanken
      </Unterzeile>
    </Zeichnung>
  );
}
