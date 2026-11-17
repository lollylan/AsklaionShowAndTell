import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const OBEN = 220;
const UNTEN = 560;
const LINKS = 40;
const RECHTS = 680;

/** Mitte der drei Poren: gesund, Mitesser, entzündet. */
const X1 = 140;
const X2 = 360;
const X3 = 580;

/** Haarwurzel als Schlauch von der Hautoberfläche nach unten, oben trichterförmig offen. */
function schlauch(cx: number, w: number, trichter: number): string {
  return `M${cx - trichter} ${OBEN} C${cx - w} ${OBEN + 16} ${cx - w} ${OBEN + 30} ${cx - w} ${OBEN + 60} L${cx - w} 470 Q${cx} 492 ${cx + w} 470 L${cx + w} ${OBEN + 60} C${cx + w} ${OBEN + 30} ${cx + w} ${OBEN + 16} ${cx + trichter} ${OBEN}`;
}

/** Talgdrüsen links und rechts am Schlauch. */
function Druesen({ cx, abstand, rx, ry, cy = 400 }: { cx: number; abstand: number; rx: number; ry: number; cy?: number }) {
  return (
    <g fill={F.petrolHell} stroke={F.linie} strokeWidth="3">
      <ellipse cx={cx - abstand} cy={cy} rx={rx} ry={ry} />
      <ellipse cx={cx + abstand} cy={cy} rx={rx} ry={ry} />
    </g>
  );
}

/** Drei Poren nebeneinander: gesund, verstopft (Mitesser), entzündet (Eiterpickel). */
export default function Akne() {
  return (
    <Zeichnung titel="Schnitt durch die Haut mit drei Poren: links eine gesunde Pore, aus der der Talg der Talgdrüsen frei abfließt. In der Mitte ein Mitesser, die Pore ist mit Talg und Hornzellen verstopft und hat eine dunkle Spitze. Rechts ein entzündeter Pickel: die Pore ist mit Eiter gefüllt, die Haut ringsum gerötet und gewölbt">
      <defs>
        <clipPath id="akne-haut">
          <rect x={LINKS} y={OBEN} width={RECHTS - LINKS} height={UNTEN - OBEN} />
        </clipPath>
      </defs>

      {/* Haut */}
      <rect x={LINKS} y={OBEN} width={RECHTS - LINKS} height={UNTEN - OBEN} fill={F.petrol} />
      <g clipPath="url(#akne-haut)">
        <circle cx={X3} cy={350} r={104} fill={F.kupfer} fillOpacity="0.8" />
      </g>
      {/* Oberfläche mit offenen Poren, dazu Seiten und Boden */}
      <path
        d={`M${LINKS} ${OBEN} L${X1 - 22} ${OBEN} M${X1 + 22} ${OBEN} L${X2 - 28} ${OBEN} M${X2 + 28} ${OBEN} L${X3 - 46} ${OBEN} M${X3 + 46} ${OBEN} L${RECHTS} ${OBEN} L${RECHTS} ${UNTEN} L${LINKS} ${UNTEN} L${LINKS} ${OBEN}`}
        {...KONTUR}
      />

      {/* 1: gesunde Pore, Talg fließt ab */}
      <Druesen cx={X1} abstand={34} rx={24} ry={36} />
      <path d={schlauch(X1, 10, 22)} {...KONTUR} fill={F.petrolDunkel} />
      <g fill={F.creme}>
        <circle cx={X1 - 2} cy={300} r="4" />
        <circle cx={X1 + 3} cy={350} r="4" />
        <circle cx={X1 - 2} cy={404} r="4" />
      </g>
      <path d={`M${X1} 466 L${X1 + 3} ${OBEN} L${X1 + 18} 176`} fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

      {/* 2: Mitesser, Pore verstopft */}
      <Druesen cx={X2} abstand={44} rx={28} ry={42} />
      <path d={schlauch(X2, 18, 28)} {...KONTUR} fill={F.petrolDunkel} />
      <path
        d={`M${X2 - 15} ${OBEN + 4} L${X2 + 15} ${OBEN + 4} L${X2 + 15} 400 Q${X2} 416 ${X2 - 15} 400 Z`}
        fill={F.kupferHell}
      />
      <ellipse cx={X2} cy={OBEN + 2} rx="24" ry="9" fill={F.tief} stroke={F.linie} strokeWidth="2" />
      <path d={`M${X2} 466 L${X2 + 3} ${OBEN + 10}`} fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />

      {/* 3: entzündeter Pickel mit Eiter */}
      <Druesen cx={X3} abstand={70} rx={16} ry={26} cy={430} />
      <path
        d={`M${X3 - 30} ${OBEN} C${X3 - 34} 260 ${X3 - 56} 300 ${X3 - 56} 360 C${X3 - 56} 430 ${X3 - 30} 466 ${X3} 466 C${X3 + 30} 466 ${X3 + 56} 430 ${X3 + 56} 360 C${X3 + 56} 300 ${X3 + 34} 260 ${X3 + 30} ${OBEN}`}
        {...KONTUR}
        fill={F.creme}
      />
      <path
        d={`M${X3 - 46} ${OBEN} Q${X3} 150 ${X3 + 46} ${OBEN} Z`}
        fill={F.creme}
        stroke={F.kupferHell}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <g fill={F.kupfer}>
        {[
          [X3 - 20, 320, 20],
          [X3 + 14, 350, -30],
          [X3 - 8, 392, 60],
          [X3 + 24, 410, 10],
          [X3 - 30, 430, -50],
          [X3 + 4, 290, 80],
        ].map(([x, y, w]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="8" ry="4" transform={`rotate(${w} ${x} ${y})`} />
        ))}
      </g>

      {/* Beschriftung */}
      <Etikett x={X1} y={96} anker="middle">
        gesund
      </Etikett>
      <Unterzeile x={X1} y={128} anker="middle">
        Talg fließt ab
      </Unterzeile>
      <Etikett x={X2} y={96} anker="middle" farbe={F.kupferHell}>
        Mitesser
      </Etikett>
      <Unterzeile x={X2} y={128} anker="middle">
        Pore verstopft
      </Unterzeile>
      <Etikett x={X3} y={96} anker="middle" farbe={F.kupferHell}>
        entzündet
      </Etikett>
      <Unterzeile x={X3} y={128} anker="middle">
        Pickel mit Eiter
      </Unterzeile>

      <Zeiger von={[106, 604]} nach={[106, 432]} />
      <Unterzeile x={LINKS + 20} y={634}>
        Talgdrüse
      </Unterzeile>
    </Zeichnung>
  );
}
