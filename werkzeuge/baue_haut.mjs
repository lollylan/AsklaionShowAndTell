// Baut das Hautmodell für die 3D-Körperkarten (Dermatome, Hautnerven).
//
//   node werkzeuge/baue_haut.mjs
//
// Quelle: Haut des Visible Human (männlich) aus dem Human Reference Atlas, CC BY 4.0:
// https://cdn.humanatlas.io/digital-objects/ref-organ/skin-male/v1.3/assets/3d-vh-m-skin.glb
// (liegt in werkzeuge/quellen/hra-haut/). Ziel: public/modelle/anatomie/haut.bin.
//
// Das Skript vermisst das Modell (Schultergelenk, Armachse, Handgelenk, Beinachsen, Fuß) und gibt
// jedem Hautpunkt seine Lage auf der flachen Körperkarte (src/module/anatomie/karten/koerper.ts):
// x = Abstand von der Mitte, y = 0 am Scheitel bis 1000 an der Sohle, dazu Ansicht (vorn/hinten),
// Körperseite und ob der Punkt zum Arm gehört. Welche Farbe ein Punkt bekommt, entscheidet erst der
// Browser anhand der Karte – so gibt es die Grenzen der Gebiete nur an einer Stelle.
//
// Die Haltung wird ebenfalls erst im Browser gemacht: Jeder Punkt hat ein Armgewicht (0 = Rumpf,
// 1 = Arm), mit dem er um das Schultergelenk mitgedreht wird.
//
// Aufbau der Ausgabe: Uint32 Länge des Kopfes, Kopf als JSON (mit Leerzeichen auf 4 Byte
// aufgefüllt), dann Float32 Lage (n·3, in Metern, A-Haltung des Originals), Int16 Kartenlage
// (n·2, Karteneinheiten × 8), Uint8 Merkmale (n; Bit 0 hinten, Bit 1 linke Seite, Bit 2 Arm),
// Uint8 Armgewicht (n, 0–255), Auffüllung auf 4 Byte, Uint32 Dreiecke (m).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const hier = path.dirname(fileURLToPath(import.meta.url));
const QUELLE = path.join(hier, 'quellen/hra-haut/3d-vh-m-skin.glb');
const ZIEL = path.join(hier, '../public/modelle/anatomie/haut.bin');

// ---------- GLB lesen ----------

function ladeGlb(datei) {
  const b = fs.readFileSync(datei);
  const jl = b.readUInt32LE(12);
  const j = JSON.parse(b.subarray(20, 20 + jl).toString());
  const bin = b.subarray(20 + jl + 8);
  const lies = (i) => {
    const a = j.accessors[i];
    const v = j.bufferViews[a.bufferView];
    const Typ = { 5126: Float32Array, 5125: Uint32Array, 5123: Uint16Array }[a.componentType];
    const n = { SCALAR: 1, VEC3: 3, VEC4: 4 }[a.type];
    const start = bin.byteOffset + (v.byteOffset ?? 0) + (a.byteOffset ?? 0);
    return new Typ(bin.buffer.slice(start, start + a.count * n * Typ.BYTES_PER_ELEMENT));
  };
  const p = j.meshes[0].primitives[0];
  return { lage: lies(p.attributes.POSITION), normale: lies(p.attributes.NORMAL), dreiecke: lies(p.indices) };
}

const { lage, normale, dreiecke } = ladeGlb(QUELLE);
const n = lage.length / 3;
const X = (i) => lage[i * 3];
const Y = (i) => lage[i * 3 + 1];
const Z = (i) => lage[i * 3 + 2];

let yMax = -Infinity;
let yMin = Infinity;
for (let i = 0; i < n; i++) {
  yMax = Math.max(yMax, Y(i));
  yMin = Math.min(yMin, Y(i));
}
const hoehe = yMax - yMin;
/** Meter je Karteneinheit. */
const s = hoehe / 1000;
const kartenY = (y) => (yMax - y) / s;

const glatt = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};
const median = (werte) => {
  const w = [...werte].sort((a, b) => a - b);
  return w[Math.floor(w.length / 2)];
};

// ---------- Arm vermessen (beide Seiten gespiegelt zusammen) ----------

