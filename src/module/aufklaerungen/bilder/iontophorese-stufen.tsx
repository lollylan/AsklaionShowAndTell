import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Stufen der Behandlung gegen starkes Schwitzen; die Iontophorese ist hervorgehoben. */
const STUFEN = [
  { titel: 'Antitranspirant', zeile: 'mit Aluminiumchlorid, abends' },
  { titel: 'Leitungswasser-Iontophorese', zeile: 'zu Hause, ohne Medikamente', hier: true },
  { titel: 'Botulinumtoxin-Spritzen', zeile: 'wirken einige Monate' },
  { titel: 'Cremes oder Tabletten', zeile: 'die das Schwitzen bremsen' },
];

const X = 80;
const OBEN = 170;
const ABSTAND = 130;

export default function IontophoreseStufen() {
  return (
    <Zeichnung titel="Behandlung gegen starkes Schwitzen in Stufen: zuerst ein Antitranspirant mit Aluminiumchlorid, dann die Leitungswasser-Iontophorese, dann Spritzen mit Botulinumtoxin, dann Cremes oder Tabletten">
      <Etikett x={40} y={70}>
        Was hilft gegen starkes Schwitzen?
      </Etikett>
      <Unterzeile x={40} y={102}>
        Reicht eine Stufe nicht, kommt die nächste.
      </Unterzeile>
      <line x1={X} y1={OBEN} x2={X} y2={OBEN + 3 * ABSTAND} stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
      {STUFEN.map((s, i) => {
        const y = OBEN + i * ABSTAND;
        return (
          <g key={s.titel}>
            {s.hier && <rect x={X - 50} y={y - 54} width={640} height={108} rx="18" fill="none" stroke={F.kupfer} strokeWidth="4" />}
            <circle cx={X} cy={y} r="32" fill={s.hier ? F.kupfer : F.petrol} stroke={F.linie} strokeWidth="4" />
            <text x={X} y={y + 11} textAnchor="middle" fontSize="30" fontWeight="700" fill={F.linie}>
              {i + 1}
            </text>
            <Etikett x={X + 60} y={y - 2} farbe={s.hier ? F.kupferHell : F.linie}>
              {s.titel}
            </Etikett>
            <Unterzeile x={X + 60} y={y + 28}>
              {s.zeile}
            </Unterzeile>
          </g>
        );
      })}
    </Zeichnung>
  );
}
