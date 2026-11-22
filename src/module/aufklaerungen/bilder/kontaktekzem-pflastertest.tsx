import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const RUECKEN =
  'M318 40 L318 74 C270 84 210 92 186 128 C172 156 196 260 206 384 L514 384 C524 260 548 156 534 128 C510 92 450 84 402 74 L402 40';

/** Ein Streifen Testpflaster mit fünf Kammern; `treffer` = Kammer mit Reaktion. */
function Streifen({ x, treffer }: { x: number; treffer?: number }) {
  return (
    <g>
      <rect x={x} y={120} width="64" height="236" rx="8" fill={F.creme} stroke={F.linie} strokeWidth="3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={x + 32}
          cy={146 + i * 46}
          r="14"
          fill={i === treffer ? F.kupfer : 'none'}
          stroke={i === treffer ? F.kupferHell : F.leise}
          strokeWidth="3"
        />
      ))}
    </g>
  );
}

/** Pflastertest auf dem Rücken und sein zeitlicher Ablauf. */
export default function KontaktekzemPflastertest() {
  return (
    <Zeichnung titel="Pflastertest: Zwei Streifen mit Testpflastern kleben auf dem Rücken, eine Stelle ist gerötet. Darunter der Ablauf: Tag 0 aufkleben, Tag 2 abnehmen und ablesen, ab Tag 3 noch einmal ablesen">
      <path d={RUECKEN} {...KONTUR} fill={F.petrol} />
      <line x1="360" y1="84" x2="360" y2="376" stroke={F.leise} strokeWidth="3" strokeDasharray="8 8" strokeOpacity="0.7" />
      <Streifen x={268} />
      <Streifen x={388} treffer={2} />

      <Zeiger von={[560, 238]} nach={[436, 238]} />
      <Etikett x={570} y={230}>
        Rötung:
      </Etikett>
      <Unterzeile x={570} y={260}>
        Allergie
      </Unterzeile>
      <Unterzeile x={360} y={420} anker="middle">
        Testpflaster auf dem Rücken
      </Unterzeile>

      {/* Ablauf */}
      <Pfeil d="M110 480 L690 480" farbe={F.leise} breite={4} />
      {[120, 360, 600].map((x) => (
        <circle key={x} cx={x} cy={480} r="14" fill={x === 120 ? F.petrolHell : F.kupfer} stroke={F.linie} strokeWidth="4" />
      ))}
      <Etikett x={120} y={540} anker="middle">
        Tag 0
      </Etikett>
      <Unterzeile x={120} y={572} anker="middle">
        aufkleben
      </Unterzeile>
      <Etikett x={360} y={540} anker="middle">
        Tag 2
      </Etikett>
      <Unterzeile x={360} y={572} anker="middle">
        abnehmen, ablesen
      </Unterzeile>
      <Etikett x={600} y={540} anker="middle">
        ab Tag 3
      </Etikett>
      <Unterzeile x={600} y={572} anker="middle">
        noch einmal ablesen
      </Unterzeile>
      <Unterzeile x={360} y={640} anker="middle">
        Eine Allergie zeigt sich oft erst nach Tagen
      </Unterzeile>
    </Zeichnung>
  );
}
