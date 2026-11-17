import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

// Gemeinsamer Schnitt durch die Bauchwand, auch für nabelbruch.tsx, hernie-netz.tsx und
// hernie-einklemmung.tsx. Oben liegt der Bauchraum (innen), darunter von innen nach außen:
// Bauchfell, Muskelschicht, Unterhautfett und Haut. Ein Bruch drückt nach unten (außen) durch.

const LINKS = 30;
const RECHTS = 690;
/** Bauchfell an der Innenseite der Bauchwand. */
export const BAUCHFELL_Y = 250;
/** Ober- und Unterkante der Muskelschicht. */
export const MUSKEL_OBEN = 260;
export const MUSKEL_UNTEN = 320;
/** Unterkante des Fetts und Außenseite der Haut. */
const FETT_UNTEN = 380;
export const HAUT_Y = 394;

export interface Luecke {
  /** Mitte der Lücke in x. */
  mitte: number;
  /** halbe Breite der Lücke. */
  halb: number;
}

export interface Beule {
  mitte: number;
  /** halbe Breite der Vorwölbung an der Haut. */
  halb: number;
  /** wie weit die Haut nach außen gedrückt wird. */
  tiefe: number;
}

/** Fläche zwischen Muskel und einer Unterkante, mit Vorwölbung. */
function weichteil(unten: number, beule?: Beule) {
  if (!beule) return `M${LINKS} ${MUSKEL_UNTEN} L${RECHTS} ${MUSKEL_UNTEN} L${RECHTS} ${unten} L${LINKS} ${unten} Z`;
  const { mitte: m, halb: h, tiefe: t } = beule;
  return (
    `M${LINKS} ${MUSKEL_UNTEN} L${RECHTS} ${MUSKEL_UNTEN} L${RECHTS} ${unten} L${m + h} ${unten} ` +
    `C${m + h * 0.5} ${unten} ${m + h * 0.62} ${unten + t} ${m} ${unten + t} ` +
    `C${m - h * 0.62} ${unten + t} ${m - h * 0.5} ${unten} ${m - h} ${unten} L${LINKS} ${unten} Z`
  );
}

/** Außenlinie der Haut, mit Vorwölbung. */
function hautlinie(beule?: Beule) {
  if (!beule) return `M${LINKS} ${HAUT_Y} L${RECHTS} ${HAUT_Y}`;
  const { mitte: m, halb: h, tiefe: t } = beule;
  return (
    `M${LINKS} ${HAUT_Y} L${m - h} ${HAUT_Y} ` +
    `C${m - h * 0.5} ${HAUT_Y} ${m - h * 0.62} ${HAUT_Y + t} ${m} ${HAUT_Y + t} ` +
    `C${m + h * 0.62} ${HAUT_Y + t} ${m + h * 0.5} ${HAUT_Y} ${m + h} ${HAUT_Y} L${RECHTS} ${HAUT_Y}`
  );
}

/** Tiefster Punkt der Haut über einer Vorwölbung. */
export function hautScheitel(beule: Beule): [number, number] {
  return [beule.mitte, HAUT_Y + beule.tiefe];
}

/**
 * Bruchsack: das Bauchfell stülpt sich durch die Lücke nach außen.
 * breite = wie weit der Sack zur Seite ausladet, tiefe = tiefster Punkt unter dem Bauchfell.
 */
export function sackPfad(luecke: Luecke, breite: number, tiefe: number) {
  const a = luecke.mitte - luecke.halb;
  const b = luecke.mitte + luecke.halb;
  const m = luecke.mitte;
  const boden = BAUCHFELL_Y + tiefe;
  const hals = MUSKEL_UNTEN + 2;
  return (
    `M${a - 8} ${BAUCHFELL_Y} C${a + 6} ${BAUCHFELL_Y} ${a + 8} ${BAUCHFELL_Y + 30} ${a + 8} ${hals} ` +
    `C${m - breite} ${hals + 30} ${m - breite} ${boden} ${m} ${boden} ` +
    `C${m + breite} ${boden} ${m + breite} ${hals + 30} ${b - 8} ${hals} ` +
    `C${b - 8} ${BAUCHFELL_Y + 30} ${b - 6} ${BAUCHFELL_Y} ${b + 8} ${BAUCHFELL_Y}`
  );
}

