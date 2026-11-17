import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { InhalierKopf, MUND } from './inhalieren';

const KOPF_X = 420;
const KOPF_Y = 120;
const S = 0.8;
const MUND_X = KOPF_X + MUND[0] * S;
const MUND_Y = KOPF_Y + MUND[1] * S;

/**
 * Runder Pulverinhalator (Scheibe) von der Seite, Mundstück nach rechts.
 * (x, y) = Mitte der Scheibe, `mund` = x-Spitze des Mundstücks.
 */
export function Pulverscheibe({ x, y, r, mund }: { x: number; y: number; r: number; mund: number }) {
  const h = r * 0.42;
  return (
    <g>
      <rect x={x + r * 0.6} y={y - h / 2} width={mund - x - r * 0.6} height={h} rx={h / 4} fill={F.leise} stroke={F.linie} strokeWidth="4" />
      <circle cx={x} cy={y} r={r} {...KONTUR} fill={F.petrolHell} />
      <circle cx={x} cy={y} r={r * 0.62} fill="none" stroke={F.linie} strokeWidth="3" />
      {/* Ladehebel */}
      <path d={`M${x} ${y} L${x - r * 0.44} ${y + r * 0.44}`} {...KONTUR} strokeWidth="3" />
      <circle cx={x} cy={y} r={r * 0.1} fill={F.linie} />
      {/* Fenster des Zählwerks */}
      <rect x={x - r * 0.2} y={y - r * 0.5} width={r * 0.4} height={r * 0.26} rx="4" fill={F.creme} stroke={F.linie} strokeWidth="3" />
    </g>
  );
}

/** Kopf mit Pulverinhalator: schneller, kräftiger Atemzug; daneben durchgestrichen das Hineinpusten. */
export default function InhalierenPulver() {
  return (
    <Zeichnung titel="Ein Kopf von der Seite atmet schnell und kräftig aus einem runden Pulverinhalator ein, bis in die Lunge; daneben durchgestrichen: nicht in das Gerät hineinpusten">
      <Etikett x={360} y={56} anker="middle" farbe={F.kupferHell}>
        schnell und kräftig einatmen
      </Etikett>
      <Unterzeile x={360} y={88} anker="middle">
        anders als beim Spray
      </Unterzeile>

      {/* Hauptszene */}
      <Pulverscheibe x={330} y={MUND_Y} r={62} mund={MUND_X + 10} />
      <g transform={`translate(${KOPF_X} ${KOPF_Y}) scale(${S})`}>
        <InhalierKopf rumpf>
          <Pfeil d="M96 222 C140 214 172 218 184 238 C194 256 184 300 181 400" farbe={F.kupferHell} breite={12} />
        </InhalierKopf>
      </g>
      {/* Tempo-Striche: die Luft zieht schnell durch das Gerät */}
      <path d="M196 260 L250 260 M180 286 L250 286 M196 312 L250 312" {...KONTUR} stroke={F.kupferHell} strokeWidth="5" />

      <Zeiger von={[214, 184]} nach={[330, MUND_Y - 24]} />
      <Etikett x={140} y={180} anker="middle">
        Zählwerk
      </Etikett>

      {/* Kleines Feld: nicht hineinpusten */}
      <rect x="40" y="420" width="320" height="210" rx="18" fill="none" stroke={F.leise} strokeWidth="3" />
      <Pulverscheibe x={124} y={553} r={44} mund={245} />
      <g transform="translate(200 440) scale(0.5)">
        <InhalierKopf>
          <Pfeil d="M183 318 C186 290 194 256 184 238 C172 218 140 214 70 222" farbe={F.linie} breite={8} />
        </InhalierKopf>
      </g>
      <path d="M84 452 L316 604 M316 452 L84 604" {...KONTUR} stroke={F.kupfer} strokeWidth="8" />
      <Etikett x={200} y={662} anker="middle" farbe={F.kupferHell}>
        nicht hineinpusten
      </Etikett>
    </Zeichnung>
  );
}
