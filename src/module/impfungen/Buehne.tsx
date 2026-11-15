import './buehne.css';
import { useEffect, useState } from 'react';
import type { BuehneProps } from '../../kern/typen';
import type { ImpfZustand } from './index';
import {
  findeGruppe,
  findeImpfung,
  schemaFuer,
  zeitpunktFuer,
  type GruppeId,
  type Impfung,
} from './daten';
import { datei, gibtEs } from '../../kern/pfad';

export function Buehne({ zustand }: BuehneProps<ImpfZustand>) {
  const thema = findeImpfung(zustand.thema);
  const gruppe = findeGruppe(zustand.gruppe);
  const auswahl = zustand.auswahl.map(findeImpfung).filter((i): i is Impfung => Boolean(i));

  return (
    <div className="impfbuehne" data-thema={Boolean(thema)}>
      <div className="impfbuehne__uebersicht">
        {auswahl.length === 0 ? (
          <p className="impfbuehne__frage">Gut geschützt in jedem Alter</p>
        ) : (
          <div className="impfuebersicht" key={zustand.gruppe ?? 'frei'}>
            <h2 className="impfuebersicht__titel">{gruppe?.titel ?? 'Ihre Impfungen'}</h2>
            <ul className="impfliste" data-viele={auswahl.length > 8}>
              {auswahl.map((impfung, i) => {
                const wann = zeitpunktFuer(impfung, zustand.gruppe);
                return (
                  <li key={impfung.id} style={{ animationDelay: `${180 + i * 60}ms` }}>
                    <span className="impfliste__name">{impfung.name}</span>
                    <span className="impfliste__kurz">{impfung.kurz}</span>
                    {wann && <span className="impfliste__wann">{wann}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {thema && <Impfkarte key={thema.id} impfung={thema} gruppe={zustand.gruppe} />}
    </div>
  );
}

function Impfkarte({ impfung, gruppe }: { impfung: Impfung; gruppe: GruppeId | null }) {
  const [bildDa, setBildDa] = useState(gibtEs(impfung.bild));
  useEffect(() => setBildDa(gibtEs(impfung.bild)), [impfung.id, impfung.bild]);
  const schritte = schemaFuer(impfung, gruppe);

  return (
    <article className="impfkarte" data-bild={bildDa}>
      {bildDa && (
        <img
          className="impfkarte__bild"
          src={datei(impfung.bild)}
          alt={impfung.bildtext}
          onError={() => setBildDa(false)}
        />
      )}
      <div className="impfkarte__text">
        <h2>
          {impfung.name}
          {impfung.zusatz && <span className="impfkarte__zusatz">{impfung.zusatz}</span>}
        </h2>
        <ul className="impfkarte__was">
          {impfung.was.map((satz) => (
            <li key={satz}>{satz}</li>
          ))}
        </ul>
        <h3>Impfschema</h3>
        <ol className="impfschema">
          {schritte.map((s) => (
            <li key={s.wann + s.was}>
              <span className="impfschema__wann">{s.wann}</span>
              <span className="impfschema__was">{s.was}</span>
            </li>
          ))}
        </ol>
        {impfung.hinweis && <p className="impfkarte__hinweis">{impfung.hinweis}</p>}
      </div>
    </article>
  );
}
