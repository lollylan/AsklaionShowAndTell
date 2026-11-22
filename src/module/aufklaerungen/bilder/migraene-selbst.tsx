import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const ZELLE = 70;
const ABSTAND = 10;
const X0 = 85;
const Y0 = 150;
/** Tage mit Kopfschmerz- oder Migränemittel im Beispielmonat. */
const MITTEL = new Set([3, 4, 11, 16, 17, 24, 29]);

/** Kopfschmerzkalender: Schmerzmittel an höchstens zehn Tagen im Monat. */
export default function MigraeneSelbst() {
  const tage = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <Zeichnung titel="Ein Monatskalender als Kopfschmerztagebuch: An sieben Tagen ist ein Mittel eingetragen; die Regel lautet höchstens zehn Tage im Monat">
      <Etikett x={360} y={90} anker="middle">
        Kopfschmerzkalender
      </Etikett>

      {tage.map((t) => {
        const i = t - 1;
        const x = X0 + (i % 7) * (ZELLE + ABSTAND);
        const y = Y0 + Math.floor(i / 7) * (ZELLE + ABSTAND);
        const mit = MITTEL.has(t);
        return (
          <g key={t}>
            <rect x={x} y={y} width={ZELLE} height={ZELLE} rx="10" {...KONTUR} strokeWidth="2" stroke={F.leise} fill={mit ? F.kupfer : F.petrolDunkel} />
            <text x={x + 10} y={y + 26} fontSize="20" fill={mit ? F.tief : F.leise}>
              {t}
            </text>
            {mit && (
              <g transform={`translate(${x + 42} ${y + 46}) rotate(-30)`}>
                <rect x="-18" y="-8" width="36" height="16" rx="8" fill={F.kupferHell} stroke={F.linie} strokeWidth="2" />
              </g>
            )}
          </g>
        );
      })}

      <rect x="85" y="586" width="36" height="36" rx="8" fill={F.kupfer} stroke={F.leise} strokeWidth="2" />
      <Etikett x={136} y={604} farbe={F.kupferHell}>
        Tag mit Schmerzmittel
      </Etikett>
      <Unterzeile x={136} y={636}>
        höchstens 10 Tage im Monat
      </Unterzeile>
    </Zeichnung>
  );
}
