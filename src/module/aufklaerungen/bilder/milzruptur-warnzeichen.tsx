import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Oberkörper von vorn, Mitte bei x = 290. */
const RUMPF =
  'M268 150 L268 172 C230 178 180 188 166 214 C152 240 176 330 180 420 C182 470 178 520 176 560 L404 560 ' +
  'C402 520 398 470 400 420 C404 330 428 240 414 214 C400 188 350 178 312 172 L312 150';

/** Schmerz-Punkt mit Ausstrahlung. */
function Schmerz({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="34" fill={F.kupfer} fillOpacity="0.35" />
      <circle cx={x} cy={y} r="16" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
    </g>
  );
}

/** Warnzeichen einer Milzblutung: Schmerz links oben im Bauch und in der linken Schulter. */
export default function MilzrupturWarnzeichen() {
  return (
    <Zeichnung titel="Oberkörper von vorn: Schmerzen links oben im Bauch und in der linken Schulter sind Warnzeichen. Dazu Blässe, Schwindel und Herzrasen – auch Tage nach dem Unfall sofort 112">
      <path d={RUMPF} {...KONTUR} fill={F.petrol} />
      <circle cx="290" cy="100" r="50" {...KONTUR} fill={F.petrol} />
      {/* Rippenbogen */}
      <path d="M200 330 Q290 380 380 330" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M210 290 Q290 320 370 290" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />

      {/* Links im Körper = rechts im Bild */}
      <Schmerz x={360} y={340} />
      <Schmerz x={392} y={204} />

      <Unterzeile x={190} y={600} anker="middle">
        rechts
      </Unterzeile>
      <Unterzeile x={390} y={600} anker="middle">
        links
      </Unterzeile>

      <Zeiger von={[450, 180]} nach={[404, 200]} />
      <Etikett x={460} y={172}>
        Linke Schulter
      </Etikett>

      <Zeiger von={[450, 330]} nach={[378, 338]} />
      <Etikett x={460} y={322}>
        Links oben
      </Etikett>
      <Etikett x={460} y={352}>
        im Bauch
      </Etikett>

      <Etikett x={460} y={460}>
        Blässe,
      </Etikett>
      <Etikett x={460} y={490}>
        Schwindel,
      </Etikett>
      <Etikett x={460} y={520}>
        Herzrasen
      </Etikett>

      <Etikett x={360} y={652} anker="middle" farbe={F.kupferHell}>
        Auch Tage nach dem Unfall: sofort 112
      </Etikett>
    </Zeichnung>
  );
}
