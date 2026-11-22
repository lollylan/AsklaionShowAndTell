import './buehne.css';
import '../sprachen/sprachwahl.css';
import { useEffect, useRef } from 'react';
import type { SitzungsZustand } from '../kern/typen';
import { findeModul, modulZustand } from '../kern/register';
import { Fehlergrenze } from '../kern/Fehlergrenze';
import { useUebersetzung } from '../sprachen/uebersetzer';
import { BUEHNE_BREITE, BUEHNE_HOEHE, Leinwand } from './Leinwand';
import { Ruhebild } from './Ruhebild';

interface Props {
  zustand: SitzungsZustand;
  /** true in der kleinen Vorschau des Arztfensters. */
  vorschau: boolean;
  /** Meldet die Texte, die in der gewählten Sprache noch fehlen (stehen auf Deutsch). */
  beiFehlend?: (texte: string[]) => void;
  /** Tablet-Modus: Die Bühne darf den Zustand ihres Moduls selbst ändern (Modell drehen). */
  beiAenderung?: (aenderung: object | ((alt: object) => object)) => void;
}

/** Der eigentliche Bühneninhalt – identisch für Patientenbildschirm und Vorschau. */
export function BuehnenInhalt({ zustand, vorschau, beiFehlend, beiAenderung }: Props) {
  const modul = zustand.verdeckt ? undefined : findeModul(zustand.aktivesModul);
  const raum = useRef<HTMLDivElement>(null);
  const fehlend = useUebersetzung(raum, zustand.sprache ?? 'de');

  useEffect(() => beiFehlend?.(fehlend), [fehlend, beiFehlend]);

  return (
    <Leinwand>
      {/* Sprachraum ohne eigene Box (display: contents), trägt lang und Richtung. */}
      <div ref={raum} className="sprachraum" data-sprachraum="">
        {/* key: Beim Wechsel wird die Szene neu aufgebaut und blendet weich ein. */}
        <div key={modul?.id ?? 'ruhebild'} className="szene">
          {modul ? (
            <Fehlergrenze ersatz={<Ruhebild />}>
              <modul.Buehne
                zustand={modulZustand(zustand, modul)}
                vorschau={vorschau}
                aendern={beiAenderung}
              />
            </Fehlergrenze>
          ) : (
            <Ruhebild />
          )}
        </div>
      </div>
      {zustand.zeiger && !zustand.verdeckt && (
        <span
          className="zeiger"
          style={{ left: zustand.zeiger.x * BUEHNE_BREITE, top: zustand.zeiger.y * BUEHNE_HOEHE }}
          aria-hidden="true"
        />
      )}
    </Leinwand>
  );
}
