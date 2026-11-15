// Landkarte für die Länderseiten: das Land in Petrol, Nachbarn gedämpft, wichtigste Städte.
//
// Grundlage ist der genaue Kartensatz „world-atlas“ 1:10 Mio. (liegt lokal bei, wird erst
// geladen, wenn eine Karte gebraucht wird). Projektion: flächentreu azimutal, auf das Land
// gedreht – damit sehen auch Russland, Kanada oder Fidschi (über die Datumsgrenze) richtig aus.

import { useEffect, useMemo, useState } from 'react';
import {
  geoArea,
  geoAzimuthalEqualArea,
  geoBounds,
  geoCentroid,
  geoCircle,
  geoDistance,
  geoGraticule10,
  geoPath,
  type GeoPermissibleObjects,
  type GeoProjection,
} from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry, MultiPolygon, Polygon } from 'geojson';
import atlasAdresse from 'world-atlas/countries-10m.json?url';
import { LAENDER, type Land } from './daten';
import type { Ort } from './steckbriefe';

interface Teil {
  feature: Feature;
  mitte: [number, number];
  /** Winkelradius in Bogenmaß, grob: vom Mittelpunkt zur weitesten Ecke der Umgrenzung. */
  radius: number;
}

interface Atlas {
  teile: Teil[];
  nachNummer: Map<string, Teil>;
}

let laden: Promise<Atlas> | null = null;

function ladeAtlas(): Promise<Atlas> {
  laden ??= fetch(atlasAdresse)
    .then((antwort) => antwort.json())
    .then((topo) => {
      const alle = feature(topo, topo.objects.countries) as unknown as FeatureCollection;
      const teile: Teil[] = [];
      const nachNummer = new Map<string, Teil>();
      for (const f of alle.features) {
        const mitte = geoCentroid(f) as [number, number];
        const [[w, s], [o, n]] = geoBounds(f);
        const radius = Math.max(
          ...[[w, s], [w, n], [o, s], [o, n]].map((ecke) => geoDistance(mitte, ecke as [number, number])),
        );
        const teil = { feature: f, mitte, radius: Number.isFinite(radius) ? radius : Math.PI };
        teile.push(teil);
        if (f.id != null) nachNummer.set(String(f.id), teil);
      }
      return { teile, nachNummer };
    });
  return laden;
}

/** Lädt den Kartensatz; null, solange er noch nicht da ist. */
export function useAtlas(): Atlas | null {
  const [atlas, setAtlas] = useState<Atlas | null>(null);
  useEffect(() => {
    let aktiv = true;
    void ladeAtlas().then((a) => aktiv && setAtlas(a));
    return () => {
      aktiv = false;
    };
  }, []);
  return atlas;
}

/**
 * Der Teil eines Landes, auf den die Karte ausgerichtet wird: das größte Stück und alles, was
 * nicht weit davon liegt und nicht winzig ist. So bleiben Alaska und Hawaii bei den USA,
 * Französisch-Guayana bei Frankreich außen vor, die Inseln Indonesiens aber drin.
 */
function hauptteil(geometrie: Geometry): Polygon | MultiPolygon {
  if (geometrie.type === 'Polygon') return geometrie;
  if (geometrie.type !== 'MultiPolygon') return { type: 'MultiPolygon', coordinates: [] };
  const stuecke = geometrie.coordinates.map((koordinaten) => {
    const p: Polygon = { type: 'Polygon', coordinates: koordinaten };
    return { koordinaten, flaeche: geoArea(p), mitte: geoCentroid(p) as [number, number] };
  });
  const groesstes = stuecke.reduce((a, b) => (b.flaeche > a.flaeche ? b : a));
  const behalten = stuecke.filter(
    (s) =>
      s === groesstes ||
      (geoDistance(s.mitte, groesstes.mitte) < (28 * Math.PI) / 180 &&
        s.flaeche > groesstes.flaeche * 0.01) ||
      geoDistance(s.mitte, groesstes.mitte) < (4 * Math.PI) / 180,
  );
  return { type: 'MultiPolygon', coordinates: behalten.map((s) => s.koordinaten) };
}

const NAME_NACH_NUMMER = new Map(LAENDER.map((l) => [l.num, l.name]));

export interface KartenAufbau {
  breite: number;
  hoehe: number;
  /** Fläche, in die das Land eingepasst wird: [links, oben, rechts, unten]. */
  rahmen: [number, number, number, number];
}

interface Geplant {
  projektion: GeoProjection;
  land: string | null;
  nachbarn: Array<{ d: string; nummer: string }>;
  netz: string;
  /** Mittelpunkt des Landes auf der Karte (für Gebiete ohne eigenen Umriss: der Punkt). */
  punkt: [number, number] | null;
  massstab: { km: number; px: number };
}

