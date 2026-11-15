import './buehne.css';
import { Target } from 'lucide-react';
import type { BuehneProps } from '../../kern/typen';
import type { WerteZustand } from './index';
import { findeMessgroesse, ordneEin, werteText } from './daten';
import { Skala } from './Skala';

export function Buehne({ zustand }: BuehneProps<WerteZustand>) {
  const groesse = findeMessgroesse(zustand.groesse);

  if (!groesse) {
    return (
      <div className="wertebuehne">
        <p className="wertebuehne__frage">Schauen wir uns Ihre Werte an.</p>
      </div>
    );
  }

  const lage = ordneEin(groesse, zustand.eingaben[groesse.id], zustand.ziel[groesse.id]);

  return (
    <div className="wertebuehne">
      <article className="werteblatt" key={groesse.id} data-teile={groesse.teile.length}>
        <header className="werteblatt__kopf">
          <h2>
            {groesse.titel}
            <span>{groesse.zusatz}</span>
          </h2>

          {lage.vollstaendig && (
            <p className="werteblatt__wert" data-ton={lage.urteil?.ton}>
              <strong>{werteText(groesse, lage.werte)}</strong>
              <span className="werteblatt__einheit">{groesse.einheit}</span>
              <span className="werteblatt__urteil">{lage.urteil?.name}</span>
            </p>
          )}
        </header>

        <div className="werteblatt__skalen">
          {groesse.teile.map((teil, i) => (
            <Skala key={teil.id} groesse={groesse} nr={i} wert={lage.werte[i]} ziel={lage.ziel} />
          ))}
        </div>

        {lage.ziel && (
          <p className="werteblatt__ziel" data-erreicht={lage.imZiel ?? undefined}>
            <Target size={40} strokeWidth={1.75} aria-hidden="true" />
            <span>
              Ihr Ziel: <strong>{lage.ziel.text}</strong>
              {lage.imZiel === true && ' – erreicht'}
              {lage.imZiel === false && ' – noch nicht erreicht'}
            </span>
          </p>
        )}

        <ul className="werteblatt__saetze">
          {groesse.saetze.map((satz) => (
            <li key={satz}>{satz}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
