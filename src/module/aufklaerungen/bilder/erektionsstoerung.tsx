import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Querschnitt einer Arterie: Wand, gleich dicke Ablagerung innen, Rest = freie Blutbahn. */
function Arterie({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const wand = 12;
  const ablagerung = 34;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <circle cx={cx} cy={cy} r={r - wand} fill={F.kupfer} />
      <circle cx={cx} cy={cy} r={r - wand - ablagerung} fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
    </g>
  );
}

/** Feine Arterie im Glied und größere Herzkranzarterie mit gleich dicker Ablagerung. */
export default function Erektionsstoerung() {
  return (
    <Zeichnung titel="Querschnitt durch zwei Arterien mit gleich dicker Ablagerung: Die feine Arterie im Glied ist schon fast verschlossen, die größere Arterie am Herzen ist noch weit offen. Deshalb kann eine Erektionsstörung ein frühes Warnzeichen für Herzkrankheiten sein">
      <Etikett x={360} y={80} anker="middle">
        Gleiche Ablagerung in den Gefäßen
      </Etikett>
      <Unterzeile x={360} y={114} anker="middle">
        feine Arterien werden zuerst eng
      </Unterzeile>

      <Arterie cx={180} cy={350} r={64} />
      <Arterie cx={500} cy={350} r={150} />

      <Etikett x={180} y={560} anker="middle" farbe={F.kupferHell}>
        Im Glied
      </Etikett>
      <Unterzeile x={180} y={594} anker="middle" farbe={F.linie}>
        wird früh eng
      </Unterzeile>

      <Etikett x={500} y={560} anker="middle">
        Am Herzen
      </Etikett>
      <Unterzeile x={500} y={594} anker="middle" farbe={F.linie}>
        wird oft Jahre später eng
      </Unterzeile>
    </Zeichnung>
  );
}
