import './steuerung.css';
import { useId, useState } from 'react';
import { MonitorPlay } from 'lucide-react';
import type { SteuerungProps } from '../../kern/typen';
import type { WerteZustand } from './index';
import {
  MESSGROESSEN,
  bereicheVon,
  findeMessgroesse,
  liesZahl,
  ordneEin,
  werteText,
  zeigeZahl,
  type Messgroesse,
} from './daten';

export function Steuerung({ zustand, aendern }: SteuerungProps<WerteZustand>) {
  const groesse = findeMessgroesse(zustand.groesse);

  const waehle = (id: string) => aendern({ groesse: zustand.groesse === id ? null : id });

  return (
    <div className="wert">
      {groesse && <Pult groesse={groesse} zustand={zustand} aendern={aendern} />}

      <section aria-labelledby="wert-wahl">
        <h2 id="wert-wahl">Messwert wählen</h2>
        <ul className="wert__liste">
          {MESSGROESSEN.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                className="wert__groesse"
                aria-pressed={zustand.groesse === m.id}
                onClick={() => waehle(m.id)}
              >
                <strong>{m.name}</strong>
                <span>{m.zusatz}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <footer className="wert__quellen">
        <p>
          <strong>Grundlage.</strong> Richtwerte nach den gängigen Leitlinien (Blutdruck ESC/ESH,
          LDL-Ziele ESC, HbA1c NVL Diabetes, eGFR-Stadien KDIGO, BMI WHO). Grenzen können je nach
          Labor und Person abweichen. Die eingetippten Werte werden nicht gespeichert; „Neue
          Sitzung“ löscht sie.
        </p>
      </footer>
    </div>
  );
}

function Pult({
  groesse,
  zustand,
  aendern,
}: SteuerungProps<WerteZustand> & { groesse: Messgroesse }) {
  const feldId = useId();
  const eingaben = zustand.eingaben[groesse.id] ?? [];
  const zielId = zustand.ziel[groesse.id] ?? null;
  const lage = ordneEin(groesse, eingaben, zielId);

  const setze = (nr: number, text: string) =>
    aendern((alt) => {
      const neu = [...(alt.eingaben[groesse.id] ?? groesse.teile.map(() => ''))];
      neu[nr] = text;
      return { ...alt, eingaben: { ...alt.eingaben, [groesse.id]: neu } };
    });

  const setzeZiel = (id: string) =>
    aendern((alt) => ({
      ...alt,
      ziel: { ...alt.ziel, [groesse.id]: alt.ziel[groesse.id] === id ? null : id },
    }));

  const leere = () =>
    aendern((alt) => ({
      ...alt,
      eingaben: { ...alt.eingaben, [groesse.id]: [] },
      ziel: { ...alt.ziel, [groesse.id]: null },
    }));

  return (
    <section className="wert__pult" aria-labelledby="wert-pult">
      <p className="wert__laeuft" role="status">
        <MonitorPlay size={18} strokeWidth={1.75} aria-hidden="true" />
        <span id="wert-pult">
          Der Patient sieht <strong>{groesse.name}</strong>
          {lage.vollstaendig
            ? ` mit ${werteText(groesse, lage.werte)} ${groesse.einheit}.`
            : ' – noch ohne Wert.'}
        </span>
        <button type="button" className="knopf" onClick={() => aendern({ groesse: null })}>
          Schließen
        </button>
      </p>

      <div className="wert__eingabe">
        {groesse.teile.map((teil, i) => {
          const text = eingaben[i] ?? '';
          const ungueltig = text.trim() !== '' && liesZahl(text) === null;
          return (
            <div key={teil.id} className="wert__feld">
              <label htmlFor={`${feldId}-${i}`}>{teil.name}</label>
              <span className="wert__kasten" data-fehler={ungueltig}>
                <input
                  id={`${feldId}-${i}`}
                  inputMode="decimal"
                  autoComplete="off"
                  value={text}
                  placeholder={teil.stellen > 0 ? '0,0' : '0'}
                  aria-invalid={ungueltig}
                  aria-describedby={ungueltig ? `${feldId}-${i}-fehler` : undefined}
                  onChange={(e) => setze(i, e.target.value)}
                />
                <span aria-hidden="true">{groesse.einheit}</span>
              </span>
              {ungueltig && (
                <p id={`${feldId}-${i}-fehler`} className="wert__fehler">
                  Bitte nur eine Zahl eintippen, z. B. {teil.stellen > 0 ? '7,2' : '140'}.
                </p>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="knopf"
          disabled={eingaben.every((e) => !e) && !zielId}
          onClick={leere}
        >
          Leeren
        </button>
      </div>

      {groesse.id === 'bmi' && <BmiRechner uebernimm={(bmi) => setze(0, bmi)} />}

      {groesse.ziele && (
        <div className="wert__ziele">
          <h3>Persönliches Ziel{groesse.nurZiel ? ' (nach Risiko)' : ''}</h3>
          <div>
            {groesse.ziele.map((z) => (
              <button
                key={z.id}
                type="button"
                className="knopf"
                aria-pressed={zielId === z.id}
                onClick={() => setzeZiel(z.id)}
              >
                {groesse.nurZiel ? `${z.name}: ${z.text}` : z.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="wert__spickzettel">
        <h3>
          {lage.urteil ? `Einordnung: ${lage.urteil.name}` : 'Bereiche'}
          {lage.imZiel === true && ' · Ziel erreicht'}
          {lage.imZiel === false && ' · Ziel noch nicht erreicht'}
        </h3>
        {groesse.teile.map((teil, i) => (
          <p key={teil.id}>
            {groesse.teile.length > 1 && <strong>{teil.name}: </strong>}
            {bereicheVon(groesse, i, lage.ziel)
              .map((b, nr, alle) =>
                nr < alle.length - 1
                  ? `${b.name} bis ${zeigeZahl(b.bis, Number.isInteger(b.bis) ? 0 : 1)}`
                  : b.name,
              )
              .join(' · ')}
          </p>
        ))}
        <ul>
          {groesse.saetze.map((satz) => (
            <li key={satz}>{satz}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Rechnet den BMI aus Gewicht und Größe und trägt ihn ein. Die beiden Angaben bleiben hier. */
function BmiRechner({ uebernimm }: { uebernimm: (bmi: string) => void }) {
  const id = useId();
  const [kg, setKg] = useState('');
  const [cm, setCm] = useState('');

  const rechne = (gewicht: string, groesse: string) => {
    const g = liesZahl(gewicht);
    const h = liesZahl(groesse);
    if (g && h && h > 80 && h < 250) {
      uebernimm(zeigeZahl(g / (h / 100) ** 2, 1));
    }
  };

  return (
    <div className="wert__rechner">
      <div className="wert__feld">
        <label htmlFor={`${id}-kg`}>Gewicht</label>
        <span className="wert__kasten">
          <input
            id={`${id}-kg`}
            inputMode="decimal"
            autoComplete="off"
            value={kg}
            onChange={(e) => {
              setKg(e.target.value);
              rechne(e.target.value, cm);
            }}
          />
          <span aria-hidden="true">kg</span>
        </span>
      </div>
      <div className="wert__feld">
        <label htmlFor={`${id}-cm`}>Größe</label>
        <span className="wert__kasten">
          <input
            id={`${id}-cm`}
            inputMode="decimal"
            autoComplete="off"
            value={cm}
            onChange={(e) => {
              setCm(e.target.value);
              rechne(kg, e.target.value);
            }}
          />
          <span aria-hidden="true">cm</span>
        </span>
      </div>
      <p>Aus Gewicht und Größe wird der BMI berechnet und oben eingetragen.</p>
    </div>
  );
}
