import { Bildvorlage, Hinweis, Uebungsbild } from './figur';

// Generiertes Bild (kie.ai, Nano Banana 2) nach der früheren Baukasten-Skizze. Ursprünglich:
// Langsitz auf der Matte, Hände hinten aufgestützt, eine Handtuchrolle unter dem Knie.
// Geist: Knie locker gebeugt. Voll: Kniekehle in die Rolle gedrückt, Ferse hebt ab, Zehen angezogen.

export default function QuadrizepsAnspannen() {
  return (
    <Uebungsbild titel="Oberschenkel anspannen: Im Sitzen mit gestrecktem Bein die Kniekehle fest in eine Handtuchrolle drücken, Zehen anziehen, halten.">
      <Bildvorlage datei="quadrizeps-anspannen.jpg">
        <Hinweis x={770} y={70} anker="end">
          Kniekehle nach unten drücken
        </Hinweis>
      </Bildvorlage>
    </Uebungsbild>
  );
}
