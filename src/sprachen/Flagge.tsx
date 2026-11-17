import type { ReactNode } from 'react';
import type { FlaggenId } from './sprachen';

// Kleine, vereinfachte Flaggen als SVG (Seitenverhältnis 3 : 2). Emoji-Flaggen zeigt Windows
// nicht an, deshalb gezeichnet. Die Flagge hilft beim Finden; maßgeblich ist der Sprachname.

/** Fünfzackiger Stern als Pfad, Mittelpunkt (x, y), Außenradius r, Drehung in Grad. */
function stern(x: number, y: number, r: number, drehung = 0): string {
  const punkte: string[] = [];
  for (let i = 0; i < 10; i++) {
    const winkel = ((drehung - 90 + i * 36) * Math.PI) / 180;
    const radius = i % 2 === 0 ? r : r * 0.382;
    punkte.push(`${(x + radius * Math.cos(winkel)).toFixed(2)},${(y + radius * Math.sin(winkel)).toFixed(2)}`);
  }
  return `M${punkte.join('L')}Z`;
}

const quer = (farben: string[]) =>
  farben.map((f, i) => (
    <rect key={i} x="0" y={(20 / farben.length) * i} width="30" height={20 / farben.length + 0.01} fill={f} />
  ));

const hoch = (farben: string[]) =>
  farben.map((f, i) => (
    <rect key={i} x={(30 / farben.length) * i} y="0" width={30 / farben.length + 0.01} height="20" fill={f} />
  ));

/** Trigramm der koreanischen Flagge: drei Balken, `ganz` sagt je Balken, ob er durchgeht. */
function trigramm(ganz: boolean[], cx: number, cy: number, drehung: number) {
  return (
    <g transform={`rotate(${drehung} ${cx} ${cy})`} fill="#000">
      {ganz.map((g, i) => {
        const y = cy - 1.6 + i * 1.3;
        return g ? (
          <rect key={i} x={cx - 2} y={y} width="4" height="0.75" />
        ) : (
          <g key={i}>
            <rect x={cx - 2} y={y} width="1.75" height="0.75" />
            <rect x={cx + 0.25} y={y} width="1.75" height="0.75" />
          </g>
        );
      })}
    </g>
  );
}

const ZEICHNUNG: Record<FlaggenId, ReactNode> = {
  de: quer(['#000', '#dd0000', '#ffce00']),
  fr: hoch(['#002654', '#fff', '#ce1126']),
  ru: quer(['#fff', '#0039a6', '#d52b1e']),
  ua: quer(['#0057b7', '#ffd700']),
  pl: quer(['#fff', '#dc143c']),
  ro: hoch(['#002b7f', '#fcd116', '#ce1126']),
  ir: quer(['#239f40', '#fff', '#da0000']),
  sy: (
    <>
      {quer(['#007a3d', '#fff', '#000'])}
      <path d={stern(9, 10, 2.2)} fill="#ce1126" />
      <path d={stern(15, 10, 2.2)} fill="#ce1126" />
      <path d={stern(21, 10, 2.2)} fill="#ce1126" />
    </>
  ),
  gb: (
    <>
      <rect width="30" height="20" fill="#012169" />
      <path d="M0,0 30,20 M30,0 0,20" stroke="#fff" strokeWidth="4" />
      <path d="M0,0 30,20 M30,0 0,20" stroke="#c8102e" strokeWidth="1.4" />
      <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="6" />
      <path d="M15,0 V20 M0,10 H30" stroke="#c8102e" strokeWidth="3.4" />
    </>
  ),
  tr: (
    <>
      <rect width="30" height="20" fill="#e30a17" />
      <circle cx="11" cy="10" r="5" fill="#fff" />
      <circle cx="12.25" cy="10" r="4" fill="#e30a17" />
      <path d={stern(17.6, 10, 2.2, -90)} fill="#fff" />
    </>
  ),
  cn: (
    <>
      <rect width="30" height="20" fill="#ee1c25" />
      <path d={stern(5, 5, 3)} fill="#ffff00" />
      <path d={stern(10, 2, 1, 23)} fill="#ffff00" />
      <path d={stern(12, 4, 1, 45)} fill="#ffff00" />
      <path d={stern(12, 7, 1, 70)} fill="#ffff00" />
      <path d={stern(10, 9, 1, 20)} fill="#ffff00" />
    </>
  ),
  jp: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="6" fill="#bc002d" />
    </>
  ),
  kr: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <g transform="rotate(33.7 15 10)">
        <circle cx="15" cy="10" r="5" fill="#0047a0" />
        <path d="M10,10 A5,5 0 0 1 20,10 A2.5,2.5 0 0 1 15,10 A2.5,2.5 0 0 0 10,10Z" fill="#cd2e3a" />
      </g>
      {trigramm([true, true, true], 6, 4.5, 56.3)}
      {trigramm([false, false, false], 24, 15.5, 56.3)}
      {trigramm([true, false, true], 24, 4.5, -56.3)}
      {trigramm([false, true, false], 6, 15.5, -56.3)}
    </>
  ),
};

export function Flagge({ id, breite = 24 }: { id: FlaggenId; breite?: number }) {
  return (
    <svg
      className="flagge"
      viewBox="0 0 30 20"
      width={breite}
      height={(breite * 2) / 3}
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id={`flagge-${id}`}>
        <rect width="30" height="20" rx="2" />
      </clipPath>
      <g clipPath={`url(#flagge-${id})`}>{ZEICHNUNG[id]}</g>
      <rect
        x="0.25"
        y="0.25"
        width="29.5"
        height="19.5"
        rx="1.9"
        fill="none"
        stroke="rgb(0 0 0 / 0.18)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
