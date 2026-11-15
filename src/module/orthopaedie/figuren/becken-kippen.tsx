import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Rückenlage, Kopf links, Beine aufgestellt. Das Becken kippt nach hinten, der untere Rücken
// drückt sich flach auf die Matte.

export default function BeckenKippen() {
  return (
    <Uebungsbild titel="Becken kippen: In Rückenlage mit aufgestellten Beinen den unteren Rücken flach auf die Matte drücken, kurz halten, wieder lösen.">
      <Bildvorlage datei="becken-kippen.jpg">
        <Hinweis x={400} y={110} anker="middle">
          Rücken flach auf die Matte
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