/** Mittelpunkte der Fettläppchen im Unterhautfett (werden auf das Fett beschnitten). */
const LAEPPCHEN: [number, number][] = [];
for (let reihe = 0; reihe < 9; reihe++) {
  for (let spalte = 0; spalte < 24; spalte++) {
    LAEPPCHEN.push([LINKS + 4 + spalte * 30 + (reihe % 2) * 15, 340 + reihe * 28]);
  }
}

/** Muskelschicht, bei `luecke` in zwei Teilen mit runden Rändern. */
function Muskel({ luecke }: { luecke?: Luecke }) {
  const o = MUSKEL_OBEN;
  const u = MUSKEL_UNTEN;
  const teile = luecke
    ? [
        `M${LINKS} ${o} L${luecke.mitte - luecke.halb - 12} ${o} C${luecke.mitte - luecke.halb + 8} ${o} ${luecke.mitte - luecke.halb + 8} ${u} ${luecke.mitte - luecke.halb - 12} ${u} L${LINKS} ${u} Z`,
        `M${RECHTS} ${o} L${luecke.mitte + luecke.halb + 12} ${o} C${luecke.mitte + luecke.halb - 8} ${o} ${luecke.mitte + luecke.halb - 8} ${u} ${luecke.mitte + luecke.halb + 12} ${u} L${RECHTS} ${u} Z`,
      ]
    : [`M${LINKS} ${o} L${RECHTS} ${o} L${RECHTS} ${u} L${LINKS} ${u} Z`];
  return (
    <g>
      {teile.map((d) => (
        <path key={d} d={d} fill={F.petrol} {...{ stroke: F.linie, strokeWidth: 4, strokeLinejoin: 'round' as const }} />
      ))}
      {/* Muskelfasern */}
      <g stroke={F.petrolHell} strokeWidth="3" strokeLinecap="round">
        {[280, 300].map((y) =>
          luecke ? (
            <g key={y}>
              <line x1={LINKS + 14} y1={y} x2={luecke.mitte - luecke.halb - 20} y2={y} />
              <line x1={luecke.mitte + luecke.halb + 20} y1={y} x2={RECHTS - 14} y2={y} />
            </g>
          ) : (
            <line key={y} x1={LINKS + 14} y1={y} x2={RECHTS - 14} y2={y} />
          ),
        )}
      </g>
    </g>
  );
}

/** Darm als Schlauch entlang d. */
export function Darm({ d, farbe = F.petrolHell, dicke = 36 }: { d: string; farbe?: string; dicke?: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={F.linie} strokeWidth={dicke + 8} />
      <path d={d} stroke={farbe} strokeWidth={dicke} />
    </g>
  );
}

/**
 * Schnitt durch die Bauchwand. `luecke` öffnet die Muskelschicht, `beule` wölbt Fett und Haut
 * nach außen, `bauchfell` ersetzt die gerade Linie des Bauchfells. `sack` liegt zwischen
 * Weichteilen und Muskel, `children` obenauf (Darm, Netz, Zeiger).
 */
export function Wandschnitt({
  id,
  luecke,
  beule,
  bauchfell,
  sack,
  children,
}: {
  /** Vorsilbe für die clipPath-id (Dateiname). */
  id: string;
  luecke?: Luecke;
  beule?: Beule;
  bauchfell?: string;
  sack?: ReactNode;
  children?: ReactNode;
}) {
  const fett = weichteil(FETT_UNTEN, beule && { ...beule, halb: beule.halb - 12, tiefe: beule.tiefe - 14 });
  return (
    <g>
      {/* Haut und Unterhautfett */}
      <path d={weichteil(HAUT_Y, beule)} fill={F.creme} />
      <clipPath id={`${id}-fett`}>
        <path d={fett} />
      </clipPath>
      <path d={fett} fill={F.petrolDunkel} />
      {/* Fettläppchen */}
      <g clipPath={`url(#${id}-fett)`} fill="none" stroke={F.petrol} strokeWidth="2">
        {LAEPPCHEN.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="13" />
        ))}
      </g>
      <path d={hautlinie(beule)} {...KONTUR} />
      <path d={`M${LINKS} ${MUSKEL_UNTEN} L${LINKS} ${HAUT_Y} M${RECHTS} ${MUSKEL_UNTEN} L${RECHTS} ${HAUT_Y}`} {...KONTUR} />
      {sack}
      <Muskel luecke={luecke} />
      {/* Bauchfell */}
      <path
        d={bauchfell ?? `M${LINKS} ${BAUCHFELL_Y} L${RECHTS} ${BAUCHFELL_Y}`}
        fill="none"
        stroke={F.leise}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </g>
  );
}

