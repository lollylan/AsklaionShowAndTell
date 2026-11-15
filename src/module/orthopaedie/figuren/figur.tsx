// Baukasten für die Übungsbilder: eine Gliederpuppe von der Seite plus Zubehör.
//
// Jede Übung hat eine eigene Datei in diesem Ordner (<uebung-id>.tsx), die als default eine
// Komponente ohne Props exportiert und <Uebungsbild> als Rahmen benutzt. Fläche 800 × 500,
// der dunkle Petrol-Hintergrund kommt von außen.
//
// WINKEL: Jedes Körperteil bekommt eine absolute Richtung in Grad, gemessen von „senkrecht nach
// unten“: 0 = nach unten, 90 = nach vorn (rechts im Bild, dorthin schaut die Figur),
// 180 = nach oben, -90 = nach hinten (links). Werte dazwischen gehen fließend.
//
//   Aufrecht stehen:  rumpf 180, Arme 0/0, Beine 0/0
//   Auf dem Rücken liegen, Kopf links:  rumpf -90, Beine 90/90 (Nase zeigt von selbst nach oben)
//   Auf dem Bauch liegen, Kopf rechts:  rumpf 90, Beine -90/-90, nase 0 (nach unten)
//   Sitzen auf dem Stuhl:  rumpf 180, Oberschenkel 90, Unterschenkel 0
//
// „nah“ ist die dem Betrachter zugewandte Körperseite (hell gezeichnet), „fern“ die andere
// (blasser, dahinter). Mit `betont` leuchtet ein Teil kupfern – dort dehnt oder arbeitet es.
// Mit `geist` wird die Figur blass gezeichnet: die Ausgangsstellung hinter der Zielstellung.

import type { ReactNode } from 'react';
import { F } from '../../aufklaerungen/bilder/bausteine';
import { datei as pfadZu, gibtEs } from '../../../kern/pfad';

export { F };

type Punkt = [number, number];

/** Länge der Körperteile in px. Die Figur ist stehend etwa 440 px hoch. */
export const LAENGE = {
  rumpf: 150,
  hals: 20,
  kopf: 27,
  oberarm: 78,
  unterarm: 72,
  oberschenkel: 108,
  unterschenkel: 104,
  fuss: 36,
} as const;

export type Teil =
  | 'rumpf'
  | 'nacken'
  | 'oberarm'
  | 'unterarm'
  | 'oberschenkel'
  | 'unterschenkel'
  | 'fuss';

/** Ein betontes Teil: „wade“ der nahen Seite = 'unterschenkel', der fernen = 'unterschenkel:fern'. */
export type Betont = Teil | `${Exclude<Teil, 'rumpf' | 'nacken'>}:fern`;

export interface Pose {
  /** Lage des Hüftgelenks in px. */
  huefte: Punkt;
  /** Richtung Hüfte → Schulter. */
  rumpf: number;
  /** Richtung Schulter → Kopf; ohne Angabe wie der Rumpf. */
  kopf?: number;
  /** Wohin die Nase zeigt; ohne Angabe 90° vor der Kopfrichtung (aufrecht: nach vorn). */
  nase?: number;
  /** [Oberarm, Unterarm] der nahen und der fernen Seite. */
  arme: { nah: [number, number]; fern: [number, number] };
  /** [Oberschenkel, Unterschenkel, Fuß?]; der Fuß steht ohne Angabe im rechten Winkel nach vorn. */
  beine: { nah: [number, number, number?]; fern: [number, number, number?] };
  betont?: Betont[];
}

const BOGEN = Math.PI / 180;

/** Einheitsvektor einer Richtung (siehe WINKEL oben). */
export function richtung(grad: number): Punkt {
  return [Math.sin(grad * BOGEN), Math.cos(grad * BOGEN)];
}

function weiter(p: Punkt, grad: number, laenge: number): Punkt {
  const [dx, dy] = richtung(grad);
  return [p[0] + dx * laenge, p[1] + dy * laenge];
}

