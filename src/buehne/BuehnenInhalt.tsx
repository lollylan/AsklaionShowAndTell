import './buehne.css';
import type { SitzungsZustand } from '../kern/typen';
import { findeModul, modulZustand } from '../kern/register';
import { Fehlergrenze } from '../kern/Fehlergrenze';
import { BUEHNE_BREITE, BUEHNE_HOEHE, Leinwand } from './Leinwand';
import { Ruhebild } from './Ruhebild';

interface Props {
  zustand: SitzungsZustand;
  /** true in der kleinen Vorschau des Arztfensters. */
  vorschau: boolean;
}

/** Der eigentliche Bühneninhalt – identisch für Patientenbildschirm und Vorschau. */
export function BuehnenInhalt({ zustand, vorschau }: Props) {
  const modul = zustand.verdeckt ? undefined : findeModul(zustand.aktivesModul);

  return (
    <Leinwand>
      {/* key: Beim Wechsel wird die Szene neu aufgebaut und blendet weich ein. */}
      <div key={modul?.id ?? 'ruhebild'} className="szene">
        {modul ? (
          <Fehlergrenze ersatz={<Ruhebild />}>
            <modul.Buehne zustand={modulZustand(zustand, modul)} vorschau={vorschau} />
          </Fehlergrenze>
        ) : (
          <Ruhebild />
        )}
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
