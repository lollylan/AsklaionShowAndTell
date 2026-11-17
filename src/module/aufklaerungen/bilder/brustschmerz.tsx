import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

// Herzform um den Nullpunkt (wie in herzschwaeche.tsx), etwa 226 breit und 220 hoch.
const HERZ =
  'M0 -55 C-18 -105 -92 -108 -110 -55 C-130 5 -70 60 0 125 C70 60 130 5 110 -55 C92 -108 18 -105 0 -55 Z';

const RIPPEN = [240, 290, 340, 390];

/** Oberkörper von vorn: Lunge, Herz, Speiseröhre, Magen und Rippen liegen eng beieinander. */
export default function Brustschmerz() {
  return (
    <Zeichnung titel="Oberkörper von vorn mit Lunge, Herz, Speiseröhre, Magen und Rippen: Alles liegt eng beieinander, jedes davon kann Brustschmerz machen; das Herz wird zuerst geprüft">
      {/* Kopf und Rumpf */}
      <circle cx="360" cy="80" r="42" {...KONTUR} fill={F.petrolDunkel} />
      <path
        d="M330 118 L330 160 C290 166 250 176 232 200 C222 260 224 420 230 560 L490 560 C496 420 498 260 488 200 C470 176 430 166 390 160 L390 118 Z"
        {...KONTUR}
        fill={F.petrolDunkel}
      />

      {/* Lunge */}
      <path d="M345 205 C300 200 262 220 254 280 C246 350 250 420 262 470 C290 480 325 472 345 455 Z" {...KONTUR} fill={F.petrol} />
      <path d="M375 205 C420 200 458 220 466 280 C474 350 470 420 458 470 C430 480 400 472 380 455 Z" {...KONTUR} fill={F.petrol} />

      {/* Rippen und Brustbein */}
      <g fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round">
        {RIPPEN.map((y) => (
          <g key={y}>
            <path d={`M232 ${y} Q290 ${y - 34} 350 ${y - 10}`} />
            <path d={`M488 ${y} Q430 ${y - 34} 370 ${y - 10}`} />
          </g>
        ))}
        <rect x="350" y="200" width="20" height="200" rx="8" />
      </g>

      {/* Zwerchfell, Speiseröhre und Magen */}
      <path d="M240 490 Q300 465 360 488 Q420 465 482 490" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <path d="M360 126 L360 480 Q364 502 400 512" fill="none" stroke={F.creme} strokeWidth="8" strokeLinecap="round" />
      <path d="M398 502 C438 492 474 506 472 530 C470 552 432 556 408 542 C394 534 392 512 398 502 Z" {...KONTUR} fill={F.petrolHell} />

      {/* Herz */}
      <g transform="translate(395 395) scale(0.5)">
        <path d={HERZ} fill={F.kupfer} stroke={F.linie} strokeWidth="8" strokeLinejoin="round" />
      </g>

      <Zeiger von={[115, 192]} nach={[290, 300]} />
      <Etikett x={40} y={200}>
        Lunge
      </Etikett>

      <Zeiger von={[560, 246]} nach={[362, 172]} />
      <Etikett x={690} y={200} anker="end">
        Speiseröhre
      </Etikett>
      <Unterzeile x={690} y={230} anker="end">
        und Magen
      </Unterzeile>

      <Zeiger von={[140, 428]} nach={[244, 386]} />
      <Etikett x={40} y={420}>
        Rippen
      </Etikett>
      <Unterzeile x={40} y={450}>
        und Muskeln
      </Unterzeile>

      <Zeiger von={[526, 410]} nach={[425, 395]} />
      <Etikett x={690} y={400} anker="end" farbe={F.kupferHell}>
        Herz
      </Etikett>
      <Unterzeile x={690} y={430} anker="end">
        zuerst prüfen
      </Unterzeile>

      <Etikett x={360} y={640} anker="middle">
        Vieles liegt eng beieinander
      </Etikett>
    </Zeichnung>
  );
}
