import { useSyncExternalStore } from 'react';
import type { SitzungsZustand } from './typen';
import { IST_DEMO } from './pfad';

export type Rolle = 'arzt' | 'buehne';
export type Verbindung = 'verbindet' | 'verbunden' | 'getrennt';

export interface Praesenz {
  arzt: number;
  buehne: number;
}

export interface Schnappschuss {
  zustand: SitzungsZustand;
  /** Zähler, der mit jeder Änderung steigt. Der höhere Stand gewinnt. */
  rev: number;
  praesenz: Praesenz;
  verbindung: Verbindung;
}

export interface Sitzung {
  rolle: Rolle;
  /** Behandlungszimmer, siehe kern/raum.ts. */
  raum: string;
  abonniere: (hoerer: () => void) => () => void;
  lies: () => Schnappschuss;
  /** Nur im Arztfenster wirksam. */
  aendere: (aenderung: (alt: SitzungsZustand) => SitzungsZustand) => void;
}

export const LEERE_SITZUNG: SitzungsZustand = {
  aktivesModul: null,
  module: {},
  verdeckt: false,
  gezeigt: [],
  zeiger: null,
  sprache: 'de',
};

/**
 * Hält den Sitzungszustand und gleicht ihn zwischen den Fenstern ab.
 * Arztfenster: ändert und sendet. Bühne: empfängt und zeigt.
 *
 * In der Praxis läuft der Abgleich über den Relay (server/relay.mjs), also auch zwischen
 * Geräten. Die öffentliche Demo hat keinen Server: dort sprechen die Fenster desselben
 * Browsers direkt miteinander (BroadcastChannel).
 */
export function starteSitzung(rolle: Rolle, raum: string): Sitzung {
  return IST_DEMO ? starteOhneServer(rolle, raum) : starteMitRelay(rolle, raum);
}

function starteMitRelay(rolle: Rolle, raum: string): Sitzung {
  let stand: Schnappschuss = {
    zustand: LEERE_SITZUNG,
    rev: 0,
    praesenz: { arzt: 0, buehne: 0 },
    verbindung: 'verbindet',
  };
  const hoerer = new Set<() => void>();
  let socket: WebSocket | null = null;
  let versuch = 0;

  const setze = (teil: Partial<Schnappschuss>) => {
    stand = { ...stand, ...teil };
    hoerer.forEach((h) => h());
  };

  const sendeZustand = () => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ t: 'zustand', rev: stand.rev, zustand: stand.zustand }));
    }
  };

  const verbinde = () => {
    const protokoll = location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(
      `${protokoll}://${location.host}/sync?raum=${encodeURIComponent(raum)}`,
    );
    socket = ws;

    ws.onopen = () => {
      versuch = 0;
      ws.send(JSON.stringify({ t: 'hallo', rolle }));
      setze({ verbindung: 'verbunden' });
      // Nach einem Server-Neustart kennt der Relay den Stand nicht mehr.
      if (rolle === 'arzt' && stand.rev > 0) sendeZustand();
    };

    ws.onmessage = (ereignis) => {
      let nachricht: { t?: string; rev?: number; zustand?: SitzungsZustand } & Partial<Praesenz>;
      try {
        nachricht = JSON.parse(String(ereignis.data));
      } catch {
        return;
      }
      if (nachricht.t === 'praesenz') {
        setze({ praesenz: { arzt: nachricht.arzt ?? 0, buehne: nachricht.buehne ?? 0 } });
      } else if (nachricht.t === 'zustand' && nachricht.zustand) {
        const rev = nachricht.rev ?? 0;
        // Die Bühne folgt immer. Ein Arztfenster übernimmt nur neuere Stände
        // (nach Neuladen oder wenn ein zweites Steuerfenster offen ist).
        if (rolle === 'buehne' || rev > stand.rev) {
          setze({ zustand: { ...LEERE_SITZUNG, ...nachricht.zustand }, rev });
        }
      }
    };

    ws.onclose = () => {
      if (socket !== ws) return;
      socket = null;
      setze({ verbindung: 'getrennt', praesenz: { arzt: 0, buehne: 0 } });
      const wartezeit = Math.min(4000, 400 * 2 ** versuch++);
      window.setTimeout(verbinde, wartezeit);
    };

    ws.onerror = () => ws.close();
  };

  verbinde();

  return {
    rolle,
    raum,
    abonniere: (h) => {
      hoerer.add(h);
      return () => hoerer.delete(h);
    },
    lies: () => stand,
    aendere: (aenderung) => {
      if (rolle !== 'arzt') return;
      const neu = aenderung(stand.zustand);
      if (neu === stand.zustand) return;
      setze({ zustand: neu, rev: stand.rev + 1 });
      sendeZustand();
    },
  };
}

