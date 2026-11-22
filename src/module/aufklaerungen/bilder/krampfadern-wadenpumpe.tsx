import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Venenklappe bei Höhe y: zu (Segel treffen sich) oder offen. */
function Klappe({ x, y, offen }: { x: number; y: number; offen: boolean }) {
  const d = offen
    ? `M${x - 20} ${y + 18} L${x - 12} ${y - 14} M${x + 20} ${y + 18} L${x + 12} ${y - 14}`
    : `M${x - 20} ${y + 18} L${x} ${y - 6} M${x + 20} ${y + 18} L${x} ${y - 6}`;
  return <path d={d} fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />;
}

/** Wade mit tiefer Vene; angespannt drücken die Muskeln die Vene zusammen. */
function Wade({ x, an }: { x: number; an: boolean }) {
  const rx = an ? 62 : 46;
  const ry = an ? 112 : 130;
  const enge = an ? 8 : 20;
  return (
    <g>
      <rect x={x - 150} y="150" width="300" height="480" rx="110" fill="none" stroke={F.leise} strokeWidth="3" strokeDasharray="8 10" />
      {/* Angespannt ziehen sich die Muskelbäuche in Bewegung zusammen (bewegung.css). */}
      <g className={an ? 'krampfadern-wadenpumpe-muskel-form' : undefined}>
        <ellipse cx={x - 70} cy="390" rx={rx} ry={ry} fill={F.petrol} stroke={F.leise} strokeWidth="3" />
      </g>
      <g className={an ? 'krampfadern-wadenpumpe-muskel-form' : undefined}>
        <ellipse cx={x + 70} cy="390" rx={rx} ry={ry} fill={F.petrol} stroke={F.leise} strokeWidth="3" />
      </g>
      <path
        d={`M${x - 20} 160 L${x - 20} 300 Q${x - enge} 390 ${x - 20} 480 L${x - 20} 620 L${x + 20} 620 L${x + 20} 480 Q${x + enge} 390 ${x + 20} 300 L${x + 20} 160 Z`}
        fill={F.petrolDunkel}
      />
      <path
        d={`M${x - 20} 160 L${x - 20} 300 Q${x - enge} 390 ${x - 20} 480 L${x - 20} 620 M${x + 20} 160 L${x + 20} 300 Q${x + enge} 390 ${x + 20} 480 L${x + 20} 620`}
        fill="none"
        stroke={F.linie}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Klappe x={x} y={230} offen={an} />
      <Klappe x={x} y={550} offen={!an} />
    </g>
  );
}

/** Blutsäule aus drei Punkten in der Vene; nur in Bewegung sichtbar. */
function Blut({ x, y, klasse }: { x: number; y: number; klasse: string }) {
  return (
    <g className={klasse} opacity="0">
      {[0, 28, 56].map((d) => (
        <circle key={d} cx={x} cy={y + d} r="8" fill={F.kupferHell} />
      ))}
    </g>
  );
}

/** Muskelpumpe der Wade: locker füllt sich die Vene, angespannt drückt die Wade das Blut nach oben. */
export default function KrampfadernWadenpumpe() {
  return (
    <Zeichnung titel="Zwei Bilder der Wade mit der tiefen Vene zwischen den Muskeln. Links locker: Die obere Klappe ist zu, die Vene füllt sich von unten. Rechts angespannt: Die Muskeln drücken die Vene zusammen, die obere Klappe öffnet sich und das Blut wird nach oben gepumpt">
      {/* In Bewegung wechseln sich die beiden Hälften ab: erst füllen, dann pumpen. */}
      <g className="krampfadern-wadenpumpe-links">
        <Etikett x={180} y={58} anker="middle">
          Wade locker
        </Etikett>
        <Unterzeile x={180} y={90} anker="middle">
          Vene füllt sich von unten
        </Unterzeile>
        <Wade x={180} an={false} />
        <Pfeil d="M180 610 L180 500" farbe={F.leise} breite={4} />
        <Blut x={180} y={548} klasse="krampfadern-wadenpumpe-fuellen" />
      </g>

      <g className="krampfadern-wadenpumpe-rechts">
        <Etikett x={540} y={58} anker="middle" farbe={F.kupferHell}>
          Wade spannt an
        </Etikett>
        <Unterzeile x={540} y={90} anker="middle">
          drückt das Blut nach oben
        </Unterzeile>
        <Wade x={540} an={true} />
        <Pfeil d="M540 330 L540 130" farbe={F.linie} breite={5} />
        <Pfeil d="M436 390 L464 390" farbe={F.kupferHell} breite={4} />
        <Pfeil d="M644 390 L616 390" farbe={F.kupferHell} breite={4} />
        <Blut x={540} y={440} klasse="krampfadern-wadenpumpe-pumpen" />
      </g>

      <Etikett x={360} y={680} anker="middle">
        Jeder Schritt pumpt mit
      </Etikett>
    </Zeichnung>
  );
}
