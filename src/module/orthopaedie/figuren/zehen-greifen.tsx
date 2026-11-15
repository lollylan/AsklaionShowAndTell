import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Sitzen, der Fuß steht auf einem Handtuch; die Zehen krallen sich und ziehen es heran.

export default function ZehenGreifen() {
  return (
    <Uebungsbild titel="Handtuch mit den Zehen greifen: Im Sitzen den Fuß auf ein Handtuch stellen und es mit den Zehen Stück für Stück zu sich heranziehen.">
      <Bildvorlage datei="zehen-greifen.jpg">
        <Hinweis x={560} y={350} anker="middle">
          Zehen krallen
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
