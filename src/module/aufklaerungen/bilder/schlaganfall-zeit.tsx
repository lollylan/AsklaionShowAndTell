import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const STUNDE = 90;
const x = (h: number) => 80 + h * STUNDE;

/** Zeitfenster der Akutbehandlung: Auflösen bis 4,5 Stunden, Katheter meist bis 6 Stunden. */
export default function SchlaganfallZeit() {
  return (
    <Zeichnung titel="Zeitleiste über sechs Stunden ab Beginn des Schlaganfalls: Das Gerinnsel kann bis etwa viereinhalb Stunden per Infusion aufgelöst werden, per Katheter meist bis sechs Stunden, manchmal später. Darunter ein Keil: Das rettbare Gehirn wird mit jeder Minute weniger">
      <Etikett x={40} y={58}>
        Je früher, desto mehr Gehirn bleibt
      </Etikett>

      <Etikett x={40} y={140}>
        Gerinnsel auflösen
      </Etikett>
      <Unterzeile x={40} y={170}>
        per Infusion, bis etwa 4,5 Stunden
      </Unterzeile>
      <rect x={x(0)} y="190" width={4.5 * STUNDE} height="36" rx="18" fill={F.petrolHell} />

      <Etikett x={40} y={290}>
        Gerinnsel herausholen
      </Etikett>
      <Unterzeile x={40} y={320}>
        per Katheter, meist bis 6 Stunden, manchmal später
      </Unterzeile>
      <rect x={x(0)} y="340" width={6 * STUNDE} height="36" rx="18" fill={F.petrolHell} />
      <path d={`M${x(6) + 10} 358 L690 358`} stroke={F.petrolHell} strokeWidth="6" strokeDasharray="4 10" strokeLinecap="round" />

      <Etikett x={40} y={440} farbe={F.kupferHell}>
        Rettbares Gehirn
      </Etikett>
      <path d={`M${x(0)} 460 L${x(6)} 504 L${x(6)} 516 L${x(0)} 560 Z`} fill={F.kupfer} />

      {/* Zeitachse */}
      <line x1={x(0)} y1="600" x2={x(6)} y2="600" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5, 6].map((h) => (
        <g key={h}>
          <line x1={x(h)} y1="592" x2={x(h)} y2="608" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
          <Unterzeile x={x(h)} y={638} anker="middle">
            {String(h)}
          </Unterzeile>
        </g>
      ))}
      <Unterzeile x={360} y={680} anker="middle">
        Stunden seit Beginn
      </Unterzeile>
    </Zeichnung>
  );
}
