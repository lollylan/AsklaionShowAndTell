import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import {
  BAUCHFELL_Y,
  Bruchsack,
  Darm,
  DARM_DICKE,
  hautScheitel,
  sackPfad,
  Wandschnitt,
  type Beule,
  type Luecke,
} from './leistenbruch';

const LUECKE: Luecke = { mitte: 360, halb: 30 };
const BEULE: Beule = { mitte: 360, halb: 150, tiefe: 104 };
const SACK = sackPfad(LUECKE, 112, 216);
const BAUCHFELL = `M30 ${BAUCHFELL_Y} L${LUECKE.mitte - LUECKE.halb - 8} ${BAUCHFELL_Y} M${LUECKE.mitte + LUECKE.halb + 8} ${BAUCHFELL_Y} L690 ${BAUCHFELL_Y}`;

/** Fettläppchen des Bauchnetzes [x, y, r]: oben im Bauch, durch die Lücke bis in den Bruchsack. */
const FETT: [number, number, number][] = [
  [304, 140, 20],
  [340, 132, 20],
  [376, 144, 18],
  [318, 166, 18],
  [354, 170, 20],
  [340, 200, 18],
  [366, 214, 16],
  [352, 240, 18],
  [360, 270, 16],
  [360, 300, 16],
  [360, 330, 17],
  [340, 360, 20],
  [382, 360, 20],
  [318, 392, 20],
  [360, 392, 22],
  [402, 392, 20],
  [340, 422, 19],
  [382, 422, 19],
];

/** Darm oben im Bauchraum. */
const DARM = 'M450 170 C480 100 560 96 590 150 C612 190 640 190 660 160';

/** Nabelbruch im Schnitt: durch eine kleine Lücke am Nabel drückt Bauchfett im Bruchsack unter die Haut. */
export default function Nabelbruch() {
  const [nx, ny] = hautScheitel(BEULE);
  return (
    <Zeichnung titel="Schnitt durch die Bauchwand am Nabel: durch eine kleine Lücke in der Mitte der Bauchwand drückt sich ein Bruchsack mit Bauchfett nach außen, der Nabel wölbt sich vor">
      <Wandschnitt id="nabelbruch" luecke={LUECKE} beule={BEULE} bauchfell={BAUCHFELL} sack={<Bruchsack d={SACK} />}>
        <Darm d={DARM} dicke={DARM_DICKE} />
        {/* Bauchnetz-Fett als gelappter Strang: erst die Kontur, dann die Fläche darüber */}
        <g fill={F.linie}>
          {FETT.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r + 4} />
          ))}
        </g>
        <g fill={F.kupferHell}>
          {FETT.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
          ))}
        </g>
        {/* Nabel: Hautfalte in der Mitte der Vorwölbung */}
        <path d={`M${nx - 14} ${ny - 12} C${nx - 6} ${ny - 2} ${nx + 6} ${ny - 2} ${nx + 14} ${ny - 12}`} fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      </Wandschnitt>

      <Etikett x={30} y={186}>
        Lücke
      </Etikett>
      <Unterzeile x={30} y={214}>
        in der Bauchwand
      </Unterzeile>
      <Zeiger von={[214, 214]} nach={[322, 272]} />

      <Etikett x={30} y={480} farbe={F.kupferHell}>
        Bauchfett
      </Etikett>
      <Zeiger von={[170, 472]} nach={[316, 400]} />

      <Etikett x={700} y={480} anker="end">
        Bruchsack
      </Etikett>
      <Zeiger von={[548, 472]} nach={[434, 400]} />

      <Etikett x={nx} y={ny + 66} anker="middle">
        Nabel
      </Etikett>
      <Unterzeile x={nx} y={ny + 96} anker="middle">
        wölbt sich vor
      </Unterzeile>

      <Unterzeile x={360} y={672} anker="middle">
        Beim Husten und Pressen wird die Beule größer
      </Unterzeile>
    </Zeichnung>
  );
}
