import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Arm als dicker Strich mit heller Kontur. */
function Arm({ d, farbe }: { d: string; farbe: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={F.linie} strokeWidth={34} />
      <path d={d} stroke={farbe} strokeWidth={26} />
    </g>
  );
}

/** Der FAST-Test: Gesicht, Arme, Sprache – und keine Zeit verlieren. */
export default function SchlaganfallFast() {
  return (
    <Zeichnung titel="Figur von vorn für den FAST-Test: Ein Mundwinkel hängt herab, beim Heben beider Arme sinkt ein Arm ab, die Sprache ist verwaschen. Darunter: sofort 112 rufen und die Uhrzeit merken">
      {/* Arme: links gehalten, rechts sinkt ab */}
      <Arm d="M300 284 L150 284" farbe={F.petrol} />
      <Arm d="M420 284 L556 346" farbe={F.kupfer} />

      {/* Rumpf, Hals, Kopf */}
      <path d="M292 266 Q360 248 428 266 L418 520 Q360 532 302 520 Z" {...KONTUR} fill={F.petrol} />
      <rect x="342" y="226" width="36" height="34" {...KONTUR} fill={F.petrol} />
      <circle cx="360" cy="160" r="72" {...KONTUR} fill={F.petrol} />

      {/* Gesicht mit hängendem Mundwinkel */}
      <circle cx="334" cy="146" r="7" fill={F.linie} />
      <circle cx="386" cy="146" r="7" fill={F.linie} />
      <path d="M322 186 Q340 202 360 200" {...KONTUR} />
      <path d="M360 200 Q380 200 396 216" {...KONTUR} stroke={F.kupferHell} />

      {/* Sprechblase mit verwaschener Sprache */}
      <path
        d="M70 140 Q70 120 90 120 L240 120 Q260 120 260 140 L260 186 Q260 206 240 206 L276 228 L210 206 L90 206 Q70 206 70 186 Z"
        fill={F.petrolDunkel}
        stroke={F.leise}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M96 164 q10 -14 20 0 t20 0 t20 0 m16 0 q8 -10 16 0 t16 0 m14 0 q10 -14 20 0 t20 0"
        fill="none"
        stroke={F.kupferHell}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Etikett x={40} y={62}>
        Sprache
      </Etikett>
      <Unterzeile x={40} y={94}>
        verwaschen, falsche Wörter?
      </Unterzeile>

      <Zeiger von={[480, 196]} nach={[398, 214]} />
      <Etikett x={490} y={162}>
        Gesicht
      </Etikett>
      <Unterzeile x={490} y={192}>
        Mundwinkel hängt?
      </Unterzeile>

      <Zeiger von={[540, 420]} nach={[556, 352]} />
      <Etikett x={490} y={452}>
        Arme
      </Etikett>
      <Unterzeile x={490} y={482}>
        Ein Arm sinkt ab?
      </Unterzeile>

      <line x1="40" y1="572" x2="680" y2="572" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />
      <Etikett x={360} y={626} anker="middle" farbe={F.kupferHell}>
        Zeit: sofort 112 rufen
      </Etikett>
      <Unterzeile x={360} y={660} anker="middle">
        Uhrzeit merken – auch wenn es wieder vergeht
      </Unterzeile>
    </Zeichnung>
  );
}
