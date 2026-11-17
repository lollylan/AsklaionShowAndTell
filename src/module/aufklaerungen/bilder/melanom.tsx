import { Etikett, F, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const L = 230; // linker Rand des Hautschnitts
const R = 690; // rechter Rand
const OBEN = 220; // Hautoberfläche
const LEDER = 270; // Grenze Oberhaut / Lederhaut
const FETT = 480; // Grenze Lederhaut / Fettgewebe
const UNTEN = 590;

const GEFAESS_Y = 440; // Mitte des Gefäßes in der tiefen Lederhaut

/** Melanom: unregelmäßig, wächst von der Oberhaut in die Tiefe bis an ein Gefäß. */
const MELANOM =
  'M466 220 C480 214 600 214 616 220 C612 236 604 244 600 262 C596 280 606 296 594 314 C584 330 590 350 578 368 C570 384 566 404 556 424 C550 434 538 434 534 422 C526 404 512 396 510 376 C508 356 494 346 496 326 C498 306 482 296 484 276 C486 258 470 244 466 220 Z';

const FETTZELLEN: [number, number][] = [];
for (let x = L + 30; x < R; x += 56) {
  FETTZELLEN.push([x, 512]);
  FETTZELLEN.push([x + 28, 558]);
}

/** Schnitt durch die Haut: harmloses Muttermal flach in der Oberhaut, Melanom wächst in die Tiefe bis an ein Gefäß. */
export default function Melanom() {
  return (
    <Zeichnung titel="Schnitt durch die Haut mit Oberhaut, Lederhaut und Fettgewebe: links ein harmloses Muttermal, flach in der Oberhaut; rechts ein Melanom, das in die Tiefe wächst und ein Gefäß erreicht, über das es streuen kann">
      <defs>
        <clipPath id="melanom-fett">
          <rect x={L} y={FETT} width={R - L} height={UNTEN - FETT} />
        </clipPath>
      </defs>

      {/* Hautschichten */}
      <rect x={L} y={FETT} width={R - L} height={UNTEN - FETT} fill={F.petrolDunkel} />
      <g clipPath="url(#melanom-fett)" fill="none" stroke={F.leise} strokeWidth="2" strokeOpacity="0.5">
        {FETTZELLEN.map(([x, y]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="26" ry="20" />
        ))}
      </g>
      <rect x={L} y={LEDER} width={R - L} height={FETT - LEDER} fill={F.petrol} />
      <rect x={L} y={OBEN} width={R - L} height={LEDER - OBEN} fill={F.petrolHell} />
      <line x1={L} y1={OBEN} x2={R} y2={OBEN} stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      <line x1={L} y1={LEDER} x2={R} y2={LEDER} stroke={F.leise} strokeWidth="2" />
      <line x1={L} y1={FETT} x2={R} y2={FETT} stroke={F.leise} strokeWidth="2" />

      {/* Gefäß (Lymph- oder Blutgefäß) */}
      <rect x={L} y={GEFAESS_Y - 16} width={R - L} height="32" fill={F.tief} />
      <line x1={L} y1={GEFAESS_Y - 16} x2={R} y2={GEFAESS_Y - 16} stroke={F.leise} strokeWidth="3" />
      <line x1={L} y1={GEFAESS_Y + 16} x2={R} y2={GEFAESS_Y + 16} stroke={F.leise} strokeWidth="3" />

      {/* Harmloses Muttermal: flach, bleibt in der Oberhaut */}
      <path
        d="M290 220 C290 214 370 214 370 220 C366 240 350 252 330 252 C310 252 294 240 290 220 Z"
        fill={F.tief}
        stroke={F.linie}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Melanom */}
      <path d={MELANOM} fill={F.kupfer} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />
      {[
        [520, 246, 9],
        [574, 262, 7],
        [538, 318, 8],
        [556, 376, 6],
      ].map(([x, y, r]) => (
        <circle key={x} cx={x} cy={y} r={r} fill={F.tief} fillOpacity="0.7" />
      ))}

      {/* Zellen, die sich lösen und mit dem Gefäß wandern */}
      {[574, 606, 640].map((x) => (
        <circle key={x} cx={x} cy={GEFAESS_Y} r="7" fill={F.kupferHell} />
      ))}
      <Pfeil d={`M${R - 36} ${GEFAESS_Y} L${R - 6} ${GEFAESS_Y}`} farbe={F.kupferHell} breite={4} />

      {/* Tumordicke */}
      <line x1="452" y1={OBEN + 4} x2="452" y2="428" stroke={F.linie} strokeWidth="3" markerStart="url(#pfeilspitze)" markerEnd="url(#pfeilspitze)" />
      <line x1="440" y1="430" x2="536" y2="430" stroke={F.linie} strokeWidth="2" strokeDasharray="5 5" />

      {/* Schichten */}
      <Etikett x={210} y={254} anker="end">
        Oberhaut
      </Etikett>
      <Etikett x={210} y={360} anker="end">
        Lederhaut
      </Etikett>
      <Etikett x={210} y={544} anker="end">
        Fettgewebe
      </Etikett>

      {/* Oben: Muttermal und Melanom */}
      <Etikett x={330} y={120} anker="middle">
        Muttermal
      </Etikett>
      <Unterzeile x={330} y={150} anker="middle">
        flach, harmlos
      </Unterzeile>
      <Zeiger von={[330, 164]} nach={[330, 222]} />

      <Etikett x={560} y={120} anker="middle" farbe={F.kupferHell}>
        Melanom
      </Etikett>
      <Unterzeile x={560} y={150} anker="middle">
        wächst in die Tiefe
      </Unterzeile>
      <Zeiger von={[560, 164]} nach={[560, 230]} />

      {/* Unten: Tumordicke und Streuweg */}
      <Zeiger von={[400, 616]} nach={[452, 380]} />
      <Etikett x={40} y={650}>
        Tumordicke
      </Etikett>
      <Unterzeile x={40} y={680}>
        entscheidet über die Behandlung
      </Unterzeile>

      <Zeiger von={[640, 616]} nach={[640, GEFAESS_Y + 10]} />
      <Etikett x={690} y={650} anker="end" farbe={F.kupferHell}>
        Gefäß
      </Etikett>
      <Unterzeile x={690} y={680} anker="end">
        Weg zum Streuen
      </Unterzeile>
    </Zeichnung>
  );
}
