import { Etikett, F, Folge, KONTUR, Unterzeile, Wachsen, Zeichnung, Zeiger } from './bausteine';

/** Kopf im Profil, Blick nach links (wie in schlafapnoe.tsx). */
const KOPF =
  'M150 420 L150 348 C130 338 120 334 104 332 C76 334 58 318 60 292 C56 284 50 276 52 268 ' +
  'L64 256 L50 244 C48 232 56 224 58 216 L30 206 C40 186 56 168 62 150 ' +
  'C54 110 66 70 100 46 C150 10 240 24 268 84 C296 150 286 250 250 300 L250 420 Z';
/** Nase, Rachen, Kehlkopf (Kopf-Koordinaten). */
const ATEMWEG = 'M66 198 C115 184 170 180 195 205 C212 225 205 300 205 420';
const ZUNGE = 'M78 282 C100 262 160 262 175 290 C185 312 170 330 140 332 C110 334 86 322 78 282 Z';

const RUMPF =
  'M205 374 L205 378 C200 410 150 420 100 440 C86 448 80 466 80 500 L80 720 L420 720 L420 500 ' +
  'C420 466 414 448 400 440 C350 420 300 410 295 378 L295 374 Z';
const RUMPF_RAND =
  'M205 374 L205 378 C200 410 150 420 100 440 C86 448 80 466 80 500 L80 720 ' +
  'M295 374 L295 378 C300 410 350 420 400 440 C414 448 420 466 420 500 L420 720';

const LUNGE_RECHTS = 'M234 448 C200 436 136 460 118 540 C104 604 108 668 126 694 C170 704 214 692 238 668 Z';
const LUNGE_LINKS = 'M274 448 C308 436 372 460 390 540 C404 604 400 668 382 694 C338 704 294 692 270 668 Z';

/** Luftröhre und Bronchien in Körperkoordinaten. */
const LUFTROEHRE = 'M254 378 L254 470';
const BRONCHIEN = [
  'M254 470 C236 490 214 505 196 530',
  'M196 530 C180 560 164 590 154 630',
  'M196 530 C200 570 204 610 208 650',
  'M218 502 C194 496 166 488 146 480',
  'M254 470 C272 490 296 505 314 530',
  'M314 530 C330 560 346 590 356 630',
  'M314 530 C310 570 306 610 302 650',
  'M292 502 C316 496 344 488 364 480',
];

/** Weg des Bronchoskops: durch die Nase, Rachen und Kehlkopf, die Luftröhre hinab in den rechten Bronchus. */
const SCHLAUCH =
  'M8 196 C50 186 92 180 129 178 C174 166 223 162 245 184 C261 202 254 270 254 378 ' +
  'L254 470 C236 490 214 505 196 530 C182 556 168 584 160 612';

/** Das Bronchoskop schiebt sich durch Nase und Luftröhre bis in die Bronchien. */
export default function Bronchoskopie() {
  return (
    <Zeichnung titel="Kopf im Profil und Brustkorb mit beiden Lungenflügeln. Ein dünner Schlauch mit Kamera führt durch die Nase, den Rachen und die Luftröhre bis in die Verzweigungen der Bronchien">
      <g transform="translate(70 0) scale(0.9)">
        <path d={KOPF} {...KONTUR} fill={F.petrolDunkel} />
        <path d="M96 150 q13 9 26 0" {...KONTUR} stroke={F.leise} />
        <path d={ATEMWEG} fill="none" stroke={F.linie} strokeWidth="30" />
        <path d={ATEMWEG} fill="none" stroke={F.tief} strokeWidth="22" />
        <path d={ZUNGE} fill={F.petrolHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      </g>
      <path d={RUMPF} fill={F.petrolDunkel} />
      <path d={RUMPF_RAND} fill="none" stroke={F.leise} strokeWidth="3" strokeLinejoin="round" />

      <path d={LUNGE_RECHTS} fill={F.petrol} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d={LUNGE_LINKS} fill={F.petrol} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />

      {/* Atemwege: erst Konturen, dann die Luft darin */}
      <g fill="none" stroke={F.linie} strokeLinecap="round">
        <path d={LUFTROEHRE} strokeWidth="30" />
        {BRONCHIEN.map((d, i) => (
          <path key={d} d={d} strokeWidth={i % 4 === 0 ? 24 : 16} />
        ))}
      </g>
      <g fill="none" stroke={F.tief} strokeLinecap="round">
        <path d={LUFTROEHRE} strokeWidth="22" />
        {BRONCHIEN.map((d, i) => (
          <path key={d} d={d} strokeWidth={i % 4 === 0 ? 16 : 9} />
        ))}
      </g>
      {/* Knorpelspangen der Luftröhre */}
      <path d="M241 400 L267 400 M241 420 L267 420 M241 440 L267 440" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      <Wachsen d={SCHLAUCH} farbe={F.creme} breite={7} dauer={3.6} ab={0.6} />
      <Folge ab={4.2} von={0}>
        <circle cx="160" cy="614" r="9" fill={F.kupfer} stroke={F.creme} strokeWidth="3" />
      </Folge>

      <Etikett x={700} y={64} anker="end">
        Bronchoskop
      </Etikett>
      <Unterzeile x={700} y={96} anker="end">
        dünner als ein Bleistift
      </Unterzeile>
      <Zeiger von={[580, 110]} nach={[190, 168]} />

      <Etikett x={460} y={400}>
        Luftröhre
      </Etikett>
      <Zeiger von={[452, 392]} nach={[270, 420]} />

      <Etikett x={460} y={520}>
        Bronchien
      </Etikett>
      <Zeiger von={[452, 512]} nach={[340, 540]} />

      <Etikett x={460} y={640}>
        Lunge
      </Etikett>
      <Zeiger von={[452, 632]} nach={[394, 612]} />
    </Zeichnung>
  );
}
