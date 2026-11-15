import './buehne.css';
import { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import type { BuehneProps } from '../../kern/typen';
import type { MedikamentenZustand } from './index';
import { SEITEN, findeMedikament, findePackung, type Medikament, type SeiteId } from './daten';
import { Sinnbild } from './symbole';

export function Buehne({ zustand }: BuehneProps<MedikamentenZustand>) {
  const medikament = findeMedikament(zustand.thema);

  if (!medikament) {
    return (
      <div className="medibuehne">
        <p className="medibuehne__frage">Ihr Medikament, in Ruhe erklärt.</p>
      </div>
    );
  }

  return (
    <div className="medibuehne">
      <Blatt key={medikament.id} medikament={medikament} seite={zustand.seite} />
    </div>
  );
}

function Blatt({ medikament, seite }: { medikament: Medikament; seite: number }) {
  const nr = Math.min(Math.max(seite, 0), SEITEN.length - 1);
  const aktuell = SEITEN[nr];

  return (
    <article className="mediblatt">
      <Packung medikament={medikament} />

      <div className="mediblatt__text">
        <h2>
          {medikament.name}
          <span className="mediblatt__zusatz">{medikament.zusatz}</span>
        </h2>

        {/* key: Beim Blättern baut sich nur der Text neu auf, die Packung bleibt stehen. */}
        <div className="mediblatt__seite" key={aktuell.id}>
          <h3>{aktuell.titel}</h3>
          <Seite medikament={medikament} seite={aktuell.id} />
        </div>
      </div>

      <ol className="mediweg" aria-label="Seiten dieser Erklärung">
        {SEITEN.map((s, i) => (
          <li key={s.id} data-lage={i === nr ? 'hier' : i < nr ? 'war' : 'kommt'}>
            {s.kurz}
          </li>
        ))}
      </ol>
    </article>
  );
}

/** Links: Foto einer Beispielpackung, darunter die Handelsnamen. */
function Packung({ medikament }: { medikament: Medikament }) {
  const packung = findePackung(medikament.id);
  const [bildDa, setBildDa] = useState(Boolean(packung));

  return (
    <aside className="medipackung">
      <div className="medipackung__flaeche">
        {packung && bildDa ? (
          <img
            src={packung.bild}
            alt={`Packung ${packung.name}`}
            onError={() => setBildDa(false)}
          />
        ) : (
          <div className="medischachtel" aria-hidden="true">
            <span className="medischachtel__name">{medikament.name}</span>
            <span className="medischachtel__form">{medikament.form}</span>
          </div>
        )}
      </div>
      {packung && bildDa && (
        <p className="medipackung__hinweis">
          Beispiel: {packung.name}. Ihre Packung kann anders aussehen.
        </p>
      )}
      <p className="medipackung__namen">
        <span>Handelsnamen</span>
        {medikament.handelsnamen.join(', ')}
      </p>
    </aside>
  );
}

function Saetze({ saetze, ab = 0 }: { saetze: string[]; ab?: number }) {
  return (
    <ul className="medisaetze" data-viele={saetze.length + ab > 3}>
      {saetze.map((satz, i) => (
        <li key={satz} style={{ animationDelay: `${140 + (i + ab) * 90}ms` }}>
          {satz}
        </li>
      ))}
    </ul>
  );
}

function Seite({ medikament, seite }: { medikament: Medikament; seite: SeiteId }) {
  if (seite === 'einnahme') {
    return (
      <>
        <ul className="medimerker">
          {medikament.merker.map((m, i) => (
            <li key={m.titel} style={{ animationDelay: `${140 + i * 110}ms` }}>
              <Sinnbild id={m.symbol} size={76} strokeWidth={1.5} />
              <strong>{m.titel}</strong>
              {m.text && <span>{m.text}</span>}
            </li>
          ))}
        </ul>
        <Saetze saetze={medikament.einnahme} ab={2} />
      </>
    );
  }

  if (seite === 'nebenwirkungen') {
    return (
      <>
        <ul className="medineben" data-viele={medikament.nebenwirkungen.length > 3}>
          {medikament.nebenwirkungen.map((n, i) => (
            <li key={n.name} style={{ animationDelay: `${140 + i * 110}ms` }}>
              <Sinnbild id={n.symbol} size={64} strokeWidth={1.5} />
              <strong>{n.name}</strong>
              <span>{n.text}</span>
            </li>
          ))}
        </ul>
        <p
          className="medineben__fuss"
          style={{ animationDelay: `${140 + medikament.nebenwirkungen.length * 110}ms` }}
        >
          Nicht jeder bekommt sie. Sagen Sie uns, wenn Sie etwas bemerken – bitte nicht einfach
          absetzen.
        </p>
      </>
    );
  }

  const saetze = medikament[seite];
  return (
    <>
      <Saetze saetze={saetze} />
      {seite === 'achtung' && medikament.warnung && (
        <p className="medwarnung" style={{ animationDelay: `${140 + saetze.length * 90}ms` }}>
          <TriangleAlert size={34} strokeWidth={1.75} aria-hidden="true" />
          <span>{medikament.warnung}</span>
        </p>
      )}
    </>
  );
}
