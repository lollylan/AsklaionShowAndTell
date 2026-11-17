import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

// Gemeinsamer Insulin-Pen für insulin-pen, insulin-spritzen und insulin-lagern.
// Nur benannte Exporte, der default-Export ist die Zeichnung „insulin-pen“.

/** Länge des Pens in eigenen Koordinaten (Nadelspitze bei x = 0, Achse bei y = 0). */
export const PEN_LAENGE = 520;
/** Länge der Nadel vor dem Nadelkopf. */
export const NADEL_LAENGE = 40;

/**
 * Insulin-Pen liegend, Nadel nach links. Nadelspitze bei (0, 0), Ende des Auslöseknopfs bei
 * (520, 0). Mit transform verschieben, drehen und verkleinern. `dosis` steht im Fenster.
 */
export function Pen({
  dosis = '12',
  nadel = true,
  textDrehung = 0,
}: {
  dosis?: string;
  nadel?: boolean;
  /** Gegendrehung der Zahl im Fenster, damit sie bei gedrehtem Pen aufrecht steht. */
  textDrehung?: number;
}) {
  const strich = { stroke: F.linie, strokeWidth: 4, strokeLinejoin: 'round' } as const;
  return (
    <g>
      {nadel && (
        <>
          <line x1="2" y1="0" x2="44" y2="0" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
          <rect x="40" y="-15" width="30" height="30" rx="5" fill={F.kupfer} {...strich} />
        </>
      )}
      {/* Patronenhalter mit Sichtfenster */}
      <path d="M68 -20 L84 -27 L262 -27 L262 27 L84 27 L68 20 Z" fill={F.petrolHell} {...strich} />
      <rect x="102" y="-14" width="134" height="28" rx="7" fill={F.tief} stroke={F.leise} strokeWidth="3" />
      <rect x="106" y="-10" width="104" height="20" rx="4" fill={F.kupferHell} />
      <rect x="210" y="-11" width="12" height="22" rx="2" fill={F.petrolDunkel} stroke={F.leise} strokeWidth="2" />
      {/* Gehäuse mit Dosisfenster */}
      <rect x="256" y="-31" width="188" height="62" rx="10" fill={F.petrol} {...strich} />
      <rect x="328" y="-21" width="66" height="42" rx="7" fill={F.creme} stroke={F.leise} strokeWidth="3" />
      <text x="361" y="11" transform={`rotate(${textDrehung} 361 0)`} textAnchor="middle" fontSize="30" fontWeight="700" fill={F.tief}>
        {dosis}
      </text>
      {/* Drehknopf mit Rillen und Auslöseknopf */}
      <rect x="444" y="-34" width="56" height="68" rx="9" fill={F.kupfer} {...strich} />
      <g stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round">
        {[456, 468, 480, 492].map((x) => (
          <line key={x} x1={x} y1="-24" x2={x} y2="24" />
        ))}
      </g>
      <rect x="500" y="-19" width="20" height="38" rx="6" fill={F.kupferHell} {...strich} />
    </g>
  );
}

/** Äußere und innere Schutzkappe der Pen-Nadel, liegend, Öffnung nach rechts; y = Achse. */
function Kappen({ aussen, innen, y }: { aussen: number; innen: number; y: number }) {
  const strich = { stroke: F.linie, strokeWidth: 4, strokeLinejoin: 'round' } as const;
  return (
    <g>
      <path
        d={`M${aussen + 90} ${y - 26} L${aussen + 24} ${y - 26} Q${aussen} ${y - 26} ${aussen} ${y} Q${aussen} ${y + 26} ${aussen + 24} ${y + 26} L${aussen + 90} ${y + 26} Z`}
        fill={F.petrolDunkel}
        {...strich}
      />
      <path
        d={`M${innen + 50} ${y - 11} L${innen + 11} ${y - 11} Q${innen} ${y - 11} ${innen} ${y} Q${innen} ${y + 11} ${innen + 11} ${y + 11} L${innen + 50} ${y + 11} Z`}
        fill={F.petrolHell}
        {...strich}
      />
    </g>
  );
}

const S = 0.92;
const X = 220;
const Y = 380;
/** Pen-Koordinate in Bildkoordinate. */
const px = (x: number) => X + S * x;

export default function InsulinPen() {
  return (
    <Zeichnung titel="Insulin-Pen mit seinen Teilen: Nadel mit äußerer und innerer Schutzkappe, jedes Mal neu, Insulin-Patrone im Sichtfenster, Dosis-Anzeige und am Ende Drehknopf und Auslöser">
      <Kappen aussen={30} innen={142} y={Y} />
      <g transform={`translate(${X} ${Y}) scale(${S})`}>
        <Pen dosis="12" />
      </g>

      <Etikett x={30} y={230} farbe={F.kupferHell}>
        Nadel mit 2 Kappen
      </Etikett>
      <Unterzeile x={30} y={262} farbe={F.linie}>
        jedes Mal neu
      </Unterzeile>
      <Zeiger von={[px(28), 276]} nach={[px(28), Y - 4]} />

      <Etikett x={px(361)} y={170} anker="middle">
        Dosis-Anzeige
      </Etikett>
      <Zeiger von={[px(361), 188]} nach={[px(361), Y - S * 23]} />

      <Etikett x={px(170)} y={530} anker="middle">
        Insulin-Patrone
      </Etikett>
      <Zeiger von={[px(170), 502]} nach={[px(170), Y + S * 12]} />

      <Etikett x={690} y={610} anker="end">
        Drehknopf und Auslöser
      </Etikett>
      <Zeiger von={[px(482), 580]} nach={[px(482), Y + S * 36]} />
    </Zeichnung>
  );
}
