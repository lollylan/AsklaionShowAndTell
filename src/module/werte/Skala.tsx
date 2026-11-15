import type { CSSProperties } from 'react';
import {
  bereicheVon,
  lageAufSkala,
  zeigeZahl,
  type Messgroesse,
  type Ziel,
} from './daten';

interface Props {
  groesse: Messgroesse;
  /** Welcher Teilwert (Blutdruck: 0 = oben, 1 = unten). */
  nr: number;
  wert: number | null;
  ziel: Ziel | undefined;
}

/**
 * Eine Skala mit gleich breiten Bereichen, den Grenzen darunter, der Marke für den Wert
 * des Patienten und – wenn gewählt – der Marke für das persönliche Ziel.
 */
export function Skala({ groesse, nr, wert, ziel }: Props) {
  const teil = groesse.teile[nr];
  const bereiche = bereicheVon(groesse, nr, ziel);
  const lage = wert === null ? null : lageAufSkala(teil, bereiche, wert);
  const zielGrenze = ziel?.grenzen[nr];
  // Fällt das Ziel auf eine Bereichsgrenze (LDL), reicht die Beschriftung der Grenze.
  const zielLage =
    zielGrenze === undefined || groesse.nurZiel
      ? null
      : lageAufSkala(teil, bereiche, zielGrenze);
  const ausserhalb = wert !== null && (wert < teil.von || wert > teil.ende);

  return (
    <div className="werteskala" data-mehrere={groesse.teile.length > 1}>
      {groesse.teile.length > 1 && <p className="werteskala__name">{teil.name}</p>}

      <div className="werteskala__bahn">
        <ol className="werteskala__bereiche">
          {bereiche.map((b, i) => (
            <li
              key={`${b.name}-${b.bis}`}
              data-ton={b.ton}
              data-hier={wert !== null && bereiche.indexOf(bereicheHier(bereiche, wert)) === i}
            >
              <span className="werteskala__balken" />
              <span className="werteskala__bereich">{b.name}</span>
              {i < bereiche.length - 1 && (
                <span className="werteskala__grenze">{zeigeZahl(b.bis, grenzStellen(b.bis))}</span>
              )}
            </li>
          ))}
        </ol>

        {zielLage !== null && (
          <span
            className="werteskala__ziel"
            style={{ '--lage': zielLage } as CSSProperties}
            aria-hidden="true"
          >
            <span>Ziel</span>
          </span>
        )}

        {lage !== null && (
          <span
            // key: Bei jedem neuen Wert fährt die Marke von links an ihren Platz.
            key={`${wert}`}
            className="werteskala__marke"
            style={{ '--lage': lage } as CSSProperties}
          >
            <span className="werteskala__zahl">
              {ausserhalb && (wert! > teil.ende ? 'über ' : 'unter ')}
              {zeigeZahl(wert!, teil.stellen)}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

function bereicheHier<B extends { bis: number }>(bereiche: B[], wert: number): B {
  return bereiche.find((b) => wert < b.bis) ?? bereiche[bereiche.length - 1];
}

/** Grenzen wie 18,5 oder 0,4 brauchen eine Nachkommastelle, 140 nicht. */
const grenzStellen = (zahl: number) => (Number.isInteger(zahl) ? 0 : 1);
