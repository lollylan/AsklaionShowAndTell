import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Hals von vorn mit vergrößerter Schilddrüse, daneben ein übervoller Hormon-Füllstand – Gegenstück zur Unterfunktion. */
export default function Schilddruesenueberfunktion() {
  return (
    <Zeichnung titel="Hals von vorn mit der schmetterlingsförmigen, etwas vergrößerten Schilddrüse unter dem Kehlkopf, daneben eine Anzeige, deren Füllstand über die Normallinie hinausreicht: zu viel Schilddrüsenhormon">
      <g transform="translate(0 20)">
        {/* Hals und Schultern */}
        <path
          d="M150 130 L150 330 C148 380 100 410 40 440 L40 480 L420 480 L420 440 C360 410 312 380 310 330 L310 130 Z"
          fill={F.petrol}
        />
        <path d="M150 147 L150 330 C148 380 100 410 40 440" {...KONTUR} />
        <path d="M310 147 L310 330 C312 380 360 410 420 440" {...KONTUR} />

        {/* Untergesicht mit Kinn */}
        <path d="M120 40 C120 120 160 190 230 190 C300 190 340 120 340 40 Z" fill={F.petrol} />
        <path d="M120 40 C120 120 160 190 230 190 C300 190 340 120 340 40" {...KONTUR} />
        <path d="M200 112 Q230 128 260 112" {...KONTUR} stroke={F.leise} />

        {/* Luftröhre und Kehlkopf */}
        <rect x="214" y="296" width="32" height="154" fill={F.petrolHell} />
        <path d="M214 296 L214 450 M246 296 L246 450" {...KONTUR} />
        <path d="M214 412 L246 412 M214 432 L246 432" {...KONTUR} stroke={F.leise} strokeWidth="3" />
        <path d="M208 250 Q230 240 252 250 L246 296 Q230 302 214 296 Z" {...KONTUR} fill={F.petrolHell} />

        {/* Schilddrüse, etwas größer als bei der Unterfunktion */}
        <path
          d="M230 342 C221 338 212 322 201 302 C184 284 162 296 162 330 C162 372 180 402 202 402 C218 402 222 380 230 376 C238 380 242 402 258 402 C280 402 298 372 298 330 C298 296 276 284 259 302 C248 322 239 338 230 342 Z"
          {...KONTUR}
          fill={F.kupfer}
        />
        {/* angedeutete Wärme */}
        <path d="M118 290 Q108 310 118 330 Q128 350 118 370" fill="none" stroke={F.kupferHell} strokeWidth="4" strokeLinecap="round" />
        <path d="M342 290 Q352 310 342 330 Q332 350 342 370" fill="none" stroke={F.kupferHell} strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Füllstand: über die Normallinie hinaus */}
      <rect x="520" y="60" width="110" height="200" rx="20" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      <rect x="528" y="72" width="94" height="180" rx="12" fill={F.kupfer} />
      <path d="M520 150 L630 150" fill="none" stroke={F.creme} strokeWidth="3" strokeDasharray="8 8" />
      <Pfeil d="M575 136 L575 84" farbe={F.creme} breite={5} />
      <Unterzeile x={508} y={157} anker="end">
        normal
      </Unterzeile>
      <Unterzeile x={575} y={296} anker="middle" farbe={F.linie}>
        Schilddrüsenhormon:
      </Unterzeile>
      <Etikett x={575} y={330} anker="middle" farbe={F.kupferHell}>
        zu viel
      </Etikett>

      <Zeiger von={[442, 412]} nach={[284, 376]} />
      <Etikett x={450} y={420}>
        Schilddrüse
      </Etikett>

      <Etikett x={40} y={580}>
        Der Körper läuft auf Hochtouren
      </Etikett>
      <Unterzeile x={40} y={616}>
        Herzrasen, Unruhe, Schwitzen, Zittern
      </Unterzeile>
    </Zeichnung>
  );
}
