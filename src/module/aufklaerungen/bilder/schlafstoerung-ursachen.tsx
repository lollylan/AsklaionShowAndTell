import { Etikett, F, Folge, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** In Bewegung: Beginn des Schritts i in Sekunden (Station, Pfeil, Station … und zuletzt der Merksatz). */
const TAKT = 0.75;
const ab = (i: number) => 0.7 + i * TAKT;

/** Teufelskreis der Schlaflosigkeit: wach liegen, grübeln, anspannen – und dadurch erst recht wach sein. */
export default function SchlafstoerungUrsachen() {
  return (
    <Zeichnung titel="Kreislauf aus drei Stationen: Man liegt wach im Bett, grübelt, dass man doch schlafen muss, wird dadurch angespannt – und liegt noch länger wach">
      {/* In Bewegung läuft der Kreislauf reihum, der Merksatz kommt zuletzt. */}
      {/* wach liegen: Bett mit offenem Auge */}
      <Folge ab={ab(0)}>
        <g transform="translate(360 190)">
          <circle cx="0" cy="0" r="58" {...KONTUR} fill={F.petrolDunkel} />
          <path d="M-30 0 C-14 -20 14 -20 30 0 C14 20 -14 20 -30 0 Z" {...KONTUR} strokeWidth="3" />
          <circle cx="0" cy="0" r="8" fill={F.linie} />
        </g>
        <Etikett x={360} y={104} anker="middle">
          wach im Bett
        </Etikett>
      </Folge>

      <Folge ab={ab(1)}>
        <Pfeil d="M422 210 C490 240 540 300 556 354" farbe={F.leise} breite={5} />
      </Folge>
      {/* Grübeln: Gedankenblase */}
      <Folge ab={ab(2)}>
        <g transform="translate(560 420)">
          <circle cx="0" cy="0" r="58" {...KONTUR} fill={F.petrolDunkel} />
          <ellipse cx="4" cy="-6" rx="30" ry="20" fill="none" stroke={F.linie} strokeWidth="3" />
          <circle cx="-22" cy="22" r="6" fill="none" stroke={F.linie} strokeWidth="3" />
          <circle cx="-30" cy="34" r="3" fill={F.linie} />
        </g>
        <Etikett x={560} y={512} anker="middle">
          Grübeln:
        </Etikett>
        <Unterzeile x={560} y={544} anker="middle">
          „Ich muss schlafen!“
        </Unterzeile>
      </Folge>

      <Folge ab={ab(3)}>
        <Pfeil d="M496 446 C440 472 280 472 226 446" farbe={F.leise} breite={5} />
      </Folge>
      {/* Anspannung: Zickzack */}
      <Folge ab={ab(4)}>
        <g transform="translate(160 420)">
          <circle cx="0" cy="0" r="58" {...KONTUR} fill={F.kupfer} />
          <path d="M-30 6 L-18 -12 L-6 10 L6 -14 L18 10 L30 -8" {...KONTUR} strokeWidth="4" />
        </g>
        <Etikett x={160} y={512} anker="middle" farbe={F.kupferHell}>
          Anspannung
        </Etikett>
        <Unterzeile x={160} y={544} anker="middle">
          Herz klopft
        </Unterzeile>
      </Folge>

      <Folge ab={ab(5)}>
        <Pfeil d="M164 354 C180 300 230 240 298 210" farbe={F.leise} breite={5} />
      </Folge>

      <Folge ab={ab(6) + 0.3} von={0} dauer={1.2}>
        <Unterzeile x={360} y={630} anker="middle" farbe={F.linie}>
          Je mehr man schlafen will, desto wacher wird man
        </Unterzeile>
      </Folge>
    </Zeichnung>
  );
}
