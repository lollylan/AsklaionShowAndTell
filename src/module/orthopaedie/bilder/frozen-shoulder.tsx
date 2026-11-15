import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/** Oberarmknochen, Mitte des Kopfes bei (0, 0), Schaft hängt nach unten. */
const OBERARM =
  'M-72 -20 C-80 10 -72 42 -54 64 C-38 96 -32 150 -30 250 L16 250 C18 150 24 100 42 70 C66 50 80 14 72 -20 A75 75 0 0 0 -72 -20 Z';

/** Pfanne und Schulterblatt rechts vom Kopf. */
const SCHULTERBLATT =
  'M214 176 C238 200 240 260 214 284 C232 320 252 370 262 430 C266 448 288 448 292 430 L296 104 C268 118 236 150 214 176 Z';

/** Schulterdach über dem Oberarmkopf. */
const DACH = 'M100 108 C94 94 104 84 124 84 L284 76 C298 76 300 108 286 110 L130 116 C114 118 104 118 100 108 Z';

/** Gelenk ohne Kapsel; Kopfmitte bei (150, 230). */
function Gelenk() {
  return (
    <>
      <path d={SCHULTERBLATT} {...KONTUR} fill={F.creme} />
      <path d={DACH} {...KONTUR} fill={F.creme} />
      <g transform="translate(150 230)">
        <path d={OBERARM} {...KONTUR} fill={F.creme} />
        <path d="M-24.3 -64.7 A69 69 0 0 1 68.8 6" {...KONTUR} stroke={F.petrolHell} strokeWidth="7" />
      </g>
    </>
  );
}

/** Kapsel als Band; d = Mittellinie. */
function Kapsel({ d, farbe, breite }: { d: string; farbe: string; breite: number }) {
  return (
    <>
      <path d={d} {...KONTUR} strokeWidth={breite + 7} />
      <path d={d} {...KONTUR} stroke={farbe} strokeWidth={breite} />
    </>
  );
}

/** Schultergelenk von vorn mit Gelenkkapsel und Bewegungsbogen des Arms. */
export default function FrozenShoulder() {
  return (
    <Zeichnung titel="Schultergelenk zweimal von vorn: links gesund mit weiter Kapsel und einer Reservefalte unten, der Arm lässt sich weit heben; rechts bei der Schultersteife ist die Kapsel geschrumpft, verdickt und entzündet, der Arm bewegt sich nur wenig">
      {/* Gesund: weite Kapsel mit Reservefalte unten */}
      <g transform="translate(40 140)">
        <Gelenk />
        <Kapsel d="M216 170 A90 90 0 0 0 70 190" farbe={F.petrolHell} breite={8} />
        <Kapsel
          d="M222 292 C240 330 236 382 208 384 C182 386 182 340 192 306"
          farbe={F.petrolHell}
          breite={8}
        />
        <Pfeil d="M97.5 391.7 A170 170 0 0 1 -14 186" farbe={F.linie} />
      </g>

      {/* Schultersteife: Kapsel eng, dick, entzündet */}
      <g transform="translate(380 140)">
        <Gelenk />
        <Kapsel d="M214 178 A81 81 0 0 0 78 196" farbe={F.kupfer} breite={16} />
        <Kapsel d="M222 286 C220 304 206 316 186 310" farbe={F.kupfer} breite={16} />
        <Pfeil d="M97.5 391.7 A170 170 0 0 1 20 339" farbe={F.kupferHell} />
      </g>

      <Etikett x={190} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={98} anker="middle">
        Weite Kapsel, Arm frei
      </Unterzeile>
      <Etikett x={530} y={66} anker="middle" farbe={F.kupferHell}>
        Schultersteife
      </Etikett>
      <Unterzeile x={530} y={98} anker="middle">
        Kapsel geschrumpft
      </Unterzeile>

      <Zeiger von={[250, 640]} nach={[248, 528]} />
      <Etikett x={214} y={668}>
        Gelenkkapsel
      </Etikett>
      <Zeiger von={[650, 640]} nach={[588, 452]} />
      <Etikett x={704} y={668} anker="end" farbe={F.kupferHell}>
        Kapsel entzündet
      </Etikett>
      <Unterzeile x={30} y={704}>
        Pfeil: so weit lässt sich der Arm heben
      </Unterzeile>
    </Zeichnung>
  );
}
