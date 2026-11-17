import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Elektrode, KOERPER, Verbot } from './tens-teile';

/** Oberkörper von vorn bis zum Bauch, Arme abgeschnitten; Mitte bei x = 360. */
const OBERKOERPER =
  'M332 170 L332 236 C314 248 276 252 252 266 C228 280 224 312 226 352 L232 640 ' +
  'L488 640 L494 352 C496 312 492 280 468 266 C444 252 406 248 388 236 L388 170 Z';

/** Kleines Herz, Mittelpunkt (0, 0). */
const HERZ = 'M0 18 C-26 0 -30 -16 -18 -24 C-10 -29 -2 -24 0 -16 C2 -24 10 -29 18 -24 C30 -16 26 0 0 18 Z';

/** Oberkörper von vorn: Stellen, an die keine Elektroden gehören. */
export default function TensVerbote() {
  return (
    <Zeichnung titel="Oberkörper von vorn mit durchgestrichenen Stellen: keine Elektroden vorne am Hals, nicht an Kopf und Augen und nicht quer über das Herz; wer einen Herzschrittmacher hat, nutzt TENS nur nach Rücksprache">
      <path d={OBERKOERPER} {...KOERPER} />

      {/* Kopf mit Augen */}
      <ellipse cx="360" cy="112" rx="62" ry="74" {...KOERPER} />
      <ellipse cx="338" cy="108" rx="7" ry="9" fill={F.linie} />
      <ellipse cx="382" cy="108" rx="7" ry="9" fill={F.linie} />
      <path d="M342 150 C352 158 368 158 378 150" fill="none" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />

      {/* Schlüsselbeine */}
      <path d="M346 274 C320 268 290 272 262 284 M374 274 C400 268 430 272 458 284" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />

      {/* Herz mit Elektroden links und rechts: Strom liefe quer hindurch */}
      <g transform="translate(382 392)">
        <path d={HERZ} fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" />
      </g>
      <path d="M296 392 L452 392" stroke={F.kupferHell} strokeWidth="4" strokeDasharray="10 9" strokeLinecap="round" />
      <Elektrode x={272} y={392} groesse={40} />
      <Elektrode x={452} y={392} groesse={40} />

      {/* Herzschrittmacher unter dem linken Schlüsselbein mit Sonde zum Herzen */}
      <path d="M436 330 C426 350 400 360 390 376" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <rect x="418" y="302" width="40" height="28" rx="10" {...KONTUR} stroke={F.kupferHell} strokeWidth="3" fill={F.petrolHell} />

      {/* Verbotene Stellen */}
      <Verbot cx={360} cy={108} r={40} />
      <Verbot cx={360} cy={214} r={20} />
      <Verbot cx={370} cy={392} r={34} />

      <Zeiger von={[214, 100]} nach={[318, 108]} />
      <Etikett x={30} y={84}>
        Kopf und
      </Etikett>
      <Etikett x={30} y={116}>
        Augen
      </Etikett>

      <Zeiger von={[180, 212]} nach={[340, 214]} />
      <Etikett x={30} y={204}>
        vorne
      </Etikett>
      <Etikett x={30} y={236}>
        am Hals
      </Etikett>

      <Zeiger von={[180, 486]} nach={[340, 404]} />
      <Etikett x={30} y={510}>
        quer über
      </Etikett>
      <Etikett x={30} y={542}>
        das Herz
      </Etikett>

      <Zeiger von={[560, 116]} nach={[446, 306]} />
      <Etikett x={690} y={56} anker="end" farbe={F.kupferHell}>
        Herzschrittmacher:
      </Etikett>
      <Unterzeile x={690} y={88} anker="end">
        nur nach Rücksprache
      </Unterzeile>
    </Zeichnung>
  );
}
