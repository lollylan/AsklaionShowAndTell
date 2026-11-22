import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const PUNKTE: [number, number][] = [
  [-24, -20],
  [18, -30],
  [30, 8],
  [-10, 14],
  [-34, 28],
  [12, 36],
];

/** Weg des Virus: Windpocken in der Kindheit, jahrelanger Schlaf im Nervenknoten, Gürtelrose bei schwacher Abwehr. */
export default function GuertelroseUrsachen() {
  return (
    <Zeichnung titel="Drei Stationen untereinander: Windpocken meist in der Kindheit; danach schläft das Virus viele Jahre unbemerkt in einem Nervenknoten; wenn die Abwehr nachlässt, wacht es auf und es entsteht eine Gürtelrose">
      {/* 1: Windpocken */}
      <g transform="translate(140 140)">
        <circle cx="0" cy="0" r="62" {...KONTUR} fill={F.petrol} />
        {PUNKTE.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill={F.kupferHell} />
        ))}
      </g>
      <Etikett x={250} y={130}>
        Windpocken
      </Etikett>
      <Unterzeile x={250} y={164}>
        meist in der Kindheit
      </Unterzeile>

      <Pfeil d="M140 218 L140 282" farbe={F.leise} breite={5} />

      {/* 2: Nervenknoten mit schlafendem Virus */}
      <g transform="translate(140 360)">
        <path d="M-90 0 L-40 0 M40 0 L90 0" {...KONTUR} strokeWidth="8" stroke={F.creme} />
        <ellipse cx="0" cy="0" rx="50" ry="38" {...KONTUR} fill={F.petrolHell} />
        <circle cx="0" cy="0" r="13" fill={F.petrolDunkel} stroke={F.kupferHell} strokeWidth="3" />
      </g>
      <Etikett x={250} y={350}>
        Virus schläft im Nerv
      </Etikett>
      <Unterzeile x={250} y={384}>
        viele Jahre, unbemerkt
      </Unterzeile>

      <Pfeil d="M140 420 L140 484" farbe={F.leise} breite={5} />

      {/* 3: Bläschenband */}
      <g transform="translate(140 570)">
        <rect x="-80" y="-56" width="160" height="112" rx="20" {...KONTUR} fill={F.petrol} />
        <path d="M-70 30 C-30 10 20 -10 70 -30" fill="none" stroke={F.kupfer} strokeWidth="40" strokeOpacity="0.45" strokeLinecap="round" />
        {[
          [-50, 20],
          [-24, 10],
          [2, 0],
          [28, -12],
          [52, -22],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="8" fill={F.kupferHell} stroke={F.kupfer} strokeWidth="2" />
        ))}
      </g>
      <Etikett x={250} y={560} farbe={F.kupferHell}>
        Abwehr lässt nach: Gürtelrose
      </Etikett>
      <Unterzeile x={250} y={594}>
        Alter, Stress, Krankheit
      </Unterzeile>
    </Zeichnung>
  );
}
