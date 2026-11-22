import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 100;
const RECHTS = 660;
const OBEN = 150;
const UNTEN = 500;

const x = (jahr: number) => LINKS + (jahr / 10) * (RECHTS - LINKS);
/** TSH-Achse von 0 bis 7. */
const y = (tsh: number) => UNTEN - (tsh / 7) * (UNTEN - OBEN);

const WERTE = [1.8, 2.0, 2.3, 2.6, 3.0, 3.4, 3.8, 5.0, 2.6, 2.1, 2.0];

/** TSH über die Jahre: jährlich kontrollieren, erst bei Unterfunktion eine Tablette. */
export default function HashimotoVerlauf() {
  const linie = WERTE.map((w, j) => `${j ? 'L' : 'M'}${x(j)} ${y(w)}`).join(' ');
  return (
    <Zeichnung titel="Verlauf des Blutwerts TSH über zehn Jahre bei Hashimoto: Jährliche Kontrollen, das TSH steigt langsam. Erst als es über den Normalbereich steigt, beginnt die Tablette, danach liegt es wieder im Normalbereich">
      <Etikett x={40} y={66}>
        Blutwert TSH
      </Etikett>
      <Unterzeile x={40} y={96}>
        Steigt das TSH, fehlt Hormon
      </Unterzeile>

      {/* Normalbereich */}
      <rect x={LINKS} y={y(4)} width={RECHTS - LINKS} height={y(0.4) - y(4)} fill={F.petrolHell} opacity="0.25" />
      <path d={`M${LINKS} ${y(4)} L${RECHTS} ${y(4)}`} stroke={F.linie} strokeWidth="3" strokeDasharray="10 8" />
      <Unterzeile x={LINKS + 16} y={y(0.4) - 16} farbe={F.linie}>
        normal
      </Unterzeile>

      <path d={`M${LINKS} ${OBEN - 10} L${LINKS} ${UNTEN} L${RECHTS} ${UNTEN}`} {...KONTUR} stroke={F.leise} strokeWidth={3} />
      <Unterzeile x={RECHTS} y={UNTEN + 34} anker="end">
        Jahre
      </Unterzeile>

      <path d={linie} {...KONTUR} strokeWidth={5} />
      {WERTE.map((w, j) => (
        <circle key={j} cx={x(j)} cy={y(w)} r="9" fill={j === 7 ? F.kupfer : F.linie} />
      ))}

      {/* Beginn der Tablette */}
      <path d={`M${x(7)} ${y(5) - 18} L${x(7)} ${OBEN - 6}`} stroke={F.kupferHell} strokeWidth="3" />
      <Etikett x={x(7) - 12} y={OBEN + 8} anker="end" farbe={F.kupferHell}>
        ab hier Tablette
      </Etikett>

      <Etikett x={40} y={612}>
        Einmal im Jahr kontrollieren
      </Etikett>
      <Unterzeile x={40} y={644}>
        Solange das TSH normal ist, keine Tablette
      </Unterzeile>
    </Zeichnung>
  );
}
