import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Kopf und Hals von der Seite, Blick nach rechts. Der Kopf gleitet waagrecht nach hinten
// (Doppelkinn), der Blick bleibt geradeaus. Blass: der vorgeschobene Kopf.

export default function KinnZurueck() {
  return (
    <Uebungsbild titel="Kopf von der Seite: Das Kinn wird waagrecht nach hinten geschoben, der Blick bleibt geradeaus.">
      <Bildvorlage datei="kinn-zurueck.jpg">
        <Hinweis x={760} y={170} anker="end">
          Blick geradeaus
        </Hinweis>
        <Hinweis x={640} y={345} anker="middle">
          Kinn nach hinten
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
