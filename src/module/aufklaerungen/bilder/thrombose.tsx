import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Längsschnitt durch eine Beinvene mit Venenklappen: ein Gerinnsel verstopft sie, das Blut staut sich. */
export default function Thrombose() {
  return (
    <Zeichnung titel="Längsschnitt durch eine Beinvene mit Venenklappen: ein Blutgerinnsel verstopft die Vene, davor staut sich das Blut auf dem Weg zum Herzen">
      {/* Vene */}
      <rect x="40" y="250" width="640" height="200" fill={F.petrolDunkel} />
      <rect x="40" y="238" width="640" height="12" fill={F.petrolHell} />
      <rect x="40" y="450" width="640" height="12" fill={F.petrolHell} />
      {[238, 250, 450, 462].map((y) => (
        <line key={y} x1="40" y1={y} x2="680" y2={y} stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      ))}

      {/* Venenklappen, öffnen sich in Richtung Herz */}
      <path d="M60 250 C80 290 115 320 145 338" {...KONTUR} />
      <path d="M60 450 C80 410 115 380 145 362" {...KONTUR} />
      <path d="M505 250 C525 290 560 320 590 338" {...KONTUR} />
      <path d="M505 450 C525 410 560 380 590 362" {...KONTUR} />

      {/* Das Blut staut sich vor dem Gerinnsel */}
      <Pfeil d="M170 320 L245 320" breite={5} />
      <Pfeil d="M170 350 L245 350" breite={5} />
      <Pfeil d="M170 380 L245 380" breite={5} />

      {/* Gerinnsel */}
      <path
        d="M270 350 C262 300 290 262 340 262 C380 256 430 262 455 290 C478 318 478 384 455 412 C430 440 380 446 335 440 C290 436 276 400 270 350 Z"
        fill={F.kupfer}
        stroke={F.linie}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Dahinter fließt kaum noch Blut */}
      <Pfeil d="M612 350 L662 350" farbe={F.leise} breite={3} />

      <Etikett x={40} y={62}>
        Vene im Bein
      </Etikett>
      <Unterzeile x={40} y={94}>
        führt das Blut zurück zum Herzen
      </Unterzeile>

      <Etikett x={370} y={160} anker="middle" farbe={F.kupferHell}>
        Blutgerinnsel
      </Etikett>
      <Unterzeile x={370} y={190} anker="middle">
        verstopft die Vene
      </Unterzeile>
      <Zeiger von={[370, 202]} nach={[370, 300]} />

      <Unterzeile x={600} y={220} anker="end">
        zum Herzen
      </Unterzeile>
      <Pfeil d="M612 212 L666 212" farbe={F.leise} breite={3} />

      <Zeiger von={[200, 506]} nach={[208, 412]} />
      <Etikett x={40} y={532}>
        Das Blut staut sich
      </Etikett>
      <Unterzeile x={40} y={562}>
        Das Bein schwillt an und schmerzt
      </Unterzeile>

      <Zeiger von={[560, 506]} nach={[544, 398]} />
      <Etikett x={680} y={532} anker="end">
        Venenklappe
      </Etikett>

      <Etikett x={40} y={640} farbe={F.kupferHell}>
        Teile können in die Lunge wandern
      </Etikett>
      <Unterzeile x={40} y={672}>
        Dann wird es gefährlich (Lungenembolie)
      </Unterzeile>
    </Zeichnung>
  );
}
