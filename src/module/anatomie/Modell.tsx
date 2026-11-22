// Drehbares 3D-Modell einer Region (Gelenk oder Organgruppe).
//
// Das Modell (public/modelle/anatomie/<id>.glb) enthält je Struktur ein Objekt mit deren id als
// Namen. Farben, Hervorhebung und Durchscheinen entstehen erst hier: Die gewählte Struktur
// leuchtet in Kupfer, die Knochen bleiben stehen, alles andere tritt als blasser Schatten zurück.
//
// Dieselbe Komponente läuft auf der Bühne (folgt dem Zustand, bewegt sich weich) und in der
// Steuerung (dort mit `beiBlick`: Ziehen dreht, Mausrad oder zwei Finger zoomen). Im Tablet-Modus
// ist auch das Modell auf der Bühne so bedienbar.

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { Art, Region } from './daten';
import { datei } from '../../kern/pfad';
import { haengeBlickbedienungAn } from '../../kern/blickbedienung';

export interface BlickLage {
  drehY: number;
  neigX: number;
  zoom: number;
}

export interface ModellProps extends BlickLage {
  region: Region;
  struktur: string | null;
  aus: string[];
  /** Kleine Vorschau im Arztfenster: geringere Auflösung, weniger Bilder pro Sekunde. */
  vorschau?: boolean;
  /** Gesetzt = bedienbar. Wird beim Drehen und Zoomen mit der neuen Blickrichtung aufgerufen. */
  beiBlick?: (lage: BlickLage) => void;
  /** Beschriftung, die an der hervorgehobenen Struktur hängt. */
  beschriftung?: string;
  /** Strukturen, die den Bildausschnitt bestimmen (Standard: `region.fokus`). Wird nur beim Laden gelesen. */
  fokus?: string[];
}

export const NEIG_MIN = -1.3;
export const NEIG_MAX = 1.45;
export const ZOOM_MIN = 0.7;
export const ZOOM_MAX = 2.8;

type Rolle = 'Haupt' | 'Sehne' | 'Knorpel';

const FARBE: Record<Art | 'kontext', Record<Rolle, number>> = {
  knochen: { Haupt: 0xe8dfc9, Sehne: 0xe8dfc9, Knorpel: 0x9fc9d1 },
  knorpel: { Haupt: 0x8fc4d0, Sehne: 0x8fc4d0, Knorpel: 0x8fc4d0 },
  nerv: { Haupt: 0xedc95a, Sehne: 0xedc95a, Knorpel: 0xedc95a },
  gefaess: { Haupt: 0xd0463c, Sehne: 0xd0463c, Knorpel: 0xd0463c },
  vene: { Haupt: 0x4f79b8, Sehne: 0x4f79b8, Knorpel: 0x4f79b8 },
  organ: { Haupt: 0xd9a18f, Sehne: 0xd9a18f, Knorpel: 0xd9a18f },
  raum: { Haupt: 0x8fd0de, Sehne: 0x8fd0de, Knorpel: 0x8fd0de },
  muskel: { Haupt: 0xa5503f, Sehne: 0xd5dde2, Knorpel: 0xd5dde2 },
  band: { Haupt: 0xa6d2bc, Sehne: 0xa6d2bc, Knorpel: 0x9fc9d1 },
  schleimbeutel: { Haupt: 0x5fb3c4, Sehne: 0x5fb3c4, Knorpel: 0x5fb3c4 },
  kontext: { Haupt: 0xb9bdb0, Sehne: 0xb9bdb0, Knorpel: 0x9db9bd },
};
const FARBE_GEWAEHLT: Record<Rolle, number> = {
  Haupt: 0xf08a52,
  Sehne: 0xffe3cf,
  Knorpel: 0xffe3cf,
};
const FARBE_SCHATTEN = 0x6fa3ae;
/** So deckend ist ein Hohlraum (Paukenhöhle, Hirnkammern, Rippenfell): in Ruhe und beim Zeigen. */
const RAUM_SICHT = 0.42;
const RAUM_SICHT_GEWAEHLT = 0.62;
const GLUT = 0x7a2d10;

interface Teil {
  id: string;
  art: Art | 'kontext';
  rolle: Rolle;
  netz: THREE.Mesh;
  stoff: THREE.MeshStandardMaterial;
  grund: THREE.Color;
  gewaehlt: THREE.Color;
  /** Leuchtet beim Hervorheben (Sehnen und Knorpelflächen an Knochen bleiben hell). */
  glueht: boolean;
}

