import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Hand von der Daumenseite, Handfläche zeigt nach rechts. Daumen- und Zeigefingerspitze bilden
// ein rundes O. Das Daumensattelgelenk (an der Daumenwurzel) leuchtet.

export default function DaumenOForm() {
  return (
    <Uebungsbild titel="Daumen und Zeigefinger formen ein rundes O und drücken sanft gegeneinander.">
      <Bildvorlage datei="daumen-o-form.jpg">
        <Hinweis x={560} y={250}>
          sanft drücken
        </Hinweis>
        <Hinweis x={600} y={440} anker="middle">
          das O bleibt rund
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
