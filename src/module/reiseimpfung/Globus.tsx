// 3D-Globus der Reiseimpfberatung.
//
// Die Erde ist eine Kugel mit einer selbst gezeichneten Karte als Textur:
// Länderumrisse aus dem Kartensatz „world-atlas“ (liegt lokal bei), gewählte
// Reiseziele in Kupfer. Der Globus füllt die ganze Bühne (1920 × 1080) und
// wird über `mitte` an die gewünschte Stelle geschoben, damit er beim
// Heranfahren über den Bildrand hinauslaufen darf.

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  geoArea,
  geoBounds,
  geoCentroid,
  geoEquirectangular,
  geoGraticule10,
  geoPath,
} from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry, Polygon } from 'geojson';
import atlasAdresse from 'world-atlas/countries-50m.json?url';
import type { Land } from './daten';

const FARBE = {
  meer: '#02475a',
  meerRand: '#013746',
  netz: 'rgba(169, 203, 211, 0.13)',
  land: '#4f9cab',
  grenze: '#02475a',
  ziel: '#c8683a',
  aktiv: '#f0a070',
  aktivRand: '#fff3ea',
};

interface Ort {
  lon: number;
  lat: number;
  /** Ausdehnung in Grad – bestimmt, wie nah die Kamera heranfährt. */
  weite: number;
}

interface Atlas {
  alle: FeatureCollection;
  nachNummer: Map<string, Feature>;
  orte: Map<string, Ort>;
}

let atlasLaden: Promise<Atlas> | null = null;

function ladeAtlas(): Promise<Atlas> {
  atlasLaden ??= fetch(atlasAdresse)
    .then((antwort) => antwort.json())
    .then((topo) => {
      const alle = feature(topo, topo.objects.countries) as unknown as FeatureCollection;
      const nachNummer = new Map<string, Feature>();
      const orte = new Map<string, Ort>();
      for (const f of alle.features) {
        if (f.id == null) continue;
        const nummer = String(f.id);
        nachNummer.set(nummer, f);
        orte.set(nummer, ortVon(f.geometry));
      }
      return { alle, nachNummer, orte };
    });
  return atlasLaden;
}

/** Mittelpunkt und Größe des größten Landesteils (sonst zieht z. B. Alaska die USA nach Norden). */
function ortVon(geometrie: Geometry): Ort {
  let teil: Geometry = geometrie;
  if (geometrie.type === 'MultiPolygon') {
    let groesste = -1;
    for (const koordinaten of geometrie.coordinates) {
      const polygon: Polygon = { type: 'Polygon', coordinates: koordinaten };
      const flaeche = geoArea(polygon);
      if (flaeche > groesste) {
        groesste = flaeche;
        teil = polygon;
      }
    }
  }
  const [lon, lat] = geoCentroid(teil);
  const [[west, sued], [ost, nord]] = geoBounds(teil);
  const breite = (ost >= west ? ost - west : ost - west + 360) * Math.cos((lat * Math.PI) / 180);
  return { lon, lat, weite: Math.max(breite, nord - sued) };
}

function ortFuer(land: Land, atlas: Atlas): Ort | null {
  if (land.punkt) return { lon: land.punkt[0], lat: land.punkt[1], weite: 2 };
  return atlas.orte.get(land.num) ?? null;
}

