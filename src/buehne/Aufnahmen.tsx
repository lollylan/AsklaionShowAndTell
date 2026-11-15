import './aufnahmen.css';
import { useState, type SyntheticEvent } from 'react';
import { datei } from '../kern/pfad';

// Echte Bilder (Röntgen, Ultraschall, Fotos …) mit Markierungen für die Bühne. Gemeinsam genutzt
// von Orthopädie und Aufklärungen; die Daten stehen jeweils in <modul>/bildgebung.json, die Bilder
// unter public/bilder/<modul>/ (geladen mit werkzeuge/lade_bildgebung.py).

export type Aufnahmeart =
  | 'Röntgen'
  | 'MRT'
  | 'CT'
  | 'Ultraschall'
  | 'Endoskopie'
  | 'Angiografie'
  | 'Mikroskop'
  | 'Foto'
  | 'EKG';

/** Ein Bild aus einer freien Quelle (meist Wikimedia Commons). */
export interface Aufnahme {
  /** Dateiname unter public/bilder/<modul>/. */
  datei: string;
  /** Überschrift über dem Bild, z. B. „Gesundes Knie“ oder „Arthrose“. */
  titel: string;
  art: Aufnahmeart;
  urheber: string;
  lizenz: string;
  /** Seite der Quelle (Wikimedia Commons). */
  quelle: string;
  /** Markierungen im Bild: Lage als Anteil der Bildbreite/-höhe (0 bis 1), kurzer Text. */
  marken?: { x: number; y: number; text: string }[];
}

export interface Bildgebung {
  /** Ein oder zwei Aufnahmen (bei zweien: links gesund, rechts erkrankt). */
  aufnahmen: Aufnahme[];
  /** Zwei bis drei Sätze: was man sieht und wofür man das Bild (nicht) braucht. */
  saetze: string[];
}

const verzoegert = (i: number, start: number) => ({ animationDelay: `${start + i * 90}ms` });

/** Die Aufnahmen nebeneinander, darunter jeweils Urheber und Lizenz. */
export function Aufnahmen({ gebung, ordner }: { gebung: Bildgebung; ordner: string }) {
  const zwei = gebung.aufnahmen.length > 1;
  // Sehr breite Bilder (EKG-Streifen) stehen bei zweien untereinander statt nebeneinander.
  const [quer, setQuer] = useState(false);
  const gemessen = (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: b, naturalHeight: h } = e.currentTarget;
    if (h > 0 && b / h > 2.2) setQuer(true);
  };
  return (
    <div className="aufnahmen" data-zwei={zwei} data-quer={zwei && quer}>
      {gebung.aufnahmen.map((a, i) => (
        <figure key={a.datei} className="aufnahme" style={verzoegert(i, 60)}>
          <figcaption data-krank={zwei && i === gebung.aufnahmen.length - 1}>
            {a.titel}
            <span>{a.art}</span>
          </figcaption>
          <div className="aufnahme__rahmen">
            <img
              src={datei(`/bilder/${ordner}/${a.datei}`)}
              alt={`${a.art}: ${a.titel}`}
              onLoad={gemessen}
            />
            {a.marken?.map((m, j) => (
              <span
                key={m.text}
                className="bildmarke"
                data-lage={m.x < 0.34 ? 'links' : m.x > 0.66 ? 'rechts' : 'mitte'}
                data-oben={obenBeschriften(m.y, a.marken!)}
                style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%`, ...verzoegert(j, 700) }}
              >
                <span>{m.text}</span>
              </span>
            ))}
          </div>
          <p className="aufnahme__quelle">
            {a.urheber}, {a.lizenz}, Wikimedia Commons
          </p>
        </figure>
      ))}
    </div>
  );
}

/**
 * Beschriftung über dem Ring statt darunter: ganz unten im Bild, und bei mehreren Marken die
 * oberste (damit sich zwei Beschriftungen nicht überdecken), solange sie nicht am oberen Rand sitzt.
 */
function obenBeschriften(y: number, marken: { y: number }[]): boolean {
  if (y > 0.78) return true;
  return marken.length > 1 && y === Math.min(...marken.map((n) => n.y)) && y > 0.2;
}
