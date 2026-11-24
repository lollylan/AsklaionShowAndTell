import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Ab wann ein Test eine Ansteckung sicher findet, in Wochen nach dem Kontakt. */
const TESTS: { name: string; probe: string; wochen: number }[] = [
  { name: 'Chlamydien, Tripper', probe: 'Abstrich oder Urin', wochen: 2 },
  { name: 'HIV im Labor', probe: 'Blut', wochen: 6 },
  { name: 'Syphilis', probe: 'Blut', wochen: 6 },
  { name: 'HIV-Selbsttest', probe: 'Blut aus dem Finger', wochen: 12 },
  { name: 'Hepatitis B und C', probe: 'Blut', wochen: 12 },
];

const LINKS = 40;
const RECHTS = 680;
/** Achse bis 14 Wochen, damit auch nach 12 Wochen noch ein „sicher“-Stück zu sehen ist. */
const X = (wochen: number) => LINKS + (wochen / 14) * (RECHTS - LINKS);
const OBEN = 170;
const ABSTAND = 96;

/** Zeitstrahl über gut drei Monate: leise die Zeit, in der ein Test noch nichts zeigt. */
export default function StiZeitfenster() {
  const unten = OBEN + TESTS.length * ABSTAND;
  return (
    <Zeichnung titel="Zeitstrahl über zwölf Wochen nach dem Kontakt: Chlamydien und Tripper sind nach zwei Wochen sicher nachweisbar, HIV im Labor und Syphilis nach sechs Wochen, HIV-Selbsttest sowie Hepatitis B und C nach etwa zwölf Wochen">
      <Etikett x={360} y={64} anker="middle">
        Ab wann der Test sicher ist
      </Etikett>
      <Unterzeile x={360} y={98} anker="middle">
        Wochen nach dem Kontakt
      </Unterzeile>

      {/* Legende */}
      <rect x={210} y={118} width={36} height={20} rx="10" fill={F.petrolDunkel} stroke={F.leise} strokeWidth="2" />
      <Unterzeile x={256} y={135}>
        zu früh
      </Unterzeile>
      <rect x={390} y={118} width={36} height={20} rx="10" fill={F.kupfer} />
      <Unterzeile x={436} y={135}>
        sicher
      </Unterzeile>

      {/* Wochenlinien */}
      {[0, 2, 6, 12].map((w) => (
        <g key={w}>
          <line x1={X(w)} y1={OBEN - 24} x2={X(w)} y2={unten} stroke={F.petrolHell} strokeWidth="2" strokeDasharray="6 8" />
          <Etikett x={X(w)} y={unten + 40} anker="middle">
            {String(w)}
          </Etikett>
        </g>
      ))}

      {TESTS.map((t, i) => {
        const y = OBEN + i * ABSTAND + 40;
        const ende = X(t.wochen);
        return (
          <g key={t.name}>
            {/* noch nicht sicher */}
            <rect x={LINKS} y={y - 14} width={ende - LINKS} height={28} rx="14" fill={F.petrolDunkel} stroke={F.leise} strokeWidth="2" />
            {/* ab hier sicher */}
            {ende < RECHTS && (
              <rect x={ende} y={y - 14} width={RECHTS - ende} height={28} rx="14" fill={F.kupfer} />
            )}
            <circle cx={ende} cy={y} r="17" fill={F.creme} stroke={F.kupfer} strokeWidth="5" />
            <Etikett x={ende < 400 ? ende + 30 : LINKS + 10} y={y - 26}>
              {t.name}
            </Etikett>
            <Unterzeile x={ende < 400 ? ende + 30 : LINKS + 10} y={y + 44}>
              {t.probe}
            </Unterzeile>
          </g>
        );
      })}
    </Zeichnung>
  );
}
