import { Etikett, F, Folge, KONTUR, Unterzeile, Wachsen, Zeichnung, Zeiger } from './bausteine';

/** Kopf im Profil, Blick nach links (wie in schlafapnoe.tsx). */
const KOPF =
  'M150 420 L150 348 C130 338 120 334 104 332 C76 334 58 318 60 292 C56 284 50 276 52 268 ' +
  'L64 256 L50 244 C48 232 56 224 58 216 L30 206 C40 186 56 168 62 150 ' +
  'C54 110 66 70 100 46 C150 10 240 24 268 84 C296 150 286 250 250 300 L250 420 Z';
const ZUNGE = 'M78 282 C100 262 160 262 175 290 C185 312 170 330 140 332 C110 334 86 322 78 282 Z';
/** Rachen und Speiseröhre im Kopf (Kopf-Koordinaten). */
const RACHEN = 'M186 268 C204 290 205 330 205 420';

const RUMPF =
  'M205 374 L205 378 C200 410 150 420 100 440 C86 448 80 466 80 500 L80 720 L420 720 L420 500 ' +
  'C420 466 414 448 400 440 C350 420 300 410 295 378 L295 374 Z';
const RUMPF_RAND =
  'M205 374 L205 378 C200 410 150 420 100 440 C86 448 80 466 80 500 L80 720 ' +
  'M295 374 L295 378 C300 410 350 420 400 440 C414 448 420 466 420 500 L420 720';
const SPEISEROEHRE = 'M254 372 C254 410 250 440 248 468';
/** Magen als J: oben links mündet die Speiseröhre, rechts oben die Kuppel, unten links der Ausgang. */
const MAGEN =
  'M262 462 C270 420 340 400 375 440 C400 470 405 520 400 570 C392 640 330 672 270 660 ' +
  'C240 654 220 640 206 630 L214 598 C236 606 262 612 285 600 C312 586 318 550 300 520 ' +
  'C285 500 255 490 242 472 Z';
const ZWOELFFINGERDARM = 'M214 614 C170 602 150 640 160 680 C168 700 210 702 240 688';

/** Weg des Endoskops: vom Mund über die Zunge, durch Rachen und Speiseröhre, durch den Magen
 *  und den Magenausgang bis in den Zwölffingerdarm. */
const SCHLAUCH =
  'M14 262 C40 236 80 230 120 230 C165 232 214 230 240 252 C254 270 254 300 254 378 ' +
  'C254 410 252 440 254 468 C330 476 372 520 370 578 C368 632 300 644 250 628 ' +
  'C225 620 210 612 194 614 C170 620 158 640 160 662';

/** Weg des Endoskops vom Mund bis in den Zwölffingerdarm; der Schlauch schiebt sich vor. */
export default function Magenspiegelung() {
  return (
    <Zeichnung titel="Kopf im Profil und Oberkörper. Ein dünner Schlauch mit Kamera führt vom Mund über die Zunge durch Rachen und Speiseröhre in den Magen und durch den Magenausgang bis in den Zwölffingerdarm">

      <g transform="translate(70 0) scale(0.9)">
        <path d={KOPF} {...KONTUR} fill={F.petrolDunkel} />
        <path d="M96 150 q13 9 26 0" {...KONTUR} stroke={F.leise} />
        <path d={RACHEN} fill="none" stroke={F.linie} strokeWidth="32" strokeLinecap="round" />
        <path d={RACHEN} fill="none" stroke={F.tief} strokeWidth="24" strokeLinecap="round" />
        <path d={ZUNGE} fill={F.petrolHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      </g>
      <path d={RUMPF} fill={F.petrolDunkel} />
      <path d={RUMPF_RAND} fill="none" stroke={F.leise} strokeWidth="3" strokeLinejoin="round" />

      {/* Speiseröhre, Magen, Zwölffingerdarm: erst alle Konturen, dann die Füllungen darüber */}
      <g fill="none" stroke={F.linie} strokeLinecap="round" strokeLinejoin="round">
        <path d={SPEISEROEHRE} strokeWidth="30" />
        <path d={ZWOELFFINGERDARM} strokeWidth="44" />
        <path d={MAGEN} strokeWidth="8" />
      </g>
      <g fill="none" stroke={F.petrol} strokeLinecap="round" strokeLinejoin="round">
        <path d={SPEISEROEHRE} strokeWidth="22" />
        <path d={ZWOELFFINGERDARM} strokeWidth="36" />
        <path d={MAGEN} fill={F.petrol} stroke="none" />
      </g>
      {/* Magenfalten */}
      <path d="M330 470 C360 500 372 540 368 590 M300 640 C330 640 352 625 362 605" fill="none" stroke={F.petrolHell} strokeWidth="4" strokeLinecap="round" />

      {/* Beißring zwischen den Zähnen */}
      <rect x="104" y="218" width="22" height="26" rx="6" fill={F.creme} />

      {/* Der Schlauch schiebt sich vor, dann leuchtet die Kamera an der Spitze. */}
      <Wachsen d={SCHLAUCH} farbe={F.creme} breite={8} dauer={3.4} ab={0.6} />
      <Folge ab={3.9} von={0}>
        <circle cx="160" cy="664" r="9" fill={F.kupfer} stroke={F.creme} strokeWidth="3" />
      </Folge>

      <Etikett x={700} y={64} anker="end">
        Endoskop
      </Etikett>
      <Unterzeile x={700} y={96} anker="end">
        Schlauch mit Kamera
      </Unterzeile>
      <Zeiger von={[560, 110]} nach={[254, 330]} />

      <Etikett x={460} y={400}>
        Speiseröhre
      </Etikett>
      <Zeiger von={[452, 392]} nach={[256, 420]} />

      <Etikett x={480} y={540}>
        Magen
      </Etikett>
      <Zeiger von={[472, 532]} nach={[402, 548]} />

      <Etikett x={700} y={668} anker="end">
        Zwölffingerdarm
      </Etikett>
      <Zeiger von={[452, 690]} nach={[244, 690]} />
    </Zeichnung>
  );
}
