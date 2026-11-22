import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const OBEN = 210;
const UNTEN = 440;

function Sonne({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="34" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((g) => {
        const w = (g * Math.PI) / 180;
        return (
          <line
            key={g}
            x1={x + Math.cos(w) * 48}
            y1={y + Math.sin(w) * 48}
            x2={x + Math.cos(w) * 66}
            y2={y + Math.sin(w) * 66}
            stroke={F.linie}
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function Thermometer({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 14} ${y + 28} L${x - 14} ${y - 52} A14 14 0 0 1 ${x + 14} ${y - 52} L${x + 14} ${y + 28}`} {...KONTUR} fill={F.petrolDunkel} />
      <circle cx={x} cy={y + 44} r="24" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <rect x={x - 6} y={y - 30} width="12" height="64" rx="6" fill={F.petrolHell} />
      {[-36, -16, 4].map((d) => (
        <line key={d} x1={x + 22} y1={y + d} x2={x + 36} y2={y + d} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      ))}
    </g>
  );
}

function Tasse({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[-18, 0, 18].map((d) => (
        <path key={d} d={`M${x + d} ${y - 30} q-10 -14 0 -28 q10 -14 0 -28`} fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      ))}
      <path d={`M${x + 38} ${y - 10} a20 20 0 0 1 0 40`} {...KONTUR} />
      <path d={`M${x - 44} ${y - 18} L${x + 40} ${y - 18} L${x + 32} ${y + 40} Q${x + 30} ${y + 56} ${x + 14} ${y + 56} L${x - 18} ${y + 56} Q${x - 34} ${y + 56} ${x - 36} ${y + 40} Z`} {...KONTUR} fill={F.petrolHell} />
    </g>
  );
}

function Schote({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M${x - 40} ${y - 30} C${x - 20} ${y - 40} ${x + 10} ${y - 30} ${x + 30} ${y} C${x + 46} ${y + 26} ${x + 50} ${y + 50} ${x + 40} ${y + 60} C${x + 20} ${y + 40} ${x - 20} ${y + 10} ${x - 40} ${y - 6} Z`}
        {...KONTUR}
        fill={F.kupfer}
      />
      <path d={`M${x - 40} ${y - 18} C${x - 54} ${y - 22} ${x - 60} ${y - 36} ${x - 56} ${y - 52}`} {...KONTUR} stroke={F.petrolHell} strokeWidth={6} />
    </g>
  );
}

function Weinglas({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 32} ${y - 56} L${x + 32} ${y - 56} C${x + 34} ${y - 10} ${x + 20} ${y + 6} ${x} ${y + 8} C${x - 20} ${y + 6} ${x - 34} ${y - 10} ${x - 32} ${y - 56} Z`} {...KONTUR} />
      <path d={`M${x - 31} ${y - 30} L${x + 31} ${y - 30} C${x + 28} ${y - 4} ${x + 16} ${y + 6} ${x} ${y + 6} C${x - 16} ${y + 6} ${x - 28} ${y - 4} ${x - 31} ${y - 30} Z`} fill={F.petrolHell} />
      <path d={`M${x} ${y + 8} L${x} ${y + 56} M${x - 26} ${y + 58} L${x + 26} ${y + 58}`} {...KONTUR} />
    </g>
  );
}

function Blitz({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x + 12} ${y - 62} L${x - 30} ${y + 6} L${x - 2} ${y + 6} L${x - 14} ${y + 62} L${x + 32} ${y - 8} L${x + 4} ${y - 8} Z`}
      {...KONTUR}
      fill={F.petrolHell}
    />
  );
}

/** Sechs häufige Auslöser für einen Rosazea-Schub. */
export default function RosazeaAusloeser() {
  return (
    <Zeichnung titel="Sechs häufige Auslöser einer Rosazea: Sonne, Hitze und Kälte, heiße Getränke, scharfes Essen, Alkohol und Stress">
      <Etikett x={360} y={70} anker="middle">
        Häufige Auslöser
      </Etikett>

      <Sonne x={140} y={OBEN} />
      <Thermometer x={360} y={OBEN - 10} />
      <Tasse x={580} y={OBEN + 10} />
      <Schote x={140} y={UNTEN - 10} />
      <Weinglas x={360} y={UNTEN} />
      <Blitz x={580} y={UNTEN} />

      <Etikett x={140} y={OBEN + 110} anker="middle">
        Sonne
      </Etikett>
      <Etikett x={360} y={OBEN + 110} anker="middle">
        Hitze, Kälte
      </Etikett>
      <Etikett x={580} y={OBEN + 110} anker="middle">
        Heiße Getränke
      </Etikett>
      <Etikett x={140} y={UNTEN + 110} anker="middle">
        Scharfes Essen
      </Etikett>
      <Etikett x={360} y={UNTEN + 110} anker="middle">
        Alkohol
      </Etikett>
      <Etikett x={580} y={UNTEN + 110} anker="middle">
        Stress
      </Etikett>

      <Unterzeile x={360} y={650} anker="middle" farbe={F.kupferHell}>
        Schreiben Sie auf, wann Ihr Gesicht rot wird
      </Unterzeile>
    </Zeichnung>
  );
}
