import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/*
 * Untere Lendenwirbelsäule von der Seite, Bauch links, Rücken rechts (wie bandscheibenvorfall.tsx).
 * L4 ab y = 0, L5 ab y = 133, Kreuzbein ab y = 266. Wirbelkörper x = 0 … 120, Nerv bei x = 138.
 *
 * Bewegung (bewegung.css, nur auf der Bühne): Beim Wirbelgleiten steht die verrutschte Lage im SVG.
 * Die Gruppe über dem Kreuzbein (L4, Bandscheibe, L5 bis zur Lücke im Bogen) liegt in einer
 * festen Verschiebung um -VOR; die Klasse wirbelgleiten-gleiten schiebt sie anfangs um +VOR zurück
 * in die Flucht und lässt sie dann nach vorn gleiten. Untere Bandscheibe und Nervenstück dazwischen
 * werden auf dieselbe Weise geschert (skewX), damit alles verbunden bleibt.
 */
const VOR = 36;
/** Scherwinkel für die Bandscheibe L5/S1: oben um VOR verschoben bei 38 Höhe. */
const SCHEIBE_WINKEL = (Math.atan(VOR / 38) * 180) / Math.PI;
/** Scherwinkel für das Nervenstück zwischen y = 228 und 304. */
const NERV_WINKEL = (Math.atan(VOR / 76) * 180) / Math.PI;

/** Wirbelbogen: Bogenwurzel, oberer Gelenkfortsatz, Dornfortsatz, unterer Gelenkfortsatz. */
const BOGEN =
  'M114 14 L152 12 L156 -10 C158 -18 172 -18 174 -10 L178 14 C198 22 222 34 236 48 ' +
  'C246 60 240 74 228 74 C212 72 198 70 188 70 L196 102 C198 114 184 118 180 108 L166 64 L114 60 Z';

/** Kreuzbein: obere Deckplatte, Gelenkfortsatz hinten, Spitze nach hinten unten. */
const KREUZBEIN =
  'M14 266 L176 266 L184 240 C188 230 200 232 202 242 L212 292 C214 330 196 362 160 388 ' +
  'C140 402 110 404 100 390 C84 350 44 320 10 300 C0 290 0 270 14 266 Z';

const NERV_OBEN = 'M138 -20 L138 230';
const NERV_MITTE = 'M138 -76 L138 2';
const NERV_UNTEN = 'M138 302 L138 392';
const NERV_ENG = `M${138 - VOR} 228 C${138 - VOR} 262 138 268 138 304`;

function Wirbel({ bogen = true }: { bogen?: boolean }) {
  return (
    <>
      {bogen && <path d={BOGEN} {...KONTUR} fill={F.creme} />}
      <rect x="0" y="0" width="120" height="95" rx="14" {...KONTUR} fill={F.creme} />
    </>
  );
}

function Scheibe({ y }: { y: number }) {
  return <rect x="-4" y={y} width="128" height="54" rx="20" {...KONTUR} fill={F.petrol} />;
}

function NervHuelle({ d }: { d: string }) {
  return <path d={d} {...KONTUR} strokeWidth="24" />;
}
function NervKern({ d, farbe = F.leise }: { d: string; farbe?: string }) {
  return <path d={d} fill="none" stroke={farbe} strokeWidth="16" strokeLinecap="round" />;
}

function Gesund() {
  const nerv = 'M138 -20 L138 392';
  return (
    <g>
      <path d={KREUZBEIN} {...KONTUR} fill={F.creme} />
      <Scheibe y={87} />
      <Scheibe y={220} />
      <Wirbel />
      <g transform="translate(0 133)">
        <Wirbel />
      </g>
      <NervHuelle d={nerv} />
      <NervKern d={nerv} />
    </g>
  );
}

/** Bewegte Gruppe: in Ruhe nach vorn verrutscht, in Bewegung anfangs in der Flucht. */
function Gleitend({ children }: { children: ReactNode }) {
  return (
    <g transform={`translate(${-VOR} 0)`}>
      <g className="wirbelgleiten-gleiten">{children}</g>
    </g>
  );
}

/** Geschert wie die Bandscheibe L5/S1: unten fest bei y = unten, oben um VOR nach vorn. */
function Geschert({ unten, winkel, children }: { unten: number; winkel: number; children: ReactNode }) {
  return (
    <g transform={`translate(0 ${unten}) skewX(${winkel.toFixed(3)})`}>
      <g className={winkel === SCHEIBE_WINKEL ? 'wirbelgleiten-scheibe' : 'wirbelgleiten-nerv'}>{children}</g>
    </g>
  );
}

