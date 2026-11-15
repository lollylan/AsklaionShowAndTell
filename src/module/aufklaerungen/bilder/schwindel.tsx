import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Schlichte Figur von vorn, Mittelpunkt zwischen Kopf und Schultern. */
function Figur({ kopf = F.petrol, augen = true }: { kopf?: string; augen?: boolean }) {
  return (
    <>
      <rect x="-16" y="4" width="32" height="24" fill={F.petrolDunkel} />
      <path d="M-78 84 C-74 40 -40 22 0 22 C40 22 74 40 78 84 Z" {...KONTUR} fill={F.petrolDunkel} />
      <circle cx="0" cy="-30" r="44" {...KONTUR} fill={kopf} />
      {augen && (
        <g fill={F.linie}>
          <circle cx="-15" cy="-34" r="4.5" />
          <circle cx="15" cy="-34" r="4.5" />
        </g>
      )}
    </>
  );
}

/** Drei Figuren für die drei Arten, wie sich Schwindel anfühlen kann. */
export default function Schwindel() {
  return (
    <Zeichnung titel="Drei Figuren für drei Arten von Schwindel: Drehschwindel wie im Karussell, Schwanken wie auf einem Schiff und Schwarzwerden vor Augen">
      <Etikett x={360} y={96} anker="middle">
        Wie fühlt sich der Schwindel an?
      </Etikett>
      <Unterzeile x={360} y={130} anker="middle">
        Die Art weist auf die Ursache
      </Unterzeile>

      {/* Drehschwindel: Kreisbahn um den Kopf */}
      <g transform="translate(128 330)">
        <path
          d="M-92 -30 A92 28 0 0 1 92 -30"
          fill="none"
          stroke={F.leise}
          strokeWidth="3"
          strokeDasharray="8 10"
          strokeLinecap="round"
        />
        <Figur />
        <Pfeil d="M92 -30 A92 28 0 0 1 -90 -25" farbe={F.kupferHell} />
      </g>

      {/* Schwankschwindel: Figur neigt sich auf welligem Boden */}
      <g transform="translate(360 330)">
        <g transform="rotate(-8 0 84)">
          <Figur />
        </g>
        <path
          d="M-56 -100 Q0 -126 56 -100"
          fill="none"
          stroke={F.kupferHell}
          strokeWidth="5"
          strokeLinecap="round"
          markerStart="url(#pfeilspitze)"
          markerEnd="url(#pfeilspitze)"
        />
        <path
          d="M-96 106 q24 -16 48 0 t48 0 t48 0 t48 0"
          fill="none"
          stroke={F.kupferHell}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>

      {/* Schwarz vor Augen: dunkler Kopf mit Flimmern, Kreislauf sackt ab */}
      <g transform="translate(584 330)">
        <Figur kopf={F.tief} augen={false} />
        <g fill={F.kupferHell}>
          <circle cx="-22" cy="-46" r="4" />
          <circle cx="4" cy="-56" r="4" />
          <circle cx="24" cy="-40" r="4" />
          <circle cx="-8" cy="-28" r="4" />
          <circle cx="16" cy="-16" r="4" />
          <circle cx="-26" cy="-14" r="4" />
        </g>
        <Pfeil d="M72 -64 L72 36" farbe={F.kupferHell} />
      </g>

      <Etikett x={128} y={482} anker="middle">
        Alles dreht sich
      </Etikett>
      <Unterzeile x={128} y={514} anker="middle">
        meist Innenohr
      </Unterzeile>

      <Etikett x={360} y={482} anker="middle">
        Es schwankt
      </Etikett>
      <Unterzeile x={360} y={514} anker="middle">
        Alter, Medikamente,
      </Unterzeile>
      <Unterzeile x={360} y={542} anker="middle">
        Psyche
      </Unterzeile>

      <Etikett x={578} y={482} anker="middle">
        Schwarz vor Augen
      </Etikett>
      <Unterzeile x={578} y={514} anker="middle">
        meist Kreislauf
      </Unterzeile>

      <Unterzeile x={360} y={640} anker="middle">
        Wichtig ist auch, wann er auftritt
      </Unterzeile>
    </Zeichnung>
  );
}
