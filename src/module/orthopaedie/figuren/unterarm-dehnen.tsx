import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2): Arm gestreckt nach vorn, das Handgelenk gebeugt,
// die andere Hand drückt Handrücken und Finger sanft Richtung Körper.

export default function UnterarmDehnen() {
  return (
    <Uebungsbild titel="Arm gestreckt nach vorn, das Handgelenk ist gebeugt, die andere Hand drückt den Handrücken sanft zum Körper.">
      <Bildvorlage datei="unterarm-dehnen.jpg">
        <Hinweis x={150} y={130} anker="start">
          Ellenbogen gestreckt
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
