// Sammelt alle Texte, die auf Patientenbildschirm oder Handzettel erscheinen können, und
// zeigt, wie weit jede Sprache übersetzt ist.
//
//   node werkzeuge/sammle_texte.mjs                 Texte sammeln (src/sprachen/quelle.json),
//                                                   Stand je Sprache ausgeben
//   node werkzeuge/sammle_texte.mjs --offen en      fehlende englische Texte in Arbeitspakete
//                                                   schreiben: werkzeuge/uebersetzung/offen/en/
//   node werkzeuge/sammle_texte.mjs --offen alle    dasselbe für alle Sprachen
//   --groesse 18000                                 Zeichen je Arbeitspaket (Standard 18000)
//   node werkzeuge/sammle_texte.mjs --laender       Ländernamen aller Sprachen neu erzeugen
//   --ohne "steckbriefe|reisetipps"                 diese Dateien nicht in die Pakete nehmen
//   --nur aufklaerungen                             nur Dateien, deren Pfad das enthält
//
// Pakete, deren Name „privat“ enthält, stammen aus src/privat (Praxisfassung) und gehören
// fertig nach src/privat/sprachen/<code>/ statt nach src/sprachen/texte/<code>/.
//
// src/sprachen/quelle.json enthält auch die privaten Texte und steht deshalb nicht im Repo.
//
// Ein Arbeitspaket ist ein JSON-Objekt { "deutscher Text": "" }, nach Datei geordnet. Die
// fertige Übersetzung kommt als src/sprachen/texte/<code>/<name>.json mit denselben Schlüsseln
// (Werte = Übersetzung). Dateinamen sind frei; die App führt alle Teile einer Sprache zusammen.
//
// Gesammelt wird mit dem TypeScript-Parser: Zeichenketten und JSX-Text aus src/, ohne die
// Steuerung (src/arzt, *Steuerung*.tsx), Korrekturseiten, Suchbegriffe und technische Werte
// (ids, Klassen, Farben, Pfade). Texte mit ${…} lassen sich nicht nachschlagen und werden nur
// gemeldet. Lieber ein Text zu viel als zu wenig: Überzählige stören nicht.

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QUELLE = path.join(WURZEL, 'src/sprachen/quelle.json');
const TEXTE = path.join(WURZEL, 'src/sprachen/texte');
/** Übersetzungen praxis-eigener Texte (aus src/privat): bleiben aus Demo und Quelltext heraus. */
const TEXTE_PRIVAT = path.join(WURZEL, 'src/privat/sprachen');
const OFFEN = path.join(WURZEL, 'werkzeuge/uebersetzung/offen');

const AUSGENOMMEN_ORDNER = ['src/arzt', 'src/info', 'src/sprachen', 'src/module/_vorlage'];
const AUSGENOMMEN_DATEI = /(Steuerung|Korrektur)[^/]*\.tsx?$|\.d\.ts$|^src\/main\.tsx$/;

/** Eigenschaften mit technischen Werten oder Suchwörtern – nie übersetzen. */
const TECHNISCH = new Set([
  'id', 'gebiet', 'suche', 'begriffe', 'farbe', 'farben', 'bild', 'bilder', 'klasse', 'className',
  'datei', 'art', 'typ', 'schluessel', 'href', 'src', 'url', 'pfad', 'manoever', 'nach', 'ohr',
  'modul', 'symbol', 'region', 'modell', 'objekt', 'objekte', 'kamera', 'key', 'stil', 'style',
  'ton', 'form', 'seite', 'icon', 'land', 'iso', 'code', 'kuerzel', 'lizenzUrl', 'commons',
  'dateiname', 'datei_name', 'quelleUrl',
]);
/** JSON-Daten, deren Texte auf der Bühne stehen. Ländernamen kommen aus i18n-iso-countries. */
const JSON_DATEIEN = [
  'src/module/aufklaerungen/bildgebung.json',
  'src/module/orthopaedie/bildgebung.json',
  'src/module/reiseimpfung/daten/reisetipps.json',
  'src/module/reiseimpfung/daten/steckbriefe.json',
  'src/privat/reiseimpfung/fach.json',
];
const JSON_TECHNISCH = new Set([
  ...TECHNISCH, 'quelle', 'quellen', 'urheber', 'flagge', 'iso2', 'iso3', 'num', 'alle',
  'einwohnerQuelle',
]);
const JSX_TEXT_ATTRIBUTE = new Set(['title', 'alt', 'aria-label', 'placeholder']);

const args = process.argv.slice(2);
const wert = (name, standard) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : standard;
};
const offenFuer = wert('--offen', null);
const groesse = Number(wert('--groesse', 18000));
const nur = wert('--nur', null);
/** Dateien, deren Pfad diesen regulären Ausdruck trifft, kommen nicht in die Arbeitspakete. */
const ohne = wert('--ohne', null) ? new RegExp(wert('--ohne', null)) : null;

const glaette = (s) => s.replace(/\s+/g, ' ').trim();

