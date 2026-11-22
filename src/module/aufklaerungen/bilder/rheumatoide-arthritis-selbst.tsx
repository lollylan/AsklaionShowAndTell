import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const BREITE = 80;
const ABSTAND = 10;
const X0 = 50;
const Y0 = 250;

/** Kleine Tablette, (x, y) Mitte. */
function Tablette({ x, y, farbe }: { x: number; y: number; farbe: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(-30)`}>
      <rect x="-26" y="-12" width="52" height="24" rx="12" fill={farbe} stroke={F.linie} strokeWidth="3" />
      <line x1="0" y1="-12" x2="0" y2="12" stroke={F.linie} strokeWidth="3" />
    </g>
  );
}

/** Wochenplan: Methotrexat einmal pro Woche am festen Tag, Folsäure am Tag danach. */
export default function RheumatoideArthritisSelbst() {
  return (
    <Zeichnung titel="Eine Woche von Montag bis Sonntag: Am Montag eine Tablette Methotrexat, am Dienstag Folsäure, an den übrigen Tagen nichts davon">
      <Etikett x={360} y={90} anker="middle">
        Eine Woche mit Methotrexat
      </Etikett>
      <Unterzeile x={360} y={126} anker="middle">
        Beispiel: Montag
      </Unterzeile>

      {TAGE.map((tag, i) => {
        const x = X0 + i * (BREITE + ABSTAND);
        const fuellung = i === 0 ? F.kupfer : i === 1 ? F.petrolHell : F.petrolDunkel;
        return (
          <g key={tag}>
            <Etikett x={x + BREITE / 2} y={Y0 - 22} anker="middle">
              {tag}
            </Etikett>
            <rect x={x} y={Y0} width={BREITE} height="110" rx="12" {...KONTUR} strokeWidth="3" fill={fuellung} />
          </g>
        );
      })}
      <Tablette x={X0 + BREITE / 2} y={Y0 + 55} farbe={F.kupferHell} />
      <Tablette x={X0 + BREITE + ABSTAND + BREITE / 2} y={Y0 + 55} farbe={F.petrol} />

      <Zeiger von={[90, 444]} nach={[X0 + 30, Y0 + 100]} />
      <Etikett x={40} y={478} farbe={F.kupferHell}>
        Methotrexat
      </Etikett>
      <Unterzeile x={40} y={510}>
        einmal pro Woche,
      </Unterzeile>
      <Unterzeile x={40} y={540}>
        immer am selben Tag
      </Unterzeile>

      <Zeiger von={[420, 446]} nach={[X0 + BREITE + ABSTAND + 50, Y0 + 100]} />
      <Etikett x={400} y={478}>
        Folsäure
      </Etikett>
      <Unterzeile x={400} y={510}>
        am Tag danach
      </Unterzeile>

      <Etikett x={360} y={634} anker="middle" farbe={F.kupferHell}>
        Methotrexat nie täglich nehmen
      </Etikett>
    </Zeichnung>
  );
}
