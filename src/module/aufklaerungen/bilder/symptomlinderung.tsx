import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const BESCHWERDEN = ['Schmerz', 'Atemnot', 'Übelkeit', 'Unruhe und Angst'];
const ERSTE_ZEILE = 150;
const ABSTAND = 92;

/** Kapsel als Zeichen für das Bedarfsmedikament, Mitte (x, y). */
function Kapsel({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y - 17} L${x - 24} ${y - 17} A17 17 0 0 0 ${x - 24} ${y + 17} L${x} ${y + 17} Z`} fill={F.kupferHell} />
      <path d={`M${x} ${y - 17} L${x + 24} ${y - 17} A17 17 0 0 1 ${x + 24} ${y + 17} L${x} ${y + 17} Z`} fill={F.creme} />
      <rect x={x - 41} y={y - 17} width="82" height="34" rx="17" {...KONTUR} strokeWidth="3" />
    </g>
  );
}

/** Notfallplan am Brett: je Beschwerde ein Bedarfsmedikament, darunter wen man zuerst anruft. */
export default function Symptomlinderung() {
  return (
    <Zeichnung titel="Ein Notfallplan auf einem Klemmbrett: für Schmerz, Atemnot, Übelkeit sowie Unruhe und Angst je ein Bedarfsmedikament. Darunter ein Telefon: zuerst das Palliativteam oder die Hausarztpraxis anrufen">
      {/* Klemmbrett */}
      <rect x="90" y="70" width="540" height="420" rx="18" {...KONTUR} fill={F.petrolDunkel} />
      <rect x="290" y="50" width="140" height="40" rx="10" {...KONTUR} fill={F.petrol} />

      {BESCHWERDEN.map((name, i) => {
        const y = ERSTE_ZEILE + i * ABSTAND;
        return (
          <g key={name}>
            <Etikett x={130} y={y + 9}>
              {name}
            </Etikett>
            <line
              x1="390"
              y1={y}
              x2="480"
              y2={y}
              stroke={F.leise}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 10"
            />
            <Kapsel x={540} y={y} />
          </g>
        );
      })}

      {/* Telefon */}
      <rect x="112" y="566" width="50" height="86" rx="10" {...KONTUR} fill={F.petrol} />
      <rect x="122" y="580" width="30" height="46" rx="3" fill={F.creme} />
      <circle cx="137" cy="639" r="4" fill={F.linie} />

      <Etikett x={196} y={598}>
        Zuerst anrufen
      </Etikett>
      <Unterzeile x={196} y={632}>
        Palliativteam oder Hausarztpraxis
      </Unterzeile>
    </Zeichnung>
  );
}
