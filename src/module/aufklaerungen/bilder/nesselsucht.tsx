import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Geschlossene, weich gerundete Form um (cx, cy); radius(w) gibt den Abstand je Winkel. */
function form(cx: number, cy: number, radius: (w: number) => number, schritte = 36): string {
  const p = Array.from({ length: schritte }, (_, i) => {
    const w = (i / schritte) * Math.PI * 2;
    const r = radius(w);
    return [cx + Math.cos(w) * r, cy + Math.sin(w) * r];
  });
  const mitte = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mitte(p[schritte - 1], p[0]);
  let d = `M${start[0].toFixed(1)} ${start[1].toFixed(1)}`;
  for (let i = 0; i < schritte; i++) {
    const m = mitte(p[i], p[(i + 1) % schritte]);
    d += ` Q${p[i][0].toFixed(1)} ${p[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

/** Quaddeln auf dem Unterarm: cx, cy, Größe, Phase der unregelmäßigen Form. */
const QUADDELN: [number, number, number, number][] = [
  [130, 218, 24, 0.4],
  [268, 204, 34, 1.7],
  [420, 250, 28, 2.9],
  [556, 206, 22, 0.9],
  [624, 262, 14, 2.2],
  [330, 272, 16, 3.6],
];

/** Hautoberfläche im Schnitt mit der Quaddel als Buckel. */
const OBERFLAECHE = 'M240 480 L350 480 C390 480 400 430 460 430 C520 430 530 480 570 480 L680 480';
const OBERHAUT_UNTEN = 'L680 506 L570 506 C530 506 520 456 460 456 C400 456 390 506 350 506 L240 506 Z';

/** Unterarm mit Quaddeln und darunter ein Schnitt durch eine Quaddel. */
export default function Nesselsucht() {
  return (
    <Zeichnung titel="Oben ein Unterarm mit mehreren unregelmäßig geformten Quaddeln mit hellem Inneren und rotem Hof. Unten ein Schnitt durch eine Quaddel: Eine Mastzelle in der Haut gibt Histamin ab, Gewebewasser sammelt sich und hebt die Haut zu einem Buckel an">
      <defs>
        <clipPath id="nesselsucht-haut">
          <path d={`${OBERFLAECHE} L680 660 L240 660 Z`} />
        </clipPath>
      </defs>

      {/* Unterarm */}
      <Etikett x={30} y={70}>
        Quaddeln
      </Etikett>
      <Unterzeile x={30} y={102}>
        jucken, wandern, nach Stunden wieder weg
      </Unterzeile>
      <path d="M30 150 C220 128 500 128 690 156 L690 300 C500 322 220 322 30 300 Z" fill={F.petrol} />
      {QUADDELN.map(([cx, cy, r, ph]) => (
        <g key={cx}>
          <path d={form(cx, cy, (w) => r + 14 + 3 * Math.sin(3 * w + ph))} fill={F.kupfer} fillOpacity="0.85" />
          <path
            d={form(cx, cy, (w) => r + 0.2 * r * Math.sin(2 * w + ph) + 0.12 * r * Math.cos(3 * w))}
            fill={F.kupferHell}
            stroke={F.creme}
            strokeWidth="2"
          />
        </g>
      ))}
      <path d="M30 150 C220 128 500 128 690 156" {...KONTUR} />
      <path d="M30 300 C220 322 500 322 690 300" {...KONTUR} />

      {/* Schnitt durch eine Quaddel */}
      <Etikett x={30} y={400}>
        Schnitt durch eine Quaddel
      </Etikett>
      <path d={`${OBERFLAECHE} L680 660 L240 660 Z`} fill={F.petrolDunkel} />
      <g clipPath="url(#nesselsucht-haut)">
        <ellipse cx="460" cy="522" rx="108" ry="50" fill={F.kupfer} fillOpacity="0.8" />
      </g>
      <path d={`${OBERFLAECHE} ${OBERHAUT_UNTEN}`} fill={F.petrol} />
      <path d={`${OBERFLAECHE} L680 660 L240 660 Z`} {...KONTUR} />

      {/* Mastzelle mit Histamin-Körnchen, einige schon ausgeschüttet */}
      <circle cx="400" cy="610" r="26" fill={F.creme} stroke={F.linie} strokeWidth="3" />
      <circle cx="396" cy="612" r="9" fill={F.petrolDunkel} />
      <g fill={F.kupfer}>
        <circle cx="412" cy="598" r="4" />
        <circle cx="384" cy="600" r="4" />
        <circle cx="388" cy="626" r="4" />
        <circle cx="412" cy="624" r="4" />
      </g>
      <g fill={F.kupferHell}>
        <circle cx="440" cy="592" r="4" />
        <circle cx="452" cy="572" r="4" />
        <circle cx="432" cy="566" r="4" />
        <circle cx="466" cy="596" r="4" />
        <circle cx="478" cy="560" r="4" />
      </g>

      <Etikett x={30} y={528}>
        Gewebewasser
      </Etikett>
      <Zeiger von={[210, 520]} nach={[404, 522]} />

      <Etikett x={30} y={620}>
        Mastzelle
      </Etikett>
      <Unterzeile x={30} y={652}>
        gibt Histamin ab
      </Unterzeile>
      <Zeiger von={[176, 612]} nach={[372, 610]} />
    </Zeichnung>
  );
}
