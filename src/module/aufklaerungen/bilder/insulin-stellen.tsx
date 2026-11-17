import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { NABEL, Rumpf } from './hernie';

const [NX, NY] = NABEL;

/** Spritzstellen am Bauch als Raster: die zuletzt benutzte in Kupfer, die nächsten hohl. */
const RASTER: [number, number][] = [];
for (let r = 0; r < 3; r++) {
  for (let s = 0; s < 3; s++) {
    RASTER.push([398 + s * 20, NY - 22 + r * 22]);
  }
}

export default function InsulinStellen() {
  return (
    <Zeichnung titel="Rumpf von vorn mit den Spritzstellen: am Bauch rund um den Nabel mit zwei Finger Abstand, dort wirkt Insulin schneller, und vorn außen an den Oberschenkeln, dort wirkt es langsamer. Die Stelle jedes Mal wechseln">
      <Rumpf>
        {/* Bauch: Fläche um den Nabel, der Nabel selbst mit Abstand ausgespart */}
        <ellipse cx={NX} cy={NY + 10} rx={94} ry={66} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" strokeDasharray="6 8" />
        <circle cx={NX} cy={NY} r={32} fill={F.petrol} stroke={F.linie} strokeWidth="2" strokeDasharray="4 6" />
        {/* Oberschenkel vorn außen */}
        <ellipse cx={278} cy={584} rx={34} ry={54} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" strokeDasharray="6 8" />
        <ellipse cx={442} cy={584} rx={34} ry={54} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" strokeDasharray="6 8" />
        {/* Wechsel der Stelle */}
        {RASTER.map(([x, y], i) =>
          i === 0 ? (
            <circle key={i} cx={x} cy={y} r={7} fill={F.kupfer} stroke={F.linie} strokeWidth="2" />
          ) : (
            <circle key={i} cx={x} cy={y} r={6} fill="none" stroke={F.tief} strokeWidth="3" />
          ),
        )}
      </Rumpf>

      <Etikett x={700} y={276} anker="end">
        Bauch
      </Etikett>
      <Unterzeile x={700} y={306} anker="end">
        wirkt schneller
      </Unterzeile>
      <Zeiger von={[506, 296]} nach={[336, 302]} />

      <Unterzeile x={700} y={436} anker="end" farbe={F.linie}>
        Stelle jedes
      </Unterzeile>
      <Unterzeile x={700} y={464} anker="end" farbe={F.linie}>
        Mal wechseln
      </Unterzeile>
      <Zeiger von={[556, 430]} nach={[448, NY + 32]} />

      <Unterzeile x={20} y={300}>
        2 Finger Abstand
      </Unterzeile>
      <Unterzeile x={20} y={328}>
        zum Nabel
      </Unterzeile>
      <Zeiger von={[180, 322]} nach={[NX - 32, NY]} />

      <Etikett x={20} y={560}>
        Oberschenkel
      </Etikett>
      <Unterzeile x={20} y={590}>
        wirkt langsamer
      </Unterzeile>
      <Zeiger von={[206, 580]} nach={[256, 584]} />
    </Zeichnung>
  );
}
