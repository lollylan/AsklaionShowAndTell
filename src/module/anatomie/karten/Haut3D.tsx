// Körperkarte am drehbaren 3D-Körper: Haut des Visible Human (Human Reference Atlas), jeder
// Hautpunkt eingefärbt nach dem Gebiet, in dem er auf der flachen Karte liegt.
//
// Das Modell (public/modelle/anatomie/haut.bin) baut werkzeuge/baue_haut.mjs. Die Haltung
// entsteht hier: Die Arme drehen um das Schultergelenk, mit weichem Übergang an der Schulter.
//
// Läuft auf der Bühne (folgt dem Zustand) und in der Steuerung (mit `beiBlick`: Ziehen dreht,
// Mausrad zoomt; mit `beiKlick`: Klick ohne Ziehen wählt ein Gebiet).

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Karte, Seite } from './koerper';
import { grundfarbe, wahlfarbe } from './Koerperkarte';
import { rasterVon } from './raster';
import { datei } from '../../../kern/pfad';
import { haengeBlickbedienungAn } from '../../../kern/blickbedienung';

export type Haltung = 'grund' | 'a' | 't';

export const HALTUNGEN: { id: Haltung; name: string; winkel: number | null }[] = [
  { id: 'grund', name: 'Grundstellung', winkel: (9 * Math.PI) / 180 },
  // null = wie im Original des Atlas (gut 28°).
  { id: 'a', name: 'A-Haltung', winkel: null },
  { id: 't', name: 'T-Haltung', winkel: Math.PI / 2 },
];

export const HAUT_ZOOM_MIN = 0.8;
export const HAUT_ZOOM_MAX = 4.5;
const NEIG_MIN = -1.2;
const NEIG_MAX = 1.3;

const KOERPER = new THREE.Color(0xa9bfc4);

interface Haut {
  punkte: number;
  lage: Float32Array;
  kartenlage: Int16Array;
  merkmale: Uint8Array;
  gewichte: Uint8Array;
  dreiecke: Uint32Array;
  hoehe: number;
  mitteY: number;
  schulter: [number, number];
  armWinkel: number;
}

let ladung: Promise<Haut> | null = null;

function ladeHaut(): Promise<Haut> {
  if (!ladung) {
    ladung = fetch(datei('/modelle/anatomie/haut.bin'))
      .then((antwort) => {
        if (!antwort.ok) throw new Error(`haut.bin: ${antwort.status}`);
        return antwort.arrayBuffer();
      })
      .then((puffer) => {
        const laenge = new DataView(puffer).getUint32(0, true);
        const kopf = JSON.parse(new TextDecoder().decode(new Uint8Array(puffer, 4, laenge)));
        const n: number = kopf.punkte;
        let o = 4 + laenge;
        const lage = new Float32Array(puffer, o, n * 3);
        o += n * 12;
        const kartenlage = new Int16Array(puffer.slice(o, o + n * 4));
        o += n * 4;
        const merkmale = new Uint8Array(puffer, o, n);
        o += n;
        const gewichte = new Uint8Array(puffer, o, n);
        o += n;
        o += (4 - (o % 4)) % 4;
        const dreiecke = new Uint32Array(puffer, o, kopf.dreiecke);
        return { ...kopf, punkte: n, lage, kartenlage, merkmale, gewichte, dreiecke } as Haut;
      });
    ladung.catch(() => {
      ladung = null;
    });
  }
  return ladung;
}

export interface Haut3DProps {
  karte: Karte;
  gewaehlt: string[];
  seite: Seite;
  alle: boolean;
  haltung: Haltung;
  drehY: number;
  neigX: number;
  zoom: number;
  vorschau?: boolean;
  beiBlick?: (lage: { drehY: number; neigX: number; zoom: number }) => void;
  beiKlick?: (id: string) => void;
}

