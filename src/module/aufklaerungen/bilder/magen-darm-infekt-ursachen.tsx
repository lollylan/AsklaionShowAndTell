import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Virus als kleiner Kreis mit Noppen. */
function Virus({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  const noppen = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <g>
      {noppen.map((w) => {
        const b = (w * Math.PI) / 180;
        return <circle key={w} cx={x + Math.cos(b) * (r + 4)} cy={y + Math.sin(b) * (r + 4)} r="3" fill={F.kupferHell} />;
      })}
      <circle cx={x} cy={y} r={r} fill={F.kupfer} stroke={F.kupferHell} strokeWidth="2" />
    </g>
  );
}

/** Offene Hand von vorn, Mittelpunkt der Handfläche bei (x, y). */
function Hand({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M-48 -10 L-48 -78 C-48 -92 -28 -92 -28 -78 L-28 -30 L-24 -30 L-24 -100 C-24 -114 -4 -114 -4 -100 L-4 -32 L0 -32 L0 -104 C0 -118 20 -118 20 -104 L20 -32 L24 -32 L24 -88 C24 -102 44 -102 44 -88 L44 6 L62 -22 C70 -36 90 -28 84 -12 L56 52 C46 74 30 84 4 84 C-30 84 -48 64 -48 30 Z"
        {...KONTUR}
        fill={F.creme}
      />
    </g>
  );
}

/** Wie Noroviren weitergegeben werden: Hand, Türklinke, Hand, Mund. */
export default function MagenDarmInfektUrsachen() {
  return (
    <Zeichnung titel="Kreislauf der Ansteckung: Viren gelangen von der Hand eines Kranken an eine Türklinke, von dort an die Hand des Nächsten und über den Mund in den Körper. Schon wenige Viren genügen">
      {/* Türklinke oben */}
      <rect x="318" y="70" width="44" height="150" rx="14" {...KONTUR} fill={F.petrolDunkel} />
      <path d="M340 120 L430 120" stroke={F.linie} strokeWidth="26" strokeLinecap="round" />
      <path d="M340 120 L430 120" stroke={F.leise} strokeWidth="18" strokeLinecap="round" />
      <Virus x={400} y={98} r={9} />
      <Virus x={430} y={146} r={8} />

      {/* Hand rechts unten */}
      <Hand x={560} y={430} />
      <Virus x={556} y={402} />
      <Virus x={590} y={440} r={9} />

      {/* Kopf mit Mund links unten */}
      <circle cx="160" cy="430" r="86" {...KONTUR} fill={F.creme} />
      <circle cx="130" cy="404" r="8" fill={F.tief} />
      <circle cx="190" cy="404" r="8" fill={F.tief} />
      <ellipse cx="160" cy="462" rx="24" ry="14" fill={F.tief} />

      {/* Weg der Viren */}
      <Pfeil d="M210 300 C230 220 270 170 300 150" farbe={F.kupferHell} breite={6} />
      <Pfeil d="M460 156 C520 200 560 250 566 300" farbe={F.kupferHell} breite={6} />
      <Pfeil d="M470 470 C400 500 330 500 262 470" farbe={F.kupferHell} breite={6} />

      <Etikett x={690} y={62} anker="end">
        Türklinke, Toilette
      </Etikett>
      <Etikett x={560} y={560} anker="middle">
        Hand
      </Etikett>
      <Etikett x={160} y={560} anker="middle">
        Mund
      </Etikett>
      <Unterzeile x={40} y={196}>
        vom Kranken
      </Unterzeile>

      <Etikett x={360} y={636} anker="middle" farbe={F.kupferHell}>
        Schon wenige Viren genügen
      </Etikett>
    </Zeichnung>
  );
}
