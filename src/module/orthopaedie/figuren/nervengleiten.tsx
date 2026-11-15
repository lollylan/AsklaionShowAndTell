import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Oberkörper von vorn, ein Arm seitlich ausgestreckt. Ziel (voll): Hand nach hinten gekippt
// wie ein Stoppzeichen, Kopf zum Arm geneigt. Blass: Hand hängt, Kopf zur anderen Seite –
// im Wechsel gleitet der Mittelnerv hin und her. Gezeichnet in Grundmaßen, dann verkleinert.

export default function Nervengleiten() {
  return (
    <Uebungsbild titel="Arm seitlich ausgestreckt, die Hand nach hinten gekippt wie ein Stoppzeichen, der Kopf neigt sich zum Arm; im Wechsel mit hängender Hand und Kopf zur anderen Seite.">
      <Bildvorlage datei="nervengleiten.jpg">
        <Hinweis x={560} y={70} anker="middle">
          im Wechsel hin und her
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
