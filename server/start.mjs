// Startet die fertig gebaute App (dist/) samt Sync-Relay.
//
//   node server/start.mjs            nur dieser Rechner (Standard)
//   node server/start.mjs --netz     auch für andere Geräte im Praxisnetz,
//                                    z. B. ein Tablet als Patientenbildschirm
//   node server/start.mjs --oeffnen  öffnet danach die Steuerung im Browser
//
// Mehrere Behandlungszimmer an einem Server: jeder Rechner öffnet einmal
//   http://<server>:4173/?raum=zimmer-2
// und merkt sich den Raum. Steuerung und Patientenbildschirm eines Raums
// sehen nur einander.
//
// Port über die Umgebungsvariable PORT (Standard 4173).

import { exec } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { networkInterfaces } from 'node:os';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { haengeRelayAn } from './relay.mjs';

const wurzel = resolve(fileURLToPath(new URL('../dist', import.meta.url)));
const imNetz = process.argv.includes('--netz');
const host = imNetz ? '0.0.0.0' : '127.0.0.1';
const port = Number(process.env.PORT) || 4173;

const typen = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.glb': 'model/gltf-binary',
  '.ico': 'image/x-icon',
};

async function findeDatei(urlPfad) {
  const sauber = normalize(decodeURIComponent(urlPfad)).replace(/^([/\\])+/, '');
  const ziel = resolve(join(wurzel, sauber));
  if (ziel !== wurzel && !ziel.startsWith(wurzel + sep)) return null;
  try {
    if ((await stat(ziel)).isFile()) return ziel;
  } catch {
    // nicht vorhanden
  }
  return null;
}

const server = createServer(async (anfrage, antwort) => {
  try {
    const pfad = new URL(anfrage.url ?? '/', 'http://localhost').pathname;
    // Unbekannte Pfade ohne Dateiendung (z. B. /buehne) bekommen die App selbst.
    const datei =
      (await findeDatei(pfad)) ?? (extname(pfad) ? null : join(wurzel, 'index.html'));
    if (!datei) {
      antwort.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      antwort.end('Nicht gefunden');
      return;
    }
    const inhalt = await readFile(datei);
    const istAsset = pfad.startsWith('/assets/');
    antwort.writeHead(200, {
      'Content-Type': typen[extname(datei).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': istAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    antwort.end(inhalt);
  } catch (fehler) {
    antwort.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    antwort.end('Serverfehler');
    console.error(fehler);
  }
});

haengeRelayAn(server);

server.on('error', (fehler) => {
  if (fehler.code === 'EADDRINUSE') {
    console.error(
      `Port ${port} ist schon belegt – läuft die Aufklärung bereits? ` +
        `Sonst mit anderem Port starten, z. B.  set PORT=4180  und dann erneut.`,
    );
  } else if (fehler.code === 'ENOENT') {
    console.error('Der Ordner dist/ fehlt. Bitte zuerst  npm run build  ausführen.');
  } else {
    console.error(fehler);
  }
  process.exit(1);
});

server.listen(port, host, () => {
  console.log('\n  Aufklärung läuft.\n');
  console.log(`  Arzt (Steuerung):   http://localhost:${port}/`);
  console.log(`  Patient (Bühne):    http://localhost:${port}/buehne`);
  if (imNetz) {
    const adressen = Object.values(networkInterfaces())
      .flat()
      .filter((a) => a && a.family === 'IPv4' && !a.internal)
      .map((a) => a.address);
    for (const adresse of adressen) {
      console.log(`  Im Praxisnetz:      http://${adresse}:${port}/?raum=zimmer-1`);
    }
    console.log('                      (je Zimmer einen eigenen Raumnamen, einmal pro Rechner)');
  }
  console.log('\n  Beenden mit Strg+C oder dieses Fenster schließen.\n');

  if (process.argv.includes('--oeffnen')) {
    const adresse = `http://localhost:${port}/`;
    const befehl =
      process.platform === 'win32'
        ? `start "" "${adresse}"`
        : process.platform === 'darwin'
          ? `open "${adresse}"`
          : `xdg-open "${adresse}"`;
    exec(befehl, () => {});
  }
});
