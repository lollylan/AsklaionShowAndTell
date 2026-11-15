import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Vierfüßlerstand, Kopf rechts. Geist: auf allen vieren. Voll: nahen Arm nach vorn und fernes Bein
// nach hinten strecken (diagonal), der Rücken bleibt gerade.

export default function VierfuesslerDiagonal() {
  return (
    <Uebungsbild titel="Arm und Bein diagonal strecken: Im Vierfüßlerstand einen Arm nach vorn und das gegenüberliegende Bein nach hinten strecken, der Rücken bleibt gerade.">
      <Bildvorlage datei="vierfuessler-diagonal.jpg">
        <Hinweis x={400} y={110} anker="middle">
          Rücken bleibt gerade
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
