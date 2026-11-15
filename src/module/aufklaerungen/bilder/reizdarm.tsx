import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Dickdarm-Rahmen in drei Stücken: aufsteigend + quer, verkrampfter Abschnitt, Ende. */
const DICKDARM_A = 'M190 500 L190 290 C190 240 215 232 250 232 L470 232 C505 232 530 240 530 290';
const KRAMPF = 'M530 290 C512 305 512 320 530 335 C548 350 548 365 530 380 C512 395 512 410 530 425';
const DICKDARM_B = 'M530 425 L530 450 C530 520 425 490 375 540';

const DUENNDARM =
  'M275 300 H440 C478 300 478 350 440 350 H275 C237 350 237 400 275 400 H440 C478 400 478 450 440 450 H300';

/** Darm mit verkrampftem Abschnitt, darüber das Gehirn – beide beeinflussen sich. */
export default function Reizdarm() {
  return (
    <Zeichnung titel="Dickdarm als Rahmen mit Dünndarmschlingen in der Mitte, ein Abschnitt ist verkrampft; darüber das Gehirn, mit dem Darm durch einen Doppelpfeil verbunden">
      {/* Gehirn */}
      <path
        d="M310 92 C292 88 290 64 308 58 C308 40 334 32 348 42 C362 28 392 32 398 46 C420 44 434 62 424 78 C434 94 418 108 400 102 C388 114 362 112 354 102 C338 112 312 108 310 92 Z"
        {...KONTUR}
        fill={F.petrolHell}
      />
      <path
        d="M348 42 C352 56 344 66 334 68 M398 46 C390 58 396 70 408 72 M354 102 C356 88 368 82 378 86"
        {...KONTUR}
        strokeWidth="3"
      />

      {/* Doppelpfeil Gehirn – Darm */}
      <Pfeil d="M360 162 L360 128" />
      <Pfeil d="M360 162 L360 196" />
      <Unterzeile x={384} y={156}>
        Darm und Nerven
      </Unterzeile>
      <Unterzeile x={384} y={184}>
        beeinflussen sich
      </Unterzeile>

      {/* Dickdarm: erst alle hellen Ränder, dann die Füllungen */}
      <path d={DICKDARM_A} {...KONTUR} strokeWidth="46" />
      <path d={DICKDARM_B} {...KONTUR} strokeWidth="46" />
      <path d={KRAMPF} {...KONTUR} strokeWidth="34" />
      <path d={DICKDARM_A} {...KONTUR} stroke={F.petrol} strokeWidth="38" />
      <path d={DICKDARM_B} {...KONTUR} stroke={F.petrol} strokeWidth="38" />
      <path d={KRAMPF} {...KONTUR} stroke={F.kupfer} strokeWidth="26" />
      {/* Einschnürungen des Dickdarms */}
      <path
        d="M173 330 H207 M173 390 H207 M173 450 H207 M260 215 V249 M320 215 V249 M400 215 V249 M460 215 V249"
        {...KONTUR}
        stroke={F.petrolDunkel}
        strokeWidth="3"
      />
      {/* Schmerz-Striche neben dem Krampf */}
      <path d="M562 330 L584 322 M564 358 L588 358 M562 386 L584 394" {...KONTUR} stroke={F.kupferHell} />

      {/* Dünndarmschlingen */}
      <path d={DUENNDARM} {...KONTUR} strokeWidth="34" />
      <path d={DUENNDARM} {...KONTUR} stroke={F.petrolHell} strokeWidth="26" />

      <Etikett x={360} y={612} anker="middle" farbe={F.kupferHell}>
        Darm ist überempfindlich
      </Etikett>
      <Unterzeile x={360} y={646} anker="middle">
        Krämpfe, Blähungen,
      </Unterzeile>
      <Unterzeile x={360} y={676} anker="middle">
        Durchfall oder Verstopfung
      </Unterzeile>
    </Zeichnung>
  );
}
