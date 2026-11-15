import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Kopf im Profil mit dem Gehirn, ringsum häufige behandelbare Ursachen der Vergesslichkeit. */
export default function Vergesslichkeit() {
  return (
    <Zeichnung titel="Kopf im Profil mit dem Gehirn, ringsum fünf häufige Ursachen für Vergesslichkeit, die sich behandeln lassen: Seele und Stress, Schilddrüse und Vitamin B12, Medikamente und Alkohol, Hören und Sehen sowie Schlaf">
      {/* Kopf, Blick nach rechts */}
      <path
        d="M304 500 L304 460 C290 440 268 410 266 370 C262 292 306 230 372 228 C432 226 470 268 474 318 L498 364 C502 372 498 378 490 378 L480 378 L482 402 C482 414 474 420 464 420 L454 420 L452 436 C450 448 440 454 426 454 L414 454 L414 500"
        {...KONTUR}
        fill={F.tief}
      />
      {/* Gehirn */}
      <ellipse cx="360" cy="318" rx="82" ry="62" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <path
        d="M300 300 C320 280 340 300 360 285 C380 270 400 290 420 280 M296 336 C318 320 340 345 362 330 C384 315 404 340 428 326"
        fill="none"
        stroke={F.petrolDunkel}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Zeiger von={[190, 162]} nach={[318, 286]} />
      <Etikett x={40} y={112}>
        Seele
      </Etikett>
      <Unterzeile x={40} y={144}>
        Depression, Stress
      </Unterzeile>

      <Zeiger von={[548, 162]} nach={[410, 280]} />
      <Etikett x={680} y={112} anker="end">
        Schilddrüse, B12
      </Etikett>
      <Unterzeile x={680} y={144} anker="end">
        zeigt ein Bluttest
      </Unterzeile>

      <Zeiger von={[204, 352]} nach={[290, 340]} />
      <Etikett x={40} y={348}>
        Tabletten
      </Etikett>
      <Unterzeile x={40} y={380}>
        und Alkohol
      </Unterzeile>

      <Zeiger von={[566, 348]} nach={[436, 334]} />
      <Etikett x={680} y={348} anker="end">
        Hören
      </Etikett>
      <Unterzeile x={680} y={380} anker="end">
        und Sehen
      </Unterzeile>

      <Zeiger von={[352, 526]} nach={[352, 372]} />
      <Etikett x={360} y={566} anker="middle">
        Schlaf
      </Etikett>
      <Unterzeile x={360} y={598} anker="middle">
        zu kurz, Atemaussetzer
      </Unterzeile>

      <Unterzeile x={360} y={668} anker="middle">
        Vieles davon lässt sich behandeln
      </Unterzeile>
    </Zeichnung>
  );
}
