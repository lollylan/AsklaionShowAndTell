import type { ReactNode } from 'react';
import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

/** Auge von vorn, Mitte (0, 0), 180 breit; Bindehaut gerötet. */
function Auge({ children }: { children?: ReactNode }) {
  const form = 'M-90 0 Q0 -64 90 0 Q0 64 -90 0 Z';
  return (
    <g>
      <path d={form} fill={F.creme} />
      <path d={form} fill={F.kupfer} fillOpacity="0.35" />
      <path d="M-70 -6 q16 4 26 -2 M70 -6 q-16 4 -26 -2 M-66 10 q14 -2 24 4 M66 10 q-14 -2 -24 4" fill="none" stroke={F.kupfer} strokeWidth="2.5" strokeLinecap="round" />
      <circle r="30" fill={F.petrol} />
      <circle r="12" fill={F.tief} />
      <path d={form} fill="none" stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      {children}
    </g>
  );
}

function Traene({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y} q11 16 0 24 q-11 -8 0 -24 Z`} fill={F.petrolHell} stroke={F.leise} strokeWidth="2" />;
}

/** Drei Formen der Bindehautentzündung: durch Viren, Bakterien und Allergie. */
export default function BindehautentzuendungArten() {
  return (
    <Zeichnung titel="Drei gerötete Augen untereinander. Durch Viren: wässrig, mit Tränen, sehr ansteckend. Durch Bakterien: gelbes, eitriges Sekret am Lidrand, morgens verklebt. Durch Allergie: beide Augen rot und juckend, nicht ansteckend">
      <g transform="translate(170 140)">
        <Auge>
          <Traene x={-40} y={46} />
          <Traene x={-10} y={58} />
        </Auge>
      </g>
      <Etikett x={320} y={130}>
        Viren
      </Etikett>
      <Unterzeile x={320} y={162}>
        wässrig, sehr ansteckend
      </Unterzeile>

      <g transform="translate(170 360)">
        <Auge>
          <path d="M-80 10 Q0 52 80 10" fill="none" stroke={F.kupferHell} strokeWidth="9" strokeLinecap="round" />
          <circle cx="-86" cy="4" r="10" fill={F.kupferHell} />
        </Auge>
      </g>
      <Etikett x={320} y={350}>
        Bakterien
      </Etikett>
      <Unterzeile x={320} y={382}>
        gelber Eiter, morgens verklebt
      </Unterzeile>

      <g transform="translate(110 580) scale(0.6)">
        <Auge />
      </g>
      <g transform="translate(230 580) scale(0.6)">
        <Auge />
      </g>
      <Etikett x={320} y={570}>
        Allergie
      </Etikett>
      <Unterzeile x={320} y={602}>
        beide Augen jucken
      </Unterzeile>
      <Unterzeile x={320} y={634}>
        nicht ansteckend
      </Unterzeile>
    </Zeichnung>
  );
}
