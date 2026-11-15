// Zeichnet eine oder mehrere SVG-Komponenten (.tsx mit default-Export ohne Props) als PNG,
// damit man Zeichnungen ohne laufende App ansehen kann.
//
//   node werkzeuge/zeige_svg.mjs <datei.tsx> [weitere.tsx …] --aus <ausgabe.png>
//
// Die Komponenten stehen nebeneinander auf dem dunklen Petrol der Bühne (je 720 px breit).
// Braucht esbuild (liegt durch Vite bei) und Chrome oder Edge.

import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const ausIndex = args.indexOf('--aus');
if (ausIndex < 0 || args.length < 3) {
  console.error('Aufruf: node werkzeuge/zeige_svg.mjs <datei.tsx> [...] --aus <bild.png>');
  process.exit(1);
}
const aus = path.resolve(args[ausIndex + 1]);
const dateien = args.filter((_, i) => i !== ausIndex && i !== ausIndex + 1).map((d) => path.resolve(d));

const ordner = mkdtempSync(path.join(tmpdir(), 'zeige-svg-'));
const eingang = path.join(ordner, 'eingang.jsx');
writeFileSync(
  eingang,
  `import { renderToStaticMarkup } from 'react-dom/server';
${dateien.map((d, i) => `import K${i} from ${JSON.stringify(d.replace(/\\/g, '/'))};`).join('\n')}
export const teile = [${dateien.map((_, i) => `renderToStaticMarkup(<K${i} />)`).join(', ')}];
`,
);

const bundle = path.join(ordner, 'bundle.cjs');
await build({
  entryPoints: [eingang],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  outfile: bundle,
  nodePaths: [path.resolve('node_modules')],
  loader: { '.css': 'empty' },
  logLevel: 'error',
});
const { teile } = createRequire(import.meta.url)(bundle);

const breite = 760 * teile.length;
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;background:radial-gradient(circle at 30% 20%,#03758f,#013b4a);font-family:Merriweather,Georgia,serif;display:flex;gap:40px;padding:20px;width:${breite}px;box-sizing:border-box}
.teil{width:720px;height:720px;display:flex;align-items:center;justify-content:center;outline:1px dashed rgba(255,255,255,.25)}
svg{width:720px;height:auto;max-height:720px;overflow:visible}
</style>${teile.map((t) => `<div class="teil">${t}</div>`).join('')}`;
const seite = path.join(ordner, 'seite.html');
writeFileSync(seite, html);

const browser = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find((p) => existsSync(p));
if (!browser) {
  console.error('Weder Chrome noch Edge gefunden.');
  process.exit(1);
}
execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--user-data-dir=${path.join(ordner, 'profil')}`,
  `--window-size=${breite},760`,
  `--screenshot=${aus}`,
  pathToFileURL(seite).href,
], { stdio: 'ignore' });
console.log(`Gespeichert: ${aus}`);
