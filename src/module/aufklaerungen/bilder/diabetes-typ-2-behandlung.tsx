import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

interface Stufe {
  y: number;
  breite: number;
  titel: string;
  zeile: string;
  fuellung: string;
}

const STUFEN: Stufe[] = [
  { y: 520, breite: 600, titel: 'Essen, Bewegung, Abnehmen', zeile: 'die Grundlage – immer', fuellung: F.petrolHell },
  { y: 396, breite: 480, titel: 'Metformin', zeile: 'meist das erste Medikament', fuellung: F.petrol },
  { y: 272, breite: 400, titel: 'Neuere Mittel', zeile: 'schützen Herz und Nieren', fuellung: F.petrol },
  { y: 148, breite: 260, titel: 'Insulin', zeile: 'nur bei manchen', fuellung: F.petrolDunkel },
];

/** Stufenplan der Behandlung: Grundlage Lebensstil, darauf bei Bedarf Medikamente. */
export default function DiabetesBehandlung() {
  return (
    <Zeichnung titel="Behandlung als Stufen: unten die Grundlage aus Essen, Bewegung und Abnehmen, darauf Metformin, dann neuere Mittel, die Herz und Nieren schützen, und ganz oben Insulin, das nur manche brauchen">
      <Etikett x={40} y={66}>
        Schritt für Schritt
      </Etikett>
      <Unterzeile x={40} y={98}>
        Die nächste Stufe nur, wenn nötig
      </Unterzeile>

      {STUFEN.map((s) => {
        const x = 380 - s.breite / 2;
        return (
          <g key={s.titel}>
            <rect x={x} y={s.y} width={s.breite} height="110" rx="14" {...KONTUR} fill={s.fuellung} />
            <Etikett x={380} y={s.y + 50} anker="middle">
              {s.titel}
            </Etikett>
            <Unterzeile x={380} y={s.y + 82} anker="middle" farbe={F.linie}>
              {s.zeile}
            </Unterzeile>
          </g>
        );
      })}

      <Pfeil d="M44 600 L44 170" farbe={F.leise} breite={4} />
    </Zeichnung>
  );
}
