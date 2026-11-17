import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';
import { Pen } from './insulin-pen';

const STRICH = { stroke: F.linie, strokeWidth: 4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;

/** Schneeflocke, durchgestrichen: nicht einfrieren. */
function KeinFrost({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <g stroke={F.leise} strokeWidth="3" strokeLinecap="round">
        {[0, 60, 120].map((w) => {
          const b = (w * Math.PI) / 180;
          return <line key={w} x1={x - 20 * Math.cos(b)} y1={y - 20 * Math.sin(b)} x2={x + 20 * Math.cos(b)} y2={y + 20 * Math.sin(b)} />;
        })}
      </g>
      <line x1={x - 22} y1={y + 22} x2={x + 22} y2={y - 22} stroke={F.kupfer} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

/** Sonne, durchgestrichen: keine Hitze. */
function KeineHitze({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill={F.kupferHell} />
      <g stroke={F.kupferHell} strokeWidth="4" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((w) => {
          const b = (w * Math.PI) / 180;
          return <line key={w} x1={x + 28 * Math.cos(b)} y1={y + 28 * Math.sin(b)} x2={x + 38 * Math.cos(b)} y2={y + 38 * Math.sin(b)} />;
        })}
      </g>
      <line x1={x - 40} y1={y + 40} x2={x + 40} y2={y - 40} stroke={F.linie} strokeWidth="11" strokeLinecap="round" />
      <line x1={x - 40} y1={y + 40} x2={x + 40} y2={y - 40} stroke={F.kupfer} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

/** Thermometer mit mittlerem Stand. */
function Thermometer({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 13} y={y - 110} width="26" height="130" rx="13" fill={F.petrolDunkel} {...STRICH} />
      <circle cx={x} cy={y + 30} r="22" fill={F.petrolDunkel} {...STRICH} />
      <rect x={x - 5} y={y - 50} width="10" height="80" fill={F.kupferHell} />
      <circle cx={x} cy={y + 30} r="14" fill={F.kupferHell} />
      <g stroke={F.leise} strokeWidth="2" strokeLinecap="round">
        {[-90, -70, -50, -30, -10].map((d) => (
          <line key={d} x1={x + 18} y1={y + d} x2={x + 28} y2={y + d} />
        ))}
      </g>
    </g>
  );
}

export default function InsulinLagern() {
  return (
    <Zeichnung titel="Insulin aufbewahren: der Vorrat liegt im Kühlschrank bei 2 bis 8 Grad, nicht einfrieren. Der Pen in Gebrauch bleibt bei Zimmertemperatur und hält etwa 4 Wochen, keine Hitze">
      <line x1="360" y1="50" x2="360" y2="640" stroke={F.leise} strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />

      {/* Kühlschrank mit offener Tür, Pens im mittleren Fach */}
      <path d="M72 60 L34 40 L34 476 L72 456 Z" fill={F.petrolDunkel} {...STRICH} />
      <line x1="48" y1="210" x2="48" y2="290" stroke={F.leise} strokeWidth="6" strokeLinecap="round" />
      <rect x="72" y="60" width="220" height="396" rx="10" fill={F.petrolDunkel} {...STRICH} />
      <rect x="88" y="76" width="188" height="364" rx="4" fill={F.tief} />
      <rect x="88" y="76" width="188" height="82" rx="4" fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" />
      <KeinFrost x={182} y={117} />
      <g stroke={F.leise} strokeWidth="4" strokeLinecap="round">
        <line x1="88" y1="240" x2="276" y2="240" />
        <line x1="88" y1="340" x2="276" y2="340" />
      </g>
      <g transform="translate(96 306) scale(0.3)">
        <Pen nadel={false} dosis="" />
      </g>
      <g transform="translate(110 328) scale(0.3)">
        <Pen nadel={false} dosis="" />
      </g>
      <rect x="92" y="456" width="30" height="12" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="3" />
      <rect x="242" y="456" width="30" height="12" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="3" />

      {/* Pen in Gebrauch auf dem Tisch, Zimmertemperatur, keine Hitze */}
      <KeineHitze x={460} y={200} />
      <Unterzeile x={460} y={282} anker="middle">
        keine Hitze
      </Unterzeile>
      <Thermometer x={624} y={210} />
      <g transform="translate(392 380) scale(0.52)">
        <Pen nadel={false} dosis="12" />
      </g>
      <rect x="392" y="402" width="300" height="14" rx="4" fill={F.petrolDunkel} {...STRICH} />
      <g stroke={F.linie} strokeWidth="6" strokeLinecap="round">
        <line x1="416" y1="418" x2="416" y2="474" />
        <line x1="668" y1="418" x2="668" y2="474" />
      </g>

      <Etikett x={180} y={530} anker="middle">
        Vorrat:
      </Etikett>
      <Etikett x={180} y={564} anker="middle">
        Kühlschrank 2–8 °C
      </Etikett>
      <Unterzeile x={180} y={598} anker="middle">
        nicht einfrieren
      </Unterzeile>

      <Etikett x={540} y={530} anker="middle">
        Pen in Gebrauch:
      </Etikett>
      <Etikett x={540} y={564} anker="middle">
        Zimmertemperatur
      </Etikett>
      <Unterzeile x={540} y={598} anker="middle">
        etwa 4 Wochen haltbar
      </Unterzeile>
    </Zeichnung>
  );
}
