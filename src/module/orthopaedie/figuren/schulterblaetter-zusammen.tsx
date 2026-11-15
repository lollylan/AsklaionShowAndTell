import { Bildvorlage, F, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Oberkörper von hinten. Die Schulterblätter (Dreiecke) rücken zur Wirbelsäule und nach unten.

export default function SchulterblaetterZusammen() {
  return (
    <Uebungsbild titel="Oberkörper von hinten: Die Schulterblätter werden nach hinten unten zur Wirbelsäule gezogen.">
      <Bildvorlage datei="schulterblaetter-zusammen.jpg">
        <Hinweis x={600} y={390}>
          nach hinten
        </Hinweis>
        <Hinweis x={600} y={420}>
          und unten
        </Hinweis>
        <text x={40} y={50} fontSize="22" fill={F.leise} fontFamily="Merriweather, serif">
          Blick von hinten
        </text>
      </Bildvorlage>
    </Uebungsbild>
  );
}