// Achse aus den Mitten waagerechter Schnitte durch Ober- und Unterarm (unterhalb der Achsel).
const mitten = [];
for (let y = 0.14; y <= 0.35; y += 0.01) {
  let mn = Infinity;
  let mx = -Infinity;
  for (let i = 0; i < n; i++) {
    const xs = Math.abs(X(i));
    if (xs > 0.2 && Math.abs(Y(i) - y) < 0.004) {
      mn = Math.min(mn, xs);
      mx = Math.max(mx, xs);
    }
  }
  if (mx > mn) mitten.push([y, (mn + mx) / 2]);
}
// Gerade xs = a + b·y nach kleinsten Quadraten.
const my = mitten.reduce((u, [y]) => u + y, 0) / mitten.length;
const mxs = mitten.reduce((u, [, x]) => u + x, 0) / mitten.length;
const b =
  mitten.reduce((u, [y, x]) => u + (y - my) * (x - mxs), 0) /
  mitten.reduce((u, [y]) => u + (y - my) ** 2, 0);
const a = mxs - b * my;

let schulterOben = -Infinity;
for (let i = 0; i < n; i++) {
  const xs = Math.abs(X(i));
  if (xs > 0.19 && xs < 0.24) schulterOben = Math.max(schulterOben, Y(i));
}
const gelenkY = schulterOben - 0.065;
const gelenk = [a + b * gelenkY, gelenkY]; // (xs, y)
const achse = (() => {
  const dx = -b;
  const dy = -1;
  const l = Math.hypot(dx, dy);
  return [dx / l, dy / l];
})();
const seitlich = [-achse[1], achse[0]]; // nach außen-oben (Daumenseite)
const armWinkel = Math.atan2(achse[0], -achse[1]); // gegen die Senkrechte

// Unterhalb der Achsel hängt der Arm frei. Getrennt wird an einer Linie in der Lücke zwischen
// Rumpf und Arm (Abstand von der Mitte je Höhe, aus Schnitten durch das Modell abgelesen);
// darüber, an der Schulter, gleitet das Gewicht weich von Rumpf zu Arm.
const ACHSEL = 0.4;
const TRENNUNG = [
  [-0.2, 0.3],
  [0.05, 0.3],
  [0.1, 0.27],
  [0.15, 0.24],
  [0.2, 0.22],
  [0.25, 0.203],
  [0.3, 0.197],
  [0.35, 0.19],
  [0.4, 0.185],
];
const trennung = (y) => {
  for (let k = 1; k < TRENNUNG.length; k++) {
    const [y1, x1] = TRENNUNG[k];
    const [y0, x0] = TRENNUNG[k - 1];
    if (y <= y1) return x0 + ((x1 - x0) * (y - y0)) / (y1 - y0);
  }
  return 0.185;
};

/** Armgewicht: 1 am Arm, 0 am Rumpf, weicher Übergang an der Schulter. */
function armGewicht(i) {
  const y = Y(i);
  if (y > 0.66 || y < -0.2) return 0;
  const xs = Math.abs(X(i));
  // Knapp unter der Achsel breiter, damit die Haut dort beim Heben gedehnt statt abgerissen wird.
  const breite = y < ACHSEL ? 0.012 + 0.02 * glatt(0.3, 0.38, y) : 0.032;
  const mitte = trennung(y);
  return glatt(mitte - breite, mitte + breite, xs);
}

const armT = new Float64Array(n);
const armO = new Float64Array(n);
for (let i = 0; i < n; i++) {
  const dx = Math.abs(X(i)) - gelenk[0];
  const dy = Y(i) - gelenk[1];
  armT[i] = dx * achse[0] + dy * achse[1];
  armO[i] = dx * seitlich[0] + dy * seitlich[1];
}
const istArm = (i) => armGewicht(i) >= 0.5;

// Drehpunkt für die Haltung: Kopf des Oberarms, gut 5 cm innerhalb des äußeren Schulterrands.
let schulterAussen = 0;
for (let i = 0; i < n; i++) {
  if (Math.abs(Y(i) - gelenkY) < 0.01) schulterAussen = Math.max(schulterAussen, Math.abs(X(i)));
}
const drehpunkt = [
  schulterAussen - Number(process.env.DREH_INNEN ?? 0.015),
  schulterOben - Number(process.env.DREH_TIEF ?? 0.015),
];

