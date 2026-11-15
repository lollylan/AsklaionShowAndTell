// Baut die Länder-Steckbriefe der Reiseimpfberatung aus offenen Quellen.
//
//   node werkzeuge/baue_laenderinfo.mjs          Quellen aus dem Zwischenspeicher, fehlende Bilder laden
//   node werkzeuge/baue_laenderinfo.mjs --neu    alle Abfragen und Bilder neu holen
//
// Quellen:
//   Wikidata           Hauptstadt, Amtssprachen, Währung, Steckertypen, Fahrseite, Flagge,
//                      Wahrzeichen (UNESCO-Welterbe mit den meisten Wikipedia-Artikeln)
//   Weltbank (WDI)     Einwohner (SP.POP.TOTL) und Fläche (AG.SRF.TOTL.K2), jeweils letzter Wert
//   Wikimedia Commons  Flaggen (SVG) und Fotos der Wahrzeichen mit Urheber und Lizenz
//   Natural Earth      Städte mit Einwohnerzahl und deutschem Namen (ne_10m_populated_places)
//
// Von Hand gepflegt: werkzeuge/laenderinfo_korrektur.json – andere Wahrzeichen (Wikidata-ids)
// und Korrekturen, wo Wikidata Unsinn liefert. Jede Korrektur dort mit Grund.
//
// Ergebnis:
//   src/module/reiseimpfung/daten/steckbriefe.json
//   public/bilder/laender/flaggen/<ISO3>.svg
//   public/bilder/laender/wahrzeichen/<ISO3>-<n>.jpg

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
const zwischen = join(wurzel, 'werkzeuge', 'quellen', 'laender');
const bildOrdner = join(wurzel, 'public', 'bilder', 'laender');
const ausgabe = join(wurzel, 'src', 'module', 'reiseimpfung', 'daten', 'steckbriefe.json');
const korrektur = JSON.parse(
  readFileSync(join(wurzel, 'werkzeuge', 'laenderinfo_korrektur.json'), 'utf8'),
);
const { laender } = JSON.parse(
  readFileSync(join(wurzel, 'src', 'module', 'reiseimpfung', 'daten', 'laender.json'), 'utf8'),
);

const neu = process.argv.includes('--neu');
const ohneBilder = process.argv.includes('--ohne-bilder');
const AGENT = 'AufklaerungPraxis/1.0 (Patientenaufklaerung in einer Hausarztpraxis; einmaliger Datenabruf) curl';
const BILDBREITE = 1280;

for (const o of [zwischen, join(bildOrdner, 'flaggen'), join(bildOrdner, 'wahrzeichen')])
  mkdirSync(o, { recursive: true });

// Adressen selbst kodieren: Umlaute in Kommandozeilen-Argumenten kommen unter Windows
// in der falschen Zeichenkodierung bei curl an.
const api = (basis, werte) => `${basis}?${new URLSearchParams(werte)}`;

const warte = (ms) => new Promise((r) => setTimeout(r, ms));

