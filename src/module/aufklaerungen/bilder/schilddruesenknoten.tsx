import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Schilddrüse als Schmetterling, gleiche Form wie bei der Unterfunktion. */
const SCHILDDRUESE =
  'M230 340 C222 336 214 322 204 306 C190 290 172 300 172 330 C172 365 186 392 204 392 ' +
  'C218 392 222 372 230 368 C238 372 242 392 256 392 C274 392 288 365 288 330 ' +
  'C288 300 270 290 256 306 C246 322 238 336 230 340 Z';

/** Hals von vorn mit einem Knoten im rechten Lappen, daneben vergrößert wie im Ultraschall. */
export default function Schilddruesenknoten() {
  return (
    <Zeichnung titel="Hals von vorn mit der Schilddrüse, in einem Lappen sitzt ein Knoten; daneben ein vergrößerter Ausschnitt des Lappens mit dem Knoten wie im Ultraschall">
      <defs>
        <clipPath id="schilddruesenknoten-lupe">
          <circle cx="540" cy="250" r="128" />
        </clipPath>
      </defs>

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
        <path
          d="M208 250 Q230 240 252 250 L246 296 Q230 302 214 296 Z"
          {...KONTUR}
          fill={F.petrolHell}
        />

        {/* Schilddrüse mit Knoten */}
        <path d={SCHILDDRUESE} {...KONTUR} fill={F.petrolHell} />
        <circle cx="262" cy="346" r="15" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
      </g>

      {/* Verbindung zur Vergrößerung */}
      <path
        d="M268 352 L438 172 M268 380 L522 377"
        fill="none"
        stroke={F.leise}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Vergrößerter Lappen */}
      <circle cx="540" cy="250" r="130" fill={F.tief} />
      <g clipPath="url(#schilddruesenknoten-lupe)">
        <ellipse cx="530" cy="260" rx="86" ry="118" fill={F.petrolHell} stroke={F.leise} strokeWidth="4" />
        <circle cx="550" cy="282" r="44" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      </g>
      <circle cx="540" cy="250" r="130" {...KONTUR} />

      <Unterzeile x={540} y={100} anker="middle">
        im Ultraschall
      </Unterzeile>

      <Zeiger von={[610, 412]} nach={[572, 312]} />
      <Etikett x={610} y={442} anker="middle" farbe={F.kupferHell}>
        Knoten
      </Etikett>

      <Zeiger von={[96, 530]} nach={[190, 380]} />
      <Etikett x={40} y={562}>
        Schilddrüse
      </Etikett>

      <Etikett x={40} y={632}>
        Knoten sind häufig
      </Etikett>
      <Unterzeile x={40} y={668}>
        Über 95 von 100 sind gutartig.
      </Unterzeile>
    </Zeichnung>
  );
}
