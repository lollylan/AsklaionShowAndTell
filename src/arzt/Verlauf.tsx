import { Printer, X } from 'lucide-react';
import { findeFundstelle } from '../kern/verzeichnis';
import { seite } from '../kern/pfad';

/** Schlüssel, unter dem das Arztfenster die Liste für die Handzettel-Seite ablegt. */
export const handzettelSpeicher = (raum: string) => `aufklaerung.handzettel.${raum}`;

interface Props {
  gezeigt: string[];
  raum: string;
  beiSprung: (schluessel: string) => void;
  beiEntfernen: (schluessel: string) => void;
}

/** Was in dieser Sitzung gezeigt wurde – und der Weg zum Handzettel. */
export function Verlauf({ gezeigt, raum, beiSprung, beiEntfernen }: Props) {
  const druckbar = gezeigt.filter((s) => findeFundstelle(s)?.modul.verzeichnis?.Handzettel);

  const oeffne = () => {
    // Die Handzettel-Seite liest die Liste aus dem lokalen Speicher desselben Browsers.
    window.open(`${seite('/handzettel')}?raum=${encodeURIComponent(raum)}`, 'aufklaerung-handzettel');
  };

  return (
    <section className="verlauf" aria-labelledby="verlauf-titel">
      <h2 id="verlauf-titel">In dieser Sitzung gezeigt</h2>

      {gezeigt.length === 0 ? (
        <p className="verlauf__leer">
          Was Sie dem Patienten zeigen, sammelt sich hier – als Grundlage für den Handzettel zum
          Mitgeben.
        </p>
      ) : (
        <ul className="verlauf__liste">
          {gezeigt.map((schluessel) => {
            const fund = findeFundstelle(schluessel);
            if (!fund) return null;
            return (
              <li key={schluessel}>
                <button
                  type="button"
                  className="verlauf__eintrag"
                  onClick={() => beiSprung(schluessel)}
                >
                  <fund.modul.symbol size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>{fund.eintrag.titel}</span>
                </button>
                <button
                  type="button"
                  className="verlauf__weg"
                  aria-label={`${fund.eintrag.titel} aus der Liste nehmen`}
                  onClick={() => beiEntfernen(schluessel)}
                >
                  <X size={16} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button type="button" className="knopf" disabled={druckbar.length === 0} onClick={oeffne}>
        <Printer size={18} strokeWidth={1.75} aria-hidden="true" />
        Handzettel öffnen
      </button>
    </section>
  );
}
