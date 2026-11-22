import { Etikett, F, Folge, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const M = 360;
const R = 160;

/** Punkt auf dem Kreis, Winkel in Grad (0 = rechts, im Uhrzeigersinn). */
const punkt = (grad: number) => {
  const w = (grad * Math.PI) / 180;
  return `${Math.round(M + R * Math.cos(w))} ${Math.round(M + R * Math.sin(w))}`;
};
const bogen = (von: number, bis: number) => `M${punkt(von)} A${R} ${R} 0 0 1 ${punkt(bis)}`;

/** In Bewegung: Beginn des Schritts i in Sekunden (Station, Pfeil, Station … und zuletzt der Ausweg). */
const TAKT = 0.65;
const ab = (i: number) => 0.7 + i * TAKT;

/** Der Juck-Kratz-Kreislauf und wie man ihn durchbricht. */
export default function NeurodermitisKreislauf() {
  return (
    <Zeichnung titel="Kreislauf aus vier Schritten: Juckreiz führt zu Kratzen, die Haut reißt auf, sie entzündet sich, und die Entzündung juckt wieder. In der Mitte: kühlen oder drücken statt kratzen">
      <Etikett x={360} y={56} anker="middle">
        Der Juck-Kratz-Kreislauf
      </Etikett>

      {/* In Bewegung läuft der Kreislauf reihum, der Ausweg in der Mitte kommt zuletzt. */}
      {[-90, 0, 90, 180].map((g, i) => (
        <Folge key={g} ab={ab(i * 2 + 1)}>
          <Pfeil d={bogen(g + 16, g + 74)} farbe={F.leise} breite={5} />
        </Folge>
      ))}

      {/* Stationen */}
      <Folge ab={ab(0)}>
        <circle cx={360} cy={200} r="20" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
        <Etikett x={360} y={160} anker="middle" farbe={F.kupferHell}>
          Juckreiz
        </Etikett>
      </Folge>
      <Folge ab={ab(2)}>
        <circle cx={520} cy={360} r="20" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
        <Etikett x={552} y={369} farbe={F.kupferHell}>
          Kratzen
        </Etikett>
      </Folge>
      <Folge ab={ab(4)}>
        <circle cx={360} cy={520} r="20" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
        <Etikett x={360} y={580} anker="middle">
          Haut reißt auf
        </Etikett>
        <Unterzeile x={360} y={610} anker="middle">
          Keime dringen leichter ein
        </Unterzeile>
      </Folge>
      <Folge ab={ab(6)}>
        <circle cx={200} cy={360} r="20" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
        <Etikett x={168} y={369} anker="end">
          Entzündung
        </Etikett>
      </Folge>

      {/* Ausweg */}
      <Folge ab={ab(8) + 0.3} von={0} dauer={1.2}>
        <Etikett x={360} y={348} anker="middle">
          Durchbrechen:
        </Etikett>
        <Unterzeile x={360} y={380} anker="middle">
          kühlen oder drücken
        </Unterzeile>
        <Unterzeile x={360} y={406} anker="middle">
          statt kratzen
        </Unterzeile>
      </Folge>
    </Zeichnung>
  );
}
