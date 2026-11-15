import { Bildvorlage, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Hand von der Daumenseite, Handfläche zeigt nach rechts. Handgelenk bei (0, 0).
// Beugen dreht die Fingerglieder von 180 (nach oben) über 90 (zur Handfläche) nach 0 (unten).

export default function Sehnengleiten() {
  return (
    <Uebungsbild titel="Fünf Handstellungen nacheinander: gestreckt, Haken, Faust, Tischstellung, gerade Faust.">
      <Bildvorlage datei="sehnengleiten.jpg" />
    </Uebungsbild>
  );
}
