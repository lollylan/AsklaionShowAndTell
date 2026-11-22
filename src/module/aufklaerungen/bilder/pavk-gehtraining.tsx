import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Eine Gehstrecke als Balken, am Ende ein Kupferpunkt für den einsetzenden Schmerz. */
function Strecke({ von, bis, y }: { von: number; bis: number; y: number }) {
  return (
    <g>
      <rect x={von} y={y} width={bis - von} height="40" rx="20" fill={F.petrolHell} />
      <circle cx={bis - 20} cy={y + 20} r="11" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
    </g>
  );
}

/** Pause zwischen zwei Strecken: zwei senkrechte Striche. */
function Pause({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={F.leise} strokeWidth="5" strokeLinecap="round">
      <line x1={x - 6} y1={y + 8} x2={x - 6} y2={y + 32} />
      <line x1={x + 6} y1={y + 8} x2={x + 6} y2={y + 32} />
    </g>
  );
}

/** Intervall-Gehtraining: gehen bis zum Schmerz, kurz stehen, weitergehen – mit der Zeit werden die Strecken länger. */
export default function PavkGehtraining() {
  return (
    <Zeichnung titel="Gehtraining als Balken: Heute gehen Sie kurze Strecken bis der Schmerz kommt, bleiben kurz stehen und gehen weiter. Nach einigen Wochen werden die Strecken ohne Schmerz deutlich länger">
      <Etikett x={40} y={58}>
        Gehen – kurz stehen – weitergehen
      </Etikett>

      <Etikett x={40} y={170}>
        Am Anfang
      </Etikett>
      <Strecke von={40} bis={210} y={196} />
      <Pause x={250} y={196} />
      <Strecke von={290} bis={460} y={196} />
      <Pause x={500} y={196} />
      <Strecke von={540} bis={680} y={196} />

      <Zeiger von={[190, 300]} nach={[190, 238]} />
      <Unterzeile x={40} y={330} farbe={F.kupferHell}>
        Der Schmerz kommt
      </Unterzeile>
      <Zeiger von={[500, 300]} nach={[500, 240]} />
      <Unterzeile x={500} y={330} anker="middle">
        kurz stehen bleiben
      </Unterzeile>

      <Etikett x={40} y={430}>
        Nach einigen Wochen
      </Etikett>
      <Strecke von={40} bis={420} y={456} />
      <Pause x={460} y={456} />
      <Strecke von={500} bis={680} y={456} />
      <Unterzeile x={40} y={540}>
        Sie kommen weiter, bevor es weh tut
      </Unterzeile>

      <line x1="40" y1="590" x2="680" y2="590" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />
      <Etikett x={360} y={640} anker="middle">
        Am besten täglich, 30 bis 60 Minuten
      </Etikett>
    </Zeichnung>
  );
}
