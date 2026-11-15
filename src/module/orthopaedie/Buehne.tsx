import '../anatomie/buehne.css';
import './buehne.css';
import { TriangleAlert } from 'lucide-react';
import type { BuehneProps } from '../../kern/typen';
import type { Blicklage, OrthopaedieZustand } from './index';
import {
  EVIDENZ,
  bildgebungVon,
  findeKrankheitsbild,
  findeUebung,
  seitenVon,
  uebungenVon,
  type Evidenz,
  type Krankheitsbild,
  type Uebung,
} from './daten';
import { findeZeichnung } from './bilder';
import { findeFigur } from './figuren';
import { BLICKE, findeRegion, findeStruktur, QUELLE } from '../anatomie/daten';
import Modell from '../anatomie/Modell';
import { Aufnahmen } from '../../buehne/Aufnahmen';

const verzoegert = (i: number, start = 140) => ({ animationDelay: `${start + i * 90}ms` });

export function Buehne({ zustand, vorschau }: BuehneProps<OrthopaedieZustand>) {
  const bild = findeKrankheitsbild(zustand.thema);
  const uebung = findeUebung(zustand.uebung);

  if (!bild && uebung) {
    return (
      <div className="orthobuehne">
        <UebungGross key={uebung.id} uebung={uebung} />
      </div>
    );
  }

  if (!bild) {
    return (
      <div className="orthobuehne">
        <p className="orthobuehne__frage">Schauen wir uns an, was da wehtut.</p>
      </div>
    );
  }

  const seiten = seitenVon(bild);
  const nr = Math.min(Math.max(zustand.seite, 0), seiten.length - 1);
  const art = seiten[nr].id;

  return (
    <div className="orthobuehne">
      <article className="orthoblatt" data-art={art}>
        <header className="orthoblatt__kopf">
          <h2 data-lang={bild.name.length >= 26}>{bild.name}</h2>
          {bild.zusatz && <p className="orthoblatt__zusatz">{bild.zusatz}</p>}
        </header>

        {/* key: Beim Blättern läuft nur der Inhalt neu ein, Kopf und Wegleiste bleiben stehen. */}
        <div className="orthoblatt__inhalt" key={art}>
          {art === 'was' && <Vergleich bild={bild} saetze={bild.was} titel={seiten[nr].titel} />}
          {art === 'ursachen' && (
            <Vergleich bild={bild} saetze={bild.ursachen} titel={seiten[nr].titel} />
          )}
          {art === 'modell' && <ImModell bild={bild} blick={zustand.blick} vorschau={vorschau} />}
          {art === 'bild' && <ImBild bild={bild} />}
          {art === 'hilft' && <WasHilft bild={bild} />}
          {art === 'uebungen' &&
            (uebung ? <UebungGross key={uebung.id} uebung={uebung} /> : <Uebungen bild={bild} />)}
        </div>

        <ol
          className="orthoweg"
          aria-label="Seiten dieser Erklärung"
          style={{ gridTemplateColumns: `repeat(${seiten.length}, 1fr)` }}
        >
          {seiten.map((s, i) => (
            <li key={s.id} data-lage={i === nr ? 'hier' : i < nr ? 'war' : 'kommt'}>
              {s.kurz}
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}

/** Text mit Aufzählung; key auf dem Block, damit beim Blättern nur er neu einläuft. */
function Saetze({ titel, saetze }: { titel: string; saetze: string[] }) {
  return (
    <div className="orthotext" key={titel}>
      <h3>{titel}</h3>
      <ul className="orthotext__saetze" data-viele={saetze.length > 4}>
        {saetze.map((satz, i) => (
          <li key={satz} style={verzoegert(i)}>
            {satz}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Vergleich({ bild, saetze, titel }: { bild: Krankheitsbild; saetze: string[]; titel: string }) {
  const Zeichnung = findeZeichnung(bild.id);
  return (
    <div className="orthozwei" data-bild={Boolean(Zeichnung)}>
      {Zeichnung && (
        <div className="orthozwei__zeichnung">
          <Zeichnung />
        </div>
      )}
      <Saetze titel={titel} saetze={saetze} />
    </div>
  );
}

function ImModell({
  bild,
  blick,
  vorschau,
}: {
  bild: Krankheitsbild;
  blick: Blicklage | null;
  vorschau: boolean;
}) {
  const lage = startBlick(bild);
  const region = findeRegion(bild.modell.region);
  const struktur = findeStruktur(region, bild.modell.struktur);
  if (!region) return <Saetze titel="Wo genau?" saetze={bild.modell.saetze} />;
  const b = blick ?? lage;
  return (
    <div className="orthomodell">
      <div className="orthomodell__flaeche">
        <Modell
          key={bild.id}
          fokus={bild.modell.fokus}
          region={region}
          struktur={struktur?.id ?? null}
          aus={bild.modell.aus ?? []}
          drehY={b.drehY}
          neigX={b.neigX}
          zoom={b.zoom}
          vorschau={vorschau}
          beschriftung={struktur?.name}
        />
      </div>
      <div>
        <Saetze titel="Wo genau?" saetze={bild.modell.saetze} />
        <p className="orthoquelle">{QUELLE}</p>
      </div>
    </div>
  );
}

/** Blick, mit dem das Modell eines Krankheitsbilds startet. */
export function startBlick(bild: Krankheitsbild): Blicklage {
  const region = findeRegion(bild.modell.region);
  const struktur = findeStruktur(region, bild.modell.struktur);
  const name = bild.modell.blick ?? struktur?.blick ?? region?.startBlick ?? 'vorn';
  const b = BLICKE[name];
  return { drehY: b.drehY, neigX: b.neigX, zoom: bild.modell.zoom ?? 1.2 };
}

function ImBild({ bild }: { bild: Krankheitsbild }) {
  const gebung = bildgebungVon(bild.id);
  if (!gebung) return null;
  return (
    <div className="orthobild">
      <Aufnahmen gebung={gebung} ordner="orthopaedie" />
      <Saetze titel="So sieht es im Bild aus" saetze={gebung.saetze} />
    </div>
  );
}

const STUFEN: Evidenz[] = ['gut', 'moeglich', 'unklar', 'abraten'];

/** Kleines Maß: drei Balken, je nach Beleglage gefüllt; „eher nicht“ ist durchgestrichen. */
export function Belegmass({ evidenz }: { evidenz: Evidenz }) {
  const voll = { gut: 3, moeglich: 2, unklar: 1, abraten: 0 }[evidenz];
  return (
    <span className="belegmass" data-evidenz={evidenz} aria-label={EVIDENZ[evidenz].name}>
      {[0, 1, 2].map((i) => (
        <i key={i} data-voll={i < voll} />
      ))}
    </span>
  );
}

function WasHilft({ bild }: { bild: Krankheitsbild }) {
  let zeile = 0;
  return (
    <div className="orthohilft">
      <div className="orthohilft__kopf">
        <h3>Was hilft?</h3>
        <p style={verzoegert(0, 80)}>{bild.verlauf}</p>
      </div>
      <div className="orthohilft__gruppen">
        {STUFEN.map((stufe) => {
          const liste = bild.therapien.filter((t) => t.evidenz === stufe);
          if (liste.length === 0) return null;
          return (
            <section key={stufe} className="orthohilft__gruppe" data-evidenz={stufe}>
              <h4>
                <Belegmass evidenz={stufe} />
                {EVIDENZ[stufe].name}
              </h4>
              <ul>
                {liste.map((t) => (
                  <li key={t.name} style={verzoegert(zeile++, 200)}>
                    <strong>{t.name}</strong>
                    <span>{t.text}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Uebungen({ bild }: { bild: Krankheitsbild }) {
  const liste = uebungenVon(bild);
  return (
    <div className="orthouebungen">
      <div className="orthouebungen__kopf">
        <h3>Das können Sie selbst tun</h3>
        {bild.alltag.map((satz, i) => (
          <p key={satz} style={verzoegert(i, 80)}>
            {satz}
          </p>
        ))}
      </div>
      <ul className="orthouebungen__liste" data-anzahl={liste.length}>
        {liste.map((u, i) => {
          const Figur = findeFigur(u.id);
          return (
            <li key={u.id} style={verzoegert(i, 200)}>
              <div className="orthouebungen__figur">{Figur && <Figur />}</div>
              <strong>{u.name}</strong>
              <span>{u.dosis}</span>
            </li>
          );
        })}
      </ul>
      <p className="orthowarnung" style={verzoegert(liste.length, 260)}>
        <TriangleAlert size={34} strokeWidth={1.75} aria-hidden="true" />
        <span>{bild.warnung}</span>
      </p>
    </div>
  );
}

function UebungGross({ uebung }: { uebung: Uebung }) {
  const Figur = findeFigur(uebung.id);
  return (
    <div className="orthoeinzel">
      <div className="orthoeinzel__figur">{Figur && <Figur />}</div>
      <div className="orthoeinzel__text">
        <h3>{uebung.name}</h3>
        <p className="orthoeinzel__ziel">{uebung.ziel}</p>
        <p className="orthoeinzel__ausgang">{uebung.ausgang}</p>
        <ol>
          {uebung.schritte.map((s, i) => (
            <li key={s} style={verzoegert(i, 200)}>
              {s}
            </li>
          ))}
        </ol>
        <p className="orthoeinzel__dosis">{uebung.dosis}</p>
        {uebung.achtung && <p className="orthoeinzel__achtung">{uebung.achtung}</p>}
      </div>
    </div>
  );
}
