import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { BEIN_RAND } from './kompression';

const S = 0.92;
const TX = 67;
const TY = -41;
/** Beinkoordinate in Bildkoordinate. */
const bx = (x: number) => TX + S * x;
const by = (y: number) => TY + S * y;

const strich = { ...KONTUR, vectorEffect: 'non-scaling-stroke' } as const;

/** Feste Seitenschale außen am Unterschenkel, unten bis in den Schuh. */
const SCHALE =
  'M184 296 C204 288 264 288 286 296 C282 380 282 460 290 540 C293 578 272 604 246 602 ' +
  'C220 600 212 574 212 540 C208 460 196 380 184 296 Z';

/** Einfacher Halbschuh um den Fuß, Zehen rechts. */
const SCHUH =
  'M230 536 C214 562 206 598 204 628 C202 656 206 668 214 672 L528 672 C548 672 550 646 536 628 ' +
  'C514 604 470 588 424 568 C392 554 362 542 338 530 C300 522 262 524 230 536 Z';

export default function SprunggelenkOrthese() {
  // Auf-und-ab-Bogen um das Sprunggelenk vor den Zehen
  const mx = bx(270);
  const my = by(520);
  const r = 300;
  const p = (w: number) => [mx + r * Math.cos((w * Math.PI) / 180), my + r * Math.sin((w * Math.PI) / 180)];
  const [a, b] = [p(-8), p(26)];
  const bogen = `M${a[0]} ${a[1]} A${r} ${r} 0 0 1 ${b[0]} ${b[1]}`;
  return (
    <Zeichnung titel="Unterschenkel und Fuß von der Seite im Schuh mit einer Sprunggelenk-Schiene: feste Seitenteile und Klettgurte. Den Fuß auf und ab bewegen ist erlaubt, seitliches Umknicken wird gebremst. Getragen wird sie etwa sechs Wochen im Schuh">
      <g transform={`translate(${TX} ${TY}) scale(${S})`}>
        <path d={`${BEIN_RAND} Z`} fill={F.petrol} />
        <path d={BEIN_RAND} {...strich} />

        {/* Schale mit Polster */}
        <path d={SCHALE} fill={F.kupfer} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <path d="M204 318 C222 312 250 312 268 318 C266 400 266 470 272 536" fill="none" stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

        {/* Klettgurte quer über das Bein */}
        {[
          'M180 352 L292 347',
          'M210 444 L288 441',
        ].map((d) => (
          <g key={d}>
            <path d={d} stroke={F.linie} strokeWidth="34" strokeLinecap="round" />
            <path d={d} stroke={F.kupferHell} strokeWidth="26" strokeLinecap="round" />
          </g>
        ))}

        {/* Schuh */}
        <path d={SCHUH} fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <path d="M204 652 L536 652" stroke={F.leise} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d="M366 556 L388 542 M392 568 L414 554 M418 580 L440 566" stroke={F.leise} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </g>

      {/* Auf und ab: erlaubt */}
      <path d={bogen} fill="none" stroke={F.linie} strokeWidth="5" strokeLinecap="round" markerStart="url(#pfeilspitze)" markerEnd="url(#pfeilspitze)" />
      <path d="M566 364 L578 377 L598 352" fill="none" stroke={F.petrolHell} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <Etikett x={690} y={334} anker="end">
        auf und ab
      </Etikett>
      <Unterzeile x={690} y={370} anker="end" farbe={F.linie}>
        erlaubt
      </Unterzeile>

      {/* Umknicken: gebremst */}
      <path d="M196 424 C146 440 120 492 136 548" fill="none" stroke={F.linie} strokeWidth="5" strokeLinecap="round" markerEnd="url(#pfeilspitze)" />
      <path d="M124 462 L178 516 M178 462 L124 516" stroke={F.kupferHell} strokeWidth="7" strokeLinecap="round" />
      <Etikett x={40} y={344}>
        Umknicken
      </Etikett>
      <Unterzeile x={40} y={378} farbe={F.kupferHell}>
        gebremst
      </Unterzeile>

      {/* Feste Seitenteile */}
      <Zeiger von={[400, 200]} nach={[bx(248), by(380)]} />
      <Etikett x={410} y={170}>
        feste Seitenteile
      </Etikett>
      <Unterzeile x={410} y={204}>
        mit Klettgurten
      </Unterzeile>

      <Unterzeile x={360} y={660} anker="middle" farbe={F.linie}>
        etwa 6 Wochen, im Schuh
      </Unterzeile>
    </Zeichnung>
  );
}
