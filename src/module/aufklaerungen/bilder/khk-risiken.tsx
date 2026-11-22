import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Querschnitt eines Herzkranzgefäßes; frei = Radius des offenen Rests, versatz schiebt ihn zur Seite. */
function Querschnitt({ x, frei, versatz }: { x: number; frei: number; versatz: number }) {
  const y = 250;
  return (
    <g>
      <circle cx={x} cy={y} r="88" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <circle cx={x} cy={y} r="60" fill={frei < 60 ? F.kupfer : F.tief} />
      {frei < 60 && <circle cx={x + versatz} cy={y + versatz} r={frei} fill={F.tief} />}
    </g>
  );
}

/** Wie die Ablagerung über Jahrzehnte wächst, und was sie beschleunigt. */
export default function KhkRisiken() {
  return (
    <Zeichnung titel="Drei Querschnitte eines Herzkranzgefäßes nebeneinander: in jungen Jahren frei, im mittleren Alter mit ersten Ablagerungen, später stark verengt. Darunter die Risikofaktoren, die das beschleunigen">
      <Etikett x={360} y={60} anker="middle">
        Die Ablagerung wächst über Jahrzehnte
      </Etikett>

      <Querschnitt x={130} frei={60} versatz={0} />
      <Querschnitt x={360} frei={46} versatz={9} />
      <Querschnitt x={590} frei={20} versatz={28} />
      <Pfeil d="M226 250 L262 250" farbe={F.leise} />
      <Pfeil d="M456 250 L492 250" farbe={F.leise} />

      <Etikett x={130} y={384} anker="middle">
        Jung
      </Etikett>
      <Unterzeile x={130} y={414} anker="middle">
        Gefäß frei
      </Unterzeile>
      <Etikett x={360} y={384} anker="middle">
        Mittleres Alter
      </Etikett>
      <Unterzeile x={360} y={414} anker="middle">
        erste Ablagerung
      </Unterzeile>
      <Etikett x={590} y={384} anker="middle" farbe={F.kupferHell}>
        Später
      </Etikett>
      <Unterzeile x={590} y={414} anker="middle">
        Engstelle
      </Unterzeile>

      <line x1="40" y1="478" x2="680" y2="478" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />
      <Etikett x={360} y={540} anker="middle" farbe={F.kupferHell}>
        Schneller geht es durch
      </Etikett>
      <Unterzeile x={360} y={584} anker="middle" farbe={F.linie}>
        Rauchen · Bluthochdruck · hohes Cholesterin
      </Unterzeile>
      <Unterzeile x={360} y={620} anker="middle" farbe={F.linie}>
        Diabetes · Übergewicht · wenig Bewegung
      </Unterzeile>
    </Zeichnung>
  );
}
