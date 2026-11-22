import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Kleiner Tropfen mit Spitze oben, Mitte bei (x, y). */
function Tropfen({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y - 20} C${x + 6} ${y - 10} ${x + 12} ${y - 4} ${x + 12} ${y + 4} C${x + 12} ${y + 11} ${x + 7} ${y + 16} ${x} ${y + 16} C${x - 7} ${y + 16} ${x - 12} ${y + 11} ${x - 12} ${y + 4} C${x - 12} ${y - 4} ${x - 6} ${y - 10} ${x} ${y - 20} Z`}
      fill={F.petrolHell}
      stroke={F.linie}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  );
}

/** Oberhaut als wellige Schicht zwischen x1 und x2. */
function oberhaut(x1: number, x2: number) {
  let d = `M${x1} 420 L${x1} 384`;
  for (let x = x1; x < x2; x += 40) d += ` Q${x + 20} 372 ${x + 40} 384`;
  return `${d} L${x2} 420 Z`;
}

/** Haut im Schnitt: ohne Schutz dringt Nässe ein, mit Zinkpaste bleibt sie draußen. */
export default function AnalekzemBehandlung() {
  return (
    <Zeichnung titel="Haut im Schnitt, links ohne Schutz: Nässe dringt ein, die Haut ist gerötet. Rechts mit einer dünnen Schicht Zinkpaste: die Nässe bleibt außen, die Haut beruhigt sich">
      {/* Lederhaut */}
      <rect x="40" y="420" width="640" height="140" fill={F.petrolDunkel} />
      {/* Oberhaut: links gereizt, rechts ruhig */}
      <path d={oberhaut(40, 360)} fill={F.kupfer} opacity="0.85" />
      <path d={oberhaut(360, 680)} fill={F.petrol} />
      <path d="M40 560 L40 384 M680 384 L680 560" stroke={F.leise} strokeWidth="2" />

      {/* Zinkpaste auf der rechten Seite */}
      <path d="M368 372 Q520 352 672 372 L672 384 Q520 366 368 384 Z" fill={F.creme} />
      <rect x="364" y="354" width="312" height="26" rx="13" fill={F.creme} />

      {/* Nässe links: dringt ein */}
      <Tropfen x={110} y={300} />
      <Tropfen x={190} y={250} />
      <Tropfen x={250} y={330} />
      <Tropfen x={150} y={400} />
      <Tropfen x={300} y={404} />

      {/* Nässe rechts: bleibt auf der Paste */}
      <Tropfen x={430} y={330} />
      <Tropfen x={520} y={260} />
      <Tropfen x={600} y={330} />

      <line x1="360" y1="150" x2="360" y2="600" stroke={F.leise} strokeWidth="2" strokeDasharray="4 8" strokeLinecap="round" />

      <Etikett x={200} y={96} anker="middle" farbe={F.kupferHell}>
        Ohne Schutz
      </Etikett>
      <Unterzeile x={200} y={128} anker="middle">
        Nässe reizt die Haut
      </Unterzeile>
      <Etikett x={520} y={96} anker="middle">
        Mit Zinkpaste
      </Etikett>
      <Unterzeile x={520} y={128} anker="middle">
        schützt und trocknet
      </Unterzeile>

      <Unterzeile x={360} y={640} anker="middle" farbe={F.linie}>
        Dünn auftragen, nur mit Wasser reinigen
      </Unterzeile>
    </Zeichnung>
  );
}
