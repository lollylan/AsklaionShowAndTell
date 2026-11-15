import { copyFileSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { haengeRelayAn } from './server/relay.mjs';
import { LIZENZ_ERLAUBT, WURZEL, bildErlaubt, liesGesperrt } from './werkzeuge/demo-regeln.mjs';

// Zwei Fassungen aus einem Quelltext:
//   npm run build         die Praxisfassung mit allem (Standard)
//   npm run build:demo    die öffentliche Demo „Asklaion Show and Tell“ (VITE_DEMO=1):
//                         ohne src/privat/ und ohne die Dateien aus werkzeuge/gesperrt.txt,
//                         Sync über BroadcastChannel statt über den Relay.
// Der Unterpfad für GitHub Pages kommt über VITE_BASE oder --base, z. B. /AsklaionShowAndTell/.
const demo = process.env.VITE_DEMO === '1';
const gesperrt = liesGesperrt();
const praxis = !demo && existsSync(join(WURZEL, 'src/privat/marke.ts'));

// Im Entwicklungsmodus läuft der Sync-Relay direkt im Vite-Server mit,
// im Betrieb übernimmt das server/start.mjs.
function syncRelay(): Plugin {
  return {
    name: 'aufklaerung-sync-relay',
    configureServer(server) {
      if (server.httpServer) haengeRelayAn(server.httpServer);
    },
    configurePreviewServer(server) {
      haengeRelayAn(server.httpServer);
    },
  };
}

/**
 * index.html trägt Titel und Symbol von „Asklaion Show and Tell“. Die Praxisfassung (mit
 * src/privat/marke.ts, nicht als Demo gebaut) bekommt hier Praxislogo und eigenen Titel.
 */
function praxisTitel(): Plugin {
  return {
    name: 'aufklaerung-praxis-titel',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html
          .replace('type="image/png" href="/asklaion.png"', 'type="image/png" href="/logo.png"')
          .replace('<title>Asklaion Show and Tell</title>', '<title>Aufklärung</title>'),
    },
  };
}

/** Demo-Build: gesperrten Quelltext durch leere Module ersetzen, gesperrte Dateien löschen. */
function demoFilter(): Plugin {
  const quelltext = gesperrt.quelltext.map((p) => `${WURZEL}/${p}`.toLowerCase());
  let ziel = join(WURZEL, 'dist');
  return {
    name: 'aufklaerung-demo-filter',
    enforce: 'pre',
    configResolved(config) {
      ziel = join(config.root, config.build.outDir);
    },
    load(id) {
      const pfad = id.split('?')[0].replace(/\\/g, '/').toLowerCase();
      if (quelltext.some((q) => pfad.startsWith(q))) return 'export default null;';
      return null;
    },
    closeBundle() {
      if (!existsSync(join(ziel, 'index.html'))) return;
      for (const pfad of gesperrt.dateien) rmSync(join(ziel, pfad), { recursive: true, force: true });

      // Wahrzeichen ohne veröffentlichbare Lizenz (die App blendet sie nach derselben Regel aus).
      const steckbriefe = JSON.parse(
        readFileSync(join(WURZEL, 'src/module/reiseimpfung/daten/steckbriefe.json'), 'utf8'),
      ) as { laender: Record<string, { wahrzeichen: Array<{ bild: string }> }> };
      for (const land of Object.values(steckbriefe.laender)) {
        for (const w of land.wahrzeichen) {
          if (!bildErlaubt(w)) rmSync(join(ziel, 'bilder/laender/wahrzeichen', w.bild), { force: true });
        }
      }

      // GitHub Pages kennt nur Dateien: /buehne, /handzettel … landen über 404.html in der App.
      copyFileSync(join(ziel, 'index.html'), join(ziel, '404.html'));
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  // Die Demo bekommt einen eigenen Ordner, damit sie die Praxisfassung in dist/ nicht überschreibt.
  build: { outDir: demo ? 'dist-demo' : 'dist' },
  plugins: [react(), demo ? demoFilter() : syncRelay(), ...(praxis ? [praxisTitel()] : [])],
  define: {
    // Nur die Bildordner, nach denen die App fragt (gibtEs in src/kern/pfad.ts): in der Demo alle
    // gesperrten, sonst die, die auf diesem Rechner fehlen (z. B. im öffentlichen Quelltext).
    __GESPERRT__: JSON.stringify(
      gesperrt.dateien.filter(
        (p) => p.startsWith('bilder/') && (demo || !existsSync(join(WURZEL, 'public', p))),
      ),
    ),
    __LIZENZ_ERLAUBT__: JSON.stringify(LIZENZ_ERLAUBT),
  },
  server: { port: 5173, strictPort: false },
});
