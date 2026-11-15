import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Aufrecht auf dem Stuhl. Geist: Fuß am Boden. Voll: Bein gestreckt, Zehen angezogen.

export default function BeinStreckenSitz() {
  return (
    <Uebungsbild titel="Bein strecken im Sitzen: Aufrecht auf dem Stuhl sitzen, ein Bein langsam ganz strecken, die Zehen anziehen und kurz halten.">
      <Bildvorlage datei="bein-strecken-sitz.jpg">
        <Hinweis x={600} y={420}>
          Zehen anziehen
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
