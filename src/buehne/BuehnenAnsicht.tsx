import { useEffect, useState } from 'react';
import { Maximize } from 'lucide-react';
import { useSitzung, type Sitzung } from '../kern/sitzung';
import { BuehnenInhalt } from './BuehnenInhalt';

/**
 * Der Patientenbildschirm: zeigt nur an. Einzige Eingabe sind die Pfeiltasten, die an die
 * Steuerung weitergemeldet werden – so lässt sich auch mit nur einem Bildschirm blättern.
 */
export function BuehnenAnsicht({ sitzung }: { sitzung: Sitzung }) {
  const { zustand } = useSitzung(sitzung);
  const [vollbild, setVollbild] = useState(Boolean(document.fullscreenElement));
  const [mausAktiv, setMausAktiv] = useState(true);

  useEffect(() => {
    const beiWechsel = () => setVollbild(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', beiWechsel);
    return () => document.removeEventListener('fullscreenchange', beiWechsel);
  }, []);

  // Mauszeiger und Vollbild-Hinweis nach kurzer Ruhe ausblenden.
  useEffect(() => {
    let zeit = window.setTimeout(() => setMausAktiv(false), 3500);
    const beiBewegung = () => {
      setMausAktiv(true);
      window.clearTimeout(zeit);
      zeit = window.setTimeout(() => setMausAktiv(false), 2500);
    };
    window.addEventListener('pointermove', beiBewegung);
    return () => {
      window.removeEventListener('pointermove', beiBewegung);
      window.clearTimeout(zeit);
    };
  }, []);

  useEffect(() => {
    const beiTaste = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        sitzung.meldeTaste(e.key);
        return;
      }
      if (e.key.toLowerCase() !== 'f') return;
      if (document.fullscreenElement) void document.exitFullscreen();
      else void document.documentElement.requestFullscreen().catch(() => {});
    };
    window.addEventListener('keydown', beiTaste);
    return () => window.removeEventListener('keydown', beiTaste);
  }, [sitzung]);

  const insVollbild = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  return (
    <main
      className={`buehnenfenster${mausAktiv ? '' : ' buehnenfenster--ruhig'}`}
      onClick={insVollbild}
    >
      <BuehnenInhalt zustand={zustand} vorschau={false} />
      {!vollbild && (
        <button
          type="button"
          className="vollbild-hinweis"
          data-sichtbar={mausAktiv}
          tabIndex={mausAktiv ? 0 : -1}
        >
          <Maximize size={18} strokeWidth={1.75} aria-hidden="true" />
          Klicken für Vollbild
        </button>
      )}
    </main>
  );
}
