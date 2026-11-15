import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Halber Kniestand, Blick nach rechts: hinteres (nahes) Knie auf der Matte, vorderer Fuß flach.
// Geist: Becken über dem hinteren Knie. Voll: Becken nach vorn geschoben – vorn an der Hüfte zieht es.

export default function HueftbeugerDehnen() {
  return (
    <Uebungsbild titel="Hüftbeuger dehnen: Im halben Kniestand das Becken langsam nach vorn schieben, bis es vorn an der Hüfte des hinteren Beins zieht. Oberkörper bleibt aufrecht.">
      <Bildvorlage datei="hueftbeuger-dehnen.jpg">
        <Hinweis x={620} y={120} anker="middle">
          Becken nach vorn
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
