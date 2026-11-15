import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Kräftige rote Blutkörperchen im linken Feld (Mittelpunkt 188 / 330). */
const KRAEFTIG: [number, number][] = [
  [188, 330],
  [254, 332],
  [221, 387],
  [155, 389],
  [122, 328],
  [155, 273],
  [221, 271],
  [188, 216],
  [190, 444],
  [287, 387],
  [287, 273],
  [89, 387],
  [89, 273],
];

/** Wenige, kleine, blasse Blutkörperchen im rechten Feld (Mittelpunkt 532 / 330). */
const BLASS: [number, number][] = [
  [478, 272],
  [590, 262],
  [536, 338],
  [466, 392],
  [600, 400],
];

/** Blick ins Blut: links genug Eisen, rechts Eisenmangel. */
export default function Eisenmangel() {
  return (
    <Zeichnung titel="Zwei Blickfelder ins Blut: bei genug Eisen viele kräftig rote Blutkörperchen, bei Eisenmangel nur wenige, kleine und blasse">
      {/* Genug Eisen */}
      <circle cx="188" cy="330" r="160" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      {KRAEFTIG.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="29" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
          <circle cx={x} cy={y} r="12" fill={F.kupferHell} fillOpacity="0.45" />
        </g>
      ))}

      {/* Eisenmangel */}
      <circle cx="532" cy="330" r="160" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      {BLASS.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle
            cx={x}
            cy={y}
            r="20"
            fill={F.kupferHell}
            fillOpacity="0.35"
            stroke={F.kupferHell}
            strokeOpacity="0.7"
            strokeWidth="3"
          />
          <circle cx={x} cy={y} r="10" fill={F.tief} fillOpacity="0.6" />
        </g>
      ))}

      <Etikett x={188} y={90} anker="middle">
        Genug Eisen
      </Etikett>
      <Unterzeile x={188} y={122} anker="middle">
        viele rote Blutkörperchen
      </Unterzeile>
      <Etikett x={532} y={90} anker="middle" farbe={F.kupferHell}>
        Eisenmangel
      </Etikett>
      <Unterzeile x={532} y={122} anker="middle">
        wenige, kleine, blasse
      </Unterzeile>

      <Etikett x={360} y={582} anker="middle">
        Weniger Sauerstoff kommt im Körper an
      </Etikett>
      <Unterzeile x={360} y={618} anker="middle">
        müde, blass, schnell außer Atem
      </Unterzeile>
    </Zeichnung>
  );
}
