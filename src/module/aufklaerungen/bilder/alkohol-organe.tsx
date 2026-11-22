import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Rumpf von vorn, Mitte bei x = 360. */
const RUMPF =
  'M334 166 L334 186 C300 192 262 200 248 228 C240 250 252 330 258 400 C262 470 256 530 254 590 L466 590 ' +
  'C464 530 458 470 462 400 C468 330 480 250 472 228 C458 200 420 192 386 186 L386 166';

/** Organe, denen Alkohol schadet. */
export default function AlkoholOrgane() {
  return (
    <Zeichnung titel="Oberkörper von vorn mit den Organen, denen Alkohol schadet: Gehirn und Nerven, Herz mit Blutdruck, Leber und Bauchspeicheldrüse">
      <path d={RUMPF} {...KONTUR} fill={F.petrol} />
      <circle cx="360" cy="112" r="56" {...KONTUR} fill={F.petrol} />

      {/* Gehirn */}
      <path
        d="M318 108 C312 78 340 64 360 70 C382 62 410 78 404 108 C410 126 392 140 360 136 C330 140 312 126 318 108 Z"
        fill={F.kupferHell}
        stroke={F.kupfer}
        strokeWidth="3"
      />
      <path d="M360 72 L360 134 M334 96 q10 8 0 18 M386 96 q-10 8 0 18" fill="none" stroke={F.kupfer} strokeWidth="2.5" strokeLinecap="round" />

      {/* Herz, etwas links im Körper (im Bild rechts) */}
      <path
        d="M384 300 C360 284 346 262 356 246 C364 232 380 234 388 246 C396 234 414 232 420 248 C428 266 410 286 384 300 Z"
        fill={F.kupferHell}
        stroke={F.kupfer}
        strokeWidth="3"
      />

      {/* Leber, rechts im Körper (im Bild links) */}
      <path
        d="M268 330 C300 316 360 316 404 326 C392 352 352 372 318 380 C290 386 270 372 266 352 Z"
        fill={F.kupferHell}
        stroke={F.kupfer}
        strokeWidth="3"
      />

      {/* Bauchspeicheldrüse */}
      <path
        d="M324 426 C350 414 392 412 430 404 C442 402 446 414 436 420 C404 434 366 440 334 442 C318 442 316 430 324 426 Z"
        fill={F.kupferHell}
        stroke={F.kupfer}
        strokeWidth="3"
      />

      <Zeiger von={[218, 96]} nach={[322, 104]} />
      <Etikett x={40} y={92}>
        Gehirn,
      </Etikett>
      <Etikett x={40} y={122}>
        Nerven
      </Etikett>

      <Zeiger von={[520, 262]} nach={[412, 262]} />
      <Etikett x={530} y={258}>
        Herz
      </Etikett>
      <Unterzeile x={530} y={290}>
        Blutdruck steigt
      </Unterzeile>

      <Zeiger von={[180, 350]} nach={[276, 348]} />
      <Etikett x={40} y={358}>
        Leber
      </Etikett>

      <Zeiger von={[520, 440]} nach={[432, 414]} />
      <Etikett x={530} y={438}>
        Bauch-
      </Etikett>
      <Etikett x={530} y={468}>
        speicheldrüse
      </Etikett>

      <Unterzeile x={360} y={640} anker="middle">
        Dazu steigt das Risiko für mehrere Krebsarten
      </Unterzeile>
    </Zeichnung>
  );
}
