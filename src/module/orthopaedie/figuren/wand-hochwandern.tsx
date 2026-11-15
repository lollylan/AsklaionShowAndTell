import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Die Szene wird verkleinert (0,8), damit der hochgestreckte Arm ins Bild passt.

export default function WandHochwandern() {
  return (
    <Uebungsbild titel="Mit dem Gesicht zur Wand: Die Finger krabbeln an der Wand langsam nach oben.">
      <Bildvorlage datei="wand-hochwandern.jpg">
        <Hinweis x={540} y={250}>
          Finger wandern
        </Hinweis>
        <Hinweis x={540} y={280}>
          langsam hoch
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
