import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Lage der Beläge auf einer entzündeten Mandel, bezogen auf deren Mitte: [x, y, r]. */
const BELAEGE: [number, number, number][] = [
  [-8, -20, 6],
  [8, -4, 5],
  [-5, 13, 7],
  [7, 27, 4],
];

/** Mandel an der Stelle (x, y); seite = -1 links, 1 rechts. */
function Mandel({ x, y, seite, krank }: { x: number; y: number; seite: number; krank: boolean }) {
  if (!krank) {
    return <ellipse cx={x} cy={y} rx="18" ry="32" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />;
  }
  return (
    <g>
      <ellipse cx={x} cy={y} rx="31" ry="47" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      {BELAEGE.map(([dx, dy, r]) => (
        <circle key={`${dx}-${dy}`} cx={x + seite * dx} cy={y + dy} r={r} fill={F.creme} />
      ))}
    </g>
  );
}

/** Weit geöffneter Mund von vorn, Mittelpunkt (0, 0): Gaumen, Zäpfchen, Mandeln, Zunge. */
function Rachen({ krank }: { krank: boolean }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="135" ry="165" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <ellipse cx="0" cy="0" rx="112" ry="140" fill={F.petrolDunkel} />
      <g clipPath="url(#halsschmerzen-mund)">
        {/* Rachen zwischen den Gaumenbögen */}
        <path
          d="M-62 150 L-62 -10 C-62 -64 62 -64 62 -10 L62 150 Z"
          fill={F.tief}
          stroke={F.linie}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Zäpfchen */}
        <path
          d="M-15 -54 C-16 -10 -12 12 0 16 C12 12 16 -10 15 -54 Z"
          fill={F.petrolHell}
          stroke={F.linie}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <Mandel x={-64} y={40} seite={-1} krank={krank} />
        <Mandel x={64} y={40} seite={1} krank={krank} />
        {/* Zunge */}
        <path
          d="M-130 96 C-80 70 80 70 130 96 L130 170 L-130 170 Z"
          fill={F.petrol}
          stroke={F.linie}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M0 98 L0 132" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      </g>
      <ellipse cx="0" cy="0" rx="112" ry="140" fill="none" stroke={F.linie} strokeWidth="4" />
    </g>
  );
}

/** Blick in den Rachen: links gesund, rechts mit entzündeten, belegten Mandeln. */
export default function Halsschmerzen() {
  return (
    <Zeichnung titel="Blick in den geöffneten Mund: links gesund mit kleinen Gaumenmandeln, rechts bei Mandelentzündung mit geschwollenen, geröteten Mandeln und weißen Belägen">
      <defs>
        <clipPath id="halsschmerzen-mund">
          <ellipse cx="0" cy="0" rx="112" ry="140" />
        </clipPath>
      </defs>

      <g transform="translate(185 340)">
        <Rachen krank={false} />
      </g>
      <g transform="translate(535 340)">
        <Rachen krank />
      </g>

      <Etikett x={185} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={185} y={98} anker="middle">
        Die Mandeln sind klein
      </Unterzeile>
      <Etikett x={535} y={66} anker="middle" farbe={F.kupferHell}>
        Mandelentzündung
      </Etikett>
      <Unterzeile x={535} y={98} anker="middle">
        geschwollen und gerötet
      </Unterzeile>

      <Zeiger von={[150, 582]} nach={[121, 396]} />
      <Etikett x={185} y={612} anker="middle">
        Gaumenmandel
      </Etikett>
      <Zeiger von={[566, 582]} nach={[596, 393]} />
      <Etikett x={535} y={612} anker="middle" farbe={F.kupferHell}>
        weiße Beläge
      </Etikett>

      <Unterzeile x={360} y={672} anker="middle">
        Meist sind Viren die Ursache
      </Unterzeile>
    </Zeichnung>
  );
}