// Drehgewicht für die Haltung, über die Hautoberfläche geglättet: Fest stehen der Rumpf
// (Gewicht 0, auch das Schulterdach über dem Gelenk) und der Arm ab gut 20 cm unter dem Gelenk
// (Gewicht 1). Dazwischen gleicht jeder Punkt sein Gewicht immer wieder an seine Nachbarn an,
// bis ein weicher Verlauf über Schulter und Achsel entsteht. So verteilt sich die Dehnung beim
// Heben über die ganze Schulter, statt als Knick, Beule oder Hautsegel an einer Stelle.
const ARM_AB = Number(process.env.ARM_AB ?? 0.12);
const SCHULTER_BIS = Number(process.env.SCHULTER_BIS ?? -0.05);
const RUNDEN = Number(process.env.RUNDEN ?? 400);
const drehGewichte = (() => {
  const fest = new Int8Array(n).fill(-1); // -1 frei, 0 oder 1 fest
  for (let i = 0; i < n; i++) {
    const y = Y(i);
    const xs = Math.abs(X(i));
    const dx = xs - drehpunkt[0];
    const dy = y - drehpunkt[1];
    const t = dx * achse[0] + dy * achse[1];
    const mitte = trennung(y);
    if (y > 0.68 || y < -0.2 || xs < mitte - 0.035 || t < SCHULTER_BIS) fest[i] = 0;
    else if (xs > mitte + 0.01 && t > ARM_AB) fest[i] = 1;
  }
  // Nachbarn aus den Dreiecken
  const grad = new Uint32Array(n);
  for (let k = 0; k < dreiecke.length; k++) grad[dreiecke[k]] += 2;
  const start = new Uint32Array(n + 1);
  for (let i = 0; i < n; i++) start[i + 1] = start[i] + grad[i];
  const nachbar = new Uint32Array(start[n]);
  const fuell = start.slice(0, n);
  for (let k = 0; k < dreiecke.length; k += 3) {
    const [a, b, c] = [dreiecke[k], dreiecke[k + 1], dreiecke[k + 2]];
    nachbar[fuell[a]++] = b;
    nachbar[fuell[a]++] = c;
    nachbar[fuell[b]++] = a;
    nachbar[fuell[b]++] = c;
    nachbar[fuell[c]++] = a;
    nachbar[fuell[c]++] = b;
  }
  let w = new Float32Array(n);
  // Startwert: linear entlang der Armachse – die Glättung muss dann nur noch Kanten abrunden.
  for (let i = 0; i < n; i++) {
    if (fest[i] !== -1) {
      w[i] = fest[i];
      continue;
    }
    const t = (Math.abs(X(i)) - drehpunkt[0]) * achse[0] + (Y(i) - drehpunkt[1]) * achse[1];
    w[i] = armGewicht(i) * Math.min(Math.max((t - SCHULTER_BIS) / (ARM_AB - SCHULTER_BIS), 0), 1);
  }
  let neu = new Float32Array(n);
  for (let runde = 0; runde < RUNDEN; runde++) {
    for (let i = 0; i < n; i++) {
      if (fest[i] !== -1) {
        neu[i] = w[i];
        continue;
      }
      let summe = 0;
      for (let k = start[i]; k < start[i + 1]; k++) summe += w[nachbar[k]];
      neu[i] = summe / (start[i + 1] - start[i]);
    }
    [w, neu] = [neu, w];
  }
  return w;
})();
// S-Kurve: An den Enden des Übergangs ändert sich das Gewicht kaum, sonst entsteht dort, wo der
// Arm voll mitdreht, eine Ecke in der Hautlinie.
const drehGewicht = (i) => glatt(0, 1, drehGewichte[i]);

// Schnitte quer zur Armachse: Mitte und Breite.
const SCHRITT = 0.005;
const schnitte = new Map();
for (let i = 0; i < n; i++) {
  if (!istArm(i)) continue;
  const k = Math.round(armT[i] / SCHRITT);
  const sch = schnitte.get(k) ?? { mn: Infinity, mx: -Infinity };
  sch.mn = Math.min(sch.mn, armO[i]);
  sch.mx = Math.max(sch.mx, armO[i]);
  schnitte.set(k, sch);
}
const schnitt = (t) => schnitte.get(Math.round(t / SCHRITT));
let tFinger = -Infinity;
for (let i = 0; i < n; i++) if (istArm(i)) tFinger = Math.max(tFinger, armT[i]);