/** Lücke und Vorwölbung beim Leistenbruch, auch für die Einklemmung. */
export const LEISTE_LUECKE: Luecke = { mitte: 360, halb: 70 };
export const LEISTE_BEULE: Beule = { mitte: 360, halb: 210, tiefe: 190 };
export const LEISTE_SACK = sackPfad(LEISTE_LUECKE, 135, 270);

/** Bauchfell mit Bruchsack (leise Linie außerhalb, der Sack selbst wird kupfern nachgezogen). */
export const LEISTE_BAUCHFELL =
  `M${LINKS} ${BAUCHFELL_Y} L${LEISTE_LUECKE.mitte - LEISTE_LUECKE.halb - 8} ${BAUCHFELL_Y} ` +
  `M${LEISTE_LUECKE.mitte + LEISTE_LUECKE.halb + 8} ${BAUCHFELL_Y} L${RECHTS} ${BAUCHFELL_Y}`;

/** Bruchsack mit heller Füllung und kupferner Kontur. */
export function Bruchsack({ d }: { d: string }) {
  return (
    <g>
      <path d={`${d} Z`} fill={F.petrolDunkel} />
      <path d={`${d} Z`} fill={F.kupfer} fillOpacity="0.35" />
      <path d={d} fill="none" stroke={F.kupferHell} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** Darm im Bauchraum, der als Schlinge durch die Lücke in den Bruchsack hängt. */
export const DARM_IM_BRUCH =
  'M60 120 C110 60 190 80 220 140 C246 192 300 196 324 250 C334 300 330 360 330 420 ' +
  'C330 466 390 466 390 420 C390 360 386 300 396 250 C412 200 440 150 420 96';

/** Dicke des Darmschlauchs in allen Schnittbildern. */
export const DARM_DICKE = 30;

/** Leistenbruch im Schnitt durch die Bauchwand: Darmschlinge im Bruchsack drückt durch eine Lücke nach außen. */
export default function Leistenbruch() {
  return (
    <Zeichnung titel="Schnitt durch die Bauchwand in der Leiste: durch eine Lücke in der Muskelschicht stülpt sich das Bauchfell als Bruchsack nach außen, darin eine Darmschlinge, die Haut wölbt sich vor">
      <Wandschnitt
        id="leistenbruch"
        luecke={LEISTE_LUECKE}
        beule={LEISTE_BEULE}
        bauchfell={LEISTE_BAUCHFELL}
        sack={<Bruchsack d={LEISTE_SACK} />}
      >
        <Darm d={DARM_IM_BRUCH} dicke={DARM_DICKE} />
      </Wandschnitt>

      <Unterzeile x={30} y={44}>
        Bauchraum (innen)
      </Unterzeile>

      <Etikett x={500} y={180}>
        Lücke
      </Etikett>
      <Unterzeile x={500} y={208}>
        Bruchpforte
      </Unterzeile>
      <Zeiger von={[500, 222]} nach={[420, 270]} />

      <Etikett x={30} y={460}>
        Bauchwand
      </Etikett>
      <Zeiger von={[90, 432]} nach={[110, 292]} />

      <Etikett x={30} y={560} farbe={F.kupferHell}>
        Bruchsack
      </Etikett>
      <Zeiger von={[196, 548]} nach={[256, 470]} />

      <Etikett x={700} y={530} anker="end">
        Darmschlinge
      </Etikett>
      <Zeiger von={[498, 520]} nach={[388, 440]} />

      <Etikett x={360} y={650} anker="middle" farbe={F.kupferHell}>
        Vorwölbung
      </Etikett>
      <Unterzeile x={360} y={680} anker="middle">
        in der Leiste
      </Unterzeile>
    </Zeichnung>
  );
}
