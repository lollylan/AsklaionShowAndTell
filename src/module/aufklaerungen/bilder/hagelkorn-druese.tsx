import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const RAND = 420;
const DRUESEN = [170, 200, 230, 260, 290, 320, 400, 430, 460, 490, 520, 550];

/** Obere Grenze der Lidplatte über x (halbe Ellipse). */
const oben = (x: number) => RAND - 150 * Math.sqrt(Math.max(0, 1 - ((x - 360) / 250) ** 2)) + 18;

/** Lange Talgdrüse mit Läppchen, mündet am Lidrand. */
function Druese({ x }: { x: number }) {
  const top = oben(x) + 8;
  const laeppchen: number[] = [];
  for (let y = top + 6; y < RAND - 16; y += 18) laeppchen.push(y);
  return (
    <g>
      <line x1={x} y1={top} x2={x} y2={RAND - 4} stroke={F.petrolHell} strokeWidth="6" strokeLinecap="round" />
      {laeppchen.map((y) => (
        <g key={y}>
          <circle cx={x - 7} cy={y} r="5" fill={F.petrolHell} />
          <circle cx={x + 7} cy={y + 9} r="5" fill={F.petrolHell} />
        </g>
      ))}
    </g>
  );
}

/** Lid von vorn, durchsichtig gedacht: Talgdrüsen, eine mit verstopftem Ausgang und Fettstau. */
export default function HagelkornDruese() {
  return (
    <Zeichnung titel="Oberlid von vorn, durchsichtig gedacht: In der Lidplatte liegen lange Talgdrüsen nebeneinander, die am Lidrand münden. Bei einer ist der Ausgang verstopft, das Fett staut sich zu einem runden Knoten">
      {/* Lidplatte */}
      <path d={`M110 ${RAND} C130 300 230 252 360 252 C490 252 590 300 610 ${RAND} Z`} fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" />
      {DRUESEN.map((x) => (
        <Druese key={x} x={x} />
      ))}

      {/* Gestaute Drüse in der Mitte */}
      <line x1="360" y1={oben(360) + 8} x2="360" y2={RAND - 4} stroke={F.kupferHell} strokeWidth="6" strokeLinecap="round" />
      <circle cx="360" cy="338" r="40" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      <rect x="350" y={RAND - 10} width="20" height="14" rx="4" fill={F.creme} stroke={F.kupfer} strokeWidth="3" />

      {/* Lidrand und Wimpern */}
      <path d={`M100 ${RAND} L620 ${RAND}`} stroke={F.linie} strokeWidth="5" strokeLinecap="round" />
      {Array.from({ length: 17 }, (_, i) => 130 + i * 29).map((x) => (
        <path key={x} d={`M${x} ${RAND + 4} q4 18 -4 34`} fill="none" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
      ))}

      <Zeiger von={[150, 214]} nach={[200, 344]} />
      <Etikett x={40} y={200}>
        Talgdrüsen im Lid
      </Etikett>

      <Zeiger von={[580, 214]} nach={[396, 326]} />
      <Etikett x={680} y={170} anker="end" farbe={F.kupferHell}>
        Fett staut sich
      </Etikett>
      <Unterzeile x={680} y={200} anker="end">
        fester Knoten
      </Unterzeile>

      <Zeiger von={[500, 508]} nach={[366, 420]} />
      <Etikett x={680} y={540} anker="end">
        Ausgang verstopft
      </Etikett>

      <Unterzeile x={360} y={620} anker="middle">
        Normal fließt das Fett am Lidrand in die Tränen
      </Unterzeile>
      <Unterzeile x={360} y={650} anker="middle">
        Oberlid von vorn, durchsichtig gedacht
      </Unterzeile>
    </Zeichnung>
  );
}
