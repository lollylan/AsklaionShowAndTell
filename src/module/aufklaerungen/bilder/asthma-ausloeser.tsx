import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

const MX = 360;
const MY = 390;

/** Auslöser: Titel, Unterzeile, Lage (x), oben oder unten. */
const AUSLOESER: [string, string, number, boolean][] = [
  ['Allergie', 'Pollen, Milben, Tiere', 130, true],
  ['Infekte', 'Erkältung, Grippe', 360, true],
  ['Kalte Luft', 'im Winter', 590, true],
  ['Anstrengung', 'Sport, Treppen', 130, false],
  ['Rauch', 'auch Mitrauchen', 360, false],
  ['Schmerzmittel', 'nur manche', 590, false],
];

/** Pfeil vom Etikett bis kurz vor den Bronchus. */
function pfeilZur(x: number, y: number) {
  const dx = MX - x;
  const dy = MY - y;
  const laenge = Math.hypot(dx, dy);
  const ende = laenge - 112;
  return `M${x} ${y} L${Math.round(x + (dx / laenge) * ende)} ${Math.round(y + (dy / laenge) * ende)}`;
}

/** Verengter Bronchus in der Mitte, sechs Auslöser zeigen darauf. */
export default function AsthmaAusloeser() {
  return (
    <Zeichnung titel="Ein verengter Bronchus in der Mitte, von oben und unten zeigen Pfeile von sechs Auslösern darauf: Allergie, Infekte, kalte Luft, Anstrengung, Rauch und manche Schmerzmittel">
      <Etikett x={360} y={60} anker="middle">
        Was einen Anfall auslösen kann
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        Jeder Mensch hat eigene Auslöser
      </Unterzeile>

      {/* Bronchus: Muskel, geschwollene Schleimhaut, enger Kanal */}
      <circle cx={MX} cy={MY} r="86" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <circle cx={MX} cy={MY} r="66" fill={F.petrol} stroke={F.linie} strokeWidth="3" />
      <circle cx={MX} cy={MY} r="24" fill={F.tief} stroke={F.linie} strokeWidth="3" />

      {AUSLOESER.map(([titel, unter, x, oben]) => (
        <g key={titel}>
          <Etikett x={x} y={oben ? 170 : 600} anker="middle">
            {titel}
          </Etikett>
          <Unterzeile x={x} y={oben ? 200 : 630} anker="middle">
            {unter}
          </Unterzeile>
          <Pfeil d={pfeilZur(x, oben ? 222 : 566)} farbe={F.leise} breite={4} />
        </g>
      ))}

      <Etikett x={360} y={690} anker="middle" farbe={F.kupferHell}>
        Die Atemwege verengen sich
      </Etikett>
    </Zeichnung>
  );
}
