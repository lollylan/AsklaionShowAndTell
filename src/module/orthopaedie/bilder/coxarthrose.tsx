import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

// Linkes Hüftgelenk von vorn: Becken links oben, Oberschenkelknochen läuft nach rechts unten.
// Hüftkopf-Mittelpunkt (150, 230), Kopf r = 58, knöcherne Pfanne r = 81.

const BECKEN =
  'M30 70 C100 24 210 14 296 40 C306 44 308 58 298 66 C288 76 288 88 296 98 C284 132 254 168 220 190 A81 81 0 0 0 74 258 C80 300 92 340 104 368 C112 390 100 410 80 408 C50 406 20 402 10 386 C2 372 2 296 12 280 C22 266 26 250 26 230 C26 180 22 110 30 70 Z M30 336 C30 306 62 300 72 320 C80 340 78 376 60 382 C40 386 30 362 30 336 Z';
const OBERSCHENKEL =
  'M204.5 210.2 C220 232 238 250 250 258 C262 240 286 245 291 264 C297 292 286 322 283 348 L280 500 L220 500 L222 402 C210 394 204 384 210 372 C200 332 190 302 179 280.2 A58 58 0 1 1 204.5 210.2 Z';
const KNORPEL_PFANNE = 'M216.7 191.5 A77 77 0 0 0 77.6 256.3';
const KNORPEL_KOPF = 'M204.6 198.5 A63 63 0 0 0 89.1 246.3';
/** Verdichteter Knochen im Pfannendach: Sichel zwischen r = 81 und r = 98. */
const VERDICHTUNG = 'M212 177.9 A81 81 0 0 0 79.9 189.5 L65.1 181 A98 98 0 0 1 225.1 167 Z';

function Huefte({ krank = false }: { krank?: boolean }) {
  return (
    <g>
      <path d={BECKEN} {...KONTUR} fill={F.creme} fillRule="evenodd" />
      {krank && <path d={VERDICHTUNG} fill={F.kupfer} fillOpacity="0.6" />}
      {krank ? (
        <path d="M214 194 A77 77 0 0 0 80 252" {...KONTUR} stroke={F.kupfer} strokeWidth="5" strokeDasharray="18 16" />
      ) : (
        <>
          <path d={KNORPEL_PFANNE} {...KONTUR} strokeWidth="12" />
          <path d={KNORPEL_PFANNE} {...KONTUR} stroke={F.petrolHell} strokeWidth="7" />
        </>
      )}

      {/* Bei Arthrose rückt der Kopf nach oben in die Pfanne, der Spalt verschwindet */}
      <g transform={krank ? 'translate(3 -9)' : undefined}>
        <path d={OBERSCHENKEL} {...KONTUR} fill={F.creme} />
        {krank ? (
          <>
            {/* Knochenzacken am Übergang von Kopf zu Hals */}
            <path d="M174 282 C176 300 170 312 160 318 C162 304 160 292 162 280 Z" fill={F.creme} stroke={F.kupfer} strokeWidth="4" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <path d={KNORPEL_KOPF} {...KONTUR} strokeWidth="12" />
            <path d={KNORPEL_KOPF} {...KONTUR} stroke={F.petrolHell} strokeWidth="7" />
          </>
        )}
      </g>
      {krank && (
        /* Knochenzacke am Pfannenrand */
        <path d="M212 184 C232 188 246 198 252 212 C238 210 226 206 214 200 Z" fill={F.creme} stroke={F.kupfer} strokeWidth="4" strokeLinejoin="round" />
      )}
    </g>
  );
}

/** Hüftgelenk zweimal von vorn: links gesund, rechts Hüftarthrose. */
export default function Coxarthrose() {
  return (
    <Zeichnung titel="Hüftgelenk zweimal von vorn: links gesund, der Hüftkopf sitzt mit Knorpel und Spalt in der Beckenpfanne, rechts bei Hüftarthrose mit aufgebrauchtem Knorpel, engem Spalt, Knochenzacken und verdichtetem Knochen im Pfannendach">
      <g transform="translate(30 140) scale(0.9)">
        <Huefte />
      </g>
      <g transform="translate(400 140) scale(0.9)">
        <Huefte krank />
      </g>

      <Etikett x={170} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={170} y={98} anker="middle">
        Knorpel polstert Kopf und Pfanne
      </Unterzeile>
      <Etikett x={545} y={66} anker="middle" farbe={F.kupferHell}>
        Hüftarthrose
      </Etikett>
      <Unterzeile x={545} y={98} anker="middle">
        Knorpel weg, Spalt eng
      </Unterzeile>
      <Unterzeile x={545} y={126} anker="middle">
        Pfannendach verdichtet
      </Unterzeile>

      <Zeiger von={[160, 648]} nach={[109, 362]} />
      <Etikett x={168} y={680} anker="end">
        Knorpel
      </Etikett>
      <Zeiger von={[240, 648]} nach={[160, 392]} />
      <Etikett x={226} y={680}>
        Hüftkopf
      </Etikett>
      <Zeiger von={[520, 648]} nach={[548, 418]} />
      <Etikett x={520} y={680} anker="middle" farbe={F.kupferHell}>
        Knochenzacken
      </Etikett>
    </Zeichnung>
  );
}
