import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Speiseröhre und Magen als eine Form (wie in reflux.tsx), Magenausgang nach links. */
const MAGEN =
  'M285 50 L285 300 C287 370 268 420 200 440 L130 440 L130 500 L200 500 ' +
  'C290 505 330 610 430 610 C540 610 610 510 600 400 C592 290 540 225 470 228 ' +
  'C410 230 375 262 355 300 L355 50 Z';

/** Entzündete Stellen der Schleimhaut, entlang der Magenwand. */
const HERDE: [number, number, number][] = [
  [372, 318, 14],
  [415, 250, 12],
  [520, 250, 15],
  [584, 330, 13],
  [598, 440, 15],
  [560, 548, 14],
  [470, 600, 13],
  [372, 588, 15],
  [292, 520, 12],
];

/** Helicobacter: kleines gebogenes Stäbchen mit Geißeln. */
function Keim({ x, y, dreh }: { x: number; y: number; dreh: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${dreh})`}>
      <path d="M-22 0 C-14 -12 -6 12 2 0 C10 -12 18 12 24 0" fill="none" stroke={F.kupfer} strokeWidth="9" strokeLinecap="round" />
      <path d="M24 0 C32 -6 36 4 44 -2 M24 0 C32 8 38 2 44 10" fill="none" stroke={F.kupferHell} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

/** Magen mit entzündeter Schleimhaut, daneben eine Lupe mit Helicobacter auf der Schleimhaut. */
export default function Gastritis() {
  return (
    <Zeichnung titel="Magen im Schnitt mit entzündeter, geröteter Schleimhaut; in der Lupe sitzen Helicobacter-Bakterien auf der Schleimhaut. Darunter weitere Auslöser: Schmerzmittel, Alkohol und Rauchen">
      <clipPath id="gastritis-magen">
        <path d={MAGEN} />
      </clipPath>
      <clipPath id="gastritis-lupe">
        <circle cx="0" cy="0" r="104" />
      </clipPath>

      <g transform="translate(-40 60) scale(0.82)">
        <path d={MAGEN} fill={F.petrol} />
        {/* Schleimhaut als Band innen an der Wand, mit geröteten Herden */}
        <g clipPath="url(#gastritis-magen)">
          <path d={MAGEN} fill="none" stroke={F.petrolHell} strokeWidth="44" />
          {HERDE.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={F.kupfer} />
          ))}
        </g>
        <path d={MAGEN} {...KONTUR} />
      </g>

      {/* Lupe: Schleimhautzellen mit Helicobacter */}
      <g transform="translate(570 190)">
        <g clipPath="url(#gastritis-lupe)">
          <circle cx="0" cy="0" r="104" fill={F.petrolDunkel} />
          {[-120, -72, -24, 24, 72].map((x) => (
            <rect key={x} x={x} y={10} width={44} height={110} rx="12" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
          ))}
          <rect x={-110} y={-4} width={220} height={16} fill={F.kupferHell} opacity="0.55" />
          <Keim x={-50} y={-30} dreh={-15} />
          <Keim x={20} y={-58} dreh={20} />
          <Keim x={30} y={-14} dreh={-5} />
        </g>
        <circle cx="0" cy="0" r="104" fill="none" stroke={F.linie} strokeWidth="5" />
      </g>
      <line x1={480} y1={240} x2={440} y2={272} stroke={F.leise} strokeWidth="3" strokeDasharray="4 8" strokeLinecap="round" />

      <Etikett x={690} y={334} anker="end" farbe={F.kupferHell}>
        Helicobacter
      </Etikett>
      <Unterzeile x={690} y={364} anker="end">
        häufigste Ursache
      </Unterzeile>

      <Zeiger von={[184, 200]} nach={[208, 200]} />
      <Etikett x={176} y={209} anker="end">
        Speiseröhre
      </Etikett>

      <Zeiger von={[180, 640]} nach={[268, 545]} />
      <Etikett x={30} y={668} farbe={F.kupferHell}>
        Entzündete Schleimhaut
      </Etikett>

      <Etikett x={315} y={440} anker="middle">
        Magen
      </Etikett>

      <Unterzeile x={690} y={640} anker="end">
        auch durch Schmerzmittel,
      </Unterzeile>
      <Unterzeile x={690} y={668} anker="end">
        Alkohol und Rauchen
      </Unterzeile>
    </Zeichnung>
  );
}
