import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const SPAET = 'M100 560 C200 540 250 200 350 190 C450 180 520 400 660 520';
const FRUEH = 'M100 560 C150 540 170 420 220 410 C280 400 320 520 420 556';

/** Migränemittel früh im Anfall genommen: Der Schmerz wird weniger stark und kürzer. */
export default function MigraeneBehandlung() {
  return (
    <Zeichnung titel="Zwei Kurven eines Migräneanfalls: Wird das Mittel früh genommen, steigt der Schmerz nur wenig und klingt bald ab; zu spät oder zu niedrig dosiert wird der Anfall stark und lang">
      <Etikett x={360} y={70} anker="middle">
        Früh behandeln wirkt besser
      </Etikett>

      <path d="M100 150 L100 590 L660 590" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <Unterzeile x={116} y={160}>
        Schmerz
      </Unterzeile>
      <Unterzeile x={660} y={630} anker="end">
        Stunden
      </Unterzeile>

      <path d={SPAET} fill="none" stroke={F.kupfer} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
      <path d={FRUEH} fill="none" stroke={F.linie} strokeWidth="7" strokeLinecap="round" />

      {/* Zeitpunkt der Einnahme */}
      <g transform="translate(160 636) rotate(-30)">
        <rect x="-24" y="-11" width="48" height="22" rx="11" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
        <line x1="0" y1="-11" x2="0" y2="11" stroke={F.linie} strokeWidth="3" />
      </g>

      <Etikett x={400} y={162} farbe={F.kupferHell}>
        zu spät, zu wenig
      </Etikett>
      <Unterzeile x={400} y={194}>
        stark und lang
      </Unterzeile>

      <Zeiger von={[300, 612]} nach={[226, 414]} />
      <Etikett x={210} y={644}>
        früh und ausreichend
      </Etikett>
      <Unterzeile x={210} y={676}>
        milder und kürzer
      </Unterzeile>
    </Zeichnung>
  );
}
