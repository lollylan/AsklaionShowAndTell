import './buehne.css';
import { Info, TriangleAlert } from 'lucide-react';
import type { BuehneProps } from '../../kern/typen';
import type { AufklaerungsZustand } from './index';
import {
  bildgebungVon,
  findeKrankheit,
  hinweisTitel,
  seitenVon,
  type Krankheit,
} from './daten';
import { findeZeichnung } from './bilder';
import { Aufnahmen } from '../../buehne/Aufnahmen';
import { findeManoever, type Ohr } from './manoever';
import { ManoeverKarten } from './ManoeverKarten';

export function Buehne({ zustand }: BuehneProps<AufklaerungsZustand>) {
  const krankheit = findeKrankheit(zustand.thema);

  if (!krankheit) {
    return (
      <div className="aufkbuehne">
        <p className="aufkbuehne__frage">Schauen wir uns das gemeinsam an.</p>
      </div>
    );
  }

  return (
    <div className="aufkbuehne">
      <Blatt
        key={krankheit.id}
        krankheit={krankheit}
        seite={zustand.seite}
        ohr={zustand.ohr ?? 'rechts'}
      />
    </div>
  );
}

function Blatt({ krankheit, seite, ohr }: { krankheit: Krankheit; seite: number; ohr: Ohr }) {
  const seiten = seitenVon(krankheit);
  const nr = Math.min(Math.max(seite, 0), seiten.length - 1);
  const aktuell = seiten[nr];
  const gebung = aktuell.art === 'bild' ? bildgebungVon(krankheit.id) : undefined;
  const bildId = aktuell.bild ?? krankheit.id;
  const Bild = gebung ? undefined : findeZeichnung(bildId);
  const saetze = aktuell.saetze;
  const letzte = nr === seiten.length - 1;
  const manoever = findeManoever(aktuell.manoever);

  if (manoever) {
    return (
      <article className="aufkblatt" data-art="manoever">
        <div className="aufkblatt__manoever">
          <p className="aufkblatt__oben">{krankheit.name}</p>
          <ManoeverKarten manoever={manoever} ohr={ohr} />
        </div>
        <Weg seiten={seiten} nr={nr} />
      </article>
    );
  }

  return (
    <article className="aufkblatt" data-bild={Boolean(Bild || gebung)} data-art={aktuell.art}>
      {gebung && (
        <div className="aufkblatt__aufnahmen" key="im-bild">
          <Aufnahmen gebung={gebung} ordner="aufklaerungen" />
        </div>
      )}
      {Bild && (
        <div className="aufkblatt__bild" key={bildId}>
          <Bild />
        </div>
      )}

      <div className="aufkblatt__text">
        {/* Lange Namen laufen über zwei Zeilen und bekommen deshalb eine kleinere Schrift. */}
        <h2 data-lang={krankheit.name.length >= 26}>
          {krankheit.name}
          {krankheit.zusatz && <span className="aufkblatt__zusatz">{krankheit.zusatz}</span>}
        </h2>

        {/* key: Beim Blättern baut sich nur der Text neu auf, die Zeichnung bleibt stehen. */}
        <div className="aufkblatt__seite" key={aktuell.id}>
          <h3>{aktuell.titel}</h3>
          <ul className="aufkblatt__saetze" data-viele={saetze.length > 4}>
            {saetze.map((satz, i) => (
              <li key={satz} style={{ animationDelay: `${140 + i * 90}ms` }}>
                {satz}
              </li>
            ))}
          </ul>
          {letzte && krankheit.warnung && (
            <p
              className="aufkblatt__warnung"
              style={{ animationDelay: `${140 + saetze.length * 90}ms` }}
            >
              {hinweisTitel(krankheit) === 'Wichtig.' ? (
                <Info size={34} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <TriangleAlert size={34} strokeWidth={1.75} aria-hidden="true" />
              )}
              <span>{krankheit.warnung}</span>
            </p>
          )}
        </div>
      </div>

      <Weg seiten={seiten} nr={nr} />
    </article>
  );
}

function Weg({ seiten, nr }: { seiten: { id: string; kurz: string }[]; nr: number }) {
  return (
    <ol
      className="aufkweg"
      aria-label="Seiten dieser Erklärung"
      style={{ gridTemplateColumns: `repeat(${seiten.length}, 1fr)` }}
    >
      {seiten.map((s, i) => (
        <li key={s.id} data-lage={i === nr ? 'hier' : i < nr ? 'war' : 'kommt'}>
          {s.kurz}
        </li>
      ))}
    </ol>
  );
}
