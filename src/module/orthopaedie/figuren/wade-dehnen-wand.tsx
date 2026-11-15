import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Schrittstellung vor der Wand, Blick nach rechts. Das hintere (nahe) Bein ist gestreckt,
// die Ferse bleibt am Boden – die Wade dehnt sich.

export default function WadeDehnenWand() {
  return (
    <Uebungsbild titel="Wade dehnen an der Wand: Hände an die Wand, ein Bein weit nach hinten, die hintere Ferse bleibt am Boden, Becken Richtung Wand schieben.">
      <Bildvorlage datei="wade-dehnen-wand.jpg">
        <Hinweis x={40} y={440} anker="start">
          Ferse bleibt unten
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
