import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2): dieselbe Person zweimal von vorn. Links die
// Ausgangsstellung, Ellenbogen rechtwinklig am Körper, Hände mit dem Band vor dem Bauch;
// rechts drehen die Unterarme nach außen, die Ellenbogen bleiben am Körper.

export default function AussendrehenBand() {
  return (
    <Uebungsbild titel="Von vorn, zweimal: Ellenbogen rechtwinklig am Körper, die Unterarme drehen gegen das Übungsband nach außen.">
      <Bildvorlage datei="aussendrehen-band.jpg">
        <Hinweis x={400} y={488} anker="middle">
          Ellenbogen bleiben am Körper
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
