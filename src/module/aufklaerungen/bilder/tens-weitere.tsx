import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Elektrode, Schmerzzone } from './tens-teile';

/** Rumpf von vorn; Arme und Beine kommen als dicke Linien dazu. Mitte bei x = 360. */
const RUMPF =
  'M338 140 L338 158 C318 166 296 170 282 180 C270 190 270 214 272 236 C276 300 286 350 288 420 ' +
  'L432 420 C434 350 444 300 448 236 C450 214 450 190 438 180 C424 170 402 166 382 158 L382 140 Z';

/** Arme und Beine: Mittellinien, gezeichnet als breiter Strich. */
const ARME = ['M286 196 L232 320 L206 440', 'M434 196 L488 320 L514 440'];
const BEINE = ['M326 400 L318 540 L314 676', 'M394 400 L402 540 L406 676'];

function Glied({ d, breite, mitKontur }: { d: string; breite: number; mitKontur: boolean }) {
  return mitKontur ? (
    <path d={d} {...KONTUR} strokeWidth={breite + 8} />
  ) : (
    <path d={d} {...KONTUR} stroke={F.petrol} strokeWidth={breite} />
  );
}

/** Ganzer Körper von vorn mit drei weiteren Stellen für TENS: Ellenbogen, Unterbauch, Hüfte. */
export default function TensWeitere() {
  const glieder = (mitKontur: boolean) => (
    <>
      {ARME.map((d) => (
        <Glied key={d} d={d} breite={40} mitKontur={mitKontur} />
      ))}
      {BEINE.map((d) => (
        <Glied key={d} d={d} breite={58} mitKontur={mitKontur} />
      ))}
    </>
  );
  return (
    <Zeichnung titel="Ganzer Körper von vorn: je zwei Elektroden außen am Ellenbogen bei Tennisarm, am Unterbauch bei Regelschmerzen und außen an der Hüfte">
      {/* Erst alle Konturen, dann alle Flächen, so verschmelzen die Glieder mit dem Rumpf */}
      {glieder(true)}
      <path d={RUMPF} {...KONTUR} strokeWidth="8" fill={F.petrol} />
      {glieder(false)}
      <path d={RUMPF} fill={F.petrol} />
      <circle cx="360" cy="90" r="50" {...KONTUR} fill={F.petrol} />

      {/* Ellenbogen außen (Tennisarm) */}
      <Schmerzzone cx={228} cy={322} rx={44} ry={56} />
      <Elektrode x={242} y={284} groesse={32} drehung={22} />
      <Elektrode x={216} y={360} groesse={32} drehung={12} />

      {/* Unterbauch */}
      <Schmerzzone cx={360} cy={350} rx={70} ry={40} />
      <Elektrode x={326} y={350} groesse={34} />
      <Elektrode x={394} y={350} groesse={34} />

      {/* Hüfte außen */}
      <Schmerzzone cx={418} cy={464} rx={44} ry={60} />
      <Elektrode x={420} y={430} groesse={32} drehung={-4} />
      <Elektrode x={418} y={500} groesse={32} drehung={4} />

      <Zeiger von={[140, 262]} nach={[234, 296]} />
      <Etikett x={30} y={226}>
        Ellenbogen
      </Etikett>
      <Unterzeile x={30} y={256}>
        Tennisarm
      </Unterzeile>

      <Zeiger von={[196, 520]} nach={[322, 364]} />
      <Etikett x={30} y={548}>
        Unterbauch
      </Etikett>
      <Unterzeile x={30} y={578}>
        Regelschmerzen
      </Unterzeile>

      <Zeiger von={[600, 528]} nach={[428, 500]} />
      <Etikett x={690} y={548} anker="end">
        Hüfte
      </Etikett>
    </Zeichnung>
  );
}