export function Haut3D(props: Haut3DProps) {
  const behaelter = useRef<HTMLDivElement>(null);
  const aktuell = useRef(props);
  aktuell.current = props;
  const [lage, setLage] = useState<'laedt' | 'bereit' | 'fehler'>('laedt');
  const vorschau = props.vorschau ?? false;
  const bedienbar = Boolean(props.beiBlick);

  useEffect(() => {
    const element = behaelter.current;
    if (!element) return;
    let beendet = false;
    let aufraeumen = () => {};
    setLage('laedt');

    ladeHaut().then(
      (haut) => {
        if (beendet) return;
        let renderer: THREE.WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch {
          setLage('fehler');
          return;
        }
        renderer.setClearColor(0x000000, 0);
        element.prepend(renderer.domElement);

        const n = haut.punkte;
        const geometrie = new THREE.BufferGeometry();
        const lagen = new Float32Array(haut.lage);
        const farben = new Float32Array(n * 3);
        geometrie.setAttribute('position', new THREE.BufferAttribute(lagen, 3));
        geometrie.setAttribute('color', new THREE.BufferAttribute(farben, 3));
        geometrie.setIndex(new THREE.BufferAttribute(haut.dreiecke, 1));
        geometrie.computeVertexNormals();
        const stoff = new THREE.MeshStandardMaterial({
          vertexColors: true,
          roughness: 0.62,
          metalness: 0,
        });
        const netz = new THREE.Mesh(geometrie, stoff);
        netz.position.y = -haut.mitteY;

        const szene = new THREE.Scene();
        const kamera = new THREE.PerspectiveCamera(26, 1, 0.05, 30);
        const neigung = new THREE.Group();
        const drehung = new THREE.Group();
        const verschub = new THREE.Group();
        verschub.add(netz);
        drehung.add(verschub);
        neigung.add(drehung);
        szene.add(neigung);
        szene.add(new THREE.HemisphereLight(0xe6f4f6, 0x013d4b, 1.35));
        const haupt = new THREE.DirectionalLight(0xfff6ec, 1.9);
        haupt.position.set(-1.4, 1.8, 2.4);
        szene.add(haupt);
        const saum = new THREE.DirectionalLight(0x9fd3dd, 1.0);
        saum.position.set(1.6, 0.6, -2);
        szene.add(saum);

        // ---------- Gebiete: welche Nummer hat jeder Punkt auf der aktuellen Karte? ----------
        let karteId = '';
        let nummern = new Int16Array(n);
        const ordneZu = (karte: Karte) => {
          const raster = rasterVon(karte);
          nummern = new Int16Array(n);
          for (let i = 0; i < n; i++) {
            const m = haut.merkmale[i];
            nummern[i] = raster.nummer(
              m & 1 ? 'hinten' : 'vorn',
              Boolean(m & 4),
              haut.kartenlage[i * 2] / 8,
              haut.kartenlage[i * 2 + 1] / 8,
            );
          }
          karteId = karte.id;
        };

        let farbSchluessel = '';
        const auswahlMitte = new THREE.Vector3();
        let auswahlDa = false;
        const faerbe = (p: Haut3DProps) => {
          const schluessel = [p.karte.id, p.gewaehlt.join(','), p.seite, p.alle].join('|');
          if (schluessel === farbSchluessel) return;
          farbSchluessel = schluessel;
          if (karteId !== p.karte.id) ordneZu(p.karte);
          const gebiete = p.karte.gebiete;
          const stark = gebiete.map((g) => {
            const f = wahlfarbe(p.gewaehlt, g.id);
            return f ? new THREE.Color(f) : null;
          });
          const blass = gebiete.map((g) => {
            const c = new THREE.Color(grundfarbe(p.karte, g));
            return p.gewaehlt.length ? c.lerp(KOERPER, 0.62) : c;
          });
          const summe = new THREE.Vector3();
          let anzahl = 0;
          for (let i = 0; i < n; i++) {
            const nr = nummern[i];
            const links = Boolean(haut.merkmale[i] & 2);
            const seiteOk = p.seite === 'beide' || (p.seite === 'links') === links;
            let farbe = KOERPER;
            if (nr >= 0 && stark[nr] && seiteOk) {
              farbe = stark[nr]!;
              summe.x += lagen[i * 3];
              summe.y += lagen[i * 3 + 1];
              summe.z += lagen[i * 3 + 2];
              anzahl++;
            } else if (nr >= 0 && p.alle) farbe = blass[nr];
            farben[i * 3] = farbe.r;
            farben[i * 3 + 1] = farbe.g;
            farben[i * 3 + 2] = farbe.b;
          }
          geometrie.attributes.color.needsUpdate = true;
          auswahlDa = anzahl > 0;
          if (auswahlDa) auswahlMitte.copy(summe).divideScalar(anzahl);
        };

        // ---------- Haltung: Arme um das Schultergelenk drehen ----------
        const [sx, sy] = haut.schulter;
        const zielWinkel = (h: Haltung) => HALTUNGEN.find((x) => x.id === h)?.winkel ?? haut.armWinkel;
        let winkel = zielWinkel(aktuell.current.haltung);
        const stelle = (w: number) => {
          const d = w - haut.armWinkel;
          for (let i = 0; i < n; i++) {
            const g = haut.gewichte[i] / 255;
            const x = haut.lage[i * 3];
            const y = haut.lage[i * 3 + 1];
            if (g === 0) {
              lagen[i * 3] = x;
              lagen[i * 3 + 1] = y;
              continue;
            }
            // Rechter Arm liegt bei x < 0 und dreht im Uhrzeigersinn nach oben, der linke gegenläufig.
            const vz = x < 0 ? -1 : 1;
            const a = d * g * vz;
            const px = vz * sx;
            const c = Math.cos(a);
            const s = Math.sin(a);
            const dx = x - px;
            const dy = y - sy;
            lagen[i * 3] = px + dx * c - dy * s;
            lagen[i * 3 + 1] = sy + dx * s + dy * c;
          }
          geometrie.attributes.position.needsUpdate = true;
          geometrie.computeVertexNormals();
          geometrie.computeBoundingSphere();
          farbSchluessel = ''; // Auswahlmitte neu bestimmen
        };
        stelle(winkel);

        // Abstand so, dass der ganze Körper in jeder Haltung ins Bild passt.
        const grundAbstand = (1.02 / Math.sin((kamera.fov * Math.PI) / 360)) * 1.02;

        const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const stand = {
          drehY: aktuell.current.drehY,
          neigX: aktuell.current.neigX,
          zoom: aktuell.current.zoom,
        };
        const ziel = new THREE.Vector3();
        const blickpunkt = new THREE.Vector3();

        const passeGroesseAn = () => {
          const breite = element.clientWidth || 1;
          const hoehe = element.clientHeight || 1;
          const massstab = element.getBoundingClientRect().width / breite || 1;
          const faktor = Math.min(vorschau ? 1 : 2, massstab * window.devicePixelRatio);
          renderer.setPixelRatio(Math.max(faktor, 0.15));
          renderer.setSize(breite, hoehe, false);
          kamera.aspect = breite / hoehe;
          kamera.updateProjectionMatrix();
        };
        passeGroesseAn();
        const beobachter = new ResizeObserver(passeGroesseAn);
        beobachter.observe(element);
        beobachter.observe(document.documentElement);

        // ---------- Bedienung ----------
        let gemeldet = 0;
        const melde = () => {
          if (gemeldet) return;
          gemeldet = requestAnimationFrame(() => {
            gemeldet = 0;
            aktuell.current.beiBlick?.({ ...stand });
          });
        };
        const strahl = new THREE.Raycaster();
        const klick = (e: PointerEvent) => {
          const p = aktuell.current;
          if (!p.beiKlick) return;
          const r = element.getBoundingClientRect();
          const zeiger = new THREE.Vector2(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            -((e.clientY - r.top) / r.height) * 2 + 1,
          );
          strahl.setFromCamera(zeiger, kamera);
          const treffer = strahl.intersectObject(netz, false)[0];
          if (!treffer?.face) return;
          const nr = nummern[treffer.face.a];
          const gebiet = p.karte.gebiete[nr];
          if (gebiet) p.beiKlick(gebiet.id);
        };
        const bedienung = haengeBlickbedienungAn(element, {
          stand,
          darf: () => Boolean(aktuell.current.beiBlick),
          neig: [NEIG_MIN, NEIG_MAX],
          zoom: [HAUT_ZOOM_MIN, HAUT_ZOOM_MAX],
          beiAenderung: melde,
          beiTipp: klick,
        });

        // ---------- Zeichnen ----------
        let rahmen = 0;
        let zuletzt = performance.now();
        let letztesBild = 0;
        const start = zuletzt;
        const bildAbstand = vorschau ? 1000 / 24 : 0;

        const zeichne = (jetzt: number) => {
          rahmen = requestAnimationFrame(zeichne);
          if (jetzt - letztesBild < bildAbstand) return;
          const dt = Math.min((jetzt - zuletzt) / 1000, 0.1);
          zuletzt = jetzt;
          letztesBild = jetzt;
          const t = (jetzt - start) / 1000;
          const p = aktuell.current;

          const zw = zielWinkel(p.haltung);
          if (Math.abs(zw - winkel) > 0.002) {
            winkel = ruhig ? zw : winkel + (zw - winkel) * (1 - Math.exp(-dt * 5));
            if (Math.abs(zw - winkel) < 0.002) winkel = zw;
            stelle(winkel);
          }
          faerbe(p);

          if (!bedienung.zieht()) {
            const naehe = ruhig ? 1 : 1 - Math.exp(-dt * (p.beiBlick ? 9 : 4.5));
            let unterschied = (p.drehY - stand.drehY) % (2 * Math.PI);
            if (unterschied > Math.PI) unterschied -= 2 * Math.PI;
            if (unterschied < -Math.PI) unterschied += 2 * Math.PI;
            stand.drehY += unterschied * naehe;
            stand.neigX += (p.neigX - stand.neigX) * naehe;
            stand.zoom += (p.zoom - stand.zoom) * naehe;
          }
          const pendeln = !p.beiBlick && !ruhig ? 1 : 0;
          drehung.rotation.y = stand.drehY + pendeln * Math.sin(t * 0.42) * 0.06;
          neigung.rotation.x = stand.neigX + pendeln * Math.sin(t * 0.27) * 0.015;

          // Beim Heranzoomen wandert der Bildmittelpunkt zur Auswahl.
          ziel.set(0, 0, 0);
          if (auswahlDa) {
            const anteil = THREE.MathUtils.clamp((stand.zoom - 1) / 1.6, 0, 1);
            ziel.copy(auswahlMitte).add(netz.position).multiplyScalar(anteil);
          }
          const naeheZiel = ruhig ? 1 : 1 - Math.exp(-dt * 4);
          blickpunkt.lerp(ziel, naeheZiel);
          verschub.position.copy(blickpunkt).negate();
          kamera.position.set(0, 0, grundAbstand / stand.zoom);

          renderer.render(szene, kamera);
        };
        rahmen = requestAnimationFrame(zeichne);
        setLage('bereit');

        aufraeumen = () => {
          cancelAnimationFrame(rahmen);
          cancelAnimationFrame(gemeldet);
          beobachter.disconnect();
          bedienung.loese();
          geometrie.dispose();
          stoff.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      },
      () => {
        if (!beendet) setLage('fehler');
      },
    );

    return () => {
      beendet = true;
      aufraeumen();
    };
  }, [vorschau]);

  const taste = (e: React.KeyboardEvent) => {
    const p = aktuell.current;
    if (!p.beiBlick) return;
    const schritt = 0.2;
    const neu = { drehY: p.drehY, neigX: p.neigX, zoom: p.zoom };
    if (e.key === 'ArrowLeft') neu.drehY -= schritt;
    else if (e.key === 'ArrowRight') neu.drehY += schritt;
    else if (e.key === 'ArrowUp') neu.neigX = Math.min(neu.neigX + schritt, NEIG_MAX);
    else if (e.key === 'ArrowDown') neu.neigX = Math.max(neu.neigX - schritt, NEIG_MIN);
    else if (e.key === '+') neu.zoom = Math.min(neu.zoom * 1.2, HAUT_ZOOM_MAX);
    else if (e.key === '-') neu.zoom = Math.max(neu.zoom / 1.2, HAUT_ZOOM_MIN);
    else return;
    e.preventDefault();
    e.stopPropagation();
    p.beiBlick(neu);
  };

  return (
    <div
      ref={behaelter}
      className="gelmodell"
      data-lage={lage}
      data-bedienbar={bedienbar}
      {...(bedienbar
        ? {
            tabIndex: 0,
            role: 'application',
            'aria-label': `3D-Körper mit ${props.karte.name}. Ziehen dreht, Klick wählt ein Gebiet, Mausrad zoomt.`,
            onKeyDown: taste,
          }
        : { 'aria-hidden': true })}
    >
      {lage === 'laedt' && <p className="gelmodell__hinweis">Modell wird geladen …</p>}
      {lage === 'fehler' && (
        <p className="gelmodell__hinweis">Das 3D-Modell lässt sich hier nicht anzeigen. Bitte die Seite neu laden.</p>
      )}
    </div>
  );
}
