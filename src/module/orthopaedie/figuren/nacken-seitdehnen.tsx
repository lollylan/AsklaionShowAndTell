import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Kopf und Schultern von vorn. Der Kopf neigt sich zur rechten Bildseite (Ohr zur Schulter),
// die Schulter auf der linken Bildseite bleibt tief. Es dehnt die linke Halsseite.

export default function NackenSeitdehnen() {
  return (
    <Uebungsbild titel="Von vorn: Der Kopf neigt sich zur Seite, das Ohr Richtung Schulter, die andere Schulter bleibt tief.">
      <Bildvorlage datei="nacken-seitdehnen.jpg">
        <Hinweis x={110} y={350} anker="middle">
          Schulter tief
        </Hinweis>
        <Hinweis x={700} y={300} anker="middle">
          Ohr zur Schulter
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
