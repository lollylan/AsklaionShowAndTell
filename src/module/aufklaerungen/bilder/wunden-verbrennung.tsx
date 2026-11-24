import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Zeichnung } from './bausteine';

// Haut im Schnitt mit allen fünf Verbrennungsgraden nebeneinander (Grad 1, 2a, 2b, 3, 4).
// Eigener Block mit Muskelschicht, weil Grad 4 bis in den Muskel reicht.
const LINKS = 24;
const RECHTS = 696;
const OBEN = 236; // Hautoberfläche
const OBERHAUT = 266; // Grenze Oberhaut / Lederhaut
const LEDER_MITTE = 330; // obere / tiefe Lederhaut (Grenze 2a / 2b)
const FETT = 410;
const MUSKEL = 500;
const UNTEN = 600;

const SPALTE = (RECHTS - LINKS) / 5;
/** Mitte je Grad. */
const MITTE = [0, 1, 2, 3, 4].map((i) => LINKS + SPALTE * (i + 0.5));
const GRENZEN = [1, 2, 3, 4].map((i) => LINKS + SPALTE * i);
const VERKOHLT = '#1f1a17';

/** Fettläppchen als [x, y]; die erste Spalte bleibt frei für die Namen der Schichten. */
const LAEPPCHEN: [number, number][] = [];
for (let reihe = 0; reihe < 2; reihe++) {
  for (let x = LINKS + 22 + (reihe % 2) * 26; x < RECHTS + 30; x += 52) {
    if (x > LINKS + SPALTE - 6) LAEPPCHEN.push([x, FETT + 24 + reihe * 44]);
  }
}

/** Blase: die Oberhaut hebt sich als Kuppel ab. */
function Blase({ mitte, halb, hoehe }: { mitte: number; halb: number; hoehe: number }) {
  const d = `M${mitte - halb} ${OBEN + 2} C${mitte - halb + 8} ${OBEN - hoehe} ${mitte + halb - 8} ${OBEN - hoehe} ${mitte + halb} ${OBEN + 2}`;
  return (
    <g>
      <path d={`${d} Z`} fill={F.creme} fillOpacity="0.35" />
      <path d={d} fill="none" stroke={F.petrolHell} strokeWidth="10" strokeLinecap="round" />
    </g>
  );
}

