import { findeLand } from './daten';
import { findeKrankheit } from './krankheiten';
import { NUR_VON_HAND, eintraegeFuer } from './auswahl';
import { PRIVAT } from './privat';

// Für den Handzettel reisen Reiseart und Handauswahl hinter dem „@“ der Länder-id mit:
// „THA@rucksack,langzeit~tollwut:1,typhus:0“. So steht auf dem Blatt genau das, was der
// Patient auf dem Bildschirm gesehen hat.

export function verpacke(
  iso3: string,
  stile: string[],
  manuell: Record<string, boolean>,
): string {
  const hand = Object.entries(manuell)
    .map(([id, an]) => `${id}:${an ? 1 : 0}`)
    .join(',');
  return stile.length === 0 && hand === '' ? iso3 : `${iso3}@${stile.join(',')}~${hand}`;
}

function entpacke(id: string): { iso3: string; stile: string[]; manuell: Record<string, boolean> } {
  const [iso3, rest = ''] = id.split('@');
  const [stile = '', hand = ''] = rest.split('~');
  const manuell: Record<string, boolean> = {};
  for (const teil of hand.split(',').filter(Boolean)) {
    const [k, v] = teil.split(':');
    manuell[k] = v === '1';
  }
  return { iso3, stile: stile.split(',').filter(Boolean), manuell };
}

/**
 * Druckfassung eines Reiseziels. Praxisfassung: Nachweispflicht, empfohlener Schutz, Hinweise
 * zu Malaria. Öffentliche Fassung: nur die von Hand gewählten Themen, ohne Einstufung.
 */
export function Handzettel({ id }: { id: string }) {
  const { iso3, stile, manuell } = entpacke(id);
  const land = findeLand(iso3);
  if (!land) return null;

  const gezeigt = eintraegeFuer(land, [land], stile, manuell).filter((e) => e.zeigen);
  const empfohlen = gezeigt.filter((e) => e.stufe !== 'moeglich');
  const moeglich = gezeigt.filter((e) => e.stufe === 'moeglich');
  const nachweis = PRIVAT?.nachweisAusDeutschland(land) ?? null;
  const reiseart = (PRIVAT?.REISESTILE ?? []).filter((s) => stile.includes(s.id)).map((s) => s.name);
  const malaria = gezeigt.some((e) => e.id === 'malaria') ? findeKrankheit('malaria') : undefined;

  const zeile = (e: (typeof gezeigt)[number]) => (
    <li key={e.id}>
      <strong>{findeKrankheit(e.id)?.name ?? e.id}:</strong> {e.grund}
    </li>
  );

  return (
    <>
      <h3>
        Reiseziel: {land.name}
        {reiseart.length > 0 && <small>{reiseart.join(', ')}</small>}
      </h3>

      {nachweis && (
        <p className="zettel__warnung">Impfnachweis bei der Einreise: {nachweis}</p>
      )}

      {empfohlen.length > 0 && (
        <section>
          <h4>{NUR_VON_HAND ? 'Besprochene Themen' : 'Empfohlener Schutz'}</h4>
          <ul>{empfohlen.map(zeile)}</ul>
        </section>
      )}

      {moeglich.length > 0 && (
        <section>
          <h4>Je nach Reise zusätzlich</h4>
          <ul>{moeglich.map(zeile)}</ul>
        </section>
      )}

      {malaria && (
        <section>
          <h4>Malaria – so schützen Sie sich</h4>
          <ul>
            {malaria.schutz.map((satz) => (
              <li key={satz}>{satz}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
