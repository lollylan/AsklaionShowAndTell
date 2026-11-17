import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

// Gemeinsame Teile für die Gehhilfen-Zeichnungen (gehhilfen, gehstock-*, rollator):
// Silhouette für Figuren aus dicken Strichen, Gehstock und Rohre. Nur benannte Exporte,
// der default-Export ist die Zeichnung „gehhilfen“.

export type Punkt = [number, number];

/** Ein Körperteil als dicker Strich durch die Punkte (Gelenke), b = Breite. */
export interface Glied {
  p: Punkt[];
  b: number;
  farbe?: string;
}

export const linienPfad = (p: Punkt[]) => 'M' + p.map(([x, y]) => `${x} ${y}`).join(' L');

const RUND = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

/**
 * Glieder, Flächen und Kreise einer Figur: erst alle weißen Konturen, dann alle Füllungen –
 * so verschmelzen die Teile zu einer Silhouette. Füllreihenfolge: Glieder, Flächen, Kreise.
 */
export function Silhouette({
  glieder = [],
  flaechen = [],
  kreise = [],
  farbe = F.petrol,
}: {
  glieder?: Glied[];
  flaechen?: { d: string; farbe?: string }[];
  kreise?: { x: number; y: number; r: number; farbe?: string }[];
  farbe?: string;
}) {
  return (
    <g>
      {flaechen.map((f) => (
        <path key={`k${f.d}`} d={f.d} fill={F.linie} stroke={F.linie} strokeWidth="8" strokeLinejoin="round" />
      ))}
      {glieder.map((g, i) => (
        <path key={`k${i}`} d={linienPfad(g.p)} {...RUND} stroke={F.linie} strokeWidth={g.b + 8} />
      ))}
      {kreise.map((k) => (
        <circle key={`k${k.x}-${k.y}`} cx={k.x} cy={k.y} r={k.r + 4} fill={F.linie} />
      ))}
      {glieder.map((g, i) => (
        <path key={`f${i}`} d={linienPfad(g.p)} {...RUND} stroke={g.farbe ?? farbe} strokeWidth={g.b} />
      ))}
      {flaechen.map((f) => (
        <path key={`f${f.d}`} d={f.d} fill={f.farbe ?? farbe} />
      ))}
      {kreise.map((k) => (
        <circle key={`f${k.x}-${k.y}`} cx={k.x} cy={k.y} r={k.r} fill={k.farbe ?? farbe} />
      ))}
    </g>
  );
}

/** Rohre (Pfade) mit weißer Kontur, z. B. für Rollator und Stützen. */
export function Rohre({ pfade, b = 10, farbe = F.petrolHell }: { pfade: string[]; b?: number; farbe?: string }) {
  return (
    <g>
      {pfade.map((d) => (
        <path key={`k${d}`} d={d} {...RUND} stroke={F.linie} strokeWidth={b + 8} />
      ))}
      {pfade.map((d) => (
        <path key={`f${d}`} d={d} {...RUND} stroke={farbe} strokeWidth={b} />
      ))}
    </g>
  );
}

/**
 * Gehstock mit T-Griff. griff = Stelle, an der der Schaft in den Griff geht, spitze = Gummikappe
 * am Boden. Der Griff zeigt um `vor` nach vorn (negativ = nach links) und 12 px nach hinten.
 */
export function Gehstock({
  griff,
  spitze,
  vor = 34,
  farbe = F.kupfer,
  griffFarbe = F.kupfer,
}: {
  griff: Punkt;
  spitze: Punkt;
  vor?: number;
  farbe?: string;
  griffFarbe?: string;
}) {
  const [gx, gy] = griff;
  const [sx, sy] = spitze;
  const zurueck = vor >= 0 ? -12 : 12;
  const g = `M${gx + zurueck} ${gy} L${gx + vor} ${gy}`;
  const schaft = `M${gx} ${gy} L${sx} ${sy - 4}`;
  // Gummikappe: letztes Stück des Schafts
  const l = Math.hypot(sx - gx, sy - gy);
  const kx = sx - ((sx - gx) / l) * 16;
  const ky = sy - ((sy - gy) / l) * 16;
  return (
    <g>
      <path d={schaft} {...RUND} stroke={F.linie} strokeWidth="18" />
      <path d={g} {...RUND} stroke={F.linie} strokeWidth="22" />
      <path d={schaft} {...RUND} stroke={farbe} strokeWidth="10" />
      <path d={`M${kx} ${ky} L${sx} ${sy - 4}`} {...RUND} stroke={F.tief} strokeWidth="12" />
      <path d={g} {...RUND} stroke={griffFarbe} strokeWidth="14" />
    </g>
  );
}

