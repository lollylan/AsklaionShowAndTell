import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Mit dem Vorfuß auf einer Stufenkante (Kante bei x 360), Blick nach rechts, eine Hand an der Wand.
// Geist: oben im Zehenstand. Voll: Fersen langsam unter die Stufenkante abgesenkt.
// Damit Stufe und Figur ins Bild passen, ist die Szene auf 85 % verkleinert.

export default function FersenHebenStufe() {
  return (
    <Uebungsbild titel="Fersen absenken auf der Stufe: Mit dem Vorfuß auf einer Stufenkante stehen und die Fersen langsam unter die Stufenkante sinken lassen.">
      <Bildvorlage datei="fersen-heben-stufe.jpg">
        <Hinweis x={248} y={300} anker="end">
          langsam
        </Hinweis>
        <Hinweis x={248} y={330} anker="end">
          absenken
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
