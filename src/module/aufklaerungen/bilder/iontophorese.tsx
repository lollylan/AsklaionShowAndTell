import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Rechte Hand von oben, Finger nach oben, Mittelpunkt der Handfläche bei (0, 0). */
export function Hand() {
  const finger: [number, number, number][] = [
    // x, oberes Ende, Breite
    [-34, -118, 22],
    [-11, -132, 22],
    [12, -126, 22],
    [33, -104, 20],
  ];
  return (
    <g>
      {finger.map(([x, oben, b]) => (
        <rect key={x} x={x - b / 2} y={oben} width={b} height={-oben} rx={b / 2} fill={F.creme} stroke={F.linie} strokeWidth="3" />
      ))}
      {/* Daumen, schräg nach außen */}
      <rect x={-11} y={-62} width={22} height={70} rx={11} fill={F.creme} stroke={F.linie} strokeWidth="3" transform="translate(-50 30) rotate(-38)" />
      <rect x={-48} y={-50} width={96} height={110} rx={34} fill={F.creme} stroke={F.linie} strokeWidth="3" />
    </g>
  );
}

/** Flache Wanne von oben mit Wasser und Elektrode am Boden; Mitte bei (0, 0). */
export function Wanne({ breite, hoehe, pol }: { breite: number; hoehe: number; pol: '+' | '−' }) {
  return (
    <g>
      <rect x={-breite / 2} y={-hoehe / 2} width={breite} height={hoehe} rx="26" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      {/* Elektrode am Boden, unter einem Gitter */}
      <rect x={-breite / 2 + 26} y={-hoehe / 2 + 26} width={breite - 52} height={hoehe - 52} rx="10" fill={F.kupfer} opacity="0.85" />
      <g stroke={F.kupferHell} strokeWidth="2" opacity="0.7">
        {Array.from({ length: Math.floor((breite - 52) / 26) }, (_, i) => (
          <line key={i} x1={-breite / 2 + 39 + i * 26} y1={-hoehe / 2 + 26} x2={-breite / 2 + 39 + i * 26} y2={hoehe / 2 - 26} />
        ))}
      </g>
      {/* Wasser darüber */}
      <rect x={-breite / 2 + 8} y={-hoehe / 2 + 8} width={breite - 16} height={hoehe - 16} rx="20" fill={F.petrolHell} opacity="0.55" />
      <circle cx={breite / 2 - 4} cy={-hoehe / 2 + 4} r="18" fill={F.tief} stroke={F.linie} strokeWidth="3" />
      <text x={breite / 2 - 4} y={-hoehe / 2 + 13} textAnchor="middle" fontSize="26" fontWeight="700" fill={F.linie}>
        {pol}
      </text>
    </g>
  );
}

/** Zwei Wannen mit Leitungswasser, in jeder eine Hand; Kabel führen zum Gerät. */
export default function Iontophorese() {
  return (
    <Zeichnung titel="Von oben: zwei flache Wannen mit Leitungswasser, am Boden je eine Elektrode unter einem Gitter, in jeder Wanne liegt eine Hand flach im Wasser; Kabel führen zu einem kleinen Gerät, das schwachen Gleichstrom schickt">
      <g transform="translate(190 280)">
        <Wanne breite={250} hoehe={300} pol="+" />
        <g transform="translate(0 40)">
          <Hand />
        </g>
      </g>
      <g transform="translate(530 280)">
        <Wanne breite={250} hoehe={300} pol="−" />
        <g transform="translate(0 40) scale(-1 1)">
          <Hand />
        </g>
      </g>

      {/* Kabel und Gerät */}
      <path d="M190 430 C190 500 260 520 300 540" {...KONTUR} stroke={F.leise} strokeWidth="5" />
      <path d="M530 430 C530 500 460 520 420 540" {...KONTUR} stroke={F.leise} strokeWidth="5" />
      <rect x={290} y={510} width={140} height={100} rx="18" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <rect x={310} y={528} width={70} height={36} rx="6" fill={F.tief} />
      <text x={345} y={554} textAnchor="middle" fontSize="20" fontWeight="700" fill={F.kupferHell}>
        12 mA
      </text>
      <circle cx={404} cy={546} r="14" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="3" />
      <line x1={404} y1={546} x2={410} y2={536} stroke={F.linie} strokeWidth="3" strokeLinecap="round" />

      <Etikett x={190} y={86} anker="middle">
        Leitungswasser
      </Etikett>
      <Etikett x={530} y={86} anker="middle">
        Hände flach hinein
      </Etikett>

      <Zeiger von={[180, 600]} nach={[110, 410]} />
      <Etikett x={40} y={640} farbe={F.kupferHell}>
        Elektrode
      </Etikett>
      <Unterzeile x={40} y={670}>
        unter einem Gitter
      </Unterzeile>

      <Etikett x={680} y={640} anker="end">
        Gerät
      </Etikett>
      <Unterzeile x={680} y={670} anker="end">
        schwacher Gleichstrom
      </Unterzeile>
    </Zeichnung>
  );
}
