import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';
import { Vorlage } from './inkontinenz-hilfen';

/** Tropfen mit Spitze nach oben; (x, y) = Mitte des runden Teils, r = Radius. Auch für andere Zeichnungen. */
export function Tropfen({ x, y, r, farbe = F.kupfer }: { x: number; y: number; r: number; farbe?: string }) {
  return (
    <path
      d={`M${x} ${y - 2.2 * r} C${x + 0.5 * r} ${y - 1.3 * r} ${x + r} ${y - 0.7 * r} ${x + r} ${y} A${r} ${r} 0 0 1 ${x - r} ${y} C${x - r} ${y - 0.7 * r} ${x - 0.5 * r} ${y - 1.3 * r} ${x} ${y - 2.2 * r} Z`}
      fill={farbe}
    />
  );
}

/** Sonne als kleines Zeichen. */
function Sonne({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={F.leise} strokeWidth="3" strokeLinecap="round">
      <circle cx={x} cy={y} r="8" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((w) => {
        const b = (w * Math.PI) / 180;
        return <line key={w} x1={x + 12 * Math.cos(b)} y1={y + 12 * Math.sin(b)} x2={x + 17 * Math.cos(b)} y2={y + 17 * Math.sin(b)} />;
      })}
    </g>
  );
}

/** Mondsichel als kleines Zeichen. */
function Mond({ x, y }: { x: number; y: number }) {
  return <path d={`M${x + 4} ${y - 15} A15 15 0 1 0 ${x + 12} ${y + 9} A12 12 0 0 1 ${x + 4} ${y - 15} Z`} fill={F.leise} />;
}

/** Sechs Saugstärken, von dünn bis dick. */
const STUFEN = [1, 2, 3, 4, 5, 6].map((n, i) => ({
  n,
  x: 70 + i * 116,
  laenge: 130 + i * 30,
  breite: 46 + i * 10,
}));

const UNTEN = 440;

export default function InkontinenzTropfen() {
  return (
    <Zeichnung titel="Sechs Einlagen nebeneinander, von dünn mit einem Tropfen bis dick mit sechs Tropfen: so viel Saugstärke wie nötig, tagsüber oft dünner, nachts stärker">
      <Etikett x={360} y={80} anker="middle">
        Saugstärke: so viel wie nötig
      </Etikett>

      {STUFEN.map((s) => (
        <g key={s.n}>
          <Vorlage cx={s.x} oben={UNTEN - s.laenge} laenge={s.laenge} breite={s.breite} />
          {Array.from({ length: s.n }, (_, k) => {
            const reihe = Math.floor(k / 3);
            const inReihe = Math.min(3, s.n - reihe * 3);
            const spalte = k % 3;
            return <Tropfen key={k} x={s.x + (spalte - (inReihe - 1) / 2) * 30} y={UNTEN + 54 + reihe * 40} r={10} />;
          })}
        </g>
      ))}

      <Sonne x={46} y={612} />
      <Unterzeile x={74} y={620} farbe={F.linie}>
        tagsüber oft dünner
      </Unterzeile>
      <Mond x={508} y={612} />
      <Unterzeile x={690} y={620} anker="end" farbe={F.linie}>
        nachts stärker
      </Unterzeile>
    </Zeichnung>
  );
}
