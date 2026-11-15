import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

// Unterschenkel mit Fuß von vorn, oben am Knie offen. Nullpunkt oben in der Mitte, etwa 390 hoch.
const BEIN =
  'M-36 0 C-44 60 -46 120 -38 200 C-32 260 -22 300 -22 330 C-26 350 -44 370 -46 384 C-46 392 -40 394 -30 394 L30 394 C40 394 46 392 46 384 C44 370 26 350 22 330 C22 300 32 260 38 200 C46 120 44 60 36 0';

// Dasselbe Bein geschwollen: Knöchel und Wade deutlich breiter.
const BEIN_DICK =
  'M-38 0 C-48 60 -56 120 -52 200 C-48 262 -42 300 -42 330 C-46 350 -54 368 -56 384 C-56 394 -48 396 -36 396 L36 396 C48 396 56 394 56 384 C54 368 46 350 44 330 C44 300 50 262 54 200 C58 120 50 60 38 0';

function Bein({ x, dick = false, krank = false }: { x: number; dick?: boolean; krank?: boolean }) {
  return (
    <g transform={`translate(${x} 170)`}>
      <path d={dick ? BEIN_DICK : BEIN} {...KONTUR} fill={krank ? F.kupfer : F.petrol} />
      {dick && (
        // Zum Vergleich der normale Umriss
        <path d={BEIN} fill="none" stroke={F.leise} strokeWidth="2" strokeDasharray="6 8" />
      )}
    </g>
  );
}

/** Beide Beine geschwollen oder nur eines: Das Muster weist auf die Ursache. */
export default function GeschwolleneBeine() {
  return (
    <Zeichnung titel="Zwei Beinpaare von vorn: links sind beide Unterschenkel gleichmäßig geschwollen, rechts ist nur ein Bein dick und hervorgehoben als Warnzeichen für eine Thrombose">
      <Etikett x={360} y={80} anker="middle">
        Beide Beine oder nur eines?
      </Etikett>

      <Bein x={112} dick />
      <Bein x={248} dick />

      <line x1="360" y1="190" x2="360" y2="540" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />

      <Bein x={484} />
      <Bein x={600} dick krank />

      <Etikett x={180} y={622} anker="middle">
        Beide Beine
      </Etikett>
      <Unterzeile x={180} y={654} anker="middle">
        Venen, Herz, Niere,
      </Unterzeile>
      <Unterzeile x={180} y={684} anker="middle">
        Tabletten
      </Unterzeile>

      <Etikett x={545} y={622} anker="middle" farbe={F.kupferHell}>
        Nur ein Bein
      </Etikett>
      <Unterzeile x={545} y={654} anker="middle">
        neu, warm, schmerzhaft:
      </Unterzeile>
      <Unterzeile x={545} y={684} anker="middle">
        an Thrombose denken
      </Unterzeile>
    </Zeichnung>
  );
}
