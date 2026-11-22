import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Bandscheibe von oben, Bauchseite oben im Bild, hinten der Wirbelkanal. */
const SCHEIBE =
  'M360 170 C480 170 560 220 560 300 C560 375 505 410 440 412 C405 413 392 398 360 398 C328 398 315 413 280 412 C215 410 160 375 160 300 C160 220 240 170 360 170 Z';
const BOGEN =
  'M296 404 C268 440 276 520 318 548 L346 640 L374 640 L402 548 C444 520 452 440 424 404 C404 420 384 424 360 424 C336 424 316 420 296 404 Z';
const VORFALL = 'M322 312 C306 350 304 384 302 400 C270 412 264 452 292 464 C320 472 338 442 342 410 C348 380 350 342 344 314 Z';

/** Ein seltener Bandscheibenvorfall drückt auf eine Nervenwurzel. */
export default function RueckenschmerzenUrsachen() {
  return (
    <Zeichnung titel="Bandscheibe von oben: Der weiche Kern tritt nach hinten aus und drückt auf einen Nerv, der zum Bein zieht">
      <Etikett x={360} y={70} anker="middle">
        Selten: Bandscheibenvorfall
      </Etikett>

      {/* Wirbelbogen mit Kanal */}
      <path d={BOGEN} {...KONTUR} fill={F.petrolDunkel} />
      <ellipse cx="360" cy="474" rx="46" ry="40" {...KONTUR} fill={F.tief} />
      <ellipse cx="360" cy="474" rx="26" ry="22" fill={F.petrolHell} />

      {/* Nervenwurzeln */}
      <path d="M322 470 C280 476 236 496 186 540" fill="none" stroke={F.kupferHell} strokeWidth="14" strokeLinecap="round" />
      <path d="M398 470 C440 476 484 496 534 540" fill="none" stroke={F.creme} strokeWidth="14" strokeLinecap="round" />

      {/* Bandscheibe mit Kern */}
      <path d={SCHEIBE} {...KONTUR} fill={F.petrol} />
      <path d="M220 300 C220 240 290 210 360 210 C430 210 500 240 500 300" fill="none" stroke={F.leise} strokeWidth="2" strokeOpacity="0.6" />
      <ellipse cx="360" cy="296" rx="80" ry="54" fill={F.kupferHell} fillOpacity="0.5" />
      <path d={VORFALL} fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />

      <Zeiger von={[180, 160]} nach={[230, 230]} />
      <Etikett x={40} y={150}>
        Bandscheibe
      </Etikett>

      <Zeiger von={[156, 404]} nach={[292, 420]} />
      <Etikett x={40} y={396} farbe={F.kupferHell}>
        Vorfall
      </Etikett>

      <Zeiger von={[150, 590]} nach={[200, 528]} />
      <Etikett x={40} y={624} farbe={F.kupferHell}>
        Nerv wird gedrückt
      </Etikett>
      <Unterzeile x={40} y={656}>
        Schmerz zieht ins Bein
      </Unterzeile>

      <Zeiger von={[560, 600]} nach={[378, 480]} />
      <Etikett x={690} y={628} anker="end">
        Rückenmark
      </Etikett>
    </Zeichnung>
  );
}
