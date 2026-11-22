import './steuerung.css';
import type { SteuerungProps } from '../../kern/typen';
import type { WerteZustand } from './index';
import { findeMessgroesse } from './daten';
import { Eingabe } from './Steuerung';

/** Tablet-Modus: vor dem Zeigen den Wert des Patienten und sein Ziel eintippen. */
export function Vorgabe({ id, zustand, aendern }: SteuerungProps<WerteZustand> & { id: string }) {
  const groesse = findeMessgroesse(id);
  if (!groesse) return null;
  return (
    <div className="wert">
      <Eingabe groesse={groesse} zustand={zustand} aendern={aendern} />
    </div>
  );
}
