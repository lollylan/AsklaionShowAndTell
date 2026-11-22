import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const M = 360;
const R = 150;

const punkt = (grad: number) => {
  const w = (grad * Math.PI) / 180;
  return `${Math.round(M + R * Math.cos(w))} ${Math.round(M + R * Math.sin(w))}`;
};
const bogen = (von: number, bis: number) => `M${punkt(von)} A${R} ${R} 0 0 1 ${punkt(bis)}`;

/** Der Kreislauf nach einem Sturz: Angst, weniger Bewegung, schwächer, neuer Sturz. */
export default function StuerzeKreislauf() {
  return (
    <Zeichnung titel="Kreislauf: Nach einem Sturz kommt Angst vor dem nächsten, man bewegt sich weniger, wird schwächer und stürzt leichter wieder. In der Mitte: in Bewegung bleiben und trainieren">
      <Etikett x={360} y={56} anker="middle">
        Der Kreislauf nach einem Sturz
      </Etikett>

      {[-90, 0, 90, 180].map((g) => (
        <Pfeil key={g} d={bogen(g + 16, g + 74)} farbe={F.leise} breite={5} />
      ))}

      <circle cx={360} cy={210} r="20" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <circle cx={510} cy={360} r="20" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <circle cx={360} cy={510} r="20" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <circle cx={210} cy={360} r="20" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />

      <Etikett x={360} y={170} anker="middle" farbe={F.kupferHell}>
        Sturz
      </Etikett>
      <Etikett x={542} y={360}>
        Angst
      </Etikett>
      <Unterzeile x={542} y={390}>
        vor dem nächsten
      </Unterzeile>
      <Etikett x={360} y={570} anker="middle">
        Weniger Bewegung
      </Etikett>
      <Etikett x={178} y={360} anker="end">
        Schwächer
      </Etikett>
      <Unterzeile x={178} y={390} anker="end">
        weniger Kraft
      </Unterzeile>

      <Etikett x={360} y={350} anker="middle">
        Durchbrechen:
      </Etikett>
      <Unterzeile x={360} y={382} anker="middle">
        in Bewegung
      </Unterzeile>
      <Unterzeile x={360} y={408} anker="middle">
        bleiben, üben
      </Unterzeile>
    </Zeichnung>
  );
}
