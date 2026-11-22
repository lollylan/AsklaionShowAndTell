import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Nervenzelle: Zellkörper mit Ausläufern, Mitte (x, y). */
function Nervenzelle({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M-30 -10 L-90 -60 M-90 -60 L-110 -100 M-90 -60 L-130 -50 M-20 -30 L-30 -110 M-30 -110 L-60 -140 M-30 -110 L0 -150 M25 -20 L80 -90 M80 -90 L120 -100 M80 -90 L80 -140 M-30 20 L-100 50 M-100 50 L-130 30 M10 30 L20 220"
        {...KONTUR}
        strokeWidth="5"
      />
      <circle cx="0" cy="0" r="40" {...KONTUR} fill={F.petrolHell} />
      <circle cx="0" cy="0" r="12" fill={F.petrolDunkel} />
    </g>
  );
}

const KLUMPEN: [number, number, number][] = [
  [100, 260, 18],
  [270, 230, 22],
  [96, 410, 20],
  [262, 390, 16],
  [140, 470, 14],
];

/** Die zwei häufigsten Ursachen: Eiweiß-Ablagerungen (Alzheimer) und Durchblutungsstörungen. */
export default function DemenzUrsachen() {
  return (
    <Zeichnung titel="Links eine Nervenzelle, um die sich Eiweiß-Klumpen ablagern, wie bei Alzheimer; rechts ein verzweigtes Blutgefäß im Gehirn, das an einer Stelle verstopft ist, dahinter wird das Gewebe nicht mehr versorgt">
      <Etikett x={190} y={74} anker="middle">
        Alzheimer
      </Etikett>
      <Unterzeile x={190} y={108} anker="middle">
        Eiweiß lagert sich ab
      </Unterzeile>
      <Etikett x={530} y={74} anker="middle">
        Durchblutung
      </Etikett>
      <Unterzeile x={530} y={108} anker="middle">
        kleine Schlaganfälle
      </Unterzeile>
      <line x1="360" y1="150" x2="360" y2="560" stroke={F.leise} strokeWidth="2" strokeOpacity="0.5" />

      {/* links: Nervenzelle mit Ablagerungen */}
      <Nervenzelle x={180} y={330} />
      {KLUMPEN.map(([x, y, r]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x - r} ${y} C${x - r} ${y - r * 1.2} ${x + r * 0.6} ${y - r * 1.1} ${x + r} ${y - r * 0.2} C${x + r * 1.2} ${y + r * 0.8} ${x - r * 0.2} ${y + r * 1.3} ${x - r} ${y} Z`}
          fill={F.kupfer}
          stroke={F.kupferHell}
          strokeWidth="2"
        />
      ))}

      {/* rechts: Gefäßbaum, ein Ast verstopft */}
      <ellipse cx="610" cy="430" rx="70" ry="60" fill={F.kupfer} fillOpacity="0.22" />
      <path d="M440 200 C470 260 500 300 520 340 M520 340 C560 360 590 400 610 430 M520 340 C520 400 500 450 470 500 M470 200 C480 240 500 280 520 340 M560 360 C590 330 620 300 650 290" fill="none" stroke={F.petrolHell} strokeWidth="10" strokeLinecap="round" />
      <path d="M610 430 C620 460 640 480 660 490 M610 430 C590 460 580 490 580 520" fill="none" stroke={F.leise} strokeWidth="6" strokeLinecap="round" strokeDasharray="6 8" />
      <circle cx="572" cy="382" r="13" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />

      <Zeiger von={[120, 600]} nach={[102, 420]} />
      <Etikett x={40} y={632} farbe={F.kupferHell}>
        Ablagerungen
      </Etikett>

      <Zeiger von={[600, 600]} nach={[574, 394]} />
      <Etikett x={690} y={632} anker="end" farbe={F.kupferHell}>
        verstopftes Gefäß
      </Etikett>
    </Zeichnung>
  );
}
