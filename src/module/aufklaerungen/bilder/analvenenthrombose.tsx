import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Analschnitt, GRENZE_Y } from './haemorrhoiden';

/** Blutgerinnsel außen am rechten Afterrand, wölbt die Haut vor; mit `schmerz` kleine Striche daneben. */
export function Gerinnsel({ schmerz = true }: { schmerz?: boolean }) {
  return (
    <g>
      {/* Gerinnsel außen am Afterrand unter der Haut, wölbt die Haut vor */}
      <path
        d="M404 526 L440 560 L505 566 L502 571 C498 590 484 606 452 606 C410 606 402 560 402 526 Z"
        fill={F.petrolDunkel}
      />
      <ellipse cx="450" cy="584" rx="32" ry="16" fill={F.kupfer} />
      <ellipse cx="440" cy="578" rx="10" ry="5" fill={F.kupferHell} opacity="0.7" />
      <path d="M402 520 C402 560 410 606 452 606 C484 606 498 590 502 571" {...KONTUR} />
      {/* Schmerz */}
      {schmerz &&
        [
          [522, 586, 546, 582],
          [512, 606, 532, 618],
          [486, 622, 494, 638],
        ].map(([x1, y1, x2, y2]) => (
          <line
            key={x1 + y1}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={F.kupferHell}
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
    </g>
  );
}

/** Gleicher Längsschnitt wie bei den Hämorrhoiden: innen normale Gefäßpolster, außen am Afterrand ein Blutgerinnsel unter der Haut. */
export default function Analvenenthrombose() {
  return (
    <Zeichnung titel="Längsschnitt durch Enddarm und After: Die Gefäßpolster innen sind normal, außen am Afterrand liegt unter der Haut ein schmerzhaftes Blutgerinnsel, unterhalb des Schließmuskels">
      <Analschnitt>
        <Gerinnsel />
      </Analschnitt>

      <Etikett x={30} y={56}>
        Enddarm
      </Etikett>
      <Zeiger von={[160, 48]} nach={[270, 110]} />

      <Etikett x={30} y={166}>
        Gefäßpolster
      </Etikett>
      <Unterzeile x={30} y={196}>
        innen, hier normal
      </Unterzeile>
      <Zeiger von={[120, 210]} nach={[334, 396]} />

      <Etikett x={700} y={56} anker="end">
        Grenzlinie
      </Etikett>
      <Unterzeile x={700} y={86} anker="end">
        darunter
      </Unterzeile>
      <Unterzeile x={700} y={112} anker="end">
        schmerzempfindlich
      </Unterzeile>
      <Zeiger von={[610, 124]} nach={[410, GRENZE_Y]} />

      <Etikett x={30} y={640}>
        Schließmuskel
      </Etikett>
      <Zeiger von={[120, 612]} nach={[268, 500]} />

      <Etikett x={700} y={650} anker="end" farbe={F.kupferHell}>
        Blutgerinnsel
      </Etikett>
      <Unterzeile x={700} y={680} anker="end">
        außen am Afterrand
      </Unterzeile>
    </Zeichnung>
  );
}
