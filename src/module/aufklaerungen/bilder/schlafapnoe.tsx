import { Etikett, F, Fluss, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const KOPF =
  'M150 420 L150 348 C130 338 120 334 104 332 C76 334 58 318 60 292 C56 284 50 276 52 268 ' +
  'L64 256 L50 244 C48 232 56 224 58 216 L30 206 C40 186 56 168 62 150 ' +
  'C54 110 66 70 100 46 C150 10 240 24 268 84 C296 150 286 250 250 300 L250 420 Z';

/** Atemweg von der Nase durch den Rachen in den Hals. */
const ATEMWEG = 'M66 198 C115 184 170 180 195 205 C212 225 205 300 205 420';

/** Weg der Luft für die bewegten Punkte, von der Nase bis in den Hals. */
const LUFTWEG = 'M30 204 L66 198 C115 184 170 180 195 205 C212 225 205 300 205 410';

/** Kopf im Profil (Blick nach links) mit Atemweg, Gaumen und Zunge. */
function Kopf({ verschlossen }: { verschlossen: boolean }) {
  return (
    <g>
      <path d={KOPF} {...KONTUR} fill={F.petrolDunkel} />
      {/* geschlossenes Auge: der Mensch schläft */}
      <path d="M96 150 q13 9 26 0" {...KONTUR} stroke={F.leise} />

      {/* Atemweg als dunkler Schlauch mit heller Wand */}
      <path d={ATEMWEG} fill="none" stroke={F.linie} strokeWidth="30" />
      <path d={ATEMWEG} fill="none" stroke={F.tief} strokeWidth="22" />

      {/* harter Gaumen */}
      <path d="M76 236 L150 233" fill="none" stroke={F.creme} strokeWidth="8" strokeLinecap="round" />

      {verschlossen ? (
        <>
          {/* Zunge sinkt im Rhythmus zurück und verschließt den Rachen; ruhend: verschlossen. */}
          <path
            className="schlafapnoe-zunge-form"
            d="M82 270 C105 250 170 246 205 262 C232 274 232 312 205 320 C170 330 100 322 82 270 Z"
            fill={F.kupfer}
            stroke={F.linie}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M150 233 C172 236 194 244 202 262"
            fill="none"
            stroke={F.kupferHell}
            strokeWidth="12"
            strokeLinecap="round"
          />
          <Pfeil d="M6 208 L66 198 C115 184 170 180 195 205 C200 211 203 218 204 228" />
          <Fluss d={LUFTWEG} klasse="schlafapnoe-luft" dauer={1.1} />
        </>
      ) : (
        <>
          <path
            d="M78 268 C100 246 160 246 175 274 C185 296 170 314 140 316 C110 318 86 306 78 268 Z"
            fill={F.petrolHell}
            stroke={F.linie}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M150 233 C165 234 176 242 180 256"
            fill="none"
            stroke={F.petrolHell}
            strokeWidth="12"
            strokeLinecap="round"
          />
          <Pfeil d="M6 208 L66 198 C115 184 170 180 195 205 C212 225 205 300 205 392" />
          <Fluss d={LUFTWEG} dauer={1.1} />
        </>
      )}
    </g>
  );
}

/** Zwei Köpfe im Profil: links freier Atemweg, rechts von Zunge und Gaumen verschlossen. */
export default function Schlafapnoe() {
  return (
    <Zeichnung titel="Zwei Köpfe im Schnitt von der Seite: links strömt die Luft frei durch den Rachen, rechts sind Zunge und Gaumen zurückgefallen und verschließen den Atemweg">
      <g transform="translate(40 120)">
        <Kopf verschlossen={false} />
      </g>
      <g transform="translate(390 120)">
        <Kopf verschlossen />
      </g>

      <Etikett x={200} y={66} anker="middle">
        Normale Atmung
      </Etikett>
      <Unterzeile x={200} y={98} anker="middle">
        Der Atemweg ist offen
      </Unterzeile>
      <Etikett x={550} y={66} anker="middle" farbe={F.kupferHell}>
        Atemaussetzer
      </Etikett>
      <Unterzeile x={550} y={98} anker="middle">
        Der Atemweg ist zu
      </Unterzeile>

      <Zeiger von={[247, 574]} nach={[245, 530]} />
      <Etikett x={196} y={600}>
        Atemweg
      </Etikett>
      <Zeiger von={[556, 574]} nach={[575, 420]} />
      <Etikett x={690} y={600} anker="end">
        Zunge fällt zurück
      </Etikett>

      <Unterzeile x={360} y={664} anker="middle">
        Im Schlaf setzt die Atmung immer wieder kurz aus
      </Unterzeile>
    </Zeichnung>
  );
}
