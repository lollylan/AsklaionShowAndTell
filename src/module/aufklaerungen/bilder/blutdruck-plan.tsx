import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const ZEITEN = [
  { name: 'morgens', y: 236 },
  { name: 'abends', y: 360 },
];

const X0 = 200;
const SPALTE = 70;
const BREITE = 58;
const HOEHE = 96;

/** Messtagebuch: eine Woche lang morgens und abends je zwei Messungen. */
export default function BlutdruckPlan() {
  return (
    <Zeichnung titel="Messtagebuch für eine Woche vor dem Termin: jeden Tag von Montag bis Sonntag morgens und abends je zwei Messungen; zu Hause gilt der Blutdruck ab 135 zu 85 als erhöht">
      <Etikett x={360} y={62} anker="middle">
        Eine Woche vor dem Termin
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        jedes Mal zweimal messen, 1 Minute Pause
      </Unterzeile>

      {TAGE.map((t, i) => (
        <Etikett key={t} x={X0 + i * SPALTE + BREITE / 2} y={208} anker="middle">
          {t}
        </Etikett>
      ))}

      {ZEITEN.map((z) => (
        <g key={z.name}>
          <Etikett x={40} y={z.y + HOEHE / 2 + 9}>
            {z.name}
          </Etikett>
          {TAGE.map((t, i) => {
            const x = X0 + i * SPALTE;
            return (
              <g key={t}>
                <rect x={x} y={z.y} width={BREITE} height={HOEHE} rx="12" fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" />
                <circle cx={x + BREITE / 2} cy={z.y + 30} r="12" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
                <circle cx={x + BREITE / 2} cy={z.y + 66} r="12" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
              </g>
            );
          })}
        </g>
      ))}

      <Unterzeile x={40} y={510}>
        morgens: vor Frühstück und Tabletten
      </Unterzeile>
      <Unterzeile x={40} y={540}>
        abends: vor dem Abendessen
      </Unterzeile>

      <rect x={40} y={572} width={640} height={112} rx="16" fill="none" stroke={F.kupfer} strokeWidth="4" />
      <Etikett x={360} y={618} anker="middle" farbe={F.kupferHell}>
        Zu Hause erhöht ab 135/85
      </Etikett>
      <Unterzeile x={360} y={656} anker="middle" farbe={F.linie}>
        es zählt der Durchschnitt der Woche
      </Unterzeile>
    </Zeichnung>
  );
}
