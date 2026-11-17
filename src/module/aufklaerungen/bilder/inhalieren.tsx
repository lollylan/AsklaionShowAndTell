import type { ReactNode } from 'react';
import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

// Gemeinsame Teile für die Inhalier-Zeichnungen (inhalieren-*.tsx) als benannte Exporte.

/** Mund des Profilkopfes (Blick nach links), dort setzt das Gerät an. */
export const MUND: [number, number] = [70, 226];

/** Gesicht von der Stirn über Nase, Lippen und Kinn bis zum Halsansatz vorn (x 130). */
const GESICHT =
  'C246 240 262 200 264 150 C268 70 220 16 160 16 C100 16 58 52 56 100 ' +
  'C56 120 58 130 60 140 L36 188 C40 196 50 200 62 204 L58 214 C54 220 58 224 68 226 ' +
  'C58 230 54 236 58 242 L62 252 C62 266 74 274 92 274 C108 274 120 278 130 284';

const NUR_KOPF = `M226 330 L226 268 ${GESICHT} L130 330 Z`;
const MIT_RUMPF =
  `M226 300 L226 268 ${GESICHT} L130 300 C110 324 40 330 26 366 L26 560 L330 560 L330 366 ` +
  'C316 330 246 324 226 300 Z';

const ATEMWEG_KOPF = 'M74 226 C110 222 160 214 184 234 C196 248 186 290 182 330';
const LUNGE_LINKS = 'M166 392 C130 370 64 396 54 470 C48 520 70 548 110 546 C150 544 168 520 168 480 Z';
const LUNGE_RECHTS =
  'M190 392 C226 370 292 396 302 470 C308 520 286 548 246 546 C206 544 188 520 188 480 Z';
const BRONCHIEN =
  'M180 400 C160 416 140 430 120 470 M142 432 L98 450 M128 456 L128 506 ' +
  'M180 400 C200 416 220 430 240 470 M218 432 L262 450 M232 456 L232 506';

/**
 * Kopf im Schnitt von der Seite, Blick nach links, mit Mundhöhle und Rachen.
 * Lokale Fläche etwa x 26–330, y 16–330 (nur Kopf) bzw. bis 560 (mit Rumpf und Lunge).
 * `children` liegen über den Atemwegen (Wirkstoff-Punkte, Pfeile).
 */
export function InhalierKopf({
  rumpf = false,
  mundZu = false,
  children,
}: {
  rumpf?: boolean;
  /** Lippen geschlossen: der Atemweg beginnt erst hinter den Lippen. */
  mundZu?: boolean;
  children?: ReactNode;
}) {
  const kopfweg = mundZu ? ATEMWEG_KOPF.replace('M74 226', 'M100 224') : ATEMWEG_KOPF;
  const atemweg = rumpf ? `${kopfweg} L180 400` : kopfweg;
  return (
    <g>
      <path d={rumpf ? MIT_RUMPF : NUR_KOPF} {...KONTUR} fill={F.petrolDunkel} />
      <circle cx="104" cy="138" r="6" fill={F.linie} />
      {rumpf && (
        <>
          <path d={LUNGE_LINKS} fill={F.petrol} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
          <path d={LUNGE_RECHTS} fill={F.petrol} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
          <path d={BRONCHIEN} fill="none" stroke={F.linie} strokeWidth="20" strokeLinecap="round" />
        </>
      )}
      <path d={atemweg} fill="none" stroke={F.linie} strokeWidth="30" strokeLinecap="round" />
      {rumpf && <path d={BRONCHIEN} fill="none" stroke={F.tief} strokeWidth="12" strokeLinecap="round" />}
      <path d={atemweg} fill="none" stroke={F.tief} strokeWidth="22" strokeLinecap="round" />
      {/* Zunge */}
      <path
        d="M88 250 C106 240 148 242 160 258 C166 270 152 278 130 278 C108 278 92 268 88 250 Z"
        fill={F.petrolHell}
        stroke={F.linie}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {children}
    </g>
  );
}

/** Wirkstoff als Kupferpunkte. */
export function Wirkstoff({ punkte, r = 7 }: { punkte: [number, number][]; r?: number }) {
  return (
    <g fill={F.kupfer} stroke={F.kupferHell} strokeWidth="2">
      {punkte.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
      ))}
    </g>
  );
}

/**
 * Dosieraerosol (Spray): Mundstück zeigt nach rechts, (x, y) ist die Spitze des Mundstücks.
 * Mit `finger` drückt ein Finger von oben auf die Kartusche.
 */
export function Spray({ x, y, s = 1, finger = false }: { x: number; y: number; s?: number; finger?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-72" y="-172" width="28" height="80" rx="8" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <path
        d="M-84 -104 Q-84 -112 -76 -112 L-40 -112 Q-32 -112 -32 -104 L-32 -18 L0 -18 L0 18 L-44 18 Q-84 18 -84 -22 Z"
        {...KONTUR}
        fill={F.petrolHell}
      />
      {finger && (
        <>
          <path
            d="M-80 -178 C-80 -200 -36 -200 -36 -178 L-36 -176 L-80 -176 Z"
            fill={F.creme}
            stroke={F.linie}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <Pfeil d="M-104 -200 L-104 -150" farbe={F.linie} breite={5} />
        </>
      )}
    </g>
  );
}

const FALSCH: [number, number][] = [
  [90, 224], [108, 230], [124, 220], [142, 228], [160, 220],
  [176, 232], [188, 252], [186, 274], [184, 300],
];
const RICHTIG: [number, number][] = [
  [110, 224], [160, 222], [184, 300], [182, 344], [181, 384],
  [142, 434], [118, 468], [96, 452], [128, 504], [92, 496], [150, 476],
  [218, 434], [242, 468], [264, 452], [232, 504], [268, 496], [210, 476],
];

/** Zwei Köpfe mit Lunge: links bleibt das Spray im Mund hängen, rechts kommt es in den Bronchien an. */
export default function Inhalieren() {
  return (
    <Zeichnung titel="Zwei Menschen im Schnitt von der Seite: bei falscher Technik bleibt das Medikament in Mund und Rachen hängen, bei richtiger Technik kommt es tief in den Bronchien der Lunge an">
      <g transform="translate(20 150) scale(0.95)">
        <InhalierKopf rumpf>
          <Wirkstoff punkte={FALSCH} />
        </InhalierKopf>
      </g>
      <g transform="translate(375 150) scale(0.95)">
        <InhalierKopf rumpf>
          <Wirkstoff punkte={RICHTIG} />
        </InhalierKopf>
      </g>

      <Etikett x={189} y={66} anker="middle" farbe={F.kupferHell}>
        Falsch
      </Etikett>
      <Unterzeile x={189} y={98} anker="middle">
        landet im Mund
      </Unterzeile>
      <Etikett x={544} y={66} anker="middle">
        Richtig
      </Etikett>
      <Unterzeile x={544} y={98} anker="middle">
        kommt in der Lunge an
      </Unterzeile>
    </Zeichnung>
  );
}
