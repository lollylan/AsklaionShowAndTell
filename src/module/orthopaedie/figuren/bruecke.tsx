import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Rückenlage, Kopf links. Schultern bleiben auf der Matte, das Becken hebt sich.

export default function Bruecke() {
  return (
    <Uebungsbild titel="Beckenbrücke: In Rückenlage mit aufgestellten Beinen das Becken anheben, bis Schultern, Hüfte und Knie eine Linie bilden.">
      <Bildvorlage datei="bruecke.jpg">
        <Hinweis x={400} y={465} anker="middle">
          Gesäß anspannen, Becken heben
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
