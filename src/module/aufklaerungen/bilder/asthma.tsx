import { Etikett, F, Fluss, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Querschnitt durch einen Bronchus: links gesund, rechts im Asthmaanfall. */
export default function Asthma() {
  return (
    <Zeichnung titel="Querschnitt durch einen Bronchus: gesund mit weiter Öffnung, bei Asthma mit verkrampftem Muskel, geschwollener Schleimhaut und Schleim">
      <g transform="translate(0 30)">
      {/* Gesund */}
      <circle cx="185" cy="300" r="150" {...KONTUR} stroke={F.kupferHell} strokeWidth="10" />
      <circle cx="185" cy="300" r="128" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <circle cx="185" cy="300" r="106" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      <Pfeil d="M185 360 L185 250" farbe={F.linie} breite={7} />
      <Fluss d="M150 380 L150 220" farbe={F.petrolHell} breite={8} dauer={0.9} />
      <Fluss d="M220 380 L220 220" farbe={F.petrolHell} breite={8} dauer={0.9} ab={0.45} />

      {/* Asthma */}
      <g className="asthma-krampf-form">
      <circle cx="535" cy="300" r="150" fill="none" stroke={F.kupfer} strokeWidth="34" />
      <circle cx="535" cy="300" r="131" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <path
        d="M535 258 C562 252 584 276 578 302 C574 326 556 344 532 342 C506 340 490 322 492 298 C494 276 510 262 535 258 Z"
        fill={F.tief}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M506 300 C514 288 526 294 530 306 C534 318 550 320 562 310"
        fill="none"
        stroke={F.creme}
        strokeWidth="9"
        strokeLinecap="round"
      />
      </g>

      </g>

      {/* Überschriften stehen oben, Hinweise unten – so kreuzt keine Linie einen Text. */}
      <Etikett x={185} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={185} y={98} anker="middle">
        Die Luft strömt frei
      </Unterzeile>
      <Etikett x={535} y={66} anker="middle" farbe={F.kupferHell}>
        Bei Asthma
      </Etikett>
      <Unterzeile x={535} y={98} anker="middle">
        Der Atemweg ist eng
      </Unterzeile>

      <Zeiger von={[292, 552]} nach={[425, 432]} />
      <Etikett x={40} y={570}>
        Muskel verkrampft
      </Etikett>
      <Zeiger von={[372, 617]} nach={[497, 372]} />
      <Etikett x={40} y={635}>
        Schleimhaut geschwollen
      </Etikett>
      <Zeiger von={[610, 540]} nach={[556, 344]} />
      <Etikett x={690} y={570} anker="end">
        zäher Schleim
      </Etikett>
    </Zeichnung>
  );
}
