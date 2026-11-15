import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Hand von vorn (Handfläche), Finger geschlossen nach oben. Ein Gummiband liegt um Finger und
// Daumen; der Daumen öffnet sich gegen den Zug nach außen.

export default function DaumenOeffnen() {
  return (
    <Uebungsbild titel="Hand von vorn, ein Gummiband liegt um Finger und Daumen; der Daumen öffnet sich gegen den Zug nach außen.">
      <Bildvorlage datei="daumen-oeffnen.jpg">
        <Hinweis x={640} y={170} anker="middle">
          gegen das Gummi
        </Hinweis>
        <Hinweis x={640} y={200} anker="middle">
          nach außen
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
