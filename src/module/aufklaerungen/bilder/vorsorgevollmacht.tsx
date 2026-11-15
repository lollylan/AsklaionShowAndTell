import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Brustbild einer Person: Kopf und Schultern, Mitte cx. */
function Person({ cx, farbe }: { cx: number; farbe: string }) {
  return (
    <g>
      <path
        d={`M${cx - 115} 520 C${cx - 115} 410 ${cx - 70} 375 ${cx} 375 C${cx + 70} 375 ${cx + 115} 410 ${cx + 115} 520 Z`}
        {...KONTUR}
        fill={farbe}
      />
      <circle cx={cx} cy="300" r="58" {...KONTUR} fill={F.creme} />
    </g>
  );
}

/** Zwei Personen: Sie übertragen mit einem unterschriebenen Dokument die Vertretung an eine Vertrauensperson. */
export default function Vorsorgevollmacht() {
  return (
    <Zeichnung titel="Zwei Personen nebeneinander: Links Sie, rechts Ihre Vertrauensperson. Ein Pfeil führt über ein unterschriebenes Dokument mit der Aufschrift Vollmacht von Ihnen zur Vertrauensperson">
      <Person cx={180} farbe={F.petrol} />
      <Person cx={540} farbe={F.petrolHell} />

      {/* Dokument mit umgeknickter Ecke */}
      <path d="M312 140 L392 140 L414 162 L414 268 L312 268 Z" {...KONTUR} fill={F.creme} />
      <path d="M392 140 L392 162 L414 162" {...KONTUR} stroke={F.petrolDunkel} />
      <g stroke={F.petrol} strokeWidth="4" strokeLinecap="round">
        <line x1="328" y1="180" x2="380" y2="180" />
        <line x1="328" y1="200" x2="396" y2="200" />
        <line x1="328" y1="220" x2="388" y2="220" />
      </g>
      <path
        d="M330 252 C338 232 346 234 346 248 C346 258 356 238 364 240 C372 242 366 256 376 252 C384 248 390 242 398 244"
        fill="none"
        stroke={F.kupfer}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Pfeil d="M262 320 L452 320" farbe={F.kupferHell} />

      <Etikett x={363} y={112} anker="middle">
        Vollmacht
      </Etikett>

      <Etikett x={180} y={576} anker="middle">
        Sie
      </Etikett>
      <Unterzeile x={180} y={608} anker="middle">
        legen vorher fest
      </Unterzeile>

      <Etikett x={540} y={576} anker="middle">
        Vertrauensperson
      </Etikett>
      <Unterzeile x={540} y={608} anker="middle">
        handelt in Ihrem Sinn
      </Unterzeile>

      <Unterzeile x={360} y={676} anker="middle" farbe={F.linie}>
        schriftlich, mit Ihrer Unterschrift
      </Unterzeile>
    </Zeichnung>
  );
}