function Verrutscht() {
  return (
    <g>
      <defs>
        <clipPath id="wirbelgleiten-bogen-vorn">
          <path d="M-60 -60 L195 -60 L135 180 L-60 180 Z" />
        </clipPath>
        <clipPath id="wirbelgleiten-bogen-hinten">
          <path d="M195 -60 L400 -60 L400 180 L135 180 Z" />
        </clipPath>
      </defs>

      {/* Untere Bandscheibe, geschert zwischen L5 und Kreuzbein */}
      <Geschert unten={266} winkel={SCHEIBE_WINKEL}>
        <rect x="-4" y="-46" width="128" height="54" rx="20" {...KONTUR} fill={F.petrol} />
      </Geschert>
      <path d={KREUZBEIN} {...KONTUR} fill={F.creme} />

      {/* Hinterer Teil des L5-Bogens bleibt am Kreuzbein stehen, davor die Lücke */}
      <g transform="translate(0 133)">
        <path d={BOGEN} {...KONTUR} fill={F.creme} clipPath="url(#wirbelgleiten-bogen-hinten)" />
        <path d="M177 12 L163 68" fill="none" stroke={F.kupfer} strokeWidth="7" strokeLinecap="round" />
      </g>

      <Gleitend>
        <path d={BOGEN} {...KONTUR} fill={F.creme} />
        <g transform="translate(0 133)">
          <path d={BOGEN} {...KONTUR} fill={F.creme} clipPath="url(#wirbelgleiten-bogen-vorn)" />
        </g>
        <Scheibe y={87} />
        <Wirbel bogen={false} />
        <g transform="translate(0 133)">
          <Wirbel bogen={false} />
        </g>
        <NervHuelle d={NERV_OBEN} />
      </Gleitend>

      {/* Nerv: Hülle aller Stücke, dann der Kern darüber */}
      <Geschert unten={304} winkel={NERV_WINKEL}>
        <g className="wirbelgleiten-grau" opacity="0">
          <NervHuelle d={NERV_MITTE} />
        </g>
      </Geschert>
      <NervHuelle d={NERV_UNTEN} />
      <g className="wirbelgleiten-eng">
        <NervHuelle d={NERV_ENG} />
      </g>

      <Gleitend>
        <NervKern d={NERV_OBEN} />
      </Gleitend>
      <Geschert unten={304} winkel={NERV_WINKEL}>
        <g className="wirbelgleiten-grau" opacity="0">
          <NervKern d={NERV_MITTE} />
        </g>
      </Geschert>
      <NervKern d={NERV_UNTEN} />
      <g className="wirbelgleiten-eng">
        <NervKern d={NERV_ENG} farbe={F.kupferHell} />
      </g>
    </g>
  );
}

/** Untere Lendenwirbel von der Seite: in einer Flucht gegenüber nach vorn gerutschtem L5. */
export default function Wirbelgleiten() {
  return (
    <Zeichnung titel="Die unteren Lendenwirbel und das Kreuzbein von der Seite, Bauch links: links gesund, die Wirbel stehen sauber übereinander; rechts beim Wirbelgleiten ist der unterste Lendenwirbel über dem Kreuzbein nach vorn gerutscht, es entsteht eine Stufe, im Wirbelbogen klafft eine Lücke und der Nerv dahinter wird eingeengt">
      <g transform="translate(60 150)">
        <Gesund />
      </g>
      <g transform="translate(440 150)">
        <Verrutscht />
      </g>

      <Etikett x={180} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={180} y={98} anker="middle">
        Wirbel in einer Flucht
      </Unterzeile>
      <Etikett x={540} y={66} anker="middle" farbe={F.kupferHell}>
        Wirbelgleiten
      </Etikett>
      <Unterzeile x={540} y={98} anker="middle">
        Wirbel rutscht nach vorn
      </Unterzeile>

      <Pfeil d="M392 330 L340 330" farbe={F.kupferHell} />

      <Zeiger von={[80, 656]} nach={[150, 500]} />
      <Etikett x={24} y={690}>
        Kreuzbein
      </Etikett>

      <Zeiger von={[364, 444]} nach={[402, 372]} />
      <Etikett x={316} y={476} farbe={F.kupferHell}>
        Stufe
      </Etikett>

      <Zeiger von={[640, 586]} nach={[612, 330]} />
      <Etikett x={700} y={612} anker="end" farbe={F.kupferHell}>
        Lücke im
      </Etikett>
      <Etikett x={700} y={642} anker="end" farbe={F.kupferHell}>
        Wirbelbogen
      </Etikett>

      <Zeiger von={[380, 664]} nach={[558, 416]} />
      <Etikett x={360} y={696} farbe={F.kupferHell}>
        Nerv wird eingeengt
      </Etikett>
    </Zeichnung>
  );
}