/** Rad von der Seite. */
export function Rad({ x, y, r, hinten = false }: { x: number; y: number; r: number; hinten?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={hinten ? F.petrolDunkel : F.tief} stroke={hinten ? F.leise : F.linie} strokeWidth="4" />
      <circle cx={x} cy={y} r={r * 0.3} fill={hinten ? F.petrolDunkel : F.petrolHell} stroke={hinten ? F.leise : F.linie} strokeWidth="3" />
    </g>
  );
}

const BODEN = 560;

/** Drei Gehhilfen nebeneinander: Gehstock, Unterarmgehstütze und Rollator. */
export default function Gehhilfen() {
  return (
    <Zeichnung titel="Drei Gehhilfen nebeneinander: Gehstock für etwas Halt, Unterarmgehstütze für mehr Entlastung, Rollator mit Bremsen und Sitz für Halt und Pause">
      {/* Boden */}
      <g stroke={F.leise} strokeWidth="3" strokeLinecap="round">
        <line x1="50" y1={BODEN + 8} x2="190" y2={BODEN + 8} />
        <line x1="290" y1={BODEN + 8} x2="430" y2={BODEN + 8} />
        <line x1="480" y1={BODEN + 8} x2="700" y2={BODEN + 8} />
      </g>

      {/* Gehstock */}
      <Gehstock griff={[120, 252]} spitze={[120, BODEN]} vor={40} farbe={F.petrolHell} />

      {/* Unterarmgehstütze: Rohr, Griff nach vorn, Manschette oben */}
      <Rohre pfade={['M360 252 L360 556', 'M360 252 L342 150']} />
      <path d={`M360 ${BODEN - 18} L360 ${BODEN - 4}`} {...RUND} stroke={F.tief} strokeWidth="12" />
      <Rohre pfade={['M360 252 L412 252']} b={16} farbe={F.kupfer} />
      <Rohre pfade={['M322 128 Q322 166 362 160']} b={14} farbe={F.kupfer} />

      {/* Rollator: hintere Räder etwas versetzt, dann vordere Seite */}
      <Rad x={548} y={526} r={24} hinten />
      <Rad x={680} y={528} r={20} hinten />
      <Rohre pfade={['M548 526 L548 262', 'M676 512 L554 286']} farbe={F.petrolDunkel} />
      <Rohre pfade={['M530 536 L530 264 Q530 248 512 248 L486 248', 'M662 520 L536 290']} />
      <Rohre pfade={['M532 396 L604 396']} b={16} />
      {/* Bremshebel unter dem Griff */}
      <path d="M526 264 Q510 272 490 268" {...RUND} stroke={F.linie} strokeWidth="14" />
      <path d="M526 264 Q510 272 490 268" {...RUND} stroke={F.kupfer} strokeWidth="6" />
      <rect x="521" y="246" width="18" height="22" rx="5" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <path d="M662 520 L666 534" {...RUND} stroke={F.linie} strokeWidth="14" />
      <Rad x={530} y={536} r={24} />
      <Rad x={666} y={538} r={20} />

      <Etikett x={120} y={646} anker="middle">
        Gehstock
      </Etikett>
      <Unterzeile x={120} y={680} anker="middle">
        etwas Halt
      </Unterzeile>

      <Etikett x={360} y={616} anker="middle">
        Unterarm-
      </Etikett>
      <Etikett x={360} y={646} anker="middle">
        gehstütze
      </Etikett>
      <Unterzeile x={360} y={680} anker="middle">
        mehr Entlastung
      </Unterzeile>

      <Etikett x={596} y={646} anker="middle">
        Rollator
      </Etikett>
      <Unterzeile x={596} y={680} anker="middle">
        Halt und Pause
      </Unterzeile>
    </Zeichnung>
  );
}
