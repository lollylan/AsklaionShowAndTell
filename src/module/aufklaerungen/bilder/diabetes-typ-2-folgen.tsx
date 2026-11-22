import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Körperumriss von vorn, Mitte bei x = 360. */
const KOERPER =
  'M342 166 L342 190 Q282 194 266 222 L236 398 Q234 418 252 420 L274 300 L280 430 L290 656 Q306 670 322 656 L350 470 L370 470 L398 656 Q414 670 430 656 L440 430 L446 300 L468 420 Q486 418 484 398 L454 222 Q438 194 378 190 L378 166';

/** Folgen von dauerhaft zu hohem Zucker: Gehirn, Augen, Herz, Nieren, Nerven und Füße. */
export default function DiabetesFolgen() {
  return (
    <Zeichnung titel="Umriss eines Menschen mit den Stellen, an denen dauerhaft hoher Zucker schadet: Gehirn mit Schlaganfall, Augen, Herz mit Herzinfarkt, Nieren sowie Nerven und Füße">
      <path d={KOERPER} {...KONTUR} fill={F.petrol} />
      <circle cx="360" cy="114" r="54" {...KONTUR} fill={F.petrol} />

      {/* Gehirn */}
      <path d="M326 96 Q330 70 360 68 Q390 70 394 96 Z" fill={F.kupfer} opacity="0.9" />
      {/* Augen */}
      <circle cx="342" cy="118" r="7" fill={F.kupferHell} />
      <circle cx="378" cy="118" r="7" fill={F.kupferHell} />
      {/* Herz */}
      <path
        d="M386 262 C372 248 352 258 358 276 C362 288 378 298 386 306 C394 298 410 288 414 276 C420 258 400 248 386 262 Z"
        fill={F.kupfer}
      />
      {/* Nieren */}
      <ellipse cx="330" cy="356" rx="14" ry="24" fill={F.kupferHell} />
      <ellipse cx="390" cy="356" rx="14" ry="24" fill={F.kupferHell} />
      {/* Nerven bis in die Füße */}
      <path d="M318 470 L306 650" stroke={F.kupferHell} strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      <path d="M402 470 L414 650" stroke={F.kupferHell} strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      <ellipse cx="306" cy="656" rx="20" ry="9" fill={F.kupfer} />
      <ellipse cx="414" cy="656" rx="20" ry="9" fill={F.kupfer} />

      <Etikett x={40} y={66}>
        Gehirn
      </Etikett>
      <Unterzeile x={40} y={94}>
        Schlaganfall
      </Unterzeile>
      <Zeiger von={[178, 80]} nach={[340, 86]} />

      <Etikett x={520} y={112}>
        Augen
      </Etikett>
      <Unterzeile x={520} y={140}>
        Sehen lässt nach
      </Unterzeile>
      <Zeiger von={[512, 118]} nach={[386, 118]} />

      <Etikett x={520} y={262}>
        Herz
      </Etikett>
      <Unterzeile x={520} y={290}>
        Herzinfarkt
      </Unterzeile>
      <Zeiger von={[512, 272]} nach={[404, 274]} />

      <Etikett x={40} y={350}>
        Nieren
      </Etikett>
      <Unterzeile x={40} y={378}>
        arbeiten schlechter
      </Unterzeile>
      <Zeiger von={[214, 360]} nach={[316, 356]} />

      <Etikett x={40} y={560}>
        Nerven und Füße
      </Etikett>
      <Unterzeile x={40} y={588}>
        Wunden heilen schlecht
      </Unterzeile>
      <Zeiger von={[200, 600]} nach={[296, 648]} />

      <Etikett x={680} y={560} anker="end" farbe={F.kupferHell}>
        Gute Werte
      </Etikett>
      <Unterzeile x={680} y={588} anker="end">
        beugen vor
      </Unterzeile>
    </Zeichnung>
  );
}
