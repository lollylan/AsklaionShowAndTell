import { Etikett, F, Folge, Unterzeile, Wachsen, Zeichnung, Zeiger } from './bausteine';

/** Dickdarm von vorn: Blinddarm unten links im Bild, aufsteigend, quer, absteigend, S-Bogen, Enddarm. */
const DARM =
  'M170 540 L170 230 Q170 170 230 170 C320 170 380 250 460 210 Q520 172 560 210 L560 460 ' +
  'Q560 540 490 546 C420 552 370 520 360 580 L360 690';
const DUENNDARM = 'M300 620 C280 580 240 560 204 552';
/** Weg des Endoskops: vom After bis an den Anfang des Dickdarms. */
const SCHLAUCH =
  'M360 740 L360 580 C370 520 420 552 490 546 Q560 540 560 460 L560 210 Q520 172 460 210 ' +
  'C380 250 320 170 230 170 Q170 170 170 230 L170 520';

/** Der Schlauch schiebt sich vom After durch den ganzen Dickdarm bis zum Blinddarm. */
export default function Darmspiegelung() {
  return (
    <Zeichnung titel="Dickdarm von vorn. Ein dünner Schlauch mit Kamera wird durch den After eingeführt und durch Enddarm, S-Bogen und den ganzen Dickdarm bis an dessen Anfang geschoben, wo der Dünndarm einmündet">
      {/* Dünndarm-Ende und Wurmfortsatz */}
      <path d={DUENNDARM} fill="none" stroke={F.linie} strokeWidth="34" strokeLinecap="round" />
      <path d={DUENNDARM} fill="none" stroke={F.petrolDunkel} strokeWidth="26" strokeLinecap="round" />
      <path d="M150 586 C136 610 146 634 164 640" fill="none" stroke={F.linie} strokeWidth="18" strokeLinecap="round" />
      <path d="M150 586 C136 610 146 634 164 640" fill="none" stroke={F.petrol} strokeWidth="10" strokeLinecap="round" />

      {/* Dickdarm als Röhre */}
      <circle cx="172" cy="548" r="44" fill={F.linie} />
      <path d={DARM} fill="none" stroke={F.linie} strokeWidth="62" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="172" cy="548" r="38" fill={F.petrol} />
      <path d={DARM} fill="none" stroke={F.petrol} strokeWidth="54" strokeLinecap="round" strokeLinejoin="round" />
      {/* Falten */}
      <path
        d="M146 300 L194 300 M146 400 L194 400 M290 158 L282 200 M400 210 L410 252 M536 300 L584 300 M536 400 L584 400"
        stroke={F.petrolHell}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Wachsen d={SCHLAUCH} farbe={F.creme} breite={8} dauer={4.4} ab={0.6} />
      <Folge ab={5} von={0}>
        <circle cx="170" cy="524" r="10" fill={F.kupfer} stroke={F.creme} strokeWidth="3" />
      </Folge>

      <Etikett x={360} y={92} anker="middle">
        Dickdarm
      </Etikett>
      <Unterzeile x={360} y={124} anker="middle">
        etwa 1,5 Meter lang
      </Unterzeile>

      <Etikett x={30} y={680}>
        Hier mündet
      </Etikett>
      <Etikett x={30} y={712}>
        der Dünndarm
      </Etikett>
      <Zeiger von={[110, 654]} nach={[212, 560]} />

      <Etikett x={604} y={600} anker="middle">
        Endoskop
      </Etikett>
      <Unterzeile x={604} y={632} anker="middle">
        Schlauch mit Kamera
      </Unterzeile>
      <Zeiger von={[486, 652]} nach={[368, 668]} />

      <Etikett x={402} y={712}>
        After
      </Etikett>
    </Zeichnung>
  );
}
