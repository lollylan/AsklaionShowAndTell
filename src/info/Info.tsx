import './info.css';
import { ExternalLink } from 'lucide-react';
import { LOGO, MARKE, ZWECK } from '../kern/marke';
import { IST_DEMO, gibtEs, seite } from '../kern/pfad';
import { LAENDER, QUELLEN } from '../module/reiseimpfung/daten';
import { ALLE_STECKBRIEFE, STECKBRIEF_QUELLEN, TIPP_QUELLE } from '../module/reiseimpfung/steckbriefe';
import { AUSBRUCH_QUELLEN, CRM_QUELLE } from '../module/reiseimpfung/ausbrueche';
import { QUELLE, QUELLE_HRA } from '../module/anatomie/quellen';
import aufklaerungen from '../module/aufklaerungen/bildgebung.json';
import orthopaedie from '../module/orthopaedie/bildgebung.json';
import { MANOEVER } from '../module/aufklaerungen/manoever';

// Zweck, Quellen und Lizenzen (/info). Die Listen entstehen aus den Lizenzangaben, die ohnehin
// bei den Daten stehen – wer ein Bild ergänzt, ergänzt damit auch diese Seite.

interface Nachweis {
  titel: string;
  urheber: string;
  lizenz: string;
  quelle: string;
}

type Bildgebung = Record<string, { aufnahmen: Array<Nachweis & { datei: string }> }>;

const aufnahmen = (daten: Bildgebung): Nachweis[] =>
  Object.values(daten).flatMap((eintrag) => eintrag.aufnahmen);

const BEFUNDBILDER: Nachweis[] = [
  ...aufnahmen(aufklaerungen as unknown as Bildgebung),
  ...aufnahmen(orthopaedie as unknown as Bildgebung),
];

const LAENDERFOTOS: Array<{ land: string; fotos: Nachweis[] }> = LAENDER.map((land) => ({
  land: land.name,
  fotos: (ALLE_STECKBRIEFE[land.iso3]?.wahrzeichen ?? []).map((w) => ({
    titel: w.name ?? 'Ohne Titel',
    urheber: w.urheber,
    lizenz: w.lizenz,
    quelle: w.quelle,
  })),
})).filter((eintrag) => eintrag.fotos.length > 0);

const KI_BILDER = gibtEs('/bilder/krankheiten/') || gibtEs('/bilder/orthopaedie/uebungen/');

