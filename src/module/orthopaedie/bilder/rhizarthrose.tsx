import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/* Daumenstrahl in eigenen Koordinaten: Sattelgelenk bei (0, 0), Daumenspitze nach oben (y negativ). */
const MITTELHAND =
  'M-27 -6 C-30 -24 -22 -44 -20 -64 L-18 -140 C-26 -150 -26 -170 -10 -176 L10 -176 C26 -170 26 -150 18 -140 L20 -64 C22 -44 30 -24 27 -6 C12 -16 -12 -16 -27 -6 Z';
const GRUNDGLIED =
  'M-18 -186 C-22 -194 -18 -200 -14 -204 L-11 -266 C-18 -272 -18 -286 -6 -288 L6 -288 C18 -286 18 -272 11 -266 L14 -204 C18 -200 22 -194 18 -186 C8 -190 -8 -190 -18 -186 Z';
const ENDGLIED =
  'M-14 -296 C-14 -304 -10 -308 -9 -312 L-9 -332 C-12 -340 -6 -352 0 -352 C6 -352 12 -340 9 -332 L9 -312 C10 -308 14 -304 14 -296 C6 -299 -6 -299 -14 -296 Z';
/** Vieleckbein unter dem Daumen, oben sattelförmig. */
const VIELECKBEIN = 'M-32 6 C-14 -4 14 -4 32 6 C46 16 50 36 40 48 C20 58 -20 58 -40 46 C-50 34 -46 16 -32 6 Z';
/** Knorpel im Gelenkspalt. */
const SPALT = 'M-27 -6 C-12 -16 12 -16 27 -6 L32 6 C14 -4 -14 -4 -32 6 Z';

/** Nachbarknochen (Zeigefinger, Handwurzel), leise im Hintergrund. */
const NACHBARN = [
  'M224 384 C226 370 232 362 234 350 L238 190 C230 180 232 162 246 158 L258 158 C272 162 274 180 266 190 L264 350 C266 362 272 370 274 384 C258 378 240 378 224 384 Z',
  'M238 148 C238 138 242 134 244 130 L246 60 C240 54 242 40 252 38 L260 38 C270 40 272 54 266 60 L266 130 C268 134 272 138 272 148 C260 144 248 144 238 148 Z',
  'M226 392 C242 386 264 388 272 398 C278 414 274 432 262 438 C246 442 230 438 224 428 C218 414 218 402 226 392 Z',
  'M160 470 C164 446 196 436 226 444 C252 452 254 478 238 492 C214 506 168 500 160 470 Z',
];

function Hand({ krank }: { krank: boolean }) {
  const daumen = krank ? 'translate(-17 7) rotate(-8)' : undefined;
  return (
    <>
      {NACHBARN.map((d) => (
        <path key={d} d={d} fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" strokeLinejoin="round" />
      ))}
      <g transform="translate(170 400) rotate(-25)">
        {!krank && <path d={SPALT} fill={F.petrolHell} />}
        {krank && (
          <>
            {/* Knochenzacken am Rand, halb unter dem Knochen */}
            <path d="M-24 10 C-46 0 -66 8 -62 24 C-56 30 -40 30 -26 34 Z" {...KONTUR} fill={F.creme} stroke={F.kupfer} />
            <path d="M-40 -30 C-58 -32 -70 -20 -62 -10 C-56 -4 -48 -2 -40 -2 Z" {...KONTUR} fill={F.creme} stroke={F.kupfer} />
          </>
        )}
        <path d={VIELECKBEIN} {...KONTUR} fill={F.creme} />
        <g transform={daumen}>
          <path d={MITTELHAND} {...KONTUR} fill={F.creme} />
          <path d={GRUNDGLIED} {...KONTUR} fill={F.creme} />
          <path d={ENDGLIED} {...KONTUR} fill={F.creme} />
        </g>
        {krank && (
          <path d="M-26 1 C-12 -8 12 -8 26 1" {...KONTUR} stroke={F.kupfer} strokeWidth="6" strokeDasharray="14 12" />
        )}
      </g>
    </>
  );
}

/** Daumen- und Zeigefingerknochen von der Handfläche, Daumensattelgelenk gesund und abgenutzt. */
export default function Rhizarthrose() {
  return (
    <Zeichnung titel="Handskelett mit Daumen zweimal: links gesund, zwischen Vieleckbein und erstem Mittelhandknochen ein glatter Knorpelspalt; rechts bei Rhizarthrose ist der Knorpel abgenutzt, der Daumen aus dem Gelenk verschoben und am Rand wachsen Knochenzacken">
      <g transform="translate(40 100)">
        <Hand krank={false} />
      </g>
      <g transform="translate(380 100)">
        <Hand krank />
      </g>

      <Etikett x={190} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={98} anker="middle">
        Daumen gleitet glatt
      </Unterzeile>
      <Etikett x={530} y={66} anker="middle" farbe={F.kupferHell}>
        Rhizarthrose
      </Etikett>
      <Unterzeile x={530} y={98} anker="middle">
        Daumenansatz schmerzt
      </Unterzeile>

      <Zeiger von={[70, 600]} nach={[178, 506]} />
      <Etikett x={30} y={632}>
        Sattelgelenk
      </Etikett>
      <Unterzeile x={30} y={664}>
        Knorpel glatt
      </Unterzeile>

      <Zeiger von={[410, 600]} nach={[506, 504]} />
      <Etikett x={384} y={632} farbe={F.kupferHell}>
        Knorpel abgenutzt
      </Etikett>
      <Unterzeile x={384} y={664}>
        Zacken, Daumen verschoben
      </Unterzeile>
    </Zeichnung>
  );
}
