import './sprachwahl.css';
import { useEffect, useState, type RefObject } from 'react';
import { Sprachwahl } from './Sprachwahl';
import { findeSprache, sprachSpeicher } from './sprachen';
import { useUebersetzung } from './uebersetzer';

function liesSprache(raum: string): string {
  try {
    return findeSprache(localStorage.getItem(sprachSpeicher(raum))).code;
  } catch {
    return 'de';
  }
}

/**
 * Sprache eines Blatts zum Mitgeben (Handzettel, Übungsblätter): startet in der Sprache des
 * Patientenbildschirms dieses Raums und folgt ihr, bis auf dem Blatt selbst umgestellt wird.
 * Übersetzt den Bereich unter `blatt` und liefert die Texte, die noch fehlen.
 */
export function useBlattSprache(raum: string, blatt: RefObject<HTMLElement>) {
  const [sprache, setSprache] = useState(() => liesSprache(raum));
  const [eigeneWahl, setEigeneWahl] = useState(false);
  const fehlend = useUebersetzung(blatt, sprache);

  useEffect(() => {
    if (eigeneWahl) return;
    const beiAenderung = (e: StorageEvent) => {
      if (e.key === sprachSpeicher(raum)) setSprache(liesSprache(raum));
    };
    window.addEventListener('storage', beiAenderung);
    return () => window.removeEventListener('storage', beiAenderung);
  }, [raum, eigeneWahl]);

  const waehle = (code: string) => {
    setSprache(code);
    setEigeneWahl(true);
  };

  /** Datum im Blattkopf, in der Schreibweise der Blattsprache. */
  const heute = new Date().toLocaleDateString(sprache === 'de' ? 'de-DE' : sprache, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return { sprache, waehle, fehlend, heute };
}

/** Sprachwahl für die Leiste neben dem Blatt, mit Hinweis auf noch fehlende Übersetzungen. */
export function BlattSprachwahl({
  sprache,
  waehle,
  fehlend,
}: {
  sprache: string;
  waehle: (code: string) => void;
  fehlend: string[];
}) {
  const name = findeSprache(sprache).name;
  return (
    <>
      <Sprachwahl code={sprache} beschriftung="Sprache des Blatts" beiWahl={waehle} />
      {sprache !== 'de' && fehlend.length > 0 && (
        <p className="zettelleiste__sprachluecke">
          {fehlend.length === 1
            ? `Ein Text fehlt noch auf ${name} und steht auf Deutsch.`
            : `${fehlend.length} Texte fehlen noch auf ${name} und stehen auf Deutsch.`}
        </p>
      )}
    </>
  );
}
