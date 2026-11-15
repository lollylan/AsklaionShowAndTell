import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Die drei Bogengänge des Gleichgewichtsorgans als Röhren. */
const BOGENGAENGE = [
  // vorderer, nach oben
  'M290 362 C250 260 270 160 330 160 C390 160 410 260 362 356',
  // seitlicher, nach rechts
  'M392 368 C430 310 560 280 580 340 C596 392 480 410 404 396',
  // hinterer, nach unten – hier sammeln sich die Kristalle
  'M370 446 C390 520 470 600 530 570 C590 540 540 460 398 430',
];

const SCHNECKE =
  'M262 440 C220 466 140 450 128 510 C116 570 200 594 232 546 C254 510 212 484 186 504 C166 520 182 546 204 534';

/** Innenohr schematisch: Bogengänge mit losen Kristallen im unteren Bogengang. */
export default function Lagerungsschwindel() {
  return (
    <Zeichnung titel="Gleichgewichtsorgan im Innenohr mit drei Bogengängen; im unteren Bogengang liegen lose Kristalle, die bei Kopfbewegungen rollen">
      <Etikett x={40} y={80}>
        Gleichgewichtsorgan im Innenohr
      </Etikett>

      {/* Hörschnecke, nebensächlich */}
      <path d={SCHNECKE} fill="none" stroke={F.leise} strokeWidth="30" strokeLinecap="round" />
      <path d={SCHNECKE} fill="none" stroke={F.petrolDunkel} strokeWidth="22" strokeLinecap="round" />

      {/* Bogengänge als Röhren: helle Kontur, Petrol innen */}
      {BOGENGAENGE.map((d) => (
        <path key={`k-${d}`} d={d} fill="none" stroke={F.linie} strokeWidth="34" strokeLinecap="round" />
      ))}
      {BOGENGAENGE.map((d) => (
        <path key={`i-${d}`} d={d} fill="none" stroke={F.petrol} strokeWidth="24" strokeLinecap="round" />
      ))}

      {/* Vorhof in der Mitte */}
      <ellipse cx="320" cy="400" rx="80" ry="56" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      {/* Kristalle an ihrem richtigen Platz */}
      <g fill={F.creme}>
        <circle cx="296" cy="392" r="5" />
        <circle cx="310" cy="386" r="5" />
        <circle cx="324" cy="384" r="5" />
        <circle cx="338" cy="386" r="5" />
        <circle cx="352" cy="392" r="5" />
      </g>

      {/* Gelöste Kristalle im unteren Bogengang */}
      <g fill={F.kupfer} stroke={F.kupferHell} strokeWidth="2">
        <circle cx="483" cy="572" r="6" />
        <circle cx="498" cy="578" r="5" />
        <circle cx="512" cy="574" r="6" />
        <circle cx="494" cy="566" r="4" />
      </g>

      <Zeiger von={[444, 178]} nach={[378, 186]} />
      <Etikett x={452} y={186}>
        Bogengänge
      </Etikett>

      <Zeiger von={[112, 614]} nach={[140, 566]} />
      <Unterzeile x={60} y={644}>
        Hörschnecke
      </Unterzeile>

      <Zeiger von={[580, 622]} nach={[514, 586]} />
      <Etikett x={680} y={654} anker="end" farbe={F.kupferHell}>
        Lose Kristalle
      </Etikett>
      <Unterzeile x={680} y={686} anker="end">
        rollen bei Kopfbewegung
      </Unterzeile>
    </Zeichnung>
  );
}
