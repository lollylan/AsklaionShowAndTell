import {
  bereicheVon,
  findeMessgroesse,
  ordneEin,
  werteText,
  zeigeZahl,
  type Bereich,
} from './daten';
import { entpacke } from './paket';

/** „unter 120“, „120 bis 129“ … – die Spannen eines Teilwerts als Text. */
function spannen(bereiche: Bereich[], stellen: number): Array<{ name: string; spanne: string }> {
  return bereiche.map((b, i) => {
    const unten = i === 0 ? null : bereiche[i - 1].bis;
    const letzter = i === bereiche.length - 1;
    const z = (n: number) => zeigeZahl(n, Number.isInteger(n) ? 0 : Math.max(stellen, 1));
    const spanne =
      unten === null ? `unter ${z(b.bis)}` : letzter ? `ab ${z(unten)}` : `${z(unten)} bis unter ${z(b.bis)}`;
    return { name: b.name, spanne };
  });
}

/** Druckfassung: der heutige Wert, das Ziel und die Bereiche als kleine Liste. */
export function Handzettel({ id }: { id: string }) {
  const paket = entpacke(id);
  const groesse = findeMessgroesse(paket.groesse);
  if (!groesse) return null;
  const lage = ordneEin(groesse, paket.eingaben, paket.ziel);

  return (
    <>
      <h3>
        {groesse.name}
        <small>{groesse.zusatz}</small>
      </h3>

      {lage.vollstaendig && (
        <p className="zettel__wert">
          Ihr Wert heute:{' '}
          <strong>
            {werteText(groesse, lage.werte)} {groesse.einheit}
          </strong>
          {lage.urteil && ` – ${lage.urteil.name}`}
        </p>
      )}
      {lage.ziel && (
        <p className="zettel__wert">
          Ihr Ziel: <strong>{lage.ziel.text}</strong>
          {groesse.einheit !== '%' && groesse.id !== 'blutdruck' ? ` ${groesse.einheit}` : ''}
        </p>
      )}

      <ul>
        {groesse.saetze.map((satz) => (
          <li key={satz}>{satz}</li>
        ))}
      </ul>

      {groesse.teile.map((teil, i) => {
        const bereiche = bereicheVon(groesse, i, lage.ziel);
        if (bereiche.length < 2) return null;
        return (
          <section key={teil.id}>
            <h4>
              {groesse.teile.length > 1 ? `${teil.name}: ` : ''}So wird eingeteilt ({groesse.einheit})
            </h4>
            <ul className="zettel__bereiche">
              {spannen(bereiche, teil.stellen).map((s) => (
                <li key={s.spanne} data-hier={lage.bereiche[i]?.name === s.name || undefined}>
                  <span>{s.spanne}</span> {s.name}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
