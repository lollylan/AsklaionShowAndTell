import './karten.css';
import type { Karte, Seite } from './koerper';
import { Koerperkarte, wahlfarbe } from './Koerperkarte';
import { QUELLE_KARTEN } from './index';
import { Haut3D } from './Haut3D';
import { QUELLE_HRA } from '../quellen';
import type { AnatomieZustand } from '../index';

const SEITE_TEXT: Record<Seite, string> = {
  beide: '',
  rechts: 'Gezeigt ist die rechte Seite.',
  links: 'Gezeigt ist die linke Seite.',
};

interface Props {
  karte: Karte;
  zustand: AnatomieZustand;
  vorschau: boolean;
}

export function KartenBuehne({ karte, zustand, vorschau }: Props) {
  const gewaehlt = zustand.gebiete ?? [];
  const seite: Seite = zustand.seite ?? 'beide';
  const alle = zustand.alle ?? true;
  const raum = zustand.darstellung === 'raum';
  const gebiete = gewaehlt
    .map((id) => karte.gebiete.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));
  const einzeln = gebiete.length === 1 ? gebiete[0] : null;

  return (
    <div className="gelbuehne">
      {raum ? (
        <div className="gelbuehne__modell">
          <Haut3D
            karte={karte}
            gewaehlt={gewaehlt}
            seite={seite}
            alle={alle}
            haltung={zustand.haltung ?? 'grund'}
            drehY={zustand.drehY}
            neigX={zustand.neigX}
            zoom={zustand.zoom}
            vorschau={vorschau}
          />
        </div>
      ) : (
        <div className="gelbuehne__modell hautbuehne__bild">
          <Koerperkarte karte={karte} gewaehlt={gewaehlt} seite={seite} alle={alle} />
        </div>
      )}

      {/* key: Bei neuer Auswahl baut sich nur der Text neu auf. */}
      <div className="gelbuehne__text" key={gewaehlt.join('+') || karte.id}>
        {einzeln ? (
          <>
            <h2>
              <span className="hautbuehne__punkt" style={{ background: wahlfarbe(gewaehlt, einzeln.id) }} />
              {einzeln.name}
              <span className="gelbuehne__fach">{einzeln.fach}</span>
            </h2>
            <dl className="gelbuehne__antworten">
              <div style={{ animationDelay: '140ms' }}>
                <dt>Wo spürt man das?</dt>
                <dd>{einzeln.wo}</dd>
              </div>
              <div style={{ animationDelay: '230ms' }}>
                <dt>Typisch</dt>
                <dd>{einzeln.typisch}</dd>
              </div>
            </dl>
            {SEITE_TEXT[seite] && <p className="hautbuehne__seite">{SEITE_TEXT[seite]}</p>}
          </>
        ) : gebiete.length > 1 ? (
          <>
            <h2>
              {karte.name}
              <span className="gelbuehne__fach">{SEITE_TEXT[seite] || karte.fach}</span>
            </h2>
            <ul className="hautbuehne__liste" data-viele={gebiete.length > 4}>
              {gebiete.map((g, i) => (
                <li key={g.id} style={{ animationDelay: `${140 + i * 80}ms` }}>
                  <span className="hautbuehne__punkt" style={{ background: wahlfarbe(gewaehlt, g.id) }} />
                  <div>
                    <strong>{g.name}</strong>
                    {gebiete.length <= 4 && <span>{g.wo}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>
              {karte.name}
              <span className="gelbuehne__fach">{karte.fach}</span>
            </h2>
            <p className="gelbuehne__einleitung">{karte.einleitung}</p>
          </>
        )}
      </div>

      <p className="gelbuehne__quelle hautbuehne__quelle">
        {QUELLE_KARTEN}
        {raum && <> {QUELLE_HRA.replace('3D-Modell', '3D-Körper')}.</>}
      </p>
    </div>
  );
}
