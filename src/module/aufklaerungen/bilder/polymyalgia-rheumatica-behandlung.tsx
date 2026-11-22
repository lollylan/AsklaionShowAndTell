import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Höhe der Kortison-Dosis je Abschnitt (y-Wert der Stufe); Abschnitt 7 ist der kleine Rückfall. */
const STUFEN = [190, 270, 330, 380, 420, 450, 480, 450, 480, 505, 525, 545, 562];
const X0 = 100;
const BREITE = 560 / STUFEN.length;
const BODEN = 590;
const RUECKFALL = 7;

/** Kortison wird hoch begonnen und über viele Monate Stufe für Stufe verringert. */
export default function PolymyalgiaRheumaticaBehandlung() {
  const linie = STUFEN.map((y, i) => `${i === 0 ? 'M' : 'L'}${X0 + i * BREITE} ${y} L${X0 + (i + 1) * BREITE} ${y}`).join(' ');
  return (
    <Zeichnung titel="Treppe nach unten: Die Kortison-Dosis beginnt hoch und wird über ein Jahr in kleinen Stufen verringert; an einer Stelle steigt sie kurz wieder etwas an, weil die Beschwerden zurückkamen">
      <Etikett x={360} y={70} anker="middle">
        Kortison langsam verringern
      </Etikett>

      {STUFEN.map((y, i) => (
        <rect
          key={i}
          x={X0 + i * BREITE}
          y={y}
          width={BREITE}
          height={BODEN - y}
          fill={i === RUECKFALL ? F.kupfer : F.petrol}
          fillOpacity={i === RUECKFALL ? 0.8 : 1}
        />
      ))}
      <path d={linie} fill="none" stroke={F.linie} strokeWidth="5" strokeLinejoin="round" />
      <path d="M100 150 L100 590 L660 590" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      <Etikett x={150} y={170}>
        hoch beginnen
      </Etikett>
      <Unterzeile x={150} y={202}>
        rasch besser
      </Unterzeile>

      <Zeiger von={[500, 300]} nach={[X0 + (RUECKFALL + 0.5) * BREITE, 470]} />
      <Etikett x={680} y={244} anker="end" farbe={F.kupferHell}>
        Beschwerden zurück:
      </Etikett>
      <Unterzeile x={680} y={276} anker="end">
        wieder etwas mehr
      </Unterzeile>

      <Unterzeile x={100} y={630}>
        Start
      </Unterzeile>
      <Unterzeile x={660} y={630} anker="end">
        ein Jahr und länger
      </Unterzeile>
    </Zeichnung>
  );
}