// Handgelenk: schmalste Stelle zwischen 38 und 60 cm vom Schultergelenk.
let tHand = 0.45;
let schmal = Infinity;
for (let t = 0.38; t <= 0.6; t += SCHRITT) {
  const sch = schnitt(t);
  if (sch && sch.mx - sch.mn < schmal) {
    schmal = sch.mx - sch.mn;
    tHand = t;
  }
}
const tEllenbogen = tHand * 0.545;
const breiteIn = (von, bis) => {
  const w = [];
  for (let t = von; t <= bis; t += SCHRITT) {
    const sch = schnitt(t);
    if (sch) w.push((sch.mx - sch.mn) / 2);
  }
  return median(w);
};
const hwOber = breiteIn(0.08, tEllenbogen - 0.03);
const hwUnter = breiteIn(tEllenbogen + 0.03, tHand - 0.02);
// Hand: schmalste Stelle der Handfläche (weiter vorn spreizen Daumen und Finger).
const hwHand = (() => {
  let w = Infinity;
  for (let t = tHand + 0.01; t <= tHand + 0.06; t += SCHRITT) {
    const sch = schnitt(t);
    if (sch) w = Math.min(w, (sch.mx - sch.mn) / 2);
  }
  return w;
})();
const mitteBei = (t) => {
  // Ab der Hand gilt die Mitte der Handfläche (Finger und Daumen spreizen).
  const tt = Math.min(t, tHand);
  for (let d = 0; d < 0.03; d += SCHRITT) {
    const sch = schnitt(tt - d) ?? schnitt(tt + d);
    if (sch) return (sch.mn + sch.mx) / 2;
  }
  return 0;
};

// Arm auf der Karte (rechte Hälfte, y nach unten): Schultergelenk, Ellenbogen, Handgelenk,
// Spitze des Mittelfingers; halbe Breiten von Ober-, Unterarm und Hand.
const KARTE_ARM = [
  [115, 200],
  [153, 382],
  [183, 543],
  [188.75, 658],
];
const KARTE_HW = [21, 15, 18];

function armAufKarte(i) {
  const t = armT[i];
  const o = armO[i] - mitteBei(t);
  const grenzen = [0, tEllenbogen, tHand, tFinger];
  let seg = t < tEllenbogen ? 0 : t < tHand ? 1 : 2;
  const anteil = (t - grenzen[seg]) / (grenzen[seg + 1] - grenzen[seg]);
  const [x0, y0] = KARTE_ARM[seg];
  const [x1, y1] = KARTE_ARM[seg + 1];
  const dx = x1 - x0;
  const dy = y1 - y0;
  const l = Math.hypot(dx, dy);
  const nx = dy / l;
  const ny = -dx / l;
  const hw3 = [hwOber, hwUnter, hwHand][seg];
  const k = KARTE_HW[seg] / hw3;
  return [x0 + dx * anteil + o * k * nx, y0 + dy * anteil + o * k * ny];
}

// ---------- Beine vermessen ----------

const beinSchnitte = new Map();
for (let i = 0; i < n; i++) {
  if (Y(i) > -0.1 || armGewicht(i) > 0) continue;
  const k = Math.round(Y(i) / 0.01);
  const sch = beinSchnitte.get(k) ?? { mn: Infinity, mx: -Infinity };
  const xs = Math.abs(X(i));
  sch.mn = Math.min(sch.mn, xs);
  sch.mx = Math.max(sch.mx, xs);
  beinSchnitte.set(k, sch);
}
const beinBei = (y) => {
  const k = Math.round(Math.min(y, -0.125) / 0.01);
  for (let d = 0; d < 10; d++) {
    const sch = beinSchnitte.get(k + d) ?? beinSchnitte.get(k - d);
    if (sch) return { c: (sch.mn + sch.mx) / 2, hw: (sch.mx - sch.mn) / 2 };
  }
  return { c: 0.13, hw: 0.1 };
};
// Bein auf der Karte: Kartenhöhe, Mitte, halbe Breite (vom Umriss in koerper.ts abgelesen).
const KARTE_BEIN = [
  [555, 56, 50],
  [620, 56, 42],
  [720, 53, 29],
  [800, 55, 29],
  [880, 53, 19],
  [925, 51, 13],
  [960, 54, 24],
  [1000, 55, 25],
];
const beinKarte = (yk) => {
  if (yk <= KARTE_BEIN[0][0]) return KARTE_BEIN[0];
  for (let k = 1; k < KARTE_BEIN.length; k++) {
    const [y1, c1, w1] = KARTE_BEIN[k];
    const [y0, c0, w0] = KARTE_BEIN[k - 1];
    if (yk <= y1) {
      const t = (yk - y0) / (y1 - y0);
      return [yk, c0 + (c1 - c0) * t, w0 + (w1 - w0) * t];
    }
  }
  return KARTE_BEIN[KARTE_BEIN.length - 1];
};

