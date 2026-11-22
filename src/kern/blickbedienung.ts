// Ein 3D-Modell mit Maus oder Fingern bedienen: ein Zeiger dreht, zwei Finger zoomen
// (auseinander = näher), das Mausrad zoomt ebenfalls. Gemeinsam für die Modelle der Anatomie.

export interface Blick {
  drehY: number;
  neigX: number;
  zoom: number;
}

interface Einstellung {
  /** Der Blick, der beim Bedienen direkt verändert wird. */
  stand: Blick;
  /** false = gerade nicht bedienbar; dann geschieht nichts. */
  darf: () => boolean;
  neig: [number, number];
  zoom: [number, number];
  /** Nach jeder Änderung von `stand`. */
  beiAenderung: () => void;
  /** Kurzes Antippen oder Klicken ohne Ziehen. */
  beiTipp?: (e: PointerEvent) => void;
}

const grenze = (wert: number, [min, max]: [number, number]) => Math.min(Math.max(wert, min), max);

export function haengeBlickbedienungAn(element: HTMLElement, e: Einstellung) {
  const finger = new Map<number, { x: number; y: number }>();
  let start: { x: number; y: number } | null = null;
  let abstand = 0;
  /** Bleibt false, sobald in dieser Geste ein zweiter Finger dabei war. */
  let einzeln = true;

  const misst = () => {
    const [a, b] = [...finger.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const runter = (ereignis: PointerEvent) => {
    if (!e.darf()) return;
    finger.set(ereignis.pointerId, { x: ereignis.clientX, y: ereignis.clientY });
    try {
      element.setPointerCapture(ereignis.pointerId);
    } catch {
      // Zeiger schon wieder weg: Dann endet die Geste eben am Rand des Modells.
    }
    if (finger.size === 1) {
      start = { x: ereignis.clientX, y: ereignis.clientY };
      einzeln = true;
    } else {
      einzeln = false;
      abstand = misst();
    }
  };

  const bewegt = (ereignis: PointerEvent) => {
    const alt = finger.get(ereignis.pointerId);
    if (!alt) return;
    const neu = { x: ereignis.clientX, y: ereignis.clientY };
    finger.set(ereignis.pointerId, neu);
    if (finger.size === 1) {
      e.stand.drehY += (neu.x - alt.x) * 0.009;
      e.stand.neigX = grenze(e.stand.neigX + (neu.y - alt.y) * 0.007, e.neig);
    } else {
      const jetzt = misst();
      if (abstand > 0 && jetzt > 0) e.stand.zoom = grenze((e.stand.zoom * jetzt) / abstand, e.zoom);
      abstand = jetzt;
    }
    e.beiAenderung();
  };

  const hoch = (ereignis: PointerEvent) => {
    if (!finger.delete(ereignis.pointerId)) return;
    const getippt =
      ereignis.type === 'pointerup' &&
      einzeln &&
      start !== null &&
      Math.hypot(ereignis.clientX - start.x, ereignis.clientY - start.y) < 5;
    if (finger.size === 0) start = null;
    if (getippt) e.beiTipp?.(ereignis);
  };

  const rad = (ereignis: WheelEvent) => {
    if (!e.darf()) return;
    ereignis.preventDefault();
    e.stand.zoom = grenze(e.stand.zoom * Math.exp(-ereignis.deltaY * 0.0012), e.zoom);
    e.beiAenderung();
  };

  element.addEventListener('pointerdown', runter);
  element.addEventListener('pointermove', bewegt);
  element.addEventListener('pointerup', hoch);
  element.addEventListener('pointercancel', hoch);
  element.addEventListener('wheel', rad, { passive: false });

  return {
    /** true, solange ein Finger oder die Maustaste auf dem Modell liegt. */
    zieht: () => finger.size > 0,
    loese: () => {
      element.removeEventListener('pointerdown', runter);
      element.removeEventListener('pointermove', bewegt);
      element.removeEventListener('pointerup', hoch);
      element.removeEventListener('pointercancel', hoch);
      element.removeEventListener('wheel', rad);
    },
  };
}
