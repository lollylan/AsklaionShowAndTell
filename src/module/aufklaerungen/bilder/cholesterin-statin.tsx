import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const LEBER =
  'M60 330 Q66 250 170 240 Q290 230 340 270 Q356 300 320 340 Q250 430 150 452 Q74 462 62 400 Z';

/** Wie ein Statin wirkt: Die Leber bildet weniger Cholesterin und holt mehr LDL aus dem Blut. */
export default function CholesterinStatin() {
  return (
    <Zeichnung titel="Wirkort der Statine: Die Tablette bremst in der Leber die Bildung von Cholesterin. Dadurch holt die Leber mehr LDL aus dem Blut, und in der Ader schwimmt weniger LDL">
      {/* Tablette */}
      <g transform="translate(150 140) rotate(-30)">
        <rect x="-46" y="-20" width="92" height="40" rx="20" fill={F.kupfer} />
        <path d="M0 -20 L0 20" stroke={F.tief} strokeWidth="3" />
        <rect x="-46" y="-20" width="92" height="40" rx="20" {...KONTUR} strokeWidth={3} />
      </g>
      <Etikett x={226} y={128}>
        Statin
      </Etikett>
      <Unterzeile x={226} y={156}>
        wirkt in der Leber
      </Unterzeile>
      <Pfeil d="M170 186 L188 236" farbe={F.kupferHell} breite={4} />

      <path d={LEBER} {...KONTUR} fill={F.petrol} />
      <Etikett x={190} y={350} anker="middle">
        Leber
      </Etikett>

      {/* Ader mit LDL */}
      <rect x="540" y="200" width="120" height="380" rx="20" fill={F.tief} />
      <path d="M540 200 L540 580 M660 200 L660 580" {...KONTUR} />
      {[
        [576, 262],
        [628, 330],
        [584, 470],
        [626, 530],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="13" fill={F.kupferHell} />
      ))}
      <Etikett x={600} y={180} anker="middle">
        Blut
      </Etikett>

      {/* Bildung gebremst */}
      <path d="M346 292 L526 292" stroke={F.leise} strokeWidth="4" strokeDasharray="4 10" strokeLinecap="round" />
      <path d="M436 270 L436 314" stroke={F.kupfer} strokeWidth="8" strokeLinecap="round" />
      <Unterzeile x={436} y={256} anker="middle">
        bildet weniger
      </Unterzeile>

      {/* LDL wird aus dem Blut geholt */}
      <Pfeil d="M526 420 L330 420" farbe={F.linie} breite={5} />
      <Unterzeile x={436} y={460} anker="middle">
        holt LDL heraus
      </Unterzeile>

      <Etikett x={360} y={650} anker="middle" farbe={F.kupferHell}>
        Weniger LDL im Blut
      </Etikett>
      <Unterzeile x={360} y={680} anker="middle">
        Das schützt die Adern
      </Unterzeile>
    </Zeichnung>
  );
}
