import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/merriweather/400.css';
import '@fontsource/merriweather/700.css';
import './stil/grund.css';
import { starteSitzung } from './kern/sitzung';
import { bestimmeRaum } from './kern/raum';
import { bestimmeModus } from './kern/modus';
import { TabletAnsicht } from './tablet/TabletAnsicht';
import { aktuelleSeite } from './kern/pfad';
import { MARKE } from './kern/marke';
import { Info } from './info/Info';
import { ArztAnsicht } from './arzt/ArztAnsicht';
import { BuehnenAnsicht } from './buehne/BuehnenAnsicht';
import { Korrektur } from './module/aufklaerungen/Korrektur';
import { Korrektur as MedikamentenKorrektur } from './module/medikamente/Korrektur';
import { Handzettel } from './handzettel/Handzettel';
import { Uebungsblatt } from './module/orthopaedie/Uebungsblatt';
import { Lagerungsblatt } from './module/aufklaerungen/Lagerungsblatt';

// Eine App, zwei Gesichter:  /  = Steuerung (Arzt),  /buehne = Patientenbildschirm.
// Im Tablet-Modus (kern/modus.ts, im Gerät gemerkt) zeigt  /  stattdessen Auswahl und Bühne
// auf einem einzigen Bildschirm.
// Dazu /korrektur und /korrektur-medikamente: alle Texte zum Gegenlesen, ohne Sitzung,
// und /info: Zweck, Quellen und Lizenzen. Alle Pfade gelten relativ zum Ort der App (kern/pfad.ts).
const pfad = aktuelleSeite();
const wurzel = createRoot(document.getElementById('app')!);

if (pfad === '/handzettel') {
  // Der Handzettel zum Mitgeben: liest, was das Arztfenster dieses Raums gezeigt hat.
  document.title = `${MARKE.app} – Handzettel`;
  wurzel.render(
    <StrictMode>
      <Handzettel raum={bestimmeRaum()} />
    </StrictMode>,
  );
} else if (pfad === '/uebungsblatt') {
  // Übungsblatt der Orthopädie: frei zusammengestellte Übungen zum Mitgeben.
  document.title = `${MARKE.app} – Übungsblatt`;
  wurzel.render(
    <StrictMode>
      <Uebungsblatt raum={bestimmeRaum()} />
    </StrictMode>,
  );
} else if (pfad === '/lagerungsblatt') {
  // Übungsblatt zum Lagerungsschwindel: ein Befreiungsmanöver für das betroffene Ohr.
  document.title = `${MARKE.app} – Übungsblatt Lagerungsschwindel`;
  wurzel.render(
    <StrictMode>
      <Lagerungsblatt raum={bestimmeRaum()} />
    </StrictMode>,
  );
} else if (pfad === '/info') {
  // Zweck, Quellen und Lizenzen, in der öffentlichen Fassung auch das Impressum.
  document.title = `${MARKE.app} – Quellen und Hinweise`;
  wurzel.render(
    <StrictMode>
      <Info />
    </StrictMode>,
  );
} else if (pfad === '/korrektur' || pfad === '/korrektur-medikamente') {
  document.title = `${MARKE.app} – Korrektur`;
  wurzel.render(
    <StrictMode>{pfad === '/korrektur' ? <Korrektur /> : <MedikamentenKorrektur />}</StrictMode>,
  );
} else if (pfad === '' && bestimmeModus() === 'tablet') {
  document.documentElement.dataset.ansicht = 'tablet';
  wurzel.render(
    <StrictMode>
      <TabletAnsicht raum={bestimmeRaum()} />
    </StrictMode>,
  );
} else {
  const istBuehne = pfad === '/buehne';
  const sitzung = starteSitzung(istBuehne ? 'buehne' : 'arzt', bestimmeRaum());

  document.title = `${MARKE.app} – ${istBuehne ? 'Patientenbildschirm' : 'Steuerung'}`;
  document.documentElement.dataset.ansicht = istBuehne ? 'buehne' : 'arzt';

  wurzel.render(
    <StrictMode>
      {istBuehne ? <BuehnenAnsicht sitzung={sitzung} /> : <ArztAnsicht sitzung={sitzung} />}
    </StrictMode>,
  );
}
