import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

function Hut({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 30} rx="112" ry="24" {...KONTUR} fill={F.petrolHell} />
      <path d={`M${x - 56} ${y + 30} C${x - 56} ${y - 40} ${x - 40} ${y - 60} ${x} ${y - 60} C${x + 40} ${y - 60} ${x + 56} ${y - 40} ${x + 56} ${y + 30} Z`} {...KONTUR} fill={F.petrol} />
      <path d={`M${x - 56} ${y + 8} Q${x} ${y + 22} ${x + 56} ${y + 8}`} fill="none" stroke={F.kupferHell} strokeWidth="8" />
    </g>
  );
}

function Hemd({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 26} ${y - 66} Q${x} ${y - 50} ${x + 26} ${y - 66} L${x + 60} ${y - 54} L${x + 96} ${y + 56} L${x + 70} ${y + 64} L${x + 46} ${y - 4} L${x + 46} ${y + 70} L${x - 46} ${y + 70} L${x - 46} ${y - 4} L${x - 70} ${y + 64} L${x - 96} ${y + 56} L${x - 60} ${y - 54} Z`}
      {...KONTUR}
      fill={F.petrolHell}
    />
  );
}

function Tube({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`rotate(-20 ${x} ${y})`}>
      <path d={`M${x - 40} ${y - 70} L${x + 40} ${y - 70} L${x + 30} ${y + 46} L${x - 30} ${y + 46} Z`} {...KONTUR} fill={F.creme} />
      <rect x={x - 20} y={y + 46} width="40" height="26" rx="4" {...KONTUR} fill={F.petrolHell} />
      <circle cx={x} cy={y - 16} r="18" fill={F.kupfer} />
      <path d={`M${x - 44} ${y - 70} L${x + 44} ${y - 70}`} stroke={F.linie} strokeWidth="8" strokeLinecap="round" />
    </g>
  );
}

/** Sonne als Zifferblatt: Mittagssonne meiden. */
function Mittagssonne({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((g) => {
        const w = (g * Math.PI) / 180;
        return (
          <line key={g} x1={x + Math.cos(w) * 62} y1={y + Math.sin(w) * 62} x2={x + Math.cos(w) * 80} y2={y + Math.sin(w) * 80} stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
        );
      })}
      <circle cx={x} cy={y} r="50" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <path d={`M${x} ${y + 4} L${x} ${y - 34} M${x} ${y + 4} L${x + 4} ${y - 26}`} stroke={F.creme} strokeWidth="6" strokeLinecap="round" />
      <circle cx={x} cy={y + 4} r="6" fill={F.creme} />
    </g>
  );
}

/** Vier Wege, neue Altersflecken zu verhindern. */
export default function AltersfleckenSonnenschutz() {
  return (
    <Zeichnung titel="Vier Arten von Sonnenschutz: Hut mit Krempe, lange Kleidung, Sonnencreme mit hohem Lichtschutz und mittags in den Schatten">
      <Etikett x={360} y={60} anker="middle">
        Neue Flecken verhindern
      </Etikett>
      <Unterzeile x={360} y={92} anker="middle">
        jeden Tag, nicht nur im Urlaub
      </Unterzeile>

      <Hut x={190} y={220} />
      <Hemd x={530} y={220} />
      <Tube x={190} y={470} />
      <Mittagssonne x={530} y={470} />

      <Etikett x={190} y={340} anker="middle">
        Hut mit Krempe
      </Etikett>
      <Etikett x={530} y={340} anker="middle">
        Lange Kleidung
      </Etikett>
      <Etikett x={190} y={610} anker="middle">
        Hoher Lichtschutz
      </Etikett>
      <Etikett x={530} y={610} anker="middle">
        Mittags in den Schatten
      </Etikett>
      <Unterzeile x={360} y={670} anker="middle" farbe={F.kupferHell}>
        Kein Solarium
      </Unterzeile>
    </Zeichnung>
  );
}
