import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Seitlage, von vorn gesehen: Kopf links auf dem Kissen, das obere (nahe) Bein hebt gestreckt ab.
// Die Matte wird nach der Figur gezeichnet, das Kissen verdeckt das Gesicht (Blick zum Betrachter).

export default function SeitlageAbspreizen() {
  return (
    <Uebungsbild titel="Bein in Seitlage anheben: Auf der Seite liegen, das obere Bein gestreckt langsam anheben und wieder senken.">
      <Bildvorlage datei="seitlage-abspreizen.jpg">
        <Hinweis x={400} y={150} anker="middle">
          Bein gestreckt anheben
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
