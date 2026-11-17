import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Einlage für den rechten Fuß von oben, Zehen oben, Innenseite links. Mitte (0, 0). */
export const EINLAGE_OBEN =
  'M-10 -200 C-50 -200 -66 -170 -66 -130 C-66 -84 -46 -46 -36 -4 C-30 34 -46 86 -44 136 ' +
  'C-42 186 -20 208 4 208 C30 208 46 188 46 140 C46 92 50 40 54 0 C58 -50 66 -100 62 -140 ' +
  'C58 -180 30 -202 -10 -200 Z';

function Einlage({ id, fuellung = F.petrolDunkel, children }: { id: string; fuellung?: string; children?: ReactNode }) {
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={EINLAGE_OBEN} />
        </clipPath>
      </defs>
      <path d={EINLAGE_OBEN} fill={fuellung} />
      <g clipPath={`url(#${id})`}>{children}</g>
      <path d={EINLAGE_OBEN} {...KONTUR} />
    </g>
  );
}

const PUNKTE: [number, number][] = [];
for (let r = 0; r < 22; r++) {
  for (let s = 0; s < 8; s++) {
    PUNKTE.push([-70 + s * 20 + (r % 2) * 10, -196 + r * 19]);
  }
}

const SPALTEN = [125, 360, 595];
const OBEN = 300;

export default function EinlagenArten() {
  const [a, b, c] = SPALTEN;
  return (
    <Zeichnung titel="Drei Einlagen von oben: stützende Einlage mit erhöhtem Gewölbe an der Innenseite, bettende Einlage ganz weich gepolstert, entlastende Einlage mit Aussparungen unter Ferse und Vorfuß">
      {/* stützen: erhöhtes Gewölbe innen */}
      <g transform={`translate(${a} ${OBEN})`}>
        <Einlage id="einlagen-arten-stuetzen">
          <ellipse cx="-52" cy="24" rx="54" ry="108" fill={F.kupfer} />
          <ellipse cx="-38" cy="24" rx="26" ry="70" fill="none" stroke={F.kupferHell} strokeWidth="3" />
          <ellipse cx="-30" cy="24" rx="10" ry="34" fill="none" stroke={F.kupferHell} strokeWidth="3" />
        </Einlage>
      </g>

      {/* betten: ganze Fläche weich */}
      <g transform={`translate(${b} ${OBEN})`}>
        <Einlage id="einlagen-arten-betten" fuellung={F.kupferHell}>
          <g fill={F.kupfer} fillOpacity="0.55">
            {PUNKTE.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
            ))}
          </g>
        </Einlage>
      </g>

      {/* entlasten: Polster unter Ferse und Vorfuß */}
      <g transform={`translate(${c} ${OBEN})`}>
        <Einlage id="einlagen-arten-entlasten">
          <ellipse cx="4" cy="146" rx="30" ry="34" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" strokeDasharray="7 6" />
          <ellipse cx="-4" cy="-112" rx="44" ry="24" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" strokeDasharray="7 6" />
        </Einlage>
      </g>

      <Etikett x={a} y={566} anker="middle">
        stützen
      </Etikett>
      <Unterzeile x={a} y={600} anker="middle">
        hebt das
      </Unterzeile>
      <Unterzeile x={a} y={628} anker="middle">
        Gewölbe an
      </Unterzeile>

      <Etikett x={b} y={566} anker="middle">
        betten
      </Etikett>
      <Unterzeile x={b} y={600} anker="middle">
        weich, verteilt
      </Unterzeile>
      <Unterzeile x={b} y={628} anker="middle">
        den Druck
      </Unterzeile>

      <Etikett x={c} y={566} anker="middle">
        entlasten
      </Etikett>
      <Unterzeile x={c} y={600} anker="middle">
        Aussparung unter
      </Unterzeile>
      <Unterzeile x={c} y={628} anker="middle">
        der Schmerzstelle
      </Unterzeile>
    </Zeichnung>
  );
}
