import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Sitzen, die Ferse liegt vorn auf einem Hocker. Die Hand zieht die Zehen zum Schienbein –
// die Sehnenplatte der Fußsohle dehnt sich.

export default function FusssohleDehnen() {
  return (
    <Uebungsbild titel="Fußsohle dehnen: Im Sitzen die Ferse vorn auflegen, mit der Hand die Zehen zum Schienbein ziehen und halten.">
      <Bildvorlage datei="fusssohle-dehnen.jpg">
        <Hinweis x={560} y={270}>
          Zehen zurückziehen
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
