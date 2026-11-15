import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Zwei Beinvenen im Längsschnitt: gesund mit dicht schließenden Klappen, ausgeleiert mit undichten Klappen. */
export default function Venenschwaeche() {
  return (
    <Zeichnung titel="Zwei Beinvenen im Längsschnitt: In der gesunden Vene schließen die Klappen dicht und das Blut fließt nach oben zum Herzen, in der ausgeleierten Vene schließen sie nicht mehr und das Blut fließt zurück nach unten">
      {/* Gesunde Vene */}
      <rect x="130" y="170" width="120" height="390" fill={F.petrolDunkel} />
      <path d="M130 170 L130 560 M250 170 L250 560" {...KONTUR} />
      <path d="M130 300 C145 280 170 262 187 255 M250 300 C235 280 210 262 193 255" {...KONTUR} />
      <path d="M130 470 C145 450 170 432 187 425 M250 470 C235 450 210 432 193 425" {...KONTUR} />
      <Pfeil d="M190 410 L190 318" />
      <Pfeil d="M190 236 L190 186" />

      {/* Ausgeleierte Vene */}
      <path
        d="M450 170 C430 280 430 420 450 560 L590 560 C610 420 610 280 590 170 Z"
        fill={F.petrolDunkel}
      />
      <path d="M450 170 C430 280 430 420 450 560 M590 170 C610 280 610 420 590 560" {...KONTUR} />
      <path d="M437 290 C450 270 480 255 498 248 M603 290 C590 270 560 255 542 248" {...KONTUR} />
      <path d="M437 421 C450 401 480 386 498 379 M603 421 C590 401 560 386 542 379" {...KONTUR} />
      <Pfeil d="M520 196 L520 300" farbe={F.kupferHell} />
      <Pfeil d="M520 330 L520 470" farbe={F.kupferHell} />

      <Etikett x={190} y={80} anker="middle">
        Gesunde Vene
      </Etikett>
      <Unterzeile x={190} y={112} anker="middle">
        Klappen schließen dicht
      </Unterzeile>
      <Etikett x={520} y={80} anker="middle" farbe={F.kupferHell}>
        Schwache Vene
      </Etikett>
      <Unterzeile x={520} y={112} anker="middle">
        Blut fließt zurück
      </Unterzeile>

      <Unterzeile x={360} y={640} anker="middle">
        Gehen pumpt das Blut mit der Wade nach oben
      </Unterzeile>
    </Zeichnung>
  );
}
