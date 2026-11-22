import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Kleines Dosierspray: Kartusche oben, Mundstück nach links. */
export function Spray({ x, y, farbe, groesse = 1 }: { x: number; y: number; farbe: string; groesse?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${groesse})`}>
      <rect x="-16" y="-76" width="32" height="56" rx="8" fill={farbe} stroke={F.linie} strokeWidth="4" />
      <rect x="-26" y="-34" width="52" height="84" rx="12" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <rect x="-60" y="20" width="40" height="30" rx="6" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
    </g>
  );
}

const MX = 360;
const MY = 290;

/** Bronchus im Querschnitt; jedes Spray setzt an einer anderen Schicht an. */
export default function AsthmaSprays() {
  return (
    <Zeichnung titel="Ein Bronchus im Querschnitt mit Muskelring außen und geschwollener Schleimhaut innen. Das Kortisonspray wirkt jeden Tag auf die Schleimhaut, sie schwillt ab. Das Bedarfsspray lockert bei Luftnot rasch den Muskel">
      <Etikett x={360} y={56} anker="middle">
        Zwei Sprays, zwei Wirkorte
      </Etikett>

      {/* Muskelring, Schleimhaut, Kanal */}
      <circle cx={MX} cy={MY} r="196" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <circle cx={MX} cy={MY} r="168" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <circle cx={MX} cy={MY} r="70" fill={F.tief} stroke={F.linie} strokeWidth="4" />

      <Spray x={110} y={590} farbe={F.petrolHell} />
      <Zeiger von={[180, 520]} nach={[290, 380]} />
      <Etikett x={160} y={580}>
        Kortisonspray
      </Etikett>
      <Unterzeile x={160} y={610}>
        jeden Tag
      </Unterzeile>
      <Unterzeile x={40} y={680}>
        Schleimhaut schwillt ab
      </Unterzeile>

      <Spray x={650} y={590} farbe={F.kupferHell} />
      <Zeiger von={[540, 520]} nach={[500, 410]} />
      <Etikett x={580} y={580} anker="end" farbe={F.kupferHell}>
        Bedarfsspray
      </Etikett>
      <Unterzeile x={580} y={610} anker="end">
        bei Luftnot
      </Unterzeile>
      <Unterzeile x={690} y={680} anker="end">
        Muskel lockert sich rasch
      </Unterzeile>
    </Zeichnung>
  );
}
