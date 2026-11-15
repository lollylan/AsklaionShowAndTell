import './buehne.css';
import type { BuehneProps } from '../../kern/typen';
import type { AnatomieZustand } from './index';
import { FRAGE_STANDARD, findeRegion, findeStruktur, quelleVon, type Art } from './daten';
import Modell from './Modell';
import { findeKarte } from './karten';
import { KartenBuehne } from './karten/KartenBuehne';

/**
 * Reihenfolge und Namen der Farben; gezeigt werden nur die, die in der Region vorkommen.
 * Organe fehlen hier mit Absicht: Jedes hat seine eigene Farbe.
 */
const LEGENDE: { art: Art | 'sehne'; name: string }[] = [
  { art: 'knochen', name: 'Knochen' },
  { art: 'knorpel', name: 'Knorpel' },
  { art: 'muskel', name: 'Muskel' },
  { art: 'sehne', name: 'Sehne' },
  { art: 'band', name: 'Band und Kapsel' },
  { art: 'schleimbeutel', name: 'Schleimbeutel, Sehnenscheide' },
  { art: 'nerv', name: 'Nerv' },
  { art: 'gefaess', name: 'Schlagader' },
  { art: 'vene', name: 'Vene' },
  { art: 'raum', name: 'Hohlraum' },
];

export function Buehne({ zustand, vorschau }: BuehneProps<AnatomieZustand>) {
  const karte = findeKarte(zustand.karte);
  if (karte) {
    return (
      <KartenBuehne karte={karte} zustand={zustand} vorschau={vorschau} />
    );
  }

  const region = findeRegion(zustand.region);

  if (!region) {
    return (
      <div className="gelbuehne">
        <p className="gelbuehne__frage">Schauen wir uns das gemeinsam am Modell an.</p>
      </div>
    );
  }

  const struktur = findeStruktur(region, zustand.struktur);
  const arten = new Set<string>(region.strukturen.map((s) => s.art));
  if (arten.has('muskel')) arten.add('sehne');
  const legende = LEGENDE.filter((eintrag) => arten.has(eintrag.art));

  return (
    <div className="gelbuehne">
      <div className="gelbuehne__modell">
        <Modell
          region={region}
          struktur={struktur?.id ?? null}
          aus={zustand.aus}
          drehY={zustand.drehY}
          neigX={zustand.neigX}
          zoom={zustand.zoom}
          vorschau={vorschau}
          beschriftung={struktur?.name}
        />
      </div>

      {/* key: Beim Wechsel der Struktur baut sich nur der Text neu auf, das Modell bleibt stehen. */}
      <div className="gelbuehne__text" key={struktur?.id ?? region.id}>
        {struktur ? (
          <>
            <h2>
              {struktur.name}
              <span className="gelbuehne__fach">{struktur.fach}</span>
            </h2>
            <dl className="gelbuehne__antworten">
              <div style={{ animationDelay: '140ms' }}>
                <dt>Wo liegt das?</dt>
                <dd>{struktur.wo}</dd>
              </div>
              <div style={{ animationDelay: '230ms' }}>
                <dt>Wozu ist es da?</dt>
                <dd>{struktur.wozu}</dd>
              </div>
              <div style={{ animationDelay: '320ms' }}>
                <dt>{region.frage ?? FRAGE_STANDARD}</dt>
                <dd>{struktur.beschwerden}</dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <h2>
              {region.titel}
              <span className="gelbuehne__fach">Gezeigt ist {region.seite}.</span>
            </h2>
            <p className="gelbuehne__einleitung">{region.einleitung}</p>
            <ul className="gelbuehne__legende" aria-label="Farben im Modell">
              {legende.map((eintrag, i) => (
                <li
                  key={eintrag.art}
                  data-art={eintrag.art}
                  style={{ animationDelay: `${260 + i * 70}ms` }}
                >
                  {(eintrag.art !== 'sehne' && region.legende?.[eintrag.art]) || eintrag.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p className="gelbuehne__quelle">{quelleVon(region)}</p>
    </div>
  );
}
