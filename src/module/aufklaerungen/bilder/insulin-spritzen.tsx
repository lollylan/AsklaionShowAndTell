import { Etikett, F, Folge, Pfeil, Unterzeile, Zeichnung } from './bausteine';
import { Tropfen } from './inkontinenz-tropfen';
import { NADEL_LAENGE, Pen } from './insulin-pen';

/** Nummer im Kreis wie bei den anderen Schritt-Zeichnungen. */
function Nummer({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="28" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <text x={x} y={y + 10} textAnchor="middle" fontSize="28" fontWeight="700" fill={F.linie}>
        {n}
      </text>
    </g>
  );
}

/** Uhr mit kupfernem Ausschnitt für 10 Sekunden. */
function Uhr({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const w = (60 * Math.PI) / 180;
  const ex = cx + r * 0.86 * Math.sin(w);
  const ey = cy - r * 0.86 * Math.cos(w);
  const h = (r * 0.86) / 2;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      {/* Tortenstück als breiter Bogen: in Bewegung laufen echte 10 Sekunden ab. */}
      <path
        className="insulin-spritzen-sekunden"
        d={`M${cx} ${cy - h} A${h} ${h} 0 0 1 ${cx + h * Math.sin(w)} ${cy - h * Math.cos(w)}`}
        pathLength={1}
        fill="none"
        stroke={F.kupfer}
        strokeWidth={r * 0.86}
      />
      <g stroke={F.leise} strokeWidth="3" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => {
          const b = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={cx + r * 0.78 * Math.sin(b)}
              y1={cy - r * 0.78 * Math.cos(b)}
              x2={cx + r * 0.9 * Math.sin(b)}
              y2={cy - r * 0.9 * Math.cos(b)}
            />
          );
        })}
      </g>
      <line className="insulin-spritzen-zeiger" x1={cx} y1={cy} x2={ex} y2={ey} stroke={F.linie} strokeWidth="5" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx} y2={cy - r * 0.86} stroke={F.linie} strokeWidth="5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="7" fill={F.linie} />
      {/* Knopf oben wie bei einer Stoppuhr */}
      <rect x={cx - 12} y={cy - r - 20} width="24" height="16" rx="4" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
    </g>
  );
}

const S = 0.4;
const S3 = 0.36;
/** Hautoberfläche in Feld 3. */
const HAUT = 584;

export default function InsulinSpritzen() {
  return (
    <Zeichnung titel="Insulin spritzen in vier Schritten: zwei Einheiten testen mit der Nadel nach oben, bis ein Tropfen kommt, dann die Dosis einstellen, senkrecht einstechen und den Knopf ganz drücken, zehn Sekunden warten">
      <line x1="360" y1="40" x2="360" y2="680" stroke={F.leise} strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />
      <line x1="40" y1="360" x2="680" y2="360" stroke={F.leise} strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />

      {/* 1: Nadel nach oben, 2 Einheiten, Tropfen an der Spitze */}
      <Folge ab={0.3}>
      <Nummer x={44} y={48} n={1} />
      <g transform={`translate(180 66) rotate(90) scale(${S})`}>
        <Pen dosis="2" textDrehung={-90} />
      </g>
      <g className="insulin-spritzen-tropfen-form">
        <Tropfen x={180} y={50} r={8} />
      </g>
      <Etikett x={180} y={300} anker="middle">
        2 Einheiten testen
      </Etikett>
      <Unterzeile x={180} y={330} anker="middle">
        bis ein Tropfen kommt
      </Unterzeile>
      </Folge>

      {/* 2: Dosis am Drehknopf einstellen, Fenster vergrößert */}
      <Folge ab={2}>
      <Nummer x={404} y={48} n={2} />
      <g transform={`translate(386 214) scale(0.6)`}>
        <Pen dosis="12" />
      </g>
      <line x1={386 + 0.6 * 361} y1={214 - 0.6 * 22} x2={575} y2={152} stroke={F.leise} strokeWidth="2" />
      <circle cx={560} cy={102} r={54} fill={F.creme} stroke={F.leise} strokeWidth="4" />
      <text x={560} y={120} textAnchor="middle" fontSize="50" fontWeight="700" fill={F.tief}>
        12
      </text>
      <g className="insulin-spritzen-drehen-form">
        <Pfeil d="M640 176 Q666 150 690 176" farbe={F.kupferHell} breite={5} />
      </g>
      <Etikett x={540} y={300} anker="middle">
        Dosis einstellen
      </Etikett>
      </Folge>

      {/* 3: senkrecht durch die Haut, Knopf ganz drücken */}
      <Folge ab={3.6}>
      <Nummer x={44} y={408} n={3} />
      <rect x="40" y={HAUT} width="280" height="22" fill={F.kupferHell} />
      <rect x="40" y={HAUT + 22} width="280" height="26" fill={F.petrolDunkel} />
      <line x1="40" y1={HAUT} x2="320" y2={HAUT} stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      <g className="insulin-spritzen-stechen">
        <g transform={`translate(180 ${HAUT + NADEL_LAENGE * S3}) rotate(-90) scale(${S3})`}>
          <Pen dosis="12" textDrehung={90} />
        </g>
        <Pfeil d="M180 370 L180 398" farbe={F.linie} breite={6} />
      </g>
      <path d={`M212 ${HAUT} L212 ${HAUT - 22} L234 ${HAUT - 22}`} fill="none" stroke={F.leise} strokeWidth="3" />
      <Etikett x={180} y={662} anker="middle">
        Senkrecht einstechen
      </Etikett>
      <Unterzeile x={180} y={692} anker="middle">
        Knopf ganz drücken
      </Unterzeile>
      </Folge>

      {/* 4: 10 Sekunden warten */}
      <Folge ab={5.4}>
      <Nummer x={404} y={408} n={4} />
      <Uhr cx={540} cy={512} r={84} />
      <Etikett x={540} y={662} anker="middle">
        10 Sekunden warten
      </Etikett>
      <Unterzeile x={540} y={692} anker="middle">
        dann herausziehen
      </Unterzeile>
      </Folge>
    </Zeichnung>
  );
}
