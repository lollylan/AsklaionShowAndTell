import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Bauchlage, Kopf rechts. Geist: flach liegend. Voll: auf die Unterarme gestützt (Ellenbogen
// unter den Schultern), das Becken bleibt auf der Matte – der untere Rücken streckt sich.

export default function BauchlageAufstuetzen() {
  return (
    <Uebungsbild titel="Oberkörper in Bauchlage aufstützen: Auf dem Bauch liegen, den Oberkörper auf die Unterarme stützen, Becken bleibt liegen, locker atmen.">
      <Bildvorlage datei="bauchlage-aufstuetzen.jpg">
        <Hinweis x={300} y={445} anker="middle">
          Becken bleibt liegen
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
