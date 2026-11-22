import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Dosisstufen (y der Stufe) über die ersten Wochen. */
const STUFEN = [500, 500, 440, 440, 380, 380, 320, 320];
const X0 = 100;
const BREITE = 560 / STUFEN.length;
const BODEN = 590;
const NEBENWIRKUNG = 'M100 300 C180 300 220 420 300 470 C360 505 500 540 660 548';

/** Mittel gegen Nervenschmerzen: niedrig beginnen, langsam steigern; Müdigkeit und Schwindel lassen nach. */
export default function PolyneuropathieBehandlung() {
  const linie = STUFEN.map((y, i) => `${i === 0 ? 'M' : 'L'}${X0 + i * BREITE} ${y} L${X0 + (i + 1) * BREITE} ${y}`).join(' ');
  return (
    <Zeichnung titel="Treppe nach oben: Das Mittel gegen Nervenschmerzen wird niedrig begonnen und in kleinen Stufen gesteigert; eine gestrichelte Linie zeigt, dass Müdigkeit und Schwindel am Anfang auftreten und nach einigen Tagen nachlassen">
      <Etikett x={360} y={70} anker="middle">
        Niedrig beginnen, langsam steigern
      </Etikett>

      {STUFEN.map((y, i) => (
        <rect key={i} x={X0 + i * BREITE} y={y} width={BREITE} height={BODEN - y} fill={F.petrol} />
      ))}
      <path d={linie} fill="none" stroke={F.linie} strokeWidth="5" strokeLinejoin="round" />
      <path d={NEBENWIRKUNG} fill="none" stroke={F.kupfer} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
      <path d="M100 150 L100 590 L660 590" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      <Etikett x={660} y={260} anker="end">
        Dosis
      </Etikett>
      <Unterzeile x={660} y={292} anker="end">
        Stufe für Stufe
      </Unterzeile>

      <Etikett x={120} y={230} farbe={F.kupferHell}>
        Müdigkeit, Schwindel
      </Etikett>
      <Unterzeile x={120} y={262}>
        lassen oft nach
      </Unterzeile>

      <Unterzeile x={660} y={630} anker="end">
        Wochen
      </Unterzeile>
    </Zeichnung>
  );
}
