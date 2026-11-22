import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Virus: Kugel mit Stacheln. */
function Virus({ x, y }: { x: number; y: number }) {
  const stacheln = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2);
  return (
    <g transform={`translate(${x} ${y})`}>
      {stacheln.map((w) => (
        <g key={w}>
          <line x1={Math.cos(w) * 34} y1={Math.sin(w) * 34} x2={Math.cos(w) * 50} y2={Math.sin(w) * 50} stroke={F.linie} strokeWidth="4" />
          <circle cx={Math.cos(w) * 52} cy={Math.sin(w) * 52} r="6" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
        </g>
      ))}
      <circle r="36" {...KONTUR} fill={F.petrolHell} />
    </g>
  );
}

/** Streptokokken: Kette aus kleinen Kugeln. */
function Kette({ x, y }: { x: number; y: number }) {
  const kugeln = [-75, -45, -15, 15, 45, 75];
  return (
    <g transform={`translate(${x} ${y}) rotate(-12)`}>
      {kugeln.map((k, i) => (
        <circle key={k} cx={k} cy={i % 2 ? 6 : -6} r="16" {...KONTUR} fill={F.kupfer} />
      ))}
    </g>
  );
}

const VIREN = ['Husten', 'Schnupfen'];
const BAKTERIEN = ['Fieber', 'Beläge auf den Mandeln', 'dicke Lymphknoten', 'kein Husten'];

/** Zwei Spalten: welche Zeichen eher für Viren, welche eher für Bakterien sprechen. */
export default function HalsschmerzenUrsache() {
  return (
    <Zeichnung titel="Zwei Spalten. Links ein Virus: Husten und Schnupfen sprechen eher für Viren. Rechts eine Kette aus Streptokokken: Fieber, Beläge auf den Mandeln, dicke Halslymphknoten und fehlender Husten sprechen eher für Bakterien">
      <Etikett x={360} y={60} anker="middle">
        Viren oder Bakterien?
      </Etikett>
      <path d="M360 110 L360 560" stroke={F.leise} strokeWidth="2" strokeDasharray="6 10" />

      <Virus x={185} y={190} />
      <Etikett x={185} y={300} anker="middle">
        Eher Viren
      </Etikett>
      {VIREN.map((t, i) => (
        <Unterzeile key={t} x={185} y={346 + i * 36} anker="middle" farbe={F.linie}>
          {t}
        </Unterzeile>
      ))}

      <Kette x={540} y={190} />
      <Etikett x={540} y={300} anker="middle" farbe={F.kupferHell}>
        Eher Bakterien
      </Etikett>
      {BAKTERIEN.map((t, i) => (
        <Unterzeile key={t} x={540} y={346 + i * 36} anker="middle" farbe={F.linie}>
          {t}
        </Unterzeile>
      ))}

      <Etikett x={360} y={630} anker="middle">
        Meist sind es Viren
      </Etikett>
      <Unterzeile x={360} y={664} anker="middle">
        Dann hilft kein Antibiotikum
      </Unterzeile>
    </Zeichnung>
  );
}
