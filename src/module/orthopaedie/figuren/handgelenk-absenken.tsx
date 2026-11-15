import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze: der Unterarm
// liegt auf dem Tisch, nur die Hand mit der Hantel senkt sich über der Kante ab.

export default function HandgelenkAbsenken() {
  return (
    <Uebungsbild titel="Unterarm liegt auf dem Tisch, die Hand mit der Hantel hängt über die Kante und wird langsam abgesenkt.">
      <Bildvorlage datei="handgelenk-absenken.jpg">
        <Hinweis x={760} y={470} anker="end">
          langsam absenken
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
