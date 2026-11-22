import { Etikett, F, Folge, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 80;
const RECHTS = 660;
const BODEN = 440;
/** x-Position einer Minute (0 bis 10). */
const x = (min: number) => LINKS + (min / 10) * (RECHTS - LINKS);

const WELLE = `M${x(0)} ${BODEN} C${x(1)} ${BODEN} ${x(1.6)} 190 ${x(2.6)} 190 C${x(3.8)} 190 ${x(5)} ${BODEN - 10} ${x(8)} ${BODEN}`;

/** Das Verlangen steigt an wie eine Welle und ebbt nach wenigen Minuten ab. */
export default function RauchstoppVerlangen() {
  return (
    <Zeichnung titel="Eine Welle über zehn Minuten: Das Verlangen nach einer Zigarette steigt rasch an und ist nach wenigen Minuten wieder abgeklungen. Darunter drei Dinge, mit denen man die Welle überbrückt: ein Glas Wasser, ein paar Schritte, ein Kaugummi">
      <Etikett x={360} y={64} anker="middle">
        Das Verlangen ist eine Welle
      </Etikett>
      <Unterzeile x={360} y={98} anker="middle">
        Sie kommt, wird stark – und geht wieder
      </Unterzeile>

      {/* In Bewegung läuft die Welle in 7 s über die zehn Minuten (bewegung.css). */}
      <g className="rauchstopp-verlangen-welle">
        <path d={`${WELLE} Z`} fill={F.kupfer} fillOpacity="0.45" />
        <path d={WELLE} fill="none" stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round" />
      </g>

      <path d={`M${LINKS} ${BODEN} L${RECHTS} ${BODEN}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {[0, 5, 10].map((m) => (
        <Unterzeile key={m} x={x(m)} y={BODEN + 32} anker={m === 0 ? 'start' : m === 10 ? 'end' : 'middle'}>
          {m === 0 ? 'jetzt' : `${m} Minuten`}
        </Unterzeile>
      ))}

      <Folge ab={0.8 + 7 * (2.4 / 8)} von={0}>
        <Etikett x={x(2.6)} y={170} anker="middle" farbe={F.kupferHell}>
          Verlangen
        </Etikett>
      </Folge>
      <Folge ab={0.8 + 7} von={0} dauer={1.2}>
        <Etikett x={x(8.4)} y={380} anker="middle">
          vorbei
        </Etikett>
      </Folge>

      <Etikett x={360} y={560} anker="middle">
        So überbrücken Sie die Welle:
      </Etikett>
      <Unterzeile x={360} y={600} anker="middle" farbe={F.linie}>
        ein Glas Wasser · ein paar Schritte · ein Kaugummi
      </Unterzeile>
      <Unterzeile x={360} y={660} anker="middle">
        Die Welle vergeht auch ohne Zigarette
      </Unterzeile>
    </Zeichnung>
  );
}
