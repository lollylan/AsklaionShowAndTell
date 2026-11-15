import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { sucheUeberall } from '../kern/verzeichnis';

/**
 * Suchfeld über alle Module: findet Krankheiten, Medikamente, Modelle, Messwerte … und
 * schlägt den Treffer auf. Taste „/“ oder Strg+K springt ins Feld.
 */
export function Suche({ beiWahl }: { beiWahl: (schluessel: string) => void }) {
  const id = useId();
  const feld = useRef<HTMLInputElement>(null);
  const [frage, setFrage] = useState('');
  const [offen, setOffen] = useState(false);
  const [stelle, setStelle] = useState(0);
  const treffer = useMemo(() => sucheUeberall(frage), [frage]);
  const zeigeListe = offen && frage.trim() !== '';

  useEffect(() => {
    const beiTaste = (e: KeyboardEvent) => {
      const ziel = e.target as HTMLElement | null;
      const tippt = ziel?.closest('input, textarea, select, [contenteditable="true"]');
      const kurzwahl =
        (e.key === '/' && !tippt && !e.ctrlKey && !e.metaKey && !e.altKey) ||
        (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey));
      if (!kurzwahl) return;
      e.preventDefault();
      feld.current?.focus();
      feld.current?.select();
    };
    window.addEventListener('keydown', beiTaste);
    return () => window.removeEventListener('keydown', beiTaste);
  }, []);

  const waehle = (schluessel: string) => {
    beiWahl(schluessel);
    setFrage('');
    setOffen(false);
    feld.current?.blur();
  };

  return (
    <div className="suche">
      <label className="suche__feld">
        <Search size={18} strokeWidth={1.75} aria-hidden="true" />
        <span className="nur-vorlesen">In allen Modulen suchen</span>
        <input
          ref={feld}
          type="search"
          role="combobox"
          aria-expanded={zeigeListe}
          aria-controls={`${id}-liste`}
          aria-activedescendant={
            zeigeListe && treffer[stelle] ? `${id}-${stelle}` : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          value={frage}
          placeholder="Alles durchsuchen: Krankheit, Medikament, Organ, Wert …"
          onChange={(e) => {
            setFrage(e.target.value);
            setStelle(0);
            setOffen(true);
          }}
          onFocus={() => setOffen(true)}
          onBlur={() => setOffen(false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setStelle((s) => Math.min(s + 1, treffer.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setStelle((s) => Math.max(s - 1, 0));
            } else if (e.key === 'Enter' && zeigeListe && treffer[stelle]) {
              e.preventDefault();
              waehle(treffer[stelle].schluessel);
            } else if (e.key === 'Escape') {
              setFrage('');
              setOffen(false);
              feld.current?.blur();
            }
          }}
        />
        <kbd aria-hidden="true">/</kbd>
      </label>

      {zeigeListe && (
        <ul id={`${id}-liste`} className="suche__liste" role="listbox" aria-label="Treffer">
          {treffer.length === 0 && (
            <li className="suche__leer" role="presentation">
              Nichts gefunden zu „{frage.trim()}“. Die Suche kennt auch Fachbegriffe und
              Handelsnamen.
            </li>
          )}
          {treffer.map((t, i) => (
            <li
              key={t.schluessel}
              id={`${id}-${i}`}
              role="option"
              aria-selected={i === stelle}
              className="suche__treffer"
              // mousedown statt click: sonst schließt onBlur die Liste vor dem Klick.
              onMouseDown={(e) => {
                e.preventDefault();
                waehle(t.schluessel);
              }}
              onMouseEnter={() => setStelle(i)}
            >
              <t.modul.symbol size={18} strokeWidth={1.75} aria-hidden="true" />
              <span className="suche__titel">
                <strong>{t.eintrag.titel}</strong>
                {t.eintrag.zusatz && <span>{t.eintrag.zusatz}</span>}
              </span>
              <span className="suche__art">{t.modul.verzeichnis?.art}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
