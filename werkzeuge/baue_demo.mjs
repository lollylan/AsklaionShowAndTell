// Baut die öffentliche Demo „Asklaion Show and Tell“ nach dist-demo/ und prüft sie.
//
//   npm run build:demo                         für GitHub Pages unter /AsklaionShowAndTell/
//   VITE_BASE=/anderer-pfad/ npm run build:demo
//
// Die Demo läuft ohne Server (Abgleich der Fenster über BroadcastChannel). Was sie nicht
// enthalten darf, steht in werkzeuge/gesperrt.txt; der Build lässt es weg (vite.config.ts).
// Ansehen:  npm run preview:demo

import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { WURZEL } from './demo-regeln.mjs';

process.env.VITE_DEMO = '1';
process.env.VITE_BASE ||= '/AsklaionShowAndTell/';

const { build } = await import('vite');
await build({ root: WURZEL });

const ziel = join(WURZEL, 'dist-demo');
// Für den Zweig gh-pages: Beschreibung, Lizenz und der Hinweis an GitHub Pages, nichts umzubauen.
// Im öffentlichen Quelltext liegen README und LICENSE an der Wurzel, hier unter werkzeuge/.
const erste = (...pfade) => pfade.map((p) => join(WURZEL, p)).find((p) => existsSync(p));
copyFileSync(erste('werkzeuge/demo-README.md', 'README.md'), join(ziel, 'README.md'));
copyFileSync(erste('werkzeuge/demo-LICENSE', 'LICENSE'), join(ziel, 'LICENSE'));
writeFileSync(join(ziel, '.nojekyll'), '');

// Die Prüfung auf Gesperrtes gibt es nur im privaten Repository.
const pruefe = join(WURZEL, 'werkzeuge', 'pruefe_demo.mjs');
if (existsSync(pruefe)) {
  const pruefung = spawnSync(process.execPath, [pruefe], { stdio: 'inherit' });
  process.exit(pruefung.status ?? 1);
}
