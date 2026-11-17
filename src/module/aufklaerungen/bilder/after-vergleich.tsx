import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Gerinnsel } from './analvenenthrombose';
import { Analschnitt, GRENZE_Y, GrossesPolsterRechts } from './haemorrhoiden';

/** Ein Längsschnitt durch den After mit den Stellen, an denen Hämorrhoiden, Einriss, Analvenenthrombose und Analekzem sitzen. */
export default function AfterVergleich() {
  return (
    <Zeichnung titel="Längsschnitt durch Enddarm und After: Hämorrhoiden liegen innen oberhalb der Grenzlinie, ein Einriss darunter in der empfindlichen Haut des Analkanals, die Analvenenthrombose außen am Afterrand, das Analekzem auf der Haut ringsum">
      <Analschnitt>
        {/* Hämorrhoide an der linken Wand (gespiegelt) */}
        <g transform="translate(720 0) scale(-1 1)">
          <GrossesPolsterRechts />
        </g>
        {/* Einriss unterhalb der Grenzlinie */}
        <path
          d="M320 484 L300 500 L320 516 Z"
          fill={F.kupfer}
          stroke={F.kupferHell}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* gereizte, gerötete Haut ringsum */}
        {['M296 562 C240 571 172 571 140 555', 'M512 571 C540 572 562 566 582 557'].map((d) => (
          <path
            key={d}
            d={d}
            transform="translate(0 -8)"
            fill="none"
            stroke={F.kupfer}
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.9"
          />
        ))}
        <Gerinnsel schmerz={false} />
      </Analschnitt>

      <Etikett x={30} y={56} farbe={F.kupferHell}>
        Hämorrhoiden
      </Etikett>
      <Unterzeile x={30} y={86}>
        innen, kaum Schmerz
      </Unterzeile>
      <Zeiger von={[170, 98]} nach={[350, 400]} />

      <Etikett x={30} y={176} farbe={F.kupferHell}>
        Einriss (Fissur)
      </Etikett>
      <Unterzeile x={30} y={206}>
        schmerzt beim
      </Unterzeile>
      <Unterzeile x={30} y={232}>
        Stuhlgang
      </Unterzeile>
      <Zeiger von={[130, 244]} nach={[330, 502]} />

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

      <Etikett x={30} y={650} farbe={F.kupferHell}>
        Analekzem
      </Etikett>
      <Unterzeile x={30} y={680}>
        Haut ringsum
      </Unterzeile>
      <Zeiger von={[120, 622]} nach={[196, 562]} />

      <Etikett x={700} y={650} anker="end" farbe={F.kupferHell}>
        Analvenenthrombose
      </Etikett>
      <Unterzeile x={700} y={680} anker="end">
        außen, schmerzhaft
      </Unterzeile>
      <Zeiger von={[520, 624]} nach={[470, 590]} />
    </Zeichnung>
  );
}
