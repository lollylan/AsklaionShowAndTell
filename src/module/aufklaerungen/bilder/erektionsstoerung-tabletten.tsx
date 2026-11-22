import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const NULL = 120;
const ENDE = 660;
/** x-Position nach Stunden ab Einnahme (0 bis 36). */
const hx = (h: number) => NULL + (h / 36) * (ENDE - NULL);

/** Balken: gestrichelt bis zum Wirkbeginn, dann voll. */
function Wirkung({ y, bis }: { y: number; bis: number }) {
  return (
    <g>
      <line x1={hx(0)} y1={y + 20} x2={hx(1)} y2={y + 20} stroke={F.leise} strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round" />
      <rect x={hx(1)} y={y} width={hx(bis) - hx(1)} height="40" rx="20" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <circle cx={hx(0)} cy={y + 20} r="12" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />
    </g>
  );
}

/** Wirkdauer von Sildenafil und Tadalafil im Vergleich. */
export default function ErektionsstoerungTabletten() {
  return (
    <Zeichnung titel="Zeitachse über 36 Stunden: Sildenafil nimmt man etwa eine Stunde vorher, es wirkt einige Stunden. Tadalafil wirkt bis zu anderthalb Tage. Beide wirken nur bei sexueller Erregung">
      <Etikett x={NULL - 20} y={150}>
        Sildenafil
      </Etikett>
      <Unterzeile x={NULL - 20} y={180}>
        etwa 1 Stunde vorher, wirkt einige Stunden
      </Unterzeile>
      <Wirkung y={200} bis={5} />

      <Etikett x={NULL - 20} y={320}>
        Tadalafil
      </Etikett>
      <Unterzeile x={NULL - 20} y={350}>
        wirkt bis zu anderthalb Tage
      </Unterzeile>
      <Wirkung y={370} bis={36} />

      {/* Zeitachse */}
      <line x1={NULL} y1={460} x2={ENDE} y2={460} stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      {[0, 12, 24, 36].map((h) => (
        <g key={h}>
          <line x1={hx(h)} y1={460} x2={hx(h)} y2={474} stroke={F.linie} strokeWidth="3" />
          <Unterzeile x={hx(h)} y={504} anker="middle">
            {`${h} h`}
          </Unterzeile>
        </g>
      ))}
      <Unterzeile x={NULL - 20} y={540} farbe={F.kupferHell}>
        Punkt: Einnahme
      </Unterzeile>

      <Etikett x={360} y={590} anker="middle">
        Wirkt nur bei Erregung
      </Etikett>
      <Unterzeile x={360} y={624} anker="middle" farbe={F.kupferHell}>
        Nie zusammen mit Nitro-Spray oder Poppers
      </Unterzeile>
    </Zeichnung>
  );
}
