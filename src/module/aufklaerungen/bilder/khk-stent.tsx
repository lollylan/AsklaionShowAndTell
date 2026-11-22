import { Etikett, F, Fluss, Folge, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Gefäß im Längsschnitt mit Ablagerung oben und unten; tiefe = wie weit sie ins Gefäß ragt. */
function Gefaess({ oben, tiefe }: { oben: number; tiefe: number }) {
  const unten = oben + 100;
  return (
    <g>
      <rect x="40" y={oben} width="640" height="100" fill={F.petrolDunkel} />
      <path d={`M250 ${oben} Q360 ${oben + tiefe * 2} 470 ${oben} Z`} fill={F.kupfer} />
      <path d={`M250 ${unten} Q360 ${unten - tiefe * 2} 470 ${unten} Z`} fill={F.kupfer} />
      <path d={`M40 ${oben} L680 ${oben} M40 ${unten} L680 ${unten}`} {...KONTUR} />
    </g>
  );
}

/** Zickzack-Gitter des Stents entlang einer Linie. */
function Gitter({ y, richtung }: { y: number; richtung: 1 | -1 }) {
  let d = `M270 ${y}`;
  for (let x = 270; x < 450; x += 18) d += ` L${x + 9} ${y + 12 * richtung} L${x + 18} ${y}`;
  return <path d={d} fill="none" stroke={F.linie} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />;
}

/** Aufdehnen einer Engstelle mit Ballon und Stent in drei Schritten. */
export default function KhkStent() {
  return (
    <Zeichnung titel="Drei Schritte im Längsschnitt eines Herzkranzgefäßes: Ein Katheter mit Ballon wird in die Engstelle geschoben, der Ballon weitet sie und entfaltet dabei ein feines Gitter, den Stent. Der Stent bleibt im Gefäß, das Blut fließt wieder">
      {/* In Bewegung kommen die drei Schritte nacheinander (bewegung.css). */}
      {/* 1: Katheter mit leerem Ballon in der Engstelle */}
      <Folge ab={0.6}>
        <Etikett x={40} y={40}>
          Katheter mit Ballon
        </Etikett>
        <Unterzeile x={40} y={70}>
          wird bis in die Engstelle geschoben
        </Unterzeile>
        <Gefaess oben={90} tiefe={34} />
        <g className="khk-stent-katheter-form">
          <path d="M40 140 L300 140" stroke={F.leise} strokeWidth="5" strokeLinecap="round" />
        </g>
        <g className="khk-stent-spitze">
          <rect x="296" y="132" width="128" height="16" rx="8" fill={F.leise} />
        </g>
      </Folge>

      {/* 2: Ballon aufgedehnt, Stent entfaltet sich */}
      <Folge ab={3}>
        <Etikett x={40} y={250}>
          Ballon weitet die Engstelle
        </Etikett>
        <Unterzeile x={40} y={280}>
          dabei entfaltet sich der Stent
        </Unterzeile>
        <Gefaess oben={300} tiefe={12} />
        <path d="M40 350 L270 350" stroke={F.leise} strokeWidth="5" strokeLinecap="round" />
        <g className="khk-stent-ballon-form">
          <rect x="270" y="316" width="180" height="68" rx="30" fill={F.petrolHell} />
        </g>
        <g className="khk-stent-gitter-oben">
          <Gitter y={316} richtung={1} />
        </g>
        <g className="khk-stent-gitter-unten">
          <Gitter y={384} richtung={-1} />
        </g>
      </Folge>

      {/* 3: Stent bleibt, Blut fließt */}
      <Folge ab={5.4}>
        <Etikett x={40} y={460}>
          Der Stent bleibt
        </Etikett>
        <Unterzeile x={40} y={490}>
          und hält das Gefäß offen
        </Unterzeile>
        <Gefaess oben={510} tiefe={6} />
        <Gitter y={522} richtung={-1} />
        <Gitter y={598} richtung={1} />
        <Pfeil d="M70 560 L190 560" />
        <Pfeil d="M300 560 L420 560" />
        <Pfeil d="M530 560 L650 560" />
        <Fluss d="M50 540 L670 540" farbe={F.petrolHell} ab={5.6} dauer={1.1} />
        <Fluss d="M50 580 L670 580" farbe={F.petrolHell} ab={6.1} dauer={1.1} />
      </Folge>

      <Unterzeile x={360} y={672} anker="middle">
        Zugang über das Handgelenk oder die Leiste
      </Unterzeile>
    </Zeichnung>
  );
}
