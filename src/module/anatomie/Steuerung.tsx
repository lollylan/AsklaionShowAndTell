import './steuerung.css';
import './buehne.css';
import { useCallback } from 'react';
import { Eye, EyeOff, MonitorPlay, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import type { SteuerungProps } from '../../kern/typen';
import type { AnatomieZustand } from './index';
import {
  BEREICHE,
  BLICKE,
  FRAGE_STANDARD,
  QUELLE,
  QUELLE_HRA,
  REGIONEN,
  findeRegion,
  findeStruktur,
  type BlickId,
  type Region,
  type Struktur,
} from './daten';
import Modell, { ZOOM_MAX, ZOOM_MIN, type BlickLage } from './Modell';
import { KARTEN, findeKarte, type Karte } from './karten';
import { KartenSteuerung } from './karten/KartenSteuerung';

export function Steuerung({ zustand, aendern }: SteuerungProps<AnatomieZustand>) {
  const karte = findeKarte(zustand.karte);
  const region = karte ? undefined : findeRegion(zustand.region);
  const offen = findeStruktur(region, zustand.struktur);

  const waehleRegion = (g: Region) => {
    if (zustand.region === g.id && !karte) {
      aendern({ region: null, struktur: null, aus: [] });
      return;
    }
    const blick = BLICKE[g.startBlick];
    aendern({
      karte: null,
      region: g.id,
      struktur: null,
      aus: g.zuBeginnAus ?? [],
      drehY: blick.drehY,
      neigX: blick.neigX,
      zoom: g.startZoom ?? 1,
    });
  };

  const waehleStruktur = (s: Struktur) => {
    if (zustand.struktur === s.id) {
      aendern({ struktur: null });
      return;
    }
    // Beim Zeigen gleich in die Richtung drehen, aus der man die Struktur am besten sieht.
    const blick = BLICKE[s.blick];
    aendern((alt) => ({
      ...alt,
      struktur: s.id,
      aus: alt.aus.filter((id) => id !== s.id),
      drehY: blick.drehY,
      neigX: blick.neigX,
    }));
  };

  const schalte = (ids: string[], zeigen: boolean) =>
    aendern((alt) => ({
      ...alt,
      aus: zeigen
        ? alt.aus.filter((id) => !ids.includes(id))
        : [...new Set([...alt.aus, ...ids])],
      struktur: !zeigen && alt.struktur && ids.includes(alt.struktur) ? null : alt.struktur,
    }));

  const waehleKarte = (k: Karte) => {
    if (karte?.id === k.id) {
      aendern({ karte: null });
      return;
    }
    aendern({ karte: k.id, region: null, struktur: null, gebiete: [], seite: 'beide', alle: true });
  };

  const setzeBlick = useCallback((lage: BlickLage) => aendern(lage), [aendern]);
  const zoome = (faktor: number) =>
    aendern((alt) => ({
      ...alt,
      zoom: Math.min(Math.max(alt.zoom * faktor, ZOOM_MIN), ZOOM_MAX),
    }));

  return (
    <div className="gel">
      <section aria-labelledby="gel-wahl">
        <h2 id="gel-wahl">Region wählen</h2>
        {BEREICHE.map((bereich) => (
          <div key={bereich.id} className="gel__bereich">
            <h3>{bereich.name}</h3>
            <ul className="gel__regionen">
              {REGIONEN.filter((g) => (g.bereich ?? 'bewegung') === bereich.id).map((g) => (
                <li key={g.id}>
                  <button
                    type="button"
                    className="knopf"
                    aria-pressed={!karte && zustand.region === g.id}
                    onClick={() => waehleRegion(g)}
                  >
                    {g.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="gel__bereich">
          <h3>Haut und Nerven</h3>
          <ul className="gel__regionen">
            {KARTEN.map((k) => (
              <li key={k.id}>
                <button
                  type="button"
                  className="knopf"
                  aria-pressed={karte?.id === k.id}
                  onClick={() => waehleKarte(k)}
                >
                  {k.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {karte && (
        <KartenSteuerung karte={karte} zustand={zustand} aendern={aendern} />
      )}

      {region && (
        <div className="gel__pult">
          <section className="gel__blick" aria-labelledby="gel-blick">
            <h2 id="gel-blick">Drehen und zoomen</h2>
            <div className="gel__flaeche">
              <Modell
                region={region}
                struktur={offen?.id ?? null}
                aus={zustand.aus}
                drehY={zustand.drehY}
                neigX={zustand.neigX}
                zoom={zustand.zoom}
                vorschau
                beiBlick={setzeBlick}
              />
            </div>
            <div className="gel__blicke">
              {(Object.keys(BLICKE) as BlickId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  className="knopf"
                  onClick={() => aendern({ drehY: BLICKE[id].drehY, neigX: BLICKE[id].neigX })}
                >
                  {BLICKE[id].name}
                </button>
              ))}
            </div>
            <div className="gel__zoom">
              <button
                type="button"
                className="knopf"
                aria-label="Weiter weg"
                disabled={zustand.zoom <= ZOOM_MIN}
                onClick={() => zoome(1 / 1.25)}
              >
                <ZoomOut size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="knopf"
                aria-label="Näher heran"
                disabled={zustand.zoom >= ZOOM_MAX}
                onClick={() => zoome(1.25)}
              >
                <ZoomIn size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="knopf"
                onClick={() =>
                  aendern({
                    struktur: null,
                    aus: region.zuBeginnAus ?? [],
                    zoom: region.startZoom ?? 1,
                    drehY: BLICKE[region.startBlick].drehY,
                    neigX: BLICKE[region.startBlick].neigX,
                  })
                }
              >
                <RotateCcw size={18} strokeWidth={1.75} aria-hidden="true" />
                Zurücksetzen
              </button>
            </div>
            <p className="gel__hilfe">
              Im Bild ziehen dreht das Modell, das Mausrad zoomt. Der Patient sieht dieselbe
              Blickrichtung.
            </p>
          </section>

          <section className="gel__liste" aria-labelledby="gel-zeigen">
            <h2 id="gel-zeigen">Zeigen und erklären</h2>

            {offen && (
              <div className="gel__laeuft">
                <p role="status">
                  <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    Der Patient sieht <strong>{offen.name}</strong>.
                  </span>
                  <button
                    type="button"
                    className="knopf"
                    onClick={() => aendern({ struktur: null })}
                  >
                    Schließen
                  </button>
                </p>
                <dl>
                  <dt>Wo liegt das?</dt>
                  <dd>{offen.wo}</dd>
                  <dt>Wozu ist es da?</dt>
                  <dd>{offen.wozu}</dd>
                  <dt>{region.frage ?? FRAGE_STANDARD}</dt>
                  <dd>{offen.beschwerden}</dd>
                </dl>
              </div>
            )}

            {region.gruppen.map((gruppe) => {
              const strukturen = region.strukturen.filter((s) => s.gruppe === gruppe.id);
              const ids = strukturen.map((s) => s.id);
              const alleAus = ids.every((id) => zustand.aus.includes(id));
              return (
                <div key={gruppe.id} className="gel__gruppe">
                  <div className="gel__gruppenkopf">
                    <h3>{gruppe.name}</h3>
                    {strukturen.length > 1 && (
                      <button
                        type="button"
                        className="gel__alle"
                        onClick={() => schalte(ids, alleAus)}
                      >
                        {alleAus ? 'Alle einblenden' : 'Alle ausblenden'}
                      </button>
                    )}
                  </div>
                  <ul>
                    {strukturen.map((s) => {
                      const aus = zustand.aus.includes(s.id);
                      return (
                        <li key={s.id} data-aus={aus}>
                          <button
                            type="button"
                            className="gel__struktur"
                            aria-pressed={zustand.struktur === s.id}
                            onClick={() => waehleStruktur(s)}
                          >
                            <strong>{s.name}</strong>
                            <span>{s.fach}</span>
                          </button>
                          <button
                            type="button"
                            className="gel__auge"
                            aria-label={`${s.name} ${aus ? 'einblenden' : 'ausblenden'}`}
                            title={aus ? 'Einblenden' : 'Ausblenden'}
                            onClick={() => schalte([s.id], aus)}
                          >
                            {aus ? (
                              <EyeOff size={18} strokeWidth={1.75} aria-hidden="true" />
                            ) : (
                              <Eye size={18} strokeWidth={1.75} aria-hidden="true" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </section>
        </div>
      )}

      <footer className="gel__quellen">
        <p>
          <strong>Grundlage.</strong> {QUELLE}; weibliche Geschlechtsorgane: {QUELLE_HRA.replace('3D-Modell: ', '')}. Die
          Erklärtexte sind eigene Formulierungen in
          Patientensprache und ersetzen nicht das Gespräch.
        </p>
      </footer>
    </div>
  );
}