/** Alle Gelenkpunkte einer Pose – nützlich, um Zubehör (Band, Hantel, Wand) anzulegen. */
export function gelenke(pose: Pose) {
  const huefte = pose.huefte;
  const schulter = weiter(huefte, pose.rumpf, LAENGE.rumpf);
  const kopfRichtung = pose.kopf ?? pose.rumpf;
  const kopf = weiter(schulter, kopfRichtung, LAENGE.hals + LAENGE.kopf);
  const arm = ([o, u]: [number, number]) => {
    const ellenbogen = weiter(schulter, o, LAENGE.oberarm);
    const handgelenk = weiter(ellenbogen, u, LAENGE.unterarm);
    return { ellenbogen, handgelenk, hand: weiter(handgelenk, u, 10) };
  };
  const bein = ([o, u, f]: [number, number, number?]) => {
    const knie = weiter(huefte, o, LAENGE.oberschenkel);
    const knoechel = weiter(knie, u, LAENGE.unterschenkel);
    const fussRichtung = f ?? u + 90;
    return {
      knie,
      knoechel,
      ferse: weiter(knoechel, fussRichtung, -8),
      zehen: weiter(knoechel, fussRichtung, LAENGE.fuss),
    };
  };
  return {
    huefte,
    schulter,
    kopf,
    kopfRichtung,
    armNah: arm(pose.arme.nah),
    armFern: arm(pose.arme.fern),
    beinNah: bein(pose.beine.nah),
    beinFern: bein(pose.beine.fern),
  };
}

function Strecke({ a, b, farbe, breite }: { a: Punkt; b: Punkt; farbe: string; breite: number }) {
  return (
    <line
      x1={a[0]}
      y1={a[1]}
      x2={b[0]}
      y2={b[1]}
      stroke={farbe}
      strokeWidth={breite}
      strokeLinecap="round"
    />
  );
}

/** Die Gliederpuppe. */
export function Figur({ pose, geist = false }: { pose: Pose; geist?: boolean }) {
  const g = gelenke(pose);
  const betont = new Set(geist ? [] : (pose.betont ?? []));
  const hell = geist ? F.petrolHell : F.creme;
  const blass = geist ? F.petrolHell : F.leise;
  const deckkraft = geist ? 0.5 : 1;
  const glut = (teil: Betont, a: Punkt, b: Punkt) =>
    betont.has(teil) ? <Strecke a={a} b={b} farbe={F.kupfer} breite={11} /> : null;

  const nase = pose.nase ?? g.kopfRichtung - 90;
  const nasenSpitze = weiter(g.kopf, nase, LAENGE.kopf + 9);
  const nasenFuss1 = weiter(g.kopf, nase - 24, LAENGE.kopf - 2);
  const nasenFuss2 = weiter(g.kopf, nase + 24, LAENGE.kopf - 2);
  const halsEnde = weiter(g.schulter, g.kopfRichtung, LAENGE.hals);

  return (
    <g opacity={deckkraft}>
      {/* Ferne Seite zuerst, dünner und blasser */}
      <g>
        <Strecke a={g.huefte} b={g.beinFern.knie} farbe={blass} breite={20} />
        <Strecke a={g.beinFern.knie} b={g.beinFern.knoechel} farbe={blass} breite={18} />
        <Strecke a={g.beinFern.ferse} b={g.beinFern.zehen} farbe={blass} breite={14} />
        {glut('oberschenkel:fern', g.huefte, g.beinFern.knie)}
        {glut('unterschenkel:fern', g.beinFern.knie, g.beinFern.knoechel)}
        {glut('fuss:fern', g.beinFern.ferse, g.beinFern.zehen)}
        <Strecke a={g.schulter} b={g.armFern.ellenbogen} farbe={blass} breite={16} />
        <Strecke a={g.armFern.ellenbogen} b={g.armFern.handgelenk} farbe={blass} breite={14} />
        <circle cx={g.armFern.hand[0]} cy={g.armFern.hand[1]} r={9} fill={blass} />
        {glut('oberarm:fern', g.schulter, g.armFern.ellenbogen)}
        {glut('unterarm:fern', g.armFern.ellenbogen, g.armFern.handgelenk)}
      </g>

      {/* Rumpf, Hals, Kopf */}
      <Strecke a={g.huefte} b={g.schulter} farbe={hell} breite={36} />
      {glut('rumpf', g.huefte, g.schulter)}
      <Strecke a={g.schulter} b={halsEnde} farbe={hell} breite={14} />
      {glut('nacken', g.schulter, halsEnde)}
      <circle cx={g.kopf[0]} cy={g.kopf[1]} r={LAENGE.kopf} fill={hell} />
      <path
        d={`M${nasenFuss1[0]} ${nasenFuss1[1]} L${nasenSpitze[0]} ${nasenSpitze[1]} L${nasenFuss2[0]} ${nasenFuss2[1]} Z`}
        fill={hell}
        stroke={hell}
        strokeWidth={4}
        strokeLinejoin="round"
      />

      {/* Nahe Seite */}
      <g>
        <Strecke a={g.huefte} b={g.beinNah.knie} farbe={hell} breite={22} />
        <Strecke a={g.beinNah.knie} b={g.beinNah.knoechel} farbe={hell} breite={20} />
        <Strecke a={g.beinNah.ferse} b={g.beinNah.zehen} farbe={hell} breite={15} />
        {glut('oberschenkel', g.huefte, g.beinNah.knie)}
        {glut('unterschenkel', g.beinNah.knie, g.beinNah.knoechel)}
        {glut('fuss', g.beinNah.ferse, g.beinNah.zehen)}
        <Strecke a={g.schulter} b={g.armNah.ellenbogen} farbe={hell} breite={18} />
        <Strecke a={g.armNah.ellenbogen} b={g.armNah.handgelenk} farbe={hell} breite={16} />
        <circle cx={g.armNah.hand[0]} cy={g.armNah.hand[1]} r={10} fill={hell} />
        {glut('oberarm', g.schulter, g.armNah.ellenbogen)}
        {glut('unterarm', g.armNah.ellenbogen, g.armNah.handgelenk)}
      </g>
    </g>
  );
}

