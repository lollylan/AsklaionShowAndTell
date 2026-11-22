import { useEffect, useRef, useState } from 'react';
import { ListPlus, Play } from 'lucide-react';
import { zerlege, type Fundstelle } from '../kern/verzeichnis';

interface Props {
  fund: Fundstelle;
  /** Bisherige Eingaben zu diesem Thema, falls es welche gibt. */
  bisher: object | undefined;
  /** 'zeigen': danach läuft das Thema sofort; 'ablauf': es kommt in den Ablauf; 'aendern': nur übernehmen. */
  zweck: 'zeigen' | 'ablauf' | 'aendern';
  beiFertig: (zustand: object) => void;
  beiAbbruch: () => void;
}

/**
 * Fragt vor dem Zeigen ab, was ein Thema braucht (z. B. den Messwert und das Ziel). Ein Dialog,
 * weil die Eingabe abgeschlossen sein soll, bevor der Patient etwas sieht.
 */
export function Vorgabe({ fund, bisher, zweck, beiFertig, beiAbbruch }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { modul, eintrag } = fund;
  const verzeichnis = modul.verzeichnis!;
  const Eingabe = verzeichnis.Vorgabe!;
  const [zustand, setZustand] = useState<object>(() =>
    verzeichnis.oeffne(zerlege(fund.schluessel).eintragId, bisher ?? modul.startZustand),
  );

  useEffect(() => {
    const element = dialog.current;
    if (element && !element.open) element.showModal();
  }, []);

  return (
    <dialog ref={dialog} className="tab__dialog" aria-labelledby="tab-dialog-titel" onClose={beiAbbruch}>
      <form
        method="dialog"
        onSubmit={(e) => {
          e.preventDefault();
          beiFertig(zustand);
        }}
      >
        <h2 id="tab-dialog-titel">{eintrag.titel}</h2>
        <p className="tab__dialogzusatz">
          Vor dem Zeigen eintragen. Ohne Wert erscheint nur die Skala; gespeichert wird nichts.
        </p>

        <Eingabe
          id={eintrag.id}
          zustand={zustand}
          aendern={(aenderung) =>
            setZustand((alt) =>
              typeof aenderung === 'function' ? aenderung(alt) : { ...alt, ...aenderung },
            )
          }
        />

        <div className="tab__dialogfuss">
          <button type="button" className="knopf" onClick={beiAbbruch}>
            Abbrechen
          </button>
          <button type="submit" className="knopf knopf--haupt">
            {zweck === 'zeigen' && <Play size={18} strokeWidth={1.75} aria-hidden="true" />}
            {zweck === 'ablauf' && <ListPlus size={18} strokeWidth={1.75} aria-hidden="true" />}
            {zweck === 'zeigen' ? 'Zeigen' : zweck === 'ablauf' ? 'In den Ablauf' : 'Übernehmen'}
          </button>
        </div>
      </form>
    </dialog>
  );
}
