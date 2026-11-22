import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const LINKS = 60;
/** Pixel je Prozent Gewichtsabnahme. */
const PRO_PROZENT = 17;

const ZEILEN = [
  { y: 190, titel: 'Essen, Bewegung, Gewohnheiten', von: 5, bis: 10 },
  { y: 340, titel: 'Abnehmspritze', von: 10, bis: 20 },
  { y: 490, titel: 'Magenoperation', von: 25, bis: 30 },
];

/** Wie viel Gewicht die Behandlungen im Schnitt bringen. */
export default function AdipositasBehandlung() {
  return (
    <Zeichnung titel="Drei Balken: Mit Ernährung, Bewegung und neuen Gewohnheiten nimmt man im Schnitt 5 bis 10 Prozent ab, mit einer Abnehmspritze etwa 10 bis 20 Prozent, nach einer Magenoperation 25 bis 30 Prozent">
      <Etikett x={40} y={66}>
        Wie viel Gewicht weniger?
      </Etikett>
      <Unterzeile x={40} y={98}>
        im Schnitt, vom Ausgangsgewicht
      </Unterzeile>

      {ZEILEN.map((z) => (
        <g key={z.titel}>
          <Etikett x={LINKS} y={z.y}>
            {z.titel}
          </Etikett>
          <rect x={LINKS} y={z.y + 20} width={z.bis * PRO_PROZENT} height="56" rx="12" fill={F.petrolHell} opacity="0.45" />
          <rect x={LINKS} y={z.y + 20} width={z.von * PRO_PROZENT} height="56" rx="12" fill={F.petrolHell} />
          <Etikett x={LINKS + z.bis * PRO_PROZENT + 16} y={z.y + 58}>
            {`${z.von}–${z.bis} %`}
          </Etikett>
        </g>
      ))}

      <Etikett x={40} y={640} farbe={F.kupferHell}>
        Schon 5 bis 10 % helfen
      </Etikett>
      <Unterzeile x={40} y={672}>
        Blutdruck, Blutzucker und Gelenke werden besser
      </Unterzeile>
    </Zeichnung>
  );
}
