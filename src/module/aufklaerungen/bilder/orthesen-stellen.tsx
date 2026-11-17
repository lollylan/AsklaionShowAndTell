import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Silhouette } from './gehhilfen';

/** Hilfsmittel als Kupferband um ein Glied, Mittelpunkt (x, y), gedreht um winkel Grad. */
function Stuetze({ x, y, b, h, winkel = 0 }: { x: number; y: number; b: number; h: number; winkel?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${winkel})`}>
      <rect x={-b / 2} y={-h / 2} width={b} height={h} rx="9" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <path d={`M${-b / 2 + 8} ${-h / 2 + 12} L${b / 2 - 8} ${-h / 2 + 12} M${-b / 2 + 8} ${h / 2 - 12} L${b / 2 - 8} ${h / 2 - 12}`} stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

export default function OrthesenStellen() {
  return (
    <Zeichnung titel="Figur von vorn mit vier Stellen, an denen Stützen helfen: Schiene am Sprunggelenk, Orthese am Knie, Schiene am Handgelenk und selten ein Gurt am unteren Rücken">
      <Silhouette
        glieder={[
          // Beine
          { p: [[340, 404], [330, 526], [328, 636]], b: 42 },
          { p: [[380, 404], [390, 526], [392, 636]], b: 42 },
          // Rumpf
          { p: [[360, 206], [360, 392]], b: 112 },
          // Arme
          { p: [[302, 204], [276, 306], [268, 404]], b: 28 },
          { p: [[418, 204], [444, 306], [452, 404]], b: 28 },
          // Füße
          { p: [[326, 654], [310, 660]], b: 24 },
          { p: [[394, 654], [410, 660]], b: 24 },
        ]}
        kreise={[
          { x: 360, y: 112, r: 44 },
          { x: 266, y: 424, r: 18 },
          { x: 454, y: 424, r: 18 },
        ]}
      />

      {/* Rückengurt: leicht und gestrichelt, weil nur selten nötig */}
      <rect x="302" y="334" width="116" height="44" rx="10" fill={F.kupferHell} fillOpacity="0.3" stroke={F.kupferHell} strokeWidth="3" strokeDasharray="8 7" />

      {/* Knie, Handgelenk, Sprunggelenk */}
      <Stuetze x={331} y={528} b={60} h={84} winkel={4.7} />
      <Stuetze x={450} y={390} b={40} h={78} winkel={-4.7} />
      <Stuetze x={392} y={612} b={56} h={52} />

      <Zeiger von={[180, 346]} nach={[316, 356]} />
      <Etikett x={60} y={354}>
        Rücken
      </Etikett>
      <Unterzeile x={60} y={386}>
        selten
      </Unterzeile>

      <Zeiger von={[140, 528]} nach={[312, 528]} />
      <Etikett x={60} y={536}>
        Knie
      </Etikett>

      <Zeiger von={[514, 394]} nach={[466, 394]} />
      <Etikett x={690} y={402} anker="end">
        Handgelenk
      </Etikett>

      <Zeiger von={[488, 612]} nach={[416, 612]} />
      <Etikett x={690} y={620} anker="end">
        Sprunggelenk
      </Etikett>
    </Zeichnung>
  );
}
