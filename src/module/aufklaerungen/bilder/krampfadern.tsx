import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Beinvene im Längsschnitt: gesund mit schließender Klappe, als Krampfader erweitert mit undichter Klappe. */
export default function Krampfadern() {
  return (
    <Zeichnung titel="Zwei Beinvenen im Längsschnitt: links gesund, die Venenklappe schließt und das Blut fließt zum Herzen; rechts eine erweiterte Krampfader, die Klappe schließt nicht und das Blut sackt zurück">
      {/* Gesunde Vene */}
      <rect x="130" y="150" width="100" height="410" fill={F.petrolDunkel} />
      <path d="M130 150 L130 560 M230 150 L230 560" {...KONTUR} />
      <path d="M132 392 C150 370 166 352 178 336" {...KONTUR} />
      <path d="M228 392 C210 370 194 352 182 336" {...KONTUR} />
      <Pfeil d="M180 530 L180 430" />
      <Pfeil d="M180 300 L180 200" />

      {/* Krampfader: erweitert, geschlängelt */}
      <path
        d="M440 150 C430 220 400 260 410 350 C420 440 390 480 440 560 L600 560 C650 480 620 440 630 350 C640 260 610 220 600 150 Z"
        fill={F.petrolDunkel}
      />
      <path
        d="M410 380 C420 440 390 480 440 560 L600 560 C650 480 620 440 628 380 Z"
        fill={F.kupfer}
        fillOpacity="0.45"
      />
      <path d="M440 150 C430 220 400 260 410 350 C420 440 390 480 440 560" {...KONTUR} />
      <path d="M600 150 C610 220 640 260 630 350 C620 440 650 480 600 560" {...KONTUR} />
      <path d="M414 392 C436 374 458 360 480 350" {...KONTUR} />
      <path d="M626 392 C604 374 582 360 560 350" {...KONTUR} />
      <Pfeil d="M470 530 L470 460" farbe={F.leise} breite={3} />
      <Pfeil d="M520 230 L520 440" farbe={F.kupferHell} breite={6} />

      <Etikett x={180} y={70} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={180} y={102} anker="middle">
        Klappe schließt
      </Unterzeile>
      <Etikett x={520} y={70} anker="middle" farbe={F.kupferHell}>
        Krampfader
      </Etikett>
      <Unterzeile x={520} y={102} anker="middle">
        Klappe schließt nicht
      </Unterzeile>

      <Etikett x={360} y={630} anker="middle">
        Das Blut sackt zurück ins Bein
      </Etikett>
      <Unterzeile x={360} y={664} anker="middle">
        Die Vene weitet sich, das Bein wird schwer
      </Unterzeile>
    </Zeichnung>
  );
}