function istText(t) {
  if (t.length < 2 || !/[A-Za-zÄÖÜäöüß]/.test(t)) return false;
  if (/^(#|\.|\/|https?:|data:|var\(|rgb|hsl|M\d|m\d)/.test(t)) return false;
  if (/^[a-z0-9_.-]+$/.test(t)) return false; // ids, Klassen, Dateinamen
  if (/^[a-z]+[A-Z][A-Za-z]*$/.test(t)) return false; // camelCase-Bezeichner
  if (/^[\d\s.,:;%×x+\-–/()]+[a-zA-Z]{0,3}$/.test(t)) return false; // Zahlen und Einheiten
  if (/\s/.test(t) || /[ÄÖÜäöüß]/.test(t) || /^[A-ZÄÖÜ]/.test(t)) return true;
  return false;
}

function dateienUnter(ordner) {
  const liste = [];
  (function lauf(d) {
    for (const name of fs.readdirSync(d)) {
      const p = path.join(d, name);
      if (fs.statSync(p).isDirectory()) lauf(p);
      else if (/\.(ts|tsx)$/.test(name)) liste.push(p);
    }
  })(ordner);
  return liste.sort();
}

function sammle() {
  const nachDatei = {};
  const gesehen = new Set();
  const vorlagen = [];
  for (const voll of dateienUnter(path.join(WURZEL, 'src'))) {
    const rel = path.relative(WURZEL, voll).split(path.sep).join('/');
    if (AUSGENOMMEN_ORDNER.some((o) => rel.startsWith(o + '/'))) continue;
    if (AUSGENOMMEN_DATEI.test(rel)) continue;
    if (nur && !rel.includes(nur)) continue;

    const quelltext = fs.readFileSync(voll, 'utf8');
    const art = rel.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    const datei = ts.createSourceFile(rel, quelltext, ts.ScriptTarget.Latest, true, art);
    const texte = [];
    const nimm = (roh) => {
      const t = glaette(roh);
      if (!istText(t) || gesehen.has(t)) return;
      gesehen.add(t);
      texte.push(t);
    };

    const besuche = (k) => {
      if (ts.isImportDeclaration(k) || ts.isExportDeclaration(k)) return;
      if (ts.isTypeNode(k) && !ts.isTypeLiteralNode(k)) return;
      if (ts.isStringLiteral(k) || ts.isNoSubstitutionTemplateLiteral(k)) {
        const eltern = k.parent;
        if (ts.isPropertyAssignment(eltern) && eltern.initializer === k) {
          const name = eltern.name && (eltern.name.text ?? eltern.name.escapedText);
          if (TECHNISCH.has(name)) return;
        }
        if (ts.isPropertyAssignment(eltern) && eltern.name === k) return; // Schlüssel
        if (ts.isJsxAttribute(eltern)) {
          if (JSX_TEXT_ATTRIBUTE.has(eltern.name.getText(datei))) nimm(k.text);
          return;
        }
        if (ts.isCallExpression(eltern) && /^(import|require|querySelector|getElementById|addEventListener|removeEventListener|getItem|setItem|setAttribute|getAttribute|createElement|startsWith|endsWith|includes|split|join|replace|test|match)$/.test(eltern.expression.name?.text ?? eltern.expression.getText?.(datei) ?? '')) return;
        if (ts.isElementAccessExpression(eltern)) return;
        if (ts.isBinaryExpression(eltern) && /===|!==|==|!=/.test(eltern.operatorToken.getText(datei))) return;
        if (ts.isCaseClause(eltern)) return;
        nimm(k.text);
        return;
      }
      if (ts.isTemplateExpression(k)) {
        const teile = [k.head.text, ...k.templateSpans.map((s) => s.literal.text)].join(' … ');
        if (istText(glaette(teile))) vorlagen.push(`${rel}: ${glaette(teile)}`);
      }
      if (ts.isJsxText(k)) nimm(k.text);
      ts.forEachChild(k, besuche);
    };
    besuche(datei);
    if (texte.length) nachDatei[rel] = texte;
  }
  for (const rel of JSON_DATEIEN) {
    if (nur && !rel.includes(nur)) continue;
    const voll = path.join(WURZEL, rel);
    if (!fs.existsSync(voll)) continue;
    const texte = [];
    const lauf = (wert, schluessel) => {
      if (JSON_TECHNISCH.has(schluessel)) return;
      if (typeof wert === 'string') {
        const t = glaette(wert);
        if (istText(t) && !gesehen.has(t)) {
          gesehen.add(t);
          texte.push(t);
        }
      } else if (Array.isArray(wert)) wert.forEach((w) => lauf(w, schluessel));
      else if (wert && typeof wert === 'object')
        for (const [k, w] of Object.entries(wert)) lauf(w, /^[A-Z]{3}$/.test(k) ? '' : k);
    };
    lauf(JSON.parse(fs.readFileSync(voll, 'utf8')), '');
    if (texte.length) nachDatei[rel] = texte;
  }
  return { nachDatei, vorlagen };
}

/** Ländernamen aller Sprachen aus i18n-iso-countries → src/sprachen/texte/<code>/laender.json. */
function schreibeLaender() {
  const laender = require(path.join(WURZEL, 'src/module/reiseimpfung/daten/laender.json')).laender;
  const iso = require('i18n-iso-countries');
  for (const code of sprachen()) {
    try {
      iso.registerLocale(require(`i18n-iso-countries/langs/${code}.json`));
    } catch {
      console.log(`  ${code}: keine Ländernamen in i18n-iso-countries`);
      continue;
    }
    const wb = {};
    for (const land of Object.values(laender)) {
      const name = iso.getName(land.iso2, code, { select: 'official' }) ?? iso.getName(land.iso2, code);
      if (name) wb[land.name] = name;
    }
    fs.mkdirSync(path.join(TEXTE, code), { recursive: true });
    fs.writeFileSync(path.join(TEXTE, code, 'laender.json'), JSON.stringify(wb, null, 1) + '\n');
  }
  console.log('Ländernamen geschrieben (texte/<code>/laender.json)');
}

function ladeSprache(code) {
  const wb = new Map();
  for (const ordner of [path.join(TEXTE, code), path.join(TEXTE_PRIVAT, code)]) {
    if (!fs.existsSync(ordner)) continue;
    for (const name of fs.readdirSync(ordner).filter((n) => n.endsWith('.json')).sort()) {
      const teil = JSON.parse(fs.readFileSync(path.join(ordner, name), 'utf8'));
      for (const [de, ueb] of Object.entries(teil))
        if (typeof ueb === 'string' && ueb.trim()) wb.set(glaette(de), ueb);
    }
  }
  return wb;
}

function sprachen() {
  const datei = fs.readFileSync(path.join(WURZEL, 'src/sprachen/sprachen.ts'), 'utf8');
  return [...datei.matchAll(/code: '([a-z-]+)'/g)].map((m) => m[1]).filter((c) => c !== 'de');
}

if (args.includes('--laender')) schreibeLaender();

const { nachDatei, vorlagen } = sammle();
const alle = Object.values(nachDatei).flat();
const zeichen = alle.reduce((n, t) => n + t.length, 0);

if (!nur) {
  fs.writeFileSync(QUELLE, JSON.stringify(nachDatei, null, 1) + '\n');
  console.log(`${alle.length} Texte (${Math.round(zeichen / 1000)} Tsd. Zeichen) aus ${Object.keys(nachDatei).length} Dateien → src/sprachen/quelle.json`);
  console.log(`${vorlagen.length} Texte mit Platzhaltern (\${…}) bleiben deutsch, siehe --vorlagen`);
  if (args.includes('--vorlagen')) vorlagen.forEach((v) => console.log('  ' + v));
} else {
  console.log(`${alle.length} Texte in Dateien mit „${nur}“`);
}

console.log('\nStand der Übersetzungen:');
for (const code of sprachen()) {
  const wb = ladeSprache(code);
  const fertig = alle.filter((t) => wb.has(t));
  const fz = fertig.reduce((n, t) => n + t.length, 0);
  console.log(`  ${code.padEnd(3)} ${String(fertig.length).padStart(5)} / ${alle.length} Texte, ${Math.round((100 * fz) / Math.max(zeichen, 1))} % der Zeichen`);
}

if (offenFuer) {
  const codes = offenFuer === 'alle' ? sprachen() : offenFuer.split(',');
  for (const code of codes) {
    const wb = ladeSprache(code);
    const ziel = path.join(OFFEN, code);
    fs.rmSync(ziel, { recursive: true, force: true });
    fs.mkdirSync(ziel, { recursive: true });
    let paket = {};
    let umfang = 0;
    let nr = 0;
    let bereich = '';
    const schreibe = () => {
      if (!Object.keys(paket).length) return;
      nr += 1;
      const name = `${String(nr).padStart(3, '0')}-${bereich}.json`;
      fs.writeFileSync(path.join(ziel, name), JSON.stringify(paket, null, 1) + '\n');
      paket = {};
      umfang = 0;
    };
    for (const [datei, texte] of Object.entries(nachDatei)) {
      if (ohne?.test(datei)) continue;
      const offen = texte.filter((t) => !wb.has(t));
      if (!offen.length) continue;
      // Pakete aus src/privat heißen „privat-…“ und gehören nach src/privat/sprachen/<code>/.
      const neuerBereich = datei.startsWith('src/privat/')
        ? 'privat'
        : datei.split('/').slice(1, 3).join('-').replace(/\.tsx?$/, '');
      const privatWechsel = (neuerBereich === 'privat') !== (bereich === 'privat');
      if (umfang > 0 && (privatWechsel || umfang > groesse || (neuerBereich !== bereich && umfang > groesse * 0.6)))
        schreibe();
      bereich = neuerBereich;
      for (const t of offen) {
        paket[t] = '';
        umfang += t.length;
        if (umfang > groesse * 1.3) schreibe();
      }
    }
    schreibe();
    console.log(`  ${code}: ${nr} Arbeitspakete in werkzeuge/uebersetzung/offen/${code}/`);
  }
}
