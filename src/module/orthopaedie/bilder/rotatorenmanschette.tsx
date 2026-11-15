import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/** Oberarmknochen, Mitte des Kopfes bei (0, 0), Schaft hängt nach unten, großer Höcker links. */
const OBERARM =
  'M-72 -20 C-80 10 -72 42 -54 64 C-38 96 -32 150 -30 250 L16 250 C18 150 24 100 42 70 C66 50 80 14 72 -20 A75 75 0 0 0 -72 -20 Z';

/** Oberarm mit Knorpelkappe auf dem Kopf. */
function Oberarm({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path d={OBERARM} {...KONTUR} fill={F.creme} />
      <path d="M-24.3 -64.7 A69 69 0 0 1 68.8 6" {...KONTUR} stroke={F.petrolHell} strokeWidth="7" />
    </g>
  );
}

/** Pfanne und Schulterblatt rechts vom Kopf. */
const SCHULTERBLATT =
  'M214 176 C238 200 240 260 214 284 C232 320 252 370 262 430 C266 448 288 448 292 430 L296 104 C268 118 236 150 214 176 Z';

/** Schulterdach (Akromion) über dem Oberarmkopf. */
const DACH = 'M100 108 C94 94 104 84 124 84 L284 76 C298 76 300 108 286 110 L130 116 C114 118 104 118 100 108 Z';

/** Sehne mit Muskelbauch rechts; d = Mittellinie. */
function Sehne({ d, farbe, strich }: { d: string; farbe: string; strich?: string }) {
  return (
    <g>
      <path d="M292 166 L240 158" {...KONTUR} strokeWidth="40" />
      <path d="M292 166 L240 158" {...KONTUR} stroke={F.petrol} strokeWidth="32" />
      <path d={d} {...KONTUR} strokeWidth="26" strokeDasharray={strich} strokeLinecap="butt" />
      <path d={d} {...KONTUR} stroke={farbe} strokeWidth="18" strokeDasharray={strich} strokeLinecap="butt" />
    </g>
  );
}

/** Schulter von vorn: Oberarmkopf, Pfanne, Schulterdach; darunter Sehne und Schleimbeutel. */
export default function Rotatorenmanschette() {
  return (
    <Zeichnung titel="Schultergelenk zweimal von vorn: links gesund mit genug Platz unter dem Schulterdach für Sehne und Schleimbeutel, rechts beim Armheben eingeengt, die Sehne ist gereizt und eingerissen">
      {/* Gesund */}
      <g transform="translate(40 170)">
        <path d={SCHULTERBLATT} {...KONTUR} fill={F.creme} />
        <Oberarm transform="translate(150 230)" />
        <Sehne d="M292 166 C236 158 198 152 172.5 146 A87 87 0 0 0 72.5 190.5" farbe={F.petrolHell} />
        {/* Schleimbeutel */}
        <path d="M210 144 A105 105 0 0 0 76 156" {...KONTUR} strokeWidth="18" />
        <path d="M210 144 A105 105 0 0 0 76 156" {...KONTUR} stroke={F.petrolDunkel} strokeWidth="11" />
        <path d={DACH} {...KONTUR} fill={F.creme} />
      </g>

      {/* Erkrankt: Arm gehoben, Kopf rutscht unter das Dach */}
      <g transform="translate(380 170)">
        <path d={SCHULTERBLATT} {...KONTUR} fill={F.creme} />
        <Oberarm transform="translate(150 210) rotate(32)" />
        <Sehne
          d="M292 166 C236 148 198 132 172.5 126 A87 87 0 0 0 91 146"
          farbe={F.kupfer}
          strich="180 14 200"
        />
        <path d={DACH} {...KONTUR} fill={F.creme} />
        <Pfeil d="M64 452 A232 232 0 0 1 -6 392" farbe={F.leise} />
      </g>

      <Etikett x={190} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={98} anker="middle">
        Sehne gleitet frei
      </Unterzeile>
      <Etikett x={530} y={66} anker="middle" farbe={F.kupferHell}>
        Engpass
      </Etikett>
      <Unterzeile x={530} y={98} anker="middle">
        Beim Armheben wird es eng
      </Unterzeile>

      <Etikett x={250} y={232} anker="middle">
        Schulterdach
      </Etikett>
      <Zeiger von={[48, 194]} nach={[114, 324]} />
      <Etikett x={24} y={180}>
        Schleimbeutel
      </Etikett>
      <Zeiger von={[50, 440]} nach={[108, 362]} />
      <Etikett x={24} y={474}>
        Sehne
      </Etikett>

      <Zeiger von={[400, 212]} nach={[478, 314]} />
      <Etikett x={384} y={196} farbe={F.kupferHell}>
        Sehne eingerissen
      </Etikett>
    </Zeichnung>
  );
}