// Fuß: Ferse und Zehenspitze (für die Sohle, die auf der Karte hinten liegt).
let zFerse = Infinity;
let zZeh = -Infinity;
for (let i = 0; i < n; i++) {
  if (Y(i) < yMin + 0.12) {
    zFerse = Math.min(zFerse, Z(i));
    zZeh = Math.max(zZeh, Z(i));
  }
}

function koerperAufKarte(i) {
  const y = Y(i);
  const xs = Math.abs(X(i));
  const yk = kartenY(y);
  const xRumpf = xs / s;
  const anteil = glatt(-0.06, -0.14, y);
  if (anteil === 0) return [xRumpf, yk];
  const { c, hw } = beinBei(y);
  const [, c2, hw2] = beinKarte(yk);
  const xBein = c2 + ((xs - c) / hw) * hw2;
  return [xRumpf + (xBein - xRumpf) * anteil, yk];
}

// ---------- Jeder Punkt ----------

const kartenlage = new Int16Array(n * 2);
const merkmale = new Uint8Array(n);
const gewichte = new Uint8Array(n);
const zaehl = { arm: 0, hinten: 0, sohle: 0 };

for (let i = 0; i < n; i++) {
  const nz = normale[i * 3 + 2];
  const ny = normale[i * 3 + 1];
  let hinten = nz < 0;
  let xy;
  const w = armGewicht(i);
  if (w >= 0.5) {
    xy = armAufKarte(i);
    zaehl.arm++;
  } else {
    xy = koerperAufKarte(i);
    // Fußsohle: auf der Karte hinten, Ferse oben, Zehen unten.
    if (Y(i) < yMin + 0.045 && ny < -0.5) {
      hinten = true;
      xy[1] = 930 + ((Z(i) - zFerse) / (zZeh - zFerse)) * 72;
      zaehl.sohle++;
    }
  }
  if (hinten) zaehl.hinten++;
  kartenlage[i * 2] = Math.round(xy[0] * 8);
  kartenlage[i * 2 + 1] = Math.round(xy[1] * 8);
  merkmale[i] = (hinten ? 1 : 0) | (X(i) > 0 ? 2 : 0) | (w >= 0.5 ? 4 : 0);
  gewichte[i] = Math.round(drehGewicht(i) * 255);
}

// ---------- Schreiben ----------

const kopf = {
  quelle: '3d-vh-m-skin.glb (Human Reference Atlas v1.3, CC BY 4.0)',
  punkte: n,
  dreiecke: dreiecke.length,
  hoehe: +hoehe.toFixed(4),
  mitteY: +((yMax + yMin) / 2).toFixed(4),
  /** Schultergelenk (Abstand von der Mitte, Höhe) und Winkel des Arms gegen die Senkrechte. */
  schulter: [+drehpunkt[0].toFixed(4), +drehpunkt[1].toFixed(4)],
  armWinkel: +armWinkel.toFixed(4),
};
let json = Buffer.from(JSON.stringify(kopf));
json = Buffer.concat([json, Buffer.alloc((4 - (json.length % 4)) % 4, 0x20)]);
const teile = [
  (() => {
    const l = Buffer.alloc(4);
    l.writeUInt32LE(json.length);
    return l;
  })(),
  json,
  Buffer.from(lage.buffer),
  Buffer.from(kartenlage.buffer),
  Buffer.from(merkmale.buffer),
  Buffer.from(gewichte.buffer),
];
const bisher = teile.reduce((u, t) => u + t.length, 0);
teile.push(Buffer.alloc((4 - (bisher % 4)) % 4));
teile.push(Buffer.from(new Uint32Array(dreiecke).buffer));
fs.writeFileSync(ZIEL, Buffer.concat(teile));

console.log('Höhe', hoehe.toFixed(3), 'm; Armachse bei', gelenk.map((v) => v.toFixed(3)).join(', '), '; Drehpunkt', drehpunkt.map((v) => v.toFixed(3)).join(', '));
console.log('Armwinkel', ((armWinkel * 180) / Math.PI).toFixed(1), '°; Ellenbogen', tEllenbogen.toFixed(3),
  'Handgelenk', tHand.toFixed(3), 'Fingerspitze', tFinger.toFixed(3));
console.log('halbe Breiten Ober-/Unterarm/Hand', [hwOber, hwUnter, hwHand].map((v) => v.toFixed(3)).join(' / '));
console.log('Ferse/Zeh z', zFerse.toFixed(3), zZeh.toFixed(3), '| Punkte', n, zaehl);
console.log('geschrieben:', ZIEL, (fs.statSync(ZIEL).size / 1e6).toFixed(2), 'MB');
