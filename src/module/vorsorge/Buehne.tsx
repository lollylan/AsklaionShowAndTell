import './buehne.css';
import type { CSSProperties } from 'react';
import type { BuehneProps } from '../../kern/typen';
import type { VorsorgeZustand } from './index';
import {
  MIN_ALTER,
  altersText,
  anstehend,
  findeUntersuchung,
  intervallText,
  marken,
  spaeter,
  stufeFuer,
  type Geschlecht,
  type Untersuchung,
} from './daten';

/** Die Zeitachse reicht von 18 bis 85 Jahren; wer älter ist, steht am rechten Ende. */
const ACHSE_ENDE = 85;
const ort = (alter: number) =>
  `${((Math.min(ACHSE_ENDE, Math.max(MIN_ALTER, alter)) - MIN_ALTER) / (ACHSE_ENDE - MIN_ALTER)) * 100}%`;

export function Buehne({ zustand }: BuehneProps<VorsorgeZustand>) {
  const { geschlecht, alter, thema } = zustand;
  const hausarztmodell = Boolean(zustand.hausarztmodell);
  const offen = findeUntersuchung(thema);

  return (
    <div className="vorsbuehne" data-thema={Boolean(offen)}>
      <div className="vorsbuehne__uebersicht">
        {alter === null ? (
          <p className="vorsbuehne__frage">Früh erkennen, gesund bleiben</p>
        ) : (
          <Uebersicht
            key={`${geschlecht}-${alter}`}
            geschlecht={geschlecht}
            alter={alter}
            hausarztmodell={hausarztmodell}
          />
        )}
      </div>

      {offen && (
        <Karte key={offen.id} untersuchung={offen} alter={alter} hausarztmodell={hausarztmodell} />
      )}
    </div>
  );
}

function Uebersicht({
  geschlecht,
  alter,
  hausarztmodell,
}: {
  geschlecht: Geschlecht | null;
  alter: number;
  hausarztmodell: boolean;
}) {
  const jetzt = anstehend(geschlecht, alter);
  const dann = spaeter(geschlecht, alter, hausarztmodell);

  return (
    <div className="vorsuebersicht">
      <h2 className="vorsuebersicht__titel">Ihre Vorsorge mit {alter} Jahren</h2>

      <div className="vorsuebersicht__spalten">
        <section>
          <h3>Jetzt für Sie</h3>
          <ul className="vorsliste">
            {jetzt.map(({ untersuchung, stufe }, i) => (
              <li key={untersuchung.id} style={{ animationDelay: `${180 + i * 60}ms` }}>
                <span className="vorsliste__name">{untersuchung.name}</span>
                <span className="vorsliste__wann">{intervallText(stufe, hausarztmodell)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="vorsspaeter">
          <h3>Später kommt dazu</h3>
          {dann.length === 0 ? (
            <p className="vorsspaeter__leer">
              Es kommt keine weitere Untersuchung mehr dazu.
            </p>
          ) : (
            <dl>
              {dann.map((gruppe) => (
                <div key={gruppe.ab}>
                  <dt>ab {gruppe.ab}</dt>
                  <dd>
                    {gruppe.namen.map((name) => (
                      <span key={name}>{name}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <p className="vorsspaeter__verweis">
            Dazu gehören zweimal im Jahr die Zahnvorsorge und ein Blick in Ihren Impfpass.
          </p>
        </section>
      </div>

      <Zeitachse geschlecht={geschlecht} alter={alter} />
    </div>
  );
}

function Zeitachse({ geschlecht, alter }: { geschlecht: Geschlecht | null; alter: number }) {
  const punkte = marken(geschlecht);
  const erreicht = punkte.filter((p) => p <= alter);
  const beschreibung =
    `Zeitachse der Lebensjahre. Sie sind ${alter} Jahre alt. ` +
    `Neue Untersuchungen beginnen mit ${punkte.join(', ')} Jahren; ` +
    `davon haben Sie ${erreicht.length} Stufen erreicht.`;

  return (
    <div
      className="vorsachse"
      role="img"
      aria-label={beschreibung}
      style={{ '--vors-ort': ort(alter) } as CSSProperties}
    >
      <span className="vorsachse__linie" />
      <span className="vorsachse__weg" />
      {punkte.map((p) => (
        <span
          key={p}
          className="vorsachse__marke"
          data-erreicht={p <= alter}
          style={{ left: ort(p) }}
        >
          <span className="vorsachse__jahr">{p}</span>
        </span>
      ))}
      <span className="vorsachse__hier">
        <span className="vorsachse__hiertext">Sie sind hier</span>
      </span>
      <span className="vorsachse__einheit">Lebensjahre</span>
    </div>
  );
}

function Karte({
  untersuchung,
  alter,
  hausarztmodell,
}: {
  untersuchung: Untersuchung;
  alter: number | null;
  hausarztmodell: boolean;
}) {
  const jetzt = stufeFuer(untersuchung, alter);

  return (
    <article className="vorskarte">
      <div className="vorskarte__text">
        <h2>
          {untersuchung.name}
          {untersuchung.zusatz && <span className="vorskarte__zusatz">{untersuchung.zusatz}</span>}
        </h2>
        <ul className="vorskarte__was">
          {untersuchung.was.map((satz) => (
            <li key={satz}>{satz}</li>
          ))}
        </ul>
        <dl className="vorskarte__daten">
          {untersuchung.stufen.map((stufe) => (
            <div key={stufe.von} data-jetzt={stufe === jetzt}>
              <dt>{altersText(stufe)}</dt>
              <dd>{intervallText(stufe, hausarztmodell)}</dd>
            </div>
          ))}
          <div>
            <dt>Wo</dt>
            <dd>{untersuchung.wer}</dd>
          </div>
        </dl>
        {untersuchung.hinweis && !hausarztmodell && (
          <p className="vorskarte__hinweis">{untersuchung.hinweis}</p>
        )}
      </div>
    </article>
  );
}
