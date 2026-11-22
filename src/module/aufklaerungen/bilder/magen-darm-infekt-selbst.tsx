import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Linker Rand der Zeitachse und Breite eines Tages. */
const X0 = 250;
const TAG = 60;

/** Balken von Tag `von` bis Tag `bis` (einschließlich). */
function Balken({ y, von, bis, farbe }: { y: number; von: number; bis: number; farbe: string }) {
  return <rect x={X0 + (von - 1) * TAG + 4} y={y - 20} width={(bis - von + 1) * TAG - 8} height="40" rx="20" fill={farbe} />;
}

/** Typischer Verlauf: Erbrechen kurz, Durchfall etwas länger, ansteckend bis zwei Tage danach. */
export default function MagenDarmInfektSelbst() {
  return (
    <Zeichnung titel="Zeitleiste über sieben Tage: Erbrechen meist ein bis zwei Tage, Durchfall drei bis fünf Tage. Zu Hause bleiben bis zwei Tage nach dem letzten Durchfall, so lange ist man ansteckend">
      {/* Tagesraster */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((t) => (
        <line
          key={t}
          x1={X0 + (t - 1) * TAG}
          y1="130"
          x2={X0 + (t - 1) * TAG}
          y2="500"
          stroke={F.leise}
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />
      ))}

      <Etikett x={40} y={175}>
        Erbrechen
      </Etikett>
      <Balken y={166} von={1} bis={2} farbe={F.kupfer} />

      <Etikett x={40} y={275}>
        Durchfall
      </Etikett>
      <Balken y={266} von={1} bis={5} farbe={F.kupfer} />

      <Etikett x={40} y={400}>
        Zu Hause
      </Etikett>
      <Etikett x={40} y={432}>
        bleiben
      </Etikett>
      <Balken y={404} von={1} bis={7} farbe={F.petrolHell} />
      {/* Die zwei Tage nach dem letzten Durchfall */}
      <rect
        x={X0 + 5 * TAG + 4}
        y="384"
        width={2 * TAG - 8}
        height="40"
        rx="20"
        fill="none"
        stroke={F.linie}
        strokeWidth="3"
        strokeDasharray="6 6"
      />
      <Unterzeile x={X0 + 6 * TAG} y={466} anker="middle" farbe={F.linie}>
        + 2 Tage
      </Unterzeile>

      {/* Achse */}
      <line x1={X0} y1="520" x2={X0 + 7 * TAG} y2="520" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
      {[1, 2, 3, 4, 5, 6, 7].map((t) => (
        <Unterzeile key={t} x={X0 + (t - 0.5) * TAG} y={556} anker="middle">
          {t}
        </Unterzeile>
      ))}
      <Unterzeile x={X0 + 3.5 * TAG} y={590} anker="middle">
        Tage seit Beginn
      </Unterzeile>

      <Etikett x={360} y={656} anker="middle">
        Ansteckend bis zwei Tage danach
      </Etikett>
    </Zeichnung>
  );
}
