import { Etikett, F, Pfeil, Zeichnung } from './bausteine';
import { Gehstock, Silhouette, type Glied, type Punkt } from './gehhilfen';

/** Knie zwischen Hüfte und Knöchel, nach vorn (rechts) gebeugt; Ober- und Unterschenkel je l lang. */
function knie(h: Punkt, a: Punkt, l = 76): Punkt {
  const dx = a[0] - h[0];
  const dy = a[1] - h[1];
  const d = Math.hypot(dx, dy);
  const q = Math.sqrt(Math.max(l * l - (d / 2) ** 2, 0));
  return [Math.round(h[0] + dx / 2 + (dy / d) * q), Math.round(h[1] + dy / 2 - (dx / d) * q)];
}

/**
 * Kleine Figur von der Seite (Blick nach rechts), Hüfte bei h: krankes Bein in Kupfer, gesundes in
 * Petrol, Stock in der Hand. Angegeben werden nur die Knöchel und die Stockspitze.
 */
function Figur({ h, krank, gesund, krankVorn, spitze }: { h: Punkt; krank: Punkt; gesund: Punkt; krankVorn: boolean; spitze: Punkt }) {
  const [hx, hy] = h;
  const bein = (a: Punkt): Glied => ({ p: [h, knie(h, a), a], b: 22 });
  const fuss = ([ax, ay]: Punkt): Glied => ({ p: [[ax, ay + 3], [ax + 24, ay + 5]], b: 12 });
  const krankesBein = <Silhouette farbe={F.kupfer} glieder={[bein(krank), fuss(krank)]} />;
  return (
    <g>
      {!krankVorn && krankesBein}
      <Silhouette
        glieder={[bein(gesund), fuss(gesund), { p: [[hx, hy - 4], [hx + 6, hy - 86]], b: 36 }]}
        kreise={[{ x: hx + 10, y: hy - 128, r: 21 }]}
      />
      {krankVorn && krankesBein}
      <Gehstock griff={[hx + 32, hy + 8]} spitze={spitze} vor={22} />
      <Silhouette glieder={[{ p: [[hx + 6, hy - 82], [hx + 12, hy - 36], [hx + 32, hy + 4]], b: 15 }]} />
    </g>
  );
}

/** Nummer im Kreis: Reihenfolge der Schritte. */
function Nummer({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <text x={x} y={y + 8} textAnchor="middle" fontSize="22" fontWeight="700" fill={F.linie}>
        {n}
      </text>
    </g>
  );
}

function Treppe({ d, kante }: { d: string; kante: string }) {
  return (
    <g>
      <path d={d} fill={F.petrolDunkel} />
      <path d={kante} fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** Treppauf geht das gesunde Bein zuerst, treppab Stock und krankes Bein. */
export default function GehstockTreppe() {
  return (
    <Zeichnung titel="Gehstock auf der Treppe: Treppauf zuerst das gesunde Bein, dann krankes Bein und Stock. Treppab zuerst Stock und krankes Bein, dann das gesunde. Merksatz: Das Gesunde geht hinauf, das Kranke geht hinab">
      <Etikett x={360} y={56} anker="middle">
        Das Gesunde geht hinauf,
      </Etikett>
      <Etikett x={360} y={90} anker="middle">
        das Kranke geht hinab.
      </Etikett>

      {/* Treppauf: Stufen 36 hoch, 80 tief */}
      <Treppe
        d="M20 620 L110 620 L110 584 L190 584 L190 548 L270 548 L270 512 L340 512 L340 640 L20 640 Z"
        kante="M20 620 L110 620 L110 584 L190 584 L190 548 L270 548 L270 512 L340 512"
      />
      <Figur h={[160, 428]} krank={[154, 573]} gesund={[218, 537]} krankVorn={false} spitze={[186, 584]} />
      <Nummer x={298} y={474} n={1} />
      <Nummer x={78} y={548} n={2} />
      <Etikett x={180} y={684} anker="middle">
        Treppauf
      </Etikett>

      {/* Treppab */}
      <Treppe
        d="M380 640 L380 512 L450 512 L450 548 L530 548 L530 584 L610 584 L610 620 L700 620 L700 640 Z"
        kante="M380 512 L450 512 L450 548 L530 548 L530 584 L610 584 L610 620 L700 620"
      />
      <Figur h={[474, 392]} gesund={[470, 537]} krank={[514, 534]} krankVorn spitze={[574, 584]} />
      <Pfeil d="M528 554 L528 574" farbe={F.kupferHell} breite={4} />
      <Nummer x={652} y={556} n={1} />
      <Nummer x={414} y={474} n={2} />
      <Etikett x={540} y={684} anker="middle">
        Treppab
      </Etikett>
    </Zeichnung>
  );
}
