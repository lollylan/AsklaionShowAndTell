import '../arzt/arzt.css';
import './tablet.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LEERE_SITZUNG } from '../kern/sitzung';
import { MARKE } from '../kern/marke';
import { handzettelSpeicher } from '../arzt/Verlauf';
import { sprachSpeicher } from '../sprachen/sprachen';
import { stammVon } from '../kern/verzeichnis';
import { themaVon, type Thema } from './ablauf';
import { Auswahl } from './Auswahl';
import { Praesentation } from './Praesentation';

const ABLAUF_SPEICHER = 'aufklaerung.tablet.ablauf';

function liesAblauf(): string[] {
  try {
    const roh: unknown = JSON.parse(sessionStorage.getItem(ABLAUF_SPEICHER) ?? '[]');
    return Array.isArray(roh)
      ? roh.filter((s): s is string => typeof s === 'string' && Boolean(themaVon(s)))
      : [];
  } catch {
    return [];
  }
}

/**
 * Tablet-Modus: ein Bildschirm für alles. Erst Themen wählen (eins sofort zeigen oder mehrere
 * in einen Ablauf legen), dann zeigen und mit Wischen, Pfeiltasten oder Knöpfen blättern.
 * Es gibt kein zweites Fenster und keinen Abgleich; der Zustand lebt nur in diesem Fenster.
 */
export function TabletAnsicht({ raum }: { raum: string }) {
  const [ablauf, setAblauf] = useState(liesAblauf);
  const [sprache, setSprache] = useState(LEERE_SITZUNG.sprache ?? 'de');
  /** Was gezeigt wurde, für den Handzettel – wie `gezeigt` im Sitzungszustand. */
  const [gezeigt, setGezeigt] = useState<string[]>([]);
  /**
   * Eingaben vor dem Zeigen (z. B. Messwerte), je Thema der Zustand seines Moduls. Bewusst nur
   * im Arbeitsspeicher: Mit „Neue Sitzung“ oder dem Schließen des Fensters sind sie weg.
   */
  const [vorgaben, setVorgaben] = useState<Record<string, object>>({});
  /** Die Themen, die gerade gezeigt werden – oder null für die Auswahl. */
  const [lauf, setLauf] = useState<Thema[] | null>(null);

  useEffect(() => {
    document.title = `${MARKE.app} – ${lauf ? lauf.map((t) => t.eintrag.titel).join(', ') : 'Tablet'}`;
  }, [lauf]);

  // Die Seite /handzettel liest Liste und Sprache aus dem lokalen Speicher, wie im PC-Modus.
  useEffect(() => {
    try {
      sessionStorage.setItem(ABLAUF_SPEICHER, JSON.stringify(ablauf));
      localStorage.setItem(handzettelSpeicher(raum), JSON.stringify(gezeigt));
      localStorage.setItem(sprachSpeicher(raum), sprache);
    } catch {
      // Ohne Speicher gibt es keinen Handzettel; zeigen lässt sich trotzdem alles.
    }
  }, [ablauf, gezeigt, sprache, raum]);

  const starte = useCallback(
    (schluessel: string[], mit: Record<string, object> = {}) => {
      const themen = schluessel
        .map((s) => themaVon(s, mit[s] ?? vorgaben[s]))
        .filter((t): t is Thema => t !== null);
      if (themen.length > 0) setLauf(themen);
    },
    [vorgaben],
  );

  const merkeGezeigt = useCallback((schluessel: string) => {
    setGezeigt((alt) => {
      if (alt.includes(schluessel)) return alt;
      const stelle = alt.findIndex((g) => stammVon(g) === stammVon(schluessel));
      return stelle >= 0 ? alt.map((g, i) => (i === stelle ? schluessel : g)) : [...alt, schluessel];
    });
  }, []);

  const themenImAblauf = useMemo(
    () => ablauf.map((s) => themaVon(s, vorgaben[s])).filter((t): t is Thema => t !== null),
    [ablauf, vorgaben],
  );

  if (lauf) {
    return (
      <Praesentation
        themen={lauf}
        sprache={sprache}
        beiGezeigt={merkeGezeigt}
        beiEnde={() => setLauf(null)}
      />
    );
  }

  return (
    <Auswahl
      raum={raum}
      ablauf={themenImAblauf}
      setAblauf={setAblauf}
      sprache={sprache}
      setSprache={setSprache}
      gezeigt={gezeigt}
      vorgaben={vorgaben}
      setVorgabe={(schluessel, zustand) => setVorgaben((alt) => ({ ...alt, [schluessel]: zustand }))}
      beiStart={starte}
      beiNeu={() => {
        setAblauf([]);
        setGezeigt([]);
        setVorgaben({});
        setSprache('de');
      }}
    />
  );
}
