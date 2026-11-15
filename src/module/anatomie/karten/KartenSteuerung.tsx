import './karten.css';
import { useCallback } from 'react';
import { MonitorPlay, Palette, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { AnatomieZustand } from '../index';
import type { Karte, Seite } from './koerper';
import { Koerperkarte, wahlfarbe } from './Koerperkarte';
import { HALTUNGEN, HAUT_ZOOM_MAX, HAUT_ZOOM_MIN, Haut3D } from './Haut3D';
import { QUELLE_KARTEN } from './index';

const SEITEN: { id: Seite; name: string }[] = [
  { id: 'beide', name: 'Beide Seiten' },
  { id: 'rechts', name: 'Rechts' },
  { id: 'links', name: 'Links' },
];

/** Blickrichtungen auf den 3D-Körper. „Von rechts“ zeigt die rechte Körperseite. */
const BLICKE_RAUM = [
  { name: 'Von vorn', drehY: 0, neigX: 0.04 },
  { name: 'Von hinten', drehY: Math.PI, neigX: 0.04 },
  { name: 'Von rechts', drehY: Math.PI / 2, neigX: 0.04 },
  { name: 'Von links', drehY: -Math.PI / 2, neigX: 0.04 },
];

const START_RAUM = { drehY: 0, neigX: 0.04, zoom: 1 };

interface Props {
  karte: Karte;
  zustand: AnatomieZustand;
  aendern: (aenderung: Partial<AnatomieZustand> | ((alt: AnatomieZustand) => AnatomieZustand)) => void;
}

export function KartenSteuerung({ karte, zustand, aendern }: Props) {
  const gewaehlt = zustand.gebiete ?? [];
  const seite = zustand.seite ?? 'beide';
  const alle = zustand.alle ?? true;
  const raum = zustand.darstellung === 'raum';
  const haltung = zustand.haltung ?? 'grund';

  const schalte = useCallback(
    (id: string) =>
      aendern((alt) => {
        const bisher = alt.gebiete ?? [];
        return {
          ...alt,
          gebiete: bisher.includes(id) ? bisher.filter((g) => g !== id) : [...bisher, id],
        };
      }),
    [aendern],
  );
  const setzeBlick = useCallback(
    (lage: { drehY: number; neigX: number; zoom: number }) => aendern(lage),
    [aendern],
  );
  const zoome = (faktor: number) =>
    aendern((alt) => ({
      ...alt,
      zoom: Math.min(Math.max(alt.zoom * faktor, HAUT_ZOOM_MIN), HAUT_ZOOM_MAX),
    }));

  const letztes = karte.gebiete.find((g) => g.id === gewaehlt[gewaehlt.length - 1]);

  return (
    <div className="gel__pult">
      <section className="gel__blick" aria-labelledby="haut-bild">
        <h2 id="haut-bild">Am Körper zeigen</h2>
        <div className="gel__blicke hautsteuerung__darstellung" role="group" aria-label="Darstellung">
          <button
            type="button"
            className="knopf"
            aria-pressed={!raum}
            onClick={() => aendern({ darstellung: 'flach' })}
          >
            Flach, vorn und hinten
          </button>
          <button
            type="button"
            className="knopf"
            aria-pressed={raum}
            onClick={() => !raum && aendern({ darstellung: 'raum', ...START_RAUM })}
          >
            3D-Körper
          </button>
        </div>

        {raum ? (
          <div className="gel__flaeche hautsteuerung__raum">
            <Haut3D
              karte={karte}
              gewaehlt={gewaehlt}
              seite={seite}
              alle={alle}
              haltung={haltung}
              drehY={zustand.drehY}
              neigX={zustand.neigX}
              zoom={zustand.zoom}
              vorschau
              beiBlick={setzeBlick}
              beiKlick={schalte}
            />
          </div>
        ) : (
          <div className="gel__flaeche hautsteuerung__flaeche">
            <Koerperkarte karte={karte} gewaehlt={gewaehlt} seite={seite} alle={alle} beiKlick={schalte} klein />
          </div>
        )}

        {raum && (
          <>
            <div className="gel__blicke hautsteuerung__haltung" role="group" aria-label="Haltung">
              {HALTUNGEN.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  className="knopf"
                  aria-pressed={haltung === h.id}
                  onClick={() => aendern({ haltung: h.id })}
                >
                  {h.name}
                </button>
              ))}
            </div>
            <div className="gel__blicke hautsteuerung__richtung">
              {BLICKE_RAUM.map((b) => (
                <button
                  key={b.name}
                  type="button"
                  className="knopf"
                  onClick={() => aendern({ drehY: b.drehY, neigX: b.neigX })}
                >
                  {b.name}
                </button>
              ))}
            </div>
            <div className="gel__zoom">
              <button
                type="button"
                className="knopf"
                aria-label="Weiter weg"
                disabled={zustand.zoom <= HAUT_ZOOM_MIN}
                onClick={() => zoome(1 / 1.25)}
              >
                <ZoomOut size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="knopf"
                aria-label="Näher heran"
                disabled={zustand.zoom >= HAUT_ZOOM_MAX}
                onClick={() => zoome(1.25)}
              >
                <ZoomIn size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button type="button" className="knopf" onClick={() => aendern(START_RAUM)}>
                <RotateCcw size={18} strokeWidth={1.75} aria-hidden="true" />
                Ganzer Körper
              </button>
            </div>
          </>
        )}

        <div className="gel__blicke" role="group" aria-label="Körperseite">
          {SEITEN.map((s) => (
            <button
              key={s.id}
              type="button"
              className="knopf"
              aria-pressed={seite === s.id}
              onClick={() => aendern({ seite: s.id })}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="gel__zoom">
          <button type="button" className="knopf" aria-pressed={alle} onClick={() => aendern({ alle: !alle })}>
            <Palette size={18} strokeWidth={1.75} aria-hidden="true" />
            Alle Gebiete farbig
          </button>
          <button
            type="button"
            className="knopf"
            disabled={gewaehlt.length === 0}
            onClick={() => aendern({ gebiete: [] })}
          >
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
            Auswahl löschen
          </button>
        </div>
        <p className="gel__hilfe">
          {raum
            ? 'Im Bild ziehen dreht den Körper, das Mausrad zoomt – dabei rückt die Auswahl in die Mitte. Ein Klick ohne Ziehen wählt ein Gebiet aus oder ab.'
            : 'Ins Bild klicken wählt ein Gebiet aus oder wieder ab.'}{' '}
          Mehrere sind möglich, jedes bekommt eine eigene Farbe. „Rechts“ oder „Links“ zeigt die Auswahl
          nur auf dieser Körperseite.
        </p>
      </section>

      <section className="gel__liste" aria-labelledby="haut-gebiete">
        <h2 id="haut-gebiete">{karte.name}</h2>

        {letztes && (
          <div className="gel__laeuft">
            <p role="status">
              <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>
                Der Patient sieht <strong>{gewaehlt.length > 1 ? `${gewaehlt.length} Gebiete` : letztes.name}</strong>.
              </span>
              <button type="button" className="knopf" onClick={() => aendern({ gebiete: [] })}>
                Schließen
              </button>
            </p>
            <dl>
              <dt>{letztes.name} – wo spürt man das?</dt>
              <dd>{letztes.wo}</dd>
              <dt>Typisch</dt>
              <dd>{letztes.typisch}</dd>
            </dl>
          </div>
        )}

        {karte.gruppen.map((gruppe) => {
          const gebiete = karte.gebiete.filter((g) => g.gruppe === gruppe.id);
          return (
            <div key={gruppe.id} className="gel__gruppe hautsteuerung__gruppe">
              <div className="gel__gruppenkopf">
                <h3>{gruppe.name}</h3>
              </div>
              <ul>
                {gebiete.map((g) => {
                  const farbe = wahlfarbe(gewaehlt, g.id);
                  return (
                    <li key={g.id}>
                      <button
                        type="button"
                        className="gel__struktur"
                        aria-pressed={Boolean(farbe)}
                        onClick={() => schalte(g.id)}
                      >
                        <strong>
                          {farbe && <span className="hautsteuerung__punkt" style={{ background: farbe }} />}
                          {g.name}
                        </strong>
                        <span>{g.fach}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <p className="gel__hilfe">{QUELLE_KARTEN}</p>
      </section>
    </div>
  );
}
