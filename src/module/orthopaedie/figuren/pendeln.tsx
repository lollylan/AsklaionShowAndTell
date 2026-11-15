import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Ferne (gesunde) Hand stützt sich auf den Tisch.

export default function Pendeln() {
  return (
    <Uebungsbild titel="Vorgebeugt, eine Hand auf dem Tisch abgestützt, der andere Arm hängt locker und pendelt.">
      <Bildvorlage datei="pendeln.jpg">
        <Hinweis x={30} y={180}>
          locker hängen lassen
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