export default function WundenVerbrennung() {
  const [g1, g2a, g2b, g3, g4] = MITTE;
  const [b1, b2, b3, b4] = GRENZEN;
  const breite = RECHTS - LINKS;
  return (
    <Zeichnung titel="Haut im Schnitt mit Oberhaut, Lederhaut, Fettgewebe und Muskel und fünf Verbrennungsgraden nebeneinander: Grad 1 ist nur die Oberhaut gerötet. Bei Grad 2a hebt sich die Oberhaut als Blase ab, der Grund darunter ist rot. Bei Grad 2b reicht der Schaden tief in die Lederhaut, der Blasengrund ist blass. Bei Grad 3 ist die ganze Haut bis zum Fett zerstört, weiß und lederartig. Bei Grad 4 ist alles bis in den Muskel schwarz verkohlt">
      <defs>
        <clipPath id="verbrennung-haut">
          <rect x={LINKS} y={OBEN} width={breite} height={UNTEN - OBEN} rx="18" />
        </clipPath>
      </defs>

      <Blase mitte={g2a} halb={50} hoehe={44} />
      <Blase mitte={g2b} halb={44} hoehe={26} />

      <g clipPath="url(#verbrennung-haut)">
        {/* Schichten: Oberhaut, Lederhaut, Fett, Muskel */}
        <rect x={LINKS} y={OBEN} width={breite} height={OBERHAUT - OBEN} fill={F.petrolHell} />
        <rect x={LINKS} y={OBERHAUT} width={breite} height={FETT - OBERHAUT} fill={F.petrol} />
        <rect x={LINKS} y={FETT} width={breite} height={MUSKEL - FETT} fill={F.petrolDunkel} />
        <rect x={LINKS} y={MUSKEL} width={breite} height={UNTEN - MUSKEL} fill={F.tief} />
        <g fill="none" stroke={F.petrol} strokeWidth="3">
          {LAEPPCHEN.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="20" />
          ))}
        </g>
        <g stroke={F.petrolDunkel} strokeWidth="3" strokeLinecap="round">
          {[524, 548, 572].map((y) => (
            <line key={y} x1={LINKS + SPALTE} y1={y} x2={RECHTS} y2={y + 6} />
          ))}
        </g>

        {/* Grad 1: nur die Oberhaut gerötet */}
        <rect x={LINKS} y={OBEN} width={SPALTE} height={OBERHAUT - OBEN} fill={F.kupferHell} />

        {/* Grad 2a: Oberhaut fehlt unter der Blase, obere Lederhaut rot */}
        <path
          d={`M${b1} ${OBEN} L${b2} ${OBEN} L${b2} ${LEDER_MITTE - 10} C${g2a + 30} ${LEDER_MITTE + 6} ${g2a - 30} ${LEDER_MITTE + 6} ${b1} ${LEDER_MITTE - 10} Z`}
          fill={F.kupfer}
        />

        {/* Grad 2b: bis tief in die Lederhaut, Grund blass mit roten Tüpfeln */}
        <path
          d={`M${b2} ${OBEN} L${b3} ${OBEN} L${b3} ${FETT - 24} C${g2b + 30} ${FETT - 8} ${g2b - 30} ${FETT - 8} ${b2} ${FETT - 24} Z`}
          fill={F.creme}
          fillOpacity="0.6"
        />
        <g fill={F.kupfer}>
          {[
            [-34, 284],
            [-6, 300],
            [26, 280],
            [-22, 330],
            [14, 346],
            [40, 318],
            [-40, 370],
            [4, 378],
          ].map(([dx, y]) => (
            <circle key={`${dx}-${y}`} cx={g2b + dx} cy={y} r="5" />
          ))}
        </g>

        {/* Grad 3: ganze Haut bis ins Fett zerstört, weiß und lederartig */}
        <path
          d={`M${b3} ${OBEN} L${b4} ${OBEN} L${b4} ${FETT + 18} C${g3 + 30} ${FETT + 32} ${g3 - 30} ${FETT + 32} ${b3} ${FETT + 18} Z`}
          fill={F.creme}
          fillOpacity="0.88"
        />
        <g stroke={F.leise} strokeWidth="3" strokeLinecap="round">
          <line x1={g3 - 40} y1={OBEN + 30} x2={g3 - 14} y2={OBEN + 56} />
          <line x1={g3 + 4} y1={OBEN + 90} x2={g3 + 40} y2={OBEN + 108} />
          <line x1={g3 - 34} y1={OBEN + 136} x2={g3 - 6} y2={OBEN + 154} />
        </g>

        {/* Grad 4: verkohlt durch Haut und Fett bis in den Muskel */}
        <path
          d={`M${b4} ${OBEN} L${RECHTS} ${OBEN} L${RECHTS} ${MUSKEL + 54} C${g4 + 30} ${MUSKEL + 72} ${g4 - 30} ${MUSKEL + 72} ${b4} ${MUSKEL + 54} Z`}
          fill={VERKOHLT}
        />
        <path
          d={`M${b4} ${MUSKEL + 54} C${g4 - 30} ${MUSKEL + 72} ${g4 + 30} ${MUSKEL + 72} ${RECHTS} ${MUSKEL + 54}`}
          fill="none"
          stroke={F.kupfer}
          strokeWidth="8"
        />
        <g stroke="#4a3f38" strokeWidth="4" strokeLinecap="round">
          <line x1={g4 - 36} y1={OBEN + 40} x2={g4 - 6} y2={OBEN + 62} />
          <line x1={g4 + 10} y1={OBEN + 120} x2={g4 + 42} y2={OBEN + 134} />
          <line x1={g4 - 40} y1={OBEN + 200} x2={g4 - 10} y2={OBEN + 214} />
          <line x1={g4 + 4} y1={OBEN + 270} x2={g4 + 36} y2={OBEN + 282} />
        </g>
      </g>
      <rect x={LINKS} y={OBEN} width={breite} height={UNTEN - OBEN} rx="18" {...KONTUR} />

      {/* Namen der Schichten in der ersten Spalte, unter der geröteten Oberhaut */}
      <Klein x={g1} y={(OBERHAUT + FETT) / 2 + 7} farbe={F.linie}>
        Lederhaut
      </Klein>
      <Klein x={g1} y={(FETT + MUSKEL) / 2 + 7} farbe={F.linie}>
        Fett
      </Klein>
      <Klein x={g1} y={(MUSKEL + UNTEN) / 2 + 7} farbe={F.linie}>
        Muskel
      </Klein>

      {/* Trennlinien zwischen den Graden */}
      {GRENZEN.map((x) => (
        <line key={x} x1={x} y1={OBEN - 50} x2={x} y2={UNTEN + 30} stroke={F.leise} strokeWidth="2" strokeDasharray="8 8" />
      ))}

      {/* Oben eine Überschrift und nur die Ziffern, damit Übersetzungen in die Spalten passen. */}
      <Etikett x={(LINKS + RECHTS) / 2} y={104} anker="middle" farbe={F.leise}>
        Verbrennungsgrad
      </Etikett>
      {(
        [
          [g1, '1', 'gerötet'],
          [g2a, '2a', 'Grund rot'],
          [g2b, '2b', 'Grund blass'],
          [g3, '3', 'lederartig'],
          [g4, '4', 'verkohlt'],
        ] as const
      ).map(([x, grad, merkmal]) => (
        <g key={grad}>
          <text x={x} y={168} textAnchor="middle" fontSize="38" fontWeight="700" fill={F.kupferHell}>
            {grad}
          </text>
          <Klein x={x} y={648}>
            {merkmal}
          </Klein>
        </g>
      ))}
    </Zeichnung>
  );
}

/** Kleine Beschriftung (19 px), mittig: schmale Spalten, auch für längere Übersetzungen. */
function Klein({ x, y, farbe = F.leise, children }: { x: number; y: number; farbe?: string; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="19" fill={farbe}>
      {children}
    </text>
  );
}
