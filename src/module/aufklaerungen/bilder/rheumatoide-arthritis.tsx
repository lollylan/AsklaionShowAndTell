import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Finger als [links, oben, Grundgelenk, Mittelgelenk, Endgelenk] (y-Werte), Breite 50. */
const FINGER: [number, number, number, number, number][] = [
  [142, 160, 385, 290, 215],
  [197, 130, 385, 270, 195],
  [252, 155, 385, 285, 215],
  [307, 215, 385, 315, 258],
];

const HANDFLAECHE =
  'M140 372 L360 372 L362 540 Q360 572 335 584 L335 700 L165 700 L165 584 Q140 566 138 524 Z';

/** Umriss der Hand: erst alles dick in Linienfarbe, darüber die Flächen – so bleibt nur der Außenrand. */
function Hand({ rand }: { rand: boolean }) {
  const strich = rand ? { stroke: F.linie, strokeWidth: 8, strokeLinejoin: 'round' as const } : {};
  const fuellung = rand ? F.linie : F.petrol;
  return (
    <g fill={fuellung} {...strich}>
      {FINGER.map(([x, oben]) => (
        <rect key={x} x={x} y={oben} width="50" height={400 - oben} rx="25" />
      ))}
      <rect x="-27" y="-95" width="54" height="190" rx="27" transform="translate(105 440) rotate(-35)" />
      <path d={HANDFLAECHE} />
    </g>
  );
}

/** Rechte Hand von oben: entzündete Grund- und Mittelgelenke, Handgelenk, Endgelenke frei. */
export default function RheumatoideArthritis() {
  return (
    <Zeichnung titel="Rechte Hand von oben: entzündete, geschwollene Fingergrund- und Fingermittelgelenke sowie das Handgelenk sind hervorgehoben, die Fingerendgelenke sind meist nicht befallen">
      <Hand rand />
      <Hand rand={false} />

      {/* Entzündetes Handgelenk */}
      <ellipse cx="250" cy="600" rx="72" ry="20" fill={F.kupfer} fillOpacity="0.75" />

      {/* Gelenke der Finger */}
      {FINGER.map(([x, , grund, mitte, ende]) => (
        <g key={x}>
          <circle cx={x + 25} cy={grund} r="17" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
          <circle cx={x + 25} cy={mitte} r="16" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
          <circle cx={x + 25} cy={ende} r="11" fill="none" stroke={F.leise} strokeWidth="3" />
        </g>
      ))}
      {/* Daumengrundgelenk */}
      <circle cx="128" cy="473" r="16" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />

      <Etikett x={360} y={62} anker="middle">
        Meist beide Hände gleich
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        geschwollen, warm, morgens steif
      </Unterzeile>

      <Zeiger von={[396, 224]} nach={[343, 256]} />
      <Etikett x={404} y={224}>
        Endgelenke
      </Etikett>
      <Unterzeile x={404} y={254}>
        meist nicht befallen
      </Unterzeile>

      <Zeiger von={[396, 328]} nach={[348, 315]} />
      <Etikett x={404} y={336} farbe={F.kupferHell}>
        Fingermittelgelenke
      </Etikett>

      <Zeiger von={[396, 404]} nach={[349, 388]} />
      <Etikett x={404} y={412} farbe={F.kupferHell}>
        Fingergrundgelenke
      </Etikett>

      <Zeiger von={[396, 596]} nach={[310, 600]} />
      <Etikett x={404} y={604} farbe={F.kupferHell}>
        Handgelenk
      </Etikett>
    </Zeichnung>
  );
}
