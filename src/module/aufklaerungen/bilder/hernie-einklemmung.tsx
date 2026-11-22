import { Etikett, F, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import {
  Bruchsack,
  Darm,
  DARM_DICKE,
  LEISTE_BAUCHFELL,
  LEISTE_BEULE,
  LEISTE_LUECKE,
  LEISTE_SACK,
  Wandschnitt,
} from './leistenbruch';

/** Darm im Bauchraum bis zur Lücke (links hinein, rechts heraus). */
const DARM_LINKS = 'M90 150 C130 100 196 104 222 150 C246 192 300 196 324 250 L330 296';
const DARM_RECHTS = 'M390 296 L396 250 C412 200 440 150 420 96';
/** Eingeschnürter Hals der Schlinge in der Lücke. */
const HALS = 'M330 290 L332 336 M390 290 L388 336';
/** Geschwollene Schlinge im Bruchsack, als pralle Fläche. */
const SCHLINGE =
  'M330 330 C268 346 252 494 360 498 C468 494 452 346 390 330 C382 352 372 366 360 366 C348 366 338 352 330 330 Z';
/** Falte, an der die Schlinge zurückläuft. */
const FALTE = 'M346 384 C320 430 330 456 360 456 C390 456 400 430 374 384';

/** Eingeklemmter Leistenbruch: die Darmschlinge im Bruchsack ist abgeschnürt und schwillt an. */
export default function HernieEinklemmung() {
  return (
    <Zeichnung titel="Schnitt durch die Bauchwand bei eingeklemmtem Leistenbruch: die Lücke schnürt die Darmschlinge im Bruchsack ab, die Schlinge schwillt an und wird nicht mehr durchblutet – ein Notfall">
      <Wandschnitt
        id="hernie-einklemmung"
        luecke={LEISTE_LUECKE}
        beule={LEISTE_BEULE}
        bauchfell={LEISTE_BAUCHFELL}
        sack={<Bruchsack d={LEISTE_SACK} />}
      >
        {/* Die abgeschnürte Schlinge pocht und schwillt */}
        <g className="hernie-einklemmung-schlinge-form">
          <path d={SCHLINGE} fill={F.kupfer} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
          <path d={FALTE} fill="none" stroke={F.kupferHell} strokeWidth="3" strokeLinecap="round" />
        </g>
        <Darm d={HALS} farbe={F.kupfer} dicke={14} />
        <Darm d={DARM_LINKS} dicke={DARM_DICKE} />
        <Darm d={DARM_RECHTS} dicke={DARM_DICKE} />

        {/* Die Ränder der Lücke drücken zu */}
        <g className="hernie-einklemmung-druck-links">
          <Pfeil d="M246 290 L290 290" farbe={F.kupferHell} breite={5} />
        </g>
        <g className="hernie-einklemmung-druck-rechts">
          <Pfeil d="M474 290 L430 290" farbe={F.kupferHell} breite={5} />
        </g>
      </Wandschnitt>

      <Etikett x={30} y={56} farbe={F.kupferHell}>
        Notfall
      </Etikett>
      <Unterzeile x={140} y={56}>
        sofort ins Krankenhaus
      </Unterzeile>

      <Etikett x={700} y={180} anker="end">
        Lücke schnürt ab
      </Etikett>
      <Zeiger von={[560, 194]} nach={[440, 272]} />

      <Etikett x={360} y={646} anker="middle" farbe={F.kupferHell}>
        Darmschlinge eingeklemmt
      </Etikett>
      <Unterzeile x={360} y={678} anker="middle">
        hart, schmerzhaft, geht nicht mehr zurück
      </Unterzeile>
    </Zeichnung>
  );
}
