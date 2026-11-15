import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Was nach der letzten Zigarette im Körper besser wird. */
const STATIONEN: { zeit: string; was: string }[] = [
  { zeit: 'nach 20 Minuten', was: 'Puls und Blutdruck sinken' },
  { zeit: 'nach wenigen Wochen', was: 'Kreislauf und Lunge erholen sich' },
  { zeit: 'nach einem Jahr', was: 'Herzinfarkt-Risiko halbiert' },
  { zeit: 'nach zehn Jahren', was: 'Lungenkrebs-Risiko halbiert' },
];

/** Zerbrochene Zigarette, darunter eine Zeitleiste der Erholung. */
export default function Rauchstopp() {
  return (
    <Zeichnung titel="Eine zerbrochene Zigarette, darunter eine Zeitleiste: nach 20 Minuten sinken Puls und Blutdruck, nach wenigen Wochen erholen sich Kreislauf und Lunge, nach einem Jahr ist das Herzinfarkt-Risiko halbiert, nach zehn Jahren das Lungenkrebs-Risiko">
      {/* Zerbrochene Zigarette */}
      <g transform="rotate(-6 250 104)">
        <rect x="120" y="84" width="230" height="40" rx="6" {...KONTUR} fill={F.creme} />
        <path d="M120 90 L120 118" {...KONTUR} stroke={F.leise} strokeWidth="10" />
      </g>
      <g transform="rotate(8 470 104)">
        <rect x="380" y="84" width="130" height="40" rx="6" {...KONTUR} fill={F.creme} />
        <rect x="510" y="84" width="90" height="40" rx="6" {...KONTUR} fill={F.kupferHell} />
      </g>

      {/* Zeitleiste */}
      <path d="M110 230 L110 610" {...KONTUR} stroke={F.leise} />
      {STATIONEN.map((s, i) => {
        const y = 230 + i * 125;
        return (
          <g key={s.zeit}>
            <circle cx={110} cy={y} r="16" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
            <Etikett x={150} y={y + 2}>
              {s.zeit}
            </Etikett>
            <Unterzeile x={150} y={y + 36}>
              {s.was}
            </Unterzeile>
          </g>
        );
      })}

      <Unterzeile x={360} y={690} anker="middle" farbe={F.linie}>
        Es lohnt sich in jedem Alter.
      </Unterzeile>
    </Zeichnung>
  );
}
