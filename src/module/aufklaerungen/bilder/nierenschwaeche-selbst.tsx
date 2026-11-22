import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Ein Trinkglas mit Wasser, Mitte x, Oberkante bei y. */
function Glas({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 20.5} ${y + 30} L${x - 17} ${y + 90} L${x + 17} ${y + 90} L${x + 20.5} ${y + 30} Z`} fill={F.petrolHell} />
      <path d={`M${x - 24} ${y} L${x - 18} ${y + 92} L${x + 18} ${y + 92} L${x + 24} ${y}`} {...KONTUR} strokeWidth={3} />
    </g>
  );
}

/** Schmerzmittel mit Vorsicht, Trinken nach Durst. */
export default function NierenschwaecheSelbst() {
  return (
    <Zeichnung titel="Oben eine Tablettenpackung mit Warnzeichen: Ibuprofen, Diclofenac und Naproxen können den Nieren schaden, vorher fragen. Unten sechs Gläser: nach Durst trinken, etwa anderthalb Liter">
      {/* Warnzeichen */}
      <path d="M150 96 L214 206 L86 206 Z" fill="none" stroke={F.kupferHell} strokeWidth="6" strokeLinejoin="round" />
      <path d="M150 134 L150 170" stroke={F.kupferHell} strokeWidth="7" strokeLinecap="round" />
      <circle cx="150" cy="188" r="4.5" fill={F.kupferHell} />

      {/* Blisterpackung */}
      <rect x="268" y="92" width="380" height="124" rx="14" {...KONTUR} fill={F.petrolDunkel} />
      {[330, 412, 494, 576].map((x) => (
        <g key={x}>
          <circle cx={x} cy="154" r="32" fill="none" stroke={F.leise} strokeWidth="3" />
          <circle cx={x} cy="154" r="22" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
        </g>
      ))}

      <Etikett x={360} y={290} anker="middle" farbe={F.kupferHell}>
        Ibuprofen, Diclofenac, Naproxen
      </Etikett>
      <Unterzeile x={360} y={324} anker="middle">
        können den Nieren schaden – fragen Sie vorher
      </Unterzeile>

      <line
        x1="40"
        y1="380"
        x2="680"
        y2="380"
        stroke={F.leise}
        strokeWidth="2"
        strokeDasharray="4 8"
        strokeLinecap="round"
      />

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Glas key={i} x={160 + i * 80} y={430} />
      ))}
      <Etikett x={360} y={606} anker="middle">
        Nach Durst trinken, etwa 1,5 Liter
      </Etikett>
      <Unterzeile x={360} y={640} anker="middle">
        Viel hilft hier nicht viel
      </Unterzeile>
    </Zeichnung>
  );
}
