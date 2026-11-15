import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Vierfüßlerstand, Kopf rechts: Hände unter den Schultern, Knie unter den Hüften.
// Die Gliederpuppe hat einen geraden Rumpf; für Katzenbuckel und Pferderücken wird sie hier
// im selben Stil nachgezeichnet, mit gebogenem Rücken.

export default function KatzeKuh() {
  return (
    <Uebungsbild titel="Katzenbuckel und Pferderücken: Im Vierfüßlerstand den Rücken abwechselnd rund nach oben machen und sanft durchhängen lassen.">
      <Bildvorlage datei="katze-kuh.jpg">
        <Hinweis x={400} y={66} anker="middle">
          rund machen – durchhängen lassen
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
