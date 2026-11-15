// Die Seiten nach den Impfungen: Malariagebiete (nur Praxisfassung), Steckbrief, Karte,
// Reisetipps, Klima.
// Jede Seite füllt die ganze Bühne (1920 × 1080) und steht auf dunklem Petrol.

import './seiten.css';
import { useState } from 'react';
import {
  Banknote,
  Car,
  CloudLightning,
  GlassWater,
  HeartPulse,
  Landmark,
  MountainSnow,
  PawPrint,
  PlugZap,
  Scale,
  ShieldAlert,
  Shirt,
  Sun,
  Utensils,
  Wallet,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import type { Land } from './daten';
import { malariakartenFuer } from './ausbrueche';
import { PRIVAT } from './privat';
import { NUR_VON_HAND } from './auswahl';
import { Landkarte, type KartenAufbau } from './Landkarte';
import {
  einwohnerText,
  flaecheText,
  flaggePfad,
  groessenVergleich,
  sprachenText,
  steckbriefVon,
  tippsFuer,
  wahrzeichenPfad,
  type TippArt,
  type Wahrzeichen,
} from './steckbriefe';

export type Seite = 'impfungen' | 'malaria' | 'steckbrief' | 'karte' | 'tipps' | 'klima';

export const SEITEN: Array<{ id: Seite; name: string }> = [
  { id: 'impfungen', name: NUR_VON_HAND ? 'Themen' : 'Impfungen' },
  { id: 'malaria', name: 'Malariagebiete' },
  { id: 'steckbrief', name: 'Steckbrief' },
  { id: 'karte', name: 'Karte' },
  { id: 'tipps', name: 'Reisetipps' },
  { id: 'klima', name: 'Klima' },
];

/** Welche Seiten es für ein Land gibt (ohne Klimadaten keine Klimaseite usw.). */
export function seitenFuer(land: Land): Seite[] {
  const s = steckbriefVon(land.iso3);
  return SEITEN.map((x) => x.id).filter((id) => {
    if (id === 'steckbrief') return Boolean(s);
    if (id === 'tipps') return tippsFuer(land.iso3).length > 0;
    if (id === 'klima') return Boolean(land.klima);
    if (id === 'malaria') return malariakartenFuer(land.iso3).length > 0;
    return true;
  });
}

const HINTERGRUND: KartenAufbau = { breite: 1920, hoehe: 1080, rahmen: [200, 70, 1880, 1010] };
const KARTE: KartenAufbau = { breite: 1920, hoehe: 1080, rahmen: [170, 210, 1760, 990] };

const namensgroesse = (name: string) =>
  name.length <= 10 ? 100 : name.length <= 16 ? 80 : name.length <= 24 ? 62 : 50;

export function Laenderseite({
  land,
  seite,
  malariakarte = 0,
}: {
  land: Land;
  seite: Seite;
  malariakarte?: number;
}) {
  return (
    <div className="laenderseite" data-seite={seite}>
      {seite === 'malaria' && PRIVAT && (
        <PRIVAT.MalariaSeite land={land} karten={malariakartenFuer(land.iso3)} nummer={malariakarte} />
      )}
      {seite === 'steckbrief' && <SteckbriefSeite land={land} />}
      {seite === 'karte' && <KartenSeite land={land} />}
      {seite === 'tipps' && <TippSeite land={land} />}
      {seite === 'klima' && land.klima && <KlimaSeite land={land} />}
    </div>
  );
}

// ---------- Steckbrief ----------

function SteckbriefSeite({ land }: { land: Land }) {
  const s = steckbriefVon(land.iso3);
  if (!s) return null;
  const fakten: Array<[string, string, string?]> = [];
  if (s.hauptstadt) fakten.push(['Hauptstadt', s.hauptstadt]);
  if (s.einwohner) fakten.push(['Einwohner', einwohnerText(s.einwohner)]);
  if (s.flaeche) fakten.push(['Fläche', flaecheText(s.flaeche), groessenVergleich(s.flaeche)]);
  if (s.sprachen.length)
    fakten.push([s.sprachen.length === 1 ? 'Amtssprache' : 'Amtssprachen', sprachenText(s.sprachen)]);
  if (s.waehrungen.length) fakten.push(['Währung', s.waehrungen.slice(0, 2).join(', ')]);

  const fotos = s.wahrzeichen.slice(0, 2);

  return (
    <>
      <div className="seite__karte seite__karte--zart">
        <Landkarte land={land} art="hintergrund" aufbau={HINTERGRUND} />
      </div>
      <div className="seite__schleier seite__schleier--links" />

      <div className="steckbrief">
        {s.flagge && (
          <img className="steckbrief__flagge" src={flaggePfad(s.flagge)} alt={`Flagge von ${land.name}`} />
        )}
        <h2 className="seite__titel" style={{ fontSize: namensgroesse(land.name) }}>
          {land.name}
        </h2>
        <dl className="fakten">
          {fakten.map(([was, wert, zusatz], i) => (
            <div key={was} style={{ animationDelay: `${220 + i * 80}ms` }}>
              <dt>{was}</dt>
              <dd>
                {wert}
                {zusatz && <span className="fakten__zusatz">{zusatz}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {fotos.length > 0 && (
        <div className="wahrzeichen" data-anzahl={fotos.length}>
          {fotos.map((w, i) => (
            <Foto key={w.bild} foto={w} verzoegerung={260 + i * 160} />
          ))}
        </div>
      )}
    </>
  );
}

function Foto({ foto, verzoegerung }: { foto: Wahrzeichen; verzoegerung: number }) {
  const [da, setDa] = useState(true);
  if (!da) return null;
  return (
    <figure className="foto" style={{ animationDelay: `${verzoegerung}ms` }}>
      <img src={wahrzeichenPfad(foto.bild)} alt={foto.name ?? ''} onError={() => setDa(false)} />
      <figcaption>
        {foto.name && <span className="foto__name">{foto.name}</span>}
        <span className="foto__rechte">
          Foto: {kuerze(foto.urheber) || 'Wikimedia Commons'}
          {foto.lizenz && ` · ${foto.lizenz}`}
        </span>
      </figcaption>
    </figure>
  );
}

/** Urhebernamen auf Commons sind manchmal ganze Sätze – für die Bildzeile kürzen. */
const kuerze = (text: string) => (text.length > 60 ? `${text.slice(0, 57).trimEnd()} …` : text);

// ---------- Karte mit Städten ----------

function KartenSeite({ land }: { land: Land }) {
  const s = steckbriefVon(land.iso3);
  return (
    <>
      <div className="seite__karte">
        <Landkarte land={land} art="staedte" aufbau={KARTE} orte={s?.orte ?? []} />
      </div>
      <div className="seite__schleier seite__schleier--oben" />
      <header className="kartenkopf">
        <h2 className="seite__titel" style={{ fontSize: Math.min(namensgroesse(land.name), 76) }}>
          {land.name}
        </h2>
        {(s?.orte.length ?? 0) > 0 && <p className="kartenkopf__legende">
          <span className="kartenkopf__haupt" aria-hidden="true" />
          Hauptstadt
          <span className="kartenkopf__stadt" aria-hidden="true" />
          große Städte
        </p>}
      </header>
    </>
  );
}

// ---------- Reisetipps ----------

const SYMBOL: Record<TippArt, LucideIcon> = {
  sonne: Sun,
  diebstahl: Wallet,
  wasser: GlassWater,
  essen: Utensils,
  verkehr: Car,
  kleidung: Shirt,
  gesetz: Scale,
  natur: CloudLightning,
  tiere: PawPrint,
  geld: Banknote,
  gesundheit: HeartPulse,
  hoehe: MountainSnow,
  meer: Waves,
  strom: PlugZap,
  kultur: Landmark,
  sicherheit: ShieldAlert,
};

function TippSeite({ land }: { land: Land }) {
  const tipps = tippsFuer(land.iso3).slice(0, 6);
  return (
    <>
      <div className="seite__karte seite__karte--zart">
        <Landkarte land={land} art="hintergrund" aufbau={HINTERGRUND} />
      </div>
      <div className="seite__schleier seite__schleier--voll" />
      <div className="tipps">
        <h2 className="seite__titel tipps__titel">
          Gut zu wissen <span>für {land.name}</span>
        </h2>
        <ul className="tipps__liste" data-viele={tipps.length > 4}>
          {tipps.map((t, i) => {
            const Symbol = SYMBOL[t.art] ?? ShieldAlert;
            return (
              <li key={t.text} style={{ animationDelay: `${200 + i * 90}ms` }}>
                <span className="tipps__symbol">
                  <Symbol size={40} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="tipps__text">{t.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

// ---------- Klima ----------

const MONATE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
const MONATE_LANG = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

const KB = 1640; // Zeichenfläche
const KH = 520;

function KlimaSeite({ land }: { land: Land }) {
  const { t, n } = land.klima!;
  const runde = (wert: number) => Math.round(wert).toString().replace('-', '−');
  const spalte = KB / 12;
  const x = (m: number) => m * spalte + spalte / 2;

  // Regen unten als Säulen (bis 55 % der Höhe), Temperatur darüber als Linie.
  const regenMax = Math.max(...n, 80);
  const regenHoehe = (wert: number) => (wert / regenMax) * KH * 0.5;
  const tMin = Math.min(...t);
  const tMax = Math.max(...t);
  const spanne = Math.max(tMax - tMin, 14);
  const oben = KH * 0.06;
  const unten = KH * 0.5;
  const yTemp = (wert: number) =>
    unten - ((wert - (tMin + tMax) / 2 + spanne / 2) / spanne) * (unten - oben);
  const linie = t.map((w, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${yTemp(w).toFixed(1)}`).join(' ');

  const waermster = t.indexOf(tMax);
  const kaeltester = t.indexOf(tMin);
  const nassester = n.indexOf(Math.max(...n));
  const trockenster = n.indexOf(Math.min(...n));

  return (
    <div className="klimaseite">
      <h2 className="seite__titel klimaseite__titel">
        Klima <span>in {land.name}</span>
      </h2>
      <p className="klimaseite__hinweis">
        Monatsmittel im Durchschnitt des ganzen Landes, 1991–2020
        <span className="klimaseite__legende">
          <span className="klimaseite__marke klimaseite__marke--temp" aria-hidden="true" />
          Temperatur in °C
          <span className="klimaseite__marke klimaseite__marke--regen" aria-hidden="true" />
          Regen in mm pro Monat
        </span>
      </p>

      <svg className="klimagross" viewBox={`0 -20 ${KB} ${KH + 90}`} width={KB} role="img"
        aria-label={`Temperatur zwischen ${runde(tMin)} und ${runde(tMax)} Grad, am meisten Regen im ${MONATE_LANG[nassester]}`}>
        {n.map((wert, i) => {
          const h = regenHoehe(wert);
          return (
            <g key={`n${i}`}>
              <rect className="klimagross__regen" x={x(i) - 40} y={KH - h} width={80} height={Math.max(h, 2)} rx={6} />
              <text className="klimagross__mm" x={x(i)} y={KH - h - 14} textAnchor="middle">
                {Math.round(wert)}
              </text>
            </g>
          );
        })}
        <path className="klimagross__temp" d={linie} />
        {t.map((wert, i) => (
          <g key={`t${i}`}>
            <circle className="klimagross__punkt" cx={x(i)} cy={yTemp(wert)} r={9} />
            <text className="klimagross__grad" x={x(i)} y={yTemp(wert) - 24} textAnchor="middle">
              {runde(wert)}°
            </text>
          </g>
        ))}
        <line className="klimagross__achse" x1={0} y1={KH} x2={KB} y2={KH} />
        {MONATE.map((m, i) => (
          <text key={m} className="klimagross__monat" x={x(i)} y={KH + 52} textAnchor="middle">
            {m}
          </text>
        ))}
      </svg>

      <dl className="klimaseite__eckdaten">
        <div>
          <dt>
            <span className="klimaseite__marke klimaseite__marke--temp" aria-hidden="true" />
            Am wärmsten
          </dt>
          <dd>
            {MONATE_LANG[waermster]}, {runde(tMax)} °C
          </dd>
        </div>
        <div>
          <dt>
            <span className="klimaseite__marke klimaseite__marke--temp" aria-hidden="true" />
            Am kühlsten
          </dt>
          <dd>
            {MONATE_LANG[kaeltester]}, {runde(tMin)} °C
          </dd>
        </div>
        <div>
          <dt>
            <span className="klimaseite__marke klimaseite__marke--regen" aria-hidden="true" />
            Am meisten Regen
          </dt>
          <dd>
            {MONATE_LANG[nassester]}, {Math.round(n[nassester])} mm
          </dd>
        </div>
        <div>
          <dt>
            <span className="klimaseite__marke klimaseite__marke--regen" aria-hidden="true" />
            Am trockensten
          </dt>
          <dd>
            {MONATE_LANG[trockenster]}, {Math.round(n[trockenster])} mm
          </dd>
        </div>
      </dl>
    </div>
  );
}
