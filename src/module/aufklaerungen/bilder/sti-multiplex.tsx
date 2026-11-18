import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Erreger, nach denen die Multiplex-PCR fast immer sucht; oben der gefundene. */
const ERREGER: { name: string; befund: boolean }[] = [
  { name: 'Chlamydien', befund: true },
  { name: 'Gonokokken', befund: false },
  { name: 'Trichomonaden', befund: false },
  { name: 'Mycoplasma genitalium', befund: false },
];

const ZEILE = (i: number) => 196 + i * 112;

/** Röhrchen mit Abstrichtupfer, stehend; (x, y) ist die Mitte des Deckels. */
function Roehrchen({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {/* Stiel und Tupfer im Röhrchen */}
      <line x1={x} y1={y - 70} x2={x} y2={y + 230} stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
      <rect x={x - 46} y={y} width="92" height="34" rx="8" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <path
        d={`M${x - 38} ${y + 34} L${x - 38} ${y + 270} Q${x} ${y + 318} ${x + 38} ${y + 270} L${x + 38} ${y + 34}`}
        fill={F.petrolDunkel}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d={`M${x - 38} ${y + 210} L${x - 38} ${y + 270} Q${x} ${y + 318} ${x + 38} ${y + 270} L${x + 38} ${y + 210} Z`}
        fill={F.petrolHell}
      />
      <ellipse cx={x} cy={y + 248} rx="13" ry="26" fill={F.creme} stroke={F.linie} strokeWidth="3" />
    </g>
  );
}

/** Ein Röhrchen, das Labor prüft gleichzeitig auf mehrere Erreger; einer ist gefunden. */
export default function StiMultiplex() {
  return (
    <Zeichnung titel="Ein Abstrichröhrchen, von dem vier Pfeile zu vier Erregern gehen: Chlamydien, Gonokokken, Trichomonaden und Mycoplasma genitalium. Bei den Chlamydien steht ein Befund, bei den anderen nicht">
      <Etikett x={360} y={70} anker="middle">
        Eine Probe – mehrere Erreger
      </Etikett>

      <Roehrchen x={110} y={240} />
      <Unterzeile x={110} y={620} anker="middle">
        Abstrich
      </Unterzeile>
      <Unterzeile x={110} y={648} anker="middle">
        oder Urin
      </Unterzeile>

      {ERREGER.map((e, i) => {
        const y = ZEILE(i);
        return (
          <g key={e.name}>
            <Pfeil d={`M168 ${(380 + y) / 2 + 40} Q220 ${y} 268 ${y}`} farbe={F.leise} breite={4} />
            <rect
              x={286}
              y={y - 40}
              width={404}
              height={80}
              rx="14"
              fill={e.befund ? F.kupfer : F.petrolDunkel}
              stroke={F.linie}
              strokeWidth={e.befund ? 5 : 3}
            />
            <Etikett x={310} y={y + 9} farbe={e.befund ? F.creme : F.linie}>
              {e.name}
            </Etikett>
            {e.befund ? (
              <g>
                <circle cx={652} cy={y} r="20" fill={F.creme} />
                <path d={`M641 ${y} h22 M652 ${y - 11} v22`} stroke={F.kupfer} strokeWidth="6" strokeLinecap="round" />
              </g>
            ) : (
              <path d={`M640 ${y} h24`} stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
            )}
          </g>
        );
      })}

      <Unterzeile x={488} y={660} anker="middle">
        Ergebnis nach zwei bis fünf Tagen
      </Unterzeile>
    </Zeichnung>
  );
}
