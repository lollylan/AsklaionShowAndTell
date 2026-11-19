// Sync-Relay: verbindet Arztfenster und Bühne über WebSocket.
//
// Mehrere Behandlungszimmer können denselben Server nutzen. Jedes Zimmer ist ein
// eigener „Raum“ (z. B. /sync?raum=zimmer-2): Zustand, Revision und Präsenz
// gelten nur innerhalb dieses Raums. Ohne Angabe landet alles im Raum „standard“.
//
// Das Arztfenster ist die einzige Quelle der Wahrheit. Es schickt bei jeder
// Änderung den kompletten Sitzungszustand; der Relay merkt sich den letzten
// Stand des Raums und reicht ihn an alle anderen Fenster im Raum weiter. Ein
// Fenster, das neu dazukommt oder neu lädt, bekommt sofort den aktuellen Stand.
//
// Es fließen nur Anzeigebefehle (welches Modul, welche Auswahl), keine
// Patientendaten.

import { WebSocketServer } from 'ws';

export const SYNC_PFAD = '/sync';
export const STANDARD_RAUM = 'standard';

/** Leere Räume so lange behalten, damit ein Neuladen oder kurzer Netzaussetzer nichts verliert. */
const RAUM_HALTEZEIT_MS = 30 * 60 * 1000;

/** Macht aus beliebiger Eingabe einen sauberen Raumnamen (gleiche Regel wie im Browser). */
export function normalisiereRaum(roh) {
  const sauber = String(roh ?? '')
    .trim()
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32)
    .replace(/-+$/g, '');
  return sauber || STANDARD_RAUM;
}

/**
 * @typedef {object} Raum
 * @property {Map<import('ws').WebSocket, 'arzt' | 'buehne' | null>} rollen
 * @property {string | null} letzterZustand  letzter Zustand als fertige JSON-Nachricht
 * @property {number} letzteRev
 * @property {ReturnType<typeof setTimeout> | null} aufraeumen
 */

/** @param {import('node:http').Server} httpServer */
export function haengeRelayAn(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  /** @type {Map<string, Raum>} */
  const raeume = new Map();

  /** @param {string} name */
  const holeRaum = (name) => {
    let raum = raeume.get(name);
    if (!raum) {
      raum = { rollen: new Map(), letzterZustand: null, letzteRev: 0, aufraeumen: null };
      raeume.set(name, raum);
    }
    if (raum.aufraeumen) {
      clearTimeout(raum.aufraeumen);
      raum.aufraeumen = null;
    }
    return raum;
  };

  /** @param {Raum} raum */
  const sendePraesenz = (raum) => {
    let arzt = 0;
    let buehne = 0;
    for (const rolle of raum.rollen.values()) {
      if (rolle === 'arzt') arzt++;
      if (rolle === 'buehne') buehne++;
    }
    const nachricht = JSON.stringify({ t: 'praesenz', arzt, buehne });
    for (const socket of raum.rollen.keys()) {
      if (socket.readyState === socket.OPEN) socket.send(nachricht);
    }
  };

  httpServer.on('upgrade', (anfrage, socket, kopf) => {
    // Nur unseren Pfad annehmen – alles andere (z. B. Vite-HMR) bleibt unberührt.
    const url = new URL(anfrage.url ?? '/', 'http://localhost');
    if (url.pathname !== SYNC_PFAD) return;
    const raumName = normalisiereRaum(url.searchParams.get('raum'));
    wss.handleUpgrade(anfrage, socket, kopf, (ws) => wss.emit('connection', ws, raumName));
  });

  wss.on('connection', (ws, /** @type {string} */ raumName) => {
    const raum = holeRaum(raumName);
    raum.rollen.set(ws, null);

    ws.on('message', (roh) => {
      let nachricht;
      try {
        nachricht = JSON.parse(roh.toString());
      } catch {
        return;
      }

      if (nachricht.t === 'hallo') {
        raum.rollen.set(ws, nachricht.rolle === 'arzt' ? 'arzt' : 'buehne');
        if (raum.letzterZustand) ws.send(raum.letzterZustand);
        sendePraesenz(raum);
        return;
      }

      // Pfeiltaste aus dem Patientenfenster: nur an die Steuerung weiterreichen. Ob und wie
      // geblättert wird, entscheidet weiterhin das Arztfenster.
      if (nachricht.t === 'taste' && raum.rollen.get(ws) === 'buehne') {
        if (nachricht.taste !== 'ArrowLeft' && nachricht.taste !== 'ArrowRight') return;
        const weiter = JSON.stringify({ t: 'taste', taste: nachricht.taste });
        for (const [anderer, rolle] of raum.rollen) {
          if (rolle === 'arzt' && anderer.readyState === anderer.OPEN) anderer.send(weiter);
        }
        return;
      }

      if (nachricht.t === 'zustand' && raum.rollen.get(ws) === 'arzt') {
        // Ältere Stände verwerfen (z. B. zweites Steuerfenster, das hinterherhinkt).
        const rev = Number(nachricht.rev) || 0;
        if (rev <= raum.letzteRev) return;
        raum.letzteRev = rev;
        raum.letzterZustand = JSON.stringify(nachricht);
        for (const anderer of raum.rollen.keys()) {
          if (anderer !== ws && anderer.readyState === anderer.OPEN) {
            anderer.send(raum.letzterZustand);
          }
        }
      }
    });

    const abmelden = () => {
      if (!raum.rollen.delete(ws)) return;
      sendePraesenz(raum);
      if (raum.rollen.size === 0 && !raum.aufraeumen) {
        raum.aufraeumen = setTimeout(() => {
          if (raum.rollen.size === 0 && raeume.get(raumName) === raum) raeume.delete(raumName);
        }, RAUM_HALTEZEIT_MS);
        raum.aufraeumen.unref?.();
      }
    };
    ws.on('close', abmelden);
    ws.on('error', abmelden);
  });

  return wss;
}
