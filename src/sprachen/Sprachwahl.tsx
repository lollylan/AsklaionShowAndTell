import './sprachwahl.css';
import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Flagge } from './Flagge';
import { SPRACHEN, findeSprache } from './sprachen';

interface Props {
  code: string;
  beiWahl: (code: string) => void;
  /** Überschrift vor dem Knopf, z. B. „Sprache für den Patienten“. */
  beschriftung: string;
}

/** Knopf mit Flagge und Sprachname; öffnet eine Liste aller Sprachen. */
export function Sprachwahl({ code, beiWahl, beschriftung }: Props) {
  const [offen, setOffen] = useState(false);
  const rahmen = useRef<HTMLDivElement>(null);
  const knopf = useRef<HTMLButtonElement>(null);
  const listenId = useId();
  const aktuell = findeSprache(code);

  useEffect(() => {
    if (!offen) return;
    const beiKlick = (e: PointerEvent) => {
      if (!rahmen.current?.contains(e.target as Node)) setOffen(false);
    };
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOffen(false);
        knopf.current?.focus();
      }
    };
    document.addEventListener('pointerdown', beiKlick);
    document.addEventListener('keydown', beiTaste);
    // Fokus auf die gewählte Sprache, damit die Pfeiltasten von dort aus loslaufen.
    rahmen.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
    return () => {
      document.removeEventListener('pointerdown', beiKlick);
      document.removeEventListener('keydown', beiTaste);
    };
  }, [offen]);

  const waehle = (neu: string) => {
    beiWahl(neu);
    setOffen(false);
    knopf.current?.focus();
  };

  const pfeile = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const knoepfe = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('button')];
    const i = knoepfe.indexOf(document.activeElement as HTMLButtonElement);
    const schritt = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (schritt === undefined || i < 0) return;
    e.preventDefault();
    knoepfe[(i + schritt + knoepfe.length) % knoepfe.length].focus();
  };

  return (
    <div className="sprachwahl" ref={rahmen}>
      <span className="sprachwahl__beschriftung" id={`${listenId}-titel`}>
        {beschriftung}
      </span>
      <button
        ref={knopf}
        type="button"
        className="sprachwahl__knopf"
        aria-haspopup="true"
        aria-expanded={offen}
        aria-controls={listenId}
        aria-describedby={`${listenId}-titel`}
        data-fremd={aktuell.code !== 'de'}
        onClick={() => setOffen((o) => !o)}
      >
        <Flagge id={aktuell.flagge} breite={22} />
        <span className="sprachwahl__name">{aktuell.name}</span>
        {aktuell.code !== 'de' && (
          <span className="sprachwahl__eigen" lang={aktuell.code} dir={aktuell.richtung}>
            {aktuell.eigen}
          </span>
        )}
        <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" className="sprachwahl__pfeil" />
      </button>
      {offen && (
        <div
          className="sprachwahl__liste"
          id={listenId}
          role="radiogroup"
          aria-labelledby={`${listenId}-titel`}
          onKeyDown={pfeile}
        >
          {SPRACHEN.map((s) => (
            <button
              key={s.code}
              type="button"
              role="radio"
              aria-checked={s.code === aktuell.code}
              tabIndex={s.code === aktuell.code ? 0 : -1}
              className="sprachwahl__eintrag"
              onClick={() => waehle(s.code)}
            >
              <Flagge id={s.flagge} breite={24} />
              <span className="sprachwahl__texte">
                <span className="sprachwahl__eintrag-eigen" lang={s.code} dir={s.richtung}>
                  {s.eigen}
                </span>
                {s.code !== 'de' && <span className="sprachwahl__eintrag-name">{s.name}</span>}
              </span>
              {s.code === aktuell.code && (
                <Check size={16} strokeWidth={2} aria-hidden="true" className="sprachwahl__haken" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
