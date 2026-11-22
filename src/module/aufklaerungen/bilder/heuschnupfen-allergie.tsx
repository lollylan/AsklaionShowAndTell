import { Etikett, F, Folge, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Pollenkorn: runde Form mit kleinen Noppen. */
function Pollen({ x, y }: { x: number; y: number }) {
  const noppen = Array.from({ length: 14 }, (_, i) => (i / 14) * Math.PI * 2);
  return (
    <g transform={`translate(${x} ${y})`}>
      {noppen.map((w) => (
        <circle key={w} cx={Math.cos(w) * 46} cy={Math.sin(w) * 46} r="7" fill={F.kupferHell} />
      ))}
      <circle r="44" {...KONTUR} fill={F.kupferHell} />
      <circle r="14" fill={F.kupfer} />
    </g>
  );
}

/** Abwehrstoff als kleines Y, zeigt nach außen. */
function Abwehrstoff({ winkel }: { winkel: number }) {
  return (
    <g transform={`rotate(${winkel}) translate(0 -112)`}>
      <path d="M0 6 L0 -12 M0 -12 L-10 -24 M0 -12 L10 -24" {...KONTUR} strokeWidth={5} stroke={F.kupferHell} />
    </g>
  );
}

const KOERNCHEN: [number, number][] = [
  [-40, -30],
  [10, -50],
  [44, -10],
  [-20, 20],
  [30, 40],
  [-50, 30],
  [0, -6],
];
const FREI: [number, number][] = [
  [140, -60],
  [160, 10],
  [130, 70],
  [190, -20],
];

/** Pollen trifft auf eine Abwehrzelle mit Abwehrstoffen; sie schüttet Histamin aus. */
export default function HeuschnupfenAllergie() {
  return (
    <Zeichnung titel="Ein Pollenkorn trifft auf eine Abwehrzelle in der Nasenschleimhaut. Auf ihr sitzen Abwehrstoffe gegen den Pollen. Die Zelle schüttet daraufhin Histamin aus, das Niesen, Juckreiz und Schnupfen auslöst">
      <Etikett x={360} y={60} anker="middle">
        Was bei einer Allergie passiert
      </Etikett>

      <g className="heuschnupfen-allergie-pollen-form">
        <Pollen x={110} y={330} />
      </g>
      <Folge ab={1.7} von={0}>
        <Pfeil d="M170 330 L220 330" farbe={F.leise} breite={4} />
      </Folge>

      <g transform="translate(340 330)">
        <circle r="100" {...KONTUR} fill={F.petrol} />
        {[-60, -30, 0, 30, 60, 120, 150, 180, 210, 240].map((w) => (
          <Abwehrstoff key={w} winkel={w - 90} />
        ))}
        {KOERNCHEN.map(([kx, ky]) => (
          <circle key={`${kx}-${ky}`} cx={kx} cy={ky} r="11" fill={F.petrolDunkel} />
        ))}
        <g className="heuschnupfen-allergie-frei">
          {FREI.map(([kx, ky]) => (
            <circle key={`${kx}-${ky}`} cx={kx} cy={ky} r="11" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
          ))}
        </g>
      </g>
      <Folge ab={3.2} von={0}>
        <Pfeil d="M550 330 L582 330" farbe={F.leise} breite={4} />
      </Folge>

      <Etikett x={110} y={430} anker="middle">
        Pollen
      </Etikett>
      <Unterzeile x={110} y={462} anker="middle">
        eigentlich harmlos
      </Unterzeile>

      <Etikett x={340} y={510} anker="middle">
        Abwehrzelle
      </Etikett>
      <Unterzeile x={340} y={542} anker="middle">
        trägt Abwehrstoffe gegen Pollen
      </Unterzeile>

      <Folge ab={2.8} von={0}>
        <Etikett x={690} y={200} anker="end" farbe={F.kupferHell}>
          Histamin
        </Etikett>
        <Unterzeile x={690} y={232} anker="end">
          wird frei
        </Unterzeile>
      </Folge>

      <Folge ab={3.6} von={0}>
        <Etikett x={690} y={322} anker="end">
          Niesen,
        </Etikett>
        <Etikett x={690} y={356} anker="end">
          Jucken
        </Etikett>
      </Folge>

      <Unterzeile x={360} y={650} anker="middle">
        Das geschieht bei jedem neuen Kontakt
      </Unterzeile>
    </Zeichnung>
  );
}
