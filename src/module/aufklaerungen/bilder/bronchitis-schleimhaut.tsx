import { Etikett, F, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const ZELLEN = Array.from({ length: 10 }, (_, i) => 70 + i * 58);

/** Schleimhaut der Bronchien in Vergrößerung: gesund mit Flimmerhärchen, nach dem Infekt wund. */
export default function BronchitisSchleimhaut() {
  return (
    <Zeichnung titel="Die Schleimhaut der Bronchien vergrößert. Oben gesund: eine Reihe Zellen mit Flimmerhärchen, die eine dünne Schleimschicht nach oben schieben. Unten nach dem Infekt: geschwollene, wunde Zellen mit wenigen Härchen, dicker Schleim mit gelblichen Abwehrzellen. Kalte Luft und Rauch reizen die wunde Stelle und lösen Husten aus">
      {/* Gesund */}
      <Etikett x={40} y={60}>
        Gesund
      </Etikett>
      <Unterzeile x={40} y={92}>
        Flimmerhärchen räumen den Schleim ab
      </Unterzeile>
      <rect x="60" y="130" width="600" height="20" rx="10" fill={F.leise} fillOpacity="0.35" />
      <Pfeil d="M480 120 L640 120" farbe={F.leise} breite={3} />
      {ZELLEN.map((x) => (
        <g key={x}>
          {[10, 22, 34, 46].map((d) => (
            <line key={d} x1={x + d} y1="176" x2={x + d + 6} y2="152" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
          ))}
          <rect x={x} y="176" width="56" height="90" rx="6" fill={F.petrol} stroke={F.linie} strokeWidth="3" />
          <circle cx={x + 28} cy="232" r="10" fill={F.petrolDunkel} />
        </g>
      ))}

      {/* Nach dem Infekt */}
      <Etikett x={40} y={350} farbe={F.kupferHell}>
        Nach dem Infekt
      </Etikett>
      <Unterzeile x={40} y={382}>
        Die Schleimhaut ist wochenlang wund
      </Unterzeile>
      <path
        d="M60 430 C150 400 250 446 360 420 C470 396 570 440 660 420 L660 470 L60 470 Z"
        fill={F.leise}
        fillOpacity="0.35"
      />
      {[
        [110, 440],
        [190, 452],
        [300, 438],
        [420, 450],
        [520, 436],
        [610, 448],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="11" fill={F.kupferHell} stroke={F.kupfer} strokeWidth="2" />
      ))}
      {ZELLEN.map((x, i) => (
        <g key={x}>
          {i % 3 === 0 && (
            <line x1={x + 28} y1="478" x2={x + 34} y2="460" stroke={F.linie} strokeWidth="3" strokeLinecap="round" />
          )}
          <rect x={x} y="478" width="56" height="110" rx="14" fill={F.kupfer} fillOpacity="0.75" stroke={F.linie} strokeWidth="3" />
          <circle cx={x + 28} cy="540" r="10" fill={F.petrolDunkel} />
        </g>
      ))}

      <Zeiger von={[200, 640]} nach={[190, 452]} />
      <Etikett x={40} y={670}>
        gelb: Abwehrzellen
      </Etikett>
      <Unterzeile x={40} y={700}>
        kein Zeichen für Bakterien
      </Unterzeile>
      <Etikett x={690} y={670} anker="end">
        Reize lösen Husten aus
      </Etikett>
      <Unterzeile x={690} y={700} anker="end">
        kalte Luft, Rauch, Sprechen
      </Unterzeile>
    </Zeichnung>
  );
}
