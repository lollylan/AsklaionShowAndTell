import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Höhe, an der jede Rippe am Brustbein ansetzt. */
const RIPPEN = [190, 228, 266, 304, 342, 380, 418];

/** Brustkorb von vorn: Ein Finger drückt auf einen gereizten Rippenansatz am Brustbein. */
export default function Brustwand() {
  return (
    <Zeichnung titel="Brustkorb von vorn mit Brustbein und Rippen; ein Finger drückt auf einen gereizten Rippenansatz neben dem Brustbein und löst dort den Schmerz aus">
      <Etikett x={360} y={84} anker="middle">
        Schmerz an einer Stelle
      </Etikett>
      <Unterzeile x={360} y={118} anker="middle">
        lässt sich mit dem Finger auslösen
      </Unterzeile>

      {/* Rippen */}
      <g fill="none" strokeLinecap="round">
        {RIPPEN.map((y) => (
          <g key={y}>
            <path d={`M372 ${y} C430 ${y - 14} 510 ${y} 530 ${y + 60}`} stroke={F.linie} strokeWidth="18" />
            <path d={`M372 ${y} C430 ${y - 14} 510 ${y} 530 ${y + 60}`} stroke={F.petrolHell} strokeWidth="10" />
            <path d={`M348 ${y} C290 ${y - 14} 210 ${y} 190 ${y + 60}`} stroke={F.linie} strokeWidth="18" />
            <path d={`M348 ${y} C290 ${y - 14} 210 ${y} 190 ${y + 60}`} stroke={F.petrolHell} strokeWidth="10" />
          </g>
        ))}
      </g>

      {/* Brustbein */}
      <rect x="346" y="170" width="28" height="270" rx="12" {...KONTUR} fill={F.petrol} />

      {/* Gereizter Rippenansatz */}
      <g fill={F.kupfer}>
        <ellipse cx="395" cy="302" rx="44" ry="36" fillOpacity="0.25" />
        <ellipse cx="395" cy="302" rx="30" ry="25" fillOpacity="0.3" />
        <circle cx="395" cy="302" r="9" />
      </g>

      {/* Hand mit Finger */}
      <g transform="translate(414 286) rotate(-31.3)">
        <rect x="0" y="-16" width="120" height="32" rx="16" {...KONTUR} fill={F.creme} />
        <rect x="100" y="-24" width="96" height="62" rx="24" {...KONTUR} fill={F.creme} />
        <path d="M122 14 L176 14" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      </g>

      <Zeiger von={[600, 530]} nach={[402, 316]} />
      <Etikett x={690} y={560} anker="end">
        Rippenansatz
      </Etikett>
      <Unterzeile x={690} y={590} anker="end">
        am Brustbein gereizt
      </Unterzeile>

      <Etikett x={360} y={660} anker="middle">
        Ändert sich beim Drehen und Atmen
      </Etikett>
    </Zeichnung>
  );
}