function plane(atlas: Atlas, land: Land, aufbau: KartenAufbau): Geplant {
  const teil = atlas.nachNummer.get(land.num);
  const [x0, y0, x1, y1] = aufbau.rahmen;

  let ziel: GeoPermissibleObjects;
  let mitte: [number, number];
  if (teil) {
    const haupt = hauptteil(teil.feature.geometry);
    ziel = { type: 'Feature', properties: {}, geometry: haupt } as Feature;
    mitte = geoCentroid(ziel) as [number, number];
    // Sehr kleine Länder (Malta, Singapur): mindestens einen Umkreis von 1,2 Grad zeigen.
    const [[w, s], [o, n]] = geoBounds(ziel);
    if (Math.max(o - w, n - s) < 1.2) ziel = geoCircle().center(mitte).radius(0.9)();
  } else {
    mitte = land.punkt ?? [0, 0];
    ziel = geoCircle().center(mitte).radius(2.4)();
  }

  const projektion = geoAzimuthalEqualArea()
    .rotate([-mitte[0], -mitte[1]])
    .clipAngle(100)
    .fitExtent(
      [
        [x0, y0],
        [x1, y1],
      ],
      ziel,
    );
  projektion.clipExtent([
    [-20, -20],
    [aufbau.breite + 20, aufbau.hoehe + 20],
  ]);
  const pfad = geoPath(projektion);

  // Nur zeichnen, was in Sichtweite liegt: Winkelradius der Bildecke als Grenze.
  const ecke = projektion.invert?.([0, 0]) ?? mitte;
  const sicht = geoDistance(mitte, ecke) * 1.1;
  const nachbarn = atlas.teile
    .filter((t) => t !== teil && geoDistance(mitte, t.mitte) < sicht + t.radius)
    .map((t) => ({ d: pfad(t.feature) ?? '', nummer: String(t.feature.id ?? '') }))
    .filter((n) => n.d);

  // Maßstab: Kilometer auf 100 Pixel in der Bildmitte, auf eine runde Zahl gebracht.
  const cx = aufbau.breite / 2;
  const cy = aufbau.hoehe / 2;
  const a = projektion.invert?.([cx - 50, cy]);
  const b = projektion.invert?.([cx + 50, cy]);
  const kmProPx = a && b ? (geoDistance(a, b) * 6371) / 100 : 1;
  const rund = [1, 2, 5, 10, 20, 50, 100, 200, 250, 500, 1000, 2000].find((km) => km / kmProPx >= 120) ?? 2000;

  return {
    projektion,
    land: teil ? pfad(teil.feature) : null,
    nachbarn,
    netz: pfad(geoGraticule10()) ?? '',
    punkt: teil ? null : (projektion(mitte) as [number, number]),
    massstab: { km: rund, px: rund / kmProPx },
  };
}

/** Städte so auswählen, dass sich Punkte und Namen nicht überdecken. */
function waehleOrte(orte: Ort[], projektion: GeoProjection, aufbau: KartenAufbau, hoechstens: number) {
  const gewaehlt: Array<Ort & { x: number; y: number; seite: 'rechts' | 'links' | 'oben' | 'unten' }> = [];
  const kaesten: Array<[number, number, number, number]> = [];
  const ueberlappt = (k: [number, number, number, number]) =>
    k[0] < 30 || k[1] < 30 || k[2] > aufbau.breite - 30 || k[3] > aufbau.hoehe - 30 ||
    kaesten.some((o) => k[0] < o[2] && k[2] > o[0] && k[1] < o[3] && k[3] > o[1]);

  for (const ort of orte) {
    if (gewaehlt.length >= hoechstens) break;
    const p = projektion([ort.lon, ort.lat]);
    if (!p) continue;
    const [x, y] = p;
    if (gewaehlt.some((g) => Math.hypot(g.x - x, g.y - y) < 70)) continue;
    const gross = ort.haupt ? 34 : 28;
    const breite = ort.name.length * gross * 0.56 + 10;
    const hoehe = gross * 1.2;
    const lagen: Array<['rechts' | 'links' | 'oben' | 'unten', [number, number, number, number]]> = [
      ['rechts', [x + 14, y - hoehe / 2, x + 14 + breite, y + hoehe / 2]],
      ['links', [x - 14 - breite, y - hoehe / 2, x - 14, y + hoehe / 2]],
      ['oben', [x - breite / 2, y - 16 - hoehe, x + breite / 2, y - 16]],
      ['unten', [x - breite / 2, y + 16, x + breite / 2, y + 16 + hoehe]],
    ];
    const frei = lagen.find(([, k]) => !ueberlappt(k));
    if (!frei) continue;
    kaesten.push(frei[1], [x - 12, y - 12, x + 12, y + 12]);
    gewaehlt.push({ ...ort, x, y, seite: frei[0] });
  }
  return gewaehlt;
}

