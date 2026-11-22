import { Etikett, F, Folge, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

// Wie der Stuhl beim Abführen aussieht. Echte Farben statt App-Farben, damit man vergleichen kann.
const STUFEN = [
  { x: 100, farbe: '#6e4b2c', truebe: 1, text: 'braun, breiig' },
  { x: 273, farbe: '#94673a', truebe: 1, text: 'braun, flüssig' },
  { x: 446, farbe: '#c49a55', truebe: 1, text: 'hell und trüb' },
  { x: 619, farbe: '#f1df8c', truebe: 0.92, text: 'klar, gelblich' },
];

/** Vier Becher von braun nach klar-gelblich: Erst wenn es aussieht wie Urin, ist der Darm sauber. */
export default function DarmspiegelungSauber() {
  return (
    <Zeichnung titel="Vier Becher zeigen, wie sich der Stuhl beim Abführen verändert: von braun und breiig über braun und flüssig und hell und trüb bis klar und gelblich wie Urin. Erst dann ist der Darm sauber">
      <Etikett x={360} y={86} anker="middle">
        Weiter trinken, bis es klar ist
      </Etikett>
      <Pfeil d="M90 170 L630 170" farbe={F.leise} breite={4} />

      {STUFEN.map((s, i) => (
        <Folge key={s.x} ab={0.4 + i * 1.1} von={0}>
          <g transform={`translate(${s.x} 0)`}>
            <path d="M-60 250 L-48 470 L48 470 L60 250" {...KONTUR} fill={F.tief} />
            <path d="M-56 310 L-46 466 L46 466 L56 310 Z" fill={s.farbe} opacity={s.truebe} />
            {i === 0 && (
              <g fill="#5a3b20">
                <ellipse cx="-18" cy="400" rx="14" ry="9" />
                <ellipse cx="16" cy="430" rx="12" ry="8" />
                <ellipse cx="6" cy="370" rx="10" ry="7" />
              </g>
            )}
            {i === 3 && <circle cx="0" cy="360" r="104" fill="none" stroke={F.kupfer} strokeWidth="5" />}
          </g>
          <Unterzeile x={s.x} y={512} anker="middle" farbe={i === 3 ? F.linie : F.leise}>
            {s.text}
          </Unterzeile>
        </Folge>
      ))}

      <Folge ab={4.8} von={0}>
        <Etikett x={619} y={600} anker="middle" farbe={F.kupferHell}>
          Sauber
        </Etikett>
        <Unterzeile x={619} y={632} anker="middle">
          wie Urin
        </Unterzeile>
      </Folge>
      <Unterzeile x={230} y={600} anker="middle">
        noch nicht sauber:
      </Unterzeile>
      <Unterzeile x={230} y={632} anker="middle">
        weiter trinken
      </Unterzeile>
    </Zeichnung>
  );
}
