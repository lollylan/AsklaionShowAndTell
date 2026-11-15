import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

// Herzform um den Nullpunkt, etwa 226 breit und 220 hoch.
const HERZ =
  'M0 -55 C-18 -105 -92 -108 -110 -55 C-130 5 -70 60 0 125 C70 60 130 5 110 -55 C92 -108 18 -105 0 -55 Z';

/** Zwei Herzen im Vergleich: kräftiger Muskel mit starkem Auswurf, ausgeleiertes Herz mit schwachem Auswurf. */
export default function Herzschwaeche() {
  return (
    <Zeichnung titel="Zwei Herzen im Vergleich: das gesunde Herz mit dickem Muskel pumpt kräftig, das schwache Herz ist vergrößert, dünnwandig und pumpt nur wenig Blut weiter">
      {/* Gesundes Herz: dicker Muskel, kleine Kammer, kräftiger Pfeil */}
      <g transform="translate(185 390)" strokeLinejoin="round">
        <path d={HERZ} fill={F.petrol} stroke={F.linie} strokeWidth="4" />
        <path d={HERZ} transform="translate(0 8) scale(0.5)" fill={F.tief} stroke={F.linie} strokeWidth="8" />
      </g>
      <Pfeil d="M185 322 L185 165" breite={12} />

      {/* Schwaches Herz: vergrößert, dünne Wand, dünner Pfeil */}
      <g transform="translate(535 380) scale(1.3)" strokeLinejoin="round">
        <path d={HERZ} fill={F.kupfer} stroke={F.linie} strokeWidth="3.1" />
        <path d={HERZ} transform="translate(0 6) scale(0.86)" fill={F.tief} stroke={F.linie} strokeWidth="3.6" />
      </g>
      <Pfeil d="M535 296 L535 206" farbe={F.kupferHell} breite={4} />

      <Etikett x={185} y={62} anker="middle">
        Gesundes Herz
      </Etikett>
      <Unterzeile x={185} y={94} anker="middle">
        Pumpt kräftig
      </Unterzeile>
      <Etikett x={535} y={62} anker="middle" farbe={F.kupferHell}>
        Schwaches Herz
      </Etikett>
      <Unterzeile x={535} y={94} anker="middle">
        Ausgeleiert, pumpt zu wenig
      </Unterzeile>

      <Etikett x={360} y={616} anker="middle">
        Das Blut staut sich zurück
      </Etikett>
      <Unterzeile x={360} y={650} anker="middle">
        Wasser sammelt sich in Lunge und Beinen
      </Unterzeile>
      <Unterzeile x={360} y={680} anker="middle">
        Folge: Luftnot und dicke Beine
      </Unterzeile>
    </Zeichnung>
  );
}
