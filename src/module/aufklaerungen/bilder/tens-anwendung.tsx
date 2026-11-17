import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';
import { Elektrode, Haken, Impuls, KOERPER, Schmerzzone } from './tens-teile';

/** Stärke-Skala: drei Abschnitte von links nach rechts. */
const SKALA_Y = 548;
const SKALA_H = 40;

/** Ein Stück Haut: die Schmerzstelle liegt zwischen zwei Elektroden; darunter die richtige Stärke. */
export default function TensAnwendung() {
  return (
    <Zeichnung titel="Ein Stück Haut mit einer schmerzenden Stelle in der Mitte und je einer Elektrode links und rechts davon, mindestens drei Zentimeter Abstand; darunter eine Skala von kaum spürbar über kräftiges Kribbeln, das richtig ist, bis unangenehm">
      <Etikett x={360} y={58} anker="middle" farbe={F.kupferHell}>
        Schmerzstelle zwischen den Elektroden
      </Etikett>

      {/* Hautstück */}
      <rect x="60" y="88" width="600" height="250" rx="44" {...KOERPER} />
      <Schmerzzone cx={360} cy={213} rx={130} ry={95} />
      <Impuls x={308} y={213} breite={104} hoehe={24} />

      <Elektrode x={180} y={213} groesse={60} />
      <Elektrode x={540} y={213} groesse={60} />

      {/* Abstand */}
      <path d="M210 352 L210 412 M510 352 L510 412" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <Pfeil d="M360 392 L218 392" farbe={F.linie} breite={4} />
      <Pfeil d="M360 392 L502 392" farbe={F.linie} breite={4} />
      <Etikett x={360} y={446} anker="middle">
        mind. 3 cm Abstand
      </Etikett>

      {/* Stärke-Skala */}
      <rect x="80" y={SKALA_Y} width="186" height={SKALA_H} rx="12" fill={F.petrolDunkel} />
      <rect x="267" y={SKALA_Y} width="186" height={SKALA_H} rx="12" fill={F.petrolHell} />
      <rect x="454" y={SKALA_Y} width="186" height={SKALA_H} rx="12" fill={F.kupfer} />
      <rect x="80" y={SKALA_Y} width="560" height={SKALA_H} rx="12" {...KONTUR} />
      <path d={`M266.5 ${SKALA_Y} V${SKALA_Y + SKALA_H} M453.5 ${SKALA_Y} V${SKALA_Y + SKALA_H}`} {...KONTUR} strokeWidth="3" />
      <Haken x={360} y={SKALA_Y + SKALA_H / 2} groesse={28} />
      <path
        d={`M535 ${SKALA_Y + 10} L559 ${SKALA_Y + 30} M559 ${SKALA_Y + 10} L535 ${SKALA_Y + 30}`}
        stroke={F.linie}
        strokeWidth="5"
        strokeLinecap="round"
      />

      <Etikett x={360} y={530} anker="middle">
        kräftiges Kribbeln
      </Etikett>
      <Unterzeile x={173} y={620} anker="middle">
        kaum spürbar
      </Unterzeile>
      <Unterzeile x={547} y={620} anker="middle" farbe={F.kupferHell}>
        unangenehm
      </Unterzeile>
    </Zeichnung>
  );
}
