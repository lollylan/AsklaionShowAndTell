import './buehne.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import type { BuehneProps } from '../../kern/typen';
import type { ReiseZustand } from './index';
import { findeLand, istLand, type Land } from './daten';
import { bildPfad, findeKrankheit, type Krankheit } from './krankheiten';
import { NUR_VON_HAND, eintraegeFuer } from './auswahl';
import { PRIVAT } from './privat';
import { MalariaAllgemein } from './MalariaAllgemein';
import { Laenderseite, seitenFuer } from './Laenderseiten';

// Der Globus bringt three.js und die Weltkarte mit – erst laden, wenn er gebraucht wird.
const Globus = lazy(() => import('./Globus'));

// Schriftgröße so wählen, dass auch lange Ländernamen in die linke Spalte passen.
const namensgroesse = (name: string) =>
  name.length <= 9 ? 124 : name.length <= 14 ? 96 : name.length <= 22 ? 72 : 56;

// Wo die Kugelmitte auf der Bühne sitzt (in Bühnen-Pixeln).
const MITTE_FREI: [number, number] = [1330, 540];
const MITTE_REISE: [number, number] = [1400, 520];
const MITTE_LAND: [number, number] = [1440, 410];

export function Buehne({ zustand, vorschau }: BuehneProps<ReiseZustand>) {
  const ziele = zustand.ziele.map(findeLand).filter(istLand);
  const aktiv = findeLand(zustand.aktiv) ?? null;
  const thema = findeKrankheit(zustand.thema);

  const mitte = aktiv ? MITTE_LAND : ziele.length > 0 ? MITTE_REISE : MITTE_FREI;
  // Andere Seiten als „Impfungen“ legen sich über den Globus; der ruht dann.
  const seite = aktiv && zustand.seite && seitenFuer(aktiv).includes(zustand.seite) ? zustand.seite : 'impfungen';
  const ueberdeckt = Boolean(thema) || seite !== 'impfungen';

  return (
    <div className="reisebuehne" data-thema={ueberdeckt}>
      <div className="reisebuehne__welt">
        <Suspense fallback={null}>
          <Globus
            ziele={ziele}
            aktiv={aktiv}
            mitte={mitte}
            vorschau={vorschau}
            ruht={ueberdeckt}
          />
        </Suspense>
        <div className="reisebuehne__schleier" />

        {ziele.length === 0 ? (
          <p className="reisebuehne__frage">Wohin geht Ihre Reise?</p>
        ) : aktiv ? (
          <Landansicht
            key={aktiv.iso3}
            land={aktiv}
            ziele={ziele}
            stile={zustand.stile}
            manuell={zustand.manuell}
          />
        ) : (
          <Reiseansicht ziele={ziele} stile={zustand.stile} manuell={zustand.manuell} />
        )}
      </div>

      {aktiv && seite !== 'impfungen' && !thema && (
        <Laenderseite
          key={`${aktiv.iso3}-${seite}-${zustand.malariakarte ?? 0}`}
          land={aktiv}
          seite={seite}
          malariakarte={zustand.malariakarte}
        />
      )}

      {/* Ohne die Karten der Praxisfassung bekommt Malaria eine eigene, allgemeine Erklärseite. */}
      {thema &&
        (NUR_VON_HAND && thema.id === 'malaria' ? (
          <MalariaAllgemein />
        ) : (
          <Erklaerkarte key={thema.id} krankheit={thema} />
        ))}
    </div>
  );
}

function Schutzliste({ eintraege }: { eintraege: Array<{ id: string; grund: string }> }) {
  return (
    <ul className="schutzliste" data-viele={eintraege.length > 8}>
      {eintraege.map((e, i) => (
        <li key={e.id} style={{ animationDelay: `${180 + i * 70}ms` }}>
          <span className="schutzliste__name">{findeKrankheit(e.id)?.name}</span>
          <span className="schutzliste__grund">{e.grund}</span>
        </li>
      ))}
    </ul>
  );
}

function Landansicht({
  land,
  ziele,
  stile,
  manuell,
}: {
  land: Land;
  ziele: Land[];
  stile: string[];
  manuell: Record<string, boolean>;
}) {
  const zeigen = eintraegeFuer(land, ziele, stile, manuell).filter((e) => e.zeigen);
  const nachweis = PRIVAT?.nachweisAusDeutschland(land) ?? null;

  return (
    <>
      <div className="landansicht">
        <h2 className="landansicht__name" style={{ fontSize: namensgroesse(land.name) }}>
          {land.name}
        </h2>
        {nachweis && (
          <p className="landansicht__pflicht">Impfnachweis bei der Einreise: {nachweis}</p>
        )}
        <Schutzliste eintraege={zeigen} />
      </div>

      {/* Bei sehr langen Listen braucht die Liste den Platz der Routenzeile. */}
      {ziele.length > 1 && zeigen.length <= 9 && (
        <ol className="reisebuehne__route">
          {ziele.map((z) => (
            <li key={z.iso3} data-aktiv={z === land}>
              {z.name}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

function Reiseansicht({
  ziele,
  stile,
  manuell,
}: {
  ziele: Land[];
  stile: string[];
  manuell: Record<string, boolean>;
}) {
  const zeigen = eintraegeFuer(null, ziele, stile, manuell).filter((e) => e.zeigen);
  const namen = ziele.map((z) => z.name);
  const laenge = namen.join(', ').length;

  return (
    <div className="reiseansicht">
      <h2
        className="reiseansicht__ziele"
        style={{ fontSize: laenge <= 18 ? 92 : laenge <= 40 ? 68 : laenge <= 80 ? 50 : 38 }}
      >
        {namen.map((name, i) => (
          <span key={name}>
            {name}
            {i < namen.length - 1 ? ', ' : ''}
          </span>
        ))}
      </h2>
      <p className="reiseansicht__titel">
        {NUR_VON_HAND ? 'Themen für Ihre Reise' : 'Ihr Schutz für diese Reise'}
      </p>
      <Schutzliste eintraege={zeigen.map((e) => ({ id: e.id, grund: findeKrankheit(e.id)?.kurz ?? '' }))} />
    </div>
  );
}

function Erklaerkarte({ krankheit }: { krankheit: Krankheit }) {
  const bild = bildPfad(krankheit.id);
  const [bildDa, setBildDa] = useState(bild !== null);
  useEffect(() => setBildDa(bild !== null), [bild]);

  return (
    <article className="erklaerung" data-bild={bildDa}>
      {bild && bildDa && (
        <img
          className="erklaerung__bild"
          src={bild}
          alt={krankheit.bildtext}
          onError={() => setBildDa(false)}
        />
      )}
      <div className="erklaerung__text">
        <h2>{krankheit.name}</h2>
        <ul>
          {krankheit.was.map((satz) => (
            <li key={satz}>{satz}</li>
          ))}
        </ul>
        <h3>So schützen Sie sich</h3>
        <ul>
          {krankheit.schutz.map((satz) => (
            <li key={satz}>{satz}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
