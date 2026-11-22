import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Zeitachse 20 bis 8 Uhr auf x = 80 bis 640. */
const X0 = 80;
const PRO_STUNDE = 560 / 12;
const ux = (uhr: number) => X0 + ((uhr - 20 + 24) % 24) * PRO_STUNDE;

const BETT = ux(23.5);
const WECKER = ux(6.5);
const Y = 300;

/** Schlaffenster: erst ins Bett, wenn müde, jeden Tag zur gleichen Zeit aufstehen. */
export default function SchlafstoerungSelbst() {
  return (
    <Zeichnung titel="Zeitleiste von 20 Uhr abends bis 8 Uhr morgens: Das Schlaffenster beginnt erst, wenn man müde ist, und endet jeden Tag zur gleichen Zeit mit dem Wecker; davor ruhige Dinge außerhalb des Betts">
      <Etikett x={360} y={70} anker="middle">
        Ihr Schlaffenster
      </Etikett>

      {/* Abend außerhalb des Bettes */}
      <rect x={X0} y={Y} width={BETT - X0} height="90" rx="14" fill="none" stroke={F.leise} strokeWidth="3" strokeDasharray="8 8" />
      <Unterzeile x={(X0 + BETT) / 2} y={Y + 52} anker="middle">
        Ruhiges tun
      </Unterzeile>

      {/* Schlaffenster */}
      <rect x={BETT} y={Y} width={WECKER - BETT} height="90" rx="14" {...KONTUR} fill={F.petrolHell} />
      {/* Mond */}
      <path d={`M${(BETT + WECKER) / 2 + 8} ${Y + 22} a26 26 0 1 0 22 36 a20 20 0 1 1 -22 -36 Z`} fill={F.creme} />

      {/* Wecker */}
      <line x1={WECKER} y1={Y - 40} x2={WECKER} y2={Y + 130} stroke={F.kupfer} strokeWidth="6" strokeLinecap="round" />
      <circle cx={WECKER} cy={Y - 64} r="24" {...KONTUR} fill={F.kupfer} />
      <path d={`M${WECKER} ${Y - 78} L${WECKER} ${Y - 64} L${WECKER + 10} ${Y - 58}`} {...KONTUR} strokeWidth="3" />

      {/* Uhrzeiten */}
      <line x1={X0} y1={Y + 130} x2="640" y2={Y + 130} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      {[20, 24, 4, 8].map((u) => (
        <g key={u}>
          <line x1={ux(u)} y1={Y + 124} x2={ux(u)} y2={Y + 138} stroke={F.leise} strokeWidth="3" />
          <Unterzeile x={ux(u)} y={Y + 166} anker="middle">
            {`${u === 24 ? 0 : u} Uhr`}
          </Unterzeile>
        </g>
      ))}

      <Zeiger von={[200, 196]} nach={[BETT + 4, Y + 10]} />
      <Etikett x={40} y={160}>
        erst ins Bett,
      </Etikett>
      <Unterzeile x={40} y={190}>
        wenn Sie müde sind
      </Unterzeile>

      <Etikett x={540} y={182} anker="end" farbe={F.kupferHell}>
        Aufstehen:
      </Etikett>
      <Unterzeile x={540} y={212} anker="end">
        jeden Tag gleich
      </Unterzeile>

      <Etikett x={360} y={560} anker="middle">
        Lange wach? Aufstehen,
      </Etikett>
      <Unterzeile x={360} y={594} anker="middle">
        Ruhiges tun, erst müde wieder hinlegen
      </Unterzeile>
    </Zeichnung>
  );
}
