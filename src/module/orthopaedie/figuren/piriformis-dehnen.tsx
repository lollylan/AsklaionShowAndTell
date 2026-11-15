import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2): Rückenlage, ein Fuß steht auf der Matte, der
// Knöchel des anderen Beins liegt auf diesem Knie (Viererhaltung), das Knie sinkt nach außen.

export default function PiriformisDehnen() {
  return (
    <Uebungsbild titel="Gesäß dehnen in Rückenlage: Einen Knöchel über das andere Knie legen, das Knie sinkt sanft nach außen; für mehr Dehnung das untere Bein zur Brust ziehen.">
      <Bildvorlage datei="piriformis-dehnen.jpg">
        <Hinweis x={540} y={70} anker="middle">
          Knöchel aufs Knie
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
