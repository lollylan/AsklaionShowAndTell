import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Feldgröße eines Schnittbilds. */
const BREITE = 330;
const HOEHE = 470;

/** Augapfel: großer Kreis, der rechts im Feld angeschnitten ist. */
const AUGE = { cx: 560, cy: 220, r: 350 };

/** Oberlid im Schnitt: vorn (links) die Haut, hinten (rechts) liegt es dem Augapfel an. */
const LID =
  'M205 0 C150 80 105 190 118 290 C124 335 136 360 152 372 Q196 376 239 360 A350 350 0 0 1 288 0 Z';

/** Lidplatte, ein festes Band im unteren Teil des Lids, nah am Augapfel. */
const LIDPLATTE = 'M170 168 C160 240 164 310 182 356 L230 358 C222 300 212 230 208 166 Q188 158 170 168 Z';

/** Lange Talgdrüse in der Lidplatte, mündet hinter den Wimpern am Lidrand. */
const DRUESE_LANG = 'M190 186 C186 250 194 310 206 366';
const DRUESE_BLAESCHEN: [number, number][] = [
  [180, 200],
  [200, 214],
  [179, 240],
  [199, 256],
  [182, 284],
  [203, 300],
  [190, 330],
];

/** Wimper: wächst vorn am Lidrand heraus und biegt sich nach außen. */
const WIMPER = 'M166 334 C166 372 124 406 66 388';

/** Schnitt durch das Oberlid; art bestimmt, welche Drüse erkrankt ist. */
function Schnitt({ art }: { art: 'gerstenkorn' | 'hagelkorn' }) {
  return (
    <g>
      <g clipPath="url(#lidknoten-feld)">
        <circle cx={AUGE.cx} cy={AUGE.cy} r={AUGE.r} fill={F.creme} />
        {/* Hornhaut wölbt sich unter dem Lidrand nach vorn, dahinter die Regenbogenhaut */}
        <circle cx="362" cy="474" r="152" fill={F.creme} />
        <path d="M270 412 L270 490" stroke={F.petrol} strokeWidth="14" strokeLinecap="round" />
        <path d={LID} fill={F.petrol} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      </g>

      <path d={LIDPLATTE} fill={F.petrolHell} />

      {/* lange Drüse in der Lidplatte */}
      <g fill={F.creme}>
        {DRUESE_BLAESCHEN.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />
        ))}
      </g>
      <path d={DRUESE_LANG} fill="none" stroke={F.creme} strokeWidth="7" strokeLinecap="round" />

      {/* Wimper mit kleiner Drüse an der Wurzel */}
      <path d={WIMPER} fill="none" stroke={F.linie} strokeWidth="5" strokeLinecap="round" />
      {art === 'hagelkorn' && <ellipse cx="156" cy="334" rx="8" ry="11" fill={F.creme} />}

      {art === 'gerstenkorn' && (
        <g>
          <circle cx="146" cy="330" r="40" fill={F.kupfer} opacity="0.75" />
          <circle cx="146" cy="330" r="27" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
          <circle cx="140" cy="324" r="11" fill={F.kupferHell} stroke={F.creme} strokeWidth="3" />
        </g>
      )}

      {art === 'hagelkorn' && (
        <g>
          <circle cx="186" cy="262" r="31" fill={F.kupferHell} stroke={F.linie} strokeWidth="4" />
          <path d="M168 256 A19 19 0 0 1 182 242" fill="none" stroke={F.creme} strokeWidth="5" strokeLinecap="round" />
        </g>
      )}

      <rect x="0" y="0" width={BREITE} height={HOEHE} rx="24" fill="none" stroke={F.leise} strokeWidth="2" opacity="0.6" />

      <Unterzeile x={275} y={232} anker="middle" farbe={F.petrolDunkel}>
        Auge
      </Unterzeile>
      <Unterzeile x={56} y={200} anker="middle">
        außen
      </Unterzeile>
    </g>
  );
}

/** Zwei Schnitte durch das Oberlid von der Seite: links Gerstenkorn, rechts Hagelkorn. */
export default function Lidknoten() {
  return (
    <Zeichnung titel="Zwei Schnitte durch das Oberlid von der Seite, rechts jeweils der Augapfel, links außen: beim Gerstenkorn ist die kleine Drüse an der Wimpernwurzel entzündet und eitrig, beim Hagelkorn ist die lange Drüse tief in der Lidplatte mit Fett gestaut">
      <defs>
        <clipPath id="lidknoten-feld">
          <rect x="0" y="0" width={BREITE} height={HOEHE} rx="24" />
        </clipPath>
      </defs>

      <Etikett x={185} y={58} anker="middle" farbe={F.kupferHell}>
        Gerstenkorn
      </Etikett>
      <Unterzeile x={185} y={90} anker="middle">
        Bakterien, Eiter
      </Unterzeile>
      <Etikett x={535} y={58} anker="middle" farbe={F.kupferHell}>
        Hagelkorn
      </Etikett>
      <Unterzeile x={535} y={90} anker="middle">
        Fettstau, keine Bakterien
      </Unterzeile>

      <g transform="translate(20 120)">
        <Schnitt art="gerstenkorn" />
      </g>
      <g transform="translate(370 120)">
        <Schnitt art="hagelkorn" />
      </g>

      <Unterzeile x={360} y={646} anker="middle">
        Schnitt durch das Oberlid, von der Seite
      </Unterzeile>
    </Zeichnung>
  );
}
