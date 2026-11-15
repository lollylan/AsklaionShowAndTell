import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const GEFAESS = {
  fill: 'none',
  stroke: F.creme,
  strokeWidth: 6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Gehirn von der Seite, Stirn links: ein Gerinnsel verstopft ein Hirngefäß, der Bereich dahinter bekommt kein Blut. */
export default function Schlaganfall() {
  return (
    <Zeichnung titel="Gehirn von der Seite: ein Blutgerinnsel verstopft ein Gefäß, der Teil des Gehirns dahinter bekommt kein Blut mehr. Darunter die Warnzeichen Gesicht, Arm und Sprache">
      {/* Kleinhirn und Hirnstamm */}
      <path d="M402 380 L410 486 L452 486 L458 380 Z" {...KONTUR} fill={F.petrolDunkel} />
      <ellipse cx="505" cy="400" rx="66" ry="40" {...KONTUR} fill={F.petrolDunkel} />

      {/* Großhirn */}
      <path
        d="M150 300 C130 200 220 120 340 115 C470 110 580 170 585 270 C588 330 560 370 520 385 C480 400 440 395 400 400 C330 410 250 410 200 390 C165 375 155 340 150 300 Z"
        {...KONTUR}
        fill={F.petrol}
      />

      {/* Windungen */}
      <g fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round">
        <path d="M205 215 C240 195 262 235 300 215" />
        <path d="M262 160 C300 148 322 188 360 168" />
        <path d="M420 150 C450 172 472 150 505 176" />
        <path d="M480 205 C510 225 530 210 556 236" />
        <path d="M330 250 C352 230 380 262 404 240" />
        <path d="M470 330 C500 320 520 345 548 330" />
      </g>

      {/* Unterversorgter Bereich hinter dem Gerinnsel */}
      <path
        d="M176 300 C170 250 200 228 240 238 C282 248 302 300 292 340 C282 380 232 386 202 370 C184 356 180 330 176 300 Z"
        fill={F.kupfer}
        fillOpacity="0.6"
      />

      {/* Hirngefäße */}
      <path d="M430 486 L428 440 C426 410 415 380 395 365" {...GEFAESS} />
      <path d="M395 365 C392 300 380 240 360 180" {...GEFAESS} />
      <path d="M380 250 C410 222 440 202 470 184" {...GEFAESS} />
      <path d="M395 365 C440 330 490 290 540 252" {...GEFAESS} />
      <path d="M395 365 C368 362 342 358 318 350" {...GEFAESS} />
      {/* Dahinter kommt kein Blut mehr an */}
      <path
        d="M300 344 C268 332 222 312 180 272"
        fill="none"
        stroke={F.leise}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="10 12"
      />

      {/* Gerinnsel */}
      <ellipse cx="312" cy="348" rx="22" ry="17" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />

      <Etikett x={40} y={62} farbe={F.kupferHell}>
        Hier fehlt Blut
      </Etikett>
      <Unterzeile x={40} y={92}>
        Nervenzellen gehen zugrunde
      </Unterzeile>
      <Zeiger von={[150, 106]} nach={[222, 282]} />

      <Zeiger von={[250, 446]} nach={[306, 362]} />
      <Etikett x={40} y={474}>
        Blutgerinnsel
      </Etikett>
      <Unterzeile x={40} y={504}>
        verstopft ein Gefäß im Gehirn
      </Unterzeile>

      <Etikett x={360} y={630} anker="middle" farbe={F.kupferHell}>
        Gesicht, Arm oder Sprache gestört?
      </Etikett>
      <Unterzeile x={360} y={664} anker="middle">
        Sofort 112 – jede Minute zählt
      </Unterzeile>
    </Zeichnung>
  );
}