interface Funkspruch {
  /** hallo = neues Fenster, da = Antwort darauf, weg = Fenster schließt, zustand = neuer Stand. */
  t: 'hallo' | 'da' | 'weg' | 'zustand';
  von: string;
  rolle: Rolle;
  rev?: number;
  zustand?: SitzungsZustand;
}

/**
 * Abgleich ohne Server: alle Fenster desselben Browsers im selben Raum hören auf einen
 * BroadcastChannel. Reicht für Steuerung und Patientenfenster auf einem Rechner (auch auf
 * zwei Monitoren), nicht für ein zweites Gerät.
 */
function starteOhneServer(rolle: Rolle, raum: string): Sitzung {
  const ich = `${rolle}-${Math.random().toString(36).slice(2, 10)}`;
  const andere = new Map<string, Rolle>();
  const zaehle = (): Praesenz => {
    const praesenz: Praesenz = { arzt: 0, buehne: 0 };
    praesenz[rolle] += 1;
    andere.forEach((r) => (praesenz[r] += 1));
    return praesenz;
  };

  let stand: Schnappschuss = {
    zustand: LEERE_SITZUNG,
    rev: 0,
    praesenz: zaehle(),
    verbindung: 'verbunden',
  };
  const hoerer = new Set<() => void>();
  const setze = (teil: Partial<Schnappschuss>) => {
    stand = { ...stand, ...teil };
    hoerer.forEach((h) => h());
  };

  const kanal = new BroadcastChannel(`aufklaerung.sync.${raum}`);
  const sende = (t: Funkspruch['t'], mitZustand = false) => {
    const spruch: Funkspruch = { t, von: ich, rolle };
    if (mitZustand) {
      spruch.rev = stand.rev;
      spruch.zustand = stand.zustand;
    }
    kanal.postMessage(spruch);
  };

  kanal.onmessage = (ereignis: MessageEvent<Funkspruch>) => {
    const spruch = ereignis.data;
    if (!spruch || spruch.von === ich) return;

    if (spruch.t === 'weg') {
      andere.delete(spruch.von);
      setze({ praesenz: zaehle() });
      return;
    }
    if (andere.get(spruch.von) !== spruch.rolle) {
      andere.set(spruch.von, spruch.rolle);
      setze({ praesenz: zaehle() });
    }
    // Ein neues Fenster erfährt, wer da ist und wie der Stand ist. So übersteht die Sitzung
    // auch ein Neuladen der Steuerung, solange das Patientenfenster offen bleibt.
    if (spruch.t === 'hallo') sende('da', stand.rev > 0);

    if (spruch.zustand) {
      const rev = spruch.rev ?? 0;
      // Die Bühne folgt der Steuerung immer; sonst gewinnt der neuere Stand.
      const vomArzt = rolle === 'buehne' && spruch.rolle === 'arzt' && spruch.t === 'zustand';
      if (rev > stand.rev || vomArzt) {
        setze({ zustand: { ...LEERE_SITZUNG, ...spruch.zustand }, rev });
      }
    }
  };

  window.addEventListener('pagehide', () => sende('weg'));
  sende('hallo');

  return {
    rolle,
    raum,
    abonniere: (h) => {
      hoerer.add(h);
      return () => hoerer.delete(h);
    },
    lies: () => stand,
    aendere: (aenderung) => {
      if (rolle !== 'arzt') return;
      const neu = aenderung(stand.zustand);
      if (neu === stand.zustand) return;
      setze({ zustand: neu, rev: stand.rev + 1 });
      sende('zustand', true);
    },
  };
}

export function useSitzung(sitzung: Sitzung): Schnappschuss {
  return useSyncExternalStore(sitzung.abonniere, sitzung.lies);
}