/** Rahmen jedes Übungsbilds, 800 × 500. titel = ein Satz für Vorleseprogramme. */
export function Uebungsbild({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <svg className="uebungsbild" viewBox="0 0 800 500" role="img" aria-label={titel}>
      <defs>
        <marker
          id="uebung-pfeil"
          viewBox="0 0 12 12"
          refX="8"
          refY="6"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path d="M1 1 L11 6 L1 11 Z" fill={F.kupferHell} />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

const LINIE = { stroke: F.leise, strokeWidth: 4, strokeLinecap: 'round', fill: 'none' } as const;

/** Fußboden als waagrechte Linie. */
export function Boden({ y = 470, von = 40, bis = 760 }: { y?: number; von?: number; bis?: number }) {
  return <line x1={von} y1={y} x2={bis} y2={y} {...LINIE} />;
}

/** Gymnastikmatte (flaches Rechteck auf dem Boden). */
export function Matte({ y = 470, von = 90, bis = 710 }: { y?: number; von?: number; bis?: number }) {
  return (
    <>
      <rect x={von} y={y - 12} width={bis - von} height={12} rx={6} fill={F.petrolDunkel} />
      <Boden y={y} />
    </>
  );
}

/** Wand als senkrechte Linie mit Schraffur auf der Rückseite. */
export function Wand({ x, oben = 30, unten = 470, seite = 'rechts' }: { x: number; oben?: number; unten?: number; seite?: 'links' | 'rechts' }) {
  const d = seite === 'rechts' ? 1 : -1;
  const striche = [];
  for (let y = oben + 20; y < unten; y += 34) {
    striche.push(<line key={y} x1={x} y1={y} x2={x + d * 16} y2={y - 16} stroke={F.petrolHell} strokeWidth={3} />);
  }
  return (
    <g>
      {striche}
      <line x1={x} y1={oben} x2={x} y2={unten} {...LINIE} />
    </g>
  );
}

/** Stufe oder Treppenkante: obere Vorderkante bei (x, y), Breite nach rechts. */
export function Stufe({ x, y, breite = 160, boden = 470 }: { x: number; y: number; breite?: number; boden?: number }) {
  return (
    <path
      d={`M${x} ${boden} L${x} ${y} L${x + breite} ${y} L${x + breite} ${boden}`}
      fill={F.petrolDunkel}
      stroke={F.leise}
      strokeWidth={4}
      strokeLinejoin="round"
    />
  );
}

/** Stuhl von der Seite, Lehne links. Sitzfläche vorn bei (x, y), Tiefe 110. */
export function Stuhl({ x, y, boden = 470, lehne = 'links' }: { x: number; y: number; boden?: number; lehne?: 'links' | 'rechts' }) {
  const d = lehne === 'links' ? -1 : 1;
  const hinten = x + d * 110;
  return (
    <g {...LINIE}>
      <line x1={x} y1={y} x2={hinten} y2={y} strokeWidth={8} />
      <line x1={x} y1={y} x2={x} y2={boden} />
      <line x1={hinten} y1={y} x2={hinten} y2={boden} />
      <line x1={hinten} y1={y} x2={hinten + d * 8} y2={y - 150} strokeWidth={6} />
    </g>
  );
}

/** Ball oder Flasche unter dem Fuß: Kreis mit Mittelpunkt (x, y). */
export function Ball({ x, y, r = 16 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill={F.petrolHell} stroke={F.leise} strokeWidth={3} />;
}

/** Kleine Hantel bzw. Wasserflasche in der Hand bei (x, y). */
export function Hantel({ x, y }: { x: number; y: number }) {
  return (
    <g fill={F.leise}>
      <rect x={x - 22} y={y - 4} width={44} height={8} rx={4} />
      <rect x={x - 26} y={y - 12} width={10} height={24} rx={3} />
      <rect x={x + 16} y={y - 12} width={10} height={24} rx={3} />
    </g>
  );
}

/** Übungsband oder Handtuch als Linie zwischen Punkten (gerade oder durch `d` gebogen). */
export function Band({ punkte, farbe = F.kupferHell }: { punkte: Punkt[]; farbe?: string }) {
  const d = punkte.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]} ${p[1]}`).join(' ');
  return <path d={d} fill="none" stroke={farbe} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />;
}

/** Bewegungspfeil (Kupfer, dünn) entlang eines SVG-Pfads. */
export function Bewegung({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={F.kupferHell}
      strokeWidth={5}
      strokeLinecap="round"
      strokeDasharray="2 12"
      markerEnd="url(#uebung-pfeil)"
    />
  );
}

/** Kurzer Hinweis im Bild, 24 px. */
export function Hinweis({ x, y, anker = 'start', children }: { x: number; y: number; anker?: 'start' | 'middle' | 'end'; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor={anker} fontSize="24" fontWeight="700" fill={F.kupferHell} fontFamily="Merriweather, serif">
      {children}
    </text>
  );
}

/**
 * Generiertes Rasterbild (public/bilder/orthopaedie/uebungen/<datei>) als ganze Fläche des
 * Übungsbilds, mit abgerundeten Ecken. Für Übungen, die sich mit dem Baukasten nicht
 * verständlich zeichnen lassen. Hinweise u. ä. als children darüber.
 */
export function Bildvorlage({ datei, children }: { datei: string; children?: ReactNode }) {
  const clip = `vorlage-${datei.replace(/[^a-z0-9-]/gi, '-')}`;
  const pfad = `/bilder/orthopaedie/uebungen/${datei}`;
  if (!gibtEs(pfad)) {
    // Diese Fassung liefert das Bild nicht aus (werkzeuge/gesperrt.txt): ruhige Fläche mit Hinweis.
    // Die Beschriftungen (children) zeigen auf Stellen im Bild und entfallen mit ihm.
    return (
      <>
        <rect width={800} height={500} rx={14} fill="currentColor" opacity={0.06} />
        <text x={400} y={258} textAnchor="middle" fontSize={26} fill="currentColor" opacity={0.65}>
          Die Illustration ist in dieser Fassung nicht enthalten.
        </text>
      </>
    );
  }
  return (
    <>
      <clipPath id={clip}>
        <rect width={800} height={500} rx={14} />
      </clipPath>
      <image
        href={pfadZu(pfad)}
        width={800}
        height={500}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clip})`}
      />
      {children}
    </>
  );
}
