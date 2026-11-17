import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/**
 * Anatomisch geformte Einlage von oben, Längsachse senkrecht, in der Mitte etwas schmaler.
 * Auch für inkontinenz-tropfen.tsx.
 */
export function Vorlage({ cx, oben, laenge, breite }: { cx: number; oben: number; laenge: number; breite: number }) {
  const form = (w: number, l: number, t: number) => {
    const h = w / 2;
    const tl = 0.42 * w;
    const b = t + l;
    return (
      `M${cx} ${t} C${cx + h} ${t} ${cx + h} ${t + 0.08 * l} ${cx + h} ${t + 0.25 * l} ` +
      `C${cx + h} ${t + 0.38 * l} ${cx + tl} ${t + 0.4 * l} ${cx + tl} ${t + 0.5 * l} ` +
      `C${cx + tl} ${t + 0.6 * l} ${cx + h} ${t + 0.62 * l} ${cx + h} ${t + 0.75 * l} ` +
      `C${cx + h} ${b - 0.08 * l} ${cx + h} ${b} ${cx} ${b} ` +
      `C${cx - h} ${b} ${cx - h} ${b - 0.08 * l} ${cx - h} ${t + 0.75 * l} ` +
      `C${cx - h} ${t + 0.62 * l} ${cx - tl} ${t + 0.6 * l} ${cx - tl} ${t + 0.5 * l} ` +
      `C${cx - tl} ${t + 0.4 * l} ${cx - h} ${t + 0.38 * l} ${cx - h} ${t + 0.25 * l} ` +
      `C${cx - h} ${t + 0.08 * l} ${cx - h} ${t} ${cx} ${t} Z`
    );
  };
  return (
    <g>
      <path d={form(breite, laenge, oben)} fill={F.petrolHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d={form(breite * 0.56, laenge * 0.78, oben + laenge * 0.11)} fill={F.petrol} stroke={F.leise} strokeWidth="2" />
    </g>
  );
}

/** Pants von vorn: wie Unterwäsche zum Hochziehen, mit Gummibund. */
function Pants({ cx, oben }: { cx: number; oben: number }) {
  const u = oben + 190;
  const d =
    `M${cx - 100} ${oben} L${cx + 100} ${oben} L${cx + 94} ${oben + 96} ` +
    `C${cx + 60} ${oben + 104} ${cx + 38} ${oben + 140} ${cx + 34} ${u} ` +
    `L${cx - 34} ${u} C${cx - 38} ${oben + 140} ${cx - 60} ${oben + 104} ${cx - 94} ${oben + 96} Z`;
  return (
    <g>
      <path d={d} fill={F.petrolHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <rect x={cx - 26} y={oben + 64} width="52" height={u - oben - 70} rx="20" fill={F.petrol} stroke={F.leise} strokeWidth="2" />
      <rect x={cx - 100} y={oben} width="200" height="26" fill={F.petrol} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <g stroke={F.leise} strokeWidth="2" strokeLinecap="round">
        {[-80, -60, -40, -20, 0, 20, 40, 60, 80].map((x) => (
          <line key={x} x1={cx + x} y1={oben + 7} x2={cx + x} y2={oben + 19} />
        ))}
      </g>
    </g>
  );
}

/** Kondom-Urinal mit Schlauch zum Beinbeutel (nur das Produkt). */
function KondomUrinal() {
  const schlauch = 'M150 430 C196 430 214 440 224 478';
  return (
    <g>
      {/* Hülle mit Rollrand links und Ablauf rechts */}
      <path d="M48 408 L112 408 Q138 408 140 430 Q138 452 112 452 L48 452 Z" fill={F.kupferHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="48" cy="430" rx="10" ry="27" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <rect x="138" y="423" width="14" height="14" rx="3" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />
      {/* Schlauch */}
      <path d={schlauch} {...KONTUR} strokeWidth="12" />
      <path d={schlauch} fill="none" stroke={F.petrolHell} strokeWidth="5" strokeLinecap="round" />
      {/* Bänder ums Bein */}
      {[512, 592].map((y) => (
        <rect key={y} x="160" y={y} width="170" height="16" rx="8" fill={F.petrol} stroke={F.leise} strokeWidth="3" />
      ))}
      {/* Beinbeutel mit Ablasshahn */}
      <rect x="190" y="476" width="110" height="146" rx="22" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <path d="M194 560 L296 560 L296 600 Q296 618 278 618 L212 618 Q194 618 194 600 Z" fill={F.petrolHell} />
      <rect x="190" y="476" width="110" height="146" rx="22" fill="none" stroke={F.linie} strokeWidth="4" />
      <rect x="236" y="620" width="18" height="16" rx="3" fill={F.petrol} stroke={F.linie} strokeWidth="3" />
    </g>
  );
}

/** Saugende Bettunterlage, flach liegend in leichter Schrägsicht, gesteppt. */
function Bettschutz() {
  const linien = [0.25, 0.5, 0.75];
  // Ecken: vorn links/rechts (y 610), hinten links/rechts (y 450)
  const vl: [number, number] = [404, 610];
  const vr: [number, number] = [676, 610];
  const hl: [number, number] = [442, 450];
  const hr: [number, number] = [638, 450];
  const mix = (a: [number, number], b: [number, number], t: number) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  return (
    <g>
      <path d={`M${vl} L${vr} L${hr} L${hl} Z`} fill={F.petrolHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d="M432 590 L648 590 L622 470 L458 470 Z" fill={F.petrol} stroke={F.leise} strokeWidth="2" strokeLinejoin="round" />
      <g stroke={F.leise} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round">
        {linien.map((t) => {
          const [x1, y1] = mix(vl, vr, t);
          const [x2, y2] = mix(hl, hr, t);
          return <line key={`s${t}`} x1={x1} y1={y1 - 20} x2={x2} y2={y2 + 20} />;
        })}
        {linien.map((t) => {
          const [x1, y1] = mix(vl, hl, t);
          const [x2, y2] = mix(vr, hr, t);
          return <line key={`q${t}`} x1={x1 + 28} y1={y1} x2={x2 - 28} y2={y2} />;
        })}
      </g>
    </g>
  );
}

export default function InkontinenzHilfen() {
  return (
    <Zeichnung titel="Vier Hilfen bei Blasenschwäche: Einlage für die Unterwäsche, Pants zum Hochziehen, Kondom-Urinal mit Beinbeutel für Männer und Bettschutz als saugende Unterlage">
      <g transform="rotate(90 180 150)">
        <Vorlage cx={180} oben={10} laenge={280} breite={116} />
      </g>
      <Pants cx={540} oben={56} />
      <KondomUrinal />
      <Bettschutz />

      <Etikett x={180} y={300} anker="middle">
        Einlage
      </Etikett>
      <Etikett x={540} y={300} anker="middle">
        Pants
      </Etikett>
      <Etikett x={180} y={672} anker="middle">
        Kondom-Urinal
      </Etikett>
      <Unterzeile x={180} y={702} anker="middle">
        für Männer
      </Unterzeile>
      <Etikett x={540} y={672} anker="middle">
        Bettschutz
      </Etikett>
    </Zeichnung>
  );
}
