import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

// Rechtes Knie von vorn: innen (zur Körpermitte) liegt links im Bild, das Wadenbein außen rechts.

const OBERSCHENKEL =
  'M105 0 L105 140 C100 175 45 185 42 235 C40 270 70 292 100 290 C125 289 138 274 150 272 C162 274 175 289 200 290 C230 292 260 270 258 235 C255 185 200 175 195 140 L195 0';
const SCHIENBEIN =
  'M40 334 C44 322 118 320 136 324 L150 312 L164 324 C182 320 256 322 260 334 C262 362 232 382 200 396 L194 520 L116 520 L110 396 C78 382 38 362 40 334 Z';
const WADENBEIN =
  'M226 384 C226 362 266 360 270 380 C272 396 262 404 258 416 L254 520 L238 520 L240 416 C232 406 226 396 226 384 Z';

const KNORPEL_OBEN_INNEN = 'M46 256 C56 292 118 296 140 280';
const KNORPEL_OBEN_AUSSEN = 'M160 280 C182 296 244 292 254 256';
const KNORPEL_UNTEN_INNEN = 'M50 330 C70 322 116 320 134 326';
const KNORPEL_UNTEN_AUSSEN = 'M166 326 C184 320 230 322 250 330';

function Knorpel({ d, krank = false }: { d: string; krank?: boolean }) {
  if (krank) {
    return <path d={d} {...KONTUR} stroke={F.kupfer} strokeWidth="6" strokeDasharray="22 16" />;
  }
  return (
    <>
      <path d={d} {...KONTUR} strokeWidth="16" />
      <path d={d} {...KONTUR} stroke={F.petrolHell} strokeWidth="10" />
    </>
  );
}

function Knie({ krank = false }: { krank?: boolean }) {
  return (
    <g>
      {/* Unterschenkel: bei Arthrose innen angehoben und leicht nach innen gekippt (O-Bein) */}
      <g transform={krank ? 'rotate(5 150 330) translate(0 -6)' : undefined}>
        <path d={WADENBEIN} {...KONTUR} fill={F.creme} />
        <path d={SCHIENBEIN} {...KONTUR} fill={F.creme} />
        <Knorpel d={KNORPEL_UNTEN_INNEN} krank={krank} />
        <Knorpel d={KNORPEL_UNTEN_AUSSEN} />
        {krank && (
          <path d="M44 336 C30 340 20 348 18 358 C28 358 38 356 48 350 Z" fill={F.creme} stroke={F.kupfer} strokeWidth="4" strokeLinejoin="round" />
        )}
      </g>

      <path d={OBERSCHENKEL} {...KONTUR} fill={F.creme} />
      {/* Kniescheibe, liegt vorn auf dem Oberschenkel */}
      <ellipse cx="150" cy="214" rx="40" ry="48" {...KONTUR} stroke={F.leise} strokeWidth="3" strokeDasharray="10 8" />
      <Knorpel d={KNORPEL_OBEN_INNEN} krank={krank} />
      <Knorpel d={KNORPEL_OBEN_AUSSEN} />
      {krank && (
        <path d="M44 246 C28 250 18 262 18 274 C28 272 38 268 50 262 Z" fill={F.creme} stroke={F.kupfer} strokeWidth="4" strokeLinejoin="round" />
      )}

      {/* Menisken: Keile am Rand des Gelenkspalts */}
      {krank ? (
        <path d="M34 300 L76 308 L36 312 Z" {...KONTUR} strokeWidth="3" fill={F.kupfer} />
      ) : (
        <path d="M36 292 L88 310 L40 324 Z" {...KONTUR} strokeWidth="3" fill={F.petrol} />
      )}
      <path d="M264 292 L212 310 L260 324 Z" {...KONTUR} strokeWidth="3" fill={F.petrol} />
    </g>
  );
}

/** Knie zweimal von vorn: links gesund, rechts Kniearthrose mit engem Spalt auf der Innenseite. */
export default function Gonarthrose() {
  return (
    <Zeichnung titel="Rechtes Knie zweimal von vorn: links gesund mit Knorpel und Menisken in einem gleichmäßig weiten Gelenkspalt, rechts bei Kniearthrose mit engem Spalt und abgenutztem Knorpel auf der Innenseite, Knochenzacken und leichter O-Bein-Stellung">
      <g transform="translate(40 140) scale(0.9)">
        <Knie />
      </g>
      <g transform="translate(410 140) scale(0.9)">
        <Knie krank />
      </g>

      <Etikett x={175} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={175} y={98} anker="middle">
        Spalt innen und außen gleich
      </Unterzeile>
      <Etikett x={545} y={66} anker="middle" farbe={F.kupferHell}>
        Kniearthrose
      </Etikett>
      <Unterzeile x={545} y={98} anker="middle">
        Innen eng, O-Bein
      </Unterzeile>

      <Zeiger von={[360, 228]} nach={[434, 370]} />
      <Etikett x={360} y={214} anker="middle" farbe={F.kupferHell}>
        Knochenzacken
      </Etikett>
      <Zeiger von={[330, 296]} nach={[278, 413]} />
      <Etikett x={330} y={282} anker="middle">
        Meniskus
      </Etikett>
      <Zeiger von={[50, 648]} nach={[84, 436]} />
      <Etikett x={30} y={680}>
        Knorpel
      </Etikett>
      <Zeiger von={[420, 648]} nach={[452, 420]} />
      <Etikett x={400} y={680} farbe={F.kupferHell}>
        Knorpel abgenutzt
      </Etikett>
    </Zeichnung>
  );
}
