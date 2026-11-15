// Überträgt eine flache Körperkarte auf das 3D-Hautmodell.
//
// Die Karte wird je Ansicht (vorn/hinten) zweimal als Raster gezeichnet: einmal Kopf, Rumpf und
// Beine, einmal nur der Arm (der Arm liegt im Modell anders als auf der Karte und wird eigens
// zugeordnet, siehe werkzeuge/baue_haut.mjs). Jedes Gebiet bekommt eine eigene Farbe als
// Kennung. Randpunkte, die kein Gebiet treffen (Umriss des Modells weicht vom gezeichneten ab),
// übernehmen das nächstgelegene Gebiet.

import { TEILE, type Ansicht, type Karte, type Teil } from './koerper';

const MASS = 2; // Rasterpunkte je Karteneinheit

interface Feld {
  x0: number;
  y0: number;
  breite: number;
  hoehe: number;
  /** Gebietsnummer je Rasterpunkt, -1 = keins. */
  nummer: Int16Array;
}

const BEREICHE: Record<'koerper' | 'arm', { x0: number; y0: number; x1: number; y1: number; teile: Teil[] }> = {
  koerper: { x0: -4, y0: -12, x1: 168, y1: 1016, teile: ['bein', 'rumpf', 'kopf'] },
  arm: { x0: 50, y0: 130, x1: 280, y1: 720, teile: ['arm'] },
};

const kennung = (nr: number): [number, number, number] => {
  const k = nr + 1;
  return [k, (k * 67) & 255, (k * 151 + 31) & 255];
};

function zeichneFeld(karte: Karte, ansicht: Ansicht, art: 'koerper' | 'arm'): Feld {
  const b = BEREICHE[art];
  const breite = Math.ceil((b.x1 - b.x0) * MASS);
  const hoehe = Math.ceil((b.y1 - b.y0) * MASS);
  const leinwand = document.createElement('canvas');
  leinwand.width = breite;
  leinwand.height = hoehe;
  const ctx = leinwand.getContext('2d', { willReadFrequently: true })!;
  ctx.setTransform(MASS, 0, 0, MASS, -b.x0 * MASS, -b.y0 * MASS);

  for (const teil of b.teile) {
    for (const umriss of TEILE[ansicht][teil]) {
      ctx.save();
      ctx.clip(new Path2D(umriss));
      karte.gebiete.forEach((gebiet, nr) => {
        const [r, g, bl] = kennung(nr);
        ctx.fillStyle = `rgb(${r},${g},${bl})`;
        for (const fl of gebiet[ansicht] ?? []) {
          if (fl.teil === teil) ctx.fill(new Path2D(fl.d), 'evenodd');
        }
      });
      ctx.restore();
    }
  }

  const pixel = ctx.getImageData(0, 0, breite, hoehe).data;
  const nummer = new Int16Array(breite * hoehe).fill(-1);
  const schlange = new Int32Array(breite * hoehe);
  let ende = 0;
  for (let i = 0; i < breite * hoehe; i++) {
    const o = i * 4;
    if (pixel[o + 3] !== 255) continue;
    const nr = pixel[o] - 1;
    if (nr < 0 || nr >= karte.gebiete.length) continue;
    const [, g, bl] = kennung(nr);
    // Kantenpunkte sind gemischt und fallen hier heraus; sie füllt die Ausbreitung unten.
    if (pixel[o + 1] !== g || pixel[o + 2] !== bl) continue;
    nummer[i] = nr;
    schlange[ende++] = i;
  }
  // Ausbreitung in die leeren Punkte: jeder bekommt das nächste Gebiet.
  for (let kopf = 0; kopf < ende; kopf++) {
    const i = schlange[kopf];
    const x = i % breite;
    const nr = nummer[i];
    const nachbarn = [x > 0 ? i - 1 : -1, x < breite - 1 ? i + 1 : -1, i - breite, i + breite];
    for (const j of nachbarn) {
      if (j < 0 || j >= nummer.length || nummer[j] !== -1) continue;
      nummer[j] = nr;
      schlange[ende++] = j;
    }
  }
  return { x0: b.x0, y0: b.y0, breite, hoehe, nummer };
}

export interface Kartenraster {
  /** Gebietsnummer (Index in karte.gebiete) für einen Punkt der Karte. */
  nummer(ansicht: Ansicht, arm: boolean, x: number, y: number): number;
}

const zwischenspeicher = new Map<string, Kartenraster>();

export function rasterVon(karte: Karte): Kartenraster {
  const fertig = zwischenspeicher.get(karte.id);
  if (fertig) return fertig;
  const felder = {
    vorn: { koerper: zeichneFeld(karte, 'vorn', 'koerper'), arm: zeichneFeld(karte, 'vorn', 'arm') },
    hinten: { koerper: zeichneFeld(karte, 'hinten', 'koerper'), arm: zeichneFeld(karte, 'hinten', 'arm') },
  };
  const raster: Kartenraster = {
    nummer(ansicht, arm, x, y) {
      const f = felder[ansicht][arm ? 'arm' : 'koerper'];
      const px = Math.min(Math.max(Math.round((x - f.x0) * MASS), 0), f.breite - 1);
      const py = Math.min(Math.max(Math.round((y - f.y0) * MASS), 0), f.hoehe - 1);
      return f.nummer[py * f.breite + px];
    },
  };
  zwischenspeicher.set(karte.id, raster);
  return raster;
}
