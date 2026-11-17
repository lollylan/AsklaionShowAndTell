// Plausibilitätsprüfung der Wörterbücher (src/sprachen/texte, src/privat/sprachen).
// Findet, was die Schlüsselprüfung nicht sieht: verrutschte Werte (Übersetzung gehört zu einem
// anderen Text), geänderte Zahlen, auffällige Längen und Wörter aus gemischten Schriften.
//
//   node werkzeuge/pruefe_uebersetzung.mjs            alle Sprachen
//   node werkzeuge/pruefe_uebersetzung.mjs en ar      nur diese
//   --alle                                           jede Fundstelle statt der ersten 15 je Art

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORDNER = [path.join(WURZEL, 'src/sprachen/texte'), path.join(WURZEL, 'src/privat/sprachen')];
const args = process.argv.slice(2);
const alle = args.includes('--alle');
const nurCodes = args.filter((a) => !a.startsWith('--'));

/** Zahlen ohne Tausender- und Dezimaltrenner, sortiert: „20.000“, „20,000“, „20 000“ → 20000. */
const zahlen = (s) =>
  (s.replace(/(\d)[.,   ](?=\d{3}\b)/g, '$1').replace(/(\d)[.,](\d)/g, '$1$2').match(/\d+/g) ?? [])
    .filter((z) => z.length > 0)
    .sort();
const gleich = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

/** Wort, das lateinische und kyrillische oder arabische Buchstaben mischt. */
const GEMISCHT = /[\p{Script=Latin}][\p{Script=Cyrillic}\p{Script=Arabic}]|[\p{Script=Cyrillic}\p{Script=Arabic}][\p{Script=Latin}]/u;

let fehlerGesamt = 0;
const codes = new Set();
for (const o of ORDNER) if (fs.existsSync(o)) fs.readdirSync(o).forEach((c) => codes.add(c));

for (const code of [...codes].sort()) {
  if (nurCodes.length && !nurCodes.includes(code)) continue;
  const funde = { zahlen: [], laenge: [], schrift: [], gleich: [] };
  for (const o of ORDNER) {
    const d = path.join(o, code);
    if (!fs.existsSync(d)) continue;
    for (const name of fs.readdirSync(d).filter((n) => n.endsWith('.json') && n !== 'laender.json')) {
      const wb = JSON.parse(fs.readFileSync(path.join(d, name), 'utf8'));
      for (const [de, ueb] of Object.entries(wb)) {
        const ort = `${name}: ${de.slice(0, 60)} → ${String(ueb).slice(0, 60)}`;
        if (!gleich(zahlen(de), zahlen(ueb))) funde.zahlen.push(ort);
        const v = ueb.length / Math.max(de.length, 1);
        if (de.length >= 40 && (v < 0.35 || v > 2.8)) funde.laenge.push(`${v.toFixed(2)} ${ort}`);
        if (/^(ru|uk|ar|fa)$/.test(code) && GEMISCHT.test(ueb.replace(/\b[A-Z]{2,}\b/g, ''))) funde.schrift.push(ort);
        if (de.length >= 25 && de === ueb && /[äöüß]|\b(und|der|die|das|ist|nicht)\b/.test(de)) funde.gleich.push(ort);
      }
    }
  }
  const n = Object.values(funde).reduce((s, f) => s + f.length, 0);
  fehlerGesamt += n;
  console.log(`\n== ${code}: ${n} Auffälligkeiten`);
  const titel = {
    zahlen: 'Zahlen weichen ab',
    laenge: 'Länge auffällig (Verhältnis)',
    schrift: 'Gemischte Schrift',
    gleich: 'Unübersetzt (deutsch geblieben)',
  };
  for (const [art, liste] of Object.entries(funde)) {
    if (!liste.length) continue;
    console.log(`  ${titel[art]}: ${liste.length}`);
    (alle ? liste : liste.slice(0, 15)).forEach((l) => console.log('    ' + l));
  }
}
console.log(`\nZusammen ${fehlerGesamt} Auffälligkeiten (nicht jede ist ein Fehler).`);