// curl statt fetch: Windows-curl kommt mit --ssl-no-revoke auch durch Netze,
// in denen die Sperrlistenprüfung der Zertifikate scheitert.
function curl(args) {
  return execFileSync('curl', ['-s', '-L', '--ssl-no-revoke', '--fail', '-A', AGENT, ...args], {
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
}

/** Wikimedia-Schnittstellen drosseln (HTTP 429): dann warten und noch einmal. */
async function geduldig(args) {
  for (let versuch = 1; ; versuch++) {
    try {
      return curl(['--retry', '3', '--retry-delay', '20', ...args]);
    } catch (fehler) {
      if (versuch >= 5) throw fehler;
      console.log(`  Server bremst, warte ${30 * versuch} s …`);
      await warte(30000 * versuch);
    }
  }
}

/** Holt eine Datei einmal und legt sie im Zwischenspeicher ab. */
async function gespeichert(name, holen) {
  const datei = join(zwischen, name);
  if (!neu && existsSync(datei)) return JSON.parse(readFileSync(datei, 'utf8'));
  const daten = await holen();
  writeFileSync(datei, JSON.stringify(daten));
  return daten;
}

async function sparql(abfrage) {
  for (let versuch = 1; ; versuch++) {
    try {
      // Abfrage über eine Datei: Zeilenumbrüche und Anführungszeichen in Argumenten
      // übersteht die Windows-Kommandozeile nicht zuverlässig.
      const datei = join(zwischen, '_abfrage.rq');
      writeFileSync(datei, abfrage);
      const text = curl([
        '-m', '180',
        '-H', 'Accept: application/sparql-results+json',
        '--data-urlencode', `query@${datei}`,
        'https://query.wikidata.org/sparql',
      ]);
      return JSON.parse(text).results.bindings.map((b) =>
        Object.fromEntries(Object.entries(b).map(([k, v]) => [k, v.value])),
      );
    } catch (fehler) {
      if (versuch >= 4) throw fehler;
      await warte(5000 * versuch);
    }
  }
}

const stapel = (liste, groesse) =>
  Array.from({ length: Math.ceil(liste.length / groesse) }, (_, i) =>
    liste.slice(i * groesse, (i + 1) * groesse),
  );

// ---------- Wikidata: Grunddaten ----------

const ISO3 = laender.map((l) => l.iso3);
// Länder ohne ISO-Code in Wikidata (Kosovo): über ihre Wikidata-id einbinden. Die Weltbank
// führt Kosovo als XKX.
const PER_QID = Object.entries(korrektur.qid ?? {});
const LAND_BINDUNG = `{ ?land wdt:P298 ?iso3 . } UNION { VALUES (?iso3 ?land) { ${PER_QID.map(([c, q]) => `("${c}" wd:${q})`).join(' ')} } }`;
const fremd = (iso3) => iso3;
const zurueck = (code) => (code === 'XKX' ? 'KOS' : code);

const wikidata = await gespeichert('wikidata.json', async () => {
  const zeilen = [];
  for (const teil of stapel(ISO3.map(fremd), 40)) {
    const werte = teil.map((c) => `"${c}"`).join(' ');
    zeilen.push(
      ...(await sparql(`
SELECT ?iso3 ?land ?hauptstadt ?flagge ?bild ?fahrseite
  (GROUP_CONCAT(DISTINCT ?spL; separator="|") AS ?sprachen)
  (GROUP_CONCAT(DISTINCT ?wL; separator="|") AS ?waehrungen)
  (GROUP_CONCAT(DISTINCT ?stL; separator="|") AS ?stecker)
WHERE {
  VALUES ?iso3 { ${werte} }
  ${LAND_BINDUNG}
  FILTER NOT EXISTS { ?land wdt:P576 ?ende }
  OPTIONAL { ?land wdt:P36 ?h . ?h rdfs:label ?hauptstadt . FILTER(LANG(?hauptstadt)="de") }
  OPTIONAL { ?land wdt:P41 ?flagge }
  OPTIONAL { ?land wdt:P18 ?bild }
  OPTIONAL { ?land wdt:P1622 ?fs . ?fs rdfs:label ?fahrseite . FILTER(LANG(?fahrseite)="de") }
  OPTIONAL { ?land wdt:P37 ?sp . ?sp rdfs:label ?spL . FILTER(LANG(?spL)="de") }
  OPTIONAL { ?land wdt:P38 ?w . ?w rdfs:label ?wL . FILTER(LANG(?wL)="de") }
  OPTIONAL { ?land wdt:P2853 ?st . ?st rdfs:label ?stL . FILTER(LANG(?stL)="de") }
}
GROUP BY ?iso3 ?land ?hauptstadt ?flagge ?bild ?fahrseite`)),
    );
    await warte(1500);
  }
  return zeilen;
});

/** Je Land eine Zeile; bei mehreren Treffern (mehrere Hauptstädte, Flaggen) die erste. */
const grund = new Map();
for (const z of wikidata) {
  z.iso3 = zurueck(z.iso3);
  const alt = grund.get(z.iso3);
  const teile = (s) => (s ? s.split('|').filter(Boolean) : []);
  if (!alt) {
    grund.set(z.iso3, {
      qid: z.land.split('/').pop(),
      hauptstadt: new Set(z.hauptstadt ? [z.hauptstadt] : []),
      flagge: z.flagge ?? null,
      bild: z.bild ?? null,
      fahrseite: z.fahrseite ?? null,
      sprachen: new Set(teile(z.sprachen)),
      waehrungen: new Set(teile(z.waehrungen)),
      stecker: new Set(teile(z.stecker)),
    });
  } else {
    if (z.hauptstadt) alt.hauptstadt.add(z.hauptstadt);
    alt.flagge ??= z.flagge ?? null;
    alt.bild ??= z.bild ?? null;
    alt.fahrseite ??= z.fahrseite ?? null;
    teile(z.sprachen).forEach((s) => alt.sprachen.add(s));
    teile(z.waehrungen).forEach((s) => alt.waehrungen.add(s));
    teile(z.stecker).forEach((s) => alt.stecker.add(s));
  }
}

// ---------- Wikidata: Wahrzeichen ----------

const qids = [...grund.values()].map((g) => g.qid);
const welterbe = await gespeichert('welterbe.json', async () => {
  const zeilen = [];
  for (const teil of stapel(qids, 12)) {
    zeilen.push(
      ...(await sparql(`
SELECT ?land ?ort ?name ?bild ?links WHERE {
  VALUES ?land { ${teil.map((q) => `wd:${q}`).join(' ')} }
  ?ort wdt:P1435 wd:Q9259 ; wdt:P17 ?land ; wdt:P18 ?bild ; wikibase:sitelinks ?links .
  ?ort rdfs:label ?name . FILTER(LANG(?name)="de")
}`)),
    );
    await warte(1500);
  }
  return zeilen;
});

// Von Hand gewählte Wahrzeichen (werkzeuge/wahrzeichen.json, Titel der deutschen Wikipedia).
// Bild und Bildrechte kommen trotzdem aus Wikidata/Commons.
const wahl = JSON.parse(readFileSync(join(wurzel, 'werkzeuge', 'wahrzeichen.json'), 'utf8'));
delete wahl._hinweis;
const gewuenscht = [...new Set(Object.values(wahl).flat())];
const handverlesen = await gespeichert('wahrzeichen_hand.json', async () => ({}));
// Über die deutsche Wikipedia: Artikel (Umleitungen aufgelöst), Wikidata-id und Leitbild des
// Artikels (pageimages) – 50 Titel je Anfrage. Begriffsklärungen zählen nicht. Was so nicht
// gefunden wird, sucht die Wikipedia-Suche; ohne Leitbild gilt das Bild aus Wikidata (P18).
async function artikelInfos(titel) {
  const ergebnis = new Map();
  for (const teil of stapel(titel, 50)) {
    const q = JSON.parse(
      await geduldig([
        '-m', '120',
        api('https://de.wikipedia.org/w/api.php', {
          action: 'query', prop: 'pageprops|pageimages', ppprop: 'wikibase_item|disambiguation',
          piprop: 'name', pilicense: 'any', redirects: '1', format: 'json', titles: teil.join('|'),
        }),
      ]),
    ).query;
    const norm = new Map((q.normalized ?? []).map((n) => [n.from, n.to]));
    const umleitung = new Map((q.redirects ?? []).map((r) => [r.from, r.to]));
    const seiten = new Map(Object.values(q.pages).map((p) => [p.title, p]));
    for (const t of teil) {
      let ziel = norm.get(t) ?? t;
      ziel = umleitung.get(ziel) ?? ziel;
      const seite = seiten.get(ziel);
      const gut = seite && !('missing' in seite) && !('disambiguation' in (seite.pageprops ?? {}));
      ergebnis.set(t, gut ? { artikel: ziel, qid: seite.pageprops?.wikibase_item ?? null, bild: seite.pageimage ?? null } : null);
    }
    await warte(1500);
  }
  return ergebnis;
}

const handFehlt = gewuenscht.filter((t) => !handverlesen[t]?.geprueft);
const infosHand = await artikelInfos(handFehlt);
// Nicht gefunden: erster Treffer der Volltextsuche.
for (const t of handFehlt.filter((t) => !infosHand.get(t))) {
  const treffer = JSON.parse(
    await geduldig([
      '-m', '60',
      api('https://de.wikipedia.org/w/api.php', { action: 'query', list: 'search', srsearch: t, srlimit: '1', format: 'json' }),
    ]),
  ).query.search?.[0]?.title;
  if (treffer) infosHand.set(t, (await artikelInfos([treffer])).get(treffer) ?? null);
  await warte(800);
}
// Karten, Flaggen, Wappen und Lagepläne sind keine Fotos eines Wahrzeichens.
const KEIN_FOTO = /\.(svg|png)$|map|karte|flag|coat|wappen|location|satellite|lage|схема/i;
for (const i of infosHand.values()) if (i?.bild && KEIN_FOTO.test(i.bild)) i.bild = null;
// Bild aus Wikidata (P18, liegt immer auf Commons) hat Vorrang; das Leitbild des Artikels
// kann eine nur in der deutschen Wikipedia hochgeladene Datei sein.
const ohneBild = [...new Set([...infosHand.values()].filter((i) => i?.qid).map((i) => i.qid))];
for (const teil of stapel(ohneBild, 50)) {
  const { entities } = JSON.parse(
    await geduldig([
      '-m', '120',
      api('https://www.wikidata.org/w/api.php', { action: 'wbgetentities', ids: teil.join('|'), props: 'claims', format: 'json' }),
    ]),
  );
  for (const i of infosHand.values())
    if (i && teil.includes(i.qid)) {
      const bild = entities?.[i.qid]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value ?? null;
      if (bild && !KEIN_FOTO.test(bild)) i.bild = bild;
    }
  await warte(1500);
}
for (const t of handFehlt) {
  const i = infosHand.get(t);
  handverlesen[t] = i ? { ...i, geprueft: true } : null;
}
writeFileSync(join(zwischen, 'wahrzeichen_hand.json'), JSON.stringify(handverlesen));

// ---------- Deutsche Wikipedia: Amtssprachen aus der Infobox ----------
// Wikidata führt bei manchen Ländern alle anerkannten Sprachen als Amtssprache (USA: Spanisch,
// Hawaiisch …). Die Infobox der deutschen Wikipedia ist hier verlässlicher.

const artikel = await gespeichert('dewiki_titel.json', async () => {
  const titel = {};
  for (const teil of stapel([...grund.entries()], 45)) {
    const text = await geduldig([
      '-m', '120',
      `https://www.wikidata.org/w/api.php?action=wbgetentities&props=sitelinks&sitefilter=dewiki&format=json&ids=${teil.map(([, g]) => g.qid).join('|')}`,
    ]);
    const { entities } = JSON.parse(text);
    for (const [iso3, g] of teil) titel[iso3] = entities[g.qid]?.sitelinks?.dewiki?.title ?? null;
    await warte(300);
  }
  return titel;
});

const infoboxen = await gespeichert('dewiki_infobox.json', async () => {
  const boxen = {};
  const paare = Object.entries(artikel).filter(([, t]) => t);
  for (const teil of stapel(paare, 10)) {
    const text = await geduldig([
      '-m', '120',
      api('https://de.wikipedia.org/w/api.php', {
        action: 'query',
        prop: 'revisions',
        rvprop: 'content',
        rvslots: 'main',
        redirects: '1',
        format: 'json',
        titles: teil.map(([, t]) => t).join('|'),
      }),
    ]);
    const q = JSON.parse(text).query;
    const umleitung = new Map((q.redirects ?? []).map((r) => [r.to, r.from]));
    const nachTitel = new Map();
    for (const seite of Object.values(q.pages)) {
      const inhalt = seite.revisions?.[0]?.slots?.main?.['*'] ?? '';
      nachTitel.set(umleitung.get(seite.title) ?? seite.title, inhalt);
    }
    for (const [iso3, t] of teil) {
      const inhalt = nachTitel.get(t) ?? '';
      const m = inhalt.match(/\|\s*AMTSSPRACHE\s*=\s*([^\n]*)/i);
      boxen[iso3] = m ? m[1] : null;
    }
    await warte(2000);
  }
  return boxen;
});

/** Wikitext einer Infobox-Zeile in eine Liste von Sprachnamen verwandeln. */
function sprachenAusWiki(roh) {
  if (!roh) return null;
  let t = roh
    .replace(/<ref[^>]*\/>/g, '')
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, '')
    .replace(/<ref[^>]*>.*$/g, '')
    .replace(/\{\{[^{}]*\}\}/g, '')
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/'{2,}/g, '')
    .replace(/<br\s*\/?>/gi, ', ')
    .replace(/<[^>]+>/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  // Zusätze wie „sowie als Arbeitssprachen …“ oder „regional: …“ abtrennen.
  // „de jure: keine, de facto: Englisch“ → Englisch.
  t = t.replace(/de jure:\s*keine,?\s*/i, '').replace(/de facto:\s*/i, '');
  t = t.split(/\b(?:sowie|regional|außerdem|Arbeitssprache|anerkannte|Minderheitensprache|Nationalsprache|daneben|amtlich regional|regionale)/i)[0];
  const liste = t
    .split(/,|;|\bund\b|\//)
    .map((s) => s.replace(/^[^:]*:\s*/, '').replace(/^[\s:–-]+|[\s:–-]+$/g, '').trim())
    .filter((s) => s && s.length < 40 && !/gebärden/i.test(s) && !/^\d/.test(s));
  return liste.length ? [...new Set(liste)] : null;
}

// ---------- Weltbank: Einwohner und Fläche ----------

async function weltbank(indikator) {
  return gespeichert(`weltbank_${indikator}.json`, async () => {
    const text = curl([
      '-m', '120',
      `https://api.worldbank.org/v2/country/all/indicator/${indikator}?format=json&mrnev=1&per_page=500`,
    ]);
    return JSON.parse(text)[1];
  });
}
const nachIso = (zeilen) =>
  new Map(
    zeilen
      .filter((z) => z.value != null)
      .map((z) => [zurueck(z.countryiso3code), { wert: z.value, jahr: Number(z.date) }]),
  );
const einwohnerWB = nachIso(await weltbank('SP.POP.TOTL'));
const flaecheWB = nachIso(await weltbank('AG.SRF.TOTL.K2'));

// Für Gebiete ohne Weltbank-Zahl: Wikidata (Einwohner P1082 mit Stichtag, Fläche P2046).
const ersatz = await gespeichert('wikidata_zahlen.json', async () => {
  const zeilen = [];
  for (const teil of stapel(ISO3.map(fremd), 60)) {
    zeilen.push(
      ...(await sparql(`
SELECT ?iso3 ?flaeche ?einwohner ?stichtag WHERE {
  VALUES ?iso3 { ${teil.map((c) => `"${c}"`).join(' ')} }
  ${LAND_BINDUNG}
  FILTER NOT EXISTS { ?land wdt:P576 ?ende }
  OPTIONAL { ?land wdt:P2046 ?flaeche }
  OPTIONAL { ?land p:P1082 ?a . ?a ps:P1082 ?einwohner . OPTIONAL { ?a pq:P585 ?stichtag } }
}`)),
    );
  }
  return zeilen;
});
const ersatzNach = new Map();
for (const z of ersatz) {
  z.iso3 = zurueck(z.iso3);
  const e = ersatzNach.get(z.iso3) ?? { flaeche: null, einwohner: null, jahr: null };
  if (z.flaeche && !e.flaeche) e.flaeche = Number(z.flaeche);
  if (z.einwohner) {
    const jahr = z.stichtag ? Number(z.stichtag.slice(0, 4)) : 0;
    if (e.jahr === null || jahr > e.jahr) {
      e.einwohner = Number(z.einwohner);
      e.jahr = jahr || null;
    }
  }
  ersatzNach.set(z.iso3, e);
}

// ---------- Natural Earth: Städte ----------

const orteRoh = await gespeichert('ne_orte_auszug.json', async () => {
  const datei = join(zwischen, 'ne_orte.geojson');
  if (!existsSync(datei))
    curl([
      '-m', '600', '-o', datei,
      'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_populated_places.geojson',
    ]);
  const { features } = JSON.parse(readFileSync(datei, 'utf8'));
  return features.map(({ properties: p }) => ({
    iso2: p.ISO_A2,
    adm0: p.ADM0_A3,
    name: p.NAME_DE || p.NAME,
    lon: Math.round(p.LONGITUDE * 1000) / 1000,
    lat: Math.round(p.LATITUDE * 1000) / 1000,
    pop: p.POP_MAX,
    haupt: p.FEATURECLA === 'Admin-0 capital' || p.ADM0CAP === 1,
  }));
});

// ---------- Commons: Bildinfos und Dateien ----------

const dateiname = (url) => decodeURIComponent(url.split('/Special:FilePath/').pop()).replace(/_/g, ' ');

async function bildInfos(namen) {
  const infos = await gespeichert('commons.json', async () => ({}));
  const fehlt = [...new Set(namen)].filter((n) => !infos[n]);
  for (const teil of stapel(fehlt, 40)) {
    const text = await geduldig([
      '-m', '120',
      api('https://commons.wikimedia.org/w/api.php', {
        action: 'query',
        prop: 'imageinfo',
        iiprop: 'url|extmetadata|size',
        iiurlwidth: String(BILDBREITE),
        iiextmetadatafilter: 'Artist|LicenseShortName|Credit',
        format: 'json',
        titles: teil.map((n) => `File:${n}`).join('|'),
      }),
    ]);
    const antwort = JSON.parse(text).query;
    const umbenannt = new Map((antwort.normalized ?? []).map((n) => [n.to, n.from]));
    for (const seite of Object.values(antwort.pages)) {
      const info = seite.imageinfo?.[0];
      if (!info) continue;
      const titel = umbenannt.get(seite.title) ?? seite.title;
      const m = info.extmetadata ?? {};
      infos[titel.replace(/^File:/, '').replace(/_/g, ' ')] = {
        url: info.url,
        vorschau: info.thumburl ?? info.url,
        breite: info.thumbwidth ?? info.width,
        hoehe: info.thumbheight ?? info.height,
        urheber: ohneHtml(m.Artist?.value ?? ''),
        lizenz: ohneHtml(m.LicenseShortName?.value ?? ''),
        seite: info.descriptionurl,
      };
    }
    writeFileSync(join(zwischen, 'commons.json'), JSON.stringify(infos));
    await warte(500);
  }
  return infos;
}

function ohneHtml(text) {
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function lade(url, datei) {
  if (!neu && existsSync(datei) && statSync(datei).size > 0) return true;
  for (let versuch = 1; versuch <= 3; versuch++) {
    try {
      curl(['-m', '120', '--retry', '4', '--retry-delay', '15', '-o', datei, url]);
      await warte(400);
      return true;
    } catch {
      if (existsSync(datei)) unlinkSync(datei);
      await warte(3000 * versuch);
    }
  }
  console.warn(`  nicht geladen: ${url}`);
  return false;
}

// ---------- Zusammenbauen ----------

const welterbeNach = new Map();
for (const z of welterbe) {
  const qid = z.land.split('/').pop();
  const liste = welterbeNach.get(qid) ?? [];
  const ort = z.ort.split('/').pop();
  if (!liste.some((e) => e.ort === ort))
    liste.push({ ort, name: z.name, bild: z.bild, links: Number(z.links) });
  welterbeNach.set(qid, liste);
}
/** Anzeigename aus dem Wikipedia-Titel: ohne Klammerzusatz („Fuji (Vulkan)“ → „Fuji“). */
const anzeigename = (titel) => titel.replace(/\s*\([^)]*\)$/, '');

const handFehler = [];
function wahrzeichenFuer(iso3, qid) {
  const titel = wahl[iso3];
  if (titel) {
    const liste = [];
    for (const t of titel) {
      const h = handverlesen[t];
      if (!h) handFehler.push(`${iso3}: „${t}“ nicht in Wikipedia/Wikidata gefunden`);
      else if (!h.bild) handFehler.push(`${iso3}: „${t}“ hat kein Bild in Wikidata`);
      else liste.push({ ort: h.qid, name: anzeigename(h.artikel ?? t), bild: `/Special:FilePath/${encodeURIComponent(h.bild)}`, links: 0 });
    }
    if (liste.length) return liste;
  }
  return (welterbeNach.get(qid) ?? [])
    .filter((w) => !KEIN_FOTO.test(dateiname(w.bild)))
    .sort((a, b) => b.links - a.links)
    .slice(0, 2);
}

/** Städte für die Karte: die größten, die Hauptstadt immer dabei. */
function orteFuer(land) {
  const liste = orteRoh.filter(
    (o) => o.iso2 === land.iso2 || (o.iso2 === '-99' && o.adm0 === land.iso3),
  );
  liste.sort((a, b) => (b.haupt - a.haupt) || b.pop - a.pop);
  return liste.slice(0, 24).map(({ name, lon, lat, pop, haupt }) => ({ name, lon, lat, pop, haupt }));
}

const fehlen = [];
const ergebnis = {};
const alleBilder = [];
for (const land of laender) {
  const g = grund.get(land.iso3);
  if (!g) {
    fehlen.push(`${land.name}: nicht in Wikidata gefunden`);
    continue;
  }
  const k = korrektur.felder?.[land.iso3] ?? {};
  const wb = { einwohner: einwohnerWB.get(land.iso3), flaeche: flaecheWB.get(land.iso3) };
  const er = ersatzNach.get(land.iso3) ?? {};
  const wahrzeichen = wahrzeichenFuer(land.iso3, g.qid);
  // Ohne Welterbe: das Bild, das Wikidata für das Land selbst angibt (meist eine Landschaft).
  if (wahrzeichen.length === 0 && g.bild && !KEIN_FOTO.test(dateiname(g.bild)) && !korrektur.ohneLandbild?.includes(land.iso3))
    wahrzeichen.push({ ort: null, name: null, bild: g.bild, links: 0 });

  ergebnis[land.iso3] = {
    // Ohne Hauptstadt in Wikidata: die als Hauptstadt markierte Stadt aus Natural Earth.
    hauptstadt: k.hauptstadt ?? ([...g.hauptstadt].join(' / ') || orteFuer(land).find((o) => o.haupt)?.name || null),
    einwohner: k.einwohner ?? wb.einwohner?.wert ?? er.einwohner ?? null,
    einwohnerJahr: k.einwohnerJahr ?? wb.einwohner?.jahr ?? er.jahr ?? null,
    einwohnerQuelle: k.einwohner ? 'Korrektur' : wb.einwohner ? 'Weltbank' : er.einwohner ? 'Wikidata' : null,
    flaeche: k.flaeche ?? wb.flaeche?.wert ?? er.flaeche ?? null,
    sprachen:
      k.sprachen ??
      sprachenAusWiki(infoboxen[land.iso3]) ??
      [...g.sprachen].filter((x) => !/gebärden|wiktionary/i.test(x)),
    waehrungen: k.waehrungen ?? [...g.waehrungen],
    stecker: k.stecker ?? [...g.stecker],
    linksverkehr: k.linksverkehr ?? (g.fahrseite ? g.fahrseite === 'links' : null),
    flagge: g.flagge ? dateiname(g.flagge) : null,
    wahrzeichen: wahrzeichen.map((w) => ({ name: w.name, datei: dateiname(w.bild), qid: w.ort })),
    orte: orteFuer(land),
    wikidata: g.qid,
  };
  if (g.flagge) alleBilder.push(dateiname(g.flagge));
  alleBilder.push(...wahrzeichen.map((w) => dateiname(w.bild)));
}

if (ohneBilder) {
  writeFileSync(join(zwischen, 'vorschau.json'), JSON.stringify(ergebnis, null, 1));
  console.log('Nur Vorschau geschrieben: werkzeuge/quellen/laender/vorschau.json');
  if (handFehler.length) console.log('Wahrzeichen prüfen:\n  ' + handFehler.join('\n  '));
  process.exit(0);
}

const infos = await bildInfos(alleBilder);

let geladen = 0;
for (const [iso3, e] of Object.entries(ergebnis)) {
  if (e.flagge && infos[e.flagge]) {
    const ok = await lade(infos[e.flagge].url, join(bildOrdner, 'flaggen', `${iso3}.svg`));
    e.flagge = ok ? `${iso3}.svg` : null;
  } else e.flagge = null;

  const fertig = [];
  for (const w of e.wahrzeichen) {
    const info = infos[w.datei];
    if (!info) continue;
    // Dateiname aus dem Commons-Namen: Wechselt das Wahrzeichen, wird neu geladen.
    const datei = `${iso3}-${createHash('sha1').update(w.datei).digest('hex').slice(0, 8)}.jpg`;
    if (!(await lade(info.vorschau, join(bildOrdner, 'wahrzeichen', datei)))) continue;
    geladen++;
    fertig.push({
      name: w.name,
      bild: datei,
      breite: info.breite,
      hoehe: info.hoehe,
      urheber: info.urheber,
      lizenz: info.lizenz,
      quelle: info.seite,
    });
  }
  e.wahrzeichen = fertig;
  if (!e.flagge) fehlen.push(`${iso3}: keine Flagge`);
  if (fertig.length === 0) fehlen.push(`${iso3}: kein Wahrzeichen`);
  if (!e.einwohner) fehlen.push(`${iso3}: keine Einwohnerzahl`);
  if (e.orte.length === 0) fehlen.push(`${iso3}: keine Städte`);
}

writeFileSync(
  ausgabe,
  JSON.stringify({
    quellen: {
      grunddaten: 'Wikidata (CC0), abgerufen ' + new Date().toISOString().slice(0, 10),
      zahlen: 'Weltbank, World Development Indicators (CC BY 4.0): Einwohner, Fläche',
      bilder: 'Wikimedia Commons, Urheber und Lizenz je Bild',
      orte: 'Natural Earth, Populated Places 1:10 Mio. (gemeinfrei)',
    },
    laender: ergebnis,
  }),
);

console.log(`${Object.keys(ergebnis).length} Länder, ${geladen} Wahrzeichen-Fotos.`);
if (fehlen.length) console.log('Lücken:\n  ' + fehlen.join('\n  '));
