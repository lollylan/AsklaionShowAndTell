import { Etikett, F, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Querschnitt einer Schlagader. lumen = freie Öffnung [cx, cy, r]; ohne Ablagerung ist sie so weit wie die Wand. */
function Ader({ cx, lumen }: { cx: number; lumen?: [number, number, number] }) {
  return (
    <g>
      <circle cx={cx} cy="280" r="102" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <circle
        cx={cx}
        cy="280"
        r="78"
        fill={lumen ? F.kupfer : F.tief}
        stroke={F.linie}
        strokeWidth="4"
      />
      {lumen && (
        <circle cx={lumen[0]} cy={lumen[1]} r={lumen[2]} fill={F.tief} stroke={F.linie} strokeWidth="4" />
      )}
    </g>
  );
}

/** Drei Querschnitte einer Schlagader: gesund, mit Ablagerungen, stark verengt. */
export default function Cholesterin() {
  return (
    <Zeichnung titel="Drei Querschnitte einer Schlagader: gesund und weit offen, mit Ablagerungen in der Wand, und stark verengt mit nur noch kleiner Öffnung">
      <Ader cx={132} />
      <Ader cx={360} lumen={[360, 294, 58]} />
      <Ader cx={588} lumen={[588, 292, 26]} />

      {/* Hinweis oben, Überschriften unter den Figuren */}
      <Etikett x={474} y={90} anker="middle">
        Fett und Kalk in der Wand
      </Etikett>
      <Zeiger von={[400, 106]} nach={[364, 219]} />
      <Zeiger von={[548, 106]} nach={[584, 232]} />

      <Etikett x={132} y={426} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={132} y={458} anker="middle">
        Blut fließt frei
      </Unterzeile>
      <Etikett x={360} y={426} anker="middle" farbe={F.kupferHell}>
        Ablagerungen
      </Etikett>
      <Unterzeile x={360} y={458} anker="middle">
        Die Ader wird enger
      </Unterzeile>
      <Etikett x={588} y={426} anker="middle" farbe={F.kupferHell}>
        Stark verengt
      </Etikett>
      <Unterzeile x={588} y={458} anker="middle">
        Kaum noch Platz
      </Unterzeile>

      <Pfeil d="M70 506 L650 506" farbe={F.leise} breite={4} />
      <Unterzeile x={360} y={542} anker="middle">
        über viele Jahre
      </Unterzeile>

      <Etikett x={360} y={626} anker="middle" farbe={F.kupferHell}>
        Folge: Herzinfarkt oder Schlaganfall
      </Etikett>
    </Zeichnung>
  );
}
