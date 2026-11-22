import { Etikett, F, Fluss, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Speiseröhre (oben) und Magen als eine Form, Magenausgang nach links. */
const MAGEN =
  'M285 50 L285 300 C287 370 268 420 200 440 L130 440 L130 500 L200 500 ' +
  'C290 505 330 610 430 610 C540 610 610 510 600 400 C592 290 540 225 470 228 ' +
  'C410 230 375 262 355 300 L355 50 Z';

/** Magen mit Speiseröhre im Schnitt: Magensäure steigt durch den undichten Schließmuskel auf. */
export default function Reflux() {
  return (
    <Zeichnung titel="Magen und Speiseröhre im Schnitt: der Schließmuskel am Mageneingang schließt nicht dicht, Magensäure steigt in die Speiseröhre auf und reizt sie">
      <clipPath id="reflux-magen">
        <path d={MAGEN} />
      </clipPath>

      <path d={MAGEN} fill={F.petrol} />
      {/* Magensäure am Boden des Magens und gereizter unterer Teil der Speiseröhre */}
      <g clipPath="url(#reflux-magen)">
        <rect className="reflux-saeure" x="100" y="455" width="540" height="180" fill={F.kupfer} />
        <path d="M285 150 L285 300 M355 150 L355 300" fill="none" stroke={F.kupfer} strokeWidth="28" />
      </g>
      <path d={MAGEN} {...KONTUR} />

      {/* Schließmuskel: zwei Wülste, dazwischen bleibt eine Lücke */}
      <ellipse className="reflux-muskel-links" cx="297" cy="292" rx="13" ry="19" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <ellipse className="reflux-muskel-rechts" cx="343" cy="292" rx="13" ry="19" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />

      <Pfeil d="M420 500 C350 420 314 370 320 170" farbe={F.kupferHell} breite={7} />
      <Fluss d="M420 500 C350 420 314 370 320 186" farbe={F.kupfer} breite={13} dauer={1.1} />

      <Zeiger von={[212, 102]} nach={[300, 102]} />
      <Etikett x={40} y={110}>
        Speiseröhre
      </Etikett>

      <Zeiger von={[232, 262]} nach={[295, 290]} />
      <Etikett x={30} y={270}>
        Schließmuskel
      </Etikett>
      <Unterzeile x={30} y={300}>
        schließt nicht dicht
      </Unterzeile>

      <Zeiger von={[400, 150]} nach={[334, 214]} />
      <Etikett x={690} y={130} anker="end" farbe={F.kupferHell}>
        Magensäure steigt auf
      </Etikett>

      <Etikett x={480} y={350} anker="middle">
        Magen
      </Etikett>

      <Unterzeile x={360} y={676} anker="middle">
        Das brennt hinter dem Brustbein
      </Unterzeile>
    </Zeichnung>
  );
}