/** Punkt auf der Kugel, passend zur Texturlage von THREE.SphereGeometry. */
function aufKugel(lon: number, lat: number, radius: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function zeichneGrundkarte(atlas: Atlas, breite: number): HTMLCanvasElement {
  const hoehe = breite / 2;
  const flaeche = document.createElement('canvas');
  flaeche.width = breite;
  flaeche.height = hoehe;
  const ctx = flaeche.getContext('2d')!;
  const projektion = geoEquirectangular()
    .translate([breite / 2, hoehe / 2])
    .scale(breite / (2 * Math.PI));
  const pfad = geoPath(projektion, ctx);

  const verlauf = ctx.createLinearGradient(0, 0, 0, hoehe);
  verlauf.addColorStop(0, FARBE.meerRand);
  verlauf.addColorStop(0.5, FARBE.meer);
  verlauf.addColorStop(1, FARBE.meerRand);
  ctx.fillStyle = verlauf;
  ctx.fillRect(0, 0, breite, hoehe);

  ctx.beginPath();
  pfad(geoGraticule10());
  ctx.strokeStyle = FARBE.netz;
  ctx.lineWidth = breite / 2600;
  ctx.stroke();

  ctx.beginPath();
  pfad(atlas.alle);
  ctx.fillStyle = FARBE.land;
  ctx.fill();
  ctx.strokeStyle = FARBE.grenze;
  ctx.lineWidth = breite / 3400;
  ctx.lineJoin = 'round';
  ctx.stroke();
  return flaeche;
}

function zeichneAuswahl(
  ziel: HTMLCanvasElement,
  grundkarte: HTMLCanvasElement,
  atlas: Atlas,
  ziele: Land[],
  aktiv: Land | null,
) {
  const ctx = ziel.getContext('2d')!;
  ctx.drawImage(grundkarte, 0, 0);
  const projektion = geoEquirectangular()
    .translate([ziel.width / 2, ziel.height / 2])
    .scale(ziel.width / (2 * Math.PI));
  const pfad = geoPath(projektion, ctx);
  ctx.lineJoin = 'round';

  for (const land of ziele) {
    const umriss = atlas.nachNummer.get(land.num);
    if (!umriss) continue;
    const istAktiv = land.iso3 === aktiv?.iso3;
    ctx.beginPath();
    pfad(umriss);
    ctx.fillStyle = istAktiv ? FARBE.aktiv : FARBE.ziel;
    ctx.fill();
    ctx.strokeStyle = istAktiv ? FARBE.aktivRand : FARBE.grenze;
    ctx.lineWidth = ziel.width / (istAktiv ? 1700 : 3400);
    ctx.stroke();
  }
}

const KUGEL_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormale;
  void main() {
    vUv = uv;
    vNormale = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Weiches Licht von links oben, dazu ein heller Saum am Rand der Kugel.
const KUGEL_FRAGMENT = /* glsl */ `
  uniform sampler2D karte;
  varying vec2 vUv;
  varying vec3 vNormale;
  void main() {
    vec3 farbe = texture2D(karte, vUv).rgb;
    float licht = max(dot(vNormale, normalize(vec3(-0.5, 0.45, 0.75))), 0.0);
    farbe *= 0.5 + 0.62 * licht;
    float rand = pow(1.0 - max(vNormale.z, 0.0), 3.2);
    farbe += vec3(0.30, 0.60, 0.68) * rand * 0.5;
    gl_FragColor = vec4(farbe, 1.0);
    #include <colorspace_fragment>
  }
`;

const HUELLE_VERTEX = /* glsl */ `
  varying vec3 vNormale;
  void main() {
    vNormale = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const HUELLE_FRAGMENT = /* glsl */ `
  varying vec3 vNormale;
  void main() {
    float staerke = pow(max(0.62 - dot(vNormale, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
    gl_FragColor = vec4(vec3(0.34, 0.66, 0.74) * staerke, staerke);
    #include <colorspace_fragment>
  }
`;

export interface GlobusProps {
  ziele: Land[];
  aktiv: Land | null;
  /** Bildschirmpunkt der Kugelmitte in Bühnen-Pixeln (0–1920, 0–1080). */
  mitte: [number, number];
  /** Kleine Vorschau im Arztfenster: geringere Auflösung, weniger Bilder pro Sekunde. */
  vorschau: boolean;
  /** true: Animation anhalten (z. B. solange eine Erklärkarte den Globus verdeckt). */
  ruht?: boolean;
}

interface Ziel {
  drehY: number;
  neigX: number;
  abstand: number;
  mitteX: number;
  mitteY: number;
  /** null = frei drehen, sonst auf diesen Punkt ausgerichtet bleiben. */
  fest: boolean;
}

const ABSTAND_WEIT = 4.75;
const ABSTAND_NAH = 3.5;
const drehungFuer = (lon: number) => (-(lon + 90) * Math.PI) / 180;

export default function Globus({ ziele, aktiv, mitte, vorschau, ruht = false }: GlobusProps) {
  const behaelter = useRef<HTMLDivElement>(null);
  const steuerung = useRef<{
    setzeAuswahl: (ziele: Land[], aktiv: Land | null) => void;
    setzeMitte: (mitte: [number, number]) => void;
    setzeRuhe: (ruht: boolean) => void;
  } | null>(null);
  const aktuell = useRef({ ziele, aktiv, mitte, ruht });
  aktuell.current = { ziele, aktiv, mitte, ruht };

  useEffect(() => {
    const element = behaelter.current;
    if (!element) return;
    let beendet = false;
    let aufraeumen = () => {};

    void ladeAtlas().then((atlas) => {
      if (beendet) return;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // Kein WebGL: Die Bühne funktioniert dann ohne Globus.
      }
      renderer.setClearColor(0x000000, 0);
      element.appendChild(renderer.domElement);

      const szene = new THREE.Scene();
      const kamera = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 50);
      const neigung = new THREE.Group();
      const drehung = new THREE.Group();
      neigung.add(drehung);
      szene.add(neigung);

      const texturBreite = vorschau ? 1024 : 4096;
      const grundkarte = zeichneGrundkarte(atlas, texturBreite);
      const karte = document.createElement('canvas');
      karte.width = grundkarte.width;
      karte.height = grundkarte.height;
      const textur = new THREE.CanvasTexture(karte);
      textur.colorSpace = THREE.SRGBColorSpace;
      textur.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const kugelForm = new THREE.SphereGeometry(1, 128, 80);
      const kugelStoff = new THREE.ShaderMaterial({
        uniforms: { karte: { value: textur } },
        vertexShader: KUGEL_VERTEX,
        fragmentShader: KUGEL_FRAGMENT,
      });
      drehung.add(new THREE.Mesh(kugelForm, kugelStoff));

      const huelleForm = new THREE.SphereGeometry(1.16, 64, 48);
      const huelleStoff = new THREE.ShaderMaterial({
        vertexShader: HUELLE_VERTEX,
        fragmentShader: HUELLE_FRAGMENT,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });
      szene.add(new THREE.Mesh(huelleForm, huelleStoff));

      // Markierungen: ein Ring je Reiseziel, das aktive Ziel pulsiert.
      const marken = new THREE.Group();
      drehung.add(marken);
      const ringForm = new THREE.RingGeometry(0.018, 0.026, 48);
      const pulsForm = new THREE.RingGeometry(0.026, 0.031, 48);
      let puls: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial> | null = null;

      const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ziel: Ziel = {
        drehY: drehungFuer(15),
        neigX: 0.32,
        abstand: ABSTAND_WEIT,
        mitteX: aktuell.current.mitte[0],
        mitteY: aktuell.current.mitte[1],
        fest: false,
      };
      const lage = { ...ziel };

      const setzeAuswahl = (neueZiele: Land[], neuAktiv: Land | null) => {
        zeichneAuswahl(karte, grundkarte, atlas, neueZiele, neuAktiv);
        textur.needsUpdate = true;

        for (const kind of [...marken.children]) {
          marken.remove(kind);
          ((kind as THREE.Mesh).material as THREE.Material).dispose();
        }
        puls = null;
        for (const land of neueZiele) {
          const ort = ortFuer(land, atlas);
          if (!ort) continue;
          const istAktiv = land.iso3 === neuAktiv?.iso3;
          const ring = new THREE.Mesh(
            ringForm,
            new THREE.MeshBasicMaterial({
              color: istAktiv ? 0xfff3ea : 0xf0a070,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: istAktiv ? 1 : 0.9,
            }),
          );
          ring.position.copy(aufKugel(ort.lon, ort.lat, 1.006));
          ring.lookAt(ring.position.clone().multiplyScalar(2));
          marken.add(ring);
          if (istAktiv) {
            puls = new THREE.Mesh(
              pulsForm,
              new THREE.MeshBasicMaterial({
                color: 0xf0a070,
                side: THREE.DoubleSide,
                transparent: true,
              }),
            );
            puls.position.copy(ring.position);
            puls.quaternion.copy(ring.quaternion);
            marken.add(puls);
          }
        }

        // Wohin schaut die Kamera?
        const aktivOrt = neuAktiv ? ortFuer(neuAktiv, atlas) : null;
        if (aktivOrt) {
          ziel.fest = true;
          ziel.drehY = drehungFuer(aktivOrt.lon);
          ziel.neigX = (THREE.MathUtils.clamp(aktivOrt.lat, -58, 58) * Math.PI) / 180;
          ziel.abstand = THREE.MathUtils.clamp(
            ABSTAND_NAH + (aktivOrt.weite - 8) / 38,
            ABSTAND_NAH,
            ABSTAND_WEIT,
          );
        } else {
          const orte = neueZiele.map((l) => ortFuer(l, atlas)).filter((o): o is Ort => o !== null);
          ziel.abstand = ABSTAND_WEIT;
          if (orte.length > 0) {
            // Mittlere Richtung aller Ziele – als Vektor gemittelt, damit die Datumsgrenze nicht stört.
            const summe = new THREE.Vector3();
            for (const o of orte) summe.add(aufKugel(o.lon, o.lat, 1));
            const lat = (Math.asin(THREE.MathUtils.clamp(summe.clone().normalize().y, -1, 1)) * 180) / Math.PI;
            const lon = (Math.atan2(summe.z, -summe.x) * 180) / Math.PI - 180;
            ziel.fest = summe.length() > 0.05;
            ziel.drehY = drehungFuer(lon);
            ziel.neigX = (THREE.MathUtils.clamp(lat, -40, 40) * Math.PI) / 180;
          } else {
            ziel.fest = false;
            ziel.neigX = 0.32;
          }
        }
      };

      const setzeMitte = (neu: [number, number]) => {
        ziel.mitteX = neu[0];
        ziel.mitteY = neu[1];
      };

      const passeGroesseAn = () => {
        // Auflösung = tatsächliche Bildschirmgröße der skalierten Bühne.
        const massstab = element.getBoundingClientRect().width / 1920 || 1;
        const faktor = Math.min(vorschau ? 1 : 1.5, massstab * window.devicePixelRatio);
        renderer.setPixelRatio(Math.max(faktor, 0.15));
        renderer.setSize(1920, 1080, false);
      };
      passeGroesseAn();
      const beobachter = new ResizeObserver(passeGroesseAn);
      beobachter.observe(document.documentElement);

      let pausiert = aktuell.current.ruht;
      let rahmen = 0;
      let zuletzt = performance.now();
      let letztesBild = 0;
      const start = zuletzt;
      const bildAbstand = vorschau ? 1000 / 24 : 0;

      const zeichne = (jetzt: number) => {
        rahmen = requestAnimationFrame(zeichne);
        if (pausiert || jetzt - letztesBild < bildAbstand) {
          zuletzt = pausiert ? jetzt : zuletzt;
          return;
        }
        const dt = Math.min((jetzt - zuletzt) / 1000, 0.1);
        zuletzt = jetzt;
        letztesBild = jetzt;
        const t = (jetzt - start) / 1000;

        if (!ziel.fest && !ruhig) ziel.drehY += dt * 0.055; // eine Umdrehung in knapp zwei Minuten

        const naehe = ruhig ? 1 : 1 - Math.exp(-dt * 1.7);
        let unterschied = (ziel.drehY - lage.drehY) % (2 * Math.PI);
        if (unterschied > Math.PI) unterschied -= 2 * Math.PI;
        if (unterschied < -Math.PI) unterschied += 2 * Math.PI;
        lage.drehY += unterschied * naehe;
        lage.neigX += (ziel.neigX - lage.neigX) * naehe;
        lage.abstand += (ziel.abstand - lage.abstand) * naehe;
        lage.mitteX += (ziel.mitteX - lage.mitteX) * naehe;
        lage.mitteY += (ziel.mitteY - lage.mitteY) * naehe;

        // Auch im Stand lebt der Globus: ein sehr langsames Pendeln.
        const pendeln = ziel.fest && !ruhig ? 1 : 0;
        drehung.rotation.y = lage.drehY + pendeln * Math.sin(t * 0.21) * 0.07;
        neigung.rotation.x = lage.neigX + pendeln * Math.sin(t * 0.13) * 0.025;

        kamera.position.set(0, 0, lage.abstand);
        kamera.setViewOffset(1920, 1080, 960 - lage.mitteX, 540 - lage.mitteY, 1920, 1080);

        if (puls) {
          const phase = ruhig ? 0.4 : (t * 0.55) % 1;
          const groesse = 1 + phase * 2.6;
          puls.scale.set(groesse, groesse, groesse);
          puls.material.opacity = 0.85 * (1 - phase);
        }

        renderer.render(szene, kamera);
      };

      setzeAuswahl(aktuell.current.ziele, aktuell.current.aktiv);
      // Beim ersten Bild schon richtig stehen statt um die halbe Welt zu fahren.
      Object.assign(lage, ziel);
      rahmen = requestAnimationFrame(zeichne);
      element.dataset.bereit = 'true';

      steuerung.current = {
        setzeAuswahl,
        setzeMitte,
        setzeRuhe: (ruht) => {
          pausiert = ruht;
        },
      };

      aufraeumen = () => {
        cancelAnimationFrame(rahmen);
        beobachter.disconnect();
        steuerung.current = null;
        for (const kind of marken.children) {
          ((kind as THREE.Mesh).material as THREE.Material).dispose();
        }
        ringForm.dispose();
        pulsForm.dispose();
        kugelForm.dispose();
        kugelStoff.dispose();
        huelleForm.dispose();
        huelleStoff.dispose();
        textur.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      beendet = true;
      aufraeumen();
    };
  }, [vorschau]);

  const zielSchluessel = ziele.map((l) => l.iso3).join(',');
  useEffect(() => {
    steuerung.current?.setzeAuswahl(aktuell.current.ziele, aktuell.current.aktiv);
  }, [zielSchluessel, aktiv?.iso3]);

  useEffect(() => {
    steuerung.current?.setzeMitte(mitte);
  }, [mitte[0], mitte[1]]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    steuerung.current?.setzeRuhe(ruht);
  }, [ruht]);

  return <div ref={behaelter} className="globus" aria-hidden="true" />;
}