function Nachweisliste({ eintraege }: { eintraege: Nachweis[] }) {
  return (
    <ul className="info__nachweise">
      {eintraege.map((n) => (
        <li key={n.quelle + n.titel}>
          <a href={n.quelle} target="_blank" rel="noreferrer">
            {n.titel}
          </a>
          <span>
            {n.urheber || 'Urheber siehe Quelle'} · {n.lizenz}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Info() {
  const fotoZahl = LAENDERFOTOS.reduce((summe, e) => summe + e.fotos.length, 0);

  return (
    <div className="info">
      <main className="info__blatt">
        <header className="info__kopf">
          <img src={LOGO} alt="" />
          <div>
            <h1>{MARKE.name}</h1>
            <p>{MARKE.zusatz}</p>
          </div>
          <a className="knopf" href={seite('/')}>
            Zur Steuerung
          </a>
        </header>

        <section aria-labelledby="info-zweck">
          <h2 id="info-zweck">Wozu die App dient</h2>
          <p>
            Die App unterstützt das ärztliche Aufklärungsgespräch: Die Ärztin oder der Arzt wählt
            an der Steuerung aus, was der Patient auf seinem Bildschirm sieht – Zeichnungen,
            Modelle, Erklärtexte, Karten. Sie erklärt Zusammenhänge in Patientensprache.
          </p>
          <p className="info__zweck">{ZWECK}</p>
          <p>
            Die App erhebt keine Befunde, wertet keine Patientendaten aus und schlägt keine
            Behandlung vor. Altersangaben bei Impfungen und Vorsorge geben den öffentlichen
            Impfkalender der STIKO und die Früherkennungsrichtlinien des G-BA wieder, vereinfacht
            und ohne Gewähr für Aktualität. Was im Einzelfall richtig ist, entscheiden Ärztin oder
            Arzt und Patient gemeinsam.
          </p>
          {IST_DEMO && (
            <p>
              Dies ist eine Demo zum Ausprobieren. Sie speichert nichts auf einem Server: Die
              Sitzung bleibt im Browser, Steuerung und Patientenfenster verständigen sich direkt
              miteinander. Bitte keine echten Patientendaten eingeben.
            </p>
          )}
        </section>

        <section aria-labelledby="info-quellen">
          <h2 id="info-quellen">Quellen und Lizenzen</h2>

          <h3>Texte und Zeichnungen</h3>
          <p>
            Die Erklärtexte und die Schemazeichnungen sind eigene Arbeiten. Sie sind bewusst
            vereinfacht.
            {KI_BILDER &&
              ' Die Symbolbilder zu Krankheiten und Impfungen sowie die Übungsbilder wurden mit einem KI-Bildgenerator erzeugt (kie.ai, Nano Banana 2).'}
          </p>

          <h3>3D-Modelle</h3>
          <ul className="info__liste">
            <li>{QUELLE}. Die daraus abgeleiteten Modelle stehen unter derselben Lizenz.</li>
            <li>{QUELLE_HRA}.</li>
          </ul>

          <h3>Länder, Karten, Klima</h3>
          <ul className="info__liste">
            <li>Grunddaten: {STECKBRIEF_QUELLEN.grunddaten}.</li>
            <li>{STECKBRIEF_QUELLEN.zahlen}.</li>
            <li>Städte: {STECKBRIEF_QUELLEN.orte}. Ländergrenzen: world-atlas nach Natural Earth (gemeinfrei).</li>
            <li>Klima: {QUELLEN.klima} (CC BY 4.0).</li>
            <li>Flaggen: Wikimedia Commons.</li>
            <li>Reisetipps: {TIPP_QUELLE}</li>
            <li>Ausbrüche: {AUSBRUCH_QUELLEN}</li>
            <li>
              Verlinkt, nicht enthalten: {CRM_QUELLE}; Faktenblätter des Robert Koch-Instituts.
            </li>
            {QUELLEN.impfungen && <li>Impfungen je Land: {QUELLEN.impfungen} (RKI, CC BY 4.0).</li>}
            {QUELLEN.malaria && <li>Malaria je Land: {QUELLEN.malaria}.</li>}
          </ul>

          <h3>Befundbilder</h3>
          <p>
            Röntgen-, Ultraschall- und andere Aufnahmen stammen von Wikimedia Commons. Bearbeitungen
            (Zuschnitt, Kontrast) stehen bei der Lizenz.
          </p>
          <Nachweisliste eintraege={BEFUNDBILDER} />

          <h3>Befreiungsmanöver beim Lagerungsschwindel</h3>
          <p>
            Grafiken von Wikimedia Commons, in die Farben der App umgefärbt und für das andere Ohr
            gespiegelt. Bearbeitungen stehen unter derselben Lizenz. Das Sémont-Manöver ist eine
            eigene Zeichnung.
          </p>
          <Nachweisliste
            eintraege={MANOEVER.flatMap((m) =>
              m.grafik.quelle
                ? [
                    {
                      titel: m.name,
                      urheber: m.grafik.urheber,
                      lizenz: m.grafik.lizenz,
                      quelle: m.grafik.quelle,
                    },
                  ]
                : [],
            )}
          />

          <h3>Fotos zu den Ländern</h3>
          <p>
            {fotoZahl} Fotos von Wikimedia Commons, verkleinert und zugeschnitten. Urheber und Lizenz
            stehen auch direkt am Bild.
          </p>
          {LAENDERFOTOS.map((eintrag) => (
            <details key={eintrag.land} className="info__land">
              <summary>
                {eintrag.land} <span>{eintrag.fotos.length}</span>
              </summary>
              <Nachweisliste eintraege={eintrag.fotos} />
            </details>
          ))}

          <h3>Schrift, Symbole, Software</h3>
          <p>
            Merriweather (SIL Open Font License), Lucide Icons (ISC), React, three.js und jsPDF
            (MIT), d3-geo und topojson (ISC).
          </p>
        </section>

        {IST_DEMO && (
          <section aria-labelledby="info-impressum">
            <h2 id="info-impressum">Impressum</h2>
            <address>
              Dr. Florian Rasche
              <br />
              Huttenstr. 6
              <br />
              97072 Würzburg
            </address>
            <p>
              <a href="mailto:florian.rasche+asklaion@googlemail.com">
                florian.rasche+asklaion@googlemail.com
              </a>
            </p>
            <p>
              <a className="info__extern" href="https://asklaion.de" target="_blank" rel="noreferrer">
                asklaion.de
                <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