const ANKER = { rechts: 'start', links: 'end', oben: 'middle', unten: 'middle' } as const;

export function Landkarte({
  land,
  art,
  aufbau,
  orte = [],
}: {
  land: Land;
  /** hintergrund = nur der Umriss, zart; staedte = Karte mit Nachbarn und Städten. */
  art: 'hintergrund' | 'staedte';
  aufbau: KartenAufbau;
  orte?: Ort[];
}) {
  const atlas = useAtlas();
  const plan = useMemo(() => (atlas ? plane(atlas, land, aufbau) : null), [atlas, land, aufbau]);
  const staedte = useMemo(
    () => (plan && art === 'staedte' ? waehleOrte(orte, plan.projektion, aufbau, 11) : []),
    [plan, art, orte, aufbau],
  );

  // Namen der Nachbarländer an ihren Mittelpunkt schreiben, sofern er gut im Bild liegt.
  const nachbarNamen = useMemo(() => {
    if (!plan || !atlas || art !== 'staedte') return [];
    const namen: Array<{ name: string; x: number; y: number }> = [];
    for (const n of plan.nachbarn) {
      const name = NAME_NACH_NUMMER.get(n.nummer);
      const teil = atlas.nachNummer.get(n.nummer);
      if (!name || !teil || n.nummer === land.num) continue;
      const p = plan.projektion(geoCentroid({ type: 'Feature', properties: {}, geometry: hauptteil(teil.feature.geometry) } as Feature));
      if (!p) continue;
      const [x, y] = p;
      const halb = name.length * 9;
      if (x - halb < 60 || x + halb > aufbau.breite - 60 || y < 230 || y > aufbau.hoehe - 120) continue;
      if (staedte.some((s) => Math.abs(s.x - x) < halb + 60 && Math.abs(s.y - y) < 40)) continue;
      if (namen.some((m) => Math.abs(m.x - x) < 260 && Math.abs(m.y - y) < 50)) continue;
      namen.push({ name, x, y });
    }
    return namen;
  }, [plan, atlas, art, staedte, land.num, aufbau]);

  return (
    <svg
      className="landkarte"
      data-art={art}
      data-bereit={Boolean(plan)}
      viewBox={`0 0 ${aufbau.breite} ${aufbau.hoehe}`}
      width={aufbau.breite}
      height={aufbau.hoehe}
      aria-hidden="true"
    >
      {plan && (
        <>
          <path className="landkarte__netz" d={plan.netz} />
          {plan.nachbarn.map((n, i) => (
            <path key={i} className="landkarte__nachbar" d={n.d} />
          ))}
          {plan.land && <path className="landkarte__land" d={plan.land} />}
          {plan.punkt && (
            <g className="landkarte__punkt">
              <circle cx={plan.punkt[0]} cy={plan.punkt[1]} r={46} />
              <circle cx={plan.punkt[0]} cy={plan.punkt[1]} r={12} />
            </g>
          )}

          {art === 'staedte' && (
            <>
              {nachbarNamen.map((n) => (
                <text key={n.name} className="landkarte__nachbarname" x={n.x} y={n.y} textAnchor="middle">
                  {n.name}
                </text>
              ))}
              {staedte.map((s) => (
                <g key={`${s.name}-${s.lon}`} className="landkarte__ort" data-haupt={s.haupt}>
                  {s.haupt ? (
                    <>
                      <circle cx={s.x} cy={s.y} r={13} className="landkarte__hauptring" />
                      <circle cx={s.x} cy={s.y} r={6} />
                    </>
                  ) : (
                    <circle cx={s.x} cy={s.y} r={7} />
                  )}
                  <text
                    x={s.seite === 'rechts' ? s.x + 20 : s.seite === 'links' ? s.x - 20 : s.x}
                    y={s.seite === 'oben' ? s.y - 22 : s.seite === 'unten' ? s.y + 46 : s.y + 10}
                    textAnchor={ANKER[s.seite]}
                  >
                    {s.name}
                  </text>
                </g>
              ))}
              <g className="landkarte__massstab" transform={`translate(${aufbau.breite - 110 - plan.massstab.px}, ${aufbau.hoehe - 70})`}>
                <line x1={0} y1={0} x2={plan.massstab.px} y2={0} />
                <line x1={0} y1={-8} x2={0} y2={8} />
                <line x1={plan.massstab.px} y1={-8} x2={plan.massstab.px} y2={8} />
                <text x={plan.massstab.px / 2} y={-18} textAnchor="middle">
                  {plan.massstab.km.toLocaleString('de-DE')} km
                </text>
              </g>
            </>
          )}
        </>
      )}
    </svg>
  );
}
