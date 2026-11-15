import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Hals von vorn mit Schilddrüse, daneben ein fast leerer Hormon-Füllstand. */
export default function Schilddruesenunterfunktion() {
  return (
    <Zeichnung titel="Hals von vorn mit der schmetterlingsförmigen Schilddrüse unter dem Kehlkopf, daneben eine Anzeige mit niedrigem Füllstand für zu wenig Schilddrüsenhormon">
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
        <path
          d="M208 250 Q230 240 252 250 L246 296 Q230 302 214 296 Z"
          {...KONTUR}
          fill={F.petrolHell}
        />

        {/* Schilddrüse */}
        <path
          d="M230 340 C222 336 214 322 204 306 C190 290 172 300 172 330 C172 365 186 392 204 392 C218 392 222 372 230 368 C238 372 242 392 256 392 C274 392 288 365 288 330 C288 300 270 290 256 306 C246 322 238 336 230 340 Z"
          {...KONTUR}
          fill={F.kupfer}
        />
      </g>

      {/* Füllstand */}
      <rect x="520" y="60" width="110" height="200" rx="20" fill={F.tief} stroke={F.linie} strokeWidth="4" />
      <rect x="528" y="222" width="94" height="30" rx="12" fill={F.kupfer} />
      <path
        d="M520 110 L630 110"
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeDasharray="8 8"
      />
      <Unterzeile x={508} y={117} anker="end">
        normal
      </Unterzeile>
      <Unterzeile x={575} y={296} anker="middle" farbe={F.linie}>
        Schilddrüsenhormon:
      </Unterzeile>
      <Etikett x={575} y={330} anker="middle" farbe={F.kupferHell}>
        zu wenig
      </Etikett>

      <Zeiger von={[442, 412]} nach={[276, 368]} />
      <Etikett x={450} y={420}>
        Schilddrüse
      </Etikett>

      <Etikett x={40} y={580}>
        Der Körper läuft auf Sparflamme
      </Etikett>
      <Unterzeile x={40} y={616}>
        müde, frierend, langsam
      </Unterzeile>
    </Zeichnung>
  );
}
