import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Rechter Fuß von oben gesehen, Zehen oben, Großzehe links (innen).
// Geist: Großzehe zu den anderen Zehen hin geneigt (Ballenzeh). Voll: Großzehe aktiv nach innen
// gezogen, die kleinen Zehen leicht gespreizt.

export default function GrosszeheSpreizen() {
  return (
    <Uebungsbild titel="Großzehe nach innen ziehen: Fuß von oben gesehen. Die Großzehe aktiv von den anderen Zehen weg nach innen bewegen, die Zehen spreizen.">
      <Bildvorlage datei="grosszehe-spreizen.jpg">
        <Hinweis x={260} y={250} anker="end">
          Großzehe
        </Hinweis>
        <Hinweis x={260} y={280} anker="end">
          nach innen
        </Hinweis>
        <Hinweis x={560} y={330}>
          Fuß von oben
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
