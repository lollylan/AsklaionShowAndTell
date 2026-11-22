import { Etikett, F, Fluss, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Kopf im Profil, Blick nach links (wie in schlafapnoe.tsx). */
const KOPF =
  'M150 420 L150 348 C130 338 120 334 104 332 C76 334 58 318 60 292 C56 284 50 276 52 268 ' +
  'L64 256 L50 244 C48 232 56 224 58 216 L30 206 C40 186 56 168 62 150 ' +
  'C54 110 66 70 100 46 C150 10 240 24 268 84 C296 150 286 250 250 300 L250 420 Z';

/** Durch die Nase ein, gegen locker geschlossene Lippen lange aus. */
export default function CopdLippenbremse() {
  return (
    <Zeichnung titel="Kopf im Profil: Ein kurzer Pfeil zeigt das ruhige Einatmen durch die Nase, ein langer Pfeil das langsame Ausatmen gegen die locker geschlossenen Lippen. Der leichte Gegendruck hält die Bronchien offen">
      <Etikett x={360} y={64} anker="middle">
        Die Lippenbremse bei Luftnot
      </Etikett>

      <g transform="translate(400 110) scale(1.1)">
        <path d={KOPF} {...KONTUR} fill={F.petrolDunkel} />
        <path d="M96 150 q13 -9 26 0" {...KONTUR} stroke={F.leise} />
        {/* gespitzte Lippen */}
        <g className="copd-lippenbremse-lippen-form">
          <ellipse cx="50" cy="256" rx="9" ry="12" fill={F.kupferHell} stroke={F.linie} strokeWidth="3" />
        </g>
      </g>

      {/* In Bewegung zum Mitatmen: 2 s ein, 4 s aus, im Wechsel hervorgehoben (bewegung.css). */}
      {/* Einatmen durch die Nase: kurz */}
      <g className="copd-lippenbremse-ein">
        <Pfeil d="M250 318 L415 328" farbe={F.petrolHell} breite={8} />
        <Fluss d="M250 318 L400 327" klasse="copd-lippenbremse-fluss-ein" dauer={0.5} breite={6} ab={0.8} />
        <Etikett x={40} y={240}>
          1 Durch die Nase
        </Etikett>
        <Unterzeile x={40} y={272}>
          ruhig einatmen
        </Unterzeile>
      </g>

      {/* Ausatmen gegen die Lippen: lang und dünn */}
      <g className="copd-lippenbremse-aus">
        <Pfeil d="M440 400 L70 430" farbe={F.kupferHell} breite={5} />
        <Fluss d="M440 400 L84 429" klasse="copd-lippenbremse-fluss-aus" dauer={1.4} breite={6} ab={0.8} />
        <Etikett x={40} y={500} farbe={F.kupferHell}>
          2 Durch die Lippen
        </Etikett>
        <Unterzeile x={40} y={532}>
          doppelt so lang ausatmen
        </Unterzeile>
      </g>

      <Unterzeile x={360} y={664} anker="middle">
        Der leichte Gegendruck hält die Bronchien offen
      </Unterzeile>
    </Zeichnung>
  );
}