const ladungen = new Map<string, Promise<THREE.Group>>();

function ladeModell(id: string): Promise<THREE.Group> {
  let ladung = ladungen.get(id);
  if (!ladung) {
    ladung = new GLTFLoader().loadAsync(datei(`/modelle/anatomie/${id}.glb`)).then((gltf) => gltf.scene);
    ladung.catch(() => ladungen.delete(id));
    ladungen.set(id, ladung);
  }
  return ladung;
}

export default function Modell(props: ModellProps) {
  const behaelter = useRef<HTMLDivElement>(null);
  const marke = useRef<HTMLDivElement>(null);
  const aktuell = useRef(props);
  aktuell.current = props;
  const [lage, setLage] = useState<'laedt' | 'bereit' | 'fehler'>('laedt');

  const regionId = props.region.id;
  const vorschau = props.vorschau ?? false;
  const bedienbar = Boolean(props.beiBlick);

  useEffect(() => {
    const element = behaelter.current;
    if (!element) return;
    let beendet = false;
    let aufraeumen = () => {};
    setLage('laedt');

    ladeModell(regionId).then(
      (vorlage) => {
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

        const region = aktuell.current.region;
        const artVon = new Map(region.strukturen.map((s) => [s.id, s.art]));
        const farbeVon = new Map(region.strukturen.map((s) => [s.id, s.farbe]));

        const szene = new THREE.Scene();
        const kamera = new THREE.PerspectiveCamera(26, 1, 0.01, 20);
        const neigung = new THREE.Group();
        const drehung = new THREE.Group();
        const modell = vorlage.clone(true);
        drehung.add(modell);
        neigung.add(drehung);
        szene.add(neigung);

        // Licht steht fest zur Kamera, das Modell dreht sich darunter.
        szene.add(new THREE.HemisphereLight(0xe6f4f6, 0x013d4b, 1.25));
        const haupt = new THREE.DirectionalLight(0xfff6ec, 2.1);
        haupt.position.set(-1.4, 1.8, 2.4);
        szene.add(haupt);
        const saum = new THREE.DirectionalLight(0x9fd3dd, 1.1);
        saum.position.set(1.6, 0.6, -2);
        szene.add(saum);

        // Jedes Netz bekommt einen eigenen Stoff, damit es einzeln ein- und ausblenden kann.
        const teile: Teil[] = [];
        const rahmenJe = new Map<string, THREE.Box3>();
        for (const kind of modell.children) {
          const id = kind.name;
          const art = id === 'kontext' ? 'kontext' : artVon.get(id);
          if (!art) continue;
          kind.traverse((o) => {
            const netz = o as THREE.Mesh;
            if (!netz.isMesh) return;
            const name = (netz.material as THREE.Material).name;
            const rolle: Rolle = name === 'Sehne' || name === 'Knorpel' ? name : 'Haupt';
            // Nur Knochen (Knorpelflächen) und Muskeln (Sehnen) sind zweifarbig; alles andere,
            // etwa ein Meniskus oder Gallertkern, wird beim Zeigen ganz kupfern.
            const zweifarbig = art === 'knochen' || art === 'muskel';
            // Organe haben je Struktur eine eigene Farbe; Knorpel- und Sehnenflächen behalten ihre.
            const eigene = rolle === 'Haupt' || !zweifarbig ? farbeVon.get(id) : undefined;
            const grund = new THREE.Color(eigene ?? FARBE[art][rolle]);
            const stoff = new THREE.MeshStandardMaterial({
              color: grund,
              roughness: art === 'muskel' && rolle === 'Haupt' ? 0.62 : 0.5,
              metalness: 0,
              side:
                art === 'band' ||
                art === 'schleimbeutel' ||
                art === 'knorpel' ||
                art === 'organ' ||
                art === 'raum'
                  ? THREE.DoubleSide
                  : THREE.FrontSide,
              emissive: GLUT,
              emissiveIntensity: 0,
            });
            netz.material = stoff;
            teile.push({
              id,
              art,
              rolle,
              netz,
              stoff,
              grund,
              gewaehlt: new THREE.Color(FARBE_GEWAEHLT[zweifarbig ? rolle : 'Haupt']),
              glueht: !zweifarbig || rolle === 'Haupt',
            });
            netz.geometry.computeBoundingBox();
            const rahmen = rahmenJe.get(id) ?? new THREE.Box3();
            rahmen.union(netz.geometry.boundingBox!.clone().applyMatrix4(netz.matrixWorld));
            rahmenJe.set(id, rahmen);
          });
        }

        for (const s of region.strukturen) {
          if (!rahmenJe.has(s.id)) {
            console.error(`Anatomie: „${s.id}“ fehlt im Modell ${region.id}.glb.`);
          }
        }

        // Bildausschnitt: die Fokus-Strukturen in die Mitte, Abstand nach ihrer Größe.
        const fokus = new THREE.Box3();
        for (const id of aktuell.current.fokus ?? region.fokus) {
          const rahmen = rahmenJe.get(id);
          if (rahmen) fokus.union(rahmen);
        }
        if (fokus.isEmpty()) fokus.setFromObject(modell);
        const kugel = fokus.getBoundingSphere(new THREE.Sphere());
        modell.position.copy(kugel.center).negate();
        const grundAbstand = (kugel.radius / Math.sin((kamera.fov * Math.PI) / 360)) * 1.5;

        const schatten = new THREE.Color(FARBE_SCHATTEN);
        const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const stand = {
          drehY: aktuell.current.drehY,
          neigX: aktuell.current.neigX,
          zoom: aktuell.current.zoom,
        };
        const sicht = new Map<Teil, number>(teile.map((t) => [t, 1]));
        const anker = new THREE.Vector3();

        const passeGroesseAn = () => {
          const breite = element.clientWidth || 1;
          const hoehe = element.clientHeight || 1;
          // Auflösung = tatsächliche Bildschirmgröße (die Bühne wird als Ganzes skaliert).
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

        // ---------- Bedienung (nur mit `beiBlick`) ----------
        let gemeldet = 0;
        const melde = () => {
          if (gemeldet) return;
          gemeldet = requestAnimationFrame(() => {
            gemeldet = 0;
            aktuell.current.beiBlick?.({ ...stand });
          });
        };
        const bedienung = haengeBlickbedienungAn(element, {
          stand,
          darf: () => Boolean(aktuell.current.beiBlick),
          neig: [NEIG_MIN, NEIG_MAX],
          zoom: [ZOOM_MIN, ZOOM_MAX],
          beiAenderung: melde,
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

          // Blickrichtung: beim Ziehen sofort, sonst weich dem Zustand hinterher.
          if (!bedienung.zieht()) {
            const naehe = ruhig ? 1 : 1 - Math.exp(-dt * (p.beiBlick ? 9 : 4.5));
            let unterschied = (p.drehY - stand.drehY) % (2 * Math.PI);
            if (unterschied > Math.PI) unterschied -= 2 * Math.PI;
            if (unterschied < -Math.PI) unterschied += 2 * Math.PI;
            stand.drehY += unterschied * naehe;
            stand.neigX += (p.neigX - stand.neigX) * naehe;
            stand.zoom += (p.zoom - stand.zoom) * naehe;
          }
          // Auf der Bühne pendelt das Modell ganz leicht, damit die Tiefe lesbar bleibt.
          const pendeln = !p.beiBlick && !ruhig ? 1 : 0;
          drehung.rotation.y = stand.drehY + pendeln * Math.sin(t * 0.42) * 0.07;
          neigung.rotation.x = stand.neigX + pendeln * Math.sin(t * 0.27) * 0.02;
          kamera.position.set(0, 0, grundAbstand / stand.zoom);

          // Farben und Durchscheinen je Struktur.
          const gewaehlt = p.struktur;
          const gezeigt = gewaehlt
            ? p.region.strukturen.find((s) => s.id === gewaehlt)
            : undefined;
          const durch = gezeigt?.durchsichtig ?? [];
          const mit = gezeigt?.mit ?? [];
          const alleDurch = durch === 'alle';
          const naeheFarbe = ruhig ? 1 : 1 - Math.exp(-dt * 7);
          for (const teil of teile) {
            const istGewaehlt = teil.id === gewaehlt;
            let ziel = 1;
            let farbe = teil.grund;
            if (p.aus.includes(teil.id) && !istGewaehlt) ziel = 0;
            else if (teil.art === 'kontext') ziel = gewaehlt ? 0.22 : 1;
            else if (istGewaehlt) {
              farbe = teil.gewaehlt;
              if (teil.art === 'raum') ziel = RAUM_SICHT_GEWAEHLT;
            } else if (gewaehlt && mit.includes(teil.id)) {
              // Nachbarn, an denen man die Lage erkennt, bleiben unverändert stehen.
              if (teil.art === 'raum') ziel = RAUM_SICHT;
            } else if (
              gewaehlt &&
              (teil.art !== 'knochen' || alleDurch || durch.includes(teil.id))
            ) {
              // Knochen und eigens Genanntes scheinen durch; übrige Weichteile verschwinden
              // ganz, weil viele blasse Schichten übereinander die gezeigte Struktur zudecken.
              ziel = teil.art === 'knochen' || (!alleDurch && durch.includes(teil.id)) ? 0.2 : 0;
              farbe = schatten;
            } else if (teil.art === 'schleimbeutel') ziel = 0.9;
            else if (teil.art === 'raum') ziel = RAUM_SICHT;

            const alt = sicht.get(teil)!;
            const neu = Math.abs(ziel - alt) < 0.004 ? ziel : alt + (ziel - alt) * naeheFarbe;
            sicht.set(teil, neu);
            teil.stoff.color.lerp(farbe, naeheFarbe);
            teil.stoff.emissiveIntensity +=
              ((istGewaehlt && teil.glueht ? 0.42 : 0) - teil.stoff.emissiveIntensity) *
              naeheFarbe;
            teil.stoff.opacity = neu;
            // three.js baut Deckend/Durchscheinend fest in den Shader ein – beim Wechsel neu übersetzen.
            const durchscheinend = neu < 0.995;
            if (teil.stoff.transparent !== durchscheinend) {
              teil.stoff.transparent = durchscheinend;
              teil.stoff.needsUpdate = true;
            }
            teil.stoff.depthWrite = neu > 0.6;
            teil.netz.visible = neu > 0.012;
            teil.netz.renderOrder = neu < 0.6 ? 2 : istGewaehlt ? 1 : 0;
          }

          renderer.render(szene, kamera);

          // Beschriftung an die gewählte Struktur hängen.
          const schild = marke.current;
          if (schild) {
            const rahmenGewaehlt = gewaehlt ? rahmenJe.get(gewaehlt) : undefined;
            if (rahmenGewaehlt) {
              rahmenGewaehlt.getCenter(anker);
              modell.localToWorld(anker);
              anker.project(kamera);
              const x = (anker.x * 0.5 + 0.5) * element.clientWidth;
              const y = (-anker.y * 0.5 + 0.5) * element.clientHeight;
              schild.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
              schild.dataset.seite = x > element.clientWidth * 0.62 ? 'links' : 'rechts';
              schild.dataset.sichtbar = 'true';
            } else {
              schild.dataset.sichtbar = 'false';
            }
          }
        };
        rahmen = requestAnimationFrame(zeichne);
        setLage('bereit');

        aufraeumen = () => {
          cancelAnimationFrame(rahmen);
          cancelAnimationFrame(gemeldet);
          beobachter.disconnect();
          bedienung.loese();
          for (const teil of teile) teil.stoff.dispose();
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
  }, [regionId, vorschau]);

  // Pfeiltasten drehen, Plus und Minus zoomen (nur, wenn bedienbar).
  const taste = (e: React.KeyboardEvent) => {
    const p = aktuell.current;
    if (!p.beiBlick) return;
    const schritt = 0.2;
    const neu: BlickLage = { drehY: p.drehY, neigX: p.neigX, zoom: p.zoom };
    if (e.key === 'ArrowLeft') neu.drehY -= schritt;
    else if (e.key === 'ArrowRight') neu.drehY += schritt;
    else if (e.key === 'ArrowUp') neu.neigX = Math.min(neu.neigX + schritt, NEIG_MAX);
    else if (e.key === 'ArrowDown') neu.neigX = Math.max(neu.neigX - schritt, NEIG_MIN);
    else if (e.key === '+') neu.zoom = Math.min(neu.zoom * 1.2, ZOOM_MAX);
    else if (e.key === '-') neu.zoom = Math.max(neu.zoom / 1.2, ZOOM_MIN);
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
            'aria-label': `3D-Modell ${props.region.name}. Ziehen oder Pfeiltasten drehen, Mausrad oder Plus und Minus zoomen.`,
            onKeyDown: taste,
          }
        : { 'aria-hidden': true })}
    >
      {props.beschriftung && (
        <div ref={marke} className="gelmodell__marke" data-sichtbar="false">
          <span>{props.beschriftung}</span>
        </div>
      )}
      {lage === 'laedt' && <p className="gelmodell__hinweis">Modell wird geladen …</p>}
      {lage === 'fehler' && (
        <p className="gelmodell__hinweis">
          Das 3D-Modell lässt sich hier nicht anzeigen. Bitte die Seite neu laden.
        </p>
      )}
    </div>
  );
}
