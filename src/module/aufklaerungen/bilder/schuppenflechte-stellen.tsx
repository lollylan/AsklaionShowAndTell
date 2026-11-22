import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Silhouette } from './gehhilfen';

const RUMPF =
  'M330 160 C306 164 292 174 290 196 L298 300 C302 330 308 350 310 378 L410 378 ' +
  'C412 350 418 330 422 300 L430 196 C428 174 414 164 390 160 Z';

/** Schuppiger Fleck: rot mit hellen Schuppen. */
function Fleck({ x, y, rx = 17, ry = 12 }: { x: number; y: number; rx?: number; ry?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
      <path
        d={`M${x - 8} ${y - 2} q4 -4 8 0 M${x + 1} ${y + 4} q4 -4 8 0`}
        fill="none"
        stroke={F.creme}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Figur von hinten mit den typischen Stellen der Schuppenflechte. */
export default function SchuppenflechteStellen() {
  return (
    <Zeichnung titel="Figur von hinten: schuppige rote Flecken an der Kopfhaut, an beiden Ellenbogen und am Steiß. Außerdem häufig: Knie vorn, Bauchnabel und Nägel">
      <Silhouette
        glieder={[
          { p: [[336, 370], [330, 476], [326, 590]], b: 40 },
          { p: [[386, 370], [390, 476], [394, 590]], b: 40 },
          { p: [[298, 192], [252, 296], [272, 392]], b: 26 },
          { p: [[422, 192], [468, 296], [448, 392]], b: 26 },
          { p: [[360, 136], [360, 168]], b: 30 },
        ]}
        flaechen={[{ d: RUMPF }]}
        kreise={[{ x: 360, y: 104, r: 38 }]}
      />
      {/* Wirbelsäule als Andeutung */}
      <line x1="360" y1="176" x2="360" y2="360" stroke={F.leise} strokeWidth="3" strokeDasharray="8 8" strokeOpacity="0.7" />

      <Fleck x={360} y={80} rx={20} ry={11} />
      <Fleck x={252} y={296} />
      <Fleck x={468} y={296} />
      <Fleck x={360} y={384} rx={15} ry={11} />

      <Zeiger von={[214, 76]} nach={[338, 80]} />
      <Etikett x={40} y={84}>
        Kopfhaut
      </Etikett>

      <Zeiger von={[540, 290]} nach={[486, 296]} />
      <Etikett x={548} y={300}>
        Ellenbogen
      </Etikett>

      <Zeiger von={[222, 392]} nach={[344, 386]} />
      <Etikett x={40} y={400}>
        Steißbereich
      </Etikett>

      <Unterzeile x={680} y={40} anker="end">
        von hinten gesehen
      </Unterzeile>
      <Etikett x={360} y={646} anker="middle">
        Rote Flecken mit Schuppen
      </Etikett>
      <Unterzeile x={360} y={680} anker="middle">
        außerdem oft: Knie vorn, Bauchnabel, Nägel
      </Unterzeile>
    </Zeichnung>
  );
}
