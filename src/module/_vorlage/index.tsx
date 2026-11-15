// VORLAGE FÜR EIN NEUES MODUL
//
// 1. Diesen Ordner kopieren und umbenennen, z. B. src/module/blutdruck
//    (ohne Unterstrich am Anfang – Ordner mit Unterstrich werden ignoriert).
// 2. id, titel und beschreibung unten anpassen.
// 3. Fertig: Das Modul erscheint von selbst in der linken Leiste.
//
// Ein Modul besteht aus drei Dingen:
//   - Zustand:   was gerade gezeigt wird (reines JSON)
//   - Steuerung: die Bedienelemente auf dem Arztbildschirm
//   - Buehne:    die Darstellung auf dem Patientenbildschirm (1920 × 1080 px)
//
// Größere Module teilen sich wie „reiseimpfung“ auf mehrere Dateien auf.

import { Presentation } from 'lucide-react';
import { definiereModul, type BuehneProps, type SteuerungProps } from '../../kern/typen';

interface VorlageZustand {
  schritt: number;
}

const SCHRITTE = ['Erster Schritt', 'Zweiter Schritt', 'Dritter Schritt'];

function Steuerung({ zustand, aendern }: SteuerungProps<VorlageZustand>) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {SCHRITTE.map((name, i) => (
        <button
          key={name}
          type="button"
          className="knopf"
          aria-pressed={zustand.schritt === i}
          onClick={() => aendern({ schritt: i })}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

function Buehne({ zustand }: BuehneProps<VorlageZustand>) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
      <p style={{ fontFamily: 'var(--schrift-titel)', fontSize: 120, fontWeight: 700 }}>
        {SCHRITTE[zustand.schritt]}
      </p>
    </div>
  );
}

export default definiereModul<VorlageZustand>({
  id: 'vorlage',
  titel: 'Vorlage',
  beschreibung: 'Ein Satz, der in der Modulübersicht steht.',
  symbol: Presentation,
  startZustand: { schritt: 0 },
  Steuerung,
  Buehne,
});
