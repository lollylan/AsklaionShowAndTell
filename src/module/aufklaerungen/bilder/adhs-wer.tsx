import { Etikett, F, Folge, Unterzeile, Zeichnung } from './bausteine';

type Wert = 'ja' | 'nein' | 'leer' | 'nur';

/** Spaltenmitten: Hausarzt, Psychotherapeut, Psychiater oder Neurologe (je 168 breit ab x = 200). */
const SPALTEN = [284, 452, 620];
const LINKS = 24;
const RECHTS = 704;

/** Zeilen: Oberkante, Höhe, Beschriftung und Werte je Spalte. */
const ZEILEN: { y: number; h: number; werte: [Wert, Wert, Wert] }[] = [
  { y: 196, h: 120, werte: ['nein', 'ja', 'ja'] },
  { y: 316, h: 120, werte: ['leer', 'ja', 'ja'] },
  { y: 436, h: 160, werte: ['nein', 'nein', 'nur'] },
];

function Zeichen({ x, y, wert }: { x: number; y: number; wert: Wert }) {
  if (wert === 'ja' || wert === 'nur') {
    return (
      <path
        d={`M${x - 24} ${y} L${x - 8} ${y + 17} L${x + 26} ${y - 20}`}
        fill="none"
        stroke={wert === 'nur' ? F.kupferHell : F.petrolHell}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }
  if (wert === 'nein') {
    return (
      <path
        d={`M${x - 13} ${y - 13} L${x + 13} ${y + 13} M${x + 13} ${y - 13} L${x - 13} ${y + 13}`}
        fill="none"
        stroke={F.leise}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
    );
  }
  return <line x1={x - 14} y1={y} x2={x + 14} y2={y} stroke={F.leise} strokeWidth="4" strokeLinecap="round" opacity="0.7" />;
}

/** Übersicht: wer stellt die Diagnose, wer behandelt mit Gesprächen, wer verordnet ADHS-Medikamente. */
export default function AdhsWer() {
  return (
    <Zeichnung titel="Tabelle wer macht was bei ADHS: Die Diagnose stellen Psychotherapeut und Psychiater, nicht die Hausarztpraxis; Gespräche und Therapie bieten Psychotherapeut und Psychiater; Ritalin und Elvanse verordnet nur der Psychiater oder Neurologe, hervorgehoben">
      <Etikett x={360} y={58} anker="middle">
        Wer macht was?
      </Etikett>

      {/* Hervorhebung der Spalte Psychiater oder Neurologe in der Zeile Verordnen */}
      <rect x={540} y={448} width={160} height={136} rx="14" fill={F.kupfer} fillOpacity="0.22" stroke={F.kupfer} strokeWidth="4" />

      {/* Spaltenköpfe */}
      <Etikett x={SPALTEN[0]} y={156} anker="middle">
        Hausarzt
      </Etikett>
      <Etikett x={SPALTEN[1]} y={140} anker="middle">
        Psycho-
      </Etikett>
      <Etikett x={SPALTEN[1]} y={170} anker="middle">
        therapeut
      </Etikett>
      <Etikett x={SPALTEN[2]} y={140} anker="middle">
        Psychiater
      </Etikett>
      <Unterzeile x={SPALTEN[2]} y={170} anker="middle">
        oder Neurologe
      </Unterzeile>

      {/* Trennlinien */}
      <line x1={LINKS} y1={196} x2={RECHTS} y2={196} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      {ZEILEN.slice(1).map((z) => (
        <line key={z.y} x1={LINKS} y1={z.y} x2={RECHTS} y2={z.y} stroke={F.leise} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      ))}
      <line x1={LINKS} y1={596} x2={RECHTS} y2={596} stroke={F.leise} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* Zeilenbeschriftungen */}
      <Etikett x={LINKS} y={265}>
        Diagnose
      </Etikett>
      <Etikett x={LINKS} y={370}>
        Gespräche,
      </Etikett>
      <Etikett x={LINKS} y={402}>
        Therapie
      </Etikett>
      <Etikett x={LINKS} y={498}>
        Ritalin,
      </Etikett>
      <Etikett x={LINKS} y={530}>
        Elvanse
      </Etikett>
      <Unterzeile x={LINKS} y={562}>
        verordnen
      </Unterzeile>

      {/* Werte, Zeile für Zeile */}
      {ZEILEN.map((z, i) => (
        <Folge key={z.y} ab={0.6 + i * 0.8}>
          {z.werte.map((w, s) => (
            <Zeichen key={s} x={SPALTEN[s]} y={z.y + z.h / 2} wert={w} />
          ))}
        </Folge>
      ))}

      <Unterzeile x={360} y={652} anker="middle" farbe={F.kupferHell}>
        ADHS-Medikamente nur vom Facharzt
      </Unterzeile>
    </Zeichnung>
  );
}
