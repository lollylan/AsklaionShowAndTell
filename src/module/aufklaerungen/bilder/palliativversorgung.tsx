import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

type Punkt = [number, number];

const HAUS: Punkt = [360, 380];
const KNOTEN: Record<'hausarzt' | 'sapv' | 'hospiz' | 'angehoerige', Punkt> = {
  hausarzt: [150, 180],
  sapv: [570, 180],
  hospiz: [150, 560],
  angehoerige: [570, 560],
};

/** Kleines Brustbild, Mitte (x, y) = Kopfmitte. */
function Figur({ x, y, farbe = F.creme }: { x: number; y: number; farbe?: string }) {
  return (
    <g>
      <path d={`M${x - 24} ${y + 44} C${x - 24} ${y + 22} ${x - 14} ${y + 16} ${x} ${y + 16} C${x + 14} ${y + 16} ${x + 24} ${y + 22} ${x + 24} ${y + 44}`} fill={farbe} />
      <circle cx={x} cy={y} r="12" fill={farbe} />
    </g>
  );
}

function Knoten({ mitte, personen }: { mitte: Punkt; personen: number[] }) {
  const [x, y] = mitte;
  return (
    <g>
      <circle cx={x} cy={y} r="56" {...KONTUR} fill={F.petrol} />
      {personen.map((dx) => (
        <Figur key={dx} x={x + dx} y={y - 16} />
      ))}
    </g>
  );
}

/** Versorgungsnetz: Hausarztpraxis, Palliativteam, Hospizdienst und Angehörige rund um den Menschen zu Hause. */
export default function Palliativversorgung() {
  const [hx, hy] = HAUS;
  const ecken = Object.values(KNOTEN);
  return (
    <Zeichnung titel="Ein Haus mit einem Menschen darin, rundherum vier miteinander verbundene Kreise: Hausarztpraxis, Palliativteam, ambulanter Hospizdienst und Angehörige">
      {/* Verbindungen: alle arbeiten miteinander und mit dem Menschen zu Hause */}
      <g stroke={F.leise} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 12">
        <line x1={KNOTEN.hausarzt[0]} y1={KNOTEN.hausarzt[1]} x2={KNOTEN.sapv[0]} y2={KNOTEN.sapv[1]} />
        <line x1={KNOTEN.hospiz[0]} y1={KNOTEN.hospiz[1]} x2={KNOTEN.angehoerige[0]} y2={KNOTEN.angehoerige[1]} />
        <line x1={KNOTEN.hausarzt[0]} y1={KNOTEN.hausarzt[1]} x2={KNOTEN.hospiz[0]} y2={KNOTEN.hospiz[1]} />
        <line x1={KNOTEN.sapv[0]} y1={KNOTEN.sapv[1]} x2={KNOTEN.angehoerige[0]} y2={KNOTEN.angehoerige[1]} />
      </g>
      <g stroke={F.leise} strokeWidth="4" strokeLinecap="round">
        {ecken.map(([x, y]) => (
          <line key={`${x}-${y}`} x1={x} y1={y} x2={hx} y2={hy} />
        ))}
      </g>

      {/* Haus mit dem Menschen in der Mitte */}
      <path
        d={`M${hx - 92} ${hy - 30} L${hx} ${hy - 112} L${hx + 92} ${hy - 30} L${hx + 72} ${hy - 30} L${hx + 72} ${hy + 90} L${hx - 72} ${hy + 90} L${hx - 72} ${hy - 30} Z`}
        {...KONTUR}
        fill={F.petrolDunkel}
      />
      <circle cx={hx} cy={hy - 2} r="20" fill={F.kupferHell} />
      <path
        d={`M${hx - 38} ${hy + 90} L${hx - 38} ${hy + 66} C${hx - 38} ${hy + 40} ${hx - 22} ${hy + 28} ${hx} ${hy + 28} C${hx + 22} ${hy + 28} ${hx + 38} ${hy + 40} ${hx + 38} ${hy + 66} L${hx + 38} ${hy + 90} Z`}
        fill={F.kupferHell}
      />

      <Knoten mitte={KNOTEN.hausarzt} personen={[0]} />
      <Knoten mitte={KNOTEN.sapv} personen={[-22, 22]} />
      <Knoten mitte={KNOTEN.hospiz} personen={[0]} />
      <Knoten mitte={KNOTEN.angehoerige} personen={[-22, 22]} />

      <Etikett x={150} y={72} anker="middle">
        Hausarztpraxis
      </Etikett>
      <Etikett x={570} y={72} anker="middle">
        Palliativteam
      </Etikett>
      <Unterzeile x={570} y={104} anker="middle">
        rund um die Uhr
      </Unterzeile>
      <Etikett x={150} y={656} anker="middle">
        Hospizdienst
      </Etikett>
      <Etikett x={570} y={656} anker="middle">
        Angehörige
      </Etikett>
      <Unterzeile x={360} y={506} anker="middle" farbe={F.linie}>
        Sie zu Hause
      </Unterzeile>
    </Zeichnung>
  );
}
