import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const ACHSE = 420;
/** x-Position einer Woche (0 bis 12). */
const wx = (w: number) => 60 + w * 50;

const KURVE =
  `M${wx(0)} 200 C${wx(1)} 190 ${wx(1.5)} 186 ${wx(2)} 204 C${wx(3)} 230 ${wx(4)} 270 ${wx(5)} 300 ` +
  `C${wx(6)} 330 ${wx(7)} 354 ${wx(8)} 366 C${wx(9)} 374 ${wx(11)} 378 ${wx(12)} 378`;

/** Zeitverlauf: Cremes gegen Akne wirken erst nach Wochen. */
export default function AkneZeitplan() {
  return (
    <Zeichnung titel="Zeitverlauf über zwölf Wochen: Am Anfang brennt und schuppt die Haut, die Pickel werden langsam weniger, eine deutliche Besserung sieht man nach sechs bis acht Wochen. Danach weiter pflegen">
      {/* Menge der Pickel */}
      <path d={`${KURVE} L${wx(12)} ${ACHSE} L${wx(0)} ${ACHSE} Z`} fill={F.petrol} />
      <path d={KURVE} {...KONTUR} />

      {/* Zeitraum der sichtbaren Besserung */}
      <rect x={wx(6)} y={160} width={wx(8) - wx(6)} height={ACHSE - 160} fill={F.kupferHell} fillOpacity="0.14" />
      {[6, 8].map((w) => (
        <line key={w} x1={wx(w)} y1={160} x2={wx(w)} y2={ACHSE} stroke={F.kupferHell} strokeWidth="3" strokeDasharray="8 8" />
      ))}

      {/* Achse */}
      <path d={`M${wx(0)} ${ACHSE} L${wx(12)} ${ACHSE}`} {...KONTUR} />
      {[0, 2, 4, 6, 8, 10, 12].map((w) => (
        <g key={w}>
          <line x1={wx(w)} y1={ACHSE} x2={wx(w)} y2={ACHSE + 12} stroke={F.linie} strokeWidth="3" />
          <Unterzeile x={wx(w)} y={ACHSE + 42} anker="middle">
            {String(w)}
          </Unterzeile>
        </g>
      ))}
      <Unterzeile x={360} y={ACHSE + 76} anker="middle">
        Wochen
      </Unterzeile>
      <Unterzeile x={wx(0) + 8} y={ACHSE - 16}>
        Pickel
      </Unterzeile>

      <Etikett x={wx(0)} y={112}>
        Am Anfang
      </Etikett>
      <Unterzeile x={wx(0)} y={142}>
        brennt und schuppt
      </Unterzeile>

      <Etikett x={wx(7)} y={112} anker="middle" farbe={F.kupferHell}>
        Besserung
      </Etikett>
      <Unterzeile x={wx(7)} y={142} anker="middle">
        nach 6 bis 8 Wochen
      </Unterzeile>

      <Etikett x={360} y={590} anker="middle">
        Danach weiter pflegen
      </Etikett>
      <Unterzeile x={360} y={622} anker="middle">
        sonst kommt die Akne zurück
      </Unterzeile>
    </Zeichnung>
  );
}
