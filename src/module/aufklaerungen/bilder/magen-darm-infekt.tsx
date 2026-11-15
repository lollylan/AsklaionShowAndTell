import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Was der Körper verliert und was das Trinkglas ersetzt: Wasser, Salz und etwas Zucker. */
export default function MagenDarmInfekt() {
  return (
    <Zeichnung titel="Ein Trinkglas mit Lösung aus Wasser, etwas Salz und etwas Zucker; daneben der Hinweis, in kleinen Schlucken alle paar Minuten zu trinken, weil der Körper Wasser und Salze verliert">
      <Etikett x={360} y={84} anker="middle">
        Das Wichtigste: trinken
      </Etikett>
      <Unterzeile x={360} y={118} anker="middle">
        Der Körper verliert Wasser und Salze
      </Unterzeile>

      {/* Glas mit Trinklösung */}
      <path d="M262 214 L288 520 Q290 540 310 540 L410 540 Q430 540 432 520 L458 214" {...KONTUR} />
      <path d="M272 300 L290 518 Q291 530 304 530 L416 530 Q429 530 430 518 L448 300 Z" fill={F.petrolHell} />
      <path d="M272 300 Q316 286 360 300 Q404 314 448 300" {...KONTUR} stroke={F.leise} strokeWidth={3} />
      {/* gelöstes Salz und Zucker */}
      <g fill={F.creme}>
        <circle cx="318" cy="372" r="5" />
        <circle cx="392" cy="352" r="5" />
        <circle cx="356" cy="420" r="5" />
        <circle cx="402" cy="456" r="5" />
        <circle cx="322" cy="470" r="5" />
      </g>
      <g fill={F.kupferHell}>
        <rect x="338" y="336" width="11" height="11" rx="2" />
        <rect x="378" y="402" width="11" height="11" rx="2" />
        <rect x="334" y="436" width="11" height="11" rx="2" />
        <rect x="380" y="486" width="11" height="11" rx="2" />
      </g>

      <Zeiger von={[196, 300]} nach={[296, 330]} />
      <Etikett x={40} y={294}>
        Wasser
      </Etikett>
      <Unterzeile x={40} y={324}>
        oder dünner Tee
      </Unterzeile>

      <Zeiger von={[196, 420]} nach={[348, 422]} />
      <Etikett x={40} y={414}>
        etwas Salz
      </Etikett>
      <Unterzeile x={40} y={444}>
        Brühe, Salzgebäck
      </Unterzeile>

      <Zeiger von={[540, 372]} nach={[396, 406]} />
      <Etikett x={680} y={366} anker="end" farbe={F.kupferHell}>
        etwas Zucker
      </Etikett>
      <Unterzeile x={680} y={396} anker="end">
        hilft dem Darm,
      </Unterzeile>
      <Unterzeile x={680} y={424} anker="end">
        das Salz aufzunehmen
      </Unterzeile>

      <Pfeil d="M500 236 C540 200 580 200 610 232" farbe={F.leise} />
      <Unterzeile x={680} y={268} anker="end">
        Schluck für Schluck
      </Unterzeile>

      <Etikett x={360} y={620} anker="middle">
        Kleine Schlucke, alle paar Minuten
      </Etikett>
      <Unterzeile x={360} y={656} anker="middle">
        Am besten eine Trinklösung aus der Apotheke
      </Unterzeile>
    </Zeichnung>
  );
}
