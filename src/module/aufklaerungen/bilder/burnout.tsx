import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Oberkanten der vier Ladebalken, von unten nach oben. */
const BALKEN = [425, 356, 287, 218];

function Akku({ cx, voll }: { cx: number; voll: boolean }) {
  return (
    <g transform={`translate(${cx - 180} 0)`}>
      <rect x="155" y="178" width="50" height="24" rx="6" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <rect x="110" y="200" width="140" height="300" rx="18" {...KONTUR} fill={F.tief} />
      {BALKEN.map((y, i) =>
        voll || i === 0 ? (
          <rect key={y} x="128" y={y} width="104" height="57" rx="8" fill={voll ? F.petrolHell : F.kupfer} />
        ) : (
          <rect
            key={y}
            x="128"
            y={y}
            width="104"
            height="57"
            rx="8"
            fill="none"
            stroke={F.leise}
            strokeWidth="2"
            strokeDasharray="6 8"
          />
        ),
      )}
    </g>
  );
}

/** Zwei Akkus: erholt und voll, nach langer Überlastung fast leer. */
export default function Burnout() {
  return (
    <Zeichnung titel="Zwei Akkus: links voll geladen, rechts nach langer Dauerbelastung fast leer. Nur Erholung lädt den Akku wieder auf">
      <Akku cx={180} voll />
      <Akku cx={540} voll={false} />

      <Etikett x={180} y={140} anker="middle">
        Akku voll
      </Etikett>
      <Etikett x={540} y={140} anker="middle" farbe={F.kupferHell}>
        Akku leer
      </Etikett>

      <Pfeil d="M278 310 L440 310" farbe={F.kupferHell} />
      <Unterzeile x={360} y={290} anker="middle">
        Dauerstress
      </Unterzeile>
      <Pfeil d="M442 400 L280 400" farbe={F.petrolHell} />
      <Unterzeile x={360} y={440} anker="middle">
        Erholung
      </Unterzeile>

      <Etikett x={360} y={590} anker="middle">
        Erschöpfung entsteht schleichend
      </Etikett>
      <Unterzeile x={360} y={626} anker="middle">
        nur Erholung lädt den Akku wieder auf
      </Unterzeile>
    </Zeichnung>
  );
}
