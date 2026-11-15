import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Geist: sitzt vorn auf dem Stuhl, Füße unter den Knien, Arme nach vorn gestreckt.
// Voll: steht ohne Hilfe der Hände auf.

export default function AufstehenStuhl() {
  return (
    <Uebungsbild titel="Aufstehen vom Stuhl ohne Hände: Arme nach vorn strecken, Oberkörper etwas nach vorn neigen und aus den Beinen aufstehen.">
      <Bildvorlage datei="aufstehen-stuhl.jpg">
        <Hinweis x={600} y={270}>
          ohne Hände
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
