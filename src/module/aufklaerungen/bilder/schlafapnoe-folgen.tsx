import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const OBEN: [string, string, number][] = [
  ['Übergewicht', 'vor allem am Hals', 130],
  ['Alkohol', 'und Schlafmittel', 360],
  ['Rückenlage', 'im Schlaf', 590],
];
const UNTEN: [string, string, number][] = [
  ['Blutdruck', 'und Herzrhythmus', 130],
  ['Herzinfarkt', 'und Schlaganfall', 360],
  ['Sekundenschlaf', 'Unfallgefahr', 590],
];

/** Atemkurve: ruhige Atemzüge, unterbrochen von flachen Pausen (Aussetzern). */
function atemkurve() {
  const teile: { d: string; pause: boolean }[] = [];
  let x = 80;
  const y = 360;
  for (let runde = 0; runde < 3; runde++) {
    let d = `M${x} ${y}`;
    for (let i = 0; i < 2; i++) {
      d += ` q15 -44 30 0 q15 44 30 0`;
      x += 60;
    }
    teile.push({ d, pause: false });
    if (runde < 2) {
      teile.push({ d: `M${x} ${y} L${x + 100} ${y}`, pause: true });
      x += 100;
    }
  }
  return teile;
}

/** Oben was die Aussetzer verstärkt, in der Mitte die unterbrochene Atmung, unten die Folgen. */
export default function SchlafapnoeFolgen() {
  return (
    <Zeichnung titel="Oben drei Verstärker: Übergewicht, Alkohol und Schlafmittel, Rückenlage. Pfeile zeigen auf eine Atemkurve, die immer wieder flach wird – die Atemaussetzer. Darunter drei Folgen: Bluthochdruck und Herzrhythmusstörungen, Herzinfarkt und Schlaganfall, Sekundenschlaf">
      <Unterzeile x={360} y={60} anker="middle">
        Das macht die Aussetzer häufiger
      </Unterzeile>
      {OBEN.map(([titel, unter, x]) => (
        <g key={titel}>
          <Etikett x={x} y={118} anker="middle">
            {titel}
          </Etikett>
          <Unterzeile x={x} y={148} anker="middle">
            {unter}
          </Unterzeile>
          <Pfeil d={`M${x} 172 L${360 + (x - 360) * 0.5} 262`} farbe={F.leise} breite={4} />
        </g>
      ))}

      {atemkurve().map(({ d, pause }) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={pause ? F.kupfer : F.linie}
          strokeWidth={pause ? 10 : 5}
          strokeLinecap="round"
        />
      ))}
      <Etikett x={360} y={430} anker="middle" farbe={F.kupferHell}>
        Atemaussetzer
      </Etikett>

      {UNTEN.map(([titel, unter, x]) => (
        <g key={titel}>
          <Pfeil d={`M${360 + (x - 360) * 0.5} 452 L${x} 540`} farbe={F.leise} breite={4} />
          <Etikett x={x} y={590} anker="middle">
            {titel}
          </Etikett>
          <Unterzeile x={x} y={620} anker="middle">
            {unter}
          </Unterzeile>
        </g>
      ))}
      <Unterzeile x={360} y={686} anker="middle">
        Unbehandelt steigt das Risiko dafür
      </Unterzeile>
    </Zeichnung>
  );
}
