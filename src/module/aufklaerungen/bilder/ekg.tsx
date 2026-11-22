import { Etikett, F, Folge, KONTUR, Unterzeile, Wachsen, Zeichnung } from './bausteine';

// Kleiner Herzschlag für den Streifen oben, 136 px breit.
const KLEIN = 'h20 q12 -18 24 0 h10 l5 6 l8 -60 l8 66 l5 -12 h12 q16 -26 32 0 h12 ';
const STREIFEN = 'M40 130 ' + KLEIN.repeat(4) + 'H680';

// Ein Herzschlag stark vergrößert: P-Welle, QRS-Zacke, T-Welle.
const GROSS = 'M40 470 H110 Q155 400 200 470 H250 L262 492 L292 200 L322 515 L338 470 H400 Q470 360 540 470 H680';
const QRS = 'M250 470 L262 492 L292 200 L322 515 L338 470';

/** Herzstromkurve: oben mehrere Schläge, darunter ein Schlag vergrößert mit beschrifteten Wellen. */
export default function Ekg() {
  return (
    <Zeichnung titel="Herzstromkurve: oben ein Streifen mit gleichmäßigen Herzschlägen, darunter ein Herzschlag vergrößert mit P-Welle für die Vorhöfe, QRS-Zacke für das Zusammenziehen der Kammern und T-Welle für ihre Erholung">
      {/* Streifen mit mehreren Schlägen; ein Schlag ist eingerahmt */}
      {/* Erst läuft der Streifen, dann zeichnet sich der eine Schlag groß nach. */}
      <Wachsen d={STREIFEN} farbe={F.leise} breite={3} ab={0.4} dauer={1.6} />
      <rect x="172" y="56" width="144" height="96" rx="10" fill="none" stroke={F.leise} strokeWidth="2" strokeDasharray="8 8" />

      {/* Vergrößerter Schlag */}
      <path className="ekg-schlag" d={GROSS} {...KONTUR} pathLength={1} />
      <Folge ab={3.6} von={0} dauer={0.5}>
        <path d={QRS} {...KONTUR} stroke={F.kupferHell} strokeWidth="6" />
      </Folge>

      <Folge ab={2.6}>
        <Etikett x={155} y={392} anker="middle">
          P-Welle
        </Etikett>
        <Unterzeile x={155} y={534} anker="middle">
          Vorhöfe
        </Unterzeile>
      </Folge>

      <Folge ab={3.6}>
        <Etikett x={322} y={226} farbe={F.kupferHell}>
          QRS-Zacke
        </Etikett>
        <Unterzeile x={322} y={258}>
          Kammern ziehen sich zusammen
        </Unterzeile>
      </Folge>

      <Folge ab={4.8}>
        <Etikett x={470} y={384} anker="middle">
          T-Welle
        </Etikett>
        <Unterzeile x={470} y={534} anker="middle">
          Kammern erholen sich
        </Unterzeile>
      </Folge>
    </Zeichnung>
  );
}
