import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Umriss der Milz, Mittelpunkt (0, 0): die runde Seite liegt außen oben an den Rippen, die Einbuchtung zeigt zur Körpermitte. */
const MILZ =
  'M-90 10 C-100 -50 -30 -80 30 -70 C90 -60 115 -10 100 40 C88 78 40 85 0 70 C-20 62 -25 45 -45 45 C-65 45 -85 45 -90 10 Z';
/** Das Milzgewebe innerhalb der Kapsel, nach innen versetzt – außen oben bleibt Platz für den Bluterguss. */
const GEWEBE =
  'M-84 14 C-92 -34 -40 -56 14 -48 C60 -40 80 -6 74 34 C66 66 32 74 0 64 C-20 58 -26 44 -45 42 C-62 42 -80 42 -84 14 Z';

/** Drei Rippen, die schräg über die Milz ziehen. */
function Rippen() {
  return (
    <g fill="none" stroke={F.leise} strokeWidth="7" strokeLinecap="round" opacity="0.55">
      <path d="M-120 -96 C-40 -110 60 -98 130 -50" />
      <path d="M-124 -40 C-40 -58 40 -50 100 -20" />
    </g>
  );
}

/** Rumpf von vorn, klein: die Milz liegt links im Körper, also rechts im Bild. */
function Rumpf() {
  return (
    <g>
      <path
        d="M180 40 L180 56 C140 60 116 76 112 112 L120 266 L300 266 L308 112 C304 76 280 60 240 56 L240 40"
        {...KONTUR}
        fill={F.petrolDunkel}
      />
      {/* Brustkorb mit Rippenbogen */}
      <path
        d="M146 92 C150 70 270 70 274 92 L272 170 C258 196 232 182 210 140 C188 182 162 196 148 170 Z"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g transform="translate(256 160) scale(0.24)">
        <path d={MILZ} fill={F.petrolHell} stroke={F.linie} strokeWidth="12" />
      </g>
    </g>
  );
}

/** Zweizeitige Milzruptur: Lage der Milz, dann Tag 1 (Kapsel hält, Bluterguss darunter) und Tage später (Kapsel reißt). */
export default function Milzruptur() {
  return (
    <Zeichnung titel="Oben ein Rumpf von vorn: die Milz liegt im linken Oberbauch unter den Rippen. Darunter zwei Bilder der Milz: am ersten Tag hält die Kapsel und darunter sammelt sich ein Bluterguss, Tage später reißt die Kapsel und es blutet in den Bauch">
      <Rumpf />
      <Unterzeile x={118} y={296}>
        rechts
      </Unterzeile>
      <Unterzeile x={302} y={296} anker="end">
        links
      </Unterzeile>

      <Etikett x={370} y={118}>
        Milz
      </Etikett>
      <Unterzeile x={370} y={150}>
        linker Oberbauch,
      </Unterzeile>
      <Unterzeile x={370} y={178}>
        unter den Rippen
      </Unterzeile>
      <Zeiger von={[364, 128]} nach={[266, 156]} />

      {/* Tag 1: Kapsel hält, Bluterguss unter der Kapsel */}
      <g transform="translate(184 462) scale(1.1)">
        <path d={MILZ} fill={F.kupfer} />
        <path d={GEWEBE} fill={F.petrol} stroke={F.leise} strokeWidth="2" />
        <path d={MILZ} {...KONTUR} strokeWidth="5" />
        <Rippen />
      </g>

      {/* Tage später: Kapsel reißt, Blut läuft in den Bauch */}
      <g transform="translate(536 462) scale(1.1)">
        {/* Blut im Bauch */}
        <path
          d="M86 -36 C112 -24 122 10 118 44 C114 70 104 84 90 92 C66 104 24 102 0 96 C-14 92 10 84 36 84 C70 82 96 66 98 40 Z"
          fill={F.kupfer}
          opacity="0.8"
        />
        <path d={MILZ} fill={F.kupfer} />
        <path d={GEWEBE} fill={F.petrol} stroke={F.leise} strokeWidth="2" />
        <path d={MILZ} {...KONTUR} strokeWidth="5" pathLength="100" strokeDasharray="33 12 100" />
        {/* Riss */}
        <path d="M70 -60 L80 -46 L72 -38 L86 -24" fill="none" stroke={F.kupferHell} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <g fill={F.kupfer}>
          <circle cx="130" cy="78" r="6" />
          <circle cx="112" cy="104" r="5" />
        </g>
        <Rippen />
      </g>

      <Pfeil d="M336 462 L384 462" farbe={F.leise} breite={4} />

      <Etikett x={184} y={344} anker="middle">
        Tag 1
      </Etikett>
      <Etikett x={536} y={344} anker="middle" farbe={F.kupferHell}>
        Tage später
      </Etikett>

      <Etikett x={184} y={606} anker="middle">
        Kapsel hält
      </Etikett>
      <Unterzeile x={184} y={636} anker="middle">
        Bluterguss unter der Kapsel
      </Unterzeile>

      <Etikett x={536} y={606} anker="middle" farbe={F.kupferHell}>
        Kapsel reißt
      </Etikett>
      <Unterzeile x={536} y={636} anker="middle">
        Blutung in den Bauch – 112
      </Unterzeile>

      <Unterzeile x={360} y={694} anker="middle">
        Oft ging es dazwischen tagelang gut
      </Unterzeile>
    </Zeichnung>
  );
}
